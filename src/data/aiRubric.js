// AI Use Rubric — six dimensions teachers and school leaders can score a
// proposed AI use against. Built to be a discussion scaffold, not a
// categorical yes/no judge. The output frames "here's what looks healthy,
// here's what needs scrutiny, here are the conversations to have."
//
// Each dimension has:
//   id      — stable kebab-case
//   label   — short header
//   question — what we're actually asking the rater
//   answers — 3 options (best → worst), each with a label, a 0/1/2 weight,
//             and a short explanation of what that answer means.
//   relatedExperiment — optional pointer to a thought experiment that
//             illuminates this dimension; routes via the SPA navigate().
//
// The verdict logic is intentionally simple: tally the total weight across
// six dimensions (range 0–12) and bucket into go (0–3), discuss (4–7),
// redesign (8–12). Plus a hard-flag: any dimension at weight 2 forces at
// least "discuss" regardless of the total.

export const SCENARIOS = [
  {
    id: "ai-grading",
    title: "AI grades student writing",
    summary: "An AI tool gives feedback and assigns grades on student essays without teacher review on every paper.",
    suggested: { "cognitive": 0, "bias": 2, "privacy": 1, "authorship": 1, "equity": 0, "oversight": 2 },
  },
  {
    id: "ai-tutoring",
    title: "Students use an AI tutor for math practice",
    summary: "Students work through practice problems with an AI tutor that adapts to their pace and explains where they go wrong.",
    suggested: { "cognitive": 1, "bias": 1, "privacy": 1, "authorship": 0, "equity": 1, "oversight": 1 },
  },
  {
    id: "ai-essay-help",
    title: "Students use AI to draft a first version of an essay",
    summary: "Students prompt a chatbot to draft the first version of their essay, then revise from there.",
    suggested: { "cognitive": 2, "bias": 0, "privacy": 0, "authorship": 2, "equity": 1, "oversight": 1 },
  },
  {
    id: "ai-lesson-planning",
    title: "Teacher uses AI to draft lesson plans",
    summary: "A teacher uses ChatGPT to draft lesson plans and worksheets, edits them, then uses them in class.",
    suggested: { "cognitive": 0, "bias": 1, "privacy": 0, "authorship": 0, "equity": 0, "oversight": 0 },
  },
  {
    id: "ai-detector",
    title: "School uses an AI detector to flag essays",
    summary: "An AI-detection tool flags student essays as 'likely AI-generated' above a threshold, triggering academic-integrity review.",
    suggested: { "cognitive": 0, "bias": 2, "privacy": 1, "authorship": 1, "equity": 2, "oversight": 1 },
  },
];

