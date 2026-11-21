import type { ProjectText } from "@/lib/research/localized";

export const arbitrumFr: ProjectText = {
  oneLiner: "Un rollup optimiste qui fait passer Ethereum à l'échelle, gouverné par l'Arbitrum DAO.",
  tags: ["Rollup optimiste", "EVM", "DAO"],
  headline: "Arbitrum : un token de gouvernance peut-il capter l'économie d'un rollup ?",
  overview: {
    summary:
      "Arbitrum One est un rollup optimiste qui exécute des transactions EVM hors d'Ethereum, publie les données des transactions sur Ethereum et s'appuie sur des preuves de fraude pour que l'opérateur reste honnête. C'est l'un des plus grands L2 par l'activité DeFi. Le token ARB gouverne l'Arbitrum DAO, qui contrôle le protocole et une trésorerie importante.",
    problem: [
      "L'espace de bloc du L1 d'Ethereum est rare et cher ; les rollups offrent une exécution moins coûteuse tout en héritant d'une grande partie de la sécurité d'Ethereum.",
      "La conception d'Arbitrum permet à n'importe qui de contester une affirmation d'état invalide pendant une fenêtre de litige, grâce à des preuves de fraude interactives.",
    ],
    valueProposition: [
      "Équivalence EVM complète (Nitro), pour que les contrats et l'outillage d'Ethereum fonctionnent sans modification ; Stylus ajoute des contrats WASM en Rust, C et C++.",
      "BoLD, un protocole de litige ouvert à tous, permet à n'importe qui de participer à la validation, au lieu d'un ensemble d'acteurs autorisés.",
      "Une liquidité DeFi profonde et un écosystème de chaînes Orbit construites sur la même pile technique.",
    ],
    positioning: ["L'une des deux principales piles de rollups avec l'OP Stack ; en concurrence avec Base, OP Mainnet et les rollups ZK pour les utilisateurs et la liquidité."],
    team: [
      "Construit par Offchain Labs, fondé par Ed Felten, Steven Goldfeder et Harry Kalodner (issus de la recherche à Princeton). La gouvernance est passée à l'Arbitrum DAO avec l'airdrop d'ARB en mars 2023.",
    ],
  },
  technology: {
    blocks: [
      ["Pile Nitro : un fork de Geth compilé en WASM pour les preuves de fraude ; un séquenceur ordonne les transactions et des lots sont publiés sur Ethereum."],
      ["Hérite de la finalité d'Ethereum après la période de contestation (environ une semaine pour les retraits) ; le séquenceur fournit des confirmations provisoires."],
      ["Publie ses données dans des blobs Ethereum (EIP-4844) pour réduire les coûts ; Arbitrum Nova utilise un comité de données AnyTrust pour des données moins chères."],
      ["Un Security Council de 12 membres peut effectuer des mises à jour d'urgence ; L2BEAT suit le stage du rollup et ses délais de mise à jour."],
      ["Le séquençage est encore assuré par une seule entité (Offchain Labs) ; les utilisateurs peuvent forcer l'inclusion de leurs transactions via le L1 s'ils sont censurés."],
      ["Timeboost introduit une enchère sous pli scellé pour une voie de transaction express, qui reverse une partie de la valeur MEV à la DAO."],
    ],
    limitations: [
      "Le séquenceur centralisé et les pouvoirs d'urgence du Security Council restent des hypothèses de confiance.",
      "Délai de retrait de 7 jours vers le L1 pour le bridge natif (les bridges rapides ajoutent leurs propres risques).",
    ],
  },
  tokenomics: {
    supplyModelNote: "10 milliards d'ARB émis à la genèse. La DAO peut émettre jusqu'à 2 % d'offre supplémentaire par an.",
    distribution: [{ label: "Trésorerie de l'Arbitrum DAO" }, { label: "Équipe et conseillers d'Offchain Labs" }, { label: "Investisseurs" }, { label: "Airdrop aux utilisateurs" }, { label: "Airdrop aux DAO de l'écosystème" }],
    distributionNote: "Allocation de genèse (mars 2023).",
    utility: [
      "L'ARB est un token de gouvernance : ses détenteurs votent sur les mises à jour du protocole et les dépenses de la trésorerie.",
      "L'ARB n'est pas nécessaire pour le gas : les frais sur Arbitrum One sont payés en ETH, si bien que l'usage ne crée pas directement de demande d'ARB.",
    ],
    emissions: ["Une inflation annuelle allant jusqu'à 2 % est possible à la discrétion de la DAO."],
    vesting: ["Les allocations de l'équipe et des investisseurs se débloquent chaque mois après un cliff d'un an à partir de mars 2023, sur quatre ans (jusqu'en 2027)."],
    valueAccrual: ["Les bénéfices du séquenceur et les revenus de Timeboost vont à la trésorerie de la DAO, pas directement aux détenteurs d'ARB ; toute distribution exigerait une décision de gouvernance."],
  },
  adoption: {
    claims: [
      "Arbitrum figure parmi les plus grands rollups par la TVL et l'activité DeFi (voir les données live).",
      "Les chaînes Orbit étendent l'écosystème mais ne reversent pas nécessairement de valeur à Arbitrum One ou à l'ARB.",
      "Les programmes d'incitation financés par la DAO ont parfois dopé l'activité ; la rétention organique est la question clé.",
    ],
    metricsToWatch: ["Revenus du séquenceur moins coûts de données sur le L1", "Offre de stablecoins sur Arbitrum", "Stage L2BEAT", "Dépenses de la trésorerie de la DAO"],
  },
  financials: {
    relevantMetrics: [
      { label: "Marge du séquenceur", why: "Les frais encaissés sur le L2 moins les coûts de publication des données." },
      { label: "Revenus de Timeboost", why: "Une nouvelle ligne de revenus issue de la MEV pour la DAO." },
      { label: "Dépenses d'incitation", why: "Les sorties de trésorerie utilisées pour acheter de l'activité." },
    ],
    claims: [
      "Après la baisse des coûts de données due à Dencun, les marges des rollups se sont améliorées mais le total des frais a baissé car les utilisateurs paient moins ; les revenus restent modestes par rapport à la FDV.",
      "La trésorerie de la DAO (en grande partie en ARB) est le principal actif financier ; son autonomie dépend du prix de l'ARB.",
    ],
  },
  onchain: {
    claims: [
      "Les indicateurs d'activité doivent distinguer les utilisateurs organiques de la chasse aux incitations ; les périodes d'airdrop et de subventions faussent les comparaisons.",
      "Les lots publiés sur Ethereum et les affirmations d'état sont vérifiables sur le L1.",
    ],
    dataAvailability: "Des indicateurs propres aux rollups (coûts des lots, marge du séquenceur) sont prévus via L2BEAT et Dune en phase 2.",
  },
  competitors: {
    columns: [
      {
        technology: "Optimiste, preuves de fraude BoLD, Stylus",
        adoption: "Première liquidité DeFi parmi les L2",
        tokenomics: "Gouvernance uniquement, déblocages de l'équipe jusqu'en 2027",
        economics: "Marge du séquenceur versée à la DAO",
        strengths: "Profondeur DeFi, preuves ouvertes à tous",
        weaknesses: "Captation de valeur de l'ARB, séquenceur centralisé",
        positioning: "Rollup orienté DeFi + chaînes Orbit",
      },
      {
        technology: "OP Stack, preuves de fraude",
        adoption: "Superchain, Base comprise",
        tokenomics: "Gouvernance + RetroPGF",
        economics: "Partage des revenus de la Superchain",
        strengths: "Écosystème de chaînes",
        weaknesses: "OP Mainnet plus petit que Base",
        positioning: "Standard de déploiement des chaînes L2",
      },
      {
        technology: "OP Stack",
        adoption: "Large base d'utilisateurs particuliers via Coinbase",
        tokenomics: "Pas de token",
        economics: "Revenus pour Coinbase",
        strengths: "Distribution",
        weaknesses: "Contrôle par une entreprise",
        positioning: "Porte d'entrée on-chain grand public",
      },
    ],
  },
  risks: [
    ["Système de preuves de fraude et contrats de bridge complexes ; le Security Council peut effectuer des mises à jour en cas d'urgence."],
    ["L'ARB n'a aucun droit direct sur les revenus ; les déblocages continus ajoutent de l'offre jusqu'en 2027."],
    ["Le statut des tokens de gouvernance et la responsabilité juridique des DAO restent incertains dans de nombreuses juridictions."],
    ["Les décisions de la DAO sur les grands programmes de trésorerie ont été disputées ; concentration des votes entre les délégués."],
    ["Coté sur les grandes plateformes d'échange avec une liquidité profonde."],
    ["Opérateur de séquenceur unique et pouvoirs de mise à jour d'urgence."],
    ["Base et d'autres L2 mènent une concurrence agressive pour les utilisateurs ; la technologie des rollups se banalise de plus en plus."],
  ],
  thesis: {
    bull: [
      "Arbitrum reste le premier rollup DeFi et la DAO dirige les revenus du séquenceur et de Timeboost vers les détenteurs d'ARB.",
      "Stylus attire une nouvelle catégorie de développeurs et d'applications.",
    ],
    neutral: ["Arbitrum conserve une part de marché importante, mais l'ARB sous-performe car la valeur ne revient pas au token."],
    bear: ["La liquidité migre vers Base et les chaînes spécifiques à une application ; les déblocages d'ARB pèsent sur le prix.", "La montée en charge du L1 d'Ethereum réduit le besoin de L2 généralistes."],
    catalysts: ["Activation de la validation ouverte à tous avec BoLD.", "Une décision de gouvernance de partager les revenus du protocole avec les stakers."],
    assumptions: ["La demande d'exécution sécurisée par Ethereum continue de croître.", "La DAO parvient à coordonner une politique de trésorerie et d'incitations efficace."],
    monitor: ["Tendance de la marge du séquenceur", "Calendrier de déblocage de l'ARB", "Part de marché face à Base", "Actions du Security Council"],
    invalidation: ["Une perte durable de part de marché DeFi au profit de L2 concurrents", "Une défaillance majeure du bridge ou du système de preuves"],
  },
  framework: [
    { summary: "Rollup optimiste mature, avec des preuves ouvertes à tous.", dataUsed: ["Documentation", "L2BEAT"], limitations: "Des pouvoirs de mise à jour subsistent." },
    { summary: "Token de gouvernance uniquement, avec des déblocages continus pour les initiés.", dataUsed: ["Allocation des tokens", "Vesting"], limitations: "La DAO pourrait modifier la captation de valeur." },
    { summary: "Parmi les plus grands L2 par l'activité DeFi.", dataUsed: ["TVL DefiLlama"], limitations: "Les incitations faussent l'usage." },
    { summary: "Marges du séquenceur positives, modestes par rapport à la valorisation.", dataUsed: ["Frais et revenus DefiLlama"], limitations: "Les revenus vont à la DAO." },
    { summary: "DAO active avec un Security Council ; concentration des délégués.", dataUsed: ["Documentation de gouvernance"], limitations: "Qualitatif." },
    { summary: "Position forte mais disputée parmi les L2.", dataUsed: ["TVL relative"], limitations: "Marché qui évolue vite." },
    { summary: "Le séquenceur centralisé et l'économie du token sont les risques clés.", dataUsed: ["Analyse des risques de L2BEAT"], limitations: "La configuration change avec le temps." },
  ],
  sources: [
    { supports: "Architecture Nitro et publication des données." },
    { supports: "Mécanisme de litige et période de contestation." },
    { supports: "Protocole de litige ouvert à tous." },
    { supports: "Smart contracts WASM." },
    { supports: "Enchère de la voie express." },
    { supports: "Structure de la DAO et rôle de l'ARB." },
    { supports: "Pouvoirs d'urgence." },
    { supports: "Allocation de genèse, inflation et vesting." },
    { supports: "Analyse du stage du rollup, du système de preuves, des possibilités de mise à jour et de la fenêtre de sortie.", limitations: "Instantané de la configuration actuelle ; les stages changent avec les mises à jour." },
    { supports: "Données de marché live : prix, capitalisation, FDV, offre en circulation et offre totale.", limitations: "Agrégateur ; les chiffres d'offre dépendent des déclarations des émetteurs et de la méthodologie de CoinGecko." },
    { supports: "TVL, frais et offre de stablecoins au niveau de la chaîne.", limitations: "La TVL ne compte que les dépôts DeFi ; ce n'est pas une mesure de la valeur du réseau." },
  ],
};
