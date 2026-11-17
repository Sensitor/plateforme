import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Community" };

export default function CommunityPage() {
  return (
    <ComingSoon
      eyebrow="Understand"
      title="Community"
      phase="Phase 4"
      description="A research-first community: discussions organised by project and sector, focused on quality analysis."
      planned={["Discussions by project and by sector", "Sharing analyses and comments", "Collective research sessions", "Educational live sessions and Q&A", "Founder Research publications"]}
      principles={["Quality over volume: moderated, research-oriented discussions.", "No paid promotion or undisclosed sponsorship.", "No buy/sell calls."]}
      availableNow={[{ label: "Research library", href: "/research" }]}
    />
  );
}
