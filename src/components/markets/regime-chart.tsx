"use client";

import { formatUsdCompact } from "@/lib/format";
import type { SeriesPoint } from "@/lib/market/types";
import { MultiLineChart } from "@/components/charts/multi-line-chart";
import { CATEGORICAL } from "@/components/charts/palette";
import { useT } from "@/i18n/client";

export function RegimeChart({ price, ma }: { price: SeriesPoint[]; ma: SeriesPoint[] }) {
  const t = useT().markets.regime;
  return (
    <MultiLineChart
      label={t.chartLabel}
      format={(v) => formatUsdCompact(v)}
      series={[
        { key: "price", label: t.btcPrice, color: CATEGORICAL[0], data: price },
        { key: "ma", label: t.ma, color: CATEGORICAL[1], data: ma, dashed: true },
      ]}
    />
  );
}
