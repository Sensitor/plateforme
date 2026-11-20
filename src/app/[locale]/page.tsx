import { tint } from "@/lib/brand";
import { connection } from "next/server";
import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "@/i18n/link";
import { ArrowRight, BookOpen, Check, Compass, FileSearch, LineChart, Scale, ShieldCheck, Star, Wallet } from "lucide-react";
import { PROJECTS } from "@/content/projects";
import { localizedPlans } from "@/content/plans";
import { getCoverageQuotes, getFearGreed, getGlobalMarket } from "@/lib/market/service";
import { formatPercent, formatPrice, formatUsdCompact } from "@/lib/format";
import { PILLARS } from "@/lib/research/taxonomy";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shell/logo";
import { ButtonLink } from "@/components/ui/button";
import { Delta } from "@/components/ui/delta";
import { TokenLogo } from "@/components/ui/token-logo";
import { SourceTag } from "@/components/ui/source-tag";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ClaimKindBadge } from "@/components/research/pills";
import { LanguageSwitcher } from "@/components/shell/language-switcher";
import { getT } from "@/i18n/server";
import { pageMetadata } from "@/i18n/metadata";
import { SECTORS } from "@/lib/research/taxonomy";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("home", "/");
}

export default async function LandingPage() {
  const dict = await getT();
  const t = dict.landing;
  return (
    <div className="min-h-screen overflow-x-hidden">
      <header className="sticky top-0 z-30 border-b border-line/60 bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
          <Link href="/" aria-label={dict.shell.home}>
            <Logo />
          </Link>
          <nav aria-label={t.nav.primary} className="hidden items-center gap-7 text-[13.5px] text-fg-2 md:flex">
            <Link href="/explore" className="hover:text-fg">{t.nav.projects}</Link>
            <Link href="/research" className="hover:text-fg">{t.nav.research}</Link>
            <Link href="/academy" className="hover:text-fg">{t.nav.academy}</Link>
            <Link href="/research/methodology" className="hover:text-fg">{t.nav.methodology}</Link>
            <Link href="/pricing" className="hover:text-fg">{t.nav.plans}</Link>
          </nav>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ButtonLink href="/overview" variant="primary" size="sm">
              {t.open} <ArrowRight className="size-3.5" aria-hidden />
            </ButtonLink>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative">
          <HeroBackdrop />
          <div className="relative mx-auto grid grid-cols-1 max-w-6xl gap-12 px-4 pb-20 pt-16 md:px-6 md:pt-24 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
            <div>
              <Badge tone="accent" className="text-[12px]">{t.badge}</Badge>
              <h1 className="serif-display mt-5 text-[46px] leading-[1] text-fg md:text-[68px]">
                {t.hero[0]}
                <br />
                {t.hero[1]}
                <br />
                <span className="italic text-violet">{t.hero[2]}</span>
              </h1>
              <p className="mt-6 max-w-xl text-[16.5px] leading-relaxed text-muted">
                {t.intro}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/overview" variant="primary" size="lg">
                  {t.ctaExplore} <ArrowRight className="size-4" aria-hidden />
                </ButtonLink>
                <ButtonLink href="/projects/ethereum" variant="outline" size="lg">
                  {t.ctaDossier}
                </ButtonLink>
              </div>
              <p className="mt-5 text-[12.5px] text-subtle">{t.fineprint}</p>
            </div>
            <Suspense fallback={<Skeleton className="h-[360px] w-full rounded-2xl" />}>
              <LiveSnapshot />
            </Suspense>
          </div>
        </section>

        {/* Coverage strip */}
        <section className="border-y border-line bg-bg-elevated">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 md:flex-row md:items-center md:px-6">
            <p className="shrink-0 text-[13px] text-muted">
              <span className="num text-fg">{PROJECTS.length}</span> {t.coverage(SECTORS.length)}
            </p>
            <div className="flex flex-wrap gap-2.5 md:justify-end md:flex-1">
              {PROJECTS.map((p) => (
                <Link key={p.slug} href={`/projects/${p.slug}`} title={p.name} className="opacity-80 transition-opacity hover:opacity-100">
                  <TokenLogo src={p.logo} name={p.name} size={26} />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Three dimensions */}
        <section className="mx-auto max-w-6xl px-4 py-20 md:px-6">
          <h2 className="serif-display max-w-2xl text-[36px] leading-tight text-fg md:text-[46px]">{t.dimensionsTitle}</h2>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { k: t.dimensions.discover.title, color: "#7C93FF", icon: Compass, text: t.dimensions.discover.text, links: [[t.dimensions.discover.links[0], "/explore"], [t.dimensions.discover.links[1], "/graph"]] },
              { k: t.dimensions.understand.title, color: "#A487F0", icon: BookOpen, text: t.dimensions.understand.text, links: [[t.dimensions.understand.links[0], "/research"], [t.dimensions.understand.links[1], "/academy"]] },
              { k: t.dimensions.manage.title, color: "#5FCB86", icon: Wallet, text: t.dimensions.manage.text, links: [[t.dimensions.manage.links[0], "/portfolio"], [t.dimensions.manage.links[1], "/watchlist"]] },
            ].map((d) => (
              <div key={d.k} className="relative overflow-hidden rounded-2xl border border-line bg-surface p-6">
                <span className="absolute inset-x-0 top-0 h-[3px]" style={{ backgroundColor: d.color }} aria-hidden />
                <div className="flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-xl" style={{ backgroundColor: tint(d.color, 0.14), color: d.color }}>
                    <d.icon className="size-5" aria-hidden />
                  </span>
                  <Badge tone="positive">{t.available}</Badge>
                </div>
                <h3 className="serif-display mt-5 text-[30px] leading-none text-fg">{d.k}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{d.text}</p>
                <div className="mt-5 flex gap-4 text-[13px]">
                  {d.links.map(([l, h]) => (
                    <Link key={h} href={h} className="text-accent hover:text-accent-strong">
                      {l} →
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Research quality */}
        <section className="border-t border-line bg-bg-elevated">
          <div className="mx-auto grid grid-cols-1 max-w-6xl gap-12 px-4 py-20 md:px-6 lg:grid-cols-2">
            <div>
              <Badge tone="violet">{t.standardBadge}</Badge>
              <h2 className="serif-display mt-4 text-[36px] leading-tight text-fg md:text-[46px]">{t.standardTitle}</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">{t.standardText}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {PILLARS.map((p) => (
                  <span key={p.id} className="rounded-full border border-line-strong px-3 py-1 text-[12.5px] text-fg-2">{dict.labels.pillars[p.id].label}</span>
                ))}
              </div>
              <Link href="/research/methodology" className="mt-6 inline-block text-[14px] text-accent hover:text-accent-strong">
                {t.readMethodology}
              </Link>
            </div>
            <div className="space-y-3 rounded-2xl border border-line bg-surface p-5">
              <div className="flex items-center gap-3 border-b border-line pb-3">
                <TokenLogo src="/logos/ethereum.png" name="Ethereum" size={28} />
                <div className="text-[14px] font-medium text-fg">{t.excerptTitle}</div>
              </div>
              {[
                { k: "fact" as const, t: t.excerpt[0], s: "[10]" },
                { k: "interpretation" as const, t: t.excerpt[1] },
                { k: "hypothesis" as const, t: t.excerpt[2] },
              ].map((c) => (
                <div key={c.k} className="flex flex-col gap-1.5 rounded-xl bg-bg-elevated p-3.5">
                  <ClaimKindBadge kind={c.k} />
                  <p className="text-[13.5px] leading-relaxed text-fg-2">
                    {c.t} {c.s ? <span className="num align-super text-[10px] text-accent">{c.s}</span> : null}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="mx-auto max-w-6xl px-4 py-20 md:px-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {[
              { icon: ShieldCheck, t: t.principles[0][0], d: t.principles[0][1] },
              { icon: FileSearch, t: t.principles[1][0], d: t.principles[1][1] },
              { icon: Scale, t: t.principles[2][0], d: t.principles[2][1] },
              { icon: LineChart, t: t.principles[3][0], d: t.principles[3][1] },
            ].map((x) => (
              <div key={x.t} className="rounded-xl border border-line p-5">
                <x.icon className="size-5 text-accent" aria-hidden />
                <div className="mt-3 font-medium text-fg">{x.t}</div>
                <p className="mt-1 text-[13px] leading-relaxed text-muted">{x.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Plans */}
        <section className="border-t border-line bg-bg-elevated">
          <div className="mx-auto max-w-6xl px-4 py-20 md:px-6">
            <h2 className="serif-display text-[36px] leading-tight text-fg md:text-[46px]">{t.plansTitle}</h2>
            <p className="mt-2 text-[15px] text-muted">{t.plansText}</p>
            <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
              {localizedPlans(dict).map((p) => (
                <div key={p.id} className={cn("rounded-2xl border bg-surface p-6", p.highlight ? "border-accent/50" : "border-line")}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-fg">{p.name}</h3>
                    <Badge tone={p.available ? "positive" : "outline"}>{p.status}</Badge>
                  </div>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="num text-3xl font-semibold text-fg">{p.price}</span>
                    <span className="text-[13px] text-muted">{p.period}</span>
                  </div>
                  <ul className="mt-5 space-y-2 text-[13.5px] text-fg-2">
                    {p.features.slice(0, 5).map((f) => (
                      <li key={f} className="flex gap-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <ButtonLink href="/overview" variant="primary" size="lg">
                {t.startFree} <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <Logo />
              <p className="mt-3 text-[13px] text-muted">{t.footerTagline}</p>
            </div>
            <nav aria-label={t.nav.footer} className="grid grid-cols-2 gap-x-10 gap-y-2 text-[13px] text-fg-2 sm:grid-cols-3">
              <Link href="/explore" className="hover:text-fg">{t.nav.explore}</Link>
              <Link href="/markets" className="hover:text-fg">{t.nav.markets}</Link>
              <Link href="/research" className="hover:text-fg">{t.nav.research}</Link>
              <Link href="/academy" className="hover:text-fg">{t.nav.academy}</Link>
              <Link href="/research/methodology" className="hover:text-fg">{t.nav.methodology}</Link>
              <Link href="/pricing" className="hover:text-fg">{t.nav.plans}</Link>
            </nav>
          </div>
          <p className="mt-8 border-t border-line pt-6 text-[12px] leading-relaxed text-subtle">
            {t.disclaimer}
          </p>
        </div>
      </footer>
    </div>
  );
}

async function LiveSnapshot() {
  await connection(); // market data is request-time: never fetched at build
  const dict = await getT();
  const t = dict.landing.snapshot;
  const [global, fng, quotes] = await Promise.all([getGlobalMarket(), getFearGreed(), getCoverageQuotes()]);
  const g = global.data;
  const f = fng.data?.[0];
  const picks = ["bitcoin", "ethereum", "solana", "chainlink"];
  return (
    <div className="relative rounded-2xl border border-line bg-surface/90 p-5 shadow-2xl shadow-black/30 backdrop-blur">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-medium text-fg">{t.title}</span>
        <span className="flex items-center gap-1.5 text-[11.5px] text-muted">
          <span className="size-1.5 rounded-full bg-positive" aria-hidden /> {t.real}
        </span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line">
        <div className="bg-bg-elevated p-3">
          <div className="text-[11px] text-muted">{t.marketCap}</div>
          <div className="num mt-1 text-[15px] text-fg">{formatUsdCompact(g?.totalMarketCap)}</div>
          <Delta value={g?.marketCapChange24h} className="text-[11.5px]" />
        </div>
        <div className="bg-bg-elevated p-3">
          <div className="text-[11px] text-muted">{t.dominance}</div>
          <div className="num mt-1 text-[15px] text-fg">{formatPercent(g?.btcDominance, { signed: false, digits: 1 })}</div>
        </div>
        <div className="bg-bg-elevated p-3">
          <div className="text-[11px] text-muted">{t.fearGreed}</div>
          <div className="num mt-1 text-[15px] text-fg">{f?.value ?? "n/a"}</div>
          <div className="truncate text-[11px] text-subtle">{f?.classification ? (dict.ui.fearGreed[f.classification] ?? f.classification) : null}</div>
        </div>
      </div>
      <ul className="mt-4 divide-y divide-line">
        {picks.map((slug) => {
          const p = PROJECTS.find((x) => x.slug === slug)!;
          const q = quotes.data?.[slug];
          return (
            <li key={slug}>
              <Link href={`/projects/${slug}`} className="flex items-center gap-3 py-2.5">
                <TokenLogo src={p.logo} name={p.name} size={26} />
                <span className="flex-1 text-[13.5px] text-fg">
                  {p.name} <span className="text-subtle">{p.ticker}</span>
                </span>
                <span className="num text-[13px] text-fg-2">{formatPrice(q?.price)}</span>
                <Delta value={q?.change24h} className="w-16 text-right text-[12.5px]" />
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="mt-3 flex flex-wrap gap-x-3">
        <SourceTag result={quotes} />
        <SourceTag result={fng} label={t.sentiment} />
      </div>
      <Link href="/explore" className="mt-4 flex items-center justify-center gap-1.5 rounded-lg border border-line-strong py-2 text-[13px] text-fg-2 hover:text-fg">
        <Star className="size-3.5" aria-hidden /> {t.browse(PROJECTS.length)}
      </Link>
    </div>
  );
}

function HeroBackdrop() {
  return (
    <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 700" fill="none">
      <defs>
        <radialGradient id="landing-glow" cx="78%" cy="35%" r="45%">
          <stop offset="0%" stopColor="#7896ff" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#7896ff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="700" fill="url(#landing-glow)" />
      {Array.from({ length: 16 }).map((_, i) => (
        <path key={i} d={`M ${-100 + i * 40} 700 C ${300 + i * 20} ${560 - i * 18}, ${700 + i * 10} ${380 - i * 12}, 1300 ${120 + i * 16}`} stroke="#9c83e8" strokeOpacity={0.07} strokeWidth="1" />
      ))}
    </svg>
  );
}
