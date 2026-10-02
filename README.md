# AXIONA Global AI Technologies — site officiel

Site vitrine bilingue (français par défaut, anglais) d'AXIONA Global AI Technologies, Buea, Cameroun.
*Là où l'IA rencontre l'avenir. — Where AI meets the future.*

**Stack :** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · next-intl · Framer Motion · lucide-react · next/font (Sora + Instrument Sans).

## Lancer en local

Prérequis : Node.js 20 ou plus.

```bash
npm install
cp .env.example .env.local   # puis compléter si besoin
npm run dev                  # http://localhost:3000 → redirige vers /fr ou /en
```

Autres commandes :

```bash
npm run build      # build de production (vérifie aussi les types)
npm run start      # sert le build
npm run typecheck  # TypeScript seul
```

## Où modifier les textes

| Je veux modifier… | Fichier |
| --- | --- |
| Les textes du site en **français** | `content/fr.ts` |
| Les textes du site en **anglais** | `content/en.ts` (même structure que `fr.ts`, vérifiée par TypeScript) |
| Une **branche** (nom, ligne descriptive, mots-clés, FAQ, tarifs, statut…) en FR **et** EN | `content/branches.ts` |
| Numéro WhatsApp, e-mail, horaires, réseaux, lien boutique Chariow, lien QuickSign, photo du fondateur | `config/site.ts` |
| Couleurs, typographie, boutons | `app/globals.css` (tokens `--nuit`, `--ocean`, `--cyan`, `--brume`, `--blanc`, `--encre`) |
| Logo, favicon, image de partage | `public/brand/` |

**Ajouter ou modifier une branche = modifier un seul fichier** (`content/branches.ts`).
La navigation, le pied de page, les pages `/branches` et `/branches/[slug]`, le formulaire
et le sitemap se mettent à jour seuls. Pour une nouvelle branche, ajoutez aussi son icône
dans `components/BranchIcon.tsx` et son identifiant dans le type `BranchSlug`.

### Valeurs à compléter

Toutes les valeurs `TODO_…` sont listées dans [DECISIONS.md](./DECISIONS.md). Tant que le
numéro WhatsApp n'est pas renseigné, les boutons WhatsApp mènent à la page contact.

## Formulaire de contact

Le formulaire envoie un `POST` à `/api/contact`, qui transmet la demande en JSON au webhook
défini par `CONTACT_WEBHOOK_URL` (n8n, Make, Zapier…).

```json
{
  "name": "…", "company": "…", "contact": "WhatsApp ou e-mail", "branch": "automation",
  "message": "…", "locale": "fr", "page": "/fr/contact",
  "source": "axiona-website", "receivedAt": "2026-…"
}
```

- `CONTACT_WEBHOOK_SECRET` (facultatif) est envoyé dans l'en-tête `X-Axiona-Secret` pour que
  le webhook vérifie l'origine.
- Sans webhook configuré, l'API répond 503 et le formulaire propose l'envoi sur WhatsApp
  (le message est prérempli avec les champs saisis).
- Protections : validation côté serveur, champ pot de miel anti-robots, limite de 5 envois
  par IP toutes les 10 minutes.

**Avec n8n :** créez un workflow commençant par un nœud *Webhook* (méthode POST), copiez son
URL de production dans `CONTACT_WEBHOOK_URL`, puis ajoutez par exemple une notification
WhatsApp/e-mail et une ligne dans Google Sheets.

## Déployer sur Vercel

1. Poussez ce dépôt sur GitHub.
2. Sur [vercel.com](https://vercel.com) : **Add New → Project**, importez le dépôt.
   Vercel détecte Next.js, aucun réglage de build n'est nécessaire.
3. Dans **Settings → Environment Variables**, ajoutez :
   - `NEXT_PUBLIC_SITE_URL` = l'adresse finale du site, ex. `https://axiona.cm`
     (sert au sitemap, aux balises hreflang, à l'Open Graph et aux données structurées) ;
   - `CONTACT_WEBHOOK_URL` = l'URL du webhook n8n/Make ;
   - `CONTACT_WEBHOOK_SECRET` (facultatif).
4. **Deploy**. Puis, dans **Settings → Domains**, ajoutez votre nom de domaine.
5. Après chaque modification d'une variable `NEXT_PUBLIC_…`, relancez un déploiement.

## Bilinguisme et SEO

- Routes : `/fr/…` et `/en/…`. La racine `/` redirige selon la langue du navigateur (défaut : fr).
- Chemins traduits : `/fr/a-propos` ↔ `/en/about`, `/fr/mentions-legales` ↔ `/en/legal-notice`
  (configuration dans `i18n/routing.ts`).
- Chaque page a son titre, sa description, sa balise canonique, ses `hreflang` (fr, en,
  x-default) et son Open Graph, dans les deux langues.
- `sitemap.xml`, `robots.txt` et `llms.txt` sont générés ; données structurées
  `Organization` (toutes les pages), `Service`, `FAQPage` et `BreadcrumbList` (pages branches).

## Structure

```
app/[locale]/            pages (accueil, branches, branches/[slug], a-propos, contact, mentions-legales)
app/api/contact/         route du formulaire → webhook
components/              Hero, Nav, LangSwitch, Footer, BranchCard, BranchIcon, FlowDiagram, ContactForm…
content/                 fr.ts, en.ts, branches.ts
config/site.ts           coordonnées, liens, réseaux
i18n/                    routage et configuration next-intl
public/brand/            logo, symbole SVG, favicon, image Open Graph
DECISIONS.md             choix faits et valeurs TODO_ à compléter
```

## Qualité mesurée (Lighthouse mobile, build de production)

Accueil : Performance 98 · Accessibilité 100 · Bonnes pratiques 100 · SEO 100.
Les pages branche et contact obtiennent 98 en performance et 100 en accessibilité et
bonnes pratiques.
