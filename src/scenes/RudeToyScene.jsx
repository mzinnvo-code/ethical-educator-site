import { C } from "../theme.js";
import { CharacterScene, FaceMood } from "./sceneBases.jsx";

export default function RudeToyScene({ stage = 0, chose = [], mode }) {
  const lens = chose[0]?.lens;
  const said = stage >= 1;
  return (
    <CharacterScene
      ariaLabel="A talking toy with a speech bubble that has a star where a rude word would be"
      halo={lens === "responsibility" || lens === "voice" ? C.teal : C.coral}
      mood={lens === "voice" ? "happy" : "sad"}
      label={stage === 0 ? "The rude toy" : "After your choice"}
      sublabel={stage === 0 ? "It says mean words." : null}
      body={
        <g>
          {/* toy body — rounded square */}
          <rect x="-44" y="-30" width="88" height="80" rx="14" fill={`${C.gold}30`} stroke={C.gold} strokeWidth="2" />
          {/* face */}
          <FaceMood cx={0} cy={-4} mood="neutral" color={C.midnight} />
          {/* mouth */}
          <rect x="-14" y="14" width="28" height="6" rx="2" fill={C.midnight} opacity="0.6" />
          {/* antenna */}
          <line x1="0" y1="-30" x2="0" y2="-46" stroke={C.gold} strokeWidth="2" />
          <circle cx="0" cy="-50" r="4" fill={C.gold} />
          {/* speech bubble with star */}
          <g transform="translate(80 -30)">
            <ellipse cx="0" cy="0" rx="32" ry="22" fill={C.surface} stroke={said ? C.coral : C.textMuted} strokeWidth="1.5" />
            <text x="0" y="6" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="22" fontWeight="700" fill={said ? C.coral : C.textMuted}>★!?</text>
            <path d="M-26 14 L -36 28 L -16 18 Z" fill={C.surface} stroke={said ? C.coral : C.textMuted} strokeWidth="1.5" />
          </g>
        </g>
      }
    />
  );
}
