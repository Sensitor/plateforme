import type { ProjectText } from "@/lib/research/localized";

export const ethenaFr: ProjectText = {
  oneLiner: "L'émetteur de l'USDe, un dollar synthétique adossé à une garantie crypto couverte.",
  tags: ["Dollar synthétique", "Delta-neutre", "Rendement"],
  headline: "Ethena : quelle est la résilience d'un dollar synthétique fondé sur une garantie couverte ?",
  overview: {
    summary:
      "Ethena émet l'USDe, un token libellé en dollars, adossé à des actifs crypto (comme le BTC, l'ETH et des tokens de staking liquide) couverts par des positions vendeuses sur futures perpétuels, ainsi qu'à des actifs stables. Les détenteurs qui stakent leur USDe reçoivent du sUSDe, qui perçoit le rendement du protocole issu des taux de funding et des récompenses de staking. L'ENA est le token de gouvernance.",
    problem: [
      "Les stablecoins adossés à des devises dépendent des banques et ne versent aucun rendement à leurs détenteurs ; les utilisateurs on-chain veulent un dollar porteur de rendement et capable de grandir.",
      "L'USDe vise la stabilité grâce à une couverture delta-neutre plutôt qu'à des dépôts bancaires.",
    ],
    valueProposition: [
      "Le sUSDe accumule le rendement généré par les paiements de funding sur les positions vendeuses de perpétuels et par les récompenses de staking sur la garantie.",
      "Il grandit avec l'open interest des dérivés plutôt qu'avec les dépôts bancaires.",
    ],
    positioning: ["Premier émetteur de dollars synthétiques ; en concurrence avec les stablecoins adossés à des devises pour l'usage comme garantie DeFi, et avec les produits de rendement pour les capitaux."],
    team: ["Fondé par Guy Young ; développé par Ethena Labs, avec une gouvernance assurée par l'Ethena Foundation et les détenteurs d'ENA."],
  },
  technology: {
    blocks: [
      ["La garantie est détenue chez des prestataires de règlement hors plateforme, tandis que les couvertures sont ouvertes sur des plateformes de dérivés centralisées."],
      [
        "Un fonds de réserve est conçu pour absorber les périodes de funding négatif.",
        "Les smart contracts sont relativement simples ; les principaux risques sont opérationnels : plateformes d'échange, dépositaires et exécution de la couverture.",
      ],
      ["La capacité d'émission est bornée par la liquidité et l'open interest des marchés de futures perpétuels."],
      ["L'USDtb, un stablecoin distinct adossé principalement à des fonds de bons du Trésor tokenisés, peut servir d'adossement quand les taux de funding sont peu attractifs."],
    ],
    limitations: [
      "Dépend de plateformes d'échange centralisées et de dépositaires : l'USDe n'est ni entièrement on-chain ni sans confiance.",
      "Le rendement chute fortement, voire devient négatif, quand les taux de funding se compriment.",
    ],
  },
  tokenomics: {
    supplyModelNote: "Offre maximale de 15 milliards d'ENA.",
    distribution: [{ label: "Contributeurs principaux" }, { label: "Développement de l'écosystème et airdrops" }, { label: "Investisseurs" }, { label: "Fondation" }],
    distributionNote:
      "Les parts des contributeurs principaux et de l'écosystème figurent dans le texte de la documentation d'Ethena ; celles des investisseurs et de la fondation sont lues sur le graphique de vesting de cette même documentation (3,75 et 2,25 milliards d'ENA une fois entièrement acquis) et concordent avec les publications des plateformes d'échange.",
    utility: ["L'ENA sert à la gouvernance ; le sENA (ENA staké) participe à la gouvernance et aux incitations de l'écosystème."],
    emissions: [
      "Pas d'inflation au-delà du plafond fixe ; l'offre en circulation augmente à mesure que les allocations se débloquent.",
      "Ethena a annoncé la fin des incitations et de l'inflation en tokens liées à l'USDe à partir de fin septembre 2026.",
    ],
    vesting: [
      "Contributeurs principaux et investisseurs : un cliff d'un an libérant 25 %, puis trois ans de vesting mensuel linéaire, à partir de l'émission du token en mars 2024.",
      "Le 27 août 2026, l'Ethena Foundation a racheté les tokens bloqués de certains investisseurs seed et annoncé une libération accélérée des tokens restants des investisseurs ; les contributeurs principaux conservent leur calendrier d'origine jusqu'en mars 2028.",
    ],
    valueAccrual: [
      "Les détenteurs d'ENA ont approuvé l'activation des frais par un vote Snapshot clos le 2 septembre 2026 : un prélèvement sur les revenus bruts du protocole augmente avec l'offre moyenne d'USDe sur 14 jours (5 % à 7,5 milliards, 10 % à 10 milliards, 15 % à 15 milliards, 20 % à 20 milliards), et 95 % des revenus nets versés à la Fondation financent des rachats d'ENA.",
      "En octobre 2026, l'offre d'USDe est restée sous le premier palier de 7,5 milliards : aucun rachat n'avait donc été exécuté.",
    ],
  },
  adoption: {
    claims: [
      "L'USDe est devenu l'un des plus grands tokens libellés en dollars dès sa première année (voir la TVL live).",
      "L'offre est procyclique : elle augmente quand les taux de funding sont élevés et se contracte quand ils baissent.",
      "Lors de la cascade de liquidations d'octobre 2025, l'USDe s'est échangé sous la parité avec le dollar sur certaines plateformes centralisées tandis que le remboursement primaire continuait de fonctionner ; l'offre s'est contractée ensuite.",
    ],
    metricsToWatch: ["Offre d'USDe", "Rendement du sUSDe face au taux des bons du Trésor", "Taille du fonds de réserve", "Concentration des plateformes et des dépositaires"],
  },
  financials: {
    relevantMetrics: [
      { label: "Revenus du protocole", why: "Le rendement de funding + staking généré sur les actifs d'adossement." },
      { label: "Couverture par le fonds de réserve", why: "Le coussin face au funding négatif." },
      { label: "Écart de rendement face aux bons du Trésor", why: "Le moteur de la demande de sUSDe." },
    ],
    claims: ["Les revenus sont importants dans les marchés haussiers et s'effondrent dans les marchés baissiers ; c'est en pratique un pari à effet de levier sur la demande de levier dans la crypto."],
  },
  onchain: {
    claims: ["L'offre d'USDe et les flux de sUSDe sont on-chain ; les positions de couverture sur les plateformes reposent sur des attestations plutôt que sur une vérification on-chain."],
    dataAvailability: "La composition de l'adossement et la répartition entre dépositaires proviennent du tableau de bord de transparence d'Ethena ; une intégration est prévue en phase 2.",
  },
  competitors: {
    columns: [
      {
        technology: "Couverture delta-neutre",
        adoption: "Premier dollar synthétique",
        tokenomics: "Gouvernance ENA, plafond de 15 Md",
        economics: "Dépend des taux de funding",
        strengths: "Rendement, capacité à grandir avec l'open interest",
        weaknesses: "Exposition aux plateformes centralisées et aux dépositaires",
        positioning: "Dollar crypto porteur de rendement",
      },
      {
        technology: "Réserves en devises",
        adoption: "Réglementé, largement intégré",
        tokenomics: "Pas de token",
        economics: "L'émetteur garde le rendement des réserves",
        strengths: "Clarté réglementaire",
        weaknesses: "Pas de rendement natif pour les détenteurs",
        positioning: "Stablecoin de paiement réglementé",
      },
      {
        technology: "Surcollatéralisé + actifs réels",
        adoption: "Large base DeFi",
        tokenomics: "Gouvernance SKY",
        economics: "Taux d'épargne",
        strengths: "Héritage décentralisé",
        weaknesses: "Gouvernance complexe",
        positioning: "Dollar d'épargne décentralisé",
      },
    ],
  },
  risks: [
    ["Risque de smart contract modeste ; complexité opérationnelle élevée."],
    ["Un funding négatif prolongé pourrait épuiser le fonds de réserve et mettre la parité sous pression."],
    ["Le statut des dollars synthétiques dans les régimes applicables aux stablecoins (MiCA, législation américaine) est restrictif ou flou ; l'accès varie selon les juridictions."],
    ["Décisions pilotées par la Fondation sur la composition de l'adossement et l'activation des frais."],
    ["Des rachats massifs exigent de dénouer les couvertures sur des marchés potentiellement illiquides."],
    ["Dépendance à une poignée de plateformes d'échange et de dépositaires."],
    ["Stablecoins adossés à des devises qui partagent leur rendement, et autres dollars synthétiques."],
  ],
  thesis: {
    bull: ["La demande de levier maintient un funding positif et l'USDe devient un dollar central de la DeFi ; l'offre franchit les paliers de l'activation des frais et les rachats commencent."],
    neutral: ["L'USDe reste un produit cyclique, qui grandit dans les marchés haussiers et rétrécit dans les marchés baissiers."],
    bear: ["Un régime prolongé de funding négatif ou la faillite d'une plateforme provoque une perte de parité et de confiance."],
    catalysts: ["L'offre d'USDe atteint le premier palier de l'activation des frais (7,5 milliards), ce qui déclenche les rachats d'ENA.", "Intégration dans les systèmes de garantie des plateformes d'échange centralisées."],
    assumptions: ["Le funding des futures perpétuels reste positif en moyenne sur un cycle.", "Les dépositaires et les plateformes d'échange fonctionnent sans défaillance."],
    monitor: ["Taux de funding", "Fonds de réserve", "Tendance de l'offre d'USDe", "Traitement réglementaire"],
    invalidation: ["Une perte de parité durable sur le remboursement primaire", "Un fonds de réserve épuisé pendant une période de funding négatif"],
  },
  framework: [
    { summary: "Contrats simples, opérations hors chaîne complexes.", dataUsed: ["Documentation"], limitations: "Processus hors chaîne pas entièrement vérifiables." },
    { summary: "Larges allocations aux initiés ; rachats approuvés mais conditionnés à l'offre d'USDe.", dataUsed: ["Documentation du token", "Votes de gouvernance"], limitations: "Parts des investisseurs et de la fondation lues sur le graphique de vesting." },
    { summary: "Croissance rapide, cyclique.", dataUsed: ["DefiLlama"], limitations: "Offre procyclique." },
    { summary: "Des revenus élevés mais volatils.", dataUsed: ["Frais DefiLlama"], limitations: "Dépend du régime de marché." },
    { summary: "Pilotage par la Fondation.", dataUsed: ["Documentation de gouvernance"], limitations: "Qualitatif." },
    { summary: "Leader d'une niche.", dataUsed: ["Revue du marché"], limitations: "Qualitatif." },
    { summary: "Risques de funding, de conservation et réglementaires.", dataUsed: ["Revue des risques"], limitations: "Qualitatif." },
  ],
  sources: [
    { supports: "Présentation du protocole." },
    { supports: "Conception delta-neutre." },
    { supports: "Sources du rendement du sUSDe." },
    { supports: "Dispositif de conservation et de plateformes d'échange." },
    { supports: "Rôle du fonds de réserve." },
    { supports: "Stablecoin adossé à des bons du Trésor." },
    { supports: "Offre, allocation et vesting de l'ENA." },
    { supports: "Approbation de l'activation des frais et de ses paliers." },
    { supports: "Conception de l'activation des frais, rachat des investisseurs seed, déblocages accélérés des investisseurs, fin des incitations liées à l'USDe." },
    { supports: "Statut de l'activation des frais : offre sous le premier palier." },
    { supports: "Données de marché live : prix, capitalisation, FDV, offre en circulation et offre totale.", limitations: "Agrégateur ; les chiffres d'offre dépendent des déclarations des émetteurs et de la méthodologie de CoinGecko." },
    { supports: "Chiffres de TVL, de frais et de revenus.", limitations: "Adaptateurs open source ; la méthodologie diffère selon les protocoles et peut être révisée." },
  ],
};
