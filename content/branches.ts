/**
 * Les 8 branches officielles d'AXIONA. Fichier unique : ajouter, retirer ou
 * modifier une branche se fait ici, en français et en anglais côte à côte.
 * Les pages /branches, /branches/[slug], la navigation, le pied de page,
 * le formulaire et le sitemap se mettent à jour automatiquement.
 */
import { site } from '@/config/site';
import type { Locale } from '@/i18n/routing';

type L<T> = { fr: T; en: T };

export type BranchStatus = 'available' | 'soon';

export type BranchSlug =
  | 'ai'
  | 'automation'
  | 'software'
  | 'digital'
  | 'academy'
  | 'creative'
  | 'marketing'
  | 'consulting';

type BranchSource = {
  slug: BranchSlug;
  name: string;
  /** Offre phare : affichée en premier et en plus grand. */
  featured: boolean;
  status: BranchStatus;
  keywords: L<string[]>;
  tagline: L<string>;
  intro: L<string>;
  /** "Ce que nous faisons" : un bloc par mot-clé. */
  services: L<{ title: string; text: string }[]>;
  example: L<{ title: string; text: string }>;
  steps: L<string[]>;
  pricing: L<{ label: string; detail?: string }[]>;
  faq: L<{ q: string; a: string }[]>;
  /** Cas d'usage détaillés (pages AI et Automation). */
  useCases?: L<{ title: string; text: string }[]>;
  /** Produit mis en avant dans la branche (QuickSign pour Software). */
  product?: L<{ name: string; text: string; href?: string; cta?: string }>;
  /** Liens vers la boutique (Digital, Academy). */
  storeLink?: boolean;
};

const quickSignLive = Boolean(site.links.quickSign);

