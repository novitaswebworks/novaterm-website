"use client"

import { PlayIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { motion, useReducedMotion } from "motion/react"
import Image from "next/image"
import * as React from "react"

import { SITE } from "@/lib/site"
import { cn } from "@/lib/utils"

const VIDEO_ID = SITE.demoVideoId

export function Demo() {
  const [active, setActive] = React.useState(false)
  const [inView, setInView] = React.useState(false)
  const reduceMotion = useReducedMotion()
  const sectionRef = React.useRef<HTMLDivElement>(null)

  // Pause the pulsing ring when the section is offscreen or page is hidden.
  React.useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const ringActive = inView && !reduceMotion && !active

  return (
    <section id="demo" className="relative w-full px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center"
        >
          <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
            <span className="text-foreground/40">00</span>
            <span className="h-px w-8 bg-border" />
            <span>Demo</span>
          </div>
          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-4xl lg:text-5xl">
            See NovaTerm in action.
          </h2>
          <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-[17px]">
            Terminal, editor, AI agents, and web preview - in one pane.
          </p>
        </motion.div>

        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="relative mx-auto mt-12 w-full max-w-6xl"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-16 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.10),transparent_65%)] blur-3xl dark:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.07),transparent_65%)]"
          />
          <div className="relative overflow-hidden rounded-3xl border-2 border-primary/20 bg-zinc-950 shadow-[0_0_50px_color-mix(in_srgb,var(--primary)_20%,transparent)] ring-1 ring-black/10 backdrop-blur transition-all duration-700 hover:shadow-[0_0_80px_color-mix(in_srgb,var(--primary)_40%,transparent)] hover:border-primary/40">
            <div className="flex items-center gap-2 border-b border-white/[0.06] bg-zinc-950/90 px-5 py-3">
              <span className="size-3 rounded-full bg-red-500/90 ring-1 ring-white/10 ring-inset shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
              <span className="size-3 rounded-full bg-yellow-500/90 ring-1 ring-white/10 ring-inset shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
              <span className="size-3 rounded-full bg-green-500/90 ring-1 ring-white/10 ring-inset shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
              <span className="ml-4 truncate font-mono text-xs tracking-wider text-zinc-400 font-medium">
                novaterm · demo
              </span>
            </div>
            <div className="relative aspect-video w-full bg-zinc-950">
              {active ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                  title="NovaTerm demo"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 size-full"
                />
              ) : (
                <motion.button
                  type="button"
                  onClick={() => VIDEO_ID !== "novatermdemo" && setActive(true)}
                  aria-label="Play demo video"
                  whileHover="hover"
                  whileTap={{ scale: 0.985 }}
                  className={cn(
                    "group absolute inset-0 size-full cursor-pointer",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/60"
                  )}
                >
                  <Image
                    src={VIDEO_ID === "novatermdemo" ? "/novaterm-website-demo.png" : `https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                    alt="NovaTerm demo"
                    fill
                    sizes="(min-width: 1280px) 1100px, (min-width: 1024px) 900px, 100vw"
                    quality={75}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/55"
                  />

                  {/* Liquid-glass play button - positioned lower so it doesn't sit on top of the NovaTerm logo at the poster center */}
                  {VIDEO_ID !== "novatermdemo" && (
                    <>
                      <motion.span
                        aria-hidden
                        variants={{ hover: { scale: 1.05, y: -2 } }}
                        transition={{ type: "spring", stiffness: 320, damping: 22 }}
                        className="absolute bottom-[14%] left-1/2 -translate-x-1/2 sm:bottom-[12%]"
                      >
                        {/* outer pulsing ring - paused offscreen / on reduced-motion */}
                        {ringActive && (
                          <motion.span
                            aria-hidden
                            animate={{
                              scale: [1, 1.35, 1],
                              opacity: [0.55, 0, 0.55],
                            }}
                            transition={{
                              duration: 2.4,
                              ease: "easeOut",
                              repeat: Infinity,
                            }}
                            className="absolute inset-0 rounded-full border border-white/40"
                          />
                        )}

                        <span className="relative flex size-16 items-center justify-center rounded-full border border-white/20 bg-black/55 backdrop-blur-md transition-transform group-hover:scale-105 sm:size-20">
                          <HugeiconsIcon
                            icon={PlayIcon}
                            className="size-6 translate-x-0.5 text-white sm:size-8"
                            strokeWidth={1.6}
                          />
                        </span>
                      </motion.span>

                      <span className="absolute bottom-[6%] left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.25em] text-white/70 uppercase sm:text-[11px]">
                        Watch demo
                      </span>
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
