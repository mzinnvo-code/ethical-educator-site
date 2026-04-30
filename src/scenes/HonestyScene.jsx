import { C } from "../theme.js";
import { CharacterScene, FaceMood } from "./sceneBases.jsx";

export default function HonestyScene({ stage = 0, chose = [], mode }) {
  const lens = chose[0]?.lens;
  const teacherMood = stage === 0 ? "neutral" : (lens === "duty" || lens === "moral-courage" ? "happy" : lens === "loyalty" ? "thoughtful" : "neutral");
  return (
    <CharacterScene
      ariaLabel="A snapped wooden pencil with a worried friend; a teacher waits"
      halo={C.coral}
      mood={teacherMood}
      label={stage === 0 ? "The pencil broke." : stage === 1 ? "The teacher waits." : "What I learned"}
      sublabel={stage === 0 ? "Your friend asks you to keep it secret." : null}
      body={
        <g>
          {/* the broken pencil */}
          <g transform="translate(-50 30) rotate(-12)">
            <rect x="0" y="-4" width="60" height="8" rx="1" fill={C.gold} />
            <polygon points="60,-4 72,0 60,4" fill={C.coral} />
            <rect x="0" y="-4" width="6" height="8" fill="#f5deb3" />
          </g>
          <g transform="translate(20 36) rotate(18)">
            <rect x="0" y="-4" width="36" height="8" rx="1" fill={C.gold} />
            <rect x="0" y="-4" width="6" height="8" fill="#f5deb3" />
          </g>

          {/* friend silhouette (left) — looks worried in stage 0 */}
          <g transform="translate(-70 -30)">
            <circle cx="0" cy="0" r="14" fill="none" stroke={C.coral} strokeWidth="2" />
            <FaceMood cx={0} cy={0} mood={stage === 0 ? "sad" : "neutral"} color={C.coral} />
            <path d="M-12 12 Q0 6 12 12 L14 50 L-14 50 Z" fill={`${C.coral}30`} stroke={C.coral} strokeWidth="1.5" />
          </g>

          {/* teacher (right) */}
          {(stage === 1 || stage === 2) && (
            <g transform="translate(70 -30)">
              <circle cx="0" cy="0" r="14" fill="none" stroke={C.teal} strokeWidth="2" />
              <FaceMood cx={0} cy={0} mood={teacherMood} color={C.teal} />
              <path d="M-12 12 Q0 6 12 12 L14 50 L-14 50 Z" fill={`${C.teal}30`} stroke={C.teal} strokeWidth="1.5" />
            </g>
          )}

          {/* speech bubble: secret? */}
          {stage === 0 && (
            <g transform="translate(-90 -80)">
              <rect x="-22" y="-12" width="44" height="20" rx="10" fill={C.surface} stroke={C.coral} strokeWidth="1.2" />
              <text x="0" y="3" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="9" fill={C.coral} fontStyle="italic">"don't tell"</text>
            </g>
          )}
        </g>
      }
    />
  );
}
