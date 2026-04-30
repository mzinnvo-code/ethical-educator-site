import { C } from "../theme.js";
import { CharacterScene, Sparkle } from "./sceneBases.jsx";

export default function AIArtScene({ stage = 0, chose = [], mode }) {
  const lens = chose[0]?.lens;
  const proud = stage === 2 && (lens === "transparency" || lens === "credit");
  return (
    <CharacterScene
      ariaLabel="A drawing being polished by a glowing AI brush; later, a teacher's gold star"
      halo={proud ? C.gold : C.teal}
      mood={proud ? "happy" : "neutral"}
      label={stage === 0 ? "Your drawing" : stage === 1 ? "The teacher loves it." : "Did you say?"}
      sublabel={stage === 0 ? "AI helped you polish it." : null}
      body={
        <g>
          {/* canvas */}
          <rect x="-60" y="-50" width="120" height="90" rx="3" fill={`${C.sand}25`} stroke={C.gold} strokeWidth="2" />
          {/* simple drawing inside */}
          <circle cx="-20" cy="-20" r="14" fill={C.coral} opacity="0.7" />
          <line x1="-30" y1="20" x2="30" y2="20" stroke={C.teal} strokeWidth="2" />
          <path d="M-40 0 L -30 -10 L -20 0 L -10 -8 L 0 0 L 10 -12 L 20 0" fill="none" stroke={C.gold} strokeWidth="1.5" />
          {/* AI brush */}
          {stage === 0 && (
            <g transform="translate(40 -10) rotate(20)">
              <rect x="-1" y="-30" width="2" height="34" fill={C.teal} />
              <polygon points="-5,4 5,4 0,12" fill={C.teal} />
              <Sparkle x={0} y={20} size={5} color={C.teal} />
            </g>
          )}
          {/* gold star (stage 1+) */}
          {stage >= 1 && (
            <g transform="translate(50 -60)">
              <polygon points="0,-12 4,-4 12,-4 6,2 8,10 0,5 -8,10 -6,2 -12,-4 -4,-4" fill={C.gold} stroke={C.coral} strokeWidth="1" />
            </g>
          )}
        </g>
      }
    />
  );
}
