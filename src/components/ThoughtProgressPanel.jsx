import { useEffect, useRef, useState } from "react";
import {
  BRAIN_PROGRESS_ASSETS,
  DEEPFAKE_GAME_ASSETS,
  MASTERY_BADGE_ASSETS,
  PROGRESS_ROOM_BACKDROPS,
  PROGRESS_ROOM_STAT_ASSETS,
} from "../data/deepfakeGameAssets.js";
import { ACHIEVEMENTS, getAchievementStatus, getBadgeStatus, getBrainProgress } from "../lib/thoughtProgress.js";
import { C } from "../theme.js";
import useThoughtProgress from "../hooks/useThoughtProgress.js";
import {
  DOOR_OPEN_DELAY_MS,
  PIXEL_FRAME_RATIOS,
  TRACKER_THEMES,
  getProgressRoomTier,
  roomSlots,
} from "./wonder/trackerThemes.js";
import { hudNextGoalText, nextGoalText } from "./wonder/progressText.js";
import { K5_MEMENTO_SLOTS, diffRoomEntrance, readRoomSeen, slotHalfSize, writeRoomSeen } from "./wonder/workshopLayout.js";
import useProgressRoomSfx from "./wonder/useProgressRoomSfx.js";
import { wonderMusic } from "../lib/wonderAudio.js";
import { PIXEL_CLIP_SM, PIXEL_FONT } from "./wonder/PixelFrame.jsx";
import { WONDER_CORE_CSS } from "./wonder/wonderStyles.js";
import AnimatedAriInvite from "./wonder/AriSprite.jsx";
import { ProgressRoomDoorButton } from "./wonder/DoorButton.jsx";
import StageInspector from "./wonder/StageInspector.jsx";
import CollectionDrawer from "./wonder/CollectionDrawer.jsx";
import useIrisTransition, { IrisOverlay } from "./wonder/useIrisTransition.jsx";
import WonderDashboard from "./wonder/WonderDashboard.jsx";

const DIMENSIONS = [
  { key: "completedExperiments", label: "Dilemmas finished", max: 6, color: C.teal },
  { key: "lensCount", label: "Reasoning lenses", max: 6, color: C.gold },
  { key: "steelmanSaveCount", label: "Steelmans saved", max: 4, color: C.coral },
  { key: "topicCount", label: "Topic breadth", max: 6, color: C.ocean },
];

const ACHIEVEMENT_IDS = ACHIEVEMENTS.map((achievement) => achievement.id);

function percent(value, max) {
  return `${Math.max(8, Math.min(100, Math.round((value / max) * 100)))}%`;
}

function PixelAssetFrame({ kind, className, children, size = "medium", earned = true }) {
  const sizes = {
    brainHud: { width: 96, padding: 5 },
    brainLarge: { width: 168, padding: 7 },
    achievementCompact: { width: 74, padding: 3 },
    achievementLarge: { width: 104, padding: 4 },
    badgeTrophy: { width: 96, padding: 5 },
    medium: { width: 90, padding: 4 },
  };
  const frame = sizes[size] || sizes.medium;
  return (
    <div className={className} style={{
      position: "relative",
      width: frame.width,
      aspectRatio: PIXEL_FRAME_RATIOS[kind],
      flexShrink: 0,
      padding: frame.padding,
      borderRadius: 8,
      border: `1px solid ${earned ? C.gold + "55" : C.border}`,
      background: "rgba(8,18,32,0.72)",
      boxShadow: earned ? `inset 0 0 0 1px rgba(255,255,255,0.04), 0 0 14px ${C.gold}16` : "inset 0 0 0 1px rgba(255,255,255,0.03)",
    }}>
      {children}
    </div>
  );
}

function BrainProgressIcon({ brain, size = "large", theme = TRACKER_THEMES.middle }) {
  const index = Math.min(5, Math.max(0, brain.level ? brain.level - 1 : 0));
  const isHud = size === "hud";
  const brainAssets = theme.assets?.brainProgress || BRAIN_PROGRESS_ASSETS;
  return (
    <div style={{ textAlign: "center", flexShrink: 0, minWidth: 0 }}>
      <PixelAssetFrame
        kind="brain"
        className="thought-progress-brain-frame"
        size={isHud ? "brainHud" : "brainLarge"}
        earned={brain.percent >= 100}
      >
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at 50% 45%, ${C.gold}30, rgba(44,211,200,0.14) 55%, transparent 78%)`,
            pointerEvents: "none",
          }}
        />
        <img
          src={brainAssets[index]}
          alt={`Pixel brain progress ${brain.percent}% complete`}
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "block",
            objectFit: "contain",
            imageRendering: "pixelated",
            filter: brain.level <= 1
              ? `brightness(1.55) contrast(1.05) drop-shadow(0 0 8px rgba(42,136,192,0.7))`
              : brain.percent >= 100 ? `drop-shadow(0 0 18px ${C.gold}55)` : `drop-shadow(0 0 12px ${C.teal}25)`,
          }}
        />
      </PixelAssetFrame>
      <p style={{
        marginTop: isHud ? 3 : 6,
        color: brain.percent >= 100 ? C.gold : C.teal,
        fontSize: isHud ? "0.62rem" : "0.74rem",
        fontWeight: 700,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}>
        {brain.percent}% lit
      </p>
    </div>
  );
}

function PixelTrackerStat({ label, value, color, icon, statAssets = PROGRESS_ROOM_STAT_ASSETS }) {
  const asset = statAssets[icon];
  return (
    <div
      className="progress-room-pixel-stat"
      style={{
        display: "grid",
        gridTemplateColumns: "34px minmax(0, 1fr)",
        gap: 8,
        alignItems: "center",
        padding: "8px 9px",
        border: `2px solid ${color}38`,
        borderRadius: 8,
        background: `linear-gradient(180deg, rgba(6,16,29,0.9), ${color}10)`,
        boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.04), 0 0 14px ${color}10`,
      }}
    >
      <img
        src={asset}
        alt=""
        aria-hidden="true"
        style={{
          width: 34,
          height: 34,
          objectFit: "contain",
          imageRendering: "pixelated",
          filter: `drop-shadow(0 0 8px ${color}28)`,
        }}
      />
      <div style={{ minWidth: 0 }}>
        <p style={{ color, fontSize: "0.6rem", fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 2 }}>
          {label}
        </p>
        <p style={{ color: C.textPrimary, fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.08rem", lineHeight: 1 }}>
          {value}
        </p>
      </div>
    </div>
  );
}

