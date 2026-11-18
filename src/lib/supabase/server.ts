import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL, supabaseConfigured } from "./config";

/**
 * Request-scoped client for Route Handlers and Server Actions. It acts as the
 * signed-in user, so every query stays under Row Level Security.
 */
export async function getServerSupabase() {
  if (!supabaseConfigured) return null;
  const store = await cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => {
        try {
          list.forEach(({ name, value, options }) => store.set(name, value, options));
        } catch {
          // Called from a context where cookies are read-only; the proxy refreshes them.
        }
      },
    },
  });
}

export async function getServerUser() {
  const supabase = await getServerSupabase();
  if (!supabase) return { supabase: null, user: null };
  const { data } = await supabase.auth.getUser();
  return { supabase, user: data.user };
}
