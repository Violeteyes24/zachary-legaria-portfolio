import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "accent" | "outline";

const variantClass: Record<Variant, string> = {
  accent: "btn-accent",
  outline: "btn-outline",
};

function isExternal(href: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(href);
}

/**
 * Shared link-style button. Internal hrefs (starting with "/" or "#") render as
 * a Next.js <Link>; external / protocol hrefs render as an anchor that opens in
 * a new tab. Padding is applied here so callers only pick a variant.
 */
export function Button({
  href,
  variant = "accent",
  className = "",
  children,
  ...rest
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const classes = `${variantClass[variant]} px-6 py-[14px] text-[15px] ${className}`.trim();

  if (isExternal(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
