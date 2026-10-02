import type { MetadataRoute } from 'next';
import { routing, type AppPathname } from '@/i18n/routing';
import { branchSlugs } from '@/content/branches';
import { localizedUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths: AppPathname[] = ['/', '/branches', '/a-propos', '/contact', '/mentions-legales'];
  const hrefs = [
    ...staticPaths.map((p) => p as Parameters<typeof localizedUrl>[1]),
    ...branchSlugs.map((slug) => ({ pathname: '/branches/[slug]' as const, params: { slug } })),
  ];
  const now = new Date();
  return hrefs.flatMap((href) =>
    routing.locales.map((locale) => ({
      url: localizedUrl(locale, href),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: href === '/' ? 1 : 0.7,
      alternates: { languages: Object.fromEntries(routing.locales.map((l) => [l, localizedUrl(l, href)])) },
    })),
  );
}
