import type { Project } from "@/lib/research/types";
import { coingecko, defillamaChain, fact, hyp, source, view } from "../helpers";

export const bitcoin: Project = {
  slug: "bitcoin",
  name: "Bitcoin",
  ticker: "BTC",
  oneLiner: "The first decentralised digital currency: a fixed-supply, proof-of-work settlement network.",
  sector: "layer-1",
  tags: ["Store of value", "Proof of Work", "Fixed supply"],
  chains: ["bitcoin"],
  launched: "2009-01-03",
  maturity: "established",
  riskLevel: "lower",
  featured: false,
  logo: "/logos/bitcoin.png",
  accent: "#F7931A",
  links: {
    website: "https://bitcoin.org",
    whitepaper: "https://bitcoin.org/bitcoin.pdf",
    docs: "https://developer.bitcoin.org/devguide/",
    github: "https://github.com/bitcoin/bitcoin",
    explorer: "https://mempool.space",
    governance: "https://github.com/bitcoin/bips",
  },
  data: { coingeckoId: "bitcoin", coinpaprikaId: "btc-bitcoin", llamaFees: "bitcoin" },
  editorial: { status: "draft", lastUpdated: "2026-11-17", author: "Sensitor Research", version: "0.1" },
  dossier: {
    overview: {
      summary:
        "Bitcoin is a peer-to-peer electronic cash system secured by proof of work. Its monetary policy, a supply asymptotically capped at 21 million coins, is enforced by every node. Over time its dominant use case has shifted towards a neutral, censorship-resistant store of value and settlement asset.",
      problem: [
        fact("The whitepaper describes a way to make online payments without a trusted financial intermediary by solving the double-spending problem with a peer-to-peer timestamp server based on proof of work.", "whitepaper"),
        view("Fiat money supply is set by discretionary policy; Bitcoin offers a rules-based alternative whose issuance cannot be changed by any single party."),
      ],
      valueProposition: [
        fact("Total issuance is limited by consensus rules: block subsidies halve every 210,000 blocks, converging to just under 21 million BTC.", "supply"),
        view("Bitcoin's main differentiation is credible neutrality: no company, foundation or pre-mine, and the longest operating history of any blockchain."),
      ],
      positioning: [
        view("Positioned as 'digital gold', a macro asset, rather than as an application platform; programmability is deliberately limited."),
        view("Competes for capital with gold and other monetary assets more than with smart-contract platforms."),
      ],
      team: [
        fact("Created by the pseudonymous Satoshi Nakamoto, who published the whitepaper in October 2008 and mined the genesis block on 3 January 2009.", "whitepaper"),
        fact("There is no company or foundation in charge. The reference implementation, Bitcoin Core, is maintained by open-source contributors; protocol changes are proposed through BIPs and require broad node adoption.", "core", "bips"),
      ],
    },
    technology: {
      blocks: [
        { topic: "architecture", claims: [fact("UTXO (unspent transaction output) model with a deliberately limited, non-Turing-complete scripting language.", "devguide")] },
        { topic: "consensus", claims: [fact("Nakamoto consensus: SHA-256 proof of work, ~10-minute target block interval, difficulty retargeted every 2,016 blocks.", "devguide")] },
        {
          topic: "scalability",
          claims: [
            view("Base-layer throughput is intentionally low to keep full nodes cheap to run; scaling is pursued in layers such as the Lightning Network."),
            fact("The Lightning Network proposes off-chain payment channels settled on Bitcoin.", "lightning"),
          ],
        },
        { topic: "security", claims: [view("Longest-running PoW chain; attacking it requires acquiring a majority of hash rate, which is costly given specialised hardware and energy.")] },
        { topic: "decentralization", claims: [view("Full nodes are inexpensive to run, but block production is concentrated among a handful of mining pools; pool operators (not individual miners) choose block templates.")] },
        { topic: "innovation", claims: [fact("The Taproot soft fork (activated November 2021) introduced Schnorr signatures and more private, efficient scripts.", "taproot")] },
      ],
      limitations: [
        view("Limited expressiveness constrains native applications (DeFi, tokens) compared with smart-contract platforms."),
        view("Protocol changes are slow and contentious by design; this is both a security feature and a constraint on adaptation."),
      ],
    },
    tokenomics: {
      supplyModel: "fixed-cap",
      supplyModelNote:
        "New BTC is created only as the block subsidy paid to miners. The subsidy started at 50 BTC per block and halves every 210,000 blocks (~4 years); the fourth halving (April 2024) reduced it to 3.125 BTC.",
      maxSupply: 21_000_000,
      issuance: {
        kind: "halving",
        genesisDate: "2009-01-03",
        initialReward: 50,
        blocksPerHalving: 210_000,
        blockTimeSec: 600,
        maxSupply: 21_000_000,
        untilYear: 2040,
        knownHalvings: ["2012-11-28", "2016-07-09", "2020-05-11", "2024-04-20"],
      },
      issuanceNote: "Past halvings use actual dates; future halvings are projected at a 10-minute average block time. Lost coins are not deducted.",
      distribution: undefined,
      distributionNote: "No pre-mine, ICO or insider allocation: every bitcoin in circulation was issued through mining. Early coins mined by Satoshi Nakamoto (an estimated ~1M BTC) have never moved.",
      distributionSources: ["whitepaper"],
      utility: [
        fact("Native asset of the network, used to pay transaction fees and as the unit of account of the protocol.", "devguide"),
        view("Primary use today is as a store of value, collateral and reserve asset; payments are a secondary use."),
      ],
      emissions: [fact("Approximately 450 BTC per day are issued after the April 2024 halving (3.125 BTC × ~144 blocks).", "supply")],
      vesting: [fact("No vesting or unlock schedules exist.", "whitepaper")],
      valueAccrual: [
        view("No cash flows: value depends on demand for a scarce, neutral monetary asset."),
        hyp("As the subsidy declines, transaction fees must eventually fund most of the security budget; whether fee demand will suffice is an open question."),
      ],
    },
    adoption: {
      claims: [
        fact("US spot bitcoin ETPs were approved by the SEC in January 2024, opening a regulated access channel for institutional and retail investors.", "sec-etf"),
        view("Corporate and sovereign treasury holdings have grown since 2020, making BTC a recognised macro asset, and adding new concentration of holdings in custodians and ETFs."),
        view("Native on-chain activity is modest compared with smart-contract chains; Bitcoin's adoption is better measured by holders, custody flows and liquidity."),
      ],
      metricsToWatch: ["Hash rate and miner revenue", "Fees as a share of miner revenue", "ETF net flows", "Long-term holder supply"],
    },
    financials: {
      model: "settlement-layer",
      relevantMetrics: [
        { label: "Security budget", why: "Subsidy + fees paid to miners, what an attacker must out-spend." },
        { label: "Fee share of miner revenue", why: "Long-term sustainability once subsidies decline." },
        { label: "Hash rate", why: "Proxy for the cost of attacking the network." },
      ],
      claims: [
        view("Bitcoin is not a business and has no revenue in the corporate sense; fees are a measure of blockspace demand, not profit."),
        view("Fee revenue is volatile and spikes with speculative activity (e.g. inscriptions), while the subsidy halves every four years."),
      ],
    },
    onchain: {
      claims: [
        fact("All transactions and balances are public; hash rate and fees can be monitored with open tools.", "mempool"),
        view("A large share of supply is held by long-term holders and custodians; exchange balances and ETF holdings are watched as indicators of available supply."),
      ],
      dataAvailability: "On-chain cohort metrics (long-term holders, realised price) require specialised providers and are planned for Phase 2.",
    },
    competitors: {
      columns: [
        {
          name: "Bitcoin",
          slug: "bitcoin",
          technology: "PoW, UTXO, minimal scripting",
          adoption: "Largest crypto asset, spot ETFs",
          tokenomics: "21M cap, halvings",
          economics: "Fees + subsidy to miners",
          strengths: "Neutrality, track record, liquidity",
          weaknesses: "Limited programmability, security-budget question",
          positioning: "Digital store of value",
        },
        {
          name: "Gold",
          technology: "Physical commodity",
          adoption: "Central banks, jewellery, ETFs",
          tokenomics: "~1-2% annual mine supply growth",
          economics: "No yield",
          strengths: "Millennia of monetary history",
          weaknesses: "Hard to transport and verify",
          positioning: "Traditional store of value",
        },
        {
          name: "Ethereum",
          slug: "ethereum",
          technology: "PoS, smart contracts",
          adoption: "DeFi and stablecoin hub",
          tokenomics: "No cap; issuance vs burn",
          economics: "Fees, partly burned",
          strengths: "Programmability",
          weaknesses: "More complex, evolving monetary policy",
          positioning: "Programmable settlement asset",
        },
      ],
      note: "Gold is included as the reference monetary asset Bitcoin is most often compared with.",
    },
    risks: [
      { category: "technology", level: "lower", claims: [hyp("Long-term: advances in quantum computing could threaten current signature schemes; mitigations would require a coordinated soft fork.")] },
      { category: "economic", level: "moderate", claims: [hyp("Declining subsidy could reduce security if fee demand does not grow.")] },
      { category: "regulatory", level: "moderate", claims: [view("Generally treated as a commodity in major jurisdictions, but mining, custody and self-custody rules vary and can change.")] },
      { category: "governance", level: "lower", claims: [view("Rough-consensus governance makes changes slow; contentious upgrades risk chain splits (as in 2017).")] },
      { category: "liquidity", level: "lower", claims: [fact("Deepest liquidity of any crypto asset across spot, futures, options and ETFs.", "coingecko")] },
      { category: "centralization", level: "moderate", claims: [view("Mining pool concentration, hardware manufacturing concentration and growing custodial holdings (ETFs, exchanges).")] },
      { category: "competition", level: "lower", claims: [view("No crypto asset has displaced Bitcoin's store-of-value position; competition comes mostly from traditional assets.")] },
    ],
    thesis: {
      bull: [
        view("Continued institutional adoption establishes BTC as a standard reserve asset alongside gold."),
        hyp("Monetary debasement concerns increase demand for a rules-based, fixed-supply asset."),
      ],
      neutral: [view("BTC remains a high-volatility macro asset whose price follows global liquidity cycles, without a structural change in its role.")],
      bear: [
        hyp("Fee revenue fails to replace the subsidy, raising security concerns in the 2030s."),
        view("Regulatory restrictions on self-custody or mining reduce its neutrality advantage."),
      ],
      catalysts: [
        fact("Next halving is projected around 2028 (block 1,050,000).", "supply"),
        hyp("Adoption of BTC by additional public treasuries or sovereign entities."),
      ],
      assumptions: [hyp("Demand for a neutral, non-sovereign monetary asset persists."), hyp("No critical cryptographic break without a timely upgrade path.")],
      monitor: ["Hash rate trend", "Fee share of miner revenue", "ETF flows and custodian concentration", "Quantum-resistance research"],
      invalidation: ["Sustained hash-rate collapse or successful 51% attack", "A credible break of Bitcoin's cryptography without a migration path"],
    },
    framework: [
      { pillar: "technology", rating: 5, confidence: "high", summary: "Simplest and longest-running security model in crypto.", dataUsed: ["Protocol history", "Incident record"], limitations: "Low programmability is a design choice, not rated as a flaw here.", sources: ["devguide"] },
      { pillar: "tokenomics", rating: 5, confidence: "high", summary: "Fixed, transparent issuance; no insiders or unlocks.", dataUsed: ["Consensus rules"], limitations: "Security budget long-term.", sources: ["supply"] },
      { pillar: "adoption", rating: 5, confidence: "high", summary: "Most widely held crypto asset, regulated ETFs.", dataUsed: ["ETF approvals", "Market data"], limitations: "Holder counts are estimates.", sources: ["sec-etf", "coingecko"] },
      { pillar: "financials", rating: 3, confidence: "medium", summary: "Fees remain a small share of miner revenue.", dataUsed: ["DefiLlama fees", "Mempool data"], limitations: "Not a business; metric is a proxy.", sources: ["mempool", "defillama"] },
      { pillar: "governance", rating: 4, confidence: "medium", summary: "Credibly neutral, conservative change process.", dataUsed: ["BIP process"], limitations: "Informal influence of developers and large miners.", sources: ["bips"] },
      { pillar: "competition", rating: 5, confidence: "medium", summary: "Unchallenged position as crypto's store of value.", dataUsed: ["Market dominance"], limitations: "Competes with traditional assets.", sources: ["coingecko"] },
      { pillar: "risk", rating: 4, confidence: "medium", summary: "Main risks are long-term (security budget, quantum).", dataUsed: ["Risk review"], limitations: "Qualitative.", sources: ["whitepaper"] },
    ],
    concepts: ["proof-of-work", "halving", "market-cycles", "validator-decentralization", "drawdowns"],
    sources: [
      source("whitepaper", "Bitcoin: A Peer-to-Peer Electronic Cash System", "Satoshi Nakamoto", "https://bitcoin.org/bitcoin.pdf", "primary", "Design, consensus and incentives.", { published: "2008-10-31" }),
      source("devguide", "Bitcoin Developer Guide", "bitcoin.org", "https://developer.bitcoin.org/devguide/", "documentation", "Blockchain structure, difficulty, transactions."),
      source("supply", "Controlled supply", "Bitcoin Wiki", "https://en.bitcoin.it/wiki/Controlled_supply", "documentation", "Subsidy schedule and supply cap.", { reliability: "medium", limitations: "Community wiki; consistent with consensus rules." }),
      source("core", "Bitcoin Core repository", "GitHub", "https://github.com/bitcoin/bitcoin", "primary", "Reference implementation."),
      source("bips", "Bitcoin Improvement Proposals", "GitHub", "https://github.com/bitcoin/bips", "governance", "Change process."),
      source("taproot", "BIP-341: Taproot", "GitHub", "https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki", "primary", "Taproot upgrade specification."),
      source("lightning", "The Bitcoin Lightning Network (paper)", "Poon & Dryja", "https://lightning.network/lightning-network-paper.pdf", "research", "Payment-channel scaling design.", { published: "2016-01-14" }),
      source("sec-etf", "Statement on the Approval of Spot Bitcoin ETPs", "U.S. SEC", "https://www.sec.gov/newsroom/speeches-statements/gensler-statement-spot-bitcoin-011023", "primary", "Approval of spot bitcoin ETPs.", { published: "2024-01-10" }),
      source("mempool", "Hashrate & difficulty", "mempool.space", "https://mempool.space/graphs/mining/hashrate-difficulty", "data", "Hash rate, difficulty and fee data.", { reliability: "medium" }),
      coingecko("bitcoin", "Bitcoin"),
      defillamaChain("bitcoin", "Bitcoin"),
    ],
  },
};
