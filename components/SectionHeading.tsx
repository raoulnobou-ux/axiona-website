import type { ReactNode } from 'react';

type Props = {
  title: string;
  intro?: ReactNode;
  id?: string;
  tone?: 'dark' | 'light';
  align?: 'left' | 'center';
  className?: string;
  as?: 'h1' | 'h2';
};

export function SectionHeading({ title, intro, id, tone = 'dark', align = 'left', className = '', as: H = 'h2' }: Props) {
  return (
    <div className={`${align === 'center' ? 'mx-auto text-center' : ''} max-w-2xl ${className}`}>
      <H id={id} className={`h-section ${tone === 'light' ? '!text-white' : ''}`}>
        {title}
      </H>
      {intro && <p className={`lead mt-4 ${tone === 'light' ? '!text-white/75' : ''}`}>{intro}</p>}
    </div>
  );
}
