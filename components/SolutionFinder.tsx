'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import type { BranchSlug } from '@/content/branches';
import { BranchIcon } from './BranchIcon';
import { Symbol } from './Symbol';
import { WhatsAppLink } from './WhatsAppLink';
import { WhatsAppIcon } from './WhatsAppIcon';

type Need = { id: string; label: string; branch: string; why: string };
type BranchInfo = { slug: BranchSlug; name: string; tagline: string };

type Props = {
  t: {
    groupLabel: string;
    placeholderTitle: string;
    placeholderText: string;
    recommended: string;
    discover: string;
    whatsapp: string;
    needs: Need[];
  };
  branches: BranchInfo[];
  whatsappTemplate: string;
};

/**
 * « Trouvez votre solution » : un besoin → la branche AXIONA recommandée.
 * Boutons radio accessibles (flèches non requises : chaque carte est un bouton).
 */
export function SolutionFinder({ t, branches, whatsappTemplate }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const need = t.needs.find((n) => n.id === selected);
  const branch = need ? branches.find((b) => b.slug === need.branch) : undefined;

  const choose = (id: string) => {
    setSelected(id);
    // Sur mobile, le panneau est sous la grille : on l'amène doucement à l'écran.
    requestAnimationFrame(() => {
      const el = panelRef.current;
      if (!el || window.innerWidth >= 1024) return;
      const r = el.getBoundingClientRect();
      if (r.top > window.innerHeight * 0.75 || r.bottom < 0) {
        el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
      }
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
      <div role="radiogroup" aria-label={t.groupLabel} className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:col-span-7">
        {t.needs.map((n) => {
          const isSel = n.id === selected;
          return (
            <button
              key={n.id}
              type="button"
              role="radio"
              aria-checked={isSel}
              onClick={() => choose(n.id)}
              className={`group flex min-h-[5.5rem] flex-col justify-between gap-3 rounded-card-sm border p-4 text-left transition-all duration-200 sm:min-h-[6.25rem] sm:flex-row sm:items-center sm:justify-start sm:gap-4 ${
                isSel
                  ? 'border-transparent bg-nuit text-white shadow-haute'
                  : 'border-trait bg-white text-nuit hover:-translate-y-0.5 hover:border-ocean/40 hover:shadow-douce'
              }`}
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                  isSel ? 'bg-white/10 text-cyan' : 'bg-brume text-nuit group-hover:bg-cyan-pale'
                }`}
              >
                <BranchIcon slug={n.branch as BranchSlug} className="h-6 w-6" />
              </span>
              <span className="font-display text-[0.95rem] font-semibold leading-snug sm:text-[1rem]">{n.label}</span>
            </button>
          );
        })}
      </div>

      <div ref={panelRef} className="lg:col-span-5" aria-live="polite">
        <div className="relative h-full min-h-[17rem] overflow-hidden rounded-card-lg border border-trait/80 bg-white p-7 shadow-douce sm:p-8 lg:sticky lg:top-28">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgb(79_209_240/0.2),transparent_65%)]"
          />
          <AnimatePresence mode="wait" initial={false}>
            {need && branch ? (
              <motion.div
                key={need.id}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="relative flex h-full flex-col"
              >
                <p className="text-sm font-medium text-ocean">{t.recommended}</p>
                <div className="mt-4 flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-nuit text-white shadow-douce [&_.ax-spark]:!fill-cyan">
                    <BranchIcon slug={branch.slug} className="h-8 w-8" />
                  </span>
                  <div>
                    <p className="font-display text-2xl font-semibold text-nuit">{branch.name}</p>
                    <p className="text-[0.95rem] text-gris">{branch.tagline}</p>
                  </div>
                </div>
                <p className="mt-5 text-[1.02rem] leading-relaxed text-encre">{need.why}</p>
                <div className="mt-auto flex flex-col gap-3 pt-7 sm:flex-row sm:flex-wrap">
                  <Link
                    href={{ pathname: '/branches/[slug]', params: { slug: branch.slug } }}
                    className="btn btn-ghost"
                  >
                    {t.discover} {branch.name}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <WhatsAppLink
                    message={whatsappTemplate.replace('{name}', branch.name)}
                    className="btn btn-primary"
                  >
                    <WhatsAppIcon />
                    {t.whatsapp}
                  </WhatsAppLink>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduce ? undefined : { opacity: 0 }}
                className="relative flex h-full flex-col items-start justify-center"
              >
                <Symbol className="h-12 w-auto" />
                <p className="mt-6 font-display text-xl font-semibold text-nuit">{t.placeholderTitle}</p>
                <p className="mt-2 text-gris">{t.placeholderText}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
