"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL, supabaseConfigured } from "./config";

let client: SupabaseClient | null = null;

/** Browser client (session kept in cookies so route handlers can read it). Null when not configured. */
export function getBrowserSupabase(): SupabaseClient | null {
  if (!supabaseConfigured) return null;
  if (!client) client = createBrowserClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
  return client;
}
