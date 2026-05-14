import { C } from "../theme.js";

const base = "/illustrations/ai-education";

export const AI_EDUCATION_HUB = {
  id: "ai-education",
  title: "AI in the Classroom",
  sectionLabel: "Practical Applications · Evidence · Voices",
  desc: "From personalized learning and IEP support to custom GPTs and lesson review tools — how AI is actually being used right now, what the evidence says works, and the voices shaping the discourse. Grounded in philosophy, connected to real classrooms.",
  image: `${base}/ai-classroom-hub.webp`,
  imageAlt: "A contemporary classroom planning table with a laptop, learning pathways, rubrics, accessibility tools, and warm classroom light.",
  accent: C.ocean,
};

export const AI_EDUCATION_TOPICS = [
  {
    id: "personalized-learning",
    title: "Personalized Learning",
    desc: "AI tutors like Khanmigo remember interests and adapt in real time. A soccer fan learns polynomials through game statistics. Every student gets a path tailored to how they learn best.",
    image: `${base}/personalized-learning.webp`,
    imageAlt: "A tablet with branching learning paths, a math notebook, soccer diagram, and adaptive practice cards on a teacher desk.",
    accent: C.teal,
  },
  {
    id: "iep-special-education",
    title: "IEP & Special Education",
    desc: "AI tools generate IEP drafts, suggest accommodations, and level text — saving teachers hours. But the teacher makes the final call. AI is the assistant, never the decision-maker.",
    image: `${base}/iep-special-education.webp`,
    imageAlt: "An IEP folder, accessibility tools, headphones, leveled reading pages, and color-coded accommodation notes.",
    accent: C.gold,
  },
  {
    id: "creative-ai-tools",
    title: "Creative AI Tools",
    desc: "ReviewSongGPT turns lessons into songs. Students' narratives become children's books. AI remixes work across genres, opening doors to creativity students didn't know existed.",
    image: `${base}/creative-ai-tools.webp`,
    imageAlt: "A creative teaching desk with music notes, story pages, watercolor palette, headphones, and a glowing tablet.",
    accent: C.coral,
  },
  {
    id: "ai-powered-feedback",
    title: "AI-Powered Grading",
    desc: "Tools like AutoMark provide fast, consistent feedback. NYC's 2026 policy prohibits AI-driven grading decisions — but using AI as a co-pilot for feedback is encouraged.",
    image: `${base}/ai-powered-feedback.webp`,
    imageAlt: "A teacher rubric, essay draft, red pen, feedback notes, and abstract AI suggestion cards on a screen.",
    accent: C.ocean,
  },
  {
    id: "custom-gpts-pd",
    title: "Custom GPTs for PD",
    desc: "RigorGPT, BackwardDesignGPT, OutcomesGPT, Science of Reading GPT — specialized AI assistants built by Matthew for professional development in key teaching domains.",
    image: `${base}/custom-gpts-pd.webp`,
    imageAlt: "Professional development planning materials, lesson maps, assistant cards, and connected node lines on a tablet.",
    accent: C.gold,
  },
  {
    id: "future-ai-literacy",
    title: "The Future",
    desc: "Predictive analytics with complete learner profiles, AI tutoring 24/7, virtual learning communities, and administrative automation. The OECD will assess AI literacy in 2029 PISA.",
    image: `${base}/future-ai-literacy.webp`,
    imageAlt: "A future-facing education desk with a compass, AI literacy map, student profile cards, globe, and horizon glow.",
    accent: C.teal,
  },
];

export const AI_EDUCATION_SECTION_VISUALS = {
  evidence: {
    id: "ai-education-evidence",
    label: "Research Lens",
    title: "Evidence is promising, but not automatic.",
    desc: "The best AI learning gains show up when tools scaffold thinking. The risk appears when speed quietly replaces the productive friction that makes understanding stick.",
    image: `${base}/evidence-learning-balance.webp`,
    imageAlt: "A teacher research desk with papers, charts, and a tablet showing a balance between growth and caution.",
    accent: C.teal,
    points: ["Scaffolding", "Transfer", "Cognitive effort"],
  },
  classroom: {
    id: "ai-education-classroom",
    label: "Practice Lens",
    title: "The teacher stays in the loop.",
    desc: "AI can draft, adapt, level, summarize, and suggest. The professional judgment still belongs to the educator who knows the students, the context, and the stakes.",
    image: `${base}/classroom-implementation.webp`,
    imageAlt: "A classroom planning table with lesson plans, accessibility supports, headphones, and assistant cards on a laptop.",
    accent: C.gold,
    points: ["Differentiation", "IEP support", "Feedback review"],
  },
  voices: {
    id: "ai-education-voices",
    label: "Discourse Lens",
    title: "This is a debate, not a slogan.",
    desc: "The field is being shaped by cautious optimists, sharp critics, policy groups, researchers, and working educators trying to separate what AI can do from what schools should do.",
    image: `${base}/voices-discourse.webp`,
    imageAlt: "A scholarly roundtable with microphones, books, policy notes, and a tablet showing connected discussion nodes.",
    accent: C.coral,
    points: ["Optimists", "Critics", "Institutions"],
  },
};

