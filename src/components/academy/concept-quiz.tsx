"use client";

import { useState } from "react";
import { Check, RotateCcw, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuizQuestion } from "@/content/concepts";
import { isCompleted, saveQuizResult, useAcademyProgress } from "@/lib/academy/progress";

export function ConceptQuiz({ slug, questions, color }: { slug: string; questions: QuizQuestion[]; color: string }) {
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));
  const { progress, ready } = useAcademyProgress();
  const done = answers.every((a) => a !== null);
  const score = answers.filter((a, i) => a === questions[i].answer).length;
  const best = progress[slug];

  function choose(qi: number, oi: number) {
    if (answers[qi] !== null) return;
    const next = answers.map((a, i) => (i === qi ? oi : a));
    setAnswers(next);
    if (next.every((a) => a !== null)) saveQuizResult(slug, next.filter((a, i) => a === questions[i].answer).length, questions.length);
  }

  return (
    <div className="space-y-6">
      {ready && best ? (
        <p className="text-[12.5px] text-muted">
          Your best score: <span className="num text-fg-2">{best.score}/{best.total}</span>
          {isCompleted(best) ? <span className="text-positive"> · lesson completed</span> : null}
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
                    <span className={picked === q.answer ? "font-medium text-positive" : "font-medium text-negative"}>{picked === q.answer ? "Correct. " : "Not quite. "}</span>
                    {q.explanation}
                  </p>
                ) : null}
              </fieldset>
            </li>
          );
        })}
      </ol>
      {done ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line px-4 py-3" style={{ borderColor: color }}>
          <p className="text-[14px] text-fg">
            <span className="num">{score}/{questions.length}</span> correct.{" "}
            <span className="text-muted">{score === questions.length ? "Lesson mastered." : score / questions.length >= 2 / 3 ? "Lesson completed." : "Re-read the steps above and try again."}</span>
          </p>
          <button onClick={() => setAnswers(questions.map(() => null))} className="inline-flex items-center gap-1.5 text-[13px] text-accent hover:text-accent-strong">
            <RotateCcw className="size-3.5" aria-hidden /> Try again
          </button>
        </div>
      ) : null}
    </div>
  );
}
