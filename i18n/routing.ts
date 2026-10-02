import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localePrefix: 'always',
  // Les balises hreflang sont générées par les métadonnées de chaque page (lib/seo.ts).
  alternateLinks: false,
  // Chemins traduits : le dossier dans /app porte le nom français,
  // la version anglaise est servie sous un chemin anglais.
  pathnames: {
    '/': '/',
    '/branches': '/branches',
    '/branches/[slug]': '/branches/[slug]',
    '/a-propos': { fr: '/a-propos', en: '/about' },
    '/contact': '/contact',
    '/mentions-legales': { fr: '/mentions-legales', en: '/legal-notice' },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
