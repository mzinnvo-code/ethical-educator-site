import { C } from "../theme.js";
import { HorizontalStage } from "./sceneBases.jsx";

export default function OmelasScene({ stage = 0, chose = [], mode }) {
  const dim = stage >= 1;
  const lens = chose[0]?.lens;
  const walking = stage === 2 && (lens === "moral-witness" || lens === "active-justice");
  return (
    <HorizontalStage
      ariaLabel="A bright ornate city with one dim cellar window beneath it"
      caption={stage === 0 ? "Stage 1 · Beautiful city" : stage === 1 ? "Stage 2 · The cellar" : "Reflection"}
      sky={
        <g>
          {/* festival fireworks */}
          {[120, 250, 380, 480].map((x, i) => (
            <g key={i} transform={`translate(${x} 60)`} opacity={dim ? 0.4 : 0.9}>
              {[0, 60, 120, 180, 240, 300].map(a => (
                <line key={a} x1="0" y1="0"
                  x2={Math.cos(a * Math.PI / 180) * 14}
                  y2={Math.sin(a * Math.PI / 180) * 14}
                  stroke={[C.gold, C.coral, C.teal, C.sand][i]} strokeWidth="1.6" />
              ))}
            </g>
          ))}
        </g>
      }
      ground={
        <g>
          {/* skyline */}
          <rect x="40" y="160" width="60" height="60" fill={`${C.gold}40`} stroke={C.gold} strokeWidth="1.5" />
          <rect x="100" y="120" width="40" height="100" fill={`${C.coral}40`} stroke={C.coral} strokeWidth="1.5" />
          <rect x="140" y="140" width="50" height="80" fill={`${C.sand}40`} stroke={C.sand} strokeWidth="1.5" />
          <polygon points="190,140 220,100 250,140 250,220 190,220" fill={`${C.teal}40`} stroke={C.teal} strokeWidth="1.5" />
          <rect x="250" y="130" width="80" height="90" fill={`${C.ocean}40`} stroke={C.ocean} strokeWidth="1.5" />
          <rect x="330" y="110" width="60" height="110" fill={`${C.gold}40`} stroke={C.gold} strokeWidth="1.5" />
          {/* windows lit */}
          {[60, 80, 110, 130, 152, 162, 174, 270, 290, 310, 350, 370].map((x, i) => (
            <rect key={i} x={x} y={170 + (i % 3) * 12} width="6" height="6" fill={dim ? `${C.gold}40` : C.gold} />
          ))}
          {/* one dim cellar window (below ground) */}
          <rect x="280" y="240" width="40" height="36" fill={`${C.midnight}`} stroke={C.coral} strokeWidth={dim ? 2.5 : 1} />
          <rect x="290" y="252" width="20" height="20" fill={`${C.coral}30`} stroke={`${C.coral}50`} strokeWidth="0.8" />
          {dim && (
            <text x="300" y="290" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="9" fill={C.coral} fontStyle="italic">the child</text>
          )}
        </g>
      }
      actors={
        <g>
          {/* one figure walking out of city */}
          {walking && (
            <g transform="translate(540 200)">
              <circle cx="0" cy="-8" r="6" fill="none" stroke={C.gold} strokeWidth="1.5" />
              <line x1="0" y1="-2" x2="0" y2="14" stroke={C.gold} strokeWidth="1.5" />
              <line x1="-4" y1="6" x2="4" y2="6" stroke={C.gold} strokeWidth="1.5" />
              <line x1="0" y1="14" x2="-4" y2="22" stroke={C.gold} strokeWidth="1.5" />
              <line x1="0" y1="14" x2="4" y2="22" stroke={C.gold} strokeWidth="1.5" />
              <text x="0" y="38" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="9" fill={C.gold} fontStyle="italic">walks away</text>
            </g>
          )}
        </g>
      }
    />
  );
}
