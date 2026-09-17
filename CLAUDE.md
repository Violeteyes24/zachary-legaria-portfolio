@AGENTS.md

# Project Guidelines

## ⚠️ Version Reality — read this before any Next.js guidance

This project runs **Next.js 16.2.11, React 19.2.4, Tailwind CSS v4, TypeScript 5**, App Router, `src/` directory.

**The imported `AGENTS.md` rule outranks everything below.** Next 16 has breaking changes against most training data (`proxy.ts` replaces `middleware.ts`, `use cache` / `cacheComponents`, revised caching and data-fetching defaults). Before writing Next-specific code, read the relevant guide in `node_modules/next/dist/docs/` — that is the version actually installed here. If anything in this file conflicts with those docs, the docs win and this file should be corrected.

## 🔄 Project Awareness & Context

- **Read `.claude/PROJECT.md`** at the start of a new conversation for architecture, goals, and constraints.
- **Check `.claude/TODO.md`** before starting a task. If the task isn't listed, add it with a brief description and today's date.
- Spawn the relevant sub-agents from `.claude/agents/` for specialized work.

## 🤝 Team Collaboration Protocol

All agents must follow this:

1. **Before starting**: read `.claude/collab/team_notes.md` to see ongoing work and avoid duplicating it.
2. **After finishing**: append your findings to `.claude/collab/team_notes.md` in the format below.
3. **Do not** create ad-hoc directories, report files, or agent-specific folders. All collaboration goes through `team_notes.md`. Only create files that are actual project deliverables.

```markdown
### [Date] - [Agent Name] - [Task/Command]
**Status**: [Started/Completed/Blocked]
**Summary**: Brief description
**Key Findings**: List findings
**Actions Taken**: List actions
**Next Steps**: List recommendations
---
```

**Maintenance**: if `team_notes.md` exceeds 500 lines or 100KB, archive entries older than 7 days to `.claude/collab/archives/team_notes_YYYY-MM-DD_HH-MM.md`. Never delete the first 30 lines (instructions and format).

## 🧱 Code Structure

Actual layout — keep new files consistent with it:

- `src/app/` — App Router routes, layouts, and file-convention files (`sitemap.ts`, `robots.ts`, `opengraph-image.tsx`)
- `src/components/layout/` — Header, Footer, Brand
- `src/components/sections/` — page sections (Hero, About, Experience, Projects, Contact)
- `src/components/ui/` — reusable presentational primitives
- `src/components/case/`, `src/components/seo/`, `src/components/theme/` — feature-scoped components
- `src/data/` — static content (`portfolio.ts`)
- `src/lib/` — shared logic and helpers

- **Never create a file longer than 300 lines.** Split into components, hooks, or helpers before it gets there.
- Put new shared logic in `src/lib/`, new content in `src/data/`. Create `src/hooks/` or `src/types/` only when there is real content for them — don't scaffold empty directories.
- There are no barrel (`index.ts`) files today. Don't introduce them for a single module.
- Use Next's built-in `.env.local` support for environment variables.

## 🎨 React & Next.js

- **Server Components by default**; add `'use client'` only when the component needs interactivity, state, or browser APIs.
- Use `next/image` and `next/link` rather than raw `<img>` / `<a>` for internal navigation.
- Use the Metadata API / `generateMetadata` for SEO.
- Implement loading and error boundaries where a route can fail or wait on data.
- **For caching, data fetching, and mutations, check `node_modules/next/dist/docs/01-app/01-getting-started/` first** — the 16.x defaults differ from earlier versions. Do not apply remembered Next 13/14 patterns.

## 📎 Style & Conventions

- **TypeScript for all new files** (`.ts`, `.tsx`), `strict: true`.
- **Tailwind CSS v4** for styling (configured via `@tailwindcss/postcss`). No CSS Modules or styled-components in this project.
- Functional components with hooks. No class components.
- Lint with `npm run lint` (ESLint 9 flat config in `eslint.config.mjs`). **Prettier is not installed** — don't invoke it or assume its formatting.
- JSDoc for non-obvious functions; document component props with TypeScript interfaces.

## 🧪 Testing & Verification

**No test framework is installed in this project.** Do not write tests against Jest, React Testing Library, Playwright, or Cypress as if they exist, and do not reference `npm test` — there is no such script.

Until a test setup is added, verification means:

```bash
npm run lint     # ESLint
npm run build    # type-check + production build
```

Both must pass before a task is considered complete. If a change warrants real tests, propose the test setup and get agreement before adding the dependency.

## ✅ Task Completion

- Mark completed tasks in `.claude/TODO.md` as soon as they're done.
- Add work discovered mid-task to `.claude/TODO.md` under "Discovered During Work".
- Review what you wrote for security: no secrets in client components or committed files, no exploitable input handling.
- Update `README.md` when features, dependencies, or setup steps change.

## 🧠 AI Behavior Rules

- **Never assume missing context — ask.**
- **Never hallucinate libraries or APIs.** Check `package.json` for what's available before suggesting a dependency.
- Confirm file paths and module names exist before referencing them.
- Never delete or overwrite existing code unless asked, or unless it's part of a `.claude/TODO.md` task.
- Add inline `// Reason:` comments for non-obvious decisions — the why, not the what.
