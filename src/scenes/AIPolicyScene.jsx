import { C } from "../theme.js";
import { PatternScene } from "./sceneBases.jsx";

// Stages:
// 0 setup        — three color zones (red/yellow/green) — empty
// 1 stakeholders — three stakeholder voices reacting to a tentative policy
// 2 synthesis    — your final policy framing
export default function AIPolicyScene({ stage = 0, chose = [], mode }) {
  const choice = chose[0]?.lens;
  const lit = stage >= 1;

  return (
    <PatternScene
      ariaLabel="A traffic light style three-zone policy diagram with red, yellow, and green zones"
      label={stage === 2 ? "Your policy" : "Traffic-light policy"}
      sublabel={stage === 0 ? "Pick your stance — then defend it." : stage === 1 ? "Three voices respond." : null}
      pattern={
        <g>
          {/* Three zones */}
          {[
            { x: 80, color: C.coral, label: "RED", desc: "AI prohibited", lit: choice === "prohibition" || choice === "rule-following" || lit },
            { x: 240, color: C.gold, label: "YELLOW", desc: "AI with disclosure", lit: choice === "stratified" || choice === "tact" || lit },
            { x: 400, color: C.teal, label: "GREEN", desc: "AI permitted", lit: choice === "permissive" || choice === "transparency" || lit },
          ].map((z, i) => (
            <g key={i}>
              <rect x={z.x} y="56" width="120" height="160" rx="14"
                fill={z.lit ? `${z.color}25` : `${z.color}08`}
                stroke={z.color} strokeWidth={z.lit ? 2.5 : 1} opacity={lit ? 1 : 0.7} />
              <circle cx={z.x + 60} cy="100" r="22" fill={z.lit ? z.color : `${z.color}20`} stroke={z.color} strokeWidth="2">
                {z.lit && <animate attributeName="opacity" values="0.7;1;0.7" dur="2.6s" repeatCount="indefinite" />}
              </circle>
              <text x={z.x + 60} y="140" textAnchor="middle" fontFamily="'Source Serif 4', Georgia, serif" fontSize="13" fontWeight="700" fill={z.color}>{z.label}</text>
              <text x={z.x + 60} y="160" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="10" fill={C.textSecondary}>{z.desc}</text>
              <text x={z.x + 60} y="184" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="9" fill={C.textMuted} fontStyle="italic">
                {i === 0 ? "high-stakes assessment" : i === 1 ? "with attribution" : "brainstorming"}
              </text>
            </g>
          ))}

          {/* Stakeholder voices in stage 1 */}
          {stage === 1 && (
            <g>
              {[
                { x: 140, label: "AP Lit teacher", note: "Won't this kill the writing?", color: C.coral },
                { x: 300, label: "Superintendent", note: "Defensible at the board?", color: C.gold },
                { x: 460, label: "Parent", note: "Equity for non-AI families?", color: C.teal },
              ].map((s, i) => (
                <g key={i}>
                  <circle cx={s.x} cy="34" r="11" fill={`${s.color}25`} stroke={s.color} strokeWidth="1.5" />
                  <text x={s.x} y="38" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="10" fontWeight="700" fill={s.color}>{["A", "S", "P"][i]}</text>
                  <text x={s.x} y="252" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="9" fontWeight="600" fill={s.color}>{s.label}</text>
                  <text x={s.x} y="266" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="8.5" fill={C.textMuted} fontStyle="italic">"{s.note}"</text>
                </g>
              ))}
            </g>
          )}

          {/* Synthesis: framing label */}
          {stage === 2 && (
            <g>
              <text x="300" y="36" textAnchor="middle" fontFamily="'Source Serif 4', Georgia, serif" fontSize="13" fontWeight="700" fill={C.gold}>
                Whatever you choose, the policy says something.
              </text>
              <text x="300" y="252" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="10" fill={C.textSecondary} fontStyle="italic">
                Make sure it says what you want it to say.
              </text>
            </g>
          )}
        </g>
      }
    />
  );
}
