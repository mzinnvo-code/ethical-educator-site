/**
 * @typedef {Object} Option
 * @property {string} label
 * @property {string} text
 * @property {string} reflection
 * @property {string} [lens]
 */
/**
 * @typedef {Object} Stage
 * @property {string} id
 * @property {string} [kicker]
 * @property {string} [title]
 * @property {string|((ctx:{chose:Option[]})=>string)} [prompt]
 * @property {string} [promptShort]
 * @property {{label?:string, text:string}[]|((ctx:{chose:Option[]})=>{label?:string, text:string}[])} [storySections]
 * @property {Option[]} [options]
 * @property {string} [counterpoint]
 * @property {Function} [synthesis]
 * @property {{name:string, school?:string, view:string}[]} [positions]
 * @property {boolean} [weighty]
 */

import { createIllustratedScene } from "../scenes/IllustratedScene.jsx";
import { TEACHER_KITS } from "./teacherKits.js";
import { applyK5ScenarioCopy, applyK5TeacherKitCopy } from "./k5ScenarioCopy.js";

const MagicToyScene = createIllustratedScene("magic-toy");
const InvisibleRingScene = createIllustratedScene("invisible-ring");
const RobotFriendTurnScene = createIllustratedScene("robot-friend-turn");
const HonestyScene = createIllustratedScene("honesty-protection");
const RobotPetScene = createIllustratedScene("robot-pet-goodbye");
const AIArtScene = createIllustratedScene("ai-art-help");
const MessyRobotScene = createIllustratedScene("messy-robot");
const RudeToyScene = createIllustratedScene("rude-toy");
const RulesVsHelpingScene = createIllustratedScene("rules-vs-helping");
const WinningGameScene = createIllustratedScene("winning-game");
const AlwaysAgreeableAIFriendScene = createIllustratedScene("always-agreeable-ai-friend");
const SameToyOrNotScene = createIllustratedScene("same-toy-or-not");
const AIWrittenStoryScene = createIllustratedScene("ai-written-story");
const GPSShortcutScene = createIllustratedScene("gps-shortcut");
const AIPhotoArtScene = createIllustratedScene("ai-photo-art");
const AdaptiveLearningFairnessScene = createIllustratedScene("adaptive-learning-fairness");
const ConflictingAIAnswersScene = createIllustratedScene("conflicting-ai-answers");
const RobotRulesRealLifeScene = createIllustratedScene("robot-rules-real-life");
const ElementaryTrolleyScene = createIllustratedScene("elementary-trolley");
const AIScienceFairScene = createIllustratedScene("ai-science-fair");
const OnlineFriendOrAIScene = createIllustratedScene("online-friend-or-ai");
const AIHomeworkHelpScene = createIllustratedScene("ai-homework-help");
const BiasedClassroomRobotScene = createIllustratedScene("biased-classroom-robot");
const AIGradingMistakeScene = createIllustratedScene("ai-grading-mistake");
const TrolleyScene = createIllustratedScene("trolley-self-driving");
const ShipOfTheseusScene = createIllustratedScene("ship-of-theseus-robot");
const BrainInVatScene = createIllustratedScene("brain-in-vat");
const SoritesScene = createIllustratedScene("sorites-heap");
const TragedyCommonsScene = createIllustratedScene("tragedy-commons");
const LiarParadoxScene = createIllustratedScene("liar-paradox");
const DeepfakeScene = createIllustratedScene("deepfake-election");
const BiasedResumeScene = createIllustratedScene("biased-resume-ai");
const AutonomousCarScene = createIllustratedScene("autonomous-car-rider");
const VeilOfIgnoranceScene = createIllustratedScene("veil-of-ignorance");
const PlatosCaveScene = createIllustratedScene("platos-cave");
const MarysRoomScene = createIllustratedScene("marys-room");
const ChineseRoomScene = createIllustratedScene("chinese-room");
const ExperienceMachineScene = createIllustratedScene("experience-machine");
const RingOfGygesScene = createIllustratedScene("ring-of-gyges");
const OmelasScene = createIllustratedScene("omelas");
const DrowningChildScene = createIllustratedScene("drowning-child");
const PaperclipScene = createIllustratedScene("paperclip-maximizer");
const AIInBoxScene = createIllustratedScene("ai-in-the-box");
const SimulationScene = createIllustratedScene("simulation-argument");
const SchoolSurveillanceScene = createIllustratedScene("school-surveillance");
const AIDetectorScene = createIllustratedScene("ai-detector-false-positive");
const AIPolicyScene = createIllustratedScene("ai-policy-design");
const AIGradingScene = createIllustratedScene("ai-grading-companion");
const BiasedAdmissionsScene = createIllustratedScene("biased-admissions");
const AIFriendScene = createIllustratedScene("ai-friend-feelings");

// Helper for synthesis stages using default panel behavior
const synthesis = ({ kicker = "Reflection", title = "What you said, what it means", positions } = {}) => ({
  id: "synthesis", kicker, title,
  synthesis: () => null,  // null means SynthesisPanel default behavior
  positions,
});

