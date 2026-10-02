'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import type { Dictionary } from '@/content';
import type { BranchSlug } from '@/content/branches';
import { Logo } from './Logo';
import { LangSwitch } from './LangSwitch';
import { BranchIcon } from './BranchIcon';
import { WhatsAppLink } from './WhatsAppLink';
import { WhatsAppIcon } from './WhatsAppIcon';

type NavBranch = { slug: BranchSlug; name: string; tagline: string; featured: boolean };

type Props = {
  locale: Locale;
  t: Dictionary['nav'];
  whatsappMessage: string;
  branches: NavBranch[];
  flagshipLabel: string;
};

export function Nav({ locale, t, whatsappMessage, branches, flagshipLabel }: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // menu mobile
  const [dropdown, setDropdown] = useState(false); // menu Branches (desktop)
  const dropRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Fermer les menus au changement de page
  useEffect(() => {
    setOpen(false);
    setDropdown(false);
  }, [pathname]);

  // Échap + clic extérieur
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
      setDropdown(false);
    };
    const onClick = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropdown(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  // Bloquer le défilement sous le menu mobile
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  const solid = scrolled || open;
  const isActive = (p: string) => (p === '/' ? pathname === '/' : pathname.startsWith(p));
  const linkCls = (p: string) =>
    `relative rounded-lg px-3 py-2 text-[0.95rem] font-medium transition-colors ${
      isActive(p) ? 'text-nuit' : 'text-gris hover:text-nuit'
    }`;

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        solid
          ? 'bg-white/85 shadow-[0_1px_0_rgb(11_42_74/0.06),0_8px_24px_-16px_rgb(11_42_74/0.25)] backdrop-blur-lg'
          : 'bg-transparent'
      }`}
    >
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-nuit focus:shadow-douce"
      >
        {t.skip}
      </a>
      <div className="container-ax flex h-[4.5rem] items-center justify-between gap-4">
        <Link href="/" className="shrink-0 rounded-lg">
          <Logo />
        </Link>

        <nav aria-label={t.mainNav} className="hidden items-center gap-1 lg:flex">
          <Link href="/" className={linkCls('/')} aria-current={pathname === '/' ? 'page' : undefined}>
            {t.home}
          </Link>
          <div className="relative" ref={dropRef}>
            <button
              type="button"
              className={`${linkCls('/branches')} inline-flex items-center gap-1`}
              aria-expanded={dropdown}
              aria-controls="menu-branches"
              onClick={() => setDropdown((v) => !v)}
            >
              {t.branches}
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${dropdown ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>
            <AnimatePresence>
              {dropdown && (
                <motion.div
                  id="menu-branches"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-1/2 top-full mt-3 w-[40rem] -translate-x-1/2 rounded-card border border-trait/70 bg-white p-3 shadow-haute"
                >
                  <ul className="grid grid-cols-2 gap-1">
                    {branches.map((b) => (
                      <li key={b.slug}>
                        <Link
                          href={{ pathname: '/branches/[slug]', params: { slug: b.slug } }}
                          className="group flex gap-3 rounded-card-sm p-3 transition-colors hover:bg-brume"
                        >
                          <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brume text-nuit transition-colors group-hover:bg-white">
                            <BranchIcon slug={b.slug} className="h-6 w-6" />
                          </span>
                          <span className="min-w-0">
                            <span className="flex items-center gap-2 font-display text-[0.95rem] font-semibold text-nuit">
                              {b.name}
                              {b.featured && (
                                <span className="whitespace-nowrap rounded-full bg-cyan-pale px-2 py-0.5 text-[0.68rem] font-semibold text-ocean-fonce">
                                  {flagshipLabel}
                                </span>
                              )}
                            </span>
                            <span className="mt-0.5 block text-sm leading-snug text-gris">{b.tagline}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2 border-t border-trait/70 px-3 pb-1 pt-3">
                    <Link href="/branches" className="link-ax text-sm">
                      {t.allBranches}
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link href="/a-propos" className={linkCls('/a-propos')}>
            {t.about}
          </Link>
          <Link href="/contact" className={linkCls('/contact')}>
            {t.contact}
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LangSwitch locale={locale} label={t.language} switchLabel={t.switchTo} className="hidden sm:flex" />
          <WhatsAppLink message={whatsappMessage} className="btn btn-primary btn-sm hidden md:inline-flex">
            <WhatsAppIcon className="h-[1.1rem] w-[1.1rem]" />
            {t.expert}
          </WhatsAppLink>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-nuit transition-colors hover:bg-brume lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? t.closeMenu : t.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

    </header>
      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-0 top-[4.5rem] z-[45] overflow-y-auto bg-white lg:hidden"
          >
            <nav aria-label={t.mainNav} className="container-ax flex min-h-full flex-col pb-10 pt-4">
              <ul className="flex flex-col">
                {[
                  { href: '/' as const, label: t.home },
                  { href: '/a-propos' as const, label: t.about },
                  { href: '/contact' as const, label: t.contact },
                ].map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="block border-b border-trait/70 py-4 font-display text-2xl font-semibold text-nuit"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-7 font-display text-sm font-semibold text-gris">{t.branches}</p>
              <ul className="mt-2 grid grid-cols-1 gap-1 sm:grid-cols-2">
                {branches.map((b) => (
                  <li key={b.slug}>
                    <Link
                      href={{ pathname: '/branches/[slug]', params: { slug: b.slug } }}
                      className="flex items-center gap-3 rounded-card-sm py-2.5 pr-2 text-nuit"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brume">
                        <BranchIcon slug={b.slug} className="h-5 w-5" />
                      </span>
                      <span className="font-medium">{b.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-5 pt-8">
                <WhatsAppLink message={whatsappMessage} className="btn btn-primary w-full">
                  <WhatsAppIcon />
                  {t.expert}
                </WhatsAppLink>
                <LangSwitch locale={locale} label={t.language} switchLabel={t.switchTo} className="self-center text-base" />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
