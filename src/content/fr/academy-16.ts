import type { ConceptText, DeepText } from "@/lib/academy/localized";

/** Traduction française : parcours « Apprendre à investir », leçons 6 à 10. Mêmes faits et même structure que la version anglaise. */

export const TEXT_16: Record<string, ConceptText> = {
  etfs: {
    title: "ETF et fonds indiciels",
    summary: "Un ETF est un fonds coté en Bourse comme une action ; les ETF indiciels répliquent tout un marché à faible coût, ce qui met une large diversification à la portée de tous.",
    body: [
      "Un fonds indiciel coté (ETF, ou tracker) réunit l'argent de nombreux investisseurs et détient un panier d'actifs, par exemple les actions de centaines d'entreprises. Chaque part d'ETF représente une fraction de ce panier et s'échange en Bourse tout au long de la journée, comme une action ordinaire.",
      "La plupart des ETF suivent un indice : ils cherchent à répliquer une référence, comme un large indice boursier, plutôt qu'à la battre. Comme aucune équipe n'est payée pour sélectionner les titres, leurs frais annuels (les frais courants) sont en général bien plus bas que ceux des fonds gérés activement.",
      "L'investissement indiciel repose sur un constat simple : après frais, la plupart des fonds actifs ont fait moins bien que leur indice sur de longues périodes. Tous les ETF ne sont pas larges ni simples pour autant : certains suivent un seul secteur, utilisent un effet de levier ou un seul actif, et en portent les risques.",
    ],
    keyTakeaways: ["Une part, tout un panier", "Les ETF indiciels répliquent, ils ne choisissent pas", "Les frais se composent : vérifiez les frais courants"],
  },
  "asset-allocation": {
    title: "Allocation d'actifs",
    summary: "La répartition de l'argent entre actions, obligations, liquidités et autres actifs fixe l'essentiel du risque d'un portefeuille ; le rééquilibrage maintient cette répartition.",
    body: [
      "L'allocation d'actifs, c'est la répartition d'un portefeuille entre grandes classes d'actifs comme les actions, les obligations et les liquidités. Comme ces classes se comportent différemment, le mélange détermine largement jusqu'où le portefeuille peut monter et jusqu'où il peut baisser.",
      "Il n'existe pas de bon mélange unique. Il dépend de l'horizon, de la capacité financière à encaisser des pertes et de la volonté de les traverser sans abandonner son plan. Un exercice utile : se demander quelle part du portefeuille on pourrait voir baisser de moitié sans changer de cap.",
      "Avec le temps, les actifs qui montent le plus dépassent leur poids cible et le portefeuille dérive vers davantage de risque. Le rééquilibrage, qui consiste à vendre une partie de ce qui a monté et à acheter ce qui est en retard, ramène au mélange choisi, à date fixe ou quand les poids s'écartent au-delà d'un seuil.",
    ],
    keyTakeaways: ["Le mélange fixe le risque", "Choisissez-le selon l'horizon et la tolérance", "Rééquilibrez pour rester sur la cible"],
  },
  dca: {
    title: "Investissement programmé (DCA)",
    summary: "Investir le même montant à intervalles réguliers, quel que soit le prix : une discipline qui lisse les points d'entrée et dispense de chercher le bon moment.",
    body: [
      "L'investissement programmé, ou DCA (dollar-cost averaging), consiste à investir un montant fixe à intervalles réguliers, par exemple chaque mois, quel que soit le prix. Quand les prix sont bas, le même montant achète plus d'unités ; quand ils sont hauts, il en achète moins.",
      "Son principal atout est comportemental : il fait de l'investissement une habitude, évite de tout placer juste avant une baisse et supprime la tentation d'attendre le moment parfait. Il s'accorde naturellement avec le fait d'investir une partie de chaque salaire.",
      "Ce n'est pas gratuit pour autant. La FINRA rappelle qu'étaler une somme dont on dispose déjà réduit le risque mais rapporte souvent moins que l'investir en une fois, surtout sur de longues périodes. Le DCA ne protège pas non plus des pertes si les prix baissent longtemps.",
    ],
    keyTakeaways: ["Montant fixe, rythme fixe", "Achète davantage quand les prix sont bas", "Moins de regrets, pas plus de rendement par défaut"],
  },
  "moving-averages": {
    title: "Moyennes mobiles et ligne des 200 semaines",
    summary: "Une moyenne mobile lisse les prix pour montrer la tendance. Les clôtures hebdomadaires de Bitcoin sont rarement passées sous leur moyenne 200 semaines, d'où l'attention que suscite cette ligne.",
    body: [
      "Une moyenne mobile simple est la moyenne des N derniers cours de clôture, recalculée à chaque nouvelle clôture. Elle gomme le bruit et montre la direction de la tendance, au prix d'un retard sur le cours.",
      "Les analystes utilisent des fenêtres différentes selon l'horizon : 50 ou 200 jours pour les actions et, pour Bitcoin, la moyenne 200 semaines, soit environ quatre ans, à peu près un cycle de halving. Les clôtures hebdomadaires de Bitcoin sont rarement passées en dessous, et ces périodes ont coïncidé avec les points les plus bas des marchés baissiers passés.",
      "Une moyenne mobile décrit le passé ; elle ne prévoit rien. Certains investisseurs voient dans un prix sous la moyenne 200 semaines une décote relative, mais les prix y sont restés des mois, et un actif dont la nature ou la taille change peut ne plus se comporter comme avant.",
    ],
    keyTakeaways: ["Une vue lissée de la tendance", "Elle est en retard par construction", "Sous la ligne des 200 semaines : rare pour Bitcoin, pas impossible"],
  },
  "behavioural-biases": {
    title: "Biais comportementaux",
    summary: "Aversion aux pertes, excès de confiance, mimétisme et autres raccourcis mentaux poussent à acheter haut, vendre bas et trop échanger. Des règles simples aident.",
    body: [
      "La finance comportementale étudie comment les investisseurs réels s'écartent des décisions rationnelles. La théorie des perspectives de Kahneman et Tversky a montré que nous ressentons les pertes environ deux fois plus fortement que des gains équivalents, ce qui pousse à vendre trop tôt les gagnants et à garder trop longtemps les perdants.",
      "D'autres biais bien documentés : l'excès de confiance (surestimer son talent, ce qui conduit à trop d'opérations), le mimétisme (suivre la foule vers les actifs à la mode), le biais de récence (croire que les tendances récentes vont durer) et le biais de confirmation (chercher les informations qui confortent ce que l'on pense déjà).",
      "On ne peut pas désactiver ses biais, mais on peut en limiter les effets avec des règles décidées à l'avance : un plan écrit, des versements automatiques, une allocation cible avec rééquilibrage périodique, et une pause avant toute décision prise sous le coup d'une émotion forte.",
    ],
    keyTakeaways: ["Une perte fait environ deux fois plus mal qu'un gain ne fait plaisir", "La foule et les tendances récentes nous font dévier", "Des règles fixées à l'avance valent mieux que la volonté"],
  },
};

