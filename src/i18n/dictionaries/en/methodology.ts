export const methodology = {
  eyebrow: "Research",
  title: "The Sensitor Research Framework",
  description: "Our analyses are designed to be transparent and reproducible: you should be able to see what we know, how we know it, and where we are guessing.",
  s1: {
    title: "1. Three kinds of statements",
    intro: "Every statement in a dossier is typed. The type is shown next to it, everywhere.",
    fact: "Verifiable from a cited source: protocol rules, documented events, published parameters. A fact without a source is flagged “source pending”.",
    interpretation: "The analyst's reading of the facts: comparisons, assessments, judgements. Reasonable people can disagree.",
    hypothesis: "A forward-looking or uncertain claim. Hypotheses are what the thesis depends on and what could be wrong.",
  },
  s2: {
    title: "2. Seven pillars, rated separately",
    intro: "Each project is assessed on seven pillars on a 1-5 scale (higher = more favourable). Each rating states its criteria, the data used, the sources, the limitations and a confidence level. A pillar can be left **not rated** when data is insufficient.",
  },
  s3: {
    title: "3. When we publish a composite score, and when we don't",
    p1: "The composite is the unweighted mean of the seven pillar ratings. It is **withheld** (shown as “n/a” with the reason) when any pillar is not rated or any pillar is rated with low confidence. A single number built on thin data would be misleading, so we prefer to show nothing.",
    confidence: "Confidence reflects data quality:",
    levels: [
      ["High", "primary sources and robust data"],
      ["Medium", "partial data or reliance on aggregators"],
      ["Low", "sparse, self-reported or unverifiable data"],
    ] as [string, string][],
  },
  s4: {
    title: "4. Metrics adapted to the business model",
    p: "A Layer 1, a lending protocol and a stablecoin are not analysed with the same metrics. Each dossier declares its business model (settlement layer, rollup, lending, exchange, staking protocol, middleware, synthetic dollar, tokenisation, compute network, gaming platform) and lists the metrics that matter for it and why. We distinguish *fees* (paid by users) from *revenue* (retained by the protocol or its token holders).",
  },
  s5: {
    title: "5. Sources and editorial process",
    items: [
      "Primary sources first: whitepapers, official documentation, governance records and regulatory filings; aggregators and research second.",
      "Each source lists what it supports, its publication date, the date its link was last checked, its reliability and its limitations.",
      "Source links are checked automatically (`npm run check:sources`). For **draft** dossiers, only reachability has been verified; peer review confirms that each source still supports its claim.",
      "Live numbers (prices, market caps, TVL, fees) are never written into dossiers: they are fetched from data providers and always displayed with their source and timestamp.",
      "Dossier versions and update dates are displayed on every page.",
    ],
  },
  s6: {
    title: "6. Data providers",
    provider: "Provider",
    usedFor: "Used for",
    notes: "Notes",
    providers: {
      coingecko: ["Prices, market cap, FDV, supply, 7d sparklines, altcoin breadth", "Primary market source. Public API works keyless with rate limits; a Demo/Pro key is recommended in production."],
      coinpaprika: ["Fallback for prices and global metrics", "Used automatically if CoinGecko is unavailable. Sparklines are not available from the fallback."],
      defillama: ["TVL, fees, revenue, stablecoins, historical prices", "Open data with open-source adapters; methodology varies by protocol."],
      alternative: ["Crypto Fear & Greed Index", "Free API with attribution."],
    } as Record<string, [string, string]>,
    fallback: "If every provider is unavailable, Sensitor shows the data as unavailable. We never substitute demo values for market data.",
  },
  s7: {
    title: "7. What this is not",
    before: "Sensitor research is educational. It does not tell anyone what to buy or sell, does not provide personalised recommendations and makes no performance promises. Ratings describe our assessment of a project at a point in time; they are not price targets. See the ",
    link: "Academy",
    after: "to learn the concepts behind each pillar.",
  },
};
