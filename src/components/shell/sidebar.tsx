"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, CircleUser } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { NAV_GROUPS, NAV_SECONDARY, isActive, type NavItem } from "./nav-config";

function NavLink({ item, pathname, onNavigate }: { item: NavItem; pathname: string; onNavigate?: () => void }) {
  const active = isActive(pathname, item.href);
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group flex h-9 items-center gap-3 rounded-lg px-3 text-[13.5px] transition-colors duration-150",
        active ? "bg-accent-soft text-fg" : "text-fg-2 hover:bg-surface-2 hover:text-fg",
      )}
    >
      <Icon className={cn("size-[17px] shrink-0", active ? "text-accent" : "text-muted group-hover:text-fg-2")} aria-hidden />
      <span className="flex-1 truncate">{item.label}</span>
      {item.soon ? (
        <span className="rounded border border-line-strong px-1 text-[10px] uppercase tracking-wide text-subtle" title={`Planned, ${item.phase}`}>
          Soon
        </span>
      ) : null}
    </Link>
  );
}

export function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <div className="flex h-full flex-col">
      <div className="px-5 pb-6 pt-6">
        <Link href="/" onClick={onNavigate} aria-label="Sensitor home">
          <Logo />
        </Link>
      </div>
      <nav aria-label="Main" className="flex-1 space-y-6 overflow-y-auto px-3">
        {NAV_GROUPS.map((group) => (
          <div key={group.id}>
            <div className="mb-1.5 px-3 text-[10.5px] font-medium uppercase tracking-[0.14em] text-subtle">{group.label}</div>
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <NavLink key={item.href} item={item} pathname={pathname} onNavigate={onNavigate} />
              ))}
            </div>
          </div>
        ))}
        <div className="border-t border-line pt-5">
          <div className="space-y-0.5">
            {NAV_SECONDARY.map((item) => (
              <NavLink key={item.href} item={item} pathname={pathname} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      </nav>
      <div className="p-3">
        <Link
          href="/account"
          onClick={onNavigate}
          className={cn(
            "flex items-center gap-3 rounded-xl border border-line bg-surface p-3 transition-colors hover:border-line-strong",
            isActive(pathname, "/account") && "border-accent/40",
          )}
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-[#2a3150] to-[#3b2f5e] text-fg-2">
            <CircleUser className="size-5" aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[13px] font-medium text-fg">My Account</span>
            <span className="block text-[11.5px] text-muted">Guest · Free</span>
          </span>
          <ChevronRight className="size-4 text-subtle" aria-hidden />
        </Link>
      </div>
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[248px] border-r border-line bg-bg-elevated lg:block">
      <SidebarContent />
    </aside>
  );
}
