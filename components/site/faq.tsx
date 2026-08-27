import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Section, SectionEyebrow, SectionHeading, SectionLead } from "./section"

const faqs = [
  {
    q: "Is NovaTerm really free?",
    a: "Yes. NovaTerm is free and fully open-source. There's no paid tier, no account, and no telemetry by default. Star us on GitHub if it saves you time.",
  },
  {
    q: "Do I need an account or sign-up?",
    a: "No. Download, install, run. Bring your own keys for cloud providers (OpenAI, Anthropic, Google, etc.) or skip them entirely and run local models via LM Studio.",
  },
  {
    q: "Which AI models are supported?",
    a: "All major providers - OpenAI, Anthropic, Google, Groq, Cerebras, xAI, and any OpenAI-compatible endpoint. Plus full local support through LM Studio and other OpenAI-compatible local runtimes.",
  },
  {
    q: "How do local models work?",
    a: "Point NovaTerm at a running LM Studio (or any OpenAI-compatible local server), pick a model, and you're done. Inference stays on your machine - your code, prompts, and diffs never leave the box.",
  },
  {
    q: "Is my code sent anywhere?",
    a: "Only to the provider you explicitly configure. With local models, nothing leaves your machine. NovaTerm adds zero analytics around your code or prompts.",
  },
  {
    q: "Which OSes are supported?",
    a: "macOS (Apple Silicon / Intel), Linux (AppImage / .deb / .rpm), and Windows (x86_64 NSIS installer) are all available today.",
  },
  {
    q: "Where do I report bugs or request features?",
    a: "Open an issue on GitHub at github.com/novitaswebworks/novaterm - we read everything.",
  },
]

export function FAQ() {
  return (
    <Section id="faq">
      <div className="mx-auto max-w-3xl text-center">
        <SectionEyebrow>FAQ</SectionEyebrow>
        <SectionHeading>Questions, answered.</SectionHeading>
        <SectionLead className="mx-auto">
          Still curious? Open a discussion on GitHub - we&apos;re around.
        </SectionLead>
      </div>

      <div className="mx-auto mt-12 max-w-3xl">
        <Accordion
          type="single"
          collapsible
          className="flex flex-col gap-4 rounded-none border-none bg-transparent"
        >
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="rounded-2xl border border-white/10 bg-black/20 px-2 backdrop-blur-md transition-all hover:bg-black/40 data-[state=open]:bg-black/40 data-[state=open]:border-primary/30">
              <AccordionTrigger className="text-foreground/90 hover:text-white transition-colors text-lg font-medium py-5 px-4 text-left">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground/90 leading-relaxed text-base px-4 pb-6 pt-2">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  )
}
