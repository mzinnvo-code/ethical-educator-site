import { useEffect, useRef } from "react";
import { C } from "../../theme.js";
import { PixelText, PIXEL_CLIP, PIXEL_CLIP_SM, PIXEL_FONT } from "./PixelFrame.jsx";
import { computeInspectorPlacement } from "./workshopLayout.js";
import { TEAL_TEXT, textSafeAccent } from "./trackerThemes.js";

export { computeInspectorPlacement };

// Anchored popover that inspects a trophy or memento right where it lives on
// the stage — no more scrolling to a strip below the room.
export default function StageInspector({
  inspected,
  slot,
  stageWidth,
  anchorHalf = 26,
  accent = C.gold,
  theme,
  onClose,
  onGoPlay,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    containerRef.current?.focus();
  }, [inspected?.id]);

  if (!inspected || !slot) return null;
  const placement = computeInspectorPlacement(slot, stageWidth, anchorHalf);
  const isBadge = inspected.type === "badge";
  const badge = isBadge ? inspected.badge : null;
  const memento = !isBadge ? inspected.memento : null;
  const earned = isBadge ? badge.earned : memento.completed;

  const positionStyle = placement.centered
    ? { left: "50%", top: "50%", transform: "translate(-50%, -50%)", maxHeight: "92%", overflowY: "auto" }
    : {
      left: `${placement.leftPct}%`,
      transform: "translateX(-50%)",
      ...(placement.opensBelow
        ? { top: `calc(${placement.slotTopPct}% + ${placement.offsetPx}px)` }
        : { bottom: `calc(${100 - placement.slotTopPct}% + ${placement.offsetPx}px)` }),
    };

  return (
    <>
      {placement.centered && (
        <span
          aria-hidden="true"
          onClick={onClose}
          style={{ position: "absolute", inset: 0, zIndex: 5, background: "rgba(3,8,16,0.55)" }}
        />
      )}
      <div
        ref={containerRef}
        data-testid="wonder-stage-inspector"
        role="dialog"
        aria-label={isBadge ? `Trophy: ${badge.label}` : `Memento: ${memento.item.title}`}
        tabIndex={-1}
        className="wonder-stage-inspector"
        style={{
          position: "absolute",
          zIndex: 6,
          width: placement.width,
          maxWidth: "94%",
          clipPath: PIXEL_CLIP,
          padding: 3,
          background: `linear-gradient(180deg, ${C.gold}cc, ${C.gold}44 55%, rgba(8,12,20,0.95))`,
          outline: "none",
          ...positionStyle,
        }}
      >
        {!placement.centered && (
          <span
            aria-hidden="true"
            className="wonder-stage-inspector-caret"
            style={{
              position: "absolute",
              left: `${placement.caretLeftPct}%`,
              [placement.opensBelow ? "top" : "bottom"]: -8,
              width: 14,
              height: 8,
              transform: "translateX(-50%)",
              background: C.gold,
              clipPath: placement.opensBelow
                ? "polygon(50% 0, 100% 100%, 0 100%)"
                : "polygon(0 0, 100% 0, 50% 100%)",
            }}
          />
        )}
        <div
          style={{
            clipPath: PIXEL_CLIP,
            background: "rgba(9,19,33,0.98)",
            padding: "12px 13px 13px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
            <PixelText size="0.66rem" color={earned ? C.gold : TEAL_TEXT} style={{ textTransform: "uppercase", letterSpacing: "0.07em", paddingTop: 4 }}>
              {isBadge ? (earned ? "Trophy earned" : "Trophy to earn") : earned ? "Workshop memento" : "Waiting on the shelf"}
            </PixelText>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close inspector"
              style={{
                width: 26,
                height: 26,
                clipPath: PIXEL_CLIP_SM,
                border: `2px solid ${C.gold}55`,
                background: "rgba(255,255,255,0.06)",
                color: C.textPrimary,
                cursor: "pointer",
                fontSize: "0.85rem",
                fontWeight: 900,
                lineHeight: 1,
                flexShrink: 0,
              }}
            >
              ×
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "64px minmax(0, 1fr)", gap: 11, alignItems: "start" }}>
            {isBadge ? (
              <img
                src={theme?.assets?.badges?.[badge.id]}
                alt=""
                aria-hidden="true"
                style={{
                  width: 64,
                  height: 64,
                  objectFit: "contain",
                  imageRendering: "pixelated",
                  opacity: earned ? 1 : 0.55,
                  filter: earned ? `drop-shadow(0 0 10px ${C.gold}66)` : "grayscale(0.8) brightness(0.7)",
                }}
              />
            ) : (
              <span
                aria-hidden="true"
                style={{
                  display: "grid",
                  placeItems: "center",
                  width: 64,
                  height: 64,
                  clipPath: PIXEL_CLIP_SM,
                  background: earned ? `${memento.item.accent || C.gold}1c` : "rgba(255,255,255,0.04)",
                  border: `2px solid ${earned ? (memento.item.accent || C.gold) + "66" : C.border}`,
                  fontSize: 32,
                  filter: earned ? "none" : "grayscale(1) brightness(0.7)",
                  opacity: earned ? 1 : 0.6,
                }}
              >
                {memento.item.emoji}
              </span>
            )}
            <div data-testid={isBadge ? undefined : "wonder-memento-detail"} style={{ minWidth: 0 }}>
              <p style={{ color: earned ? C.gold : C.textPrimary, fontWeight: 900, fontSize: "0.94rem", lineHeight: 1.25, margin: "0 0 4px" }}>
                {isBadge
                  ? `${earned ? "You earned this" : "Still waiting for you"}: ${badge.label}`
                  : memento.item.title}
              </p>
              {isBadge ? (
                <>
                  <p style={{ color: C.textSecondary, fontSize: "0.76rem", lineHeight: 1.5, margin: "0 0 5px" }}>
                    {badge.desc}
                  </p>
                  {!earned && (
                    <p style={{ color: C.textMuted, fontSize: "0.72rem", lineHeight: 1.45, margin: 0 }}>
                      <strong style={{ color: C.teal }}>How to unlock:</strong> {badge.criteria}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <PixelText size="0.64rem" color={textSafeAccent(memento.item.accent) || TEAL_TEXT} style={{ display: "inline-block", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 5 }}>
                    {memento.item.gradeLabel}
                  </PixelText>
                  <p style={{ color: C.textSecondary, fontSize: "0.76rem", lineHeight: 1.5, margin: 0 }}>
                    {earned
                      ? "This keepsake appeared on the shelf when you finished the story. Nice thinking!"
                      : `Play "${memento.item.title}" and this spot fills in.`}
                  </p>
                  {!earned && onGoPlay && (
                    <button
                      type="button"
                      onClick={() => onGoPlay(memento.item)}
                      style={{
                        marginTop: 9,
                        clipPath: PIXEL_CLIP_SM,
                        border: `2px solid ${C.gold}aa`,
                        background: `linear-gradient(180deg, ${C.gold}, #9a7424)`,
                        color: "#0b1622",
                        fontFamily: PIXEL_FONT,
                        fontWeight: 600,
                        fontSize: "0.78rem",
                        padding: "7px 12px",
                        cursor: "pointer",
                      }}
                    >
                      Go play it →
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
