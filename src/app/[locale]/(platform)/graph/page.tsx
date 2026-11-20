import { Suspense } from "react";
import type { Metadata } from "next";
import { connection } from "next/server";
import { getCoverageQuotes } from "@/lib/market/service";
import { buildGraph } from "@/lib/graph-layout";
import { PageHeader } from "@/components/ui/section-heading";
import { Skeleton } from "@/components/ui/skeleton";
import { SourceTag } from "@/components/ui/source-tag";
import { KnowledgeGraph } from "@/components/graph/knowledge-graph";
import { getT } from "@/i18n/server";
import { pageMetadata } from "@/i18n/metadata";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("graph", "/graph");
}

export default async function GraphPage() {
  const t = (await getT()).graph;
  return (
    <div className="space-y-6">
      <PageHeader eyebrow={t.eyebrow} title={t.title} description={t.description} />
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
  const dict = await getT();
  const { nodes, edges, halos } = buildGraph(market, dict);
  return <KnowledgeGraph nodes={nodes} edges={edges} halos={halos} marketNote={<SourceTag result={quotes} label={dict.ui.sources.marketData} />} />;
}
