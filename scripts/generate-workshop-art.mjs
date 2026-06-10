#!/usr/bin/env node
// Wonder Workshop art pipeline — dual mode:
//
//   npm run art:prompts     write ART-PROMPTS.md (generate manually in the
//                           ChatGPT app, save downloads into art-drop/)
//   npm run art:ingest      slice/trim/align/resize everything in art-drop/
//                           into final game assets under public/
//   npm run art:normalize   re-align EXISTING badge art (trim + uniform pad)
//   npm run art:ingest -- --derive-tiers   synthesize room tiers 0-3 from
//                           tier 4 when hand-generated tiers drift
//   npm run art:ingest -- --api            generate via OpenAI gpt-image-1
//                           (needs OPENAI_API_KEY in .env.local), then ingest
//
// Flags: --only=<dropId,dropId>  --force  --dry-run
//
// Every output is validated (dimensions, alpha, content fill) and recorded in
// src/data/workshopArtManifest.json. The site keeps working with old art for
// anything not yet ingested.

import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import sharp from "sharp";
import {
  borderRingStats,
  coverResize,
  keyOutUniformBackground,
  padToCanvas,
  rawRgba,
  toWebp,
  trimToContent,
} from "./lib/image-utils.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(__dirname, "..");
const DROP_DIR = resolve(REPO, "art-drop");
const MANIFEST_PATH = resolve(REPO, "src/data/workshopArtManifest.json");
const PROMPTS_PATH = resolve(REPO, "ART-PROMPTS.md");

const PREAMBLE = "16-bit pixel art, crisp clean pixels, warm-on-dark palette: deep navy background #0b1622, surface navy #12253d, gold #c89830, coral #c07040, teal #1a8a7a, ocean blue #1a5a8a, sky blue #2a88c0, cream #e0dcd0. No text, no watermarks, no signatures.";

// 24 memento objects, K -> 5 in data order (matches K5.jsx mementoItems and
// the workshopLayout shelf order). Keep ids in sync with experiments.js.
export const MEMENTO_OBJECTS = [
  ["magic-toy", "a small plush robot toy with a glowing heart light on its chest"],
  ["robot-friend-turn", "a friendly round blue toy robot with big happy eyes"],
  ["robot-pet-goodbye", "a tiny robot puppy with a wagging antenna tail"],
  ["messy-robot", "a toy broom leaning on a paint-splattered bucket"],
  ["invisible-ring", "a silver ring with a faint magical shimmer"],
  ["honesty-protection", "a golden pencil crossed with a small heart-shaped shield"],
  ["rude-toy", "a grumpy wind-up toy robot with crossed arms"],
  ["winning-game", "a game controller with a gold star button"],
  ["ai-art-help", "an artist's palette with a glowing magic paintbrush"],
  ["rules-vs-helping", "a wooden signpost with a small red heart sign"],
  ["always-agreeable-ai-friend", "a smiling round robot face inside a speech bubble"],
  ["same-toy-or-not", "two identical small teddy bears sitting side by side"],
  ["ai-written-story", "a feather quill writing on a softly glowing page"],
  ["gps-shortcut", "a brass compass with a glowing teal needle"],
  ["ai-photo-art", "a framed photograph with magic sparkles in one corner"],
  ["adaptive-learning-fairness", "a small balance scale weighing two books"],
  ["conflicting-ai-answers", "a magnifying glass held over two different paper scrolls"],
  ["robot-rules-real-life", "a tiny toy traffic light glowing green and red at once"],
  ["elementary-trolley", "a small toy trolley tram on a curved wooden track"],
  ["ai-science-fair", "a glass test tube with a gold prize ribbon tied around it"],
  ["online-friend-or-ai", "a chat-bubble charm with a question mark inside"],
  ["ai-homework-help", "an open notebook with a glowing lightbulb floating above it"],
  ["biased-classroom-robot", "a toy robot teacher holding a slightly tilted balance scale"],
  ["ai-grading-mistake", "a graded paper with a shiny gold star sticker"],
];

