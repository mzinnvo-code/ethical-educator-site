#!/usr/bin/env node
// Generate ElevenLabs voice-overs for K-5 thought-experiment student copy.
//
// Usage:
//   npm run audio:generate                     # generate everything (incremental)
//   npm run audio:generate -- --dry-run        # plan only, no API calls
//   npm run audio:generate -- --scenario=magic-toy
//   npm run audio:generate -- --force          # ignore cache
//
// Required env (load via `node --env-file-if-exists=.env.local ...` — wired in package.json):
//   ELEVENLABS_API_KEY    your ElevenLabs API key
//   ELEVENLABS_VOICE_ID   optional; defaults to Hope, falls back to Charlotte

import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { K5_SCENARIO_COPY } from "../src/data/k5ScenarioCopy.js";
import {
  buildSpeechText,
  sectionsToSpeech,
  resolveStaticPrompt,
  resolveStaticStorySections,
} from "../src/lib/readAloudText.js";
import { enumerateSynthesisAudioItems } from "../src/lib/k5SynthesisAudioText.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(__dirname, "..");
const MANIFEST_PATH = resolve(REPO, "src/data/k5AudioManifest.json");
const PUBLIC_AUDIO_DIR = resolve(REPO, "public/audio/k5");

// 24 K-5 scenarios → grade band. Hardcoded so the script doesn't need to
// import experiments.js (which pulls in JSX scene components). Keep in sync
// with src/data/experiments.js if scenarios are added.
const GRADE_LEVEL = {
  "magic-toy": "k", "robot-friend-turn": "k", "robot-pet-goodbye": "k", "messy-robot": "k",
  "invisible-ring": "1", "honesty-protection": "1", "rude-toy": "1", "winning-game": "1",
  "ai-art-help": "2", "rules-vs-helping": "2", "always-agreeable-ai-friend": "2", "same-toy-or-not": "2",
  "ai-written-story": "3", "gps-shortcut": "3", "ai-photo-art": "3", "adaptive-learning-fairness": "3",
  "conflicting-ai-answers": "4", "robot-rules-real-life": "4", "elementary-trolley": "4", "ai-science-fair": "4",
  "online-friend-or-ai": "5", "ai-homework-help": "5", "biased-classroom-robot": "5", "ai-grading-mistake": "5",
};

// Per-grade narrative pacing tag for stage-prompt narration. Younger grades
// get unhurried, storybook delivery; upper grades get conversational
// engagement that respects their attention. Used by the stage-prompt builder
// for the storySections wrapper.
const GRADE_PACING = {
  k:   "[unhurried, like a bedtime story]",
  "1": "[gentle, with space to think]",
  "2": "[warm storytelling, unhurried]",
  "3": "[engaged storytelling]",
  "4": "[thoughtful, conversational]",
  "5": "[reflective, peer-to-peer]",
};

// When a scenario contains quoted dialogue, this controls the voice that
// wraps the quoted segment. Default = a clear "reading aloud" voice for
// labels, rules, and unattributed quotes. Scenarios listed here have a
// dominant character speaker; richer per-quote attribution would require
// metadata in the source data and is deferred.
const SCENARIO_SPEAKER_VOICE = {
  // K — talking toys
  "magic-toy":                 "[small, soft toy voice]",
  "rude-toy":                  "[small, soft toy voice]",
  // K-G2 — child peers
  "messy-robot":               "[child voice, mischievous]",
  "honesty-protection":        "[child voice, whispered, anxious]",
  "ai-art-help":               "[child voice, curious]",
  "same-toy-or-not":           "[child voice, friendly]",
  // G2 — AI assistant friend (multiple speakers; AI is dominant)
  "always-agreeable-ai-friend": "[smooth AI assistant voice]",
  // G4-5 — robots that follow or report rules
  "robot-rules-real-life":     "[neutral, mechanical robot voice]",
  "biased-classroom-robot":    "[neutral, mechanical robot voice]",
  // G5 — AI companion in a game
  "online-friend-or-ai":       "[friendly AI companion voice]",
  // G5 — student's own essay being read back
  "ai-grading-mistake":        "[student voice, slightly anxious]",
};
const DEFAULT_SPEAKER_VOICE = "[clearly, like a quoted line]";

