import Image from "next/image";
import { PlaceholderVisual } from "./PlaceholderVisual";

/**
 * Renders a real image with next/image when `src` is provided, otherwise falls
 * back to the branded placeholder. Fills its positioned parent (the parent owns
 * aspect-ratio / border / radius), so swapping a placeholder for a photo is just
 * a matter of setting the `src`.
 */
export function CoverImage({
  src,
  alt,
  initials,
  caption,
  size,
  priority,
  sizes = "(max-width: 880px) 100vw, 50vw",
}: {
  /** Path under /public (e.g. "/projects/doc-qa.png") or a remote URL. */
  src?: string;
  alt: string;
  initials: string;
  caption?: string;
  size?: "sm" | "md" | "lg";
  priority?: boolean;
  sizes?: string;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    );
  }
  return <PlaceholderVisual initials={initials} caption={caption} size={size} />;
}
