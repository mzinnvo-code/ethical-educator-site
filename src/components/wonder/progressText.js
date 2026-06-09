// Pure helpers that turn progress state into the "what's next" copy.
export function nextGoalText({ brain, badges, achievements }) {
  if (brain.percent >= 100) return "All current tracker goals are complete. The brain network is fully lit.";
  const nextAchievement = achievements.find((achievement) => !achievement.earned);
  if (nextAchievement) return `${nextAchievement.label}: ${nextAchievement.criteria}`;
  const nextBadge = badges.find((badge) => !badge.earned);
  if (nextBadge) return `${nextBadge.label}: ${nextBadge.criteria}`;
  return "Finish another dilemma in this grade band to light more of the brain network.";
}

export function hudNextGoalText({ brain, badges, achievements }) {
  if (brain.percent >= 100) return "Brain fully lit";
  const nextAchievement = achievements.find((achievement) => !achievement.earned);
  if (nextAchievement) return nextAchievement.label;
  const nextBadge = badges.find((badge) => !badge.earned);
  if (nextBadge) return nextBadge.label;
  return "Finish another dilemma";
}

// One-sentence hint for the next unearned badge, used by Ari's speech bubble.
export function nextSparkHint({ brain, badges, achievements }) {
  if (brain.percent >= 100) return null;
  const nextAchievement = achievements.find((achievement) => !achievement.earned);
  if (nextAchievement) return nextAchievement.criteria;
  const nextBadge = badges.find((badge) => !badge.earned);
  if (nextBadge) return nextBadge.criteria;
  return null;
}
