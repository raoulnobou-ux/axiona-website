import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import type { Branch } from '@/content/branches';
import { BranchIcon } from './BranchIcon';
import { Symbol } from './Symbol';
import { Reveal } from './Reveal';

type Props = {
  t: { title: string; intro: string; note: string; core: string; more: string };
  branches: Branch[];
  flagshipLabel: string;
  soonLabel: string;
};

const href = (slug: Branch['slug']) => ({ pathname: '/branches/[slug]' as const, params: { slug } });

/**
 * L'écosystème AXIONA : un tronc commun, AI + Automation en tête,
 * Software à leurs côtés, puis les cinq autres branches.
 * Ordinateur : arbre horizontal relié par des rails lumineux.
 * Mobile : arbre vertical (ligne à gauche).
 */
export function Ecosystem({ t, branches, flagshipLabel, soonLabel }: Props) {
  const tier1 = branches.filter((b) => ['ai', 'automation', 'software'].includes(b.slug));
  const tier2 = branches.filter((b) => !['ai', 'automation', 'software'].includes(b.slug));

  return (
    <section id="ecosysteme" className="relative overflow-hidden bg-[radial-gradient(60rem_26rem_at_50%_0%,rgb(79_209_240/0.1),transparent_70%)] py-20 sm:py-28" aria-labelledby="eco-title">
      <div className="container-ax">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 id="eco-title" className="h-section">
            {t.title}
          </h2>
          <p className="mt-4 font-display text-xl font-semibold leading-snug text-ocean sm:text-2xl">{t.intro}</p>
          <p className="lead mt-3">{t.note}</p>
        </Reveal>

        <div className="relative mt-14">
          {/* Tronc : AXIONA */}
          <div className="flex justify-start lg:justify-center">
            <div className="relative z-10 flex items-center gap-3 rounded-2xl bg-white px-5 py-3.5 shadow-haute ring-1 ring-trait">
              <Symbol className="h-9 w-auto" />
              <span className="font-display text-xl font-bold tracking-[0.06em] text-nuit">AXIONA</span>
            </div>
          </div>

          <div className="relative max-lg:ml-[1.35rem] max-lg:border-l max-lg:border-trait max-lg:pl-6">
            <div className="hidden justify-center lg:flex" aria-hidden="true">
              <span className="eco-line h-10 w-px" />
            </div>

            {/* Niveau 1 : AI + Automation (offre phare) et Software */}
            <p className="pt-6 text-sm font-medium text-gris lg:sr-only">{t.core}</p>
            <div className="relative grid gap-4 pt-4 lg:grid-cols-3 lg:gap-6 lg:pt-10">
              <span aria-hidden="true" className="eco-line absolute left-[16.67%] right-[16.67%] top-0 hidden h-px lg:block" />
              {tier1.map((b) => {
                const flagship = b.featured;
                return (
                  <Reveal key={b.slug} className="relative">
                    <span aria-hidden="true" className="eco-line absolute -top-10 left-1/2 hidden h-10 w-px lg:block" />
                    <span aria-hidden="true" className="absolute -left-6 top-9 h-px w-6 bg-trait lg:hidden" />
                    <article
                      className={`group relative flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-haute ${
                        flagship
                          ? 'rounded-card-lg bg-nuit p-7 text-white shadow-haute sm:p-8'
                          : 'rounded-card border border-trait bg-white p-6 sm:p-7'
                      }`}
                    >
                      {flagship && (
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgb(79_209_240/0.35),transparent_65%)]"
                        />
                      )}
                      <div className="relative flex items-center justify-between gap-3">
                        <span
                          className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                            flagship ? 'bg-white/10 text-white' : 'bg-brume text-nuit'
                          }`}
                        >
                          <BranchIcon slug={b.slug} className="h-7 w-7" />
                        </span>
                        {flagship ? (
                          <span className="rounded-full bg-cyan/15 px-2.5 py-1 font-display text-xs font-semibold text-cyan">
                            {flagshipLabel}
                          </span>
                        ) : (
                          b.status === 'soon' && (
                            <span className="rounded-full border border-trait px-2.5 py-0.5 text-xs font-medium text-gris">{soonLabel}</span>
                          )
                        )}
                      </div>
                      <h3 className={`relative mt-6 ${flagship ? 'text-2xl !text-white' : 'h-card'}`}>
                        <Link
                          href={href(b.slug)}
                          className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-3 focus-visible:after:outline-cyan"
                        >
                          {b.name}
                        </Link>
                      </h3>
                      <p className={`relative mt-2 ${flagship ? 'text-white/75' : 'text-gris'}`}>{b.tagline}</p>
                      <p className={`relative mt-auto pt-5 text-sm ${flagship ? 'text-cyan' : 'text-ocean'}`}>
                        {b.keywords.join(' · ')}
                      </p>
                      <ArrowUpRight
                        className={`absolute bottom-6 right-6 h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100 ${
                          flagship ? 'text-cyan' : 'text-ocean'
                        }`}
                        aria-hidden="true"
                      />
                    </article>
                  </Reveal>
                );
              })}
            </div>

            {/* Niveau 2 : les cinq autres branches */}
            <div className="hidden justify-center lg:flex" aria-hidden="true">
              <span className="eco-line h-12 w-px" />
            </div>
            <p className="pt-8 text-sm font-medium text-gris lg:sr-only">{t.more}</p>
            <ul className="relative grid gap-3 pt-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4 lg:pt-8">
              <span aria-hidden="true" className="eco-line absolute left-[10%] right-[10%] top-0 hidden h-px lg:block" />
              {tier2.map((b, i) => (
                <Reveal as="li" key={b.slug} delay={i * 50} className="relative">
                  <span aria-hidden="true" className="eco-line absolute -top-8 left-1/2 hidden h-8 w-px lg:block" />
                  <span aria-hidden="true" className="absolute -left-6 top-7 h-px w-6 bg-trait lg:hidden" />
                  <Link
                    href={href(b.slug)}
                    className="group flex h-full items-start gap-3 rounded-card-sm border border-trait bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-ocean/40 hover:shadow-douce lg:flex-col"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brume text-nuit transition-colors group-hover:bg-cyan-pale">
                      <BranchIcon slug={b.slug} className="h-6 w-6" />
                    </span>
                    <span>
                      <span className="block font-display text-[0.98rem] font-semibold text-nuit">{b.name}</span>
                      <span className="mt-1 block text-sm leading-snug text-gris">{b.tagline}</span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
