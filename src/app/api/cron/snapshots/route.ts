import { NextResponse, type NextRequest } from "next/server";
import { PROJECTS } from "@/content/projects";
import { getCoverageQuotes, getCoverageTvl, getDefiOverview, getFearGreed, getGlobalMarket, getStablecoinOverview } from "@/lib/market/service";
import { buildAssetRows, buildMarketRow, snapshotDay } from "@/lib/market/snapshots-core";
import { getAdminSupabase } from "@/lib/supabase/admin";
import { cronAuthorised } from "@/lib/cron/auth";

/**
 * Daily market snapshot. Called once a day (Vercel Cron, or Supabase pg_cron
 * with supabase/schedule_snapshots.sql) with `Authorization: Bearer <CRON_SECRET>`.
 * Writes the day's market-wide row and one row per covered asset; running it
 * again the same day replaces that day's rows with the latest observation.
 */
async function run(request: NextRequest) {
  if (!process.env.CRON_SECRET) return NextResponse.json({ error: "CRON_SECRET is not set" }, { status: 503 });
  if (!cronAuthorised(request)) return NextResponse.json({ error: "unauthorised" }, { status: 401 });
  const admin = getAdminSupabase();
  if (!admin) return NextResponse.json({ error: "SUPABASE_SECRET_KEY is not set" }, { status: 503 });

  const now = new Date();
  const [quotes, tvl, global, defi, stablecoins, fearGreed] = await Promise.all([
    getCoverageQuotes(),
    getCoverageTvl(),
    getGlobalMarket(),
    getDefiOverview(),
    getStablecoinOverview(),
    getFearGreed(),
  ]);
  const input = { now, quotes, tvl, global, defi, stablecoins, fearGreed };
  const market = buildMarketRow(input);
  const assets = buildAssetRows(input, PROJECTS.map((p) => p.slug));

  const errors: string[] = [];
  if (market) {
    const { error } = await admin.from("market_daily").upsert(market, { onConflict: "day" });
    if (error) errors.push(`market_daily: ${error.message}`);
  }
  if (assets.length) {
    const { error } = await admin.from("asset_daily").upsert(assets, { onConflict: "day,slug" });
    if (error) errors.push(`asset_daily: ${error.message}`);
  }
  const unavailable = Object.entries({ quotes, tvl, global, defi, stablecoins, fearGreed })
    .filter(([, r]) => r.status === "unavailable")
    .map(([k]) => k);
  const body = { day: snapshotDay(now), market: Boolean(market), assets: assets.length, unavailable, errors };
  return NextResponse.json(body, { status: errors.length ? 500 : 200 });
}

export const GET = run;
export const POST = run;
