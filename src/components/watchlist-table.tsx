"use client";

import Link from "next/link";
import { Star, Trash2 } from "lucide-react";
import { useWatchlist } from "@/lib/watchlist/store";
import { formatPrice, formatUsdCompact } from "@/lib/format";
import { Delta } from "@/components/ui/delta";
import { TokenLogo } from "@/components/ui/token-logo";
import { EmptyState } from "@/components/ui/empty-state";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ButtonLink } from "@/components/ui/button";
import { Sparkline } from "@/components/charts/sparkline";

export interface WatchRow {
  slug: string;
  name: string;
  ticker: string;
  logo: string;
  sector: string;
  price: number | null;
  change24h: number | null;
  change7d: number | null;
  marketCap: number | null;
  sparkline: number[] | null;
}

export function WatchlistTable({ rows }: { rows: WatchRow[] }) {
  const { slugs, ready, remove, limit } = useWatchlist();
  const bySlug = new Map(rows.map((r) => [r.slug, r]));
  const list = slugs.map((s) => bySlug.get(s)).filter((r): r is WatchRow => Boolean(r));

  if (!ready) return <Skeleton className="h-40 w-full rounded-xl" />;
  if (!list.length) {
    return (
      <div className="rounded-xl border border-line bg-surface">
        <EmptyState
          icon={<Star className="size-4" />}
          title="Your watchlist is empty"
          description="Follow projects from Explore or from any research dossier using the bookmark icon."
          action={<ButtonLink href="/explore" variant="primary" size="sm">Explore projects</ButtonLink>}
        />
      </div>
    );
  }
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-[12.5px] text-muted">
        <span>
          <span className="num text-fg">{list.length}</span> / {limit} projects (Free plan)
        </span>
        {list.length >= 2 ? (
          <Link href={`/compare?p=${list.slice(0, 4).map((r) => r.slug).join(",")}`} className="text-accent hover:text-accent-strong">
            Compare {Math.min(list.length, 4)} →
          </Link>
        ) : null}
      </div>
      <div className="overflow-hidden rounded-xl border border-line bg-surface">
        <div className="relative overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-line text-left text-[11px] uppercase tracking-wide text-subtle">
                <th scope="col" className="py-2.5 pl-4 font-medium">Project</th>
                <th scope="col" className="px-3 py-2.5 text-right font-medium">Price</th>
                <th scope="col" className="px-3 py-2.5 text-right font-medium">24h</th>
                <th scope="col" className="px-3 py-2.5 text-right font-medium">7d</th>
                <th scope="col" className="px-3 py-2.5 text-right font-medium">Market cap</th>
                <th scope="col" className="hidden px-3 py-2.5 text-right font-medium md:table-cell">7d trend</th>
                <th scope="col" className="py-2.5 pr-4"><span className="sr-only">Remove</span></th>
              </tr>
            </thead>
            <tbody>
              {list.map((r) => (
                <tr key={r.slug} className="border-b border-line/70 last:border-0 hover:bg-surface-2">
                  <td className="py-3 pl-4">
                    <Link href={`/projects/${r.slug}`} className="flex items-center gap-3">
                      <TokenLogo src={r.logo} name={r.name} size={28} />
                      <span>
                        <span className="block font-medium text-fg">
                          {r.name} <span className="text-xs font-normal text-subtle">{r.ticker}</span>
                        </span>
                        <Badge tone="neutral" className="mt-0.5">{r.sector}</Badge>
                      </span>
                    </Link>
                  </td>
                  <td className="num px-3 py-3 text-right text-fg">{formatPrice(r.price)}</td>
                  <td className="px-3 py-3 text-right"><Delta value={r.change24h} /></td>
                  <td className="px-3 py-3 text-right"><Delta value={r.change7d} /></td>
                  <td className="num px-3 py-3 text-right text-fg-2">{formatUsdCompact(r.marketCap)}</td>
                  <td className="hidden px-3 py-3 md:table-cell"><Sparkline values={r.sparkline} className="ml-auto" /></td>
                  <td className="py-3 pr-4 text-right">
                    <button onClick={() => remove(r.slug)} className="inline-flex size-8 items-center justify-center rounded-lg text-subtle hover:bg-surface-3 hover:text-negative" aria-label={`Remove ${r.name}`}>
                      <Trash2 className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
