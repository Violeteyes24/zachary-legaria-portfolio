/**
 * Pure validators for the contact form.
 *
 * Deliberately dependency-free so the same rules can run anywhere. The Server
 * Action is reachable by direct POST, not just through the form, so these checks
 * are the real gate — anything on the client is presentation only.
 */

export type ContactFields = {
  name: string;
  email: string;
  message: string;
};

export type FieldErrors = Partial<Record<keyof ContactFields, string>>;

/**
 * Result of a submission, shared between the Server Action and the form.
 *
 * Reason: this lives here, not in `contact-action.ts`, because a `"use server"`
 * module may only export async functions. Exporting the object below from there
 * throws "A 'use server' file can only export async functions, found object" at
 * runtime — and it does NOT fail `npm run build`, so do not move it back.
 */
export type ContactState = {
  /** Form-level message, shown beside the submit button. */
  status: "idle" | "success" | "error";
  message?: string;
  errors?: FieldErrors;
  /** Echoed back on failure so the visitor never retypes their message. */
  values?: Partial<ContactFields>;
};

export const initialContactState: ContactState = { status: "idle" };

export const LIMITS = {
  nameMin: 2,
  nameMax: 100,
  emailMax: 254,
  messageMin: 10,
  messageMax: 5000,
} as const;

/**
 * Conservative address check. Deliberately not RFC 5322 — that pattern is
 * famously unreadable and still accepts addresses that bounce. The real
 * validation is whether a reply reaches them.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

export function validateContact(fields: ContactFields): FieldErrors {
  const errors: FieldErrors = {};

  const name = fields.name.trim();
  if (name.length < LIMITS.nameMin) {
    errors.name = "Please enter your name.";
  } else if (name.length > LIMITS.nameMax) {
    errors.name = `Name must be under ${LIMITS.nameMax} characters.`;
  }

  const email = fields.email.trim();
  if (!email) {
    errors.email = "Please enter your email.";
  } else if (email.length > LIMITS.emailMax || !EMAIL_PATTERN.test(email)) {
    errors.email = "That does not look like a valid email address.";
  }

  const message = fields.message.trim();
  if (message.length < LIMITS.messageMin) {
    errors.message = `Please write at least ${LIMITS.messageMin} characters.`;
  } else if (message.length > LIMITS.messageMax) {
    errors.message = `Message must be under ${LIMITS.messageMax} characters.`;
  }

  return errors;
}
