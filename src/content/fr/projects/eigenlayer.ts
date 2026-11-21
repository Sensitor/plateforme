import type { ProjectText } from "@/lib/research/localized";

export const eigenlayerFr: ProjectText = {
  oneLiner: "Un protocole de restaking qui permet à l'ETH staké de sécuriser des services supplémentaires (AVS) ; désormais sous la marque EigenCloud.",
  tags: ["Restaking", "Sécurité partagée", "AVS"],
  headline: "EigenLayer : que vaut la sécurité partagée, et que risque-t-elle ?",
  overview: {
    summary:
      "EigenLayer permet aux stakers d'ETH et aux détenteurs de tokens de staking liquide de « restaker » leurs actifs pour sécuriser des Actively Validated Services (AVS), couches de disponibilité des données, oracles, bridges et autres middlewares, en échange de récompenses supplémentaires et de conditions de slashing supplémentaires. En 2025, le projet s'est repositionné sous la marque EigenCloud comme plateforme de calcul hors chaîne vérifiable.",
    problem: ["Le livre blanc soutient que les nouveaux protocoles doivent constituer leur propre réseau de confiance, ce qui fragmente la sécurité ; le restaking leur permet plutôt de louer la sécurité économique d'Ethereum."],
    valueProposition: [
      "La sécurité partagée réduit le coût de lancement des middlewares qui ont besoin d'un ensemble de validateurs.",
      "EigenDA, un service de disponibilité des données, est l'AVS phare conçu par Eigen Labs.",
    ],
    positioning: ["Pionnier et premier protocole de restaking par les dépôts ; en concurrence avec Symbiotic, Karak et des protocoles de staking de BTC comme Babylon."],
    team: ["Fondé par Sreeram Kannan (anciennement à l'Université de Washington) et construit par Eigen Labs ; l'Eigen Foundation gère le token EIGEN."],
  },
  technology: {
    blocks: [
      ["Les restakers délèguent à des opérateurs, qui adhèrent à des AVS ; les AVS définissent leurs propres tâches, récompenses et conditions de slashing."],
      [
        "Le slashing a été activé sur le réseau principal en 2025, avec les operator sets et l'allocation unique de la mise, de sorte que chaque AVS ne peut slasher que la mise qui lui est allouée.",
        "Le risque se cumule quand la même mise couvre de nombreux AVS ; la logique de slashing de chaque AVS doit être auditée avec soin.",
      ],
      ["L'EIGEN introduit un slashing « intersubjectif » : des fautes reconnues par les observateurs mais non prouvables on-chain peuvent être sanctionnées via un mécanisme de fork du token (bEIGEN)."],
      ["Concentration des opérateurs et dépendance à quelques grands protocoles de restaking liquide pour les dépôts."],
    ],
    limitations: [
      "Les récompenses des AVS ont souvent été payées en tokens plutôt qu'en frais, si bien que la demande réelle de sécurité économique reste naissante.",
      "La complexité rend l'évaluation du risque difficile pour les utilisateurs finaux.",
    ],
  },
  tokenomics: {
    supplyModelNote: "Offre initiale d'environ 1,67 milliard d'EIGEN, avec une inflation annuelle programmée (environ 4 %) utilisée pour les incitations au staking.",
    distribution: [{ label: "Stakedrops" }, { label: "Initiatives communautaires" }, { label: "Développement de l'écosystème" }, { label: "Investisseurs" }, { label: "Premiers contributeurs" }],
    distributionNote: "Allocation initiale publiée par l'Eigen Foundation (45 % pour la communauté).",
    utility: [
      "L'EIGEN est conçu comme un « token de travail intersubjectif universel » servant à sécuriser des tâches dont les fautes ne sont pas prouvables on-chain.",
      "L'EIGEN peut être restaké auprès des AVS aux côtés de l'ETH.",
    ],
    emissions: ["Des incitations programmées augmentent l'offre chaque année pour récompenser les stakers et les opérateurs."],
    vesting: ["Les premiers contributeurs, les investisseurs et les prestataires de la Fondation ont été bloqués un an après que l'EIGEN est devenu transférable ; 4 % de chaque allocation se sont débloqués à cette date anniversaire puis 4 % de plus chaque mois, si bien que ces allocations finissent de se débloquer environ deux ans plus tard, en 2027."],
    valueAccrual: ["La captation de valeur dépend du paiement par les AVS de frais de sécurité d'une manière qui crée une demande d'EIGEN ; ce lien n'est pas encore prouvé."],
  },
  adoption: {
    claims: [
      "EigenLayer détient des milliards de dollars d'actifs restakés (voir la TVL live).",
      "Les dépôts ont été fortement portés par les programmes de points et les tokens de restaking liquide ; la rétention après les incitations est la question clé.",
    ],
    metricsToWatch: ["Frais payés par les AVS", "Épisodes de slashing", "Tendance de la TVL restakée", "Usage d'EigenDA"],
  },
  financials: {
    relevantMetrics: [
      { label: "Frais des AVS", why: "La demande réelle de sécurité partagée." },
      { label: "Récompenses payées en émissions face aux frais", why: "La soutenabilité des rendements." },
    ],
    claims: ["Les frais enregistrés par DefiLlama sont faibles par rapport à la TVL ; l'essentiel du rendement du restaking à ce jour a été porté par les incitations."],
  },
  onchain: {
    claims: ["Les délégations aux opérateurs et les enregistrements d'AVS sont on-chain ; la concentration de l'ETH restaké via les protocoles de restaking liquide est visible."],
    dataAvailability: "Des analyses des récompenses et du slashing par AVS sont prévues en phase 2.",
  },
  competitors: {
    columns: [
      {
        technology: "Restaking d'ETH, operator sets, slashing intersubjectif",
        adoption: "Plus grande TVL de restaking",
        tokenomics: "EIGEN inflationniste",
        economics: "Frais faibles face à la TVL",
        strengths: "Premier entrant, EigenDA",
        weaknesses: "Demande de frais non prouvée",
        positioning: "Cloud vérifiable et sécurité partagée",
      },
      {
        technology: "Ouvert à tous, garantie multi-actifs",
        adoption: "En croissance",
        tokenomics: "n/a",
        economics: "Stade précoce",
        strengths: "Flexibilité",
        weaknesses: "Plus jeune",
        positioning: "Restaking modulaire",
      },
      {
        technology: "Staking natif de BTC",
        adoption: "D'importants dépôts de BTC",
        tokenomics: "BABY",
        economics: "Stade précoce",
        strengths: "Mobilise du BTC inactif",
        weaknesses: "Nouveau modèle de sécurité",
        positioning: "Sécurité partagée pour Bitcoin",
      },
    ],
  },
  risks: [
    ["Logique de slashing et de délégation complexe ; mécanisme récent avec peu d'historique en période de tension."],
    ["Rendements largement financés par les émissions ; risque de fuite des capitaux à la fin des incitations."],
    ["Des produits dérivés du staking inédits, à la qualification incertaine."],
    ["L'Eigen Foundation et Eigen Labs conservent un fort contrôle sur les mises à jour."],
    ["Les positions restakées et les tokens de restaking liquide peuvent subir des délais de retrait en période de tension."],
    ["Concentration des opérateurs et des intermédiaires de restaking liquide."],
    ["Plusieurs protocoles de restaking bien financés se disputent les mêmes AVS."],
  ],
  thesis: {
    bull: ["Un véritable marché des services hors chaîne vérifiables émerge et paie pour la sécurité, ce qui crée une demande d'ETH restaké et d'EIGEN."],
    neutral: ["EigenLayer reste une grande destination de dépôts, mais les frais des AVS restent modestes."],
    bear: ["Les rendements du restaking s'effondrent à mesure que les émissions baissent ; la TVL migre.", "Un épisode de slashing en cascade entame la confiance."],
    catalysts: ["Slashing activé sur le réseau principal en 2025.", "De grands AVS qui paient des frais significatifs."],
    assumptions: ["Les middlewares préfèrent louer la sécurité plutôt que constituer la leur.", "Les règles de slashing fonctionnent comme prévu en période de tension."],
    monitor: ["Revenus de frais des AVS", "Rythme des émissions", "Incidents de slashing", "TVL face aux concurrents"],
    invalidation: ["Les frais des AVS restent négligeables après la réduction des incitations", "Une perte majeure due au slashing ou à une défaillance de contrat"],
  },
  framework: [
    { summary: "Système de slashing innovant mais jeune.", dataUsed: ["Documentation", "Livre blanc"], limitations: "Peu d'historique en période de tension." },
    { summary: "Token inflationniste avec une large allocation aux initiés.", dataUsed: ["Présentation du token"], limitations: "Détails des déblocages à vérifier." },
    { summary: "Une TVL importante, portée par les incitations.", dataUsed: ["DefiLlama"], limitations: "Demande organique incertaine." },
    { summary: "Données de frais trop minces pour une notation.", dataUsed: ["Frais DefiLlama"], limitations: "Revenus des AVS pas encore significatifs." },
    { summary: "Pilotage par la Fondation.", dataUsed: ["Documentation"], limitations: "Qualitatif." },
    { summary: "Premier entrant dans un domaine encombré.", dataUsed: ["Revue du marché"], limitations: "Qualitatif." },
    { summary: "Risques de slashing empilés et risques économiques.", dataUsed: ["Revue des risques"], limitations: "Qualitatif." },
  ],
  sources: [
    { supports: "Conception du restaking." },
    { supports: "Restakers, opérateurs, AVS." },
    { supports: "Operator sets, mise unique, slashing.", limitations: "Documentation réorganisée sous EigenCloud." },
    { supports: "AVS de disponibilité des données." },
    { supports: "Slashing intersubjectif et conception du token." },
    { supports: "Allocation et incitations." },
    { supports: "Offre initiale, allocation et calendrier de déblocage des premiers contributeurs et des investisseurs." },
    { supports: "Données de marché live : prix, capitalisation, FDV, offre en circulation et offre totale.", limitations: "Agrégateur ; les chiffres d'offre dépendent des déclarations des émetteurs et de la méthodologie de CoinGecko." },
    { supports: "Chiffres de TVL, de frais et de revenus.", limitations: "Adaptateurs open source ; la méthodologie diffère selon les protocoles et peut être révisée." },
  ],
};
