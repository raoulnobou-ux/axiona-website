import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Redirige "/" vers /fr ou /en selon la langue du navigateur (défaut : fr).
export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!api|_next|_vercel|brand|.*\\..*).*)'],
};
