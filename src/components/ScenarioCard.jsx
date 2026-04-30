import { useState, useEffect } from "react";
import { C } from "../theme.js";
import { useAudio } from "./shared.jsx";
import {
  Shell, ChoiceBtn, CounterArgument, ReflectionPanel, FurtherReadingList, EthicalLensTag,
} from "../experiments/ExperimentShared.jsx";
import { TOPIC_BY_ID } from "../data/topics.js";
import ReadAloudButton from "./ReadAloudButton.jsx";

// Modes:
//   "kid"     → K-5: large illustration, short prompt, big tappable choices, auto-mounted ReadAloud
//   "story"   → 6-8: illustrated header, paragraph prompt, 4 choice buttons
//   "canon"   → 9-12 / educators: full philosophical framing, lenses, citations, further reading

function Illustration({ src, emoji, alt, size = 200 }) {
  const [errored, setErrored] = useState(false);
  if (!src || errored) {
    return (
      <div
        role="img"
        aria-label={alt || emoji}
        style={{
          width: size, height: size,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: size * 0.55,
          background: `radial-gradient(circle, ${C.gold}10, transparent 70%)`,
          borderRadius: "50%",
          margin: "0 auto",
          animation: "scenarioFloat 4s ease-in-out infinite",
        }}
      >
        {emoji}
      </div>
    );
  }
  return (
    <img
      src={src} alt={alt || ""}
      onError={() => setErrored(true)}
      style={{
        width: size, height: size, objectFit: "contain",
        margin: "0 auto", display: "block",
        animation: "scenarioFloat 4s ease-in-out infinite",
      }}
    />
  );
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

export default function ScenarioCard({ experiment, mode = "story", onClose }) {
  const audio = useAudio();
  const [chosen, setChosen] = useState(null);
  const [showSource, setShowSource] = useState(false);

  useEffect(() => {
    setChosen(null);
    setShowSource(false);
  }, [experiment?.id]);

  if (!experiment) return null;

  const accent = TOPIC_BY_ID[experiment.topics[0]]?.color || C.gold;
  const promptText = mode === "kid" && experiment.promptShort ? experiment.promptShort : experiment.prompt;
  const chosenOption = chosen != null ? experiment.options[chosen] : null;

  const handleChoose = (idx) => {
    setChosen(idx);
    audio.playChime();
  };

  const handleRestart = () => {
    setChosen(null);
    audio.playClick();
  };

  // ──────────────── KID MODE (K-5) ────────────────
  if (mode === "kid") {
    return (
      <Shell color={accent}>
        <style>{`@keyframes scenarioFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}`}</style>

        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <Illustration src={experiment.illustration} emoji={experiment.emoji} alt={experiment.title} size={180} />
        </div>

        <h2 style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          color: C.textPrimary, fontSize: "1.6rem", textAlign: "center",
          marginBottom: 14, lineHeight: 1.25, fontWeight: 700,
        }}>
          {experiment.title}
        </h2>

        <p style={{
          color: C.textPrimary, fontSize: "1.15rem", lineHeight: 1.6,
          textAlign: "center", marginBottom: 18,
          fontFamily: "'Source Serif 4', Georgia, serif",
          maxWidth: 540, margin: "0 auto 18px",
        }}>
          {promptText}
        </p>

        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <ReadAloudButton text={`${experiment.title}. ${promptText}`} variant="primary" rate={0.85} label="Read it to me" />
        </div>

        {chosen == null ? (
          <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            {experiment.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleChoose(i)}
                style={{
                  padding: "18px 18px",
                  background: `linear-gradient(135deg, ${accent}10, ${accent}04)`,
                  border: `2px solid ${accent}30`,
                  borderRadius: 14,
                  color: C.textPrimary,
                  fontFamily: "'Source Serif 4', Georgia, serif",
                  fontSize: "1.02rem", fontWeight: 600, lineHeight: 1.4,
                  cursor: "pointer", textAlign: "left",
                  transition: "all 0.2s",
                  minHeight: 80, display: "flex", alignItems: "center", gap: 10,
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, ${accent}25, ${accent}10)`;
                  e.currentTarget.style.borderColor = accent + "70";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, ${accent}10, ${accent}04)`;
                  e.currentTarget.style.borderColor = accent + "30";
                  e.currentTarget.style.transform = "none";
                }}
              >
                <span style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: accent, color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.9rem", fontWeight: 700, flexShrink: 0,
                }}>{opt.label}</span>
                {opt.text}
              </button>
            ))}
          </div>
        ) : (
          <>
            <ReflectionPanel option={chosenOption} color={accent} />
            {experiment.counterpoint && (
              <CounterArgument color={C.coral}>
                {experiment.counterpoint}
              </CounterArgument>
            )}
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 18 }}>
              <button onClick={handleRestart} style={{
                padding: "10px 22px",
                background: `${C.gold}15`, border: `1px solid ${C.gold}40`,
                borderRadius: 999, color: C.gold,
                cursor: "pointer", fontSize: "0.86rem", fontWeight: 600,
              }}>↺ Try a different choice</button>
              {onClose && (
                <button onClick={onClose} style={{
                  padding: "10px 22px",
                  background: "transparent", border: `1px solid ${C.border}`,
                  borderRadius: 999, color: C.textMuted,
                  cursor: "pointer", fontSize: "0.86rem",
                }}>Pick a new experiment</button>
              )}
            </div>
            {(experiment.reference?.url || experiment.furtherReading?.length) && (
              <details style={{ marginTop: 24, padding: "12px 16px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10 }}>
                <summary style={{ cursor: "pointer", color: C.textSecondary, fontSize: "0.84rem", fontWeight: 600 }}>
                  📚 Where does this idea come from?
                </summary>
                <div style={{ marginTop: 10 }}>
                  {experiment.reference && (
                    <p style={{ color: C.textMuted, fontSize: "0.82rem", lineHeight: 1.6 }}>
                      {experiment.reference.url ? (
                        <a href={experiment.reference.url} target="_blank" rel="noopener noreferrer" style={{ color: C.textSecondary, borderBottom: `1px solid ${C.gold}40` }}>
                          {experiment.reference.text}
                        </a>
                      ) : experiment.reference.text}
                    </p>
                  )}
                  <FurtherReadingList items={experiment.furtherReading} color={accent} />
                </div>
              </details>
            )}
          </>
        )}
      </Shell>
    );
  }

  // ──────────────── STORY MODE (6-8) ────────────────
  if (mode === "story") {
    return (
      <Shell color={accent}>
        <style>{`@keyframes scenarioFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}`}</style>

        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 18, flexWrap: "wrap" }}>
          <Illustration src={experiment.illustration} emoji={experiment.emoji} alt={experiment.title} size={90} />
          <div style={{ flex: 1, minWidth: 220 }}>
            <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "1.55rem", fontWeight: 700, marginBottom: 6 }}>
              {experiment.title}
            </h2>
            <TopicChips topicIds={experiment.topics} />
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 20 }}>
          <ReadAloudButton text={`${experiment.title}. ${experiment.prompt}`} variant="icon" rate={0.95} />
          <p style={{ color: C.textPrimary, fontSize: "1rem", lineHeight: 1.7, fontFamily: "'Source Serif 4', Georgia, serif" }}>
            {experiment.prompt}
          </p>
        </div>

        {chosen == null ? (
          <div style={{ display: "grid", gap: 10, gridTemplateColumns: "1fr" }}>
            {experiment.options.map((opt, i) => (
              <ChoiceBtn key={i} onClick={() => handleChoose(i)} color={accent}>
                <span style={{ color: accent, fontWeight: 700, marginRight: 8 }}>{opt.label}.</span>
                {opt.text}
              </ChoiceBtn>
            ))}
          </div>
        ) : (
          <>
            <ReflectionPanel option={chosenOption} color={accent} />
            {experiment.counterpoint && (
              <CounterArgument color={C.coral}>
                {experiment.counterpoint}
              </CounterArgument>
            )}
            <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
              <button onClick={handleRestart} style={{
                padding: "8px 18px", background: `${C.gold}12`,
                border: `1px solid ${C.gold}35`, borderRadius: 6,
                color: C.gold, cursor: "pointer", fontSize: "0.84rem",
              }}>↺ Try another choice</button>
              <button onClick={() => setShowSource(s => !s)} style={{
                padding: "8px 18px", background: "transparent",
                border: `1px solid ${C.border}`, borderRadius: 6,
                color: C.textSecondary, cursor: "pointer", fontSize: "0.84rem",
              }}>{showSource ? "Hide" : "Show"} sources</button>
            </div>
            {showSource && (
              <div style={{ marginTop: 16, padding: 16, background: C.surface, borderRadius: 10, border: `1px solid ${C.border}` }}>
                {experiment.reference && (
                  <p style={{ color: C.textSecondary, fontSize: "0.85rem", lineHeight: 1.6, marginBottom: 8 }}>
                    <strong style={{ color: C.gold }}>Where this comes from: </strong>
                    {experiment.reference.url ? (
                      <a href={experiment.reference.url} target="_blank" rel="noopener noreferrer" style={{ color: C.textPrimary, borderBottom: `1px solid ${C.gold}40` }}>
                        {experiment.reference.text}
                      </a>
                    ) : experiment.reference.text}
                  </p>
                )}
                <FurtherReadingList items={experiment.furtherReading} color={accent} />
              </div>
            )}
          </>
        )}
      </Shell>
    );
  }

  // ──────────────── CANON MODE (9-12 + educators) ────────────────
  return (
    <Shell color={accent}>
      <style>{`@keyframes scenarioFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}`}</style>

      <div style={{ marginBottom: 22 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 18, flexWrap: "wrap", marginBottom: 12 }}>
          <Illustration src={experiment.illustration} emoji={experiment.emoji} alt={experiment.title} size={100} />
          <div style={{ flex: 1, minWidth: 220 }}>
            <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "1.7rem", fontWeight: 700, marginBottom: 8, lineHeight: 1.2 }}>
              {experiment.title}
            </h2>
            <p style={{ color: C.textSecondary, fontSize: "0.95rem", lineHeight: 1.5, marginBottom: 10, fontStyle: "italic" }}>
              {experiment.tagline}
            </p>
            <TopicChips topicIds={experiment.topics} />
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginTop: 18 }}>
          <ReadAloudButton text={`${experiment.title}. ${experiment.prompt}`} variant="icon" rate={0.95} />
          <p style={{ color: C.textPrimary, fontSize: "1.02rem", lineHeight: 1.75, fontFamily: "'Source Serif 4', Georgia, serif" }}>
            {experiment.prompt}
          </p>
        </div>
      </div>

      {chosen == null ? (
        <div style={{ display: "grid", gap: 12 }}>
          {experiment.options.map((opt, i) => (
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
              onMouseOver={(e) => {
                e.currentTarget.style.background = `${accent}15`;
                e.currentTarget.style.borderColor = accent + "55";
                e.currentTarget.style.transform = "translateX(4px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = `${accent}06`;
                e.currentTarget.style.borderColor = accent + "25";
                e.currentTarget.style.transform = "none";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <span style={{ color: accent, fontWeight: 700 }}>{opt.label}.</span>
                {opt.lens && <EthicalLensTag lens={opt.lens} color={accent} />}
              </div>
              <div style={{ paddingLeft: 22 }}>{opt.text}</div>
            </button>
          ))}
        </div>
      ) : (
        <>
          <ReflectionPanel option={chosenOption} color={accent} />
          {experiment.counterpoint && (
            <CounterArgument color={C.coral}>
              {experiment.counterpoint}
            </CounterArgument>
          )}

          <div style={{ marginTop: 22, padding: 18, background: C.surface, borderRadius: 12, border: `1px solid ${C.border}` }}>
            {experiment.reference && (
              <p style={{ color: C.textSecondary, fontSize: "0.86rem", lineHeight: 1.6, marginBottom: 10 }}>
                <strong style={{ color: C.gold, display: "block", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>
                  Source
                </strong>
                {experiment.reference.url ? (
                  <a href={experiment.reference.url} target="_blank" rel="noopener noreferrer" style={{ color: C.textPrimary, borderBottom: `1px solid ${C.gold}40` }}>
                    {experiment.reference.text}
                  </a>
                ) : experiment.reference.text}
              </p>
            )}
            <FurtherReadingList items={experiment.furtherReading} color={accent} />
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
            <button onClick={handleRestart} style={{
              padding: "9px 20px", background: `${C.gold}12`,
              border: `1px solid ${C.gold}35`, borderRadius: 6,
              color: C.gold, cursor: "pointer", fontSize: "0.84rem", fontWeight: 600,
            }}>↺ Try another choice</button>
            {onClose && (
              <button onClick={onClose} style={{
                padding: "9px 20px", background: "transparent",
                border: `1px solid ${C.border}`, borderRadius: 6,
                color: C.textMuted, cursor: "pointer", fontSize: "0.84rem",
              }}>← Back to all</button>
            )}
          </div>
        </>
      )}
    </Shell>
  );
}
