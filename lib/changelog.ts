export type ChangeKind = "Added" | "Changed" | "Fixed"

export interface ChangelogEntry {
  version: string
  date?: string
  highlight?: string
  groups: { kind: ChangeKind; items: string[] }[]
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: "1.4.0",
    date: "2026-08-29",
    highlight: "Windows Package Manager (Winget) integration, Chocolatey packaging, and release pipeline hardening.",
    groups: [
      {
        kind: "Added",
        items: [
          "Winget integration: automated submission pipeline for Windows Package Manager (NovitasWebWorks.NovaTerm).",
          "Chocolatey packaging: automated package build and push with moderation compliance for choco install.",
        ],
      },
      {
        kind: "Changed",
        items: [
          "Hardened release workflow with resilient, non-blocking multi-platform store deployments.",
        ],
      },
      {
        kind: "Fixed",
        items: [
          "Resolved Chocolatey packaging specification paths and Windows MSI installer targets.",
        ],
      },
    ],
  },
  {
    version: "1.3.6",
    date: "2026-08-27",
    highlight: "Linux Snapcraft store publishing and packaging fixes.",
    groups: [
      {
        kind: "Changed",
        items: [
          "Snapcraft deployment workflow upgraded to direct store upload for faster releases.",
        ],
      },
      {
        kind: "Fixed",
        items: [
          "Resolved packaging build steps and execution modes on Linux distributions.",
        ],
      },
    ],
  },
  {
    version: "1.3.4",
    date: "2026-08-26",
    highlight: "Automated Windows MSI publishing and release authorization.",
    groups: [
      {
        kind: "Added",
        items: [
          "Winget releaser automation for publishing Windows MSI installers.",
        ],
      },
      {
        kind: "Changed",
        items: [
          "Migrated release creation authorization to Personal Access Tokens for seamless multi-platform asset uploads.",
        ],
      },
    ],
  },
  {
    version: "1.3.2",
    date: "2026-08-25",
    highlight: "Editor search/replace panel styling and link updates.",
    groups: [
      {
        kind: "Changed",
        items: [
          "Restyled code editor search and replace panel for enhanced visual ergonomics.",
          "Updated domain configuration and official project links.",
        ],
      },
    ],
  },
  {
    version: "1.3.1",
    date: "2026-08-25",
    highlight: "In-app updater public key signing & Homebrew Tap integration.",
    groups: [
      {
        kind: "Added",
        items: [
          "In-app updater public key verification in Tauri configuration for secure auto-updates.",
          "Automated release dispatch to Homebrew Tap repository.",
        ],
      },
    ],
  },
  {
    version: "1.2.0",
    date: "2026-08-25",
    highlight: "Enterprise Vaults, AI PRs, and macOS Native Vibrancy.",
    groups: [
      {
        kind: "Added",
        items: [
          "Enterprise Vaults: 1-click AWS Secrets Manager sync injected natively into PTY without touching disk.",
          "AI Pull Requests: Seamlessly analyze diffs and run `gh pr create` from the Source Control panel.",
          "Tutor Mode (Cmd+Shift+L): Explain failing terminal commands instantly.",
          "Workspace Provisioning: Auto-executing setup logic on folder navigation.",
        ],
      },
      {
        kind: "Changed",
        items: [
          "Refactored Settings window to a beautiful Left-Sidebar macOS style.",
          "Upgraded window blur effect to true macOS `UnderWindowBackground` for perfect native vibrancy.",
        ],
      },
      {
        kind: "Fixed",
        items: [
          "macOS App Translocation / TCC prompts bug loop fixed via `Info.plist` patching.",
        ],
      }
    ],
  },
  {
    version: "1.1.4",
    date: "2026-08-20",
    highlight: "New logo & CI release pipeline improvements.",
    groups: [
      {
        kind: "Added",
        items: [
          "Wired optional macOS Developer ID signing and notarization.",
          "Added new lint/typecheck/test/clippy GitHub Actions workflow on push and PR.",
        ],
      },
      {
        kind: "Changed",
        items: [
          "Updated application branding and logos.",
        ],
      }
    ],
  },
  {
    version: "1.1.3",
    date: "2026-08-15",
    highlight: "Stability fixes for React UI and macOS Window.",
    groups: [
      {
        kind: "Fixed",
        items: [
          "Resolved React infinite loop crash in ShellInput caused by zustand selector.",
          "Enabled macos-private-api to fix crash on boot for transparent windows.",
          "Guarded agent-activity listener outside of Tauri runtime.",
        ],
      }
    ],
  },
  {
    version: "1.1.2",
    date: "2026-08-10",
    highlight: "Premium UI glow and formatting enhancements.",
    groups: [
      {
        kind: "Changed",
        items: [
          "Premium glassmorphism and glow enhancements across the UI.",
          "Applied biome formatting across the entire source tree.",
        ],
      }
    ],
  },
  {
    version: "1.0.0",
    date: "2026-07-01",
    highlight: "Initial Release of NovaTerm.",
    groups: [
      {
        kind: "Added",
        items: [
          "Hardware-accelerated terminal using Tauri v2.",
          "Built-in code editor with AI autocomplete.",
          "Local LLM integration via Ollama.",
        ],
      }
    ],
  }
]

