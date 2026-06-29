"use client";

import { useEffect, useState } from "react";

/** Slim top-of-page progress bar that fills as the reader scrolls through the article. */
export default function ReadingProgressBar({ containerId }: { containerId: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      const pct = total > 0 ? Math.min(100, Math.max(0, (scrolled / total) * 100)) : 0;
      setProgress(pct);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [containerId]);

  return (
    <div className="fixed inset-x-0 top-16 z-30 h-[3px] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-accent-600 to-accent-500 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
