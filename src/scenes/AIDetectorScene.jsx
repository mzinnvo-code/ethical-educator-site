import { C } from "../theme.js";
import { ContainerScene } from "./sceneBases.jsx";

export default function AIDetectorScene({ stage = 0, chose = [], mode }) {
  const lens = chose[0]?.lens;
  return (
    <ContainerScene
      ariaLabel="An essay with a percentage gauge labeling it 92% AI; a student in tears beside it"
      label={stage === 0 ? "92% AI?" : stage === 1 ? "Whose word?" : "Reflection"}
      sublabel={stage === 0 ? "The detector says so. The student denies it." : null}
      boundary={null}
      exterior={null}
      interior={
        <g>
          {/* essay */}
          <g transform="translate(180 170)">
            <rect x="-60" y="-80" width="120" height="160" rx="4" fill={`${C.gold}10`} stroke={C.gold} strokeWidth="2" />
            {[-60, -48, -36, -24, -12, 0, 12, 24, 36, 48, 60].map((y, i) => (
              <line key={y} x1="-50" y1={y} x2={i === 10 ? 30 : 50} y2={y} stroke={`${C.gold}50`} strokeWidth="0.7" />
            ))}
            {/* big % */}
            <text x="0" y="-92" textAnchor="middle" fontFamily="'Source Serif 4', Georgia, serif" fontSize="20" fontWeight="700" fill={C.coral}>92%</text>
            <text x="0" y="-78" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="9" fill={C.coral}>AI-likely</text>
          </g>

          {/* gauge */}
          <g transform="translate(380 130)">
            <path d="M -60 0 A 60 60 0 0 1 60 0" fill="none" stroke={`${C.midnight}80`} strokeWidth="14" strokeLinecap="round" />
            <path d="M -60 0 A 60 60 0 0 1 60 0" fill="none" stroke={C.coral} strokeWidth="14" strokeDasharray="180 360" strokeLinecap="round" />
            <text x="0" y="-22" textAnchor="middle" fontFamily="'Source Serif 4', Georgia, serif" fontSize="22" fontWeight="700" fill={C.coral}>92%</text>
            <text x="0" y="-2" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="9" fill={C.textMuted}>"AI written"</text>
            {/* error band */}
            {stage >= 1 && (
              <text x="0" y="32" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="9" fill={C.gold} fontStyle="italic">±5–7% false positive</text>
            )}
          </g>

          {/* tearful student */}
          {stage >= 1 && (
            <g transform="translate(490 220)">
              <circle cx="0" cy="0" r="14" fill="none" stroke={C.coral} strokeWidth="2" />
              <circle cx="-3" cy="-2" r="1.5" fill={C.coral} />
              <circle cx="3" cy="-2" r="1.5" fill={C.coral} />
              <line x1="-3" y1="6" x2="-5" y2="14" stroke={C.coral} strokeWidth="1.5" strokeLinecap="round" />
              <path d="M -5 6 Q 0 4 5 6" fill="none" stroke={C.coral} strokeWidth="1.4" />
              <path d="M-12 12 Q0 6 12 12 L14 50 L-14 50 Z" fill={`${C.coral}25`} stroke={C.coral} strokeWidth="1.5" />
            </g>
          )}
        </g>
      }
    />
  );
}