export const DEEP_16: Record<string, DeepText> = {
  etfs: {
    minute:
      "Un ETF permet d'acheter tout un panier d'actifs en une seule opération. Les ETF indiciels suivent simplement un marché, ce qui garde des coûts bas et une diversification large. Comme les frais se composent contre vous chaque année, les frais courants sont l'une des rares choses que vous maîtrisez entièrement en investissement.",
    steps: [
      { title: "Un indice est défini", text: "Un fournisseur d'indices publie une liste de titres et leurs poids, par exemple les plus grandes entreprises d'un pays pondérées par leur valeur de marché." },
      { title: "Le fonds le réplique", text: "L'ETF achète les titres de l'indice, ou un échantillon représentatif, ou utilise un swap, pour que sa valeur suive la référence." },
      { title: "Les parts s'échangent en Bourse", text: "Les investisseurs achètent et vendent des parts d'ETF via un courtier, au prix du marché, tout au long de la séance." },
      { title: "Création et rachat", text: "Des institutions spécialisées, les participants autorisés, créent ou rachètent des parts d'ETF par gros blocs, ce qui maintient le prix de marché proche de la valeur des actifs détenus." },
      { title: "Les frais sont prélevés", text: "Les frais courants sont prélevés chaque année sur l'actif du fonds. Ils se traduisent par une performance légèrement inférieure à celle de l'indice, pas par une facture séparée." },
    ],
    visualCaption: "À vous : comparez deux fonds qui détiennent le même marché avec des frais annuels différents. L'écart entre les courbes est le coût des frais qui se composent. Rendement illustratif.",
    example: {
      title: "Le coût d'un point de pourcentage",
      paragraphs: [
        "Prenez deux fonds qui détiennent exactement les mêmes actifs et rapportent le même rendement illustratif de 6 % par an avant frais. L'un prélève 0,2 % par an, l'autre 1,8 %. Après 30 ans, le fonds peu coûteux a été multiplié par 5,4 environ ; le fonds cher par 3,4 environ.",
        "Plus d'un tiers du montant final est parti en frais, pour exactement la même exposition. C'est pourquoi des régulateurs comme la SEC et l'AMF insistent pour que les investisseurs regardent les coûts avant d'acheter un fonds.",
        "La crypto a désormais ses propres produits cotés : les ETF Bitcoin au comptant autorisés aux États-Unis en janvier 2024 détiennent des bitcoins pour le compte de leurs porteurs. Le dossier Bitcoin détaille ce qu'ils ont changé pour l'accès à l'actif et pour la concentration des avoirs.",
      ],
    },
    metrics: [
      { label: "Frais courants", read: "Les frais annuels en pourcentage de l'actif. Pour les ETF indiciels larges, ils représentent souvent une petite fraction de pour cent ; comparez les fonds similaires sur cette base." },
      { label: "Écart de suivi", read: "L'écart entre le rendement du fonds et celui de son indice sur un an. Il reflète à la fois les frais et les coûts de réplication." },
      { label: "Indice et composition", read: "Ce que le fonds détient réellement : combien de titres, quels pays et secteurs, et le poids des plus grosses positions." },
      { label: "Taille et fourchette de prix", read: "Les fonds importants et très échangés ont en général un écart achat-vente étroit : acheter et vendre coûte moins cher." },
    ],
    misconceptions: [
      { myth: "Tous les ETF sont diversifiés.", reality: "Certains suivent un seul secteur, un thème, une matière première, voire une seule action, et portent un risque concentré." },
      { myth: "Un fonds indiciel ne peut pas beaucoup perdre.", reality: "Il suit son marché à la baisse comme à la hausse. Un large indice boursier peut perdre un tiers ou plus dans une crise." },
      { myth: "Les ETF sont faits pour la spéculation de court terme.", reality: "Ils peuvent s'échanger en cours de séance, mais la plupart des investisseurs utilisent des ETF larges et peu coûteux pour détenir un marché pendant des années." },
    ],
    risks: [
      "Le risque de marché : le fonds baisse avec son indice.",
      "Le risque de concentration des ETF étroits, thématiques ou mono-actif.",
      "Les ETF à effet de levier et inversés, conçus pour de courtes durées de détention, peuvent beaucoup s'éloigner de l'indice avec le temps.",
      "Le risque de contrepartie des ETF synthétiques, qui répliquent l'indice par des swaps.",
    ],
    quiz: [
      {
        question: "Que représente une part d'ETF indiciel ?",
        options: ["Un prêt au gérant du fonds", "Une fraction d'un panier qui suit un indice", "Une action de la plus grande entreprise de l'indice", "Un rendement garanti égal à l'indice"],
        explanation: "Chaque part est une tranche de tout le portefeuille, construit pour suivre la référence.",
      },
      {
        question: "Pourquoi les ETF indiciels coûtent-ils en général moins cher que les fonds actifs ?",
        options: ["Les Bourses les subventionnent", "Ils répliquent un indice au lieu de payer une équipe pour sélectionner des titres", "Ils ne paient pas d'impôts", "Ils détiennent moins de titres"],
        explanation: "Suivre un indice publié coûte moins cher à gérer que rechercher et sélectionner des titres.",
      },
      {
        question: "Deux ETF suivent le même indice ; l'un coûte 0,1 % par an, l'autre 1 %. À quoi s'attendre sur 20 ans ?",
        options: ["Au même résultat", "À un écart croissant en faveur du fonds le moins cher", "À ce que le fonds cher fasse mieux", "À aucune différence, car les frais ne sont prélevés qu'une fois"],
        explanation: "Les frais sont prélevés chaque année sur une base croissante : la différence de coût se compose.",
      },
    ],
  },

  "asset-allocation": {
    minute:
      "L'allocation d'actifs, c'est décider combien placer dans chaque grand type d'actif. Elle fixe davantage le risque et le rendement de long terme d'un portefeuille que le choix de n'importe quel placement individuel. Une fois fixé, le mélange dérive avec les marchés et doit être rééquilibré de temps en temps.",
    steps: [
      { title: "Lister les briques", text: "Les actions pour la croissance de long terme, les obligations pour le revenu et la stabilité, les liquidités pour la disponibilité, et éventuellement d'autres actifs comme l'immobilier ou la crypto, chacun avec son propre risque." },
      { title: "Partir de l'objectif", text: "L'horizon et la perte supportable fixent la part d'actifs volatils. Un horizon long et une forte tolérance en permettent davantage ; un objectif proche en demande moins." },
      { title: "Combiner des actifs différents", text: "Des actifs qui ne bougent pas ensemble réduisent les variations de l'ensemble : le portefeuille est moins volatil que la moyenne de ses composantes." },
      { title: "Surveiller la dérive", text: "Après une bonne année pour les actions, un mélange parti de 60 % d'actions peut atteindre 70 %, ce qui augmente le risque sans bruit." },
      { title: "Rééquilibrer", text: "Revenir à la cible à date fixe, par exemple une fois par an, ou quand un poids s'écarte de plus d'un certain nombre de points. Les nouveaux versements peuvent aussi aller vers les actifs en retard." },
    ],
    visualCaption: "À vous : changez le mélange et voyez évoluer ensemble le rendement attendu, la volatilité et une mauvaise année. Hypothèses de long terme illustratives, pas des prévisions.",
    example: {
      title: "Quelle place pour la crypto dans un mélange",
      paragraphs: [
        "Comme les crypto-actifs ont connu des variations annuelles plusieurs fois plus fortes que celles des grands indices boursiers, même une petite allocation peut représenter une large part des hauts et des bas d'un portefeuille. Une position de quelques pour cent peut faire bouger sensiblement l'ensemble lors d'une très bonne ou d'une très mauvaise année.",
        "La page Portefeuille de Sensitor rend cela visible pour vos propres avoirs : répartition par actif et par secteur, concentration et corrélations entre positions. Elle décrit le portefeuille ; elle ne dit pas quel est le bon mélange, qui dépend de la situation de chacun.",
        "La même logique de rééquilibrage s'applique : après une forte hausse, une position crypto peut dépasser la part prévue, et revenir à la cible revient à prendre une partie des gains ; après un krach, cela revient à renforcer ce qui a baissé.",
      ],
    },
    metrics: [
      { label: "Part d'actifs volatils", read: "Le pourcentage placé en actions, en crypto et autres actifs qui peuvent fortement baisser. C'est le principal réglage du risque d'un portefeuille." },
      { label: "Écart à la cible", read: "La différence entre les poids actuels et les poids cibles. Au-delà de quelques points, le portefeuille ne porte plus le risque choisi." },
      { label: "Baisse lors d'une mauvaise année", read: "Ce que l'ensemble du mélange pourrait perdre lors d'une année difficile, plutôt que chaque actif pris séparément." },
      { label: "Corrélation entre les positions", read: "Si les actifs tendent à bouger ensemble. Une corrélation plus faible rend la diversification plus efficace." },
    ],
    misconceptions: [
      { myth: "Bien choisir ses actions compte plus que le mélange.", reality: "Pour la plupart des portefeuilles, la répartition entre classes d'actifs explique l'essentiel des écarts de risque." },
      { myth: "Un portefeuille équilibré ne perd jamais beaucoup.", reality: "Il baisse moins qu'un portefeuille 100 % actions, mais actions et obligations peuvent baisser ensemble, comme en 2022." },
      { myth: "Rééquilibrer, c'est chercher le bon moment sur le marché.", reality: "C'est appliquer une règle fixée à l'avance, sans aucune prévision : on rétablit simplement le niveau de risque choisi." },
    ],
    risks: [
      "Détenir un mélange trop offensif pour son horizon, puis vendre pendant un krach.",
      "Laisser le portefeuille dériver pendant des années jusqu'à porter bien plus de risque que prévu.",
      "Ne pas voir une concentration cachée, comme plusieurs fonds qui détiennent les mêmes grandes entreprises.",
      "Supposer que les corrélations passées tiendront lors de la prochaine crise.",
    ],
    quiz: [
      {
        question: "Un portefeuille vise 60 % d'actions et 40 % d'obligations. Après une forte hausse, il compte 72 % d'actions. Que fait le rééquilibrage ?",
        options: ["Il achète encore des actions", "Il vend une partie des actions et achète des obligations pour revenir à 60/40", "Il vend tout", "Il attend un krach"],
        explanation: "Le rééquilibrage rétablit le mélange choisi, et avec lui le niveau de risque choisi.",
      },
      {
        question: "Qu'est-ce qui détermine surtout le risque global d'un portefeuille ?",
        options: ["Le nombre d'opérations", "La répartition entre classes d'actifs", "Le courtier utilisé", "Le jour de la semaine où l'on investit"],
        explanation: "Actions, obligations et liquidités portent des risques très différents : leurs proportions fixent l'essentiel du comportement du portefeuille.",
      },
      {
        question: "Pourquoi une petite allocation en crypto peut-elle peser lourd dans les variations d'un portefeuille ?",
        options: ["Parce que la crypto coûte cher en frais", "Parce que sa volatilité est plusieurs fois celle des grands indices boursiers", "Parce que la crypto ne peut pas être rééquilibrée", "Parce qu'elle évolue toujours avec les obligations"],
        explanation: "Un petit poids multiplié par une volatilité très élevée peut tout de même représenter une large part du risque total.",
      },
    ],
  },

  dca: {
    minute:
      "Le DCA consiste à investir le même montant à un rythme fixe, quel que soit le prix. Vous achetez plus d'unités quand les prix sont bas et moins quand ils sont hauts, ce qui lisse votre prix de revient. C'est avant tout une discipline contre le mauvais timing ; face à un investissement en une fois, il échange souvent un peu de rendement contre moins de regrets.",
    steps: [
      { title: "Fixer un montant et un rythme", text: "Choisissez une somme que vous pouvez investir sans difficulté et une fréquence, par exemple mensuelle, idéalement automatisée." },
      { title: "Acheter quel que soit le prix", text: "Chaque achat a lieu à la date prévue. Aucune prévision à faire, aucun signal à attendre." },
      { title: "Plus d'unités quand les prix baissent", text: "Un montant fixe achète plus d'unités à bas prix : les baisses font diminuer votre prix de revient moyen." },
      { title: "Un prix de revient lissé", text: "Votre prix de revient moyen se retrouve égal ou inférieur à la moyenne simple des prix à vos dates d'achat, puisque davantage d'unités ont été achetées aux prix les plus bas." },
      { title: "Comparer avec un investissement en une fois", text: "Si l'argent est déjà disponible, l'investir d'un coup lui donne plus de temps sur le marché. C'est souvent sorti gagnant, au prix de plus de regrets si une baisse suit." },
    ],
    visualCaption: "Prix réels : simulez des achats réguliers de Bitcoin ou d'Ethereum depuis l'année de votre choix, et comparez avec le même total investi le premier jour. Frais et impôts ignorés.",
    example: {
      title: "Le DCA sur un cycle crypto complet",
      paragraphs: [
        "Le simulateur ci-dessus utilise de vraies clôtures hebdomadaires. Essayez une année de départ terminée près d'un sommet : les achats réguliers ont continué pendant le krach qui a suivi, en achetant beaucoup plus d'unités à bas prix, et le résultat dépend fortement de la position actuelle dans le cycle.",
        "Comparez avec la courbe d'un investissement en une fois le premier jour. Quand le point de départ était bas, l'investissement en une fois gagne en général ; quand il était proche d'un sommet, le DCA fait souvent mieux. Aucun des deux résultats n'était prévisible à l'avance, et c'est tout l'intérêt de la discipline.",
        "Le pire moment compte autant que le résultat final : il montre jusqu'où le portefeuille est passé sous les sommes investies en chemin, et c'est ce qui décide si un plan peut réellement être suivi.",
      ],
    },
    metrics: [
      { label: "Prix de revient moyen", read: "Le total investi divisé par les unités détenues. Comparez-le au prix actuel pour savoir où vous en êtes." },
      { label: "Rendement sur les sommes investies", read: "La valeur actuelle face à tout ce que vous avez versé. Il reflète tout le parcours, pas seulement le prix du jour." },
      { label: "Pire moment", read: "La plus forte baisse de la valeur du portefeuille sous les sommes investies : une mesure de la difficulté à tenir le plan." },
      { label: "Frais par achat", read: "Des frais fixes sur de petits achats fréquents peuvent absorber une large part de chaque montant. Vérifiez-les avant de choisir une fréquence." },
    ],
    misconceptions: [
      { myth: "Le DCA garantit un gain.", reality: "Il lisse le prix d'entrée mais ne peut pas empêcher les pertes si l'actif baisse et ne se redresse pas." },
      { myth: "Le DCA bat toujours un investissement en une fois.", reality: "Quand l'argent est déjà disponible, l'investir d'un coup a souvent fait mieux, car les marchés ont eu tendance à monter avec le temps." },
      { myth: "Acheter chaque semaine est bien meilleur que chaque mois.", reality: "Sur de longues périodes, la différence est en général faible, alors que les frais par achat peuvent peser davantage." },
    ],
    risks: [
      "Les baisses durables : acheter régulièrement un actif qui ne se redresse jamais reste perdant.",
      "Des frais de transaction élevés par rapport à chaque achat.",
      "Abandonner le plan pendant une baisse, ce qui lui retire son principal avantage.",
      "Appliquer le DCA à un seul actif très volatil sans regarder l'allocation d'ensemble.",
    ],
    quiz: [
      {
        question: "Vous investissez le même montant chaque mois. Les prix chutent fortement pendant quelques mois. Que se passe-t-il ?",
        options: ["Vous achetez moins d'unités", "Vous achetez plus d'unités avec le même montant", "Vos achats s'arrêtent", "Votre prix de revient augmente"],
        explanation: "Un montant fixe achète plus d'unités à un prix plus bas, ce qui fait baisser votre prix de revient.",
      },
      {
        question: "Selon la FINRA, comment se compare l'étalement d'une somme avec son investissement en une fois ?",
        options: ["Il rapporte toujours plus", "Il réduit le risque mais rapporte souvent moins, surtout sur de longues périodes", "Il ne change rien", "Il est interdit aux particuliers"],
        explanation: "Étaler garde l'argent plus longtemps en liquidités, ce qui réduit le risque mais aussi le temps passé sur le marché.",
      },
      {
        question: "Quelle est la principale force du DCA ?",
        options: ["Prévoir le meilleur point d'entrée", "Une discipline qui dispense de chercher le bon moment", "Un rendement garanti", "Une volatilité plus faible de l'actif lui-même"],
        explanation: "Le DCA ne change pas l'actif ; il change le comportement, en rendant les achats automatiques et réguliers.",
      },
    ],
  },

  "moving-averages": {
    minute:
      "Une moyenne mobile est la moyenne des N derniers prix, mise à jour à chaque clôture. Elle gomme le bruit pour montrer la tendance. La moyenne 200 semaines de Bitcoin, environ quatre ans de prix, est l'une des plus suivies : les clôtures hebdomadaires sous cette ligne ont été rares et ont correspondu aux creux des marchés baissiers passés, mais elle décrit l'histoire ; ce n'est pas un signal.",
    steps: [
      { title: "Choisir une fenêtre", text: "Le nombre de périodes à moyenner : 50 ou 200 jours pour une tendance de moyen ou long terme, 200 semaines pour un cycle complet de Bitcoin." },
      { title: "Moyenner et faire glisser", text: "À chaque nouvelle clôture, on ajoute le dernier prix, on retire le plus ancien et on recalcule la moyenne." },
      { title: "Lire la position", text: "Un prix au-dessus d'une moyenne montante décrit une tendance haussière ; un prix sous une moyenne descendante, une tendance baissière. L'écart en pourcentage montre à quel point le prix s'est éloigné." },
      { title: "Accepter le retard", text: "Comme elle moyenne le passé, la ligne ne tourne qu'après le prix. Les fenêtres longues ont plus de retard et réagissent moins au bruit." },
      { title: "Connaître les variantes", text: "Les moyennes mobiles exponentielles donnent plus de poids aux prix récents et réagissent plus vite. Les croisements entre une moyenne courte et une longue sont populaires, mais donnent de faux signaux dans les marchés sans tendance." },
    ],
    visualCaption: "Prix réels : les clôtures hebdomadaires de Bitcoin face à leur moyenne mobile 200 semaines, avec les semaines en dessous colorées en rouge. La page Stratégies liste chaque période sous la ligne.",
    example: {
      title: "Lire la ligne des 200 semaines sans lui faire trop dire",
      paragraphs: [
        "Sur l'historique affiché, les semaines sous la moyenne 200 semaines sont une petite minorité, et le marché baissier de 2022 a produit plusieurs mois consécutifs en dessous. C'est pourquoi la ligne est souvent décrite comme un plancher historique.",
        "Certains investisseurs de long terme suivent donc l'écart avec la moyenne 200 semaines comme une mesure de l'éloignement du prix par rapport à sa tendance longue, et achètent davantage quand le prix est en dessous. C'est une règle personnelle, pas une propriété du marché.",
        "Trois précautions s'imposent. Le schéma repose sur très peu de cycles ; la moyenne monte après les fortes hausses, donc le plancher bouge ; et en 2022, le prix est resté des mois sous la ligne en continuant de baisser avant de se redresser. La page Stratégies liste chaque période, avec sa profondeur.",
      ],
    },
    metrics: [
      { label: "Écart à la moyenne", read: "L'écart en pourcentage entre le prix et la moyenne. Dans l'histoire de Bitcoin, les forts écarts positifs ont accompagné les phases d'euphorie, et les écarts négatifs de rares décotes." },
      { label: "Pente de la moyenne", read: "Si la moyenne elle-même monte ou baisse. Une moyenne de long terme montante décrit une longue tendance haussière." },
      { label: "Durée sous la moyenne", read: "Le nombre de semaines consécutives clôturées en dessous. Les périodes passées vont d'une seule semaine à plusieurs mois." },
      { label: "Part de l'historique sous la moyenne", read: "La proportion de toutes les semaines clôturées en dessous. Une part faible signifie que la ligne a rarement été franchie." },
    ],
    misconceptions: [
      { myth: "Sous la moyenne 200 semaines, le prix doit forcément remonter.", reality: "Il s'est redressé par le passé, mais le prix peut continuer de baisser pendant des mois, et l'histoire peut ne pas se répéter." },
      { myth: "Une moyenne mobile prédit le prochain mouvement.", reality: "Elle est calculée uniquement à partir des prix passés. Elle décrit la tendance ; elle ne sait rien de l'avenir." },
      { myth: "La même règle fonctionne pour tous les actifs.", reality: "Les fenêtres et les schémas diffèrent selon les actifs. Beaucoup de tokens sont passés sous leurs moyennes longues et ne sont jamais revenus." },
    ],
    risks: [
      "Le surajustement : une règle qui collait à quelques cycles passés peut échouer au suivant.",
      "Le retard : le signal arrive après le mouvement, parfois trop tard pour servir.",
      "Les faux signaux dans les marchés sans tendance, où le prix croise la moyenne encore et encore.",
      "Une structure de marché qui change, par exemple de nouveaux types d'acheteurs, et modifie les comportements passés.",
    ],
    quiz: [
      {
        question: "Bitcoin clôture une semaine sous sa moyenne mobile 200 semaines. Que peut-on affirmer avec certitude ?",
        options: ["Il montera la semaine prochaine", "Son prix est inférieur à la moyenne de ses 200 dernières clôtures hebdomadaires", "Le marché baissier est terminé", "La moyenne va baisser immédiatement"],
        explanation: "C'est le seul fait certain. Personne ne sait si le prix va se redresser vite ; en 2022, il est resté en dessous pendant des mois.",
      },
      {
        question: "Pourquoi une moyenne 200 semaines est-elle en retard sur le prix ?",
        options: ["Parce que les plateformes retardent leurs données", "Parce qu'elle moyenne environ quatre ans de prix passés", "Parce qu'elle utilise une échelle logarithmique", "Parce qu'elle ne compte que les week-ends"],
        explanation: "Chaque nouveau prix n'est qu'une valeur sur 200 : la ligne tourne lentement, après le prix.",
      },
      {
        question: "Quelle est la principale limite des règles fondées sur la moyenne 200 semaines de Bitcoin ?",
        options: ["Elles exigent des données coûteuses", "Elles reposent sur très peu de cycles passés et peuvent ne pas tenir à l'avenir", "Elles ne marchent que sur les actions", "Elles sont illégales"],
        explanation: "Une poignée de cycles est un échantillon minuscule, et un marché plus grand et plus mûr peut se comporter autrement.",
      },
    ],
  },

  "behavioural-biases": {
    minute:
      "Notre cerveau utilise des raccourcis utiles au quotidien mais trompeurs sur les marchés. Nous craignons les pertes plus que nous n'apprécions les gains, surestimons notre talent, suivons la foule et prolongeons les tendances récentes. Résultat : acheter après les hausses, vendre après les baisses et trop échanger. Les règles fixées à l'avance sont la meilleure défense.",
    steps: [
      { title: "L'aversion aux pertes", text: "Une perte fait environ deux fois plus mal qu'un gain équivalent ne fait plaisir : les investisseurs évitent de matérialiser leurs pertes et encaissent leurs gains trop vite." },
      { title: "L'excès de confiance", text: "La plupart des gens s'estiment plus doués que la moyenne. Sur les marchés, cela se traduit par des opérations fréquentes, qui augmentent les coûts et réduisent souvent le rendement." },
      { title: "Le mimétisme et la peur de rater", text: "Voir d'autres gagner rend un actif à la fois plus rassurant et plus urgent, ce qui attire les investisseurs tard, près des sommets." },
      { title: "Récence et confirmation", text: "Les rendements récents semblent devenir la nouvelle norme, et nous cherchons les nouvelles qui confirment ce que nous pensons déjà." },
      { title: "Les garde-fous", text: "Automatiser les versements, écrire l'allocation cible et la raison de chaque placement, rééquilibrer à date fixe et attendre un délai défini avant d'agir sous le coup d'une émotion forte." },
    ],
    visualCaption: "Six biais courants, comment ils se manifestent dans un portefeuille, et un garde-fou pour chacun.",
    table: {
      columns: ["Comment il se manifeste", "Un garde-fou"],
      rows: [
        { label: "Aversion aux pertes", values: ["Garder des positions perdantes pour ne pas matérialiser la perte, vendre trop tôt les gagnantes", "Fixer les règles de revue et de sortie à l'achat, pas quand on est en perte"] },
        { label: "Excès de confiance", values: ["Opérations fréquentes, paris concentrés, statistiques de base ignorées", "Suivre ses décisions et ses coûts, et comparer avec un simple indice"] },
        { label: "Mimétisme", values: ["Acheter ce qui a déjà monté parce que tout le monde en parle", "Un délai d'attente avant tout achat non prévu"] },
        { label: "Récence", values: ["Croire que la tendance de l'an dernier va durer indéfiniment", "Regarder de longs historiques, cycles complets et drawdowns compris"] },
        { label: "Confirmation", values: ["Ne lire que les sources qui vont dans votre sens", "Écrire ce qui vous donnerait tort, et le chercher"] },
        { label: "Ancrage", values: ["Attendre de revenir à son prix d'achat avant de vendre", "Juger une position sur ses perspectives actuelles, pas sur son prix d'achat"] },
      ],
    },
    example: {
      title: "Un cycle d'émotions dans la crypto",
      paragraphs: [
        "Les marchés crypto concentrent ces biais. Les fortes hausses attirent de nouveaux investisseurs près du sommet, et les chutes brutales qui suivent poussent beaucoup d'entre eux à vendre près du creux.",
        "Une étude de la Banque des règlements internationaux, fondée sur les données d'applications de trading crypto d'août 2015 à décembre 2022, a montré qu'une majorité des utilisateurs, dans presque tous les pays, a perdu de l'argent sur ses bitcoins : beaucoup avaient commencé à acheter après la hausse des prix.",
        "Les leçons de Sensitor sur le sentiment et les cycles de marché montrent ces phases avec des données réelles, et la page Stratégies permet de tester une approche fondée sur des règles, comme les achats réguliers. Le but n'est pas de ne rien ressentir, mais de décider au calme ce que vous ferez dans les moments de stress.",
      ],
    },
    metrics: [
      { label: "Opérations par an", read: "Un nombre élevé, surtout juste après de forts mouvements de marché, signale souvent des décisions émotionnelles et des coûts plus élevés." },
      { label: "Écart entre le plan et le portefeuille", read: "Quand le portefeuille s'éloigne beaucoup de sa cible écrite, ce sont probablement les mouvements récents qui guident les décisions." },
      { label: "Votre rendement face à celui du fonds", read: "Les porteurs d'un fonds gagnent souvent moins que le fonds lui-même, parce qu'ils achètent après les hausses et vendent après les baisses." },
      { label: "Décisions après un mouvement brutal", read: "Un test simple : combien de vos opérations ont eu lieu dans la journée qui a suivi une forte hausse ou une forte baisse ?" },
    ],
    misconceptions: [
      { myth: "Les biais ne touchent que les débutants.", reality: "Les professionnels en sont aussi victimes. L'expérience aide, mais les règles et les processus protègent mieux que la confiance." },
      { myth: "Connaître un biais suffit à l'éviter.", reality: "La prise de conscience aide un peu ; les versements automatiques et les règles décidées à l'avance aident beaucoup plus." },
      { myth: "Suivre la foule est sûr, puisque tant de gens ne peuvent pas se tromper.", reality: "La foule arrive souvent tard, près des sommets, et repart ensemble, près des creux." },
    ],
    risks: [
      "Vendre après un krach et manquer la reprise.",
      "Se concentrer sur un actif à la mode au plus fort de l'enthousiasme.",
      "Des opérations excessives qui font des frais et des impôts un frein majeur.",
      "Réécrire son plan au milieu d'un mouvement de marché.",
    ],
    quiz: [
      {
        question: "Selon la théorie des perspectives, comment pèse-t-on les pertes par rapport à des gains de même taille ?",
        options: ["De la même façon", "Les pertes pèsent environ deux fois plus", "Les gains pèsent deux fois plus", "Les pertes sont ignorées"],
        explanation: "L'aversion aux pertes explique pourquoi les investisseurs gardent trop longtemps les perdants et vendent trop tôt les gagnants.",
      },
      {
        question: "Un investisseur achète un token parce que son prix a doublé le mois dernier et que tout le monde en parle. Quels biais sont le plus à l'œuvre ?",
        options: ["L'ancrage et le biais domestique", "Le mimétisme et la récence", "La seule aversion aux pertes", "Aucun, c'est un choix rationnel"],
        explanation: "Suivre la foule et prolonger les gains récents sont des déclencheurs classiques d'achats près des sommets.",
      },
      {
        question: "Quel outil limite le mieux l'effet des biais ?",
        options: ["Regarder les prix plus souvent", "Des règles décidées à l'avance, comme les versements automatiques et le rééquilibrage à date fixe", "Suivre de près les réseaux sociaux", "Échanger davantage pour gagner en expérience"],
        explanation: "Des règles fixées au calme réduisent le nombre de décisions prises sous le coup de l'émotion.",
      },
    ],
  },
};
