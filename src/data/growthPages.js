import { C } from "../theme.js";

const today = "2026-05-28";

export const SEARCH_LANDING_PAGES = [
  {
    route: "ai-ethics-lesson-plans",
    label: "AI Ethics Lesson Plans",
    title: "AI Ethics Lesson Plans for Teachers",
    metaTitle: "AI Ethics Lesson Plans for Teachers - The Examined Classroom",
    metaDescription:
      "Free AI ethics lesson plans and classroom-ready thought experiments for K-12 teachers, with grade-band pathways, discussion tools, packets, and policy activities.",
    accent: C.teal,
    imageKey: "ai-ethics-lesson-plans",
    intro:
      "A practical doorway into The Examined Classroom for K-12 teachers and school leaders: classroom-ready thought experiments, complete lesson packets, discussion tools, and policy activities that help students reason about AI with care.",
    why:
      "Teachers do not need a generic AI news hub. They need a lesson-ready path from a real classroom question to a discussion, packet, rubric, or policy activity they can use this week.",
    primaryAction: { label: "Open lesson-ready dilemmas", href: "/thought-experiments" },
    secondaryAction: { label: "Use the picker", href: "/picker" },
    startHere: [
      {
        label: "K-5",
        title: "Start with story choices",
        text: "Elementary scenarios about fairness, robots, AI help, honesty, and human judgment.",
        href: "/thought-experiments/k-5",
      },
      {
        label: "Grades 6-8",
        title: "Run a dilemma turn",
        text: "Middle school discussions that connect AI ethics to identity, fairness, privacy, and trust.",
        href: "/thought-experiments/6-8",
      },
      {
        label: "Grades 9-12",
        title: "Pair classic philosophy with AI",
        text: "High school thought experiments from Mary's Room to the Paperclip Maximizer.",
        href: "/thought-experiments/9-12",
      },
      {
        label: "Staff PD",
        title: "Use educator-facing AI dilemmas",
        text: "Scenarios for AI detectors, grading tools, surveillance, and school policy design.",
        href: "/thought-experiments/educators",
      },
    ],
    curatedLinks: [
      { label: "The Paperclip Maximizer classroom packet", href: "/teaching-resources/paperclip-maximizer", note: "Complete high school AI ethics packet." },
      { label: "The Consciousness Line lesson packets", href: "/teaching-resources/consciousness-line", note: "Grades 6-8 and 9-12 lesson packets." },
      { label: "AI authorship classroom discussion", href: "/teaching-resources/ai-authorship-discussion", note: "Academic integrity and student voice." },
      { label: "AI detector false positive discussion", href: "/teaching-resources/ai-detector-false-positive", note: "Evidence, fairness, and policy caution." },
      { label: "AI Use Rubric", href: "/ai-rubric", note: "Evaluate a proposed classroom AI use." },
      { label: "AI Policy Builder", href: "/ai-policy", note: "Draft school policy language from stance questions." },
    ],
    topics: ["AI ethics lesson plans", "AI literacy", "academic integrity", "fairness", "school AI policy"],
    newsletterAngle: "Get one classroom-ready dilemma and teaching note before Monday.",
  },
  {
    route: "thought-experiments-for-kids",
    label: "Thought Experiments for Kids",
    title: "Thought Experiments for Kids",
    metaTitle: "Thought Experiments for Kids - The Examined Classroom",
    metaDescription:
      "Free thought experiments for kids, organized by grade band, topic, and classroom use, with story-based philosophy and AI ethics discussion resources.",
    accent: C.gold,
    imageKey: "thought-experiments",
    intro:
      "Story-based philosophy and AI ethics discussions for elementary, middle, and high school classrooms. Students enter through a concrete dilemma, then practice giving reasons, listening, revising, and naming values.",
    why:
      "Thought experiments work because students can think before they know the vocabulary. A good scenario lets a class reason about fairness, identity, rules, knowledge, care, and technology without turning the room into a lecture.",
    primaryAction: { label: "Browse by grade band", href: "/thought-experiments" },
    secondaryAction: { label: "Open the Dialogue Toolkit", href: "/thought-experiments/toolkit" },
    startHere: [
      { label: "K-5", title: "Gentle read-aloud choices", text: "Grade-specific stories with age-appropriate teacher kits.", href: "/thought-experiments/k-5" },
      { label: "Grades 6-8", title: "Identity, fairness, and trust", text: "Middle school scenarios designed for discussion turns.", href: "/thought-experiments/6-8" },
      { label: "Grades 9-12", title: "Classic thought experiments, current AI", text: "High school scenarios that connect the canon to today's classroom questions.", href: "/thought-experiments/9-12" },
      { label: "Teacher tools", title: "Run the conversation well", text: "Norms, stems, protocols, and Socratic moves for classroom dialogue.", href: "/thought-experiments/toolkit" },
    ],
    curatedLinks: [
      { label: "Kindergarten thought experiments", href: "/thought-experiments/kindergarten", note: "Care, sharing, toys, and first ethical language." },
      { label: "Grade 5 AI ethics scenarios", href: "/thought-experiments/grade-5", note: "AI friendship, homework help, bias, and grading mistakes." },
      { label: "Thought Experiment Picker", href: "/picker", note: "Find a scenario by grade, time, and topic." },
      { label: "Philosophy for Kids", href: "/philosophy-for-kids", note: "Teacher-friendly pathways into philosophy." },
      { label: "Dialogue Toolkit", href: "/thought-experiments/toolkit", note: "Classroom norms and discussion protocols." },
    ],
    topics: ["thought experiments for kids", "philosophy for children", "classroom discussion", "AI ethics stories"],
    newsletterAngle: "Build a weekly classroom routine around one question students can actually argue about.",
  },
  {
    route: "ai-literacy-activities",
    label: "AI Literacy Activities",
    title: "AI Literacy Activities for K-12 Classrooms",
    metaTitle: "AI Literacy Activities for K-12 Classrooms - The Examined Classroom",
    metaDescription:
      "Free AI literacy activities for K-12 teachers, including discussion prompts, classroom dilemmas, rubrics, policy tools, and practical student-facing AI ethics resources.",
    accent: C.ocean,
    imageKey: "ai-in-education",
    intro:
      "AI literacy is not only vocabulary about models and prompts. Students also need practice asking what a tool is for, what it hides, who benefits, who might be harmed, and when human judgment should stay visible.",
    why:
      "The fastest classroom wins are short, structured activities that connect AI concepts to decisions students and teachers already face: authorship, feedback, fairness, privacy, evidence, and responsibility.",
    primaryAction: { label: "Open AI ethics lesson plans", href: "/ai-ethics-lesson-plans" },
    secondaryAction: { label: "Try the AI Use Rubric", href: "/ai-rubric" },
    startHere: [
      { label: "Discussion", title: "Use AI ethics dilemmas", text: "Open scenario-based activities students can reason through in one class period.", href: "/thought-experiments" },
      { label: "Student use", title: "Score a proposed AI use", text: "Use the six-dimension rubric before introducing a tool or assignment.", href: "/ai-rubric" },
      { label: "Class policy", title: "Make expectations visible", text: "Turn AI-use norms into policy language teachers can discuss.", href: "/ai-policy" },
      { label: "Evidence base", title: "Read the AI in Education hub", text: "Teacher-facing background on foundations, tools, practice, policy, and readiness.", href: "/ai-education" },
    ],
    curatedLinks: [
      { label: "AI authorship classroom discussion", href: "/teaching-resources/ai-authorship-discussion", note: "What counts as student work?" },
      { label: "AI detector false positive discussion", href: "/teaching-resources/ai-detector-false-positive", note: "Why detector claims need careful interpretation." },
      { label: "Biased classroom robot discussion", href: "/teaching-resources/biased-classroom-robot", note: "Elementary-friendly fairness and bias activity." },
      { label: "AI grading mistake scenario", href: "/teaching-resources/ai-grading-mistake", note: "Human review and accountability in assessment." },
      { label: "AI Education: Future Readiness", href: "/ai-education/future-readiness", note: "AI literacy and future-facing capacities." },
    ],
    topics: ["AI literacy activities", "K-12 AI literacy", "student AI use", "AI fairness", "AI classroom prompts"],
    newsletterAngle: "Turn AI literacy into a recurring classroom practice instead of a one-time assembly.",
  },
  {
    route: "school-ai-policy-tools",
    label: "School AI Policy Tools",
    title: "School AI Policy Tools",
    metaTitle: "School AI Policy Tools - The Examined Classroom",
    metaDescription:
      "Free school AI policy tools for teachers and leaders, including an AI policy builder, AI use rubric, educator dilemmas, and staff discussion activities.",
    accent: C.gold,
    imageKey: "ai-ethics",
    intro:
      "School AI policy improves when teams slow down long enough to name the values, tradeoffs, and classroom realities behind the rules. This page gathers the tools and staff activities for that work.",
    why:
      "A policy that says 'use AI responsibly' rarely changes practice. Leaders need a way to move from values to cases, then from cases to language teachers and families can understand.",
    primaryAction: { label: "Draft a school AI policy", href: "/ai-policy" },
    secondaryAction: { label: "Open educator dilemmas", href: "/thought-experiments/educators" },
    startHere: [
      { label: "Policy draft", title: "AI Policy Builder", text: "Answer nine stance-setting questions and copy a starting policy draft.", href: "/ai-policy" },
      { label: "Decision check", title: "AI Use Rubric", text: "Score a proposed AI use across learning, equity, privacy, and accountability.", href: "/ai-rubric" },
      { label: "Staff PD", title: "AI policy design activity", text: "Use a faculty dilemma before writing schoolwide language.", href: "/teaching-resources/ai-policy-design-staff-activity" },
      { label: "Leadership cases", title: "Educator AI dilemmas", text: "Run surveillance, detector, grading, and admissions cases with staff.", href: "/thought-experiments/educators" },
    ],
    curatedLinks: [
      { label: "School surveillance scenario", href: "/teaching-resources/school-surveillance", note: "Privacy, safety, and trust in policy conversation." },
      { label: "AI detector false positive discussion", href: "/teaching-resources/ai-detector-false-positive", note: "Academic integrity and due process." },
      { label: "AI grading mistake scenario", href: "/teaching-resources/ai-grading-mistake", note: "Assessment accountability and human review." },
      { label: "AI policy and ethics hub", href: "/ai-education/policy-ethics", note: "Broader implementation guidance." },
      { label: "From Ambiguity to Action", href: "/ai-ambiguity-to-action", note: "Why values need operational translation." },
    ],
    topics: ["school AI policy", "AI policy builder", "AI use rubric", "staff PD", "academic integrity policy"],
    newsletterAngle: "Bring one concrete AI case to the next staff meeting before rewriting rules.",
  },
  {
    route: "academic-integrity-ai-discussions",
    label: "AI Academic Integrity Discussions",
    title: "AI Academic Integrity Discussions",
    metaTitle: "AI Academic Integrity Discussions - The Examined Classroom",
    metaDescription:
      "Classroom-ready AI academic integrity discussions about AI authorship, detector false positives, student honesty, policy language, and responsible AI use.",
    accent: C.coral,
    imageKey: "ai-authorship",
    intro:
      "AI academic integrity problems are rarely solved by one rule or one detector score. Students, teachers, and families need shared language for authorship, evidence, transparency, and learning.",
    why:
      "When policy is silent or vague, every case becomes a conflict. Structured discussions help schools separate what happened, what can be known, what learning was supposed to show, and what response is fair.",
    primaryAction: { label: "Open AI authorship discussion", href: "/teaching-resources/ai-authorship-discussion" },
    secondaryAction: { label: "Try the AI Use Rubric", href: "/ai-rubric" },
    startHere: [
      { label: "Student work", title: "AI authorship discussion", text: "A classroom case about help, voice, disclosure, and learning evidence.", href: "/teaching-resources/ai-authorship-discussion" },
      { label: "Detectors", title: "False positive discussion", text: "A staff and classroom activity about detector limits and due process.", href: "/teaching-resources/ai-detector-false-positive" },
      { label: "Policy", title: "AI Policy Builder", text: "Draft expectations before individual cases become ad hoc decisions.", href: "/ai-policy" },
      { label: "Framework", title: "The AI Authorship Quandary", text: "Read the longer article and evidence framing behind the dilemma.", href: "/ai-authorship-quandary" },
    ],
    curatedLinks: [
      { label: "AI Use Rubric", href: "/ai-rubric", note: "Clarify what kind of AI use supports or weakens learning." },
      { label: "AI policy design staff activity", href: "/teaching-resources/ai-policy-design-staff-activity", note: "Turn cases into shared policy language." },
      { label: "AI Education: Student Tools", href: "/ai-education/student-tools", note: "Guardrails for student-facing AI supports." },
      { label: "Dialogue Toolkit", href: "/thought-experiments/toolkit", note: "Use norms and stems for hard conversations." },
    ],
    topics: ["AI academic integrity", "AI authorship", "AI detectors", "student honesty", "AI policy language"],
    newsletterAngle: "Use one dilemma to make expectations clearer before the next contested assignment.",
  },
  {
    route: "philosophy-for-kids",
    label: "Philosophy for Kids",
    title: "Philosophy for Kids",
    metaTitle: "Philosophy for Kids - The Examined Classroom",
    metaDescription:
      "Teacher-friendly philosophy for kids resources, with K-5 stories, middle and high school thought experiments, dialogue tools, and classroom-ready discussion prompts.",
    accent: C.green,
    imageKey: "phil-education",
    intro:
      "Philosophy for kids begins with real questions students can feel: What is fair? What makes something the same thing over time? Can a machine understand? When should a rule bend?",
    why:
      "The goal is not to turn children into miniature graduate students. It is to give them practice noticing reasons, listening across disagreement, and asking better questions together.",
    primaryAction: { label: "Browse thought experiments for kids", href: "/thought-experiments-for-kids" },
    secondaryAction: { label: "Read philosophy in K-12", href: "/phil-education" },
    startHere: [
      { label: "Elementary", title: "K-5 story pathways", text: "Gentle stories by grade band with teacher notes and read-aloud support.", href: "/thought-experiments/k-5" },
      { label: "Middle school", title: "Everyday dilemmas, deeper reasons", text: "Identity, fairness, privacy, and AI ethics for grades 6-8.", href: "/thought-experiments/6-8" },
      { label: "High school", title: "Classics and AI dilemmas", text: "Plato's Cave, Mary's Room, the Chinese Room, and modern AI questions.", href: "/thought-experiments/9-12" },
      { label: "Teacher practice", title: "Dialogue Toolkit", text: "Norms, sentence stems, protocols, and Socratic moves.", href: "/thought-experiments/toolkit" },
    ],
    curatedLinks: [
      { label: "Philosophy in K-12 Education", href: "/phil-education", note: "The research and curriculum case." },
      { label: "Thought Experiments for Kids", href: "/thought-experiments-for-kids", note: "Grade-band routes for classroom use." },
      { label: "Moral Psychology and AI Alignment", href: "/moral-psych", note: "For deeper teacher background." },
      { label: "The Consciousness Line lesson packets", href: "/teaching-resources/consciousness-line", note: "Philosophy of mind and AI for grades 6-12." },
      { label: "Dialogue Toolkit", href: "/thought-experiments/toolkit", note: "Run philosophy discussions with care." },
    ],
    topics: ["philosophy for kids", "philosophy for children", "classroom thought experiments", "Socratic discussion"],
    newsletterAngle: "Bring one durable question into the week and let students practice reasoning out loud.",
  },
];

