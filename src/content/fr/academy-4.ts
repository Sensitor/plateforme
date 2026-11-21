import type { ConceptText, DeepText } from "@/lib/academy/localized";

/** Traduction française : burns de tokens et stages des rollups. Mêmes faits et même structure que la version anglaise. */

export const TEXT_4: Record<string, ConceptText> = {
  "burn-mechanisms": {
    title: "Burns de tokens",
    summary: "Des mécanismes qui retirent définitivement des tokens de l'offre, le plus souvent financés par l'usage du protocole.",
    body: [
      "Un burn envoie des tokens vers une adresse d'où ils ne pourront jamais être dépensés, ce qui réduit l'offre. Le burn peut être inscrit dans le protocole (par exemple, brûler les frais de base) ou financé par les revenus (buy-and-burn).",
      "Un burn ne crée de la valeur pour les détenteurs que s'il est financé par un usage réel et récurrent. Un burn financé par la trésorerie ou par un événement ponctuel relève davantage du marketing que de la redistribution de flux de trésorerie.",
      "Regardez toujours la variation nette de l'offre : émission moins burn. Un token peut être « déflationniste » pendant un mois chargé et inflationniste sur l'année.",
    ],
    keyTakeaways: ["Vérifiez ce qui finance le burn", "L'émission nette compte plus que le burn brut", "Les burns suivent les cycles d'activité"],
  },
  "rollup-stages": {
    title: "Stages des rollups (0, 1, 2)",
    summary: "Une échelle de maturité des rollups, fondée sur la confiance que les utilisateurs doivent accorder aux opérateurs et aux security councils.",
    body: [
      "Les rollups au stage 0 dépendent fortement de leurs opérateurs : les preuves peuvent manquer ou être réservées à des acteurs autorisés, et les contrats peuvent être mis à jour instantanément. Le stage 1 exige un système de preuves opérationnel, qu'un security council ne peut contourner que dans des conditions définies. Le stage 2 encadre les mises à jour pour que les utilisateurs aient le temps de partir avant qu'un changement prenne effet.",
      "Ce cadre, tenu à jour par L2BEAT, est utile parce que le marketing énonce rarement ces hypothèses de confiance. Le stage d'un rollup peut changer à chaque mise à jour : il faut donc le vérifier régulièrement.",
    ],
    keyTakeaways: ["Les stages décrivent la confiance accordée aux opérateurs", "Vérifiez le système de preuves et les délais de mise à jour", "Les stages changent avec les mises à jour"],
  },
};

