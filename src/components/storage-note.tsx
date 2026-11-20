"use client";

import { Cloud, CloudAlert, HardDrive, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSyncStatus } from "@/lib/sync/status";
import { useT } from "@/i18n/client";

const ICONS = { local: HardDrive, syncing: Loader2, cloud: Cloud, error: CloudAlert } as const;

/** Where the user's watchlist and portfolio live right now. */
export function StorageNote({ variant = "short", className }: { variant?: "short" | "long"; className?: string }) {
  const status = useSyncStatus();
  const c = useT().watchlistUi.storage[status];
  const Icon = ICONS[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <Icon className={cn("size-3.5 shrink-0", status === "cloud" || status === "local" ? "text-positive" : status === "error" ? "text-warning" : "animate-spin text-accent")} aria-hidden />
      {variant === "short" ? c.short : c.long}
    </span>
  );
}

export function useStorageWord() {
  const status = useSyncStatus();
  const t = useT().watchlistUi.storage;
  return status === "cloud" ? t.inAccount : t.onDevice;
}