const BADGE_CELLS = [
  ["k5-first-wonder", "a tiny gold spark-star bursting to life"],
  ["k5-story-explorer", "an open storybook with glowing pages"],
  ["k5-kind-thinker", "a warm pink heart with a small gold gear inside"],
  ["k5-question-asker", "a bold teal question mark with a tiny magnifying glass"],
  ["k5-rule-helper", "a balanced golden scale"],
  ["k5-try-again-explorer", "a circular golden arrow looping around a small star"],
  ["k5-topic-trailblazer", "a tiny trail map with a planted victory flag"],
];

// Spatial slot language baked into every room prompt so the painted shelves
// line up with k5RoomSlots (trophy mounts) and K5_MEMENTO_SLOTS (shelves).
const ROOM_LAYOUT = "Composition (important): a single back-wall interior view, 16:9. TWO long empty wooden shelves on the UPPER LEFT wall spanning 7%-30% of the image width, hung at 9% and 20% of the image height, and TWO matching empty shelves mirrored on the UPPER RIGHT wall (70%-93% width, same two heights). Across the MIDDLE of the back wall, SEVEN small empty round wooden display mounts with subtle gold rims in a gentle zig-zag (alternating lower and higher) between 45% and 66% of the image height, at roughly 18%, 31%, 43%, 55%, 68%, and 79% of the width, plus one slightly larger mount centered at 50% width and 31% height, above the others. A low, empty wooden display ledge runs along the floor at 85% of the image height across the full width. Keep every shelf, mount, and the floor ledge completely EMPTY and uncluttered — they will hold game items. No characters.";

const ROOM_TIER_LOOKS = {
  4: "Fully awake and glowing: every lamp lit, golden string lights on, warm light pouring from a large round window showing a starry night, rich warm wood, cozy magical inventor's workshop for children.",
  3: "Mostly awake: about half the lamps lit, warm but with soft shadowed corners, string lights glowing gently.",
  2: "Waking up: only the workbench lamp and window glow are lit, the rest of the room in soft blue dusk.",
  1: "Barely waking: a single candle on the workbench, deep blue dusk, faint moonlight through the window.",
  0: "Asleep: no lamps lit at all, dark slate-blue room lit only by pale moonlight through the window, peaceful and quiet, details still readable in the gloom.",
};

function roomEntry(tier) {
  return {
    dropId: `room-tier-${tier}`,
    requestSize: "1536x1024",
    kind: "single",
    background: "opaque",
    postprocess: "room",
    target: `public/experiment-scenes/progress-room-k5/workshop-room-${tier}.webp`,
    dims: [1920, 1080],
    prompt: `${PREAMBLE} Interior of a cozy young inventor's workshop. ${ROOM_TIER_LOOKS[tier]} ${ROOM_LAYOUT}`,
    note: tier === 4
      ? "Generate this one FIRST."
      : `Generate by EDITING the room-tier-4 result in the same chat: \"Same exact room, same camera and layout, but change the lighting: ${ROOM_TIER_LOOKS[tier]}\"`,
  };
}

function sheet(dropId, requestSize, grid, cells, prompt, extra = {}) {
  return { dropId, requestSize, kind: "sheet", grid, cells, prompt, background: "transparent", ...extra };
}

