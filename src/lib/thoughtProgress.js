export const STORAGE_KEY = "ee:thought-progress:v1";
export const SCHEMA_VERSION = 3;
const LEGACY_BADGE_VIEWED_AT = "legacy-progress";

const KNOWN_EVENT_TYPES = new Set([
  "stage_started",
  "choice_made",
  "stage_completed",
  "experiment_completed",
  "achievement_completed",
  "journal_saved",
  "steelman_saved",
  "experiment_restarted",
  "related_opened",
  "badge_viewed",
]);

const CAREFUL_VERIFIER_LENSES = new Set([
  "responsibility",
  "epistemic-care",
  "restraint",
  "consistency",
  "civic-integrity",
]);

const CONSISTENCY_LENSES = new Set([
  "consistency",
  "civic-integrity",
  "integrity",
  "procedural",
]);

export const BADGES = [
  {
    id: "first-dilemma",
    label: "First Dilemma",
    desc: "Finished one thought experiment from start to synthesis.",
    criteria: "Finish any thought experiment and reach its synthesis.",
  },
  {
    id: "careful-verifier",
    label: "Careful Verifier",
    desc: "Slowed down the Deepfake Dilemma by checking claims before sharing.",
    criteria: "Complete The Deepfake Dilemma with at least one verification or civic-integrity lens.",
  },
  {
    id: "steelman-builder",
    label: "Steelman Builder",
    desc: "Saved the strongest version of a view you did not choose.",
    criteria: "Save a steelman reflection from any synthesis panel.",
  },
  {
    id: "lens-explorer",
    label: "Lens Explorer",
    desc: "Used three different reasoning lenses across your choices.",
    criteria: "Make choices that use three different reasoning lenses.",
  },
  {
    id: "second-thought",
    label: "Second Thought",
    desc: "Replayed a dilemma to test a different path.",
    criteria: "Restart a thought experiment after trying a path.",
  },
  {
    id: "topic-wanderer",
    label: "Topic Wanderer",
    desc: "Explored dilemmas across three topic areas.",
    criteria: "Complete or choose through experiments across three topic areas.",
  },
  {
    id: "consistent-thinker",
    label: "Consistent Thinker",
    desc: "Kept a principle when the story made it inconvenient.",
    criteria: "Use a consistency or civic-integrity lens when the story puts pressure on your view.",
  },
];

export const ACHIEVEMENTS = [
  {
    id: "source-checker",
    label: "Source Checker",
    desc: "Paused a viral video long enough to verify the source before sharing.",
    criteria: "In Act 1 of The Deepfake Dilemma, complete the verification check before choosing.",
    experimentId: "deepfake-election",
  },
  {
    id: "claim-sorter",
    label: "Claim Sorter",
    desc: "Separated the fake clip from the unconfirmed real-world claim riding underneath it.",
    criteria: "In Act 2, correctly sort the fake video, unconfirmed investigation, and chat speculation.",
    experimentId: "deepfake-election",
  },
  {
    id: "truth-under-pressure",
    label: "Truth Under Pressure",
    desc: "Kept a truth rule when correcting the fake helped someone you opposed.",
    criteria: "In Act 3, write a rule and apply it when misinformation helps your side.",
    experimentId: "deepfake-election",
  },
];

const BADGE_BY_ID = Object.fromEntries(BADGES.map((badge) => [badge.id, badge]));
const ACHIEVEMENT_BY_ID = Object.fromEntries(ACHIEVEMENTS.map((achievement) => [achievement.id, achievement]));

export function createEmptyProgress() {
  return {
    schemaVersion: SCHEMA_VERSION,
    events: [],
    experiments: {},
    lenses: {},
    topics: {},
    achievements: {},
    badgeViews: {},
    journalSaveCount: 0,
    steelmanSaveCount: 0,
    relatedOpenCount: 0,
    updatedAt: null,
  };
}

