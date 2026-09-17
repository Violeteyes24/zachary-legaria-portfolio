## FEATURE:

Add a working contact form to the Contact section of the portfolio, replacing the current mailto-only call to action.

**Goal**: a recruiter or client can send a message from the site itself. Today the only path is a `mailto:` link, which silently does nothing on machines with no mail client configured — those leads are lost invisibly.

**Requirements:**

- A form in the existing Contact section with fields: **name**, **email**, **message**. All required.
- Submits via a **Next.js Server Action** (this project is on Next 16 — check the installed docs for current Server Action conventions before writing).
- Delivers the message to `gmzach024@gmail.com` via **Resend**, with the visitor's address set as `replyTo` so replying from Gmail goes straight back to them.
- **Server-side validation** of all three fields. Never trust the client. Return field-level errors.
- **Spam protection without new dependencies**: a hidden honeypot field plus a minimum time-to-submit check (a form submitted in under ~2 seconds is a bot). No CAPTCHA — it hurts conversion and adds a third-party script.
- **Form states**: idle, submitting (disabled button + label change), success (confirmation replacing the form), error (message preserved so the user does not retype it).
- **Progressive enhancement**: the form must still submit with JavaScript disabled. Do not gate submission on client-side JS.
- **Keep the existing mailto and LinkedIn buttons** as secondary fallbacks. Do not remove them.
- The form must match the existing editorial design exactly — same borders, type scale, mono kickers, accent colors, and dark-mode behavior as the surrounding Contact card.

## EXAMPLES:

There is no `examples/` folder in this project. Use the real code in this repo as the pattern source:

- `src/components/sections/Contact.tsx` — the section this feature modifies. Match its layout grid, spacing (`clamp()` values), and the `Kicker`/`Reveal`/`Container` composition exactly.
- `src/components/ui/Button.tsx` — the existing button variants (`accent`, `outline`). Reuse these; do not write new button styles.
- `src/components/theme/ThemeProvider.tsx` — how client components are structured in this codebase.
- `src/app/work/[slug]/page.tsx` — how async server components and typed props are written here.
- `src/data/portfolio.ts` — where `profile.email` and `buildMailto()` live. Note that `buildMailto(name?, message?)` already accepts arguments that are currently unused.
- `src/app/globals.css` — the design tokens (`--ink`, `--accent`, `--border`, `--surface`). Use these tokens, never hardcoded colors.

## DOCUMENTATION:

**Read these local files first — they describe the Next.js version actually installed (16.2.11), not the one in your training data:**

- `node_modules/next/dist/docs/01-app/01-getting-started/07-mutating-data.md` — Server Actions, the primary API for this feature
- `node_modules/next/dist/docs/01-app/01-getting-started/10-error-handling.md` — error and validation patterns
- `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md` — where the `'use client'` boundary belongs

Then:

- React `useActionState` — https://react.dev/reference/react/useActionState (React 19 is installed; this replaces the older `useFormState`)
- Resend Node SDK — https://resend.com/docs/send-with-nextjs
- Vercel environment variables — https://vercel.com/docs/environment-variables

## OTHER CONSIDERATIONS:

**Version traps — this is where AI assistants get this project wrong:**

- This is **Next.js 16.2.11**, not 13/14. Server Action conventions, caching defaults, and file conventions have changed. `middleware.ts` is now `proxy.ts`. Read the local docs above before writing; do not apply remembered patterns.
- This is **React 19.2.4**. Use `useActionState`, not the deprecated `useFormState` from `react-dom`.
- This is **Tailwind v4** — CSS-first config, there is no `tailwind.config.js`.

**Project constraints:**

- **This adds the first server-side code to a fully static site.** Everything currently prerenders. The Server Action must not force the landing page out of static generation — verify with `npm run build` that `/` is still prerendered afterward.
- **There is no test framework installed.** Do not write Jest, RTL, or Playwright tests, and do not reference `npm test` — there is no such script. Verification is `npm run lint` and `npm run build`, both of which must pass.
- **Prettier is not installed.** Do not run it or reformat to its conventions.
- **No new dependencies except `resend`.** Validation should be hand-rolled, not Zod. Keep the dependency footprint small — it is currently three packages.
- `src/data/portfolio.ts` is load-bearing: the sitemap, case study routes, OG images, and JSON-LD all read from it. Be careful editing it.

**Secrets and config:**

- Add `RESEND_API_KEY` to `.env.local`, and create a committed `.env.example` documenting it. `.env*` is already gitignored — confirm the real key never gets committed.
- On Resend's free tier without a verified domain, you can send **from** `onboarding@resend.dev` **to** the account owner's own address. That is exactly this use case, so no domain purchase or DNS verification is needed. Do not design around a custom sending domain.
- The API key must only ever be read server-side. It must never appear in a client component or be prefixed `NEXT_PUBLIC_`.
- Fail gracefully if `RESEND_API_KEY` is missing — the build and dev server must not crash, and the form should show a useful error rather than a stack trace.

**Accessibility:**

- Real `<label>` elements associated with each input, not placeholder-only fields.
- Validation errors announced with `aria-live="polite"` and linked via `aria-describedby`.
- Visible focus states consistent with the rest of the site.
- The honeypot field must be hidden from screen readers (`aria-hidden`, `tabIndex={-1}`) — not just visually hidden.

**Documentation:**

- Update `.claude/PROJECT.md`: the "no backend, no API routes" architecture note becomes untrue once this ships.
- Update `README.md` with the `RESEND_API_KEY` setup step.
