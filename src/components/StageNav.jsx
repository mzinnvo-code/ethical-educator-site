import { C } from "../theme.js";

// A small "Stage 2 of 3" indicator + dot navigation. Past stages are
// clickable to revisit; future stages are visually muted and disabled.
export default function StageNav({ stages, currentIdx, onSelect, accent = C.gold }) {
  if (!stages || stages.length <= 1) return null;
  const total = stages.length;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14, flexWrap: "wrap" }}>
      <span style={{
        fontSize: "0.66rem", fontWeight: 700,
        letterSpacing: "0.14em", textTransform: "uppercase",
        color: accent,
      }}>
        Stage {currentIdx + 1} of {total}
      </span>

      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {stages.map((s, i) => {
          const past = i < currentIdx;
          const current = i === currentIdx;
          const future = i > currentIdx;
          return (
            <button
              className="no-print"
              key={s.id || i}
              onClick={() => !future && onSelect?.(i)}
              disabled={future}
              aria-label={`Jump to stage ${i + 1}: ${s.title || s.id || "stage"}`}
              aria-current={current ? "step" : undefined}
              title={s.title || s.id || `Stage ${i + 1}`}
              style={{
                width: current ? 22 : 10, height: 10, padding: 0,
                borderRadius: 999,
                background: current ? accent : past ? `${accent}55` : `${C.textMuted}30`,
                border: "none",
                cursor: future ? "default" : "pointer",
                transition: "all 0.25s",
                opacity: future ? 0.45 : 1,
              }}
            />
          );
        })}
      </div>

      {stages[currentIdx]?.kicker && (
        <span style={{
          fontSize: "0.74rem", color: C.textMuted, fontStyle: "italic",
        }}>
          · {stages[currentIdx].kicker}
        </span>
      )}
    </div>
  );
}
