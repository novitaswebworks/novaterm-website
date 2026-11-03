import { SITE } from "./site"

const REPO_PATH = SITE.github.replace(/^https?:\/\/github\.com\//, "")

async function fromGithub(): Promise<number | null> {
  const res = await fetch(`https://api.github.com/repos/${REPO_PATH}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "novaterm-website",
      ...(process.env.GITHUB_TOKEN
        ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
        : {}),
    },
    next: { revalidate: 600 },
  })
  if (!res.ok) return null
  const data = (await res.json()) as { stargazers_count?: number }
  return typeof data.stargazers_count === "number" ? data.stargazers_count : null
}

// Unauthenticated GitHub calls are limited to 60/hr per IP, which shared
// hosting IPs exhaust quickly, so fall back to a mirror that isn't.
async function fromMirror(): Promise<number | null> {
  const res = await fetch(`https://ungh.cc/repos/${REPO_PATH}`, {
    next: { revalidate: 600 },
  })
  if (!res.ok) return null
  const data = (await res.json()) as { repo?: { stars?: number } }
  return typeof data.repo?.stars === "number" ? data.repo.stars : null
}

export async function getRepoStars(): Promise<number | null> {
  for (const source of [fromGithub, fromMirror]) {
    try {
      const stars = await source()
      if (stars != null) return stars
    } catch {}
  }
  return null
}

export function formatStars(n: number): string {
  if (n >= 10000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}