export const WORKSHOP_ART_CATALOG = [
  roomEntry(4), roomEntry(3), roomEntry(2), roomEntry(1), roomEntry(0),
  sheet(
    "badges-sheet",
    "1024x1024",
    { cols: 3, rows: 3 },
    BADGE_CELLS.map(([id], index) => ({
      id,
      cell: index,
      target: `public/experiment-scenes/progress-badges-k5/badge-${id}.webp`,
      dims: [220, 220],
      marginPct: 0.12,
      postprocess: "trim-pad",
    })),
    `${PREAMBLE} A 3x3 grid of game achievement badges on a FULLY TRANSPARENT background (alpha PNG), with clear empty gutters between cells and nothing touching cell edges. Every badge is an IDENTICAL round gold-rimmed medallion with a deep navy inner field, identical diameter (about 75% of its cell), perfectly centered in its cell. Only the small icon in the middle differs. Row 1: ${BADGE_CELLS[0][1]}; ${BADGE_CELLS[1][1]}; ${BADGE_CELLS[2][1]}. Row 2: ${BADGE_CELLS[3][1]}; ${BADGE_CELLS[4][1]}; ${BADGE_CELLS[5][1]}. Row 3: ${BADGE_CELLS[6][1]}; then leave the last two cells completely empty.`,
  ),
  ...[0, 1, 2].map((sheetIndex) => sheet(
    `mementos-sheet-${sheetIndex + 1}`,
    "1024x1024",
    { cols: 3, rows: 3 },
    MEMENTO_OBJECTS.slice(sheetIndex * 8, sheetIndex * 8 + 8).map(([id], index) => ({
      id,
      cell: index,
      target: `public/experiment-scenes/progress-room-k5/mementos/${id}.webp`,
      dims: [96, 96],
      marginPct: 0.08,
      postprocess: "trim-pad",
    })),
    `${PREAMBLE} A 3x3 grid of tiny game item icons on a FULLY TRANSPARENT background (alpha PNG), clear empty gutters, nothing touching cell edges. Each cell holds ONE small object at the SAME scale, centered, with a warm gold rim light. ${MEMENTO_OBJECTS.slice(sheetIndex * 8, sheetIndex * 8 + 8).map(([, desc], index) => `Cell ${index + 1}: ${desc}`).join(". ")}. Leave the last cell completely empty.`,
  )),
  sheet(
    "brain-states-sheet",
    "1536x1024",
    { cols: 3, rows: 2 },
    [0, 1, 2, 3, 4, 5].map((stage) => ({
      id: `wonder-light-${stage}`,
      cell: stage,
      target: `public/experiment-scenes/progress-brain-k5/wonder-light-${stage}.webp`,
      dims: [260, 190],
      marginPct: 0.06,
      postprocess: "trim-pad",
    })),
    `${PREAMBLE} A 3x2 grid on a FULLY TRANSPARENT background (alpha PNG), clear gutters, nothing touching cell edges. The SAME friendly cartoon pixel brain drawn six times, one per cell, in six progressive lighting stages reading left-to-right then top-to-bottom. Stage 1: a sleeping brain in soft slate blue #3a4a66 with a clearly visible pale cyan rim glow all around it (it must read clearly against a dark page) and one tiny dim lightbulb above. Stage 2: one bulb softly lit gold. Stage 3: two bulbs lit, hints of teal waking in the folds. Stage 4: four bulbs lit, brain warming with gold and teal. Stage 5: five bulbs bright, brain mostly glowing. Stage 6: fully radiant gold-and-teal brain with six brilliant bulbs and sparkles. Identical brain shape and position in every cell.`,
  ),
  ...[["map-zones-sheet-1", ["k", "coral #c07040 accents: a cozy toy-block meadow at dusk, soft hills made of wooden blocks and plush toys, tiny lanterns"], ["1", "gold #c89830 accents: a honey-lantern orchard with paper kites drifting"]],
    ["map-zones-sheet-2", ["2", "teal #1a8a7a accents: a tide-pool boardwalk with glowing glass jars"], ["3", "ocean #1a5a8a accents: a library canyon with floating books and wooden ladders"]],
    ["map-zones-sheet-3", ["4", "sky #2a88c0 accents: an observatory ridge with small telescopes and weather vanes"], ["5", "teal #1a8a7a accents: a bridge town over a calm river with warm windows"]],
  ].map(([dropId, top, bottom]) => sheet(
    dropId,
    "1536x1024",
    { cols: 1, rows: 2 },
    [top, bottom].map(([zoneId], index) => ({
      id: `zone-${zoneId}`,
      cell: index,
      target: `public/experiment-scenes/adventure-map-k5/zone-${zoneId}.webp`,
      dims: [1664, 476],
      postprocess: "band",
    })),
    `${PREAMBLE} TWO wide side-scrolling game terrain strips stacked vertically with a clean horizontal gap between them, each strip a calm horizontal landscape with a clear walking path through the middle, gentle and uncluttered (game UI will sit on top). TOP strip, ${top[1]}. BOTTOM strip, ${bottom[1]}. No characters.`,
    { background: "opaque" },
  )),
  sheet(
    "ari-cheer-sheet",
    "1024x1024",
    { cols: 2, rows: 2 },
    [0, 1, 2, 3].map((frame) => ({
      id: `ari-cheer-${String(frame).padStart(2, "0")}`,
      cell: frame,
      target: `public/experiment-scenes/progress-room-k5/ari-cheer-${String(frame).padStart(2, "0")}.webp`,
      dims: [360, 360],
      marginPct: 0.05,
      postprocess: "trim-pad",
    })),
    `${PREAMBLE} A 2x2 grid on a FULLY TRANSPARENT background (alpha PNG), clear gutters. The SAME young inventor girl (dark curly hair, goggles on her forehead, teal jacket) in four frames of a happy cheer animation, feet planted on the SAME invisible ground line in every cell, identical size and position: frame 1 arms starting to rise, frame 2 arms up mid-jump, frame 3 arms fully raised celebrating with sparkles, frame 4 settling back with a big smile.`,
    { optional: true },
  ),
  sheet(
    "stat-icons-sheet",
    "1024x1024",
    { cols: 2, rows: 2 },
    [["stat-finished", "an open storybook with a gold checkmark"], ["stat-badges", "a small gold trophy cup"], ["stat-skills", "a glowing lightbulb with tiny gears"], ["stat-brain", "a friendly glowing brain with one lit bulb"]].map(([id], index) => ({
      id,
      cell: index,
      target: `public/experiment-scenes/progress-room-k5/${id}.webp`,
      dims: [96, 96],
      marginPct: 0.1,
      postprocess: "trim-pad",
    })),
    `${PREAMBLE} A 2x2 grid of small game stat icons on a FULLY TRANSPARENT background (alpha PNG), clear gutters, identical scale, centered. Cell 1: an open storybook with a gold checkmark. Cell 2: a small gold trophy cup. Cell 3: a glowing lightbulb with tiny gears. Cell 4: a friendly glowing brain with one lit bulb.`,
    { optional: true },
  ),
];

