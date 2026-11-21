import type { ProjectText } from "@/lib/research/localized";

export const solanaFr: ProjectText = {
  oneLiner: "Un Layer 1 monolithique à haut débit, optimisé pour des transactions rapides et peu coûteuses.",
  tags: ["Haute performance", "Proof of Stake", "Exécution parallèle"],
  headline: "Solana : à quoi renonce une architecture monolithique haute performance ?",
  overview: {
    summary:
      "Solana est une blockchain en preuve d'enjeu qui garde l'exécution sur une seule machine à états globale et passe à l'échelle en optimisant l'usage du matériel : exécution parallèle des transactions, horloge vérifiable (Proof of History) et propagation des blocs en pipeline. Elle vise les applications qui ont besoin d'un débit élevé et de frais bas, comme le trading, les paiements et les applications grand public.",
    problem: [
      "Le livre blanc soutient que les blockchains sont ralenties par le besoin des nœuds de s'accorder sur le temps ; la Proof of History fournit un écoulement du temps vérifiable pour réduire les échanges de messages.",
      "La montée en charge par les rollups fragmente la liquidité et l'état ; Solana parie qu'une chaîne unique haute performance offre une meilleure composabilité et une meilleure expérience utilisateur.",
    ],
    valueProposition: [
      "Sealevel exécute en parallèle les transactions qui ne se chevauchent pas, car chaque transaction déclare à l'avance les comptes qu'elle lit et écrit.",
      "Des frais bas et une confirmation rapide rendent praticables les carnets d'ordres on-chain, les paiements et les applications grand public à haute fréquence.",
    ],
    positioning: [
      "Premier L1 monolithique par l'activité ; en concurrence directe avec Ethereum et ses rollups pour les utilisateurs, la liquidité et les développeurs.",
      "Fort dans le trading des particuliers, les memecoins, la DePIN et les paiements ; historiquement plus faible en profondeur de DeFi institutionnelle.",
    ],
    team: [
      "Fondé par Anatoly Yakovenko (ancien ingénieur de Qualcomm), qui a publié le livre blanc de la Proof of History en 2017. La bêta du réseau principal a été lancée en mars 2020.",
      "Le développement est mené par des équipes de clients indépendantes (le client Agave d'Anza, Firedancer de Jump Crypto), avec le soutien de la Solana Foundation à l'écosystème.",
    ],
  },
  technology: {
    blocks: [
      ["Modèle fondé sur des comptes où les programmes sont sans état et où les données vivent dans des comptes séparés ; les transactions indiquent leurs comptes à l'avance, ce qui permet l'exécution parallèle."],
      ["Preuve d'enjeu déléguée avec Tower BFT, un consensus de type PBFT qui utilise l'horloge de la Proof of History pour ordonner les événements."],
      ["Passe à l'échelle verticalement en exigeant un matériel de validation puissant et une bande passante élevée ; le débit croît avec les progrès du matériel plutôt que par le sharding ou les rollups."],
      [
        "Le réseau a subi plusieurs pannes en 2021-2022 et un arrêt d'environ 5 heures en février 2024 ; la stabilité s'est améliorée depuis, mais les incidents de disponibilité restent la principale préoccupation technique.",
        "Un second client validateur écrit de façon indépendante (Firedancer, de Jump Crypto) réduit le risque lié à un client unique.",
      ],
      ["Le nombre de validateurs est important, mais les coûts matériels sont élevés et la mise est concentrée entre de gros opérateurs ; le coefficient de Nakamoto mérite d'être surveillé."],
      ["Les validateurs ont approuvé en 2025 la refonte du consensus Alpenglow (SIMD-0326), qui vise une finalité beaucoup plus rapide ; vérifiez son statut d'activation sur le réseau principal."],
    ],
    limitations: ["Les exigences élevées en matériel et en bande passante augmentent le coût de fonctionnement d'un validateur.", "La disponibilité du réseau a historiquement été moins robuste que celle de chaînes plus prudentes."],
  },
  tokenomics: {
    supplyModelNote:
      "Pas de plafond. L'inflation a démarré à 8 % en 2021 et baisse de 15 % par an vers un taux de long terme de 1,5 %. La moitié des frais de base de chaque transaction est brûlée.",
    distribution: [
      { label: "Réserve communautaire" },
      { label: "Vente seed" },
      { label: "Vente des fondateurs" },
      { label: "Équipe" },
      { label: "Fondation" },
      { label: "Vente aux validateurs" },
      { label: "Vente stratégique" },
      { label: "Enchère publique" },
    ],
    distributionNote: "Allocation de genèse de 500 millions de SOL, telle que publiée dans la documentation de Solana. Les allocations des initiés sont entièrement débloquées.",
    issuanceNote: "Modélisé à partir du calendrier d'inflation publié, appliqué à l'offre de genèse. Les burns de frais, le slashing et le taux de participation au staking font différer l'offre réelle.",
    utility: ["Paie les frais de transaction et est staké par les validateurs et les délégateurs pour sécuriser le réseau.", "Très utilisé comme paire d'échange de base et comme garantie dans la DeFi de Solana."],
    emissions: ["Calendrier désinflationniste : taux annuel initial de 8 %, −15 % par an, taux final de 1,5 %."],
    vesting: ["Les allocations de genèse des initiés ont terminé leurs déblocages ; l'offre nouvelle vient désormais surtout de l'inflation de staking."],
    valueAccrual: [
      "50 % des frais de base sont brûlés ; le reste et les frais de priorité vont aux validateurs.",
      "La plupart des récompenses de staking sont financées par l'inflation : les stakers sont à peu près protégés de la dilution tandis que les non-stakers sont dilués.",
    ],
  },
  adoption: {
    claims: [
      "Solana héberge un vaste écosystème DeFi et une importante offre de stablecoins (voir la TVL live de la chaîne).",
      "L'activité est fortement portée par le trading, y compris la spéculation sur les memecoins, ce qui rend les revenus de frais cycliques.",
      "Les intégrations grand public et de paiement (par exemple les paiements en stablecoins de grandes fintechs) progressent, mais restent à un stade précoce.",
    ],
    metricsToWatch: ["Valeur économique réelle (frais + pourboires MEV)", "Offre de stablecoins sur Solana", "Nombre de validateurs et coefficient de Nakamoto", "Disponibilité du réseau"],
  },
  financials: {
    relevantMetrics: [
      { label: "Frais + pourboires MEV", why: "La valeur totale que paient les utilisateurs pour l'espace de bloc (REV)." },
      { label: "Inflation face au burn", why: "Détermine la dilution des non-stakers." },
      { label: "Offre de stablecoins", why: "Un indicateur du capital présent sur la chaîne." },
    ],
    claims: [
      "Les revenus de frais ont figuré parmi les plus élevés de toutes les chaînes pendant les périodes spéculatives, mais ils sont concentrés sur le trading et chutent fortement quand les marchés sont calmes.",
      "Une grande part de la valeur captée va aux validateurs via les frais de priorité et les pourboires MEV plutôt que d'être brûlée.",
    ],
  },
  onchain: {
    claims: [
      "Le nombre de transactions est gonflé par les transactions de vote des validateurs ; les analystes doivent se concentrer sur les transactions hors vote et sur les utilisateurs qui paient des frais.",
      "L'activité des bots est importante ; le nombre d'adresses actives surestime les utilisateurs humains.",
    ],
    dataAvailability: "Des indicateurs de transactions hors vote et de ventilation des frais sont prévus via des intégrations Dune et RPC Solana en phase 2.",
  },
  competitors: {
    columns: [
      {
        technology: "Monolithique, exécution parallèle",
        adoption: "Trading des particuliers, DePIN, paiements",
        tokenomics: "Désinflation jusqu'à 1,5 %",
        economics: "Volume de frais élevé et cyclique",
        strengths: "Débit, composabilité, expérience utilisateur",
        weaknesses: "Exigences matérielles, historique de pannes",
        positioning: "Chaîne unique haute performance",
      },
      {
        technology: "EVM, centrée sur les rollups",
        adoption: "Plus grande base DeFi et de stablecoins",
        tokenomics: "Pas de plafond ; émission face au burn",
        economics: "Frais en partie migrés vers les L2",
        strengths: "Décentralisation, liquidité",
        weaknesses: "Expérience fragmentée entre L2",
        positioning: "Couche de règlement",
      },
      {
        technology: "Move, modèle orienté objets, consensus DAG",
        adoption: "DeFi et jeux vidéo en croissance",
        tokenomics: "Offre fixe de 10 Md",
        economics: "Base de frais plus petite",
        strengths: "Parallélisme, faible latence",
        weaknesses: "Écosystème plus jeune, surplomb des déblocages",
        positioning: "L1 haute performance de nouvelle génération",
      },
    ],
  },
  risks: [
    ["Historique de pannes ; la diversité des clients s'améliore avec Firedancer."],
    ["Les revenus de frais dépendent des cycles de trading spéculatif."],
    ["Le SOL a été cité dans d'anciennes actions de la SEC américaine contre des plateformes d'échange ; la position réglementaire américaine a évolué en 2025 mais reste dépendante des juridictions."],
    ["Changements de protocole via les SIMD et les votes des validateurs ; l'influence de la Fondation et des principales équipes de clients est importante."],
    ["Très liquide sur les plateformes au comptant et de dérivés."],
    ["Exigences matérielles élevées et concentration de la mise entre de gros opérateurs et centres de données."],
    ["Fait face aux L2 d'Ethereum d'un côté et à de nouveaux L1 haute performance (Sui et d'autres) de l'autre."],
  ],
  thesis: {
    bull: [
      "Solana devient la chaîne par défaut de la finance grand public et du trading on-chain grâce à son expérience utilisateur et à sa vitesse.",
      "Alpenglow et Firedancer améliorent nettement la finalité et la résilience, ce qui lève la principale objection technique.",
    ],
    neutral: ["Solana reste l'une des trois premières plateformes de smart contracts, avec une activité cyclique liée à la spéculation des particuliers."],
    bear: [
      "L'activité se révèle surtout spéculative et migre vers des chaînes plus récentes quand les incitations s'estompent.",
      "Une panne majeure pendant un épisode de tension entame la confiance des institutions.",
    ],
    catalysts: ["Mise à jour du consensus Alpenglow approuvée par les validateurs.", "Croissance des paiements en stablecoins sur Solana par des fintechs grand public."],
    assumptions: ["Les coûts du matériel continuent de baisser plus vite que la demande de débit n'augmente.", "Les utilisateurs privilégient la vitesse et le coût plutôt qu'une décentralisation maximale."],
    monitor: ["Disponibilité et rapports d'incidents", "Part de l'activité non spéculative", "Concentration des validateurs", "Adoption de Firedancer"],
    invalidation: ["Des pannes répétées de plusieurs heures après Alpenglow et Firedancer", "Un recul durable des utilisateurs payant des frais sur un cycle complet"],
  },
  framework: [
    { summary: "Haute performance ; historique de disponibilité en amélioration mais imparfait.", dataUsed: ["Historique des pannes", "Développement des clients"], limitations: "Des mises à jour majeures encore en cours de déploiement." },
    { summary: "Désinflation transparente ; initiés débloqués ; staking financé par l'inflation.", dataUsed: ["Calendrier d'inflation", "Allocation de genèse"], limitations: "Une large allocation initiale aux initiés." },
    { summary: "Forte activité et fort intérêt des développeurs ; qualité de l'usage inégale.", dataUsed: ["TVL et frais DefiLlama"], limitations: "L'activité des bots gonfle les indicateurs." },
    { summary: "Une large base de frais quand les marchés sont actifs.", dataUsed: ["Frais DefiLlama"], limitations: "Très cyclique." },
    { summary: "Processus des SIMD avec votes des validateurs ; influence concentrée.", dataUsed: ["Dépôt des SIMD"], limitations: "Pouvoir informel des équipes centrales." },
    { summary: "Leader parmi les L1 monolithiques.", dataUsed: ["TVL et frais relatifs"], limitations: "Paysage concurrentiel qui évolue vite." },
    { summary: "La centralisation et la disponibilité sont les risques clés.", dataUsed: ["Revue des risques"], limitations: "Qualitatif." },
  ],
  sources: [
    { supports: "Proof of History et architecture." },
    { supports: "Comptes, programmes et transactions." },
    { supports: "Calendrier d'inflation et allocation de genèse.", limitations: "Ancien site de documentation de Solana Labs ; paramètres inchangés sauf amendement par SIMD." },
    { supports: "Burn des frais de base et frais de priorité." },
    { supports: "Principal client validateur." },
    { supports: "Client validateur indépendant." },
    { supports: "Propositions de changement du protocole, dont Alpenglow (SIMD-0326)." },
    { supports: "Données de marché live : prix, capitalisation, FDV, offre en circulation et offre totale.", limitations: "Agrégateur ; les chiffres d'offre dépendent des déclarations des émetteurs et de la méthodologie de CoinGecko." },
    { supports: "TVL, frais et offre de stablecoins au niveau de la chaîne.", limitations: "La TVL ne compte que les dépôts DeFi ; ce n'est pas une mesure de la valeur du réseau." },
  ],
};
