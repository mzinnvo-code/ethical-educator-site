import { C } from "../../theme.js";

// Code-drawn 16-bit UI primitives. Every "sprite" here is CSS/clip-path on an
// 8px grid — no raster assets — so panels stay crisp at any size.

// Two-step pixel corner, the classic SNES menu silhouette.
export const PIXEL_CLIP = "polygon(0 8px, 4px 8px, 4px 4px, 8px 4px, 8px 0, calc(100% - 8px) 0, calc(100% - 8px) 4px, calc(100% - 4px) 4px, calc(100% - 4px) 8px, 100% 8px, 100% calc(100% - 8px), calc(100% - 4px) calc(100% - 8px), calc(100% - 4px) calc(100% - 4px), calc(100% - 8px) calc(100% - 4px), calc(100% - 8px) 100%, 8px 100%, 8px calc(100% - 4px), 4px calc(100% - 4px), 4px calc(100% - 8px), 0 calc(100% - 8px))";

// Single-step corner for small chips and pills.
export const PIXEL_CLIP_SM = "polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))";

export const PIXEL_FONT = "'Pixelify Sans', 'DM Sans', sans-serif";

export function PixelFrame({
  accent = C.gold,
  bg = "linear-gradient(180deg, rgba(13,29,51,0.97), rgba(7,17,30,0.97))",
  glow = false,
  scanlines = false,
  small = false,
  className = "",
  style,
  innerStyle,
  children,
}) {
  const clip = small ? PIXEL_CLIP_SM : PIXEL_CLIP;
  return (
    <div
      className={`pixel-frame ${className}`}
      style={{
        filter: glow ? `drop-shadow(0 0 16px ${accent}2e)` : undefined,
        ...style,
      }}
    >
      <div
        style={{
          clipPath: clip,
          padding: small ? 2 : 3,
          background: `linear-gradient(180deg, ${accent}cc, ${accent}55 55%, rgba(8,12,20,0.9))`,
        }}
      >
        <div
          style={{
            clipPath: clip,
            position: "relative",
            background: bg,
            boxShadow: "inset 0 2px 0 rgba(255,255,255,0.05), inset 0 -3px 0 rgba(0,0,0,0.32)",
            ...innerStyle,
          }}
        >
          {scanlines && (
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(transparent 50%, rgba(255,255,255,0.025) 50%)",
                backgroundSize: "100% 4px",
                pointerEvents: "none",
                opacity: 0.4,
                zIndex: 1,
              }}
            />
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

export function PixelText({ as: Tag = "span", size = "0.78rem", color = C.textPrimary, style, children }) {
  return (
    <Tag
      style={{
        fontFamily: PIXEL_FONT,
        fontSize: size,
        fontWeight: 600,
        letterSpacing: "0.02em",
        color,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

export function PixelPill({ icon, label, value, color = C.gold, title }) {
  return (
    <span
      className="pixel-pill"
      title={title}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        clipPath: PIXEL_CLIP_SM,
        border: `2px solid ${color}66`,
        background: `linear-gradient(180deg, ${color}1c, rgba(6,14,26,0.85))`,
        padding: "4px 9px 4px 6px",
        whiteSpace: "nowrap",
      }}
    >
      {icon && (
        <img
          src={icon}
          alt=""
          aria-hidden="true"
          style={{ width: 22, height: 22, objectFit: "contain", imageRendering: "pixelated", filter: `drop-shadow(0 0 6px ${color}30)` }}
        />
      )}
      {label && (
        <PixelText size="0.6rem" color={color} style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>
          {label}
        </PixelText>
      )}
      <PixelText size="0.82rem" color={C.textPrimary}>{value}</PixelText>
    </span>
  );
}

// Segmented lights meter: one cell per goal. Falls back to a continuous
// stepped bar when there are too many goals to read as cells.
export function SegmentBar({ total, filled, color = C.gold, height = 14, ariaLabel }) {
  const safeTotal = Math.max(1, total || 0);
  const safeFilled = Math.max(0, Math.min(safeTotal, filled || 0));
  const asCells = safeTotal <= 32;
  return (
    <div
      role="img"
      aria-label={ariaLabel || `${safeFilled} of ${safeTotal} lights lit`}
      className="wonder-lights-bar"
      style={{
        clipPath: PIXEL_CLIP_SM,
        border: "2px solid rgba(255,255,255,0.14)",
        background: "rgba(4,10,20,0.85)",
        padding: 3,
      }}
    >
      {asCells ? (
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${safeTotal}, 1fr)`, gap: 2, height }}>
          {Array.from({ length: safeTotal }, (_, index) => {
            const lit = index < safeFilled;
            const isNewest = lit && index === safeFilled - 1;
            return (
              <span
                key={index}
                data-lit={lit ? "true" : "false"}
                className={isNewest ? "wonder-lights-cell wonder-lights-cell-newest" : "wonder-lights-cell"}
                style={{
                  background: lit
                    ? `linear-gradient(180deg, #ffe9a8, ${color})`
                    : "rgba(255,255,255,0.07)",
                  boxShadow: lit ? `0 0 8px ${color}66, inset 0 1px 0 rgba(255,255,255,0.5)` : "inset 0 1px 0 rgba(255,255,255,0.04)",
                }}
              />
            );
          })}
        </div>
      ) : (
        <div style={{ position: "relative", height, background: "rgba(255,255,255,0.07)" }}>
          <span
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: `${Math.round((safeFilled / safeTotal) * 100)}%`,
              background: `linear-gradient(180deg, #ffe9a8, ${color})`,
              boxShadow: `0 0 8px ${color}66`,
            }}
          />
        </div>
      )}
    </div>
  );
}
