# Décisions et éléments à compléter

## À compléter avant la mise en ligne (valeurs `TODO_`)

Aucune coordonnée n'a été inventée. Ces valeurs apparaissent telles quelles sur le site
tant qu'elles ne sont pas remplacées.

| Valeur | Où la modifier | Effet tant qu'elle n'est pas renseignée |
| --- | --- | --- |
| `TODO_WHATSAPP` : numéro WhatsApp au format international sans `+` (ex. `2376XXXXXXXX`) | `config/site.ts` → `contact.whatsapp` | Les boutons WhatsApp mènent à la page contact |
| `TODO_EMAIL` | `config/site.ts` → `contact.email` | Affiché tel quel (pied de page, contact, mentions légales) |
| `TODO_HORAIRES` / `TODO_HOURS` | `config/site.ts` → `contact.hours` | Affiché tel quel sur la page contact |
| `TODO_PHOTO` : photo du fondateur (ex. `/brand/founder.jpg`, format portrait 4:5) | `config/site.ts` → `founderPhoto` | Visuel de remplacement (symbole AX + lignes de lumière) |
| `TODO_FACEBOOK`, `TODO_LINKEDIN`, `TODO_INSTAGRAM`, `TODO_TIKTOK`, `TODO_YOUTUBE` | `config/site.ts` → `socials` | Réseau masqué ; « Nos réseaux arrivent bientôt » si aucun n'est renseigné |
| `TODO_RCCM` : numéro d'immatriculation | `content/fr.ts` et `content/en.ts` → `legal` | Affiché tel quel dans les mentions légales |
| Lien public QuickSign | `config/site.ts` → `links.quickSign` | Branche Software en « Bientôt », bouton QuickSign remplacé par « Bientôt disponible » |
| `CONTACT_WEBHOOK_URL` (+ `CONTACT_WEBHOOK_SECRET` facultatif) | Variables d'environnement Vercel | Le formulaire affiche une erreur et propose l'envoi sur WhatsApp |
| `NEXT_PUBLIC_SITE_URL` | Variables d'environnement Vercel | Sur Vercel, l'URL de production du projet est utilisée à défaut |

## Choix faits

### Logo
- Le fichier fourni (maquette sur carte blanche, 1408×768) a été recadré et détouré :
  `public/brand/logo-axiona.png` (725×266, fond transparent, étincelle conservée).
- Sa résolution est trop faible pour un affichage net sur écran haute densité. Le symbole a
  donc été **redessiné en SVG** (`public/brand/axiona-symbol.svg`) : A géométrique bleu nuit,
  flèche montante vers le haut-droite formant le X, étincelle cyan au croisement. C'est le
  logo principal du site (navigation, hero, favicon). Le mot « AXIONA / GLOBAL AI
  TECHNOLOGIES » est rendu en texte (police Sora), donc toujours net.
- `public/brand/axiona-logo.svg` : logo complet (symbole + texte) pour usage externe.
  Son texte utilise la police Sora si elle est installée ; pour un usage print, le convertir
  en tracés.
- Générés à partir du SVG : `favicon.svg`, `/favicon.ico`, `apple-touch-icon.png`,
  `icon-512.png`, `og-image.png` (1200×630).

### Statut des branches
- Champ `status` dans `content/branches.ts` : `available` (Disponible) ou `soon` (Bientôt).
- AI, Automation, Digital, Academy, Creative, Marketing, Consulting : **Disponible**.
- Software : **Bientôt**, car aucun lien public QuickSign n'a été fourni. Le statut passe
  automatiquement à Disponible dès que `links.quickSign` est renseigné dans `config/site.ts`.
- Seul le statut « Bientôt » est signalé sur les cartes. Le statut complet est affiché en
  haut de chaque page de branche.

### Contenu
- **Organisation des textes :** `content/fr.ts` et `content/en.ts` contiennent les textes
  généraux (une source par langue). Les 8 branches sont dans un seul fichier
  `content/branches.ts`, avec le français et l'anglais côte à côte, pour qu'ajouter ou
  modifier une branche ne touche qu'un fichier.
- Les 8 branches sont les seules mentionnées. Aucune sous-branche, aucun client, aucun
  chiffre, aucun témoignage.
- Les « exemples concrets » des pages branches sont présentés comme des **scénarios**
  (« Exemple : une clinique »), pas comme des références clients.
- Prix connus : formation gratuite au design graphique assisté par IA, guide pratique à
  1 500 FCFA (Academy). Tout le reste est « sur devis, en FCFA ».
- QuickSign est présenté dans la page Software comme outil de signature électronique
  (Word/PDF) par abonnement.
- Le formulaire court demande aussi un champ **« WhatsApp ou e-mail »** (obligatoire) :
  sans lui, AXIONA ne pourrait pas répondre aux demandes. « Entreprise » est facultatif.
- Le nom du fondateur est toujours écrit « Nobou Dzoda Raoul Jospin ».

### Routage et langue
- `/` redirige vers `/fr` ou `/en` selon la langue du navigateur (cookie `NEXT_LOCALE`
  ensuite), français par défaut.
- Chemins anglais traduits : `/en/about`, `/en/legal-notice`. Les autres chemins sont
  identiques dans les deux langues (`/branches`, `/branches/ai`, `/contact`).
- Le sélecteur FR | EN garde la page courante (y compris la branche affichée).

### Direction artistique et mouvement
- Un seul moment orchestré, à l'arrivée sur l'accueil : traînées de lumière → symbole AX
  → slogan → boutons, puis l'étincelle pulse doucement. Il est écrit **en CSS pur** :
  il fonctionne même avant le chargement du JavaScript (connexions lentes) et se désactive
  avec `prefers-reduced-motion`.
- Ailleurs : apparitions douces à l'entrée dans l'écran (contenu visible sans JavaScript),
  animations en réponse aux actions (menu, schéma interactif, FAQ).
- Bouton WhatsApp flottant permanent, pour joindre AXIONA en un clic à tout moment.
- Auto-critique : retiré une flèche de défilement décorative sous le hero, le filigrane de
  la page À propos (doublon du visuel du fondateur) et une étiquette redondante au-dessus du
  titre de cette page.

### Technique
- TypeScript 5.9 : la version 7 n'est pas encore compatible avec le chargement de
  `next.config.ts` par Next.js 15.
- Toutes les pages sont générées statiquement (SSG) ; seule `/api/contact` est dynamique.
- La limitation d'envois du formulaire est en mémoire (par instance) : suffisante contre
  les abus simples. Pour un trafic important, déléguer au webhook ou à un service dédié.
