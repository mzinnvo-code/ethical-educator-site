import { useEffect, useRef, useState } from "react";
import { C } from "../../theme.js";
import { TRACKER_THEMES } from "./trackerThemes.js";
import {
  PROGRESS_ROOM_ARI_INVITE_ASSETS,
  PROGRESS_ROOM_ARI_INVITE_FRAMES,
  PROGRESS_ROOM_ARI_INVITE_SEQUENCE,
} from "../../data/deepfakeGameAssets.js";

// Ari's animated portrait: cycles through the 36-frame invite sequence
// (idle / blink / wave / point) and stays on the first frame under
// prefers-reduced-motion. Anchored as a portrait, never a floating sprite.
export default function AnimatedAriInvite({ theme = TRACKER_THEMES.middle, size = 86 }) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef(null);
  const offscreenRef = useRef(false);
  const sequence = theme.assets?.ariSequence || PROGRESS_ROOM_ARI_INVITE_SEQUENCE;
  const ariFrames = theme.assets?.ariFrames || PROGRESS_ROOM_ARI_INVITE_FRAMES;
  const ariAssets = theme.assets?.ariAssets || PROGRESS_ROOM_ARI_INVITE_ASSETS;
  const sequenceStep = sequence[activeStepIndex] || sequence[0];
  const activeFrameIndex = sequenceStep?.frame || 0;
  const activeFrame = ariFrames[activeFrameIndex] || ariAssets.idle1;

  // 36 frames at ~5fps is cheap, but not free: stop the timer entirely when
  // the tab is hidden or Ari has scrolled offscreen, and resume on return.
  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    const sync = () => setPaused(document.hidden || offscreenRef.current);
    document.addEventListener("visibilitychange", sync);
    let observer = null;
    if (typeof IntersectionObserver !== "undefined" && containerRef.current) {
      observer = new IntersectionObserver((entries) => {
        offscreenRef.current = !entries[0]?.isIntersecting;
        sync();
      });
      observer.observe(containerRef.current);
    }
    return () => {
      document.removeEventListener("visibilitychange", sync);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (query.matches) {
      setActiveStepIndex(0);
      return undefined;
    }
    if (paused) return undefined;
    const timer = window.setTimeout(() => {
      setActiveStepIndex((index) => (index + 1) % sequence.length);
    }, sequenceStep.holdMs);
    return () => window.clearTimeout(timer);
  }, [activeStepIndex, sequenceStep.holdMs, sequence.length, paused]);

  return (
    <div
      ref={containerRef}
      className="progress-room-ari-invite-frame"
      aria-hidden="true"
      style={{
        width: size,
        aspectRatio: "1 / 1",
        flexShrink: 0,
        borderRadius: 8,
        border: `2px solid ${C.gold}66`,
        background: "radial-gradient(circle at 50% 30%, rgba(44,211,200,0.18), rgba(5,12,24,0.76) 60%), linear-gradient(180deg, rgba(13,28,45,0.9), rgba(4,11,22,0.96))",
        overflow: "hidden",
        display: "block",
        boxShadow: `0 0 22px ${C.gold}20, inset 0 0 0 1px rgba(255,255,255,0.05)`,
        position: "relative",
      }}
    >
      <span
        className="progress-room-key-glint"
        style={{
          position: "absolute",
          right: 9,
          top: 13,
          width: 8,
          height: 8,
          borderRadius: 2,
          background: C.gold,
          boxShadow: `0 0 14px ${C.gold}`,
          transform: "rotate(45deg)",
          zIndex: 4,
        }}
      />
      <img
        className="progress-room-ari-invite-sprite progress-room-ari-invite-idle-1"
        src={activeFrame}
        alt=""
        data-frame-index={activeFrameIndex}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          objectPosition: "center bottom",
          imageRendering: "pixelated",
          zIndex: 1,
        }}
      />
      <span
        className="progress-room-ari-portrait-shadow"
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "16%",
          right: "16%",
          bottom: 10,
          height: 8,
          borderRadius: "50%",
          background: "rgba(0,0,0,0.34)",
          filter: "blur(1px)",
          zIndex: 2,
        }}
      />
      <span
        className="progress-room-ari-portrait-base"
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 5,
          right: 5,
          bottom: 5,
          height: 10,
          borderRadius: 4,
          border: `1px solid ${C.gold}44`,
          background: `linear-gradient(180deg, ${C.gold}28, rgba(5,12,24,0.94))`,
          boxShadow: `0 -4px 12px rgba(5,12,24,0.5), 0 0 10px ${C.gold}16`,
          zIndex: 3,
        }}
      />
    </div>
  );
}
