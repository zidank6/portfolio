# portfolio

## how to run

- install deps: `npm install`
- development: `npm run dev`
- production build: `npm run build`

## audio library

place daft punk mp3s inside `public/audio/daft-punk` using album folders. example:

- `public/audio/daft-punk/random access memories/01. give life back to music.mp3`
- `public/audio/daft-punk/random access memories/02. the game of love.mp3`
- `public/audio/daft-punk/random access memories/cover.jpeg` (optional)

run `npm run gen:playlist` to rebuild `src/data/daftpunk.generated.ts`.

## persistent player behavior

- the player is mounted in `app/layout.tsx`, so it survives route changes
- a new random starting track is chosen only on full reload because state lives in memory
- shuffle is always on and uses the generated track list

## content edits

- profile details: `src/data/profile.ts`
- project data: `src/data/projects.ts`
- hero and layout: `app/page.tsx` and `src/components/HeroFrame.tsx`
- player visuals: `src/components/PlayerBar.tsx`
