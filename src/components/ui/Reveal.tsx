"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

export function Reveal({
  className = "",
  style,
  delay = 0,
  eager = false,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  delay?: number;
  /** Render immediately for above-the-fold content so the first viewport never waits on JavaScript. */
  eager?: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(eager);

  useEffect(() => {
    const node = ref.current;
    if (!node || eager) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [eager]);

  const revealStyle = {
    ...style,
    "--reveal-delay": `${delay}ms`,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={revealStyle}
    >
      {children}
    </div>
  );
}
