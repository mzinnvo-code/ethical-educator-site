import { useEffect, useRef, useState } from "react";

import { C } from "../../../theme.js";
import {
  GAMEFUL_CHARTER,
  GAMIFICATION_GAME_ROOMS,
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

const GRADE_BANDS = [
  { id: "k-2", label: "K–2" },
  { id: "3-5", label: "3–5" },
  { id: "6-8", label: "6–8" },
  { id: "9-12", label: "9–12" },
];

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

function SourcesPanel({ room }) {
  const sources = (room.sourceIds || []).map(source).filter(Boolean);
  if (!sources.length) return <p className="gamification-rail-empty">This stop has no external sources.</p>;

  return (
    <div className="gamification-source-drawer">
      {sources.map((item) => (
        <a key={item.id} href={item.href} target="_blank" rel="noreferrer">
          <span>{item.label}</span>
          {item.title}
        </a>
      ))}
    </div>
  );
}

function MissionLog({ room }) {
  return (
    <div data-testid="gamification-mission-log" className="gamification-mission-log">
      <p className="gamification-rail-label">Ari's full briefing</p>
      {(room.dialogueBeats || []).map((line) => (
        <p key={line}>{line}</p>
      ))}
      {room.teacherTransfer && (
        <p><strong>Teacher transfer:</strong> {room.teacherTransfer}</p>
      )}
    </div>
  );
}

function RoomChallenge({ room, complete, muted, onComplete, onWrongAnswer, onNavigateDeepfake }) {
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
    onWrongAnswer?.();
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

// Non-gating follow-up question: a pressure test, not a gate. Wrong answers
// teach; nothing is locked behind it.
function BonusCheck({ check, muted }) {
  const [selectedId, setSelectedId] = useState(null);
  const selected = check.options.find((item) => item.id === selectedId);

  return (
    <div className="gamification-challenge-card gamification-bonus-check" data-testid="gamification-bonus-check">
      <p>{check.title} · optional</p>
      <h3>{check.prompt}</h3>
      <div className="gamification-answer-grid">
        {check.options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => {
              setSelectedId(option.id);
              if (!option.correct) playQuestSound("error", muted);
            }}
            className={`${selectedId === option.id ? "is-picked" : ""} ${selectedId === option.id && !option.correct ? "is-wrong" : ""}`}
          >
            {option.label}
          </button>
        ))}
      </div>
      {selected && <p className={selected.correct ? "is-correct" : "is-wrong"}>{selected.feedback}</p>}
    </div>
  );
}

function LessonBlueprint({ blueprint }) {
  const [copied, setCopied] = useState(false);

  const copyDraft = () => {
    const draft = [
      `Lesson loop draft — ${blueprint.title}`,
      "",
      ...blueprint.steps.map((step, index) => `${index + 1}. ${step.label}\n   ${step.prompt}\n   My answer: ____________`),
      "",
      "Audit: does the reward name the thinking move?",
    ].join("\n");
    const finish = () => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(draft).then(finish, finish);
      return;
    }
    finish();
  };

  return (
    <div className="gamification-blueprint" data-testid="gamification-lesson-blueprint">
      <p className="gamification-rail-label">{blueprint.title}</p>
      <p className="gamification-blueprint-intro">{blueprint.intro}</p>
      <ol>
        {blueprint.steps.map((step) => (
          <li key={step.id}>
            <strong>{step.label}</strong>
            <span>{step.prompt}</span>
            {step.examples.map((example) => (
              <div key={`${step.id}-${example.gradeBand}`} className="gamification-blueprint-example">
                <em>{GRADE_BANDS.find((band) => band.id === example.gradeBand)?.label || example.gradeBand}</em>
                <p><s>{example.before}</s></p>
                <p>{example.after}</p>
              </div>
            ))}
          </li>
        ))}
      </ol>
      <button type="button" className="gamification-primary-action" onClick={copyDraft}>
        {copied ? "Copied — paste it into your planner" : "Copy my loop draft"}
      </button>
    </div>
  );
}

