import type { Metadata } from 'next';
import { getPathname } from '@/i18n/navigation';
import { routing, type AppPathname, type Locale } from '@/i18n/routing';
import { site } from '@/config/site';
import { getDictionary } from '@/content';

type Href = AppPathname | { pathname: '/branches/[slug]'; params: { slug: string } };

export function localizedUrl(locale: Locale, href: Href) {
  // getPathname attend un href typé ; le cast reste local à ce helper.
  const path = getPathname({ locale, href: href as Parameters<typeof getPathname>[0]['href'] });
  return `${site.url}${path === '/' ? '' : path}`;
}

/** Métadonnées d'une page : titre, description, canonique, hreflang, Open Graph. */
export function pageMetadata({
  locale,
  href,
  title,
  description,
  absoluteTitle = false,
}: {
  locale: Locale;
  href: Href;
  title: string;
  description: string;
  absoluteTitle?: boolean;
}): Metadata {
  const t = getDictionary(locale);
  const languages = Object.fromEntries(routing.locales.map((l) => [l, localizedUrl(l, href)]));
  const url = localizedUrl(locale, href);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: { ...languages, 'x-default': localizedUrl(routing.defaultLocale, href) },
    },
    openGraph: {
      type: 'website',
      url,
      siteName: site.name,
      title,
      description,
      locale: locale === 'fr' ? 'fr_CM' : 'en_CM',
      alternateLocale: locale === 'fr' ? ['en_CM'] : ['fr_CM'],
      images: [{ url: '/brand/og-image.png', width: 1200, height: 630, alt: t.meta.ogAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/brand/og-image.png'],
    },
  };
}
