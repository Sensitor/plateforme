import { connection } from "next/server";
import Link from "@/i18n/link";
import { readableAccent, tint } from "@/lib/brand";
import { formatDate } from "@/lib/format";
import { getLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { dossierTitle, featuredDossierFor, readingMinutes, researchFeed } from "@/lib/research/editorial";
import type { Project } from "@/lib/research/types";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TokenLogo } from "@/components/ui/token-logo";

function Thumb({ project }: { project: Project }) {
  const color = readableAccent(project.accent);
  return (
    <span className="relative flex aspect-[3/2] w-full items-center justify-center overflow-hidden rounded-md border border-line" style={{ backgroundColor: tint(color, 0.1) }}>
      <TokenLogo src={project.logo} name={project.name} size={30} />
      <span className="num absolute bottom-1.5 right-2 text-[10px] text-muted">{project.ticker}</span>
    </span>
  );
}

/** Research feed as compact editorial rows (excludes today's featured dossier). */
export async function ResearchList({ limit = 5 }: { limit?: number }) {
  await connection();
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const lead = featuredDossierFor(new Date()).slug;
  const items = researchFeed()
    .filter((p) => p.slug !== lead)
    .slice(0, limit);
  return (
    <ul className="divide-y divide-line">
      {items.map((p) => (
        <li key={p.slug}>
          <Link href={`/projects/${p.slug}`} className="group grid grid-cols-[84px_minmax(0,1fr)] items-center gap-4 py-4 first:pt-0 sm:grid-cols-[112px_minmax(0,1fr)]">
            <Thumb project={p} />
            <span className="min-w-0">
              <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted">{dict.labels.sectors[p.sector].label}</span>
              <span className="mt-1 block text-[15.5px] font-medium leading-snug text-fg group-hover:text-accent-strong">{dossierTitle(p)}</span>
              <span className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-muted">
                <span>{p.editorial.author}</span>
                <span aria-hidden>·</span>
                <time dateTime={p.editorial.lastUpdated}>{formatDate(p.editorial.lastUpdated, locale)}</time>
                <span aria-hidden>·</span>
                <span>{dict.overview.dossierMeta.minRead(readingMinutes(p))}</span>
                {p.editorial.status === "draft" ? <Badge tone="warning">{dict.overview.dossierMeta.draft}</Badge> : null}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function ResearchListSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="divide-y divide-line">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 py-4">
          <Skeleton className="h-[56px] w-[84px] rounded-md sm:h-[75px] sm:w-[112px]" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
