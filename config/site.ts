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
    /**
     * Lien WhatsApp direct (lien court "wa.me/message/…" fourni par AXIONA).
     * Le numéro n'est volontairement affiché nulle part sur le site.
     */
    whatsappLink: 'https://wa.me/message/DIZC3EZP4MHPN1',
    email: 'raoulnobou@gmail.com',
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
  founderPhoto: '/brand/founder.webp',
} as const;

export const isTodo = (value: string) => !value || value.startsWith('TODO_');

export const activeSocials = site.socials.filter((s) => !isTodo(s.href));

/**
 * Lien WhatsApp utilisé par tous les boutons.
 * Les liens courts "wa.me/message/…" ouvrent la conversation avec le message
 * défini dans WhatsApp Business : le texte passé ici n'est donc utilisé que si
 * le lien est un lien classique "wa.me/<numéro>".
 * Lien vide ou TODO_ : renvoie null, les boutons mènent alors à la page contact.
 */
export function whatsappUrl(message?: string): string | null {
  const link = site.contact.whatsappLink;
  if (isTodo(link)) return null;
  if (link.includes('/message/') || !message) return link;
  return `${link}${link.includes('?') ? '&' : '?'}text=${encodeURIComponent(message)}`;
}
