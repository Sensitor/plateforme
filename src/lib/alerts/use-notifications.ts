"use client";

import useSWR from "swr";
import { useAuth } from "@/lib/auth/auth-provider";
import type { NotificationRow } from "./types";

/** In-app notifications of the signed-in user (RLS restricts rows to their own). */
export function useNotifications() {
  const { supabase, user } = useAuth();
  const key = supabase && user ? ["notifications", user.id] : null;
  const swr = useSWR(
    key,
    async () => {
      const { data, error } = await supabase!.from("notifications").select("id, user_id, title, body, link, read_at, created_at").order("created_at", { ascending: false }).limit(50);
      if (error) throw error;
      return (data ?? []) as NotificationRow[];
    },
    { refreshInterval: 60_000, revalidateOnFocus: true, shouldRetryOnError: false },
  );
  const items = swr.data ?? [];

  async function markRead(ids: string[]) {
    if (!supabase || !ids.length) return;
    const now = new Date().toISOString();
    await swr.mutate(
      async (cur) => {
        await supabase.from("notifications").update({ read_at: now }).in("id", ids);
        return (cur ?? []).map((n) => (ids.includes(n.id) ? { ...n, read_at: now } : n));
      },
      { optimisticData: items.map((n) => (ids.includes(n.id) ? { ...n, read_at: now } : n)), revalidate: false },
    );
  }

  async function remove(id: string) {
    if (!supabase) return;
    await swr.mutate(
      async (cur) => {
        await supabase.from("notifications").delete().eq("id", id);
        return (cur ?? []).filter((n) => n.id !== id);
      },
      { optimisticData: items.filter((n) => n.id !== id), revalidate: false },
    );
  }

  return { items, error: swr.error as Error | undefined, isLoading: swr.isLoading, unread: items.filter((n) => !n.read_at).length, markRead, remove };
}

export function useUnreadCount() {
  return useNotifications().unread;
}
