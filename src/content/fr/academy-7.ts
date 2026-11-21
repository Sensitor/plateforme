import type { ConceptText, DeepText } from "@/lib/academy/localized";

/** Traduction française : restaking et MEV. Mêmes faits et même structure que la version anglaise. */

export const TEXT_7: Record<string, ConceptText> = {
  restaking: {
    title: "Restaking",
    summary: "Réutiliser des actifs stakés pour sécuriser des services supplémentaires, en échange de récompenses et d'un risque de slashing supplémentaires.",
    body: [
      "Les protocoles de restaking permettent aux stakers de choisir de sécuriser d'autres services, couches de disponibilité des données, oracles, bridges, avec la même garantie. Ces services versent des récompenses et peuvent définir des conditions de slashing.",
      "L'attrait est la sécurité partagée : les nouveaux services n'ont pas besoin de constituer leur propre ensemble de validateurs. Le risque est que la même garantie couvre de nombreuses obligations, si bien qu'une défaillance dans un service peut se propager.",
      "Questions clés : les récompenses sont-elles payées par de vrais frais ou par des émissions de tokens ? Comment les conditions de slashing sont-elles définies et arbitrées ?",
    ],
    keyTakeaways: ["Une sécurité partagée pour les nouveaux services", "Des risques de slashing qui s'empilent", "Vérifiez si les récompenses sont réelles ou des émissions"],
  },
  mev: {
    title: "MEV (valeur extractible maximale)",
    summary: "La valeur que les producteurs de blocs peuvent capter en incluant, excluant ou réordonnant des transactions.",
    body: [
      "Comme les producteurs de blocs choisissent l'ordre des transactions, eux-mêmes (ou des searchers spécialisés qui les paient) peuvent tirer profit d'arbitrages, de liquidations ou de transactions passées juste avant celles des utilisateurs (front-running).",
      "La MEV est un coût caché pour les utilisateurs et une source de revenus pour les validateurs. Sa répartition façonne les incitations : si quelques builders captent l'essentiel de la MEV, la production de blocs se centralise.",
      "Parmi les remèdes : le flux d'ordres privé, les enchères par lots, les mempools chiffrés et les enchères au niveau du protocole qui redirigent la MEV vers le protocole ou les utilisateurs.",
    ],
    keyTakeaways: ["Le pouvoir d'ordonner crée de la valeur", "Un coût caché pour les traders", "Peut centraliser la production de blocs"],
  },
};

