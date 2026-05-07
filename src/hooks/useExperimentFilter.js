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

export function filterExperiments(experiments, { topics = [], themes = [], q = "" } = {}) {
  const normalizedQ = q.trim().toLowerCase();
  return experiments.filter(e => {
    if (topics.length && !topics.some(t => e.topics.includes(t))) return false;
    if (themes.length && !themes.some(t => getThemeIds(e).includes(t))) return false;
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
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () => filterExperiments(experiments, { topics: selectedTopics, themes: selectedThemes, q: query }),
    [experiments, selectedTopics, selectedThemes, query]
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

  const clearFilters = () => {
    setSelectedTopics([]);
    setSelectedThemes([]);
    setQuery("");
  };

  return {
    filtered,
    selectedTopics,
    setSelectedTopics,
    selectedThemes,
    setSelectedThemes,
    toggleTopic,
    toggleTheme,
    query,
    setQuery,
    clearFilters,
    activeCount: selectedTopics.length + selectedThemes.length + (query.trim() ? 1 : 0),
  };
}
