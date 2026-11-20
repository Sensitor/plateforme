import type { Dictionary } from "../en";

export const soon: Dictionary["soon"] = {
  notice: ["Cette section n'est", "pas encore disponible", ". Rien sur cette page ne collecte de données ni ne simule la fonctionnalité ; elle décrit ce qui est prévu."],
  planned: "Fonctionnalités prévues",
  principles: "Principes",
  availableNow: "Disponible aujourd'hui",
  community: {
    eyebrow: "Comprendre",
    title: "Communauté",
    phase: "Phase 4",
    description: "Une communauté tournée vers la recherche : des discussions organisées par projet et par secteur, centrées sur des analyses de qualité.",
    planned: ["Discussions par projet et par secteur", "Partage d'analyses et de commentaires", "Sessions de recherche collectives", "Lives pédagogiques et questions-réponses", "Publications Founder Research"],
    principles: ["La qualité avant le volume : des discussions modérées, orientées recherche.", "Aucune promotion payante ni sponsoring non déclaré.", "Aucun appel à acheter ou à vendre."],
    links: { research: "Bibliothèque de recherche" },
  },
  club: {
    eyebrow: "Research Club",
    title: "Sensitor Research Club",
    phase: "Phase 4",
    description: "L'offre premium pour les investisseurs qui veulent aller plus loin : recherche du fondateur, analyses approfondies et sessions collectives.",
    planned: ["Founder Research et Founder Notes", "Weekly Market Intelligence", "Analyses approfondies de projets et intelligence sectorielle", "Sessions de recherche collectives et lives pédagogiques", "Communauté premium", "Contenus exclusifs"],
    principles: ["De la formation et de la méthode, pas des signaux.", "Aucune promesse de performance.", "Sources et conflits d'intérêts transparents."],
    links: { plans: "Voir les offres", research: "Bibliothèque de recherche" },
  },
  private: {
    eyebrow: "Accompagnement",
    title: "Private Program",
    phase: "Plus tard, sur candidature",
    description: "Un futur programme d'accompagnement pédagogique, sur candidature, avec un périmètre pédagogique et réglementaire clairement défini.",
    planned: ["Coaching sur la méthodologie de recherche", "Comprendre les fondamentaux", "Gestion des risques", "Construire sa propre méthode d'analyse", "Sessions pédagogiques et études de cas"],
    principles: ["Aucune recommandation personnalisée d'achat ou de vente sans validation réglementaire préalable.", "Aucune promesse de rendement.", "Périmètre défini avec un juriste avant le lancement."],
    links: { academy: "Academy", methodology: "Méthodologie" },
  },
};

export const settings: Dictionary["settings"] = {
  eyebrow: "Réglages",
  title: "Réglages",
  description: "Préférences, vos données et l'état de nos fournisseurs de données.",
  display: { title: "Affichage", subtitle: "Préférences d'interface", theme: "Thème", dark: "Sombre (natif)", currency: "Devise de référence", language: "Langue" },
  data: { title: "Vos données" },
  providers: {
    title: "Fournisseurs de données",
    subtitle: "État en direct des sources qui alimentent Sensitor",
    rows: { quotes: "Prix des projets", global: "Marché global", sentiment: "Sentiment", defi: "DeFi et stablecoins" },
    status: { ok: "ok", partial: "partiel", unavailable: "indisponible" },
    history: "Historique de la capitalisation totale",
    enabled: "activé",
    requiresPro: "nécessite CoinGecko Pro",
  },
  local: {
    watchlist: (n: number) => `projet${n > 1 ? "s" : ""}`,
    watchlistLabel: "Watchlist :",
    confirm: "Tout supprimer ?",
    cancel: "Annuler",
    clear: "Vider la watchlist",
  },
};

export const watchlistPage: Dictionary["watchlistPage"] = {
  eyebrow: "Gérer",
  title: "Watchlist",
  description: "Les projets que vous suivez, avec prix en direct et dernières nouvelles de leurs dossiers. Connecté, votre watchlist se synchronise sur tous vos appareils.",
  empty: "Votre watchlist est vide",
  emptyText: "Suivez des projets depuis Explorer ou depuis n'importe quel dossier grâce à l'icône signet.",
  explore: "Explorer les projets",
  count: (limit: number) => `/ ${limit} projets`,
  compare: (n: number) => `Comparer ${n} →`,
  columns: { project: "Projet", price: "Prix", marketCap: "Capitalisation", trend: "Tendance 7 j", remove: "Retirer" },
  remove: (name: string) => `Retirer ${name}`,
};

export const research: Dictionary["research"] = {
  title: "Bibliothèque de recherche",
  description: "Chaque dossier sépare faits vérifiés, interprétations de l'analyste et hypothèses, et relie chaque fait à ses sources.",
  methodology: "Méthodologie",
  stats: {
    dossiers: "Dossiers",
    across: (n: number) => `Dans ${n} secteurs`,
    claims: "Affirmations qualifiées",
    claimsNote: "Faits, analyses et hypothèses",
    sourced: "Faits sourcés",
    sourcedNote: "Les faits sans source sont signalés",
    sources: "Sources citées",
    sourcesNote: "Liens vérifiés automatiquement",
  },
  draftsLead: "Tous les dossiers de cette version sont des brouillons :",
  draftsText: "préparés à partir de la documentation et des données publiques, avec chaque lien source vérifié, mais pas encore relus par l'équipe éditoriale Sensitor.",
  bySector: "Dossiers par secteur",
  draft: (v: string) => `Brouillon v${v}`,
  formatsTitle: "Formats à venir",
  formats: [
    ["Weekly Market Intelligence", "Une lecture hebdomadaire de la structure du marché, des flux et du sentiment.", "Research Club, phase 4"],
    ["Project Deep Dives", "Des dossiers longs qui prolongent les pages projets avec des analyses originales.", "Research Club, phase 4"],
    ["Sector Intelligence", "Des rapports sectoriels comparant modèles économiques et leaders.", "Phase 2"],
    ["Founder Notes", "Publications et grilles d'analyse du fondateur.", "Research Club, phase 4"],
    ["Investment Frameworks", "Des méthodes réutilisables d'analyse et de gestion des risques.", "Phase 4"],
  ],
};
