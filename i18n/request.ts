import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

// Les textes vivent dans /content (fr.ts, en.ts, branches.ts) et sont lus
// directement par les composants. next-intl gère ici la langue et le routage.
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  return { locale, messages: {}, timeZone: 'Africa/Douala' };
});
