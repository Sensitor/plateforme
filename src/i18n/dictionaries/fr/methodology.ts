import type { Dictionary } from "../en";

export const methodology: Dictionary["methodology"] = {
  eyebrow: "Recherche",
  title: "Le Sensitor Research Framework",
  description: "Nos analyses sont conçues pour être transparentes et reproductibles : vous devez pouvoir voir ce que nous savons, comment nous le savons, et où nous faisons des suppositions.",
  s1: {
    title: "1. Trois types d'affirmations",
    intro: "Chaque affirmation d'un dossier est qualifiée. Son type est affiché à côté, partout.",
    fact: "Vérifiable à partir d'une source citée : règles du protocole, événements documentés, paramètres publiés. Un fait sans source est signalé « source à venir ».",
    interpretation: "La lecture des faits par l'analyste : comparaisons, évaluations, jugements. Des personnes raisonnables peuvent ne pas être d'accord.",
    hypothesis: "Une affirmation prospective ou incertaine. Les hypothèses sont ce dont dépend la thèse, et ce qui pourrait se révéler faux.",
  },
  s2: {
    title: "2. Sept piliers, notés séparément",
    intro: "Chaque projet est évalué sur sept piliers, sur une échelle de 1 à 5 (plus haut = plus favorable). Chaque note précise ses critères, les données utilisées, les sources, les limites et un niveau de confiance. Un pilier peut rester **non noté** quand les données sont insuffisantes.",
  },
  s3: {
    title: "3. Quand nous publions une note globale, et quand nous ne le faisons pas",
    p1: "La note globale est la moyenne non pondérée des sept piliers. Elle n'est **pas publiée** (affichée « n/a » avec la raison) dès qu'un pilier n'est pas noté ou qu'un pilier est noté avec une confiance faible. Un chiffre unique bâti sur des données minces serait trompeur : nous préférons ne rien afficher.",
    confidence: "La confiance reflète la qualité des données :",
    levels: [
      ["Élevée", "sources primaires et données solides"],
      ["Moyenne", "données partielles ou recours à des agrégateurs"],
      ["Faible", "données rares, déclaratives ou invérifiables"],
    ],
  },
  s4: {
    title: "4. Des indicateurs adaptés au modèle économique",
    p: "Un Layer 1, un protocole de prêt et un stablecoin ne s'analysent pas avec les mêmes indicateurs. Chaque dossier déclare son modèle économique (couche de règlement, rollup, prêt, plateforme d'échange, protocole de staking, middleware, dollar synthétique, tokenisation, réseau de calcul, plateforme de jeu) et liste les indicateurs qui comptent pour lui, et pourquoi. Nous distinguons les *frais* (payés par les utilisateurs) des *revenus* (conservés par le protocole ou les détenteurs de son token).",
  },
  s5: {
    title: "5. Sources et processus éditorial",
    items: [
      "Les sources primaires d'abord : livres blancs, documentation officielle, archives de gouvernance et documents réglementaires ; les agrégateurs et la recherche ensuite.",
      "Chaque source indique ce qu'elle appuie, sa date de publication, la date de dernière vérification de son lien, sa fiabilité et ses limites.",
      "Les liens des sources sont vérifiés automatiquement (`npm run check:sources`). Pour les dossiers en **brouillon**, seule l'accessibilité a été vérifiée ; la relecture confirme que chaque source appuie toujours son affirmation.",
      "Les chiffres en direct (prix, capitalisations, TVL, frais) ne sont jamais écrits dans les dossiers : ils proviennent des fournisseurs de données et sont toujours affichés avec leur source et leur horodatage.",
      "La version de chaque dossier et sa date de mise à jour figurent sur chaque page.",
    ],
  },
  s6: {
    title: "6. Fournisseurs de données",
    provider: "Fournisseur",
    usedFor: "Utilisé pour",
    notes: "Remarques",
    providers: {
      coingecko: ["Prix, capitalisation, FDV, offre, sparklines 7 j, largeur des altcoins", "Source de marché principale. L'API publique fonctionne sans clé avec des limites de débit ; une clé Demo ou Pro est recommandée en production."],
      coinpaprika: ["Solution de repli pour les prix et les indicateurs globaux", "Utilisé automatiquement si CoinGecko est indisponible. Les sparklines ne sont pas disponibles avec ce repli."],
      defillama: ["TVL, frais, revenus, stablecoins, historiques de prix", "Données ouvertes avec adaptateurs open source ; la méthodologie varie selon les protocoles."],
      alternative: ["Indice Crypto Fear & Greed", "API gratuite avec attribution."],
    },
    fallback: "Si tous les fournisseurs sont indisponibles, Sensitor affiche les données comme indisponibles. Nous ne remplaçons jamais des données de marché par des valeurs de démonstration.",
  },
  s7: {
    title: "7. Ce que ce n'est pas",
    before: "La recherche Sensitor est pédagogique. Elle ne dit à personne quoi acheter ou vendre, ne fournit pas de recommandations personnalisées et ne promet aucune performance. Les notes décrivent notre évaluation d'un projet à un moment donné ; ce ne sont pas des objectifs de cours. Consultez l'",
    link: "Academy",
    after: "pour apprendre les concepts derrière chaque pilier.",
  },
};
