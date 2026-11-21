import type { ConceptText, DeepText } from "@/lib/academy/localized";

/** Traduction française : bridges et messagerie entre chaînes, mesure de la décentralisation. Mêmes faits et même structure que la version anglaise. */

export const TEXT_12: Record<string, ConceptText> = {
  interoperability: {
    title: "Bridges et messagerie entre chaînes",
    summary: "Des protocoles qui déplacent des actifs et des messages entre des blockchains indépendantes.",
    body: [
      "Les bridges bloquent ou brûlent des actifs sur une chaîne et en émettent ou en libèrent sur une autre, sur la base d'un message attesté par un vérificateur. Les protocoles de messagerie généralisent ce principe à des données quelconques.",
      "Le vérificateur est l'hypothèse de confiance : un multisig, un réseau d'oracles, des clients légers ou des preuves à divulgation nulle de connaissance (zero-knowledge). Les piratages de bridges figurent parmi les plus grosses pertes de l'histoire de la crypto.",
      "Évaluez qui vérifie les messages, si les applications peuvent configurer leur propre sécurité, et quelle valeur dépend du bridge.",
    ],
    keyTakeaways: ["Vérificateur = hypothèse de confiance", "Historiquement un vecteur d'attaque majeur", "Une sécurité configurable transfère le risque aux applications"],
  },
  "validator-decentralization": {
    title: "Mesurer la décentralisation",
    summary: "Comment évaluer qui contrôle vraiment un réseau : mise, clients, hébergement, gouvernance.",
    body: [
      "Le nombre de validateurs seul est trompeur. Regardez le coefficient de Nakamoto (le nombre minimal d'entités qui contrôlent ensemble assez de mise pour arrêter ou censurer la chaîne), la diversité des clients, la concentration de l'hébergement et la répartition géographique.",
      "La gouvernance est un autre axe : qui peut mettre à jour le protocole, et une fondation ou une entreprise peut-elle changer les règles unilatéralement ?",
      "La décentralisation est un spectre et un compromis avec la performance ; la question est de savoir si son niveau est suffisant pour la valeur que le réseau sécurise.",
    ],
    keyTakeaways: ["Comptez les entités, pas les nœuds", "La diversité des clients et de l'hébergement compte", "La gouvernance fait partie de la décentralisation"],
  },
};

