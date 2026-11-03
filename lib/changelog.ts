export type ChangeKind = "Added" | "Changed" | "Fixed"

export interface ChangelogEntry {
  version: string
  date?: string
  highlight?: string
  groups: { kind: ChangeKind; items: string[] }[]
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: "2.3.0",
    date: "2026-11-03",
    highlight: "NovaTerm now restarts into the new version after it is updated by Homebrew, winget, a package upgrade or an AppImage swap. If no terminal is running a command it restarts on its own after a short notice; otherwise it asks first and never stops a running command without a click.",
    groups: [
      {
        kind: "Added",
        items: [
          "NovaTerm now restarts into the new version after it is updated by Homebrew, winget, a package upgrade or an AppImage swap. If no terminal is running a command it restarts on its own after a short notice; otherwise it asks first and never stops a running command without a click.",
          "Update and restart in the update dialog now downloads, verifies and installs the update inside the app, with a progress bar, and restarts when it is done. If the install fails you can try again or open the release notes.",
        ],
      },
    ],
  },
  {
    version: "2.2.1",
    date: "2026-11-03",
    highlight: "Switching theme or light/dark mode now updates open terminals immediately. Previously the terminal kept the old colors until something else changed.",
    groups: [
      {
        kind: "Fixed",
        items: [
          "Switching theme or light/dark mode now updates open terminals immediately. Previously the terminal kept the old colors until something else changed.",
          "The first-run hints in an empty terminal follow the terminal palette, so they stay readable when the interface and terminal use different light and dark colors.",
        ],
      },
    ],
  },
  {
    version: "2.2.0",
    date: "2026-11-03",
    highlight: "MCP servers now start with an empty environment plus a small allowlist of toolchain variables (such as ). A server that relied on a variable from your shell profile or the app environment must have it set in its own configuration.",
    groups: [
      {
        kind: "Changed",
        items: [
          "MCP servers now start with an empty environment plus a small allowlist of toolchain variables (such as ). A server that relied on a variable from your shell profile or the app environment must have it set in its own configuration.",
        ],
      },
      {
        kind: "Fixed",
        items: [
          "Adding or editing an MCP server now validates its environment and arguments: numeric environment values are accepted, malformed JSON, arrays and unclosed quotes are rejected, duplicate identifiers are refused, and arguments containing spaces are preserved.",
          "Shell autocomplete now works with named OpenAI-compatible endpoints, and deleting the endpoint selected for autocomplete resets the selection.",
          "Credentials held by the app process or the login shell are no longer passed to MCP servers.",
        ],
      },
    ],
  },
  {
    version: "2.1.0",
    date: "2026-11-03",
    highlight: "Claude Fable 5.1, Claude Opus 5.5, Claude Sonnet 5.5 and Claude Haiku 5.5 are now available in the AI model picker.",
    groups: [
      {
        kind: "Added",
        items: [
          "Claude Fable 5.1, Claude Opus 5.5, Claude Sonnet 5.5 and Claude Haiku 5.5 are now available in the AI model picker.",
        ],
      },
      {
        kind: "Changed",
        items: [
          "Updated AI SDK to v7 and all AI provider packages to their latest major versions.",
          "Updated Tauri plugins and the Rust dependency tree to their latest compatible releases.",
          "Updated build and test tooling, including TypeScript 7, Vitest 5 and Babel 8.",
          "Resolved all fixable npm dependency advisories, including critical issues in  and , and high-severity issues in ,  and .",
        ],
      },
    ],
  },
  {
    version: "2.0.2",
    date: "2026-09-29",
    highlight: "Fixed Debian package compatibility on Kali Linux, Ubuntu 24.04+, and Debian 13 by adding 64-bit time_t (t64) package alternatives to deb dependencies.",
    groups: [
      {
        kind: "Fixed",
        items: [
          "Fixed Debian package compatibility on Kali Linux, Ubuntu 24.04+, and Debian 13 by adding 64-bit time_t (t64) package alternatives to deb dependencies.",
        ],
      },
    ],
  },
  {
    version: "2.0.1",
    date: "2026-09-29",
    highlight: "Docker container auto-discovery on macOS and devcontainer PTY terminal resolution.",
    groups: [
      {
        kind: "Fixed",
        items: [
          "Fixed Docker container discovery on macOS by properly resolving docker executable paths in GUI application environments.",
          "Fixed devcontainer PTY terminal session spawn to use resolved docker binary path.",
          "Added loading state indicator and manual refresh action to Docker Attach container dialog.",
        ],
      },
    ],
  },
  {
    version: "2.0.0",
    date: "2026-09-29",
    highlight: "Model Context Protocol (MCP) tool integration, Remote SSH & DevContainers, Port Forwarding drawer, and native vibrancy.",
    groups: [
      {
        kind: "Added",
        items: [
          "Model Context Protocol (MCP) client and server lifecycle management for extending AI agents with custom tools.",
          "Remote development workspace integration supporting SSH hosts and Docker DevContainers with dynamic OSC 7/133 shell tracking.",
          "Integrated Port Forwarding drawer with real-time tunnel status monitoring and auto-assigned local port mapping.",
          "Redesigned Software Updates card in Settings with live version checking and direct copy-to-clipboard terminal upgrade commands.",
        ],
      },
      {
        kind: "Changed",
        items: [
          "Upgraded Windows package delivery to native WinGet manifests with automated hash validation.",
          "Refactored terminal shell initialization to automatically synchronize remote directory changes with the file explorer.",
        ],
      },
      {
        kind: "Fixed",
        items: [
          "Hardened remote command execution against shell argument injection vulnerabilities.",
          "Resolved race condition in MCP session spawning on early child process exit.",
          "Fixed Homebrew tap formula deprecations for clean automated updates.",
        ],
      },
    ],
  },
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

