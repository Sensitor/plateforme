import type { ProjectText } from "@/lib/research/localized";

export const avalancheFr: ProjectText = {
  oneLiner: "Un Layer 1 au consensus Snow à finalité rapide, avec un réseau de chaînes souveraines « Avalanche L1 ».",
  tags: ["Consensus Snow", "L1 souverains", "EVM (C-Chain)"],
  headline: "Avalanche : un réseau de L1 souverains crée-t-il de la valeur cumulée pour l'AVAX ?",
  overview: {
    summary:
      "Avalanche est un réseau en preuve d'enjeu fondé sur la famille de protocoles de consensus Snow, qui atteignent la finalité en environ une seconde par échantillonnage aléatoire répété. Son réseau principal comprend la C-Chain compatible EVM ; des « Avalanche L1 » indépendants (anciennement subnets) permettent aux projets de faire tourner des chaînes personnalisées avec leurs propres validateurs.",
    problem: ["Le papier de recherche sur le consensus Avalanche propose une famille de protocoles sans leader qui atteint une finalité probabiliste rapide grâce à des votes répétés sur des sous-échantillons."],
    valueProposition: [
      "Avalanche9000 (la mise à jour Etna, décembre 2024) a réduit le coût de lancement d'un Avalanche L1 en supprimant l'obligation pour les validateurs de L1 de staker 2 000 AVAX sur le réseau principal.",
      "La finalité rapide et les chaînes personnalisables séduisent les entreprises, les jeux vidéo et les pilotes de tokenisation.",
    ],
    positioning: ["Se positionne comme une plateforme de L1 spécifiques à une application ; en concurrence avec les rollups d'Ethereum, les appchains Cosmos et les L1 haute performance."],
    team: ["Développé par Ava Labs, fondé par Emin Gün Sirer (Cornell) ; le réseau principal a été lancé en septembre 2020."],
  },
  technology: {
    blocks: [
      ["Le réseau principal se compose de la P-Chain (staking et validateurs), de la X-Chain (échange d'actifs) et de la C-Chain (smart contracts EVM)."],
      ["Consensus Snowman pour les chaînes linéaires ; finalité en général en quelques secondes."],
      ["Passe à l'échelle horizontalement grâce à des L1 indépendants plutôt qu'avec une seule chaîne à haut débit."],
      ["Les validateurs ne sont pas slashés ; les récompenses dépendent de leur disponibilité et de leur exactitude."],
      ["Avalanche Warp Messaging permet une communication native entre les Avalanche L1."],
    ],
    limitations: [
      "L'activité est répartie entre de nombreux L1, ce qui rend moins directe la captation de la valeur de l'écosystème par l'AVAX.",
      "L'écosystème DeFi de la C-Chain est plus petit que celui d'Ethereum ou de Solana.",
    ],
  },
  tokenomics: {
    supplyModelNote:
      "Plafond de 720 millions d'AVAX. 360 millions ont été créés à la genèse ; le reste est émis progressivement sous forme de récompenses de staking. Les frais de transaction sont brûlés.",
    distribution: [
      { label: "Récompenses de staking" },
      { label: "Communauté et partenaires" },
      { label: "Équipe" },
      { label: "Ventes publiques" },
      { label: "Fondation" },
      { label: "Ventes privées et seed" },
      { label: "Airdrop" },
      { label: "Incitations du testnet" },
    ],
    distributionNote: "Répartition du plafond de 720 millions telle que décrite dans la documentation d'Avalanche, regroupée par Sensitor (tours de vente publique d'une part, tours privés et seed d'autre part).",
    utility: [
      "L'AVAX paie les frais sur le réseau principal et est staké pour le valider (minimum de 2 000 AVAX par validateur).",
      "Depuis Avalanche9000, les validateurs des Avalanche L1 paient des frais continus au réseau principal.",
    ],
    emissions: ["Les récompenses de staking sont émises à partir de l'offre restante sous le plafond de 720 millions."],
    vesting: ["Les allocations de genèse des initiés ont en grande partie terminé leur vesting ; l'offre nouvelle vient des récompenses de staking."],
    valueAccrual: ["Les frais de transaction sur le réseau principal sont brûlés.", "Les frais brûlés sont restés faibles par rapport aux émissions de staking."],
  },
  adoption: {
    claims: ["Remarqué pour ses pilotes de tokenisation institutionnels et ses L1 de jeux vidéo.", "La TVL et les frais de la C-Chain sont suivis par DefiLlama (voir les données live)."],
    metricsToWatch: ["Nombre d'Avalanche L1 actifs", "Frais brûlés", "Offre de stablecoins sur la C-Chain", "Déploiements institutionnels"],
  },
  financials: {
    relevantMetrics: [
      { label: "Frais brûlés", why: "Compensent les émissions de staking." },
      { label: "Frais des validateurs de L1", why: "Une nouvelle ligne de revenus issue des Avalanche L1." },
    ],
    claims: ["Les revenus de frais sont modestes par rapport aux principales plateformes de smart contracts ; le modèle de frais des L1 est le principal nouveau levier économique."],
  },
  onchain: {
    claims: ["Les indicateurs d'activité doivent agréger la C-Chain et les Avalanche L1 actifs pour refléter l'écosystème."],
    dataAvailability: "Des agrégats sur les Avalanche L1 sont prévus en phase 2.",
  },
  competitors: {
    columns: [
      {
        technology: "Consensus Snow, L1 souverains",
        adoption: "Pilotes institutionnels, jeux vidéo",
        tokenomics: "Plafond de 720 M, frais brûlés",
        economics: "Frais modestes",
        strengths: "Finalité rapide, personnalisation",
        weaknesses: "DeFi plus petite",
        positioning: "Plateforme de L1 spécifiques à une application",
      },
      {
        technology: "EVM, rollups",
        adoption: "Plus grande base DeFi",
        tokenomics: "Pas de plafond",
        economics: "Frais en partie versés aux L2",
        strengths: "Liquidité",
        weaknesses: "Expérience fragmentée entre L2",
        positioning: "Couche de règlement",
      },
      {
        technology: "Monolithique",
        adoption: "Forte activité",
        tokenomics: "Désinflation",
        economics: "Frais élevés",
        strengths: "Débit",
        weaknesses: "Exigences matérielles",
        positioning: "Chaîne unique haute performance",
      },
    ],
  },
  risks: [
    ["Historique de réseau stable ; consensus novateur, fondé sur des travaux académiques."],
    ["Les émissions dépassent le burn ; la captation de valeur issue des L1 n'est pas encore prouvée."],
    ["L'orientation vers les entreprises et la tokenisation l'expose à l'évolution de la réglementation financière."],
    ["Ava Labs mène l'essentiel du développement du protocole (processus des ACP)."],
    ["Token de grande capitalisation, liquide."],
    ["La mise minimale de 2 000 AVAX limite la participation des validateurs ; pas de slashing."],
    ["L'approche par appchains rivalise avec des piles de rollups qui héritent de la sécurité d'Ethereum."],
  ],
  thesis: {
    bull: ["Avalanche9000 déclenche une vague de lancements de L1 dont les frais reviennent à l'AVAX.", "Les pilotes de tokenisation se transforment en déploiements en production."],
    neutral: ["Un écosystème stable mais de niche."],
    bear: ["Les piles de rollups remportent le marché des appchains ; les Avalanche L1 restent petits."],
    catalysts: ["Avalanche9000 a réduit le coût de lancement des L1."],
    assumptions: ["La demande de chaînes souveraines à finalité rapide augmente."],
    monitor: ["Lancements de nouveaux L1", "Frais brûlés face aux émissions", "Déploiements institutionnels"],
    invalidation: ["Un nombre de L1 qui stagne pendant plusieurs trimestres après Avalanche9000"],
  },
  framework: [
    { summary: "Consensus stable à finalité rapide.", dataUsed: ["Documentation"], limitations: "Pas de slashing." },
    { summary: "Plafond avec émissions ; burn faible.", dataUsed: ["Documentation de la tokenomics"], limitations: "Allocation regroupée." },
    { summary: "DeFi modérée ; pilotes d'entreprises.", dataUsed: ["DefiLlama"], limitations: "Activité des L1 difficile à agréger." },
    { summary: "Base de frais faible par rapport à la valorisation.", dataUsed: ["Frais DefiLlama"], limitations: "Frais des L1 récents." },
    { summary: "Processus des ACP, mené par Ava Labs.", dataUsed: ["Documentation"], limitations: "Qualitatif." },
    { summary: "Une niche distincte d'appchains, face à des concurrents solides.", dataUsed: ["Revue du marché"], limitations: "Qualitatif." },
    { summary: "Risque global modéré.", dataUsed: ["Revue des risques"], limitations: "Qualitatif." },
  ],
  sources: [
    { supports: "Famille de consensus Snow." },
    { supports: "Architecture du réseau principal." },
    { supports: "Exigences et récompenses des validateurs.", limitations: "Documentation fréquemment réorganisée." },
    { supports: "Plafond de l'offre, burns et allocation." },
    { supports: "Messagerie entre L1." },
    { supports: "Changements apportés par Avalanche9000 (Etna) aux validateurs de L1." },
    { supports: "Données de marché live : prix, capitalisation, FDV, offre en circulation et offre totale.", limitations: "Agrégateur ; les chiffres d'offre dépendent des déclarations des émetteurs et de la méthodologie de CoinGecko." },
    { supports: "TVL, frais et offre de stablecoins au niveau de la chaîne.", limitations: "La TVL ne compte que les dépôts DeFi ; ce n'est pas une mesure de la valeur du réseau." },
  ],
};
