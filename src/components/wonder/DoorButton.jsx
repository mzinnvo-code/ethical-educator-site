import { C } from "../../theme.js";
import { PIXEL_CLIP_SM } from "./PixelFrame.jsx";
import { TRACKER_THEMES } from "./trackerThemes.js";
import { PROGRESS_ROOM_DOOR_ASSETS } from "../../data/deepfakeGameAssets.js";

const DOOR_SIZES = {
  default: { width: 118, doorPx: 88, minHeight: 134 },
  large: { width: 132, doorPx: 100, minHeight: 150 },
};

// The pixel door into the Progress Room / Wonder Workshop. The four stacked
// door frames are stepped through by the .progress-room-door-opening
// keyframes (see wonderStyles.js) before the modal opens.
export function ProgressRoomDoorButton({ onOpen, opening, theme = TRACKER_THEMES.middle, size = "default", buttonRef = null }) {
  const doorAssets = theme.assets?.door || PROGRESS_ROOM_DOOR_ASSETS;
  const dims = DOOR_SIZES[size] || DOOR_SIZES.default;
  const doorFrames = [
    { id: "closed", src: doorAssets.closed },
    { id: "crack", src: doorAssets.crack },
    { id: "open", src: doorAssets.open },
    { id: "glow", src: doorAssets.glow },
  ];
  return (
    <button
      ref={buttonRef}
      type="button"
      className={`progress-room-door-button ${opening ? "progress-room-door-opening" : ""}`}
      data-testid="progress-room-modal-trigger"
      onClick={onOpen}
      aria-label={theme.doorLabel || "Open Progress Room"}
      style={{
        position: "relative",
        display: "grid",
        gridTemplateRows: `${dims.doorPx + 4}px auto`,
        justifyItems: "center",
        alignItems: "center",
        width: dims.width,
        minHeight: dims.minHeight,
        padding: "7px 8px 9px",
        clipPath: PIXEL_CLIP_SM,
        border: `2px solid ${C.gold}88`,
        background: "linear-gradient(180deg, rgba(8,18,32,0.92), rgba(33,22,11,0.92))",
        color: C.textPrimary,
        cursor: opening ? "default" : "pointer",
        boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.05)`,
        filter: `drop-shadow(0 0 11px ${C.gold}24)`,
        overflow: "hidden",
      }}
    >
      <span
        className="progress-room-door-beam"
        aria-hidden="true"
        style={{
          position: "absolute",
          left: -52,
          top: 45,
          width: 72,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${C.gold}88)`,
          boxShadow: `0 0 10px ${C.gold}66`,
        }}
      />
      <span
        className="progress-room-door-frame"
        aria-hidden="true"
        style={{ position: "relative", width: dims.doorPx, height: dims.doorPx, display: "block" }}
      >
        {doorFrames.map((frame) => (
          <img
            key={frame.id}
            className={`progress-room-door-img progress-room-door-${frame.id}`}
            src={frame.src}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              imageRendering: "pixelated",
              opacity: frame.id === "closed" ? 1 : 0,
            }}
          />
        ))}
      </span>
      <span style={{ color: C.midnight, background: C.gold, clipPath: PIXEL_CLIP_SM, padding: "5px 8px", fontSize: "0.68rem", fontWeight: 900, lineHeight: 1.05 }}>
        {theme.doorLabel || "Open Progress Room"}
      </span>
      <span
        className="progress-room-ready-caption"
        style={{
          position: "absolute",
          right: 8,
          top: 8,
          color: C.gold,
          fontSize: "0.56rem",
          fontWeight: 900,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          opacity: 0,
        }}
      >
        {theme.roomReadyLabel || "Room ready"}
      </span>
    </button>
  );
}
