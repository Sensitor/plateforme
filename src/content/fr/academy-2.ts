import type { ConceptText, DeepText } from "@/lib/academy/localized";

/** Traduction française des leçons « Par où commencer » (5 à 7). Mêmes faits et même structure que la version anglaise. */

export const TEXT_2: Record<string, ConceptText> = {
  halving: {
    title: "Halvings et calendriers d'émission",
    summary: "Des réductions programmées de l'offre nouvelle, connues surtout à travers le cycle de quatre ans de Bitcoin.",
    body: [
      "La récompense de bloc de Bitcoin est divisée par deux tous les 210 000 blocs (environ quatre ans) : l'offre nouvelle décroît de façon géométrique vers un plafond de 21 millions. D'autres réseaux, comme Bittensor, appliquent une logique de halving comparable.",
      "Les halvings sont connus des années à l'avance, si bien que leur effet sur le prix fait débat : la baisse de l'offre est prévisible et, sur un marché efficient, devrait déjà être intégrée au prix. Ce qui change vraiment, c'est l'économie des producteurs de blocs, dont le revenu de récompense est coupé du jour au lendemain.",
      "À long terme, un réseau dont la récompense décroît doit compter sur les frais de transaction pour payer sa sécurité : c'est la question du « budget de sécurité ».",
    ],
    keyTakeaways: ["Une baisse de l'offre prévisible et géométrique", "L'économie des mineurs change à chaque halving", "Les frais devront un jour financer la sécurité"],
  },
  stablecoins: {
    title: "Stablecoins",
    summary: "Des tokens conçus pour garder une valeur stable, le plus souvent ancrée au dollar américain.",
    body: [
      "Les stablecoins adossés à des devises (USDT, USDC) détiennent hors chaîne des liquidités et des bons du Trésor à court terme. Les stablecoins collatéralisés en crypto sont adossés à des garanties on-chain, en surcollatéralisation. Les dollars synthétiques reposent sur des positions couvertes.",
      "Chaque modèle a ses propres risques : risque d'émetteur et bancaire, volatilité des garanties, ou dépendance aux marchés de dérivés. La réglementation les distingue de plus en plus.",
      "L'offre de stablecoins est un indicateur macro utile de la liquidité disponible on-chain.",
    ],
    keyTakeaways: ["Trois grands modèles", "Chaque modèle échoue différemment", "L'offre suit la liquidité on-chain"],
  },
  amm: {
    title: "Teneurs de marché automatisés (AMM)",
    summary: "Des plateformes d'échange où des pools de liquidité et une formule de prix remplacent le carnet d'ordres.",
    body: [
      "Un AMM détient deux tokens (ou plus) dans un pool et fixe ses prix à partir d'une formule : le modèle d'origine d'Uniswap maintient constant le produit des réserves. Les traders échangent contre le pool ; les fournisseurs de liquidité (LP) touchent des frais.",
      "Les LP subissent la perte impermanente : quand les prix bougent, le pool se rééquilibre à leur détriment. Les frais doivent dépasser cette perte pour que fournir de la liquidité soit rentable.",
      "La liquidité concentrée permet aux LP de choisir des plages de prix, ce qui améliore l'efficacité du capital au prix d'une gestion active.",
    ],
    keyTakeaways: ["Des pools et des formules remplacent les carnets d'ordres", "Les LP gagnent des frais mais supportent la perte impermanente", "Le volume et le niveau de frais déterminent le rendement des LP"],
  },
};

