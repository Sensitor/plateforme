"use client";

import { Cloud, CloudAlert, HardDrive, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSyncStatus } from "@/lib/sync/status";

const COPY = {
  local: { icon: HardDrive, short: "Stored on this device only", long: "Stored in this browser only. Sign in to sync it across your devices." },
  syncing: { icon: Loader2, short: "Syncing with your account", long: "Syncing with your account…" },
  cloud: { icon: Cloud, short: "Synced to your account", long: "Synced to your account and private to you (row level security)." },
  error: { icon: CloudAlert, short: "Sync unavailable, saved on this device", long: "Saved on this device. Cloud sync is unavailable right now (is the database schema installed?)." },
} as const;

/** Where the user's watchlist and portfolio live right now. */
export function StorageNote({ variant = "short", className }: { variant?: "short" | "long"; className?: string }) {
  const status = useSyncStatus();
  const c = COPY[status];
  const Icon = c.icon;
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <Icon className={cn("size-3.5 shrink-0", status === "cloud" || status === "local" ? "text-positive" : status === "error" ? "text-warning" : "animate-spin text-accent")} aria-hidden />
      {variant === "short" ? c.short : c.long}
    </span>
  );
}

export function useStorageWord() {
  const status = useSyncStatus();
  return status === "cloud" ? "in your account" : "on this device";
}
