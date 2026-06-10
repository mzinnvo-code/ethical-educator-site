import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

import { BRAIN_PROGRESS_ASSETS, DEEPFAKE_GAME_ASSETS } from "../data/deepfakeGameAssets.js";

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

test("Deepfake game experience exposes the 16-bit game shell and thinking mini-activities", () => {
  const source = readFileSync("src/components/DeepfakeGameExperience.jsx", "utf8");

  assert.match(source, /DeepfakeGameExperience/);
  assert.match(source, /SNES civic media quest/i);
  assert.match(source, /typewriter/i);
  assert.match(source, /Source Checker/i);
  assert.match(source, /Claim Sorter/i);
  assert.match(source, /Truth Under Pressure/i);
  assert.match(source, /Ari's Goal Tracker/i);
  assert.match(source, /trackerExperimentIds/);
  assert.match(source, /prefers-reduced-motion/i);
});

test("Deepfake typewriter uses readable one-character pacing with reveal controls", () => {
  const source = readFileSync("src/components/DeepfakeGameExperience.jsx", "utf8");

  assert.match(source, /TYPEWRITER_CHARACTER_MS = 65/);
  assert.match(source, /TYPEWRITER_PUNCTUATION_PAUSE_MS/);
  assert.match(source, /index \+= 1/);
  assert.doesNotMatch(source, /index \+= 3/);
  assert.doesNotMatch(source, /setInterval\([^)]*, 18\)/);
  assert.match(source, /Reveal text/);
  assert.match(source, /Replay text/);
  assert.match(source, /onDone/);
});

test("Deepfake typewriter drives Ari talking frames and respects reduced motion", () => {
  const source = readFileSync("src/components/DeepfakeGameExperience.jsx", "utf8");
  const assetSource = readFileSync("src/data/deepfakeGameAssets.js", "utf8");

  assert.match(assetSource, /ariIdle/);
  assert.match(assetSource, /ariTalkA/);
  assert.match(assetSource, /ariTalkB/);
  assert.match(source, /onTalkingChange/);
  assert.match(source, /setAriTalking/);
  assert.match(source, /reduced \|\| !ariTalking/);
  assert.match(source, /deepfake-portrait-mouth-cycle/);
});

