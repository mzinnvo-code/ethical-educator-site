import { C } from "../theme.js";
import { CharacterScene, FaceMood, Sparkle } from "./sceneBases.jsx";

// Stages:
// 0 setup       — bear sits, neutral, soft glow
// 1 reflect     — expression matches first choice (lens-driven)
// 2 follow-up   — battery-dying twist, dimmer glow
// 3 synthesis   — bear waving farewell with sparkles
export default function MagicToyScene({ stage = 0, chose = [], mode }) {
  const first = chose[0];
  const lens = first?.lens;
  const mood = stage === 0
    ? "sad"
    : stage === 1
      ? (lens === "care" || lens === "inquiry" ? "happy" : lens === "avoidance" ? "sad" : "thoughtful")
      : stage === 2
        ? "thoughtful"
        : "happy";

  const haloDim = stage === 2 ? 0.45 : 1;
  const fillBody = stage === 2 ? `${C.coral}40` : C.sand;

  return (
    <CharacterScene
      ariaLabel="A small teddy-bear–like toy with a glowing halo, expression changes with the user's choices"
      halo={stage === 2 ? C.coral : C.gold}
      mood={mood}
      label={stage === 3 ? "Goodnight" : "The toy"}
      sublabel={stage === 0 ? "It says it feels sad." : stage === 2 ? "Its battery is dying." : null}
      body={
        <g opacity={haloDim}>
          {/* ears */}
          <circle cx="-30" cy="-50" r="14" fill={fillBody} />
          <circle cx="30" cy="-50" r="14" fill={fillBody} />
          <circle cx="-30" cy="-50" r="6" fill={C.coral} opacity="0.4" />
          <circle cx="30" cy="-50" r="6" fill={C.coral} opacity="0.4" />
          {/* head */}
          <circle cx="0" cy="-22" r="38" fill={fillBody} />
          {/* face */}
          <FaceMood cx={0} cy={-22} r={20} mood={mood} color={C.midnight} />
          {/* nose */}
          <circle cx="0" cy="-18" r="3" fill={C.midnight} />
          {/* belly */}
          <ellipse cx="0" cy="38" rx="40" ry="46" fill={fillBody} />
          <ellipse cx="0" cy="42" rx="22" ry="28" fill={`${C.gold}30`} />
          {/* arms */}
          <ellipse cx="-44" cy="22" rx="14" ry="22" fill={fillBody} transform="rotate(-12 -44 22)" />
          <ellipse cx="44" cy="22" rx="14" ry="22" fill={fillBody} transform="rotate(12 44 22)" />
          {/* battery on chest when dimming */}
          {stage === 2 && (
            <g>
              <rect x="-12" y="34" width="24" height="14" rx="2" fill="none" stroke={C.coral} strokeWidth="1.5" />
              <rect x="-10" y="36" width="6" height="10" fill={C.coral} opacity="0.7" />
              <rect x="11" y="38" width="3" height="6" fill={C.coral} />
            </g>
          )}
          {/* sparkles on synthesis */}
          {stage === 3 && (
            <>
              <Sparkle x={-58} y={-58} size={5} color={C.gold} />
              <Sparkle x={62} y={-46} size={5} color={C.gold} delay={0.6} />
              <Sparkle x={-50} y={20} size={4} color={C.teal} delay={1.2} />
            </>
          )}
        </g>
      }
    />
  );
}
