import { m } from "motion/react";
import { fadeRise, drawLine, staggerGroup, SPRING_SOFT, SPRING_SNAPPY, VIEWPORT } from "../../lib/motion.jsx";

const fadeRiseHeading = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: SPRING_SOFT },
};

export function HomeButton({ children, onClick, variant = "primary" }) {
  return (
    <m.button
      type="button"
      className={`home-button ${variant}`}
      onClick={onClick}
      variants={fadeRise}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={SPRING_SNAPPY}
    >
      {children}
      <span className="button-mark" aria-hidden="true">→</span>
    </m.button>
  );
}

export function handleCardKeyDown(event, onActivate) {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  onActivate();
}

export function SectionIntro({ index, kicker, title, children, centered = false }) {
  return (
    <m.div
      className={centered ? "centered" : ""}
      variants={staggerGroup(0.08, 0)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      <m.p className="section-kicker" variants={fadeRise}>
        {index && <span className="kicker-index">{index}</span>}
        {kicker}
      </m.p>
      <m.span
        className="kicker-rule"
        aria-hidden="true"
        variants={drawLine}
        style={{ transformOrigin: centered ? "center" : "left" }}
      />
      <m.h2 className="section-heading" variants={fadeRiseHeading}>{title}</m.h2>
      {children && <m.p className="section-copy" variants={fadeRise}>{children}</m.p>}
    </m.div>
  );
}
