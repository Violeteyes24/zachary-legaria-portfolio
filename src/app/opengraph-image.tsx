import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio";

export const alt = `${profile.fullName}, Full-Stack & AI Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "62px 68px", background: "#0b0d12", color: "#f4f1e9", fontFamily: "Georgia, serif", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -30, top: -90, display: "flex", fontSize: 370, fontStyle: "italic", color: "rgba(149,128,255,0.08)", letterSpacing: "-0.08em" }}>ZL</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: "Arial, sans-serif", textTransform: "uppercase", letterSpacing: "0.12em", fontSize: 18, color: "#8b8e98" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}><span style={{ color: "#c3b8ff" }}>01 / Portfolio</span><span>Full-stack + Applied AI</span></div>
          <div style={{ display: "flex", width: 44, height: 44, alignItems: "center", justifyContent: "center", border: "1px solid #9580ff", color: "#c3b8ff", fontSize: 15, fontWeight: 700 }}>ZL</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 990 }}>
          <div style={{ display: "flex", fontSize: 86, lineHeight: 0.93, letterSpacing: "-0.045em" }}>Reliable products.<br /><span style={{ color: "#c3b8ff", fontStyle: "italic" }}>Applied intelligence.</span></div>
          <div style={{ display: "flex", marginTop: 30, fontFamily: "Arial, sans-serif", fontSize: 25, lineHeight: 1.4, color: "#c7c6c2", maxWidth: 820 }}>{profile.fullName} builds secure full-stack products and production AI systems.</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #313540", paddingTop: 22, fontFamily: "Arial, sans-serif", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: 15, color: "#8b8e98" }}><span>{profile.location}</span><span style={{ color: "#c3b8ff" }}>{profile.availability}</span></div>
      </div>
    ),
    { ...size },
  );
}
