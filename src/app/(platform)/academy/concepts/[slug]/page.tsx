import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { ACADEMY_CATEGORIES, CONCEPTS, CONCEPT_BY_SLUG } from "@/content/concepts";
import { PROJECTS } from "@/content/projects";
import { ACADEMY_COLORS, tint } from "@/lib/brand";
import { TrackArt } from "@/components/academy/track-art";
import { LevelDots } from "@/components/academy/concept-browser";
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

async function ConceptContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = CONCEPT_BY_SLUG[slug];
  if (!c) notFound();
  const category = ACADEMY_CATEGORIES.find((x) => x.id === c.category);
  const usedIn = PROJECTS.filter((p) => p.dossier.concepts.includes(c.slug));
  const related = c.related.map((r) => CONCEPT_BY_SLUG[r]).filter(Boolean);
  const color = ACADEMY_COLORS[c.category];
  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[13px] text-muted">
        <Link href="/academy" className="hover:text-fg">Academy</Link>
        <ChevronRight className="size-3.5" aria-hidden />
        <span>{category?.label}</span>
      </nav>
      <header className="relative overflow-hidden rounded-2xl border border-line" style={{ backgroundColor: tint(color, 0.08) }}>
        <span className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: color }} aria-hidden />
        <TrackArt category={c.category} className="pointer-events-none absolute -right-6 top-2 hidden h-[150px] w-[260px] opacity-80 sm:block" />
        <div className="relative p-6 md:p-8 sm:pr-[260px]">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[11.5px] font-semibold uppercase tracking-[0.14em]" style={{ color }}>
              {category?.label}
            </span>
            <LevelDots level={c.level} color={color} />
          </div>
          <h1 className="serif-display mt-3 text-[42px] leading-[1.03] text-fg md:text-[52px]">{c.title}</h1>
          <p className="mt-3 text-[16.5px] leading-relaxed text-fg-2">{c.summary}</p>
        </div>
      </header>
      <div className="space-y-4">
        {c.body.map((para, i) => (
          <p key={i} className="text-[15px] leading-[1.75] text-fg-2">{para}</p>
        ))}
      </div>
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
              </Link>
            ))}
          </div>
        </section>
      ) : null}
      <p className="border-t border-line pt-5 text-[12px] text-subtle">Educational content only, not investment advice.</p>
    </article>
  );
}
