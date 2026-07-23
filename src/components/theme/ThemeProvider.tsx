"use client";

import { useCallback, useSyncExternalStore, type ReactNode } from "react";

type Theme = "dark" | "light";

/**
 * The theme lives on <html data-theme>, set before hydration by
 * ThemeScript (from localStorage) and is the single source of truth. We read it
 * with useSyncExternalStore so React stays in sync without ever calling setState
 * inside an effect, and persist changes back to localStorage on toggle.
 */
const listeners = new Set<() => void>();

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

function getServerSnapshot(): Theme {
  // Matches the default rendered on <html>; ThemeScript reconciles pre-paint.
  return "dark";
}

function applyTheme(next: Theme) {
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem("zl-theme", next);
  } catch {
    /* storage may be unavailable (private mode), non-fatal */
  }
  listeners.forEach((l) => l());
}

/** Passthrough kept so the layout has a stable place to opt into the theme. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function useTheme(): { theme: Theme; toggleTheme: () => void } {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const toggleTheme = useCallback(() => {
    applyTheme(getSnapshot() === "dark" ? "light" : "dark");
  }, []);
  return { theme, toggleTheme };
}
