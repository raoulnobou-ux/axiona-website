'use client';

import { useParams } from 'next/navigation';
import { Link, usePathname } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';

type Props = {
  locale: Locale;
  label: string;
  switchLabel: string;
  tone?: 'dark' | 'light';
  className?: string;
};

/** Sélecteur FR | EN : garde la même page en changeant de langue. */
export function LangSwitch({ locale, label, switchLabel, tone = 'dark', className = '' }: Props) {
  const pathname = usePathname();
  const params = useParams<{ slug?: string }>();
  const href = (params?.slug ? { pathname, params: { slug: params.slug } } : { pathname }) as Parameters<
    typeof Link
  >[0]['href'];

  const base = tone === 'dark' ? 'text-gris hover:text-nuit' : 'text-white/70 hover:text-white';
  const active = tone === 'dark' ? 'text-nuit' : 'text-white';

  return (
    <nav aria-label={label} className={`flex items-center font-display text-sm font-semibold ${className}`}>
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && (
            <span aria-hidden="true" className={tone === 'dark' ? 'px-1 text-trait' : 'px-1 text-white/30'}>
              |
            </span>
          )}
          {l === locale ? (
            <span aria-current="true" className={`rounded-md px-1.5 py-1 ${active}`}>
              {l.toUpperCase()}
            </span>
          ) : (
            <Link
              href={href}
              locale={l}
              lang={l}
              hrefLang={l}
              title={switchLabel}
              className={`rounded-md px-1.5 py-1 transition-colors ${base}`}
            >
              {l.toUpperCase()}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
