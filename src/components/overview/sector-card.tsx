import { SECTOR_COLORS } from "@/lib/brand";
import { connection } from "next/server";
import Link from "next/link";
import { getCoverageQuotes } from "@/lib/market/service";
import { sectorPerformance } from "@/lib/sectors";
import { formatPercent } from "@/lib/format";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { BarList } from "@/components/charts/bar-list";
import { SourceTag } from "@/components/ui/source-tag";

export async function SectorCard({ limit = 7 }: { limit?: number }) {
  await connection(); // market data is request-time: never fetched at build
  const quotes = await getCoverageQuotes();
  const rows = quotes.data ? sectorPerformance(quotes.data).filter((r) => r.change7d != null) : [];
  return (
    <Card className="h-full">
      <CardHeader
        title="Trending sectors"
        subtitle="7-day change, market-cap weighted · Sensitor coverage"
        action={
          <Link href="/markets#sectors" className="text-[12.5px] text-accent hover:text-accent-strong">
            All sectors →
          </Link>
        }
      />
      <CardBody>
        {rows.length ? (
          <BarList
            signed
            format={(v) => formatPercent(v, { digits: 1 })}
            items={rows.slice(0, limit).map((r) => ({
              key: r.sector,
              label: (
                <Link href={`/explore?sector=${r.sector}`} className="inline-flex items-center gap-2 hover:text-fg">
                  <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: SECTOR_COLORS[r.sector] }} aria-hidden />
                  {r.label}
                </Link>
              ),
              value: r.change7d!,
              hint: `${r.count} project${r.count > 1 ? "s" : ""} · leader: ${r.leader?.name}`,
            }))}
          />
        ) : (
          <p className="text-[13px] text-muted">{quotes.note ?? "No sector data available."}</p>
        )}
        <SourceTag result={quotes} className="mt-4" />
      </CardBody>
    </Card>
  );
}
