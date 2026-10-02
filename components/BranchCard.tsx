import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import type { Branch } from '@/content/branches';
import { BranchIcon } from './BranchIcon';
import { FlowLines, NodeNetwork } from './Illustrations';

type Props = {
  branch: Branch;
  statusLabels: { available: string; soon: string };
  linkLabel: string;
  flagshipLabel?: string;
  size?: 'large' | 'compact';
  headingLevel?: 'h2' | 'h3';
};

/** Carte de branche. Toute la carte est cliquable (lien étendu sur le titre). */
export function BranchCard({ branch, statusLabels, linkLabel, flagshipLabel, size = 'compact', headingLevel = 'h3' }: Props) {
  const H = headingLevel;
  const href = { pathname: '/branches/[slug]' as const, params: { slug: branch.slug } };
  const soon = branch.status === 'soon';

  if (size === 'large') {
    return (
      <article className="group relative flex h-full flex-col overflow-hidden rounded-card-lg border border-trait/80 bg-white p-7 shadow-douce transition-shadow duration-300 hover:shadow-haute sm:p-9">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(28rem_12rem_at_80%_0%,rgb(79_209_240/0.16),transparent_70%)]"
        />
        {branch.slug === 'ai' ? (
          <NodeNetwork className="pointer-events-none absolute -right-6 top-4 w-64 opacity-90 sm:w-80" />
        ) : (
          <FlowLines className="pointer-events-none absolute -right-6 top-4 w-64 opacity-90 sm:w-80" />
        )}
        <div className="relative flex items-center gap-3">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brume text-nuit">
            <BranchIcon slug={branch.slug} className="h-8 w-8" />
          </span>
          {flagshipLabel && (
            <span className="rounded-full bg-cyan-pale px-3 py-1 font-display text-xs font-semibold text-ocean-fonce">
              {flagshipLabel}
            </span>
          )}
        </div>
        <H className="relative mt-16 text-[1.75rem] sm:mt-24 sm:text-[2rem]">
          <Link href={href} className="after:absolute after:inset-0 after:rounded-card-lg focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-3 focus-visible:after:outline-cyan">
            {branch.name}
          </Link>
        </H>
        <p className="relative mt-3 max-w-md text-lg leading-relaxed text-gris">{branch.tagline}</p>
        <ul className="relative mt-6 flex flex-wrap gap-2" aria-label={branch.name}>
          {branch.keywords.map((k) => (
            <li key={k} className="chip">
              {k}
            </li>
          ))}
        </ul>
        <span className="relative mt-auto inline-flex items-center gap-1.5 pt-8 font-display text-[0.95rem] font-semibold text-ocean">
          {linkLabel}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </article>
    );
  }

  return (
    <article className="group relative flex h-full flex-col rounded-card border border-trait/80 bg-white p-6 transition-[box-shadow,border-color] duration-300 hover:border-transparent hover:shadow-haute">
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brume text-nuit transition-colors group-hover:bg-cyan-pale">
          <BranchIcon slug={branch.slug} className="h-7 w-7" />
        </span>
        {soon && (
          <span className="rounded-full border border-trait px-2.5 py-0.5 text-xs font-medium text-gris">{statusLabels.soon}</span>
        )}
      </div>
      <H className="h-card mt-5">
        <Link href={href} className="after:absolute after:inset-0 after:rounded-card focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-3 focus-visible:after:outline-cyan">
          {branch.name}
        </Link>
      </H>
      <p className="mt-2 text-[0.98rem] leading-relaxed text-gris">{branch.tagline}</p>
      <p className="mt-auto pt-5 text-sm text-ocean">{branch.keywords.join(' · ')}</p>
      <ArrowUpRight
        className="absolute bottom-6 right-6 h-4 w-4 text-ocean opacity-0 transition-all duration-200 group-hover:opacity-100"
        aria-hidden="true"
      />
    </article>
  );
}
