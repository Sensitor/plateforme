import type { ConceptText, DeepText } from "@/lib/academy/localized";

/** Traduction française : futures perpétuels et TVL. Mêmes faits et même structure que la version anglaise. */

export const TEXT_9: Record<string, ConceptText> = {
  "perpetual-futures": {
    title: "Futures perpétuels et taux de funding",
    summary: "Des futures sans échéance, maintenus près du prix au comptant par des paiements périodiques de funding entre acheteurs et vendeurs.",
    body: [
      "Les futures perpétuels (les « perps ») permettent aux traders de prendre une exposition acheteuse ou vendeuse à effet de levier, sans date d'échéance. Pour ancrer le prix du perp au prix au comptant, le camp où la demande est excédentaire verse à l'autre un taux de funding.",
      "Un funding positif signifie que les acheteurs paient les vendeurs, en général signe d'un levier haussier. Un funding et un open interest très élevés peuvent précéder des cascades de liquidations.",
      "Les DEX de perpétuels (comme Hyperliquid) et les plateformes centralisées se font concurrence sur la liquidité, les frais et la fiabilité de leur moteur de liquidation.",
    ],
    keyTakeaways: ["Pas d'échéance, le funding ancre le prix", "Le funding révèle le positionnement à effet de levier", "Les cascades de liquidations amplifient les mouvements"],
  },
  tvl: {
    title: "Valeur totale verrouillée (TVL)",
    summary: "La valeur des actifs déposés dans les smart contracts d'un protocole.",
    body: [
      "La TVL additionne la valeur de marché des tokens détenus par un protocole. Elle est très utilisée pour comparer les protocoles DeFi et les chaînes.",
      "La TVL est sensible au prix des tokens, celle d'un protocole peut être divisée par deux sans un seul retrait, et elle peut être gonflée par le double comptage (le même actif déposé dans plusieurs protocoles) ou par les incitations.",
      "Utilisez la TVL avec les frais et les revenus : un protocole à forte TVL et à faibles frais n'utilise pas son capital de façon productive.",
    ],
    keyTakeaways: ["Une mesure sensible aux prix", "Attention au double comptage", "Comparez-la aux frais générés"],
  },
};