export const TEACHING_RESOURCE_PAGES = [
  {
    route: "teaching-resources/paperclip-maximizer",
    label: "Teacher Resource",
    title: "Paperclip Maximizer Classroom Packet",
    metaTitle: "Paperclip Maximizer Classroom Packet - The Examined Classroom",
    metaDescription:
      "A classroom-ready Paperclip Maximizer lesson packet for high school AI ethics, with objectives, materials, discussion flow, teacher notes, and related resources.",
    accent: C.ocean,
    imageKey: "paperclip-maximizer",
    gradeBand: "Grades 9-12",
    time: "45-60 minutes",
    essentialQuestion: "What can go wrong when an optimizer pursues a goal without enough human values built into the system?",
    overview:
      "Students investigate a famous AI safety scenario by auditing an optimizer's goal, identifying missing values, and debating how schools should set guardrails for automated systems.",
    objectives: [
      "Explain why a narrow objective can produce harmful outcomes.",
      "Distinguish efficiency from ethical success.",
      "Use evidence from the scenario to propose better constraints.",
    ],
    materials: [
      "Projector or printed scenario packet.",
      "Student optimizer audit handout from the classroom packet.",
      "Exit ticket or short written reflection.",
    ],
    flow: [
      "Open with a quick prediction: what should a paperclip-making machine maximize besides paperclips?",
      "Read or project the scenario and ask students to list the optimizer's explicit and missing goals.",
      "Have small groups complete the optimizer audit, naming stakeholders and unintended consequences.",
      "Debrief by comparing guardrail proposals and asking which values are hard to turn into rules.",
      "Close with an exit ticket connecting the scenario to a classroom or school technology decision.",
    ],
    teacherNotes: [
      "Keep the discussion grounded in goal design, not fear of robots.",
      "Push students to name tradeoffs: safety, learning, privacy, efficiency, fairness, and autonomy.",
      "Use this as a bridge to the AI Use Rubric or policy activity if your class is discussing real school tools.",
    ],
    primaryAction: { label: "Open the full classroom packet", href: "/thought-experiments/packet/paperclip-maximizer" },
    relatedLinks: [
      { label: "AI ethics lesson plans", href: "/ai-ethics-lesson-plans" },
      { label: "Grades 9-12 thought experiments", href: "/thought-experiments/9-12" },
      { label: "AI Use Rubric", href: "/ai-rubric" },
    ],
    topics: ["AI safety", "goal alignment", "optimization", "human values"],
  },
  {
    route: "teaching-resources/consciousness-line",
    label: "Teacher Resource",
    title: "The Consciousness Line Lesson Packets",
    metaTitle: "The Consciousness Line Lesson Packets - The Examined Classroom",
    metaDescription:
      "Ready-to-teach Consciousness Line lesson packets for grades 6-8 and 9-12, with objectives, materials, discussion flow, teacher notes, and related AI ethics resources.",
    accent: C.coral,
    imageKey: "ai-consciousness",
    gradeBand: "Grades 6-8 and 9-12",
    time: "One to three class periods",
    essentialQuestion: "How should we act when we are uncertain whether another system can have experiences?",
    overview:
      "These packets help students reason about consciousness, evidence, humility, and moral status without turning uncertainty into either panic or dismissal.",
    objectives: [
      "Describe why consciousness is difficult to measure from the outside.",
      "Compare competing kinds of evidence for inner experience.",
      "Develop a cautious ethical response under uncertainty.",
    ],
    materials: [
      "Grade 6-8 or 9-12 lesson packet.",
      "Leveled reading and vocabulary support.",
      "Discussion tracker, assessment, and rubric materials.",
    ],
    flow: [
      "Begin with a familiar case: how do we know another person or animal feels something?",
      "Introduce the Consciousness Line reading and have students mark evidence claims.",
      "Use the packet activity to place cases along a confidence continuum.",
      "Facilitate discussion about what caution requires when evidence is incomplete.",
      "Assess with a short written response using the provided rubric.",
    ],
    teacherNotes: [
      "Frame uncertainty as a reasoning problem, not a trivia problem.",
      "Let students distinguish belief, evidence, and ethical response.",
      "The high school version can connect directly to philosophy of mind and AI ethics.",
    ],
    primaryAction: { label: "Open the lesson packets", href: "/ai-consciousness/lesson-plans" },
    relatedLinks: [
      { label: "The Consciousness Line article", href: "/ai-consciousness" },
      { label: "Philosophy for Kids", href: "/philosophy-for-kids" },
      { label: "AI ethics lesson plans", href: "/ai-ethics-lesson-plans" },
    ],
    topics: ["consciousness", "moral status", "AI ethics", "philosophy of mind"],
  },
  {
    route: "teaching-resources/ai-authorship-discussion",
    label: "Teacher Resource",
    title: "AI Authorship Classroom Discussion",
    metaTitle: "AI Authorship Classroom Discussion - The Examined Classroom",
    metaDescription:
      "A classroom-ready AI authorship discussion about student work, AI assistance, honesty, disclosure, learning evidence, and school policy.",
    accent: C.gold,
    imageKey: "ai-authorship",
    gradeBand: "Grades 6-12 and educator PD",
    time: "30-45 minutes",
    essentialQuestion: "When does AI help support student learning, and when does it replace the work the assignment was meant to show?",
    overview:
      "Students or staff examine a contested AI-assisted assignment, separate assumptions from evidence, and draft clearer expectations for future work.",
    objectives: [
      "Identify what an assignment is meant to assess.",
      "Differentiate assistance, collaboration, editing, and substitution.",
      "Draft disclosure language that protects both learning and fairness.",
    ],
    materials: [
      "Interactive authorship scenario.",
      "Board space for 'known, assumed, unknown' evidence.",
      "Optional policy draft or syllabus language.",
    ],
    flow: [
      "Present the case without announcing a verdict.",
      "Ask students to list what the teacher, student, and parent each know or assume.",
      "Have groups decide what learning evidence would matter most.",
      "Compare responses: redo, revise, conference, disclose, or sanction.",
      "Close by drafting one sentence of clearer AI-use guidance.",
    ],
    teacherNotes: [
      "Avoid making detection the center of the lesson; keep learning evidence central.",
      "Name legitimate supports, such as brainstorming and feedback, separately from hidden substitution.",
      "This activity works well before a writing unit or policy refresh.",
    ],
    primaryAction: { label: "Open the interactive scenario", href: "/thought-experiments/educators?experiment=ai-authorship" },
    relatedLinks: [
      { label: "The AI Authorship Quandary", href: "/ai-authorship-quandary" },
      { label: "Academic integrity AI discussions", href: "/academic-integrity-ai-discussions" },
      { label: "AI Policy Builder", href: "/ai-policy" },
    ],
    topics: ["AI authorship", "academic integrity", "student work", "disclosure"],
  },
  {
    route: "teaching-resources/ai-detector-false-positive",
    label: "Teacher Resource",
    title: "AI Detector False Positive Discussion",
    metaTitle: "AI Detector False Positive Discussion - The Examined Classroom",
    metaDescription:
      "A teacher-ready AI detector false positive discussion for academic integrity, due process, evidence, fairness, and responsible school AI policy.",
    accent: C.coral,
    imageKey: "ai-detector-false-positive",
    gradeBand: "Grades 6-12 and educator PD",
    time: "30-45 minutes",
    essentialQuestion: "What should a school do when a detector makes a serious claim but the evidence is uncertain?",
    overview:
      "A student is accused after an AI detector flags writing. The class or staff team examines evidence, fairness, and what a responsible response should require.",
    objectives: [
      "Explain why detector output is a claim, not a verdict.",
      "Identify due-process steps for contested academic integrity cases.",
      "Design a response that protects learning and avoids false certainty.",
    ],
    materials: [
      "Interactive false-positive scenario.",
      "Evidence chart with columns for claim, source, confidence, and next step.",
      "Optional school academic integrity language.",
    ],
    flow: [
      "Open with a question: what evidence should be required before an accusation?",
      "Run the scenario and pause before any final decision.",
      "Have groups separate detector claims from other evidence.",
      "Ask each group to recommend a next step and justify what would make it fair.",
      "Close by revising one policy sentence about detector use.",
    ],
    teacherNotes: [
      "Make room for students who worry about being wrongly accused.",
      "Keep the focus on responsible evidence use, not on teaching evasion tactics.",
      "Pair with the policy builder when a staff team needs concrete language.",
    ],
    primaryAction: { label: "Open the interactive scenario", href: "/thought-experiments/educators?experiment=ai-detector-false-positive" },
    relatedLinks: [
      { label: "AI academic integrity discussions", href: "/academic-integrity-ai-discussions" },
      { label: "AI authorship classroom discussion", href: "/teaching-resources/ai-authorship-discussion" },
      { label: "AI Policy Builder", href: "/ai-policy" },
    ],
    topics: ["AI detectors", "academic integrity", "due process", "fairness"],
  },
  {
    route: "teaching-resources/biased-classroom-robot",
    label: "Teacher Resource",
    title: "Biased Classroom Robot Discussion",
    metaTitle: "Biased Classroom Robot Discussion - The Examined Classroom",
    metaDescription:
      "A classroom-ready biased robot discussion for elementary AI ethics, fairness, bias, classroom technology, and human judgment.",
    accent: C.teal,
    imageKey: "biased-classroom-robot",
    gradeBand: "Grade 5",
    time: "25-35 minutes",
    essentialQuestion: "What should a class do when a helpful robot seems to treat some students unfairly?",
    overview:
      "Students use an age-appropriate classroom robot story to notice bias, ask what counts as evidence, and decide what humans should do when technology is unfair.",
    objectives: [
      "Notice patterns that may show unfair treatment.",
      "Explain why a tool can be helpful and still need correction.",
      "Propose a fair classroom response that includes human judgment.",
    ],
    materials: [
      "Grade 5 thought experiment page.",
      "Chart paper or board for evidence and possible responses.",
      "Optional reflection prompt.",
    ],
    flow: [
      "Ask students what fairness should look like when a classroom tool helps people.",
      "Read the robot scenario and gather evidence from the story.",
      "Have pairs decide whether the class should keep, pause, change, or remove the tool.",
      "Discuss what information a teacher should collect before deciding.",
      "Close with a written sentence: a fair technology should...",
    ],
    teacherNotes: [
      "Use concrete classroom language before introducing the word bias.",
      "Encourage students to distinguish intent from impact.",
      "This is a gentle entry point into algorithmic fairness.",
    ],
    primaryAction: { label: "Open the Grade 5 scenario", href: "/thought-experiments/grade-5?experiment=biased-classroom-robot" },
    relatedLinks: [
      { label: "Thought experiments for kids", href: "/thought-experiments-for-kids" },
      { label: "AI literacy activities", href: "/ai-literacy-activities" },
      { label: "Grade 5 thought experiments", href: "/thought-experiments/grade-5" },
    ],
    topics: ["AI bias", "fairness", "elementary AI ethics", "classroom technology"],
  },
  {
    route: "teaching-resources/school-surveillance",
    label: "Teacher Resource",
    title: "School Surveillance Scenario",
    metaTitle: "School Surveillance Scenario - The Examined Classroom",
    metaDescription:
      "A staff-ready school surveillance scenario for AI policy discussions about privacy, safety, trust, evidence, and school community values.",
    accent: C.ocean,
    imageKey: "school-surveillance",
    gradeBand: "Educator PD and grades 9-12",
    time: "35-50 minutes",
    essentialQuestion: "How should a school balance safety, privacy, trust, and evidence when considering AI surveillance?",
    overview:
      "A school considers an AI surveillance system. Participants test policy claims against student trust, privacy risk, safety goals, and accountability requirements.",
    objectives: [
      "Identify competing values in school surveillance decisions.",
      "Evaluate whether evidence supports the proposed intervention.",
      "Draft guardrails or refusal criteria for surveillance tools.",
    ],
    materials: [
      "Interactive school surveillance scenario.",
      "Stakeholder map for students, families, teachers, and leaders.",
      "Optional AI Use Rubric for follow-up scoring.",
    ],
    flow: [
      "Start by naming the safety problem the tool claims to solve.",
      "Run the scenario and pause at the decision point.",
      "Map benefits, risks, missing evidence, and affected groups.",
      "Ask teams to write guardrails or reasons to reject the tool.",
      "Use the AI Use Rubric to compare recommendations.",
    ],
    teacherNotes: [
      "Avoid treating privacy and safety as automatic opposites; ask what evidence exists for both.",
      "Name trust as a school condition, not just a feeling.",
      "This works especially well for leadership teams drafting AI procurement norms.",
    ],
    primaryAction: { label: "Open the interactive scenario", href: "/thought-experiments/educators?experiment=school-surveillance" },
    relatedLinks: [
      { label: "School AI policy tools", href: "/school-ai-policy-tools" },
      { label: "AI Use Rubric", href: "/ai-rubric" },
      { label: "AI Policy Builder", href: "/ai-policy" },
    ],
    topics: ["school surveillance", "privacy", "safety", "AI policy"],
  },
  {
    route: "teaching-resources/ai-grading-mistake",
    label: "Teacher Resource",
    title: "AI Grading Mistake Scenario",
    metaTitle: "AI Grading Mistake Scenario - The Examined Classroom",
    metaDescription:
      "A classroom-ready AI grading mistake scenario about assessment, fairness, feedback, accountability, and human review in K-12 schools.",
    accent: C.gold,
    imageKey: "ai-grading-mistake",
    gradeBand: "Grade 5 and educator PD",
    time: "25-40 minutes",
    essentialQuestion: "Who is responsible when an AI grading tool makes a mistake that affects a student?",
    overview:
      "Students discuss a grading mistake, weigh efficiency against fairness, and decide what human review should require when technology touches assessment.",
    objectives: [
      "Explain why assessment decisions need accountability.",
      "Identify what a fair correction process should include.",
      "Describe when AI feedback might help and when it should be checked by a human.",
    ],
    materials: [
      "Grade 5 AI grading scenario.",
      "Simple responsibility map: student, teacher, tool, school.",
      "Optional AI Use Rubric follow-up.",
    ],
    flow: [
      "Ask what makes grading feel fair or unfair.",
      "Read the scenario and identify the mistake and its consequence.",
      "Have students map who can notice, fix, and prevent the mistake.",
      "Discuss whether the tool should be used again and under what conditions.",
      "Close with one classroom rule for using AI in grading or feedback.",
    ],
    teacherNotes: [
      "Students can handle the fairness issue without technical detail about models.",
      "Keep the conversation centered on review, explanation, and repair.",
      "For staff PD, extend into grading-policy and feedback-use norms.",
    ],
    primaryAction: { label: "Open the Grade 5 scenario", href: "/thought-experiments/grade-5?experiment=ai-grading-mistake" },
    relatedLinks: [
      { label: "AI literacy activities", href: "/ai-literacy-activities" },
      { label: "AI Use Rubric", href: "/ai-rubric" },
      { label: "School AI policy tools", href: "/school-ai-policy-tools" },
    ],
    topics: ["AI grading", "assessment", "fairness", "human review"],
  },
  {
    route: "teaching-resources/ai-policy-design-staff-activity",
    label: "Teacher Resource",
    title: "AI Policy Design Staff Activity",
    metaTitle: "AI Policy Design Staff Activity - The Examined Classroom",
    metaDescription:
      "A staff-ready AI policy design activity for school teams, with objectives, materials, discussion flow, teacher notes, and links to free policy tools.",
    accent: C.green,
    imageKey: "ai-policy-design",
    gradeBand: "Educator PD and school leadership",
    time: "45-75 minutes",
    essentialQuestion: "How can a school turn shared values into AI policy language that teachers, students, and families can actually use?",
    overview:
      "Staff teams work from a policy-design dilemma into concrete stance statements, guardrails, and next-step policy language.",
    objectives: [
      "Name the values that should guide school AI use.",
      "Translate values into practical permissions, limits, and review steps.",
      "Draft policy language that is clear enough for classroom use.",
    ],
    materials: [
      "Interactive AI policy design scenario.",
      "AI Policy Builder.",
      "AI Use Rubric or existing school policy draft.",
    ],
    flow: [
      "Open by asking staff where current AI expectations are clear, vague, or missing.",
      "Run the policy design scenario and identify the decision pressures.",
      "Have teams draft stance statements for student use, teacher use, privacy, and accountability.",
      "Use the AI Policy Builder to turn those stances into a working draft.",
      "Close by naming what evidence, review, or stakeholder input is needed before adoption.",
    ],
    teacherNotes: [
      "Treat the output as a starting draft, not legal advice or board-ready policy.",
      "Invite teachers to name classroom realities before leadership finalizes language.",
      "This activity pairs well with detector and surveillance scenarios.",
    ],
    primaryAction: { label: "Open the staff scenario", href: "/thought-experiments/educators?experiment=ai-policy-design" },
    relatedLinks: [
      { label: "AI Policy Builder", href: "/ai-policy" },
      { label: "School AI policy tools", href: "/school-ai-policy-tools" },
      { label: "From Ambiguity to Action", href: "/ai-ambiguity-to-action" },
    ],
    topics: ["AI policy", "staff PD", "school leadership", "responsible AI use"],
  },
];

