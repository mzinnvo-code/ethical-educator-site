// Verbatim excerpts from three real experiments in src/data/experiments.js,
// duplicated here as plain strings so the home page never imports the heavy
// experiments module (it drags the whole scene graph into the main chunk).
// demoDilemmas.test.mjs asserts every title, prompt, option, reflection, and
// turn line is a substring of that experiment's block in the source file —
// editing the source without updating this file fails the test suite rather
// than silently forking the pedagogy. The timestamp, turn.stamp, cta, and
// reference fields are editorial framing for the home page, not source text,
// but must stay supportable by the source scenario.

export const DEMO_ROLES = ["teacher", "leader", "family"];

export const DEMO_DILEMMAS = {
  teacher: {
    chip: "I teach",
    sourceId: "ai-detector-false-positive",
    timestamp: "MONDAY · 7:42 AM — YOUR DESK",
    title: "The False-Positive AI",
    prompt:
      "Your university adopted an AI-detection tool. It flags an essay as 92% likely AI-generated. The student insists they wrote every word, has draft history showing real writing process, and cries in your office. The vendor admits 5–7% false-positive rates. The student's GPA depends on this grade. What do you do?",
    options: [
      { label: "A", text: "Trust the detector. The numbers are probabilistic for a reason.", reflection: "But the student's evidence is also probabilistic — and individually weighty." },
      { label: "B", text: "Trust the student. Detectors are unreliable; ban them.", reflection: "Vanderbilt did this in 2023." },
      { label: "C", text: "Detector as one input. Conduct an oral exam.", reflection: "Process over verdict. Slower, more humane, more defensible." },
      { label: "D", text: "Stop building writing assignments that are auto-detectable.", reflection: "The deepest fix: change what counts as showing learning." },
    ],
    turn: {
      stamp: "SIX MONTHS LATER",
      text: "You notice a pattern in the appeals: ESL students and neurodivergent students are flagged at much higher rates. Now what?",
    },
    cta: { label: "Run the full version with your staff", page: "thought-experiments/educators" },
    reference: "Based on Vanderbilt's 2023 decision to disable Turnitin's AI detector",
  },
  leader: {
    chip: "I lead a school",
    sourceId: "ai-policy-design",
    timestamp: "AUGUST · THE POLICY DRAFT — EVERY LINE DEFENDED",
    title: "Designing Your Classroom AI Policy",
    prompt:
      "It's August. You're writing your AI policy for the year. Students will use ChatGPT either way. The school has no district-wide rule. Whatever you write, you'll have to defend every line.",
    options: [
      { label: "A", text: "Banned. AI is not used in this classroom.", reflection: "Cleanest to enforce — pushes use underground rather than eliminating it." },
      { label: "B", text: "Permitted everywhere. Cite it like any source.", reflection: "Treats AI as a tool — requires students who already know what 'good use' looks like." },
      { label: "C", text: "Traffic-light: red zones (assessment), yellow (with disclosure), green (brainstorming).", reflection: "NYC schools adopted this. Specific, defensible — requires teaching the WHY." },
      { label: "D", text: "Co-create with students in week one.", reflection: "Slower start. The policy lives because students authored it." },
    ],
    turn: {
      stamp: "THE PUSHBACK",
      text: "Three voices respond. AP Lit teacher: \"Won't this kill the writing?\" Superintendent: \"Will this hold up at the board?\" A parent at the next meeting: \"What about equity for students without home AI access?\" Re-decide?",
    },
    cta: { label: "Open the school policy tools", page: "school-ai-policy-tools" },
    reference: "Adapted from NYC DOE traffic-light AI guidance and field practice",
  },
  family: {
    chip: "I'm a parent",
    sourceId: "ai-homework-help",
    timestamp: "THURSDAY · 6:40 PM — KITCHEN TABLE",
    title: "Using AI to Do Homework",
    prompt:
      "Maya has stared at one fraction problem for fifteen minutes. Her parent is at work, and the AI tutor is open. It can give a hint, show each step, or just give the final answer. Maya wants to be done. She also wants to understand. What should she ask for?",
    options: [
      { label: "A", text: "A hint only.", reflection: "A hint keeps Maya doing the thinking." },
      { label: "B", text: "Step-by-step help.", reflection: "Worked examples can teach if Maya follows and checks each step." },
      { label: "C", text: "The answer. She is exhausted.", reflection: "Relief is understandable, but the learning may be missing." },
    ],
    turn: {
      stamp: "THE NEXT DAY",
      text: "A quiz has a problem almost like the homework. Maya freezes. Her homework was correct, but her mind feels empty. Did the AI help her learn, or only help her finish?",
    },
    cta: { label: "Start a family conversation", page: "family-conversations" },
    reference: "Original elementary homework and AI scenario",
  },
};
