import { C } from "../../theme.js";

/**
 * <Bars> — horizontal bar chart, no library. SVG. Accessible.
 *
 * Each row is a labeled bar; values are interpreted as percentages of a
 * shared max (defaults to 100 — i.e., values are already on a 0–100 scale).
 *
 * Usage:
 *   <Bars
 *     title="AI adoption in K–12, 2024–25"
 *     description="Center for Democracy and Technology, October 2025."
 *     items={[
 *       { label: "Teachers using AI", value: 85, accent: C.gold },
 *       { label: "Students using AI", value: 86, accent: C.teal },
 *     ]}
 *     unit="%"
 *   />
 */
export default function Bars({
  title,
  description,
  items,
  unit = "",
  max = 100,
  rowHeight = 32,
  labelWidth = 200,
  trackColor,
  fillColor = C.gold,
  showValueLabels = true,
}) {
  if (!items?.length) return null;
  const barH = 14;
  const padTop = title ? 36 : 8;
  const padBottom = description ? 30 : 8;
  const padX = 14;
  const trackBg = trackColor || `${C.border}`;
  const innerW = 560; // viewBox width; SVG scales to container
  const trackW = innerW - labelWidth - padX * 2 - (showValueLabels ? 60 : 0);
  const totalH = padTop + rowHeight * items.length + padBottom;

  const titleId = title ? `chart-${slug(title)}-t` : undefined;
  const descId = description ? `chart-${slug(title || items.map(i => i.label).join("-"))}-d` : undefined;

  return (
    <figure style={{ margin: "16px 0" }}>
      <svg
        role="img"
        viewBox={`0 0 ${innerW} ${totalH}`}
        aria-labelledby={[titleId, descId].filter(Boolean).join(" ") || undefined}
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        {title && <title id={titleId}>{title}</title>}
        {description && <desc id={descId}>{description}</desc>}

        {title && (
          <text
            x={padX}
            y={22}
            fill={C.textPrimary}
            fontFamily="'Source Serif 4', Georgia, serif"
            fontSize="14"
            fontWeight="600"
          >{title}</text>
        )}

        {items.map((item, i) => {
          const y = padTop + i * rowHeight + (rowHeight - barH) / 2;
          const pct = Math.max(0, Math.min(1, item.value / max));
          const w = trackW * pct;
          const accent = item.accent || fillColor;
          const labelX = padX;
          const trackX = padX + labelWidth;
          const valueX = trackX + trackW + 8;
          return (
            <g key={`${item.label}-${i}`}>
              <text
                x={labelX}
                y={y + barH / 2 + 4}
                fill={C.textSecondary}
                fontFamily="'DM Sans', sans-serif"
                fontSize="12"
              >{truncate(item.label, 30)}</text>
              <rect
                x={trackX}
                y={y}
                width={trackW}
                height={barH}
                rx={3}
                fill={trackBg}
              />
              <rect
                x={trackX}
                y={y}
                width={w}
                height={barH}
                rx={3}
                fill={accent}
              />
              {showValueLabels && (
                <text
                  x={valueX}
                  y={y + barH / 2 + 4}
                  fill={accent}
                  fontFamily="'JetBrains Mono', monospace"
                  fontSize="11"
                  fontWeight="700"
                >{formatValue(item.value, unit)}</text>
              )}
            </g>
          );
        })}

        {description && (
          <text
            x={padX}
            y={totalH - 10}
            fill={C.textMuted}
            fontFamily="'DM Sans', sans-serif"
            fontSize="10"
            fontStyle="italic"
          >{truncate(description, 100)}</text>
        )}
      </svg>
    </figure>
  );
}

function slug(s) {
  return String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
}

function truncate(s, n) {
  if (!s) return "";
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}

function formatValue(v, unit) {
  if (typeof v !== "number" || !Number.isFinite(v)) return "";
  const rounded = Math.round(v * 10) / 10;
  const str = Number.isInteger(rounded) ? rounded.toString() : rounded.toFixed(1);
  return `${str}${unit}`;
}