export const DEEP_2: Record<string, DeepText> = {
  halving: {
    minute:
      "Un halving divise par deux, à intervalles fixes, le nombre de pièces nouvelles créées par bloc. Sur Bitcoin, il a lieu tous les 210 000 blocs, environ tous les quatre ans : la croissance de l'offre ralentit vers un plafond fixe d'un peu moins de 21 millions de BTC.",
    steps: [
      { title: "Une récompense fixe", text: "Les premiers blocs de Bitcoin, minés en 2009, rapportaient 50 BTC au mineur qui les trouvait. Cette récompense de bloc est la seule façon de créer de nouveaux bitcoins." },
      { title: "Diviser par deux tous les 210 000 blocs", text: "La récompense est passée à 25 BTC en 2012, 12,5 BTC en 2016, 6,25 BTC en 2020 et 3,125 BTC en avril 2024." },
      { title: "Une offre qui converge", text: "La somme de toutes les récompenses converge vers un peu moins de 21 millions de BTC. La dernière fraction de récompense devrait être versée vers 2140." },
      { title: "Les frais prennent le relais", text: "À mesure que la récompense diminue, les frais de transaction doivent payer une part croissante des revenus des mineurs, et donc de la sécurité du réseau." },
      { title: "Des règles, pas une décision", text: "Chaque nœud applique le calendrier. Le modifier exigerait que les utilisateurs adoptent un autre logiciel, c'est pourquoi le calendrier est jugé crédible." },
    ],
    visualCaption: "La récompense de bloc de Bitcoin et l'offre modélisée, calculées à partir des règles du protocole utilisées dans le dossier Sensitor. Les halvings passés utilisent les dates réelles ; les suivants sont projetés.",
    example: {
      title: "Bitcoin : le quatrième halving et le suivant",
      paragraphs: [
        "Le halving d'avril 2024 a ramené la récompense à 3,125 BTC, soit environ 450 BTC émis par jour. Le dossier projette le prochain halving vers 2028, au bloc 1 050 000.",
        "Les halvings sont connus des années à l'avance et le montant nouvellement émis est faible comparé aux pièces déjà en circulation. Leur effet passe donc par l'économie des mineurs et les anticipations du marché, plutôt que par un changement soudain de l'offre.",
      ],
    },
    metrics: [
      { label: "Taux d'émission annuel", read: "Les pièces nouvelles par an divisées par l'offre en circulation. Il est à peu près divisé par deux à chaque halving." },
      { label: "Part des frais dans les revenus des mineurs", read: "La part des revenus des mineurs qui ne dépend plus de l'émission nouvelle. Essentielle pour la sécurité à long terme." },
      { label: "Hash rate autour du halving", read: "Les mineurs les moins efficaces peuvent s'arrêter quand le revenu par bloc est divisé par deux. Une baisse durable réduirait le coût d'une attaque." },
      { label: "Modèles de prix fondés sur la rareté", read: "Les modèles qui projettent le prix à partir de la seule offre, comme le stock-to-flow, ignorent la demande. À prendre avec prudence." },
    ],
    misconceptions: [
      {
        myth: "Les halvings font doubler le prix.",
        reality: "Certains halvings passés ont été suivis de hausses, mais il n'y en a eu que quatre, d'autres forces comme la liquidité et l'adoption pèsent lourd, et un événement connu est en partie anticipé par les marchés.",
      },
      { myth: "Il existera exactement 21 millions de bitcoins.", reality: "Le plafond est approché de façon asymptotique et s'arrête un peu en dessous de 21 millions. Les pièces perdues à jamais réduisent aussi l'offre utilisable." },
      { myth: "Les mineurs s'arrêteront quand la récompense prendra fin.", reality: "Par conception, les frais remplacent la récompense. La vraie question est de savoir s'ils seront assez élevés." },
    ],
    risks: [
      "Un budget de sécurité en baisse si la demande de frais n'augmente pas.",
      "Des mineurs sous pression après un halving, ce qui peut concentrer la puissance de calcul chez les plus gros opérateurs.",
      "Des récits d'investissement qui exagèrent l'effet du halving sur le prix.",
    ],
    quiz: [
      {
        question: "À quelle fréquence un halving de Bitcoin a-t-il lieu ?",
        options: ["Tous les ans", "Tous les 210 000 blocs", "Tous les 2 016 blocs", "Quand les mineurs votent pour"],
        explanation: "La récompense est divisée par deux tous les 210 000 blocs, ce qui prend environ quatre ans à raison de dix minutes par bloc.",
      },
      {
        question: "Quelle est la récompense de bloc depuis le halving d'avril 2024 ?",
        options: ["6,25 BTC", "50 BTC", "3,125 BTC", "1,5625 BTC"],
        explanation: "Elle est passée de 6,25 BTC à 3,125 BTC en avril 2024 ; le prochain halving la ramènera à 1,5625 BTC.",
      },
      {
        question: "Pourquoi un halving n'est-il pas un choc d'offre soudain ?",
        options: [
          "Parce qu'il est annulé si le prix baisse",
          "Parce que l'émission nouvelle est faible par rapport à l'offre existante et que la date est connue des années à l'avance",
          "Parce que les mineurs stockent des pièces à l'avance",
          "Parce que le plafond d'offre est relevé en même temps",
        ],
        explanation: "Le calendrier est public et ne touche que l'émission nouvelle, un flux faible comparé aux pièces déjà en circulation.",
      },
    ],
  },

  stablecoins: {
    minute:
      "Un stablecoin est un token conçu pour suivre la valeur d'un actif de référence, le plus souvent le dollar américain. Sa façon de tenir cette valeur dépend de ce qui l'adosse : des liquidités et des obligations d'État détenues par un émetteur, des garanties crypto bloquées dans des smart contracts, ou de la crypto couverte par des dérivés.",
    steps: [
      {
        title: "Adossé à des devises",
        text: "Un émetteur détient des liquidités et des obligations d'État à court terme, émet des tokens un pour un pour ses clients et les rachète à la demande. La confiance repose sur l'émetteur, ses banques et ses attestations publiées.",
      },
      {
        title: "Collatéralisé en crypto",
        text: "Les utilisateurs bloquent plus de crypto que les stablecoins qu'ils émettent (surcollatéralisation). Si la garantie baisse trop, la position est liquidée pour garder le système solvable.",
      },
      {
        title: "Synthétique",
        text: "Une garantie crypto est associée à une position inverse sur les dérivés, comme un future perpétuel vendeur, pour que la valeur combinée reste stable. Le rendement vient du financement payé par les traders de dérivés.",
      },
      {
        title: "Tenir l'ancrage",
        text: "L'arbitrage maintient le prix près d'un dollar : en dessous, ceux qui peuvent racheter achètent des tokens bon marché et les rachètent au pair ; au-dessus, ils émettent de nouveaux tokens et les vendent.",
      },
      {
        title: "Un modèle à éviter",
        text: "Les modèles adossés surtout à leur propre token jumeau sont fragiles. TerraUSD, l'exemple le plus connu, a perdu son ancrage et s'est effondré en mai 2022.",
      },
    ],
    visualCaption: "Trois modèles d'adossement comparés : où se trouvent les réserves, à qui l'on fait confiance, et ce qui peut briser l'ancrage.",
    example: {
      title: "Ethena : les rouages d'un dollar synthétique",
      paragraphs: [
        "L'USDe d'Ethena est adossé à des crypto-actifs couverts par des futures perpétuels vendeurs, plus des actifs stables. Les détenteurs qui le stakent reçoivent du sUSDe, qui tire son rendement des taux de financement et des récompenses de staking. Un fonds de réserve est prévu pour absorber les périodes où le financement devient négatif.",
        "Comparez-le aux produits de bons du Trésor tokenisés du dossier Ondo : l'un gagne sur les marchés de dérivés, l'autre sur les obligations d'État. Tous deux versent un rendement, avec des risques très différents.",
      ],
    },
    metrics: [
      { label: "Composition des réserves et attestations", read: "Ce qui adosse chaque token, qui le vérifie et à quelle fréquence. Des liquidités et des obligations courtes ne valent pas des obligations longues ou des prêts." },
      { label: "Écart à l'ancrage", read: "À quel point et combien de temps le prix de marché s'éloigne d'un dollar, surtout en période de tension." },
      { label: "Accès au rachat", read: "Qui peut racheter directement auprès de l'émetteur, avec quel minimum et à quelle vitesse. Seuls ceux qui peuvent racheter arbitrent l'ancrage." },
      { label: "Offre totale de stablecoins", read: "Un indicateur des dollars disponibles on-chain. La page Marchés la suit dans le temps." },
    ],
    misconceptions: [
      { myth: "Un stablecoin vaut toujours exactement un dollar.", reality: "Il s'échange sur des marchés et peut perdre son ancrage. L'USDC s'est échangé nettement sous un dollar pendant quelques jours en mars 2023, quand une partie de ses réserves se trouvait dans une banque américaine en faillite." },
      { myth: "Un stablecoin à rendement fonctionne comme un dépôt bancaire.", reality: "Il porte des risques de protocole, de contrepartie et de marché, et ne bénéficie d'aucune garantie des dépôts." },
      { myth: "Les stablecoins décentralisés n'ont pas de contrepartie.", reality: "Beaucoup de modèles collatéralisés en crypto détiennent des stablecoins centralisés ou des actifs réels dans leurs garanties." },
    ],
    risks: [
      "La défaillance de l'émetteur, d'une banque ou d'un dépositaire pour les stablecoins adossés à des devises.",
      "L'effondrement des garanties et les cascades de liquidations pour les stablecoins collatéralisés en crypto.",
      "Le financement négatif, les risques de plateforme et de couverture pour les dollars synthétiques.",
      "Une réglementation qui restreint l'émission ou la détention de certains stablecoins.",
    ],
    quiz: [
      {
        question: "Qu'est-ce qui adosse un stablecoin adossé à des devises ?",
        options: ["Son token de gouvernance jumeau", "Des liquidités et des obligations d'État à court terme détenues par un émetteur", "Uniquement des futures perpétuels vendeurs", "La valeur de sa blockchain"],
        explanation: "Ces stablecoins reposent sur des réserves détenues hors chaîne par un émetteur, d'où l'importance des attestations.",
      },
      {
        question: "Pourquoi les stablecoins collatéralisés en crypto exigent-ils une surcollatéralisation ?",
        options: ["Pour verser des rendements plus élevés", "Pour absorber les baisses de la garantie avant que la dette ne soit plus couverte", "Pour réduire les frais de gas", "Pour éviter les audits"],
        explanation: "Les garanties crypto sont volatiles ; la marge supplémentaire et les liquidations protègent le système quand les prix baissent.",
      },
      {
        question: "Qu'est-ce qui maintient surtout le prix de marché d'un stablecoin près d'un dollar ?",
        options: ["Un prix fixe imposé par la plateforme d'échange", "L'arbitrage par l'émission et le rachat", "Des votes quotidiens des détenteurs", "L'intervention d'une banque centrale"],
        explanation: "Quand le prix s'écarte, ceux qui peuvent émettre ou racheter au pair gagnent de l'argent en le ramenant.",
      },
    ],
  },

  amm: {
    minute:
      "Un teneur de marché automatisé remplace le carnet d'ordres par un pool de deux tokens et une formule. Les traders échangent contre le pool, et la formule fixe le prix à partir du rapport entre les deux réserves. Les fournisseurs de liquidité déposent les deux tokens et touchent les frais d'échange.",
    steps: [
      { title: "Déposer de la liquidité", text: "Les fournisseurs de liquidité ajoutent deux tokens au rapport du prix actuel et reçoivent une part du pool, qui leur donne droit à une partie des frais." },
      { title: "Appliquer la formule", text: "Dans un pool à produit constant, popularisé par Uniswap v2, le produit des deux réserves reste constant pendant un échange, avant frais : x × y = k." },
      { title: "Échanger", text: "Un acheteur ajoute un token et retire l'autre. Le token acheté devient plus rare dans le pool, donc son prix monte ; plus l'ordre est gros, plus il fait bouger le prix (l'impact de prix)." },
      { title: "Percevoir les frais", text: "Chaque échange paie des frais, 0,30 % dans Uniswap v2, qui restent dans le pool et reviennent aux fournisseurs de liquidité." },
      { title: "Arbitrer", text: "Quand le prix du pool diffère des autres marchés, des arbitragistes échangent jusqu'à l'aligner. C'est ainsi qu'un pool sans oracle suit le prix du marché." },
    ],
    visualCaption: "Essayez : déplacez le curseur pour acheter dans un pool fictif et voyez le prix se déplacer le long de la courbe x × y = k. Pool hypothétique, pas des données de marché.",
    example: {
      title: "Uniswap : du produit constant aux hooks",
      paragraphs: [
        "Uniswap a popularisé le pool à produit constant (v2), puis la liquidité concentrée, où les fournisseurs choisissent une plage de prix (v3), et les hooks, du code personnalisé qui modifie le comportement d'un pool (v4).",
        "Le dossier Uniswap se concentre sur la captation de valeur : historiquement, presque tous les frais allaient aux fournisseurs de liquidité, pas à l'UNI. La proposition UNIfication de novembre 2025 activerait des frais de protocole et les utiliserait pour brûler de l'UNI : c'est le principal changement à surveiller.",
      ],
    },
    metrics: [
      { label: "Volume rapporté à la liquidité (rotation)", read: "Le volume d'échanges divisé par la liquidité du pool. Une rotation plus élevée signifie plus de frais gagnés par dollar déposé." },
      { label: "Niveau de frais", read: "Le pourcentage prélevé à chaque échange. Les paires stables utilisent des niveaux bas, les paires volatiles des niveaux plus élevés." },
      { label: "Frais face à la perte impermanente", read: "Les fournisseurs ne font mieux que la simple détention que si les frais dépassent la perte causée par l'écart de prix entre les deux tokens." },
      { label: "Profondeur autour du prix", read: "Le montant qu'on peut échanger avant que le prix bouge d'un pourcentage donné. Elle détermine la qualité d'exécution." },
    ],
    misconceptions: [
      { myth: "Fournir de la liquidité, c'est un revenu passif.", reality: "Les fournisseurs gagnent des frais mais perdent de la valeur par rapport à la simple détention quand les prix divergent (perte impermanente), et cette perte devient définitive s'ils retirent leurs fonds." },
      { myth: "Le protocole fixe le prix du pool.", reality: "La formule déduit le prix des réserves ; les arbitragistes le maintiennent aligné sur les autres marchés." },
      { myth: "Un gros pool, c'est zéro slippage.", reality: "La profondeur réduit l'impact de prix, mais tout échange fait toujours bouger le prix le long de la courbe." },
    ],
    risks: [
      "La perte impermanente pour les fournisseurs de liquidité sur les paires volatiles.",
      "Les attaques sandwich et autres formes de MEV qui dégradent le prix obtenu par les traders.",
      "Les bugs de smart contracts, y compris dans les hooks personnalisés.",
    ],
    quiz: [
      {
        question: "Dans un pool à produit constant, qu'est-ce qui reste constant pendant un échange, avant frais ?",
        options: ["Le prix", "Le produit des deux réserves", "La somme des deux réserves", "Le nombre de fournisseurs de liquidité"],
        explanation: "x × y = k : quand une réserve augmente, l'autre doit baisser pour que leur produit reste inchangé.",
      },
      {
        question: "Pourquoi un gros ordre obtient-il un prix moyen moins bon qu'un petit ?",
        options: ["Les gros traders paient des frais de pénalité", "Chaque unité supplémentaire achetée déplace davantage le prix le long de la courbe", "Le pool ferme après les gros ordres", "Des arbitragistes passent devant chaque ordre"],
        explanation: "Plus vous retirez d'un token, plus il devient rare dans le pool : chaque unité supplémentaire coûte donc plus cher.",
      },
      {
        question: "Qu'est-ce que la perte impermanente ?",
        options: [
          "Des frais prélevés au moment du retrait",
          "La sous-performance d'une position de liquidité par rapport à la simple détention quand les prix divergent",
          "Une pause temporaire des échanges",
          "Des tokens perdus lors d'un piratage",
        ],
        explanation: "Le pool vend automatiquement le token qui monte et achète celui qui baisse : les fournisseurs finissent avec moins de valeur que s'ils avaient simplement conservé leurs tokens.",
      },
    ],
  },
};
