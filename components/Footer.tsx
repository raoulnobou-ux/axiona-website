import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { getDictionary } from '@/content';
import { getBranches } from '@/content/branches';
import { activeSocials, isTodo, site } from '@/config/site';
import { Logo } from './Logo';
import { LangSwitch } from './LangSwitch';
import { WhatsAppLink } from './WhatsAppLink';
import { WhatsAppIcon } from './WhatsAppIcon';

export function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const branches = getBranches(locale);
  const email = site.contact.email;

  return (
    <footer className="border-t border-trait/70 bg-white">
      <div className="container-ax grid gap-12 py-14 md:grid-cols-12 md:py-16">
        <div className="md:col-span-4">
          <Logo />
          <p className="mt-5 max-w-xs font-display text-lg font-semibold leading-snug text-nuit">{t.slogan}</p>
          <p className="mt-2 text-sm text-gris">{t.footer.location}</p>
          <LangSwitch locale={locale} label={t.nav.language} switchLabel={t.nav.switchTo} className="-ml-1.5 mt-5" />
        </div>

        <div className="md:col-span-4">
          <h2 className="font-display text-sm font-semibold text-nuit">{t.footer.branches}</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-[0.95rem]">
            {branches.map((b) => (
              <li key={b.slug}>
                <Link
                  href={{ pathname: '/branches/[slug]', params: { slug: b.slug } }}
                  className="text-gris transition-colors hover:text-ocean"
                >
                  {b.name.replace('AXIONA ', '')}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-8 md:col-span-4">
          <div>
            <h2 className="font-display text-sm font-semibold text-nuit">{t.footer.company}</h2>
            <ul className="mt-4 space-y-2.5 text-[0.95rem]">
              <li>
                <Link href="/a-propos" className="text-gris transition-colors hover:text-ocean">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gris transition-colors hover:text-ocean">
                  {t.nav.contact}
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="text-gris transition-colors hover:text-ocean">
                  {t.footer.legal}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-display text-sm font-semibold text-nuit">{t.footer.contact}</h2>
            <ul className="mt-4 space-y-2.5 text-[0.95rem]">
              <li>
                <WhatsAppLink
                  message={t.common.whatsappMessage}
                  className="inline-flex items-center gap-1.5 text-gris transition-colors hover:text-ocean"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  {site.contact.whatsappDisplay}
                </WhatsAppLink>
              </li>
              <li className="break-all text-gris">
                {isTodo(email) ? (
                  <span>{email}</span>
                ) : (
                  <a href={`mailto:${email}`} className="transition-colors hover:text-ocean">
                    {email}
                  </a>
                )}
              </li>
            </ul>
            <h2 className="mt-7 font-display text-sm font-semibold text-nuit">{t.footer.follow}</h2>
            {activeSocials.length > 0 ? (
              <ul className="mt-4 space-y-2.5 text-[0.95rem]">
                {activeSocials.map((s) => (
                  <li key={s.name}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-gris hover:text-ocean">
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-gris">{t.footer.socialsSoon}</p>
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-trait/70">
        <div className="container-ax flex flex-col gap-2 py-6 pb-24 text-sm text-gris sm:flex-row sm:items-center sm:justify-between md:pb-6">
          <p>{t.footer.rights}</p>
          <p>{site.founder}, {locale === 'fr' ? 'Fondateur & CEO' : 'Founder & CEO'}</p>
        </div>
      </div>
    </footer>
  );
}
