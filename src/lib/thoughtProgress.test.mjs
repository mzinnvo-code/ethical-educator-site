import assert from "node:assert/strict";
import test from "node:test";

import {
  ACHIEVEMENTS,
  SCHEMA_VERSION,
  STORAGE_KEY,
  createEmptyProgress,
  getAchievementStatus,
  getBadgeStatus,
  getBrainProgress,
  getEarnedBadges,
  getProgressSummary,
  markBadgeViewed,
  normalizeProgress,
  recordThoughtEvent,
} from "./thoughtProgress.js";

test("normalizes missing or malformed progress into the browser-only schema", () => {
  assert.equal(STORAGE_KEY, "ee:thought-progress:v1");
  assert.equal(SCHEMA_VERSION, 3);
  assert.deepEqual(normalizeProgress(null), createEmptyProgress());
  assert.deepEqual(normalizeProgress({ schemaVersion: 99, events: [{ type: "x" }] }), createEmptyProgress());

  const normalized = normalizeProgress({
    schemaVersion: 1,
    events: "bad",
    experiments: null,
    journalSaveCount: "2",
  });

  assert.deepEqual(normalized.events, []);
  assert.deepEqual(normalized.experiments, {});
  assert.deepEqual(normalized.achievements, {});
  assert.deepEqual(normalized.badgeViews, {});
  assert.equal(normalized.journalSaveCount, 0);
});

test("migrates older progress while preserving activity and marking existing earned badges as viewed", () => {
  const normalized = normalizeProgress({
    schemaVersion: 2,
    events: [{ type: "experiment_completed", experimentId: "deepfake-election" }],
    experiments: {
      "deepfake-election": {
        gradeBand: "6-8",
        completed: true,
        completionCount: 1,
        lenses: { responsibility: 1 },
      },
    },
    lenses: { consistency: 1 },
    topics: { "ai-ethics": 1 },
    journalSaveCount: 1,
    updatedAt: "2026-06-04T12:00:00.000Z",
  });

  assert.equal(normalized.schemaVersion, 3);
  assert.equal(normalized.experiments["deepfake-election"].completed, true);
  assert.equal(normalized.experiments["deepfake-election"].completionCount, 1);
  assert.deepEqual(normalized.achievements, {});
  assert.equal(normalized.badgeViews["first-dilemma"].viewedAt, "2026-06-04T12:00:00.000Z");
  assert.equal(normalized.badgeViews["careful-verifier"].viewedAt, "2026-06-04T12:00:00.000Z");
  assert.equal(normalized.journalSaveCount, 1);
});

test("records choices, completions, journal saves, and restarts without double-counting completed experiments", () => {
  let progress = createEmptyProgress();

  progress = recordThoughtEvent(progress, {
    type: "choice_made",
    experimentId: "deepfake-election",
    gradeBand: "6-8",
    stageId: "viral-clip",
    lens: "responsibility",
    topicIds: ["ai-ethics", "knowledge"],
    timestamp: "2026-06-03T12:00:00.000Z",
  });
  progress = recordThoughtEvent(progress, {
    type: "stage_completed",
    experimentId: "deepfake-election",
    gradeBand: "6-8",
    stageId: "viral-clip",
    timestamp: "2026-06-03T12:01:00.000Z",
  });
  progress = recordThoughtEvent(progress, {
    type: "experiment_completed",
    experimentId: "deepfake-election",
    gradeBand: "6-8",
    topicIds: ["ai-ethics", "knowledge"],
    timestamp: "2026-06-03T12:05:00.000Z",
  });
  progress = recordThoughtEvent(progress, {
    type: "experiment_completed",
    experimentId: "deepfake-election",
    gradeBand: "6-8",
    timestamp: "2026-06-03T12:06:00.000Z",
  });
  progress = recordThoughtEvent(progress, {
    type: "journal_saved",
    experimentId: "deepfake-election",
    timestamp: "2026-06-03T12:07:00.000Z",
  });
  progress = recordThoughtEvent(progress, {
    type: "experiment_restarted",
    experimentId: "deepfake-election",
    timestamp: "2026-06-03T12:08:00.000Z",
  });

  const summary = getProgressSummary(progress);

  assert.equal(summary.completedExperiments, 1);
  assert.equal(summary.completedStages, 1);
  assert.equal(summary.journalSaveCount, 1);
  assert.equal(summary.replayCount, 1);
  assert.equal(summary.lensCount, 1);
  assert.equal(summary.topicCount, 2);
  assert.equal(progress.experiments["deepfake-election"].completionCount, 2);
});

