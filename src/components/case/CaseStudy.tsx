import Link from "next/link";
import type { Project } from "@/data/portfolio";
import { toInitials } from "@/components/ui/PlaceholderVisual";
import { CoverImage } from "@/components/ui/CoverImage";
import { Tag } from "@/components/ui/Tag";

/** A titled prose block used throughout the case study. */
function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2
        className="font-heading font-medium text-ink"
        style={{ margin: "0 0 12px", fontSize: "1.5rem", lineHeight: 1.2, letterSpacing: "-0.01em" }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

/** Bulleted list with the accent-dot markers used in the design. */
function DotList({ items }: { items: string[] }) {
  return (
    <ul className="m-0 flex list-none flex-col gap-[9px] p-0">
      {items.map((item) => (
        <li
          key={item}
          className="relative pl-[18px] text-[14.5px] leading-[1.55] text-ink-2"
        >
          <span
            aria-hidden
            className="absolute left-0 top-2 h-[5px] w-[5px] rounded-full bg-accent-line"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function CaseStudy({
  project,
  prev,
  next,
}: {
  project: Project;
  prev: Project;
  next: Project;
}) {
  const facts = [
    { k: "Year", v: project.year },
    { k: "Role", v: project.role },
    { k: "Category", v: project.category },
    { k: "Stack", v: project.tech.slice(0, 2).join(" · ") },
  ];

  return (
    <main
      style={{
        maxWidth: "920px",
        margin: "0 auto",
        padding: "clamp(32px, 5vw, 64px) clamp(20px, 5vw, 64px) clamp(60px, 8vw, 110px)",
      }}
    >
      <Link
        href="/#work"
        className="mb-[30px] inline-flex items-center gap-2 font-heading text-[14px] font-medium text-ink-3 transition-colors hover:text-accent-ink"
      >
        ← All work
      </Link>

      <div className="mb-4 flex gap-3.5 text-[13px] text-ink-3">
        <span>{project.category}</span>
        <span aria-hidden>·</span>
        <span>{project.year}</span>
        <span aria-hidden>·</span>
        <span>{project.role}</span>
      </div>

      <h1
        className="font-heading font-medium text-ink"
        style={{
          margin: 0,
          fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
          lineHeight: 1.03,
          letterSpacing: "-0.03em",
          textWrap: "balance",
        }}
      >
        {project.name}
      </h1>
      <p
        className="text-ink-2"
        style={{
          margin: "20px 0 0",
          fontSize: "clamp(1.05rem, 1.6vw, 1.25rem)",
          lineHeight: 1.6,
          maxWidth: "60ch",
        }}
      >
        {project.summary}
      </p>
      <div className="mt-[22px] flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>

      <div
        className="relative mt-[30px] overflow-hidden rounded-[16px] border border-border"
        style={{ aspectRatio: "16 / 9" }}
      >
        <CoverImage
          src={project.cover}
          alt={`${project.name} screenshot`}
          initials={toInitials(project.name)}
          caption="hero image"
          priority
          sizes="(max-width: 920px) 100vw, 920px"
        />
      </div>

      {/* Quick facts */}
      <div
        className="mt-[34px] grid gap-px overflow-hidden rounded-[14px] border border-border-soft bg-border-soft"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}
      >
        {facts.map((fact) => (
          <div key={fact.k} className="bg-bg px-[18px] py-[18px]">
            <div className="mb-[7px] text-[11px] uppercase tracking-[0.1em] text-ink-3">
              {fact.k}
            </div>
            <div className="font-heading text-[14.5px] font-medium leading-[1.35] text-ink">
              {fact.v}
            </div>
          </div>
        ))}
      </div>

      {/* Narrative */}
      <div className="mt-[46px] flex flex-col gap-[38px]">
        <Block title="Overview">
          <p className="m-0 text-[15.5px] leading-[1.75] text-ink-2">{project.overview}</p>
        </Block>

        <Block title="Problem & opportunity">
          <p className="m-0 text-[15.5px] leading-[1.75] text-ink-2">{project.problem}</p>
        </Block>

        <div className="grid grid-cols-1 gap-[34px] min-[721px]:grid-cols-2">
          <Block title="My role">
            <DotList items={project.responsibilities} />
          </Block>
          <Block title="Constraints">
            <DotList items={project.constraints} />
          </Block>
        </div>

        <div>
          <h2
            className="font-heading font-medium text-ink"
            style={{ margin: "0 0 16px", fontSize: "1.5rem", lineHeight: 1.2, letterSpacing: "-0.01em" }}
          >
            Process
          </h2>
          <ol className="m-0 flex list-none flex-col p-0">
            {project.process.map((step, i) => (
              <li
                key={step}
                className="grid gap-4 border-t border-border-soft py-3.5"
                style={{ gridTemplateColumns: "44px 1fr" }}
              >
                <span className="font-heading text-[14px] font-medium text-accent-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[14.5px] leading-[1.6] text-ink-2">{step}</span>
              </li>
            ))}
            <div className="border-t border-border-soft" />
          </ol>
        </div>

        <Block title="Key decisions">
          <ul className="m-0 flex list-none flex-col gap-[11px] p-0">
            {project.decisions.map((decision) => (
              <li
                key={decision}
                className="relative pl-[18px] text-[15px] leading-[1.65] text-ink-2"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-[9px] h-[5px] w-[5px] rounded-full bg-accent-line"
                />
                {decision}
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Final solution">
          <p className="m-0 text-[15.5px] leading-[1.75] text-ink-2">{project.solution}</p>
        </Block>

        <div className="rounded-[16px] border border-border bg-surface p-[clamp(22px,3vw,34px)]">
          <h2
            className="font-heading font-medium text-ink"
            style={{ margin: "0 0 16px", fontSize: "1.35rem", lineHeight: 1.2, letterSpacing: "-0.01em" }}
          >
            Results
          </h2>
          <div
            className="grid gap-[18px]"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}
          >
            {project.results.map((result) => (
              <div key={result} className="flex items-start gap-[11px]">
                <span aria-hidden className="text-[15px] leading-[1.5] text-accent-ink">
                  →
                </span>
                <span className="text-[14.5px] leading-[1.55] text-ink-2">{result}</span>
              </div>
            ))}
          </div>
        </div>

        <Block title="Lessons learned">
          <p className="m-0 text-[15.5px] leading-[1.75] text-ink-2">{project.lessons}</p>
        </Block>
      </div>

      {/* Prev / next */}
      <nav
        aria-label="More projects"
        className="mt-[52px] grid grid-cols-1 gap-4 border-t border-border-soft pt-[26px] min-[721px]:grid-cols-2"
      >
        <Link
          href={`/work/${prev.slug}`}
          className="rounded-[12px] border border-border p-[18px_20px] text-left transition-colors hover:border-accent-line"
        >
          <div className="mb-1.5 text-[12px] text-ink-3">← Previous</div>
          <div className="font-heading text-[15px] font-medium leading-[1.3] text-ink">
            {prev.name}
          </div>
        </Link>
        <Link
          href={`/work/${next.slug}`}
          className="rounded-[12px] border border-border p-[18px_20px] text-right transition-colors hover:border-accent-line"
        >
          <div className="mb-1.5 text-[12px] text-ink-3">Next →</div>
          <div className="font-heading text-[15px] font-medium leading-[1.3] text-ink">
            {next.name}
          </div>
        </Link>
      </nav>
    </main>
  );
}
