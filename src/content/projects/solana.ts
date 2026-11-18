import type { Project } from "@/lib/research/types";
import { coingecko, defillamaChain, fact, hyp, source, view } from "../helpers";

export const solana: Project = {
  slug: "solana",
  name: "Solana",
  ticker: "SOL",
  oneLiner: "High-throughput monolithic Layer 1 optimised for low-latency, low-cost transactions.",
  sector: "layer-1",
  tags: ["High performance", "Proof of Stake", "Parallel execution"],
  chains: ["solana"],
  launched: "2020-03-16",
  maturity: "established",
  riskLevel: "moderate",
  featured: true,
  logo: "/logos/solana.png",
  accent: "#9C6BFF",
  links: {
    website: "https://solana.com",
    whitepaper: "https://solana.com/solana-whitepaper.pdf",
    docs: "https://solana.com/docs",
    github: "https://github.com/anza-xyz/agave",
    explorer: "https://explorer.solana.com",
    governance: "https://github.com/solana-foundation/solana-improvement-documents",
  },
  data: { coingeckoId: "solana", coinpaprikaId: "sol-solana", llamaChain: "Solana", llamaFees: "solana" },
  editorial: { status: "draft", lastUpdated: "2026-11-17", author: "Sensitor Research", version: "0.1", headline: "Solana: what does a high-performance monolithic design trade away?" },
  dossier: {
    overview: {
      summary:
        "Solana is a proof-of-stake blockchain that keeps execution on a single global state machine and scales by optimising hardware usage: parallel transaction execution, a verifiable clock (Proof of History) and pipelined block propagation. It targets applications that need high throughput and low fees, such as trading, payments and consumer apps.",
      problem: [
        fact("The whitepaper argues that blockchains are slowed by nodes needing to agree on time; Proof of History provides a verifiable passage of time to reduce messaging overhead.", "whitepaper"),
        view("Rollup-based scaling fragments liquidity and state; Solana bets that a single high-performance chain gives better composability and user experience."),
      ],
      valueProposition: [
        fact("Sealevel executes non-overlapping transactions in parallel because transactions declare up front which accounts they read and write.", "docs-core"),
        view("Low fees and fast confirmation make on-chain order books, payments and high-frequency consumer applications practical."),
      ],
      positioning: [
        view("Leading monolithic L1 by activity; competes directly with Ethereum and its rollups for users, liquidity and developers."),
        view("Strong in retail trading, memecoins, DePIN and payments; weaker historically in institutional DeFi depth."),
      ],
      team: [
        fact("Founded by Anatoly Yakovenko (former Qualcomm engineer), who published the Proof of History whitepaper in 2017. Mainnet beta launched in March 2020.", "whitepaper"),
        fact("Development is led by independent client teams (Anza's Agave client, Jump Crypto's Firedancer) with the Solana Foundation supporting the ecosystem.", "agave", "firedancer"),
      ],
    },
    technology: {
      blocks: [
        { topic: "architecture", claims: [fact("Account-based model where programs are stateless and data lives in separate accounts; transactions specify accounts in advance, enabling parallel execution.", "docs-core")] },
        { topic: "consensus", claims: [fact("Delegated proof of stake with Tower BFT, a PBFT-style consensus that uses the Proof of History clock to order events.", "whitepaper")] },
        { topic: "scalability", claims: [view("Scales vertically by requiring powerful validator hardware and high bandwidth; throughput grows with hardware improvements rather than sharding or rollups.")] },
        {
          topic: "security",
          claims: [
            view("The network suffered several outages in 2021-2022 and a ~5-hour halt in February 2024; stability has improved since, but liveness incidents remain the main technical concern."),
            fact("A second, independently-written validator client (Firedancer by Jump Crypto) reduces single-client risk.", "firedancer"),
          ],
        },
        { topic: "decentralization", claims: [view("Validator count is substantial, but hardware costs are high and stake is concentrated among large operators; the Nakamoto coefficient is worth monitoring.")] },
        { topic: "innovation", claims: [fact("Validators approved the Alpenglow consensus redesign (SIMD-0326) in 2025, targeting much faster finality; check activation status on mainnet.", "simd")] },
      ],
      limitations: [
        view("High hardware and bandwidth requirements raise the cost of running a validator."),
        view("Liveness has historically been less robust than more conservative chains."),
      ],
    },
    tokenomics: {
      supplyModel: "disinflationary",
      supplyModelNote:
        "No hard cap. Inflation started at 8% in 2021 and declines by 15% per year towards a long-term rate of 1.5%. Half of each transaction's base fee is burned.",
      maxSupply: null,
      distribution: [
        { label: "Community reserve", pct: 38.89 },
        { label: "Seed sale", pct: 16.23 },
        { label: "Founding sale", pct: 12.92 },
        { label: "Team", pct: 12.79 },
        { label: "Foundation", pct: 10.46 },
        { label: "Validator sale", pct: 5.18 },
        { label: "Strategic sale", pct: 1.88 },
        { label: "Public auction", pct: 1.64 },
      ],
      distributionNote: "Genesis allocation of 500M SOL as published in Solana's documentation. Insider allocations are fully unlocked.",
      distributionSources: ["docs-inflation"],
      issuance: { kind: "disinflation", startDate: "2021-02-10", startSupply: 500_000_000, initialRate: 8, decayPerYear: 0.15, terminalRate: 1.5, years: 15 },
      issuanceNote: "Modelled from the published inflation schedule on the genesis supply. Fee burns, slashing and staking participation make actual supply differ.",
      utility: [
        fact("Pays transaction fees and is staked by validators and delegators to secure the network.", "docs-inflation"),
        view("Widely used as the base trading pair and collateral within Solana DeFi."),
      ],
      emissions: [fact("Disinflationary schedule: initial 8% annual rate, −15% per year, terminal 1.5%.", "docs-inflation")],
      vesting: [fact("Genesis insider allocations have completed their unlocks; new supply now comes mainly from staking inflation.", "docs-inflation")],
      valueAccrual: [
        fact("50% of base fees are burned; the remainder and priority fees go to validators.", "docs-fees"),
        view("Most staking rewards are funded by inflation, so stakers are roughly protected from dilution while non-stakers are diluted."),
      ],
    },
    adoption: {
      claims: [
        fact("Solana hosts a large DeFi ecosystem and stablecoin supply (see live chain TVL).", "defillama"),
        view("Activity is driven heavily by trading, including memecoin speculation, which makes fee revenue cyclical."),
        view("Consumer and payments integrations (e.g. stablecoin payments by large fintechs) are growing but early."),
      ],
      metricsToWatch: ["Real economic value (fees + MEV tips)", "Stablecoin supply on Solana", "Validator count & Nakamoto coefficient", "Network uptime"],
    },
    financials: {
      model: "smart-contract-platform",
      relevantMetrics: [
        { label: "Fees + MEV tips", why: "Total value users pay for blockspace (REV)." },
        { label: "Inflation vs burn", why: "Determines dilution of non-stakers." },
        { label: "Stablecoin supply", why: "Proxy for capital parked on the chain." },
      ],
      claims: [
        view("Fee revenue has been among the highest of all chains during speculative periods, but is concentrated in trading activity and falls sharply in quieter markets."),
        view("A large share of value captured goes to validators via priority fees and MEV tips rather than being burned."),
      ],
    },
    onchain: {
      claims: [
        view("Transaction counts are inflated by validator vote transactions; analysts should focus on non-vote transactions and fee-paying users."),
        view("Bot activity is significant; active address counts overstate human users."),
      ],
      dataAvailability: "Non-vote transaction and fee breakdown metrics are planned via Dune/Solana RPC integrations in Phase 2.",
    },
    competitors: {
      columns: [
        { name: "Solana", slug: "solana", technology: "Monolithic, parallel execution", adoption: "Retail trading, DePIN, payments", tokenomics: "Disinflation to 1.5%", economics: "High, cyclical fee volume", strengths: "Throughput, composability, UX", weaknesses: "Hardware needs, outage history", positioning: "High-performance single chain" },
        { name: "Ethereum", slug: "ethereum", technology: "EVM, rollup-centric", adoption: "Largest DeFi & stablecoin base", tokenomics: "No cap; issuance vs burn", economics: "Fees partly migrated to L2s", strengths: "Decentralisation, liquidity", weaknesses: "Fragmented L2 UX", positioning: "Settlement layer" },
        { name: "Sui", slug: "sui", technology: "Move, object-centric, DAG consensus", adoption: "Growing DeFi and gaming", tokenomics: "10B fixed supply", economics: "Smaller fee base", strengths: "Parallelism, low latency", weaknesses: "Younger ecosystem, unlock overhang", positioning: "Next-gen high-performance L1" },
      ],
    },
    risks: [
      { category: "technology", level: "moderate", claims: [view("History of outages; client diversity improving with Firedancer.")] },
      { category: "economic", level: "moderate", claims: [view("Fee revenue depends on speculative trading cycles.")] },
      { category: "regulatory", level: "moderate", claims: [view("SOL was named in past US enforcement actions against exchanges; the US regulatory stance shifted in 2025 but remains jurisdiction-dependent.")] },
      { category: "governance", level: "moderate", claims: [view("Protocol changes via SIMDs and validator votes; influence of the Foundation and major client teams is significant.")] },
      { category: "liquidity", level: "lower", claims: [fact("Highly liquid across spot and derivatives venues.", "coingecko")] },
      { category: "centralization", level: "elevated", claims: [view("High hardware requirements and stake concentration among large operators and data centres.")] },
      { category: "competition", level: "moderate", claims: [view("Faces Ethereum L2s on one side and newer high-performance L1s (Sui, others) on the other.")] },
    ],
    thesis: {
      bull: [view("Solana becomes the default chain for consumer finance and on-chain trading thanks to UX and speed."), hyp("Alpenglow and Firedancer materially improve finality and resilience, removing the main technical objection.")],
      neutral: [view("Solana remains a top-3 smart-contract platform with cyclical activity tied to retail speculation.")],
      bear: [view("Activity proves mostly speculative and migrates to newer chains when incentives fade."), hyp("A major outage during a stress event damages institutional trust.")],
      catalysts: [fact("Alpenglow consensus upgrade approved by validators.", "simd"), hyp("Growth of stablecoin payments on Solana by mainstream fintechs.")],
      assumptions: [hyp("Hardware costs keep falling faster than demand for throughput."), hyp("Users prioritise speed and cost over maximal decentralisation.")],
      monitor: ["Uptime and incident reports", "Share of non-speculative activity", "Validator concentration", "Firedancer adoption"],
      invalidation: ["Repeated multi-hour outages after Alpenglow/Firedancer", "Sustained decline in fee-paying users across a full cycle"],
    },
    framework: [
      { pillar: "technology", rating: 4, confidence: "medium", summary: "High performance; liveness record improving but imperfect.", dataUsed: ["Outage history", "Client development"], limitations: "Major upgrades still rolling out.", sources: ["firedancer", "simd"] },
      { pillar: "tokenomics", rating: 3, confidence: "high", summary: "Transparent disinflation; insiders unlocked; inflation-funded staking.", dataUsed: ["Inflation schedule", "Genesis allocation"], limitations: "Large early insider allocation.", sources: ["docs-inflation"] },
      { pillar: "adoption", rating: 4, confidence: "medium", summary: "High activity and developer interest; quality of usage mixed.", dataUsed: ["DefiLlama TVL & fees"], limitations: "Bot activity inflates metrics.", sources: ["defillama"] },
      { pillar: "financials", rating: 4, confidence: "medium", summary: "Large fee base in active markets.", dataUsed: ["DefiLlama fees"], limitations: "Highly cyclical.", sources: ["defillama"] },
      { pillar: "governance", rating: 3, confidence: "medium", summary: "SIMD process with validator votes; concentrated influence.", dataUsed: ["SIMD repository"], limitations: "Informal power of core teams.", sources: ["simd"] },
      { pillar: "competition", rating: 4, confidence: "medium", summary: "Leader among monolithic L1s.", dataUsed: ["Relative TVL and fees"], limitations: "Competitive landscape fast-moving.", sources: ["defillama"] },
      { pillar: "risk", rating: 3, confidence: "medium", summary: "Centralisation and liveness are the key risks.", dataUsed: ["Risk review"], limitations: "Qualitative.", sources: ["docs-core"] },
    ],
    concepts: ["proof-of-stake", "gas-fees", "burn-mechanisms", "mev", "validator-decentralization", "market-cap-vs-fdv"],
    sources: [
      source("whitepaper", "Solana: A new architecture for a high performance blockchain", "Anatoly Yakovenko", "https://solana.com/solana-whitepaper.pdf", "primary", "Proof of History and architecture.", { published: "2017" }),
      source("docs-core", "Solana core concepts", "Solana documentation", "https://solana.com/docs/core", "documentation", "Accounts, programs and transactions."),
      source("docs-inflation", "Solana staking & inflation", "Solana documentation", "https://docs.solanalabs.com/implemented-proposals/ed_overview/ed_validation_client_economics/ed_vce_state_validation_protocol_based_rewards", "documentation", "Inflation schedule and genesis allocation.", { limitations: "Legacy Solana Labs documentation site; parameters unchanged unless amended by SIMD." }),
      source("docs-fees", "Transaction fees", "Solana documentation", "https://solana.com/docs/core/fees", "documentation", "Base fee burn and priority fees."),
      source("agave", "Agave validator client", "Anza (GitHub)", "https://github.com/anza-xyz/agave", "primary", "Main validator client."),
      source("firedancer", "Firedancer", "Jump Crypto", "https://github.com/firedancer-io/firedancer", "primary", "Independent validator client."),
      source("simd", "Solana Improvement Documents", "Solana Foundation (GitHub)", "https://github.com/solana-foundation/solana-improvement-documents", "governance", "Protocol change proposals including Alpenglow (SIMD-0326)."),
      coingecko("solana", "Solana"),
      defillamaChain("solana", "Solana"),
    ],
  },
};