function DimensionBar({ item, value }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginBottom: 5 }}>
        <span style={{ color: C.textSecondary, fontSize: "0.78rem", fontWeight: 600 }}>{item.label}</span>
        <span style={{ color: item.color, fontSize: "0.74rem", fontWeight: 700 }}>{value}</span>
      </div>
      <div style={{ height: 8, borderRadius: 999, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
        <div style={{
          width: percent(value, item.max),
          height: "100%",
          borderRadius: 999,
          background: `linear-gradient(90deg, ${item.color}, ${item.color}aa)`,
        }} />
      </div>
    </div>
  );
}

function AchievementCard({ achievement, compact = false, sfx }) {
  const asset = DEEPFAKE_GAME_ASSETS.achievements[achievement.id] || BRAIN_PROGRESS_ASSETS[0];
  return (
    <button
      type="button"
      onClick={() => sfx?.play("achievementPlaque")}
      aria-label={`${achievement.earned ? "Earned" : "Locked"} game achievement: ${achievement.label}`}
      style={{
      display: "grid",
      gridTemplateColumns: compact ? "86px 1fr" : "116px 1fr",
      gap: compact ? 9 : 12,
      alignItems: "center",
      textAlign: "left",
      width: "100%",
      padding: compact ? "9px 10px" : "12px 13px",
      borderRadius: 8,
      border: `1px solid ${achievement.earned ? C.gold + "60" : C.border}`,
      background: achievement.earned ? `${C.gold}12` : "rgba(255,255,255,0.022)",
      color: C.textPrimary,
      cursor: "pointer",
      minHeight: compact ? 76 : 96,
    }}>
      <PixelAssetFrame
        kind="achievement"
        size={compact ? "achievementCompact" : "achievementLarge"}
        earned={achievement.earned}
      >
        <img
          className="thought-progress-achievement-icon"
          src={asset}
          alt=""
          aria-hidden="true"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            borderRadius: 6,
            imageRendering: "pixelated",
            opacity: achievement.earned ? 1 : 0.54,
            filter: achievement.earned ? `drop-shadow(0 0 10px ${C.gold}55)` : "grayscale(0.45)",
          }}
        />
      </PixelAssetFrame>
      <div>
        <p style={{ color: achievement.earned ? C.gold : C.textPrimary, fontSize: compact ? "0.78rem" : "0.9rem", fontWeight: 900, marginBottom: 3 }}>
          {achievement.earned ? "Earned" : "Locked"}: {achievement.label}
        </p>
        <p style={{ color: C.textMuted, fontSize: compact ? "0.68rem" : "0.76rem", lineHeight: 1.45, marginBottom: compact ? 0 : 5 }}>
          {achievement.desc}
        </p>
        {!compact && (
          <p style={{ color: C.textSecondary, fontSize: "0.74rem", lineHeight: 1.45 }}>
            <strong style={{ color: C.teal }}>How to unlock:</strong> {achievement.criteria}
          </p>
        )}
      </div>
    </button>
  );
}

const ACHIEVEMENT_GAME_LABELS = {
  "deepfake-election": "The Deepfake Dilemma",
};

function groupAchievementsByGame(achievements) {
  const groups = new Map();
  for (const achievement of achievements) {
    const experimentId = achievement.experimentId || "general";
    if (!groups.has(experimentId)) {
      groups.set(experimentId, {
        experimentId,
        label: ACHIEVEMENT_GAME_LABELS[experimentId] || "Thought Experiment Game",
        achievements: [],
      });
    }
    groups.get(experimentId).achievements.push(achievement);
  }
  return [...groups.values()];
}

