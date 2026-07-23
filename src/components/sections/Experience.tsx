import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/data/portfolio";

export function Experience() {
  return (
    <section
      id="experience"
      className="border-t border-border-soft"
      style={{ scrollMarginTop: "68px" }}
    >
      <Container>
        <div style={{ padding: "clamp(48px, 7vw, 100px) 0" }}>
          <Reveal className="mb-[clamp(28px,4vw,52px)]">
            <SectionHeading kicker="Experience" title="Where I've worked" />
          </Reveal>

          <ol className="flex list-none flex-col p-0" style={{ margin: 0 }}>
            {experience.map((item) => (
              <li key={`${item.company}-${item.dates}`}>
                <Reveal
                  className="grid grid-cols-1 gap-[clamp(16px,3vw,48px)] border-t border-border-soft min-[881px]:grid-cols-[200px_1fr]"
                  style={{ padding: "clamp(22px, 3vw, 34px) 0" }}
                >
                  <div>
                    <div className="font-heading text-[13px] font-medium leading-[1.4] text-accent-ink">
                      {item.dates}
                    </div>
                    <div className="mt-1 text-[12.5px] text-ink-3">{item.location}</div>
                  </div>
                  <div>
                    <h3
                      className="font-heading font-medium text-ink"
                      style={{ margin: 0, fontSize: "1.35rem", lineHeight: 1.2, letterSpacing: "-0.01em" }}
                    >
                      {item.role}
                    </h3>
                    <div className="mt-1.5 font-heading text-[14px] font-medium text-ink-2">
                      {item.company}
                    </div>
                    <p className="mt-3 max-w-[60ch] text-[14.5px] leading-[1.6] text-ink-3">
                      {item.blurb}
                    </p>
                    <div className="mt-3.5 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span key={tag} className="chip">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
          <div className="border-t border-border-soft" />
        </div>
      </Container>
    </section>
  );
}
