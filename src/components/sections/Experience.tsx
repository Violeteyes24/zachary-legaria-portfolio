import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/data/portfolio";

export function Experience() {
  return (
    <section id="experience" className="border-b border-border-soft" style={{ scrollMarginTop: "68px" }}>
      <Container>
        <div className="py-[clamp(64px,9vw,128px)]">
          <Reveal className="mb-[clamp(40px,6vw,72px)]">
            <SectionHeading index="04" kicker="Experience" title={<>Work that crossed <em className="text-accent-ink">disciplines.</em></>} />
          </Reveal>

          <ol className="m-0 list-none border-t border-border-soft p-0">
            {experience.map((item, index) => (
              <li key={`${item.company}-${item.dates}`}>
                <Reveal delay={index * 70} className="grid grid-cols-[44px_1fr] gap-x-4 border-b border-border-soft py-[clamp(26px,4vw,44px)] min-[881px]:grid-cols-[72px_220px_1fr] min-[881px]:gap-x-6">
                  <span className="font-editorial text-[1.65rem] italic text-accent-ink">{String(index + 1).padStart(2, "0")}</span>
                  <div className="col-start-2 min-[881px]:col-start-auto">
                    <p className="m-0 font-mono text-[10px] uppercase leading-[1.5] tracking-[0.08em] text-ink-3">{item.dates}</p>
                    <p className="mt-2 font-mono text-[10px] uppercase leading-[1.5] tracking-[0.08em] text-ink-3">{item.location}</p>
                  </div>
                  <div className="col-start-2 mt-5 min-[881px]:col-start-auto min-[881px]:mt-0">
                    <p className="m-0 font-heading text-[11px] font-semibold uppercase tracking-[0.1em] text-accent-ink">{item.company}</p>
                    <h3 className="mb-0 mt-2 font-editorial text-[clamp(1.8rem,3vw,2.7rem)] font-normal leading-[1.05] tracking-[-0.02em] text-ink">{item.role}</h3>
                    <p className="mt-4 max-w-[64ch] text-[14px] leading-[1.75] text-ink-2">{item.blurb}</p>
                    <div className="mt-5 flex flex-wrap gap-2">{item.tags.map((tag) => <span key={tag} className="chip">{tag}</span>)}</div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
