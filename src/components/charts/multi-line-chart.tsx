"use client";

import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { SeriesPoint } from "@/lib/market/types";
import { CHART } from "./palette";
import { useLocale } from "@/i18n/client";
import { INTL_LOCALE } from "@/i18n/config";

export interface LineSeries {
  key: string;
  label: string;
  color: string;
  data: SeriesPoint[];
  dashed?: boolean;
}

/** Multiple series sharing ONE axis and unit (never dual-axis). Legend always shown. */
export function MultiLineChart({ series, format, height = 240, label }: { series: LineSeries[]; format: (v: number) => string; height?: number; label: string }) {
  const map = new Map<number, Record<string, number>>();
  for (const s of series) for (const p of s.data) map.set(p.t, { ...(map.get(p.t) ?? { t: p.t }), [s.key]: p.v });
  const rows = [...map.values()].sort((a, b) => a.t - b.t);
  const tag = INTL_LOCALE[useLocale()];
  const dateFmt = (t: number) => new Intl.DateTimeFormat(tag, { day: "numeric", month: "short", timeZone: "UTC" }).format(t);
  return (
    <div style={{ height }} role="img" aria-label={label}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={rows} margin={{ top: 8, right: 4, bottom: 0, left: 0 }}>
          <CartesianGrid stroke={CHART.grid} vertical={false} />
          <XAxis dataKey="t" type="number" scale="time" domain={["dataMin", "dataMax"]} tickFormatter={dateFmt} tick={{ fill: CHART.axis, fontSize: 11 }} axisLine={false} tickLine={false} minTickGap={48} />
          <YAxis orientation="right" domain={["auto", "auto"]} tickFormatter={format} tick={{ fill: CHART.axis, fontSize: 11 }} axisLine={false} tickLine={false} width={64} />
          <Tooltip
            cursor={{ stroke: CHART.axis, strokeDasharray: "3 3" }}
            content={({ active, payload, label: t }) => {
              if (!active || !payload?.length) return null;
              return (
                <div className="rounded-lg border border-line-strong bg-surface-2 px-3 py-2 shadow-xl">
                  <div className="text-[11px] text-muted">{dateFmt(Number(t))}</div>
                  {payload.map((p) => (
                    <div key={String(p.dataKey)} className="mt-0.5 flex items-center gap-2 text-[12.5px]">
                      <span className="size-2 rounded-full" style={{ background: p.color }} />
                      <span className="text-fg-2">{series.find((s) => s.key === p.dataKey)?.label}</span>
                      <span className="num ml-auto pl-3 text-fg">{format(Number(p.value))}</span>
                    </div>
                  ))}
                </div>
              );
            }}
          />
          <Legend verticalAlign="top" align="left" height={28} iconType="plainline" formatter={(v) => <span className="text-[12px] text-fg-2">{series.find((s) => s.key === v)?.label}</span>} />
          {series.map((s) => (
            <Line key={s.key} type="monotone" dataKey={s.key} stroke={s.color} strokeWidth={2} strokeDasharray={s.dashed ? "5 4" : undefined} dot={false} isAnimationActive={false} connectNulls />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
