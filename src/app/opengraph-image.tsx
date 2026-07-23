import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio";

export const alt = `${profile.fullName}, Full-Stack & AI Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Branded social-share card, generated at build time (no external assets). */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(120% 120% at 20% 10%, #232532 0%, #161826 60%)",
          color: "#e9e9ed",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 74,
              height: 74,
              borderRadius: 18,
              border: "2px solid #9184d9",
              color: "#d2cefd",
              fontSize: 34,
              fontWeight: 600,
            }}
          >
            {profile.monogram}
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#cfd3e5" }}>
            {profile.availability}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.02,
            }}
          >
            {profile.fullName}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 40,
              color: "#cfd3e5",
              maxWidth: 900,
              lineHeight: 1.2,
            }}
          >
            Full-stack &amp; AI engineer building products &amp; RAG systems.
          </div>
          <div style={{ display: "flex", width: 120, height: 4, background: "#9184d9" }} />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            color: "#9397ab",
          }}
        >
          <div style={{ display: "flex" }}>{profile.location}</div>
          <div style={{ display: "flex" }}>github.com/Violeteyes24</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
