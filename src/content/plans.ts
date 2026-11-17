/** Subscription tiers (indicative prices; Stripe integration planned for Phase 4). */
export const PLANS = [
  {
    id: "free",
    name: "Free",
    price: "0 €",
    period: "",
    tagline: "Discover the market and the projects.",
    features: ["Overview dashboard", "Project library & live market data", "Research dossiers (limited access at launch)", "Watchlist (up to 10 projects)", "Introductory Academy", "A selection of free analyses"],
    status: "Available now",
  },
  {
    id: "pro",
    name: "Sensitor Pro",
    price: "29 €",
    period: "/ month",
    tagline: "Full research and tools to analyse with method.",
    features: ["Full access to research dossiers", "Advanced data", "Project comparator", "Portfolio Intelligence", "Advanced watchlists & alerts", "Full Academy", "Research Copilot (fair-use quotas)"],
    status: "Planned",
    highlight: true,
  },
  {
    id: "club",
    name: "Research Club",
    price: "79 €",
    period: "/ month",
    tagline: "Go deeper with founder research and the community.",
    features: ["Everything in Pro", "Founder Research", "Deep dives & Weekly Market Intelligence", "Collective sessions & educational lives", "Premium community", "Exclusive content"],
    status: "Planned",
  },
];
