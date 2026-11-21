import type { ConceptText, DeepText } from "@/lib/academy/localized";

/** Traduction française : diversification et corrélation, drawdowns et volatilité. Mêmes faits et même structure que la version anglaise. */

export const TEXT_13: Record<string, ConceptText> = {
  diversification: {
    title: "Diversification et corrélation",
    summary: "Répartir son exposition entre des actifs qui ne bougent pas ensemble, plus difficile qu'il n'y paraît dans la crypto.",
    body: [
      "La plupart des actifs crypto sont fortement corrélés à Bitcoin, surtout lors des ventes massives. Détenir dix tokens du même écosystème peut apporter bien moins de diversification qu'il n'y paraît.",
      "Les dépendances cachées comptent aussi : beaucoup de tokens DeFi dépendent de la même chaîne, du même oracle ou du même stablecoin. Une défaillance de l'une de ces dépendances peut toucher plusieurs positions à la fois.",
      "L'exposition aux stablecoins, les limites par position et l'équilibre entre secteurs sont des outils de base pour maîtriser la concentration.",
    ],
    keyTakeaways: ["Les corrélations montent lors des krachs", "Les dépendances communes concentrent le risque", "Les limites par position sont un garde-fou simple"],
  },
  drawdowns: {
    title: "Drawdowns et volatilité",
    summary: "La profondeur et la durée possibles des pertes, un contexte essentiel pour dimensionner ses positions.",
    body: [
      "Un drawdown est la baisse entre un sommet et un creux. Les actifs crypto ont historiquement connu des drawdowns de 70 à 90 % lors des marchés baissiers, et beaucoup de tokens n'ont jamais retrouvé leurs plus hauts précédents.",
      "Se remettre d'une perte exige un gain plus important : une perte de 50 % demande un gain de 100 % pour revenir à l'équilibre ; une perte de 80 % demande 400 %.",
      "Dimensionner ses positions pour qu'un drawdown réaliste reste supportable, financièrement et psychologiquement, est le fondement de la gestion du risque.",
    ],
    keyTakeaways: ["Les drawdowns profonds sont normaux dans la crypto", "Les pertes se cumulent de façon asymétrique", "Dimensionnez vos positions pour le pire scénario"],
  },
};