export const DEEP_4: Record<string, DeepText> = {
  "burn-mechanisms": {
    minute:
      "Un burn retire définitivement des tokens de l'offre. Il peut être inscrit dans le protocole, comme les frais de base brûlés d'Ethereum, ou financé par les revenus via un buy-and-burn. Un burn n'a d'importance que si un usage réel le paie, et seule la variation nette, émission moins burn, indique si l'offre diminue.",
    steps: [
      { title: "Détruire les tokens", text: "Les tokens sont envoyés vers une adresse d'où ils ne pourront jamais être dépensés, ou détruits directement par le contrat." },
      { title: "Burns du protocole", text: "Certains protocoles brûlent automatiquement une partie de chaque frais, comme Ethereum avec les frais de base depuis l'EIP-1559." },
      { title: "Buy-and-burn", text: "D'autres utilisent leurs revenus pour racheter des tokens sur le marché et les brûler, ce qui relie l'offre du token à l'activité de l'entreprise." },
      { title: "Rachat et conservation", text: "Les tokens peuvent aussi être rachetés et conservés dans un fonds ou une trésorerie au lieu d'être détruits : économiquement proche, mais ils pourraient revenir en circulation." },
      { title: "Faire le solde", text: "Comparez le burn avec l'émission et les déblocages sur un cycle de marché complet, pas seulement sur un mois chargé." },
    ],
    visualCaption: "Trois façons pour un protocole de réduire l'offre en circulation, et la question à poser pour chacune.",
    table: {
      columns: ["Burn du protocole", "Buy-and-burn", "Rachat et conservation"],
      rows: [
        { label: "Fonctionnement", values: ["Des frais détruits par les règles du protocole", "Les revenus rachètent des tokens sur le marché, puis les détruisent", "Les revenus rachètent des tokens, conservés dans un fonds ou une trésorerie"] },
        { label: "Financé par", values: ["Les frais d'usage", "Les revenus du protocole", "Les revenus du protocole"] },
        { label: "Exemple couvert", values: ["Frais de base d'Ethereum (EIP-1559)", "Proposition UNIfication d'Uniswap", "Assistance Fund d'Hyperliquid"] },
        { label: "À vérifier", values: ["Burn face à l'émission", "Origine des revenus et prix de rachat", "Si les tokens peuvent revenir"] },
      ],
    },
    example: {
      title: "Les burns dans la couverture",
      paragraphs: [
        "Ethereum brûle les frais de base de chaque transaction. Le dossier note que depuis que les rollups ont déplacé leurs données vers des blobs peu coûteux, moins de frais sont brûlés sur le réseau principal et l'offre nette a pris une tendance inflationniste : le burn dépend de la demande sur la couche de base.",
        "La proposition UNIfication d'Uniswap brûlerait des UNI avec les frais du protocole et les frais du séquenceur d'Unichain, tandis qu'Hyperliquid dirige ses frais vers un Assistance Fund qui rachète des HYPE. Les deux relient le token à l'usage, la condition qui donne du sens à un burn.",
      ],
    },
    metrics: [
      { label: "Variation nette de l'offre", read: "Émission et déblocages moins burns sur la même période. Le seul chiffre qui dit si l'offre diminue." },
      { label: "Ce qui finance le burn", read: "Des frais récurrents payés par les utilisateurs, ou des réserves de trésorerie et des événements ponctuels." },
      { label: "Burn en part de l'offre", read: "La part de l'offre retirée chaque année. De petits pourcentages ont de petits effets." },
      { label: "Régularité sur les cycles", read: "Les burns liés à l'activité diminuent quand les marchés sont calmes. Regardez un cycle complet." },
    ],
    misconceptions: [
      { myth: "Un token déflationniste va forcément monter.", reality: "Une offre plus faible n'aide que si la demande tient. Le prix dépend des deux." },
      { myth: "Chaque burn rend de la valeur aux détenteurs.", reality: "Un burn financé par la trésorerie ou un événement ponctuel ne crée pas de nouvelle valeur ; un burn financé par des revenus récurrents, si." },
      { myth: "Une grosse annonce de burn signifie un gros effet.", reality: "Comparez le burn avec l'offre totale, et avec l'émission et les déblocages sur la même période." },
    ],
    risks: [
      "Des burns qui s'essoufflent quand l'activité baisse.",
      "Des burns marketing qui ne reflètent pas de vrais revenus.",
      "L'attention des régulateurs envers les rachats financés par les revenus.",
    ],
    quiz: [
      {
        question: "Qu'est-ce qui détermine si l'offre d'un token diminue vraiment ?",
        options: ["La taille du plus gros burn", "Des burns supérieurs à l'émission et aux déblocages sur la période", "Le nombre de détenteurs", "Le prix"],
        explanation: "Seule la variation nette compte : les tokens détruits moins les tokens créés ou débloqués.",
      },
      {
        question: "Quel burn crée la valeur la plus durable pour les détenteurs ?",
        options: ["Un burn ponctuel de tokens de la trésorerie", "Un burn financé par des revenus d'usage récurrents", "Un burn annoncé sur les réseaux sociaux", "Un burn de tokens qui n'ont jamais circulé"],
        explanation: "Des revenus récurrents continuent de financer le burn ; un burn ponctuel ne change pas l'économie du token.",
      },
      {
        question: "Ethereum brûle des frais, et pourtant son offre peut augmenter. Pourquoi ?",
        options: ["Le burn est annulé chaque année", "Quand l'émission versée aux validateurs dépasse les frais de base brûlés", "À cause des halvings", "Parce que l'ETH brûlé est réémis"],
        explanation: "Dans les périodes calmes, les frais de base brûlés sont inférieurs aux nouveaux ETH versés aux validateurs : l'offre nette augmente.",
      },
    ],
  },
  "rollup-stages": {
    minute:
      "Les stages de L2BEAT évaluent à quel point les utilisateurs d'un rollup dépendent encore de ses opérateurs. Le stage 0 garde ses petites roues : l'équipe peut modifier ou contourner le système. Le stage 1 repose sur un système de preuves opérationnel, avec un security council comme filet de sécurité limité. Au stage 2, le code fait la loi : les utilisateurs peuvent partir avant qu'une mise à jour ordinaire prenne effet.",
    steps: [
      { title: "Le ticket d'entrée", text: "Le stage 0 exige les bases d'un rollup : un état et des données publiés sur Ethereum, et un logiciel open source qui permet à n'importe qui de reconstruire l'état du rollup." },
      { title: "Stage 0 : les petites roues", text: "Les opérateurs ou un petit multisig peuvent mettre à jour les contrats ou contourner le système à volonté ; le système de preuves peut être absent, incomplet ou réservé à des acteurs approuvés." },
      { title: "Stage 1 : un filet limité", text: "Un système de preuves opérationnel sécurise le rollup. Un security council, avec un seuil de signature élevé et des membres indépendants de l'équipe, peut encore le contourner, et les autres mises à jour s'accompagnent d'un délai qui laisse aux utilisateurs le temps de partir." },
      { title: "Stage 2 : le code fait la loi", text: "Les preuves sont totalement ouvertes à tous, les mises à jour ordinaires laissent au moins 30 jours aux utilisateurs pour partir, et le council ne peut agir que sur des bugs prouvables on-chain." },
      { title: "Revérifier", text: "Un stage est un instantané. Il peut monter ou descendre à chaque mise à jour, et il ne couvre pas tous les risques : le séquenceur et la disponibilité des données sont évalués à part." },
    ],
    visualCaption: "Les trois stages côte à côte, simplifiés à partir du cadre de L2BEAT.",
    table: {
      columns: ["Stage 0", "Stage 1", "Stage 2"],
      rows: [
        { label: "Système de preuves", values: ["Absent, incomplet ou restreint", "Opérationnel ; des contestataires peuvent soumettre des preuves", "Opérationnel et totalement ouvert à tous"] },
        { label: "Qui peut contourner", values: ["Les opérateurs ou un petit multisig", "Un security council au seuil élevé", "Seulement pour corriger des bugs prouvables on-chain"] },
        { label: "Délai pour partir avant une mise à jour", values: ["Non garanti", "Un délai pour les mises à jour qui ne viennent pas du council", "Au moins 30 jours pour les mises à jour ordinaires"] },
        { label: "À qui vous faites confiance", values: ["L'équipe", "Les preuves, avec le council en filet de sécurité", "Le code et Ethereum"] },
      ],
    },
    example: {
      title: "Arbitrum et OP Mainnet : preuves et councils",
      paragraphs: [
        "Le protocole BoLD d'Arbitrum One permet à n'importe qui de participer à la validation, et un Security Council de 12 membres peut effectuer des mises à jour d'urgence. Les preuves de fraude ouvertes à tous d'OP Mainnet sont entrées en service en 2024, et son Security Council conserve lui aussi des pouvoirs d'urgence.",
        "Les deux dossiers suivent le stage L2BEAT et les délais de mise à jour plutôt que de citer une note qui peut changer à la prochaine mise à jour. C'est le bon réflexe : vérifier le stage avant de confier des montants importants à un rollup.",
      ],
    },
    metrics: [
      { label: "Stage actuel", read: "La note principale. Lisez les raisons indiquées avec elle, pas seulement le chiffre." },
      { label: "Qui peut soumettre des preuves", read: "N'importe qui, une liste d'acteurs autorisés, ou personne pour l'instant. Des preuves ouvertes à tous sont au cœur des stages 1 et 2." },
      { label: "Délai de mise à jour face au délai de retrait", read: "Si une mise à jour peut prendre effet plus vite que les utilisateurs ne peuvent retirer leurs fonds, ils ne peuvent pas échapper à un changement non désiré." },
      { label: "Security council", read: "Nombre de membres, seuil de signature et indépendance vis-à-vis de l'équipe." },
    ],
    misconceptions: [
      { myth: "Stage 2 signifie zéro risque.", reality: "Il supprime la confiance dans les opérateurs, pas les bugs. Les risques liés au code, au système de preuves et à Ethereum demeurent." },
      { myth: "Le stage d'un rollup est permanent.", reality: "Il peut changer à chaque mise à jour. Vérifiez la note actuelle, pas celle de l'an dernier." },
      { myth: "Les stages mesurent la décentralisation du séquenceur.", reality: "Les stages portent sur les preuves, les mises à jour et les sorties. Un rollup au stage 1 peut encore avoir un séquenceur unique." },
    ],
    risks: [
      "Des mises à jour instantanées sur les systèmes au stage 0, qui pourraient détourner des fonds.",
      "La collusion ou la compromission d'un security council.",
      "Des bugs dans de jeunes systèmes de preuves, que le cadre des stages ne peut pas détecter.",
    ],
    quiz: [
      {
        question: "Que signifie une note de stage 0 ?",
        options: ["Le rollup n'a pas d'utilisateurs", "Les opérateurs peuvent encore modifier ou contourner le système", "Le rollup ne demande aucune confiance", "Le rollup ne publie pas ses données sur Ethereum"],
        explanation: "Les rollups au stage 0 ont encore leurs petites roues : l'équipe ou un petit multisig garde le dernier mot.",
      },
      {
        question: "Qu'est-ce qui distingue principalement le stage 2 ?",
        options: ["Un token listé sur les grandes plateformes d'échange", "Des preuves ouvertes à tous et au moins 30 jours pour partir avant les mises à jour ordinaires", "Un séquenceur décentralisé", "Des frais nuls"],
        explanation: "Au stage 2, les utilisateurs sont protégés par le code et par le temps de partir, le council étant limité aux bugs prouvables.",
      },
      {
        question: "Un rollup au stage 1 peut-il fonctionner avec un séquenceur unique et centralisé ?",
        options: ["Non, le stage 1 l'interdit", "Oui : les stages évaluent les preuves, les mises à jour et les sorties, pas le séquençage", "Seulement le week-end", "Seulement s'il n'a pas de token"],
        explanation: "La centralisation du séquenceur est un risque distinct que L2BEAT signale à côté du stage.",
      },
    ],
  },
};
