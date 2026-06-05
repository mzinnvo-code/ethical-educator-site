import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import sharp from "sharp";

import * as deepfakeGameAssets from "../data/deepfakeGameAssets.js";
import { BADGES } from "../lib/thoughtProgress.js";

const {
  MASTERY_BADGE_ASSETS,
  PROGRESS_ROOM_ARI_INVITE_ASSETS,
  PROGRESS_ROOM_ARI_INVITE_FRAMES,
  PROGRESS_ROOM_ARI_INVITE_SEQUENCE,
  PROGRESS_ROOM_BACKDROPS,
  PROGRESS_ROOM_DOOR_ASSETS,
  PROGRESS_ROOM_STAT_ASSETS,
} = deepfakeGameAssets;

function webpDimensions(path) {
  const buffer = readFileSync(path);
  assert.equal(buffer.toString("ascii", 0, 4), "RIFF");
  assert.equal(buffer.toString("ascii", 8, 12), "WEBP");
  let offset = 12;
  while (offset + 8 <= buffer.length) {
    const chunkType = buffer.toString("ascii", offset, offset + 4);
    const chunkSize = buffer.readUInt32LE(offset + 4);
    const chunkStart = offset + 8;
    if (chunkType === "VP8X") {
      return {
        width: 1 + buffer.readUIntLE(chunkStart + 4, 3),
        height: 1 + buffer.readUIntLE(chunkStart + 7, 3),
      };
    }
    if (chunkType === "VP8 ") {
      return {
        width: buffer.readUInt16LE(chunkStart + 6) & 0x3fff,
        height: buffer.readUInt16LE(chunkStart + 8) & 0x3fff,
      };
    }
    if (chunkType === "VP8L") {
      const bits = buffer.readUInt32LE(chunkStart + 1);
      return {
        width: (bits & 0x3fff) + 1,
        height: ((bits >> 14) & 0x3fff) + 1,
      };
    }
    offset = chunkStart + chunkSize + (chunkSize % 2);
  }
  throw new Error(`Could not read WebP dimensions for ${path}`);
}

