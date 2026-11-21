import type { ProjectText } from "@/lib/research/localized";

export const celestiaFr: ProjectText = {
  oneLiner: "Un réseau modulaire de disponibilité des données qui utilise l'échantillonnage de disponibilité.",
  tags: ["Disponibilité des données", "Modulaire", "DAS"],
  headline: "Celestia : la disponibilité des données peut-elle être une activité durable ?",
  overview: {
    summary:
      "Celestia est une blockchain spécialisée dans l'ordonnancement des transactions et la garantie de disponibilité des données, sans exécuter de smart contracts. Les rollups y publient leurs données (des « blobs »), et des nœuds légers vérifient la disponibilité par échantillonnage. C'est le premier réseau en production construit autour de la thèse modulaire.",
    problem: ["Le papier LazyLedger proposait une blockchain qui se contente d'ordonner les données et de garantir leur disponibilité, en laissant l'exécution à d'autres couches."],
    valueProposition: [
      "L'échantillonnage de disponibilité des données permet aux nœuds légers de vérifier que les données d'un bloc sont disponibles en échantillonnant de petits morceaux dotés d'un codage d'effacement.",
      "Des coûts de données inférieurs à une publication sur le L1 d'Ethereum, avec un modèle de sécurité indépendant des couches d'exécution.",
    ],
    positioning: ["En concurrence pour les données des rollups avec les blobs d'Ethereum, EigenDA et Avail."],
    team: ["Cofondé par Mustafa Al-Bassam (auteur du papier LazyLedger), Ismail Khoffi, John Adler et Nick White. La bêta du réseau principal a été lancée le 31 octobre 2023."],
  },
  technology: {
    blocks: [
      ["Construit avec le Cosmos SDK et CometBFT ; les données sont organisées en espaces de noms pour que chaque rollup ne télécharge que ses propres données."],
      ["Un codage d'effacement Reed-Solomon en deux dimensions, combiné à l'échantillonnage, permet à la taille des blocs de croître à mesure que davantage de nœuds légers échantillonnent."],
      ["Blobstream relaie les engagements de données de Celestia vers Ethereum et d'autres chaînes."],
      ["Les rollups qui utilisent Celestia depuis Ethereum s'appuient sur les validateurs de Celestia et sur Blobstream pour la garantie des données, un modèle de confiance différent de celui des blobs d'Ethereum."],
    ],
    limitations: [
      "Les frais de données payés à Celestia sont restés faibles ; la demande dépend du choix des rollups d'utiliser une disponibilité des données externe.",
      "La montée en charge de la disponibilité des données d'Ethereum lui-même (blobs, PeerDAS) est une concurrence directe.",
    ],
  },
  tokenomics: {
    supplyModelNote:
      "1 milliard de TIA à la genèse plus une inflation de staking. Le calendrier d'origine démarrait à 8 % et baissait de 10 % par an jusqu'à un plancher de 1,5 % ; la gouvernance a depuis réduit l'émission, vérifiez les paramètres actuels.",
    distribution: [
      { label: "R&D et écosystème" },
      { label: "Allocation publique" },
      { label: "Premiers investisseurs (séries A et B)" },
      { label: "Premiers contributeurs principaux" },
      { label: "Premiers investisseurs (seed)" },
    ],
    distributionNote: "Allocation de genèse de 1 milliard de TIA.",
    utility: ["Le TIA paie l'espace de blobs, est staké par les validateurs et les délégateurs, et sert à la gouvernance."],
    emissions: ["L'inflation de staking est versée aux validateurs et aux délégateurs."],
    vesting: ["Les allocations des initiés se sont en partie débloquées après un cliff d'un an (octobre 2024), puis de façon linéaire, l'essentiel du vesting s'achevant fin 2026."],
    valueAccrual: ["Les frais issus de la demande de blobs sont actuellement faibles par rapport à l'inflation de staking."],
  },
  adoption: {
    claims: [
      "Un certain nombre de rollups utilisent Celestia pour la disponibilité des données ; le volume de données publiées a augmenté, mais les revenus de frais restent faibles en raison de prix bas par octet.",
      "L'activité des blobs est visible sur l'explorateur Celenium.",
    ],
    metricsToWatch: ["Données publiées (Mo par jour)", "Frais issus des blobs", "Rollups utilisant Celestia", "Taux de staking"],
  },
  financials: {
    relevantMetrics: [
      { label: "Frais de blobs", why: "La demande directe de disponibilité des données." },
      { label: "Inflation face aux frais", why: "La soutenabilité de la sécurité." },
    ],
    claims: ["Les revenus sont minimes par rapport à la valorisation ; la pression sur les prix de la disponibilité des données exercée par les concurrents maintient les frais bas."],
  },
  onchain: {
    claims: ["Les espaces de noms, la taille des blobs et les frais par rollup sont publics."],
    dataAvailability: "Des analyses de l'usage de la disponibilité des données par rollup sont prévues en phase 2.",
  },
  competitors: {
    columns: [
      {
        technology: "DAS, données par espaces de noms",
        adoption: "Plusieurs rollups",
        tokenomics: "Inflationniste, déblocages des initiés en fin de course",
        economics: "Frais faibles",
        strengths: "Premier entrant, conception modulaire",
        weaknesses: "Revenus faibles",
        positioning: "Couche de disponibilité des données neutre",
      },
      {
        technology: "Service de disponibilité des données restaké",
        adoption: "Rollups d'Ethereum",
        tokenomics: "EIGEN",
        economics: "Stade précoce",
        strengths: "Sécurité alignée sur l'ETH",
        weaknesses: "Modèle de confiance différent",
        positioning: "Disponibilité des données alignée sur Ethereum",
      },
      {
        technology: "EIP-4844, PeerDAS",
        adoption: "La plupart des rollups",
        tokenomics: "ETH",
        economics: "Frais de blobs bas",
        strengths: "Sécurité native",
        weaknesses: "Limites de capacité",
        positioning: "Disponibilité des données par défaut des L2 d'Ethereum",
      },
    ],
  },
  risks: [
    ["Conception de DAS novatrice ; la participation des nœuds légers est nécessaire pour des garanties complètes."],
    ["Frais faibles et offre inflationniste ; la disponibilité des données pourrait se banaliser."],
    ["Exposition au niveau de l'infrastructure, risque réglementaire direct limité."],
    ["Influence de la Fondation sur l'émission et la feuille de route."],
    ["Token de capitalisation moyenne échangé sur les grandes plateformes."],
    ["Un ensemble de validateurs comparable à celui des autres chaînes Cosmos."],
    ["La montée en charge de la disponibilité des données d'Ethereum est un concurrent direct et bien doté."],
  ],
  thesis: {
    bull: ["La croissance des rollups et des appchains fait d'une disponibilité des données neutre et peu coûteuse un marché à fort volume, dominé par Celestia."],
    neutral: ["Celestia capte du volume de disponibilité des données, mais à bas prix, ce qui limite les revenus de frais."],
    bear: ["PeerDAS d'Ethereum et EigenDA absorbent l'essentiel de la demande des rollups."],
    catalysts: ["De grands rollups qui choisissent Celestia pour la disponibilité des données."],
    assumptions: ["Les rollups privilégient le coût de la disponibilité des données plutôt que la sécurité d'un règlement natif."],
    monitor: ["Données publiées et frais", "Changements d'émission", "Migrations de rollups"],
    invalidation: ["Un recul durable des données publiées sur Celestia"],
  },
  framework: [
    { summary: "Conception pionnière du DAS en production.", dataUsed: ["Documentation", "Papier de recherche"], limitations: "Hypothèses sur les nœuds légers." },
    { summary: "Inflationniste, avec de larges allocations aux initiés.", dataUsed: ["Documentation de la tokenomics"], limitations: "Paramètres d'émission modifiés par la gouvernance." },
    { summary: "Un usage croissant par les rollups.", dataUsed: ["Celenium"], limitations: "Usage face aux revenus." },
    { summary: "Des revenus de frais minimes.", dataUsed: ["Frais DefiLlama"], limitations: "Prix bas." },
    { summary: "Gouvernance on-chain, influence de la Fondation.", dataUsed: ["Documentation"], limitations: "Qualitatif." },
    { summary: "Forte concurrence de la disponibilité des données d'Ethereum.", dataUsed: ["Revue du marché"], limitations: "Qualitatif." },
    { summary: "Risques économiques et concurrentiels.", dataUsed: ["Revue des risques"], limitations: "Qualitatif." },
  ],
  sources: [
    { supports: "Conception fondatrice." },
    { supports: "Architecture et réseau." },
    { supports: "DAS et codage d'effacement.", limitations: "La structure des URL de la documentation peut changer." },
    { supports: "Relais des engagements de données.", limitations: "La structure des URL de la documentation peut changer." },
    { supports: "Allocation, inflation et déblocages.", limitations: "Vérifier les derniers changements d'émission." },
    { supports: "Données sur les blobs et les espaces de noms." },
    { supports: "Données de marché live : prix, capitalisation, FDV, offre en circulation et offre totale.", limitations: "Agrégateur ; les chiffres d'offre dépendent des déclarations des émetteurs et de la méthodologie de CoinGecko." },
    { supports: "TVL, frais et offre de stablecoins au niveau de la chaîne.", limitations: "La TVL ne compte que les dépôts DeFi ; ce n'est pas une mesure de la valeur du réseau." },
  ],
};
