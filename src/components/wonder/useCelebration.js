import { getBadgeStatus } from "../../lib/thoughtProgress.js";

// Helpers for the end-of-story celebration and its handoff to the hub.
// The story page writes a short-lived sessionStorage note when a story is
// finished for the first time; the K-5 hub reads-and-clears it on the next
// visit so the matching map node and lights meter can play a one-time
// "+1 wonder light" animation.
export const CELEBRATE_KEY = "ee:wonder-celebrate:v1";
const CELEBRATE_TTL_MS = 5 * 60 * 1000;

// StrictMode double-fires completion effects in dev; the caller also guards
// with a ref, but diffing prev/next keeps the result correct regardless.
export function diffCompletion(prev, next, experimentId) {
  const firstCompletion = Boolean(
    !prev?.experiments?.[experimentId]?.completed
    && next?.experiments?.[experimentId]?.completed,
  );
  const prevEarned = new Set(
    getBadgeStatus(prev, { badgeSetId: "k5" })
      .filter((badge) => badge.earned)
      .map((badge) => badge.id),
  );
  const newBadges = getBadgeStatus(next, { badgeSetId: "k5" })
    .filter((badge) => badge.earned && !prevEarned.has(badge.id));
  return { firstCompletion, newBadges };
}

export function writeCelebration({ experimentId }) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(CELEBRATE_KEY, JSON.stringify({ experimentId, at: Date.now() }));
  } catch {
    // Best effort: without storage the hub simply skips the light-up moment.
  }
}

// StrictMode double-invokes state initializers in dev, and the second call
// would find the storage already cleared. Cache the consumed value briefly so
// both invocations (and any immediate remount) agree on the same celebration.
let consumedCelebration = null;
let consumedAt = 0;
const CONSUMED_CACHE_MS = 8000;

export function readAndClearCelebration() {
  if (typeof window === "undefined") return null;
  if (consumedCelebration && Date.now() - consumedAt < CONSUMED_CACHE_MS) {
    return consumedCelebration;
  }
  try {
    const raw = window.sessionStorage.getItem(CELEBRATE_KEY);
    if (!raw) return null;
    window.sessionStorage.removeItem(CELEBRATE_KEY);
    const parsed = JSON.parse(raw);
    if (!parsed?.experimentId) return null;
    if (typeof parsed.at !== "number" || Date.now() - parsed.at > CELEBRATE_TTL_MS) return null;
    consumedCelebration = parsed;
    consumedAt = Date.now();
    return parsed;
  } catch {
    return null;
  }
}
