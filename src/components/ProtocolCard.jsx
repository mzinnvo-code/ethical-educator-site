import { useState } from "react";
import { C } from "../theme.js";
import { getExperimentById } from "../data/experiments.js";

export default function ProtocolCard({ protocol, defaultOpen = false, navigate }) {
  const [open, setOpen] = useState(defaultOpen);
  const accent = C.gold;

  return (
    <div
      id={`protocol-${protocol.id}`}
      style={{
        background: open ? `${accent}06` : C.surface,
        border: `1px solid ${open ? accent + "40" : C.border}`,
        borderRadius: 12,
        marginBottom: 12,
        scrollMarginTop: 80,
        transition: "all 0.25s",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        style={{
          width: "100%", padding: "16px 20px",
          background: "transparent", border: "none",
          color: C.textPrimary, cursor: "pointer",
          textAlign: "left", display: "flex",
          justifyContent: "space-between", alignItems: "center",
          gap: 14, flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, minWidth: 240 }}>
          <h3 style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            color: C.textPrimary, fontSize: "1.1rem",
            fontWeight: 700, marginBottom: 4,
          }}>{protocol.name}</h3>
          <p style={{ color: C.textMuted, fontSize: "0.86rem", fontStyle: "italic" }}>
            {protocol.tagline}
          </p>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
          {protocol.gradeBands.map(g => (
            <span key={g} style={{
              padding: "2px 8px",
              background: `${C.teal}15`, color: C.teal,
              border: `1px solid ${C.teal}30`,
              borderRadius: 999, fontSize: "0.66rem",
              fontWeight: 600, letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}>{g}</span>
          ))}
          <span style={{
            padding: "2px 8px", background: `${C.gold}15`, color: C.gold,
            border: `1px solid ${C.gold}30`, borderRadius: 999,
            fontSize: "0.66rem", fontWeight: 600, letterSpacing: "0.04em",
          }}>{protocol.timeMin}–{protocol.timeIdeal} min</span>
          <span style={{
            color: accent, fontSize: "0.95rem",
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 0.25s",
          }}>▾</span>
        </div>
      </button>

      {open && (
        <div style={{ padding: "0 20px 20px", color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.7 }}>
          {/* Quick facts row */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: 8, marginBottom: 16,
            padding: "12px 14px", background: C.bgAlt, borderRadius: 8,
            border: `1px solid ${C.border}`,
          }}>
            <Fact label="Group size" value={`${protocol.groupMin}–${protocol.groupMax}`} />
            <Fact label="Time" value={`${protocol.timeMin}–${protocol.timeIdeal} min`} />
            <Fact label="Materials" value={protocol.materials} />
          </div>

          {/* When to use */}
          <Section title="When to use" color={accent}>
            <p>{protocol.when}</p>
          </Section>

          {/* How to run */}
          <Section title="How to run it" color={C.teal}>
            <ol style={{ listStyle: "none", padding: 0, margin: 0, counterReset: "step" }}>
              {protocol.how.map((step, i) => (
                <li key={i} style={{
                  position: "relative", paddingLeft: 36, marginBottom: 10,
                  counterIncrement: "step",
                }}>
                  <span style={{
                    position: "absolute", left: 0, top: 0,
                    width: 26, height: 26, borderRadius: "50%",
                    background: C.teal, color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.78rem", fontWeight: 700,
                  }}>{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </Section>

          {/* Pitfalls */}
          {protocol.pitfalls?.length > 0 && (
            <Section title="Common pitfalls" color={C.coral}>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {protocol.pitfalls.map((p, i) => (
                  <li key={i} style={{
                    padding: "6px 0 6px 16px",
                    position: "relative",
                    borderLeft: `2px solid ${C.coral}50`,
                    marginBottom: 6,
                  }}>{p}</li>
                ))}
              </ul>
            </Section>
          )}

          {/* Recommended scenarios */}
          {protocol.recommendedScenarios?.length > 0 && (
            <Section title="Best paired with" color={C.ocean}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {protocol.recommendedScenarios.map(id => {
                  const exp = getExperimentById(id);
                  if (!exp) return null;
                  return (
                    <button key={id}
                      onClick={() => navigate?.(`thought-experiments/${exp.gradeBands[0]}`)}
                      style={{
                        padding: "5px 12px",
                        background: `${C.ocean}15`, color: C.ocean,
                        border: `1px solid ${C.ocean}40`,
                        borderRadius: 999, fontSize: "0.78rem",
                        cursor: "pointer", fontFamily: "inherit",
                      }}
                    >
                      {exp.title}
                    </button>
                  );
                })}
              </div>
            </Section>
          )}
        </div>
      )}
    </div>
  );
}

function Fact({ label, value }) {
  return (
    <div>
      <p style={{ fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.textMuted, marginBottom: 2 }}>
        {label}
      </p>
      <p style={{ color: C.textPrimary, fontSize: "0.84rem", fontWeight: 600 }}>{value}</p>
    </div>
  );
}

function Section({ title, color, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <p style={{
        fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em",
        textTransform: "uppercase", color, marginBottom: 6,
      }}>{title}</p>
      {children}
    </div>
  );
}
