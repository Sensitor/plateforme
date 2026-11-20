export const landing = {
  nav: { primary: "Primary", projects: "Projects", research: "Research", academy: "Academy", methodology: "Methodology", plans: "Plans", explore: "Explore", markets: "Markets", footer: "Footer" },
  open: "Open the platform",
  badge: "Digital Asset Intelligence",
  hero: ["Understand the market.", "Research the projects.", "Master your knowledge."],
  intro:
    "Sensitor is an independent research platform for digital assets. We don't tell you what to buy. We give you the data, the research and the education to understand what you are doing.",
  ctaExplore: "Explore the platform",
  ctaDossier: "Read a research dossier",
  fineprint: "Free to use · No account required · Not investment advice",
  coverage: (sectors: number) => `reference projects documented across ${sectors} sectors`,
  dimensionsTitle: "One environment to discover, understand and manage.",
  available: "Available",
  dimensions: {
    discover: {
      title: "Discover",
      text: "Explore a documented library of projects by sector, blockchain and maturity, with live market data, transparent sources and a map of how they connect.",
      links: ["Explore Projects", "Knowledge Graph"],
    },
    understand: { title: "Understand", text: "Read dossiers built like financial research, compare protocols and learn every concept they use in the Academy.", links: ["Research", "Academy"] },
    manage: {
      title: "Manage",
      text: "Track your portfolio with live prices and see your real exposures: concentration, sectors, shared dependencies, correlations and unlocks, with price alerts by email.",
      links: ["Portfolio", "Watchlist"],
    },
  },
  standardBadge: "Research standard",
  standardTitle: "Facts, interpretations and hypotheses, never mixed.",
  standardText:
    "Every statement in a Sensitor dossier is typed and every fact links to its source. Seven pillars are rated separately, each with its data, limitations and confidence level, and we withhold the composite score when the data is too thin.",
  readMethodology: "Read the methodology →",
  excerptTitle: "Ethereum, excerpt from the dossier",
  excerpt: [
    "The Dencun upgrade (March 2024) introduced blob-carrying transactions (EIP-4844), a cheaper data space designed for rollups.",
    "Since rollups moved data to low-cost blobs, L1 fee burn has been lower and net supply has trended inflationary.",
    "Tokenisation of real-world assets on Ethereum could increase demand for blockspace and ETH as collateral.",
  ],
  principles: [
    ["Independent", "No paid listings, no sponsored ratings."],
    ["Sourced", "Every fact links to a source with its date and limits."],
    ["Comparable", "Metrics adapted to each business model."],
    ["Live data", "Market data shown with provider and timestamp, never invented."],
  ] as [string, string][],
  plansTitle: "Plans",
  plansText: "Indicative pricing. Everything currently in the platform is free while paid tiers are prepared.",
  startFree: "Start exploring, free",
  footerTagline: "Understand. Analyze. Become Independent.",
  disclaimer:
    "SENSITOR provides research and educational content only. Nothing on this site is investment advice, a solicitation or a recommendation to buy or sell any digital asset. Digital assets are highly volatile and you can lose all of your capital. Market data: CoinGecko, CoinPaprika, DefiLlama, Alternative.me.",
  snapshot: {
    title: "Live market snapshot",
    real: "Real data",
    marketCap: "Market cap",
    dominance: "BTC dominance",
    fearGreed: "Fear & Greed",
    sentiment: "Sentiment",
    browse: (n: number) => `Browse all ${n} projects`,
  },
};

export const plans = {
  page: {
    eyebrow: "Plans",
    title: "Choose how deep you want to go",
    description: "Prices are indicative hypotheses. Paid subscriptions will open with Stripe in Phase 4; until then everything available in the app is free.",
    current: "Current plan",
    opensLater: "Subscriptions open in Phase 4",
    note: "A Private Program on application is being designed with a clearly defined pedagogical and regulatory scope. No plan includes personalised buy/sell recommendations or performance promises.",
  },
  available: "Available now",
  planned: "Planned",
  items: {
    free: {
      name: "Free",
      period: "",
      tagline: "Discover the market and the projects.",
      features: ["Overview dashboard", "Project library & live market data", "Research dossiers (limited access at launch)", "Watchlist (up to 10 projects)", "Introductory Academy", "A selection of free analyses"],
    },
    pro: {
      name: "Sensitor Pro",
      period: "/ month",
      tagline: "Full research and tools to analyse with method.",
      features: ["Full access to research dossiers", "Advanced data", "Project comparator", "Portfolio Intelligence", "Advanced watchlists & alerts", "Full Academy", "Research Copilot (fair-use quotas)"],
    },
    club: {
      name: "Research Club",
      period: "/ month",
      tagline: "Go deeper with founder research and the community.",
      features: ["Everything in Pro", "Founder Research", "Deep dives & Weekly Market Intelligence", "Collective sessions & educational lives", "Premium community", "Exclusive content"],
    },
  },
};

export const ui = {
  source: "Source",
  sources: {
    prices: "Prices",
    marketData: "Market data",
    market: "Market",
    marketCap: "Market cap",
    sentiment: "Sentiment",
    tvl: "TVL",
    trend: "Trend",
    fundamentals: "Fundamentals",
  },
  fearGreed: { "Extreme Fear": "Extreme Fear", Fear: "Fear", Neutral: "Neutral", Greed: "Greed", "Extreme Greed": "Extreme Greed" } as Record<string, string>,
  score: { withheld: "Composite withheld", title: "Sensitor composite (mean of seven pillar ratings, 1-5)" },
  risk: (level: string) => `${level} risk`,
  confidenceShort: { high: "High", medium: "Medium", low: "Low" },
  coverage: { full: "Full dossier", partial: "Partial dossier", limited: "Limited data" },
  chart: {
    series: "Chart series",
    range: "Time range",
    sinceLaunch: "since launch",
    over: (range: string) => `over ${range}`,
    error: "Chart data could not be loaded.",
    empty: "No data for this range.",
  },
  dataNotice: { unavailable: "Data temporarily unavailable.", partial: "Partial data." },
  sourcePending: "(source pending)",
  sourcePendingTitle: "This fact has no source attached yet and is pending verification.",
  claims: {
    fact: { label: "Verified fact", short: "Fact" },
    interpretation: { label: "Analyst interpretation", short: "Analysis" },
    hypothesis: { label: "Hypothesis", short: "Hypothesis" },
  },
};
