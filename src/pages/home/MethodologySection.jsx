import { m } from "motion/react";
import { C } from "../../theme.js";
import { TEACHER_KIT_COUNT, PROTOCOL_COUNT, SENTENCE_STEM_COUNT, CURATED_RESOURCE_COUNT } from "../../data/siteStats.js";
import { fadeRise, staggerGroup, VIEWPORT } from "../../lib/motion.jsx";
import { SectionIntro } from "./parts.jsx";

export default function MethodologySection({ navigate }) {
  const methods = [
    {
      kicker: "Research-grounded",
      title: "Every dilemma cites its source.",
      stat: CURATED_RESOURCE_COUNT,
      statLabel: "curated sources",
      desc: "Scenarios trace to published research, real cases, and the philosophical canon — and a curated library of sources sits alongside the work, ready to be checked.",
      action: "Browse the source library",
      page: "resources",
      color: C.teal,
      textColor: C.tealText,
    },
    {
      kicker: "Built for the room",
      title: "Kits, not just ideas.",
      stat: TEACHER_KIT_COUNT,
      statLabel: "teacher kits",
      desc: `Experiments ship with teacher kits — norms, ${SENTENCE_STEM_COUNT} sentence stems, ${PROTOCOL_COUNT} discussion protocols, and Socratic moves — so the conversation survives contact with a real classroom.`,
      action: "Open the toolkit",
      page: "thought-experiments/toolkit",
      color: C.gold,
      textColor: C.gold,
    },
    {
      kicker: "Private by design",
      title: "No accounts. No cookies.",
      stat: 0,
      statLabel: "sign-ins required",
      desc: "Nothing here asks a student to sign in. Analytics are cookieless, and the decision journal never leaves the browser.",
      action: "Read the privacy stance",
      page: "privacy",
      color: C.ocean,
      textColor: C.oceanText,
    },
  ];

  return (
    <section className="home-section" style={{ "--section-tint": "rgba(26,138,122,0.05)" }}>
      <div className="home-container">
        <SectionIntro index="04" kicker="How it's built" title="Built to survive a skeptical reading" centered>
          A district evaluating this site should be able to check every claim. Here is what holds the work up.
        </SectionIntro>
        <m.div
          className="method-grid"
          variants={staggerGroup(0.09)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          {methods.map((item) => (
            <m.div
              key={item.kicker}
              className="method-card"
              style={{ "--accent": item.color, "--accent-text": item.textColor }}
              variants={fadeRise}
            >
              <p className="method-kicker">{item.kicker}</p>
              <p className="method-stat">
                {item.stat}<span> {item.statLabel}</span>
              </p>
              <h3 className="method-title">{item.title}</h3>
              <p className="method-desc">{item.desc}</p>
              <button type="button" className="method-link" onClick={() => navigate(item.page)}>
                {item.action} <span aria-hidden="true">→</span>
              </button>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
