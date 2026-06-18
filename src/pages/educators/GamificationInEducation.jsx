import { useEffect } from "react";
import { createPortal } from "react-dom";

import { C } from "../../theme.js";
import {
  GAMEFUL_BONUS_VIDEO,
  GAMEFUL_CHARTER,
  GAMEFUL_DO_TOMORROW,
  GAMEFUL_TAKEAWAYS,
  GAMIFICATION_GAME_LEVELS,
  GAMIFICATION_QUEST_SOURCES,
  GAMIFICATION_QUEST_STORAGE_KEY,
} from "../../data/gamificationQuest.js";
import { DoorScene, QuestStyles } from "./gamification/QuestComponents.jsx";
import GamificationGameExperience from "./gamification/GamificationGameExperience.jsx";
import useGamificationQuestProgress from "./gamification/useGamificationQuestProgress.js";
import { trackQuestEvent } from "./gamification/questAnalytics.js";

function CrawlableQuestFallback() {
  return (
    <section
      className="gamification-crawlable-fallback"
      aria-label="Gamification in Education transcript"
      style={{
        position: "absolute",
        width: 1,
        height: 1,
        margin: -1,
        padding: 0,
        overflow: "hidden",
        clip: "rect(0 0 0 0)",
        clipPath: "inset(50%)",
        whiteSpace: "nowrap",
        border: 0,
      }}
    >
      <h1>Gamification in Education</h1>
      <p>
        The upshot is simple: attention is now contested. Students have not
        simply lost attention biologically, but the learning environment now
        competes with faster rewards, constant novelty, notifications, and
        easier escape. Good gameful design earns attention so students stay
        with slower, harder learning long enough to revise, explain, and
        transfer what they know.
      </p>
      <p>
        Mark Rober is a useful supporting example for curiosity-first design,
        while The Anxious Generation, Daniel Willingham, King's College London,
        Candice Odgers, Self-Determination Theory, and gamification
        meta-analyses keep the claims careful and source-linked.
      </p>
      {GAMIFICATION_GAME_LEVELS.map((stage) => (
        <article key={stage.id}>
          <h2>{stage.title}</h2>
          {stage.dialogueBeats.map((line) => <p key={line}>{line}</p>)}
          {stage.keyDistinction && (
            <>
              <h3>{stage.keyDistinction.title}</h3>
              {stage.keyDistinction.items.map((item) => (
                <p key={item.term}>{item.term}: {item.definition}</p>
              ))}
              <p>{stage.keyDistinction.note}</p>
            </>
          )}
          {stage.cautionCard && (
            <>
              <h3>{stage.cautionCard.title}</h3>
              {stage.cautionCard.items.map((item) => (
                <p key={item.id}>{item.risk}: {item.text}</p>
              ))}
            </>
          )}
          {stage.evidenceSnapshot && (
            <>
              <h3>Evidence snapshot</h3>
              {stage.evidenceSnapshot.map((item) => (
                <p key={item.id}>{item.stat}. {item.caveat}</p>
              ))}
            </>
          )}
          {stage.pilotScorecard && (
            <>
              <h3>Did your pilot work?</h3>
              {stage.pilotScorecard.map((row) => (
                <p key={row.id}>{row.signal}. Look for: {row.lookFor} Red flag: {row.redFlag}</p>
              ))}
            </>
          )}
          {stage.lessonBlueprint && (
            <>
              <h3>{stage.lessonBlueprint.title}</h3>
              <p>{stage.lessonBlueprint.intro}</p>
              {stage.lessonBlueprint.steps.map((step) => (
                <p key={step.id}>{step.label}: {step.prompt}</p>
              ))}
            </>
          )}
          {stage.gradeBands && (
            <>
              <h3>In your classroom</h3>
              {Object.entries(stage.gradeBands).map(([band, text]) => (
                <p key={band}>Grades {band}: {text}</p>
              ))}
            </>
          )}
        </article>
      ))}
      <h2>Gameful Learning Charter</h2>
      <ul>
        {GAMEFUL_CHARTER.map((line) => <li key={line}>{line}</li>)}
      </ul>
      <h2>Bonus Mission: Watch and Reflect</h2>
      <p>
        After the charter, a bonus mission embeds {GAMEFUL_BONUS_VIDEO.speaker}'s
        {" "}{GAMEFUL_BONUS_VIDEO.event} talk, "{GAMEFUL_BONUS_VIDEO.title},"
        as the honest counterweight: gamification done well is mostly human and
        analog, and a screen should earn its place with evidence.
      </p>
      <h2>What you learned</h2>
      <ul>
        {GAMEFUL_TAKEAWAYS.map((item) => <li key={item.title}>{item.title}: {item.text}</li>)}
      </ul>
      <h2>Do this tomorrow</h2>
      <ul>
        {GAMEFUL_DO_TOMORROW.map((line) => <li key={line}>{line}</li>)}
      </ul>
      <h2>Sources</h2>
      <ul>
        {GAMIFICATION_QUEST_SOURCES.map((item) => (
          <li key={item.id}>
            <a href={item.href}>{item.label}: {item.title}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function GamificationInEducation({ navigate }) {
  const {
    progress,
    progressNotSaved,
    doorOpen,
    completedCount,
    totalChallenges,
    isNodeUnlocked,
    isNodeComplete,
    isWorldNodeClickable,
    nextPlayableNodeId,
    clickableWorldNodeIds,
    openDoorStep,
    enterGame,
    startLevel,
    returnToMap,
    completeLevel,
    toggleSound,
    toggleMusic,
    toggleNarration,
    setTextSpeed,
    setReducedMotion,
    setGradeBand,
    resetQuest,
  } = useGamificationQuestProgress();

  // Anonymous funnel beacons (same no-ids stance as the rest of the site):
  // arriving with prior progress counts as a resume; opening the door once
  // per session marks the top of the funnel.
  useEffect(() => {
    if ((progress.completedRoomIds?.length || 0) > 0) {
      trackQuestEvent("quest_resume", { slug: progress.currentWorldNodeId || "home" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEnterGame = () => {
    trackQuestEvent("quest_door_opened", { placement: "door" });
    enterGame();
  };

  const handleResetQuest = () => {
    trackQuestEvent("quest_reset", { slug: progress.currentRoomId || "home", once: false });
    resetQuest();
  };

  const leaveQuest = () => {
    if (navigate) {
      navigate("for-educators");
      return;
    }
    if (typeof window !== "undefined") window.location.assign("/for-educators");
  };

  const isDoorPhase = !doorOpen || progress.mode === "door" || progress.mode === "door-transition";

  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, []);

  const shell = (
    <main
      className="gamification-locked-shell"
      data-storage-key={GAMIFICATION_QUEST_STORAGE_KEY}
      aria-label="Gamification in Education playable quest"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1200,
        overflow: "hidden",
        background:
          `radial-gradient(circle at 30% 18%, ${C.teal}1c, transparent 32%), linear-gradient(180deg, ${C.bg}, ${C.midnight})`,
        color: C.textPrimary,
      }}
    >
      <QuestStyles />
      {isDoorPhase && (
      <button
        type="button"
        className="gamification-exit-quest"
        onClick={leaveQuest}
        style={{
          position: "fixed",
          top: "clamp(10px, 2vw, 18px)",
          left: "clamp(10px, 2vw, 18px)",
          zIndex: 30,
          border: `1px solid ${C.gold}66`,
          borderRadius: 8,
          padding: "8px 11px",
          color: C.textPrimary,
          background: "rgba(8,18,32,0.76)",
          boxShadow: "0 10px 26px rgba(0,0,0,0.28)",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.68rem",
          fontWeight: 900,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          cursor: "pointer",
        }}
      >
        Back to Educator Resources
      </button>
      )}
      {isDoorPhase ? (
        <DoorScene
          progress={progress}
          progressNotSaved={progressNotSaved}
          doorOpen={doorOpen}
          onStep={openDoorStep}
          onEnter={handleEnterGame}
        />
      ) : (
        <GamificationGameExperience
          progress={progress}
          completedCount={completedCount}
          totalChallenges={totalChallenges}
          isNodeUnlocked={isNodeUnlocked}
          isNodeComplete={isNodeComplete}
          isWorldNodeClickable={isWorldNodeClickable}
          nextPlayableNodeId={nextPlayableNodeId}
          clickableWorldNodeIds={clickableWorldNodeIds}
          startLevel={startLevel}
          returnToMap={returnToMap}
          completeLevel={completeLevel}
          toggleSound={toggleSound}
          toggleMusic={toggleMusic}
          toggleNarration={toggleNarration}
          setTextSpeed={setTextSpeed}
          setReducedMotion={setReducedMotion}
          setGradeBand={setGradeBand}
          resetQuest={handleResetQuest}
          onExit={leaveQuest}
          navigate={navigate}
        />
      )}
      <CrawlableQuestFallback />
    </main>
  );

  if (typeof document === "undefined") return shell;
  return createPortal(shell, document.body);
}
