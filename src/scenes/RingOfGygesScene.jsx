import { C } from "../theme.js";
import { ContainerScene } from "./sceneBases.jsx";

export default function RingOfGygesScene({ stage = 0, chose = [], mode }) {
  const lens = chose[0]?.lens;
  const wearing = stage >= 1;
  return (
    <ContainerScene
      ariaLabel="A shepherd's hand emerging from a tomb cleft holding a ring; later, a transparent figure"
      label={stage === 0 ? "The find" : wearing ? "Invisible" : "Reflection"}
      sublabel={stage === 0 ? "Down in the cleft." : null}
      boundary={null}
      exterior={
        <g>
          {/* tomb cleft on left */}
          <path d="M 60 80 L 60 260 L 200 260 L 200 80 Q 130 60 60 80 Z" fill={C.midnight} />
          <path d="M 60 80 L 60 260 L 200 260 L 200 80 Q 130 60 60 80 Z" fill="none" stroke={C.gold} strokeWidth="1" opacity="0.4" />
        </g>
      }
      interior={
        <g>
          {/* shepherd hand reaching with ring */}
          <g transform="translate(150 150)">
            {!wearing && (
              <g>
                {/* hand silhouette */}
                <path d="M0 60 L0 0 Q0 -8 8 -8 L 12 -8 Q 20 -8 20 0 L 20 -28 Q 20 -36 28 -36 Q 36 -36 36 -28 L 36 0 L 38 0 L 42 -16 Q 44 -22 50 -20 Q 54 -18 52 -10 L 50 4 Q 48 26 38 32 L 30 60 Z"
                  fill={`${C.sand}80`} stroke={C.textSecondary} strokeWidth="1.5" />
                {/* ring on finger */}
                <circle cx="28" cy="-22" r="6" fill="none" stroke={C.gold} strokeWidth="3" />
                <circle cx="28" cy="-26" r="2" fill={C.coral}>
                  <animate attributeName="opacity" values="0.6;1;0.6" dur="2.2s" repeatCount="indefinite" />
                </circle>
              </g>
            )}
            {wearing && (
              <g opacity="0.35">
                {/* full body, translucent */}
                <circle cx="0" cy="-50" r="18" fill="none" stroke={C.gold} strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M-16 -32 Q0 -42 16 -32 L20 60 L-20 60 Z" fill={`${C.gold}20`} stroke={C.gold} strokeWidth="1.5" strokeDasharray="3 3" />
              </g>
            )}
          </g>

          {/* throne (stage 2 + lens=social-pressure or moral-courage) */}
          {stage === 2 && (
            <g transform="translate(420 170)">
              <rect x="-30" y="-40" width="60" height="60" rx="3" fill={`${C.gold}30`} stroke={C.gold} strokeWidth="2" />
              <rect x="-32" y="-44" width="64" height="6" rx="2" fill={C.gold} />
              <text x="0" y="36" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="9" fill={C.gold} fontStyle="italic">
                {lens === "social-pressure" ? "the throne (he took it)" : lens === "intrinsic-value" ? "untouched" : "the throne"}
              </text>
            </g>
          )}
        </g>
      }
    />
  );
}
