import type { ProjectText } from "@/lib/research/localized";

export const bitcoinFr: ProjectText = {
  oneLiner: "La première monnaie numérique décentralisée : un réseau de règlement en preuve de travail, à offre fixe.",
  tags: ["Réserve de valeur", "Proof of Work", "Offre fixe"],
  headline: "Bitcoin : comment un réseau à offre fixe finance-t-il sa sécurité ?",
  overview: {
    summary:
      "Bitcoin est un système de monnaie électronique pair à pair sécurisé par la preuve de travail. Sa politique monétaire, une offre plafonnée de façon asymptotique à 21 millions de pièces, est appliquée par chaque nœud. Avec le temps, son usage dominant s'est déplacé vers celui d'une réserve de valeur et d'un actif de règlement neutres et résistants à la censure.",
    problem: [
      "Le livre blanc décrit un moyen d'effectuer des paiements en ligne sans intermédiaire financier de confiance, en résolvant le problème de la double dépense grâce à un serveur d'horodatage pair à pair fondé sur la preuve de travail.",
      "L'offre de monnaie fiduciaire est fixée par une politique discrétionnaire ; Bitcoin propose une alternative fondée sur des règles, dont l'émission ne peut être modifiée par aucun acteur isolé.",
    ],
    valueProposition: [
      "L'émission totale est limitée par les règles de consensus : la récompense de bloc est divisée par deux tous les 210 000 blocs et converge vers un peu moins de 21 millions de BTC.",
      "La principale différence de Bitcoin est sa neutralité crédible : pas d'entreprise, pas de fondation, pas de pré-minage, et le plus long historique de fonctionnement de toutes les blockchains.",
    ],
    positioning: [
      "Positionné comme de « l'or numérique », un actif macro, plutôt que comme une plateforme d'applications ; sa programmabilité est volontairement limitée.",
      "Il rivalise pour les capitaux avec l'or et d'autres actifs monétaires davantage qu'avec les plateformes de smart contracts.",
    ],
    team: [
      "Créé par le pseudonyme Satoshi Nakamoto, qui a publié le livre blanc en octobre 2008 et miné le bloc genesis le 3 janvier 2009.",
      "Aucune entreprise ni fondation n'est aux commandes. L'implémentation de référence, Bitcoin Core, est maintenue par des contributeurs open source ; les changements de protocole sont proposés via des BIP et exigent une large adoption par les nœuds.",
    ],
  },
  technology: {
    blocks: [
      ["Modèle UTXO (sorties de transaction non dépensées) avec un langage de script volontairement limité, non Turing-complet."],
      ["Consensus de Nakamoto : preuve de travail SHA-256, intervalle cible d'environ 10 minutes entre deux blocs, difficulté recalculée tous les 2 016 blocs."],
      [
        "Le débit de la couche de base est volontairement faible pour que les nœuds complets restent peu coûteux à faire tourner ; la montée en charge passe par des couches comme le Lightning Network.",
        "Le Lightning Network propose des canaux de paiement hors chaîne réglés sur Bitcoin.",
      ],
      ["La plus ancienne chaîne en PoW ; l'attaquer exige d'acquérir la majorité de la puissance de calcul, ce qui coûte cher compte tenu du matériel spécialisé et de l'énergie."],
      ["Les nœuds complets sont peu coûteux, mais la production de blocs est concentrée entre une poignée de pools de minage ; ce sont les opérateurs de pools (et non les mineurs individuels) qui choisissent le contenu des blocs."],
      ["Le soft fork Taproot (activé en novembre 2021) a introduit les signatures de Schnorr et des scripts plus privés et plus efficaces."],
    ],
    limitations: [
      "Une expressivité limitée restreint les applications natives (DeFi, tokens) par rapport aux plateformes de smart contracts.",
      "Les changements de protocole sont lents et disputés par construction ; c'est à la fois une garantie de sécurité et une limite à l'adaptation.",
    ],
  },
  tokenomics: {
    supplyModelNote:
      "Les nouveaux BTC ne sont créés que sous forme de récompense de bloc versée aux mineurs. Cette récompense a commencé à 50 BTC par bloc et est divisée par deux tous les 210 000 blocs (environ 4 ans) ; le quatrième halving (avril 2024) l'a ramenée à 3,125 BTC.",
    distributionNote:
      "Pas de pré-minage, d'ICO ni d'allocation aux initiés : chaque bitcoin en circulation a été émis par le minage. Les premières pièces minées par Satoshi Nakamoto (environ 1 million de BTC selon les estimations) n'ont jamais bougé.",
    issuanceNote: "Les halvings passés utilisent leurs dates réelles ; les halvings futurs sont projetés sur un temps de bloc moyen de 10 minutes. Les pièces perdues ne sont pas déduites.",
    utility: [
      "Actif natif du réseau, utilisé pour payer les frais de transaction et comme unité de compte du protocole.",
      "Son usage principal aujourd'hui est celui de réserve de valeur, de garantie et d'actif de réserve ; les paiements sont un usage secondaire.",
    ],
    emissions: ["Environ 450 BTC sont émis par jour depuis le halving d'avril 2024 (3,125 BTC × environ 144 blocs)."],
    vesting: ["Il n'existe aucun calendrier de vesting ni de déblocage."],
    valueAccrual: [
      "Aucun flux de trésorerie : la valeur dépend de la demande pour un actif monétaire rare et neutre.",
      "À mesure que la récompense de bloc diminue, les frais de transaction devront à terme financer l'essentiel du budget de sécurité ; savoir si la demande de frais suffira reste une question ouverte.",
    ],
  },
  adoption: {
    claims: [
      "Les ETP bitcoin au comptant ont été approuvés par la SEC américaine en janvier 2024, ouvrant un canal d'accès réglementé aux investisseurs institutionnels et particuliers.",
      "Les avoirs de trésorerie d'entreprises et d'États ont augmenté depuis 2020, faisant du BTC un actif macro reconnu, et ajoutant une nouvelle concentration des avoirs chez les dépositaires et les ETF.",
      "L'activité native on-chain est modeste par rapport aux chaînes de smart contracts ; l'adoption de Bitcoin se mesure mieux par le nombre de détenteurs, les flux de conservation et la liquidité.",
    ],
    metricsToWatch: ["Puissance de calcul et revenus des mineurs", "Part des frais dans les revenus des mineurs", "Flux nets des ETF", "Offre détenue par les détenteurs de long terme"],
  },
  financials: {
    relevantMetrics: [
      { label: "Budget de sécurité", why: "Récompense de bloc + frais versés aux mineurs, ce qu'un attaquant doit surpasser." },
      { label: "Part des frais dans les revenus des mineurs", why: "La soutenabilité à long terme une fois les récompenses de bloc réduites." },
      { label: "Puissance de calcul", why: "Un indicateur indirect du coût d'une attaque contre le réseau." },
    ],
    claims: [
      "Bitcoin n'est pas une entreprise et n'a pas de revenus au sens comptable ; les frais mesurent la demande d'espace de bloc, pas un bénéfice.",
      "Les revenus de frais sont volatils et s'envolent avec l'activité spéculative (par exemple les inscriptions), tandis que la récompense de bloc est divisée par deux tous les quatre ans.",
    ],
  },
  onchain: {
    claims: [
      "Toutes les transactions et tous les soldes sont publics ; la puissance de calcul et les frais peuvent être suivis avec des outils ouverts.",
      "Une grande partie de l'offre est détenue par des détenteurs de long terme et des dépositaires ; les soldes des plateformes d'échange et les avoirs des ETF sont surveillés comme indicateurs de l'offre disponible.",
    ],
    dataAvailability: "Les indicateurs on-chain par cohorte (détenteurs de long terme, prix réalisé) exigent des fournisseurs spécialisés et sont prévus pour la phase 2.",
  },
  competitors: {
    columns: [
      {
        technology: "PoW, UTXO, script minimal",
        adoption: "Premier actif crypto, ETF au comptant",
        tokenomics: "Plafond de 21 M, halvings",
        economics: "Frais + récompense de bloc versés aux mineurs",
        strengths: "Neutralité, historique, liquidité",
        weaknesses: "Programmabilité limitée, question du budget de sécurité",
        positioning: "Réserve de valeur numérique",
      },
      {
        technology: "Matière première physique",
        adoption: "Banques centrales, joaillerie, ETF",
        tokenomics: "Croissance annuelle de l'offre minière d'environ 1-2 %",
        economics: "Aucun rendement",
        strengths: "Des millénaires d'histoire monétaire",
        weaknesses: "Difficile à transporter et à vérifier",
        positioning: "Réserve de valeur traditionnelle",
      },
      {
        technology: "PoS, smart contracts",
        adoption: "Pôle de la DeFi et des stablecoins",
        tokenomics: "Pas de plafond ; émission face au burn",
        economics: "Frais, en partie brûlés",
        strengths: "Programmabilité",
        weaknesses: "Politique monétaire plus complexe et évolutive",
        positioning: "Actif de règlement programmable",
      },
    ],
    note: "L'or est inclus comme l'actif monétaire de référence auquel Bitcoin est le plus souvent comparé.",
  },
  risks: [
    ["À long terme : les progrès de l'informatique quantique pourraient menacer les schémas de signature actuels ; les parades exigeraient un soft fork coordonné."],
    ["La baisse de la récompense de bloc pourrait réduire la sécurité si la demande de frais n'augmente pas."],
    ["Généralement traité comme une matière première dans les grandes juridictions, mais les règles sur le minage, la conservation et l'auto-conservation varient et peuvent changer."],
    ["Une gouvernance par consensus approximatif rend les changements lents ; les mises à jour disputées risquent de scinder la chaîne (comme en 2017)."],
    ["La liquidité la plus profonde de tous les actifs crypto, au comptant, en futures, en options et via les ETF."],
    ["Concentration des pools de minage, concentration de la fabrication du matériel et avoirs croissants chez les dépositaires (ETF, plateformes d'échange)."],
    ["Aucun actif crypto n'a délogé Bitcoin de sa position de réserve de valeur ; la concurrence vient surtout des actifs traditionnels."],
  ],
  thesis: {
    bull: [
      "La poursuite de l'adoption institutionnelle fait du BTC un actif de réserve standard aux côtés de l'or.",
      "Les inquiétudes sur la dépréciation monétaire augmentent la demande pour un actif à offre fixe, fondé sur des règles.",
    ],
    neutral: ["Le BTC reste un actif macro très volatil dont le prix suit les cycles de liquidité mondiale, sans changement structurel de son rôle."],
    bear: [
      "Les revenus de frais ne parviennent pas à remplacer la récompense de bloc, ce qui soulève des inquiétudes de sécurité dans les années 2030.",
      "Des restrictions réglementaires sur l'auto-conservation ou le minage réduisent son avantage de neutralité.",
    ],
    catalysts: ["Le prochain halving est projeté vers 2028 (bloc 1 050 000).", "L'adoption du BTC par d'autres trésoreries publiques ou entités souveraines."],
    assumptions: ["La demande pour un actif monétaire neutre et non souverain se maintient.", "Pas de rupture cryptographique critique sans voie de mise à jour dans les temps."],
    monitor: ["Tendance de la puissance de calcul", "Part des frais dans les revenus des mineurs", "Flux des ETF et concentration des dépositaires", "Recherche sur la résistance quantique"],
    invalidation: ["Effondrement durable de la puissance de calcul ou attaque à 51 % réussie", "Une rupture crédible de la cryptographie de Bitcoin sans voie de migration"],
  },
  framework: [
    { summary: "Le modèle de sécurité le plus simple et le plus ancien de la crypto.", dataUsed: ["Historique du protocole", "Historique des incidents"], limitations: "La faible programmabilité est un choix de conception, non noté ici comme un défaut." },
    { summary: "Émission fixe et transparente ; ni initiés ni déblocages.", dataUsed: ["Règles de consensus"], limitations: "Le budget de sécurité à long terme." },
    { summary: "L'actif crypto le plus largement détenu, avec des ETF réglementés.", dataUsed: ["Approbations d'ETF", "Données de marché"], limitations: "Le nombre de détenteurs est une estimation." },
    { summary: "Les frais restent une faible part des revenus des mineurs.", dataUsed: ["Frais DefiLlama", "Données de la mempool"], limitations: "Ce n'est pas une entreprise ; l'indicateur est indirect." },
    { summary: "Neutralité crédible, processus de changement prudent.", dataUsed: ["Processus des BIP"], limitations: "Influence informelle des développeurs et des grands mineurs." },
    { summary: "Position incontestée de réserve de valeur de la crypto.", dataUsed: ["Dominance de marché"], limitations: "En concurrence avec les actifs traditionnels." },
    { summary: "Les principaux risques sont de long terme (budget de sécurité, quantique).", dataUsed: ["Revue des risques"], limitations: "Qualitatif." },
  ],
  sources: [
    { supports: "Conception, consensus et incitations." },
    { supports: "Structure de la blockchain, difficulté, transactions." },
    { supports: "Calendrier des récompenses de bloc et plafond de l'offre.", limitations: "Wiki communautaire ; cohérent avec les règles de consensus." },
    { supports: "Implémentation de référence." },
    { supports: "Processus de changement." },
    { supports: "Spécification de la mise à jour Taproot." },
    { supports: "Conception de la montée en charge par canaux de paiement." },
    { supports: "Approbation des ETP bitcoin au comptant." },
    { supports: "Données de puissance de calcul, de difficulté et de frais." },
    { supports: "Données de marché live : prix, capitalisation, FDV, offre en circulation et offre totale.", limitations: "Agrégateur ; les chiffres d'offre dépendent des déclarations des émetteurs et de la méthodologie de CoinGecko." },
    { supports: "TVL, frais et offre de stablecoins au niveau de la chaîne.", limitations: "La TVL ne compte que les dépôts DeFi ; ce n'est pas une mesure de la valeur du réseau." },
  ],
};
