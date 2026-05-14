import AudiencePage from "./AudiencePage.jsx";
import { C } from "../../theme.js";

const config = {
  eyebrow: "For Administrators & School Leaders",
  accent: C.ocean,
  title: "AI policy is a values statement. So is the absence of one.",
  subtitle: "A guided path: read the framework, run a scenario with your team, ground the conversation in evidence, then connect it to operational leadership.",
  intro: "The materials below are sequenced for the work of writing or defending a policy. Step 1 is the ethical framework. Step 2 is the experiment you can run in a leadership meeting. Step 3 is the evidence base. Step 4 is the operating system around it all.",

  stepsLabel: "Your journey",
  steps: [
    {
      route: "ai-ethics",
      title: "Step 1 — Read the AI Ethics framework",
      copy: "The is/ought problem, UNESCO frameworks, the EU AI Act, NYC's traffic-light policy, and an actionable funnel from value to practice. Read this before drafting any policy.",
      cta: "Open the framework",
      color: C.gold,
    },
    {
      route: "thought-experiments/educators",
      title: "Step 2 — Run a flagship at your next leadership meeting",
      copy: "The four educator flagships are multi-stage scenarios designed for staff PD and leadership retreats. Each ends with a discussion guide. Use one to surface where your team actually disagrees before you draft a policy.",
      cta: "Open For Educators",
      color: C.teal,
    },
    {
      route: "ai-education",
      title: "Step 3 — Ground the conversation in evidence",
      copy: "AI in the Classroom is a research tour: what the data actually says about AI tutors, personalization, and learning outcomes. The Paradox is the harder sibling piece — assume AI has matched human teachers, then ask what school is for.",
      cta: "Read the evidence",
      color: C.coral,
    },
    {
      route: "ai-ambiguity-to-action",
      title: "Step 4 — Translate values into action",
      copy: "From Ambiguity to Action walks the funnel from \"we value transparency\" to \"here's the policy.\" Utilitarianism, deontology, virtue ethics — translated into the decisions you actually have to make.",
      cta: "Open the playbook",
      color: C.gold,
    },
    {
      route: "quality-leadership",
      title: "Step 5 — Operational leadership",
      copy: "Quality Leadership & Instruction, High-Performing Schools, and the RTI framework — the broader operating system you're running. AI is one input among many. These pages cover the rest.",
      cta: "Open the leadership library",
      color: C.ocean,
    },
  ],

  tailLabel: "Or take a different door",
  tail: [
    { id: "audiences/teacher", title: "Resources for teachers", desc: "Practitioner-facing materials", color: C.gold },
    { id: "phil-education", title: "Philosophy in K–12", desc: "Curriculum case + research", color: C.coral },
    { id: "moral-psych", title: "Moral Psychology", desc: "The research spine", color: C.teal },
    { id: "resources", title: "Reading List", desc: "Books, papers, policy frameworks", color: C.gold },
  ],
};

export default function Administrator({ navigate }) {
  return <AudiencePage navigate={navigate} config={config} />;
}
