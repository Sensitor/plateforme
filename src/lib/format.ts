/**
 * Number and date formatting helpers. All financial figures are rendered in
 * USD with en-US conventions so the data reads the same for every viewer.
 */

/**
 * Deterministic compact notation (identical on server and client, Intl's
 * compact notation differs between ICU builds and breaks hydration).
 */
function compact(value: number, maxDigits = 2): string {
  const abs = Math.abs(value);
  const units: [number, string][] = [
    [1e12, "T"],
    [1e9, "B"],
    [1e6, "M"],
    [1e3, "K"],
  ];
  for (const [size, suffix] of units) {
    if (abs >= size) {
      const n = value / size;
      const digits = Math.abs(n) >= 100 ? Math.min(1, maxDigits) : maxDigits;
      return `${trimZeros(n.toFixed(digits))}${suffix}`;
    }
  }
  return trimZeros(value.toFixed(abs >= 100 ? 0 : maxDigits));
}

function trimZeros(s: string): string {
  if (!s.includes(".")) return s;
  let end = s.length;
  while (s[end - 1] === "0") end--;
  if (s[end - 1] === ".") end--;
  return s.slice(0, end);
}

export function formatUsdCompact(value: number | null | undefined): string {
  if (value == null || !Number.isFinite(value)) return "n/a";
  return value < 0 ? `-$${compact(-value)}` : `$${compact(value)}`;
}

/** Price with precision adapted to magnitude (sub-dollar tokens keep more digits). */
export function formatPrice(value: number | null | undefined): string {
  if (value == null || !Number.isFinite(value)) return "n/a";
  const abs = Math.abs(value);
  const digits = abs === 0 || abs >= 1 ? 2 : abs >= 0.01 ? 4 : 6;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

export function formatPercent(value: number | null | undefined, opts: { signed?: boolean; digits?: number } = {}): string {
  if (value == null || !Number.isFinite(value)) return "n/a";
  const { signed = true, digits = 2 } = opts;
  // Values that round to zero print as an unsigned zero, never "-0.0%".
  const v = Math.abs(value) < 0.5 * 10 ** -digits ? 0 : value;
  const sign = signed && v > 0 ? "+" : "";
  return `${sign}${v.toFixed(digits)}%`;
}

export function formatNumberCompact(value: number | null | undefined): string {
  if (value == null || !Number.isFinite(value)) return "n/a";
  return compact(value);
}

export function formatNumber(value: number | null | undefined, digits = 0): string {
  if (value == null || !Number.isFinite(value)) return "n/a";
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: digits }).format(value);
}

/** "12 Jan 2026", unambiguous across locales. */
export function formatDate(iso: string | number | null | undefined): string {
  if (iso == null) return "n/a";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso);
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(d);
}

export function formatDateTime(iso: string | number | null | undefined): string {
  if (iso == null) return "n/a";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  }).format(d);
}

/** Relative time against a reference instant (pass `now` explicitly for determinism). */
export function formatRelative(iso: string | number, now: number): string {
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return "n/a";
  const diff = Math.max(0, now - t);
  const s = Math.round(diff / 1000);
  if (s < 60) return "just now";
  const m = Math.round(s / 60);
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 48) return `${h} h ago`;
  const d = Math.round(h / 24);
  return `${d} days ago`;
}

export function deltaTone(value: number | null | undefined, digits = 2): "positive" | "negative" | "neutral" {
  if (value == null || !Number.isFinite(value) || Math.abs(value) < 0.5 * 10 ** -digits) return "neutral";
  return value > 0 ? "positive" : "negative";
}
