import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "ee:decision-journal:v1";
const SCHEMA_VERSION = 1;
const EMPTY_STATE = { schemaVersion: SCHEMA_VERSION, optedIn: false, entries: [] };

function readState() {
  if (typeof window === "undefined") return EMPTY_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_STATE;
    const parsed = JSON.parse(raw);
    if (parsed?.schemaVersion !== SCHEMA_VERSION) return EMPTY_STATE;
    return {
      schemaVersion: SCHEMA_VERSION,
      optedIn: !!parsed.optedIn,
      entries: Array.isArray(parsed.entries) ? parsed.entries : [],
    };
  } catch {
    return EMPTY_STATE;
  }
}

function writeState(next) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage may be full or disabled. Fail silently — the hook still works
    // for the current session via React state.
  }
}

function dominantLens(path) {
  const counts = {};
  path.forEach(step => {
    if (step?.lens) counts[step.lens] = (counts[step.lens] || 0) + 1;
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
}

function makeId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function useDecisionJournal() {
  const [state, setState] = useState(EMPTY_STATE);

  // Load on mount; sync across tabs.
  useEffect(() => {
    setState(readState());
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) setState(readState());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const persist = useCallback((updater) => {
    setState(prev => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      writeState(next);
      return next;
    });
  }, []);

  const optIn = useCallback(() => {
    persist(prev => ({ ...prev, optedIn: true }));
  }, [persist]);

  const optOutAndClear = useCallback(() => {
    persist({ schemaVersion: SCHEMA_VERSION, optedIn: false, entries: [] });
  }, [persist]);

  const addEntry = useCallback((entry) => {
    const id = makeId();
    persist(prev => ({
      ...prev,
      optedIn: true,
      entries: [
        {
          id,
          savedAt: new Date().toISOString(),
          notes: "",
          ...entry,
          dominantLens: entry.dominantLens || dominantLens(entry.path || []),
        },
        ...prev.entries,
      ],
    }));
    return id;
  }, [persist]);

  const updateNotes = useCallback((id, notes) => {
    persist(prev => ({
      ...prev,
      entries: prev.entries.map(e => (e.id === id ? { ...e, notes } : e)),
    }));
  }, [persist]);

  const removeEntry = useCallback((id) => {
    persist(prev => ({
      ...prev,
      entries: prev.entries.filter(e => e.id !== id),
    }));
  }, [persist]);

  const clearEntries = useCallback(() => {
    persist(prev => ({ ...prev, entries: [] }));
  }, [persist]);

  return {
    optedIn: state.optedIn,
    entries: state.entries,
    optIn,
    optOutAndClear,
    addEntry,
    updateNotes,
    removeEntry,
    clearEntries,
  };
}

export function entriesToMarkdown(entries) {
  if (!entries.length) return "# Decision Journal\n\nNo entries yet.\n";
  const lines = [
    "# Decision Journal",
    "",
    `Exported from The Ethical Educator on ${new Date().toLocaleDateString()}.`,
    "",
    `${entries.length} ${entries.length === 1 ? "entry" : "entries"}.`,
    "",
    "---",
    "",
  ];
  entries.forEach(entry => {
    const date = entry.savedAt ? new Date(entry.savedAt).toLocaleString() : "";
    lines.push(`## ${entry.experimentTitle}`);
    if (date) lines.push(`*Saved ${date}* — ${entry.gradeBand || "—"}`);
    lines.push("");
    if (entry.dominantLens) {
      lines.push(`**Dominant lens:** ${entry.dominantLens.replace(/-/g, " ")}`);
      lines.push("");
    }
    if (entry.path?.length) {
      lines.push("**Path:**");
      entry.path.forEach((step, i) => {
        const lens = step?.lens ? ` _(${step.lens.replace(/-/g, " ")})_` : "";
        const stage = step?.stageTitle ? `${step.stageTitle} — ` : "";
        lines.push(`${i + 1}. ${stage}${step?.optionText || "(no choice recorded)"}${lens}`);
      });
      lines.push("");
    }
    if (entry.notes?.trim()) {
      lines.push("**My notes:**");
      lines.push("");
      lines.push(entry.notes.trim());
      lines.push("");
    }
    lines.push("---");
    lines.push("");
  });
  return lines.join("\n");
}

export function downloadMarkdown(filename, content) {
  if (typeof window === "undefined") return;
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
