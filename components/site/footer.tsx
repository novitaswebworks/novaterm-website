import { GithubIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Image from "next/image"
import Link from "next/link"

import { SITE, VERSION } from "@/lib/site"

const productLinks = [
  { label: "Download", href: "#download" },
  { label: "Features", href: "#features" },
  { label: "Changelog", href: "/changelog" },
  { label: "About", href: "/about" },
]

const legalLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Security", href: "/security" },
]

const communityLinks = [
  { label: "GitHub", href: SITE.github, external: true },
  { label: "Issues", href: SITE.issues, external: true },
  { label: "Releases", href: SITE.githubReleases, external: true },
  { label: "X / Twitter", href: SITE.twitterUrl, external: true },
  { label: "Contact", href: "mailto:hello@novitasweb.works", external: true },
]

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border/50 bg-muted/20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5">
            <Image
              src="/novaterm_icon_256.png"
              alt=""
              width={28}
              height={28}
              className="rounded-md"
            />
            <span className="text-base font-semibold tracking-tight">
              {SITE.name}
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            {SITE.tagline}
          </p>
          <p className="mt-6 font-mono text-xs text-muted-foreground/70">
            v{VERSION} · Preview
          </p>
        </div>

        <FooterCol title="Product" links={productLinks} />
        <FooterCol title="Legal" links={legalLinks} />
        <FooterCol title="Community" links={communityLinks} />
      </div>

      <div className="border-t border-border/50">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:px-6">
          <span>
            © {new Date().getFullYear()} {SITE.name}. Built for developers, by
            developers. Developed by{" "}
            <Link
              href={SITE.companyUrl}
              target="_blank"
              rel="noopener"
              className="font-medium text-foreground/80 underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              {SITE.company}
            </Link>
            .
          </span>
          <div className="flex items-center gap-4">
            <Link
              href={SITE.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <HugeiconsIcon
                icon={GithubIcon}
                className="size-3.5"
                strokeWidth={2}
              />
              novitaswebworks/novaterm
            </Link>
            <Link
              href={SITE.twitterUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                fill="currentColor"
                className="size-3.5"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              kimetsu119
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string; external?: boolean }[]
}) {
  return (
    <div>
      <div className="text-sm font-semibold tracking-tight">{title}</div>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
