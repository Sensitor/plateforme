import Link from "next/link";
import { CalendarClock } from "lucide-react";
import { KEY_DATES } from "@/content/key-dates";
import { PROJECT_BY_SLUG } from "@/content/projects";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TokenLogo } from "@/components/ui/token-logo";

const KIND = { unlock: ["Unlock", "warning"], halving: ["Halving", "accent"], "vesting-end": ["Vesting end", "neutral"] } as const;

export function KeyDatesCard() {
  return (
    <Card className="h-full">
      <CardHeader title="Unlocks & key dates" subtitle="Supply schedules documented in Sensitor dossiers" icon={<CalendarClock className="size-4" />} />
      <CardBody className="pt-2">
        <ul className="divide-y divide-line">
          {KEY_DATES.map((d) => {
            const p = PROJECT_BY_SLUG[d.slug];
            const [label, tone] = KIND[d.kind];
            return (
              <li key={`${d.slug}-${d.title}`}>
                <Link href={`/projects/${d.slug}#tokenomics`} className="flex items-center gap-3 py-2.5">
                  <TokenLogo src={p?.logo} name={p?.name ?? d.slug} size={26} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] text-fg">
                      {p?.name} · {d.title}
                    </div>
                    <div className="text-[11.5px] text-muted">{d.when}</div>
                  </div>
                  <Badge tone={tone}>{label}</Badge>
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mt-3 text-[11.5px] leading-relaxed text-subtle">
          Schedule-level information only. Exact unlock amounts and an events calendar require a licensed data feed (planned for Phase 2).
        </p>
      </CardBody>
    </Card>
  );
}
