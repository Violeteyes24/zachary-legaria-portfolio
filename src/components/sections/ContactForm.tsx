"use client";

import { useActionState, useEffect, useRef } from "react";
import { sendContactMessage } from "@/lib/contact-action";
import { initialContactState, LIMITS } from "@/lib/contact-validation";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    initialContactState,
  );

  // Reason: written straight into the DOM node on mount rather than held in
  // state. A timestamp rendered on the server would be baked into the
  // prerendered HTML at build time and would mismatch on hydration, and holding
  // it in state would trigger a cascading render for a value nothing displays.
  // Empty until mounted is fine — the action treats a missing timestamp as
  // "JavaScript is off", not as a bot.
  const startedAtRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (startedAtRef.current) startedAtRef.current.value = String(Date.now());
  }, []);

  const statusRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (state.status === "error" && state.message) statusRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="mt-10 border border-border-soft bg-surface-2 px-6 py-7"
      >
        <p className="m-0 font-editorial text-[1.5rem] leading-tight text-ink">
          Thanks — that&apos;s sent.
        </p>
        <p className="m-0 mt-2 text-[14px] leading-[1.7] text-ink-2">
          I usually reply within one working day.
        </p>
      </div>
    );
  }

  const errors = state.errors ?? {};
  const values = state.values ?? {};

  return (
    <form action={formAction} noValidate className="mt-10 grid gap-5">
      {/* Honeypot. Hidden from sighted users and from assistive tech. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="company">Company (leave this empty)</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <input ref={startedAtRef} type="hidden" name="startedAt" defaultValue="" />

      <div className="grid gap-5 min-[560px]:grid-cols-2">
        <Field
          id="name"
          label="Name"
          error={errors.name}
          defaultValue={values.name}
          autoComplete="name"
          maxLength={LIMITS.nameMax}
        />
        <Field
          id="email"
          label="Email"
          type="email"
          error={errors.email}
          defaultValue={values.email}
          autoComplete="email"
          maxLength={LIMITS.emailMax}
        />
      </div>

      <Field
        id="message"
        label="Message"
        as="textarea"
        error={errors.message}
        defaultValue={values.message}
        maxLength={LIMITS.messageMax}
      />

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="btn-accent px-6 py-[14px] text-[15px] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send message →"}
        </button>
        {state.status === "error" && state.message ? (
          <p
            ref={statusRef}
            tabIndex={-1}
            role="status"
            aria-live="polite"
            className="m-0 text-[13px] leading-[1.6] text-accent-ink"
          >
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  as = "input",
  ...rest
}: {
  id: "name" | "email" | "message";
  label: string;
  error?: string;
  as?: "input" | "textarea";
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const errorId = `${id}-error`;
  const shared = {
    id,
    name: id,
    required: true,
    "aria-invalid": error ? (true as const) : undefined,
    "aria-describedby": error ? errorId : undefined,
    className: "field-input",
  };

  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      {as === "textarea" ? (
        <textarea
          {...shared}
          rows={5}
          {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          {...shared}
          {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {error ? (
        <p id={errorId} role="status" aria-live="polite" className="field-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
