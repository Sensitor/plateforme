import type { ConceptText, DeepText } from "@/lib/academy/localized";

/** Traduction française : frais et revenus, tokens de gouvernance. Mêmes faits et même structure que la version anglaise. */

export const TEXT_10: Record<string, ConceptText> = {
  "protocol-revenue": {
    title: "Frais et revenus",
    summary: "Les frais sont ce que paient les utilisateurs ; les revenus sont ce que garde le protocole (ou ses détenteurs de tokens).",
    body: [
      "Les utilisateurs d'un DEX peuvent payer des frais importants, mais l'essentiel va aux fournisseurs de liquidité. Les emprunteurs d'un protocole de prêt paient des intérêts, mais l'essentiel va aux prêteurs. Les revenus sont la part conservée par la trésorerie du protocole ou distribuée aux détenteurs de tokens.",
      "Le bon indicateur dépend du modèle économique : les blockchains se jugent sur les frais et le burn face à l'émission, les middlewares sur l'usage payant, la DeFi sur les revenus conservés face aux incitations dépensées.",
      "Comparez les revenus aux incitations en tokens : un protocole qui dépense plus en émissions qu'il ne gagne achète sa croissance.",
    ],
    keyTakeaways: ["Frais ≠ revenus", "Adaptez les indicateurs au modèle", "Retranchez les incitations pour voir l'économie réelle"],
  },
  "governance-tokens": {
    title: "Tokens de gouvernance",
    summary: "Des tokens qui donnent un droit de vote sur les paramètres, la trésorerie ou les mises à jour d'un protocole.",
    body: [
      "Les tokens de gouvernance permettent à leurs détenteurs de voter sur des propositions : réglage des frais, dépenses de la trésorerie, mises à jour. Certains donnent aussi des droits économiques ; beaucoup, non.",
      "La participation est souvent faible et le pouvoir de vote concentré entre initiés, fondations et délégués. Un token qui donne un droit de vote sans lien économique avec le protocole ne repose que sur la valeur de la gouvernance.",
      "Lisez le processus de gouvernance : qui peut proposer, les seuils de quorum, les timelocks et les pouvoirs d'urgence.",
    ],
    keyTakeaways: ["Droit de vote ≠ flux de trésorerie", "Concentration et faible participation sont fréquentes", "Les timelocks et les pouvoirs d'urgence comptent"],
  },
};

