import { useEffect, useMemo, useRef } from "react";
import { C } from "../../theme.js";
import { K5_BRAIN_PROGRESS_ASSETS, K5_MASTERY_BADGE_ASSETS } from "../../data/deepfakeGameAssets.js";
import { PixelText, PIXEL_CLIP, PIXEL_CLIP_SM, PIXEL_FONT } from "./PixelFrame.jsx";

const CONFETTI_COLORS = [C.gold, C.coral, C.teal, C.sky, "#ffe9a8"];

function usePrefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// End-of-story celebration: trophy pop, pixel confetti, and the "+1 wonder
// light" moment, shown the instant a K-5 story reaches its synthesis stage.
export default function CelebrationOverlay({
  experiment,
  firstCompletion,
  newBadges = [],
  accent = C.coral,
  onDismiss,
  onRestart,
  onGoToHub,
  playSfx,
}) {
  const dismissRef = useRef(null);
  const previousFocusRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  const confetti = useMemo(() => Array.from({ length: 26 }, (_, index) => ({
    left: 4 + Math.random() * 92,
    delay: Math.random() * 500,
    duration: 1400 + Math.random() * 1100,
    drift: Math.round(-40 + Math.random() * 80),
    spin: Math.random() > 0.5 ? 1 : -1,
    color: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
    size: 6 + Math.round(Math.random() * 4),
  })), []);

  useEffect(() => {
    previousFocusRef.current = typeof document !== "undefined" ? document.activeElement : null;
    window.setTimeout(() => dismissRef.current?.focus(), 0);
    playSfx?.(newBadges.length ? "trophy-fanfare" : "story-complete");
    return () => {
      window.setTimeout(() => previousFocusRef.current?.focus?.(), 0);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const headline = firstCompletion
    ? `You finished ${experiment.title}!`
    : "Another path explored!";

  return (
    <div
      data-testid="wonder-celebration"
      role="dialog"
      aria-modal="true"
      aria-label={headline}
      onKeyDown={(event) => {
        if (event.key === "Escape") onDismiss();
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
        @keyframes wonder-confetti-fall {
          0% { transform: translate(0, -30px) rotate(0deg); opacity: 0; }
          8% { opacity: 1; }
          100% { transform: translate(var(--drift), 76vh) rotate(calc(var(--spin) * 540deg)); opacity: 0; }
        }
        .wonder-confetti span {
          position: absolute;
          top: 0;
          animation: wonder-confetti-fall var(--dur) steps(8, end) var(--delay) both;
        }
        @keyframes wonder-celebrate-rise {
          from { opacity: 0; transform: translateY(14px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .wonder-celebrate-card {
          animation: wonder-celebrate-rise 260ms steps(4, end) both;
        }
        @keyframes wonder-emoji-bounce {
          0% { transform: translateY(-46px) scale(0.6); opacity: 0; }
          45% { transform: translateY(6px) scale(1.12); opacity: 1; }
          70% { transform: translateY(-6px) scale(0.98); }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        .wonder-celebrate-emoji {
          animation: wonder-emoji-bounce 640ms steps(5, end) 140ms both;
        }
        @keyframes wonder-light-arc {
          0% { transform: translate(0, 0) scale(1); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translate(74px, -36px) scale(0.5); opacity: 0; }
        }
        .wonder-light-pip {
          animation: wonder-light-arc 1100ms steps(6, end) 900ms both;
        }
        @keyframes wonder-trophy-shine {
          0%, 100% { filter: drop-shadow(0 0 8px ${C.gold}44); }
          50% { filter: drop-shadow(0 0 18px ${C.gold}aa); }
        }
        .wonder-celebrate-trophy img {
          animation: wonder-trophy-shine 1.6s steps(2, end) infinite;
        }
        @keyframes wonder-trophy-stamp {
          0% { opacity: 0; transform: scale(1.6); }
          55% { opacity: 1; transform: scale(0.96); filter: brightness(2); }
          75% { transform: scale(1.04); filter: brightness(1); }
          100% { opacity: 1; transform: scale(1); }
        }
        .wonder-celebrate-trophy {
          animation: wonder-trophy-stamp 420ms steps(4, end) 700ms both;
        }
        .wonder-celebrate-card button:hover {
          filter: brightness(1.18);
        }
        .wonder-celebrate-card button:focus-visible {
          outline: 3px solid #ffe9a8;
          outline-offset: -3px;
        }
        @media (prefers-reduced-motion: reduce) {
          .wonder-confetti span,
          .wonder-celebrate-card,
          .wonder-celebrate-emoji,
          .wonder-light-pip,
          .wonder-celebrate-trophy,
          .wonder-celebrate-trophy img {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
      {firstCompletion && !reducedMotion && (
        <div className="wonder-confetti" aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
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
        className="wonder-celebrate-card"
        style={{
          position: "relative",
          width: "min(460px, 100%)",
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
          <PixelText as="p" size="0.68rem" color={accent} style={{ textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>
            {firstCompletion ? "Story complete" : "Story replayed"}
          </PixelText>

          <div style={{ position: "relative", display: "inline-block" }}>
            <span className="wonder-celebrate-emoji" aria-hidden="true" style={{ display: "inline-block", fontSize: 56, lineHeight: 1, filter: "drop-shadow(0 4px 0 rgba(0,0,0,0.4))" }}>
              {experiment.emoji}
            </span>
            <span
              aria-hidden="true"
              style={{
                display: "block",
                width: 84,
                height: 8,
                margin: "4px auto 0",
                clipPath: PIXEL_CLIP_SM,
                background: `linear-gradient(180deg, ${accent}88, rgba(5,12,24,0.9))`,
                borderTop: `1px solid ${C.gold}aa`,
              }}
            />
            {firstCompletion && (
              <span
                className="wonder-light-pip"
                aria-hidden="true"
                style={{
                  position: "absolute",
                  right: -16,
                  top: 4,
                  width: 12,
                  height: 12,
                  clipPath: PIXEL_CLIP_SM,
                  background: `linear-gradient(180deg, #ffe9a8, ${C.gold})`,
                  boxShadow: `0 0 12px ${C.gold}`,
                }}
              />
            )}
          </div>

          <h2 style={{ fontFamily: PIXEL_FONT, fontWeight: 400, letterSpacing: "0.06em", wordSpacing: "0.08em", color: C.textPrimary, fontSize: "1.3rem", lineHeight: 1.3, margin: "12px 0 6px", textShadow: `0 0 18px ${accent}44` }}>
            {headline}
          </h2>
          {firstCompletion ? (
            <p style={{ color: C.textSecondary, fontSize: "0.86rem", lineHeight: 1.55, margin: "0 0 4px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
              <img
                src={K5_BRAIN_PROGRESS_ASSETS[2]}
                alt=""
                aria-hidden="true"
                style={{ width: 34, height: "auto", imageRendering: "pixelated" }}
              />
              <PixelText size="0.9rem" color={C.gold}>+1 wonder light</PixelText>
              <span>for your workshop!</span>
            </p>
          ) : (
            <p style={{ color: C.textSecondary, fontSize: "0.86rem", lineHeight: 1.55, margin: "0 0 4px" }}>
              Trying a different path is exactly how thinkers grow.
            </p>
          )}

          {newBadges.map((badge) => (
            <div
              key={badge.id}
              className="wonder-celebrate-trophy"
              data-testid="wonder-celebration-trophy"
              style={{
                display: "grid",
                gridTemplateColumns: "56px minmax(0, 1fr)",
                gap: 10,
                alignItems: "center",
                textAlign: "left",
                margin: "12px auto 0",
                maxWidth: 340,
                clipPath: PIXEL_CLIP_SM,
                border: `2px solid ${C.gold}77`,
                background: `${C.gold}14`,
                padding: "9px 11px",
              }}
            >
              <img
                src={K5_MASTERY_BADGE_ASSETS[badge.id]}
                alt=""
                aria-hidden="true"
                style={{ width: 56, height: 56, objectFit: "contain", imageRendering: "pixelated" }}
              />
              <span>
                <PixelText as="span" size="0.6rem" color={C.gold} style={{ display: "block", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 2 }}>
                  New trophy earned
                </PixelText>
                <span style={{ color: C.textPrimary, fontWeight: 800, fontSize: "0.94rem", display: "block" }}>{badge.label}</span>
                <span style={{ color: C.textSecondary, fontSize: "0.74rem", lineHeight: 1.4, display: "block" }}>{badge.desc}</span>
              </span>
            </div>
          ))}

          <div style={{ display: "flex", gap: 9, justifyContent: "center", flexWrap: "wrap", marginTop: 16 }}>
            <button
              ref={dismissRef}
              type="button"
              onClick={onDismiss}
              style={{
                clipPath: PIXEL_CLIP_SM,
                border: `2px solid ${accent}88`,
                background: `${accent}22`,
                color: C.textPrimary,
                fontFamily: PIXEL_FONT,
                fontWeight: 600,
                fontSize: "0.84rem",
                padding: "10px 16px",
                cursor: "pointer",
              }}
            >
              Read my reflection
            </button>
            {onGoToHub && (
              <button
                type="button"
                onClick={onGoToHub}
                style={{
                  clipPath: PIXEL_CLIP_SM,
                  border: `2px solid ${C.gold}aa`,
                  background: `linear-gradient(180deg, ${C.gold}, #9a7424)`,
                  color: "#0b1622",
                  fontFamily: PIXEL_FONT,
                  fontWeight: 600,
                  fontSize: "0.84rem",
                  padding: "10px 16px",
                  cursor: "pointer",
                }}
              >
                Back to the map
              </button>
            )}
            <button
              type="button"
              onClick={onRestart}
              style={{
                clipPath: PIXEL_CLIP_SM,
                border: `2px solid rgba(255,255,255,0.2)`,
                background: "rgba(255,255,255,0.05)",
                color: C.textSecondary,
                fontFamily: PIXEL_FONT,
                fontWeight: 600,
                fontSize: "0.84rem",
                padding: "10px 16px",
                cursor: "pointer",
              }}
            >
              Play it again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
