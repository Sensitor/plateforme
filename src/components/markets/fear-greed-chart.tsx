"use client";

import type { FearGreedPoint } from "@/lib/market/types";
import { AreaChart } from "@/components/charts/area-chart";

export function FearGreedChart({ points }: { points: FearGreedPoint[] }) {
  const data = [...points].reverse().map((p) => ({ t: p.t, v: p.value }));
  return <AreaChart data={data} format={(v) => v.toFixed(0)} height={200} label="Fear & Greed Index, last 90 days" id="fng" />;
}
