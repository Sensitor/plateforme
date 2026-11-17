import type { NextRequest } from "next/server";
import { PROJECTS } from "@/content/projects";
import { getPriceHistory, getTotalMarketCapHistory } from "@/lib/market/service";
import { CHART_RANGES, type ChartRange } from "@/lib/market/types";

/**
 * GET /api/history?asset=<slug>|total-mcap&range=1D|7D|1M|3M|1Y|ALL
 * Only assets in the Sensitor coverage universe are accepted (no open proxy).
 */
export async function GET(request: NextRequest) {
  const asset = request.nextUrl.searchParams.get("asset") ?? "";
  const range = (request.nextUrl.searchParams.get("range") ?? "1Y").toUpperCase() as ChartRange;
  if (!CHART_RANGES.includes(range)) {
    return Response.json({ error: "invalid range" }, { status: 400 });
  }
  if (asset === "total-mcap") {
    return Response.json(await getTotalMarketCapHistory(range));
  }
  const project = PROJECTS.find((p) => p.slug === asset);
  if (!project) {
    return Response.json({ error: "unknown asset" }, { status: 404 });
  }
  const since = Math.floor(Date.parse(project.launched) / 1000);
  const result = await getPriceHistory(project.data.coingeckoId, range, range === "ALL" ? since : undefined);
  return Response.json(result, { headers: { "cache-control": "public, max-age=60, stale-while-revalidate=240" } });
}
