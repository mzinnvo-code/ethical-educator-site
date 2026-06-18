import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  GAMIFICATION_GAME_ROOMS,
  GAMIFICATION_PHASER_ASSETS,
  GAMIFICATION_WORLD_MAP,
  source,
} from "../../../data/gamificationQuest.js";
import useIrisTransition, { IrisOverlay } from "../../../components/wonder/useIrisTransition.jsx";
import { createGamefulLearningScene } from "./phaser/GamefulLearningScene.js";
import { gameStyles } from "./questStyles.js";
import { playQuestSound, questMusic } from "./questAudio.js";
import { trackQuestEvent } from "./questAnalytics.js";
import useQuestReducedMotion from "./useQuestReducedMotion.js";
import QuestCelebrationOverlay from "./QuestCelebrationOverlay.jsx";
import QuestHud from "./QuestHud.jsx";
import QuestLoadingScreen from "./QuestLoadingScreen.jsx";
import RoomOverlay from "./RoomOverlay.jsx";
import BonusMissionOverlay from "./BonusMissionOverlay.jsx";

const LOADER_MIN_VISIBLE_MS = 400;
const LOADER_FADE_MS = 280;

function GamificationPhaserGame({
  room,
  mode,
  progress,
  assets,
  worldMap,
  clickableWorldNodeIds,
  travelTargetNodeId,
  reducedMotion,
  ariTalking,
  onWorldNodeClick,
  onTravelComplete,
  onSoundCue,
  onReady,
}) {
  const parentRef = useRef(null);
  const gameRef = useRef(null);
  const sceneRef = useRef(null);
  const mountedAtRef = useRef(0);
  const onReadyRef = useRef(onReady);
  const [sceneReady, setSceneReady] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loaderPhase, setLoaderPhase] = useState("loading");
  const callbacksRef = useRef({ onWorldNodeClick, onTravelComplete, onSoundCue });
  const initialStateRef = useRef(null);
  initialStateRef.current = { room, mode, progress, clickableWorldNodeIds, reducedMotion };

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    callbacksRef.current = {
      onWorldNodeClick,
      onTravelComplete,
      onSoundCue,
      onLoadProgress: (value) => {
        setLoadProgress((current) => Math.max(current, 0.3 + value * 0.7));
      },
    };
  }, [onSoundCue, onTravelComplete, onWorldNodeClick]);

  useEffect(() => {
    let cancelled = false;
    mountedAtRef.current = Date.now();

    async function mountGame() {
      if (!parentRef.current || gameRef.current || typeof window === "undefined") return;
      setLoadError(false);
      const phaserModule = await import("phaser");
      if (cancelled) return;
      const Phaser = phaserModule.default || phaserModule;
      setLoadProgress((current) => Math.max(current, 0.3));
      const initial = initialStateRef.current;

      const SceneClass = createGamefulLearningScene(Phaser, {
        assets,
        worldMap,
        callbacksRef,
        initial,
        onSceneReady: (scene) => {
          if (cancelled) return;
          sceneRef.current = scene;
          setLoadProgress(1);
          setSceneReady(true);
          onReadyRef.current?.();
        },
      });

      gameRef.current = new Phaser.Game({
        type: Phaser.AUTO,
        parent: parentRef.current,
        width: assets.canvas.width,
        height: assets.canvas.height,
        backgroundColor: "#07111f",
        pixelArt: true,
        roundPixels: true,
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.NO_CENTER,
          // Integer-rounded scale dimensions keep pixel art crisp on 2x displays.
          autoRound: true,
        },
        scene: SceneClass,
      });
    }

    mountGame().catch(() => {
      if (!cancelled) setLoadError(true);
    });

    return () => {
      cancelled = true;
      sceneRef.current = null;
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, []);

  // Keep the loader up for a beat even on instant loads, then step-fade it out.
  useEffect(() => {
    if (!sceneReady) return undefined;
    const elapsed = Date.now() - mountedAtRef.current;
    const delay = Math.max(0, LOADER_MIN_VISIBLE_MS - elapsed);
    const leaveTimer = window.setTimeout(() => setLoaderPhase("leaving"), delay);
    const doneTimer = window.setTimeout(() => setLoaderPhase("done"), delay + LOADER_FADE_MS);
    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(doneTimer);
    };
  }, [sceneReady]);

  useEffect(() => {
    sceneRef.current?.setGameState({
      room,
      mode,
      progress,
      clickableWorldNodeIds,
      reducedMotion,
    });
  }, [
    clickableWorldNodeIds?.join("|"),
    mode,
    progress.currentWorldNodeId,
    progress.completedRoomIds?.join("|"),
    progress.unlockedRoomIds?.join("|"),
    reducedMotion,
    room?.id,
    sceneReady,
  ]);

  useEffect(() => {
    if (!travelTargetNodeId) return;
    sceneRef.current?.travelToNode(travelTargetNodeId);
  }, [sceneReady, travelTargetNodeId]);

  useEffect(() => {
    sceneRef.current?.setAriTalking(ariTalking);
  }, [ariTalking, sceneReady]);

  if (loadError) {
    return (
      <div
        ref={parentRef}
        data-testid="gamification-phaser-stage"
        className="gamification-phaser-stage gamification-phaser-fallback"
        role="status"
      >
        <div>
          <strong>Basic Journey Mode</strong>
          <span>The animated game engine did not load, but the quest text and classroom moves remain available in the interface.</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        ref={parentRef}
        data-testid="gamification-phaser-stage"
        className="gamification-phaser-stage"
        aria-hidden="true"
      />
      {loaderPhase !== "done" && (
        <QuestLoadingScreen
          progress={loadProgress}
          leaving={loaderPhase === "leaving"}
          reduced={reducedMotion}
        />
      )}
    </>
  );
}

