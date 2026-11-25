/**
 * Academy concept library, powers "Learn by Research": every dossier lists
 * the concepts it relies on and links to these explainers.
 * Educational content only; no investment recommendations.
 */
import { INVESTING_CONCEPTS } from "./investing";

export type AcademyCategory =
  | "foundations"
  | "technology"
  | "defi"
  | "tokenomics"
  | "research"
  | "portfolio"
  | "risk"
  | "psychology"
  /** Second axis: classic investing education (see investing.ts). */
  | "investing";

export const ACADEMY_CATEGORIES: { id: AcademyCategory; label: string; description: string }[] = [
  { id: "foundations", label: "Crypto Foundations", description: "What blockchains are, why they exist and how value moves on them." },
  { id: "technology", label: "Blockchain Technology", description: "Consensus, scaling, data availability and interoperability." },
  { id: "defi", label: "DeFi & Web3", description: "Exchanges, lending, stablecoins and derivatives built on smart contracts." },
  { id: "tokenomics", label: "Tokenomics", description: "Supply, emissions, vesting, burns and how tokens capture value." },
  { id: "research", label: "Fundamental Research", description: "Metrics and frameworks to analyse a protocol like an analyst." },
  { id: "portfolio", label: "Portfolio Management", description: "Allocation, diversification and position sizing." },
  { id: "risk", label: "Risk Management", description: "Identifying, measuring and limiting what can go wrong." },
  { id: "psychology", label: "Market Psychology", description: "Cycles, sentiment and the behavioural traps investors face." },
];

/** The "Learn to invest" track, shown as its own section next to the eight crypto tracks above. */
export const INVESTING_TRACK: { id: AcademyCategory; label: string; description: string } = {
  id: "investing",
  label: "Learn to Invest",
  description: "Compounding, risk, stocks, bonds, ETFs, allocation and the habits of long-term investors.",
};

/** Every track, crypto and investing, for labels, badges and filters. */
export const ALL_ACADEMY_CATEGORIES = [...ACADEMY_CATEGORIES, INVESTING_TRACK];

export interface Concept {
  slug: string;
  title: string;
  category: AcademyCategory;
  level: "beginner" | "intermediate" | "advanced";
  summary: string;
  body: string[];
  keyTakeaways: string[];
  related: string[];
}

/** Visuals available to in-depth concept pages (see components/academy/diagrams). */
export type ConceptVisual =
  | "pow"
  | "pos"
  | "contracts"
  | "fee-calculator"
  | "halving"
  | "stablecoin-models"
  | "amm"
  | "rollup"
  | "mcap-fdv"
  | "vesting"
  /** Data-driven flow diagram from `flow`. */
  | "flow"
  /** Data-driven comparison table from `table`. */
  | "table"
  | "health-factor"
  | "funding"
  | "tvl-table"
  | "recovery"
  | "diversification"
  | "fear-greed-live"
  | "btc-drawdown"
  | "regime-live"
  /** Investing track visuals (components/academy/investing-visuals, strategies). */
  | "compound"
  | "volatility-drag"
  | "horizon"
  | "stock-returns"
  | "bond-price"
  | "etf-fees"
  | "allocation"
  | "dca-live"
  | "wma-live";

export interface FlowSpec {
  nodes: { title: string; text: string; loop?: string }[];
  outcomes?: { positive: string; negative: string };
}

