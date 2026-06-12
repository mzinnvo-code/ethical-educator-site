import { useEffect, useState } from "react";

import { C } from "../../../theme.js";
import { GAMEFUL_RULES, GAMIFICATION_QUEST_ASSETS } from "../../../data/gamificationQuest.js";
import { PixelFrame } from "../../../components/wonder/PixelFrame.jsx";

const TIP_ROTATE_MS = 2600;

// Designed loading state for the Phaser stage: even the loader teaches one
// of the design rules, so the wait is a worked example instead of dead air.
export default function QuestLoadingScreen({ progress = 0, leaving = false, reduced = false }) {
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    if (reduced) return undefined;
    const timer = window.setInterval(() => {
      setTipIndex((index) => (index + 1) % GAMEFUL_RULES.length);
    }, TIP_ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [reduced]);

  const percent = Math.round(Math.max(0, Math.min(1, progress)) * 100);

  return (
    <div
      data-testid="gamification-loading-screen"
      className={`gamification-loading-screen ${leaving ? "is-leaving" : ""} ${reduced ? "is-reduced" : ""}`.trim()}
      role="status"
      aria-label={`Loading the Gameful Learning Lab, ${percent}% ready`}
    >
      <PixelFrame accent={C.gold} glow scanlines>
        <div className="gamification-loading-inner">
          <img src={GAMIFICATION_QUEST_ASSETS.ari.idle} alt="" aria-hidden="true" />
          <span className="gamification-loading-title">Opening the lab…</span>
          <div className="gamification-loading-bar" aria-hidden="true">
            <span style={{ width: `${percent}%` }} />
          </div>
          <p className="gamification-loading-tip" aria-hidden="true">
            <strong>{GAMEFUL_RULES[tipIndex].title}:</strong> {GAMEFUL_RULES[tipIndex].text}
          </p>
        </div>
      </PixelFrame>
    </div>
  );
}
