// AI Policy Builder — questions + prose templates that combine into a draft
// school AI policy.
//
// The output is intentionally a STARTING POINT, not a final document. Real
// policies need legal review, community input, and board approval. The
// generated text says so up front.

export const QUESTIONS = [
  {
    id: "schoolName",
    kind: "text",
    label: "School or district name",
    placeholder: "e.g. Sample Unified School District",
    hint: "Used in the policy heading. Leave blank if you'd rather edit it in afterward.",
    optional: true,
  },
  {
    id: "gradeBands",
    kind: "multi",
    label: "Which grade bands does this policy cover?",
    hint: "Multi-select. We use this to adjust language about student agency, parental notification, and developmentally-appropriate AI literacy.",
    options: [
      { id: "k-5", label: "K–5 (Elementary)" },
      { id: "6-8", label: "6–8 (Middle)" },
      { id: "9-12", label: "9–12 (High school)" },
      { id: "adult", label: "Adult / staff PD" },
    ],
  },
  {
    id: "overallStance",
    kind: "single",
    label: "What is your school's overall posture toward AI?",
    hint: "This frames the rest of the policy. You can change it later as evidence accumulates.",
    options: [
      { id: "embrace", label: "Embrace and integrate — AI is a literacy we want students fluent in" },
      { id: "cautious", label: "Cautious adoption — explore deliberately, with guardrails" },
      { id: "restrict", label: "Restrict — limit AI use to specific approved cases only" },
    ],
  },
  {
    id: "studentUse",
    kind: "single",
    label: "Student use of AI in assignments",
    hint: "What's the default expectation for students using AI on graded work?",
    options: [
      { id: "encouraged", label: "Encouraged with disclosure — students learn to use AI productively + acknowledge it" },
      { id: "allowed-rules", label: "Allowed under clear rules — teachers specify when and how on each assignment" },
      { id: "case-by-case", label: "Case-by-case — depends on the assignment; default is no unless allowed" },
      { id: "prohibited", label: "Prohibited for graded work — AI is an aid for learning, not for producing assignments" },
    ],
  },
  {
    id: "teacherUse",
    kind: "single",
    label: "Teacher use of AI for instruction",
    hint: "Lesson planning, grading assistance, feedback drafts, IEP language, etc.",
    options: [
      { id: "encouraged", label: "Encouraged — staff are supported in adopting AI for non-evaluative tasks" },
      { id: "with-review", label: "Allowed with human review — AI output never reaches a student without a teacher's eyes on it" },
      { id: "restricted", label: "Restricted to specific tasks — explicit list of approved uses; others require approval" },
      { id: "prohibited", label: "Not allowed for instructional decisions — AI may only be used for purely administrative tasks" },
    ],
  },
  {
    id: "privacy",
    kind: "single",
    label: "Privacy and data protection",
    hint: "What's the bar a tool must clear before it can touch student data?",
    options: [
      { id: "dpa-required", label: "Signed DPA required — only AI tools with FERPA-compliant data-processing agreements" },
      { id: "case-by-case", label: "Case-by-case review — IT or designated officer reviews each tool before adoption" },
      { id: "anonymized-only", label: "Anonymized data only — no student-identifying data passed to AI tools" },
      { id: "minimal", label: "Minimal restrictions — standard staff judgment applies" },
    ],
  },
  {
    id: "attribution",
    kind: "single",
    label: "Attribution and disclosure",
    hint: "When students or staff use AI, must they say so?",
    options: [
      { id: "always", label: "Always disclose — any AI use on a public-facing or graded artifact is named" },
      { id: "significant", label: "Disclose when significant — small edits don't require attribution; substantive content does" },
      { id: "discretion", label: "At the user's discretion — teachers model good practice; not formally required" },
      { id: "no-requirement", label: "No formal requirement" },
    ],
  },
  {
    id: "equity",
    kind: "single",
    label: "Equity of access",
    hint: "How does the school ensure all students have meaningful AI access, not just those with resources at home?",
    options: [
      { id: "school-provided", label: "School-provided for all — district licenses, classroom devices, no out-of-pocket cost" },
      { id: "supported", label: "Supported but not provided — school helps families find free options, doesn't license centrally" },
      { id: "not-addressed", label: "Not addressed by this policy" },
    ],
  },
  {
    id: "review",
    kind: "single",
    label: "Review and amendment cadence",
    hint: "When will the school revisit this policy?",
    options: [
      { id: "annual", label: "Annual — reviewed every school year" },
      { id: "semester", label: "Each semester — reviewed twice a year while the landscape is changing fast" },
      { id: "as-needed", label: "As needed — reviewed when issues surface or major tool changes happen" },
      { id: "no-schedule", label: "No defined schedule" },
    ],
  },
];

// Prose builders — given the answers object, each returns a string of the
// policy section's body. Keep the output plain-prose (no bullet lists unless
// natural) so the draft reads like a policy document rather than a form.

