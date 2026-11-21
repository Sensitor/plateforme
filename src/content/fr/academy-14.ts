import type { ConceptText, DeepText } from "@/lib/academy/localized";

/** Traduction française : cycles de marché et indicateurs de sentiment. Mêmes faits et même structure que la version anglaise. */

export const TEXT_14: Record<string, ConceptText> = {
  "market-cycles": {
    title: "Cycles de marché",
    summary: "Les marchés crypto ont évolué par phases marquées d'euphorie et d'effondrement, portées par la liquidité et le sentiment.",
    body: [
      "Les cycles crypto passés montrent des phases d'accumulation, d'expansion, d'euphorie et de capitulation. Ils ont souvent coïncidé avec des changements de liquidité mondiale, de levier et de récits, et, pour Bitcoin, ont été vaguement associés aux halvings.",
      "Les cycles sont une grille de lecture, pas une loi : leur calendrier et leur amplitude changent, et les schémas passés peuvent ne pas se répéter.",
      "Des filtres de tendance simples et transparents (comme le prix face à la moyenne mobile sur 200 jours) aident à décrire le régime actuel sans prétendre le prévoir.",
    ],
    keyTakeaways: ["Les phases d'euphorie et d'effondrement reviennent", "Les schémas peuvent se rompre", "Décrivez le régime, ne le prédisez pas"],
  },
  "fear-and-greed": {
    title: "Indicateurs de sentiment",
    summary: "Des jauges comme le Fear & Greed Index résument l'émotion de la foule : utiles comme contexte, dangereuses comme signaux.",
    body: [
      "Le Crypto Fear & Greed Index combine la volatilité, la dynamique des prix, les réseaux sociaux et d'autres données en un score de 0 à 100. Les valeurs extrêmes montrent une émotion collective exacerbée.",
      "La logique contrarienne suggère que la peur extrême peut coïncider avec de meilleurs points d'entrée à long terme et l'avidité extrême avec un risque élevé, mais le sentiment peut rester extrême longtemps.",
      "Utilisez le sentiment pour vérifier vos propres biais : achetez-vous parce que tout le monde est euphorique, ou vendez-vous parce que tout le monde a peur ?",
    ],
    keyTakeaways: ["Mesure l'émotion de la foule", "Les extrêmes peuvent durer", "Un outil pour vérifier vos propres biais"],
  },
};

