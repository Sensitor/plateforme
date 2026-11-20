import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";
import { getT } from "@/i18n/server";
import { pageMetadata } from "@/i18n/metadata";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("privateProgram", "/private-program");
}

export default async function PrivateProgramPage() {
  const t = (await getT()).soon.private;
  return (
    <ComingSoon
      eyebrow={t.eyebrow}
      title={t.title}
      phase={t.phase}
      description={t.description}
      planned={t.planned}
      principles={t.principles}
      availableNow={[{ label: t.links.academy, href: "/academy" }, { label: t.links.methodology, href: "/research/methodology" }]}
    />
  );
}
