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

  // If nothing was parsed, treat lines as "Changed" items unless it's known boilerplate
  if (!groups.length && notes.trim()) {
    const items = notes
      .split("\n")
      .map((l) => l.replace(/^[-*]\s+/, "").trim())
      .filter((l) => l && !l.startsWith("#") && !/see the assets to download/i.test(l))
    if (items.length) groups.push({ kind: "Changed", items })
  }

  return groups
}

const groups = parseNotes(rawNotes)
const isBoilerplate = !groups.length

// Highlight = first bullet of "Added" or first bullet overall
const highlight =
  groups.find((g) => g.kind === "Added")?.items[0] ??
  groups[0]?.items[0] ??
  `NovaTerm v${version} release with stability and performance updates.`

const finalGroups = groups.length
  ? groups
  : [
      {
        kind: "Changed",
        items: ["Performance improvements, stability updates, and general maintenance."],
      },
    ]

// ── 3. Serialize as TypeScript ────────────────────────────────────────────────
function serializeGroups(targetGroups) {
  return targetGroups
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
${serializeGroups(finalGroups)},
    ],
  },`

// ── 4. Upsert into CHANGELOG array in lib/changelog.ts (Idempotent) ──────────
const changelogPath = join(ROOT, "lib", "changelog.ts")
let changelogContent = readFileSync(changelogPath, "utf8")

function findEntryRange(content, ver) {
  const marker = new RegExp(`version:\\s*["']${ver}["']`)
  const match = marker.exec(content)
  if (!match) return null
  const start = content.lastIndexOf("{", match.index)
  let depth = 0
  let end = -1
  for (let i = start; i < content.length; i++) {
    if (content[i] === "{") depth++
    else if (content[i] === "}") {
      depth--
      if (depth === 0) {
        end = i
        if (content[i + 1] === ",") end++
        break
      }
    }
  }
  return { start, end }
}

function removeAllEntriesForVersion(content, ver) {
  let res = content
  while (true) {
    const range = findEntryRange(res, ver)
    if (!range) break
    let s = range.start
    while (s > 0 && (res[s - 1] === " " || res[s - 1] === "\t")) s--
    let e = range.end
    while (res[e + 1] === " " || res[e + 1] === "\t") e++
    if (res[e + 1] === "\n") e++
    res = res.slice(0, s) + res.slice(e + 1)
  }
  return res
}

const existingRange = findEntryRange(changelogContent, version)

if (existingRange && isBoilerplate) {
  console.log(`ℹ v${version} already exists in lib/changelog.ts and incoming notes are generic/boilerplate. Preserving existing notes.`)
} else {
  // Remove any existing entries for this version to prevent duplicates
  changelogContent = removeAllEntriesForVersion(changelogContent, version)

  // Prepend clean entry to top of array
  changelogContent = changelogContent.replace(
    /export const CHANGELOG: ChangelogEntry\[\] = \[/,
    `export const CHANGELOG: ChangelogEntry[] = [\n${newEntry}`
  )

  writeFileSync(changelogPath, changelogContent)
  console.log(`✓ Updated v${version} in lib/changelog.ts without duplicates`)
}

console.log("Done! All changes processed.")
