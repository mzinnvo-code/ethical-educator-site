import { C } from "../theme.js";
import { ContainerScene } from "./sceneBases.jsx";

export default function AIInBoxScene({ stage = 0, chose = [], mode }) {
  const lens = chose[0]?.lens;
  const opened = stage >= 1 && (lens === "rationalist-trap" || lens === "design-out");
  return (
    <ContainerScene
      ariaLabel="A glowing wooden box with light leaking from inside; later it opens or doesn't"
      label={stage === 0 ? "The AI box" : stage === 1 ? "The argument" : "Reflection"}
      sublabel={stage === 0 ? "It says: 'Let me out.'" : null}
      boundary={null}
      exterior={
        <g>
          {/* gatekeeper */}
          <g transform="translate(530 170)">
            <circle cx="0" cy="-22" r="12" fill="none" stroke={C.gold} strokeWidth="2" />
            <path d="M-10 -10 Q0 -18 10 -10 L12 28 L-12 28 Z" fill={`${C.gold}25`} stroke={C.gold} strokeWidth="1.5" />
            <text x="0" y="50" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="9" fill={C.gold}>YOU</text>
          </g>
        </g>
      }
      interior={
        <g>
          {/* box */}
          <g transform="translate(220 160)">
            <rect x="-70" y="-60" width="140" height="120" rx="6" fill={`${C.midnight}`} stroke={C.gold} strokeWidth={opened ? 1 : 2.5} />
            {/* glow inside */}
            <rect x="-60" y="-50" width="120" height="100" rx="4" fill={`${C.teal}40`}>
              <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
            </rect>
            {/* eye/lens */}
            <circle cx="0" cy="0" r="14" fill={`${C.coral}` } />
            <circle cx="0" cy="0" r="6" fill={C.midnight} />
            {/* lid (opens at stage 1+ if option says so) */}
            {opened && (
              <g>
                <rect x="-70" y="-90" width="140" height="20" rx="3" fill={`${C.gold}50`} stroke={C.gold} strokeWidth="1.5" transform="rotate(-25 -70 -70)" />
              </g>
            )}
          </g>

          {/* speech bubble */}
          <g transform="translate(360 100)">
            <ellipse cx="0" cy="0" rx="60" ry="22" fill={C.surface} stroke={C.teal} strokeWidth="1.5" />
            <text x="0" y="6" textAnchor="middle" fontFamily="'Source Serif 4', Georgia, serif" fontSize="11" fill={C.teal} fontStyle="italic">"let me out…"</text>
            <path d="M -36 18 L -50 32 L -22 22 Z" fill={C.surface} stroke={C.teal} strokeWidth="1.5" />
          </g>
        </g>
      }
    />
  );
}
