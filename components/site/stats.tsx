import { Section } from "./section"

const stats = [
  { value: "< 10MB", label: "App size" },
  { value: "~300ms", label: "Cold start" },
  { value: "No telemetry", label: "Ever" },
  { value: "Apache-2.0", label: "Open source" },
]

export function Stats() {
  return (
    <Section className="!py-12 sm:!py-16">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-primary/20 bg-primary/20 md:grid-cols-4 shadow-[0_0_40px_color-mix(in_srgb,var(--primary)_10%,transparent)]">
        {stats.map((s) => (
          <div key={s.label} className="group bg-background/90 backdrop-blur-md px-6 py-10 text-center transition-all duration-300 hover:bg-background/60 hover:scale-[1.02] hover:z-10 hover:shadow-[0_0_20px_color-mix(in_srgb,var(--primary)_30%,transparent)] border border-transparent hover:border-primary/30 rounded-lg">
            <div className="font-mono text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent sm:text-4xl drop-shadow-sm transition-transform duration-300 group-hover:scale-105">
              {s.value}
            </div>
            <div className="mt-3 text-xs tracking-wider text-muted-foreground uppercase font-semibold group-hover:text-primary transition-colors duration-300">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
