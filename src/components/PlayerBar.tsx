'use client';

import { Pause, Play, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { usePlayer } from '@/providers/PlayerProvider';
import { usePlayerStore } from '@/store/player';

const formatTime = (value: number) => {
  if (!Number.isFinite(value)) return '0:00';
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};

export const PlayerBar = () => {
  const { controls } = usePlayer();
  const { currentTrack, isPlaying, currentTime, duration, volume, error } = usePlayerStore();

  const progressValue = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/5 bg-ink-900/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-4 px-6 py-4">
        <div className="flex min-w-[220px] flex-1 items-center gap-4">
          <div className="h-12 w-12 overflow-hidden rounded-xl border border-white/10 bg-ink-800">
            {currentTrack?.coverSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={currentTrack.coverSrc}
                alt="album cover"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-white/10 via-transparent to-white/5" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-ink-100">{currentTrack?.title ?? 'no track loaded'}</span>
            <span className="text-xs text-chrome-400">
              {currentTrack ? `${currentTrack.artist} · ${currentTrack.album}` : 'daft punk shuffle'}
            </span>
            {error ? <span className="text-[10px] text-chrome-500">{error}</span> : null}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-full border border-white/10 bg-ink-800 px-3 py-2 text-ink-100 transition hover:-translate-y-0.5 hover:border-white/20"
            onClick={controls.previous}
            aria-label="previous track"
          >
            <SkipBack size={16} />
          </button>
          <button
            type="button"
            className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-ink-100 transition hover:-translate-y-0.5 hover:border-white/30"
            onClick={controls.toggle}
            aria-label={isPlaying ? 'pause' : 'play'}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button
            type="button"
            className="rounded-full border border-white/10 bg-ink-800 px-3 py-2 text-ink-100 transition hover:-translate-y-0.5 hover:border-white/20"
            onClick={controls.next}
            aria-label="next track"
          >
            <SkipForward size={16} />
          </button>
        </div>

        <div className="flex flex-1 items-center gap-4 min-w-[240px]">
          <div className="flex flex-1 items-center gap-3">
            <span className="text-[11px] text-chrome-400">{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={currentTime}
              onChange={(event) => controls.seek(Number(event.target.value))}
              className="h-1 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-white/70"
              aria-label="seek"
            />
            <span className="text-[11px] text-chrome-400">{formatTime(duration)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Volume2 size={14} className="text-chrome-400" />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(event) => controls.setVolume(Number(event.target.value))}
              className="h-1 w-24 cursor-pointer appearance-none rounded-full bg-white/10 accent-white/70"
              aria-label="volume"
            />
          </div>
        </div>

        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] tracking-[0.2em] text-chrome-400">
          daft punk shuffle
        </div>
      </div>
      <div className="h-[2px] bg-white/10">
        <div
          className="h-full bg-white/60 transition"
          style={{ width: `${progressValue}%` }}
        />
      </div>
    </div>
  );
};
