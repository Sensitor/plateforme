/**
 * Knowledge Graph: documented relationships between covered projects.
 * Every edge states what it means and which dossier (or official
 * documentation) supports it. Only relationships we can justify are listed;
 * the graph is a research map, not a list of announced partnerships.
 */

export type RelationKind = "settles-on" | "deployed-on" | "stakes" | "uses-oracle" | "messaging" | "bridge" | "uses-stack" | "integration" | "competitor";

export interface Relationship {
  from: string;
  to: string;
  kind: RelationKind;
  note: string;
  /** Where the relationship is documented: a dossier section or an official doc URL. */
  evidence: string;
}

export const RELATION_META: Record<RelationKind, { label: string; verb: string; color: string; dashed?: boolean; directed: boolean }> = {
  "settles-on": { label: "Settles on", verb: "settles on", color: "#7C93FF", directed: true },
  "deployed-on": { label: "Deployed on", verb: "is deployed on", color: "#94A3B8", directed: true },
  stakes: { label: "Stakes / restakes", verb: "secures with stake from", color: "#C77DEB", directed: true },
  "uses-oracle": { label: "Uses oracle", verb: "uses price feeds from", color: "#3DBFA0", dashed: true, directed: true },
  messaging: { label: "Cross-chain messaging", verb: "connects", color: "#4FD3E0", dashed: true, directed: true },
  bridge: { label: "Bridge", verb: "bridges assets with", color: "#56B8F0", dashed: true, directed: true },
  "uses-stack": { label: "Built with stack", verb: "is built with the stack of", color: "#E8B04B", directed: true },
  integration: { label: "Integration", verb: "integrates", color: "#5FCB86", dashed: true, directed: true },
  competitor: { label: "Direct competitor", verb: "competes with", color: "#E36B75", dashed: true, directed: false },
};

