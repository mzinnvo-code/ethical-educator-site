import { useState, useEffect } from "react";
import { C } from "../theme.js";
import { useAudio } from "./shared.jsx";
import {
  Shell, ChoiceBtn, CounterArgument, ReflectionPanel, EthicalLensTag,
} from "../experiments/ExperimentShared.jsx";
import { TOPIC_BY_ID } from "../data/topics.js";
import ReadAloudButton from "./ReadAloudButton.jsx";
import StageNav from "./StageNav.jsx";
import SynthesisPanel from "./SynthesisPanel.jsx";
import TeacherKit from "./TeacherKit.jsx";

// Resolve a stage prompt that may be a string OR a function ({chose}) => string
function resolvePrompt(stage, chose, mode) {
  if (typeof stage.prompt === "function") return stage.prompt({ chose, mode });
  return stage.prompt;
}

function resolveStorySections(stage, chose, mode) {
  const sections = typeof stage.storySections === "function"
    ? stage.storySections({ chose, mode })
    : stage.storySections;
  return Array.isArray(sections) ? sections.filter(section => section?.text) : [];
}

function sectionsToSpeech(sections) {
  return sections
    .map(section => `${section.label ? `${section.label}. ` : ""}${section.text}`)
    .join(" ");
}

function cleanSpeechPart(part) {
  return String(part)
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[.?!]+$/g, "");
}

function buildReadAloudText(parts) {
  return parts
    .filter(Boolean)
    .map(cleanSpeechPart)
    .filter(Boolean)
    .join(". ");
}

function StorySections({ sections, accent }) {
  if (!sections.length) return null;
  return (
    <div style={{
      display: "grid", gap: 10, margin: "0 auto 18px",
      maxWidth: 680, textAlign: "left",
    }}>
      {sections.map((section, index) => (
        <section
          key={`${section.label || "section"}-${index}`}
          style={{
            background: `linear-gradient(135deg, ${accent}10, ${accent}04)`,
            border: `1px solid ${accent}25`,
            borderRadius: 12,
            padding: "13px 15px",
          }}
        >
          {section.label && (
            <p style={{
              color: accent,
              fontSize: "0.64rem",
              fontWeight: 800,
              letterSpacing: "0.13em",
              textTransform: "uppercase",
              marginBottom: 5,
            }}>
              {section.label}
            </p>
          )}
          <p style={{
            color: C.textPrimary,
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: "1.02rem",
            lineHeight: 1.65,
            margin: 0,
          }}>
            {section.text}
          </p>
        </section>
      ))}
    </div>
  );
}

// If the experiment has no `stages`, synthesize a single-stage shape from
// the legacy fields (so unstaged scenarios still work).
function synthesizeStages(experiment) {
  return [
    {
      id: "single",
      kicker: null,
      title: experiment.title,
      prompt: experiment.prompt,
      promptShort: experiment.promptShort,
      options: experiment.options,
      counterpoint: experiment.counterpoint,
    },
  ];
}

function TopicChips({ topicIds }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
      {topicIds.map(id => {
        const t = TOPIC_BY_ID[id];
        if (!t) return null;
        return (
          <span key={id} style={{
            padding: "2px 8px",
            background: `${t.color}15`, color: t.color,
            borderRadius: 4, fontSize: "0.66rem",
            fontWeight: 600, letterSpacing: "0.05em",
            border: `1px solid ${t.color}25`,
          }}>{t.label}</span>
        );
      })}
    </div>
  );
}

function TeacherToggle({ active, onToggle, accent }) {
  return (
    <button
      onClick={onToggle}
      aria-pressed={active}
      aria-label={active ? "Hide teacher lesson plan" : "Show teacher lesson plan"}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "5px 12px", borderRadius: 999,
        background: active ? `${accent}25` : "transparent",
        border: `1px solid ${active ? accent + "60" : C.border}`,
        color: active ? accent : C.textMuted,
        cursor: "pointer", fontSize: "0.74rem", fontWeight: 600,
        letterSpacing: "0.04em",
        transition: "all 0.2s",
      }}
    >
      <span aria-hidden="true">🍎</span>
      {active ? "Hide teacher kit" : "For teachers"}
    </button>
  );
}

