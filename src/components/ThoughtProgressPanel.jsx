import { useCallback, useEffect, useRef, useState } from "react";
import {
  BRAIN_PROGRESS_ASSETS,
  DEEPFAKE_GAME_ASSETS,
  K5_BRAIN_PROGRESS_ASSETS,
  K5_MASTERY_BADGE_ASSETS,
  K5_PROGRESS_ROOM_ARI_INVITE_ASSETS,
  K5_PROGRESS_ROOM_ARI_INVITE_FRAMES,
  K5_PROGRESS_ROOM_BACKDROPS,
  K5_PROGRESS_ROOM_DOOR_ASSETS,
  K5_PROGRESS_ROOM_STAT_ASSETS,
  MASTERY_BADGE_ASSETS,
  PROGRESS_ROOM_ARI_INVITE_ASSETS,
  PROGRESS_ROOM_ARI_INVITE_FRAMES,
  PROGRESS_ROOM_ARI_INVITE_SEQUENCE,
  PROGRESS_ROOM_BACKDROPS,
  PROGRESS_ROOM_DOOR_ASSETS,
  PROGRESS_ROOM_STAT_ASSETS,
} from "../data/deepfakeGameAssets.js";
import { ACHIEVEMENTS, getAchievementStatus, getBadgeStatus, getBrainProgress } from "../lib/thoughtProgress.js";
import { C } from "../theme.js";
import useThoughtProgress from "../hooks/useThoughtProgress.js";

const DIMENSIONS = [
  { key: "completedExperiments", label: "Dilemmas finished", max: 6, color: C.teal },
  { key: "lensCount", label: "Reasoning lenses", max: 6, color: C.gold },
  { key: "steelmanSaveCount", label: "Steelmans saved", max: 4, color: C.coral },
  { key: "topicCount", label: "Topic breadth", max: 6, color: C.ocean },
];

const ACHIEVEMENT_IDS = ACHIEVEMENTS.map((achievement) => achievement.id);
const PIXEL_FRAME_RATIOS = {
  brain: "260 / 190",
  achievement: "16 / 9",
  badge: "1 / 1",
  portrait: "1 / 1",
  sprite: "1 / 1",
};

const roomSlots = [
  { id: "first-dilemma", left: "17%", top: "62%" },
  { id: "careful-verifier", left: "31%", top: "50%" },
  { id: "steelman-builder", left: "45%", top: "60%" },
  { id: "lens-explorer", left: "58%", top: "48%" },
  { id: "second-thought", left: "71%", top: "62%" },
  { id: "topic-wanderer", left: "82%", top: "49%" },
  { id: "consistent-thinker", left: "50%", top: "32%" },
];

const k5RoomSlots = [
  { id: "k5-first-wonder", left: "18%", top: "64%" },
  { id: "k5-story-explorer", left: "31%", top: "50%" },
  { id: "k5-kind-thinker", left: "43%", top: "64%" },
  { id: "k5-question-asker", left: "55%", top: "48%" },
  { id: "k5-rule-helper", left: "68%", top: "63%" },
  { id: "k5-try-again-explorer", left: "79%", top: "47%" },
  { id: "k5-topic-trailblazer", left: "50%", top: "31%" },
];

