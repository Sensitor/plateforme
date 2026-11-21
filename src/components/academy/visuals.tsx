import { ArrowDown, ArrowRight, Check, RefreshCcw, X } from "lucide-react";
import { PROJECT_BY_SLUG } from "@/content/projects";
import { modelSupplyCurve } from "@/lib/research/issuance";
import { getT } from "@/i18n/server";
import { tint } from "@/lib/brand";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Flow diagrams (HTML, so they reflow on small screens)               */
/* ------------------------------------------------------------------ */

interface FlowNode {
  title: string;
  text: string;
  loop?: string;
}

export function Flow({ nodes, color, end }: { nodes: FlowNode[]; color: string; end?: React.ReactNode }) {
  return (
    <div>
      <ol className="flex flex-col items-stretch gap-2 md:flex-row md:items-stretch">
        {nodes.map((n, i) => (
          <li key={n.title} className="flex flex-col items-center gap-2 md:flex-1 md:flex-row">
            <div className="w-full flex-1 rounded-lg border border-line bg-bg-elevated p-3.5 md:h-full">
              <div className="num text-[10.5px] text-subtle">{String(i + 1).padStart(2, "0")}</div>
              <div className="mt-1 text-[13.5px] font-medium leading-snug text-fg">{n.title}</div>
              <p className="mt-1 text-[12px] leading-relaxed text-muted">{n.text}</p>
              {n.loop ? (
                <p className="mt-2 inline-flex items-center gap-1.5 rounded-md px-1.5 py-0.5 text-[11px]" style={{ backgroundColor: tint(color, 0.14), color }}>
                  <RefreshCcw className="size-3" aria-hidden /> {n.loop}
                </p>
              ) : null}
            </div>
            {i < nodes.length - 1 ? (
              <>
                <ArrowDown className="size-4 shrink-0 text-subtle md:hidden" aria-hidden />
                <ArrowRight className="hidden size-4 shrink-0 text-subtle md:block" aria-hidden />
              </>
            ) : null}
          </li>
        ))}
      </ol>
      {end}
    </div>
  );
}

export async function PowDiagram({ color }: { color: string }) {
  const v = (await getT()).academy.visuals;
  return <Flow color={color} nodes={v.pow.map(([title, text], i) => ({ title, text, loop: i === 1 ? v.powLoop : undefined }))} />;
}

export function Outcomes({ positive, negative }: { positive: React.ReactNode; negative: React.ReactNode }) {
  return (
    <div className="mt-3 grid gap-2 sm:grid-cols-2">
      <div className="flex items-start gap-2.5 rounded-lg border border-positive/30 bg-positive-soft px-3.5 py-2.5 text-[12.5px] text-fg-2">
        <Check className="mt-0.5 size-4 shrink-0 text-positive" aria-hidden />
        <span>{positive}</span>
      </div>
      <div className="flex items-start gap-2.5 rounded-lg border border-negative/30 bg-negative-soft px-3.5 py-2.5 text-[12.5px] text-fg-2">
        <X className="mt-0.5 size-4 shrink-0 text-negative" aria-hidden />
        <span>{negative}</span>
      </div>
    </div>
  );
}

/** Flow diagram described in lesson content. */
export function FlowFromSpec({ spec, color }: { spec: { nodes: FlowNode[]; outcomes?: { positive: string; negative: string } }; color: string }) {
  return <Flow nodes={spec.nodes} color={color} end={spec.outcomes ? <Outcomes positive={spec.outcomes.positive} negative={spec.outcomes.negative} /> : undefined} />;
}

