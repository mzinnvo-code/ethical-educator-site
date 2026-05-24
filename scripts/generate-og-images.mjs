#!/usr/bin/env node
/**
 * Generates a per-page OG card for every entry in src/data/ogPages.js.
 * Output: dist/og/<page-id with slashes flattened>.png (1200×630).
 *
 * Each card has the page accent as a left stripe, the brand mark + section
 * eyebrow at the top, the page title in the middle, and the author byline +
 * domain at the bottom. Pages NOT listed in ogPages.js fall back to the
 * default OG image set in index.html.
 *
 * Runs after `vite build` (chained in package.json). Uses @resvg/resvg-js
 * for SVG→PNG (pure JS, no native deps).
 *
 * To add a page: append to OG_PAGES in src/data/ogPages.js. The card
 * regenerates on the next build.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import { OG_PAGES, BRAND } from "../src/data/ogPages.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "..");
const DIST = path.join(REPO_ROOT, "dist");
const OUT = path.join(DIST, "og");

const W = 1200;
const H = 630;

function escapeXml(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Naive word-wrap that aims for ~14 chars per line for the big title
// (looks balanced at 64px on a 1200×630 card). Splits on spaces.
function wrapTitle(text, maxLines = 4, maxCharsPerLine = 30) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let current = "";
  for (const w of words) {
    if (!current) {
      current = w;
    } else if ((current + " " + w).length <= maxCharsPerLine) {
      current += " " + w;
    } else {
      lines.push(current);
      current = w;
      if (lines.length === maxLines - 1) {
        // Last line: jam the rest in (truncate if needed)
        let rest = w;
        for (const more of words.slice(words.indexOf(w) + 1)) rest += " " + more;
        if (rest.length > maxCharsPerLine + 4) rest = rest.slice(0, maxCharsPerLine + 1) + "…";
        lines.push(rest);
        return lines;
      }
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, maxLines);
}

function renderSvg({ title, section, accent }) {
  const titleLines = wrapTitle(title, 4, 30);
  const lineHeight = 76;
  const titleStartY = H / 2 - ((titleLines.length - 1) * lineHeight) / 2 + 18;

  const titleTspans = titleLines
    .map((line, i) => `<tspan x="96" dy="${i === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`)
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <!-- Background -->
  <rect width="${W}" height="${H}" fill="${BRAND.bg}"/>
  <rect width="${W}" height="${H}" fill="url(#bgGrad)" opacity="0.6"/>
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="${W}" y2="${H}" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.18"/>
      <stop offset="0.6" stop-color="${BRAND.bg}" stop-opacity="0"/>
      <stop offset="1" stop-color="${BRAND.bg}" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <!-- Left accent stripe -->
  <rect x="0" y="0" width="14" height="${H}" fill="${accent}"/>

  <!-- Subtle border -->
  <rect x="14" y="0" width="${W - 14}" height="${H}" fill="none" stroke="${accent}" stroke-opacity="0.15" stroke-width="1"/>

  <!-- Brand mark + name (top-left) -->
  <g transform="translate(96, 80)">
    <rect x="0" y="0" width="44" height="44" rx="10" fill="${accent}" fill-opacity="0.18" stroke="${accent}" stroke-opacity="0.4" stroke-width="1"/>
    <text x="22" y="29" fill="${accent}" font-family="Georgia, 'Times New Roman', serif" font-size="22" font-weight="700" text-anchor="middle">EC</text>
    <text x="62" y="29" fill="${BRAND.textPrimary}" font-family="Georgia, 'Times New Roman', serif" font-size="22" font-weight="600">${escapeXml(BRAND.name)}</text>
  </g>

  <!-- Section eyebrow -->
  <text x="96" y="180" fill="${accent}" font-family="'Helvetica Neue', Arial, sans-serif" font-size="20" font-weight="700" letter-spacing="3">${escapeXml(section.toUpperCase())}</text>

  <!-- Big title -->
  <text x="96" y="${titleStartY}" fill="${BRAND.textPrimary}" font-family="Georgia, 'Times New Roman', serif" font-size="64" font-weight="700">
    ${titleTspans}
  </text>

  <!-- Footer rule -->
  <line x1="96" y1="${H - 92}" x2="${W - 96}" y2="${H - 92}" stroke="${BRAND.textMuted}" stroke-opacity="0.2" stroke-width="1"/>

  <!-- Author byline (bottom-left) -->
  <text x="96" y="${H - 52}" fill="${BRAND.textSecondary}" font-family="Georgia, 'Times New Roman', serif" font-size="22" font-style="italic">${escapeXml(BRAND.author)}</text>

  <!-- Domain (bottom-right) -->
  <text x="${W - 96}" y="${H - 52}" fill="${BRAND.textMuted}" font-family="'JetBrains Mono', 'Courier New', monospace" font-size="20" text-anchor="end">${escapeXml(BRAND.url)}</text>
</svg>`;
}

function flattenId(id) {
  // /thought-experiments/k-5 → thought-experiments_k-5.png
  return id.replace(/\//g, "_");
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function renderOne(pageMeta) {
  const svg = renderSvg(pageMeta);
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: W },
    background: BRAND.bg,
    font: { loadSystemFonts: true, defaultFontFamily: "Georgia" },
  });
  const png = resvg.render().asPng();
  const outPath = path.join(OUT, `${flattenId(pageMeta.id)}.png`);
  await fs.writeFile(outPath, png);
  return { outPath, bytes: png.length };
}

function fmtBytes(n) {
  if (n < 1024) return `${n}B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)}KB`;
  return `${(n / 1024 / 1024).toFixed(2)}MB`;
}

async function main() {
  try {
    await fs.access(DIST);
  } catch {
    console.error(`generate-og-images: dist/ not found at ${DIST}. Run \`vite build\` first.`);
    process.exit(1);
  }
  await ensureDir(OUT);

  let total = 0;
  for (const page of OG_PAGES) {
    const { outPath, bytes } = await renderOne(page);
    total += bytes;
    console.log(`  ✓ ${path.relative(REPO_ROOT, outPath)}  (${fmtBytes(bytes)})`);
  }
  console.log(`\nGenerated ${OG_PAGES.length} cards, ${fmtBytes(total)} total.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
