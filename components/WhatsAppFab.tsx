import { WhatsAppLink } from './WhatsAppLink';
import { WhatsAppIcon } from './WhatsAppIcon';

/** Bouton WhatsApp toujours visible : un clic depuis n'importe quel point du défilement. */
export function WhatsAppFab({ message, label }: { message: string; label: string }) {
  return (
    <WhatsAppLink
      message={message}
      ariaLabel={label}
      className="group fixed bottom-4 right-4 z-40 inline-flex h-14 items-center gap-2 rounded-full bg-ocean pl-4 pr-4 text-white shadow-haute transition-colors hover:bg-ocean-fonce sm:bottom-6 sm:right-6 sm:pr-5"
    >
      <span className="relative flex">
        <WhatsAppIcon className="h-6 w-6" />
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-cyan ring-2 ring-ocean" aria-hidden="true" />
      </span>
      <span className="hidden font-display text-sm font-semibold sm:inline">{label}</span>
    </WhatsAppLink>
  );
}
