import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { Instrument_Sans, Sora } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { getDictionary } from '@/content';
import { getBranches } from '@/content/branches';
import { site } from '@/config/site';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { WhatsAppFab } from '@/components/WhatsAppFab';
import { JsonLd } from '@/components/JsonLd';
import '../globals.css';

const sora = Sora({ subsets: ['latin'], weight: ['600', '700'], variable: '--font-sora', display: 'swap' });
const instrument = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-instrument',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(locale as Locale);
  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.homeTitle, template: `%s` },
    description: t.meta.homeDescription,
    applicationName: site.name,
    authors: [{ name: site.founder }],
    creator: site.name,
    icons: {
      icon: [{ url: '/brand/favicon.svg', type: 'image/svg+xml' }, { url: '/favicon.ico', sizes: '32x32' }],
      apple: '/brand/apple-touch-icon.png',
    },
    formatDetection: { telephone: false },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = getDictionary(locale);
  const branches = getBranches(locale);

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    logo: `${site.url}/brand/axiona-logo.svg`,
    slogan: t.slogan,
    founder: { '@type': 'Person', name: site.founder, jobTitle: locale === 'fr' ? 'Fondateur & CEO' : 'Founder & CEO' },
    address: { '@type': 'PostalAddress', addressLocality: site.city, addressRegion: site.region, addressCountry: site.countryCode },
    email: site.contact.email,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
        email: site.contact.email,
      availableLanguage: ['French', 'English'],
      hoursAvailable: site.contact.openingHours.map((h) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.days,
        opens: h.opens,
        closes: h.closes,
      })),
    },
    areaServed: ['CM', 'Africa'],
    knowsLanguage: ['fr', 'en'],
    sameAs: site.socials.filter((s) => !s.href.startsWith('TODO_')).map((s) => s.href),
  };

  return (
    <html lang={locale} className={`${sora.variable} ${instrument.variable}`}>
      <body>
        <NextIntlClientProvider>
          <Nav
            locale={locale}
            t={t.nav}
            whatsappMessage={t.common.whatsappMessage}
            flagshipLabel={t.branchesSection.flagshipLabel}
            branches={branches.map(({ slug, name, tagline, featured }) => ({ slug, name, tagline, featured }))}
          />
          <main id="contenu" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer locale={locale} />
          <WhatsAppFab message={t.common.whatsappMessage} label={t.common.whatsappFab} />
        </NextIntlClientProvider>
        <JsonLd data={organization} />
      </body>
    </html>
  );
}
