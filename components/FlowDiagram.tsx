'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CircleCheck, MessageCircle, Sparkles, Workflow } from 'lucide-react';

type Props = {
  label: string;
  hint: string;
  nodes: { title: string; text: string }[];
  outcomes: string[];
};

const ICONS = [MessageCircle, Sparkles, Workflow, CircleCheck];

/**
 * Schéma interactif : message WhatsApp → agent IA → workflow n8n → résultats.
 * Chaque étape est un bouton ; le flux s'allume jusqu'à l'étape choisie.
 */
export function FlowDiagram({ label, hint, nodes, outcomes }: Props) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  return (
    <figure className="relative" aria-label={label}>
      <ol className="relative grid grid-cols-1 gap-3 md:grid-cols-4 md:gap-0">
        {nodes.map((node, i) => {
          const Icon = ICONS[i] ?? Sparkles;
          const lit = i <= active;
          const isActive = i === active;
          return (
            <li key={node.title} className="relative flex md:flex-col md:items-center">
              {/* Connecteur vers l'étape suivante */}
              {i < nodes.length - 1 && (
                <svg
                  aria-hidden="true"
                  className="absolute left-[1.9rem] top-[3.9rem] h-[calc(100%-2.6rem)] w-2 md:left-[calc(50%+2.4rem)] md:top-[1.85rem] md:h-2 md:w-[calc(100%-4.8rem)]"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 100"
                >
                  <line x1="50" y1="0" x2="50" y2="100" className="md:hidden" stroke="#D6E4EE" strokeWidth="6" vectorEffect="non-scaling-stroke" />
                  <line x1="0" y1="50" x2="100" y2="50" className="hidden md:block" stroke="#D6E4EE" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                  {i < active && (
                    <>
                      <line x1="50" y1="0" x2="50" y2="100" className={`md:hidden ${reduce ? '' : 'flow-dash'}`} stroke="#4FD1F0" strokeWidth="3" strokeDasharray="6 8" vectorEffect="non-scaling-stroke" />
                      <line x1="0" y1="50" x2="100" y2="50" className={`hidden md:block ${reduce ? '' : 'flow-dash'}`} stroke="#4FD1F0" strokeWidth="2.5" strokeDasharray="6 8" vectorEffect="non-scaling-stroke" />
                    </>
                  )}
                </svg>
              )}
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                className="group relative z-10 flex w-full items-center gap-4 rounded-card-sm p-2 text-left md:flex-col md:gap-3 md:p-1 md:text-center"
              >
                <span
                  className={`relative flex h-[3.75rem] w-[3.75rem] shrink-0 items-center justify-center rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? 'border-transparent bg-nuit text-white shadow-haute'
                      : lit
                        ? 'border-cyan/60 bg-white text-ocean'
                        : 'border-trait bg-white text-gris group-hover:border-ocean/40 group-hover:text-ocean'
                  }`}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                  {isActive && <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-cyan ring-4 ring-white" aria-hidden="true" />}
                </span>
                <span className="flex flex-col md:items-center">
                  <span className="text-xs font-medium text-gris">{i + 1}</span>
                  <span className={`font-display text-[1rem] font-semibold ${isActive ? 'text-nuit' : 'text-nuit/80'}`}>{node.title}</span>
                </span>
              </button>
              {i === nodes.length - 1 && (
                <ul className="ml-[4.75rem] mt-1 flex flex-wrap gap-1.5 md:ml-0 md:mt-3 md:justify-center" aria-label={node.title}>
                  {outcomes.map((o) => (
                    <li
                      key={o}
                      className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors duration-300 ${
                        active === nodes.length - 1 ? 'bg-cyan-pale text-ocean-fonce' : 'bg-brume text-gris'
                      }`}
                    >
                      {o}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-8 min-h-[7.5rem] rounded-card border border-trait/80 bg-white p-6 shadow-douce md:mt-10" aria-live="polite">
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
