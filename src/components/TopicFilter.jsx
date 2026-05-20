import { useState } from "react";
import { C } from "../theme.js";
import { TOPIC_BY_ID } from "../data/topics.js";

// Built-in label/color map for grade-band chips. Hub pages pass
// `availableGrades` with ids from this set; the component renders a chip row
// just above the topic chips. Same component, opt-in surface — pages that
// don't pass `availableGrades` keep their existing topic-only UI.
const GRADE_META = {
  "k-5": { label: "K–5", color: "#1a8a7a" },         // teal
  "6-8": { label: "Grades 6–8", color: "#c89830" },  // gold
  "9-12": { label: "Grades 9–12", color: "#1a5a8a" }, // ocean
  "educators": { label: "Educator PD", color: "#c07040" }, // coral
};

export default function TopicFilter({
  availableTopicIds,
  selectedTopics,
  onToggleTopic,
  availableGrades = [],
  selectedGrades = [],
  onToggleGrade,
  hasKitOnly = false,
  onToggleHasKit,
  showHasKitFilter = false,
  query,
  onQueryChange,
  onClear,
  resultCount,
  totalCount,
  extraActiveCount = 0,
}) {
  const [searchFocus, setSearchFocus] = useState(false);
  const active =
    selectedTopics.length +
      selectedGrades.length +
      (hasKitOnly ? 1 : 0) +
      extraActiveCount +
      (query.trim() ? 1 : 0) >
    0;

  return (
    <div style={{ marginBottom: 28 }}>
      {/* Search row */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
        <div style={{
          flex: "1 1 240px", display: "flex", alignItems: "center", gap: 8,
          background: C.surface,
          border: `1px solid ${searchFocus ? C.gold + "40" : C.border}`,
          borderRadius: 10, padding: "8px 14px",
          transition: "border-color 0.2s",
        }}>
          <span aria-hidden="true" style={{ color: C.textMuted }}>🔍</span>
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onFocus={() => setSearchFocus(true)}
            onBlur={() => setSearchFocus(false)}
            placeholder="Search by title, prompt, or topic…"
            aria-label="Search experiments"
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              color: C.textPrimary, fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem",
            }}
          />
        </div>
        {active && (
          <button
            onClick={onClear}
            style={{
              padding: "8px 14px", background: "transparent",
              border: `1px solid ${C.border}`, borderRadius: 8,
              color: C.textMuted, fontSize: "0.78rem", cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = C.coral; e.currentTarget.style.color = C.coral; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textMuted; }}
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Grade-band + "has kit" filter row */}
      {(availableGrades.length > 0 || showHasKitFilter) && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
          {availableGrades.map(id => {
            const meta = GRADE_META[id];
            if (!meta) return null;
            const selected = selectedGrades.includes(id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => onToggleGrade?.(id)}
                aria-pressed={selected}
                style={{
                  padding: "5px 11px", borderRadius: 999,
                  background: selected ? `${meta.color}28` : "transparent",
                  border: `1px solid ${selected ? meta.color + "78" : C.border}`,
                  color: selected ? meta.color : C.textSecondary,
                  fontSize: "0.74rem", fontWeight: selected ? 700 : 600,
                  letterSpacing: "0.04em",
                  cursor: "pointer", transition: "all 0.2s",
                  fontFamily: "inherit",
                }}
                onMouseOver={(e) => {
                  if (!selected) {
                    e.currentTarget.style.borderColor = meta.color + "60";
                    e.currentTarget.style.color = meta.color;
                  }
                }}
                onMouseOut={(e) => {
                  if (!selected) {
                    e.currentTarget.style.borderColor = C.border;
                    e.currentTarget.style.color = C.textSecondary;
                  }
                }}
              >
                {meta.label}
              </button>
            );
          })}
          {showHasKitFilter && (
            <button
              type="button"
              onClick={() => onToggleHasKit?.()}
              aria-pressed={hasKitOnly}
              style={{
                padding: "5px 11px", borderRadius: 999,
                background: hasKitOnly ? `${C.gold}28` : "transparent",
                border: `1px solid ${hasKitOnly ? C.gold + "78" : C.border}`,
                color: hasKitOnly ? C.gold : C.textSecondary,
                fontSize: "0.74rem", fontWeight: hasKitOnly ? 700 : 600,
                letterSpacing: "0.04em",
                cursor: "pointer", transition: "all 0.2s",
                fontFamily: "inherit",
              }}
              title="Show only experiments with a printable teacher kit"
            >
              📄 Has teacher kit
            </button>
          )}
        </div>
      )}

      {/* Topic chips */}
      {availableTopicIds.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
          {availableTopicIds.map(id => {
            const topic = TOPIC_BY_ID[id];
            if (!topic) return null;
            const selected = selectedTopics.includes(id);
            return (
              <button
                key={id}
                onClick={() => onToggleTopic(id)}
                aria-pressed={selected}
                style={{
                  padding: "6px 12px", borderRadius: 999,
                  background: selected ? `${topic.color}25` : "transparent",
                  border: `1px solid ${selected ? topic.color + "70" : C.border}`,
                  color: selected ? topic.color : C.textSecondary,
                  fontSize: "0.78rem", fontWeight: selected ? 600 : 500,
                  cursor: "pointer", transition: "all 0.2s",
                  letterSpacing: "0.01em",
                }}
                onMouseOver={(e) => {
                  if (!selected) {
                    e.currentTarget.style.borderColor = topic.color + "40";
                    e.currentTarget.style.color = topic.color;
                  }
                }}
                onMouseOut={(e) => {
                  if (!selected) {
                    e.currentTarget.style.borderColor = C.border;
                    e.currentTarget.style.color = C.textSecondary;
                  }
                }}
              >
                {topic.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Result count */}
      {(active || resultCount !== totalCount) && (
        <p style={{ color: C.textMuted, fontSize: "0.78rem", marginTop: 8 }}>
          Showing {resultCount} of {totalCount}
        </p>
      )}
    </div>
  );
}
