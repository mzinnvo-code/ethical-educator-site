import { useEffect, useMemo, useRef, useState } from "react";
import { C } from "../theme.js";
import { useSearch } from "../hooks/useSearch.js";

// Cmd+K / Ctrl+K modal search palette. Lightweight: input + ranked result
// rows + keyboard navigation. Opens on the keyboard shortcut or any "search"
// trigger button anywhere in the app (via the global `examined-classroom:openSearch` event).
//
// First-cut scope (v1): page-level results only — all 50+ routes searchable
// by title / description / section. v2 will add experiment-level docs and
// filter chips (grade band, type, topic).
export default function SearchPalette({ pageMeta, onNavigate }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const { search } = useSearch(pageMeta);
  const results = useMemo(() => search(query), [search, query]);

  // Mount keyboard shortcut + custom event listener
  useEffect(() => {
    function onKey(e) {
      const cmd = e.metaKey || e.ctrlKey;
      if (cmd && e.key === "k") {
        e.preventDefault();
        setOpen(true);
        return;
      }
      if (e.key === "/" && !cmd && !isTypingTarget(e.target)) {
        e.preventDefault();
        setOpen(true);
      }
    }
    function onCustom() { setOpen(true); }
    window.addEventListener("keydown", onKey);
    window.addEventListener("examined-classroom:openSearch", onCustom);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("examined-classroom:openSearch", onCustom);
    };
  }, []);

  // Focus management + body scroll lock when open
  useEffect(() => {
    if (!open) return;
    setActiveIdx(0);
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  // Reset activeIdx when query changes
  useEffect(() => { setActiveIdx(0); }, [query]);

  function close() {
    setOpen(false);
    setQuery("");
  }

  function go(result) {
    if (!result) return;
    close();
    if (typeof onNavigate === "function") {
      onNavigate(result.id);
    } else if (typeof window !== "undefined") {
      window.location.href = result.url;
    }
  }

  function onInputKeyDown(e) {
    if (e.key === "Escape") { close(); return; }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx(i => Math.min(i + 1, Math.max(0, results.length - 1)));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx(i => Math.max(i - 1, 0));
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      go(results[activeIdx]);
    }
  }

  // Scroll the active row into view when it changes (during keyboard nav)
  useEffect(() => {
    if (!open || !listRef.current) return;
    const active = listRef.current.querySelector(`[data-result-idx="${activeIdx}"]`);
    if (active?.scrollIntoView) {
      active.scrollIntoView({ block: "nearest" });
    }
  }, [activeIdx, open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)",
        zIndex: 10100,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "10vh 16px 16px",
      }}
    >
      <div style={{
        background: C.bgAlt,
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        width: "100%",
        maxWidth: 620,
        boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        maxHeight: "min(72vh, 640px)",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "14px 16px",
          borderBottom: `1px solid ${C.border}`,
        }}>
          <span aria-hidden="true" style={{ color: C.gold, fontSize: "1.1rem" }}>⌕</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKeyDown}
            placeholder="Search pages, topics, resources…"
            aria-label="Search query"
            autoComplete="off"
            spellCheck={false}
            style={{
              flex: 1,
              minWidth: 0,
              background: "transparent",
              border: "none",
              outline: "none",
              color: C.textPrimary,
              fontSize: "1rem",
              fontFamily: "inherit",
            }}
          />
          <kbd style={{
            color: C.textMuted,
            fontSize: "0.7rem",
            fontFamily: "'JetBrains Mono', monospace",
            padding: "2px 6px",
            border: `1px solid ${C.border}`,
            borderRadius: 4,
          }}>esc</kbd>
        </div>

        <div ref={listRef} style={{ overflowY: "auto", padding: "8px 0" }}>
          {query.trim().length === 0 ? (
            <EmptyHint />
          ) : results.length === 0 ? (
            <NoResults query={query} />
          ) : (
            results.map((r, idx) => (
              <ResultRow
                key={r.id}
                idx={idx}
                result={r}
                active={idx === activeIdx}
                onHover={() => setActiveIdx(idx)}
                onClick={() => go(r)}
              />
            ))
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
}

function ResultRow({ result, idx, active, onHover, onClick }) {
  return (
    <button
      type="button"
      data-result-idx={idx}
      onMouseEnter={onHover}
      onClick={onClick}
      style={{
        display: "block",
        width: "100%",
        textAlign: "left",
        padding: "10px 16px",
        background: active ? `${C.gold}10` : "transparent",
        borderLeft: `3px solid ${active ? C.gold : "transparent"}`,
        border: "none",
        borderRight: "none",
        borderTop: "none",
        borderBottom: "none",
        color: C.textPrimary,
        cursor: "pointer",
        fontFamily: "inherit",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
        <span style={{
          fontSize: "0.62rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: C.gold,
          background: `${C.gold}14`,
          padding: "2px 6px",
          borderRadius: 3,
        }}>{result.section}</span>
        <span style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: "0.98rem",
          fontWeight: 600,
          color: C.textPrimary,
        }}>{result.title}</span>
      </div>
      {result.description && (
        <p style={{
          color: C.textMuted,
          fontSize: "0.8rem",
          lineHeight: 1.5,
          margin: 0,
        }}>{result.description.length > 140 ? result.description.slice(0, 137) + "…" : result.description}</p>
      )}
    </button>
  );
}

function EmptyHint() {
  return (
    <div style={{ padding: "30px 18px", textAlign: "center", color: C.textMuted, fontSize: "0.86rem", lineHeight: 1.6 }}>
      <p style={{ marginBottom: 8 }}>Search across every page on the site.</p>
      <p style={{ fontSize: "0.78rem" }}>
        Try <em style={{ color: C.gold, fontStyle: "normal" }}>"feedback"</em>, <em style={{ color: C.gold, fontStyle: "normal" }}>"AI policy"</em>, or <em style={{ color: C.gold, fontStyle: "normal" }}>"trolley"</em>.
      </p>
    </div>
  );
}

function NoResults({ query }) {
  return (
    <div style={{ padding: "30px 18px", textAlign: "center", color: C.textMuted, fontSize: "0.86rem", lineHeight: 1.6 }}>
      <p style={{ marginBottom: 4, color: C.textSecondary }}>No results for "{query}".</p>
      <p style={{ fontSize: "0.78rem" }}>Try fewer words or a different phrasing.</p>
    </div>
  );
}

function Footer() {
  const kbd = {
    color: C.textMuted,
    fontSize: "0.66rem",
    fontFamily: "'JetBrains Mono', monospace",
    padding: "1px 5px",
    border: `1px solid ${C.border}`,
    borderRadius: 3,
  };
  return (
    <div style={{
      padding: "8px 14px",
      borderTop: `1px solid ${C.border}`,
      display: "flex",
      gap: 14,
      color: C.textMuted,
      fontSize: "0.72rem",
      flexWrap: "wrap",
    }}>
      <span><kbd style={kbd}>↑</kbd> <kbd style={kbd}>↓</kbd> navigate</span>
      <span><kbd style={kbd}>↵</kbd> open</span>
      <span><kbd style={kbd}>esc</kbd> close</span>
    </div>
  );
}

function isTypingTarget(el) {
  if (!el) return false;
  const tag = (el.tagName || "").toLowerCase();
  if (tag === "input" || tag === "textarea" || tag === "select") return true;
  if (el.isContentEditable) return true;
  return false;
}
