"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { useT } from "@/i18n/client";
import { BellRing, CircleUser, DatabaseZap, GraduationCap, KeyRound, Loader2, Lock, LogOut, Settings2 } from "lucide-react";
import Link from "@/i18n/link";
import { cn } from "@/lib/utils";
import { useAuth, type Profile } from "@/lib/auth/auth-provider";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Badge, type BadgeTone } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { isCompleted, useAcademyProgress } from "@/lib/academy/progress";
import { computeBadges } from "@/lib/academy/badges";
import type { AcademyCatalog } from "@/lib/academy/catalog";
import { BadgeMedal } from "@/components/academy/badge-medal";
import { SyncLine } from "@/components/academy/progress-panel";

const TIER_TONE: Record<Profile["tier"], BadgeTone> = { free: "neutral", pro: "accent", research_club: "violet" };

const field = "h-10 w-full rounded-lg border border-line bg-bg-elevated px-3 text-sm text-fg placeholder:text-subtle focus:border-accent/60 focus:outline-none";

function Commitments() {
  const t = useT().account.commitments;
  return (
    <Card>
      <CardHeader title={t.title} icon={<Lock className="size-4" />} />
      <CardBody>
        <ul className="space-y-2 text-[13.5px] text-fg-2">
          {t.items.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
}

function Learning({ catalog }: { catalog: AcademyCatalog }) {
  const dict = useT();
  const t = dict.account.learning;
  const { progress, ready } = useAcademyProgress();
  const p = ready ? progress : {};
  const completed = catalog.lessons.filter((l) => isCompleted(p[l.slug])).length;
  const badges = computeBadges(p, catalog, dict);
  const earned = badges.filter((b) => b.earned);
  return (
    <Card>
      <CardHeader
        title={t.title}
        icon={<GraduationCap className="size-4" />}
        action={
          <Link href="/academy#progress" className="text-[12.5px] text-accent hover:text-accent-strong">
            {t.open}
          </Link>
        }
      />
      <CardBody className="space-y-4">
        <p className="text-[13.5px] text-fg-2">{t.summary(completed, catalog.lessons.length, earned.length, badges.length)}</p>
        {earned.length ? (
          <ul className="flex flex-wrap gap-x-5 gap-y-3">
            {earned.map((b) => (
              <li key={b.id} className="flex items-center gap-2">
                <BadgeMedal badge={b} size="sm" />
                <span className="text-[13px] text-fg-2">{b.label}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[12.5px] text-muted">{t.empty}</p>
        )}
        <SyncLine />
      </CardBody>
    </Card>
  );
}

export function AccountPanel({ catalog }: { catalog: AcademyCatalog }) {
  const { configured, loading, user, profile, profileError, supabase, refreshProfile, signOut } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const recovery = params.get("recovery") === "1";
  const dict = useT();
  const t = dict.account;

  if (!configured) {
    return (
      <>
        <Card>
          <CardHeader title={t.unconfigured.title} icon={<KeyRound className="size-4" />} action={<Badge tone="outline">{t.unconfigured.badge}</Badge>} />
          <CardBody className="text-[13.5px] leading-relaxed text-fg-2">{t.unconfigured.text}</CardBody>
        </Card>
        <Commitments />
      </>
    );
  }

  if (loading) {
    return (
      <Card>
        <CardBody className="flex items-center gap-4 pt-5">
          <Skeleton className="size-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-24" />
          </div>
        </CardBody>
      </Card>
    );
  }

  if (!user) {
    return (
      <>
        <Card className="overflow-hidden">
          <CardBody className="flex flex-col gap-5 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-[#2a3150] to-[#3b2f5e] text-fg-2">
                <CircleUser className="size-6" aria-hidden />
              </span>
              <div>
                <div className="font-medium text-fg">{t.guest.title}</div>
                <div className="text-[13px] text-muted">{t.guest.text}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <ButtonLink href="/login?next=/account" variant="primary">
                {t.guest.signIn}
              </ButtonLink>
              <ButtonLink href="/login?mode=signup&next=/account" variant="secondary">
                {t.guest.signUp}
              </ButtonLink>
            </div>
          </CardBody>
        </Card>
        <Commitments />
      </>
    );
  }

  const tierId = profile?.tier ?? "free";
  const tier = { label: dict.shell.tiers[tierId], tone: TIER_TONE[tierId] };
  const name = profile?.display_name || user.email?.split("@")[0] || t.member;

  return (
    <>
      <Card>
        <CardBody className="flex flex-col gap-4 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-violet text-[18px] font-semibold text-[#0d1020]">
              {name.slice(0, 1).toUpperCase()}
            </span>
            <div className="min-w-0">
              <div className="truncate font-medium text-fg">{name}</div>
              <div className="truncate text-[13px] text-muted">{user.email}</div>
              <div className="mt-1 text-[12.5px] text-muted">
                {t.plan} <Badge tone={tier.tone}>{tier.label}</Badge>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <ButtonLink href="/pricing" variant="secondary" size="sm">
              {t.viewPlans}
            </ButtonLink>
            <button
              onClick={async () => {
                await signOut();
                router.replace("/overview");
              }}
              className="inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-[13px] text-fg-2 hover:bg-surface-2 hover:text-fg"
            >
              <LogOut className="size-3.5" aria-hidden /> {t.signOut}
            </button>
          </div>
        </CardBody>
      </Card>

      {profileError ? (
        <Card className="border-warning/30">
          <CardHeader title={t.dbError.title} icon={<DatabaseZap className="size-4 text-warning" />} />
          <CardBody className="text-[13.5px] leading-relaxed text-fg-2">
            {t.dbError.before} <code className="num rounded bg-surface-2 px-1 text-[12px]">supabase/migrations/0001_app.sql</code> {t.dbError.after}
            <span className="mt-2 block text-[12px] text-muted">
              {t.dbError.details}: {profileError}
            </span>
          </CardBody>
        </Card>
      ) : null}

      {profile ? <Preferences profile={profile} onSaved={refreshProfile} /> : null}
      <Learning catalog={catalog} />
      <PasswordCard highlight={recovery} supabase={supabase} />
      <Commitments />
    </>
  );
}

function Preferences({ profile, onSaved }: { profile: Profile; onSaved: () => Promise<void> }) {
  const { supabase } = useAuth();
  const t = useT().account.preferences;
  const [name, setName] = useState(profile.display_name ?? "");
  const [locale, setLocale] = useState(profile.locale);
  const [emailAlerts, setEmailAlerts] = useState(profile.email_alerts);
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const dirty = name !== (profile.display_name ?? "") || locale !== profile.locale || emailAlerts !== profile.email_alerts;

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setState("saving");
    const { error } = await supabase
      .from("profiles")
      .update({ display_name: name.trim().slice(0, 60) || null, locale, email_alerts: emailAlerts })
      .eq("id", profile.id);
    if (error) return setState("error");
    await onSaved();
    setState("saved");
  }

  return (
    <Card>
      <CardHeader title={t.title} icon={<Settings2 className="size-4" />} />
      <CardBody>
        <form onSubmit={save} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="display-name" className="mb-1.5 block text-[12px] font-medium text-muted">
                {t.displayName}
              </label>
              <input id="display-name" value={name} maxLength={60} onChange={(e) => setName(e.target.value)} placeholder={t.displayNamePlaceholder} className={field} />
            </div>
            <div>
              <label htmlFor="locale" className="mb-1.5 block text-[12px] font-medium text-muted">
                {t.emailLanguage}
              </label>
              <select id="locale" value={locale} onChange={(e) => setLocale(e.target.value as Profile["locale"])} className={field}>
                <option value="en">English</option>
                <option value="fr">Français</option>
              </select>
            </div>
          </div>
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-bg-elevated p-3.5">
            <input type="checkbox" checked={emailAlerts} onChange={(e) => setEmailAlerts(e.target.checked)} className="mt-0.5 size-4 accent-[#7896FF]" />
            <span>
              <span className="flex items-center gap-2 text-[13.5px] font-medium text-fg">
                <BellRing className="size-3.5 text-accent" aria-hidden /> {t.emailAlerts}
              </span>
              <span className="mt-0.5 block text-[12.5px] text-muted">{t.emailAlertsHint}</span>
            </span>
          </label>
          <div className="flex items-center justify-end gap-3">
            {state === "saved" && !dirty ? <span className="text-[12.5px] text-positive">{t.saved}</span> : null}
            {state === "error" ? <span className="text-[12.5px] text-negative">{t.error}</span> : null}
            <button
              type="submit"
              disabled={!dirty || state === "saving"}
              className="inline-flex h-9 items-center gap-2 rounded-lg bg-accent px-4 text-[13px] font-semibold text-[#0d1020] hover:bg-accent-strong disabled:opacity-40"
            >
              {state === "saving" ? <Loader2 className="size-3.5 animate-spin" aria-hidden /> : null} {t.save}
            </button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}

function PasswordCard({ highlight, supabase }: { highlight: boolean; supabase: ReturnType<typeof useAuth>["supabase"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const t = useT().account.password;
  const [password, setPassword] = useState("");
  const [state, setState] = useState<{ kind: "idle" | "saving" | "saved" | "error"; message?: string }>({ kind: "idle" });

  useEffect(() => {
    if (highlight) ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [highlight]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    if (password.length < 8) return setState({ kind: "error", message: t.tooShort });
    setState({ kind: "saving" });
    const { error } = await supabase.auth.updateUser({ password });
    if (error) return setState({ kind: "error", message: error.message });
    setPassword("");
    setState({ kind: "saved" });
  }

  return (
    <div ref={ref}>
      <Card className={cn(highlight && "border-accent/50")}>
        <CardHeader
          title={highlight ? t.recoveryTitle : t.title}
          subtitle={highlight ? t.recoverySubtitle : t.subtitle}
          icon={<KeyRound className="size-4" />}
        />
        <CardBody>
          <form onSubmit={save} className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor="new-password" className="sr-only">
              {t.label}
            </label>
            <input
              id="new-password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.placeholder}
              className={field}
            />
            <button
              type="submit"
              disabled={state.kind === "saving" || !password}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-line-strong bg-surface-2 px-4 text-sm text-fg hover:bg-surface-3 disabled:opacity-50"
            >
              {state.kind === "saving" ? <Loader2 className="size-3.5 animate-spin" aria-hidden /> : null} {t.update}
            </button>
          </form>
          {state.kind === "saved" ? <p className="mt-2 text-[12.5px] text-positive">{t.updated}</p> : null}
          {state.kind === "error" ? (
            <p className="mt-2 text-[12.5px] text-negative" role="alert">
              {state.message}
            </p>
          ) : null}
        </CardBody>
      </Card>
    </div>
  );
}
