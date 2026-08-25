import { Demo } from "@/components/site/demo"
import { Download } from "@/components/site/download"
import { FAQ } from "@/components/site/faq"
import { FeatureGrid } from "@/components/site/feature-grid"
import { SiteFooter } from "@/components/site/footer"
import { SiteHeader } from "@/components/site/header"
import { Hero } from "@/components/site/hero"
import { Stats } from "@/components/site/stats"
import { Reveal } from "@/components/site/reveal"
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
  }

  return (
    <>
      <SiteHeader />
      <main className="relative">
        <Hero />
        
        <Reveal delay={0.8}>
          <section className="relative mx-auto max-w-6xl px-4 sm:px-6 mb-24 sm:mb-32">
            <div className="relative mx-auto overflow-hidden rounded-2xl border border-primary/20 bg-background/50 shadow-[0_0_50px_color-mix(in_srgb,var(--primary)_20%,transparent)] backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none z-10" />
              <Image src="/terminal.webp" alt="NovaTerm Interface" width={1920} height={1080} className="w-full object-cover relative z-0" priority />
            </div>
          </section>
        </Reveal>

        <Stats />
        
        <section className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <Reveal>
            <div className="mb-16 flex flex-col items-center text-center">
              <h2 className="text-3xl font-medium tracking-tight text-foreground sm:text-5xl">
                Source control, natively integrated.
              </h2>
              <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
                Say goodbye to juggling the command line for basic git operations. Stage, commit, and let AI generate pull requests effortlessly.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border bg-background/50 shadow-2xl">
              <Image src="/source-control.webp" alt="Source Control Panel" width={1920} height={1080} className="w-full object-cover" />
            </div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <Reveal>
            <div className="mb-16 flex flex-col items-center text-center">
              <h2 className="text-3xl font-medium tracking-tight text-foreground sm:text-5xl">
                AI Tutor Mode.
              </h2>
              <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
                Hit Cmd+Shift+L when a command fails, and your local AI instantly reads the PTY output to explain exactly what went wrong.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border bg-background/50 shadow-2xl">
              <Image src="/ai_workflow.webp" alt="AI Workflow" width={1920} height={1080} className="w-full object-cover" />
            </div>
          </Reveal>
        </section>

        <Demo />
        <Reveal>
          <FeatureGrid />
        </Reveal>
        <Download />
        <FAQ />
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  )
}
