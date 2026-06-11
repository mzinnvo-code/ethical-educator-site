import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Scene windows as fractions of the master scroll. Gaps between `out` and the
// next `in` are crossfade dead-zones so two scenes never fight for attention.
const SCENE_WINDOWS = [
  { name: "void", in: 0.0, out: 0.13 },
  { name: "dilemma", in: 0.165, out: 0.30 },
  { name: "choice", in: 0.335, out: 0.465 },
  { name: "library", in: 0.50, out: 0.61 },
  { name: "doorways", in: 0.645, out: 0.735 },
  { name: "tools", in: 0.77, out: 0.85 },
  { name: "handoff", in: 0.885, out: 1.0 },
];

const FADE = 0.035; // scene fade in/out length, in progress units
const TOPBAR_AT = 0.92; // progress where the site chrome returns

// dom-tier (and gl-fallback) backdrop moods — one gradient layer per scene.
const BACKDROP_MOODS = [
  "radial-gradient(58% 44% at 50% 62%, rgba(200,152,48,0.13), transparent 70%)",
  "radial-gradient(48% 42% at 18% 50%, rgba(26,138,122,0.14), transparent 70%), radial-gradient(48% 42% at 82% 50%, rgba(192,112,64,0.12), transparent 70%)",
  "radial-gradient(46% 44% at 26% 56%, rgba(224,184,72,0.13), transparent 70%), radial-gradient(46% 44% at 74% 56%, rgba(42,136,192,0.13), transparent 70%)",
  "radial-gradient(72% 56% at 50% 42%, rgba(42,136,192,0.10), transparent 72%), radial-gradient(34% 30% at 50% 70%, rgba(200,152,48,0.10), transparent 70%)",
  "linear-gradient(90deg, rgba(26,138,122,0.10), rgba(200,152,48,0.10) 34%, rgba(42,136,192,0.10) 66%, rgba(192,112,64,0.10))",
  "radial-gradient(62% 50% at 50% 50%, rgba(26,90,138,0.16), transparent 72%)",
  "radial-gradient(54% 46% at 50% 54%, rgba(200,152,48,0.16), transparent 70%)",
];

