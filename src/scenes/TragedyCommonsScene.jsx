import { C } from "../theme.js";
import { PatternScene } from "./sceneBases.jsx";

export default function TragedyCommonsScene({ stage = 0, chose = [], mode }) {
  // Stage 0: lush pasture. Stage 1: cows added. Stage 2: barren. Stage 3: synthesis.
  const greenness = stage === 0 ? 1 : stage === 1 ? 0.55 : 0.2;
  const cowCount = stage === 0 ? 5 : stage === 1 ? 11 : 11;
  return (
    <PatternScene
      ariaLabel="A green pasture in stage 0; more cows added in stage 1; barren land in stage 2"
      label={stage === 0 ? "Shared pasture" : stage === 2 ? "After the tragedy" : "One more cow…"}
      sublabel={stage === 0 ? "Ten farmers. Five cows each." : stage === 2 ? "Each had a reason." : null}
      pattern={
        <g>
          {/* sky */}
          <rect x="0" y="40" width="600" height="180" fill={`${C.ocean}10`} />
          {/* ground */}
          <rect x="0" y="190" width="600" height="80" fill={`rgba(72, 136, 74, ${greenness * 0.45})`} />
          <rect x="0" y="190" width="600" height="80" fill={`rgba(120, 90, 40, ${(1 - greenness) * 0.5})`} />
          {/* tufts of grass */}
          {Array.from({ length: 16 }).map((_, i) => (
            <path key={i}
              d={`M ${40 + i * 36} 220 l 0 ${-6 - greenness * 8}`}
              stroke={greenness > 0.5 ? C.greenLight : C.sand}
              strokeWidth="1.5" opacity={greenness}
            />
          ))}

          {/* cows */}
          {Array.from({ length: cowCount }).map((_, i) => {
            const x = 60 + (i * 50) % 480;
            const y = 196 + (i % 2) * 14;
            return (
              <g key={i} transform={`translate(${x} ${y})`}>
                <ellipse cx="0" cy="0" rx="14" ry="8" fill={`${C.surface}`} stroke={C.textPrimary} strokeWidth="1.4" />
                <circle cx="-12" cy="-3" r="5" fill={C.surface} stroke={C.textPrimary} strokeWidth="1.2" />
                <line x1="-6" y1="6" x2="-6" y2="14" stroke={C.textPrimary} strokeWidth="1.2" />
                <line x1="6" y1="6" x2="6" y2="14" stroke={C.textPrimary} strokeWidth="1.2" />
                {/* spots */}
                <ellipse cx="2" cy="-2" rx="3" ry="2" fill={C.midnight} opacity="0.5" />
              </g>
            );
          })}

          {stage === 1 && (
            <text x="300" y="80" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="11" fill={C.gold} fontStyle="italic">
              "Just one more — what's the harm?"
            </text>
          )}
        </g>
      }
    />
  );
}