export const DIMENSIONS = [
  {
    id: "cognitive",
    label: "Cognitive substitution",
    short: "Whose thinking?",
    question: "Does the AI do the thinking that the student is supposed to be learning to do?",
    answers: [
      { weight: 0, label: "No — AI supports thinking", desc: "The tool scaffolds, hints, or gives feedback. The student still has to do the work." },
      { weight: 1, label: "Partially — depends on the assignment", desc: "Some tasks ask the student to think; others let AI substitute. Whether it works depends on how the assignment is framed." },
      { weight: 2, label: "Yes — AI does the cognitive work", desc: "The student can hand the task to AI and learn very little. This is the central concern of the Bastani et al. (2024) result." },
    ],
    relatedExperiment: { id: "the-shortcut", title: "The Shortcut", url: "/thought-experiments/educators" },
  },
  {
    id: "bias",
    label: "Bias & fairness",
    short: "Who could it hurt?",
    question: "Could the tool make decisions that systematically advantage or disadvantage some students more than others?",
    answers: [
      { weight: 0, label: "Unlikely — low-stakes use", desc: "The tool isn't making decisions about students. Output shapes the teacher's options, not the student's outcome." },
      { weight: 1, label: "Some risk — needs monitoring", desc: "The tool informs decisions about students. Bias is possible; the school should sample-audit outputs by demographic group." },
      { weight: 2, label: "High risk — decisions affect students", desc: "The tool's output drives consequential decisions (grades, placement, discipline, flagging). Requires audit before adoption and ongoing review." },
    ],
    relatedExperiment: { id: "biased-resume-ai", title: "The Admissions Algorithm", url: "/thought-experiments/9-12" },
  },
  {
    id: "privacy",
    label: "Privacy",
    short: "What data leaves the room?",
    question: "What student data does the tool collect, store, or send to a third party?",
    answers: [
      { weight: 0, label: "None — local or anonymized", desc: "The tool doesn't process student-identifying data, or all data stays on-device / behind the school's auth." },
      { weight: 1, label: "Some — covered by a DPA", desc: "The tool processes student data, but the school has a signed data-processing agreement (FERPA / state-equivalent) with the vendor." },
      { weight: 2, label: "Significant — no DPA or unclear", desc: "Student data flows to a third party without a clear contractual control, or the policy isn't readable. This is a stop-and-fix." },
    ],
    relatedExperiment: { id: "school-surveillance", title: "School Surveillance", url: "/thought-experiments/9-12" },
  },
  {
    id: "authorship",
    label: "Authorship transparency",
    short: "Whose work is this?",
    question: "Is it clear to everyone (student, teacher, parent, future reader) what was produced by a human and what by AI?",
    answers: [
      { weight: 0, label: "Clear — disclosed and labeled", desc: "Output is labeled or sourced. Students learn to disclose; teachers and families can see what the AI contributed." },
      { weight: 1, label: "Implicit — context makes it clear", desc: "Authorship is obvious from the assignment frame, but there's no explicit disclosure norm. Works for now; could fail at scale." },
      { weight: 2, label: "Murky — no disclosure norm", desc: "Students hand in work without specifying what AI did. Teachers can't tell whose ideas they're grading. This is the AI Authorship Quandary playing out in real time." },
    ],
    relatedExperiment: { id: "ai-authorship", title: "The AI Authorship Quandary", url: "/ai-authorship-quandary" },
  },
  {
    id: "equity",
    label: "Equity of access",
    short: "Who can use it?",
    question: "Do all students have meaningful access to the tool — same quality, same support, same opportunity?",
    answers: [
      { weight: 0, label: "Equal access — school-provided", desc: "The school provides the tool to everyone, including offline / low-bandwidth backups. No student is at a disadvantage for lacking it." },
      { weight: 1, label: "Uneven — gaps for some students", desc: "Some students have better tools at home than others. The classroom levels this partly, but home advantage persists." },
      { weight: 2, label: "Inequitable — advantages the already-advantaged", desc: "Whichever students have private access do better. Adopting the tool without addressing access widens existing gaps." },
    ],
    relatedExperiment: { id: "adaptive-learning-fairness", title: "Adaptive Learning Fairness", url: "/thought-experiments/grade-3" },
  },
  {
    id: "oversight",
    label: "Educator oversight",
    short: "Can a human override?",
    question: "Can a teacher or administrator review, override, or audit the AI's output before it affects a student?",
    answers: [
      { weight: 0, label: "Yes — human in every loop", desc: "Every consequential decision passes through a teacher or admin who can see the AI's reasoning and override it." },
      { weight: 1, label: "Sometimes — sample review", desc: "The tool operates at scale; humans sample-review rather than reviewing every case. Acceptable for low-stakes; risky for high-stakes." },
      { weight: 2, label: "No — autonomous decisions", desc: "The tool makes decisions that reach students without a human in the loop. Strongly avoid for grading, discipline, placement." },
    ],
    relatedExperiment: { id: "ai-grading-mistake", title: "The AI Grading Mistake", url: "/thought-experiments/grade-5" },
  },
];

const VERDICTS = {
  go: {
    id: "go",
    label: "Go ahead — with the usual care",
    color: "teal",
    icon: "✓",
    description: "Nothing in this rubric raises a stop-this-now flag. Adopt with normal teacher judgment, periodic reflection, and an honest opt-out for students who don't want to use it.",
  },
  discuss: {
    id: "discuss",
    label: "Worth a real conversation first",
    color: "gold",
    icon: "?",
    description: "Several dimensions need an explicit decision before adopting. Bring this to a team meeting, a department head, or a leadership group with the dimension-by-dimension answers in hand.",
  },
  redesign: {
    id: "redesign",
    label: "Redesign before adopting",
    color: "coral",
    icon: "!",
    description: "Multiple high-risk dimensions OR at least one severe red flag. Adoption as-described is hard to defend. Either pick a different tool, redesign the workflow to reduce the risks, or run a tightly-scoped pilot with explicit audit checkpoints.",
  },
};

export function scoreVerdict(answersById) {
  let total = 0;
  let hasSevere = false;
  for (const dim of DIMENSIONS) {
    const ans = answersById[dim.id];
    if (ans == null) continue;
    total += ans;
    if (ans === 2) hasSevere = true;
  }
  if (total >= 8) return { ...VERDICTS.redesign, total };
  if (total >= 4 || hasSevere) return { ...VERDICTS.discuss, total };
  return { ...VERDICTS.go, total };
}
