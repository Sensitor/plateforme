import { cn } from "@/lib/utils";
import { RISK_LEVELS } from "@/lib/research/taxonomy";
import { getT } from "@/i18n/server";
import type { Project, RiskLevel } from "@/lib/research/types";
import { ClaimList } from "./claim-list";

const LEVEL_COLOR: Record<RiskLevel, string> = {
  lower: "#45B997",
  moderate: "#8EA7FF",
  elevated: "#D9A85B",
  high: "#E36B75",
};

/** Risk register: one row per category, level meter and assessment. */
export async function RiskGrid({ project }: { project: Project }) {
  const dict = await getT();
  const t = dict.dossier.risk;
  const { risks, sources } = project.dossier;
  const sorted = [...risks].sort((a, b) => RISK_LEVELS[b.level].rank - RISK_LEVELS[a.level].rank);
  return (
    <div className="border-y border-line">
      <div className="hidden grid-cols-[170px_150px_1fr] gap-6 border-b border-line py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-subtle md:grid">
        <span>{t.risk}</span>
        <span>{t.level}</span>
        <span>{t.assessment}</span>
      </div>
      <ul className="divide-y divide-line/70">
        {sorted.map((r) => {
          const color = LEVEL_COLOR[r.level];
          return (
            <li key={r.category} className="grid grid-cols-1 gap-2 py-4 md:grid-cols-[170px_150px_1fr] md:gap-6">
              <span className="text-[14.5px] font-medium text-fg">{dict.labels.riskCategories[r.category]}</span>
              <span className="flex items-center gap-2.5">
                <span className="flex gap-1" aria-hidden>
                  {[1, 2, 3, 4].map((i) => (
                    <span key={i} className={cn("h-2 w-4 rounded-sm")} style={{ backgroundColor: i <= RISK_LEVELS[r.level].rank ? color : "var(--surface-3)" }} />
                  ))}
                </span>
                <span className="text-[13px] font-medium" style={{ color }}>
                  {dict.labels.riskLevels[r.level]}
                </span>
              </span>
              <ClaimList claims={r.claims} sources={sources} compact />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
