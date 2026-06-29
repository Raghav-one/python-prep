"use client";

import { useEffect, useRef, useState } from "react";

export interface TocEntry {
  id: string;
  text: string;
  level: 2 | 3;
}

/**
 * Scans the article container for h2/h3 headings, builds a nested nav,
 * and highlights the heading currently in view (scrollspy) — the
 * signature DataCamp tutorial sidebar.
 */
export default function TableOfContents({
  containerId,
  title = "On this page",
}: {
  containerId: string;
  title?: string;
}) {
  const [entries, setEntries] = useState<TocEntry[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Collect both ConceptSection wrappers (section[data-toc-title]) and plain h2/h3 headings
    const allEls = Array.from(
      container.querySelectorAll<HTMLElement>("section[data-toc-title], h2[id], h3[id]")
    ).filter((el) => el.id || el.dataset.tocTitle);

    // Sort by DOM order
    allEls.sort((a, b) => {
      const pos = a.compareDocumentPosition(b);
      return pos & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
    });

    const headings = allEls.map((el) => {
      if (el.tagName === "SECTION") {
        return {
          id: el.id,
          text: el.dataset.tocTitle ?? el.id,
          level: 2 as const,
          el,
        };
      }
      return {
        id: (el as HTMLHeadingElement).id,
        text: el.textContent ?? "",
        level: el.tagName === "H3" ? (3 as const) : (2 as const),
        el,
      };
    });

    setEntries(
      headings.map(({ id, text, level }) => ({ id, text, level }))
    );

    if (headings.length === 0) return;

    observerRef.current?.disconnect();
    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (intersectionEntries) => {
        for (const entry of intersectionEntries) {
          if (entry.isIntersecting) {
            visible.add(entry.target.id);
          } else {
            visible.delete(entry.target.id);
          }
        }
        if (visible.size > 0) {
          const firstVisible = headings.find((h) => visible.has(h.id));
          if (firstVisible) setActiveId(firstVisible.id);
        }
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );

    headings.forEach(({ el }) => observer.observe(el));
    observerRef.current = observer;

    return () => observer.disconnect();
  }, [containerId]);

  if (entries.length === 0) return null;

  return (
    <nav aria-label={title} className="text-sm">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-navy-500">
        {title}
      </p>
      <ul className="toc-scroll max-h-[calc(100vh-12rem)] space-y-0.5 overflow-y-auto pr-2">
        {entries.map((entry) => {
          const isActive = entry.id === activeId;
          return (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                className={`block rounded-md py-1.5 pr-2 leading-snug transition-colors ${
                  entry.level === 3 ? "pl-7" : "pl-3"
                } ${
                  isActive
                    ? "bg-accent-500/10 font-semibold text-accent-700"
                    : "text-navy-500 hover:text-navy-950"
                }`}
                style={
                  isActive
                    ? { boxShadow: "inset 2px 0 0 var(--color-accent-600)" }
                    : undefined
                }
              >
                {entry.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
