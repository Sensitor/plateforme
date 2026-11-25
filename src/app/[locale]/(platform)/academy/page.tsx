import type { Metadata } from "next";
import { ArrowUpRight, BookMarked, ClipboardCheck, Route, Video } from "lucide-react";
import Link from "@/i18n/link";
import { INVESTING_PATH, START_HERE } from "@/content/academy-deep";
import { lessonMinutes } from "@/lib/academy/lesson";
import { academyCatalog } from "@/lib/academy/catalog";
import { AcademyProgressPanel } from "@/components/academy/progress-panel";
import { localizedConcept, localizedDeep } from "@/lib/academy/localized";
import { getLocale } from "@/i18n/server";
import { getT } from "@/i18n/server";
import { pageMetadata } from "@/i18n/metadata";
import { LessonPath, type PathLesson } from "@/components/academy/lesson-path";
import { ACADEMY_CATEGORIES, CONCEPTS } from "@/content/concepts";
import { PROJECTS } from "@/content/projects";
import { ACADEMY_COLORS, tint } from "@/lib/brand";
import { SectionTitle } from "@/components/ui/section-heading";
import { ConceptBrowser } from "@/components/academy/concept-browser";
import { TrackArt } from "@/components/academy/track-art";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("academy", "/academy");
}

const COMING_STYLE = [
  { icon: Route, color: "#7C93FF" },
  { icon: Video, color: "#EC7BB5" },
  { icon: ClipboardCheck, color: "#5FCB86" },
  { icon: BookMarked, color: "#E8B04B" },
];

export default async function AcademyPage() {
  const dict = await getT();
  const t = dict.academy.home;
  const COMING = t.coming.items.map(([title, text], i) => ({ ...COMING_STYLE[i], t: title, d: text }));
  const usage: Record<string, number> = {};
  for (const p of PROJECTS) for (const c of p.dossier.concepts) usage[c] = (usage[c] ?? 0) + 1;
  const locale = await getLocale();
  const concepts = CONCEPTS.map((c) => localizedConcept(c, locale));
  const toPath = (slugs: string[]): PathLesson[] =>
    slugs
      .map((slug) => concepts.find((c) => c.slug === slug)!)
      .map((c) => ({ slug: c.slug, title: c.title, summary: c.summary, category: c.category, categoryLabel: dict.labels.academyTracks[c.category].label, minutes: lessonMinutes(c, localizedDeep(c.slug, locale)) }));
  const path = toPath(START_HERE);
  const investPath = toPath(INVESTING_PATH);
  const inv = dict.investing.home;
  const investColor = ACADEMY_COLORS.investing;
  const counts = Object.fromEntries(ACADEMY_CATEGORIES.map((c) => [c.id, CONCEPTS.filter((x) => x.category === c.id).length]));
  return (
    <div className="space-y-14">
      <header className="relative overflow-hidden rounded-2xl border border-line bg-surface px-6 py-10 md:px-10">
        <div className="pointer-events-none absolute right-8 top-1/2 hidden -translate-y-1/2 grid-cols-4 gap-2.5 xl:grid" aria-hidden>
          {ACADEMY_CATEGORIES.map((c) => (
            <div key={c.id} className="h-[74px] w-[112px] overflow-hidden rounded-lg border border-line" style={{ backgroundColor: tint(ACADEMY_COLORS[c.id], 0.1) }}>
              <TrackArt category={c.id} className="h-full w-full" />
            </div>
          ))}
        </div>
        <div className="relative max-w-2xl xl:max-w-[calc(100%-520px)]">
          <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-accent">{t.eyebrow}</div>
          <h1 className="serif-display mt-3 text-[44px] leading-[1.02] text-fg md:text-[60px]">
            {t.title} <span className="italic text-violet">{t.titleAccent}</span>
          </h1>
          <p className="mt-4 text-[16px] leading-relaxed text-fg-2">
            {t.intro(CONCEPTS.length)}
          </p>
        </div>
      </header>

      <section id="progress" className="scroll-mt-24">
        <SectionTitle title={dict.academy.progress.title} description={dict.academy.progress.description} />
        <AcademyProgressPanel catalog={academyCatalog(dict)} />
      </section>

      <section>
        <SectionTitle title={t.tracks.title} description={t.tracks.description} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {ACADEMY_CATEGORIES.map((c, i) => {
            const color = ACADEMY_COLORS[c.id];
            return (
              <div key={c.id} className="group overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-line-strong">
                <div className="relative h-[118px]" style={{ backgroundColor: tint(color, 0.08) }}>
                  <TrackArt category={c.id} className="absolute inset-0 h-full w-full transition-transform duration-300 group-hover:scale-[1.04]" />
                  <span className="num absolute left-4 top-3 text-[12px]" style={{ color }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="p-4">
                  <div className="serif-display text-[23px] leading-tight text-fg">{dict.labels.academyTracks[c.id].label}</div>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{dict.labels.academyTracks[c.id].description}</p>
                  <div className="mt-3 text-[12px] font-medium" style={{ color }}>
                    {t.tracks.count(counts[c.id])}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <SectionTitle title={t.startHere.title} description={t.startHere.description} />
        <LessonPath lessons={path} />
      </section>

      <section id="invest" className="scroll-mt-24">
        <div className="relative overflow-hidden rounded-2xl border border-line" style={{ backgroundColor: tint(investColor, 0.07) }}>
          <span className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: investColor }} aria-hidden />
          <TrackArt category="investing" className="pointer-events-none absolute -right-4 top-1/2 hidden h-[170px] w-[290px] -translate-y-1/2 md:block" />
          <div className="relative p-6 md:p-8 md:pr-[320px]">
            <div className="text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: investColor }}>
              {inv.eyebrow}
            </div>
            <h2 className="serif-display mt-2 text-[38px] leading-[1.05] text-fg md:text-[48px]">{inv.title}</h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-fg-2">{inv.description}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="text-[13px] font-medium" style={{ color: investColor }}>
                {inv.count(investPath.length)}
              </span>
              <Link href="/strategies" className="group inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-[13px] text-fg hover:border-line-strong">
                {inv.strategies} <ArrowUpRight className="size-3.5 text-subtle group-hover:text-accent" aria-hidden />
              </Link>
            </div>
            <p className="mt-2 text-[12px] text-muted">{inv.strategiesText}</p>
          </div>
        </div>
        <h3 className="mb-4 mt-8 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-muted">{inv.pathTitle}</h3>
        <LessonPath lessons={investPath} />
      </section>

      <section>
        <SectionTitle title={t.all.title} description={t.all.description} />
        <ConceptBrowser concepts={concepts} usage={usage} />
      </section>

      <section>
        <SectionTitle title={t.coming.title} description={t.coming.description} />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {COMING.map((x) => (
            <div key={x.t} className="rounded-xl border border-dashed border-line-strong p-4">
              <span className="flex size-8 items-center justify-center rounded-lg" style={{ backgroundColor: tint(x.color, 0.14), color: x.color }}>
                <x.icon className="size-4" aria-hidden />
              </span>
              <div className="mt-3 text-[14px] font-medium text-fg">{x.t}</div>
              <p className="mt-1 text-[12.5px] leading-relaxed text-muted">{x.d}</p>
              <span className="mt-3 inline-block text-[11px] uppercase tracking-[0.12em] text-subtle">{t.coming.phase}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