// Per-grade narrator tag wrapping the question itself ("What do you think?").
// Same warmth across grades, but the upper grades sound less wide-eyed.
const NARRATOR_VOICE_BY_GRADE = {
  k:   "[curious, like inviting a friend]",
  "1": "[curious, like inviting a friend]",
  "2": "[curious, like inviting a friend]",
  "3": "[curious, inviting]",
  "4": "[engaged, inviting reflection]",
  "5": "[engaged, inviting reflection]",
};

// ──────────────── Config ────────────────
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || "cgSgspJ2msm6clMCkdW9"; // Jessica — Playful, Bright, Warm
// eleven_v3 supports inline audio tags ([softly], [warm storytelling], etc.) so
// we can give each slot type its own tone direction. Older models read tags as
// literal text. v3 voice_settings: only `stability` is honored (0.0/0.5/1.0
// roughly Creative/Natural/Robust). Pacing is controlled via inline tags.
const MODEL_ID = "eleven_v3";
const VOICE_SETTINGS = {
  stability: 0.5,
};
const OUTPUT_FORMAT = "mp3_44100_128";
const API_BASE = "https://api.elevenlabs.io/v1/text-to-speech";

// Slot-type → tone-directed text. Each function takes the structured pieces
// from the chunk and returns the exact string we send to ElevenLabs (v3).
//
// Design notes for K-5 storybook engagement:
//  • Stage titles sound like a chapter heading, not an announcer.
//  • In the prompt, *quoted dialogue* (the toy's "I feel sad", a friend's line)
//    is wrapped in a "small, soft toy voice" tag so characters sound distinct
//    from the narrator. This is the highest-impact change for kids.
//  • Choices announce their letter cleanly so the listener can map "A./B./C."
//    to the on-screen buttons; the choice text itself is warm and confident.
//  • Reflections sound like a wise friend agreeing, not a cheerleader.
//  • studentLab fields each get a tone that matches their purpose.

// Split a string into [narrative, dialogue, narrative, ...] segments by ASCII
// double-quotes. Returns one element per non-empty segment.
function splitByDialogue(text) {
  const segments = [];
  let lastEnd = 0;
  const regex = /"([^"]+)"/g;
  let m;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > lastEnd) {
      const narrative = text.slice(lastEnd, m.index).trim();
      if (narrative) segments.push({ kind: "narrative", text: narrative });
    }
    segments.push({ kind: "dialogue", text: m[1].trim() });
    lastEnd = m.index + m[0].length;
  }
  if (lastEnd < text.length) {
    const tail = text.slice(lastEnd).trim();
    if (tail) segments.push({ kind: "narrative", text: tail });
  }
  return segments;
}

function tagPrompt(prompt, scenarioId, grade) {
  const segs = splitByDialogue(prompt);
  if (segs.length === 0) return "";
  const narratorTag = NARRATOR_VOICE_BY_GRADE[grade] || "[curious, like inviting a friend]";
  if (segs.length === 1 && segs[0].kind === "narrative") {
    return `${narratorTag} ${segs[0].text}`;
  }
  const speakerTag = SCENARIO_SPEAKER_VOICE[scenarioId] || DEFAULT_SPEAKER_VOICE;
  return segs
    .map(s => s.kind === "dialogue"
      ? `${speakerTag} "${s.text}"`
      : `${narratorTag} ${s.text}`)
    .join(" ");
}

// Build the narration string from structured sections, inserting a short
// pause between a section's label ("The situation.") and its body, and a
// longer breath between consecutive sections so the listener can absorb
// each beat. Skips the label entirely when missing.
function sectionsToNarrationText(sectionsArr) {
  if (!Array.isArray(sectionsArr) || sectionsArr.length === 0) return "";
  return sectionsArr
    .filter(s => s?.text)
    .map(s => s.label
      ? `${s.label}. [short pause] ${s.text}`
      : s.text)
    .join(" [breath] ");
}

