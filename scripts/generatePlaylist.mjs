import { promises as fs } from 'fs';
import path from 'path';

const AUDIO_ROOT = path.join(process.cwd(), 'public', 'audio', 'daft-punk');
const OUTPUT_PATH = path.join(process.cwd(), 'src', 'data', 'daftpunk.generated.ts');

const isMp3 = (file) => file.toLowerCase().endsWith('.mp3');
const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

const stripTrackNumber = (value) => value.replace(/^\s*\d+\s*[._-]?\s*/i, '').trim();

const walk = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (entry.isFile() && isMp3(entry.name)) {
      files.push(full);
    }
  }
  return files;
};

const getCoverForAlbum = async (albumDir) => {
  const coverNames = [
    'cover.jpeg',
    'cover.jpg',
    'cover.png',
    'cover_itemimage.JPG',
    'cover_itemimage.jpg',
    '__ia_thumb.jpg'
  ];

  for (const coverName of coverNames) {
    const coverPath = path.join(albumDir, coverName);
    try {
      await fs.access(coverPath);
      const relative = path.relative(path.join(process.cwd(), 'public'), coverPath);
      return `/${relative.split(path.sep).join('/')}`;
    } catch {
      // Try next cover name
    }
  }
  return undefined;
};

const buildTracks = async () => {
  let files = [];
  try {
    files = await walk(AUDIO_ROOT);
  } catch (error) {
    return [];
  }

  const tracks = [];
  for (const filePath of files) {
    const albumDir = path.dirname(filePath);
    const albumName = path.basename(albumDir).toLowerCase();
    const coverSrc = await getCoverForAlbum(albumDir);
    const filename = path.basename(filePath, '.mp3');
    const title = stripTrackNumber(filename).toLowerCase();
    const id = slugify(`${albumName}-${filename}`);
    const relative = path.relative(path.join(process.cwd(), 'public'), filePath);
    const src = `/${relative.split(path.sep).join('/')}`;

    tracks.push({
      id,
      title,
      artist: 'daft punk',
      album: albumName,
      src,
      coverSrc
    });
  }

  return tracks;
};

const writeOutput = async (tracks) => {
  const lines = [];
  lines.push('export type Track = {');
  lines.push('  id: string;');
  lines.push('  title: string;');
  lines.push('  artist: string;');
  lines.push('  album: string;');
  lines.push('  src: string;');
  lines.push('  coverSrc?: string;');
  lines.push('};');
  lines.push('');
  lines.push(`export const DAFT_PUNK_TRACKS: Track[] = ${JSON.stringify(tracks, null, 2)};`);
  lines.push('');
  await fs.writeFile(OUTPUT_PATH, lines.join('\n'), 'utf8');
};

const run = async () => {
  const tracks = await buildTracks();
  await writeOutput(tracks);
};

run();
