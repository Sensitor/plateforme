"use client";

import { useId, useState } from "react";
import { tint } from "@/lib/brand";
import { cn } from "@/lib/utils";

const nf = (v: number, max = 2) => new Intl.NumberFormat("en-US", { maximumFractionDigits: max }).format(v);
const eth = (gwei: number) => `${(gwei / 1e9).toFixed(gwei / 1e9 < 0.01 ? 6 : 4).replace(/0+$/, "").replace(/\.$/, "")} ETH`;

function NumberField({ label, value, onChange, unit, step = 1 }: { label: string; value: number; onChange: (v: number) => void; unit: string; step?: number }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[12px] text-muted">
        {label}
      </label>
      <div className="flex items-center rounded-lg border border-line bg-bg-elevated focus-within:border-accent/50">
        <input
          id={id}
          type="number"
          min={0}
          step={step}
          value={Number.isFinite(value) ? value : 0}
          onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
          className="num h-9 w-full min-w-0 bg-transparent px-3 text-[13.5px] text-fg focus:outline-none focus-visible:outline-none"
        />
        <span className="pr-3 text-[12px] text-subtle">{unit}</span>
      </div>
    </div>
  );
}

/** EIP-1559 fee breakdown with example inputs (no live network data). */
export function FeeCalculator({ color }: { color: string }) {
  const [gas, setGas] = useState(21_000);
  const [base, setBase] = useState(10);
  const [tip, setTip] = useState(1);
  const burned = gas * base;
  const toValidator = gas * tip;
  const total = burned + toValidator;
  const burnShare = total ? (burned / total) * 100 : 0;
  return (
    <div className="rounded-xl border border-line p-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <NumberField label="Gas used" value={gas} onChange={setGas} unit="gas" step={1000} />
        <NumberField label="Base fee" value={base} onChange={setBase} unit="gwei" />
        <NumberField label="Priority fee (tip)" value={tip} onChange={setTip} unit="gwei" step={0.5} />
      </div>
      <div className="mt-2 flex flex-wrap gap-2 text-[11.5px]">
        <span className="text-subtle">Presets:</span>
        {[
          ["ETH transfer", 21_000],
          ["Heavier contract call (example)", 150_000],
        ].map(([l, v]) => (
          <button key={l} onClick={() => setGas(v as number)} className={cn("rounded-md border px-2 py-0.5", gas === v ? "border-accent/50 text-fg" : "border-line text-muted hover:text-fg-2")}>
            {l}
          </button>
        ))}
      </div>
      <div className="mt-5 flex h-3 overflow-hidden rounded-full bg-surface-3" aria-hidden>
        <span style={{ width: `${burnShare}%`, backgroundColor: color }} />
        <span style={{ width: `${100 - burnShare}%`, backgroundColor: "#45B997" }} />
      </div>
      <dl className="mt-4 grid gap-3 sm:grid-cols-3">
        <div>
          <dt className="text-[12px] text-muted">Total fee</dt>
          <dd className="num mt-0.5 text-[17px] text-fg">{eth(total)}</dd>
          <dd className="num text-[11.5px] text-subtle">{nf(total, 0)} gwei</dd>
        </div>
        <div>
          <dt className="flex items-center gap-1.5 text-[12px] text-muted">
            <span className="size-2 rounded-full" style={{ backgroundColor: color }} aria-hidden /> Burned (base fee)
          </dt>
          <dd className="num mt-0.5 text-[17px] text-fg">{eth(burned)}</dd>
          <dd className="num text-[11.5px] text-subtle">{nf(burnShare, 1)}% of the fee</dd>
        </div>
        <div>
          <dt className="flex items-center gap-1.5 text-[12px] text-muted">
            <span className="size-2 rounded-full bg-positive" aria-hidden /> To the validator (tip)
          </dt>
          <dd className="num mt-0.5 text-[17px] text-fg">{eth(toValidator)}</dd>
          <dd className="num text-[11.5px] text-subtle">{nf(100 - burnShare, 1)}% of the fee</dd>
        </div>
      </dl>
      <p className="mt-3 text-[11.5px] text-subtle">1 gwei = 0.000000001 ETH. Example values: live base fees change every block.</p>
    </div>
  );
}

