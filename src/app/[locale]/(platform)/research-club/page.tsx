import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Research Club" };

export default function ResearchClubPage() {
  return (
    <ComingSoon
      eyebrow="Research Club"
      title="Sensitor Research Club"
      phase="Phase 4"
      description="The premium tier for investors who want to go deeper: founder research, deep dives and collective sessions."
      planned={["Founder Research and Founder Notes", "Weekly Market Intelligence", "Project Deep Dives and Sector Intelligence", "Collective research sessions and educational lives", "Premium community", "Exclusive content"]}
      principles={["Education and methodology, not signals.", "No performance promises.", "Transparent sources and conflicts of interest."]}
      availableNow={[{ label: "See plans", href: "/pricing" }, { label: "Research library", href: "/research" }]}
    />
  );
}
