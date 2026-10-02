import { Symbol } from './Symbol';

type Props = {
  className?: string;
  tone?: 'dark' | 'light';
  /** Masque la ligne "GLOBAL AI TECHNOLOGIES" (très petits espaces). */
  compact?: boolean;
};

/** Logo complet : symbole AX + AXIONA / GLOBAL AI TECHNOLOGIES. */
export function Logo({ className = '', tone = 'dark', compact = false }: Props) {
  const main = tone === 'dark' ? 'text-nuit' : 'text-white';
  const sub = tone === 'dark' ? 'text-ocean' : 'text-cyan-pale';
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Symbol className="h-9 w-auto shrink-0" />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.32rem] font-bold tracking-[0.06em] ${main}`}>AXIONA</span>
        {!compact && (
          <span className={`mt-1 font-display text-[0.5rem] font-semibold tracking-[0.2em] ${sub}`}>
            GLOBAL AI TECHNOLOGIES
          </span>
        )}
      </span>
    </span>
  );
}
