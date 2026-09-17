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
