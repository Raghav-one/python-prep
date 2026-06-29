import { Fragment } from "react";

/** Splits on backtick-delimited spans and wraps them as inline <code> — lets data files use plain strings with `code` styling. */
export function renderWithInlineCode(text: string) {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`") && part.length > 1) {
      return (
        <code
          key={i}
          className="rounded border border-border bg-surface-dark px-1 py-0.5 font-mono text-[0.85em] font-medium text-navy-950"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}
