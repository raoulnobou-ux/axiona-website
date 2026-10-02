'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type Props = { children: ReactNode; className?: string; delay?: number; as?: 'div' | 'li' | 'section' };

/**
 * Apparition douce à l'entrée dans l'écran.
 * Le contenu reste visible sans JavaScript et avec prefers-reduced-motion.
 */
export function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<'idle' | 'hidden' | 'shown'>('idle');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) return; // déjà visible : ne rien animer
    setState('hidden');
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('shown');
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style =
    state === 'idle'
      ? undefined
      : {
          opacity: state === 'shown' ? 1 : 0,
          transform: state === 'shown' ? 'none' : 'translateY(18px)',
          transition: `opacity .7s cubic-bezier(.2,.7,.2,1) ${delay}ms, transform .7s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
        };

  return (
    // @ts-expect-error ref polymorphe
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