test("awards mastery badges for reflective reasoning behaviors, not raw point totals", () => {
  let progress = createEmptyProgress();
  const events = [
    { type: "choice_made", experimentId: "deepfake-election", gradeBand: "6-8", stageId: "viral-clip", lens: "responsibility", topicIds: ["ai-ethics"] },
    { type: "choice_made", experimentId: "deepfake-election", gradeBand: "6-8", stageId: "almost-true", lens: "epistemic-care", topicIds: ["knowledge"] },
    { type: "choice_made", experimentId: "deepfake-election", gradeBand: "6-8", stageId: "your-side", lens: "civic-integrity", topicIds: ["justice"] },
    { type: "experiment_completed", experimentId: "deepfake-election", gradeBand: "6-8", topicIds: ["ai-ethics", "knowledge", "justice"] },
    { type: "steelman_saved", experimentId: "deepfake-election" },
    { type: "experiment_restarted", experimentId: "deepfake-election" },
  ];

  for (const event of events) {
    progress = recordThoughtEvent(progress, event);
  }

  const earned = getEarnedBadges(progress).filter((badge) => badge.earned).map((badge) => badge.id);

  assert.deepEqual(earned, [
    "first-dilemma",
    "careful-verifier",
    "steelman-builder",
    "lens-explorer",
    "second-thought",
    "topic-wanderer",
    "consistent-thinker",
  ]);
});

test("tracks new mastery badge glow until the student views the badge detail", () => {
  let progress = createEmptyProgress();

  progress = recordThoughtEvent(progress, {
    type: "experiment_completed",
    experimentId: "deepfake-election",
    gradeBand: "6-8",
    timestamp: "2026-06-04T13:00:00.000Z",
  });

  let firstDilemma = getBadgeStatus(progress).find((badge) => badge.id === "first-dilemma");
  assert.equal(firstDilemma.earned, true);
  assert.equal(firstDilemma.isNew, true);
  assert.equal(firstDilemma.earnedAt, "2026-06-04T13:00:00.000Z");
  assert.equal(firstDilemma.viewedAt, null);

  progress = markBadgeViewed(progress, "first-dilemma", "2026-06-04T13:01:00.000Z");
  firstDilemma = getBadgeStatus(progress).find((badge) => badge.id === "first-dilemma");
  assert.equal(firstDilemma.isNew, false);
  assert.equal(firstDilemma.viewedAt, "2026-06-04T13:01:00.000Z");
});

test("records badge_viewed events without marking locked badges as viewed", () => {
  let progress = createEmptyProgress();

  progress = recordThoughtEvent(progress, {
    type: "badge_viewed",
    badgeId: "steelman-builder",
    timestamp: "2026-06-04T14:00:00.000Z",
  });

  assert.equal(progress.badgeViews["steelman-builder"], undefined);

  progress = recordThoughtEvent(progress, {
    type: "steelman_saved",
    experimentId: "deepfake-election",
    timestamp: "2026-06-04T14:01:00.000Z",
  });
  progress = recordThoughtEvent(progress, {
    type: "badge_viewed",
    badgeId: "steelman-builder",
    timestamp: "2026-06-04T14:02:00.000Z",
  });

  assert.equal(progress.badgeViews["steelman-builder"].viewedAt, "2026-06-04T14:02:00.000Z");
});

test("records explicit achievements and reports how to earn each tracker goal", () => {
  assert.ok(ACHIEVEMENTS.some((achievement) => achievement.id === "source-checker"));
  assert.ok(ACHIEVEMENTS.every((achievement) => achievement.criteria));

  let progress = createEmptyProgress();
  progress = recordThoughtEvent(progress, {
    type: "achievement_completed",
    achievementId: "source-checker",
    experimentId: "deepfake-election",
    gradeBand: "6-8",
    timestamp: "2026-06-04T12:00:00.000Z",
  });

  const status = getAchievementStatus(progress);

  assert.equal(status.find((achievement) => achievement.id === "source-checker").earned, true);
  assert.equal(status.find((achievement) => achievement.id === "claim-sorter").earned, false);
  assert.equal(progress.achievements["source-checker"].earnedAt, "2026-06-04T12:00:00.000Z");
});

test("computes grade-scoped brain progress and only reaches 100 percent when experiments and goals are complete", () => {
  let progress = createEmptyProgress();

  progress = recordThoughtEvent(progress, {
    type: "experiment_completed",
    experimentId: "deepfake-election",
    gradeBand: "6-8",
  });
  progress = recordThoughtEvent(progress, {
    type: "achievement_completed",
    achievementId: "source-checker",
    experimentId: "deepfake-election",
    gradeBand: "6-8",
  });

  const partial = getBrainProgress(progress, {
    experimentIds: ["deepfake-election", "trolley-self-driving"],
    achievementIds: ["source-checker", "claim-sorter"],
  });

  assert.equal(partial.percent, 50);
  assert.equal(partial.level, 3);

  progress = recordThoughtEvent(progress, {
    type: "experiment_completed",
    experimentId: "trolley-self-driving",
    gradeBand: "6-8",
  });
  progress = recordThoughtEvent(progress, {
    type: "achievement_completed",
    achievementId: "claim-sorter",
    experimentId: "deepfake-election",
    gradeBand: "6-8",
  });

  const complete = getBrainProgress(progress, {
    experimentIds: ["deepfake-election", "trolley-self-driving"],
    achievementIds: ["source-checker", "claim-sorter"],
  });

  assert.equal(complete.percent, 100);
  assert.equal(complete.level, 6);
});