export const DEEP_14: Record<string, DeepText> = {
  "market-cycles": {
    minute:
      "Les marchés crypto ont connu des phases marquées d'euphorie et d'effondrement : accumulation, expansion, euphorie, puis capitulation. La liquidité, le levier et les récits portent ces phases. Les reconnaître aide à décrire où se trouve le marché, mais leur calendrier et leur ampleur ne se répètent jamais exactement.",
    steps: [
      { title: "Accumulation", text: "Après un krach, les prix évoluent latéralement et l'attention est faible. Beaucoup de ceux qui ont acheté au sommet ont déjà vendu." },
      { title: "Expansion", text: "Les prix prennent une tendance haussière, de nouveaux récits et de nouveaux capitaux arrivent, et le levier commence à s'accumuler." },
      { title: "Euphorie", text: "Les gains s'accélèrent, l'attention du grand public culmine, les taux de funding et le levier sont élevés et de nouveaux tokens sont lancés en grand nombre." },
      { title: "Capitulation", text: "Une forte baisse déclenche des liquidations et des ventes forcées, et le sentiment s'effondre." },
      { title: "Décrire, ne pas prédire", text: "Des filtres de tendance transparents comme la moyenne mobile sur 200 jours décrivent le régime actuel sans prétendre savoir quand il prendra fin." },
    ],
    visualCaption: "Une carte simplifiée d'un cycle. Les marchés réels brouillent les phases et en sautent certaines.",
    table: {
      columns: ["Accumulation", "Expansion", "Euphorie", "Capitulation"],
      rows: [
        { label: "Prix", values: ["Latéral après un krach", "Tendance haussière régulière", "Hausse forte et accélérée", "Chute brutale"] },
        { label: "Sentiment", values: ["Indifférence", "Optimisme", "Avidité", "Peur et désespoir"] },
        { label: "Levier", values: ["Faible", "En hausse", "Très élevé, funding coûteux", "Liquidations"] },
        { label: "Attention", values: ["Peu de nouveaux venus", "Des récits qui se multiplient", "Gros titres grand public", "Départs et recherche de coupables"] },
      ],
    },
    example: {
      title: "Décrire le régime actuel",
      paragraphs: [
        "La page Marchés et la Vue d'ensemble décrivent le régime actuel avec une seule règle transparente : le prix de Bitcoin comparé à sa moyenne mobile sur 200 jours. Au-dessus, la tendance des derniers mois a été haussière ; en dessous, baissière. Le graphique ci-dessous est calculé en direct.",
        "Une étude de la Banque des règlements internationaux portant sur les données d'applications de trading crypto d'août 2015 à décembre 2022 a montré qu'une majorité des utilisateurs de ces applications, dans presque toutes les économies, ont perdu de l'argent sur leurs bitcoins. Elle a aussi observé de grands investisseurs avertis qui vendaient pendant que de plus petits investisseurs particuliers achetaient.",
      ],
    },
    metrics: [
      { label: "Prix face à la moyenne sur 200 jours", read: "Une description simple, et en retard, de la tendance. Elle décrit le régime, elle ne le prévoit pas." },
      { label: "Funding et levier", read: "Un funding et un open interest très élevés sont typiques de la fin d'expansion et de l'euphorie." },
      { label: "Sentiment", read: "Une avidité ou une peur extrême signale une émotion collective exacerbée. Voir la leçon sur le sentiment." },
      { label: "Offre de stablecoins", read: "Une offre de stablecoins en hausse signifie plus de dollars on-chain, souvent une condition préalable à l'expansion." },
    ],
    misconceptions: [
      { myth: "Les cycles durent exactement quatre ans.", reality: "Les cycles passés ont à peu près suivi les halvings de Bitcoin, mais ils sont peu nombreux, et leur calendrier comme leur amplitude changent à chaque fois." },
      { myth: "On peut repérer le sommet de façon fiable.", reality: "L'euphorie peut durer plus longtemps et aller plus loin que prévu, et les filtres de tendance sont en retard par construction." },
      { myth: "Un nouveau cycle fait monter tous les tokens.", reality: "Beaucoup de tokens des cycles précédents n'ont jamais retrouvé leurs plus hauts ; les leaders changent d'un cycle à l'autre." },
    ],
    risks: [
      "Un excès de confiance dans un schéma fondé sur très peu d'observations.",
      "Un levier pris tard dans le cycle.",
      "Des changements de régime dictés par la liquidité macroéconomique plutôt que par la crypto elle-même.",
    ],
    quiz: [
      {
        question: "Quelle phase combine généralement un levier très élevé et un funding coûteux ?",
        options: ["L'accumulation", "L'euphorie", "La capitulation", "Aucune d'elles"],
        explanation: "En fin de phase haussière, les traders paient cher une exposition acheteuse à effet de levier, ce qui prépare aussi la prochaine vague de liquidations.",
      },
      {
        question: "Que vous apprend un Bitcoin qui s'échange au-dessus de sa moyenne mobile sur 200 jours ?",
        options: ["Que le prix va continuer de monter", "Que la tendance des derniers mois a été haussière", "Que le sommet est proche", "Qu'un halving approche"],
        explanation: "C'est une description de la tendance récente, pas une prévision.",
      },
      {
        question: "Pourquoi le cycle de quatre ans n'est-il pas une loi ?",
        options: ["Parce que les halvings ont été annulés", "Parce qu'il n'y a que quelques observations et que les conditions changent à chaque fois", "Parce que les régulateurs l'interdisent", "C'est une loi"],
        explanation: "Une poignée de cycles, chacun avec une liquidité et des participants différents, ne suffit pas à établir une règle fiable.",
      },
    ],
  },
  "fear-and-greed": {
    minute:
      "Les indicateurs de sentiment condensent l'émotion de la foule en un chiffre. Le Crypto Fear & Greed Index note le marché de 0, peur extrême, à 100, avidité extrême. Les extrêmes révèlent une émotion collective exacerbée : utiles pour remettre en question vos propres décisions, peu fiables pour choisir le moment d'agir, car le sentiment peut rester extrême pendant des semaines.",
    steps: [
      { title: "Collecter les données", text: "L'indice d'Alternative.me combine la volatilité (25 %), la dynamique et le volume (25 %), les réseaux sociaux (15 %), des sondages (15 %), la dominance de Bitcoin (10 %) et les tendances de recherche (10 %)." },
      { title: "Calculer le score", text: "Les données sont normalisées et combinées en une valeur quotidienne unique comprise entre 0 et 100." },
      { title: "Lire les zones", text: "Les valeurs basses signalent la peur, les valeurs hautes l'avidité, avec des extrêmes aux deux bouts." },
      { title: "Surveiller la direction", text: "L'évolution sur les derniers jours ou les dernières semaines en dit souvent plus que le niveau seul." },
      { title: "Vérifier vos biais", text: "Servez-vous des extrêmes comme d'une invitation à revoir vos raisons, pas comme d'un déclencheur d'achat ou de vente." },
    ],
    visualCaption: "L'indice sur les 90 derniers jours, coloré par zone, d'après Alternative.me.",
    example: {
      title: "Le sentiment sur Sensitor",
      paragraphs: [
        "La Vue d'ensemble et la page Marchés affichent l'indice chaque jour, d'après Alternative.me, à côté des données de marché, pour que le sentiment soit toujours lu en même temps que les prix et la tendance.",
        "Les taux de funding et les liquidations, abordés dans la leçon sur les futures perpétuels, sont des jauges complémentaires : ils montrent ce que les traders paient réellement pour une exposition à effet de levier, et pas seulement ce que ressent la foule.",
      ],
    },
    metrics: [
      { label: "Niveau de l'indice", read: "L'humeur de la foule aujourd'hui, de 0 à 100." },
      { label: "Variation sur sept jours", read: "Un basculement brutal montre que le sentiment change, quel que soit le niveau." },
      { label: "Temps passé dans les extrêmes", read: "De longues périodes de peur ou d'avidité extrême montrent à quel point l'émotion collective peut durer." },
      { label: "Divergence avec le prix", read: "Un sentiment qui s'améliore pendant que les prix baissent, ou l'inverse, peut signaler un changement de ton." },
    ],
    misconceptions: [
      { myth: "La peur extrême est un signal d'achat.", reality: "Elle a parfois coïncidé avec des plus bas, mais la peur peut s'aggraver pendant des semaines. C'est du contexte, pas un déclencheur." },
      { myth: "L'indice mesure les fondamentaux.", reality: "Il mesure l'humeur et le comportement du marché, pas l'adoption, les frais ou les revenus." },
      { myth: "Le sentiment est une donnée objective.", reality: "Il dépend des données et des pondérations choisies ; des indices différents peuvent se contredire." },
    ],
    risks: [
      "Suivre la foule aux extrêmes émotionnels.",
      "Le biais de confirmation : ne lire l'indice que lorsqu'il conforte une décision déjà prise.",
      "S'appuyer sur un seul indicateur.",
    ],
    quiz: [
      {
        question: "Qu'indique une valeur de l'indice de 15 ?",
        options: ["Une avidité extrême", "Un sentiment neutre", "Une peur extrême", "Une erreur de données"],
        explanation: "Les valeurs inférieures à 25 se situent dans la zone de peur extrême.",
      },
      {
        question: "Pourquoi l'indice est-il peu fiable pour choisir le moment d'une transaction ?",
        options: ["Parce qu'il est publié chaque mois", "Parce que le sentiment peut rester extrême longtemps", "Parce qu'il ne couvre que les actions", "Parce qu'il est aléatoire"],
        explanation: "Des valeurs extrêmes peuvent durer des semaines pendant que les prix continuent dans la même direction.",
      },
      {
        question: "Quelle est la façon la plus utile de se servir d'un indice de sentiment ?",
        options: ["Comme règle automatique d'achat ou de vente", "Comme contexte et comme vérification de vos propres biais émotionnels", "Pour prédire le prix de la semaine prochaine", "Pour valoriser un protocole"],
        explanation: "Il vous dit ce que ressent la foule, ce qui vous aide à remarquer quand vous ne faites que la suivre.",
      },
    ],
  },
};
