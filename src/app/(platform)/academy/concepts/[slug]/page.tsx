import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ChevronRight, Clock } from "lucide-react";
import { ACADEMY_CATEGORIES, CONCEPTS, CONCEPT_BY_SLUG, type Concept, type ConceptDeep, type ConceptVisual } from "@/content/concepts";
import { CONCEPT_DEEP } from "@/content/academy-deep";
import { PROJECTS, PROJECT_BY_SLUG } from "@/content/projects";
import { ACADEMY_COLORS, tint } from "@/lib/brand";
import { lessonMinutes } from "@/lib/academy/lesson";
import { TrackArt } from "@/components/academy/track-art";
import { LevelDots } from "@/components/academy/concept-browser";
import { ConceptQuiz } from "@/components/academy/concept-quiz";
import { LessonStatus } from "@/components/academy/lesson-status";
import { ContractsDiagram, HalvingChart, PosDiagram, PowDiagram, RollupDiagram, StablecoinModels, VestingChart } from "@/components/academy/visuals";
import { AmmSimulator, FeeCalculator } from "@/components/academy/interactive";
import { KeyDatesTable, McapFdvSkeleton, McapFdvTable } from "@/components/academy/live";
import { Toc, type TocItem } from "@/components/research/toc";
import { Skeleton } from "@/components/ui/skeleton";
import { TokenLogo } from "@/components/ui/token-logo";

export function generateStaticParams() {
  return CONCEPTS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/academy/concepts/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = CONCEPT_BY_SLUG[slug];
  return c ? { title: c.title, description: c.summary } : { title: "Concept not found" };
}

export default function ConceptPage({ params }: PageProps<"/academy/concepts/[slug]">) {
  return (
    <Suspense fallback={<Skeleton className="h-96 w-full max-w-3xl rounded-xl" />}>
      <ConceptContent params={params} />
    </Suspense>
  );
}

function Visual({ kind, color }: { kind: ConceptVisual; color: string }) {
  switch (kind) {
    case "pow":
      return <PowDiagram color={color} />;
    case "pos":
      return <PosDiagram color={color} />;
    case "contracts":
      return <ContractsDiagram color={color} />;
    case "rollup":
      return <RollupDiagram color={color} />;
    case "stablecoin-models":
      return <StablecoinModels />;
    case "halving":
      return <HalvingChart />;
    case "vesting":
      return <VestingChart color={color} />;
    case "fee-calculator":
      return <FeeCalculator color={color} />;
    case "amm":
      return <AmmSimulator color={color} />;
    case "mcap-fdv":
      return (
        <Suspense fallback={<McapFdvSkeleton />}>
          <McapFdvTable color={color} />
        </Suspense>
      );
  }
}

function Section({ id, title, kicker, color, children }: { id: string; title: string; kicker?: string; color: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28">
      {kicker ? (
        <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color }}>
          {kicker}
        </div>
      ) : null}
      <h2 className="serif-display mb-4 text-[28px] leading-tight text-fg">{title}</h2>
      {children}
    </section>
  );
}

async function ConceptContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = CONCEPT_BY_SLUG[slug];
  if (!c) notFound();
  const deep = CONCEPT_DEEP[c.slug];
  const category = ACADEMY_CATEGORIES.find((x) => x.id === c.category);
  const color = ACADEMY_COLORS[c.category];
  const minutes = lessonMinutes(c, deep);

  return (
    <article className="mx-auto max-w-[1080px] space-y-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[13px] text-muted">
        <Link href="/academy" className="hover:text-fg">
          Academy
        </Link>
        <ChevronRight className="size-3.5" aria-hidden />
        <span>{category?.label}</span>
      </nav>
      <header className="relative overflow-hidden rounded-2xl border border-line" style={{ backgroundColor: tint(color, 0.08) }}>
        <span className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: color }} aria-hidden />
        <TrackArt category={c.category} className="pointer-events-none absolute -right-6 top-2 hidden h-[150px] w-[260px] opacity-80 sm:block" />
        <div className="relative p-6 sm:pr-[260px] md:p-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="text-[11.5px] font-semibold uppercase tracking-[0.14em]" style={{ color }}>
              {category?.label}
            </span>
            <LevelDots level={c.level} color={color} />
            <span className="inline-flex items-center gap-1.5 text-[11.5px] text-muted">
              <Clock className="size-3.5" aria-hidden /> {minutes} min
            </span>
            {deep ? (
              <span className="rounded-md px-1.5 py-0.5 text-[11px] font-medium" style={{ backgroundColor: tint(color, 0.16), color }}>
                In-depth lesson
              </span>
            ) : null}
            <LessonStatus slug={c.slug} />
          </div>
          <h1 className="serif-display mt-3 text-[42px] leading-[1.03] text-fg md:text-[52px]">{c.title}</h1>
          <p className="mt-3 max-w-2xl text-[16.5px] leading-relaxed text-fg-2">{c.summary}</p>
        </div>
      </header>
      {deep ? <DeepLesson c={c} deep={deep} color={color} /> : <ShortLesson c={c} color={color} />}
    </article>
  );
}

