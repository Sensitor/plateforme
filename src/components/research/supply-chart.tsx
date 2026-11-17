"use client";

import type { SeriesPoint } from "@/lib/market/types";
import { formatNumberCompact } from "@/lib/format";
import { AreaChart } from "@/components/charts/area-chart";
import { CHART } from "@/components/charts/palette";

export function SupplyChart({ data, label }: { data: SeriesPoint[]; label: string }) {
  return <AreaChart data={data} format={(v) => formatNumberCompact(v)} height={200} color={CHART.line} label={label} id="supply" />;
}
