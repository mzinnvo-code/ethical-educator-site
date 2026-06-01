import { lensNameKid } from "../data/kidLensNames.js";
import { buildSpeechText } from "./readAloudText.js";

export function choiceKeyFromChoices(choices = []) {
  return (choices || [])
    .map(choice => choice?.label)
    .filter(Boolean)
    .join("-");
}

export function playableStagesForScenario(scenario) {
  return (scenario?.stages || []).filter(stage => !stage?.synthesis && Array.isArray(stage?.options));
}

export function choicesForStoryKey(scenario, choiceKey) {
  const labels = String(choiceKey || "").split("-").filter(Boolean);
  const stages = playableStagesForScenario(scenario);
  if (!labels.length || labels.length !== stages.length) return null;

  const choices = labels.map((label, index) => {
    return stages[index]?.options?.find(option => option?.label === label) || null;
  });

  return choices.every(Boolean) ? choices : null;
}

export function storyParagraphs(story) {
  if (!story) return [];
  return Array.isArray(story.body) ? story.body.filter(Boolean) : [story.body].filter(Boolean);
}

export function buildStudentStorySpeechText(story) {
  return buildSpeechText([
    "Your story",
    story?.title,
    ...storyParagraphs(story),
  ]);
}

export function choiceCountPhrase(choiceCount) {
  if (choiceCount === 1) return "your choice";
  if (choiceCount === 2) return "both choices";
  if (choiceCount === 3) return "all three choices";
  return "your choices";
}

export function buildPathRecapParts(choices = []) {
  const recorded = (choices || []).filter(Boolean);
  const lensCounts = recorded.reduce((acc, choice) => {
    if (choice?.lens) acc[choice.lens] = (acc[choice.lens] || 0) + 1;
    return acc;
  }, {});
  const sortedLenses = Object.entries(lensCounts).sort((a, b) => b[1] - a[1]);
  const top = sortedLenses[0] || null;
  const second = sortedLenses[1] || null;
  const isTied = Boolean(top && second && top[1] === second[1]);

  return {
    recorded,
    topLens: top?.[0] || null,
    secondLens: second?.[0] || null,
    isTied,
    choicePhrase: choiceCountPhrase(recorded.length),
  };
}

export function buildPathRecapSummaryText(choices = []) {
  const { topLens, secondLens, isTied, choicePhrase } = buildPathRecapParts(choices);
  if (!topLens) return "";
  if (isTied && secondLens) {
    return `Today, you blended ${lensNameKid(topLens)} and ${lensNameKid(secondLens)} together.`;
  }
  return `Today, you leaned into ${lensNameKid(topLens)} and you carried it through ${choicePhrase}.`;
}

export function buildPathRecapSpeechText(choices = []) {
  const { recorded } = buildPathRecapParts(choices);
  if (!recorded.length) return "";
  return buildSpeechText([
    "Your choices today",
    ...recorded.map((choice, index) => `Choice ${index + 1}. ${choice?.text || choice?.label}`),
    buildPathRecapSummaryText(recorded),
  ]);
}

export function buildPathRecapSpeechTextForKey(scenario, choiceKey) {
  const choices = choicesForStoryKey(scenario, choiceKey);
  return choices ? buildPathRecapSpeechText(choices) : "";
}

export function buildStudentPositionSpeechText(position) {
  return buildSpeechText([
    position?.name,
    position?.view,
  ]);
}

export function buildStudentReferenceSpeechText(reference) {
  if (!reference?.concept && !reference?.blurb) return "";
  return buildSpeechText([
    "Where this idea comes from",
    reference?.concept,
    reference?.blurb,
  ]);
}

export function* enumerateSynthesisAudioItems(scenarios = {}) {
  for (const [scenarioId, scenario] of Object.entries(scenarios || {})) {
    for (const [choiceKey, story] of Object.entries(scenario?.studentStories || {})) {
      const choices = choicesForStoryKey(scenario, choiceKey);
      if (!choices) continue;

      const storyText = buildStudentStorySpeechText(story);
      if (storyText) {
        yield {
          scenarioId,
          slot: `student-story-${choiceKey}`,
          type: "student-story",
          text: storyText,
        };
      }

      const recapText = buildPathRecapSpeechText(choices);
      if (recapText) {
        yield {
          scenarioId,
          slot: `path-recap-${choiceKey}`,
          type: "path-recap",
          text: recapText,
        };
      }
    }

    for (const [index, position] of (scenario?.studentPositions || []).entries()) {
      const text = buildStudentPositionSpeechText(position);
      if (!text) continue;
      yield {
        scenarioId,
        slot: `student-position-${index + 1}`,
        type: "student-position",
        text,
      };
    }

    if (scenario?.studentReference) {
      const referenceText = buildStudentReferenceSpeechText(scenario.studentReference);
      if (!referenceText) continue;
      yield {
        scenarioId,
        slot: "student-reference",
        type: "student-reference",
        text: referenceText,
      };
    }
  }
}
