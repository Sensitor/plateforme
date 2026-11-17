import type { ChainId, PillarId, RiskCategory, RiskLevel, SectorId, TechTopic, Maturity, Confidence } from "./types";

export interface SectorMeta {
  id: SectorId;
  label: string;
  short: string;
  description: string;
}

export const SECTORS: SectorMeta[] = [
  { id: "layer-1", label: "Layer 1", short: "L1", description: "Base blockchains that settle their own transactions and secure their own state." },
  { id: "layer-2", label: "Layer 2", short: "L2", description: "Networks that execute transactions off a base chain and post data or proofs back to it." },
  { id: "defi", label: "DeFi", short: "DeFi", description: "Open financial protocols: exchanges, lending markets, derivatives and asset management." },
  { id: "oracles", label: "Oracles", short: "Oracles", description: "Networks that bring off-chain data and computation to smart contracts." },
  { id: "rwa", label: "Real World Assets", short: "RWA", description: "Tokenised representations of off-chain assets such as treasuries, credit or funds." },
  { id: "infrastructure", label: "Infrastructure", short: "Infra", description: "Base components other networks build on: data availability, indexing, tooling." },
  { id: "depin", label: "DePIN", short: "DePIN", description: "Decentralised physical infrastructure: compute, storage, wireless and sensor networks." },
  { id: "ai", label: "AI & Crypto", short: "AI", description: "Networks that coordinate machine-learning work, models or AI agents with crypto incentives." },
  { id: "gaming", label: "Gaming", short: "Gaming", description: "Infrastructure and platforms for on-chain games and digital ownership." },
  { id: "stablecoins", label: "Stablecoins", short: "Stables", description: "Tokens designed to track a reference asset, usually the US dollar." },
  { id: "cross-chain", label: "Cross-chain", short: "X-chain", description: "Messaging and bridging protocols connecting independent blockchains." },
  { id: "liquid-staking", label: "Liquid Staking", short: "LST", description: "Protocols issuing liquid tokens that represent staked assets." },
  { id: "restaking", label: "Restaking", short: "Restake", description: "Protocols that reuse staked collateral to secure additional services." },
];

export const SECTOR_BY_ID = Object.fromEntries(SECTORS.map((s) => [s.id, s])) as Record<SectorId, SectorMeta>;

export const CHAINS: Record<ChainId, { label: string }> = {
  bitcoin: { label: "Bitcoin" },
  ethereum: { label: "Ethereum" },
  solana: { label: "Solana" },
  arbitrum: { label: "Arbitrum" },
  optimism: { label: "OP Mainnet" },
  base: { label: "Base" },
  avalanche: { label: "Avalanche" },
  sui: { label: "Sui" },
  hyperliquid: { label: "Hyperliquid L1" },
  bittensor: { label: "Bittensor" },
  celestia: { label: "Celestia" },
  immutable: { label: "Immutable" },
  multichain: { label: "Multichain" },
};

export interface PillarMeta {
  id: PillarId;
  label: string;
  question: string;
  criteria: string[];
  /** Explains the direction of the scale for this pillar. */
  scaleNote: string;
}

export const PILLARS: PillarMeta[] = [
  {
    id: "technology",
    label: "Technology & Security",
    question: "Does the system work as designed, and how robust is it?",
    criteria: [
      "Production track record and incident history",
      "Audits, formal verification, bug bounties",
      "Client diversity and upgrade process",
      "Clarity and novelty of the design versus its trade-offs",
    ],
    scaleNote: "5 = battle-tested design with strong security track record.",
  },
  {
    id: "tokenomics",
    label: "Token Economics",
    question: "Is the token necessary, and is its supply schedule fair and predictable?",
    criteria: [
      "Token utility within the protocol (security, fees, governance)",
      "Supply schedule transparency and remaining unlocks",
      "Insider allocation and vesting",
      "Mechanisms linking protocol usage to the token",
    ],
    scaleNote: "5 = essential token, transparent schedule, limited dilution overhang.",
  },
  {
    id: "adoption",
    label: "Adoption & Usage",
    question: "Is the network used for real, and is usage durable?",
    criteria: [
      "Users, transactions and developer activity",
      "Integrations by third parties",
      "Quality of usage (organic vs incentivised)",
      "Trend over full market cycles",
    ],
    scaleNote: "5 = broad, organic, cycle-tested usage.",
  },
  {
    id: "financials",
    label: "Financial Sustainability",
    question: "Does the protocol generate economic activity that can sustain it?",
    criteria: [
      "Fees paid by users and revenue retained by the protocol",
      "Dependence on token incentives",
      "Treasury runway",
      "Metric adapted to business model (L1, DeFi, middleware…)",
    ],
    scaleNote: "5 = self-sustaining economics without reliance on emissions.",
  },
  {
    id: "governance",
    label: "Governance",
    question: "Who can change the protocol, and are decisions accountable?",
    criteria: [
      "Upgrade keys and emergency powers",
      "Voting concentration and participation",
      "Foundation / company influence",
      "Transparency of decision-making",
    ],
    scaleNote: "5 = credibly neutral, transparent, hard to capture.",
  },
  {
    id: "competition",
    label: "Competitive Position",
    question: "How defensible is the project's position in its sector?",
    criteria: [
      "Market share within its sector",
      "Network effects, liquidity and switching costs",
      "Differentiation versus direct competitors",
      "Exposure to commoditisation",
    ],
    scaleNote: "5 = clear leader with durable network effects.",
  },
  {
    id: "risk",
    label: "Risk Exposure",
    question: "How large and how controllable are the project's main risks?",
    criteria: [
      "Smart-contract and dependency risk",
      "Regulatory exposure",
      "Centralisation points",
      "Liquidity and concentration risk",
    ],
    scaleNote: "Inverted scale: 5 = most contained risk exposure, 1 = highest.",
  },
];

export const PILLAR_BY_ID = Object.fromEntries(PILLARS.map((p) => [p.id, p])) as Record<PillarId, PillarMeta>;

export const RISK_CATEGORIES: Record<RiskCategory, string> = {
  technology: "Technological",
  economic: "Economic",
  regulatory: "Regulatory",
  governance: "Governance",
  liquidity: "Liquidity",
  centralization: "Centralisation",
  competition: "Competition",
};

export const RISK_LEVELS: Record<RiskLevel, { label: string; rank: number }> = {
  lower: { label: "Lower", rank: 1 },
  moderate: { label: "Moderate", rank: 2 },
  elevated: { label: "Elevated", rank: 3 },
  high: { label: "High", rank: 4 },
};

export const MATURITY: Record<Maturity, string> = {
  established: "Established",
  growth: "Growth",
  early: "Early stage",
};

export const CONFIDENCE: Record<Confidence, string> = {
  high: "High confidence",
  medium: "Medium confidence",
  low: "Low confidence",
};

export const TECH_TOPICS: Record<TechTopic, string> = {
  architecture: "Architecture",
  consensus: "Consensus",
  scalability: "Scalability",
  security: "Security",
  decentralization: "Decentralisation",
  interoperability: "Interoperability",
  innovation: "Innovations",
};
