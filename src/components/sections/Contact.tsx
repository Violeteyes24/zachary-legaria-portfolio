import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Kicker } from "@/components/ui/SectionHeading";
import { PulseDot } from "@/components/ui/PulseDot";
import { LiveClock } from "@/components/ui/LiveClock";
import { ContactForm } from "./ContactForm";
import { buildMailto, profile, socials } from "@/data/portfolio";

export function Contact() {
  return (
    <section id="contact" className="border-t border-border-soft" style={{ scrollMarginTop: "68px" }}>
      <Container>
        <div
          className="grid grid-cols-1 gap-[clamp(36px,5vw,72px)] min-[881px]:grid-cols-2"
          style={{ padding: "clamp(48px, 7vw, 100px) 0" }}
        >
          {/* Info column */}
          <Reveal>
            <div className="mb-4">
              <Kicker>Contact</Kicker>
            </div>
            <h2
              className="font-heading font-medium text-ink"
              style={{
                margin: 0,
                fontSize: "clamp(2rem, 4vw, 3.1rem)",
                lineHeight: 1.04,
                letterSpacing: "-0.025em",
                textWrap: "balance",
              }}
            >
              Let&apos;s build something worth shipping.
            </h2>
            <p className="mt-5 max-w-[44ch] text-[15.5px] leading-[1.7] text-ink-2">
              Open to remote roles and collaborations. Tell me about the problem you&apos;re
              solving, and I usually reply within a day.
            </p>

            <div className="mt-[30px] flex flex-col gap-3.5">
              <a
                href={buildMailto()}
                className="inline-flex items-center gap-2.5 font-heading text-[16px] font-medium leading-[1.3] text-ink transition-colors hover:text-accent-ink"
              >
                <span aria-hidden className="text-accent-ink">
                  ✦
                </span>
                {profile.email}
              </a>
              <div className="mt-1 flex flex-wrap gap-[18px]">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-heading text-[14px] font-medium text-ink-3 transition-colors hover:text-accent-ink"
                  >
                    {s.label} ↗
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-border px-3.5 py-2">
              <PulseDot />
              <span className="font-heading text-[12.5px] font-medium text-ink-2">
                {profile.availability} · <LiveClock />
              </span>
            </div>
          </Reveal>

          {/* Form column */}
          <Reveal>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
