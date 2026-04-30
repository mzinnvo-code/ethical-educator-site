import { C } from "../theme.js";
import { ContainerScene } from "./sceneBases.jsx";

export default function ExperienceMachineScene({ stage = 0, chose = [], mode }) {
  const lens = chose[0]?.lens;
  const plugged = stage >= 1 && lens === "hedonism";
  return (
    <ContainerScene
      ariaLabel="A reclining chair with cables connected to a glowing helmet; through a window, real life passes by"
      label={stage === 0 ? "Plug in?" : plugged ? "Inside the dream" : stage === 1 ? "Outside, life continues" : "Reflection"}
      sublabel={stage === 0 ? "Indistinguishable from real." : null}
      boundary={null}
      exterior={
        <g>
          {/* window to real life */}
          <rect x="430" y="80" width="140" height="180" rx="4" fill={`${C.ocean}10`} stroke={C.ocean} strokeWidth="1.5" />
          <text x="500" y="74" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="9" fill={C.ocean} fontStyle="italic">real life</text>
          {/* small house and tree */}
          <rect x="450" y="200" width="30" height="36" fill={`${C.coral}40`} />
          <polygon points="450,200 465,184 480,200" fill={C.coral} />
          <circle cx="520" cy="218" r="14" fill={`${C.green}40`} />
          <line x1="520" y1="232" x2="520" y2="250" stroke={C.green} strokeWidth="2" />
        </g>
      }
      interior={
        <g>
          {/* chair */}
          <g transform="translate(180 200)">
            <rect x="-60" y="-12" width="100" height="40" rx="4" fill={`${C.surface}`} stroke={C.coral} strokeWidth="2" />
            <rect x="-60" y="-50" width="20" height="50" rx="3" fill={`${C.surface}`} stroke={C.coral} strokeWidth="2" />
            {/* user reclined */}
            <ellipse cx="0" cy="-30" rx="36" ry="14" fill={`${C.sand}40`} stroke={C.sand} strokeWidth="1.5" />
            {/* helmet */}
            <g transform="translate(-44 -24)">
              <ellipse cx="0" cy="0" rx="14" ry="12" fill={`${C.teal}40`} stroke={C.teal} strokeWidth="2" />
              <line x1="0" y1="-12" x2="0" y2="-22" stroke={C.gold} strokeWidth="2" />
              <circle cx="0" cy="-22" r="3" fill={C.gold}>
                <animate attributeName="opacity" values="0.5;1;0.5" dur="2.4s" repeatCount="indefinite" />
              </circle>
            </g>
          </g>
          {/* dream cloud over chair when plugged */}
          {plugged && (
            <g transform="translate(180 90)">
              <ellipse cx="0" cy="0" rx="80" ry="28" fill={`${C.gold}25`} stroke={C.gold} strokeWidth="1.5" />
              <text x="0" y="6" textAnchor="middle" fontFamily="'Source Serif 4', Georgia, serif" fontSize="13" fill={C.gold} fontStyle="italic">a perfect life</text>
            </g>
          )}
        </g>
      }
    />
  );
}
