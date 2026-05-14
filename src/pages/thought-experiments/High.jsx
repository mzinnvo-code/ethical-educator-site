import { useEffect } from "react";
import GradePage from "./GradePage.jsx";
import ExperimentGrid from "../../components/ExperimentGrid.jsx";
import { C } from "../../theme.js";
import { HIGH_SCHOOL_THEME_COPY, HIGH_SCHOOL_THEME_ORDER } from "../../data/highSchoolScenarioCopy.js";

const THEME_COLORS = {
  values: C.gold,
  knowledge: C.coral,
  reality: C.ocean,
  reasoning: C.teal,
};

const THEME_ANCHOR_PREFIX = "theme-";

function HighThemeGuide({ experiments, selectedThemes, onToggleTheme }) {
  const counts = experiments.reduce((acc, experiment) => {
    [experiment.philosophyTheme, ...(experiment.secondaryThemes || [])]
      .filter(Boolean)
      .forEach(theme => {
        acc[theme] = (acc[theme] || 0) + 1;
      });
    return acc;
  }, {});

  const handleClick = (themeId) => {
    onToggleTheme(themeId);
    // Smooth-scroll to the theme section after the next paint, so toggles double as anchor links.
    requestAnimationFrame(() => {
      const el = document.getElementById(`${THEME_ANCHOR_PREFIX}${themeId}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div style={{ margin: "28px 0 8px" }}>
      <p style={{
        color: C.gold,
        fontSize: "0.68rem",
        fontWeight: 800,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        marginBottom: 10,
      }}>
        Choose a philosophical path
      </p>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 12,
      }}>
        {HIGH_SCHOOL_THEME_ORDER.map(themeId => {
          const theme = HIGH_SCHOOL_THEME_COPY[themeId];
          const color = THEME_COLORS[themeId] || C.gold;
          const selected = selectedThemes.includes(themeId);
          return (
            <button
              key={themeId}
              onClick={() => handleClick(themeId)}
              aria-pressed={selected}
              style={{
                textAlign: "left",
                padding: "15px 16px",
                borderRadius: 12,
                border: `1px solid ${selected ? color + "75" : color + "28"}`,
                background: selected
                  ? `linear-gradient(135deg, ${color}1f, ${color}0c)`
                  : `linear-gradient(135deg, ${color}0f, ${color}04)`,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                color,
                fontSize: "0.7rem",
                fontWeight: 800,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}>
                {theme.label}
                <span style={{
                  width: 22,
                  height: 22,
                  borderRadius: 999,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: `${color}20`,
                  color,
                  fontSize: "0.72rem",
                  letterSpacing: 0,
                }}>{counts[themeId] || 0}</span>
              </span>
              <p style={{
                color: C.textPrimary,
                fontFamily: "'Source Serif 4', Georgia, serif",
                fontSize: "0.98rem",
                lineHeight: 1.45,
                marginBottom: 6,
              }}>
                {theme.question}
              </p>
              <p style={{ color: C.textMuted, fontSize: "0.78rem", lineHeight: 1.5 }}>
                {theme.blurb}
              </p>
            </button>
          );
        })}
      </div>
      {selectedThemes.length > 0 && (
        <p style={{ color: C.textMuted, fontSize: "0.78rem", marginTop: 10 }}>
          Showing only the {selectedThemes.length === 1 ? "theme" : "themes"} you selected.
          Tap a tile again to clear it.
        </p>
      )}
    </div>
  );
}

function ThemeSection({ themeId, experiments, onSelect }) {
  const theme = HIGH_SCHOOL_THEME_COPY[themeId];
  const color = THEME_COLORS[themeId] || C.gold;
  if (!theme || !experiments.length) return null;
  return (
    <section
      id={`${THEME_ANCHOR_PREFIX}${themeId}`}
      style={{
        marginBottom: 28,
        scrollMarginTop: 80,
      }}
    >
      <header style={{
        display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap",
        marginBottom: 12, paddingBottom: 10,
        borderBottom: `1px solid ${color}30`,
      }}>
        <h3 style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          color, fontSize: "1.3rem", fontWeight: 700, letterSpacing: "-0.01em",
        }}>
          {theme.label}
        </h3>
        <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.55, fontStyle: "italic", flex: "1 1 240px" }}>
          {theme.question}
        </p>
      </header>
      <ExperimentGrid experiments={experiments} onSelect={onSelect} />
    </section>
  );
}

function ThemedResults({ experiments, onSelect, emptyMessage, selectedThemes }) {
  // Group strictly by primary theme so each scenario appears once.
  const buckets = HIGH_SCHOOL_THEME_ORDER.reduce((acc, themeId) => {
    acc[themeId] = experiments.filter(e => e.philosophyTheme === themeId);
    return acc;
  }, {});

  const visibleThemes = selectedThemes.length
    ? HIGH_SCHOOL_THEME_ORDER.filter(t => selectedThemes.includes(t))
    : HIGH_SCHOOL_THEME_ORDER;

  // If a theme filter is active, the filterApi already restricts experiments
  // to only those that include the theme (via primary OR secondary).
  // For the themed-section view we want to surface secondary-theme matches under the
  // theme the user actually selected, otherwise they appear orphaned.
  if (selectedThemes.length) {
    const seen = new Set();
    selectedThemes.forEach(themeId => {
      buckets[themeId] = experiments.filter(e =>
        (e.philosophyTheme === themeId || (e.secondaryThemes || []).includes(themeId))
        && !seen.has(e.id)
      );
      buckets[themeId].forEach(e => seen.add(e.id));
    });
  }

  const totalShown = visibleThemes.reduce((n, t) => n + (buckets[t]?.length || 0), 0);

  if (totalShown === 0) {
    return (
      <p style={{
        color: C.textMuted, fontSize: "0.92rem", lineHeight: 1.6,
        padding: "32px 16px", textAlign: "center",
        background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12,
      }}>
        {emptyMessage || "No experiments match the current filters."}
      </p>
    );
  }

  return (
    <div>
      {visibleThemes.map(themeId => (
        <ThemeSection
          key={themeId}
          themeId={themeId}
          experiments={buckets[themeId] || []}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export default function High({ navigate }) {
  // Honour deep links like /thought-experiments/9-12?theme=values by scrolling
  // to the theme section once the page has rendered.
  useEffect(() => {
    const query = typeof window === "undefined" ? "" : window.location.search;
    const match = query.match(/[?&]theme=([\w-]+)/);
    if (match) {
      const themeId = match[1];
      requestAnimationFrame(() => {
        const el = document.getElementById(`${THEME_ANCHOR_PREFIX}${themeId}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, []);

  return (
    <GradePage
      navigate={navigate}
      band="9-12"
      mode="canon"
      label="Grades 9–12"
      title="The Philosophical Canon"
      blurb="Classic thought experiments and contemporary AI dilemmas, organised around four philosophical themes: values, knowledge, reality, and reasoning. Each scenario carries arguments and counterarguments, fallacy spotting, argument repair, and room for student-built variations."
      preExperiments={({ experiments, filterApi }) => (
        <HighThemeGuide
          experiments={experiments}
          selectedThemes={filterApi.selectedThemes}
          onToggleTheme={filterApi.toggleTheme}
        />
      )}
      renderResults={({ experiments, filterApi, onSelect, emptyMessage }) => (
        <ThemedResults
          experiments={experiments}
          onSelect={onSelect}
          emptyMessage={emptyMessage}
          selectedThemes={filterApi.selectedThemes}
        />
      )}
      emptyMessage="No 9–12 experiments match these filters yet."
    />
  );
}
