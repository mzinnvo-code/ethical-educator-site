// Pages we generate per-page OG cards for. Curated to the most-shareable
// surfaces — every page on the site doesn't need its own card. Pages NOT
// listed here fall back to the default site OG image (set in index.html).
//
// Shape: { id, title, section, accent }
//   id      — matches the route slug used in PAGE_MAP / PAGE_META
//   title   — short title for the card (trim any "— The Ethical Educator")
//   section — eyebrow / category label
//   accent  — hex color used for the brand stripe and section pill
//
// Colors mirror the theme tokens in src/theme.js. Hard-coded here so the
// build-time script (running in node) doesn't have to import the React-y
// theme module.

export const BRAND = {
  name: "The Ethical Educator",
  author: "Matthew A. Zinn",
  url: "theethicaleducator.com",
  bg: "#0b1622",
  bgAlt: "#0e1e30",
  textPrimary: "#e0dcd0",
  textSecondary: "#90a0b0",
  textMuted: "#8a9aac",
};

export const OG_ACCENTS = {
  gold: "#c89830",
  teal: "#1a8a7a",
  ocean: "#1a5a8a",
  coral: "#c07040",
  sand: "#d4b868",
};

export const OG_PAGES = [
  { id: "home", title: "Make AI ethics usable in the classroom.", section: "For teachers, leaders, and curious thinkers", accent: OG_ACCENTS.gold },

  // Hubs
  { id: "thought-experiments", title: "Interactive Thought Experiments", section: "Classroom-ready scenarios, K–12", accent: OG_ACCENTS.teal },
  { id: "for-educators", title: "For Educators — Professional Development", section: "Practical resources for teachers and leaders", accent: OG_ACCENTS.gold },
  { id: "ai-education", title: "AI in Education", section: "A practical research hub", accent: OG_ACCENTS.ocean },
  { id: "ai-ethics", title: "AI Ethics in Education", section: "Frameworks for navigating AI in schools", accent: OG_ACCENTS.gold },
  { id: "moral-psych", title: "Moral Psychology & AI Alignment", section: "Greene, Kamm, and what neuroscience reveals", accent: OG_ACCENTS.teal },
  { id: "phil-education", title: "Philosophy in K–12 Education", section: "Curriculum, evidence, and the case for it", accent: OG_ACCENTS.coral },
  { id: "resources", title: "Research Resources & Reading List", section: "Books, papers, organizations, podcasts", accent: OG_ACCENTS.sand },
  { id: "about", title: "About Matthew A. Zinn", section: "Philosopher, educator, researcher", accent: OG_ACCENTS.ocean },

  // AI Ethics essays
  { id: "ai-consciousness", title: "The Consciousness Line", section: "AI & Ethics", accent: OG_ACCENTS.coral },
  { id: "ai-authorship-quandary", title: "The AI Authorship Quandary", section: "AI & Ethics", accent: OG_ACCENTS.gold },
  { id: "ai-ambiguity-to-action", title: "From Ambiguity to Action", section: "AI & Ethics", accent: OG_ACCENTS.teal },
  { id: "ai-paradox", title: "The Paradox of AI in Education", section: "AI & Ethics", accent: OG_ACCENTS.ocean },
  { id: "ai-replace-teachers", title: "Why AI Won't Replace Teachers — A Response", section: "AI & Ethics", accent: OG_ACCENTS.coral },

  // Newsletter + What's New
  { id: "newsletter", title: "The Sunday Dilemma — a weekly newsletter for teachers", section: "Free · One issue a week", accent: OG_ACCENTS.teal },
  { id: "whats-new", title: "What's new on The Ethical Educator", section: "Changelog", accent: OG_ACCENTS.gold },
  { id: "stories", title: "From the Classroom — stories from educators", section: "Teacher voices", accent: OG_ACCENTS.gold },
  { id: "picker", title: "Find a thought experiment in three clicks", section: "Picker · Interactive tool", accent: OG_ACCENTS.coral },
  { id: "ai-rubric", title: "Should we use AI for this? A six-dimension rubric", section: "AI Use Rubric · Interactive tool", accent: OG_ACCENTS.teal },
  { id: "ai-policy", title: "Draft your school's AI policy in ten minutes", section: "AI Policy Builder · Interactive tool", accent: OG_ACCENTS.ocean },
  { id: "family-conversations", title: "Five questions to start a family conversation about AI", section: "Family Conversations · For parents", accent: OG_ACCENTS.coral },
  { id: "tools", title: "Four interactive tools — Picker, Rubric, Policy Builder, Family Conversations", section: "Interactive Tools · Hub", accent: OG_ACCENTS.gold },

  // Audience hubs
  { id: "audiences/teacher", title: "For Teachers", section: "Classroom-ready scenarios + PD", accent: OG_ACCENTS.gold },
  { id: "audiences/administrator", title: "For Administrators & School Leaders", section: "Policy + decision tools", accent: OG_ACCENTS.ocean },
  { id: "audiences/parent", title: "For Parents & Families", section: "Conversations to have at home", accent: OG_ACCENTS.coral },
  { id: "audiences/student", title: "For Students", section: "Branching scenarios + AI dilemmas", accent: OG_ACCENTS.teal },

  // Thought experiment hubs
  { id: "thought-experiments/educators", title: "Thought Experiments for Educators", section: "Adult dilemmas for staff PD", accent: OG_ACCENTS.gold },
  { id: "thought-experiments/k-5", title: "K–5 Thought Experiments", section: "Storylike dilemmas for elementary classrooms", accent: OG_ACCENTS.teal },
  { id: "thought-experiments/6-8", title: "Grades 6–8 Thought Experiments", section: "AI ethics meets philosophy", accent: OG_ACCENTS.gold },
  { id: "thought-experiments/9-12", title: "Grades 9–12 Thought Experiments", section: "Plato's Cave to AI dilemmas", accent: OG_ACCENTS.ocean },
  { id: "thought-experiments/toolkit", title: "Dialogue Toolkit", section: "Norms, stems, protocols, Socratic moves", accent: OG_ACCENTS.coral },
];

// Fast lookup for the App.jsx-side meta updater
export const OG_PAGES_BY_ID = Object.fromEntries(OG_PAGES.map(p => [p.id, p]));
