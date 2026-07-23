import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Kicker } from "@/components/ui/SectionHeading";
import { CoverImage } from "@/components/ui/CoverImage";
import { about, profile, skillGroups } from "@/data/portfolio";

export function About() {
  return (
    <section id="about" className="border-t border-border-soft" style={{ scrollMarginTop: "68px" }}>
      <Container>
        <div
          className="grid grid-cols-1 gap-[clamp(36px,5vw,72px)] min-[881px]:grid-cols-[0.9fr_1.1fr]"
          style={{ padding: "clamp(48px, 7vw, 100px) 0" }}
        >
          {/* Portrait + interests */}
          <Reveal>
            <div
              className="relative overflow-hidden rounded-[16px] border border-border"
              style={{ aspectRatio: "4 / 5", maxWidth: "420px" }}
            >
              <CoverImage
                src={about.portrait}
                alt={`Portrait of ${profile.fullName}`}
                initials={profile.monogram}
                size="lg"
                caption="portrait"
                sizes="(max-width: 880px) 100vw, 420px"
              />
            </div>
            <div className="mt-5 flex max-w-[420px] flex-wrap gap-2">
              {about.interests.map((interest) => (
                <span key={interest} className="chip">
                  {interest}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Bio + skills */}
          <Reveal>
            <div className="mb-4">
              <Kicker>About</Kicker>
            </div>
            <h2
              className="font-heading font-medium text-ink"
              style={{
                margin: 0,
                fontSize: "clamp(1.8rem, 3.4vw, 2.7rem)",
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
                textWrap: "balance",
              }}
            >
              {about.heading}
            </h2>

            {about.paragraphs.map((para, i) => (
              <p
                key={i}
                className="text-ink-2"
                style={{
                  margin: i === 0 ? "22px 0 0" : "14px 0 0",
                  fontSize: "15.5px",
                  lineHeight: 1.7,
                }}
              >
                {para}
              </p>
            ))}

            <div
              className="mt-[22px] rounded-[10px] border border-border px-5 py-[18px]"
              style={{
                borderLeft: "2px solid var(--accent-line)",
                background: "color-mix(in srgb, var(--accent) 5%, transparent)",
              }}
            >
              <p className="m-0 text-[14.5px] leading-[1.65] text-ink-2">{about.callout}</p>
            </div>

            <div
              className="mt-8 grid gap-[26px]"
              style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}
            >
              {skillGroups.map((group) => (
                <div key={group.title}>
                  <div className="mb-[11px] font-heading text-[12px] font-semibold tracking-[0.04em] text-ink">
                    {group.title}
                  </div>
                  <div className="flex flex-col gap-[7px]">
                    {group.items.map((item) => (
                      <span key={item} className="text-[13.5px] leading-[1.4] text-ink-3">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
