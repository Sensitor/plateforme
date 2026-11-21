import type { ConceptText, DeepText } from "@/lib/academy/localized";

/** Traduction française : tokenisation d'actifs réels et DePIN. Mêmes faits et même structure que la version anglaise. */

export const TEXT_11: Record<string, ConceptText> = {
  "rwa-tokenization": {
    title: "Tokenisation d'actifs réels",
    summary: "Représenter sous forme de tokens des créances sur des actifs hors chaîne : bons du Trésor, crédit, actions.",
    body: [
      "Les bons du Trésor et fonds tokenisés permettent aux utilisateurs on-chain de détenir des instruments qui rapportent un rendement. Le token est une créance sur une structure juridique hors chaîne : un fonds, un titre de créance ou une SPV (entité ad hoc).",
      "Les principaux risques sont juridiques et opérationnels : qui est l'émetteur, quelle juridiction s'applique, qui conserve les actifs, et que se passe-t-il si l'émetteur fait défaut ? Des restrictions de transfert et des vérifications d'identité (KYC) s'appliquent souvent.",
      "La croissance dépend de la réglementation, des partenariats de distribution et de la demande on-chain de rendement conforme.",
    ],
    keyTakeaways: ["Token = créance sur une structure juridique", "Risques d'émetteur, de conservation et de juridiction", "Souvent soumis à autorisation"],
  },
  depin: {
    title: "DePIN",
    summary: "Des réseaux d'infrastructures physiques décentralisés qui récompensent en tokens ceux qui fournissent du matériel ou des ressources.",
    body: [
      "Les projets DePIN coordonnent des ressources du monde réel, GPU, stockage, couverture sans fil, capteurs, en payant les fournisseurs en tokens et en facturant le service aux utilisateurs.",
      "La question centrale est la demande : les utilisateurs paient-ils pour le service, ou la croissance de l'offre n'est-elle portée que par les récompenses en tokens ? Les modèles burn-and-mint relient la demande de tokens à l'usage payant.",
      "Comparez l'économie unitaire aux alternatives centralisées sur le prix, la fiabilité et la qualité de service.",
    ],
    keyTakeaways: ["Les tokens amorcent l'offre", "La demande payante est le vrai test", "Comparez aux fournisseurs centralisés"],
  },
};

