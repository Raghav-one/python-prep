"use client";

import { useState } from "react";

interface CodeBlockShellProps {
  /** Raw source — used for the copy button (so we copy clean text, not highlighted markup). */
  code: string;
  /** Pre-rendered, syntax-highlighted HTML (from Shiki). */
  html: string;
  language?: string;
}

/** DataCamp-style snippet card shell: dark theme, language label, copy-to-clipboard — shared by MDX code blocks and data-driven solution snippets. */
export default function CodeBlockShell({ code, html, language }: CodeBlockShellProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — fail silently.
    }
  };

  return (
    <div className="not-prose relative my-2 overflow-hidden rounded-xl border border-navy-900 bg-[#0d1117] shadow-sm [&_pre]:!bg-transparent [&_pre]:overflow-x-auto [&_pre]:px-4 [&_pre]:py-4 [&_pre]:text-[13px] [&_pre]:leading-relaxed">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="font-mono text-xs font-medium uppercase tracking-wider text-white/50">
          {language ?? "code"}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-md px-2.5 py-1 text-xs font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
