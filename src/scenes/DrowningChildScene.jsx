import { C } from "../theme.js";
import { HorizontalStage, Stickfigure } from "./sceneBases.jsx";

export default function DrowningChildScene({ stage = 0, chose = [], mode }) {
  const lens = chose[0]?.lens;
  const distant = stage >= 1;
  return (
    <HorizontalStage
      ariaLabel="A small child in a shallow pond on the left; later a globe with a faraway child on the right"
      caption={stage === 0 ? "Stage 1 · The pond" : stage === 1 ? "Stage 2 · The world" : "Reflection"}
      sky={null}
      ground={
        <g>
          {/* pond on left */}
          <ellipse cx="160" cy="240" rx="120" ry="22" fill={`${C.ocean}50`} stroke={C.ocean} strokeWidth="2" />
          <ellipse cx="160" cy="234" rx="100" ry="14" fill={`${C.ocean}30`} />
          {/* shoes on pond edge */}
          <ellipse cx="50" cy="252" rx="14" ry="5" fill={C.coral} />
          <ellipse cx="78" cy="252" rx="14" ry="5" fill={C.coral} />

          {/* globe on right */}
          {distant && (
            <g transform="translate(460 200)">
              <circle cx="0" cy="0" r="46" fill={`${C.teal}20`} stroke={C.teal} strokeWidth="2" />
              <path d="M -42 -12 Q -10 -32 14 -8 Q 30 0 42 -10" fill="none" stroke={C.teal} strokeWidth="1.5" />
              <path d="M -38 16 Q -4 -2 32 22 Q 38 14 42 14" fill="none" stroke={C.teal} strokeWidth="1.5" />
              <ellipse cx="0" cy="0" rx="46" ry="14" fill="none" stroke={`${C.teal}40`} strokeWidth="1" />
              {/* child icon on globe */}
              <circle cx="22" cy="-4" r="3" fill={C.coral} />
            </g>
          )}
        </g>
      }
      actors={
        <g>
          {/* drowning child */}
          <g transform="translate(160 220)">
            <circle cx="0" cy="0" r="8" fill="none" stroke={C.coral} strokeWidth="2" />
            <line x1="-12" y1="6" x2="12" y2="6" stroke={C.coral} strokeWidth="2" />
            <text x="0" y="-18" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="11" fill={C.coral} fontWeight="700">!</text>
          </g>
          {/* you */}
          <Stickfigure x={70} y={210} scale={1} color={C.gold} />
          <text x="70" y="266" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="9" fill={C.gold}>YOU</text>

          {/* dotted "$200" in stage 1 */}
          {distant && (
            <g transform="translate(360 130)">
              <text x="0" y="0" fontFamily="'Source Serif 4', Georgia, serif" fontSize="14" fontWeight="700" fill={C.gold}>$200</text>
              <text x="0" y="14" fontFamily="'DM Sans', sans-serif" fontSize="9" fill={C.textMuted} fontStyle="italic">same money</text>
            </g>
          )}
        </g>
      }
    />
  );
}
