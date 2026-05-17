import { C } from "../theme.js";

const base = "/illustrations/ai-education";

export const AI_EDUCATION_HUB = {
  id: "ai-education",
  title: "AI in Education",
  sectionLabel: "Classroom Practice · Policy · Future Readiness",
  desc: "A practical, current guide for teachers and school leaders: what AI is, what it can support, where the risks sit, and how to build student learning instead of outsourcing it.",
  image: `${base}/ai-classroom-hub.webp`,
  imageAlt: "A contemporary classroom planning table with a laptop, learning pathways, rubrics, accessibility tools, and warm classroom light.",
  accent: C.ocean,
};

export const AI_EDUCATION_ROUTE_IDS = [
  "ai-education/foundations",
  "ai-education/classroom-practice",
  "ai-education/student-tools",
  "ai-education/policy-ethics",
  "ai-education/future-readiness",
  "ai-education/tools-resources",
];

export const AI_EDUCATION_PAGES = {
  "ai-education/foundations": {
    id: "ai-education/foundations",
    title: "Foundations & AI Landscape",
    shortTitle: "Foundations",
    sectionLabel: "AI in Education · Foundations",
    desc: "What educators need to know about AI before choosing tools: realized AI, generative AI, emotion AI, neural decoding, and the speculative horizon from capable systems to AGI.",
    shortDesc: "A plain-language map of current AI, generative AI, and future-facing claims so staff can discuss tools without hype or panic.",
    image: `${base}/evidence-learning-balance.webp`,
    imageAlt: "A teacher research desk with papers, charts, and a tablet showing a balance between growth and caution.",
    accent: C.teal,
    readingMinutes: 9,
    bigIdea: "AI literacy starts with accurate categories. Teachers and leaders do not need to become engineers, but they do need enough conceptual clarity to separate current classroom tools from speculative claims.",
    useWithCaution: "Do not present AI capability levels as a countdown to inevitability. The point is to help educators ask better questions about use, governance, and learning.",
    teacherLeaderMoves: [
      "Use a common vocabulary for AI, generative AI, predictive systems, and automation before adopting tools.",
      "Ask vendors what the system generates, predicts, classifies, stores, and learns from.",
      "Treat emotionally responsive or biometric tools as higher-risk even when they are marketed as engagement or wellness supports.",
      "Frame ACI, AGI, and ASI as horizon concepts, not as settled timelines for school planning.",
    ],
    sections: [
      {
        title: "What AI is, and what generative AI changed",
        tag: "Start Here",
        color: C.teal,
        paragraphs: [
          "For school use, AI is best understood as software that performs tasks associated with human thinking: finding patterns, classifying information, making predictions, generating content, or responding to prompts. This definition is intentionally broad. A scheduling system, adaptive practice platform, predictive dashboard, chatbot, image generator, and speech-to-text tool can all involve AI, but they do not carry the same risks.",
          "Generative AI is the subset that changed the public conversation because it creates new outputs. A teacher can ask for a lesson draft, a family letter, a rubric, an explanation, a song, a study guide, or a set of practice questions. That creative fluency is useful, but it also creates new concerns about accuracy, authorship, privacy, intellectual property, bias, and whether students are doing the thinking that learning requires.",
          "The current Ethical Educator stance should be explicit: AI can support human judgment, but it does not understand students, hold educational values, or exercise professional responsibility. That distinction keeps the page aligned with the site's Terms of Use and with current school-system guidance."
        ],
        cards: [
          {
            title: "Traditional AI",
            items: ["Classifies, predicts, recommends, optimizes", "Often embedded in familiar systems", "Risk depends on data sensitivity and use case"],
            color: C.ocean,
          },
          {
            title: "Generative AI",
            items: ["Creates text, images, audio, code, and plans", "Can sound confident while being wrong", "Requires citation, review, and clear student-use norms"],
            color: C.gold,
          },
        ],
        sources: [
          { label: "NYCPS Guidance on Artificial Intelligence", href: "https://www.schools.nyc.gov/about-us/vision-and-mission/artificial-intelligence/guidance-on-artificial-intelligence-full" },
        ],
      },
      {
        title: "Realized AI in the source presentation",
        tag: "Current Systems",
        color: C.gold,
        paragraphs: [
          "The Next Wave source material distinguishes realized AI from theoretical AI. That distinction is worth keeping because teachers often hear one word, AI, used for everything from spellcheck to artificial superintelligence. A stronger site version should show the progression without implying that every example belongs in a classroom.",
          "Narrow AI remains the only fully realized category schools are likely to encounter day to day. Reactive systems complete fixed tasks. Limited-memory systems use previous data to inform current output. Generative systems create new artifacts. Emotion AI and neural-decoding examples show how quickly the ethical stakes rise when systems infer feelings, attention, mental states, or health signals.",
          "The educator takeaway is not that schools should use all of these tools. It is that the risk profile changes when a system moves from helping a teacher draft a worksheet to interpreting a student's emotion, behavior, disability status, or learning pathway."
        ],
        listTitle: "Keep the source sequence, but make the classroom relevance explicit:",
        list: [
          "Reactive AI: fixed-task systems such as game-playing or simple rule-driven automation.",
          "Limited-memory AI: systems that use data from prior interactions, such as predictive text, adaptive platforms, and some transportation or scheduling tools.",
          "Generative AI: models that produce new text, images, music, lesson ideas, explanations, or feedback drafts.",
          "Emotion AI: systems that infer affect from voice, face, behavior, or physiological signals. These should trigger privacy, bias, and validity questions.",
          "Neural decoding and brain-computer interfaces: useful for understanding the outer edge of AI capability, but not a routine classroom adoption category.",
        ],
      },
      {
        title: "Theoretical AI: ACI, AGI, and ASI",
        tag: "Horizon",
        color: C.coral,
        paragraphs: [
          "The source site uses Mustafa Suleyman's language of Artificial Capable Intelligence as a step before Artificial General Intelligence. Keep that frame, but update the tone. Educators do not need a speculative prediction timeline. They need to understand why increasingly agentic tools create different governance problems than a chatbot that waits for a prompt.",
          "A capable system is one that can complete complex, multistep tasks with less supervision. In schools, the near-term version is not a science-fiction teacher replacement. It is a tool that can plan a unit, draft communications, analyze student data, generate interventions, and coordinate workflow. That is powerful enough to require boundaries because it can quietly shift decisions from people to systems.",
          "AGI and ASI remain contested, future-facing concepts. They matter for ethical imagination and policy planning, but the immediate work for teachers and leaders is more concrete: keep humans accountable for educational decisions, require transparent tool review, and make sure automation does not narrow student opportunity."
        ],
        cards: [
          {
            title: "ACI",
            items: ["Completes complex workflows", "Raises oversight and accountability questions", "Most relevant to school operations and planning"],
            color: C.teal,
          },
          {
            title: "AGI / ASI",
            items: ["Still future-facing and contested", "Useful for ethics and governance discussion", "Not a reason to skip present-day policy work"],
            color: C.coral,
          },
        ],
      },
    ],
    resourceLinks: [
      { label: "The Coming Wave", href: "https://www.penguinrandomhouse.com/books/722674/the-coming-wave-by-mustafa-suleyman-with-michael-bhaskar/" },
      { label: "UNESCO Artificial Intelligence in Education", href: "https://www.unesco.org/en/digital-education/artificial-intelligence" },
      { label: "OECD Artificial Intelligence and Education and Skills", href: "https://www.oecd.org/en/topics/sub-issues/artificial-intelligence-and-education-and-skills.html" },
    ],
  },

  "ai-education/classroom-practice": {
    id: "ai-education/classroom-practice",
    title: "Classroom Practice",
    shortTitle: "Classroom Practice",
    sectionLabel: "AI in Education · Classroom Practice",
    desc: "Planning, personalization, feedback, administrative workflows, and IEP support with the teacher still in charge of instructional judgment.",
    shortDesc: "How teachers can use AI for planning, questioning, feedback, accessibility, and workflow support without handing over professional judgment.",
    image: `${base}/classroom-implementation.webp`,
    imageAlt: "A classroom planning table with lesson plans, accessibility supports, headphones, and assistant cards on a laptop.",
    accent: C.gold,
    readingMinutes: 11,
    bigIdea: "The strongest classroom uses save teacher time or expand access while keeping the educator responsible for purpose, accuracy, and final decisions.",
    useWithCaution: "Any workflow involving student data, disability status, grades, placement, or legally sensitive documentation needs approved tools and qualified human review.",
    teacherLeaderMoves: [
      "Start with low-risk teacher-facing planning before student-facing implementation.",
      "Build AI use into lesson design, not around it after the task is already written.",
      "Require teachers to review, revise, and own every AI-generated communication or student-facing material.",
      "Create separate guidance for lesson planning, feedback drafting, grading decisions, IEP work, and operational data.",
    ],
    sections: [
      {
        title: "Technical readiness should be boring on purpose",
        tag: "Readiness",
        color: C.gold,
        paragraphs: [
          "The source presentation's technical requirements section is useful because it lowers the temperature. Schools do not need a custom AI lab to begin responsible teacher-facing use. Basic hardware, stable internet, staff accounts, and digital literacy are enough for planning, brainstorming, drafting, and non-sensitive workflow support.",
          "The more advanced the use case becomes, the more governance matters. A no-code teacher tool for lesson ideas is one thing. A system that processes student records, recommends interventions, predicts risk, or drafts special-education documents is another. The technology stack is less important than the review stack: privacy approval, clear purpose, teacher training, and a defined human decision-maker."
        ],
        listTitle: "Implementation bands for school leaders:",
        list: [
          "Minimal: basic computers, stable internet, approved accounts, and staff training in verification and prompt practice.",
          "Stronger no-code setup: vetted teacher tools, shared prompt examples, AI literacy mini-PD, and clear data-entry rules.",
          "Advanced: internal technical support, data governance, vendor review, bias checks, and formal evaluation of educational impact.",
        ],
      },
      {
        title: "Planning and probing questions",
        tag: "Teacher Workflow",
        color: C.teal,
        paragraphs: [
          "One of the most immediately useful source examples is the prompt that asks an AI assistant to build a probing-question matrix aligned to a standard, Depth of Knowledge, and Bloom-style categories. The important move is not the specific matrix. It is using AI to widen the teacher's planning options before choosing what belongs in the lesson.",
          "A strong Ethical Educator version should show teachers how to ask for multiple levels of questions, then review whether the questions actually match the standard, the text, the grade level, and the desired thinking. AI can generate a draft matrix quickly. The teacher decides whether a question is recall, application, strategic thinking, or extended thinking."
        ],
        cards: [
          {
            title: "Useful AI draft",
            items: ["Generate a range of probing questions", "Ask for misconceptions and follow-ups", "Request alternate wording for multilingual learners"],
            color: C.teal,
          },
          {
            title: "Teacher review",
            items: ["Check alignment to the actual standard", "Remove questions that lower rigor", "Choose the sequence that fits students"],
            color: C.gold,
          },
        ],
      },
      {
        title: "Personalization without illusion",
        tag: "Learning Design",
        color: C.ocean,
        paragraphs: [
          "The Khanmigo example in the source presentation remains valuable because it makes personalization concrete. A student who cares about soccer can meet a polynomial or federalism example through that interest. The deeper point is that AI can help teachers answer the student's old question: why should I care about this?",
          "The updated version should also include the caution the field has learned since early pilots: personalization does not automatically produce learning. Many students need help learning how to ask questions, evaluate responses, and stay productively engaged. AI can remember preferences and adapt explanations, but it cannot decide which struggle a student still needs to experience.",
          "The page should keep the focus on teacher-orchestrated personalization: AI can suggest examples, adjust reading level, vary practice, and offer alternate explanations. The educator decides which path supports the objective rather than distracting from it."
        ],
      },
      {
        title: "Feedback, grading, and administrative support",
        tag: "Workflow",
        color: C.coral,
        paragraphs: [
          "AI can help draft comments, compare work to rubric language, identify unclear feedback, summarize trends, or suggest what a student might try next. That is feedback support. It becomes a different category when the system makes the grade, determines mastery, or becomes the evidence of what a student knows.",
          "Current policy guidance is moving toward this distinction: AI-generated data can be advisory, but the educator of record determines what the student knows. That boundary should be central on The Ethical Educator because it protects both learning and due process.",
          "Administrative uses can also be strong: scheduling, formatting, summarizing non-sensitive information, drafting routine communications, or synthesizing operational data. Leaders still need data privacy review, especially when student records, grades, attendance, disability status, or family information are involved."
        ],
        sources: [
          { label: "NYCPS Traffic Light Approach", href: "https://www.schools.nyc.gov/about-us/vision-and-mission/artificial-intelligence/guidance-on-artificial-intelligence-full" },
        ],
      },
      {
        title: "IEP and accommodation support",
        tag: "Special Education",
        color: C.gold,
        paragraphs: [
          "The source presentation's IEP section deserves depth. AI can save time by drafting accommodation ideas, leveling text, generating scaffolded questions, or turning teacher notes into a clearer first pass. For overloaded teachers, that can be meaningful support.",
          "But legally and educationally sensitive outputs require a harder line than ordinary lesson planning. AI should not determine eligibility, placement, goals, services, accommodations, or grading decisions for students with disabilities. It can propose language or options for a qualified team to review. The human team must know the student, the law, the setting, and the consequences.",
          "A practical page should help teachers see both truths at once: AI can reduce paperwork friction and improve access, but it cannot replace the expertise of the IEP team or the professional obligation to individualize supports."
        ],
      },
    ],
    resourceLinks: [
      { label: "NYCPS Guidance on Artificial Intelligence", href: "https://www.schools.nyc.gov/about-us/vision-and-mission/artificial-intelligence/guidance-on-artificial-intelligence-full" },
      { label: "MagicSchool AI", href: "https://www.magicschool.ai/" },
      { label: "Khanmigo", href: "https://www.khanmigo.ai/" },
    ],
  },

  "ai-education/student-tools": {
    id: "ai-education/student-tools",
    title: "Student Learning Tools",
    shortTitle: "Student Tools",
    sectionLabel: "AI in Education · Student Learning",
    desc: "Tutoring, missed-lesson review, student choice, note-making, and creative transformation designed to make students' thinking more visible, not less necessary.",
    shortDesc: "Student-facing use cases from the source site, rebuilt around process visibility, choice, review, creativity, and age-appropriate safeguards.",
    image: `${base}/creative-ai-tools.webp`,
    imageAlt: "A creative teaching desk with music notes, story pages, watercolor palette, headphones, and a glowing tablet.",
    accent: C.coral,
    readingMinutes: 10,
    bigIdea: "Student tools are strongest when they help learners ask better questions, see examples, revise work, and document process.",
    useWithCaution: "Student-facing AI use must follow age rules, family consent requirements, district policy, privacy review, and assignment-specific disclosure expectations.",
    teacherLeaderMoves: [
      "Teach students how to ask, check, challenge, cite, and reflect on AI interactions.",
      "Use AI logs, drafts, conferences, and reflection notes as process evidence.",
      "Avoid tasks where AI can complete the whole learning target invisibly.",
      "Give students multiple ways to show thinking before, during, and after AI support.",
    ],
    sections: [
      {
        title: "Tutoring that makes process visible",
        tag: "Tutoring",
        color: C.coral,
        paragraphs: [
          "AI tutoring should not be framed as a vending machine for answers. The best use is closer to a coach that asks questions, gives hints, checks reasoning, and keeps a record of how the student worked through the problem. That record can help teachers see whether a student generated a thesis, revised an explanation, asked useful questions, or simply accepted output.",
          "The source presentation's Khanmigo material includes this process idea: the teacher can learn not only what the final answer says, but how the student and assistant collaborated. That is the direction worth preserving. In an AI-rich classroom, the process becomes part of the evidence.",
          "A student-facing tutor should be scoped to the lesson, the standards, and the teacher's expectations. It should explain, prompt, and redirect. It should not complete the task in a way that hides the student's understanding."
        ],
      },
      {
        title: "Missed lesson support and note-making",
        tag: "Review",
        color: C.teal,
        paragraphs: [
          "The thermal-energy example in the source site is a strong practical case. A student misses a lesson. Instead of receiving a static worksheet, they can use a teacher-approved transcript or lesson summary to generate review notes, ask clarifying questions, and choose a format that fits how they study.",
          "The important design move is to use redacted, teacher-approved source material. The AI can turn the same lesson into outline notes, Cornell notes, a boxing method layout, vocabulary review, or a self-check quiz. That does not replace attendance or instruction, but it can make recovery more humane and more personalized.",
          "For teachers, this use case is also a reminder to separate content access from cognitive work. AI can help a student re-enter the lesson. The student still needs to explain conduction, convection, radiation, or whatever the learning target requires in their own words."
        ],
        cards: [
          {
            title: "Good input",
            items: ["Teacher-approved transcript or notes", "Clear lesson target", "No unnecessary student data"],
            color: C.teal,
          },
          {
            title: "Good output",
            items: ["Multiple note formats", "Practice questions", "A prompt to explain the concept back"],
            color: C.gold,
          },
        ],
      },
      {
        title: "Creative remixing and student choice",
        tag: "Creativity",
        color: C.gold,
        paragraphs: [
          "The source site uses a student narrative about games and online scams, then shows how AI can transform the writing into a different genre. Keep the pedagogical point, but remove any named school context and avoid treating the AI version as the better version. The value is in comparison: how does meaning change when the same idea becomes a poem, children's story, dialogue, song, comic script, or public-service announcement?",
          "This can build genre awareness when students analyze the transformation. What stayed? What disappeared? Which choices made the message stronger or weaker? What did the AI misunderstand about the student's voice?",
          "Choice boards belong here too. AI can help a teacher generate varied ways into a task, but the teacher must preserve the intellectual demand. More choices should not mean easier thinking. It should mean more authentic paths toward the same learning target."
        ],
      },
      {
        title: "ReviewSongGPT and memory supports",
        tag: "Multimodal",
        color: C.ocean,
        paragraphs: [
          "ReviewSongGPT from the source material is a useful example of AI as a multimodal bridge. A teacher can feed in a standard, transcript, or lesson summary and ask for review lyrics in a specific genre. The song is not the lesson. It is a retrieval and engagement support after students have already worked with the concepts.",
          "The deeper principle is multimodal reinforcement. Students can encounter the same concept through notes, discussion, practice, visuals, music, and explanation. AI can help teachers generate those alternate representations quickly, especially for review and accessibility.",
          "Use this carefully: catchy does not mean accurate, and memorable does not mean understood. Students should verify the content, correct weak lines, and explain the concept without the song."
        ],
      },
      {
        title: "Guardrails for student-facing use",
        tag: "Safeguards",
        color: C.coral,
        paragraphs: [
          "Student-facing AI needs explicit rules. OpenAI's educator guidance states that users must be at least 13 and that users between 13 and 18 need parent or guardian permission. District policies may be stricter. Even when a tool is allowed, assignment expectations should name what kind of AI help is permitted and how students should disclose it.",
          "A strong classroom routine asks students to log prompts, cite AI support, identify what they accepted or rejected, and reflect on how the tool shaped their thinking. That shifts the question away from catching students and toward teaching responsible use."
        ],
        sources: [
          { label: "OpenAI educator guidance", href: "https://help.openai.com/en/articles/8313351-how-can-educators-respond-to-students-presenting-ai-generated-content-as-their-own" },
        ],
      },
    ],
    resourceLinks: [
      { label: "OpenAI educator guidance", href: "https://help.openai.com/en/articles/8313351-how-can-educators-respond-to-students-presenting-ai-generated-content-as-their-own" },
      { label: "Khanmigo", href: "https://www.khanmigo.ai/" },
      { label: "AI for Educators", href: "https://ditchthattextbook.com/ai-for-educators/" },
    ],
  },

  "ai-education/policy-ethics": {
    id: "ai-education/policy-ethics",
    title: "Policy & Ethics",
    shortTitle: "Policy & Ethics",
    sectionLabel: "AI in Education · Policy & Ethics",
    desc: "A practical ethics layer for AI detectors, bans, privacy, bias, implementation challenges, and school-level decision-making.",
    shortDesc: "Why bans and detectors are not enough, what current policy frameworks emphasize, and how to reason through AI adoption with educators and families.",
    image: `${base}/voices-discourse.webp`,
    imageAlt: "A scholarly roundtable with microphones, books, policy notes, and a tablet showing connected discussion nodes.",
    accent: C.ocean,
    readingMinutes: 12,
    bigIdea: "AI policy should define use cases, evidence, boundaries, and human accountability. Slogans do not survive contact with real classrooms.",
    useWithCaution: "This page is not legal advice. Schools must follow applicable law, district policy, negotiated agreements, and professional guidance in their own context.",
    teacherLeaderMoves: [
      "Replace blanket rules with traffic-light categories tied to concrete use cases.",
      "Never use AI detectors as the sole basis for academic misconduct decisions.",
      "Require tool review before student data, disability data, grades, or family information enter any AI system.",
      "Use thought experiments and ethical matrices to pressure-test policies before a crisis.",
    ],
    sections: [
      {
        title: "Why bans and detectors fail",
        tag: "Academic Integrity",
        color: C.coral,
        paragraphs: [
          "The source presentation is right to pair AI detection with the limits of bans. A ban sounds decisive, but students can still access AI elsewhere, teachers lose access to useful planning supports, and the school avoids the harder question: what kind of AI use helps or harms learning?",
          "AI detectors create a different problem. OpenAI's current educator guidance says detector research did not show enough reliability for judgments with lasting consequences. It also warns that detector-style judgments can wrongly flag human writing and may disproportionately affect English learners or students whose writing is concise or formulaic.",
          "The better direction is process evidence: draft history, conferences, prompt logs, AI-use notes, oral explanation, source checks, and assignment designs that ask students to make their thinking visible. The goal is not to catch students using tools. The goal is to know what the student understands."
        ],
        sources: [
          { label: "OpenAI educator guidance on detectors", href: "https://help.openai.com/en/articles/8313351-how-can-educators-respond-to-students-presenting-ai-generated-content-as-their-own" },
        ],
      },
      {
        title: "Traffic-light policy in plain language",
        tag: "Boundaries",
        color: C.ocean,
        paragraphs: [
          "Current district guidance is moving toward a traffic-light model: red for prohibited uses, yellow for uses that require safeguards and professional judgment, and green for approved uses with reviewed tools. The value of this approach is specificity. It tells educators that AI is not one thing.",
          "Red uses include cases where AI would replace legally or educationally responsible human decisions, such as special-education determinations, final grading judgments, or consequential pathway decisions. Yellow uses include student data analysis, diverse learner scaffolds, sensitive translations, and student use. Green uses include brainstorming, organizing, drafting with review, summarizing non-sensitive information, accessibility support, and professional learning.",
          "The Ethical Educator should present this as an adaptable thinking model, not as a policy template for every school. Each district still needs local review, but the traffic-light structure helps teams ask the right first question: what exactly are we using AI to do?"
        ],
        cards: [
          {
            title: "Red",
            items: ["No AI final decisions for grading, placement, or special-education determinations", "No unapproved use of sensitive student data"],
            color: C.coral,
          },
          {
            title: "Yellow",
            items: ["Use only with safeguards, training, and review", "Includes student use, data analysis, and diverse-learner supports"],
            color: C.gold,
          },
          {
            title: "Green",
            items: ["Teacher planning, brainstorming, formatting, professional learning", "Human ownership and accuracy review still required"],
            color: C.teal,
          },
        ],
        sources: [
          { label: "NYCPS Guidance on Artificial Intelligence", href: "https://www.schools.nyc.gov/about-us/vision-and-mission/artificial-intelligence/guidance-on-artificial-intelligence-full" },
        ],
      },
      {
        title: "Implementation challenges that deserve real planning",
        tag: "Leadership",
        color: C.gold,
        paragraphs: [
          "The source presentation names the right challenge categories: reskilling teachers, bias and transparency, data privacy, technological barriers, curriculum integration, and dependence on technology. These should not be listed as generic risks. Each one needs an operational response.",
          "Teacher reskilling means time for staff to practice with tools, compare outputs, identify failure modes, and redesign assignments. Bias and transparency mean asking what data a model was trained on, what it optimizes, who is likely to be misread, and how errors are appealed. Data privacy means approved tools, data minimization, and clear rules against entering student PII into unreviewed systems.",
          "Pedagogical integration is the hardest part. AI should support the learning target rather than becoming the activity. If the tool removes the struggle that the assignment was designed to produce, the task needs redesign."
        ],
      },
      {
        title: "The 3x3 ethical matrix",
        tag: "Decision Tool",
        color: C.teal,
        paragraphs: [
          "The source site points to a 3x3 ethical matrix from AI ethics curriculum work. Keep it because it gives educators a concrete way to slow down a decision. Choose three stakeholders and three values, then ask what each stakeholder gains, loses, risks, or needs under the proposed AI use.",
          "For an AI grading assistant, the stakeholders might be students, teachers, and families. The values might be learning, fairness, and privacy. The matrix surfaces tensions that a yes/no tool decision hides. A use might save teacher time but weaken student trust. It might increase feedback frequency but create privacy questions. It might feel fair at scale but miss context the teacher knows.",
          "A leadership team can use the matrix before adopting a tool, after a pilot, or when writing staff guidance. It should end in a decision, not just a conversation: proceed, proceed with safeguards, revise the use case, or do not proceed."
        ],
      },
      {
        title: "Thought experiments as policy stress tests",
        tag: "Site Connection",
        color: C.ocean,
        paragraphs: [
          "The source presentation uses AI dilemmas because policy becomes clearer under pressure. Keep that connection, but route readers toward the site's existing thought-experiment architecture. The authorship case asks what counts as a student's work. The reluctant-teacher case asks whether measurable efficiency is enough. The AI proxy case asks what attendance, participation, and presence mean when an avatar can appear to do the work.",
          "The important UX move is to help leaders use these scenarios before a crisis. A policy committee can read one case, identify what current policy would say, locate the ambiguity, and draft a rule that a teacher, student, substitute, parent, and administrator would interpret the same way."
        ],
      },
    ],
    resourceLinks: [
      { label: "NYCPS AI Guidance", href: "https://www.schools.nyc.gov/about-us/vision-and-mission/artificial-intelligence/guidance-on-artificial-intelligence-full" },
      { label: "OpenAI educator guidance", href: "https://help.openai.com/en/articles/8313351-how-can-educators-respond-to-students-presenting-ai-generated-content-as-their-own" },
      { label: "MIT AI Ethics Education Curriculum", href: "https://www.media.mit.edu/projects/ai-ethics-for-middle-school/overview/" },
    ],
    relatedInternal: [
      { id: "ai-authorship-quandary", label: "AI Authorship Quandary", blurb: "A policy stress test for student writing and disclosure." },
      { id: "ai-ambiguity-to-action", label: "From Ambiguity to Action", blurb: "Turn values into rules educators can actually apply." },
      { id: "thought-experiments/educators", label: "Educator Thought Experiments", blurb: "Run policy dilemmas as staff discussion." },
    ],
  },

  "ai-education/future-readiness": {
    id: "ai-education/future-readiness",
    title: "Future Readiness",
    shortTitle: "Future Readiness",
    sectionLabel: "AI in Education · Future",
    desc: "AI literacy, predictive analytics, virtual learning environments, tutoring, administrative automation, and the question schools cannot outsource: what do we want for students?",
    shortDesc: "The future-facing material from the source site, updated around AI literacy, PISA 2029 MAIL, workforce shifts, and deeper educational aims.",
    image: `${base}/future-ai-literacy.webp`,
    imageAlt: "A future-facing education desk with a compass, AI literacy map, student profile cards, globe, and horizon glow.",
    accent: C.teal,
    readingMinutes: 10,
    bigIdea: "Future readiness is not tool familiarity. It is the ability to use AI critically, ethically, creatively, and with enough independence to keep learning when the tool is wrong.",
    useWithCaution: "Avoid labor-market panic. Students need AI literacy, but they also need reading, writing, reasoning, collaboration, judgment, and moral imagination.",
    teacherLeaderMoves: [
      "Define AI literacy outcomes for students and adults before buying tools.",
      "Teach evaluation of credibility, purpose, bias, authorship, and evidence across AI-mediated content.",
      "Use predictive analytics as an early-warning support, not a destiny label.",
      "Keep the question 'What do we want for and from students?' visible in policy and curriculum decisions.",
    ],
    sections: [
      {
        title: "AI literacy is becoming a public benchmark",
        tag: "Literacy",
        color: C.teal,
        paragraphs: [
          "The source presentation's future section should now be anchored to a concrete global development: PISA 2029 will include Media and Artificial Intelligence Literacy as an innovative domain. The OECD describes this assessment as a way to understand whether students have had opportunities to engage proactively and critically in a world shaped by media platforms and AI systems.",
          "That matters for school leaders because AI literacy is no longer just an optional enrichment topic. Students will need to evaluate digital content, understand how AI systems mediate information, act ethically with generated media, and participate responsibly in AI-shaped spaces.",
          "UNESCO's teacher AI competency framework points in the same direction for adults. It organizes teacher learning around a human-centered mindset, ethics of AI, AI foundations and applications, AI pedagogy, and AI for professional learning. Those dimensions can become a staff-development spine."
        ],
        cards: [
          {
            title: "Students",
            items: ["Evaluate credibility and purpose", "Understand AI-mediated content", "Act ethically with digital tools"],
            color: C.teal,
          },
          {
            title: "Teachers",
            items: ["Build AI foundations", "Apply ethical judgment", "Design AI-supported pedagogy"],
            color: C.gold,
          },
        ],
        sources: [
          { label: "OECD PISA 2029 MAIL", href: "https://www.oecd.org/en/about/projects/pisa-2029-media-and-artificial-intelligence-literacy.html" },
          { label: "UNESCO AI Competency Framework for Teachers", href: "https://www.unesco.org/en/articles/ai-competency-framework-teachers?hub=66925" },
        ],
      },
      {
        title: "Five future-facing shifts from the source site",
        tag: "Forecast",
        color: C.ocean,
        paragraphs: [
          "The Next Wave source closes with five future directions. Keep all five, but write them as planning questions rather than promises. The goal is to help educators prepare thoughtfully, not to imply that every trend is desirable or inevitable.",
          "Predictive analytics can help identify patterns earlier, but it can also label students prematurely. Edtech personalization can adapt practice and feedback, but it can narrow the curriculum if optimization replaces teacher judgment. Virtual learning environments can support community and immediate help, but they can also monitor students too aggressively.",
          "AI tutoring and mentoring can expand access to help, but students still need human relationships and real accountability. Administrative efficiency can reduce workload, but schools must decide which tasks should remain human because they communicate care, trust, or professional responsibility."
        ],
        listTitle: "Use the five shifts as leadership prompts:",
        list: [
          "Predictive analytics: What intervention will a prediction trigger, and who can override it?",
          "Edtech personalization: Does adaptation widen access or narrow the path?",
          "Virtual learning environments: What counts as participation, community, and presence?",
          "AI tutoring and mentoring: What must remain human, relational, or locally accountable?",
          "Administrative efficiency: What work can be streamlined without weakening trust?",
        ],
      },
      {
        title: "Workforce readiness without reducing school to workforce",
        tag: "Purpose",
        color: C.gold,
        paragraphs: [
          "The source material links AI skills to labor-market shifts. That belongs in the updated page, but it should not become the whole argument. Schools should prepare students for AI-mediated work, but education is larger than job-market adaptation.",
          "A better framing is durable agency. Students need to know how to use AI tools, but also how to read deeply, write clearly, reason from evidence, explain their process, collaborate with people, recognize manipulation, and make ethical judgments when tools make bad choices easy.",
          "That is why the closing question from the source presentation is so important: what do we want from our students and for our students? The page should invite leaders to answer that question before adopting the next tool."
        ],
      },
      {
        title: "A future-ready classroom habit",
        tag: "Practice",
        color: C.coral,
        paragraphs: [
          "Every AI-supported task can end with a short reflection: What did the tool help you do? What did you have to decide yourself? What did you check? What did you reject? What would you be unable to explain without the tool?",
          "That habit protects learning because it turns AI use into metacognition. Students practice seeing the difference between output and understanding, assistance and authorship, speed and quality, convenience and judgment."
        ],
      },
    ],
    resourceLinks: [
      { label: "OECD PISA 2029 Media and AI Literacy", href: "https://www.oecd.org/en/about/projects/pisa-2029-media-and-artificial-intelligence-literacy.html" },
      { label: "UNESCO AI Competency Framework for Teachers", href: "https://www.unesco.org/en/articles/ai-competency-framework-teachers?hub=66925" },
      { label: "AI4K12", href: "https://ai4k12.org/" },
    ],
  },

  "ai-education/tools-resources": {
    id: "ai-education/tools-resources",
    title: "Tools & Resources",
    shortTitle: "Tools & Resources",
    sectionLabel: "AI in Education · Resource Library",
    desc: "A curated catalog of tools, case studies, books, policy resources, and custom GPT examples from the source site, cleaned up for current classroom use.",
    shortDesc: "The source site's tools, books, case studies, and ethics resources in one curated, policy-aware catalog without organization-specific promotion.",
    image: `${base}/custom-gpts-pd.webp`,
    imageAlt: "Professional development planning materials, lesson maps, assistant cards, and connected node lines on a tablet.",
    accent: C.gold,
    readingMinutes: 8,
    bigIdea: "A resource library is useful only if educators can tell what role a tool plays, what risk category it belongs to, and what human review it requires.",
    useWithCaution: "Tool availability, pricing, models, and terms change quickly. Verify age limits, privacy terms, district approval, and current features before classroom use.",
    teacherLeaderMoves: [
      "Sort tools by instructional role before deciding whether to use them.",
      "Separate teacher-facing tools from student-facing tools in policy and PD.",
      "Create an approved-tool list with dates, data rules, and permitted use cases.",
      "Review resources yearly so the page does not age into a time capsule.",
    ],
    sections: [
      {
        title: "Tool roles from the source site",
        tag: "Catalog",
        color: C.gold,
        paragraphs: [
          "The original site mixed tools, videos, books, GPTs, examples, and ethics resources throughout the presentation. This page should turn that exploration into a usable catalog. The organizing question should be: what job is this tool doing for the teacher or learner?",
          "General assistants can help with drafting, planning, explanation, and analysis. Tutoring systems can support practice and questioning. Accessibility tools can increase access to text or audio. Feedback co-pilots can help teachers draft comments. Creative tools can help students and teachers transform content across formats. Each role carries different safeguards."
        ],
        toolGroups: [
          {
            title: "General assistants",
            color: C.ocean,
            items: ["ChatGPT", "Microsoft Copilot", "Gemini"],
          },
          {
            title: "Tutoring and practice",
            color: C.teal,
            items: ["Khanmigo", "Amira Learning", "Duolingo", "Lesson Tutor"],
          },
          {
            title: "Teacher workflow",
            color: C.gold,
            items: ["MagicSchool AI", "RigorGPT", "BackwardDesignGPT", "OutcomesGPT", "Science of Reading GPT"],
          },
          {
            title: "Access and creativity",
            color: C.coral,
            items: ["Learning Ally", "ReviewSongGPT", "AI-supported choice boards", "Genre remixing"],
          },
        ],
      },
      {
        title: "Custom GPTs for professional learning",
        tag: "PD",
        color: C.teal,
        paragraphs: [
          "The source site includes custom GPTs for rigor, backward design, outcomes alignment, the science of reading, lesson tutoring, review songs, and general teacher AI guidance. Keep the collection, but frame it as professional learning support rather than magic expertise.",
          "A good custom GPT can give teachers a practice partner. It can define a concept, review a lesson plan, suggest a probing-question sequence, surface misalignment, or ask reflection questions. The teacher should still verify sources, adapt to local curriculum, and decide what belongs in front of students.",
          "For school leaders, these examples can model how a district might build constrained assistants around approved frameworks. The constraint is the value: a tool that knows the specific framework and asks teachers to reason through it is safer than a generic chatbot pretending to know the local context."
        ],
      },
      {
        title: "Case studies worth keeping",
        tag: "Examples",
        color: C.ocean,
        paragraphs: [
          "The source case studies remain useful if they are treated as examples, not endorsements. Duolingo illustrates gamified adaptive practice. Amira illustrates AI-supported oral reading practice. Khanmigo illustrates AI tutoring tied to a learning platform. Learning Ally illustrates accessibility support. Peer tutoring platforms illustrate matching and collaborative learning.",
          "For each case, the same questions apply: What data is collected? Who reviews the output? What learning target is served? What happens when the system is wrong? What does the teacher see? What can the student explain without the tool?"
        ],
      },
      {
        title: "Books, policy, and ethics resources",
        tag: "Reading",
        color: C.coral,
        paragraphs: [
          "Keep the source site's core reading pathway: Brave New Words for the optimistic tutoring argument, The Coming Wave for capability and containment, AI for Educators for practical classroom examples, UNESCO for policy and competency frameworks, IEEE for standards-oriented ethics, and MIT AI ethics curriculum for classroom-ready ethical reasoning.",
          "The resource page should also point back into The Ethical Educator's own AI ethics and thought-experiment pages, because those pages are now the site's strongest differentiated contribution. Tools date quickly. Ethical reasoning ages better."
        ],
      },
    ],
    resourceLinks: [
      { label: "Brave New Words", href: "https://www.penguinrandomhouse.com/books/738009/brave-new-words-by-salman-khan/" },
      { label: "The Coming Wave", href: "https://www.penguinrandomhouse.com/books/722674/the-coming-wave-by-mustafa-suleyman-with-michael-bhaskar/" },
      { label: "AI for Educators", href: "https://ditchthattextbook.com/ai-for-educators/" },
      { label: "UNESCO Guidance for Generative AI in Education and Research", href: "https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research" },
      { label: "IEEE Global Initiative on Ethics of Autonomous and Intelligent Systems", href: "https://standards.ieee.org/industry-connections/ec/autonomous-systems/" },
      { label: "MIT AI Ethics Education Curriculum", href: "https://www.media.mit.edu/projects/ai-ethics-for-middle-school/overview/" },
    ],
    relatedInternal: [
      { id: "resources", label: "Research Resources", blurb: "Broader reading list for philosophy, AI ethics, and education." },
      { id: "ai-ethics", label: "AI Ethics", blurb: "Policy and ethical frameworks for school decisions." },
      { id: "for-educators", label: "For Educators", blurb: "Professional-development resources beyond AI." },
    ],
  },
};