const TONE_TEXT = {
  "stage-prompt": ({ title, sectionsArr, prompt }, grade, scenarioId) => {
    const parts = [];
    if (title) parts.push(`[softly, like a story title] ${title}.`);
    const sectionText = sectionsToNarrationText(sectionsArr);
    if (sectionText) {
      const pacing = GRADE_PACING[grade] || "[warm storytelling, unhurried]";
      parts.push(`${pacing} ${sectionText}`);
    }
    if (prompt) parts.push(tagPrompt(prompt, scenarioId, grade));
    return parts.filter(Boolean).join(" ");
  },
  "option": ({ label, text }) => `[clear, friendly] Choice ${label}. [warmly] ${text}`,
  "reflection": ({ text }, grade) => {
    // G4-5 reflections sound peer-to-peer rather than warm-storytime.
    const tag = (grade === "4" || grade === "5")
      ? "[reflective, peer-to-peer]"
      : "[thoughtful, warm]";
    return `${tag} ${text}`;
  },
  "lab-wonder": ({ text }) => `[wondering aloud, gently] ${text}`,
  "lab-bigidea": ({ text }) => `[wise, gentle, like sharing a small secret] ${text}`,
  "lab-trythis": ({ text }) => `[playful, inviting] ${text}`,
  "lab-spottheslip": ({ text }) => `[curious, alert] ${text}`,
  "student-story": ({ text }, grade) => {
    const tag = (grade === "k" || grade === "1")
      ? "[warm, gentle storybook payoff]"
      : "[warm, reflective story payoff]";
    return `${tag} ${text}`;
  },
  "path-recap": ({ text }) => `[warmly, encouraging reflection] ${text}`,
  "student-position": ({ text }) => `[curious, like sharing a big idea with a child] ${text}`,
  "student-reference": ({ text }) => `[gentle, inviting wonder] ${text}`,
};

// ──────────────── CLI ────────────────
function parseArgs(argv) {
  const args = { dryRun: false, force: false, scenario: null };
  for (const a of argv.slice(2)) {
    if (a === "--dry-run") args.dryRun = true;
    else if (a === "--force") args.force = true;
    else if (a.startsWith("--scenario=")) args.scenario = a.slice("--scenario=".length);
    else if (a === "--help" || a === "-h") {
      console.log("Usage: node scripts/generate-k5-audio.mjs [--dry-run] [--scenario=<id>] [--force]");
      process.exit(0);
    }
    else {
      console.error(`Unknown flag: ${a}`);
      process.exit(2);
    }
  }
  return args;
}

// ──────────────── Manifest ────────────────
async function loadManifest() {
  if (!existsSync(MANIFEST_PATH)) {
    return { _note: "Generated by scripts/generate-k5-audio.mjs. Do not edit by hand.", voiceId: null, modelId: null, voiceSettings: null, scenarios: {} };
  }
  return JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
}

async function saveManifest(manifest) {
  manifest.voiceId = VOICE_ID;
  manifest.modelId = MODEL_ID;
  manifest.voiceSettings = VOICE_SETTINGS;
  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n", "utf8");
}

// ──────────────── Hashing ────────────────
function hashChunk(toneText) {
  // Hash what we actually send to ElevenLabs (tone-tagged text) plus voice
  // settings, so any tweak to text, tags, voice, model, or settings
  // invalidates the cache and triggers regeneration.
  const settingsKey = JSON.stringify(VOICE_SETTINGS, Object.keys(VOICE_SETTINGS).sort());
  return createHash("sha256")
    .update(`${VOICE_ID}|${MODEL_ID}|${settingsKey}|${toneText}`)
    .digest("hex")
    .slice(0, 16);
}

// ──────────────── ElevenLabs API ────────────────
function stripEmphasis(text) {
  // Strip markdown-style emphasis (*foo* / _foo_) before TTS so the voice doesn't
  // read literal asterisks. The page renders these characters literally too —
  // a separate fix would be to drop them from the source copy, but for now we
  // just clean them at the audio boundary.
  return text
    .replace(/\*([^*\n]+)\*/g, "$1")
    .replace(/(^|\s)_([^_\n]+)_(?=\s|[.,;:!?]|$)/g, "$1$2");
}

