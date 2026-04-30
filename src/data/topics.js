// Canonical topics that classify thought experiments.
// Each entry: id, label, color (hex from theme), short blurb.
// To add a new topic, add an entry here and reference its id in any experiment's `topics` array.

import { C } from "../theme.js";

export const TOPICS = [
  { id: "ai-ethics", label: "AI Ethics", color: C.teal, blurb: "How should we build, govern, and live alongside artificial intelligence?" },
  { id: "ethics", label: "Ethics", color: C.gold, blurb: "What is right? What do we owe each other?" },
  { id: "identity", label: "Identity", color: C.ocean, blurb: "What makes you, you — over time, through change, across copies?" },
  { id: "knowledge", label: "Knowledge", color: C.coral, blurb: "How do we know what we know? Can our senses be trusted?" },
  { id: "mind", label: "Mind", color: C.sky, blurb: "What does it mean to think, feel, or understand?" },
  { id: "justice", label: "Justice", color: C.green, blurb: "Fairness, rights, and the design of societies." },
  { id: "privacy", label: "Privacy", color: C.coral, blurb: "Surveillance, data, and the right to be let alone." },
  { id: "fairness", label: "Fairness", color: C.gold, blurb: "Bias, equality, and what we owe to one another." },
  { id: "free-will", label: "Free Will", color: C.ocean, blurb: "Are our choices truly our own — or determined?" },
  { id: "logic", label: "Logic", color: C.teal, blurb: "Paradoxes, language, and the limits of reasoning." },
  { id: "authenticity", label: "Authenticity", color: C.sand, blurb: "What does it mean for an experience, an action, or a self to be 'real'?" },
  { id: "honesty", label: "Honesty", color: C.gold, blurb: "Truth, deception, and the courage to tell." },
  { id: "moral-psychology", label: "Moral Psychology", color: C.coral, blurb: "How we actually reason about right and wrong." },
  { id: "education", label: "Education", color: C.teal, blurb: "What is learning for? How does AI change it?" },
  { id: "friendship", label: "Friendship", color: C.gold, blurb: "What do we owe friends — and can a machine be one?" },
  { id: "rules", label: "Rules", color: C.ocean, blurb: "When to follow them. When to break them." },
  { id: "creativity", label: "Creativity & Authorship", color: C.coral, blurb: "Whose work is it when AI helped?" },
];

export const TOPIC_BY_ID = Object.fromEntries(TOPICS.map(t => [t.id, t]));

export function getTopicLabel(id) {
  return TOPIC_BY_ID[id]?.label || id;
}

export function getTopicColor(id) {
  return TOPIC_BY_ID[id]?.color || C.gold;
}
