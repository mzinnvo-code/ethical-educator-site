import { useCallback, useEffect, useMemo, useState } from "react";
import { BRAIN_PROGRESS_ASSETS, DEEPFAKE_GAME_ASSETS, deepfakeBackgroundForStage, deepfakeRevealBackgroundForStage } from "../data/deepfakeGameAssets.js";
import { getAchievementStatus } from "../lib/thoughtProgress.js";
import useThoughtProgress, { recordThoughtProgress } from "../hooks/useThoughtProgress.js";
import { C } from "../theme.js";
import ReadAloudButton from "./ReadAloudButton.jsx";
import ThoughtProgressPanel from "./ThoughtProgressPanel.jsx";

const ACT_META = {
  "viral-clip": {
    act: "Act 1",
    label: "The clip",
    achievementId: "source-checker",
    mission: "Verify before sharing.",
  },
  "almost-true": {
    act: "Act 2",
    label: "The claim",
    achievementId: "claim-sorter",
    mission: "Separate what is fake, unconfirmed, and just chat pressure.",
  },
  "your-side": {
    act: "Act 3",
    label: "The mirror",
    achievementId: "truth-under-pressure",
    mission: "Keep the truth rule when the fake helps your side.",
  },
  synthesis: {
    act: "Debrief",
    label: "Synthesis",
    mission: "Name the habit you built.",
  },
};

const TYPEWRITER_CHARACTER_MS = 65;
const TYPEWRITER_PUNCTUATION_PAUSE_MS = 220;
const TYPEWRITER_PUNCTUATION = new Set([".", "?", "!", ";", ":"]);
const PIXEL_FRAME_RATIOS = {
  brain: "260 / 190",
  achievement: "16 / 9",
  portrait: "1 / 1",
  sprite: "1 / 1",
  stamp: "16 / 9",
  scene: "16 / 9",
};

function useReducedMotion() {
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

function TypewriterText({ text, reduced, onDone, onStart, onTalkingChange }) {
  const [visible, setVisible] = useState(reduced ? text : "");
  const [replayToken, setReplayToken] = useState(0);
  const [forceRevealed, setForceRevealed] = useState(false);
  const done = visible.length >= text.length;
  const speaking = !reduced && !forceRevealed && !done;

  useEffect(() => {
    setForceRevealed(false);
  }, [text]);

  useEffect(() => {
    onTalkingChange?.(speaking);
    return () => onTalkingChange?.(false);
  }, [onTalkingChange, speaking]);

  useEffect(() => {
    if (reduced || forceRevealed) {
      setVisible(text);
      onDone?.();
      return undefined;
    }
    onStart?.();
    setVisible("");
    let index = 0;
    let timer = null;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      index += 1;
      setVisible(text.slice(0, index));
      if (index >= text.length) {
        onDone?.();
        return;
      }
      const previousCharacter = text[index - 1];
      const delay = TYPEWRITER_CHARACTER_MS + (TYPEWRITER_PUNCTUATION.has(previousCharacter) ? TYPEWRITER_PUNCTUATION_PAUSE_MS : 0);
      timer = window.setTimeout(tick, delay);
    };

    timer = window.setTimeout(tick, TYPEWRITER_CHARACTER_MS);
    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
  }, [forceRevealed, onDone, onStart, reduced, replayToken, text]);

  const reveal = () => {
    setForceRevealed(true);
  };

  const replay = () => {
    setForceRevealed(false);
    onStart?.();
    setReplayToken((token) => token + 1);
  };

  return (
    <div>
      <p data-testid="deepfake-dialogue-text" style={{ color: C.textPrimary, fontSize: "0.94rem", lineHeight: 1.65, margin: 0 }}>
        {visible}
        {!reduced && !done && <span aria-hidden="true">_</span>}
      </p>
      {!reduced && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
          {!done && (
            <button type="button" onClick={reveal} style={tinyPixelButton(C.gold)}>
              Reveal text
            </button>
          )}
          <button type="button" onClick={replay} style={tinyPixelButton(C.teal)}>
            Replay text
          </button>
        </div>
      )}
    </div>
  );
}

