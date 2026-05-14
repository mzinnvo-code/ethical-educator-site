import AudiencePage from "./AudiencePage.jsx";
import { C } from "../../theme.js";

const config = {
  eyebrow: "For Teachers",
  accent: C.gold,
  title: "Classroom-ready conversations, on the days you need them.",
  subtitle: "A guided path through the site — pick a grade band, set up the conversation, then go as deep as you have time for.",
  intro: "Most teachers find this site looking for a specific thing: a discussion to use tomorrow, a framework for an AI policy conversation, or a way to talk with students about something that came up in class. Below is the shortest path to each of those — in order.",

  stepsLabel: "Your journey",
  steps: [
    {
      route: "thought-experiments/k-5",
      title: "Step 1 — Pick your grade band",
      copy: "K-5 leans on stories and read-aloud. 6-8 leans on dilemmas and counter-arguments. 9-12 connects AI ethics to the philosophical canon. Pick the band you'll use this week.",
      cta: "Open the K-5 hub",
      color: C.coral,
    },
    {
      route: "thought-experiments/toolkit",
      title: "Step 2 — Open the Dialogue Toolkit",
      copy: "Before running an experiment, skim the four norms and the five Socratic moves. Twelve protocols give you scripts when a discussion needs a nudge. Useful 30 seconds before class, not 30 minutes.",
      cta: "Open the toolkit",
      color: C.teal,
    },
    {
      route: "thought-experiments/educators",
      title: "Step 3 — Try a flagship at staff PD",
      copy: "The four educator flagships — The Shortcut, the Authorship Quandary, the Reluctant Educator, the Doppelgänger — are designed for the conversations you wish you'd had before the vendor demo. Fifteen minutes each.",
      cta: "Open For Educators",
      color: C.gold,
    },
    {
      route: "teaching-feedback",
      title: "Step 4 — Strengthen the practice itself",
      copy: "Research-grounded resources on feedback, engagement, async learning, and RTI. Practical PD that doesn't pretend AI is the only thing happening in your room.",
      cta: "Open the practitioner library",
      color: C.ocean,
    },
    {
      route: "phil-education",
      title: "Step 5 — Go deeper when you're ready",
      copy: "Philosophy in K–12 and the AI Ethics frameworks are the research foundation behind the discussion materials. Read these when you want the argument behind the activity.",
      cta: "Read the foundation",
      color: C.coral,
    },
  ],

  tailLabel: "Or take a different door",
  tail: [
    { id: "audiences/administrator", title: "Are you an administrator?", desc: "Policy frameworks + research", color: C.ocean },
    { id: "thought-experiments/6-8", title: "Grades 6–8 directly", desc: "Skip the journey, jump in", color: C.gold },
    { id: "thought-experiments/9-12", title: "Grades 9–12 directly", desc: "The philosophical canon", color: C.ocean },
    { id: "for-educators", title: "For Educators hub", desc: "All practitioner resources", color: C.teal },
  ],
};

export default function Teacher({ navigate }) {
  return <AudiencePage navigate={navigate} config={config} />;
}
