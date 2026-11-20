"use client";

import { useState } from "react";
import Link from "@/i18n/link";
import { Check, RotateCcw, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuizQuestion } from "@/content/concepts";
import { getAcademyProgress, isCompleted, saveQuizResult, useAcademyProgress } from "@/lib/academy/progress";
import { computeBadges, newlyEarned, type Badge } from "@/lib/academy/badges";
import type { AcademyCatalog } from "@/lib/academy/catalog";
import { BadgeMedal } from "./badge-medal";
import { useT } from "@/i18n/client";

export function ConceptQuiz({ slug, questions, color, catalog }: { slug: string; questions: QuizQuestion[]; color: string; catalog: AcademyCatalog }) {
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));
  const [earned, setEarned] = useState<Badge[]>([]);
  const dict = useT();
  const t = dict.academy.quiz;
  const { progress, ready } = useAcademyProgress();
  const done = answers.every((a) => a !== null);
  const score = answers.filter((a, i) => a === questions[i].answer).length;
  const best = progress[slug];

  function choose(qi: number, oi: number) {
    if (answers[qi] !== null) return;
    const next = answers.map((a, i) => (i === qi ? oi : a));
    setAnswers(next);
    if (next.every((a) => a !== null)) {
      const before = computeBadges(getAcademyProgress(), catalog, dict);
      saveQuizResult(slug, next.filter((a, i) => a === questions[i].answer).length, questions.length);
      setEarned(newlyEarned(before, computeBadges(getAcademyProgress(), catalog, dict)));
    }
  }

  return (
    <div className="space-y-6">
      {ready && best ? (
        <p className="text-[12.5px] text-muted">
          {t.best} <span className="num text-fg-2">{best.score}/{best.total}</span>
          {isCompleted(best) ? <span className="text-positive"> · {t.completed}</span> : null}
        </p>
      ) : null}
      <ol className="space-y-6">
        {questions.map((q, qi) => {
          const picked = answers[qi];
          return (
            <li key={q.question}>
              <fieldset>
                <legend className="flex gap-3 text-[15px] font-medium leading-snug text-fg">
                  <span className="num pt-0.5 text-[12px] text-subtle">{String(qi + 1).padStart(2, "0")}</span>
                  {q.question}
                </legend>
                <div className="mt-3 grid gap-2 pl-8">
                  {q.options.map((o, oi) => {
                    const isAnswer = oi === q.answer;
                    const isPicked = picked === oi;
                    const revealed = picked !== null;
                    return (
                      <button
                        key={o}
                        type="button"
                        onClick={() => choose(qi, oi)}
                        disabled={revealed}
                        aria-pressed={isPicked}
                        className={cn(
                          "flex items-start gap-3 rounded-lg border px-3.5 py-2.5 text-left text-[14px] leading-snug transition-colors",
                          !revealed && "border-line text-fg-2 hover:border-line-strong hover:text-fg",
                          revealed && isAnswer && "border-positive/40 bg-positive-soft text-fg",
                          revealed && isPicked && !isAnswer && "border-negative/40 bg-negative-soft text-fg",
                          revealed && !isAnswer && !isPicked && "border-line text-subtle",
                        )}
                      >
                        <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center" aria-hidden>
                          {revealed && isAnswer ? <Check className="size-4 text-positive" /> : revealed && isPicked ? <X className="size-4 text-negative" /> : <span className="size-3 rounded-full border border-line-strong" />}
                        </span>
                        {o}
                      </button>
                    );
                  })}
                </div>
                {picked !== null ? (
                  <p className="mt-2.5 pl-8 text-[13px] leading-relaxed text-fg-2" role="status">
                    <span className={picked === q.answer ? "font-medium text-positive" : "font-medium text-negative"}>{picked === q.answer ? t.correctAnswer : t.wrongAnswer} </span>
                    {q.explanation}
                  </p>
                ) : null}
              </fieldset>
            </li>
          );
        })}
      </ol>
      {done && earned.length ? (
        <div className="rounded-xl border border-line bg-surface px-4 py-3.5" role="status">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">{earned.length === 1 ? t.badgeEarned : t.badgesEarned(earned.length)}</div>
          <ul className="mt-2.5 flex flex-wrap gap-x-6 gap-y-3">
            {earned.map((b) => (
              <li key={b.id} className="flex items-center gap-2.5">
                <BadgeMedal badge={b} size="sm" />
                <span>
                  <span className="block text-[13.5px] font-medium text-fg">{b.label}</span>
                  <span className="block text-[12px] text-muted">{b.description}</span>
                </span>
              </li>
            ))}
          </ul>
          <Link href="/academy#progress" className="mt-3 inline-block text-[12.5px] text-accent hover:text-accent-strong">
            {t.seeAll}
          </Link>
        </div>
      ) : null}
      {done ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line px-4 py-3" style={{ borderColor: color }}>
          <p className="text-[14px] text-fg">
            <span className="num">{score}/{questions.length}</span> {t.correct}{" "}
            <span className="text-muted">{score === questions.length ? t.mastered : score / questions.length >= 2 / 3 ? t.passed : t.failed}</span>
          </p>
          <button
            onClick={() => {
              setAnswers(questions.map(() => null));
              setEarned([]);
            }}
            className="inline-flex items-center gap-1.5 text-[13px] text-accent hover:text-accent-strong"
          >
            <RotateCcw className="size-3.5" aria-hidden /> {t.retry}
          </button>
        </div>
      ) : null}
    </div>
  );
}
