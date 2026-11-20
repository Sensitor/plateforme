"use client";

import Link from "@/i18n/link";
import { Bell } from "lucide-react";
import { useUnreadCount } from "@/lib/alerts/use-notifications";
import { useT } from "@/i18n/client";

/** Topbar bell: unread in-app notifications for signed-in users. */
export function NotificationBell() {
  const unread = useUnreadCount();
  const t = useT().shell;
  const label = unread ? t.alertsUnread(unread) : t.alerts;
  return (
    <Link href="/alerts" className="relative flex size-9 items-center justify-center rounded-lg text-fg-2 hover:bg-surface-2" aria-label={label} title={label}>
      <Bell className="size-[18px]" />
      {unread ? (
        <span className="num absolute right-1 top-1 flex min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold leading-4 text-[#0d1020]">
          {unread > 9 ? "9+" : unread}
        </span>
      ) : null}
    </Link>
  );
}
