"use client"

import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function BackgroundWaves() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (pathname?.startsWith("/docs")) return null

  if (!mounted) {
    return <div className="pointer-events-none fixed inset-0 -z-10 bg-background" />
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      {/* Eye-catching geometric animated grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_srgb,var(--border)_60%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--border)_60%,transparent)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_40%,transparent_100%)] opacity-50 dark:opacity-100" />

      {/* Dynamic Aurora Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden opacity-60 dark:opacity-100">
        <div className="absolute top-[-10%] left-[-10%] h-[40vw] w-[40vw] animate-blob rounded-full bg-primary/30 blur-[100px]" />
        <div className="absolute top-[20%] right-[-10%] h-[35vw] w-[35vw] animate-blob rounded-full bg-blue-500/30 blur-[100px] [animation-delay:2s]" />
        <div className="absolute bottom-[-20%] left-[20%] h-[50vw] w-[50vw] animate-blob rounded-full bg-purple-500/20 blur-[120px] [animation-delay:4s]" />
      </div>

      {/* Smooth fades for seamless integration with content */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      
      {/* Center vignette */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,var(--background)_120%)] opacity-80"
        style={{ ["--background" as never]: "var(--background)" }}
      />
    </div>
  )
}