function GameAchievementsSection({ achievements, compactCards, accent, sfx }) {
  const earnedAchievements = achievements.filter((achievement) => achievement.earned);
  const achievementGroups = groupAchievementsByGame(achievements);
  return (
    <section
      data-testid="game-achievements-section"
      style={{
        border: `1px solid ${C.coral}35`,
        borderRadius: 10,
        background: "rgba(8,18,32,0.44)",
        padding: compactCards ? "12px" : "14px 15px",
        marginTop: 4,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
        <div>
          <p style={{ color: accent, fontSize: "0.68rem", fontWeight: 900, letterSpacing: "0.13em", textTransform: "uppercase", margin: 0 }}>
            Game Achievements
          </p>
          {!compactCards && (
            <p style={{ color: C.textSecondary, fontSize: "0.76rem", lineHeight: 1.45, marginTop: 4 }}>
              These are thinking moves you practiced inside each game.
            </p>
          )}
        </div>
        <span
          data-testid="game-achievement-counter"
          style={{
            color: C.textPrimary,
            fontSize: "0.78rem",
            fontWeight: 900,
            border: `1px solid ${C.gold}45`,
            borderRadius: 999,
            padding: "4px 8px",
            background: `${C.gold}12`,
          }}
        >
          {earnedAchievements.length}/{achievements.length}
        </span>
      </div>
      <div style={{ display: "grid", gap: 12 }}>
        {achievementGroups.map((group) => (
          <div key={group.experimentId}>
            <p style={{ color: C.textSecondary, fontSize: "0.78rem", fontWeight: 800, marginBottom: 8 }}>
              {group.label}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: compactCards ? "repeat(auto-fit, minmax(170px, 1fr))" : "repeat(auto-fit, minmax(240px, 1fr))", gap: 10 }}>
              {group.achievements.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} compact={compactCards} sfx={sfx} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function MementoSlot({ slot, item, completed, isNew, popIndex, onOpen, sfx }) {
  return (
    <button
      type="button"
      data-testid="wonder-memento-slot"
      className={`wonder-memento ${completed ? "wonder-memento-earned" : "wonder-memento-empty"} ${isNew ? "wonder-memento-new" : ""}`}
      onClick={() => onOpen(item, completed)}
      onPointerEnter={() => sfx?.play("trophyHover")}
      onFocus={() => sfx?.play("trophyHover")}
      aria-label={completed
        ? `Workshop memento: ${item.title} (${item.gradeLabel} story, finished)`
        : `Empty shelf spot: finish ${item.title} (${item.gradeLabel}) to add this memento`}
      style={{
        position: "absolute",
        zIndex: 3,
        left: slot.left,
        top: slot.top,
        width: "clamp(22px, calc(var(--stage-w, 1000px) * 0.062), 42px)",
        aspectRatio: "1 / 1",
        transform: "translate(-50%, -50%)",
        display: "grid",
        justifyItems: "center",
        alignContent: "end",
        padding: 0,
        border: "none",
        background: "transparent",
        cursor: "pointer",
        "--pop-delay": `${Math.min(popIndex, 12) * 90}ms`,
      }}
    >
      {completed ? (
        <span
          aria-hidden="true"
          style={{
            fontSize: "clamp(15px, 1.9vw, 25px)",
            lineHeight: 1,
            filter: `saturate(1.15) drop-shadow(0 0 7px ${item.accent || C.gold}aa) drop-shadow(0 2px 0 rgba(0,0,0,0.45))`,
          }}
        >
          {item.emoji}
        </span>
      ) : (
        <span
          className="wonder-memento-question"
          aria-hidden="true"
          style={{
            display: "grid",
            placeItems: "center",
            width: "clamp(16px, 2vw, 26px)",
            aspectRatio: "1 / 1",
            clipPath: PIXEL_CLIP_SM,
            border: `2px dotted ${C.gold}55`,
            background: "rgba(10,22,38,0.85)",
            color: "#2cd3c8",
            fontFamily: PIXEL_FONT,
            fontWeight: 600,
            fontSize: "clamp(11px, 1.3vw, 16px)",
            lineHeight: 1,
          }}
        >
          ?
        </span>
      )}
      <span
        aria-hidden="true"
        style={{
          width: "84%",
          height: 5,
          marginTop: 2,
          borderTop: completed ? `1px solid ${C.gold}cc` : `1px dotted ${C.textMuted}66`,
          background: completed
            ? `linear-gradient(180deg, ${item.accent || C.gold}66, rgba(5,12,24,0.85))`
            : "rgba(5,12,24,0.55)",
          boxShadow: completed ? `0 2px 6px rgba(0,0,0,0.45), 0 0 8px ${item.accent || C.gold}33` : "none",
        }}
      />
    </button>
  );
}

function TrophyRoomStage({ badges, roomTier, onOpenBadge, sfx, theme = TRACKER_THEMES.middle, mementos = [], onOpenMemento, entrance = null }) {
  const badgesById = Object.fromEntries(badges.map((badge) => [badge.id, badge]));
  const roomBackdrops = theme.assets?.roomBackdrops || PROGRESS_ROOM_BACKDROPS;
  const backdrop = roomBackdrops[roomTier] || roomBackdrops[0];
  const prevBackdrop = entrance ? (roomBackdrops[entrance.prevTier] || roomBackdrops[0]) : null;
  const slots = theme.roomSlots || roomSlots;
  return (
    <div
      data-testid="progress-room-stage"
      className={entrance ? "wonder-room-entrance" : ""}
      style={{
        position: "relative",
        // Height derives from width via the aspect ratio; a fixed minHeight
        // here used to force the stage wider than small phone viewports.
        aspectRatio: "16 / 9",
        borderRadius: 10,
        border: `2px solid ${C.gold}35`,
        backgroundImage: `linear-gradient(180deg, rgba(5,12,24,0.08), rgba(5,12,24,0.2)), url(${backdrop})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
        boxShadow: `0 28px 80px rgba(0,0,0,0.34), inset 0 0 0 1px rgba(255,255,255,0.05)`,
      }}
    >
      {entrance && prevBackdrop !== backdrop && (
        <div
          className="wonder-room-prev"
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(180deg, rgba(5,12,24,0.08), rgba(5,12,24,0.2)), url(${prevBackdrop})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 1,
          }}
        />
      )}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          background: "radial-gradient(circle at 50% 38%, rgba(44,211,200,0.12), transparent 34%), linear-gradient(180deg, transparent 52%, rgba(5,12,24,0.32))",
        }}
      />
      {mementos.map(({ slot, item, completed, isNew }, index) => (
        <MementoSlot
          key={item.id}
          slot={slot}
          item={item}
          completed={completed}
          isNew={isNew}
          popIndex={mementos.filter((entry, i) => entry.isNew && i < index).length}
          onOpen={onOpenMemento}
          sfx={sfx}
        />
      ))}
      {slots.map((slot) => {
        const badge = badgesById[slot.id];
        if (!badge) return null;
        const asset = theme.assets?.badges?.[badge.id] || MASTERY_BADGE_ASSETS[badge.id];
        return (
          <button
            key={slot.id}
            type="button"
            data-testid="trophy-room-slot"
            className={`thought-progress-room-slot ${badge.earned ? "thought-progress-badge-earned" : "thought-progress-badge-locked"} ${badge.isNew ? "thought-progress-badge-new" : ""}`}
            onClick={() => onOpenBadge(badge)}
            onPointerEnter={() => sfx.play("trophyHover")}
            onFocus={() => sfx?.play("trophyHover")}
            aria-label={`${badge.earned ? "Earned" : "Locked"} mastery badge: ${badge.label}`}
            style={{
              position: "absolute",
              zIndex: 3,
              left: slot.left,
              top: slot.top,
              width: "clamp(44px, calc(var(--stage-w, 1000px) * 0.088), 92px)",
              aspectRatio: "1 / 1",
              transform: "translate(-50%, -50%)",
              padding: 5,
              borderRadius: 8,
              borderWidth: 2,
              borderStyle: badge.earned ? "solid" : "dotted",
              borderColor: badge.earned ? C.gold + "88" : C.textMuted + "80",
              background: badge.earned ? "rgba(255,212,107,0.12)" : "rgba(5,12,24,0.48)",
              boxShadow: badge.isNew ? `0 0 30px ${C.gold}76, inset 0 0 0 1px ${C.gold}35` : badge.earned ? `0 0 18px ${C.gold}22` : "inset 0 0 0 1px rgba(255,255,255,0.05)",
              cursor: "pointer",
            }}
          >
            <img
              src={asset}
              alt=""
              aria-hidden="true"
              style={{
                width: "100%",
                height: "100%",
                display: "block",
                objectFit: "contain",
                borderRadius: 6,
                imageRendering: "pixelated",
                opacity: badge.earned ? 1 : 0.5,
                filter: badge.earned ? `drop-shadow(0 0 16px ${C.gold}55)` : "grayscale(1) brightness(0.28) contrast(1.3)",
              }}
            />
          </button>
        );
      })}
    </div>
  );
}

function MasteryBadgeTrophyRoom({ badges, accent, onOpenBadge, selectedBadge, roomTier, sfx, theme = TRACKER_THEMES.middle, mementos = [], onOpenMemento, selectedMemento, entrance = null, statItems = [], onClearSelection, onGoPlay }) {
  const earnedBadges = badges.filter((badge) => badge.earned);
  const earnedMementos = mementos.filter((memento) => memento.completed);
  const stageWrapRef = useRef(null);
  const [stageWidth, setStageWidth] = useState(0);

  useEffect(() => {
    const measure = () => setStageWidth(stageWrapRef.current?.clientWidth || 0);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // The inspector anchors to whichever stage slot was clicked (or picked in
  // the drawer): badges live in the theme slot map, mementos carry their own.
  const slots = theme.roomSlots || roomSlots;
  const inspected = selectedBadge
    ? { type: "badge", id: selectedBadge.id, badge: selectedBadge }
    : selectedMemento
      ? { type: "memento", id: selectedMemento.item.id, memento: selectedMemento }
      : null;
  const inspectedSlot = selectedBadge
    ? slots.find((slot) => slot.id === selectedBadge.id)
    : selectedMemento
      ? mementos.find((memento) => memento.item.id === selectedMemento.item.id)?.slot
      : null;

  const inspectFromDrawer = (open) => {
    open();
    stageWrapRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  };

  return (
    <section
      data-testid="mastery-badge-trophy-room"
      style={{
        border: `1px solid ${C.gold}35`,
        borderRadius: 10,
        background: "rgba(8,18,32,0.5)",
        padding: "14px 15px",
        marginTop: 18,
      }}
    >
      <style>{`
        .thought-progress-badge-tile {
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
        }
        .thought-progress-badge-tile:hover {
          transform: translateY(-2px);
          border-color: ${C.gold};
        }
        .thought-progress-badge-new:hover {
          box-shadow: 0 0 38px ${C.gold}76, inset 0 0 0 1px ${C.gold}44 !important;
        }
        .thought-progress-room-slot {
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease, filter 180ms ease;
        }
        .thought-progress-room-slot:hover {
          transform: translate(-50%, -50%) scale(1.08) !important;
          border-color: ${C.gold} !important;
          filter: saturate(1.12);
        }
        .wonder-memento {
          transition: transform 140ms steps(2, end);
        }
        .wonder-memento::before {
          content: "";
          position: absolute;
          inset: -9px;
        }
        .wonder-stage-inspector button:focus-visible {
          outline: 3px solid ${C.gold};
          outline-offset: -3px;
        }
        .wonder-memento:hover,
        .wonder-memento:focus-visible {
          transform: translate(-50%, -50%) scale(1.18);
        }
        @keyframes wonder-question-pulse {
          0%, 100% { border-color: ${C.gold}55; color: ${C.teal}; }
          50% { border-color: ${C.gold}99; color: ${C.gold}; }
        }
        .wonder-memento-question {
          animation: wonder-question-pulse 6s steps(2, end) infinite;
        }
        .wonder-memento:hover .wonder-memento-question,
        .wonder-memento:focus-visible .wonder-memento-question {
          border-color: ${C.gold};
          color: ${C.gold};
          animation: none;
        }
        .wonder-memento:focus-visible {
          outline: 2px solid ${C.gold};
          outline-offset: 2px;
        }
        @keyframes wonder-inspector-pop {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .wonder-stage-inspector {
          animation: wonder-inspector-pop 160ms steps(3, end) both;
        }
        @keyframes wonder-room-prev-fade {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        .wonder-room-entrance .wonder-room-prev {
          animation: wonder-room-prev-fade 900ms steps(4, end) 380ms both;
        }
        @keyframes wonder-room-flash {
          0% { filter: brightness(0.72); }
          55% { filter: brightness(1.22) saturate(1.1); }
          100% { filter: brightness(1); }
        }
        .wonder-room-entrance {
          animation: wonder-room-flash 1400ms ease 380ms both;
        }
        @keyframes wonder-memento-pop {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
          60% { transform: translate(-50%, -50%) scale(1.3); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
        .wonder-room-entrance .wonder-memento-new {
          animation: wonder-memento-pop 460ms steps(3, end) both;
          animation-delay: calc(900ms + var(--pop-delay, 0ms));
        }
        @media (prefers-reduced-motion: reduce) {
          .thought-progress-badge-tile,
          .thought-progress-room-slot,
          .wonder-memento {
            transition: none;
          }
          .thought-progress-badge-tile:hover {
            transform: none;
          }
          .thought-progress-room-slot:hover {
            transform: translate(-50%, -50%) !important;
          }
          .wonder-memento:hover,
          .wonder-memento:focus-visible {
            transform: translate(-50%, -50%);
          }
          .wonder-room-entrance,
          .wonder-room-entrance .wonder-room-prev,
          .wonder-room-entrance .wonder-memento-new,
          .wonder-memento-question,
          .wonder-stage-inspector {
            animation: none;
          }
          .wonder-room-entrance .wonder-room-prev {
            opacity: 0;
          }
        }
      `}</style>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 10, flexWrap: "wrap" }}>
        <p style={{ color: accent, fontSize: "0.68rem", fontWeight: 900, letterSpacing: "0.13em", textTransform: "uppercase", margin: 0 }}>
          Trophy Room
        </p>
        <span style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
          {mementos.length > 0 && (
            <span
              data-testid="wonder-memento-counter"
              style={{
                color: C.textPrimary,
                fontSize: "0.78rem",
                fontWeight: 900,
                border: `1px solid ${C.gold}45`,
                borderRadius: 999,
                padding: "4px 8px",
                background: `${C.gold}12`,
              }}
            >
              {earnedMementos.length}/{mementos.length} mementos
            </span>
          )}
          <span
            data-testid="mastery-badge-counter"
            style={{
              color: C.textPrimary,
              fontSize: "0.78rem",
              fontWeight: 900,
              border: `1px solid ${C.teal}45`,
              borderRadius: 999,
              padding: "4px 8px",
              background: `${C.teal}12`,
            }}
          >
            {earnedBadges.length}/{badges.length}
          </span>
        </span>
      </div>
      <div ref={stageWrapRef} style={{ position: "relative", "--stage-w": `${stageWidth || 1000}px` }}>
        <TrophyRoomStage badges={badges} roomTier={roomTier} onOpenBadge={onOpenBadge} sfx={sfx} theme={theme} mementos={mementos} onOpenMemento={onOpenMemento} entrance={entrance} />
        {inspected && inspectedSlot && (
          <StageInspector
            inspected={inspected}
            slot={inspectedSlot}
            stageWidth={stageWidth}
            anchorHalf={slotHalfSize(inspected.type, stageWidth)}
            accent={accent}
            theme={theme}
            onClose={onClearSelection}
            onGoPlay={onGoPlay}
          />
        )}
      </div>
      <CollectionDrawer
        badges={badges}
        mementos={mementos}
        statItems={statItems}
        statAssets={theme.assets?.stats}
        badgeAssets={theme.assets?.badges}
        accent={accent}
        sfx={sfx}
        onInspectBadge={(badge) => inspectFromDrawer(() => onOpenBadge(badge))}
        onInspectMemento={(memento) => inspectFromDrawer(() => onOpenMemento(memento.item, memento.completed))}
      />
    </section>
  );
}

function ProgressRoomInvitation({ earnedBadges, totalBadges, earnedAchievements, totalAchievements, onOpen, accent, opening, theme = TRACKER_THEMES.middle, doorAnchorRef = null }) {
  return (
    <div
      className="progress-room-invitation"
      style={{
        display: "grid",
        gridTemplateColumns: "86px minmax(0, 1fr) 118px",
        gap: 11,
        alignItems: "center",
        padding: "10px 12px",
        borderRadius: 10,
        border: `3px solid ${C.gold}42`,
        background: `linear-gradient(135deg, rgba(5,12,24,0.95), ${accent}0f 44%, rgba(44,211,200,0.1))`,
        marginTop: 14,
        boxShadow: `0 18px 46px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(255,255,255,0.04), inset 0 -7px 0 rgba(0,0,0,0.12), 0 0 28px ${C.gold}12`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div aria-hidden="true" style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(transparent 50%, rgba(255,255,255,0.025) 50%)",
        backgroundSize: "100% 4px",
        pointerEvents: "none",
        opacity: 0.35,
      }} />
      <AnimatedAriInvite theme={theme} />
      <div>
        <p className="progress-room-invitation-eyebrow" style={{ color: C.gold, fontSize: "0.68rem", fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>
          {theme.invitationEyebrow}
        </p>
        <p className="progress-room-invitation-copy" style={{ color: C.textPrimary, fontWeight: 900, lineHeight: 1.25, marginBottom: 4 }}>
          {theme.invitationCopy}
        </p>
        <p className="progress-room-invitation-counts" style={{ color: C.textSecondary, fontSize: "0.78rem", lineHeight: 1.45, margin: 0 }}>
          {theme.invitationCounts({ earnedBadges, totalBadges, earnedAchievements, totalAchievements })}
        </p>
      </div>
      <ProgressRoomDoorButton onOpen={onOpen} opening={opening} theme={theme} buttonRef={doorAnchorRef} />
    </div>
  );
}

function ProgressRoomSoundToggle({ muted, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={muted ? "Turn Progress Room sounds on" : "Turn Progress Room sounds off"}
      aria-pressed={!muted}
      style={{
        height: 40,
        padding: "0 11px",
        borderRadius: 8,
        border: `1px solid ${muted ? C.border : C.gold + "66"}`,
        background: muted ? "rgba(255,255,255,0.04)" : `${C.gold}18`,
        color: muted ? C.textSecondary : C.gold,
        cursor: "pointer",
        fontSize: "0.76rem",
        fontWeight: 900,
        whiteSpace: "nowrap",
      }}
    >
      {muted ? "Sound off" : "Sound on"}
    </button>
  );
}

function ProgressRoomModal({
  open,
  onClose,
  badges,
  achievements,
  brain,
  accent,
  onOpenBadge,
  selectedBadge,
  sfx,
  theme = TRACKER_THEMES.middle,
  statItems = [],
  mementoItems = [],
  progress = null,
  onOpenMemento,
  selectedMemento,
  onClearSelection,
  onGoPlay,
}) {
  const [activeTab, setActiveTab] = useState("trophies");
  const [entrance, setEntrance] = useState(null);
  const modalBodyRef = useRef(null);
  const closeButtonRef = useRef(null);
  const roomTier = getProgressRoomTier({ brain, badges, achievements });
  const earnedBadges = badges.filter((badge) => badge.earned);
  const earnedAchievements = achievements.filter((achievement) => achievement.earned);
  const completedIds = mementoItems
    .filter((item) => progress?.experiments?.[item.id]?.completed)
    .map((item) => item.id);
  const mementos = mementoItems.map((item, index) => ({
    slot: K5_MEMENTO_SLOTS[index % K5_MEMENTO_SLOTS.length],
    item,
    completed: completedIds.includes(item.id),
    isNew: Boolean(entrance?.newIds?.includes(item.id)),
  }));
  const tabs = [
    { id: "trophies", label: "Trophy Room", count: `${earnedBadges.length}/${badges.length}` },
    ...(theme.showAchievementsTab && achievements.length
      ? [{ id: "achievements", label: "Game Achievements", count: `${earnedAchievements.length}/${achievements.length}` }]
      : []),
  ];

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => closeButtonRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  // Ambient workshop loop: the door click that opened the modal satisfies
  // autoplay policy; mute (toggled live or persisted) silences it.
  useEffect(() => {
    if (!open || sfx.muted) {
      wonderMusic.stop();
      return undefined;
    }
    wonderMusic.start();
    return () => wonderMusic.stop();
  }, [open, sfx.muted]);

  // Remember what the room looked like so the next visit can play a
  // "lights coming on" entrance for anything earned in between.
  useEffect(() => {
    if (!open || !mementoItems.length) return undefined;
    const seen = readRoomSeen();
    const diff = diffRoomEntrance({ seen, roomTier, completedIds, badgeCount: earnedBadges.length });
    const reducedMotion = typeof window !== "undefined"
      && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    setEntrance(diff.shouldAnimate && !reducedMotion ? { prevTier: diff.prevTier, newIds: diff.newIds } : null);
    return () => {
      writeRoomSeen({ tier: roomTier, completedIds, badgeCount: earnedBadges.length });
      setEntrance(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (open || !theme.showAchievementsTab) setActiveTab("trophies");
  }, [open, theme.showAchievementsTab]);

  if (!open) return null;

  const trapFocus = (event) => {
    if (event.key === "Escape") {
      // Layered dismissal: a first Escape closes the open inspector and
      // returns focus to its slot; only a second Escape closes the room.
      if (selectedBadge || selectedMemento) {
        onClearSelection?.();
        return;
      }
      onClose();
      return;
    }
    if (event.key !== "Tab" || !modalBodyRef.current) return;
    const focusables = modalBodyRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      data-testid="progress-room-modal"
      className="progress-room-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="progress-room-title"
      onKeyDown={trapFocus}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        display: "grid",
        placeItems: "center",
        padding: 18,
        background: "rgba(2,8,16,0.76)",
        backdropFilter: "blur(10px)",
      }}
    >
      <style>{`
        .progress-room-shell {
          animation: progress-room-rise 220ms ease both;
        }
        @keyframes progress-room-rise {
          from { opacity: 0; transform: translateY(12px) scale(0.99); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .progress-room-tab {
          transition: border-color 160ms ease, background 160ms ease, color 160ms ease;
        }
        .progress-room-tab:hover {
          border-color: ${C.gold}55 !important;
          background: rgba(255,255,255,0.07) !important;
          color: ${C.textPrimary} !important;
        }
        .progress-room-tab:focus-visible {
          outline: 3px solid ${C.gold};
          outline-offset: -3px;
        }
        .progress-room-tab[aria-selected="true"] {
          background: ${C.gold}18 !important;
          border-color: ${C.gold}77 !important;
          color: ${C.gold} !important;
        }
        @media (max-width: 720px) {
          .progress-room-overlay {
            padding: 0 !important;
            place-items: stretch !important;
          }
          .progress-room-shell {
            width: 100% !important;
            height: 100vh !important;
            max-height: 100vh !important;
            overflow-y: auto !important;
            -webkit-overflow-scrolling: touch;
            border-radius: 0 !important;
          }
          .progress-room-header {
            grid-template-columns: minmax(0, 1fr) auto !important;
          }
          .progress-room-header > div:first-child {
            grid-column: 1 / -1;
          }
          .progress-room-header > button:first-of-type {
            grid-column: 1 / 2;
            width: 100%;
          }
          .progress-room-header > button:last-of-type {
            grid-column: 2 / 3;
            grid-row: 2;
          }
          .progress-room-tabs {
            grid-column: 1 / -1;
            width: 100%;
            overflow-x: auto;
          }
          .progress-room-invitation {
            grid-template-columns: minmax(0, 1fr) !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .progress-room-shell {
            animation: none;
          }
          .progress-room-tab {
            transition: none;
          }
        }
      `}</style>
      <div
        className="progress-room-scrim"
        aria-hidden="true"
        onClick={onClose}
        style={{ position: "absolute", inset: 0 }}
      />
      <div
        ref={modalBodyRef}
        className="progress-room-shell"
        style={{
          position: "relative",
          width: "min(1080px, 100%)",
          maxHeight: "calc(100vh - 42px)",
          overflowY: "auto",
          borderRadius: 12,
          border: `2px solid ${C.gold}45`,
          background: `linear-gradient(145deg, rgba(5,12,24,0.98), rgba(13,27,46,0.98))`,
          boxShadow: "0 40px 110px rgba(0,0,0,0.54)",
        }}
      >
        <div
          className="progress-room-header"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) auto auto",
            gap: 12,
            alignItems: "start",
            padding: "18px 20px 12px",
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          <div>
            <p style={{ color: accent, fontSize: "0.68rem", fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 5 }}>
              {theme.modalEyebrow}
            </p>
            <h2 id="progress-room-title" style={{ color: C.textPrimary, fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.55rem", lineHeight: 1.15, margin: 0 }}>
              {theme.modalTitle}
            </h2>
            <p style={{ color: C.textSecondary, fontSize: "0.84rem", lineHeight: 1.55, marginTop: 7, maxWidth: 680 }}>
              {theme.modalCopy}
            </p>
          </div>
          <ProgressRoomSoundToggle muted={sfx.muted} onToggle={sfx.toggleMuted} />
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close Progress Room"
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              border: `1px solid ${C.border}`,
              background: "rgba(255,255,255,0.04)",
              color: C.textPrimary,
              cursor: "pointer",
              fontSize: "1.2rem",
              fontWeight: 900,
              lineHeight: 1,
            }}
          >
            ×
          </button>
          <div
            role="tablist"
            aria-label="Progress Room sections"
            className="progress-room-tabs"
            style={{ display: "flex", gap: 8, flexWrap: "wrap", gridColumn: "1 / -1" }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`progress-room-${tab.id}`}
                id={`progress-room-tab-${tab.id}`}
                className="progress-room-tab"
                onClick={() => {
                  sfx.play("tab");
                  setActiveTab(tab.id);
                }}
                style={{
                  borderRadius: 8,
                  border: `1px solid ${C.border}`,
                  background: "rgba(255,255,255,0.035)",
                  color: C.textSecondary,
                  padding: "8px 10px",
                  cursor: "pointer",
                  fontSize: "0.78rem",
                  fontWeight: 900,
                }}
              >
                {tab.label} · {tab.count}
              </button>
            ))}
          </div>
        </div>

        <div style={{ padding: "16px 18px 20px" }}>
          {activeTab === "trophies" ? (
            <div
              id="progress-room-trophies"
              role="tabpanel"
              aria-labelledby="progress-room-tab-trophies"
            >
              <MasteryBadgeTrophyRoom
                badges={badges}
                accent={accent}
                onOpenBadge={onOpenBadge}
                selectedBadge={selectedBadge}
                roomTier={roomTier}
                sfx={sfx}
                theme={theme}
                mementos={mementos}
                onOpenMemento={onOpenMemento}
                selectedMemento={selectedMemento}
                entrance={entrance}
                statItems={statItems}
                onClearSelection={onClearSelection}
                onGoPlay={onGoPlay}
              />
            </div>
          ) : (
            <div
              id="progress-room-achievements"
              role="tabpanel"
              aria-labelledby="progress-room-tab-achievements"
            >
              <GameAchievementsSection achievements={achievements} compactCards={false} accent={accent} sfx={sfx} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ThoughtProgressPanel({
  variant = "compact",
  navigate,
  title = "Ari's Goal Tracker",
  accent = C.gold,
  experimentIds = [],
  achievementIds = ACHIEVEMENT_IDS,
  trackerTheme = "middle",
  badgeSetId = "middle",
  mementoItems = [],
  celebrateExperimentId = null,
}) {
  const { progress, summary, reset, recordEvent } = useThoughtProgress();
  const theme = TRACKER_THEMES[trackerTheme] || TRACKER_THEMES.middle;
  const panelTitle = title || theme.defaultTitle;
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [selectedMemento, setSelectedMemento] = useState(null);
  const [progressRoomOpen, setProgressRoomOpen] = useState(false);
  const [doorOpening, setDoorOpening] = useState(false);
  const previousFocusRef = useRef(null);
  const inspectorReturnRef = useRef(null);
  const doorTimerRef = useRef(null);
  const doorAnchorRef = useRef(null);
  const { iris, run: runIris } = useIrisTransition();
  const sfx = useProgressRoomSfx();
  const achievements = theme.showAchievementsTab ? getAchievementStatus(progress, achievementIds) : [];
  const brain = getBrainProgress(progress, { experimentIds, achievementIds });
  const badgeStatus = getBadgeStatus(progress, { badgeSetId, experimentIds });
  const earnedBadges = badgeStatus.filter((badge) => badge.earned);
  const earnedAchievements = achievements.filter((achievement) => achievement.earned);
  const scopedSummary = experimentIds.length
    ? {
      ...summary,
      completedExperiments: experimentIds.filter((id) => progress.experiments[id]?.completed).length,
      replayCount: experimentIds.reduce((total, id) => total + (progress.experiments[id]?.restarts || 0), 0),
      totalChoices: experimentIds.reduce((total, id) => total + (progress.experiments[id]?.choiceCount || 0), 0),
    }
    : summary;
  const statItems = theme.stats({ summary: scopedSummary, earnedBadges, earnedAchievements, achievements, brain });
  const isFull = variant === "full";
  const isHud = variant === "hud";
  const isIntro = variant === "intro";
  const compactCards = isHud || variant === "compact";
  const showRewardSectionsInline = false;

  const openBadge = (badge) => {
    sfx.play(badge.isNew ? "newTrophyFanfare" : badge.earned ? "trophyEarned" : "lockedTrophy");
    if (typeof document !== "undefined") inspectorReturnRef.current = document.activeElement;
    setSelectedBadge(badge);
    setSelectedMemento(null);
    if (badge.earned && badge.isNew) {
      recordEvent({ type: "badge_viewed", badgeId: badge.id });
    }
  };

  const openMemento = (item, completed) => {
    sfx.play(completed ? "trophyEarned" : "lockedTrophy");
    if (typeof document !== "undefined") inspectorReturnRef.current = document.activeElement;
    setSelectedMemento({ item, completed });
    setSelectedBadge(null);
  };

  // Close the stage inspector and hand focus back to the slot that opened it.
  const clearSelection = () => {
    setSelectedBadge(null);
    setSelectedMemento(null);
    if (typeof window !== "undefined") {
      window.setTimeout(() => inspectorReturnRef.current?.focus?.(), 0);
    }
  };

  // "Go play it" inside a locked memento: leave the room, open the story.
  const goPlayMemento = (item) => {
    if (!navigate || !item?.route) return;
    clearSelection();
    setProgressRoomOpen(false);
    navigate(`${item.route}?experiment=${item.id}`);
  };

  const openProgressRoom = () => {
    if (typeof document !== "undefined") {
      previousFocusRef.current = document.activeElement;
    }
    sfx.markInteracted();
    sfx.play("roomEnter");
    setProgressRoomOpen(true);
  };

  const openProgressRoomDoor = () => {
    if (doorOpening) return;
    sfx.markInteracted();
    sfx.play("doorOpen");
    const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      openProgressRoom();
      return;
    }
    setDoorOpening(true);
    if (doorTimerRef.current) window.clearTimeout(doorTimerRef.current);
    doorTimerRef.current = window.setTimeout(() => {
      setDoorOpening(false);
      // Iris wipe: the workshop swallows the screen from the door outward.
      runIris(doorAnchorRef.current, openProgressRoom);
    }, DOOR_OPEN_DELAY_MS);
  };

  const closeProgressRoom = () => {
    sfx.play("roomClose");
    setProgressRoomOpen(false);
    if (typeof window !== "undefined") {
      window.setTimeout(() => previousFocusRef.current?.focus?.(), 0);
    }
  };

  useEffect(() => () => {
    if (doorTimerRef.current) window.clearTimeout(doorTimerRef.current);
  }, []);

  if (isHud) {
    return (
      <aside
        aria-label="Ari's Goal Tracker game HUD"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          flex: "1 1 300px",
          maxWidth: "100%",
          boxSizing: "border-box",
          padding: "9px 11px",
          borderRadius: 8,
          border: `1px solid ${accent}45`,
          background: "rgba(8,18,32,0.82)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.24)",
        }}
      >
        <style>{WONDER_CORE_CSS}</style>
        <BrainProgressIcon brain={brain} size="hud" theme={theme} />
        <div style={{ minWidth: 0, overflowWrap: "anywhere" }}>
          <p style={{ color: accent, fontSize: "0.62rem", fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>
            {theme.hudLabel}
          </p>
          <p style={{ color: C.textPrimary, fontSize: "0.78rem", fontWeight: 800, marginBottom: 5 }}>
            {earnedAchievements.length}/{achievements.length} {theme.hudSkillLabel}
          </p>
          <p style={{ color: C.textMuted, fontSize: "0.68rem", lineHeight: 1.35 }}>
            Next mission: {hudNextGoalText({ brain, badges: badgeStatus, achievements })}
          </p>
        </div>
      </aside>
    );
  }

  return (
    <section
      className="thought-progress-panel"
      aria-label="Thought experiment thinking progress"
      style={isIntro ? { margin: 0 } : {
        border: `1px solid ${accent}32`,
        borderRadius: 12,
        background: `linear-gradient(135deg, ${C.surface}, ${accent}08)`,
        padding: isFull ? "20px 22px" : "16px 18px",
        margin: isFull ? "0 0 22px" : "18px 0 28px",
        maxHeight: "none",
        overflowY: "visible",
      }}
    >
      <style>{WONDER_CORE_CSS}</style>
      <style>{`
        @media (max-width: 720px) {
          .thought-progress-heading-grid {
            grid-template-columns: minmax(0, 1fr) 112px !important;
            gap: 12px !important;
            align-items: start !important;
          }
          .thought-progress-panel .thought-progress-brain-frame {
            width: 108px !important;
          }
          .progress-room-invitation {
            grid-template-columns: 82px minmax(0, 1fr) !important;
            gap: 10px !important;
            padding: 10px 11px !important;
          }
          .progress-room-invitation .progress-room-ari-invite-frame {
            width: 82px !important;
          }
          .progress-room-invitation .progress-room-door-button {
            grid-column: 1 / -1;
            justify-self: start;
            width: min(100%, 150px) !important;
            min-height: 124px !important;
          }
        }
        @media (max-width: 430px) {
          .thought-progress-heading-grid {
            grid-template-columns: minmax(0, 1fr) !important;
          }
        }
      `}</style>
      {isIntro ? (
        <WonderDashboard
          theme={theme}
          accent={accent}
          panelTitle={panelTitle}
          brain={brain}
          badges={badgeStatus}
          achievements={achievements}
          earnedBadges={earnedBadges}
          onOpenDoor={openProgressRoomDoor}
          doorOpening={doorOpening}
          celebrate={Boolean(celebrateExperimentId)}
          doorAnchorRef={doorAnchorRef}
        />
      ) : (
        <>
          <div className="thought-progress-heading-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: 18, alignItems: "center", marginBottom: 16 }}>
            <div>
              <p style={{
                color: accent,
                fontSize: "0.68rem",
                fontWeight: 900,
                letterSpacing: "0.13em",
                textTransform: "uppercase",
                marginBottom: 5,
              }}>
                {theme.eyebrow}
              </p>
              <h3 style={{
                color: C.textPrimary,
                fontFamily: "'Source Serif 4', Georgia, serif",
                fontSize: isFull ? "1.55rem" : "1.2rem",
                lineHeight: 1.2,
                margin: 0,
              }}>
                {panelTitle}
              </h3>
              <p style={{ color: C.textSecondary, fontSize: "0.86rem", lineHeight: 1.6, marginTop: 7 }}>
                {theme.fullCopy}
              </p>
              <p style={{
                color: C.textPrimary,
                fontSize: "0.82rem",
                lineHeight: 1.5,
                marginTop: 10,
                padding: "9px 11px",
                borderRadius: 8,
                border: `1px solid ${C.teal}30`,
                background: `${C.teal}0e`,
              }}>
                <strong style={{ color: C.teal }}>{theme.nextLabel}:</strong> {nextGoalText({ brain, badges: badgeStatus, achievements })}
              </p>
            </div>
            <BrainProgressIcon brain={brain} theme={theme} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 10, marginBottom: isFull ? 18 : 12 }}>
            {statItems.map((item) => (
              <PixelTrackerStat
                key={item.label}
                label={item.label}
                value={item.value}
                color={item.color}
                icon={item.icon}
                statAssets={theme.assets.stats}
              />
            ))}
          </div>

          {isFull && (
            <div style={{ display: "grid", gap: 12, marginBottom: 18 }}>
              {DIMENSIONS.map((item) => (
                <DimensionBar key={item.key} item={item} value={summary[item.key] || 0} />
              ))}
            </div>
          )}

          {(isFull || variant === "compact") && (
            <ProgressRoomInvitation
              earnedBadges={earnedBadges}
              totalBadges={badgeStatus.length}
              earnedAchievements={earnedAchievements}
              totalAchievements={achievements.length}
              onOpen={openProgressRoomDoor}
              accent={accent}
              opening={doorOpening}
              theme={theme}
              doorAnchorRef={doorAnchorRef}
            />
          )}
        </>
      )}

      {showRewardSectionsInline && (
        <GameAchievementsSection achievements={achievements} compactCards={compactCards} accent={accent} sfx={sfx} />
      )}

      {showRewardSectionsInline && (
        <MasteryBadgeTrophyRoom
          badges={badgeStatus}
          accent={accent}
          onOpenBadge={openBadge}
          selectedBadge={selectedBadge}
          roomTier={getProgressRoomTier({ brain, badges: badgeStatus, achievements })}
          sfx={sfx}
          theme={theme}
        />
      )}

      {isFull && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginTop: 18 }}>
          {navigate && (
            <button
              type="button"
              onClick={() => navigate("thought-experiments/journal")}
              style={{
                padding: "8px 13px",
                borderRadius: 8,
                border: `1px solid ${accent}55`,
                background: "transparent",
                color: accent,
                cursor: "pointer",
                fontSize: "0.78rem",
                fontWeight: 800,
              }}
            >
              Open journal
            </button>
          )}
          {isFull && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Clear your local Thought Experiments progress from this browser? Your Decision Journal entries will stay unless you clear them separately.")) {
                  reset();
                }
              }}
              style={{
                padding: "8px 13px",
                borderRadius: 8,
                border: `1px solid ${C.border}`,
                background: "transparent",
                color: C.textMuted,
                cursor: "pointer",
                fontSize: "0.78rem",
                fontWeight: 700,
              }}
            >
              Reset progress
            </button>
          )}
          <p style={{ color: C.textMuted, fontSize: "0.76rem", lineHeight: 1.5 }}>
            This is your personal practice space. No account or classroom leaderboard is part of it.
          </p>
        </div>
      )}

      <ProgressRoomModal
        open={progressRoomOpen}
        onClose={closeProgressRoom}
        badges={badgeStatus}
        achievements={achievements}
        brain={brain}
        accent={accent}
        onOpenBadge={openBadge}
        selectedBadge={selectedBadge}
        sfx={sfx}
        theme={theme}
        statItems={statItems}
        mementoItems={mementoItems}
        progress={progress}
        onOpenMemento={openMemento}
        selectedMemento={selectedMemento}
        onClearSelection={clearSelection}
        onGoPlay={goPlayMemento}
      />
      <IrisOverlay iris={iris} />
    </section>
  );
}
