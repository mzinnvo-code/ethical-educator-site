import { useEffect, useRef, useState } from "react";
import { m, useReducedMotion } from "motion/react";
import { useAudio } from "../../components/shared.jsx";
import { EXPERIMENT_COUNT } from "../../data/siteStats.js";
import { fadeRise, staggerGroup, VIEWPORT } from "../../lib/motion.jsx";
import { DEMO_DILEMMAS, DEMO_ROLES } from "./demoDilemmas.js";
import { SectionIntro, HomeButton } from "./parts.jsx";

const SOUND_KEY = "tec-home-sound";

function readSoundPref() {
  try {
    return localStorage.getItem(SOUND_KEY) !== "off";
  } catch {
    return true;
  }
}

const reveal = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function DilemmaSection({ navigate }) {
  const reducedMotion = useReducedMotion();
  const { playClick, playDeep } = useAudio();
  const [role, setRole] = useState("teacher");
  const [picked, setPicked] = useState(null);
  const [turnShown, setTurnShown] = useState(false);
  const [soundOn, setSoundOn] = useState(readSoundPref);
  const turnTimer = useRef(0);
  const optionsRef = useRef(null);
  // The turn fires from a timeout — read the live pref, not the closure's,
  // so muting during the beat actually mutes the turn sound.
  const soundOnRef = useRef(soundOn);
  soundOnRef.current = soundOn;

  const dilemma = DEMO_DILEMMAS[role];

  useEffect(() => () => clearTimeout(turnTimer.current), []);

  const switchRole = (next) => {
    if (next === role) return;
    clearTimeout(turnTimer.current);
    setRole(next);
    setPicked(null);
    setTurnShown(false);
  };

  const choose = (option) => {
    if (picked) return;
    setPicked(option);
    if (soundOnRef.current) playClick();
    // The counterexample lands after a beat — long enough to read the
    // reflection, short enough that the page clearly "argues back".
    turnTimer.current = setTimeout(() => {
      setTurnShown(true);
      if (soundOnRef.current) playDeep();
    }, reducedMotion ? 300 : 1400);
  };

  const replay = () => {
    clearTimeout(turnTimer.current);
    setPicked(null);
    setTurnShown(false);
    // The activated "Ask me again" button unmounts with the turn block;
    // hand focus back to the options so keyboard users keep their place.
    requestAnimationFrame(() => optionsRef.current?.querySelector("button")?.focus());
  };

  const toggleSound = () => {
    setSoundOn((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(SOUND_KEY, next ? "on" : "off");
      } catch { /* private mode */ }
      return next;
    });
  };

  return (
    <section id="one-question" className="home-section alt" style={{ "--section-tint": "rgba(26,138,122,0.07)" }}>
      <div className="home-container">
        <SectionIntro index="01" kicker="One question" title="Be argued with, not lectured." centered>
          Every experiment in the library works like this: a real decision, your call, and a
          counterexample that pushes back. Here is a twenty-second cut of one.
        </SectionIntro>

        <m.div
          className="dilemma-card"
          variants={staggerGroup(0.08, 0.05)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <m.div className="dilemma-topbar" variants={fadeRise}>
            <div className="dilemma-tabs" role="group" aria-label="Choose your perspective">
              {DEMO_ROLES.map((key) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={role === key}
                  className={`dilemma-tab${role === key ? " active" : ""}`}
                  onClick={() => switchRole(key)}
                >
                  {DEMO_DILEMMAS[key].chip}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="sound-toggle"
              aria-pressed={soundOn}
              onClick={toggleSound}
            >
              {soundOn && <span aria-hidden="true">♪ </span>}
              {soundOn ? "Sound on" : "Sound off"}
            </button>
          </m.div>

          <m.p className="dilemma-stamp" variants={fadeRise}>{dilemma.timestamp}</m.p>
          <m.h3 className="dilemma-title" variants={fadeRise}>{dilemma.title}</m.h3>
          <m.p className="dilemma-prompt" variants={fadeRise}>{dilemma.prompt}</m.p>

          <m.div className="dilemma-options" variants={fadeRise} ref={optionsRef}>
            {dilemma.options.map((option) => {
              const isPicked = picked?.label === option.label;
              const dimmed = Boolean(picked) && !isPicked;
              return (
                <button
                  key={option.label}
                  type="button"
                  className={`dilemma-option${isPicked ? " picked" : ""}${dimmed ? " dimmed" : ""}`}
                  aria-pressed={isPicked}
                  aria-disabled={dimmed}
                  onClick={() => choose(option)}
                >
                  <span className="dilemma-option-label" aria-hidden="true">{option.label}</span>
                  <span>{option.text}</span>
                </button>
              );
            })}
          </m.div>

          <div aria-live="polite">
            {picked && (
              <m.p
                key={`${role}-reflection`}
                className="dilemma-reflection"
                initial="hidden"
                animate="show"
                variants={reveal}
              >
                {picked.reflection}
              </m.p>
            )}
            {turnShown && (
              <m.div
                key={`${role}-turn`}
                className="dilemma-turn"
                initial="hidden"
                animate="show"
                variants={reveal}
              >
                <p className="dilemma-turn-stamp">{dilemma.turn.stamp} —</p>
                <p className="dilemma-turn-text">{dilemma.turn.text}</p>
              </m.div>
            )}
          </div>
          {turnShown && (
            <m.div
              className="dilemma-actions"
              initial="hidden"
              animate="show"
              variants={reveal}
            >
              <HomeButton onClick={() => navigate(dilemma.cta.page)}>{dilemma.cta.label}</HomeButton>
              <HomeButton variant="ghost" onClick={() => navigate("thought-experiments")}>
                Browse the full library
              </HomeButton>
              <button type="button" className="dilemma-replay" onClick={replay}>
                Ask me again
              </button>
            </m.div>
          )}

          <m.p className="dilemma-meta" variants={fadeRise}>
            One of {EXPERIMENT_COUNT} experiments in the library&ensp;·&ensp;{dilemma.reference}
          </m.p>
        </m.div>
      </div>
    </section>
  );
}