export default function ScenarioCard({ experiment, mode = "story", onClose, onRecordChoice }) {
  const audio = useAudio();
  const stages = experiment.stages || synthesizeStages(experiment);
  const [stageIdx, setStageIdx] = useState(0);
  const [chose, setChose] = useState([]); // chosen Option per stage (sparse — synthesis stages get null)
  const [stageChoiceIdx, setStageChoiceIdx] = useState(null); // index of currently chosen option for the active stage
  const [showTeacherKit, setShowTeacherKit] = useState(false);

  useEffect(() => {
    setStageIdx(0);
    setChose([]);
    setStageChoiceIdx(null);
    setShowTeacherKit(false);
  }, [experiment?.id]);

  if (!experiment) return null;

  const accent = TOPIC_BY_ID[experiment.topics[0]]?.color || C.gold;
  const stage = stages[stageIdx];
  const isSynthesisStage = !!stage.synthesis;
  const isLastStage = stageIdx === stages.length - 1;
  const Scene = experiment.scene || null;
  const elementaryGrade = experiment.gradeLevels?.[0];
  const useShortKidPrompt = mode === "kid" && (elementaryGrade === "k" || elementaryGrade === "1");
  const storySections = resolveStorySections(stage, chose, mode);

  // K-1 keeps very short read-aloud prompts. Older elementary students see
  // the fuller scenario copy, with optional sectioned story beats.
  const promptText = useShortKidPrompt && (stage.promptShort || experiment.promptShort)
    ? (stage.promptShort || experiment.promptShort)
    : resolvePrompt(stage, chose, mode);
  const readAloudText = buildReadAloudText([
    stage.title || experiment.title,
    sectionsToSpeech(storySections),
    promptText,
  ]);

  const choiceForStage = stageChoiceIdx != null ? stage.options?.[stageChoiceIdx] : null;

  const handleChoose = (idx) => {
    if (!stage.options) return;
    setStageChoiceIdx(idx);
    const opt = stage.options[idx];
    const weighty = opt?.lens === "deontological" || stage.weighty;
    if (weighty) audio.playDeep();
    else audio.playChime();
  };

  const handleNext = () => {
    if (stageChoiceIdx != null) {
      const opt = stage.options[stageChoiceIdx];
      // Record this stage's choice
      const newChose = [...chose, opt];
      setChose(newChose);
      if (opt?.lens) onRecordChoice?.(opt.lens, experiment.id);
    } else {
      setChose(prev => [...prev, null]);
    }
    setStageChoiceIdx(null);
    audio.playReveal();
    setStageIdx(i => Math.min(i + 1, stages.length - 1));
  };

  const handleAdvanceFromSynthesis = () => {
    audio.playClick();
    onClose?.();
  };

  const handleStageJump = (idx) => {
    if (idx >= stageIdx) return; // can only jump back
    audio.playClick();
    setStageIdx(idx);
    setChose(prev => prev.slice(0, idx));
    setStageChoiceIdx(null);
  };

  const handleRestart = () => {
    audio.playClick();
    setStageIdx(0);
    setChose([]);
    setStageChoiceIdx(null);
  };

  // Header bar: kicker, stage indicator + teacher kit toggle
  const HeaderBar = () => (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 12, justifyContent: "space-between", flexWrap: "wrap" }}>
      <StageNav
        stages={stages}
        currentIdx={stageIdx}
        onSelect={handleStageJump}
        accent={accent}
      />
      {experiment.teacherKit && (
        <TeacherToggle
          active={showTeacherKit}
          onToggle={() => setShowTeacherKit(s => !s)}
          accent={accent}
        />
      )}
    </div>
  );

  // Teacher kit (rendered below the Shell in every mode)
  const TeacherKitBelow = () => (
    showTeacherKit && experiment.teacherKit
      ? <TeacherKit kit={experiment.teacherKit} experiment={experiment} accent={accent} />
      : null
  );

  // ──────────────── KID MODE (K-5) ────────────────
  if (mode === "kid") {
    return (
      <>
      <Shell color={accent}>
        <HeaderBar />

        {Scene && <Scene stage={stageIdx} chose={chose} mode={mode} />}

        {!isSynthesisStage && (
          <>
            {stage.title && (
              <h2 style={{
                fontFamily: "'Source Serif 4', Georgia, serif",
                color: C.textPrimary, fontSize: "1.55rem", textAlign: "center",
                marginBottom: 14, lineHeight: 1.25, fontWeight: 700,
              }}>
                {stage.title}
              </h2>
            )}

            <StorySections sections={storySections} accent={accent} />

            {storySections.length ? (
              <div style={{
                maxWidth: 640,
                margin: "0 auto 18px",
                padding: "14px 16px",
                borderRadius: 12,
                background: `${accent}12`,
                border: `1px solid ${accent}30`,
                textAlign: "center",
              }}>
                <p style={{
                  color: accent,
                  fontSize: "0.66rem",
                  fontWeight: 800,
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}>
                  The question
                </p>
                <p style={{
                  color: C.textPrimary, fontSize: "1.06rem", lineHeight: 1.6,
                  fontFamily: "'Source Serif 4', Georgia, serif", margin: 0,
                }}>
                  {promptText}
                </p>
              </div>
            ) : (
              <p style={{
                color: C.textPrimary, fontSize: "1.1rem", lineHeight: 1.6,
                textAlign: "center", marginBottom: 18,
                fontFamily: "'Source Serif 4', Georgia, serif",
                maxWidth: 540, margin: "0 auto 18px",
              }}>
                {promptText}
              </p>
            )}

            <div style={{ textAlign: "center", marginBottom: 22 }}>
              <ReadAloudButton text={readAloudText} variant="primary" rate={0.85} label="Read it to me" />
            </div>

            {stageChoiceIdx == null ? (
              <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
                {stage.options?.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleChoose(i)}
                    style={{
                      padding: "16px 16px",
                      background: `linear-gradient(135deg, ${accent}10, ${accent}04)`,
                      border: `2px solid ${accent}30`,
                      borderRadius: 14,
                      color: C.textPrimary,
                      fontFamily: "'Source Serif 4', Georgia, serif",
                      fontSize: "1rem", fontWeight: 600, lineHeight: 1.4,
                      cursor: "pointer", textAlign: "left",
                      transition: "all 0.2s",
                      minHeight: 76, display: "flex", alignItems: "center", gap: 10,
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.background = `linear-gradient(135deg, ${accent}25, ${accent}10)`; e.currentTarget.style.borderColor = accent + "70"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = `linear-gradient(135deg, ${accent}10, ${accent}04)`; e.currentTarget.style.borderColor = accent + "30"; e.currentTarget.style.transform = "none"; }}
                  >
                    <span style={{
                      width: 30, height: 30, borderRadius: "50%",
                      background: accent, color: "#fff",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.86rem", fontWeight: 700, flexShrink: 0,
                    }}>{opt.label}</span>
                    {opt.text}
                  </button>
                ))}
              </div>
            ) : (
              <>
                <ReflectionPanel option={choiceForStage} color={accent} />
                {stage.counterpoint && (
                  <CounterArgument color={C.coral}>{stage.counterpoint}</CounterArgument>
                )}
                <NextOrFinish isLast={isLastStage} accent={accent} onNext={handleNext} onRestart={handleRestart} />
              </>
            )}
          </>
        )}

        {isSynthesisStage && (
          <SynthesisStage stage={stage} chose={chose} experiment={experiment} accent={accent}
            onRestart={handleRestart} onClose={handleAdvanceFromSynthesis} mode={mode} />
        )}
      </Shell>
      <TeacherKitBelow />
      </>
    );
  }

  // ──────────────── STORY MODE (6-8) ────────────────
  if (mode === "story") {
    return (
      <>
      <Shell color={accent}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 14, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 220 }}>
            <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "1.55rem", fontWeight: 700, marginBottom: 6 }}>
              {experiment.title}
            </h2>
            <TopicChips topicIds={experiment.topics} />
          </div>
        </div>

        <HeaderBar />

        {Scene && <Scene stage={stageIdx} chose={chose} mode={mode} />}

        {!isSynthesisStage && (
          <>
            {stage.title && stage.title !== experiment.title && (
              <h3 style={{
                fontFamily: "'Source Serif 4', Georgia, serif",
                color: accent, fontSize: "1.1rem", fontWeight: 700,
                marginBottom: 8,
              }}>{stage.title}</h3>
            )}

            <StorySections sections={storySections} accent={accent} />

            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 18 }}>
              <ReadAloudButton text={readAloudText} variant="icon" rate={0.95} />
              {storySections.length ? (
                <div style={{
                  flex: 1,
                  padding: "13px 15px",
                  borderRadius: 12,
                  background: `${accent}10`,
                  border: `1px solid ${accent}28`,
                }}>
                  <p style={{
                    color: accent,
                    fontSize: "0.62rem",
                    fontWeight: 800,
                    letterSpacing: "0.13em",
                    textTransform: "uppercase",
                    marginBottom: 5,
                  }}>
                    The question
                  </p>
                  <p style={{ color: C.textPrimary, fontSize: "1rem", lineHeight: 1.7, fontFamily: "'Source Serif 4', Georgia, serif", margin: 0 }}>
                    {promptText}
                  </p>
                </div>
              ) : (
                <p style={{ color: C.textPrimary, fontSize: "1rem", lineHeight: 1.7, fontFamily: "'Source Serif 4', Georgia, serif" }}>
                  {promptText}
                </p>
              )}
            </div>

            {stageChoiceIdx == null ? (
              <>
                <SteelmanRule />
                <div style={{ display: "grid", gap: 10 }}>
                  {stage.options?.map((opt, i) => (
                    <ChoiceBtn key={i} onClick={() => handleChoose(i)} color={accent}>
                      <span style={{ color: accent, fontWeight: 700, marginRight: 8 }}>{opt.label}.</span>
                      {opt.text}
                    </ChoiceBtn>
                  ))}
                </div>
              </>
            ) : (
              <>
                <ReflectionPanel option={choiceForStage} color={accent} />
                {stage.counterpoint && <CounterArgument color={C.coral}>{stage.counterpoint}</CounterArgument>}
                <NextOrFinish isLast={isLastStage} accent={accent} onNext={handleNext} onRestart={handleRestart} />
              </>
            )}
          </>
        )}

        {isSynthesisStage && (
          <SynthesisStage stage={stage} chose={chose} experiment={experiment} accent={accent}
            onRestart={handleRestart} onClose={handleAdvanceFromSynthesis} mode={mode} />
        )}
      </Shell>
      <TeacherKitBelow />
      </>
    );
  }

  // ──────────────── CANON MODE (9-12 + educators) ────────────────
  return (
    <>
    <Shell color={accent}>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "1.7rem", fontWeight: 700, marginBottom: 8, lineHeight: 1.2 }}>
          {experiment.title}
        </h2>
        <p style={{ color: C.textSecondary, fontSize: "0.95rem", lineHeight: 1.5, marginBottom: 10, fontStyle: "italic" }}>
          {experiment.tagline}
        </p>
        <TopicChips topicIds={experiment.topics} />
      </div>

      <HeaderBar />

      {experiment.id === "marys-room" && (
        <div style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
          marginBottom: 16,
          borderRadius: 10,
          overflow: "hidden",
          background: "#060a12",
          border: "1px solid rgba(200,152,48,0.18)",
        }}>
          <iframe
            src="/animations/marys-room/index.html"
            title="Mary's Room — animated thought experiment"
            loading="lazy"
            allow="autoplay; fullscreen"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
          />
        </div>
      )}
      {Scene && <Scene stage={stageIdx} chose={chose} mode={mode} />}

      {!isSynthesisStage && (
        <>
          {stage.title && stage.title !== experiment.title && (
            <h3 style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              color: accent, fontSize: "1.16rem", fontWeight: 700,
              marginBottom: 10,
            }}>{stage.title}</h3>
          )}

          <StorySections sections={storySections} accent={accent} />

          <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 18 }}>
            <ReadAloudButton text={readAloudText} variant="icon" rate={0.95} />
            {storySections.length ? (
              <div style={{
                flex: 1,
                padding: "13px 15px",
                borderRadius: 12,
                background: `${accent}10`,
                border: `1px solid ${accent}28`,
              }}>
                <p style={{
                  color: accent,
                  fontSize: "0.62rem",
                  fontWeight: 800,
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                  marginBottom: 5,
                }}>
                  The question
                </p>
                <p style={{
                  color: C.textPrimary,
                  fontSize: "1rem",
                  lineHeight: 1.7,
                  fontFamily: "'Source Serif 4', Georgia, serif",
                  margin: 0,
                }}>
                  {promptText}
                </p>
              </div>
            ) : (
              <p style={{ color: C.textPrimary, fontSize: "1.02rem", lineHeight: 1.75, fontFamily: "'Source Serif 4', Georgia, serif" }}>
                {promptText}
              </p>
            )}
          </div>

          {stageChoiceIdx == null ? (
            <>
            <SteelmanRule />
            <div style={{ display: "grid", gap: 12 }}>
              {stage.options?.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleChoose(i)}
                  style={{
                    padding: "16px 20px",
                    background: `${accent}06`,
                    border: `1px solid ${accent}25`,
                    borderRadius: 10, textAlign: "left",
                    color: C.textPrimary,
                    fontFamily: "'Source Serif 4', Georgia, serif",
                    fontSize: "0.96rem", lineHeight: 1.6,
                    cursor: "pointer", transition: "all 0.2s",
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.background = `${accent}15`; e.currentTarget.style.borderColor = accent + "55"; e.currentTarget.style.transform = "translateX(4px)"; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = `${accent}06`; e.currentTarget.style.borderColor = accent + "25"; e.currentTarget.style.transform = "none"; }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <span style={{ color: accent, fontWeight: 700 }}>{opt.label}.</span>
                    {opt.lens && <EthicalLensTag lens={opt.lens} color={accent} />}
                  </div>
                  <div style={{ paddingLeft: 22 }}>{opt.text}</div>
                </button>
              ))}
            </div>
            </>
          ) : (
            <>
              <ReflectionPanel option={choiceForStage} color={accent} />
              {stage.counterpoint && <CounterArgument color={C.coral}>{stage.counterpoint}</CounterArgument>}
              <NextOrFinish isLast={isLastStage} accent={accent} onNext={handleNext} onRestart={handleRestart} />
            </>
          )}
        </>
      )}

      {isSynthesisStage && (
        <SynthesisStage stage={stage} chose={chose} experiment={experiment} accent={accent}
          onRestart={handleRestart} onClose={handleAdvanceFromSynthesis} mode={mode} />
      )}
    </Shell>
    <TeacherKitBelow />
    </>
  );
}

