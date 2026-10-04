import { ArrowDown, ArrowRight, AudioLines, Ear, Workflow } from 'lucide-react';
import type { Dictionary } from '@/content';
import { Link } from '@/i18n/navigation';
import { VideoPlayer } from './VideoPlayer';
import { WhatsAppLink } from './WhatsAppLink';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Reveal } from './Reveal';

/** Fichiers produits par scripts/video (voir DECISIONS.md, section Vidéo). */
const VIDEO = {
  src: '/media/axiona-agent-vocal.mp4',
  srcWebm: '/media/axiona-agent-vocal.webm',
  poster: '/media/axiona-agent-vocal-poster.webp',
  width: 576,
  height: 1024,
  duration: '2:24',
};

const CAP_ICONS = [Ear, AudioLines, Workflow];

/**
 * Démonstration de l'agent vocal, mise en scène :
 * AXIONA AI → Voice AI → vidéo → Comprendre → Répondre → Automatiser.
 */
export function VoiceDemo({ t, aiLabel }: { t: Dictionary['voiceDemo']; aiLabel: string }) {
  return (
    <section
      id="demo"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#EAF3F8_100%)] py-20 sm:py-28"
      aria-labelledby="demo-title"
    >
      {/* Halo et traînées de lumière qui convergent vers le lecteur */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[42%] -z-10 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(79_209_240/0.22),transparent_62%)]"
      />
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[18rem] -z-10 mx-auto hidden h-[34rem] w-full max-w-6xl md:block"
        viewBox="0 0 1200 540"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="vd-l" x1="0" x2="1">
            <stop offset="0" stopColor="#4FD1F0" stopOpacity="0" />
            <stop offset="1" stopColor="#4FD1F0" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="vd-r" x1="1" x2="0">
            <stop offset="0" stopColor="#4FD1F0" stopOpacity="0" />
            <stop offset="1" stopColor="#4FD1F0" stopOpacity="0.55" />
          </linearGradient>
        </defs>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <path d={`M0 ${120 + i * 150} C 260 ${140 + i * 140}, 420 ${250 + i * 10}, 520 270`} stroke="url(#vd-l)" strokeWidth={i === 1 ? 1.4 : 0.9} />
            <path d={`M1200 ${120 + i * 150} C 940 ${140 + i * 140}, 780 ${250 + i * 10}, 680 270`} stroke="url(#vd-r)" strokeWidth={i === 1 ? 1.4 : 0.9} />
          </g>
        ))}
      </svg>

      <div className="container-ax">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan/50 bg-white/80 px-3.5 py-1.5 font-display text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ocean-fonce backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_8px_2px_rgb(79_209_240/0.7)]" aria-hidden="true" />
            {t.badge}
          </span>
          <h2 id="demo-title" className="h-section mt-5">
            {t.title}
          </h2>
          <p className="lead mt-4">{t.subtitle}</p>
        </Reveal>

        {/* AXIONA AI → Voice AI → lecteur */}
        <div className="mt-10 flex flex-col items-center" aria-hidden="true">
          <span className="rounded-full bg-nuit px-4 py-1.5 font-display text-sm font-semibold text-white shadow-douce">{t.chain[0]}</span>
          <span className="h-6 w-px bg-gradient-to-b from-nuit/40 to-cyan" />
          <span className="rounded-full border border-cyan/60 bg-white px-4 py-1.5 font-display text-sm font-semibold text-ocean shadow-douce">
            {t.chain[1]}
          </span>
          <span className="h-8 w-px bg-gradient-to-b from-cyan to-cyan/0" />
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_23.5rem_minmax(0,1fr)] lg:gap-14">
          <Reveal className="order-1 mx-auto max-w-sm text-center lg:mx-0 lg:text-right">
            <p className="font-display text-sm font-semibold text-ocean">{t.contextTitle}</p>
            <p className="mt-2 text-[1.02rem] leading-relaxed text-encre">{t.context}</p>
          </Reveal>

          <div className="order-2 mx-auto w-full max-w-[22rem] sm:max-w-[23.5rem]">
            <div className="relative rounded-[2.1rem] bg-white/70 p-2.5 shadow-[0_2px_4px_rgb(11_42_74/0.06),0_40px_80px_-30px_rgb(11_42_74/0.55)] ring-1 ring-trait backdrop-blur">
              <span
                aria-hidden="true"
                className="absolute -right-2 -top-2 z-10 h-4 w-4 rounded-full bg-cyan shadow-[0_0_18px_5px_rgb(79_209_240/0.65)] ring-4 ring-white"
              />
              <VideoPlayer
                src={VIDEO.src}
                srcWebm={VIDEO.srcWebm}
                poster={VIDEO.poster}
                width={VIDEO.width}
                height={VIDEO.height}
                duration={VIDEO.duration}
                label={t.videoLabel}
                playLabel={t.play}
              />
            </div>
          </div>

          <Reveal className="order-3 mx-auto max-w-sm text-center lg:mx-0 lg:text-left">
            <p className="font-display text-sm font-semibold text-ocean">{t.detailsTitle}</p>
            <ul className="mt-2 space-y-1.5 text-[1.02rem] text-encre">
              {t.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Comprendre → Répondre → Automatiser */}
        <div className="mt-2 flex justify-center" aria-hidden="true">
          <span className="h-10 w-px bg-gradient-to-b from-cyan/0 to-cyan" />
        </div>
        <ol className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-3 sm:gap-0">
          {t.capabilities.map((c, i) => {
            const Icon = CAP_ICONS[i];
            return (
              <li key={c.title} className="relative flex flex-col items-center text-center sm:px-6">
                {i > 0 && (
                  <>
                    <ArrowRight className="absolute -left-2.5 top-[1.15rem] hidden h-5 w-5 text-cyan sm:block" aria-hidden="true" />
                    <ArrowDown className="mb-3 h-4 w-4 text-cyan sm:hidden" aria-hidden="true" />
                  </>
                )}
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-ocean shadow-douce ring-1 ring-trait">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <p className="mt-3 font-display text-lg font-semibold text-nuit">{c.title}</p>
                <p className="mt-1 max-w-[16rem] text-[0.96rem] text-gris">{c.text}</p>
              </li>
            );
          })}
        </ol>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <WhatsAppLink message={t.ctaMessage} className="btn btn-primary">
            <WhatsAppIcon />
            {t.cta}
          </WhatsAppLink>
          <Link href={{ pathname: '/branches/[slug]', params: { slug: 'ai' } }} className="link-ax">
            {aiLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
