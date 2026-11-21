import type { ProjectText } from "@/lib/research/localized";

export const uniswapFr: ProjectText = {
  oneLiner: "Le plus grand protocole d'échange décentralisé, fondé sur des teneurs de marché automatisés (AMM).",
  tags: ["DEX", "AMM", "Hooks (v4)"],
  headline: "Uniswap : comment les frais parviennent-ils aux détenteurs d'UNI après UNIfication ?",
  overview: {
    summary:
      "Uniswap est un ensemble de smart contracts d'AMM immuables qui permettent à n'importe qui d'échanger des tokens ou de fournir de la liquidité sans intermédiaire. Les versions successives ont introduit les pools à produit constant (v2), la liquidité concentrée (v3) et des « hooks » personnalisables dans un contrat unique (v4). Uniswap Labs exploite aussi des interfaces, un système de routage fondé sur les intentions (UniswapX) et Unichain, un L2 construit sur l'OP Stack.",
    problem: [
      "Les plateformes à carnet d'ordres exigent des teneurs de marché et la conservation des fonds ; les AMM permettent d'échanger n'importe quel token contre un pool dès le premier jour.",
      "Uniswap v1 a introduit un teneur de marché à produit constant sur Ethereum en novembre 2018.",
    ],
    valueProposition: [
      "La liquidité concentrée de la v3 permet aux fournisseurs de liquidité d'allouer leur capital dans des fourchettes de prix, pour une meilleure efficacité du capital.",
      "La v4 introduit les hooks, des extensions qui personnalisent le comportement des pools, et une architecture à contrat unique qui réduit les coûts de gas.",
    ],
    positioning: ["Leader des DEX sur Ethereum et de nombreux L2 ; en concurrence avec d'autres AMM et, de plus en plus, avec les agrégateurs de flux d'ordres et les systèmes d'intentions."],
    team: ["Créé par Hayden Adams ; développé par Uniswap Labs. Le protocole est gouverné par les détenteurs d'UNI via la gouvernance d'Uniswap, avec le soutien de l'Uniswap Foundation."],
  },
  technology: {
    blocks: [
      ["Des contrats centraux non modifiables pour chaque version ; la v4 utilise un seul contrat PoolManager avec une comptabilité « flash »."],
      ["Les contrats centraux ont un solide historique ; les hooks de la v4 transfèrent le risque aux développeurs de hooks, si bien que la vérification au niveau de chaque pool compte."],
      ["Déployé sur Ethereum et de nombreux L2 et L1 alternatifs ; Unichain est un rollup OP Stack opéré par Uniswap Labs."],
      ["UniswapX achemine les ordres via des exécutants hors chaîne qui rivalisent pour exécuter les échanges (trading fondé sur les intentions)."],
    ],
    limitations: [
      "Les fournisseurs de liquidité subissent la perte impermanente et l'extraction de MEV (LVR) ; fournir de la liquidité passivement est souvent non rentable sur les paires volatiles.",
      "La couche d'interface et de routage est opérée par une entreprise, ce qui crée une dépendance à l'interface.",
    ],
  },
  tokenomics: {
    supplyModelNote:
      "1 milliard d'UNI émis à la genèse (septembre 2020), avec une inflation perpétuelle pouvant aller jusqu'à 2 % par an, activable par la gouvernance après la période initiale de quatre ans.",
    distribution: [{ label: "Communauté (airdrop, minage de liquidité, trésorerie)" }, { label: "Équipe et futurs employés" }, { label: "Investisseurs" }, { label: "Conseillers" }],
    distributionNote: "Allocation de genèse (septembre 2020). Le vesting des initiés s'est terminé en 2024.",
    utility: ["L'UNI sert à voter dans la gouvernance du protocole, notamment sur le réglage des frais et l'usage de la trésorerie."],
    emissions: ["Un mécanisme d'inflation annuelle de 2 % existe dans le contrat du token, à la discrétion de la gouvernance."],
    vesting: ["Les allocations de l'équipe, des investisseurs et des conseillers ont été acquises sur quatre ans, jusqu'en septembre 2024."],
    valueAccrual: [
      "En novembre 2025, Uniswap Labs et l'Uniswap Foundation ont proposé « UNIfication » : activer les frais de protocole et les utiliser pour brûler des UNI, et diriger les frais du séquenceur d'Unichain vers le même burn.",
      "Vérifiez le résultat on-chain et les paramètres de frais actuels sur le portail de gouvernance ; la captation de valeur dépend des niveaux de frais fixés par la gouvernance.",
    ],
  },
  adoption: {
    claims: [
      "Uniswap est le plus grand protocole DEX par le volume cumulé et la TVL (voir les données live).",
      "Le volume est élevé mais sensible à l'activité du marché ; la concurrence des agrégateurs et des solveurs pour le flux d'ordres est intense.",
    ],
    metricsToWatch: ["Volume et revenus de frais", "Revenus issus de l'activation des frais de protocole", "Adoption des hooks de la v4", "Activité d'Unichain"],
  },
  financials: {
    relevantMetrics: [
      { label: "Frais versés aux fournisseurs de liquidité", why: "Mesure l'activité économique de l'AMM." },
      { label: "Revenus du protocole", why: "La part conservée pour les détenteurs d'UNI (si les frais de protocole sont actifs)." },
      { label: "Volume / TVL", why: "L'efficacité du capital de la liquidité." },
    ],
    claims: [
      "Historiquement, presque tous les frais allaient aux fournisseurs de liquidité, si bien que l'UNI ne captait aucun flux de trésorerie ; l'activation des frais de protocole est le principal changement fondamental à surveiller.",
      "Les frais d'interface encaissés par Uniswap Labs sont distincts des revenus du protocole.",
    ],
  },
  onchain: {
    claims: ["Les données par pool sont entièrement publiques ; le volume peut inclure du wash trading sur les tokens de la longue traîne."],
    dataAvailability: "Des analyses par pool et par niveau de frais sont prévues en phase 2.",
  },
  competitors: {
    columns: [
      {
        technology: "AMM v2-v4, hooks, UniswapX",
        adoption: "Plus grand DEX",
        tokenomics: "Gouvernance, proposition d'activation des frais",
        economics: "Importants frais versés aux fournisseurs de liquidité",
        strengths: "Liquidité, marque, multi-chaînes",
        weaknesses: "Absence historique de captation de valeur",
        positioning: "Protocole DEX de référence",
      },
      {
        technology: "AMM (type v3)",
        adoption: "Fort sur BNB Chain",
        tokenomics: "Burns de CAKE",
        economics: "Volume élevé sur BNB Chain",
        strengths: "Distribution auprès des particuliers",
        weaknesses: "Concentration sur une chaîne",
        positioning: "DEX multi-chaînes grand public",
      },
      {
        technology: "AMM StableSwap",
        adoption: "Liquidité en stablecoins",
        tokenomics: "Verrouillage en veCRV",
        economics: "Frais versés aux veCRV",
        strengths: "Paires stables",
        weaknesses: "Tokenomics complexe",
        positioning: "Plateforme d'échange de stablecoins",
      },
    ],
  },
  risks: [
    ["Cœur immuable ; les hooks introduisent de nouveaux risques au niveau des pools."],
    ["La concurrence sur les frais et la rentabilité des fournisseurs de liquidité limitent le pouvoir de fixation des prix."],
    ["Uniswap Labs a reçu une Wells notice de la SEC en avril 2024 ; l'entreprise a déclaré en février 2025 que la SEC avait clos son enquête."],
    ["Le vote délégué est concentré ; Uniswap Labs et la Fondation ont une forte influence."],
    ["Token liquide de grande capitalisation."],
    ["Interface et routage opérés par une seule entreprise."],
    ["Les agrégateurs, les solveurs et les DEX natifs des chaînes se disputent le flux d'ordres."],
  ],
  thesis: {
    bull: ["Les frais de protocole font de l'UNI un actif à flux de trésorerie adossé au plus grand DEX.", "Les hooks de la v4 et Unichain créent de nouvelles sources de revenus."],
    neutral: ["Uniswap reste le premier DEX ; la captation de frais est modeste par rapport à la valorisation."],
    bear: [
      "Le flux d'ordres migre vers les solveurs et des plateformes privées ; les frais des fournisseurs de liquidité se compriment.",
      "Les frais de protocole réduisent le rendement des fournisseurs de liquidité, ce qui pousse la liquidité vers les concurrents.",
    ],
    catalysts: ["Proposition UNIfication pour activer les frais de protocole et les burns d'UNI.", "Croissance d'Unichain."],
    assumptions: ["Les fournisseurs de liquidité restent disposés à fournir de la liquidité après l'activation des frais de protocole.", "La part des DEX dans le volume au comptant continue de croître."],
    monitor: ["Revenus des frais de protocole et burns", "Liquidité après les changements de frais", "Part de marché des DEX", "Évolutions réglementaires"],
    invalidation: ["Une perte significative de liquidité après l'activation des frais", "Une perte durable du leadership en volume parmi les DEX"],
  },
  framework: [
    { summary: "Contrats immuables et éprouvés.", dataUsed: ["Livres blancs", "Historique"], limitations: "Les hooks sont récents." },
    { summary: "Initiés entièrement acquis ; l'activation des frais changerait la captation de valeur.", dataUsed: ["Allocation", "Propositions de gouvernance"], limitations: "Résultat des paramètres de frais à vérifier." },
    { summary: "Plus grand DEX par le volume.", dataUsed: ["DefiLlama"], limitations: "Volume cyclique." },
    { summary: "Des frais importants, des revenus de protocole historiquement limités.", dataUsed: ["Frais et revenus DefiLlama"], limitations: "Les revenus dépendent de la gouvernance." },
    { summary: "Gouvernance déléguée avec une forte influence de l'entreprise.", dataUsed: ["Portail de gouvernance"], limitations: "Qualitatif." },
    { summary: "Leader sous pression concurrentielle.", dataUsed: ["Part de marché"], limitations: "La dynamique du flux d'ordres change vite." },
    { summary: "Risque technique faible ; risques de concurrence et de gouvernance.", dataUsed: ["Revue des risques"], limitations: "Qualitatif." },
  ],
  sources: [
    { supports: "Historique et concepts du protocole." },
    { supports: "Liquidité concentrée." },
    { supports: "Hooks et architecture à contrat unique." },
    { supports: "Routage fondé sur les intentions." },
    { supports: "L2 Unichain." },
    { supports: "Allocation, vesting et inflation du token." },
    { supports: "Processus de gouvernance." },
    { supports: "Proposition conjointe d'activer les frais de protocole, de brûler des UNI et de diriger les frais du séquenceur d'Unichain vers les burns.", limitations: "Texte de la proposition ; consultez la gouvernance pour le résultat du vote et les paramètres en vigueur." },
    { supports: "Données de marché live : prix, capitalisation, FDV, offre en circulation et offre totale.", limitations: "Agrégateur ; les chiffres d'offre dépendent des déclarations des émetteurs et de la méthodologie de CoinGecko." },
    { supports: "Chiffres de TVL, de frais et de revenus.", limitations: "Adaptateurs open source ; la méthodologie diffère selon les protocoles et peut être révisée." },
  ],
};
