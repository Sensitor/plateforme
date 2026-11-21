import { NextResponse, type NextRequest } from "next/server";
import { PROJECT_BY_SLUG } from "@/content/projects";
import { getCoverageQuotes } from "@/lib/market/service";
import { getAdminSupabase } from "@/lib/supabase/admin";
import { evaluateAlert, triggeredCopy, type Locale } from "@/lib/alerts/evaluate";
import { renderAlertEmail, type EmailItem } from "@/lib/alerts/email";
import type { AlertRow } from "@/lib/alerts/types";
import { emailConfigured, sendEmail } from "@/lib/email/resend";
import { cronAuthorised } from "@/lib/cron/auth";

/**
 * Alert checker. Called on a schedule (Supabase pg_cron, Vercel Cron or any
 * scheduler) with `Authorization: Bearer <CRON_SECRET>`. Triggered alerts are
 * paused (one-shot), a notification row is written and, if the user opted in,
 * one summary email is sent through Resend.
 */
async function run(request: NextRequest) {
  if (!process.env.CRON_SECRET) return NextResponse.json({ error: "CRON_SECRET is not set" }, { status: 503 });
  if (!cronAuthorised(request)) return NextResponse.json({ error: "unauthorised" }, { status: 401 });
  const admin = getAdminSupabase();
  if (!admin) return NextResponse.json({ error: "SUPABASE_SECRET_KEY is not set" }, { status: 503 });

  const { data: alerts, error } = await admin.from("alerts").select("*").eq("active", true).limit(5000);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!alerts?.length) return NextResponse.json({ checked: 0, triggered: 0 });

  const quotes = await getCoverageQuotes();
  if (!quotes.data) return NextResponse.json({ checked: alerts.length, triggered: 0, skipped: quotes.note ?? "quotes unavailable" });
  const source = quotes.source?.name ?? "n/a";

  const hits = (alerts as AlertRow[])
    .map((a) => ({ alert: a, ev: evaluateAlert(a.kind, Number(a.threshold), quotes.data?.[a.project_slug]) }))
    .filter((h) => h.ev.triggered && h.ev.value != null);
  if (!hits.length) return NextResponse.json({ checked: alerts.length, triggered: 0, source, asOf: quotes.asOf });

  // Pause atomically: only rows still active are claimed, so overlapping runs never notify twice.
  const now = new Date().toISOString();
  const claimed = new Set<string>();
  for (const h of hits) {
    const { data } = await admin
      .from("alerts")
      .update({ active: false, triggered_at: now, triggered_value: h.ev.value })
      .eq("id", h.alert.id)
      .eq("active", true)
      .select("id");
    if (data?.length) claimed.add(h.alert.id);
  }
  const fired = hits.filter((h) => claimed.has(h.alert.id));
  if (!fired.length) return NextResponse.json({ checked: alerts.length, triggered: 0 });

  const userIds = [...new Set(fired.map((h) => h.alert.user_id))];
  const { data: profiles } = await admin.from("profiles").select("id, locale, email_alerts").in("id", userIds);
  const prefs = new Map((profiles ?? []).map((p) => [p.id as string, { locale: (p.locale as Locale) ?? "en", email: Boolean(p.email_alerts) }]));

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || request.nextUrl.origin;
  const perUser = new Map<string, EmailItem[]>();
  const rows = fired.map(({ alert, ev }) => {
    const project = PROJECT_BY_SLUG[alert.project_slug];
    const locale = prefs.get(alert.user_id)?.locale ?? "en";
    const copy = triggeredCopy(project?.name ?? alert.project_slug, project?.ticker ?? alert.project_slug.toUpperCase(), alert.kind, Number(alert.threshold), ev.value!, source, quotes.asOf, locale);
    const link = `/projects/${alert.project_slug}`;
    perUser.set(alert.user_id, [...(perUser.get(alert.user_id) ?? []), { ...copy, link: `${siteUrl}${link}` }]);
    return { user_id: alert.user_id, title: copy.title, body: copy.body, link };
  });
  const { error: insertError } = await admin.from("notifications").insert(rows);

  let emailed = 0;
  const emailErrors: string[] = [];
  if (emailConfigured()) {
    for (const [userId, items] of perUser) {
      const pref = prefs.get(userId);
      if (!pref?.email) continue;
      const { data: u } = await admin.auth.admin.getUserById(userId);
      const to = u.user?.email;
      if (!to) continue;
      const msg = renderAlertEmail(items, siteUrl, pref.locale);
      const res = await sendEmail({ to, ...msg });
      if (res.ok) emailed++;
      else emailErrors.push(res.error ?? "unknown");
    }
  }

  return NextResponse.json({
    checked: alerts.length,
    triggered: fired.length,
    notified: insertError ? 0 : rows.length,
    emailed,
    ...(insertError ? { notificationError: insertError.message } : {}),
    ...(emailErrors.length ? { emailErrors: emailErrors.slice(0, 5) } : {}),
    source,
    asOf: quotes.asOf,
  });
}

export const GET = run;
export const POST = run;
