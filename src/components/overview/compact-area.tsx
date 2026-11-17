"use client";

import { formatUsdCompact } from "@/lib/format";
import type { SeriesPoint } from "@/lib/market/types";
import { AreaChart } from "@/components/charts/area-chart";

export function CompactUsdArea({ data, label, id, height = 80, showAxes = false }: { data: SeriesPoint[]; label: string; id: string; height?: number; showAxes?: boolean }) {
  return <AreaChart data={data} format={formatUsdCompact} height={height} showAxes={showAxes} label={label} id={id.replace(/\W/g, "")} />;
}
