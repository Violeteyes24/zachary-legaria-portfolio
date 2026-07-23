"use client";

import { useTheme } from "./ThemeProvider";

/** Compact icon toggle used in the desktop header. */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="grid h-[38px] w-[38px] place-items-center rounded-[9px] border border-border bg-transparent text-ink-2 transition-colors hover:border-accent-line hover:text-accent-ink"
    >
      <span aria-hidden className="font-heading text-[15px] font-semibold">
        {theme === "dark" ? "☾" : "☀"}
      </span>
    </button>
  );
}

/** Full-width labelled toggle used inside the mobile menu. */
export function ThemeToggleWide() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex-1 rounded-[9px] border border-border bg-transparent px-3 py-3 font-heading text-[14px] font-medium text-ink-2"
    >
      {theme === "dark" ? "Light mode" : "Dark mode"}
    </button>
  );
}