function joinList(arr, conj = "and") {
  if (!arr || arr.length === 0) return "";
  if (arr.length === 1) return arr[0];
  if (arr.length === 2) return `${arr[0]} ${conj} ${arr[1]}`;
  return `${arr.slice(0, -1).join(", ")}, ${conj} ${arr[arr.length - 1]}`;
}

function gradeBandsPhrase(bands = []) {
  const labelById = {
    "k-5": "elementary students",
    "6-8": "middle-school students",
    "9-12": "high-school students",
    "adult": "staff and adult learners",
  };
  const labels = bands.map((b) => labelById[b]).filter(Boolean);
  if (labels.length === 0) return "students and staff";
  return joinList(labels);
}

function purposeSection(a) {
  const subject = gradeBandsPhrase(a.gradeBands);
  const stance =
    a.overallStance === "embrace"
      ? "AI literacy as a competency every learner deserves to develop, alongside the protections any new technology requires."
      : a.overallStance === "cautious"
        ? "deliberate exploration of AI's role in learning while preserving the practices we know work — feedback from teachers, time for productive struggle, honest assessment."
        : "the focused, evidence-led use of AI in specific cases where it clearly serves learning, with explicit constraints where it does not.";
  return `This policy governs the use of artificial intelligence in service of ${subject}. Our position is that ${stance}\n\nThis is a starting document, not a finished one. It exists to make our community's expectations explicit so that students, families, and staff can act with shared understanding. We will revisit it on the cadence described below and welcome questions.`;
}

function definitionsSection() {
  return `For purposes of this policy, "AI" refers primarily to generative artificial intelligence (chatbots, image generators, voice generators, AI-enabled writing assistants) and to AI-enabled tools that infer, predict, or classify information about students (engagement detectors, AI-driven adaptive platforms, AI grading and detection tools). Where this policy refers to "AI tools," it includes both categories unless otherwise specified.`;
}

function studentUseSection(a) {
  switch (a.studentUse) {
    case "encouraged":
      return `Students are encouraged to use AI tools in their learning, with the expectation that they disclose substantive use on any graded or shared work. Teachers will model healthy AI practice — using it to extend thinking, not to substitute for it — and will design assignments where AI use is visible and discussable rather than concealed. Acceptable disclosure can be as simple as a sentence at the end of an assignment: "I used [tool] to help me [task]." Misuse is addressed through the school's existing academic-integrity process; the goal is teaching better practice, not punishing exploration.`;
    case "allowed-rules":
      return `Student use of AI on graded work is allowed when the teacher has specified, in writing, what AI use is permitted on a given assignment. Default expectations: assignments are presumed to be the student's own work unless the assignment description states otherwise. Where AI use is permitted, students must disclose what they used and how. Teachers retain authority over what their assignments allow.`;
    case "case-by-case":
      return `Whether AI may be used on a graded assignment is decided by the teacher of record and communicated as part of the assignment. The default is that AI use is not permitted unless the teacher has explicitly allowed it. Students who are uncertain should ask; assuming permission is not a defense. Disclosure is required whenever AI is permitted.`;
    case "prohibited":
      return `AI tools may not be used to produce graded work. Students may use AI as a learning aid — to explain a concept, to check their own understanding, to practice — but the work submitted for assessment must be their own. This expectation will be made explicit on assignments and discussed in class so students understand both the rule and the reason for it.`;
    default:
      return `Student use of AI in graded work is determined by the teacher of record and disclosed to students as part of each assignment.`;
  }
}

function teacherUseSection(a) {
  switch (a.teacherUse) {
    case "encouraged":
      return `Teachers and staff are encouraged to use AI tools to support their work — drafting communications, generating practice items, brainstorming lesson approaches, summarizing background reading, and similar non-evaluative tasks. Decisions that affect a specific student (grades, placement, discipline, IEP determinations) must reflect professional judgment, not AI output alone. Staff who are exploring new uses are encouraged to share what they learn so the school can refine its practice.`;
    case "with-review":
      return `Staff may use AI tools as a working aid for instructional preparation, with the standing requirement that AI output never reaches a student without a teacher's eyes on it. A teacher may use AI to draft feedback, then revise and send the revised version. A teacher may not have an AI tool send feedback directly to a student. The same applies to grading suggestions, family communications, and any artifact a student will see.`;
    case "restricted":
      return `Staff use of AI for instructional work is limited to a specific list of approved tasks maintained by the school's instructional leadership. New use cases require approval before adoption. The intent is not to limit innovation but to ensure the school has visibility into where AI is shaping student-facing decisions.`;
    case "prohibited":
      return `AI tools may not be used to make or substantively shape instructional decisions about students. Permitted uses are limited to internal administrative tasks where no student is the subject of the AI's output (scheduling, document formatting, summarization of staff-only material, and similar).`;
    default:
      return `Staff use of AI for instructional work is at the staff member's discretion, with the standing expectation that consequential decisions about students rest on professional judgment.`;
  }
}

