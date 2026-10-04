import type { CSSProperties } from 'react';
import type { Dictionary } from '@/content';
import { Symbol } from './Symbol';
import { WhatsAppLink } from './WhatsAppLink';
import { WhatsAppIcon } from './WhatsAppIcon';

const d = (s: number) => ({ '--d': `${s}s` }) as CSSProperties;

// Traînées de lumière : elles partent du bas-gauche et convergent vers l'étincelle
// du symbole (x=430, y=266 dans le repère du SVG), puis prolongent la flèche.
const TRAILS = [
  { p: 'M-760 640 C -300 600, 120 470, 430 266', w: 1.4, o: 0.9, delay: 0 },
  { p: 'M-760 520 C -260 520, 160 420, 430 266', w: 0.9, o: 0.6, delay: 0.08 },
  { p: 'M-560 760 C -160 690, 200 520, 430 266', w: 1, o: 0.7, delay: 0.14 },
  { p: 'M-760 400 C -200 430, 210 380, 430 266', w: 0.7, o: 0.45, delay: 0.2 },
  { p: 'M-260 820 C 40 700, 300 520, 430 266', w: 0.8, o: 0.5, delay: 0.24 },
  { p: 'M430 266 C 500 190, 560 120, 680 -40', w: 1.2, o: 0.55, delay: 0.7 },
];

export function Hero({ t, whatsappMessage }: { t: Dictionary; whatsappMessage: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-lumiere" aria-labelledby="hero-title">
      {/* Lignes fines d'architecture, très discrètes */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(11_42_74/0.045)_1px,transparent_1px)] bg-[size:7rem_100%] [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]"
      />
      <div className="container-ax relative grid min-h-[100svh] grid-cols-1 items-center gap-6 pb-16 pt-28 lg:grid-cols-12 lg:gap-8 lg:pb-20 lg:pt-24">
        {/* Visuel : lumière + symbole (au-dessus du texte sur mobile) */}
        <div className="pointer-events-none relative order-first -mb-4 flex justify-end lg:order-last lg:col-span-5 lg:mb-0 lg:justify-center">
          <svg
            viewBox="0 0 600 560"
            className="w-[58%] max-w-[17rem] overflow-visible sm:max-w-[20rem] lg:w-full lg:max-w-[34rem]"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <linearGradient id="trail" gradientUnits="userSpaceOnUse" x1="-760" y1="700" x2="430" y2="266">
                <stop offset="0" stopColor="#4FD1F0" stopOpacity="0" />
                <stop offset="0.65" stopColor="#4FD1F0" stopOpacity="0.55" />
                <stop offset="1" stopColor="#FFFFFF" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="trail-out" gradientUnits="userSpaceOnUse" x1="430" y1="266" x2="680" y2="-40">
                <stop offset="0" stopColor="#4FD1F0" stopOpacity="0.9" />
                <stop offset="1" stopColor="#4FD1F0" stopOpacity="0" />
              </linearGradient>
              <radialGradient id="halo">
                <stop offset="0" stopColor="#4FD1F0" stopOpacity="0.28" />
                <stop offset="1" stopColor="#4FD1F0" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="430" cy="266" r="230" fill="url(#halo)" />
            {TRAILS.map((tr, i) => (
              <path
                key={i}
                d={tr.p}
                pathLength={1}
                fill="none"
                stroke={i === TRAILS.length - 1 ? 'url(#trail-out)' : 'url(#trail)'}
                strokeWidth={tr.w}
                strokeOpacity={tr.o}
                strokeLinecap="round"
                className="hero-trail"
                style={d(tr.delay)}
              />
            ))}
            <g transform="translate(191 73) scale(1.45)">
              <g className="hero-symbol">
                <Symbol pulse width={270} height={280} className="overflow-visible" />
              </g>
            </g>
          </svg>
        </div>

        <div className="relative lg:col-span-7">
          <h1 id="hero-title" className="h-display hero-in max-w-[14ch]" style={d(0.55)}>
            {t.hero.title}
          </h1>
          <p className="lead hero-in mt-6 max-w-[38rem]" style={d(0.72)}>
            {t.hero.subtitle}
          </p>
          <div className="hero-in mt-9 flex flex-col gap-3 sm:flex-row sm:items-center" style={d(0.88)}>
            <WhatsAppLink message={whatsappMessage} className="btn btn-primary">
              <WhatsAppIcon />
              {t.hero.primary}
            </WhatsAppLink>
            <a href="#ecosysteme" className="btn btn-ghost">
              {t.hero.secondary}
            </a>
          </div>
          <p
            className="hero-in mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 font-display text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-ocean sm:gap-x-3 sm:text-[0.78rem] sm:tracking-[0.22em]"
            style={d(1.02)}
          >
            {t.hero.pillars.map((p, i) => (
              <span key={p} className="flex items-center gap-2 sm:gap-3">
                {i > 0 && <span className="h-1 w-1 rounded-full bg-cyan" aria-hidden="true" />}
                {p}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
