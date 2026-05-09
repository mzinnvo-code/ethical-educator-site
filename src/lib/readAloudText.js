// Shared "read aloud" text builders. Used by ScenarioCard at runtime AND by
// scripts/generate-k5-audio.mjs at build time so the spoken MP3 matches the
// text the page actually displays. Single source of truth — do not duplicate
// these helpers elsewhere.

export function cleanSpeechPart(part) {
  return String(part)
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[.?!]+$/g, "");
}

export function sectionsToSpeech(sections) {
  if (!Array.isArray(sections)) return "";
  return sections
    .filter(section => section?.text)
    .map(section => `${section.label ? `${section.label}. ` : ""}${section.text}`)
    .join(" ");
}

export function buildSpeechText(parts) {
  return parts
    .filter(Boolean)
    .map(cleanSpeechPart)
    .filter(Boolean)
    .join(". ");
}

// Mirror of the runtime `useShortKidPrompt` rule at ScenarioCard.jsx so the
// generation script picks the same prompt variant as the page.
export function shouldUseShortKidPrompt({ mode, gradeLevels }) {
  const grade = gradeLevels?.[0];
  return mode === "kid" && (grade === "k" || grade === "1");
}

// Resolve the prompt for a given (stage, experiment) pair. Returns null if the
// prompt is a function — the generation script skips dynamic prompts; runtime
// resolves them inline with `chose` context.
export function resolveStaticPrompt({ stage, experiment, useShortKidPrompt }) {
  if (useShortKidPrompt) {
    const short = stage.promptShort || experiment.promptShort;
    if (short) return short;
  }
  if (typeof stage.prompt === "function") return null;
  return stage.prompt ?? experiment.prompt ?? null;
}

export function resolveStaticStorySections(stage) {
  if (typeof stage.storySections === "function") return null;
  if (!Array.isArray(stage.storySections)) return [];
  return stage.storySections.filter(section => section?.text);
}

// Compose the full read-aloud string for a stage, mirroring the runtime
// concatenation: [stage.title || experiment.title, sectionsToSpeech(...), prompt]
// Returns null if any required field is dynamic (the script will skip; runtime
// computes it inline).
export function buildStageSpeechText({ stage, experiment, useShortKidPrompt }) {
  const sections = resolveStaticStorySections(stage);
  if (sections === null) return null;
  const prompt = resolveStaticPrompt({ stage, experiment, useShortKidPrompt });
  if (prompt === null) return null;
  return buildSpeechText([
    stage.title || experiment.title,
    sectionsToSpeech(sections),
    prompt,
  ]);
}
