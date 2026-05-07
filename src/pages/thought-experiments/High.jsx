import GradePage from "./GradePage.jsx";
import { C } from "../../theme.js";
import { HIGH_SCHOOL_THEME_COPY, HIGH_SCHOOL_THEME_ORDER } from "../../data/highSchoolScenarioCopy.js";

const THEME_COLORS = {
  values: C.gold,
  knowledge: C.coral,
  reality: C.ocean,
  reasoning: C.teal,
};

function HighThemeGuide({ experiments, selectedThemes, onToggleTheme }) {
  const counts = experiments.reduce((acc, experiment) => {
    [experiment.philosophyTheme, ...(experiment.secondaryThemes || [])]
      .filter(Boolean)
      .forEach(theme => {
        acc[theme] = (acc[theme] || 0) + 1;
      });
    return acc;
  }, {});

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
              onClick={() => onToggleTheme(themeId)}
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
          Theme filters combine with topic chips and search below.
        </p>
      )}
    </div>
  );
}

export default function High({ navigate }) {
  return (
    <GradePage
      navigate={navigate}
      band="9-12"
      mode="canon"
      label="Grades 9–12"
      title="The Philosophical Canon"
      blurb="Classic thought experiments and contemporary AI dilemmas for older students: sharper stories, clearer philosophical themes, argument repair, fallacy spotting, and room for students to build their own variations."
      preExperiments={({ experiments, filterApi }) => (
        <HighThemeGuide
          experiments={experiments}
          selectedThemes={filterApi.selectedThemes}
          onToggleTheme={filterApi.toggleTheme}
        />
      )}
      emptyMessage="No 9–12 experiments match these filters yet."
    />
  );
}
