// Singleton <audio> element shared by every ReadAloudButton on the page so
// starting a new clip stops whatever was playing. Also exposed to ScenarioCard
// and the page wrappers so they can stop in-flight narration when the user
// advances stages, picks an answer, restarts, or backs out of an experiment.

let el = null;
const listeners = new Set();
const notify = (state) => listeners.forEach((fn) => fn(state));

const ensure = () => {
  if (el) return el;
  el = typeof Audio !== "undefined" ? new Audio() : null;
  if (el) {
    el.preload = "none";
    el.addEventListener("ended", () => notify({ type: "ended", src: el.src }));
    el.addEventListener("pause", () => notify({ type: "pause", src: el.src }));
    el.addEventListener("play", () => notify({ type: "play", src: el.src }));
    el.addEventListener("error", () => notify({ type: "error", src: el.src }));
  }
  return el;
};

export const audioBus = {
  play(src, onEnded) {
    const audio = ensure();
    if (!audio) return false;
    try {
      audio.pause();
      audio.src = src;
      audio.currentTime = 0;
      audio.onended = onEnded || null;
      const result = audio.play();
      if (result && typeof result.catch === "function") {
        result.catch(() => notify({ type: "error", src }));
      }
      return true;
    } catch {
      return false;
    }
  },
  stop() {
    if (!el) return;
    try { el.pause(); } catch { /* ignore */ }
    el.onended = null;
  },
  isPlaying() {
    return !!el && !el.paused;
  },
  currentSrc() {
    return el && !el.paused ? el.src : null;
  },
  subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
};