export const DEEP_10: Record<string, DeepText> = {
  "protocol-revenue": {
    minute:
      "Les frais sont ce que paient les utilisateurs pour se servir d'un protocole. Les revenus sont la part que garde le protocole après avoir payé ceux qui fournissent le service, comme les fournisseurs de liquidité, les prêteurs ou les validateurs. Seuls les revenus, et ce qu'en fait la gouvernance, peuvent créer de la valeur pour les détenteurs de tokens.",
    steps: [
      { title: "Les utilisateurs paient des frais", text: "Frais d'échange, intérêts d'emprunt, gas : tout ce que paient les utilisateurs pour utiliser le service." },
      { title: "Le côté offre est payé", text: "L'essentiel des frais va en général à ceux qui fournissent le capital ou le travail : les fournisseurs de liquidité d'une plateforme d'échange, les prêteurs d'un marché de prêt, les validateurs d'une chaîne." },
      { title: "Le protocole garde des revenus", text: "Une part est conservée par la trésorerie du protocole, via des frais de protocole ou un reserve factor." },
      { title: "Les détenteurs peuvent recevoir de la valeur", text: "Les revenus n'atteignent les détenteurs de tokens que si la gouvernance les y dirige : rachats, burns, distributions, ou récompenses de staking financées par les frais." },
      { title: "Retrancher les incitations", text: "Les récompenses en tokens versées pour attirer les utilisateurs sont un coût. Les revenus moins les incitations montrent si le protocole gagne sa croissance ou l'achète." },
    ],
    visualCaption: "La cascade des frais : chaque étape garde une part plus petite que la précédente.",
    flow: {
      nodes: [
        { title: "Frais", text: "Tout ce que paient les utilisateurs." },
        { title: "Côté offre", text: "Fournisseurs de liquidité, prêteurs, validateurs." },
        { title: "Revenus", text: "La part gardée par le protocole." },
        { title: "Détenteurs de tokens", text: "Rachats, burns ou distributions, si la gouvernance le décide." },
      ],
      outcomes: {
        positive: "Des revenus supérieurs aux incitations : le protocole se finance lui-même et peut récompenser les détenteurs.",
        negative: "Des incitations supérieures aux revenus : la croissance est achetée par la dilution.",
      },
    },
    example: {
      title: "Trois chemins des frais vers les détenteurs",
      paragraphs: [
        "Historiquement, presque tous les frais d'Uniswap allaient aux fournisseurs de liquidité, si bien que l'UNI ne captait aucun flux de trésorerie. La proposition UNIfication de novembre 2025 activerait les frais de protocole et les utiliserait pour brûler des UNI.",
        "Hyperliquid dirige les frais du protocole vers un Assistance Fund qui rachète des HYPE sur le marché, tandis que la part des frais de staking revenant à Lido va à la trésorerie de la DAO plutôt que directement aux détenteurs de LDO. Même indicateur, trois chemins très différents.",
      ],
    },
    metrics: [
      { label: "Taux de prélèvement", read: "Les revenus divisés par les frais : la part de ce que paient les utilisateurs que garde le protocole." },
      { label: "Revenus moins incitations", read: "Ce qui se rapproche le plus d'un bénéfice. Négatif, cela signifie que la croissance est subventionnée par des émissions de tokens." },
      { label: "Captation de valeur pour les détenteurs", read: "Les rachats, burns ou distributions réellement financés par les revenus." },
      { label: "Capitalisation sur revenus", read: "La capitalisation divisée par les revenus annualisés. Utile entre protocoles similaires, trompeur entre modèles économiques différents." },
    ],
    misconceptions: [
      { myth: "Des frais élevés signifient un protocole rentable.", reality: "L'essentiel des frais peut aller au côté offre. Ce qui compte, c'est la part conservée et ce que coûte l'acquisition des utilisateurs." },
      { myth: "Un rachat profite toujours aux détenteurs.", reality: "Seulement s'il est financé par de vrais revenus plutôt que par les réserves de la trésorerie ou de nouvelles émissions, et réalisé à des prix raisonnables." },
      { myth: "Les chiffres de revenus sont standardisés d'une source à l'autre.", reality: "Les fournisseurs définissent les frais et les revenus différemment. Vérifiez la méthodologie avant de comparer." },
    ],
    risks: [
      "Des revenus portés par une activité spéculative qui disparaît quand les marchés sont calmes.",
      "Des politiques de frais modifiées par la gouvernance, ou limitées par la réglementation.",
      "Des dépenses d'incitation qui masquent une économie sous-jacente fragile.",
    ],
    quiz: [
      {
        question: "Sur une plateforme d'échange décentralisée, où va en général l'essentiel des frais d'échange ?",
        options: ["À l'équipe fondatrice", "Aux fournisseurs de liquidité", "Aux détenteurs du token", "Ils sont brûlés"],
        explanation: "Les fournisseurs de liquidité apportent le capital qu'utilisent les traders : ils reçoivent donc l'essentiel des frais.",
      },
      {
        question: "Un protocole gagne 10 millions de dollars de revenus par an et verse 25 millions de dollars d'incitations en tokens. Qu'est-ce que cela indique ?",
        options: ["Il est très rentable", "Il achète sa croissance : son économie nette est négative", "Son token doit monter", "Les incitations ne comptent pas"],
        explanation: "Dépenser plus en incitations qu'il ne gagne signifie que le protocole subventionne l'usage par la dilution.",
      },
      {
        question: "Quand les revenus d'un protocole parviennent-ils aux détenteurs de tokens ?",
        options: ["Toujours, automatiquement", "Seulement quand la gouvernance les y dirige via des rachats, des burns ou des distributions", "Quand le prix monte", "Jamais"],
        explanation: "Les revenus restent au protocole sauf si un mécanisme ou une décision de gouvernance les transmet.",
      },
    ],
  },
  "governance-tokens": {
    minute:
      "Un token de gouvernance donne à ses détenteurs un vote sur les décisions d'un protocole : réglage des frais, dépenses de la trésorerie, mises à jour. Un droit de vote n'est pas un droit sur les flux de trésorerie : beaucoup de tokens de gouvernance ne donnent aucun droit direct sur les revenus, et l'influence réelle se trouve souvent entre les mains de quelques gros détenteurs et délégués.",
    steps: [
      { title: "Discuter", text: "Les propositions commencent en général sur un forum public, où les délégués et la communauté en débattent." },
      { title: "Sonder", text: "Un sondage hors chaîne teste souvent le soutien avant toute décision contraignante." },
      { title: "Voter on-chain", text: "Les détenteurs de tokens, ou les délégués qu'ils ont choisis, votent. Une proposition doit atteindre un quorum et une majorité pour être adoptée." },
      { title: "Attendre dans un timelock", text: "Les propositions adoptées attendent un délai avant leur exécution, ce qui laisse aux utilisateurs le temps de réagir ou de partir." },
      { title: "Exécuter, ou opposer un veto", text: "Le changement s'exécute automatiquement. Certains systèmes conservent des pouvoirs d'urgence pour un conseil, ou donnent un droit de veto à un autre groupe." },
    ],
    visualCaption: "La vie typique d'une proposition de DAO.",
    flow: {
      nodes: [
        { title: "Forum", text: "Débat ouvert sur la proposition." },
        { title: "Sondage", text: "Une mesure hors chaîne du soutien." },
        { title: "Vote on-chain", text: "Quorum et majorité requis." },
        { title: "Timelock", text: "Un délai avant tout changement." },
        { title: "Exécution", text: "Les contrats appliquent la décision." },
      ],
      outcomes: {
        positive: "Des règles transparentes, une expertise déléguée et le temps de partir avant l'application des changements.",
        negative: "Une faible participation et des votes concentrés peuvent permettre à quelques détenteurs de piloter la trésorerie.",
      },
    },
    example: {
      title: "Des gouvernances différentes dans la couverture",
      paragraphs: [
        "ARB, OP, UNI et LDO sont des tokens de gouvernance de la couverture de Sensitor. La DAO d'Arbitrum contrôle une trésorerie importante et les revenus du séquenceur, mais toute distribution aux détenteurs d'ARB exigerait une décision de gouvernance. L'Optimism Collective répartit le pouvoir entre une Token House de détenteurs d'OP et une Citizens' House.",
        "La Dual Governance de Lido va plus loin : les détenteurs de stETH, et pas seulement ceux de LDO, sont censés pouvoir retarder les décisions de la DAO auxquelles ils s'opposent, un contrepoids aux détenteurs du token eux-mêmes.",
      ],
    },
    metrics: [
      { label: "Participation aux votes", read: "La part de l'offre qui vote. Une faible participation rend les résultats plus faciles à capter." },
      { label: "Concentration", read: "La part du pouvoir de vote détenue par les principaux délégués et les initiés." },
      { label: "Trésorerie", read: "Sa taille, sa composition et ses dépenses : souvent l'élément le plus important que contrôle la gouvernance." },
      { label: "Garde-fous", read: "Seuils de proposition, quorum, timelocks et pouvoirs d'urgence." },
    ],
    misconceptions: [
      { myth: "Détenir un token de gouvernance me donne droit aux frais.", reality: "Seulement si la gouvernance le décide. La plupart des tokens de gouvernance ne comportent aucun droit économique automatique." },
      { myth: "Les décisions d'une DAO sont décentralisées par définition.", reality: "Quelques délégués ou initiés décident souvent de l'issue." },
      { myth: "La gouvernance peut tout changer instantanément.", reality: "Les timelocks, les conseils et les limites on-chain encadrent ce qui peut changer, et à quelle vitesse." },
    ],
    risks: [
      "La capture par de gros détenteurs ou des délégués coordonnés.",
      "Des attaques de gouvernance avec un pouvoir de vote emprunté ou acheté.",
      "Le mauvais usage de la trésorerie et l'incertitude réglementaire sur les droits des détenteurs de tokens.",
    ],
    quiz: [
      {
        question: "Un token de gouvernance donne-t-il automatiquement une part des revenus ?",
        options: ["Oui, toujours", "Non, seulement si la gouvernance décide de distribuer de la valeur", "Seulement sur Ethereum", "Seulement après un halving"],
        explanation: "Droits de vote et droits économiques sont distincts ; les seconds doivent être créés par une décision.",
      },
      {
        question: "Pourquoi les timelocks sont-ils importants ?",
        options: ["Ils rendent les votes moins chers", "Ils laissent aux utilisateurs le temps de réagir ou de partir avant l'exécution d'un changement", "Ils augmentent l'offre de tokens", "Ils cachent les votes"],
        explanation: "Un délai entre l'approbation et l'exécution protège les utilisateurs contre des changements soudains et nuisibles.",
      },
      {
        question: "Qu'est-ce qu'une attaque de gouvernance ?",
        options: ["Le piratage du site web", "Acquérir ou emprunter assez de votes pour faire adopter une proposition à son propre profit", "Une baisse de la participation", "Un fork du code"],
        explanation: "Si le pouvoir de vote peut être acheté ou emprunté à bas prix, un attaquant peut voter le transfert des fonds de la trésorerie vers lui-même.",
      },
    ],
  },
};
