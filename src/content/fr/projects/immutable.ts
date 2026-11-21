import type { ProjectText } from "@/lib/research/localized";

export const immutableFr: ProjectText = {
  oneLiner: "Une infrastructure blockchain dédiée au jeu vidéo : Immutable zkEVM, le wallet Passport et des outils pour développeurs.",
  tags: ["Jeu vidéo web3", "zkEVM", "Wallet joueur"],
  headline: "Immutable : quelle part du jeu vidéo web3 une seule pile d'infrastructure peut-elle capter ?",
  overview: {
    summary:
      "Immutable fournit l'infrastructure des jeux blockchain : la chaîne Immutable zkEVM, le système de wallet et d'identité Passport, un carnet d'ordres pour les objets de jeu et des SDK pour les studios. Elle a débuté avec Immutable X, une solution de montée en charge pour les NFT fondée sur StarkEx, et a recentré ses efforts sur le zkEVM compatible EVM.",
    problem: ["Les studios de jeux veulent la propriété numérique et des objets échangeables sans exposer les joueurs aux wallets, au gas et à la complexité de la crypto."],
    valueProposition: [
      "Passport offre aux joueurs un wallet non dépositaire avec une connexion familière, utilisé dans tous les jeux sur Immutable.",
      "Une offre complète (chaîne, wallet, carnet d'ordres, distribution) réduit le travail d'intégration des studios.",
    ],
    positioning: ["L'une des principales plateformes de jeu web3 ; en concurrence avec Ronin et avec les chaînes généralistes qui courtisent les studios."],
    team: ["Fondé à Sydney par James Ferguson et Robbie Ferguson ; Immutable édite aussi des jeux comme Gods Unchained."],
  },
  technology: {
    blocks: [
      ["Immutable zkEVM est une chaîne compatible EVM dédiée aux jeux."],
      ["Le parrainage du gas et des outils propres au jeu vidéo visent des transactions de jeu nombreuses et de faible valeur."],
      ["Le modèle de sécurité et la décentralisation du zkEVM sont à vérifier auprès de suivis indépendants ; le contrôle de l'opérateur reste important."],
      ["Les actifs peuvent passer d'Ethereum à Immutable et inversement via un bridge."],
      ["Immutable a abandonné Immutable X (sa solution d'origine de montée en charge des NFT fondée sur StarkEx) au profit d'Immutable Chain (zkEVM)."],
    ],
    limitations: [
      "L'adoption du jeu vidéo web3 a déçu les attentes à plusieurs reprises ; le succès dépend de jeux à succès plutôt que de l'infrastructure.",
      "Le contrôle de la plateforme par Immutable est important.",
    ],
  },
  tokenomics: {
    supplyModelNote: "Offre maximale fixe de 2 milliards d'IMX.",
    distribution: [{ label: "Développement de l'écosystème" }, { label: "Développement du projet" }, { label: "Vente privée" }, { label: "Vente publique" }, { label: "Réserve de la fondation" }],
    distributionNote: "Allocation publiée par l'émetteur du token IMX (Digital Worlds NFTs Ltd). Son tableau de déblocage inverse les libellés des deux ventes ; les parts ci-dessus suivent la section d'allocation, cohérente avec les conditions de vesting de chaque vente.",
    utility: ["L'IMX sert au gas sur Immutable zkEVM, au staking et à la gouvernance."],
    emissions: ["Pas d'inflation au-delà du plafond ; l'offre en circulation a augmenté via des déblocages programmés."],
    vesting: ["Tous les déblocages programmés sont terminés : les tranches des ventes avant avril 2024, le développement de l'écosystème et du projet le 31 octobre 2025."],
    valueAccrual: ["Une part des frais du protocole sert aux récompenses de staking ; le volume de frais est faible par rapport à la capitalisation."],
  },
  adoption: {
    claims: [
      "Immutable annonce un large portefeuille de jeux ; ceux qui conservent une base de joueurs durable sont bien moins nombreux.",
      "La TVL et les frais d'Immutable zkEVM sont suivis par DefiLlama (voir les données live).",
    ],
    metricsToWatch: ["Joueurs actifs quotidiens sur l'ensemble des jeux", "Inscriptions à Passport", "Volume de la place de marché", "Frais du zkEVM"],
  },
  financials: {
    relevantMetrics: [
      { label: "Activité des joueurs", why: "Le moteur de la demande de transactions et d'actifs." },
      { label: "Volume de la place de marché", why: "La base de frais du protocole." },
    ],
    claims: ["Les revenus de frais on-chain sont très faibles ; le modèle économique repose sur le succès futur des jeux."],
  },
  onchain: {
    claims: ["Les indicateurs du jeu on-chain sont faussés par les bots et les campagnes d'incitation."],
    dataAvailability: "Des analyses par jeu sont prévues en phase 2.",
  },
  competitors: {
    columns: [
      {
        technology: "zkEVM + Passport + carnet d'ordres",
        adoption: "Large portefeuille de jeux",
        tokenomics: "Plafond de 2 Md",
        economics: "Frais faibles",
        strengths: "Offre complète pour les studios",
        weaknesses: "Peu de jeux à succès",
        positioning: "Plateforme d'infrastructure pour le jeu vidéo",
      },
      {
        technology: "Chaîne EVM dédiée au jeu vidéo",
        adoption: "Héritage d'Axie Infinity",
        tokenomics: "RON",
        economics: "Frais portés par les jeux",
        strengths: "Communauté de joueurs",
        weaknesses: "Dépendance à quelques titres",
        positioning: "Chaîne de jeu vidéo",
      },
      {
        technology: "L1 à haut débit",
        adoption: "Écosystème de jeux en croissance",
        tokenomics: "SOL",
        economics: "Frais partagés",
        strengths: "Performance, liquidité",
        weaknesses: "Pas spécialisé dans le jeu vidéo",
        positioning: "L1 généraliste qui courtise les jeux",
      },
    ],
  },
  risks: [
    ["Les transitions de plateforme (d'Immutable X au zkEVM) ajoutent un risque de migration."],
    ["Revenus de frais minimes ; la valeur dépend de l'adoption du jeu vidéo."],
    ["Immutable a annoncé une Wells notice de la SEC fin octobre 2024 ; la SEC a clos son enquête en mars 2025 sans aucune poursuite."],
    ["Des décisions de plateforme contrôlées par l'entreprise."],
    ["Token de capitalisation moyenne sur les grandes plateformes d'échange."],
    ["Contrôle de l'infrastructure centrale par l'opérateur et l'entreprise."],
    ["De nombreuses chaînes se disputent un nombre limité de jeux à succès."],
  ],
  thesis: {
    bull: ["Un ou plusieurs jeux à succès sur Immutable amènent des millions de joueurs on-chain."],
    neutral: ["Immutable reste une plateforme de jeu de premier plan, mais le jeu on-chain reste une niche."],
    bear: ["Les studios abandonnent les fonctionnalités web3 ; les joueurs montrent peu d'intérêt pour la propriété on-chain."],
    catalysts: ["Lancements de jeux majeurs sur Immutable zkEVM."],
    assumptions: ["Les joueurs accordent de la valeur à une propriété numérique échangeable."],
    monitor: ["Joueurs actifs", "Lancements de jeux", "Volume de la place de marché"],
    invalidation: ["Aucun jeu ne conserve une base de joueurs significative pendant plusieurs trimestres"],
  },
  framework: [
    { summary: "De solides outils pour les développeurs ; décentralisation de la chaîne limitée.", dataUsed: ["Documentation"], limitations: "Peu d'évaluations indépendantes." },
    { summary: "Plafond fixe, déblocages terminés ; utilité pour le gas et le staking.", dataUsed: ["Documentation du token", "Tableau de déblocage de l'émetteur"], limitations: "Libellés des ventes inversés dans le tableau de déblocage de l'émetteur." },
    { summary: "Large portefeuille, usage modeste.", dataUsed: ["DefiLlama"], limitations: "Indicateurs gonflés par les bots." },
    { summary: "Revenus de frais minimes.", dataUsed: ["Frais DefiLlama"], limitations: "Revenus hors chaîne non attribuables." },
    { summary: "Pilotage par l'entreprise.", dataUsed: ["Documentation"], limitations: "Qualitatif." },
    { summary: "Parmi les leaders du jeu vidéo, dans un marché encombré.", dataUsed: ["Revue du marché"], limitations: "Qualitatif." },
    { summary: "Risques d'adoption et réglementaires.", dataUsed: ["Revue des risques"], limitations: "Qualitatif." },
  ],
  sources: [
    { supports: "Présentation de la plateforme." },
    { supports: "Chaîne zkEVM et bridge.", limitations: "La structure des URL de la documentation peut changer." },
    { supports: "Wallet des joueurs.", limitations: "La structure des URL de la documentation peut changer." },
    { supports: "Bridge entre Ethereum et Immutable." },
    { supports: "Migration d'Immutable X vers Immutable Chain." },
    { supports: "Utilité et offre de l'IMX." },
    { supports: "Allocation et calendrier de déblocage.", limitations: "Le tableau de déblocage inverse les libellés de la vente privée et de la vente publique." },
    { supports: "Annonce de la Wells notice (octobre 2024).", limitations: "Article de presse ; la déclaration d'Immutable a été publiée sur ses réseaux sociaux." },
    { supports: "Clôture de l'enquête de la SEC sans poursuite (mars 2025).", limitations: "Article de presse relayant l'annonce de l'entreprise." },
    { supports: "Données de marché live : prix, capitalisation, FDV, offre en circulation et offre totale.", limitations: "Agrégateur ; les chiffres d'offre dépendent des déclarations des émetteurs et de la méthodologie de CoinGecko." },
    { supports: "TVL, frais et offre de stablecoins au niveau de la chaîne.", limitations: "La TVL ne compte que les dépôts DeFi ; ce n'est pas une mesure de la valeur du réseau." },
  ],
};
