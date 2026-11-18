export type AlertKind = "price_above" | "price_below" | "move_24h";

export interface AlertRow {
  id: string;
  user_id: string;
  project_slug: string;
  kind: AlertKind;
  threshold: number;
  active: boolean;
  triggered_at: string | null;
  triggered_value: number | null;
  created_at: string;
}

export interface NotificationRow {
  id: string;
  user_id: string;
  title: string;
  body: string;
  link: string | null;
  read_at: string | null;
  created_at: string;
}

export const ALERT_KIND_META: Record<AlertKind, { label: string; short: string; unit: "usd" | "pct" }> = {
  price_above: { label: "Price rises above", short: "above", unit: "usd" },
  price_below: { label: "Price falls below", short: "below", unit: "usd" },
  move_24h: { label: "24h move larger than", short: "24h move", unit: "pct" },
};

export const ALERT_LIMITS = { free: 5, paid: 50 } as const;