function privacySection(a) {
  switch (a.privacy) {
    case "dpa-required":
      return `No AI tool may process student-identifying data without a signed data-processing agreement that meets FERPA (and applicable state) requirements. The school's designated data officer maintains the list of approved tools. Adopting an AI tool that touches student data requires verification that an agreement is in place; this is the staff member's responsibility before use.`;
    case "case-by-case":
      return `Before an AI tool that processes student data is adopted, it must be reviewed by the school's designated officer (typically IT or the privacy lead). The review considers the tool's data-handling practices, vendor reputation, contractual protections, and whether the use case justifies the data exposure. Staff considering a new tool should request review well before they intend to start using it.`;
    case "anonymized-only":
      return `Student-identifying data may not be passed to AI tools. This includes student names, school IDs, and any content that, in context, identifies a specific student. Staff using AI for analysis or drafting may use anonymized, generalized, or hypothetical content. When in doubt, ask the designated officer.`;
    case "minimal":
      return `Standard professional judgment about student privacy applies to AI tool use. Staff are expected to consider what data they are sharing with any third party, AI or otherwise, and to err on the side of caution with identifying information.`;
    default:
      return `Staff are expected to apply professional judgment about student privacy when selecting AI tools.`;
  }
}

function attributionSection(a) {
  switch (a.attribution) {
    case "always":
      return `Any AI use on a public-facing artifact — communications to families, presentations, graded student work, published documents — is disclosed. Disclosure can be brief ("Drafted with AI assistance; reviewed and revised by the author"). The goal is honesty, not bureaucracy. Students and staff learn that disclosing AI use is the norm.`;
    case "significant":
      return `When AI substantively shapes a piece of work, the user discloses it. Light editing, formatting fixes, or grammar checks do not require attribution; using AI to generate paragraphs, structure, or arguments does. The judgment call is the user's, made in good faith.`;
    case "discretion":
      return `Staff and students are encouraged to model honest disclosure of AI use, but the school does not enforce a specific attribution standard. Teachers may set assignment-specific rules.`;
    case "no-requirement":
      return `No formal attribution requirement applies to AI use.`;
    default:
      return `Attribution practice is at the discretion of the user, with the school's general expectations about honest scholarship applying.`;
  }
}

function equitySection(a) {
  switch (a.equity) {
    case "school-provided":
      return `The school provides school-issued AI access to all students for whom this policy applies, so no student is disadvantaged by lacking the tools required for school work. Where the school cannot license a tool centrally, alternative offline or low-tech paths to the same learning are provided. Differential access is not allowed to become differential opportunity.`;
    case "supported":
      return `The school supports students in finding free or low-cost AI tools as needed for school work, and provides time and guidance within school hours for those who don't have at-home access. The school does not centrally license tools in this area.`;
    case "not-addressed":
      return `Access to AI tools outside of school-provided systems is a family decision. The school recognizes this creates potential equity gaps and intends to revisit this provision in future policy reviews.`;
    default:
      return `The school addresses equity of AI access through ordinary curricular and instructional planning rather than a separate provision.`;
  }
}

function reviewSection(a) {
  switch (a.review) {
    case "annual":
      return `This policy is reviewed annually by the school's instructional leadership team, with input from staff, students, and families. Substantive changes are brought before the school board for approval. Interim updates may be issued in response to specific incidents or major technology changes.`;
    case "semester":
      return `This policy is reviewed twice each school year, given the pace of AI capability and adoption. The mid-year review focuses on what is and isn't working in practice; the end-of-year review may propose substantive changes for board approval.`;
    case "as-needed":
      return `This policy is reviewed when issues surface or when significant changes in the available tools warrant a re-evaluation. The school will name a small group responsible for monitoring and triggering reviews.`;
    case "no-schedule":
      return `No defined review schedule applies. Updates are made at the discretion of school leadership.`;
    default:
      return `Updates to this policy are issued by school leadership as circumstances warrant.`;
  }
}

export function buildPolicy(answers) {
  const today = new Date();
  const dateStr = today.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
  const schoolName = (answers.schoolName || "").trim() || "[School name]";

  return `# AI Use Policy — ${schoolName}\n\n` +
    `*Draft generated ${dateStr} via the AI Policy Builder at theethicaleducator.com/ai-policy. This is a starting point, not a finished document — please review with counsel, the community, and the board before adopting.*\n\n` +
    `## 1. Purpose\n\n${purposeSection(answers)}\n\n` +
    `## 2. Definitions\n\n${definitionsSection(answers)}\n\n` +
    `## 3. Student use\n\n${studentUseSection(answers)}\n\n` +
    `## 4. Staff use\n\n${teacherUseSection(answers)}\n\n` +
    `## 5. Privacy and data\n\n${privacySection(answers)}\n\n` +
    `## 6. Attribution and disclosure\n\n${attributionSection(answers)}\n\n` +
    `## 7. Equity of access\n\n${equitySection(answers)}\n\n` +
    `## 8. Review and amendment\n\n${reviewSection(answers)}\n\n` +
    `---\n\n` +
    `*This draft was assembled from a fixed-choice questionnaire. Any final policy must be reviewed by counsel, vetted with the school community, and adopted through your normal governance process. The Ethical Educator does not provide legal advice.*\n`;
}
