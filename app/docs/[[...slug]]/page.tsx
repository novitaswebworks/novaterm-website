import { source } from "@/lib/source"
import { SITE } from "@/lib/site"
import { DocsBody, DocsPage } from "fumadocs-ui/page"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import defaultMdxComponents from "fumadocs-ui/mdx"
import fs from "node:fs"
import path from "node:path"
import { PageActions } from "@/components/docs/page-actions"

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const page = source.getPage(params.slug)

  if (!page) notFound()

  const MDX = page.data.body

  const filePath =
    page.absolutePath || path.join(process.cwd(), "content/docs", page.path)
  const rawMarkdown = fs.readFileSync(/*turbopackIgnore: true*/ filePath, "utf-8")

  const slugs = params.slug ?? []
  const slugPath = slugs.join("/")
  const gitUrl = `https://github.com/novitaswebworks/novaterm-website/blob/main/content/docs/${page.path}`
  const rawMarkdownUrl = `/docs/${slugPath ? slugPath + ".md" : "index.md"}`
  const docPublicUrl = `${SITE.url}/docs/${slugPath ? slugPath + ".md" : "index.md"}`
  const sciraUrl = `https://scira.app/?q=${encodeURIComponent(docPublicUrl)}`
  const chatgptUrl = `https://chatgpt.com/?q=${encodeURIComponent("Read this page: " + docPublicUrl)}`
  const claudeUrl = `https://claude.ai/new?q=${encodeURIComponent(docPublicUrl)}`
  const cursorUrl = "https://cursor.com"

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <h1 className="mb-2 text-3xl font-bold tracking-tight">
        {page.data.title}
      </h1>
      <p className="mb-4 text-muted-foreground">{page.data.description}</p>
      <PageActions
        rawMarkdown={rawMarkdown}
        gitUrl={gitUrl}
        rawMarkdownUrl={rawMarkdownUrl}
        sciraUrl={sciraUrl}
        chatgptUrl={chatgptUrl}
        claudeUrl={claudeUrl}
        cursorUrl={cursorUrl}
      />
      <hr />
      <DocsBody>
        <MDX components={{ ...defaultMdxComponents }} />
      </DocsBody>
    </DocsPage>
  )
}

export async function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>
}): Promise<Metadata> {
  const params = await props.params
  const page = source.getPage(params.slug)

  if (!page) notFound()

  const pagePath = params.slug?.join("/") ?? ""
  const pageUrl = `${SITE.url}/docs${pagePath ? "/" + pagePath : ""}`
  const ogUrl = `/og/docs/${pagePath}`

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: { canonical: pageUrl },
    openGraph: {
      type: "article",
      title: `${page.data.title} | ${SITE.name} Docs`,
      description: page.data.description,
      url: pageUrl,
      siteName: SITE.name,
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 630,
          alt: page.data.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.data.title} | ${SITE.name} Docs`,
      description: page.data.description,
      site: SITE.twitter,
      creator: SITE.twitter,
      images: [ogUrl],
    },
  }
}
