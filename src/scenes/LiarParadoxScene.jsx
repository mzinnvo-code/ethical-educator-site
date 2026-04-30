import { C } from "../theme.js";
import { PatternScene } from "./sceneBases.jsx";

export default function LiarParadoxScene({ stage = 0, chose = [], mode }) {
  return (
    <PatternScene
      ariaLabel="A self-referential infinite spiral; the words 'this sentence is false' wrap around it"
      label={stage === 0 ? "This sentence is false." : stage === 1 ? "Round and round." : "Reflection"}
      sublabel={stage === 0 ? "If true, then false. If false, then true." : null}
      pattern={
        <g transform="translate(300 140)">
          {/* spiral */}
          <path d="M 0 0
                   m 0 -8 a 8 8 0 1 1 -8 8
                   a 16 16 0 1 1 24 0
                   a 28 28 0 1 1 -36 -12
                   a 44 44 0 1 1 56 14
                   a 64 64 0 1 1 -82 -22
                   a 88 88 0 1 1 110 28"
            fill="none" stroke={C.gold} strokeWidth="2" strokeLinecap="round">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="24s" repeatCount="indefinite" />
          </path>
          {/* T/F flip text */}
          <text x="0" y="-100" textAnchor="middle" fontFamily="'Source Serif 4', Georgia, serif" fontSize="14" fontWeight="700" fill={C.coral}>TRUE</text>
          <text x="0" y="120" textAnchor="middle" fontFamily="'Source Serif 4', Georgia, serif" fontSize="14" fontWeight="700" fill={C.teal}>FALSE</text>
          <line x1="-12" y1="-90" x2="12" y2="110" stroke={C.gold} strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
          <line x1="12" y1="-90" x2="-12" y2="110" stroke={C.gold} strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
          {stage >= 1 && (
            <text x="0" y="0" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="11" fill={C.sand} fontStyle="italic">↻</text>
          )}
        </g>
      }
    />
  );
}
