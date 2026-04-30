import { C } from "../theme.js";
import { PatternScene } from "./sceneBases.jsx";

export default function AIFriendScene({ stage = 0, chose = [], mode }) {
  return (
    <PatternScene
      ariaLabel="A chat bubble beside an empty chair facing a window; a small screen glow"
      label={stage === 0 ? "The student's confidant" : stage === 1 ? "Asymmetric" : "Reflection"}
      sublabel={stage === 0 ? "\"It listens. It doesn't judge.\"" : null}
      pattern={
        <g>
          {/* window */}
          <g transform="translate(180 90)">
            <rect x="-46" y="-36" width="92" height="120" rx="3" fill={`${C.ocean}15`} stroke={C.ocean} strokeWidth="2" />
            <line x1="0" y1="-36" x2="0" y2="84" stroke={C.ocean} strokeWidth="1" />
            <line x1="-46" y1="24" x2="46" y2="24" stroke={C.ocean} strokeWidth="1" />
          </g>

          {/* empty chair */}
          <g transform="translate(180 200)">
            <rect x="-22" y="-10" width="44" height="30" rx="3" fill={C.surface} stroke={C.coral} strokeWidth="1.5" />
            <rect x="-22" y="-40" width="6" height="50" rx="2" fill={C.surface} stroke={C.coral} strokeWidth="1.5" />
            <rect x="16" y="-40" width="6" height="50" rx="2" fill={C.surface} stroke={C.coral} strokeWidth="1.5" />
          </g>

          {/* chat bubble */}
          <g transform="translate(420 130)">
            <rect x="-72" y="-44" width="144" height="100" rx="14" fill={`${C.teal}15`} stroke={C.teal} strokeWidth="2" />
            <line x1="-60" y1="-26" x2="56" y2="-26" stroke={`${C.teal}80`} strokeWidth="1" />
            <line x1="-60" y1="-12" x2="44" y2="-12" stroke={`${C.teal}80`} strokeWidth="1" />
            <line x1="-60" y1="2" x2="50" y2="2" stroke={`${C.teal}80`} strokeWidth="1" />
            <line x1="-60" y1="16" x2="38" y2="16" stroke={`${C.teal}80`} strokeWidth="1" />
            {/* tail */}
            <path d="M -60 30 L -76 50 L -50 36 Z" fill={`${C.teal}15`} stroke={C.teal} strokeWidth="2" />
            <text x="0" y="44" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="9" fill={C.teal} fontStyle="italic">always available</text>
          </g>

          {stage >= 1 && (
            <g transform="translate(300 252)">
              <text x="0" y="0" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="10" fill={C.coral} fontStyle="italic">→</text>
              <text x="0" y="14" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="10" fill={C.coral} fontStyle="italic">but never reciprocates</text>
            </g>
          )}
        </g>
      }
    />
  );
}
