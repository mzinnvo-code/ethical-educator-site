#!/usr/bin/env node
/**
 * Walks the static image directories and emits a `.webp` sibling for every
 * `.png` and `.jpg`/`.jpeg` source. Skips files whose WebP is already up to
 * date (mtime check). Safe to re-run; only does work when there's actual
 * work to do.
 *
 * Run manually after adding new images:
 *   npm run optimize-images
 *
 * Not chained into `npm run build` on purpose:
 *   - Sharp is a 200MB+ native dep; we don't want CI to install it on every
 *     build.
 *   - WebP files are committed to the repo so the deployed site serves them
 *     without any build-time generation step.
 *   - The <Image> component (src/components/Image.jsx) uses <picture> with a
 *     WebP source + PNG/JPG fallback, so missing WebPs degrade gracefully
 *     (the browser just serves the original PNG/JPG).
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "..");

const TARGETS = [
  path.join(REPO_ROOT, "public", "illustrations"),
  path.join(REPO_ROOT, "public", "article-art"),
  path.join(REPO_ROOT, "public", "experiment-scenes"),
];

const RASTER_EXT = new Set([".png", ".jpg", ".jpeg"]);

async function walk(dir, files = []) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch (err) {
    if (err.code === "ENOENT") return files;
    throw err;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full, files);
    } else if (entry.isFile()) {
      files.push(full);
    }
  }
  return files;
}

async function needsWebp(srcPath, webpPath) {
  try {
    const [srcStat, webpStat] = await Promise.all([fs.stat(srcPath), fs.stat(webpPath)]);
    return srcStat.mtimeMs > webpStat.mtimeMs;
  } catch (err) {
    if (err.code === "ENOENT") return true;
    throw err;
  }
}

async function convertOne(srcPath) {
  const ext = path.extname(srcPath).toLowerCase();
  if (!RASTER_EXT.has(ext)) return null;
  const webpPath = srcPath.slice(0, -ext.length) + ".webp";
  if (!(await needsWebp(srcPath, webpPath))) return { skipped: true, srcPath, webpPath };
  await sharp(srcPath).webp({ quality: 82, effort: 5 }).toFile(webpPath);
  const [srcStat, webpStat] = await Promise.all([fs.stat(srcPath), fs.stat(webpPath)]);
  return {
    skipped: false,
    srcPath,
    webpPath,
    srcBytes: srcStat.size,
    webpBytes: webpStat.size,
  };
}

function fmtBytes(n) {
  if (n < 1024) return `${n}B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)}KB`;
  return `${(n / 1024 / 1024).toFixed(2)}MB`;
}

async function main() {
  let totalSrc = 0;
  let totalWebp = 0;
  let converted = 0;
  let skipped = 0;
  for (const dir of TARGETS) {
    const files = await walk(dir);
    for (const file of files) {
      const result = await convertOne(file);
      if (!result) continue;
      if (result.skipped) {
        skipped++;
        continue;
      }
      converted++;
      totalSrc += result.srcBytes;
      totalWebp += result.webpBytes;
      const savings = result.srcBytes > 0 ? Math.round((1 - result.webpBytes / result.srcBytes) * 100) : 0;
      const rel = path.relative(REPO_ROOT, result.srcPath);
      console.log(`  ✓ ${rel}  ${fmtBytes(result.srcBytes)} → ${fmtBytes(result.webpBytes)}  (-${savings}%)`);
    }
  }
  console.log("");
  console.log(`Converted ${converted} file${converted === 1 ? "" : "s"}, skipped ${skipped} up-to-date.`);
  if (converted > 0) {
    const totalSavings = Math.round((1 - totalWebp / totalSrc) * 100);
    console.log(`Total: ${fmtBytes(totalSrc)} → ${fmtBytes(totalWebp)}  (-${totalSavings}%)`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
