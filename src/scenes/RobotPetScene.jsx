import { C } from "../theme.js";
import { CharacterScene, Sparkle } from "./sceneBases.jsx";

export default function RobotPetScene({ stage = 0, chose = [], mode }) {
  const lens = chose[0]?.lens;
  const fadeBody = stage === 0 ? 1 : stage === 1 ? 0.85 : stage === 2 ? 0.55 : 0.4;
  const tone = lens === "care" || lens === "ritual" ? C.gold : lens === "realism" ? C.textSecondary : C.coral;

  return (
    <CharacterScene
      ariaLabel="A small robot dog at rest; its light dims across stages"
      halo={tone}
      mood={lens === "care" ? "sad" : "neutral"}
      label={stage === 0 ? "The robot dog" : stage === 2 ? "Quiet now" : "What it was"}
      sublabel={stage === 0 ? "Class pet for two years." : stage === 2 ? "It won't turn on." : null}
      body={
        <g opacity={fadeBody}>
          {/* body */}
          <ellipse cx="0" cy="20" rx="55" ry="25" fill={`${tone}50`} stroke={tone} strokeWidth="2" />
          {/* legs */}
          <rect x="-40" y="40" width="10" height="22" rx="3" fill={tone} />
          <rect x="-12" y="40" width="10" height="22" rx="3" fill={tone} />
          <rect x="14" y="40" width="10" height="22" rx="3" fill={tone} />
          <rect x="34" y="40" width="10" height="22" rx="3" fill={tone} />
          {/* head */}
          <circle cx="-50" cy="0" r="22" fill={`${tone}50`} stroke={tone} strokeWidth="2" />
          <circle cx="-58" cy="-4" r="3" fill={stage <= 1 ? C.gold : C.textMuted}>
            {stage <= 1 && <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite" />}
          </circle>
          {/* ear */}
          <path d="M-58 -18 L -52 -28 L -46 -18" fill="none" stroke={tone} strokeWidth="2" strokeLinecap="round" />
          {/* tail */}
          <path d="M50 8 Q 70 -8 65 -22" fill="none" stroke={tone} strokeWidth="3" strokeLinecap="round" />
          {/* power indicator on body */}
          <circle cx="-10" cy="14" r="3" fill={stage <= 1 ? C.gold : C.coral} />
          <circle cx="0" cy="14" r="3" fill={stage <= 1 ? C.gold : C.textMuted} />
          <circle cx="10" cy="14" r="3" fill={stage <= 0 ? C.gold : C.textMuted} />

          {/* candle for synthesis stage */}
          {stage === 3 && (
            <g transform="translate(-90 -40)">
              <rect x="-3" y="0" width="6" height="20" fill={C.sand} />
              <path d="M0 0 Q-3 -8 0 -12 Q3 -8 0 0" fill={C.gold}>
                <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite" />
              </path>
            </g>
          )}

          {stage <= 1 && <Sparkle x={50} y={-40} size={4} color={C.gold} />}
        </g>
      }
    />
  );
}
