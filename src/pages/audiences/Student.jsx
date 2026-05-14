import AudiencePage from "./AudiencePage.jsx";
import { C } from "../../theme.js";

const config = {
  eyebrow: "For Students",
  accent: C.teal,
  title: "If you're a student, start here.",
  subtitle: "Thought experiments first. They're built to argue with — not to memorize.",
  intro: "There are no grades here. No quizzes. The work is in thinking out loud about questions that don't have a single right answer. Pick the door that matches how old you are, and you'll land in the right room.",

  ageBandsLabel: "Pick the door for your grade",
  ageBandsBlurb: "Each door opens onto stories and dilemmas written for that age. You can always switch rooms once you're inside.",
  ageBands: [
    {
      route: "thought-experiments/k-5",
      eyebrow: "K – 5",
      title: "Elementary",
      desc: "Stories about fairness, AI helpers, and big feelings — with read-aloud built in.",
      color: C.coral,
    },
    {
      route: "thought-experiments/6-8",
      eyebrow: "Grades 6 – 8",
      title: "Middle School",
      desc: "Story-based dilemmas where the choices have real edges. Identity, fairness, AI, what counts as your work.",
      color: C.gold,
    },
    {
      route: "thought-experiments/9-12",
      eyebrow: "Grades 9 – 12",
      title: "High School",
      desc: "Plato's Cave, Mary's Room, the Chinese Room — the canon, plus the AI dilemmas of right now.",
      color: C.ocean,
    },
  ],

  stepsLabel: "Once you've picked a room, here's a way through",
  stepsBlurb: "These are useful at any age — but the experiments and essays will read more easily once you've started inside the right door.",
  steps: [
    {
      route: "thought-experiments/9-12",
      title: "Try a thought experiment first",
      copy: "Pick one and walk all the way through. The first time you do this, you'll feel the difference between memorizing and reasoning. That's the whole point.",
      cta: "Open the canon",
      color: C.coral,
    },
    {
      route: "ai-consciousness",
      title: "Read one essay when you're ready for more",
      copy: "The Consciousness Line is a longer read about what it means to say something has a mind. Useful after the thought experiments, less so before.",
      cta: "Read the essay",
      color: C.gold,
    },
    {
      route: "thought-experiments/journal",
      title: "Keep a record of your own reasoning",
      copy: "The Decision Journal saves your choices and notes on your own device. Nothing is sent anywhere. Useful for arguing with your own past self later.",
      cta: "Open the journal",
      color: C.teal,
    },
    {
      route: "thought-experiments/toolkit",
      title: "Use the Dialogue Toolkit if you want to run one with friends",
      copy: "Five Socratic moves, sentence stems, and discussion protocols. Useful when you want to talk through a thought experiment with someone — instead of just reading it alone.",
      cta: "Open the toolkit",
      color: C.ocean,
    },
  ],

  tailLabel: "Or wander somewhere else",
  tail: [
    { id: "audiences/teacher", title: "Are you a teacher?", desc: "Different doorway in", color: C.gold },
    { id: "audiences/parent", title: "Parent or family?", desc: "Conversations to have at home", color: C.coral },
    { id: "thought-experiments", title: "Thought Experiments hub", desc: "The full library", color: C.teal },
  ],
};

export default function Student({ navigate }) {
  return <AudiencePage navigate={navigate} config={config} />;
}
