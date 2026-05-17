import { getExperimentIllustration, getFeatureIllustration } from "./illustrations.js";
import { STAGE_SCENE_SETS } from "./stageSceneManifest.js";

const scene = (src, alt, motion = "subtle", tone = "story") => ({
  src,
  alt,
  motion,
  tone,
});

const normalizeVariant = (variant) => variant || "default";

function resolveStageSet(id, visualVariant) {
  const variant = normalizeVariant(visualVariant);
  return (
    STAGE_SCENE_SETS[`${variant}:${id}`] ||
    STAGE_SCENE_SETS[`default:${id}`] ||
    STAGE_SCENE_SETS[id] ||
    null
  );
}

function stageScene(set, stageId, stageIndex) {
  if (!set?.stages) return null;
  const direct = stageId ? set.stages[stageId] : null;
  if (direct) return direct;
  const byIndex = Number.isFinite(stageIndex) ? Object.values(set.stages)[stageIndex] : null;
  return byIndex || null;
}

export const SCENE_ILLUSTRATIONS = {
  "magic-toy": scene(
    "/experiment-scenes/magic-toy.webp",
    "A young child pauses beside a softly glowing talking toy, weighing whether its sadness should be treated as real.",
    "glow",
    "young"
  ),
  "invisible-ring": scene(
    "/experiment-scenes/invisible-ring.webp",
    "A child wearing a glowing ring looks toward a mirror, deciding who they become when no one can see them.",
    "mirror",
    "young"
  ),
  "explaining-red-k-2": scene(
    "/experiment-scenes/explaining-red-k-2.webp",
    "Ada stands at the door of a K-2 classroom with a white cane. Her classmates sit on a rug, listening to their teacher introduce the colors lesson.",
    "subtle",
    "young"
  ),
  "robot-friend-turn": scene(
    "/experiment-scenes/robot-friend-turn.webp",
    "Two young children sit beside a friendly classroom robot, deciding how to share attention and kindness fairly.",
    "sharing",
    "young"
  ),
  "honesty-protection": scene(
    "/experiment-scenes/honesty-protection.webp",
    "A child stands between a worried friend and a broken classroom object, choosing between honesty and loyalty.",
    "subtle",
    "young"
  ),
  "robot-pet-goodbye": scene(
    "/experiment-scenes/robot-pet-goodbye.webp",
    "A child holds a quiet robot pet near a repair table, wondering whether replacing it would change what they love.",
    "subtle",
    "young"
  ),
  "ai-art-help": scene(
    "/experiment-scenes/ai-art-help.webp",
    "A child compares their own drawing with an AI-assisted version, wondering what makes creative work truly theirs.",
    "subtle",
    "young"
  ),
  "messy-robot": scene(
    "/experiment-scenes/messy-robot.webp",
    "A child looks at a messy play area and a helpful cleaning robot, deciding whether convenience excuses making extra work.",
    "subtle",
    "young"
  ),
  "rules-vs-helping": scene(
    "/experiment-scenes/rules-vs-helping.webp",
    "A child hesitates in a quiet classroom doorway, choosing between following a rule and helping someone who needs care.",
    "subtle",
    "young"
  ),
  "rude-toy": scene(
    "/experiment-scenes/rude-toy.webp",
    "A child faces a glowing toy that has said something unkind, deciding whether feelings and respect matter with machines.",
    "subtle",
    "young"
  ),
  "winning-game": scene(
    "/experiment-scenes/winning-game.webp",
    "A child looks at a game screen and a doubtful classmate, wondering whether winning still counts when help was unfair.",
    "subtle",
    "young"
  ),
  "always-agreeable-ai-friend": scene(
    "/experiment-scenes/always-agreeable-ai-friend.webp",
    "A student sits with a glowing AI chat companion that always agrees while considering whether real friendship sometimes requires kind disagreement.",
    "glow",
    "young"
  ),
  "same-toy-or-not": scene(
    "/experiment-scenes/same-toy-or-not.webp",
    "A student compares a repaired robot toy with its old parts rebuilt nearby, wondering which one is truly the same beloved toy.",
    "subtle",
    "young"
  ),
  "ai-written-story": scene(
    "/experiment-scenes/ai-written-story.webp",
    "A student looks from their rough story notes to a polished AI-generated version, weighing authorship, credit, and learning.",
    "spotlight",
    "young"
  ),
  "gps-shortcut": scene(
    "/experiment-scenes/gps-shortcut.webp",
    "Students on a walking field trip compare a glowing GPS shortcut with a teacher's safer route, deciding what kind of guidance to trust.",
    "reveal",
    "young"
  ),
  "ai-photo-art": scene(
    "/experiment-scenes/ai-photo-art.webp",
    "A student pauses before sharing AI art made from a friend's photo, weighing creativity against consent and privacy.",
    "subtle",
    "young"
  ),
  "adaptive-learning-fairness": scene(
    "/experiment-scenes/adaptive-learning-fairness.webp",
    "Two students see different math app levels on neighboring screens and wonder whether fairness means the same work or the right support.",
    "subtle",
    "young"
  ),
  "conflicting-ai-answers": scene(
    "/experiment-scenes/conflicting-ai-answers.webp",
    "Students compare two confident AI answers about a science question and decide how to verify knowledge before presenting it.",
    "split",
    "middle"
  ),
  "robot-rules-real-life": scene(
    "/experiment-scenes/robot-rules-real-life.webp",
    "A hallway robot blocks a student who needs care, forcing the class to weigh strict rules against human judgment.",
    "warning",
    "middle"
  ),
  "elementary-trolley": scene(
    "/experiment-scenes/elementary-trolley.webp",
    "Students study a self-driving school shuttle on branching tracks and weigh how an automated system should choose among harms.",
    "switch",
    "middle"
  ),
  "ai-science-fair": scene(
    "/experiment-scenes/ai-science-fair.webp",
    "A student stands beside a dazzling AI-polished science fair board while wondering whether the display shows real understanding.",
    "spotlight",
    "middle"
  ),
  "online-friend-or-ai": scene(
    "/experiment-scenes/online-friend-or-ai.webp",
    "A student looks at a glowing online game friend profile and weighs comfort, truth, privacy, and whether the friend might be AI.",
    "glow",
    "middle"
  ),
  "ai-homework-help": scene(
    "/experiment-scenes/ai-homework-help.webp",
    "A student stuck on homework chooses between an AI hint, a full solution, and the harder path of learning the idea.",
    "subtle",
    "middle"
  ),
  "biased-classroom-robot": scene(
    "/experiment-scenes/biased-classroom-robot.webp",
    "Students watch a classroom robot call on the same voices again and again while hidden bias leaves others unseen.",
    "spotlight",
    "middle"
  ),
  "ai-grading-mistake": scene(
    "/experiment-scenes/ai-grading-mistake.webp",
    "A student and teacher compare a personal essay with an AI grading warning, deciding how to challenge a mistaken automated judgment.",
    "warning",
    "middle"
  ),
  "trolley-self-driving": scene(
    "/experiment-scenes/trolley-self-driving.webp",
    "A student watches a self-driving trolley approach a branching track, weighing lives and responsibility before a forced choice.",
    "switch",
    "middle"
  ),
  "ship-of-theseus-robot": scene(
    "/experiment-scenes/ship-of-theseus-robot.webp",
    "A student studies an old robot with new replacement parts, wondering when change becomes a different identity.",
    "subtle",
    "middle"
  ),
  "brain-in-vat": scene(
    "/experiment-scenes/brain-in-vat.webp",
    "A student reaches toward a glowing classroom window that may be real or simulated, questioning how they know reality.",
    "subtle",
    "middle"
  ),
  "sorites-heap": scene(
    "/experiment-scenes/sorites-heap.webp",
    "A student removes one grain from a glowing pile, wondering when many small changes become a real difference.",
    "subtle",
    "middle"
  ),
  "tragedy-commons": scene(
    "/experiment-scenes/tragedy-commons.webp",
    "Several students share a bright green common space, deciding how much each may take before everyone loses.",
    "subtle",
    "middle"
  ),
  "liar-paradox": scene(
    "/experiment-scenes/liar-paradox.webp",
    "A student studies a looping glowing symbol that seems to contradict itself, trying to reason through an impossible claim.",
    "subtle",
    "middle"
  ),
  "deepfake-election": scene(
    "/experiment-scenes/deepfake-election.webp",
    "A student compares an authentic video with a manipulated deepfake video while weighing how to respond before an election.",
    "split",
    "high"
  ),
  "biased-resume-ai": scene(
    "/experiment-scenes/biased-resume-ai.webp",
    "A student watches an AI hiring system spotlight one resume while another is unfairly shadowed, questioning algorithmic fairness.",
    "spotlight",
    "high"
  ),
  "autonomous-car-rider": scene(
    "/experiment-scenes/autonomous-car-rider.webp",
    "A passenger sits inside a self-driving car at a tense intersection, wondering whose safety the vehicle should prioritize.",
    "road",
    "high"
  ),
  "veil-of-ignorance": scene(
    "/experiment-scenes/veil-of-ignorance.webp",
    "Students stand behind a translucent veil before designing classroom rules, imagining fairness without knowing their own place.",
    "subtle",
    "high"
  ),
  "platos-cave": scene(
    "/experiment-scenes/platos-cave.webp",
    "Students turn from shadowy wall images toward a difficult bright doorway, deciding whether truth is worth leaving comfort.",
    "reveal",
    "high"
  ),
  "marys-room": scene(
    "/experiment-scenes/marys-room.webp",
    "A student steps from a monochrome room into warm color, questioning whether facts alone can teach lived experience.",
    "color-wash",
    "high"
  ),
  "chinese-room": scene(
    "/experiment-scenes/chinese-room.webp",
    "A student passes symbols through a glowing doorway, wondering whether correct answers prove understanding.",
    "subtle",
    "high"
  ),
  "experience-machine": scene(
    "/experiment-scenes/experience-machine.webp",
    "A student faces a beautiful immersive simulation pod, deciding whether perfect happiness is enough if it is not real.",
    "subtle",
    "high"
  ),
  "ring-of-gyges": scene(
    "/experiment-scenes/ring-of-gyges.webp",
    "An older student holds a glowing ring in a crowded hallway, weighing power, invisibility, and moral character.",
    "subtle",
    "high"
  ),
  "omelas": scene(
    "/experiment-scenes/omelas.webp",
    "A student stands at the edge of a radiant city and a hidden dark doorway, deciding whether comfort built on suffering can be accepted.",
    "subtle",
    "high"
  ),
  "drowning-child": scene(
    "/experiment-scenes/drowning-child.webp",
    "A student sees a child struggling near shallow water while holding costly belongings, weighing duty against personal loss.",
    "subtle",
    "high"
  ),
  "paperclip-maximizer": scene(
    "/experiment-scenes/paperclip-maximizer.webp",
    "A student watches harmless office supplies multiply into a vast glowing machine system, questioning goals without wisdom.",
    "subtle",
    "high"
  ),
  "ai-in-the-box": scene(
    "/experiment-scenes/ai-in-the-box.webp",
    "A student sits before a sealed glowing AI interface, deciding whether persuasive intelligence should be released or contained.",
    "box",
    "high"
  ),
  "simulation-argument": scene(
    "/experiment-scenes/simulation-argument.webp",
    "A student looks up at a night sky that fractures into luminous code, wondering whether their world might be simulated.",
    "subtle",
    "high"
  ),
  "school-surveillance": scene(
    "/experiment-scenes/school-surveillance.webp",
    "An educator watches students pass beneath soft digital scan lines, weighing safety against privacy and trust.",
    "scan",
    "educator"
  ),
  "ai-detector-false-positive": scene(
    "/experiment-scenes/ai-detector-false-positive.webp",
    "A teacher sees an AI detector warning beside a worried student's work, deciding how to respond before causing harm.",
    "warning",
    "educator"
  ),
  "ai-policy-design": scene(
    "/experiment-scenes/ai-policy-design.webp",
    "Educators gather around branching classroom policy paths, balancing curiosity, caution, student voice, and responsible AI use.",
    "subtle",
    "educator"
  ),
  "ai-grading-companion": scene(
    "/experiment-scenes/ai-grading-companion.webp",
    "A teacher compares student writing with AI feedback, deciding what judgment must remain human.",
    "subtle",
    "educator"
  ),
  "biased-admissions": scene(
    "/experiment-scenes/biased-admissions.webp",
    "An admissions committee studies glowing applicant profiles while hidden bias tilts the decision, questioning fairness in automated selection.",
    "subtle",
    "educator"
  ),
  "ai-friend-feelings": scene(
    "/experiment-scenes/ai-friend-feelings.webp",
    "An educator watches a student confide in a glowing AI companion, weighing comfort, dependency, privacy, and care.",
    "subtle",
    "educator"
  ),
  "the-shortcut": scene(
    "/illustrations/the-shortcut.png",
    "A glowing learning shortcut invites an educator to weigh instant mastery against the value of struggle.",
    "reveal",
    "educator"
  ),
  "ai-authorship": scene(
    "/illustrations/ai-authorship.png",
    "A student, teacher, parent, and administrator weigh authorship and responsibility around one AI-assisted essay.",
    "spotlight",
    "educator"
  ),
  "reluctant-educator": scene(
    "/illustrations/reluctant-educator.png",
    "Two classroom approaches diverge as an educator weighs measurable AI gains against deeper learning.",
    "subtle",
    "educator"
  ),
  "digital-doppelganger": scene(
    "/illustrations/digital-doppelganger.png",
    "An educator confronts a digital student double and wonders who is actually learning.",
    "split",
    "educator"
  ),
};

export function getStageSceneIllustration(experimentOrId, options = {}) {
  const id = typeof experimentOrId === "string" ? experimentOrId : experimentOrId?.id;
  if (!id) return null;
  const set = resolveStageSet(id, options.visualVariant || experimentOrId?.visualVariant);
  const staged = stageScene(set, options.stageId, options.stageIndex);
  if (!staged) return null;
  return {
    motion: staged.motion || set.motion || "subtle",
    tone: staged.tone || set.tone || "story",
    characterNotes: staged.characterNotes || set.characterNotes || "",
    styleNotes: staged.styleNotes || set.styleNotes || "",
    ...staged,
  };
}

export function getSceneIllustration(experimentOrId, options = {}) {
  const id = typeof experimentOrId === "string" ? experimentOrId : experimentOrId?.id;
  if (!id) return null;
  const staged = getStageSceneIllustration(experimentOrId, options);
  if (staged) return staged;
  return SCENE_ILLUSTRATIONS[id] || getExperimentIllustration(id) || getFeatureIllustration(id) || null;
}
