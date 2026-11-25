import { connection } from "next/server";
import { getT } from "@/i18n/server";
import { getWeeklyHistory, type WeeklyHistory } from "@/lib/strategies/data";
import { SourceTag } from "@/components/ui/source-tag";
import { DcaSimulator, type DcaAssetData } from "./dca-simulator";

const pack = (h: WeeklyHistory) => ({
  weekly: h.weekly.map((p) => [p.t, p.v] as [number, number]),
  latest: h.latest ? ([h.latest.t, h.latest.v] as [number, number]) : null,
});

/** Server wrapper: loads real weekly closes for Bitcoin and Ethereum and hands them to the simulator. */
export async function DcaSection({ showNote = true }: { showNote?: boolean }) {
  await connection(); // market data is request-time: never fetched at build
  const [btc, eth, dict] = await Promise.all([getWeeklyHistory("bitcoin"), getWeeklyHistory("ethereum"), getT()]);
  const t = dict.strategies;
  const assets: DcaAssetData[] = [
    ...(btc.data ? [{ key: "bitcoin" as const, label: "Bitcoin", color: "#F7931A", ...pack(btc.data) }] : []),
    ...(eth.data ? [{ key: "ethereum" as const, label: "Ethereum", color: "#8C8CF5", ...pack(eth.data) }] : []),
  ];
  if (!assets.length) return <p className="text-[13px] text-muted">{btc.note ?? t.unavailable}</p>;
  return (
    <div>
      <DcaSimulator assets={assets} />
      <div className="mt-2">
        <SourceTag result={btc.data ? btc : eth} label={dict.ui.sources.prices} />
        {showNote ? <p className="mt-1 text-[11px] text-subtle">{t.dca.note}</p> : null}
      </div>
    </div>
  );
}
