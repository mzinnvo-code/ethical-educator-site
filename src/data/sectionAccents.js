import { C } from "../theme.js";

// Section accent + label mapping. Used by:
//   - the section stripe under the topbar (App.jsx) for "you are here" signal
//   - per-page OG cards (src/data/ogPages.js mirrors these where applicable)
//   - searchDocs.js section labels (independent mirror — keep in sync)
//
// Routes are matched by:
//   1. exact pageId
//   2. then by longest URL prefix (so "ai-education/foundations" matches the
//      "ai-education/" entry, "for-educators" matches its own entry, etc.)
//
// Home + the legal/site pages return a muted accent so the stripe stays
// understated where there's no section context.

const SECTION_RULES = [
  // Prefix matches first (longest wins via sort below)
  { prefix: "ai-education/", accent: C.ocean, label: "AI in Education" },
  { prefix: "thought-experiments/", accent: C.teal, label: "Thought Experiments" },
  { prefix: "audiences/", accent: C.gold, label: "By Audience" },

  // Exact matches
  { id: "home", accent: C.textMuted, label: "Home" },
  { id: "thought-experiments", accent: C.teal, label: "Thought Experiments" },
  { id: "for-educators", accent: C.gold, label: "For Educators" },
  { id: "ai-education", accent: C.ocean, label: "AI in Education" },
  { id: "ai-ethics", accent: C.coral, label: "AI & Ethics" },
  { id: "ai-consciousness", accent: C.coral, label: "AI & Ethics" },
  { id: "ai-authorship-quandary", accent: C.coral, label: "AI & Ethics" },
  { id: "ai-ambiguity-to-action", accent: C.coral, label: "AI & Ethics" },
  { id: "ai-paradox", accent: C.coral, label: "AI & Ethics" },
  { id: "ai-replace-teachers", accent: C.coral, label: "AI & Ethics" },
  { id: "moral-psych", accent: C.teal, label: "Philosophy" },
  // C.green keeps Philosophy in K–12 distinct from its neighbors in the
  // top nav (AI in Education = ocean, AI & Ethics = coral).
  { id: "phil-education", accent: C.green, label: "Philosophy" },

  // For-Educators sub-pages (live at top-level slugs)
  { id: "teaching-feedback", accent: C.gold, label: "For Educators" },
  { id: "enhancing-feedback", accent: C.gold, label: "For Educators" },
  { id: "enhancing-engagement", accent: C.gold, label: "For Educators" },
  { id: "async-engagement", accent: C.gold, label: "For Educators" },
  { id: "av-resources", accent: C.gold, label: "For Educators" },
  { id: "quality-leadership", accent: C.gold, label: "For Educators" },
  { id: "high-performing-schools", accent: C.gold, label: "For Educators" },
  { id: "rti", accent: C.gold, label: "For Educators" },

  { id: "resources", accent: C.sand, label: "Reference" },
  { id: "credits", accent: C.sand, label: "Reference" },
  { id: "newsletter", accent: C.teal, label: "Newsletter" },
  { id: "whats-new", accent: C.gold, label: "Changelog" },
  { id: "stories", accent: C.gold, label: "From the Classroom" },
  { id: "picker", accent: C.coral, label: "Picker" },
  { id: "about", accent: C.ocean, label: "About" },

  // Legal / site
  { id: "privacy", accent: C.textMuted, label: "Site" },
  { id: "terms", accent: C.textMuted, label: "Site" },
  { id: "accessibility", accent: C.textMuted, label: "Site" },
];

// Pre-split for fast lookup; prefix rules sorted longest-first.
const EXACT_RULES = SECTION_RULES.filter(r => r.id).reduce((acc, r) => {
  acc[r.id] = r;
  return acc;
}, {});

const PREFIX_RULES = SECTION_RULES
  .filter(r => r.prefix)
  .sort((a, b) => b.prefix.length - a.prefix.length);

export function getSectionFor(pageId) {
  if (!pageId) return { accent: C.textMuted, label: null };
  if (EXACT_RULES[pageId]) return EXACT_RULES[pageId];
  for (const rule of PREFIX_RULES) {
    if (pageId.startsWith(rule.prefix)) return rule;
  }
  return { accent: C.textMuted, label: null };
}

export function getSectionAccent(pageId) {
  return getSectionFor(pageId).accent;
}

export function getSectionLabel(pageId) {
  return getSectionFor(pageId).label;
}
