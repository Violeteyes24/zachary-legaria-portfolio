import type { ReactNode } from "react";

export function Kicker({ children, index }: { children: ReactNode; index?: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      {index ? <span className="section-index">{index}</span> : null}
      <span aria-hidden className="h-px w-7 bg-accent-line" />
      <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-3">
        {children}
      </span>
    </div>
  );
}

export function SectionHeading({
  kicker,
  title,
  meta,
  index,
}: {
  kicker: string;
  title: ReactNode;
  meta?: ReactNode;
  index?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-5">
      <div>
        <Kicker index={index}>{kicker}</Kicker>
        <h2 className="m-0 max-w-[16ch] font-editorial text-[clamp(2.5rem,5vw,4.6rem)] font-normal leading-[0.98] tracking-[-0.035em] text-ink">
          {title}
        </h2>
      </div>
      {meta ? (
        <span className="hidden whitespace-nowrap pb-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3 min-[721px]:block">
          {meta}
        </span>
      ) : null}
    </div>
  );
}
