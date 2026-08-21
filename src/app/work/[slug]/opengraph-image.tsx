/* eslint-disable @next/next/no-img-element -- ImageResponse renders image data directly; next/image is not supported here. */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getProject, projects } from "@/data/portfolio";

export const alt = "Project case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const accents = {
  violet: "#9580ff",
  mint: "#78d6b3",
  amber: "#e6b86a",
  blue: "#72a7ff",
  rose: "#e88ba0",
} as const;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return new ImageResponse(<div style={{ display: "flex", width: "100%", height: "100%", background: "#0b0d12" }} />, { ...size });
  const accent = accents[project.accent];
  const coverUrl = project.cover
    ? `data:image/png;base64,${(
        await readFile(join(process.cwd(), "public", project.cover.replace(/^\//, "")))
      ).toString("base64")}`
    : undefined;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0b0d12", color: "#f4f1e9", padding: 54, gap: 48, fontFamily: "Arial, sans-serif" }}>
        <div style={{ width: "55%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, color: accent, textTransform: "uppercase", letterSpacing: "0.12em", fontSize: 16 }}><span>Case study</span><span style={{ width: 56, height: 1, background: accent }} /><span>{project.year}</span></div>
          <div style={{ display: "flex", flexDirection: "column" }}><div style={{ display: "flex", fontFamily: "Georgia, serif", fontSize: 70, lineHeight: 0.95, letterSpacing: "-0.045em" }}>{project.name}</div><div style={{ display: "flex", marginTop: 24, fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 28, lineHeight: 1.25, color: accent }}>{project.result}</div></div>
          <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #313540", paddingTop: 18, color: "#8b8e98", textTransform: "uppercase", letterSpacing: "0.08em", fontSize: 14 }}><span>{project.role}</span><span>Zachary Legaria</span></div>
        </div>
        <div style={{ width: "45%", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${accent}`, padding: 12, background: "#12151d" }}>
          {coverUrl ? <img src={coverUrl} alt="" width="456" height="456" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} /> : <div style={{ display: "flex", color: accent, fontFamily: "Georgia, serif", fontSize: 96 }}>{project.name.slice(0, 2)}</div>}
        </div>
      </div>
    ),
    { ...size },
  );
}
