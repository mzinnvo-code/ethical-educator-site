import AudiencePage from "./AudiencePage.jsx";
import { C } from "../../theme.js";

const config = {
  eyebrow: "For Parents & Families",
  accent: C.coral,
  title: "Conversations to have at the kitchen table.",
  subtitle: "AI is in your child's classroom, on their phone, behind their homework. The path below is a way to talk about it that doesn't require you to be a philosopher.",
  intro: "Most parenting around AI happens reactively — after a homework incident, after a confusing conversation, after something on the news. This path runs the other way: a discussion habit you build before you need it. Start with the toolkit. Then read one story together. Then keep going.",

  stepsLabel: "Your journey",
  steps: [
    {
      route: "thought-experiments/toolkit",
      title: "Step 1 — Open the Dialogue Toolkit first",
      copy: "Five Socratic moves and sentence stems that turn any story into a real conversation. You don't have to be an expert — you have to ask the question, then listen. The toolkit shows you how.",
      cta: "Open the toolkit",
      color: C.teal,
    },
    {
      route: "thought-experiments/k-5",
      title: "Step 2 — Read one story together this week",
      copy: "Pick the grade band that matches your child. K-5 has short read-aloud scenarios. 6-8 has story-based dilemmas. 9-12 has the philosophical canon. Read it together — they'll surprise you with what they notice.",
      cta: "Open the K-5 stories",
      color: C.gold,
    },
    {
      route: "thought-experiments/journal",
      title: "Step 3 — Use the Decision Journal",
      copy: "After the conversation, jot down what your kid said. The journal lives only on your device — nothing is sent anywhere. Comes in handy six months later when you want to remember how their thinking has shifted.",
      cta: "Open the journal",
      color: C.ocean,
    },
    {
      route: "ai-consciousness",
      title: "Step 4 — For your own reading, when you want more",
      copy: "The Consciousness Line is a longer essay about what it means to say something has a mind. Useful before a conversation that's gone deeper than you expected.",
      cta: "Read the essay",
      color: C.coral,
    },
    {
      route: "ai-authorship-quandary",
      title: "Step 5 — When AI homework comes up",
      copy: "The Authorship Quandary walks the conversation about whose work it is when a kid uses AI. Worth reading before the next homework dispute — not after.",
      cta: "Open the scenario",
      color: C.gold,
    },
  ],

  tailLabel: "Or take a different door",
  tail: [
    { id: "audiences/student", title: "Send your kid here", desc: "The student-facing doorway", color: C.teal },
    { id: "thought-experiments/6-8", title: "Middle school stories", desc: "For your 11–14 year old", color: C.gold },
    { id: "thought-experiments/9-12", title: "High school canon", desc: "For your 14–18 year old", color: C.ocean },
    { id: "about", title: "About Matthew", desc: "Who runs this site", color: C.gold },
  ],
};

export default function Parent({ navigate }) {
  return <AudiencePage navigate={navigate} config={config} />;
}
