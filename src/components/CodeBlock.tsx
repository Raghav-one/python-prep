"use client";

import { useRef, useState, type ComponentPropsWithoutRef } from "react";

/**
 * Replaces the raw <pre> that rehype-pretty-code emits for fenced code blocks
 * with a DataCamp-style snippet card: dark theme (from Shiki), a language
 * label, and a copy-to-clipboard button.
 */
type PreProps = ComponentPropsWithoutRef<"pre"> & {
  "data-language"?: string;
};

export default function CodeBlock(props: PreProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const language =
    typeof props["data-language"] === "string" ? props["data-language"] : undefined;

  const handleCopy = async () => {
    const text = preRef.current?.textContent ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — fail silently.
    }
  };

  return (
    <div className="group not-prose relative my-6 overflow-hidden rounded-xl border border-navy-900 bg-[#0d1117] shadow-sm">
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
      <pre
        {...props}
        ref={preRef}
        className="overflow-x-auto px-4 py-4 text-[13px] leading-relaxed [&>code]:bg-transparent"
      />
    </div>
  );
}
