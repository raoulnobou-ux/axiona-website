import type { Dictionary } from '@/content';
import { Reveal } from './Reveal';

/**
 * Built in Buea. Built for Africa. Built for the world.
 * Visuel : trois cercles qui s'élargissent depuis un point (Buea),
 * l'origine, le marché, l'ambition. Aucun motif « africain » générique.
 */
export function BuiltInBuea({ t }: { t: Dictionary['built'] }) {
  const ringLabels = ['Buea', 'Africa', 'World'];
  return (
    <section className="relative overflow-hidden py-20 sm:py-28" aria-labelledby="built-title">
      <div className="container-ax grid items-center gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <h2 id="built-title" className="h-display !text-[clamp(2.1rem,5vw,3.9rem)]">
            <span className="block">{t.title[0]}</span>
            <span className="block text-ocean">{t.title[1]}</span>
            <span className="block bg-[linear-gradient(35deg,var(--nuit),var(--ocean)_50%,#2bb3d6)] bg-clip-text text-transparent">
              {t.title[2]}
            </span>
          </h2>
          <p className="lead mt-7 max-w-xl">{t.text}</p>
          <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {t.points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[0.98rem] text-encre">
                <svg viewBox="0 0 16 16" className="mt-1 h-3.5 w-3.5 shrink-0 text-cyan" aria-hidden="true">
                  <path d="M8 0 L9.4 6.6 L16 8 L9.4 9.4 L8 16 L6.6 9.4 L0 8 L6.6 6.6 Z" fill="currentColor" />
                </svg>
                {p}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="lg:col-span-5" delay={100}>
          <figure className="relative mx-auto aspect-square w-full max-w-[26rem]" aria-label={t.place}>
            <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
              <defs>
                <radialGradient id="bb-glow">
                  <stop offset="0" stopColor="#4FD1F0" stopOpacity="0.35" />
                  <stop offset="1" stopColor="#4FD1F0" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="200" cy="200" r="190" fill="url(#bb-glow)" />
              {[62, 122, 186].map((r, i) => (
                <circle
                  key={r}
                  cx="200"
                  cy="200"
                  r={r}
                  fill="none"
                  stroke={i === 0 ? '#14607F' : '#14607F'}
                  strokeOpacity={0.5 - i * 0.14}
                  strokeWidth={i === 0 ? 1.4 : 1}
                  strokeDasharray={i === 2 ? '2 6' : undefined}
                />
              ))}
              {/* Fines lignes qui partent de Buea vers le haut-droite, comme la flèche du logo */}
              {[0, 1, 2].map((i) => (
                <path
                  key={i}
                  d={`M200 200 C ${250 + i * 10} ${170 - i * 25}, ${300 + i * 8} ${110 - i * 20}, ${370 - i * 30} ${40 + i * 10}`}
                  fill="none"
                  stroke="#4FD1F0"
                  strokeOpacity={0.6 - i * 0.15}
                  strokeWidth={1.2 - i * 0.2}
                />
              ))}
              <circle cx="200" cy="200" r="16" fill="#4FD1F0" fillOpacity="0.25" className="spark-pulse" />
              <circle cx="200" cy="200" r="6" fill="#0B2A4A" />
              <circle cx="200" cy="200" r="2.5" fill="#4FD1F0" />
            </svg>
            {/* Libellés des cercles */}
            <span className="absolute left-1/2 top-[calc(50%+1.6rem)] -translate-x-1/2 rounded-full bg-nuit px-3 py-1 font-display text-xs font-semibold text-white">
              {ringLabels[0]}
            </span>
            <span className="absolute left-1/2 top-[calc(50%-31%)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-2.5 py-0.5 font-display text-xs font-semibold text-ocean ring-1 ring-trait">
              {ringLabels[1]}
            </span>
            <span className="absolute left-1/2 top-[3%] -translate-x-1/2 rounded-full bg-white px-2.5 py-0.5 font-display text-xs font-semibold text-gris ring-1 ring-trait">
              {ringLabels[2]}
            </span>
            <figcaption className="absolute bottom-[3%] left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-xs tracking-wider text-gris">
              {t.coords}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
