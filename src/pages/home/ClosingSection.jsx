import { m } from "motion/react";
import { fadeRise, staggerGroup, STAGGER, VIEWPORT } from "../../lib/motion.jsx";
import { HomeButton } from "./parts.jsx";

export default function ClosingSection({ navigate }) {
  return (
    <section className="home-section" style={{ "--section-tint": "rgba(192,112,64,0.05)" }}>
      <div className="home-container">
        <m.blockquote
          className="closing-epigraph"
          variants={staggerGroup(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <m.p variants={fadeRise}>
            “If no one could ever tell you used AI — would you still do the work?”
          </m.p>
          <m.footer variants={fadeRise}>
            <cite>after Plato, Republic II · the Ring of Gyges</cite>
            <button type="button" className="epigraph-link" onClick={() => navigate("phil-education")}>
              Where the philosophy comes from <span aria-hidden="true">→</span>
            </button>
          </m.footer>
        </m.blockquote>

        <m.div
          className="closing-band"
          variants={staggerGroup(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <m.div variants={fadeRise}>
            <p className="section-kicker">Why this exists</p>
            <h2>The question is not only what AI can make easier.</h2>
            <p>
              It is what students become through learning, reasoning, revising, and explaining their choices. The site is built to keep that question visible while schools make practical decisions.
            </p>
          </m.div>
          <m.div className="closing-actions" variants={staggerGroup(STAGGER.tight, 0.1)}>
            <HomeButton onClick={() => navigate("ai-ethics-lesson-plans")}>AI ethics lesson plans</HomeButton>
            <HomeButton variant="ghost" onClick={() => navigate("about")}>About Matthew</HomeButton>
            <HomeButton variant="ghost" onClick={() => navigate("ai-education")}>Read the evidence</HomeButton>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
