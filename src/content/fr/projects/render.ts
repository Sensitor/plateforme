import type { ProjectText } from "@/lib/research/localized";

export const renderFr: ProjectText = {
  oneLiner: "Un réseau de GPU décentralisé pour le rendu 3D et le calcul d'IA, avec règlement sur Solana.",
  tags: ["Calcul GPU", "Rendu", "Burn-and-mint"],
  headline: "Render : un même réseau de GPU peut-il servir à la fois le rendu et le calcul d'IA ?",
  overview: {
    summary:
      "Render Network met en relation des créateurs qui ont besoin de rendu GPU avec des opérateurs de nœuds qui disposent de GPU inactifs. Construit à l'origine par OTOY autour de son logiciel OctaneRender, le réseau a migré son token sur Solana et adopté un modèle d'équilibre burn-and-mint ; il s'étend du rendu vers les charges de calcul d'IA.",
    problem: ["La capacité GPU haut de gamme est chère et concentrée chez quelques fournisseurs de cloud ; beaucoup de GPU restent inactifs."],
    valueProposition: [
      "Les utilisateurs paient des tâches de rendu ; dans le modèle burn-and-mint, des tokens équivalents à la valeur de la tâche sont brûlés tandis que les opérateurs de nœuds reçoivent des émissions nouvellement créées.",
      "L'intégration avec OctaneRender apporte une base d'utilisateurs native dans la 3D et le motion design.",
    ],
    positioning: ["L'un des réseaux de calcul DePIN les plus établis ; en concurrence avec d'autres places de marché de GPU décentralisées et avec les clouds centralisés."],
    team: ["Créé par OTOY (fondateur : Jules Urbach) ; gouvernance par la Render Network Foundation via les Render Network Proposals (RNP)."],
  },
  technology: {
    blocks: [
      ["Une orchestration des tâches hors chaîne, associée aux opérateurs de nœuds GPU ; paiements en tokens et émissions réglés sur Solana."],
      ["La capacité croît avec le nombre d'opérateurs de nœuds qui rejoignent le réseau."],
      ["Le token a migré d'Ethereum (RNDR) vers Solana (RENDER) à la suite de la RNP-002."],
      ["La vérification de l'exactitude du rendu et des résultats d'IA se fait surtout hors chaîne, par des mécanismes de réputation et de relecture."],
    ],
    limitations: [
      "La vérification du travail n'est pas sans confiance ; le réseau dépend de la couche d'orchestration et de l'écosystème OTOY.",
      "Rivaliser avec les hyperscalers sur la fiabilité et les exigences des entreprises est difficile.",
    ],
  },
  tokenomics: {
    supplyModelNote:
      "Équilibre burn-and-mint (BME) : des tokens sont brûlés quand les utilisateurs paient le travail et émis pour les opérateurs de nœuds selon un calendrier d'émissions décroissant, dans la limite d'une offre maximale publiée.",
    distributionNote: "Pas de graphique de répartition : les RNP définissent les émissions du modèle burn-and-mint, mais pas l'allocation de genèse de 2017, qu'aucune source primaire actuelle ne publie.",
    utility: ["Le RENDER est le token de paiement et de récompense du réseau ; le travail est facturé en monnaie classique et réglé par des burns de tokens."],
    emissions: ["Les émissions destinées aux opérateurs de nœuds, à la liquidité et à l'écosystème suivent le calendrier défini dans la RNP-001."],
    vesting: ["Aucun calendrier de vesting d'initiés important ne reste significatif par rapport aux émissions."],
    valueAccrual: ["L'offre nette ne baisse que si la valeur du travail brûlé dépasse les émissions, l'indicateur clé du modèle BME."],
  },
  adoption: {
    claims: [
      "La demande vient principalement d'artistes 3D et de studios qui utilisent OctaneRender ; les charges d'IA sont une source de demande émergente et moins prouvée.",
      "L'usage payant (les burns) reste faible par rapport à la capitalisation.",
    ],
    metricsToWatch: ["Tokens brûlés par époque", "Émissions face aux burns", "Opérateurs de nœuds actifs", "Tâches de calcul d'IA"],
  },
  financials: {
    relevantMetrics: [
      { label: "Valeur brûlée", why: "La valeur en monnaie classique du travail payé par les utilisateurs, la demande réelle." },
      { label: "Émissions", why: "La subvention du côté offre versée aux opérateurs de nœuds." },
    ],
    claims: ["Les données de revenus ouvertes et standardisées sont limitées ; Render publie des statistiques de burn, à comparer aux émissions dans la durée."],
  },
  onchain: {
    claims: ["Les burns et les émissions sont visibles sur Solana et dans les tableaux de bord de Render."],
    dataAvailability: "L'intégration d'un tableau de bord des burns et des émissions est prévue en phase 2 (pas de couverture des frais par DefiLlama).",
  },
  competitors: {
    columns: [
      {
        technology: "Place de marché de GPU, BME sur Solana",
        adoption: "Créateurs utilisant OctaneRender",
        tokenomics: "BME, plafonné",
        economics: "Burns faibles face à la capitalisation",
        strengths: "DePIN établie, intégration OTOY",
        weaknesses: "Vérification fondée sur la confiance",
        positioning: "Réseau de GPU pour la création et l'IA",
      },
      {
        technology: "Place de marché de calcul fondée sur Cosmos",
        adoption: "Charges de travail de développeurs",
        tokenomics: "Inflation de l'AKT",
        economics: "Frais de location",
        strengths: "Calcul généraliste",
        weaknesses: "Parc de GPU plus petit",
        positioning: "Cloud décentralisé",
      },
      {
        technology: "GPU des hyperscalers",
        adoption: "Dominant",
        tokenomics: "n/a",
        economics: "Revenus importants",
        strengths: "Fiabilité, engagements de service pour les entreprises",
        weaknesses: "Coût, contraintes d'accès",
        positioning: "Offre de calcul par défaut",
      },
    ],
  },
  risks: [
    ["Orchestration et vérification hors chaîne."],
    ["La demande pourrait ne pas croître assez vite pour compenser les émissions."],
    ["Qualification du token et réglementations sur les données et le calcul."],
    ["La Fondation et OTOY ont une forte influence."],
    ["Token de capitalisation moyenne, liquide sur les plateformes d'échange."],
    ["Dépendance au logiciel d'OTOY et à l'orchestration des tâches."],
    ["De nombreux projets de calcul DePIN et les hyperscalers sont en concurrence."],
  ],
  thesis: {
    bull: ["La demande de GPU liée à l'IA entraîne un usage payant durable, si bien que les burns dépassent les émissions."],
    neutral: ["Render reste un réseau de calcul créatif de niche."],
    bear: ["La demande payante reste faible ; le token est surtout porté par le récit de l'IA."],
    catalysts: ["Des charges d'IA en production sur le réseau."],
    assumptions: ["Les GPU décentralisés peuvent satisfaire les exigences de qualité et de fiabilité."],
    monitor: ["Ratio des burns sur les émissions", "Volume des tâches d'IA", "Nombre d'opérateurs de nœuds"],
    invalidation: ["Des burns stables ou en baisse pendant plusieurs trimestres alors que les émissions continuent"],
  },
  framework: [
    { summary: "Réseau opérationnel ; vérification fondée sur la confiance.", dataUsed: ["RNP", "Documentation"], limitations: "Peu de publications techniques." },
    { summary: "Le BME relie l'usage à l'offre.", dataUsed: ["RNP-001"], limitations: "Allocation de genèse non publiée dans les sources primaires actuelles." },
    { summary: "Un usage faible par rapport à la valorisation.", dataUsed: ["Statistiques de Render"], limitations: "Peu de données standardisées." },
    { summary: "Données de revenus ouvertes insuffisantes.", dataUsed: [], limitations: "Pas de couverture DefiLlama." },
    { summary: "Processus public des RNP.", dataUsed: ["Dépôt des RNP"], limitations: "Influence de la Fondation." },
    { summary: "Marque DePIN établie.", dataUsed: ["Revue du marché"], limitations: "Qualitatif." },
    { summary: "Risques économiques et concurrentiels.", dataUsed: ["Revue des risques"], limitations: "Qualitatif." },
  ],
  sources: [
    { supports: "Présentation et usage du réseau." },
    { supports: "Processus de gouvernance." },
    { supports: "Modèle BME et émissions." },
    { supports: "Migration du token vers Solana." },
    { supports: "Données de marché live : prix, capitalisation, FDV, offre en circulation et offre totale.", limitations: "Agrégateur ; les chiffres d'offre dépendent des déclarations des émetteurs et de la méthodologie de CoinGecko." },
  ],
};
