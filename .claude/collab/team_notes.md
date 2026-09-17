# Team Collaboration Notes

This file serves as the central communication hub for all agents working on this project. All agents should read this file when starting their work and append their findings/actions when completing tasks.

## Format for Entries

```markdown
### [Date] - [Agent Name] - [Task/Command]
**Status**: [Started/Completed/Blocked]
**Summary**: Brief description of what was done or discovered
**Key Findings**:
- Finding 1
- Finding 2

**Actions Taken**:
- Action 1
- Action 2

**Next Steps/Recommendations**:
- Recommendation 1
- Recommendation 2

---
```

## Active Collaborations

_Entries below this line are from agents working on the project_



### 2026-09-17 - Claude (main) - PRP 01: Contact form via Server Action
**Status**: Completed
**Summary**: Replaced the mailto-only CTA in the Contact section with a working, progressively-enhanced contact form backed by a Next 16 Server Action and Resend.

**Key Findings**:
- `src/components/ui/Button.tsx` renders `<a>`/`<Link>`, never `<button>`. It cannot be a form submit control. The `.btn-accent` CSS class was reused on a real `<button type="submit">` instead.
- Server Actions are reachable by direct POST, not just through our UI (confirmed in `node_modules/next/dist/docs/01-app/01-getting-started/07-mutating-data.md`). All validation and spam checks are therefore server-side.
- The PRP's original time-trap rule (missing `startedAt` => bot) contradicted the no-JS requirement. Relaxed to reject only implausibly recent timestamps.
- This repo lints with the React Compiler rules; `setState` inside an effect is an error, not a warning.
- Adding the Server Action did NOT opt `/` out of static generation — confirmed `○ (Static)` in build output.

**Actions Taken**:
- Added `src/lib/contact-validation.ts` (pure validators), `src/lib/contact-action.ts` (`'use server'`), `src/components/sections/ContactForm.tsx` (`'use client'`, `useActionState`).
- Added `.field-label` / `.field-input` / `.field-error` to `globals.css` using existing tokens only.
- Demoted the mailto button to `outline` under an "Or reach me directly" fallback row so the form is the single primary CTA.
- Added `.env.example`; updated `README.md` and `.claude/PROJECT.md`.
- `npm install resend` — the only new dependency.

**Next Steps/Recommendations**:
- Site owner must add a real `RESEND_API_KEY` to `.env.local` and to Vercel. End-to-end delivery is UNVERIFIED until then.
- Consider rate limiting if spam gets past the honeypot.
- `buildMailto(name?, message?)` still takes two unused parameters.

---
