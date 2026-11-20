import Link from "@/i18n/link";
import { CheckCircle2, Clock, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getT } from "@/i18n/server";

/**
 * Roadmap page for features that are not available yet. Explicitly labelled
 * so no interactive element pretends to work.
 */
export async function ComingSoon({
  eyebrow,
  title,
  phase,
  description,
  planned,
  principles,
  availableNow,
}: {
  eyebrow: string;
  title: string;
  phase: string;
  description: string;
  planned: string[];
  principles?: string[];
  availableNow?: { label: string; href: string }[];
}) {
  const t = (await getT()).soon;
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <PageHeader eyebrow={eyebrow} title={title} description={description} actions={<Badge tone="outline" className="text-[12px]"><Clock className="size-3" aria-hidden /> {phase}</Badge>} />
      <div className="rounded-xl border border-dashed border-line-strong bg-bg-elevated px-5 py-4 text-[13.5px] leading-relaxed text-muted">
        {t.notice[0]} <strong className="text-fg-2">{t.notice[1]}</strong>
        {t.notice[2]}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="p-5">
          <h2 className="text-[12px] font-medium uppercase tracking-[0.1em] text-muted">{t.planned}</h2>
          <ul className="mt-3 space-y-2.5 text-[13.5px] text-fg-2">
            {planned.map((p) => (
              <li key={p} className="flex gap-2.5">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-subtle" aria-hidden /> {p}
              </li>
            ))}
          </ul>
        </Card>
        {principles?.length ? (
          <Card className="p-5">
            <h2 className="text-[12px] font-medium uppercase tracking-[0.1em] text-muted">{t.principles}</h2>
            <ul className="mt-3 space-y-2.5 text-[13.5px] text-fg-2">
              {principles.map((p) => (
                <li key={p} className="flex gap-2.5">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-positive" aria-hidden /> {p}
                </li>
              ))}
            </ul>
          </Card>
        ) : null}
      </div>
      {availableNow?.length ? (
        <div>
          <h2 className="mb-3 text-[12px] font-medium uppercase tracking-[0.1em] text-muted">{t.availableNow}</h2>
          <div className="flex flex-wrap gap-2">
            {availableNow.map((a) => (
              <Link key={a.href} href={a.href} className="rounded-lg border border-line bg-surface px-3 py-2 text-[13px] text-fg hover:border-line-strong">
                {a.label} →
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
