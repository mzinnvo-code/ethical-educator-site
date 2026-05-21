// Build the document sets the search palette indexes.
//
// Page-level docs (buildSearchDocs) ship in the main bundle because they're
// derived from PAGE_META which the app already has at boot. Experiment-level
// docs (buildExperimentDocs) are lazy-loaded inside useSearch on first
// palette open — the experiments module is ~600KB+ gz including scenes,
// so pulling it eagerly would defeat the code-splitting from PR #60.

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

// Map a K–5 grade level id ("k", "1", …, "5") to its dedicated grade page slug.
const K5_GRADE_PATH = {
  k: "kindergarten",
  "1": "grade-1",
  "2": "grade-2",
  "3": "grade-3",
  "4": "grade-4",
  "5": "grade-5",
};

const GRADE_BAND_PATH = {
  "k-5": "k-5",
  "6-8": "6-8",
  "9-12": "9-12",
  "educators": "educators",
};

const GRADE_BAND_LABEL = {
  "k-5": "K–5",
  "6-8": "Grades 6–8",
  "9-12": "Grades 9–12",
  "educators": "Educator PD",
};

// Experiments that have their own dedicated standalone pages (NOT mounted
// inside a grade page's ?experiment= deep-link). Routes here win over the
// grade-page logic below. Mirror in src/pages/Picker.jsx if you add to this.
const STANDALONE_PAGES = {
  "explaining-red-k-2": "/thought-experiments/explaining-red-k-2",
};

// Pick the most specific grade-scoped URL for an experiment, then attach
// the ?experiment= deep-link so the grade page opens the right scenario.
function urlForExperiment(e) {
  if (STANDALONE_PAGES[e.id]) return STANDALONE_PAGES[e.id];
  const grades = e.gradeBands || [];
  const k5Grade = grades.includes("k-5") ? e.gradeLevels?.[0] : null;
  let pathSlug;
  if (k5Grade && K5_GRADE_PATH[k5Grade]) {
    pathSlug = K5_GRADE_PATH[k5Grade];
  } else {
    const band = grades.find((g) => GRADE_BAND_PATH[g]) || null;
    pathSlug = band ? GRADE_BAND_PATH[band] : null;
  }
  const base = pathSlug
    ? `/thought-experiments/${pathSlug}`
    : "/thought-experiments";
  return `${base}?experiment=${encodeURIComponent(e.id)}`;
}

function sectionForExperiment(e) {
  const grades = e.gradeBands || [];
  if (grades.includes("k-5")) return "Thought Experiment · K–5";
  if (grades.includes("6-8")) return "Thought Experiment · Grades 6–8";
  if (grades.includes("9-12")) return "Thought Experiment · Grades 9–12";
  if (grades.includes("educators")) return "Thought Experiment · Educator PD";
  return "Thought Experiment";
}

// Build search docs for individual thought experiments. Pass the EXPERIMENTS
// array (loaded lazily by useSearch on first palette open). Each experiment
// becomes a doc with title + tagline + topic labels as searchable fields and
// a deep-link URL into the right grade page.
export function buildExperimentDocs(experiments) {
  if (!Array.isArray(experiments)) return [];
  return experiments.map((e) => {
    const description = [
      e.tagline,
      e.gradeBands?.map((g) => GRADE_BAND_LABEL[g] || g).join(", "),
    ].filter(Boolean).join(" — ");
    return {
      // Prefix experiment ids so they never collide with page ids in the index.
      id: `exp:${e.id}`,
      title: e.title,
      description,
      section: sectionForExperiment(e),
      url: urlForExperiment(e),
      type: "experiment",
    };
  });
}
