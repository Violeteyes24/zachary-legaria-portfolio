import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PulseDot } from "@/components/ui/PulseDot";
import { profile, socials, stats } from "@/data/portfolio";

export function Hero() {
  return (
    <section id="top" style={{ scrollMarginTop: "80px" }}>
      <Container>
        <div
          style={{
            padding:
              "clamp(48px, 9vw, 110px) 0 clamp(40px, 6vw, 80px)",
          }}
        >
          <div className="grid grid-cols-1 items-center gap-[clamp(32px,5vw,64px)] min-[881px]:grid-cols-[1.25fr_0.9fr]">
            {/* Text column */}
            <div>
              <Reveal className="mb-[26px] inline-flex items-center gap-2.5 rounded-full border border-border px-[13px] py-[7px]">
                <PulseDot />
                <span className="font-heading text-[12.5px] font-medium tracking-[0.02em] text-ink-2">
                  {profile.availability}
                </span>
              </Reveal>

              <Reveal>
                <h1
                  className="font-heading font-medium text-ink"
                  style={{
                    margin: 0,
                    fontSize: "clamp(2.9rem, 7vw, 5.6rem)",
                    lineHeight: 0.98,
                    letterSpacing: "-0.03em",
                    textWrap: "balance",
                  }}
                >
                  {profile.headline.map((part, i) => (
                    <span
                      key={i}
                      style={part.accent ? { color: "var(--accent-ink)" } : undefined}
                    >
                      {part.text}
                    </span>
                  ))}
                </h1>
              </Reveal>

              <Reveal>
                <p
                  className="text-ink-2"
                  style={{
                    margin: "26px 0 0",
                    maxWidth: "46ch",
                    fontSize: "clamp(1rem, 1.5vw, 1.18rem)",
                    lineHeight: 1.6,
                    textWrap: "pretty",
                  }}
                >
                  {profile.tagline}
                </p>
              </Reveal>

              <Reveal>
                <p
                  className="text-ink-3"
                  style={{
                    margin: "16px 0 0",
                    maxWidth: "52ch",
                    fontSize: "15px",
                    lineHeight: 1.65,
                  }}
                >
                  {profile.heroSubtext}
                </p>
              </Reveal>

              <Reveal className="mt-[34px] flex flex-wrap gap-3.5">
                <Button href="/#work" variant="accent">
                  View selected work →
                </Button>
                <Button href="/#contact" variant="outline">
                  Contact me
                </Button>
              </Reveal>

              <Reveal className="mt-[34px] flex items-center gap-5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-heading text-[13.5px] font-medium text-ink-3 transition-colors hover:text-accent-ink"
                  >
                    {s.label} ↗
                  </a>
                ))}
              </Reveal>
            </div>

            {/* Animated orb visual */}
            <Reveal className="order-first min-[881px]:order-none">
              <HeroVisual />
            </Reveal>
          </div>

          {/* Stats */}
          <Reveal
            className="mt-[clamp(48px,7vw,90px)] grid gap-px overflow-hidden rounded-[14px] border border-border-soft bg-border-soft"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="bg-bg px-5 py-[22px]">
                <div
                  className="font-heading font-medium text-ink"
                  style={{
                    fontSize: "clamp(1.7rem, 3vw, 2.3rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {stat.value}
                </div>
                <div className="mt-[7px] text-[12.5px] leading-[1.4] text-ink-3">
                  {stat.label}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/** Decorative animated ring / orb figure from the hero. */
function HeroVisual() {
  return (
    <div
      aria-hidden
      className="relative grid place-items-center"
      style={{ aspectRatio: "1 / 1" }}
    >
      <span
        className="absolute rounded-full border"
        style={{ inset: "8%", borderColor: "var(--border-soft)" }}
      />
      <span
        className="absolute rounded-full border"
        style={{ inset: "22%", borderColor: "var(--border-soft)" }}
      />
      <span
        className="anim-ring absolute rounded-full border border-accent-line"
        style={{ inset: "8%" }}
      />
      <span
        className="anim-ring absolute rounded-full border border-accent-line"
        style={{ inset: "8%", animationDelay: "1.3s" }}
      />
      <span
        className="anim-ring absolute rounded-full border border-accent-line"
        style={{ inset: "8%", animationDelay: "2.6s" }}
      />
      <div
        className="anim-drift relative grid place-items-center rounded-full"
        style={{
          width: "58%",
          aspectRatio: "1 / 1",
          background:
            "radial-gradient(circle at 35% 30%, var(--surface-2), var(--surface))",
          boxShadow: "var(--shadow)",
        }}
      >
        <span
          className="font-heading font-medium text-accent-ink"
          style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)", lineHeight: 1, letterSpacing: "0.04em" }}
        >
          {profile.monogram}
        </span>
      </div>
      <div
        className="absolute bottom-[2%] left-0 font-mono text-[11px] leading-[1.5] text-ink-3"
      >
        lat {profile.coordinates.lat} · lon {profile.coordinates.lon}
        <br />
        status: online
      </div>
    </div>
  );
}
