import { C } from "../theme.js";
import { HorizontalStage, Stickfigure } from "./sceneBases.jsx";

// Stages: 0 cave with shadows, 1 prisoner walks toward light, 2 outside, 3 returning
export default function PlatosCaveScene({ stage = 0, chose = [], mode }) {
  const lit = stage >= 1;
  const out = stage >= 2;
  return (
    <HorizontalStage
      ariaLabel="Prisoners face a cave wall watching shadows; a freed prisoner walks toward daylight"
      caption={stage === 0 ? "Stage 1 · Inside the cave" : stage === 1 ? "Stage 2 · The freed prisoner" : stage === 2 ? "Stage 3 · Daylight" : "Reflection"}
      sky={
        <g>
          {/* daylight gradient (revealed gradually) */}
          <rect x="380" y="0" width="220" height="220" fill={out ? `${C.gold}30` : lit ? `${C.gold}15` : `${C.gold}05`} />
          {out && <circle cx="510" cy="60" r="32" fill={C.gold}>
            <animate attributeName="opacity" values="0.7;1;0.7" dur="3.6s" repeatCount="indefinite" />
          </circle>}
        </g>
      }
      ground={
        <g>
          {/* cave wall */}
          <rect x="40" y="60" width="220" height="160" fill={C.midnight} />
          <line x1="40" y1="60" x2="260" y2="60" stroke={C.border} strokeWidth="1" />
          <line x1="40" y1="220" x2="260" y2="220" stroke={C.border} strokeWidth="1" />
          {/* shadows on wall */}
          {[80, 130, 180, 220].map((x, i) => (
            <ellipse key={i} cx={x} cy="160" rx="14" ry="40" fill={`${C.textPrimary}25`} stroke={`${C.textPrimary}40`} strokeWidth="0.6" />
          ))}
          {/* fire silhouette behind wall */}
          <g transform="translate(310 180)">
            <path d="M0 0 Q-10 -20 0 -32 Q10 -20 0 0 Z" fill={C.coral} opacity="0.6">
              <animate attributeName="opacity" values="0.6;0.9;0.6" dur="1.6s" repeatCount="indefinite" />
            </path>
          </g>
          {/* exit arch */}
          <path d="M 380 60 Q 380 220 380 220 L 380 60 Z" fill="none" />
          <path d="M 350 60 Q 350 60 380 60 L 380 220 L 350 220 Z" fill={out ? `${C.gold}10` : `${C.midnight}`} />
        </g>
      }
      actors={
        <g>
          {/* chained prisoners — facing wall */}
          {[0, 1, 2].map(i => (
            <g key={i} transform={`translate(${230 + i * -36} 200)`}>
              <Stickfigure x={0} y={0} scale={0.85} color={C.textMuted} />
              <line x1="-6" y1="6" x2="-12" y2="14" stroke={C.gold} strokeWidth="1.2" opacity="0.6" />
            </g>
          ))}
          {/* freed prisoner — moves toward light */}
          <Stickfigure x={lit ? (out ? 500 : 360) : 200} y={200} scale={1} color={lit ? C.gold : C.textSecondary} />
          {/* returning arrow on synthesis stage */}
          {stage === 3 && (
            <g>
              <path d="M 470 200 Q 360 160 240 200" fill="none" stroke={C.coral} strokeWidth="2" strokeDasharray="4 4" />
              <polygon points="240,200 252,194 252,206" fill={C.coral} />
              <text x="350" y="155" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="10" fill={C.coral} fontStyle="italic">does he return?</text>
            </g>
          )}
        </g>
      }
    />
  );
}
