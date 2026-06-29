"use client";

import { useState } from "react";
import type { CodingQuestion as CodingQuestionData } from "@/data/codingQuestions";
import { renderWithInlineCode } from "@/lib/inlineCode";
import CodeBlockShell from "@/components/CodeBlockShell";

const difficultyStyles: Record<CodingQuestionData["difficulty"], string> = {
  Easy: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  Hard: "bg-rose-50 text-rose-700 border-rose-200",
};

export default function CodingQuestion({
  data,
  index,
  solutionHtml,
}: {
  data: CodingQuestionData;
  index: number;
  solutionHtml: string;
}) {
  const [showSolution, setShowSolution] = useState(false);
  const [hintsRevealed, setHintsRevealed] = useState(0);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      <div className="border-b border-border bg-surface px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="font-mono text-xs font-semibold text-navy-500">#{index}</span>
          <h3 className="text-lg font-semibold tracking-tight text-navy-950">{data.title}</h3>
          <span
            className={`ml-auto rounded-full border px-2.5 py-0.5 text-xs font-semibold ${difficultyStyles[data.difficulty]}`}
          >
            {data.difficulty}
          </span>
          <span className="rounded-full border border-border bg-white px-2.5 py-0.5 text-xs font-medium text-navy-500">
            {data.topic}
          </span>
        </div>
      </div>

      <div className="space-y-5 px-5 py-5 sm:px-6">
        <p className="text-[15px] leading-relaxed text-navy-700">{data.problem}</p>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-navy-500">
            Examples
          </p>
          <div className="space-y-2">
            {data.examples.map((example, i) => (
              <div key={i} className="rounded-lg border border-border bg-surface px-4 py-3 font-mono text-[13px] leading-relaxed">
                <div>
                  <span className="font-semibold text-navy-500">Input: </span>
                  <span className="text-navy-950">{example.input}</span>
                </div>
                <div>
                  <span className="font-semibold text-navy-500">Output: </span>
                  <span className="text-accent-700">{example.output}</span>
                </div>
                {example.explanation && (
                  <div className="mt-1 font-sans text-[13px] text-navy-500">
                    {example.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-500">Hints</p>
            {hintsRevealed < data.hints.length && (
              <button
                type="button"
                onClick={() => setHintsRevealed((n) => n + 1)}
                className="text-xs font-semibold text-accent-700 hover:text-accent-600"
              >
                Reveal hint {hintsRevealed + 1} of {data.hints.length} →
              </button>
            )}
          </div>
          {hintsRevealed === 0 ? (
            <p className="text-sm text-navy-500">
              Try the problem yourself first — reveal hints one at a time if you get stuck.
            </p>
          ) : (
            <ul className="space-y-1.5 text-sm leading-relaxed text-navy-700">
              {data.hints.slice(0, hintsRevealed).map((hint, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-0.5 text-accent-600">•</span>
                  <span>{renderWithInlineCode(hint)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-border pt-5">
          <button
            type="button"
            onClick={() => setShowSolution((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-full bg-navy-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-900"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-500" />
            {showSolution ? "Hide solution" : "Show solution & explanation"}
          </button>

          {showSolution && (
            <div className="mt-4 space-y-4">
              <CodeBlockShell code={data.solution} html={solutionHtml} language="python" />
              <p className="text-[15px] leading-relaxed text-navy-700">
                {renderWithInlineCode(data.explanation)}
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-navy-700">
                  <span className="font-semibold text-navy-950">Time:</span> {data.time}
                </span>
                <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-navy-700">
                  <span className="font-semibold text-navy-950">Space:</span> {data.space}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
