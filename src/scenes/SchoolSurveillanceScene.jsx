import { C } from "../theme.js";
import { ContainerScene } from "./sceneBases.jsx";

export default function SchoolSurveillanceScene({ stage = 0, chose = [], mode }) {
  return (
    <ContainerScene
      ariaLabel="A row of student desks under a security camera; some screens are flagged"
      label={stage === 0 ? "Monitored" : stage === 1 ? "Flagged" : "Reflection"}
      sublabel={stage === 0 ? "Every message scanned for risk." : null}
      boundary={null}
      exterior={
        <g>
          {/* camera mounted on ceiling */}
          <g transform="translate(300 50)">
            <rect x="-12" y="0" width="24" height="14" rx="3" fill={C.midnight} stroke={C.coral} strokeWidth="2" />
            <circle cx="0" cy="14" r="6" fill={`${C.coral}50`} stroke={C.coral} strokeWidth="2" />
            <circle cx="0" cy="14" r="2" fill={C.coral}>
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
            </circle>
            {/* cone of vision */}
            <path d="M -6 18 L -120 240 L 120 240 L 6 18 Z" fill={`${C.coral}10`} stroke={C.coral} strokeWidth="0.5" strokeDasharray="3 3" opacity="0.5" />
          </g>
        </g>
      }
      interior={
        <g>
          {/* desks with screens */}
          {[0, 1, 2, 3, 4].map(i => {
            const x = 90 + i * 105;
            const flagged = stage >= 1 && i === 2;
            return (
              <g key={i} transform={`translate(${x} 200)`}>
                {/* desk */}
                <rect x="-30" y="0" width="60" height="6" fill={C.surface} stroke={C.gold} strokeWidth="1" />
                {/* screen */}
                <rect x="-22" y="-30" width="44" height="30" rx="2" fill={`${C.surface}`} stroke={flagged ? C.coral : C.teal} strokeWidth={flagged ? 2 : 1.2} />
                <line x1="-18" y1="-22" x2="14" y2="-22" stroke={flagged ? C.coral : C.teal} strokeWidth="0.6" />
                <line x1="-18" y1="-15" x2="10" y2="-15" stroke={flagged ? C.coral : C.teal} strokeWidth="0.6" />
                <line x1="-18" y1="-8" x2="6" y2="-8" stroke={flagged ? C.coral : C.teal} strokeWidth="0.6" />
                {flagged && (
                  <text x="0" y="-44" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="10" fontWeight="700" fill={C.coral}>⚠ FLAG</text>
                )}
              </g>
            );
          })}
        </g>
      }
    />
  );
}
