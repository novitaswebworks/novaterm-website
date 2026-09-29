import type { Metadata, Viewport } from "next"
import { Space_Grotesk, Geist_Mono } from "next/font/google"

import { BackgroundWaves } from "@/components/site/background-waves"
import { ThemeProvider } from "@/components/theme-provider"
import { SITE } from "@/lib/site"
import { cn } from "@/lib/utils"
import { Analytics } from "@vercel/analytics/next"
import MouseEffects from "@/components/originkit/ui/clickeffects"
import "./globals.css"

const fontSans = Space_Grotesk({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | The AI-Native Terminal & Developer Workspace`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "NovaTerm is a GPU-accelerated terminal and developer workspace with an integrated code editor, Model Context Protocol (MCP) agent tools, and offline local AI via Ollama. Built with Rust and Tauri for under 10MB footprint and 300ms launch.",
  applicationName: SITE.name,
  keywords: [
    "AI terminal",
    "GPU terminal",
    "developer workspace",
    "AI code editor",
    "Model Context Protocol",
    "MCP terminal",
    "Ollama terminal",
    "local AI terminal",
    "offline LLM coding",
    "Tauri terminal",
    "Rust terminal emulator",
    "DevContainer terminal",
    "SSH remote workspace",
    "ghost text autocomplete",
    "Warp alternative",
    "iTerm2 alternative",
    "Ghostty alternative",
    "Alacritty alternative",
    "Hyper alternative",
    "open source terminal",
    "BYOK AI terminal",
  ],
  authors: [{ name: "Novitas Web Works", url: SITE.github }],
  creator: "Novitas Web Works",
  publisher: "Novitas Web Works",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE.url,
    title: `${SITE.name} | The AI-Native Terminal & Developer Workspace`,
    description:
      "NovaTerm is a GPU-accelerated terminal and developer workspace with an integrated code editor, Model Context Protocol (MCP) agent tools, and offline local AI via Ollama.",
    siteName: SITE.name,
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "NovaTerm - The AI-Native Terminal & Developer Workspace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | The AI-Native Terminal & Developer Workspace`,
    description:
      "NovaTerm is a GPU-accelerated terminal and developer workspace with an integrated code editor, Model Context Protocol (MCP) agent tools, and offline local AI via Ollama.",
    site: SITE.twitter,
    creator: SITE.twitter,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "NovaTerm - The AI-Native Terminal & Developer Workspace",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/novaterm_icon_256.png", sizes: "256x256", type: "image/png" },
      { url: "/novaterm-icon.png", sizes: "1024x1024", type: "image/png" },
    ],
    apple: [{ url: "/novaterm_icon_256.png", sizes: "256x256" }],
    shortcut: ["/novaterm_icon_256.png"],
  },
  category: "technology",
  classification: "Developer Tools / Terminal Emulator",
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#080c14" },
  ],
  width: "device-width",
  initialScale: 1,
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Novitas Web Works",
  url: SITE.url,
  logo: `${SITE.url}/novaterm-icon.png`,
  sameAs: [
    SITE.github,
    SITE.youtube,
  ],
}

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE.url}/api/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        fontSans.variable
      )}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider defaultTheme="dark">
          <BackgroundWaves />
          {children}
          <div className="pointer-events-none fixed inset-0 z-50 text-primary">
            <MouseEffects interactionMode="sniper" color="var(--primary)" showLabel={false} />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
