import { C } from "../theme.js";
import { HorizontalStage } from "./sceneBases.jsx";

export default function BiasedResumeScene({ stage = 0, chose = [], mode }) {
  return (
    <HorizontalStage
      ariaLabel="A stack of resume cards; some are shaded, others highlighted; an algorithm icon hovers above"
      caption={stage === 0 ? "Stage 1 · The pattern" : stage === 1 ? "Stage 2 · Where's the bias?" : "Reflection"}
      sky={
        <g>
          {/* algorithm symbol */}
          <g transform="translate(300 50)">
            <rect x="-30" y="-20" width="60" height="40" rx="6" fill={`${C.teal}25`} stroke={C.teal} strokeWidth="1.5" />
            <text x="0" y="6" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="13" fill={C.teal} fontWeight="700">AI</text>
          </g>
        </g>
      }
      ground={null}
      actors={
        <g>
          {/* resumes — alternating accepted/rejected */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
            const x = 80 + i * 56;
            const accepted = i % 3 !== 1; // mostly accepted
            return (
              <g key={i} transform={`translate(${x} 180)`}>
                <rect x="-20" y="-32" width="40" height="64" rx="3" fill={C.surface} stroke={accepted ? C.teal : C.coral} strokeWidth="1.5" opacity={accepted ? 1 : 0.55} />
                {[-22, -12, -2, 8, 18].map((y, j) => (
                  <line key={j} x1="-14" y1={y} x2={j === 0 ? 14 : 10} y2={y} stroke={accepted ? `${C.teal}60` : `${C.coral}60`} strokeWidth="0.8" />
                ))}
                {/* gender symbol */}
                <text x="0" y="48" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="11" fill={accepted ? C.teal : C.coral} fontWeight="700">
                  {i % 2 === 0 ? "♂" : "♀"}
                </text>
                <text x="0" y="62" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="8" fill={accepted ? C.teal : C.coral}>
                  {accepted ? "✓" : "✗"}
                </text>
              </g>
            );
          })}

          {/* lines connecting AI to resumes */}
          {stage >= 1 && [0, 1, 2, 3, 4, 5, 6, 7].map(i => {
            const x = 80 + i * 56;
            return (
              <line key={i} x1="300" y1="80" x2={x} y2="148" stroke={C.teal} strokeWidth="0.5" opacity="0.3" strokeDasharray="2 3" />
            );
          })}
        </g>
      }
    />
  );
}
