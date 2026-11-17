"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { CATEGORICAL, CHART } from "./palette";

export interface DonutSlice {
  label: string;
  value: number;
  note?: string;
}

/**
 * Distribution donut with a full legend (labels + values) so identity is
 * never carried by colour alone. Slices separated by 2px surface gaps.
 */
export function Donut({ data, unit = "%", centerLabel, centerValue }: { data: DonutSlice[]; unit?: string; centerLabel?: string; centerValue?: string }) {
  const slices = data.slice(0, CATEGORICAL.length);
  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
      <div className="relative size-[180px] shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={slices}
              dataKey="value"
              nameKey="label"
              innerRadius={58}
              outerRadius={86}
              paddingAngle={1.2}
              stroke={CHART.surface}
              strokeWidth={2}
              isAnimationActive={false}
              startAngle={90}
              endAngle={-270}
            >
              {slices.map((s, i) => (
                <Cell key={s.label} fill={CATEGORICAL[i]} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const s = payload[0].payload as DonutSlice;
                return (
                  <div className="rounded-lg border border-line-strong bg-surface-2 px-3 py-2 shadow-xl">
                    <div className="text-xs text-fg-2">{s.label}</div>
                    <div className="num text-sm text-fg">
                      {s.value.toFixed(2)}
                      {unit}
                    </div>
                  </div>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        {centerValue ? (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="num text-base font-semibold text-fg">{centerValue}</span>
            {centerLabel ? <span className="text-[11px] text-muted">{centerLabel}</span> : null}
          </div>
        ) : null}
      </div>
      <ul className="w-full min-w-0 space-y-2">
        {slices.map((s, i) => (
          <li key={s.label} className="flex items-start gap-2.5 text-[13px]">
            <span className="mt-1 size-2.5 shrink-0 rounded-sm" style={{ background: CATEGORICAL[i] }} aria-hidden />
            <span className="min-w-0 flex-1 text-fg-2">
              {s.label}
              {s.note ? <span className="block text-[11.5px] text-subtle">{s.note}</span> : null}
            </span>
            <span className="num shrink-0 text-fg">
              {s.value.toFixed(s.value % 1 === 0 ? 0 : 2)}
              {unit}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