const sources: BranchSource[] = [
  {
    slug: 'ai',
    name: 'AXIONA AI',
    featured: true,
    status: 'available',
    keywords: {
      fr: ['Agents IA', 'Chatbots', 'Voice AI', 'Solutions IA'],
      en: ['AI agents', 'Chatbots', 'Voice AI', 'AI solutions'],
    },
    tagline: {
      fr: 'Des assistants intelligents qui travaillent pour votre entreprise 24h/24.',
      en: 'Smart assistants that keep working for your business, day and night.',
    },
    intro: {
      fr: 'Vos clients écrivent à toute heure. Un assistant IA leur répond tout de suite, avec vos informations, et transmet à votre équipe ce qui demande un humain.',
      en: 'Your customers message you at all hours. An AI assistant answers right away, using your own information, and hands over to your team whenever a human is needed.',
    },
    services: {
      fr: [
        { title: 'Agents IA', text: 'Un agent qui comprend la demande, répond et agit : réserver, enregistrer une commande, créer un ticket ou passer la main à un membre de l’équipe.' },
        { title: 'Chatbots', text: 'Sur WhatsApp, Messenger ou votre site. Il connaît vos produits, vos prix et vos horaires, et répond en français comme en anglais.' },
        { title: 'Voice AI', text: 'Un agent vocal qui décroche, comprend la question, donne la bonne information et note les rendez-vous.' },
        { title: 'Solutions IA', text: 'Lire des documents, trier des messages, résumer des échanges, extraire des données : l’IA appliquée à votre problème précis.' },
      ],
      en: [
        { title: 'AI agents', text: 'An agent that understands the request, replies and takes action: booking, logging an order, opening a ticket or handing over to someone on your team.' },
        { title: 'Chatbots', text: 'On WhatsApp, Messenger or your website. It knows your products, prices and opening hours, and replies in English or French.' },
        { title: 'Voice AI', text: 'A voice agent that picks up the call, understands the question, gives the right answer and books appointments.' },
        { title: 'AI solutions', text: 'Reading documents, sorting messages, summarising conversations, extracting data: AI applied to your specific problem.' },
      ],
    },
    example: {
      fr: { title: 'Exemple : une clinique', text: 'Les demandes de rendez-vous arrivent sur WhatsApp, souvent le soir. L’agent IA répond, propose un créneau libre, confirme et envoie un rappel la veille. Le personnel ne traite plus que les cas particuliers.' },
      en: { title: 'Example: a clinic', text: 'Appointment requests come in on WhatsApp, often in the evening. The AI agent replies, offers a free slot, confirms it and sends a reminder the day before. Staff only handle the special cases.' },
    },
    steps: {
      fr: ['On liste avec vous les questions et les actions les plus fréquentes.', 'On prépare l’agent avec vos informations : offres, prix, règles.', 'Vous le testez avec votre équipe, on ajuste.', 'Mise en ligne, puis suivi et améliorations.'],
      en: ['We list the most frequent questions and tasks with you.', 'We set up the agent with your information: offers, prices, rules.', 'You test it with your team and we fine-tune it.', 'It goes live, followed by monitoring and improvements.'],
    },
    pricing: {
      fr: [{ label: 'Sur devis, en FCFA', detail: 'Selon le canal, le volume de conversations et les outils à connecter. Le devis est gratuit.' }],
      en: [{ label: 'Custom quote, in FCFA', detail: 'Depends on the channel, conversation volume and the tools to connect. Quotes are free.' }],
    },
    faq: {
      fr: [
        { q: 'L’assistant parle-t-il français et anglais ?', a: 'Oui. Il répond dans la langue du client et peut changer de langue au cours de la conversation.' },
        { q: 'Faut-il des compétences techniques de notre côté ?', a: 'Non. Nous installons tout. Vous nous donnez vos informations, vous testez, et nous vous montrons comment suivre les conversations.' },
        { q: 'Que se passe-t-il quand l’assistant ne sait pas répondre ?', a: 'Il le dit au client et transmet la conversation à la bonne personne de votre équipe, avec le contexte.' },
        { q: 'Peut-on l’utiliser sur WhatsApp ?', a: 'Oui, c’est le canal que nous recommandons le plus souvent. Il fonctionne aussi sur un site web ou Messenger.' },
        { q: 'Qui a accès à nos données ?', a: 'Nous n’utilisons que les informations que vous choisissez de partager, et nous définissons ensemble qui peut consulter les conversations.' },
        { q: 'Combien ça coûte ?', a: 'Le prix dépend du projet. Après un premier échange, nous envoyons un devis clair en FCFA, sans engagement.' },
      ],
      en: [
        { q: 'Does the assistant speak English and French?', a: 'Yes. It replies in the customer’s language and can switch languages mid-conversation.' },
        { q: 'Do we need technical skills?', a: 'No. We set everything up. You share your information, you test, and we show you how to follow the conversations.' },
        { q: 'What happens when the assistant doesn’t know the answer?', a: 'It tells the customer and passes the conversation, with its context, to the right person on your team.' },
        { q: 'Can it run on WhatsApp?', a: 'Yes, that’s the channel we recommend most often. It also works on a website or Messenger.' },
        { q: 'Who can access our data?', a: 'We only use the information you choose to share, and we agree together on who can view the conversations.' },
        { q: 'How much does it cost?', a: 'It depends on the project. After a first conversation, we send a clear quote in FCFA, with no commitment.' },
      ],
    },
    useCases: {
      fr: [
        { title: 'Agent de réservation', text: 'Il vérifie les disponibilités, propose un créneau, confirme et envoie un rappel. Pour un hôtel, un restaurant, une clinique ou un salon.' },
        { title: 'Agent vocal', text: 'Il répond au téléphone quand personne n’est disponible, renseigne et prend les messages ou les rendez-vous.' },
        { title: 'Réponses automatiques WhatsApp', text: 'Prix, horaires, disponibilité, suivi de commande : les questions courantes reçoivent une réponse immédiate.' },
        { title: 'Relances et facturation', text: 'Avec AXIONA Automation : factures envoyées, paiements suivis, relances polies au bon moment.' },
      ],
      en: [
        { title: 'Booking agent', text: 'It checks availability, offers a slot, confirms and sends a reminder. For hotels, restaurants, clinics or salons.' },
        { title: 'Voice agent', text: 'It answers the phone when no one is free, gives information and takes messages or appointments.' },
        { title: 'WhatsApp auto-replies', text: 'Prices, opening hours, availability, order tracking: common questions get an instant answer.' },
        { title: 'Follow-ups and invoicing', text: 'Paired with AXIONA Automation: invoices sent, payments tracked, polite reminders at the right time.' },
      ],
    },
  },
  {
    slug: 'automation',
    name: 'AXIONA Automation',
    featured: true,
    status: 'available',
    keywords: {
      fr: ['n8n', 'Workflows', 'Automatisation', 'Intégrations'],
      en: ['n8n', 'Workflows', 'Automation', 'Integrations'],
    },
    tagline: {
      fr: 'Vos tâches répétitives, automatisées et connectées.',
      en: 'Your repetitive tasks, automated and connected.',
    },
    intro: {
      fr: 'Copier une commande dans un tableau, envoyer la facture, relancer un client : ces gestes prennent des heures chaque semaine. On les confie à des workflows qui tournent seuls.',
      en: 'Copying an order into a spreadsheet, sending the invoice, chasing a payment: these tasks eat hours every week. We hand them to workflows that run on their own.',
    },
    services: {
      fr: [
        { title: 'n8n', text: 'Nous construisons vos automatisations sur n8n, un outil ouvert et flexible, hébergé dans le cloud ou chez vous.' },
        { title: 'Workflows', text: 'Un événement déclenche une suite d’actions : nouvelle commande, formulaire reçu, paiement confirmé, rendez-vous pris.' },
        { title: 'Automatisation', text: 'Factures, devis, relances, rapports quotidiens, sauvegardes : ce qui se répète se fait sans vous.' },
        { title: 'Intégrations', text: 'WhatsApp, Gmail, Google Sheets, CRM, boutique en ligne, agents IA : vos outils échangent enfin leurs données.' },
      ],
      en: [
        { title: 'n8n', text: 'We build your automations on n8n, an open and flexible tool, hosted in the cloud or on your own server.' },
        { title: 'Workflows', text: 'One event triggers a chain of actions: new order, form received, payment confirmed, appointment booked.' },
        { title: 'Automation', text: 'Invoices, quotes, reminders, daily reports, backups: whatever repeats runs without you.' },
        { title: 'Integrations', text: 'WhatsApp, Gmail, Google Sheets, CRMs, online stores, AI agents: your tools finally share their data.' },
      ],
    },
    example: {
      fr: { title: 'Exemple : une boutique en ligne', text: 'Chaque commande crée la facture PDF, l’envoie au client sur WhatsApp, met à jour le stock dans Google Sheets et programme une relance si le paiement n’arrive pas. Le gérant reçoit un résumé chaque soir.' },
      en: { title: 'Example: an online shop', text: 'Each order creates a PDF invoice, sends it to the customer on WhatsApp, updates stock in Google Sheets and schedules a reminder if payment doesn’t arrive. The manager gets a summary every evening.' },
    },
    steps: {
      fr: ['On observe vos tâches répétitives et on choisit celles qui rapportent le plus de temps.', 'On dessine le workflow avec vous, étape par étape.', 'On le construit, on le teste sur de vrais cas.', 'On le surveille et on le fait évoluer avec votre activité.'],
      en: ['We look at your repetitive tasks and pick the ones that save the most time.', 'We map the workflow with you, step by step.', 'We build it and test it on real cases.', 'We monitor it and adapt it as your business grows.'],
    },
    pricing: {
      fr: [{ label: 'Sur devis, en FCFA', detail: 'Selon le nombre de workflows, d’outils connectés et l’hébergement choisi.' }],
      en: [{ label: 'Custom quote, in FCFA', detail: 'Depends on the number of workflows, connected tools and the hosting you choose.' }],
    },
    faq: {
      fr: [
        { q: 'Qu’est-ce que n8n ?', a: 'Un outil d’automatisation qui relie vos applications entre elles. Il peut être hébergé chez vous, ce qui vous laisse le contrôle de vos données.' },
        { q: 'Mes outils actuels sont-ils compatibles ?', a: 'Dans la plupart des cas, oui : WhatsApp, Gmail, Google Sheets, CRM, boutiques en ligne. Nous vérifions avant de commencer.' },
        { q: 'Et si un workflow tombe en panne ?', a: 'Nous ajoutons des alertes. En cas d’erreur, vous êtes prévenu et nous intervenons dans le cadre du suivi convenu.' },
        { q: 'Peut-on commencer petit ?', a: 'Oui. Un seul workflow bien choisi suffit souvent à gagner du temps dès la première semaine.' },
        { q: 'Combien ça coûte ?', a: 'Chaque projet a son devis en FCFA, gratuit et sans engagement, après un échange sur vos besoins.' },
      ],
      en: [
        { q: 'What is n8n?', a: 'An automation tool that connects your apps together. It can be self-hosted, so you stay in control of your data.' },
        { q: 'Will my current tools work?', a: 'In most cases, yes: WhatsApp, Gmail, Google Sheets, CRMs, online stores. We check before we start.' },
        { q: 'What if a workflow breaks?', a: 'We add alerts. If something fails, you are notified and we step in as part of the agreed support.' },
        { q: 'Can we start small?', a: 'Yes. One well-chosen workflow is often enough to save time from the very first week.' },
        { q: 'How much does it cost?', a: 'Every project gets its own quote in FCFA, free and with no commitment, after we talk about your needs.' },
      ],
    },
    useCases: {
      fr: [
        { title: 'Facturation automatique', text: 'Commande validée, facture générée et envoyée, paiement enregistré.' },
        { title: 'Relances clients', text: 'Devis sans réponse, paiement en retard, rendez-vous à confirmer : la relance part au bon moment.' },
        { title: 'Prospects centralisés', text: 'Les demandes du site, de WhatsApp et des réseaux arrivent au même endroit, avec une alerte.' },
        { title: 'Rapports quotidiens', text: 'Ventes, commandes, rendez-vous : un résumé clair chaque soir sur WhatsApp ou par e-mail.' },
      ],
      en: [
        { title: 'Automatic invoicing', text: 'Order confirmed, invoice generated and sent, payment recorded.' },
        { title: 'Customer follow-ups', text: 'Unanswered quotes, late payments, appointments to confirm: the reminder goes out at the right time.' },
        { title: 'Leads in one place', text: 'Requests from your website, WhatsApp and social media land in one place, with an alert.' },
        { title: 'Daily reports', text: 'Sales, orders, appointments: a clear summary every evening on WhatsApp or by email.' },
      ],
    },
  },
  {
    slug: 'software',
    name: 'AXIONA Software',
    featured: false,
    // Disponible seulement si un lien public QuickSign est renseigné dans config/site.ts.
    status: quickSignLive ? 'available' : 'soon',
    keywords: {
      fr: ['SaaS', 'Applications', 'QuickSign', 'Outils professionnels'],
      en: ['SaaS', 'Apps', 'QuickSign', 'Business tools'],
    },
    tagline: {
      fr: 'Des logiciels sur mesure et des outils pensés pour nos marchés.',
      en: 'Custom software and tools built for our markets.',
    },
    intro: {
      fr: 'Des applications web et des outils SaaS conçus pour la réalité locale : connexion mobile, paiements Mobile Money, usage bilingue.',
      en: 'Web apps and SaaS tools designed for local realities: mobile connections, Mobile Money payments, bilingual use.',
    },
    services: {
      fr: [
        { title: 'SaaS', text: 'Des outils en ligne par abonnement, prêts à utiliser, pensés pour les entreprises d’Afrique.' },
        { title: 'Applications', text: 'Applications web sur mesure : gestion, réservation, suivi des clients, tableaux de bord.' },
        { title: 'QuickSign', text: 'Notre outil de signature électronique pour documents Word et PDF, par abonnement.' },
        { title: 'Outils professionnels', text: 'Des petits outils qui règlent un vrai problème du quotidien, rapides même avec une connexion faible.' },
      ],
      en: [
        { title: 'SaaS', text: 'Ready-to-use online tools on subscription, built for African businesses.' },
        { title: 'Apps', text: 'Custom web apps: management, bookings, customer tracking, dashboards.' },
        { title: 'QuickSign', text: 'Our e-signature tool for Word and PDF documents, on subscription.' },
        { title: 'Business tools', text: 'Small tools that solve a real everyday problem, fast even on a weak connection.' },
      ],
    },
    example: {
      fr: { title: 'Exemple : signer un contrat à distance', text: 'Avec QuickSign, vous envoyez un contrat Word ou PDF, le client le signe depuis son téléphone, et chacun reçoit le document signé. Plus besoin d’imprimer, scanner et renvoyer.' },
      en: { title: 'Example: signing a contract remotely', text: 'With QuickSign, you send a Word or PDF contract, the client signs it on their phone, and everyone receives the signed document. No more printing, scanning and sending back.' },
    },
    steps: {
      fr: ['On clarifie le besoin et les utilisateurs.', 'On propose une maquette et un devis en FCFA.', 'On développe par étapes, avec des démonstrations régulières.', 'Mise en ligne, formation et maintenance.'],
      en: ['We clarify the need and who will use it.', 'We share a mock-up and a quote in FCFA.', 'We build in stages, with regular demos.', 'Launch, training and maintenance.'],
    },
    pricing: {
      fr: [
        { label: 'QuickSign : abonnement', detail: quickSignLive ? 'Tarifs sur la page QuickSign.' : 'Ouverture prochaine. Écrivez-nous pour être prévenu.' },
        { label: 'Logiciel sur mesure : sur devis, en FCFA' },
      ],
      en: [
        { label: 'QuickSign: subscription', detail: quickSignLive ? 'Pricing on the QuickSign page.' : 'Launching soon. Message us to be notified.' },
        { label: 'Custom software: quote in FCFA' },
      ],
    },
    faq: {
      fr: [
        { q: 'Qu’est-ce que QuickSign ?', a: 'Un outil de signature électronique : vous envoyez un document Word ou PDF, vos interlocuteurs le signent en ligne, depuis un téléphone ou un ordinateur.' },
        { q: 'Développez-vous des applications sur mesure ?', a: 'Oui, des applications web adaptées à votre activité, du cahier des charges jusqu’à la mise en ligne.' },
        { q: 'Les outils fonctionnent-ils sur mobile ?', a: 'Oui. Nous concevons d’abord pour le téléphone, en pensant aux connexions lentes.' },
        { q: 'Qui assure la maintenance ?', a: 'Nous proposons un suivi après la livraison : corrections, mises à jour et évolutions.' },
      ],
      en: [
        { q: 'What is QuickSign?', a: 'An e-signature tool: you send a Word or PDF document, and the other parties sign it online, from a phone or a computer.' },
        { q: 'Do you build custom apps?', a: 'Yes, web apps tailored to your business, from the brief to launch.' },
        { q: 'Do your tools work on mobile?', a: 'Yes. We design for phones first, with slow connections in mind.' },
        { q: 'Who handles maintenance?', a: 'We offer support after delivery: fixes, updates and new features.' },
      ],
    },
    product: {
      fr: { name: 'QuickSign', text: 'Signature électronique de documents Word et PDF, par abonnement. Envoyez, faites signer, archivez.', href: site.links.quickSign || undefined, cta: 'Découvrir QuickSign' },
      en: { name: 'QuickSign', text: 'E-signature for Word and PDF documents, on subscription. Send, get it signed, keep it on file.', href: site.links.quickSign || undefined, cta: 'Discover QuickSign' },
    },
  },
  {
    slug: 'digital',
    name: 'AXIONA Digital',
    featured: false,
    status: 'available',
    keywords: {
      fr: ['Ebooks', 'Templates', 'Prompts', 'Formations'],
      en: ['Ebooks', 'Templates', 'Prompts', 'Courses'],
    },
    tagline: {
      fr: 'Des produits digitaux prêts à utiliser.',
      en: 'Digital products, ready to use.',
    },
    intro: {
      fr: 'Des ressources concrètes pour travailler plus vite avec l’IA et le digital, disponibles sur notre boutique en ligne.',
      en: 'Practical resources to work faster with AI and digital tools, available in our online store.',
    },
    services: {
      fr: [
        { title: 'Ebooks', text: 'Des guides clairs, écrits pour le contexte africain, à lire sur téléphone.' },
        { title: 'Templates', text: 'Modèles prêts à remplir : documents, visuels, tableaux, pages.' },
        { title: 'Prompts', text: 'Des collections de prompts testés pour obtenir de meilleurs résultats avec l’IA.' },
        { title: 'Formations', text: 'Des formations en ligne à suivre à votre rythme.' },
      ],
      en: [
        { title: 'Ebooks', text: 'Clear guides written for the African context, easy to read on a phone.' },
        { title: 'Templates', text: 'Ready-to-fill templates: documents, visuals, spreadsheets, pages.' },
        { title: 'Prompts', text: 'Collections of tested prompts to get better results from AI.' },
        { title: 'Courses', text: 'Online courses you can follow at your own pace.' },
      ],
    },
    example: {
      fr: { title: 'Exemple : lancer sa communication', text: 'Un entrepreneur achète un pack de prompts et de templates, et produit en une après-midi les visuels et les textes de sa semaine.' },
      en: { title: 'Example: kick-starting your marketing', text: 'A business owner buys a pack of prompts and templates and creates a week’s worth of visuals and posts in one afternoon.' },
    },
    steps: {
      fr: ['Choisissez un produit sur la boutique.', 'Payez en ligne.', 'Recevez votre fichier immédiatement.', 'Écrivez-nous sur WhatsApp si vous avez une question.'],
      en: ['Pick a product in the store.', 'Pay online.', 'Get your file instantly.', 'Message us on WhatsApp if you have a question.'],
    },
    pricing: {
      fr: [{ label: 'Prix affichés sur la boutique', detail: 'En FCFA, produit par produit.' }],
      en: [{ label: 'Prices shown in the store', detail: 'In FCFA, product by product.' }],
    },
    faq: {
      fr: [
        { q: 'Comment recevoir un produit ?', a: 'Après le paiement sur la boutique, le fichier est disponible immédiatement au téléchargement.' },
        { q: 'Comment payer ?', a: 'Les moyens de paiement proposés sont affichés sur la boutique au moment de la commande.' },
        { q: 'Les produits sont-ils en français ?', a: 'La plupart sont en français. La langue est indiquée sur chaque fiche produit.' },
        { q: 'Je n’ai pas reçu mon fichier, que faire ?', a: 'Écrivez-nous sur WhatsApp avec votre nom et l’heure de l’achat : nous réglons le problème rapidement.' },
      ],
      en: [
        { q: 'How do I get a product?', a: 'Once you’ve paid in the store, the file is available to download straight away.' },
        { q: 'How can I pay?', a: 'Available payment methods are shown in the store at checkout.' },
        { q: 'Are the products in English?', a: 'Most products are in French. The language is shown on each product page.' },
        { q: 'I didn’t receive my file. What now?', a: 'Message us on WhatsApp with your name and the time of purchase, and we’ll sort it out quickly.' },
      ],
    },
    storeLink: true,
  },
  {
    slug: 'academy',
    name: 'AXIONA Academy',
    featured: false,
    status: 'available',
    keywords: {
      fr: ['Formation', 'Coaching', 'Ateliers IA', 'Ateliers digital'],
      en: ['Training', 'Coaching', 'AI workshops', 'Digital workshops'],
    },
    tagline: {
      fr: 'Apprendre à utiliser l’IA et le digital, concrètement.',
      en: 'Learn to use AI and digital tools, hands-on.',
    },
    intro: {
      fr: 'Des formations pratiques, sans jargon, pour que vous et votre équipe utilisiez l’IA dès le lendemain.',
      en: 'Practical, jargon-free training so you and your team can put AI to work the very next day.',
    },
    services: {
      fr: [
        { title: 'Formation', text: 'Des parcours courts et pratiques. Une formation gratuite au design graphique assisté par IA pour commencer.' },
        { title: 'Coaching', text: 'Un accompagnement individuel pour appliquer l’IA à votre métier.' },
        { title: 'Ateliers IA', text: 'Des sessions en groupe pour votre équipe : rédaction, analyse, service client.' },
        { title: 'Ateliers digital', text: 'Réseaux sociaux, outils en ligne, organisation : les bases bien faites.' },
      ],
      en: [
        { title: 'Training', text: 'Short, practical programmes. Start with a free course on AI-assisted graphic design.' },
        { title: 'Coaching', text: 'One-to-one support to apply AI to your line of work.' },
        { title: 'AI workshops', text: 'Group sessions for your team: writing, analysis, customer service.' },
        { title: 'Digital workshops', text: 'Social media, online tools, organisation: the basics, done right.' },
      ],
    },
    example: {
      fr: { title: 'Exemple : un atelier d’équipe', text: 'Une équipe commerciale apprend à préparer ses devis, ses messages et ses relances avec l’IA, sur ses propres dossiers.' },
      en: { title: 'Example: a team workshop', text: 'A sales team learns to prepare quotes, messages and follow-ups with AI, using their own files.' },
    },
    steps: {
      fr: ['On évalue votre niveau et vos objectifs.', 'On choisit le format : en ligne, en présentiel, seul ou en équipe.', 'Vous pratiquez sur des cas réels.', 'Vous repartez avec des supports et des modèles.'],
      en: ['We assess your level and goals.', 'We choose the format: online or in person, solo or as a team.', 'You practise on real cases.', 'You leave with materials and templates.'],
    },
    pricing: {
      fr: [
        { label: 'Formation design graphique assisté par IA : gratuite' },
        { label: 'Guide pratique : 1 500 FCFA' },
        { label: 'Coaching et ateliers : sur devis, en FCFA' },
      ],
      en: [
        { label: 'AI-assisted graphic design course: free' },
        { label: 'Practical guide: 1,500 FCFA' },
        { label: 'Coaching and workshops: quote in FCFA' },
      ],
    },
    faq: {
      fr: [
        { q: 'Faut-il savoir coder ?', a: 'Non. Nos formations sont pensées pour tout le monde, du débutant au professionnel.' },
        { q: 'Les formations sont-elles en ligne ?', a: 'Les deux sont possibles : en ligne, ou en présentiel à Buea et sur demande ailleurs.' },
        { q: 'Comment accéder à la formation gratuite ?', a: 'Elle est disponible sur notre boutique en ligne. Il suffit de vous inscrire.' },
        { q: 'Organisez-vous des ateliers pour les entreprises ?', a: 'Oui, adaptés à votre secteur et à vos outils. Contactez-nous pour en parler.' },
      ],
      en: [
        { q: 'Do I need to know how to code?', a: 'No. Our training is designed for everyone, from beginners to professionals.' },
        { q: 'Is the training online?', a: 'Both options exist: online, or in person in Buea and elsewhere on request.' },
        { q: 'How do I access the free course?', a: 'It’s available in our online store. Just sign up.' },
        { q: 'Do you run workshops for companies?', a: 'Yes, tailored to your sector and your tools. Get in touch to discuss it.' },
      ],
    },
    storeLink: true,
  },
  {
    slug: 'creative',
    name: 'AXIONA Creative',
    featured: false,
    status: 'available',
    keywords: {
      fr: ['Design', 'Branding', 'Contenu visuel'],
      en: ['Design', 'Branding', 'Visual content'],
    },
    tagline: {
      fr: 'Une image de marque qui se remarque.',
      en: 'A brand image that stands out.',
    },
    intro: {
      fr: 'Logo, identité, visuels pour les réseaux : une image cohérente qui inspire confiance dès le premier regard.',
      en: 'Logo, identity, social media visuals: a consistent image that earns trust at first glance.',
    },
    services: {
      fr: [
        { title: 'Design', text: 'Affiches, flyers, présentations, supports imprimés et numériques.' },
        { title: 'Branding', text: 'Logo, couleurs, typographies et règles d’usage : une identité complète et cohérente.' },
        { title: 'Contenu visuel', text: 'Visuels pour vos réseaux sociaux et vos campagnes, produits plus vite grâce à l’IA.' },
      ],
      en: [
        { title: 'Design', text: 'Posters, flyers, presentations, print and digital materials.' },
        { title: 'Branding', text: 'Logo, colours, fonts and usage rules: a complete, consistent identity.' },
        { title: 'Visual content', text: 'Visuals for your social media and campaigns, produced faster with AI.' },
      ],
    },
    example: {
      fr: { title: 'Exemple : une nouvelle identité', text: 'Une jeune entreprise repart avec un logo, une palette, des modèles de publications et une charte simple pour rester cohérente.' },
      en: { title: 'Example: a new identity', text: 'A young company leaves with a logo, a colour palette, post templates and a simple guide to stay consistent.' },
    },
    steps: {
      fr: ['On écoute votre histoire et vos clients.', 'On propose des pistes créatives.', 'On affine avec vos retours.', 'Vous recevez tous les fichiers, prêts à l’emploi.'],
      en: ['We listen to your story and your customers.', 'We present creative directions.', 'We refine with your feedback.', 'You receive every file, ready to use.'],
    },
    pricing: {
      fr: [{ label: 'Sur devis, en FCFA', detail: 'Selon les supports et le nombre de déclinaisons.' }],
      en: [{ label: 'Custom quote, in FCFA', detail: 'Depends on the materials and the number of variations.' }],
    },
    faq: {
      fr: [
        { q: 'Combien de propositions recevrai-je ?', a: 'Le nombre de pistes et de retours est fixé dans le devis, avant de commencer.' },
        { q: 'Est-ce que je reçois les fichiers sources ?', a: 'Oui, vous recevez les fichiers dans les formats utiles : impression, web et réseaux sociaux.' },
        { q: 'Utilisez-vous l’IA pour créer ?', a: 'Nous l’utilisons pour aller plus vite et explorer plus d’idées. Chaque création est retravaillée et validée par un designer.' },
        { q: 'Pouvez-vous gérer nos réseaux sociaux ?', a: 'Nous produisons les visuels. Pour la publicité et l’acquisition, voyez AXIONA Marketing.' },
      ],
      en: [
        { q: 'How many proposals will I get?', a: 'The number of directions and revision rounds is set in the quote, before we start.' },
        { q: 'Do I get the source files?', a: 'Yes, you receive the files in every useful format: print, web and social media.' },
        { q: 'Do you use AI to create?', a: 'We use it to move faster and explore more ideas. Every piece is reworked and approved by a designer.' },
        { q: 'Can you manage our social media?', a: 'We produce the visuals. For advertising and customer acquisition, see AXIONA Marketing.' },
      ],
    },
  },
  {
    slug: 'marketing',
    name: 'AXIONA Marketing',
    featured: false,
    status: 'available',
    keywords: {
      fr: ['Publicité', 'Acquisition', 'Prospection', 'Conversion'],
      en: ['Advertising', 'Acquisition', 'Prospecting', 'Conversion'],
    },
    tagline: {
      fr: 'Trouver des clients, puis les convertir.',
      en: 'Find customers, then win them over.',
    },
    intro: {
      fr: 'Des campagnes mesurées, des messages clairs et un suivi des prospects jusqu’à la vente, souvent jusque sur WhatsApp.',
      en: 'Measured campaigns, clear messages and lead follow-up all the way to the sale, often right into WhatsApp.',
    },
    services: {
      fr: [
        { title: 'Publicité', text: 'Campagnes Facebook, Instagram et Google, ciblées et suivies.' },
        { title: 'Acquisition', text: 'Pages et parcours qui transforment un clic en contact.' },
        { title: 'Prospection', text: 'Listes ciblées et messages personnalisés pour joindre les bonnes entreprises.' },
        { title: 'Conversion', text: 'Relances, offres et réponses rapides pour qu’un contact devienne un client.' },
      ],
      en: [
        { title: 'Advertising', text: 'Targeted, tracked campaigns on Facebook, Instagram and Google.' },
        { title: 'Acquisition', text: 'Pages and journeys that turn a click into a contact.' },
        { title: 'Prospecting', text: 'Targeted lists and personal messages to reach the right companies.' },
        { title: 'Conversion', text: 'Follow-ups, offers and fast replies so a contact becomes a customer.' },
      ],
    },
    example: {
      fr: { title: 'Exemple : du clic à la vente', text: 'Une publicité amène le prospect sur WhatsApp. Un assistant répond tout de suite, qualifie la demande, et le commercial reprend la conversation au bon moment.' },
      en: { title: 'Example: from click to sale', text: 'An ad brings the prospect to WhatsApp. An assistant replies instantly, qualifies the request, and a salesperson picks up the conversation at the right moment.' },
    },
    steps: {
      fr: ['On définit votre client idéal et votre offre.', 'On prépare les messages, visuels et pages.', 'On lance, on mesure, on ajuste.', 'Vous recevez un bilan clair et des recommandations.'],
      en: ['We define your ideal customer and your offer.', 'We prepare messages, visuals and pages.', 'We launch, measure and adjust.', 'You get a clear report and recommendations.'],
    },
    pricing: {
      fr: [{ label: 'Sur devis, en FCFA', detail: 'Le budget publicitaire est distinct de nos honoraires et reste sous votre contrôle.' }],
      en: [{ label: 'Custom quote, in FCFA', detail: 'Your ad budget is separate from our fees and stays under your control.' }],
    },
    faq: {
      fr: [
        { q: 'Quel budget faut-il prévoir ?', a: 'Cela dépend de vos objectifs. Nous vous conseillons un budget de départ réaliste et l’ajustons selon les résultats.' },
        { q: 'Garantissez-vous des résultats ?', a: 'Personne ne peut garantir des ventes. Nous garantissons une méthode, un suivi transparent et des ajustements réguliers.' },
        { q: 'Travaillez-vous avec WhatsApp ?', a: 'Oui. Beaucoup de nos parcours finissent sur WhatsApp, là où vos clients répondent.' },
        { q: 'Comment suivre les résultats ?', a: 'Vous recevez des bilans réguliers avec les chiffres réels de vos campagnes.' },
      ],
      en: [
        { q: 'What budget should I plan?', a: 'It depends on your goals. We suggest a realistic starting budget and adjust it based on results.' },
        { q: 'Do you guarantee results?', a: 'No one can guarantee sales. We guarantee a method, transparent tracking and regular adjustments.' },
        { q: 'Do you work with WhatsApp?', a: 'Yes. Many of our journeys end on WhatsApp, where your customers actually reply.' },
        { q: 'How do I track results?', a: 'You receive regular reports with the real figures from your campaigns.' },
      ],
    },
  },
  {
    slug: 'consulting',
    name: 'AXIONA Consulting',
    featured: false,
    status: 'available',
    keywords: {
      fr: ['Stratégie IA', 'Transformation digitale', 'Conseil'],
      en: ['AI strategy', 'Digital transformation', 'Advisory'],
    },
    tagline: {
      fr: 'Une feuille de route claire pour passer au numérique.',
      en: 'A clear roadmap to go digital.',
    },
    intro: {
      fr: 'Par où commencer ? Quels outils choisir ? Combien investir ? Nous vous aidons à décider, puis à avancer étape par étape.',
      en: 'Where to start? Which tools to choose? How much to invest? We help you decide, then move forward step by step.',
    },
    services: {
      fr: [
        { title: 'Stratégie IA', text: 'Identifier où l’IA vous fait vraiment gagner du temps ou de l’argent, et où elle n’apporte rien.' },
        { title: 'Transformation digitale', text: 'Organiser vos outils, vos données et vos processus pour travailler mieux.' },
        { title: 'Conseil', text: 'Un regard extérieur sur vos projets numériques, vos devis et vos prestataires.' },
      ],
      en: [
        { title: 'AI strategy', text: 'Find where AI genuinely saves you time or money, and where it adds nothing.' },
        { title: 'Digital transformation', text: 'Organise your tools, data and processes to work better.' },
        { title: 'Advisory', text: 'An outside view on your digital projects, quotes and suppliers.' },
      ],
    },
    example: {
      fr: { title: 'Exemple : un diagnostic', text: 'Une PME repart avec la liste de ses tâches automatisables, trois priorités chiffrées en FCFA et un calendrier réaliste.' },
      en: { title: 'Example: a diagnostic', text: 'An SME leaves with a list of tasks that can be automated, three priorities costed in FCFA and a realistic timeline.' },
    },
    steps: {
      fr: ['Entretiens avec vous et votre équipe.', 'Diagnostic de vos outils et processus.', 'Feuille de route avec priorités et budget.', 'Accompagnement de la mise en œuvre, si vous le souhaitez.'],
      en: ['Interviews with you and your team.', 'Review of your tools and processes.', 'Roadmap with priorities and budget.', 'Support with implementation, if you wish.'],
    },
    pricing: {
      fr: [{ label: 'Sur devis, en FCFA', detail: 'Selon la taille de la structure et la durée de la mission.' }],
      en: [{ label: 'Custom quote, in FCFA', detail: 'Depends on the size of the organisation and the length of the engagement.' }],
    },
    faq: {
      fr: [
        { q: 'Pour quelles structures ?', a: 'PME, commerces, écoles, cliniques, associations, administrations : toute structure qui veut avancer avec le numérique.' },
        { q: 'Faut-il ensuite travailler avec AXIONA ?', a: 'Non. La feuille de route vous appartient. Vous pouvez la mettre en œuvre avec nous ou avec d’autres.' },
        { q: 'Combien de temps dure une mission ?', a: 'De quelques jours pour un diagnostic à plusieurs mois pour un accompagnement. La durée est fixée dans le devis.' },
        { q: 'Intervenez-vous hors de Buea ?', a: 'Oui, à distance partout, et sur place selon le projet.' },
      ],
      en: [
        { q: 'Who is it for?', a: 'SMEs, shops, schools, clinics, NGOs, public bodies: any organisation that wants to move forward with digital.' },
        { q: 'Do we have to work with AXIONA afterwards?', a: 'No. The roadmap is yours. You can implement it with us or with others.' },
        { q: 'How long does an engagement last?', a: 'From a few days for a diagnostic to several months for ongoing support. The length is set in the quote.' },
        { q: 'Do you work outside Buea?', a: 'Yes, remotely anywhere, and on site depending on the project.' },
      ],
    },
  },
];

