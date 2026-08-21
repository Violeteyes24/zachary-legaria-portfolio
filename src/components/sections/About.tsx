import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CoverImage } from "@/components/ui/CoverImage";
import { about, profile, skillGroups } from "@/data/portfolio";

const principles = [
  ["01", "Find the real constraint", "Start with the problem people actually have, not the feature list."],
  ["02", "Choose reliable tools", "Prefer simple architecture that a team can understand and operate."],
  ["03", "Ship something useful", "Close the loop from idea and interface to deployment and support."],
] as const;

export function About() {
  return (
    <section id="about" className="border-b border-border-soft" style={{ scrollMarginTop: "68px" }}>
      <Container>
        <div className="py-[clamp(64px,9vw,128px)]">
          <Reveal className="mb-[clamp(40px,6vw,72px)]">
            <SectionHeading index="03" kicker="About" title={<>Engineer, lead, and <em className="text-accent-ink">pragmatic builder.</em></>} />
          </Reveal>

          <div className="grid grid-cols-1 gap-[clamp(40px,7vw,90px)] min-[881px]:grid-cols-[0.72fr_1.28fr]">
            <Reveal>
              <figure className="m-0">
                <div className="relative aspect-[4/5] max-w-[420px] overflow-hidden border border-border">
                  <CoverImage src={about.portrait} alt={`Portrait of ${profile.fullName}`} initials={profile.monogram} size="lg" caption="portrait" sizes="(max-width: 880px) 100vw, 420px" />
                </div>
                <figcaption className="mt-4 max-w-[420px] font-mono text-[10px] uppercase leading-[1.55] tracking-[0.09em] text-ink-3">
                  Based in Bohol, Philippines · Building across product, AI, and infrastructure
                </figcaption>
              </figure>
            </Reveal>

            <div>
              <Reveal delay={60}>
                <p className="m-0 max-w-[25ch] font-editorial text-[clamp(2rem,4vw,3.65rem)] leading-[1.06] tracking-[-0.025em] text-ink">{about.heading}</p>
                <div className="mt-7 grid gap-5 min-[721px]:grid-cols-2">
                  {about.paragraphs.map((paragraph) => <p key={paragraph} className="m-0 text-[14.5px] leading-[1.75] text-ink-2">{paragraph}</p>)}
                </div>
              </Reveal>

              <Reveal delay={100} className="mt-10 border-y border-border-soft">
                {principles.map(([number, title, copy]) => (
                  <div key={number} className="grid grid-cols-[42px_1fr] gap-3 border-b border-border-soft py-5 last:border-b-0 min-[721px]:grid-cols-[48px_190px_1fr]">
                    <span className="section-index pt-1">{number}</span>
                    <h3 className="m-0 font-heading text-[13px] font-semibold text-ink">{title}</h3>
                    <p className="col-start-2 m-0 text-[13px] leading-[1.6] text-ink-3 min-[721px]:col-start-3">{copy}</p>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>

          <Reveal delay={100} className="mt-[clamp(52px,8vw,92px)]">
            <div className="mb-5 flex items-center justify-between gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-3">Capability map</span>
              <span className="h-px flex-1 bg-border-soft" aria-hidden />
            </div>
            <div className="grid grid-cols-1 border border-border-soft min-[721px]:grid-cols-2 min-[1080px]:grid-cols-4">
              {skillGroups.map((group, index) => (
                <div key={group.title} className={`p-6 ${index ? "border-t border-border-soft min-[721px]:border-l min-[721px]:border-t-0" : ""} ${index === 2 ? "min-[721px]:border-t min-[1080px]:border-t-0" : ""}`}>
                  <h3 className="m-0 font-editorial text-[1.45rem] font-normal text-ink">{group.title}</h3>
                  <ul className="m-0 mt-5 flex list-none flex-col gap-2.5 p-0">
                    {group.items.map((item) => <li key={item} className="font-mono text-[10.5px] uppercase tracking-[0.06em] text-ink-3">{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
