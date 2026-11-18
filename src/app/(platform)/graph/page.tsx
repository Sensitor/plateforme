import { Suspense } from "react";
import type { Metadata } from "next";
import { connection } from "next/server";
import { getCoverageQuotes } from "@/lib/market/service";
import { buildGraph } from "@/lib/graph-layout";
import { PageHeader } from "@/components/ui/section-heading";
import { Skeleton } from "@/components/ui/skeleton";
import { SourceTag } from "@/components/ui/source-tag";
import { KnowledgeGraph } from "@/components/graph/knowledge-graph";

export const metadata: Metadata = {
  title: "Knowledge Graph",
  description: "Interactive map of documented relationships between crypto projects: settlement, deployments, oracles, bridges and competitors.",
};

export default function GraphPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Discover"
        title="Knowledge Graph"
        description="How the projects we cover depend on, build on and compete with each other. Every line is backed by a dossier section or official documentation."
      />
      <Suspense fallback={<Skeleton className="h-[640px] w-full rounded-2xl" />}>
        <GraphData />
      </Suspense>
    </div>
  );
}

async function GraphData() {
  await connection(); // node sizes use live market caps
  const quotes = await getCoverageQuotes();
  const market = quotes.data
    ? Object.fromEntries(Object.entries(quotes.data).map(([slug, q]) => [slug, { marketCap: q.marketCap, price: q.price, change24h: q.change24h }]))
    : null;
  const { nodes, edges, halos } = buildGraph(market);
  return <KnowledgeGraph nodes={nodes} edges={edges} halos={halos} marketNote={<SourceTag result={quotes} label="Market data" />} />;
}
