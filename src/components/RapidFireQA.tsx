"use client";

import { useState } from "react";
import type { RapidFireQuestion } from "@/data/rapidFireQuestions";
import { renderWithInlineCode } from "@/lib/inlineCode";

/** Click-to-reveal Q/A accordion item — built for quick-scan drilling, DataCamp quiz-card style. */
export default function RapidFireQA({ item, index }: { item: RapidFireQuestion; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`overflow-hidden rounded-xl border transition-colors ${
        open ? "border-accent-500/60 bg-white" : "border-border bg-white hover:border-navy-500/40"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-start gap-3 px-4 py-3.5 text-left sm:px-5"
      >
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface text-xs font-semibold text-navy-500">
          {index}
        </span>
        <span className="flex-1 text-[15px] font-medium leading-snug text-navy-950">
          {item.question}
        </span>
        <span
          className={`mt-1 shrink-0 text-accent-600 transition-transform duration-200 ${
            open ? "rotate-45" : ""
          }`}
          aria-hidden
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>

      {open && (
        <div className="border-t border-border bg-surface px-4 py-3.5 pl-[3.25rem] text-[14px] leading-relaxed text-navy-700 sm:px-5 sm:pl-[3.75rem]">
          {renderWithInlineCode(item.answer)}
        </div>
      )}
    </div>
  );
}
