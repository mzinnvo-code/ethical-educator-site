import { C } from "../theme.js";

const base = "/illustrations/educators";

export const EDUCATOR_HUB = {
  id: "for-educators",
  title: "For Educators",
  sectionLabel: "Professional Development",
  desc: "Practitioner-facing resources drawn from professional development workshops, evaluation frameworks, and instructional research. Built for teachers who want concrete strategies, not just theory — though the theory is here when you need it.",
  image: `${base}/for-educators-hub.webp`,
  imageAlt: "A warm professional development desk with a planner, compass, classroom cards, and educator resource folders.",
  accent: C.gold,
};

export const EDUCATOR_RESOURCES = {
  "teaching-feedback": {
    id: "teaching-feedback",
    title: "Effective Academic Feedback",
    sectionLabel: "For Educators · Teaching & Feedback",
    desc: "Strategies for providing personalized, actionable, and growth-oriented feedback that prompts students' thinking, addresses misconceptions, and builds toward mastery. Grounded in research from Hattie & Timperley and contemporary teacher evaluation standards.",
    shortDesc: "Personalized growth feedback, the 5 R's of action feedback, 1:1 conferencing strategies, and a research-based evaluation standard. How to write comments that students actually use.",
    image: `${base}/effective-academic-feedback.webp`,
    imageAlt: "Annotated student work, a red pen, rubrics, sticky notes, and a softly glowing teacher laptop.",
    accent: C.teal,
  },
  "enhancing-feedback": {
    id: "enhancing-feedback",
    title: "Enhancing Academic Feedback",
    sectionLabel: "For Educators · Teaching & Feedback",
    desc: "An advanced complement to the foundational feedback page. Performance levels, multimodal delivery, assessment integrity, and the personal action plan that takes feedback from \"best effort\" to genuinely effective.",
    shortDesc: "Advanced strategies for effective, actionable, and personalized feedback. A deeper dive into assessment alignment and feedback quality frameworks.",
    image: `${base}/enhancing-academic-feedback.webp`,
    imageAlt: "Layered rubrics, feedback channels, revision materials, and assessment tools arranged as a bridge from draft to improvement.",
    accent: C.gold,
  },
  "enhancing-engagement": {
    id: "enhancing-engagement",
    title: "Enhancing Student Engagement",
    sectionLabel: "For Educators · Student Engagement",
    desc: "Theoretical frameworks and practical models for understanding what engagement looks like, why it matters, and how to design learning experiences that sustain it. Behavioral, cognitive, and emotional dimensions — and the strategies that move all three at once.",
    shortDesc: "Theoretical frameworks and practical models for understanding what engagement looks like, why it matters, and how to design learning experiences that sustain it.",
    image: `${base}/enhancing-student-engagement.webp`,
    imageAlt: "Educators' and students' hands arranging discussion cards and puzzle pieces around a glowing learning idea.",
    accent: C.teal,
  },
  "gamification-in-education": {
    id: "gamification-in-education",
    title: "Gamification in Education",
    sectionLabel: "For Educators · Student Engagement",
    desc: "A playable, research-informed teacher quest about gamification, contested attention, student engagement, and how gameful design can reward the thinking move while connecting naturally to Thought Experiments progress. Finishing it earns a printable Teacher Kit.",
    shortDesc: "A 16-bit teacher quest on contested attention, motivation research, mastery badges, and browser-only Thought Experiments progress.",
    image: `${base}/gamification-in-education.webp`,
    imageAlt: "Ari celebrates gameful learning beside a mastery badge and progress meter in the Gamification in Education quest.",
    accent: C.coral,
  },
  "async-engagement": {
    id: "async-engagement",
    title: "Asynchronous Learning Engagement",
    sectionLabel: "For Educators · Student Engagement",
    desc: "Strategies specific to online and asynchronous contexts — where engagement requires different tools and approaches than in-person instruction. Course design, instructor facilitation, isolation, and the trends shaping the next phase of online learning.",
    shortDesc: "Strategies specific to online and asynchronous contexts — where engagement requires different tools and approaches than in-person instruction.",
    image: `${base}/asynchronous-learning-engagement.webp`,
    imageAlt: "An online course workspace with a laptop, modular learning path, headphones, calendar blocks, and a distant student desk.",
    accent: C.ocean,
  },
  "av-resources": {
    id: "av-resources",
    title: "AV Resources for Online Teaching",
    sectionLabel: "For Educators · Student Engagement",
    desc: "Audio and video tools that make online instruction more engaging, accessible, and human. Practical recommendations for K–12 virtual classrooms — and the accessibility commitments that should accompany every multimedia choice.",
    shortDesc: "Audio and video tools that make online instruction more engaging, accessible, and human. Practical tech recommendations for virtual classrooms.",
    image: `${base}/av-resources-online-teaching.webp`,
    imageAlt: "A camera, microphone, headphones, caption-like media bars, and virtual teaching tools on a warm desk.",
    accent: C.gold,
  },
  "quality-leadership": {
    id: "quality-leadership",
    title: "Quality Leadership & Instruction",
    sectionLabel: "For Educators · School Leadership",
    desc: "What distinguishes high-performing school leaders, and how leadership practices translate to classroom outcomes. Theoretical frameworks for leadership style, the components of quality instruction, and five reflection scenarios drawn from situations real principals face.",
    shortDesc: "Instructional leadership PD — what distinguishes high-performing school leaders and how leadership practices translate to classroom outcomes.",
    image: `${base}/quality-leadership-instruction.webp`,
    imageAlt: "A school improvement map with a compass, model school, strategy cards, and collaborative planning hands.",
    accent: C.gold,
  },
  "high-performing-schools": {
    id: "high-performing-schools",
    title: "High-Performing K–12 Schools",
    sectionLabel: "For Educators · School Performance",
    desc: "The nation's top-performing schools don't rely on last-minute test prep. They cultivate a culture of ongoing preparation that consistently produces strong results — built on data, rigorous instruction, intensive teacher training, and a supportive culture.",
    shortDesc: "Data-driven decisions, extended learning time, and the organizational practices that separate consistently excellent schools from the rest.",
    image: `${base}/high-performing-k12-schools.webp`,
    imageAlt: "School performance materials with notebooks, assessment dashboards, upward progress charts, and warm classroom light.",
    accent: C.teal,
  },
  "rti": {
    id: "rti",
    title: "Response to Intervention (RTI)",
    sectionLabel: "For Educators · School Performance",
    desc: "The tiered intervention framework — identifying struggling students early, providing targeted support, and monitoring progress systematically. A K–12 overview of how RTI is designed, what it can and cannot do, and what implementation actually requires.",
    shortDesc: "The tiered intervention framework — identifying struggling students early, providing targeted support, and monitoring progress systematically.",
    image: `${base}/rti.webp`,
    imageAlt: "A three-tier support structure with student folders, intervention cards, and progress-monitoring markers.",
    accent: C.coral,
  },
};

export const EDUCATOR_RESOURCE_GROUPS = [
  {
    label: "Teaching & Feedback",
    kicker: "Make Feedback Usable",
    desc: "Move from comments students receive to feedback cycles students can act on, revise from, and trust.",
    accent: C.teal,
    ids: ["teaching-feedback", "enhancing-feedback"],
  },
  {
    label: "Student Engagement",
    kicker: "Design for Participation",
    desc: "Build learning experiences that hold attention across classroom, online, asynchronous, audio, and video settings.",
    accent: C.gold,
    ids: ["enhancing-engagement", "gamification-in-education", "async-engagement", "av-resources"],
  },
  {
    label: "School Leadership & Performance",
    kicker: "Sustain Improvement",
    desc: "Connect instructional leadership, performance culture, and tiered support systems so improvement survives beyond a single initiative.",
    accent: C.coral,
    ids: ["quality-leadership", "high-performing-schools", "rti"],
  },
];

export function educatorLink(id, overrides = {}) {
  const resource = id === EDUCATOR_HUB.id ? EDUCATOR_HUB : EDUCATOR_RESOURCES[id];
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
