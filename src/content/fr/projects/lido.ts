import type { ProjectText } from "@/lib/research/localized";

export const lidoFr: ProjectText = {
  oneLiner: "Le plus grand protocole de staking liquide d'Ethereum, émetteur du stETH.",
  tags: ["Staking liquide", "stETH", "Opérateurs de nœuds"],
  headline: "Lido : quelle concentration de la mise Ethereum peut-il tolérer ?",
  overview: {
    summary:
      "Lido permet aux utilisateurs de staker de l'ETH sans faire tourner de validateurs et de recevoir du stETH, un token dont le solde augmente avec les récompenses de staking et qui peut être utilisé dans toute la DeFi. Un ensemble d'opérateurs de nœuds professionnels sélectionnés par la DAO, complété par des modules ouverts à tous et fondés sur la DVT, fait tourner les validateurs. Le LDO gouverne le protocole.",
    problem: [
      "Le staking natif exige 32 ETH, une exploitation technique et immobilise le capital ; le staking liquide rend l'ETH staké utilisable.",
      "Le stETH représente l'ETH staké plus les récompenses et est remboursable via la file de retrait du protocole.",
    ],
    valueProposition: [
      "L'architecture du Staking Router prend en charge plusieurs modules : des opérateurs sélectionnés, le Community Staking Module ouvert à tous et Simple DVT.",
      "Effets de réseau : le stETH (et le wstETH) est le token de staking liquide le plus intégré comme garantie dans la DeFi.",
    ],
    positioning: ["Leader du staking liquide sur Ethereum ; en concurrence avec les plateformes d'échange (Coinbase, Binance), Rocket Pool et les protocoles de restaking liquide."],
    team: ["Lancé en décembre 2020 par un groupe de fondateurs et d'investisseurs ; gouverné par la Lido DAO et les détenteurs de LDO."],
  },
  technology: {
    blocks: [
      ["Les dépôts sont mis en commun et alloués à des validateurs gérés par des opérateurs de nœuds via le Staking Router ; des oracles rapportent les soldes des validateurs pour ajuster le solde du stETH."],
      ["Contrats matures et largement audités ; les risques clés sont les rapports des oracles, le slashing des opérateurs et les mises à jour décidées par la gouvernance."],
      ["La part importante d'ETH staké détenue via Lido a soulevé des inquiétudes de concentration du consensus d'Ethereum ; Lido les atténue avec de nombreux opérateurs indépendants et de nouveaux modules ouverts à tous."],
      ["Lido a conçu la « Dual Governance », qui donne aux détenteurs de stETH la capacité de retarder et de bloquer les décisions de la DAO ; consultez la documentation pour connaître son statut d'activation."],
    ],
    limitations: [
      "La file de retrait peut s'allonger en période de tension, et le stETH peut s'échanger avec une décote sur les marchés secondaires.",
      "Dépendant de l'économie du staking d'Ethereum ; les rendements baissent à mesure que davantage d'ETH est staké.",
    ],
  },
  tokenomics: {
    supplyModelNote: "1 milliard de LDO émis au lancement ; pas d'inflation.",
    distribution: [{ label: "Trésorerie de la DAO" }, { label: "Investisseurs" }, { label: "Premiers développeurs de Lido" }, { label: "Fondateurs et futurs employés" }, { label: "Validateurs et détenteurs de signatures" }],
    distributionNote: "Allocation initiale du LDO.",
    utility: [
      "Le LDO sert à voter sur les propositions de la DAO (frais, opérateurs de nœuds, trésorerie, mises à jour).",
      "Aucun droit direct sur les revenus du protocole ; les revenus vont à la trésorerie de la DAO.",
    ],
    emissions: ["Pas d'inflation ; offre fixe."],
    vesting: ["Les allocations des initiés étaient soumises à un blocage d'un an puis à un vesting linéaire d'un an, achevé en 2022."],
    valueAccrual: [
      "Le protocole prélève 10 % des récompenses de staking, répartis entre les opérateurs de nœuds et la trésorerie de la DAO.",
      "La captation de valeur pour le LDO dépend d'un choix de la gouvernance de distribuer les revenus de la trésorerie ou de racheter des tokens.",
    ],
  },
  adoption: {
    claims: [
      "Lido figure parmi les plus grands protocoles DeFi par la TVL (voir les données live).",
      "Sa part de l'ETH staké a reculé depuis son pic à mesure que les concurrents ont grandi, mais il reste le premier fournisseur.",
    ],
    metricsToWatch: ["Part de l'ETH staké", "Prix du stETH face à l'ETH sur le marché secondaire", "Nombre d'opérateurs de nœuds", "Revenus de la DAO"],
  },
  financials: {
    relevantMetrics: [
      { label: "Revenus du protocole", why: "La part des récompenses de staking revenant à la DAO." },
      { label: "Part de marché de l'ETH staké", why: "Le moteur des revenus, et une préoccupation de décentralisation." },
      { label: "Coûts de fonctionnement", why: "Les budgets des contributeurs financés par la trésorerie." },
    ],
    claims: [
      "Les revenus sont directement liés au rendement du staking de l'ETH et au prix de l'ETH ; Lido est un protocole de grande taille, rentable au niveau brut.",
      "D'éventuels changements de l'émission d'Ethereum affecteraient directement les revenus.",
    ],
  },
  onchain: {
    claims: ["Les dépôts, les retraits et la performance des opérateurs sont on-chain ; la concentration du stETH sur quelques plateformes DeFi mérite d'être surveillée."],
    dataAvailability: "Des indicateurs de part de marché du staking et de file d'attente sont prévus en phase 2.",
  },
  competitors: {
    columns: [
      {
        technology: "Staking Router, opérateurs sélectionnés + ouverts à tous",
        adoption: "Premier token de staking liquide (stETH)",
        tokenomics: "1 Md fixe, gouvernance uniquement",
        economics: "10 % des récompenses",
        strengths: "Intégration DeFi, taille",
        weaknesses: "Inquiétudes de concentration",
        positioning: "Staking liquide par défaut",
      },
      {
        technology: "Minipools ouverts à tous",
        adoption: "Niche axée sur la décentralisation",
        tokenomics: "Garantie en RPL",
        economics: "Base de frais plus petite",
        strengths: "Opérateurs sans autorisation",
        weaknesses: "Passage à l'échelle",
        positioning: "Alternative décentralisée",
      },
      {
        technology: "Restaking liquide (eETH)",
        adoption: "Croissance rapide grâce au restaking",
        tokenomics: "Gouvernance ETHFI",
        economics: "Portée par le restaking",
        strengths: "Rendement du restaking",
        weaknesses: "Couches de risque supplémentaires",
        positioning: "Leader du restaking liquide",
      },
    ],
  },
  risks: [
    ["Risques liés aux smart contracts, aux oracles et au slashing."],
    ["Les revenus dépendent des rendements du staking de l'ETH, qui baissent quand la participation au staking augmente."],
    ["Le traitement des tokens de staking liquide diffère selon les juridictions."],
    ["Les votes en LDO ont historiquement été concentrés entre les premiers détenteurs."],
    ["La liquidité secondaire du stETH peut se raréfier lors des épisodes de tension."],
    ["Une grande part de la mise d'Ethereum passant par un seul protocole est une préoccupation systémique."],
    ["Les plateformes d'échange et les protocoles de restaking liquide se disputent les dépôts."],
  ],
  thesis: {
    bull: [
      "Le staking liquide devient la façon par défaut de détenir de l'ETH et Lido conserve son leadership avec un ensemble d'opérateurs plus ouvert.",
      "La gouvernance dirige les revenus vers les détenteurs de LDO.",
    ],
    neutral: ["Lido reste le premier fournisseur de tokens de staking liquide, avec une part qui s'érode lentement ; le LDO n'a pas de captation de valeur directe."],
    bear: ["La gouvernance d'Ethereum ou la pression sociale plafonne la part de Lido, ou une émission réduite fait baisser les revenus."],
    catalysts: ["La conception de la Dual Governance pour protéger les détenteurs de stETH.", "Lido v3 et les staking vaults pour les institutions."],
    assumptions: ["La demande de staking d'ETH continue de croître.", "Pas d'incident majeur de slashing ou de contrat."],
    monitor: ["Part de marché de l'ETH staké", "Débats sur la politique d'émission d'Ethereum", "Parité du stETH", "Concentration de la gouvernance"],
    invalidation: ["Un slashing majeur ou une défaillance de contrat", "Un changement du protocole Ethereum qui pénalise les grands pools de staking"],
  },
  framework: [
    { summary: "Mature et audité ; dépendances aux oracles.", dataUsed: ["Documentation", "Audits"], limitations: "Mises à jour en cours." },
    { summary: "Offre fixe, token de gouvernance uniquement.", dataUsed: ["Allocation"], limitations: "La gouvernance pourrait ajouter une captation de valeur." },
    { summary: "Premier token de staking liquide, profondément intégré.", dataUsed: ["TVL DefiLlama"], limitations: "Sensible aux prix." },
    { summary: "Des revenus importants liés au rendement du staking.", dataUsed: ["Revenus DefiLlama"], limitations: "Dépend du rendement de l'ETH." },
    { summary: "La Dual Governance est une conception positive ; concentration du LDO.", dataUsed: ["Documentation"], limitations: "Détails d'activation à vérifier." },
    { summary: "Leader dont la part s'érode.", dataUsed: ["Part de marché"], limitations: "Dynamique concurrentielle." },
    { summary: "Risques de centralisation et de slashing.", dataUsed: ["Revue des risques"], limitations: "Qualitatif." },
  ],
  sources: [
    { supports: "Présentation du protocole." },
    { supports: "Mécanique du token." },
    { supports: "Architecture des modules." },
    { supports: "Mécanisme de veto des détenteurs de stETH.", limitations: "Vérifier le statut d'activation actuel." },
    { supports: "Allocation et vesting." },
    { supports: "Frais de 10 % sur les récompenses de staking." },
    { supports: "Données de marché live : prix, capitalisation, FDV, offre en circulation et offre totale.", limitations: "Agrégateur ; les chiffres d'offre dépendent des déclarations des émetteurs et de la méthodologie de CoinGecko." },
    { supports: "Chiffres de TVL, de frais et de revenus.", limitations: "Adaptateurs open source ; la méthodologie diffère selon les protocoles et peut être révisée." },
  ],
};
