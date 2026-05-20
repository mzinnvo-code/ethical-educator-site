import { useEffect, useMemo, useRef, useState } from "react";
import MiniSearch from "minisearch";
import { buildSearchDocs } from "../lib/searchDocs.js";

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

// Builds a MiniSearch index from PAGE_META lazily — the first call to
// search() initializes the index; subsequent calls reuse it.
export function useSearch(pageMeta) {
  const docsRef = useRef(null);
  const indexRef = useRef(null);
  const [ready, setReady] = useState(false);

  const docs = useMemo(() => buildSearchDocs(pageMeta), [pageMeta]);

  useEffect(() => {
    docsRef.current = docs;
    const mini = new MiniSearch(MINISEARCH_OPTIONS);
    mini.addAll(docs);
    indexRef.current = mini;
    setReady(true);
  }, [docs]);

  function search(query) {
    if (!ready || !indexRef.current) return [];
    const trimmed = query.trim();
    if (!trimmed) return [];
    const results = indexRef.current.search(trimmed);
    return results.slice(0, 12);
  }

  return { ready, search, docCount: docs.length };
}
