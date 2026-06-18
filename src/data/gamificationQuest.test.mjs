import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import test from "node:test";
import sharp from "sharp";

import {
  GAMEFUL_BONUS_VIDEO,
  GAMEFUL_DO_TOMORROW,
  GAMEFUL_REFLECTION_PROMPTS,
  GAMEFUL_RESOURCE_GROUPS,
  GAMEFUL_TAKEAWAYS,
  GAMIFICATION_GAME_ROOMS,
  GAMIFICATION_GAME_STAGES,
  GAMIFICATION_PHASER_ASSETS,
  GAMIFICATION_QUEST_ASSETS,
  GAMIFICATION_REWARD_CARD_ASSETS,
  GAMIFICATION_QUEST_STORAGE_KEY,
  GAMIFICATION_QUEST_SOURCES,
  GAMIFICATION_QUEST_LEVELS,
  GAMIFICATION_SOUND_CUES,
  GAMIFICATION_WORLD_MAP,
} from "./gamificationQuest.js";

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

async function webpHasAlpha(path) {
  const { data, info } = await sharp(path)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let index = 3; index < data.length; index += info.channels) {
    if (data[index] < 250) return true;
  }
  return false;
}

async function imageDimensions(path) {
  const metadata = await sharp(path).metadata();
  return { width: metadata.width, height: metadata.height };
}

