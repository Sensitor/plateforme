"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import { useWatchlist } from "@/lib/watchlist/store";
import { Sparkline } from "@/components/charts/sparkline";
import { Delta } from "@/components/ui/delta";
import { TokenLogo } from "@/components/ui/token-logo";
import { StorageNote } from "@/components/storage-note";

export interface WatchRow {
  slug: string;
  name: string;
  ticker: string;
  logo: string | null;
  price: number | null;
  change24h: number | null;
  marketCap: number | null;
  spark: number[] | null;
}

function Row({ r }: { r: WatchRow }) {
  return (
    <li>
      <Link href={`/projects/${r.slug}`} className="group grid grid-cols-[minmax(0,1fr)_auto_64px] items-center gap-x-3 py-2.5 @min-[336px]:grid-cols-[minmax(0,1fr)_56px_auto_64px]">
        <span className="flex min-w-0 items-center gap-2.5">
          <TokenLogo src={r.logo} name={r.name} size={22} />
          <span className="truncate text-[13.5px] text-fg group-hover:text-accent-strong">{r.name}</span>
          <span className="num hidden text-[11px] text-subtle @min-[336px]:inline">{r.ticker}</span>
        </span>
        <span className="hidden @min-[336px]:block">
          <Sparkline values={r.spark} width={56} height={20} />
        </span>
        <span className="num text-right text-[13px] text-fg">{formatPrice(r.price)}</span>
        <Delta value={r.change24h} className="num w-16 text-right text-[12.5px]" />
      </Link>
    </li>
  );
}

export function MarketWatchPanel({ rows, leaders, unavailable, source }: { rows: WatchRow[]; leaders: string[]; unavailable: string | null; source: React.ReactNode }) {
  const [tab, setTab] = useState<"leaders" | "watchlist">("leaders");
  const { slugs, ready } = useWatchlist();
  const bySlug = new Map(rows.map((r) => [r.slug, r]));
  const list = (tab === "leaders" ? leaders : slugs).map((s) => bySlug.get(s)).filter((r): r is WatchRow => Boolean(r));

  return (
    <div className="@container">
      <div className="flex items-center justify-between gap-3 border-b border-line pb-3">
        <h2 className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">Market watch</h2>
        <div className="flex gap-1 text-[12.5px]" role="tablist" aria-label="Market watch list">
          {(
            [
              ["leaders", "Leaders"],
              ["watchlist", `Watchlist${ready && slugs.length ? ` (${slugs.length})` : ""}`],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={cn("rounded-md px-2 py-1 transition-colors", tab === id ? "bg-surface-2 text-fg" : "text-muted hover:text-fg-2")}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-[minmax(0,1fr)_auto_64px] gap-x-3 pt-3 text-[10.5px] uppercase tracking-[0.1em] text-subtle @min-[336px]:grid-cols-[minmax(0,1fr)_56px_auto_64px]">
        <span>{tab === "leaders" ? "By market cap" : "Followed"}</span>
        <span className="hidden @min-[336px]:block">7d</span>
        <span className="text-right">Price</span>
        <span className="text-right">24h</span>
      </div>

      {unavailable && tab === "leaders" ? (
        <p className="py-6 text-[13px] text-muted">{unavailable}</p>
      ) : tab === "watchlist" && ready && list.length === 0 ? (
        <div className="py-8 text-center">
          <Star className="mx-auto size-5 text-subtle" aria-hidden />
          <p className="mt-2 text-[13.5px] text-fg">No projects followed yet</p>
          <p className="mt-1 text-[12.5px] text-muted">Bookmark projects from Explore or a dossier.</p>
          <Link href="/explore" className="mt-3 inline-flex items-center gap-1.5 text-[12.5px] text-accent hover:text-accent-strong">
            Explore projects <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </div>
      ) : (
        <ul className="divide-y divide-line/70">
          {list.map((r) => (
            <Row key={r.slug} r={r} />
          ))}
        </ul>
      )}

      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-3">
        {tab === "watchlist" ? <StorageNote className="text-[11px] text-subtle" /> : source}
        <Link href={tab === "leaders" ? "/explore" : "/watchlist"} className="inline-flex items-center gap-1.5 text-[12.5px] text-fg-2 hover:text-fg">
          {tab === "leaders" ? "All prices" : "Manage"} <ArrowRight className="size-3.5" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
