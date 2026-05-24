#!/usr/bin/env node
/**
 * Emits feed.xml (RSS 2.0) and feed.json (JSON Feed 1.1) into dist/,
 * sourced from src/data/whatsNew.js. Runs after `vite build` (chained in
 * package.json's build script), so feeds always reflect the latest entries.
 *
 * Teachers who use Feedly, Inoreader, NetNewsWire, etc. can subscribe via
 * /feed.xml. The JSON feed is the modern alternative most readers support.
 *
 * To add an entry: append to WHATS_NEW in src/data/whatsNew.js. The feeds
 * regenerate on the next build automatically.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getWhatsNewSorted, getTypeLabel } from "../src/data/whatsNew.js";
import { SITE } from "../src/siteConfig.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "..");
const DIST = path.join(REPO_ROOT, "dist");

const SITE_URL = SITE.origin;
const SITE_TITLE = `${SITE.brandName} — What's New`;
const SITE_DESCRIPTION =
  `Updates to ${SITE.brandName}: new thought experiments, research, features, and resources for K–12 teachers, school leaders, and parents.`;
const AUTHOR_NAME = SITE.authorName;
const AUTHOR_EMAIL = SITE.publicEmail;

function escapeXml(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function abs(url) {
  if (!url) return SITE_URL;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return new URL(url, SITE_URL).toString();
}

function rfc822(iso) {
  // Treat the date as midnight UTC so feeds are deterministic across timezones.
  return new Date(`${iso}T00:00:00Z`).toUTCString();
}

function iso8601(iso) {
  return new Date(`${iso}T00:00:00Z`).toISOString();
}

function buildRss(items) {
  const buildDate = new Date().toUTCString();
  const itemsXml = items
    .map((it) => {
      const link = abs(it.url);
      const category = getTypeLabel(it.type);
      // Use the url as the guid since IDs may change but URLs are stable
      // (and we explicitly mark isPermaLink="true" so readers treat them as links).
      return `    <item>
      <title>${escapeXml(it.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${rfc822(it.date)}</pubDate>
      <category>${escapeXml(category)}</category>
      <description>${escapeXml(it.blurb)}</description>
      <dc:creator>${escapeXml(AUTHOR_NAME)}</dc:creator>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}/whats-new</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-US</language>
    <copyright>CC BY-NC 4.0 — ${escapeXml(AUTHOR_NAME)}</copyright>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <generator>scripts/generate-feeds.mjs</generator>
${itemsXml}
  </channel>
</rss>
`;
}

function buildJsonFeed(items) {
  return {
    version: "https://jsonfeed.org/version/1.1",
    title: SITE_TITLE,
    home_page_url: `${SITE_URL}/whats-new`,
    feed_url: `${SITE_URL}/feed.json`,
    description: SITE_DESCRIPTION,
    language: "en-US",
    authors: [{ name: AUTHOR_NAME, url: SITE_URL, email: AUTHOR_EMAIL }],
    items: items.map((it) => ({
      id: abs(it.url),
      url: abs(it.url),
      title: it.title,
      content_text: it.blurb,
      summary: it.blurb,
      date_published: iso8601(it.date),
      tags: [getTypeLabel(it.type)],
    })),
  };
}

async function main() {
  // dist/ should already exist from `vite build`; this script runs after.
  try {
    await fs.access(DIST);
  } catch {
    console.error(`generate-feeds: dist/ not found at ${DIST}. Run \`vite build\` first.`);
    process.exit(1);
  }

  const items = getWhatsNewSorted();
  if (items.length === 0) {
    console.warn("generate-feeds: WHATS_NEW is empty — emitting feeds with no items.");
  }

  const rss = buildRss(items);
  const json = buildJsonFeed(items);

  const rssPath = path.join(DIST, "feed.xml");
  const jsonPath = path.join(DIST, "feed.json");
  await fs.writeFile(rssPath, rss, "utf8");
  await fs.writeFile(jsonPath, JSON.stringify(json, null, 2), "utf8");

  console.log(`  ✓ ${path.relative(REPO_ROOT, rssPath)}  (${rss.length} bytes, ${items.length} items)`);
  console.log(`  ✓ ${path.relative(REPO_ROOT, jsonPath)}  (${JSON.stringify(json).length} bytes, ${items.length} items)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
