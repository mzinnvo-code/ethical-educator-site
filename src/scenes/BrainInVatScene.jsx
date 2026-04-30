import { C } from "../theme.js";
import { ContainerScene } from "./sceneBases.jsx";

export default function BrainInVatScene({ stage = 0, chose = [], mode }) {
  return (
    <ContainerScene
      ariaLabel="A brain suspended in a glass jar with cables connecting it to a large screen showing a normal scene"
      label={stage === 0 ? "The brain in the vat" : stage === 1 ? "The view from inside" : "Reflection"}
      sublabel={stage === 0 ? "Could you tell?" : null}
      boundary={null}
      exterior={
        <g>
          {/* screen showing simulated reality */}
          <g transform="translate(450 140)">
            <rect x="-90" y="-60" width="180" height="120" rx="4" fill={`${C.teal}15`} stroke={C.teal} strokeWidth="2" />
            <rect x="-90" y="-60" width="180" height="14" fill={`${C.teal}30`} />
            <text x="0" y="-50" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill={C.teal}>simulated reality</text>
            {/* a tiny scene */}
            <circle cx="-40" cy="0" r="10" fill={`${C.gold}50`} />
            <rect x="-20" y="-10" width="20" height="40" rx="2" fill={`${C.coral}40`} />
            <rect x="10" y="-20" width="30" height="50" rx="2" fill={`${C.sand}40`} />
            <line x1="-90" y1="30" x2="90" y2="30" stroke={C.teal} strokeWidth="1" />
          </g>
        </g>
      }
      interior={
        <g>
          {/* jar */}
          <g transform="translate(180 160)">
            {/* base */}
            <ellipse cx="0" cy="60" rx="60" ry="10" fill={C.midnight} />
            {/* glass cylinder */}
            <path d="M -54 -50 Q -60 -50 -60 -40 L -60 50 Q -60 60 -54 60 L 54 60 Q 60 60 60 50 L 60 -40 Q 60 -50 54 -50 Z"
              fill={`${C.ocean}25`} stroke={C.ocean} strokeWidth="2" />
            {/* glass top */}
            <ellipse cx="0" cy="-50" rx="54" ry="8" fill={`${C.ocean}40`} stroke={C.ocean} strokeWidth="1.5" />
            {/* fluid line */}
            <line x1="-54" y1="-30" x2="54" y2="-30" stroke={C.ocean} strokeWidth="1" opacity="0.5" />
            {/* brain */}
            <g transform="translate(0 5)">
              <ellipse cx="0" cy="0" rx="34" ry="26" fill={`${C.coral}50`} stroke={C.coral} strokeWidth="1.5" />
              <path d="M -28 -10 Q -16 -22 0 -16 Q 16 -22 28 -10" fill="none" stroke={C.coral} strokeWidth="1.5" />
              <path d="M -28 0 Q -16 8 0 0 Q 16 -6 28 0" fill="none" stroke={C.coral} strokeWidth="1.5" />
              <path d="M -22 12 Q -8 18 8 12 Q 18 8 22 14" fill="none" stroke={C.coral} strokeWidth="1.5" />
            </g>
            {/* cables */}
            <path d="M -10 -50 Q -10 -80 60 -100" fill="none" stroke={C.gold} strokeWidth="2" />
            <path d="M 10 -50 Q 10 -80 70 -110" fill="none" stroke={C.gold} strokeWidth="2" />
          </g>
          {/* connection arrow to screen */}
          <line x1="260" y1="100" x2="350" y2="100" stroke={C.gold} strokeWidth="1.2" strokeDasharray="4 3" />
          <polygon points="350,96 358,100 350,104" fill={C.gold} />
        </g>
      }
    />
  );
}
