import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import type { SupabaseClient } from "@supabase/supabase-js";

export const COPILOT_LIMITS = { guest: 3, free: 10, pro: 100, research_club: 300 } as const;
export type QuotaTier = keyof typeof COPILOT_LIMITS;

export const GUEST_COOKIE = "sensitor_cp";
const secret = () => process.env.COPILOT_COOKIE_SECRET || process.env.CRON_SECRET || "sensitor-local";
const today = () => new Date().toISOString().slice(0, 10);
const sign = (payload: string) => createHmac("sha256", secret()).update(payload).digest("base64url").slice(0, 22);

/** Guest usage stored in a signed cookie: "<day>.<count>.<sig>". */
export function readGuestCount(raw: string | undefined): number {
  if (!raw) return 0;
  const [day, count, sig] = raw.split(".");
  if (day !== today() || !sig) return 0;
  const expected = sign(`${day}.${count}`);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return COPILOT_LIMITS.guest; // tampered: treat as exhausted
  const n = Number(count);
  return Number.isInteger(n) && n >= 0 ? n : 0;
}

export function guestCookieValue(count: number): string {
  const payload = `${today()}.${count}`;
  return `${payload}.${sign(payload)}`;
}

export interface QuotaState {
  tier: QuotaTier;
  used: number;
  limit: number;
  /** Where usage is recorded. */
  store: "db" | "cookie";
}

/** Signed-in users: usage counted in `copilot_usage` (falls back to the cookie if the schema is missing). */
export async function userQuota(supabase: SupabaseClient, userId: string, guestCookie: string | undefined): Promise<QuotaState> {
  const [{ data: used, error }, { data: profile }] = await Promise.all([
    supabase.rpc("copilot_usage_today"),
    supabase.from("profiles").select("tier").eq("id", userId).maybeSingle(),
  ]);
  const tier = ((profile?.tier as QuotaTier | undefined) ?? "free") satisfies QuotaTier;
  if (error) return { tier, used: readGuestCount(guestCookie), limit: COPILOT_LIMITS[tier], store: "cookie" };
  return { tier, used: Number(used) || 0, limit: COPILOT_LIMITS[tier], store: "db" };
}
