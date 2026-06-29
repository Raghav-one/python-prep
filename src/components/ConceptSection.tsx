"use client";

import { useState } from "react";

export default function ConceptSection({
  id,
  number,
  title,
  summary,
  children,
}: {
  id: string;
  number: number | string;
  title: string;
  summary?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const num = String(number).padStart(2, "0");

  return (
    <section
      id={id}
      data-toc-title={title}
      className={`mb-2 overflow-hidden rounded-xl border transition-colors duration-150 ${
        open ? "border-accent-500/50 bg-white" : "border-border bg-white hover:border-navy-500/30"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-4 px-5 py-4 text-left"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy-950 font-mono text-xs font-bold text-accent-500">
          {num}
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-[15px] font-semibold leading-snug text-navy-950">{title}</div>
          {summary && (
            <div className="mt-0.5 text-[13px] leading-snug text-navy-500">{summary}</div>
          )}
        </div>
        <span
          className={`shrink-0 text-navy-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>

      <div className={open ? "" : "hidden"}>
        <div className="border-t border-border px-6 pb-8 pt-6">{children}</div>
      </div>
    </section>
  );
}