function Takeaways({ c, color }: { c: Concept; color: string }) {
  return (
    <div className="border-l-2 pl-5" style={{ borderColor: color }}>
      <h2 className="text-[11.5px] font-semibold uppercase tracking-[0.14em]" style={{ color }}>
        Key takeaways
      </h2>
      <ol className="mt-3 space-y-2.5 text-[15px] text-fg">
        {c.keyTakeaways.map((k, i) => (
          <li key={k} className="flex gap-3">
            <span className="num w-5 shrink-0 text-[12px] text-subtle">{String(i + 1).padStart(2, "0")}</span>
            {k}
          </li>
        ))}
      </ol>
    </div>
  );
}

function PracticeAndRelated({ c }: { c: Concept }) {
  const usedIn = PROJECTS.filter((p) => p.dossier.concepts.includes(c.slug));
  const related = c.related.map((r) => CONCEPT_BY_SLUG[r]).filter(Boolean);
  return (
    <>
      {usedIn.length ? (
        <section>
          <h2 className="serif-display mb-2 text-[26px] text-fg">See it in practice</h2>
          <p className="mb-3 text-[13px] text-muted">Dossiers where this concept matters:</p>
          <div className="flex flex-wrap gap-2">
            {usedIn.map((p) => (
              <Link key={p.slug} href={`/projects/${p.slug}`} className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-1.5 text-[13px] text-fg hover:border-line-strong">
                <TokenLogo src={p.logo} name={p.name} size={18} /> {p.name}
              </Link>
            ))}
          </div>
        </section>
      ) : null}
      {related.length ? (
        <section>
          <h2 className="serif-display mb-3 text-[26px] text-fg">Related concepts</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {related.map((r) => (
              <Link key={r.slug} href={`/academy/concepts/${r.slug}`} className="relative overflow-hidden rounded-xl border border-line bg-surface p-4 pt-5 hover:border-line-strong">
                <span className="absolute inset-x-0 top-0 h-[3px]" style={{ backgroundColor: ACADEMY_COLORS[r.category] }} aria-hidden />
                <div className="serif-display text-[21px] leading-tight text-fg">{r.title}</div>
                <p className="mt-1 text-[12.5px] text-muted">{r.summary}</p>
                {CONCEPT_DEEP[r.slug] ? <span className="mt-2 inline-block text-[11px] text-subtle">In-depth lesson</span> : null}
              </Link>
            ))}
          </div>
        </section>
      ) : null}
      <p className="border-t border-line pt-5 text-[12px] text-subtle">Educational content only, not investment advice.</p>
    </>
  );
}

function ShortLesson({ c, color }: { c: Concept; color: string }) {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="space-y-4">
        {c.body.map((para, i) => (
          <p key={i} className="text-[15px] leading-[1.75] text-fg-2">
            {para}
          </p>
        ))}
      </div>
      <Takeaways c={c} color={color} />
      <p className="rounded-lg border border-line px-4 py-3 text-[12.5px] text-muted">The in-depth version of this lesson (steps, worked example, quiz) is being written.</p>
      <PracticeAndRelated c={c} />
    </div>
  );
}

