import { useState } from "react";
import { C } from "../theme.js";
import { TRADITIONS } from "../data/globalCanon.js";
import { getExperimentById } from "../data/experiments.js";
import { FurtherReadingList } from "../experiments/ExperimentShared.jsx";

const ACCENT_FOR = {
  gold: C.gold,
  teal: C.teal,
  coral: C.coral,
  ocean: C.ocean,
  sand: C.sand,
};

export default function GlobalCanonSection({ navigate }) {
  return (
    <div>
      <p style={{
        color: C.textSecondary, fontSize: "0.96rem", lineHeight: 1.7, marginBottom: 22,
      }}>
        The Philosophical Canon section in the Hub draws primarily on Western traditions —
        Plato, Aristotle, Dewey, Nozick. Those traditions answered the questions in this bank
        in particular ways. Other traditions answered them differently, sometimes in ways the
        Western canon never quite reached. This section names some of them. It is not a
        survey. It is an invitation.
      </p>

      {TRADITIONS.map(t => (
        <TraditionCard key={t.id} tradition={t} navigate={navigate} />
      ))}
    </div>
  );
}

function TraditionCard({ tradition, navigate }) {
  const accent = ACCENT_FOR[tradition.accent] || C.gold;
  const [open, setOpen] = useState(false);

  return (
    <div style={{
      background: open ? `${accent}06` : C.surface,
      border: `1px solid ${open ? accent + "40" : C.border}`,
      borderRadius: 14, marginBottom: 14,
      transition: "all 0.25s",
    }}>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        style={{
          width: "100%", padding: "18px 22px",
          background: "transparent", border: "none",
          color: C.textPrimary, cursor: "pointer",
          textAlign: "left",
          display: "flex", justifyContent: "space-between",
          alignItems: "center", gap: 12, flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, minWidth: 240 }}>
          <h3 style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            color: accent, fontSize: "1.2rem",
            fontWeight: 700, marginBottom: 4,
          }}>{tradition.name}</h3>
          <p style={{ color: C.textMuted, fontSize: "0.85rem", fontStyle: "italic" }}>
            {tradition.subtitle}
          </p>
        </div>
        <span style={{
          color: accent, fontSize: "1rem",
          transform: open ? "rotate(180deg)" : "none",
          transition: "transform 0.25s",
        }}>▾</span>
      </button>

      {open && (
        <div style={{ padding: "0 22px 22px" }}>
          <p style={{
            color: C.textPrimary, fontSize: "0.95rem",
            lineHeight: 1.75, marginBottom: 22,
            fontFamily: "'Source Serif 4', Georgia, serif",
            padding: "16px 18px",
            background: `${accent}08`,
            borderLeft: `3px solid ${accent}`,
            borderRadius: "0 10px 10px 0",
          }}>{tradition.framing}</p>

          <p style={{
            fontSize: "0.7rem", fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: accent, marginBottom: 12,
          }}>Thinkers and texts</p>

          {tradition.thinkers.map((th, i) => (
            <ThinkerCard
              key={i}
              thinker={th}
              accent={accent}
              navigate={navigate}
              isLast={i === tradition.thinkers.length - 1}
            />
          ))}

          {tradition.furtherReading?.length > 0 && (
            <div style={{ marginTop: 22, paddingTop: 18, borderTop: `1px solid ${C.border}` }}>
              <FurtherReadingList items={tradition.furtherReading} color={accent} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ThinkerCard({ thinker, accent, navigate, isLast }) {
  return (
    <div style={{
      padding: "14px 0",
      borderBottom: isLast ? "none" : `1px solid ${C.border}`,
    }}>
      <div style={{ marginBottom: 6, display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
        <h4 style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          color: C.textPrimary, fontSize: "1rem", fontWeight: 700,
        }}>{thinker.name}</h4>
        {thinker.dates && <span style={{ color: C.textMuted, fontSize: "0.78rem" }}>· {thinker.dates}</span>}
      </div>

      {thinker.work && (
        <p style={{ color: accent, fontSize: "0.78rem", fontStyle: "italic", marginBottom: 6 }}>
          {thinker.work}
        </p>
      )}

      <p style={{ color: C.textSecondary, fontSize: "0.88rem", lineHeight: 1.7, marginBottom: 8 }}>
        {thinker.contribution}
      </p>

      {thinker.connections?.length > 0 && (
        <div style={{ marginTop: 8 }}>
          <p style={{
            fontSize: "0.66rem", fontWeight: 700,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: C.textMuted, marginBottom: 6,
          }}>Speaks to</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {thinker.connections.map(id => {
              const exp = getExperimentById(id);
              if (!exp) return null;
              return (
                <button
                  key={id}
                  onClick={() => {
                    if (!navigate) return;
                    const band = exp.gradeBands[0];
                    const route = band === "educators"
                      ? "thought-experiments/educators"
                      : `thought-experiments/${band}`;
                    navigate(route);
                  }}
                  style={{
                    padding: "3px 10px",
                    background: `${accent}10`,
                    border: `1px solid ${accent}30`,
                    color: accent,
                    borderRadius: 999, fontSize: "0.74rem",
                    cursor: "pointer", fontFamily: "inherit",
                  }}
                >{exp.title}</button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
