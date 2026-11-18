import type { Metadata } from "next";
import { Award, BookMarked, ClipboardCheck, Route, Video } from "lucide-react";
import { CONCEPT_DEEP } from "@/content/academy-deep";
import { lessonMinutes } from "@/lib/academy/lesson";
import { LessonPath, type PathLesson } from "@/components/academy/lesson-path";
import { ACADEMY_CATEGORIES, CONCEPTS } from "@/content/concepts";
import { PROJECTS } from "@/content/projects";
import { ACADEMY_COLORS, tint } from "@/lib/brand";
import { SectionTitle } from "@/components/ui/section-heading";
import { ConceptBrowser } from "@/components/academy/concept-browser";
import { TrackArt } from "@/components/academy/track-art";

export const metadata: Metadata = { title: "Academy", description: "Learn the concepts behind digital assets, linked directly from every research dossier." };

const COMING = [
  { icon: Route, t: "Learning paths", d: "Sequenced courses such as Crypto fundamentals or Analysing a DeFi protocol.", color: "#7C93FF" },
  { icon: Video, t: "Videos & illustrations", d: "Visual explanations of how mechanisms work.", color: "#EC7BB5" },
  { icon: ClipboardCheck, t: "Case-based exercises", d: "Apply a lesson to a real dossier: read the data, answer, compare with the analysis.", color: "#5FCB86" },
  { icon: BookMarked, t: "Case studies", d: "Historical events analysed step by step.", color: "#E8B04B" },
  { icon: Award, t: "Badges and synced progress", d: "Badges per track, and progress saved to your account across devices.", color: "#A487F0" },
];

export default function AcademyPage() {
  const usage: Record<string, number> = {};
  for (const p of PROJECTS) for (const c of p.dossier.concepts) usage[c] = (usage[c] ?? 0) + 1;
  const path: PathLesson[] = Object.keys(CONCEPT_DEEP)
    .map((slug) => CONCEPTS.find((c) => c.slug === slug)!)
    .map((c) => ({ slug: c.slug, title: c.title, summary: c.summary, category: c.category, categoryLabel: ACADEMY_CATEGORIES.find((x) => x.id === c.category)!.label, minutes: lessonMinutes(c) }));
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
          <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-accent">Understand</div>
          <h1 className="serif-display mt-3 text-[44px] leading-[1.02] text-fg md:text-[60px]">
            Academy, <span className="italic text-violet">learn by research.</span>
          </h1>
          <p className="mt-4 text-[16px] leading-relaxed text-fg-2">
            Every dossier links to the concepts it relies on. Read an analysis, open the concept you need, come back with the right vocabulary. {CONCEPTS.length} explainers
            across eight tracks, {path.length} of them as in-depth lessons with step-by-step mechanics, worked examples from our research and a quiz.
          </p>
        </div>
      </header>

      <section>
        <SectionTitle title="Learning tracks" description="From first principles to market psychology." />
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
                  <div className="serif-display text-[23px] leading-tight text-fg">{c.label}</div>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{c.description}</p>
                  <div className="mt-3 text-[12px] font-medium" style={{ color }}>
                    {counts[c.id]} concept{counts[c.id] === 1 ? "" : "s"} available
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <SectionTitle title="Start here: in-depth lessons" description="The fundamentals, in a suggested order. Each lesson ends with a three-question quiz; passing it marks the lesson as completed." />
        <LessonPath lessons={path} />
      </section>

      <section>
        <SectionTitle title="Concept library" description="Search or filter by track. Each concept shows where it is used in our research." />
        <ConceptBrowser concepts={CONCEPTS} usage={usage} deep={Object.keys(CONCEPT_DEEP)} />
      </section>

      <section>
        <SectionTitle title="Coming to the Academy" description="Structured courses, exercises and synced progress are planned for Phase 4." />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
          {COMING.map((x) => (
            <div key={x.t} className="rounded-xl border border-dashed border-line-strong p-4">
              <span className="flex size-8 items-center justify-center rounded-lg" style={{ backgroundColor: tint(x.color, 0.14), color: x.color }}>
                <x.icon className="size-4" aria-hidden />
              </span>
              <div className="mt-3 text-[14px] font-medium text-fg">{x.t}</div>
              <p className="mt-1 text-[12.5px] leading-relaxed text-muted">{x.d}</p>
              <span className="mt-3 inline-block text-[11px] uppercase tracking-[0.12em] text-subtle">Phase 4</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
