import { useEffect, useRef, useState } from "react";

import { C } from "../../../theme.js";
import {
  GAMEFUL_CHARTER,
  GAMIFICATION_PHASER_ASSETS,
  GAMIFICATION_REWARD_CARD_ASSETS,
  source,
} from "../../../data/gamificationQuest.js";
import { playQuestSound } from "./questAudio.js";

// Per-character reveal speeds. "instant" skips the animation entirely, and
// prefers-reduced-motion always wins regardless of the saved preference.
export const TYPEWRITER_CHARACTER_MS = { slow: 45, normal: 24, instant: 0 };
const TYPEWRITER_PUNCTUATION_PAUSE_MS = 90;
const TYPEWRITER_PUNCTUATION = new Set([".", "?", "!", ";", ":"]);

export function TypewriterText({ text, reduced, muted, speed = "normal", forceReveal = false, replayToken = 0, onDone, onTalkingChange }) {
  const characterMs = TYPEWRITER_CHARACTER_MS[speed] ?? TYPEWRITER_CHARACTER_MS.normal;
  const instant = reduced || characterMs <= 0;
  const [visible, setVisible] = useState(instant ? text : "");
  const onDoneRef = useRef(onDone);
  const onTalkingChangeRef = useRef(onTalkingChange);
  const mutedRef = useRef(muted);
  const completedRef = useRef(false);
  const done = visible.length >= text.length;

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    onTalkingChangeRef.current = onTalkingChange;
  }, [onTalkingChange]);

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  useEffect(() => {
    setVisible(instant ? text : "");
    completedRef.current = false;
    onTalkingChangeRef.current?.(false);
  }, [text]);

  useEffect(() => {
    completedRef.current = false;
    const finish = () => {
      onTalkingChangeRef.current?.(false);
      if (completedRef.current) return;
      completedRef.current = true;
      onDoneRef.current?.();
    };

    if (instant || forceReveal) {
      setVisible(text);
      // Defer completion past this commit's effects so a parent reset
      // (beat change, room change) can never clobber the "done" signal.
      const timer = window.setTimeout(finish, 0);
      return () => window.clearTimeout(timer);
    }

    let index = 0;
    let timer = null;
    let cancelled = false;
    setVisible("");
    onTalkingChangeRef.current?.(true);

    const tick = () => {
      if (cancelled) return;
      index += 1;
      setVisible(text.slice(0, index));
      if (index % 9 === 0) playQuestSound("dialogue-tick", mutedRef.current);
      if (index >= text.length) {
        finish();
        return;
      }
      const previous = text[index - 1];
      const delay = characterMs + (TYPEWRITER_PUNCTUATION.has(previous) ? TYPEWRITER_PUNCTUATION_PAUSE_MS : 0);
      timer = window.setTimeout(tick, delay);
    };

    timer = window.setTimeout(tick, characterMs);
    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
      onTalkingChangeRef.current?.(false);
    };
  }, [characterMs, forceReveal, instant, replayToken, text]);

  return (
    <div>
      {/* Screen readers get the full line immediately; the animated copy is decorative. */}
      <p
        aria-live="polite"
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          margin: -1,
          padding: 0,
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        {text}
      </p>
      <p
        data-testid="gamification-dialogue-text"
        aria-hidden="true"
        style={{ margin: 0, color: C.textPrimary, fontSize: "0.95rem", lineHeight: 1.6 }}
      >
        {visible}
        {!instant && !done && <span>_</span>}
      </p>
    </div>
  );
}

function SourceDrawer({ room }) {
  const sources = (room.sourceIds || []).map(source).filter(Boolean);
  if (!sources.length) return null;

  return (
    <details className="gamification-source-drawer">
      <summary>Sources</summary>
      <div>
        {sources.map((item) => (
          <a key={item.id} href={item.href} target="_blank" rel="noreferrer">
            <span>{item.label}</span>
            {item.title}
          </a>
        ))}
      </div>
    </details>
  );
}

function MissionLog({ room, show }) {
  if (!show) return null;
  return (
    <details data-testid="gamification-mission-log" className="gamification-mission-log">
      <summary>Ari's full briefing</summary>
      <div>
        {(room.dialogueBeats || []).map((line) => (
          <p key={line}>{line}</p>
        ))}
        {room.teacherTransfer && (
          <p><strong>Teacher transfer:</strong> {room.teacherTransfer}</p>
        )}
      </div>
    </details>
  );
}

