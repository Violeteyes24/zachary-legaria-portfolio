"use client";

import { useState, type FormEvent } from "react";
import { buildMailto } from "@/data/portfolio";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * Contact form with client-side validation and an inline success state. It does
 * not post anywhere (the design has no backend); on success it confirms and also
 * exposes a prefilled mailto: as the real delivery path.
 */
export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [sentName, setSentName] = useState("");

  const update = (key: keyof typeof form) => (value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: Errors = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!EMAIL_RE.test(form.email.trim())) next.email = "Enter a valid email address.";
    if (form.message.trim().length < 10) {
      next.message = "A little more detail, please (10+ characters).";
    }
    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }
    setSentName(form.name.trim().split(" ")[0]);
    setSent(true);
    setErrors({});
  };

  const reset = () => {
    setForm({ name: "", email: "", message: "" });
    setErrors({});
    setSent(false);
    setSentName("");
  };

  if (sent) {
    return (
      <div
        className="flex min-h-[320px] flex-col items-start justify-center gap-3.5 rounded-[16px] border border-accent-line p-9"
        style={{ background: "color-mix(in srgb, var(--accent) 6%, transparent)" }}
        role="status"
        aria-live="polite"
      >
        <span
          aria-hidden
          className="grid h-12 w-12 place-items-center rounded-full border border-accent-line text-[22px] text-accent-ink"
        >
          ✓
        </span>
        <h3
          className="font-heading font-medium text-ink"
          style={{ margin: 0, fontSize: "1.5rem", lineHeight: 1.2 }}
        >
          Message sent, thank you!
        </h3>
        <p className="m-0 text-[14.5px] leading-[1.6] text-ink-2">
          Thanks for reaching out, {sentName}. I&apos;ll get back to you at the email you
          provided soon.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-1.5 rounded-[9px] border border-border bg-transparent px-[18px] py-[11px] font-heading text-[14px] font-medium text-ink transition-colors hover:border-accent-line hover:text-accent-ink"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-4 rounded-[16px] border border-border bg-surface p-[clamp(22px,3vw,32px)]"
    >
      <Field
        id="zl-name"
        label="Name"
        type="text"
        placeholder="Your name"
        value={form.name}
        onChange={update("name")}
        error={errors.name}
      />
      <Field
        id="zl-email"
        label="Email"
        type="email"
        placeholder="you@company.com"
        value={form.email}
        onChange={update("email")}
        error={errors.email}
      />
      <div>
        <label
          htmlFor="zl-message"
          className="mb-2 block font-heading text-[13px] font-medium text-ink-2"
        >
          Message
        </label>
        <textarea
          id="zl-message"
          className="field-input"
          rows={5}
          placeholder="What are you working on?"
          value={form.message}
          onChange={(e) => update("message")(e.target.value)}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "zl-message-error" : undefined}
          style={{ resize: "vertical", minHeight: "120px" }}
        />
        {errors.message ? (
          <div id="zl-message-error" className="mt-1.5 text-[12.5px] text-accent-ink">
            {errors.message}
          </div>
        ) : null}
      </div>
      <div className="mt-1 flex flex-wrap items-center gap-3">
        <button type="submit" className="btn-accent px-6 py-[13px] text-[15px]">
          Send message →
        </button>
        <a
          href={buildMailto(form.name, form.message)}
          className="font-heading text-[13.5px] font-medium text-ink-3 transition-colors hover:text-accent-ink"
        >
          or email directly
        </a>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
}: {
  id: string;
  label: string;
  type: "text" | "email";
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-heading text-[13px] font-medium text-ink-2">
        {label}
      </label>
      <input
        id={id}
        className="field-input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error ? (
        <div id={`${id}-error`} className="mt-1.5 text-[12.5px] text-accent-ink">
          {error}
        </div>
      ) : null}
    </div>
  );
}