export const DEEP_11: Record<string, DeepText> = {
  "rwa-tokenization": {
    minute:
      "La tokenisation d'actifs réels place dans des tokens des créances sur des actifs hors chaîne, comme des obligations d'État, des fonds, des prêts ou des actions. Le token circule comme n'importe quel actif crypto, mais sa valeur repose sur une structure juridique, un émetteur et des dépositaires du système financier traditionnel.",
    steps: [
      { title: "Structurer", text: "Un émetteur crée un véhicule juridique, comme un fonds, un titre de créance ou une entité ad hoc, qui détient l'actif sous-jacent." },
      { title: "Conserver", text: "Un dépositaire ou un agent de transfert détient les actifs et tient le registre officiel de qui possède quoi." },
      { title: "Émettre les tokens", text: "Des tokens représentant des parts ou des créances sont émis on-chain. Des smart contracts appliquent des listes d'autorisation et des restrictions de transfert là où la réglementation des titres financiers l'exige." },
      { title: "Distribuer", text: "Les investisseurs qui passent les vérifications d'identité souscrivent ou se font rembourser. Les tokens peuvent circuler on-chain à tout moment, tandis que souscriptions et remboursements suivent le calendrier propre du véhicule." },
      { title: "Utiliser on-chain", text: "Dans la limite de leurs autorisations, les tokens peuvent servir de garantie ou d'adossement à des stablecoins et à d'autres produits." },
    ],
    visualCaption: "Trois familles d'actifs réels tokenisés, avec des exemples tirés du dossier Ondo.",
    table: {
      columns: ["Fonds de bons du Trésor tokenisé", "Titre de créance à rendement", "Actions tokenisées"],
      rows: [
        { label: "Ce que vous détenez", values: ["Des parts d'un fonds qui détient des bons du Trésor américains à court terme", "Un titre de créance garanti par des bons du Trésor et des dépôts bancaires", "Une exposition à des actions et ETF cotés aux États-Unis"] },
        { label: "Qui peut y accéder", values: ["En général des investisseurs qualifiés ou institutionnels", "Les personnes non américaines, après vérification d'identité", "Les investisseurs non américains éligibles"] },
        { label: "Principaux risques", values: ["Émetteur, dépositaire et structure du fonds", "Solvabilité de l'émetteur et conditions juridiques", "Émetteur, conservation et fidélité du token à l'action"] },
        { label: "Exemple couvert", values: ["Ondo OUSG", "Ondo USDY", "Ondo Global Markets"] },
      ],
    },
    example: {
      title: "Ondo : les bons du Trésor tokenisés et au-delà",
      paragraphs: [
        "OUSG donne une exposition tokenisée aux bons du Trésor américains à court terme, en partie via des fonds tokenisés comme BUIDL de BlackRock. USDY est un titre de créance tokenisé garanti par des bons du Trésor à court terme et des dépôts bancaires, accessible aux personnes non américaines. Ondo Global Markets étend le modèle aux actions et ETF cotés aux États-Unis pour les investisseurs non américains éligibles.",
        "Le dossier souligne que les principaux risques sont juridiques et opérationnels plutôt que liés au consensus : les détenteurs dépendent de créances juridiques hors chaîne et de la solvabilité des entités émettrices, et l'accès soumis à autorisation limite la composabilité avec la DeFi ouverte.",
      ],
    },
    metrics: [
      { label: "Actifs dans le véhicule", read: "Le montant détenu dans le fonds ou le titre sous-jacent, et s'il fait l'objet d'un audit ou d'une attestation indépendante." },
      { label: "Rendement face au sous-jacent", read: "Le rendement du token comparé au taux de l'actif sous-jacent, après frais." },
      { label: "Conditions de remboursement", read: "Qui peut se faire rembourser, à quelle vitesse, avec quel minimum, et ce qui se passe si l'émetteur suspend les remboursements." },
      { label: "Chaîne juridique", read: "Émetteur, juridiction, dépositaire et agent de transfert : chacun est un maillon qui doit tenir." },
    ],
    misconceptions: [
      { myth: "Détenir le token, c'est détenir directement l'actif.", reality: "Vous détenez en général une créance sur un véhicule qui détient l'actif. Vos droits dépendent de ses conditions juridiques." },
      { myth: "Les actifs tokenisés s'échangent librement comme n'importe quel token.", reality: "Beaucoup comportent des restrictions de transfert et des listes d'autorisation exigées par le droit des titres financiers." },
      { myth: "Le règlement on-chain supprime les risques traditionnels.", reality: "La chaîne règle le token ; l'actif lui-même dépend toujours de dépositaires, de marchés et de tribunaux traditionnels." },
    ],
    risks: [
      "L'insolvabilité de l'émetteur ou un litige sur la créance juridique.",
      "Des défaillances du dépositaire et des incidents opérationnels hors chaîne.",
      "Des changements réglementaires qui restreignent qui peut détenir ou échanger les tokens.",
    ],
    quiz: [
      {
        question: "Que représente en général le token d'un fonds de bons du Trésor tokenisé ?",
        options: ["Une obligation du Trésor détenue directement dans votre wallet", "Une créance sur des parts d'un véhicule juridique qui détient des bons du Trésor", "Un stablecoin émis par le gouvernement américain", "Un vote de gouvernance sur les taux d'intérêt"],
        explanation: "Le token est la représentation numérique d'un intérêt dans un fonds ou un titre ; les obligations restent chez le dépositaire du véhicule.",
      },
      {
        question: "Pourquoi beaucoup de tokens d'actifs réels restreignent-ils les transferts ?",
        options: ["Pour réduire les frais de gas", "Parce que la réglementation des titres financiers limite qui peut les détenir", "Parce que les tokens n'ont pas de valeur", "Pour empêcher les variations de prix"],
        explanation: "Les listes d'autorisation et les vérifications d'identité permettent aux émetteurs de respecter les règles qui s'appliquent au titre sous-jacent.",
      },
      {
        question: "Quelle est la principale catégorie de risque des actifs réels tokenisés ?",
        options: ["Les défaillances du consensus de la blockchain", "Le risque juridique et opérationnel : émetteur, conservation, juridiction", "La centralisation du minage", "Seulement la latence des oracles"],
        explanation: "La chaîne fonctionne en général très bien ; ce qui peut faillir, c'est la structure hors chaîne qui donne sa valeur au token.",
      },
    ],
  },
  depin: {
    minute:
      "Les DePIN, réseaux d'infrastructures physiques décentralisés, paient des personnes en tokens pour fournir des ressources du monde réel comme des GPU, du stockage, de la couverture sans fil ou des capteurs, et vendent le service qui en résulte aux utilisateurs. Les récompenses en tokens peuvent amorcer l'offre rapidement ; savoir si les utilisateurs paient vraiment pour le service est le vrai test.",
    steps: [
      { title: "Contribuer", text: "Les fournisseurs connectent du matériel au réseau : un GPU, un disque dur, un point d'accès sans fil, un capteur." },
      { title: "Coordonner", text: "Le réseau associe les tâches ou requêtes des utilisateurs aux fournisseurs et vérifie que le travail a été fait, souvent en partie hors chaîne." },
      { title: "Payer", text: "Les utilisateurs paient pour le service, en général à un prix exprimé en monnaie classique pour que les coûts soient prévisibles." },
      { title: "Burn and mint", text: "Dans un modèle burn-and-mint, les paiements brûlent des tokens tandis que les fournisseurs reçoivent des émissions nouvellement créées : l'offre diminue quand la demande payante dépasse les émissions." },
      { title: "Passer le relais à la demande", text: "Les émissions récompensent les premiers fournisseurs avant que la demande n'existe. Avec le temps, l'usage payant doit prendre le relais des subventions." },
    ],
    visualCaption: "La boucle économique d'un réseau DePIN, dans un modèle burn-and-mint.",
    flow: {
      nodes: [
        { title: "Fournisseurs", text: "Connectent des GPU, du stockage, des antennes ou des capteurs." },
        { title: "Réseau", text: "Associe les tâches aux fournisseurs et vérifie le travail." },
        { title: "Utilisateurs", text: "Paient le service, à un prix exprimé en monnaie classique." },
        { title: "Burn", text: "Les paiements brûlent des tokens." },
        { title: "Mint", text: "Les fournisseurs reçoivent des tokens nouvellement émis." },
      ],
      outcomes: {
        positive: "Une demande payante supérieure aux émissions : la croissance de l'offre est méritée, et les burns peuvent dépasser les nouveaux tokens.",
        negative: "Des récompenses sans utilisateurs payants : les fournisseurs sont payés en dilution et partent quand le token baisse.",
      },
    },
    example: {
      title: "Render : des GPU pour le rendu et l'IA",
      paragraphs: [
        "Render paie des opérateurs de nœuds GPU pour effectuer le rendu de scènes 3D et, de plus en plus, pour exécuter des charges de travail d'IA. Les utilisateurs paient des tâches au prix exprimé en monnaie classique ; dans son modèle burn-and-mint, des tokens équivalents à la valeur de la tâche sont brûlés tandis que les opérateurs reçoivent de nouvelles émissions.",
        "Le dossier est franc sur les limites : la vérification du rendu ou des résultats d'IA se fait surtout hors chaîne, par la réputation et la relecture, si bien que la vérification du travail n'est pas sans confiance, et rivaliser avec les grands fournisseurs de cloud sur la fiabilité est difficile.",
      ],
    },
    metrics: [
      { label: "Demande payante face aux émissions", read: "Les revenus versés par les utilisateurs comparés à la valeur des tokens versés aux fournisseurs. Le test central de durabilité." },
      { label: "Taux d'utilisation", read: "La part de la capacité fournie qui est réellement utilisée. Une offre inactive signifie que les récompenses ne paient rien." },
      { label: "Prix face aux alternatives centralisées", read: "Si le service est moins cher ou meilleur qu'un fournisseur de cloud pour la même tâche." },
      { label: "Fidélité des fournisseurs", read: "Combien de fournisseurs restent quand les récompenses en tokens baissent." },
    ],
    misconceptions: [
      { myth: "Plus de nœuds signifie un réseau qui réussit.", reality: "L'offre s'achète facilement avec des récompenses en tokens. C'est la demande payante qui prouve que le réseau fonctionne." },
      { myth: "Une DePIN fonctionne entièrement on-chain.", reality: "Le matériel, l'acheminement des tâches et la vérification se font en général hors chaîne ; la chaîne gère les paiements et les récompenses." },
      { myth: "Le burn-and-mint garantit une offre décroissante.", reality: "L'offre ne baisse que lorsque les burns issus de l'usage payant dépassent les émissions." },
    ],
    risks: [
      "Une demande subventionnée par le token plutôt que payée par les utilisateurs.",
      "Une vérification hors chaîne qui dépend d'un opérateur central.",
      "La concurrence de grands fournisseurs centralisés et fiables.",
    ],
    quiz: [
      {
        question: "Quel est le vrai test d'un réseau DePIN ?",
        options: ["Le nombre de fournisseurs", "Des utilisateurs qui paient pour le service, et pas seulement une offre qui grandit", "La cotation du token sur les plateformes d'échange", "La taille de l'airdrop"],
        explanation: "Les récompenses en tokens peuvent attirer de l'offre sans aucune demande ; l'usage payant montre que le service vaut la peine d'être acheté.",
      },
      {
        question: "Dans un modèle burn-and-mint, quand l'offre de tokens diminue-t-elle ?",
        options: ["Chaque mois", "Quand les tokens brûlés par l'usage payant dépassent les nouvelles émissions", "Quand les fournisseurs partent", "Jamais"],
        explanation: "Les burns viennent des paiements des utilisateurs, les émissions vont aux fournisseurs ; l'offre ne baisse que si les premiers l'emportent sur les secondes.",
      },
      {
        question: "Pourquoi la vérification du travail est-elle un défi pour les DePIN ?",
        options: ["Parce que les blockchains sont lentes", "Parce qu'un travail physique ou hors chaîne est difficile à prouver on-chain sans tiers de confiance", "Parce que les utilisateurs refusent de payer", "Parce que les tokens ne peuvent pas être brûlés"],
        explanation: "Une chaîne ne peut pas voir qu'un GPU a correctement rendu une scène ou qu'un point d'accès a fourni de la couverture sans un rapport de confiance.",
      },
    ],
  },
};
