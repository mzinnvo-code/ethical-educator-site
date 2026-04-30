import { C } from "../theme.js";
import { CharacterScene } from "./sceneBases.jsx";

export default function MessyRobotScene({ stage = 0, chose = [], mode }) {
  const lens = chose[0]?.lens;
  const messed = stage >= 1 && lens === "convenience";
  return (
    <CharacterScene
      ariaLabel="A small cleaning robot beside a pile of crumpled paper that grows or shrinks based on choice"
      halo={messed ? C.coral : C.teal}
      mood={lens === "responsibility" || lens === "moral-courage" ? "happy" : messed ? "sad" : "neutral"}
      label={stage === 0 ? "The cleaning robot" : "After your choice"}
      sublabel={stage === 0 ? "Friend says: \"It'll just clean it.\"" : null}
      body={
        <g>
          {/* robot vacuum disc */}
          <ellipse cx="-40" cy="40" rx="28" ry="10" fill={C.midnight} opacity="0.8" />
          <ellipse cx="-40" cy="34" rx="28" ry="14" fill={`${C.teal}50`} stroke={C.teal} strokeWidth="2" />
          <circle cx="-40" cy="34" r="6" fill={C.gold} />
          <circle cx="-40" cy="34" r="3" fill={C.midnight} />

          {/* trash piles — count grows when messed */}
          {(messed ? [0, 1, 2, 3, 4, 5] : stage >= 1 ? [0] : [0, 1]).map(i => {
            const px = 0 + i * 18 - 20;
            const py = 36 + (i % 2 === 0 ? -2 : 4);
            return (
              <g key={i}>
                <circle cx={px} cy={py} r={6 + (i % 3)} fill={`${C.sand}60`} stroke={C.textMuted} strokeWidth="0.8" />
                <line x1={px - 3} y1={py} x2={px + 3} y2={py} stroke={C.textMuted} strokeWidth="0.6" />
              </g>
            );
          })}

          {/* friend silhouette */}
          {stage === 0 && (
            <g transform="translate(60 -10)">
              <circle cx="0" cy="0" r="14" fill="none" stroke={C.coral} strokeWidth="2" />
              <path d="M-12 12 Q0 6 12 12 L14 50 L-14 50 Z" fill={`${C.coral}25`} stroke={C.coral} strokeWidth="1.5" />
              <text x="0" y="-26" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="9" fill={C.coral} fontStyle="italic">"why not?"</text>
            </g>
          )}
        </g>
      }
    />
  );
}
