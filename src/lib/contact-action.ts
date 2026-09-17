"use server";

import { profile } from "@/data/portfolio";
import {
  validateContact,
  type ContactFields,
  type ContactState,
} from "@/lib/contact-validation";

// NOTE: this module may export NOTHING but async functions. `ContactState` and
// `initialContactState` therefore live in `contact-validation.ts`. Adding a
// non-function export here throws at runtime and still passes `npm run build`.

/** A form filled faster than this was not filled by a person. */
const MIN_ELAPSED_MS = 2000;

/**
 * Handles a contact form submission.
 *
 * Reason: Server Actions are reachable via direct POST, not only through our own
 * UI, so every check here has to assume hostile input and none of it can be
 * skipped on the basis that the form already checked.
 */
export async function sendContactMessage(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot. Reason: report success rather than an error — telling a bot it was
  // caught just teaches whoever wrote it which field to skip next time.
  if (String(formData.get("company") ?? "").trim()) {
    return { status: "success" };
  }

  // Time trap. Reason: the timestamp is set by client JS on mount, so a missing
  // one means JavaScript is off, not that a bot is calling. Only reject when we
  // have a real timestamp AND it is implausibly recent — otherwise no-JS
  // visitors, who we explicitly support, would all be turned away. The honeypot
  // still covers that case.
  const rawStartedAt = formData.get("startedAt");
  const startedAt = Number(rawStartedAt);
  const hasTimestamp = rawStartedAt !== null && rawStartedAt !== "" && Number.isFinite(startedAt);
  if (hasTimestamp && Date.now() - startedAt < MIN_ELAPSED_MS) {
    return {
      status: "error",
      message: "That was submitted a little too quickly. Please try again.",
    };
  }

  const values: ContactFields = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  const errors = validateContact(values);
  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values };
  }

  // Reason: read the key inside the function, not at module scope. A module-level
  // read that throws would fail the production build on any machine without the
  // key set, including CI.
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — contact form cannot send mail.");
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
      // Resend's shared sender works without domain verification, but only
      // delivers to the account owner's own address — which is all we need.
      from: "Portfolio <onboarding@resend.dev>",
      to: profile.email,
      replyTo: values.email,
      subject: `Portfolio inquiry from ${values.name}`,
      text: `From: ${values.name} <${values.email}>\n\n${values.message}`,
    });

    if (error) {
      throw new Error(error.message);
    }

    return { status: "success" };
  } catch (cause) {
    console.error("Contact send failed:", cause);
    return {
      status: "error",
      message: "Something went wrong sending that. Please use the email link below.",
      values,
    };
  }
}
