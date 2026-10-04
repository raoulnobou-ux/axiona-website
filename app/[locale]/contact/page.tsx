import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Clock, Mail, MapPin } from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import { getDictionary } from '@/content';
import { getBranches } from '@/content/branches';
import { isTodo, site } from '@/config/site';
import { pageMetadata } from '@/lib/seo';
import { ContactForm } from '@/components/ContactForm';
import { WhatsAppLink } from '@/components/WhatsAppLink';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(locale);
  return pageMetadata({ locale, href: '/contact', title: t.meta.contactTitle, description: t.meta.contactDescription });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = getDictionary(locale);
  const c = t.contactPage;
  const branches = getBranches(locale).map(({ slug, name }) => ({ slug, name }));
  const email = site.contact.email;

  return (
    <section className="bg-lumiere pb-20 pt-32 sm:pb-28 sm:pt-40">
      <div className="container-ax grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h1 className="h-display !text-[clamp(2.2rem,5vw,3.6rem)]">{c.title}</h1>
          <p className="lead mt-5">{c.intro}</p>

          <div className="mt-10 rounded-card-lg bg-nuit p-7 text-white">
            <p className="font-display text-lg font-semibold">{c.whatsappTitle}</p>
            <p className="mt-1 text-white/75">{c.whatsappText}</p>
            <WhatsAppLink message={t.common.whatsappMessage} className="btn btn-light mt-6 w-full sm:w-auto">
              <WhatsAppIcon />
              {t.common.whatsapp}
            </WhatsAppLink>
          </div>

          <dl className="mt-8 space-y-5">
            <div className="flex gap-4">
              <dt className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brume text-ocean">
                <MapPin className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">{c.locationTitle}</span>
              </dt>
              <dd>
                <p className="text-sm text-gris">{c.locationTitle}</p>
                <p className="font-medium text-nuit">{c.location}</p>
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brume text-ocean">
                <Clock className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">{c.hoursTitle}</span>
              </dt>
              <dd>
                <p className="text-sm text-gris">{c.hoursTitle}</p>
                <ul className="font-medium text-nuit">
                  {site.contact.hours[locale].map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brume text-ocean">
                <Mail className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">{c.emailTitle}</span>
              </dt>
              <dd>
                <p className="text-sm text-gris">{c.emailTitle}</p>
                {isTodo(email) ? (
                  <p className="font-medium text-nuit">{email}</p>
                ) : (
                  <a href={`mailto:${email}`} className="link-ax">
                    {email}
                  </a>
                )}
              </dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-card-lg bg-white p-6 shadow-haute ring-1 ring-trait/70 sm:p-10">
            <h2 className="h-card !text-2xl">{c.formTitle}</h2>
            <div className="mt-7">
              <ContactForm t={t.form} locale={locale} branches={branches} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
