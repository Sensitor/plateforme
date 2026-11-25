import type { ConceptText, DeepText } from "@/lib/academy/localized";

/** Traduction française : parcours « Apprendre à investir », leçons 1 à 5. Mêmes faits et même structure que la version anglaise. */

export const TEXT_15: Record<string, ConceptText> = {
  "compound-interest": {
    title: "Intérêts composés",
    summary: "Des gains qui produisent des gains : pourquoi le temps est le facteur le plus puissant de tout projet de long terme.",
    body: [
      "La capitalisation, c'est ajouter les gains d'une période au capital, pour qu'ils produisent eux-mêmes des gains la période suivante. Une somme qui croît de 7 % par an n'ajoute pas le même montant chaque année : elle ajoute 7 % d'une base toujours plus grande, et la courbe s'incurve vers le haut.",
      "La règle de 72 en donne une idée rapide : divisez 72 par le taux annuel pour estimer le nombre d'années nécessaires pour doubler. À 6 % par an, l'argent double en 12 ans environ ; à 9 %, en 8 ans environ.",
      "La capitalisation joue dans les deux sens. Les frais, l'inflation et les intérêts d'une dette se composent aussi, ce qui explique qu'un petit coût annuel puisse absorber une large part du résultat final sur plusieurs décennies.",
    ],
    keyTakeaways: ["Les gains produisent des gains : la croissance accélère avec le temps", "Commencer tôt compte souvent plus que le taux exact", "Les frais et l'inflation se composent aussi"],
  },
  "risk-and-return": {
    title: "Risque et rendement",
    summary: "Un rendement attendu plus élevé s'accompagne de variations plus fortes et de pertes plus profondes en chemin, et la volatilité réduit discrètement la croissance composée.",
    body: [
      "En finance, le risque désigne surtout l'incertitude : l'ampleur avec laquelle les résultats d'un placement peuvent s'écarter de ce que l'on attend, y compris la possibilité de perdre de l'argent. Les actifs qui ont offert les meilleurs rendements de long terme, comme les actions, ont aussi connu des baisses plus fortes et plus fréquentes que les liquidités ou les obligations de qualité.",
      "Ce supplément de rendement est souvent présenté comme la rémunération du risque pris. Il n'est pas garanti : c'est une moyenne sur de longues périodes, et une année, voire une décennie, peut décevoir.",
      "La volatilité a aussi un coût mathématique. Perdre 50 % exige un gain de 100 % pour revenir au point de départ : deux placements de même rendement annuel moyen peuvent donc finir à des valeurs très différentes si l'un varie plus que l'autre.",
    ],
    keyTakeaways: ["Pas de rendement attendu sans risque", "Le rendement moyen n'est pas ce que vous gagnez", "Les variations réduisent la croissance composée"],
  },
  "investment-horizon": {
    title: "Horizon de placement",
    summary: "La durée pendant laquelle l'argent peut rester placé détermine le risque qu'il peut porter : plus l'horizon est long, plus la fourchette des résultats moyens se resserre.",
    body: [
      "Votre horizon de placement, c'est le temps qui vous sépare du moment où vous aurez besoin de l'argent. Une somme nécessaire l'an prochain ne peut pas attendre la reprise après un krach ; une somme mise de côté pour vingt ans peut, en principe, traverser plusieurs baisses.",
      "Sur de longues périodes, les bonnes et les mauvaises années tendent à se compenser, si bien que la fourchette des rendements annuels moyens se resserre. La fourchette des montants finaux, elle, reste large : l'horizon réduit l'incertitude sur le taux moyen, pas sur le résultat.",
      "La pédagogie des régulateurs commence par la même question. L'AMF distingue trois horizons, le court terme à moins de trois ans, le moyen terme de trois à dix ans et le long terme au-delà de dix ans, et souligne que chacun appelle des placements différents.",
    ],
    keyTakeaways: ["L'horizon, c'est la date du besoin", "Un horizon long lisse la moyenne, pas le résultat", "Un objectif, un horizon"],
  },
  stocks: {
    title: "Actions",
    summary: "Une action est une part de propriété d'une entreprise : son rendement vient des dividendes, de la croissance des bénéfices et du prix que le marché accepte de payer pour ces bénéfices.",
    body: [
      "Une action fait de vous un copropriétaire de l'entreprise. Vous avez un droit sur ses bénéfices futurs, que l'entreprise verse sous forme de dividendes ou réinvestit pour croître, et en général une voix aux assemblées générales.",
      "Sur de longues périodes, le rendement d'une action se décompose en trois parts : les dividendes perçus, la croissance du bénéfice par action et la variation du multiple de valorisation, c'est-à-dire le nombre d'années de bénéfices que le marché accepte de payer.",
      "À court terme, les prix dépendent surtout de l'évolution des anticipations et du sentiment ; à long terme, des bénéfices. Une entreprise peut faire faillite, c'est pourquoi la plupart des investisseurs en détiennent beaucoup, souvent au travers de fonds.",
    ],
    keyTakeaways: ["Une action est une part d'entreprise", "Le rendement vient des dividendes, de la croissance des bénéfices et de la variation de valorisation", "Une seule action est un risque concentré"],
  },
  bonds: {
    title: "Obligations",
    summary: "Une obligation est un prêt à un État ou à une entreprise : elle verse des intérêts, rembourse le capital à l'échéance, et son prix évolue en sens inverse des taux d'intérêt.",
    body: [
      "Acheter une obligation, c'est prêter de l'argent à un émetteur : un État, une collectivité ou une entreprise. En échange, vous recevez en général des intérêts réguliers, appelés coupons, puis la valeur nominale à l'échéance, à condition que l'émetteur ne fasse pas défaut.",
      "Les obligations s'échangent avant leur échéance, et leur prix varie avec les taux d'intérêt. Si les nouvelles obligations rapportent plus que la vôtre, personne ne paiera le plein prix pour votre coupon plus faible : son prix baisse. Plus l'échéance est longue, plus le mouvement est fort.",
      "Les obligations d'État de qualité ont historiquement été moins volatiles que les actions et ont parfois monté quand les actions baissaient, d'où leur rôle fréquent de stabilisateur dans un portefeuille. Les émetteurs moins bien notés paient davantage d'intérêts pour compenser un risque de défaut plus élevé.",
    ],
    keyTakeaways: ["Une obligation est un prêt avec un calendrier", "Taux en hausse, prix en baisse", "Échéance plus longue, variations plus fortes"],
  },
};