function SteelmanRule() {
  return (
    <p style={{
      color: C.textMuted,
      fontSize: "0.82rem",
      fontStyle: "italic",
      lineHeight: 1.55,
      marginBottom: 12,
      paddingLeft: 10,
      borderLeft: `2px solid ${C.border}`,
    }}>
      Before you choose: which of these would you most want to push back on, and what's the strongest version of it you could write?
    </p>
  );
}

function NextOrFinish({ isLast, accent, onNext, onRestart }) {
  return (
    <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
      <button
        onClick={onNext}
        style={{
          padding: "10px 22px",
          background: `linear-gradient(135deg, ${accent}, ${accent}dd)`,
          color: "#fff", border: "none", borderRadius: 8,
          cursor: "pointer", fontSize: "0.88rem", fontWeight: 600,
          boxShadow: `0 4px 14px ${accent}40`,
        }}
      >
        {isLast ? "See reflection →" : "Continue →"}
      </button>
      <button
        onClick={onRestart}
        style={{
          padding: "10px 18px",
          background: "transparent",
          border: `1px solid ${C.border}`,
          borderRadius: 8, color: C.textMuted,
          cursor: "pointer", fontSize: "0.84rem",
        }}
      >
        ↺ Restart
      </button>
    </div>
  );
}

function SynthesisStage({ stage, chose, experiment, accent, onRestart, onClose, mode }) {
  const customSynthesis = typeof stage.synthesis === "function"
    ? stage.synthesis({ chose, experiment, accent, mode })
    : null;

  return (
    <div>
      {stage.title && (
        <h3 style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          color: accent, fontSize: "1.2rem", fontWeight: 700,
          marginBottom: 12,
        }}>{stage.title}</h3>
      )}

      {customSynthesis || (
        <SynthesisPanel
          chose={chose}
          experiment={experiment}
          accent={accent}
          positions={stage.positions || []}
        />
      )}

      <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
        <button
          onClick={onRestart}
          style={{
            padding: "10px 20px", background: `${C.gold}15`,
            border: `1px solid ${C.gold}40`, borderRadius: 8,
            color: C.gold, cursor: "pointer", fontSize: "0.86rem", fontWeight: 600,
          }}
        >↺ Run it again</button>
        {onClose && (
          <button
            onClick={onClose}
            style={{
              padding: "10px 20px", background: "transparent",
              border: `1px solid ${C.border}`, borderRadius: 8,
              color: C.textMuted, cursor: "pointer", fontSize: "0.86rem",
            }}
          >← Pick a new experiment</button>
        )}
      </div>
    </div>
  );
}