/** Constant-product swap on a hypothetical pool (1,000 TKN / 1,000,000 USD, 0.30% fee). */
export function AmmSimulator({ color }: { color: string }) {
  const X0 = 1_000;
  const Y0 = 1_000_000;
  const K = X0 * Y0;
  const FEE = 0.003;
  const [spend, setSpend] = useState(50_000);
  const sliderId = useId();
  const out = X0 - K / (Y0 + spend * (1 - FEE));
  const avg = out > 0 ? spend / out : 0;
  const x1 = X0 - out;
  const y1 = Y0 + spend;
  const spot0 = Y0 / X0;
  const spot1 = y1 / x1;

  // Curve y = k / x drawn over x in [350, 1600] TKN.
  const W = 1000;
  const H = 300;
  const xMin = 350;
  const xMax = 1600;
  const yMax = K / xMin;
  const px = (x: number) => ((x - xMin) / (xMax - xMin)) * W;
  const py = (y: number) => H - (y / yMax) * (H - 10);
  const curve = Array.from({ length: 80 }, (_, i) => {
    const x = xMin + (i / 79) * (xMax - xMin);
    return `${i ? "L" : "M"}${px(x).toFixed(1)},${py(K / x).toFixed(1)}`;
  }).join("");

  return (
    <div className="rounded-xl border border-line p-4">
      <label htmlFor={sliderId} className="flex items-center justify-between text-[12.5px] text-muted">
        <span>Spend on the pool</span>
        <span className="num text-[14px] text-fg">${nf(spend, 0)}</span>
      </label>
      <input
        id={sliderId}
        type="range"
        min={1_000}
        max={400_000}
        step={1_000}
        value={spend}
        onChange={(e) => setSpend(Number(e.target.value))}
        className="mt-2 w-full"
        style={{ accentColor: color }}
      />
      <div className="mt-4 grid gap-5 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div className="relative h-[200px] rounded-md border border-line bg-bg-elevated">
          <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full" role="img" aria-label="Constant product curve with the pool state before and after the trade">
            <path d={curve} fill="none" stroke={tint(color, 0.8)} strokeWidth={2} vectorEffect="non-scaling-stroke" />
            <line x1={px(x1)} x2={px(X0)} y1={py(y1)} y2={py(Y0)} stroke="#9299A8" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
          </svg>
          <span className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-bg" style={{ left: `${(px(X0) / W) * 100}%`, top: `${(py(Y0) / H) * 100}%`, backgroundColor: "#9299A8" }} />
          <span className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-bg" style={{ left: `${(px(x1) / W) * 100}%`, top: `${(py(y1) / H) * 100}%`, backgroundColor: color }} />
          <span className="absolute bottom-1.5 right-2 text-[10.5px] text-subtle">TKN in the pool →</span>
          <span className="absolute left-2 top-1.5 text-[10.5px] text-subtle">↑ USD in the pool</span>
        </div>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 self-center text-[12.5px]">
          <div>
            <dt className="text-muted">You receive</dt>
            <dd className="num text-[16px] text-fg">{nf(out, 2)} TKN</dd>
          </div>
          <div>
            <dt className="text-muted">Average price</dt>
            <dd className="num text-[16px] text-fg">${nf(avg, 2)}</dd>
          </div>
          <div>
            <dt className="text-muted">Price before</dt>
            <dd className="num text-fg-2">${nf(spot0, 2)}</dd>
          </div>
          <div>
            <dt className="text-muted">Pool price after</dt>
            <dd className="num text-fg-2">
              ${nf(spot1, 2)} <span className="text-negative">(+{nf((spot1 / spot0 - 1) * 100, 1)}%)</span>
            </dd>
          </div>
          <div className="col-span-2 text-[11.5px] leading-relaxed text-subtle">
            Paying {nf((avg / spot0 - 1) * 100, 2)}% above the starting price, including the 0.30% fee. Arbitrageurs would now sell TKN into the pool until its price matches other markets.
          </div>
        </dl>
      </div>
      <p className="mt-3 text-[11.5px] text-subtle">Hypothetical pool of 1,000 TKN and 1,000,000 USD. Not market data.</p>
    </div>
  );
}
