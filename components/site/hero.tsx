import { AppleIcon, ComputerIcon, GithubIcon, MicrosoftIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { DOWNLOADS, SITE } from "@/lib/site"
import { usePlatform } from "./platform-detect"

export function Hero() {
  const platform = usePlatform()

  const primary =
    platform === "linux"
      ? { label: "Download for Linux", href: DOWNLOADS.linuxAppImage.url, icon: ComputerIcon }
      : platform === "windows"
        ? { label: "Download for Windows", href: DOWNLOADS.windows.url, icon: MicrosoftIcon }
        : { label: "Download for macOS", href: DOWNLOADS.macSilicon.url, icon: AppleIcon }

  return (
    <section className="relative isolate pt-24 pb-20 sm:pt-32 sm:pb-24">
      <div className="mx-auto flex max-w-[800px] flex-col px-6">
        <h1 className="text-[2.75rem] font-medium leading-[1.05] tracking-[-0.03em] text-foreground sm:text-7xl">
          The AI-native terminal environment.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          A deeply integrated workspace with built-in editor, local AI inference via Ollama, and ghost-text predictions.
        </p>
        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Button asChild size="lg" className="h-11 rounded-full px-6 font-medium shadow-none transition-transform hover:scale-[0.98]">
            <Link href={primary.href} target="_blank" rel="noreferrer">
              <HugeiconsIcon icon={primary.icon} strokeWidth={1.5} className="mr-2" />
              {primary.label}
            </Link>
          </Button>
          <Button asChild size="lg" variant="ghost" className="h-11 rounded-full px-6 font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors">
            <Link href={SITE.github} target="_blank" rel="noreferrer">
              <HugeiconsIcon icon={GithubIcon} strokeWidth={1.5} className="mr-2" />
              View source
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
