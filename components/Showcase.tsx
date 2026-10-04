'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Maximize2, Play, X } from 'lucide-react';
import type { BranchSlug } from '@/content/branches';
import { DEMO_VIDEO } from '@/lib/media';
import { BranchIcon } from './BranchIcon';

type Item = {
  kind: string;
  src?: string;
  title: string;
  text: string;
  tags: string[];
  alt: string;
};

type Props = {
  t: {
    title: string;
    intro: string;
    enlarge: string;
    play: string;
    close: string;
    groups: { branch: string; items: Item[] }[];
  };
  branchNames: Record<string, string>;
};

/**
 * « AXIONA en action » : réalisations classées par branche.
 * Clic sur un visuel → agrandissement dans une fenêtre <dialog> (Échap pour fermer).
 */
export function Showcase({ t, branchNames }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<Item | null>(null);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
    document.documentElement.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <section className="border-t border-trait/70 py-20 sm:py-28" aria-labelledby="showcase-title">
      <div className="container-ax">
        <div className="max-w-2xl">
          <h2 id="showcase-title" className="h-section">
            {t.title}
          </h2>
          <p className="lead mt-4">{t.intro}</p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-4 lg:gap-6">
          {t.groups.map((g) => (
            <div key={g.branch} className={g.items.length > 1 ? 'lg:col-span-2' : ''}>
              <h3 className="flex items-center gap-2.5 font-display text-base font-semibold text-nuit">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brume">
                  <BranchIcon slug={g.branch as BranchSlug} className="h-5 w-5" />
                </span>
                {branchNames[g.branch]}
              </h3>
              <ul className={`mt-5 grid gap-6 sm:grid-cols-2 ${g.items.length > 1 ? 'lg:grid-cols-2' : 'lg:grid-cols-1'}`}>
                {g.items.map((item) => (
                  <li key={item.title} className="flex flex-col overflow-hidden rounded-card border border-trait/80 bg-white shadow-douce">
                    <button
                      type="button"
                      onClick={() => setOpen(item)}
                      className="group relative block aspect-square w-full overflow-hidden bg-brume"
                    >
                      <span className="sr-only">
                        {item.kind === 'video' ? t.play : t.enlarge} : {item.title}
                      </span>
                      <Image
                        src={item.kind === 'video' ? DEMO_VIDEO.poster : (item.src as string)}
                        alt={item.alt}
                        fill
                        sizes="(min-width: 1024px) 18rem, (min-width: 640px) 45vw, 92vw"
                        quality={85}
                        className={`transition-transform duration-500 group-hover:scale-[1.03] ${
                          item.kind === 'video' ? 'object-cover object-[center_45%]' : 'object-cover'
                        }`}
                      />
                      {item.kind === 'video' ? (
                        <span className="absolute inset-0 flex items-center justify-center bg-nuit/20">
                          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-nuit shadow-haute transition-transform duration-300 group-hover:scale-105">
                            <Play className="ml-1 h-7 w-7 fill-current" aria-hidden="true" />
                          </span>
                        </span>
                      ) : (
                        <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-nuit opacity-0 shadow-douce transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                          <Maximize2 className="h-4 w-4" aria-hidden="true" />
                        </span>
                      )}
                    </button>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="font-display text-[1.05rem] font-semibold leading-snug text-nuit">{item.title}</p>
                      <p className="mt-2 text-[0.95rem] leading-relaxed text-gris">{item.text}</p>
                      <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
                        {item.tags.map((tag) => (
                          <li key={tag} className="chip !text-[0.78rem]">
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        aria-label={open?.title}
        onClose={() => setOpen(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) setOpen(null);
        }}
        className="m-auto max-h-[92vh] max-w-[min(92vw,56rem)] overflow-visible bg-transparent p-0 backdrop:bg-encre/80 backdrop:backdrop-blur-sm"
      >
        {open && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen(null)}
              className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white text-nuit shadow-haute sm:-right-12 sm:top-0"
              aria-label={t.close}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            {open.kind === 'video' ? (
              <video
                className="max-h-[85vh] w-auto rounded-card bg-nuit"
                style={{ aspectRatio: `${DEMO_VIDEO.width} / ${DEMO_VIDEO.height}` }}
                poster={DEMO_VIDEO.poster}
                controls
                autoPlay
                playsInline
                aria-label={open.alt}
              >
                <source src={DEMO_VIDEO.src} type="video/mp4" />
                <source src={DEMO_VIDEO.srcWebm} type="video/webm" />
              </video>
            ) : (
              <Image
                src={open.src as string}
                alt={open.alt}
                width={1254}
                height={1254}
                sizes="(min-width: 1024px) 56rem, 92vw"
                quality={90}
                loading="eager"
                className="block h-auto w-[min(92vw,85vh,56rem)] rounded-card object-contain"
              />
            )}
            <p className="mt-3 text-center font-display text-sm font-semibold text-white">{open.title}</p>
          </div>
        )}
      </dialog>
    </section>
  );
}