function OverworldTicker({
  rooms,
  progress,
  nextPlayableNodeId,
  clickableWorldNodeIds,
  travelTargetNodeId,
  dimmed,
  reduced,
  onStartRoom,
}) {
  const playableRooms = rooms.filter((room) => room.kind !== "home");
  const traveling = Boolean(travelTargetNodeId);
  const nodeLabel = (id) => GAMIFICATION_WORLD_MAP.nodes.find((node) => node.id === id)?.label || "";
  const completedCount = progress.completedRoomIds?.length || 0;
  const allComplete = !nextPlayableNodeId && completedCount >= playableRooms.length;

  const statusLabel = traveling ? "Traveling" : nextPlayableNodeId ? "Next stop" : "Journey Path";
  const statusText = traveling
    ? `Walking to ${nodeLabel(travelTargetNodeId)}…`
    : nextPlayableNodeId
      ? `${nodeLabel(nextPlayableNodeId)} — click the glowing marker`
      : allComplete
        ? "All stops complete — the Charter is yours"
        : "Choose a lit stop to revisit";

  return (
    <div
      className="gamification-overworld-prompt"
      data-dimmed={dimmed && !traveling ? "true" : "false"}
      data-reduced={reduced ? "true" : "false"}
      aria-label="Journey Path status"
    >
      {traveling && <span className="gamification-ticker-ari" aria-hidden="true" />}
      <span>{statusLabel}</span>
      <strong aria-live="polite">{statusText}</strong>
      <div className="gamification-sr-controls" aria-label="Travel to a stop">
        {playableRooms.map((room) => (
          <button
            key={room.id}
            type="button"
            aria-label={`Travel to ${nodeLabel(room.id)}`}
            title={`Travel to ${nodeLabel(room.id)}`}
            disabled={!clickableWorldNodeIds.includes(room.id) || traveling}
            onClick={() => onStartRoom(room.id)}
          >
            {nodeLabel(room.id)}
          </button>
        ))}
      </div>
    </div>
  );
}

