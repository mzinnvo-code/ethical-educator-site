import { useEffect, useRef } from "react";
import { track } from "../lib/analytics.js";

const MILESTONES = [25, 50, 75, 100];

// Fires scroll_depth events at 25/50/75/100% of document depth on the current
// page. Designed for long-form articles where scroll completion is a proxy for
// engagement. Pass a stable `pageKey` (slug) so a single session that visits
// several long-form pages reports milestones per page rather than once total.
export function useScrollDepth(pageKey, enabled = true) {
  const firedRef = useRef(new Set());

  useEffect(() => {
    if (!enabled || typeof window === "undefined" || !pageKey) return;
    firedRef.current = new Set();

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;
        const doc = document.documentElement;
        const scrollTop = window.scrollY || doc.scrollTop;
        const viewport = window.innerHeight || doc.clientHeight;
        const fullHeight = Math.max(doc.scrollHeight, doc.offsetHeight) - viewport;
        if (fullHeight <= 0) return;
        const pct = Math.min(100, Math.round((scrollTop / fullHeight) * 100));
        for (const m of MILESTONES) {
          if (pct >= m && !firedRef.current.has(m)) {
            firedRef.current.add(m);
            track("scroll_depth", { page: pageKey, milestone: m });
          }
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [pageKey, enabled]);
}
