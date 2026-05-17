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
  { id: "thought-experiments", label: "Thought Experiments" },
  { id: "for-educators", label: "For Educators" },
  { id: "ai-education", label: "AI in Education", matchPrefix: "ai-education/" },
  { id: "phil-education", label: "Philosophy in K–12" },
  { id: "ai-ethics", label: "AI & Ethics" },
  { id: "moral-psych", label: "Moral Psychology" },
  { id: "resources", label: "Resources" },
  { id: "about", label: "About" },
];

// Date each thought experiment was added — used for "NEW" badge calculation
export const THOUGHT_EXPERIMENT_DATES = {
  // Flagships
  "the-shortcut": new Date("2026-04-15"),
  "ai-authorship": new Date("2026-04-15"),
  "reluctant-educator": new Date("2026-04-15"),
  "digital-doppelganger": new Date("2026-04-15"),
  // Bank — added 2026-04-30 with the K-12 expansion
  "magic-toy": new Date("2026-04-30"),
  "invisible-ring": new Date("2026-04-30"),
  "robot-friend-turn": new Date("2026-04-30"),
  "honesty-protection": new Date("2026-04-30"),
  "robot-pet-goodbye": new Date("2026-04-30"),
  "ai-art-help": new Date("2026-04-30"),
  "messy-robot": new Date("2026-04-30"),
  "rules-vs-helping": new Date("2026-04-30"),
  "rude-toy": new Date("2026-04-30"),
  "winning-game": new Date("2026-04-30"),
  "always-agreeable-ai-friend": new Date("2026-05-03"),
  "same-toy-or-not": new Date("2026-05-03"),
  "ai-written-story": new Date("2026-05-03"),
  "gps-shortcut": new Date("2026-05-03"),
  "ai-photo-art": new Date("2026-05-03"),
  "adaptive-learning-fairness": new Date("2026-05-03"),
  "conflicting-ai-answers": new Date("2026-05-03"),
  "robot-rules-real-life": new Date("2026-05-03"),
  "elementary-trolley": new Date("2026-05-03"),
  "ai-science-fair": new Date("2026-05-03"),
  "online-friend-or-ai": new Date("2026-05-03"),
  "ai-homework-help": new Date("2026-05-03"),
  "biased-classroom-robot": new Date("2026-05-03"),
  "ai-grading-mistake": new Date("2026-05-03"),
  "trolley-self-driving": new Date("2026-04-30"),
  "ship-of-theseus-robot": new Date("2026-04-30"),
  "brain-in-vat": new Date("2026-04-30"),
  "sorites-heap": new Date("2026-04-30"),
  "tragedy-commons": new Date("2026-04-30"),
  "liar-paradox": new Date("2026-04-30"),
  "deepfake-election": new Date("2026-04-30"),
  "biased-resume-ai": new Date("2026-04-30"),
  "autonomous-car-rider": new Date("2026-04-30"),
  "veil-of-ignorance": new Date("2026-04-30"),
  "platos-cave": new Date("2026-04-30"),
  "marys-room": new Date("2026-04-30"),
  "chinese-room": new Date("2026-04-30"),
  "experience-machine": new Date("2026-04-30"),
  "ring-of-gyges": new Date("2026-04-30"),
  "omelas": new Date("2026-04-30"),
  "drowning-child": new Date("2026-04-30"),
  "paperclip-maximizer": new Date("2026-04-30"),
  "ai-in-the-box": new Date("2026-04-30"),
  "simulation-argument": new Date("2026-04-30"),
  "school-surveillance": new Date("2026-04-30"),
  "ai-detector-false-positive": new Date("2026-04-30"),
  "ai-policy-design": new Date("2026-04-30"),
  "ai-grading-companion": new Date("2026-04-30"),
  "biased-admissions": new Date("2026-04-30"),
  "ai-friend-feelings": new Date("2026-04-30"),
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
