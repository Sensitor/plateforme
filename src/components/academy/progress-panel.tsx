"use client";

import Link from "@/i18n/link";
import { CloudCheck, HardDrive, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-provider";
import { isCompleted, isPerfect, useAcademyProgress, useAcademySync } from "@/lib/academy/progress";
import { computeBadges } from "@/lib/academy/badges";
import type { AcademyCatalog } from "@/lib/academy/catalog";
import { Stat, StatStrip } from "@/components/ui/stat-strip";
import { BadgeRow } from "./badge-medal";
import { useT } from "@/i18n/client";

export function SyncLine() {
  const t = useT().academy.progress.sync;
  const { configured, loading, user } = useAuth();
  const sync = useAcademySync();
  const cls = "flex items-center gap-2 text-[12.5px] text-muted";
  if (configured && user && sync === "cloud")
    return (
      <p className={cls}>
        <CloudCheck className="size-3.5 text-positive" aria-hidden /> {t.cloud}
      </p>
    );
  if (configured && (loading || (user && sync === "local")))
    return (
      <p className={cls}>
        <Loader2 className="size-3.5 animate-spin" aria-hidden /> {t.syncing}
      </p>
    );
  return (
    <p className={cls}>
      <HardDrive className="size-3.5" aria-hidden />
      {!configured ? (
        t.local
      ) : user ? (
        t.unavailable
      ) : (
        <span>
          {t.guestBefore}{" "}
          <Link href="/login?next=/academy" className="text-accent hover:text-accent-strong">
            {t.guestLink}
          </Link>{" "}
          {t.guestAfter}
        </span>
      )}
    </p>
  );
}

/** Academy home: headline figures, sync state and every badge with its progress. */
export function AcademyProgressPanel({ catalog }: { catalog: AcademyCatalog }) {
  const dict = useT();
  const t = dict.academy.progress;
  const { progress, ready } = useAcademyProgress();
  const p = ready ? progress : {};
  const slugs = catalog.lessons.map((l) => l.slug);
  const taken = slugs.filter((s) => p[s]).length;
  const completed = slugs.filter((s) => isCompleted(p[s])).length;
  const perfect = slugs.filter((s) => isPerfect(p[s])).length;
  const badges = computeBadges(p, catalog, dict);
  const earned = badges.filter((b) => b.earned).length;
  return (
    <div>
      <StatStrip columns={4}>
        <Stat label={t.completed} value={`${completed}/${slugs.length}`}>
          {t.completedHint}
        </Stat>
        <Stat label={t.taken} value={taken} />
        <Stat label={t.perfect} value={perfect} />
        <Stat label={t.badges} value={`${earned}/${badges.length}`} />
      </StatStrip>
      <div className="mt-3">
        <SyncLine />
      </div>
      <ul className="mt-7 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2 xl:grid-cols-3">
        {badges.map((b) => (
          <BadgeRow key={b.id} badge={b} earnedLabel={dict.academy.badges.earned} progressLabel={dict.academy.badges.progressAria(b.label)} />
        ))}
      </ul>
    </div>
  );
}
