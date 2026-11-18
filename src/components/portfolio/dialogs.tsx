"use client";

import { useEffect, useRef, useState } from "react";
import { Download, FileUp, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import { CSV_HEADER, parseCsv, STABLE_ASSET, type CsvResult, type Side, type Transaction } from "@/lib/portfolio/engine";
import { Button } from "@/components/ui/button";
import type { AssetMeta } from "./types";

function Dialog({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    ref.current?.querySelector<HTMLElement>("select, input, textarea, button")?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/60 px-4 py-[8vh]" onMouseDown={onClose}>
      <div ref={ref} role="dialog" aria-modal="true" aria-label={title} className="w-full max-w-lg animate-fade-in rounded-2xl border border-line-strong bg-surface shadow-2xl" onMouseDown={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="serif-display text-[24px] text-fg">{title}</h2>
          <button onClick={onClose} className="flex size-8 items-center justify-center rounded-lg text-muted hover:bg-surface-2" aria-label="Close">
            <X className="size-4" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

const field = "h-10 w-full rounded-lg border border-line bg-bg-elevated px-3 text-sm text-fg focus:border-accent/60 focus:outline-none";
const label = "mb-1.5 block text-[12px] font-medium text-muted";

export function TransactionDialog({ assets, onClose, onSubmit, today }: { assets: AssetMeta[]; onClose: () => void; onSubmit: (t: Omit<Transaction, "id">) => void; today: string }) {
  const [asset, setAsset] = useState(assets[0]?.slug ?? "");
  const [side, setSide] = useState<Side>("buy");
  const [date, setDate] = useState(today);
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [fee, setFee] = useState("");
  const [error, setError] = useState<string | null>(null);
  const meta = assets.find((a) => a.slug === asset);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const q = Number(quantity.replace(",", "."));
    const p = asset === STABLE_ASSET ? 1 : Number(price.replace(",", "."));
    const f = fee ? Number(fee.replace(",", ".")) : 0;
    if (!asset) return setError("Choose an asset.");
    if (!(q > 0)) return setError("Quantity must be a positive number.");
    if (!(p >= 0) || Number.isNaN(p)) return setError("Price must be a number.");
    if (!(f >= 0) || Number.isNaN(f)) return setError("Fees must be zero or positive.");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date > today) return setError("Use a date that is not in the future.");
    onSubmit({ asset, side, date, quantity: q, price: p, fee: f });
    onClose();
  }

  return (
    <Dialog title="Add a transaction" onClose={onClose}>
      <form onSubmit={submit} className="space-y-4">
        <div className="grid grid-cols-2 gap-1 rounded-lg border border-line bg-bg-elevated p-1" role="radiogroup" aria-label="Side">
          {(["buy", "sell"] as const).map((s) => (
            <button
              key={s}
              type="button"
              role="radio"
              aria-checked={side === s}
              onClick={() => setSide(s)}
              className={cn("h-9 rounded-md text-sm capitalize", side === s ? (s === "buy" ? "bg-positive-soft text-positive" : "bg-negative-soft text-negative") : "text-muted")}
            >
              {s}
            </button>
          ))}
        </div>
        <div>
          <label className={label} htmlFor="tx-asset">Asset</label>
          <select id="tx-asset" value={asset} onChange={(e) => setAsset(e.target.value)} className={field}>
            {assets.map((a) => (
              <option key={a.slug} value={a.slug}>
                {a.name} ({a.ticker})
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={label} htmlFor="tx-qty">Quantity</label>
            <input id="tx-qty" inputMode="decimal" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="0.00" className={cn(field, "num")} />
          </div>
          <div>
            <label className={label} htmlFor="tx-date">Date</label>
            <input id="tx-date" type="date" max={today} value={date} onChange={(e) => setDate(e.target.value)} className={field} />
          </div>
        </div>
        {asset !== STABLE_ASSET ? (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label} htmlFor="tx-price">Price per unit (USD)</label>
              <input id="tx-price" inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0.00" className={cn(field, "num")} />
              {meta?.price != null ? (
                <button type="button" onClick={() => setPrice(String(meta.price))} className="mt-1 text-[11.5px] text-accent hover:text-accent-strong">
                  Use current price ({formatPrice(meta.price)})
                </button>
              ) : null}
            </div>
            <div>
              <label className={label} htmlFor="tx-fee">Fees (USD, optional)</label>
              <input id="tx-fee" inputMode="decimal" value={fee} onChange={(e) => setFee(e.target.value)} placeholder="0.00" className={cn(field, "num")} />
            </div>
          </div>
        ) : (
          <p className="text-[12px] text-muted">Stablecoins are recorded at $1.00 per unit (peg assumption).</p>
        )}
        {error ? <p className="text-[13px] text-negative" role="alert">{error}</p> : null}
        <div className="flex justify-end gap-2 pt-1">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <button type="submit" className="h-10 rounded-lg bg-accent px-4 text-sm font-semibold text-[#0d1020] hover:bg-accent-strong">
            Add transaction
          </button>
        </div>
      </form>
    </Dialog>
  );
}

export function ImportDialog({ assets, onClose, onImport }: { assets: AssetMeta[]; onClose: () => void; onImport: (rows: CsvResult["rows"]) => void }) {
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const resolve = (raw: string) => {
    const r = raw.trim().toLowerCase();
    if (["usd", "usdc", "usdt", "dai", "usds", "stablecoin", "stablecoins"].includes(r)) return STABLE_ASSET;
    return assets.find((a) => a.slug === r || a.ticker.toLowerCase() === r || a.name.toLowerCase() === r)?.slug ?? null;
  };
  const result = text.trim() ? parseCsv(text, resolve) : null;

  function downloadTemplate() {
    const sample = `${CSV_HEADER}\n2026-03-02,BTC,buy,0.1,87000,2\n2026-03-02,ETH,buy,2,2100,1.5\n2026-06-01,ETH,sell,0.5,2500,1\n2026-06-01,USDC,buy,1000,1,0\n`;
    const url = URL.createObjectURL(new Blob([sample], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "sensitor-portfolio-template.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Dialog title="Import transactions" onClose={onClose}>
      <div className="space-y-4">
        <p className="text-[13px] leading-relaxed text-fg-2">
          CSV with columns <code className="num rounded bg-surface-2 px-1 text-[12px]">{CSV_HEADER}</code>. Assets can be tickers (ETH) or names. Semicolon separators and
          decimal commas from French spreadsheets are accepted. The file is read in your browser and never uploaded.
        </p>
        <div className="flex flex-wrap gap-2">
          <label className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg border border-line-strong bg-surface-2 px-3 text-[13px] text-fg hover:bg-surface-3">
            <FileUp className="size-4" aria-hidden /> {fileName ?? "Choose a CSV file"}
            <input
              type="file"
              accept=".csv,text/csv"
              className="sr-only"
              onChange={async (e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                setFileName(f.name);
                setText(await f.text());
              }}
            />
          </label>
          <button onClick={downloadTemplate} className="inline-flex h-9 items-center gap-2 rounded-lg px-3 text-[13px] text-accent hover:bg-accent-soft">
            <Download className="size-4" aria-hidden /> Template
          </button>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Or paste here:\n${CSV_HEADER}\n2026-03-02,ETH,buy,2,2100,1.5`}
          rows={6}
          aria-label="CSV content"
          className="num w-full rounded-lg border border-line bg-bg-elevated p-3 text-[12px] text-fg placeholder:text-subtle focus:border-accent/60 focus:outline-none"
        />
        {result ? (
          <div className="space-y-2 text-[13px]">
            <p className="text-fg-2">
              <span className="num text-positive">{result.rows.length}</span> valid row{result.rows.length === 1 ? "" : "s"}
              {result.errors.length ? (
                <>
                  , <span className="num text-negative">{result.errors.length}</span> with errors (skipped)
                </>
              ) : null}
            </p>
            {result.errors.length ? (
              <ul className="max-h-32 space-y-1 overflow-y-auto rounded-lg border border-negative/25 bg-negative-soft p-3 text-[12px] text-negative">
                {result.errors.slice(0, 20).map((e) => (
                  <li key={e.line}>
                    Line {e.line}: {e.message}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <button
            disabled={!result?.rows.length}
            onClick={() => {
              if (result?.rows.length) {
                onImport(result.rows);
                onClose();
              }
            }}
            className="h-10 rounded-lg bg-accent px-4 text-sm font-semibold text-[#0d1020] hover:bg-accent-strong disabled:opacity-40"
          >
            Import {result?.rows.length ? result.rows.length : ""}
          </button>
        </div>
      </div>
    </Dialog>
  );
}
