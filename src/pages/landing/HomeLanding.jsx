import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import Home from "../home/index.jsx";
import { track } from "../../lib/analytics.js";
import { useMotionTier } from "./useMotionTier.js";
import { SKIP_LABEL } from "./sceneCopy.js";
import {
  LandingStyles,
  SceneVoid,
  SceneDilemma,
  SceneChoice,
  SceneLibrary,
  SceneDoorways,
  SceneTools,
  SceneHandoff,
} from "./LandingScenes.jsx";

const INTRO_SEEN_KEY = "examined-classroom:introSeen";

function introSeen() {
  try {
    return window.sessionStorage.getItem(INTRO_SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function markIntroSeen() {
  try {
    window.sessionStorage.setItem(INTRO_SEEN_KEY, "1");
  } catch {
    // private mode — replaying next visit is fine
  }
}

// "/" — the scroll-driven cinematic ("The Question") that hands off into the
// regular Home page. Three render modes:
//   cinematic — seven pinned scenes (engine + optional WebGL lazy-load on idle)
//   static    — designed normal-flow version (reduced motion, or enhancement
//               aborted/failed); scenes that duplicate Home content are omitted
//   skipped   — straight to Home (skip button, or intro already seen this session)
export default function HomeLanding({ navigate }) {
  const tier = useMotionTier();
  const [mode, setMode] = useState(() => {
    if (tier === "skip" || introSeen()) return "skipped";
    if (tier === "static") return "static";
    return "cinematic";
  });
  const [chosen, setChosen] = useState(null);
  // The dilemma gallery's images stay unmounted until the engine module has
  // loaded — lazy `loading` attributes don't stop Chrome from fetching
  // boxless (display:none) images, so deferral has to happen in React.
  const [wallReady, setWallReady] = useState(false);

  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const chosenBiasRef = useRef(0);
  const skipScrollRef = useRef(false);

  // Live demotion (reduced motion toggled mid-session).
  useEffect(() => {
    if (tier === "static") {
      setMode((m) => (m === "cinematic" ? "static" : m));
    }
  }, [tier]);

  // Chrome-free cinematic: hide TopBar + accent stripe and suppress the
  // newsletter modal while the intro owns the screen. Set synchronously so
  // the modal's deferred shouldShow() check sees it.
  useLayoutEffect(() => {
    if (mode !== "cinematic") return;
    document.documentElement.dataset.landingIntro = "1";
    return () => {
      delete document.documentElement.dataset.landingIntro;
    };
  }, [mode]);

  useEffect(() => {
    track("landing_tier", { tier, mode });
    // mode is intentionally omitted: one event per tier decision, not per transition.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tier]);

  // Lazy-load the scroll engine: first input or idle, whichever comes first.
  useEffect(() => {
    if (mode !== "cinematic") return;
    let cancelled = false;
    let started = false;
    let idleId = null;
    let usedIdleCallback = false;
    const events = ["scroll", "wheel", "pointerdown", "keydown", "touchstart"];

    const removeTriggers = () => {
      events.forEach((e) => window.removeEventListener(e, start));
      if (idleId !== null) {
        if (usedIdleCallback) window.cancelIdleCallback?.(idleId);
        else clearTimeout(idleId);
        idleId = null;
      }
    };

    const bailToStatic = () => {
      if (!cancelled) setMode("static");
    };

    function start() {
      if (started || cancelled) return;
      started = true;
      removeTriggers();
      import("./engine/initLandingEngine.js")
        .then((m) => {
          if (cancelled) return;
          // Visitor already read past scene 1 in the unenhanced layout —
          // pinning now would yank the page out from under them.
          if (window.scrollY > window.innerHeight * 0.6) {
            bailToStatic();
            return;
          }
          // Commit the gallery wall NOW so the engine's [data-gcol] queries
          // see it when the timeline is built one line below.
          flushSync(() => setWallReady(true));
          engineRef.current = m.initLandingEngine({
            root: rootRef.current,
            canvas: canvasRef.current,
            tier,
            onSceneEnter: (index, name) => track("landing_scene_view", { scene: index + 1, name }),
            onComplete: () => {
              markIntroSeen();
              track("landing_complete");
            },
          });
        })
        .catch(bailToStatic);
    }

    if (typeof window.requestIdleCallback === "function") {
      usedIdleCallback = true;
      idleId = window.requestIdleCallback(start, { timeout: 1800 });
    } else {
      idleId = setTimeout(start, 1200);
    }
    events.forEach((e) => window.addEventListener(e, start, { once: true, passive: true }));

    return () => {
      cancelled = true;
      removeTriggers();
      engineRef.current?.destroy();
      engineRef.current = null;
    };
  }, [mode, tier]);

  // Skip lands the visitor on the Home hero at the top of the page.
  // Passive effect on purpose: it must run AFTER the engine-loader effect's
  // cleanup has destroyed the pin (layout effects would scroll before the
  // pin spacer collapses, leaving a scroll-anchoring residue).
  useEffect(() => {
    if (mode === "skipped" && skipScrollRef.current) {
      skipScrollRef.current = false;
      // Explicit "auto": the global `html{scroll-behavior:smooth}` would
      // otherwise animate an 8-viewport jump.
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [mode]);

  const handleSkip = () => {
    track("landing_skip", { progress: Math.round((engineRef.current?.progress() ?? 0) * 100) });
    markIntroSeen();
    skipScrollRef.current = true;
    setMode("skipped"); // effect cleanup destroys the engine + pin
  };

  const handleChoose = (key) => {
    setChosen(key);
    chosenBiasRef.current = key === "a" ? -1 : 1;
    engineRef.current?.setChoiceBias(chosenBiasRef.current);
    track("landing_choice", { branch: key });
  };

  const handleHoverChoice = (bias) => {
    engineRef.current?.setChoiceBias(bias !== 0 ? bias : chosenBiasRef.current);
  };

  if (mode === "skipped") {
    // No landing scenes on screen, so the home hero keeps its own <h1>.
    return (
      <div style={{ paddingTop: 59 }}>
        <Home navigate={navigate} />
      </div>
    );
  }

  if (mode === "static") {
    return (
      <div className="landing" data-mode="static" style={{ paddingTop: 59 }}>
        <LandingStyles />
        <SceneVoid mode="static" />
        <SceneDilemma />
        <SceneLibrary mode="static" />
        <div id="home-content">
          <Home navigate={navigate} embedded />
        </div>
      </div>
    );
  }

  return (
    <div ref={rootRef} className="landing" data-mode="cinematic">
      <LandingStyles />
      {tier === "gl" && <canvas ref={canvasRef} className="landing-canvas" aria-hidden="true" />}
      {tier === "dom" && <div className="landing-backdrop" aria-hidden="true" />}
      <button type="button" className="landing-skip" onClick={handleSkip}>
        {SKIP_LABEL} <span aria-hidden="true">↓</span>
      </button>
      <div className="landing-scroll">
        <div className="landing-stage">
          <SceneVoid mode="cinematic" />
          <SceneDilemma wall={wallReady} />
          <SceneChoice chosen={chosen} onChoose={handleChoose} onHoverChoice={handleHoverChoice} />
          <SceneLibrary mode="cinematic" />
          <SceneDoorways />
          <SceneTools />
          <SceneHandoff />
        </div>
      </div>
      <div id="home-content">
        <Home navigate={navigate} embedded />
      </div>
    </div>
  );
}