async function elevenlabsTTS(toneText) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) throw new Error("ELEVENLABS_API_KEY is not set. Set it in the process environment or .env.local.");

  const url = `${API_BASE}/${VOICE_ID}?output_format=${OUTPUT_FORMAT}`;
  const body = JSON.stringify({
    text: toneText,
    model_id: MODEL_ID,
    voice_settings: VOICE_SETTINGS,
  });

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
      await new Promise(r => setTimeout(r, delays[attempt]));
      continue;
    }

    if (res.ok) {
      return Buffer.from(await res.arrayBuffer());
    }

    if (res.status === 401) {
      const detail = await res.text().catch(() => "");
      if (detail.includes("quota_exceeded")) {
        throw new Error(`ElevenLabs quota exceeded for this billing period. Upgrade plan or wait for monthly reset. ${detail}`);
      }
      throw new Error(`ElevenLabs 401 unauthorized — check ELEVENLABS_API_KEY. ${detail}`);
    }
    if (res.status === 422) {
      const detail = await res.text().catch(() => "");
      throw new Error(`ElevenLabs 422 unprocessable — likely bad voice/model id or text. ${detail}`);
    }
    if (res.status >= 500 || res.status === 429) {
      if (attempt === delays.length) {
        const detail = await res.text().catch(() => "");
        throw new Error(`ElevenLabs ${res.status} after ${delays.length + 1} attempts: ${detail}`);
      }
      const delay = res.status === 429 ? Math.max(delays[attempt], 30000) : delays[attempt];
      console.warn(`  ${res.status} — retrying in ${delay}ms`);
      await new Promise(r => setTimeout(r, delay));
      continue;
    }
    const detail = await res.text().catch(() => "");
    throw new Error(`ElevenLabs ${res.status}: ${detail}`);
  }
  throw new Error("unreachable");
}

// ──────────────── Walk scenarios ────────────────
function* enumerateChunks(scenarios) {
  for (const [scenarioId, scenario] of Object.entries(scenarios)) {
    const grade = GRADE_LEVEL[scenarioId];
    if (!grade) {
      console.warn(`  no grade level mapped for scenario "${scenarioId}" — skipping`);
      continue;
    }
    const useShortKidPrompt = grade === "k" || grade === "1";
    const experiment = {};

    for (const stage of scenario.stages || []) {
      if (stage.synthesis) continue;
      if (!stage.prompt && !stage.promptShort && !stage.options) continue;

      // Stage prompt: keep title / sections / prompt as separate pieces so we
      // can apply different tone tags to each. We pass the structured sections
      // array (not pre-joined) so the tone builder can insert pause + breath
      // beats between label and body. plainText still uses the flat
      // sectionsToSpeech for the cache hash and the Web Speech fallback.
      const sections = resolveStaticStorySections(stage);
      const prompt = resolveStaticPrompt({ stage, experiment, useShortKidPrompt });
      if (sections !== null && prompt !== null) {
        const sectionsText = sectionsToSpeech(sections);
        const plainText = buildSpeechText([stage.title, sectionsText, prompt]);
        if (plainText) {
          yield {
            scenarioId,
            slot: `stage-${stage.id}-prompt`,
            type: "stage-prompt",
            parts: { title: stage.title || "", sectionsArr: sections, prompt },
            plainText,
          };
        }
      }

      for (const opt of stage.options || []) {
        if (opt.text) {
          yield {
            scenarioId,
            slot: `stage-${stage.id}-option-${opt.label}`,
            type: "option",
            parts: { label: opt.label, text: opt.text },
            plainText: `Choice ${opt.label}. ${opt.text}`,
          };
        }
        if (opt.reflection) {
          yield {
            scenarioId,
            slot: `stage-${stage.id}-option-${opt.label}-reflection`,
            type: "reflection",
            parts: { text: opt.reflection },
            plainText: opt.reflection,
          };
        }
      }
    }

    const lab = scenario.studentLab || {};
    if (lab.wonder)      yield { scenarioId, slot: "lab-wonder",       type: "lab-wonder",       parts: { text: lab.wonder },      plainText: lab.wonder };
    if (lab.bigIdea)     yield { scenarioId, slot: "lab-bigidea",      type: "lab-bigidea",      parts: { text: lab.bigIdea },     plainText: lab.bigIdea };
    if (lab.tryThis)     yield { scenarioId, slot: "lab-trythis",      type: "lab-trythis",      parts: { text: lab.tryThis },     plainText: lab.tryThis };
    if (lab.spotTheSlip) yield { scenarioId, slot: "lab-spottheslip",  type: "lab-spottheslip",  parts: { text: lab.spotTheSlip }, plainText: lab.spotTheSlip };

    for (const item of enumerateSynthesisAudioItems({ [scenarioId]: scenario })) {
      yield {
        scenarioId: item.scenarioId,
        slot: item.slot,
        type: item.type,
        parts: { text: item.text },
        plainText: item.text,
      };
    }
  }
}

