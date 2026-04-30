import { C } from "../theme.js";
import { PatternScene } from "./sceneBases.jsx";

export default function SoritesScene({ stage = 0, chose = [], mode }) {
  // Stage 0: full heap. Stage 1: half. Stage 2: a few grains. Stage 3: synthesis.
  const grainCount = stage === 0 ? 200 : stage === 1 ? 80 : 8;
  return (
    <PatternScene
      ariaLabel="A heap of sand grains shrinking across stages until only a few remain"
      label={stage === 0 ? "A heap of sand" : stage === 2 ? "A heap?" : "Removing one at a time"}
      sublabel={stage === 0 ? "Remove one — still a heap." : stage === 2 ? "It's still a heap, isn't it?" : null}
      pattern={
        <g>
          {/* heap base */}
          <ellipse cx="300" cy="240" rx="180" ry="14" fill={`${C.sand}30`} />
          {/* sand grains arranged in a pile */}
          {Array.from({ length: grainCount }).map((_, i) => {
            // Random-ish placement seeded by index
            const seed = (i * 9301 + 49297) % 233280;
            const t = seed / 233280;
            const angle = t * Math.PI;
            const radius = 100 - i * 0.5;
            const x = 300 + Math.cos(angle) * radius * (0.5 + t * 0.5);
            const y = 220 - Math.sin(angle) * radius * 0.45 - (i % 7) * 2;
            const r = 1.5 + (i % 3) * 0.4;
            return (
              <circle key={i} cx={x} cy={y} r={r} fill={`${C.sand}${i % 4 === 0 ? "cc" : "80"}`} />
            );
          })}
          {/* count label */}
          <text x="300" y="60" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="13" fill={C.gold} fontWeight="700">
            {stage === 0 ? "10,000" : stage === 1 ? "5,000" : "8"} grains
          </text>
        </g>
      }
    />
  );
}
