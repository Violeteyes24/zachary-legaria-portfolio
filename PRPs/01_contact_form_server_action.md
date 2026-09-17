# PRP 01 — Contact Form via Server Action

## Purpose

Replace the mailto-only call to action in the Contact section with a working contact form that delivers mail, using a Next.js Server Action and Resend.

## Goal

A visitor can submit name, email, and message from the portfolio site. The message arrives at `gmzach024@gmail.com` with the visitor's address as `replyTo`. The form validates server-side, resists basic spam without a CAPTCHA, is keyboard and screen-reader accessible, and works with JavaScript disabled.

## Why

`mailto:` links silently fail on machines with no configured mail client — common on corporate and managed laptops. A recruiter clicks "Email me →" and nothing happens, and that lost lead is invisible to the site owner. This is the site's only conversion path, so it is the highest-value gap.

Secondary: `buildMailto(name?, message?)` at `src/data/portfolio.ts:452` already accepts arguments that no caller passes. The form completes an intent already present in the codebase.

## What

A progressively-enhanced form inside the existing Contact card, matching its editorial design exactly.

### Success Criteria

- [ ] Form with `name`, `email`, `message` renders inside the existing Contact card and matches its visual language
- [ ] Submitting delivers email to `profile.email` with visitor address as `replyTo`
- [ ] Server-side validation returns field-level errors; invalid input never sends mail
- [ ] Honeypot + time-trap reject bot submissions without a CAPTCHA
- [ ] Pending, success, and error states all handled; on error the user's typed message is preserved
- [ ] Form submits with JavaScript disabled
- [ ] `npm run lint` passes
- [ ] `npm run build` passes AND `/` is still listed as prerendered static content
- [ ] `RESEND_API_KEY` absent does not crash dev or build; form shows a friendly error
- [ ] Existing mailto and LinkedIn buttons still present as fallbacks

## All Needed Context

### Documentation & References

```yaml
# MUST READ - local docs describe the INSTALLED version (Next 16.2.11), not training data
- file: node_modules/next/dist/docs/01-app/01-getting-started/07-mutating-data.md
  why: |
    Server Actions/Functions. Confirmed facts from this file:
    - 'use server' at top of an async function, or top of a file for all exports
    - <form action={serverFn}> passes FormData automatically
    - useActionState returns a 3-tuple [state, action, pending]
    - CRITICAL WARNING near line 31: "Server Functions are reachable via direct
      POST requests, not just through your application's UI."
      Treat the action as a public endpoint.

- file: node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md
  why: where the 'use client' boundary belongs

- file: node_modules/next/dist/docs/01-app/01-getting-started/10-error-handling.md
  why: expected vs unexpected error patterns

- url: https://react.dev/reference/react/useActionState
  why: React 19.2.4 is installed. Use useActionState. useFormState from react-dom is deprecated.

- url: https://resend.com/docs/send-with-nextjs
  why: Resend Node SDK usage
```

### Real files to pattern-match

There is no `examples/` folder in this project. Use the real code:

```yaml
- file: src/components/sections/Contact.tsx
  why: |
    THE file being modified. Copy its Container/Reveal/Kicker composition,
    clamp() spacing, and the min-[881px] grid breakpoint. Do not invent new spacing.

- file: src/components/ui/Button.tsx
  why: |
    GOTCHA - this renders <a> or <Link>, NOT <button>. It cannot be the submit
    button. Reuse the .btn-accent CSS CLASS on a real <button type="submit">.

- file: src/app/globals.css
  why: |
    Design tokens (--ink, --ink-2, --ink-3, --accent, --border, --border-soft,
    --surface). Lines 120-137 define .btn-accent/.btn-outline.
    NOTE: no input/textarea styles exist yet - they must be added.
    :focus-visible is already styled globally at line 81; do not override it.

- file: src/components/theme/ThemeProvider.tsx
  why: how 'use client' components are written in this codebase

- file: src/data/portfolio.ts
  why: |
    profile.email and buildMailto() live here. LOAD-BEARING - sitemap, case study
    routes, OG images and JSON-LD all read from it. Edit with care.
```

### Current Codebase tree (relevant subset)

```
src/
├── app/
│   ├── globals.css          # design tokens + component classes
│   ├── layout.tsx
│   └── page.tsx             # static, composes sections
├── components/
│   ├── sections/Contact.tsx # TARGET
│   └── ui/Button.tsx        # link-style button (NOT a <button>)
├── data/portfolio.ts        # profile.email, buildMailto()
└── lib/structured-data.ts
```

### Desired Codebase tree

```
src/
├── app/
│   └── globals.css                    # MODIFIED: add field styles
├── components/
│   └── sections/
│       ├── Contact.tsx                # MODIFIED: render <ContactForm />
│       └── ContactForm.tsx            # NEW: 'use client', useActionState, markup
├── lib/
│   ├── contact-action.ts              # NEW: 'use server', validate + send
│   └── contact-validation.ts          # NEW: pure validators, no deps
└── .env.example                       # NEW: documents RESEND_API_KEY
```

### Known Gotchas of our codebase & Library Quirks

