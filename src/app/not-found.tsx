import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <main>
      <Container>
        <div
          className="flex flex-col items-start justify-center"
          style={{ padding: "clamp(80px, 14vw, 180px) 0", minHeight: "60vh" }}
        >
          <div className="font-heading text-[13px] font-semibold uppercase tracking-[0.16em] text-accent-ink">
            404
          </div>
          <h1
            className="mt-4 font-heading font-medium text-ink"
            style={{
              margin: "16px 0 0",
              fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            This page wandered off.
          </h1>
          <p className="mt-4 max-w-[46ch] text-[15.5px] leading-[1.7] text-ink-2">
            The link may be broken or the page may have moved. Let&apos;s get you back to
            something that exists.
          </p>
          <div className="mt-8 flex flex-wrap gap-3.5">
            <Link href="/" className="btn-accent px-6 py-[14px] text-[15px]">
              Back home
            </Link>
            <Link href="/#work" className="btn-outline px-6 py-[14px] text-[15px]">
              View work
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
