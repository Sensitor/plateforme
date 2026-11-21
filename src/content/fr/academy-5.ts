import type { ConceptText, DeepText } from "@/lib/academy/localized";

/** Traduction française : séquenceurs et disponibilité des données. Mêmes faits et même structure que la version anglaise. */

export const TEXT_5: Record<string, ConceptText> = {
  sequencers: {
    title: "Séquenceurs",
    summary: "L'entité qui ordonne les transactions sur un rollup, aujourd'hui le plus souvent un opérateur unique.",
    body: [
      "Sur la plupart des rollups, un séquenceur unique reçoit les transactions des utilisateurs, les ordonne et produit les blocs. Cela donne des confirmations rapides, mais crée un point central qui pourrait censurer, réordonner (MEV) ou tomber en panne.",
      "Les rollups bien conçus permettent aux utilisateurs de forcer l'inclusion de leurs transactions via la couche de base si le séquenceur les censure. Le séquençage décentralisé ou partagé est un domaine de recherche actif.",
      "Les frais du séquenceur moins les coûts de publication des données forment la marge brute d'un rollup, la principale ligne de revenus de la plupart des L2.",
    ],
    keyTakeaways: ["Le plus souvent centralisé aujourd'hui", "L'inclusion forcée protège les utilisateurs", "La marge du séquenceur est le revenu d'un L2"],
  },
  "data-availability": {
    title: "Disponibilité des données",
    summary: "La garantie que les données d'un bloc ont été publiées, pour que chacun puisse vérifier ou reconstruire l'état.",
    body: [
      "Vérifier une chaîne exige d'avoir accès aux données sous-jacentes. Si un producteur de blocs publie l'en-tête d'un bloc mais retient les données, personne ne peut le vérifier. Les couches de disponibilité des données (data availability, DA) se spécialisent dans la garantie que les données ont bien été publiées.",
      "L'échantillonnage de disponibilité des données (data availability sampling, DAS) permet aux nœuds légers de vérifier cette disponibilité en téléchargeant de petits morceaux aléatoires de données dotées d'un codage d'effacement : la capacité peut ainsi croître avec le nombre de nœuds qui échantillonnent plutôt qu'avec la bande passante de chaque nœud.",
      "Les rollups choisissent une couche DA, les blobs d'Ethereum, Celestia, EigenDA ou d'autres, en arbitrant entre coût, sécurité et intégration avec leur couche de règlement.",
    ],
    keyTakeaways: ["La vérification exige des données publiées", "L'échantillonnage passe la vérification à l'échelle", "Le choix de la couche DA influe sur la sécurité du rollup"],
  },
};

