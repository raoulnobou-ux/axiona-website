'use client';

import { useRef, useState } from 'react';
import { Maximize2, Play } from 'lucide-react';

type Props = {
  src: string;
  /** Source alternative (WebM VP9) pour les navigateurs sans H.264. */
  srcWebm?: string;
  poster: string;
  label: string;
  playLabel: string;
  duration: string;
  width: number;
  height: number;
};

/**
 * Lecteur vidéo premium, sans coût au chargement de la page :
 * - seule l'affiche (WebP légère, lazy) est chargée au départ ;
 * - <video preload="none"> : aucun octet de vidéo avant le clic ;
 * - au clic : lecture avec le son, contrôles natifs (plein écran, avance),
 *   playsInline pour iOS.
 */
export function VideoPlayer({ src, srcWebm, poster, label, playLabel, duration, width, height }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const start = async () => {
    const v = videoRef.current;
    if (!v) return;
    setStarted(true);
    try {
      await v.play();
    } catch {
      // Lecture bloquée par le navigateur : les contrôles natifs restent disponibles.
    }
  };

  const fullscreen = () => {
    const v = videoRef.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (!v) return;
    if (v.requestFullscreen) v.requestFullscreen().catch(() => v.webkitEnterFullscreen?.());
    else v.webkitEnterFullscreen?.();
  };

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[1.6rem] bg-nuit" style={{ aspectRatio: `${width} / ${height}` }}>
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        preload="none"
        poster={started ? poster : undefined}
        playsInline
        controls={started}
        controlsList="nodownload"
        aria-label={label}
        width={width}
        height={height}
        onPlay={() => setStarted(true)}
      >
        <source src={src} type="video/mp4" />
        {srcWebm && <source src={srcWebm} type="video/webm" />}
      </video>

      {!started && (
        <button
          type="button"
          onClick={start}
          className="group absolute inset-0 isolate flex flex-col items-center justify-end p-6 after:absolute after:inset-0 after:-z-10 after:bg-[linear-gradient(180deg,rgb(7_24_43/0.05)_40%,rgb(7_24_43/0.75)_100%)] text-left text-white"
        >
          {/* Affiche en <img> lazy : rien n'est téléchargé tant que la section n'approche pas de l'écran */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={poster}
            alt=""
            loading="lazy"
            decoding="async"
            width={width}
            height={height}
            className="absolute inset-0 -z-10 h-full w-full object-cover"
          />
          <span className="absolute left-1/2 top-[30%] flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-nuit shadow-[0_18px_40px_-10px_rgb(7_24_43/0.6)] transition-[scale] duration-300 group-hover:scale-105 group-active:scale-95">
            <span aria-hidden="true" className="vp-ring absolute inset-0 rounded-full" />
            <Play className="ml-1 h-8 w-8 fill-current" aria-hidden="true" />
          </span>
          <span className="flex w-full items-center justify-between gap-3">
            <span className="font-display text-[0.95rem] font-semibold">{playLabel}</span>
            <span className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium tabular-nums backdrop-blur">{duration}</span>
          </span>
        </button>
      )}

      {started && (
        <button
          type="button"
          onClick={fullscreen}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/60"
          aria-label="Plein écran / Fullscreen"
        >
          <Maximize2 className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