export function catalogHash(entry) {
  return createHash("sha256")
    .update(JSON.stringify({ dropId: entry.dropId, prompt: entry.prompt, grid: entry.grid || null }))
    .digest("hex")
    .slice(0, 16);
}

// Cell rectangles for a sheet, row-major, with a fractional inset per side to
// guard against gutter bleed. Computed from ACTUAL decoded dimensions.
export function gridCells(imageWidth, imageHeight, grid, insetPct = 0.03) {
  const cellW = Math.floor(imageWidth / grid.cols);
  const cellH = Math.floor(imageHeight / grid.rows);
  const insetX = Math.round(cellW * insetPct);
  const insetY = Math.round(cellH * insetPct);
  const cells = [];
  for (let row = 0; row < grid.rows; row += 1) {
    for (let col = 0; col < grid.cols; col += 1) {
      cells.push({
        left: col * cellW + insetX,
        top: row * cellH + insetY,
        width: cellW - insetX * 2,
        height: cellH - insetY * 2,
      });
    }
  }
  return cells;
}

// Match files found in art-drop/ to catalog entries. Case-insensitive,
// tolerates .png/.jpg/.jpeg/.webp and macOS duplicate suffixes like " (1)".
export function planIngest(dropFiles, catalog = WORKSHOP_ART_CATALOG) {
  const normalize = (name) => name
    .toLowerCase()
    .replace(/\.(png|jpe?g|webp)$/i, "")
    .replace(/\s*\(\d+\)\s*$/, "")
    .trim();
  const byId = new Map(catalog.map((entry) => [entry.dropId.toLowerCase(), entry]));
  const matches = [];
  const unmatched = [];
  const seen = new Set();
  for (const file of dropFiles) {
    const entry = byId.get(normalize(file));
    if (entry && !seen.has(entry.dropId)) {
      matches.push({ file, entry });
      seen.add(entry.dropId);
    } else if (!entry) {
      unmatched.push(file);
    }
  }
  const missing = catalog.filter((entry) => !seen.has(entry.dropId) && !entry.optional).map((entry) => entry.dropId);
  return { matches, unmatched, missing };
}

