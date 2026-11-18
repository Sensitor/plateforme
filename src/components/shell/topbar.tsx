"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleUser, Menu, Search, X } from "lucide-react";
import type { SearchEntry } from "@/lib/search-index";
import { CommandPalette } from "./command-palette";
import { SidebarContent } from "./sidebar";
import { LogoMark } from "./logo";
import { useAuth } from "@/lib/auth/auth-provider";
import { NotificationBell } from "./notification-bell";

export function Topbar({ searchIndex }: { searchIndex: SearchEntry[] }) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMac, setIsMac] = useState(true);
  const pathname = usePathname();
  const { user, profile } = useAuth();
  const initial = (profile?.display_name || user?.email || "").slice(0, 1).toUpperCase();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- platform detection is client-only
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform));
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
  }, [drawerOpen]);

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-line/70 bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-3 px-4 md:px-6 lg:px-8">
          <button
            type="button"
            className="-ml-1 flex size-9 shrink-0 items-center justify-center rounded-lg text-fg-2 hover:bg-surface-2 lg:hidden"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation"
          >
            <Menu className="size-5" />
          </button>
          <Link href="/overview" className="shrink-0 lg:hidden" aria-label="Sensitor overview">
            <LogoMark className="size-7" />
          </Link>

          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            className="group mx-auto flex h-10 w-full min-w-0 max-w-[560px] items-center gap-3 rounded-xl border border-line bg-surface px-3.5 text-left text-[13.5px] text-subtle transition-colors hover:border-line-strong"
            aria-label="Search projects, sectors and analyses"
          >
            <Search className="size-4 text-muted" aria-hidden />
            <span className="flex-1 truncate">Search a project, a sector, an analysis…</span>
            <kbd className="hidden rounded-md border border-line-strong bg-surface-2 px-1.5 py-0.5 text-[11px] text-muted sm:inline">
              {isMac ? "⌘" : "Ctrl"} K
            </kbd>
          </button>

          <div className="flex shrink-0 items-center gap-1">
            <NotificationBell />
            {user ? (
              <Link
                href="/account"
                className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-accent to-violet text-[14px] font-semibold text-[#0d1020] ring-1 ring-line-strong"
                aria-label="My account"
              >
                {initial || <CircleUser className="size-5" />}
              </Link>
            ) : (
              <Link
                href="/account"
                className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-[#2a3150] to-[#3b2f5e] text-fg-2 ring-1 ring-line-strong"
                aria-label="My account"
              >
                <CircleUser className="size-5" />
              </Link>
            )}
          </div>
        </div>
      </header>

      <CommandPalette entries={searchIndex} open={paletteOpen} onOpenChange={setPaletteOpen} />

      {drawerOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation">
          <div className="absolute inset-0 bg-black/60" onClick={() => setDrawerOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[280px] max-w-[85vw] animate-fade-in border-r border-line bg-bg-elevated">
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="absolute right-3 top-6 flex size-8 items-center justify-center rounded-lg text-muted hover:bg-surface-2"
              aria-label="Close navigation"
            >
              <X className="size-4" />
            </button>
            <SidebarContent key={pathname} onNavigate={() => setDrawerOpen(false)} />
          </div>
        </div>
      ) : null}
    </>
  );
}
