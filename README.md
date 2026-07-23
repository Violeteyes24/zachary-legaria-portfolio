# Zachary Legaria Portfolio

A personal portfolio for **Zachary Albert Legaria**, full-stack & AI engineer. The
design ("Nocturne") originates from a [Claude Design](https://claude.ai/design)
project and has been rebuilt as a real Next.js App Router application, with reusable
React components, structured content, and full server-rendering, not an embed.

Live sections: Hero, Selected Work (with per-project case studies), About,
Experience, and Contact.

## Tech stack

- **Next.js 16** (App Router, Turbopack) with **React 19**
- **TypeScript** (strict)
- **Tailwind CSS v4** with a CSS-variable design-token theme
- **Inter** via `next/font` (self-hosted, optimized)
- Static generation (SSG) for the home page and every case study

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint (next/core-web-vitals + typescript)
```

## Project structure

```
src/
  app/
    layout.tsx              # Root layout: fonts, metadata, theme, header/footer
    page.tsx                # Home page (composes the sections)
    not-found.tsx           # Custom 404
    icon.svg                # Favicon (ZL monogram, auto-detected)
    opengraph-image.tsx     # OG/social card, generated with next/og
    work/[slug]/page.tsx    # Case-study route (generateStaticParams + metadata)
  components/
    layout/                 # Header (mobile nav), Footer, Brand
    sections/               # Hero, Work, About, Experience, Contact (+ ContactForm)
    ui/                     # Container, Reveal, Button, Tag, ProjectCard, etc.
    case/                   # CaseStudy template
    theme/                  # ThemeScript (no-FOUC), ThemeProvider, ThemeToggle
  data/
    portfolio.ts            # Single source of truth for all content
public/
  resume.pdf                # Downloadable résumé
```

All repeated content (nav, socials, stats, skills, experience, projects, and the
full case-study narratives) lives in [`src/data/portfolio.ts`](src/data/portfolio.ts).
Edit that file to update the site; components render from it.

## Design & implementation notes

- **Theme** - dark by default with a light mode. Colors are CSS variables in
  `globals.css`, switched by a single `data-theme` attribute on `<html>`. A tiny
  inline script (`ThemeScript`) applies the saved theme before paint to avoid a
  flash; `useSyncExternalStore` keeps React in sync.
- **Server Components by default** - only interactive pieces are client
  components: the header (mobile menu + theme toggle), the reveal-on-scroll
  wrapper, the contact form, the live clock, and the back-to-top button.
- **Accessibility** - semantic landmarks (`<header>`, `<main>`, `<nav>`,
  `<footer>`), a single `<main>` per page, labelled controls, visible focus
  states, keyboard-navigable cards (real links), and `aria-invalid` /
  `aria-describedby` on the form.
- **Motion** - scroll reveals, the pulsing status dot, and the hero orb all
  respect `prefers-reduced-motion`.
- **Images** - the source Claude Design project ships no real imagery, so project
  covers and the portrait render as on-brand gradient placeholders by default. To
  use real photos, drop a file in `public/` and set its path in the data:
  a project's `cover` field (in `src/data/portfolio.ts`) or `about.portrait`. When
  a path is set, `CoverImage` renders it through `next/image`; otherwise it falls
  back to the placeholder. No component changes needed.
- **SEO** - per-page titles, descriptions, canonical URLs, Open Graph + Twitter
  cards, a generated OG image, `theme-color`, and an SVG favicon.

## Deployment (Vercel)

This app is ready to deploy on Vercel with zero configuration.

Optionally set `NEXT_PUBLIC_SITE_URL` to your production URL so canonical and
Open Graph URLs are absolute:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

It defaults to `https://zachary-legaria.vercel.app` if unset.
