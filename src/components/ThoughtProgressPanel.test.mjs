import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import test from "node:test";
import sharp from "sharp";

// The tracker UI is split across ThoughtProgressPanel.jsx (shell + modal) and
// src/components/wonder/* (themes, sfx, dashboard, primitives). Source-level
// assertions read the concatenation so they keep guarding behavior no matter
// which module a piece lives in.
function readWonderSource() {
  const wonderDir = "src/components/wonder";
  const wonderFiles = readdirSync(wonderDir)
    .filter((file) => (file.endsWith(".js") || file.endsWith(".jsx")) && !file.endsWith(".test.mjs"))
    .sort()
    .map((file) => readFileSync(`${wonderDir}/${file}`, "utf8"));
  return [readFileSync("src/components/ThoughtProgressPanel.jsx", "utf8"), ...wonderFiles].join("\n");
}

import * as deepfakeGameAssets from "../data/deepfakeGameAssets.js";
import { BADGES, K5_BADGES } from "../lib/thoughtProgress.js";

const {
  MASTERY_BADGE_ASSETS,
  PROGRESS_ROOM_ARI_INVITE_ASSETS,
  PROGRESS_ROOM_ARI_INVITE_FRAMES,
  PROGRESS_ROOM_ARI_INVITE_SEQUENCE,
  PROGRESS_ROOM_BACKDROPS,
  PROGRESS_ROOM_DOOR_ASSETS,
  PROGRESS_ROOM_STAT_ASSETS,
  K5_BRAIN_PROGRESS_ASSETS,
  K5_MASTERY_BADGE_ASSETS,
  K5_PROGRESS_ROOM_ARI_INVITE_FRAMES,
  K5_PROGRESS_ROOM_BACKDROPS,
  K5_PROGRESS_ROOM_DOOR_ASSETS,
  K5_PROGRESS_ROOM_STAT_ASSETS,
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
  const source = readWonderSource();

  assert.match(source, /Ari's Goal Tracker/);
  assert.match(source, /How to earn/);
  assert.match(source, /BrainProgressIcon/);
  assert.match(source, /Next goal/);
  assert.match(source, /variant === "hud"/);
  assert.match(source, /getBrainProgress/);
  assert.doesNotMatch(source, /badge\.earned \? "\*" : "o"/);
});

test("ThoughtProgressPanel has a reusable Game Achievements section with counters and grouping", () => {
  const source = readWonderSource();

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
  const source = readWonderSource();

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
  const source = readWonderSource();

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
  const source = readWonderSource();
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
  const source = readWonderSource();

  assert.match(source, /progress-room-ari-portrait-base/);
  assert.match(source, /progress-room-ari-portrait-shadow/);
  assert.match(source, /objectPosition: "center bottom"/);
  assert.doesNotMatch(source, /progress-room-ari-invite-sprite[\s\S]{0,220}translateY/);
  assert.doesNotMatch(source, /progress-room-ari-invite-frame[\s\S]{0,220}placeItems: "center"/);
});

