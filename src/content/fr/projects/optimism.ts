import type { ProjectText } from "@/lib/research/localized";

export const optimismFr: ProjectText = {
  oneLiner: "OP Mainnet et l'OP Stack, le framework open source derrière la « Superchain » de rollups.",
  tags: ["Rollup optimiste", "OP Stack", "Superchain"],
  headline: "Optimism : la Superchain peut-elle transformer des revenus partagés en valeur pour le token ?",
  overview: {
    summary:
      "Optimism développe OP Mainnet, un rollup optimiste sur Ethereum, et l'OP Stack, une base de code open source et modulaire utilisée par de nombreux autres L2 (dont Base, de Coinbase). Les chaînes qui adoptent ce standard commun forment la « Superchain », qui partage la gouvernance et reverse des revenus à l'Optimism Collective.",
    problem: [
      "Lancer un L2 sécurisé à partir de zéro coûte cher ; une pile technique commune et standardisée réduit ce coût et permet aux chaînes d'interopérer.",
      "L'OP Stack est conçue comme une base de code modulaire, sous licence MIT, pour construire des blockchains L2.",
    ],
    valueProposition: [
      "Les chaînes de la Superchain partagent un standard et reversent une part des revenus de leur séquenceur à l'Optimism Collective.",
      "L'effet de réseau se trouve dans le standard : plus il y a de chaînes qui adoptent l'OP Stack, plus l'outillage commun et l'interopérabilité prennent de la valeur.",
    ],
    positioning: ["Se positionne comme le « système d'exploitation » des L2 d'Ethereum plutôt que comme une chaîne unique dominante ; en concurrence avec Arbitrum Orbit, le ZK Stack et Polygon CDK."],
    team: ["Développé par OP Labs ; gouvernance par l'Optimism Collective, un système bicaméral composé de la Token House (détenteurs d'OP) et de la Citizens' House."],
  },
  technology: {
    blocks: [
      ["Architecture Bedrock (juin 2023) : client d'exécution op-geth, nœud de rollup op-node, composants batcher et proposer."],
      ["Des preuves de fraude ouvertes à tous sont entrées en service sur OP Mainnet en 2024, ce qui permet des retraits sans faire confiance à un proposeur privilégié."],
      ["Passe à l'échelle horizontalement : de nombreuses chaînes OP Stack plutôt qu'une seule grande chaîne ; une interopérabilité native entre elles est en développement."],
      ["Un Security Council conserve des pouvoirs d'urgence ; L2BEAT suit le stage et les délais de mise à jour."],
      ["Chaque chaîne OP Stack fait en général tourner un séquenceur unique, opéré par le propriétaire de la chaîne."],
      ["L'interopérabilité de la Superchain vise à permettre aux chaînes OP Stack d'échanger des messages avec une faible latence ; le calendrier de livraison et le modèle de sécurité sont à surveiller."],
    ],
    limitations: [
      "OP Mainnet a lui-même perdu des parts d'activité au profit de Base, la plus grande chaîne OP Stack.",
      "La captation de valeur pour le Collective dépend d'accords de partage des revenus avec des chaînes indépendantes.",
    ],
  },
  tokenomics: {
    supplyModelNote: "4 294 967 296 OP émis à la genèse, avec une inflation annuelle contrôlée par la gouvernance pouvant aller jusqu'à 2 %.",
    distribution: [{ label: "Fonds pour l'écosystème" }, { label: "Financement rétroactif des biens communs" }, { label: "Airdrops aux utilisateurs" }, { label: "Contributeurs principaux" }, { label: "Investisseurs" }],
    distributionNote: "Allocation initiale du token OP.",
    utility: [
      "L'OP sert à voter dans la Token House sur les mises à jour du protocole, les incitations et les allocations de la trésorerie.",
      "Le gas sur OP Mainnet est payé en ETH : le token n'a donc aucune demande directe liée à l'usage.",
    ],
    emissions: ["Une inflation annuelle de 2 % est possible sur décision de la gouvernance."],
    vesting: ["Les allocations des contributeurs principaux et des investisseurs suivent des calendriers de déblocage pluriannuels ; une part significative de l'offre ne circule pas encore (voir le ratio capitalisation/FDV)."],
    valueAccrual: [
      "Les membres de la Superchain partagent les revenus de leur séquenceur avec la trésorerie du Collective.",
      "Les détenteurs d'OP n'en profitent que si la gouvernance dirige les revenus du Collective vers le token (par exemple par des rachats).",
    ],
  },
  adoption: {
    claims: [
      "Parmi les principaux adoptants de l'OP Stack figurent Base (Coinbase) et plusieurs chaînes lancées par de grandes entreprises et de grands protocoles.",
      "La TVL et les frais d'OP Mainnet sont suivis par DefiLlama (voir les données live).",
      "Les cycles de financement rétroactif des biens communs sont un programme d'écosystème distinctif, bien que difficile à mesurer.",
    ],
    metricsToWatch: ["Nombre de chaînes de la Superchain", "Part des revenus reçue par le Collective", "Activité d'OP Mainnet face à Base", "Statut des preuves de fraude et du stage"],
  },
  financials: {
    relevantMetrics: [
      { label: "Revenus du Collective", why: "La marge du séquenceur d'OP Mainnet + le partage des revenus de la Superchain." },
      { label: "Dépenses de subventions et de RetroPGF", why: "Les sorties de trésorerie." },
      { label: "Frais d'OP Mainnet", why: "L'activité directe sur la chaîne phare." },
    ],
    claims: [
      "L'essentiel de l'activité économique de la Superchain a lieu sur Base ; le Collective ne reçoit qu'une part de ces revenus.",
      "Les dépenses de la trésorerie en subventions et en financement rétroactif ont été importantes par rapport aux revenus.",
    ],
  },
  onchain: {
    claims: ["L'activité de toute la Superchain doit être agrégée sur l'ensemble des chaînes pour évaluer l'écosystème ; OP Mainnet seul la sous-estime."],
    dataAvailability: "Des agrégats sur l'ensemble de la Superchain sont prévus en phase 2.",
  },
  competitors: {
    columns: [
      {
        technology: "OP Stack, preuves de fraude",
        adoption: "Superchain, Base comprise",
        tokenomics: "Gouvernance + 2 % d'inflation",
        economics: "Partage des revenus des membres",
        strengths: "Fixe le standard, écosystème",
        weaknesses: "Chaîne phare qui perd des parts",
        positioning: "Système d'exploitation des L2",
      },
      {
        technology: "Nitro, BoLD, Stylus",
        adoption: "Fortement orienté DeFi",
        tokenomics: "Gouvernance, déblocages jusqu'en 2027",
        economics: "Marge du séquenceur versée à la DAO",
        strengths: "Liquidité DeFi",
        weaknesses: "Séquenceur centralisé",
        positioning: "Rollup DeFi + Orbit",
      },
      {
        technology: "Preuves de validité",
        adoption: "Réseau élastique de chaînes ZK",
        tokenomics: "Token de gouvernance ZK",
        economics: "Stade précoce",
        strengths: "Preuves ZK, finalité rapide",
        weaknesses: "Écosystème plus petit",
        positioning: "Réseau de chaînes fondé sur le ZK",
      },
    ],
  },
  risks: [
    ["Les preuves de fraude sont relativement récentes ; l'interopérabilité ajoute une nouvelle surface d'attaque."],
    ["L'OP n'a pas de captation de valeur directe ; il dépend des accords de revenus de la Superchain."],
    ["La même incertitude sur les tokens de gouvernance que pour les autres DAO."],
    ["La conception bicamérale est innovante mais complexe ; l'influence d'OP Labs et de la Fondation reste importante."],
    ["Largement échangé sur les grandes plateformes."],
    ["Séquenceurs uniques et pouvoirs du Security Council."],
    ["Les frameworks de rollups se disputent les mêmes déploiements de chaînes ; les coûts de changement sont modérés."],
  ],
  thesis: {
    bull: [
      "L'OP Stack devient le choix par défaut des chaînes d'entreprises et d'applications, et le Collective capte une part croissante des revenus.",
      "L'interopérabilité de la Superchain donne aux chaînes OP Stack l'apparence d'un seul réseau.",
    ],
    neutral: ["L'adoption de l'OP Stack progresse, mais la valeur revient aux chaînes individuelles (notamment Base) plutôt qu'à l'OP."],
    bear: ["De grandes chaînes quittent la Superchain ou renégocient les conditions de partage des revenus.", "Les déblocages continus et l'inflation l'emportent sur une captation de valeur limitée."],
    catalysts: ["Lancement de l'interopérabilité native de la Superchain.", "Des propositions de gouvernance qui relient les revenus du Collective à l'OP."],
    assumptions: ["Les chaînes accordent plus de valeur aux standards communs qu'à une indépendance totale.", "Les accords de partage des revenus restent en place."],
    monitor: ["Membres de la Superchain", "Entrées liées au partage des revenus", "Déblocages d'OP", "Statut du stage"],
    invalidation: ["Base ou d'autres grands membres quittent la Superchain", "Les revenus du Collective baissent plusieurs trimestres de suite"],
  },
  framework: [
    { summary: "Pile technique largement adoptée, avec des preuves de fraude en service.", dataUsed: ["Documentation", "L2BEAT"], limitations: "Interopérabilité pas encore en service." },
    { summary: "Token de gouvernance avec inflation et captation de valeur indirecte.", dataUsed: ["Allocation"], limitations: "La gouvernance pourrait changer l'économie du token." },
    { summary: "Forte adoption de la pile technique ; chaîne phare modérée.", dataUsed: ["Membres de la Superchain", "DefiLlama"], limitations: "Attribution entre les chaînes." },
    { summary: "Revenus modestes par rapport aux sorties de trésorerie.", dataUsed: ["Frais DefiLlama"], limitations: "Les conditions de partage des revenus varient." },
    { summary: "Gouvernance bicamérale innovante.", dataUsed: ["Documentation de gouvernance"], limitations: "Complexe à évaluer." },
    { summary: "Framework de premier plan, mais concurrencé.", dataUsed: ["Revue du marché"], limitations: "Qualitatif." },
    { summary: "Risques de centralisation et de captation de valeur.", dataUsed: ["L2BEAT"], limitations: "Qualitatif." },
  ],
  sources: [
    { supports: "Architecture de l'OP Stack." },
    { supports: "Superchain et partage des revenus." },
    { supports: "Preuves de fraude ouvertes à tous." },
    { supports: "Token House et Citizens' House." },
    { supports: "Allocation et inflation." },
    { supports: "Analyse du stage du rollup, du système de preuves, des possibilités de mise à jour et de la fenêtre de sortie.", limitations: "Instantané de la configuration actuelle ; les stages changent avec les mises à jour." },
    { supports: "Données de marché live : prix, capitalisation, FDV, offre en circulation et offre totale.", limitations: "Agrégateur ; les chiffres d'offre dépendent des déclarations des émetteurs et de la méthodologie de CoinGecko." },
    { supports: "TVL, frais et offre de stablecoins au niveau de la chaîne.", limitations: "La TVL ne compte que les dépôts DeFi ; ce n'est pas une mesure de la valeur du réseau." },
  ],
};