export const AI_EDUCATION_SNAPSHOT_STATS = [
  {
    display: "68",
    value: 68,
    suffix: "",
    label: "studies in the GenAI meta-analysis",
    subtitle: "337 effect sizes; moderate positive effect",
    color: C.teal,
  },
  {
    display: "80-85%",
    value: 80,
    suffix: "-85%",
    label: "needed help initiating AI questions",
    subtitle: "Khanmigo adoption lesson",
    color: C.coral,
  },
  {
    display: "60%",
    value: 60,
    suffix: "%",
    label: "of AI-using students expressed concern",
    subtitle: "RAND critical-thinking signal",
    color: C.gold,
  },
  {
    display: "2029",
    value: 2029,
    suffix: "",
    label: "PISA will assess AI literacy",
    subtitle: "OECD global benchmark",
    color: C.ocean,
  },
];

export const AI_EDUCATION_NAV_ITEMS = [
  { id: "ai-education-evidence", label: "Evidence", color: C.teal },
  { id: "ai-education-classroom", label: "Classroom Practice", color: C.gold },
  { id: "ai-education-voices", label: "Voices", color: C.coral },
  { id: "ai-education-videos", label: "Videos", color: C.ocean },
];

export const AI_EDUCATION_TOOLS = [
  {
    name: "ChatGPT / Copilot / Gemini",
    category: "General assistant",
    desc: "Lesson planning, content creation, explanation drafts, and professional development support.",
    note: "Use age gates and parental permissions for student-facing use.",
    color: C.ocean,
  },
  {
    name: "Khanmigo",
    category: "Tutor",
    desc: "Personalized tutoring that can report the collaborative process and adapt to student interests.",
    note: "Works best when embedded in practice, not treated as a standalone chatbot.",
    color: C.teal,
  },
  {
    name: "Copilot Learn Live",
    category: "Socratic tutor",
    desc: "Voice-enabled tutoring with interactive whiteboards and guided questioning.",
    note: "Keep the teacher in charge of instructional purpose and pacing.",
    color: C.ocean,
  },
  {
    name: "MagicSchool AI",
    category: "Teacher toolkit",
    desc: "IEP drafts, choice boards, rubrics, differentiation supports, and planning aids.",
    note: "Review all legally sensitive outputs before use.",
    color: C.gold,
  },
  {
    name: "Amira Learning",
    category: "Reading tutor",
    desc: "Listens to children read aloud and supports early literacy practice.",
    note: "Strong fit for targeted reading support with teacher oversight.",
    color: C.teal,
  },
  {
    name: "Duolingo",
    category: "Adaptive practice",
    desc: "Gamified language learning with adaptive difficulty and spaced practice.",
    note: "Useful as practice support, not a full language curriculum.",
    color: C.coral,
  },
  {
    name: "Learning Ally",
    category: "Accessibility",
    desc: "Audiobook support for struggling readers, especially students with dyslexia and literacy needs.",
    note: "Pair with explicit reading instruction and accommodation planning.",
    color: C.gold,
  },
  {
    name: "PeerTeach",
    category: "Peer tutoring",
    desc: "AI-supported peer tutoring matches based on learning style and support needs.",
    note: "Monitor quality, privacy, and student dynamics carefully.",
    color: C.teal,
  },
  {
    name: "AutoMark",
    category: "Feedback co-pilot",
    desc: "Essay, quiz, and exam feedback support for faster drafting and consistency checks.",
    note: "Do not outsource grading decisions to AI.",
    color: C.coral,
  },
];

export const AI_EDUCATION_CONTINUE_LINKS = [
  {
    id: "ai-consciousness",
    image: `${base}/voices-discourse.webp`,
    imageAlt: "Podcast microphones, books, and connected discussion nodes representing debate about AI minds and moral caution.",
    title: "The Consciousness Line",
    desc: "AI minds, organoids, and ethical caution",
    color: C.coral,
  },
  {
    id: "ai-ethics",
    image: `${base}/evidence-learning-balance.webp`,
    imageAlt: "A research desk with a balanced display of growth and caution signals.",
    title: "AI Ethics",
    desc: "Policy and philosophical frameworks",
    color: C.gold,
  },
  {
    id: "thought-experiments",
    image: `${base}/classroom-implementation.webp`,
    imageAlt: "A teacher planning table with classroom materials and AI assistant cards.",
    title: "Thought Experiments",
    desc: "Reason through hard cases",
    color: C.teal,
  },
];