async function alphaBounds(path, region) {
  let image = sharp(path).ensureAlpha();
  if (region) image = image.extract(region);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  let minX = info.width;
  let minY = info.height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < info.height; y += 1) {
    for (let x = 0; x < info.width; x += 1) {
      const alpha = data[(y * info.width + x) * info.channels + 3];
      if (alpha > 8) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  assert.ok(maxX >= minX && maxY >= minY, `${path} should contain opaque sprite pixels`);
  return {
    width: maxX - minX + 1,
    height: maxY - minY + 1,
  };
}

async function brightPixelCount(path, region) {
  const { data, info } = await sharp(path)
    .extract(region)
    .raw()
    .toBuffer({ resolveWithObject: true });
  let bright = 0;
  for (let index = 0; index < data.length; index += info.channels) {
    const red = data[index];
    const green = data[index + 1];
    const blue = data[index + 2];
    if (red > 160 && green > 140 && blue > 90) bright += 1;
  }
  return bright;
}

async function warmPathPixelCount(path, region) {
  const { data, info } = await sharp(path)
    .extract(region)
    .raw()
    .toBuffer({ resolveWithObject: true });
  let warm = 0;
  for (let index = 0; index < data.length; index += info.channels) {
    const red = data[index];
    const green = data[index + 1];
    const blue = data[index + 2];
    if (red > 120 && green > 85 && blue < 115) warm += 1;
  }
  return warm;
}

function assertInBox(point, box, message) {
  assert.ok(
    point.x >= box.left
      && point.x <= box.left + box.width
      && point.y >= box.top
      && point.y <= box.top + box.height,
    `${message}: expected (${point.x}, ${point.y}) inside ${JSON.stringify(box)}`,
  );
}

test("gamification quest uses a browser-only local storage key", () => {
  assert.equal(GAMIFICATION_QUEST_STORAGE_KEY, "ee:gamification-quest:v4");
});

test("gamification quest level ids are unique", () => {
  const ids = GAMIFICATION_QUEST_LEVELS.map((level) => level.id);
  assert.deepEqual(new Set(ids).size, ids.length);
});

test("gamification quest includes every planned source as an https citation", () => {
  const expectedSourceIds = [
    "ted-rober-2026",
    "nsta-rober-2026",
    "class-crunchlabs",
    "willingham-attention",
    "kcl-attention",
    "anxious-generation",
    "haidt-screens-childhood-2026",
    "odgers-nature",
    "self-determination-theory",
    "frontiers-gamification-2023",
    "springer-motivation-2024",
    "teachai-guidance-toolkit",
    "bigthink-brain-games",
    "goal-gradient-kivetz",
    "dopamine-reward-prediction",
  ];

  for (const id of expectedSourceIds) {
    const source = GAMIFICATION_QUEST_SOURCES.find((item) => item.id === id);
    assert.ok(source, `Missing source ${id}`);
    assert.match(source.href, /^https:\/\//, `${id} should use an https URL`);
  }
});

test("gamification bonus mission cites and embeds the Haidt TED2026 talk with a debrief", () => {
  const sourceIds = new Set(GAMIFICATION_QUEST_SOURCES.map((item) => item.id));

  // The cited talk is the watch-and-reflect bonus, embedded by YouTube id.
  assert.equal(GAMEFUL_BONUS_VIDEO.id, "DH9L7vJ03DE");
  assert.ok(sourceIds.has(GAMEFUL_BONUS_VIDEO.sourceId), "bonus video links a known citation");
  assert.equal(GAMEFUL_BONUS_VIDEO.sourceId, "haidt-screens-childhood-2026");
  assert.match(GAMEFUL_BONUS_VIDEO.framing, /people and books|analog|evidence/i);

  // The "left a real PD" debrief: takeaways, do-tomorrow moves, reflection.
  assert.ok(GAMEFUL_TAKEAWAYS.length >= 6, "debrief needs a full set of takeaways");
  for (const item of GAMEFUL_TAKEAWAYS) {
    assert.ok(item.title?.length > 8 && item.text?.length > 30, "each takeaway needs a title and substance");
  }
  assert.ok(GAMEFUL_DO_TOMORROW.length >= 5, "debrief needs concrete do-tomorrow moves");
  assert.ok(GAMEFUL_REFLECTION_PROMPTS.length >= 3, "bonus mission needs reflection prompts");
  // The "not a panacea" takeaway must carry all three of Haidt's technoskepticism
  // principles, not merely the word "technoskepticism".
  const haidtTakeaway = JSON.stringify(GAMEFUL_TAKEAWAYS.find((t) => /screens/i.test(t.title)));
  assert.match(haidtTakeaway, /people and books/i);
  assert.match(haidtTakeaway, /developing brains|brain development/i);
  assert.match(haidtTakeaway, /artificial relationships/i);

  // Every grouped resource resolves, and the Haidt talk is in the library.
  const groupedIds = GAMEFUL_RESOURCE_GROUPS.flatMap((group) => group.sourceIds);
  for (const id of groupedIds) {
    assert.ok(sourceIds.has(id), `resource group references known source ${id}`);
  }
  assert.ok(groupedIds.includes("haidt-screens-childhood-2026"), "resource library includes the Haidt talk");
});

test("every claim-bearing gamification room exposes linked sources", () => {
  const sourceIds = new Set(GAMIFICATION_QUEST_SOURCES.map((item) => item.id));

  for (const room of GAMIFICATION_GAME_ROOMS) {
    if (room.kind === "home") continue;
    assert.ok(room.sourceIds?.length > 0, `${room.id} should expose sources in the source drawer`);
    for (const sourceId of room.sourceIds) {
      assert.ok(sourceIds.has(sourceId), `${room.id} references known source ${sourceId}`);
    }
  }
});

test("every gamification quest micro-challenge has a reward label", () => {
  for (const level of GAMIFICATION_QUEST_LEVELS) {
    assert.ok(level.challenge, `${level.id} should include a micro-challenge`);
    assert.ok(level.challenge.id, `${level.id} challenge needs an id`);
    assert.ok(level.challenge.reward, `${level.id} challenge needs a reward label`);
    assert.ok(level.challenge.transfer, `${level.id} challenge needs a teacher transfer move`);
  }
});

test("gamification quest does not require accounts or leaderboard progress", () => {
  const serialized = JSON.stringify(GAMIFICATION_QUEST_LEVELS).toLowerCase();

  assert.doesNotMatch(serialized, /account/);
  assert.doesNotMatch(serialized, /leaderboard/);
  assert.doesNotMatch(serialized, /server sync/);
});

test("gamification overworld path includes home plus the full planned progression", () => {
  assert.deepEqual(
    GAMIFICATION_WORLD_MAP.nodes.map((node) => node.id),
    [
      "home",
      "upshot",
      "attention-environment",
      "curiosity-hook",
      "motivation-engine",
      "evidence-lab",
      "ai-lesson-forge",
      "teacher-workshop",
      "examined-model",
      "finale",
    ],
  );

  assert.match(GAMIFICATION_WORLD_MAP.background, /^\/experiment-scenes\/gamification-article\/.+\.(webp|png)$/);
  assert.equal(existsSync(`public${GAMIFICATION_WORLD_MAP.background}`), true, "overworld background should exist");

  const nodeIds = new Set(GAMIFICATION_WORLD_MAP.nodes.map((node) => node.id));
  for (const node of GAMIFICATION_WORLD_MAP.nodes) {
    assert.equal(typeof node.x, "number", `${node.id} needs a world x coordinate`);
    assert.equal(typeof node.y, "number", `${node.id} needs a world y coordinate`);
    assert.ok(node.label, `${node.id} needs a map label`);
    if (node.id === "home") {
      assert.equal(node.kind, "home");
      assert.equal(node.roomId, null);
    } else {
      assert.equal(node.roomId, node.id, `${node.id} should enter its matching room`);
    }
  }

  const expectedEdges = GAMIFICATION_WORLD_MAP.nodes.slice(0, -1).map((node, index) => [
    node.id,
    GAMIFICATION_WORLD_MAP.nodes[index + 1].id,
  ]);
  assert.deepEqual(
    GAMIFICATION_WORLD_MAP.edges.map((edge) => [edge.from, edge.to]),
    expectedEdges,
    "journey path edges should follow the room order",
  );

  for (const edge of GAMIFICATION_WORLD_MAP.edges) {
    assert.ok(nodeIds.has(edge.from), `${edge.from} edge start exists`);
    assert.ok(nodeIds.has(edge.to), `${edge.to} edge end exists`);
    assert.ok(edge.points.length >= 2, `${edge.from}->${edge.to} needs a path segment`);
    for (const point of edge.points) {
      assert.equal(typeof point.x, "number", `${edge.from}->${edge.to} point needs x`);
      assert.equal(typeof point.y, "number", `${edge.from}->${edge.to} point needs y`);
    }
  }
});

test("gamification overworld composition keeps the path ordered and fully visible", () => {
  const node = (id) => GAMIFICATION_WORLD_MAP.nodes.find((item) => item.id === id);
  const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  const home = node("home");
  const upshot = node("upshot");
  const attention = node("attention-environment");
  const curiosity = node("curiosity-hook");
  const motivation = node("motivation-engine");
  const evidence = node("evidence-lab");
  const ai = node("ai-lesson-forge");
  const teacher = node("teacher-workshop");
  const examined = node("examined-model");
  const finale = node("finale");

  assert.ok(home.x < upshot.x && Math.abs(upshot.y - home.y) <= 50, "Level 1 should be the first visible stop after Home");
  assert.ok(distance(home, upshot) < distance(home, attention), "Level 2 should not appear between Home and Level 1");
  assert.ok(distance(home, upshot) < distance(home, evidence), "Level 5 should not appear between Home and Level 1");
  assertInBox(attention, { left: 450, top: 445, width: 105, height: 58 }, "Level 2 should sit on the lower bridge path");
  assertInBox(curiosity, { left: 575, top: 410, width: 90, height: 60 }, "Level 3 should sit on the lower-right road curve");
  assertInBox(motivation, { left: 625, top: 360, width: 85, height: 60 }, "Level 4 should sit on the next visible road curve");
  assertInBox(evidence, { left: 545, top: 300, width: 95, height: 70 }, "Level 5 should sit at the central path intersection");
  assert.ok(evidence.y > ai.y && ai.y > teacher.y && teacher.y > examined.y, "Levels 5-8 should climb upward in order");
  assert.ok(finale.x > examined.x && finale.y <= examined.y, "Finale should be visibly after Level 8 near the destination");
  assertInBox(finale, { left: 675, top: 70, width: 90, height: 70 }, "Finale marker should sit at the reward temple entrance");

  for (const mapNode of GAMIFICATION_WORLD_MAP.nodes) {
    assert.ok(mapNode.x >= 52 && mapNode.x <= 860, `${mapNode.id} stays inside horizontal map safe bounds`);
    assert.ok(mapNode.y >= 58 && mapNode.y <= 500, `${mapNode.id} stays inside vertical map safe bounds`);
  }
});

test("gamification overworld background uses the detailed cleaned production map", async () => {
  const backgroundPath = `public${GAMIFICATION_WORLD_MAP.background}`;
  assert.equal(
    GAMIFICATION_WORLD_MAP.background,
    "/experiment-scenes/gamification-article/overworld-map-v4-clean.webp",
  );
  assert.deepEqual(webpDimensions(backgroundPath), { width: 960, height: 540 });
  assert.ok(
    statSync(backgroundPath).size > 120_000,
    "Journey Path background should preserve rich production detail, not the low-detail SVG fallback",
  );
  assert.ok(
    await brightPixelCount(backgroundPath, { left: 312, top: 204, width: 32, height: 34 }) < 24,
    "Journey Path background should remove the baked first-stop 5 so Phaser owns stop numbering",
  );
  assert.ok(
    await warmPathPixelCount(backgroundPath, { left: 450, top: 452, width: 90, height: 45 }) > 450,
    "Journey Path background should keep the lower bridge/path visible",
  );
  assert.ok(
    await warmPathPixelCount(backgroundPath, { left: 680, top: 40, width: 100, height: 120 }) > 450,
    "Journey Path background should keep the reward temple endpoint visible",
  );
});

test("gamification public assets do not ship internal art-bible boards", () => {
  const publicAssets = readdirSync("public/experiment-scenes/gamification-article");
  assert.equal(
    publicAssets.some((file) => /art-bible/i.test(file)),
    false,
    "public gamification assets should be production runtime files only",
  );
  assert.doesNotMatch(JSON.stringify(GAMIFICATION_PHASER_ASSETS), /art-bible/i);
});

test("gamification v4 rooms expose a game-ready Phaser manifest", () => {
  assert.deepEqual(
    GAMIFICATION_GAME_ROOMS.map((room) => room.id),
    [
      "home",
      "upshot",
      "attention-environment",
      "curiosity-hook",
      "motivation-engine",
      "evidence-lab",
      "ai-lesson-forge",
      "teacher-workshop",
      "examined-model",
      "finale",
    ],
  );

  for (const room of GAMIFICATION_GAME_ROOMS) {
    assert.ok(room.room, `${room.id} needs a room asset key`);
    assert.ok(room.floorY >= 360 && room.floorY <= 500, `${room.id} needs a walkable floor baseline`);
    assert.equal(typeof room.ariScale, "number", `${room.id} needs an authored Ari room scale`);
    assert.ok(room.ariScale >= 0.9 && room.ariScale <= 1.2, `${room.id} Ari room scale should match 16-bit room props`);
    assert.equal(typeof room.ariStart?.x, "number", `${room.id} needs ariStart.x`);
    assert.equal(typeof room.ariStart?.y, "number", `${room.id} needs ariStart.y`);
    assert.equal(typeof room.ariTarget?.x, "number", `${room.id} needs ariTarget.x`);
    assert.equal(typeof room.ariTarget?.y, "number", `${room.id} needs ariTarget.y`);
    assert.equal(room.ariStart.y, room.floorY, `${room.id} Ari should enter on the room floor baseline`);
    assert.equal(room.ariTarget.y, room.floorY, `${room.id} Ari should stop on the room floor baseline`);
    assert.ok(Array.isArray(room.hotspots), `${room.id} needs hotspots`);
    for (const hotspot of room.hotspots) {
      assert.ok(hotspot.id, `${room.id} hotspot needs an id`);
      assert.ok(hotspot.verb, `${room.id} hotspot needs a visible game verb`);
      assert.equal(typeof hotspot.x, "number", `${room.id} hotspot needs x`);
      assert.equal(typeof hotspot.y, "number", `${room.id} hotspot needs y`);
    }

    if (room.kind !== "home") {
      assert.ok(room.dialogueBeats?.length >= 2, `${room.id} needs dialogue beats`);
      assert.ok(room.challenge?.id, `${room.id} needs a challenge id`);
      assert.ok(room.badge?.id, `${room.id} needs badge metadata`);
      assert.ok(room.badge?.habit, `${room.id} badge should name the habit`);
      assert.ok(room.teacherTransfer, `${room.id} needs a teacher transfer`);
      assert.ok(room.completionAction, `${room.id} needs completion action copy`);
      assert.match(room.completionAction, /Journey Path/i, `${room.id} should send readers back to the journey path`);
      assert.ok(room.badge?.icon, `${room.id} badge needs a dedicated HUD icon`);
      assert.match(room.badge.icon, /^\/experiment-scenes\/gamification-article\/badge-icon-.+\.(webp|png)$/);
      assert.equal(existsSync(`public${room.badge.icon}`), true, `${room.id} badge icon exists`);
      if (room.badge.icon.endsWith(".webp")) {
        assert.deepEqual(webpDimensions(`public${room.badge.icon}`), { width: 96, height: 96 }, `${room.id} badge icon dimensions`);
      }
    }
  }
});

test("gamification rooms stage Ari with purposeful left-lane entry, exit, and centered finale", () => {
  for (const room of GAMIFICATION_GAME_ROOMS) {
    if (room.kind === "home") continue;

    if (room.id === "finale") {
      assert.ok(room.ariTarget.x >= 430 && room.ariTarget.x <= 530, "finale Ari target should be centered on stage");
      assert.ok(room.ariTarget.y >= 420 && room.ariTarget.y <= 470, "finale Ari target should stay on the floor");
      continue;
    }

    assert.ok(room.ariStart.x < 0, `${room.id} Ari should enter from offscreen left`);
    assert.ok(room.ariTarget.x >= 88 && room.ariTarget.x <= 180, `${room.id} Ari should stop in the left floor lane`);
    assert.ok(room.ariScale >= 1.02, `${room.id} Ari should be larger in authored rooms than on the overworld map`);
    assert.ok(room.ariExitTarget?.x >= 1000, `${room.id} needs an offscreen-right exit target`);
    assert.equal(room.ariExitTarget.y, room.ariTarget.y, `${room.id} exit should stay on the same floor lane`);
  }
});

test("gamification Phaser runtime keeps overworld Ari small but swaps to the room sprite sheet in rooms", () => {
  const game = readFileSync("src/pages/educators/gamification/phaser/GamefulLearningScene.js", "utf8");

  assert.match(game, /ARI_WORLD_TEXTURE = "ari-teacher-world"/);
  assert.match(game, /ARI_ROOM_TEXTURE = "ari-teacher-room"/);
  assert.match(game, /this\.load\.spritesheet\(ARI_WORLD_TEXTURE/);
  assert.match(game, /this\.load\.spritesheet\(ARI_ROOM_TEXTURE/);
  assert.match(game, /setAriSpriteMode\(mode\)/);
  assert.match(game, /this\.setAriSpriteMode\("world"\)/);
  assert.match(game, /this\.setAriSpriteMode\("room"\)/);
  assert.match(game, /roomScale = nextRoom\.ariScale/);
  assert.match(game, /this\.ari\.setScale\(roomScale\)/);
  assert.doesNotMatch(game, /this\.load\.spritesheet\("ari-teacher"/);
});

test("gamification dialogue is deep enough for adult teacher learning", () => {
  for (const room of GAMIFICATION_GAME_ROOMS) {
    if (room.kind === "home") continue;
    const words = room.dialogueBeats.join(" ").trim().split(/\s+/).filter(Boolean);
    assert.ok(room.dialogueBeats.length >= 4, `${room.id} should use several readable dialogue beats`);
    assert.ok(words.length >= 115, `${room.id} needs adult-learning depth, not a thin prompt response`);
  }
});

test("gamification rooms carry grade-band examples and metacognitive callouts", () => {
  for (const room of GAMIFICATION_GAME_ROOMS) {
    if (room.kind === "home") continue;
    for (const band of ["k-2", "3-5", "6-8", "9-12"]) {
      assert.ok(room.gradeBands?.[band]?.length > 40, `${room.id} needs a ${band} classroom example`);
    }
    assert.ok(room.metacognition?.roomMoment?.length > 40, `${room.id} needs a roomMoment callout`);
    assert.ok(room.metacognition?.badgeMoment?.length > 40, `${room.id} needs a badgeMoment callout`);
  }
});

test("gamification curriculum covers distinctions, pitfalls, evidence, and a blueprint", () => {
  const upshot = GAMIFICATION_GAME_ROOMS.find((room) => room.id === "upshot");
  assert.match(JSON.stringify(upshot.keyDistinction), /game-based learning/i);
  assert.match(upshot.dialogueBeats.join(" "), /game-based learning/i);

  const motivation = GAMIFICATION_GAME_ROOMS.find((room) => room.id === "motivation-engine");
  assert.match(JSON.stringify(motivation), /overjustification/i);
  assert.equal(motivation.cautionCard.items.length, 5);
  assert.ok(motivation.bonusCheck.options.some((option) => option.correct), "bonus check needs a correct option");

  const evidence = GAMIFICATION_GAME_ROOMS.find((room) => room.id === "evidence-lab");
  assert.equal(evidence.evidenceSnapshot.length, 2);
  for (const item of evidence.evidenceSnapshot) {
    assert.ok(GAMIFICATION_QUEST_SOURCES.some((entry) => entry.id === item.sourceId), `${item.id} cites a known source`);
  }
  assert.equal(evidence.pilotScorecard.length, 4);
  assert.match(JSON.stringify(evidence.evidenceSnapshot), /standard deviation/i);

  const workshop = GAMIFICATION_GAME_ROOMS.find((room) => room.id === "teacher-workshop");
  assert.equal(workshop.lessonBlueprint.steps.length, 5);
  for (const step of workshop.lessonBlueprint.steps) {
    assert.ok(step.examples.length >= 2, `${step.id} needs at least two worked examples`);
    for (const example of step.examples) {
      assert.ok(["k-2", "3-5", "6-8", "9-12"].includes(example.gradeBand), `${step.id} example uses a known grade band`);
      assert.ok(example.before && example.after, `${step.id} example needs before and after`);
    }
  }

  const examined = GAMIFICATION_GAME_ROOMS.find((room) => room.id === "examined-model");
  assert.equal(examined.thoughtExperimentsLink.route, "thought-experiments");
});

test("gamification quest integrates the brain-science of motivation", () => {
  const room = (id) => GAMIFICATION_GAME_ROOMS.find((item) => item.id === id);

  // Visible progress is named as the goal-gradient effect and cited.
  const upshot = room("upshot");
  assert.match(upshot.dialogueBeats.join(" "), /goal-gradient/i);
  assert.ok(upshot.sourceIds.includes("goal-gradient-kivetz"), "upshot cites the goal-gradient research");

  // The hook is grounded in dopamine/seeking with the wanting-vs-liking nuance.
  const curiosity = room("curiosity-hook");
  assert.match(JSON.stringify(curiosity), /seeking system/i);
  assert.match(JSON.stringify(curiosity.keyDistinction), /wanting/i);
  assert.match(JSON.stringify(curiosity.keyDistinction), /liking/i);
  assert.ok(curiosity.sourceIds.includes("dopamine-reward-prediction"), "curiosity cites the dopamine research");

  // Variable-ratio reinforcement is the named dual-use dark pattern.
  const motivation = room("motivation-engine");
  assert.match(JSON.stringify(motivation), /variable-reward|slot-machine|intermittent/i);
  assert.ok(motivation.cautionCard.items.some((item) => /variable/i.test(item.risk)), "caution card names the variable-reward pattern");

  // The popular "make it public" advice is engaged as an equity tension.
  const examined = room("examined-model");
  assert.match(examined.dialogueBeats.join(" "), /make progress public/i);
  assert.match(examined.dialogueBeats.join(" "), /equity/i);

  // The Big Think article is cited and lives in the bonus resource library.
  assert.ok(GAMIFICATION_QUEST_SOURCES.some((s) => s.id === "bigthink-brain-games"), "the article is a cited source");
  const groupedIds = GAMEFUL_RESOURCE_GROUPS.flatMap((g) => g.sourceIds);
  assert.ok(groupedIds.includes("bigthink-brain-games"), "the article is in the resource library");
  assert.ok(
    groupedIds.includes("goal-gradient-kivetz") && groupedIds.includes("dopamine-reward-prediction"),
    "brain-science sources are grouped",
  );
});

test("gamification narration has one voiceover clip per dialogue beat", () => {
  const manifest = JSON.parse(readFileSync("src/data/gamificationAudioManifest.json", "utf8"));
  const items = manifest.items || {};
  let beats = 0;

  for (const room of GAMIFICATION_GAME_ROOMS) {
    if (room.kind === "home") continue;
    room.dialogueBeats.forEach((_, index) => {
      beats += 1;
      const id = `narration-${room.id}-${index}`;
      const entry = items[id];
      assert.ok(entry, `missing narration clip ${id}`);
      assert.equal(entry.kind, "narration");
      assert.match(entry.file, /^\/audio\/gamification\/narration-.+\.mp3$/);
      assert.equal(existsSync(`public${entry.file}`), true, `${id} mp3 should exist`);
      assert.ok(entry.bytes > 1000, `${id} should be real audio, not an empty file`);
    });
  }

  assert.equal(beats, 65, "the quest has 65 voiced dialogue beats");
  const narrationCount = Object.values(items).filter((entry) => entry.kind === "narration").length;
  assert.equal(narrationCount, 65, "exactly one narration clip per beat, no orphans");
});

test("gamification declares the sound cues used by the polished game loop", () => {
  assert.deepEqual(
    GAMIFICATION_SOUND_CUES,
    [
      "ui-tap",
      "node-select",
      "path-step",
      "path-travel",
      "room-enter",
      "dialogue-tick",
      "badge-collect",
      "unlock",
      "return-gate",
      "ari-exit",
      "error",
      "finale",
    ],
  );
});

test("gamification copy avoids prompt-report language and keeps Mark Rober supporting", () => {
  const serialized = JSON.stringify(GAMIFICATION_GAME_STAGES);
  const firstStage = JSON.stringify(GAMIFICATION_GAME_STAGES.find((stage) => stage.id === "upshot"));
  const curiosityStage = JSON.stringify(GAMIFICATION_GAME_STAGES.find((stage) => stage.id === "curiosity-hook"));

  for (const phrase of [
    "Research path",
    "The goal is not",
    "point toward the same practical idea",
    "the useful version",
    "For a classroom article",
    "If the page says",
  ]) {
    assert.doesNotMatch(serialized, new RegExp(phrase, "i"), `${phrase} should not appear in game copy`);
  }

  assert.equal((firstStage.match(/Mark Rober/g) || []).length, 0, "the upshot should not center Mark Rober");
  assert.ok((curiosityStage.match(/Mark Rober/g) || []).length <= 1, "Mark Rober should be supporting evidence");
  assert.ok(
    GAMIFICATION_GAME_STAGES.find((stage) => stage.id === "curiosity-hook").sourceIds.includes("self-determination-theory"),
    "curiosity hook should include non-Rober motivation research",
  );
  assert.match(serialized, /Teachers Can Build Better Learning Loops With AI/);
  assert.match(serialized, /district-approved AI tool/);
  assert.doesNotMatch(serialized, /Codex|Claude|ChatGPT/);
});

test("AI lesson forge copy includes privacy and responsible-use guardrails", () => {
  const aiRoom = GAMIFICATION_GAME_ROOMS.find((room) => room.id === "ai-lesson-forge");
  const serialized = JSON.stringify(aiRoom);

  assert.match(serialized, /de-identified/i);
  assert.match(serialized, /district policy/i);
  assert.match(serialized, /confidential student/i);
  assert.match(serialized, /IEP|504/);
  assert.ok(aiRoom.sourceIds.includes("teachai-guidance-toolkit"), "AI room should link responsible AI guidance");
});

test("gamification reward card assets are project-local bitmaps with stable frame sizes", () => {
  const required = [
    ...Object.values(GAMIFICATION_REWARD_CARD_ASSETS).map((src) => [src, 320, 180]),
  ];

  for (const [src, width, height] of required) {
    assert.match(src, /^\/experiment-scenes\/gamification-article\/.+\.(webp|png)$/);
    assert.equal(existsSync(`public${src}`), true, `${src} should exist`);
    if (src.endsWith(".webp")) {
      assert.deepEqual(webpDimensions(`public${src}`), { width, height }, `${src} dimensions`);
    }
  }
});

test("gamification Phaser assets include room backgrounds, HUD pieces, and sprite-sheet metadata", async () => {
  assert.deepEqual(GAMIFICATION_PHASER_ASSETS.canvas, { width: 960, height: 540 });
  assert.equal(GAMIFICATION_PHASER_ASSETS.worldMap.background, GAMIFICATION_WORLD_MAP.background);
  for (const src of Object.values(GAMIFICATION_PHASER_ASSETS.worldMap.nodes)) {
    assert.match(src, /^\/experiment-scenes\/gamification-article\/map-node-.+\.(webp|png)$/);
    assert.equal(existsSync(`public${src}`), true, `${src} should exist`);
  }
  assert.equal(GAMIFICATION_PHASER_ASSETS.ari.world.sheet, "/experiment-scenes/gamification-article/ari-teacher-sheet.png");
  assert.deepEqual(GAMIFICATION_PHASER_ASSETS.ari.world.frame, { width: 128, height: 192 });
  assert.equal(GAMIFICATION_PHASER_ASSETS.ari.world.scale, 0.46);
  assert.equal(GAMIFICATION_PHASER_ASSETS.ari.room.sheet, "/experiment-scenes/gamification-article/ari-teacher-room-sheet.png");
  assert.deepEqual(GAMIFICATION_PHASER_ASSETS.ari.room.frame, { width: 192, height: 288 });
  assert.equal(GAMIFICATION_PHASER_ASSETS.ari.room.scale, 1.08);
  assert.ok(GAMIFICATION_PHASER_ASSETS.ari.animations.idle.frames.length >= 1);
  assert.ok(GAMIFICATION_PHASER_ASSETS.ari.animations.walk.frames.length >= 2);

  assert.deepEqual(await imageDimensions(`public${GAMIFICATION_PHASER_ASSETS.ari.world.sheet}`), { width: 1024, height: 192 });
  assert.deepEqual(await imageDimensions(`public${GAMIFICATION_PHASER_ASSETS.ari.room.sheet}`), { width: 1536, height: 288 });
  assert.equal(await webpHasAlpha(`public${GAMIFICATION_PHASER_ASSETS.ari.world.sheet}`), true, "world Ari sheet should preserve transparency");
  assert.equal(await webpHasAlpha(`public${GAMIFICATION_PHASER_ASSETS.ari.room.sheet}`), true, "room Ari sheet should preserve transparency");
  const worldIdleBounds = await alphaBounds(`public${GAMIFICATION_PHASER_ASSETS.ari.world.sheet}`, { left: 0, top: 0, width: 128, height: 192 });
  const roomIdleBounds = await alphaBounds(`public${GAMIFICATION_PHASER_ASSETS.ari.room.sheet}`, { left: 0, top: 0, width: 192, height: 288 });
  const roomHeightRatio = roomIdleBounds.height / worldIdleBounds.height;
  assert.ok(roomHeightRatio >= 1.45 && roomHeightRatio <= 1.55, `room Ari should be about 50% taller than world Ari, got ${roomHeightRatio}`);

  for (const [roomId, src] of Object.entries(GAMIFICATION_PHASER_ASSETS.rooms)) {
    assert.match(src, /^\/experiment-scenes\/gamification-article\/room-.+\.(webp|png)$/);
    assert.equal(existsSync(`public${src}`), true, `${roomId} room background should exist`);
    if (src.endsWith(".webp")) {
      assert.deepEqual(webpDimensions(`public${src}`), { width: 960, height: 540 }, `${src} dimensions`);
    }
  }

  for (const src of Object.values(GAMIFICATION_PHASER_ASSETS.hud)) {
    assert.match(src, /^\/experiment-scenes\/gamification-article\/.+\.(webp|png)$/);
    assert.equal(existsSync(`public${src}`), true, `${src} should exist`);
  }

  const playableIds = GAMIFICATION_GAME_ROOMS.filter((room) => room.kind !== "home").map((room) => room.id);
  assert.deepEqual(Object.keys(GAMIFICATION_PHASER_ASSETS.badgeIcons).sort(), [...playableIds].sort(), "trophy icons cover every playable room");
  for (const src of Object.values(GAMIFICATION_PHASER_ASSETS.badgeIcons)) {
    assert.equal(existsSync(`public${src}`), true, `${src} should exist`);
  }

  assert.equal(GAMIFICATION_PHASER_ASSETS.hud.returnGate, "/experiment-scenes/gamification-article/return-journey-gate.webp");
  assert.deepEqual(webpDimensions(`public${GAMIFICATION_PHASER_ASSETS.hud.returnGate}`), { width: 128, height: 128 });
  assert.equal(await webpHasAlpha(`public${GAMIFICATION_PHASER_ASSETS.hud.returnGate}`), true, "return gate should have transparency");

  assert.equal(existsSync("public/experiment-scenes/gamification-article/ari-teacher-sheet.png"), true);
});

test("gamification game assets include transparent Ari sprites and four visible door states", async () => {
  for (const key of ["closed", "knock", "crack", "open"]) {
    assert.ok(GAMIFICATION_QUEST_ASSETS.door[key], `door needs ${key} state`);
    assert.equal(existsSync(`public${GAMIFICATION_QUEST_ASSETS.door[key]}`), true, `${key} door asset exists`);
  }
  assert.equal(new Set(Object.values(GAMIFICATION_QUEST_ASSETS.door)).size, Object.values(GAMIFICATION_QUEST_ASSETS.door).length, "door states should use distinct files");

  for (const src of [
    ...Object.values(GAMIFICATION_QUEST_ASSETS.ari),
  ]) {
    assert.equal(existsSync(`public${src}`), true, `${src} should exist`);
    assert.equal(await webpHasAlpha(`public${src}`), true, `${src} should preserve transparency`);
  }
  assert.equal(existsSync(`public${GAMIFICATION_PHASER_ASSETS.ari.world.sheet}`), true, "Ari Phaser world sprite sheet should exist");
  assert.equal(existsSync(`public${GAMIFICATION_PHASER_ASSETS.ari.room.sheet}`), true, "Ari Phaser room sprite sheet should exist");
});