export const SEARCH_LANDING_ROUTES = SEARCH_LANDING_PAGES.map((page) => page.route);
export const TEACHING_RESOURCE_ROUTES = TEACHING_RESOURCE_PAGES.map((page) => page.route);

export const SEARCH_LANDING_PAGE_BY_ROUTE = Object.fromEntries(
  SEARCH_LANDING_PAGES.map((page) => [page.route, page])
);

export const TEACHING_RESOURCE_PAGE_BY_ROUTE = Object.fromEntries(
  TEACHING_RESOURCE_PAGES.map((page) => [page.route, page])
);

export const GROWTH_PAGE_META = Object.fromEntries([
  ...SEARCH_LANDING_PAGES.map((page) => [
    page.route,
    {
      title: page.metaTitle,
      description: page.metaDescription,
      datePublished: today,
      dateModified: today,
      schemaType: "CollectionPage",
      learningResource: true,
      learningResourceType: ["Lesson plan", "Discussion activity", "Teaching guide"],
      educationalLevel: ["K-12", "Elementary school", "Middle school", "High school", "Professional development"],
      teaches: page.topics,
      about: page.topics,
      audience: ["teacher", "administrator"],
    },
  ]),
  ...TEACHING_RESOURCE_PAGES.map((page) => [
    page.route,
    {
      title: page.metaTitle,
      description: page.metaDescription,
      datePublished: today,
      dateModified: today,
      schemaType: "WebPage",
      learningResource: true,
      learningResourceType: ["Lesson plan", "Discussion activity", "Teacher guide"],
      educationalLevel: [page.gradeBand],
      teaches: page.topics,
      about: page.topics,
      audience: ["teacher", "administrator"],
    },
  ]),
]);
