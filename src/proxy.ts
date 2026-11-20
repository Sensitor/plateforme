import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL, supabaseConfigured } from "@/lib/supabase/config";
import { LOCALE_COOKIE } from "@/i18n/config";

/** Upper bound on the session check: a slow auth server must never hold a request. */
const SESSION_CHECK_TIMEOUT_MS = 3000;

/** French when the visitor chose it, or, without a choice, when the browser prefers French over English. */
export function prefersFrench(cookie: string | undefined, acceptLanguage: string | null): boolean {
  if (cookie === "fr") return true;
  if (cookie === "en") return false;
  const ranked = (acceptLanguage ?? "")
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().toLowerCase().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { lang: tag.split("-")[0], q: q ? Number(q.trim().slice(2)) || 0 : 1 };
    })
    .filter((x) => x.lang === "fr" || x.lang === "en")
    .sort((a, b) => b.q - a.q);
  return ranked[0]?.lang === "fr";
}

/**
 * On the home page, picks the interface language (see prefersFrench).
 *
 * Refreshes the Supabase session cookie before API Route Handlers run, so they
 * see a valid session. Pages are not matched: they never read the session on
 * the server (the browser client keeps its own session fresh), and checking it
 * on every navigation and prefetch only added a round trip to Supabase.
 * Authorisation itself is enforced by Row Level Security in the database.
 */
export async function proxy(request: NextRequest) {
  // Home page only: send French-speaking visitors to /fr. Every other page keeps its URL.
  if (request.nextUrl.pathname === "/") {
    if (prefersFrench(request.cookies.get(LOCALE_COOKIE)?.value, request.headers.get("accept-language"))) {
      return NextResponse.redirect(new URL("/fr", request.url));
    }
    return NextResponse.next();
  }
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
  // The home page (language) and API routes, except the cron job (secret header, no user) and price history (public).
  matcher: ["/", "/api/((?!cron|history).*)"],
};
