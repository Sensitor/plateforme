import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Portfolio" };

export default function PortfolioPage() {
  return (
    <ComingSoon
      eyebrow="Manage"
      title="Portfolio Intelligence"
      phase="Phase 3"
      description="Track your holdings and understand your risk: allocation, performance and exposure analysis."
      planned={[
        "Manual positions and CSV import (quantity, average cost)",
        "Current value, realised and unrealised P&L",
        "Allocation by asset, sector and blockchain; stablecoin exposure",
        "Performance history",
        "Concentration, historical correlations and liquidity risk",
        "Upcoming token unlocks affecting your holdings",
        "Shared dependencies between protocols and ecosystems",
        "Informative, educational alerts",
      ]}
      principles={[
        "Sensitor will never execute transactions on your behalf.",
        "Sensitor will never ask for a seed phrase or private key.",
        "Exchange connections, when offered, will be read-only.",
        "Portfolio data is private and protected by row-level security.",
      ]}
      availableNow={[
        { label: "Watchlist", href: "/watchlist" },
        { label: "Compare projects", href: "/compare" },
        { label: "Diversification concepts", href: "/academy/concepts/diversification" },
      ]}
    />
  );
}
