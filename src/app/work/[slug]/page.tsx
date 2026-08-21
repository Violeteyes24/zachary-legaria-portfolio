import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/case/CaseStudy";
import { JsonLd } from "@/components/seo/JsonLd";
import { projectJsonLd } from "@/lib/structured-data";
import { getAdjacentProjects, getProject, projects } from "@/data/portfolio";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/** Pre-render every case study at build time. */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const socialImage = `/work/${project.slug}/opengraph-image`;

  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      title: `${project.name} Case Study`,
      description: project.summary,
      url: `/work/${project.slug}`,
      images: [{ url: socialImage, alt: `${project.name} case study` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} Case Study`,
      description: project.summary,
      images: [socialImage],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  const adjacent = getAdjacentProjects(slug);

  if (!project || !adjacent) {
    notFound();
  }

  return (
    <>
      <JsonLd data={projectJsonLd(project)} />
      <CaseStudy project={project} prev={adjacent.prev} next={adjacent.next} />
    </>
  );
}
