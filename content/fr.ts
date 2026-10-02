/**
 * Textes du site en français (langue par défaut).
 * Les textes des 8 branches sont dans content/branches.ts.
 * en.ts doit garder exactement la même structure (vérifié par TypeScript).
 */
const fr = {
  meta: {
    homeTitle: 'AXIONA Global AI Technologies — IA, automatisation et digital au Cameroun',
    homeDescription:
      'AXIONA conçoit des agents IA, des automatisations et des solutions digitales pour les entreprises camerounaises et africaines. Basés à Buea, joignables sur WhatsApp.',
    branchesTitle: 'Nos 8 branches — AXIONA',
    branchesDescription:
      'IA, automatisation, logiciels, produits digitaux, formation, création, marketing et conseil : choisissez la branche dont votre entreprise a besoin.',
    aboutTitle: 'À propos — AXIONA Global AI Technologies',
    aboutDescription:
      'AXIONA est une entreprise technologique basée à Buea, au Cameroun, fondée par Nobou Dzoda Raoul Jospin. Notre vision : mettre l’IA au service de la réussite des Africains.',
    contactTitle: 'Contact — AXIONA',
    contactDescription:
      'Parlez de votre projet à AXIONA sur WhatsApp ou par le formulaire. Basés à Buea, Cameroun.',
    legalTitle: 'Mentions légales — AXIONA',
    legalDescription: 'Mentions légales du site AXIONA Global AI Technologies.',
    branchTitle: '{name} — {tagline}',
    ogAlt: 'AXIONA Global AI Technologies — Là où l’IA rencontre l’avenir.',
  },
  slogan: 'Là où l’IA rencontre l’avenir.',
  nav: {
    home: 'Accueil',
    branches: 'Branches',
    allBranches: 'Voir les 8 branches',
    about: 'À propos',
    contact: 'Contact',
    expert: 'Parler à un expert',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    skip: 'Aller au contenu',
    language: 'Langue',
    switchTo: 'Passer en anglais',
    mainNav: 'Navigation principale',
  },
  common: {
    status: { available: 'Disponible', soon: 'Bientôt' },
    discover: 'Découvrir',
    seeBranch: 'Voir la branche',
    whatsapp: 'Écrire sur WhatsApp',
    whatsappFab: 'Discuter sur WhatsApp',
    store: 'Visiter la boutique',
    externalHint: '(nouvel onglet)',
    whatsappMessage: 'Bonjour AXIONA, je souhaite parler à un expert.',
    whatsappBranchMessage: 'Bonjour AXIONA, je suis intéressé(e) par {name}.',
    whatsappDemoMessage: 'Bonjour AXIONA, je souhaite une démo gratuite d’un agent IA ou d’une automatisation.',
  },
  hero: {
    title: 'Là où l’IA rencontre l’avenir.',
    subtitle:
      'AXIONA conçoit des solutions d’IA, d’automatisation et de digital pour les entreprises camerounaises et africaines : moins de tâches répétitives, plus de clients, plus de résultats.',
    primary: 'Parler à un expert',
    secondary: 'Découvrir nos branches',
  },
  strip: ['Basés à Buea, Cameroun', 'Pensé pour WhatsApp et le Mobile Money', 'Connecté aux outils que vous utilisez déjà'],
  flagship: {
    title: 'Un assistant qui répond, un workflow qui agit.',
    intro:
      'AXIONA AI et AXIONA Automation forment notre offre phare. L’IA comprend vos clients, l’automatisation fait le travail derrière. Votre équipe garde la main.',
    diagramLabel: 'Schéma : du message client au résultat',
    diagramHint: 'Touchez une étape pour voir ce qui se passe.',
    nodes: [
      { title: 'Message client', text: '« Bonjour, avez-vous une chambre libre samedi ? » arrive sur WhatsApp, même à 23 h.' },
      { title: 'Agent IA', text: 'Il comprend la demande, vérifie les informations et répond dans la langue du client.' },
      { title: 'Workflow n8n', text: 'Le workflow consulte le planning, enregistre la réservation et prépare les documents.' },
      { title: 'Résultat', text: 'Réservation confirmée, facture envoyée, réponse au client. Votre équipe est notifiée.' },
    ],
    outcomes: ['Réservation', 'Facture', 'Réponse'],
    casesTitle: 'Quatre cas concrets',
    cases: [
      { title: 'Agent de réservation', text: 'Il propose un créneau, confirme et envoie un rappel.' },
      { title: 'Agent vocal', text: 'Il décroche, renseigne et note les rendez-vous.' },
      { title: 'Réponses automatiques WhatsApp', text: 'Prix, horaires, suivi de commande : réponse immédiate.' },
      { title: 'Relances et facturation', text: 'Factures envoyées, paiements suivis, relances au bon moment.' },
    ],
    cta: 'Demander une démo gratuite',
    linkAi: 'AXIONA AI en détail',
    linkAutomation: 'AXIONA Automation en détail',
  },
  branchesSection: {
    title: 'Huit branches, une seule équipe.',
    intro: 'Un seul besoin ? Une seule branche. Vous choisissez ce dont votre entreprise a besoin.',
    flagshipLabel: 'Offre phare',
    all: 'Voir toutes les branches',
  },
  process: {
    title: 'Comment ça se passe',
    intro: 'Pas de surprise : vous savez à chaque étape ce qui est fait et combien ça coûte.',
    steps: [
      { title: 'On écoute votre besoin', text: 'Un échange sur WhatsApp, au téléphone ou en rendez-vous.' },
      { title: 'On propose une solution et un prix en FCFA', text: 'Un devis clair, sans jargon et sans engagement.' },
      { title: 'On construit et on teste avec vous', text: 'Vous voyez le résultat avant la mise en service.' },
      { title: 'On vous accompagne après la livraison', text: 'Formation, suivi et ajustements.' },
    ],
  },
  learn: {
    title: 'Apprendre et s’équiper',
    intro:
      'Avec AXIONA Academy et AXIONA Digital, vous prenez en main l’IA vous-même : formations, guides et ressources prêtes à utiliser.',
    items: [
      { title: 'Formation gratuite', text: 'Design graphique assisté par IA : créez des visuels professionnels avec les bons outils.', tag: 'Gratuit' },
      { title: 'Guide pratique', text: 'Un guide concret pour démarrer avec l’IA au quotidien.', tag: '1 500 FCFA' },
      { title: 'Ebooks, templates et prompts', text: 'Des ressources prêtes à utiliser pour gagner du temps.', tag: 'Boutique' },
    ],
    cta: 'Visiter la boutique',
    academy: 'AXIONA Academy',
    digital: 'AXIONA Digital',
  },
  founder: {
    title: 'Le fondateur',
    name: 'Nobou Dzoda Raoul Jospin',
    role: 'Fondateur & CEO',
    bio: 'Développeur autodidacte, auteur publié, entrepreneur.',
    visionLabel: 'Vision',
    vision: 'Mettre l’IA au service de la réussite des Africains.',
    photoAlt: 'Portrait de Nobou Dzoda Raoul Jospin, fondateur et CEO d’AXIONA',
    placeholderAlt: 'Emplacement réservé à la photo du fondateur',
    cta: 'En savoir plus sur AXIONA',
  },
  finalCta: {
    title: 'Votre prochaine étape commence par une conversation.',
    text: 'Dites-nous ce qui vous prend du temps ou ce que vous voulez lancer. Nous vous répondons avec une proposition claire.',
    whatsapp: 'Écrire sur WhatsApp',
    or: 'ou laissez-nous un message',
  },
  form: {
    name: 'Nom',
    company: 'Entreprise',
    companyOptional: 'facultatif',
    contact: 'WhatsApp ou e-mail',
    contactHint: 'Pour que nous puissions vous répondre.',
    branch: 'Branche concernée',
    branchUnknown: 'Je ne sais pas encore',
    message: 'Message',
    messagePlaceholder: 'Décrivez votre besoin en quelques phrases.',
    submit: 'Envoyer ma demande',
    sending: 'Envoi…',
    success: 'Merci ! Votre demande est bien partie. Nous vous répondons rapidement.',
    error: 'L’envoi n’a pas abouti. Réessayez ou envoyez votre demande sur WhatsApp.',
    sendWhatsapp: 'Envoyer plutôt sur WhatsApp',
    required: 'Ce champ est requis.',
    tooShort: 'Ajoutez quelques mots de plus.',
    privacy: 'Vos informations servent uniquement à répondre à votre demande.',
    whatsappIntro: 'Bonjour AXIONA,',
  },
  footer: {
    branches: 'Branches',
    company: 'AXIONA',
    contact: 'Contact',
    follow: 'Suivez-nous',
    legal: 'Mentions légales',
    location: 'Buea, Cameroun',
    rights: '© AXIONA Global AI Technologies 2026, Buea, Cameroun.',
    socialsSoon: 'Nos réseaux arrivent bientôt.',
  },
  branchPage: {
    breadcrumb: 'Branches',
    whatWeDo: 'Ce que nous faisons',
    example: 'Un exemple concret',
    useCases: 'Cas d’usage',
    flow: 'Comment l’IA et l’automatisation travaillent ensemble',
    steps: 'Comment ça se déroule',
    pricing: 'Tarifs',
    faq: 'Questions fréquentes',
    ctaTitle: 'Parlons de votre projet',
    ctaText: 'Une question, un besoin précis ? Écrivez-nous, nous vous répondons avec une proposition claire.',
    otherBranches: 'Les autres branches',
    soonNote: 'Cette branche ouvre bientôt. Écrivez-nous pour être prévenu.',
    product: 'Notre outil',
    productSoon: 'Bientôt disponible',
    store: 'Voir les produits sur la boutique',
  },
  branchesPage: {
    title: 'Nos 8 branches',
    intro:
      'Un seul besoin ? Une seule branche. Chaque branche peut être choisie seule. Et si votre projet en touche plusieurs, une seule équipe s’en occupe.',
    flagshipTitle: 'L’offre phare',
    othersTitle: 'Les autres branches',
    ctaTitle: 'Vous hésitez entre deux branches ?',
    ctaText: 'Décrivez votre besoin : nous vous orientons vers la bonne solution, sans engagement.',
  },
  about: {
    title: 'L’intelligence au service de la croissance.',
    intro:
      'AXIONA Global AI Technologies est une entreprise technologique basée à Buea, au Cameroun. Nous aidons les entreprises à travailler mieux grâce à l’IA, à l’automatisation et au digital.',
    visionTitle: 'Notre vision',
    vision:
      'Mettre l’IA au service de la réussite des Africains. Des outils de niveau international, pensés pour la réalité de nos marchés : WhatsApp, Mobile Money, connexions mobiles, deux langues.',
    storyTitle: 'Notre histoire',
    story: [
      'AXIONA est née à Buea d’un constat simple : l’IA change la façon de travailler partout dans le monde, et les entreprises africaines doivent en profiter pleinement, avec des solutions adaptées à leur quotidien.',
      'Pour répondre à des besoins très différents, AXIONA s’organise en huit branches. Chacune peut être choisie seule ; ensemble, elles couvrent tout le parcours, de la stratégie à la mise en œuvre.',
    ],
    valuesTitle: 'Nos valeurs',
    values: [
      { title: 'Concret', text: 'Nous construisons ce qui sert vraiment : du temps gagné, des clients en plus.' },
      { title: 'Transparent', text: 'Des devis clairs en FCFA et aucune promesse que nous ne pouvons pas tenir.' },
      { title: 'Proche', text: 'Joignables sur WhatsApp, en français comme en anglais, avant et après la livraison.' },
      { title: 'Exigeant', text: 'Une qualité de niveau international, sur chaque projet, quelle que soit sa taille.' },
    ],
    locationTitle: 'Implantés à Buea',
    location:
      'Notre base est à Buea, dans la région du Sud-Ouest du Cameroun. Nous travaillons avec des structures partout au Cameroun et en Afrique, en présentiel ou à distance.',
  },
  contactPage: {
    title: 'Parlons de votre projet.',
    intro: 'Le plus rapide : WhatsApp. Vous préférez écrire ? Le formulaire nous arrive directement.',
    whatsappTitle: 'WhatsApp',
    whatsappText: 'Une réponse rapide, en français ou en anglais.',
    locationTitle: 'Adresse',
    location: 'Buea, Cameroun',
    hoursTitle: 'Horaires',
    emailTitle: 'E-mail',
    formTitle: 'Envoyer une demande',
  },
  legal: {
    title: 'Mentions légales',
    updated: 'Dernière mise à jour : 2026',
    sections: [
      {
        title: 'Éditeur du site',
        body: [
          'AXIONA Global AI Technologies, Buea, Cameroun.',
          'Immatriculation : TODO_RCCM.',
          'Directeur de la publication : Nobou Dzoda Raoul Jospin, Fondateur & CEO.',
          'Contact : {email}',
        ],
      },
      {
        title: 'Hébergement',
        body: ['Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis. vercel.com'],
      },
      {
        title: 'Données personnelles',
        body: [
          'Les informations envoyées via le formulaire (nom, entreprise, contact, message) servent uniquement à répondre à votre demande. Elles ne sont ni vendues ni cédées.',
          'Vous pouvez demander à tout moment l’accès à vos données ou leur suppression en nous écrivant.',
          'Ce site n’utilise pas de cookies publicitaires.',
        ],
      },
      {
        title: 'Propriété intellectuelle',
        body: [
          'Le nom AXIONA, le logo, les textes et les visuels de ce site appartiennent à AXIONA Global AI Technologies. Toute reproduction sans autorisation est interdite.',
        ],
      },
    ],
  },
  notFound: {
    title: 'Page introuvable',
    text: 'Cette page n’existe pas ou a été déplacée.',
    back: 'Retour à l’accueil',
  },
};

export default fr;
export type Dictionary = typeof fr;
