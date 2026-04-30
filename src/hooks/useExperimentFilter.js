import { useMemo, useState } from "react";

// Pure filter helpers ────────────────────────────────────────────────

export function filterExperiments(experiments, { topics = [], q = "" } = {}) {
  const normalizedQ = q.trim().toLowerCase();
  return experiments.filter(e => {
    if (topics.length && !topics.some(t => e.topics.includes(t))) return false;
    if (normalizedQ) {
      const haystack = `${e.title} ${e.tagline} ${e.prompt} ${e.topics.join(" ")}`.toLowerCase();
      if (!haystack.includes(normalizedQ)) return false;
    }
    return true;
  });
}

// React hook ─────────────────────────────────────────────────────────

export function useExperimentFilter(experiments) {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () => filterExperiments(experiments, { topics: selectedTopics, q: query }),
    [experiments, selectedTopics, query]
  );

  const toggleTopic = (id) => {
    setSelectedTopics(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const clearFilters = () => {
    setSelectedTopics([]);
    setQuery("");
  };

  return {
    filtered,
    selectedTopics,
    setSelectedTopics,
    toggleTopic,
    query,
    setQuery,
    clearFilters,
    activeCount: selectedTopics.length + (query.trim() ? 1 : 0),
  };
}