function ClassroomPanel({ room, gradeBand, onSetGradeBand, navigate }) {
  const bandText = room.gradeBands?.[gradeBand];

  return (
    <div className="gamification-classroom-panel">
      {room.metacognition?.roomMoment && (
        <div className="gamification-meta-callout" data-testid="gamification-meta-callout">
          <p className="gamification-rail-label">Notice the design</p>
          <p>{room.metacognition.roomMoment}</p>
        </div>
      )}
      {room.gradeBands && (
        <div className="gamification-gradeband-card" data-testid="gamification-gradeband-card">
          <p className="gamification-rail-label">In your classroom</p>
          <div className="gamification-gradeband-switch" role="group" aria-label="Choose a grade band">
            {GRADE_BANDS.map((band) => (
              <button
                key={band.id}
                type="button"
                aria-pressed={gradeBand === band.id}
                onClick={() => onSetGradeBand?.(band.id)}
              >
                {band.label}
              </button>
            ))}
          </div>
          {bandText && <p className="gamification-gradeband-text">{bandText}</p>}
        </div>
      )}
      {room.teacherTransfer && (
        <div className="gamification-transfer-card">
          <p className="gamification-rail-label">This week's move</p>
          <p>{room.teacherTransfer}</p>
        </div>
      )}
      {room.keyDistinction && (
        <div className="gamification-distinction-card" data-testid="gamification-distinction-card">
          <p className="gamification-rail-label">{room.keyDistinction.title}</p>
          {room.keyDistinction.items.map((item) => (
            <p key={item.term}><strong>{item.term}:</strong> {item.definition}</p>
          ))}
          <p className="gamification-distinction-note">{room.keyDistinction.note}</p>
        </div>
      )}
      {room.cautionCard && (
        <div className="gamification-caution-card" data-testid="gamification-caution-card">
          <p className="gamification-rail-label">{room.cautionCard.title}</p>
          {room.cautionCard.items.map((item) => (
            <p key={item.id}><strong>{item.risk}:</strong> {item.text}</p>
          ))}
        </div>
      )}
      {room.evidenceSnapshot && (
        <div className="gamification-evidence-card" data-testid="gamification-evidence-card">
          <p className="gamification-rail-label">Evidence snapshot</p>
          {room.evidenceSnapshot.map((item) => {
            const linked = source(item.sourceId);
            return (
              <p key={item.id}>
                <strong>{item.stat}.</strong> {item.caveat}{" "}
                {linked && <a href={linked.href} target="_blank" rel="noreferrer">({linked.label})</a>}
              </p>
            );
          })}
        </div>
      )}
      {room.pilotScorecard && (
        <div className="gamification-scorecard" data-testid="gamification-pilot-scorecard">
          <p className="gamification-rail-label">Did your pilot work?</p>
          {room.pilotScorecard.map((row) => (
            <div key={row.id} className="gamification-scorecard-row">
              <strong>{row.signal}</strong>
              <p><span className="is-correct">Look for:</span> {row.lookFor}</p>
              <p><span className="is-wrong">Red flag:</span> {row.redFlag}</p>
            </div>
          ))}
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
          <p className="gamification-rail-label">The six design cards</p>
          {room.workshopCards.map((card) => (
            <article key={card.id}>
              <strong>{card.title}</strong>
              <span>{card.text}</span>
            </article>
          ))}
        </div>
      )}
      {room.lessonBlueprint && <LessonBlueprint blueprint={room.lessonBlueprint} />}
      {room.lessonBlueprint && (
        <div className="gamification-te-link">
          <p className="gamification-rail-label">Printable companion</p>
          <p>The Teacher Kit collects the charter, design cards, blueprint, and scorecard on one printable page.</p>
          <button
            type="button"
            className="gamification-primary-action"
            onClick={() => navigate?.("gamification-teacher-kit")}
          >
            Open the printable Teacher Kit
          </button>
        </div>
      )}
      {room.thoughtExperimentsLink && (
        <div className="gamification-te-link" data-testid="gamification-te-link">
          <p className="gamification-rail-label">{room.thoughtExperimentsLink.label}</p>
          <p>{room.thoughtExperimentsLink.text}</p>
          <button
            type="button"
            className="gamification-primary-action"
            onClick={() => navigate?.(room.thoughtExperimentsLink.route)}
          >
            Open the Thought Experiments hub
          </button>
        </div>
      )}
    </div>
  );
}

