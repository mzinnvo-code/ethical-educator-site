import { m } from "motion/react";
import { C } from "../../theme.js";
import { getFeatureIllustration } from "../../data/illustrations.js";
import { fadeRise, staggerGroup, STAGGER, VIEWPORT } from "../../lib/motion.jsx";
import { SectionIntro, handleCardKeyDown } from "./parts.jsx";

const rail = [
  {
    label: "K–5",
    title: "Story choices",
    desc: "Elementary stories, read-aloud support, and grade-specific teacher kits.",
    page: "thought-experiments/k-5",
    color: C.coral,
    textColor: C.coralText,
    image: getFeatureIllustration("thought-experiments/k-5"),
  },
  {
    label: "6–8",
    title: "Dilemma turns",
    desc: "Middle-school scenarios about identity, fairness, AI, and trust.",
    page: "thought-experiments/6-8",
    color: C.gold,
    textColor: C.gold,
    image: getFeatureIllustration("thought-experiments/6-8"),
  },
  {
    label: "9–12",
    title: "Canon remixed",
    desc: "Plato, Mary's Room, the Chinese Room, and current AI dilemmas.",
    page: "thought-experiments/9-12",
    color: C.sky,
    textColor: C.skyText,
    image: getFeatureIllustration("thought-experiments/9-12"),
  },
  {
    label: "Educators & PD",
    title: "Policy pressure",
    desc: "Adult scenarios for staff PD, leadership teams, and AI policy work.",
    page: "thought-experiments/educators",
    color: C.teal,
    textColor: C.tealText,
    image: getFeatureIllustration("thought-experiments/educators"),
  },
  {
    label: "Toolkit",
    title: "Run dialogue well",
    desc: "Norms, sentence stems, Socratic moves, and protocols.",
    page: "thought-experiments/toolkit",
    color: C.gold,
    textColor: C.gold,
    image: getFeatureIllustration("thought-experiments/toolkit"),
  },
  {
    label: "Journal",
    title: "Track reasoning",
    desc: "A private, browser-only decision journal with export.",
    page: "thought-experiments/journal",
    color: C.ocean,
    textColor: C.oceanText,
    image: getFeatureIllustration("thought-experiments/journal"),
  },
];

function RailRow({ item, navigate }) {
  const openPage = () => navigate(item.page);
  const imageSrc = typeof item.image === "string" ? item.image : item.image?.src;
  return (
    <m.div
      role="button"
      tabIndex={0}
      className="rail-row"
      style={{ "--accent": item.color, "--accent-text": item.textColor }}
      aria-label={`${item.label}: ${item.title}. ${item.desc}`}
      onClick={openPage}
      onKeyDown={(event) => handleCardKeyDown(event, openPage)}
      variants={fadeRise}
      whileHover={{ x: 4 }}
      whileFocus={{ x: 4 }}
      whileTap={{ scale: 0.995 }}
    >
      {imageSrc && (
        <span className="rail-thumb" aria-hidden="true">
          <img src={imageSrc} alt="" loading="lazy" decoding="async" />
        </span>
      )}
      <span className="rail-body">
        <span className="rail-label">{item.label}</span>
        <span className="rail-title">{item.title}</span>
        <span className="rail-desc">{item.desc}</span>
      </span>
      <span className="rail-arrow" aria-hidden="true">→</span>
    </m.div>
  );
}

export default function LibrarySection({ navigate }) {
  const openLibrary = () => navigate("thought-experiments");
  return (
    <section className="home-section alt" style={{ "--section-tint": "rgba(26,90,138,0.08)" }}>
      <div className="home-container">
        <SectionIntro
          index="03"
          kicker="The library"
          title="Thought experiments are the center of gravity"
        >
          The library turns AI ethics and philosophy into moments people can discuss: a story, a choice, a counterexample, and a better question.
        </SectionIntro>
        <div className="experience-layout">
          <m.div
            className="experience-feature"
            role="button"
            tabIndex={0}
            aria-label="Open the thought experiment library. Start with a dilemma, then let the reasoning unfold — choose by age band, run a staff scenario, open the toolkit, or keep a private record of how your thinking changes."
            onClick={openLibrary}
            onKeyDown={(event) => handleCardKeyDown(event, openLibrary)}
            variants={staggerGroup(0.1, 0.15)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            whileHover={{ y: -3 }}
            whileFocus={{ y: -3 }}
            whileTap={{ scale: 0.995 }}
          >
            <picture className="experience-feature-media" aria-hidden="true">
              <source type="image/webp" srcSet="/illustrations/classroom-crossroads.webp" />
              <img src="/illustrations/classroom-crossroads.png" alt="" loading="lazy" decoding="async" />
            </picture>
            <div className="experience-feature-scrim" aria-hidden="true" />
            <div className="experience-feature-copy">
              <m.p variants={fadeRise}>Interactive library</m.p>
              <m.h3 variants={fadeRise}>Start with a dilemma, then let the reasoning unfold.</m.h3>
              <m.p variants={fadeRise}>
                Choose by age band, run a staff scenario, open the toolkit, or keep a private record of how your thinking changes.
              </m.p>
              <m.span className="experience-feature-action" variants={fadeRise}>
                Open the library <span aria-hidden="true">→</span>
              </m.span>
            </div>
          </m.div>
          <m.div
            className="library-rail"
            variants={staggerGroup(STAGGER.tight)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {rail.map((item) => (
              <RailRow key={item.page} item={item} navigate={navigate} />
            ))}
          </m.div>
        </div>
      </div>
    </section>
  );
}
