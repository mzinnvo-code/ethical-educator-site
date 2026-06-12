import { useEffect, useState } from "react";

// Single source of truth for the quest's prefers-reduced-motion signal so the
// game shell, door scene, and celebration overlays never disagree about it.
export default function useQuestReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);

  return reduced;
}
