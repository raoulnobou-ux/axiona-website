import type { Locale } from '@/i18n/routing';
import fr, { type Dictionary } from './fr';
import en from './en';

const dictionaries: Record<Locale, Dictionary> = { fr, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? fr;
}

/** Remplace {cle} dans un texte. */
export function fill(text: string, values: Record<string, string>): string {
  return text.replace(/\{(\w+)\}/g, (_, k: string) => values[k] ?? `{${k}}`);
}

export type { Dictionary };
