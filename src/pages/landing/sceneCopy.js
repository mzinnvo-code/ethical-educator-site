// All copy for the scroll-driven landing ("The Question").
//
// PURE DATA ONLY — no JSX, no browser APIs, no theme imports. This module is
// also imported by scripts/prerender-site.mjs in Node to inject crawlable
// landing copy into the prerendered home document.

export const SCENE_VOID = {
  id: "void",
  eyebrow: "The Examined Classroom",
  headline: "Every classroom decision now starts with a question.",
  hint: "Scroll to consider it",
};

export const SCENE_DILEMMA = {
  id: "dilemma",
  kicker: "The dilemma",
  headline: "AI can write the essay. Should it?",
  body:
    "The oldest questions in philosophy just walked into your classroom wearing new clothes. The trolley problem drives a car now. Mary's Room has a chatbot. And your students are already living inside the experiment.",
  cards: [
    { title: "The Trolley Problem", grades: "Grades 9–12", image: "/illustrations/trolley.png" },
    { title: "Mary's Room", grades: "Grades 9–12", image: "/illustrations/marys-room.png" },
    { title: "The Paperclip Maximizer", grades: "Grades 6–12", image: "/illustrations/paperclip.png" },
  ],
};

export const SCENE_CHOICE = {
  id: "choice",
  kicker: "Try one — right now",
  headline: "A talking toy says it's sad when you go.",
  prompt: "Five-year-olds will ask you: is it really sad? What do you tell them?",
  choices: [
    {
      key: "a",
      label: "It really is sad",
      detail: "It said so. It acts like it means it.",
      reflection:
        "Then what do we owe it? If acting sad counts as sadness, kindness might not stop at living things.",
    },
    {
      key: "b",
      label: "It's only saying words",
      detail: "Words about feelings aren't feelings.",
      reflection:
        "How do you know? You can't see anyone's feelings — only what they do. That's the other-minds problem, and it's older than robots.",
    },
  ],
  closing: "No answer key — just a better conversation. There are 109 of these, one for every classroom.",
};

export const SCENE_LIBRARY = {
  id: "library",
  kicker: "The library",
  headline: "109 scenarios. Every grade. No answer keys.",
  body:
    "From a kindergartner's talking toy to Plato's Cave with a VR headset — each one classroom-ready, with teacher kits, read-aloud audio, and standards alignment.",
  stats: [
    { value: 109, suffix: "", label: "interactive thought experiments" },
    { value: 4, suffix: "", label: "free planning tools" },
    { value: 40, suffix: "+", label: "curated books & readings" },
    { value: null, text: "K–12", label: "a path for every grade band" },
  ],
  // Constellation cluster weights (sums to 109) — drives the particle layout.
  clusters: [
    { label: "K", count: 8 },
    { label: "1–5", count: 38 },
    { label: "6–8", count: 30 },
    { label: "9–12", count: 33 },
  ],
};

export const SCENE_DOORWAYS = {
  id: "doorways",
  kicker: "Four doorways",
  headline: "Built for whoever just walked in.",
  roles: [
    {
      key: "students",
      label: "Students",
      desc: "Stories and dilemmas built to argue with, not memorize.",
    },
    {
      key: "teachers",
      label: "Teachers",
      desc: "Classroom-ready discussions, with a toolkit to run them well.",
    },
    {
      key: "administrators",
      label: "Administrators",
      desc: "Ethical frameworks and scenarios before AI policy becomes guesswork.",
    },
    {
      key: "parents",
      label: "Parents & families",
      desc: "Kitchen-table questions for AI, homework, fairness, and judgment.",
    },
  ],
};

export const SCENE_TOOLS = {
  id: "tools",
  kicker: "The toolbelt",
  headline: "Tools that work the way teachers actually plan.",
  tools: [
    {
      name: "Thought Experiment Picker",
      desc: "Three questions. Three matched scenarios. Built for Sunday planning.",
    },
    {
      name: "AI Use Rubric",
      desc: "Score any AI use across six dimensions — from cognitive substitution to oversight.",
    },
    {
      name: "AI Policy Builder",
      desc: "Nine questions to a draft policy your leadership team can actually debate.",
    },
    {
      name: "Family Conversation Generator",
      desc: "Five car-ride questions about AI, tuned to your kid's age.",
    },
  ],
};

export const SCENE_HANDOFF = {
  id: "handoff",
  kicker: "The Examined Classroom",
  headline: "Philosophy you can use by Monday.",
  body:
    "No logins. No cost. No answer keys. Classroom-ready thought experiments, educator resources, and research-grounded AI ethics — the site begins below.",
};

export const SKIP_LABEL = "Skip intro";

// Crawlable copy appended to the prerendered "/" document by
// scripts/prerender-site.mjs. Keep these as plain sentences.
export const LANDING_SEO_TEXT = [
  SCENE_VOID.headline,
  SCENE_DILEMMA.headline,
  SCENE_DILEMMA.body,
  SCENE_LIBRARY.headline,
  SCENE_LIBRARY.body,
  "109 interactive thought experiments. 4 free planning tools. 40+ curated books and readings. A path for every grade band, K–12.",
  "For students: stories and dilemmas built to argue with, not memorize. For teachers: classroom-ready discussions with a toolkit to run them well. For administrators: ethical frameworks and scenarios before AI policy becomes guesswork. For parents and families: kitchen-table questions for AI, homework, fairness, and judgment.",
  "Tools: the Thought Experiment Picker, the AI Use Rubric, the AI Policy Builder, and the Family Conversation Generator.",
  SCENE_HANDOFF.headline,
  SCENE_HANDOFF.body,
];
