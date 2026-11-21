import type { ProjectText } from "@/lib/research/localized";

export const suiFr: ProjectText = {
  oneLiner: "Un Layer 1 orienté objets qui utilise le langage Move, conçu pour l'exécution parallèle et une faible latence.",
  tags: ["Move", "Modèle objet", "Exécution parallèle"],
  headline: "Sui : l'exécution parallèle et Move peuvent-ils conquérir les développeurs ?",
  overview: {
    summary:
      "Sui est un Layer 1 en preuve d'enjeu développé par Mysten Labs, fondé par d'anciens membres de l'équipe Diem/Novi de Meta. Son modèle de données traite les actifs comme des objets à la propriété explicite, ce qui permet d'exécuter en parallèle les transactions portant sur des objets indépendants. Les smart contracts sont écrits en Sui Move.",
    problem: ["Les blockchains fondées sur des comptes exécutent de nombreuses transactions à la suite ; un modèle objet rend les dépendances explicites et permet le parallélisme."],
    valueProposition: [
      "Les transactions qui ne touchent que des objets possédés peuvent contourner l'ordonnancement complet du consensus, ce qui réduit la latence.",
      "zkLogin permet aux utilisateurs de créer des wallets avec des identifiants web familiers, grâce à des preuves à divulgation nulle de connaissance.",
    ],
    positioning: ["Premier L1 fondé sur Move ; en concurrence avec Solana et Aptos sur le segment haute performance."],
    team: ["Construit par Mysten Labs (parmi les cofondateurs : Evan Cheng, Sam Blackshear, George Danezis, Adeniyi Abiodun et Kostas Chalkias). Le réseau principal a été lancé le 3 mai 2023."],
  },
  technology: {
    blocks: [
      ["Modèle de données orienté objets, avec des objets possédés et partagés ; langage Move adapté à Sui."],
      ["Mysticeti, un protocole de consensus fondé sur un DAG, ordonne les transactions qui impliquent des objets partagés."],
      ["L'exécution parallèle et un consensus à faible latence visent un débit élevé ; la capacité croît avec le matériel des validateurs."],
      [
        "Le réseau principal s'est arrêté environ deux heures en novembre 2024 à cause d'un bug du logiciel des validateurs.",
        "Le modèle de ressources de Move réduit certaines catégories de bugs de smart contracts, mais des exploits au niveau des applications se produisent toujours.",
      ],
      ["Après l'exploit de Cetus en mai 2025, les validateurs se sont coordonnés pour geler une grande partie des fonds volés, ce qui a ouvert un débat sur la résistance à la censure de Sui."],
    ],
    limitations: ["Un écosystème plus jeune, avec une DeFi moins éprouvée.", "La capacité démontrée de coordination des validateurs soulève des questions de neutralité."],
  },
  tokenomics: {
    supplyModelNote: "Offre maximale fixe de 10 milliards de SUI ; les subventions de staking sont versées depuis la réserve communautaire et diminuent avec le temps.",
    distribution: [{ label: "Réserve communautaire" }, { label: "Premiers contributeurs" }, { label: "Investisseurs" }, { label: "Trésorerie de Mysten Labs" }, { label: "Accès communautaire et testeurs d'applications" }],
    distributionNote: "Répartition de l'offre de 10 milliards.",
    utility: ["Le SUI paie le gas, est staké auprès des validateurs (PoS délégué) et sert à la gouvernance ; un fonds de stockage finance le stockage des données à long terme."],
    emissions: ["Subventions de staking distribuées depuis la réserve communautaire."],
    vesting: ["Les déblocages des initiés et des réserves se poursuivent pendant plusieurs années ; une grande part de l'offre de 10 milliards ne circule pas encore (voir le ratio capitalisation/FDV)."],
    valueAccrual: ["Les frais de gas vont aux stakers ; les frais de stockage sont conservés dans le fonds de stockage. Les revenus de frais sont modestes par rapport à la FDV."],
  },
  adoption: {
    claims: [
      "La TVL et les frais DeFi de Sui sont suivis par DefiLlama (voir les données live).",
      "L'écosystème comprend de la DeFi, du jeu vidéo et du stockage (Walrus) ; la croissance a été forte, mais en partant d'une base faible.",
    ],
    metricsToWatch: ["Frais et adresses actives", "Offre de stablecoins sur Sui", "Calendrier de déblocage", "Nombre de validateurs"],
  },
  financials: {
    relevantMetrics: [
      { label: "Frais de gas", why: "La demande d'espace de bloc." },
      { label: "Déblocages face à la demande", why: "La dilution due à l'offre en vesting." },
    ],
    claims: ["Les revenus de frais restent faibles par rapport à la valorisation entièrement diluée."],
  },
  onchain: {
    claims: ["Les indicateurs d'activité fondés sur des objets diffèrent de ceux des chaînes fondées sur des comptes ; les comparaisons entre chaînes demandent de la prudence."],
    dataAvailability: "Des analyses natives de Sui sont prévues en phase 2.",
  },
  competitors: {
    columns: [
      {
        technology: "Move, modèle objet, Mysticeti",
        adoption: "Écosystème en croissance rapide",
        tokenomics: "Plafond de 10 Md, longs déblocages",
        economics: "Frais faibles face à la FDV",
        strengths: "Performance, expérience utilisateur (zkLogin)",
        weaknesses: "Surplomb des déblocages, débat sur la neutralité",
        positioning: "L1 haute performance de nouvelle génération",
      },
      {
        technology: "Move (Aptos), Block-STM",
        adoption: "Stade comparable",
        tokenomics: "APT, déblocages",
        economics: "Frais faibles",
        strengths: "Exécution parallèle",
        weaknesses: "DeFi plus petite",
        positioning: "L1 fondé sur Move",
      },
      {
        technology: "Monolithique, SVM",
        adoption: "Vaste écosystème",
        tokenomics: "Désinflation",
        economics: "Frais élevés",
        strengths: "Liquidité, effets de réseau",
        weaknesses: "Historique de pannes",
        positioning: "L1 haute performance établi",
      },
    ],
  },
  risks: [
    ["Un arrêt notable du réseau principal (novembre 2024)."],
    ["D'importants déblocages à venir par rapport à l'offre en circulation."],
    ["L'exposition réglementaire habituelle d'un token de L1."],
    ["Mysten Labs et la Sui Foundation ont une forte influence."],
    ["Token de grande capitalisation, liquide."],
    ["Les validateurs ont gelé le produit d'un exploit en 2025, ce qui démontre une capacité d'intervention coordonnée."],
    ["En concurrence avec les effets de réseau de Solana et d'autres nouveaux L1."],
  ],
  thesis: {
    bull: ["Une expérience utilisateur et des performances supérieures attirent les applications grand public ; la croissance de l'écosystème dépasse les déblocages."],
    neutral: ["Sui devient un solide L1 du top 15 mais peine à déloger Solana."],
    bear: ["Les déblocages l'emportent sur la demande ; les inquiétudes de neutralité limitent la DeFi institutionnelle."],
    catalysts: ["Des lancements de grandes applications grand public utilisant zkLogin."],
    assumptions: ["Les développeurs adoptent Move à grande échelle."],
    monitor: ["Déblocages", "Croissance des frais", "Interventions des validateurs"],
    invalidation: ["Un recul durable de l'activité de l'écosystème pendant que les déblocages se poursuivent"],
  },
  framework: [
    { summary: "Conception moderne avec de bonnes performances.", dataUsed: ["Livre blanc", "Documentation"], limitations: "Historique court." },
    { summary: "Large allocation aux initiés et longs déblocages.", dataUsed: ["Documentation de la tokenomics"], limitations: "Détails du calendrier." },
    { summary: "Écosystème en croissance.", dataUsed: ["DefiLlama"], limitations: "Jeune." },
    { summary: "Frais faibles par rapport à la valorisation.", dataUsed: ["Frais DefiLlama"], limitations: "Stade précoce." },
    { summary: "Centré sur la Fondation et Mysten.", dataUsed: ["Documentation"], limitations: "Qualitatif." },
    { summary: "Premier L1 Move.", dataUsed: ["Revue du marché"], limitations: "Qualitatif." },
    { summary: "Déblocages et centralisation.", dataUsed: ["Revue des risques"], limitations: "Qualitatif." },
  ],
  sources: [
    { supports: "Modèle objet et chemins d'exécution." },
    { supports: "Présentation de la plateforme." },
    { supports: "Objets possédés et partagés." },
    { supports: "Protocole de consensus." },
    { supports: "Wallets fondés sur une connexion web." },
    { supports: "Offre, staking, fonds de stockage." },
    { supports: "Rapport d'incident sur l'arrêt du réseau.", limitations: "Renvoie vers l'index du blog ; le rapport précis reste à épingler." },
    { supports: "Exploit et gel des fonds.", limitations: "Renvoie vers l'index du blog ; la déclaration précise reste à épingler." },
    { supports: "Données de marché live : prix, capitalisation, FDV, offre en circulation et offre totale.", limitations: "Agrégateur ; les chiffres d'offre dépendent des déclarations des émetteurs et de la méthodologie de CoinGecko." },
    { supports: "TVL, frais et offre de stablecoins au niveau de la chaîne.", limitations: "La TVL ne compte que les dépôts DeFi ; ce n'est pas une mesure de la valeur du réseau." },
  ],
};
