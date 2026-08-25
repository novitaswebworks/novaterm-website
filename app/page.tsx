import { Demo } from "@/components/site/demo"
import { Download } from "@/components/site/download"
import { FAQ } from "@/components/site/faq"
import { FeatureGrid } from "@/components/site/feature-grid"
import { SiteFooter } from "@/components/site/footer"
import { SiteHeader } from "@/components/site/header"
import { Hero } from "@/components/site/hero"
import { Stats } from "@/components/site/stats"
import { DOWNLOADS, SITE, VERSION } from "@/lib/site"
import Image from "next/image"

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
        
        <section className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <div className="mb-16 flex flex-col items-center text-center">
            <h2 className="text-3xl font-medium tracking-tight text-foreground sm:text-5xl">
              A workspace you actually want to live in
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Hardware-accelerated terminal, code editor, and AI composer running side by side. Rendered natively using Tauri v2.
            </p>
          </div>
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border bg-background/50 shadow-2xl">
            <Image src="/terminal.webp" alt="NovaTerm Interface" width={1920} height={1080} className="w-full object-cover" />
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <div className="mb-16 flex flex-col items-center text-center">
            <h2 className="text-3xl font-medium tracking-tight text-foreground sm:text-5xl">
              Source control, natively integrated
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Say goodbye to juggling the command line for basic git operations. Stage, commit, and let AI generate pull requests effortlessly.
            </p>
          </div>
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border bg-background/50 shadow-2xl">
            <Image src="/source-control.webp" alt="Source Control Panel" width={1920} height={1080} className="w-full object-cover" />
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <div className="mb-16 flex flex-col items-center text-center">
            <h2 className="text-3xl font-medium tracking-tight text-foreground sm:text-5xl">
              Tutor Mode
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Hit Cmd+Shift+L when a command fails, and your local AI instantly reads the PTY output to explain exactly what went wrong.
            </p>
          </div>
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border bg-background/50 shadow-2xl">
            <Image src="/ai_workflow.webp" alt="AI Workflow" width={1920} height={1080} className="w-full object-cover" />
          </div>
        </section>

        <Demo />
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
