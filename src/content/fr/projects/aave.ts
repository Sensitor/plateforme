import type { ProjectText } from "@/lib/research/localized";

export const aaveFr: ProjectText = {
  oneLiner: "Le plus grand marché de prêt décentralisé, déployé sur Ethereum et les principaux L2.",
  tags: ["Prêt", "Marchés monétaires", "Stablecoin GHO"],
  headline: "Aave : qu'est-ce qui fait tenir le plus grand marché de prêt multi-chaînes ?",
  overview: {
    summary:
      "Aave est un protocole de liquidité non dépositaire où les utilisateurs déposent des actifs pour toucher des intérêts et empruntent contre des positions surcollatéralisées. Les taux d'intérêt s'ajustent de façon algorithmique selon l'utilisation, et les positions insuffisamment garanties sont liquidées par des tiers. Aave émet aussi le GHO, un stablecoin décentralisé.",
    problem: [
      "Les détenteurs d'actifs crypto veulent de la liquidité sans vendre ; les prêteurs veulent du rendement sans contrepartie centralisée.",
      "Aave met la liquidité en commun et permet aux emprunteurs d'y puiser contre une garantie, avec des seuils de liquidation définis par actif.",
    ],
    valueProposition: [
      "La V3 a introduit le mode efficacité (eMode) pour les actifs corrélés, le mode isolation pour les actifs plus risqués et des portails entre chaînes.",
      "La taille et la profondeur de liquidité font d'Aave le marché monétaire de référence ; ses paramètres de risque sont supervisés par des prestataires spécialisés dans le risque.",
    ],
    positioning: ["Leader du prêt on-chain par les dépôts ; en concurrence avec le prêt modulaire (Morpho), Spark de Sky et Compound."],
    team: ["Fondé par Stani Kulechov sous le nom d'ETHLend (2017), renommé Aave en 2020. Gouverné par l'Aave DAO ; Aave Labs et des prestataires contribuent au développement et à la gestion des risques."],
  },
  technology: {
    blocks: [
      ["Des contrats de pool par marché ; les prêteurs reçoivent des aTokens porteurs d'intérêts ; les emprunteurs contractent une dette à taux variable."],
      [
        "Un long historique d'audits et un programme de bug bounty de longue date ; des paramètres de risque fixés par actif (LTV, seuil de liquidation, plafonds).",
        "Les principaux vecteurs de risque sont les défaillances d'oracles, l'illiquidité des garanties lors des krachs et les créances irrécouvrables.",
      ],
      ["Déployé sur Ethereum et de nombreux L2 et L1 alternatifs, sous forme de marchés distincts."],
      ["S'appuie sur les flux de prix de Chainlink pour la plupart des marchés, une dépendance externe importante."],
      ["Le GHO est un stablecoin émis par les emprunteurs d'Aave contre leur garantie."],
    ],
    limitations: [
      "La surcollatéralisation limite l'efficacité du capital ; le crédit insuffisamment garanti est hors du périmètre.",
      "Les déploiements multi-chaînes multiplient la surface opérationnelle et de gouvernance.",
    ],
  },
  tokenomics: {
    supplyModelNote: "16 millions d'AAVE au maximum : 13 millions émis pour les détenteurs de LEND lors d'une migration à 100 pour 1 en 2020, et 3 millions alloués à l'Ecosystem Reserve.",
    distribution: [{ label: "Migration de LEND (100 pour 1)" }, { label: "Ecosystem Reserve" }],
    distributionNote: "Offre lors de la migration du token en 2020.",
    utility: [
      "L'AAVE est le token de gouvernance de l'Aave DAO.",
      "L'AAVE peut être staké dans le filet de sécurité du protocole pour couvrir les épisodes de déficit, en échange de récompenses.",
    ],
    emissions: ["Pas d'inflation ; les récompenses de staking sont versées depuis l'Ecosystem Reserve."],
    vesting: ["Aucun vesting d'initiés en cours ; la migration a distribué l'offre aux détenteurs existants de LEND."],
    valueAccrual: [
      "En 2025, la gouvernance a approuvé un programme de rachat qui utilise les revenus du protocole pour racheter de l'AAVE sur le marché (« Aavenomics »).",
      "Les revenus viennent du reserve factor sur les intérêts, des frais de liquidation et des intérêts du GHO.",
    ],
  },
  adoption: {
    claims: [
      "Aave est le plus grand protocole de prêt par la TVL (voir les données live).",
      "L'usage suit la demande de levier sur les marchés crypto ; les dépôts de tokens de staking liquide et de stablecoins dominent.",
      "Les produits destinés aux institutions (marchés soumis à autorisation) élargissent le marché adressable.",
    ],
    metricsToWatch: ["Prêts actifs (montant emprunté)", "Revenus du protocole", "Épisodes de créances irrécouvrables", "Offre et parité du GHO"],
  },
  financials: {
    relevantMetrics: [
      { label: "Revenus (reserve factor)", why: "La part des intérêts conservée par la DAO." },
      { label: "Prêts actifs", why: "Le moteur des revenus ; la TVL seule surestime l'activité." },
      { label: "Rachats face aux émissions", why: "La valeur nette rendue aux détenteurs du token." },
    ],
    claims: [
      "Aave génère des revenus récurrents importants, ce qui en fait l'un des rares protocoles DeFi aux fondamentaux clairs.",
      "Les revenus sont cycliques et baissent quand la demande de levier et les taux d'emprunt diminuent.",
    ],
  },
  onchain: {
    claims: [
      "Les grosses positions et les seuils de liquidation sont transparents ; des positions de baleines concentrées peuvent créer des cascades de liquidations.",
      "Tous les marchés, taux et positions sont on-chain et consultables.",
    ],
    dataAvailability: "Des analyses par position et des liquidations sont prévues en phase 2.",
  },
  competitors: {
    columns: [
      {
        technology: "Marchés monétaires mutualisés, GHO",
        adoption: "Plus grande TVL de prêt",
        tokenomics: "Plafond de 16 M, rachats",
        economics: "Revenus récurrents importants",
        strengths: "Liquidité, marque, gestion des risques",
        weaknesses: "Complexité de la gouvernance",
        positioning: "Marché monétaire DeFi par défaut",
      },
      {
        technology: "Marchés isolés + coffres sélectionnés",
        adoption: "Croissance rapide",
        tokenomics: "Gouvernance MORPHO",
        economics: "Taux de prélèvement plus faible",
        strengths: "Efficacité du capital, modularité",
        weaknesses: "Risque lié aux curateurs",
        positioning: "Infrastructure de prêt modulaire",
      },
      {
        technology: "Marchés d'emprunt mono-actif (v3)",
        adoption: "Mature, plus petit",
        tokenomics: "Gouvernance COMP",
        economics: "Revenus plus faibles",
        strengths: "Simplicité, historique",
        weaknesses: "Parts de marché perdues",
        positioning: "Prêt prudent",
      },
    ],
  },
  risks: [
    ["Risques liés aux smart contracts et aux oracles sur de nombreux déploiements."],
    ["Des créances irrécouvrables dues à l'effondrement de garanties ou à la perte de parité d'actifs corrélés en eMode."],
    ["Le prêt est une activité réglementée dans la plupart des juridictions ; l'interface et les produits institutionnels y sont exposés."],
    ["Les relations entre la DAO, Aave Labs et les prestataires ont donné lieu à des désaccords publics ; la qualité de la gouvernance compte."],
    ["Token liquide sur les grandes plateformes."],
    ["Dépendance aux fournisseurs d'oracles et à quelques gestionnaires de risques."],
    ["Les protocoles de prêt modulaires gagnent des parts sur certains segments."],
  ],
  thesis: {
    bull: [
      "Le crédit on-chain croît avec les actifs tokenisés et les stablecoins ; Aave reste le pôle de liquidité et les rachats grandissent avec les revenus.",
      "Les marchés institutionnels apportent des dépôts nouveaux et plus fidèles.",
    ],
    neutral: ["Aave conserve son avance, mais ses revenus suivent le cycle crypto."],
    bear: ["Un épisode de créances irrécouvrables ou une défaillance d'oracle entame la confiance.", "Une compression des frais due aux concurrents modulaires."],
    catalysts: ["Déploiement d'Aave V4.", "Des rachats financés par les revenus, approuvés par la gouvernance."],
    assumptions: ["La demande d'emprunt garanti par des actifs crypto se maintient.", "La gestion des risques maintient les créances irrécouvrables sous contrôle."],
    monitor: ["Revenus et volume des rachats", "Créances irrécouvrables", "Parité du GHO", "Part de marché face à Morpho"],
    invalidation: ["Un épisode d'insolvabilité significatif du protocole", "Une perte durable du leadership sur les prêts actifs"],
  },
  framework: [
    { summary: "Protocole mature, très audité.", dataUsed: ["Historique des audits", "Documentation"], limitations: "Complexité multi-chaînes." },
    { summary: "Offre fixe, pas de surplomb d'initiés, rachats.", dataUsed: ["Documentation du token", "Gouvernance"], limitations: "Taille des rachats dépendante de la gouvernance." },
    { summary: "Plus grand protocole de prêt.", dataUsed: ["DefiLlama"], limitations: "TVL sensible aux prix." },
    { summary: "Revenus récurrents importants.", dataUsed: ["Revenus DefiLlama"], limitations: "Cyclique." },
    { summary: "DAO active ; conflits occasionnels.", dataUsed: ["Forum de gouvernance"], limitations: "Qualitatif." },
    { summary: "Leader incontesté, face à des challengers modulaires.", dataUsed: ["Part de marché"], limitations: "Marché qui évolue vite." },
    { summary: "Risques d'oracle, de créances irrécouvrables et réglementaires.", dataUsed: ["Revue des risques"], limitations: "Qualitatif." },
  ],
  sources: [
    { supports: "Mécanique du protocole et paramètres de risque." },
    { supports: "Fonctionnalités de la V3 (eMode, isolation, portails)." },
    { supports: "Offre, migration et staking.", limitations: "La structure de la documentation peut changer." },
    { supports: "Conception du GHO." },
    { supports: "Décisions de gouvernance, dont le programme de rachat." },
    { supports: "Données de marché live : prix, capitalisation, FDV, offre en circulation et offre totale.", limitations: "Agrégateur ; les chiffres d'offre dépendent des déclarations des émetteurs et de la méthodologie de CoinGecko." },
    { supports: "Chiffres de TVL, de frais et de revenus.", limitations: "Adaptateurs open source ; la méthodologie diffère selon les protocoles et peut être révisée." },
  ],
};
