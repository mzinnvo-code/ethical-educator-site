import { C } from "../theme.js";
import { ContainerScene } from "./sceneBases.jsx";

export default function ShipOfTheseusScene({ stage = 0, chose = [], mode }) {
  // Stage 0: original. Stage 1: half replaced. Stage 2: all replaced. Stage 3: synthesis.
  const replacedCount = stage === 0 ? 0 : stage === 1 ? 5 : stage === 2 ? 10 : 10;
  const lens = chose[0]?.lens;
  return (
    <ContainerScene
      ariaLabel="A small ship with planks; over stages, original planks are replaced with new ones"
      label={stage === 0 ? "The original" : stage === 2 ? "All planks new" : "Halfway"}
      sublabel={stage === 1 ? "Five planks replaced." : stage === 2 ? "None of the original wood remains." : null}
      boundary={null}
      exterior={
        <g>
          {/* sea */}
          <rect x="0" y="220" width="600" height="60" fill={`${C.ocean}30`} />
          <line x1="0" y1="220" x2="600" y2="220" stroke={C.ocean} strokeWidth="1" />
        </g>
      }
      interior={
        <g>
          {/* ship hull */}
          <g transform="translate(300 180)">
            {/* hull base */}
            <path d="M -120 0 L 120 0 L 80 30 L -80 30 Z" fill={C.midnight} stroke={C.sand} strokeWidth="2" />
            {/* planks */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => {
              const replaced = i < replacedCount;
              const color = replaced ? C.gold : C.coral;
              return (
                <rect key={i}
                  x={-110 + i * 22} y="-30"
                  width="20" height="30" rx="1"
                  fill={`${color}40`} stroke={color} strokeWidth="1.5" />
              );
            })}
            {/* mast */}
            <line x1="0" y1="-30" x2="0" y2="-90" stroke={C.sand} strokeWidth="2" />
            <path d="M 0 -84 L 40 -60 L 0 -50 Z" fill={`${C.sand}40`} stroke={C.sand} strokeWidth="1.5" />
          </g>

          {/* synthesis: side by side ship vs. reassembled originals */}
          {stage === 3 && (
            <g transform="translate(0 60)">
              {/* original-planks ship */}
              <g transform="translate(150 0)" opacity="0.7">
                <path d="M -50 0 L 50 0 L 36 14 L -36 14 Z" fill={`${C.coral}25`} stroke={C.coral} strokeWidth="1.5" />
                <text x="0" y="32" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="10" fill={C.coral}>same atoms, reassembled</text>
              </g>
              <text x="300" y="10" textAnchor="middle" fontFamily="'Source Serif 4', Georgia, serif" fontSize="14" fontWeight="700" fill={C.gold}>vs.</text>
              <g transform="translate(450 0)" opacity="0.7">
                <path d="M -50 0 L 50 0 L 36 14 L -36 14 Z" fill={`${C.gold}25`} stroke={C.gold} strokeWidth="1.5" />
                <text x="0" y="32" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="10" fill={C.gold}>continuous, all new</text>
              </g>
            </g>
          )}
        </g>
      }
    />
  );
}
