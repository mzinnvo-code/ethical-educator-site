import { C } from "../theme.js";
import { PatternScene } from "./sceneBases.jsx";

export default function AIGradingScene({ stage = 0, chose = [], mode }) {
  const lens = chose[0]?.lens;
  const fast = stage >= 1 && lens === "efficiency";
  return (
    <PatternScene
      ariaLabel="A red pen and a glowing screen side by side; a stack of essays flows from one to the other"
      label={stage === 0 ? "Grade by hand or AI?" : stage === 1 ? "Where the time goes" : "Reflection"}
      sublabel={stage === 0 ? "8 hours, or 90 seconds?" : null}
      pattern={
        <g>
          {/* hand pen */}
          <g transform="translate(140 140)">
            <rect x="-50" y="-40" width="100" height="100" rx="6" fill={`${C.coral}15`} stroke={C.coral} strokeWidth="2" />
            <text x="0" y="-12" textAnchor="middle" fontFamily="'Source Serif 4', Georgia, serif" fontSize="14" fontWeight="700" fill={C.coral}>You</text>
            <line x1="-30" y1="0" x2="30" y2="-12" stroke={C.coral} strokeWidth="3" strokeLinecap="round" />
            <polygon points="32,-12 38,-15 36,-9" fill={C.coral} />
            <text x="0" y="40" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="11" fill={C.coral} fontWeight="700">8h / set</text>
          </g>

          {/* AI screen */}
          <g transform="translate(460 140)">
            <rect x="-50" y="-40" width="100" height="100" rx="6" fill={`${C.teal}15`} stroke={C.teal} strokeWidth="2" />
            <text x="0" y="-12" textAnchor="middle" fontFamily="'Source Serif 4', Georgia, serif" fontSize="14" fontWeight="700" fill={C.teal}>AI</text>
            {[0, 1, 2, 3].map(i => (
              <rect key={i} x={-20 + i * 12} y="-2" width="6" height="20" fill={C.teal} opacity={0.4 + (i * 0.2)}>
                <animate attributeName="height" values={`${10 + i * 4};${20 + i * 2};${10 + i * 4}`} dur="1.4s" repeatCount="indefinite" />
              </rect>
            ))}
            <text x="0" y="40" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="11" fill={C.teal} fontWeight="700">90s / set</text>
          </g>

          {/* essays flowing arrow */}
          <path d="M 200 160 Q 300 110 400 160" fill="none" stroke={fast ? C.teal : C.gold} strokeWidth="2" strokeDasharray="6 4" />
          <polygon points="400,156 408,160 400,164" fill={fast ? C.teal : C.gold} />
          <text x="300" y="100" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="10" fill={C.gold} fontStyle="italic">30 essays</text>

          {/* "what's lost?" caption in stage 1 */}
          {stage >= 1 && (
            <text x="300" y="252" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="10" fill={C.coral} fontStyle="italic">what does grading do for the teacher?</text>
          )}
        </g>
      }
    />
  );
}
