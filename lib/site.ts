export const VERSION = "1.3.1"

export const SITE = {
  name: "NovaTerm",
  domain: "novaterm.app",
  url: "https://novaterm.app",
  tagline: "The AI-native developer workspace.",
  description:
    "NovaTerm is a beautifully crafted, GPU-accelerated terminal with a built-in code editor, local AI models via Ollama, and predictive ghost text.",
  github: "https://github.com/novitaswebworks/novaterm",
  githubReleases: "https://github.com/novitaswebworks/novaterm/releases",
  issues: "https://github.com/novitaswebworks/novaterm/issues",
  websiteRepo: "https://github.com/novitaswebworks/novaterm-website",
  aur: "https://aur.archlinux.org/packages/novaterm-bin",
  demoVideoId: "novatermdemo",
  demoVideoUrl: "https://youtu.be/novatermdemo",
  youtube: "https://www.youtube.com/@novitaswebworks",
} as const

const releaseBase = `${SITE.githubReleases}/download/v${VERSION}`

export const DOWNLOADS = {
  macSilicon: {
    label: "macOS · Apple Silicon",
    file: `NovaTerm_${VERSION}_aarch64.dmg`,
    arch: "Apple Silicon (M1+)",
    url: `${releaseBase}/NovaTerm_${VERSION}_aarch64.dmg`,
    available: true,
  },
  macIntel: {
    label: "macOS · Intel",
    file: `NovaTerm_${VERSION}_x64.dmg`,
    arch: "Intel (x86_64)",
    url: `${releaseBase}/NovaTerm_${VERSION}_x64.dmg`,
    available: true,
  },
  linuxAppImage: {
    label: "Linux · AppImage",
    file: `NovaTerm_${VERSION}_amd64.AppImage`,
    arch: "x86_64",
    url: `${releaseBase}/NovaTerm_${VERSION}_amd64.AppImage`,
    available: true,
  },
  linuxDeb: {
    label: "Linux · .deb",
    file: `NovaTerm_${VERSION}_amd64.deb`,
    arch: "Debian / Ubuntu",
    url: `${releaseBase}/NovaTerm_${VERSION}_amd64.deb`,
    available: true,
  },
  linuxRpm: {
    label: "Linux · .rpm",
    file: `NovaTerm-${VERSION}-1.x86_64.rpm`,
    arch: "Fedora / RHEL",
    url: `${releaseBase}/NovaTerm-${VERSION}-1.x86_64.rpm`,
    available: true,
  },
  linuxAur: {
    label: "Linux · AUR",
    file: "novaterm-bin",
    arch: "Arch Linux / Manjaro",
    url: "https://aur.archlinux.org/packages/novaterm-bin",
    available: true,
  },
  windows: {
    label: "Windows",
    file: `NovaTerm_${VERSION}_x64-setup.exe`,
    arch: "x86_64",
    url: `${releaseBase}/NovaTerm_${VERSION}_x64-setup.exe`,
    available: true,
  },
} as const

export type DownloadKey = keyof typeof DOWNLOADS
