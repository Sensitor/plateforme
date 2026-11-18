/**
 * In-depth Academy lessons. Each entry extends a concept from concepts.ts
 * with a step-by-step mechanism, a worked example taken from a Sensitor
 * dossier, metrics to watch, common misconceptions, risks, a short quiz and
 * primary sources. No live market figures here: lessons that need them render
 * provider data at request time, with source and timestamp.
 */
import type { ConceptDeep } from "./concepts";

export const CONCEPT_DEEP: Record<string, ConceptDeep> = {
  "proof-of-work": {
    minute:
      "Proof of Work secures a blockchain by making block production expensive. Miners compete to find a hash below a target; the winner adds the next block and earns the block subsidy plus fees. Rewriting history would mean redoing that work faster than everyone else combined.",
    steps: [
      { title: "Collect transactions", text: "A miner assembles pending transactions into a candidate block that points to the hash of the previous block, chaining the history together." },
      {
        title: "Search for a valid hash",
        text: "The miner changes a small field (the nonce) and hashes the block header again and again (double SHA-256 on Bitcoin) until the result falls below the network target. There is no shortcut: it is pure trial and error.",
      },
      { title: "Broadcast and verify", text: "The first valid block is broadcast. Every other node checks the hash and the transactions almost instantly, so producing a block is costly while verifying it is cheap." },
      { title: "Follow the most work", text: "Nodes build on the chain with the most accumulated work. Each new block on top makes the earlier ones harder to reverse, which is why exchanges wait for several confirmations." },
      { title: "Adjust the difficulty", text: "Every 2,016 blocks (about two weeks) Bitcoin recalibrates the target so that blocks keep arriving roughly every ten minutes, whatever the total computing power." },
    ],
    visual: "pow",
    visualCaption: "The mining loop: miners repeat the hash search until one finds a valid block, then everyone moves to the next one.",
    example: {
      projects: ["bitcoin"],
      title: "Bitcoin: security paid by the subsidy, then by fees",
      paragraphs: [
        "Bitcoin is the reference Proof of Work network. Miners are paid the block subsidy, 3.125 BTC per block since the April 2024 halving, plus the fees of the transactions they include. Together they form the security budget: what an attacker would have to out-spend.",
        "Because the subsidy halves every 210,000 blocks, the Sensitor dossier treats one question as open: whether fee demand will grow enough to fund the network's security once new issuance becomes small.",
      ],
    },
    metrics: [
      { label: "Hash rate", read: "Total computing power securing the network. A high, stable hash rate makes an attack more expensive; sharp drops can follow price falls or regional shutdowns." },
      { label: "Difficulty", read: "Follows hash rate at each adjustment. A rising difficulty means more competition for the same rewards." },
      { label: "Fee share of miner revenue", read: "The part of miner income that comes from fees rather than new coins. It shows how ready the network is for future halvings." },
      { label: "Mining pool concentration", read: "Share of recent blocks found by the largest pools. Pools choose which transactions go into blocks, so concentration matters even though miners can switch pools." },
    ],
    misconceptions: [
      { myth: "Miners solve useful mathematical problems.", reality: "The puzzle is deliberately useless: a brute-force search whose only purpose is to make block production costly and easy to verify." },
      { myth: "More energy means more transactions.", reality: "Hash power secures the chain but does not raise capacity. Block size and block interval set how many transactions fit." },
      {
        myth: "Whoever controls 51% of the hash power can steal any coin.",
        reality: "A majority can censor or reorder recent transactions and double-spend its own coins. It cannot sign transactions for keys it does not hold, nor create coins beyond the rules.",
      },
    ],
    risks: [
      "Concentration of hash power in a few pools, manufacturers or regions.",
      "A shrinking security budget if fees do not replace the halving subsidy.",
      "Energy use and the regulatory pressure it attracts on mining.",
    ],
    quiz: [
      {
        question: "What makes a Proof of Work block hard to produce but easy to verify?",
        options: [
          "Finding a hash below the target takes many attempts, checking one takes a single hash",
          "Validators vote on every block before it is accepted",
          "Each block is encrypted with the miner's private key",
          "A central server approves valid blocks",
        ],
        answer: 0,
        explanation: "Producing a block is a lottery of countless hash attempts; anyone can verify the winning hash with one computation.",
      },
      {
        question: "Why does Bitcoin adjust its difficulty every 2,016 blocks?",
        options: ["To raise the block subsidy", "To keep the average block interval close to ten minutes", "To lower transaction fees", "To change the 21 million cap"],
        answer: 1,
        explanation: "The adjustment compensates for changes in total hash power so that blocks keep arriving about every ten minutes.",
      },
      {
        question: "What can an attacker with a majority of the hash power do?",
        options: ["Steal coins from any address", "Create coins beyond the supply cap", "Double-spend its own coins by reorganising recent blocks", "Change other users' private keys"],
        answer: 2,
        explanation: "Majority hash power lets an attacker rewrite recent history, for example to double-spend, but not to break signatures or supply rules.",
      },
    ],
    sources: [
      { title: "Bitcoin: A Peer-to-Peer Electronic Cash System", publisher: "Satoshi Nakamoto", url: "https://bitcoin.org/bitcoin.pdf" },
      { title: "Block chain (developer guide)", publisher: "Bitcoin Project", url: "https://developer.bitcoin.org/devguide/block_chain.html" },
      { title: "Proof-of-work (PoW)", publisher: "ethereum.org", url: "https://ethereum.org/en/developers/docs/consensus-mechanisms/pow/" },
      { title: "Cambridge Bitcoin Electricity Consumption Index", publisher: "Cambridge Centre for Alternative Finance", url: "https://ccaf.io/cbnsi/cbeci" },
    ],
  },

  "proof-of-stake": {
    minute:
      "In Proof of Stake, validators lock the network's token as collateral to propose and confirm blocks. Honest work earns rewards; provable misbehaviour is punished by destroying part of the stake (slashing). Security comes from capital at risk instead of energy spent.",
    steps: [
      { title: "Stake collateral", text: "A validator deposits tokens into the protocol. On Ethereum, activating a validator requires at least 32 ETH." },
      { title: "Get selected", text: "For each slot (12 seconds on Ethereum) the protocol pseudo-randomly picks a block proposer and assigns other validators to vote, or attest, on the head of the chain." },
      { title: "Propose and attest", text: "The proposer builds a block; attestations from other validators add weight behind it so the network converges on one chain." },
      {
        title: "Reach finality",
        text: "When validators holding two thirds of the stake vote for the same checkpoints (epochs of 32 slots), those blocks are finalised. Reverting them would require at least a third of all stake to be slashed.",
      },
      { title: "Reward or penalise", text: "Validators earn new issuance and fees for timely duties, lose small amounts when offline, and are slashed for provable attacks such as signing two conflicting blocks." },
    ],
    visual: "pos",
    visualCaption: "A validator's cycle: stake, get selected, propose or attest, then earn rewards or face penalties.",
    example: {
      projects: ["ethereum", "lido"],
      title: "Ethereum: who controls the stake?",
      paragraphs: [
        "Ethereum moved from Proof of Work to Proof of Stake with the Merge in September 2022. Its security now depends on how much ETH is staked and on who operates it.",
        "The Ethereum and Lido dossiers follow a recurring question: liquid staking protocols and exchanges pool large shares of stake. Even with many independent node operators behind them, that concentration gives a few entities outsized weight in consensus.",
      ],
    },
    metrics: [
      { label: "Share of supply staked", read: "A higher share raises the cost of attacking the chain, but locks up liquidity and concentrates rewards." },
      {
        label: "Stake concentration by entity",
        read: "Share controlled by the largest staking providers. Watch the thresholds: one third of stake can stop finality, two thirds could finalise blocks on its own.",
      },
      { label: "Real yield", read: "Staking reward minus supply growth. If new issuance dilutes everyone at a similar rate, a nominal yield is mostly compensation for dilution." },
      { label: "Client diversity", read: "Share of validators running each software client. A bug in a client used by a large majority could cause mass penalties." },
    ],
    misconceptions: [
      { myth: "Staking yield is free money.", reality: "Rewards are largely new issuance: non-stakers are diluted and stakers roughly keep pace. What matters is the return after supply growth." },
      {
        myth: "In Proof of Stake, the richest decide the rules.",
        reality: "Stake buys influence over block production and finality, not over protocol rules, which node operators and users must still choose to run. Concentration is a real risk that is measured separately.",
      },
      { myth: "Validators are slashed all the time.", reality: "Slashing is rare and targets provable attacks. Ordinary downtime only costs small penalties roughly equal to the rewards missed." },
    ],
    risks: [
      "Concentration of stake in a few liquid staking protocols or exchanges.",
      "Correlated penalties when many validators share one operator, cloud provider or client.",
      "Uncertain legal and tax treatment of staking rewards in several jurisdictions.",
    ],
    quiz: [
      {
        question: "What replaces energy expenditure as the cost of security in Proof of Stake?",
        options: ["Transaction fees paid by users", "Capital locked as collateral that can be slashed", "The number of nodes on the network", "Specialised mining hardware"],
        answer: 1,
        explanation: "Validators put capital at risk: misbehaviour can be punished by destroying part of their stake.",
      },
      {
        question: "On Ethereum, what share of the stake must vote for a checkpoint to finalise it?",
        options: ["One half", "One third", "Two thirds", "All validators"],
        answer: 2,
        explanation: "Finality requires a two-thirds supermajority of staked ETH, which is why one third of stake is the threshold that can halt finality.",
      },
      {
        question: "Why is a high staking yield not automatically a gain?",
        options: [
          "Because part of it only offsets the dilution from new issuance",
          "Because rewards are paid in a different token",
          "Because staking rewards are always taxed at 100%",
          "Because validators must refund rewards after a year",
        ],
        answer: 0,
        explanation: "When rewards come from new issuance, holders who do not stake are diluted; the yield above supply growth is the real gain.",
      },
    ],
    sources: [
      { title: "Proof-of-stake (PoS)", publisher: "ethereum.org", url: "https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/" },
      { title: "Proof-of-stake rewards and penalties", publisher: "ethereum.org", url: "https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/rewards-and-penalties/" },
      { title: "Proof-of-stake attack and defense", publisher: "ethereum.org", url: "https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/attack-and-defense/" },
      { title: "The Merge", publisher: "ethereum.org", url: "https://ethereum.org/en/roadmap/merge/" },
    ],
  },

  "smart-contracts": {
    minute:
      "A smart contract is a program stored on a blockchain. Anyone can call it, every node runs it the same way, and it can hold and move assets by itself. Because contracts can call one another, applications stack like building blocks, which spreads both innovation and risk.",
    steps: [
      { title: "Write and deploy", text: "Developers write code (often in Solidity for the Ethereum Virtual Machine) and deploy the compiled bytecode to an address. Deployment is itself a transaction." },
      { title: "Call a function", text: "Users send transactions that call the contract's functions, paying gas for the computation and storage they use." },
      { title: "Execute deterministically", text: "Every node runs the same code with the same inputs and reaches the same new state, so the result is agreed by the whole network." },
      { title: "Compose", text: "A contract can call other contracts in the same transaction: swap, deposit and borrow can happen together, and if any step fails the whole transaction reverts." },
      { title: "Upgrade, or not", text: "Code at an address cannot be edited, but many protocols use proxy contracts that let an admin key or a governance vote point users to new code." },
    ],
    visual: "contracts",
    visualCaption: "Composability: one user transaction can flow through several contracts, here a lending market reading a price oracle.",
    example: {
      projects: ["aave", "chainlink"],
      title: "Aave: a lending market built from other contracts",
      paragraphs: [
        "Aave is a set of smart contracts that take deposits and issue over-collateralised loans with no company in the middle. To decide when a loan must be liquidated, it reads asset prices from oracle contracts, Chainlink price feeds on most markets.",
        "The Aave dossier lists this as a significant external dependency: a wrong price or a bug in one contract can spread to every protocol built on top of it. The Knowledge Graph maps these links between projects.",
      ],
    },
    metrics: [
      { label: "Audits and bug bounty", read: "Who audited the code, how recently, and how large the bounty is for finding a critical bug." },
      { label: "Upgrade control", read: "Who can change the code (single key, multisig, timelock, DAO vote) and how long users have to exit before a change applies." },
      { label: "Time and value at risk", read: "Code that has held large amounts for years without incident is battle-tested; new code is not, whatever its audits say." },
      { label: "Dependencies", read: "Oracles, bridges and other protocols the contract relies on. Each one adds a way to fail." },
    ],
    misconceptions: [
      { myth: "A smart contract is a legal contract.", reality: "It is a program. It does exactly what its code says, even when that differs from what its authors intended, and its legal status depends on the context." },
      { myth: "Audited means safe.", reality: "Audits reduce risk but have missed critical bugs. They cover one version of the code at one point in time." },
      { myth: "Immutable means nobody can change anything.", reality: "Many protocols are upgradeable through admin keys or governance. That control is a trust assumption worth checking." },
    ],
    risks: [
      "Code bugs that let attackers drain funds.",
      "Compromised or misused admin keys on upgradeable contracts.",
      "Price oracle manipulation and failures in dependencies that spread through composability.",
    ],
    quiz: [
      {
        question: "What does deterministic execution mean for a smart contract?",
        options: [
          "Every node running it with the same inputs gets the same result",
          "The contract runs only on the developer's server",
          "The outcome is random to prevent manipulation",
          "Only validators can call the contract",
        ],
        answer: 0,
        explanation: "Determinism is what lets thousands of nodes agree on a contract's result without trusting each other.",
      },
      {
        question: "What is composability?",
        options: ["Compressing contract code to save gas", "Contracts calling each other so applications can be combined", "Splitting a token into smaller units", "Running the same contract on two chains"],
        answer: 1,
        explanation: "Composability lets protocols reuse each other like building blocks, in the same transaction.",
      },
      {
        question: "A protocol is upgradeable through a 3-of-5 multisig. What does that imply?",
        options: ["The code can never change", "Any user can propose new code", "Any three of five key holders can change the code", "Only a court can change the code"],
        answer: 2,
        explanation: "A 3-of-5 multisig means three signatures out of five keys are enough to approve an upgrade.",
      },
    ],
    sources: [
      { title: "Introduction to smart contracts", publisher: "ethereum.org", url: "https://ethereum.org/en/developers/docs/smart-contracts/" },
      { title: "Smart contract composability", publisher: "ethereum.org", url: "https://ethereum.org/en/developers/docs/smart-contracts/composability/" },
      { title: "Smart contract security", publisher: "ethereum.org", url: "https://ethereum.org/en/developers/docs/smart-contracts/security/" },
      { title: "Ethereum Whitepaper", publisher: "ethereum.org", url: "https://ethereum.org/en/whitepaper/" },
    ],
  },

  "gas-fees": {
    minute:
      "Every operation on a blockchain consumes resources, measured in gas. The fee is gas used × gas price. On Ethereum, since EIP-1559, the price has two parts: a base fee set by the protocol and burned, and an optional tip that goes to the validator.",
    steps: [
      { title: "Measure the work", text: "Each operation has a fixed gas cost. A simple ETH transfer uses 21,000 gas; a swap or a loan uses much more because it runs more code and touches more storage." },
      {
        title: "Set the base fee",
        text: "The protocol sets a base fee per unit of gas for every block. It rises when the previous block was more than half full and falls when it was less, by up to 12.5% per block.",
      },
      { title: "Add a tip", text: "Users add a priority fee (tip) to be included faster. It goes to the validator that proposes the block." },
      { title: "Burn and pay", text: "The base fee multiplied by the gas used is burned, removed from supply. The tip is paid to the validator. Gas reserved but not used is not charged." },
      {
        title: "Rollups pay for data",
        text: "Layer 2 transactions also pay to publish their data on Ethereum. Since EIP-4844 (March 2024) that data mostly goes into cheaper blobs, which have their own fee market.",
      },
    ],
    visual: "fee-calculator",
    visualCaption: "Try it: change the gas used, base fee and tip to see the fee and how much of it is burned. Example values, not live network data.",
    example: {
      projects: ["ethereum"],
      title: "Ethereum: fees, burn and supply",
      paragraphs: [
        "Because the base fee is burned, Ethereum's net supply depends on activity: issuance to validators adds ETH, burned fees remove it. In busy periods the burn can exceed issuance; in quiet periods supply grows.",
        "The dossier flags a structural shift: since rollups moved their data to low-cost blobs, less fee has been burned on mainnet. Whether ETH's value accrual recovers depends on demand for the base layer and for blob space.",
      ],
    },
    metrics: [
      { label: "Base fee (gwei)", read: "The protocol price of block space. It is the most direct indicator of congestion." },
      { label: "Burn versus issuance", read: "Whether net supply grows or shrinks over a period. It links network usage to the token's supply." },
      { label: "Fees by layer", read: "How much users pay on Ethereum compared with rollups. It shows where activity actually happens." },
      { label: "Blob usage and blob fee", read: "Demand from rollups for data space. Sustained full blobs would push blob fees up." },
    ],
    misconceptions: [
      { myth: "Gas is a token.", reality: "Gas is a unit of computational work. Fees are paid in the network's token, ETH on Ethereum." },
      { myth: "A failed transaction costs nothing.", reality: "A transaction that reverts still pays for the gas it consumed up to the point of failure." },
      { myth: "High fees mean the network is broken.", reality: "Fees ration scarce block space. High fees signal demand above capacity, which rollups and blobs are designed to absorb." },
    ],
    risks: [
      "Fee spikes that price ordinary users out during congestion.",
      "Rollup costs that depend on Ethereum data fees.",
      "Value extraction by block builders (MEV) on top of the visible fee.",
    ],
    quiz: [
      {
        question: "Under EIP-1559, what happens to the base fee?",
        options: ["It goes to the validator", "It is burned", "It is sent to the Ethereum Foundation", "It is refunded after the block"],
        answer: 1,
        explanation: "The base fee is destroyed, which is why Ethereum's net supply depends on activity.",
      },
      {
        question: "A transfer uses 21,000 gas with a base fee of 20 gwei and a tip of 2 gwei. What is the total fee?",
        options: ["0.000462 ETH", "0.00042 ETH", "0.0462 ETH", "0.000021 ETH"],
        answer: 0,
        explanation: "21,000 × 22 gwei = 462,000 gwei = 0.000462 ETH, of which 0.00042 ETH is burned and 0.000042 ETH goes to the validator.",
      },
      {
        question: "What did EIP-4844 introduce?",
        options: ["A hard cap on ETH supply", "Blobs, a cheaper data space for rollups", "Fee-free transfers", "A second native token for gas"],
        answer: 1,
        explanation: "Blob-carrying transactions give rollups a dedicated, cheaper place to publish their data.",
      },
    ],
    sources: [
      { title: "Gas and fees", publisher: "ethereum.org", url: "https://ethereum.org/en/developers/docs/gas/" },
      { title: "EIP-1559: Fee market change for ETH 1.0 chain", publisher: "Ethereum Improvement Proposals", url: "https://eips.ethereum.org/EIPS/eip-1559" },
      { title: "EIP-4844: Shard Blob Transactions", publisher: "Ethereum Improvement Proposals", url: "https://eips.ethereum.org/EIPS/eip-4844" },
      { title: "Transactions", publisher: "ethereum.org", url: "https://ethereum.org/en/developers/docs/transactions/" },
    ],
  },

  halving: {
    minute:
      "A halving cuts the number of new coins created per block by half at fixed intervals. On Bitcoin it happens every 210,000 blocks, roughly every four years, so supply growth slows towards a hard cap just under 21 million BTC.",
    steps: [
      { title: "A fixed subsidy", text: "The first Bitcoin blocks, mined in 2009, paid 50 BTC to the miner who found them. This block subsidy is the only way new bitcoin is created." },
      { title: "Halve every 210,000 blocks", text: "The subsidy halved to 25 BTC in 2012, 12.5 BTC in 2016, 6.25 BTC in 2020 and 3.125 BTC in April 2024." },
      { title: "A converging supply", text: "The sum of all subsidies converges to just under 21 million BTC. The last fraction of subsidy is expected to be paid around 2140." },
      { title: "Fees take over", text: "As the subsidy shrinks, transaction fees must pay a growing share of what miners earn, and therefore of the network's security." },
      { title: "Rules, not discretion", text: "Every node enforces the schedule. Changing it would require users to adopt different software, which is why the schedule is considered credible." },
    ],
    visual: "halving",
    visualCaption: "Bitcoin's block subsidy and modelled supply, computed from the protocol rules used in the Sensitor dossier. Past halvings use actual dates; future ones are projected.",
    example: {
      projects: ["bitcoin"],
      title: "Bitcoin: the fourth halving and the next",
      paragraphs: [
        "The April 2024 halving cut the subsidy to 3.125 BTC, about 450 BTC issued per day. The dossier projects the next halving around 2028, at block 1,050,000.",
        "Halvings are known years in advance and the newly issued amount is small compared with the coins already in circulation. Their effect therefore runs through miner economics and market expectations rather than a sudden change in supply.",
      ],
    },
    metrics: [
      { label: "Annual issuance rate", read: "New coins per year divided by circulating supply. It roughly halves at each halving." },
      { label: "Fee share of miner revenue", read: "How much of miners' income no longer depends on new issuance. Key for long-term security." },
      { label: "Hash rate around the halving", read: "Less efficient miners may switch off when revenue per block halves. A lasting drop would lower attack costs." },
      { label: "Price models based on scarcity", read: "Models that project price from supply alone, such as stock-to-flow, ignore demand. Treat them with caution." },
    ],
    misconceptions: [
      {
        myth: "Halvings make the price double.",
        reality: "Some past halvings were followed by rallies, but there have only been four, other forces such as liquidity and adoption weigh heavily, and a known event is partly anticipated by markets.",
      },
      { myth: "Exactly 21 million bitcoin will exist.", reality: "The cap is approached asymptotically and lands slightly below 21 million. Coins lost forever also reduce the usable supply." },
      { myth: "Miners will stop when the subsidy ends.", reality: "By design, fees replace the subsidy. Whether fees will be high enough is the open question." },
    ],
    risks: [
      "A falling security budget if fee demand does not grow.",
      "Miner stress after a halving, which can concentrate hash power in the largest operators.",
      "Investment narratives that overstate the halving's effect on price.",
    ],
    quiz: [
      {
        question: "How often does a Bitcoin halving occur?",
        options: ["Every year", "Every 210,000 blocks", "Every 2,016 blocks", "When miners vote for it"],
        answer: 1,
        explanation: "The subsidy halves every 210,000 blocks, which takes about four years at ten minutes per block.",
      },
      {
        question: "What has the block subsidy been since the April 2024 halving?",
        options: ["6.25 BTC", "50 BTC", "3.125 BTC", "1.5625 BTC"],
        answer: 2,
        explanation: "It went from 6.25 BTC to 3.125 BTC in April 2024; the next halving will bring it to 1.5625 BTC.",
      },
      {
        question: "Why is a halving not a sudden supply shock?",
        options: [
          "Because it is cancelled if the price falls",
          "Because new issuance is small compared with existing supply and the date is known years ahead",
          "Because miners stockpile coins in advance",
          "Because the supply cap is raised at the same time",
        ],
        answer: 1,
        explanation: "The schedule is public and only affects new issuance, a small flow compared with the coins already circulating.",
      },
    ],
    sources: [
      { title: "Bitcoin: A Peer-to-Peer Electronic Cash System", publisher: "Satoshi Nakamoto", url: "https://bitcoin.org/bitcoin.pdf" },
      { title: "Controlled supply", publisher: "Bitcoin Wiki", url: "https://en.bitcoin.it/wiki/Controlled_supply" },
      { title: "Block chain (developer guide)", publisher: "Bitcoin Project", url: "https://developer.bitcoin.org/devguide/block_chain.html" },
    ],
  },

  stablecoins: {
    minute:
      "A stablecoin is a token designed to track the value of a reference asset, usually the US dollar. How it holds that value depends on what backs it: cash and government bonds held by an issuer, crypto collateral locked in smart contracts, or crypto hedged with derivatives.",
    steps: [
      {
        title: "Fiat-backed",
        text: "An issuer holds cash and short-term government bonds, mints tokens one for one for its clients and redeems them on request. Trust sits with the issuer, its banks and its published attestations.",
      },
      {
        title: "Crypto-collateralised",
        text: "Users lock more crypto than the stablecoins they mint (over-collateralisation). If the collateral falls too far, the position is liquidated to keep the system solvent.",
      },
      {
        title: "Synthetic",
        text: "Crypto collateral is paired with an opposite derivatives position, such as a short perpetual future, so that the combined value stays flat. Yield comes from the funding paid by derivatives traders.",
      },
      {
        title: "Holding the peg",
        text: "Arbitrage keeps the price near one dollar: below it, those who can redeem buy cheap tokens and redeem them at par; above it, they mint new tokens and sell them.",
      },
      {
        title: "A cautionary model",
        text: "Designs backed mainly by their own sister token are fragile. TerraUSD, the best-known example, lost its peg and collapsed in May 2022.",
      },
    ],
    visual: "stablecoin-models",
    visualCaption: "Three backing models compared: where the reserves sit, who you trust, and what can break the peg.",
    example: {
      projects: ["ethena", "ondo"],
      title: "Ethena: the moving parts of a synthetic dollar",
      paragraphs: [
        "Ethena's USDe is backed by crypto assets hedged with short perpetual futures, plus stable assets. Holders who stake it receive sUSDe, which earns yield from funding rates and staking rewards. A reserve fund is designed to absorb periods when funding turns negative.",
        "Compare it with the tokenised Treasury products in the Ondo dossier: one earns from derivatives markets, the other from government bonds. Both pay a yield, with very different risks.",
      ],
    },
    metrics: [
      { label: "Reserve composition and attestations", read: "What backs each token, who checks it and how often. Cash and short-term bonds are not the same as long bonds or loans." },
      { label: "Peg deviation", read: "How far and how long the market price strays from one dollar, especially during market stress." },
      { label: "Redemption access", read: "Who can redeem directly with the issuer, with what minimum and how fast. Only redeemers can arbitrage the peg." },
      { label: "Total stablecoin supply", read: "A proxy for the dollars available on-chain. The Markets page tracks it over time." },
    ],
    misconceptions: [
      { myth: "A stablecoin is always worth exactly one dollar.", reality: "It trades on markets and can lose its peg. USDC traded well below one dollar for a few days in March 2023 when part of its reserves sat at a failed US bank." },
      { myth: "A yield-bearing stablecoin works like a bank deposit.", reality: "It carries protocol, counterparty and market risks and has no deposit insurance." },
      { myth: "Decentralised stablecoins have no counterparty.", reality: "Many crypto-collateralised designs hold centralised stablecoins or real-world assets as part of their collateral." },
    ],
    risks: [
      "Issuer, bank or custodian failure for fiat-backed coins.",
      "Collateral crashes and liquidation cascades for crypto-collateralised coins.",
      "Negative funding, exchange and hedging risks for synthetic dollars.",
      "Regulation that restricts issuance or who may hold certain stablecoins.",
    ],
    quiz: [
      {
        question: "What backs a fiat-backed stablecoin?",
        options: ["Its sister governance token", "Cash and short-term government bonds held by an issuer", "Short perpetual futures only", "The value of its blockchain"],
        answer: 1,
        explanation: "Fiat-backed coins rely on reserves held off-chain by an issuer, which is why attestations matter.",
      },
      {
        question: "Why do crypto-collateralised stablecoins require over-collateralisation?",
        options: ["To pay higher yields", "To absorb falls in the collateral's value before the debt is undercovered", "To reduce gas fees", "To avoid audits"],
        answer: 1,
        explanation: "Crypto collateral is volatile; the extra margin and liquidations protect the system when prices fall.",
      },
      {
        question: "What mainly keeps a stablecoin's market price near one dollar?",
        options: ["A fixed price set by the exchange", "Arbitrage through minting and redemption", "Daily votes by token holders", "Central bank intervention"],
        answer: 1,
        explanation: "When the price strays, those able to mint or redeem at par profit by pushing it back.",
      },
    ],
    sources: [
      { title: "Stablecoins", publisher: "ethereum.org", url: "https://ethereum.org/en/stablecoins/" },
      { title: "USDC transparency and reserves", publisher: "Circle", url: "https://www.circle.com/transparency" },
      { title: "How USDe works", publisher: "Ethena", url: "https://docs.ethena.fi/overview/how-usde-works" },
      { title: "Reserve fund", publisher: "Ethena", url: "https://docs.ethena.fi/solution-design/reserve-fund" },
    ],
  },

  amm: {
    minute:
      "An automated market maker replaces the order book with a pool of two tokens and a formula. Traders swap against the pool and the formula sets the price from the ratio of the two reserves. Liquidity providers deposit both tokens and earn the trading fees.",
    steps: [
      { title: "Deposit liquidity", text: "Liquidity providers add two tokens in the ratio of the current price and receive a share of the pool, which entitles them to part of the fees." },
      { title: "Apply the formula", text: "In a constant-product pool, as popularised by Uniswap v2, the product of the two reserves stays constant during a swap, before fees: x × y = k." },
      { title: "Swap", text: "A buyer adds one token and removes the other. The token being bought becomes scarcer in the pool, so its price rises; bigger trades move the price more (price impact)." },
      { title: "Collect fees", text: "Each swap pays a fee, 0.30% in Uniswap v2, which stays in the pool and accrues to liquidity providers." },
      { title: "Arbitrage", text: "When the pool price differs from other markets, arbitrageurs trade until it matches. That is how a pool with no oracle tracks the market price." },
    ],
    visual: "amm",
    visualCaption: "Try it: move the slider to buy from an illustrative pool and see how the price moves along the x × y = k curve. Hypothetical pool, not market data.",
    example: {
      projects: ["uniswap"],
      title: "Uniswap: from constant product to hooks",
      paragraphs: [
        "Uniswap popularised the constant-product pool (v2), then concentrated liquidity, where providers choose a price range (v3), and hooks, custom code that changes how a pool behaves (v4).",
        "The Uniswap dossier focuses on value accrual: historically nearly all fees went to liquidity providers, not to UNI. The UNIfication proposal of November 2025 would turn on protocol fees and use them to burn UNI, the main change to monitor.",
      ],
    },
    metrics: [
      { label: "Volume to liquidity (turnover)", read: "Trading volume divided by pool liquidity. Higher turnover means more fees earned per dollar deposited." },
      { label: "Fee tier", read: "The percentage charged per swap. Stable pairs use low tiers, volatile pairs higher ones." },
      { label: "Fees versus impermanent loss", read: "Providers only gain over holding if fees exceed the loss caused by price divergence between the two tokens." },
      { label: "Depth around the price", read: "How much can be traded before the price moves by a given percentage. It determines execution quality." },
    ],
    misconceptions: [
      { myth: "Providing liquidity is passive income.", reality: "Providers earn fees but lose value relative to simply holding when prices diverge (impermanent loss), and that loss becomes final if they withdraw." },
      { myth: "The protocol sets the pool price.", reality: "The formula derives the price from the reserves; arbitrageurs keep it aligned with other markets." },
      { myth: "A big pool means no slippage.", reality: "Depth reduces price impact, but any trade still moves the price along the curve." },
    ],
    risks: [
      "Impermanent loss for liquidity providers in volatile pairs.",
      "Sandwich attacks and other MEV that worsen traders' prices.",
      "Smart contract bugs, including in custom hooks.",
    ],
    quiz: [
      {
        question: "In a constant-product pool, what stays constant during a swap, before fees?",
        options: ["The price", "The product of the two reserves", "The sum of the two reserves", "The number of liquidity providers"],
        answer: 1,
        explanation: "x × y = k: when one reserve goes up, the other must go down so that their product is unchanged.",
      },
      {
        question: "Why does a large trade get a worse average price than a small one?",
        options: ["Large traders pay a penalty fee", "Each additional unit bought moves the price further along the curve", "The pool closes after large trades", "Arbitrageurs front-run every trade"],
        answer: 1,
        explanation: "The more of a token you remove, the scarcer it becomes in the pool, so each extra unit costs more.",
      },
      {
        question: "What is impermanent loss?",
        options: [
          "A fee charged when withdrawing",
          "The underperformance of a liquidity position versus holding when prices diverge",
          "A temporary pause in trading",
          "Tokens lost in a hack",
        ],
        answer: 1,
        explanation: "The pool automatically sells the rising token and buys the falling one, so providers end with less value than if they had just held.",
      },
    ],
    sources: [
      { title: "Uniswap v2 Core (whitepaper)", publisher: "Uniswap", url: "https://app.uniswap.org/whitepaper.pdf" },
      { title: "How Uniswap works", publisher: "Uniswap Docs", url: "https://docs.uniswap.org/contracts/v2/concepts/protocol-overview/how-uniswap-works" },
      { title: "Understanding returns", publisher: "Uniswap Docs", url: "https://docs.uniswap.org/contracts/v2/concepts/advanced-topics/understanding-returns" },
      { title: "Uniswap v3 Core (whitepaper)", publisher: "Uniswap", url: "https://app.uniswap.org/whitepaper-v3.pdf" },
    ],
  },

  "layer-2-rollups": {
    minute:
      "A rollup executes transactions away from the main chain, then publishes them in compressed form on Ethereum with a way to prove they were processed correctly. Users get lower fees while inheriting much of Ethereum's security, as long as the rollup's own trust assumptions hold.",
    steps: [
      { title: "Execute off-chain", text: "A sequencer orders users' transactions and executes them on the rollup, giving near-instant soft confirmations." },
      { title: "Publish the data", text: "Batches of transaction data are posted to Ethereum, mostly in blobs since EIP-4844, so that anyone can reconstruct the rollup's state without trusting the operator." },
      {
        title: "Prove correctness",
        text: "Optimistic rollups assume batches are valid unless someone submits a fraud proof during a challenge window, about seven days for withdrawals. ZK rollups attach a validity proof to each batch.",
      },
      { title: "Settle withdrawals", text: "Funds return to Ethereum through the rollup's bridge contract once a batch is final, after the challenge window or once the proof is verified." },
      { title: "Keep an escape hatch", text: "Mature rollups let users force their transactions or exit through Ethereum if the sequencer censors them or goes offline." },
    ],
    visual: "rollup",
    visualCaption: "How a rollup inherits Ethereum's security: transactions run on the rollup, data and proofs settle on Ethereum.",
    example: {
      projects: ["arbitrum", "optimism"],
      title: "Arbitrum: an optimistic rollup and its trust assumptions",
      paragraphs: [
        "Arbitrum One posts its transaction batches to Ethereum and secures them with fraud proofs. Its BoLD dispute protocol lets anyone take part in validation rather than an allow-listed set.",
        "Like most rollups it relies on a single sequencer, and a 12-member Security Council can perform emergency upgrades. These are exactly the trust assumptions that L2BEAT's stages measure, and the Arbitrum dossier tracks them.",
      ],
    },
    metrics: [
      { label: "Stage (L2BEAT)", read: "From 0 to 2: how much users still depend on the operators. Stage 0 means training wheels; Stage 2 means proofs and code rule, with only narrow emergency powers." },
      { label: "Proof system", read: "Whether fraud or validity proofs are live, and whether anyone can submit them or only an allow-listed set." },
      { label: "Sequencer and forced inclusion", read: "Who orders transactions and whether users can bypass the sequencer through Ethereum." },
      { label: "Exit window", read: "How long users have to withdraw before an upgrade takes effect. Shorter than the withdrawal delay means users cannot escape an unwanted upgrade." },
    ],
    misconceptions: [
      { myth: "All layer 2s are equally secure.", reality: "Security depends on proofs, upgrade keys and where the data is published. L2BEAT tracks these differences rollup by rollup." },
      { myth: "Withdrawing from an optimistic rollup is instant.", reality: "Native withdrawals wait for the challenge window, about a week. Fast bridges pay liquidity providers to advance the funds and add their own risks." },
      { myth: "The rollup's token secures the rollup.", reality: "Security comes from Ethereum and the proof system. Many rollup tokens are governance tokens with no role in validating transactions." },
    ],
    risks: [
      "A centralised sequencer that can censor or go offline.",
      "Upgrade keys or councils able to change the contracts that hold users' funds.",
      "Bridge risk and liquidity fragmentation across many rollups.",
    ],
    quiz: [
      {
        question: "What does an optimistic rollup rely on to catch invalid batches?",
        options: ["A validity proof attached to every batch", "Fraud proofs submitted during a challenge window", "A vote of token holders", "The sequencer's reputation"],
        answer: 1,
        explanation: "Optimistic rollups assume validity and let anyone challenge a wrong batch before it becomes final.",
      },
      {
        question: "Why must a rollup publish its transaction data on Ethereum?",
        options: ["To pay higher fees to validators", "So anyone can reconstruct the state, verify it and exit without the operator", "Because Ethereum stores all rollup tokens", "To make transactions private"],
        answer: 1,
        explanation: "Published data is what lets users and challengers act independently of the rollup operator.",
      },
      {
        question: "What does a Stage 0 rating on L2BEAT indicate?",
        options: ["The rollup is fully trustless", "The rollup has no users yet", "Users still depend heavily on the operators", "The rollup has been shut down"],
        answer: 2,
        explanation: "Stage 0 rollups still have training wheels: operators can, for example, upgrade contracts without a meaningful exit window.",
      },
    ],
    sources: [
      { title: "Layer 2", publisher: "ethereum.org", url: "https://ethereum.org/en/layer-2/" },
      { title: "Optimistic rollups", publisher: "ethereum.org", url: "https://ethereum.org/en/developers/docs/scaling/optimistic-rollups/" },
      { title: "Zero-knowledge rollups", publisher: "ethereum.org", url: "https://ethereum.org/en/developers/docs/scaling/zk-rollups/" },
      { title: "Stages framework", publisher: "L2BEAT", url: "https://l2beat.com/stages" },
    ],
  },

  "market-cap-vs-fdv": {
    minute:
      "Market cap values the tokens already circulating: price × circulating supply. Fully diluted valuation (FDV) values the full eventual supply at today's price: price × maximum supply, or total supply depending on the data provider. The gap shows how much future supply the market has yet to absorb.",
    steps: [
      { title: "Circulating supply", text: "Tokens that can trade freely today. Locked team, investor and treasury allocations are excluded." },
      { title: "Market capitalisation", text: "Price × circulating supply. It is what the tradable part of the network is worth at the current price." },
      { title: "Fully diluted valuation", text: "Price × maximum supply, or price × total supply created so far, depending on the data provider. CoinGecko, the provider used on Sensitor, reports the total-supply version, so check the definition before comparing figures." },
      { title: "Float ratio", text: "Market cap divided by FDV. A low ratio means most of the eventual supply is still locked or not yet issued." },
      { title: "Read it with the calendar", text: "The ratio only matters through the unlock schedule: how many tokens arrive, when, and in whose hands." },
    ],
    visual: "mcap-fdv",
    visualCaption: "Live float ratio across Sensitor coverage: circulating market cap as a share of fully diluted valuation.",
    example: {
      projects: ["bitcoin", "arbitrum"],
      title: "Across Sensitor coverage",
      paragraphs: [
        "Mature assets whose supply is mostly issued sit close to a 100% float ratio. Recent tokens with large allocations still locked for teams, investors or treasuries sit much lower, which means more supply is scheduled to enter the market.",
        "Because the provider uses total supply, a capped asset still being mined, such as Bitcoin, shows an FDV equal to its market cap, and uncapped assets such as ETH or SOL have an FDV that moves with issuance and burns. The table is computed live from provider data.",
      ],
      live: "mcap-fdv",
    },
    metrics: [
      { label: "Float ratio (market cap / FDV)", read: "The share of eventual supply already circulating. The lower it is, the larger the future dilution." },
      { label: "Upcoming unlocks versus volume", read: "Size of the next unlocks compared with average daily trading volume. It indicates how easily new supply can be absorbed." },
      { label: "Who receives the unlocks", read: "Team and early investors have different incentives from ecosystem grants or community programmes." },
      { label: "Demand growth", read: "Whether usage, fees or staking grow fast enough to absorb the new tokens." },
    ],
    misconceptions: [
      { myth: "A low price per token means the token is cheap.", reality: "The price of one token means nothing without the supply. Compare market caps and FDVs, not unit prices." },
      { myth: "FDV is the real valuation.", reality: "FDV assumes every future token is worth today's price. Actual dilution depends on timing and on demand." },
      { myth: "A low float is always bearish.", reality: "It signals future supply, but the outcome depends on who receives it and whether demand grows. It is a risk factor, not a verdict." },
    ],
    risks: [
      "Dilution overhang from large locked allocations.",
      "Inconsistent circulating supply figures between data providers.",
      "Treasury or ecosystem tokens that are counted as circulating but rarely sold, or the opposite.",
    ],
    quiz: [
      {
        question: "A token trades at $2 with 500 million circulating and a 2 billion maximum supply. What are its market cap and FDV?",
        options: ["$1 billion and $4 billion", "$4 billion and $1 billion", "$500 million and $2 billion", "$1 billion and $2 billion"],
        answer: 0,
        explanation: "Market cap = 2 × 500M = $1B. FDV = 2 × 2B = $4B. The float ratio is 25%.",
      },
      {
        question: "What does a float ratio of 25% mean?",
        options: ["25% of holders are whales", "75% of the eventual supply is not yet circulating", "The token is 25% undervalued", "25% of tokens have been burned"],
        answer: 1,
        explanation: "Only a quarter of the supply counted in FDV is tradable today; the rest is locked or not yet issued.",
      },
      {
        question: "One token costs $0.10 and another $100. Which is cheaper?",
        options: ["The $0.10 token", "The $100 token", "You cannot tell without knowing their supplies", "They are equally priced"],
        answer: 2,
        explanation: "Valuation is price × supply. A $0.10 token with a huge supply can be worth far more than a $100 token.",
      },
    ],
    sources: [
      { title: "Coins List with Market Data (field definitions)", publisher: "CoinGecko API", url: "https://docs.coingecko.com/reference/coins-markets" },
      { title: "Coin Data by ID", publisher: "CoinGecko API", url: "https://docs.coingecko.com/reference/coins-id" },
      { title: "ARB token distribution", publisher: "Arbitrum Foundation", url: "https://docs.arbitrum.foundation/airdrop-eligibility-distribution" },
    ],
  },

  "token-unlocks": {
    minute:
      "Most tokens launch with large allocations locked for the team, investors and treasury. Vesting schedules release them over time, often after a cliff. Unlocks add supply to the market, so they are a key input when judging dilution.",
    steps: [
      { title: "Allocation", text: "At launch, supply is split between the community, the ecosystem fund, the team, investors and the treasury." },
      { title: "Cliff", text: "Locked allocations release nothing during an initial period, often twelve months, so insiders cannot sell right after launch." },
      { title: "Linear vesting", text: "After the cliff, tokens unlock gradually, monthly or block by block, until the allocation is fully vested." },
      { title: "Unlock event", text: "Newly vested tokens become transferable. Recipients may hold, stake, use them in governance or sell them." },
      { title: "Absorption", text: "The market impact depends on the size of the unlock relative to trading volume, and on the recipients' incentives." },
    ],
    visual: "vesting",
    visualCaption: "An illustrative schedule: a four-year vesting with a one-year cliff. Hypothetical numbers, not a real token.",
    example: {
      projects: ["arbitrum", "ethena"],
      title: "Supply schedules in Sensitor dossiers",
      paragraphs: [
        "Arbitrum's team and investor allocations unlocked nothing for a year after the March 2023 launch. Releases started in March 2024 and continue monthly until March 2027. Several other covered projects follow similar patterns.",
        "The calendar below lists the schedules documented in the dossiers. Exact amounts per event require a licensed data feed, planned for a later phase.",
      ],
      live: "key-dates",
    },
    metrics: [
      { label: "Unlock size versus daily volume", read: "An unlock worth a large multiple of daily trading volume is harder for the market to absorb." },
      { label: "Recipient type", read: "Early investors with a low entry price have different incentives from an ecosystem fund paying out grants over years." },
      { label: "Cumulative share unlocked", read: "How much of the eventual supply is already liquid. It is closely related to the float ratio." },
      { label: "Supply growth over the next twelve months", read: "Unlocks plus issuance, minus burns. It frames how much demand must grow just to keep the price stable." },
    ],
    misconceptions: [
      { myth: "Unlocks always make the price fall.", reality: "Schedules are public and partly anticipated. The impact varies with size, recipients and demand at the time." },
      { myth: "Unlocked tokens are sold.", reality: "Unlocked tokens become transferable. Many are held, staked or used in governance; on-chain flows to exchanges are a better signal of selling." },
      { myth: "Circulating supply only grows through unlocks.", reality: "Issuance to validators, burns and buybacks also change supply." },
    ],
    risks: [
      "A supply overhang that weighs on the market for years.",
      "Insiders selling into community demand.",
      "Opaque schedules, or schedules changed later by governance.",
    ],
    quiz: [
      {
        question: "What is a cliff in a vesting schedule?",
        options: ["The date all tokens unlock at once", "An initial period during which nothing unlocks", "A sudden price drop after an unlock", "The maximum supply of a token"],
        answer: 1,
        explanation: "During the cliff no tokens vest; vesting usually starts, or catches up, when it ends.",
      },
      {
        question: "A team allocation of 200 million tokens vests linearly over 36 months after a one-year cliff, with nothing released at the cliff. How much unlocks each month?",
        options: ["About 5.56 million", "About 16.7 million", "200 million", "About 2.78 million"],
        answer: 0,
        explanation: "200 million divided by 36 months is about 5.56 million tokens per month.",
      },
      {
        question: "What is the most useful first check on an upcoming unlock?",
        options: ["The token's all-time high", "Its size relative to daily trading volume, and who receives it", "The number of social media followers", "The colour of the project's logo"],
        answer: 1,
        explanation: "Size relative to liquidity and the recipients' incentives say most about how the market may absorb it.",
      },
    ],
    sources: [
      { title: "ARB token distribution", publisher: "Arbitrum Foundation", url: "https://docs.arbitrum.foundation/airdrop-eligibility-distribution" },
      { title: "OP token overview", publisher: "Optimism Collective", url: "https://community.optimism.io/op-token/op-token-overview" },
      { title: "ENA tokenomics", publisher: "Ethena", url: "https://docs.ethena.fi/overview/ena/tokenomics" },
    ],
  },

  oracles: {
    minute:
      "Blockchains cannot see the outside world. An oracle fetches data such as asset prices from external sources, agrees on a value and publishes it on-chain so smart contracts can use it. Most of DeFi, from lending to derivatives, depends on those prices being right.",
    steps: [
      { title: "Collect data", text: "Independent node operators fetch the same data, for example the ETH/USD price, from many sources such as exchanges and market data aggregators." },
      { title: "Agree off-chain", text: "Nodes combine their observations, typically by taking the median so that a few bad values cannot move the result, and sign a single report. Chainlink's Off-Chain Reporting works this way." },
      {
        title: "Publish on-chain",
        text: "The report is written to a feed contract. Push-based feeds update when the price moves by more than a deviation threshold or when a heartbeat interval has passed; pull-based oracles let an application fetch a signed price at the moment it needs it.",
      },
      { title: "Consume", text: "Lending markets, perpetual exchanges and stablecoins read the feed to value collateral, trigger liquidations or settle trades." },
      { title: "Check freshness", text: "Well-designed protocols check how recent the data is and pause or switch to a fallback when a feed stops updating." },
    ],
    visual: "flow",
    flow: {
      nodes: [
        { title: "Data sources", text: "Exchanges and aggregators publish prices." },
        { title: "Node operators", text: "Each node fetches and signs its observation." },
        { title: "Aggregation", text: "The median of observations, in one signed report." },
        { title: "On-chain feed", text: "Updated on a price deviation or a heartbeat." },
        { title: "Applications", text: "Lending, perps and stablecoins read the price." },
      ],
      outcomes: { positive: "Many independent sources and operators: one wrong value cannot move the price.", negative: "One source or a thin market: an attacker can move the input and drain a protocol." },
    },
    visualCaption: "How a price reaches a smart contract, and what makes it robust.",
    example: {
      projects: ["chainlink", "aave"],
      title: "Chainlink, and the protocols that depend on it",
      paragraphs: [
        "Chainlink Data Feeds aggregate prices from multiple independent node operators and data sources into on-chain reference contracts. The node set of each feed is curated rather than open, so its decentralisation is real but bounded, as the dossier notes.",
        "Aave relies on Chainlink price feeds for most of its markets. A wrong price would hit Aave's liquidations directly, which is why the Aave dossier lists it as a significant external dependency and the Knowledge Graph maps the link.",
      ],
    },
    metrics: [
      { label: "Value secured", read: "The value of the protocols relying on a feed. The more value depends on it, the larger the reward for attacking it." },
      { label: "Operators and sources", read: "How many independent node operators and data sources contribute, and who they are." },
      { label: "Update rules", read: "The deviation threshold and heartbeat. Stale data in a fast-moving market is how many liquidations go wrong." },
      { label: "Track record", read: "Past incidents and mispricings, and how quickly they were detected and handled." },
    ],
    misconceptions: [
      { myth: "An oracle is a price taken from one exchange.", reality: "Robust oracles aggregate many sources and operators. Single-source price feeds are precisely the ones attackers target." },
      { myth: "A decentralised oracle makes the protocol safe.", reality: "A correct price for an illiquid asset can still be manipulated at the source. Protocols also need borrowing caps and liquid collateral." },
      { myth: "Oracles only provide prices.", reality: "They also deliver verifiable randomness, proof of reserves, cross-chain messages and off-chain computation." },
    ],
    risks: [
      "Manipulation of the underlying market, for example with a flash loan on a thin pool.",
      "Stale prices during extreme volatility or network congestion.",
      "Many protocols depending on the same oracle network, which concentrates risk.",
    ],
    quiz: [
      {
        question: "Why do blockchains need oracles?",
        options: ["To make transactions faster", "Because smart contracts cannot read data from outside their own chain", "To store private keys safely", "To mine new blocks"],
        answer: 1,
        explanation: "A blockchain only knows its own state; prices and other external facts must be brought on-chain by an oracle.",
      },
      {
        question: "Why do oracle networks often use the median of many observations?",
        options: ["It is cheaper to compute than an average", "So that a few wrong or manipulated values cannot move the result", "Because exchanges require it", "To hide the data sources"],
        answer: 1,
        explanation: "With a median, an attacker would need to corrupt most observations, not just one, to shift the reported price.",
      },
      {
        question: "A push-based feed updates on deviation or heartbeat. What does that mean?",
        options: [
          "It updates only when users vote",
          "It publishes a new value when the price moves by more than a set percentage, or when a maximum time has passed",
          "It updates once a week",
          "It updates every block whatever happens",
        ],
        answer: 1,
        explanation: "Deviation thresholds catch fast moves; the heartbeat guarantees a fresh value even in quiet markets.",
      },
    ],
    sources: [
      { title: "Oracles", publisher: "ethereum.org", url: "https://ethereum.org/en/developers/docs/oracles/" },
      { title: "Data Feeds", publisher: "Chainlink Docs", url: "https://docs.chain.link/data-feeds" },
      { title: "Off-Chain Reporting", publisher: "Chainlink Docs", url: "https://docs.chain.link/architecture-overview/off-chain-reporting" },
      { title: "Price Feeds (pull oracle model)", publisher: "Pyth Network Docs", url: "https://docs.pyth.network/price-feeds" },
    ],
  },

  "lending-protocols": {
    minute:
      "A lending protocol pools deposits from suppliers and lends them to borrowers who post more collateral than they borrow. Interest rates move with demand, and if a borrower's collateral falls too far in value, anyone can liquidate the position to keep the pool solvent.",
    steps: [
      { title: "Supply", text: "Suppliers deposit assets and receive a token that represents their claim plus accrued interest (aTokens on Aave)." },
      { title: "Borrow against collateral", text: "Borrowers deposit collateral and can borrow up to a loan-to-value limit set for each asset." },
      { title: "Rates follow utilisation", text: "The larger the share of a pool that is borrowed, the higher the borrow and supply rates. Higher rates attract deposits and discourage further borrowing." },
      { title: "Health factor", text: "Each position has a health factor: collateral value weighted by its liquidation threshold, divided by the debt. Below 1, the position can be liquidated." },
      { title: "Liquidation", text: "A liquidator repays part of the debt and receives collateral at a discount, the liquidation bonus, which brings the position back to health." },
    ],
    visual: "health-factor",
    visualCaption: "Try it: move the collateral price down and watch the health factor approach the liquidation line. Example parameters.",
    example: {
      projects: ["aave"],
      title: "Aave: the reference money market",
      paragraphs: [
        "Aave pools liquidity and lets borrowers draw from it against collateral. Loan-to-value ratios, liquidation thresholds and caps are set per asset, curated by specialised risk service providers. Version 3 added an efficiency mode for correlated assets and an isolation mode for riskier ones.",
        "The dossier names the main risk vectors: oracle failures, collateral that becomes illiquid during a crash, and bad debt when liquidations cannot keep up. Over-collateralisation limits capital efficiency; it is the price of lending without credit checks.",
      ],
    },
    metrics: [
      { label: "Utilisation", read: "The share of deposits that is borrowed. Near 100%, suppliers may not be able to withdraw until loans are repaid." },
      { label: "Protocol revenue (reserve factor)", read: "The share of interest the protocol keeps. It is its main business line, alongside liquidation fees." },
      { label: "Bad debt", read: "Positions whose debt exceeds their collateral because liquidation failed. It is a direct loss for the pool." },
      { label: "Collateral concentration", read: "How much borrowing is backed by one asset or a few large positions. Concentration makes liquidations harder in a crash." },
    ],
    misconceptions: [
      { myth: "Deposits can always be withdrawn instantly.", reality: "When utilisation reaches 100%, suppliers must wait for borrowers to repay or be liquidated." },
      { myth: "Liquidations are a penalty imposed by the team.", reality: "Third-party bots perform them under public rules; the discount rewards them for restoring the pool's solvency." },
      { myth: "The supply rate is a guaranteed return.", reality: "It floats with utilisation and can fall quickly when demand for borrowing drops." },
    ],
    risks: [
      "Oracle errors that trigger wrongful liquidations or allow over-borrowing.",
      "Liquidation cascades and bad debt when collateral prices gap down.",
      "Mistakes in risk parameters set by governance, and smart contract bugs.",
    ],
    quiz: [
      {
        question: "What happens when a position's health factor falls below 1?",
        options: ["The interest rate is frozen", "The position can be liquidated", "The collateral is returned to the user", "Nothing until the loan matures"],
        answer: 1,
        explanation: "A health factor below 1 means the weighted collateral no longer covers the debt; liquidators can step in.",
      },
      {
        question: "Why do borrowing rates rise when utilisation is high?",
        options: ["To reward the developers", "To attract deposits and discourage borrowing so that liquidity remains available", "Because the token price rises", "Rates never change"],
        answer: 1,
        explanation: "The rate curve is the protocol's way of balancing supply and demand for each asset.",
      },
      {
        question: "Collateral worth $20,000, a liquidation threshold of 80% and a debt of $10,000. What is the health factor?",
        options: ["2.0", "1.6", "0.5", "1.25"],
        answer: 1,
        explanation: "20,000 × 0.80 ÷ 10,000 = 1.6. The collateral can lose about 37.5% of its value before liquidation.",
      },
    ],
    sources: [
      { title: "Aave documentation", publisher: "Aave", url: "https://aave.com/docs" },
      { title: "Liquidations", publisher: "Aave Help Center", url: "https://aave.com/help/borrowing/liquidations" },
      { title: "Compound III documentation", publisher: "Compound", url: "https://docs.compound.finance/" },
      { title: "Decentralized finance (DeFi)", publisher: "ethereum.org", url: "https://ethereum.org/en/defi/" },
    ],
  },

  "liquid-staking": {
    minute:
      "Liquid staking lets you stake without locking your tokens. A protocol pools deposits, stakes them through professional node operators and gives you a liquid token, such as stETH, that tracks your stake plus rewards and can be traded or used as collateral.",
    steps: [
      { title: "Deposit", text: "Users deposit ETH in any amount, without running a validator or holding the 32 ETH needed to activate one." },
      { title: "Allocate to operators", text: "The protocol distributes deposits to node operators who run validators. Lido's Staking Router supports curated operators, a permissionless community module and distributed validator technology." },
      { title: "Mint the liquid token", text: "Depositors receive a liquid staking token. The stETH balance grows daily as oracles report validator rewards; wrapped versions such as wstETH grow in value per token instead." },
      { title: "Use it", text: "The token can be held, traded or posted as collateral in DeFi while the underlying ETH keeps earning staking rewards." },
      { title: "Exit", text: "Holders redeem through the protocol's withdrawal queue, or sell on the market, sometimes at a discount when many want to leave at once." },
    ],
    visual: "flow",
    flow: {
      nodes: [
        { title: "Deposit ETH", text: "Any amount, no validator to run." },
        { title: "Protocol pool", text: "Deposits allocated by the staking router." },
        { title: "Node operators", text: "Run validators and earn rewards." },
        { title: "Liquid token", text: "Tracks the stake plus rewards." },
        { title: "Use or exit", text: "Collateral, trading, or the withdrawal queue." },
      ],
      outcomes: {
        positive: "Staking rewards without locking capital, usable across DeFi.",
        negative: "Extra layers of risk: contracts, operators, oracle reports, and a market price that can slip below the underlying ETH.",
      },
    },
    visualCaption: "From a deposit to a liquid token: each box is also a layer of risk.",
    example: {
      projects: ["lido", "ethereum"],
      title: "Lido: network effects and concentration",
      paragraphs: [
        "Lido is the largest Ethereum liquid staking protocol. Its token, held as stETH or wrapped as wstETH, is the most integrated liquid staking token as DeFi collateral, a network effect the dossier identifies as Lido's main advantage.",
        "The same success raises a decentralisation question: Lido's large share of staked ETH concentrates consensus weight. Lido mitigates it with many independent operators, permissionless modules and a Dual Governance design meant to let stETH holders delay DAO decisions.",
      ],
    },
    metrics: [
      { label: "Share of staked ETH", read: "Market share of the protocol. Above one third of all stake, a single system could disrupt finality if it failed or misbehaved." },
      { label: "Market price versus redemption value", read: "A discount signals exit pressure or doubts. It matters most for positions that use the token as collateral." },
      { label: "Withdrawal queue", read: "How long redemptions take. A long queue pushes impatient holders to sell on the market." },
      { label: "Operator set", read: "Number and independence of node operators, and the share open to permissionless operators." },
    ],
    misconceptions: [
      { myth: "One stETH is always worth exactly one ETH.", reality: "It is redeemable through the protocol, but on the market it can trade at a discount when exits pile up or confidence drops." },
      { myth: "Liquid staking removes staking risk.", reality: "Slashing, operator failures and contract bugs still apply, plus the risks of the liquid token itself." },
      { myth: "LDO holders receive the staking fees.", reality: "The protocol's share of fees goes to the DAO treasury; LDO gives voting rights, not a direct claim on revenue." },
    ],
    risks: [
      "Concentration of a network's stake in one protocol.",
      "Discounts and forced liquidations when the token is used in leveraged loops.",
      "Governance upgrades, oracle reporting errors and operator slashing.",
    ],
    quiz: [
      {
        question: "What does a liquid staking token represent?",
        options: ["A governance vote in Ethereum", "A transferable claim on staked tokens plus accrued rewards", "A loan from the protocol", "A share of the protocol's company"],
        answer: 1,
        explanation: "The token stands for your share of the staked pool, including rewards, and can move freely while the stake stays locked.",
      },
      {
        question: "Why can stETH trade below ETH on the market?",
        options: ["Because it pays no rewards", "When many holders want to exit faster than the withdrawal queue allows", "Because it is not backed by ETH", "Because Ethereum caps its price"],
        answer: 1,
        explanation: "Market sellers accept a discount to avoid waiting in the queue, especially during stress.",
      },
      {
        question: "Why is a dominant liquid staking protocol a concern for Ethereum?",
        options: ["It raises gas fees", "It concentrates a large share of consensus weight in one system", "It mints new ETH", "It prevents withdrawals"],
        answer: 1,
        explanation: "If one system controls a large share of stake, its failure or capture could affect the whole network's consensus.",
      },
    ],
    sources: [
      { title: "Lido documentation", publisher: "Lido", url: "https://docs.lido.fi" },
      { title: "Lido tokens integration guide", publisher: "Lido", url: "https://docs.lido.fi/guides/lido-tokens-integration-guide" },
      { title: "Staking Router", publisher: "Lido", url: "https://docs.lido.fi/contracts/staking-router" },
      { title: "Pooled staking", publisher: "ethereum.org", url: "https://ethereum.org/en/staking/pools/" },
    ],
  },

  mev: {
    minute:
      "Whoever orders the transactions in a block can profit from that order. MEV, maximal extractable value, is the value captured by including, excluding or reordering transactions: arbitrage between markets, liquidations, and sometimes trades placed around yours to worsen your price.",
    steps: [
      { title: "A public waiting room", text: "Pending transactions sit in a public mempool, visible to anyone before they are included in a block." },
      { title: "Searchers", text: "Specialised bots scan pending transactions and market states for profitable opportunities, then prepare bundles of transactions in a precise order." },
      { title: "Builders", text: "Block builders assemble the most profitable block from users' transactions and searchers' bundles, and bid for it to be proposed." },
      { title: "Proposers", text: "On Ethereum most validators use MEV-Boost to receive blocks from builders through relays and pick the highest bid, which separates building a block from proposing it." },
      { title: "Who keeps the value", text: "Value flows from users to searchers, builders and validators. Some applications and rollups now auction ordering rights to keep part of it themselves." },
    ],
    visual: "flow",
    flow: {
      nodes: [
        { title: "Your swap", text: "Sent to the public mempool." },
        { title: "Searcher", text: "Spots it and prepares a buy before and a sell after." },
        { title: "Bundle", text: "Ordered transactions plus a payment to the builder." },
        { title: "Builder", text: "Packs the most profitable block." },
        { title: "Proposer", text: "Picks the highest-paying block." },
      ],
      outcomes: { positive: "Arbitrage and liquidations keep prices aligned across venues and loans solvent.", negative: "Sandwich attacks and front-running worsen users' execution, a hidden cost." },
    },
    visualCaption: "A sandwich attack, step by step, and the supply chain that makes it possible.",
    example: {
      projects: ["ethereum", "arbitrum"],
      title: "Who captures the value of ordering?",
      paragraphs: [
        "On Ethereum, priority fees and MEV go to validators, as the dossier notes. A small number of specialised builders produce most blocks, which raises concerns about concentration in block building.",
        "Rollups face the same question with their sequencer. Arbitrum's Timeboost auctions a short time advantage in transaction ordering, and its revenue accrues to the DAO treasury: an explicit attempt to capture MEV at the protocol level.",
      ],
    },
    metrics: [
      { label: "Slippage tolerance", read: "The maximum price move you accept on a swap. It caps how much a sandwich can take from you." },
      { label: "Builder concentration", read: "The share of blocks produced by the largest builders. High concentration creates censorship and dependency risks." },
      { label: "Private order flow", read: "Transactions sent through private channels or intent systems never appear in the public mempool." },
      { label: "MEV returned to users or protocols", read: "Rebates, auctions and redistribution show how much value is recaptured rather than extracted." },
    ],
    misconceptions: [
      { myth: "MEV is simply theft by block producers.", reality: "Some MEV, such as arbitrage and liquidations, keeps markets efficient. The harmful part extracts value from users' own trades." },
      { myth: "Paying a higher fee protects my trade.", reality: "A higher tip buys priority, not protection: a searcher can still place transactions around yours. Private submission and tight slippage limits help more." },
      { myth: "MEV only exists on Ethereum.", reality: "Any system where someone orders transactions has MEV, including rollups with a single sequencer." },
    ],
    risks: [
      "Hidden costs for users through worse execution.",
      "Concentration of block building in a few builders and relays.",
      "Incentives to censor or reorder transactions when extractable value is large.",
    ],
    quiz: [
      {
        question: "What gives rise to MEV?",
        options: ["High token prices", "The power to choose and order transactions in a block", "Smart contract audits", "Low network fees"],
        answer: 1,
        explanation: "Ordering power lets the block producer, or those paying it, capture value from the sequence of transactions.",
      },
      {
        question: "How does a sandwich attack work?",
        options: [
          "It splits a trade across two exchanges",
          "The attacker buys right before a user's trade and sells right after it, profiting from the price move the user causes",
          "It delays a transaction until fees fall",
          "It cancels a user's transaction",
        ],
        answer: 1,
        explanation: "The user's own trade pushes the price; the attacker positions before and exits after, at the user's expense.",
      },
      {
        question: "Which setting most directly limits how much a sandwich can take from your swap?",
        options: ["A higher gas limit", "A tight slippage tolerance", "A larger trade", "Using a hardware wallet"],
        answer: 1,
        explanation: "With low slippage tolerance, a trade reverts if the price is pushed too far, which removes most of the attacker's profit.",
      },
    ],
    sources: [
      { title: "Maximal extractable value (MEV)", publisher: "ethereum.org", url: "https://ethereum.org/en/developers/docs/mev/" },
      { title: "Proposer-builder separation", publisher: "ethereum.org", url: "https://ethereum.org/en/roadmap/pbs/" },
      { title: "Flashbots documentation", publisher: "Flashbots", url: "https://docs.flashbots.net/" },
      { title: "A gentle introduction to Timeboost", publisher: "Arbitrum Docs", url: "https://docs.arbitrum.io/how-arbitrum-works/timeboost/gentle-introduction" },
    ],
  },

  tvl: {
    minute:
      "Total value locked is the market value of the assets deposited in a protocol's smart contracts, or across all DeFi protocols on a chain. It is the most quoted DeFi metric and one of the easiest to misread, because it moves with token prices and can count the same dollar twice.",
    steps: [
      { title: "Count the assets", text: "Data providers such as DefiLlama read the token balances held by a protocol's contracts." },
      { title: "Price them", text: "Each balance is multiplied by its current market price, and the results are added up." },
      { title: "Decide what counts", text: "Methodologies exclude or separate items such as the protocol's own token, borrowed amounts or assets already counted in another protocol, to limit double counting." },
      { title: "Aggregate by chain", text: "Chain TVL adds up the DeFi protocols deployed on a chain. It is not the value of the chain's own token." },
      { title: "Read the trend correctly", text: "Because TVL is in dollars, a price fall shrinks it even if nobody withdraws. Tracking token quantities tells the two effects apart." },
    ],
    visual: "tvl-table",
    visualCaption: "Live TVL across Sensitor coverage, with market cap divided by TVL where both are available.",
    example: {
      projects: ["aave", "lido"],
      title: "Reading TVL across the coverage",
      paragraphs: [
        "Lending markets and liquid staking protocols typically hold the largest deposits in Sensitor's coverage. Exchanges need less capital relative to the volume they handle, so a lower TVL does not mean a smaller business.",
        "TVL alone says little about economics: an exchange can earn more fees on smaller deposits than a protocol with large idle balances. The table compares market cap with TVL, a rough measure of how the market values each dollar deposited.",
      ],
    },
    metrics: [
      { label: "TVL in tokens and in dollars", read: "Separates real deposits and withdrawals from simple price moves." },
      { label: "Fees divided by TVL", read: "How productively deposits are used. Low ratios mean idle capital." },
      { label: "Market cap divided by TVL", read: "How the market values deposits. Comparable only between protocols with similar business models." },
      { label: "Share attracted by incentives", read: "Deposits farmed with token rewards tend to leave when the rewards stop." },
    ],
    misconceptions: [
      { myth: "TVL is the protocol's money.", reality: "TVL belongs to depositors. The protocol earns only the fees charged on it." },
      { myth: "Rising TVL means users are joining.", reality: "TVL can rise purely because the deposited tokens went up in price." },
      { myth: "Chain TVL measures the value of the chain's token.", reality: "It adds up the DeFi deposits on that chain; the token's market cap is a different number." },
    ],
    risks: [
      "Double counting when the same assets are deposited, borrowed and redeposited across protocols.",
      "Mercenary capital that leaves as soon as incentives end.",
      "TVL inflated by the protocol's own token or by price rallies.",
    ],
    quiz: [
      {
        question: "A protocol's TVL falls 40% in a week with no withdrawals. What is the most likely cause?",
        options: ["A hack", "The deposited tokens fell in price", "A change of data provider", "Higher fees"],
        answer: 1,
        explanation: "TVL is quoted in dollars, so a price fall reduces it even when the number of tokens deposited is unchanged.",
      },
      {
        question: "Why can adding up TVL across protocols overstate the size of DeFi?",
        options: ["Because some protocols are on several chains", "Because the same assets can be deposited, borrowed and redeposited in several protocols", "Because TVL includes token market caps", "It never overstates it"],
        answer: 1,
        explanation: "Each redeposit is counted again, so the same dollar can appear several times in the total.",
      },
      {
        question: "What does a low ratio of fees to TVL suggest?",
        options: ["Very efficient use of deposits", "Deposits earn little: capital is largely idle", "The protocol is about to be hacked", "Fees are paid in another token"],
        answer: 1,
        explanation: "A protocol that holds large deposits but generates few fees is not putting that capital to productive use.",
      },
    ],
    sources: [
      { title: "What to include as TVL", publisher: "DefiLlama Docs", url: "https://docs.llama.fi/list-your-project/what-to-include-as-tvl" },
      { title: "DefiLlama documentation", publisher: "DefiLlama", url: "https://docs.llama.fi/" },
      { title: "DefiLlama dashboard", publisher: "DefiLlama", url: "https://defillama.com" },
    ],
  },

  "protocol-revenue": {
    minute:
      "Fees are what users pay to use a protocol. Revenue is the part the protocol keeps after paying the people who supply the service, such as liquidity providers, lenders or validators. Only revenue, and what governance does with it, can create value for token holders.",
    steps: [
      { title: "Users pay fees", text: "Trading fees, borrowing interest, gas: whatever users pay to use the service." },
      { title: "The supply side is paid", text: "Most fees usually go to those providing capital or work: liquidity providers on an exchange, suppliers in a lending market, validators on a chain." },
      { title: "The protocol keeps revenue", text: "A share is retained by the protocol treasury, through a protocol fee or a reserve factor." },
      { title: "Holders may receive value", text: "Revenue reaches token holders only if governance directs it there: buybacks, burns, distributions, or staking rewards funded by fees." },
      { title: "Subtract incentives", text: "Token rewards paid to attract users are a cost. Revenue minus incentives shows whether the protocol earns or buys its growth." },
    ],
    visual: "flow",
    flow: {
      nodes: [
        { title: "Fees", text: "Everything users pay." },
        { title: "Supply side", text: "Liquidity providers, lenders, validators." },
        { title: "Revenue", text: "The share kept by the protocol." },
        { title: "Token holders", text: "Buybacks, burns or distributions, if governance decides." },
      ],
      outcomes: { positive: "Revenue above incentives: the protocol funds itself and can reward holders.", negative: "Incentives above revenue: growth is bought with dilution." },
    },
    visualCaption: "The fee waterfall: each step keeps a smaller share than the one before.",
    example: {
      projects: ["uniswap", "hyperliquid", "lido"],
      title: "Three paths from fees to holders",
      paragraphs: [
        "Historically nearly all Uniswap fees went to liquidity providers, so UNI captured no cash flow. The UNIfication proposal of November 2025 would turn on protocol fees and use them to burn UNI.",
        "Hyperliquid directs protocol fees to an Assistance Fund that buys HYPE on the market, while Lido's share of staking fees goes to the DAO treasury rather than to LDO holders directly. Same metric, three very different paths.",
      ],
    },
    metrics: [
      { label: "Take rate", read: "Revenue divided by fees: how much of what users pay the protocol keeps." },
      { label: "Revenue minus incentives", read: "The closest thing to earnings. Negative means growth is subsidised by token emissions." },
      { label: "Holder value capture", read: "Buybacks, burns or distributions actually funded by revenue." },
      { label: "Price to revenue", read: "Market cap divided by annualised revenue. Useful between similar protocols, misleading across business models." },
    ],
    misconceptions: [
      { myth: "High fees mean a profitable protocol.", reality: "Most fees may go to the supply side. What matters is the share retained and what it costs to attract users." },
      { myth: "A buyback always benefits holders.", reality: "Only when it is funded by real revenue rather than treasury reserves or new emissions, and done at sensible prices." },
      { myth: "Revenue figures are standard across sources.", reality: "Providers define fees and revenue differently. Check the methodology before comparing." },
    ],
    risks: [
      "Revenue driven by speculative activity that disappears in quiet markets.",
      "Fee policies changed by governance, or constrained by regulation.",
      "Incentive spending that hides weak underlying economics.",
    ],
    quiz: [
      {
        question: "On a decentralised exchange, where do most trading fees usually go?",
        options: ["To the founding team", "To liquidity providers", "To the token holders", "They are burned"],
        answer: 1,
        explanation: "Liquidity providers supply the capital traders use, so they receive most of the fees.",
      },
      {
        question: "A protocol earns $10 million of revenue a year and pays $25 million in token incentives. What does this indicate?",
        options: ["It is very profitable", "It is buying growth: its net economics are negative", "Its token must rise", "Incentives do not matter"],
        answer: 1,
        explanation: "Spending more on incentives than it earns means the protocol subsidises usage with dilution.",
      },
      {
        question: "When does protocol revenue reach token holders?",
        options: ["Always, automatically", "Only when governance directs it through buybacks, burns or distributions", "When the price rises", "Never"],
        answer: 1,
        explanation: "Revenue sits with the protocol unless a mechanism or a governance decision passes it on.",
      },
    ],
    sources: [
      { title: "Fees and revenue dashboard", publisher: "DefiLlama", url: "https://defillama.com/fees" },
      { title: "UNIfication", publisher: "Uniswap Labs blog", url: "https://blog.uniswap.org/unification" },
      { title: "Lido fee", publisher: "Lido Docs", url: "https://docs.lido.fi/contracts/lido#fee" },
      { title: "Hyperliquid documentation", publisher: "Hyperliquid", url: "https://hyperliquid.gitbook.io/hyperliquid-docs" },
    ],
  },

  restaking: {
    minute:
      "Restaking lets stakers reuse the same staked collateral to secure additional services, such as data availability layers or oracles, in exchange for extra rewards. New services rent existing economic security instead of building their own, but each additional service adds a new way to be slashed.",
    steps: [
      { title: "Start from staked ETH", text: "Restakers use ETH that is already staked, natively or through a liquid staking token." },
      { title: "Opt in", text: "They deposit it in a restaking protocol such as EigenLayer and accept additional conditions." },
      { title: "Delegate", text: "They choose an operator who runs the software of the services to secure, called AVSs (actively validated services)." },
      { title: "Secure services", text: "Operators perform tasks for the AVSs they opt into. Each AVS defines its own tasks, rewards and slashing conditions." },
      { title: "Earn or be slashed", text: "Rewards come from the AVSs; provable faults can be slashed. Since 2025 on EigenLayer, each AVS can only slash the stake allocated to it." },
    ],
    visual: "flow",
    flow: {
      nodes: [
        { title: "Staked ETH", text: "Native stake or a liquid staking token." },
        { title: "Restaking protocol", text: "Accepts additional slashing conditions." },
        { title: "Operator", text: "Runs the services' software." },
        { title: "Services (AVSs)", text: "Data availability, oracles, bridges and more." },
      ],
      outcomes: {
        positive: "New services launch with borrowed security instead of bootstrapping their own validator set.",
        negative: "The same stake backs several obligations: a fault or bug in one service can cost restakers more than they earn.",
      },
    },
    visualCaption: "One stake, several obligations: restaking stacks rewards and risks.",
    example: {
      projects: ["eigenlayer"],
      title: "EigenLayer: shared security in practice",
      paragraphs: [
        "EigenLayer pioneered restaking. Restakers delegate to operators, who opt into AVSs; EigenDA, a data availability service built by Eigen Labs, is the flagship. Slashing went live on mainnet in 2025 with operator sets and unique stake allocation.",
        "The dossier flags two open questions: AVS rewards have often been paid in tokens rather than fees, so real demand for economic security is still emerging, and the complexity of stacked conditions makes risk hard to assess for end users.",
      ],
    },
    metrics: [
      { label: "Source of rewards", read: "Fees paid by services that need security, or token emissions. Only the first is durable." },
      { label: "Slashing conditions", read: "Whether they are defined, audited and live, and who decides that a fault occurred." },
      { label: "Operator concentration", read: "How much restaked value is delegated to the largest operators." },
      { label: "Stake allocation per service", read: "How much of the stake each service can slash. It bounds the loss from any single failure." },
    ],
    misconceptions: [
      { myth: "Restaking multiplies yield at no extra risk.", reality: "Each service adds slashing conditions and contract risk; the extra yield is payment for that risk." },
      { myth: "Restaked ETH makes Ethereum more secure.", reality: "It secures additional services. Ethereum's own security comes from the underlying stake." },
      { myth: "Liquid restaking tokens are as liquid as ETH.", reality: "Their market depth can be thin, and exits pass through several protocols and queues." },
    ],
    risks: [
      "Cascading slashing when one stake backs many services.",
      "Complexity that hides the true risk from end users.",
      "Rewards funded by emissions that may not last.",
    ],
    quiz: [
      {
        question: "What does restaking allow a new service to do?",
        options: ["Mint ETH", "Use existing staked collateral as its security instead of building its own validator set", "Avoid smart contracts", "Skip audits"],
        answer: 1,
        explanation: "Shared security lets a service rent the economic weight of existing stake.",
      },
      {
        question: "Why does restaking add risk for stakers?",
        options: ["It lowers Ethereum's rewards", "The same stake can be slashed under each additional service's rules", "It locks ETH forever", "It removes withdrawal rights"],
        answer: 1,
        explanation: "Every service a stake secures adds its own conditions for losing part of that stake.",
      },
      {
        question: "Which question best reveals whether restaking demand is sustainable?",
        options: ["How many followers the project has", "Are rewards paid from real fees or from token emissions?", "What is the token's all-time high?", "How many chains it supports"],
        answer: 1,
        explanation: "Fees show that services genuinely pay for security; emissions only show that someone is subsidising it.",
      },
    ],
    sources: [
      { title: "Restaking", publisher: "ethereum.org", url: "https://ethereum.org/en/restaking/" },
      { title: "Ethereum staking", publisher: "ethereum.org", url: "https://ethereum.org/en/staking/" },
      { title: "EigenLayer", publisher: "Eigen Labs", url: "https://www.eigenlayer.xyz" },
    ],
  },

  "perpetual-futures": {
    minute:
      "A perpetual future is a leveraged contract on an asset's price that never expires. To keep its price close to the spot price, longs and shorts pay each other a funding rate at regular intervals. Perpetuals are among the most traded instruments in crypto, and their liquidations can amplify market moves.",
    steps: [
      { title: "Open a position", text: "A trader deposits margin and goes long or short with leverage on an index price." },
      { title: "Margin and liquidation", text: "Profit and loss are tracked against a mark price. If losses reduce the margin to the maintenance level, the position is liquidated." },
      {
        title: "Funding",
        text: "When the perpetual trades above spot, longs pay shorts; below spot, shorts pay longs. Payments happen at fixed intervals, every hour or every eight hours depending on the venue.",
      },
      { title: "Open interest", text: "The total size of open positions. Rising open interest with high funding signals crowded leverage on one side." },
      { title: "Cascades and backstops", text: "Forced closures push the price further and trigger more liquidations. Insurance funds or backstop vaults absorb losses when a position's margin runs out." },
    ],
    visual: "funding",
    visualCaption: "Try it: see how a funding rate turns into payments over time, and who pays whom. Example values, not live rates.",
    example: {
      projects: ["hyperliquid", "ethena"],
      title: "Perpetuals on-chain, and funding as a yield",
      paragraphs: [
        "Hyperliquid runs a fully on-chain order book for perpetuals with one-block finality. The dossier notes that stress events in 2025, including large liquidation losses for its HLP vault, showed both the system's resilience and the discretionary power of its validators.",
        "Funding is also a source of yield. Ethena's USDe holds short perpetual positions against its collateral and earns funding when it is positive; when funding turns negative, its reserve fund is designed to absorb the cost.",
      ],
    },
    metrics: [
      { label: "Annualised funding rate", read: "The cost of holding leverage. Persistently high positive funding shows crowded long positioning." },
      { label: "Open interest", read: "Total leverage in the system. Compare it with market cap and with its own history." },
      { label: "Liquidation volume", read: "Spikes mark forced selling or buying that moved the market." },
      { label: "Basis", read: "The gap between the perpetual and spot prices. Large gaps signal stress or one-sided demand." },
    ],
    misconceptions: [
      { myth: "Positive funding means the price will rise.", reality: "It means longs are paying for leverage. Crowded positioning can just as well precede a sharp drop." },
      { myth: "Perpetuals track the spot price exactly.", reality: "Funding pulls them towards spot, but they can trade at a premium or discount, especially during stress." },
      { myth: "Low leverage makes liquidation impossible.", reality: "It makes it less likely. A large enough move, or a gap in a thin market, can still wipe out the margin." },
    ],
    risks: [
      "Liquidation of leveraged positions during fast moves.",
      "Venue risk: exchange failure, manipulation of the mark price, auto-deleveraging.",
      "Funding costs that quietly erode returns over long holding periods.",
    ],
    quiz: [
      {
        question: "What is the purpose of the funding rate?",
        options: ["To pay the exchange", "To keep the perpetual's price close to the spot price", "To set the leverage limit", "To reward liquidity providers"],
        answer: 1,
        explanation: "Funding makes the crowded side pay the other, which pulls the perpetual's price back towards spot.",
      },
      {
        question: "Funding is +0.01% every eight hours on a $10,000 long position. How much does the long pay per day?",
        options: ["$3", "$1", "$30", "$0.30"],
        answer: 0,
        explanation: "$10,000 × 0.0001 = $1 per interval, three intervals per day: $3, about 11% a year.",
      },
      {
        question: "What is a liquidation cascade?",
        options: ["A series of new listings", "Forced closures that push the price further and trigger more liquidations", "A drop in trading fees", "A governance vote"],
        answer: 1,
        explanation: "Each liquidation is a forced trade in the direction of the move, which can knock out the next layer of leveraged positions.",
      },
    ],
    sources: [
      { title: "Perpetual contracts guide", publisher: "BitMEX", url: "https://www.bitmex.com/app/perpetualContractsGuide" },
      { title: "Funding", publisher: "Hyperliquid Docs", url: "https://hyperliquid.gitbook.io/hyperliquid-docs/trading/funding" },
      { title: "Liquidations", publisher: "Hyperliquid Docs", url: "https://hyperliquid.gitbook.io/hyperliquid-docs/trading/liquidations" },
      { title: "How USDe works", publisher: "Ethena", url: "https://docs.ethena.fi/overview/how-usde-works" },
    ],
  },

  "rollup-stages": {
    minute:
      "L2BEAT's stages rate how much a rollup's users still depend on its operators. Stage 0 has training wheels: the team can change or override the system. Stage 1 runs on a working proof system, with a security council as a limited backstop. Stage 2 lets code rule: users can leave before any ordinary upgrade takes effect.",
    steps: [
      { title: "The entry ticket", text: "Stage 0 requires the basics of a rollup: state and data published on Ethereum, and open-source software that lets anyone rebuild the rollup's state." },
      { title: "Stage 0: training wheels", text: "Operators or a small multisig can upgrade contracts or override the system at will; the proof system may be missing, incomplete or restricted to approved parties." },
      { title: "Stage 1: limited backstop", text: "A working proof system secures the rollup. A security council with a high signing threshold and members independent of the team can still override it, and other upgrades come with a delay that lets users exit." },
      { title: "Stage 2: code rules", text: "Proofs are fully permissionless, ordinary upgrades give users at least 30 days to exit, and the council can only act on bugs provable on-chain." },
      { title: "Check it again", text: "A stage is a snapshot. It can move up or down with every upgrade, and it does not cover every risk: sequencer and data availability are rated separately." },
    ],
    visual: "table",
    table: {
      columns: ["Stage 0", "Stage 1", "Stage 2"],
      rows: [
        { label: "Proof system", values: ["Missing, incomplete or restricted", "Working; challengers can submit proofs", "Working and fully permissionless"] },
        { label: "Who can override", values: ["Operators or a small multisig", "A security council with a high threshold", "Only to fix bugs provable on-chain"] },
        { label: "Time to exit before upgrades", values: ["Not guaranteed", "A delay for upgrades not made by the council", "At least 30 days for ordinary upgrades"] },
        { label: "What you trust", values: ["The team", "The proofs, with the council as backstop", "The code and Ethereum"] },
      ],
    },
    visualCaption: "The three stages side by side, simplified from L2BEAT's framework.",
    example: {
      projects: ["arbitrum", "optimism"],
      title: "Arbitrum and OP Mainnet: proofs and councils",
      paragraphs: [
        "Arbitrum One's BoLD protocol lets anyone take part in validation, and a 12-member Security Council can perform emergency upgrades. OP Mainnet's permissionless fault proofs went live in 2024, and its Security Council also keeps emergency powers.",
        "Both dossiers track the L2BEAT stage and upgrade delays rather than quoting a rating that can change with the next upgrade. That is the right habit: check the stage before trusting a rollup with size.",
      ],
    },
    metrics: [
      { label: "Current stage", read: "The headline rating. Read the reasons listed with it, not just the number." },
      { label: "Who can submit proofs", read: "Anyone, an allow-listed set, or nobody yet. Permissionless proofs are the core of Stages 1 and 2." },
      { label: "Upgrade delay versus withdrawal time", read: "If upgrades can take effect faster than users can withdraw, users cannot escape an unwanted change." },
      { label: "Security council", read: "Number of members, signing threshold and independence from the team." },
    ],
    misconceptions: [
      { myth: "Stage 2 means no risk.", reality: "It removes trust in operators, not bugs. Code, proof system and Ethereum risks remain." },
      { myth: "A rollup's stage is permanent.", reality: "It can change with each upgrade. Check the current rating, not last year's." },
      { myth: "Stages measure how decentralised the sequencer is.", reality: "Stages focus on proofs, upgrades and exits. A Stage 1 rollup can still have a single sequencer." },
    ],
    risks: [
      "Instant upgrades on Stage 0 systems that could redirect funds.",
      "Collusion or compromise of a security council.",
      "Bugs in young proof systems that the stage framework cannot detect.",
    ],
    quiz: [
      {
        question: "What does a Stage 0 rating indicate?",
        options: ["The rollup has no users", "Operators can still change or override the system", "The rollup is fully trustless", "The rollup does not post data to Ethereum"],
        answer: 1,
        explanation: "Stage 0 rollups still have training wheels: the team or a small multisig keeps the final say.",
      },
      {
        question: "What mainly distinguishes Stage 2?",
        options: ["A token listed on major exchanges", "Permissionless proofs and at least 30 days to exit before ordinary upgrades", "A decentralised sequencer", "Zero fees"],
        answer: 1,
        explanation: "At Stage 2, users are protected by code and by time to leave, with the council limited to provable bugs.",
      },
      {
        question: "Can a Stage 1 rollup run a single, centralised sequencer?",
        options: ["No, Stage 1 forbids it", "Yes: stages assess proofs, upgrades and exits, not sequencing", "Only on weekends", "Only if it has no token"],
        answer: 1,
        explanation: "Sequencer centralisation is a separate risk that L2BEAT reports alongside the stage.",
      },
    ],
    sources: [
      { title: "Stages framework", publisher: "L2BEAT", url: "https://l2beat.com/stages" },
      { title: "Scaling summary", publisher: "L2BEAT", url: "https://l2beat.com/scaling/summary" },
      { title: "Fault proofs explainer", publisher: "Optimism Docs", url: "https://docs.optimism.io/stack/fault-proofs/explainer" },
      { title: "Layer 2", publisher: "ethereum.org", url: "https://ethereum.org/en/layer-2/" },
    ],
  },

  sequencers: {
    minute:
      "A sequencer receives a rollup's transactions, decides their order, executes them and posts the results to the base chain. Most rollups today run a single sequencer operated by their team: fast and simple, but a central point that can censor, extract MEV or go offline.",
    steps: [
      { title: "Receive", text: "Users send their transactions to the sequencer rather than directly to Ethereum." },
      { title: "Order and confirm", text: "The sequencer orders the transactions, executes them and returns soft confirmations within a fraction of a second." },
      { title: "Batch and post", text: "It compresses transactions into batches and posts them to Ethereum, paying the data costs." },
      { title: "Force inclusion", text: "If the sequencer ignores a user, the user can submit the transaction through a contract on Ethereum, which the rollup must include after a delay." },
      { title: "Earn a margin", text: "Fees collected on the rollup minus data costs paid to Ethereum form the sequencer margin, the main revenue line of most rollups." },
    ],
    visual: "flow",
    flow: {
      nodes: [
        { title: "Users", text: "Send transactions to the rollup." },
        { title: "Sequencer", text: "Orders, executes and soft-confirms them." },
        { title: "Batches", text: "Compressed and posted to Ethereum." },
        { title: "Ethereum", text: "Holds the data and settles the rollup." },
      ],
      outcomes: { positive: "Fast confirmations and low fees from a single, efficient operator.", negative: "A single point of failure for censorship, MEV and downtime, mitigated only by force inclusion." },
    },
    visualCaption: "The sequencer sits between users and Ethereum: convenient, and a point of control.",
    example: {
      projects: ["arbitrum", "optimism"],
      title: "Sequencer economics in the coverage",
      paragraphs: [
        "Arbitrum's sequencer orders transactions and posts batches to Ethereum, giving soft confirmations. The dossier lists sequencer revenue minus Ethereum data costs as a key metric, and notes that Timeboost revenue goes to the DAO treasury.",
        "Chains in the Optimism Superchain contribute a share of their sequencer revenue to the Optimism Collective, so the collective's economics depend on sequencer margins across many chains, not just one.",
      ],
    },
    metrics: [
      { label: "Sequencer margin", read: "Rollup fees minus data costs on Ethereum. It shows whether the rollup earns money from its users." },
      { label: "Uptime and incidents", read: "How often the sequencer stopped or degraded, and for how long." },
      { label: "Force inclusion delay", read: "How long a censored user must wait before Ethereum forces the transaction in." },
      { label: "Decentralisation plans", read: "Shared or based sequencing, and whether they are live or only on a roadmap." },
    ],
    misconceptions: [
      { myth: "If the sequencer goes down, funds are lost.", reality: "Funds remain secured on Ethereum. Users can wait, or use force inclusion and the bridge to exit, with delays." },
      { myth: "A centralised sequencer can steal funds.", reality: "It can censor or reorder transactions, but it cannot get an invalid state accepted if the proof system works." },
      { myth: "Soft confirmations are final.", reality: "Finality comes once the batch is posted to Ethereum and, for withdrawals, once the proof or challenge period completes." },
    ],
    risks: [
      "Censorship of specific users or applications.",
      "Downtime that freezes activity on the rollup.",
      "Value extraction through transaction ordering.",
    ],
    quiz: [
      {
        question: "What is force inclusion for?",
        options: ["Speeding up confirmations", "Letting users bypass a censoring sequencer through the base chain", "Lowering fees", "Minting new tokens"],
        answer: 1,
        explanation: "A transaction submitted on Ethereum must eventually be included by the rollup, whatever the sequencer wants.",
      },
      {
        question: "What is the main revenue line of most rollups?",
        options: ["Token sales", "Fees collected on the rollup minus data costs paid to Ethereum", "Staking rewards", "Bridge deposits"],
        answer: 1,
        explanation: "The sequencer margin is the gap between what users pay on the rollup and what the rollup pays Ethereum.",
      },
      {
        question: "If the proof system works, what can a centralised sequencer not do?",
        options: ["Reorder transactions", "Delay transactions", "Get an invalid state that steals funds accepted", "Go offline"],
        answer: 2,
        explanation: "Ordering power is not validity power: a fraudulent state would be rejected by proofs on Ethereum.",
      },
    ],
    sources: [
      { title: "The Sequencer and censorship resistance", publisher: "Arbitrum Docs", url: "https://docs.arbitrum.io/how-arbitrum-works/sequencer" },
      { title: "Inside Arbitrum Nitro", publisher: "Arbitrum Docs", url: "https://docs.arbitrum.io/how-arbitrum-works/inside-arbitrum-nitro" },
      { title: "Optimistic rollups", publisher: "ethereum.org", url: "https://ethereum.org/en/developers/docs/scaling/optimistic-rollups/" },
      { title: "OP Stack: getting started", publisher: "Optimism Docs", url: "https://docs.optimism.io/stack/getting-started" },
    ],
  },

  "data-availability": {
    minute:
      "To verify a chain, you need its data. Data availability is the guarantee that the data behind a block has actually been published, so anyone can check it or rebuild the state. Rollups must buy this guarantee somewhere: on Ethereum, on a specialised network, or from a committee.",
    steps: [
      { title: "Why it matters", text: "A block producer could publish a valid-looking block header and withhold the data. Without the data, nobody can prove fraud or reconstruct balances to exit." },
      { title: "Publish", text: "Rollups post their transaction data to a data availability layer: Ethereum blobs since EIP-4844, or external networks such as Celestia or EigenDA." },
      { title: "Add redundancy", text: "Erasure coding extends the data with redundancy so that the whole block can be recovered from part of the pieces." },
      { title: "Sample", text: "Light nodes download a few small random pieces. If enough samples succeed, the full data is available with very high probability, without anyone downloading everything." },
      { title: "Weigh the trade-offs", text: "Cost, the security of the data layer, and how proofs of availability reach the settlement chain all change what users trust." },
    ],
    visual: "table",
    table: {
      columns: ["Ethereum blobs", "External DA network", "Data committee"],
      rows: [
        { label: "Who guarantees the data", values: ["Ethereum validators", "The network's own validators (for example Celestia)", "A small set of known members"] },
        { label: "Relative cost", values: ["Market-priced blob fee", "Usually lower", "Lowest"] },
        { label: "What you trust", values: ["Ethereum itself", "The DA network and its bridge to Ethereum", "The committee's honesty"] },
        { label: "Usual label", values: ["Rollup", "Often classed as validium or optimium", "Validium or optimium"] },
      ],
    },
    visualCaption: "Where a rollup publishes its data decides who users must trust to verify and exit.",
    example: {
      projects: ["celestia", "ethereum"],
      title: "Celestia and Ethereum blobs",
      paragraphs: [
        "Celestia grew out of the LazyLedger paper: a chain that only orders data and guarantees its availability, leaving execution to others. Data availability sampling and two-dimensional erasure coding let its block size grow as more light nodes sample.",
        "Rollups that use Celestia from Ethereum rely on Celestia's validators and on Blobstream for data guarantees, a different trust model from Ethereum blobs. The dossier also notes that fees paid to Celestia have been small, since demand depends on rollups choosing external data availability.",
      ],
    },
    metrics: [
      { label: "Blob usage and blob fees", read: "How full Ethereum's data space is. Sustained full blobs push fees up and make alternatives more attractive." },
      { label: "Data cost per transaction", read: "What a rollup pays to publish each transaction. It drives the fees users see." },
      { label: "Adoption of external DA", read: "How many rollups, and how much value, rely on each data layer." },
      { label: "Number of sampling nodes", read: "More light nodes sampling means stronger availability guarantees and room for larger blocks." },
    ],
    misconceptions: [
      { myth: "Data availability means data is stored forever.", reality: "It guarantees publication for long enough to verify and exit. Ethereum blobs are pruned after about 18 days." },
      { myth: "Cheaper data availability is only a cost saving.", reality: "It changes who users trust for the safety of their funds." },
      { myth: "Checking availability requires downloading whole blocks.", reality: "Sampling lets light nodes check it by downloading a few small pieces." },
    ],
    risks: [
      "Data withholding that prevents fraud proofs and exits.",
      "Weak bridges carrying availability proofs between chains.",
      "Collusion of a small data committee.",
    ],
    quiz: [
      {
        question: "Why does a rollup need data availability?",
        options: ["To make its token scarcer", "So that anyone can verify the state, prove fraud and exit", "To speed up the sequencer", "To store users' private keys"],
        answer: 1,
        explanation: "Without published data, nobody can check what the operator did or rebuild balances to withdraw.",
      },
      {
        question: "What does data availability sampling allow?",
        options: ["Faster block times", "Light nodes to check availability by downloading small random pieces", "Free transactions", "Private transactions"],
        answer: 1,
        explanation: "Thanks to erasure coding, a handful of successful random samples gives high confidence that the whole block is available.",
      },
      {
        question: "A rollup moves its data from Ethereum to a small committee. What changes for users?",
        options: ["Nothing at all", "They must now trust the committee to keep data available", "Their funds move to the committee", "Withdrawals become instant"],
        answer: 1,
        explanation: "The data guarantee no longer comes from Ethereum but from the committee members.",
      },
    ],
    sources: [
      { title: "Data availability", publisher: "ethereum.org", url: "https://ethereum.org/en/developers/docs/data-availability/" },
      { title: "Data availability layer", publisher: "Celestia Docs", url: "https://docs.celestia.org/learn/how-celestia-works/data-availability-layer" },
      { title: "LazyLedger: A Distributed Data Availability Ledger With Client-Side Smart Contracts", publisher: "arXiv", url: "https://arxiv.org/abs/1905.09274" },
      { title: "EIP-4844: Shard Blob Transactions", publisher: "Ethereum Improvement Proposals", url: "https://eips.ethereum.org/EIPS/eip-4844" },
    ],
  },

  interoperability: {
    minute:
      "Blockchains cannot read each other. A bridge or messaging protocol moves assets and data between them by having someone verify what happened on the source chain. Who that verifier is defines the security, and bridges have suffered some of the largest hacks in crypto.",
    steps: [
      { title: "Lock or burn", text: "Tokens are locked in a contract, or burned, on the source chain." },
      { title: "Verify the event", text: "A verifier attests that the lock happened: a multisig, an oracle or verifier network, a light client or a zero-knowledge proof." },
      { title: "Mint or release", text: "The destination chain mints a representation of the token, or releases native tokens from a pool." },
      { title: "Carry messages", text: "Messaging protocols generalise the idea to arbitrary data, so applications can call contracts on other chains." },
      { title: "Choose the security", text: "Some protocols let each application pick its own verifiers, which moves risk decisions from the protocol to the application." },
    ],
    visual: "table",
    table: {
      columns: ["Multisig or committee", "Verifier network", "Light client or ZK proof"],
      rows: [
        { label: "Who verifies", values: ["A few key holders", "Independent node operators", "The destination chain checks the source chain's consensus"] },
        { label: "Main risk", values: ["Key theft or collusion", "Operator collusion or a weak configuration", "Bugs in complex code, higher cost"] },
        { label: "Examples", values: ["Many early bridges", "Chainlink CCIP, LayerZero verifier networks", "IBC, zero-knowledge bridges"] },
      ],
    },
    visualCaption: "Three ways to verify a cross-chain message, from most trusted to most trust-minimised.",
    example: {
      projects: ["layerzero", "chainlink"],
      title: "Configurable security versus a fixed design",
      paragraphs: [
        "LayerZero v2 separates verification, done by decentralised verifier networks (DVNs), from execution, and lets each application set its own security stack. The dossier notes that security is only as strong as the configuration an application chooses, and that users rarely know which verifiers secure the token they hold.",
        "Chainlink CCIP takes a different approach: it adds a separate Risk Management Network that monitors cross-chain activity and can pause it.",
      ],
    },
    metrics: [
      { label: "Verifier set", read: "Who attests to messages, how many of them, and how independent they are." },
      { label: "Value at risk", read: "How much value sits in the bridge's contracts or depends on its messages." },
      { label: "Configuration", read: "For configurable protocols, the setup each application actually uses. A single verifier concentrates trust." },
      { label: "Limits and monitoring", read: "Rate limits, pause mechanisms and incident history." },
    ],
    misconceptions: [
      { myth: "A bridged token is the same as the original.", reality: "A wrapped token is a claim on assets locked by the bridge. If the bridge fails, the claim can become worthless." },
      { myth: "More connected chains means more security.", reality: "Reach and security are different; each new connection adds attack surface." },
      { myth: "Messaging protocols remove trust.", reality: "They move it to verifiers, configuration and code." },
    ],
    risks: [
      "Compromised verifiers or keys releasing funds without a real deposit.",
      "Contract bugs in bridge logic.",
      "Wrapped tokens losing their backing, with contagion to every chain that uses them.",
    ],
    quiz: [
      {
        question: "What defines a bridge's security?",
        options: ["The number of chains it supports", "Who verifies events on the source chain", "Its token's market cap", "The speed of transfers"],
        answer: 1,
        explanation: "Whoever can attest that a deposit happened can, if compromised, release funds that were never deposited.",
      },
      {
        question: "What is a wrapped token?",
        options: ["A token with a higher yield", "A claim on assets locked by a bridge", "A token that cannot be traded", "A governance token"],
        answer: 1,
        explanation: "Its value depends entirely on the locked assets remaining safe in the bridge.",
      },
      {
        question: "Why are configurable security stacks harder for users to assess?",
        options: [
          "Because they are slower",
          "Because the risk depends on the verifiers each application chooses, which users rarely check",
          "Because they charge higher fees",
          "Because they only work on one chain",
        ],
        answer: 1,
        explanation: "Two tokens on the same protocol can have very different security depending on their configuration.",
      },
    ],
    sources: [
      { title: "Bridges", publisher: "ethereum.org", url: "https://ethereum.org/en/developers/docs/bridges/" },
      { title: "LayerZero V2 documentation", publisher: "LayerZero", url: "https://docs.layerzero.network/v2" },
      { title: "Cross-Chain Interoperability Protocol (CCIP)", publisher: "Chainlink Docs", url: "https://docs.chain.link/ccip" },
      { title: "Bridges summary", publisher: "L2BEAT", url: "https://l2beat.com/bridges/summary" },
    ],
  },

  "validator-decentralization": {
    minute:
      "Counting validators says little about who controls a network. Decentralisation is measured by how many independent entities would have to collude to halt or censor the chain, how diverse its software and hosting are, and who can change its rules.",
    steps: [
      { title: "Group by entity", text: "Many validators can belong to one company, exchange or staking pool. Count independent entities, not nodes." },
      { title: "Nakamoto coefficient", text: "The minimum number of entities that together control enough stake to halt or censor the chain. On Ethereum, more than one third of stake can stop finality." },
      { title: "Client diversity", text: "If one software client runs most nodes, a single bug can stall the network or cause mass penalties." },
      { title: "Hosting and geography", text: "Concentration in a few cloud providers or countries creates shared points of failure and legal pressure points." },
      { title: "Governance", text: "Who can upgrade the protocol, whether a foundation or a company can change the rules, and how hard it would be to coordinate a fork." },
    ],
    visual: "table",
    table: {
      columns: ["What to measure", "Warning sign"],
      rows: [
        { label: "Stake", values: ["Share held by the largest entities; Nakamoto coefficient", "A handful of entities together above one third"] },
        { label: "Clients", values: ["Share of nodes running each client implementation", "One client above two thirds"] },
        { label: "Hosting", values: ["Share of nodes per cloud provider and per country", "Most nodes in one provider or jurisdiction"] },
        { label: "Hardware", values: ["Cost and bandwidth needed to run a node", "Only data centres can keep up"] },
        { label: "Governance", values: ["Who can upgrade the protocol, and with what delay", "One organisation can change the rules alone"] },
      ],
    },
    visualCaption: "A checklist for decentralisation: five dimensions, each with its own warning sign.",
    example: {
      projects: ["ethereum", "solana", "hyperliquid"],
      title: "Three networks, three trade-offs",
      paragraphs: [
        "Ethereum runs several independent execution and consensus clients, which limits the impact of a bug in any one of them. Solana added a second independently written validator client, Firedancer, after outages in 2021-2022 and a halt of about five hours in February 2024; its dossier also notes high hardware costs and stake concentrated among large operators.",
        "Hyperliquid shows the trade-off from the other side: a small validator set and centralised development buy performance, and the dossier treats them as explicit trust assumptions rather than hiding them.",
      ],
    },
    metrics: [
      { label: "Nakamoto coefficient", read: "The smaller it is, the fewer parties need to collude to halt or censor the chain." },
      { label: "Client shares", read: "No client should approach two thirds of the network." },
      { label: "Top entities' stake", read: "Share of stake held by the ten largest entities, including exchanges and liquid staking protocols." },
      { label: "Hosting concentration", read: "Share of nodes in the largest cloud provider and in the largest country." },
    ],
    misconceptions: [
      { myth: "Thousands of validators means a decentralised network.", reality: "If a few entities run most of them, the effective number is small." },
      { myth: "Decentralisation is binary.", reality: "It is a spectrum across several dimensions, and a trade-off with performance." },
      { myth: "A decentralised network cannot be changed.", reality: "Its rules change through coordination. The real question is who can force a change, and how easily." },
    ],
    risks: [
      "Correlated failures from shared clients, clouds or operators.",
      "Censorship by a few entities under legal or commercial pressure.",
      "Capture of governance by a foundation, company or large holders.",
    ],
    quiz: [
      {
        question: "What does the Nakamoto coefficient measure?",
        options: ["The number of nodes", "The minimum number of entities that together could halt or censor the chain", "The block time", "The number of tokens burned"],
        answer: 1,
        explanation: "It turns concentration into a single number: how many independent parties would need to collude.",
      },
      {
        question: "Why does client diversity matter?",
        options: ["It lowers fees", "A bug in a dominant client could stall the network or cause mass penalties", "It increases token supply", "It speeds up blocks"],
        answer: 1,
        explanation: "When software is diverse, a bug in one client affects only part of the network.",
      },
      {
        question: "A chain has 2,000 validators, but three staking providers control 40% of the stake. What is the main concern?",
        options: ["Nothing, 2,000 validators is plenty", "Together, those three could stop finality, being above one third", "Fees will rise", "The token will be delisted"],
        answer: 1,
        explanation: "On a BFT-style chain, more than one third of stake acting together can prevent finality.",
      },
    ],
    sources: [
      { title: "Client diversity", publisher: "ethereum.org", url: "https://ethereum.org/en/developers/docs/nodes-and-clients/client-diversity/" },
      { title: "Client diversity dashboard", publisher: "clientdiversity.org", url: "https://clientdiversity.org" },
      { title: "Proof-of-stake attack and defense", publisher: "ethereum.org", url: "https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/attack-and-defense/" },
      { title: "Nodes and clients", publisher: "ethereum.org", url: "https://ethereum.org/en/developers/docs/nodes-and-clients/" },
    ],
  },

  "burn-mechanisms": {
    minute:
      "A burn permanently removes tokens from supply. It can be built into the protocol, like Ethereum's burned base fee, or funded by revenue through buy-and-burn. A burn only matters if real usage pays for it, and only the net change, issuance minus burn, tells you whether supply is shrinking.",
    steps: [
      { title: "Destroy the tokens", text: "Tokens are sent to an address from which they can never be spent, or destroyed directly by the contract." },
      { title: "Protocol burns", text: "Some protocols burn part of every fee automatically, as Ethereum does with the base fee since EIP-1559." },
      { title: "Buy-and-burn", text: "Others use revenue to buy tokens on the market and burn them, linking token supply to business activity." },
      { title: "Buyback and hold", text: "Tokens can also be bought and kept in a fund or treasury rather than destroyed: economically close, but they could return to circulation." },
      { title: "Net it out", text: "Compare the burn with issuance and unlocks over a full market cycle, not just in a busy month." },
    ],
    visual: "table",
    table: {
      columns: ["Protocol burn", "Buy-and-burn", "Buyback and hold"],
      rows: [
        { label: "How it works", values: ["Fees destroyed by protocol rules", "Revenue buys tokens on the market, then destroys them", "Revenue buys tokens, kept in a fund or treasury"] },
        { label: "Funded by", values: ["Usage fees", "Protocol revenue", "Protocol revenue"] },
        { label: "Example in coverage", values: ["Ethereum base fee (EIP-1559)", "Uniswap UNIfication proposal", "Hyperliquid Assistance Fund"] },
        { label: "What to check", values: ["Burn versus issuance", "Source of the revenue and buying price", "Whether the tokens can come back"] },
      ],
    },
    visualCaption: "Three ways protocols reduce circulating supply, and the question to ask about each.",
    example: {
      projects: ["ethereum", "uniswap", "hyperliquid"],
      title: "Burns across the coverage",
      paragraphs: [
        "Ethereum burns the base fee of every transaction. The dossier notes that since rollups moved their data to low-cost blobs, less fee has been burned on mainnet and net supply has trended inflationary: the burn depends on base-layer demand.",
        "Uniswap's UNIfication proposal would burn UNI with protocol fees and Unichain sequencer fees, while Hyperliquid directs fees to an Assistance Fund that buys HYPE. Both tie the token to usage, the condition that makes a burn meaningful.",
      ],
    },
    metrics: [
      { label: "Net supply change", read: "Issuance and unlocks minus burns over the same period. The only number that says whether supply shrinks." },
      { label: "What funds the burn", read: "Recurring user fees, or treasury reserves and one-off events." },
      { label: "Burn as a share of supply", read: "How much of the supply is removed per year. Small percentages have small effects." },
      { label: "Consistency across cycles", read: "Burns tied to activity shrink in quiet markets. Look at a full cycle." },
    ],
    misconceptions: [
      { myth: "A deflationary token will go up.", reality: "Lower supply only helps if demand holds. Price depends on both." },
      { myth: "Every burn returns value to holders.", reality: "Burns funded by the treasury or a one-off event create no new value; burns funded by recurring revenue do." },
      { myth: "A large burn announcement means a large effect.", reality: "Compare the burn with total supply, and with issuance and unlocks over the same period." },
    ],
    risks: [
      "Burns that fade when activity drops.",
      "Marketing burns that do not reflect real revenue.",
      "Regulatory scrutiny of revenue-funded buybacks.",
    ],
    quiz: [
      {
        question: "What determines whether a token's supply actually shrinks?",
        options: ["The size of the largest burn", "Burns exceeding issuance and unlocks over the period", "The number of holders", "The price"],
        answer: 1,
        explanation: "Only the net change counts: tokens destroyed minus tokens created or unlocked.",
      },
      {
        question: "Which burn creates the most durable value for holders?",
        options: ["A one-time burn of treasury tokens", "A burn funded by recurring usage revenue", "A burn announced on social media", "A burn of tokens that were never in circulation"],
        answer: 1,
        explanation: "Recurring revenue keeps funding the burn; one-off burns do not change the economics.",
      },
      {
        question: "Ethereum burns fees, yet its supply can grow. Why?",
        options: ["The burn is reversed every year", "When issuance to validators exceeds the base fee burned", "Because of halvings", "Because burned ETH is re-minted"],
        answer: 1,
        explanation: "In quiet periods, the base fee burned is smaller than the new ETH paid to validators, so net supply rises.",
      },
    ],
    sources: [
      { title: "EIP-1559: Fee market change for ETH 1.0 chain", publisher: "Ethereum Improvement Proposals", url: "https://eips.ethereum.org/EIPS/eip-1559" },
      { title: "Gas and fees", publisher: "ethereum.org", url: "https://ethereum.org/en/developers/docs/gas/" },
      { title: "UNIfication", publisher: "Uniswap Labs blog", url: "https://blog.uniswap.org/unification" },
      { title: "ETH supply dashboard", publisher: "ultrasound.money", url: "https://ultrasound.money" },
    ],
  },

  "governance-tokens": {
    minute:
      "A governance token gives its holders a vote on a protocol's decisions: fee settings, treasury spending, upgrades. Voting rights are not cash-flow rights: many governance tokens give no direct claim on revenue, and real influence often sits with a few large holders and delegates.",
    steps: [
      { title: "Discuss", text: "Proposals usually start on a public forum, where delegates and the community debate them." },
      { title: "Signal", text: "An off-chain poll often tests support before anything binding happens." },
      { title: "Vote on-chain", text: "Token holders, or the delegates they chose, vote. A proposal needs a quorum and a majority to pass." },
      { title: "Wait in a timelock", text: "Passed proposals wait for a delay before execution, giving users time to react or exit." },
      { title: "Execute, or veto", text: "The change executes automatically. Some systems keep emergency powers for a council, or give another group a veto." },
    ],
    visual: "flow",
    flow: {
      nodes: [
        { title: "Forum", text: "Open debate on the proposal." },
        { title: "Signal", text: "An off-chain poll of support." },
        { title: "On-chain vote", text: "Quorum and majority required." },
        { title: "Timelock", text: "A delay before anything changes." },
        { title: "Execution", text: "The contracts apply the decision." },
      ],
      outcomes: { positive: "Transparent rules, delegated expertise and time to exit before changes apply.", negative: "Low turnout and concentrated votes can let a few holders steer the treasury." },
    },
    visualCaption: "The typical life of a DAO proposal.",
    example: {
      projects: ["arbitrum", "optimism", "lido"],
      title: "How governance differs across the coverage",
      paragraphs: [
        "ARB, OP, UNI and LDO are governance tokens in Sensitor's coverage. The Arbitrum DAO controls a large treasury and sequencer revenue, but any distribution to ARB holders would require a governance decision. The Optimism Collective splits power between a Token House of OP holders and a Citizens' House.",
        "Lido's Dual Governance goes further: stETH holders, not only LDO holders, are meant to be able to delay DAO decisions they object to, a check on the token holders themselves.",
      ],
    },
    metrics: [
      { label: "Voter turnout", read: "The share of supply that votes. Low turnout makes outcomes easier to capture." },
      { label: "Concentration", read: "The share of voting power held by the top delegates and insiders." },
      { label: "Treasury", read: "Its size, composition and spending: often the most important thing governance controls." },
      { label: "Safeguards", read: "Proposal thresholds, quorum, timelocks and emergency powers." },
    ],
    misconceptions: [
      { myth: "Holding a governance token entitles me to fees.", reality: "Only if governance decides so. Most governance tokens carry no automatic economic rights." },
      { myth: "DAO decisions are decentralised by definition.", reality: "A few delegates or insiders often decide outcomes." },
      { myth: "Governance can change anything instantly.", reality: "Timelocks, councils and on-chain limits constrain what can change, and how fast." },
    ],
    risks: [
      "Capture by large holders or coordinated delegates.",
      "Governance attacks with borrowed or bought voting power.",
      "Treasury misuse and regulatory uncertainty over token holder rights.",
    ],
    quiz: [
      {
        question: "Does a governance token automatically give a share of revenue?",
        options: ["Yes, always", "No, only if governance decides to distribute value", "Only on Ethereum", "Only after a halving"],
        answer: 1,
        explanation: "Voting rights and economic rights are separate; the second must be created by a decision.",
      },
      {
        question: "Why do timelocks matter?",
        options: ["They make votes cheaper", "They give users time to react or exit before a change executes", "They increase token supply", "They hide votes"],
        answer: 1,
        explanation: "A delay between approval and execution protects users from sudden harmful changes.",
      },
      {
        question: "What is a governance attack?",
        options: ["A hack of the website", "Acquiring or borrowing enough votes to pass a self-serving proposal", "A drop in turnout", "A fork of the code"],
        answer: 1,
        explanation: "If voting power can be bought or borrowed cheaply, an attacker can vote treasury funds to themselves.",
      },
    ],
    sources: [
      { title: "Decentralized autonomous organizations (DAOs)", publisher: "ethereum.org", url: "https://ethereum.org/en/dao/" },
      { title: "A gentle introduction to Arbitrum DAO governance", publisher: "Arbitrum Foundation", url: "https://docs.arbitrum.foundation/gentle-intro-dao-governance" },
      { title: "Welcome to the Optimism Collective", publisher: "Optimism Collective", url: "https://community.optimism.io/welcome/welcome-overview" },
      { title: "Tally governance platform", publisher: "Tally", url: "https://www.tally.xyz" },
    ],
  },

  "synthetic-dollars": {
    minute:
      "A synthetic dollar holds crypto collateral and opens an equal short position in perpetual futures, so that price moves cancel out and the combined value stays close to one dollar. It earns yield from funding payments and staking rewards, and carries risks that a cash-backed stablecoin does not.",
    steps: [
      { title: "Deposit collateral", text: "Users deposit assets such as BTC, ETH, liquid staking tokens or stable assets to mint the synthetic dollar." },
      { title: "Hedge", text: "The protocol shorts perpetual futures of the same size, so a fall in the collateral's price is offset by a gain on the short: the position is delta-neutral." },
      { title: "Keep custody separate", text: "Collateral sits with off-exchange custodians while serving as margin, which limits exposure to the failure of any single exchange." },
      { title: "Earn yield", text: "Funding paid by longs when it is positive, plus staking rewards on the collateral, flows to holders who stake the token." },
      { title: "Absorb stress", text: "When funding turns negative or redemptions surge, a reserve fund and the ability to shift backing to safer assets cushion the system." },
    ],
    visual: "flow",
    flow: {
      nodes: [
        { title: "Collateral", text: "BTC, ETH, staking tokens or stable assets." },
        { title: "Mint", text: "The synthetic dollar is issued." },
        { title: "Short perpetuals", text: "An equal short hedges the price." },
        { title: "Delta-neutral", text: "Price moves cancel out." },
        { title: "Yield", text: "Funding and staking rewards to stakers." },
      ],
      outcomes: {
        positive: "Dollar exposure with crypto-native yield, scaling with derivatives markets rather than bank deposits.",
        negative: "Depends on funding, exchanges, custodians and hedging; mass redemptions in a crash test its liquidity.",
      },
    },
    visualCaption: "How a hedged position becomes a dollar, and where its yield comes from.",
    example: {
      projects: ["ethena"],
      title: "Ethena's USDe",
      paragraphs: [
        "USDe is backed by crypto assets hedged with short perpetual futures, plus stable assets. Holders who stake it receive sUSDe, which earns yield from funding and staking rewards. A reserve fund is designed to absorb periods of negative funding, and USDtb, a separate stablecoin backed mainly by tokenised Treasury funds, can serve as backing when funding is unattractive.",
        "The dossier notes that the smart contracts are relatively simple: the main risks are operational, in exchanges, custodians and the execution of the hedge.",
      ],
    },
    metrics: [
      { label: "Funding rates", read: "The main source of yield. Watch the level across exchanges and how long negative periods last." },
      { label: "Reserve fund versus supply", read: "How many weeks of negative funding the buffer could cover." },
      { label: "Collateral mix", read: "The share in volatile crypto versus stable assets, which changes the risk profile." },
      { label: "Exchange and custodian concentration", read: "How much of the hedge sits with any single venue or custodian." },
    ],
    misconceptions: [
      { myth: "A synthetic dollar is a stablecoin like USDC.", reality: "It is backed by a hedged crypto position, not by cash. Its risks are market structure and counterparties." },
      { myth: "Delta-neutral means risk-free.", reality: "It removes exposure to price direction, not funding, basis, exchange or custody risk." },
      { myth: "The yield is fixed.", reality: "It moves with funding rates and can approach zero or turn negative." },
    ],
    risks: [
      "Long periods of negative funding that drain reserves.",
      "The failure of an exchange or custodian holding part of the hedge.",
      "Basis dislocations and mass redemptions during extreme volatility.",
    ],
    quiz: [
      {
        question: "What keeps a synthetic dollar's value stable?",
        options: ["Cash in a bank", "A short perpetual position that offsets moves in the collateral's price", "A central bank guarantee", "Daily votes by holders"],
        answer: 1,
        explanation: "Long collateral plus an equal short leaves a position whose dollar value barely moves with price.",
      },
      {
        question: "Where does most of the yield come from?",
        options: ["Interest from bank deposits", "Funding payments and staking rewards", "Trading fees on the token", "New token issuance"],
        answer: 1,
        explanation: "Shorts receive funding when longs pay it, and staked collateral earns staking rewards.",
      },
      {
        question: "What happens when funding turns negative for a long period?",
        options: ["Yield rises", "The short position pays funding, so yield falls and reserves may be drawn down", "Nothing changes", "The protocol mints more tokens to compensate"],
        answer: 1,
        explanation: "Negative funding means shorts pay longs; the system's yield turns into a cost that the reserve must cover.",
      },
    ],
    sources: [
      { title: "How USDe works", publisher: "Ethena", url: "https://docs.ethena.fi/overview/how-usde-works" },
      { title: "Reserve fund", publisher: "Ethena", url: "https://docs.ethena.fi/solution-design/reserve-fund" },
      { title: "Protocol revenue", publisher: "Ethena", url: "https://docs.ethena.fi/backing-assets/protocol-revenue" },
      { title: "Perpetual contracts guide", publisher: "BitMEX", url: "https://www.bitmex.com/app/perpetualContractsGuide" },
    ],
  },
};
