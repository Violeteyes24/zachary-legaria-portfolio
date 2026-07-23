import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeaturedProjectCard, ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/data/portfolio";

export function Work() {
  const [featured, ...rest] = projects;

  return (
    <section id="work" style={{ scrollMarginTop: "68px" }}>
      <Container>
        <div style={{ padding: "clamp(40px, 7vw, 90px) 0" }}>
          <Reveal className="mb-[clamp(28px,4vw,48px)]">
            <SectionHeading
              kicker="Selected Work"
              title="Things I've designed & shipped"
              meta={`${projects.length} projects`}
            />
          </Reveal>

          <Reveal>
            <FeaturedProjectCard project={featured} />
          </Reveal>

          <div
            className="mt-6 grid gap-6"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}
          >
            {rest.map((project) => (
              <Reveal key={project.slug} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
