import { ExternalLink } from "lucide-react";
import { formatDate } from "@/lib/format";
import type { Project } from "@/lib/research/types";
import { Badge } from "@/components/ui/badge";
import { getLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";

export async function SourcesTable({ project }: { project: Project }) {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const t = dict.dossier.sources;
  const { sources } = project.dossier;
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface">
      <div className="relative overflow-x-auto">
        <table className="w-full min-w-[820px] text-[13px]">
          <thead>
            <tr className="border-b border-line text-left text-[11px] uppercase tracking-wide text-subtle">
              <th scope="col" className="w-10 py-2.5 pl-4 font-medium">#</th>
              <th scope="col" className="py-2.5 pr-3 font-medium">{t.source}</th>
              <th scope="col" className="px-3 py-2.5 font-medium">{t.supports}</th>
              <th scope="col" className="whitespace-nowrap px-3 py-2.5 font-medium">{t.published}</th>
              <th scope="col" className="whitespace-nowrap px-3 py-2.5 font-medium">{t.checked}</th>
              <th scope="col" className="px-3 py-2.5 pr-4 font-medium">{t.reliability}</th>
            </tr>
          </thead>
          <tbody>
            {sources.map((s, i) => (
              <tr key={s.id} id={`source-${s.id}`} className="scroll-mt-28 border-b border-line/70 align-top last:border-0 target:bg-accent-soft">
                <td className="num py-3 pl-4 text-subtle">{i + 1}</td>
                <td className="py-3 pr-3">
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-start gap-1.5 text-fg hover:text-accent-strong">
                    <span>{s.title}</span>
                    <ExternalLink className="mt-0.5 size-3 shrink-0 text-subtle group-hover:text-accent" aria-hidden />
                  </a>
                  <div className="mt-1 flex items-center gap-2 text-xs text-muted">
                    {s.publisher} <Badge tone="outline">{t.types[s.type]}</Badge>
                  </div>
                </td>
                <td className="px-3 py-3 text-fg-2">{s.supports}</td>
                <td className="num whitespace-nowrap px-3 py-3 text-muted">{s.published ? (s.published.length === 4 ? s.published : formatDate(s.published, locale)) : "n/a"}</td>
                <td className="num whitespace-nowrap px-3 py-3 text-muted">{formatDate(s.accessed, locale)}</td>
                <td className="px-3 py-3 pr-4">
                  <Badge tone={s.reliability === "high" ? "positive" : s.reliability === "medium" ? "accent" : "warning"}>{dict.ui.confidenceShort[s.reliability]}</Badge>
                  {s.limitations ? <p className="mt-1 text-xs leading-relaxed text-muted">{s.limitations}</p> : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
