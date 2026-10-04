import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { ChevronRight, ExternalLink } from 'lucide-react';
import { routing, type Locale } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { fill, getDictionary } from '@/content';
import { branchSlugs, getBranch, getBranches } from '@/content/branches';
import { site } from '@/config/site';
import { localizedUrl, pageMetadata } from '@/lib/seo';
import { BranchIcon } from '@/components/BranchIcon';
import { SystemFlow } from '@/components/SystemFlow';
import { ContactForm } from '@/components/ContactForm';
import { Faq } from '@/components/Faq';
import { Steps } from '@/components/Steps';
import { Reveal } from '@/components/Reveal';
import { JsonLd } from '@/components/JsonLd';
import { WhatsAppLink } from '@/components/WhatsAppLink';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { FlowLines, LightLines, NodeNetwork } from '@/components/Illustrations';

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => branchSlugs.map((slug) => ({ locale, slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const branch = getBranch(slug, locale);
  if (!branch) return {};
  const t = getDictionary(locale);
  return pageMetadata({
    locale,
    href: { pathname: '/branches/[slug]', params: { slug } },
    title: fill(t.meta.branchTitle, { name: branch.name, tagline: branch.tagline.replace(/\.$/, '') }),
    description: `${branch.tagline} ${branch.intro}`.slice(0, 300),
  });
}

export default async function BranchPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const branch = getBranch(slug, locale);
  if (!branch) notFound();

  const t = getDictionary(locale);
  const tb = t.branchPage;
  const all = getBranches(locale);
  const others = all.filter((b) => b.slug !== branch.slug);
  const whatsappMessage = fill(t.common.whatsappBranchMessage, { name: branch.name });
  const rich = branch.slug === 'ai' || branch.slug === 'automation';
  const soon = branch.status === 'soon';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: branch.name,
        description: branch.tagline,
        serviceType: branch.keywords.join(', '),
        provider: { '@type': 'Organization', name: site.name, url: site.url },
        areaServed: ['CM', 'Africa'],
        url: localizedUrl(locale, { pathname: '/branches/[slug]', params: { slug } }),
      },
      {
        '@type': 'FAQPage',
        mainEntity: branch.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: tb.breadcrumb, item: localizedUrl(locale, '/branches') },
          { '@type': 'ListItem', position: 2, name: branch.name },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* Hero de la branche */}
      <section className="relative overflow-hidden bg-lumiere pb-16 pt-28 sm:pb-24 sm:pt-36">
        <LightLines className="pointer-events-none absolute inset-x-0 bottom-0 h-56 w-full opacity-60" />
        <div className="container-ax relative grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-1.5 text-sm text-gris">
                <li>
                  <Link href="/branches" className="hover:text-ocean">
                    {tb.breadcrumb}
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="h-3.5 w-3.5" />
                </li>
                <li aria-current="page" className="text-nuit">
                  {branch.name}
                </li>
              </ol>
            </nav>
            <div className="mt-8 flex items-center gap-4">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-nuit shadow-douce ring-1 ring-trait/70">
                <BranchIcon slug={branch.slug} className="h-9 w-9" />
              </span>
              <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                  soon ? 'border border-trait bg-white text-gris' : 'bg-cyan-pale text-ocean-fonce'
                }`}
              >
                {t.common.status[branch.status]}
              </span>
            </div>
            <h1 className="h-display mt-6 !text-[clamp(2.2rem,5.4vw,3.8rem)]">{branch.name}</h1>
            <p className="mt-5 font-display text-xl font-semibold leading-snug text-ocean sm:text-2xl">{branch.tagline}</p>
            <p className="lead mt-5 max-w-2xl">{branch.intro}</p>
            {soon && <p className="mt-4 text-sm font-medium text-gris">{tb.soonNote}</p>}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <WhatsAppLink message={whatsappMessage} className="btn btn-primary">
                <WhatsAppIcon />
                {t.nav.expert}
              </WhatsAppLink>
              <a href="#demande" className="btn btn-ghost">
                {t.contactPage.formTitle}
              </a>
            </div>
          </div>
          {rich && (
            <div className="hidden lg:col-span-5 lg:block" aria-hidden="true">
              <div className="rounded-card-lg bg-white/70 p-8 shadow-douce ring-1 ring-trait/70">
                {branch.slug === 'ai' ? <NodeNetwork className="w-full" /> : <FlowLines className="w-full" />}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Ce que nous faisons */}
      <section className="py-20 sm:py-24" aria-labelledby="what-title">
        <div className="container-ax">
          <h2 id="what-title" className="h-section">
            {tb.whatWeDo}
          </h2>
          <ul className={`mt-10 grid gap-5 sm:grid-cols-2 ${branch.services.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
            {branch.services.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 60} className="rounded-card border border-trait/80 bg-white p-6">
                <h3 className="h-card">{s.title}</h3>
                <p className="mt-2 text-[0.98rem] text-gris">{s.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Pages AI et Automation : schéma + cas d'usage */}
      {rich && (
        <section className="bg-brume py-20 sm:py-24" aria-labelledby="flow-title">
          <div className="container-ax">
            <h2 id="flow-title" className="h-section max-w-2xl">
              {tb.flow}
            </h2>
            <Reveal className="mt-10 rounded-card-lg bg-white/60 p-5 ring-1 ring-trait/70 sm:p-8 lg:p-10">
              <SystemFlow label={t.flagship.diagramLabel} hint={t.flagship.diagramHint} nodes={t.flagship.nodes} outcomes={t.flagship.outcomes} />
            </Reveal>
            {branch.useCases && (
              <>
                <h3 className="h-card mt-14">{tb.useCases}</h3>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {branch.useCases.map((u, i) => (
                    <Reveal as="li" key={u.title} delay={(i % 2) * 60} className="rounded-card bg-white p-6 shadow-douce">
                      <p className="font-display text-[1.05rem] font-semibold text-nuit">{u.title}</p>
                      <p className="mt-2 text-gris">{u.text}</p>
                    </Reveal>
                  ))}
                </ul>
              </>
            )}
          </div>
        </section>
      )}

      {/* Produit (QuickSign) */}
      {branch.product && (
        <section className="py-20 sm:py-24" aria-labelledby="product-title">
          <div className="container-ax">
            <Reveal className="relative overflow-hidden rounded-card-lg bg-nuit p-8 text-white sm:p-12">
              <div aria-hidden="true" className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgb(79_209_240/0.35),transparent_65%)]" />
              <p className="relative text-sm font-medium text-cyan">{tb.product}</p>
              <h2 id="product-title" className="h-section relative mt-2 !text-white">
                {branch.product.name}
              </h2>
              <p className="relative mt-4 max-w-xl text-lg text-white/80">{branch.product.text}</p>
              <div className="relative mt-8">
                {branch.product.href ? (
                  <a href={branch.product.href} target="_blank" rel="noopener noreferrer" className="btn btn-light">
                    {branch.product.cta}
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">{t.common.externalHint}</span>
                  </a>
                ) : (
                  <span className="inline-flex rounded-full border border-white/25 px-4 py-2 text-sm font-medium text-white/85">
                    {tb.productSoon}
                  </span>
                )}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Exemple + déroulé */}
      <section className={`py-20 sm:py-24 ${rich ? '' : 'bg-brume'}`} aria-labelledby="example-title">
        <div className="container-ax">
          <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <h2 id="example-title" className="h-section lg:col-span-4">
              {tb.example}
            </h2>
            <div className="rounded-card-lg border-l-4 border-cyan bg-white p-7 shadow-douce sm:p-9 lg:col-span-8">
              <p className="font-display text-xl font-semibold text-nuit">{branch.example.title}</p>
              <p className="mt-3 text-lg leading-relaxed text-gris">{branch.example.text}</p>
            </div>
          </Reveal>
          <h2 className="h-section mt-20">{tb.steps}</h2>
          <Reveal className="mt-10">
            <Steps steps={branch.steps.map((s) => ({ title: s }))} />
          </Reveal>
        </div>
      </section>

      {/* Tarifs + FAQ */}
      <section className={`py-20 sm:py-24 ${rich ? 'bg-brume' : ''}`} aria-labelledby="pricing-title">
        <div className="container-ax grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="pricing-title" className="h-section">
              {tb.pricing}
            </h2>
            <ul className="mt-8 space-y-3">
              {branch.pricing.map((p) => (
                <li key={p.label} className="rounded-card-sm bg-white p-5 ring-1 ring-trait/80">
                  <p className="font-display font-semibold text-nuit">{p.label}</p>
                  {p.detail && <p className="mt-1 text-[0.95rem] text-gris">{p.detail}</p>}
                </li>
              ))}
            </ul>
            {branch.storeLink && (
              <a href={site.links.chariowStore} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-6">
                {tb.store}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">{t.common.externalHint}</span>
              </a>
            )}
          </div>
          <div className="lg:col-span-8">
            <h2 className="h-section">{tb.faq}</h2>
            <div className="mt-8">
              <Faq items={branch.faq} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA + formulaire prérempli */}
      <section id="demande" className="on-dark relative isolate overflow-hidden bg-nuit py-20 text-white sm:py-24" aria-labelledby="cta-title">
        <div aria-hidden="true" className="absolute -left-32 -top-40 -z-10 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgb(79_209_240/0.28),transparent_62%)]" />
        <div className="container-ax grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="cta-title" className="h-section !text-white">
              {tb.ctaTitle}
            </h2>
            <p className="mt-4 text-lg text-white/75">{tb.ctaText}</p>
            <WhatsAppLink message={whatsappMessage} className="btn btn-light mt-8">
              <WhatsAppIcon />
              {t.common.whatsapp}
            </WhatsAppLink>
          </div>
          <div className="lg:col-span-7">
            <ContactForm
              t={t.form}
              locale={locale}
              branches={all.map(({ slug: s, name }) => ({ slug: s, name }))}
              defaultBranch={branch.slug}
              tone="dark"
            />
          </div>
        </div>
      </section>

      {/* Autres branches */}
      <section className="py-16" aria-labelledby="others-title">
        <div className="container-ax">
          <h2 id="others-title" className="h-card">
            {tb.otherBranches}
          </h2>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {others.map((b) => (
              <li key={b.slug}>
                <Link
                  href={{ pathname: '/branches/[slug]', params: { slug: b.slug } }}
                  className="inline-flex items-center gap-2 rounded-full border border-trait bg-white py-2 pl-2 pr-4 text-[0.95rem] font-medium text-nuit transition-colors hover:border-ocean/50 hover:bg-brume"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brume">
                    <BranchIcon slug={b.slug} className="h-4 w-4" />
                  </span>
                  {b.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
