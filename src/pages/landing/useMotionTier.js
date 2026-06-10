import { useEffect, useState } from "react";

// Decide how much of the landing cinematic this device/visitor should get.
//   "gl"     — full GSAP narrative + Three.js particle field
//   "dom"    — full GSAP narrative, gradient backdrop instead of WebGL
//   "static" — designed normal-flow page, nothing extra ever loads
//   "skip"   — debug override: behave as if the intro was already seen
export function detectTier() {
  if (typeof window === "undefined") return "static";

  try {
    const override = new URLSearchParams(window.location.search).get("landing");
    if (override === "static" || override === "dom" || override === "gl" || override === "skip") {
      return override;
    }
  } catch {
    // ignore malformed query strings
  }

  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return "static";

  const nav = window.navigator || {};
  if (nav.connection?.saveData) return "dom";
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 2) return "dom";

  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) return "dom";
  } catch {
    return "dom";
  }

  return "gl";
}

export function useMotionTier() {
  const [tier, setTier] = useState(detectTier);

  // Live demotion only: if the visitor turns on reduced motion mid-session,
  // drop to static. (We never promote mid-session — that would restart the
  // cinematic underneath someone who already started reading.)
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const onChange = () => {
      if (mq.matches) setTier("static");
    };
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  return tier;
}
