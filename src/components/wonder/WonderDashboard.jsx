import { C } from "../../theme.js";
import { TRACKER_THEMES } from "./trackerThemes.js";
import { hudNextGoalText, nextSparkHint } from "./progressText.js";
import { PixelFrame, PixelPill, PixelText, SegmentBar, PIXEL_CLIP_SM, PIXEL_FONT } from "./PixelFrame.jsx";
import AnimatedAriInvite from "./AriSprite.jsx";
import { ProgressRoomDoorButton } from "./DoorButton.jsx";
import useImagePreload from "./useImagePreload.js";
import { getProgressRoomTier, TEAL_TEXT } from "./trackerThemes.js";

// The intro-variant "game screen": one cohesive pixel-framed status panel in
// place of the old three-box grid. Ari talks, the lights meter shows one cell
// per story, and the door is the single call to action. Layout rules live in
// the scoped <style> block (not inline) so media queries can restack rows
// without !important fights.
export default function WonderDashboard({
  theme = TRACKER_THEMES.middle,
  accent = C.gold,
  panelTitle,
  brain,
  badges,
  achievements,
  earnedBadges,
  onOpenDoor,
  doorOpening,
  celebrate = false,
  doorAnchorRef = null,
}) {
  const sparkLabel = hudNextGoalText({ brain, badges, achievements });
  const sparkHint = nextSparkHint({ brain, badges, achievements });
  const allLit = brain.percent >= 100;
  const eyebrow = theme.eyebrow === panelTitle ? "Level up your thinking" : theme.eyebrow;

  // Warm the first animation frames + the room tiers we're likely to show;
  // hovering the door warms everything else before the modal can open.
  const roomTier = getProgressRoomTier({ brain, badges, achievements });
  const ariFrames = theme.assets?.ariFrames || [];
  const backdrops = theme.assets?.roomBackdrops || [];
  const warmRest = useImagePreload(
    [
      ...ariFrames.slice(0, 6),
      backdrops[roomTier],
      backdrops[Math.min(roomTier + 1, backdrops.length - 1)],
    ],
    [
      ...ariFrames.slice(6),
      ...Object.values(theme.assets?.door || {}),
      ...Object.values(theme.assets?.badges || {}),
    ],
  );

  return (
    <PixelFrame accent={accent} glow scanlines className={`wonder-dashboard ${celebrate ? "wonder-dashboard-celebrate" : ""}`}>
      <style>{`
        .wonder-dashboard-inner {
          position: relative;
          z-index: 2;
          display: grid;
          gap: 12px;
          padding: 14px 16px 16px;
        }
        .wonder-dashboard-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }
        .wonder-dashboard-body {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 14px;
          align-items: stretch;
        }
        .wonder-dashboard-hero {
          display: flex;
          gap: 12px;
          align-items: flex-end;
        }
        .wonder-dashboard-bubble {
          position: relative;
          flex: 1 1 auto;
          min-width: 0;
          clip-path: ${PIXEL_CLIP_SM};
          border: 2px solid ${C.teal}55;
          background: linear-gradient(180deg, ${C.teal}14, rgba(6,16,29,0.88));
          padding: 10px 12px 11px;
          animation: wonder-bubble-in 360ms steps(3, end) both;
        }
        .wonder-dashboard-bubble-tail {
          position: absolute;
          left: -10px;
          bottom: 22px;
          width: 0;
          height: 0;
        }
        .wonder-dashboard-bubble-tail::before,
        .wonder-dashboard-bubble-tail::after {
          content: "";
          position: absolute;
          background: ${C.teal}88;
        }
        .wonder-dashboard-bubble-tail::before { left: -6px; top: 0; width: 6px; height: 6px; }
        .wonder-dashboard-bubble-tail::after { left: 0; top: -4px; width: 6px; height: 14px; background: ${C.teal}55; }
        .wonder-dashboard-meter {
          display: flex;
          gap: 12px;
          align-items: center;
          clip-path: ${PIXEL_CLIP_SM};
          border: 2px solid rgba(255,255,255,0.12);
          background: rgba(5,13,24,0.66);
          padding: 9px 12px;
        }
        .wonder-brain-block {
          display: grid;
          justify-items: center;
          gap: 4px;
          flex-shrink: 0;
        }
        .wonder-brain-monitor {
          position: relative;
          width: clamp(88px, 10vw, 116px);
          aspect-ratio: 260 / 190;
          border: 2px solid ${C.teal}77;
          background: #081320;
          overflow: hidden;
          box-shadow: 0 0 0 2px rgba(5,12,24,0.85), 0 0 14px ${C.teal}26, inset 0 0 0 1px rgba(255,255,255,0.06);
        }
        .wonder-brain-monitor::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(transparent 50%, rgba(255,255,255,0.03) 50%);
          background-size: 100% 4px;
          pointer-events: none;
        }
        .wonder-dashboard-meter-brain {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: contain;
          image-rendering: pixelated;
          animation: wonder-brain-glow 3.2s steps(2, end) infinite;
        }
        @keyframes wonder-brain-glow {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.14) saturate(1.1); }
        }
        .wonder-dashboard-meter-brain.is-dim {
          animation: none;
          filter: brightness(1.5) contrast(1.05);
        }
        @media (prefers-reduced-motion: reduce) {
          .wonder-dashboard-meter-brain { animation: none; }
        }
        .wonder-dashboard-meter-readout {
          flex: 1 1 auto;
          min-width: 0;
          display: grid;
          gap: 6px;
        }
        .wonder-dashboard-meter-labels {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 10px;
          white-space: nowrap;
        }
        .wonder-dashboard-door {
          display: grid;
          align-content: center;
          justify-items: center;
          gap: 7px;
          min-width: 140px;
        }
        @keyframes wonder-bubble-in {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes wonder-cell-flash {
          0%, 100% { filter: brightness(1); }
          30%, 70% { filter: brightness(2); box-shadow: 0 0 18px ${C.gold}; }
        }
        .wonder-dashboard-celebrate .wonder-lights-cell-newest {
          animation: wonder-cell-flash 1.1s steps(4, end) 600ms 3;
        }
        @keyframes wonder-door-sparkle {
          0% { opacity: 0; transform: scale(0.4) rotate(0deg); }
          35% { opacity: 1; transform: scale(1.2) rotate(45deg); }
          100% { opacity: 0; transform: scale(0.7) rotate(90deg); }
        }
        .wonder-dashboard-door-sparkle {
          position: absolute;
          width: 12px;
          height: 12px;
          background: ${C.gold};
          box-shadow: 0 0 14px ${C.gold};
          pointer-events: none;
          opacity: 0;
        }
        .wonder-dashboard-celebrate .wonder-dashboard-door-sparkle {
          animation: wonder-door-sparkle 1.4s steps(5, end) both;
        }
        .wonder-dashboard-celebrate .wonder-dashboard-door-sparkle:nth-of-type(2) {
          animation-delay: 500ms;
        }
        .wonder-dashboard-celebrate .wonder-dashboard-door-sparkle:nth-of-type(3) {
          animation-delay: 1000ms;
        }
        @media (max-width: 760px) {
          .wonder-dashboard-body { grid-template-columns: minmax(0, 1fr); }
          .wonder-dashboard-door { min-width: 0; }
        }
        @media (max-width: 430px) {
          .wonder-dashboard-hero { flex-wrap: wrap; align-items: flex-start; }
          .wonder-dashboard-bubble { flex-basis: 100%; }
          .wonder-dashboard-bubble-tail { display: none; }
          .wonder-dashboard-meter { flex-wrap: wrap; }
        }
        @media (prefers-reduced-motion: reduce) {
          .wonder-dashboard-bubble { animation: none; }
          .wonder-dashboard-celebrate .wonder-lights-cell-newest,
          .wonder-dashboard-celebrate .wonder-dashboard-door-sparkle { animation: none; }
        }
      `}</style>
      <div className="wonder-dashboard-inner">
        <header className="wonder-dashboard-header">
          <div style={{ minWidth: 0 }}>
            <PixelText as="p" size="0.68rem" color={accent} style={{ textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>
              {eyebrow}
            </PixelText>
            <h3 style={{ fontFamily: PIXEL_FONT, fontWeight: 400, letterSpacing: "0.05em", color: C.textPrimary, fontSize: "1.34rem", lineHeight: 1.2, margin: 0, textShadow: `0 0 18px ${accent}33` }}>
              {panelTitle}
            </h3>
            <p style={{ color: C.textSecondary, fontSize: "0.8rem", lineHeight: 1.5, marginTop: 5, maxWidth: "58ch" }}>
              {theme.introCopy}
            </p>
          </div>
          <PixelPill
            icon={theme.assets?.stats?.badges}
            label="Trophies"
            value={`${earnedBadges.length}/${badges.length}`}
            color={C.gold}
            title={`${earnedBadges.length} of ${badges.length} trophies earned`}
          />
        </header>
        <div className="wonder-dashboard-body">
          <div style={{ display: "grid", gap: 12, minWidth: 0 }}>
            <div className="wonder-dashboard-hero">
              <AnimatedAriInvite theme={theme} size={84} />
              <div className="wonder-dashboard-bubble" role="status">
                <span className="wonder-dashboard-bubble-tail" aria-hidden="true" />
                <PixelText as="p" size="0.68rem" color={allLit ? C.gold : TEAL_TEXT} style={{ textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>
                  {allLit ? "Workshop fully lit!" : theme.nextLabel}
                </PixelText>
                <p style={{ color: C.textPrimary, fontSize: "0.96rem", fontWeight: 800, lineHeight: 1.3, margin: 0 }}>
                  {allLit ? "You lit every wonder light. Come see the workshop!" : sparkLabel}
                </p>
                {!allLit && sparkHint && (
                  <p style={{ color: C.textSecondary, fontSize: "0.76rem", lineHeight: 1.45, margin: "4px 0 0" }}>
                    {sparkHint}
                  </p>
                )}
              </div>
            </div>
            <div className="wonder-dashboard-meter">
              <span className="wonder-brain-block">
                <span
                  className="wonder-brain-monitor"
                  title="Ari's wonder brain lights up as you finish stories"
                >
                  <img
                    className={`wonder-dashboard-meter-brain ${brain.level <= 1 ? "is-dim" : ""}`}
                    src={theme.assets.brainProgress[Math.min(5, Math.max(0, brain.level ? brain.level - 1 : 0))]}
                    alt={`Ari's wonder brain, ${brain.completedGoals} of ${brain.totalGoals || 0} lights lit`}
                  />
                </span>
                <PixelText size="0.66rem" color={TEAL_TEXT} style={{ textTransform: "uppercase", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>
                  Ari&apos;s brain
                </PixelText>
              </span>
              <div className="wonder-dashboard-meter-readout">
                <div className="wonder-dashboard-meter-labels">
                  <PixelText size="0.68rem" color={TEAL_TEXT} style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    {theme.meterLabel}
                  </PixelText>
                  <PixelText size="0.86rem" color={allLit ? C.gold : C.textPrimary}>
                    {brain.completedGoals}/{brain.totalGoals || 0}
                  </PixelText>
                </div>
                <SegmentBar
                  total={brain.totalGoals || 0}
                  filled={brain.completedGoals}
                  color={C.gold}
                  ariaLabel={`${brain.completedGoals} of ${brain.totalGoals || 0} ${theme.meterLabel.toLowerCase()} lit`}
                />
              </div>
            </div>
          </div>
          <div className="wonder-dashboard-door" style={{ position: "relative" }} onPointerEnter={warmRest} onFocus={warmRest}>
            <PixelText as="p" size="0.66rem" color={C.gold} style={{ textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "center", maxWidth: 150 }}>
              {theme.invitationEyebrow}
            </PixelText>
            <ProgressRoomDoorButton onOpen={onOpenDoor} opening={doorOpening} theme={theme} size="large" buttonRef={doorAnchorRef} />
            {celebrate && (
              <>
                <span className="wonder-dashboard-door-sparkle" aria-hidden="true" style={{ top: 18, right: 8 }} />
                <span className="wonder-dashboard-door-sparkle" aria-hidden="true" style={{ top: 64, left: 2 }} />
                <span className="wonder-dashboard-door-sparkle" aria-hidden="true" style={{ bottom: 26, right: 18 }} />
              </>
            )}
          </div>
        </div>
      </div>
    </PixelFrame>
  );
}