export const DEEP_5: Record<string, DeepText> = {
  sequencers: {
    minute:
      "Un séquenceur reçoit les transactions d'un rollup, décide de leur ordre, les exécute et publie les résultats sur la chaîne de base. La plupart des rollups fonctionnent aujourd'hui avec un séquenceur unique opéré par leur équipe : rapide et simple, mais c'est un point central qui peut censurer, extraire de la MEV ou tomber en panne.",
    steps: [
      { title: "Recevoir", text: "Les utilisateurs envoient leurs transactions au séquenceur plutôt que directement à Ethereum." },
      { title: "Ordonner et confirmer", text: "Le séquenceur ordonne les transactions, les exécute et renvoie des confirmations provisoires en une fraction de seconde." },
      { title: "Regrouper et publier", text: "Il compresse les transactions en lots et les publie sur Ethereum, en payant les coûts de données." },
      { title: "Inclusion forcée", text: "Si le séquenceur ignore un utilisateur, celui-ci peut soumettre sa transaction via un contrat sur Ethereum, que le rollup doit inclure après un délai." },
      { title: "Dégager une marge", text: "Les frais encaissés sur le rollup moins les coûts de données payés à Ethereum forment la marge du séquenceur, la principale ligne de revenus de la plupart des rollups." },
    ],
    visualCaption: "Le séquenceur se place entre les utilisateurs et Ethereum : pratique, et un point de contrôle.",
    flow: {
      nodes: [
        { title: "Utilisateurs", text: "Envoient des transactions au rollup." },
        { title: "Séquenceur", text: "Les ordonne, les exécute et les confirme provisoirement." },
        { title: "Lots", text: "Compressés et publiés sur Ethereum." },
        { title: "Ethereum", text: "Conserve les données et assure le règlement du rollup." },
      ],
      outcomes: {
        positive: "Des confirmations rapides et des frais bas grâce à un opérateur unique et efficace.",
        negative: "Un point de défaillance unique pour la censure, la MEV et les pannes, atténué seulement par l'inclusion forcée.",
      },
    },
    example: {
      title: "L'économie des séquenceurs dans la couverture",
      paragraphs: [
        "Le séquenceur d'Arbitrum ordonne les transactions et publie des lots sur Ethereum, en donnant des confirmations provisoires. Le dossier retient les revenus du séquenceur moins les coûts de données sur Ethereum comme indicateur clé, et note que les revenus de Timeboost vont à la trésorerie de la DAO.",
        "Les chaînes de la Superchain d'Optimism reversent une part des revenus de leur séquenceur à l'Optimism Collective : l'économie du collectif dépend donc des marges de séquenceur de nombreuses chaînes, pas d'une seule.",
      ],
    },
    metrics: [
      { label: "Marge du séquenceur", read: "Les frais du rollup moins les coûts de données sur Ethereum. Elle montre si le rollup gagne de l'argent grâce à ses utilisateurs." },
      { label: "Disponibilité et incidents", read: "À quelle fréquence le séquenceur s'est arrêté ou a été dégradé, et pendant combien de temps." },
      { label: "Délai d'inclusion forcée", read: "Combien de temps un utilisateur censuré doit attendre avant qu'Ethereum n'impose sa transaction." },
      { label: "Plans de décentralisation", read: "Séquençage partagé ou « based », et s'il est en service ou seulement sur une feuille de route." },
    ],
    misconceptions: [
      { myth: "Si le séquenceur tombe en panne, les fonds sont perdus.", reality: "Les fonds restent sécurisés sur Ethereum. Les utilisateurs peuvent attendre, ou passer par l'inclusion forcée et le bridge pour sortir, avec des délais." },
      { myth: "Un séquenceur centralisé peut voler les fonds.", reality: "Il peut censurer ou réordonner des transactions, mais il ne peut pas faire accepter un état invalide si le système de preuves fonctionne." },
      { myth: "Les confirmations provisoires sont définitives.", reality: "La finalité arrive une fois le lot publié sur Ethereum et, pour les retraits, une fois la période de preuve ou de contestation terminée." },
    ],
    risks: [
      "La censure de certains utilisateurs ou de certaines applications.",
      "Une panne qui gèle l'activité sur le rollup.",
      "L'extraction de valeur par l'ordre des transactions.",
    ],
    quiz: [
      {
        question: "À quoi sert l'inclusion forcée ?",
        options: ["À accélérer les confirmations", "À permettre aux utilisateurs de contourner un séquenceur qui censure, via la chaîne de base", "À baisser les frais", "À émettre de nouveaux tokens"],
        explanation: "Une transaction soumise sur Ethereum doit finir par être incluse par le rollup, quoi que veuille le séquenceur.",
      },
      {
        question: "Quelle est la principale ligne de revenus de la plupart des rollups ?",
        options: ["La vente de tokens", "Les frais encaissés sur le rollup moins les coûts de données payés à Ethereum", "Les récompenses de staking", "Les dépôts sur le bridge"],
        explanation: "La marge du séquenceur est l'écart entre ce que les utilisateurs paient sur le rollup et ce que le rollup paie à Ethereum.",
      },
      {
        question: "Si le système de preuves fonctionne, que ne peut pas faire un séquenceur centralisé ?",
        options: ["Réordonner des transactions", "Retarder des transactions", "Faire accepter un état invalide qui vole des fonds", "Tomber en panne"],
        explanation: "Le pouvoir d'ordonner n'est pas le pouvoir de valider : un état frauduleux serait rejeté par les preuves sur Ethereum.",
      },
    ],
  },
  "data-availability": {
    minute:
      "Pour vérifier une chaîne, il faut ses données. La disponibilité des données est la garantie que les données d'un bloc ont réellement été publiées, pour que chacun puisse les vérifier ou reconstruire l'état. Les rollups doivent acheter cette garantie quelque part : sur Ethereum, sur un réseau spécialisé ou auprès d'un comité.",
    steps: [
      { title: "Pourquoi c'est important", text: "Un producteur de blocs pourrait publier un en-tête de bloc d'apparence valide et retenir les données. Sans les données, personne ne peut prouver une fraude ni reconstruire les soldes pour sortir." },
      { title: "Publier", text: "Les rollups publient leurs données de transactions sur une couche de disponibilité des données : les blobs d'Ethereum depuis l'EIP-4844, ou des réseaux externes comme Celestia ou EigenDA." },
      { title: "Ajouter de la redondance", text: "Le codage d'effacement étend les données avec de la redondance, de sorte que le bloc entier puisse être reconstitué à partir d'une partie des morceaux." },
      { title: "Échantillonner", text: "Les nœuds légers téléchargent quelques petits morceaux aléatoires. Si suffisamment d'échantillons réussissent, les données complètes sont disponibles avec une très forte probabilité, sans que personne ne télécharge tout." },
      { title: "Peser les compromis", text: "Le coût, la sécurité de la couche de données et la façon dont les preuves de disponibilité parviennent à la chaîne de règlement changent tous ce à quoi les utilisateurs font confiance." },
    ],
    visualCaption: "L'endroit où un rollup publie ses données décide à qui les utilisateurs doivent faire confiance pour vérifier et sortir.",
    table: {
      columns: ["Blobs d'Ethereum", "Réseau DA externe", "Comité de données"],
      rows: [
        { label: "Qui garantit les données", values: ["Les validateurs d'Ethereum", "Les validateurs du réseau lui-même (par exemple Celestia)", "Un petit groupe de membres connus"] },
        { label: "Coût relatif", values: ["Frais de blob fixés par le marché", "En général plus bas", "Le plus bas"] },
        { label: "À qui vous faites confiance", values: ["Ethereum lui-même", "Le réseau DA et son bridge vers Ethereum", "L'honnêteté du comité"] },
        { label: "Appellation habituelle", values: ["Rollup", "Souvent classé validium ou optimium", "Validium ou optimium"] },
      ],
    },
    example: {
      title: "Celestia et les blobs d'Ethereum",
      paragraphs: [
        "Celestia est née du papier LazyLedger : une chaîne qui se contente d'ordonner les données et de garantir leur disponibilité, en laissant l'exécution à d'autres. L'échantillonnage de disponibilité et le codage d'effacement en deux dimensions permettent à la taille de ses blocs de croître à mesure que davantage de nœuds légers échantillonnent.",
        "Les rollups qui utilisent Celestia depuis Ethereum s'appuient sur les validateurs de Celestia et sur Blobstream pour la garantie des données, un modèle de confiance différent de celui des blobs d'Ethereum. Le dossier note aussi que les frais payés à Celestia sont restés modestes, car la demande dépend du choix des rollups d'utiliser une disponibilité des données externe.",
      ],
    },
    metrics: [
      { label: "Usage et frais des blobs", read: "Le taux de remplissage de l'espace de données d'Ethereum. Des blobs durablement pleins font monter les frais et rendent les alternatives plus attractives." },
      { label: "Coût des données par transaction", read: "Ce qu'un rollup paie pour publier chaque transaction. Il détermine les frais que voient les utilisateurs." },
      { label: "Adoption de la DA externe", read: "Combien de rollups, et quelle valeur, dépendent de chaque couche de données." },
      { label: "Nombre de nœuds qui échantillonnent", read: "Plus il y a de nœuds légers qui échantillonnent, plus les garanties de disponibilité sont fortes et plus les blocs peuvent grandir." },
    ],
    misconceptions: [
      { myth: "Disponibilité des données veut dire stockage pour toujours.", reality: "Elle garantit une publication assez longue pour vérifier et sortir. Les blobs d'Ethereum sont supprimés au bout d'environ 18 jours." },
      { myth: "Une disponibilité des données moins chère n'est qu'une économie.", reality: "Elle change à qui les utilisateurs confient la sécurité de leurs fonds." },
      { myth: "Vérifier la disponibilité exige de télécharger des blocs entiers.", reality: "L'échantillonnage permet aux nœuds légers de la vérifier en téléchargeant quelques petits morceaux." },
    ],
    risks: [
      "La rétention de données, qui empêche les preuves de fraude et les sorties.",
      "Des bridges fragiles qui transportent les preuves de disponibilité entre chaînes.",
      "La collusion d'un petit comité de données.",
    ],
    quiz: [
      {
        question: "Pourquoi un rollup a-t-il besoin de disponibilité des données ?",
        options: ["Pour rendre son token plus rare", "Pour que chacun puisse vérifier l'état, prouver une fraude et sortir", "Pour accélérer le séquenceur", "Pour stocker les clés privées des utilisateurs"],
        explanation: "Sans données publiées, personne ne peut vérifier ce qu'a fait l'opérateur ni reconstruire les soldes pour retirer.",
      },
      {
        question: "Que permet l'échantillonnage de disponibilité des données ?",
        options: ["Des blocs plus rapides", "Aux nœuds légers de vérifier la disponibilité en téléchargeant de petits morceaux aléatoires", "Des transactions gratuites", "Des transactions privées"],
        explanation: "Grâce au codage d'effacement, une poignée d'échantillons aléatoires réussis donne une forte confiance que le bloc entier est disponible.",
      },
      {
        question: "Un rollup déplace ses données d'Ethereum vers un petit comité. Qu'est-ce qui change pour les utilisateurs ?",
        options: ["Rien du tout", "Ils doivent désormais faire confiance au comité pour garder les données disponibles", "Leurs fonds sont transférés au comité", "Les retraits deviennent instantanés"],
        explanation: "La garantie des données ne vient plus d'Ethereum mais des membres du comité.",
      },
    ],
  },
};
