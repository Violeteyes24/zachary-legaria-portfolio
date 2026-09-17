# TODO

Task tracker for this project. Add a task before starting work on it; mark it done as soon as it's finished.

Format: `- [ ] YYYY-MM-DD — Description`

## In Progress

_(nothing)_

## Backlog

- [ ] 2026-09-17 — Decide whether to add a test setup (Vitest + React Testing Library) or stay lint+build only
- [ ] 2026-09-17 — Consider rate limiting the contact Server Action if spam gets through the honeypot (Vercel BotID, or Upstash Redis via the Marketplace)

## Completed

- [x] 2026-09-17 — Installed the context-engineering framework and merged its guidelines into `CLAUDE.md`
- [x] 2026-09-17 — Trimmed `.claude/settings.json` permissions to this project
- [x] 2026-09-17 — PRP 01: contact form via Server Action + Resend

## Discovered During Work

- [x] 2026-09-17 — PRP 01 specified rejecting a missing `startedAt` timestamp as a bot. That conflicts with the no-JS requirement, since only client JS can set it. Changed to reject only an implausibly *recent* timestamp; the honeypot covers the no-JS case.
- [x] 2026-09-17 — The repo's React Compiler lint rule (`react-hooks/set-state-in-effect`) rejects `setState` inside an effect. The mount timestamp is written to the DOM node via a ref instead.
- [ ] 2026-09-17 — `README.md` described a `ContactForm` and `aria-invalid` form attributes before either existed. Worth a pass over the rest of the README for other claims that describe intent rather than reality.
- [ ] 2026-09-17 — `buildMailto(name?, message?)` in `src/data/portfolio.ts` still has two parameters no caller passes. Either wire them up or simplify the signature.
