import fs from "node:fs";
import path from "node:path";
import { createServer } from "vite";

const root = process.cwd();

function publicFileFor(src) {
  if (!src?.startsWith("/")) return null;
  return path.join(root, "public", src.slice(1));
}

function isStageSetPath(src) {
  return src?.startsWith("/experiment-scenes/stage-sets/");
}

function collectRegisteredSlots(stageSets) {
  return Object.entries(stageSets).flatMap(([key, set]) => {
    const [visualVariant, experimentId] = key.includes(":") ? key.split(":") : ["default", key];
    return Object.keys(set.stages || {}).map((stageId, stageIndex) => ({
      key,
      visualVariant,
      experimentId,
      stageId,
      stageIndex,
    }));
  });
}

const server = await createServer({
  appType: "custom",
  logLevel: "silent",
  server: { middlewareMode: true, hmr: false },
});

try {
  const [{ STAGE_SCENE_SETS }, { getSceneIllustration }] = await Promise.all([
    server.ssrLoadModule("/src/data/stageSceneManifest.js"),
    server.ssrLoadModule("/src/data/sceneIllustrations.js"),
  ]);

  const slots = collectRegisteredSlots(STAGE_SCENE_SETS);
  const failures = [];
  const imagesByExperiment = new Map();

  for (const slot of slots) {
    const illustration = getSceneIllustration(slot.experimentId, {
      stageId: slot.stageId,
      stageIndex: slot.stageIndex,
      visualVariant: slot.visualVariant,
    });

    if (!illustration?.src) {
      failures.push(`${slot.key}:${slot.stageId} has no resolved image src`);
      continue;
    }

    if (!isStageSetPath(illustration.src)) {
      failures.push(`${slot.key}:${slot.stageId} did not resolve to a stage-set asset (${illustration.src})`);
    }

    const file = publicFileFor(illustration.src);
    if (!file || !fs.existsSync(file)) {
      failures.push(`${slot.key}:${slot.stageId} points to missing file ${illustration.src}`);
    }

    if (!illustration.alt || illustration.alt.length < 32) {
      failures.push(`${slot.key}:${slot.stageId} needs descriptive alt text`);
    }

    const list = imagesByExperiment.get(slot.key) || new Set();
    list.add(illustration.src);
    imagesByExperiment.set(slot.key, list);
  }

  for (const [key, set] of Object.entries(STAGE_SCENE_SETS)) {
    const stageCount = Object.keys(set.stages || {}).length;
    const uniqueImages = imagesByExperiment.get(key)?.size || 0;
    if (stageCount > 1 && uniqueImages <= 1) {
      failures.push(`${key} uses the same image for every registered stage`);
    }
  }

  if (failures.length) {
    console.error(`Registered stage visual check failed: ${failures.length} issue(s) across ${slots.length} stage slots.`);
    failures.forEach((failure) => console.error(`- ${failure}`));
    process.exitCode = 1;
  } else {
    console.log(`Registered stage visual check passed for ${slots.length} stage slots across ${Object.keys(STAGE_SCENE_SETS).length} stage set(s).`);
  }
} finally {
  await server.close();
}
