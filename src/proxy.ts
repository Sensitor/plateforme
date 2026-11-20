import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL, supabaseConfigured } from "@/lib/supabase/config";

/** Upper bound on the session check: a slow auth server must never hold a request. */
const SESSION_CHECK_TIMEOUT_MS = 3000;

/**
 * Refreshes the Supabase session cookie before API Route Handlers run, so they
 * see a valid session. Pages are not matched: they never read the session on
 * the server (the browser client keeps its own session fresh), and checking it
 * on every navigation and prefetch only added a round trip to Supabase.
 * Authorisation itself is enforced by Row Level Security in the database.
 */
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  if (!supabaseConfigured) return response;
  const hasSession = request.cookies.getAll().some((c) => c.name.startsWith("sb-") && c.name.includes("-auth-token"));
  if (!hasSession) return response;

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (list) => {
        list.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        list.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });
  try {
    // getClaims verifies the JWT locally (asymmetric signing keys) and only
    // calls Supabase when the access token has expired and must be refreshed.
    await Promise.race([supabase.auth.getClaims(), new Promise((resolve) => setTimeout(resolve, SESSION_CHECK_TIMEOUT_MS))]);
  } catch {
    // Never fail a request because of the session check; the Route Handler re-checks.
  }
  return response;
}

export const config = {
  // API routes only, except the cron job (secret header, no user) and price history (public).
  matcher: ["/api/((?!cron|history).*)"],
};
