import type { ProjectText } from "@/lib/research/localized";

export const layerzeroFr: ProjectText = {
  oneLiner: "Un protocole de messagerie omnichaîne dont la sécurité est configurable par chaque application.",
  tags: ["Messagerie", "Tokens omnichaînes (OFT)", "DVN"],
  headline: "LayerZero : qui sécurise les messages omnichaînes ?",
  overview: {
    summary:
      "LayerZero est un protocole de messagerie qui relie de nombreuses blockchains via des contrats d'endpoint immuables. Les applications choisissent quels Decentralized Verifier Networks (DVN) doivent attester un message et quel exécuteur le livre : la sécurité est donc configurée application par application. Le standard OFT permet aux tokens d'exister nativement sur de nombreuses chaînes.",
    problem: ["Des bridges construits autour d'un seul multisig ont subi certains des plus gros piratages de la crypto ; les applications ont besoin d'une sécurité entre chaînes configurable et transparente."],
    valueProposition: [
      "La V2 sépare la vérification (DVN) de l'exécution (exécuteurs) et laisse chaque application définir sa propre pile de sécurité.",
      "Standard Omnichain Fungible Token (OFT) : les tokens sont brûlés et émis, ou bloqués et débloqués, d'une chaîne à l'autre sans intermédiaires « wrappés ».",
    ],
    positioning: ["L'un des protocoles de messagerie les plus intégrés ; en concurrence avec Wormhole, Chainlink CCIP, Axelar et Hyperlane."],
    team: ["Construit par LayerZero Labs (parmi les cofondateurs : Bryan Pellegrino et Ryan Zarick). Le ZRO a été lancé en juin 2024."],
  },
  technology: {
    blocks: [
      ["Des contrats d'endpoint immuables sur chaque chaîne ; des bibliothèques de messages ; les DVN vérifient les empreintes des messages ; les exécuteurs livrent les messages."],
      ["La sécurité ne vaut que ce que vaut la configuration de DVN choisie par l'application ; les configurations par défaut ou à DVN unique concentrent la confiance."],
      ["Relie un grand nombre de chaînes EVM et non EVM."],
      ["La sécurité configurable transfère les décisions de risque aux applications : puissant, mais plus difficile à évaluer pour les utilisateurs finaux."],
    ],
    limitations: [
      "Les utilisateurs savent rarement quels DVN sécurisent le token qu'ils détiennent.",
      "Les frais de messagerie sont faibles par message ; la captation de valeur dépend du volume et de la politique de frais.",
    ],
  },
  tokenomics: {
    supplyModelNote: "Offre fixe de 1 milliard de ZRO.",
    distribution: [{ label: "LayerZero Foundation" }, { label: "Partenaires stratégiques" }, { label: "Contributeurs principaux" }],
    distributionNote: "Allocation actuelle publiée par LayerZero (juin 2026) : les 383 millions d'origine de la Fondation plus 50 millions rachetés aux partenaires stratégiques en septembre 2025 ; les partenaires stratégiques à 312 millions après un règlement juridique qui leur a rendu les 40 millions rachetés à FTX / Alameda au lancement.",
    utility: ["Le ZRO est un token de gouvernance ; la conception du protocole prévoit une activation des frais que la gouvernance peut déclencher, imposant alors le paiement des frais en ZRO."],
    emissions: ["Pas d'inflation ; l'offre en circulation augmente avec les déblocages."],
    vesting: [
      "Les allocations des initiés suivent un vesting pluriannuel après un cliff d'un an à partir de juin 2024 ; d'importants déblocages mensuels par rapport à l'offre en circulation.",
      "Le rachat de septembre 2025 a ramené le déblocage mensuel brut des partenaires stratégiques de 15 à 12,7 millions de ZRO, et les 183 millions restants de la Fondation sont rebloqués jusqu'au lancement du réseau principal de Zero.",
    ],
    valueAccrual: [
      "Trois référendums sur l'activation des frais (décembre 2024, juin 2025, décembre 2025) ont chacun obtenu plus de 96 % d'approbation, mais une participation de 10,96 %, 13,01 % et 3,71 % n'a pas atteint le quorum, doté d'un plancher de 20 % depuis le deuxième vote ; l'activation des frais n'est pas en vigueur.",
      "Les revenus de Stargate financent déjà des rachats de ZRO, et la Fondation a racheté 50 millions de ZRO (5 % de l'offre) aux partenaires stratégiques en septembre 2025.",
    ],
  },
  adoption: {
    claims: [
      "Très utilisé pour les déploiements de tokens omnichaînes (OFT) et par des bridges comme Stargate.",
      "Les messages et les volumes sont visibles sur LayerZero Scan.",
    ],
    metricsToWatch: ["Messages par jour", "Valeur transférée via les OFT", "Diversité des DVN", "Statut de l'activation des frais"],
  },
  financials: {
    relevantMetrics: [
      { label: "Frais de messagerie", why: "La base de revenus liée à l'usage." },
      { label: "Revenus issus de l'activation des frais", why: "Le lien entre l'usage et le ZRO." },
    ],
    claims: ["Les revenus du protocole destinés aux détenteurs du token restent limités tant que les frais ne sont pas activés."],
  },
  onchain: {
    claims: ["Chaque message est traçable via LayerZero Scan."],
    dataAvailability: "Des analyses par message sont prévues en phase 2.",
  },
  competitors: {
    columns: [
      {
        technology: "Endpoints + DVN configurables",
        adoption: "Large adoption des OFT",
        tokenomics: "1 Md fixe, déblocages",
        economics: "Activation des frais en attente",
        strengths: "Intégrations, flexibilité",
        weaknesses: "Sécurité variable selon l'application",
        positioning: "Standard de messagerie omnichaîne",
      },
      {
        technology: "DON + réseau de gestion des risques",
        adoption: "Émetteurs de tokens institutionnels",
        tokenomics: "LINK",
        economics: "Frais de service",
        strengths: "Confiance institutionnelle",
        weaknesses: "Moins de chaînes",
        positioning: "Interopérabilité de niveau entreprise",
      },
      {
        technology: "Réseau de gardiens",
        adoption: "Fort sur Solana",
        tokenomics: "Token W",
        economics: "Frais à un stade précoce",
        strengths: "Portée hors EVM",
        weaknesses: "Historique de l'exploit de 2022",
        positioning: "Messagerie multi-chaînes",
      },
    ],
  },
  risks: [
    ["Les systèmes entre chaînes sont historiquement un vecteur d'exploit majeur ; les configurations de DVN mal réglées sont un risque."],
    ["D'importants déblocages et une captation de valeur absente."],
    ["Les transferts entre chaînes peuvent faire l'objet de contrôles anti-blanchiment et de sanctions."],
    ["La Fondation et Labs pilotent les décisions clés."],
    ["Token de capitalisation moyenne échangé sur les grandes plateformes."],
    ["Les choix de DVN et d'exécuteur par défaut concentrent la confiance dans des services opérés par LayerZero Labs."],
    ["Concurrence intense ; changer de couche de messagerie est faisable pour les émetteurs de tokens."],
  ],
  thesis: {
    bull: ["LayerZero devient la couche d'interopérabilité par défaut et l'activation des frais fait du ZRO un actif lié à l'usage."],
    neutral: ["Une infrastructure très utilisée, avec une faible captation de valeur pour le token."],
    bear: ["Un exploit majeur dans un écosystème d'OFT abîme la marque ; les émetteurs migrent vers CCIP ou des bridges natifs."],
    catalysts: ["Activation des frais par la gouvernance."],
    assumptions: ["La fragmentation entre chaînes persiste, ce qui entretient la demande de messagerie."],
    monitor: ["Votes sur l'activation des frais", "Calendrier de déblocage", "Incidents de sécurité dans les applications OFT"],
    invalidation: ["La perte de grands émetteurs de tokens au profit des concurrents", "Un exploit au niveau du protocole"],
  },
  framework: [
    { summary: "Conception flexible ; la sécurité dépend de la configuration.", dataUsed: ["Livre blanc", "Documentation"], limitations: "Les configurations varient selon les applications." },
    { summary: "Les déblocages continuent ; rachats actifs, activation des frais sous le quorum.", dataUsed: ["Documentation du lancement", "Article de LayerZero sur le token"], limitations: "Les conditions de déblocage des contributeurs varient selon les personnes." },
    { summary: "De nombreuses intégrations.", dataUsed: ["LayerZero Scan"], limitations: "Nombre de messages face à la valeur." },
    { summary: "Revenus limités pour les détenteurs du token.", dataUsed: ["DefiLlama"], limitations: "Données minces." },
    { summary: "Pilotage par Labs et la Fondation.", dataUsed: ["Documentation"], limitations: "Qualitatif." },
    { summary: "Leader d'un marché disputé.", dataUsed: ["Revue du marché"], limitations: "Qualitatif." },
    { summary: "Risques d'exploit entre chaînes et de déblocages.", dataUsed: ["Revue des risques"], limitations: "Qualitatif." },
  ],
  sources: [
    { supports: "Conception du protocole." },
    { supports: "Endpoints, DVN, exécuteurs." },
    { supports: "Conception des OFT." },
    { supports: "Token, gouvernance et activation des frais." },
    { supports: "Allocation actuelle, rachats, déblocages et référendums sur l'activation des frais." },
    { supports: "Explorateur de messages." },
    { supports: "Données de marché live : prix, capitalisation, FDV, offre en circulation et offre totale.", limitations: "Agrégateur ; les chiffres d'offre dépendent des déclarations des émetteurs et de la méthodologie de CoinGecko." },
    { supports: "Chiffres de TVL, de frais et de revenus.", limitations: "Adaptateurs open source ; la méthodologie diffère selon les protocoles et peut être révisée." },
  ],
};
