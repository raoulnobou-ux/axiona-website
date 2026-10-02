import { Plus } from 'lucide-react';

/** FAQ accessible sans JavaScript (details/summary). */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-trait border-y border-trait">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 font-display text-[1.05rem] font-semibold text-nuit [&::-webkit-details-marker]:hidden">
            {item.q}
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brume text-ocean transition-transform duration-300 group-open:rotate-45">
              <Plus className="h-4 w-4" aria-hidden="true" />
            </span>
          </summary>
          <p className="prose-ax pb-6 pr-12 text-gris">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
