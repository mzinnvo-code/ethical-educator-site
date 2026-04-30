import { C } from "../theme.js";
import { PatternScene } from "./sceneBases.jsx";

export default function SimulationScene({ stage = 0, chose = [], mode }) {
  // Stage 0: one frame. Stage 1: nested frames. Stage 2: many nested. Stage 3: synthesis.
  const depth = stage === 0 ? 1 : stage === 1 ? 4 : 8;
  return (
    <PatternScene
      ariaLabel="Nested rectangular frames within frames within frames"
      label={stage === 0 ? "Reality" : stage === 2 ? "Reality?" : "Looking deeper"}
      sublabel={stage === 0 ? "Or is it?" : stage === 2 ? "Each frame contains another." : null}
      pattern={
        <g transform="translate(300 140)">
          {Array.from({ length: depth }).map((_, i) => {
            const inset = i * 16;
            const w = 360 - inset * 2;
            const h = 220 - inset * 2;
            const opacity = 1 - (i / depth) * 0.6;
            return (
              <rect key={i}
                x={-w / 2} y={-h / 2}
                width={w} height={h} rx="6"
                fill="none"
                stroke={[C.gold, C.coral, C.teal, C.ocean, C.sand][i % 5]}
                strokeWidth="2"
                opacity={opacity}
              />
            );
          })}
          {/* tiny figure at center */}
          <circle cx="0" cy="-4" r="6" fill="none" stroke={C.gold} strokeWidth="1.5" />
          <line x1="0" y1="2" x2="0" y2="14" stroke={C.gold} strokeWidth="1.5" />
          <line x1="-4" y1="6" x2="4" y2="6" stroke={C.gold} strokeWidth="1.5" />
        </g>
      }
    />
  );
}