const TRACKER_THEMES = {
  middle: {
    key: "middle",
    eyebrow: "Ari's progress map",
    defaultTitle: "Ari's Goal Tracker",
    introCopy: "Ari is watching for the thinking moves that make your reasoning stronger.",
    fullCopy: "Finish dilemmas, practice verification, save reflections, and light up the brain network one careful move at a time.",
    nextLabel: "Next goal",
    hudLabel: "Ari's Goal Tracker",
    hudSkillLabel: "Deepfake skills earned",
    modalEyebrow: "Ari's Goal Tracker",
    modalTitle: "Progress Room",
    modalCopy: "Your thinking room is starting to light up. The more carefully you test ideas, check evidence, and explain your choices, the more this room fills in.",
    invitationEyebrow: "Ari left you a room key",
    invitationCopy: "Your room is lighting up.",
    invitationCounts: ({ earnedBadges, totalBadges, earnedAchievements, totalAchievements }) => (
      `${earnedBadges.length}/${totalBadges} trophies · ${earnedAchievements.length}/${totalAchievements} skills. Open the room to see what you've unlocked.`
    ),
    doorLabel: "Open Progress Room",
    roomReadyLabel: "Room ready",
    showAchievementsTab: true,
    roomSlots,
    assets: {
      brainProgress: BRAIN_PROGRESS_ASSETS,
      badges: MASTERY_BADGE_ASSETS,
      roomBackdrops: PROGRESS_ROOM_BACKDROPS,
      ariFrames: PROGRESS_ROOM_ARI_INVITE_FRAMES,
      ariAssets: PROGRESS_ROOM_ARI_INVITE_ASSETS,
      ariSequence: PROGRESS_ROOM_ARI_INVITE_SEQUENCE,
      door: PROGRESS_ROOM_DOOR_ASSETS,
      stats: PROGRESS_ROOM_STAT_ASSETS,
    },
    stats: ({ summary, earnedBadges, earnedAchievements, achievements, brain }) => [
      { label: "Done", value: summary.completedExperiments, color: C.teal, icon: "finished" },
      { label: "Trophies", value: earnedBadges.length, color: C.gold, icon: "badges" },
      { label: "Skills", value: `${earnedAchievements.length}/${achievements.length}`, color: C.coral, icon: "skills" },
      { label: "Brain", value: `${brain.completedGoals}/${brain.totalGoals || 0}`, color: C.ocean, icon: "brain" },
    ],
  },
  k5: {
    key: "k5",
    eyebrow: "Ari's Wonder Workshop",
    defaultTitle: "Ari's Wonder Workshop",
    introCopy: "Your thinking lights are turning on as you try stories, ask questions, and help classmates think kindly.",
    fullCopy: "Try stories, explain your choices, ask good questions, and light up the Wonder Workshop one careful idea at a time.",
    nextLabel: "Next spark",
    hudLabel: "Ari's Wonder Workshop",
    hudSkillLabel: "wonder skills earned",
    modalEyebrow: "Ari's Wonder Workshop",
    modalTitle: "Wonder Workshop",
    modalCopy: "Your thinking lights are turning on. Each story you finish and each kind thinking move you practice adds more color to the workshop.",
    invitationEyebrow: "Ari saved you a workshop key",
    invitationCopy: "Your Wonder Workshop is waking up.",
    invitationCounts: ({ earnedBadges, totalBadges }) => (
      `${earnedBadges.length}/${totalBadges} trophies. Open the workshop to see what you've earned.`
    ),
    doorLabel: "Open Workshop",
    roomReadyLabel: "Workshop ready",
    showAchievementsTab: false,
    roomSlots: k5RoomSlots,
    assets: {
      brainProgress: K5_BRAIN_PROGRESS_ASSETS,
      badges: K5_MASTERY_BADGE_ASSETS,
      roomBackdrops: K5_PROGRESS_ROOM_BACKDROPS,
      ariFrames: K5_PROGRESS_ROOM_ARI_INVITE_FRAMES,
      ariAssets: K5_PROGRESS_ROOM_ARI_INVITE_ASSETS,
      ariSequence: PROGRESS_ROOM_ARI_INVITE_SEQUENCE,
      door: K5_PROGRESS_ROOM_DOOR_ASSETS,
      stats: K5_PROGRESS_ROOM_STAT_ASSETS,
    },
    stats: ({ summary, earnedBadges, brain }) => [
      { label: "Stories", value: summary.completedExperiments, color: C.teal, icon: "finished" },
      { label: "Trophies", value: earnedBadges.length, color: C.gold, icon: "badges" },
      { label: "Tries", value: summary.replayCount, color: C.coral, icon: "skills" },
      { label: "Lights", value: `${brain.completedGoals}/${brain.totalGoals || 0}`, color: C.ocean, icon: "brain" },
    ],
  },
};

const SFX_STORAGE_KEY = "thoughtProgressRoomSfxMuted";
const DOOR_OPEN_DELAY_MS = 560;