export const DEEP_7: Record<string, DeepText> = {
  restaking: {
    minute:
      "Le restaking permet aux stakers de réutiliser la même garantie stakée pour sécuriser des services supplémentaires, comme des couches de disponibilité des données ou des oracles, en échange de récompenses supplémentaires. Les nouveaux services louent une sécurité économique existante au lieu de bâtir la leur, mais chaque service ajouté apporte une nouvelle façon d'être slashé.",
    steps: [
      { title: "Partir d'ETH staké", text: "Les restakers utilisent de l'ETH déjà staké, nativement ou via un token de staking liquide." },
      { title: "Adhérer", text: "Ils le déposent dans un protocole de restaking comme EigenLayer et acceptent des conditions supplémentaires." },
      { title: "Déléguer", text: "Ils choisissent un opérateur qui fait tourner le logiciel des services à sécuriser, appelés AVS (actively validated services, services validés activement)." },
      { title: "Sécuriser des services", text: "Les opérateurs accomplissent des tâches pour les AVS auxquels ils adhèrent. Chaque AVS définit ses propres tâches, récompenses et conditions de slashing." },
      { title: "Gagner ou être slashé", text: "Les récompenses viennent des AVS ; les fautes prouvables peuvent être slashées. Depuis 2025 sur EigenLayer, chaque AVS ne peut slasher que la mise qui lui est allouée." },
    ],
    visualCaption: "Une seule mise, plusieurs obligations : le restaking empile les récompenses et les risques.",
    flow: {
      nodes: [
        { title: "ETH staké", text: "Mise native ou token de staking liquide." },
        { title: "Protocole de restaking", text: "Accepte des conditions de slashing supplémentaires." },
        { title: "Opérateur", text: "Fait tourner le logiciel des services." },
        { title: "Services (AVS)", text: "Disponibilité des données, oracles, bridges et plus encore." },
      ],
      outcomes: {
        positive: "Les nouveaux services se lancent avec une sécurité empruntée au lieu de constituer leur propre ensemble de validateurs.",
        negative: "La même mise couvre plusieurs obligations : une faute ou un bug dans un service peut coûter aux restakers plus qu'ils ne gagnent.",
      },
    },
    example: {
      title: "EigenLayer : la sécurité partagée en pratique",
      paragraphs: [
        "EigenLayer a été le pionnier du restaking. Les restakers délèguent à des opérateurs, qui adhèrent à des AVS ; EigenDA, un service de disponibilité des données conçu par Eigen Labs, en est le produit phare. Le slashing est entré en service sur le réseau principal en 2025, avec les operator sets et l'allocation unique de la mise.",
        "Le dossier signale deux questions ouvertes : les récompenses des AVS ont souvent été payées en tokens plutôt qu'en frais, si bien que la demande réelle de sécurité économique reste naissante, et la complexité des conditions empilées rend le risque difficile à évaluer pour les utilisateurs finaux.",
      ],
    },
    metrics: [
      { label: "Origine des récompenses", read: "Des frais payés par des services qui ont besoin de sécurité, ou des émissions de tokens. Seule la première est durable." },
      { label: "Conditions de slashing", read: "Si elles sont définies, auditées et en service, et qui décide qu'une faute a eu lieu." },
      { label: "Concentration des opérateurs", read: "La part de la valeur restakée déléguée aux plus gros opérateurs." },
      { label: "Allocation de la mise par service", read: "La part de la mise que chaque service peut slasher. Elle borne la perte due à une défaillance isolée." },
    ],
    misconceptions: [
      { myth: "Le restaking multiplie le rendement sans risque supplémentaire.", reality: "Chaque service ajoute des conditions de slashing et un risque de contrat ; le rendement supplémentaire rémunère ce risque." },
      { myth: "L'ETH restaké rend Ethereum plus sûr.", reality: "Il sécurise des services supplémentaires. La sécurité d'Ethereum lui-même vient de la mise sous-jacente." },
      { myth: "Les tokens de restaking liquide sont aussi liquides que l'ETH.", reality: "Leur profondeur de marché peut être faible, et les sorties passent par plusieurs protocoles et files d'attente." },
    ],
    risks: [
      "Des slashings en cascade quand une même mise couvre de nombreux services.",
      "Une complexité qui masque le risque réel aux utilisateurs finaux.",
      "Des récompenses financées par des émissions qui pourraient ne pas durer.",
    ],
    quiz: [
      {
        question: "Que permet le restaking à un nouveau service ?",
        options: ["Émettre de l'ETH", "Utiliser une garantie stakée existante comme sécurité au lieu de constituer son propre ensemble de validateurs", "Se passer de smart contracts", "Éviter les audits"],
        explanation: "La sécurité partagée permet à un service de louer le poids économique d'une mise existante.",
      },
      {
        question: "Pourquoi le restaking ajoute-t-il du risque pour les stakers ?",
        options: ["Il réduit les récompenses d'Ethereum", "La même mise peut être slashée selon les règles de chaque service ajouté", "Il bloque l'ETH pour toujours", "Il supprime le droit de retrait"],
        explanation: "Chaque service sécurisé par une mise ajoute ses propres conditions pour perdre une partie de cette mise.",
      },
      {
        question: "Quelle question révèle le mieux si la demande de restaking est durable ?",
        options: ["Combien d'abonnés compte le projet", "Les récompenses sont-elles payées par de vrais frais ou par des émissions de tokens ?", "Quel est le plus haut historique du token ?", "Combien de chaînes il prend en charge"],
        explanation: "Des frais montrent que des services paient vraiment pour la sécurité ; des émissions montrent seulement que quelqu'un la subventionne.",
      },
    ],
  },
  mev: {
    minute:
      "Celui qui ordonne les transactions d'un bloc peut tirer profit de cet ordre. La MEV, valeur extractible maximale, est la valeur captée en incluant, excluant ou réordonnant des transactions : arbitrage entre marchés, liquidations, et parfois des transactions placées autour de la vôtre pour dégrader votre prix.",
    steps: [
      { title: "Une salle d'attente publique", text: "Les transactions en attente patientent dans une mempool publique, visibles par tous avant d'être incluses dans un bloc." },
      { title: "Searchers", text: "Des bots spécialisés scrutent les transactions en attente et l'état des marchés à la recherche d'opportunités rentables, puis préparent des lots (bundles) de transactions dans un ordre précis." },
      { title: "Builders", text: "Les constructeurs de blocs assemblent le bloc le plus rentable à partir des transactions des utilisateurs et des bundles des searchers, puis enchérissent pour qu'il soit proposé." },
      { title: "Proposeurs", text: "Sur Ethereum, la plupart des validateurs utilisent MEV-Boost pour recevoir des blocs des builders via des relais et retenir l'offre la plus élevée, ce qui sépare la construction d'un bloc de sa proposition." },
      { title: "Qui garde la valeur", text: "La valeur passe des utilisateurs aux searchers, aux builders et aux validateurs. Certaines applications et certains rollups mettent désormais aux enchères le droit d'ordonner pour en conserver une partie." },
    ],
    visualCaption: "Une attaque sandwich, étape par étape, et la chaîne d'acteurs qui la rend possible.",
    flow: {
      nodes: [
        { title: "Votre swap", text: "Envoyé dans la mempool publique." },
        { title: "Searcher", text: "Le repère et prépare un achat avant et une vente après." },
        { title: "Bundle", text: "Des transactions ordonnées plus un paiement au builder." },
        { title: "Builder", text: "Assemble le bloc le plus rentable." },
        { title: "Proposeur", text: "Retient le bloc qui paie le plus." },
      ],
      outcomes: {
        positive: "L'arbitrage et les liquidations maintiennent les prix alignés entre plateformes et les prêts solvables.",
        negative: "Les attaques sandwich et le front-running dégradent l'exécution des utilisateurs, un coût caché.",
      },
    },
    example: {
      title: "Qui capte la valeur de l'ordre des transactions ?",
      paragraphs: [
        "Sur Ethereum, les frais de priorité et la MEV reviennent aux validateurs, comme le note le dossier. Un petit nombre de builders spécialisés produit la plupart des blocs, ce qui soulève des inquiétudes de concentration dans la construction des blocs.",
        "Les rollups font face à la même question avec leur séquenceur. Timeboost, sur Arbitrum, met aux enchères un court avantage de temps dans l'ordre des transactions, et ses revenus vont à la trésorerie de la DAO : une tentative explicite de capter la MEV au niveau du protocole.",
      ],
    },
    metrics: [
      { label: "Tolérance de slippage", read: "Le mouvement de prix maximal que vous acceptez sur un swap. Il plafonne ce qu'un sandwich peut vous prendre." },
      { label: "Concentration des builders", read: "La part des blocs produits par les plus gros builders. Une forte concentration crée des risques de censure et de dépendance." },
      { label: "Flux d'ordres privé", read: "Les transactions envoyées par des canaux privés ou des systèmes d'intentions n'apparaissent jamais dans la mempool publique." },
      { label: "MEV rendue aux utilisateurs ou aux protocoles", read: "Les remboursements, enchères et redistributions montrent quelle part de la valeur est récupérée plutôt qu'extraite." },
    ],
    misconceptions: [
      { myth: "La MEV n'est qu'un vol commis par les producteurs de blocs.", reality: "Une partie de la MEV, comme l'arbitrage et les liquidations, rend les marchés efficaces. La partie nuisible extrait de la valeur des transactions des utilisateurs eux-mêmes." },
      { myth: "Payer des frais plus élevés protège ma transaction.", reality: "Un pourboire plus élevé achète la priorité, pas la protection : un searcher peut toujours placer des transactions autour de la vôtre. L'envoi privé et des limites de slippage serrées aident davantage." },
      { myth: "La MEV n'existe que sur Ethereum.", reality: "Tout système où quelqu'un ordonne les transactions a de la MEV, y compris les rollups dotés d'un séquenceur unique." },
    ],
    risks: [
      "Des coûts cachés pour les utilisateurs, via une moins bonne exécution.",
      "La concentration de la construction des blocs entre quelques builders et relais.",
      "Des incitations à censurer ou réordonner des transactions quand la valeur extractible est importante.",
    ],
    quiz: [
      {
        question: "D'où vient la MEV ?",
        options: ["Des prix élevés des tokens", "Du pouvoir de choisir et d'ordonner les transactions d'un bloc", "Des audits de smart contracts", "Des frais de réseau bas"],
        explanation: "Le pouvoir d'ordonner permet au producteur du bloc, ou à ceux qui le paient, de capter de la valeur grâce à la séquence des transactions.",
      },
      {
        question: "Comment fonctionne une attaque sandwich ?",
        options: ["Elle répartit une transaction entre deux plateformes d'échange", "L'attaquant achète juste avant la transaction d'un utilisateur et vend juste après, en profitant du mouvement de prix que l'utilisateur provoque", "Elle retarde une transaction jusqu'à ce que les frais baissent", "Elle annule la transaction d'un utilisateur"],
        explanation: "La transaction de l'utilisateur pousse le prix ; l'attaquant se positionne avant et sort après, aux dépens de l'utilisateur.",
      },
      {
        question: "Quel réglage limite le plus directement ce qu'un sandwich peut prendre sur votre swap ?",
        options: ["Une limite de gas plus élevée", "Une tolérance de slippage serrée", "Une transaction plus grosse", "L'usage d'un hardware wallet"],
        explanation: "Avec une faible tolérance de slippage, la transaction est annulée si le prix est trop poussé, ce qui supprime l'essentiel du profit de l'attaquant.",
      },
    ],
  },
};
