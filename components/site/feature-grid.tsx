import {
  AiIdeaIcon,
  CheckListIcon,
  CodeFolderIcon,
  CommandIcon,
  CpuIcon,
  EnergyIcon,
  Layout02Icon,
  Mic01Icon,
  Notebook01Icon,
  PaintBrush02Icon,
  RecordIcon,
  Search01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Section, SectionEyebrow, SectionHeading } from "./section"
import { SpotlightCard } from "./spotlight-card"

const items = [
  { icon: CpuIcon, title: "Enterprise Vaults", desc: "1-click AWS Secrets Manager sync injected natively into PTY without touching disk." },
  { icon: CheckListIcon, title: "AI Pull Requests", desc: "1-click PR generation using gh CLI right from the source control panel." },
  { icon: CommandIcon, title: "Tutor Mode", desc: "Cmd+Shift+L instantly summons AI to debug your failing terminal commands." },
  { icon: CommandIcon, title: "Native Vibrancy", desc: "Gorgeous macOS native glassmorphism, acrylic blurs, and dynamic theming." },
  { icon: Mic01Icon, title: "Voice input", desc: "Talk to your terminal. Whisper or your provider of choice." },
  { icon: CpuIcon, title: "Local LLMs", desc: "Run fully offline through LM Studio. Your code stays on disk." },
  { icon: AiIdeaIcon, title: "AI autocomplete", desc: "Fast AI autocompletion inside code editor." },
  { icon: Notebook01Icon, title: "NOVATERM.md", desc: "Per-project memory and config - versioned with your repo." },
  { icon: CheckListIcon, title: "Plans & tasks", desc: "Break work into tracked steps. Agents pick up where you left off." },
  { icon: PaintBrush02Icon, title: "Prebuilt themes", desc: "Atomone, Tokyo Night, and friends - drop-in." },
  { icon: Layout02Icon, title: "Multi-tab", desc: "Terminals, editors, and previews side by side." },
  { icon: Search01Icon, title: "Fast search", desc: "Ripgrep-class speed across files, with keyboard navigation." },
  { icon: RecordIcon, title: "AI Edit Diffs", desc: "Review every agent change inline before it touches disk." },
  { icon: CommandIcon, title: "Vim mode", desc: "Modal editing first-class. Bring your dotfiles." },
  { icon: CodeFolderIcon, title: "Snippets & skills", desc: "Reusable workflows your agents can call by name." },
  { icon: EnergyIcon, title: "Tiny footprint", desc: "Under 10 MB on disk. Boots in 300 ms. No Electron tax." },
]

export function FeatureGrid() {
  return (
    <Section id="more">
      <div className="mx-auto max-w-3xl">
        <SectionEyebrow>Toolkit</SectionEyebrow>
        <SectionHeading>More built in. No plugins required.</SectionHeading>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <SpotlightCard key={it.title} className="p-8 backdrop-blur-md transition-all duration-500 hover:scale-[1.02] hover:border-primary/50 hover:shadow-[0_0_30px_color-mix(in_srgb,var(--primary)_20%,transparent)]">
            <div className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[0_0_15px_color-mix(in_srgb,var(--primary)_50%,transparent)]">
              <HugeiconsIcon icon={it.icon} className="size-5" strokeWidth={1.8} />
            </div>
            <div className="mt-6 text-base font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
              {it.title}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {it.desc}
            </p>
          </SpotlightCard>
        ))}
      </div>
    </Section>
  )
}