function useProgressRoomSfx() {
  const [muted, setMuted] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(SFX_STORAGE_KEY) === "true";
  });
  const ctxRef = useRef(null);
  const hasInteractedRef = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(SFX_STORAGE_KEY, muted ? "true" : "false");
    }
  }, [muted]);

  const markInteracted = useCallback(() => {
    hasInteractedRef.current = true;
  }, []);

  const tone = useCallback((frequency, delay, duration, type = "square", gain = 0.035) => {
    if (typeof window === "undefined") return;
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtor) return;
    if (!ctxRef.current) ctxRef.current = new AudioCtor();
    const ctx = ctxRef.current;
    const oscillator = ctx.createOscillator();
    const volume = ctx.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime + delay);
    volume.gain.setValueAtTime(0.0001, ctx.currentTime + delay);
    volume.gain.exponentialRampToValueAtTime(gain, ctx.currentTime + delay + 0.01);
    volume.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + duration);
    oscillator.connect(volume);
    volume.connect(ctx.destination);
    oscillator.start(ctx.currentTime + delay);
    oscillator.stop(ctx.currentTime + delay + duration + 0.02);
  }, []);

  const play = useCallback((cue, options = {}) => {
    if ((muted && !options.force) || !hasInteractedRef.current) return;
    const cues = {
      roomEnter: [[262, 0, 0.06, "triangle", 0.028], [392, 0.07, 0.08], [523, 0.15, 0.08], [784, 0.24, 0.12]],
      roomClose: [[247, 0, 0.07, "triangle", 0.025], [196, 0.08, 0.09, "triangle", 0.02]],
      tab: [[660, 0, 0.05], [880, 0.05, 0.05]],
      trophyHover: [[988, 0, 0.025, "square", 0.012]],
      trophyEarned: [[440, 0, 0.055], [660, 0.065, 0.085]],
      newTrophyFanfare: [[523, 0, 0.06], [659, 0.065, 0.06], [784, 0.13, 0.08], [1046, 0.22, 0.13], [1318, 0.34, 0.12, "triangle", 0.024]],
      lockedTrophy: [[196, 0, 0.055, "triangle", 0.019], [164, 0.065, 0.08, "triangle", 0.017]],
      achievementPlaque: [[330, 0, 0.045], [494, 0.05, 0.055], [660, 0.105, 0.075]],
      doorOpen: [[130, 0, 0.05, "sawtooth", 0.028], [98, 0.055, 0.07, "triangle", 0.026], [523, 0.13, 0.06], [784, 0.2, 0.1]],
      toggle: [[330, 0, 0.05], [660, 0.05, 0.06]],
    };
    (cues[cue] || cues.trophyEarned).forEach(([frequency, delay, duration, type, gain]) => {
      tone(frequency, delay, duration, type, gain);
    });
  }, [muted, tone]);

  const toggleMuted = useCallback(() => {
    markInteracted();
    setMuted((value) => {
      const nextMuted = !value;
      if (!nextMuted) window.setTimeout(() => play("toggle", { force: true }), 0);
      return nextMuted;
    });
  }, [markInteracted, play]);

  return { muted, markInteracted, play, toggleMuted };
}

