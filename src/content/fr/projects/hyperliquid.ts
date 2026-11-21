import type { ProjectText } from "@/lib/research/localized";

export const hyperliquidFr: ProjectText = {
  oneLiner: "Une plateforme d'échange à carnet d'ordres entièrement on-chain pour les perpétuels et le comptant, sur son propre L1.",
  tags: ["DEX de perpétuels", "Carnet d'ordres", "L1 propre"],
  headline: "Hyperliquid : un carnet d'ordres entièrement on-chain peut-il rivaliser avec les plateformes centralisées ?",
  overview: {
    summary:
      "Hyperliquid est une plateforme d'échange décentralisée dont le carnet d'ordres et le moteur d'appariement tournent sur son propre L1 en preuve d'enjeu (HyperCore), avec l'objectif d'offrir les performances d'une plateforme centralisée et la transparence du on-chain. HyperEVM ajoute des smart contracts généralistes qui partagent le même état. L'essentiel des frais d'échange alimente un rachat automatique de HYPE.",
    problem: ["Les plateformes de perpétuels on-chain ont historiquement été en retard sur les plateformes centralisées en latence et en profondeur ; les plateformes centralisées manquent de transparence et ne permettent pas l'auto-conservation."],
    valueProposition: [
      "HyperCore fait tourner un carnet d'ordres entièrement on-chain avec une finalité en un bloc, grâce au protocole de consensus HyperBFT.",
      "Les frais du protocole sont dirigés vers l'Assistance Fund, qui rachète des HYPE sur le marché.",
      "Un développement autofinancé (sans capital-risque) et un large airdrop communautaire ont créé un fort alignement avec la communauté.",
    ],
    positioning: ["Premier DEX de perpétuels par le volume en 2025 ; en concurrence avec les plateformes centralisées de futures et de nouvelles plateformes de perpétuels on-chain."],
    team: ["Construit par Hyperliquid Labs, dirigé par Jeff Yan (ancien de Hudson River Trading) ; la Hyper Foundation soutient l'écosystème. L'équipe n'a pas levé de capitaux extérieurs."],
  },
  technology: {
    blocks: [
      ["HyperCore (carnets d'ordres, gestion des marges, liquidations) et HyperEVM (smart contracts) partagent un même état sous le consensus HyperBFT."],
      ["HyperBFT est un protocole BFT inspiré de HotStuff, opéré par un ensemble de stakers de HYPE."],
      ["Des épisodes de tension notables en 2025 (par exemple l'intervention sur le marché JELLY, de lourdes pertes de liquidation pour le coffre HLP) ont montré à la fois la résilience du système et le pouvoir discrétionnaire des validateurs."],
      ["L'ensemble des validateurs est petit et la Fondation détient une mise importante ; le bridge repose sur les signatures des validateurs."],
      ["HIP-3 permet aux développeurs de déployer leurs propres marchés de perpétuels en stakant du HYPE."],
    ],
    limitations: ["Un petit ensemble de validateurs et un développement centralisé sont la contrepartie de la performance.", "Le bridge depuis Arbitrum (dépôts d'USDC) est un point de confiance clé."],
  },
  tokenomics: {
    supplyModelNote: "Offre maximale de 1 milliard de HYPE ; les émissions futures et les récompenses communautaires sont réservées à l'intérieur du plafond.",
    distribution: [
      { label: "Émissions futures et récompenses communautaires" },
      { label: "Distribution de genèse (airdrop)" },
      { label: "Contributeurs principaux" },
      { label: "Budget de la Hyper Foundation" },
      { label: "Subventions communautaires" },
      { label: "Liquidité HIP-2" },
    ],
    distributionNote: "Allocation annoncée à la genèse (29 novembre 2024).",
    utility: ["Le HYPE est staké pour sécuriser le L1, paie le gas sur HyperEVM et est nécessaire pour déployer des marchés HIP-3."],
    emissions: ["Les émissions futures et les récompenses communautaires proviennent de l'allocation réservée de 38,888 %."],
    vesting: ["Les tokens des contributeurs principaux ont été bloqués pendant un an après la genèse, puis sont acquis au fil des années suivantes."],
    valueAccrual: [
      "L'essentiel des frais d'échange finance des rachats continus de HYPE par l'Assistance Fund.",
      "Cela crée l'un des liens les plus directs entre frais et token de la crypto, mais rend aussi le token très sensible au volume d'échange.",
    ],
  },
  adoption: {
    claims: [
      "Hyperliquid génère d'importants frais d'échange, suivis par DefiLlama (voir les données live).",
      "L'usage est concentré parmi les traders actifs et dépend de la demande de levier.",
      "L'écosystème HyperEVM (prêt, tokens de staking liquide, DEX) se développe autour du HYPE.",
    ],
    metricsToWatch: ["Volume et open interest des perpétuels", "Frais et rachats", "Part de marché face aux plateformes centralisées", "Élargissement de l'ensemble des validateurs"],
  },
  financials: {
    relevantMetrics: [
      { label: "Frais d'échange", why: "La principale ligne de revenus." },
      { label: "Rachats", why: "Les frais rendus au HYPE via l'Assistance Fund." },
      { label: "Open interest", why: "La profondeur et la fidélité de l'activité de trading." },
    ],
    claims: [
      "Parmi les protocoles qui génèrent le plus de frais de la crypto ; les revenus sont cycliques avec le volume d'échange.",
      "Les multiples de valorisation peuvent paraître modestes sur des revenus au plus haut et chers sur des revenus au plus bas.",
    ],
  },
  onchain: {
    claims: ["Tous les ordres, positions et liquidations sont visibles publiquement, une transparence unique pour une plateforme de dérivés."],
    dataAvailability: "Des analyses de l'open interest et des liquidations sont prévues en phase 2.",
  },
  competitors: {
    columns: [
      {
        technology: "Carnet d'ordres on-chain sur un L1 propre",
        adoption: "Premier DEX de perpétuels",
        tokenomics: "Plafond de 1 Md, rachats financés par les frais",
        economics: "Revenus de frais importants",
        strengths: "Performance, transparence, captation de valeur",
        weaknesses: "Petit ensemble de validateurs",
        positioning: "Alternative on-chain aux futures des plateformes centralisées",
      },
      {
        technology: "Carnet d'ordres sur une appchain Cosmos",
        adoption: "Premier leader des DEX de perpétuels",
        tokenomics: "Staking de DYDX",
        economics: "Volume plus faible",
        strengths: "Historique",
        weaknesses: "Parts de marché perdues",
        positioning: "Appchain de perpétuels décentralisée",
      },
      {
        technology: "Moteur d'appariement centralisé",
        adoption: "Plus grande plateforme de futures",
        tokenomics: "BNB",
        economics: "Revenus très importants",
        strengths: "Liquidité, étendue de l'offre",
        weaknesses: "Dépositaire, opaque",
        positioning: "Plateforme centralisée mondiale",
      },
    ],
  },
  risks: [
    ["Jeune L1 avec une gestion des marges complexe ; sécurité du bridge."],
    ["Revenus liés aux cycles de levier ; le coffre HLP peut subir des pertes."],
    ["Des dérivés à effet de levier proposés sans KYC font face à un risque réglementaire important."],
    ["Les validateurs ont montré leur disposition à intervenir sur les marchés."],
    ["Token de grande capitalisation ; liquidité on-chain concentrée sur Hyperliquid lui-même."],
    ["Petit ensemble de validateurs et mise concentrée de la Fondation."],
    ["De nouveaux DEX de perpétuels se lancent avec des incitations agressives."],
  ],
  thesis: {
    bull: ["Hyperliquid capte une part croissante du volume mondial des dérivés, et les rachats réduisent régulièrement le flottant.", "HyperEVM transforme la chaîne en un écosystème financier plus large."],
    neutral: ["Hyperliquid reste l'un des principaux DEX de perpétuels, avec des revenus cycliques."],
    bear: ["Une action réglementaire ou un exploit majeur perturbe les échanges ; les concurrents grignotent des parts de marché."],
    catalysts: ["HIP-3 ouvre le déploiement de marchés à tous.", "Les déblocages des contributeurs principaux ont commencé après le blocage d'un an."],
    assumptions: ["Les traders continuent d'apprécier l'auto-conservation et la transparence.", "L'ensemble des validateurs se décentralise avec le temps."],
    monitor: ["Part de marché", "Volume des rachats face aux déblocages", "Évolution de l'ensemble des validateurs", "Évolutions réglementaires"],
    invalidation: ["Une perte durable de part de volume au profit des concurrents", "Un exploit du bridge ou du moteur entraînant des pertes pour les utilisateurs"],
  },
  framework: [
    { summary: "Haute performance et transparent ; jeune.", dataUsed: ["Documentation", "Historique des incidents"], limitations: "Peu d'audits indépendants du cœur du système." },
    { summary: "Large allocation communautaire, rachats directs ; déblocages des contributeurs.", dataUsed: ["Documentation de la tokenomics"], limitations: "Rythme des déblocages." },
    { summary: "Premier DEX de perpétuels.", dataUsed: ["DefiLlama"], limitations: "Concentration des traders." },
    { summary: "Des revenus de frais très importants, rendus via les rachats.", dataUsed: ["Frais DefiLlama"], limitations: "Cyclique." },
    { summary: "Petit ensemble de validateurs aux pouvoirs discrétionnaires.", dataUsed: ["Documentation", "Incidents"], limitations: "Qualitatif." },
    { summary: "Leader incontesté des DEX de perpétuels.", dataUsed: ["Part de marché"], limitations: "Paysage concurrentiel en mouvement." },
    { summary: "Risques réglementaires et de centralisation.", dataUsed: ["Revue des risques"], limitations: "Qualitatif." },
  ],
  sources: [
    { supports: "Présentation et équipe." },
    { supports: "Carnet d'ordres, consensus, HyperEVM." },
    { supports: "Distribution des frais et Assistance Fund." },
    { supports: "Allocation et vesting annoncés à la genèse (novembre 2024).", limitations: "Le site de la Fondation affiche les chiffres côté navigateur ; transcrits depuis l'annonce de genèse et cohérents avec les publications des plateformes d'échange et de la presse." },
    { supports: "Déploiement de marchés ouvert à tous." },
    { supports: "Données de marché live : prix, capitalisation, FDV, offre en circulation et offre totale.", limitations: "Agrégateur ; les chiffres d'offre dépendent des déclarations des émetteurs et de la méthodologie de CoinGecko." },
    { supports: "Chiffres de TVL, de frais et de revenus.", limitations: "Adaptateurs open source ; la méthodologie diffère selon les protocoles et peut être révisée." },
  ],
};
