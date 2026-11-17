"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Sensitor mark: the slanted "S" from the brand mockup, made of two hairpin
 * strokes (silver above, violet below). Gradient ids are unique per instance
 * so several logos can coexist on a page (sidebar + mobile header).
 */
export function LogoMark({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const silver = `s-silver-${uid}`;
  const blend = `s-blend-${uid}`;
  const violet = `s-violet-${uid}`;
  return (
    <svg viewBox="0 0 64 64" fill="none" className={cn("size-9", className)} aria-hidden>
      <defs>
        <linearGradient id={silver} gradientUnits="userSpaceOnUse" x1="23" y1="-12" x2="-12" y2="2">
          <stop offset="0" stopColor="#EEEEF3" />
          <stop offset="0.6" stopColor="#D3D3DC" />
          <stop offset="1" stopColor="#ACABBC" />
        </linearGradient>
        <linearGradient id={blend} gradientUnits="userSpaceOnUse" x1="-4" y1="0" x2="9" y2="0">
          <stop offset="0" stopColor="#B7ACE4" stopOpacity="0.9" />
          <stop offset="0.55" stopColor="#9C80EE" />
          <stop offset="1" stopColor="#9878EC" />
        </linearGradient>
        <linearGradient id={violet} gradientUnits="userSpaceOnUse" x1="12" y1="0" x2="-22" y2="9">
          <stop offset="0" stopColor="#9878EC" />
          <stop offset="1" stopColor="#8C6CE4" />
        </linearGradient>
      </defs>
      <g transform="translate(32 32.5) rotate(-33)">
        <path d="M20 -8.6 H -9 A 4.3 4.3 0 0 0 -9 0 H 2.5" stroke={`url(#${silver})`} strokeWidth="5" />
        <polygon points="19.9,-11.1 23.4,-10.2 19.9,-6.1" fill="#EEEEF3" />
        <path d="M -4 0 H 9.1" stroke={`url(#${blend})`} strokeWidth="5" strokeLinecap="round" />
        <path d="M 9 0 A 4.3 4.3 0 0 1 9 8.6 H -20" stroke={`url(#${violet})`} strokeWidth="5" />
        <polygon points="-19.9,6.1 -23.4,10.2 -19.9,11.1" fill="#8C6CE4" />
      </g>
    </svg>
  );
}

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <LogoMark className="-ml-1 size-10" />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="text-[17px] font-semibold tracking-[0.16em] text-fg">SENSITOR</span>
          <span className="mt-1 text-[10.5px] tracking-wide text-muted">Digital Asset Intelligence</span>
        </span>
      )}
    </span>
  );
}
