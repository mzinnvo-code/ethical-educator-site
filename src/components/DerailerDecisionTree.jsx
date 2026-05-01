import { useState } from "react";
import { C } from "../theme.js";
import { DERAILER_TREE, DERAILER_NODES } from "../data/derailers.js";

export default function DerailerDecisionTree() {
  const [path, setPath] = useState([]); // array of node ids visited

  const currentNode = path.length === 0
    ? DERAILER_TREE
    : DERAILER_NODES[path[path.length - 1]];

  const goto = (id) => setPath(p => [...p, id]);
  const back = () => setPath(p => p.slice(0, -1));
  const reset = () => setPath([]);

  // Render the current node — could be the root, a branch, or a leaf
  return (
    <div style={{
      background: `linear-gradient(135deg, ${C.coral}06, ${C.bgAlt})`,
      border: `1px solid ${C.coral}30`,
      borderRadius: 14, padding: "20px 22px",
    }}>
      {/* Breadcrumb */}
      {path.length > 0 && (
        <div style={{ display: "flex", gap: 8, marginBottom: 14, alignItems: "center", flexWrap: "wrap" }}>
          <button onClick={reset} style={crumbBtnStyle()}>↺ Start over</button>
          <button onClick={back} style={crumbBtnStyle()}>← Back</button>
        </div>
      )}

      {/* ROOT — initial prompt */}
      {path.length === 0 && (
        <>
          <p style={{
            color: C.coral, fontSize: "0.7rem", fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8,
          }}>What do I do when…</p>
          <h3 style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            color: C.textPrimary, fontSize: "1.2rem",
            fontWeight: 700, marginBottom: 16, lineHeight: 1.3,
          }}>{DERAILER_TREE.prompt}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }} className="derailer-options">
            {DERAILER_TREE.options.map(opt => (
              <button
                key={opt.label}
                onClick={() => goto(opt.goto)}
                style={optionBtnStyle()}
              >{opt.label}</button>
            ))}
          </div>
          <style>{`@media (max-width: 600px) { .derailer-options { grid-template-columns: 1fr !important; } }`}</style>
        </>
      )}

      {/* INTERMEDIATE — has a branch */}
      {path.length > 0 && currentNode?.branch && (
        <>
          <p style={{
            color: C.coral, fontSize: "0.7rem", fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8,
          }}>{currentNode.title}</p>
          <h3 style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            color: C.textPrimary, fontSize: "1.05rem",
            fontWeight: 700, marginBottom: 16, lineHeight: 1.3,
          }}>{currentNode.branch.prompt}</h3>
          <div style={{ display: "grid", gap: 8 }}>
            {currentNode.branch.options.map(opt => (
              <button
                key={opt.label}
                onClick={() => goto(opt.goto)}
                style={optionBtnStyle()}
              >{opt.label}</button>
            ))}
          </div>
        </>
      )}

      {/* LEAF — guidance */}
      {path.length > 0 && currentNode?.guidance && (
        <>
          <p style={{
            color: C.coral, fontSize: "0.7rem", fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8,
          }}>Guidance</p>
          <h3 style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            color: C.textPrimary, fontSize: "1.16rem",
            fontWeight: 700, marginBottom: 12, lineHeight: 1.3,
          }}>{currentNode.title}</h3>
          <p style={{
            color: C.textPrimary, fontSize: "0.95rem",
            lineHeight: 1.7, marginBottom: 14,
            fontFamily: "'Source Serif 4', Georgia, serif",
          }}>{currentNode.guidance}</p>

          {currentNode.moves?.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <p style={{
                fontSize: "0.7rem", fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: C.gold, marginBottom: 8,
              }}>Try saying / doing</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {currentNode.moves.map((m, i) => (
                  <li key={i} style={{
                    padding: "8px 12px", marginBottom: 6,
                    background: `${C.gold}08`,
                    border: `1px solid ${C.gold}25`,
                    borderRadius: 8,
                    color: C.textSecondary, fontSize: "0.88rem",
                    lineHeight: 1.6,
                  }}>{m}</li>
                ))}
              </ul>
            </div>
          )}

          {currentNode.note && (
            <div style={{
              padding: "10px 14px",
              background: `${C.coral}10`,
              borderLeft: `3px solid ${C.coral}`,
              borderRadius: "0 8px 8px 0",
              color: C.textSecondary, fontSize: "0.85rem",
              lineHeight: 1.6, fontStyle: "italic",
            }}>{currentNode.note}</div>
          )}
        </>
      )}
    </div>
  );
}

function optionBtnStyle() {
  return {
    padding: "12px 16px",
    background: `${C.coral}08`,
    border: `1px solid ${C.coral}30`,
    borderRadius: 10,
    color: C.textPrimary,
    fontFamily: "'Source Serif 4', Georgia, serif",
    fontSize: "0.92rem", lineHeight: 1.4,
    cursor: "pointer", textAlign: "left",
    transition: "all 0.2s",
  };
}

function crumbBtnStyle() {
  return {
    padding: "5px 10px",
    background: "transparent",
    border: `1px solid ${C.border}`,
    borderRadius: 6,
    color: C.textMuted,
    fontSize: "0.74rem", cursor: "pointer",
    fontFamily: "inherit",
  };
}