// ──────────────── prompts mode ────────────────

function buildPromptsMarkdown() {
  const lines = [
    "# Wonder Workshop — Art Generation Sheet",
    "",
    "Generate each image below in the ChatGPT app, download it, rename it to the",
    "exact filename shown, and drop it into the `art-drop/` folder at the repo",
    "root. Then run `npm run art:ingest` — slicing, alignment, resizing, and",
    "format conversion are all automatic, and you'll get a validation report.",
    "",
    "Tips: ask ChatGPT for a **PNG with a fully transparent background** when the",
    "prompt says so (if it returns a checkerboard or solid background anyway, the",
    "ingest step can usually rescue it). If one cell of a grid comes out wrong,",
    "just regenerate that whole sheet — ingestion is repeatable.",
    "",
  ];
  const core = WORKSHOP_ART_CATALOG.filter((entry) => !entry.optional);
  const optional = WORKSHOP_ART_CATALOG.filter((entry) => entry.optional);
  const section = (entries, title) => {
    lines.push(`## ${title}`, "");
    for (const entry of entries) {
      lines.push(`### \`art-drop/${entry.dropId}.png\``, "");
      lines.push(`- [ ] Image size to request: **${entry.requestSize.replace("x", " × ")}** (landscape)` + (entry.kind === "sheet" ? ` — ${entry.grid.cols}×${entry.grid.rows} grid` : ""));
      if (entry.note) lines.push(`- ${entry.note}`);
      lines.push("", "```", entry.prompt, "```", "");
    }
  };
  section(core, "Core set (13 images)");
  if (optional.length) section(optional, "Optional extras");
  return lines.join("\n");
}

// ──────────────── ingest processing ────────────────

async function processToTarget(buffer, cellSpec, report) {
  const { target, dims, marginPct = 0.1, postprocess } = cellSpec;
  const absTarget = resolve(REPO, target);
  await mkdir(dirname(absTarget), { recursive: true });

  let out;
  if (postprocess === "room" || postprocess === "band") {
    out = await toWebp(await coverResize(buffer, dims[0], dims[1]), { quality: 90 });
  } else {
    // trim-pad path for transparent sprites
    let working = buffer;
    const meta = await sharp(working).metadata();
    let needsKey = !meta.hasAlpha;
    if (meta.hasAlpha) {
      const { data, info } = await rawRgba(working);
      let opaque = 0;
      for (let i = 3; i < data.length; i += 4) if (data[i] > 16) opaque += 1;
      needsKey = opaque / (data.length / 4) > 0.985; // "transparent" image that is actually solid
    }
    if (needsKey) {
      const ring = await borderRingStats(working);
      if (ring.stdev < 8) {
        working = await keyOutUniformBackground(working, { tolerance: 26 });
        report.notes.push(`${cellSpec.id}: opaque background chroma-keyed (ring stdev ${ring.stdev.toFixed(1)})`);
      } else {
        report.failures.push(`${cellSpec.id}: no transparency and background is not uniform (ring stdev ${ring.stdev.toFixed(1)}) — regenerate asking explicitly for a transparent background`);
        return;
      }
    }
    const trimmed = await trimToContent(working);
    if (!trimmed) {
      report.failures.push(`${cellSpec.id}: no visible foreground after trim — cell may be empty or mis-sliced`);
      return;
    }
    const cellMeta = await sharp(buffer).metadata();
    const fill = (trimmed.bounds.width * trimmed.bounds.height) / (cellMeta.width * cellMeta.height);
    if (fill < 0.05 || fill > 0.97) {
      report.failures.push(`${cellSpec.id}: foreground fills ${(fill * 100).toFixed(0)}% of its cell (expected 5-97%) — likely grid misalignment; regenerate the sheet`);
      return;
    }
    out = await toWebp(await padToCanvas(trimmed.buffer, dims[0], dims[1], marginPct), { quality: 92, lossless: dims[0] <= 128 });
  }

  await writeFile(absTarget, out);
  const written = await sharp(absTarget).metadata();
  if (written.width !== dims[0] || written.height !== dims[1]) {
    report.failures.push(`${cellSpec.id}: wrote ${written.width}x${written.height}, expected ${dims[0]}x${dims[1]}`);
    return;
  }
  report.written.push({ id: cellSpec.id, target, bytes: out.length });
}

