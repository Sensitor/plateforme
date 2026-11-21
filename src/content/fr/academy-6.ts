import type { ConceptText, DeepText } from "@/lib/academy/localized";

/** Traduction française : oracles et staking liquide. Mêmes faits et même structure que la version anglaise. */

export const TEXT_6: Record<string, ConceptText> = {
  oracles: {
    title: "Oracles",
    summary: "Des services qui apportent des données externes, comme le prix des actifs, sur les blockchains.",
    body: [
      "Les blockchains ne peuvent pas lire nativement le monde extérieur. Les oracles agrègent des données issues de plusieurs sources et les publient on-chain pour que les smart contracts puissent s'en servir, le plus souvent des prix pour les liquidations des protocoles de prêt et pour les produits dérivés.",
      "Les défaillances ou manipulations d'oracles sont l'une des principales causes de pertes dans la DeFi : un prix erroné peut déclencher des liquidations injustes ou permettre à des attaquants d'emprunter contre une garantie surévaluée.",
      "Évaluez un oracle d'après ses sources de données, l'ensemble de ses opérateurs de nœuds, sa fréquence de mise à jour et la valeur que ses flux sécurisent.",
    ],
    keyTakeaways: ["La DeFi dépend de données externes fiables", "La manipulation des prix est un vecteur d'attaque majeur", "Regardez les sources, les opérateurs et la valeur sécurisée"],
  },
  "liquid-staking": {
    title: "Staking liquide",
    summary: "Staker via un protocole qui émet un token négociable représentant la position stakée.",
    body: [
      "Le staking natif bloque les tokens. Les protocoles de staking liquide stakent pour le compte de l'utilisateur et émettent un token de staking liquide (LST), comme le stETH, qui accumule les récompenses et peut être utilisé dans la DeFi.",
      "Les LST ajoutent des couches de risque : le risque lié aux smart contracts, le risque lié aux opérateurs de nœuds, et le risque que le LST s'échange sous sa valeur sous-jacente en période de stress, quand les retraits sont en file d'attente.",
      "Un fournisseur de staking liquide dominant peut aussi concentrer la mise d'un réseau, ce qui pose un problème de décentralisation pour la chaîne sous-jacente.",
    ],
    keyTakeaways: ["De la liquidité par-dessus le staking", "Les LST peuvent perdre leur parité sous tension", "La concentration des parts de marché compte"],
  },
};

