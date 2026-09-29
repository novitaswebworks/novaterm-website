import { SITE, VERSION } from "@/lib/site"
import { LOGO_DATA_URL } from "@/lib/logo-base64"
import { ImageResponse } from "next/og"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = `${SITE.name} - ${SITE.tagline}`

export default function OG() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "68px 76px",
        background: "#080c14",
        backgroundImage:
          "radial-gradient(circle at 18% 18%, rgba(56, 189, 248, 0.22) 0%, transparent 45%), radial-gradient(circle at 82% 82%, rgba(99, 102, 241, 0.20) 0%, transparent 45%), radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.08) 0%, transparent 60%)",
        color: "white",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Top Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <img
            src={LOGO_DATA_URL}
            width={64}
            height={64}
            alt="NovaTerm Logo"
            style={{
              borderRadius: 16,
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
            }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ display: "flex", fontSize: 38, fontWeight: 800, letterSpacing: -1, color: "#ffffff" }}>
              {SITE.name}
            </span>
            <span
              style={{
                display: "flex",
                padding: "4px 12px",
                borderRadius: 999,
                background: "rgba(56, 189, 248, 0.12)",
                border: "1px solid rgba(56, 189, 248, 0.32)",
                fontSize: 15,
                fontWeight: 600,
                color: "#38bdf8",
                letterSpacing: 0.5,
              }}
            >
              {`v${VERSION}`}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              display: "flex",
              padding: "6px 14px",
              borderRadius: 999,
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              fontSize: 15,
              fontWeight: 500,
              color: "#94a3b8",
            }}
          >
            Apache 2.0 Open Source
          </span>
        </div>
      </div>

      {/* Main Pitch */}
      <div style={{ display: "flex", flexDirection: "column", gap: 18, width: "100%" }}>
        <div
          style={{
            display: "flex",
            fontSize: 62,
            fontWeight: 800,
            letterSpacing: -2,
            lineHeight: 1.1,
            color: "#f8fafc",
            maxWidth: 1040,
          }}
        >
          The AI-native terminal and developer workspace.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 23,
            lineHeight: 1.45,
            color: "#94a3b8",
            maxWidth: 960,
          }}
        >
          GPU-accelerated terminal emulator, integrated code editor, Model Context Protocol (MCP), and private local LLMs via Ollama. Built with Rust and Tauri.
        </div>
      </div>

      {/* Feature Badges Grid */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", flexWrap: "wrap" }}>
        {[
          "Under 10MB App Size",
          "300ms Cold Start",
          "Zero Telemetry",
          "Local LLMs via Ollama",
          "Model Context Protocol",
          "SSH & DevContainers",
        ].map((feat) => (
          <div
            key={feat}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 14px",
              borderRadius: 10,
              background: "rgba(15, 23, 42, 0.8)",
              border: "1px solid rgba(56, 189, 248, 0.22)",
              fontSize: 14,
              fontWeight: 600,
              color: "#e2e8f0",
            }}
          >
            {feat}
          </div>
        ))}
      </div>

      {/* Footer / Domain */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          paddingTop: 22,
          fontSize: 18,
          color: "#64748b",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ display: "flex", color: "#38bdf8", fontWeight: 600 }}>{SITE.domain}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ display: "flex" }}>macOS (Universal) · Linux · Windows</span>
        </div>
      </div>
    </div>,
    { ...size }
  )
}