/** Comparison table described in lesson content. */
export function ComparisonTable({ spec }: { spec: { columns: string[]; rows: { label: string; values: string[] }[] } }) {
  return (
    <div className="relative overflow-x-auto rounded-xl border border-line">
      <table className="w-full min-w-[560px] border-collapse text-left text-[12.5px]">
        <thead>
          <tr className="bg-bg-elevated">
            <th scope="col" className="w-[130px] px-3.5 py-2.5" />
            {spec.columns.map((h) => (
              <th key={h} scope="col" className="px-3.5 py-2.5 text-[13px] font-semibold text-fg">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {spec.rows.map((r) => (
            <tr key={r.label} className="border-t border-line align-top">
              <th scope="row" className="px-3.5 py-2.5 text-[11px] font-medium uppercase tracking-[0.1em] text-muted">
                {r.label}
              </th>
              {r.values.map((v, i) => (
                <td key={`${r.label}-${i}`} className="px-3.5 py-2.5 leading-relaxed text-fg-2">
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export async function PosDiagram({ color }: { color: string }) {
  const v = (await getT()).academy.visuals;
  return (
    <Flow
      color={color}
      nodes={v.pos.map(([title, text]) => ({ title, text }))}
      end={
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <div className="flex items-start gap-2.5 rounded-lg border border-positive/30 bg-positive-soft px-3.5 py-2.5 text-[12.5px] text-fg-2">
            <Check className="mt-0.5 size-4 shrink-0 text-positive" aria-hidden />
            <span>
              <span className="font-medium text-fg">{v.reward[0]}</span> {v.reward[1]}
            </span>
          </div>
          <div className="flex items-start gap-2.5 rounded-lg border border-negative/30 bg-negative-soft px-3.5 py-2.5 text-[12.5px] text-fg-2">
            <X className="mt-0.5 size-4 shrink-0 text-negative" aria-hidden />
            <span>
              <span className="font-medium text-fg">{v.penalty[0]}</span> {v.penalty[1]}
            </span>
          </div>
        </div>
      }
    />
  );
}

function CallBox({ label, text, depth, tone }: { label: string; text: string; depth: number; tone?: string }) {
  return (
    <div className="flex items-stretch gap-2" style={{ paddingLeft: depth * 20 }}>
      {depth ? <span className="mt-4 h-px w-3 shrink-0 bg-line-strong" aria-hidden /> : null}
      <div className="flex-1 rounded-lg border border-line bg-bg-elevated px-3.5 py-2.5" style={tone ? { borderColor: tint(tone, 0.45) } : undefined}>
        <div className="text-[13px] font-medium text-fg">{label}</div>
        <div className="text-[12px] text-muted">{text}</div>
      </div>
    </div>
  );
}

export async function ContractsDiagram({ color }: { color: string }) {
  const v = (await getT()).academy.visuals;
  const depths = [0, 1, 2, 2];
  return (
    <div className="space-y-2">
      {v.contracts.map(([label, text], i) => (
        <CallBox key={label} label={label} text={text} depth={depths[i]} tone={i === 0 ? color : undefined} />
      ))}
      <p className="pl-1 pt-1 text-[12px] text-muted">{v.contractsNote}</p>
    </div>
  );
}

function Lane({ label, children, tone }: { label: string; children: React.ReactNode; tone: string }) {
  return (
    <div className="rounded-xl border border-line p-3" style={{ backgroundColor: tint(tone, 0.05) }}>
      <div className="mb-2 text-[10.5px] font-medium uppercase tracking-[0.14em]" style={{ color: tone }}>
        {label}
      </div>
      <div className="grid gap-2 md:grid-cols-3">{children}</div>
    </div>
  );
}

function LaneNode({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-lg border border-line bg-bg-elevated px-3 py-2.5">
      <div className="text-[13px] font-medium text-fg">{title}</div>
      <div className="mt-0.5 text-[12px] leading-relaxed text-muted">{text}</div>
    </div>
  );
}

export async function RollupDiagram({ color }: { color: string }) {
  const v = (await getT()).academy.visuals;
  return (
    <div className="space-y-2">
      <Lane label={v.rollupLane} tone={color}>
        {v.rollup.map(([title, text]) => (
          <LaneNode key={title} title={title} text={text} />
        ))}
      </Lane>
      <div className="flex items-center justify-center gap-2 text-[11.5px] text-muted">
        <ArrowDown className="size-4 text-subtle" aria-hidden /> {v.rollupArrow}
      </div>
      <Lane label={v.ethereumLane} tone="#8C8CF5">
        {v.ethereum.map(([title, text]) => (
          <LaneNode key={title} title={title} text={text} />
        ))}
      </Lane>
    </div>
  );
}

export async function StablecoinModels() {
  const v = (await getT()).academy.visuals;
  const rows = v.stablecoinRows.map(([label, ...values]) => ({ label, values }));
  const heads = v.stablecoinHeads;
  return (
    <div className="relative overflow-x-auto rounded-xl border border-line">
      <table className="w-full min-w-[560px] border-collapse text-left text-[12.5px]">
        <thead>
          <tr className="bg-bg-elevated">
            <th scope="col" className="w-[120px] px-3.5 py-2.5" />
            {heads.map((h) => (
              <th key={h} scope="col" className="px-3.5 py-2.5 text-[13px] font-semibold text-fg">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-t border-line align-top">
              <th scope="row" className="px-3.5 py-2.5 text-[11px] font-medium uppercase tracking-[0.1em] text-muted">
                {r.label}
              </th>
              {r.values.map((cell) => (
                <td key={cell} className="px-3.5 py-2.5 leading-relaxed text-fg-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Computed charts (SVG lines, HTML labels so text stays readable)     */
/* ------------------------------------------------------------------ */

export function ChartFrame({ children, height = 240, yLeft, yRight, xLabels }: { children: React.ReactNode; height?: number; yLeft?: string[]; yRight?: string[]; xLabels: { pct: number; label: string }[] }) {
  return (
    <div className="flex gap-2">
      {yLeft ? (
        <div className="num flex flex-col justify-between py-0 text-right text-[10.5px] text-subtle" style={{ height }}>
          {yLeft.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      ) : null}
      <div className="min-w-0 flex-1">
        <div className="relative rounded-md border border-line bg-bg-elevated" style={{ height }}>
          <div className="absolute inset-0 flex flex-col justify-between" aria-hidden>
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-px bg-line/50" />
            ))}
          </div>
          {children}
        </div>
        <div className="relative mt-1.5 h-4">
          {xLabels.map((x) => (
            <span
              key={x.label}
              className={cn("num absolute whitespace-nowrap text-[10.5px] text-subtle", x.pct >= 92 ? "-translate-x-full" : x.pct <= 4 ? "" : "-translate-x-1/2")}
              style={{ left: `${x.pct}%` }}
            >
              {x.label}
            </span>
          ))}
        </div>
      </div>
      {yRight ? (
        <div className="num flex flex-col justify-between text-[10.5px] text-subtle" style={{ height }}>
          {yRight.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export async function HalvingChart() {
  const v = (await getT()).academy.visuals;
  // Fixed, distinct hues: supply in Sensitor indigo, subsidy in Bitcoin orange (each labelled in the legend).
  const color = "#7896FF";
  const btc = PROJECT_BY_SLUG.bitcoin;
  const model = btc?.dossier.tokenomics.issuance;
  if (!model || model.kind !== "halving") return null;
  const supply = modelSupplyCurve(model);
  const t0 = Date.parse(model.genesisDate);
  const t1 = Date.UTC(model.untilYear, 0, 1);
  const x = (t: number) => ((t - t0) / (t1 - t0)) * 1000;
  // Halving dates: known ones, then projected at the target block time.
  const epochMs = model.blocksPerHalving * model.blockTimeSec * 1000;
  const halvings: { t: number; known: boolean }[] = (model.knownHalvings ?? []).map((d) => ({ t: Date.parse(d), known: true }));
  while (halvings.length && halvings[halvings.length - 1].t + epochMs < t1) halvings.push({ t: halvings[halvings.length - 1].t + epochMs, known: false });
  const subsidyAt = (i: number) => model.initialReward / 2 ** i;
  const H = 300;
  const ySub = (v: number) => H - (v / model.initialReward) * (H - 12);
  const ySup = (v: number) => H - (v / model.maxSupply) * (H - 12);
  let step = `M0,${ySub(subsidyAt(0))}`;
  halvings.forEach((h, i) => {
    step += `H${x(h.t).toFixed(1)}V${ySub(subsidyAt(i + 1)).toFixed(1)}`;
  });
  step += "H1000";
  const supplyPath = supply.map((p, i) => `${i ? "L" : "M"}${x(p.t).toFixed(1)},${ySup(p.v).toFixed(1)}`).join("");
  const years = [2009, 2012, 2016, 2020, 2024, 2028, 2032, 2036, 2040].filter((y) => Date.UTC(y, 0, 1) <= t1);
  const subsidyColor = btc.accent;
  return (
    <div>
      <ChartFrame
        yLeft={["21M", "10.5M", "0"]}
        yRight={["50", "25", "0"]}
        xLabels={years.map((y) => ({ pct: (x(Date.UTC(y, 0, 1)) / 1000) * 100, label: String(y) }))}
      >
        <svg viewBox={`0 0 1000 ${H}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full" role="img" aria-label={v.halvingAria}>
          {halvings.map((h) => (
            <line key={h.t} x1={x(h.t)} x2={x(h.t)} y1={0} y2={H} stroke="#3a4150" strokeDasharray={h.known ? undefined : "4 4"} vectorEffect="non-scaling-stroke" />
          ))}
          <path d={step} fill="none" stroke={subsidyColor} strokeWidth={2} vectorEffect="non-scaling-stroke" />
          <path d={supplyPath} fill="none" stroke={color} strokeWidth={2.25} vectorEffect="non-scaling-stroke" />
        </svg>
      </ChartFrame>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[12px] text-muted">
        <span className="inline-flex items-center gap-2">
          <span className="h-0.5 w-4" style={{ backgroundColor: color }} aria-hidden /> {v.halvingLegend[0]}
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-0.5 w-4" style={{ backgroundColor: subsidyColor }} aria-hidden /> {v.halvingLegend[1]}
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-px bg-[#3a4150]" aria-hidden /> {v.halvingLegend[2]}
        </span>
      </div>
    </div>
  );
}

export async function VestingChart({ color }: { color: string }) {
  const vt = (await getT()).academy.visuals;
  // Illustrative: 4-year vesting, 1-year cliff (25% at the cliff), then monthly.
  const pts: [number, number][] = [[0, 0], [12, 0], [12, 25]];
  let prev = 25;
  for (let m = 13; m <= 48; m++) {
    const v = 25 + ((m - 12) / 36) * 75;
    pts.push([m, prev], [m, v]);
    prev = v;
  }
  const H = 240;
  const path = pts.map(([m, v], i) => `${i ? "L" : "M"}${((m / 48) * 1000).toFixed(1)},${(H - (v / 100) * (H - 10)).toFixed(1)}`).join("");
  return (
    <div>
      <ChartFrame height={220} yLeft={["100%", "50%", "0%"]} xLabels={[0, 12, 24, 36, 48].map((m) => ({ pct: (m / 48) * 100, label: `M${m}` }))}>
        <svg viewBox={`0 0 1000 ${H}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full" role="img" aria-label={vt.vestingAria}>
          <rect x={0} y={0} width={250} height={H} fill={tint(color, 0.06)} />
          <path d={`${path}L1000,${H}L0,${H}Z`} fill={tint(color, 0.12)} />
          <path d={path} fill="none" stroke={color} strokeWidth={2} vectorEffect="non-scaling-stroke" />
        </svg>
        <span className="absolute left-2 top-2 text-[11px] text-muted">{vt.vestingNotes[0]}</span>
        <span className="absolute left-[26%] top-[80%] text-[11px] text-fg-2">{vt.vestingNotes[1]}</span>
        <span className="absolute bottom-2 right-2 text-[11px] text-fg-2">{vt.vestingNotes[2]}</span>
      </ChartFrame>
      <p className={cn("mt-2 text-[12px] text-muted")}>{vt.vestingCaption}</p>
    </div>
  );
}
