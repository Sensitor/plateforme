import { Suspense } from "react";
import type { Metadata } from "next";
import { PROJECTS } from "@/content/projects";
import { PageHeader } from "@/components/ui/section-heading";
import { Skeleton } from "@/components/ui/skeleton";
import { CopilotChat, type CopilotProject } from "@/components/copilot/copilot-chat";

export const metadata: Metadata = {
  title: "Research Copilot",
  description: "Ask questions about digital assets. Answers grounded in Sensitor's research dossiers, with sources and typed claims.",
};

export default function CopilotPage() {
  const projects: CopilotProject[] = PROJECTS.map((p) => ({ slug: p.slug, name: p.name, ticker: p.ticker, logo: p.logo })).sort((a, b) => a.name.localeCompare(b.name));
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Understand"
        title="Research Copilot"
        description="Ask about a concept, a project or a comparison. Answers draw on Sensitor's dossiers and cite their sources. Facts, interpretations and hypotheses stay labelled."
      />
      <Suspense fallback={<Skeleton className="h-[560px] w-full rounded-2xl" />}>
        <CopilotChat projects={projects} />
      </Suspense>
    </div>
  );
}
