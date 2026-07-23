import { profile, socials } from "@/data/portfolio";
import { Container } from "@/components/ui/Container";
import { Brand } from "./Brand";
import { BackToTop } from "@/components/ui/BackToTop";
import { LiveClock } from "@/components/ui/LiveClock";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-soft">
      <Container>
        <div style={{ padding: "clamp(40px, 5vw, 64px) 0" }}>
          <div className="grid grid-cols-1 items-start gap-8 min-[881px]:grid-cols-[1.4fr_1fr]">
            <div>
              <Brand size="md" />
              <p className="mt-4 max-w-[38ch] text-[14px] leading-[1.6] text-ink-3">
                {profile.footerBlurb}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-heading text-[14px] font-medium text-ink-2 transition-colors hover:text-accent-ink"
                >
                  {s.label} ↗
                </a>
              ))}
              <a
                href={profile.resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-heading text-[14px] font-medium text-ink-2 transition-colors hover:text-accent-ink"
              >
                Résumé ↗
              </a>
            </div>
          </div>

          <div className="mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-border-soft pt-[22px]">
            <span className="text-[12.5px] text-ink-3">
              © {year} {profile.fullName} · {profile.location} · <LiveClock />
            </span>
            <BackToTop />
          </div>
        </div>
      </Container>
    </footer>
  );
}