function RoomChallenge({ room, complete, muted, onComplete, onNavigateDeepfake }) {
  const [selectedId, setSelectedId] = useState(null);
  const selected = room.challenge?.options?.find((item) => item.id === selectedId);

  useEffect(() => {
    setSelectedId(null);
  }, [room.id]);

  if (!room.challenge) return null;

  const choose = (option) => {
    if (complete) return;
    setSelectedId(option.id);
    if (option.correct) {
      onComplete(room.id);
      return;
    }
    playQuestSound("error", muted);
  };

  return (
    <div className="gamification-challenge-card" data-testid="gamification-activity-panel">
      <p>{room.challenge.title}</p>
      <h3>{room.challenge.prompt}</h3>
      <div className="gamification-answer-grid">
        {room.challenge.options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => choose(option)}
            className={`${selectedId === option.id ? "is-picked" : ""} ${selectedId === option.id && !option.correct ? "is-wrong" : ""}`}
          >
            {option.label}
          </button>
        ))}
      </div>
      {selected && <p className={selected.correct ? "is-correct" : "is-wrong"}>{selected.feedback}</p>}
      {complete && (
        <div className="gamification-reward-card">
          <img src={GAMIFICATION_REWARD_CARD_ASSETS[room.id]} alt="" aria-hidden="true" />
          <div>
            <span>Reward claimed</span>
            <strong>{room.badge?.label || room.challenge.reward}</strong>
            <em>{room.badge?.habit}</em>
          </div>
        </div>
      )}
      {room.id === "finale" && complete && (
        <button type="button" className="gamification-primary-action" onClick={onNavigateDeepfake}>
          Try the Deepfake Dilemma
        </button>
      )}
    </div>
  );
}

export default function RoomOverlay({
  room,
  mode,
  dialogueIndex,
  dialogueComplete,
  forceReveal,
  replayToken,
  textSpeed,
  reduced,
  muted,
  complete,
  onDialogueDone,
  onTalkingChange,
  onAdvance,
  onPreviousDialogue,
  onReplay,
  onComplete,
  onReturnToHub,
  onNavigateDeepfake,
}) {
  const dialogue = room.dialogueBeats || [];
  const activeText = dialogue[dialogueIndex] || dialogue[0] || "";
  const isLastDialogue = dialogueIndex >= dialogue.length - 1;
  const showChallenge = reduced || complete || (dialogueComplete && isLastDialogue);
  const typing = !dialogueComplete;

  const handlePanelClick = (event) => {
    if (event.target.closest?.("button, a, summary, input, select, textarea")) return;
    onAdvance?.();
  };

  return (
    <div className="gamification-room-overlay">
      <div
        data-testid="gamification-dialogue-overlay"
        className="gamification-dialogue-overlay"
        onClick={handlePanelClick}
      >
        <div className="gamification-dialogue-header">
          <span>Ari says</span>
          <span
            className="gamification-beat-pips"
            role="img"
            aria-label={`Briefing part ${Math.min(dialogueIndex + 1, dialogue.length)} of ${dialogue.length}`}
          >
            {dialogue.map((line, index) => (
              <i key={line} className={index <= dialogueIndex ? "is-done" : ""} />
            ))}
          </span>
        </div>
        <strong className="gamification-dialogue-title">{room.title}</strong>
        <TypewriterText
          text={activeText}
          reduced={reduced}
          muted={muted}
          speed={textSpeed}
          forceReveal={forceReveal}
          replayToken={replayToken}
          onDone={onDialogueDone}
          onTalkingChange={onTalkingChange}
        />
        <div className="gamification-dialogue-controls">
          <button type="button" onClick={onPreviousDialogue} disabled={dialogueIndex === 0}>
            {"◂ Back"}
          </button>
          {(typing || !isLastDialogue) && (
            <button type="button" onClick={onAdvance}>
              {typing ? "Skip ▸" : "Next ▸"}
            </button>
          )}
          <button type="button" onClick={onReplay} aria-label="Replay text">
            {"↺ Replay"}
          </button>
          <span className="gamification-dialogue-hint" aria-hidden="true">
            Space or click to continue
          </span>
        </div>
      </div>

      <div className="gamification-room-side">
        {complete && mode !== "finale" && (
          <div className="gamification-return-gate-card">
            <strong>Ready to continue your journey?</strong>
            <span>Badge earned. Return to the Journey Path; the next stop is lit and ready.</span>
            <button type="button" className="gamification-return-gate" onClick={onReturnToHub}>
              <img src={GAMIFICATION_PHASER_ASSETS.hud.returnGate} alt="" aria-hidden="true" />
              <span>
                <strong>Return to Journey Path</strong>
                <em>Open the gate and choose the glowing stop.</em>
              </span>
            </button>
          </div>
        )}
        {room.promptRecipe && (
          <div className="gamification-prompt-recipe">
            <p>AI Lesson Forge Prompt</p>
            <ol>
              {room.promptRecipe.map((item) => <li key={item}>{item}</li>)}
            </ol>
          </div>
        )}
        {room.workshopCards && (
          <div className="gamification-workshop-cards">
            {room.workshopCards.map((card) => (
              <article key={card.id}>
                <strong>{card.title}</strong>
                <span>{card.text}</span>
              </article>
            ))}
          </div>
        )}
        {room.charter && complete && (
          <div className="gamification-charter-card">
            <p>Gameful Learning Charter</p>
            <ul>
              {GAMEFUL_CHARTER.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        )}
        {showChallenge ? (
          <RoomChallenge
            room={room}
            complete={complete}
            muted={muted}
            onComplete={onComplete}
            onNavigateDeepfake={onNavigateDeepfake}
          />
        ) : (
          <div className="gamification-locked-activity">Finish Ari's briefing to unlock the classroom move.</div>
        )}
        <SourceDrawer room={room} />
        <MissionLog room={room} show={showChallenge || complete} />
      </div>
    </div>
  );
}
