import type { ProjectText } from "@/lib/research/localized";

export const ondoFr: ProjectText = {
  oneLiner: "Une plateforme de tokenisation de bons du Trésor américains, de dollars porteurs de rendement et d'actions.",
  tags: ["Bons du Trésor tokenisés", "Actions tokenisées", "Institutionnel"],
  headline: "Ondo : que change la tokenisation des bons du Trésor pour la finance on-chain ?",
  overview: {
    summary:
      "Ondo Finance émet des actifs réels tokenisés : OUSG (une exposition aux bons du Trésor américains à court terme, pour les investisseurs qualifiés), USDY (un titre de créance tokenisé porteur de rendement pour les utilisateurs non américains) et, via Ondo Global Markets, des actions et ETF américains tokenisés pour les investisseurs non américains éligibles. Le token ONDO gouverne l'Ondo DAO.",
    problem: ["Les utilisateurs on-chain n'avaient pas accès à des actifs traditionnels réglementés et porteurs de rendement ; les investisseurs traditionnels n'avaient pas de règlement programmable disponible 24 h sur 24 et 7 jours sur 7."],
    valueProposition: [
      "OUSG offre une exposition tokenisée aux bons du Trésor américains à court terme, en partie via des fonds tokenisés comme BUIDL de BlackRock.",
      "USDY est un titre de créance tokenisé garanti par des bons du Trésor à court terme et des dépôts bancaires, accessible aux personnes non américaines.",
      "Ondo combine la structuration juridique, des partenariats de distribution et un déploiement multi-chaînes.",
    ],
    positioning: ["L'un des principaux émetteurs d'actifs réels natifs de la crypto ; en concurrence avec les gestionnaires d'actifs qui émettent directement des fonds tokenisés (BlackRock avec Securitize, Franklin Templeton) et d'autres plateformes d'actifs réels."],
    team: ["Fondé par Nathan Allman (anciennement dans les actifs numériques chez Goldman Sachs) ; Ondo Finance Inc. exploite les produits, et l'ONDO est gouverné par l'Ondo DAO."],
  },
  technology: {
    blocks: [
      ["Les tokens sont émis par des entités juridiques (fonds, SPV, titres de créance) avec des restrictions de transfert et des vérifications d'identité ; des smart contracts appliquent les listes d'autorisation."],
      ["Les principaux risques sont juridiques et opérationnels (émetteur, dépositaires, agents de transfert) plutôt que liés au consensus."],
      ["Les produits sont déployés sur plusieurs chaînes, dont Ethereum et Solana."],
      ["Ondo Global Markets offre une exposition tokenisée aux actions et ETF cotés aux États-Unis pour les investisseurs non américains éligibles."],
    ],
    limitations: [
      "L'accès soumis à autorisation limite la composabilité avec la DeFi ouverte.",
      "Les détenteurs dépendent de créances juridiques hors chaîne et de la solvabilité des entités émettrices.",
    ],
  },
  tokenomics: {
    supplyModelNote: "Offre fixe de 10 milliards d'ONDO ; l'offre en circulation augmente par des déblocages annuels programmés.",
    distribution: [{ label: "Croissance de l'écosystème" }, { label: "Développement du protocole" }, { label: "Ventes privées" }, { label: "Vente d'accès communautaire" }],
    distributionNote: "Allocation publiée par Ondo.",
    utility: ["L'ONDO est un token de gouvernance de l'Ondo DAO.", "L'ONDO ne donne aucun droit sur les revenus des produits tokenisés d'Ondo Finance."],
    emissions: ["Pas d'inflation ; offre fixe."],
    vesting: ["Les tokens bloqués se débloquent par tranches annuelles à la date anniversaire du lancement du token (janvier)."],
    valueAccrual: ["Aucun mécanisme de captation de valeur direct ; la valeur du token est liée aux attentes sur l'écosystème Ondo et sa gouvernance."],
  },
  adoption: {
    claims: [
      "Les produits de bons du Trésor tokenisés ont connu une croissance rapide en 2024-2025, à mesure que la demande on-chain de rendement et de réserves pour stablecoins augmentait.",
      "Les frais générés par les produits Ondo sont suivis par DefiLlama (voir les données live).",
    ],
    metricsToWatch: ["Encours d'OUSG et d'USDY", "Volumes des actions tokenisées", "Nombre de chaînes prises en charge", "Dates de déblocage"],
  },
  financials: {
    relevantMetrics: [
      { label: "Encours sous gestion", why: "La base des frais de gestion." },
      { label: "Frais de gestion", why: "Les revenus perçus par Ondo Finance (pas par les détenteurs d'ONDO)." },
    ],
    claims: [
      "Les revenus reviennent à la société d'exploitation ; analyser la valeur de l'ONDO exige de séparer l'économie de l'entreprise des droits attachés au token.",
      "Les chiffres d'encours sont de préférence tirés des publications de l'émetteur ou de fournisseurs de données sur les actifs réels ; la couverture de la TVL des actifs réels par DefiLlama est partielle.",
    ],
  },
  onchain: {
    claims: ["Les avoirs en tokens sont concentrés entre un nombre limité de détenteurs et de protocoles autorisés."],
    dataAvailability: "Les données d'encours des actifs réels (par exemple rwa.xyz) exigent une intégration sous licence ; prévue en phase 2.",
  },
  competitors: {
    columns: [
      {
        technology: "Fonds et titres tokenisés multi-chaînes",
        adoption: "Premier émetteur d'actifs réels natif de la crypto",
        tokenomics: "Gouvernance uniquement, déblocages annuels",
        economics: "Frais versés à l'entreprise",
        strengths: "Étendue de l'offre, distribution",
        weaknesses: "Pas de captation de valeur pour le token",
        positioning: "Plateforme d'actifs réels",
      },
      {
        technology: "Fonds tokenisé via Securitize",
        adoption: "Encours institutionnel important",
        tokenomics: "Pas de token",
        economics: "Frais de gestion",
        strengths: "Marque, taille",
        weaknesses: "Réservé aux institutionnels",
        positioning: "Fonds monétaire tokenisé",
      },
      {
        technology: "Fonds enregistré on-chain",
        adoption: "Particuliers et institutionnels (fonds américain)",
        tokenomics: "Pas de token",
        economics: "Frais de gestion",
        strengths: "Structure de fonds réglementée",
        weaknesses: "Composabilité limitée",
        positioning: "Fonds commun de placement on-chain",
      },
    ],
  },
  risks: [
    ["Risque de smart contract modeste ; logique des listes d'autorisation."],
    ["Le token ne capte aucun revenu ; d'importants déblocages annuels."],
    ["Le droit des titres financiers encadre les produits tokenisés ; des changements réglementaires pourraient restreindre la distribution."],
    ["La DAO a un contrôle limité sur les produits gérés par l'entreprise."],
    ["Token de capitalisation moyenne à grande, liquide sur les plateformes d'échange."],
    ["L'émetteur, les dépositaires et les agents de transfert sont des points de confiance centraux."],
    ["Les gestionnaires d'actifs traditionnels peuvent émettre directement des fonds tokenisés."],
  ],
  thesis: {
    bull: ["La tokenisation devient un marché de plusieurs milliers de milliards de dollars et Ondo reste une plateforme de distribution de premier plan, la gouvernance ajoutant de l'utilité au token."],
    neutral: ["Ondo fait croître ses encours, mais la valeur de l'ONDO n'y reste que vaguement liée."],
    bear: ["Les institutions traditionnelles dominent directement la tokenisation ; les intermédiaires natifs de la crypto sont évincés."],
    catalysts: ["Croissance des actions tokenisées et nouveaux déploiements sur d'autres chaînes.", "Les déblocages annuels ajoutent de l'offre chaque mois de janvier."],
    assumptions: ["Les régulateurs continuent d'autoriser la distribution de titres tokenisés aux investisseurs éligibles."],
    monitor: ["Encours des produits", "Évolutions réglementaires", "Calendrier de déblocage", "Évolutions de l'utilité du token"],
    invalidation: ["Une action réglementaire restreignant les produits principaux", "Un recul durable des encours"],
  },
  framework: [
    { summary: "Contrats de token standards ; la structure juridique est l'essentiel.", dataUsed: ["Documentation"], limitations: "Processus hors chaîne." },
    { summary: "Gouvernance uniquement, déblocages importants.", dataUsed: ["Documentation du token"], limitations: "La gouvernance pourrait changer l'utilité." },
    { summary: "Forte croissance des bons du Trésor tokenisés.", dataUsed: ["Frais DefiLlama", "Documentation des produits"], limitations: "Données d'encours partielles." },
    { summary: "Revenus de l'entreprise non attribuables au token ; données d'encours incomplètes.", dataUsed: ["DefiLlama"], limitations: "Données insuffisantes." },
    { summary: "Contrôle limité de la DAO.", dataUsed: ["Documentation"], limitations: "Qualitatif." },
    { summary: "Premier émetteur natif de la crypto face aux géants de la finance traditionnelle.", dataUsed: ["Revue du marché"], limitations: "Qualitatif." },
    { summary: "Risques réglementaires et liés à l'émetteur.", dataUsed: ["Revue des risques"], limitations: "Qualitatif." },
  ],
  sources: [
    { supports: "Produits et chaînes." },
    { supports: "Produit de bons du Trésor tokenisés." },
    { supports: "Titre de créance tokenisé porteur de rendement." },
    { supports: "Actions et ETF tokenisés." },
    { supports: "Offre, allocation et déblocages." },
    { supports: "Données de marché live : prix, capitalisation, FDV, offre en circulation et offre totale.", limitations: "Agrégateur ; les chiffres d'offre dépendent des déclarations des émetteurs et de la méthodologie de CoinGecko." },
    { supports: "Chiffres de TVL, de frais et de revenus.", limitations: "Adaptateurs open source ; la méthodologie diffère selon les protocoles et peut être révisée." },
  ],
};
