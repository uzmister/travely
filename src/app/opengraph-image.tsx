import { ImageResponse } from "next/og";

export const alt = "Travely — AI travel companion for the New Silk Road & beyond";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #fff8f2 0%, #ffe3cc 55%, #ffb26b 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 24,
              background: "linear-gradient(135deg, #ffa24c, #ff6a13 55%, #e8480a)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 44,
              fontWeight: 800,
            }}
          >
            t
          </div>
          <div style={{ fontSize: 48, fontWeight: 800, color: "#1c140f", letterSpacing: -2 }}>travely.</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 800, color: "#1c140f", letterSpacing: -4, lineHeight: 1.02 }}>Travel smarter,</div>
          <div style={{ fontSize: 84, fontWeight: 800, color: "#f2540a", letterSpacing: -4, lineHeight: 1.02 }}>not harder.</div>
          <div style={{ marginTop: 24, fontSize: 30, color: "#5d4c41" }}>
            AI travel companion for the New Silk Road & beyond · 6 languages
          </div>
        </div>
      </div>
    ),
    size,
  );
}
