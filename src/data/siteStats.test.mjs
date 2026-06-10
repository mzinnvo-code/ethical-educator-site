import assert from "node:assert/strict";
import test from "node:test";

import {
  EXPERIMENT_COUNT,
  TEACHER_KIT_COUNT,
  PROTOCOL_COUNT,
  SENTENCE_STEM_COUNT,
  CURATED_RESOURCE_COUNT,
} from "./siteStats.js";
import { THOUGHT_EXPERIMENT_DATES } from "../theme.js";
import { TEACHER_KITS } from "./teacherKits.js";
import { PROTOCOLS } from "./protocols.js";
import { STEMS } from "./stems.js";
import {
  BOOK_RESOURCES,
  MEDIA_RESOURCES,
  ORGANIZATION_RESOURCES,
  POLICY_RESOURCES,
} from "./resourcesLibrary.js";

test("home page experiment count derives from the dated experiment map", () => {
  assert.equal(EXPERIMENT_COUNT, Object.keys(THOUGHT_EXPERIMENT_DATES).length);
  assert.ok(EXPERIMENT_COUNT >= 50, "experiment library shrank unexpectedly");
});

test("home page stats match their source modules", () => {
  assert.equal(TEACHER_KIT_COUNT, Object.keys(TEACHER_KITS).length);
  assert.equal(PROTOCOL_COUNT, PROTOCOLS.length);
  assert.equal(SENTENCE_STEM_COUNT, STEMS.length);
  assert.equal(
    CURATED_RESOURCE_COUNT,
    BOOK_RESOURCES.length + MEDIA_RESOURCES.length + ORGANIZATION_RESOURCES.length + POLICY_RESOURCES.length
  );
});