test("Deepfake game exposes visual QA hooks and stages activities after dialogue", () => {
  const source = readFileSync("src/components/DeepfakeGameExperience.jsx", "utf8");

  assert.match(source, /data-testid="deepfake-game-frame"/);
  assert.match(source, /data-testid="deepfake-dialogue-panel"/);
  assert.match(source, /data-testid="deepfake-activity-panel"/);
  assert.match(source, /data-testid="deepfake-choice-deck"/);
  assert.match(source, /dialogueComplete/);
  assert.match(source, /Complete Ari's dialogue to unlock the thinking move/);
});

test("Deepfake synthesis stays inside a scrollable game panel", () => {
  const source = readFileSync("src/components/DeepfakeGameExperience.jsx", "utf8");

  assert.match(source, /maxHeight: gameWide \? 620 : 540/);
  assert.match(source, /overflowY: "auto"/);
});

test("Deepfake dialogue expands with text instead of creating an internal scroller", () => {
  const source = readFileSync("src/components/DeepfakeGameExperience.jsx", "utf8");

  assert.doesNotMatch(source, /maxHeight: gameWide \? 342 : 300/);
  assert.doesNotMatch(source, /max-height: 320px !important/);
  assert.doesNotMatch(source, /className="deepfake-game-dialogue"[\s\S]{0,900}overflowY: "auto"/);
  assert.match(source, /data-testid="deepfake-dialogue-text"/);
});

test("Deepfake game uses stable grid areas and fixed-ratio pixel asset frames", () => {
  const source = readFileSync("src/components/DeepfakeGameExperience.jsx", "utf8");

  assert.match(source, /gridTemplateAreas/);
  assert.match(source, /"stage hud"/);
  assert.match(source, /"dialogue activity"/);
  assert.match(source, /PixelAssetFrame/);
  assert.match(source, /kind="stamp"/);
  assert.match(source, /kind="scene"/);
  assert.match(source, /kind="portrait"/);
  assert.match(source, /grid-template-columns: minmax\(0, 1fr\) !important/);
  assert.match(source, /\.deepfake-ari-portrait/);
  assert.match(source, /width: 66px !important/);
  assert.doesNotMatch(source, /objectFit: "cover"/);
});

test("Deepfake synthesis narration does not render an undefined mission question", () => {
  const source = readFileSync("src/components/DeepfakeGameExperience.jsx", "utf8");

  assert.doesNotMatch(source, /Mission question: \$\{promptText\}/);
  assert.match(source, /Debrief: review the path you took and name the thinking habit you built/);
});

test("Deepfake game has project-local bitmap assets for acts, portraits, icons, and sprites", () => {
  const assetValues = [
    ...Object.values(DEEPFAKE_GAME_ASSETS.backgrounds),
    ...Object.values(DEEPFAKE_GAME_ASSETS.portraits),
    ...Object.values(DEEPFAKE_GAME_ASSETS.sprites),
    ...Object.values(DEEPFAKE_GAME_ASSETS.achievements),
    ...BRAIN_PROGRESS_ASSETS,
  ];

  assert.ok(assetValues.length >= 12);

  for (const src of assetValues) {
    assert.ok(src.endsWith(".webp") || src.endsWith(".png"), `${src} should be a bitmap asset`);
    assert.equal(existsSync(`public${src}`), true, `${src} should exist under public/`);
  }
});

test("Deepfake UI assets are regenerated for their final frame ratios", () => {
  const portraits = DEEPFAKE_GAME_ASSETS.portraits;
  assert.match(portraits.ariIdle, /ari-idle\.webp$/);
  assert.match(portraits.ariTalkA, /ari-talk-a\.webp$/);
  assert.match(portraits.ariTalkB, /ari-talk-b\.webp$/);

  for (const [id, src] of Object.entries(DEEPFAKE_GAME_ASSETS.achievements)) {
    assert.match(src, /badge-/);
    const { width, height } = webpDimensions(`public${src}`);
    assert.equal(width / height, 16 / 9, `${id} should be a 16:9 badge asset`);
  }

  for (const [index, src] of BRAIN_PROGRESS_ASSETS.entries()) {
    assert.match(src, /brain-ui-/);
    const { width, height } = webpDimensions(`public${src}`);
    assert.equal(width, 260, `brain ${index} width`);
    assert.equal(height, 190, `brain ${index} height`);
  }
});

test("Deepfake cinematic assets include animated act stamps and focused scene windows", () => {
  const stageIds = ["viral-clip", "almost-true", "your-side", "synthesis"];

  for (const stageId of stageIds) {
    assert.ok(Array.isArray(DEEPFAKE_GAME_ASSETS.actStamps?.[stageId]), `${stageId} needs animated stamp frames`);
    assert.ok(DEEPFAKE_GAME_ASSETS.actStamps[stageId].length >= 2, `${stageId} needs at least two stamp frames`);

    for (const [index, src] of DEEPFAKE_GAME_ASSETS.actStamps[stageId].entries()) {
      assert.match(src, /act-stamps\/.+-\d+\.webp$/);
      const { width, height } = webpDimensions(`public${src}`);
      assert.equal(width, 320, `${stageId} stamp ${index} width`);
      assert.equal(height, 180, `${stageId} stamp ${index} height`);
    }

    assert.match(DEEPFAKE_GAME_ASSETS.sceneFocus?.[stageId], /scene-focus\/.+\.webp$/);
    const { width, height } = webpDimensions(`public${DEEPFAKE_GAME_ASSETS.sceneFocus[stageId]}`);
    assert.equal(width, 640, `${stageId} focus width`);
    assert.equal(height, 360, `${stageId} focus height`);
  }
});

test("Deepfake game uses dedicated atmospheric backdrops instead of stretching focused scenes", () => {
  const stageIds = ["viral-clip", "almost-true", "your-side", "synthesis"];

  for (const stageId of stageIds) {
    assert.match(DEEPFAKE_GAME_ASSETS.atmosphericBackdrops?.[stageId], /atmospheric-backdrops\/.+\.webp$/);
    const { width, height } = webpDimensions(`public${DEEPFAKE_GAME_ASSETS.atmosphericBackdrops[stageId]}`);
    assert.equal(width, 1280, `${stageId} atmospheric backdrop width`);
    assert.equal(height, 720, `${stageId} atmospheric backdrop height`);
  }
});

test("Deepfake cinematic shell stages focused scene before the mini-game", () => {
  const source = readFileSync("src/components/DeepfakeGameExperience.jsx", "utf8");

  assert.match(source, /function AnimatedPixelStamp/);
  assert.match(source, /function FocusedSceneWindow/);
  assert.match(source, /data-testid="deepfake-focused-scene"/);
  assert.match(source, /scene-expanded/);
  assert.match(source, /dialogueComplete/);
  assert.match(source, /DEEPFAKE_GAME_ASSETS\.actStamps/);
  assert.match(source, /DEEPFAKE_GAME_ASSETS\.sceneFocus/);
  assert.doesNotMatch(source, /className="deepfake-game-sprite"/);
});

test("Deepfake focused scene stays visible while the backdrop parallax handles atmosphere", () => {
  const source = readFileSync("src/components/DeepfakeGameExperience.jsx", "utf8");

  assert.match(source, /deepfakeBackgroundForStage\(stageId\)/);
  assert.doesNotMatch(source, /const background = dialogueComplete \? sceneFocus : deepfakeBackgroundForStage\(stageId\)/);
  assert.match(source, /className="deepfake-game-backdrop"/);
  assert.match(source, /className="deepfake-game-backdrop-reveal"/);
  assert.match(source, /className="deepfake-game-backdrop-shift"/);
  assert.doesNotMatch(source, /backgroundAttachment/);
  assert.match(source, /opacity: 1/);
  assert.doesNotMatch(source, /\.deepfake-focused-scene\.scene-expanded \{\s*opacity: 0\.58/);
});

test("Deepfake backdrop expansion uses vertical reveal instead of zooming side detail", () => {
  const source = readFileSync("src/components/DeepfakeGameExperience.jsx", "utf8");

  assert.doesNotMatch(source, /scale\(1\.04\)/);
  assert.doesNotMatch(source, /scale\(1\.02\)/);
  assert.doesNotMatch(source, /transform: dialogueComplete && !reduced \? "scale/);
  assert.doesNotMatch(source, /bottom: dialogueComplete && !reduced \? -120 : 0/);
  assert.doesNotMatch(source, /backgroundPosition: dialogueComplete && !reduced \? "center bottom" : "center top"/);
  assert.match(source, /height: "calc\(100% \+ var\(--deepfake-backdrop-reveal, 180px\)\)"/);
  assert.match(source, /transform: dialogueComplete \|\| reduced \? "translateY\(0\)" : "translateY\(calc\(var\(--deepfake-backdrop-reveal, 180px\) \* -1\)\)"/);
  assert.match(source, /backgroundSize: "100% auto"/);
  assert.match(source, /backgroundPosition: "center top"/);
});

test("Focused scene window keeps its cinematic frame composed with Ari dialogue", () => {
  const source = readFileSync("src/components/DeepfakeGameExperience.jsx", "utf8");

  assert.match(source, /deepfake-focused-scene/);
  assert.match(source, /sceneClassName/);
  assert.match(source, /width: "min\(100%, clamp\(420px, 60vw, 620px\)\)"/);
  assert.match(source, /justifySelf: "center"/);
});

test("Deepfake mini-games are replayable and choices require current-run completion", () => {
  const source = readFileSync("src/components/DeepfakeGameExperience.jsx", "utf8");

  assert.match(source, /mastered=/);
  assert.match(source, /achievementStatus\.some/);
  assert.match(source, /completedActivities\[stage\.id\]/);
  assert.doesNotMatch(source, /activityComplete =[\s\S]{0,180}achievementStatus\.some/);
  assert.match(source, /data-testid="source-checker-meter"/);
  assert.match(source, /data-testid="source-tool-card"/);
  assert.match(source, /data-testid="claim-sorter-card"/);
  assert.match(source, /data-testid="claim-sorter-bin"/);
  assert.match(source, /selectedClaimId/);
  assert.match(source, /onKeyDown/);
  assert.match(source, /wrongPlacement/);
  assert.match(source, /data-testid="truth-pressure-rule"/);
  assert.match(source, /pressureCase/);
});

test("Deepfake mini-game activity boards stack cleanly on narrow screens", () => {
  const source = readFileSync("src/components/DeepfakeGameExperience.jsx", "utf8");

  assert.match(source, /className="deepfake-source-checker-grid"/);
  assert.match(source, /\.deepfake-source-checker-grid/);
  assert.match(source, /grid-template-columns: minmax\(0, 1fr\) !important/);
});

test("ScenarioCard routes deepfake-election in 6-8 story mode through the embedded game shell", () => {
  const source = readFileSync("src/components/ScenarioCard.jsx", "utf8");

  assert.match(source, /DeepfakeGameExperience/);
  assert.match(source, /experiment\.id === "deepfake-election"/);
  assert.match(source, /mode === "story"/);
  assert.match(source, /experimentIds = \[\]/);
  assert.match(source, /experimentIds=\{experimentIds\}/);
  assert.match(source, /onChoose=\{handleChoose\}/);
  assert.match(source, /onNext=\{handleNext\}/);
});

test("Deepfake story mode can opt into a wider game layout", () => {
  const scenarioSource = readFileSync("src/components/ScenarioCard.jsx", "utf8");
  const gradeSource = readFileSync("src/pages/thought-experiments/GradePage.jsx", "utf8");

  assert.match(scenarioSource, /gameWide=\{isDeepfakeStoryGame\}/);
  assert.match(scenarioSource, /compact=\{isDeepfakeStoryGame\}/);
  assert.match(gradeSource, /isDeepfakeActive/);
  assert.match(gradeSource, /maxWidth: isDeepfakeActive \? 1040 : 740/);
});
