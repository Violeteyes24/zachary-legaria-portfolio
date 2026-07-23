import type { ElementType, ReactNode } from "react";

/**
 * Centered content column matching the design's 1180px max width and fluid
 * horizontal padding (clamp(20px, 5vw, 64px)).
 */
export function Container({
  as: Tag = "div",
  className = "",
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={className}
      style={{
        maxWidth: "1180px",
        marginInline: "auto",
        paddingInline: "clamp(20px, 5vw, 64px)",
      }}
    >
      {children}
    </Tag>
  );
}
