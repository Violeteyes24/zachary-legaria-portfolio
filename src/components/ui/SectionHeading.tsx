import type { ReactNode } from "react";

/** The small uppercase accent kicker used above each section heading. */
export function Kicker({ children }: { children: ReactNode }) {
  return (
    <div className="mb-[14px] flex items-center gap-3">
      <span aria-hidden className="h-px w-[26px] bg-accent-line" />
      <span className="font-heading text-[12.5px] font-semibold uppercase tracking-[0.16em] text-accent-ink">
        {children}
      </span>
    </div>
  );
}

/** Section heading (kicker + h2) with an optional trailing meta note. */
export function SectionHeading({
  kicker,
  title,
  meta,
}: {
  kicker: string;
  title: ReactNode;
  meta?: ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-5">
      <div>
        <Kicker>{kicker}</Kicker>
        <h2
          className="font-heading font-medium tracking-[-0.025em] text-ink"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.05, margin: 0 }}
        >
          {title}
        </h2>
      </div>
      {meta ? (
        <span className="whitespace-nowrap pb-1.5 text-[13px] text-ink-3">{meta}</span>
      ) : null}
    </div>
  );
}
