// Curated list of recent updates to the site. Surfaced in two places:
//
//   1. WhatsNewModule on the homepage (3 most recent items)
//   2. /whats-new archive page (all items, reverse-chron, grouped by month)
//
// To add an entry when something ships:
//   - Pick a stable `id` (kebab-case)
//   - Use ISO date `YYYY-MM-DD` so reverse-chron sort is trivially correct
//   - Pick a `type` from: feature | experiment | research | article | update
//   - Title under ~80 chars, blurb 1–2 sentences
//   - Internal URL paths (no leading https://) navigate via the SPA router
//
// New items show a "NEW" pill on the homepage for the first 14 days
// (`isFresh()` below). The "This week" eyebrow rotates to "Latest updates"
// when nothing is fresh, so the module gracefully degrades.

export const WHATS_NEW = [
  {
    id: "tools-hub",
    date: "2026-05-22",
    type: "feature",
    title: "New hub: all four interactive tools in one place",
    blurb: "The Picker, the AI Use Rubric, the AI Policy Builder, and the Family Conversation Generator now live together at /tools — with a clear note on who each one is for and when to reach for it. The 'Tools' link in the topbar nav is the new entry point.",
    url: "/tools",
  },
  {
    id: "family-conversation-generator",
    date: "2026-05-21",
    type: "feature",
    title: "New tool: the Family Conversation Generator",
    blurb: "For parents and caregivers, not teachers. Pick your child's age and a topic — AI homework, deepfakes, AI friends, privacy, creativity, the future of work — and get five short prompts to start a conversation at dinner or in the car. The goal: hear what your kid thinks before you say what you think.",
    url: "/family-conversations",
  },
  {
    id: "ai-policy-builder",
    date: "2026-05-21",
    type: "feature",
    title: "New tool: the AI Policy Builder",
    blurb: "Nine questions about your school's stance on AI → a 1–2 page draft policy you can copy or download. Designed to give a leadership team a structured starting point in ten minutes, not to replace the work of writing the real thing with counsel and community.",
    url: "/ai-policy",
  },
  {
    id: "ai-use-rubric",
    date: "2026-05-21",
    type: "feature",
    title: "New tool: the AI Use Rubric",
    blurb: "Six dimensions — cognitive substitution, bias, privacy, authorship, equity, oversight — to score a proposed AI use before adopting it. Get a go / discuss / redesign recommendation with the rationale to take into your next leadership meeting.",
    url: "/ai-rubric",
  },
  {
    id: "thought-experiment-picker",
    date: "2026-05-20",
    type: "feature",
    title: "New tool: the Thought Experiment Picker",
    blurb: "Answer three quick questions about grade, time, and topic — get three classroom-ready experiments that fit. No login. Designed for the Sunday planning block.",
    url: "/picker",
  },
  {
    id: "sunday-dilemma-newsletter",
    date: "2026-05-20",
    type: "feature",
    title: "The Sunday Dilemma — a new weekly newsletter for teachers",
    blurb: "One classroom-ready thought experiment, one printable, and one research finding — in your inbox every Sunday morning. Free, no spam, unsubscribe in one click.",
    url: "/newsletter",
  },
  {
    id: "printable-teacher-kits",
    date: "2026-05-20",
    type: "feature",
    title: "Every teacher kit is now printable",
    blurb: "A new \"Print this kit\" button on every lesson plan opens a chrome-free print view. Print on paper or Save as PDF for sharing — the whole discussion guide, exit ticket, and standards in one document.",
    url: "/thought-experiments",
  },
  {
    id: "stage-specific-illustrations",
    date: "2026-05-19",
    type: "update",
    title: "New stage-specific illustrations across thought experiments",
    blurb: "Each branching scenario now has hand-crafted visuals for every stage of the dilemma, not just the opening scene. Watch the story shift as students make their choices.",
    url: "/thought-experiments",
  },
  {
    id: "ai-education-hub-rebuild",
    date: "2026-05-17",
    type: "research",
    title: "AI in Education hub — rebuilt with six deep-dive pages",
    blurb: "Foundations, classroom practice, student tools, policy & ethics, future readiness, and a curated tools & resources page. Built around 2024–2026 research and the real questions teachers and leaders are asking.",
    url: "/ai-education",
  },
  {
    id: "explaining-red-k2",
    date: "2026-05-13",
    type: "experiment",
    title: "Explaining Red — a new K–2 classroom scene",
    blurb: "A new student named Ada joins the class while everyone is learning about colors. A gentle multi-character thought experiment on how to share what red is — even with someone who has never seen it.",
    url: "/thought-experiments/explaining-red-k-2",
  },
  {
    id: "ai-consciousness-essay",
    date: "2026-05-09",
    type: "article",
    title: "The Consciousness Line — a philosophical follow-up to Anil Seth",
    blurb: "A philosophically grounded continuation of Anil Seth's AI consciousness caution, with synthetic biology, octopuses, organoids, Nagel, Austin, and ethical humility under uncertainty.",
    url: "/ai-consciousness",
  },
  {
    id: "k12-thought-experiment-expansion",
    date: "2026-04-30",
    type: "experiment",
    title: "40+ new thought experiments across K–12",
    blurb: "A full library expansion: Plato's Cave, Mary's Room, the Chinese Room, the Trolley Problem, plus AI-era dilemmas on deepfakes, biased algorithms, AI detectors, and adaptive learning fairness. Every grade band gets fresh material.",
    url: "/thought-experiments",
  },
];

