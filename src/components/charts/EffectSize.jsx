import { C } from "../../theme.js";

/**
 * <EffectSize> — visualizes a Cohen's d / standardized mean difference (SMD)
 * on the canonical scale (0.2 small, 0.5 medium, 0.8 large, 1.2 very large).
 * The value drops as a marker on the scale, with band labels and a citation.
 *
 * Usage:
 *   <EffectSize
 *     value={0.45}
 *     label="Generative AI in education (meta-analysis, 68 studies, 337 effect sizes)"
 *     citation="Educational Research Review (2025)"
 *     accent={C.teal}
 *   />
 *
 * Why this exists: educators are often handed a number like "SMD = 0.45" and
 * left to look up what it means. Showing it on the canonical scale makes the
 * meaning visible without a paragraph of explanation.
 */
const BANDS = [
  { upper: 0.2, label: "Negligible", color: "#90a0b0" },
  { upper: 0.5, label: "Small", color: "#8a9aac" },
  { upper: 0.8, label: "Medium", color: "#c89830" },
  { upper: 1.2, label: "Large", color: "#1a8a7a" },
  { upper: 2.0, label: "Very large", color: "#1a5a8a" },
];

const SCALE_MAX = 2.0;

export default function EffectSize({
  value,
  label,
  citation,
  accent = C.teal,
}) {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  const v = Math.max(0, Math.min(SCALE_MAX, value));

  const innerW = 560;
  const innerH = 160;
  const padX = 16;
  const scaleY = 78;
  const trackH = 14;
  const trackW = innerW - padX * 2;

  const valueX = padX + (v / SCALE_MAX) * trackW;
  const titleId = `effect-size-t`;
  const descId = `effect-size-d`;

  return (
    <figure style={{ margin: "16px 0" }}>
      <svg
        role="img"
        viewBox={`0 0 ${innerW} ${innerH}`}
        aria-labelledby={`${titleId} ${descId}`}
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        <title id={titleId}>Effect size: {value.toFixed(2)} ({bandFor(v).label})</title>
        <desc id={descId}>{label || "Effect size on Cohen's d scale."} {citation || ""}</desc>

        {label && (
          <text
            x={padX}
            y={22}
            fill={C.textPrimary}
            fontFamily="'Source Serif 4', Georgia, serif"
            fontSize="13"
            fontWeight="600"
          >{truncate(label, 80)}</text>
        )}

        {/* Bands */}
        {BANDS.map((band, i) => {
          const prevUpper = i === 0 ? 0 : BANDS[i - 1].upper;
          const x = padX + (prevUpper / SCALE_MAX) * trackW;
          const w = ((band.upper - prevUpper) / SCALE_MAX) * trackW;
          return (
            <g key={band.label}>
              <rect
                x={x}
                y={scaleY}
                width={w}
                height={trackH}
                fill={band.color}
                opacity={0.35}
              />
              <text
                x={x + w / 2}
                y={scaleY + trackH + 14}
                fill={C.textMuted}
                fontFamily="'DM Sans', sans-serif"
                fontSize="10"
                textAnchor="middle"
              >{band.label}</text>
              <text
                x={x + w / 2}
                y={scaleY - 6}
                fill={C.textMuted}
                fontFamily="'JetBrains Mono', monospace"
                fontSize="9"
                textAnchor="middle"
              >{`≤${band.upper}`}</text>
            </g>
          );
        })}

        {/* Marker — vertical line + dot + value label */}
        <line
          x1={valueX}
          x2={valueX}
          y1={scaleY - 8}
          y2={scaleY + trackH + 8}
          stroke={accent}
          strokeWidth="2"
        />
        <circle
          cx={valueX}
          cy={scaleY + trackH / 2}
          r={7}
          fill={accent}
          stroke={C.bg}
          strokeWidth="2"
        />
        <text
          x={valueX}
          y={scaleY + trackH + 36}
          fill={accent}
          fontFamily="'JetBrains Mono', monospace"
          fontSize="13"
          fontWeight="700"
          textAnchor="middle"
        >{value.toFixed(2)}</text>
        <text
          x={valueX}
          y={scaleY + trackH + 50}
          fill={C.textSecondary}
          fontFamily="'DM Sans', sans-serif"
          fontSize="10"
          textAnchor="middle"
        >{bandFor(v).label} effect</text>

        {citation && (
          <text
            x={padX}
            y={innerH - 10}
            fill={C.textMuted}
            fontFamily="'DM Sans', sans-serif"
            fontSize="10"
            fontStyle="italic"
          >Source: {truncate(citation, 100)}</text>
        )}
      </svg>
    </figure>
  );
}

function bandFor(v) {
  for (const band of BANDS) {
    if (v <= band.upper) return band;
  }
  return BANDS[BANDS.length - 1];
}

function truncate(s, n) {
  if (!s) return "";
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}
