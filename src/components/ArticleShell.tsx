import type { ReactNode } from "react";
import TableOfContents from "@/components/TableOfContents";
import ReadingProgressBar from "@/components/ReadingProgressBar";

interface ArticleShellProps {
  /** Small label above the title, e.g. "PYTHON CONCEPTS" */
  eyebrow: string;
  title: string;
  description: string;
  /** e.g. "32 min read · 20 sections" */
  meta?: string;
  children: ReactNode;
  tocTitle?: string;
}

const CONTAINER_ID = "article-content";

/**
 * Shared DataCamp-style tutorial shell: hero header, sticky sidebar table of
 * contents with scrollspy, reading-progress bar, and a centered prose column.
 */
export default function ArticleShell({
  eyebrow,
  title,
  description,
  meta,
  children,
  tocTitle,
}: ArticleShellProps) {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <ReadingProgressBar containerId={CONTAINER_ID} />

      <div className="border-b border-border bg-gradient-to-b from-surface to-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-600">
            {eyebrow}
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-navy-700 sm:text-lg">
            {description}
          </p>
          {meta && (
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-1.5 text-sm font-medium text-navy-500">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
              {meta}
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-12 px-4 py-10 sm:px-6 lg:px-8">
        <article
          id={CONTAINER_ID}
          className="prose-article prose prose-slate min-w-0 max-w-3xl flex-1 prose-headings:scroll-mt-28 prose-pre:p-0"
        >
          {children}
        </article>

        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-28">
            <TableOfContents containerId={CONTAINER_ID} title={tocTitle} />
          </div>
        </aside>
      </div>
    </div>
  );
}