function TeacherTranscript({ rooms, show }) {
  const [open, setOpen] = useState(false);
  if (!show) return null;
  // Lazy-mount the (large) transcript body: nine rooms of beats only enter
  // the DOM once the drawer is actually opened.
  return (
    <details
      className="gamification-teacher-transcript"
      open={open}
      onToggle={(event) => setOpen(event.target.open)}
    >
      <summary>Teacher transcript and sources</summary>
      {open && rooms.filter((room) => room.kind !== "home").map((room) => (
        <article key={room.id}>
          <h2>{room.title}</h2>
          {(room.dialogueBeats || []).map((line) => <p key={line}>{line}</p>)}
          <p><strong>Teacher transfer:</strong> {room.teacherTransfer}</p>
          {(room.sourceIds || []).length > 0 && (
            <p>
              Sources: {(room.sourceIds || []).map(source).filter(Boolean).map((item, index, array) => (
                <span key={item.id}>
                  <a href={item.href} target="_blank" rel="noreferrer">{item.label}</a>{index < array.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
          )}
        </article>
      ))}
    </details>
  );
}

export default function GamificationGameExperience({
  progress,
  progressNotSaved = false,
  completedCount,
  totalChallenges,
  stages = GAMIFICATION_GAME_ROOMS,
  isNodeUnlocked,
  isNodeComplete,
  isWorldNodeClickable,
  nextPlayableNodeId,
  clickableWorldNodeIds = [],
  startLevel,
  returnToMap,
  completeLevel,
  toggleSound,
  toggleMusic,
  setTextSpeed,
  setReducedMotion,
  setGradeBand,
  resetQuest,
  onExit,
  navigate,
}) {
  const prefersReducedMotion = useQuestReducedMotion();
  const reduced = prefersReducedMotion || progress.reducedMotion;
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [dialogueComplete, setDialogueComplete] = useState(false);
  const [forceReveal, setForceReveal] = useState(false);
  const [replayToken, setReplayToken] = useState(0);
  const [travelTargetNodeId, setTravelTargetNodeId] = useState(null);
  const [ariTalking, setAriTalking] = useState(false);
  const [tickerDimmed, setTickerDimmed] = useState(false);
  const [celebration, setCelebration] = useState(null);
  const [bonusOpen, setBonusOpen] = useState(false);
  const [saveToast, setSaveToast] = useState(false);
  const travelFallbackRef = useRef(null);
  const tickerDimTimerRef = useRef(null);
  const stageWrapRef = useRef(null);
  const dialogueCompleteRef = useRef(false);
  const roomRef = useRef(null);
  const progressModeRef = useRef(progress.mode);
  // Celebrations fire only on a genuine completion-count increase, never on
  // mount, resume, or StrictMode replays (the same guard useCelebration uses).
  const prevCompletedCountRef = useRef(progress.completedRoomIds?.length ?? 0);
  const celebrationTimerRef = useRef(null);
  const toastTimerRef = useRef(null);
  const wrongAttemptsRef = useRef(0);
  const { iris, run: runIris } = useIrisTransition();
  const room = useMemo(() => {
    if (progress.mode === "overworld") return stages.find((item) => item.id === "home") || stages[0];
    return stages.find((item) => item.id === progress.activeRoomId) || stages.find((item) => item.id === progress.currentRoomId) || stages[0];
  }, [progress.activeRoomId, progress.currentRoomId, progress.mode, stages]);
  const complete = room?.kind !== "home" && isNodeComplete(room.id);
  const inRoomMode = progress.mode === "room" || progress.mode === "reward" || progress.mode === "finale";

  useEffect(() => {
    setDialogueIndex(0);
    wrongAttemptsRef.current = 0;
  }, [room?.id]);

  // Ambient music: the overworld and rooms carry different loops, the volume
  // ducks while Ari talks, and an autoplay block quietly retries on the next
  // user gesture. Stops entirely when the quest unmounts.
  const musicOn = !progress.musicMuted && questMusic.available();
  const inOverworld = progress.mode === "overworld";
  useEffect(() => {
    if (!musicOn) {
      questMusic.stop();
      return undefined;
    }
    const track = inOverworld ? "quest-theme" : "room-theme";
    const start = () => questMusic.play(track, { volume: 0.18 });
    start();
    window.addEventListener("pointerdown", start, { once: true });
    return () => window.removeEventListener("pointerdown", start);
  }, [inOverworld, musicOn]);

  useEffect(() => {
    if (musicOn) questMusic.setVolume(ariTalking ? 0.07 : 0.18);
  }, [ariTalking, musicOn]);

  useEffect(() => () => questMusic.stop(), []);

  useEffect(() => {
    setDialogueComplete(false);
    setForceReveal(false);
  }, [dialogueIndex, room?.id]);

  useEffect(() => {
    if (progress.mode !== "overworld") setTravelTargetNodeId(null);
    if (progress.mode === "overworld" || progress.mode === "reward" || progress.mode === "finale") setAriTalking(false);
  }, [progress.mode]);

  const clearTravelFallback = useCallback(() => {
    if (travelFallbackRef.current) {
      window.clearTimeout(travelFallbackRef.current);
      travelFallbackRef.current = null;
    }
  }, []);

  useEffect(() => () => {
    clearTravelFallback();
    if (tickerDimTimerRef.current) window.clearTimeout(tickerDimTimerRef.current);
    if (celebrationTimerRef.current) window.clearTimeout(celebrationTimerRef.current);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
  }, [clearTravelFallback]);

  useEffect(() => {
    const count = progress.completedRoomIds?.length || 0;
    const previous = prevCompletedCountRef.current;
    prevCompletedCountRef.current = count;
    if (count <= previous) return;
    const completedId = progress.activeRoomId || progress.currentRoomId;
    const completedRoom = stages.find((item) => item.id === completedId);
    if (!completedRoom || completedRoom.kind === "home") return;
    const payload = completedRoom.id === "finale"
      ? { variant: "finale", fresh: true }
      : { variant: "badge", roomId: completedRoom.id, fresh: true };
    if (celebrationTimerRef.current) window.clearTimeout(celebrationTimerRef.current);
    // Give the badge-collect jingle and the camera beat a moment to land first.
    celebrationTimerRef.current = window.setTimeout(
      () => setCelebration(payload),
      reduced ? 0 : 380,
    );
  }, [progress.activeRoomId, progress.completedRoomIds?.length, progress.currentRoomId, reduced, stages]);

  const celebrationRef = useRef(null);
  celebrationRef.current = celebration;

  const closeCelebration = useCallback(() => {
    const wasFresh = celebrationRef.current?.fresh;
    setCelebration(null);
    // The save toast belongs to a genuine completion, not a replayed celebration.
    if (!wasFresh) return;
    setSaveToast(true);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setSaveToast(false), 1800);
  }, []);

  const handleStartRoom = useCallback((roomId) => {
    const clickable = typeof isWorldNodeClickable === "function"
      ? isWorldNodeClickable(roomId)
      : clickableWorldNodeIds.includes(roomId);
    if (!clickable) {
      playQuestSound("error", progress.soundMuted);
      return;
    }
    playQuestSound("node-select", progress.soundMuted);
    clearTravelFallback();
    setTravelTargetNodeId(roomId);
    travelFallbackRef.current = window.setTimeout(() => {
      setTravelTargetNodeId(null);
      trackQuestEvent("quest_room_start", { placement: "travel-fallback", slug: roomId });
      startLevel(roomId);
    }, reduced ? 450 : 5400);
  }, [clearTravelFallback, clickableWorldNodeIds, isWorldNodeClickable, progress.soundMuted, reduced, startLevel]);

  const handleTravelComplete = useCallback((roomId) => {
    clearTravelFallback();
    setTravelTargetNodeId(null);
    trackQuestEvent("quest_room_start", { placement: "travel", slug: roomId });
    runIris(stageWrapRef.current, () => startLevel(roomId));
  }, [clearTravelFallback, runIris, startLevel]);

  const handleComplete = useCallback((roomId) => {
    completeLevel(roomId);
    playQuestSound(roomId === "finale" ? "finale" : "badge-collect", progress.soundMuted);
    if (roomId === "finale") {
      trackQuestEvent("quest_finale_complete", { slug: "finale" });
    } else {
      trackQuestEvent("quest_room_complete", {
        slug: roomId,
        placement: wrongAttemptsRef.current > 0 ? "retry" : "first-try",
      });
    }
  }, [completeLevel, progress.soundMuted]);

  const handleWrongAnswer = useCallback(() => {
    wrongAttemptsRef.current += 1;
  }, []);

  const handleReturnToJourneyPath = useCallback(() => {
    playQuestSound("return-gate", progress.soundMuted);
    runIris(stageWrapRef.current, () => {
      playQuestSound("unlock", progress.soundMuted);
      returnToMap();
    });
  }, [progress.soundMuted, returnToMap, runIris]);

  const handleSoundCue = useCallback((cue) => {
    playQuestSound(cue, progress.soundMuted);
  }, [progress.soundMuted]);

  const handleNavigateDeepfake = () => {
    navigate?.("thought-experiments/6-8?experiment=deepfake-election");
  };

  const handleOpenBonus = useCallback(() => {
    trackQuestEvent("quest_bonus_open", { placement: "finale" });
    playQuestSound("unlock", progress.soundMuted);
    setBonusOpen(true);
  }, [progress.soundMuted]);

  const advanceDialogue = useCallback(() => {
    if (!dialogueCompleteRef.current) {
      setForceReveal(true);
      return;
    }
    const beatCount = roomRef.current?.dialogueBeats?.length || 1;
    setDialogueIndex((index) => Math.min(index + 1, beatCount - 1));
  }, []);

  const previousDialogue = useCallback(() => {
    setDialogueIndex((index) => Math.max(index - 1, 0));
  }, []);

  const replayDialogue = useCallback(() => {
    setForceReveal(false);
    setDialogueComplete(false);
    setReplayToken((token) => token + 1);
  }, []);

  dialogueCompleteRef.current = dialogueComplete;
  roomRef.current = room;
  progressModeRef.current = progress.mode;

  // JRPG-standard input: Space/Enter/→ advance (revealing first if mid-type),
  // ← steps back. Never hijacks keys aimed at buttons, links, or the drawer.
  useEffect(() => {
    if (!inRoomMode || typeof window === "undefined") return undefined;
    const onKey = (event) => {
      if (event.defaultPrevented) return;
      const target = event.target;
      if (target?.closest?.("button, a, input, textarea, select, summary, [contenteditable='true']")) return;
      if (event.key === " " || event.key === "Enter" || event.key === "ArrowRight") {
        event.preventDefault();
        advanceDialogue();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        previousDialogue();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advanceDialogue, inRoomMode, previousDialogue]);

  const handleStagePointerDown = useCallback(() => {
    if (progressModeRef.current !== "overworld") return;
    setTickerDimmed(true);
    if (tickerDimTimerRef.current) window.clearTimeout(tickerDimTimerRef.current);
    tickerDimTimerRef.current = window.setTimeout(() => setTickerDimmed(false), 1200);
  }, []);

  const locationLabel = useMemo(() => {
    if (progress.mode === "overworld") {
      const node = GAMIFICATION_WORLD_MAP.nodes.find((item) => item.id === (progress.currentWorldNodeId || "home"));
      return !node || node.kind === "home" ? "Journey Path — Home Base" : `Journey Path · ${node.label}`;
    }
    if (room.id === "finale") return "Stop 9 — Reward Hall";
    const playable = stages.filter((item) => item.kind !== "home");
    const index = playable.findIndex((item) => item.id === room.id);
    return index >= 0 ? `Stop ${index + 1} — ${room.label}` : room.label;
  }, [progress.mode, progress.currentWorldNodeId, room, stages]);

  return (
    <section
      data-testid="gamification-game-frame"
      className="gamification-phaser-shell"
      aria-label="Gameful Learning Lab Phaser quest"
    >
      <style>{gameStyles}</style>
      <div
        ref={stageWrapRef}
        className="gamification-stage-wrap"
        onPointerDownCapture={handleStagePointerDown}
        {...(bonusOpen ? { inert: "" } : {})}
      >
        <GamificationPhaserGame
          room={room}
          mode={progress.mode}
          progress={progress}
          assets={GAMIFICATION_PHASER_ASSETS}
          worldMap={GAMIFICATION_WORLD_MAP}
          clickableWorldNodeIds={clickableWorldNodeIds}
          travelTargetNodeId={travelTargetNodeId}
          reducedMotion={reduced}
          ariTalking={ariTalking}
          onWorldNodeClick={handleStartRoom}
          onTravelComplete={handleTravelComplete}
          onSoundCue={handleSoundCue}
        />
        <QuestHud
          progress={progress}
          progressNotSaved={progressNotSaved}
          rooms={stages}
          totalChallenges={totalChallenges}
          completedCount={completedCount}
          locationLabel={locationLabel}
          onToggleSound={toggleSound}
          onToggleMusic={toggleMusic}
          onSetTextSpeed={setTextSpeed}
          onToggleCalmMode={() => setReducedMotion?.(!progress.reducedMotion)}
          onReset={resetQuest}
          onExit={onExit}
        />
        {progress.mode === "overworld" ? (
          <OverworldTicker
            rooms={stages}
            progress={progress}
            nextPlayableNodeId={nextPlayableNodeId}
            clickableWorldNodeIds={clickableWorldNodeIds}
            travelTargetNodeId={travelTargetNodeId}
            dimmed={tickerDimmed}
            reduced={reduced}
            onStartRoom={handleStartRoom}
          />
        ) : (
          <RoomOverlay
            room={room}
            mode={progress.mode}
            dialogueIndex={dialogueIndex}
            dialogueComplete={dialogueComplete}
            forceReveal={forceReveal}
            replayToken={replayToken}
            textSpeed={progress.textSpeed || "normal"}
            gradeBand={progress.gradeBand || "6-8"}
            reduced={reduced}
            muted={progress.soundMuted}
            complete={complete || progress.mode === "finale"}
            onDialogueDone={() => setDialogueComplete(true)}
            onTalkingChange={setAriTalking}
            onAdvance={advanceDialogue}
            onPreviousDialogue={previousDialogue}
            onReplay={replayDialogue}
            onComplete={handleComplete}
            onWrongAnswer={handleWrongAnswer}
            onReturnToHub={handleReturnToJourneyPath}
            onSetGradeBand={setGradeBand}
            onNavigateDeepfake={handleNavigateDeepfake}
            onReplayCelebration={() => setCelebration({ variant: "finale", fresh: false })}
            onOpenBonus={handleOpenBonus}
            navigate={navigate}
          />
        )}
        <TeacherTranscript rooms={stages} show={progress.finaleSeen} />
        {saveToast && (
          <p className="gamification-save-toast" role="status">
            Progress saved — feedback you can trust, just like a good loop.
          </p>
        )}
      </div>
      <IrisOverlay iris={iris} />
      {celebration && (
        <QuestCelebrationOverlay
          variant={celebration.variant}
          room={celebration.variant === "badge" ? stages.find((item) => item.id === celebration.roomId) : null}
          rooms={stages}
          reducedMotion={reduced}
          metacognition={
            celebration.variant === "badge"
              ? stages.find((item) => item.id === celebration.roomId)?.metacognition?.badgeMoment
              : stages.find((item) => item.id === "finale")?.metacognition?.badgeMoment
          }
          onContinue={() => {
            closeCelebration();
            handleReturnToJourneyPath();
          }}
          onStay={closeCelebration}
          onReplayQuest={() => {
            closeCelebration();
            resetQuest();
          }}
          onNavigateDeepfake={() => {
            closeCelebration();
            handleNavigateDeepfake();
          }}
          onOpenKit={() => {
            closeCelebration();
            trackQuestEvent("quest_kit_open", { placement: "finale" });
            navigate?.("gamification-teacher-kit");
          }}
          onOpenBonus={() => {
            closeCelebration();
            handleOpenBonus();
          }}
          onExit={() => {
            closeCelebration();
            onExit?.();
          }}
        />
      )}
      <BonusMissionOverlay
        open={bonusOpen}
        muted={progress.soundMuted}
        onClose={() => setBonusOpen(false)}
      />
    </section>
  );
}
