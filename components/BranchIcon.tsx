import type { BranchSlug } from '@/content/branches';

/**
 * Une icône par branche, dessinée dans le même style :
 * trait bleu nuit 1.6, angles arrondis, une seule "étincelle" cyan.
 */
const paths: Record<BranchSlug, React.ReactNode> = {
  // Bulle de conversation habitée par une étincelle
  ai: (
    <>
      <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4h13A2.5 2.5 0 0 1 23 6.5v9a2.5 2.5 0 0 1-2.5 2.5H12l-5 4v-4h0A2.5 2.5 0 0 1 4.5 15.5" />
      <path d="M14 7.5l1.1 2.4 2.4 1.1-2.4 1.1L14 14.5l-1.1-2.4-2.4-1.1 2.4-1.1z" className="ax-spark" />
    </>
  ),
  // Deux nœuds reliés par un flux qui monte
  automation: (
    <>
      <rect x="3" y="16" width="7" height="7" rx="2" />
      <rect x="18" y="5" width="7" height="7" rx="2" />
      <path d="M10 19.5h3a3 3 0 0 0 3-3v-5a3 3 0 0 1 2-2.83" />
      <circle cx="14" cy="14" r="1.6" className="ax-spark" />
    </>
  ),
  // Fenêtre d'application et chevrons de code
  software: (
    <>
      <rect x="3.5" y="5" width="21" height="18" rx="3" />
      <path d="M3.5 10h21" />
      <path d="M11 14l-2.5 2.5L11 19M17 14l2.5 2.5L17 19" />
      <circle cx="7" cy="7.5" r="1" className="ax-spark" />
    </>
  ),
  // Document avec flèche de téléchargement
  digital: (
    <>
      <path d="M8 3.5h8.5L21 8v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5.5a2 2 0 0 1 2-2z" />
      <path d="M16.5 3.5V8H21" />
      <path d="M13.5 11.5v7M10.5 15.5l3 3 3-3" />
      <circle cx="18.5" cy="20" r="1.1" className="ax-spark" />
    </>
  ),
  // Livre ouvert d'où s'échappe une idée
  academy: (
    <>
      <path d="M3.5 8.5c3-1.5 6.5-1.5 10.5 1 4-2.5 7.5-2.5 10.5-1v13c-3-1.5-6.5-1.5-10.5 1-4-2.5-7.5-2.5-10.5-1z" />
      <path d="M14 9.5v13" />
      <path d="M19 2.5l.8 1.7 1.7.8-1.7.8L19 7.5l-.8-1.7-1.7-.8 1.7-.8z" className="ax-spark" />
    </>
  ),
  // Plume vectorielle (outil plume)
  creative: (
    <>
      <path d="M14 3.5l7 7-3.5 9.5-7 2-4-4 2-7z" />
      <path d="M6.5 22.5l5.6-5.6" />
      <circle cx="14" cy="14" r="2" className="ax-spark" />
      <path d="M21 10.5l3-3-7-7-3 3" />
    </>
  ),
  // Cible et flèche de croissance
  marketing: (
    <>
      <circle cx="12" cy="16" r="8" />
      <circle cx="12" cy="16" r="4" />
      <path d="M12 16l11-11M18.5 4.5H23.5V9.5" />
      <circle cx="12" cy="16" r="1.3" className="ax-spark" />
    </>
  ),
  // Feuille de route : chemin jalonné vers un drapeau
  consulting: (
    <>
      <path d="M4 23c3.5 0 4-4 7.5-4s3.5-4 7-4" />
      <circle cx="4" cy="23" r="1.4" />
      <path d="M19.5 15V3.5l5 2.5-5 2.5" />
      <circle cx="11.5" cy="19" r="1.3" className="ax-spark" />
    </>
  ),
};

export function BranchIcon({ slug, className = 'h-7 w-7' }: { slug: BranchSlug; className?: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      className={`${className} [&_.ax-spark]:fill-cyan [&_.ax-spark]:stroke-ocean`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[slug]}
    </svg>
  );
}
