import { useEffect, useMemo, useRef, useState } from "react";
import MiniSearch from "minisearch";
import { buildSearchDocs, buildExperimentDocs } from "../lib/searchDocs.js";

const MINISEARCH_OPTIONS = {
  fields: ["title", "description", "section"],
  storeFields: ["title", "description", "section", "url", "type"],
  searchOptions: {
    boost: { title: 3, section: 1.5 },
    prefix: true,
    fuzzy: 0.2,
    combineWith: "AND",
  },
};

// Builds a MiniSearch index from PAGE_META synchronously (the data is already
// in the main bundle), then lazy-loads EXPERIMENTS on first init and appends
// experiment-level docs to the same index. Until that lazy load resolves,
// search returns page-level results only; once it does, experiment titles
// like "Plato's Cave" or "The Magic Toy" are findable directly.
export function useSearch(pageMeta) {
  const indexRef = useRef(null);
  const [docCount, setDocCount] = useState(0);

  const pageDocs = useMemo(() => buildSearchDocs(pageMeta), [pageMeta]);

  useEffect(() => {
    const mini = new MiniSearch(MINISEARCH_OPTIONS);
    mini.addAll(pageDocs);
    indexRef.current = mini;
    setDocCount(pageDocs.length);

    // Async append of experiment docs. import() returns the module — pulls
    // in the experiments + scenes chunk only when search is actually used.
    let cancelled = false;
    import("../data/experiments.js")
      .then((mod) => {
        if (cancelled || !indexRef.current) return;
        const docs = buildExperimentDocs(mod.EXPERIMENTS);
        indexRef.current.addAll(docs);
        setDocCount((n) => n + docs.length);
      })
      .catch((err) => {
        // Search still works with page docs only; just log and move on.
        // eslint-disable-next-line no-console
        if (import.meta.env?.DEV) console.warn("[search] failed to load experiment docs", err);
      });

    return () => { cancelled = true; };
  }, [pageDocs]);

  function search(query) {
    if (!indexRef.current) return [];
    const trimmed = query.trim();
    if (!trimmed) return [];
    return indexRef.current.search(trimmed).slice(0, 12);
  }

  return { ready: docCount > 0, search, docCount };
}
