import { m, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import { fadeRise, maskRiseLine, staggerGroup, usePointerFine, STAGGER } from "../../lib/motion.jsx";
import { EXPERIMENT_COUNT, TEACHER_KIT_COUNT, PROTOCOL_COUNT } from "../../data/siteStats.js";
import { HomeButton } from "./parts.jsx";

const PARALLAX_SPRING = { stiffness: 50, damping: 20, mass: 0.6 };

export default function Hero({ navigate, embedded = false }) {
  // Under the landing cinematic the page <h1> lives in the opening scene;
  // the hero demotes itself to keep the heading outline valid.
  const Heading = embedded ? "h2" : "h1";
  const reducedMotion = useReducedMotion();
  const pointerFine = usePointerFine();
  const parallaxOn = pointerFine && !reducedMotion;

  // Normalized cursor position (-0.5..0.5) relative to the hero, spring-damped.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, PARALLAX_SPRING);
  const sy = useSpring(my, PARALLAX_SPRING);
  // Orbs drift with the cursor, the image counter-moves — a depth illusion.
  const orbX = useTransform(sx, (v) => v * 36);
  const orbY = useTransform(sy, (v) => v * 26);
  const mediaX = useTransform(sx, (v) => v * -16);
  const mediaY = useTransform(sy, (v) => v * -10);

  // The hero is full-bleed, so viewport coordinates are equivalent to
  // hero-relative ones — and they can't go stale when the page scrolls
  // mid-hover the way a cached getBoundingClientRect would.
  const handleMouseMove = (event) => {
    mx.set(event.clientX / window.innerWidth - 0.5);
    my.set(event.clientY / window.innerHeight - 0.5);
  };
  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const scrollTo = (id) => {
    // An explicit "smooth" beats the global reduced-motion CSS override,
    // so this has to self-gate like every other JS-driven motion.
    document.getElementById(id)?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <section
      className="home-hero"
      onMouseMove={parallaxOn ? handleMouseMove : undefined}
      onMouseLeave={parallaxOn ? handleMouseLeave : undefined}
    >
      {/* LCP element — paints immediately, never opacity-animated. */}
      <m.div className="hero-media" aria-hidden="true" style={parallaxOn ? { x: mediaX, y: mediaY } : undefined}>
        <picture>
          <source type="image/webp" srcSet="/illustrations/home-hero.webp" />
          <img
            src="/illustrations/home-hero.png"
            alt=""
            loading="eager"
            decoding="async"
            fetchpriority="high"
          />
        </picture>
      </m.div>
      <div className="hero-scrim" aria-hidden="true" />
      <m.div className="hero-ambient" aria-hidden="true" style={parallaxOn ? { x: orbX, y: orbY } : undefined}>
        <span className="hero-orb hero-orb-1" />
        <span className="hero-orb hero-orb-2" />
        <span className="hero-dust">
          <span /><span /><span /><span /><span /><span />
        </span>
      </m.div>

      <div className="home-hero-inner">
        <m.div
          className="home-hero-content"
          variants={staggerGroup(0.12, 0.1)}
          initial="hidden"
          animate="show"
        >
          <m.p className="home-eyebrow" variants={fadeRise}>
            For teachers, school leaders, and families
          </m.p>
          <Heading>
            <span className="hero-line">
              <m.span className="hero-line-inner" variants={maskRiseLine}>Make AI ethics</m.span>
            </span>{" "}
            <span className="hero-line">
              <m.span className="hero-line-inner" variants={maskRiseLine}><em className="hero-accent-word">usable.</em></m.span>
            </span>
          </Heading>
          <m.p className="home-hero-copy" variants={fadeRise}>
            Classroom-ready thought experiments, lesson plans, and research-grounded philosophy —
            so the students in front of you learn to reason about AI, not just comply with it.
          </m.p>
          <m.div className="home-cta-row" variants={staggerGroup(STAGGER.tight, 0)}>
            <HomeButton onClick={() => scrollTo("role-doorways")}>Start with your role</HomeButton>
            <HomeButton variant="secondary" onClick={() => navigate("thought-experiments")}>Explore the thought experiments</HomeButton>
          </m.div>
          <m.p className="hero-proof" variants={fadeRise}>
            {EXPERIMENT_COUNT} thought experiments&ensp;·&ensp;{TEACHER_KIT_COUNT} teacher kits&ensp;·&ensp;{PROTOCOL_COUNT} discussion protocols&ensp;·&ensp;K–5 through adult PD
          </m.p>
        </m.div>
      </div>

      <m.button
        type="button"
        className="hero-scroll-cue"
        aria-label="Monday, 7:42 AM — scroll to try one question"
        onClick={() => scrollTo("one-question")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        <span className="hero-cue-stamp">Monday · 7:42 AM</span>
        <span className="hero-scroll-cue-chevron" aria-hidden="true">&#9662;</span>
      </m.button>
    </section>
  );
}
