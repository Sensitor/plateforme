import type { Project } from "@/lib/research/types";
import { coingecko, defillamaProtocol, fact, hyp, source, view } from "../helpers";

export const chainlink: Project = {
  slug: "chainlink",
  name: "Chainlink",
  ticker: "LINK",
  oneLiner: "Decentralised oracle network supplying market data, cross-chain messaging and off-chain computation to smart contracts.",
  sector: "oracles",
  tags: ["Oracles", "On-chain data", "Interoperability (CCIP)"],
  chains: ["ethereum", "multichain"],
  launched: "2019-05-30",
  maturity: "established",
  riskLevel: "moderate",
  featured: true,
  logo: "/logos/chainlink.png",
  accent: "#375BD2",
  links: {
    website: "https://chain.link",
    whitepaper: "https://research.chain.link/whitepaper-v2.pdf",
    docs: "https://docs.chain.link",
    github: "https://github.com/smartcontractkit",
    explorer: "https://data.chain.link",
  },
  data: { coingeckoId: "chainlink", coinpaprikaId: "link-chainlink", llamaFees: "chainlink" },
  editorial: { status: "draft", lastUpdated: "2026-11-17", author: "Sensitor Research", version: "0.1", headline: "Chainlink: can oracle leadership translate into token value?" },
  dossier: {
    overview: {
      summary:
        "Chainlink is a network of independent node operators that deliver external data, above all asset prices, to smart contracts. Its Data Feeds secure a large share of DeFi lending and derivatives, and the network has expanded into cross-chain messaging (CCIP), low-latency data (Data Streams), proof of reserves and services aimed at banks and asset managers.",
      problem: [
        fact("Smart contracts cannot natively access data outside their blockchain; the original 2017 whitepaper proposed a decentralised network of oracles to provide it.", "whitepaper-v1"),
        view("A single oracle source is a single point of failure: inaccurate prices can trigger wrongful liquidations or exploits."),
      ],
      valueProposition: [
        fact("Data Feeds aggregate prices from multiple independent node operators and data sources into on-chain reference contracts.", "docs-feeds"),
        fact("CCIP (Cross-Chain Interoperability Protocol) provides token transfers and arbitrary messaging between chains, with a separate risk-management network.", "docs-ccip"),
        view("Its main moat is incumbency: years of operation, broad integrations and the value already secured by its feeds."),
      ],
      positioning: [
        view("Market leader in oracle services by value secured; competes with pull-based oracles (Pyth, RedStone) on cost and latency."),
        view("Increasingly positioned as infrastructure for tokenised real-world assets and traditional financial institutions."),
      ],
      team: [
        fact("Co-founded by Sergey Nazarov and Steve Ellis; the 2017 whitepaper was co-authored with Ari Juels (Cornell Tech). Development is led by Chainlink Labs.", "whitepaper-v1"),
      ],
    },
    technology: {
      blocks: [
        { topic: "architecture", claims: [fact("Decentralised oracle networks (DONs): committees of independent nodes that fetch, aggregate and sign data off-chain, then report it on-chain.", "whitepaper-v2")] },
        { topic: "consensus", claims: [fact("Off-Chain Reporting (OCR) lets nodes agree on a report off-chain and submit a single aggregated transaction, reducing gas costs.", "docs-ocr")] },
        { topic: "scalability", claims: [view("Deployed on dozens of chains; push-based feeds update on deviation thresholds or heartbeats, while Data Streams offer pull-based low-latency data.")] },
        { topic: "security", claims: [view("Strong operational track record for major feeds; security depends on node operator independence and data-source quality.")] },
        { topic: "interoperability", claims: [fact("CCIP includes a separate Risk Management Network that monitors and can pause cross-chain activity.", "docs-ccip")] },
        { topic: "decentralization", claims: [view("Node operator sets per feed are curated (permissioned) rather than open; decentralisation is real but bounded.")] },
      ],
      limitations: [
        view("Push-based feeds can be costlier and slower than pull-based alternatives for high-frequency use cases."),
        view("Curated operator sets and Chainlink Labs' central role mean users rely on its governance of the network."),
      ],
    },
    tokenomics: {
      supplyModel: "fixed-cap",
      supplyModelNote: "Fixed total supply of 1 billion LINK, all minted at launch. Non-circulating tokens are held by Chainlink-related wallets and released over time for node-operator incentives and ecosystem funding.",
      maxSupply: 1_000_000_000,
      distribution: [
        { label: "Public token sale (2017)", pct: 35 },
        { label: "Node operators & ecosystem", pct: 35 },
        { label: "Company (Chainlink Labs)", pct: 30 },
      ],
      distributionNote: "Allocation at the 2017 token sale.",
      distributionSources: ["whitepaper-v1"],
      utility: [
        fact("LINK is used to pay node operators and as stake in Chainlink Staking, where stakers back service quality.", "docs-staking"),
        view("Many users pay for oracle services indirectly (sponsored feeds), so direct demand for LINK from usage has historically been limited."),
      ],
      emissions: [fact("No new issuance; circulating supply grows as reserved tokens are released from non-circulating wallets.", "coingecko")],
      vesting: [view("Releases from company and ecosystem wallets occur periodically and are visible on-chain; they are not governed by a published fixed vesting contract.")],
      valueAccrual: [
        fact("In 2025 Chainlink announced the Chainlink Reserve, an on-chain reserve accumulating LINK funded by service revenue converted via Payment Abstraction.", "reserve"),
        hyp("Value accrual depends on paid service revenue (from enterprises and protocols) growing enough to outweigh releases from reserves."),
      ],
      concentration: [view("A significant share of supply is still held in wallets associated with Chainlink Labs and its ecosystem allocation.")],
    },
    adoption: {
      claims: [
        view("Chainlink feeds are integrated by most large lending and derivatives protocols across EVM chains."),
        fact("Chainlink has run public experiments with SWIFT on connecting banks to multiple blockchains.", "swift"),
        view("CCIP adoption grew through token issuers using it for cross-chain token standards, including tokenised funds."),
      ],
      metricsToWatch: ["Total value secured", "Number of active feeds and chains", "CCIP volume", "Paid service revenue / Reserve inflows"],
    },
    financials: {
      model: "middleware",
      relevantMetrics: [
        { label: "Paid service revenue", why: "Whether users pay for oracle services, not just consume subsidised feeds." },
        { label: "Reserve inflows", why: "Mechanism linking revenue to LINK demand." },
        { label: "Node operator economics", why: "Sustainability of the network without token subsidies." },
      ],
      claims: [
        view("Revenue disclosure is limited compared with on-chain protocols; DefiLlama tracks some fees but the full picture of enterprise revenue is not public."),
        view("Historically, node operator rewards have been partly funded by the ecosystem token allocation rather than user fees."),
      ],
    },
    onchain: {
      claims: [fact("Feed updates, operators and deviation thresholds are visible publicly on data.chain.link.", "data-chain-link"), view("Reserve and treasury wallet movements are trackable on-chain and are worth monitoring for supply releases.")],
      dataAvailability: "Total value secured and feed-level metrics are planned for Phase 2.",
    },
    competitors: {
      columns: [
        { name: "Chainlink", slug: "chainlink", technology: "Push feeds + Data Streams, CCIP", adoption: "Broadest DeFi integration", tokenomics: "1B fixed, reserves released", economics: "Limited public revenue data", strengths: "Incumbency, institutional reach", weaknesses: "Token value accrual, curated nodes", positioning: "Full-stack data & interoperability" },
        { name: "Pyth Network", technology: "Pull oracle, first-party publishers", adoption: "Strong on Solana & perps", tokenomics: "PYTH 10B max", economics: "Fees via pull updates", strengths: "Latency, first-party data", weaknesses: "Younger, reliance on Pythnet", positioning: "Low-latency market data" },
        { name: "RedStone", technology: "Modular pull/push oracle", adoption: "Growing in LRT/LST markets", tokenomics: "RED token", economics: "Early stage", strengths: "Flexibility, long-tail assets", weaknesses: "Smaller value secured", positioning: "Modular oracle challenger" },
      ],
    },
    risks: [
      { category: "technology", level: "lower", claims: [view("Mature, well-audited infrastructure; risk from data-source failures and cross-chain complexity in CCIP.")] },
      { category: "economic", level: "elevated", claims: [view("Weak historic link between usage and LINK demand; supply releases from reserves.")] },
      { category: "regulatory", level: "moderate", claims: [view("Exposure to evolving rules for tokenised securities and cross-border messaging with banks.")] },
      { category: "governance", level: "moderate", claims: [view("No on-chain token governance; Chainlink Labs steers development and operator selection.")] },
      { category: "liquidity", level: "lower", claims: [fact("Large-cap, highly liquid token.", "coingecko")] },
      { category: "centralization", level: "moderate", claims: [view("Curated node operators; concentration of tokens in company-associated wallets.")] },
      { category: "competition", level: "moderate", claims: [view("Pull-based oracles compete aggressively on cost and latency, especially outside EVM chains.")] },
    ],
    thesis: {
      bull: [view("Chainlink becomes standard infrastructure for tokenised assets and bank connectivity, and paid revenue flows into the Reserve."), hyp("CCIP becomes the dominant interoperability standard for institutional tokens.")],
      neutral: [view("Chainlink remains the default DeFi oracle, but token value accrual stays weak relative to usage.")],
      bear: [view("Oracle services commoditise; cheaper pull-oracles win new chains and markets."), view("Ongoing releases from reserve wallets outweigh organic demand.")],
      catalysts: [fact("Chainlink Reserve accumulates LINK from service revenue.", "reserve"), hyp("Production deployments with large financial institutions.")],
      assumptions: [hyp("Enterprises are willing to pay for oracle and interoperability services in LINK-convertible revenue."), hyp("DeFi continues to rely on robust, decentralised price feeds.")],
      monitor: ["Reserve balance growth", "Supply released from non-circulating wallets", "Market share vs Pyth/RedStone", "CCIP volume"],
      invalidation: ["Major lending protocols migrate away from Chainlink feeds", "Reserve inflows remain negligible over several quarters"],
    },
    framework: [
      { pillar: "technology", rating: 5, confidence: "high", summary: "Battle-tested oracle infrastructure across many chains.", dataUsed: ["Documentation", "Operational history"], limitations: "CCIP is younger than data feeds.", sources: ["docs-feeds", "docs-ccip"] },
      { pillar: "tokenomics", rating: 2, confidence: "medium", summary: "Fixed supply but large insider/reserve holdings and weak usage link.", dataUsed: ["Token sale allocation", "Circulating supply"], limitations: "Release schedule not contractually fixed.", sources: ["whitepaper-v1", "coingecko"] },
      { pillar: "adoption", rating: 5, confidence: "medium", summary: "Broadest integration in DeFi; growing institutional pilots.", dataUsed: ["Integrations", "Public partnerships"], limitations: "Value-secured figures are self-reported.", sources: ["swift"] },
      { pillar: "financials", rating: 2, confidence: "low", summary: "Limited revenue transparency.", dataUsed: ["DefiLlama fees"], limitations: "Enterprise revenue not public.", sources: ["defillama"] },
      { pillar: "governance", rating: 2, confidence: "medium", summary: "Company-led; no token governance.", dataUsed: ["Documentation"], limitations: "Qualitative.", sources: ["docs-staking"] },
      { pillar: "competition", rating: 4, confidence: "medium", summary: "Clear incumbent facing credible challengers.", dataUsed: ["Market review"], limitations: "Value-secured comparisons are imperfect.", sources: ["docs-feeds"] },
      { pillar: "risk", rating: 3, confidence: "medium", summary: "Economic and centralisation risks dominate.", dataUsed: ["Risk review"], limitations: "Qualitative.", sources: ["whitepaper-v2"] },
    ],
    concepts: ["oracles", "interoperability", "lending-protocols", "market-cap-vs-fdv", "protocol-revenue"],
    sources: [
      source("whitepaper-v1", "ChainLink: A Decentralized Oracle Network (v1)", "Chainlink", "https://research.chain.link/whitepaper-v1.pdf", "primary", "Original design and token allocation.", { published: "2017-09-04" }),
      source("whitepaper-v2", "Chainlink 2.0 whitepaper", "Chainlink Labs", "https://research.chain.link/whitepaper-v2.pdf", "primary", "DONs and long-term architecture.", { published: "2021-04-15" }),
      source("docs-feeds", "Data Feeds", "Chainlink documentation", "https://docs.chain.link/data-feeds", "documentation", "Price feed architecture."),
      source("docs-ocr", "Off-Chain Reporting", "Chainlink documentation", "https://docs.chain.link/architecture-overview/off-chain-reporting", "documentation", "OCR protocol."),
      source("docs-ccip", "Cross-Chain Interoperability Protocol (CCIP)", "Chainlink documentation", "https://docs.chain.link/ccip", "documentation", "CCIP architecture and risk management."),
      source("docs-staking", "Chainlink Staking", "Chainlink", "https://staking.chain.link", "documentation", "Staking design and LINK utility."),
      source("reserve", "Introducing the Chainlink Reserve", "Chainlink Blog", "https://blog.chain.link/chainlink-reserve/", "primary", "Reserve mechanism funded by service revenue.", { published: "2025" }),
      source("swift", "Swift and Chainlink CCIP interoperability experiments", "Chainlink Blog", "https://blog.chain.link/swift-chainlink-ccip/", "primary", "Bank connectivity experiments.", { reliability: "medium", limitations: "Published by an interested party." }),
      source("data-chain-link", "Chainlink data feeds explorer", "Chainlink", "https://data.chain.link", "data", "Feed operators and parameters."),
      coingecko("chainlink", "Chainlink"),
      defillamaProtocol("chainlink", "Chainlink"),
    ],
  },
};
