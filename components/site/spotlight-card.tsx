"use client"

import { motion, useMotionTemplate, useMotionValue } from "motion/react"
import { MouseEvent, ReactNode } from "react"
import { cn } from "@/lib/utils"

export function SpotlightCard({ children, className }: { children: ReactNode; className?: string }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div
      className={cn("group relative rounded-2xl border bg-background/80 overflow-hidden", className)}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              450px circle at ${mouseX}px ${mouseY}px,
              color-mix(in srgb, var(--primary) 15%, transparent),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full w-full">{children}</div>
    </div>
  )
}
