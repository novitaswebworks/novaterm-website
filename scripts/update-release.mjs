#!/usr/bin/env node
/**
 * update-release.mjs
 *
 * Called by the "sync-release" GitHub Actions workflow.
 * Usage: node scripts/update-release.mjs <version> <release_notes>
 *
 * What it does:
 *  1. Updates VERSION in lib/site.ts  (all download URLs follow automatically)
 *  2. Prepends a new entry to lib/changelog.ts
 */

import { readFileSync, writeFileSync } from "fs"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, "..")

// ── Args ─────────────────────────────────────────────────────────────────────
const version = process.argv[2]?.replace(/^v/, "")
const rawNotes = process.argv[3] ?? ""

if (!version) {
  console.error("Usage: node scripts/update-release.mjs <version> [release_notes]")
  process.exit(1)
}

const today = new Date().toISOString().split("T")[0]

// ── 1. Update VERSION in lib/site.ts ─────────────────────────────────────────
const sitePath = join(ROOT, "lib", "site.ts")
let siteContent = readFileSync(sitePath, "utf8")
siteContent = siteContent.replace(
  /export const VERSION = "[^"]+"/,
  `export const VERSION = "${version}"`
)
writeFileSync(sitePath, siteContent)
console.log(`✓ Updated VERSION to ${version} in lib/site.ts`)

// ── 2. Parse release notes into changelog groups ──────────────────────────────
/**
 * GitHub release notes typically look like:
 *   ## What's Changed
 *   ### Added
 *   - New feature
 *   ### Fixed
 *   - Bug fix
 *
 * We parse "Added", "Changed", "Fixed" sections. Everything else falls
 * into "Changed" so we never drop content.
 */
function parseNotes(notes) {
  const groups = []
  const lines = notes.split("\n")
  let currentKind = null
  let currentItems = []

  const kindMap = {
    added: "Added",
    "what's new": "Added",
    "new features": "Added",
    changed: "Changed",
    improved: "Changed",
    improvements: "Changed",
    fixed: "Fixed",
    "bug fixes": "Fixed",
  }

  function flush() {
    if (currentKind && currentItems.length) {
      groups.push({ kind: currentKind, items: [...currentItems] })
    }
    currentItems = []
  }

  for (const line of lines) {
    const heading = line.replace(/^#{1,3}\s*/, "").toLowerCase().trim()
    if (kindMap[heading]) {
      flush()
      currentKind = kindMap[heading]
      continue
    }
    const bullet = line.match(/^[-*]\s+(.+)/)
    if (bullet && currentKind) {
      currentItems.push(bullet[1].trim())
    }
  }
  flush()

  // If nothing was parsed, treat the whole body as a single "Changed" item
  if (!groups.length && notes.trim()) {
    const items = notes
      .split("\n")
      .map((l) => l.replace(/^[-*]\s+/, "").trim())
      .filter((l) => l && !l.startsWith("#"))
    if (items.length) groups.push({ kind: "Changed", items })
  }

  return groups
}

const groups = parseNotes(rawNotes)

// Highlight = first bullet of "Added" or first bullet overall
const highlight =
  groups.find((g) => g.kind === "Added")?.items[0] ??
  groups[0]?.items[0] ??
  `NovaTerm ${version} release.`

// ── 3. Serialize as TypeScript ────────────────────────────────────────────────
function serializeGroups(groups) {
  return groups
    .map((g) => {
      const items = g.items.map((i) => `          "${i.replace(/"/g, '\\"')}"`).join(",\n")
      return `      {\n        kind: "${g.kind}",\n        items: [\n${items},\n        ],\n      }`
    })
    .join(",\n")
}

const newEntry = `  {
    version: "${version}",
    date: "${today}",
    highlight: "${highlight.replace(/"/g, '\\"')}",
    groups: [
${serializeGroups(groups)},
    ],
  },`

// ── 4. Prepend to CHANGELOG array in lib/changelog.ts ────────────────────────
const changelogPath = join(ROOT, "lib", "changelog.ts")
let changelogContent = readFileSync(changelogPath, "utf8")

// Insert right after "export const CHANGELOG: ChangelogEntry[] = ["
changelogContent = changelogContent.replace(
  /export const CHANGELOG: ChangelogEntry\[\] = \[/,
  `export const CHANGELOG: ChangelogEntry[] = [\n${newEntry}`
)

writeFileSync(changelogPath, changelogContent)
console.log(`✓ Prepended v${version} to lib/changelog.ts`)
console.log("Done! All changes written. GitHub Actions will commit and push.")
