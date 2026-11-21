import type { ProjectText } from "@/lib/research/localized";

export const bittensorFr: ProjectText = {
  oneLiner: "Un réseau de « subnets » animés par des incitations qui récompensent le travail d'apprentissage automatique, avec une offre de 21 millions inspirée de Bitcoin.",
  tags: ["IA décentralisée", "Subnets", "Lancement équitable"],
  headline: "Bittensor : des incitations en tokens peuvent-elles produire une intelligence artificielle utile ?",
  overview: {
    summary:
      "Bittensor est une blockchain qui verse des émissions de TAO aux participants qui produisent des résultats d'apprentissage automatique. Elle est organisée en subnets, chacun étant un marché concurrentiel pour une tâche précise (génération de texte, collecte de données, calcul, prédiction…). Les validateurs notent les mineurs et les émissions suivent ces notes. Depuis la mise à jour Dynamic TAO, chaque subnet a son propre token et les émissions sont allouées selon la demande du marché.",
    problem: ["Le développement de l'IA est concentré entre quelques grandes entreprises ; Bittensor propose des marchés ouverts, animés par des incitations, pour l'intelligence artificielle."],
    valueProposition: [
      "Le Yuma Consensus agrège les poids attribués par les validateurs pour répartir les émissions entre les mineurs de chaque subnet.",
      "Dynamic TAO (février 2025) a doté chaque subnet d'un token « alpha » apparié au TAO dans un pool de liquidité, ce qui permet aux stakers d'orienter les émissions.",
    ],
    positioning: ["Premier réseau d'IA décentralisée par la valeur de marché ; en concurrence pour les talents et l'attention avec les laboratoires d'IA centralisés et d'autres protocoles d'IA décentralisée."],
    team: ["Fondé par Jacob Steeves et Ala Shaabana ; développé par l'Opentensor Foundation. Le réseau a été lancé sans pré-minage ni vente de tokens."],
  },
  technology: {
    blocks: [
      ["La chaîne Subtensor (construite avec Substrate) enregistre les inscriptions, les poids et les émissions ; le travail d'apprentissage automatique se fait hors chaîne, dans les subnets."],
      ["La production de blocs est relativement centralisée ; le « consensus » de Bittensor désigne surtout le Yuma Consensus appliqué aux notes des validateurs."],
      ["En juillet 2024, la chaîne a été placée en mode sécurisé après une attaque qui vidait des wallets, liée à un paquet Python compromis."],
      ["Utiliser des mécanismes de marché (dTAO) pour répartir les émissions entre des tâches d'IA est une expérience inédite."],
    ],
    limitations: [
      "Mesurer la valeur réelle des résultats des subnets est difficile ; les validateurs peuvent être manipulés.",
      "La chaîne et la gouvernance sont plus centralisées que ne le suggère le récit du « lancement équitable ».",
    ],
  },
  tokenomics: {
    supplyModelNote:
      "Offre maximale de 21 millions de TAO. L'émission par bloc est divisée par deux quand l'émission cumulée atteint certains paliers de l'offre ; le premier halving a eu lieu en décembre 2025. Les frais d'inscription recyclés (brûlés) retardent les halvings.",
    distributionNote: "Pas de graphique d'allocation : le TAO n'a eu ni pré-minage, ni ICO, ni allocation aux initiés ; tous les tokens sont émis pour les participants du réseau.",
    utility: ["Le TAO est staké auprès des validateurs et des subnets, sert à s'inscrire sur les subnets et est apparié aux tokens alpha des subnets."],
    emissions: ["Les émissions sont réparties entre les mineurs, les validateurs et stakers, et les propriétaires de subnets."],
    vesting: ["Pas de vesting : lancement équitable sans allocation aux initiés."],
    valueAccrual: ["La demande de TAO vient du staking dans les subnets et des inscriptions ; pas de revenus de frais au sens classique."],
  },
  adoption: {
    claims: [
      "Plus d'une centaine de subnets se disputent les émissions ; leur qualité varie énormément et peu d'entre eux ont prouvé des revenus externes.",
      "Certains subnets vendent des services à des utilisateurs externes, le signal clé d'une adoption réelle.",
    ],
    metricsToWatch: ["Subnets avec des revenus externes", "Répartition de la mise entre les subnets", "Concentration des validateurs", "Effets du halving sur la participation des mineurs"],
  },
  financials: {
    relevantMetrics: [
      { label: "Revenus externes des subnets", why: "La demande réelle au-delà des émissions." },
      { label: "Valeur des émissions", why: "La subvention versée aux participants." },
    ],
    claims: ["L'économie du réseau est actuellement portée par les émissions ; les données de revenus standardisées sont rares."],
  },
  onchain: {
    claims: ["La mise, les émissions et les données des subnets sont publiques via des explorateurs comme taostats."],
    dataAvailability: "Des analyses par subnet sont prévues en phase 2.",
  },
  competitors: {
    columns: [
      {
        technology: "Subnets, Yuma Consensus, dTAO",
        adoption: "Premier réseau d'IA décentralisée",
        tokenomics: "Plafond de 21 M, halvings",
        economics: "Portée par les émissions",
        strengths: "Lancement équitable, conception de marché ouvert",
        weaknesses: "Qualité des résultats difficile à mesurer",
        positioning: "Place de marché de l'intelligence artificielle",
      },
      {
        technology: "Place de marché de GPU",
        adoption: "Calcul pour la création",
        tokenomics: "BME",
        economics: "Burns liés à l'usage",
        strengths: "Service concret",
        weaknesses: "Périmètre plus étroit",
        positioning: "Offre de calcul décentralisée",
      },
      {
        technology: "Modèles propriétaires",
        adoption: "Dominant",
        tokenomics: "n/a",
        economics: "Revenus importants",
        strengths: "Capital, talents, données",
        weaknesses: "Fermé",
        positioning: "Fournisseurs d'IA de pointe",
      },
    ],
  },
  risks: [
    ["Un incident de sécurité passé a conduit à placer la chaîne en mode sécurisé."],
    ["La valeur dépend d'une activité portée par les émissions ; la demande réelle n'est pas prouvée."],
    ["Les réglementations sur l'IA comme sur les tokens évoluent."],
    ["L'Opentensor Foundation conserve un contrôle important sur la chaîne."],
    ["Token de grande capitalisation ; les tokens des subnets sont bien moins liquides."],
    ["Concentration des validateurs et de la mise."],
    ["En concurrence avec des entreprises d'IA centralisées extrêmement bien financées."],
  ],
  thesis: {
    bull: ["Plusieurs subnets deviennent des services d'IA compétitifs avec des revenus externes, ce qui valide le modèle d'incitations."],
    neutral: ["Bittensor reste un écosystème expérimental porté par les émissions, avec quelques subnets qui se distinguent."],
    bear: ["Les résultats des subnets ne parviennent pas à rivaliser ; les émissions subventionnent une activité improductive."],
    catalysts: ["Le premier halving a réduit les émissions en décembre 2025.", "Des subnets avec des clients entreprises payants."],
    assumptions: ["L'allocation des émissions par le marché récompense l'utilité réelle."],
    monitor: ["Revenus externes", "Concentration des validateurs", "Incidents de sécurité"],
    invalidation: ["Aucun subnet n'atteint des revenus externes significatifs sur un cycle complet"],
  },
  framework: [
    { summary: "Conception inédite, avec des incidents de sécurité.", dataUsed: ["Documentation", "Rapports d'incident"], limitations: "Évolution rapide." },
    { summary: "Lancement équitable, offre plafonnée.", dataUsed: ["Livre blanc", "Documentation"], limitations: "Le calendrier des halvings dépend du recyclage." },
    { summary: "Une activité surtout portée par les émissions.", dataUsed: ["taostats"], limitations: "Qualité de l'usage difficile à mesurer." },
    { summary: "Pas de données de revenus standardisées.", dataUsed: [], limitations: "Données insuffisantes." },
    { summary: "Centré sur la Fondation.", dataUsed: ["Documentation"], limitations: "Qualitatif." },
    { summary: "Leader de l'IA décentralisée.", dataUsed: ["Revue du marché"], limitations: "Qualitatif." },
    { summary: "Risque économique et de gouvernance élevé.", dataUsed: ["Revue des risques"], limitations: "Qualitatif." },
  ],
  sources: [
    { supports: "Conception et principes du lancement équitable." },
    { supports: "Architecture et subnets." },
    { supports: "Répartition des émissions entre les mineurs.", limitations: "La structure des URL de la documentation peut changer." },
    { supports: "Tokens alpha des subnets et émissions.", limitations: "La structure des URL de la documentation peut changer." },
    { supports: "Répartition des émissions et halving.", limitations: "La structure des URL de la documentation peut changer." },
    { supports: "Mode sécurisé après l'exploit des wallets, attribué à un paquet PyPI malveillant." },
    { supports: "Données de mise, d'émissions et de subnets." },
    { supports: "Données de marché live : prix, capitalisation, FDV, offre en circulation et offre totale.", limitations: "Agrégateur ; les chiffres d'offre dépendent des déclarations des émetteurs et de la méthodologie de CoinGecko." },
  ],
};
