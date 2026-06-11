import { useState, useEffect } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

// Shared motion vocabulary for the home page. Durations, easings, and spring
// configs live here so every section speaks the same motion language.

export const EASE_OUT = [0.22, 1, 0.36, 1];

export const SPRING_SOFT = { type: "spring", stiffness: 220, damping: 28, mass: 0.9 };
export const SPRING_SNAPPY = { type: "spring", stiffness: 420, damping: 30 };

export const DUR = { fast: 0.3, base: 0.6, slow: 0.9 };
export const STAGGER = { tight: 0.06, base: 0.09 };

// Once-only reveals; the -60px bottom margin delays the trigger until the
// element is solidly on screen, so the animation is actually seen.
export const VIEWPORT = { once: true, amount: 0.25, margin: "0px 0px -60px 0px" };

export const fadeRise = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: SPRING_SOFT },
};

export const staggerGroup = (stagger = STAGGER.base, delayChildren = 0.05) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

// For headline lines inside an overflow:hidden wrapper.
export const maskRiseLine = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.8, ease: EASE_OUT } },
};

// Accent rules / underlines. Pair with transformOrigin left (or center).
export const drawLine = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.7, ease: EASE_OUT } },
};

// True only for mouse-like pointers that can hover — gates mouse parallax
// and spotlight effects off touch devices.
export function usePointerFine() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (hover: hover)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return fine;
}

// MotionConfig reducedMotion="user" makes transform animations snap to their
// final state for prefers-reduced-motion users (opacity fades remain). The
// global CSS override in App.jsx cannot reach Framer Motion's inline styles,
// so this gate is load-bearing — do not remove it.
export function MotionProvider({ children }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
