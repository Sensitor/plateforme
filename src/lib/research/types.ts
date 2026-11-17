/**
 * Research content model.
 *
 * Core editorial rule: every statement is typed as a verified FACT, an analyst
 * INTERPRETATION, or a forward-looking HYPOTHESIS, and links to the sources that
 * support it. The UI renders these three kinds differently so readers always
 * know what they are looking at.
 *
 * Live, time-sensitive numbers (price, market cap, TVL, fees…) are NEVER stored
 * here, they are fetched from data providers at render time. Dossiers only
 * hold protocol parameters and qualitative research.
 */

export type ClaimKind = "fact" | "interpretation" | "hypothesis";

export interface Claim {
  kind: ClaimKind;
  text: string;
  /** Ids of entries in the dossier's `sources` list. */
  sources?: string[];
}

export type SourceType = "primary" | "documentation" | "data" | "research" | "governance";

export interface ResearchSource {
  id: string;
  title: string;
  publisher: string;
  url: string;
  type: SourceType;
  /** Publication date (ISO date, or year when only the year is known). */
  published?: string;
  /** Date the link was last checked by the research team (ISO date). */
  accessed: string;
  /** Which information in the dossier this source supports. */
  supports: string;
  reliability: "high" | "medium" | "low";
  limitations?: string;
}

export type SectorId =
  | "layer-1"
  | "layer-2"
  | "defi"
  | "oracles"
  | "rwa"
  | "infrastructure"
  | "depin"
  | "ai"
  | "gaming"
  | "stablecoins"
  | "cross-chain"
  | "liquid-staking"
  | "restaking";

export type ChainId =
  | "bitcoin"
  | "ethereum"
  | "solana"
  | "arbitrum"
  | "optimism"
  | "base"
  | "avalanche"
  | "sui"
  | "hyperliquid"
  | "bittensor"
  | "celestia"
  | "immutable"
  | "multichain";

export type RiskLevel = "lower" | "moderate" | "elevated" | "high";
export type Maturity = "established" | "growth" | "early";
export type Confidence = "high" | "medium" | "low";

export type PillarId =
  | "technology"
  | "tokenomics"
  | "adoption"
  | "financials"
  | "governance"
  | "competition"
  | "risk";

export interface PillarAssessment {
  pillar: PillarId;
  /** 1-5, higher = more favourable. `null` = not rated (insufficient data). */
  rating: 1 | 2 | 3 | 4 | 5 | null;
  confidence: Confidence;
  summary: string;
  dataUsed: string[];
  limitations: string;
  sources: string[];
}

export type TechTopic =
  | "architecture"
  | "consensus"
  | "scalability"
  | "security"
  | "decentralization"
  | "interoperability"
  | "innovation";

export type SupplyModel =
  | "fixed-cap"
  | "capped-emissions"
  | "disinflationary"
  | "net-variable"
  | "fixed-genesis-plus-inflation";

/** Issuance rules used to draw modelled supply curves from protocol parameters. */
export type IssuanceModel =
  | {
      kind: "halving";
      /** Supply at the first point of the curve */
      genesisDate: string;
      initialReward: number;
      blocksPerHalving: number;
      blockTimeSec: number;
      maxSupply: number;
      untilYear: number;
      /** Actual dates of past halvings (block times drift from the target). */
      knownHalvings?: string[];
    }
  | {
      kind: "disinflation";
      startDate: string;
      startSupply: number;
      initialRate: number;
      decayPerYear: number;
      terminalRate: number;
      years: number;
    };

export interface DistributionSlice {
  label: string;
  pct: number;
  note?: string;
}

export interface Tokenomics {
  supplyModel: SupplyModel;
  supplyModelNote: string;
  /** Hard cap if one exists in the protocol rules, else null. */
  maxSupply: number | null;
  distribution?: DistributionSlice[];
  distributionNote?: string;
  distributionSources?: string[];
  issuance?: IssuanceModel;
  issuanceNote?: string;
  utility: Claim[];
  emissions: Claim[];
  vesting: Claim[];
  valueAccrual: Claim[];
  concentration?: Claim[];
}

export type RiskCategory =
  | "technology"
  | "economic"
  | "regulatory"
  | "governance"
  | "liquidity"
  | "centralization"
  | "competition";

export interface RiskItem {
  category: RiskCategory;
  level: RiskLevel;
  claims: Claim[];
}

export interface CompetitorColumn {
  name: string;
  /** Slug if the competitor is covered by Sensitor (enables live data + link). */
  slug?: string;
  technology: string;
  adoption: string;
  tokenomics: string;
  economics: string;
  strengths: string;
  weaknesses: string;
  positioning: string;
}

export type FinancialModel =
  | "settlement-layer"
  | "smart-contract-platform"
  | "rollup"
  | "lending"
  | "exchange"
  | "staking-protocol"
  | "middleware"
  | "synthetic-dollar"
  | "tokenization"
  | "compute-network"
  | "gaming-platform";

export interface Dossier {
  overview: {
    summary: string;
    problem: Claim[];
    valueProposition: Claim[];
    positioning: Claim[];
    team: Claim[];
  };
  technology: {
    blocks: { topic: TechTopic; claims: Claim[] }[];
    limitations: Claim[];
  };
  tokenomics: Tokenomics;
  adoption: {
    claims: Claim[];
    metricsToWatch: string[];
  };
  financials: {
    model: FinancialModel;
    /** Metrics that matter for this business model, and why. */
    relevantMetrics: { label: string; why: string }[];
    claims: Claim[];
  };
  onchain: {
    claims: Claim[];
    dataAvailability: string;
  };
  competitors: {
    columns: CompetitorColumn[];
    note?: string;
  };
  risks: RiskItem[];
  thesis: {
    bull: Claim[];
    neutral: Claim[];
    bear: Claim[];
    catalysts: Claim[];
    assumptions: Claim[];
    monitor: string[];
    invalidation: string[];
  };
  framework: PillarAssessment[];
  /** Academy concept slugs used in this dossier ("Learn by Research"). */
  concepts: string[];
  sources: ResearchSource[];
}

export interface ProjectLinks {
  website: string;
  whitepaper?: string;
  docs?: string;
  github?: string;
  explorer?: string;
  governance?: string;
}

export interface DataMappings {
  coingeckoId: string;
  coinpaprikaId: string;
  /** DefiLlama protocol slug for protocol-level TVL. */
  llamaProtocol?: string;
  /** DefiLlama chain name for chain-level TVL (L1/L2s). */
  llamaChain?: string;
  /** DefiLlama fees/revenue slug. */
  llamaFees?: string;
}

export interface EditorialInfo {
  /** draft = prepared by an analyst from public documentation, not yet peer-reviewed. */
  status: "draft" | "reviewed";
  lastUpdated: string;
  author: string;
  reviewer?: string;
  version: string;
}

export interface Project {
  slug: string;
  name: string;
  ticker: string;
  oneLiner: string;
  sector: SectorId;
  tags: string[];
  chains: ChainId[];
  launched: string;
  maturity: Maturity;
  riskLevel: RiskLevel;
  featured?: boolean;
  logo: string;
  /** Hex accent used for subtle per-project artwork. */
  accent: string;
  links: ProjectLinks;
  data: DataMappings;
  editorial: EditorialInfo;
  dossier: Dossier;
}
