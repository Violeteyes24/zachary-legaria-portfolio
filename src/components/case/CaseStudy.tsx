import Link from "next/link";
import type { ReactNode } from "react";
import type { Project } from "@/data/portfolio";
import { projects } from "@/data/portfolio";
import { CoverImage } from "@/components/ui/CoverImage";
import { Tag } from "@/components/ui/Tag";
import { toInitials } from "@/components/ui/PlaceholderVisual";
import { Container } from "@/components/ui/Container";

const chapters = [
  ["overview", "Overview"],
  ["problem", "Problem"],
  ["process", "Process"],
  ["decisions", "Decisions"],
  ["results", "Results"],
  ["lessons", "Lessons"],
] as const;

function Chapter({ id, index, title, children }: { id: string; index: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-border-soft py-[clamp(34px,5vw,58px)]">
      <div className="mb-6 flex items-center gap-3">
        <span className="section-index">{index}</span>
        <h2 className="m-0 font-editorial text-[clamp(2rem,3.5vw,3.25rem)] font-normal leading-none tracking-[-0.025em] text-ink">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function DotList({ items }: { items: string[] }) {
  return (
    <ul className="m-0 flex list-none flex-col gap-3 p-0">
      {items.map((item) => (
        <li key={item} className="relative pl-5 text-[14px] leading-[1.65] text-ink-2">
          <span aria-hidden className="project-dot absolute left-0 top-[0.62em] h-1.5 w-1.5 rounded-full" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function CaseStudy({ project, prev, next }: { project: Project; prev: Project; next: Project }) {
  const projectNumber = projects.findIndex((item) => item.slug === project.slug) + 1;
  const facts = [
    ["Year", project.year],
    ["Role", project.role],
    ["Discipline", project.category],
    ["Core stack", project.tech.slice(0, 2).join(" · ")],
  ];

  return (
    <main className="project-shell" data-accent={project.accent}>
      <Container>
        <article className="pb-[clamp(72px,10vw,130px)] pt-[clamp(34px,5vw,64px)]">
          <Link href="/#work" className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-3 transition-colors hover:text-project">← Selected work</Link>

          <header className="mt-[clamp(34px,6vw,76px)]">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-3">
              <span className="text-project">Project {String(projectNumber).padStart(2, "0")}</span>
              <span aria-hidden className="project-dot h-1 w-1 rounded-full" />
              <span>{project.category}</span><span>{project.year}</span><span>{project.role}</span>
            </div>
            <div className="mt-6 grid gap-8 min-[881px]:grid-cols-[1.15fr_0.85fr] min-[881px]:items-end">
              <h1 className="m-0 max-w-[11ch] font-editorial text-[clamp(3.7rem,8vw,7.8rem)] font-normal leading-[0.86] tracking-[-0.055em] text-ink">{project.name}</h1>
              <div className="min-[881px]:pb-2">
                <p className="m-0 font-editorial text-[clamp(1.45rem,2.6vw,2.15rem)] italic leading-[1.2] text-project">{project.result}</p>
                <p className="mt-5 max-w-[56ch] text-[15px] leading-[1.75] text-ink-2">{project.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">{project.tech.map((tech) => <Tag key={tech}>{tech}</Tag>)}</div>
              </div>
            </div>

            <figure className="m-0 mt-[clamp(36px,6vw,72px)]">
              <div className="project-frame relative aspect-[16/9] overflow-hidden bg-surface">
                <div className="absolute inset-x-0 top-0 z-[3] flex h-10 items-center gap-1.5 border-b border-white/10 bg-[#0b0d12]/80 px-4 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/35" /><span className="h-1.5 w-1.5 rounded-full bg-white/20" /><span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                  <span className="ml-auto font-mono text-[8px] uppercase tracking-[0.1em] text-white/40">{project.name}</span>
                </div>
                <CoverImage src={project.cover} alt={`${project.name} product screenshot`} initials={toInitials(project.name)} priority sizes="(max-width: 1180px) 100vw, 1180px" />
              </div>
              <figcaption className="mt-3 flex flex-wrap justify-between gap-2 font-mono text-[9px] uppercase tracking-[0.09em] text-ink-3"><span>Primary product view</span><span>{project.category} / {project.year}</span></figcaption>
            </figure>
          </header>

          <div className="mt-[clamp(50px,8vw,96px)] grid gap-10 min-[960px]:grid-cols-[190px_1fr] min-[960px]:gap-16">
            <aside className="hidden min-[960px]:block">
              <nav aria-label="Case study chapters" className="sticky top-28 border-t border-border-soft pt-4">
                <p className="mb-4 mt-0 font-mono text-[9px] uppercase tracking-[0.12em] text-ink-3">In this case study</p>
                <ol className="m-0 flex list-none flex-col gap-3 p-0">{chapters.map(([id, label], index) => <li key={id}><a href={`#${id}`} className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.07em] text-ink-3 transition-colors hover:text-ink"><span className="text-project">0{index + 1}</span>{label}</a></li>)}</ol>
              </nav>
            </aside>

            <div className="min-w-0">
              <div className="grid border border-border-soft min-[721px]:grid-cols-4">
                {facts.map(([label, value], index) => (
                  <div key={label} className={`p-5 ${index ? "border-t border-border-soft min-[721px]:border-l min-[721px]:border-t-0" : ""}`}>
                    <p className="m-0 font-mono text-[9px] uppercase tracking-[0.1em] text-ink-3">{label}</p>
                    <p className="mb-0 mt-2 font-heading text-[12.5px] font-semibold leading-[1.45] text-ink">{value}</p>
                  </div>
                ))}
              </div>

              <Chapter id="overview" index="01" title="Overview">
                <p className="m-0 max-w-[68ch] font-editorial text-[clamp(1.45rem,2.5vw,2rem)] leading-[1.45] text-ink-2">{project.overview}</p>
                <div className="mt-9 grid gap-8 min-[721px]:grid-cols-2"><div><h3 className="mb-4 mt-0 font-mono text-[10px] uppercase tracking-[0.1em] text-project">My role</h3><DotList items={project.responsibilities} /></div><div><h3 className="mb-4 mt-0 font-mono text-[10px] uppercase tracking-[0.1em] text-project">Constraints</h3><DotList items={project.constraints} /></div></div>
              </Chapter>

              <Chapter id="problem" index="02" title="Problem & opportunity">
                <p className="m-0 max-w-[68ch] text-[16px] leading-[1.85] text-ink-2">{project.problem}</p>
              </Chapter>

              <Chapter id="process" index="03" title="Process">
                <ol className="m-0 list-none border-t border-border-soft p-0">{project.process.map((step, index) => <li key={step} className="grid grid-cols-[44px_1fr] gap-3 border-b border-border-soft py-5"><span className="font-editorial text-[1.25rem] italic text-project">{String(index + 1).padStart(2, "0")}</span><span className="text-[14px] leading-[1.7] text-ink-2">{step}</span></li>)}</ol>
              </Chapter>

              <Chapter id="decisions" index="04" title="Key decisions">
                <div className="grid gap-4">{project.decisions.map((decision, index) => <blockquote key={decision} className="m-0 border-l-2 border-[var(--project-accent)] bg-surface px-5 py-5"><span className="font-mono text-[9px] uppercase tracking-[0.1em] text-project">Decision {String(index + 1).padStart(2, "0")}</span><p className="mb-0 mt-3 font-editorial text-[clamp(1.25rem,2vw,1.65rem)] leading-[1.4] text-ink">{decision}</p></blockquote>)}</div>
                <div className="mt-8"><h3 className="mb-3 mt-0 font-mono text-[10px] uppercase tracking-[0.1em] text-project">Final solution</h3><p className="m-0 text-[15px] leading-[1.8] text-ink-2">{project.solution}</p></div>
              </Chapter>

              <Chapter id="results" index="05" title="Results">
                <div className="border border-[var(--project-accent)] bg-surface p-[clamp(22px,4vw,42px)]">
                  <p className="m-0 font-mono text-[9px] uppercase tracking-[0.12em] text-project">Evidence from the build</p>
                  <div className="mt-6 grid gap-6 min-[721px]:grid-cols-2">{project.results.map((result, index) => <div key={result} className="flex gap-4"><span className="font-editorial text-[1.35rem] italic text-project">0{index + 1}</span><p className="m-0 text-[14px] leading-[1.65] text-ink-2">{result}</p></div>)}</div>
                </div>
              </Chapter>

              <Chapter id="lessons" index="06" title="Lessons learned">
                <p className="m-0 max-w-[68ch] font-editorial text-[clamp(1.45rem,2.5vw,2rem)] leading-[1.5] text-ink-2">{project.lessons}</p>
              </Chapter>
            </div>
          </div>

          <nav aria-label="More projects" className="mt-8 grid grid-cols-1 border-y border-border-soft min-[721px]:grid-cols-2">
            <Link href={`/work/${prev.slug}`} className="group p-6 transition-colors hover:bg-surface min-[721px]:border-r min-[721px]:border-border-soft"><span className="font-mono text-[9px] uppercase tracking-[0.1em] text-ink-3">← Previous project</span><span className="mt-3 block font-editorial text-[1.65rem] leading-none text-ink group-hover:text-project">{prev.name}</span></Link>
            <Link href={`/work/${next.slug}`} className="group border-t border-border-soft p-6 text-right transition-colors hover:bg-surface min-[721px]:border-t-0"><span className="font-mono text-[9px] uppercase tracking-[0.1em] text-ink-3">Next project →</span><span className="mt-3 block font-editorial text-[1.65rem] leading-none text-ink group-hover:text-project">{next.name}</span></Link>
          </nav>
        </article>
      </Container>
    </main>
  );
}