export const DEEP_9: Record<string, DeepText> = {
  "perpetual-futures": {
    minute:
      "Un future perpétuel est un contrat à effet de levier sur le prix d'un actif, qui n'expire jamais. Pour garder son prix proche du prix au comptant, acheteurs et vendeurs se versent un taux de funding à intervalles réguliers. Les perpétuels font partie des instruments les plus échangés de la crypto, et leurs liquidations peuvent amplifier les mouvements de marché.",
    steps: [
      { title: "Ouvrir une position", text: "Un trader dépose une marge et prend une position acheteuse ou vendeuse avec effet de levier sur un prix indiciel." },
      { title: "Marge et liquidation", text: "Les gains et pertes sont calculés par rapport à un prix de référence (mark price). Si les pertes ramènent la marge au niveau de maintenance, la position est liquidée." },
      { title: "Funding", text: "Quand le perpétuel s'échange au-dessus du comptant, les acheteurs paient les vendeurs ; en dessous, les vendeurs paient les acheteurs. Les paiements ont lieu à intervalles fixes, toutes les heures ou toutes les huit heures selon la plateforme." },
      { title: "Open interest", text: "La taille totale des positions ouvertes. Un open interest en hausse avec un funding élevé signale un levier encombré d'un côté." },
      { title: "Cascades et filets de sécurité", text: "Les fermetures forcées poussent le prix plus loin et déclenchent d'autres liquidations. Des fonds d'assurance ou des coffres de secours absorbent les pertes quand la marge d'une position est épuisée." },
    ],
    visualCaption: "Essayez : voyez comment un taux de funding se traduit en paiements au fil du temps, et qui paie qui. Valeurs d'exemple, pas des taux réels.",
    example: {
      title: "Les perpétuels on-chain, et le funding comme rendement",
      paragraphs: [
        "Hyperliquid fait fonctionner un carnet d'ordres de perpétuels entièrement on-chain, avec une finalité en un bloc. Le dossier note que les épisodes de tension de 2025, dont de lourdes pertes de liquidation pour son coffre HLP, ont montré à la fois la résilience du système et le pouvoir discrétionnaire de ses validateurs.",
        "Le funding est aussi une source de rendement. L'USDe d'Ethena détient des positions vendeuses sur perpétuels contre sa garantie et touche le funding quand il est positif ; quand il devient négatif, son fonds de réserve est conçu pour en absorber le coût.",
      ],
    },
    metrics: [
      { label: "Taux de funding annualisé", read: "Le coût de détention du levier. Un funding positif durablement élevé montre un positionnement acheteur encombré." },
      { label: "Open interest", read: "Le levier total dans le système. Comparez-le à la capitalisation et à son propre historique." },
      { label: "Volume de liquidations", read: "Les pics marquent des ventes ou des achats forcés qui ont fait bouger le marché." },
      { label: "Base", read: "L'écart entre le prix du perpétuel et le prix au comptant. De gros écarts signalent une tension ou une demande déséquilibrée." },
    ],
    misconceptions: [
      { myth: "Un funding positif signifie que le prix va monter.", reality: "Il signifie que les acheteurs paient pour du levier. Un positionnement encombré peut tout aussi bien précéder une forte baisse." },
      { myth: "Les perpétuels suivent exactement le prix au comptant.", reality: "Le funding les ramène vers le comptant, mais ils peuvent s'échanger avec une prime ou une décote, surtout en période de tension." },
      { myth: "Un faible levier rend la liquidation impossible.", reality: "Il la rend moins probable. Un mouvement assez fort, ou un trou de prix dans un marché peu liquide, peut toujours effacer la marge." },
    ],
    risks: [
      "La liquidation des positions à effet de levier lors de mouvements rapides.",
      "Le risque lié à la plateforme : faillite, manipulation du prix de référence, désendettement automatique (auto-deleveraging).",
      "Des coûts de funding qui érodent discrètement les rendements sur de longues durées de détention.",
    ],
    quiz: [
      {
        question: "À quoi sert le taux de funding ?",
        options: ["À payer la plateforme", "À garder le prix du perpétuel proche du prix au comptant", "À fixer la limite de levier", "À récompenser les fournisseurs de liquidité"],
        explanation: "Le funding fait payer le camp encombré à l'autre, ce qui ramène le prix du perpétuel vers le comptant.",
      },
      {
        question: "Le funding est de +0,01 % toutes les huit heures sur une position acheteuse de 10 000 dollars. Combien l'acheteur paie-t-il par jour ?",
        options: ["3 dollars", "1 dollar", "30 dollars", "0,30 dollar"],
        explanation: "10 000 dollars × 0,0001 = 1 dollar par intervalle, trois intervalles par jour : 3 dollars, environ 11 % par an.",
      },
      {
        question: "Qu'est-ce qu'une cascade de liquidations ?",
        options: ["Une série de nouvelles cotations", "Des fermetures forcées qui poussent le prix plus loin et déclenchent d'autres liquidations", "Une baisse des frais d'échange", "Un vote de gouvernance"],
        explanation: "Chaque liquidation est une transaction forcée dans le sens du mouvement, qui peut faire tomber la couche suivante de positions à effet de levier.",
      },
    ],
  },
  tvl: {
    minute:
      "La valeur totale verrouillée est la valeur de marché des actifs déposés dans les smart contracts d'un protocole, ou dans l'ensemble des protocoles DeFi d'une chaîne. C'est l'indicateur DeFi le plus cité et l'un des plus faciles à mal lire, car il bouge avec le prix des tokens et peut compter deux fois le même dollar.",
    steps: [
      { title: "Compter les actifs", text: "Des fournisseurs de données comme DefiLlama lisent les soldes de tokens détenus par les contrats d'un protocole." },
      { title: "Les valoriser", text: "Chaque solde est multiplié par son prix de marché actuel, et les résultats sont additionnés." },
      { title: "Décider de ce qui compte", text: "Les méthodologies excluent ou isolent des éléments comme le token du protocole lui-même, les montants empruntés ou les actifs déjà comptés dans un autre protocole, pour limiter le double comptage." },
      { title: "Agréger par chaîne", text: "La TVL d'une chaîne additionne les protocoles DeFi déployés sur cette chaîne. Ce n'est pas la valeur du token de la chaîne." },
      { title: "Bien lire la tendance", text: "Comme la TVL est exprimée en dollars, une baisse de prix la réduit même si personne ne retire. Suivre les quantités de tokens permet de distinguer les deux effets." },
    ],
    visualCaption: "TVL en direct sur la couverture de Sensitor, avec la capitalisation divisée par la TVL quand les deux sont disponibles.",
    example: {
      title: "Lire la TVL dans la couverture",
      paragraphs: [
        "Les marchés de prêt et les protocoles de staking liquide détiennent en général les dépôts les plus importants de la couverture de Sensitor. Les plateformes d'échange ont besoin de moins de capital par rapport au volume qu'elles traitent : une TVL plus faible ne signifie donc pas une activité plus petite.",
        "La TVL seule dit peu de chose de l'économie d'un protocole : une plateforme d'échange peut gagner plus de frais sur des dépôts plus faibles qu'un protocole aux soldes importants mais inactifs. Le tableau compare la capitalisation à la TVL, une mesure approximative de la façon dont le marché valorise chaque dollar déposé.",
      ],
    },
    metrics: [
      { label: "TVL en tokens et en dollars", read: "Distingue les vrais dépôts et retraits des simples mouvements de prix." },
      { label: "Frais divisés par la TVL", read: "L'usage plus ou moins productif des dépôts. Des ratios faibles signalent du capital inactif." },
      { label: "Capitalisation divisée par la TVL", read: "La façon dont le marché valorise les dépôts. Comparable seulement entre protocoles aux modèles économiques proches." },
      { label: "Part attirée par les incitations", read: "Les dépôts attirés par des récompenses en tokens ont tendance à partir quand les récompenses s'arrêtent." },
    ],
    misconceptions: [
      { myth: "La TVL est l'argent du protocole.", reality: "La TVL appartient aux déposants. Le protocole ne gagne que les frais prélevés dessus." },
      { myth: "Une TVL en hausse signifie que des utilisateurs arrivent.", reality: "La TVL peut monter uniquement parce que les tokens déposés ont pris de la valeur." },
      { myth: "La TVL d'une chaîne mesure la valeur de son token.", reality: "Elle additionne les dépôts DeFi sur cette chaîne ; la capitalisation du token est un autre chiffre." },
    ],
    risks: [
      "Le double comptage quand les mêmes actifs sont déposés, empruntés et redéposés d'un protocole à l'autre.",
      "Du capital mercenaire qui part dès la fin des incitations.",
      "Une TVL gonflée par le token du protocole lui-même ou par des hausses de prix.",
    ],
    quiz: [
      {
        question: "La TVL d'un protocole baisse de 40 % en une semaine sans aucun retrait. Quelle est la cause la plus probable ?",
        options: ["Un piratage", "Les tokens déposés ont baissé", "Un changement de fournisseur de données", "Des frais plus élevés"],
        explanation: "La TVL est exprimée en dollars : une baisse de prix la réduit même quand le nombre de tokens déposés ne change pas.",
      },
      {
        question: "Pourquoi additionner la TVL de plusieurs protocoles peut-il surestimer la taille de la DeFi ?",
        options: ["Parce que certains protocoles sont sur plusieurs chaînes", "Parce que les mêmes actifs peuvent être déposés, empruntés et redéposés dans plusieurs protocoles", "Parce que la TVL inclut les capitalisations des tokens", "Elle ne la surestime jamais"],
        explanation: "Chaque redépôt est compté à nouveau : le même dollar peut apparaître plusieurs fois dans le total.",
      },
      {
        question: "Que suggère un faible ratio des frais sur la TVL ?",
        options: ["Un usage très efficace des dépôts", "Les dépôts rapportent peu : le capital est en grande partie inactif", "Le protocole va être piraté", "Les frais sont payés dans un autre token"],
        explanation: "Un protocole qui détient de gros dépôts mais génère peu de frais ne met pas ce capital à profit.",
      },
    ],
  },
};
