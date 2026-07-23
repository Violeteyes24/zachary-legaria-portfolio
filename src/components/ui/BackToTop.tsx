"use client";

/** Scrolls smoothly back to the top of the page (honours reduced motion). */
export function BackToTop() {
  const handleClick = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-transparent px-[15px] py-2 font-heading text-[12.5px] font-medium text-ink-2 transition-colors hover:border-accent-line hover:text-accent-ink"
    >
      Back to top ↑
    </button>
  );
}
