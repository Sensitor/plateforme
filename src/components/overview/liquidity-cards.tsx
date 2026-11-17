import { connection } from "next/server";
import { getDefiOverview, getStablecoinOverview } from "@/lib/market/service";
import { formatUsdCompact } from "@/lib/format";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Delta } from "@/components/ui/delta";
import { SourceTag } from "@/components/ui/source-tag";
import { DataNotice } from "@/components/ui/data-notice";
import { CompactUsdArea } from "./compact-area";

export async function LiquidityCards() {
  await connection(); // market data is request-time: never fetched at build
  const [stables, defi] = await Promise.all([getStablecoinOverview(), getDefiOverview()]);
  return (
    <Card className="h-full">
      <CardHeader title="Market intelligence" subtitle="On-chain liquidity over 3 years" />
      <CardBody className="space-y-5">
        {[
          { label: "Stablecoin supply", res: stables, value: stables.data?.totalCirculating, change: stables.data?.change30dPct, series: stables.data?.series },
          { label: "DeFi TVL", res: defi, value: defi.data?.totalTvl, change: defi.data?.change30dPct, series: defi.data?.series },
        ].map((m) => (
          <div key={m.label}>
            <div className="flex items-baseline justify-between">
              <span className="text-[12.5px] text-muted">{m.label}</span>
              <span className="flex items-baseline gap-2">
                <span className="num text-[15px] text-fg">{formatUsdCompact(m.value)}</span>
                <Delta value={m.change} className="text-[12px]" />
                <span className="text-[11px] text-subtle">30d</span>
              </span>
            </div>
            {m.series ? <CompactUsdArea data={m.series} label={`${m.label}, 3 years`} id={m.label} /> : <DataNotice result={m.res} className="mt-2" />}
            <SourceTag result={m.res} />
          </div>
        ))}
      </CardBody>
    </Card>
  );
}

