"use client";

import { useMemo, useState } from "react";
import Link from "@/i18n/link";
import useSWR from "swr";
import { BellPlus, BellRing, Check, CheckCheck, Inbox, Loader2, Mail, Pause, Play, RotateCcw, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPercent, formatPrice } from "@/lib/format";
import { useAuth } from "@/lib/auth/auth-provider";
import { useNotifications } from "@/lib/alerts/use-notifications";
import { describeRule } from "@/lib/alerts/evaluate";
import { ALERT_KIND_META, ALERT_LIMITS, type AlertKind, type AlertRow } from "@/lib/alerts/types";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { TimeAgo } from "@/components/ui/time-ago";
import { TokenLogo } from "@/components/ui/token-logo";

export interface AlertAsset {
  slug: string;
  name: string;
  ticker: string;
  logo: string | null;
  price: number | null;
  change24h: number | null;
}

const field = "h-10 w-full rounded-lg border border-line bg-bg-elevated px-3 text-sm text-fg placeholder:text-subtle focus:border-accent/60 focus:outline-none";
const label = "mb-1.5 block text-[12px] font-medium text-muted";

export function AlertsApp({ assets, quoteSource }: { assets: AlertAsset[]; quoteSource: React.ReactNode }) {
  const { configured, loading, user } = useAuth();

  if (!configured || loading || !user) {
    return (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <Card>
          <CardBody className="pt-6">
            {loading ? (
              <div className="space-y-3">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-80" />
              </div>
            ) : (
              <div className="max-w-xl">
                <span className="flex size-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <BellRing className="size-5" aria-hidden />
                </span>
                <h2 className="serif-display mt-4 text-[30px] leading-tight text-fg">{configured ? "Sign in to set alerts" : "Alerts need an account"}</h2>
                <p className="mt-2 text-[14px] leading-relaxed text-fg-2">
                  Alerts are checked on our servers, so they work even when Sensitor is closed. They are tied to your account and visible only to you.
                </p>
                {configured ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    <ButtonLink href="/login?next=/alerts" variant="primary">
                      Sign in
                    </ButtonLink>
                    <ButtonLink href="/login?mode=signup&next=/alerts" variant="secondary">
                      Create a free account
                    </ButtonLink>
                  </div>
                ) : (
                  <p className="mt-4 text-[13px] text-muted">Accounts are not configured on this deployment.</p>
                )}
              </div>
            )}
          </CardBody>
        </Card>
        <HowItWorks />
      </div>
    );
  }
  return <SignedInAlerts assets={assets} quoteSource={quoteSource} />;
}

function HowItWorks() {
  return (
    <Card>
      <CardHeader title="How alerts work" />
      <CardBody>
        <ul className="space-y-3 text-[13px] leading-relaxed text-fg-2">
          <li className="flex gap-2.5">
            <Check className="mt-0.5 size-4 shrink-0 text-positive" aria-hidden /> Three rules: price above, price below, or a 24h move larger than a percentage.
          </li>
          <li className="flex gap-2.5">
            <Check className="mt-0.5 size-4 shrink-0 text-positive" aria-hidden /> One-shot: an alert pauses once it triggers. Re-arm it in one click.
          </li>
          <li className="flex gap-2.5">
            <Check className="mt-0.5 size-4 shrink-0 text-positive" aria-hidden /> In-app notification every time, email only if enabled in your account.
          </li>
          <li className="flex gap-2.5">
            <Check className="mt-0.5 size-4 shrink-0 text-positive" aria-hidden /> Free plan: {ALERT_LIMITS.free} active alerts. Pro and Research Club: {ALERT_LIMITS.paid}.
          </li>
        </ul>
      </CardBody>
    </Card>
  );
}

function useAlerts() {
  const { supabase, user } = useAuth();
  const swr = useSWR(
    supabase && user ? ["alerts", user.id] : null,
    async () => {
      const { data, error } = await supabase!.from("alerts").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as AlertRow[];
    },
    { revalidateOnFocus: true, refreshInterval: 120_000, shouldRetryOnError: false },
  );
  return { ...swr, alerts: swr.data ?? [] };
}

function distance(a: AlertRow, asset: AlertAsset | undefined): string | null {
  if (!asset) return null;
  if (a.kind === "move_24h") return asset.change24h == null ? null : `24h now ${formatPercent(asset.change24h)}`;
  if (asset.price == null) return null;
  const gap = ((Number(a.threshold) - asset.price) / asset.price) * 100;
  return `Now ${formatPrice(asset.price)}, ${formatPercent(Math.abs(gap), { signed: false, digits: 1 })} away`;
}

