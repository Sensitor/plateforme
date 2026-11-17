"use client";

import { useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWatchlist } from "@/lib/watchlist/store";

export function WatchlistButton({ slug, name, variant = "icon", className }: { slug: string; name: string; variant?: "icon" | "button"; className?: string }) {
  const { has, toggle, ready, limit } = useWatchlist();
  const [message, setMessage] = useState<string | null>(null);
  const active = ready && has(slug);
  const Icon = active ? BookmarkCheck : Bookmark;

  function onClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const res = toggle(slug);
    if (res === "limit") {
      setMessage(`Free plan watchlists are limited to ${limit} projects.`);
      setTimeout(() => setMessage(null), 3500);
    }
  }

  const label = active ? `Remove ${name} from watchlist` : `Add ${name} to watchlist`;

  return (
    <span className="relative inline-flex">
      {variant === "icon" ? (
        <button
          type="button"
          onClick={onClick}
          aria-pressed={active}
          aria-label={label}
          title={label}
          className={cn(
            "flex size-8 items-center justify-center rounded-lg transition-colors",
            active ? "text-accent hover:bg-accent-soft" : "text-subtle hover:bg-surface-3 hover:text-fg-2",
            className,
          )}
        >
          <Icon className="size-4" aria-hidden />
        </button>
      ) : (
        <button
          type="button"
          onClick={onClick}
          aria-pressed={active}
          className={cn(
            "inline-flex h-10 items-center gap-2 rounded-lg border px-4 text-sm transition-colors",
            active ? "border-accent/40 bg-accent-soft text-accent-strong" : "border-line-strong bg-surface-2 text-fg hover:bg-surface-3",
            className,
          )}
        >
          <Icon className="size-4" aria-hidden />
          {active ? "In watchlist" : "Add to watchlist"}
        </button>
      )}
      {message ? (
        <span role="status" className="absolute right-0 top-full z-40 mt-2 w-60 rounded-lg border border-line-strong bg-surface-2 p-2.5 text-xs text-fg-2 shadow-xl">
          {message}
        </span>
      ) : null}
    </span>
  );
}
