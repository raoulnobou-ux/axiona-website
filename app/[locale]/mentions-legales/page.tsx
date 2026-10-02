import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { fill, getDictionary } from '@/content';
import { site } from '@/config/site';
import { pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(locale);
  return pageMetadata({ locale, href: '/mentions-legales', title: t.meta.legalTitle, description: t.meta.legalDescription });
}

export default async function LegalPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = getDictionary(locale);

  return (
    <section className="pb-24 pt-32 sm:pt-40">
      <div className="container-ax">
        <div className="prose-ax">
          <h1 className="h-section">{t.legal.title}</h1>
          <p className="mt-3 text-sm text-gris">{t.legal.updated}</p>
          {t.legal.sections.map((s) => (
            <div key={s.title} className="mt-12">
              <h2 className="h-card">{s.title}</h2>
              <div className="mt-3 space-y-2 text-gris">
                {s.body.map((line) => (
                  <p key={line}>{fill(line, { email: site.contact.email })}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
