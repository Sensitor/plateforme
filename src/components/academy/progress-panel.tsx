"use client";

import Link from "next/link";
import { CloudCheck, HardDrive, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-provider";
import { isCompleted, isPerfect, useAcademyProgress, useAcademySync } from "@/lib/academy/progress";
import { computeBadges } from "@/lib/academy/badges";
import type { AcademyCatalog } from "@/lib/academy/catalog";
import { Stat, StatStrip } from "@/components/ui/stat-strip";
import { BadgeRow } from "./badge-medal";

export function SyncLine() {
  const { configured, loading, user } = useAuth();
  const sync = useAcademySync();
  const cls = "flex items-center gap-2 text-[12.5px] text-muted";
  if (configured && user && sync === "cloud")
    return (
      <p className={cls}>
        <CloudCheck className="size-3.5 text-positive" aria-hidden /> Saved to your account: progress and badges follow you on every device.
      </p>
    );
  if (configured && (loading || (user && sync === "local")))
    return (
      <p className={cls}>
        <Loader2 className="size-3.5 animate-spin" aria-hidden /> Syncing with your account…
      </p>
    );
  return (
    <p className={cls}>
      <HardDrive className="size-3.5" aria-hidden />
      {!configured ? (
        "Saved in this browser."
      ) : user ? (
        "Saved in this browser. Account sync for the Academy is not set up on this deployment yet."
      ) : (
        <span>
          Saved in this browser.{" "}
          <Link href="/login?next=/academy" className="text-accent hover:text-accent-strong">
            Sign in
          </Link>{" "}
          to keep your progress and badges on every device.
        </span>
      )}
    </p>
  );
}

/** Academy home: headline figures, sync state and every badge with its progress. */
export function AcademyProgressPanel({ catalog }: { catalog: AcademyCatalog }) {
  const { progress, ready } = useAcademyProgress();
  const p = ready ? progress : {};
  const slugs = catalog.lessons.map((l) => l.slug);
  const taken = slugs.filter((s) => p[s]).length;
  const completed = slugs.filter((s) => isCompleted(p[s])).length;
  const perfect = slugs.filter((s) => isPerfect(p[s])).length;
  const badges = computeBadges(p, catalog);
  const earned = badges.filter((b) => b.earned).length;
  return (
    <div>
      <StatStrip columns={4}>
        <Stat label="Lessons completed" value={`${completed}/${slugs.length}`}>
          Quiz passed, at least 2 of 3 right
        </Stat>
        <Stat label="Quizzes taken" value={taken} />
        <Stat label="Full marks" value={perfect} />
        <Stat label="Badges earned" value={`${earned}/${badges.length}`} />
      </StatStrip>
      <div className="mt-3">
        <SyncLine />
      </div>
      <ul className="mt-7 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2 xl:grid-cols-3">
        {badges.map((b) => (
          <BadgeRow key={b.id} badge={b} />
        ))}
      </ul>
    </div>
  );
}