export type Branch = {
  slug: BranchSlug;
  name: string;
  featured: boolean;
  status: BranchStatus;
  keywords: string[];
  tagline: string;
  intro: string;
  services: { title: string; text: string }[];
  example: { title: string; text: string };
  steps: string[];
  pricing: { label: string; detail?: string }[];
  faq: { q: string; a: string }[];
  useCases?: { title: string; text: string }[];
  product?: { name: string; text: string; href?: string; cta?: string };
  storeLink?: boolean;
};

function localize(b: BranchSource, locale: Locale): Branch {
  return {
    slug: b.slug,
    name: b.name,
    featured: b.featured,
    status: b.status,
    keywords: b.keywords[locale],
    tagline: b.tagline[locale],
    intro: b.intro[locale],
    services: b.services[locale],
    example: b.example[locale],
    steps: b.steps[locale],
    pricing: b.pricing[locale],
    faq: b.faq[locale],
    useCases: b.useCases?.[locale],
    product: b.product?.[locale],
    storeLink: b.storeLink,
  };
}

export const branchSlugs = sources.map((b) => b.slug);

export function getBranches(locale: Locale): Branch[] {
  return sources.map((b) => localize(b, locale));
}

export function getBranch(slug: string, locale: Locale): Branch | undefined {
  const b = sources.find((s) => s.slug === slug);
  return b ? localize(b, locale) : undefined;
}