function getProgressRoomTier({ brain, badges, achievements }) {
  const earnedBadges = badges.filter((badge) => badge.earned).length;
  const earnedAchievements = achievements.filter((achievement) => achievement.earned).length;
  const totalEarned = earnedBadges + earnedAchievements;

  if (brain.percent >= 100) return 4;
  if (totalEarned >= 8 || brain.percent >= 75) return 3;
  if (totalEarned >= 5 || brain.percent >= 45) return 2;
  if (totalEarned >= 1 || brain.percent >= 15) return 1;
  return 0;
}

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
    <div style={{ textAlign: "center", flexShrink: 0 }}>
      <PixelAssetFrame
        kind="brain"
        className="thought-progress-brain-frame"
        size={isHud ? "brainHud" : "brainLarge"}
        earned={brain.percent >= 100}
      >
        <img
          src={brainAssets[index]}
          alt={`Pixel brain progress ${brain.percent}% complete`}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            objectFit: "contain",
            imageRendering: "pixelated",
            filter: brain.percent >= 100 ? `drop-shadow(0 0 18px ${C.gold}55)` : `drop-shadow(0 0 12px ${C.teal}25)`,
          }}
        />
      </PixelAssetFrame>
      <p style={{
        marginTop: isHud ? 3 : 6,
        color: brain.percent >= 100 ? C.gold : C.teal,
        fontSize: isHud ? "0.64rem" : "0.78rem",
        fontWeight: 900,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
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

function MiniPixelTrackerStat({ label, value, color, icon, statAssets = PROGRESS_ROOM_STAT_ASSETS }) {
  const asset = statAssets[icon];
  return (
    <div
      className="progress-room-mini-stat"
      style={{
        display: "grid",
        gridTemplateColumns: "34px minmax(0, 1fr)",
        gap: 7,
        alignItems: "center",
        padding: "6px 7px",
        minHeight: 46,
        border: `2px solid ${color}38`,
        borderRadius: 7,
        background: `linear-gradient(180deg, rgba(6,16,29,0.88), ${color}10)`,
        boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.04), 0 0 12px ${color}10`,
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
          filter: `drop-shadow(0 0 7px ${color}28)`,
        }}
      />
      <div style={{ minWidth: 0 }}>
        <p style={{ color, fontSize: "0.5rem", fontWeight: 900, letterSpacing: "0.03em", textTransform: "uppercase", marginBottom: 1, whiteSpace: "nowrap" }}>
          {label}
        </p>
        <p style={{ color: C.textPrimary, fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.9rem", lineHeight: 1 }}>
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

function nextGoalText({ brain, badges, achievements }) {
  if (brain.percent >= 100) return "All current tracker goals are complete. The brain network is fully lit.";
  const nextAchievement = achievements.find((achievement) => !achievement.earned);
  if (nextAchievement) return `${nextAchievement.label}: ${nextAchievement.criteria}`;
  const nextBadge = badges.find((badge) => !badge.earned);
  if (nextBadge) return `${nextBadge.label}: ${nextBadge.criteria}`;
  return "Finish another dilemma in this grade band to light more of the brain network.";
}

function hudNextGoalText({ brain, badges, achievements }) {
  if (brain.percent >= 100) return "Brain fully lit";
  const nextAchievement = achievements.find((achievement) => !achievement.earned);
  if (nextAchievement) return nextAchievement.label;
  const nextBadge = badges.find((badge) => !badge.earned);
  if (nextBadge) return nextBadge.label;
  return "Finish another dilemma";
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

function TrophyBadgeCard({ badge, onOpen, sfx, theme = TRACKER_THEMES.middle }) {
  const asset = theme.assets?.badges?.[badge.id] || MASTERY_BADGE_ASSETS[badge.id];
  return (
    <button
      type="button"
      className={`thought-progress-badge-tile ${badge.earned ? "thought-progress-badge-earned" : "thought-progress-badge-locked"} ${badge.isNew ? "thought-progress-badge-new" : ""}`}
      onClick={() => onOpen(badge)}
      onPointerEnter={() => sfx.play("trophyHover")}
      onFocus={() => sfx?.play("trophyHover")}
      style={{
        display: "grid",
        gridTemplateColumns: "96px 1fr",
        gap: 12,
        alignItems: "center",
        textAlign: "left",
        width: "100%",
        minHeight: 122,
        padding: "12px 13px",
        borderRadius: 8,
        borderWidth: 2,
        borderStyle: badge.earned ? "solid" : "dotted",
        borderColor: badge.earned ? C.gold + "70" : C.textMuted + "70",
        background: badge.earned ? `${C.gold}12` : "rgba(255,255,255,0.018)",
        color: C.textPrimary,
        cursor: "pointer",
        boxShadow: badge.isNew ? `0 0 24px ${C.gold}45, inset 0 0 0 1px ${C.gold}25` : "inset 0 0 0 1px rgba(255,255,255,0.03)",
      }}
    >
      <PixelAssetFrame kind="badge" size="badgeTrophy" earned={badge.earned}>
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
            opacity: badge.earned ? 1 : 0.44,
            filter: badge.earned ? `drop-shadow(0 0 16px ${C.gold}55)` : "grayscale(1) brightness(0.35) contrast(1.2)",
          }}
        />
      </PixelAssetFrame>
      <div>
        <p style={{ color: badge.earned ? C.gold : C.textPrimary, fontSize: "0.9rem", fontWeight: 900, marginBottom: 4 }}>
          {badge.label}
        </p>
        <p style={{ color: C.textSecondary, fontSize: "0.74rem", lineHeight: 1.45, marginBottom: 6 }}>
          {badge.earned ? badge.desc : `Still waiting for you: ${badge.criteria}`}
        </p>
        <p style={{ color: badge.isNew ? C.gold : C.teal, fontSize: "0.68rem", fontWeight: 900, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          {badge.isNew ? "New trophy" : badge.earned ? "Earned" : "How to earn"}
        </p>
      </div>
    </button>
  );
}

function TrophyRoomStage({ badges, roomTier, onOpenBadge, sfx, theme = TRACKER_THEMES.middle }) {
  const badgesById = Object.fromEntries(badges.map((badge) => [badge.id, badge]));
  const roomBackdrops = theme.assets?.roomBackdrops || PROGRESS_ROOM_BACKDROPS;
  const backdrop = roomBackdrops[roomTier] || roomBackdrops[0];
  const slots = theme.roomSlots || roomSlots;
  return (
    <div
      data-testid="progress-room-stage"
      style={{
        position: "relative",
        minHeight: 300,
        aspectRatio: "16 / 9",
        borderRadius: 10,
        border: `2px solid ${C.gold}35`,
        backgroundImage: `linear-gradient(180deg, rgba(5,12,24,0.08), rgba(5,12,24,0.2)), url(${backdrop})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        imageRendering: "pixelated",
        overflow: "hidden",
        boxShadow: `0 28px 80px rgba(0,0,0,0.34), inset 0 0 0 1px rgba(255,255,255,0.05)`,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 38%, rgba(44,211,200,0.12), transparent 34%), linear-gradient(180deg, transparent 52%, rgba(5,12,24,0.32))",
        }}
      />
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
              left: slot.left,
              top: slot.top,
              width: "clamp(54px, 7.4vw, 92px)",
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

function MasteryBadgeTrophyRoom({ badges, accent, onOpenBadge, selectedBadge, roomTier, sfx, theme = TRACKER_THEMES.middle }) {
  const earnedBadges = badges.filter((badge) => badge.earned);
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
        @media (prefers-reduced-motion: reduce) {
          .thought-progress-badge-tile,
          .thought-progress-room-slot {
            transition: none;
          }
          .thought-progress-badge-tile:hover {
            transform: none;
          }
          .thought-progress-room-slot:hover {
            transform: translate(-50%, -50%) !important;
          }
        }
      `}</style>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
        <p style={{ color: accent, fontSize: "0.68rem", fontWeight: 900, letterSpacing: "0.13em", textTransform: "uppercase", margin: 0 }}>
          Trophy Room
        </p>
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
      </div>
      <TrophyRoomStage badges={badges} roomTier={roomTier} onOpenBadge={onOpenBadge} sfx={sfx} theme={theme} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 10, marginTop: 12 }}>
        {badges.map((badge) => (
          <TrophyBadgeCard key={badge.id} badge={badge} onOpen={onOpenBadge} sfx={sfx} theme={theme} />
        ))}
      </div>
      {selectedBadge && (
        <div
          aria-live="polite"
          style={{
            marginTop: 12,
            borderRadius: 8,
            border: `1px solid ${selectedBadge.earned ? C.gold + "55" : C.border}`,
            background: selectedBadge.earned ? `${C.gold}10` : "rgba(255,255,255,0.025)",
            padding: "11px 12px",
          }}
        >
          <p style={{ color: selectedBadge.earned ? C.gold : C.textPrimary, fontWeight: 900, marginBottom: 4 }}>
            {selectedBadge.earned ? "You earned this" : "Still waiting for you"}: {selectedBadge.label}
          </p>
          <p style={{ color: C.textSecondary, fontSize: "0.78rem", lineHeight: 1.5, marginBottom: 5 }}>
            {selectedBadge.desc}
          </p>
          <p style={{ color: C.textMuted, fontSize: "0.74rem", lineHeight: 1.45 }}>
            <strong style={{ color: C.teal }}>How to unlock:</strong> {selectedBadge.criteria}
          </p>
        </div>
      )}
    </section>
  );
}

function AnimatedAriInvite({ theme = TRACKER_THEMES.middle }) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const sequence = theme.assets?.ariSequence || PROGRESS_ROOM_ARI_INVITE_SEQUENCE;
  const ariFrames = theme.assets?.ariFrames || PROGRESS_ROOM_ARI_INVITE_FRAMES;
  const ariAssets = theme.assets?.ariAssets || PROGRESS_ROOM_ARI_INVITE_ASSETS;
  const sequenceStep = sequence[activeStepIndex] || sequence[0];
  const activeFrameIndex = sequenceStep?.frame || 0;
  const activeFrame = ariFrames[activeFrameIndex] || ariAssets.idle1;

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (query.matches) {
      setActiveStepIndex(0);
      return undefined;
    }
    const timer = window.setTimeout(() => {
      setActiveStepIndex((index) => (index + 1) % sequence.length);
    }, sequenceStep.holdMs);
    return () => window.clearTimeout(timer);
  }, [activeStepIndex, sequenceStep.holdMs]);

  return (
    <div
      className="progress-room-ari-invite-frame"
      aria-hidden="true"
      style={{
        width: 86,
        aspectRatio: "1 / 1",
        borderRadius: 8,
        border: `2px solid ${C.gold}66`,
        background: "radial-gradient(circle at 50% 30%, rgba(44,211,200,0.18), rgba(5,12,24,0.76) 60%), linear-gradient(180deg, rgba(13,28,45,0.9), rgba(4,11,22,0.96))",
        overflow: "hidden",
        display: "block",
        boxShadow: `0 0 22px ${C.gold}20, inset 0 0 0 1px rgba(255,255,255,0.05)`,
        position: "relative",
      }}
    >
      <span
        className="progress-room-key-glint"
        style={{
          position: "absolute",
          right: 9,
          top: 13,
          width: 8,
          height: 8,
          borderRadius: 2,
          background: C.gold,
          boxShadow: `0 0 14px ${C.gold}`,
          transform: "rotate(45deg)",
          zIndex: 4,
        }}
      />
      <img
        className="progress-room-ari-invite-sprite progress-room-ari-invite-idle-1"
        src={activeFrame}
        alt=""
        data-frame-index={activeFrameIndex}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          objectPosition: "center bottom",
          imageRendering: "pixelated",
          zIndex: 1,
        }}
      />
      <span
        className="progress-room-ari-portrait-shadow"
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "16%",
          right: "16%",
          bottom: 10,
          height: 8,
          borderRadius: "50%",
          background: "rgba(0,0,0,0.34)",
          filter: "blur(1px)",
          zIndex: 2,
        }}
      />
      <span
        className="progress-room-ari-portrait-base"
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 5,
          right: 5,
          bottom: 5,
          height: 10,
          borderRadius: 4,
          border: `1px solid ${C.gold}44`,
          background: `linear-gradient(180deg, ${C.gold}28, rgba(5,12,24,0.94))`,
          boxShadow: `0 -4px 12px rgba(5,12,24,0.5), 0 0 10px ${C.gold}16`,
          zIndex: 3,
        }}
      />
    </div>
  );
}

function ProgressRoomDoorButton({ onOpen, opening, theme = TRACKER_THEMES.middle }) {
  const doorAssets = theme.assets?.door || PROGRESS_ROOM_DOOR_ASSETS;
  const doorFrames = [
    { id: "closed", src: doorAssets.closed },
    { id: "crack", src: doorAssets.crack },
    { id: "open", src: doorAssets.open },
    { id: "glow", src: doorAssets.glow },
  ];
  return (
    <button
      type="button"
      className={`progress-room-door-button ${opening ? "progress-room-door-opening" : ""}`}
      data-testid="progress-room-modal-trigger"
      onClick={onOpen}
      aria-label={theme.doorLabel || "Open Progress Room"}
      style={{
        position: "relative",
        display: "grid",
        gridTemplateRows: "92px auto",
        justifyItems: "center",
        alignItems: "center",
        width: 118,
        minHeight: 134,
        padding: "7px 8px 9px",
        borderRadius: 8,
        border: `2px solid ${C.gold}88`,
        background: "linear-gradient(180deg, rgba(8,18,32,0.92), rgba(33,22,11,0.92))",
        color: C.textPrimary,
        cursor: opening ? "default" : "pointer",
        boxShadow: `0 0 22px ${C.gold}24, inset 0 0 0 1px rgba(255,255,255,0.05)`,
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
        style={{ position: "relative", width: 88, height: 88, display: "block" }}
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
      <span style={{ color: C.midnight, background: C.gold, borderRadius: 5, padding: "5px 7px", fontSize: "0.68rem", fontWeight: 900, lineHeight: 1.05 }}>
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

function ProgressRoomInvitation({ earnedBadges, totalBadges, earnedAchievements, totalAchievements, onOpen, accent, opening, theme = TRACKER_THEMES.middle }) {
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
      <ProgressRoomDoorButton onOpen={onOpen} opening={opening} theme={theme} />
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
}) {
  const [activeTab, setActiveTab] = useState("trophies");
  const modalBodyRef = useRef(null);
  const closeButtonRef = useRef(null);
  const roomTier = getProgressRoomTier({ brain, badges, achievements });
  const earnedBadges = badges.filter((badge) => badge.earned);
  const earnedAchievements = achievements.filter((achievement) => achievement.earned);
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

  useEffect(() => {
    if (open || !theme.showAchievementsTab) setActiveTab("trophies");
  }, [open, theme.showAchievementsTab]);

  if (!open) return null;

  return (
    <div
      data-testid="progress-room-modal"
      className="progress-room-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="progress-room-title"
      onKeyDown={(event) => {
        if (event.key === "Escape") onClose();
      }}
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
}) {
  const { progress, summary, reset, recordEvent } = useThoughtProgress();
  const theme = TRACKER_THEMES[trackerTheme] || TRACKER_THEMES.middle;
  const panelTitle = title || theme.defaultTitle;
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [progressRoomOpen, setProgressRoomOpen] = useState(false);
  const [doorOpening, setDoorOpening] = useState(false);
  const previousFocusRef = useRef(null);
  const doorTimerRef = useRef(null);
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
    setSelectedBadge(badge);
    if (badge.earned && badge.isNew) {
      recordEvent({ type: "badge_viewed", badgeId: badge.id });
    }
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
      openProgressRoom();
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
      style={{
        border: `1px solid ${accent}32`,
        borderRadius: 12,
        background: `linear-gradient(135deg, ${C.surface}, ${accent}08)`,
        padding: isIntro ? "14px 16px" : isFull ? "20px 22px" : "16px 18px",
        margin: isIntro ? 0 : isFull ? "0 0 22px" : "18px 0 28px",
        maxHeight: "none",
        overflowY: "visible",
        boxShadow: isIntro ? `0 24px 70px rgba(0,0,0,0.22), 0 0 42px ${accent}12` : "none",
      }}
    >
      <style>{`
        .thought-progress-intro-grid .progress-room-invitation {
          margin-top: 0 !important;
          height: 100%;
          grid-template-columns: 74px minmax(0, 1fr) 104px !important;
          gap: 9px !important;
          padding: 9px !important;
        }
        .thought-progress-intro-grid .progress-room-ari-invite-frame {
          width: 74px !important;
        }
        .thought-progress-intro-grid .progress-room-door-button {
          width: 102px !important;
          min-height: 118px !important;
          grid-template-rows: 72px auto !important;
        }
        .thought-progress-intro-grid .progress-room-door-frame {
          width: 72px !important;
          height: 72px !important;
        }
        .thought-progress-intro-grid .progress-room-invitation-counts {
          font-size: 0.72rem !important;
          line-height: 1.32 !important;
        }
        .thought-progress-intro-meter .thought-progress-brain-frame {
          width: 106px !important;
        }
        @media (max-width: 1000px) and (min-width: 821px) {
          .thought-progress-intro-grid .progress-room-invitation-counts {
            display: none !important;
          }
          .thought-progress-intro-grid .progress-room-invitation-eyebrow {
            font-size: 0.6rem !important;
            line-height: 1.15 !important;
            margin-bottom: 3px !important;
          }
          .thought-progress-intro-grid .progress-room-invitation-copy {
            font-size: 0.78rem !important;
            line-height: 1.25 !important;
            margin-bottom: 0 !important;
          }
        }
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
          .progress-room-ari-invite-frame {
            width: 82px !important;
          }
          .progress-room-door-button {
            grid-column: 1 / -1;
            justify-self: start;
            width: min(100%, 150px) !important;
            min-height: 124px !important;
          }
        }
        @media (max-width: 820px) {
          .thought-progress-intro-grid {
            grid-template-columns: minmax(0, 1fr) !important;
          }
          .thought-progress-intro-meter {
            grid-template-columns: 108px minmax(0, 1fr) !important;
          }
        }
        @media (max-width: 430px) {
          .thought-progress-heading-grid {
            grid-template-columns: minmax(0, 1fr) !important;
          }
          .thought-progress-intro-meter {
            grid-template-columns: 82px minmax(0, 1fr) !important;
            gap: 8px !important;
            padding: 8px !important;
          }
          .thought-progress-intro-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 6px !important;
          }
          .thought-progress-intro-stats .progress-room-mini-stat {
            grid-template-columns: 28px minmax(0, 1fr) !important;
            gap: 5px !important;
            padding: 6px !important;
          }
          .thought-progress-intro-stats .progress-room-mini-stat img {
            width: 28px !important;
            height: 28px !important;
          }
          .thought-progress-intro-grid .progress-room-invitation {
            grid-template-columns: 64px minmax(0, 1fr) 96px !important;
            gap: 7px !important;
            padding: 8px !important;
            align-items: center !important;
          }
          .thought-progress-intro-grid .progress-room-ari-invite-frame {
            width: 64px !important;
          }
          .thought-progress-intro-grid .progress-room-door-button {
            grid-column: auto !important;
            width: 96px !important;
            min-height: 112px !important;
            grid-template-rows: 66px auto !important;
          }
          .thought-progress-intro-grid .progress-room-door-frame {
            width: 66px !important;
            height: 66px !important;
          }
        }
        @keyframes key-glint {
          0%, 70%, 100% { opacity: 0.12; transform: rotate(45deg) scale(0.55); }
          76%, 82% { opacity: 1; transform: rotate(45deg) scale(1.05); }
        }
        @keyframes door-beam {
          0%, 72%, 100% { opacity: 0.2; transform: translateX(0); }
          80% { opacity: 0.8; transform: translateX(10px); }
        }
        @keyframes door-closed-frame {
          0%, 24% { opacity: 1; }
          25%, 100% { opacity: 0; }
        }
        @keyframes door-crack-frame {
          0%, 24% { opacity: 0; }
          25%, 54% { opacity: 1; }
          55%, 100% { opacity: 0; }
        }
        @keyframes door-open-frame {
          0%, 54% { opacity: 0; }
          55%, 82% { opacity: 1; }
          83%, 100% { opacity: 0; }
        }
        @keyframes door-glow-frame {
          0%, 82% { opacity: 0; }
          83%, 100% { opacity: 1; }
        }
        @keyframes brain-node-pulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 12px ${C.teal}25); }
          50% { transform: scale(1.035); filter: drop-shadow(0 0 18px ${C.teal}55); }
        }
        .progress-room-key-glint {
          animation: key-glint 6.4s steps(1, end) infinite;
        }
        .progress-room-door-beam {
          animation: door-beam 6.4s steps(1, end) infinite;
        }
        .progress-room-door-button:hover,
        .progress-room-door-button:focus-visible {
          border-color: ${C.gold} !important;
          box-shadow: 0 0 30px ${C.gold}42, inset 0 0 0 1px rgba(255,255,255,0.08) !important;
        }
        .progress-room-door-button:hover .progress-room-door-glow,
        .progress-room-door-button:focus-visible .progress-room-door-glow {
          opacity: 0.28 !important;
        }
        .progress-room-door-button:hover .progress-room-ready-caption,
        .progress-room-door-button:focus-visible .progress-room-ready-caption {
          opacity: 1 !important;
        }
        .progress-room-door-opening .progress-room-door-closed {
          animation: door-closed-frame ${DOOR_OPEN_DELAY_MS}ms steps(1, end) both;
        }
        .progress-room-door-opening .progress-room-door-crack {
          animation: door-crack-frame ${DOOR_OPEN_DELAY_MS}ms steps(1, end) both;
        }
        .progress-room-door-opening .progress-room-door-open {
          animation: door-open-frame ${DOOR_OPEN_DELAY_MS}ms steps(1, end) both;
        }
        .progress-room-door-opening .progress-room-door-glow {
          animation: door-glow-frame ${DOOR_OPEN_DELAY_MS}ms steps(1, end) both;
        }
        .progress-room-pixel-stat:hover {
          border-color: ${C.gold}66 !important;
          filter: saturate(1.1);
        }
        .thought-progress-brain-frame img {
          animation: brain-node-pulse 3.2s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .progress-room-ari-invite-sprite {
            animation: none !important;
            opacity: 1 !important;
          }
          .progress-room-key-glint,
          .progress-room-ari-portrait-shadow,
          .progress-room-door-beam,
          .progress-room-door-img,
          .thought-progress-brain-frame img {
            animation: none !important;
          }
          .progress-room-door-closed {
            opacity: 1 !important;
          }
          .progress-room-door-crack,
          .progress-room-door-open,
          .progress-room-door-glow {
            opacity: 0 !important;
          }
        }
      `}</style>
      {isIntro ? (
        <div
          className="thought-progress-intro-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(168px, 0.62fr) minmax(334px, 1fr) minmax(300px, 1.02fr)",
            gap: 12,
            alignItems: "stretch",
          }}
        >
          <div style={{ display: "grid", alignContent: "center" }}>
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
              fontSize: "1.2rem",
              lineHeight: 1.2,
              margin: 0,
            }}>
              {panelTitle}
            </h3>
            <p style={{ color: C.textSecondary, fontSize: "0.82rem", lineHeight: 1.5, marginTop: 7 }}>
              {theme.introCopy}
            </p>
            <p style={{
              color: C.textPrimary,
              fontSize: "0.78rem",
              lineHeight: 1.42,
              marginTop: 9,
              padding: "8px 10px",
              borderRadius: 8,
              border: `1px solid ${C.teal}30`,
              background: `${C.teal}0e`,
            }}>
              <strong style={{ color: C.teal }}>{theme.nextLabel}:</strong> {hudNextGoalText({ brain, badges: badgeStatus, achievements })}
            </p>
          </div>
          <div
            className="thought-progress-intro-meter"
            style={{
              display: "grid",
              gridTemplateColumns: "106px minmax(0, 1fr)",
              gap: 10,
              alignItems: "center",
              padding: "9px 10px",
              borderRadius: 10,
              border: `2px solid ${C.teal}24`,
              background: "rgba(6,16,29,0.5)",
            }}
          >
            <BrainProgressIcon brain={brain} size="hud" theme={theme} />
            <div
              className="thought-progress-intro-stats"
              style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 8 }}
            >
              {statItems.map((item) => (
                <MiniPixelTrackerStat
                  key={item.label}
                  label={item.label}
                  value={item.value}
                  color={item.color}
                  icon={item.icon}
                  statAssets={theme.assets.stats}
                />
              ))}
            </div>
          </div>
          <ProgressRoomInvitation
            earnedBadges={earnedBadges}
            totalBadges={badgeStatus.length}
            earnedAchievements={earnedAchievements}
            totalAchievements={achievements.length}
            onOpen={openProgressRoomDoor}
            accent={accent}
            opening={doorOpening}
            theme={theme}
          />
        </div>
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
      />
    </section>
  );
}
