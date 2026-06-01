import assert from "node:assert/strict";
import test from "node:test";

import { K5_SCENARIO_COPY } from "../data/k5ScenarioCopy.js";
import { lensNameKid } from "../data/kidLensNames.js";
import {
  buildPathRecapSpeechText,
  buildPathRecapSummaryText,
  buildStudentReferenceSpeechText,
  buildStudentStorySpeechText,
  choiceKeyFromChoices,
  choicesForStoryKey,
  enumerateSynthesisAudioItems,
} from "./k5SynthesisAudioText.js";

test("enumerates every K-5 synthesis read-aloud chunk from scenario copy", () => {
  const items = [...enumerateSynthesisAudioItems(K5_SCENARIO_COPY)];
  const byType = Object.groupBy(items, item => item.type);

  assert.equal(byType["student-story"]?.length, 504);
  assert.equal(byType["path-recap"]?.length, 504);
  assert.equal(byType["student-position"]?.length, 72);
  assert.equal(byType["student-reference"]?.length, 24);

  const uniqueKeys = new Set(items.map(item => `${item.scenarioId}/${item.slot}`));
  assert.equal(uniqueKeys.size, items.length);
  assert.ok(items.every(item => item.text.trim().length > 0));
});

test("derives story choices from real stage option labels", () => {
  const twoStageScenario = K5_SCENARIO_COPY["magic-toy"];
  const twoStageChoices = choicesForStoryKey(twoStageScenario, "A-C");
  assert.equal(twoStageChoices.length, 2);
  assert.equal(choiceKeyFromChoices(twoStageChoices), "A-C");
  assert.deepEqual(
    twoStageChoices.map(choice => choice.label),
    ["A", "C"],
  );

  const threeStageScenario = K5_SCENARIO_COPY["ai-homework-help"];
  const threeStageChoices = choicesForStoryKey(threeStageScenario, "A-B-C");
  assert.equal(threeStageChoices.length, 3);
  assert.equal(choiceKeyFromChoices(threeStageChoices), "A-B-C");
  assert.deepEqual(
    threeStageChoices.map(choice => choice.label),
    ["A", "B", "C"],
  );
});

test("recap summary uses natural choice-count language", () => {
  const twoChoiceDominant = [
    { label: "A", text: "Keep the secret gently.", lens: "care" },
    { label: "B", text: "Help the friend feel safe.", lens: "care" },
  ];
  const twoChoiceSummary = buildPathRecapSummaryText(twoChoiceDominant);
  assert.match(twoChoiceSummary, /both choices/);

  const threeChoiceDominant = [
    { label: "A", text: "Tell the truth kindly.", lens: "honesty" },
    { label: "B", text: "Share what happened.", lens: "honesty" },
    { label: "C", text: "Make room for feelings.", lens: "care" },
  ];
  const threeChoiceSummary = buildPathRecapSummaryText(threeChoiceDominant);
  assert.doesNotMatch(threeChoiceSummary, /both choices/);
  assert.match(threeChoiceSummary, /all three choices/);

  const speechText = buildPathRecapSpeechText(threeChoiceDominant);
  assert.match(speechText, /Your choices today/);
  assert.match(speechText, /Choice 3/);
});

test("student story and reference builders produce clean speech text", () => {
  const story = K5_SCENARIO_COPY["magic-toy"].studentStories["A-C"];
  const storyText = buildStudentStorySpeechText(story);
  assert.match(storyText, /Your story/);
  assert.match(storyText, new RegExp(story.title));

  const reference = K5_SCENARIO_COPY["magic-toy"].studentReference;
  const referenceText = buildStudentReferenceSpeechText(reference);
  assert.match(referenceText, /Where this idea comes from/);
  assert.ok(referenceText.includes(reference.concept.replace(/[.?!]+$/g, "")));
});

test("kid lens names fall back cleanly for unknown ids", () => {
  assert.equal(lensNameKid("moral-courage"), "doing the brave right thing");
  assert.equal(lensNameKid("brand-new-lens"), "brand new lens");
});
