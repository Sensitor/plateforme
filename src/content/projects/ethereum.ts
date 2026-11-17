import type { Project } from "@/lib/research/types";
import { coingecko, defillamaChain, fact, hyp, source, view } from "../helpers";

export const ethereum: Project = {
  slug: "ethereum",
  name: "Ethereum",
  ticker: "ETH",
  oneLiner: "General-purpose smart-contract platform and settlement layer for a rollup ecosystem.",
  sector: "layer-1",
  tags: ["Smart contracts", "Proof of Stake", "Settlement layer"],
  chains: ["ethereum"],
  launched: "2015-07-30",
  maturity: "established",
  riskLevel: "moderate",
  featured: true,
  logo: "/logos/ethereum.png",
  accent: "#8C8CF5",
  links: {
    website: "https://ethereum.org",
    whitepaper: "https://ethereum.org/en/whitepaper/",
    docs: "https://ethereum.org/en/developers/docs/",
    github: "https://github.com/ethereum",
    explorer: "https://etherscan.io",
    governance: "https://eips.ethereum.org",
  },
  data: { coingeckoId: "ethereum", coinpaprikaId: "eth-ethereum", llamaChain: "Ethereum", llamaFees: "ethereum" },
  editorial: { status: "draft", lastUpdated: "2026-11-17", author: "Sensitor Research", version: "0.1" },
  dossier: {
    overview: {
      summary:
        "Ethereum is a proof-of-stake blockchain that executes arbitrary programs (smart contracts) in a shared virtual machine, the EVM. It hosts the largest DeFi and stablecoin ecosystem and has deliberately evolved into a settlement and data-availability layer for rollups, which execute most user transactions off the base chain.",
      problem: [
        fact("Bitcoin's scripting language intentionally restricts the kind of programs that can run on-chain; Ethereum's whitepaper proposed a Turing-complete alternative for arbitrary applications.", "whitepaper"),
        view("Developers need a neutral, credibly-decentralised execution environment where applications can compose with each other without permission."),
      ],
      valueProposition: [
        fact("Smart contracts deployed on Ethereum can call each other permissionlessly, which lets protocols such as lending markets, exchanges and stablecoins compose.", "docs-sc"),
        fact("ETH is required to pay transaction fees and to stake as a validator, tying the asset to network usage and security.", "docs-pos"),
        view("Ethereum's main differentiation is the combination of high decentralisation, multiple independent client implementations and the deepest pool of on-chain liquidity."),
      ],
      positioning: [
        view("Ethereum positions itself as the base layer of a modular stack: L1 provides security and settlement, rollups provide throughput.", "roadmap"),
        view("Its closest competitors are high-throughput monolithic L1s (e.g. Solana) that keep execution on the base layer."),
      ],
      team: [
        fact("The whitepaper was published by Vitalik Buterin in 2013; the network launched on 30 July 2015 with co-founders including Gavin Wood, author of the Yellow Paper specification.", "whitepaper", "launch"),
        fact("Protocol development is coordinated through the open EIP process and multiple independent client teams; the Ethereum Foundation funds research but does not control the network.", "eips"),
      ],
    },
    technology: {
      blocks: [
        {
          topic: "architecture",
          claims: [
            fact("Account-based state machine executed by the Ethereum Virtual Machine (EVM). Since The Merge, each node runs an execution client and a consensus client.", "docs-nodes"),
          ],
        },
        {
          topic: "consensus",
          claims: [
            fact("Proof of Stake since The Merge (15 September 2022), using the Gasper protocol (LMD-GHOST fork choice + Casper FFG finality). Validators stake ETH and can be slashed for equivocation.", "docs-pos", "merge"),
          ],
        },
        {
          topic: "scalability",
          claims: [
            fact("The Dencun upgrade (March 2024) introduced blob-carrying transactions (EIP-4844), a cheaper data space designed for rollups.", "eip4844"),
            view("Scaling is deliberately delegated to rollups; L1 throughput gains are incremental (gas-limit increases, data-availability sampling)."),
          ],
        },
        {
          topic: "security",
          claims: [
            fact("Multiple production execution clients (e.g. Geth, Nethermind, Besu, Erigon, Reth) and consensus clients (e.g. Prysm, Lighthouse, Teku, Nimbus, Lodestar) reduce the impact of a single-client bug.", "docs-nodes"),
          ],
        },
        {
          topic: "decentralization",
          claims: [
            view("Validator count is high, but stake is concentrated among liquid-staking protocols and centralised exchanges, and block building is concentrated among a few specialised builders (proposer-builder separation via MEV-Boost)."),
          ],
        },
        {
          topic: "innovation",
          claims: [
            fact("EIP-1559 (August 2021) introduced a base fee that is burned, making net issuance depend on network activity.", "eip1559"),
          ],
        },
      ],
      limitations: [
        view("Base-layer throughput remains limited by design; users increasingly transact on rollups with their own trust assumptions."),
        view("The rollup ecosystem fragments liquidity and user experience across many chains until interoperability matures."),
      ],
    },
    tokenomics: {
      supplyModel: "net-variable",
      supplyModelNote:
        "No hard cap. New ETH is issued to validators (issuance falls as a share of total stake rises) and the EIP-1559 base fee is burned. Net supply can grow or shrink depending on activity.",
      maxSupply: null,
      distribution: [
        { label: "2014 public crowdsale", pct: 83.5, note: "~60M ETH sold" },
        { label: "Ethereum Foundation & early contributors", pct: 16.5, note: "~12M ETH" },
      ],
      distributionNote: "Genesis allocation (~72M ETH). Current supply is materially higher due to mining (2015-2022) and staking issuance.",
      distributionSources: ["ether-sale"],
      utility: [
        fact("Gas: every transaction pays fees in ETH.", "docs-gas"),
        fact("Security: validators must stake ETH (32 ETH minimum per validator) and earn issuance plus priority fees.", "docs-pos"),
        view("Collateral: ETH is the dominant collateral asset across DeFi lending and stablecoin protocols."),
      ],
      emissions: [
        fact("Issuance is a function of the total amount staked; it is not a fixed schedule.", "docs-pos"),
      ],
      vesting: [fact("No vesting schedules: the genesis allocation fully circulated years ago.", "ether-sale")],
      valueAccrual: [
        fact("Base fees are burned (EIP-1559); priority fees and MEV go to validators.", "eip1559"),
        view("Since rollups moved data to low-cost blobs, L1 fee burn has been lower and net supply has trended inflationary, value accrual depends on L1 demand recovering or blob fees rising."),
      ],
      concentration: [
        view("Large balances sit in staking contracts, exchange wallets and ETFs; these are pooled custodial balances and do not imply single-owner concentration."),
      ],
    },
    adoption: {
      claims: [
        fact("Ethereum hosts the largest stablecoin supply and DeFi TVL of any chain (see live data).", "defillama"),
        fact("US spot ether ETFs began trading in July 2024, opening a regulated access channel.", "sec-eth-etf"),
        view("Developer mind-share is high thanks to the EVM, which is also used by most rollups and many competing L1s, EVM tooling network effects benefit Ethereum."),
      ],
      metricsToWatch: [
        "Stablecoin supply on Ethereum and its rollups",
        "Blob usage and blob fees",
        "Share of staked ETH by entity",
        "Active developers (Electric Capital report)",
      ],
    },
    financials: {
      model: "smart-contract-platform",
      relevantMetrics: [
        { label: "Fees paid by users", why: "Demand for blockspace; the base fee is burned." },
        { label: "Net issuance", why: "Issuance minus burn determines dilution of holders." },
        { label: "Chain TVL & stablecoins", why: "Economic activity secured by the chain." },
      ],
      claims: [
        view("Fee revenue is cyclical and has migrated partly to rollups; analysing Ethereum like a company with 'revenue' is imperfect because burn accrues to all holders, not a treasury."),
        view("Security spend (issuance to validators) is currently larger than fees burned, meaning holders who do not stake are diluted."),
      ],
    },
    onchain: {
      claims: [
        view("Activity is increasingly measured across L1 plus rollups; L1-only transaction counts understate ecosystem usage."),
        fact("Staking deposits and withdrawals are visible on-chain through the beacon chain deposit contract.", "docs-pos"),
      ],
      dataAvailability:
        "Live on-chain metrics (active addresses, blob usage, staking flows) are planned via Etherscan/Dune integrations in Phase 2.",
    },
    competitors: {
      columns: [
        {
          name: "Ethereum",
          slug: "ethereum",
          technology: "EVM, PoS, rollup-centric scaling",
          adoption: "Largest DeFi & stablecoin base",
          tokenomics: "No cap; issuance vs burn",
          economics: "Fees partly migrated to L2s",
          strengths: "Decentralisation, client diversity, liquidity",
          weaknesses: "Fragmented L2 UX, low L1 throughput",
          positioning: "Settlement layer for rollups",
        },
        {
          name: "Solana",
          slug: "solana",
          technology: "Monolithic, parallel execution",
          adoption: "High retail & trading activity",
          tokenomics: "Disinflationary to 1.5%",
          economics: "High fee volume from trading",
          strengths: "Throughput, single global state",
          weaknesses: "Hardware requirements, outage history",
          positioning: "High-performance single chain",
        },
        {
          name: "Avalanche",
          slug: "avalanche",
          technology: "Snow consensus, sovereign L1s",
          adoption: "Institutional pilots, gaming L1s",
          tokenomics: "720M cap, fees burned",
          economics: "Lower fee activity",
          strengths: "Fast finality, customisable chains",
          weaknesses: "Smaller DeFi ecosystem",
          positioning: "Network of application L1s",
        },
      ],
      note: "Live market cap, FDV and TVL for covered competitors appear above the table.",
    },
    risks: [
      { category: "technology", level: "lower", claims: [view("Mature, multi-client codebase; residual risk from complex upgrades and consensus bugs.")] },
      { category: "economic", level: "moderate", claims: [view("L1 fee demand migrating to rollups weakens the burn mechanism and ETH's monetary narrative.")] },
      { category: "regulatory", level: "moderate", claims: [view("Treatment of staking and ETH-based products varies by jurisdiction and has changed over time.")] },
      { category: "governance", level: "lower", claims: [view("Off-chain social governance via EIPs; credible but slow, and dependent on a few core research groups.")] },
      { category: "liquidity", level: "lower", claims: [fact("Among the most liquid crypto assets across spot, derivatives and ETFs.", "coingecko")] },
      { category: "centralization", level: "moderate", claims: [view("Concentration of stake in liquid-staking protocols and exchanges, and of block building in a few builders.")] },
      { category: "competition", level: "moderate", claims: [view("Monolithic L1s compete for the same users; rollups could capture value without returning it to ETH.")] },
    ],
    thesis: {
      bull: [
        view("Rollup adoption grows enough that blob demand and L1 settlement fees restore positive value accrual to ETH."),
        view("ETH consolidates its role as pristine collateral for DeFi, stablecoins and tokenised assets."),
      ],
      neutral: [view("Ethereum remains the reference smart-contract platform, but value accrues mainly to applications and rollups, limiting ETH outperformance.")],
      bear: [
        view("Users and liquidity consolidate on faster L1s or on rollups that move away from Ethereum settlement."),
        view("Persistent net inflation erodes the scarcity narrative while fees stay low."),
      ],
      catalysts: [
        fact("Further data-availability scaling (PeerDAS) is part of the published roadmap.", "roadmap"),
        hyp("Tokenisation of real-world assets on Ethereum could increase demand for blockspace and ETH as collateral."),
      ],
      assumptions: [
        hyp("Rollups continue to settle to Ethereum rather than migrating to alternative DA or settlement layers."),
        hyp("Decentralisation remains a valued property by institutions and users."),
      ],
      monitor: ["Net supply change (issuance vs burn)", "Blob fee market", "Staking concentration", "L2 interoperability progress"],
      invalidation: [
        "Major rollups migrate settlement away from Ethereum",
        "A sustained decline in Ethereum's share of stablecoin supply and DeFi TVL",
      ],
    },
    framework: [
      { pillar: "technology", rating: 5, confidence: "high", summary: "Battle-tested since 2015, multi-client, successful transition to PoS.", dataUsed: ["Upgrade history", "Client diversity"], limitations: "Complexity of future upgrades.", sources: ["merge", "docs-nodes"] },
      { pillar: "tokenomics", rating: 3, confidence: "medium", summary: "Essential token for gas and security; currently net inflationary.", dataUsed: ["Issuance/burn mechanics"], limitations: "Supply trajectory depends on future demand.", sources: ["eip1559", "docs-pos"] },
      { pillar: "adoption", rating: 5, confidence: "high", summary: "Largest DeFi and stablecoin ecosystem; EVM is the industry standard.", dataUsed: ["DefiLlama TVL", "Stablecoin supply"], limitations: "L1 vs L2 attribution.", sources: ["defillama"] },
      { pillar: "financials", rating: 3, confidence: "medium", summary: "Large fee base but declining L1 fee capture since Dencun.", dataUsed: ["DefiLlama fees"], limitations: "Burn accrues to holders, not a treasury.", sources: ["defillama"] },
      { pillar: "governance", rating: 4, confidence: "medium", summary: "Open EIP process; no on-chain token vote; slow but hard to capture.", dataUsed: ["EIP process"], limitations: "Informal influence of core teams.", sources: ["eips"] },
      { pillar: "competition", rating: 4, confidence: "medium", summary: "Clear leader in smart-contract settlement; pressure from monolithic L1s.", dataUsed: ["Market share of TVL"], limitations: "Value capture vs rollups uncertain.", sources: ["defillama"] },
      { pillar: "risk", rating: 4, confidence: "medium", summary: "Contained technical risk; main risks are economic and centralisation of stake.", dataUsed: ["Risk review"], limitations: "Qualitative assessment.", sources: ["docs-pos"] },
    ],
    concepts: ["smart-contracts", "proof-of-stake", "gas-fees", "burn-mechanisms", "layer-2-rollups", "liquid-staking", "mev"],
    sources: [
      source("whitepaper", "Ethereum Whitepaper", "ethereum.org", "https://ethereum.org/en/whitepaper/", "primary", "Original design goals and rationale.", { published: "2013" }),
      source("launch", "Ethereum history and forks", "ethereum.org", "https://ethereum.org/en/history/", "documentation", "Launch date and upgrade timeline."),
      source("ether-sale", "Launching the Ether Sale", "Ethereum Foundation Blog", "https://blog.ethereum.org/2014/07/22/launching-the-ether-sale", "primary", "Crowdsale terms and genesis allocation.", { published: "2014-07-22" }),
      source("docs-pos", "Proof-of-stake (PoS)", "ethereum.org", "https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/", "documentation", "Staking, validators, issuance and slashing."),
      source("docs-gas", "Gas and fees", "ethereum.org", "https://ethereum.org/en/developers/docs/gas/", "documentation", "Fee mechanics."),
      source("docs-sc", "Introduction to smart contracts", "ethereum.org", "https://ethereum.org/en/developers/docs/smart-contracts/", "documentation", "Smart contract composability."),
      source("docs-nodes", "Nodes and clients", "ethereum.org", "https://ethereum.org/en/developers/docs/nodes-and-clients/", "documentation", "Execution/consensus clients and client diversity."),
      source("merge", "The Merge", "ethereum.org", "https://ethereum.org/en/roadmap/merge/", "documentation", "Transition to proof of stake (Sept 2022)."),
      source("eip1559", "EIP-1559: Fee market change", "Ethereum EIPs", "https://eips.ethereum.org/EIPS/eip-1559", "primary", "Base fee burn mechanism."),
      source("eip4844", "EIP-4844: Shard Blob Transactions", "Ethereum EIPs", "https://eips.ethereum.org/EIPS/eip-4844", "primary", "Blob transactions for rollups (Dencun)."),
      source("roadmap", "Ethereum roadmap", "ethereum.org", "https://ethereum.org/en/roadmap/", "documentation", "Rollup-centric scaling and data-availability roadmap."),
      source("eips", "Ethereum Improvement Proposals", "Ethereum EIPs", "https://eips.ethereum.org", "governance", "Protocol change process."),
      source("sec-eth-etf", "Spot ether ETPs, SEC approval order (19b-4)", "U.S. SEC", "https://www.sec.gov/files/rules/sro/nysearca/2024/34-100224.pdf", "primary", "Approval of spot ether exchange-traded products.", { published: "2024-05-23", limitations: "Approval of listing rules; trading began July 2024 after S-1 effectiveness." }),
      coingecko("ethereum", "Ethereum"),
      defillamaChain("ethereum", "Ethereum"),
    ],
  },
};
