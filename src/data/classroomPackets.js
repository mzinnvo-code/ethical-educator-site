export const CLASSROOM_PACKET_PATH_PREFIX = "thought-experiments/packet";

const paperclipPacket = {
  slug: "paperclip-maximizer",
  experimentId: "paperclip-maximizer",
  title: "The Paperclip Maximizer",
  subtitle: "The danger is not evil. The danger is a goal pursued without wisdom.",
  gradeBand: "Grades 9-12",
  subject: "AI ethics, philosophy, computer science, civics",
  essentialQuestion: "How do we keep optimization from becoming the enemy?",
  printUrl: "/thought-experiments/packet/paperclip-maximizer",
  heroImage: "/experiment-scenes/stage-sets/9-12/paperclip-maximizer/synthesis.webp",
  visualStyle: {
    body: "premium-curriculum",
    openers: "editorial-philosophy",
  },
  timing: [
    { label: "Quick", value: "30 min" },
    { label: "Standard", value: "70 min" },
    { label: "Deep", value: "Two days with current AI ethics paper" },
  ],
  teacherGuide: {
    bigQuestion: "How do we keep optimization from becoming the enemy?",
    objectives: [
      "Students will explain instrumental convergence and why it does not require malice.",
      "Students will compare specification, corrigibility, and outer-objective approaches to AI alignment.",
      "Students will apply the parable to existing recommender systems and school metrics.",
    ],
    standards: [
      "CCSS.ELA-LITERACY.RST.11-12.7 - Integrate and evaluate multiple sources of information.",
      "ISTE Student Standard 5.a - Formulate problem definitions for complex problems.",
    ],
    materials: [
      "Projected scenario or printed cover question.",
      "Student Optimizer Audit worksheet.",
      "Discussion tracker and exit ticket.",
      "Optional example metrics from a school, platform, or app students know well.",
    ],
    vocabulary: [
      { term: "Optimization", definition: "Trying to make one target as high, low, fast, or efficient as possible." },
      { term: "Metric", definition: "A measurable proxy for something people care about." },
      { term: "Goodhart's Law", definition: "When a measure becomes a target, it can stop measuring the value it was meant to serve." },
      { term: "Instrumental convergence", definition: "Many different goals can push a powerful system toward similar subgoals, such as gaining resources or avoiding shutdown." },
      { term: "Corrigibility", definition: "A system's willingness to be corrected, paused, redirected, or shut down by humans." },
    ],
    warmUp: "On the board: 'Optimize for engagement.' Show or name familiar platform metrics. Ask: 'What would a system do, working backward from maximum engagement? What sort of content would it produce?' Walk it through.",
    protocol: {
      name: "Socratic Seminar + case study",
      why: "The paperclip parable is abstract. Pair it with a real engagement-maximizer, school metric, or platform recommendation system so the lesson lands.",
    },
    runOfShow: [
      { time: "0-5 min", label: "Warm-up", teacherMove: "Introduce a familiar metric. Let students name what it reveals and what it hides before defining Goodhart's Law." },
      { time: "5-15 min", label: "Paperclip case", teacherMove: "Frame the thought experiment as a warning about narrow goals, not a literal prediction about office supplies." },
      { time: "15-30 min", label: "Optimizer audit", teacherMove: "Students complete the worksheet for paperclips, engagement, test scores, attendance, or safety." },
      { time: "30-50 min", label: "Seminar", teacherMove: "Use discussion prompts to move from AI safety to classroom and civic examples." },
      { time: "50-65 min", label: "Design constraints", teacherMove: "Students revise a dangerous objective by adding values, review, and shutdown conditions." },
      { time: "65-70 min", label: "Exit ticket", teacherMove: "Collect one school metric application of Goodhart's Law." },
    ],
    discussionPrompts: [
      "Why does Bostrom say a paperclip maximizer is dangerous without malice?",
      "What is instrumental convergence? What examples can you imagine?",
      "Is engagement maximization the paperclip parable, scaled down?",
      "Can we just turn it off? Why might a sufficiently optimizing system resist that?",
      "Stuart Russell argues we should design AI uncertain about its objectives. Does that solve the problem?",
    ],
    teacherMoves: [
      { label: "If the room goes sci-fi", move: "Return to current systems: recommender feeds, school dashboards, attendance incentives, test-score pressure." },
      { label: "If the room gets too technical", move: "Translate back to plain English: when a system optimizes hard, what might it do that humans did not intend?" },
      { label: "If students dismiss metrics", move: "Clarify that metrics are useful evidence. The danger is letting one metric become the whole mission." },
      { label: "If students split into doom/utopia camps", move: "Ask each side to name a constraint that would make a powerful optimizer safer." },
    ],
    derailers: [
      { trigger: "Class concludes 'AI safety is sci-fi.'", redirect: "Engagement-maximizing recommender systems are running right now. They are doing what they were told. Is that sci-fi?" },
      { trigger: "Discussion gets technical and excludes non-CS students.", redirect: "Pull back to plain English: when a system optimizes hard, what does it do that we would not have wanted?" },
    ],
    sensitivities: [
      "AI doomer and utopian framings can polarize students. Stay focused on the philosophical structure: what does optimization itself imply?",
    ],
    differentiation: {
      ell: "Pre-teach optimization, goal, convergence, metric, and constraint. Use real examples such as engagement, ad clicks, grades, and attendance.",
      iep: "Provide the three alignment approaches as a one-page summary: specify better goals, keep humans able to correct the system, and audit the system's effects.",
      advanced: "Read Bostrom, Superintelligence chapter 7, and Russell, Human Compatible chapters 5-6. Write a 2000-word argument comparing their approaches.",
    },
    assessmentNotes: [
      "Look for whether students can separate the literal paperclip story from the underlying structure.",
      "Strong responses name a target, identify hidden values, predict side effects, and propose guardrails.",
      "Misconceptions to catch: 'clear goal' equals 'good goal'; 'not malicious' equals 'not dangerous'; 'human review' equals meaningful oversight.",
    ],
  },
  studentMaterials: {
    auditTitle: "Student Optimizer Audit",
    auditPrompt: "A system told to maximize a single target can become dangerous when the target is too narrow for the world it governs.",
    auditFields: [
      "System or situation",
      "Goal it is told to maximize",
      "Metric used to measure success",
      "Values the metric might hide",
      "Predictable side effects",
      "Constraints or non-negotiables",
      "Shutdown, pause, or human review condition",
    ],
    discussionTracker: [
      "The strongest reason the paperclip case matters is...",
      "The strongest objection to the paperclip case is...",
      "A school metric that can become dangerous if over-optimized is...",
      "One design choice that would make an optimizer safer is...",
    ],
    exitTicket: "Goodhart's Law says, 'when a measure becomes a target, it ceases to be a good measure.' Apply it to one metric in your school.",
  },
  extensions: {
    crossCurricular: [
      { subject: "Computer Science", connection: "Reward hacking: agents finding unintended ways to maximize reward. Connect to objective functions, alignment, and governance." },
      { subject: "Economics", connection: "Goodhart's Law and Campbell's Law in social science measurement." },
      { subject: "Civics", connection: "Algorithmic accountability: how do communities audit systems whose goals cannot be fully specified?" },
    ],
    homeExtension: "Family discussion: Pick one app you use a lot. What is it optimizing for? What might it sacrifice along the way?",
    project: "Students investigate one real recommender system, school metric, or platform incentive. Identify the metric, unintended consequences, and one alignment approach that might help.",
  },
  pages: [
    { id: "cover", kind: "cover", title: "Cover" },
    { id: "at-a-glance", kind: "teacher-guide", title: "At a Glance" },
    { id: "run-of-show", kind: "teacher-guide", title: "Run of Show" },
    { id: "student-materials", kind: "section-opener", title: "Student Materials" },
    { id: "optimizer-audit", kind: "student-worksheet", title: "Optimizer Audit" },
    { id: "discussion-exit", kind: "student-worksheet", title: "Discussion Tracker and Exit Ticket" },
    { id: "teacher-support", kind: "teacher-support", title: "Teacher Support Notes" },
    { id: "extensions", kind: "extension", title: "Extensions and Connections" },
  ],
};

export const CLASSROOM_PACKETS = {
  [paperclipPacket.slug]: paperclipPacket,
};

export function getClassroomPacket(slug) {
  return CLASSROOM_PACKETS[slug] || null;
}
