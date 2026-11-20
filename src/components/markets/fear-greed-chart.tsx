"use client";

import type { FearGreedPoint } from "@/lib/market/types";
import { AreaChart } from "@/components/charts/area-chart";
import { useT } from "@/i18n/client";

export function FearGreedChart({ points }: { points: FearGreedPoint[] }) {
  const t = useT().markets.sentiment;
  const data = [...points].reverse().map((p) => ({ t: p.t, v: p.value }));
  return <AreaChart data={data} format={(v) => v.toFixed(0)} height={200} label={t.chartLabel} id="fng" />;
}
