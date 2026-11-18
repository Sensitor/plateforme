import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL, supabaseConfigured } from "@/lib/supabase/config";

/**
 * Refreshes the Supabase session cookie on navigation so that Route Handlers
 * always see a valid session. Authorisation itself is enforced by Row Level
 * Security in the database, not here.
 */
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  if (!supabaseConfigured) return response;
  const hasSession = request.cookies.getAll().some((c) => c.name.startsWith("sb-"));
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
  await supabase.auth.getUser();
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|logos/|icon.svg|favicon.ico|api/history).*)"],
};
