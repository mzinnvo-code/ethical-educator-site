#!/usr/bin/env node
// Generate chiptune SFX + music for the Gameful Learning Lab quest.
//
// Usage:
//   npm run audio:gamification                   # generate everything (incremental)
//   npm run audio:gamification -- --dry-run      # plan only, no API calls
//   npm run audio:gamification -- --only=door-knock,badge-collect
//   npm run audio:gamification -- --force        # ignore cache
//
// Required env (load via `node --env-file=.env.local ...` — wired in package.json):
//   ELEVENLABS_API_KEY    your ElevenLabs API key
//
// Output: public/audio/gamification/<id>.mp3 + manifest at
// src/data/gamificationAudioManifest.json. The runtime
// (src/pages/educators/gamification/questAudio.js) falls back to the WebAudio
// synth cues when a file is missing, so this script can be re-run anytime
// without breaking the site.

import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(__dirname, "..");
const MANIFEST_PATH = resolve(REPO, "src/data/gamificationAudioManifest.json");
const OUTPUT_DIR = resolve(REPO, "public/audio/gamification");
const PUBLIC_PREFIX = "/audio/gamification";

const SFX_URL = "https://api.elevenlabs.io/v1/sound-generation";
const MUSIC_URL = "https://api.elevenlabs.io/v1/music";

// One entry per sampled cue. Keep ids in sync with SAMPLE_BY_CUE in
// src/pages/educators/gamification/questAudio.js. dialogue-tick and
// path-step stay synth-only on purpose (per-character/per-step samples
// sound worse than clean oscillator ticks).
export const GAMIFICATION_AUDIO_CATALOG = [
  { id: "door-knock", kind: "sfx", seconds: 0.6, prompt: "Single soft knuckle knock on a heavy wooden door, warm and woody, cozy retro game foley, no reverb tail" },
  { id: "door-strong-knock", kind: "sfx", seconds: 0.9, prompt: "Two firm knuckle knocks on a heavy wooden door, slightly urgent but friendly, warm woody retro game foley" },
  { id: "door-open", kind: "sfx", seconds: 1.8, prompt: "Heavy wooden study door creaking open slowly, then a soft warm magical chime as light spills out, cozy retro game" },
  { id: "ui-tap", kind: "sfx", seconds: 0.4, prompt: "Very short quiet 8-bit tick, subtle interface select blip, minimal, clean, single note" },
  { id: "node-select", kind: "sfx", seconds: 0.6, prompt: "Bright cheerful 8-bit confirm blip, two quick rising square-wave notes, retro adventure map stop selected, clean" },
  { id: "path-travel", kind: "sfx", seconds: 2.5, prompt: "Soft rhythmic chiptune walking footsteps on a dirt path, gentle bouncy 8-bit travel pattern, cozy overworld journey, even loopable rhythm" },
  { id: "room-enter", kind: "sfx", seconds: 1.2, prompt: "Warm welcoming chiptune arrival arpeggio, door swing plus a soft sparkle, entering a cozy study room in a retro game" },
  { id: "badge-collect", kind: "sfx", seconds: 2.2, prompt: "Triumphant short 8-bit badge earned jingle, three rising chiptune notes resolving to a bright major chord with soft bell shimmer, warm, satisfying" },
  { id: "unlock", kind: "sfx", seconds: 1.2, prompt: "Magical unlock shimmer, soft click then an ascending two-note bell sparkle, a new path lighting up in a cozy retro game" },
  { id: "return-gate", kind: "sfx", seconds: 1.4, prompt: "Warm gate chime, three gentle ascending triangle-wave notes with a soft glow swell, stepping through a friendly gate in a retro game" },
  { id: "ari-exit", kind: "sfx", seconds: 0.8, prompt: "Short cheerful walking-away whistle phrase in chiptune style, three quick light notes, friendly character leaving a room" },
  { id: "error", kind: "sfx", seconds: 0.7, prompt: "Gentle not-yet feedback sound, soft low wooden double-tap with a small downward bend, kind and unharsh, kids retro game" },
  { id: "finale-fanfare", kind: "sfx", seconds: 4.0, prompt: "Grand warm chiptune victory fanfare, ascending bell arpeggio flourish into a sustained triumphant major chord with shimmer, completing a long quest in a cozy retro game" },
  { id: "quest-theme", kind: "music", seconds: 60, prompt: "Cozy wandering chiptune overworld theme for a teacher's learning quest, soft square-wave melody over warm pads, gentle bass pulse, 90 bpm, hopeful and curious, seamless loop, no drums, instrumental" },
  { id: "room-theme", kind: "music", seconds: 60, prompt: "Calm focused chiptune study-room theme, slow soft square-wave melody with warm sustained pads, quiet and thoughtful, 70 bpm, seamless loop, no percussion, instrumental" },
];