test("Wonder dashboard intro variant lays out as one overflow-proof game screen", () => {
  const source = readWonderSource();

  // One cohesive pixel-framed panel renders the intro variant.
  assert.match(source, /function WonderDashboard/);
  assert.match(source, /className="wonder-dashboard-inner"/);
  assert.match(source, /<WonderDashboard/);

  // Layout rules live in the stylesheet (not inline) so media queries restack
  // rows without !important overrides.
  assert.match(source, /\.wonder-dashboard-body \{[\s\S]{0,200}grid-template-columns: minmax\(0, 1fr\) auto;/);
  assert.match(source, /@media \(max-width: 760px\) \{\s*\.wonder-dashboard-body \{ grid-template-columns: minmax\(0, 1fr\); \}/);
  assert.doesNotMatch(source, /\.thought-progress-intro-meter/);
  assert.doesNotMatch(source, /\.thought-progress-intro-stats/);
  assert.doesNotMatch(source, /minmax\(168px, 0\.62fr\) minmax\(334px, 1fr\) minmax\(300px, 1\.02fr\)/);

  // The brain art scales fluidly (no fixed-width + aspect-ratio collision) and
  // the percent label can no longer spill out of a fixed column.
  assert.match(source, /\.wonder-dashboard-meter-brain \{[\s\S]{0,120}width: clamp\([\s\S]{0,80}height: auto;/);

  // The lights meter renders one cell per goal instead of four duplicate stat cards.
  assert.match(source, /function SegmentBar/);
  assert.match(source, /repeat\(\$\{safeTotal\}, 1fr\)/);
  assert.match(source, /wonder-lights-bar/);
  assert.doesNotMatch(source, /function MiniPixelTrackerStat/);

  // Ari speaks the next quest from the same helper the HUD uses.
  assert.match(source, /wonder-dashboard-bubble/);
  assert.match(source, /hudNextGoalText\(\{ brain, badges, achievements \}\)/);
});

test("Wonder Workshop room grows: 24 memento shelf slots clear of trophy slots", async () => {
  const layout = await import("./wonder/workshopLayout.js");
  const slots = layout.K5_MEMENTO_SLOTS;

  assert.equal(slots.length, 24);
  const seen = new Set(slots.map((slot) => `${slot.left}|${slot.top}`));
  assert.equal(seen.size, 24, "memento slots should not overlap each other");
  for (const slot of slots) {
    const top = Number.parseFloat(slot.top);
    assert.ok(top <= 26 || top >= 80, `memento shelf at ${slot.top} must stay clear of the trophy band (31-64%)`);
  }

  const diff = layout.diffRoomEntrance({
    seen: { tier: 1, completedIds: ["magic-toy"], badgeCount: 1 },
    roomTier: 2,
    completedIds: ["magic-toy", "rude-toy"],
    badgeCount: 2,
  });
  assert.equal(diff.prevTier, 1);
  assert.deepEqual(diff.newIds, ["rude-toy"]);
  assert.equal(diff.shouldAnimate, true);

  const same = layout.diffRoomEntrance({
    seen: { tier: 2, completedIds: ["magic-toy", "rude-toy"], badgeCount: 2 },
    roomTier: 2,
    completedIds: ["magic-toy", "rude-toy"],
    badgeCount: 2,
  });
  assert.equal(same.shouldAnimate, false);
});

test("Wonder Workshop room renders mementos, a lights-on entrance, and a focus trap", () => {
  const source = readWonderSource();

  assert.match(source, /function MementoSlot/);
  assert.match(source, /data-testid="wonder-memento-slot"/);
  assert.match(source, /data-testid="wonder-memento-counter"/);
  assert.match(source, /data-testid="wonder-memento-detail"/);
  assert.match(source, /Empty shelf spot: finish/);
  assert.match(source, /ee:wonder-room-seen:v1/);
  assert.match(source, /diffRoomEntrance/);
  assert.match(source, /writeRoomSeen/);
  assert.match(source, /wonder-room-prev/);
  assert.match(source, /wonder-memento-pop/);
  assert.match(source, /const trapFocus/);
  assert.match(source, /event\.shiftKey && document\.activeElement === first/);
  assert.match(source, /data-testid="progress-room-stats"/);
  assert.match(source, /mementoItems=\{mementoItems\}/);
});

test("K-5 stories celebrate completion and hand the +1 light back to the hub", () => {
  const wonderSource = readWonderSource();
  const scenarioSource = readFileSync("src/components/ScenarioCard.jsx", "utf8");
  const hubSource = readFileSync("src/pages/thought-experiments/K5.jsx", "utf8");

  // Overlay exists with confetti, trophy banners, and accessible dialog wiring.
  assert.match(wonderSource, /function CelebrationOverlay/);
  assert.match(wonderSource, /data-testid="wonder-celebration"/);
  assert.match(wonderSource, /data-testid="wonder-celebration-trophy"/);
  assert.match(wonderSource, /wonder-confetti-fall/);
  assert.match(wonderSource, /\+1 wonder light/);
  assert.match(wonderSource, /Back to the map/);
  assert.match(wonderSource, /Play it again/);

  // ScenarioCard diffs progress before/after the completion event, gates the
  // overlay to kid mode, and guards StrictMode's double effect.
  assert.match(scenarioSource, /const prev = readThoughtProgress\(\)/);
  assert.match(scenarioSource, /const next = recordThoughtProgress\(/);
  assert.match(scenarioSource, /diffCompletion\(prev, next, experiment\.id\)/);
  assert.match(scenarioSource, /mode !== "kid" \|\| celebratedRef\.current/);
  assert.match(scenarioSource, /writeCelebration\(\{ experimentId: experiment\.id \}\)/);
  assert.match(scenarioSource, /onGoToHub=\{onGoToHub\}/);

  // The hub consumes the handoff once and lights the meter + map node.
  assert.match(wonderSource, /ee:wonder-celebrate:v1/);
  assert.match(wonderSource, /readAndClearCelebration/);
  assert.match(hubSource, /readAndClearCelebration\(\)/);
  assert.match(hubSource, /celebrateExperimentId=\{celebrateExperimentId\}/);
  assert.match(wonderSource, /wonder-map-node-celebrate/);
  assert.match(wonderSource, /wonder-cell-flash/);
});

test("Wonder Workshop audio uses generated samples with synth fallback and a music loop", async () => {
  const wonderSource = readWonderSource();
  const scenarioSource = readFileSync("src/components/ScenarioCard.jsx", "utf8");
  const audioLib = readFileSync("src/lib/wonderAudio.js", "utf8");
  const script = readFileSync("scripts/generate-workshop-audio.mjs", "utf8");
  const pkg = JSON.parse(readFileSync("package.json", "utf8"));

  // The generation script mirrors the k5 audio conventions.
  assert.match(script, /WORKSHOP_AUDIO_CATALOG/);
  assert.match(script, /--dry-run/);
  assert.match(script, /sound-generation/);
  assert.match(script, /workshopAudioManifest\.json/);
  assert.equal(pkg.scripts["audio:workshop"], "node --env-file=.env.local scripts/generate-workshop-audio.mjs");

  // Catalog ids cover every cue the runtime maps.
  const { WORKSHOP_AUDIO_CATALOG } = await import("../../scripts/generate-workshop-audio.mjs");
  const catalogIds = new Set(WORKSHOP_AUDIO_CATALOG.map((entry) => entry.id));
  for (const id of ["choice-blip", "choice-deep", "stage-turn", "story-complete", "trophy-fanfare", "light-on", "lights-on-sweep", "door-open", "room-close", "memento-pop", "badge-locked", "ui-tap", "workshop-music"]) {
    assert.ok(catalogIds.has(id), `catalog should include ${id}`);
  }

  // Runtime degrades gracefully and keeps music separate from narration.
  assert.match(audioLib, /export function playWonderSfx/);
  assert.match(audioLib, /return false/);
  assert.match(audioLib, /wonderMusic/);
  assert.match(audioLib, /loop = true/);
  assert.match(audioLib, /typeof Audio !== "undefined"/);

  // Cues try samples first, then fall back to synth tones; music respects mute.
  assert.match(wonderSource, /SAMPLE_BY_CUE/);
  assert.match(wonderSource, /if \(sampleId && playWonderSfx\(sampleId\)\) return;/);
  assert.match(wonderSource, /wonderMusic\.start\(\)/);
  assert.match(wonderSource, /\[open, sfx\.muted\]/);
  assert.match(scenarioSource, /playWonderSfx\("choice-blip"\)/);
  assert.match(scenarioSource, /playWonderSfx\("stage-turn"\)/);
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
  const source = readWonderSource();

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
  const source = readWonderSource();

  assert.match(source, /const DOOR_OPEN_DELAY_MS = 560/);
  assert.match(source, /window\.matchMedia\("\(prefers-reduced-motion: reduce\)"\)\.matches/);
  assert.match(source, /setDoorOpening\(true\)/);
  assert.match(source, /window\.setTimeout\(\(\) => \{\s*setDoorOpening\(false\);\s*openProgressRoom\(\);\s*\}, DOOR_OPEN_DELAY_MS\)/);
  assert.match(source, /if \(reducedMotion\) \{\s*openProgressRoom\(\);\s*return;\s*\}/);
});

test("Progress Room mobile modal remains internally scrollable while body scroll is locked", () => {
  const source = readWonderSource();

  assert.match(source, /\.progress-room-shell \{\s*width: 100% !important;\s*height: 100vh !important;\s*max-height: 100vh !important;[\s\S]*overflow-y: auto !important;/);
  assert.doesNotMatch(source, /\.progress-room-shell \{[\s\S]{0,180}max-height: none !important;/);
  assert.doesNotMatch(source, /\.progress-room-shell \{[\s\S]{0,220}min-height: 100vh !important;/);
});

test("ThoughtProgressPanel renders a mastery badge trophy room with persistent new badge state", () => {
  const source = readWonderSource();

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
  const source = readWonderSource();

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
  const source = readWonderSource();

  assert.match(source, /const showRewardSectionsInline = false/);
  assert.match(source, /progressRoomOpen/);
  assert.match(source, /ProgressRoomModal/);
  assert.doesNotMatch(source, /\{\(isFull \|\| isIntro\) && \(\s*<MasteryBadgeTrophyRoom/);
  assert.doesNotMatch(source, /\{\(isFull \|\| isIntro\) && \(\s*<GameAchievementsSection/);
});

test("ThoughtProgressPanel supports a K-5 Wonder Workshop skin without showing game achievements", () => {
  const source = readWonderSource();

  assert.match(source, /TRACKER_THEMES/);
  assert.match(source, /trackerTheme = "middle"/);
  assert.match(source, /badgeSetId = "middle"/);
  assert.match(source, /Ari's Wonder Workshop/);
  assert.match(source, /Your thinking lights are turning on/);
  assert.match(source, /Open the workshop to see what you.ve earned/);
  assert.match(source, /showAchievementsTab/);
  assert.match(source, /theme\.showAchievementsTab/);
  assert.match(source, /K5_PROGRESS_ROOM_ARI_INVITE_FRAMES/);
  assert.match(source, /K5_PROGRESS_ROOM_DOOR_ASSETS/);
  assert.match(source, /K5_BRAIN_PROGRESS_ASSETS/);
  assert.match(source, /getBadgeStatus\(progress, \{ badgeSetId, experimentIds \}\)/);
});

test("K-5 Wonder Workshop asset registries reference project-local bitmap art", () => {
  assert.equal(K5_BRAIN_PROGRESS_ASSETS.length, 6);
  assert.equal(K5_PROGRESS_ROOM_BACKDROPS.length, 5);
  assert.equal(K5_PROGRESS_ROOM_ARI_INVITE_FRAMES.length >= 12, true);
  assert.deepEqual(Object.keys(K5_PROGRESS_ROOM_DOOR_ASSETS).sort(), ["closed", "crack", "glow", "open"]);
  assert.deepEqual(Object.keys(K5_PROGRESS_ROOM_STAT_ASSETS).sort(), ["badges", "brain", "finished", "skills"]);
  assert.deepEqual(Object.keys(K5_MASTERY_BADGE_ASSETS).sort(), K5_BADGES.map((badge) => badge.id).sort());

  for (const [index, src] of K5_BRAIN_PROGRESS_ASSETS.entries()) {
    assert.match(src, /progress-brain-k5\/wonder-light-\d\.webp$/);
    assert.equal(existsSync(`public${src}`), true, `K-5 brain/light state ${index} should exist`);
    const { width, height } = webpDimensions(`public${src}`);
    assert.equal(width, 260, `K-5 brain/light state ${index} width`);
    assert.equal(height, 190, `K-5 brain/light state ${index} height`);
  }

  for (const [index, src] of K5_PROGRESS_ROOM_BACKDROPS.entries()) {
    assert.match(src, /progress-room-k5\/workshop-room-\d\.webp$/);
    assert.equal(existsSync(`public${src}`), true, `K-5 workshop room ${index} should exist`);
    const { width, height } = webpDimensions(`public${src}`);
    assert.equal(width, 1280, `K-5 workshop room ${index} width`);
    assert.equal(height, 720, `K-5 workshop room ${index} height`);
  }

  for (const [id, src] of Object.entries(K5_MASTERY_BADGE_ASSETS)) {
    assert.match(src, /progress-badges-k5\/badge-.+\.webp$/);
    assert.equal(existsSync(`public${src}`), true, `${id} K-5 badge art should exist`);
    const { width, height } = webpDimensions(`public${src}`);
    assert.equal(width, 220, `${id} K-5 badge width`);
    assert.equal(height, 220, `${id} K-5 badge height`);
  }
});

test("ThoughtProgressPanel keeps HUD compact while reserving full criteria for intro and full variants", () => {
  const source = readWonderSource();

  assert.match(source, /hudNextGoalText/);
  assert.match(source, /Next mission:/);
  assert.doesNotMatch(source, /Next goal: \{nextGoalText\(\{ brain, badges, achievements \}\)\}/);
});
