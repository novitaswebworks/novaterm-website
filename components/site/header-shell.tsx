"use client"

import { GithubIcon, StarIcon, Menu01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { motion } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { SITE } from "@/lib/site"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle"

const navLinks = [
  { href: "/#features", label: "Features" },
  { href: "/about", label: "About" },
  { href: "/changelog", label: "Changelog" },
  { href: "/#faq", label: "FAQ" },
  { href: "/docs", label: "Docs" },
]

interface HeaderShellProps {
  stars: string | null
  rawStars: number | null
}

export function HeaderShell({ stars, rawStars }: HeaderShellProps) {
  const [scrolled, setScrolled] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <div
        className={cn(
          "mx-3 flex max-w-6xl items-center justify-between gap-4 px-4 sm:mx-auto sm:px-6",
          "rounded-full transition-all duration-300",
          scrolled &&
            "border border-white/10 bg-white/70 px-4 py-2 shadow-lg shadow-black/[0.04] backdrop-blur-xl dark:border-white/[0.08] dark:bg-zinc-950/60 dark:shadow-black/40"
        )}
      >
        <div className="flex items-center gap-2.5">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-semibold tracking-tight"
            aria-label={`${SITE.name} home`}
          >
            <Image
              src="/novaterm_icon_256.png"
              alt=""
              width={28}
              height={28}
              priority
              className="rounded-md"
            />
            <span className="text-base">{SITE.name}</span>
          </Link>

          {stars ? (
            <motion.div
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <Link
                href={SITE.github}
                target="_blank"
                rel="noreferrer"
                aria-label={
                  rawStars != null ? `${rawStars} GitHub stars` : "GitHub stars"
                }
                className={cn(
                  "group ml-1 hidden items-center gap-1.5 rounded-full border border-border/60 bg-background/60 px-2.5 py-1 font-mono text-[11px] tracking-tight text-foreground/80 backdrop-blur-md transition-colors hover:border-foreground/30 hover:text-foreground sm:inline-flex"
                )}
              >
                <HugeiconsIcon
                  icon={StarIcon}
                  className="size-3 transition-transform group-hover:scale-110"
                  strokeWidth={2.5}
                />
                <span className="tabular-nums">{stars}</span>
              </Link>
            </motion.div>
          ) : null}
        </div>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={SITE.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            GitHub
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex rounded-full">
            <Link href="#download">
              <HugeiconsIcon icon={GithubIcon} strokeWidth={2} />
              Download
            </Link>
          </Button>

          {/* Mobile Nav Trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden ml-1 h-9 w-9">
                <HugeiconsIcon icon={Menu01Icon} strokeWidth={2} />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-full sm:w-[400px] bg-background/80 backdrop-blur-2xl border-l border-white/10 dark:bg-zinc-950/80 p-6 flex flex-col"
            >
              <SheetHeader className="p-0 mb-8 text-left">
                <SheetTitle className="flex items-center gap-2.5">
                  <Image
                    src="/novaterm_icon_256.png"
                    alt=""
                    width={28}
                    height={28}
                    className="rounded-md"
                  />
                  <span>{SITE.name}</span>
                </SheetTitle>
              </SheetHeader>
              
              <nav className="flex flex-col gap-2 flex-1">
                {navLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center px-4 py-3 text-lg font-medium rounded-xl text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}
                <Link
                  href={SITE.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center px-4 py-3 text-lg font-medium rounded-xl text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-colors"
                >
                  GitHub
                </Link>
              </nav>
              
              <div className="mt-auto border-t border-border/50 pt-6 pb-4">
                <Button asChild size="lg" className="w-full rounded-full shadow-[0_0_20px_color-mix(in_srgb,var(--primary)_20%,transparent)]">
                  <Link href="#download" onClick={() => setIsOpen(false)}>
                    <HugeiconsIcon icon={GithubIcon} strokeWidth={2} className="mr-2" />
                    Download Now
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
