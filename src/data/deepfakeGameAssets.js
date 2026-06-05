const ROOT = "/experiment-scenes/deepfake-game";
const actStampFrames = (stageId) => [1, 2, 3].map((frame) => `${ROOT}/act-stamps/${stageId}-${frame}.webp`);
const PROGRESS_ROOM_ROOT = "/experiment-scenes/progress-room";

export const DEEPFAKE_GAME_ASSETS = {
  backgrounds: {
    "viral-clip": `${ROOT}/backgrounds/viral-clip.webp`,
    "almost-true": `${ROOT}/backgrounds/almost-true.webp`,
    "your-side": `${ROOT}/backgrounds/your-side.webp`,
    synthesis: `${ROOT}/backgrounds/synthesis.webp`,
  },
  atmosphericBackdrops: {
    "viral-clip": `${ROOT}/atmospheric-backdrops/viral-clip.webp`,
    "almost-true": `${ROOT}/atmospheric-backdrops/almost-true.webp`,
    "your-side": `${ROOT}/atmospheric-backdrops/your-side.webp`,
    synthesis: `${ROOT}/atmospheric-backdrops/synthesis.webp`,
  },
  revealBackdrops: {
    "viral-clip": `${ROOT}/atmospheric-backdrops/viral-clip-reveal.webp`,
    "almost-true": `${ROOT}/atmospheric-backdrops/almost-true-reveal.webp`,
    "your-side": `${ROOT}/atmospheric-backdrops/your-side-reveal.webp`,
    synthesis: `${ROOT}/atmospheric-backdrops/synthesis-reveal.webp`,
  },
  portraits: {
    ari: `${ROOT}/portraits/ari-idle.webp`,
    ariIdle: `${ROOT}/portraits/ari-idle.webp`,
    ariTalkA: `${ROOT}/portraits/ari-talk-a.webp`,
    ariTalkB: `${ROOT}/portraits/ari-talk-b.webp`,
    player: `${ROOT}/portraits/player.webp`,
  },
  sprites: {
    phone: `${ROOT}/sprites/glowing-phone.webp`,
    chat: `${ROOT}/sprites/chat-burst.webp`,
    verifier: `${ROOT}/sprites/verification-glass.webp`,
  },
  actStamps: {
    "viral-clip": actStampFrames("viral-clip"),
    "almost-true": actStampFrames("almost-true"),
    "your-side": actStampFrames("your-side"),
    synthesis: actStampFrames("synthesis"),
  },
  sceneFocus: {
    "viral-clip": `${ROOT}/scene-focus/viral-clip.webp`,
    "almost-true": `${ROOT}/scene-focus/almost-true.webp`,
    "your-side": `${ROOT}/scene-focus/your-side.webp`,
    synthesis: `${ROOT}/scene-focus/synthesis.webp`,
  },
  achievements: {
    "source-checker": `${ROOT}/achievements/badge-source-checker.webp`,
    "claim-sorter": `${ROOT}/achievements/badge-claim-sorter.webp`,
    "truth-under-pressure": `${ROOT}/achievements/badge-truth-under-pressure.webp`,
  },
};

export const BRAIN_PROGRESS_ASSETS = [
  "/experiment-scenes/progress-brain/brain-ui-0.webp",
  "/experiment-scenes/progress-brain/brain-ui-1.webp",
  "/experiment-scenes/progress-brain/brain-ui-2.webp",
  "/experiment-scenes/progress-brain/brain-ui-3.webp",
  "/experiment-scenes/progress-brain/brain-ui-4.webp",
  "/experiment-scenes/progress-brain/brain-ui-5.webp",
];

export const MASTERY_BADGE_ASSETS = {
  "first-dilemma": "/experiment-scenes/progress-badges/badge-first-dilemma.webp",
  "careful-verifier": "/experiment-scenes/progress-badges/badge-careful-verifier.webp",
  "steelman-builder": "/experiment-scenes/progress-badges/badge-steelman-builder.webp",
  "lens-explorer": "/experiment-scenes/progress-badges/badge-lens-explorer.webp",
  "second-thought": "/experiment-scenes/progress-badges/badge-second-thought.webp",
  "topic-wanderer": "/experiment-scenes/progress-badges/badge-topic-wanderer.webp",
  "consistent-thinker": "/experiment-scenes/progress-badges/badge-consistent-thinker.webp",
};

export const PROGRESS_ROOM_BACKDROPS = [0, 1, 2, 3, 4].map((tier) => `${PROGRESS_ROOM_ROOT}/room-${tier}.webp`);

