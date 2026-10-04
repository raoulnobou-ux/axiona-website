# Décisions et éléments à compléter

## À compléter avant la mise en ligne (valeurs `TODO_`)

Aucune coordonnée n'a été inventée. Ces valeurs apparaissent telles quelles sur le site
tant qu'elles ne sont pas remplacées.

| Valeur | Où la modifier | Effet tant qu'elle n'est pas renseignée |
| --- | --- | --- |
| `TODO_HORAIRES` / `TODO_HOURS` | `config/site.ts` → `contact.hours` | Affiché tel quel sur la page contact |
| `TODO_FACEBOOK`, `TODO_LINKEDIN`, `TODO_INSTAGRAM`, `TODO_TIKTOK`, `TODO_YOUTUBE` | `config/site.ts` → `socials` | Réseau masqué ; « Nos réseaux arrivent bientôt » si aucun n'est renseigné |
| `TODO_RCCM` : numéro d'immatriculation | `content/fr.ts` et `content/en.ts` → `legal` | Affiché tel quel dans les mentions légales |
| Lien public QuickSign | `config/site.ts` → `links.quickSign` | Branche Software en « Bientôt », bouton QuickSign remplacé par « Bientôt disponible » |
| `CONTACT_WEBHOOK_URL` (+ `CONTACT_WEBHOOK_SECRET` facultatif) | Variables d'environnement Vercel | Le formulaire affiche une erreur et propose l'envoi sur WhatsApp |
| `NEXT_PUBLIC_SITE_URL` | Variables d'environnement Vercel | Sur Vercel, l'URL de production du projet est utilisée à défaut |

### Déjà renseigné

| Valeur | Où | Valeur actuelle |
| --- | --- | --- |
| Lien WhatsApp direct | `config/site.ts` → `contact.whatsappLink` | https://wa.me/message/DIZC3EZP4MHPN1 (le numéro n'est affiché nulle part) |
| E-mail | `config/site.ts` → `contact.email` | raoulnobou@gmail.com |
| Photo du fondateur | `public/brand/founder.webp` (900×1350, fond transparent) | fournie le 2 octobre 2026 |

Les réseaux sociaux ne sont pas encore disponibles : ils restent masqués dans le pied de page
(« Nos réseaux arrivent bientôt ») jusqu'à ce qu'un lien soit renseigné.

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

### WhatsApp
- Tous les boutons utilisent le lien court `wa.me/message/DIZC3EZP4MHPN1`. Ce type de lien
  ouvre la conversation avec le message prérempli défini dans WhatsApp Business : les
  messages propres à chaque page (branche, démo, formulaire) ne s'appliquent pas.
  Pour les retrouver, remplacer le lien par `https://wa.me/<numéro>` dans `config/site.ts`.

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

### Vidéo de démonstration (agent IA vocal)

Source : vidéo fournie (576×1024, 2 min 22, verticale, sous-titres jaunes incrustés).
Fichier web : `public/media/axiona-agent-vocal.mp4` + affiche `public/media/axiona-agent-vocal-poster.webp`.
Recette complète : `scripts/video/` (cartes + filtre ffmpeg + commande).

Nettoyage appliqué :
- **Images d'illustration remplacées** (0:01–0:20) : cinq plans d'images génériques (photos de
  banque d'images, une image de robot contraire à la charte) remplacés par des cartes AXIONA
  (fond bleu nuit, lignes de lumière, icône sobre : client perdu, appels entrants, appel manqué,
  client qui part ailleurs, symbole AX + onde vocale). Les **sous-titres d'origine sont conservés**
  par-dessus (isolés par leur couleur jaune).
- **Écran-titre** (0:28) : l'écran noir « Agent IA vocals… » (faute, effet barré) remplacé par
  une carte « Démo en direct · Agent IA vocal · Prise de rendez-vous pour un salon de coiffure ».
- **Transition « photos qui volent »** (1:32) remplacée par une image figée propre ; le son et
  les sous-titres continuent.
- **Fin** : coupe après « laisse-moi un message » (la formule « abonne-toi », propre aux
  réseaux sociaux, est retirée), puis carte de fin AXIONA de 3 s.
- **Image** : léger contraste/saturation, netteté. **Son** : coupe-bas 70 Hz, réduction de
  bruit, compression douce, normalisation à −16 LUFS (était à −28 LUFS, très irrégulier).
- **Aucune coupe dans la conversation avec l'agent** (0:29–1:32) : les temps de réponse
  restent ceux de la démonstration réelle, pour ne pas la rendre plus rapide qu'elle n'est.
- Encodage web : H.264 + AAC, `faststart` (lecture progressive), sans hausse de résolution.

Intégration : le lecteur ne télécharge rien au chargement de la page (`preload="none"`,
affiche en `<img loading="lazy">`) ; la vidéo démarre au clic, avec le son, contrôles natifs
et plein écran. Elle est présentée comme une **démonstration AXIONA**, pas comme un témoignage
client.

Point à vérifier par AXIONA : la coupe de fin a été placée d'après le profil sonore et les
sous-titres (pas d'écoute possible ici). Si une syllabe manque, ajuster `END` dans
`scripts/video/build.sh`.

### Améliorations « premium » (octobre 2026)
- Accueil réorganisé : hero → bandeau → schéma système AI + Automation → démo vocale →
  « Trouvez votre solution » → cas d'usage → écosystème des 8 branches → méthode →
  Academy & Digital → fondateur → « Built in Buea » → appel final.
- **Schéma système** (`components/SystemFlow.tsx`) : Client → WhatsApp / Appel → Agent IA →
  Automatisation → Outils de l'entreprise → Résultat ; un point lumineux circule (CSS pur),
  les résultats s'allument ensuite. Remplace l'ancien schéma en 4 étapes, y compris sur les
  pages AI et Automation.
- **Trouvez votre solution** : 8 besoins → 8 branches (une par besoin). Les émojis du brief
  ont été remplacés par les icônes maison des branches, plus cohérentes avec la charte.
- **Cas d'usage** : présentés explicitement comme des exemples (mention visible), jamais
  comme des clients.
- **Écosystème** : arbre AXIONA → AI + Automation (mis en avant, fond bleu nuit) + Software
  → les cinq autres branches. Version verticale sur mobile.
- **Built in Buea** : cercles concentriques Buea → Africa → World et coordonnées réelles de
  Buea (4,15° N · 9,24° E) ; aucun motif « africain » générique.
- Le titre « Built in Buea. Built for Africa. Built for the world. » reste en anglais dans
  les deux langues (signature), le texte est traduit.

### Technique
- TypeScript 5.9 : la version 7 n'est pas encore compatible avec le chargement de
  `next.config.ts` par Next.js 15.
- Toutes les pages sont générées statiquement (SSG) ; seule `/api/contact` est dynamique.
- La limitation d'envois du formulaire est en mémoire (par instance) : suffisante contre
  les abus simples. Pour un trafic important, déléguer au webhook ou à un service dédié.
