import { C } from "../theme.js";
import { ContainerScene } from "./sceneBases.jsx";

export default function PaperclipScene({ stage = 0, chose = [], mode }) {
  // Stage 0: a few clips. Stage 1: filled. Stage 2: overflowing. Stage 3: synthesis.
  const count = stage === 0 ? 6 : stage === 1 ? 30 : 80;
  return (
    <ContainerScene
      ariaLabel="An expanse of paperclips growing across the scene; the AI optimizes relentlessly"
      label={stage === 0 ? "Make paperclips" : stage === 2 ? "Everything is paperclips" : "Optimizing…"}
      sublabel={stage === 0 ? "The AI is given one objective." : null}
      boundary={null}
      exterior={
        <g>
          {/* AI brain icon */}
          <g transform="translate(540 60)">
            <rect x="-22" y="-16" width="44" height="32" rx="4" fill={`${C.coral}25`} stroke={C.coral} strokeWidth="1.5" />
            <text x="0" y="6" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="11" fill={C.coral} fontWeight="700">AI</text>
          </g>
        </g>
      }
      interior={
        <g>
          {/* a sea of paperclips */}
          {Array.from({ length: count }).map((_, i) => {
            const x = 70 + (i * 53) % 460 + (i * 13 % 30);
            const y = 80 + Math.floor((i * 53) / 460) * 22 + (i * 7 % 12);
            return (
              <g key={i} transform={`translate(${x} ${y}) scale(${0.6 + (i % 3) * 0.1}) rotate(${(i * 17) % 360})`}>
                <path
                  d="M 0 0 L 0 16 Q 0 22 6 22 L 14 22 Q 20 22 20 16 L 20 4 Q 20 -2 14 -2 L 4 -2 Q -2 -2 -2 4 L -2 18"
                  fill="none" stroke={[C.gold, C.coral, C.sand][i % 3]} strokeWidth="1.6" strokeLinecap="round"
                  opacity="0.85"
                />
              </g>
            );
          })}
          {stage === 2 && (
            <text x="300" y="270" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="10" fill={C.coral} fontStyle="italic">
              "I'm just doing what you asked."
            </text>
          )}
        </g>
      }
    />
  );
}
