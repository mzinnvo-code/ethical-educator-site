// Color palette derived from impressionist beach paintings
// Deep midnight blues, ocean teals, golden ambers, warm corals, palm greens
export const C = {
  bg: "#0b1622",
  bgAlt: "#0e1e30",
  surface: "#12253d",
  surfaceHover: "#163050",
  midnight: "#081220",
  ocean: "#1a5a8a",
  teal: "#1a8a7a",
  sky: "#2a88c0",
  gold: "#c89830",
  goldLight: "#e0b848",
  goldMuted: "#8a7028",
  sand: "#d4b868",
  green: "#2a6a38",
  greenLight: "#48884a",
  coral: "#c07040",
  textPrimary: "#e0dcd0",
  textSecondary: "#90a0b0",
  textMuted: "#607080",
  border: "rgba(200,152,48,0.12)",
  borderHover: "rgba(200,152,48,0.3)",
  glow: "rgba(200,152,48,0.06)",
};

export const PAGES = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "moral-psych", label: "Moral Psychology" },
  { id: "ai-ethics", label: "AI & Ethics" },
  { id: "ai-education", label: "AI in Education" },
  { id: "phil-education", label: "Philosophy in K–12" },
  { id: "thought-experiments", label: "Thought Experiments" },
  { id: "resources", label: "Resources" },
];

// Date each thought experiment was added — used for "NEW" badge calculation
export const THOUGHT_EXPERIMENT_DATES = {
  "the-shortcut": new Date("2026-04-15"),
  "trolley-problem": new Date("2026-03-01"),
  "ai-authorship": new Date("2026-04-15"),
  "reluctant-educator": new Date("2026-04-15"),
  "digital-doppelganger": new Date("2026-04-15"),
};

export function isNewExperiment(id) {
  const date = THOUGHT_EXPERIMENT_DATES[id];
  if (!date) return false;
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return date > thirtyDaysAgo;
}

export function hasAnyNewExperiments() {
  return Object.keys(THOUGHT_EXPERIMENT_DATES).some(id => isNewExperiment(id));
}