export const DEEP_6: Record<string, DeepText> = {
  oracles: {
    minute:
      "Les blockchains ne voient pas le monde extérieur. Un oracle va chercher des données comme le prix des actifs auprès de sources externes, s'accorde sur une valeur et la publie on-chain pour que les smart contracts puissent l'utiliser. L'essentiel de la DeFi, du prêt aux dérivés, dépend de l'exactitude de ces prix.",
    steps: [
      { title: "Collecter les données", text: "Des opérateurs de nœuds indépendants récupèrent la même donnée, par exemple le prix ETH/USD, auprès de nombreuses sources comme les plateformes d'échange et les agrégateurs de données de marché." },
      { title: "S'accorder hors chaîne", text: "Les nœuds combinent leurs observations, en général en prenant la médiane pour que quelques mauvaises valeurs ne puissent pas déplacer le résultat, et signent un rapport unique. L'Off-Chain Reporting de Chainlink fonctionne ainsi." },
      { title: "Publier on-chain", text: "Le rapport est écrit dans un contrat de flux. Les flux « push » se mettent à jour quand le prix bouge au-delà d'un seuil d'écart ou quand un intervalle maximal (heartbeat) est écoulé ; les oracles « pull » permettent à une application de récupérer un prix signé au moment où elle en a besoin." },
      { title: "Consommer", text: "Les marchés de prêt, les plateformes de perpétuels et les stablecoins lisent le flux pour valoriser les garanties, déclencher des liquidations ou régler des transactions." },
      { title: "Vérifier la fraîcheur", text: "Les protocoles bien conçus vérifient l'âge des données et se mettent en pause ou basculent vers une source de secours quand un flux cesse d'être mis à jour." },
    ],
    visualCaption: "Comment un prix parvient à un smart contract, et ce qui le rend robuste.",
    flow: {
      nodes: [
        { title: "Sources de données", text: "Les plateformes d'échange et les agrégateurs publient des prix." },
        { title: "Opérateurs de nœuds", text: "Chaque nœud récupère et signe son observation." },
        { title: "Agrégation", text: "La médiane des observations, dans un rapport signé." },
        { title: "Flux on-chain", text: "Mis à jour sur un écart de prix ou un heartbeat." },
        { title: "Applications", text: "Le prêt, les perpétuels et les stablecoins lisent le prix." },
      ],
      outcomes: {
        positive: "De nombreuses sources et de nombreux opérateurs indépendants : une valeur erronée ne peut pas déplacer le prix.",
        negative: "Une seule source ou un marché peu liquide : un attaquant peut déplacer la donnée d'entrée et vider un protocole.",
      },
    },
    example: {
      title: "Chainlink, et les protocoles qui en dépendent",
      paragraphs: [
        "Les Data Feeds de Chainlink agrègent les prix de plusieurs opérateurs de nœuds et sources de données indépendants dans des contrats de référence on-chain. L'ensemble des nœuds de chaque flux est sélectionné plutôt qu'ouvert : sa décentralisation est réelle mais limitée, comme le note le dossier.",
        "Aave s'appuie sur les flux de prix de Chainlink pour la plupart de ses marchés. Un prix erroné frapperait directement les liquidations d'Aave : c'est pourquoi le dossier Aave en fait une dépendance externe importante et le Knowledge Graph représente ce lien.",
      ],
    },
    metrics: [
      { label: "Valeur sécurisée", read: "La valeur des protocoles qui s'appuient sur un flux. Plus la valeur qui en dépend est grande, plus la récompense d'une attaque est élevée." },
      { label: "Opérateurs et sources", read: "Combien d'opérateurs de nœuds et de sources de données indépendants contribuent, et qui ils sont." },
      { label: "Règles de mise à jour", read: "Le seuil d'écart et le heartbeat. Des données périmées dans un marché qui bouge vite, c'est ainsi que beaucoup de liquidations tournent mal." },
      { label: "Historique", read: "Les incidents et erreurs de prix passés, et la rapidité avec laquelle ils ont été détectés et traités." },
    ],
    misconceptions: [
      { myth: "Un oracle, c'est un prix pris sur une seule plateforme d'échange.", reality: "Les oracles robustes agrègent de nombreuses sources et de nombreux opérateurs. Les flux de prix à source unique sont précisément ceux que visent les attaquants." },
      { myth: "Un oracle décentralisé rend le protocole sûr.", reality: "Le prix correct d'un actif peu liquide peut toujours être manipulé à la source. Les protocoles ont aussi besoin de plafonds d'emprunt et de garanties liquides." },
      { myth: "Les oracles ne fournissent que des prix.", reality: "Ils fournissent aussi de l'aléa vérifiable, des preuves de réserves, des messages entre chaînes et du calcul hors chaîne." },
    ],
    risks: [
      "La manipulation du marché sous-jacent, par exemple avec un flash loan sur un pool peu liquide.",
      "Des prix périmés pendant une volatilité extrême ou une congestion du réseau.",
      "De nombreux protocoles qui dépendent du même réseau d'oracles, ce qui concentre le risque.",
    ],
    quiz: [
      {
        question: "Pourquoi les blockchains ont-elles besoin d'oracles ?",
        options: ["Pour accélérer les transactions", "Parce que les smart contracts ne peuvent pas lire de données extérieures à leur propre chaîne", "Pour stocker les clés privées en sécurité", "Pour miner de nouveaux blocs"],
        explanation: "Une blockchain ne connaît que son propre état ; les prix et autres faits externes doivent être apportés on-chain par un oracle.",
      },
      {
        question: "Pourquoi les réseaux d'oracles utilisent-ils souvent la médiane de nombreuses observations ?",
        options: ["Elle est moins coûteuse à calculer qu'une moyenne", "Pour que quelques valeurs erronées ou manipulées ne puissent pas déplacer le résultat", "Parce que les plateformes d'échange l'exigent", "Pour cacher les sources de données"],
        explanation: "Avec une médiane, un attaquant devrait corrompre la plupart des observations, pas une seule, pour déplacer le prix publié.",
      },
      {
        question: "Un flux « push » se met à jour sur écart ou sur heartbeat. Qu'est-ce que cela signifie ?",
        options: ["Il ne se met à jour que lorsque les utilisateurs votent", "Il publie une nouvelle valeur quand le prix bouge de plus d'un pourcentage fixé, ou quand une durée maximale est écoulée", "Il se met à jour une fois par semaine", "Il se met à jour à chaque bloc quoi qu'il arrive"],
        explanation: "Le seuil d'écart capte les mouvements rapides ; le heartbeat garantit une valeur fraîche même quand le marché est calme.",
      },
    ],
  },
  "liquid-staking": {
    minute:
      "Le staking liquide permet de staker sans bloquer ses tokens. Un protocole met les dépôts en commun, les stake via des opérateurs de nœuds professionnels et vous remet un token liquide, comme le stETH, qui suit votre mise plus les récompenses et peut être échangé ou utilisé en garantie.",
    steps: [
      { title: "Déposer", text: "Les utilisateurs déposent de l'ETH, quel que soit le montant, sans faire tourner de validateur ni détenir les 32 ETH nécessaires pour en activer un." },
      { title: "Répartir entre opérateurs", text: "Le protocole répartit les dépôts entre des opérateurs de nœuds qui font tourner des validateurs. Le Staking Router de Lido prend en charge des opérateurs sélectionnés, un module communautaire ouvert à tous et la technologie de validateurs distribués." },
      { title: "Émettre le token liquide", text: "Les déposants reçoivent un token de staking liquide. Le solde de stETH augmente chaque jour à mesure que des oracles rapportent les récompenses des validateurs ; les versions « wrapped » comme le wstETH voient plutôt leur valeur par token augmenter." },
      { title: "L'utiliser", text: "Le token peut être conservé, échangé ou déposé en garantie dans la DeFi pendant que l'ETH sous-jacent continue de rapporter des récompenses de staking." },
      { title: "Sortir", text: "Les détenteurs se font rembourser via la file de retrait du protocole, ou vendent sur le marché, parfois avec une décote quand beaucoup veulent sortir en même temps." },
    ],
    visualCaption: "D'un dépôt à un token liquide : chaque case est aussi une couche de risque.",
    flow: {
      nodes: [
        { title: "Déposer de l'ETH", text: "N'importe quel montant, aucun validateur à faire tourner." },
        { title: "Pool du protocole", text: "Dépôts répartis par le staking router." },
        { title: "Opérateurs de nœuds", text: "Font tourner les validateurs et touchent les récompenses." },
        { title: "Token liquide", text: "Suit la mise plus les récompenses." },
        { title: "Utiliser ou sortir", text: "Garantie, échange, ou file de retrait." },
      ],
      outcomes: {
        positive: "Des récompenses de staking sans immobiliser de capital, utilisables dans toute la DeFi.",
        negative: "Des couches de risque supplémentaires : contrats, opérateurs, rapports d'oracles, et un prix de marché qui peut glisser sous l'ETH sous-jacent.",
      },
    },
    example: {
      title: "Lido : effets de réseau et concentration",
      paragraphs: [
        "Lido est le plus grand protocole de staking liquide d'Ethereum. Son token, détenu en stETH ou « wrappé » en wstETH, est le token de staking liquide le plus intégré comme garantie dans la DeFi, un effet de réseau que le dossier identifie comme le principal avantage de Lido.",
        "Ce même succès pose une question de décentralisation : la part importante d'ETH staké détenue via Lido concentre du poids dans le consensus. Lido l'atténue avec de nombreux opérateurs indépendants, des modules ouverts à tous et un dispositif de Dual Governance censé permettre aux détenteurs de stETH de retarder les décisions de la DAO.",
      ],
    },
    metrics: [
      { label: "Part de l'ETH staké", read: "La part de marché du protocole. Au-delà d'un tiers de la mise totale, un seul système pourrait perturber la finalité s'il tombait en panne ou se comportait mal." },
      { label: "Prix de marché face à la valeur de remboursement", read: "Une décote signale une pression à la sortie ou des doutes. Elle compte surtout pour les positions qui utilisent le token en garantie." },
      { label: "File de retrait", read: "Le temps que prennent les remboursements. Une longue file pousse les détenteurs impatients à vendre sur le marché." },
      { label: "Ensemble des opérateurs", read: "Nombre et indépendance des opérateurs de nœuds, et part ouverte aux opérateurs sans autorisation." },
    ],
    misconceptions: [
      { myth: "Un stETH vaut toujours exactement un ETH.", reality: "Il est remboursable via le protocole, mais sur le marché il peut s'échanger avec une décote quand les sorties s'accumulent ou que la confiance baisse." },
      { myth: "Le staking liquide supprime le risque du staking.", reality: "Le slashing, les défaillances d'opérateurs et les bugs de contrats s'appliquent toujours, en plus des risques propres au token liquide." },
      { myth: "Les détenteurs de LDO touchent les frais de staking.", reality: "La part des frais revenant au protocole va à la trésorerie de la DAO ; le LDO donne des droits de vote, pas un droit direct sur les revenus." },
    ],
    risks: [
      "La concentration de la mise d'un réseau dans un seul protocole.",
      "Des décotes et des liquidations forcées quand le token est utilisé dans des boucles à effet de levier.",
      "Les mises à jour de gouvernance, les erreurs de rapport des oracles et le slashing des opérateurs.",
    ],
    quiz: [
      {
        question: "Que représente un token de staking liquide ?",
        options: ["Un vote de gouvernance dans Ethereum", "Une créance transférable sur des tokens stakés plus les récompenses accumulées", "Un prêt du protocole", "Une part de la société du protocole"],
        explanation: "Le token représente votre part du pool staké, récompenses comprises, et peut circuler librement pendant que la mise reste bloquée.",
      },
      {
        question: "Pourquoi le stETH peut-il s'échanger sous l'ETH sur le marché ?",
        options: ["Parce qu'il ne verse aucune récompense", "Quand beaucoup de détenteurs veulent sortir plus vite que la file de retrait ne le permet", "Parce qu'il n'est pas adossé à de l'ETH", "Parce qu'Ethereum plafonne son prix"],
        explanation: "Les vendeurs sur le marché acceptent une décote pour éviter d'attendre dans la file, surtout en période de stress.",
      },
      {
        question: "Pourquoi un protocole de staking liquide dominant pose-t-il problème à Ethereum ?",
        options: ["Il fait monter les frais de gas", "Il concentre une grande part du poids dans le consensus dans un seul système", "Il émet de nouveaux ETH", "Il empêche les retraits"],
        explanation: "Si un seul système contrôle une grande part de la mise, sa défaillance ou sa prise de contrôle pourrait affecter le consensus de tout le réseau.",
      },
    ],
  },
};
