import type { ReactNode } from 'react';
import { whatsappUrl } from '@/config/site';
import { Link } from '@/i18n/navigation';

type Props = {
  message: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
};

/**
 * Lien WhatsApp direct (nouvel onglet, message prérempli).
 * Tant que le numéro est un TODO_, renvoie vers la page contact.
 */
export function WhatsAppLink({ message, className, children, ariaLabel }: Props) {
  const href = whatsappUrl(message);
  if (!href) {
    return (
      <Link href="/contact" className={className} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} aria-label={ariaLabel}>
      {children}
    </a>
  );
}
