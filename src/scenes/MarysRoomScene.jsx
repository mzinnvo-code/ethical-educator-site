import { C } from "../theme.js";
import { ContainerScene } from "./sceneBases.jsx";

// Stages:
// 0 setup        — fully grayscale room with Mary inside, books, monochrome
// 1 canonical    — door begins to open; a hint of color leaks in
// 2 remix        — Mary reads a "poetic description" — color stays out
// 3 synthesis    — full color floods in
export default function MarysRoomScene({ stage = 0, chose = [], mode }) {
  // open: 0 = closed, 1 = ajar, 2 = wide open
  const colorBleed = stage === 0 ? 0 : stage === 1 ? 0.6 : stage === 2 ? 0.2 : 1;

  return (
    <ContainerScene
      ariaLabel="A grayscale room with Mary inside; color floods in as the door opens"
      label={stage === 3 ? "She sees red." : "Mary's room"}
      sublabel={stage === 0 ? "All she's known is black-and-white." : stage === 2 ? "She reads a poem about red." : null}
      exterior={
        <g>
          {/* sun behind room */}
          <circle cx="500" cy="120" r="44" fill={`rgba(200,152,48,${0.15 + colorBleed * 0.5})`} />
          <circle cx="500" cy="120" r="28" fill={`rgba(224,184,72,${0.5 + colorBleed * 0.5})`} />
          {/* color rays */}
          {[
            ["#ff6b6b", -30],
            ["#ffd166", 0],
            ["#06d6a0", 30],
            ["#118ab2", 60],
          ].map(([col, ang], i) => (
            <line key={i}
              x1="500" y1="120"
              x2={500 + 80 * Math.cos((ang * Math.PI) / 180)}
              y2={120 + 80 * Math.sin((ang * Math.PI) / 180)}
              stroke={col} strokeWidth="3" opacity={colorBleed * 0.85}
            />
          ))}
        </g>
      }
      boundary={
        <g>
          {/* room walls */}
          <rect x="80" y="60" width="380" height="200" rx="6" fill={`${C.surface}`} stroke={C.border} strokeWidth="2" />
          {/* floor stripe */}
          <line x1="80" y1="220" x2="460" y2="220" stroke={C.border} strokeWidth="1" />
          {/* door */}
          <g transform={`translate(440 60) skewY(${stage >= 1 ? -8 : 0})`}>
            <rect x="0" y="0" width="40" height="200" rx="2" fill={C.surface} stroke={C.gold} strokeWidth="2" />
            {/* door knob */}
            <circle cx="6" cy="160" r="2.5" fill={C.gold} />
          </g>
          {/* color spill through door */}
          {colorBleed > 0 && (
            <g opacity={colorBleed}>
              <path d="M 460 60 L 460 260 L 380 220 L 380 100 Z" fill="url(#colorSpill)" />
              <defs>
                <linearGradient id="colorSpill" x1="0" x2="1" y1="0.5" y2="0.5">
                  <stop offset="0%" stopColor="#ffd166" stopOpacity="0.4" />
                  <stop offset="60%" stopColor="#ffd166" stopOpacity="0" />
                </linearGradient>
              </defs>
            </g>
          )}
        </g>
      }
      interior={
        <g>
          {/* desk + book */}
          <rect x="120" y="180" width="64" height="40" rx="2" fill={`${C.midnight}`} stroke={C.textMuted} strokeWidth="1" />
          <rect x="130" y="170" width="44" height="14" rx="1" fill={C.textMuted} opacity="0.4" />
          {/* shelves of grayscale books */}
          {[0, 1, 2].map(row => (
            <g key={row}>
              {[0, 1, 2, 3, 4, 5].map(col => (
                <rect key={col}
                  x={210 + col * 14} y={90 + row * 24}
                  width="10" height="20" rx="1"
                  fill={col % 2 === 0 ? C.textMuted : C.surface}
                  stroke={C.border} strokeWidth="0.5"
                />
              ))}
              <line x1="208" y1={112 + row * 24} x2="298" y2={112 + row * 24} stroke={C.border} strokeWidth="1" />
            </g>
          ))}

          {/* Mary — silhouette */}
          <g transform={`translate(160 140)`}>
            <circle cx="0" cy="-22" r="12" fill={C.textSecondary} stroke={C.textMuted} strokeWidth="1.5" />
            <path d="M-14 -10 Q0 -22 14 -10 L18 38 L-18 38 Z" fill={C.textSecondary} opacity="0.85" />
            {/* eyes wide open with color in stage 3 */}
            {stage === 3 && (
              <>
                <circle cx="-3" cy="-22" r="2" fill="#ffd166" />
                <circle cx="3" cy="-22" r="2" fill="#ffd166" />
              </>
            )}
          </g>

          {/* poetic description book in stage 2 */}
          {stage === 2 && (
            <g transform="translate(140 175)">
              <rect x="0" y="0" width="36" height="22" rx="1" fill={C.surface} stroke={C.gold} strokeWidth="1.5" />
              <line x1="4" y1="6" x2="32" y2="6" stroke={C.gold} strokeWidth="0.6" />
              <line x1="4" y1="11" x2="28" y2="11" stroke={C.gold} strokeWidth="0.6" />
              <line x1="4" y1="16" x2="30" y2="16" stroke={C.gold} strokeWidth="0.6" />
              <text x="18" y="34" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="7" fill={C.gold} fontStyle="italic">a poem</text>
            </g>
          )}

          {/* "?" thought bubble in stage 0 */}
          {stage === 0 && (
            <g transform="translate(190 110)">
              <circle cx="0" cy="0" r="14" fill={C.surface} stroke={C.textMuted} strokeWidth="1" />
              <text x="0" y="4" textAnchor="middle" fontFamily="'Source Serif 4', Georgia, serif" fontSize="14" fontWeight="700" fill={C.textMuted}>?</text>
            </g>
          )}
        </g>
      }
    />
  );
}