function asObject(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

function asCountMap(value) {
  const input = asObject(value);
  return Object.fromEntries(
    Object.entries(input)
      .filter(([key, count]) => key && typeof count === "number" && Number.isFinite(count) && count > 0)
      .map(([key, count]) => [key, count]),
  );
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function asTopicIds(value) {
  return asArray(value).filter((id) => typeof id === "string" && id.length > 0);
}

function normalizeAchievement(id, value) {
  const achievement = asObject(value);
  const hasEarnedSignal = typeof achievement.earnedAt === "string" || typeof achievement.count === "number";
  return {
    id,
    experimentId: typeof achievement.experimentId === "string" ? achievement.experimentId : ACHIEVEMENT_BY_ID[id]?.experimentId || null,
    earnedAt: typeof achievement.earnedAt === "string" ? achievement.earnedAt : null,
    count: typeof achievement.count === "number" && Number.isFinite(achievement.count) && achievement.count > 0 ? achievement.count : hasEarnedSignal ? 1 : 0,
  };
}

function normalizeBadgeView(id, value) {
  const view = asObject(value);
  return {
    id,
    earnedAt: typeof view.earnedAt === "string" ? view.earnedAt : null,
    viewedAt: typeof view.viewedAt === "string" ? view.viewedAt : null,
  };
}

function normalizeExperiment(id, value) {
  const experiment = asObject(value);
  return {
    id,
    gradeBand: typeof experiment.gradeBand === "string" ? experiment.gradeBand : null,
    topicIds: asTopicIds(experiment.topicIds),
    stages: asObject(experiment.stages),
    completed: !!experiment.completed,
    completionCount: typeof experiment.completionCount === "number" && Number.isFinite(experiment.completionCount) ? experiment.completionCount : 0,
    choiceCount: typeof experiment.choiceCount === "number" && Number.isFinite(experiment.choiceCount) ? experiment.choiceCount : 0,
    lenses: asCountMap(experiment.lenses),
    restarts: typeof experiment.restarts === "number" && Number.isFinite(experiment.restarts) ? experiment.restarts : 0,
    relatedOpenCount: typeof experiment.relatedOpenCount === "number" && Number.isFinite(experiment.relatedOpenCount) ? experiment.relatedOpenCount : 0,
    firstCompletedAt: typeof experiment.firstCompletedAt === "string" ? experiment.firstCompletedAt : null,
    lastCompletedAt: typeof experiment.lastCompletedAt === "string" ? experiment.lastCompletedAt : null,
  };
}

export function normalizeProgress(value) {
  const raw = asObject(value);
  if (raw.schemaVersion !== 1 && raw.schemaVersion !== 2 && raw.schemaVersion !== SCHEMA_VERSION) return createEmptyProgress();

  const experiments = {};
  for (const [id, experiment] of Object.entries(asObject(raw.experiments))) {
    if (id) experiments[id] = normalizeExperiment(id, experiment);
  }

  const achievements = {};
  for (const [id, achievement] of Object.entries(asObject(raw.achievements))) {
    if (id && ACHIEVEMENT_BY_ID[id]) achievements[id] = normalizeAchievement(id, achievement);
  }

  const badgeViews = {};
  for (const [id, view] of Object.entries(asObject(raw.badgeViews))) {
    if (id && BADGE_BY_ID[id]) badgeViews[id] = normalizeBadgeView(id, view);
  }

  const safe = {
    schemaVersion: SCHEMA_VERSION,
    events: asArray(raw.events).filter((event) => event?.type && KNOWN_EVENT_TYPES.has(event.type)),
    experiments,
    lenses: asCountMap(raw.lenses),
    topics: asCountMap(raw.topics),
    achievements,
    badgeViews,
    journalSaveCount: typeof raw.journalSaveCount === "number" && Number.isFinite(raw.journalSaveCount) ? raw.journalSaveCount : 0,
    steelmanSaveCount: typeof raw.steelmanSaveCount === "number" && Number.isFinite(raw.steelmanSaveCount) ? raw.steelmanSaveCount : 0,
    relatedOpenCount: typeof raw.relatedOpenCount === "number" && Number.isFinite(raw.relatedOpenCount) ? raw.relatedOpenCount : 0,
    updatedAt: typeof raw.updatedAt === "string" ? raw.updatedAt : null,
  };

  if (raw.schemaVersion < SCHEMA_VERSION) {
    const viewedAt = safe.updatedAt || LEGACY_BADGE_VIEWED_AT;
    for (const [id, earned] of Object.entries(getEarnedBadgeMap(safe))) {
      if (earned && !safe.badgeViews[id]) {
        safe.badgeViews[id] = { id, earnedAt: viewedAt, viewedAt };
      }
    }
  }

  return safe;
}

function nowIso() {
  return new Date().toISOString();
}

function cloneProgress(progress) {
  return JSON.parse(JSON.stringify(progress));
}

function increment(map, key) {
  if (!key) return map;
  return { ...map, [key]: (map[key] || 0) + 1 };
}

function incrementMany(map, keys = []) {
  return keys.reduce((next, key) => increment(next, key), map);
}

function getExperiment(next, event) {
  if (!event.experimentId) return null;
  const current = next.experiments[event.experimentId] || normalizeExperiment(event.experimentId, {});
  const topicIds = [...new Set([...current.topicIds, ...asTopicIds(event.topicIds)])];
  const gradeBand = current.gradeBand || event.gradeBand || null;
  const experiment = { ...current, gradeBand, topicIds };
  next.experiments = { ...next.experiments, [event.experimentId]: experiment };
  return experiment;
}

export function recordThoughtEvent(progress, event) {
  if (!event?.type || !KNOWN_EVENT_TYPES.has(event.type)) return normalizeProgress(progress);

  const before = normalizeProgress(progress);
  const timestamp = typeof event.timestamp === "string" ? event.timestamp : nowIso();
  const cleanEvent = {
    type: event.type,
    experimentId: event.experimentId || null,
    achievementId: event.achievementId || null,
    badgeId: event.badgeId || null,
    gradeBand: event.gradeBand || null,
    stageId: event.stageId || null,
    lens: event.lens || null,
    topicIds: asTopicIds(event.topicIds),
    timestamp,
  };

  const next = cloneProgress(before);
  next.events = [...next.events, cleanEvent].slice(-500);
  next.updatedAt = timestamp;

  const experiment = getExperiment(next, cleanEvent);
  if (cleanEvent.lens) {
    next.lenses = increment(next.lenses, cleanEvent.lens);
    if (experiment) experiment.lenses = increment(experiment.lenses, cleanEvent.lens);
  }
  if (cleanEvent.topicIds.length) {
    next.topics = incrementMany(next.topics, cleanEvent.topicIds);
  }

  if (experiment && cleanEvent.type === "choice_made") {
    experiment.choiceCount += 1;
  }

  if (experiment && cleanEvent.type === "stage_completed" && cleanEvent.stageId) {
    experiment.stages = {
      ...experiment.stages,
      [cleanEvent.stageId]: {
        completed: true,
        completedAt: timestamp,
      },
    };
  }

  if (experiment && cleanEvent.type === "experiment_completed") {
    experiment.completed = true;
    experiment.completionCount += 1;
    experiment.firstCompletedAt = experiment.firstCompletedAt || timestamp;
    experiment.lastCompletedAt = timestamp;
  }

  if (cleanEvent.type === "achievement_completed" && ACHIEVEMENT_BY_ID[cleanEvent.achievementId]) {
    const current = next.achievements[cleanEvent.achievementId] || normalizeAchievement(cleanEvent.achievementId, {});
    next.achievements = {
      ...next.achievements,
      [cleanEvent.achievementId]: {
        ...current,
        experimentId: current.experimentId || cleanEvent.experimentId || ACHIEVEMENT_BY_ID[cleanEvent.achievementId].experimentId,
        earnedAt: current.earnedAt || timestamp,
        count: (current.count || 0) + 1,
      },
    };
  }

  if (cleanEvent.type === "journal_saved") {
    next.journalSaveCount += 1;
  }

  if (cleanEvent.type === "steelman_saved") {
    next.steelmanSaveCount += 1;
  }

  if (experiment && cleanEvent.type === "experiment_restarted") {
    experiment.restarts += 1;
  }

  if (experiment && cleanEvent.type === "related_opened") {
    experiment.relatedOpenCount += 1;
    next.relatedOpenCount += 1;
  }

  if (cleanEvent.type === "badge_viewed") {
    applyBadgeViewed(next, cleanEvent.badgeId, timestamp);
  }

  syncNewBadgeViews(before, next, timestamp);

  return normalizeProgress(next);
}

function getProgressSummaryFromSafe(safe) {
  const experiments = Object.values(safe.experiments);
  const completedStages = experiments.reduce(
    (total, experiment) => total + Object.values(experiment.stages).filter((stage) => stage?.completed).length,
    0,
  );
  const replayCount = experiments.reduce((total, experiment) => total + experiment.restarts, 0);
  const totalChoices = experiments.reduce((total, experiment) => total + experiment.choiceCount, 0);

  return {
    completedExperiments: experiments.filter((experiment) => experiment.completed).length,
    completionAttempts: experiments.reduce((total, experiment) => total + experiment.completionCount, 0),
    completedStages,
    totalChoices,
    lensCount: Object.keys(safe.lenses).length,
    topicCount: Object.keys(safe.topics).length,
    achievementCount: Object.keys(safe.achievements).length,
    journalSaveCount: safe.journalSaveCount,
    steelmanSaveCount: safe.steelmanSaveCount,
    replayCount,
    relatedOpenCount: safe.relatedOpenCount,
    updatedAt: safe.updatedAt,
  };
}

export function getProgressSummary(progress) {
  return getProgressSummaryFromSafe(normalizeProgress(progress));
}

function hasLens(progress, lensSet) {
  return Object.keys(progress.lenses).some((lens) => lensSet.has(lens));
}

function hasCarefulVerifier(progress) {
  const deepfake = progress.experiments["deepfake-election"];
  if (!deepfake?.completed) return false;
  return Object.keys(deepfake.lenses).some((lens) => CAREFUL_VERIFIER_LENSES.has(lens));
}

function getEarnedBadgeMap(safe) {
  const summary = getProgressSummaryFromSafe(safe);
  return {
    "first-dilemma": summary.completedExperiments >= 1,
    "careful-verifier": hasCarefulVerifier(safe),
    "steelman-builder": summary.steelmanSaveCount >= 1,
    "lens-explorer": summary.lensCount >= 3,
    "second-thought": summary.replayCount >= 1,
    "topic-wanderer": summary.topicCount >= 3,
    "consistent-thinker": hasLens(safe, CONSISTENCY_LENSES),
  };
}

function applyBadgeViewed(progress, badgeId, timestamp) {
  if (!BADGE_BY_ID[badgeId]) return progress;
  const earnedById = getEarnedBadgeMap(progress);
  if (!earnedById[badgeId]) return progress;
  const current = progress.badgeViews[badgeId] || { id: badgeId, earnedAt: timestamp, viewedAt: null };
  progress.badgeViews = {
    ...progress.badgeViews,
    [badgeId]: {
      ...current,
      earnedAt: current.earnedAt || timestamp,
      viewedAt: timestamp,
    },
  };
  return progress;
}

function syncNewBadgeViews(before, next, timestamp) {
  const previousEarned = getEarnedBadgeMap(before);
  const currentEarned = getEarnedBadgeMap(next);
  const updates = { ...next.badgeViews };

  for (const [id, earned] of Object.entries(currentEarned)) {
    if (!earned || updates[id]) continue;
    updates[id] = {
      id,
      earnedAt: timestamp,
      viewedAt: previousEarned[id] ? timestamp : null,
    };
  }

  next.badgeViews = updates;
}

export function markBadgeViewed(progress, badgeId, timestamp = nowIso()) {
  const safe = normalizeProgress(progress);
  applyBadgeViewed(safe, badgeId, timestamp);
  return normalizeProgress(safe);
}

export function getBadgeStatus(progress) {
  const safe = normalizeProgress(progress);
  const earnedById = getEarnedBadgeMap(safe);

  return BADGES.map((badge) => ({
    ...badge,
    earned: !!earnedById[badge.id],
    earnedAt: safe.badgeViews[badge.id]?.earnedAt || null,
    viewedAt: safe.badgeViews[badge.id]?.viewedAt || null,
    isNew: !!earnedById[badge.id] && !safe.badgeViews[badge.id]?.viewedAt,
  }));
}

export function getEarnedBadges(progress) {
  return getBadgeStatus(progress);
}

export function getAchievementStatus(progress, achievementIds = ACHIEVEMENTS.map((achievement) => achievement.id)) {
  const safe = normalizeProgress(progress);
  const visible = new Set(achievementIds);
  return ACHIEVEMENTS
    .filter((achievement) => visible.has(achievement.id))
    .map((achievement) => {
      const earned = safe.achievements[achievement.id];
      return {
        ...achievement,
        earned: !!earned,
        earnedAt: earned?.earnedAt || null,
        count: earned?.count || 0,
      };
    });
}

export function getBrainProgress(progress, {
  experimentIds = [],
  achievementIds = ACHIEVEMENTS.map((achievement) => achievement.id),
} = {}) {
  const safe = normalizeProgress(progress);
  const experimentGoals = [...new Set(experimentIds)].map((id) => ({
    id,
    type: "experiment",
    complete: !!safe.experiments[id]?.completed,
  }));
  const achievementGoals = getAchievementStatus(safe, achievementIds).map((achievement) => ({
    id: achievement.id,
    type: "achievement",
    complete: achievement.earned,
  }));
  const goals = [...experimentGoals, ...achievementGoals];
  const totalGoals = goals.length;
  const completedGoals = goals.filter((goal) => goal.complete).length;
  const percent = totalGoals ? Math.round((completedGoals / totalGoals) * 100) : 0;
  const level = percent === 0 ? 0 : Math.max(1, Math.min(6, Math.ceil((percent / 100) * 6)));

  return {
    percent,
    level,
    completedGoals,
    totalGoals,
    goals,
  };
}

export function readThoughtProgress() {
  if (typeof window === "undefined") return createEmptyProgress();
  try {
    return normalizeProgress(JSON.parse(window.localStorage.getItem(STORAGE_KEY)));
  } catch {
    return createEmptyProgress();
  }
}

export function writeThoughtProgress(progress) {
  const safe = normalizeProgress(progress);
  if (typeof window === "undefined") return safe;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(safe));
  } catch {
    // Private mode, full storage, or disabled storage should not break the activity.
  }
  return safe;
}

export function recordThoughtProgressEvent(event) {
  const next = recordThoughtEvent(readThoughtProgress(), event);
  return writeThoughtProgress(next);
}

export function resetThoughtProgress() {
  const empty = createEmptyProgress();
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Storage failures leave the in-memory empty value as the caller's fallback.
    }
  }
  return empty;
}
