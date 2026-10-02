/** Une vraie séquence : la numérotation est justifiée ici. */
export function Steps({ steps, tone = 'dark' }: { steps: { title: string; text?: string }[]; tone?: 'dark' | 'light' }) {
  return (
    <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <li key={s.title} className="relative">
          <div className="flex items-center gap-3">
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-base font-semibold ${
                i === 0 ? 'bg-ocean text-white' : 'bg-white text-ocean ring-1 ring-trait'
              }`}
            >
              {i + 1}
            </span>
            {i < steps.length - 1 && <span className="hidden h-px flex-1 bg-gradient-to-r from-trait to-transparent lg:block" aria-hidden="true" />}
          </div>
          <h3 className={`h-card mt-5 ${tone === 'light' ? '!text-white' : ''}`}>{s.title}</h3>
          {s.text && <p className="mt-2 text-gris">{s.text}</p>}
        </li>
      ))}
    </ol>
  );
}
