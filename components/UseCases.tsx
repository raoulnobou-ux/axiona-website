import { BedDouble, Building2, CalendarClock, GraduationCap, ShoppingBag } from 'lucide-react';
import type { Dictionary } from '@/content';
import { Reveal } from './Reveal';
import { WhatsAppLink } from './WhatsAppLink';
import { WhatsAppIcon } from './WhatsAppIcon';

const ICONS = [BedDouble, ShoppingBag, CalendarClock, GraduationCap, Building2];

/** « Imaginez ce que votre entreprise pourrait automatiser » : exemples, jamais des clients. */
export function UseCases({ t }: { t: Dictionary['useCases'] }) {
  return (
    <section className="bg-brume py-20 sm:py-28" aria-labelledby="usecases-title">
      <div className="container-ax">
        <Reveal className="grid gap-4 lg:grid-cols-12 lg:items-end">
          <h2 id="usecases-title" className="h-section lg:col-span-7">
            {t.title}
          </h2>
          <div className="lg:col-span-5">
            <p className="lead">{t.intro}</p>
            <p className="mt-2 text-sm text-gris">{t.disclaimer}</p>
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((item, i) => {
            const Icon = ICONS[i];
            const big = i === 0;
            return (
              <Reveal
                as="li"
                key={item.sector}
                delay={(i % 3) * 60}
                className={`group relative flex flex-col overflow-hidden border border-trait/80 transition-shadow duration-300 hover:shadow-haute ${
                  big
                    ? 'rounded-card-lg bg-[linear-gradient(135deg,#ffffff_30%,#d9f5fc_100%)] p-7 sm:col-span-2 sm:p-9'
                    : 'rounded-card bg-white p-6'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brume text-nuit transition-colors group-hover:bg-cyan-pale">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className={big ? 'text-2xl' : 'h-card'}>{item.sector}</h3>
                </div>
                {/* La « recette » de la solution, sous forme de chaîne */}
                <ul className="mt-5 flex flex-wrap items-center gap-y-2" aria-label={item.sector}>
                  {item.stack.map((s, j) => (
                    <li key={s} className="flex items-center">
                      {j > 0 && (
                        <span className="mx-1.5 font-display text-sm font-semibold text-cyan" aria-hidden="true">
                          +
                        </span>
                      )}
                      <span
                        className={`rounded-full px-3 py-1 text-[0.85rem] font-medium ${
                          j === 0 ? 'bg-nuit text-white' : 'bg-brume text-nuit'
                        }`}
                      >
                        {s}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className={`mt-5 text-gris ${big ? 'max-w-xl text-lg' : 'text-[0.98rem]'}`}>{item.text}</p>
              </Reveal>
            );
          })}
          <Reveal
            as="li"
            delay={120}
            className="relative isolate flex flex-col justify-between gap-6 overflow-hidden rounded-card-lg bg-nuit p-7 text-white sm:col-span-2 sm:p-9 lg:col-span-3 lg:flex-row lg:items-center"
          >
            <div
              aria-hidden="true"
              className="absolute -right-24 -top-32 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgb(79_209_240/0.35),transparent_65%)]"
            />
            <div>
              <h3 className="text-2xl !text-white">{t.otherTitle}</h3>
              <p className="mt-2 max-w-xl text-white/75">{t.otherText}</p>
            </div>
            <WhatsAppLink message={t.otherMessage} className="btn btn-light shrink-0 self-start lg:self-auto">
              <WhatsAppIcon />
              {t.otherCta}
            </WhatsAppLink>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