export const PROGRESS_ROOM_ARI_INVITE_FRAMES = Array.from(
  { length: 36 },
  (_, index) => `${PROGRESS_ROOM_ROOT}/ari-invite-${String(index).padStart("2", "0")}.webp`,
);

export const PROGRESS_ROOM_ARI_INVITE_ASSETS = {
  idle1: PROGRESS_ROOM_ARI_INVITE_FRAMES[0],
  blink: PROGRESS_ROOM_ARI_INVITE_FRAMES[2],
  wave: PROGRESS_ROOM_ARI_INVITE_FRAMES[11],
  point: PROGRESS_ROOM_ARI_INVITE_FRAMES[16],
  sparkle: PROGRESS_ROOM_ARI_INVITE_FRAMES[31],
};

export const PROGRESS_ROOM_ARI_INVITE_SEQUENCE = [
  { phase: "idle", frame: 0, holdMs: 520 },
  { phase: "idle", frame: 1, holdMs: 180 },
  { phase: "blink", frame: 2, holdMs: 140 },
  { phase: "idle", frame: 3, holdMs: 160 },
  { phase: "idle", frame: 4, holdMs: 420 },
  { phase: "wave-rise", frame: 5, holdMs: 130 },
  { phase: "wave-rise", frame: 6, holdMs: 130 },
  { phase: "wave-rise", frame: 7, holdMs: 130 },
  { phase: "wave", frame: 8, holdMs: 140 },
  { phase: "wave", frame: 9, holdMs: 150 },
  { phase: "wave", frame: 10, holdMs: 160 },
  { phase: "wave", frame: 11, holdMs: 180 },
  { phase: "wave", frame: 12, holdMs: 180 },
  { phase: "point", frame: 13, holdMs: 190 },
  { phase: "point", frame: 14, holdMs: 210 },
  { phase: "point", frame: 15, holdMs: 220 },
  { phase: "point-hold", frame: 16, holdMs: 520 },
  { phase: "point-lower", frame: 17, holdMs: 170 },
  { phase: "point-lower", frame: 18, holdMs: 160 },
  { phase: "point-lower", frame: 19, holdMs: 150 },
  { phase: "wave-lower", frame: 20, holdMs: 140 },
  { phase: "wave-lower", frame: 21, holdMs: 135 },
  { phase: "wave-lower", frame: 22, holdMs: 130 },
  { phase: "wave-lower", frame: 23, holdMs: 130 },
  { phase: "wave-lower", frame: 24, holdMs: 135 },
  { phase: "wave-lower", frame: 25, holdMs: 130 },
  { phase: "wave-lower", frame: 26, holdMs: 130 },
  { phase: "settle", frame: 27, holdMs: 150 },
  { phase: "settle", frame: 28, holdMs: 420 },
  { phase: "settle", frame: 29, holdMs: 180 },
  { phase: "blink", frame: 30, holdMs: 160 },
  { phase: "key-glint", frame: 31, holdMs: 160 },
  { phase: "key-glint", frame: 32, holdMs: 160 },
  { phase: "settle", frame: 33, holdMs: 190 },
  { phase: "idle", frame: 34, holdMs: 460 },
  { phase: "idle", frame: 35, holdMs: 520 },
];

export const PROGRESS_ROOM_DOOR_ASSETS = {
  closed: `${PROGRESS_ROOM_ROOT}/progress-door-closed.webp`,
  crack: `${PROGRESS_ROOM_ROOT}/progress-door-crack.webp`,
  open: `${PROGRESS_ROOM_ROOT}/progress-door-open.webp`,
  glow: `${PROGRESS_ROOM_ROOT}/progress-door-glow.webp`,
};

export const PROGRESS_ROOM_STAT_ASSETS = {
  finished: `${PROGRESS_ROOM_ROOT}/stat-finished.webp`,
  badges: `${PROGRESS_ROOM_ROOT}/stat-badges.webp`,
  skills: `${PROGRESS_ROOM_ROOT}/stat-skills.webp`,
  brain: `${PROGRESS_ROOM_ROOT}/stat-brain.webp`,
};

export function deepfakeBackgroundForStage(stageId) {
  return DEEPFAKE_GAME_ASSETS.atmosphericBackdrops[stageId] || DEEPFAKE_GAME_ASSETS.atmosphericBackdrops.synthesis;
}

export function deepfakeRevealBackgroundForStage(stageId) {
  return DEEPFAKE_GAME_ASSETS.revealBackdrops[stageId] || DEEPFAKE_GAME_ASSETS.revealBackdrops.synthesis;
}
