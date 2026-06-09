import { useEffect, useRef } from "react";

// Warm bitmap art before it's needed so the Ari animation and the workshop
// entrance never pop in frame-by-frame. Runs at idle priority and caps
// concurrency so it never competes with page content.
const warmedUrls = new Set();
const MAX_CONCURRENT = 6;

function warm(urls) {
  if (typeof window === "undefined" || typeof Image === "undefined") return;
  const queue = urls.filter((url) => url && !warmedUrls.has(url));
  let active = 0;
  const next = () => {
    if (!queue.length || active >= MAX_CONCURRENT) return;
    const url = queue.shift();
    warmedUrls.add(url);
    active += 1;
    const img = new Image();
    img.onload = img.onerror = () => {
      active -= 1;
      next();
    };
    img.src = url;
    next();
  };
  next();
}

function onIdle(callback) {
  if (typeof window === "undefined") return () => {};
  if (window.requestIdleCallback) {
    const id = window.requestIdleCallback(callback, { timeout: 2500 });
    return () => window.cancelIdleCallback(id);
  }
  const id = window.setTimeout(callback, 600);
  return () => window.clearTimeout(id);
}

// `initial` warms shortly after mount (idle); the returned `warmRest`
// callback warms the remainder on an intent signal like door hover/focus.
export default function useImagePreload(initial = [], rest = []) {
  const restRef = useRef(rest);
  restRef.current = rest;

  useEffect(() => {
    const cancel = onIdle(() => warm(initial));
    return cancel;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return () => warm(restRef.current);
}
