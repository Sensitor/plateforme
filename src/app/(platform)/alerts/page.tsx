import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Alerts" };

export default function AlertsPage() {
  return (
    <ComingSoon
      eyebrow="Manage"
      title="Alerts"
      phase="Phase 2"
      description="Informative alerts on the projects you follow: research updates, unlocks, governance and market events."
      planned={["Dossier updates for watchlist projects", "Token unlock reminders", "Governance proposals and votes", "Price and market-regime thresholds", "Email and in-app notifications"]}
      principles={["Alerts inform; they never recommend buying or selling.", "You control frequency and channels."]}
      availableNow={[{ label: "Unlocks & key dates (Markets)", href: "/markets" }, { label: "Watchlist", href: "/watchlist" }]}
    />
  );
}
