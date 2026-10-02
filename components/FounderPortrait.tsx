import Image from 'next/image';
import { isTodo, site } from '@/config/site';
import { Symbol } from './Symbol';

/**
 * Photo du fondateur. Tant que site.founderPhoto vaut TODO_PHOTO,
 * affiche un visuel de remplacement dans la charte (symbole + lignes de lumière).
 */
export function FounderPortrait({ alt, placeholderAlt, className = '' }: { alt: string; placeholderAlt: string; className?: string }) {
  if (!isTodo(site.founderPhoto)) {
    return (
      <div className={`relative overflow-hidden rounded-card-lg bg-brume ${className}`}>
        <Image src={site.founderPhoto} alt={alt} fill sizes="(min-width: 1024px) 28rem, 90vw" className="object-cover" />
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={placeholderAlt}
      className={`relative overflow-hidden rounded-card-lg bg-[linear-gradient(160deg,#EAF3F8_0%,#ffffff_45%,#d9f5fc_100%)] ${className}`}
    >
      <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d={`M-40 ${520 - i * 26} C 120 ${500 - i * 30}, 230 ${380 - i * 30}, 440 ${90 - i * 34}`}
            fill="none"
            stroke="#4FD1F0"
            strokeOpacity={0.5 - i * 0.08}
            strokeWidth={i === 0 ? 1.4 : 0.8}
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <Symbol className="h-[42%] w-auto drop-shadow-[0_18px_30px_rgba(11,42,74,0.18)]" />
      </div>
      <span className="absolute bottom-4 left-4 rounded-full bg-white/80 px-3 py-1 font-display text-xs font-semibold text-gris backdrop-blur">
        {site.founder}
      </span>
    </div>
  );
}
