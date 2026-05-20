import { useMemo, useState } from "react";

// Pure filter helpers ────────────────────────────────────────────────

function getThemeIds(experiment) {
  return [experiment.philosophyTheme, ...(experiment.secondaryThemes || [])].filter(Boolean);
}

function getStageSearchText(experiment) {
  return (experiment.stages || [])
    .map(stage => {
      const sections = Array.isArray(stage.storySections) ? stage.storySections : [];
      return [
        stage.title,
        typeof stage.prompt === "string" ? stage.prompt : "",
        ...sections.map(section => `${section.label || ""} ${section.text || ""}`),
      ].filter(Boolean).join(" ");
    })
    .join(" ");
}

export function filterExperiments(experiments, { topics = [], themes = [], grades = [], hasKit = false, q = "" } = {}) {
  const normalizedQ = q.trim().toLowerCase();
  return experiments.filter(e => {
    if (topics.length && !topics.some(t => e.topics.includes(t))) return false;
    if (themes.length && !themes.some(t => getThemeIds(e).includes(t))) return false;
    if (grades.length && !grades.some(g => (e.gradeBands || []).includes(g))) return false;
    if (hasKit && !e.teacherKit) return false;
    if (normalizedQ) {
      const haystack = [
        e.title,
        e.tagline,
        e.prompt,
        e.topics.join(" "),
        e.philosophyTheme,
        ...(e.secondaryThemes || []),
        getStageSearchText(e),
      ].filter(Boolean).join(" ").toLowerCase();
      if (!haystack.includes(normalizedQ)) return false;
    }
    return true;
  });
}

// React hook ─────────────────────────────────────────────────────────

export function useExperimentFilter(experiments) {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [selectedGrades, setSelectedGrades] = useState([]);
  const [hasKitOnly, setHasKitOnly] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () => filterExperiments(experiments, {
      topics: selectedTopics,
      themes: selectedThemes,
      grades: selectedGrades,
      hasKit: hasKitOnly,
      q: query,
    }),
    [experiments, selectedTopics, selectedThemes, selectedGrades, hasKitOnly, query]
  );

  const toggleTopic = (id) => {
    setSelectedTopics(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const toggleTheme = (id) => {
    setSelectedThemes(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const toggleGrade = (id) => {
    setSelectedGrades(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const toggleHasKit = () => setHasKitOnly(prev => !prev);

  const clearFilters = () => {
    setSelectedTopics([]);
    setSelectedThemes([]);
    setSelectedGrades([]);
    setHasKitOnly(false);
    setQuery("");
  };

  return {
    filtered,
    selectedTopics,
    setSelectedTopics,
    selectedThemes,
    setSelectedThemes,
    selectedGrades,
    setSelectedGrades,
    hasKitOnly,
    setHasKitOnly,
    toggleTopic,
    toggleTheme,
    toggleGrade,
    toggleHasKit,
    query,
    setQuery,
    clearFilters,
    activeCount:
      selectedTopics.length +
      selectedThemes.length +
      selectedGrades.length +
      (hasKitOnly ? 1 : 0) +
      (query.trim() ? 1 : 0),
  };
}