async function foregroundBounds(path) {
  const image = sharp(path).ensureAlpha();
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  let minX = info.width;
  let minY = info.height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < info.height; y += 1) {
    for (let x = 0; x < info.width; x += 1) {
      const offset = (y * info.width + x) * info.channels;
      const alpha = data[offset + 3];
      if (alpha > 16) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  assert.ok(maxX >= minX && maxY >= minY, `${path} should contain visible foreground pixels`);
  return {
    minX,
    minY,
    maxX,
    maxY,
    width: maxX - minX + 1,
    height: maxY - minY + 1,
    bottomGap: info.height - 1 - maxY,
  };
}

test("ThoughtProgressPanel introduces Ari's Goal Tracker with visible badge criteria", () => {
  const source = readFileSync("src/components/ThoughtProgressPanel.jsx", "utf8");

  assert.match(source, /Ari's Goal Tracker/);
  assert.match(source, /How to earn/);
  assert.match(source, /BrainProgressIcon/);
  assert.match(source, /Next goal/);
  assert.match(source, /variant === "hud"/);
  assert.match(source, /getBrainProgress/);
  assert.doesNotMatch(source, /badge\.earned \? "\*" : "o"/);
});

test("ThoughtProgressPanel has a reusable Game Achievements section with counters and grouping", () => {
  const source = readFileSync("src/components/ThoughtProgressPanel.jsx", "utf8");

  assert.match(source, /Game Achievements/);
  assert.doesNotMatch(source, /Deepfake game achievements/);
  assert.match(source, /achievementGroups/);
  assert.match(source, /experimentId/);
  assert.match(source, /earnedAchievements\.length/);
  assert.match(source, /achievements\.length/);
  assert.match(source, /data-testid="game-achievements-section"/);
  assert.match(source, /data-testid="game-achievement-counter"/);
});

test("ThoughtProgressPanel moves rewards into an accessible Progress Room modal", () => {
  const source = readFileSync("src/components/ThoughtProgressPanel.jsx", "utf8");

  assert.match(source, /Open Progress Room/);
  assert.match(source, /data-testid="progress-room-modal-trigger"/);
  assert.match(source, /function ProgressRoomModal/);
  assert.match(source, /data-testid="progress-room-modal"/);
  assert.match(source, /role="dialog"/);
  assert.match(source, /aria-modal="true"/);
  assert.match(source, /role="tablist"/);
  assert.match(source, /role="tab"/);
  assert.match(source, /Trophy Room/);
  assert.match(source, /Game Achievements/);
  assert.match(source, /onKeyDown/);
  assert.match(source, /Escape/);
  assert.match(source, /document\.body\.style\.overflow/);
  assert.match(source, /previousFocusRef/);
});

test("Progress Room copy speaks to students instead of implementation notes", () => {
  const source = readFileSync("src/components/ThoughtProgressPanel.jsx", "utf8");

  assert.match(source, /Your thinking room is starting to light up/);
  assert.match(source, /Ari left you a room key/);
  assert.match(source, /Open the room to see what you.ve unlocked/);
  assert.match(source, /thinking moves you practiced/);
  assert.match(source, /Still waiting for you/);
  assert.doesNotMatch(source, /late-90s/i);
  assert.doesNotMatch(source, /browser-only progress/i);
  assert.doesNotMatch(source, /Inspect trophies/i);
  assert.doesNotMatch(source, /clear new glows/i);
});

test("Progress Room invitation uses a smooth Ari frame sequence instead of a plain button", () => {
  const source = readFileSync("src/components/ThoughtProgressPanel.jsx", "utf8");
  const assetSource = readFileSync("src/data/deepfakeGameAssets.js", "utf8");

  assert.match(source, /function AnimatedAriInvite/);
  assert.match(source, /function ProgressRoomDoorButton/);
  assert.match(source, /function PixelTrackerStat/);
  assert.match(source, /function ProgressRoomInvitation/);
  assert.match(source, /PROGRESS_ROOM_ARI_INVITE_ASSETS/);
  assert.match(source, /PROGRESS_ROOM_ARI_INVITE_FRAMES/);
  assert.match(source, /PROGRESS_ROOM_ARI_INVITE_SEQUENCE/);
  assert.match(source, /PROGRESS_ROOM_DOOR_ASSETS/);
  assert.match(source, /PROGRESS_ROOM_STAT_ASSETS/);
  assert.match(assetSource, /ari-invite-\$\{String\(index\)\.padStart\("2", "0"\)\}\.webp/);
  assert.match(assetSource, /PROGRESS_ROOM_ARI_INVITE_FRAMES/);
  assert.match(assetSource, /PROGRESS_ROOM_ARI_INVITE_SEQUENCE/);
  assert.match(assetSource, /progress-door-closed\.webp/);
  assert.match(assetSource, /progress-door-crack\.webp/);
  assert.match(assetSource, /progress-door-open\.webp/);
  assert.match(assetSource, /progress-door-glow\.webp/);
  assert.match(source, /activeFrameIndex/);
  assert.match(source, /sequenceStep\.holdMs/);
  assert.match(source, /progress-room-ari-invite-sprite/);
  assert.match(source, /progress-room-door-frame/);
  assert.match(source, /Room ready/);
  assert.match(source, /prefers-reduced-motion: reduce/);
  assert.doesNotMatch(source, /animation: "ari-invite-cycle/);
  assert.doesNotMatch(source, /@keyframes ari-invite-cycle/);
  assert.match(source, /progress-room-door-opening/);
  assert.doesNotMatch(source, /<ProgressRoomLaunchCard/);
  assert.doesNotMatch(source, /className="progress-room-invitation-action"/);
});

test("Progress Room invitation Ari assets exist as thirty-six project-local bitmap frames", () => {
  assert.equal(PROGRESS_ROOM_ARI_INVITE_FRAMES.length, 36);
  assert.ok(PROGRESS_ROOM_ARI_INVITE_SEQUENCE.length >= 36);
  assert.deepEqual(Object.keys(PROGRESS_ROOM_ARI_INVITE_ASSETS).sort(), [
    "blink",
    "idle1",
    "point",
    "sparkle",
    "wave",
  ]);

  for (const [id, src] of PROGRESS_ROOM_ARI_INVITE_FRAMES.entries()) {
    assert.match(src, /progress-room\/ari-invite-\d{2}\.webp$/);
    assert.equal(existsSync(`public${src}`), true, `${id} invite frame should exist`);
    const { width, height } = webpDimensions(`public${src}`);
    assert.equal(width, 360, `${id} invite frame width`);
    assert.equal(height, 360, `${id} invite frame height`);
  }

  for (const step of PROGRESS_ROOM_ARI_INVITE_SEQUENCE) {
    assert.equal(Number.isInteger(step.frame), true, "sequence frame should be an integer index");
    assert.ok(step.frame >= 0 && step.frame < PROGRESS_ROOM_ARI_INVITE_FRAMES.length, `sequence frame ${step.frame} should exist`);
    assert.equal(Number.isInteger(step.holdMs), true, "sequence hold should be integer milliseconds");
    assert.ok(step.holdMs >= 110, "sequence should use readable frame holds instead of rapid pose snapping");
    assert.ok(step.holdMs <= 520, "sequence should keep each pose responsive");
  }
});

test("Progress Room invitation Ari frames are alpha-safe and anchored to a fixed portrait baseline", async () => {
  const bounds = [];

  for (const [index, src] of PROGRESS_ROOM_ARI_INVITE_FRAMES.entries()) {
    const path = `public${src}`;
    const metadata = await sharp(path).metadata();
    assert.equal(metadata.hasAlpha, true, `${index} invite frame should preserve transparency`);
    bounds.push(await foregroundBounds(path));
  }

  const bottomGaps = bounds.map((box) => box.bottomGap);
  const minBottomGap = Math.min(...bottomGaps);
  const maxBottomGap = Math.max(...bottomGaps);
  assert.ok(maxBottomGap - minBottomGap <= 4, `Ari baseline should stay fixed, got bottom gaps ${bottomGaps.join(", ")}`);

  const topEdges = bounds.map((box) => box.minY);
  const minTop = Math.min(...topEdges);
  const maxTop = Math.max(...topEdges);
  assert.ok(maxTop - minTop <= 4, `Ari head/shoulder height should stay fixed, got top edges ${topEdges.join(", ")}`);
});

test("Progress Room invitation Ari frames keep hand motion inside the portrait canvas", async () => {
  for (const [index, src] of PROGRESS_ROOM_ARI_INVITE_FRAMES.entries()) {
    const bounds = await foregroundBounds(`public${src}`);
    assert.ok(bounds.minX >= 18, `${index} invite frame should keep foreground away from the left edge, got ${bounds.minX}`);
    assert.ok(bounds.maxX <= 341, `${index} invite frame should keep foreground away from the right edge, got ${bounds.maxX}`);
  }
});

test("Progress Room invitation Ari sequence uses transitional frames instead of silhouette pops", async () => {
  const bounds = await Promise.all(
    PROGRESS_ROOM_ARI_INVITE_FRAMES.map((src) => foregroundBounds(`public${src}`)),
  );

  for (let index = 1; index < PROGRESS_ROOM_ARI_INVITE_SEQUENCE.length; index += 1) {
    const previousStep = PROGRESS_ROOM_ARI_INVITE_SEQUENCE[index - 1];
    const step = PROGRESS_ROOM_ARI_INVITE_SEQUENCE[index];
    const previous = bounds[previousStep.frame];
    const current = bounds[step.frame];
    assert.ok(Math.abs(previous.minX - current.minX) <= 32, `sequence step ${index} should not snap Ari's left silhouette from frame ${previousStep.frame} to ${step.frame}`);
    assert.ok(Math.abs(previous.maxX - current.maxX) <= 32, `sequence step ${index} should not snap Ari's right silhouette from frame ${previousStep.frame} to ${step.frame}`);
    assert.ok(Math.abs(previous.width - current.width) <= 60, `sequence step ${index} should not pop Ari's arm width from frame ${previousStep.frame} to ${step.frame}`);
  }
});

test("Progress Room invitation frames Ari as an anchored portrait rather than a floating sprite", () => {
  const source = readFileSync("src/components/ThoughtProgressPanel.jsx", "utf8");

  assert.match(source, /progress-room-ari-portrait-base/);
  assert.match(source, /progress-room-ari-portrait-shadow/);
  assert.match(source, /objectPosition: "center bottom"/);
  assert.doesNotMatch(source, /progress-room-ari-invite-sprite[\s\S]{0,220}translateY/);
  assert.doesNotMatch(source, /progress-room-ari-invite-frame[\s\S]{0,220}placeItems: "center"/);
});

test("ThoughtProgressPanel intro tracker gives brain and stat art stronger presence without widening overflow", () => {
  const source = readFileSync("src/components/ThoughtProgressPanel.jsx", "utf8");

  assert.match(source, /thought-progress-intro-meter \.thought-progress-brain-frame \{\s*width: 106px !important;/);
  assert.match(source, /gridTemplateColumns: "106px minmax\(0, 1fr\)"/);
  assert.match(source, /gridTemplateColumns: "34px minmax\(0, 1fr\)"/);
  assert.match(source, /width: 34,/);
  assert.match(source, /height: 34,/);
  assert.match(source, /minmax\(168px, 0\.62fr\) minmax\(334px, 1fr\) minmax\(300px, 1\.02fr\)/);
  assert.match(source, /thought-progress-intro-stats \.progress-room-mini-stat/);
  assert.match(source, /thought-progress-intro-stats \.progress-room-mini-stat img/);
});

test("Progress Room door and stat assets exist as project-local bitmap UI art", () => {
  assert.deepEqual(Object.keys(PROGRESS_ROOM_DOOR_ASSETS).sort(), ["closed", "crack", "glow", "open"]);
  assert.deepEqual(Object.keys(PROGRESS_ROOM_STAT_ASSETS).sort(), ["badges", "brain", "finished", "skills"]);

  for (const [id, src] of Object.entries(PROGRESS_ROOM_DOOR_ASSETS)) {
    assert.match(src, /progress-room\/progress-door-.+\.webp$/);
    assert.equal(existsSync(`public${src}`), true, `${id} door frame should exist`);
    const { width, height } = webpDimensions(`public${src}`);
    assert.equal(width, 240, `${id} door frame width`);
    assert.equal(height, 240, `${id} door frame height`);
  }

  for (const [id, src] of Object.entries(PROGRESS_ROOM_STAT_ASSETS)) {
    assert.match(src, /progress-room\/stat-.+\.webp$/);
    assert.equal(existsSync(`public${src}`), true, `${id} stat icon should exist`);
    const { width, height } = webpDimensions(`public${src}`);
    assert.equal(width, 96, `${id} stat icon width`);
    assert.equal(height, 96, `${id} stat icon height`);
  }
});

test("Progress Room sound effects are user-initiated, toggleable, and event scoped", () => {
  const source = readFileSync("src/components/ThoughtProgressPanel.jsx", "utf8");

  assert.match(source, /function useProgressRoomSfx/);
  assert.match(source, /thoughtProgressRoomSfxMuted/);
  assert.match(source, /hasInteractedRef/);
  assert.match(source, /window\.AudioContext \|\| window\.webkitAudioContext/);
  assert.match(source, /function ProgressRoomSoundToggle/);
  assert.match(source, /aria-label=\{muted \? "Turn Progress Room sounds on" : "Turn Progress Room sounds off"\}/);
  assert.match(source, /roomEnter/);
  assert.match(source, /trophyHover/);
  assert.match(source, /trophyEarned/);
  assert.match(source, /newTrophyFanfare/);
  assert.match(source, /lockedTrophy/);
  assert.match(source, /achievementPlaque/);
  assert.match(source, /roomClose/);
  assert.match(source, /sfx\.play\("roomEnter"\)/);
  assert.match(source, /sfx\.play\("tab"\)/);
  assert.match(source, /doorOpen/);
  assert.match(source, /sfx\.play\("doorOpen"\)/);
  assert.match(source, /sfx\.play\(badge\.isNew \? "newTrophyFanfare" : badge\.earned \? "trophyEarned" : "lockedTrophy"\)/);
  assert.match(source, /sfx\.play\("roomClose"\)/);
  assert.match(source, /onPointerEnter=\{\(\) => sfx\.play\("trophyHover"\)\}/);
  assert.match(source, /sfx=\{sfx\}/);
});

test("Progress Room door opening respects reduced motion and delays only for the animation", () => {
  const source = readFileSync("src/components/ThoughtProgressPanel.jsx", "utf8");

  assert.match(source, /const DOOR_OPEN_DELAY_MS = 560/);
  assert.match(source, /window\.matchMedia\("\(prefers-reduced-motion: reduce\)"\)\.matches/);
  assert.match(source, /setDoorOpening\(true\)/);
  assert.match(source, /window\.setTimeout\(\(\) => \{\s*setDoorOpening\(false\);\s*openProgressRoom\(\);\s*\}, DOOR_OPEN_DELAY_MS\)/);
  assert.match(source, /if \(reducedMotion\) \{\s*openProgressRoom\(\);\s*return;\s*\}/);
});

test("Progress Room mobile modal remains internally scrollable while body scroll is locked", () => {
  const source = readFileSync("src/components/ThoughtProgressPanel.jsx", "utf8");

  assert.match(source, /\.progress-room-shell \{\s*width: 100% !important;\s*height: 100vh !important;\s*max-height: 100vh !important;[\s\S]*overflow-y: auto !important;/);
  assert.doesNotMatch(source, /\.progress-room-shell \{[\s\S]{0,180}max-height: none !important;/);
  assert.doesNotMatch(source, /\.progress-room-shell \{[\s\S]{0,220}min-height: 100vh !important;/);
});

test("ThoughtProgressPanel renders a mastery badge trophy room with persistent new badge state", () => {
  const source = readFileSync("src/components/ThoughtProgressPanel.jsx", "utf8");

  assert.match(source, /Trophy Room/);
  assert.match(source, /data-testid="mastery-badge-trophy-room"/);
  assert.match(source, /data-testid="mastery-badge-counter"/);
  assert.match(source, /PROGRESS_ROOM_BACKDROPS/);
  assert.match(source, /getProgressRoomTier/);
  assert.match(source, /roomSlots/);
  assert.match(source, /MASTERY_BADGE_ASSETS/);
  assert.match(source, /getBadgeStatus/);
  assert.match(source, /recordEvent\(\{\s*type: "badge_viewed"/);
  assert.match(source, /badge\.isNew/);
  assert.match(source, /thought-progress-badge-new/);
  assert.match(source, /thought-progress-badge-locked/);
  assert.match(source, /borderStyle: badge\.earned \? "solid" : "dotted"/);
  assert.match(source, /grayscale\(1\)/);
  assert.match(source, /drop-shadow\(0 0 16px/);
});

test("Mastery badge assets exist as square bitmap trophy art", () => {
  assert.deepEqual(Object.keys(MASTERY_BADGE_ASSETS).sort(), BADGES.map((badge) => badge.id).sort());

  for (const [id, src] of Object.entries(MASTERY_BADGE_ASSETS)) {
    assert.match(src, /progress-badges\/badge-.+\.webp$/);
    assert.equal(existsSync(`public${src}`), true, `${id} should have a project-local badge asset`);
    const { width, height } = webpDimensions(`public${src}`);
    assert.equal(width, 220, `${id} badge width`);
    assert.equal(height, 220, `${id} badge height`);
  }
});

test("Progress Room backdrop assets exist as five 16:9 bitmap room states", () => {
  assert.equal(PROGRESS_ROOM_BACKDROPS.length, 5);

  for (const [index, src] of PROGRESS_ROOM_BACKDROPS.entries()) {
    assert.match(src, /progress-room\/room-\d\.webp$/);
    assert.equal(existsSync(`public${src}`), true, `room state ${index} should exist`);
    const { width, height } = webpDimensions(`public${src}`);
    assert.equal(width, 1280, `room state ${index} width`);
    assert.equal(height, 720, `room state ${index} height`);
  }
});

test("ThoughtProgressPanel presents generated reward art without cropping in modal frames", () => {
  const source = readFileSync("src/components/ThoughtProgressPanel.jsx", "utf8");

  assert.match(source, /className="thought-progress-panel"/);
  assert.match(source, /className="thought-progress-brain-frame"/);
  assert.match(source, /className="thought-progress-achievement-icon"/);
  assert.match(source, /PixelAssetFrame/);
  assert.match(source, /kind="brain"/);
  assert.match(source, /kind="achievement"/);
  assert.match(source, /aspectRatio: PIXEL_FRAME_RATIOS\[kind\]/);
  assert.match(source, /objectFit: "contain"/);
  assert.doesNotMatch(source, /objectFit: "cover"/);
  assert.match(source, /modalBodyRef/);
  assert.match(source, /maxHeight: "calc\(100vh - 42px\)"/);
  assert.match(source, /overflowY: "auto"/);
});

test("ThoughtProgressPanel intro keeps rewards out of the main grade page by default", () => {
  const source = readFileSync("src/components/ThoughtProgressPanel.jsx", "utf8");

  assert.match(source, /const showRewardSectionsInline = false/);
  assert.match(source, /progressRoomOpen/);
  assert.match(source, /ProgressRoomModal/);
  assert.doesNotMatch(source, /\{\(isFull \|\| isIntro\) && \(\s*<MasteryBadgeTrophyRoom/);
  assert.doesNotMatch(source, /\{\(isFull \|\| isIntro\) && \(\s*<GameAchievementsSection/);
});

test("ThoughtProgressPanel keeps HUD compact while reserving full criteria for intro and full variants", () => {
  const source = readFileSync("src/components/ThoughtProgressPanel.jsx", "utf8");

  assert.match(source, /hudNextGoalText/);
  assert.match(source, /Next mission:/);
  assert.doesNotMatch(source, /Next goal: \{nextGoalText\(\{ brain, badges, achievements \}\)\}/);
});
