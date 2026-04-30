// Shared building blocks for thought-experiment SVG scenes.
// All scenes follow these conventions:
//   - viewBox: 0 0 600 320 (default) or 0 0 600 240 for "compact"
//   - Component takes { stage, chose, mode } and renders a responsive <svg>
//   - mode "kid" → larger figures, brighter palette
//   - mode "story" / "canon" → more compact, more textural detail
import { C } from "../theme.js";

export function SceneFrame({ children, ariaLabel, h = 320, max = 560, padded = true }) {
  return (
    <svg
      viewBox={`0 0 600 ${h}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={ariaLabel}
      style={{
        width: "100%",
        maxWidth: max,
        height: "auto",
        maxHeight: 320,
        display: "block",
        margin: padded ? "0 auto 20px" : "0 auto",
        borderRadius: 14,
      }}
    >
      <defs>
        <radialGradient id="vignette" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.35" />
        </radialGradient>
      </defs>
      <rect width="600" height={h} rx="14" fill={C.bg} />
      <rect width="600" height={h} rx="14" fill="url(#vignette)" />
      {children}
    </svg>
  );
}

// CharacterScene — a single creature/object center stage with a soft halo
// Used by character-family scenes (Magic Toy, Robot Pet, Invisible Ring, etc.)
export function CharacterScene({ ariaLabel, halo = C.gold, body, label, sublabel, mood = "neutral", stage = 0 }) {
  const moodColor = mood === "sad" ? C.coral : mood === "happy" ? C.teal : C.gold;
  return (
    <SceneFrame ariaLabel={ariaLabel}>
      {/* Floor shadow */}
      <ellipse cx="300" cy="270" rx="120" ry="14" fill="#000" opacity="0.35" />
      {/* Halo */}
      <circle cx="300" cy="160" r="120" fill={`${halo}10`}>
        <animate attributeName="r" values="118;124;118" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle cx="300" cy="160" r="92" fill={`${halo}18`} />
      {/* Body */}
      <g transform="translate(300 160)">{body}</g>
      {/* Mood indicator (subtle ring) */}
      <circle cx="300" cy="160" r="100" fill="none" stroke={moodColor} strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray={mood === "neutral" ? "2 4" : ""} />
      {/* Label */}
      {label && <text x="300" y="298" textAnchor="middle" fontFamily="'Source Serif 4', Georgia, serif" fontSize="14" fontWeight="700" fill={C.textPrimary}>{label}</text>}
      {sublabel && <text x="300" y="312" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="10" fill={C.textMuted} fontStyle="italic">{sublabel}</text>}
    </SceneFrame>
  );
}

// HorizontalStage — a wide scene with foreground actors moving along a track/road/path
// Used by stage-family scenes (Trolley, Plato's Cave, Drowning Child, etc.)
export function HorizontalStage({ ariaLabel, sky, ground, actors, caption }) {
  return (
    <SceneFrame ariaLabel={ariaLabel}>
      {/* Sky/back */}
      {sky}
      {/* Ground */}
      <rect x="0" y="220" width="600" height="100" fill={C.midnight} opacity="0.55" />
      <line x1="0" y1="220" x2="600" y2="220" stroke={C.border} strokeWidth="1" />
      {ground}
      {actors}
      {caption && <text x="300" y="302" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="10" fill={C.textMuted} fontStyle="italic">{caption}</text>}
    </SceneFrame>
  );
}

// ContainerScene — a bounded volume with internal contents that change over stages
// Used by Mary's Room, Chinese Room, Brain in Vat, AI in Box, Ship of Theseus, etc.
export function ContainerScene({ ariaLabel, boundary, interior, exterior, label, sublabel }) {
  return (
    <SceneFrame ariaLabel={ariaLabel}>
      {exterior}
      {boundary || (
        <rect x="120" y="60" width="360" height="200" rx="12" fill={`${C.surface}`} stroke={C.border} strokeWidth="2" />
      )}
      <g>{interior}</g>
      {label && <text x="300" y="298" textAnchor="middle" fontFamily="'Source Serif 4', Georgia, serif" fontSize="14" fontWeight="700" fill={C.textPrimary}>{label}</text>}
      {sublabel && <text x="300" y="312" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="10" fill={C.textMuted} fontStyle="italic">{sublabel}</text>}
    </SceneFrame>
  );
}

// PatternScene — abstract geometry that evolves
// Used by Liar, Sorites, Simulation, Veil of Ignorance, Paperclip Maximizer
export function PatternScene({ ariaLabel, pattern, label, sublabel }) {
  return (
    <SceneFrame ariaLabel={ariaLabel}>
      <g>{pattern}</g>
      {label && <text x="300" y="298" textAnchor="middle" fontFamily="'Source Serif 4', Georgia, serif" fontSize="14" fontWeight="700" fill={C.textPrimary}>{label}</text>}
      {sublabel && <text x="300" y="312" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="10" fill={C.textMuted} fontStyle="italic">{sublabel}</text>}
    </SceneFrame>
  );
}

// Common atoms ───────────────────────────────────────────────────────

export function Stickfigure({ x, y, scale = 1, color = C.textSecondary, child = false }) {
  const r = (child ? 6 : 7) * scale;
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle cx="0" cy="0" r={r} fill="none" stroke={color} strokeWidth="1.6" />
      <line x1="0" y1={r} x2="0" y2={r + 18} stroke={color} strokeWidth="1.6" />
      <line x1={-r} y1={r + 7} x2={r} y2={r + 7} stroke={color} strokeWidth="1.6" />
      <line x1="0" y1={r + 18} x2={-r} y2={r + 28} stroke={color} strokeWidth="1.6" />
      <line x1="0" y1={r + 18} x2={r} y2={r + 28} stroke={color} strokeWidth="1.6" />
    </g>
  );
}

export function FaceMood({ cx, cy, r = 16, mood = "neutral", color = C.textPrimary }) {
  const eyeY = cy - 4;
  return (
    <g>
      <circle cx={cx - 5} cy={eyeY} r="1.6" fill={color} />
      <circle cx={cx + 5} cy={eyeY} r="1.6" fill={color} />
      {mood === "happy" && <path d={`M ${cx - 6} ${cy + 3} Q ${cx} ${cy + 9} ${cx + 6} ${cy + 3}`} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />}
      {mood === "sad" && <path d={`M ${cx - 6} ${cy + 7} Q ${cx} ${cy + 1} ${cx + 6} ${cy + 7}`} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />}
      {mood === "neutral" && <line x1={cx - 5} y1={cy + 4} x2={cx + 5} y2={cy + 4} stroke={color} strokeWidth="1.5" strokeLinecap="round" />}
      {mood === "thoughtful" && <path d={`M ${cx - 5} ${cy + 4} Q ${cx} ${cy + 2} ${cx + 5} ${cy + 4}`} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />}
    </g>
  );
}

export function Sparkle({ x, y, size = 6, color = C.gold, delay = 0 }) {
  return (
    <g transform={`translate(${x} ${y})`} opacity="0.9">
      <line x1={-size} y1="0" x2={size} y2="0" stroke={color} strokeWidth="1.4" strokeLinecap="round">
        <animate attributeName="opacity" values="0;1;0" dur="2s" begin={`${delay}s`} repeatCount="indefinite" />
      </line>
      <line x1="0" y1={-size} x2="0" y2={size} stroke={color} strokeWidth="1.4" strokeLinecap="round">
        <animate attributeName="opacity" values="0;1;0" dur="2s" begin={`${delay}s`} repeatCount="indefinite" />
      </line>
    </g>
  );
}

// Pulse: a slowly pulsing colored dot
export function Pulse({ cx, cy, r = 4, color = C.gold, dur = "2.4s" }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={color}>
        <animate attributeName="opacity" values="0.3;1;0.3" dur={dur} repeatCount="indefinite" />
      </circle>
      <circle cx={cx} cy={cy} r={r * 1.6} fill="none" stroke={color} strokeWidth="1">
        <animate attributeName="r" values={`${r * 1.6};${r * 3};${r * 1.6}`} dur={dur} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0;0.6" dur={dur} repeatCount="indefinite" />
      </circle>
    </g>
  );
}
