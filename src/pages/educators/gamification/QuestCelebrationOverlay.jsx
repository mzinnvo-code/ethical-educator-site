import { useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";

import { C } from "../../../theme.js";
import {
  GAMEFUL_CHARTER,
} from "../../../data/gamificationQuest.js";
import { PixelText, PIXEL_CLIP, PIXEL_CLIP_SM, PIXEL_FONT } from "../../../components/wonder/PixelFrame.jsx";

const CONFETTI_COLORS = [C.gold, C.coral, C.teal, C.sky, "#ffe9a8"];

function badgeIconFor(rooms, roomId) {
  return rooms.find((item) => item.id === roomId)?.badge?.icon;
}

// The reward moment is the lesson: a course about reward design has to make
// earning a badge feel designed. Portal to <body> (the quest shell is a fixed
// layer at z 1200; celebrations sit above everything at z 11000), focus is
// trapped on the primary action, Escape dismisses, reduced motion goes static.
export default function QuestCelebrationOverlay({
  variant = "badge",
  room,
  rooms = [],
  reducedMotion = false,
  metacognition,
  onContinue,
  onStay,
  onReplayQuest,
  onNavigateDeepfake,
  onOpenKit,
  onExit,
}) {
  const primaryRef = useRef(null);
  const previousFocusRef = useRef(null);
  const finale = variant === "finale";

  const confetti = useMemo(() => Array.from({ length: finale ? 26 : 16 }, (_, index) => ({
    left: 4 + Math.random() * 92,
    delay: Math.random() * 500,
    duration: 1400 + Math.random() * 1100,
    drift: Math.round(-40 + Math.random() * 80),
    spin: Math.random() > 0.5 ? 1 : -1,
    color: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
    size: 6 + Math.round(Math.random() * 4),
  })), [finale]);

  useEffect(() => {
    previousFocusRef.current = typeof document !== "undefined" ? document.activeElement : null;
    window.setTimeout(() => primaryRef.current?.focus(), 0);
    return () => {
      window.setTimeout(() => previousFocusRef.current?.focus?.(), 0);
    };
  }, []);

  const playableRooms = rooms.filter((item) => item.kind !== "home");
  const headline = finale ? "Gameful Learning Charter" : `${room?.badge?.label || "Badge"} earned!`;
  const metaLine = metacognition
    || (finale
      ? "You just lived the loop: hook, choice, feedback, replay, reflection, reward. This course was the worked example."
      : "Notice what just happened — the badge named the habit, not the completion. That is rule one in your classroom too.");

  if (typeof document === "undefined") return null;
  return createPortal(
    <div
      data-testid={finale ? "gamification-finale-celebration" : "gamification-celebration"}
      role="dialog"
      aria-modal="true"
      aria-label={headline}
      onKeyDown={(event) => {
        // Escape only dismisses the overlay; leaving the quest stays a
        // deliberate button press.
        if (event.key === "Escape") onStay?.();
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 11000,
        display: "grid",
        placeItems: "center",
        padding: 16,
        background: "rgba(2,8,16,0.78)",
        backdropFilter: "blur(8px)",
      }}
    >
      <style>{`
        @keyframes quest-confetti-fall {
          0% { transform: translate(0, -30px) rotate(0deg); opacity: 0; }
          8% { opacity: 1; }
          100% { transform: translate(var(--drift), 76vh) rotate(calc(var(--spin) * 540deg)); opacity: 0; }
        }
        .quest-confetti span {
          position: absolute;
          top: 0;
          animation: quest-confetti-fall var(--dur) steps(8, end) var(--delay) both;
        }
        @keyframes quest-celebrate-rise {
          from { opacity: 0; transform: translateY(14px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .quest-celebrate-card {
          animation: quest-celebrate-rise 260ms steps(4, end) both;
        }
        @keyframes quest-stamp {
          0% { opacity: 0; transform: scale(1.6); }
          55% { opacity: 1; transform: scale(0.96); filter: brightness(1.9); }
          75% { transform: scale(1.04); filter: brightness(1); }
          100% { opacity: 1; transform: scale(1); }
        }
        .quest-celebrate-art {
          animation: quest-stamp 420ms steps(4, end) 220ms both;
        }
        .quest-finale-badge {
          animation: quest-stamp 360ms steps(4, end) var(--stamp-delay) both;
        }
        @keyframes quest-badge-shine {
          0%, 100% { filter: drop-shadow(0 0 8px ${C.gold}44); }
          50% { filter: drop-shadow(0 0 18px ${C.gold}aa); }
        }
        .quest-celebrate-art img {
          animation: quest-badge-shine 1.6s steps(2, end) infinite;
        }
        .quest-celebrate-card button:hover {
          filter: brightness(1.18);
        }
        .quest-celebrate-card button:focus-visible {
          outline: 3px solid #ffe9a8;
          outline-offset: -3px;
        }
        @media (prefers-reduced-motion: reduce) {
          .quest-confetti span,
          .quest-celebrate-card,
          .quest-celebrate-art,
          .quest-celebrate-art img,
          .quest-finale-badge {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
      {!reducedMotion && (
        <div className="quest-confetti" aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          {confetti.map((piece, index) => (
            <span
              key={index}
              style={{
                left: `${piece.left}%`,
                width: piece.size,
                height: piece.size,
                background: piece.color,
                "--dur": `${piece.duration}ms`,
                "--delay": `${piece.delay}ms`,
                "--drift": `${piece.drift}px`,
                "--spin": piece.spin,
              }}
            />
          ))}
        </div>
      )}
      <div
        className="quest-celebrate-card"
        style={{
          position: "relative",
          width: finale ? "min(560px, 100%)" : "min(460px, 100%)",
          clipPath: PIXEL_CLIP,
          padding: 3,
          background: `linear-gradient(180deg, ${C.gold}cc, ${C.gold}44 55%, rgba(8,12,20,0.9))`,
        }}
      >
        <div
          style={{
            clipPath: PIXEL_CLIP,
            background: "linear-gradient(180deg, rgba(16,33,55,0.99), rgba(7,16,29,0.99))",
            padding: "22px 20px 18px",
            textAlign: "center",
            maxHeight: "88vh",
            overflowY: "auto",
          }}
        >
          <PixelText as="p" size="0.68rem" color={C.tealText} style={{ textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
            {finale ? "Quest complete — all nine badges" : "Badge earned"}
          </PixelText>

          {finale ? (
            <div
              aria-label="All nine badges earned"
              style={{ display: "grid", gridTemplateColumns: "repeat(9, 1fr)", gap: 5, maxWidth: 380, margin: "0 auto 14px" }}
            >
              {playableRooms.map((item, index) => (
                <span
                  key={item.id}
                  className="quest-finale-badge"
                  title={`${item.badge?.label} — ${item.badge?.habit}`}
                  style={{
                    "--stamp-delay": `${160 + index * 120}ms`,
                    display: "grid",
                    placeItems: "center",
                    aspectRatio: "1",
                    clipPath: PIXEL_CLIP_SM,
                    border: `1px solid ${C.gold}88`,
                    background: `${C.gold}14`,
                  }}
                >
                  <img
                    src={item.badge?.icon}
                    alt=""
                    aria-hidden="true"
                    style={{ width: "78%", height: "78%", objectFit: "contain", imageRendering: "pixelated" }}
                  />
                </span>
              ))}
            </div>
          ) : null}

          {/* The badge icon is the hero: the icon set has uniform, centered
              margins (unlike the decorative card art, whose emblem position
              varies per card), so every room's moment reads identically. */}
          <div
            className="quest-celebrate-art"
            style={{
              display: "grid",
              placeItems: "center",
              width: finale ? 168 : 152,
              height: finale ? 168 : 152,
              margin: "0 auto",
              clipPath: PIXEL_CLIP_SM,
              border: `2px solid ${C.gold}88`,
              background: `radial-gradient(circle at 50% 42%, ${C.gold}26, transparent 68%), ${C.gold}10`,
            }}
          >
            <img
              src={finale ? badgeIconFor(rooms, "finale") : room?.badge?.icon}
              alt=""
              aria-hidden="true"
              style={{ display: "block", width: finale ? 132 : 118, height: finale ? 132 : 118, imageRendering: "pixelated" }}
            />
          </div>

          <h2 style={{ fontFamily: PIXEL_FONT, fontWeight: 400, letterSpacing: "0.06em", wordSpacing: "0.08em", color: C.textPrimary, fontSize: "1.3rem", lineHeight: 1.3, margin: "14px 0 6px", textShadow: `0 0 18px ${C.gold}44` }}>
            {headline}
          </h2>
          {!finale && room?.badge?.habit && (
            <p style={{ color: C.textSecondary, fontSize: "0.88rem", lineHeight: 1.55, margin: "0 0 4px" }}>
              {room.badge.habit}
            </p>
          )}

          {finale && (
            <div
              data-testid="gamification-finale-charter"
              style={{
                textAlign: "left",
                margin: "12px auto 0",
                maxWidth: 440,
                clipPath: PIXEL_CLIP_SM,
                border: `2px solid ${C.teal}66`,
                background: "rgba(15,32,52,0.85)",
                padding: "12px 14px",
              }}
            >
              <PixelText as="p" size="0.62rem" color={C.gold} style={{ textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 8px" }}>
                Your classroom design card
              </PixelText>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {GAMEFUL_CHARTER.map((line) => (
                  <li key={line} style={{ color: C.textSecondary, fontSize: "0.82rem", lineHeight: 1.55, marginTop: 5 }}>{line}</li>
                ))}
              </ul>
            </div>
          )}

          <p style={{ color: C.tealText, fontSize: "0.8rem", lineHeight: 1.55, margin: "14px auto 0", maxWidth: 420, fontStyle: "italic" }}>
            {metaLine}
          </p>

          <div style={{ display: "flex", gap: 9, justifyContent: "center", flexWrap: "wrap", marginTop: 16 }}>
            {finale ? (
              <>
                <button ref={primaryRef} type="button" onClick={onOpenKit} style={primaryButtonStyle()}>
                  Get the printable Teacher Kit
                </button>
                <button type="button" onClick={onNavigateDeepfake} style={secondaryButtonStyle(C.sky)}>
                  Try the Deepfake Dilemma
                </button>
                <button type="button" onClick={onExit} style={secondaryButtonStyle(C.teal)}>
                  Back to Educator Resources
                </button>
                <button type="button" onClick={onStay} style={ghostButtonStyle()}>
                  Stay in the reward hall
                </button>
                <button type="button" onClick={onReplayQuest} style={ghostButtonStyle()}>
                  Replay the quest
                </button>
              </>
            ) : (
              <>
                <button ref={primaryRef} type="button" onClick={onContinue} style={primaryButtonStyle()}>
                  Continue the journey
                </button>
                <button type="button" onClick={onStay} style={ghostButtonStyle()}>
                  Stay in this room
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function primaryButtonStyle() {
  return {
    clipPath: PIXEL_CLIP_SM,
    border: `2px solid ${C.gold}aa`,
    background: `linear-gradient(180deg, ${C.gold}, #9a7424)`,
    color: "#0b1622",
    fontFamily: PIXEL_FONT,
    fontWeight: 600,
    fontSize: "0.84rem",
    padding: "10px 16px",
    cursor: "pointer",
  };
}

function secondaryButtonStyle(accent) {
  return {
    clipPath: PIXEL_CLIP_SM,
    border: `2px solid ${accent}88`,
    background: `${accent}22`,
    color: C.textPrimary,
    fontFamily: PIXEL_FONT,
    fontWeight: 600,
    fontSize: "0.84rem",
    padding: "10px 16px",
    cursor: "pointer",
  };
}

function ghostButtonStyle() {
  return {
    clipPath: PIXEL_CLIP_SM,
    border: "2px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.05)",
    color: C.textSecondary,
    fontFamily: PIXEL_FONT,
    fontWeight: 600,
    fontSize: "0.84rem",
    padding: "10px 16px",
    cursor: "pointer",
  };
}
