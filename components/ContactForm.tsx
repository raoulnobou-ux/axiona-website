'use client';

import { useId, useState, type FormEvent } from 'react';
import { CircleCheck, LoaderCircle } from 'lucide-react';
import type { Dictionary } from '@/content';
import type { Locale } from '@/i18n/routing';
import { validateContact, type FieldErrors } from '@/lib/contact';
import { WhatsAppLink } from './WhatsAppLink';
import { WhatsAppIcon } from './WhatsAppIcon';

type Props = {
  t: Dictionary['form'];
  locale: Locale;
  branches: { slug: string; name: string }[];
  defaultBranch?: string;
  tone?: 'light' | 'dark';
  /** Version courte (section finale de l'accueil) : pas de champ entreprise sur une ligne séparée. */
  compact?: boolean;
};

type Status = 'idle' | 'sending' | 'success' | 'error';

export function ContactForm({ t, locale, branches, defaultBranch = '', tone = 'light', compact = false }: Props) {
  const uid = useId();
  const [values, setValues] = useState({ name: '', company: '', contact: '', branch: defaultBranch, message: '', website: '' });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');

  const onDark = tone === 'dark';
  const labelCls = `mb-1.5 block text-sm font-medium ${onDark ? 'text-white/85' : 'text-nuit'}`;
  const errorCls = `mt-1.5 text-sm ${onDark ? 'text-[#ffb4ab]' : 'text-[#b42318]'}`;
  const id = (n: string) => `${uid}-${n}`;

  const set = (k: keyof typeof values) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (k in errors) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const branchName = branches.find((b) => b.slug === values.branch)?.name;
  const whatsappMessage = [
    t.whatsappIntro,
    values.message.trim(),
    '',
    values.name && `${t.name} : ${values.name}`,
    values.company && `${t.company} : ${values.company}`,
    branchName && `${t.branch} : ${branchName}`,
  ]
    .filter((l): l is string => typeof l === 'string')
    .join('\n')
    .trim();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = (['name', 'contact', 'message'] as const).find((k) => found[k]);
      if (first) document.getElementById(id(first))?.focus();
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, locale, page: window.location.pathname }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className={`flex items-start gap-3 rounded-card p-6 ${onDark ? 'bg-white/10 text-white' : 'bg-brume text-nuit'}`}
      >
        <CircleCheck className="mt-0.5 h-6 w-6 shrink-0 text-cyan" aria-hidden="true" />
        <p className="font-medium">{t.success}</p>
      </div>
    );
  }

  const err = (k: keyof FieldErrors) =>
    errors[k] ? (
      <p id={id(`${k}-err`)} className={errorCls}>
        {errors[k] === 'required' ? t.required : t.tooShort}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4">
      <div className={`grid gap-4 ${compact ? 'sm:grid-cols-2' : 'sm:grid-cols-2'}`}>
        <div>
          <label htmlFor={id('name')} className={labelCls}>
            {t.name}
          </label>
          <input
            id={id('name')}
            name="name"
            autoComplete="name"
            className="field"
            value={values.name}
            onChange={set('name')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? id('name-err') : undefined}
            maxLength={120}
            required
          />
          {err('name')}
        </div>
        <div>
          <label htmlFor={id('company')} className={labelCls}>
            {t.company} <span className={onDark ? 'font-normal text-white/60' : 'font-normal text-gris'}>({t.companyOptional})</span>
          </label>
          <input
            id={id('company')}
            name="company"
            autoComplete="organization"
            className="field"
            value={values.company}
            onChange={set('company')}
            maxLength={160}
          />
        </div>
        <div>
          <label htmlFor={id('contact')} className={labelCls}>
            {t.contact}
          </label>
          <input
            id={id('contact')}
            name="contact"
            autoComplete="tel"
            inputMode="text"
            className="field"
            value={values.contact}
            onChange={set('contact')}
            aria-invalid={Boolean(errors.contact)}
            aria-describedby={errors.contact ? id('contact-err') : id('contact-hint')}
            maxLength={160}
            required
          />
          {err('contact') ?? (
            <p id={id('contact-hint')} className={`mt-1.5 text-sm ${onDark ? 'text-white/60' : 'text-gris'}`}>
              {t.contactHint}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={id('branch')} className={labelCls}>
            {t.branch}
          </label>
          <select id={id('branch')} name="branch" className="field appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2314607F%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-10" value={values.branch} onChange={set('branch')}>
            <option value="">{t.branchUnknown}</option>
            {branches.map((b) => (
              <option key={b.slug} value={b.slug}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor={id('message')} className={labelCls}>
          {t.message}
        </label>
        <textarea
          id={id('message')}
          name="message"
          rows={compact ? 4 : 5}
          className="field resize-y"
          placeholder={t.messagePlaceholder}
          value={values.message}
          onChange={set('message')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? id('message-err') : undefined}
          maxLength={4000}
          required
        />
        {err('message')}
      </div>

      {/* Pot de miel : invisible pour les humains */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id('website')}>Website</label>
        <input id={id('website')} name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
      </div>

      {status === 'error' && (
        <p role="alert" className={`rounded-card-sm p-4 text-sm ${onDark ? 'bg-white/10 text-white' : 'bg-[#fdecea] text-[#7a1a12]'}`}>
          {t.error}
        </p>
      )}

      <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center">
        <button type="submit" className={`btn ${onDark ? 'btn-light' : 'btn-primary'}`} disabled={status === 'sending'}>
          {status === 'sending' && <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />}
          {status === 'sending' ? t.sending : t.submit}
        </button>
        <WhatsAppLink
          message={whatsappMessage}
          className={`inline-flex items-center gap-2 text-[0.95rem] font-medium underline-offset-4 hover:underline ${
            onDark ? 'text-cyan' : 'text-ocean'
          }`}
        >
          <WhatsAppIcon className="h-[1.1rem] w-[1.1rem]" />
          {t.sendWhatsapp}
        </WhatsAppLink>
      </div>
      <p className={`text-sm ${onDark ? 'text-white/60' : 'text-gris'}`}>{t.privacy}</p>
    </form>
  );
}
