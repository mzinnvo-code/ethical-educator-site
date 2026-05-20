// Build the document set the search palette indexes. Source of truth for v1
// is PAGE_META (every routed page on the site, with its title + description).
// v2 will add experiment-level docs (each thought experiment as its own entry)
// and teacher kit docs — both require pulling from src/data/experiments.js,
// which is heavy. Adding them is mechanical when the time comes.

const SECTION_BY_PREFIX = [
  { prefix: "thought-experiments/", section: "Thought Experiments" },
  { prefix: "ai-education/", section: "AI in Education" },
  { prefix: "audiences/", section: "By Audience" },
];

// Path segments that aren't themselves a page but a parent group label.
const TOP_LEVEL_SECTION = {
  "thought-experiments": "Thought Experiments",
  "ai-education": "AI in Education",
  "ai-ethics": "AI & Ethics",
  "ai-consciousness": "AI & Ethics",
  "ai-authorship-quandary": "AI & Ethics",
  "ai-ambiguity-to-action": "AI & Ethics",
  "ai-paradox": "AI & Ethics",
  "ai-replace-teachers": "AI & Ethics",
  "moral-psych": "Philosophy",
  "phil-education": "Philosophy",
  "for-educators": "For Educators",
  "teaching-feedback": "For Educators",
  "enhancing-feedback": "For Educators",
  "enhancing-engagement": "For Educators",
  "async-engagement": "For Educators",
  "av-resources": "For Educators",
  "quality-leadership": "For Educators",
  "high-performing-schools": "For Educators",
  "rti": "For Educators",
  "resources": "Reference",
  "credits": "Reference",
  "about": "About",
  "accessibility": "Site",
  "privacy": "Site",
  "terms": "Site",
  "newsletter": "Newsletter",
  "home": "Home",
};

function sectionFor(pageId) {
  for (const { prefix, section } of SECTION_BY_PREFIX) {
    if (pageId.startsWith(prefix)) return section;
  }
  return TOP_LEVEL_SECTION[pageId] || "Pages";
}

// Strip the "— The Ethical Educator" suffix that appears in PAGE_META titles
// so the search results aren't visually noisy.
function trimTitle(title) {
  if (!title) return "";
  return title.replace(/\s*[—-]\s*The Ethical Educator\s*$/i, "").trim();
}

export function buildSearchDocs(pageMeta) {
  if (!pageMeta) return [];
  return Object.entries(pageMeta).map(([id, meta]) => ({
    id,
    title: trimTitle(meta.title) || id,
    description: meta.description || "",
    section: sectionFor(id),
    url: id === "home" ? "/" : `/${id}`,
    type: "page",
  }));
}
