"use client";

import { formatUsdCompact } from "@/lib/format";
import type { SeriesPoint } from "@/lib/market/types";
import { MultiLineChart } from "@/components/charts/multi-line-chart";
import { CATEGORICAL } from "@/components/charts/palette";

export function RegimeChart({ price, ma }: { price: SeriesPoint[]; ma: SeriesPoint[] }) {
  return (
    <MultiLineChart
      label="Bitcoin price versus its 200-day moving average"
      format={(v) => formatUsdCompact(v)}
      series={[
        { key: "price", label: "BTC price", color: CATEGORICAL[0], data: price },
        { key: "ma", label: "200-day moving average", color: CATEGORICAL[1], data: ma, dashed: true },
      ]}
    />
  );
}
