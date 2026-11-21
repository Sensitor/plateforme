import type { ConceptText, DeepText } from "@/lib/academy/localized";

/** Traduction française des leçons « Par où commencer » (8 à 10). Mêmes faits et même structure que la version anglaise. */

export const TEXT_3: Record<string, ConceptText> = {
  "layer-2-rollups": {
    title: "Rollups de layer 2",
    summary: "Des chaînes qui exécutent les transactions hors de la couche de base et y publient données et preuves, en héritant d'une partie de sa sécurité.",
    body: [
      "Un rollup regroupe de nombreuses transactions, les exécute hors chaîne et publie les données de transaction (ou les différences d'état) sur une couche de base comme Ethereum. N'importe qui peut reconstruire l'état du rollup à partir de ces données.",
      "Les rollups optimistes supposent les lots valides et prévoient une fenêtre de contestation pendant laquelle chacun peut soumettre une preuve de fraude. Les rollups ZK joignent une preuve de validité que la couche de base vérifie directement.",
      "La sécurité dépend des détails : qui peut mettre à jour les contrats, les preuves sont-elles actives et ouvertes à tous, et les utilisateurs peuvent-ils sortir si l'opérateur les censure ? Le cadre des « stages » de L2BEAT résume cette maturité.",
    ],
    keyTakeaways: ["Exécution hors chaîne, données sur la couche de base", "Preuves de fraude ou preuves de validité", "Les clés de mise à jour et les fenêtres de sortie définissent la sécurité réelle"],
  },
  "market-cap-vs-fdv": {
    title: "Capitalisation et FDV",
    summary: "La capitalisation valorise l'offre en circulation ; la valorisation entièrement diluée valorise l'offre totale ou maximale.",
    body: [
      "Capitalisation = prix × offre en circulation. Valorisation entièrement diluée (FDV) = prix × offre totale ou maximale, c'est-à-dire la valeur si tous les tokens qui existeront un jour étaient en circulation aujourd'hui.",
      "Un grand écart entre capitalisation et FDV signale une dilution à venir, par des déblocages ou des émissions. La pression vendeuse liée à ces déblocages peut peser sur le prix si la demande ne progresse pas.",
      "Des ratios comme capitalisation / FDV aident à comparer des projets à différents stades de leur calendrier d'émission.",
    ],
    keyTakeaways: ["La FDV inclut l'offre future", "Grand écart = dilution à venir", "Utilisez le ratio MC/FDV pour comparer"],
  },
  "token-unlocks": {
    title: "Vesting et déblocages de tokens",
    summary: "Des calendriers qui libèrent dans le temps les tokens attribués aux équipes, aux investisseurs et aux trésoreries.",
    body: [
      "Les initiés reçoivent en général des tokens soumis à un cliff (aucun token pendant une période), suivi d'un vesting linéaire. Quand les tokens se débloquent, leurs détenteurs peuvent les vendre.",
      "Les déblocages sont publics et programmés, mais leur impact sur le marché dépend de qui reçoit les tokens, de leur prix de revient et de la liquidité du moment.",
      "Les analystes suivent les déblocages à venir en pourcentage de l'offre en circulation et du volume d'échanges quotidien.",
    ],
    keyTakeaways: ["Un cliff puis un vesting linéaire, c'est le schéma classique", "La taille rapportée à la liquidité détermine l'impact", "Vérifiez le prix de revient des bénéficiaires"],
  },
};

