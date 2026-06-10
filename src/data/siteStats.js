import { THOUGHT_EXPERIMENT_DATES } from "../theme.js";

// Every number displayed on the home page comes from here, and every constant
// below is asserted against its heavy source module in siteStats.test.mjs —
// a stale figure is a CI failure, never a silent lie on the marketing page.
// The heavy modules themselves (experiments.js, teacherKits.js) must NOT be
// imported by the home page: they drag the scene graph into the main chunk.

export const EXPERIMENT_COUNT = Object.keys(THOUGHT_EXPERIMENT_DATES).length;

export const TEACHER_KIT_COUNT = 51;
export const PROTOCOL_COUNT = 12;
export const SENTENCE_STEM_COUNT = 25;
export const CURATED_RESOURCE_COUNT = 42;
