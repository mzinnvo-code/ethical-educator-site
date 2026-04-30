import { C } from "../theme.js";
import { CharacterScene, Sparkle } from "./sceneBases.jsx";

// Stages: 0 ring on velvet, 1 ring on a hand fading invisible, 2 mirror — who are you?, 3 synthesis
export default function InvisibleRingScene({ stage = 0, chose = [], mode }) {
  const wearing = stage >= 1;
  const lens = chose[0]?.lens;
  const halo = stage === 2 ? (lens === "egoism" ? C.coral : C.teal) : C.gold;

  return (
    <CharacterScene
      ariaLabel="A magical ring on a velvet cushion; in later stages a hand wears it and turns translucent"
      halo={halo}
      mood={lens === "virtue" || lens === "integrity" ? "happy" : lens === "egoism" ? "thoughtful" : "neutral"}
      label={stage === 2 ? "Same person?" : "The ring"}
      sublabel={stage === 0 ? "Wear it and disappear." : stage === 1 ? "You are invisible now." : null}
      body={
        <g>
          {/* velvet cushion under ring (stage 0) */}
          {stage === 0 && (
            <g transform="translate(0 30)">
              <ellipse cx="0" cy="0" rx="80" ry="20" fill={`${C.coral}30`} />
              <ellipse cx="0" cy="-4" rx="76" ry="16" fill={`${C.coral}50`} />
            </g>
          )}

          {/* hand wearing ring (stage 1+) */}
          {wearing && (
            <g transform="translate(-30 -20) scale(1.4)" opacity={stage === 1 ? 0.45 : 0.85}>
              <path d="M 0 60 L 0 10 Q 0 0 8 0 L 12 0 Q 20 0 20 10 L 20 -20 Q 20 -28 28 -28 Q 36 -28 36 -20 L 36 10 L 38 10 L 42 -10 Q 44 -16 50 -14 Q 54 -12 52 -4 L 50 12 Q 48 30 38 36 L 30 60 Z"
                fill={`${C.sand}80`} stroke={C.textSecondary} strokeWidth="1.5" />
            </g>
          )}

          {/* the ring itself */}
          <g transform={`translate(${wearing ? 5 : 0} ${wearing ? -28 : 10})`}>
            <circle cx="0" cy="0" r="22" fill="none" stroke={C.gold} strokeWidth="6" />
            <circle cx="0" cy="-22" r="6" fill={C.coral} stroke={C.gold} strokeWidth="2">
              <animate attributeName="opacity" values="0.7;1;0.7" dur="2.4s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* sparkles around ring */}
          <Sparkle x={-50} y={-40} size={5} color={C.gold} />
          <Sparkle x={48} y={-30} size={5} color={C.gold} delay={0.7} />
          {stage === 2 && <Sparkle x={0} y={-70} size={6} color={C.coral} delay={0.3} />}
        </g>
      }
    />
  );
}