function SignedInAlerts({ assets, quoteSource }: { assets: AlertAsset[]; quoteSource: React.ReactNode }) {
  const { supabase, user, profile } = useAuth();
  const { alerts, error, isLoading, mutate } = useAlerts();
  const notes = useNotifications();
  const bySlug = useMemo(() => new Map(assets.map((a) => [a.slug, a])), [assets]);
  const limit = profile?.tier && profile.tier !== "free" ? ALERT_LIMITS.paid : ALERT_LIMITS.free;
  const active = alerts.filter((a) => a.active);
  const paused = alerts.filter((a) => !a.active);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  async function setActive(a: AlertRow, value: boolean) {
    if (!supabase) return;
    setBusyId(a.id);
    setActionError(null);
    const patch = value ? { active: true, triggered_at: null, triggered_value: null } : { active: false };
    const { error } = await supabase.from("alerts").update(patch).eq("id", a.id);
    if (error) setActionError(error.message.includes("limit") ? `You already have ${limit} active alerts, the limit for your plan.` : error.message);
    await mutate();
    setBusyId(null);
  }

  async function remove(a: AlertRow) {
    if (!supabase) return;
    setBusyId(a.id);
    await supabase.from("alerts").delete().eq("id", a.id);
    await mutate();
    setBusyId(null);
  }

  const schemaMissing = error && /relation|schema cache|does not exist/i.test(error.message);

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_400px] xl:items-start">
      <div className="space-y-6">
        {schemaMissing ? (
          <Card className="border-warning/30">
            <CardBody className="pt-5 text-[13.5px] text-fg-2">
              The alerts table is missing. Run <code className="num rounded bg-surface-2 px-1 text-[12px]">supabase/migrations/0001_app.sql</code> in the Supabase SQL editor.
            </CardBody>
          </Card>
        ) : null}
        <NewAlertForm assets={assets} activeCount={active.length} limit={limit} userId={user!.id} onCreated={() => mutate()} quoteSource={quoteSource} />

        <Card>
          <CardHeader
            title="Active alerts"
            subtitle={`${active.length} of ${limit} on your plan`}
            icon={<BellRing className="size-4" />}
            action={
              profile?.email_alerts ? (
                <Badge tone="positive">
                  <Mail className="size-3" aria-hidden /> Email on
                </Badge>
              ) : (
                <Link href="/account" className="text-[12px] text-accent hover:text-accent-strong">
                  Email off, change
                </Link>
              )
            }
          />
          <CardBody className="pt-3">
            {actionError ? (
              <p className="mb-3 rounded-lg border border-negative/25 bg-negative-soft px-3 py-2 text-[13px] text-negative" role="alert">
                {actionError}
              </p>
            ) : null}
            {isLoading ? (
              <Skeleton className="h-24 w-full" />
            ) : active.length === 0 ? (
              <EmptyState icon={<BellPlus className="size-5" />} title="No active alert" description="Create one above. It keeps running when Sensitor is closed." className="py-6" />
            ) : (
              <ul className="divide-y divide-line">
                {active.map((a) => {
                  const asset = bySlug.get(a.project_slug);
                  return (
                    <li key={a.id} className="flex items-center gap-3 py-3">
                      <TokenLogo src={asset?.logo} name={asset?.name ?? a.project_slug} size={30} />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[14px] text-fg">{describeRule(asset?.ticker ?? a.project_slug, a.kind, Number(a.threshold))}</div>
                        <div className="num truncate text-[12px] text-muted">{distance(a, asset) ?? "Live price n/a"}</div>
                      </div>
                      <IconButton label="Pause alert" busy={busyId === a.id} onClick={() => setActive(a, false)}>
                        <Pause className="size-4" />
                      </IconButton>
                      <IconButton label="Delete alert" busy={busyId === a.id} onClick={() => remove(a)} danger>
                        <Trash2 className="size-4" />
                      </IconButton>
                    </li>
                  );
                })}
              </ul>
            )}
          </CardBody>
        </Card>

        {paused.length ? (
          <Card>
            <CardHeader title="Triggered and paused" subtitle="Re-arm an alert to watch the level again" icon={<RotateCcw className="size-4" />} />
            <CardBody className="pt-3">
              <ul className="divide-y divide-line">
                {paused.map((a) => {
                  const asset = bySlug.get(a.project_slug);
                  const unit = ALERT_KIND_META[a.kind].unit;
                  return (
                    <li key={a.id} className="flex items-center gap-3 py-3">
                      <TokenLogo src={asset?.logo} name={asset?.name ?? a.project_slug} size={30} className="opacity-70" />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[14px] text-fg-2">{describeRule(asset?.ticker ?? a.project_slug, a.kind, Number(a.threshold))}</div>
                        <div className="truncate text-[12px] text-muted">
                          {a.triggered_at ? (
                            <>
                              Triggered <TimeAgo iso={a.triggered_at} /> at{" "}
                              <span className="num">{a.triggered_value == null ? "n/a" : unit === "usd" ? formatPrice(Number(a.triggered_value)) : formatPercent(Number(a.triggered_value))}</span>
                            </>
                          ) : (
                            "Paused"
                          )}
                        </div>
                      </div>
                      <IconButton label="Re-arm alert" busy={busyId === a.id} onClick={() => setActive(a, true)}>
                        <Play className="size-4" />
                      </IconButton>
                      <IconButton label="Delete alert" busy={busyId === a.id} onClick={() => remove(a)} danger>
                        <Trash2 className="size-4" />
                      </IconButton>
                    </li>
                  );
                })}
              </ul>
            </CardBody>
          </Card>
        ) : null}
      </div>

      <Card>
        <CardHeader
          title="Notifications"
          subtitle={notes.unread ? `${notes.unread} unread` : "All caught up"}
          icon={<Inbox className="size-4" />}
          action={
            notes.unread ? (
              <button onClick={() => notes.markRead(notes.items.filter((n) => !n.read_at).map((n) => n.id))} className="inline-flex items-center gap-1.5 text-[12px] text-accent hover:text-accent-strong">
                <CheckCheck className="size-3.5" aria-hidden /> Mark all read
              </button>
            ) : null
          }
        />
        <CardBody className="pt-3">
          {notes.isLoading ? (
            <Skeleton className="h-24 w-full" />
          ) : notes.items.length === 0 ? (
            <EmptyState icon={<Inbox className="size-5" />} title="Nothing yet" description="When an alert triggers, the notification appears here." className="py-6" />
          ) : (
            <ul className="space-y-1">
              {notes.items.map((n) => (
                <li key={n.id} className={cn("group relative rounded-lg p-3", !n.read_at && "bg-accent-soft/50")}>
                  <div className="flex items-start gap-2.5">
                    <span className={cn("mt-1.5 size-2 shrink-0 rounded-full", n.read_at ? "bg-transparent" : "bg-accent")} aria-hidden />
                    <div className="min-w-0 flex-1">
                      <Link
                        href={n.link ?? "/alerts"}
                        onClick={() => !n.read_at && notes.markRead([n.id])}
                        className="block text-[13.5px] font-medium text-fg hover:text-accent-strong"
                      >
                        {n.title}
                        {!n.read_at ? <span className="sr-only"> (unread)</span> : null}
                      </Link>
                      <p className="mt-0.5 text-[12.5px] leading-relaxed text-fg-2">{n.body}</p>
                      <TimeAgo iso={n.created_at} className="mt-1 block text-[11.5px] text-subtle" />
                    </div>
                    <button
                      onClick={() => notes.remove(n.id)}
                      className="flex size-7 shrink-0 items-center justify-center rounded-md text-subtle opacity-0 hover:bg-surface-2 hover:text-negative focus:opacity-100 group-hover:opacity-100"
                      aria-label="Delete notification"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

function IconButton({ label, busy, danger, onClick, children }: { label: string; busy?: boolean; danger?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      disabled={busy}
      aria-label={label}
      title={label}
      className={cn("flex size-8 shrink-0 items-center justify-center rounded-lg text-muted hover:bg-surface-2 disabled:opacity-40", danger ? "hover:text-negative" : "hover:text-fg")}
    >
      {busy ? <Loader2 className="size-4 animate-spin" /> : children}
    </button>
  );
}

function NewAlertForm({
  assets,
  activeCount,
  limit,
  userId,
  onCreated,
  quoteSource,
}: {
  assets: AlertAsset[];
  activeCount: number;
  limit: number;
  userId: string;
  onCreated: () => void;
  quoteSource: React.ReactNode;
}) {
  const { supabase } = useAuth();
  const [slug, setSlug] = useState(assets.find((a) => a.slug === "ethereum")?.slug ?? assets[0]?.slug ?? "");
  const [kind, setKind] = useState<AlertKind>("price_above");
  const [threshold, setThreshold] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<string | null>(null);
  const asset = assets.find((a) => a.slug === slug);
  const unit = ALERT_KIND_META[kind].unit;
  const full = activeCount >= limit;

  const suggestions = useMemo(() => {
    if (unit === "pct") return [5, 10, 15];
    if (asset?.price == null) return [];
    const sign = kind === "price_above" ? 1 : -1;
    return [5, 10, 20].map((p) => asset.price! * (1 + (sign * p) / 100));
  }, [asset, kind, unit]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setError(null);
    setCreated(null);
    const t = Number(threshold.replace(",", "."));
    if (!(t > 0)) return setError(unit === "pct" ? "Enter a percentage above 0." : "Enter a price above 0.");
    if (unit === "pct" && t > 100) return setError("Use a percentage up to 100.");
    if (asset?.price != null && unit === "usd") {
      if (kind === "price_above" && t <= asset.price) return setError(`${asset.ticker} is already above this level (now ${formatPrice(asset.price)}).`);
      if (kind === "price_below" && t >= asset.price) return setError(`${asset.ticker} is already below this level (now ${formatPrice(asset.price)}).`);
    }
    setBusy(true);
    const { error } = await supabase.from("alerts").insert({ user_id: userId, project_slug: slug, kind, threshold: t });
    setBusy(false);
    if (error) return setError(error.message.includes("limit") ? `You already have ${limit} active alerts, the limit for your plan.` : error.message);
    setThreshold("");
    setCreated(describeRule(asset?.ticker ?? slug, kind, t));
    onCreated();
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader title="New alert" icon={<BellPlus className="size-4" />} action={quoteSource} />
      <CardBody>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,0.9fr)]">
            <div>
              <label htmlFor="al-asset" className={label}>
                Project
              </label>
              <select id="al-asset" value={slug} onChange={(e) => setSlug(e.target.value)} className={field}>
                {assets.map((a) => (
                  <option key={a.slug} value={a.slug}>
                    {a.name} ({a.ticker})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="al-kind" className={label}>
                Rule
              </label>
              <select
                id="al-kind"
                value={kind}
                onChange={(e) => {
                  setKind(e.target.value as AlertKind);
                  setThreshold("");
                }}
                className={field}
              >
                {(Object.keys(ALERT_KIND_META) as AlertKind[]).map((k) => (
                  <option key={k} value={k}>
                    {ALERT_KIND_META[k].label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="al-threshold" className={label}>
                {unit === "pct" ? "Threshold (%)" : "Price (USD)"}
              </label>
              <input id="al-threshold" inputMode="decimal" value={threshold} onChange={(e) => setThreshold(e.target.value)} placeholder={unit === "pct" ? "10" : "0.00"} className={cn(field, "num")} />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px] text-muted">
            <span className="num">
              {asset?.ticker} now {formatPrice(asset?.price)}, 24h {formatPercent(asset?.change24h)}
            </span>
            {suggestions.length ? <span className="text-subtle">Quick fill:</span> : null}
            {suggestions.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setThreshold(unit === "pct" ? String(s) : String(Number(s.toPrecision(4))))}
                className="num rounded-md border border-line-strong px-2 py-0.5 text-fg-2 hover:border-accent/50 hover:text-fg"
              >
                {unit === "pct" ? `${s}%` : `${kind === "price_above" ? "+" : "-"}${[5, 10, 20][i]}%`}
              </button>
            ))}
          </div>
          {error ? (
            <p className="rounded-lg border border-negative/25 bg-negative-soft px-3 py-2 text-[13px] text-negative" role="alert">
              {error}
            </p>
          ) : null}
          {created ? (
            <p className="rounded-lg border border-positive/25 bg-positive-soft px-3 py-2 text-[13px] text-positive" role="status">
              Alert created: {created}.
            </p>
          ) : null}
          <div className="flex items-center justify-between gap-3">
            <span className="text-[12px] text-subtle">{full ? `Limit reached: pause or delete an alert first.` : `${limit - activeCount} active alert${limit - activeCount === 1 ? "" : "s"} left on your plan`}</span>
            <button
              type="submit"
              disabled={busy || full}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-accent px-4 text-sm font-semibold text-[#0d1020] hover:bg-accent-strong disabled:opacity-40"
            >
              {busy ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <BellPlus className="size-4" aria-hidden />} Create alert
            </button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