// Everything from the finale pop-up, permanently reachable in the trophy
// room: the badge collection, a celebration replay, and the Teacher Kit.
function TrophyCase({ onReplayCelebration, navigate }) {
  const playableRooms = GAMIFICATION_GAME_ROOMS.filter((item) => item.kind !== "home");
  return (
    <div className="gamification-trophy-case" data-testid="gamification-trophy-case">
      <p className="gamification-rail-label">Your trophy case</p>
      <ul className="gamification-trophy-list">
        {playableRooms.map((item) => (
          <li key={item.id} title={item.badge?.habit}>
            <img src={item.badge?.icon} alt="" aria-hidden="true" />
            <span>
              <strong>{item.badge?.label}</strong>
              <em>{item.badge?.habit}</em>
            </span>
          </li>
        ))}
      </ul>
      <button type="button" className="gamification-primary-action" onClick={onReplayCelebration}>
        Replay the finale celebration
      </button>
      <button
        type="button"
        className="gamification-primary-action"
        onClick={() => navigate?.("gamification-teacher-kit")}
      >
        Open the printable Teacher Kit
      </button>
    </div>
  );
}

const RAIL_TABS = [
  { id: "challenge", label: "Challenge" },
  { id: "classroom", label: "Classroom" },
  { id: "sources", label: "Sources" },
  { id: "transcript", label: "Transcript" },
];

export default function RoomOverlay({
  room,
  mode,
  dialogueIndex,
  dialogueComplete,
  forceReveal,
  replayToken,
  textSpeed,
  gradeBand = "6-8",
  reduced,
  muted,
  complete,
  onDialogueDone,
  onTalkingChange,
  onAdvance,
  onPreviousDialogue,
  onReplay,
  onComplete,
  onWrongAnswer,
  onReturnToHub,
  onSetGradeBand,
  onNavigateDeepfake,
  onReplayCelebration,
  navigate,
}) {
  const dialogue = room.dialogueBeats || [];
  const activeText = dialogue[dialogueIndex] || dialogue[0] || "";
  const isLastDialogue = dialogueIndex >= dialogue.length - 1;
  const showChallenge = reduced || complete || (dialogueComplete && isLastDialogue);
  const typing = !dialogueComplete;
  const [activeTab, setActiveTab] = useState("challenge");

  useEffect(() => {
    setActiveTab("challenge");
  }, [room.id]);

  const handlePanelClick = (event) => {
    if (event.target.closest?.("button, a, summary, input, select, textarea")) return;
    onAdvance?.();
  };

  const switchTab = (tabId) => {
    setActiveTab(tabId);
    playQuestSound("ui-tap", muted);
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
        <div className="gamification-rail-tabs" role="tablist" aria-label="Room resources">
          {RAIL_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => switchTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "challenge" && (
          <div role="tabpanel" className="gamification-rail-panel">
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
            {room.id === "finale" && complete && (
              <TrophyCase onReplayCelebration={onReplayCelebration} navigate={navigate} />
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
                onWrongAnswer={onWrongAnswer}
                onNavigateDeepfake={onNavigateDeepfake}
              />
            ) : (
              <div className="gamification-locked-activity">Finish Ari's briefing to unlock the classroom move.</div>
            )}
            {room.bonusCheck && complete && <BonusCheck check={room.bonusCheck} muted={muted} />}
          </div>
        )}

        {activeTab === "classroom" && (
          <div role="tabpanel" className="gamification-rail-panel">
            <ClassroomPanel
              room={room}
              gradeBand={gradeBand}
              onSetGradeBand={onSetGradeBand}
              navigate={navigate}
            />
          </div>
        )}

        {activeTab === "sources" && (
          <div role="tabpanel" className="gamification-rail-panel">
            <SourcesPanel room={room} />
          </div>
        )}

        {activeTab === "transcript" && (
          <div role="tabpanel" className="gamification-rail-panel">
            <MissionLog room={room} />
          </div>
        )}
      </div>
    </div>
  );
}
