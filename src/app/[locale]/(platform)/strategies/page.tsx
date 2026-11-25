import { Suspense } from "react";
import type { Metadata } from "next";
import { ArrowRight, ShieldAlert } from "lucide-react";
import Link from "@/i18n/link";
import { getLocale, getT } from "@/i18n/server";
import { pageMetadata } from "@/i18n/metadata";
import { SectionTitle } from "@/components/ui/section-heading";
import { Skeleton } from "@/components/ui/skeleton";
import { WmaSection } from "@/components/strategies/wma-section";
import { DcaSection } from "@/components/strategies/dca-section";
import { CyclesSection } from "@/components/strategies/cycles-section";
import { ACADEMY_COLORS, tint } from "@/lib/brand";
import { CONCEPT_BY_SLUG } from "@/content/concepts";
import { localizedConcept } from "@/lib/academy/localized";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("strategies", "/strategies");
}

/** Lessons behind the tools on this page (only the ones that exist are shown). */
const LEARN = ["dca", "moving-averages", "market-cycles", "halving", "compound-interest", "drawdowns"];

export default async function StrategiesPage() {
  const [dict, locale] = await Promise.all([getT(), getLocale()]);
  const t = dict.strategies;
  const lessons = LEARN.map((slug) => CONCEPT_BY_SLUG[slug]).filter((c) => c !== undefined).map((c) => localizedConcept(c, locale));
  const sections = [
    { id: "wma", label: t.toc.wma },
    { id: "dca", label: t.toc.dca },
    { id: "cycles", label: t.toc.cycles },
    { id: "learn", label: t.toc.learn },
  ];
  return (
    <div className="space-y-14">
      <header className="relative overflow-hidden rounded-2xl border border-line bg-surface px-6 py-10 md:px-10">
        <svg viewBox="0 0 520 220" className="pointer-events-none absolute -right-6 top-1/2 hidden h-[220px] w-[520px] -translate-y-1/2 opacity-90 xl:block" aria-hidden>
          <path d="M10 170 C 70 160, 90 120, 140 128 S 200 60, 250 80 S 320 150, 360 110 S 440 30, 510 40" fill="none" stroke="#F7931A" strokeWidth="2.5" />
          <path d="M10 185 C 90 178, 160 160, 250 140 S 400 100, 510 82" fill="none" stroke="#7896FF" strokeWidth="2.5" strokeDasharray="6 5" />
          {[40, 95, 150, 205, 260, 315, 370, 425, 480].map((cx, i) => (
            <rect key={cx} x={cx} y={200 - (i + 1) * 9} width="26" height={(i + 1) * 9} rx="3" fill={tint("#9C83E8", 0.18 + i * 0.04)} />
          ))}
        </svg>
        <div className="relative max-w-2xl xl:max-w-[calc(100%-520px)]">
          <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-accent">{t.eyebrow}</div>
          <h1 className="serif-display mt-3 text-[44px] leading-[1.02] text-fg md:text-[56px]">
            {t.title} <span className="italic text-violet">{t.titleAccent}</span>
          </h1>
          <p className="mt-4 text-[16px] leading-relaxed text-fg-2">{t.intro}</p>
          <p className="mt-5 flex items-start gap-2.5 rounded-lg border border-warning/30 bg-warning/5 px-3.5 py-2.5 text-[12.5px] leading-relaxed text-fg-2">
            <ShieldAlert className="mt-0.5 size-4 shrink-0 text-warning" aria-hidden />
            {t.disclaimer}
          </p>
          <nav aria-label={t.eyebrow} className="mt-5 flex flex-wrap gap-2">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="rounded-full border border-line px-3 py-1 text-[12.5px] text-muted hover:border-line-strong hover:text-fg">
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <section id="wma" className="scroll-mt-24">
        <SectionTitle title={t.wma.title} description={t.wma.description} />
        <Suspense fallback={<Skeleton className="h-[520px] w-full rounded-xl" />}>
          <WmaSection />
        </Suspense>
      </section>

      <section id="dca" className="scroll-mt-24">
        <SectionTitle title={t.dca.title} description={t.dca.description} />
        <Suspense fallback={<Skeleton className="h-[560px] w-full rounded-xl" />}>
          <DcaSection />
        </Suspense>
      </section>

      <section id="cycles" className="scroll-mt-24">
        <SectionTitle title={t.cycles.title} description={t.cycles.description} />
        <Suspense fallback={<Skeleton className="h-[460px] w-full rounded-xl" />}>
          <CyclesSection />
        </Suspense>
      </section>

      <section id="learn" className="scroll-mt-24">
        <SectionTitle title={t.learn.title} description={t.learn.description} />
        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {lessons.map((c) => {
            const color = ACADEMY_COLORS[c.category];
            return (
              <li key={c.slug}>
                <Link href={`/academy/concepts/${c.slug}`} className="group flex h-full flex-col rounded-xl border border-line bg-surface p-4 transition-colors hover:border-line-strong">
                  <span className="text-[11px] font-medium uppercase tracking-[0.12em]" style={{ color }}>
                    {dict.labels.academyTracks[c.category].label}
                  </span>
                  <span className="serif-display mt-1.5 text-[21px] leading-tight text-fg">{c.title}</span>
                  <span className="mt-1.5 flex-1 text-[13px] leading-relaxed text-muted">{c.summary}</span>
                  <ArrowRight className="mt-3 size-4 text-subtle transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
