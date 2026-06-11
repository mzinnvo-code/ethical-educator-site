// Theme + layout data for the Wonder Workshop / Goal Tracker gamification UI.
// Pure data module: safe to import from node:test and the prerender pipeline.
import {
  BRAIN_PROGRESS_ASSETS,
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
} from "../../data/deepfakeGameAssets.js";
import { C } from "../../theme.js";

export const SFX_STORAGE_KEY = "thoughtProgressRoomSfxMuted";
export const DOOR_OPEN_DELAY_MS = 560;

// Text-safe color variants: C.teal (4.3:1) and C.ocean (2.5:1) fail contrast
// as SMALL text on the dark background; use these for labels, keep the base
// tokens for borders and fills.
export const TEAL_TEXT = "#2cd3c8";
export function textSafeAccent(accent) {
  return accent === C.ocean ? C.sky : accent;
}

export const PIXEL_FRAME_RATIOS = {
  brain: "260 / 190",
  achievement: "16 / 9",
  badge: "1 / 1",
  portrait: "1 / 1",
  sprite: "1 / 1",
};

export const roomSlots = [
  { id: "first-dilemma", left: "17%", top: "62%" },
  { id: "careful-verifier", left: "31%", top: "50%" },
  { id: "steelman-builder", left: "45%", top: "60%" },
  { id: "lens-explorer", left: "58%", top: "48%" },
  { id: "second-thought", left: "71%", top: "62%" },
  { id: "topic-wanderer", left: "82%", top: "49%" },
  { id: "consistent-thinker", left: "50%", top: "32%" },
];

export const k5RoomSlots = [
  { id: "k5-first-wonder", left: "18%", top: "64%" },
  { id: "k5-story-explorer", left: "31%", top: "50%" },
  { id: "k5-kind-thinker", left: "43%", top: "64%" },
  { id: "k5-question-asker", left: "55%", top: "48%" },
  { id: "k5-rule-helper", left: "68%", top: "63%" },
  { id: "k5-try-again-explorer", left: "79%", top: "47%" },
  { id: "k5-topic-trailblazer", left: "50%", top: "31%" },
];

export const TRACKER_THEMES = {
  middle: {
    key: "middle",
    eyebrow: "Ari's progress map",
    defaultTitle: "Ari's Goal Tracker",
    introCopy: "Ari is watching for the thinking moves that make your reasoning stronger.",
    fullCopy: "Finish dilemmas, practice verification, save reflections, and light up the brain network one careful move at a time.",
    nextLabel: "Next goal",
    meterLabel: "Brain lights",
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
      { label: "Brain", value: `${brain.completedGoals}/${brain.totalGoals || 0}`, color: C.sky, icon: "brain" },
    ],
  },
  k5: {
    key: "k5",
    eyebrow: "Ari's Wonder Workshop",
    defaultTitle: "Ari's Wonder Workshop",
    introCopy: "Your thinking lights are turning on as you try stories, ask questions, and help classmates think kindly.",
    fullCopy: "Try stories, explain your choices, ask good questions, and light up the Wonder Workshop one careful idea at a time.",
    nextLabel: "Next spark",
    meterLabel: "Wonder lights",
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
      { label: "Lights", value: `${brain.completedGoals}/${brain.totalGoals || 0}`, color: C.sky, icon: "brain" },
    ],
  },
};

export function getProgressRoomTier({ brain, badges, achievements }) {
  const earnedBadges = badges.filter((badge) => badge.earned).length;
  const earnedAchievements = achievements.filter((achievement) => achievement.earned).length;
  const totalEarned = earnedBadges + earnedAchievements;

  if (brain.percent >= 100) return 4;
  if (totalEarned >= 8 || brain.percent >= 75) return 3;
  if (totalEarned >= 5 || brain.percent >= 45) return 2;
  if (totalEarned >= 1 || brain.percent >= 15) return 1;
  return 0;
}
