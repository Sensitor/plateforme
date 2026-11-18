"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { StorageNote } from "@/components/storage-note";
import { useWatchlist } from "@/lib/watchlist/store";
import { formatPrice } from "@/lib/format";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Delta } from "@/components/ui/delta";
import { TokenLogo } from "@/components/ui/token-logo";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";

export interface WatchItem {
  slug: string;
  name: string;
  ticker: string;
  logo: string;
  price: number | null;
  change24h: number | null;
  change7d: number | null;
}

export function WatchlistCard({ items }: { items: Record<string, WatchItem> }) {
  const { slugs, ready } = useWatchlist();
  const list = slugs.map((s) => items[s]).filter(Boolean);
  return (
    <Card className="h-full">
      <CardHeader
        title="Watchlist"
        subtitle={<StorageNote className="text-[13px] text-muted" />}
        icon={<Star className="size-4" />}
        action={
          <Link href="/watchlist" className="text-[12.5px] text-accent hover:text-accent-strong">
            Manage →
          </Link>
        }
      />
      <CardBody className="pt-2">
        {!ready ? (
          <div className="space-y-3 py-2">
            <Skeleton className="h-8" />
            <Skeleton className="h-8" />
          </div>
        ) : list.length === 0 ? (
          <EmptyState
            icon={<Star className="size-4" />}
            title="No projects followed yet"
            description="Bookmark projects from Explore to track them here."
            action={
              <Link href="/explore" className="text-sm text-accent hover:text-accent-strong">
                Explore projects →
              </Link>
            }
            className="py-6"
          />
        ) : (
          <ul className="divide-y divide-line">
            {list.slice(0, 6).map((p) => (
              <li key={p.slug}>
                <Link href={`/projects/${p.slug}`} className="flex items-center gap-3 py-2.5">
                  <TokenLogo src={p.logo} name={p.name} size={26} />
                  <span className="min-w-0 flex-1 truncate text-[13.5px] text-fg">
                    {p.name} <span className="text-subtle">{p.ticker}</span>
                  </span>
                  <span className="num text-[13px] text-fg-2">{formatPrice(p.price)}</span>
                  <Delta value={p.change24h} className="w-16 text-right text-[12.5px]" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  );
}
