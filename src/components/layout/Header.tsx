"use client";

import Link from "next/link";
import { useState } from "react";
import { navItems, profile } from "@/data/portfolio";
import { Brand } from "./Brand";
import { ThemeToggle, ThemeToggleWide } from "@/components/theme/ThemeToggle";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header
      className="sticky top-0 z-[60] border-b border-border-soft"
      style={{ backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", background: "color-mix(in srgb, var(--bg) 84%, transparent)" }}
    >
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-[clamp(20px,5vw,64px)] py-3">
        <Brand />
        <nav aria-label="Primary" className="hidden items-center gap-7 min-[881px]:flex">
          {navItems.map((item) => <Link key={item.href} href={item.href} className="nav-link">{item.label}</Link>)}
        </nav>
        <div className="hidden items-center gap-3 min-[881px]:flex">
          <ThemeToggle />
          <a href={profile.resumeHref} target="_blank" rel="noopener noreferrer" className="btn-outline px-4 py-2.5 text-[11px] uppercase tracking-[0.08em]">Résumé ↗</a>
        </div>
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="grid h-10 w-10 place-items-center border border-border bg-transparent font-mono text-[13px] text-ink min-[881px]:hidden"
        >
          <span aria-hidden>{menuOpen ? "CLOSE" : "MENU"}</span>
        </button>
      </div>
      {menuOpen ? (
        <div id="mobile-menu" className="border-t border-border-soft bg-bg px-[clamp(20px,5vw,64px)] pb-5 pt-2 min-[881px]:hidden">
          <nav aria-label="Mobile primary" className="flex flex-col">
            {navItems.map((item, index) => (
              <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="flex items-center justify-between border-b border-border-soft py-4 font-editorial text-[1.7rem] text-ink">
                {item.label}<span className="section-index">0{index + 2}</span>
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex gap-3"><ThemeToggleWide /><a href={profile.resumeHref} target="_blank" rel="noopener noreferrer" className="btn-outline flex-1">Résumé ↗</a></div>
        </div>
      ) : null}
    </header>
  );
}
