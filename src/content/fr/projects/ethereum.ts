import type { ProjectText } from "@/lib/research/localized";

export const ethereumFr: ProjectText = {
  oneLiner: "Une plateforme de smart contracts généraliste et la couche de règlement d'un écosystème de rollups.",
  tags: ["Smart contracts", "Proof of Stake", "Couche de règlement"],
  headline: "Ethereum : la couche de règlement peut-elle capter la valeur de ses rollups ?",
  overview: {
    summary:
      "Ethereum est une blockchain en preuve d'enjeu qui exécute des programmes arbitraires (smart contracts) dans une machine virtuelle partagée, l'EVM. Elle héberge le plus grand écosystème DeFi et de stablecoins et a délibérément évolué vers une couche de règlement et de disponibilité des données pour les rollups, qui exécutent la plupart des transactions des utilisateurs hors de la chaîne de base.",
    problem: [
      "Le langage de script de Bitcoin restreint volontairement le type de programmes exécutables on-chain ; le livre blanc d'Ethereum proposait une alternative Turing-complète pour des applications quelconques.",
      "Les développeurs ont besoin d'un environnement d'exécution neutre et crédiblement décentralisé, où les applications peuvent se combiner entre elles sans autorisation.",
    ],
    valueProposition: [
      "Les smart contracts déployés sur Ethereum peuvent s'appeler les uns les autres sans autorisation, ce qui permet à des protocoles comme les marchés de prêt, les plateformes d'échange et les stablecoins de se combiner.",
      "L'ETH est nécessaire pour payer les frais de transaction et pour staker en tant que validateur, ce qui relie l'actif à l'usage et à la sécurité du réseau.",
      "La principale différence d'Ethereum est la combinaison d'une forte décentralisation, de plusieurs implémentations de clients indépendantes et du plus grand réservoir de liquidité on-chain.",
    ],
    positioning: [
      "Ethereum se positionne comme la couche de base d'une architecture modulaire : le L1 apporte la sécurité et le règlement, les rollups apportent le débit.",
      "Ses concurrents les plus proches sont des L1 monolithiques à haut débit (par exemple Solana) qui gardent l'exécution sur la couche de base.",
    ],
    team: [
      "Le livre blanc a été publié par Vitalik Buterin en 2013 ; le réseau a été lancé le 30 juillet 2015 avec des cofondateurs dont Gavin Wood, auteur de la spécification du Yellow Paper.",
      "Le développement du protocole est coordonné via le processus ouvert des EIP et plusieurs équipes de clients indépendantes ; l'Ethereum Foundation finance la recherche mais ne contrôle pas le réseau.",
    ],
  },
  technology: {
    blocks: [
      ["Machine à états fondée sur des comptes, exécutée par l'Ethereum Virtual Machine (EVM). Depuis The Merge, chaque nœud fait tourner un client d'exécution et un client de consensus."],
      ["Preuve d'enjeu depuis The Merge (15 septembre 2022), avec le protocole Gasper (choix de branche LMD-GHOST + finalité Casper FFG). Les validateurs stakent de l'ETH et peuvent être slashés en cas de double signature."],
      [
        "La mise à jour Dencun (mars 2024) a introduit les transactions porteuses de blobs (EIP-4844), un espace de données moins coûteux conçu pour les rollups.",
        "La montée en charge est délibérément déléguée aux rollups ; les gains de débit du L1 sont progressifs (hausse de la limite de gas, échantillonnage de disponibilité des données).",
      ],
      ["Plusieurs clients d'exécution en production (par exemple Geth, Nethermind, Besu, Erigon, Reth) et clients de consensus (par exemple Prysm, Lighthouse, Teku, Nimbus, Lodestar) réduisent l'impact d'un bug dans un seul client."],
      ["Le nombre de validateurs est élevé, mais la mise est concentrée entre les protocoles de staking liquide et les plateformes d'échange centralisées, et la construction des blocs est concentrée entre quelques builders spécialisés (séparation proposeur-builder via MEV-Boost)."],
      ["L'EIP-1559 (août 2021) a introduit des frais de base brûlés, ce qui fait dépendre l'émission nette de l'activité du réseau."],
    ],
    limitations: [
      "Le débit de la couche de base reste limité par construction ; les utilisateurs effectuent de plus en plus leurs transactions sur des rollups qui ont leurs propres hypothèses de confiance.",
      "L'écosystème des rollups fragmente la liquidité et l'expérience utilisateur entre de nombreuses chaînes, tant que l'interopérabilité n'a pas mûri.",
    ],
  },
  tokenomics: {
    supplyModelNote:
      "Pas de plafond. De nouveaux ETH sont émis pour les validateurs (l'émission baisse à mesure que la part de la mise totale augmente) et les frais de base de l'EIP-1559 sont brûlés. L'offre nette peut augmenter ou diminuer selon l'activité.",
    distribution: [
      { label: "Vente publique de 2014", note: "environ 60 millions d'ETH vendus" },
      { label: "Ethereum Foundation et premiers contributeurs", note: "environ 12 millions d'ETH" },
    ],
    distributionNote: "Allocation de genèse (environ 72 millions d'ETH). L'offre actuelle est nettement plus élevée en raison du minage (2015-2022) et de l'émission liée au staking.",
    utility: [
      "Gas : chaque transaction paie ses frais en ETH.",
      "Sécurité : les validateurs doivent staker de l'ETH (32 ETH minimum par validateur) et touchent l'émission plus les frais de priorité.",
      "Garantie : l'ETH est l'actif de garantie dominant dans les protocoles de prêt DeFi et de stablecoins.",
    ],
    emissions: ["L'émission dépend du montant total staké ; ce n'est pas un calendrier fixe."],
    vesting: ["Aucun calendrier de vesting : l'allocation de genèse circule entièrement depuis des années."],
    valueAccrual: [
      "Les frais de base sont brûlés (EIP-1559) ; les frais de priorité et la MEV vont aux validateurs.",
      "Depuis que les rollups ont déplacé leurs données vers des blobs peu coûteux, le burn des frais du L1 a diminué et l'offre nette a pris une tendance inflationniste : la captation de valeur dépend d'un rebond de la demande sur le L1 ou d'une hausse des frais de blobs.",
    ],
    concentration: ["Des soldes importants se trouvent dans des contrats de staking, des wallets de plateformes d'échange et des ETF ; ce sont des soldes de conservation mutualisés, qui n'impliquent pas une concentration entre les mains d'un seul propriétaire."],
  },
  adoption: {
    claims: [
      "Ethereum héberge la plus grande offre de stablecoins et la plus forte TVL DeFi de toutes les chaînes (voir les données live).",
      "Les ETF ether au comptant américains ont commencé à s'échanger en juillet 2024, ouvrant un canal d'accès réglementé.",
      "L'adhésion des développeurs est forte grâce à l'EVM, également utilisée par la plupart des rollups et de nombreux L1 concurrents : les effets de réseau de l'outillage EVM profitent à Ethereum.",
    ],
    metricsToWatch: ["Offre de stablecoins sur Ethereum et ses rollups", "Usage et frais des blobs", "Part de l'ETH staké par entité", "Développeurs actifs (rapport d'Electric Capital)"],
  },
  financials: {
    relevantMetrics: [
      { label: "Frais payés par les utilisateurs", why: "La demande d'espace de bloc ; les frais de base sont brûlés." },
      { label: "Émission nette", why: "L'émission moins le burn détermine la dilution des détenteurs." },
      { label: "TVL de la chaîne et stablecoins", why: "L'activité économique sécurisée par la chaîne." },
    ],
    claims: [
      "Les revenus de frais sont cycliques et ont en partie migré vers les rollups ; analyser Ethereum comme une entreprise qui aurait des « revenus » est imparfait, car le burn profite à tous les détenteurs, pas à une trésorerie.",
      "La dépense de sécurité (l'émission versée aux validateurs) est actuellement supérieure aux frais brûlés, ce qui signifie que les détenteurs qui ne stakent pas sont dilués.",
    ],
  },
  onchain: {
    claims: [
      "L'activité se mesure de plus en plus sur le L1 plus les rollups ; le nombre de transactions du seul L1 sous-estime l'usage de l'écosystème.",
      "Les dépôts et retraits de staking sont visibles on-chain via le contrat de dépôt de la beacon chain.",
    ],
    dataAvailability: "Des indicateurs on-chain live (adresses actives, usage des blobs, flux de staking) sont prévus via des intégrations Etherscan et Dune en phase 2.",
  },
  competitors: {
    columns: [
      {
        technology: "EVM, PoS, montée en charge centrée sur les rollups",
        adoption: "Plus grande base DeFi et de stablecoins",
        tokenomics: "Pas de plafond ; émission face au burn",
        economics: "Frais en partie migrés vers les L2",
        strengths: "Décentralisation, diversité des clients, liquidité",
        weaknesses: "Expérience fragmentée entre L2, faible débit du L1",
        positioning: "Couche de règlement pour les rollups",
      },
      {
        technology: "Monolithique, exécution parallèle",
        adoption: "Forte activité des particuliers et du trading",
        tokenomics: "Désinflationniste jusqu'à 1,5 %",
        economics: "Volume de frais élevé grâce au trading",
        strengths: "Débit, état global unique",
        weaknesses: "Exigences matérielles, historique de pannes",
        positioning: "Chaîne unique haute performance",
      },
      {
        technology: "Consensus Snow, L1 souverains",
        adoption: "Pilotes institutionnels, L1 de jeux vidéo",
        tokenomics: "Plafond de 720 M, frais brûlés",
        economics: "Activité de frais plus faible",
        strengths: "Finalité rapide, chaînes personnalisables",
        weaknesses: "Écosystème DeFi plus petit",
        positioning: "Réseau de L1 applicatifs",
      },
    ],
    note: "La capitalisation, la FDV et la TVL live des concurrents couverts apparaissent au-dessus du tableau.",
  },
  risks: [
    ["Base de code mature et multi-clients ; risque résiduel lié aux mises à jour complexes et aux bugs de consensus."],
    ["La migration de la demande de frais du L1 vers les rollups affaiblit le mécanisme de burn et le récit monétaire de l'ETH."],
    ["Le traitement du staking et des produits fondés sur l'ETH varie selon les juridictions et a évolué avec le temps."],
    ["Gouvernance sociale hors chaîne via les EIP ; crédible mais lente, et dépendante de quelques groupes de recherche centraux."],
    ["Parmi les actifs crypto les plus liquides, au comptant, en dérivés et via les ETF."],
    ["Concentration de la mise dans les protocoles de staking liquide et les plateformes d'échange, et de la construction des blocs entre quelques builders."],
    ["Les L1 monolithiques visent les mêmes utilisateurs ; les rollups pourraient capter de la valeur sans la reverser à l'ETH."],
  ],
  thesis: {
    bull: [
      "L'adoption des rollups progresse assez pour que la demande de blobs et les frais de règlement du L1 rétablissent une captation de valeur positive pour l'ETH.",
      "L'ETH consolide son rôle de garantie de premier ordre pour la DeFi, les stablecoins et les actifs tokenisés.",
    ],
    neutral: ["Ethereum reste la plateforme de smart contracts de référence, mais la valeur revient surtout aux applications et aux rollups, ce qui limite la surperformance de l'ETH."],
    bear: [
      "Les utilisateurs et la liquidité se regroupent sur des L1 plus rapides ou sur des rollups qui s'éloignent du règlement sur Ethereum.",
      "Une inflation nette persistante érode le récit de rareté pendant que les frais restent bas.",
    ],
    catalysts: [
      "La poursuite de la montée en charge de la disponibilité des données (PeerDAS) fait partie de la feuille de route publiée.",
      "La tokenisation d'actifs réels sur Ethereum pourrait augmenter la demande d'espace de bloc et d'ETH comme garantie.",
    ],
    assumptions: [
      "Les rollups continuent de régler sur Ethereum plutôt que de migrer vers d'autres couches de disponibilité des données ou de règlement.",
      "La décentralisation reste une propriété appréciée des institutions et des utilisateurs.",
    ],
    monitor: ["Variation nette de l'offre (émission face au burn)", "Marché des frais de blobs", "Concentration du staking", "Progrès de l'interopérabilité entre L2"],
    invalidation: ["Les principaux rollups déplacent leur règlement hors d'Ethereum", "Un recul durable de la part d'Ethereum dans l'offre de stablecoins et la TVL DeFi"],
  },
  framework: [
    { summary: "Éprouvé depuis 2015, multi-clients, transition réussie vers le PoS.", dataUsed: ["Historique des mises à jour", "Diversité des clients"], limitations: "La complexité des futures mises à jour." },
    { summary: "Token indispensable pour le gas et la sécurité ; actuellement inflationniste en net.", dataUsed: ["Mécanique d'émission et de burn"], limitations: "La trajectoire de l'offre dépend de la demande future." },
    { summary: "Plus grand écosystème DeFi et de stablecoins ; l'EVM est le standard du secteur.", dataUsed: ["TVL DefiLlama", "Offre de stablecoins"], limitations: "Attribution entre L1 et L2." },
    { summary: "Une large base de frais, mais une captation des frais du L1 en baisse depuis Dencun.", dataUsed: ["Frais DefiLlama"], limitations: "Le burn profite aux détenteurs, pas à une trésorerie." },
    { summary: "Processus ouvert des EIP ; pas de vote on-chain des détenteurs ; lent mais difficile à capter.", dataUsed: ["Processus des EIP"], limitations: "Influence informelle des équipes centrales." },
    { summary: "Leader incontesté du règlement des smart contracts ; pression des L1 monolithiques.", dataUsed: ["Part de marché de la TVL"], limitations: "Captation de valeur incertaine face aux rollups." },
    { summary: "Risque technique contenu ; les principaux risques sont économiques et tiennent à la centralisation de la mise.", dataUsed: ["Revue des risques"], limitations: "Évaluation qualitative." },
  ],
  sources: [
    { supports: "Objectifs de conception d'origine et justification." },
    { supports: "Date de lancement et calendrier des mises à jour." },
    { supports: "Conditions de la vente publique et allocation de genèse." },
    { supports: "Staking, validateurs, émission et slashing." },
    { supports: "Mécanique des frais." },
    { supports: "Composabilité des smart contracts." },
    { supports: "Clients d'exécution et de consensus, et diversité des clients." },
    { supports: "Transition vers la preuve d'enjeu (septembre 2022)." },
    { supports: "Mécanisme de burn des frais de base." },
    { supports: "Transactions à blobs pour les rollups (Dencun)." },
    { supports: "Montée en charge centrée sur les rollups et feuille de route de la disponibilité des données." },
    { supports: "Processus de changement du protocole." },
    { supports: "Approbation des produits cotés ether au comptant.", limitations: "Approbation des règles de cotation ; les échanges ont commencé en juillet 2024 après l'entrée en vigueur des formulaires S-1." },
    { supports: "Données de marché live : prix, capitalisation, FDV, offre en circulation et offre totale.", limitations: "Agrégateur ; les chiffres d'offre dépendent des déclarations des émetteurs et de la méthodologie de CoinGecko." },
    { supports: "TVL, frais et offre de stablecoins au niveau de la chaîne.", limitations: "La TVL ne compte que les dépôts DeFi ; ce n'est pas une mesure de la valeur du réseau." },
  ],
};
