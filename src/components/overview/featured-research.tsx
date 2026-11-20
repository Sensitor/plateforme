import { connection } from "next/server";
import Link from "@/i18n/link";
import { getPriceHistory } from "@/lib/market/service";
import { seriesChange } from "@/lib/market/series";
import { readableAccent } from "@/lib/brand";
import { formatDate, formatPrice } from "@/lib/format";
import {
  dossierTitle,
  featuredDossierFor,
  readingMinutes,
} from "@/lib/research/editorial";
import type { Project } from "@/lib/research/types";
import type { DataResult, SeriesPoint } from "@/lib/market/types";
import { SparkArea } from "@/components/charts/spark-area";
import { Badge } from "@/components/ui/badge";
import { Delta } from "@/components/ui/delta";
import { SectorBadge } from "@/components/ui/sector-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TokenLogo } from "@/components/ui/token-logo";
import { getLocale } from "@/i18n/server";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

/**
 * Editorial cover built from real data: the asset's one-year price history,
 * labelled with its provider and observation date (no stock imagery).
 */
function ChartCover({
  project,
  history,
  t,
  locale,
}: {
  project: Project;
  history: DataResult<SeriesPoint[]>;
  t: Dictionary["overview"]["featured"];
  locale: Locale;
}) {
  const color = readableAccent(project.accent);
  const series = history.data ?? [];
  const values = series.map((p) => p.v);
  const last = values.at(-1) ?? null;
  const change = series.length > 1 ? seriesChange(series) : null;
  return (
    <figure>
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-line bg-[#13161d] sm:aspect-[2.4/1]">
        <div
          className="absolute inset-0 flex flex-col justify-between py-[12%]"
          aria-hidden
        >
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="h-px bg-line/60" />
          ))}
        </div>
        <SparkArea
          values={values}
          color={color}
          fillOpacity={0.1}
          strokeWidth={1.75}
          className="absolute inset-x-0 bottom-0 h-[62%] w-full sm:h-[74%]"
          label={t.chartLabel(project.ticker)}
        />
        <div className="absolute left-5 top-5 flex items-center gap-3">
          <TokenLogo src={project.logo} name={project.name} size={36} />
          <div>
            <div className="text-[15px] font-medium text-fg">
              {project.name}
            </div>
            <div className="num text-[11.5px] text-muted">
              {project.ticker}/USD · 1Y
            </div>
          </div>
        </div>
        {last != null ? (
          <div className="absolute right-5 top-5 text-right">
            <div className="num text-[18px] text-fg">{formatPrice(last)}</div>
            <div className="text-[11.5px] text-muted">
              <Delta value={change} className="text-[11.5px]" /> {t.overYear}
            </div>
          </div>
        ) : null}
      </div>
      <figcaption className="mt-2 text-[11px] text-subtle">
        {values.length ? t.caption(project.ticker, history.source?.name ?? "n/a", history.asOf ? formatDate(history.asOf, locale) : "") : t.unavailable}
      </figcaption>
    </figure>
  );
}

/** Featured dossier presented as the lead research article (rotates daily). */
export async function FeaturedResearch() {
  await connection();
  const project = featuredDossierFor(new Date());
  const history = await getPriceHistory(project.slug, "1Y");
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const t = dict.overview;
  const href = `/projects/${project.slug}`;
  return (
    <article className="group">
      <Link href={href} className="block" tabIndex={-1} aria-hidden>
        <ChartCover project={project} history={history} t={t.featured} locale={locale} />
      </Link>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-[12px]">
        <span className="font-medium uppercase tracking-[0.14em] text-accent">
          {t.featured.kicker}
        </span>
        <span className="text-line-strong" aria-hidden>
          /
        </span>
        <SectorBadge
          sector={project.sector}
          href={`/explore?sector=${project.sector}`}
        />
      </div>
      <h2 className="serif-display mt-3 max-w-3xl text-[32px] leading-[1.08] text-fg md:text-[40px]">
        <Link href={href} className="hover:text-accent-strong">
          {dossierTitle(project)}
        </Link>
      </h2>
      <p className="mt-3 line-clamp-3 max-w-2xl text-[15px] leading-relaxed text-fg-2">
        {project.dossier.overview.summary}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[12.5px] text-muted">
        <span className="text-fg-2">{project.editorial.author}</span>
        <span aria-hidden>·</span>
        <time dateTime={project.editorial.lastUpdated}>
          {formatDate(project.editorial.lastUpdated, locale)}
        </time>
        <span aria-hidden>·</span>
        <span>{t.dossierMeta.minRead(readingMinutes(project))}</span>
        <span aria-hidden>·</span>
        <span>{t.dossierMeta.sources(project.dossier.sources.length)}</span>
        {project.editorial.status === "draft" ? (
          <Badge
            tone="warning"
            title={t.dossierMeta.draftTitle}
          >
            {t.dossierMeta.draft}
          </Badge>
        ) : null}
      </div>
    </article>
  );
}

export function FeaturedResearchSkeleton() {
  return (
    <div>
      <Skeleton className="aspect-[16/10] w-full rounded-lg sm:aspect-[2.4/1]" />
      <Skeleton className="mt-5 h-3 w-40" />
      <Skeleton className="mt-4 h-9 w-4/5" />
      <Skeleton className="mt-3 h-4 w-full max-w-2xl" />
      <Skeleton className="mt-2 h-4 w-3/4 max-w-xl" />
    </div>
  );
}
