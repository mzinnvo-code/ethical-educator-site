import { C } from "../theme.js";
import { PatternScene } from "./sceneBases.jsx";

export default function VeilOfIgnoranceScene({ stage = 0, chose = [], mode }) {
  // Stage 0: a row of identical figures behind a translucent curtain. Stage 1: curtain lifts; figures revealed unequal. Stage 2: synthesis.
  const lifted = stage >= 1;
  return (
    <PatternScene
      ariaLabel="A row of identical silhouettes behind a translucent curtain; the curtain lifts to reveal them as varied"
      label={stage === 0 ? "Behind the veil" : stage === 1 ? "The veil lifts" : "Reflection"}
      sublabel={stage === 0 ? "You don't know who you'll be." : null}
      pattern={
        <g>
          {/* row of figures */}
          {[
            { rich: true, color: C.gold, label: "rich" },
            { rich: false, color: C.coral, label: "poor" },
            { rich: false, color: C.sand, label: "sick" },
            { rich: true, color: C.teal, label: "healthy" },
            { rich: false, color: C.coral, label: "poor" },
            { rich: false, color: C.coral, label: "rural" },
            { rich: true, color: C.gold, label: "city" },
          ].map((f, i) => (
            <g key={i} transform={`translate(${100 + i * 60} 180)`}>
              <circle cx="0" cy="-22" r="14" fill="none" stroke={lifted ? f.color : C.textMuted} strokeWidth="2" />
              <path d="M-12 -10 Q0 -18 12 -10 L14 50 L-14 50 Z" fill={`${lifted ? f.color : C.textMuted}30`} stroke={lifted ? f.color : C.textMuted} strokeWidth="1.5" />
              {lifted && (
                <text x="0" y="68" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="9" fill={f.color}>{f.label}</text>
              )}
            </g>
          ))}
          {/* veil — translucent curtain */}
          {!lifted && (
            <g>
              <rect x="80" y="60" width="440" height="200" fill={`${C.surface}`} stroke={C.gold} strokeWidth="1.5" opacity="0.65" />
              {/* drape lines */}
              {[100, 160, 220, 280, 340, 400, 460].map((x, i) => (
                <line key={i} x1={x} y1="60" x2={x} y2="260" stroke={`${C.gold}50`} strokeWidth="1" />
              ))}
              <text x="300" y="50" textAnchor="middle" fontFamily="'Source Serif 4', Georgia, serif" fontSize="13" fontWeight="700" fill={C.gold} fontStyle="italic">
                veil of ignorance
              </text>
            </g>
          )}
          {lifted && (
            <g>
              {/* curtain pulled up */}
              <rect x="80" y="40" width="440" height="40" fill={`${C.gold}30`} stroke={C.gold} strokeWidth="1" />
              <text x="300" y="64" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="10" fill={C.gold} fontStyle="italic">now you know who you are</text>
            </g>
          )}
        </g>
      }
    />
  );
}
