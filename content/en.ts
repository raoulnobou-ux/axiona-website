/**
 * English copy. Must keep exactly the same structure as fr.ts (checked by TypeScript).
 * Branch copy lives in content/branches.ts.
 */
import type { Dictionary } from './fr';

const en: Dictionary = {
  meta: {
    homeTitle: 'AXIONA Global AI Technologies — AI, automation and digital solutions in Cameroon',
    homeDescription:
      'AXIONA builds AI agents, automations and digital solutions for businesses in Cameroon and across Africa. Based in Buea, reachable on WhatsApp.',
    branchesTitle: 'Our 8 branches — AXIONA',
    branchesDescription:
      'AI, automation, software, digital products, training, creative, marketing and consulting: pick the branch your business needs.',
    aboutTitle: 'About — AXIONA Global AI Technologies',
    aboutDescription:
      'AXIONA is a technology company based in Buea, Cameroon, founded by Nobou Dzoda Raoul Jospin. Our vision: put AI to work for Africa’s success.',
    contactTitle: 'Contact — AXIONA',
    contactDescription: 'Tell AXIONA about your project on WhatsApp or through the form. Based in Buea, Cameroon.',
    legalTitle: 'Legal notice — AXIONA',
    legalDescription: 'Legal notice for the AXIONA Global AI Technologies website.',
    branchTitle: '{name} — {tagline}',
    ogAlt: 'AXIONA Global AI Technologies — Where AI meets the future.',
  },
  slogan: 'Where AI meets the future.',
  nav: {
    home: 'Home',
    branches: 'Branches',
    allBranches: 'See all 8 branches',
    about: 'About',
    contact: 'Contact',
    expert: 'Talk to an expert',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    skip: 'Skip to content',
    language: 'Language',
    switchTo: 'Switch to French',
    mainNav: 'Main navigation',
  },
  common: {
    status: { available: 'Available', soon: 'Coming soon' },
    discover: 'Discover',
    seeBranch: 'View branch',
    whatsapp: 'Message us on WhatsApp',
    whatsappFab: 'Chat on WhatsApp',
    store: 'Visit the store',
    externalHint: '(new tab)',
    whatsappMessage: 'Hello AXIONA, I’d like to talk to an expert.',
    whatsappBranchMessage: 'Hello AXIONA, I’m interested in {name}.',
    whatsappDemoMessage: 'Hello AXIONA, I’d like a free demo of an AI agent or an automation.',
  },
  hero: {
    title: 'Where AI meets the future.',
    subtitle:
      'AXIONA builds AI, automation and digital solutions for businesses in Cameroon and across Africa: fewer repetitive tasks, more customers, better results.',
    primary: 'Talk to an expert',
    secondary: 'Explore our branches',
  },
  strip: ['Based in Buea, Cameroon', 'Built for WhatsApp and Mobile Money', 'Works with the tools you already use'],
  flagship: {
    title: 'An assistant that answers. A workflow that acts.',
    intro:
      'AXIONA AI and AXIONA Automation are our flagship offer. AI understands your customers, automation does the work behind the scenes. Your team stays in charge.',
    diagramLabel: 'Diagram: from customer message to result',
    diagramHint: 'Tap a step to see what happens.',
    nodes: [
      { title: 'Customer message', text: '“Hi, do you have a room free on Saturday?” lands on WhatsApp, even at 11 pm.' },
      { title: 'AI agent', text: 'It understands the request, checks the details and replies in the customer’s language.' },
      { title: 'n8n workflow', text: 'The workflow checks the calendar, records the booking and prepares the paperwork.' },
      { title: 'Result', text: 'Booking confirmed, invoice sent, customer answered. Your team gets notified.' },
    ],
    outcomes: ['Booking', 'Invoice', 'Reply'],
    casesTitle: 'Four real-world uses',
    cases: [
      { title: 'Booking agent', text: 'Offers a slot, confirms it and sends a reminder.' },
      { title: 'Voice agent', text: 'Picks up, answers questions and books appointments.' },
      { title: 'WhatsApp auto-replies', text: 'Prices, hours, order tracking: instant answers.' },
      { title: 'Follow-ups and invoicing', text: 'Invoices sent, payments tracked, reminders on time.' },
    ],
    cta: 'Book a free demo',
    linkAi: 'AXIONA AI in detail',
    linkAutomation: 'AXIONA Automation in detail',
  },
  branchesSection: {
    title: 'Eight branches, one team.',
    intro: 'Just one need? Just one branch. You choose what your business actually needs.',
    flagshipLabel: 'Flagship',
    all: 'See all branches',
  },
  process: {
    title: 'How it works',
    intro: 'No surprises: at every step you know what’s being done and what it costs.',
    steps: [
      { title: 'We listen to your needs', text: 'A conversation on WhatsApp, by phone or in person.' },
      { title: 'We propose a solution and a price in FCFA', text: 'A clear quote, no jargon, no commitment.' },
      { title: 'We build and test it with you', text: 'You see the result before it goes live.' },
      { title: 'We support you after delivery', text: 'Training, follow-up and adjustments.' },
    ],
  },
  learn: {
    title: 'Learn and get equipped',
    intro:
      'With AXIONA Academy and AXIONA Digital, you take AI into your own hands: courses, guides and ready-to-use resources.',
    items: [
      { title: 'Free course', text: 'AI-assisted graphic design: create professional visuals with the right tools.', tag: 'Free' },
      { title: 'Practical guide', text: 'A hands-on guide to start using AI every day.', tag: '1,500 FCFA' },
      { title: 'Ebooks, templates and prompts', text: 'Ready-to-use resources that save you time.', tag: 'Store' },
    ],
    cta: 'Visit the store',
    academy: 'AXIONA Academy',
    digital: 'AXIONA Digital',
  },
  founder: {
    title: 'The founder',
    name: 'Nobou Dzoda Raoul Jospin',
    role: 'Founder & CEO',
    bio: 'Self-taught developer, published author, entrepreneur.',
    visionLabel: 'Vision',
    vision: 'Put AI to work for Africa’s success.',
    photoAlt: 'Portrait of Nobou Dzoda Raoul Jospin, founder and CEO of AXIONA',
    placeholderAlt: 'Placeholder for the founder’s photo',
    cta: 'More about AXIONA',
  },
  finalCta: {
    title: 'Your next step starts with a conversation.',
    text: 'Tell us what takes up your time or what you want to launch. We’ll come back with a clear proposal.',
    whatsapp: 'Message us on WhatsApp',
    or: 'or leave us a message',
  },
  form: {
    name: 'Name',
    company: 'Company',
    companyOptional: 'optional',
    contact: 'WhatsApp or email',
    contactHint: 'So we can get back to you.',
    branch: 'Branch',
    branchUnknown: 'Not sure yet',
    message: 'Message',
    messagePlaceholder: 'Describe what you need in a few sentences.',
    submit: 'Send my request',
    sending: 'Sending…',
    success: 'Thank you! Your request is on its way. We’ll get back to you shortly.',
    error: 'Your request couldn’t be sent. Try again or send it on WhatsApp.',
    sendWhatsapp: 'Send it on WhatsApp instead',
    required: 'This field is required.',
    tooShort: 'Please add a few more words.',
    privacy: 'We only use your details to reply to your request.',
    whatsappIntro: 'Hello AXIONA,',
  },
  footer: {
    branches: 'Branches',
    company: 'AXIONA',
    contact: 'Contact',
    follow: 'Follow us',
    legal: 'Legal notice',
    location: 'Buea, Cameroon',
    rights: '© AXIONA Global AI Technologies 2026, Buea, Cameroon.',
    socialsSoon: 'Our social channels are coming soon.',
  },
  branchPage: {
    breadcrumb: 'Branches',
    whatWeDo: 'What we do',
    example: 'A real-world example',
    useCases: 'Use cases',
    flow: 'How AI and automation work together',
    steps: 'How it goes',
    pricing: 'Pricing',
    faq: 'Frequently asked questions',
    ctaTitle: 'Let’s talk about your project',
    ctaText: 'A question or a specific need? Message us and we’ll reply with a clear proposal.',
    otherBranches: 'Other branches',
    soonNote: 'This branch opens soon. Message us to be notified.',
    product: 'Our tool',
    productSoon: 'Coming soon',
    store: 'See the products in our store',
  },
  branchesPage: {
    title: 'Our 8 branches',
    intro:
      'Just one need? Just one branch. Every branch can be chosen on its own. And if your project spans several, one team handles it all.',
    flagshipTitle: 'Our flagship',
    othersTitle: 'Other branches',
    ctaTitle: 'Torn between two branches?',
    ctaText: 'Describe what you need and we’ll point you to the right solution, with no commitment.',
  },
  about: {
    title: 'Intelligence that drives growth.',
    intro:
      'AXIONA Global AI Technologies is a technology company based in Buea, Cameroon. We help businesses work better with AI, automation and digital tools.',
    visionTitle: 'Our vision',
    vision:
      'Put AI to work for Africa’s success. World-class tools, designed for the reality of our markets: WhatsApp, Mobile Money, mobile connections, two languages.',
    storyTitle: 'Our story',
    story: [
      'AXIONA was born in Buea from a simple observation: AI is changing how the world works, and African businesses should benefit fully, with solutions that fit their day-to-day reality.',
      'To meet very different needs, AXIONA is organised into eight branches. Each can be chosen on its own; together, they cover the whole journey, from strategy to delivery.',
    ],
    valuesTitle: 'Our values',
    values: [
      { title: 'Practical', text: 'We build what genuinely helps: time saved, more customers.' },
      { title: 'Transparent', text: 'Clear quotes in FCFA and no promises we can’t keep.' },
      { title: 'Close at hand', text: 'Reachable on WhatsApp, in English or French, before and after delivery.' },
      { title: 'Demanding', text: 'World-class quality on every project, whatever its size.' },
    ],
    locationTitle: 'Rooted in Buea',
    location:
      'We are based in Buea, in Cameroon’s South-West Region. We work with organisations across Cameroon and Africa, on site or remotely.',
  },
  contactPage: {
    title: 'Let’s talk about your project.',
    intro: 'The fastest way is WhatsApp. Prefer to write? The form comes straight to us.',
    whatsappTitle: 'WhatsApp',
    whatsappText: 'A quick reply, in English or French.',
    locationTitle: 'Address',
    location: 'Buea, Cameroon',
    hoursTitle: 'Opening hours',
    emailTitle: 'Email',
    formTitle: 'Send a request',
  },
  legal: {
    title: 'Legal notice',
    updated: 'Last updated: 2026',
    sections: [
      {
        title: 'Publisher',
        body: [
          'AXIONA Global AI Technologies, Buea, Cameroon.',
          'Registration: TODO_RCCM.',
          'Publication director: Nobou Dzoda Raoul Jospin, Founder & CEO.',
          'Contact: {email}',
        ],
      },
      {
        title: 'Hosting',
        body: ['Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, United States. vercel.com'],
      },
      {
        title: 'Personal data',
        body: [
          'Information sent through the form (name, company, contact details, message) is only used to reply to your request. It is never sold or shared.',
          'You can ask to access or delete your data at any time by writing to us.',
          'This website does not use advertising cookies.',
        ],
      },
      {
        title: 'Intellectual property',
        body: [
          'The AXIONA name, logo, text and visuals on this website belong to AXIONA Global AI Technologies. Reproduction without permission is prohibited.',
        ],
      },
    ],
  },
  notFound: {
    title: 'Page not found',
    text: 'This page doesn’t exist or has been moved.',
    back: 'Back to home',
  },
};

export default en;
