import { useCallback, useEffect, useState } from "react";
import {
  getEarnedBadges,
  getProgressSummary,
  readThoughtProgress,
  recordThoughtEvent,
  resetThoughtProgress,
  writeThoughtProgress,
} from "../lib/thoughtProgress.js";

const PROGRESS_EVENT = "examined-classroom:thought-progress";

function notifyProgressChanged() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(PROGRESS_EVENT));
}

export default function useThoughtProgress() {
  const [progress, setProgress] = useState(() => readThoughtProgress());

  useEffect(() => {
    const refresh = () => setProgress(readThoughtProgress());
    refresh();
    window.addEventListener(PROGRESS_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(PROGRESS_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const recordEvent = useCallback((event) => {
    setProgress((current) => {
      const next = recordThoughtEvent(current, event);
      writeThoughtProgress(next);
      return next;
    });
    notifyProgressChanged();
  }, []);

  const reset = useCallback(() => {
    const next = resetThoughtProgress();
    setProgress(next);
    notifyProgressChanged();
  }, []);

  return {
    progress,
    summary: getProgressSummary(progress),
    badges: getEarnedBadges(progress),
    recordEvent,
    reset,
  };
}

export function recordThoughtProgress(event) {
  const next = recordThoughtEvent(readThoughtProgress(), event);
  writeThoughtProgress(next);
  notifyProgressChanged();
  return next;
}