export const AI_EDUCATION_TOPICS = AI_EDUCATION_ROUTE_IDS.map((id) => AI_EDUCATION_PAGES[id]);

export const AI_EDUCATION_SNAPSHOT_STATS = [
  {
    display: "6",
    label: "new routed sections",
    subtitle: "no dead-end topic cards",
    color: C.teal,
  },
  {
    display: "2026",
    label: "current policy refresh",
    subtitle: "NYCPS, OpenAI, UNESCO, OECD",
    color: C.gold,
  },
  {
    display: "5",
    label: "UNESCO teacher dimensions",
    subtitle: "human-centered, ethics, foundations, pedagogy, professional learning",
    color: C.ocean,
  },
  {
    display: "2029",
    label: "PISA MAIL assessment",
    subtitle: "Media and AI Literacy",
    color: C.coral,
  },
];

export const AI_EDUCATION_SOURCE_COVERAGE = [
  {
    source: "Invitation, adult educator audience, disclaimers, policy adherence",
    destination: "Hub, Policy & Ethics, Tools & Resources",
    route: "ai-education/policy-ethics",
  },
  {
    source: "Landscape of AI: realized AI, generative AI, emotion AI, neural decoding, ACI/AGI/ASI",
    destination: "Foundations & AI Landscape",
    route: "ai-education/foundations",
  },
  {
    source: "What is AI in education, AI vs. generative AI, benefits, technical requirements",
    destination: "Foundations & AI Landscape, Classroom Practice",
    route: "ai-education/classroom-practice",
  },
  {
    source: "ChatGPT/Copilot examples, probing-question matrix, lesson planning workflows",
    destination: "Classroom Practice",
    route: "ai-education/classroom-practice",
  },
  {
    source: "Personalized learning, Khanmigo, grading, administrative tasks, teaching materials",
    destination: "Classroom Practice, Student Learning Tools",
    route: "ai-education/classroom-practice",
  },
  {
    source: "Specialized GPTs: RigorGPT, BackwardDesignGPT, OutcomesGPT, SoRGPT, ReviewSongGPT",
    destination: "Tools & Resources, Classroom Practice, Student Learning Tools",
    route: "ai-education/tools-resources",
  },
  {
    source: "IEP support, accommodations, scaffolded questions, teacher review",
    destination: "Classroom Practice",
    route: "ai-education/classroom-practice",
  },
  {
    source: "Student work remixing, choice boards, missed-lesson notes, Lesson Tutor",
    destination: "Student Learning Tools",
    route: "ai-education/student-tools",
  },
  {
    source: "Educator concerns, implementation challenges, ethical matrix, thought experiments",
    destination: "Policy & Ethics",
    route: "ai-education/policy-ethics",
  },
  {
    source: "AI detection, why bans will not work, academic integrity",
    destination: "Policy & Ethics",
    route: "ai-education/policy-ethics",
  },
  {
    source: "Looking forward, AI skills, future of AI in education, closing reflection",
    destination: "Future Readiness",
    route: "ai-education/future-readiness",
  },
  {
    source: "Bonus resources, books, case studies, ethics links",
    destination: "Tools & Resources",
    route: "ai-education/tools-resources",
  },
];

