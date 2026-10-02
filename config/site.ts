/**
 * Configuration unique du site AXIONA.
 * Toute valeur commençant par "TODO_" doit être remplacée avant la mise en ligne
 * (liste complète dans DECISIONS.md). Aucune valeur n'a été inventée.
 */
export const site = {
  name: 'AXIONA Global AI Technologies',
  shortName: 'AXIONA',
  founder: 'Nobou Dzoda Raoul Jospin',
  foundingYear: 2026,
  city: 'Buea',
  region: 'South-West',
  country: 'Cameroun',
  countryCode: 'CM',

  /** URL publique (sans barre finale). Définie via NEXT_PUBLIC_SITE_URL sur Vercel. */
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000')
  ).replace(/\/$/, ''),

  contact: {
    /** Format international sans "+" ni espaces, ex. 2376XXXXXXXX. */
    whatsapp: 'TODO_WHATSAPP',
    email: 'TODO_EMAIL',
    hours: { fr: 'TODO_HORAIRES', en: 'TODO_HOURS' },
  },

  links: {
    chariowStore: 'https://kiqvkzcg.mychariow.online',
    /** Lien public de QuickSign. Vide = la branche Software reste "Bientôt". */
    quickSign: '',
  },

  /** Laisser une valeur "TODO_" masque le réseau dans le pied de page. */
  socials: [
    { name: 'Facebook', href: 'TODO_FACEBOOK' },
    { name: 'LinkedIn', href: 'TODO_LINKEDIN' },
    { name: 'Instagram', href: 'TODO_INSTAGRAM' },
    { name: 'TikTok', href: 'TODO_TIKTOK' },
    { name: 'YouTube', href: 'TODO_YOUTUBE' },
  ],

  /** Photo du fondateur, ex. "/brand/founder.jpg". TODO_PHOTO = visuel de remplacement. */
  founderPhoto: 'TODO_PHOTO',
} as const;

export const isTodo = (value: string) => !value || value.startsWith('TODO_');

export const activeSocials = site.socials.filter((s) => !isTodo(s.href));

/**
 * Lien WhatsApp direct avec message prérempli.
 * Tant que le numéro n'est pas renseigné, renvoie null : les boutons
 * redirigent alors vers la page contact (voir components/WhatsAppLink.tsx).
 */
export function whatsappUrl(message?: string): string | null {
  if (isTodo(site.contact.whatsapp)) return null;
  const number = site.contact.whatsapp.replace(/\D/g, '');
  const text = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${number}${text}`;
}