export const DEEP_3: Record<string, DeepText> = {
  "layer-2-rollups": {
    minute:
      "Un rollup exécute les transactions à l'écart de la chaîne principale, puis les publie sous forme compressée sur Ethereum avec un moyen de prouver qu'elles ont été correctement traitées. Les utilisateurs paient moins de frais tout en héritant d'une grande partie de la sécurité d'Ethereum, tant que les hypothèses de confiance propres au rollup tiennent.",
    steps: [
      { title: "Exécuter hors chaîne", text: "Un séquenceur ordonne les transactions des utilisateurs et les exécute sur le rollup, en donnant des confirmations provisoires quasi instantanées." },
      { title: "Publier les données", text: "Les lots de données de transaction sont publiés sur Ethereum, surtout dans des blobs depuis l'EIP-4844, pour que n'importe qui puisse reconstruire l'état du rollup sans faire confiance à l'opérateur." },
      {
        title: "Prouver l'exactitude",
        text: "Les rollups optimistes supposent les lots valides, sauf si quelqu'un soumet une preuve de fraude pendant une fenêtre de contestation, d'environ sept jours pour les retraits. Les rollups ZK joignent une preuve de validité à chaque lot.",
      },
      { title: "Régler les retraits", text: "Les fonds reviennent sur Ethereum via le contrat de bridge du rollup une fois le lot finalisé, après la fenêtre de contestation ou dès que la preuve est vérifiée." },
      { title: "Garder une issue de secours", text: "Les rollups matures permettent aux utilisateurs de forcer leurs transactions ou de sortir via Ethereum si le séquenceur les censure ou tombe en panne." },
    ],
    visualCaption: "Comment un rollup hérite de la sécurité d'Ethereum : les transactions s'exécutent sur le rollup, les données et les preuves se règlent sur Ethereum.",
    example: {
      title: "Arbitrum : un rollup optimiste et ses hypothèses de confiance",
      paragraphs: [
        "Arbitrum One publie ses lots de transactions sur Ethereum et les sécurise par des preuves de fraude. Son protocole de contestation BoLD permet à n'importe qui de participer à la validation, au lieu d'un groupe autorisé.",
        "Comme la plupart des rollups, il repose sur un séquenceur unique, et un Security Council de 12 membres peut effectuer des mises à jour d'urgence. Ce sont précisément les hypothèses de confiance que mesurent les stages de L2BEAT, et le dossier Arbitrum les suit.",
      ],
    },
    metrics: [
      { label: "Stage (L2BEAT)", read: "De 0 à 2 : à quel point les utilisateurs dépendent encore des opérateurs. Le stage 0, ce sont les petites roues ; le stage 2 signifie que les preuves et le code font foi, avec des pouvoirs d'urgence limités." },
      { label: "Système de preuves", read: "Les preuves de fraude ou de validité sont-elles actives, et chacun peut-il les soumettre ou seulement un groupe autorisé ?" },
      { label: "Séquenceur et inclusion forcée", read: "Qui ordonne les transactions, et les utilisateurs peuvent-ils contourner le séquenceur via Ethereum ?" },
      { label: "Fenêtre de sortie", read: "Le temps dont disposent les utilisateurs pour retirer leurs fonds avant qu'une mise à jour s'applique. Si elle est plus courte que le délai de retrait, ils ne peuvent pas échapper à une mise à jour non désirée." },
    ],
    misconceptions: [
      { myth: "Tous les layer 2 sont aussi sûrs les uns que les autres.", reality: "La sécurité dépend des preuves, des clés de mise à jour et de l'endroit où les données sont publiées. L2BEAT suit ces différences rollup par rollup." },
      { myth: "Retirer ses fonds d'un rollup optimiste est instantané.", reality: "Les retraits natifs attendent la fin de la fenêtre de contestation, environ une semaine. Les bridges rapides paient des fournisseurs de liquidité pour avancer les fonds et ajoutent leurs propres risques." },
      { myth: "Le token du rollup sécurise le rollup.", reality: "La sécurité vient d'Ethereum et du système de preuves. Beaucoup de tokens de rollup sont des tokens de gouvernance sans rôle dans la validation des transactions." },
    ],
    risks: [
      "Un séquenceur centralisé capable de censurer ou de tomber en panne.",
      "Des clés de mise à jour ou des conseils capables de modifier les contrats qui détiennent les fonds des utilisateurs.",
      "Le risque des bridges et la fragmentation de la liquidité entre de nombreux rollups.",
    ],
    quiz: [
      {
        question: "Sur quoi un rollup optimiste s'appuie-t-il pour détecter les lots invalides ?",
        options: ["Une preuve de validité jointe à chaque lot", "Des preuves de fraude soumises pendant une fenêtre de contestation", "Un vote des détenteurs du token", "La réputation du séquenceur"],
        explanation: "Les rollups optimistes supposent les lots valides et laissent n'importe qui contester un lot erroné avant qu'il ne soit finalisé.",
      },
      {
        question: "Pourquoi un rollup doit-il publier ses données de transaction sur Ethereum ?",
        options: ["Pour payer davantage de frais aux validateurs", "Pour que n'importe qui puisse reconstruire l'état, le vérifier et sortir sans l'opérateur", "Parce qu'Ethereum stocke tous les tokens des rollups", "Pour rendre les transactions privées"],
        explanation: "Les données publiées permettent aux utilisateurs et aux contestataires d'agir indépendamment de l'opérateur du rollup.",
      },
      {
        question: "Qu'indique une note stage 0 sur L2BEAT ?",
        options: ["Le rollup ne demande aucune confiance", "Le rollup n'a pas encore d'utilisateurs", "Les utilisateurs dépendent encore fortement des opérateurs", "Le rollup a été fermé"],
        explanation: "Les rollups au stage 0 ont encore leurs petites roues : les opérateurs peuvent par exemple mettre à jour les contrats sans fenêtre de sortie suffisante.",
      },
    ],
  },

  "market-cap-vs-fdv": {
    minute:
      "La capitalisation valorise les tokens déjà en circulation : prix × offre en circulation. La valorisation entièrement diluée (FDV) valorise toute l'offre future au prix actuel : prix × offre maximale, ou offre totale selon le fournisseur de données. L'écart montre combien d'offre future le marché doit encore absorber.",
    steps: [
      { title: "Offre en circulation", text: "Les tokens qui peuvent s'échanger librement aujourd'hui. Les allocations bloquées de l'équipe, des investisseurs et de la trésorerie en sont exclues." },
      { title: "Capitalisation", text: "Prix × offre en circulation. C'est la valeur de la partie échangeable du réseau au prix actuel." },
      { title: "Valorisation entièrement diluée", text: "Prix × offre maximale, ou prix × offre totale créée à ce jour, selon le fournisseur de données. CoinGecko, le fournisseur utilisé par Sensitor, publie la version fondée sur l'offre totale : vérifiez la définition avant de comparer des chiffres." },
      { title: "Ratio de flottant", text: "La capitalisation divisée par la FDV. Un ratio faible signifie que la plus grande partie de l'offre future est encore bloquée ou pas encore émise." },
      { title: "Le lire avec le calendrier", text: "Le ratio ne compte qu'à travers le calendrier de déblocages : combien de tokens arrivent, quand, et entre quelles mains." },
    ],
    visualCaption: "Le ratio de flottant en direct sur la couverture Sensitor : la capitalisation en circulation rapportée à la valorisation entièrement diluée.",
    example: {
      title: "Sur l'ensemble de la couverture Sensitor",
      paragraphs: [
        "Les actifs matures, dont l'offre est en grande partie émise, ont un ratio de flottant proche de 100 %. Les tokens récents, avec de grosses allocations encore bloquées pour les équipes, les investisseurs ou les trésoreries, sont bien plus bas : davantage d'offre doit encore arriver sur le marché.",
        "Comme le fournisseur utilise l'offre totale, un actif plafonné encore en cours de minage, comme Bitcoin, affiche une FDV égale à sa capitalisation, et les actifs non plafonnés comme l'ETH ou le SOL ont une FDV qui évolue avec l'émission et les burns. Le tableau est calculé en direct à partir des données du fournisseur.",
      ],
    },
    metrics: [
      { label: "Ratio de flottant (capitalisation / FDV)", read: "La part de l'offre future déjà en circulation. Plus il est bas, plus la dilution à venir est forte." },
      { label: "Déblocages à venir face au volume", read: "La taille des prochains déblocages comparée au volume d'échanges quotidien moyen. Indique à quel point la nouvelle offre peut être absorbée facilement." },
      { label: "Qui reçoit les déblocages", read: "L'équipe et les premiers investisseurs n'ont pas les mêmes incitations que des subventions d'écosystème ou des programmes communautaires." },
      { label: "Croissance de la demande", read: "L'usage, les frais ou le staking progressent-ils assez vite pour absorber les nouveaux tokens ?" },
    ],
    misconceptions: [
      { myth: "Un prix unitaire bas signifie que le token n'est pas cher.", reality: "Le prix d'un token ne veut rien dire sans l'offre. Comparez les capitalisations et les FDV, pas les prix unitaires." },
      { myth: "La FDV est la vraie valorisation.", reality: "La FDV suppose que chaque token futur vaudra le prix d'aujourd'hui. La dilution réelle dépend du calendrier et de la demande." },
      { myth: "Un flottant faible est toujours baissier.", reality: "Il signale une offre future, mais le résultat dépend de qui la reçoit et de la progression de la demande. C'est un facteur de risque, pas un verdict." },
    ],
    risks: [
      "Une dilution à venir due à de grosses allocations bloquées.",
      "Des chiffres d'offre en circulation qui diffèrent selon les fournisseurs de données.",
      "Des tokens de trésorerie ou d'écosystème comptés comme en circulation mais rarement vendus, ou l'inverse.",
    ],
    quiz: [
      {
        question: "Un token vaut 2 dollars, avec 500 millions d'unités en circulation et une offre maximale de 2 milliards. Quelles sont sa capitalisation et sa FDV ?",
        options: ["1 milliard et 4 milliards de dollars", "4 milliards et 1 milliard de dollars", "500 millions et 2 milliards de dollars", "1 milliard et 2 milliards de dollars"],
        explanation: "Capitalisation = 2 × 500 M = 1 milliard de dollars. FDV = 2 × 2 Md = 4 milliards de dollars. Le ratio de flottant est de 25 %.",
      },
      {
        question: "Que signifie un ratio de flottant de 25 % ?",
        options: ["25 % des détenteurs sont des baleines", "75 % de l'offre future n'est pas encore en circulation", "Le token est sous-évalué de 25 %", "25 % des tokens ont été brûlés"],
        explanation: "Seul un quart de l'offre comptée dans la FDV est échangeable aujourd'hui ; le reste est bloqué ou pas encore émis.",
      },
      {
        question: "Un token coûte 0,10 dollar, un autre 100 dollars. Lequel est le moins cher ?",
        options: ["Le token à 0,10 dollar", "Le token à 100 dollars", "Impossible à dire sans connaître leur offre", "Ils ont le même prix"],
        explanation: "La valorisation, c'est prix × offre. Un token à 0,10 dollar avec une offre énorme peut valoir bien plus qu'un token à 100 dollars.",
      },
    ],
  },

  "token-unlocks": {
    minute:
      "La plupart des tokens sont lancés avec de grosses allocations bloquées pour l'équipe, les investisseurs et la trésorerie. Des calendriers de vesting les libèrent dans le temps, souvent après un cliff. Les déblocages ajoutent de l'offre sur le marché : c'est une donnée clé pour juger la dilution.",
    steps: [
      { title: "Allocation", text: "Au lancement, l'offre est répartie entre la communauté, le fonds d'écosystème, l'équipe, les investisseurs et la trésorerie." },
      { title: "Cliff", text: "Les allocations bloquées ne libèrent rien pendant une période initiale, souvent douze mois, pour que les initiés ne puissent pas vendre juste après le lancement." },
      { title: "Vesting linéaire", text: "Après le cliff, les tokens se débloquent progressivement, chaque mois ou bloc par bloc, jusqu'à ce que l'allocation soit entièrement acquise." },
      { title: "Déblocage", text: "Les tokens nouvellement acquis deviennent transférables. Leurs bénéficiaires peuvent les conserver, les staker, les utiliser en gouvernance ou les vendre." },
      { title: "Absorption", text: "L'impact sur le marché dépend de la taille du déblocage rapportée au volume d'échanges, et des incitations des bénéficiaires." },
    ],
    visualCaption: "Un calendrier fictif : un vesting sur quatre ans avec un cliff d'un an. Chiffres hypothétiques, pas un vrai token.",
    example: {
      title: "Les calendriers d'émission dans les dossiers Sensitor",
      paragraphs: [
        "Les allocations de l'équipe et des investisseurs d'Arbitrum n'ont rien débloqué pendant l'année qui a suivi le lancement de mars 2023. Les libérations ont commencé en mars 2024 et se poursuivent chaque mois jusqu'en mars 2027. Plusieurs autres projets couverts suivent des schémas comparables.",
        "Le calendrier ci-dessous liste les échéanciers documentés dans les dossiers. Les montants exacts par événement nécessitent un flux de données sous licence, prévu dans une phase ultérieure.",
      ],
    },
    metrics: [
      { label: "Taille du déblocage face au volume quotidien", read: "Un déblocage qui vaut plusieurs fois le volume d'échanges quotidien est plus difficile à absorber pour le marché." },
      { label: "Type de bénéficiaire", read: "Les premiers investisseurs, entrés à un prix bas, n'ont pas les mêmes incitations qu'un fonds d'écosystème qui verse des subventions sur des années." },
      { label: "Part cumulée débloquée", read: "La part de l'offre future déjà liquide. Elle est étroitement liée au ratio de flottant." },
      { label: "Croissance de l'offre sur les douze prochains mois", read: "Déblocages plus émission, moins burns. Elle indique de combien la demande doit croître rien que pour stabiliser le prix." },
    ],
    misconceptions: [
      { myth: "Les déblocages font toujours baisser le prix.", reality: "Les calendriers sont publics et en partie anticipés. L'impact varie selon la taille, les bénéficiaires et la demande du moment." },
      { myth: "Les tokens débloqués sont vendus.", reality: "Les tokens débloqués deviennent transférables. Beaucoup sont conservés, stakés ou utilisés en gouvernance ; les flux on-chain vers les plateformes d'échange sont un meilleur signal de vente." },
      { myth: "L'offre en circulation n'augmente que par les déblocages.", reality: "L'émission versée aux validateurs, les burns et les rachats modifient aussi l'offre." },
    ],
    risks: [
      "Une offre en attente qui pèse sur le marché pendant des années.",
      "Des initiés qui vendent face à la demande de la communauté.",
      "Des calendriers opaques, ou modifiés plus tard par la gouvernance.",
    ],
    quiz: [
      {
        question: "Qu'est-ce qu'un cliff dans un calendrier de vesting ?",
        options: ["La date à laquelle tous les tokens se débloquent d'un coup", "Une période initiale pendant laquelle rien ne se débloque", "Une chute brutale du prix après un déblocage", "L'offre maximale d'un token"],
        explanation: "Pendant le cliff, aucun token n'est acquis ; le vesting commence, ou rattrape son retard, à la fin du cliff.",
      },
      {
        question: "Une allocation d'équipe de 200 millions de tokens est acquise linéairement sur 36 mois après un cliff d'un an, sans rien libérer au cliff. Combien se débloque chaque mois ?",
        options: ["Environ 5,56 millions", "Environ 16,7 millions", "200 millions", "Environ 2,78 millions"],
        explanation: "200 millions divisés par 36 mois, cela fait environ 5,56 millions de tokens par mois.",
      },
      {
        question: "Quelle est la première vérification la plus utile face à un déblocage à venir ?",
        options: ["Le plus haut historique du token", "Sa taille rapportée au volume d'échanges quotidien, et qui le reçoit", "Le nombre d'abonnés sur les réseaux sociaux", "La couleur du logo du projet"],
        explanation: "La taille rapportée à la liquidité et les incitations des bénéficiaires en disent le plus sur la façon dont le marché pourra l'absorber.",
      },
    ],
  },
};
