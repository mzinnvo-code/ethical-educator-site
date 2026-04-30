import { C } from "../theme.js";
import { HorizontalStage, Stickfigure } from "./sceneBases.jsx";

export default function AutonomousCarScene({ stage = 0, chose = [], mode }) {
  const lens = chose[0]?.lens;
  const swerve = stage >= 1 && (lens === "utilitarian" || lens === "anti-ranking");
  return (
    <HorizontalStage
      ariaLabel="A self-driving car on a road; pedestrians ahead; a wall to the side"
      caption={stage === 0 ? "Stage 1 · Unavoidable" : stage === 1 ? "Stage 2 · Your call" : "Reflection"}
      sky={null}
      ground={
        <g>
          {/* road */}
          <rect x="0" y="220" width="600" height="80" fill={`${C.midnight}80`} />
          <line x1="0" y1="260" x2="600" y2="260" stroke={C.gold} strokeWidth="2" strokeDasharray="20 14" />
          {/* wall on side */}
          <rect x="0" y="180" width="600" height="40" fill={`${C.coral}40`} stroke={C.coral} strokeWidth={swerve ? 2 : 1} opacity={swerve ? 1 : 0.4} />
          <text x="60" y="206" fontFamily="'DM Sans', sans-serif" fontSize="9" fill={C.coral}>WALL</text>
        </g>
      }
      actors={
        <g>
          {/* car */}
          <g transform={`translate(${swerve ? 220 : 380} 250) rotate(${swerve ? -20 : 0})`}>
            <rect x="-32" y="-18" width="64" height="32" rx="6" fill={`${C.teal}50`} stroke={C.teal} strokeWidth="2" />
            <rect x="-22" y="-14" width="20" height="14" rx="2" fill={`${C.midnight}aa`} />
            <rect x="2" y="-14" width="20" height="14" rx="2" fill={`${C.midnight}aa`} />
            <circle cx="-20" cy="14" r="6" fill={C.midnight} stroke={C.teal} strokeWidth="1.5" />
            <circle cx="20" cy="14" r="6" fill={C.midnight} stroke={C.teal} strokeWidth="1.5" />
            {/* driver inside */}
            <circle cx="0" cy="-7" r="3" fill={swerve ? C.coral : C.gold} />
          </g>

          {/* pedestrians */}
          {[0, 1, 2].map(i => (
            <Stickfigure key={i} x={460 + i * 18} y={240} scale={0.8} color={swerve ? C.textSecondary : C.coral} />
          ))}

          {/* "you" label on car */}
          <text x={swerve ? 220 : 380} y="290" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="9" fill={C.gold}>YOU</text>
        </g>
      }
    />
  );
}
