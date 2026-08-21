import Link from "next/link";
import type { Project } from "@/data/portfolio";
import { toInitials } from "./PlaceholderVisual";
import { CoverImage } from "./CoverImage";
import { Tag } from "./Tag";

type Variant = "spotlight" | "feature" | "compact";

function ProjectWindow({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <div className="project-frame h-full min-h-[260px] rounded-[2px]">
      <div className="absolute inset-x-0 top-0 z-[3] flex h-9 items-center gap-1.5 border-b border-white/10 bg-[#0b0d12]/80 px-3 backdrop-blur-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        <span className="ml-auto font-mono text-[8px] uppercase tracking-[0.1em] text-white/40">Product view</span>
      </div>
      <CoverImage
        src={project.cover}
        alt={`${project.name} product screenshot`}
        initials={toInitials(project.name)}
        priority={priority}
        sizes="(max-width: 880px) 100vw, 62vw"
      />
    </div>
  );
}

function ProjectMeta({ project, index }: { project: Project; index: number }) {
  return (
    <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-[0.09em] text-ink-3">
      <span className="text-project">{String(index).padStart(2, "0")}</span>
      <span aria-hidden className="project-dot h-1 w-1 rounded-full" />
      <span>{project.category}</span>
      <span>{project.year}</span>
      <span>{project.role}</span>
    </div>
  );
}

export function ProjectCard({
  project,
  variant,
  index,
  reverse = false,
}: {
  project: Project;
  variant: Variant;
  index: number;
  reverse?: boolean;
}) {
  if (variant === "spotlight") {
    return (
      <Link
        href={`/work/${project.slug}`}
        aria-label={`${project.name}, read case study`}
        className="project-shell card-lift group grid overflow-hidden border border-border bg-surface min-[881px]:grid-cols-[1.2fr_0.8fr]"
        data-accent={project.accent}
      >
        <div className="min-h-[330px] p-3 min-[881px]:min-h-[510px] min-[881px]:p-5">
          <ProjectWindow project={project} priority />
        </div>
        <div className="flex flex-col justify-between border-t border-border-soft p-[clamp(24px,4vw,48px)] min-[881px]:border-l min-[881px]:border-t-0">
          <div>
            <ProjectMeta project={project} index={index} />
            <h3 className="m-0 font-editorial text-[clamp(2.2rem,4vw,4rem)] font-normal leading-[0.96] tracking-[-0.035em] text-ink">
              {project.name}
            </h3>
            <p className="mt-5 font-editorial text-[1.3rem] italic leading-[1.35] text-project">{project.result}</p>
            <p className="mt-5 text-[14px] leading-[1.7] text-ink-2">{project.summary}</p>
          </div>
          <div className="mt-8">
            <div className="flex flex-wrap gap-2">{project.tech.slice(0, 4).map((tech) => <Tag key={tech}>{tech}</Tag>)}</div>
            <span className="mt-7 inline-flex items-center gap-3 font-heading text-[12px] font-semibold uppercase tracking-[0.08em] text-ink">
              Read case study <span className="text-project transition-transform group-hover:translate-x-1">→</span>
            </span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "feature") {
    return (
      <Link
        href={`/work/${project.slug}`}
        aria-label={`${project.name}, read case study`}
        className="project-shell group grid items-stretch border-t border-border-soft py-[clamp(28px,5vw,64px)] min-[881px]:grid-cols-2 min-[881px]:gap-14"
        data-accent={project.accent}
      >
        <div className={`min-h-[300px] ${reverse ? "min-[881px]:order-2" : ""}`}>
          <ProjectWindow project={project} />
        </div>
        <div className={`flex flex-col justify-center py-7 min-[881px]:py-4 ${reverse ? "min-[881px]:order-1" : ""}`}>
          <ProjectMeta project={project} index={index} />
          <h3 className="m-0 max-w-[12ch] font-editorial text-[clamp(2.25rem,4.2vw,4.25rem)] font-normal leading-[0.96] tracking-[-0.035em] text-ink">{project.name}</h3>
          <p className="mt-4 font-editorial text-[1.2rem] italic leading-[1.4] text-project">{project.result}</p>
          <p className="mt-4 max-w-[52ch] text-[14px] leading-[1.7] text-ink-2">{project.summary}</p>
          <p className="mt-5 border-l border-[var(--project-accent)] pl-4 text-[12.5px] leading-[1.6] text-ink-3">{project.results[0]}</p>
          <span className="mt-7 inline-flex items-center gap-3 font-heading text-[12px] font-semibold uppercase tracking-[0.08em] text-ink">Explore project <span className="text-project transition-transform group-hover:translate-x-1">→</span></span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/work/${project.slug}`}
      aria-label={`${project.name}, read case study`}
      className="project-shell card-lift group flex h-full flex-col border border-border bg-surface p-3"
      data-accent={project.accent}
    >
      <div className="aspect-[16/10] min-h-0"><ProjectWindow project={project} /></div>
      <div className="flex flex-1 flex-col px-3 pb-4 pt-6 min-[721px]:px-5 min-[721px]:pb-6">
        <ProjectMeta project={project} index={index} />
        <h3 className="m-0 font-editorial text-[clamp(1.8rem,3vw,2.55rem)] font-normal leading-none tracking-[-0.025em] text-ink">{project.name}</h3>
        <p className="mt-3 flex-1 text-[13.5px] leading-[1.65] text-ink-2">{project.result}</p>
        <span className="mt-5 inline-flex items-center gap-3 font-heading text-[11px] font-semibold uppercase tracking-[0.08em] text-ink">Case study <span className="text-project transition-transform group-hover:translate-x-1">→</span></span>
      </div>
    </Link>
  );
}
