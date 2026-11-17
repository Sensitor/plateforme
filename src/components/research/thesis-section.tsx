import type { Project } from "@/lib/research/types";
import { ClaimList } from "./claim-list";

const CASES = [
  { key: "bull", label: "Bull case", color: "#45B997" },
  { key: "neutral", label: "Neutral case", color: "#8EA7FF" },
  { key: "bear", label: "Bear case", color: "#E36B75" },
] as const;

export function ThesisSection({ project }: { project: Project }) {
  const { thesis, sources } = project.dossier;
  return (
    <div className="space-y-10">
      <div className="grid gap-8 lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-line">
        {CASES.map((c, i) => (
          <div key={c.key} className={i === 0 ? "lg:pr-7" : i === 1 ? "lg:px-7" : "lg:pl-7"}>
            <div className="mb-4 h-[3px] w-10 rounded-full" style={{ backgroundColor: c.color }} />
            <h3 className="serif-display text-[24px] text-fg">{c.label}</h3>
            <ClaimList className="mt-3" claims={thesis[c.key]} sources={sources} compact />
          </div>
        ))}
      </div>

      <div className="grid gap-10 border-t border-line pt-8 lg:grid-cols-2">
        <div>
          <h3 className="mb-3 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-muted">Catalysts</h3>
          <ClaimList claims={thesis.catalysts} sources={sources} compact />
        </div>
        <div>
          <h3 className="mb-3 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-muted">Key assumptions</h3>
          <ClaimList claims={thesis.assumptions} sources={sources} compact />
        </div>
      </div>

      <div className="grid gap-10 border-t border-line pt-8 lg:grid-cols-2">
        <div>
          <h3 className="mb-3 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-muted">Risks to monitor</h3>
          <ol className="space-y-2.5 text-[14px] text-fg-2">
            {thesis.monitor.map((m, i) => (
              <li key={m} className="flex gap-3">
                <span className="num w-5 shrink-0 text-[12px] text-subtle">{String(i + 1).padStart(2, "0")}</span>
                {m}
              </li>
            ))}
          </ol>
        </div>
        <div className="border-l-2 border-negative/60 pl-5">
          <h3 className="mb-3 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-negative">Thesis invalidated if</h3>
          <ul className="space-y-2.5 text-[14px] text-fg">
            {thesis.invalidation.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