export const RELATIONSHIPS: Relationship[] = [
  // Settlement and staking on Ethereum
  { from: "arbitrum", to: "ethereum", kind: "settles-on", note: "Optimistic rollup: posts transaction data to Ethereum and resolves disputes there.", evidence: "dossier:arbitrum#technology" },
  { from: "optimism", to: "ethereum", kind: "settles-on", note: "OP Mainnet is an optimistic rollup with fault proofs on Ethereum.", evidence: "dossier:optimism#technology" },
  { from: "lido", to: "ethereum", kind: "stakes", note: "Pools ETH deposits and runs Ethereum validators through curated and permissionless operators.", evidence: "dossier:lido#overview" },
  { from: "eigenlayer", to: "ethereum", kind: "stakes", note: "Restakers reuse staked ETH to secure additional services (AVSs).", evidence: "dossier:eigenlayer#overview" },
  { from: "eigenlayer", to: "lido", kind: "integration", note: "Liquid staking tokens such as stETH are accepted as restaking collateral.", evidence: "dossier:eigenlayer#adoption" },

  // Application deployments
  { from: "aave", to: "ethereum", kind: "deployed-on", note: "Main Aave market runs on Ethereum.", evidence: "dossier:aave#technology" },
  { from: "aave", to: "arbitrum", kind: "deployed-on", note: "Aave V3 market deployed on Arbitrum.", evidence: "https://aave.com/docs" },
  { from: "aave", to: "optimism", kind: "deployed-on", note: "Aave V3 market deployed on OP Mainnet.", evidence: "https://aave.com/docs" },
  { from: "aave", to: "avalanche", kind: "deployed-on", note: "Aave V3 market deployed on Avalanche C-Chain.", evidence: "https://aave.com/docs" },
  { from: "aave", to: "chainlink", kind: "uses-oracle", note: "Most Aave markets rely on Chainlink price feeds for collateral valuation and liquidations.", evidence: "dossier:aave#technology" },
  { from: "uniswap", to: "ethereum", kind: "deployed-on", note: "Uniswap core contracts originate on Ethereum.", evidence: "dossier:uniswap#technology" },
  { from: "uniswap", to: "arbitrum", kind: "deployed-on", note: "Uniswap v3 deployed on Arbitrum.", evidence: "https://docs.uniswap.org" },
  { from: "uniswap", to: "optimism", kind: "uses-stack", note: "Unichain, Uniswap's own L2, is built with the OP Stack.", evidence: "dossier:uniswap#technology" },
  { from: "ethena", to: "ethereum", kind: "deployed-on", note: "USDe and sUSDe are issued as Ethereum tokens.", evidence: "dossier:ethena#overview" },
  { from: "ondo", to: "ethereum", kind: "deployed-on", note: "Tokenised products are issued on Ethereum, among other chains.", evidence: "dossier:ondo#technology" },
  { from: "ondo", to: "solana", kind: "deployed-on", note: "Tokenised products are also available on Solana.", evidence: "dossier:ondo#technology" },
  { from: "chainlink", to: "ethereum", kind: "deployed-on", note: "LINK is an Ethereum token; data feeds run on many chains.", evidence: "dossier:chainlink#technology" },
  { from: "render", to: "solana", kind: "deployed-on", note: "RENDER migrated from Ethereum to Solana (RNP-002); payments and emissions settle on Solana.", evidence: "dossier:render#technology" },

  // Bridges and messaging
  { from: "immutable", to: "ethereum", kind: "bridge", note: "Game assets can be bridged between Ethereum and Immutable Chain.", evidence: "dossier:immutable#technology" },
  { from: "hyperliquid", to: "arbitrum", kind: "bridge", note: "USDC deposits reach Hyperliquid through its bridge contract on Arbitrum.", evidence: "dossier:hyperliquid#technology" },
  { from: "layerzero", to: "ethereum", kind: "messaging", note: "LayerZero endpoints connect Ethereum to other chains.", evidence: "dossier:layerzero#technology" },
  { from: "layerzero", to: "solana", kind: "messaging", note: "LayerZero endpoints connect Solana to EVM chains.", evidence: "dossier:layerzero#technology" },
  { from: "layerzero", to: "arbitrum", kind: "messaging", note: "LayerZero endpoint deployed on Arbitrum.", evidence: "dossier:layerzero#technology" },
  { from: "layerzero", to: "avalanche", kind: "messaging", note: "LayerZero endpoint deployed on Avalanche.", evidence: "dossier:layerzero#technology" },

  // Direct competitors (from each dossier's competitor table)
  { from: "ethereum", to: "solana", kind: "competitor", note: "Rollup-centric settlement layer versus high-performance monolithic chain.", evidence: "dossier:ethereum#competitors" },
  { from: "ethereum", to: "avalanche", kind: "competitor", note: "Competing smart-contract platforms for DeFi and institutional deployments.", evidence: "dossier:ethereum#competitors" },
  { from: "bitcoin", to: "ethereum", kind: "competitor", note: "Competition for the role of crypto's main monetary and collateral asset.", evidence: "dossier:bitcoin#competitors" },
  { from: "solana", to: "sui", kind: "competitor", note: "High-throughput L1s competing for consumer applications and trading.", evidence: "dossier:solana#competitors" },
  { from: "arbitrum", to: "optimism", kind: "competitor", note: "The two leading optimistic rollup stacks (Orbit vs OP Stack / Superchain).", evidence: "dossier:arbitrum#competitors" },
  { from: "layerzero", to: "chainlink", kind: "competitor", note: "LayerZero messaging competes with Chainlink CCIP for cross-chain token standards.", evidence: "dossier:layerzero#competitors" },
  { from: "celestia", to: "eigenlayer", kind: "competitor", note: "Celestia and EigenDA both sell data availability to rollups.", evidence: "dossier:celestia#competitors" },
  { from: "celestia", to: "ethereum", kind: "competitor", note: "Ethereum blobs are the default data-availability choice for Ethereum rollups.", evidence: "dossier:celestia#competitors" },
  { from: "bittensor", to: "render", kind: "competitor", note: "Adjacent decentralised AI and compute networks competing for the same narrative and capital.", evidence: "dossier:bittensor#competitors" },
  { from: "immutable", to: "solana", kind: "competitor", note: "Solana courts the same game studios as Immutable.", evidence: "dossier:immutable#competitors" },
];

/** Ecosystem used to cluster the graph layout. */
export const ECOSYSTEMS: { id: string; label: string; members: string[] }[] = [
  { id: "ethereum", label: "Ethereum ecosystem", members: ["ethereum", "arbitrum", "optimism", "aave", "uniswap", "lido", "eigenlayer", "ethena", "ondo", "chainlink", "immutable"] },
  { id: "solana", label: "Solana ecosystem", members: ["solana", "render"] },
  { id: "independent", label: "Independent networks", members: ["bitcoin", "avalanche", "sui", "hyperliquid", "bittensor", "layerzero", "celestia"] },
];
