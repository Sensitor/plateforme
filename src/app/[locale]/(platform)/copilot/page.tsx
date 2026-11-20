import { Suspense } from "react";
import type { Metadata } from "next";
import { PROJECTS } from "@/content/projects";
import { PageHeader } from "@/components/ui/section-heading";
import { Skeleton } from "@/components/ui/skeleton";
import { CopilotChat, type CopilotProject } from "@/components/copilot/copilot-chat";
import { getT } from "@/i18n/server";
import { pageMetadata } from "@/i18n/metadata";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("copilot", "/copilot");
}

export default async function CopilotPage() {
  const t = (await getT()).copilot;
  const projects: CopilotProject[] = PROJECTS.map((p) => ({ slug: p.slug, name: p.name, ticker: p.ticker, logo: p.logo })).sort((a, b) => a.name.localeCompare(b.name));
  return (
    <div className="space-y-6">
      <PageHeader eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <Suspense fallback={<Skeleton className="h-[560px] w-full rounded-2xl" />}>
        <CopilotChat projects={projects} />
      </Suspense>
    </div>
  );
}
