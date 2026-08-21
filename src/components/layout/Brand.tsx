import Link from "next/link";
import { profile } from "@/data/portfolio";

export function Brand({ size = "sm" }: { size?: "sm" | "md" }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-3" aria-label={`${profile.fullName}, home`}>
      <span aria-hidden className={`${size === "md" ? "h-11 w-11 text-[14px]" : "h-8 w-8 text-[11px]"} grid place-items-center border border-accent-line font-heading font-bold tracking-[0.08em] text-accent-ink transition-colors group-hover:bg-accent group-hover:text-[#0b0d12]`}>
        {profile.monogram}
      </span>
      <span className="flex flex-col">
        <span className={`${size === "md" ? "text-[15px]" : "text-[12px]"} font-heading font-semibold uppercase tracking-[0.08em] text-ink`}>{profile.name}</span>
        <span className="mt-1 hidden font-mono text-[8px] uppercase tracking-[0.11em] text-ink-3 min-[520px]:block">Full-stack + applied AI</span>
      </span>
    </Link>
  );
}
