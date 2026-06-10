import { useCallback, useEffect, useRef, useState } from "react";

// Full-screen iris wipe: a workshop-navy circle grows out of the door the
// student clicked, the room opens underneath, and the cover fades away.
// Reduced motion (or a missing origin) skips straight to the callback.
const COVER_MS = 440;
const REVEAL_MS = 300;

export default function useIrisTransition() {
  const [iris, setIris] = useState(null);
  const timersRef = useRef([]);

  useEffect(() => () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
  }, []);

  const run = useCallback((originEl, onCovered) => {
    if (typeof window === "undefined") {
      onCovered();
      return;
    }
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reducedMotion) {
      onCovered();
      return;
    }
    const rect = originEl?.getBoundingClientRect?.();
    const x = rect ? Math.round(rect.left + rect.width / 2) : Math.round(window.innerWidth / 2);
    const y = rect ? Math.round(rect.top + rect.height / 2) : Math.round(window.innerHeight / 2);
    setIris({ x, y, phase: "cover" });
    timersRef.current.push(window.setTimeout(() => {
      onCovered();
      setIris({ x, y, phase: "reveal" });
      timersRef.current.push(window.setTimeout(() => setIris(null), REVEAL_MS + 40));
    }, COVER_MS));
  }, []);

  return { iris, run };
}

export function IrisOverlay({ iris }) {
  if (!iris) return null;
  return (
    <div
      className={`wonder-iris wonder-iris-${iris.phase}`}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10500,
        pointerEvents: "none",
        background: "radial-gradient(circle at 50% 40%, #122740, #0b1622 70%)",
        "--iris-x": `${iris.x}px`,
        "--iris-y": `${iris.y}px`,
      }}
    >
      <style>{`
        @keyframes wonder-iris-cover {
          from { clip-path: circle(0px at var(--iris-x) var(--iris-y)); }
          to { clip-path: circle(150vmax at var(--iris-x) var(--iris-y)); }
        }
        @keyframes wonder-iris-reveal {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        .wonder-iris-cover {
          animation: wonder-iris-cover ${COVER_MS}ms steps(8, end) both;
        }
        .wonder-iris-reveal {
          animation: wonder-iris-reveal ${REVEAL_MS}ms steps(6, end) both;
        }
      `}</style>
    </div>
  );
}
