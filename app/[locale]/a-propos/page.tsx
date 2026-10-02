import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { MapPin } from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { getDictionary } from '@/content';
import { pageMetadata } from '@/lib/seo';
import { FounderPortrait } from '@/components/FounderPortrait';
import { Reveal } from '@/components/Reveal';
import { WhatsAppLink } from '@/components/WhatsAppLink';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { LightLines } from '@/components/Illustrations';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(locale);
  return pageMetadata({ locale, href: '/a-propos', title: t.meta.aboutTitle, description: t.meta.aboutDescription });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = getDictionary(locale);
  const a = t.about;

  return (
    <>
      <section className="relative overflow-hidden bg-lumiere pb-16 pt-32 sm:pb-24 sm:pt-40">
        <LightLines className="pointer-events-none absolute inset-x-0 bottom-0 h-56 w-full opacity-60" />
        <div className="container-ax relative">
          <h1 className="h-display max-w-4xl">{a.title}</h1>
          <p className="lead mt-6 max-w-2xl">{a.intro}</p>
        </div>
      </section>

      <section className="py-20 sm:py-24" aria-labelledby="vision-title">
        <div className="container-ax grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 id="vision-title" className="h-section">
              {a.visionTitle}
            </h2>
            <p className="mt-6 font-display text-2xl font-semibold leading-snug text-nuit">{a.vision}</p>
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={80}>
            <h2 className="h-section">{a.storyTitle}</h2>
            <div className="mt-6 space-y-5 text-lg text-gris">
              {a.story.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </div>
            <Link href="/branches" className="link-ax mt-6 inline-block">
              {t.nav.allBranches}
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-brume py-20 sm:py-24" aria-labelledby="founder-title">
        <div className="container-ax grid items-center gap-10 md:grid-cols-12 lg:gap-16">
          <Reveal className="md:col-span-5">
            <FounderPortrait alt={t.founder.photoAlt} placeholderAlt={t.founder.placeholderAlt} className="aspect-[4/5] w-full max-w-md" />
          </Reveal>
          <Reveal className="md:col-span-7" delay={80}>
            <h2 id="founder-title" className="font-display text-sm font-semibold !tracking-normal text-ocean">
              {t.founder.title}
            </h2>
            <p className="h-section mt-3 font-display font-semibold text-nuit">{t.founder.name}</p>
            <p className="mt-2 font-display text-lg text-gris">{t.founder.role}</p>
            <p className="mt-6 text-lg">{t.founder.bio}</p>
            <blockquote className="mt-8 border-l-2 border-cyan pl-5">
              <p className="text-sm font-medium text-gris">{t.founder.visionLabel}</p>
              <p className="mt-1 font-display text-2xl font-semibold leading-snug text-nuit">{t.founder.vision}</p>
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className="py-20 sm:py-24" aria-labelledby="values-title">
        <div className="container-ax">
          <h2 id="values-title" className="h-section">
            {a.valuesTitle}
          </h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {a.values.map((v, i) => (
              <Reveal
                as="li"
                key={v.title}
                delay={(i % 2) * 70}
                className={`p-7 ${i === 0 ? 'rounded-card-lg bg-nuit text-white' : 'rounded-card border border-trait/80 bg-white'}`}
              >
                <h3 className={`h-card ${i === 0 ? '!text-white' : ''}`}>{v.title}</h3>
                <p className={`mt-2 ${i === 0 ? 'text-white/75' : 'text-gris'}`}>{v.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-brume py-20 sm:py-24" aria-labelledby="location-title">
        <div className="container-ax flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 id="location-title" className="h-section flex items-center gap-3">
              <MapPin className="h-7 w-7 shrink-0 text-ocean" aria-hidden="true" />
              {a.locationTitle}
            </h2>
            <p className="lead mt-4">{a.location}</p>
          </div>
          <WhatsAppLink message={t.common.whatsappMessage} className="btn btn-primary shrink-0">
            <WhatsAppIcon />
            {t.nav.expert}
          </WhatsAppLink>
        </div>
      </section>
    </>
  );
}