```
# CRITICAL: Button.tsx renders an anchor, not a button. A form submit control
# must be <button type="submit" className="btn-accent ...">. Using <Button> will
# produce a link that does not submit the form.

# CRITICAL: This is Next 16.2.11, NOT 13/14. middleware.ts is now proxy.ts.
# Caching defaults changed. Read the local docs above; do not use remembered patterns.

# CRITICAL: React 19.2.4 - useActionState from 'react' (3-tuple, includes pending).
# NOT useFormState from 'react-dom'.

# CRITICAL: The Server Action is a PUBLIC POST endpoint, reachable directly,
# not only through the form. All validation and spam checks MUST be server-side.
# Client-side checks are UX only and guarantee nothing.

# CRITICAL: This site is 100% static today. The Server Action must not opt `/`
# out of static generation. Verify in `npm run build` output that / is still
# prerendered. Do NOT add `export const dynamic = 'force-dynamic'`.

# GOTCHA: Tailwind v4 - CSS-first config. There is NO tailwind.config.js.

# GOTCHA: NO TEST FRAMEWORK is installed. There is no `npm test` and no
# `npm run type-check` script. Do not write Jest/RTL/Playwright tests and do not
# invoke those scripts - they do not exist. Build is the type-check gate.

# GOTCHA: Prettier is NOT installed. Do not run it or reformat to its style.

# GOTCHA: Resend free tier without a verified domain can send FROM
# 'onboarding@resend.dev' TO the account owner's own address only. That is exactly
# this use case. Do NOT design around a custom sending domain.

# GOTCHA: Dependencies are currently 3 packages. Add ONLY `resend`.
# Hand-roll validation; do not add Zod.
```

## Implementation Blueprint

### TypeScript Types and Interfaces

```ts
// src/lib/contact-validation.ts
export type ContactFields = { name: string; email: string; message: string };
export type FieldErrors = Partial<Record<keyof ContactFields, string>>;

// src/lib/contact-action.ts
export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;                 // form-level message
  errors?: FieldErrors;             // field-level errors
  values?: Partial<ContactFields>;  // echoed back so user does not retype
};
```

### Component Hierarchy & Architecture

```
Contact.tsx                 (Server Component - unchanged shell)
└── ContactForm.tsx         ('use client' - useActionState)
    └── <form action={formAction}>
        ├── name / email / message fields + error text
        ├── honeypot ("company", aria-hidden, tabIndex -1)
        ├── hidden "startedAt" timestamp (time-trap)
        └── <button type="submit" className="btn-accent">
                ↓ invokes
        contact-action.ts   ('use server')
            ├── validateContact()  ← contact-validation.ts
            ├── spam checks (honeypot filled → silent success; elapsed < 2s → reject)
            └── resend.emails.send({ from, to, replyTo, subject, text })
```

### Tasks (in order)

1. **Install dependency**: `npm install resend`
2. **Create `src/lib/contact-validation.ts`** — pure functions, zero imports. `validateContact(fields): FieldErrors`. Rules: name 2–100 chars; email matches a conservative pattern and is ≤ 254 chars; message 10–5000 chars. Trim before validating.
3. **Create `src/lib/contact-action.ts`** — `'use server'` at top of file. Read FormData, run spam checks, validate, then send via Resend. Read `process.env.RESEND_API_KEY` INSIDE the function, not at module scope (a module-scope read plus a throw would break the build when the key is absent).
4. **Create `src/components/sections/ContactForm.tsx`** — `'use client'`, `useActionState`. Render fields, errors, pending state, success state.
5. **Add field styles to `src/app/globals.css`** — `.field-label` / `.field-input` / `.field-error` using existing tokens only. No hardcoded hex.
6. **Wire into `src/components/sections/Contact.tsx`** — render `<ContactForm />` in the left column under the existing copy. Keep all three existing buttons.
7. **Create `.env.example`** documenting `RESEND_API_KEY`.
8. **Update `README.md`** (setup step) and `.claude/PROJECT.md` (the "no backend / no API routes" note becomes false).

### Per-task pseudocode

```ts
// src/lib/contact-action.ts
"use server";

import { validateContact } from "@/lib/contact-validation";
import { profile } from "@/data/portfolio";

const MIN_ELAPSED_MS = 2000;

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // 1. Honeypot - bots fill hidden fields. Return SUCCESS, not an error,
  //    so the bot cannot learn it was detected.
  if (String(formData.get("company") ?? "").trim()) {
    return { status: "success" };
  }

  // 2. Time trap. Missing/garbage startedAt -> treat as bot.
  const startedAt = Number(formData.get("startedAt"));
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_ELAPSED_MS) {
    return { status: "error", message: "That was too quick - please try again." };
  }

  const values = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  // 3. Validate SERVER-SIDE. This action is a public POST endpoint.
  const errors = validateContact(values);
  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values };
  }

  // 4. Read key inside the function so a missing key never breaks the build.
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return {
      status: "error",
      message: "Email is not configured right now. Please use the email link below.",
      values,
    };
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>", // free tier, no domain needed
      to: profile.email,
      replyTo: values.email,                      // reply goes to the visitor
      subject: "Portfolio inquiry from " + values.name,
      text: "From: " + values.name + " <" + values.email + ">\n\n" + values.message,
    });
    if (error) throw new Error(error.message);
    return { status: "success" };
  } catch (err) {
    console.error("Contact send failed:", err);
    return {
      status: "error",
      message: "Could not send. Please use the email link below.",
      values,
    };
  }
}
```

