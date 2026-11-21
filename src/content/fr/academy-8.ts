import type { ConceptText, DeepText } from "@/lib/academy/localized";

/** Traduction française : protocoles de prêt et dollars synthétiques. Mêmes faits et même structure que la version anglaise. */

export const TEXT_8: Record<string, ConceptText> = {
  "lending-protocols": {
    title: "Protocoles de prêt",
    summary: "Des pools où les utilisateurs déposent des actifs pour toucher des intérêts et empruntent contre des positions surcollatéralisées.",
    body: [
      "Les prêteurs déposent des actifs dans un pool ; les emprunteurs apportent une garantie qui vaut plus que leur prêt. Les taux d'intérêt s'ajustent de façon algorithmique selon le taux d'utilisation.",
      "Si la valeur de la garantie passe sous un seuil, la position est liquidée : des tiers remboursent une partie de la dette et reçoivent la garantie avec une décote. L'exactitude des oracles et la liquidité du marché déterminent si les liquidations fonctionnent lors d'un krach.",
      "Les revenus viennent de l'écart entre taux d'emprunt et taux de dépôt (le reserve factor) et des frais de liquidation.",
    ],
    keyTakeaways: ["Des emprunts surcollatéralisés", "Les liquidations protègent la solvabilité", "Reserve factor = revenus du protocole"],
  },
  "synthetic-dollars": {
    title: "Dollars synthétiques",
    summary: "Des tokens ancrés au dollar, adossés à une garantie crypto couverte par des positions vendeuses sur dérivés.",
    body: [
      "Un dollar synthétique peut détenir de l'ETH ou du BTC au comptant et vendre à découvert un montant équivalent de futures perpétuels, si bien que la valeur en dollars de la position reste à peu près constante (delta-neutre).",
      "Le rendement vient des récompenses de staking sur la garantie et des paiements de funding, que les positions acheteuses versent en général aux vendeuses dans les marchés haussiers. Quand le funding devient négatif, le rendement baisse et les réserves peuvent être entamées.",
      "Parmi les risques : le risque de contrepartie des plateformes d'échange et le risque de conservation, la liquidité lors de rachats massifs, et les décalages de base en cas de volatilité extrême.",
    ],
    keyTakeaways: ["Une couverture delta-neutre maintient la valeur stable", "Le rendement dépend des taux de funding", "Une exposition aux plateformes d'échange et aux dépositaires"],
  },
};