export interface TableSpec {
  columns: string[];
  rows: { label: string; values: string[] }[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  /** Index of the correct option. */
  answer: number;
  explanation: string;
}

/**
 * In-depth layer of a concept page. Educational content: protocol rules and
 * mechanisms only, never live market figures (those are rendered from data
 * providers with their source and timestamp).
 */
export interface ConceptDeep {
  /** "In one minute": the whole idea in two or three sentences. */
  minute: string;
  steps: { title: string; text: string }[];
  visual?: ConceptVisual;
  visualCaption?: string;
  flow?: FlowSpec;
  table?: TableSpec;
  example: { projects: string[]; title: string; paragraphs: string[]; live?: "mcap-fdv" | "key-dates" | "btc-drawdown" | "regime" };
  metrics: { label: string; read: string }[];
  misconceptions: { myth: string; reality: string }[];
  risks: string[];
  quiz: QuizQuestion[];
  sources: { title: string; publisher: string; url: string }[];
}

export const CONCEPTS: Concept[] = [
  {
    slug: "proof-of-work",
    title: "Proof of Work",
    category: "technology",
    level: "beginner",
    summary: "A consensus mechanism where miners spend computation to propose blocks, making history expensive to rewrite.",
    body: [
      "In Proof of Work (PoW), miners repeatedly hash candidate blocks until they find one whose hash falls below a network-defined target. Finding such a hash is costly; verifying it is cheap. The chain with the most accumulated work is considered canonical.",
      "Security comes from economics: rewriting recent history would require out-spending the honest network's hash power. Miners are paid with newly issued coins (the block subsidy) plus transaction fees.",
      "The trade-offs are energy consumption, specialised hardware (ASICs) and a tendency for miners to pool their hash power, which concentrates block production among a few pool operators.",
    ],
    keyTakeaways: ["Security is paid for with energy and hardware", "Longest (most-work) chain wins", "Mining pools concentrate block production"],
    related: ["halving", "proof-of-stake", "validator-decentralization"],
  },
  {
    slug: "proof-of-stake",
    title: "Proof of Stake",
    category: "technology",
    level: "beginner",
    summary: "Validators lock (stake) the network's token as collateral to propose and attest to blocks, and can lose it if they misbehave.",
    body: [
      "In Proof of Stake (PoS), the right to produce blocks is tied to the amount of tokens a validator has locked. Honest behaviour is rewarded with newly issued tokens and fees; provable misbehaviour (such as signing two conflicting blocks) can be punished by slashing part of the stake.",
      "PoS replaces energy expenditure with capital at risk. It enables faster finality and lower resource usage, but introduces new questions: how concentrated is stake, who controls delegated stake, and how is the token distributed in the first place?",
      "When analysing a PoS network, look at the share of supply staked, the concentration of stake among entities (exchanges, liquid-staking protocols), the real yield after inflation, and whether slashing actually exists.",
    ],
    keyTakeaways: ["Capital at risk replaces energy", "Issuance rewards stakers and dilutes non-stakers", "Stake concentration is a key decentralisation metric"],
    related: ["liquid-staking", "validator-decentralization", "restaking"],
  },
  {
    slug: "smart-contracts",
    title: "Smart contracts",
    category: "foundations",
    level: "beginner",
    summary: "Programs deployed on a blockchain that execute deterministically and can hold and move assets.",
    body: [
      "A smart contract is code stored on-chain that anyone can call. Every node executes it identically, so its result is agreed upon by the network. Contracts can hold tokens, enforce rules and call other contracts.",
      "Because contracts can call each other without permission, applications compose like building blocks: a lending protocol can accept a token issued by another protocol, which in turn uses a price oracle from a third. This composability is a source of innovation and of contagion risk.",
      "Once deployed, code is often immutable or upgradeable only through governance or admin keys. Audits reduce, but never eliminate, the risk of bugs.",
    ],
    keyTakeaways: ["Code that holds and moves assets", "Composability creates both innovation and contagion", "Upgrade keys are a trust assumption"],
    related: ["gas-fees", "oracles", "governance-tokens"],
  },
  {
    slug: "gas-fees",
    title: "Gas and transaction fees",
    category: "foundations",
    level: "beginner",
    summary: "The price users pay for blockspace, the network's scarce resource.",
    body: [
      "Every transaction consumes computation and storage, measured in units (gas on Ethereum, compute units on Solana). Users pay fees to have their transaction included, usually in the network's native token.",
      "Fees are set by supply and demand for blockspace. Many networks split fees into a base component (sometimes burned) and a priority tip paid to the block producer.",
      "For analysts, total fees paid by users is one of the most direct measures of demand for a network, but it must be compared with the issuance paid to validators to judge economic sustainability.",
    ],
    keyTakeaways: ["Fees measure demand for blockspace", "Base fees may be burned; tips go to producers", "Compare fees with issuance"],
    related: ["burn-mechanisms", "protocol-revenue", "mev"],
  },
  {
    slug: "burn-mechanisms",
    title: "Token burns",
    category: "tokenomics",
    level: "intermediate",
    summary: "Mechanisms that permanently remove tokens from supply, usually funded by protocol usage.",
    body: [
      "A burn sends tokens to an address from which they can never be spent, reducing supply. Burns can be built into the protocol (e.g. burning base fees) or funded by revenue (buy-and-burn).",
      "A burn only creates value for holders if it is funded by real, recurring usage. Burns funded by the treasury or by one-off events are closer to marketing than to cash-flow distribution.",
      "Always look at net supply change: issuance minus burn. A token can be 'deflationary' in a busy month and inflationary for the year.",
    ],
    keyTakeaways: ["Check what funds the burn", "Net issuance matters more than gross burn", "Burns are cyclical with activity"],
    related: ["gas-fees", "protocol-revenue", "token-unlocks"],
  },
  {
    slug: "halving",
    title: "Halvings and issuance schedules",
    category: "tokenomics",
    level: "beginner",
    summary: "Pre-programmed reductions of new supply, best known from Bitcoin's four-year cycle.",
    body: [
      "Bitcoin's block subsidy halves every 210,000 blocks (about four years), so new supply declines geometrically towards a 21 million cap. Other networks, such as Bittensor, use similar halving logic.",
      "Halvings are known years in advance, so their effect on price is debated: supply reduction is predictable and, in an efficient market, should already be priced. What changes is the economics of block producers, whose subsidy income is cut overnight.",
      "Long-term, a network with a declining subsidy must rely on transaction fees to pay for security, the 'security budget' question.",
    ],
    keyTakeaways: ["Predictable, geometric supply reduction", "Miner economics change at each halving", "Fees must eventually fund security"],
    related: ["proof-of-work", "market-cap-vs-fdv"],
  },
  {
    slug: "layer-2-rollups",
    title: "Layer 2 rollups",
    category: "technology",
    level: "intermediate",
    summary: "Chains that execute transactions off a base layer and post data and proofs back to it, inheriting part of its security.",
    body: [
      "A rollup batches many transactions, executes them off-chain and publishes the transaction data (or state differences) to a base layer such as Ethereum. Anyone can reconstruct the rollup's state from that data.",
      "Optimistic rollups assume batches are valid and allow a challenge window during which anyone can submit a fraud proof. ZK rollups attach a validity proof that the base layer verifies directly.",
      "Security depends on details: who can upgrade the contracts, whether proofs are live and permissionless, and whether users can exit if the operator censors them. L2BEAT's 'stages' framework summarises this maturity.",
    ],
    keyTakeaways: ["Execution off-chain, data on the base layer", "Fraud proofs vs validity proofs", "Upgrade keys and exit windows define real security"],
    related: ["sequencers", "data-availability", "rollup-stages"],
  },
  {
    slug: "rollup-stages",
    title: "Rollup stages (0, 1, 2)",
    category: "technology",
    level: "advanced",
    summary: "A maturity scale for rollups based on how much users must trust operators and security councils.",
    body: [
      "Stage 0 rollups rely heavily on their operators: proofs may be missing or permissioned and contracts can be upgraded instantly. Stage 1 requires a working proof system, with a security council able to override it only under defined conditions. Stage 2 limits upgrades so that users have time to exit before any change takes effect.",
      "The framework, maintained by L2BEAT, is useful because marketing rarely states these trust assumptions explicitly. A rollup's stage can change with every upgrade, so it should be checked regularly.",
    ],
    keyTakeaways: ["Stages describe trust in operators", "Check proof system and upgrade delays", "Stages change with upgrades"],
    related: ["layer-2-rollups", "sequencers"],
  },
  {
    slug: "sequencers",
    title: "Sequencers",
    category: "technology",
    level: "intermediate",
    summary: "The entity that orders transactions on a rollup, today usually a single operator.",
    body: [
      "On most rollups, a single sequencer receives user transactions, orders them and produces blocks. This gives fast confirmations but creates a central point that could censor, reorder (MEV) or go offline.",
      "Well-designed rollups let users force-include transactions through the base layer if the sequencer censors them. Decentralised or shared sequencing is an active research area.",
      "Sequencer fees minus data-posting costs form a rollup's gross margin, the main revenue line of most L2s.",
    ],
    keyTakeaways: ["Usually centralised today", "Force-inclusion protects users", "Sequencer margin is L2 revenue"],
    related: ["layer-2-rollups", "mev", "protocol-revenue"],
  },
  {
    slug: "data-availability",
    title: "Data availability",
    category: "technology",
    level: "advanced",
    summary: "The guarantee that block data has been published so anyone can verify or reconstruct state.",
    body: [
      "Verifying a chain requires the underlying data. If a block producer publishes a block header but withholds data, nobody can check it. Data availability (DA) layers specialise in guaranteeing that data was published.",
      "Data availability sampling (DAS) lets light nodes verify availability by downloading small random pieces of erasure-coded data, so capacity can grow with the number of samplers rather than with each node's bandwidth.",
      "Rollups choose a DA layer, Ethereum blobs, Celestia, EigenDA or others, trading off cost, security and integration with their settlement layer.",
    ],
    keyTakeaways: ["Verification needs published data", "Sampling scales verification", "DA choice affects rollup security"],
    related: ["layer-2-rollups", "interoperability"],
  },
  {
    slug: "oracles",
    title: "Oracles",
    category: "defi",
    level: "beginner",
    summary: "Services that bring external data, such as asset prices, onto blockchains.",
    body: [
      "Blockchains cannot natively read the outside world. Oracles aggregate data from multiple sources and publish it on-chain so smart contracts can use it, most commonly prices for lending liquidations and derivatives.",
      "Oracle failures or manipulations are a leading cause of DeFi losses: a wrong price can trigger unfair liquidations or let attackers borrow against inflated collateral.",
      "Evaluate an oracle by its data sources, node operator set, update frequency, and the value its feeds secure.",
    ],
    keyTakeaways: ["DeFi depends on reliable external data", "Price manipulation is a major attack vector", "Look at sources, operators and value secured"],
    related: ["lending-protocols", "smart-contracts", "interoperability"],
  },
  {
    slug: "liquid-staking",
    title: "Liquid staking",
    category: "defi",
    level: "intermediate",
    summary: "Staking through a protocol that issues a tradable token representing the staked position.",
    body: [
      "Native staking locks tokens. Liquid-staking protocols stake on the user's behalf and issue a liquid staking token (LST), such as stETH, that accrues rewards and can be used in DeFi.",
      "LSTs add layers of risk: smart-contract risk, node-operator risk, and the risk that the LST trades below its underlying value during stress when withdrawals are queued.",
      "A dominant liquid-staking provider can also concentrate a network's stake, which is a decentralisation concern for the underlying chain.",
    ],
    keyTakeaways: ["Liquidity on top of staking", "LSTs can de-peg under stress", "Market share concentration matters"],
    related: ["proof-of-stake", "restaking", "validator-decentralization"],
  },
  {
    slug: "restaking",
    title: "Restaking",
    category: "defi",
    level: "advanced",
    summary: "Reusing staked assets to secure additional services, in exchange for extra rewards and extra slashing risk.",
    body: [
      "Restaking protocols let stakers opt in to secure other services, data-availability layers, oracles, bridges, with the same collateral. Those services pay rewards and can define slashing conditions.",
      "The appeal is shared security: new services do not need to bootstrap their own validator set. The risk is that the same collateral backs many obligations, so a failure in one service can cascade.",
      "Key questions: are rewards paid from real fees or token emissions? How are slashing conditions defined and adjudicated?",
    ],
    keyTakeaways: ["Shared security for new services", "Stacked slashing risk", "Check whether rewards are real or emissions"],
    related: ["liquid-staking", "proof-of-stake"],
  },
  {
    slug: "mev",
    title: "MEV (maximal extractable value)",
    category: "defi",
    level: "advanced",
    summary: "Value that block producers can capture by including, excluding or reordering transactions.",
    body: [
      "Because block producers choose transaction order, they (or specialised searchers paying them) can profit from arbitrage, liquidations or front-running users' trades.",
      "MEV is a hidden cost for users and a revenue source for validators. Its distribution shapes incentives: if a few builders capture most MEV, block production centralises.",
      "Mitigations include private order flow, batch auctions, encrypted mempools and protocol-level auctions that redirect MEV to the protocol or users.",
    ],
    keyTakeaways: ["Ordering power creates value", "Hidden cost for traders", "Can centralise block production"],
    related: ["gas-fees", "sequencers", "amm"],
  },
  {
    slug: "amm",
    title: "Automated market makers (AMMs)",
    category: "defi",
    level: "beginner",
    summary: "Exchanges where liquidity pools and a pricing formula replace the order book.",
    body: [
      "An AMM holds two (or more) tokens in a pool and quotes prices from a formula, Uniswap's original model keeps the product of reserves constant. Traders swap against the pool; liquidity providers (LPs) earn fees.",
      "LPs face impermanent loss: when prices move, the pool rebalances against them. Fees must exceed this loss for LPing to be profitable.",
      "Concentrated liquidity lets LPs choose price ranges, improving capital efficiency at the cost of active management.",
    ],
    keyTakeaways: ["Pools and formulas replace order books", "LPs earn fees but bear impermanent loss", "Volume and fee tiers drive LP returns"],
    related: ["mev", "protocol-revenue", "tvl"],
  },
  {
    slug: "lending-protocols",
    title: "Lending protocols",
    category: "defi",
    level: "beginner",
    summary: "Pools where users supply assets to earn interest and borrow against over-collateralised positions.",
    body: [
      "Suppliers deposit assets into a pool; borrowers post collateral worth more than their loan. Interest rates adjust algorithmically with utilisation.",
      "If collateral value falls below a threshold, the position is liquidated: third parties repay part of the debt and receive collateral at a discount. Oracle accuracy and market liquidity determine whether liquidations work in a crash.",
      "Revenue comes from the spread between borrow and supply rates (the reserve factor) and liquidation fees.",
    ],
    keyTakeaways: ["Over-collateralised borrowing", "Liquidations protect solvency", "Reserve factor = protocol revenue"],
    related: ["oracles", "stablecoins", "protocol-revenue"],
  },
  {
    slug: "stablecoins",
    title: "Stablecoins",
    category: "defi",
    level: "beginner",
    summary: "Tokens designed to hold a stable value, mostly pegged to the US dollar.",
    body: [
      "Fiat-backed stablecoins (USDT, USDC) hold cash and short-term treasuries off-chain. Crypto-collateralised stablecoins are backed by on-chain collateral with over-collateralisation. Synthetic dollars use hedged positions.",
      "Each design has distinct risks: issuer and banking risk, collateral volatility, or derivatives-market dependence. Regulation increasingly distinguishes between them.",
      "Stablecoin supply is a useful macro indicator of liquidity available on-chain.",
    ],
    keyTakeaways: ["Three main designs", "Each design fails differently", "Supply tracks on-chain liquidity"],
    related: ["synthetic-dollars", "lending-protocols", "rwa-tokenization"],
  },
  {
    slug: "synthetic-dollars",
    title: "Synthetic dollars",
    category: "defi",
    level: "advanced",
    summary: "Dollar-pegged tokens backed by crypto collateral hedged with short derivatives positions.",
    body: [
      "A synthetic dollar can hold spot ETH or BTC and short an equal amount of perpetual futures, so the position's dollar value stays roughly constant (delta-neutral).",
      "Yield comes from staking rewards on collateral and from funding payments, which longs typically pay shorts in bullish markets. When funding turns negative, the yield falls and reserves may be drawn down.",
      "Risks include exchange counterparty and custody risk, liquidity during mass redemptions, and basis dislocations in extreme volatility.",
    ],
    keyTakeaways: ["Delta-neutral hedge keeps value stable", "Yield depends on funding rates", "Exchange and custody exposure"],
    related: ["stablecoins", "perpetual-futures"],
  },
  {
    slug: "perpetual-futures",
    title: "Perpetual futures and funding rates",
    category: "defi",
    level: "intermediate",
    summary: "Futures without expiry, kept close to spot price by periodic funding payments between longs and shorts.",
    body: [
      "Perpetual futures ('perps') let traders take leveraged long or short exposure without an expiry date. To keep the perp price anchored to spot, the side in excess demand pays the other side a funding rate.",
      "Positive funding means longs pay shorts, usually a sign of bullish leverage. Very high funding and open interest can precede liquidation cascades.",
      "Perp DEXs (such as Hyperliquid) and centralised exchanges compete on liquidity, fees and the reliability of their liquidation engines.",
    ],
    keyTakeaways: ["No expiry, funding keeps price anchored", "Funding reveals leverage positioning", "Liquidation cascades amplify moves"],
    related: ["synthetic-dollars", "fear-and-greed"],
  },
  {
    slug: "tvl",
    title: "Total value locked (TVL)",
    category: "research",
    level: "beginner",
    summary: "The value of assets deposited in a protocol's smart contracts.",
    body: [
      "TVL sums the market value of tokens held by a protocol. It is widely used to compare DeFi protocols and chains.",
      "TVL is sensitive to token prices, a protocol's TVL can fall by half without a single withdrawal, and can be inflated by double counting (the same asset deposited across several protocols) or by incentives.",
      "Use TVL alongside fees and revenue: a protocol with high TVL and low fees is not using its capital productively.",
    ],
    keyTakeaways: ["Price-sensitive measure", "Watch for double counting", "Compare with fees generated"],
    related: ["protocol-revenue", "market-cap-vs-fdv"],
  },
  {
    slug: "market-cap-vs-fdv",
    title: "Market cap vs FDV",
    category: "research",
    level: "beginner",
    summary: "Market cap values circulating supply; fully diluted valuation values total or maximum supply.",
    body: [
      "Market capitalisation = price × circulating supply. Fully diluted valuation (FDV) = price × total or maximum supply, i.e. the value if every token that will ever exist were in circulation today.",
      "A large gap between market cap and FDV signals future dilution through unlocks or emissions. Selling pressure from those unlocks can weigh on price if demand does not grow.",
      "Ratios such as market cap / FDV help compare projects at different stages of their supply schedule.",
    ],
    keyTakeaways: ["FDV includes future supply", "Big gap = dilution ahead", "Use MC/FDV ratio to compare"],
    related: ["token-unlocks", "tvl", "halving"],
  },
  {
    slug: "token-unlocks",
    title: "Vesting and token unlocks",
    category: "tokenomics",
    level: "intermediate",
    summary: "Schedules that release tokens allocated to teams, investors and treasuries over time.",
    body: [
      "Insiders usually receive tokens subject to a cliff (no tokens for a period) followed by linear vesting. When tokens unlock, holders can sell them.",
      "Unlocks are public and scheduled, but their market impact depends on who receives tokens, their cost basis and liquidity at the time.",
      "Analysts track upcoming unlocks as a percentage of circulating supply and of daily trading volume.",
    ],
    keyTakeaways: ["Cliff then linear vesting is typical", "Size vs liquidity determines impact", "Check recipient cost basis"],
    related: ["market-cap-vs-fdv", "governance-tokens"],
  },
  {
    slug: "protocol-revenue",
    title: "Fees vs revenue",
    category: "research",
    level: "intermediate",
    summary: "Fees are what users pay; revenue is what the protocol (or its token holders) keeps.",
    body: [
      "A DEX's users may pay large fees, but most go to liquidity providers. A lending protocol's borrowers pay interest, but most goes to suppliers. Revenue is the share retained by the protocol treasury or distributed to token holders.",
      "The right metric depends on the business model: blockchains are judged on fees and burn versus issuance, middleware on paid usage, DeFi on retained revenue versus incentives spent.",
      "Compare revenue to token incentives: a protocol that spends more on emissions than it earns is buying growth.",
    ],
    keyTakeaways: ["Fees ≠ revenue", "Adapt metrics to the model", "Subtract incentives to see real economics"],
    related: ["tvl", "burn-mechanisms", "gas-fees"],
  },
  {
    slug: "governance-tokens",
    title: "Governance tokens",
    category: "tokenomics",
    level: "intermediate",
    summary: "Tokens that grant voting rights over a protocol's parameters, treasury or upgrades.",
    body: [
      "Governance tokens let holders vote on proposals: fee settings, treasury spending, upgrades. Some also grant economic rights; many do not.",
      "Participation is often low and voting power concentrated among insiders, foundations and delegates. A token with voting rights but no economic link to the protocol relies on governance value alone.",
      "Read the governance process: who can propose, quorum thresholds, timelocks and emergency powers.",
    ],
    keyTakeaways: ["Voting ≠ cash flows", "Concentration and low turnout are common", "Timelocks and emergency powers matter"],
    related: ["token-unlocks", "protocol-revenue"],
  },
  {
    slug: "rwa-tokenization",
    title: "Real-world asset tokenisation",
    category: "defi",
    level: "intermediate",
    summary: "Representing claims on off-chain assets, treasuries, credit, equities, as tokens.",
    body: [
      "Tokenised treasuries and funds let on-chain users hold yield-bearing instruments. The token is a claim on an off-chain legal structure: a fund, a note or an SPV.",
      "The key risks are legal and operational: who is the issuer, which jurisdiction applies, who custodies the assets, and what happens if the issuer fails? Transfer restrictions and KYC often apply.",
      "Growth depends on regulation, distribution partnerships and on-chain demand for compliant yield.",
    ],
    keyTakeaways: ["Token = claim on a legal structure", "Issuer, custody and jurisdiction risks", "Often permissioned"],
    related: ["stablecoins", "governance-tokens"],
  },
  {
    slug: "depin",
    title: "DePIN",
    category: "foundations",
    level: "intermediate",
    summary: "Decentralised physical infrastructure networks that reward contributors of hardware or resources with tokens.",
    body: [
      "DePIN projects coordinate real-world resources, GPUs, storage, wireless coverage, sensors, by paying providers in tokens and charging users for the service.",
      "The central question is demand: are users paying for the service, or is supply-side growth driven only by token rewards? Burn-and-mint models tie token demand to paid usage.",
      "Compare unit economics with centralised alternatives on price, reliability and quality of service.",
    ],
    keyTakeaways: ["Tokens bootstrap supply", "Paid demand is the real test", "Benchmark against centralised providers"],
    related: ["burn-mechanisms", "protocol-revenue"],
  },
  {
    slug: "interoperability",
    title: "Bridges and cross-chain messaging",
    category: "technology",
    level: "intermediate",
    summary: "Protocols that move assets and messages between independent blockchains.",
    body: [
      "Bridges lock or burn assets on one chain and mint or release them on another, based on a message that some verifier attests to. Messaging protocols generalise this to arbitrary data.",
      "The verifier is the trust assumption: a multisig, an oracle network, light clients or zero-knowledge proofs. Bridge exploits have been among the largest losses in crypto history.",
      "Assess who verifies messages, whether applications can configure their own security, and how much value depends on the bridge.",
    ],
    keyTakeaways: ["Verifier = trust assumption", "Historically a major exploit vector", "Configurable security shifts risk to apps"],
    related: ["oracles", "data-availability"],
  },
  {
    slug: "validator-decentralization",
    title: "Measuring decentralisation",
    category: "research",
    level: "advanced",
    summary: "How to assess who really controls a network: stake, clients, hosting, governance.",
    body: [
      "Validator count alone is misleading. Look at the Nakamoto coefficient (minimum number of entities that together control enough stake to halt or censor the chain), client diversity, hosting concentration and geographic distribution.",
      "Governance is another axis: who can upgrade the protocol, and can a foundation or company change rules unilaterally?",
      "Decentralisation is a spectrum and a trade-off with performance; the question is whether the level is adequate for the value the network secures.",
    ],
    keyTakeaways: ["Count entities, not nodes", "Client and hosting diversity matter", "Governance is part of decentralisation"],
    related: ["proof-of-stake", "liquid-staking", "governance-tokens"],
  },
  {
    slug: "diversification",
    title: "Diversification and correlation",
    category: "portfolio",
    level: "beginner",
    summary: "Spreading exposure across assets that do not move together, harder than it looks in crypto.",
    body: [
      "Most crypto assets are highly correlated with Bitcoin, especially in sell-offs. Holding ten tokens from the same ecosystem may give much less diversification than it appears.",
      "Hidden dependencies matter too: many DeFi tokens depend on the same chain, oracle or stablecoin. A failure in one dependency can hit several positions at once.",
      "Stablecoin exposure, position limits and sector balance are basic tools to control concentration.",
    ],
    keyTakeaways: ["Correlations rise in crashes", "Shared dependencies concentrate risk", "Position limits are a simple safeguard"],
    related: ["drawdowns", "market-cycles"],
  },
  {
    slug: "drawdowns",
    title: "Drawdowns and volatility",
    category: "risk",
    level: "beginner",
    summary: "How deep and how long losses can be, essential context for position sizing.",
    body: [
      "A drawdown is the decline from a peak to a trough. Crypto assets have historically experienced drawdowns of 70-90% in bear markets, and many tokens never recovered their previous highs.",
      "Recovering from a loss requires a larger gain: a 50% loss needs a 100% gain to break even; an 80% loss needs 400%.",
      "Sizing positions so that a realistic drawdown is tolerable, financially and psychologically, is the foundation of risk management.",
    ],
    keyTakeaways: ["Deep drawdowns are normal in crypto", "Losses compound asymmetrically", "Size positions for the worst case"],
    related: ["diversification", "market-cycles", "fear-and-greed"],
  },
  {
    slug: "market-cycles",
    title: "Market cycles",
    category: "psychology",
    level: "beginner",
    summary: "Crypto markets have moved in pronounced boom-and-bust phases driven by liquidity and sentiment.",
    body: [
      "Past crypto cycles show phases of accumulation, expansion, euphoria and capitulation. They have often coincided with changes in global liquidity, leverage and narratives, and, for Bitcoin, have been loosely associated with halvings.",
      "Cycles are a lens, not a law: their timing and amplitude change, and past patterns may not repeat.",
      "Simple, transparent trend filters (such as price versus the 200-day moving average) help describe the current regime without pretending to forecast it.",
    ],
    keyTakeaways: ["Booms and busts are recurrent", "Patterns can break", "Describe the regime, don't predict it"],
    related: ["fear-and-greed", "drawdowns", "halving"],
  },
  {
    slug: "fear-and-greed",
    title: "Sentiment indicators",
    category: "psychology",
    level: "beginner",
    summary: "Gauges such as the Fear & Greed Index summarise crowd emotion, useful as context, dangerous as signals.",
    body: [
      "The Crypto Fear & Greed Index combines volatility, momentum, social media and other inputs into a 0-100 score. Extreme readings show crowded emotion.",
      "Contrarian logic suggests extreme fear can coincide with better long-term entry points and extreme greed with elevated risk, but sentiment can stay extreme for long periods.",
      "Use sentiment to check your own biases: are you buying because everyone is euphoric, or selling because everyone is afraid?",
    ],
    keyTakeaways: ["Measures crowd emotion", "Extremes can persist", "A tool to check your own bias"],
    related: ["market-cycles", "perpetual-futures"],
  },
  ...INVESTING_CONCEPTS,
];

export const CONCEPT_BY_SLUG = Object.fromEntries(CONCEPTS.map((c) => [c.slug, c])) as Record<string, Concept>;
