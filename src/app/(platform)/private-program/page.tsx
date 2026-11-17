import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Private Program" };

export default function PrivateProgramPage() {
  return (
    <ComingSoon
      eyebrow="Accompaniment"
      title="Private Program"
      phase="Later, by application"
      description="A future educational accompaniment programme, on application, with a clearly defined pedagogical and regulatory scope."
      planned={["Research methodology coaching", "Understanding fundamentals", "Risk management", "Building a personal analysis method", "Educational sessions and case studies"]}
      principles={[
        "No personalised buy/sell recommendations without prior regulatory validation.",
        "No return promises.",
        "Scope defined with legal counsel before launch.",
      ]}
      availableNow={[{ label: "Academy", href: "/academy" }, { label: "Methodology", href: "/research/methodology" }]}
    />
  );
}
