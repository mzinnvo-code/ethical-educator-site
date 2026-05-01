// "What do I do when…" — a decision tree of common derailers and the
// specific moves that work. Branching: each node has options that lead
// to a leaf with named guidance.

export const DERAILER_TREE = {
  id: "root",
  prompt: "What's happening in your discussion right now?",
  options: [
    { label: "A student said something offensive", goto: "offensive" },
    { label: "A student is in real distress", goto: "distress" },
    { label: "One voice dominates", goto: "dominate" },
    { label: "The room is silent", goto: "silent" },
    { label: "Discussion has drifted off-topic", goto: "drifted" },
    { label: "Religious or political tension surfaced", goto: "tension" },
    { label: "Students refuse to engage", goto: "refuse" },
    { label: "Two students are in personal conflict", goto: "conflict" },
  ],
};

export const DERAILER_NODES = {
  offensive: {
    id: "offensive",
    title: "A student said something offensive",
    branch: {
      prompt: "Was it offensive in CONTENT (something harmful claimed) or in FORM (a slur, dehumanizing term, or attack on a peer)?",
      options: [
        { label: "Form — a slur or attack on a peer", goto: "offensive-form" },
        { label: "Content — a harmful or inflammatory claim", goto: "offensive-content" },
        { label: "I'm not sure", goto: "offensive-unsure" },
      ],
    },
  },
  "offensive-form": {
    id: "offensive-form",
    title: "Form: a slur or attack on a peer",
    guidance: "This is not a discussion problem. This is a community problem. Pause discussion immediately. Name what was said and that it isn't allowed in this classroom — without humiliating the student. Example language:",
    moves: [
      "\"Pause. We don't use that language here. It hurts people in this room.\"",
      "\"I'd like you to take a moment, then come back to us.\"",
      "(Privately, after class) \"What you said today was hurtful. I want to talk about why it landed wrong, and what comes next.\"",
    ],
    note: "This may also require follow-through with the student's family and your school's disciplinary process. Document.",
  },
  "offensive-content": {
    id: "offensive-content",
    title: "Content: a harmful or inflammatory claim",
    guidance: "Slow down. The discussion can probably continue, but only if you handle this move well. The goal is neither to shame the student nor to validate the claim.",
    moves: [
      "\"Can you say more about how you got there?\" (Probe Assumption — surface the reasoning)",
      "\"What evidence would change your mind?\" (Source — link to standards of evidence)",
      "\"What about a case where ___?\" (Counter-example — test the claim against a sympathetic case)",
      "(If the claim is straightforwardly false): \"That's a claim worth fact-checking. Let's not let it stand uncorrected. Here's what the evidence actually shows: ___.\"",
    ],
    note: "Don't pretend a false claim is a legitimate position to debate. Some things are answered by evidence, not opinion.",
  },
  "offensive-unsure": {
    id: "offensive-unsure",
    title: "Not sure if it crossed a line",
    guidance: "Trust your sense. If something feels off, name it without labeling. Then watch what happens.",
    moves: [
      "\"Hold on — let me sit with that for a second.\" (Buys you time.)",
      "\"Could you say what you mean by that?\" (Often the speaker, hearing it back, will revise.)",
      "(After class) Check in with a colleague. Some lines are clearer in retrospect.",
    ],
  },

  distress: {
    id: "distress",
    title: "A student is in real distress",
    guidance: "Stop the discussion. The conversation can wait. The student cannot.",
    moves: [
      "\"Let's pause. ___, would you like to step out for a minute? You don't have to explain.\"",
      "(Have a co-teacher or trusted student walk with them.)",
      "(After class) Document what you observed and report through your school's mandatory-reporting protocol if applicable.",
      "(The next day) Privately check in. Don't ask them to perform that they're okay.",
    ],
    note: "If the distress involves disclosure of self-harm, abuse, or imminent danger, follow your school's reporting protocol IMMEDIATELY. Some scenarios in our bank (Surveillance, AI Friend, Omelas, Magic Toy for younger students) can surface real issues. This is a feature of doing the work seriously — be ready.",
  },

  dominate: {
    id: "dominate",
    title: "One voice dominates",
    guidance: "Address it gently and without shaming. The dominant student is often eager and well-prepared — that's not a flaw, but the room needs other voices too.",
    moves: [
      "\"I notice we've heard from the same voices for a while. What does someone we haven't heard from think?\"",
      "(Use a participation map.) Track contributions visually so the imbalance is visible to you.",
      "(After class, privately, to the dominant student) \"You're a strong voice in here, which is great. Could you try a stretch this week — let three other people speak before you do? I'd love your help making space.\"",
      "Switch protocols. Try Silent Conversation, Think-Pair-Share, or Fishbowl, where the structure equalizes participation.",
    ],
  },

  silent: {
    id: "silent",
    title: "The room is silent",
    guidance: "Silence is not failure. It's often where thinking happens. But sustained silence can mean unprepared, unsafe, or unsure.",
    moves: [
      "Wait. Eight to twelve seconds is normal. Most teachers wait two and panic.",
      "If silence persists: \"It's okay to think. Let me reframe the question.\" Then offer the same prompt with different language.",
      "Pivot to Think-Pair-Share. Three minutes of silent writing, then partner sharing, often unlocks the room.",
      "If it's the first time: \"This is hard. Where would we even start?\" — meta moves often work better than re-stating the prompt.",
      "If it's a pattern: check whether the room feels SAFE. Sometimes silence is a flag that students don't trust the space yet.",
    ],
  },

  drifted: {
    id: "drifted",
    title: "Discussion has drifted off-topic",
    guidance: "Sometimes drift is productive — students are following a real thread. Sometimes it's avoidance. Diagnose first.",
    moves: [
      "Listen for a beat. Is the drift LEADING somewhere philosophical, or is it deflection?",
      "If productive: let it run, then bridge back. \"That's connected to where we started — let me show you how.\"",
      "If deflection: \"This is interesting, but let me bring us back to the original question — ___. What's our best response to THAT?\"",
      "Use a Meta move: \"Notice we drifted. What about the original question made us want to talk about something else?\"",
    ],
  },

  tension: {
    id: "tension",
    title: "Religious or political tension surfaced",
    guidance: "Don't avoid the tension — but don't let it personalize. Reframe to the underlying philosophical question.",
    moves: [
      "Acknowledge: \"This question lands differently for different people. That's part of what makes it real.\"",
      "Reframe: \"Let's separate (a) what tradition X teaches, (b) what we as individuals might think, and (c) what we'd want a SCHOOL or society to do. Different questions.\"",
      "Make space: \"Different traditions answer this differently. Confucius would say ___. Christian ethics would say ___. Buddhist non-self traditions would say ___. Let's hear those, then think for ourselves.\"",
      "Set a hard rule: we can disagree with VIEWS, not with PEOPLE FOR HOLDING them. The same view can be examined with rigor and care.",
    ],
    note: "If the tension is about an immediate political event, you may want to acknowledge it briefly, then return to the philosophical question. Acknowledging is not the same as wading in.",
  },

  refuse: {
    id: "refuse",
    title: "Students refuse to engage",
    guidance: "Refusal can mean: bored, unsafe, unprepared, performing nonchalance, or genuinely uninterested. Diagnose.",
    moves: [
      "Lower the stakes. Try a Continuum Line or a Silent Conversation — protocols that don't require articulate verbal performance.",
      "Connect to something they care about. \"This question shows up in [TikTok / sports / whatever]. Let me show you how.\"",
      "Make the philosophy visible. \"What you're choosing to do right now — to refuse — is itself a philosophical move. What's the strongest argument for refusing?\" (Often this gets them in.)",
      "If it's persistent: check whether the room feels safe. Refusal can be self-protection.",
      "Talk to one student privately. Often there's something specific to address.",
    ],
  },

  conflict: {
    id: "conflict",
    title: "Two students are in personal conflict",
    guidance: "Don't let the philosophical discussion proxy for an interpersonal fight. Name the line and hold it.",
    moves: [
      "Pause: \"Let me stop. This isn't about the scenario anymore — it's about the two of you. Let's separate those.\"",
      "Redirect to ideas: \"___, what's your strongest argument for the OPPOSING view?\" (Forces engagement with ideas, not opponents.)",
      "If the personal conflict is real: \"I'd like to talk to both of you after class. Let's hold the rest of this discussion.\"",
      "Use the Steelman norm. If they argue each other's positions, the conflict often defuses.",
    ],
    note: "If the conflict is escalating, it's okay to end the discussion. Maintaining classroom safety beats finishing the lesson.",
  },
};

// Convenience export — tree + nodes flattened so a renderer can walk it
export function getNodeById(id) {
  if (id === "root") return DERAILER_TREE;
  return DERAILER_NODES[id] || null;
}