export const DEEP_12: Record<string, DeepText> = {
  interoperability: {
    minute:
      "Les blockchains ne peuvent pas se lire entre elles. Un bridge ou un protocole de messagerie déplace des actifs et des données de l'une à l'autre en faisant vérifier par quelqu'un ce qui s'est passé sur la chaîne d'origine. L'identité de ce vérificateur définit la sécurité, et les bridges ont subi certains des plus gros piratages de la crypto.",
    steps: [
      { title: "Bloquer ou brûler", text: "Les tokens sont bloqués dans un contrat, ou brûlés, sur la chaîne d'origine." },
      { title: "Vérifier l'événement", text: "Un vérificateur atteste que le blocage a eu lieu : un multisig, un réseau d'oracles ou de vérificateurs, un client léger ou une preuve zero-knowledge." },
      { title: "Émettre ou libérer", text: "La chaîne de destination émet une représentation du token, ou libère des tokens natifs depuis un pool." },
      { title: "Transporter des messages", text: "Les protocoles de messagerie généralisent l'idée à des données quelconques, pour que les applications puissent appeler des contrats sur d'autres chaînes." },
      { title: "Choisir la sécurité", text: "Certains protocoles laissent chaque application choisir ses propres vérificateurs, ce qui transfère les décisions de risque du protocole à l'application." },
    ],
    visualCaption: "Trois façons de vérifier un message entre chaînes, de la plus fondée sur la confiance à la plus minimale en confiance.",
    table: {
      columns: ["Multisig ou comité", "Réseau de vérificateurs", "Client léger ou preuve ZK"],
      rows: [
        { label: "Qui vérifie", values: ["Quelques détenteurs de clés", "Des opérateurs de nœuds indépendants", "La chaîne de destination vérifie le consensus de la chaîne d'origine"] },
        { label: "Principal risque", values: ["Vol de clés ou collusion", "Collusion des opérateurs ou configuration fragile", "Bugs dans un code complexe, coût plus élevé"] },
        { label: "Exemples", values: ["De nombreux bridges des débuts", "Chainlink CCIP, réseaux de vérificateurs de LayerZero", "IBC, bridges zero-knowledge"] },
      ],
    },
    example: {
      title: "Sécurité configurable contre conception figée",
      paragraphs: [
        "LayerZero v2 sépare la vérification, assurée par des réseaux de vérificateurs décentralisés (DVN), de l'exécution, et laisse chaque application définir sa propre pile de sécurité. Le dossier note que la sécurité ne vaut que ce que vaut la configuration choisie par l'application, et que les utilisateurs savent rarement quels vérificateurs sécurisent le token qu'ils détiennent.",
        "Chainlink CCIP adopte une autre approche : il ajoute un Risk Management Network distinct qui surveille l'activité entre chaînes et peut la mettre en pause.",
      ],
    },
    metrics: [
      { label: "Ensemble des vérificateurs", read: "Qui atteste les messages, combien ils sont, et à quel point ils sont indépendants." },
      { label: "Valeur en jeu", read: "La valeur détenue dans les contrats du bridge ou qui dépend de ses messages." },
      { label: "Configuration", read: "Pour les protocoles configurables, la configuration réellement utilisée par chaque application. Un vérificateur unique concentre la confiance." },
      { label: "Limites et surveillance", read: "Plafonds de débit, mécanismes de pause et historique des incidents." },
    ],
    misconceptions: [
      { myth: "Un token passé par un bridge est identique à l'original.", reality: "Un token « wrappé » est une créance sur des actifs bloqués par le bridge. Si le bridge fait défaut, la créance peut ne plus rien valoir." },
      { myth: "Plus de chaînes connectées signifie plus de sécurité.", reality: "La portée et la sécurité sont deux choses différentes ; chaque nouvelle connexion ajoute de la surface d'attaque." },
      { myth: "Les protocoles de messagerie suppriment la confiance.", reality: "Ils la déplacent vers les vérificateurs, la configuration et le code." },
    ],
    risks: [
      "Des vérificateurs ou des clés compromis qui libèrent des fonds sans dépôt réel.",
      "Des bugs dans la logique des contrats du bridge.",
      "Des tokens « wrappés » qui perdent leur adossement, avec une contagion à toutes les chaînes qui les utilisent.",
    ],
    quiz: [
      {
        question: "Qu'est-ce qui définit la sécurité d'un bridge ?",
        options: ["Le nombre de chaînes qu'il prend en charge", "Qui vérifie les événements sur la chaîne d'origine", "La capitalisation de son token", "La vitesse des transferts"],
        explanation: "Celui qui peut attester qu'un dépôt a eu lieu peut, s'il est compromis, libérer des fonds qui n'ont jamais été déposés.",
      },
      {
        question: "Qu'est-ce qu'un token « wrappé » ?",
        options: ["Un token au rendement plus élevé", "Une créance sur des actifs bloqués par un bridge", "Un token qui ne peut pas être échangé", "Un token de gouvernance"],
        explanation: "Sa valeur dépend entièrement de la sécurité des actifs bloqués dans le bridge.",
      },
      {
        question: "Pourquoi les piles de sécurité configurables sont-elles plus difficiles à évaluer pour les utilisateurs ?",
        options: ["Parce qu'elles sont plus lentes", "Parce que le risque dépend des vérificateurs choisis par chaque application, que les utilisateurs vérifient rarement", "Parce qu'elles prélèvent des frais plus élevés", "Parce qu'elles ne fonctionnent que sur une chaîne"],
        explanation: "Deux tokens sur le même protocole peuvent avoir une sécurité très différente selon leur configuration.",
      },
    ],
  },
  "validator-decentralization": {
    minute:
      "Compter les validateurs en dit peu sur qui contrôle un réseau. La décentralisation se mesure au nombre d'entités indépendantes qui devraient s'entendre pour arrêter ou censurer la chaîne, à la diversité de ses logiciels et de son hébergement, et à qui peut changer ses règles.",
    steps: [
      { title: "Regrouper par entité", text: "De nombreux validateurs peuvent appartenir à une même entreprise, plateforme d'échange ou pool de staking. Comptez les entités indépendantes, pas les nœuds." },
      { title: "Coefficient de Nakamoto", text: "Le nombre minimal d'entités qui contrôlent ensemble assez de mise pour arrêter ou censurer la chaîne. Sur Ethereum, plus d'un tiers de la mise peut bloquer la finalité." },
      { title: "Diversité des clients", text: "Si un seul logiciel client fait tourner la plupart des nœuds, un seul bug peut bloquer le réseau ou provoquer des pénalités massives." },
      { title: "Hébergement et géographie", text: "Une concentration chez quelques fournisseurs de cloud ou dans quelques pays crée des points de défaillance communs et des points de pression juridique." },
      { title: "Gouvernance", text: "Qui peut mettre à jour le protocole, si une fondation ou une entreprise peut changer les règles, et à quel point il serait difficile de coordonner un fork." },
    ],
    visualCaption: "Une check-list de la décentralisation : cinq dimensions, chacune avec son signal d'alerte.",
    table: {
      columns: ["Ce qu'il faut mesurer", "Signal d'alerte"],
      rows: [
        { label: "Mise", values: ["Part détenue par les plus grosses entités ; coefficient de Nakamoto", "Une poignée d'entités qui dépassent ensemble un tiers"] },
        { label: "Clients", values: ["Part des nœuds qui font tourner chaque implémentation de client", "Un client au-delà des deux tiers"] },
        { label: "Hébergement", values: ["Part des nœuds par fournisseur de cloud et par pays", "La plupart des nœuds chez un seul fournisseur ou dans une seule juridiction"] },
        { label: "Matériel", values: ["Coût et bande passante nécessaires pour faire tourner un nœud", "Seuls des centres de données peuvent suivre"] },
        { label: "Gouvernance", values: ["Qui peut mettre à jour le protocole, et avec quel délai", "Une seule organisation peut changer les règles seule"] },
      ],
    },
    example: {
      title: "Trois réseaux, trois compromis",
      paragraphs: [
        "Ethereum fait tourner plusieurs clients d'exécution et de consensus indépendants, ce qui limite l'impact d'un bug dans l'un d'eux. Solana a ajouté un second client validateur écrit de façon indépendante, Firedancer, après des pannes en 2021-2022 et un arrêt d'environ cinq heures en février 2024 ; son dossier note aussi des coûts matériels élevés et une mise concentrée entre de gros opérateurs.",
        "Hyperliquid montre le compromis sous l'autre angle : un petit ensemble de validateurs et un développement centralisé achètent de la performance, et le dossier les traite comme des hypothèses de confiance explicites plutôt que de les cacher.",
      ],
    },
    metrics: [
      { label: "Coefficient de Nakamoto", read: "Plus il est petit, moins il faut d'acteurs qui s'entendent pour arrêter ou censurer la chaîne." },
      { label: "Parts des clients", read: "Aucun client ne devrait approcher les deux tiers du réseau." },
      { label: "Mise des principales entités", read: "La part de la mise détenue par les dix plus grosses entités, plateformes d'échange et protocoles de staking liquide compris." },
      { label: "Concentration de l'hébergement", read: "La part des nœuds chez le plus gros fournisseur de cloud et dans le pays le plus représenté." },
    ],
    misconceptions: [
      { myth: "Des milliers de validateurs signifient un réseau décentralisé.", reality: "Si quelques entités en font tourner la plupart, le nombre effectif est faible." },
      { myth: "La décentralisation est binaire.", reality: "C'est un spectre sur plusieurs dimensions, et un compromis avec la performance." },
      { myth: "Un réseau décentralisé ne peut pas être modifié.", reality: "Ses règles changent par la coordination. La vraie question est de savoir qui peut imposer un changement, et avec quelle facilité." },
    ],
    risks: [
      "Des défaillances corrélées dues à des clients, des clouds ou des opérateurs communs.",
      "La censure par quelques entités sous pression juridique ou commerciale.",
      "La capture de la gouvernance par une fondation, une entreprise ou de gros détenteurs.",
    ],
    quiz: [
      {
        question: "Que mesure le coefficient de Nakamoto ?",
        options: ["Le nombre de nœuds", "Le nombre minimal d'entités qui pourraient ensemble arrêter ou censurer la chaîne", "Le temps de bloc", "Le nombre de tokens brûlés"],
        explanation: "Il résume la concentration en un seul chiffre : combien d'acteurs indépendants devraient s'entendre.",
      },
      {
        question: "Pourquoi la diversité des clients est-elle importante ?",
        options: ["Elle baisse les frais", "Un bug dans un client dominant pourrait bloquer le réseau ou provoquer des pénalités massives", "Elle augmente l'offre de tokens", "Elle accélère les blocs"],
        explanation: "Quand les logiciels sont variés, un bug dans un client n'affecte qu'une partie du réseau.",
      },
      {
        question: "Une chaîne compte 2 000 validateurs, mais trois fournisseurs de staking contrôlent 40 % de la mise. Quel est le principal problème ?",
        options: ["Aucun, 2 000 validateurs suffisent largement", "Ensemble, ces trois acteurs pourraient bloquer la finalité, puisqu'ils dépassent un tiers", "Les frais vont monter", "Le token va être retiré de la cote"],
        explanation: "Sur une chaîne de type BFT, plus d'un tiers de la mise agissant ensemble peut empêcher la finalité.",
      },
    ],
  },
};
