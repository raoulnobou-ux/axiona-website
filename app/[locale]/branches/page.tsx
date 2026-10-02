import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { getDictionary } from '@/content';
import { getBranches } from '@/content/branches';
import { pageMetadata } from '@/lib/seo';
import { BranchCard } from '@/components/BranchCard';
import { Reveal } from '@/components/Reveal';
import { WhatsAppLink } from '@/components/WhatsAppLink';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { Link } from '@/i18n/navigation';
import { LightLines } from '@/components/Illustrations';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(locale);
  return pageMetadata({ locale, href: '/branches', title: t.meta.branchesTitle, description: t.meta.branchesDescription });
}

export default async function BranchesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = getDictionary(locale);
  const branches = getBranches(locale);
  const featured = branches.filter((b) => b.featured);
  const others = branches.filter((b) => !b.featured);

  return (
    <>
      <section className="relative overflow-hidden bg-lumiere pb-14 pt-32 sm:pb-20 sm:pt-40">
        <LightLines className="pointer-events-none absolute inset-x-0 bottom-0 h-48 w-full opacity-60" />
        <div className="container-ax relative">
          <h1 className="h-display max-w-3xl">{t.branchesPage.title}</h1>
          <p className="lead mt-6 max-w-2xl">{t.branchesPage.intro}</p>
        </div>
      </section>

      <section className="pb-20 sm:pb-28" aria-labelledby="flagship-title">
        <div className="container-ax">
          <h2 id="flagship-title" className="h-card text-gris">
            {t.branchesPage.flagshipTitle}
          </h2>
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {featured.map((b) => (
              <Reveal key={b.slug}>
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
          <h2 className="h-card mt-16 text-gris">{t.branchesPage.othersTitle}</h2>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((b, i) => (
              <Reveal as="li" key={b.slug} delay={(i % 3) * 60}>
                <BranchCard branch={b} statusLabels={t.common.status} linkLabel={t.common.seeBranch} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-brume py-16 sm:py-20">
        <div className="container-ax flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="h-section">{t.branchesPage.ctaTitle}</h2>
            <p className="lead mt-3">{t.branchesPage.ctaText}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <WhatsAppLink message={t.common.whatsappMessage} className="btn btn-primary">
              <WhatsAppIcon />
              {t.nav.expert}
            </WhatsAppLink>
            <Link href="/contact" className="btn btn-ghost">
              {t.nav.contact}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
