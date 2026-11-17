import { SectorBadge } from "@/components/ui/sector-badge";
import Link from "next/link";
import { FileText } from "lucide-react";
import { PROJECTS } from "@/content/projects";
import { claimStats } from "@/lib/research/framework";
import { formatDate } from "@/lib/format";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TokenLogo } from "@/components/ui/token-logo";

export function LatestResearch({ limit = 4 }: { limit?: number }) {
  const items = [...PROJECTS].sort((a, b) => b.editorial.lastUpdated.localeCompare(a.editorial.lastUpdated)).slice(0, limit);
  return (
    <Card className="h-full">
      <CardHeader
        title="Latest research"
        subtitle="Project dossiers recently updated"
        icon={<FileText className="size-4" />}
        action={
          <Link href="/research" className="text-[12.5px] text-accent hover:text-accent-strong">
            Library →
          </Link>
        }
      />
      <CardBody className="pt-2">
        <ul className="divide-y divide-line">
          {items.map((p) => {
            const stats = claimStats(p);
            return (
              <li key={p.slug}>
                <Link href={`/projects/${p.slug}`} className="group flex items-center gap-3 py-3">
                  <TokenLogo src={p.logo} name={p.name} size={36} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <SectorBadge sector={p.sector} />
                      {p.editorial.status === "draft" ? <Badge tone="warning">Draft</Badge> : null}
                    </div>
                    <div className="mt-1 truncate text-[13.5px] font-medium text-fg group-hover:text-accent-strong">{p.name}: research dossier</div>
                    <div className="text-[11.5px] text-subtle">
                      {formatDate(p.editorial.lastUpdated)} · {p.dossier.sources.length} sources · {stats.facts} facts
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </CardBody>
    </Card>
  );
}
