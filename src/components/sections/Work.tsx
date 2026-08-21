import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/data/portfolio";

export function Work() {
  const [spotlight, second, third, ...compact] = projects;
  return (
    <section id="work" className="border-b border-border-soft" style={{ scrollMarginTop: "68px" }}>
      <Container>
        <div className="py-[clamp(64px,9vw,128px)]">
          <Reveal className="mb-[clamp(40px,6vw,72px)]">
            <SectionHeading index="02" kicker="Selected work" title={<>Built for the <em className="text-accent-ink">real world.</em></>} meta={`${projects.length} documented projects`} />
          </Reveal>
          <Reveal delay={60}><ProjectCard project={spotlight} variant="spotlight" index={1} /></Reveal>
          <Reveal delay={80}><ProjectCard project={second} variant="feature" index={2} /></Reveal>
          <Reveal delay={80}><ProjectCard project={third} variant="feature" index={3} reverse /></Reveal>
          <div className="grid grid-cols-1 gap-5 border-t border-border-soft pt-[clamp(28px,5vw,64px)] min-[721px]:grid-cols-2">
            {compact.map((project, index) => (
              <Reveal key={project.slug} delay={index * 70} className="h-full">
                <ProjectCard project={project} variant="compact" index={index + 4} />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
