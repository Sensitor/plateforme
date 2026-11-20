import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";
import { getT } from "@/i18n/server";
import { pageMetadata } from "@/i18n/metadata";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("researchClub", "/research-club");
}

export default async function ResearchClubPage() {
  const t = (await getT()).soon.club;
  return (
    <ComingSoon
      eyebrow={t.eyebrow}
      title={t.title}
      phase={t.phase}
      description={t.description}
      planned={t.planned}
      principles={t.principles}
      availableNow={[{ label: t.links.plans, href: "/pricing" }, { label: t.links.research, href: "/research" }]}
    />
  );
}