export function catalogHash(entry) {
  return createHash("sha256")
    .update(JSON.stringify({ id: entry.id, prompt: entry.prompt, seconds: entry.seconds, kind: entry.kind }))
    .digest("hex")
    .slice(0, 16);
}

function parseArgs(argv) {
  const args = { dryRun: false, force: false, only: null };
  for (const arg of argv.slice(2)) {
    if (arg === "--dry-run") args.dryRun = true;
    else if (arg === "--force") args.force = true;
    else if (arg.startsWith("--only=")) args.only = arg.slice("--only=".length).split(",").map((s) => s.trim()).filter(Boolean);
  }
  return args;
}

async function readManifest() {
  try {
    return JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
  } catch {
    return { _note: "Generated by scripts/generate-gamification-audio.mjs — do not edit by hand.", items: {} };
  }
}

async function requestAudio(entry, apiKey) {
  const isMusic = entry.kind === "music";
  const url = isMusic ? MUSIC_URL : SFX_URL;
  const body = isMusic
    ? JSON.stringify({ prompt: entry.prompt, music_length_ms: Math.round(entry.seconds * 1000) })
    : JSON.stringify({ text: entry.prompt, duration_seconds: entry.seconds, prompt_influence: 0.35 });

  const delays = [2000, 4000, 8000];
  for (let attempt = 0; attempt <= delays.length; attempt++) {
    let res;
    try {
      res = await fetch(url, {
        method: "POST",
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
          "Accept": "audio/mpeg",
        },
        body,
      });
    } catch (err) {
      if (attempt === delays.length) throw err;
      console.warn(`  network error: ${err.message} — retrying in ${delays[attempt]}ms`);
      await new Promise((r) => setTimeout(r, delays[attempt]));
      continue;
    }

    if (res.ok) return Buffer.from(await res.arrayBuffer());

    if (res.status === 401) {
      const detail = await res.text().catch(() => "");
      throw new Error(`ElevenLabs 401 unauthorized — check ELEVENLABS_API_KEY. ${detail}`);
    }
    if (res.status >= 500 || res.status === 429) {
      if (attempt === delays.length) {
        const detail = await res.text().catch(() => "");
        throw new Error(`ElevenLabs ${res.status} after ${delays.length + 1} attempts: ${detail}`);
      }
      const delay = res.status === 429 ? Math.max(delays[attempt], 30000) : delays[attempt];
      console.warn(`  ${res.status} — retrying in ${delay}ms`);
      await new Promise((r) => setTimeout(r, delay));
      continue;
    }
    const detail = await res.text().catch(() => "");
    throw new Error(`ElevenLabs ${res.status}: ${detail}`);
  }
  throw new Error("unreachable");
}

async function main() {
  const args = parseArgs(process.argv);
  const manifest = await readManifest();
  const entries = GAMIFICATION_AUDIO_CATALOG.filter((entry) => !args.only || args.only.includes(entry.id));

  let generated = 0;
  let skipped = 0;

  for (const entry of entries) {
    const hash = catalogHash(entry);
    const file = `${PUBLIC_PREFIX}/${entry.id}.mp3`;
    const target = resolve(REPO, `public${file}`);
    const cached = manifest.items[entry.id];

    if (!args.force && cached?.hash === hash && existsSync(target)) {
      console.log(`[skip] ${entry.id} (cached)`);
      skipped += 1;
      continue;
    }
    if (args.dryRun) {
      console.log(`[plan] ${entry.id} <- ${entry.kind} ${entry.seconds}s "${entry.prompt.slice(0, 60)}..."`);
      continue;
    }

    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) throw new Error("ELEVENLABS_API_KEY is not set. Add it to .env.local.");

    console.log(`[gen ] ${entry.id} (${entry.kind}, ${entry.seconds}s)`);
    const buffer = await requestAudio(entry, apiKey);
    await mkdir(OUTPUT_DIR, { recursive: true });
    await writeFile(target, buffer);
    manifest.items[entry.id] = { file, hash, bytes: buffer.length, kind: entry.kind };
    generated += 1;
  }

  if (!args.dryRun) {
    await writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
  }
  console.log(`\nDone. generated=${generated} skipped=${skipped} total=${entries.length}`);
}

const isCLI = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isCLI) {
  main().catch((err) => {
    console.error(err.message || err);
    process.exit(1);
  });
}
