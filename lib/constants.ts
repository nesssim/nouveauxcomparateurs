export const SITE = {
  name: "Les Nouveaux Comparateurs",
  slogan: "Courtier d'assurances",
  description:
    "Courtier en assurances comparateur. Économisez jusqu'à 30% sur votre mutuelle santé. Mutuelles seniors, chiens/chats, obsèques, protection juridique. Hauts-de-France & Normandie.",
  url: "https://lesnouveauxcomparateurs.fr",
  phone: "+33183759325",
  phoneFormatted: "01 83 75 93 25",
  phoneRH: "06.98.92.07.63",
  email: "contact@lesnouveauxcomparateurs.fr",
  address: {
    street: "19 Rue du Chevalier la Barre",
    city: "Abbeville",
    postalCode: "80100",
    country: "FR",
    full: "19 Rue du Chevalier la Barre, 80100 Abbeville, FR",
  },
  geo: {
    lat: 50.1150868,
    lng: 1.8216695,
  },
  orias: "21008094",
  siren: "902408533",
  rcs: "Amiens B902408533",
  tva: "FR37902408533",
  capital: "300€",
  legalForm: "SAS",
  director: "Hervé Migliore",
  social: {
    facebook: "https://facebook.com/116595617969941",
    instagram: "https://www.instagram.com/les.nouveaux.comparateurs/",
    x: "https://x.com/eric_margulies",
    linkedin: "https://linkedin.com/in/eric-margulies-6a093825b",
  },
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/economisez", label: "Économisez" },
  { href: "/conseiller-personnel", label: "Conseiller" },
  { href: "/rejoignez-nous", label: "Rejoignez-nous" },
  { href: "/nous-contacter", label: "Contact" },
  { href: "/horaires-acces", label: "Horaires & Accès" },
] as const;

export const PRODUCTS = [
  {
    id: "mutuelle-seniors",
    name: "Mutuelles Santé Seniors",
    price: "20",
    image: "/images/services/mutuelle-seniors.jpg",
    description: "Couverture santé sur-mesure pour les seniors.",
  },
  {
    id: "chiens-chats",
    name: "Mutuelles Chiens et Chats",
    price: "10",
    image: "/images/services/chiens-chats.jpg",
    description: "Protégez vos compagnons à quatre pattes.",
  },
  {
    id: "obseques",
    name: "Assurance Obsèques",
    price: "20",
    image: "/images/services/obseques.jpg",
    description: "Anticipez et soulagez vos proches.",
  },
  {
    id: "protection-juridique",
    name: "Protection Juridique",
    price: "12,90",
    image: "/images/services/protection-juridique.jpg",
    description: "Défendez vos droits au quotidien.",
  },
] as const;

export const PARTNERS = [
  "Neoliane",
  "Zenioo",
  "SwissLife",
  "Cegema",
  "Malakoff",
  "Apivia",
  "April",
  "Harmonie Mutuelle",
  "Groupe Aesio",
  "Abeille",
  "GMF",
  "FMA Assurances",
  "iAssure",
  "Pop Santé",
  "Praeconis",
  "SPVie",
  "Wazari",
  "2MA",
  "Lequite",
] as const;

export const HOURS = [
  { day: "Lundi", hours: "9h00 - 18h00" },
  { day: "Mardi", hours: "9h00 - 18h00" },
  { day: "Mercredi", hours: "9h00 - 18h00" },
  { day: "Jeudi", hours: "9h00 - 18h00" },
  { day: "Vendredi", hours: "9h00 - 18h00" },
  { day: "Samedi", hours: "Fermé" },
  { day: "Dimanche", hours: "Fermé" },
] as const;
