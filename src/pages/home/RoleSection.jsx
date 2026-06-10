import { m } from "motion/react";
import { C } from "../../theme.js";
import { fadeRise, drawLine, staggerGroup, EASE_OUT, VIEWPORT } from "../../lib/motion.jsx";
import { SectionIntro, handleCardKeyDown } from "./parts.jsx";

const audiences = [
  {
    label: "Teachers",
    desc: "Pick a classroom-ready discussion, then use the toolkit to run it well.",
    page: "audiences/teacher",
    action: "Plan a class conversation",
    color: C.gold,
    textColor: C.gold,
  },
  {
    label: "Administrators",
    desc: "Use ethical frameworks and scenarios before AI policy becomes guesswork.",
    page: "audiences/administrator",
    action: "Frame a policy discussion",
    color: C.ocean,
    textColor: C.oceanText,
  },
  {
    label: "Parents & families",
    desc: "Find kitchen-table questions for AI, homework, fairness, and judgment.",
    page: "audiences/parent",
    action: "Start a family conversation",
    color: C.coral,
    textColor: C.coralText,
  },
];

// Draws after the card has mostly settled.
const underlineDraw = {
  hidden: drawLine.hidden,
  show: { ...drawLine.show, transition: { duration: 0.6, ease: EASE_OUT, delay: 0.3 } },
};

function RoleCard({ item, navigate }) {
  const openPage = () => navigate(item.page);
  return (
    <m.div
      role="button"
      tabIndex={0}
      className="role-card"
      style={{ "--accent": item.color, "--accent-text": item.textColor, "--accent-soft": `${item.color}14` }}
      aria-label={`${item.label}. ${item.desc} ${item.action}`}
      onClick={openPage}
      onKeyDown={(event) => handleCardKeyDown(event, openPage)}
      variants={fadeRise}
      whileHover={{ y: -3 }}
      whileFocus={{ y: -3 }}
      whileTap={{ scale: 0.99 }}
    >
      <p className="role-label">{item.label}</p>
      <m.span className="role-underline" aria-hidden="true" variants={underlineDraw} style={{ transformOrigin: "left" }} />
      <p className="role-desc">{item.desc}</p>
      <span className="role-action">{item.action} <span aria-hidden="true">→</span></span>
    </m.div>
  );
}

export default function RoleSection({ navigate }) {
  return (
    <section id="role-doorways" className="home-section" style={{ "--section-tint": "rgba(200,152,48,0.06)" }}>
      <div className="home-container">
        <SectionIntro
          index="02"
          kicker="Doorways"
          title="Find the path built for how you arrived"
          centered
        >
          The site has guided journeys for different visitors. Pick the role closest to yours, then switch paths whenever the work calls for it.
        </SectionIntro>
        <m.div
          className="role-grid"
          variants={staggerGroup(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          {audiences.map((item) => (
            <RoleCard key={item.label} item={item} navigate={navigate} />
          ))}
        </m.div>
        <m.p
          className="students-note"
          variants={fadeRise}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          Students don't need a doorway — they're already in the room. Every path here ends with them.{" "}
          <button type="button" className="students-link" onClick={() => navigate("audiences/student")}>
            Student page <span aria-hidden="true">→</span>
          </button>
        </m.p>
      </div>
    </section>
  );
}