function PixelAssetFrame({ kind, children, width, className, glow = C.gold }) {
  return (
    <div className={className} style={{
      width,
      aspectRatio: PIXEL_FRAME_RATIOS[kind],
      padding: kind === "portrait" ? 4 : 5,
      borderRadius: 8,
      border: `2px solid ${glow}42`,
      background: "rgba(8,18,32,0.82)",
      boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.05), 0 0 18px ${glow}16`,
      overflow: "hidden",
      flexShrink: 0,
    }}>
      {children}
    </div>
  );
}

function PixelImage({ src, alt = "", decorative = false, className, style }) {
  return (
    <img
      className={className}
      src={src}
      alt={decorative ? "" : alt}
      aria-hidden={decorative ? "true" : undefined}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        objectFit: "contain",
        imageRendering: "pixelated",
        ...style,
      }}
    />
  );
}

function AnimatedPixelStamp({ frames = [], alt, reduced }) {
  const safeFrames = frames.length ? frames : [BRAIN_PROGRESS_ASSETS[5]];
  return (
    <PixelAssetFrame kind="stamp" width="clamp(96px, 14vw, 142px)" className="deepfake-act-stamp" glow={C.gold}>
      <div className="deepfake-act-stamp-stack">
        {safeFrames.map((frame, index) => (
          <PixelImage
            key={frame}
            src={frame}
            alt={index === 0 ? alt : ""}
            decorative={index > 0}
            className={index > 0 && !reduced ? `deepfake-act-stamp-frame deepfake-act-stamp-frame-${index}` : ""}
          />
        ))}
      </div>
    </PixelAssetFrame>
  );
}

function FocusedSceneWindow({ src, alt, expanded, reduced }) {
  const sceneClassName = ["deepfake-focused-scene", expanded && !reduced ? "scene-expanded" : ""].filter(Boolean).join(" ");

  return (
    <section
      data-testid="deepfake-focused-scene"
      aria-label="Focused scene"
      className={sceneClassName}
      style={{
        gridArea: "scene",
        width: "min(100%, clamp(420px, 60vw, 620px))",
        justifySelf: "center",
        borderRadius: 8,
        border: `2px solid ${C.teal}35`,
        background: "rgba(8,18,32,0.9)",
        padding: 6,
        boxShadow: expanded ? `0 0 34px ${C.teal}18` : `0 0 24px ${C.gold}16`,
        overflow: "hidden",
        transition: reduced ? "none" : "opacity 520ms ease, transform 520ms ease, filter 520ms ease",
      }}
    >
      <PixelAssetFrame kind="scene" width="100%" className="deepfake-focused-scene-frame" glow={expanded ? C.teal : C.gold}>
        <PixelImage src={src} alt={alt} className="deepfake-focused-scene-image" />
      </PixelAssetFrame>
    </section>
  );
}

function storyText(storySections, promptText) {
  const sections = storySections.map((section) => `${section.label}: ${section.text}`);
  const mission = promptText ? ["Mission question: " + promptText] : [];
  return [...sections, ...mission].join(" ");
}

function SourceCheckerActivity({ onComplete, complete, mastered }) {
  const tools = [
    {
      id: "source",
      label: "Original source",
      prompt: "Trace who posted the clip first.",
      feedback: "The first source is not the class chat. You look for where the clip started.",
    },
    {
      id: "timing",
      label: "Mouth + timing",
      prompt: "Scrub the clip and check if the voice matches the mouth.",
      feedback: "The mouth drifts half a beat behind the words. That is a verification clue.",
    },
    {
      id: "verifier",
      label: "Trusted verifier",
      prompt: "Send the clip to someone who can verify before sharing.",
      feedback: "You moved the clip from rumor speed to evidence speed.",
    },
  ];
  const [selected, setSelected] = useState([]);
  const done = selected.length === tools.length;
  const progress = Math.round((selected.length / tools.length) * 100);

  useEffect(() => {
    if (done && !complete) onComplete();
  }, [complete, done, onComplete]);

  return (
    <MiniActivity
      title="Evidence Desk"
      complete={complete || done}
      mastered={mastered}
      summary="Inspect the clip with three tools before the share button gets a turn."
    >
      <div className="deepfake-source-checker-grid" style={{
        display: "grid",
        gridTemplateColumns: "minmax(150px, 0.85fr) minmax(0, 1.15fr)",
        gap: 10,
        alignItems: "stretch",
      }}>
        <div style={{
          border: `2px solid ${C.gold}35`,
          borderRadius: 8,
          background: "rgba(5,12,24,0.82)",
          padding: 10,
          display: "grid",
          alignContent: "space-between",
          minHeight: 134,
        }}>
          <p style={{ color: C.gold, fontSize: "0.66rem", fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>
            Viral clip card
          </p>
          <p style={{ color: C.textPrimary, fontSize: "0.84rem", lineHeight: 1.45, marginBottom: 10 }}>
            Candidate video. Posted at 8:47 p.m. Source unknown. Chat pressure rising.
          </p>
          <div
            data-testid="source-checker-meter"
            aria-label={`Source checker progress ${progress}%`}
            style={{
              height: 12,
              borderRadius: 999,
              border: `1px solid ${C.teal}55`,
              background: "rgba(255,255,255,0.08)",
              overflow: "hidden",
            }}
          >
            <div style={{ width: `${progress}%`, height: "100%", background: `linear-gradient(90deg, ${C.teal}, ${C.gold})`, transition: "width 220ms ease" }} />
          </div>
        </div>
        <div style={{ display: "grid", gap: 8 }}>
          {tools.map((tool) => {
            const active = selected.includes(tool.id);
            return (
              <button
                key={tool.id}
                type="button"
                data-testid="source-tool-card"
                aria-pressed={active}
                onClick={() => setSelected((current) => current.includes(tool.id) ? current : [...current, tool.id])}
                style={{
                  display: "grid",
                  gap: 4,
                  textAlign: "left",
                  padding: "10px 11px",
                  borderRadius: 8,
                  border: `2px solid ${active ? C.gold : C.teal + "45"}`,
                  background: active ? `${C.gold}18` : "rgba(8,18,32,0.88)",
                  color: C.textPrimary,
                  cursor: "pointer",
                }}
              >
                <span style={{ color: active ? C.gold : C.teal, fontSize: "0.76rem", fontWeight: 900 }}>{tool.label}</span>
                <span style={{ color: C.textMuted, fontSize: "0.73rem", lineHeight: 1.35 }}>{active ? tool.feedback : tool.prompt}</span>
              </button>
            );
          })}
        </div>
      </div>
    </MiniActivity>
  );
}

function ClaimSorterActivity({ onComplete, complete, mastered }) {
  const rows = [
    { id: "video", label: "Cash-envelope video", correct: "Fake video", clue: "The pixels, mouth timing, and source trail are not reliable." },
    { id: "investigation", label: "Campaign money question", correct: "Unconfirmed investigation", clue: "There may be a real funding question, but the video does not prove it." },
    { id: "chat", label: "Everyone knows they are guilty", correct: "Chat speculation", clue: "This is pressure language, not evidence." },
  ];
  const bins = ["Fake video", "Unconfirmed investigation", "Chat speculation"];
  const [answers, setAnswers] = useState({});
  const [selectedClaimId, setSelectedClaimId] = useState(null);
  const [wrongPlacement, setWrongPlacement] = useState(null);
  const [hint, setHint] = useState("Pick a claim card, then place it in the evidence bin it actually belongs in.");
  const done = rows.every((row) => answers[row.id] === row.correct);

  useEffect(() => {
    if (done && !complete) onComplete();
  }, [complete, done, onComplete]);

  const placeClaim = (claimId, bin) => {
    const claim = rows.find((row) => row.id === claimId);
    if (!claim || answers[claimId]) return;
    if (claim.correct !== bin) {
      setWrongPlacement(`${claimId}:${bin}`);
      setHint(claim.clue);
      return;
    }
    setAnswers((current) => ({ ...current, [claimId]: bin }));
    setSelectedClaimId(null);
    setWrongPlacement(null);
    setHint(`${claim.label} belongs in ${bin}.`);
  };

  const handleCardKey = (event, claimId) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    setSelectedClaimId(claimId);
  };

  const handleBinKey = (event, bin) => {
    if ((event.key !== "Enter" && event.key !== " ") || !selectedClaimId) return;
    event.preventDefault();
    placeClaim(selectedClaimId, bin);
  };

  return (
    <MiniActivity
      title="Claim Sorter"
      complete={complete || done}
      mastered={mastered}
      summary="Sort the fake video, real-but-unconfirmed concern, and chat pressure into separate evidence bins."
    >
      <div style={{ display: "grid", gap: 10 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 8 }}>
          {rows.map((row) => {
            const locked = !!answers[row.id];
            const selected = selectedClaimId === row.id;
            const wrong = wrongPlacement?.startsWith(`${row.id}:`);
            return (
              <button
                key={row.id}
                type="button"
                draggable={!locked}
                data-testid="claim-sorter-card"
                aria-pressed={selected}
                onClick={() => !locked && setSelectedClaimId(row.id)}
                onKeyDown={(event) => handleCardKey(event, row.id)}
                onDragStart={(event) => event.dataTransfer.setData("text/plain", row.id)}
                className={wrong ? "deepfake-card-shake" : ""}
                style={{
                  minHeight: 78,
                  borderRadius: 8,
                  border: `2px solid ${locked ? C.gold : selected ? C.teal : C.border}`,
                  background: locked ? `${C.gold}18` : selected ? `${C.teal}16` : "rgba(8,18,32,0.9)",
                  color: C.textPrimary,
                  cursor: locked ? "default" : "grab",
                  textAlign: "left",
                  padding: "10px 11px",
                  display: "grid",
                  gap: 5,
                }}
              >
                <span style={{ color: locked ? C.gold : C.textPrimary, fontWeight: 900, fontSize: "0.8rem" }}>{row.label}</span>
                <span style={{ color: C.textMuted, fontSize: "0.72rem", lineHeight: 1.35 }}>
                  {locked ? `Locked: ${answers[row.id]}` : selected ? "Selected. Choose a bin." : "Tap, press Enter, or drag this card."}
                </span>
              </button>
            );
          })}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 8 }}>
          {bins.map((bin) => (
            <button
              key={bin}
              type="button"
              data-testid="claim-sorter-bin"
              onClick={() => selectedClaimId && placeClaim(selectedClaimId, bin)}
              onKeyDown={(event) => handleBinKey(event, bin)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                placeClaim(event.dataTransfer.getData("text/plain"), bin);
              }}
              style={{
                minHeight: 72,
                borderRadius: 8,
                border: `2px dashed ${selectedClaimId ? C.gold : C.teal}55`,
                background: "rgba(5,12,24,0.76)",
                color: C.textPrimary,
                cursor: selectedClaimId ? "pointer" : "default",
                padding: "10px",
                fontWeight: 900,
              }}
            >
              {bin}
            </button>
          ))}
        </div>
        <p aria-live="polite" style={{ color: wrongPlacement ? C.coral : C.textMuted, fontSize: "0.76rem", lineHeight: 1.45 }}>
          {hint}
        </p>
      </div>
    </MiniActivity>
  );
}

function TruthPressureActivity({ onComplete, complete, mastered }) {
  const rules = [
    "I correct fakes before I use them.",
    "Evidence matters even when a rumor helps my side.",
    "I do not let loyalty outrun truth.",
  ];
  const [selectedRule, setSelectedRule] = useState(rules[0]);
  const [customRule, setCustomRule] = useState("");
  const [pressureCase, setPressureCase] = useState(false);
  const currentRule = customRule.trim().length >= 8 ? customRule.trim() : selectedRule;
  const done = currentRule.length >= 8 && pressureCase;

  useEffect(() => {
    if (done && !complete) onComplete();
  }, [complete, done, onComplete]);

  return (
    <MiniActivity
      title="Truth Under Pressure"
      complete={complete || done}
      mastered={mastered}
      summary="Choose or write a truth rule, then apply it when the fake helps your side."
    >
      <div style={{ display: "grid", gap: 10 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 8 }}>
          {rules.map((rule) => (
            <button
              key={rule}
              type="button"
              data-testid="truth-pressure-rule"
              aria-pressed={selectedRule === rule && !customRule.trim()}
              onClick={() => {
                setSelectedRule(rule);
                setCustomRule("");
              }}
              style={{
                padding: "10px 11px",
                borderRadius: 8,
                border: `2px solid ${selectedRule === rule && !customRule.trim() ? C.gold : C.border}`,
                background: selectedRule === rule && !customRule.trim() ? `${C.gold}18` : "rgba(8,18,32,0.86)",
                color: C.textPrimary,
                textAlign: "left",
                cursor: "pointer",
                fontSize: "0.78rem",
                fontWeight: 800,
                lineHeight: 1.35,
              }}
            >
              {rule}
            </button>
          ))}
        </div>
        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ color: C.textSecondary, fontSize: "0.76rem", fontWeight: 800 }}>Custom truth rule</span>
          <textarea
            value={customRule}
            onChange={(event) => setCustomRule(event.target.value)}
            placeholder="Example: I correct fakes even when they help my side."
            rows={3}
            style={{
              width: "100%",
              boxSizing: "border-box",
              borderRadius: 8,
              border: `1px solid ${C.border}`,
              background: "rgba(8,18,32,0.86)",
              color: C.textPrimary,
              padding: "9px 10px",
              font: "inherit",
              resize: "vertical",
            }}
          />
        </label>
        <div style={{
          borderRadius: 8,
          border: `2px solid ${pressureCase ? C.gold : C.coral}45`,
          background: pressureCase ? `${C.gold}12` : `${C.coral}10`,
          padding: "11px 12px",
        }}>
          <p style={{ color: C.textPrimary, fontSize: "0.84rem", lineHeight: 1.5, marginBottom: 9 }}>
            Pressure case: the fake now helps your preferred candidate. Do you keep the same truth rule?
          </p>
          <button type="button" onClick={() => setPressureCase(true)} style={pressureCase ? primaryPixelButton(C.gold) : secondaryPixelButton}>
            Apply rule under pressure
          </button>
          {pressureCase && (
            <p style={{ color: C.gold, fontSize: "0.76rem", lineHeight: 1.45, marginTop: 9 }}>
              Rule applied: {currentRule}
            </p>
          )}
        </div>
      </div>
    </MiniActivity>
  );
}

function MiniActivity({ title, summary, complete, mastered, children }) {
  return (
    <section
      aria-label={`${title} mini-activity`}
      style={{
        border: `2px solid ${complete ? C.gold + "70" : C.teal + "45"}`,
        borderRadius: 8,
        background: "rgba(8,18,32,0.88)",
        padding: "12px",
        boxShadow: complete ? `0 0 18px ${C.gold}25` : "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
        <div>
          <p style={{ color: complete ? C.gold : C.teal, fontSize: "0.66rem", fontWeight: 900, letterSpacing: "0.13em", textTransform: "uppercase", marginBottom: 4 }}>
            {complete ? "Achievement unlocked" : mastered ? "Mastered - replay" : "Skill gate"}
          </p>
          <h4 style={{ color: C.textPrimary, fontSize: "0.95rem", margin: 0 }}>{title}</h4>
        </div>
        <span style={{ color: complete ? C.gold : C.textMuted, fontSize: "0.76rem", fontWeight: 900 }}>
          {complete ? "Ready" : mastered ? "Replay to unlock" : "Locked choices"}
        </span>
      </div>
      <p style={{ color: C.textMuted, fontSize: "0.76rem", lineHeight: 1.45, marginBottom: 10 }}>{summary}</p>
      {children}
    </section>
  );
}

function ActivityForStage({ stageId, complete, mastered, onComplete }) {
  if (stageId === "viral-clip") return <SourceCheckerActivity complete={complete} mastered={mastered} onComplete={onComplete} />;
  if (stageId === "almost-true") return <ClaimSorterActivity complete={complete} mastered={mastered} onComplete={onComplete} />;
  if (stageId === "your-side") return <TruthPressureActivity complete={complete} mastered={mastered} onComplete={onComplete} />;
  return null;
}

function ChoiceDeck({ stage, onChoose, reduced }) {
  return (
    <div
      data-testid="deepfake-choice-deck"
      aria-label="Game choices"
      style={{
        display: "grid",
        gap: 9,
        animation: reduced ? "none" : "deepfake-choice-slide 420ms ease-out both",
      }}
    >
      {stage.options?.map((option, index) => (
        <button
          key={option.label}
          type="button"
          onClick={() => onChoose(index)}
          style={{
            display: "grid",
            gridTemplateColumns: "34px 1fr",
            gap: 10,
            alignItems: "center",
            padding: "12px 13px",
            borderRadius: 8,
            border: `2px solid ${C.gold}42`,
            background: "rgba(8,18,32,0.9)",
            color: C.textPrimary,
            cursor: "pointer",
            textAlign: "left",
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: "0.95rem",
            lineHeight: 1.45,
          }}
        >
          <span style={{
            width: 32,
            height: 32,
            borderRadius: 6,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            border: `2px solid ${C.gold}`,
            color: C.gold,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontWeight: 900,
          }}>
            {option.label}
          </span>
          {option.text}
        </button>
      ))}
    </div>
  );
}

function ReflectionWindow({ option, stage, isLastChoice, onNext, onRestart }) {
  return (
    <section aria-label="Your reflection" style={{
      border: `2px solid ${C.gold}55`,
      borderRadius: 8,
      background: "rgba(8,18,32,0.92)",
      padding: "13px",
      boxShadow: `0 0 20px ${C.gold}18`,
    }}>
      <p style={{ color: C.gold, fontSize: "0.66rem", fontWeight: 900, letterSpacing: "0.13em", textTransform: "uppercase", marginBottom: 6 }}>
        Choice registered
      </p>
      <p style={{ color: C.textPrimary, fontSize: "0.92rem", lineHeight: 1.6, marginBottom: 10 }}>
        {option?.reflection}
      </p>
      {stage.counterpoint && (
        <p style={{
          color: C.textSecondary,
          fontSize: "0.82rem",
          lineHeight: 1.55,
          padding: "10px 11px",
          borderRadius: 8,
          border: `1px solid ${C.coral}45`,
          background: `${C.coral}10`,
          marginBottom: 12,
        }}>
          Counterpoint: {stage.counterpoint}
        </p>
      )}
      <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
        <button type="button" onClick={onNext} style={primaryPixelButton(C.gold)}>
          {isLastChoice ? "Enter debrief" : "Continue quest"}
        </button>
        <button type="button" onClick={onRestart} style={secondaryPixelButton}>
          Restart
        </button>
      </div>
    </section>
  );
}

function primaryPixelButton(color) {
  return {
    padding: "10px 14px",
    borderRadius: 6,
    border: `2px solid ${color}`,
    background: color,
    color: "#081220",
    cursor: "pointer",
    fontSize: "0.82rem",
    fontWeight: 900,
    boxShadow: `0 4px 0 ${C.midnight}`,
  };
}

function tinyPixelButton(color) {
  return {
    padding: "6px 9px",
    borderRadius: 5,
    border: `1px solid ${color}90`,
    background: `${color}18`,
    color,
    cursor: "pointer",
    fontSize: "0.68rem",
    fontWeight: 900,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  };
}

const secondaryPixelButton = {
  padding: "10px 14px",
  borderRadius: 6,
  border: `2px solid ${C.borderHover}`,
  background: "rgba(8,18,32,0.8)",
  color: C.textSecondary,
  cursor: "pointer",
  fontSize: "0.82rem",
  fontWeight: 800,
};

export default function DeepfakeGameExperience({
  stageIdx,
  stage,
  stages,
  experiment,
  storySections,
  promptText,
  readAloudText,
  experimentIds = [],
  gameWide = false,
  choiceForStage,
  stageChoiceIdx,
  isSynthesisStage,
  onChoose,
  onNext,
  onRestart,
  renderSynthesis,
}) {
  const reduced = useReducedMotion();
  const [completedActivities, setCompletedActivities] = useState({});
  const [dialogueComplete, setDialogueComplete] = useState(false);
  const [ariTalking, setAriTalking] = useState(false);
  const { progress } = useThoughtProgress();
  const achievementStatus = getAchievementStatus(progress, ACT_META[stage?.id]?.achievementId ? [ACT_META[stage.id].achievementId] : []);
  const meta = ACT_META[stage?.id] || ACT_META.synthesis;
  const narrative = useMemo(() => {
    const builtNarrative = storyText(storySections, promptText);
    if (builtNarrative) return builtNarrative;
    if (isSynthesisStage) return "Debrief: review the path you took and name the thinking habit you built.";
    return "";
  }, [isSynthesisStage, promptText, storySections]);
  const stageId = stage?.id || "synthesis";
  const stampFrames = DEEPFAKE_GAME_ASSETS.actStamps[stageId] || DEEPFAKE_GAME_ASSETS.actStamps.synthesis;
  const sceneFocus = DEEPFAKE_GAME_ASSETS.sceneFocus[stageId] || DEEPFAKE_GAME_ASSETS.sceneFocus.synthesis;
  const background = deepfakeBackgroundForStage(stageId);
  const revealBackground = deepfakeRevealBackgroundForStage(stageId);
  const achievementId = meta.achievementId;
  const mastered = achievementStatus.some((achievement) => achievement.earned);
  const activityComplete = isSynthesisStage || !achievementId || !!completedActivities[stage.id];
  const isLastChoice = stageIdx >= stages.length - 2;
  const trackerExperimentIds = experimentIds.length ? experimentIds : [experiment.id];
  const canUseActivity = reduced || dialogueComplete;

  useEffect(() => {
    setDialogueComplete(false);
  }, [stage?.id]);

  const handleDialogueStart = useCallback(() => {
    setDialogueComplete(false);
  }, []);

  const handleDialogueDone = useCallback(() => {
    setDialogueComplete(true);
  }, []);

  const handleTalkingChange = useCallback((talking) => {
    setAriTalking(talking);
  }, []);

  const completeActivity = () => {
    if (!achievementId || completedActivities[stage.id]) return;
    setCompletedActivities((current) => ({ ...current, [stage.id]: true }));
    recordThoughtProgress({
      type: "achievement_completed",
      achievementId,
      experimentId: experiment.id,
      gradeBand: experiment.gradeBands?.[0] || "6-8",
      stageId: stage.id,
      topicIds: experiment.topics || [],
    });
  };
  const ariPortraitIsIdle = reduced || !ariTalking;

	  return (
	    <section
      data-testid="deepfake-game-frame"
      className="deepfake-game-frame"
	      aria-label="SNES civic media quest"
	      style={{
	        border: `3px solid ${C.gold}55`,
        borderRadius: 10,
        background: C.midnight,
        boxShadow: `0 26px 80px rgba(0,0,0,0.36), 0 0 40px ${C.coral}12`,
        overflow: "hidden",
        marginTop: 16,
      }}
    >
      <style>{`
        @keyframes deepfake-choice-slide {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes deepfake-act-stamp-cycle-a {
          0%, 30% { opacity: 0; }
          31%, 63% { opacity: 1; }
          64%, 100% { opacity: 0; }
        }
        @keyframes deepfake-act-stamp-cycle-b {
          0%, 62% { opacity: 0; }
          63%, 92% { opacity: 1; }
          93%, 100% { opacity: 0; }
        }
        @keyframes deepfake-card-shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        @keyframes deepfake-portrait-mouth-cycle {
          0%, 33% { opacity: 0; }
          34%, 66% { opacity: 1; }
          67%, 100% { opacity: 0; }
        }
	        .deepfake-game-main-grid {
	          display: grid;
	          grid-template-columns: minmax(320px, 0.94fr) minmax(340px, 1.06fr);
	          gap: 14px;
	          align-items: start;
	        }
        .deepfake-portrait-stack {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .deepfake-act-stamp-stack {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .deepfake-portrait-stack img + img {
          position: absolute;
          inset: 0;
        }
        .deepfake-act-stamp-stack img + img {
          position: absolute;
          inset: 0;
        }
        .deepfake-act-stamp-frame {
          opacity: 0;
        }
        .deepfake-act-stamp-frame-1 {
          animation: deepfake-act-stamp-cycle-a 950ms steps(1, end) infinite;
        }
        .deepfake-act-stamp-frame-2 {
          animation: deepfake-act-stamp-cycle-b 950ms steps(1, end) infinite;
        }
        .deepfake-focused-scene.scene-expanded {
          opacity: 1;
          transform: scale(1);
          filter: saturate(1.08) brightness(1);
        }
        .deepfake-game-backdrop {
          --deepfake-backdrop-reveal: 180px;
          overflow: hidden;
        }
        .deepfake-game-backdrop-reveal {
          transition: transform 700ms ease, filter 700ms ease;
        }
        .deepfake-game-backdrop-shift {
          position: relative;
          z-index: 1;
        }
        .deepfake-card-shake {
          animation: deepfake-card-shake 260ms steps(2, end);
        }
        .deepfake-portrait-talking-a {
          opacity: 0;
          animation: deepfake-portrait-mouth-cycle 360ms steps(1, end) infinite;
        }
        .deepfake-portrait-talking-b {
          opacity: 0;
          animation: deepfake-portrait-mouth-cycle 360ms steps(1, end) 120ms infinite;
        }
	        @media (prefers-reduced-motion: reduce) {
	          .deepfake-act-stamp-frame,
            .deepfake-card-shake,
            .deepfake-game-backdrop,
            .deepfake-game-backdrop-reveal,
            .deepfake-portrait-talking-a,
            .deepfake-portrait-talking-b {
              animation: none !important;
              transition: none !important;
            }
	        }
	        @media (max-width: 760px) {
	          .deepfake-game-main-grid {
	            grid-template-columns: minmax(0, 1fr) !important;
              grid-template-areas:
                "stage"
                "hud"
                "scene"
                "dialogue"
                "activity" !important;
	          }
	          .deepfake-game-dialogue {
	            grid-template-columns: 66px minmax(0, 1fr) !important;
	            min-height: 0 !important;
	          }
            .deepfake-focused-scene {
              padding: 4px !important;
            }
            .deepfake-ari-portrait {
              width: 66px !important;
            }
            .deepfake-source-checker-grid {
              grid-template-columns: minmax(0, 1fr) !important;
            }
	        }
	      `}</style>

      <div style={{
        position: "relative",
	        display: "grid",
	        gridTemplateColumns: "minmax(0, 1fr)",
	        minHeight: gameWide ? 620 : 560,
	      }}>
        <div
          className="deepfake-game-backdrop"
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
          }}
        >
          <div
            className="deepfake-game-backdrop-reveal"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "calc(100% + var(--deepfake-backdrop-reveal, 180px))",
              backgroundImage: `linear-gradient(180deg, rgba(8,18,32,0.08), rgba(8,18,32,0.72)), url(${revealBackground || background})`,
              backgroundSize: "100% auto",
              backgroundPosition: "center top",
              backgroundRepeat: "no-repeat",
              imageRendering: "pixelated",
              filter: dialogueComplete || reduced ? "saturate(1.08)" : "saturate(1)",
              transform: dialogueComplete || reduced ? "translateY(0)" : "translateY(calc(var(--deepfake-backdrop-reveal, 180px) * -1))",
            }}
          />
        </div>
	        <div className="deepfake-game-backdrop-shift" style={{
	          display: "grid",
	          gap: 14,
	          alignContent: "start",
	          padding: gameWide ? "18px" : "14px",
	          backdropFilter: "saturate(1.08)",
	        }}>
	          <div
              className="deepfake-game-main-grid"
              style={{
                gridTemplateAreas: gameWide ? '"stage hud" "scene scene" "dialogue activity"' : '"stage" "hud" "scene" "dialogue" "activity"',
                gridTemplateColumns: gameWide ? "minmax(320px, 0.94fr) minmax(340px, 1.06fr)" : "minmax(0, 1fr)",
              }}
            >
            <div className="deepfake-stage-card" style={{
              gridArea: "stage",
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "9px 11px",
              borderRadius: 8,
              background: "rgba(8,18,32,0.82)",
              border: `1px solid ${C.gold}45`,
            }}>
              <AnimatedPixelStamp frames={stampFrames} alt={`${meta.act} ${meta.label} animated stamp`} reduced={reduced} />
              <div>
                <p style={{ color: C.gold, fontSize: "0.66rem", fontWeight: 900, letterSpacing: "0.13em", textTransform: "uppercase", marginBottom: 3 }}>
                  {meta.act} - {meta.label}
                </p>
                <h3 style={{ color: C.textPrimary, fontSize: "1.02rem", lineHeight: 1.2, margin: 0 }}>
                  {meta.mission}
                </h3>
              </div>
            </div>

            <div className="deepfake-game-hud" style={{ gridArea: "hud", minWidth: 0 }}>
              <ThoughtProgressPanel
                variant="hud"
                title="Ari's Goal Tracker"
                accent={C.gold}
                experimentIds={trackerExperimentIds}
              />
            </div>

            <FocusedSceneWindow
              src={sceneFocus}
              alt={`${meta.act} ${meta.label} focused scene`}
              expanded={dialogueComplete}
              reduced={reduced}
            />

	            <div
	              data-testid="deepfake-dialogue-panel"
	              className="deepfake-game-dialogue"
	              style={{
                gridArea: "dialogue",
	              display: "grid",
	              gridTemplateColumns: "92px 1fr",
	              gap: 12,
	              alignItems: "start",
	              padding: "14px",
	              borderRadius: 8,
	              background: "rgba(8,18,32,0.82)",
	              border: `2px solid ${C.teal}40`,
	              minHeight: 0,
	            }}>
              <PixelAssetFrame kind="portrait" width={92} className="deepfake-ari-portrait" glow={C.teal}>
                <div className="deepfake-portrait-stack">
                  <PixelImage src={DEEPFAKE_GAME_ASSETS.portraits.ariIdle} alt="Ari, the student guide" />
                  {!ariPortraitIsIdle && (
                    <>
                      <PixelImage src={DEEPFAKE_GAME_ASSETS.portraits.ariTalkA} decorative className="deepfake-portrait-talking-a" />
                      <PixelImage src={DEEPFAKE_GAME_ASSETS.portraits.ariTalkB} decorative className="deepfake-portrait-talking-b" />
                    </>
                  )}
                </div>
              </PixelAssetFrame>
              <div>
	                <p style={{ color: C.teal, fontSize: "0.66rem", fontWeight: 900, letterSpacing: "0.13em", textTransform: "uppercase", marginBottom: 5 }}>
	                  Ari says
	                </p>
	                <TypewriterText
	                  text={narrative}
	                  reduced={reduced}
	                  onStart={handleDialogueStart}
	                  onDone={handleDialogueDone}
                    onTalkingChange={handleTalkingChange}
	                />
	                <div style={{ marginTop: 8 }}>
	                  <ReadAloudButton text={readAloudText} variant="icon" rate={0.95} />
                </div>
              </div>
            </div>

	            <div data-testid="deepfake-activity-panel" style={{ gridArea: "activity", display: "grid", gap: 10, opacity: canUseActivity ? 1 : 0.78 }}>
	              {!canUseActivity ? (
	                <p style={{
	                  color: C.textMuted,
	                  fontSize: "0.82rem",
	                  lineHeight: 1.55,
	                  padding: "14px 15px",
	                  borderRadius: 8,
	                  border: `2px solid ${C.teal}35`,
	                  background: "rgba(8,18,32,0.84)",
	                }}>
	                  Complete Ari's dialogue to unlock the thinking move. Use Reveal text if you are ready to move ahead.
	                </p>
	              ) : isSynthesisStage ? (
	                <div style={{
	                  background: "rgba(8,18,32,0.9)",
	                  borderRadius: 8,
	                  padding: 14,
	                  border: `2px solid ${C.gold}45`,
	                  maxHeight: gameWide ? 620 : 540,
	                  overflowY: "auto",
	                }}>
	                  {renderSynthesis?.()}
	                </div>
              ) : (
                <>
                  <ActivityForStage
                    stageId={stage.id}
                    complete={!!activityComplete}
                    mastered={mastered}
                    onComplete={completeActivity}
                  />

                  {stageChoiceIdx == null ? (
                    activityComplete ? (
                      <ChoiceDeck stage={stage} onChoose={onChoose} reduced={reduced} />
                    ) : (
                      <p style={{
                        color: C.textMuted,
                        fontSize: "0.78rem",
                        lineHeight: 1.5,
                        padding: "10px 12px",
                        borderRadius: 8,
                        border: `1px solid ${C.border}`,
                        background: "rgba(8,18,32,0.78)",
                      }}>
                        Complete the thinking move above to unlock the choices. The game rewards verification, sorting claims, and keeping principles under pressure.
                      </p>
                    )
                  ) : (
                    <ReflectionWindow
                      option={choiceForStage}
                      stage={stage}
                      isLastChoice={isLastChoice}
                      onNext={onNext}
                      onRestart={onRestart}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
