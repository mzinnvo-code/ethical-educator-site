import fs from "node:fs";
import path from "node:path";
import { createServer } from "vite";

const root = process.cwd();

const bespokeStageSets = [
  {
    experimentId: "explaining-red-k-2",
    visualVariant: "k-2",
    title: "Explaining Red - K-2",
    stages: [
      ["intro", "Explaining Red"],
      ["arrival", "A new student arrives"],
      ["ada-responds", "Ada thinks about it"],
      ["reflection", "What the class learned today"],
    ],
  },
  {
    experimentId: "the-shortcut",
    visualVariant: "flagship",
    title: "The Shortcut",
    stages: [
      ["intro", "The Shortcut"],
      ["premise", "The Premise"],
      ["scarcity", "The Scarcity Condition"],
      ["universal", "Universal Availability"],
      ["developmental", "The Developmental Question"],
      ["reflection", "What The Shortcut Reveals"],
    ],
  },
  {
    experimentId: "ai-authorship",
    visualVariant: "flagship",
    title: "The AI Authorship Quandary",
    stages: [
      ["intro", "The AI Authorship Quandary"],
      ["perspective", "Your Perspective"],
      ["consequence", "The Consequence"],
      ["reflection", "What Your Choices Reveal"],
    ],
  },
  {
    experimentId: "reluctant-educator",
    visualVariant: "flagship",
    title: "The Reluctant Educator",
    stages: [
      ["intro", "The Reluctant Educator"],
      ["dashboard-week-1", "Week 1 Metrics"],
      ["dashboard-week-4", "Week 4 Metrics"],
      ["dashboard-week-8", "Week 8 Metrics"],
      ["dashboard-week-12", "Week 12 Metrics"],
      ["reflection", "The Tradeoff"],
    ],
  },
  {
    experimentId: "digital-doppelganger",
    visualVariant: "flagship",
    title: "The Digital Doppelganger",
    stages: [
      ["intro", "The Digital Doppelganger"],
      ["discussion-board", "The Discussion Board"],
      ["voice-clone", "The Voice Clone"],
      ["proliferation", "The Proliferation"],
      ["exam", "The Exam"],
      ["policy", "The Policy Committee"],
    ],
  },
];

function publicFileFor(src) {
  if (!src?.startsWith("/")) return null;
  return path.join(root, "public", src.slice(1));
}

function hasStageSetPath(src) {
  return src?.startsWith("/experiment-scenes/stage-sets/");
}

function collectScenarioSlots(experiments, visualVariant) {
  return experiments
    .filter((experiment) => Array.isArray(experiment.stages) && experiment.stages.length)
    .map((experiment) => ({
      experimentId: experiment.id,
      visualVariant,
      title: experiment.title,
      stages: experiment.stages.map((stage) => [stage.id, stage.title || stage.kicker || stage.id]),
    }));
}

const server = await createServer({
  appType: "custom",
  logLevel: "silent",
  server: { middlewareMode: true, hmr: false },
});

try {
  const [{ getExperimentsByGrade }, { getSceneIllustration }] = await Promise.all([
    server.ssrLoadModule("/src/data/experiments.js"),
    server.ssrLoadModule("/src/data/sceneIllustrations.js"),
  ]);

  const slots = [
    ...collectScenarioSlots(getExperimentsByGrade("k-5"), "k-5"),
    ...collectScenarioSlots(getExperimentsByGrade("6-8"), "6-8"),
    ...collectScenarioSlots(getExperimentsByGrade("9-12"), "9-12"),
    ...collectScenarioSlots(getExperimentsByGrade("educators"), "educators"),
    ...bespokeStageSets,
  ];

  const failures = [];
  let checked = 0;

  for (const experiment of slots) {
    const srcs = new Set();
    experiment.stages.forEach(([stageId, stageTitle], stageIndex) => {
      const illustration = getSceneIllustration(experiment.experimentId, {
        stageId,
        stageIndex,
        stageTitle,
        experimentTitle: experiment.title,
        visualVariant: experiment.visualVariant,
      });
      checked += 1;

      if (!illustration?.src) {
        failures.push(`${experiment.visualVariant}:${experiment.experimentId}:${stageId} has no image src`);
        return;
      }
      srcs.add(illustration.src);

      if (!hasStageSetPath(illustration.src)) {
        failures.push(`${experiment.visualVariant}:${experiment.experimentId}:${stageId} did not resolve to a stage-set asset (${illustration.src})`);
      }

      const file = publicFileFor(illustration.src);
      if (!file || !fs.existsSync(file)) {
        failures.push(`${experiment.visualVariant}:${experiment.experimentId}:${stageId} points to missing file ${illustration.src}`);
      }

      if (!illustration.alt || illustration.alt.length < 24) {
        failures.push(`${experiment.visualVariant}:${experiment.experimentId}:${stageId} needs descriptive alt text`);
      }
    });

    if (experiment.stages.length > 1 && srcs.size <= 1) {
      failures.push(`${experiment.visualVariant}:${experiment.experimentId} uses the same image for every stage`);
    }
  }

  if (failures.length) {
    console.error(`Stage visual check failed: ${failures.length} issue(s) across ${checked} stage slots.`);
    failures.slice(0, 80).forEach((failure) => console.error(`- ${failure}`));
    if (failures.length > 80) console.error(`- ...and ${failures.length - 80} more`);
    process.exitCode = 1;
  } else {
    console.log(`Stage visual check passed for ${checked} stage slots.`);
  }
} finally {
  await server.close();
}