async function ingestEntry(entry, filePath, report) {
  const source = await readFile(filePath);
  if (entry.kind === "single") {
    await processToTarget(source, { id: entry.dropId, target: entry.target, dims: entry.dims, postprocess: entry.postprocess }, report);
    return;
  }
  const meta = await sharp(source).metadata();
  const cells = gridCells(meta.width, meta.height, entry.grid);
  for (const cellSpec of entry.cells) {
    const rect = cells[cellSpec.cell];
    const cellBuffer = await sharp(source).extract(rect).png().toBuffer();
    await processToTarget(cellBuffer, cellSpec, report);
  }
}

// Synthesize room tiers 0-3 from tier 4 (consistent-by-construction fallback
// when hand-edited tiers drift between generations).
async function deriveTiers(report) {
  const tier4 = resolve(REPO, "public/experiment-scenes/progress-room-k5/workshop-room-4.webp");
  if (!existsSync(tier4)) throw new Error("workshop-room-4.webp not found — ingest room-tier-4 first");
  const settings = { 3: [0.9, 0.95], 2: [0.75, 0.86], 1: [0.6, 0.78], 0: [0.45, 0.7] };
  const meta = await sharp(tier4).metadata();
  for (const [tier, [brightness, saturation]] of Object.entries(settings)) {
    const target = resolve(REPO, `public/experiment-scenes/progress-room-k5/workshop-room-${tier}.webp`);
    const out = await toWebp(
      await sharp(tier4).modulate({ brightness, saturation }).toBuffer(),
      { quality: 90 },
    );
    await writeFile(target, out);
    report.written.push({ id: `workshop-room-${tier} (derived)`, target, bytes: out.length });
  }
  report.notes.push(`tiers 0-3 derived from tier 4 (${meta.width}x${meta.height})`);
}

// Re-align existing badge art: trim to content, pad to a uniform margin.
// Dimensions stay the same, so tests and registries are untouched.
async function normalizeBadges(report) {
  const dirs = [
    "public/experiment-scenes/progress-badges-k5",
    "public/experiment-scenes/progress-badges",
  ];
  for (const dir of dirs) {
    const absDir = resolve(REPO, dir);
    if (!existsSync(absDir)) continue;
    for (const file of (await readdir(absDir)).filter((f) => f.endsWith(".webp"))) {
      const absFile = resolve(absDir, file);
      const original = await readFile(absFile);
      const meta = await sharp(original).metadata();
      const trimmed = await trimToContent(original);
      if (!trimmed) {
        report.failures.push(`${file}: no foreground found`);
        continue;
      }
      const before = trimmed.bounds;
      const out = await toWebp(await padToCanvas(trimmed.buffer, meta.width, meta.height, 0.12), { quality: 95 });
      await writeFile(absFile, out);
      report.written.push({ id: file, target: `${dir}/${file}`, bytes: out.length });
      report.notes.push(`${file}: content ${before.width}x${before.height} re-centered with uniform 12% margin`);
    }
  }
}

// Optional API mode: generate straight into art-drop/ via gpt-image-1.
async function generateViaApi(entries) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not set in .env.local — use manual mode (art:prompts) instead.");
  await mkdir(DROP_DIR, { recursive: true });
  for (const entry of entries) {
    const dropPath = resolve(DROP_DIR, `${entry.dropId}.png`);
    if (existsSync(dropPath)) {
      console.log(`[skip] ${entry.dropId} (already in art-drop/)`);
      continue;
    }
    console.log(`[gen ] ${entry.dropId}`);
    const res = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt: entry.prompt,
        size: entry.requestSize === "1536x1024" ? "1536x1024" : "1024x1024",
        background: entry.background === "transparent" ? "transparent" : "opaque",
        quality: "high",
      }),
    });
    if (!res.ok) throw new Error(`OpenAI ${res.status}: ${await res.text()}`);
    const json = await res.json();
    await writeFile(dropPath, Buffer.from(json.data[0].b64_json, "base64"));
  }
}

