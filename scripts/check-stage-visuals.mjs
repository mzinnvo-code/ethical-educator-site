import fs from "node:fs";
import path from "node:path";
import { createServer } from "vite";

const root = process.cwd();
const REQUIRED_WIDTH = 1280;
const REQUIRED_HEIGHT = 720;
const FLAGSHIP_KEYS = [
  "flagship:the-shortcut",
  "flagship:ai-authorship",
  "flagship:reluctant-educator",
  "flagship:digital-doppelganger",
];
const CUSTOM_KEYS = ["k-2:explaining-red-k-2", ...FLAGSHIP_KEYS];

function publicFileFor(src) {
  if (!src?.startsWith("/")) return null;
  return path.join(root, "public", src.slice(1));
}

function isStageSetPath(src) {
  return src?.startsWith("/experiment-scenes/stage-sets/");
}

function parseKey(key) {
  const splitAt = key.indexOf(":");
  if (splitAt === -1) return { visualVariant: "default", experimentId: key };
  return {
    visualVariant: key.slice(0, splitAt),
    experimentId: key.slice(splitAt + 1),
  };
}

function addSlot(slots, lane, key, stageId, stageIndex) {
  const { visualVariant, experimentId } = parseKey(key);
  const slotKey = `${key}:${stageId}`;
  if (slots.has(slotKey)) return;
  slots.set(slotKey, { key, lane, visualVariant, experimentId, stageId, stageIndex });
}

function addExperiment(slots, lane, key, experiment) {
  if (!Array.isArray(experiment?.stages)) return;
  experiment.stages.forEach((stage, stageIndex) => {
    addSlot(slots, lane, key, stage.id, stageIndex);
  });
}

function collectExpectedSlots(stageSets, helpers) {
  const {
    getExperimentsByGrade,
    getExperimentsByElementaryGrade,
  } = helpers;
  const slots = new Map();

  for (const grade of ["k", "1", "2", "3", "4", "5"]) {
    for (const experiment of getExperimentsByElementaryGrade(grade)) {
      if (experiment.id === "explaining-red-k-2") continue;
      addExperiment(slots, `K-5 grade ${grade}`, `k-5:${experiment.id}`, experiment);
    }
  }

  for (const experiment of getExperimentsByGrade("6-8")) {
    addExperiment(slots, "6-8", `6-8:${experiment.id}`, experiment);
  }

  for (const experiment of getExperimentsByGrade("9-12")) {
    addExperiment(slots, "9-12", `9-12:${experiment.id}`, experiment);
  }

  for (const experiment of getExperimentsByGrade("educators")) {
    addExperiment(slots, "educator bank", `educators:${experiment.id}`, experiment);
  }

  for (const key of CUSTOM_KEYS) {
    const set = stageSets[key];
    Object.keys(set?.stages || {}).forEach((stageId, stageIndex) => {
      addSlot(slots, "custom", key, stageId, stageIndex);
    });
  }

  return [...slots.values()];
}

function readWebpDimensions(file) {
  const buffer = fs.readFileSync(file);
  if (buffer.toString("ascii", 0, 4) !== "RIFF" || buffer.toString("ascii", 8, 12) !== "WEBP") {
    return null;
  }

  let offset = 12;
  while (offset + 8 <= buffer.length) {
    const chunkType = buffer.toString("ascii", offset, offset + 4);
    const chunkSize = buffer.readUInt32LE(offset + 4);
    const chunkStart = offset + 8;

    if (chunkType === "VP8X" && chunkStart + 10 <= buffer.length) {
      return {
        width: 1 + buffer.readUIntLE(chunkStart + 4, 3),
        height: 1 + buffer.readUIntLE(chunkStart + 7, 3),
      };
    }

    if (chunkType === "VP8L" && chunkStart + 5 <= buffer.length && buffer[chunkStart] === 0x2f) {
      const bits = buffer.readUInt32LE(chunkStart + 1);
      return {
        width: (bits & 0x3fff) + 1,
        height: ((bits >> 14) & 0x3fff) + 1,
      };
    }

    if (chunkType === "VP8 " && chunkStart + 10 <= buffer.length) {
      return {
        width: buffer.readUInt16LE(chunkStart + 6) & 0x3fff,
        height: buffer.readUInt16LE(chunkStart + 8) & 0x3fff,
      };
    }

    offset = chunkStart + chunkSize + (chunkSize % 2);
  }

  return null;
}

