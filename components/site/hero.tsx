"use client"
import { AppleIcon, ComputerIcon, GithubIcon, MicrosoftIcon, ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

import { Button } from "@/components/ui/button"
import { DOWNLOADS, SITE, VERSION } from "@/lib/site"
import { usePlatform } from "./platform-detect"

export function Hero() {
  const platform = usePlatform()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const primary =
    platform === "linux"
      ? { label: "Download for Linux", href: DOWNLOADS.linuxAppImage.url, icon: ComputerIcon }
      : platform === "windows"
        ? { label: "Download for Windows", href: DOWNLOADS.windows.url, icon: MicrosoftIcon }
        : { label: "Download for macOS", href: DOWNLOADS.macSilicon.url, icon: AppleIcon }

  return (
    <section ref={ref} className="relative isolate pt-32 pb-20 sm:pt-40 sm:pb-32 overflow-hidden">
      {/* Subtle animated background glow */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary/20 to-cyan-500/10 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </motion.div>

      <motion.div style={{ y, opacity }} className="mx-auto flex max-w-[900px] flex-col items-center text-center px-6">
        
        {/* Release Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href={`${SITE.githubReleases}/tag/v${VERSION}`}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 font-mono text-[11px] tracking-widest text-primary uppercase backdrop-blur-md transition-all hover:bg-primary/10 hover:border-primary/40"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary"></span>
            </span>
            <span>NovaTerm v{VERSION}</span>
            <HugeiconsIcon icon={ArrowRight01Icon} className="size-3 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
          </Link>
        </motion.div>

        {/* Massive Headline */}
        <div className="mt-8 overflow-hidden">
          <motion.h1 
            initial={{ opacity: 0, y: 80, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{ perspective: "1000px" }}
            className="text-[3.5rem] font-medium leading-[1.05] tracking-tight text-foreground sm:text-7xl md:text-[5.5rem]"
          >
            A workspace you actually <br className="hidden sm:block" /> want to live in.
          </motion.h1>
        </div>

        {/* Subtext */}
        <div className="mt-6 overflow-hidden">
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            Hardware-accelerated terminal, code editor, and AI composer running side by side. Rendered natively using Tauri v2.
          </motion.p>
        </div>

        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Button asChild size="lg" className="h-12 rounded-full px-8 font-medium shadow-[0_0_40px_color-mix(in_srgb,var(--primary)_30%,transparent)] transition-all hover:scale-[1.02] hover:shadow-[0_0_60px_color-mix(in_srgb,var(--primary)_40%,transparent)]">
            <Link href={primary.href} target="_blank" rel="noreferrer">
              <HugeiconsIcon icon={primary.icon} strokeWidth={1.5} className="mr-2 size-5" />
              {primary.label}
            </Link>
          </Button>
          <Button asChild size="lg" variant="ghost" className="h-12 rounded-full px-8 font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors">
            <Link href={SITE.github} target="_blank" rel="noreferrer">
              <HugeiconsIcon icon={GithubIcon} strokeWidth={1.5} className="mr-2 size-5" />
              View source
            </Link>
          </Button>
        </motion.div>

        {/* Homebrew Install (macOS only) */}
        {platform === "macos" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-8 flex flex-col items-center"
          >
            <p className="mb-2 text-sm text-muted-foreground">Or install via Homebrew:</p>
            <div className="flex items-center gap-2 rounded-lg border border-primary/10 bg-muted/30 px-4 py-2.5 text-sm font-mono text-muted-foreground backdrop-blur-sm">
              <code>brew tap novitaswebworks/tap && brew install novaterm</code>
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
