// Pure helpers for the K-5 adventure structure. Imported by node tests and
// the map components so progress logic stays in one place.
//
// The world is structured like a classic platformer: the HUB shows an
// overworld of six grade islands on a winding trail (K -> 1 -> 2 across the
// top, down, then 3 -> 4 -> 5 back across the bottom); each GRADE page shows
// its own lateral level path, left to right, ending in a gate that leads to
// the next grade (or back to the Wonder Workshop after Grade 5).

export function nodeProgressState(progressEntry) {
  const completed = Boolean(progressEntry?.completed);
  const replayed = completed && ((progressEntry?.completionCount || 0) > 1 || (progressEntry?.restarts || 0) > 0);
  return { completed, replayed };
}

// The first story a student hasn't finished yet — where the "you are here"
// marker stands. Null when the whole grade is complete (the marker moves to
// the exit gate).
export function firstIncompleteId(experiments, progress) {
  const next = experiments.find((experiment) => !progress?.experiments?.[experiment.id]?.completed);
  return next ? next.id : null;
}

export function zoneCompletedCount(experiments, progress) {
  return experiments.filter((experiment) => progress?.experiments?.[experiment.id]?.completed).length;
}