const TYPE_LABEL = {
  feature: "Feature",
  experiment: "New experiment",
  research: "Research hub",
  article: "New article",
  update: "Update",
};

const TYPE_COLOR = {
  feature: "teal",
  experiment: "gold",
  research: "ocean",
  article: "coral",
  update: "sand",
};

export function getTypeLabel(type) {
  return TYPE_LABEL[type] || "Update";
}

export function getTypeColorKey(type) {
  return TYPE_COLOR[type] || "gold";
}

// Sort reverse-chron (newest first). Secondary sort is source-array order
// (insertion order) so curators can feature an entry within a same-date
// group by moving it to the top of WHATS_NEW.
export function getWhatsNewSorted() {
  return WHATS_NEW
    .map((item, index) => ({ item, index }))
    .sort((a, b) => {
      if (a.item.date !== b.item.date) return a.item.date < b.item.date ? 1 : -1;
      return a.index - b.index;
    })
    .map(({ item }) => item);
}

// True if the item shipped in the last `days` days. Used for "NEW" pills.
export function isFresh(item, days = 14) {
  if (!item?.date) return false;
  const itemMs = new Date(item.date).getTime();
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  return itemMs >= cutoff;
}

export function hasAnyFresh(days = 14) {
  return WHATS_NEW.some(item => isFresh(item, days));
}

// Pretty date for the date pill: "May 20" (short month + day, no year)
// and "May 20, 2026" for the archive page.
//
// Why the `T12:00:00` suffix: `new Date("2026-05-20")` parses as UTC midnight,
// which is the previous day's evening in any UTC-negative timezone. Noon-local
// parsing never crosses a day boundary in any reasonable timezone, so the
// displayed day stays correct.
export function formatDateShort(iso) {
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function formatDateLong(iso) {
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
}

// Group items by "YYYY-MM" for the archive page. Constructs the label date
// with explicit local-tz numbers (no UTC parsing) so the month doesn't
// shift back in UTC-negative timezones.
export function groupByMonth(items) {
  const groups = new Map();
  for (const item of items) {
    const key = item.date.slice(0, 7); // YYYY-MM
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  }
  return Array.from(groups.entries()).map(([monthKey, monthItems]) => {
    const year = Number(monthKey.slice(0, 4));
    const month = Number(monthKey.slice(5, 7));
    const d = new Date(year, month - 1, 1);
    const label = d.toLocaleDateString(undefined, { month: "long", year: "numeric" });
    return { monthKey, label, items: monthItems };
  });
}