export const DEEP_15: Record<string, DeepText> = {
  "compound-interest": {
    minute:
      "Les intérêts composés, c'est le moment où vos gains commencent à produire leurs propres gains. Sur quelques années, l'effet reste modeste ; sur plusieurs décennies, il domine, au point que l'essentiel du montant final peut venir de la croissance plutôt que de vos versements. Le temps, la régularité et des frais bas sont les leviers que vous maîtrisez.",
    steps: [
      { title: "Le capital rapporte", text: "La première année, une somme placée à 5 % augmente de 5 % du montant de départ. Jusqu'ici, ce sont des intérêts simples." },
      { title: "Le gain est réinvesti", text: "Au lieu de retirer le gain, vous le laissez placé. Les 5 % de l'année suivante s'appliquent au total, gain de l'année précédente compris." },
      { title: "La croissance sur la croissance", text: "Chaque année ajoute un peu plus que la précédente. Après 10 ans à 5 %, le total vaut environ 1,63 fois le départ ; après 30 ans, environ 4,3 fois." },
      { title: "Les versements alimentent le moteur", text: "Chaque versement régulier démarre sa propre capitalisation. Les premiers ont le plus de temps pour croître, d'où l'importance de commencer tôt." },
      { title: "Les frais et l'inflation se composent aussi", text: "Des frais ou une inflation annuels agissent comme un rendement négatif. Sur 20 ans, l'écart entre un rendement de 7 % et de 5 % par an vous laisse environ un tiers de moins à l'arrivée." },
    ],
    visualCaption: "À vous : changez le taux, le versement mensuel et la durée. La bande grise correspond à vos versements, la bande colorée à la croissance qui s'y ajoute. Taux illustratifs, pas une prévision.",
    example: {
      title: "Deux épargnants, dix ans d'écart",
      paragraphs: [
        "Imaginez deux personnes qui placent le même montant chaque année, à un taux illustratif de 7 % par an. La première investit de 25 à 35 ans, puis s'arrête et laisse son capital fructifier. La seconde commence à 35 ans et continue chaque année jusqu'à 65 ans : trois fois plus de versements.",
        "À 65 ans, la première dispose d'environ 105 fois le versement annuel, la seconde d'environ 94 fois. La première a versé trois fois moins et finit pourtant devant, parce que ses premiers versements ont eu trente à quarante ans pour se composer.",
        "Les chiffres exacts dépendent entièrement du taux supposé, mais pas la forme de la courbe. La page Stratégies applique la même logique aux prix réels : son simulateur DCA montre ce qu'auraient donné des achats réguliers de Bitcoin ou d'Ethereum, chacun se composant, ou fondant, à partir de sa propre date.",
      ],
    },
    metrics: [
      { label: "Taux net de frais", read: "Ce qui se compose réellement, c'est le rendement restant après frais, impôts et inflation. Comparez les options sur cette base." },
      { label: "Durée de placement", read: "L'exposant de la formule. Doubler la durée fait plus que doubler la croissance." },
      { label: "Temps de doublement", read: "72 divisé par le taux annuel donne le nombre d'années pour doubler : un moyen rapide de sentir l'écart entre deux taux." },
      { label: "Part de la croissance dans le montant final", read: "Valeur finale moins les versements, rapportée à la valeur finale. Plus l'horizon est long, plus elle augmente." },
    ],
    misconceptions: [
      { myth: "Un taux plus élevé bat toujours un démarrage précoce.", reality: "Sur de longs horizons, quelques années de capitalisation en plus comptent souvent davantage qu'un ou deux points de rendement, comme le montrent les deux épargnants." },
      { myth: "La capitalisation ne concerne que les livrets d'épargne.", reality: "Elle s'applique à tout rendement réinvesti, dividendes, intérêts ou plus-values, mais aussi aux frais, à l'inflation et aux dettes." },
      { myth: "De petits frais annuels sont négligeables.", reality: "Des frais se composent chaque année. Sur plusieurs décennies, l'écart entre un produit peu coûteux et un produit cher peut atteindre une large part du montant final." },
    ],
    risks: [
      "Supposer un taux constant : les rendements réels varient beaucoup d'une année à l'autre et peuvent rester négatifs longtemps.",
      "Oublier l'inflation, qui réduit ce que le montant final permettra d'acheter.",
      "Interrompre la capitalisation en retirant les gains ou en vendant pendant une baisse.",
      "Garder une dette à taux élevé, qui se compose contre vous plus vite que la plupart des placements ne se composent pour vous.",
    ],
    quiz: [
      {
        question: "Avec la règle de 72, en combien de temps environ l'argent double-t-il à 8 % par an ?",
        options: ["Environ 4 ans", "Environ 9 ans", "Environ 14 ans", "Environ 20 ans"],
        explanation: "72 divisé par 8 donne 9. La règle est une approximation qui fonctionne bien pour les taux usuels, entre 4 % et 12 % environ.",
      },
      {
        question: "Pourquoi les premiers versements pèsent-ils autant dans le montant final ?",
        options: ["Ils sont moins imposés", "Ils ont le plus d'années pour se composer", "Les marchés montent toujours au début", "Les banques rémunèrent mieux les nouveaux clients"],
        explanation: "Chaque versement se compose à partir de sa propre date : les premiers profitent de la plus longue période de croissance.",
      },
      {
        question: "Deux fonds détiennent les mêmes actifs ; l'un prélève 0,2 % par an, l'autre 2 %. Que se passe-t-il sur 30 ans ?",
        options: ["Rien d'important, les frais sont faibles", "L'écart grandit chaque année parce que les frais se composent", "Le fonds cher rattrape son retard plus tard", "Les deux finissent avec le même montant"],
        explanation: "L'écart de frais s'applique chaque année à une base croissante : la différence entre les deux ne cesse de se creuser.",
      },
    ],
  },

  "risk-and-return": {
    minute:
      "Le risque, c'est l'éventail des résultats possibles, pas seulement la probabilité d'une perte. Les placements au rendement attendu plus élevé ont historiquement varié davantage et chuté plus fort. Et comme gains et pertes se composent, une trajectoire volatile finit plus bas qu'une trajectoire régulière de même moyenne : cet écart s'appelle le coût de la volatilité.",
    steps: [
      { title: "Le rendement attendu", text: "Ce qu'un placement doit rapporter en moyenne dans le temps. C'est une estimation, pas une promesse, et elle ne dit rien du chemin parcouru." },
      { title: "La volatilité", text: "L'ampleur des écarts de rendement autour de leur moyenne, mesurée en général par l'écart-type des rendements annuels ou mensuels. Plus le chiffre est élevé, plus les variations sont fortes." },
      { title: "Le drawdown", text: "La baisse depuis un sommet précédent. Il traduit ce que vivent réellement les investisseurs : la profondeur des pertes et la durée de la remontée." },
      { title: "La prime de risque", text: "Les investisseurs exigent un rendement attendu plus élevé pour détenir des actifs qui peuvent beaucoup baisser. Cette prime explique que les actions aient historiquement rapporté plus que les liquidités, et qu'elles puissent perdre lourdement dans une crise." },
      { title: "Le coût de la volatilité", text: "Un gain de 10 % suivi d'une perte de 10 % vous laisse 1 % sous votre point de départ. Plus un actif varie, plus son rendement composé passe sous sa moyenne simple." },
    ],
    visualCaption: "À vous : les deux trajectoires ont le même rendement annuel moyen. Augmentez les variations et regardez la trajectoire volatile finir plus bas. Rendements illustratifs.",
    example: {
      title: "Même moyenne, résultat différent",
      paragraphs: [
        "Prenez deux placements illustratifs qui affichent tous deux une moyenne de +10 % par an sur deux ans. Le premier gagne 10 % chaque année. Le second gagne 60 % la première année et perd 40 % la seconde. Tous deux ont une moyenne de +10 %, mais le premier a progressé de 21 % quand le second a perdu 4 %.",
        "Les crypto-actifs rendent cela très concret. Le graphique des drawdowns de Bitcoin dans l'Academy montre des chutes de plus de 70 % depuis un sommet lors des cycles passés. Se remettre d'une telle baisse exige un gain de plusieurs centaines de pour cent : la volatilité et les drawdowns comptent autant que les rendements affichés.",
        "Rien de tout cela ne rend les actifs volatils mauvais. Cela signifie que leur rendement attendu doit être jugé avec les variations qu'ils imposent, et avec votre capacité à les traverser.",
      ],
    },
    metrics: [
      { label: "Volatilité annualisée", read: "L'écart-type des rendements ramené à l'année. Utile pour comparer des actifs, mais il sous-estime le risque de krachs rares." },
      { label: "Drawdown maximal", read: "La pire baisse d'un sommet à un creux sur une période. La vraie question : pourriez-vous la traverser sans vendre ?" },
      { label: "Taux de croissance annuel composé", read: "Le taux constant qui transformerait la valeur de départ en valeur finale : le rendement réellement obtenu, inférieur à la moyenne simple quand les rendements varient." },
      { label: "Temps de remontée", read: "Le temps qu'il a fallu pour retrouver le sommet précédent. Les longues remontées mettent la patience à l'épreuve autant que la profondeur de la baisse." },
    ],
    misconceptions: [
      { myth: "Le risque, c'est seulement perdre de l'argent.", reality: "Le risque, c'est l'incertitude des résultats. Un placement peut manquer votre objectif sans jamais afficher de perte, par exemple s'il rapporte moins que l'inflation." },
      { myth: "Un rendement moyen de 10 % signifie que vous avez gagné 10 % par an.", reality: "Quand les rendements varient, le taux composé réellement obtenu est inférieur à la moyenne simple." },
      { myth: "Une faible volatilité passée signifie que c'est sûr.", reality: "Certains risques, comme un défaut, un gel de la liquidité ou l'inflation, n'apparaissent pas dans la volatilité passée avant de se matérialiser." },
    ],
    risks: [
      "Estimer le risque sur une période calme et être surpris par la crise suivante.",
      "Prendre plus de risque qu'on ne peut en supporter, puis vendre au plus bas.",
      "Se concentrer sur un actif dont la volatilité domine tout le portefeuille.",
      "Confondre levier et talent : emprunter amplifie à la fois les rendements et les drawdowns.",
    ],
    quiz: [
      {
        question: "Un placement gagne 50 %, puis perd 50 %. Où finit-il ?",
        options: ["À son point de départ", "25 % sous le départ", "25 % au-dessus du départ", "50 % sous le départ"],
        explanation: "1,5 fois 0,5 donne 0,75 : un quart sous la valeur de départ, alors que la moyenne simple des rendements est nulle.",
      },
      {
        question: "Que mesure la volatilité ?",
        options: ["Les frais d'un placement", "L'ampleur des écarts de rendement autour de leur moyenne", "La probabilité d'un dividende", "Le volume d'échanges"],
        explanation: "La volatilité est en général l'écart-type des rendements : plus les variations sont fortes, plus elle est élevée.",
      },
      {
        question: "Pourquoi les actions ont-elles historiquement rapporté plus que les liquidités ?",
        options: ["Parce que les États les garantissent", "Parce que les investisseurs exigent une prime pour supporter leurs variations et leurs pertes plus fortes", "Parce qu'elles ne baissent jamais longtemps", "Parce que leurs frais sont plus bas"],
        explanation: "Le rendement attendu plus élevé rémunère le risque, et c'est justement pour cela qu'il n'est garanti sur aucune période donnée.",
      },
    ],
  },

  "investment-horizon": {
    minute:
      "Votre horizon, c'est la durée pendant laquelle l'argent peut rester placé avant que vous en ayez besoin. Un horizon court ne laisse pas le temps de se remettre d'une baisse et appelle des actifs stables. Un horizon long permet aux bonnes et mauvaises années de se compenser, ce qui resserre la fourchette des rendements moyens, même si celle des montants finaux reste large.",
    steps: [
      { title: "Nommer l'objectif", text: "Chaque somme a une destination : une réserve de précaution, un apport immobilier dans cinq ans, la retraite dans trente ans. La destination fixe la date." },
      { title: "Garder un coussin de sécurité", text: "L'argent qui peut servir à tout moment, comme quelques mois de dépenses, doit rester en liquidités ou équivalent, pour qu'une baisse des marchés n'oblige jamais à vendre." },
      { title: "Adapter le risque au temps", text: "Plus l'horizon est court, moins il y a de place pour des actifs qui peuvent perdre un tiers de leur valeur en un an. Plus il est long, plus une baisse temporaire peut être attendue." },
      { title: "Voir la fourchette se resserrer", text: "Avec des rendements annuels indépendants, la dispersion du rendement annuel moyen diminue avec la racine carrée du temps : quatre fois plus long, deux fois moins de dispersion." },
      { title: "Préparer la sortie", text: "À l'approche de l'échéance, basculer progressivement vers des actifs stables protège le résultat d'un krach tardif, un danger appelé risque de séquence." },
    ],
    visualCaption: "À vous : la bande montre où tomberait le rendement annuel moyen dans 9 cas sur 10 pour un actif illustratif. Elle se resserre avec le temps, mais jamais jusqu'à un chiffre unique. Hypothèses de modèle, pas une prévision.",
    example: {
      title: "Un foyer, trois horizons",
      paragraphs: [
        "Prenez un foyer qui a trois objectifs : une réserve pour les imprévus, un apport immobilier dans quatre ans et la retraite dans trente ans. Les traiter comme une seule cagnotte exposerait l'apport à un krach, ou laisserait l'argent de la retraite dormir pendant des décennies.",
        "Séparés par horizon, la réserve reste sur un livret, l'apport sur des placements peu volatils qui ont peu de chances de beaucoup baisser en quatre ans, et l'argent de la retraite dans un portefeuille diversifié capable d'absorber plusieurs mauvaises années en chemin.",
        "Les crypto-actifs, avec des chutes passées de plus de 70 %, sont le cas extrême : ils ne conviennent qu'à de l'argent placé à long terme, pour une part que vous pourriez voir fondre fortement sans changer vos projets.",
      ],
    },
    metrics: [
      { label: "Date du besoin", read: "Quand l'argent sera utilisé. Sans date, aucun niveau de risque ne peut être jugé adapté." },
      { label: "Réserve de précaution", read: "Plusieurs mois de dépenses essentielles en liquidités, pour ne jamais devoir vendre des placements dans l'urgence." },
      { label: "Pire baisse passée de l'actif", read: "Comparez-la à l'horizon : l'actif pourrait-il se remettre d'une telle chute avant que vous ayez besoin de l'argent ?" },
      { label: "Argent proche de sa date de sortie", read: "Les sommes nécessaires d'ici quelques années mais encore placées sur des actifs volatils sont la principale source de ventes forcées." },
    ],
    misconceptions: [
      { myth: "Sur le long terme, les actions ne peuvent pas perdre.", reality: "Un horizon long améliore les probabilités, il ne supprime pas le risque. Le principal indice boursier japonais a mis 34 ans à retrouver son record de 1989." },
      { myth: "Tout mon argent a le même horizon.", reality: "Chaque objectif a sa propre date. Les mélanger conduit à trop de risque pour les objectifs courts, ou trop peu pour les objectifs longs." },
      { myth: "Un horizon long permet d'oublier ses placements.", reality: "Il autorise la patience pendant les baisses, mais l'allocation doit être revue quand les objectifs changent et que la date de sortie approche." },
    ],
    risks: [
      "Avoir besoin de l'argent pendant une baisse et vendre à perte.",
      "Le risque de séquence : un krach juste avant ou au début des retraits pèse bien plus qu'un krach survenu des décennies plus tôt.",
      "Laisser de l'argent de long terme en liquidités et perdre du pouvoir d'achat face à l'inflation.",
      "Surestimer son horizon : les événements de la vie peuvent avancer la date du besoin.",
    ],
    quiz: [
      {
        question: "Vous aurez besoin d'une somme dans 18 mois pour un apport immobilier. Quelle approche correspond à cet horizon ?",
        options: ["Surtout des actifs volatils pour un meilleur rendement", "Des actifs stables, dont la valeur a peu de chances de beaucoup baisser", "Une seule cryptomonnaie", "Des produits à effet de levier"],
        explanation: "Avec 18 mois, il n'y aura peut-être pas le temps de se remettre d'une baisse : la stabilité compte plus que le rendement potentiel.",
      },
      {
        question: "Qu'est-ce qui se resserre quand l'horizon s'allonge ?",
        options: ["La fourchette des montants finaux", "La fourchette des rendements annuels moyens", "Les frais", "Le taux d'inflation"],
        explanation: "Les bonnes et mauvaises années se compensent, si bien que le rendement annuel moyen varie moins. La fourchette des montants finaux reste large.",
      },
      {
        question: "Qu'est-ce que le risque de séquence ?",
        options: ["Le risque d'acheter dans le mauvais ordre", "Le risque qu'un krach survienne juste avant ou pendant les retraits", "Le risque de faillite d'un courtier", "Le risque de manquer un dividende"],
        explanation: "Les pertes proches de la date du besoin font le plus de dégâts, car il reste peu de temps et de capital pour se refaire.",
      },
    ],
  },

  stocks: {
    minute:
      "Posséder une action, c'est posséder une petite part d'une entreprise et de ses bénéfices futurs. Avec le temps, ce que vous gagnez vient des dividendes, de la croissance des bénéfices et de ce que le marché accepte de payer pour ces bénéfices. À court terme, ce dernier ingrédient domine et les prix peuvent beaucoup varier.",
    steps: [
      { title: "L'entreprise lève des capitaux", text: "Quand une entreprise entre en Bourse, elle vend des actions au public. Ensuite, les actions s'échangent entre investisseurs sur le marché." },
      { title: "Des bénéfices sont réalisés", text: "L'entreprise vend des biens ou des services. Ce qui reste après les coûts, les intérêts et les impôts constitue son bénéfice, qui revient aux actionnaires." },
      { title: "Distribués ou réinvestis", text: "La direction reverse une partie du bénéfice par des dividendes ou des rachats d'actions, et réinvestit le reste pour faire croître les bénéfices futurs." },
      { title: "Le marché fixe un prix", text: "Les investisseurs paient un multiple des bénéfices, le PER (price-to-earnings ratio). L'optimisme le fait monter et la peur le fait baisser, souvent plus que les bénéfices ne changent." },
      { title: "Votre rendement", text: "Le rendement total combine les dividendes et la variation du cours. Sur de longues périodes, la croissance des bénéfices et les dividendes ont en général fait l'essentiel du travail ; sur quelques mois, les variations du multiple dominent." },
    ],
    visualCaption: "À vous : construisez le rendement annuel d'une action à partir de ses trois ingrédients, et voyez comment une variation du multiple de valorisation peut effacer des années de croissance des bénéfices. Paramètres illustratifs.",
    example: {
      title: "Même entreprise, prix différent",
      paragraphs: [
        "Imaginez une entreprise dont le bénéfice par action croît de 6 % par an pendant dix ans, avec un rendement du dividende de 2 %. Si les investisseurs paient 20 fois les bénéfices au départ et toujours 20 fois à la fin, le rendement annuel est d'environ 8 % : la croissance des bénéfices plus les dividendes.",
        "Supposez maintenant que le multiple passe de 30 à 15 sur ces mêmes dix ans. Le cours finit environ 10 % sous son niveau de départ et le rendement annuel tombe vers 1 %, alors que l'entreprise a fait exactement aussi bien.",
        "C'est pourquoi les analystes regardent la valorisation autant que la qualité, et pourquoi la même discipline traverse la recherche crypto de Sensitor : la valeur de marché d'un token peut courir très loin devant l'activité réelle, comme le montre la leçon sur la capitalisation et la FDV.",
      ],
    },
    metrics: [
      { label: "Bénéfice par action (BPA)", read: "Le bénéfice divisé par le nombre d'actions. Sa croissance au fil des années est le moteur du rendement de long terme." },
      { label: "PER (cours sur bénéfice)", read: "Le cours divisé par le BPA : combien d'années de bénéfices actuels le marché paie. Comparez-le à l'historique de l'entreprise et à son secteur." },
      { label: "Rendement du dividende", read: "Les dividendes annuels divisés par le cours. Une part du rendement, même si un rendement très élevé peut signaler un dividende menacé." },
      { label: "Dette et flux de trésorerie", read: "Ce que l'entreprise emprunte et la trésorerie qu'elle génère réellement. Des bénéfices sans trésorerie, ou une lourde dette, augmentent le risque de pertes." },
    ],
    misconceptions: [
      { myth: "Une action au cours bas est une action bon marché.", reality: "Le cours par action dépend du nombre d'actions en circulation. La valeur se juge en comparant le prix aux bénéfices, à la trésorerie ou aux actifs." },
      { myth: "Une excellente entreprise est toujours un excellent placement.", reality: "Si le prix suppose déjà des années de forte croissance, un résultat simplement bon peut décevoir les actionnaires." },
      { myth: "Le cours des actions suit de près les bénéfices.", reality: "À court terme, le sentiment et les taux d'intérêt font bouger les multiples bien plus que les bénéfices ne changent." },
    ],
    risks: [
      "Le risque propre à l'entreprise : une seule action peut perdre l'essentiel, voire la totalité, de sa valeur.",
      "Le risque de valorisation : acheter quand les multiples sont élevés laisse peu de marge pour une déception.",
      "La concentration sur un secteur ou un pays qui baisse d'un bloc.",
      "Trop d'allers-retours, qui coûtent des frais et réagissent au bruit plutôt qu'à l'entreprise.",
    ],
    quiz: [
      {
        question: "Que vous donne la détention d'une action ?",
        options: ["Un prêt à l'entreprise à intérêt fixe", "Une part de propriété de l'entreprise et un droit sur ses bénéfices", "Un dividende garanti", "Un droit sur les produits de l'entreprise"],
        explanation: "Un actionnaire possède une partie de l'entreprise. Les dividendes sont décidés par l'entreprise et ne sont jamais garantis.",
      },
      {
        question: "Les bénéfices d'une entreprise augmentent mais son cours baisse. Quelle est une explication probable ?",
        options: ["L'entreprise doit cacher quelque chose", "Les investisseurs paient désormais un multiple plus faible des bénéfices", "Les actions baissent toujours après la publication des résultats", "Le dividende était trop élevé"],
        explanation: "Le prix, ce sont les bénéfices multipliés par le multiple. Si le multiple baisse plus vite que les bénéfices ne montent, le cours recule.",
      },
      {
        question: "Sur de longues périodes, quels ingrédients ont en général porté l'essentiel du rendement des actions ?",
        options: ["Les seules variations du multiple de valorisation", "La croissance des bénéfices et les dividendes", "Les divisions d'actions", "Le volume d'échanges"],
        explanation: "Les multiples varient beaucoup mais tendent à revenir ; sur plusieurs décennies, la croissance des bénéfices et les dividendes font l'essentiel du travail.",
      },
    ],
  },

  bonds: {
    minute:
      "Une obligation est un prêt : vous recevez des intérêts en chemin et votre capital à l'échéance, si l'emprunteur paie. Avant l'échéance, son prix évolue en sens inverse des taux d'intérêt, et plus l'obligation est longue, plus le mouvement est fort. La qualité de crédit détermine le supplément d'intérêt reçu pour le risque de défaut.",
    steps: [
      { title: "L'émetteur emprunte", text: "Un État ou une entreprise émet des obligations avec une valeur nominale, un taux de coupon et une date d'échéance, par exemple une obligation à dix ans qui verse 3 % par an." },
      { title: "Vous encaissez les coupons", text: "Chaque année (ou chaque semestre), l'émetteur verse les intérêts. À l'échéance, il rembourse la valeur nominale." },
      { title: "Les taux changent", text: "Si les taux du marché montent à 5 %, un nouvel acheteur peut obtenir 5 % ailleurs : l'obligation à 3 % doit alors s'échanger sous sa valeur nominale pour offrir un rendement compétitif." },
      { title: "La duration mesure la sensibilité", text: "La duration, exprimée en années, donne une approximation de la variation du prix en pourcentage pour un mouvement d'un point des taux. Une duration de 8 signifie environ 8 % de perte si les taux montent d'un point." },
      { title: "Le risque de crédit", text: "Les agences de notation évaluent les émetteurs. Une note plus basse implique un rendement plus élevé, car le risque d'impayé est plus fort ; après un défaut, les investisseurs peuvent ne récupérer qu'une partie de leur argent." },
    ],
    visualCaption: "À vous : faites varier le taux du marché et regardez le prix de l'obligation réagir. Les échéances longues réagissent davantage. Obligation illustrative à coupons annuels.",
    example: {
      title: "Quand les taux ont monté vite",
      paragraphs: [
        "En 2022, les banques centrales ont relevé rapidement leurs taux pour lutter contre l'inflation. Le prix des obligations d'État longues déjà émises a fortement baissé, et de nombreux fonds obligataires ont connu l'une de leurs pires années, au moment même où les actions reculaient.",
        "Les investisseurs qui détenaient des obligations de qualité jusqu'à l'échéance ont tout de même reçu chaque coupon et leur capital : les pertes portaient sur la valeur de marché, pas sur les paiements. Ceux qui devaient vendre avant l'échéance, ou qui détenaient des fonds à duration longue, ont subi toute la baisse des prix.",
        "Les mêmes mécanismes touchent désormais la crypto : les fonds de bons du Trésor tokenisés et les réserves des grands stablecoins détiennent de la dette d'État à court terme, choisie justement parce que les échéances courtes bougent peu quand les taux changent. La leçon sur la tokenisation des RWA explique comment.",
      ],
    },
    metrics: [
      { label: "Rendement à l'échéance", read: "Le rendement annuel si vous achetez au prix du jour et conservez jusqu'à l'échéance, tous les paiements étant honorés. Il évolue en sens inverse du prix." },
      { label: "Duration", read: "La sensibilité aux taux d'intérêt, en années. Une duration plus élevée signifie des variations de prix plus fortes quand les taux bougent." },
      { label: "Note de crédit", read: "L'avis des agences sur la capacité de l'émetteur à payer. Sous la catégorie investissement, le rendement est plus élevé et le risque de défaut aussi." },
      { label: "Rendement face à l'inflation", read: "Une obligation qui rapporte moins que l'inflation perd du pouvoir d'achat, même si chaque paiement arrive." },
    ],
    misconceptions: [
      { myth: "Les obligations ne peuvent pas perdre d'argent.", reality: "Leur prix de marché baisse quand les taux montent, et les émetteurs peuvent faire défaut. Conserver une obligation de qualité jusqu'à l'échéance limite la perte à l'effet de l'inflation." },
      { myth: "Les obligations montent toujours quand les actions baissent.", reality: "Souvent, mais pas toujours : en 2022, les deux ont baissé ensemble, car la hausse des taux les a frappées toutes les deux." },
      { myth: "Un rendement plus élevé est forcément meilleur.", reality: "Un rendement élevé signale en général plus de risque de crédit ou une échéance plus longue, donc une perte potentielle plus importante." },
    ],
    risks: [
      "Le risque de taux : les échéances longues peuvent beaucoup perdre quand les taux montent.",
      "Le risque de crédit : l'émetteur peut manquer des paiements ou faire défaut.",
      "Le risque d'inflation : des paiements fixes achètent moins quand les prix montent.",
      "Le risque de liquidité : certaines obligations sont difficiles à vendre vite à un prix correct.",
    ],
    quiz: [
      {
        question: "Les taux d'intérêt montent. Qu'arrive-t-il au prix d'une obligation à taux fixe déjà émise ?",
        options: ["Il monte", "Il baisse", "Il reste à la valeur nominale", "Il double"],
        explanation: "Les nouvelles obligations rapportent plus : l'ancien coupon, plus faible, vaut moins, et son prix baisse jusqu'à ce que son rendement s'aligne sur le marché.",
      },
      {
        question: "Quel placement est le plus sensible à une variation des taux ?",
        options: ["Une obligation à un an", "Une obligation à trente ans", "Un fonds monétaire", "Un livret d'épargne"],
        explanation: "Plus l'échéance, et donc la duration, est longue, plus les paiements lointains sont réévalués, et plus le prix bouge.",
      },
      {
        question: "Pourquoi une entreprise moins bien notée paie-t-elle un taux d'intérêt plus élevé ?",
        options: ["Parce qu'elle est plus rentable", "Pour compenser un risque de défaut plus élevé pour les prêteurs", "Parce que les régulateurs l'exigent", "Parce que ses obligations sont plus courtes"],
        explanation: "Les prêteurs exigent un supplément de rendement pour le risque que les coupons ou le capital ne soient pas payés.",
      },
    ],
  },
};
