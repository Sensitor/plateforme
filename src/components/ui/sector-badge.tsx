"use client";

import Link from "@/i18n/link";
import { cn } from "@/lib/utils";
import { SECTOR_COLORS, tint } from "@/lib/brand";
import { useT } from "@/i18n/client";
import type { SectorId } from "@/lib/research/types";

/** Sector label in the sector's own colour. */
export function SectorBadge({ sector, href, className, size = "sm" }: { sector: SectorId; href?: string; className?: string; size?: "sm" | "md" }) {
  const color = SECTOR_COLORS[sector];
  const label = useT().labels.sectors[sector].label;
  const cls = cn(
    "inline-flex items-center gap-1.5 whitespace-nowrap rounded-md font-medium",
    size === "md" ? "px-2 py-1 text-[12.5px]" : "px-1.5 py-0.5 text-[11px] leading-4",
    className,
  );
  const style = { color, backgroundColor: tint(color, 0.12) };
  const content = (
    <>
      <span className="size-1.5 rounded-full" style={{ backgroundColor: color }} aria-hidden />
      {label}
    </>
  );
  return href ? (
    <Link href={href} className={cls} style={style}>
      {content}
    </Link>
  ) : (
    <span className={cls} style={style}>
      {content}
    </span>
  );
}
