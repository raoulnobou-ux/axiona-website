'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CircleCheck, Database, MessageCircle, Sparkles, UserRound, Workflow } from 'lucide-react';

type Node = { title: string; sub: string; text: string };

type Props = {
  label: string;
  hint: string;
  nodes: Node[];
  outcomes: string[];
};

const ICONS = [UserRound, MessageCircle, Sparkles, Workflow, Database, CircleCheck];

/**
 * Démonstration visuelle d'une solution AXIONA :
 * Client → WhatsApp / Appel → Agent IA → Automatisation → Outils → Résultat.
 * Un « paquet » lumineux circule le long de la chaîne (CSS pur, coupé si
 * prefers-reduced-motion). Chaque étape est un bouton qui affiche son détail.
 */
export function SystemFlow({ label, hint, nodes, outcomes }: Props) {
  const [active, setActive] = useState(2);
  const reduce = useReducedMotion();
  const last = nodes.length - 1;

  return (
    <figure aria-label={label} className="relative">
      <ol className="relative grid grid-cols-1 gap-0 lg:grid-cols-6">
        {nodes.map((node, i) => {
          const Icon = ICONS[i] ?? Sparkles;
          const isActive = i === active;
          const core = i === 2 || i === 3; // Agent IA + Automatisation : le cœur AXIONA
          return (
            <li key={node.title} className="relative flex lg:flex-col lg:items-center">
              {/* Connecteur vers l'étape suivante, avec paquet lumineux */}
              {i < last && (
                <span
                  aria-hidden="true"
                  className="sf-link absolute left-[1.95rem] top-[4.1rem] bottom-[-0.35rem] w-px lg:left-[calc(50%+2.3rem)] lg:right-[calc(-50%+2.3rem)] lg:top-[2rem] lg:bottom-auto lg:h-px lg:w-auto"
                  style={{ ['--i' as string]: i }}
                />
              )}
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                className="group relative z-10 flex w-full items-center gap-4 rounded-card-sm py-2.5 pr-2 text-left lg:flex-col lg:gap-3 lg:px-1 lg:py-1 lg:text-center"
              >
                <span
                  className={`relative flex h-[4rem] w-[4rem] shrink-0 items-center justify-center rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? 'border-transparent bg-nuit text-white shadow-haute'
                      : core
                        ? 'border-cyan/50 bg-white text-ocean shadow-douce group-hover:border-cyan'
                        : 'border-trait bg-white text-gris group-hover:border-ocean/40 group-hover:text-ocean'
                  }`}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                  <span
                    aria-hidden="true"
                    className="sf-node-pulse absolute inset-0 rounded-2xl"
                    style={{ ['--i' as string]: i }}
                  />
                  {isActive && (
                    <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-cyan ring-4 ring-white" aria-hidden="true" />
                  )}
                </span>
                <span className="flex min-w-0 flex-col lg:items-center">
                  <span className="font-display text-[1rem] font-semibold leading-tight text-nuit">{node.title}</span>
                  <span className="mt-0.5 text-[0.86rem] leading-snug text-gris">{node.sub}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* Résultats possibles : ils s'allument l'un après l'autre */}
      <ul className="mt-6 flex flex-wrap gap-2 pl-[5rem] lg:mt-8 lg:justify-end lg:pl-0" aria-label={nodes[last]?.title}>
        {outcomes.map((o, i) => (
          <li
            key={o}
            className="sf-outcome rounded-full border border-trait bg-white px-3 py-1.5 text-[0.85rem] font-medium text-nuit"
            style={{ ['--o' as string]: i }}
          >
            {o}
          </li>
        ))}
      </ul>

      <div className="mt-8 rounded-card border border-trait/80 bg-white p-6 shadow-douce lg:mt-10" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            <p className="font-display text-lg font-semibold text-nuit">
              <span className="mr-2 text-ocean">{active + 1}.</span>
              {nodes[active].title}
            </p>
            <p className="mt-2 text-gris">{nodes[active].text}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <figcaption className="mt-3 text-sm text-gris">{hint}</figcaption>
    </figure>
  );
}