export const DEEP_13: Record<string, DeepText> = {
  diversification: {
    minute:
      "Diversifier, c'est détenir des actifs qui ne bougent pas tous ensemble, pour qu'une perte puisse être compensée par un gain ailleurs. Dans la crypto, c'est plus difficile qu'il n'y paraît : la plupart des tokens suivent Bitcoin, surtout lors des ventes massives, et beaucoup partagent les mêmes chaînes, oracles ou stablecoins.",
    steps: [
      { title: "Corrélation", text: "Un nombre compris entre -1 et +1 qui décrit à quel point les rendements de deux actifs évoluent ensemble. À +1, ils bougent exactement de concert ; à 0, ils n'ont aucun lien." },
      { title: "Volatilité du portefeuille", text: "Combiner des actifs dont la corrélation est inférieure à +1 donne un portefeuille moins volatil que la moyenne pondérée de ses composantes." },
      { title: "Corrélations dans la crypto", text: "La plupart des grands tokens sont fortement corrélés à Bitcoin : dix tokens peuvent se comporter quasiment comme une seule position." },
      { title: "Dépendances cachées", text: "Des protocoles qui reposent sur la même chaîne, le même oracle, le même bridge ou le même stablecoin peuvent faire défaut ensemble, même si leurs prix divergent d'ordinaire." },
      { title: "Outils pratiques", text: "Des limites par position, une allocation en stablecoins ou en liquidités, l'équilibre entre secteurs et un rééquilibrage périodique sont des moyens simples de maîtriser la concentration." },
    ],
    visualCaption: "Essayez : baissez la corrélation et regardez la volatilité du portefeuille passer sous la moyenne des deux actifs. Données fictives.",
    example: {
      title: "Les dépendances dans la couverture",
      paragraphs: [
        "Le Knowledge Graph de Sensitor représente les dépendances entre les projets couverts : Aave s'appuie sur les flux de prix de Chainlink, Arbitrum et OP Mainnet règlent sur Ethereum, Lido et EigenLayer reposent sur de l'ETH staké. Trois positions dans ce groupe sont en partie un seul pari sur l'écosystème Ethereum.",
        "La page Portefeuille applique cette idée à vos propres avoirs : en plus de l'allocation par actif et par secteur, elle montre les écosystèmes, les dépendances communes, un indice de concentration et la corrélation des rendements quotidiens entre vos positions.",
      ],
    },
    metrics: [
      { label: "Corrélation avec Bitcoin", read: "La part de chaque position qui suit simplement le marché. Des valeurs élevées signifient peu de diversification." },
      { label: "Poids de la plus grosse position", read: "Une position unique qui dépasse une part fixée du portefeuille en domine le résultat." },
      { label: "Exposition par écosystème", read: "La part du portefeuille qui dépend d'une seule chaîne ou d'un seul fournisseur d'infrastructure." },
      { label: "Indice de concentration", read: "La somme des poids au carré (HHI). La page Portefeuille le calcule ; plus il est élevé, plus le portefeuille est concentré." },
    ],
    misconceptions: [
      { myth: "Détenir beaucoup de tokens, c'est être diversifié.", reality: "S'ils suivent tous Bitcoin ou dépendent de la même chaîne, le portefeuille se comporte comme quelques positions." },
      { myth: "Une faible corrélation vous protège lors d'un krach.", reality: "Les corrélations mesurées en période calme ont tendance à monter lors des ventes massives, précisément quand la protection est nécessaire." },
      { myth: "La diversification augmente les rendements.", reality: "Elle réduit surtout la volatilité et l'impact d'une défaillance isolée ; elle peut aussi diluer la meilleure performance." },
    ],
    risks: [
      "Des corrélations qui bondissent vers 1 en période de tension.",
      "Des défaillances de dépendances communes qui touchent plusieurs positions à la fois.",
      "La dispersion dans de nombreux petits tokens peu liquides au nom de la diversification.",
    ],
    quiz: [
      {
        question: "Que signifie une corrélation de +1 entre deux actifs ?",
        options: ["Ils évoluent en sens inverse", "Leurs rendements bougent exactement de concert", "Ils n'ont aucun lien", "L'un des deux est un stablecoin"],
        explanation: "À +1, combiner les deux n'apporte aucun bénéfice de diversification.",
      },
      {
        question: "Pourquoi la diversification déçoit-elle souvent lors des krachs crypto ?",
        options: ["Parce que les plateformes d'échange ferment", "Parce que les corrélations entre actifs ont tendance à monter lors des ventes massives", "Parce que les stablecoins perdent de la valeur", "Parce que les frais augmentent"],
        explanation: "Lors d'une vente généralisée, la plupart des tokens baissent ensemble : l'effet de compensation disparaît en grande partie.",
      },
      {
        question: "Deux tokens fonctionnent sur la même chaîne et utilisent le même oracle. Quel risque caché partagent-ils ?",
        options: ["Aucun si leurs prix diffèrent", "Une défaillance de la chaîne ou de l'oracle commun peut les toucher tous les deux à la fois", "Ils auront toujours le même prix", "Ils ne peuvent pas être détenus ensemble"],
        explanation: "Une infrastructure commune est un point de défaillance partagé que les corrélations de prix ne montrent pas.",
      },
    ],
  },
  drawdowns: {
    minute:
      "Un drawdown est la chute entre un sommet et un plus bas ultérieur. Les actifs crypto ont traversé plusieurs fois des drawdowns de 70 % ou plus, et les pertes se cumulent de façon asymétrique : une perte de 50 % demande un gain de 100 % pour revenir à l'équilibre. Dimensionner ses positions pour des drawdowns réalistes est le cœur de la gestion du risque.",
    steps: [
      { title: "Repérer le sommet", text: "Suivez la valeur la plus haute atteinte jusqu'ici par l'actif ou le portefeuille." },
      { title: "Mesurer la chute", text: "Drawdown = valeur actuelle ÷ sommet précédent - 1. Il est toujours nul ou négatif." },
      { title: "Drawdown maximal", text: "La chute la plus profonde sur une période : le pire scénario réellement vécu par un détenteur." },
      { title: "Temps de récupération", text: "Le temps qu'il a fallu pour retrouver le sommet précédent. Cela peut prendre des années, et beaucoup de tokens ne le retrouvent jamais." },
      { title: "Se dimensionner en conséquence", text: "Choisissez la taille de vos positions pour qu'un drawdown réaliste reste supportable, financièrement et émotionnellement, sans vente forcée." },
    ],
    visualCaption: "Essayez : le gain nécessaire pour se refaire augmente bien plus vite que la perte.",
    example: {
      title: "Les drawdowns de Bitcoin, calculés à partir de l'historique des prix",
      paragraphs: [
        "Même Bitcoin, l'actif crypto le plus grand et le plus liquide, s'est échangé à plusieurs reprises très en dessous de ses plus hauts précédents. Le graphique calcule son drawdown à partir de l'historique des prix : chaque creux montre à quelle distance il se trouvait sous son sommet antérieur.",
        "Les tokens plus petits ont en général chuté davantage et se sont moins souvent redressés. Les pages des dossiers affichent l'écart de chaque projet par rapport à son plus haut historique en données live, jamais sous forme de chiffre figé dans le texte.",
      ],
    },
    metrics: [
      { label: "Drawdown maximal", read: "La chute la plus profonde du sommet au creux sur une période. Comparez-la avec ce que vous pourriez supporter." },
      { label: "Drawdown actuel", read: "À quelle distance sous son sommet un actif s'échange aujourd'hui." },
      { label: "Volatilité", read: "L'ampleur des mouvements typiques, en général annualisée. Une volatilité plus élevée rend des drawdowns plus profonds plus probables." },
      { label: "Temps de récupération", read: "Le temps qu'ont mis les drawdowns passés à se résorber, s'ils l'ont fait." },
    ],
    misconceptions: [
      { myth: "Un token en baisse de 90 % ne peut plus beaucoup baisser.", reality: "Une nouvelle chute de 50 % à partir de là divise par deux ce qui reste. La valeur restante peut encore être perdue." },
      { myth: "Une perte et un gain de même taille s'annulent.", reality: "Une perte de 50 % suivie d'un gain de 50 % vous laisse encore en baisse de 25 %." },
      { myth: "La volatilité ne veut dire que des pertes.", reality: "Elle mesure l'ampleur des mouvements dans les deux sens. C'est une mesure de l'incertitude." },
    ],
    risks: [
      "Un effet de levier qui transforme un drawdown en liquidation.",
      "Des ventes forcées près des plus bas pour faire face à d'autres besoins.",
      "Abandonner au plus bas après une perte devenue insupportable.",
    ],
    quiz: [
      {
        question: "Quel gain faut-il pour se remettre d'une perte de 50 % ?",
        options: ["50 %", "100 %", "75 %", "25 %"],
        explanation: "La moitié de la valeur doit doubler pour revenir au départ : 1 ÷ 0,5 - 1 = 100 %.",
      },
      {
        question: "Un actif baisse de 50 %, puis monte de 50 %. Où en est-il ?",
        options: ["Revenu à son point de départ", "25 % sous son point de départ", "25 % au-dessus de son point de départ", "50 % en dessous"],
        explanation: "0,5 × 1,5 = 0,75 : il reste 25 % sous sa valeur de départ.",
      },
      {
        question: "À quoi sert le dimensionnement des positions en fonction des drawdowns ?",
        options: ["À maximiser l'effet de levier", "À garder un pire scénario réaliste supportable, pour ne pas être forcé ni tenté de vendre au plus bas", "À éviter de payer des frais", "À anticiper le marché"],
        explanation: "Si la pire perte plausible est tolérable, vous pouvez vous tenir à votre plan pendant qu'elle se produit.",
      },
    ],
  },
};