function buildToneText(chunk) {
  const builder = TONE_TEXT[chunk.type];
  if (!builder) throw new Error(`No tone builder for type "${chunk.type}"`);
  const grade = GRADE_LEVEL[chunk.scenarioId];
  return stripEmphasis(builder(chunk.parts, grade, chunk.scenarioId));
}

// ──────────────── Main ────────────────
async function main() {
  const args = parseArgs(process.argv);

  console.log(`K-5 audio generation`);
  console.log(`  voice:    ${VOICE_ID}`);
  console.log(`  model:    ${MODEL_ID}`);
  console.log(`  settings: ${JSON.stringify(VOICE_SETTINGS)}`);
  if (args.dryRun) console.log(`  mode:     DRY RUN — no API calls, no file writes`);
  if (args.force) console.log(`  mode:     FORCE — ignoring cache`);
  if (args.scenario) console.log(`  scenario: ${args.scenario}`);
  console.log("");

  const manifest = await loadManifest();
  manifest.scenarios = manifest.scenarios || {};

  const scenarios = args.scenario
    ? { [args.scenario]: K5_SCENARIO_COPY[args.scenario] }
    : K5_SCENARIO_COPY;
  if (args.scenario && !K5_SCENARIO_COPY[args.scenario]) {
    console.error(`Unknown scenario: ${args.scenario}`);
    process.exit(1);
  }

  let generated = 0, skipped = 0, totalChars = 0;
  const planned = [];

  for (const chunk of enumerateChunks(scenarios)) {
    planned.push(chunk);
  }

  console.log(`Planned ${planned.length} chunk(s).\n`);

  for (const chunk of planned) {
    const { scenarioId, slot, plainText } = chunk;
    const toneText = buildToneText(chunk);
    const hash = hashChunk(toneText);
    const existing = manifest.scenarios[scenarioId]?.[slot];
    const cached = !args.force && existing?.hash === hash && existsSync(resolve(REPO, "public" + existing.file));

    if (cached) {
      skipped++;
      if (args.dryRun) console.log(`  [skip ] ${scenarioId}/${slot} (${plainText.length}c)`);
      continue;
    }

    if (args.dryRun) {
      console.log(`  [plan ] ${scenarioId}/${slot} (${plainText.length}c) :: "${toneText.slice(0, 80)}${toneText.length > 80 ? "…" : ""}"`);
      generated++;
      totalChars += toneText.length;
      continue;
    }

    const dir = resolve(PUBLIC_AUDIO_DIR, scenarioId);
    await mkdir(dir, { recursive: true });
    const file = resolve(dir, `${slot}.mp3`);

    process.stdout.write(`  [gen  ] ${scenarioId}/${slot} (${plainText.length}c) ... `);
    try {
      const buf = await elevenlabsTTS(toneText);
      await writeFile(file, buf);
      manifest.scenarios[scenarioId] = manifest.scenarios[scenarioId] || {};
      manifest.scenarios[scenarioId][slot] = {
        file: `/audio/k5/${scenarioId}/${slot}.mp3`,
        hash,
        chars: plainText.length,
        bytes: buf.length,
      };
      await saveManifest(manifest);
      generated++;
      totalChars += toneText.length;
      console.log(`ok (${(buf.length / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.log(`FAILED`);
      console.error(`    ${err.message}`);
      throw err;
    }
  }

  console.log("");
  console.log(`Done. Generated: ${generated}  Skipped (cached): ${skipped}  Chars: ${totalChars}`);
  if (!args.dryRun) {
    const cost = (totalChars / 1000) * 0.15;  // Rough turbo v2.5 estimate (~$0.15/1k chars in 2026)
    console.log(`Approx. ElevenLabs cost: ~$${cost.toFixed(2)} (estimate, varies by plan)`);
    console.log(`Manifest written to ${MANIFEST_PATH}`);
  }
}

// Only run main() when invoked directly via the CLI — not when imported as a
// module (e.g. for unit tests or one-off helpers). This prevents accidental
// generation runs when something does `import("./scripts/generate-k5-audio.mjs")`.
const isCLI = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isCLI) {
  main().catch(err => {
    console.error(`\nFATAL: ${err.message}`);
    process.exit(1);
  });
}
