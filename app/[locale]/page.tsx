import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ExternalLink, MapPin, PlugZap, Smartphone } from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { getDictionary } from '@/content';
import { getBranches } from '@/content/branches';
import { site } from '@/config/site';
import { pageMetadata } from '@/lib/seo';
import { Hero } from '@/components/Hero';
import { FlowDiagram } from '@/components/FlowDiagram';
import { BranchCard } from '@/components/BranchCard';
import { SectionHeading } from '@/components/SectionHeading';
import { Steps } from '@/components/Steps';
import { ContactForm } from '@/components/ContactForm';
import { FounderPortrait } from '@/components/FounderPortrait';
import { Reveal } from '@/components/Reveal';
import { Symbol } from '@/components/Symbol';
import { WhatsAppLink } from '@/components/WhatsAppLink';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { LightLines } from '@/components/Illustrations';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(locale);
  return pageMetadata({ locale, href: '/', title: t.meta.homeTitle, description: t.meta.homeDescription, absoluteTitle: true });
}

const STRIP_ICONS = [MapPin, Smartphone, PlugZap];

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = getDictionary(locale);
  const branches = getBranches(locale);
  const featured = branches.filter((b) => b.featured);
  const others = branches.filter((b) => !b.featured);
  const formBranches = branches.map(({ slug, name }) => ({ slug, name }));

  return (
    <>
      <Hero t={t} whatsappMessage={t.common.whatsappMessage} />

      {/* 2. Bandeau sobre */}
      <section id="bandeau" aria-label="AXIONA" className="border-y border-trait/70 bg-white">
        <ul className="container-ax grid gap-4 py-6 sm:grid-cols-3 sm:gap-6 sm:py-7">
          {t.strip.map((item, i) => {
            const Icon = STRIP_ICONS[i];
            return (
              <li key={item} className="flex items-center gap-3 text-[0.98rem] font-medium text-nuit sm:justify-center">
                <Icon className="h-5 w-5 shrink-0 text-ocean" aria-hidden="true" />
                {item}
              </li>
            );
          })}
        </ul>
      </section>

      {/* 3. Offre phare : AI + Automation */}
      <section className="relative overflow-hidden bg-brume py-20 sm:py-28" aria-labelledby="phare-title">
        <LightLines className="pointer-events-none absolute inset-x-0 top-0 h-64 w-full opacity-70" />
        <div className="container-ax relative">
          <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="font-display text-sm font-semibold text-ocean">AXIONA AI + AXIONA Automation</p>
              <h2 id="phare-title" className="h-section mt-3">
                {t.flagship.title}
              </h2>
            </div>
            <p className="lead lg:col-span-5">{t.flagship.intro}</p>
          </Reveal>

          <Reveal className="mt-12 rounded-card-lg bg-white/60 p-5 ring-1 ring-trait/70 backdrop-blur sm:p-8 lg:p-10">
            <FlowDiagram
              label={t.flagship.diagramLabel}
              hint={t.flagship.diagramHint}
              nodes={t.flagship.nodes}
              outcomes={t.flagship.outcomes}
            />
          </Reveal>

          <div className="mt-14">
            <h3 className="h-card">{t.flagship.casesTitle}</h3>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {t.flagship.cases.map((c, i) => (
                <Reveal as="li" key={c.title} delay={i * 60} className="rounded-card bg-white p-6 shadow-douce">
                  <p className="font-display text-[1.05rem] font-semibold text-nuit">{c.title}</p>
                  <p className="mt-2 text-[0.98rem] text-gris">{c.text}</p>
                </Reveal>
              ))}
            </ul>
          </div>

          <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center">
            <WhatsAppLink message={t.common.whatsappDemoMessage} className="btn btn-primary">
              <WhatsAppIcon />
              {t.flagship.cta}
            </WhatsAppLink>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <Link href={{ pathname: '/branches/[slug]', params: { slug: 'ai' } }} className="link-ax">
                {t.flagship.linkAi}
              </Link>
              <Link href={{ pathname: '/branches/[slug]', params: { slug: 'automation' } }} className="link-ax">
                {t.flagship.linkAutomation}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Les 8 branches */}
      <section className="relative overflow-hidden py-20 sm:py-28" aria-labelledby="branches-title">
        <Symbol className="pointer-events-none absolute -right-24 -top-10 h-[34rem] w-auto opacity-[0.035]" />
        <div className="container-ax relative">
          <Reveal>
            <SectionHeading id="branches-title" title={t.branchesSection.title} intro={t.branchesSection.intro} />
          </Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-12">
            {featured.map((b, i) => (
              <Reveal key={b.slug} delay={i * 80} className={i === 0 ? 'lg:col-span-7' : 'lg:col-span-5'}>
                <BranchCard
                  branch={b}
                  size="large"
                  statusLabels={t.common.status}
                  linkLabel={t.common.seeBranch}
                  flagshipLabel={t.branchesSection.flagshipLabel}
                />
              </Reveal>
            ))}
          </div>
          <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((b, i) => (
              <Reveal as="li" key={b.slug} delay={(i % 3) * 60}>
                <BranchCard branch={b} statusLabels={t.common.status} linkLabel={t.common.seeBranch} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Comment ça se passe */}
      <section className="bg-brume py-20 sm:py-28" aria-labelledby="process-title">
        <div className="container-ax">
          <Reveal>
            <SectionHeading id="process-title" title={t.process.title} intro={t.process.intro} />
          </Reveal>
          <Reveal className="mt-14">
            <Steps steps={t.process.steps} />
          </Reveal>
        </div>
      </section>

      {/* 6. Academy & Digital */}
      <section className="py-20 sm:py-28" aria-labelledby="learn-title">
        <div className="container-ax grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionHeading id="learn-title" title={t.learn.title} intro={t.learn.intro} />
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center lg:flex-col lg:items-start">
              <a href={site.links.chariowStore} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                {t.learn.cta}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">{t.common.externalHint}</span>
              </a>
              <div className="flex gap-6">
                <Link href={{ pathname: '/branches/[slug]', params: { slug: 'academy' } }} className="link-ax">
                  {t.learn.academy}
                </Link>
                <Link href={{ pathname: '/branches/[slug]', params: { slug: 'digital' } }} className="link-ax">
                  {t.learn.digital}
                </Link>
              </div>
            </div>
          </Reveal>
          <ul className="grid gap-4 lg:col-span-7">
            {t.learn.items.map((item, i) => (
              <Reveal
                as="li"
                key={item.title}
                delay={i * 70}
                className={`flex flex-col gap-3 rounded-card border border-trait/80 p-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8 ${
                  i === 0 ? 'bg-[linear-gradient(120deg,#ffffff_40%,#d9f5fc)]' : 'bg-white'
                }`}
              >
                <div>
                  <h3 className="h-card">{item.title}</h3>
                  <p className="mt-1.5 text-gris">{item.text}</p>
                </div>
                <span className="w-fit shrink-0 rounded-full bg-nuit px-3 py-1 font-display text-sm font-semibold text-white">
                  {item.tag}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. Le fondateur */}
      <section className="bg-brume py-20 sm:py-28" aria-labelledby="founder-title">
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
            <p className="mt-6 text-lg text-encre">{t.founder.bio}</p>
            <blockquote className="mt-8 border-l-2 border-cyan pl-5">
              <p className="text-sm font-medium text-gris">{t.founder.visionLabel}</p>
              <p className="mt-1 font-display text-2xl font-semibold leading-snug text-nuit">{t.founder.vision}</p>
            </blockquote>
            <Link href="/a-propos" className="link-ax mt-8 inline-block">
              {t.founder.cta}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 8. Appel final */}
      <section className="on-dark relative isolate overflow-hidden bg-nuit py-20 text-white sm:py-28" aria-labelledby="final-title">
        <div
          aria-hidden="true"
          className="absolute -right-40 -top-40 -z-10 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgb(79_209_240/0.35),transparent_62%)]"
        />
        <div className="container-ax grid gap-12 lg:grid-cols-12">
          <div className="relative lg:col-span-5">
            <svg aria-hidden="true" className="mb-6 h-9 w-9 text-cyan" viewBox="0 0 40 40">
              <path d="M20 2 L23 17 L38 20 L23 23 L20 38 L17 23 L2 20 L17 17 Z" fill="currentColor" className="spark-pulse" />
            </svg>
            <h2 id="final-title" className="h-section !text-white">
              {t.finalCta.title}
            </h2>
            <p className="mt-5 text-lg text-white/75">{t.finalCta.text}</p>
            <WhatsAppLink message={t.common.whatsappMessage} className="btn btn-light mt-8">
              <WhatsAppIcon />
              {t.finalCta.whatsapp}
            </WhatsAppLink>
          </div>
          <div className="lg:col-span-7">
            <p className="mb-5 text-sm text-white/60">{t.finalCta.or}</p>
            <ContactForm t={t.form} locale={locale} branches={formBranches} tone="dark" compact />
          </div>
        </div>
      </section>
    </>
  );
}
