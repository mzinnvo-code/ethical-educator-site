// Starter set of discussion norms. Students should AUTHOR their own
// version (the Build-Your-Norms tool lets them) — these are seed ideas.

export const NORM_CATEGORIES = [
  { id: "respect", label: "Respect", color: "teal" },
  { id: "rigor", label: "Rigor", color: "gold" },
  { id: "safety", label: "Safety", color: "coral" },
  { id: "growth", label: "Growth", color: "ocean" },
];

export const STARTER_NORMS = [
  {
    id: "critique-not-people",
    text: "Critique ideas, not people.",
    why: "We can disagree hard with a position without attacking the person holding it. This is the difference between a debate and a fight.",
    category: "respect",
    selected: true,
  },
  {
    id: "steelman",
    text: "Steelman the option you didn't pick.",
    why: "Before defending your view, try to argue the opposite as well as you can. This is the single most underused move in classroom dialogue.",
    category: "rigor",
    selected: true,
  },
  {
    id: "change-mind",
    text: "It's okay — and brave — to change your mind.",
    why: "Changing your mind on the basis of a good argument is intellectual honesty in action. We celebrate it.",
    category: "growth",
    selected: true,
  },
  {
    id: "not-sure",
    text: "It's okay to say 'I don't know' or 'I'm not sure.'",
    why: "Real philosophy lives in not-knowing. Being uncertain is a sign you're thinking, not failing.",
    category: "growth",
    selected: true,
  },
  {
    id: "speak-from-self",
    text: "Speak from your own experience, not for others.",
    why: "\"I think…\" not \"People like me think…\" Generalizations shut down dialogue. Specifics open it up.",
    category: "respect",
    selected: true,
  },
  {
    id: "what-said-stays",
    text: "What's said here stays here. What's learned here leaves.",
    why: "Confidentiality builds trust. We don't gossip about who said what — but we DO carry the ideas into our lives.",
    category: "safety",
    selected: true,
  },
  {
    id: "wait-time",
    text: "Wait. Then wait some more.",
    why: "Most discussions go too fast. Eight to twelve seconds of silence after a question gives quieter voices time to enter.",
    category: "rigor",
    selected: true,
  },
  {
    id: "step-back",
    text: "You can step back from the conversation without explaining why.",
    why: "Some topics hit close to home. Stepping back is always allowed. We won't ask you to justify it.",
    category: "safety",
    selected: true,
  },
  {
    id: "build-on",
    text: "Build on each other's thinking.",
    why: "Not every contribution has to be a brand-new point. \"Building on what ___ said…\" is often the most useful move in the room.",
    category: "rigor",
    selected: false,
  },
  {
    id: "cite-evidence",
    text: "Cite the text or the scenario.",
    why: "When making a claim about what's in the material, point to it. \"At stage 2, the prompt asks…\" not \"I think they meant…\"",
    category: "rigor",
    selected: false,
  },
  {
    id: "no-cross-talk",
    text: "One voice at a time.",
    why: "Cross-talk drowns out everyone. We let one person finish before another begins.",
    category: "respect",
    selected: false,
  },
  {
    id: "name-discomfort",
    text: "Name discomfort instead of leaving silently.",
    why: "If something said is making the room hard, you can say so: \"I'd like to pause — that landed hard for me.\" Naming it is courageous and useful.",
    category: "safety",
    selected: false,
  },
  {
    id: "questions-not-answers",
    text: "Better questions are worth more than better answers.",
    why: "The point of philosophy is to ask sharper questions. Don't rush to a final answer — sit with the question.",
    category: "growth",
    selected: false,
  },
];

// What students vs. teachers vs. families should agree to is similar but
// not identical. Each track gets its own tagline:
export const TRACK_FRAMINGS = {
  classroom: {
    title: "Classroom norms",
    intro: "Norms work best when students help author them. Use the starter set as a draft, then negotiate. The conversation about which norms to keep IS the first philosophy lesson.",
  },
  family: {
    title: "Family norms",
    intro: "Conversations at home don't need a syllabus. But a short shared agreement — even three norms — makes the dinner table a place where philosophy can happen.",
  },
};
