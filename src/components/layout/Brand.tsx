import Image from "next/image";
import Link from "next/link";
import { profile } from "@/data/portfolio";

/** The avatar (or "ZL" monogram) + name lockup, linking home. */
export function Brand({ size = "sm" }: { size?: "sm" | "md" }) {
  const nameSize = size === "md" ? "text-[16px]" : "text-[15px]";
  const label = size === "md" ? profile.fullName : profile.name;

  return (
    <Link
      href="/"
      className="flex items-center gap-2.5"
      aria-label={`${profile.fullName}, home`}
    >
      {profile.avatar ? (
        <span
          aria-hidden
          className="relative block h-[34px] w-[34px] overflow-hidden rounded-[9px] border border-accent-line"
        >
          <Image src={profile.avatar} alt="" fill sizes="34px" className="object-cover" />
        </span>
      ) : (
        <span
          aria-hidden
          className="grid h-[34px] w-[34px] place-items-center rounded-[9px] border border-accent-line font-heading text-[14px] font-semibold tracking-[0.02em] text-accent-ink"
        >
          {profile.monogram}
        </span>
      )}
      <span className={`font-heading ${nameSize} font-medium tracking-[-0.01em] text-ink`}>
        {label}
      </span>
    </Link>
  );
}
