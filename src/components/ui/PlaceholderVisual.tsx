/**
 * Branded placeholder that stands in for imagery. The Claude Design source ships
 * empty image slots (no real screenshots), so rather than fake photos we render
 * an on-brand gradient panel with the subject's initials, preserving every
 * frame's aspect ratio, border, and dark aesthetic.
 *
 * Fills its positioned parent (the parent owns aspect-ratio / border / radius).
 */
export function PlaceholderVisual({
  initials,
  caption,
  size = "md",
}: {
  initials: string;
  caption?: string;
  /** Controls the monogram scale relative to the frame. */
  size?: "sm" | "md" | "lg";
}) {
  const monogramSize =
    size === "lg"
      ? "clamp(3rem, 9vw, 6rem)"
      : size === "sm"
        ? "clamp(1.6rem, 5vw, 2.4rem)"
        : "clamp(2.2rem, 6vw, 3.4rem)";

  return (
    <div
      aria-hidden
      className="absolute inset-0 grid place-items-center overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 120% at 30% 20%, var(--surface-2), var(--surface) 70%)",
      }}
    >
      {/* subtle concentric guide rings echoing the hero orb */}
      <span
        className="pointer-events-none absolute rounded-full border"
        style={{ inset: "14%", borderColor: "var(--border-soft)" }}
      />
      <span
        className="pointer-events-none absolute rounded-full border"
        style={{ inset: "30%", borderColor: "var(--border-soft)" }}
      />
      <span
        className="font-heading font-medium"
        style={{
          fontSize: monogramSize,
          lineHeight: 1,
          letterSpacing: "0.04em",
          color: "var(--accent-ink)",
          opacity: 0.85,
        }}
      >
        {initials}
      </span>
      {caption ? (
        <span
          className="absolute bottom-3 left-4 font-mono text-[10.5px]"
          style={{ color: "var(--ink-3)" }}
        >
          {caption}
        </span>
      ) : null}
    </div>
  );
}

/** Derive up-to-two-letter initials from a title. */
export function toInitials(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}
