import { Demo } from "@/components/site/demo"
import { Download } from "@/components/site/download"
import { FAQ } from "@/components/site/faq"
import { FeatureGrid } from "@/components/site/feature-grid"
import { FeatureShowcase } from "@/components/site/feature-showcase"
import { SiteFooter } from "@/components/site/footer"
import { SiteHeader } from "@/components/site/header"
import { Hero } from "@/components/site/hero"
import { Stats } from "@/components/site/stats"
import { DOWNLOADS, SITE, VERSION } from "@/lib/site"

import {
  BrowserIcon,
  CheckListIcon,
  CodeFolderIcon,
  CodeIcon,
  CommandIcon,
  CommandLineIcon,
  CpuIcon,
  EnergyIcon,
  GitBranchIcon,
  Image01Icon,
  Layout02Icon,
  Mic01Icon,
  Notebook01Icon,
  PaintBrush02Icon,
  RecordIcon,
  Search01Icon,
} from "@hugeicons/core-free-icons"

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE.name,
    description: SITE.description,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "macOS, Linux, Windows",
    softwareVersion: VERSION,
    downloadUrl: DOWNLOADS.macSilicon.url,
    url: SITE.url,
    license: "https://opensource.org/licenses/Apache-2.0",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    author: { "@type": "Organization", name: SITE.name, url: SITE.github },
    video: {
      "@type": "VideoObject",
      name: `${SITE.name} - demo`,
      description: `Quick walkthrough of ${SITE.name}: terminal, editor, AI agents, and web preview.`,
      thumbnailUrl: `https://i.ytimg.com/vi/${SITE.demoVideoId}/maxresdefault.jpg`,
      uploadDate: "2026-05-16",
      contentUrl: SITE.demoVideoUrl,
      embedUrl: `https://www.youtube-nocookie.com/embed/${SITE.demoVideoId}`,
    },
  }

  return (
    <>
      <SiteHeader />
      <main className="relative">
        <Hero />
        <Stats />
        <Demo />

        <div id="features" className="relative">
          <FeatureShowcase
            id="terminal"
            index="01"
            eyebrow="Terminal"
            title="A terminal you'll actually want to live in."
            description="Built with Tauri v2 and React. Hardware accelerated rendering. Glassmorphic transparency that beautifully blends with your OS."
            bullets={[
              {
                icon: CommandLineIcon,
                label: "WebGL-rendered xterm.js - silky at any scrollback",
              },
              {
                icon: Layout02Icon,
                label: "Native OS glassmorphism & background blur",
              },
              {
                icon: CodeFolderIcon,
                label: "File explorer with Catppuccin icons",
              },
              {
                icon: EnergyIcon,
                label: "Sub-millisecond keystroke latency",
              },
            ]}
            image={{
              src: "/novaterm-hero.jpg",
              alt: "NovaTerm terminal showing transparent glassmorphism and the file explorer",
              width: 1920,
              height: 1080,
              caption: "~/projects/novaterm",
            }}
            priority
          />

          <FeatureShowcase
            id="editor"
            index="02"
            eyebrow="Editor"
            title="An editor with real Vim mode and AI autocomplete."
            description="Built-in CodeMirror editor with context-aware completions, local AI endpoints via Ollama, and first-class Vim motions."
            bullets={[
              { icon: CodeIcon, label: "Context-aware AI autocomplete" },
              {
                icon: CommandIcon,
                label: "Real Vim mode (motions, registers, marks)",
              },
              {
                icon: PaintBrush02Icon,
                label: "Beautiful syntax highlighting and themes",
              },
            ]}
            image={{
              src: "/novaterm-hero.jpg",
              alt: "NovaTerm code editor with AI autocomplete and Vim mode",
              width: 1920,
              height: 1080,
              caption: "src/main.rs",
            }}
            reverse
          />


          <FeatureShowcase
            id="agents"
            index="03"
            eyebrow="AI workflow"
            title="Ghost text and local models."
            description="Run everything locally using Ollama and LMStudio. Completely private, no data leaves your machine."
            bullets={[
              {
                icon: CodeIcon,
                label: "AI predictive ghost text inline while you type",
              },
              { icon: CpuIcon, label: "100% Local models via Ollama" },
              {
                icon: RecordIcon,
                label: "No telemetry, no tracking, completely private",
              },
            ]}
            image={{
              src: "/novaterm-hero.jpg",
              alt: "NovaTerm AI features",
              width: 1920,
              height: 1080,
              caption: "AI · Local Models",
            }}
          />
        </div>

        <FeatureGrid />
        <Download />
        <FAQ />
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
