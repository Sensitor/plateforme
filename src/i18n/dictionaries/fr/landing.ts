import type { Dictionary } from "../en";

export const landing: Dictionary["landing"] = {
  nav: { primary: "Principale", projects: "Projets", research: "Recherche", academy: "Academy", methodology: "Méthodologie", plans: "Offres", explore: "Explorer", markets: "Marchés", footer: "Pied de page" },
  open: "Ouvrir la plateforme",
  badge: "Digital Asset Intelligence",
  hero: ["Comprendre le marché.", "Étudier les projets.", "Maîtriser ses connaissances."],
  intro:
    "Sensitor est une plateforme de recherche indépendante sur les actifs numériques. Nous ne vous disons pas quoi acheter. Nous vous donnons les données, la recherche et la formation pour comprendre ce que vous faites.",
  ctaExplore: "Explorer la plateforme",
  ctaDossier: "Lire un dossier de recherche",
  fineprint: "Gratuit · Sans compte · Pas un conseil en investissement",
  coverage: (sectors: number) => `projets de référence documentés dans ${sectors} secteurs`,
  dimensionsTitle: "Un seul environnement pour découvrir, comprendre et gérer.",
  available: "Disponible",
  dimensions: {
    discover: {
      title: "Découvrir",
      text: "Parcourez une bibliothèque documentée de projets par secteur, blockchain et maturité, avec données de marché en direct, sources transparentes et une carte de leurs liens.",
      links: ["Explorer les projets", "Knowledge Graph"],
    },
    understand: { title: "Comprendre", text: "Lisez des dossiers construits comme de la recherche financière, comparez les protocoles et apprenez chaque concept dans l'Academy.", links: ["Recherche", "Academy"] },
    manage: {
      title: "Gérer",
      text: "Suivez votre portefeuille avec des prix en direct et voyez vos vraies expositions : concentration, secteurs, dépendances communes, corrélations et déblocages, avec des alertes de prix par e-mail.",
      links: ["Portefeuille", "Watchlist"],
    },
  },
  standardBadge: "Standard de recherche",
  standardTitle: "Faits, interprétations et hypothèses, jamais mélangés.",
  standardText:
    "Chaque affirmation d'un dossier Sensitor est qualifiée et chaque fait renvoie à sa source. Sept piliers sont notés séparément, chacun avec ses données, ses limites et son niveau de confiance, et nous ne publions pas de note globale quand les données sont trop minces.",
  readMethodology: "Lire la méthodologie →",
  excerptTitle: "Ethereum, extrait du dossier",
  excerpt: [
    "La mise à jour Dencun (mars 2024) a introduit les transactions porteuses de blobs (EIP-4844), un espace de données moins cher conçu pour les rollups.",
    "Depuis que les rollups ont déplacé leurs données vers des blobs peu coûteux, le burn des frais sur L1 a baissé et l'offre nette a eu tendance à devenir inflationniste.",
    "La tokenisation d'actifs réels sur Ethereum pourrait accroître la demande d'espace de bloc et d'ETH comme collatéral.",
  ],
  principles: [
    ["Indépendant", "Aucun référencement payant, aucune note sponsorisée."],
    ["Sourcé", "Chaque fait renvoie à une source, avec sa date et ses limites."],
    ["Comparable", "Des indicateurs adaptés à chaque modèle économique."],
    ["Données réelles", "Données de marché affichées avec leur fournisseur et leur horodatage, jamais inventées."],
  ],
  plansTitle: "Offres",
  plansText: "Tarifs indicatifs. Tout ce qui est disponible aujourd'hui sur la plateforme est gratuit, le temps de préparer les offres payantes.",
  startFree: "Commencer gratuitement",
  footerTagline: "Comprendre. Analyser. Devenir indépendant.",
  disclaimer:
    "SENSITOR publie uniquement des contenus de recherche et de formation. Rien sur ce site ne constitue un conseil en investissement, une sollicitation ou une recommandation d'achat ou de vente d'un actif numérique. Les actifs numériques sont très volatils et vous pouvez perdre la totalité de votre capital. Données de marché : CoinGecko, CoinPaprika, DefiLlama, Alternative.me.",
  snapshot: {
    title: "Le marché en direct",
    real: "Données réelles",
    marketCap: "Capitalisation",
    dominance: "Dominance BTC",
    fearGreed: "Fear & Greed",
    sentiment: "Sentiment",
    browse: (n: number) => `Voir les ${n} projets`,
  },
};

export const plans: Dictionary["plans"] = {
  page: {
    eyebrow: "Offres",
    title: "Choisissez jusqu'où vous voulez aller",
    description: "Les prix sont des hypothèses indicatives. Les abonnements payants ouvriront avec Stripe en phase 4 ; d'ici là, tout ce qui est disponible dans l'application est gratuit.",
    current: "Offre actuelle",
    opensLater: "Abonnements ouverts en phase 4",
    note: "Un Private Program sur candidature est en préparation, avec un périmètre pédagogique et réglementaire clairement défini. Aucune offre ne comprend de recommandation personnalisée d'achat ou de vente ni de promesse de performance.",
  },
  available: "Disponible",
  planned: "Prévu",
  items: {
    free: {
      name: "Free",
      period: "",
      tagline: "Découvrir le marché et les projets.",
      features: ["Tableau de bord Vue d'ensemble", "Bibliothèque de projets et données de marché en direct", "Dossiers de recherche (accès limité au lancement)", "Watchlist (jusqu'à 10 projets)", "Academy d'initiation", "Une sélection d'analyses gratuites"],
    },
    pro: {
      name: "Sensitor Pro",
      period: "/ mois",
      tagline: "Toute la recherche et les outils pour analyser avec méthode.",
      features: ["Accès complet aux dossiers de recherche", "Données avancées", "Comparateur de projets", "Portfolio Intelligence", "Watchlists et alertes avancées", "Academy complète", "Research Copilot (quotas d'usage raisonnable)"],
    },
    club: {
      name: "Research Club",
      period: "/ mois",
      tagline: "Aller plus loin avec la recherche du fondateur et la communauté.",
      features: ["Tout Sensitor Pro", "Founder Research", "Analyses approfondies et Weekly Market Intelligence", "Sessions collectives et lives pédagogiques", "Communauté premium", "Contenus exclusifs"],
    },
  },
};

export const ui: Dictionary["ui"] = {
  source: "Source",
  sources: {
    prices: "Prix",
    marketData: "Données de marché",
    market: "Marché",
    marketCap: "Capitalisation",
    sentiment: "Sentiment",
    tvl: "TVL",
    trend: "Tendance",
    fundamentals: "Fondamentaux",
  },
  fearGreed: { "Extreme Fear": "Peur extrême", Fear: "Peur", Neutral: "Neutre", Greed: "Cupidité", "Extreme Greed": "Cupidité extrême" },
  score: { withheld: "Note globale non publiée", title: "Note globale Sensitor (moyenne des sept piliers, de 1 à 5)" },
  risk: (level: string) => `Risque ${level.toLowerCase()}`,
  confidenceShort: { high: "Élevée", medium: "Moyenne", low: "Faible" },
  coverage: { full: "Dossier complet", partial: "Dossier partiel", limited: "Données limitées" },
  sourcePending: "(source à venir)",
  sourcePendingTitle: "Ce fait n'a pas encore de source et attend sa vérification.",
  claims: {
    fact: { label: "Fait vérifié", short: "Fait" },
    interpretation: { label: "Interprétation de l'analyste", short: "Analyse" },
    hypothesis: { label: "Hypothèse", short: "Hypothèse" },
  },
};
