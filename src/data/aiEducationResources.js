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
          "For most teachers, \"AI\" arrived as a single word with a specific face — ChatGPT, in late 2022 — and has expanded ever since to describe everything from spellcheck to artificial superintelligence. The categories on this page are not a technical primer for engineers. They are a working vocabulary for a teacher who has to decide what to allow in their classroom, answer the student who asks what AI actually is, and read a vendor's marketing without taking it at face value.",
          "For school use, AI is best understood as software that performs tasks associated with human thinking: finding patterns, classifying information, making predictions, generating content, or responding to prompts. This definition is intentionally broad. A scheduling system, adaptive practice platform, predictive dashboard, chatbot, image generator, and speech-to-text tool can all involve AI, but they do not carry the same risks.",
          "Generative AI is the subset that changed the public conversation because it creates new outputs. A teacher can ask for a lesson draft, a family letter, a rubric, an explanation, a song, a study guide, or a set of practice questions. That creative fluency is useful, but it also creates new concerns about accuracy, authorship, privacy, intellectual property, bias, and whether students are doing the thinking that learning requires.",
          "The Ethical Educator stance is explicit: AI can support human judgment, but it does not understand students, hold educational values, or exercise professional responsibility. That distinction keeps every recommendation here aligned with the site's Terms of Use and with current school-system guidance.",
          "This vocabulary also matters when students ask. A ninth grader who is told \"AI is just fancy autocomplete\" learns to dismiss it. A ninth grader who is told \"AI can mean a classifier, a generator, a predictor, or a system that infers emotions from a face — each built differently and behaving differently\" has the start of a real mental model. The categories below are the version teachers can use for both audiences.",
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
        title: "Realized AI: what is actually in classrooms today",
        tag: "Current Systems",
        color: C.gold,
        paragraphs: [
          "Teachers often hear one word — AI — used for everything from spellcheck to artificial superintelligence. The categories below separate what is actually running in classrooms today from speculative claims about what might come next. The point is not to predict the future, but to give educators enough vocabulary to ask better questions about any tool a vendor puts in front of them.",
          "Narrow AI remains the only fully realized category schools are likely to encounter day to day. Reactive systems complete fixed tasks. Limited-memory systems use previous data to inform current output. Generative systems create new artifacts. Emotion AI and neural-decoding examples show how quickly the ethical stakes rise when systems infer feelings, attention, mental states, or health signals.",
          "The takeaway is not that schools should adopt every category. It is that the risk profile changes when a system moves from helping a teacher draft a worksheet to interpreting a student's emotion, behavior, disability status, or learning pathway.",
        ],
        listTitle: "How current systems break down — with examples worth knowing:",
        list: [
          { label: "Reactive AI", desc: "Fixed-task systems that complete a single problem without memory or learning. IBM's Deep Blue (chess) and DeepMind's AlphaGo are the canonical examples." },
          { label: "Limited-memory AI", desc: "Systems that use data from prior interactions to inform current output. Predictive text, adaptive practice platforms, navigation systems, and self-driving features in Waymo and Tesla Autopilot all fit here." },
          { label: "Generative AI", desc: "Models that produce new text, images, audio, video, or code. ChatGPT, Claude, Gemini, Microsoft Copilot, Midjourney, DALL·E, Udio, Suno, and ElevenLabs are current examples spanning text, image, music, and voice." },
          { label: "Emotion AI", desc: "Systems that infer affect from voice, face, behavior, or physiological signals. Affectiva, Azure AI Speech, and research tools like MoodCapture sit here. These trigger privacy, bias, and validity questions before classroom use is even on the table." },
          { label: "Neural decoding and brain-computer interfaces", desc: "The outer edge of current AI capability. Neuralink, Synchron, and MIT prosthetic-control research are current examples. Not a routine classroom adoption category, but increasingly part of public AI conversation." },
        ],
      },
      {
        title: "Theoretical AI: ACI, AGI, and ASI",
        tag: "Horizon",
        color: C.coral,
        paragraphs: [
          "Mustafa Suleyman, writing in The Coming Wave, names Artificial Capable Intelligence as a step before Artificial General Intelligence. The term is not widely adopted outside that book, but the underlying observation matters for school planning: increasingly agentic tools create different governance problems than a chatbot that waits for a prompt. Educators do not need a prediction timeline. They need to understand why the jump from suggestion to autonomous action changes the oversight question.",
          "A capable system is one that can complete complex, multistep tasks with less supervision. In schools, the near-term version is not a science-fiction teacher replacement. It is a tool that can plan a unit, draft communications, analyze student data, generate interventions, and coordinate workflow. That is powerful enough to require boundaries, because it can quietly shift decisions from people to systems.",
          "AGI and ASI remain contested, future-facing concepts. They matter for ethical imagination and policy planning, but the immediate work for teachers and leaders is more concrete: keep humans accountable for educational decisions, require transparent tool review, and make sure automation does not narrow student opportunity.",
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
      { label: "NYCPS Guidance on Artificial Intelligence", href: "https://www.schools.nyc.gov/about-us/vision-and-mission/artificial-intelligence/guidance-on-artificial-intelligence-full" },
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
          "A middle-school science teacher has twenty minutes between an IEP meeting and 4th period to plan a unit on heat transfer. She does not need a Stanford workshop on prompt engineering. She needs a laptop that works, a tool the district has approved, and enough familiarity to ask the assistant for a probing-question matrix and check the result against her standards before the bell. Most defensible classroom AI use looks like that — short, practical, and bounded by the time the teacher actually has.",
          "Schools do not need a custom AI lab to begin responsible teacher-facing use. Basic hardware, stable internet, staff accounts, and digital literacy are enough for planning, brainstorming, drafting, and non-sensitive workflow support. Readiness, at this stage, should be boring on purpose.",
          "The more advanced the use case becomes, the more governance matters. A no-code teacher tool for lesson ideas is one thing. A system that processes student records, recommends interventions, predicts risk, or drafts special-education documents is another. The technology stack is less important than the review stack: privacy approval, clear purpose, teacher training, and a defined human decision-maker.",
        ],
        listTitle: "Three tool stacks, three governance loads:",
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
          "One of the most immediately useful applications is asking an AI assistant to build a probing-question matrix aligned to a standard, Depth of Knowledge, and Bloom-style categories. The value is not the matrix itself. It is using AI to widen the teacher's planning options before choosing what belongs in the lesson.",
          "Teachers can ask for multiple levels of questions, then review whether the questions actually match the standard, the text, the grade level, and the desired thinking. AI generates the draft matrix quickly. The teacher decides whether a question is recall, application, strategic thinking, or extended thinking.",
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
          "Khanmigo makes personalization concrete: a student who cares about soccer can meet a polynomial or federalism example through that interest. The deeper point is that AI can help teachers answer the student's old question — why should I care about this?",
          "What the field has learned since the first wave of pilots is that personalization does not automatically produce learning. Many students need help learning how to ask questions, evaluate responses, and stay productively engaged. AI can remember preferences and adjust explanations, but it cannot decide which struggle a student still needs to experience.",
          "The most defensible model is teacher-orchestrated personalization. AI can suggest examples, adjust reading level, vary practice, and offer alternate explanations. The educator decides which path supports the objective rather than distracting from it.",
        ],
      },
      {
        title: "Feedback, grading, and administrative support",
        tag: "Workflow",
        color: C.coral,
        paragraphs: [
          "AI can help draft comments, compare work to rubric language, identify unclear feedback, summarize trends, or suggest what a student might try next. That is feedback support. It becomes a different category when the system makes the grade, determines mastery, or becomes the evidence of what a student knows.",
          "Current policy guidance draws this line clearly: AI-generated data can be advisory, but the educator of record determines what the student knows. That boundary is central on The Ethical Educator because it protects both learning and due process.",
          "Administrative uses can also be strong: scheduling, formatting, summarizing non-sensitive information, drafting routine communications, or synthesizing operational data. Leaders still need data privacy review, especially when student records, grades, attendance, disability status, or family information are involved.",
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
          "AI can save time on IEP work by drafting accommodation ideas, leveling text, generating scaffolded questions, or turning teacher notes into a clearer first pass. For overloaded teachers, that is meaningful support.",
          "But legally and educationally sensitive outputs require a harder line than ordinary lesson planning. AI should not determine eligibility, placement, goals, services, accommodations, or grading decisions for students with disabilities. It can propose language or options for a qualified team to review. The human team must know the student, the law, the setting, and the consequences.",
          "Both truths need to coexist: AI can reduce paperwork friction and improve access, but it cannot replace the expertise of the IEP team or the professional obligation to individualize supports.",
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
    shortDesc: "Tutoring, missed-lesson review, choice, note-making, and creative remixing — designed to keep students' thinking visible, not optional.",
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
          "A ninth grader opens Khanmigo at 9:47 PM, three days into a unit on quadratic equations he never quite grasped. He is tempted to ask for the answer. What he gets, if the system is set up well, is a question back. Then a hint. Then another question. By the end of twenty minutes there is a transcript his teacher can read tomorrow morning and see — for the first time all unit — what the student actually understands and where the gap really is.",
          "AI tutoring should not be framed as a vending machine for answers. The best use is closer to a coach that asks questions, gives hints, checks reasoning, and keeps a record of how the student worked through the problem. That record can help teachers see whether a student generated a thesis, revised an explanation, asked useful questions, or simply accepted output.",
          "Tools like Khanmigo can give teachers a window into the work itself: not only what the final answer says, but how the student and assistant collaborated. In an AI-rich classroom, the process becomes part of the evidence.",
          "A student-facing tutor should be scoped to the lesson, the standards, and the teacher's expectations. It should explain, prompt, and redirect. It should not complete the task in a way that hides the student's understanding.",
        ],
      },
      {
        title: "Missed lesson support and note-making",
        tag: "Review",
        color: C.teal,
        paragraphs: [
          "Consider a practical case. A student misses a lesson on thermal energy. Instead of receiving a static worksheet, they can use a teacher-approved transcript or lesson summary to generate review notes, ask clarifying questions, and choose a format that fits how they study.",
          "The important design move is to use redacted, teacher-approved lesson content as the input. The AI can turn the same lesson into outline notes, Cornell notes, a boxing-method layout, vocabulary review, or a self-check quiz. That does not replace attendance or instruction, but it can make recovery more humane and more personalized.",
          "For teachers, this use case is also a reminder to separate content access from cognitive work. AI can help a student re-enter the lesson. The student still needs to explain conduction, convection, radiation, or whatever the learning target requires in their own words.",
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
          "Take a student's narrative — say, a personal essay about online scams in games — and ask AI to transform it into a poem, a children's story, a dialogue, a song, a comic script, or a public-service announcement. The AI version is not necessarily the better version. The value is in the comparison: how does meaning change when the same idea moves between genres?",
          "This can build genre awareness when students analyze the transformation. What stayed? What disappeared? Which choices made the message stronger or weaker? What did the AI misunderstand about the student's voice?",
          "Choice boards belong here too. AI can help a teacher generate varied ways into a task, but the teacher must preserve the intellectual demand. More choices should not mean easier thinking. It should mean more authentic paths toward the same learning target.",
        ],
      },
      {
        title: "ReviewSongGPT and memory supports",
        tag: "Multimodal",
        color: C.ocean,
        paragraphs: [
          "ReviewSongGPT is one example of AI as a multimodal bridge. A teacher can feed in a standard, transcript, or lesson summary and ask for review lyrics in a specific genre. The song is not the lesson. It is a retrieval and engagement support after students have already worked with the concepts.",
          "The deeper principle is multimodal reinforcement. Students can encounter the same concept through notes, discussion, practice, visuals, music, and explanation. AI can help teachers generate those alternate representations quickly, especially for review and accessibility.",
          "Use this carefully: catchy does not mean accurate, and memorable does not mean understood. Students should verify the content, correct weak lines, and explain the concept without the song.",
        ],
      },
      {
        title: "Guardrails for student-facing use",
        tag: "Safeguards",
        color: C.coral,
        paragraphs: [
          "Student-facing AI needs explicit rules. OpenAI's educator guidance states that users must be at least 13 and that users between 13 and 18 need parent or guardian permission. District policies may be stricter, and several state laws have tightened minor use of generative AI in the last year. Even when a tool is allowed, assignment expectations should name what kind of AI help is permitted and how students should disclose it.",
          "A strong classroom routine asks students to log prompts, cite AI support, identify what they accepted or rejected, and reflect on how the tool shaped their thinking. That shifts the question away from catching students and toward teaching responsible use.",
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
          "It is 7:42 AM. A high school principal is staring at an AI-detector report flagging a junior's college essay as 87 percent likely to be AI-generated. The student is across the hall waiting to be called in. The parent is on email asking how the school plans to handle this. The detector vendor's own documentation says, in small print, that scores under 95 percent should not be the sole basis for an academic-dishonesty finding. The school's AI policy is two paragraphs long, was drafted in 2024, and does not mention detectors at all.",
          "Bans and AI detection belong in the same conversation, and neither solves the problem. A ban sounds decisive, but students can still access AI elsewhere, teachers lose access to useful planning supports, and the school avoids the harder question: what kind of AI use helps or harms learning?",
          "AI detectors create a different problem. OpenAI's current educator guidance says detector research did not show enough reliability for judgments with lasting consequences. It also warns that detector-style judgments can wrongly flag human writing and may disproportionately affect English learners or students whose writing is concise or formulaic.",
          "The better direction is process evidence: draft history, conferences, prompt logs, AI-use notes, oral explanation, source checks, and assignment designs that ask students to make their thinking visible. The goal is not to catch students using tools. The goal is to know what the student understands.",
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
          "NYC Public Schools and several other large districts have adopted a traffic-light model: red for prohibited uses, yellow for uses that require safeguards and professional judgment, and green for approved uses with reviewed tools. The value of this approach is specificity. It tells educators that AI is not one thing.",
          "Red uses include cases where AI would replace legally or educationally responsible human decisions, such as special-education determinations, final grading judgments, or consequential pathway decisions. Yellow uses include student data analysis, diverse-learner scaffolds, sensitive translations, and student use. Green uses include brainstorming, organizing, drafting with review, summarizing non-sensitive information, accessibility support, and professional learning.",
          "Treat the model as an adaptable thinking frame, not as a policy template to copy whole. Each district still needs local review, but the traffic-light structure helps teams ask the right first question: what exactly are we using AI to do?",
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
          "Six challenge categories deserve operational responses rather than a generic risk register: reskilling teachers, bias and transparency, data privacy, technological barriers, curriculum integration, and dependence on technology.",
          "Teacher reskilling means time for staff to practice with tools, compare outputs, identify failure modes, and redesign assignments. Bias and transparency mean asking what data a model was trained on, what it optimizes, who is likely to be misread, and how errors are appealed. Data privacy means approved tools, data minimization, and clear rules against entering student PII into unreviewed systems.",
          "Pedagogical integration is the hardest part. AI should support the learning target rather than becoming the activity. If the tool removes the struggle that the assignment was designed to produce, the task needs redesign.",
        ],
      },
      {
        title: "The 3x3 ethical matrix",
        tag: "Decision Tool",
        color: C.teal,
        paragraphs: [
          "A 3x3 ethical matrix, drawn from MIT's AI + Ethics Curriculum for Middle School, gives educators a concrete way to slow down a decision. Choose three stakeholders and three values, then ask what each stakeholder gains, loses, risks, or needs under the proposed AI use.",
          "Take an AI grading assistant as a worked example. The stakeholders are students, teachers, and families. The values are learning, fairness, and privacy. The matrix surfaces tensions that a yes/no tool decision hides — and it forces each stakeholder's perspective into the room before the decision is made.",
          "A leadership team can use the matrix before adopting a tool, after a pilot, or when writing staff guidance. It should end in a decision, not just a conversation: proceed, proceed with safeguards, revise the use case, or do not proceed.",
        ],
        cards: [
          {
            title: "Students",
            items: [
              "Gain: faster, more frequent feedback",
              "Risk: feedback that misses context the teacher knows",
              "Need: clear disclosure that AI shaped the comment",
            ],
            color: C.teal,
          },
          {
            title: "Teachers",
            items: [
              "Gain: time recovered from rubric grading",
              "Risk: gradual deferral of judgment to the tool",
              "Need: a workflow that requires teacher review before any grade posts",
            ],
            color: C.gold,
          },
          {
            title: "Families",
            items: [
              "Gain: more frequent visibility into work quality",
              "Risk: confidence in \"AI-graded\" results the teacher did not validate",
              "Need: transparent policy about what is AI-drafted and what is teacher-authored",
            ],
            color: C.coral,
          },
        ],
        sources: [
          { label: "MIT AI + Ethics Curriculum for Middle School", href: "https://www.media.mit.edu/projects/ai-ethics-for-middle-school/overview/" },
        ],
      },
      {
        title: "Thought experiments as policy stress tests",
        tag: "Site Connection",
        color: C.ocean,
        paragraphs: [
          "Policy becomes clearer under pressure, which is why AI dilemmas are a useful planning tool. The site's three flagship educator dilemmas pressure-test the most common AI policy edge cases. Each one is built to run as a twenty-minute staff discussion before a real version of the case lands in an administrator's inbox.",
          "The leadership move is to use these scenarios before a crisis. A policy committee can read one case, identify what current policy would say, locate the ambiguity, and draft a rule that a teacher, student, substitute, parent, and administrator would interpret the same way.",
        ],
        relatedExperiments: [
          {
            title: "The AI Authorship Quandary",
            route: "thought-experiments/educators?experiment=ai-authorship",
            framing: "What counts as a student's work when AI helped write it?",
          },
          {
            title: "The Reluctant Educator",
            route: "thought-experiments/educators?experiment=reluctant-educator",
            framing: "When measurable efficiency and educator judgment pull in opposite directions, which wins?",
          },
          {
            title: "The Digital Doppelgänger",
            route: "thought-experiments/educators?experiment=digital-doppelganger",
            framing: "When an AI avatar attends class for a student, what was actually taught and to whom?",
          },
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
    shortDesc: "What AI literacy actually means for students and teachers, anchored in PISA's 2029 Media and AI Literacy framework and UNESCO's teacher competencies.",
    image: `${base}/future-ai-literacy.webp`,
    imageAlt: "A future-facing education desk with a compass, AI literacy map, student profile cards, globe, and horizon glow.",
    accent: C.teal,
    readingMinutes: 10,
    bigIdea: "Future readiness is not tool familiarity. It is the ability to use AI critically, ethically, creatively, and with enough independence to keep learning when the tool is wrong.",
    useWithCaution: "Predictive analytics and AI-mediated learning environments can quietly narrow the curriculum or label students prematurely. Treat predictions as early-warning supports, not destiny.",
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
          "A district curriculum director is putting together next year's strategic plan. She knows she needs an \"AI literacy\" line item but is not sure what it actually has to contain. She wants something more rigorous than \"teach students to use ChatGPT,\" and she wants whatever the plan says to still be defensible in 2029, when the rest of the world will be measuring this directly.",
          "AI literacy now has a concrete global benchmark. PISA — the Programme for International Student Assessment, the OECD's triennial cross-country measurement of fifteen-year-old students — will include Media and Artificial Intelligence Literacy as an innovative domain in its 2029 cycle. The OECD itself (the Organisation for Economic Co-operation and Development, an intergovernmental body of thirty-eight mostly high-income member countries that publishes shared policy benchmarks) describes the assessment as a way to understand whether students have had opportunities to engage proactively and critically in a world shaped by media platforms and AI systems.",
          "For school leaders, that matters because AI literacy is no longer an optional enrichment topic. Students will need to evaluate digital content, understand how AI systems mediate information, act ethically with generated media, and participate responsibly in AI-shaped spaces.",
          "UNESCO's teacher AI competency framework points in the same direction for adults. It organizes teacher learning around a human-centered mindset, ethics of AI, AI foundations and applications, AI pedagogy, and AI for professional learning. Those dimensions can become a staff-development spine.",
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
        title: "Five shifts educators should plan for",
        tag: "Forecast",
        color: C.ocean,
        paragraphs: [
          "Five shifts deserve planning attention. Written as questions rather than promises, they give school leaders something to act on instead of something to predict.",
          "Predictive analytics can help identify patterns earlier, but it can also label students prematurely. Edtech personalization can adapt practice and feedback, but it can narrow the curriculum if optimization replaces teacher judgment. Virtual learning environments can support community and immediate help, but they can also monitor students too aggressively.",
          "AI tutoring and mentoring can expand access to help, but students still need human relationships and real accountability. Administrative efficiency can reduce workload, but schools must decide which tasks should remain human because they communicate care, trust, or professional responsibility.",
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
          "Labor-market shifts matter. The World Economic Forum's Future of Jobs research has repeatedly named AI literacy and analytical thinking among the fastest-rising skill demands, and that signal belongs in any future-readiness conversation. But education is larger than job-market adaptation, and schools that reduce themselves to a workforce pipeline tend to produce graduates who can pass tests and not much else.",
          "A better framing is durable agency. Students need to know how to use AI tools, but also how to read deeply, write clearly, reason from evidence, explain their process, collaborate with people, recognize manipulation, and make ethical judgments when tools make bad choices easy.",
          "Matt Miller asks the right framing question in AI for Educators: \"Plan instruction with this question front and center: Does this prepare my students for their futures?\" Before adopting the next tool, leadership teams should be able to answer the prior question — what do we want from our students, and what do we want for them?",
        ],
      },
      {
        title: "A future-ready classroom habit",
        tag: "Practice",
        color: C.coral,
        paragraphs: [
          "Every AI-supported task can end with a short reflection: What did the tool help you do? What did you have to decide yourself? What did you check? What did you reject? What would you be unable to explain without the tool?",
          "That habit protects learning because it turns AI use into metacognition. Students practice seeing the difference between output and understanding, assistance and authorship, speed and quality, convenience and judgment.",
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
    desc: "A curated catalog of teacher and student AI tools, case studies, books, and policy resources — organized by job-to-be-done, not by vendor.",
    shortDesc: "Tools, books, case studies, and ethics resources in one curated, policy-aware catalog — organized so teachers can see what each item is for before adopting it.",
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
        title: "Tools sorted by classroom role",
        tag: "Catalog",
        color: C.gold,
        paragraphs: [
          "An assistant superintendent has been forwarded twelve tool requests from teachers in the last two weeks. Three are general-purpose chatbots. Two are reading tutors. One is a feedback generator. The rest are things she has never heard of. Before deciding what to approve, she needs a way to sort them by what each one actually does — in front of students, behind teacher work, or somewhere in between.",
          "The catalog below organizes tools by the job they are doing for a teacher or learner, not by vendor. The organizing question is the same one a thoughtful purchasing committee would ask: what work is this thing meant to do, and what safeguards does the work require?",
          "General assistants can help with drafting, planning, explanation, and analysis. Tutoring systems can support practice and questioning. Teacher-workflow tools can speed up planning and feedback drafting. Voice, music, and video tools can support creative work and accessibility. Each role carries different safeguards.",
          "A new category worth surfacing separately is coding agents. Tools like Claude Code, OpenAI Codex, and GitHub Copilot are no longer just autocomplete in an IDE. They read codebases, propose changes across multiple files, run tests, and iterate on errors with limited supervision. For computer-science classrooms, that changes both what is possible to teach and what students will be tempted to outsource. For teachers in non-CS subjects, these tools rarely belong in the lesson plan — but they belong in the conversation about what professional work will look like for graduates.",
          "The voice, music, and video group has the steepest creative payoff and the trickiest safeguards. ElevenLabs can clone a voice from a few seconds of audio; Udio and Suno generate full songs from a prompt; Higgsfield generates short video clips. In classroom use, these tools shine for accessibility, multimodal review, and student creative projects — and they require firm rules about consent, attribution, copyright, and the difference between using a generated voice and impersonating a real person.",
        ],
        toolGroups: [
          {
            title: "General assistants",
            color: C.ocean,
            items: [
              { label: "ChatGPT", href: "https://chat.openai.com/" },
              { label: "Claude", href: "https://claude.ai/" },
              { label: "Microsoft Copilot", href: "https://copilot.microsoft.com/" },
              { label: "Gemini", href: "https://gemini.google.com/" },
            ],
          },
          {
            title: "Coding agents",
            color: C.teal,
            items: [
              { label: "Claude Code", href: "https://claude.com/product/claude-code" },
              { label: "OpenAI Codex", href: "https://openai.com/codex/" },
              { label: "GitHub Copilot", href: "https://github.com/features/copilot" },
            ],
          },
          {
            title: "Tutoring and practice",
            color: C.teal,
            items: [
              { label: "Khanmigo", href: "https://www.khanmigo.ai/" },
              { label: "Amira Learning", href: "https://www.amiralearning.com/" },
              { label: "Duolingo", href: "https://www.duolingo.com/" },
            ],
          },
          {
            title: "Teacher workflow",
            color: C.gold,
            items: [
              { label: "MagicSchool AI", href: "https://www.magicschool.ai/" },
              { label: "RigorGPT", href: "https://chatgpt.com/g/g-RigorGPT" },
              { label: "BackwardDesignGPT", href: "https://chatgpt.com/g/g-BackwardDesignGPT" },
              { label: "OutcomesGPT", href: "https://chatgpt.com/g/g-OutcomesGPT" },
              { label: "Science of Reading GPT", href: "https://chatgpt.com/g/g-SoRGPT" },
            ],
          },
          {
            title: "Voice, music, and video",
            color: C.ocean,
            items: [
              { label: "ElevenLabs", href: "https://elevenlabs.io/" },
              { label: "Udio", href: "https://www.udio.com/" },
              { label: "Suno", href: "https://suno.com/" },
              { label: "Higgsfield", href: "https://higgsfield.ai/" },
            ],
          },
          {
            title: "Access and creativity",
            color: C.coral,
            items: [
              { label: "Learning Ally", href: "https://learningally.org/" },
              "ReviewSongGPT",
              "AI-supported choice boards",
              "Genre remixing",
            ],
          },
        ],
      },
      {
        title: "Custom GPTs for professional learning",
        tag: "PD",
        color: C.teal,
        paragraphs: [
          "A small set of custom GPTs sits behind the catalog above — for rigor, backward design, outcomes alignment, the science of reading, lesson tutoring, and review songs. They are professional learning support, not magic expertise. These GPTs were built by Matthew A. Zinn for his own teacher coaching work and are shared here for educator use.",
          "A good custom GPT can give teachers a practice partner. It can define a concept, review a lesson plan, suggest a probing-question sequence, surface misalignment, or ask reflection questions. The teacher should still verify sources, adapt to local curriculum, and decide what belongs in front of students.",
          "For school leaders, these examples can model how a district might build constrained assistants around approved frameworks. The constraint is the value: a tool that knows the specific framework and asks teachers to reason through it is safer than a generic chatbot pretending to know the local context.",
        ],
      },
      {
        title: "Case studies and the evidence so far",
        tag: "Examples",
        color: C.ocean,
        paragraphs: [
          "Tools earn or fail their place by what they actually do for students and teachers. The evidence base on AI in education is rapidly maturing, and it is not one-directional. The strongest signals are around access (reading practice, tutoring availability, adoption scale) and teacher time (drafting, planning, IEP first-passes). The most consistent cautionary signals are around cognitive offloading and the gap between productivity and learning.",
          "The findings below are organized as positive correlations, an adoption snapshot, and cautionary signals. Each card names a specific study or report. None of them are endorsements; all of them are evidence to weigh.",
        ],
        charts: [
          {
            type: "effect-size",
            value: 0.45,
            label: "Overall effect of generative-AI interventions (68 studies, 337 effect sizes)",
            citation: "Educational Research Review meta-analysis (2025)",
            accent: C.teal,
          },
          {
            type: "bars",
            title: "AI use in K–12 classrooms, 2024–25",
            description: "Center for Democracy and Technology, October 2025. Same survey: data-breach incidents and tech-fueled harassment cases rose alongside adoption.",
            items: [
              { label: "Teachers using AI", value: 85, accent: C.gold },
              { label: "Students using AI", value: 86, accent: C.teal },
              { label: "Students worried about AI", value: 60, accent: C.coral },
            ],
            unit: "%",
          },
        ],
        evidenceCallouts: [
          {
            year: "2025",
            title: "Moderate positive effect overall",
            finding: "A meta-analysis in Educational Research Review covering 68 studies and 337 effect sizes found a moderate positive effect (SMD = 0.45) for generative-AI-supported interventions across grade bands.",
            citation: "Educational Research Review meta-analysis (2025)",
            color: C.teal,
          },
          {
            year: "2024",
            title: "Amira: reading growth doubled",
            finding: "Amira Learning's AI reading tutor has been shown to double the rate of reading growth for children ages 5 to 10, with the largest gains for early readers given targeted oral-reading practice.",
            citation: "Amira Learning published outcomes (2024)",
            color: C.teal,
          },
          {
            year: "Aug 2025",
            title: "Khanmigo reaches 700K users; Ohio goes statewide",
            finding: "Khan Academy's Khanmigo grew from roughly 40,000 pilot users to 700,000 in 2024–25 after Khanmigo was integrated directly into practice exercises. An Ohio partnership in August 2025 made the full Khan Academy and Khanmigo suite free statewide.",
            citation: "Khan Academy reporting; Chalkbeat (2025)",
            color: C.teal,
          },
          {
            year: "Oct 2025",
            title: "Adoption is already near-universal",
            finding: "The Center for Democracy and Technology reported that 85 percent of teachers and 86 percent of students used AI tools in the 2024–25 school year, while also documenting rising data-breach incidents and tech-fueled harassment cases tied to that adoption.",
            citation: "Laird, Center for Democracy and Technology (2025)",
            color: C.gold,
          },
          {
            year: "Oct 2025",
            title: "Productivity gains ≠ learning gains",
            finding: "A Microsoft Research report by Walker and Vorvoreanu documented that students using generative AI to complete tasks reported lower cognitive effort and grew overconfident about mastery. Without scaffolding, GenAI use impaired memory formation for the underlying material.",
            citation: "Walker & Vorvoreanu, Microsoft Research (2025)",
            color: C.coral,
          },
          {
            year: "2024",
            title: "High school math scores dropped 17 percent",
            finding: "Bastani and colleagues found that high school math students using generative AI without scaffolding scored 17 percent lower on subsequent assessments than peers without access. The gap closed when AI was paired with structured productive struggle.",
            citation: "Bastani et al. (2024)",
            color: C.coral,
          },
          {
            year: "2026",
            title: "Students worry about themselves",
            finding: "A RAND Corporation study found that 60 percent of AI-using students expressed concern about the impact of AI on their own critical thinking — student concern outpaced institutional concern in the same survey.",
            citation: "RAND Corporation (2026)",
            color: C.coral,
          },
        ],
      },
      {
        title: "Questions to ask of every case",
        tag: "Practice",
        color: C.teal,
        paragraphs: [
          "For each case in the catalog above, the same questions apply: What data is collected? Who reviews the output? What learning target is served? What happens when the system is wrong? What does the teacher see? What can the student explain without the tool?",
          "The teacher-stress side of this evidence base is still thinner than the student-outcomes side. Time savings on IEP first-drafts, lesson planning, and routine communication are widely reported by teachers using tools like MagicSchool and the custom GPTs above, but rigorous quantitative measurement of teacher workload and burnout reduction is still emerging. Treat any single vendor's productivity claim as a hypothesis to verify in your own building, not as a settled finding.",
        ],
      },
      {
        title: "Books, policy, and ethics resources",
        tag: "Reading",
        color: C.coral,
        paragraphs: [
          "Seven resources form a core reading pathway for educators going deeper. Each pairs a single book or framework with the question it answers best. Tools date quickly. Ethical reasoning ages better.",
          "The list should also point back into The Ethical Educator's own AI ethics and thought-experiment pages, because those pages are now the site's strongest differentiated contribution.",
        ],
        listTitle: "A core reading pathway:",
        list: [
          { label: "Brave New Words", href: "https://www.penguinrandomhouse.com/books/738009/brave-new-words-by-salman-khan/", desc: "Sal Khan — the case for AI as one-on-one tutoring at scale." },
          { label: "The Coming Wave", href: "https://www.penguinrandomhouse.com/books/722674/the-coming-wave-by-mustafa-suleyman-with-michael-bhaskar/", desc: "Mustafa Suleyman — capability, containment, and why governance is the hard part." },
          { label: "AI for Educators", href: "https://ditchthattextbook.com/ai-for-educators/", desc: "Matt Miller — practical classroom moves for teachers ready to start." },
          { label: "The Singularity is Nearer", href: "https://www.thesingularityisnearer.com/", desc: "Ray Kurzweil — the most expansive end of the forecasting spectrum, useful as a foil even where its timelines remain heavily contested." },
          { label: "UNESCO Guidance for Generative AI in Education and Research", href: "https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research", desc: "Policy and competency frameworks." },
          { label: "IEEE Global Initiative on Ethics of Autonomous and Intelligent Systems", href: "https://standards.ieee.org/industry-connections/ec/autonomous-systems/", desc: "Standards-oriented ethics for systems thinkers." },
          { label: "MIT AI Ethics Education Curriculum", href: "https://www.media.mit.edu/projects/ai-ethics-for-middle-school/overview/", desc: "Classroom-ready ethical reasoning activities, especially for middle school." },
        ],
      },
    ],
    resourceLinks: [
      { label: "Brave New Words", href: "https://www.penguinrandomhouse.com/books/738009/brave-new-words-by-salman-khan/" },
      { label: "The Coming Wave", href: "https://www.penguinrandomhouse.com/books/722674/the-coming-wave-by-mustafa-suleyman-with-michael-bhaskar/" },
      { label: "AI for Educators", href: "https://ditchthattextbook.com/ai-for-educators/" },
      { label: "The Singularity is Nearer", href: "https://www.thesingularityisnearer.com/" },
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
    display: "2026",
    label: "NYC AI guidance",
    subtitle: "Most detailed U.S. district framework",
    color: C.teal,
  },
  {
    display: "2029",
    label: "PISA MAIL assessment",
    subtitle: "Media and AI Literacy goes global",
    color: C.gold,
  },
  {
    display: "5",
    label: "UNESCO teacher dimensions",
    subtitle: "Human-centered through professional learning",
    color: C.ocean,
  },
  {
    display: "3",
    label: "Policy use bands",
    subtitle: "Red, Yellow, Green categories",
    color: C.coral,
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