export const AI_EDUCATION_CONTINUE_LINKS = [
  {
    id: "ai-education/policy-ethics",
    image: `${base}/voices-discourse.webp`,
    imageAlt: "Policy notes, books, and discussion materials around a table.",
    title: "Policy & Ethics",
    desc: "Boundaries, detectors, and school decisions",
    color: C.ocean,
  },
  {
    id: "ai-ethics",
    image: `${base}/evidence-learning-balance.webp`,
    imageAlt: "A research desk with a balanced display of growth and caution signals.",
    title: "AI Ethics",
    desc: "Frameworks for ethical action",
    color: C.gold,
  },
  {
    id: "thought-experiments/educators",
    image: `${base}/classroom-implementation.webp`,
    imageAlt: "A teacher planning table with classroom materials and AI assistant cards.",
    title: "Educator Scenarios",
    desc: "Pressure-test the policy",
    color: C.teal,
  },
];

export function aiEducationLink(id, overrides = {}) {
  const resource = id === AI_EDUCATION_HUB.id ? AI_EDUCATION_HUB : AI_EDUCATION_PAGES[id];
  if (!resource) return overrides;
  return {
    id: resource.id,
    title: resource.title,
    desc: overrides.desc || resource.shortDesc || resource.desc,
    color: resource.accent,
    image: resource.image,
    imageAlt: resource.imageAlt,
    ...overrides,
  };
}