export const DEEP_8: Record<string, DeepText> = {
  "lending-protocols": {
    minute:
      "Un protocole de prêt met en commun les dépôts des prêteurs et les prête à des emprunteurs qui apportent plus de garantie qu'ils n'empruntent. Les taux d'intérêt suivent la demande, et si la garantie d'un emprunteur perd trop de valeur, n'importe qui peut liquider la position pour garder le pool solvable.",
    steps: [
      { title: "Déposer", text: "Les prêteurs déposent des actifs et reçoivent un token qui représente leur créance plus les intérêts accumulés (les aTokens sur Aave)." },
      { title: "Emprunter contre une garantie", text: "Les emprunteurs déposent une garantie et peuvent emprunter jusqu'à une limite de ratio prêt sur valeur (loan-to-value) fixée pour chaque actif." },
      { title: "Des taux qui suivent l'utilisation", text: "Plus la part empruntée d'un pool est grande, plus les taux d'emprunt et de dépôt sont élevés. Des taux plus hauts attirent les dépôts et découragent de nouveaux emprunts." },
      { title: "Facteur de santé", text: "Chaque position a un facteur de santé : la valeur de la garantie pondérée par son seuil de liquidation, divisée par la dette. En dessous de 1, la position peut être liquidée." },
      { title: "Liquidation", text: "Un liquidateur rembourse une partie de la dette et reçoit de la garantie avec une décote, le bonus de liquidation, ce qui ramène la position à un niveau sain." },
    ],
    visualCaption: "Essayez : faites baisser le prix de la garantie et regardez le facteur de santé s'approcher de la ligne de liquidation. Paramètres d'exemple.",
    example: {
      title: "Aave : le marché monétaire de référence",
      paragraphs: [
        "Aave met la liquidité en commun et permet aux emprunteurs d'y puiser contre une garantie. Les ratios prêt sur valeur, les seuils de liquidation et les plafonds sont fixés actif par actif, sous la supervision de prestataires spécialisés dans le risque. La version 3 a ajouté un mode efficacité pour les actifs corrélés et un mode isolation pour les actifs plus risqués.",
        "Le dossier nomme les principaux vecteurs de risque : les défaillances d'oracles, une garantie qui devient illiquide pendant un krach, et les créances irrécouvrables quand les liquidations ne suivent pas. La surcollatéralisation limite l'efficacité du capital ; c'est le prix d'un prêt sans vérification de solvabilité.",
      ],
    },
    metrics: [
      { label: "Taux d'utilisation", read: "La part des dépôts qui est empruntée. Proche de 100 %, les prêteurs peuvent ne pas pouvoir retirer leurs fonds avant le remboursement des prêts." },
      { label: "Revenus du protocole (reserve factor)", read: "La part des intérêts que conserve le protocole. C'est sa principale activité, avec les frais de liquidation." },
      { label: "Créances irrécouvrables", read: "Les positions dont la dette dépasse la garantie parce que la liquidation a échoué. C'est une perte directe pour le pool." },
      { label: "Concentration des garanties", read: "La part des emprunts adossée à un seul actif ou à quelques grosses positions. La concentration complique les liquidations lors d'un krach." },
    ],
    misconceptions: [
      { myth: "Les dépôts peuvent toujours être retirés instantanément.", reality: "Quand l'utilisation atteint 100 %, les prêteurs doivent attendre que les emprunteurs remboursent ou soient liquidés." },
      { myth: "Les liquidations sont une sanction imposée par l'équipe.", reality: "Des bots tiers les effectuent selon des règles publiques ; la décote les récompense de rétablir la solvabilité du pool." },
      { myth: "Le taux de dépôt est un rendement garanti.", reality: "Il varie avec l'utilisation et peut chuter rapidement quand la demande d'emprunt baisse." },
    ],
    risks: [
      "Des erreurs d'oracle qui déclenchent des liquidations injustifiées ou permettent d'emprunter trop.",
      "Des cascades de liquidations et des créances irrécouvrables quand le prix des garanties décroche brutalement.",
      "Des erreurs dans les paramètres de risque fixés par la gouvernance, et des bugs de smart contracts.",
    ],
    quiz: [
      {
        question: "Que se passe-t-il quand le facteur de santé d'une position passe sous 1 ?",
        options: ["Le taux d'intérêt est gelé", "La position peut être liquidée", "La garantie est rendue à l'utilisateur", "Rien jusqu'à l'échéance du prêt"],
        explanation: "Un facteur de santé inférieur à 1 signifie que la garantie pondérée ne couvre plus la dette ; les liquidateurs peuvent intervenir.",
      },
      {
        question: "Pourquoi les taux d'emprunt montent-ils quand l'utilisation est élevée ?",
        options: ["Pour récompenser les développeurs", "Pour attirer des dépôts et décourager les emprunts afin que la liquidité reste disponible", "Parce que le prix du token monte", "Les taux ne changent jamais"],
        explanation: "La courbe de taux est la façon dont le protocole équilibre l'offre et la demande pour chaque actif.",
      },
      {
        question: "Une garantie de 20 000 dollars, un seuil de liquidation de 80 % et une dette de 10 000 dollars. Quel est le facteur de santé ?",
        options: ["2,0", "1,6", "0,5", "1,25"],
        explanation: "20 000 × 0,80 ÷ 10 000 = 1,6. La garantie peut perdre environ 37,5 % de sa valeur avant la liquidation.",
      },
    ],
  },
  "synthetic-dollars": {
    minute:
      "Un dollar synthétique détient une garantie crypto et ouvre une position vendeuse équivalente sur des futures perpétuels, de sorte que les mouvements de prix s'annulent et que la valeur combinée reste proche d'un dollar. Il tire un rendement des paiements de funding et des récompenses de staking, et porte des risques qu'un stablecoin adossé à des liquidités n'a pas.",
    steps: [
      { title: "Déposer une garantie", text: "Les utilisateurs déposent des actifs comme du BTC, de l'ETH, des tokens de staking liquide ou des actifs stables pour émettre le dollar synthétique." },
      { title: "Couvrir", text: "Le protocole vend à découvert des futures perpétuels de même taille : une baisse du prix de la garantie est compensée par un gain sur la position vendeuse, et la position est delta-neutre." },
      { title: "Séparer la conservation", text: "La garantie reste chez des dépositaires hors des plateformes d'échange tout en servant de marge, ce qui limite l'exposition à la défaillance d'une plateforme." },
      { title: "Générer un rendement", text: "Le funding versé par les positions acheteuses quand il est positif, plus les récompenses de staking sur la garantie, revient aux détenteurs qui stakent le token." },
      { title: "Absorber les tensions", text: "Quand le funding devient négatif ou que les rachats s'envolent, un fonds de réserve et la possibilité de basculer l'adossement vers des actifs plus sûrs amortissent le choc." },
    ],
    visualCaption: "Comment une position couverte devient un dollar, et d'où vient son rendement.",
    flow: {
      nodes: [
        { title: "Garantie", text: "BTC, ETH, tokens de staking ou actifs stables." },
        { title: "Émission", text: "Le dollar synthétique est émis." },
        { title: "Vente de perpétuels", text: "Une position vendeuse équivalente couvre le prix." },
        { title: "Delta-neutre", text: "Les mouvements de prix s'annulent." },
        { title: "Rendement", text: "Funding et récompenses de staking pour les stakers." },
      ],
      outcomes: {
        positive: "Une exposition au dollar avec un rendement natif de la crypto, qui grandit avec les marchés de dérivés plutôt qu'avec les dépôts bancaires.",
        negative: "Dépend du funding, des plateformes d'échange, des dépositaires et de la couverture ; des rachats massifs pendant un krach mettent sa liquidité à l'épreuve.",
      },
    },
    example: {
      title: "L'USDe d'Ethena",
      paragraphs: [
        "L'USDe est adossé à des actifs crypto couverts par des futures perpétuels vendeurs, plus des actifs stables. Les détenteurs qui le stakent reçoivent du sUSDe, qui rapporte un rendement issu du funding et des récompenses de staking. Un fonds de réserve est conçu pour absorber les périodes de funding négatif, et l'USDtb, un stablecoin distinct adossé principalement à des fonds de bons du Trésor tokenisés, peut servir d'adossement quand le funding est peu attractif.",
        "Le dossier note que les smart contracts sont relativement simples : les principaux risques sont opérationnels, du côté des plateformes d'échange, des dépositaires et de l'exécution de la couverture.",
      ],
    },
    metrics: [
      { label: "Taux de funding", read: "La principale source de rendement. Surveillez son niveau sur les différentes plateformes et la durée des périodes négatives." },
      { label: "Fonds de réserve face à l'offre", read: "Combien de semaines de funding négatif le coussin pourrait couvrir." },
      { label: "Composition de la garantie", read: "La part en crypto volatile face aux actifs stables, qui change le profil de risque." },
      { label: "Concentration des plateformes et des dépositaires", read: "La part de la couverture détenue par une seule plateforme ou un seul dépositaire." },
    ],
    misconceptions: [
      { myth: "Un dollar synthétique est un stablecoin comme l'USDC.", reality: "Il est adossé à une position crypto couverte, pas à des liquidités. Ses risques tiennent à la structure de marché et aux contreparties." },
      { myth: "Delta-neutre veut dire sans risque.", reality: "Cela supprime l'exposition à la direction du prix, pas les risques de funding, de base, de plateforme ou de conservation." },
      { myth: "Le rendement est fixe.", reality: "Il suit les taux de funding et peut approcher zéro ou devenir négatif." },
    ],
    risks: [
      "De longues périodes de funding négatif qui épuisent les réserves.",
      "La défaillance d'une plateforme d'échange ou d'un dépositaire qui détient une partie de la couverture.",
      "Des décalages de base et des rachats massifs en cas de volatilité extrême.",
    ],
    quiz: [
      {
        question: "Qu'est-ce qui maintient stable la valeur d'un dollar synthétique ?",
        options: ["Des liquidités dans une banque", "Une position vendeuse sur perpétuels qui compense les mouvements du prix de la garantie", "La garantie d'une banque centrale", "Des votes quotidiens des détenteurs"],
        explanation: "Une garantie détenue plus une position vendeuse équivalente laisse une position dont la valeur en dollars bouge à peine avec le prix.",
      },
      {
        question: "D'où vient l'essentiel du rendement ?",
        options: ["Des intérêts de dépôts bancaires", "Des paiements de funding et des récompenses de staking", "Des frais d'échange sur le token", "De l'émission de nouveaux tokens"],
        explanation: "Les positions vendeuses reçoivent le funding quand les acheteuses le paient, et la garantie stakée rapporte des récompenses de staking.",
      },
      {
        question: "Que se passe-t-il quand le funding reste négatif longtemps ?",
        options: ["Le rendement augmente", "La position vendeuse paie le funding : le rendement baisse et les réserves peuvent être entamées", "Rien ne change", "Le protocole émet plus de tokens pour compenser"],
        explanation: "Un funding négatif signifie que les vendeurs paient les acheteurs ; le rendement du système devient un coût que la réserve doit couvrir.",
      },
    ],
  },
};