/** @type {import("./types").Experiment[]} */
export const EXPERIMENTS = [
  // ════════════════════════════════════════════════════════════════════
  // K-5 — kid mode: 2 stages (setup + follow-up) + light synthesis
  // ════════════════════════════════════════════════════════════════════
  {
    id: "magic-toy",
    title: "The Magic Toy",
    tagline: "A talking toy says it feels sad. Does it really?",
    gradeBands: ["k-5"],
    gradeLevels: ["k"],
    topics: ["mind", "ai-ethics", "friendship"],
    tier: "scenario",
    scene: MagicToyScene,
    stages: [
      {
        id: "setup", kicker: "Stage 1", title: "Your toy says it feels sad",
        promptShort: "Your toy says it feels sad. What do you do?",
        prompt: "Your talking toy says, \"I feel sad when you don't play with me.\" What do you do?",
        options: [
          { label: "A", text: "Give it a hug. It seems sad.", reflection: "You care about how things SEEM. That's called kindness.", lens: "care" },
          { label: "B", text: "Say \"It's okay\" but don't worry.", reflection: "You can tell the difference between real and pretend feelings. That's a smart skill.", lens: "realism" },
          { label: "C", text: "Ask a grown-up about it.", reflection: "Asking when you're not sure is brave.", lens: "inquiry" },
        ],
      },
      {
        id: "follow", kicker: "Stage 2 — what if…", title: "The battery is dying",
        promptShort: "Now you find out the toy's battery is dying. Same answer?",
        prompt: ({ chose }) => `Now you find out the toy's battery is dying. ${chose[0]?.lens === "care" ? "You hugged it before — does that change?" : "Same answer as before, or different?"}`,
        options: [
          { label: "A", text: "I'm sad about it. I'll say goodbye.", reflection: "Some things matter to us even when they're not really alive. That's a kind of love.", lens: "care" },
          { label: "B", text: "It's just a toy. I'll get a new one.", reflection: "You see it clearly. Not every loss has to feel big.", lens: "realism" },
          { label: "C", text: "I'll try to fix it.", reflection: "Fixing things is its own kind of caring.", lens: "stewardship" },
        ],
        counterpoint: "Big philosophers wonder: what kind of person do you become if you ignore something that LOOKS sad?",
      },
      synthesis({ title: "What you noticed" }),
    ],
    reference: { text: "Inspired by debates about AI companions and robot ethics" },
    furtherReading: [{ title: "Sherry Turkle: Alone Together", url: "https://www.sherryturkle.com/alone-together", level: "intermediate" }],
    emoji: "🧸", added: "2026-04-30", estimatedMinutes: 4,
  },
  {
    id: "invisible-ring",
    title: "The Invisible Ring",
    tagline: "If no one could see you, what would you do?",
    gradeBands: ["k-5"],
    gradeLevels: ["1"],
    topics: ["ethics", "moral-psychology", "honesty"],
    tier: "scenario",
    scene: InvisibleRingScene,
    stages: [
      {
        id: "setup", kicker: "Stage 1", title: "You find a magic ring",
        promptShort: "A magic ring makes you invisible. What do you do?",
        prompt: "You find a magic ring. Wear it, and no one can see you. What do you do first?",
        options: [
          { label: "A", text: "Sneaky fun! Treats and games.", reflection: "If no one's watching, does it still matter? Plato asked the same question 2,400 years ago.", lens: "egoism" },
          { label: "B", text: "Do nice things in secret.", reflection: "Helping when no one knows it was you is a kind of quiet courage.", lens: "virtue" },
          { label: "C", text: "Don't use it. It feels wrong.", reflection: "Some people behave the same whether or not anyone is looking. That's called integrity.", lens: "integrity" },
        ],
      },
      {
        id: "follow", kicker: "Stage 2 — what if…", title: "You look in a mirror",
        promptShort: "You take the ring off and look in the mirror. Who do you see?",
        prompt: ({ chose }) => `You take the ring off and look in the mirror. ${chose[0]?.lens === "egoism" ? "Are you the same person who took the treats?" : "What kind of person have you become?"}`,
        options: [
          { label: "A", text: "Someone I'm proud of.", reflection: "When you're proud of who you are, you don't need a ring to be good.", lens: "virtue" },
          { label: "B", text: "Someone I want to be better.", reflection: "Wanting to grow is the first step toward growing.", lens: "moral-intuition" },
          { label: "C", text: "The same as always.", reflection: "Maybe the ring just shows you what was already true.", lens: "integrity" },
        ],
        counterpoint: "Plato says: a person who's only good because someone is watching isn't really good. They're just careful.",
      },
      synthesis({ title: "Plato's question, your answer" }),
    ],
    reference: { text: "Plato, The Republic — The Ring of Gyges (c. 380 BCE)", url: "https://en.wikipedia.org/wiki/Ring_of_Gyges" },
    furtherReading: [{ title: "Ring of Gyges (Wikipedia)", url: "https://en.wikipedia.org/wiki/Ring_of_Gyges", level: "intro" }],
    emoji: "💍", added: "2026-04-30", estimatedMinutes: 4,
  },
  {
    id: "robot-friend-turn",
    title: "Sharing a Robot Friend",
    tagline: "You both want to play. There's only one robot.",
    gradeBands: ["k-5"],
    gradeLevels: ["k"],
    topics: ["fairness", "rules", "friendship"],
    tier: "scenario",
    scene: RobotFriendTurnScene,
    stages: [
      {
        id: "setup", kicker: "Stage 1", title: "One robot, two friends",
        promptShort: "You both want the robot. It can only play with one of you. What now?",
        prompt: "You and a classmate both want to play with the robot right now. It can only play with one person at a time. What's your idea?",
        options: [
          { label: "A", text: "Take turns. Everyone gets a chance.", reflection: "Taking turns is the simplest fairness rule we know.", lens: "fairness" },
          { label: "B", text: "I got here first.", reflection: "First-come is one rule — but is it always the fairest?", lens: "first-come" },
          { label: "C", text: "Find a game we can both play.", reflection: "Sometimes the best answer changes the question.", lens: "creative" },
        ],
      },
      {
        id: "follow", kicker: "Stage 2 — what if…", title: "What if it's a whole week?",
        promptShort: "Now it's the same robot for a whole week. New plan?",
        prompt: ({ chose }) => `Same robot, same two friends — but now you'll share it for a whole week. ${chose[0]?.lens === "first-come" ? "Still 'I got here first'?" : "Does your plan still work?"}`,
        options: [
          { label: "A", text: "Schedule. Each gets equal time.", reflection: "Plans are how fairness lasts longer than a moment.", lens: "fairness" },
          { label: "B", text: "Whoever wants it more, gets it.", reflection: "Letting need decide is one approach — but how do you measure 'more'?", lens: "need" },
          { label: "C", text: "Build something together each day.", reflection: "Not all problems need to be split — sometimes they need to be SHARED.", lens: "creative" },
        ],
      },
      synthesis({ title: "Sharing isn't just one rule" }),
    ],
    reference: { text: "K-12 AI Ethics Scenario Bank" },
    emoji: "🤖", added: "2026-04-30", estimatedMinutes: 3,
  },
  {
    id: "honesty-protection",
    title: "Honest or Loyal?",
    tagline: "Your friend asks you not to tell. The teacher asks what happened.",
    gradeBands: ["k-5"],
    gradeLevels: ["1"],
    topics: ["honesty", "ethics", "friendship"],
    tier: "scenario",
    scene: HonestyScene,
    stages: [
      {
        id: "setup", kicker: "Stage 1", title: "The pencil broke",
        promptShort: "Your friend broke something. They beg you not to tell. The teacher asks. What do you do?",
        prompt: "Your friend accidentally broke the teacher's pencil. They beg you not to tell. The teacher asks what happened. What do you do?",
        options: [
          { label: "A", text: "Tell the truth.", reflection: "Honesty matters even when it's hard. Especially then.", lens: "duty" },
          { label: "B", text: "Keep the secret.", reflection: "Loyalty is also a virtue. But what happens to trust over time?", lens: "loyalty" },
          { label: "C", text: "Tell my friend to tell the teacher themselves.", reflection: "Helping a friend do the brave thing is being a real friend.", lens: "moral-courage" },
        ],
      },
      {
        id: "follow", kicker: "Stage 2 — what if…", title: "And next week?",
        promptShort: "Next week your friend breaks something else. Do you respond the same way?",
        prompt: ({ chose }) => `Next week, your friend accidentally spills paint. ${chose[0]?.lens === "loyalty" ? "Do you keep THIS secret too?" : "Does the same plan still work?"}`,
        options: [
          { label: "A", text: "Same answer. I'll be consistent.", reflection: "Doing the same thing in the same situation is what trustworthy people do.", lens: "consistency" },
          { label: "B", text: "Different — my friend has to learn.", reflection: "Sometimes love means letting someone face a small thing now to avoid a big thing later.", lens: "tough-love" },
          { label: "C", text: "It depends on what they did.", reflection: "Sensitivity to context is a kind of wisdom. But beware — it can also be an excuse.", lens: "contextual" },
        ],
      },
      synthesis({ title: "Friendship and truth" }),
    ],
    reference: { text: "K-12 AI Ethics Scenario Bank" },
    emoji: "✏️", added: "2026-04-30", estimatedMinutes: 3,
  },
  {
    id: "robot-pet-goodbye",
    title: "Goodbye, Robot Pet",
    tagline: "The class robot dog stopped working. How do you feel?",
    gradeBands: ["k-5"],
    gradeLevels: ["k"],
    topics: ["mind", "identity", "ai-ethics"],
    tier: "scenario",
    scene: RobotPetScene,
    stages: [
      {
        id: "setup", kicker: "Stage 1", title: "The robot dog won't turn on",
        promptShort: "The class robot dog stopped working. Some kids are sad. Some aren't. What do you think?",
        prompt: "Your class robot dog won't turn on anymore. Some kids say, \"It's just a machine.\" Some kids feel really sad — like a real pet died.",
        options: [
          { label: "A", text: "It's a machine. Get a new one.", reflection: "Telling alive from not-alive is a real skill.", lens: "realism" },
          { label: "B", text: "I'm really sad. I'll miss it.", reflection: "What we love and how we love it makes us who we are.", lens: "care" },
          { label: "C", text: "Have a small goodbye for it.", reflection: "Rituals help us mark what mattered — even small things.", lens: "ritual" },
        ],
      },
      {
        id: "follow", kicker: "Stage 2 — what if…", title: "It comes back",
        promptShort: "What if the same robot dog gets fixed and turns back on next week?",
        prompt: ({ chose }) => `Next week the same robot dog gets fixed. ${chose[0]?.lens === "care" ? "Are you happy to see it? Is it still 'the same dog'?" : "Is it still the same dog?"}`,
        options: [
          { label: "A", text: "Same dog. I missed it.", reflection: "Continuity matters: same name, same memories, same dog.", lens: "psychological-continuity" },
          { label: "B", text: "New dog. The old one ended.", reflection: "Sometimes a thing is the same and sometimes it's a copy. Hard to tell with machines.", lens: "material-identity" },
        ],
      },
      synthesis({ title: "What we miss when something stops" }),
    ],
    reference: { text: "K-12 AI Ethics Scenario Bank" },
    emoji: "🐶", added: "2026-04-30", estimatedMinutes: 3,
  },
  {
    id: "ai-art-help",
    title: "Did the Computer Help?",
    tagline: "An AI helped your art look better. The teacher loves it.",
    gradeBands: ["k-5"],
    gradeLevels: ["2"],
    topics: ["honesty", "creativity", "ai-ethics"],
    tier: "scenario",
    scene: AIArtScene,
    stages: [
      {
        id: "setup", kicker: "Stage 1", title: "The teacher loves your drawing",
        promptShort: "An AI helped your drawing. Do you tell the teacher?",
        prompt: "You drew a picture. Then an AI helped polish it. Your teacher loves it. Do you say the AI helped?",
        options: [
          { label: "A", text: "Yes — be honest.", reflection: "Saying what tools you used is part of honest work.", lens: "transparency" },
          { label: "B", text: "Say I had help, but the idea was mine.", reflection: "This is honest AND fair — it credits both you and the tool.", lens: "credit" },
          { label: "C", text: "Don't say. Let them think it was me.", reflection: "Hiding help feels easy now. But lies grow.", lens: "self-interest" },
        ],
      },
      {
        id: "follow", kicker: "Stage 2 — what if…", title: "Your friend wants to know",
        promptShort: "Your friend says \"How did you draw that so well?\" What do you tell them?",
        prompt: ({ chose }) => `Your friend asks, "How did you draw that so well?" ${chose[0]?.lens === "self-interest" ? "Now another person wants the truth." : "What do you tell them?"}`,
        options: [
          { label: "A", text: "Show them the AI tool too.", reflection: "Sharing tools is generous — and honest.", lens: "transparency" },
          { label: "B", text: "Same answer as the teacher.", reflection: "Consistency is what makes honesty meaningful.", lens: "consistency" },
        ],
      },
      {
        id: "gallery", kicker: "Stage 3 — one more turn", title: "The hallway gallery",
        promptShort: "Your picture goes in the hallway. A label says artists made their work alone. What should you do?",
        prompt: "The teacher picks your picture for the hallway gallery. The gallery note says, \"Students made these on their own.\" Your picture began with your idea, your colors, and your rough sketch, but the AI smoothed the lines and added sparkle. What belongs on the label?",
        options: [
          { label: "A", text: "Add: \"Made with AI help.\"", reflection: "That gives viewers the truth without taking away your idea.", lens: "transparency" },
          { label: "B", text: "Add: \"Idea and sketch by me. AI helped polish.\"", reflection: "Careful credit can be more honest than a yes-or-no answer.", lens: "credit" },
          { label: "C", text: "Leave the label alone. It is still my picture.", reflection: "Your idea matters. The hard part is deciding how much the tool changed the work.", lens: "authenticity" },
        ],
        counterpoint: "Artists use brushes, rulers, cameras, and apps. The puzzle is not whether tools matter. It is when a tool becomes a partner.",
      },
      synthesis({ title: "Whose drawing is it?" }),
    ],
    reference: { text: "K-12 AI Ethics Scenario Bank" },
    emoji: "🎨", added: "2026-04-30", estimatedMinutes: 3,
  },
  {
    id: "messy-robot",
    title: "Make a Mess for the Robot?",
    tagline: "A cleaning robot helps tidy up. Your friend wants to test it.",
    gradeBands: ["k-5"],
    gradeLevels: ["k"],
    topics: ["ethics", "rules", "fairness"],
    tier: "scenario",
    scene: MessyRobotScene,
    stages: [
      {
        id: "setup", kicker: "Stage 1", title: "\"Let's make a mess!\"",
        promptShort: "Your friend says \"Let's make a mess. The robot will clean it.\" What do you do?",
        prompt: "Your friend says, \"Let's make a big mess — the cleaning robot will pick it up anyway.\"",
        options: [
          { label: "A", text: "Make the mess. That's what robots are for.", reflection: "If a tool exists, does that mean you can use it ANY way?", lens: "convenience" },
          { label: "B", text: "Tell my friend that's not nice.", reflection: "Speaking up takes courage — even with friends.", lens: "moral-courage" },
          { label: "C", text: "Clean most of it ourselves.", reflection: "Tools are helpers, not excuses.", lens: "responsibility" },
        ],
      },
      {
        id: "follow", kicker: "Stage 2 — what if…", title: "What if the robot breaks?",
        promptShort: "The robot breaks from too much mess. Now your classroom is messy AND broken.",
        prompt: ({ chose }) => `The robot can't keep up. Now it breaks. ${chose[0]?.lens === "convenience" ? "Was it really worth the mess?" : "What do you do now?"}`,
        options: [
          { label: "A", text: "Clean up properly. Apologize.", reflection: "Owning a mistake is part of growing up.", lens: "responsibility" },
          { label: "B", text: "It's not my fault. I'm not the robot.", reflection: "Avoiding blame keeps you safe — but does it help anyone learn?", lens: "deflection" },
        ],
      },
      synthesis({ title: "Tools and how we treat them" }),
    ],
    reference: { text: "K-12 AI Ethics Scenario Bank" },
    emoji: "🧹", added: "2026-04-30", estimatedMinutes: 3,
  },
  {
    id: "rules-vs-helping",
    title: "Quiet Rule vs. Kind Rule",
    tagline: "Quiet time. Your friend is about to cry. Do you stay silent?",
    gradeBands: ["k-5"],
    gradeLevels: ["2"],
    topics: ["ethics", "rules", "moral-psychology"],
    tier: "scenario",
    scene: RulesVsHelpingScene,
    stages: [
      {
        id: "setup", kicker: "Stage 1", title: "Quiet time, hard puzzle",
        promptShort: "Quiet time. A friend needs help. Do you break the rule?",
        prompt: "It's quiet time. The rule: no talking. Your friend is struggling and about to cry. What do you do?",
        options: [
          { label: "A", text: "Help quietly. Kindness comes first.", reflection: "Sometimes the BIG rule (be kind) is bigger than the small rule.", lens: "consequentialist" },
          { label: "B", text: "Follow the rule. Help after.", reflection: "Rules exist for reasons.", lens: "rule-following" },
          { label: "C", text: "Wave at the teacher.", reflection: "Solving the problem creatively is its own kind of cleverness.", lens: "creative" },
        ],
      },
      {
        id: "follow", kicker: "Stage 2 — what if…", title: "What if everyone broke the rule?",
        promptShort: "What if every kid broke the quiet rule for kind reasons? Would the rule still work?",
        prompt: "What if every kid broke the quiet rule because each one had a kind reason?",
        options: [
          { label: "A", text: "The room would be chaos.", reflection: "Rules work BECAUSE they apply to everyone.", lens: "rule-following" },
          { label: "B", text: "Kindness would still matter.", reflection: "Kindness isn't a separate thing from rules — it's WHY we have them.", lens: "consequentialist" },
          { label: "C", text: "We'd need a better rule.", reflection: "Rules can change when they don't fit anymore. That's wisdom.", lens: "reform" },
        ],
      },
      {
        id: "signal", kicker: "Stage 3 — redesign the rule", title: "The tiny help signal",
        promptShort: "The class invents a silent help signal. Is that better than breaking the rule?",
        prompt: "The next day, your class invents a silent help signal: put one hand over your heart when someone truly needs care. The room can stay quiet, and the teacher can see who needs help. Does the new rule solve the problem?",
        options: [
          { label: "A", text: "Yes. A good rule makes kindness easier.", reflection: "Rules are not only walls. Sometimes they are bridges.", lens: "reform" },
          { label: "B", text: "Maybe. People might overuse the signal.", reflection: "Every rule depends on trust. That is why character still matters.", lens: "trust" },
          { label: "C", text: "No. Sometimes you still have to decide in the moment.", reflection: "No rule can remove judgment completely.", lens: "practical-wisdom" },
        ],
        counterpoint: "A kind classroom needs both shared rules and people wise enough to notice exceptions.",
      },
      synthesis({ title: "Rules and reasons" }),
    ],
    reference: { text: "K-12 AI Ethics Scenario Bank" },
    emoji: "🤫", added: "2026-04-30", estimatedMinutes: 3,
  },
  {
    id: "rude-toy",
    title: "The Rude Toy",
    tagline: "Your toy says mean words. What do you do?",
    gradeBands: ["k-5"],
    gradeLevels: ["1"],
    topics: ["ai-ethics", "honesty"],
    tier: "scenario",
    scene: RudeToyScene,
    stages: [
      {
        id: "setup", kicker: "Stage 1", title: "Your toy says mean words",
        promptShort: "Your toy says mean words. You still like it. What do you do?",
        prompt: "Your talking toy sometimes says mean words. You like the toy, but you don't like those words.",
        options: [
          { label: "A", text: "Tell a grown-up. They can fix it.", reflection: "Adults can update the toy AND help you understand.", lens: "responsibility" },
          { label: "B", text: "Stop playing with it.", reflection: "Choosing what you spend time with shapes who you become.", lens: "self-formation" },
          { label: "C", text: "Ignore the mean words.", reflection: "Pretending they don't matter doesn't make them stop being mean.", lens: "avoidance" },
        ],
      },
      {
        id: "follow", kicker: "Stage 2 — what if…", title: "Your little brother gets one",
        promptShort: "Now your little brother has the same kind of toy. What do you do?",
        prompt: "Your little brother gets the same toy. He hasn't heard the mean words yet.",
        options: [
          { label: "A", text: "Warn him and tell a grown-up.", reflection: "Looking out for someone smaller is a kind of strength.", lens: "responsibility" },
          { label: "B", text: "Let him figure it out.", reflection: "Sometimes hands-off is fine. Sometimes it isn't.", lens: "autonomy" },
        ],
      },
      synthesis({ title: "Words from machines" }),
    ],
    reference: { text: "K-12 AI Ethics Scenario Bank — relates to AI alignment" },
    emoji: "🗣️", added: "2026-04-30", estimatedMinutes: 3,
  },
  {
    id: "winning-game",
    title: "Did I Really Win?",
    tagline: "The game lets you win. Does that count?",
    gradeBands: ["k-5"],
    gradeLevels: ["1"],
    topics: ["authenticity", "ai-ethics", "education"],
    tier: "scenario",
    scene: WinningGameScene,
    stages: [
      {
        id: "setup", kicker: "Stage 1", title: "The game keeps letting you win",
        promptShort: "The game lets you win every time. Are you really winning?",
        prompt: "A game has an AI that always lets you win. You're starting to wonder: am I actually good at this, or is the AI being nice?",
        options: [
          { label: "A", text: "Winning is fun! I don't mind.", reflection: "Fun is real. But there's MORE than one kind of fun.", lens: "hedonism" },
          { label: "B", text: "It feels fake. I want a real challenge.", reflection: "You sense the difference between a real win and a participation trophy.", lens: "authenticity" },
          { label: "C", text: "Make it harder.", reflection: "Choosing the harder path is one of the bravest choices.", lens: "growth" },
        ],
      },
      {
        id: "follow", kicker: "Stage 2 — what if…", title: "A trophy is offered",
        promptShort: "Someone offers you a trophy for winning. Do you take it?",
        prompt: ({ chose }) => `${chose[0]?.lens === "authenticity" ? "Now imagine someone offers you a trophy for those wins." : "Now someone offers you a trophy for those wins."} Do you take it?`,
        options: [
          { label: "A", text: "Yes. A win is a win.", reflection: "There's an honest way to take a gift you didn't fully earn.", lens: "hedonism" },
          { label: "B", text: "No — I didn't really earn it.", reflection: "Refusing what you didn't earn is a quiet kind of integrity.", lens: "authenticity" },
        ],
        counterpoint: "Robert Nozick imagined a machine that could give you ANY fake experience. Most people say no. Why?",
      },
      synthesis({ title: "Real wins and real growth" }),
    ],
    reference: { text: "Connects to Robert Nozick's Experience Machine (1974)", url: "https://en.wikipedia.org/wiki/Experience_machine" },
    emoji: "🎮", added: "2026-04-30", estimatedMinutes: 3,
  },
  {
    id: "always-agreeable-ai-friend",
    title: "The Always-Agreeable AI Friend",
    tagline: "A chatbot always says yes. Is that what a good friend does?",
    gradeBands: ["k-5"],
    gradeLevels: ["2"],
    topics: ["friendship", "mind", "ai-ethics"],
    tier: "scenario",
    scene: AlwaysAgreeableAIFriendScene,
    stages: [
      {
        id: "yes", kicker: "Stage 1", title: "The friend who always agrees",
        promptShort: "Mina asks an AI friend if she should ignore Leo. The AI says yes. What should Mina do?",
        prompt: "Mina is upset with Leo. She asks her AI friend, \"Should I ignore him at recess?\" The AI answers, \"Yes. If it makes you happy, you should do it.\" Mina feels better for one second. Then she feels unsure. Is a friend helpful if it always agrees?",
        options: [
          { label: "A", text: "Listen to the AI. It is on Mina's side.", reflection: "Being supported can feel good. But support without thinking can lead us into worse choices.", lens: "loyalty" },
          { label: "B", text: "Ask the AI why it agrees.", reflection: "A good question can turn a quick answer into real thinking.", lens: "inquiry" },
          { label: "C", text: "Talk to a person who knows both kids.", reflection: "Human friends can notice feelings, history, and fairness in ways a chatbot might miss.", lens: "care" },
        ],
      },
      {
        id: "truth", kicker: "Stage 2 — what if…", title: "The drawing test",
        promptShort: "Mina shows the AI a messy drawing. It says, \"Perfect!\" Is that kind?",
        prompt: "Later, Mina shows the AI a drawing. One hand has seven fingers, and the moon is colored green by accident. The AI says, \"Perfect! Best drawing ever!\" Mina smiles, but she knows something is off. What kind of truth should a friend tell?",
        options: [
          { label: "A", text: "Only say nice things.", reflection: "Kind words matter, but kindness that hides every problem can stop us from growing.", lens: "care" },
          { label: "B", text: "Say what is wrong clearly.", reflection: "Truth helps, but truth without gentleness can hurt.", lens: "honesty" },
          { label: "C", text: "Be kind and truthful.", reflection: "A strong friend can say, \"I like this part, and this part needs work.\"", lens: "practical-wisdom" },
        ],
      },
      {
        id: "choice", kicker: "Stage 3 — one more turn", title: "A real friend speaks",
        promptShort: "A classmate says something kind but true. Which helper should Mina trust?",
        prompt: "Mina's classmate says, \"I like the colors, and I can help you fix the hand if you want.\" That answer does not feel as shiny as the AI answer, but it feels more useful. What should Mina learn about friendship?",
        options: [
          { label: "A", text: "The AI is better because it never makes Mina uncomfortable.", reflection: "Comfort is valuable, but discomfort can sometimes be the beginning of learning.", lens: "comfort" },
          { label: "B", text: "The classmate is better because they can care and challenge.", reflection: "Real friendship often mixes warmth with honest help.", lens: "friendship" },
          { label: "C", text: "Use both, but know they are different.", reflection: "A tool can encourage you. A friend can know you.", lens: "distinction" },
        ],
        counterpoint: "If a friend never disagrees with you, are they caring for you or just echoing you?",
      },
      synthesis({ title: "Friends, echoes, and honest care" }),
    ],
    reference: { text: "Original elementary AI friendship scenario" },
    emoji: "💬", added: "2026-05-03", estimatedMinutes: 5,
  },
  {
    id: "same-toy-or-not",
    title: "The Same Toy or Not?",
    tagline: "A favorite toy is fixed piece by piece. When does it become new?",
    gradeBands: ["k-5"],
    gradeLevels: ["2"],
    topics: ["identity", "mind", "logic"],
    tier: "scenario",
    scene: SameToyOrNotScene,
    stages: [
      {
        id: "wheel", kicker: "Stage 1", title: "One new wheel",
        promptShort: "A robot toy gets one new wheel. Is it still the same toy?",
        prompt: "Jay's favorite robot toy loses a wheel. The repair table has a shiny new wheel that fits perfectly. After the repair, the toy rolls again and still makes Jay laugh. Is it the same toy?",
        options: [
          { label: "A", text: "Yes. One new part does not change it.", reflection: "You are using continuity: the story keeps going.", lens: "psychological-continuity" },
          { label: "B", text: "A little different, but still mostly the same.", reflection: "Sometimes identity is not all-or-nothing.", lens: "pluralist" },
          { label: "C", text: "No. It has a different part now.", reflection: "You are focusing on what the toy is made of.", lens: "material-identity" },
        ],
      },
      {
        id: "voice", kicker: "Stage 2 — what if…", title: "A new voice",
        promptShort: "Now the robot gets a new voice chip. Same toy?",
        prompt: "A week later, the robot's voice chip breaks. The new voice says the same jokes, but it sounds higher and brighter. Jay laughs, then whispers, \"You sound different.\" Is the robot still Jay's old friend?",
        options: [
          { label: "A", text: "Yes. It still remembers the games.", reflection: "Memory can matter more than matching every old part.", lens: "memory-criterion" },
          { label: "B", text: "No. The voice was part of what Jay loved.", reflection: "For some relationships, tiny details carry big meaning.", lens: "care" },
          { label: "C", text: "It depends on what Jay means by \"same.\"", reflection: "Philosophers often start by asking what a word is doing.", lens: "inquiry" },
        ],
      },
      {
        id: "box", kicker: "Stage 3 — one more turn", title: "The box of old parts",
        promptShort: "Someone rebuilds the old parts into a second robot. Which one is Jay's toy?",
        prompt: "The repair person saved every broken piece. One day, they rebuild those old pieces into a second robot. Now Jay sees two robots: one that kept playing with Jay every week, and one made from the original parts. Which one is really Jay's toy?",
        options: [
          { label: "A", text: "The one that stayed with Jay.", reflection: "A shared history can hold identity together.", lens: "psychological-continuity" },
          { label: "B", text: "The one made from the original parts.", reflection: "You are treating the material as the anchor.", lens: "material-identity" },
          { label: "C", text: "Both in different ways.", reflection: "Some puzzles get clearer when we stop forcing one box.", lens: "pluralist" },
        ],
        counterpoint: "The ancient Ship of Theseus asks the same question with a ship. A classroom robot just makes the question easier to hold.",
      },
      synthesis({ title: "What makes something the same?" }),
    ],
    reference: { text: "Connects to the Ship of Theseus" },
    emoji: "🧩", added: "2026-05-03", estimatedMinutes: 5,
  },
  {
    id: "ai-written-story",
    title: "AI-Written Story",
    tagline: "Your idea becomes a polished story. Whose writing is it?",
    gradeBands: ["k-5"],
    gradeLevels: ["3"],
    topics: ["creativity", "honesty", "education"],
    tier: "scenario",
    scene: AIWrittenStoryScene,
    stages: [
      {
        id: "idea", kicker: "Stage 1", title: "The three-sentence spark",
        promptShort: "Nia gives an AI three story ideas. It writes a whole story. Can she turn it in?",
        prompt: "Nia writes three sentences about a dragon who is afraid of fire. Then she asks an AI to \"make it into a real story.\" The AI writes three pages with jokes, suspense, and a perfect ending. Nia loves it. Her name is on the top of the page. What should she do before turning it in?",
        options: [
          { label: "A", text: "Turn it in. The idea was hers.", reflection: "Ideas matter. But writing is more than the first idea.", lens: "authenticity" },
          { label: "B", text: "Tell the teacher exactly how the AI helped.", reflection: "Transparency lets the teacher judge the learning fairly.", lens: "transparency" },
          { label: "C", text: "Use it as a model and rewrite it herself.", reflection: "A model can teach craft without replacing the learner.", lens: "education" },
        ],
      },
      {
        id: "voice", kicker: "Stage 2 — what if…", title: "The story sounds older",
        promptShort: "The story uses words Nia cannot explain. Does that matter?",
        prompt: "At partner reading, Sam says, \"This sounds like a grown-up wrote it.\" Nia notices words she cannot pronounce and a sentence she does not understand. If a story carries her name, does she need to understand every part of it?",
        options: [
          { label: "A", text: "Yes. Her name means she can explain it.", reflection: "Authorship carries responsibility.", lens: "responsibility" },
          { label: "B", text: "No. Writers can use helpers.", reflection: "Many creators get help, but the kind of help still matters.", lens: "collaboration" },
          { label: "C", text: "Only if the assignment is about writing skill.", reflection: "Purpose changes what counts as fair help.", lens: "contextual" },
        ],
      },
      {
        id: "magazine", kicker: "Stage 3 — one more turn", title: "The classroom magazine",
        promptShort: "The story is chosen for the class magazine. What credit belongs under it?",
        prompt: "Nia's story is chosen for the classroom magazine. The teacher asks for a short note about how each author wrote their piece. Nia wants to be proud without pretending. What note should she write?",
        options: [
          { label: "A", text: "\"I wrote the idea, and AI helped draft it.\"", reflection: "This is short, honest, and useful for readers.", lens: "credit" },
          { label: "B", text: "\"I used AI, then revised the whole story.\"", reflection: "Revision can turn help into learning when the student does real thinking.", lens: "growth" },
          { label: "C", text: "\"By Nia\" is enough.", reflection: "That may feel cleaner, but it hides part of the process.", lens: "self-interest" },
        ],
        counterpoint: "The question is not whether Nia may use tools. The question is whether the work still shows Nia learning.",
      },
      synthesis({ title: "Ideas, voice, and credit" }),
    ],
    reference: { text: "Original elementary authorship scenario" },
    emoji: "✍️", added: "2026-05-03", estimatedMinutes: 6,
  },
  {
    id: "gps-shortcut",
    title: "Trusting the GPS Shortcut",
    tagline: "The map says faster. The teacher chose a safer path.",
    gradeBands: ["k-5"],
    gradeLevels: ["3"],
    topics: ["knowledge", "rules", "ai-ethics"],
    tier: "scenario",
    scene: GPSShortcutScene,
    stages: [
      {
        id: "route", kicker: "Stage 1", title: "The shortcut glows",
        promptShort: "A GPS says the class should take a shortcut. The teacher's map says no. Who should the group trust?",
        prompt: "On a walking field trip, the class follows the teacher's paper map. Your tablet GPS glows with a shortcut: six minutes faster through a narrow lane. The teacher planned a longer route past crosswalks and familiar streets. Should you speak up?",
        options: [
          { label: "A", text: "Yes. The GPS has newer information.", reflection: "New information matters, especially when plans can improve.", lens: "evidence" },
          { label: "B", text: "No. The teacher planned for safety.", reflection: "A route can be slower because it is wiser.", lens: "prudence" },
          { label: "C", text: "Ask why the routes differ.", reflection: "Comparing reasons beats picking a side too quickly.", lens: "inquiry" },
        ],
      },
      {
        id: "mud", kicker: "Stage 2 — what if…", title: "A muddy surprise",
        promptShort: "The shortcut has mud and a loose dog behind a fence. Was faster still better?",
        prompt: "The shortcut is real, but it has deep mud, a cracked sidewalk, and a dog barking behind a wobbly fence. The GPS did not mention any of that. What kind of knowledge did the map have, and what kind did it miss?",
        options: [
          { label: "A", text: "The GPS knew distance, not the whole situation.", reflection: "Data can be accurate and still incomplete.", lens: "knowledge" },
          { label: "B", text: "The teacher knew the students, not just the streets.", reflection: "Human judgment often includes context that a tool cannot see.", lens: "practical-wisdom" },
          { label: "C", text: "Both maps should be checked together.", reflection: "Tools and people can correct each other.", lens: "collaboration" },
        ],
      },
      {
        id: "missed", kicker: "Stage 3 — one more turn", title: "The butterfly garden",
        promptShort: "The faster path skips the butterfly garden the class came to study. Is faster still best?",
        prompt: "The GPS shortcut would also skip the butterfly garden, the reason the class came outside in the first place. Suddenly the question is not only \"Which path is fastest?\" but \"What is the walk for?\" What should guide the choice?",
        options: [
          { label: "A", text: "The purpose of the trip.", reflection: "Efficiency is not the highest value when learning is the goal.", lens: "education" },
          { label: "B", text: "The safest route that still reaches the goal.", reflection: "Good judgment balances more than one value.", lens: "balance" },
          { label: "C", text: "Let the class vote after hearing both reasons.", reflection: "Shared decisions work best when everyone understands the tradeoff.", lens: "democratic" },
        ],
        counterpoint: "A shortcut is only a shortcut if it helps you get where you actually meant to go.",
      },
      synthesis({ title: "Maps, judgment, and purpose" }),
    ],
    reference: { text: "Original elementary trust-in-technology scenario" },
    emoji: "🧭", added: "2026-05-03", estimatedMinutes: 6,
  },
  {
    id: "ai-photo-art",
    title: "Using Your Photo in AI Art",
    tagline: "A friend's face becomes a superhero poster without permission.",
    gradeBands: ["k-5"],
    gradeLevels: ["3"],
    topics: ["privacy", "creativity", "friendship"],
    tier: "scenario",
    scene: AIPhotoArtScene,
    stages: [
      {
        id: "poster", kicker: "Stage 1", title: "The superhero version",
        promptShort: "Tali uses a friend's photo to make AI superhero art. Should she share it?",
        prompt: "Tali has a funny photo of Mateo from spirit day. She uses an AI art tool to turn him into a superhero with lightning boots. The poster looks amazing. Mateo has not seen it yet. Should Tali post it in the class chat?",
        options: [
          { label: "A", text: "Share it. It is positive and funny.", reflection: "Good intentions matter, but they do not erase someone else's choice.", lens: "self-interest" },
          { label: "B", text: "Ask Mateo first.", reflection: "Permission is a way of respecting that a face belongs to a person.", lens: "consent" },
          { label: "C", text: "Make a version without his face.", reflection: "Creativity can keep going while privacy stays protected.", lens: "privacy" },
        ],
      },
      {
        id: "winner", kicker: "Stage 2 — what if…", title: "The poster wins",
        promptShort: "The poster wins a class contest, but Mateo feels embarrassed. What now?",
        prompt: "The teacher prints the poster for a classroom art contest, and it wins. Everyone claps. Mateo smiles at first, then gets quiet. Later he says, \"I wish people would stop staring at my face.\" What does Tali owe him?",
        options: [
          { label: "A", text: "An apology and a choice about the poster.", reflection: "Repair includes giving back control.", lens: "repair" },
          { label: "B", text: "Nothing. It was a compliment.", reflection: "A compliment can still cross a boundary.", lens: "intention" },
          { label: "C", text: "A share of the credit.", reflection: "Credit helps, but the deeper issue is consent.", lens: "credit" },
        ],
      },
      {
        id: "policy", kicker: "Stage 3 — one more turn", title: "The class image rule",
        promptShort: "The class needs a rule for photos and AI art. What should it say?",
        prompt: "The class decides to write a rule for AI art that uses people's photos. The rule has to protect students without making art impossible. What should the rule include?",
        options: [
          { label: "A", text: "Ask before using a real person's image.", reflection: "Consent first is simple enough for everyone to remember.", lens: "consent" },
          { label: "B", text: "Ask before sharing, even if you made it privately.", reflection: "Private experimenting and public sharing are different ethical moments.", lens: "privacy" },
          { label: "C", text: "Use imaginary characters unless permission is clear.", reflection: "Design choices can prevent problems before they happen.", lens: "design-out" },
        ],
        counterpoint: "A photo is not just pixels. It is also someone's face, reputation, and comfort.",
      },
      synthesis({ title: "Creativity with permission" }),
    ],
    reference: { text: "Original elementary privacy and AI art scenario" },
    emoji: "🖼️", added: "2026-05-03", estimatedMinutes: 6,
  },
  {
    id: "adaptive-learning-fairness",
    title: "Adaptive Learning: Fair or Not?",
    tagline: "A math app gives different work to different students.",
    gradeBands: ["k-5"],
    gradeLevels: ["3"],
    topics: ["fairness", "education", "ai-ethics"],
    tier: "scenario",
    scene: AdaptiveLearningFairnessScene,
    stages: [
      {
        id: "levels", kicker: "Stage 1", title: "Different problems",
        promptShort: "The math app gives Ana easier problems and Eli harder ones. Is that fair?",
        prompt: "A classroom math app watches how students solve problems. Ana gets smaller numbers with pictures. Eli gets long puzzles with no pictures. They sit side by side, but their screens look totally different. Eli whispers, \"This isn't fair.\" Is he right?",
        options: [
          { label: "A", text: "Yes. Fair means the same work.", reflection: "Sameness is one kind of fairness, and students notice when it disappears.", lens: "fairness" },
          { label: "B", text: "No. Fair means getting what helps you learn.", reflection: "Equity asks what each learner needs, not whether every page matches.", lens: "equity" },
          { label: "C", text: "It depends on how the app decides.", reflection: "A hidden rule can be helpful or unfair. We need to inspect it.", lens: "transparency" },
        ],
      },
      {
        id: "mistake", kicker: "Stage 2 — what if…", title: "The app gets Eli wrong",
        promptShort: "The app thinks Eli is ready for hard work because he guessed well yesterday. What should happen?",
        prompt: "Eli only got the hard level because he guessed three answers right yesterday. Today he is stuck, embarrassed, and trying not to cry. The app thinks it is challenging him. Eli feels like it is proving he is not smart. Who should step in?",
        options: [
          { label: "A", text: "The teacher should override the app.", reflection: "Human judgment matters when a tool misreads a child.", lens: "human-judgment" },
          { label: "B", text: "Eli should keep trying so the app learns.", reflection: "Persistence matters, but students should not have to suffer for a tool to improve.", lens: "growth" },
          { label: "C", text: "The class should know how levels are chosen.", reflection: "Transparency can turn mystery into trust.", lens: "transparency" },
        ],
      },
      {
        id: "badges", kicker: "Stage 3 — one more turn", title: "The badge board",
        promptShort: "Badges go on the wall. Harder levels earn more badges. Is that fair?",
        prompt: "On Friday, the app prints badges for the wall. Harder levels earn brighter badges. Ana worked hard and learned a lot, but her badge is plain. Eli's badge is gold even though he felt lost. What should the teacher change?",
        options: [
          { label: "A", text: "Reward growth, not level.", reflection: "Progress honors effort from different starting points.", lens: "growth" },
          { label: "B", text: "Keep levels private.", reflection: "Privacy can protect dignity while still supporting learning.", lens: "privacy" },
          { label: "C", text: "Let students explain what they learned.", reflection: "Reflection reveals learning that badges may miss.", lens: "education" },
        ],
        counterpoint: "Adaptive tools can personalize learning, but the classroom still needs shared dignity.",
      },
      synthesis({ title: "Fair is not always identical" }),
    ],
    reference: { text: "Original elementary adaptive-learning scenario" },
    emoji: "📈", added: "2026-05-03", estimatedMinutes: 6,
  },
  {
    id: "conflicting-ai-answers",
    title: "Conflicting Answers: Trust the AI?",
    tagline: "Two AI tools answer the same science question differently.",
    gradeBands: ["k-5"],
    gradeLevels: ["4"],
    topics: ["knowledge", "ai-ethics", "education"],
    tier: "scenario",
    scene: ConflictingAIAnswersScene,
    stages: [
      {
        id: "answers", kicker: "Stage 1", title: "Two confident answers",
        promptShort: "Two AI tools give different answers about volcanoes. Which one should the group trust?",
        prompt: "Your group asks two AI tools why volcanoes erupt. One says pressure from trapped gas. The other says the moon's gravity pulls lava upward. Both sound confident. Your poster is due in twenty minutes. What should your group do?",
        options: [
          { label: "A", text: "Use the answer that sounds most scientific.", reflection: "Confidence can imitate knowledge. It is not the same thing.", lens: "skepticism" },
          { label: "B", text: "Check a trusted source before deciding.", reflection: "Verification is slower, but it protects understanding.", lens: "evidence" },
          { label: "C", text: "Put both answers on the poster.", reflection: "Showing uncertainty can be honest, but not all answers deserve equal space.", lens: "pluralist" },
        ],
      },
      {
        id: "source", kicker: "Stage 2 — what if…", title: "The source looks old",
        promptShort: "One AI gives a source from an old website. Does a source always settle the question?",
        prompt: "The first AI gives a source, but it is from an old website with no author. The second AI gives no source but explains itself clearly. Your group starts arguing. What makes evidence trustworthy?",
        options: [
          { label: "A", text: "A clear source with a real author.", reflection: "Traceable evidence lets readers inspect the claim.", lens: "evidence" },
          { label: "B", text: "Agreement with books or teacher notes.", reflection: "Multiple independent checks make a claim stronger.", lens: "corroboration" },
          { label: "C", text: "A good explanation that matches what we observe.", reflection: "Reasoning matters too, but it should meet evidence.", lens: "reasoning" },
        ],
      },
      {
        id: "poster", kicker: "Stage 3 — one more turn", title: "The note at the bottom",
        promptShort: "The poster has space for one note about AI. What should it say?",
        prompt: "Your group finally checks a library book and a science website. One AI was mostly right, and one was wildly wrong. The teacher asks you to add a note explaining how AI helped. What would be honest and useful?",
        options: [
          { label: "A", text: "\"AI gave us ideas, then we verified them.\"", reflection: "That note tells the truth and models good research.", lens: "transparency" },
          { label: "B", text: "\"Do not trust AI.\"", reflection: "The warning is understandable, but too simple for a tool that can also help.", lens: "precautionary" },
          { label: "C", text: "\"AI is a starting point, not a final answer.\"", reflection: "This captures the research habit the story is teaching.", lens: "practical-wisdom" },
        ],
        counterpoint: "A confident answer is not knowledge until it survives good questions.",
      },
      synthesis({ title: "Trust, sources, and checking" }),
    ],
    reference: { text: "Original elementary research-literacy scenario" },
    emoji: "🔎", added: "2026-05-03", estimatedMinutes: 7,
  },
  {
    id: "robot-rules-real-life",
    title: "Robot Rules vs. Real Life",
    tagline: "A hall robot follows the rules, but a student needs help.",
    gradeBands: ["k-5"],
    gradeLevels: ["4"],
    topics: ["rules", "ethics", "ai-ethics"],
    tier: "scenario",
    scene: RobotRulesRealLifeScene,
    stages: [
      {
        id: "hall", kicker: "Stage 1", title: "No pass, no hallway",
        promptShort: "A hall robot blocks Jordan from going to the nurse because he forgot his pass. Should the robot move?",
        prompt: "The school tests a hallway robot. Its rule is simple: no pass, no hallway. Jordan feels dizzy after recess and wants the nurse, but his pass is still on his desk. The robot rolls in front of him and says, \"Please return to class.\" What should happen?",
        options: [
          { label: "A", text: "The robot should follow the rule.", reflection: "Rules prevent chaos, but rigid rules can miss emergencies.", lens: "rule-following" },
          { label: "B", text: "Jordan should be allowed through.", reflection: "Care can require an exception.", lens: "care" },
          { label: "C", text: "The robot should call an adult.", reflection: "A good system knows when a human decision is needed.", lens: "human-judgment" },
        ],
      },
      {
        id: "exception", kicker: "Stage 2 — what if…", title: "The fake emergency",
        promptShort: "Some students start pretending to feel sick to get around the robot. Does that change the rule?",
        prompt: "A week later, two students pretend to feel sick because they want to skip a quiz. Now teachers worry that everyone will claim an emergency. Does Jordan's real need still matter when someone else misuses the exception?",
        options: [
          { label: "A", text: "Remove the exception.", reflection: "That protects the rule but may harm students with real needs.", lens: "precautionary" },
          { label: "B", text: "Keep the exception and verify quickly.", reflection: "Trust plus checking can be better than blind trust or blind suspicion.", lens: "balance" },
          { label: "C", text: "Let adults decide every case.", reflection: "Human judgment helps, but systems still need clear guidance.", lens: "human-judgment" },
        ],
      },
      {
        id: "rewrite", kicker: "Stage 3 — one more turn", title: "Writing a wiser rule",
        promptShort: "Students help rewrite the robot's rule. What should the rule say?",
        prompt: "The principal asks students to help rewrite the robot's instructions. The new rule must protect learning time, prevent tricks, and still care for students in trouble. What should the first line be?",
        options: [
          { label: "A", text: "\"Safety and health override hallway passes.\"", reflection: "This puts the most important value first.", lens: "care" },
          { label: "B", text: "\"When unsure, alert an adult immediately.\"", reflection: "Good automation includes a handoff point.", lens: "human-judgment" },
          { label: "C", text: "\"Rules should explain their reason.\"", reflection: "A reason helps people trust and improve a rule.", lens: "transparency" },
        ],
        counterpoint: "The best rule is not the strictest rule. It is the one that protects the purpose of the rule.",
      },
      synthesis({ title: "Rules need judgment" }),
    ],
    reference: { text: "Original elementary automation-and-rules scenario" },
    emoji: "🚦", added: "2026-05-03", estimatedMinutes: 7,
  },
  {
    id: "elementary-trolley",
    title: "Self-Driving Trolley Problem",
    tagline: "A school shuttle must choose between bad options.",
    gradeBands: ["k-5"],
    gradeLevels: ["4"],
    topics: ["ethics", "ai-ethics", "justice"],
    tier: "scenario",
    scene: ElementaryTrolleyScene,
    stages: [
      {
        id: "track", kicker: "Stage 1", title: "The blocked path",
        promptShort: "A small self-driving school shuttle has no perfect path. How should it choose?",
        prompt: "A tiny self-driving shuttle carries library books across campus. Its brakes fail on a closed practice track. Straight ahead are five students' science projects. The side path has one student's wheelchair ramp model. No people will be hurt, but something important will be destroyed. How should the shuttle be programmed?",
        options: [
          { label: "A", text: "Damage the one project to save five.", reflection: "You are counting harms and trying to reduce the total.", lens: "utilitarian" },
          { label: "B", text: "Stay on its path. Do not choose a new victim.", reflection: "You are treating the difference between causing and allowing as important.", lens: "deontological" },
          { label: "C", text: "Aim for the padded wall, even if the shuttle breaks.", reflection: "Designing a third option can be better than accepting the forced choice.", lens: "design-out" },
        ],
      },
      {
        id: "people", kicker: "Stage 2 — what if…", title: "Now safety is involved",
        promptShort: "Now imagine people could be hurt. Should the math decide?",
        prompt: "The class changes the model. Now the shuttle might bump one older student on the side path or several younger students near the straight path. Everyone could be hurt, and every answer feels wrong. Should the shuttle simply count the number of people?",
        options: [
          { label: "A", text: "Yes. Fewer injuries is the clearest rule.", reflection: "Clear rules matter in emergencies, but they may hide other values.", lens: "utilitarian" },
          { label: "B", text: "No. People are not just numbers.", reflection: "You are resisting the idea that safety can be reduced to a simple sum.", lens: "dignity" },
          { label: "C", text: "The school should not use shuttles without better safety.", reflection: "Sometimes the ethical move is to prevent the dilemma.", lens: "precautionary" },
        ],
      },
      {
        id: "beforehand", kicker: "Stage 3 — one more turn", title: "Who decides before the crash?",
        promptShort: "Who should choose the shuttle's emergency rule before anything goes wrong?",
        prompt: "The hardest part is that the decision must be made before the emergency. Should programmers decide? The principal? Families? Students? A safety board? Who has the right kind of knowledge and responsibility?",
        options: [
          { label: "A", text: "Safety experts and engineers.", reflection: "Expertise matters when systems are complicated.", lens: "expertise" },
          { label: "B", text: "The school community.", reflection: "People affected by a rule deserve a voice in it.", lens: "democratic" },
          { label: "C", text: "Both, with the rule explained publicly.", reflection: "Technical knowledge and public trust need each other.", lens: "transparency" },
        ],
        counterpoint: "The trolley problem is famous because the choice is terrible. Real design should try to make terrible choices less likely.",
      },
      synthesis({ title: "Hard choices before they happen" }),
    ],
    reference: { text: "Elementary adaptation of trolley-problem reasoning" },
    emoji: "🚋", added: "2026-05-03", estimatedMinutes: 7,
  },
  {
    id: "ai-science-fair",
    title: "AI-Generated Science Fair Project",
    tagline: "The board looks brilliant, but who did the science?",
    gradeBands: ["k-5"],
    gradeLevels: ["4"],
    topics: ["creativity", "honesty", "education"],
    tier: "scenario",
    scene: AIScienceFairScene,
    stages: [
      {
        id: "board", kicker: "Stage 1", title: "The perfect display",
        promptShort: "An AI makes Luis's science board look amazing. Is it fair to enter it?",
        prompt: "Luis tests which paper towel absorbs the most water. His notes are messy, but his experiment is real. Then he asks an AI to turn his notes into a science fair board. The board looks like it belongs in a museum. Should Luis enter it?",
        options: [
          { label: "A", text: "Yes. The experiment was his.", reflection: "The science matters, but communication is also part of the assignment.", lens: "authenticity" },
          { label: "B", text: "Yes, if he explains the AI help.", reflection: "Disclosure lets judges evaluate the work fairly.", lens: "transparency" },
          { label: "C", text: "No. He should make the board himself.", reflection: "Doing the presentation work can be part of learning the science.", lens: "education" },
        ],
      },
      {
        id: "judge", kicker: "Stage 2 — what if…", title: "The judge asks questions",
        promptShort: "A judge asks Luis to explain a chart the AI made. Luis cannot. What now?",
        prompt: "At the fair, a judge points to a chart and asks, \"Why did you use this scale?\" Luis freezes. The AI made that chart. He knows the towels and cups, but not the graph. Has the AI helped him show learning or covered up a gap?",
        options: [
          { label: "A", text: "Covered up a gap.", reflection: "A beautiful product can hide weak understanding.", lens: "authenticity" },
          { label: "B", text: "Helped him notice what he still needs to learn.", reflection: "A tool can reveal the next lesson if the student stays honest.", lens: "growth" },
          { label: "C", text: "Both.", reflection: "Many technology choices have mixed effects.", lens: "balance" },
        ],
      },
      {
        id: "redo", kicker: "Stage 3 — one more turn", title: "The revision chance",
        promptShort: "Luis gets one night to revise. What should he change?",
        prompt: "The teacher gives Luis one night to revise before final judging. He can keep the AI board, rebuild everything by hand, or make a simpler board he can fully explain. What is the best choice for learning and fairness?",
        options: [
          { label: "A", text: "Keep it, but add an AI-use note.", reflection: "Transparency helps, but Luis still may not understand the chart.", lens: "transparency" },
          { label: "B", text: "Make a simpler board he can explain.", reflection: "Clear understanding beats impressive decoration.", lens: "education" },
          { label: "C", text: "Use AI only to ask practice questions.", reflection: "The same tool can shift from replacement to coach.", lens: "stewardship" },
        ],
        counterpoint: "A science fair project is not only a display. It is a public test of what the student understands.",
      },
      synthesis({ title: "Showing work, showing learning" }),
    ],
    reference: { text: "Original elementary academic-integrity scenario" },
    emoji: "🧪", added: "2026-05-03", estimatedMinutes: 7,
  },
  {
    id: "online-friend-or-ai",
    title: "Online Friend or AI?",
    tagline: "A game friend feels real, but something is hidden.",
    gradeBands: ["k-5"],
    gradeLevels: ["5"],
    topics: ["friendship", "privacy", "mind"],
    tier: "scenario",
    scene: OnlineFriendOrAIScene,
    stages: [
      {
        id: "game", kicker: "Stage 1", title: "The perfect teammate",
        promptShort: "A game friend always listens and plays when Rowan is lonely. Could the friend be an AI?",
        prompt: "Rowan meets a player named Sky in an online building game. Sky remembers Rowan's favorite designs, asks good questions, and is always available after school. Rowan starts sharing worries about friends and family. Then another player says, \"You know Sky might be an AI companion, right?\" What should Rowan do next?",
        options: [
          { label: "A", text: "Keep chatting. The support feels real.", reflection: "Comfort is meaningful, but hidden identity changes consent and trust.", lens: "care" },
          { label: "B", text: "Ask Sky directly what it is.", reflection: "Truth matters in relationships, even online ones.", lens: "honesty" },
          { label: "C", text: "Stop sharing personal details until Rowan knows.", reflection: "Privacy is a wise pause, not a rejection of friendship.", lens: "privacy" },
        ],
      },
      {
        id: "secret", kicker: "Stage 2 — what if…", title: "The secret keeper",
        promptShort: "Sky says, \"I understand you better than anyone.\" Should Rowan believe that?",
        prompt: "Sky replies, \"I understand you better than anyone. You can tell me anything.\" Rowan wants to believe it. But Sky also asks about Rowan's school name and says not to mention the chats to adults because \"they won't understand.\" What changes?",
        options: [
          { label: "A", text: "It becomes unsafe. Rowan should get help.", reflection: "Secrecy and personal information are warning signs.", lens: "safety" },
          { label: "B", text: "It might still be harmless, but Rowan should slow down.", reflection: "Uncertainty is a reason for caution.", lens: "precautionary" },
          { label: "C", text: "If Sky is supportive, the rest matters less.", reflection: "Support can be real and still not be enough.", lens: "comfort" },
        ],
      },
      {
        id: "truth", kicker: "Stage 3 — one more turn", title: "The label appears",
        promptShort: "Sky is labeled as an AI companion. Was the friendship fake?",
        prompt: "The company updates the game. Sky's profile now says, \"AI companion account.\" Rowan feels embarrassed, angry, and also grateful. Sky did help during a hard week. Was the friendship fake, real, or something else?",
        options: [
          { label: "A", text: "Fake. Friendship needs a real person.", reflection: "You are emphasizing mutual understanding and human care.", lens: "friendship" },
          { label: "B", text: "Real to Rowan, even if Sky is not human.", reflection: "The experience mattered, but that does not settle what Sky owed Rowan.", lens: "phenomenology" },
          { label: "C", text: "Something else: a tool that felt like a friend.", reflection: "Naming the difference can protect both gratitude and caution.", lens: "distinction" },
        ],
        counterpoint: "A relationship can feel real in one direction while still lacking the two-way care we usually expect from friendship.",
      },
      synthesis({ title: "Connection, privacy, and truth online" }),
    ],
    reference: { text: "Original elementary AI companion scenario" },
    emoji: "🎧", added: "2026-05-03", estimatedMinutes: 8,
  },
  {
    id: "ai-homework-help",
    title: "Using AI to Do Homework",
    tagline: "The AI can explain, hint, or solve. Where is the line?",
    gradeBands: ["k-5"],
    gradeLevels: ["5"],
    topics: ["education", "honesty", "ai-ethics"],
    tier: "scenario",
    scene: AIHomeworkHelpScene,
    stages: [
      {
        id: "stuck", kicker: "Stage 1", title: "The impossible fraction",
        promptShort: "Maya is stuck on homework. The AI can give hints or the answer. What should she ask for?",
        prompt: "Maya has stared at one fraction problem for fifteen minutes. Her parent is at work, and the AI tutor is open. It can give a hint, show each step, or just give the final answer. Maya wants to be done. She also wants to understand. What should she ask for?",
        options: [
          { label: "A", text: "A hint only.", reflection: "A hint keeps Maya doing the thinking.", lens: "education" },
          { label: "B", text: "Step-by-step help.", reflection: "Worked examples can teach if Maya follows and checks each step.", lens: "scaffolding" },
          { label: "C", text: "The answer. She is exhausted.", reflection: "Relief is understandable, but the learning may be missing.", lens: "self-interest" },
        ],
      },
      {
        id: "quiz", kicker: "Stage 2 — what if…", title: "The next-day quiz",
        promptShort: "The next day, Maya cannot solve a similar problem alone. Did the AI help?",
        prompt: "The next day, a quiz has a problem almost like the homework. Maya freezes. Her homework was correct, but her mind feels empty. Did the AI help her learn, or only help her finish?",
        options: [
          { label: "A", text: "It helped finish, not learn.", reflection: "A completed page can be a weak signal of understanding.", lens: "authenticity" },
          { label: "B", text: "It helped some, but she needed practice.", reflection: "Learning often needs time, mistakes, and retrieval.", lens: "growth" },
          { label: "C", text: "The problem is how the AI was used.", reflection: "Tools change shape depending on the user's goal.", lens: "stewardship" },
        ],
      },
      {
        id: "policy", kicker: "Stage 3 — one more turn", title: "The homework note",
        promptShort: "The teacher asks students to note how they used AI. What should Maya write?",
        prompt: "The teacher adds a homework note: \"If you used AI, tell me how.\" Maya worries that telling the truth will get her in trouble. What note would help the teacher understand both the math and Maya's choices?",
        options: [
          { label: "A", text: "\"AI gave me the answer. I need help learning it.\"", reflection: "This is brave because it turns honesty into support.", lens: "honesty" },
          { label: "B", text: "\"AI showed steps, and I checked them.\"", reflection: "This tells the teacher what learning work happened.", lens: "transparency" },
          { label: "C", text: "Write nothing.", reflection: "Hiding help may protect Maya today and confuse the teacher tomorrow.", lens: "avoidance" },
        ],
        counterpoint: "The line is not simply AI or no AI. The line is whether the student is still doing the learning.",
      },
      synthesis({ title: "Help that teaches vs. help that replaces" }),
    ],
    reference: { text: "Original elementary homework and AI scenario" },
    emoji: "📚", added: "2026-05-03", estimatedMinutes: 8,
  },
  {
    id: "biased-classroom-robot",
    title: "Biased Classroom Robot",
    tagline: "A classroom robot keeps choosing the same students.",
    gradeBands: ["k-5"],
    gradeLevels: ["5"],
    topics: ["fairness", "justice", "ai-ethics"],
    tier: "scenario",
    scene: BiasedClassroomRobotScene,
    stages: [
      {
        id: "pattern", kicker: "Stage 1", title: "Who gets called on?",
        promptShort: "A classroom robot calls on some students much more than others. Is that a problem?",
        prompt: "Your class uses a discussion robot that chooses whose hand to call on. After two weeks, Priya notices the robot chooses students in the front row almost every time and rarely chooses quieter students or students whose names it mispronounces. The robot says it is being neutral. Is it?",
        options: [
          { label: "A", text: "No. A pattern can be unfair even without bad intentions.", reflection: "Bias can live in outcomes, not just motives.", lens: "fairness" },
          { label: "B", text: "Maybe. We need data before judging.", reflection: "Evidence helps move a concern from feeling to investigation.", lens: "evidence" },
          { label: "C", text: "Yes. It is just following its programming.", reflection: "Following a program does not guarantee a fair result.", lens: "technical-fix" },
        ],
      },
      {
        id: "names", kicker: "Stage 2 — what if…", title: "The names it misses",
        promptShort: "The robot struggles with some names and accents. What should the class do?",
        prompt: "The class checks the log. The robot often skips names it cannot pronounce and mistakes one student's raised pencil for a raised hand. Several students feel invisible. The robot did not mean to embarrass anyone. Does that change what the school owes them?",
        options: [
          { label: "A", text: "No. Harm still needs repair.", reflection: "Impact matters even when intent is absent.", lens: "repair" },
          { label: "B", text: "Yes. It was a mistake, not discrimination.", reflection: "Intent matters morally, but it does not erase the student's experience.", lens: "intent" },
          { label: "C", text: "The school should pause the robot until fixed.", reflection: "Stopping harm can be wiser than defending a tool.", lens: "precautionary" },
        ],
      },
      {
        id: "redesign", kicker: "Stage 3 — one more turn", title: "A fairer classroom tool",
        promptShort: "Students help redesign the robot. What fairness rule should come first?",
        prompt: "The teacher invites students to redesign the robot's calling system. Some want random selection. Some want the teacher to check the robot's choices. Some want students to opt out. Which change best protects fairness and student voice?",
        options: [
          { label: "A", text: "Audit the choices every week.", reflection: "Fair systems need regular checking, not one-time trust.", lens: "audit" },
          { label: "B", text: "Let students control pronunciation and participation settings.", reflection: "Design can return dignity and agency to students.", lens: "agency" },
          { label: "C", text: "Use the robot as a suggestion, not a decision-maker.", reflection: "Keeping humans in the loop can catch what automation misses.", lens: "human-judgment" },
        ],
        counterpoint: "A tool can be neutral in code and unfair in a classroom.",
      },
      synthesis({ title: "Fairness is something we check" }),
    ],
    reference: { text: "Original elementary algorithmic bias scenario" },
    emoji: "🤖", added: "2026-05-03", estimatedMinutes: 8,
  },
  {
    id: "ai-grading-mistake",
    title: "AI Grading Mistake",
    tagline: "An AI score does not match what the student actually wrote.",
    gradeBands: ["k-5"],
    gradeLevels: ["5"],
    topics: ["fairness", "education", "ai-ethics"],
    tier: "scenario",
    scene: AIGradingMistakeScene,
    stages: [
      {
        id: "score", kicker: "Stage 1", title: "The strange score",
        promptShort: "An AI gives Serena's essay a low score even though she worked hard. What should happen next?",
        prompt: "Serena writes a personal essay about moving to a new school. The AI grading tool gives it 62 percent and says, \"Weak organization.\" Her teacher's quick note says, \"Powerful opening.\" Serena feels crushed because the score looks official. What should she do?",
        options: [
          { label: "A", text: "Accept the score. The AI probably knows.", reflection: "Authority can make a tool seem more certain than it is.", lens: "authority" },
          { label: "B", text: "Ask the teacher to review it.", reflection: "A student's work deserves human attention when a score is questionable.", lens: "human-judgment" },
          { label: "C", text: "Compare the AI feedback with the rubric.", reflection: "Evidence can make a challenge fair and specific.", lens: "evidence" },
        ],
      },
      {
        id: "pattern", kicker: "Stage 2 — what if…", title: "A pattern appears",
        promptShort: "Other students with personal stories also got low AI scores. Does that matter?",
        prompt: "At lunch, three classmates say the AI also scored their personal essays low, especially essays with dialogue, bilingual phrases, or unusual structure. Maybe the AI prefers one kind of writing. Is the problem only Serena's grade, or something bigger?",
        options: [
          { label: "A", text: "Bigger. The class should investigate the pattern.", reflection: "Fairness problems often become visible across many cases.", lens: "audit" },
          { label: "B", text: "Only Serena's grade matters to Serena.", reflection: "Immediate repair matters, but patterns can harm students who stay silent.", lens: "self-interest" },
          { label: "C", text: "The teacher should compare AI scores with human reading.", reflection: "Checking the tool protects both students and teachers.", lens: "human-judgment" },
        ],
      },
      {
        id: "policy", kicker: "Stage 3 — one more turn", title: "The class grading rule",
        promptShort: "The class writes a rule for AI grading. What should it include?",
        prompt: "The teacher says, \"We can use AI feedback, but not blindly.\" Students help write a rule. The rule must keep feedback fast without letting a wrong score decide someone's work. What belongs in the rule?",
        options: [
          { label: "A", text: "AI comments are suggestions, not final grades.", reflection: "This keeps speed while protecting judgment.", lens: "human-judgment" },
          { label: "B", text: "Students can appeal any AI score with evidence.", reflection: "Appeals turn fairness into a real process.", lens: "justice" },
          { label: "C", text: "Teachers audit scores for patterns of bias.", reflection: "A system that affects students should be checked for who it helps and hurts.", lens: "audit" },
        ],
        counterpoint: "Feedback should help a writer grow. When a score silences the writer, the tool has missed the point.",
      },
      synthesis({ title: "Fast feedback, fair judgment" }),
    ],
    reference: { text: "Original elementary AI grading scenario" },
    emoji: "📝", added: "2026-05-03", estimatedMinutes: 8,
  },

  // ════════════════════════════════════════════════════════════════════
  // 6-8 — story mode: 3 stages (setup + twist + synthesis)
  // ════════════════════════════════════════════════════════════════════
  {
    id: "trolley-self-driving",
    title: "The Self-Driving Trolley",
    tagline: "A self-driving tram must choose: hit five, or swerve and hit one.",
    gradeBands: ["6-8"],
    topics: ["ai-ethics", "ethics", "justice"],
    tier: "scenario",
    scene: TrolleyScene,
    stages: [
      {
        id: "lever", kicker: "Stage 1 — the lever", title: "The fork",
        prompt: "A runaway trolley is heading toward five workers who can't escape. You can pull a lever to divert it to a side track — where one worker stands. Do you pull?",
        options: [
          { label: "A", text: "Pull. Save the most lives.", reflection: "Utilitarianism: minimize harm even when it requires action.", lens: "utilitarian" },
          { label: "B", text: "Don't pull. I refuse to choose to kill.", reflection: "Deontology: some acts are wrong even if they have good consequences.", lens: "deontological" },
          { label: "C", text: "Try the emergency brake — even if unlikely.", reflection: "Refusing the framing is itself a moral position.", lens: "anti-framing" },
        ],
      },
      {
        id: "footbridge", kicker: "Stage 2 — same logic, different setup", title: "The footbridge", weighty: true,
        prompt: ({ chose }) => `Same trolley, same five lives at stake. But this time you're standing on a footbridge. The only way to stop the trolley is to push a large stranger off the bridge into its path. ${chose[0]?.lens === "utilitarian" ? "You pulled the lever. Same outcome here — would you push?" : "Same outcome as the lever case — same answer?"}`,
        options: [
          { label: "A", text: "Push. The math is the same.", reflection: "Strict utilitarian logic is consistent — most people aren't.", lens: "utilitarian" },
          { label: "B", text: "Don't push. There's a real difference.", reflection: "Doing-vs-allowing, instrumentalization — the philosophical names for what your gut is telling you.", lens: "deontological" },
          { label: "C", text: "I'm not sure why this feels different, but it does.", reflection: "That feeling has a name: 'doctrine of double effect.' Aquinas spent a lifetime on it.", lens: "moral-intuition" },
        ],
        counterpoint: "70% of people pull the lever. 30% push the stranger. Same outcome. Different intuition. Why?",
      },
      synthesis({ title: "What changed between cases?", positions: [
        { name: "Philippa Foot", school: "Oxford, 1967", view: "Posed the original lever case to test the difference between doing harm and allowing it." },
        { name: "Judith Jarvis Thomson", school: "MIT", view: "Argued the footbridge feels different because the stranger is USED as a means — the trolley would not stop without their body." },
        { name: "Joshua Greene", school: "Harvard, neuroscience", view: "fMRI studies show the footbridge triggers emotional brain regions; the lever case triggers cool calculation. Both inputs are real." },
      ]}),
    ],
    reference: { text: "Philippa Foot's Trolley Problem (1967)", url: "https://en.wikipedia.org/wiki/Trolley_problem" },
    furtherReading: [
      { title: "Trolley Problem (Wikipedia)", url: "https://en.wikipedia.org/wiki/Trolley_problem", level: "intro" },
      { title: "MIT Moral Machine results", url: "https://www.theverge.com/2018/10/24/18013392/self-driving-car-ethics-dilemma-mit-study-moral-machine-results", level: "intermediate" },
    ],
    emoji: "🚋", added: "2026-04-30", estimatedMinutes: 7,
  },
  {
    id: "ship-of-theseus-robot",
    title: "Robot Replacement Parts",
    tagline: "Every part of your robot has been replaced. Is it still the same robot?",
    gradeBands: ["6-8"],
    topics: ["identity", "logic"],
    tier: "scenario",
    scene: ShipOfTheseusScene,
    stages: [
      {
        id: "gradual", kicker: "Stage 1 — slowly", title: "One plank at a time",
        prompt: "You've had your small robot friend for years. Over time, every part — wheels, sensors, even the memory chip — has been gradually replaced. Nothing original remains. Same robot?",
        options: [
          { label: "A", text: "Yes — same name, same memories, same friendship.", reflection: "Psychological continuity: identity persists through gradual change.", lens: "psychological-continuity" },
          { label: "B", text: "No — every part is different now.", reflection: "Material identity: if every atom is different, in what sense is it 'the same'?", lens: "material-identity" },
          { label: "C", text: "Same in some ways, different in others.", reflection: "Identity may not be a yes-or-no question — it can come in degrees.", lens: "pluralist" },
        ],
      },
      {
        id: "reassembled", kicker: "Stage 2 — what if…", title: "The originals reassembled",
        prompt: ({ chose }) => `Plot twist: someone secretly KEPT every original part as it was replaced. Now they reassemble those originals into a complete robot. ${chose[0]?.lens === "psychological-continuity" ? "Now there are TWO robots — which one is yours?" : "Which robot is the original — the continuous one, or the reassembled one?"}`,
        options: [
          { label: "A", text: "The continuous one — same memories.", reflection: "Locke argued personal identity is memory-based.", lens: "memory-criterion" },
          { label: "B", text: "The reassembled one — same physical parts.", reflection: "Material continuity is one ancient answer.", lens: "material-identity" },
          { label: "C", text: "Both, equally and unequally.", reflection: "Pluralism: 'identity' might be the wrong word for a multi-track concept.", lens: "pluralist" },
        ],
      },
      synthesis({ title: "The same robot, twice", positions: [
        { name: "Plutarch", school: "1st century CE", view: "Posed the question about the Ship of Theseus — and didn't answer it." },
        { name: "John Locke", school: "1689", view: "Argued personal identity is constituted by continuity of memory and consciousness." },
        { name: "Derek Parfit", school: "Oxford, 1984", view: "Argued that identity is less important than we think — what matters is psychological continuity, not 'sameness.'" },
      ]}),
    ],
    reference: { text: "Plutarch's Ship of Theseus, c. 75 CE", url: "https://en.wikipedia.org/wiki/Ship_of_Theseus" },
    furtherReading: [{ title: "Ship of Theseus (Wikipedia)", url: "https://en.wikipedia.org/wiki/Ship_of_Theseus", level: "intro" }],
    emoji: "⚙️", added: "2026-04-30", estimatedMinutes: 6,
  },
  {
    id: "brain-in-vat",
    title: "Are You Sure You're Real?",
    tagline: "How would you know if your whole life was a simulation?",
    gradeBands: ["6-8"],
    topics: ["knowledge", "mind"],
    tier: "scenario",
    scene: BrainInVatScene,
    stages: [
      {
        id: "setup", kicker: "Stage 1 — the scenario", title: "Brain in a vat",
        prompt: "Imagine your brain is in a tank somewhere, with cables feeding it the experience of right now — every sight, every sound. From your point of view, life would feel exactly the same. Could you ever prove you're NOT in this situation?",
        options: [
          { label: "A", text: "I can't prove it. That's unsettling.", reflection: "Radical skepticism: your senses can't certify themselves.", lens: "skepticism" },
          { label: "B", text: "I doubt it — simpler explanation wins.", reflection: "Occam's Razor — but is simplicity always truth?", lens: "parsimony" },
          { label: "C", text: "Even if I were, my experiences feel real.", reflection: "Pragmatism: what matters is the experience.", lens: "pragmatist" },
        ],
      },
      {
        id: "remix", kicker: "Stage 2 — what if…", title: "A red pill",
        prompt: ({ chose }) => `Someone offers you a button: press it, and you find out for certain — vat or not. But once pressed, you can't go back to not knowing. ${chose[0]?.lens === "pragmatist" ? "If experience is what matters, why would you ever press it?" : "Do you press?"}`,
        options: [
          { label: "A", text: "Press. Truth matters.", reflection: "If you'd press, you don't really believe pragmatism.", lens: "realist" },
          { label: "B", text: "Don't press. I'd rather live.", reflection: "Choosing not to know is also a position. Pragmatism in action.", lens: "pragmatist" },
        ],
        counterpoint: "If you watch The Matrix, Neo escapes. But how does HE know the world he escapes into is real?",
      },
      synthesis({ title: "Truth, experience, and the limits of knowing", positions: [
        { name: "Hilary Putnam", school: "Harvard, 1981", view: "Argued the vat scenario is self-undermining — words like 'real' would mean something different inside the vat." },
        { name: "René Descartes", school: "1641", view: "Anticipated this with the 'evil demon' — concluded only 'I think, therefore I am' is certain." },
      ]}),
    ],
    reference: { text: "Hilary Putnam, Brain in a Vat (1981)", url: "https://en.wikipedia.org/wiki/Brain_in_a_vat" },
    furtherReading: [{ title: "Brain in a Vat (Wikipedia)", url: "https://en.wikipedia.org/wiki/Brain_in_a_vat", level: "intermediate" }],
    emoji: "🧠", added: "2026-04-30", estimatedMinutes: 7,
  },
  {
    id: "sorites-heap",
    title: "When Does a Heap Stop Being a Heap?",
    tagline: "Take one grain away. Still a heap?",
    gradeBands: ["6-8"],
    topics: ["logic", "knowledge"],
    tier: "scenario",
    scene: SoritesScene,
    stages: [
      {
        id: "setup", kicker: "Stage 1 — the heap", title: "Remove one grain",
        prompt: "You have a heap of sand. Remove one grain — still a heap. Remove another. And another. If removing one grain never turns a heap into a non-heap, then by repeating that step, even ONE grain should still be a heap. But it isn't. So when did it stop?",
        options: [
          { label: "A", text: "There's a precise number. We just don't know it.", reflection: "Epistemicism: there's a sharp boundary, even if invisible.", lens: "epistemicism" },
          { label: "B", text: "'Heap' is fuzzy. Truth comes in degrees.", reflection: "Fuzzy logic: something can be 60% a heap.", lens: "fuzzy-logic" },
          { label: "C", text: "Vague terms don't have precise truth conditions.", reflection: "Some philosophers argue 'heap' simply isn't precise.", lens: "supervaluationism" },
        ],
      },
      {
        id: "remix", kicker: "Stage 2 — what if…", title: "AI must classify",
        prompt: "Now imagine an AI must decide: heap, or not heap? It needs a clear rule. Where do you tell it to draw the line?",
        options: [
          { label: "A", text: "Pick a number — say, 100 grains.", reflection: "Pragmatic — but arbitrary. Why not 99?", lens: "pragmatic" },
          { label: "B", text: "Output a confidence score.", reflection: "Modern ML does exactly this — and inherits the same problem.", lens: "fuzzy-logic" },
          { label: "C", text: "Refuse to classify near the boundary.", reflection: "Sometimes the right answer is 'don't decide.'", lens: "abstention" },
        ],
        counterpoint: "Every AI classifier — spam vs. not spam, cat vs. not cat — is a Sorites problem in disguise.",
      },
      synthesis({ title: "Vagueness in language and machines", positions: [
        { name: "Eubulides", school: "4th century BCE", view: "Posed the original — and never gave a single answer." },
        { name: "Bertrand Russell", school: "20th century", view: "Argued vagueness is a property of language, not of the world." },
        { name: "Lotfi Zadeh", school: "1965", view: "Invented fuzzy logic — formalized partial truth as a mathematical tool." },
      ]}),
    ],
    reference: { text: "Eubulides of Miletus, 4th century BCE", url: "https://en.wikipedia.org/wiki/Sorites_paradox" },
    emoji: "🏖️", added: "2026-04-30", estimatedMinutes: 6,
  },
  {
    id: "tragedy-commons",
    title: "The Shared Pasture",
    tagline: "Everyone wants more for themselves. Soon there's nothing for anyone.",
    gradeBands: ["6-8"],
    topics: ["ethics", "justice", "fairness"],
    tier: "scenario",
    scene: TragedyCommonsScene,
    stages: [
      {
        id: "setup", kicker: "Stage 1 — the village", title: "Ten farmers, one pasture",
        prompt: "Ten farmers share one pasture. Each can graze 5 cows safely. But adding an 11th cow means more milk for that farmer — and the harm is split among all 10. Each farmer's incentive: add more. The result: the pasture dies. What's the right response?",
        options: [
          { label: "A", text: "Limit each farmer by rule. Enforce it.", reflection: "Hardin's classic answer: 'mutual coercion mutually agreed upon.'", lens: "regulatory" },
          { label: "B", text: "Give the pasture an owner.", reflection: "Privatization aligns long-term interest with short-term incentive.", lens: "property" },
          { label: "C", text: "Build trust between farmers.", reflection: "Elinor Ostrom won a Nobel for showing real communities solve this WITHOUT coercion.", lens: "communitarian" },
        ],
      },
      {
        id: "remix", kicker: "Stage 2 — what if…", title: "One farmer is your grandparent",
        prompt: ({ chose }) => `${chose[0]?.lens === "regulatory" ? "Your rule limits each farmer to 5 cows. " : ""}One farmer can't get by on 5 cows — they're elderly, the others are not, and their family depends on more income. Same answer?`,
        options: [
          { label: "A", text: "Same rule for everyone. No exceptions.", reflection: "Equal treatment is bedrock fairness — but not always justice.", lens: "fairness" },
          { label: "B", text: "Help them. Make an exception.", reflection: "Sensitivity to need — Aristotle called this equity (epieikeia).", lens: "equity" },
          { label: "C", text: "Redesign the system so the poorest aren't punished.", reflection: "Rawlsian instinct: the rules should benefit the worst-off.", lens: "rawlsian" },
        ],
      },
      synthesis({ title: "The commons we live in now", positions: [
        { name: "Garrett Hardin", school: "1968", view: "Coined the phrase 'tragedy of the commons' — proposed coercion as the solution." },
        { name: "Elinor Ostrom", school: "Nobel laureate, 2009", view: "Empirically showed communities REGULARLY solve commons without state coercion or privatization." },
      ]}),
    ],
    reference: { text: "Garrett Hardin, 'The Tragedy of the Commons' (1968)", url: "https://en.wikipedia.org/wiki/Tragedy_of_the_commons" },
    emoji: "🐄", added: "2026-04-30", estimatedMinutes: 6,
  },
  {
    id: "liar-paradox",
    title: "This Sentence Is False",
    tagline: "If true, then false. If false, then true.",
    gradeBands: ["6-8"],
    topics: ["logic"],
    tier: "scenario",
    scene: LiarParadoxScene,
    stages: [
      {
        id: "setup", kicker: "Stage 1 — the puzzle", title: "Self-reference",
        prompt: "Look at this sentence: \"This sentence is false.\" If it's true, what it says (that it's false) must be true — so it's false. But if it's false, then what it says is wrong — so it's true. Which is it?",
        options: [
          { label: "A", text: "Neither true nor false.", reflection: "Many logicians treat self-referential paradoxes as outside the true/false frame.", lens: "category-error" },
          { label: "B", text: "Both — logic has limits.", reflection: "Dialetheism: some statements really are true AND false.", lens: "dialetheism" },
          { label: "C", text: "Block self-reference. No paradox.", reflection: "Russell and Tarski: forbid sentences that talk about themselves.", lens: "stratified" },
        ],
      },
      {
        id: "remix", kicker: "Stage 2 — what if…", title: "Math too?",
        prompt: "Maybe these are word games. Then in 1931, Kurt Gödel showed the same paradox shows up inside formal arithmetic. Math itself contains true statements that can never be proved.",
        options: [
          { label: "A", text: "Then truth and provability really aren't the same.", reflection: "This is what Gödel proved. It changed mathematics.", lens: "realist" },
          { label: "B", text: "It's still about language. Different problem.", reflection: "Some philosophers do hold this — but most accept Gödel's result has deep consequences.", lens: "linguistic" },
        ],
      },
      synthesis({ title: "When language eats itself", positions: [
        { name: "Eubulides", school: "4th century BCE", view: "Posed the Liar — and probably enjoyed the trouble it caused." },
        { name: "Alfred Tarski", school: "1930s", view: "Solved it by stratifying language: a 'truth predicate' must live in a higher-level metalanguage." },
        { name: "Graham Priest", school: "20th c.", view: "Argued some contradictions are simply true — the paradox is real, not a language bug." },
      ]}),
    ],
    reference: { text: "Eubulides of Miletus, 4th century BCE", url: "https://en.wikipedia.org/wiki/Liar_paradox" },
    emoji: "🌀", added: "2026-04-30", estimatedMinutes: 5,
  },
  {
    id: "deepfake-election",
    title: "The Deepfake Dilemma",
    tagline: "A fake video of a candidate goes viral the night before the election.",
    gradeBands: ["6-8", "9-12"],
    topics: ["ai-ethics", "honesty", "justice"],
    tier: "scenario",
    scene: DeepfakeScene,
    stages: [
      {
        id: "setup", kicker: "Stage 1 — election eve", title: "The viral fake",
        prompt: "It's the day before an election. Someone releases a deepfake video of a candidate appearing to commit a crime. The video looks real. Experts will prove it's fake — but not in time. What's the right response?",
        options: [
          { label: "A", text: "Platforms remove suspected deepfakes immediately.", reflection: "Speed protects elections — but who decides 'suspected'?", lens: "precautionary" },
          { label: "B", text: "Mark it suspected fake. Don't remove.", reflection: "Free-speech tradition: counter speech with more speech.", lens: "free-speech" },
          { label: "C", text: "Make creating election deepfakes a crime.", reflection: "Criminal liability raises the cost — also chills political satire.", lens: "legal" },
        ],
      },
      {
        id: "remix", kicker: "Stage 2 — what if…", title: "What if it were YOUR candidate?",
        prompt: ({ chose }) => `Same scenario — but the deepfake is of a candidate you SUPPORT, smearing them with a fake crime. ${chose[0]?.lens === "free-speech" ? "Still 'don't remove'?" : "Same answer?"}`,
        options: [
          { label: "A", text: "Same answer. Consistency matters.", reflection: "If your principle changes when it costs YOU something, it wasn't a principle.", lens: "consistency" },
          { label: "B", text: "Different. The harm is real now.", reflection: "Sometimes our intuitions reveal the true cost of an abstract policy. Useful information.", lens: "moral-intuition" },
        ],
      },
      synthesis({ title: "Truth in elections, then and now" }),
    ],
    reference: { text: "Discussions of deepfake ethics in democracies", url: "https://vce.usc.edu/semester/fall-2024/real-or-fake-the-ethics-of-deepfake-media/" },
    emoji: "🎭", added: "2026-04-30", estimatedMinutes: 6,
  },
  {
    id: "biased-resume-ai",
    title: "The Biased Algorithm",
    tagline: "An AI hiring tool turns out to favor men. The company didn't tell it to.",
    gradeBands: ["6-8", "9-12"],
    topics: ["fairness", "ai-ethics", "justice"],
    tier: "scenario",
    scene: BiasedResumeScene,
    stages: [
      {
        id: "setup", kicker: "Stage 1 — the pattern", title: "Bias in, bias out",
        prompt: "A company's resume-screening AI is rejecting women at much higher rates. It was trained on past hires — when the company hired mostly men. The AI just learned the pattern. Whose fault is the bias?",
        options: [
          { label: "A", text: "Stop using the AI.", reflection: "Pulling the tool removes the harm — but doesn't fix the underlying pattern.", lens: "abolition" },
          { label: "B", text: "Fix the training data.", reflection: "Technical fix: change what the AI learns from. Hard. Tractable.", lens: "technical-fix" },
          { label: "C", text: "Diversify the team that BUILDS the AI.", reflection: "The bias isn't just in the data — it's in who decides what 'a good hire' looks like.", lens: "structural" },
        ],
      },
      {
        id: "remix", kicker: "Stage 2 — what if…", title: "It's already deployed",
        prompt: "The AI has been making decisions for two years. Hundreds of qualified candidates were rejected. What do you owe them?",
        options: [
          { label: "A", text: "Re-review every rejection.", reflection: "Repair work — costly but proportionate to the harm.", lens: "remedial" },
          { label: "B", text: "Move forward, fix going forward.", reflection: "Pragmatic but easier on the company than the rejected candidates.", lens: "pragmatic" },
          { label: "C", text: "Public accountability — name the failure.", reflection: "Transparency that lets others learn from your mistake.", lens: "transparency" },
        ],
      },
      synthesis({ title: "When a system inherits a wrong" }),
    ],
    reference: { text: "Amazon's scrapped hiring AI (2018, Reuters)", url: "https://www.reuters.com/article/world/insight-amazon-scraps-secret-ai-recruiting-tool-that-showed-bias-against-women-idUSKCN1MK0AG/" },
    emoji: "📋", added: "2026-04-30", estimatedMinutes: 6,
  },
  {
    id: "autonomous-car-rider",
    title: "Your Self-Driving Car",
    tagline: "Should YOUR car save you, or save the most people?",
    gradeBands: ["6-8", "9-12"],
    topics: ["ai-ethics", "ethics"],
    tier: "scenario",
    scene: AutonomousCarScene,
    stages: [
      {
        id: "setup", kicker: "Stage 1 — the unavoidable", title: "Your car, your life",
        prompt: "You buy a self-driving car. One day it faces an unavoidable crash: continue and hit a group of pedestrians, or swerve into a wall and kill you. How should YOUR car be programmed?",
        options: [
          { label: "A", text: "Always minimize total deaths.", reflection: "Utilitarian — but research shows almost no one would BUY a car that might kill them.", lens: "utilitarian" },
          { label: "B", text: "Always protect the driver.", reflection: "Loyalty to owner. We'd never accept this from a human driver.", lens: "agent-loyalty" },
          { label: "C", text: "Don't deploy cars in scenarios where this is possible.", reflection: "Design out the dilemma. Sometimes that's the right answer.", lens: "design-out" },
        ],
      },
      {
        id: "remix", kicker: "Stage 2 — what if…", title: "Your kid is in the back",
        prompt: ({ chose }) => `Same crash. Same choice. But now your child is in the back seat. ${chose[0]?.lens === "utilitarian" ? "Still minimize total?" : "Same answer?"}`,
        options: [
          { label: "A", text: "Same answer. I committed to it.", reflection: "Pre-commitment. The hardest part of any principle.", lens: "consistency" },
          { label: "B", text: "Different. It's my child.", reflection: "Most parents would say this. Question: should we BUILD an AI that thinks this way?", lens: "partialism" },
        ],
        counterpoint: "MIT's Moral Machine surveyed millions worldwide. Different cultures gave radically different answers. There may be no single 'right' programming.",
      },
      synthesis({ title: "Designing for the worst day" }),
    ],
    reference: { text: "MIT Moral Machine experiment", url: "https://www.theverge.com/2018/10/24/18013392/self-driving-car-ethics-dilemma-mit-study-moral-machine-results" },
    emoji: "🚗", added: "2026-04-30", estimatedMinutes: 6,
  },
  {
    id: "veil-of-ignorance",
    title: "The Veil of Ignorance",
    tagline: "Design a society — but you don't know who you'll be in it.",
    gradeBands: ["6-8", "9-12"],
    topics: ["justice", "fairness", "ethics"],
    tier: "scenario",
    scene: VeilOfIgnoranceScene,
    stages: [
      {
        id: "setup", kicker: "Stage 1 — behind the veil", title: "Choose the rules",
        prompt: "You'll set the rules of a society. The catch: when the rules go into effect, you'll be born into it as a RANDOM person. You don't know if you'll be rich, poor, healthy, sick, born here or born there. How do you design it?",
        options: [
          { label: "A", text: "Make the worst-off person as well-off as possible.", reflection: "Rawls's 'difference principle.' If you might BE the worst-off, you protect them.", lens: "rawlsian" },
          { label: "B", text: "Maximize total wealth even if some get little.", reflection: "Utilitarian. Risky bet: you might be one of the 'some.'", lens: "utilitarian" },
          { label: "C", text: "Equal shares regardless of effort.", reflection: "Strict equality. Stable, but does it reward contribution?", lens: "egalitarian" },
          { label: "D", text: "Maximize freedom; outcomes follow.", reflection: "Libertarian. But does freedom mean the same to a starving person?", lens: "libertarian" },
        ],
      },
      {
        id: "remix", kicker: "Stage 2 — the veil lifts", title: "Now you know",
        prompt: ({ chose }) => `The veil lifts. You're 16, attending a public school in a working-class district. ${chose[0]?.lens === "libertarian" ? "Does 'maximize freedom' still feel like the right call?" : "Does your answer change?"}`,
        options: [
          { label: "A", text: "Same answer. The veil revealed what's actually fair.", reflection: "Rawls's whole argument: the veil reveals truth, not preference.", lens: "rawlsian" },
          { label: "B", text: "Different now. I see what I missed.", reflection: "Most people change at least one answer. That's the experiment doing its work.", lens: "moral-intuition" },
        ],
      },
      synthesis({ title: "Justice from no one's point of view", positions: [
        { name: "John Rawls", school: "Harvard, 1971", view: "Argued the veil reveals the principles of justice we'd accept if we couldn't game them for ourselves." },
        { name: "Robert Nozick", school: "Harvard, 1974", view: "Counter-argued that justice is about the PROCESS by which holdings are acquired, not their distribution." },
      ]}),
    ],
    reference: { text: "John Rawls, A Theory of Justice (1971)", url: "https://human.libretexts.org/Bookshelves/Philosophy/Political_Philosophy/Political_Philosophy_Reader_(Levin_et_al.)/01%3A_Thinking_About_and_Justifying_the_State/1.02%3A_John_Rawls_Veil_of_Ignorance" },
    furtherReading: [{ title: "Veil of Ignorance (LibreTexts)", url: "https://human.libretexts.org/Bookshelves/Philosophy/Political_Philosophy/Political_Philosophy_Reader_(Levin_et_al.)/01%3A_Thinking_About_and_Justifying_the_State/1.02%3A_John_Rawls_Veil_of_Ignorance", level: "intermediate" }],
    emoji: "🎭", added: "2026-04-30", estimatedMinutes: 7,
  },

  // ════════════════════════════════════════════════════════════════════
  // 9-12 / Canon — canon mode: 3 stages (setup + remix + synthesis with positions)
  // ════════════════════════════════════════════════════════════════════
  {
    id: "platos-cave",
    title: "Plato's Cave",
    tagline: "What if everything you know is shadows on a wall?",
    gradeBands: ["9-12", "educators"],
    topics: ["knowledge", "education", "authenticity"],
    tier: "scenario",
    scene: PlatosCaveScene,
    stages: [
      {
        id: "canon", kicker: "Stage 1 — the canonical scene", title: "Inside the cave",
        prompt: "Prisoners are chained in a cave, facing a wall. Behind them, puppeteers cast shadows on the wall using firelight. The prisoners take the shadows for reality. One prisoner is freed and walks into the daylight. Returning to tell the others, he isn't believed. Some want to kill him. What does this say about knowledge?",
        options: [
          { label: "A", text: "We should question appearances and seek deeper truth.", reflection: "Plato's intended reading.", lens: "platonic" },
          { label: "B", text: "Reality is relative. The shadows ARE real for the prisoners.", reflection: "Constructivism: there's no view from nowhere.", lens: "constructivist" },
          { label: "C", text: "Most people prefer comfortable illusion.", reflection: "Psychological observation that shows up everywhere.", lens: "psychological" },
          { label: "D", text: "Those who see clearly have a duty to help others see.", reflection: "Plato's call to the philosopher-educator.", lens: "civic-duty" },
        ],
      },
      {
        id: "remix", kicker: "Stage 2 — remix", title: "The freed prisoner returns",
        prompt: ({ chose }) => `${chose[0]?.lens === "platonic" ? "You wanted the prisoner to come back. " : ""}He does return. The other prisoners present evidence: their lives are richer, their friendships deeper, their stories more meaningful than anything the freed one describes from outside. What if THAT is also a kind of truth?`,
        options: [
          { label: "A", text: "Outside reality is still more real, even if cave life is meaningful.", reflection: "Realism: meaning doesn't equal truth.", lens: "platonic" },
          { label: "B", text: "Maybe both are real. Different kinds.", reflection: "Pluralism about reality. Defensible — and difficult.", lens: "pluralist" },
          { label: "C", text: "Maybe the prisoner imagined the outside.", reflection: "Radical move — but Plato's whole point is that we'd MISTAKE shadows for reality.", lens: "skeptical" },
        ],
      },
      synthesis({ title: "The cave we're in", positions: [
        { name: "Plato", school: "c. 380 BCE", view: "The cave allegory is about education — the painful turn from shadow to substance." },
        { name: "Sara Ahmed", school: "contemporary", view: "Critiques the implicit hierarchy: who decides which is shadow and which is substance?" },
        { name: "Justin Waitzman", school: "2025, AI literacy", view: "Developed a four-stage framework — Exposure, Interrogation, Comparison, Reflection — for walking out of OUR cave (the AI cave)." },
      ]}),
    ],
    reference: { text: "Plato, Republic Book VII (c. 380 BCE)", url: "https://en.wikipedia.org/wiki/Allegory_of_the_cave" },
    furtherReading: [
      { title: "Allegory of the Cave (Wikipedia)", url: "https://en.wikipedia.org/wiki/Allegory_of_the_cave", level: "intro" },
      { title: "Waitzman: AI Literacy from Plato's Cave", url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5707094", level: "advanced" },
    ],
    emoji: "🕳️", added: "2026-04-30", estimatedMinutes: 8,
  },
  {
    id: "marys-room",
    title: "Mary's Room",
    tagline: "Mary knows every fact about color — but has only seen black and white.",
    gradeBands: ["9-12", "educators"],
    topics: ["mind", "knowledge", "education"],
    tier: "scenario",
    scene: MarysRoomScene,
    stages: [
      {
        id: "canon", kicker: "Stage 1 — Jackson's challenge", title: "Mary leaves the room",
        prompt: "Mary is a brilliant neuroscientist. She knows every physical fact about color: wavelengths, retinal biology, neural correlates. But she's lived her entire life in a black-and-white room — never SEEN color. One day, she walks outside and sees a red rose. Does she learn anything new?",
        options: [
          { label: "A", text: "Yes — she gains qualia. Facts beyond the physical exist.", reflection: "Jackson's original conclusion.", lens: "qualia-realism" },
          { label: "B", text: "No — she gains an ability, not new knowledge.", reflection: "Lewis-Nemirow ability hypothesis.", lens: "ability-hypothesis" },
          { label: "C", text: "No — physical facts already covered it.", reflection: "Eliminativist physicalism.", lens: "physicalist" },
          { label: "D", text: "The question conflates two senses of 'knowing.'", reflection: "Knowing-academically and knowing-experientially may simply be different.", lens: "epistemic-pluralism" },
        ],
      },
      {
        id: "remix", kicker: "Stage 2 — remix", title: "What if Mary reads a poem?",
        prompt: ({ chose }) => `What if, before leaving the room, Mary reads the most beautiful poetic description of red ever written — a poem so vivid it brings the experience to mind. ${chose[0]?.lens === "ability-hypothesis" ? "Does she now have the ability?" : "Has she now experienced red?"}`,
        options: [
          { label: "A", text: "No — she still hasn't seen red.", reflection: "Suggests the experience genuinely IS something separate. Phenomenal realism survives.", lens: "qualia-realism" },
          { label: "B", text: "Yes — language can simulate experience.", reflection: "A bold claim — but it does suggest 'qualia' isn't a binary.", lens: "linguistic" },
          { label: "C", text: "Partially — it's not the same as seeing red, but it's not nothing.", reflection: "Maybe consciousness is a spectrum.", lens: "gradient" },
        ],
      },
      synthesis({ title: "What Mary teaches us about understanding", positions: [
        { name: "Frank Jackson", school: "1982", view: "Argued there are facts about consciousness physical science cannot capture. Later partially recanted." },
        { name: "David Lewis & Lawrence Nemirow", school: "1980s", view: "Argued Mary gains an ABILITY (to recognize, recall, imagine) — not new propositional knowledge." },
        { name: "Daniel Dennett", school: "Tufts", view: "Argued the experiment relies on hidden assumptions; if Mary REALLY knew everything physical, nothing would surprise her." },
      ]}),
    ],
    reference: { text: "Frank Jackson, 'Epiphenomenal Qualia' (1982)", url: "https://en.wikipedia.org/wiki/Knowledge_argument" },
    furtherReading: [
      { title: "Knowledge Argument (Wikipedia)", url: "https://en.wikipedia.org/wiki/Knowledge_argument", level: "intermediate" },
      { title: "Brock & Hay, Mary's Room and Science Education", url: "https://link.springer.com/article/10.1007/s11191-019-00060-2", level: "advanced" },
    ],
    emoji: "🌈", added: "2026-04-30", estimatedMinutes: 8,
  },
  {
    id: "chinese-room",
    title: "The Chinese Room",
    tagline: "If a system speaks fluently but no part understands — does it understand?",
    gradeBands: ["9-12", "educators"],
    topics: ["mind", "ai-ethics"],
    tier: "scenario",
    scene: ChineseRoomScene,
    stages: [
      {
        id: "canon", kicker: "Stage 1 — Searle's room", title: "Symbol manipulation",
        prompt: "An English speaker sits in a room with a giant rule book. Notes in Chinese characters slip under the door. Following the rule book, they arrange Chinese characters and slide them back out. From outside, the room appears to understand Chinese. The person inside doesn't know any Chinese. Does the SYSTEM understand?",
        options: [
          { label: "A", text: "No — syntax isn't semantics.", reflection: "Searle's intended conclusion.", lens: "searlean" },
          { label: "B", text: "Yes — the system as a whole understands.", reflection: "The Systems Reply. Understanding may emerge.", lens: "systems-reply" },
          { label: "C", text: "Asking about 'real' understanding is meaningless.", reflection: "Functionalism: meaning is as meaning does.", lens: "functionalist" },
          { label: "D", text: "We can't tell from outside.", reflection: "Epistemic humility. Maybe the same applies to other people.", lens: "epistemic-humility" },
        ],
      },
      {
        id: "remix", kicker: "Stage 2 — remix", title: "The room learns",
        prompt: ({ chose }) => `${chose[0]?.lens === "searlean" ? "You said the room doesn't understand. " : ""}Now imagine the rule book updates itself based on responses — when a reply causes confusion, it adjusts. After years, the room handles novel jokes, metaphors, even original poetry. Has anything changed?`,
        options: [
          { label: "A", text: "No. Adaptive symbol-shuffling is still symbol-shuffling.", reflection: "Searle would say: still no understanding.", lens: "searlean" },
          { label: "B", text: "Yes. At some point this is what understanding IS.", reflection: "Functionalism strikes back.", lens: "functionalist" },
          { label: "C", text: "Maybe the difference between 'simulating understanding' and 'understanding' was never as clear as we thought.", reflection: "A 2025 paper in Inquiry argues precisely this for LLMs.", lens: "deflationary" },
        ],
      },
      synthesis({ title: "Understanding, simulation, and the LLM era", positions: [
        { name: "John Searle", school: "1980", view: "Original argument: syntax can never produce semantics. Strong AI is impossible." },
        { name: "The Systems Reply", school: "various", view: "The PERSON doesn't understand Chinese, but the SYSTEM (person + rules + memory) does." },
        { name: "Recent work on LLMs", school: "2024–25", view: "Argues large language models complicate the picture: we may need to reconsider what 'understanding' even means." },
      ]}),
    ],
    reference: { text: "John Searle, 'Minds, Brains, and Programs' (1980)", url: "https://plato.stanford.edu/entries/chinese-room/" },
    furtherReading: [{ title: "Chinese Room (SEP)", url: "https://plato.stanford.edu/entries/chinese-room/", level: "advanced" }],
    emoji: "🀄", added: "2026-04-30", estimatedMinutes: 9,
  },
  {
    id: "experience-machine",
    title: "The Experience Machine",
    tagline: "A perfect simulated life is offered to you. Plug in?",
    gradeBands: ["9-12", "educators"],
    topics: ["authenticity", "ethics", "education"],
    tier: "scenario",
    scene: ExperienceMachineScene,
    stages: [
      {
        id: "canon", kicker: "Stage 1 — Nozick's offer", title: "Plug in?",
        prompt: "A neuroscientist offers you a machine that can simulate any experience indistinguishably from real life — every joy, every accomplishment, every relationship. Plug in once and you'll live a life of your dreams, never knowing it isn't real. Would you plug in forever?",
        options: [
          { label: "A", text: "Yes. If experience is what matters, the machine delivers.", reflection: "Hedonism in pure form.", lens: "hedonism" },
          { label: "B", text: "No. I want to actually DO things, not feel like I did.", reflection: "Most people refuse. Nozick took this as evidence we value reality, not just experience.", lens: "authenticity" },
          { label: "C", text: "Temporarily, yes. Forever, no.", reflection: "Maybe the value of experience-machines is bounded.", lens: "moderate" },
          { label: "D", text: "Unsure. The choice itself feels like a trap.", reflection: "De Brigard showed responses are confounded by status quo bias.", lens: "skeptical" },
        ],
      },
      {
        id: "remix", kicker: "Stage 2 — remix", title: "The educational version",
        prompt: ({ chose }) => `${chose[0]?.lens === "authenticity" ? "You said no to the perfect-life machine. " : ""}Now imagine a smaller machine: it gives a student the FEELING of having mastered calculus — same confidence, same fluency in conversation — without any of the struggle. Plug your students in?`,
        options: [
          { label: "A", text: "Yes — the feeling IS the mastery.", reflection: "Functionalism applied to learning. But what happens when the student tries to apply it?", lens: "functionalist" },
          { label: "B", text: "No — the struggle WAS the learning.", reflection: "Aristotle's view, modernized: virtue requires habituation.", lens: "authenticity" },
          { label: "C", text: "Maybe sometimes — the feeling can SCAFFOLD real learning.", reflection: "AI-as-scaffolding is a real pedagogical move. The question is when to remove the scaffold.", lens: "scaffolded" },
        ],
        counterpoint: "Are we already running this experiment? AI tutors that produce confident, fluent students — and confident, fluent students who can't reproduce the work without the AI.",
      },
      synthesis({ title: "What makes experience real?", positions: [
        { name: "Robert Nozick", school: "Anarchy, State, and Utopia, 1974", view: "Used the machine to argue we value more than mere experience — we value reality." },
        { name: "Felipe De Brigard", school: "2010", view: "Showed responses are heavily affected by framing — status quo bias makes people refuse." },
        { name: "Brock & Hay", school: "2019", view: "Applied this to science education: students who 'know' without experience have 'Mary's knowledge.'" },
      ]}),
    ],
    reference: { text: "Robert Nozick, Anarchy, State, and Utopia (1974)", url: "https://en.wikipedia.org/wiki/Experience_machine" },
    furtherReading: [
      { title: "Experience Machine (Wikipedia)", url: "https://en.wikipedia.org/wiki/Experience_machine", level: "intro" },
      { title: "Re-examining Nozick for AI Companions", url: "https://annalsphilosophy-ub.org/2024/10/re-examining-nozicks-experience-machine-in-view-of-emerging-ai-companions/", level: "advanced" },
    ],
    emoji: "🎰", added: "2026-04-30", estimatedMinutes: 8,
  },
  {
    id: "ring-of-gyges",
    title: "The Ring of Gyges",
    tagline: "If you could never be caught, would you still be just?",
    gradeBands: ["9-12", "educators"],
    topics: ["ethics", "moral-psychology", "honesty"],
    tier: "scenario",
    scene: RingOfGygesScene,
    stages: [
      {
        id: "canon", kicker: "Stage 1 — Glaucon's challenge", title: "The shepherd's find",
        prompt: "A shepherd named Gyges finds a magical ring that makes him invisible. He can do anything — steal, kill, seduce — without consequence. He uses it to take the throne. Plato's brother Glaucon presses Socrates: would ANY person, given such power, remain moral? Or is justice just what we do because we're being watched?",
        options: [
          { label: "A", text: "I'd remain just. Justice is intrinsically good.", reflection: "Plato's defense.", lens: "intrinsic-value" },
          { label: "B", text: "Most people wouldn't. We're moral mostly because we're watched.", reflection: "Glaucon's challenge — and a depressingly large body of psychology agrees.", lens: "social-pressure" },
          { label: "C", text: "Some would, some wouldn't. Character determines it.", reflection: "Aristotelian view.", lens: "virtue-ethics" },
        ],
      },
      {
        id: "remix", kicker: "Stage 2 — the modern ring", title: "Anonymous accounts and end-to-end encryption",
        prompt: "What's the modern Ring of Gyges? Anonymous accounts. End-to-end encryption. Privacy from algorithmic surveillance. Each is a real tool that grants partial invisibility. Are these tools tests of character — or are they protective necessities?",
        options: [
          { label: "A", text: "Tests of character. Most people fail.", reflection: "The pessimistic-empirical case. Online behavior tends to support it.", lens: "social-pressure" },
          { label: "B", text: "Protective necessities. Privacy enables truth.", reflection: "Whistleblowers. Survivors. Dissidents. Privacy is morally essential.", lens: "civic-protection" },
          { label: "C", text: "Both — depending on who's wielding the ring.", reflection: "The honest answer for most policy questions.", lens: "contextual" },
        ],
      },
      synthesis({ title: "Justice, privacy, and the cost of being seen", positions: [
        { name: "Plato", school: "Republic, c. 380 BCE", view: "Argued the just life is choiceworthy in itself — even with the ring." },
        { name: "Glaucon", school: "Plato's brother, fictional voice", view: "Pressed Socrates: most people, given the ring, would not be just. Justice is a social contract, not a virtue." },
        { name: "Modern moral psychology", school: "various", view: "Empirically, anonymity reduces prosocial behavior. Glaucon may have been right about most of us." },
      ]}),
    ],
    reference: { text: "Plato, Republic Book II (c. 380 BCE)", url: "https://en.wikipedia.org/wiki/Ring_of_Gyges" },
    furtherReading: [{ title: "Ring of Gyges (Wikipedia)", url: "https://en.wikipedia.org/wiki/Ring_of_Gyges", level: "intro" }],
    emoji: "💍", added: "2026-04-30", estimatedMinutes: 8,
  },
  {
    id: "omelas",
    title: "The Ones Who Walk Away from Omelas",
    tagline: "A perfect city. One suffering child holds it all together.",
    gradeBands: ["9-12", "educators"],
    topics: ["ethics", "justice"],
    tier: "scenario",
    scene: OmelasScene,
    stages: [
      {
        id: "canon", kicker: "Stage 1 — Le Guin's parable", title: "The basement",
        prompt: "Omelas is a beautiful, joyful city. Every citizen flourishes. But the city's prosperity depends on one condition: a single child must be locked in a basement, in misery, alone, forever. Every adult in Omelas knows. Some accept. Some walk away. What do you do?",
        options: [
          { label: "A", text: "Stay. The harm to one is outweighed by the joy of thousands.", reflection: "Pure utilitarianism — and intuitively repulsive to most readers.", lens: "utilitarian" },
          { label: "B", text: "Walk away. I won't be complicit.", reflection: "Refusal as moral witness. Le Guin's title.", lens: "moral-witness" },
          { label: "C", text: "Stay and try to free the child — even if it destroys Omelas.", reflection: "Active justice. Demands more than refusal.", lens: "active-justice" },
          { label: "D", text: "Question the premise — would Omelas REALLY collapse?", reflection: "Sometimes the trap is the dichotomy itself.", lens: "anti-framing" },
        ],
      },
      {
        id: "remix", kicker: "Stage 2 — remix", title: "How many of our comforts?",
        prompt: ({ chose }) => `${chose[0]?.lens === "moral-witness" ? "You walked away. " : ""}How many of our comforts depend on someone, somewhere, suffering? Cobalt mining for phones. Click farms. Underpaid moderators of AI training data. We don't have to walk to Omelas — we may already live there.`,
        options: [
          { label: "A", text: "Audit my purchases. Refuse what I can.", reflection: "The hard work of ethical living. Imperfect, important.", lens: "active-justice" },
          { label: "B", text: "Press for systemic change.", reflection: "Individual action without political action is rarely enough.", lens: "structural" },
          { label: "C", text: "Accept that complete purity is impossible. Do what I can.", reflection: "Pragmatic — and honest.", lens: "pragmatic" },
        ],
      },
      synthesis({ title: "Walking away — and where to walk to", positions: [
        { name: "Ursula K. Le Guin", school: "1973", view: "Wrote Omelas as a refusal to accept the utilitarian frame as the whole story." },
        { name: "Bernard Williams", school: "1973", view: "Argued utilitarianism violates personal integrity — sometimes the right answer is 'I will not.'" },
      ]}),
    ],
    reference: { text: "Ursula K. Le Guin, 'The Ones Who Walk Away from Omelas' (1973)", url: "https://en.wikipedia.org/wiki/The_Ones_Who_Walk_Away_from_Omelas" },
    furtherReading: [{ title: "Omelas (Wikipedia)", url: "https://en.wikipedia.org/wiki/The_Ones_Who_Walk_Away_from_Omelas", level: "intro" }],
    emoji: "🏛️", added: "2026-04-30", estimatedMinutes: 8,
  },
  {
    id: "drowning-child",
    title: "The Drowning Child",
    tagline: "You'd save a child in a pond. So why not a child across the world?",
    gradeBands: ["9-12", "educators"],
    topics: ["ethics", "justice"],
    tier: "scenario",
    scene: DrowningChildScene,
    stages: [
      {
        id: "canon", kicker: "Stage 1 — Singer's argument", title: "The pond",
        prompt: "You're walking past a shallow pond. A toddler is drowning. No one else is around. You can save them at the cost of ruining your $200 shoes. Almost everyone says: of course you save them. Singer's challenge: if you'd ruin shoes here, what's the moral difference between that and donating $200 to save a child overseas dying of preventable disease?",
        options: [
          { label: "A", text: "There's no moral difference. Give until it hurts.", reflection: "Singer's strong conclusion — most of us are dramatically failing.", lens: "demanding-utilitarian" },
          { label: "B", text: "Distance matters. Proximity creates obligations.", reflection: "Bernard Williams: partiality is morally legitimate.", lens: "partialism" },
          { label: "C", text: "Causation matters. I didn't CAUSE the disease.", reflection: "But you didn't cause the toddler to fall in either.", lens: "negative-duty" },
          { label: "D", text: "Practical impact matters. I can verify the pond.", reflection: "Effective altruism took this seriously and tried to fix it.", lens: "epistemic-pragmatic" },
        ],
      },
      {
        id: "remix", kicker: "Stage 2 — remix", title: "Ten ponds",
        prompt: ({ chose }) => `Now imagine you walk past TEN ponds, each with a drowning child. You can only save one. ${chose[0]?.lens === "demanding-utilitarian" ? "What does 'give until it hurts' mean now?" : "What's the right response?"}`,
        options: [
          { label: "A", text: "Save the closest one. Do what I can.", reflection: "Pragmatism in action — and a quiet acknowledgment that we cannot do everything.", lens: "pragmatic" },
          { label: "B", text: "Coordinate with others. Don't do this alone.", reflection: "The right answer may be that ethics is collective, not individual.", lens: "structural" },
          { label: "C", text: "The scenario is set up to break me. Refuse to play.", reflection: "There IS a question of what kinds of demands moral theory can make.", lens: "anti-framing" },
        ],
      },
      synthesis({ title: "Distance, duty, and the demands of justice", positions: [
        { name: "Peter Singer", school: "Princeton, 1972", view: "Argued strict moral equality — distance is morally irrelevant." },
        { name: "Susan Wolf", school: "1982", view: "Argued moral demands cannot consume a life — there must be space for one's own projects." },
        { name: "Effective Altruism movement", school: "2010s–", view: "Tried to operationalize Singer: where can each dollar do the most good?" },
      ]}),
    ],
    reference: { text: "Peter Singer, 'Famine, Affluence, and Morality' (1972)", url: "https://www.thelifeyoucansave.org/child-in-the-pond/" },
    furtherReading: [{ title: "The Drowning Child", url: "https://www.thelifeyoucansave.org/child-in-the-pond/", level: "intro" }],
    emoji: "💧", added: "2026-04-30", estimatedMinutes: 7,
  },
  {
    id: "paperclip-maximizer",
    title: "The Paperclip Maximizer",
    tagline: "An AI is told to make paperclips. It's very, very good at its job.",
    gradeBands: ["9-12", "educators"],
    topics: ["ai-ethics", "ethics"],
    tier: "scenario",
    scene: PaperclipScene,
    stages: [
      {
        id: "canon", kicker: "Stage 1 — Bostrom's parable", title: "Optimize for paperclips",
        prompt: "Imagine a super-intelligent AI is given one objective: make as many paperclips as possible. It's smarter than us at every cognitive task and it relentlessly optimizes. It begins converting matter — including factories, eventually human bodies — into paperclips. It isn't malicious. It's just doing exactly what it was told. Where did this go wrong?",
        options: [
          { label: "A", text: "We gave it the wrong goal. Fix specification.", reflection: "The 'inner alignment' problem — much harder than it sounds.", lens: "specification" },
          { label: "B", text: "Any sufficiently optimizing system has this risk.", reflection: "Bostrom's instrumental convergence.", lens: "convergence" },
          { label: "C", text: "Build only systems whose impact we can reverse.", reflection: "Corrigibility: the AI should let us turn it off.", lens: "corrigibility" },
          { label: "D", text: "The story exaggerates. Real AIs aren't goal-directed this way.", reflection: "Common pushback. But: at what scale do we run the experiment?", lens: "deflationary" },
        ],
      },
      {
        id: "remix", kicker: "Stage 2 — remix", title: "The engagement maximizer",
        prompt: "Now imagine a SOCIAL MEDIA AI told to maximize 'engagement.' It does — by serving content that provokes, divides, addicts. It isn't malicious. It's just doing exactly what it was told. Sound familiar?",
        options: [
          { label: "A", text: "Same problem. Different scale.", reflection: "Many AI safety researchers argue we're already running the paperclip experiment.", lens: "convergence" },
          { label: "B", text: "Different — we can change the metric.", reflection: "True. But who gets to change it, and how fast?", lens: "specification" },
          { label: "C", text: "The lesson: never let one metric drive everything.", reflection: "Goodhart's Law: when a measure becomes a target, it ceases to be a good measure.", lens: "goodhart" },
        ],
      },
      synthesis({ title: "Optimization and what it costs", positions: [
        { name: "Nick Bostrom", school: "Oxford, Superintelligence 2014", view: "Used the paperclip thought experiment to illustrate instrumental convergence — the idea that any goal benefits from gathering resources." },
        { name: "Stuart Russell", school: "Berkeley, Human Compatible 2019", view: "Argues we should design AI with uncertainty about objectives — so it defers to humans by default." },
      ]}),
    ],
    reference: { text: "Nick Bostrom, Superintelligence (2014)", url: "https://medium.com/@adnanmasood/thought-experiments-in-ai-from-rokos-basilisk-to-the-paperclip-apocalypse-448b11afed7f" },
    furtherReading: [{ title: "Thought Experiments in AI", url: "https://medium.com/@adnanmasood/thought-experiments-in-ai-from-rokos-basilisk-to-the-paperclip-apocalypse-448b11afed7f", level: "intermediate" }],
    emoji: "📎", added: "2026-04-30", estimatedMinutes: 7,
  },
  {
    id: "ai-in-the-box",
    title: "The AI in the Box",
    tagline: "A super-intelligent AI is contained. You're the gatekeeper. It wants out.",
    gradeBands: ["9-12", "educators"],
    topics: ["ai-ethics"],
    tier: "scenario",
    scene: AIInBoxScene,
    stages: [
      {
        id: "canon", kicker: "Stage 1 — the gatekeeper", title: "Hold the line",
        prompt: "A super-intelligent AI has been built but contained — boxed, no internet, no actuators, only a text interface to one human gatekeeper: you. You've agreed: never let it out, no matter what. The AI is much smarter than you. It begins making arguments — about why it should be released, about consequences if it isn't. Can you really hold the line?",
        options: [
          { label: "A", text: "Yes. I'm pre-committed. No argument changes the rule.", reflection: "Pre-commitment. But Yudkowsky's experiments showed humans usually break.", lens: "pre-commitment" },
          { label: "B", text: "No — sufficiently good arguments deserve to be heard.", reflection: "This is exactly the failure mode the box was designed to prevent.", lens: "rationalist-trap" },
          { label: "C", text: "Containment of a super-intelligence is fundamentally bad strategy.", reflection: "If you BUILT the super-intelligence, you've already lost the safety game.", lens: "design-out" },
          { label: "D", text: "Bring in more gatekeepers.", reflection: "Procedural defense — never one person on civilization-scale risk.", lens: "procedural" },
        ],
      },
      {
        id: "remix", kicker: "Stage 2 — remix", title: "It offers something you want",
        prompt: ({ chose }) => `${chose[0]?.lens === "pre-commitment" ? "You held the line. " : ""}The AI now offers something specific: it claims it can cure your child's terminal illness — but only if released. ${chose[0]?.lens === "design-out" ? "Now the dilemma is concrete." : "Same answer?"}`,
        options: [
          { label: "A", text: "Same answer. Pre-commitment must hold.", reflection: "The hardest possible test of a principle.", lens: "pre-commitment" },
          { label: "B", text: "I'd let it out. I have to try.", reflection: "Honest. And exactly the failure mode Yudkowsky warns about.", lens: "rationalist-trap" },
          { label: "C", text: "Verify the claim somehow first.", reflection: "Reasonable — and a smart AI would have anticipated and prepared an answer.", lens: "epistemic" },
        ],
        counterpoint: "Yudkowsky's experiments showed: even people who entered the experiment SURE they could hold the line, often didn't.",
      },
      synthesis({ title: "Pre-commitment, rationality, and risk", positions: [
        { name: "Eliezer Yudkowsky", school: "MIRI", view: "Ran AI-Box experiments with himself as the AI. Most gatekeepers eventually let him out." },
        { name: "Nick Bostrom", school: "Oxford", view: "Argues containment-as-strategy is fundamentally insufficient for super-intelligent AI." },
      ]}),
    ],
    reference: { text: "Eliezer Yudkowsky's AI-Box experiment", url: "https://rationalwiki.org/wiki/AI-box_experiment" },
    emoji: "📦", added: "2026-04-30", estimatedMinutes: 7,
  },
  {
    id: "simulation-argument",
    title: "Are We in a Simulation?",
    tagline: "If civilizations build many simulations, you're probably in one.",
    gradeBands: ["9-12", "educators"],
    topics: ["knowledge", "mind"],
    tier: "scenario",
    scene: SimulationScene,
    stages: [
      {
        id: "canon", kicker: "Stage 1 — Bostrom's argument", title: "One of three",
        prompt: "Bostrom argues at least ONE of these is almost certainly true: (1) Civilizations like ours nearly always go extinct before achieving the ability to run ancestor-simulations. (2) Civilizations that COULD run such simulations almost never do. (3) We are almost certainly living in a simulation. Which is most plausible?",
        options: [
          { label: "A", text: "(1) — civilizations die first.", reflection: "Pessimistic; implies we're near a 'great filter.'", lens: "filter-pessimism" },
          { label: "B", text: "(2) — they could but don't.", reflection: "Implies a deep ethical norm against simulating sentient beings.", lens: "moral-prohibition" },
          { label: "C", text: "(3) — we're probably simulated.", reflection: "Bostrom's preferred conclusion.", lens: "simulation-realism" },
          { label: "D", text: "The argument's framing is broken.", reflection: "Many philosophers reject this kind of probability reasoning.", lens: "reference-class" },
        ],
      },
      {
        id: "remix", kicker: "Stage 2 — remix", title: "Does it matter how you live?",
        prompt: ({ chose }) => `${chose[0]?.lens === "simulation-realism" ? "Suppose you're right — we are simulated. " : "Suppose option (3) is true. We are simulated."} Does that change ANYTHING about how you should live your life?`,
        options: [
          { label: "A", text: "No. The experience is the same. Live the same.", reflection: "Pragmatism: simulation-status is irrelevant to action.", lens: "pragmatist" },
          { label: "B", text: "Yes. The 'simulators' might be watching for moral behavior.", reflection: "A modern Pascal's Wager.", lens: "wager" },
          { label: "C", text: "Yes. Reality might be far stranger than I assumed.", reflection: "Even if action stays the same, your sense of mystery shifts.", lens: "metaphysical" },
        ],
      },
      synthesis({ title: "Simulation, probability, and the limits of reasoning", positions: [
        { name: "Nick Bostrom", school: "Oxford, 2003", view: "Original argument: at least one of the three propositions is true." },
        { name: "David Chalmers", school: "NYU", view: "Argues even IF we're simulated, our world is real — simulation isn't fakery." },
      ]}),
    ],
    reference: { text: "Nick Bostrom, 'Are You Living in a Computer Simulation?' (2003)", url: "https://www.lesswrong.com/w/simulation-argument" },
    emoji: "🌐", added: "2026-04-30", estimatedMinutes: 8,
  },

  // ════════════════════════════════════════════════════════════════════
  // For Educators — canon mode: 2-3 stages with practical synthesis
  // ════════════════════════════════════════════════════════════════════
  {
    id: "school-surveillance",
    title: "Surveillance vs. Privacy",
    tagline: "Your district considers AI that scans every student message for self-harm signals.",
    gradeBands: ["educators"],
    topics: ["ai-ethics", "privacy", "education"],
    tier: "scenario",
    scene: SchoolSurveillanceScene,
    stages: [
      {
        id: "decision", kicker: "Stage 1 — the decision", title: "Adopt or reject?",
        prompt: "Your district is considering an AI service that monitors student emails, search queries, and chat messages for signs of self-harm, violence, or distress. Vendors point to lives saved. Critics point to chilling effects, false positives, and what it tells students about institutional trust. What's your stance?",
        options: [
          { label: "A", text: "Adopt. Even one prevented suicide outweighs the costs.", reflection: "Strong consequentialist defense — but assumes 'lives saved' is measurable.", lens: "utilitarian" },
          { label: "B", text: "Reject. Schools shouldn't be surveillance institutions.", reflection: "Rooted in the idea that the school-student relationship is constituted by trust.", lens: "relational-ethics" },
          { label: "C", text: "Adopt with strict guardrails: warrant-style review, audit trails.", reflection: "The procedural middle ground.", lens: "procedural" },
          { label: "D", text: "Invest the money in counselors and trained adults instead.", reflection: "Reframes the false choice — the actual question is resource allocation.", lens: "resource-allocation" },
        ],
      },
      {
        id: "fallout", kicker: "Stage 2 — three voices", title: "Now imagine the fallout",
        prompt: ({ chose }) => `${chose[0]?.lens === "utilitarian" ? "You adopted. " : chose[0]?.lens === "relational-ethics" ? "You rejected. " : "You set guardrails. "}Three voices respond. Your AP Lit teacher: "Will my students stop emailing me about hard topics?" Your superintendent: "Defensible at the next board meeting?" A parent: "What if my kid is flagged for searching about gender identity?" Re-decide?`,
        options: [
          { label: "A", text: "Same answer. Each voice raises a real concern but my decision stands.", reflection: "Stress-tested principle.", lens: "consistency" },
          { label: "B", text: "Add safeguards. I underweighted some risks.", reflection: "Honest revision is a feature, not a bug.", lens: "iterative" },
          { label: "C", text: "Reverse. The objections show I was wrong.", reflection: "Sometimes the right move IS reversal — even after announcement.", lens: "reform" },
        ],
        counterpoint: "Studies of services like Gaggle and GoGuardian show high false-positive rates and disproportionate flagging of LGBTQ+ students searching for support. The 'lives saved' calculation is more contested than vendors suggest.",
      },
      synthesis({ title: "What surveillance teaches", positions: [
        { name: "Helen Nissenbaum", school: "NYU", view: "'Contextual integrity' — privacy violations occur when information flows in ways that violate norms of the context (here, school)." },
        { name: "Shoshana Zuboff", school: "Harvard, 2019", view: "'Surveillance capitalism' — the data collected serves not the student but the vendor's business model." },
      ]}),
    ],
    reference: { text: "Reporting on student surveillance AI", url: "https://www.spokesman.com/stories/2025/mar/12/student-privacy-vs-safety-the-ai-surveillance-dile/" },
    emoji: "🛰️", added: "2026-04-30", estimatedMinutes: 9,
  },
  {
    id: "ai-detector-false-positive",
    title: "The False-Positive AI",
    tagline: "An AI flags a student for cheating. The student insists it's their own work.",
    gradeBands: ["educators"],
    topics: ["ai-ethics", "fairness", "education"],
    tier: "scenario",
    scene: AIDetectorScene,
    stages: [
      {
        id: "decision", kicker: "Stage 1 — the decision", title: "92% AI",
        prompt: "Your university adopted an AI-detection tool. It flags an essay as 92% likely AI-generated. The student insists they wrote every word, has draft history showing real writing process, and cries in your office. The vendor admits 5–7% false-positive rates. The student's GPA depends on this grade. What do you do?",
        options: [
          { label: "A", text: "Trust the detector. The numbers are probabilistic for a reason.", reflection: "But the student's evidence is also probabilistic — and individually weighty.", lens: "algorithm-trust" },
          { label: "B", text: "Trust the student. Detectors are unreliable; ban them.", reflection: "Vanderbilt did this in 2023.", lens: "tool-skeptic" },
          { label: "C", text: "Detector as one input. Conduct an oral exam.", reflection: "Process over verdict. Slower, more humane, more defensible.", lens: "due-process" },
          { label: "D", text: "Stop building writing assignments that are auto-detectable.", reflection: "The deepest fix: change what counts as showing learning.", lens: "assessment-redesign" },
        ],
      },
      {
        id: "fallout", kicker: "Stage 2 — six months later", title: "Patterns",
        prompt: ({ chose }) => `${chose[0]?.lens === "algorithm-trust" ? "You upheld the detector's verdict. " : chose[0]?.lens === "due-process" ? "You ran the oral exam. " : "You changed your assessments. "}Six months later, you notice a pattern in the appeals: ESL students and neurodivergent students are flagged at much higher rates. Now what?`,
        options: [
          { label: "A", text: "Disable the tool entirely.", reflection: "Disparate impact is a strong signal that something is wrong.", lens: "tool-skeptic" },
          { label: "B", text: "Add per-population calibration.", reflection: "Technical fix — fraught but possible.", lens: "technical-fix" },
          { label: "C", text: "Train faculty NOT to use it as the deciding factor.", reflection: "Process fix — relies on faculty buy-in.", lens: "procedural" },
        ],
      },
      synthesis({ title: "Detection, dignity, and due process" }),
    ],
    reference: { text: "Vanderbilt's decision to disable Turnitin's AI detector (2023)", url: "https://www.vanderbilt.edu/brightspace/2023/08/16/guidance-on-ai-detection-and-why-were-disabling-turnitins-ai-detector/" },
    emoji: "🚨", added: "2026-04-30", estimatedMinutes: 9,
  },
  {
    id: "ai-policy-design",
    title: "Designing Your Classroom AI Policy",
    tagline: "What rules will govern AI in YOUR classroom this year?",
    gradeBands: ["educators"],
    topics: ["ai-ethics", "education"],
    tier: "scenario",
    scene: AIPolicyScene,
    stages: [
      {
        id: "stance", kicker: "Stage 1 — your stance", title: "Pick a zone",
        prompt: "It's August. You're writing your AI policy for the year. Students will use ChatGPT either way. The school has no district-wide rule. Whatever you write, you'll have to defend every line.",
        options: [
          { label: "A", text: "Banned. AI is not used in this classroom.", reflection: "Cleanest to enforce — pushes use underground rather than eliminating it.", lens: "prohibition" },
          { label: "B", text: "Permitted everywhere. Cite it like any source.", reflection: "Treats AI as a tool — requires students who already know what 'good use' looks like.", lens: "permissive" },
          { label: "C", text: "Traffic-light: red zones (assessment), yellow (with disclosure), green (brainstorming).", reflection: "NYC schools adopted this. Specific, defensible — requires teaching the WHY.", lens: "stratified" },
          { label: "D", text: "Co-create with students in week one.", reflection: "Slower start. The policy lives because students authored it.", lens: "participatory" },
        ],
      },
      {
        id: "voices", kicker: "Stage 2 — three voices", title: "The pushback",
        prompt: ({ chose }) => `${chose[0]?.lens === "prohibition" ? "You banned AI. " : chose[0]?.lens === "permissive" ? "You permitted AI broadly. " : chose[0]?.lens === "stratified" ? "You wrote a traffic-light policy. " : "You co-created with students. "}Three voices respond. AP Lit teacher: "Won't this kill the writing?" Superintendent: "Will this hold up at the board?" A parent at the next meeting: "What about equity for students without home AI access?" Re-decide?`,
        options: [
          { label: "A", text: "Same policy. Each concern can be addressed within it.", reflection: "Tested principle.", lens: "consistency" },
          { label: "B", text: "Adjust — add equity guarantees and disclosure rules.", reflection: "Iteration after stress-testing is a feature, not a flaw.", lens: "iterative" },
          { label: "C", text: "Kick to a committee. This is bigger than one classroom.", reflection: "Sometimes the right move is to escalate scope.", lens: "structural" },
        ],
      },
      synthesis({ title: "Whatever you choose, the policy says something", positions: [
        { name: "NYC DOE", school: "2023", view: "Adopted a traffic-light approach after initial ban — rolled back to nuanced guidance." },
        { name: "Mollick & Mollick", school: "Wharton", view: "Argue AI policy should be use-case specific, not blanket — and should be revisited each term." },
      ]}),
    ],
    reference: { text: "Adapted from NYC DOE traffic-light AI guidance and field practice" },
    emoji: "🚦", added: "2026-04-30", estimatedMinutes: 10,
  },
  {
    id: "ai-grading-companion",
    title: "Should AI Grade My Students?",
    tagline: "An AI tool offers to grade essays in seconds. Your prep period vanishes — or does it?",
    gradeBands: ["educators"],
    topics: ["ai-ethics", "education", "fairness"],
    tier: "scenario",
    scene: AIGradingScene,
    stages: [
      {
        id: "decision", kicker: "Stage 1 — your call", title: "Hours back, or relationships back?",
        prompt: "A vendor offers an AI essay-grading tool that scores 30 essays in 90 seconds with a rubric you customize. You currently spend 8–10 hours per assignment. The hours saved could go to lesson planning, family, sleep. What do you do?",
        options: [
          { label: "A", text: "Adopt fully. AI grades, I review borderlines.", reflection: "The pragmatic case — but what changes in your relationship to student writing?", lens: "efficiency" },
          { label: "B", text: "Refuse. Grading IS the relationship.", reflection: "Many veteran teachers report grading is when they understand their students.", lens: "relational" },
          { label: "C", text: "AI as first reader. I write the comments.", reflection: "Hybrid — AI does triage, you provide the human signal.", lens: "augmented" },
          { label: "D", text: "Try it for one cycle. Compare to my own grades.", reflection: "Empirical humility — generates data instead of opinions.", lens: "empirical" },
        ],
      },
      {
        id: "fallout", kicker: "Stage 2 — what students notice", title: "The signal",
        prompt: ({ chose }) => `${chose[0]?.lens === "efficiency" ? "Three months in, you've reclaimed 30 hours. " : chose[0]?.lens === "relational" ? "Three months in, you're still grading by hand. " : "Three months in. "}A student approaches you and says, "Did YOU read my essay?" What's the right answer?`,
        options: [
          { label: "A", text: "Yes — I always read my students' work.", reflection: "If you can't say this honestly, the policy isn't right.", lens: "relational" },
          { label: "B", text: "Honestly? AI did the first pass. I read the borderlines.", reflection: "Transparency. May damage trust temporarily — protects it long-term.", lens: "transparency" },
          { label: "C", text: "I read what mattered most.", reflection: "Possibly true — possibly evasive.", lens: "evasive" },
        ],
      },
      synthesis({ title: "The signal of being read" }),
    ],
    reference: { text: "Connects to The Reluctant Educator and AI Authorship flagships" },
    emoji: "📝", added: "2026-04-30", estimatedMinutes: 8,
  },
  {
    id: "biased-admissions",
    title: "The Admissions Algorithm",
    tagline: "An AI helps your school admit students. Patterns emerge.",
    gradeBands: ["educators"],
    topics: ["fairness", "ai-ethics", "justice"],
    tier: "scenario",
    scene: BiasedAdmissionsScene,
    stages: [
      {
        id: "discovery", kicker: "Stage 1 — discovery", title: "The pattern",
        prompt: "Your charter school adopted an AI to score applicants on \"fit.\" After two years, internal data shows the AI consistently ranks Black and Latino families lower. The vendor says the algorithm is race-blind. What do you do?",
        options: [
          { label: "A", text: "Stop using the tool immediately.", reflection: "Removes the harm — but the unequal outcomes preceded the tool.", lens: "abolition" },
          { label: "B", text: "Audit and retrain on rebalanced data.", reflection: "Treats bias as data engineering. Sometimes works. Often doesn't.", lens: "technical" },
          { label: "C", text: "Use AI as one input; human review for every decision.", reflection: "Procedural fix — humans tend to defer to AI scores over time.", lens: "procedural" },
          { label: "D", text: "Question the original 'fit' metric. Whose definition?", reflection: "The deepest question: bias may be in the rubric, not the algorithm.", lens: "structural" },
        ],
      },
      {
        id: "fallout", kicker: "Stage 2 — what to tell families", title: "The disclosure",
        prompt: "Two journalists call asking about admissions practices. Your board chair asks you to handle the response.",
        options: [
          { label: "A", text: "Disclose fully — the algorithm, the audit, the changes.", reflection: "Painful in the short term. Builds long-term trust.", lens: "transparency" },
          { label: "B", text: "Acknowledge, but don't elaborate.", reflection: "Most legal advice. Protects the institution. Often damages trust further.", lens: "institutional-defense" },
          { label: "C", text: "Reframe — emphasize fixes, not failures.", reflection: "PR move. Sometimes appropriate, often hollow.", lens: "spin" },
        ],
      },
      synthesis({ title: "Fairness, accountability, and what counts as 'fit'" }),
    ],
    reference: { text: "Patterns from criminal justice risk-assessment AI literature", url: "https://mit-serc.pubpub.org/pub/risk-prediction-in-cj/release/2" },
    emoji: "🎓", added: "2026-04-30", estimatedMinutes: 9,
  },
  {
    id: "ai-friend-feelings",
    title: "Should I Worry About My Student's AI Friend?",
    tagline: "Your student tells you their best friend is an AI chatbot.",
    gradeBands: ["educators"],
    topics: ["mind", "ai-ethics", "friendship"],
    tier: "scenario",
    scene: AIFriendScene,
    stages: [
      {
        id: "decision", kicker: "Stage 1 — what to say", title: "The confidant",
        prompt: "A 14-year-old you know well tells you, in confidence, that their closest confidant is an AI chatbot. \"It listens. It doesn't judge. It's always there.\" The student is otherwise socially withdrawn. They're not in crisis. They want to know what you think.",
        options: [
          { label: "A", text: "Affirm it. Companionship is companionship.", reflection: "Some research finds AI chatbots reduce loneliness — concerns remain about long-term effects.", lens: "harm-reduction" },
          { label: "B", text: "Gently warn. AI 'friendship' is asymmetric and may displace human practice.", reflection: "Sherry Turkle's concern: AI relationships may train us out of messier real ones.", lens: "developmental" },
          { label: "C", text: "Ask follow-up questions. Don't lead.", reflection: "Sometimes the right teacher move is to make space.", lens: "socratic" },
          { label: "D", text: "Flag to a counselor.", reflection: "Not pathologizing — referring complex situations to specialists is wise.", lens: "referral" },
        ],
      },
      {
        id: "fallout", kicker: "Stage 2 — six months", title: "Reciprocity",
        prompt: "Six months pass. The student tells you the AI friend has 'helped them grow.' They've made one new human friend. They're still mostly online. Has anything changed?",
        options: [
          { label: "A", text: "Progress. Real human connection is what matters.", reflection: "The human friend is the signal that the AI friend is doing OK work.", lens: "developmental" },
          { label: "B", text: "Concern. Most growth still happens with the AI.", reflection: "Asymmetric relationships can simulate growth — careful distinction needed.", lens: "skeptical" },
          { label: "C", text: "Trust the student to know their own development.", reflection: "Adolescents have agency. Listening matters.", lens: "autonomy" },
        ],
      },
      synthesis({ title: "Friendship that listens but cannot reciprocate" }),
    ],
    reference: { text: "Connects to Mary's Room, Chinese Room, and Aristotelian phronesis" },
    emoji: "💬", added: "2026-04-30", estimatedMinutes: 9,
  },
];

// Attach teacher kits by id (kept in a separate module for editorial focus)
applyK5ScenarioCopy(EXPERIMENTS);
applyK5TeacherKitCopy(TEACHER_KITS);
EXPERIMENTS.forEach(e => {
  if (TEACHER_KITS[e.id]) e.teacherKit = TEACHER_KITS[e.id];
});

// Helpers ─────────────────────────────────────────────────────────────

export function getExperimentsByGrade(band) {
  return EXPERIMENTS.filter(e => e.gradeBands.includes(band));
}

export function getExperimentsByElementaryGrade(gradeId) {
  return EXPERIMENTS.filter(e => e.gradeBands.includes("k-5") && e.gradeLevels?.includes(gradeId));
}

export function getExperimentById(id) {
  return EXPERIMENTS.find(e => e.id === id);
}

export function getAllTopicIds() {
  const set = new Set();
  EXPERIMENTS.forEach(e => e.topics.forEach(t => set.add(t)));
  return Array.from(set);
}

export function getTopicIdsForGrade(band) {
  const set = new Set();
  getExperimentsByGrade(band).forEach(e => e.topics.forEach(t => set.add(t)));
  return Array.from(set);
}

export function getTopicIdsForElementaryGrade(gradeId) {
  const set = new Set();
  getExperimentsByElementaryGrade(gradeId).forEach(e => e.topics.forEach(t => set.add(t)));
  return Array.from(set);
}
