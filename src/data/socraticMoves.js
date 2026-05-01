// The five Socratic moves — the teacher's facilitation toolkit.
// Memorize these five and you can run a seminar cold.

export const SOCRATIC_MOVES = [
  {
    id: "clarify",
    name: "Clarify",
    purpose: "Make sure everyone (including the speaker) knows what was said.",
    when: "When a contribution is too compressed, ambiguous, or jargon-heavy.",
    examples: [
      "Can you say that another way?",
      "What do you mean by ___?",
      "Could you give us an example?",
      "Is this what you're saying — ___?",
    ],
    pitfall: "Clarify gently. \"What do you mean?\" can sound dismissive; \"Could you say more about that?\" usually doesn't.",
  },
  {
    id: "probe-assumption",
    name: "Probe Assumption",
    purpose: "Surface the hidden premises a position depends on.",
    when: "When a speaker treats a controversial premise as obvious, or when consensus is forming too fast.",
    examples: [
      "What does that depend on?",
      "What would have to be true for that to be right?",
      "Are you assuming ___?",
      "Where does that come from for you?",
    ],
    pitfall: "Don't ask leading questions. \"You're assuming X, right?\" closes thought; \"What's behind that view?\" opens it.",
  },
  {
    id: "counter-example",
    name: "Counter-example",
    purpose: "Test a general claim by introducing a case it might fail to handle.",
    when: "When someone makes a strong universal claim (\"It's always wrong to ___\").",
    examples: [
      "What if instead of A, it were B — does your answer change?",
      "Suppose someone in ___ situation. Does the rule still hold?",
      "Can you imagine a case where the opposite would be right?",
    ],
    pitfall: "The counter-example should be GENUINE, not a gotcha. The point is testing the claim, not winning the round.",
  },
  {
    id: "implication",
    name: "Implication",
    purpose: "Trace what else has to be true if a position is right.",
    when: "When you want to make the stakes of a position visible.",
    examples: [
      "If that's true, what else has to be true?",
      "What follows from that view?",
      "What would the world look like if everyone reasoned this way?",
      "Are you also committed to ___?",
    ],
    pitfall: "Implications can be unwelcome. Use this move with care, especially when a student has just shared a personal view.",
  },
  {
    id: "meta",
    name: "Meta",
    purpose: "Step back from the question to look at the question itself.",
    when: "When discussion is stuck, when students seem to be talking past each other, or as a closing move.",
    examples: [
      "Why is this question hard?",
      "What kind of disagreement is this?",
      "What would convince you to change your mind?",
      "What do we actually need to know to settle this?",
    ],
    pitfall: "Meta moves can feel evasive if used too early. Save them for when there's enough on the table to step back from.",
  },
  {
    id: "source",
    name: "Source",
    purpose: "Trace where a view comes from — who else holds it, what tradition, what evidence.",
    when: "When you want to connect classroom discussion to a wider conversation.",
    examples: [
      "Where does that view come from?",
      "Whose argument sounds most like yours?",
      "What evidence would change your mind?",
      "How would someone from ___ tradition answer this?",
    ],
    pitfall: "Don't use Source to credential or de-credential a student's view. The point is connecting, not authorizing.",
  },
];