export function initLandingEngine({ root, canvas, tier, onSceneEnter, onComplete }) {
  if (!root) return { destroy() {}, setChoiceBias() {}, progress: () => 0 };

  let destroyed = false;
  let particles = null;
  let rendering = false;
  let completed = false;
  let lastProgress = 0;
  let topbarHidden = true;
  let activeScene = -1;
  const firedScenes = new Set();
  const biasProxy = { value: 0 };
  let createdBackdrop = null;

  const homeContent = root.querySelector("#home-content");
  const scenes = SCENE_WINDOWS.map((w) => root.querySelector(`[data-scene="${w.name}"]`));

  // Switch the stage into pinned/stacked layout before anything measures.
  root.classList.add("landing--live");

  const setIntroAttr = (on) => {
    if (on === topbarHidden) return;
    topbarHidden = on;
    if (on) document.documentElement.dataset.landingIntro = "1";
    else delete document.documentElement.dataset.landingIntro;
  };

  const setCanvasAlpha = (v) => {
    particles?.setGlobalAlpha(v);
  };

  const tick = (time) => {
    particles?.render(time);
  };

  const startRendering = () => {
    if (rendering || !particles || destroyed) return;
    rendering = true;
    if (canvas) canvas.style.display = "block";
    gsap.ticker.add(tick);
  };

  const stopRendering = (hideCanvas = false) => {
    if (!rendering) return;
    rendering = false;
    gsap.ticker.remove(tick);
    if (hideCanvas && canvas) canvas.style.display = "none";
  };

  const onVisibility = () => {
    if (document.hidden) stopRendering();
    else if (particles && lastProgress < 1) startRendering();
  };

  const onResize = () => {
    particles?.resize();
  };

  const buildBackdrop = () => {
    let host = root.querySelector(".landing-backdrop");
    if (!host) {
      host = document.createElement("div");
      host.className = "landing-backdrop";
      host.setAttribute("aria-hidden", "true");
      root.prepend(host);
      createdBackdrop = host;
    }
    return BACKDROP_MOODS.map((mood) => {
      const span = document.createElement("span");
      span.style.background = mood;
      host.appendChild(span);
      return span;
    });
  };

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: root.querySelector(".landing-scroll"),
        start: "top top",
        end: "bottom bottom",
        pin: root.querySelector(".landing-stage"),
        pinSpacing: false, // .landing-scroll already owns the full height
        scrub: 0.7,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate(self) {
          const p = self.progress;
          lastProgress = p;

          setIntroAttr(p < TOPBAR_AT);

          // Particle field follows master progress directly (scrub-direction proof).
          particles?.update(p);
          if (p >= 0.9) setCanvasAlpha(gsap.utils.mapRange(0.9, 1, 1, 0.35, p));
          else setCanvasAlpha(1);

          // Active scene → pointer events + first-forward-crossing analytics.
          let idx = -1;
          for (let i = 0; i < SCENE_WINDOWS.length; i++) {
            if (p >= SCENE_WINDOWS[i].in - FADE && p <= SCENE_WINDOWS[i].out + FADE) {
              idx = i;
              break;
            }
          }
          if (idx !== activeScene) {
            scenes.forEach((el, i) => el?.classList.toggle("is-active", i === idx));
            activeScene = idx;
          }
          if (idx >= 0 && !firedScenes.has(idx) && self.direction > 0) {
            firedScenes.add(idx);
            onSceneEnter?.(idx, SCENE_WINDOWS[idx].name);
          }
        },
        onLeave() {
          setIntroAttr(false);
          if (!completed) {
            completed = true;
            onComplete?.();
          }
        },
      },
    });

    if (import.meta.env?.DEV) {
      // Dev-only introspection for manual QA (e.g. timeline duration, scrub lag).
      window.__landingDebug = { tl, ScrollTrigger };
    }

    // Pin the duration to exactly 1 so position fractions map 1:1 onto
    // scroll progress (ScrollTrigger scrubs by *progress*; without this the
    // last tween's end time would rescale every placement).
    tl.set({}, {}, 1);

    // ---- Scene choreography ------------------------------------------------
    scenes.forEach((scene, i) => {
      if (!scene) return;
      const win = SCENE_WINDOWS[i];
      const reveals = scene.querySelectorAll(".lreveal");

      if (i === 0) {
        // Void is already visible at load; it only exits.
        gsap.set(scene, { autoAlpha: 1 });
        tl.to(scene, { autoAlpha: 0, y: -70, duration: FADE + 0.015 }, win.out - FADE);
      } else {
        // Enter at win.in, AFTER the previous scene's exit completes at
        // (prev.out + FADE) — stacked scenes double-expose if they crossfade.
        gsap.set(scene, { autoAlpha: 0 });
        tl.fromTo(scene, { autoAlpha: 0 }, { autoAlpha: 1, duration: FADE }, win.in);
        if (reveals.length) {
          tl.fromTo(
            reveals,
            { y: 44, opacity: 0 },
            { y: 0, opacity: 1, duration: FADE + 0.02, stagger: 0.008, ease: "power1.out" },
            win.in
          );
        }
        if (i < scenes.length - 1) {
          tl.to(scene, { autoAlpha: 0, y: -70, duration: FADE }, win.out);
        }
        // Handoff never fades — it rides up with the pin release into Home.
      }

      // Parallax depth layers (dilemma cards).
      scene.querySelectorAll("[data-depth]").forEach((el) => {
        const depth = parseFloat(el.dataset.depth) || 1;
        tl.fromTo(
          el,
          { y: 60 * depth },
          { y: -60 * depth, duration: win.out - win.in + FADE * 2 },
          win.in - FADE
        );
      });

      // Library stat counters, scrubbed so they run in both directions.
      if (win.name === "library") {
        scene.querySelectorAll("[data-count-to]").forEach((el) => {
          tl.to(
            el,
            { textContent: +el.dataset.countTo, snap: { textContent: 1 }, duration: 0.06 },
            win.in
          );
        });
      }
    });

    // ---- Atmosphere layer ---------------------------------------------------
    // dom tier gets the gradient backdrop immediately; gl tier gets it only if
    // the three.js chunk fails (so the narrative never plays on a flat void).
    const wantsBackdropNow = tier !== "gl";
    const attachBackdrop = () => {
      const layers = buildBackdrop();
      layers.forEach((layer, i) => {
        const win = SCENE_WINDOWS[i];
        if (i === 0) gsap.set(layer, { opacity: 1 });
        tl.fromTo(layer, { opacity: i === 0 ? 1 : 0 }, { opacity: 1, duration: FADE * 2 }, Math.max(0, win.in - FADE));
        tl.to(layer, { opacity: 0, duration: FADE * 2 }, win.out);
      });
    };
    if (wantsBackdropNow) attachBackdrop();

    // ---- Canvas fade over the rising Home hero ------------------------------
    if (homeContent) {
      ScrollTrigger.create({
        trigger: homeContent,
        start: "top bottom",
        end: "top 25%",
        scrub: true,
        onUpdate(self) {
          if (lastProgress >= 1) setCanvasAlpha(0.35 * (1 - self.progress));
        },
        onLeave() {
          stopRendering(true);
        },
        onEnterBack() {
          if (canvas) canvas.style.display = "block";
          if (particles) startRendering();
        },
      });
    }

    // ---- Particle field (gl tier, fully optional) ---------------------------
    if (tier === "gl" && canvas) {
      import("./particleScene.js")
        .then((m) => m.createParticleScene(canvas))
        .then((p) => {
          if (destroyed) {
            p.dispose();
            return;
          }
          particles = p;
          p.setChoiceBias(biasProxy.value);
          p.update(lastProgress);
          startRendering();
          gsap.to(canvas, { opacity: 1, duration: 1.6, ease: "power2.out" });
        })
        .catch(() => {
          if (!destroyed) attachBackdrop();
        });
    }
  }, root);

  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("resize", onResize);
  const refresh = () => {
    if (!destroyed) ScrollTrigger.refresh();
  };
  document.fonts?.ready?.then(refresh);
  window.addEventListener("load", refresh, { once: true });

  return {
    progress: () => lastProgress,

    setChoiceBias(value) {
      gsap.to(biasProxy, {
        value,
        duration: 0.9,
        ease: "power2.out",
        overwrite: "auto",
        onUpdate: () => particles?.setChoiceBias(biasProxy.value),
      });
    },

    destroy() {
      if (destroyed) return;
      destroyed = true;
      stopRendering();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", refresh);
      ctx.revert(); // kills the timeline + both ScrollTriggers, unpins
      particles?.dispose();
      particles = null;
      createdBackdrop?.remove();
      root.classList.remove("landing--live");
      // HomeLanding owns the data-landing-intro attribute lifecycle.
    },
  };
}
