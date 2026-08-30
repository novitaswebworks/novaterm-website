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
    default: `${SITE.name} - ${SITE.tagline}`,
    template: `%s - ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "AI terminal",
    "AI IDE",
    "AI code editor",
    "agentic coding",
    "React terminal",
    "xterm.js",
    "Tauri terminal",
    "Terminal Emulator",
    "BYOK",
    "developer tools",
    "open source terminal",
  ],
  authors: [{ name: "NovaTerm", url: SITE.github }],
  creator: "NovaTerm",
  publisher: "NovaTerm",
  alternates: { canonical: SITE.url },
  openGraph: {
    type: "website",
    url: SITE.url,
    title: `${SITE.name} - ${SITE.tagline}`,
    description: SITE.description,
    siteName: SITE.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} - ${SITE.tagline}`,
    description: SITE.description,
  },
  icons: {
    icon: [
      { url: "/novaterm_icon_256.png", sizes: "256x256", type: "image/png" },
      { url: "/novaterm-icon.png", sizes: "1024x1024", type: "image/png" },
    ],
    apple: [{ url: "/novaterm_icon_256.png", sizes: "256x256" }],
    shortcut: ["/novaterm_icon_256.png"],
  },
  category: "technology",
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
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