function DeepLesson({ c, deep, color }: { c: Concept; deep: ConceptDeep; color: string }) {
  const toc: TocItem[] = [
    { id: "minute", label: "In one minute" },
    { id: "explained", label: "Explained" },
    { id: "how", label: "How it works" },
    { id: "research", label: "In the research" },
    { id: "watch", label: "What to watch" },
    { id: "myths", label: "Misconceptions" },
    { id: "risks", label: "Risks" },
    { id: "quiz", label: "Check yourself" },
    { id: "sources", label: "Sources" },
  ];
  const exampleProjects = deep.example.projects.map((s) => PROJECT_BY_SLUG[s]).filter(Boolean);
  return (
    <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_190px]">
      <div className="min-w-0 max-w-3xl space-y-14">
        <section id="minute" className="scroll-mt-28">
          <div className="rounded-xl border-l-[3px] bg-surface px-5 py-4" style={{ borderColor: color }}>
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color }}>
              In one minute
            </div>
            <p className="mt-2 text-[17px] leading-relaxed text-fg">{deep.minute}</p>
          </div>
        </section>

        <Section id="explained" title="Explained" color={color}>
          <div className="space-y-4">
            {c.body.map((para, i) => (
              <p key={i} className="text-[15px] leading-[1.75] text-fg-2">
                {para}
              </p>
            ))}
          </div>
        </Section>

        <Section id="how" title="How it works, step by step" color={color}>
          <ol className="space-y-4">
            {deep.steps.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[28px_minmax(0,1fr)] gap-3">
                <span className="num flex size-7 items-center justify-center rounded-full text-[12px] font-medium" style={{ backgroundColor: tint(color, 0.16), color }}>
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-[15px] font-semibold text-fg">{s.title}</h3>
                  <p className="mt-1 text-[14.5px] leading-[1.7] text-fg-2">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          {deep.visual ? (
            <figure className="mt-8">
              <Visual kind={deep.visual} color={color} />
              {deep.visualCaption ? <figcaption className="mt-2.5 text-[12px] leading-relaxed text-muted">{deep.visualCaption}</figcaption> : null}
            </figure>
          ) : null}
        </Section>

        <Section id="research" title={deep.example.title} kicker="In the research" color={color}>
          <div className="space-y-4">
            {deep.example.paragraphs.map((p) => (
              <p key={p} className="text-[15px] leading-[1.75] text-fg-2">
                {p}
              </p>
            ))}
          </div>
          {deep.example.live === "key-dates" ? (
            <div className="mt-5">
              <KeyDatesTable />
            </div>
          ) : null}
          {deep.example.live === "mcap-fdv" && deep.visual !== "mcap-fdv" ? (
            <div className="mt-5">
              <Suspense fallback={<McapFdvSkeleton />}>
                <McapFdvTable color={color} />
              </Suspense>
            </div>
          ) : null}
          <div className="mt-5 flex flex-wrap gap-2">
            {exampleProjects.map((p) => (
              <Link key={p.slug} href={`/projects/${p.slug}`} className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-1.5 text-[13px] text-fg hover:border-line-strong">
                <TokenLogo src={p.logo} name={p.name} size={18} /> Read the {p.name} dossier
              </Link>
            ))}
            <Link href={`/copilot?mode=learn&q=${encodeURIComponent(`Explain ${c.title.toLowerCase()} with an example from Sensitor's research`)}`} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] text-accent hover:text-accent-strong">
              Ask the Copilot <ArrowUpRight className="size-3.5" aria-hidden />
            </Link>
          </div>
        </Section>

        <Section id="watch" title="What to watch" color={color}>
          <dl className="divide-y divide-line border-y border-line">
            {deep.metrics.map((m) => (
              <div key={m.label} className="grid gap-1 py-3.5 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-6">
                <dt className="text-[14px] font-medium text-fg">{m.label}</dt>
                <dd className="text-[14px] leading-relaxed text-fg-2">{m.read}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="myths" title="Common misconceptions" color={color}>
          <div className="space-y-3">
            {deep.misconceptions.map((m) => (
              <div key={m.myth} className="grid gap-3 rounded-xl border border-line p-4 sm:grid-cols-2">
                <div>
                  <div className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-negative">Myth</div>
                  <p className="mt-1 text-[14px] leading-relaxed text-fg-2">{m.myth}</p>
                </div>
                <div>
                  <div className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-positive">Reality</div>
                  <p className="mt-1 text-[14px] leading-relaxed text-fg">{m.reality}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="risks" title="Risks to keep in mind" color={color}>
          <ul className="space-y-2.5">
            {deep.risks.map((r) => (
              <li key={r} className="flex gap-3 text-[14.5px] leading-relaxed text-fg-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-warning" aria-hidden />
                {r}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Takeaways c={c} color={color} />
          </div>
        </Section>

        <Section id="quiz" title="Check your understanding" color={color}>
          <p className="mb-5 text-[13.5px] text-muted">Three questions. Your result is saved in this browser and marks the lesson as completed in the Academy.</p>
          <ConceptQuiz slug={c.slug} questions={deep.quiz} color={color} />
        </Section>

        <Section id="sources" title="Sources" color={color}>
          <ul className="space-y-2">
            {deep.sources.map((s) => (
              <li key={s.url} className="text-[13.5px]">
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-baseline gap-1.5 text-fg hover:text-accent-strong">
                  {s.title}
                  <ArrowUpRight className="size-3 self-center text-subtle group-hover:text-accent" aria-hidden />
                </a>
                <span className="text-muted"> · {s.publisher}</span>
              </li>
            ))}
          </ul>
        </Section>

        <PracticeAndRelated c={c} />
      </div>
      <aside className="order-first xl:order-none">
        <Toc items={toc} title="Lesson" />
      </aside>
    </div>
  );
}