const server = await createServer({
  appType: "custom",
  logLevel: "silent",
  server: { middlewareMode: true, hmr: false },
});

try {
  const [
    { STAGE_SCENE_SETS },
    { getSceneIllustration },
    experimentHelpers,
  ] = await Promise.all([
    server.ssrLoadModule("/src/data/stageSceneManifest.js"),
    server.ssrLoadModule("/src/data/sceneIllustrations.js"),
    server.ssrLoadModule("/src/data/experiments.js"),
  ]);

  const expectedSlots = collectExpectedSlots(STAGE_SCENE_SETS, experimentHelpers);
  const expectedSlotKeys = new Set(expectedSlots.map(slot => `${slot.key}:${slot.stageId}`));
  const expectedSetKeys = new Set(expectedSlots.map(slot => slot.key));
  const failures = [];
  const imagesByExperiment = new Map();

  for (const slot of expectedSlots) {
    const set = STAGE_SCENE_SETS[slot.key];
    const registeredStage = set?.stages?.[slot.stageId];

    if (!set) {
      failures.push(`${slot.key} is missing from STAGE_SCENE_SETS (${slot.lane})`);
      continue;
    }

    if (!registeredStage) {
      failures.push(`${slot.key}:${slot.stageId} is missing an exact registered stage asset`);
      continue;
    }

    const illustration = getSceneIllustration(slot.experimentId, {
      stageId: slot.stageId,
      stageIndex: slot.stageIndex,
      visualVariant: slot.visualVariant,
    });

    if (!illustration?.src) {
      failures.push(`${slot.key}:${slot.stageId} has no resolved image src`);
      continue;
    }

    if (illustration.src !== registeredStage.src) {
      failures.push(`${slot.key}:${slot.stageId} resolved ${illustration.src}, expected ${registeredStage.src}`);
    }

    if (!isStageSetPath(illustration.src)) {
      failures.push(`${slot.key}:${slot.stageId} did not resolve to a stage-set asset (${illustration.src})`);
    }

    const file = publicFileFor(illustration.src);
    if (!file || !fs.existsSync(file)) {
      failures.push(`${slot.key}:${slot.stageId} points to missing file ${illustration.src}`);
    } else {
      const dimensions = readWebpDimensions(file);
      if (!dimensions) {
        failures.push(`${slot.key}:${slot.stageId} is not a readable WebP asset (${illustration.src})`);
      } else if (dimensions.width !== REQUIRED_WIDTH || dimensions.height !== REQUIRED_HEIGHT) {
        failures.push(`${slot.key}:${slot.stageId} is ${dimensions.width}x${dimensions.height}; expected ${REQUIRED_WIDTH}x${REQUIRED_HEIGHT}`);
      }
    }

    if (!illustration.alt || illustration.alt.length < 32) {
      failures.push(`${slot.key}:${slot.stageId} needs descriptive alt text`);
    }

    const list = imagesByExperiment.get(slot.key) || new Set();
    list.add(illustration.src);
    imagesByExperiment.set(slot.key, list);
  }

  for (const key of Object.keys(STAGE_SCENE_SETS)) {
    if (!expectedSetKeys.has(key)) {
      failures.push(`${key} is registered but is not used by a rendered thought experiment variant`);
      continue;
    }

    for (const stageId of Object.keys(STAGE_SCENE_SETS[key].stages || {})) {
      if (!expectedSlotKeys.has(`${key}:${stageId}`)) {
        failures.push(`${key}:${stageId} is registered but is not an exact rendered stage id`);
      }
    }
  }

  for (const [key, imageSet] of imagesByExperiment) {
    const stageCount = expectedSlots.filter(slot => slot.key === key).length;
    if (stageCount > 1 && imageSet.size !== stageCount) {
      failures.push(`${key} must use a distinct image for every stage (${imageSet.size}/${stageCount} unique)`);
    }
  }

  if (failures.length) {
    console.error(`Stage visual check failed: ${failures.length} issue(s) across ${expectedSlots.length} expected stage slot(s).`);
    failures.forEach((failure) => console.error(`- ${failure}`));
    process.exitCode = 1;
  } else {
    console.log(`Stage visual check passed for ${expectedSlots.length} expected stage slots across ${expectedSetKeys.size} rendered stage set(s).`);
  }
} finally {
  await server.close();
}
