import type { ProjectText } from "@/lib/research/localized";

export const chainlinkFr: ProjectText = {
  oneLiner: "Un réseau d'oracles décentralisé qui fournit des données de marché, de la messagerie entre chaînes et du calcul hors chaîne aux smart contracts.",
  tags: ["Oracles", "Données on-chain", "Interopérabilité (CCIP)"],
  headline: "Chainlink : le leadership des oracles peut-il se traduire en valeur pour le token ?",
  overview: {
    summary:
      "Chainlink est un réseau d'opérateurs de nœuds indépendants qui apportent des données externes, avant tout des prix d'actifs, aux smart contracts. Ses Data Feeds sécurisent une grande part des prêts et dérivés de la DeFi, et le réseau s'est étendu à la messagerie entre chaînes (CCIP), aux données à faible latence (Data Streams), aux preuves de réserves et à des services destinés aux banques et aux gestionnaires d'actifs.",
    problem: [
      "Les smart contracts ne peuvent pas accéder nativement aux données extérieures à leur blockchain ; le livre blanc d'origine de 2017 proposait un réseau décentralisé d'oracles pour les leur fournir.",
      "Une source d'oracle unique est un point de défaillance unique : des prix inexacts peuvent déclencher des liquidations injustifiées ou des exploits.",
    ],
    valueProposition: [
      "Les Data Feeds agrègent les prix de plusieurs opérateurs de nœuds et sources de données indépendants dans des contrats de référence on-chain.",
      "CCIP (Cross-Chain Interoperability Protocol) assure les transferts de tokens et la messagerie quelconque entre chaînes, avec un réseau de gestion des risques distinct.",
      "Son principal avantage concurrentiel est sa position d'acteur établi : des années de fonctionnement, de nombreuses intégrations et la valeur déjà sécurisée par ses flux.",
    ],
    positioning: [
      "Leader des services d'oracles par la valeur sécurisée ; en concurrence avec les oracles « pull » (Pyth, RedStone) sur le coût et la latence.",
      "De plus en plus positionné comme infrastructure pour les actifs réels tokenisés et les institutions financières traditionnelles.",
    ],
    team: ["Cofondé par Sergey Nazarov et Steve Ellis ; le livre blanc de 2017 a été coécrit avec Ari Juels (Cornell Tech). Le développement est mené par Chainlink Labs."],
  },
  technology: {
    blocks: [
      ["Réseaux d'oracles décentralisés (DON) : des comités de nœuds indépendants qui récupèrent, agrègent et signent les données hors chaîne, puis les publient on-chain."],
      ["L'Off-Chain Reporting (OCR) permet aux nœuds de s'accorder sur un rapport hors chaîne et de soumettre une seule transaction agrégée, ce qui réduit les coûts de gas."],
      ["Déployé sur des dizaines de chaînes ; les flux « push » se mettent à jour sur des seuils d'écart ou des heartbeats, tandis que les Data Streams offrent des données « pull » à faible latence."],
      ["Un solide historique opérationnel pour les principaux flux ; la sécurité dépend de l'indépendance des opérateurs de nœuds et de la qualité des sources de données."],
      ["CCIP comprend un Risk Management Network distinct qui surveille l'activité entre chaînes et peut la mettre en pause."],
      ["L'ensemble des opérateurs de nœuds de chaque flux est sélectionné (soumis à autorisation) plutôt qu'ouvert ; la décentralisation est réelle mais limitée."],
    ],
    limitations: [
      "Les flux « push » peuvent être plus coûteux et plus lents que les alternatives « pull » pour les usages à haute fréquence.",
      "Des ensembles d'opérateurs sélectionnés et le rôle central de Chainlink Labs signifient que les utilisateurs dépendent de sa gouvernance du réseau.",
    ],
  },
  tokenomics: {
    supplyModelNote:
      "Offre totale fixe de 1 milliard de LINK, entièrement émise au lancement. Les tokens hors circulation sont détenus par des wallets liés à Chainlink et libérés progressivement pour les incitations des opérateurs de nœuds et le financement de l'écosystème.",
    distribution: [{ label: "Vente publique de tokens (2017)" }, { label: "Opérateurs de nœuds et écosystème" }, { label: "Entreprise (Chainlink Labs)" }],
    distributionNote: "Allocation lors de la vente de tokens de 2017.",
    utility: [
      "Le LINK sert à payer les opérateurs de nœuds et de mise dans Chainlink Staking, où les stakers garantissent la qualité du service.",
      "Beaucoup d'utilisateurs paient les services d'oracle indirectement (flux sponsorisés) : la demande directe de LINK liée à l'usage a donc historiquement été limitée.",
    ],
    emissions: ["Aucune émission nouvelle ; l'offre en circulation augmente à mesure que des tokens réservés sont libérés depuis des wallets hors circulation."],
    vesting: ["Les libérations depuis les wallets de l'entreprise et de l'écosystème ont lieu périodiquement et sont visibles on-chain ; elles ne sont pas régies par un contrat de vesting fixe publié."],
    valueAccrual: [
      "En 2025, Chainlink a annoncé la Chainlink Reserve, une réserve on-chain qui accumule des LINK financés par les revenus de services convertis via Payment Abstraction.",
      "La captation de valeur dépend d'une croissance des revenus de services payants (venant d'entreprises et de protocoles) suffisante pour l'emporter sur les libérations depuis les réserves.",
    ],
    concentration: ["Une part importante de l'offre est encore détenue dans des wallets associés à Chainlink Labs et à son allocation pour l'écosystème."],
  },
  adoption: {
    claims: [
      "Les flux Chainlink sont intégrés par la plupart des grands protocoles de prêt et de dérivés sur les chaînes EVM.",
      "Chainlink a mené des expérimentations publiques avec SWIFT pour connecter des banques à plusieurs blockchains.",
      "L'adoption de CCIP a progressé grâce à des émetteurs de tokens qui l'utilisent pour des standards de tokens entre chaînes, y compris des fonds tokenisés.",
    ],
    metricsToWatch: ["Valeur totale sécurisée", "Nombre de flux et de chaînes actifs", "Volume de CCIP", "Revenus de services payants et entrées dans la Reserve"],
  },
  financials: {
    relevantMetrics: [
      { label: "Revenus de services payants", why: "Si les utilisateurs paient les services d'oracle, au lieu de seulement consommer des flux subventionnés." },
      { label: "Entrées dans la Reserve", why: "Le mécanisme qui relie les revenus à la demande de LINK." },
      { label: "Économie des opérateurs de nœuds", why: "La soutenabilité du réseau sans subventions en tokens." },
    ],
    claims: [
      "La publication des revenus est limitée par rapport aux protocoles on-chain ; DefiLlama suit certains frais, mais la vue complète des revenus d'entreprise n'est pas publique.",
      "Historiquement, les récompenses des opérateurs de nœuds ont été en partie financées par l'allocation de tokens pour l'écosystème plutôt que par les frais des utilisateurs.",
    ],
  },
  onchain: {
    claims: [
      "Les mises à jour des flux, les opérateurs et les seuils d'écart sont visibles publiquement sur data.chain.link.",
      "Les mouvements des wallets de réserve et de trésorerie peuvent être suivis on-chain et méritent d'être surveillés pour repérer les libérations d'offre.",
    ],
    dataAvailability: "La valeur totale sécurisée et les indicateurs par flux sont prévus pour la phase 2.",
  },
  competitors: {
    columns: [
      {
        technology: "Flux push + Data Streams, CCIP",
        adoption: "L'intégration DeFi la plus large",
        tokenomics: "1 Md fixe, réserves libérées",
        economics: "Peu de données publiques sur les revenus",
        strengths: "Position établie, portée institutionnelle",
        weaknesses: "Captation de valeur du token, nœuds sélectionnés",
        positioning: "Données et interopérabilité de bout en bout",
      },
      {
        technology: "Oracle pull, éditeurs de première main",
        adoption: "Fort sur Solana et les perpétuels",
        tokenomics: "PYTH, 10 Md maximum",
        economics: "Frais via les mises à jour pull",
        strengths: "Latence, données de première main",
        weaknesses: "Plus jeune, dépendance à Pythnet",
        positioning: "Données de marché à faible latence",
      },
      {
        technology: "Oracle modulaire pull et push",
        adoption: "En croissance sur les marchés LRT et LST",
        tokenomics: "Token RED",
        economics: "Stade précoce",
        strengths: "Flexibilité, actifs de la longue traîne",
        weaknesses: "Valeur sécurisée plus faible",
        positioning: "Challenger modulaire des oracles",
      },
    ],
  },
  risks: [
    ["Infrastructure mature et bien auditée ; risques liés aux défaillances des sources de données et à la complexité entre chaînes de CCIP."],
    ["Lien historiquement faible entre l'usage et la demande de LINK ; libérations d'offre depuis les réserves."],
    ["Exposition à des règles en évolution sur les titres tokenisés et la messagerie transfrontalière avec les banques."],
    ["Pas de gouvernance on-chain par les détenteurs ; Chainlink Labs pilote le développement et la sélection des opérateurs."],
    ["Token de grande capitalisation, très liquide."],
    ["Opérateurs de nœuds sélectionnés ; concentration des tokens dans des wallets associés à l'entreprise."],
    ["Les oracles « pull » mènent une concurrence agressive sur le coût et la latence, surtout hors des chaînes EVM."],
  ],
  thesis: {
    bull: [
      "Chainlink devient l'infrastructure standard des actifs tokenisés et de la connectivité bancaire, et des revenus payants alimentent la Reserve.",
      "CCIP devient le standard d'interopérabilité dominant pour les tokens institutionnels.",
    ],
    neutral: ["Chainlink reste l'oracle DeFi par défaut, mais la captation de valeur du token reste faible par rapport à l'usage."],
    bear: ["Les services d'oracle se banalisent ; des oracles « pull » moins chers gagnent les nouvelles chaînes et les nouveaux marchés.", "Les libérations continues depuis les wallets de réserve l'emportent sur la demande organique."],
    catalysts: ["La Chainlink Reserve accumule des LINK grâce aux revenus de services.", "Des déploiements en production avec de grandes institutions financières."],
    assumptions: [
      "Les entreprises sont prêtes à payer des services d'oracle et d'interopérabilité avec des revenus convertibles en LINK.",
      "La DeFi continue de s'appuyer sur des flux de prix robustes et décentralisés.",
    ],
    monitor: ["Croissance du solde de la Reserve", "Offre libérée depuis les wallets hors circulation", "Part de marché face à Pyth et RedStone", "Volume de CCIP"],
    invalidation: ["Les principaux protocoles de prêt abandonnent les flux Chainlink", "Les entrées dans la Reserve restent négligeables pendant plusieurs trimestres"],
  },
  framework: [
    { summary: "Infrastructure d'oracles éprouvée sur de nombreuses chaînes.", dataUsed: ["Documentation", "Historique opérationnel"], limitations: "CCIP est plus jeune que les flux de données." },
    { summary: "Offre fixe, mais d'importants avoirs d'initiés et de réserves, et un lien faible avec l'usage.", dataUsed: ["Allocation de la vente de tokens", "Offre en circulation"], limitations: "Calendrier de libération non fixé contractuellement." },
    { summary: "L'intégration la plus large dans la DeFi ; des pilotes institutionnels en croissance.", dataUsed: ["Intégrations", "Partenariats publics"], limitations: "Les chiffres de valeur sécurisée sont autodéclarés." },
    { summary: "Transparence limitée sur les revenus.", dataUsed: ["Frais DefiLlama"], limitations: "Revenus d'entreprise non publics." },
    { summary: "Pilotage par l'entreprise ; pas de gouvernance par les détenteurs.", dataUsed: ["Documentation"], limitations: "Qualitatif." },
    { summary: "Acteur établi incontesté face à des challengers crédibles.", dataUsed: ["Revue du marché"], limitations: "Les comparaisons de valeur sécurisée sont imparfaites." },
    { summary: "Les risques économiques et de centralisation dominent.", dataUsed: ["Revue des risques"], limitations: "Qualitatif." },
  ],
  sources: [
    { supports: "Conception d'origine et allocation des tokens." },
    { supports: "DON et architecture de long terme." },
    { supports: "Architecture des flux de prix." },
    { supports: "Protocole OCR." },
    { supports: "Architecture de CCIP et gestion des risques." },
    { supports: "Conception du staking et utilité du LINK." },
    { supports: "Mécanisme de réserve financé par les revenus de services." },
    { supports: "Expérimentations de connectivité bancaire.", limitations: "Publié par une partie intéressée." },
    { supports: "Opérateurs et paramètres des flux." },
    { supports: "Données de marché live : prix, capitalisation, FDV, offre en circulation et offre totale.", limitations: "Agrégateur ; les chiffres d'offre dépendent des déclarations des émetteurs et de la méthodologie de CoinGecko." },
    { supports: "Chiffres de TVL, de frais et de revenus.", limitations: "Adaptateurs open source ; la méthodologie diffère selon les protocoles et peut être révisée." },
  ],
};
