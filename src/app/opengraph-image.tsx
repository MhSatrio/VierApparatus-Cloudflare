import { ImageResponse } from "next/og";

export const alt = "VierApparatus: science should be accessible";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#4570B6", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, color: "#fff" }}>
        <div style={{ fontSize: 28, letterSpacing: 8, color: "#CAEBFB" }}>VIERAPPARATUS</div>
        <div style={{ fontSize: 80, fontWeight: 700, marginTop: 24, lineHeight: 1.1 }}>Science should be accessible.</div>
        <div style={{ fontSize: 30, marginTop: 32, color: "#CAEBFB" }}>An independent science publication. Evidence first, jargon second.</div>
      </div>
    ),
    size,
  );
}
