# PROJECT.md - Zachary Legaria Portfolio

## Overview

Personal portfolio site for Zachary Albert Legaria — full-stack and AI engineer. A statically-rendered marketing/résumé site with an editorial-tech visual design: landing page with sections (Hero, About, Experience, Projects, Contact) plus per-project case study routes.

**Repo**: https://github.com/Violeteyes24/zachary-legaria-portfolio
**Primary branch**: `main`
**Deploy target**: Vercel

## Tech Stack

- **Framework**: Next.js 16.2.11, App Router, `src/` directory
- **Language**: TypeScript 5, `strict: true`
- **UI**: React 19.2.4
- **Styling**: Tailwind CSS v4 via `@tailwindcss/postcss` (no CSS Modules, no styled-components)
- **Fonts**: `next/font/google` — Inter (sans) + Newsreader (serif), exposed as CSS variables
- **State Management**: none — React Context only, for theming (`ThemeProvider`)
- **Data Fetching**: none — all content is static, imported from `src/data/portfolio.ts`
- **Testing**: **none installed** (see Gotchas)
- **Linting**: ESLint 9 flat config (`eslint.config.mjs`) + `eslint-config-next`
- **Package Manager**: npm

## Project Structure

```
src/
├── app/                      # App Router
│   ├── layout.tsx            # Root layout: fonts, metadata, theme, JSON-LD
│   ├── page.tsx              # Landing page — composes the section components
│   ├── not-found.tsx
│   ├── globals.css           # Tailwind entry + design tokens
│   ├── icon.svg
│   ├── opengraph-image.tsx   # Generated OG image
│   ├── robots.ts             # File-convention robots.txt
│   ├── sitemap.ts            # File-convention sitemap
│   └── work/[slug]/          # Per-project case study route
│       ├── page.tsx
│       └── opengraph-image.tsx
├── components/
│   ├── layout/               # Header, Footer, Brand
│   ├── sections/             # Hero, About, Experience, Projects, Contact
│   ├── ui/                   # Button, Container, Tag, Reveal, CoverImage, …
│   ├── case/                 # CaseStudy
│   ├── seo/                  # JsonLd
│   └── theme/                # ThemeProvider, ThemeScript, ThemeToggle
├── data/
│   └── portfolio.ts          # ALL site content + types (single source of truth)
└── lib/
    └── structured-data.ts    # JSON-LD builders
```

## Conventions

### File Naming
- Components: `PascalCase.tsx`, one component per file, named export.
- Route files follow Next.js file conventions exactly (`page.tsx`, `layout.tsx`, `not-found.tsx`, `sitemap.ts`, `robots.ts`).
- Imports use the `@/` alias for `src/`.

### Component Patterns
- **Server Components by default.** `'use client'` only where interactivity demands it (theme toggle, scroll reveal, live clock, back-to-top).
- Sections are self-contained and composed in `src/app/page.tsx`.
- Presentational primitives live in `components/ui/` and take props — no data fetching inside them.

### Content
- **All copy, project data, experience, and links live in `src/data/portfolio.ts`**, typed (`Project`, `ExperienceItem`, `SkillGroup`, `NavItem`, `Social`, `Stat`).
- Adding or editing a project means editing that file — case study routes and the sitemap derive from it.
- `siteUrl` is resolved there and feeds `metadataBase`, JSON-LD, sitemap, and OG images.

### SEO
- Metadata API in `layout.tsx` with a title template; per-route `generateMetadata` where needed.
- JSON-LD via `<JsonLd>` + builders in `src/lib/structured-data.ts`.
- OG images generated at the route level with `opengraph-image.tsx`.

## Development Workflow

### Available Scripts
```bash
npm run dev     # next dev
npm run build   # production build (also the type-check gate)
npm run start   # next start
npm run lint    # eslint
```

There is **no `npm test`**. Verification = `npm run lint` + `npm run build`.

### Git Workflow
- Work on feature branches off `main`; merge via PR (recent history is PR-based).
- Keep commits scoped to one change.

## Architecture Decisions

**Data flow**: static content module → Server Components → HTML. No API routes, no database, no client-side fetching. Keep it that way unless a feature genuinely needs it.

**Theming**: `ThemeScript` runs before paint to avoid a flash of wrong theme; `ThemeProvider` holds the state; `ThemeToggle` flips it. Theme colors are CSS custom properties in `globals.css`.

**Performance**: fully static, `next/font` with `display: swap`, `next/image` for any raster asset. There is no runtime data dependency to slow down — protect that.

**Security**: no secrets, no auth, no user input beyond outbound contact links. The main risk surface is accidentally committing a secret or introducing a dependency that ships client-side tracking.

## Gotchas and Tips

1. **Next.js 16, not 14.** `proxy.ts` replaces `middleware.ts`; caching and data-fetching defaults changed (`use cache` / `cacheComponents`). Read `node_modules/next/dist/docs/` before writing Next-specific code — this is the standing rule in `AGENTS.md`.
2. **No test framework.** Don't write Jest/RTL/Playwright tests or reference `npm test` as if they exist. Propose the setup first if tests are warranted.
3. **No Prettier.** Formatting is whatever ESLint enforces. Don't run or assume `prettier`.
4. **Tailwind v4**, not v3 — configuration is CSS-first, there is no `tailwind.config.js`.
5. **`src/data/portfolio.ts` is load-bearing.** Sitemap, case study routes, OG images, and JSON-LD all read from it. Changing a `slug` changes a public URL.
