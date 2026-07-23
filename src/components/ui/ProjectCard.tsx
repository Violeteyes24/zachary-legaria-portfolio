import Link from "next/link";
import type { Project } from "@/data/portfolio";
import { toInitials } from "./PlaceholderVisual";
import { CoverImage } from "./CoverImage";
import { Tag } from "./Tag";

/** Large featured project card (first project in the list). */
export function FeaturedProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      aria-label={`${project.name}, read case study`}
      className="card-lift grid grid-cols-1 overflow-hidden rounded-[16px] border border-border bg-surface min-[881px]:grid-cols-[1.05fr_0.95fr]"
    >
      <div className="relative min-h-[300px] border-b border-border min-[881px]:border-b-0 min-[881px]:border-r">
        <CoverImage
          src={project.cover}
          alt={`${project.name} cover`}
          initials={toInitials(project.name)}
          caption="cover image"
        />
        <span
          className="absolute left-4 top-4 rounded-full px-[11px] py-[5px] font-heading text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-ink"
          style={{
            background: "color-mix(in srgb, var(--bg) 72%, transparent)",
            backdropFilter: "blur(6px)",
          }}
        >
          Featured
        </span>
      </div>
      <div className="flex flex-col p-[clamp(24px,3vw,40px)]">
        <div className="mb-3.5 flex gap-3.5 text-[12.5px] text-ink-3">
          <span>{project.category}</span>
          <span aria-hidden>·</span>
          <span>{project.year}</span>
          <span aria-hidden>·</span>
          <span>{project.role}</span>
        </div>
        <h3
          className="font-heading font-medium text-ink"
          style={{
            margin: 0,
            fontSize: "clamp(1.5rem, 2.6vw, 2.1rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          {project.name}
        </h3>
        <p className="mt-3.5 flex-1 text-[15px] leading-[1.6] text-ink-2">
          {project.summary}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <span className="mt-[22px] font-heading text-[14px] font-medium text-accent-ink">
          Read case study →
        </span>
      </div>
    </Link>
  );
}

/** Standard project card used in the grid. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      aria-label={`${project.name}, view case study`}
      className="card-lift flex h-full flex-col overflow-hidden rounded-[16px] border border-border bg-surface"
    >
      <div className="relative border-b border-border" style={{ aspectRatio: "16 / 10" }}>
        <CoverImage
          src={project.cover}
          alt={`${project.name} cover`}
          initials={toInitials(project.name)}
          size="sm"
        />
      </div>
      <div className="flex flex-1 flex-col p-[22px]">
        <div className="mb-[11px] flex gap-3 text-[12px] text-ink-3">
          <span>{project.category}</span>
          <span aria-hidden>·</span>
          <span>{project.year}</span>
        </div>
        <h3
          className="font-heading font-medium text-ink"
          style={{ margin: 0, fontSize: "1.32rem", lineHeight: 1.15, letterSpacing: "-0.02em" }}
        >
          {project.name}
        </h3>
        <p className="mt-2.5 flex-1 text-[14px] leading-[1.55] text-ink-2">
          {project.result}
        </p>
        <div className="mt-4 flex flex-wrap gap-[7px]">
          {project.tech.slice(0, 3).map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <span className="mt-[18px] font-heading text-[13.5px] font-medium text-accent-ink">
          View case study →
        </span>
      </div>
    </Link>
  );
}