// ──────────────── CLI ────────────────

function parseArgs(argv) {
  const args = { mode: null, only: null, force: false, dryRun: false, deriveTiers: false, api: false };
  for (const arg of argv.slice(2)) {
    if (arg === "--prompts") args.mode = "prompts";
    else if (arg === "--ingest") args.mode = "ingest";
    else if (arg === "--normalize") args.mode = "normalize";
    else if (arg === "--derive-tiers") { args.mode = args.mode || "ingest"; args.deriveTiers = true; }
    else if (arg === "--api") { args.mode = args.mode || "ingest"; args.api = true; }
    else if (arg === "--force") args.force = true;
    else if (arg === "--dry-run") args.dryRun = true;
    else if (arg.startsWith("--only=")) args.only = arg.slice(7).split(",").map((s) => s.trim()).filter(Boolean);
  }
  return args;
}

async function readManifest() {
  try {
    return JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
  } catch {
    return { _note: "Generated by scripts/generate-workshop-art.mjs — do not edit by hand.", items: {} };
  }
}

async function main() {
  const args = parseArgs(process.argv);
  const report = { written: [], failures: [], notes: [] };

  if (args.mode === "prompts" || !args.mode) {
    await writeFile(PROMPTS_PATH, `${buildPromptsMarkdown()}\n`);
    console.log(`Wrote ${PROMPTS_PATH}`);
    console.log(`Core generations: ${WORKSHOP_ART_CATALOG.filter((e) => !e.optional).length}, optional: ${WORKSHOP_ART_CATALOG.filter((e) => e.optional).length}`);
    return;
  }

  if (args.mode === "normalize") {
    await normalizeBadges(report);
  } else if (args.mode === "ingest") {
    const catalog = args.only
      ? WORKSHOP_ART_CATALOG.filter((entry) => args.only.includes(entry.dropId))
      : WORKSHOP_ART_CATALOG;
    if (args.api) await generateViaApi(catalog);
    const manifest = await readManifest();
    const dropFiles = existsSync(DROP_DIR) ? await readdir(DROP_DIR) : [];
    const plan = planIngest(dropFiles, catalog);
    for (const file of plan.unmatched) console.warn(`[??  ] art-drop/${file} does not match any catalog id`);
    for (const { file, entry } of plan.matches) {
      const hash = catalogHash(entry);
      if (!args.force && manifest.items[entry.dropId]?.hash === hash && manifest.items[entry.dropId]?.sourceDrop === file) {
        console.log(`[skip] ${entry.dropId} (already ingested from ${file})`);
        continue;
      }
      if (args.dryRun) {
        console.log(`[plan] ${entry.dropId} <- art-drop/${file}`);
        continue;
      }
      console.log(`[ing ] ${entry.dropId} <- art-drop/${file}`);
      await ingestEntry(entry, resolve(DROP_DIR, file), report);
      manifest.items[entry.dropId] = { hash, sourceDrop: file, ingestedAt: new Date().toISOString() };
    }
    if (args.deriveTiers && !args.dryRun) await deriveTiers(report);
    if (!args.dryRun) await writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
    if (plan.missing.length) console.log(`\nStill waiting on: ${plan.missing.join(", ")}`);
  }

  if (report.notes.length) console.log(`\nNotes:\n  ${report.notes.join("\n  ")}`);
  if (report.written.length) {
    console.log(`\nWrote ${report.written.length} assets:`);
    for (const item of report.written) console.log(`  ✓ ${item.target} (${(item.bytes / 1024).toFixed(1)}KB)`);
  }
  if (report.failures.length) {
    console.error(`\n${report.failures.length} FAILURES:`);
    for (const failure of report.failures) console.error(`  ✗ ${failure}`);
    process.exit(1);
  }
}

const isCLI = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isCLI) {
  main().catch((err) => {
    console.error(err.message || err);
    process.exit(1);
  });
}
