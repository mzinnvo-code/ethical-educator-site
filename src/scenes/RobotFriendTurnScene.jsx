import { C } from "../theme.js";
import { CharacterScene } from "./sceneBases.jsx";

export default function RobotFriendTurnScene({ stage = 0, chose = [], mode }) {
  const lens = chose[0]?.lens;
  return (
    <CharacterScene
      ariaLabel="A friendly robot with two hands reaching toward it from opposite sides"
      halo={C.teal}
      mood={lens === "fairness" || lens === "creative" ? "happy" : "neutral"}
      label={stage === 0 ? "One robot, two friends" : stage === 1 ? "What if it lasts a week?" : "What you decided"}
      sublabel={stage === 0 ? "Both want to play right now." : null}
      body={
        <g>
          {/* robot body */}
          <rect x="-30" y="-40" width="60" height="60" rx="8" fill={`${C.teal}25`} stroke={C.teal} strokeWidth="2" />
          <circle cx="-12" cy="-20" r="4" fill={C.teal} />
          <circle cx="12" cy="-20" r="4" fill={C.teal} />
          <line x1="-10" y1="-2" x2="10" y2="-2" stroke={C.teal} strokeWidth="2" strokeLinecap="round" />
          <rect x="-6" y="-58" width="12" height="14" rx="2" fill={C.teal} opacity="0.7" />
          <circle cx="0" cy="-62" r="3" fill={C.gold} />
          {/* arms */}
          <line x1="-30" y1="-10" x2="-50" y2="0" stroke={C.teal} strokeWidth="3" strokeLinecap="round" />
          <line x1="30" y1="-10" x2="50" y2="0" stroke={C.teal} strokeWidth="3" strokeLinecap="round" />
          {/* legs */}
          <line x1="-12" y1="20" x2="-12" y2="50" stroke={C.teal} strokeWidth="3" strokeLinecap="round" />
          <line x1="12" y1="20" x2="12" y2="50" stroke={C.teal} strokeWidth="3" strokeLinecap="round" />

          {/* two reaching hands */}
          {stage === 0 && (
            <>
              <g transform="translate(-90 0)" opacity="0.85">
                <circle cx="0" cy="0" r="12" fill="none" stroke={C.coral} strokeWidth="2" />
                <text x="0" y="20" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="9" fill={C.coral}>YOU</text>
              </g>
              <g transform="translate(90 0)" opacity="0.85">
                <circle cx="0" cy="0" r="12" fill="none" stroke={C.gold} strokeWidth="2" />
                <text x="0" y="20" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="9" fill={C.gold}>FRIEND</text>
              </g>
            </>
          )}

          {/* clock for stage 1 */}
          {stage === 1 && (
            <g transform="translate(0 -110)">
              <circle cx="0" cy="0" r="22" fill="none" stroke={C.gold} strokeWidth="2" />
              <line x1="0" y1="0" x2="0" y2="-14" stroke={C.gold} strokeWidth="2" />
              <line x1="0" y1="0" x2="10" y2="6" stroke={C.gold} strokeWidth="2" />
              <text x="0" y="38" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="9" fill={C.gold} fontStyle="italic">a week of turns</text>
            </g>
          )}

          {/* synthesis: heart or balance */}
          {stage === 2 && (
            <g transform="translate(0 -100)">
              <text x="0" y="0" textAnchor="middle" fontFamily="'Source Serif 4', Georgia, serif" fontSize="22" fontWeight="700" fill={C.gold}>{lens === "fairness" ? "⚖" : lens === "creative" ? "✨" : "♡"}</text>
            </g>
          )}
        </g>
      }
    />
  );
}