```tsx
// src/components/sections/ContactForm.tsx
"use client";
import { useActionState, useState } from "react";
import { sendContactMessage } from "@/lib/contact-action";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, { status: "idle" });

  // startedAt must be set on the CLIENT at mount. Rendering Date.now() during SSR
  // would bake build time into static HTML and permanently trip the time trap.
  const [startedAt] = useState(() => Date.now());

  if (state.status === "success") return <SuccessPanel />;

  return (
    <form action={formAction} noValidate>
      {/* honeypot: hidden from sighted users AND assistive tech */}
      <input
        name="company"
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
        className="absolute h-0 w-0 opacity-0"
      />
      <input type="hidden" name="startedAt" value={startedAt} />

      {/* fields with <label htmlFor>, aria-describedby, aria-invalid */}
      {/* form-level error in a role="status" aria-live="polite" region */}

      <button type="submit" className="btn-accent px-6 py-[14px] text-[15px]" disabled={pending}>
        {pending ? "Sending…" : "Send message →"}
      </button>
    </form>
  );
}
```

### Integration Points

```yaml
DEPENDENCIES:
  - npm install resend   # the ONLY new package

ENVIRONMENT:
  - .env.local:   RESEND_API_KEY=re_xxx     # gitignored via existing .env* rule
  - .env.example: RESEND_API_KEY=           # committed, documents the requirement
  - Vercel:       add RESEND_API_KEY to project env vars before production deploy

STYLES:
  - src/app/globals.css: add .field-label / .field-input / .field-error near the
    existing .btn-* block (~line 137). Tokens only.

DOCS:
  - .claude/PROJECT.md: revise "no API routes, no database, no client-side fetching"
  - README.md: add RESEND_API_KEY setup step
```

## Validation Loop

> ADAPTED FOR THIS PROJECT. The generic template suggests `npm run type-check` and
> `npm test -- --coverage`. **Neither script exists here.** Do not run them.

### Level 1: Lint

```bash
npm run lint
# Expected: no errors. Read and fix any that appear.
```

### Level 2: Build (this is the type-check gate)

```bash
npm run build
# Expected: build succeeds.
# CRITICAL: confirm `/` still appears as a prerendered/static route in the output.
# If `/` became dynamic, the Server Action was wired wrong - the action belongs in
# its own 'use server' module, imported by a client component. Do not "fix" this
# with force-dynamic.
```

### Level 3: Manual verification

```bash
npm run dev
# 1. Submit empty form         -> three field errors, no mail sent
# 2. Submit invalid email      -> email field error
# 3. Submit valid within 2s    -> time-trap rejection
# 4. Submit valid after 2s     -> success panel; mail arrives (requires RESEND_API_KEY)
# 5. Unset RESEND_API_KEY      -> friendly error, no crash, no stack trace to user
# 6. Tab through the form      -> visible focus, honeypot NOT reachable by keyboard
# 7. Disable JS, submit        -> still works (progressive enhancement)
# 8. Toggle dark/light         -> form matches both themes
```

## Final Validation Checklist

- [ ] `npm run lint` clean
- [ ] `npm run build` clean and `/` still static
- [ ] No hardcoded colors — tokens only
- [ ] `RESEND_API_KEY` never referenced in a client component, never `NEXT_PUBLIC_`
- [ ] Real `.env.local` not committed; `.env.example` is
- [ ] Labels, `aria-live` errors, `aria-invalid`, honeypot hidden from AT
- [ ] mailto + LinkedIn + Résumé buttons still present
- [ ] `.claude/PROJECT.md` and `README.md` updated

## Anti-Patterns to Avoid

- ❌ Don't use `<Button>` as the submit control — it renders an anchor
- ❌ Don't validate only on the client — the action is a public POST endpoint
- ❌ Don't add `force-dynamic` to keep the build quiet
- ❌ Don't add Zod, Jest, RTL, Playwright, or Prettier
- ❌ Don't read `RESEND_API_KEY` at module scope and throw
- ❌ Don't compute `startedAt` during SSR — it would bake in build time
- ❌ Don't tell a bot it was caught — honeypot returns success
- ❌ Don't remove the existing mailto fallback
- ❌ Don't apply Next 13/14 patterns from memory — read the local docs

## Confidence Score

**8.5 / 10** for one-pass success.

Raising it: small surface, all patterns verified against installed source, and the two highest-risk traps (Button-is-an-anchor, SSR timestamp) are called out explicitly.

Lowering it: end-to-end delivery cannot be verified without a real `RESEND_API_KEY`, so the final mail-send step is unverifiable in this pass and must be confirmed by the site owner after adding the key.
