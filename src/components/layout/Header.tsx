"use client";

import Link from "next/link";
import { useState } from "react";
import { navItems, profile } from "@/data/portfolio";
import { Brand } from "./Brand";
import { ThemeToggle, ThemeToggleWide } from "@/components/theme/ThemeToggle";

/**
 * Sticky, blurred site header. Desktop shows inline nav + theme toggle + résumé;
 * below 880px it collapses to a burger that opens an accessible dropdown menu.
 */
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className="sticky top-0 z-[60] border-b border-border-soft"
      style={{
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        background: "color-mix(in srgb, var(--bg) 80%, transparent)",
      }}
    >
      <div
        className="flex items-center justify-between gap-4"
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "14px clamp(20px, 5vw, 64px)",
        }}
      >
        <Brand />

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden items-center gap-[26px] min-[881px]:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 min-[881px]:flex">
          <ThemeToggle />
          <a
            href={profile.resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-[9px] border border-accent-line px-4 py-2.5 font-heading text-[14px] font-medium text-accent-ink transition-colors hover:bg-[color-mix(in_srgb,var(--accent)_12%,transparent)]"
          >
            Résumé ↗
          </a>
        </div>

        {/* Mobile burger */}
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-[9px] border border-border bg-transparent text-ink min-[881px]:hidden"
        >
          <span aria-hidden className="font-heading text-[16px] font-semibold">
            {menuOpen ? "✕" : "≡"}
          </span>
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen ? (
        <div
          id="mobile-menu"
          className="flex flex-col gap-1 border-t border-border-soft min-[881px]:hidden"
          style={{ padding: "10px clamp(20px, 5vw, 64px) 18px" }}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="border-b border-border-soft py-3 text-left font-heading text-[17px] font-medium text-ink"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-3 flex gap-3">
            <ThemeToggleWide />
            <a
              href={profile.resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="flex-1 rounded-[9px] border border-accent-line px-3 py-3 text-center font-heading text-[14px] font-medium text-accent-ink"
            >
              Résumé ↗
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
