import { useMemo, useState } from "react";
import { C } from "../theme.js";
import {
  PageContainer,
  Narrow,
  SectionLabel,
  SectionTitle,
  Subtitle,
  FadeIn,
} from "../components/shared.jsx";
import { track } from "../lib/analytics.js";
import { SCENARIOS, DIMENSIONS, scoreVerdict } from "../data/aiRubric.js";

/**
 * /ai-rubric — AI Use Rubric
 *
 * Wizard:
 *   1. Pick a scenario (or describe a custom one)
 *   2. Six dimension questions, each with 3 weighted answers
 *   3. Verdict + dimension-by-dimension breakdown with linked
 *      thought experiments
 *
 * The verdict is intentionally a discussion scaffold, not a categorical
 * judge: "Go ahead", "Worth a real conversation first", or "Redesign
 * before adopting". Output framed to help schools make and defend the
 * decision, not to take the decision away from them.
 */
export default function AIRubric({ navigate }) {
  const [scenario, setScenario] = useState(null);
  const [customSummary, setCustomSummary] = useState("");
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(1);
  const totalSteps = 1 + DIMENSIONS.length + 1; // pick + 6 questions + result

  function pickScenario(s) {
    setScenario(s);
    setCustomSummary("");
    setAnswers(s.suggested ? { ...s.suggested } : {});
    track("rubric_scenario_picked", { page: "ai-rubric", slug: s.id });
    setStep(2);
  }

  function pickCustom() {
    setScenario({ id: "custom", title: "Custom scenario", summary: customSummary });
    setAnswers({});
    track("rubric_scenario_picked", { page: "ai-rubric", slug: "custom" });
    setStep(2);
  }

  function setAnswer(dimId, weight) {
    setAnswers((prev) => ({ ...prev, [dimId]: weight }));
  }

  function next() { setStep((s) => Math.min(s + 1, totalSteps)); }
  function back() { setStep((s) => Math.max(s - 1, 1)); }

  function finish() {
    const verdict = scoreVerdict(answers);
    track("rubric_completed", {
      page: "ai-rubric",
      slug: scenario?.id || "custom",
      placement: verdict.id,
    });
    setStep(totalSteps);
  }

  function reset() {
    setScenario(null);
    setCustomSummary("");
    setAnswers({});
    setStep(1);
  }

  const verdict = useMemo(() => scoreVerdict(answers), [answers]);

  // Step 1 = pick scenario. Steps 2..7 = DIMENSIONS[0..5]. Step 8 = result.
  const dimensionIndex = step - 2;
  const onResultStep = step === totalSteps;
  const currentDimension = dimensionIndex >= 0 && dimensionIndex < DIMENSIONS.length
    ? DIMENSIONS[dimensionIndex]
    : null;

  return (
    <div style={{ background: C.bg, paddingTop: 60, paddingBottom: 80 }}>
      <PageContainer>
        <Narrow>
          <FadeIn>
            <SectionLabel>AI Use Rubric</SectionLabel>
            <SectionTitle>Should we use AI for this?</SectionTitle>
            <Subtitle>
              A six-dimension scaffold for teachers and school leaders evaluating a proposed AI use. The output isn't a verdict from on high — it's a structured breakdown you can take into a department meeting, a leadership retreat, or a school board conversation.
            </Subtitle>
          </FadeIn>

          {!onResultStep && (
            <FadeIn delay={0.04}>
              <ProgressDots step={step} total={totalSteps - 1} />
            </FadeIn>
          )}

          {step === 1 && (
            <PickScenario
              scenarios={SCENARIOS}
              customSummary={customSummary}
              onCustomChange={setCustomSummary}
              onPick={pickScenario}
              onPickCustom={pickCustom}
            />
          )}

          {currentDimension && (
            <DimensionQuestion
              scenario={scenario}
              dimension={currentDimension}
              answer={answers[currentDimension.id]}
              onAnswer={(weight) => {
                setAnswer(currentDimension.id, weight);
                // Auto-advance after a short delay so the selection is visible.
                setTimeout(() => {
                  if (dimensionIndex < DIMENSIONS.length - 1) next();
                  else finish();
                }, 240);
              }}
              onBack={back}
              isFirst={dimensionIndex === 0}
              isLast={dimensionIndex === DIMENSIONS.length - 1}
            />
          )}

          {onResultStep && (
            <Result
              scenario={scenario}
              answers={answers}
              verdict={verdict}
              onReset={reset}
              onBack={back}
              navigate={navigate}
            />
          )}
        </Narrow>
      </PageContainer>
    </div>
  );
}

function ProgressDots({ step, total }) {
  return (
    <div style={{ display: "flex", gap: 6, margin: "26px 0 20px", alignItems: "center" }}>
      {Array.from({ length: total }).map((_, i) => {
        const dotStep = i + 1;
        return (
          <span key={dotStep} aria-hidden="true" style={{
            width: dotStep === step ? 26 : 8,
            height: 6,
            borderRadius: 3,
            background: dotStep <= step ? C.gold : C.border,
            transition: "all 0.25s",
          }} />
        );
      })}
      <span style={{ marginLeft: 10, color: C.textMuted, fontSize: "0.78rem" }}>
        Step {step} of {total}
      </span>
    </div>
  );
}

function PickScenario({ scenarios, customSummary, onCustomChange, onPick, onPickCustom }) {
  return (
    <FadeIn delay={0.06}>
      <div style={{ marginTop: 6 }}>
        <h2 style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          color: C.textPrimary, fontSize: "1.5rem", fontWeight: 700,
          lineHeight: 1.25, marginBottom: 8,
        }}>What are we evaluating?</h2>
        <p style={{ color: C.textMuted, fontSize: "0.88rem", marginBottom: 18 }}>
          Pick a common scenario to pre-fill best-guess answers (you can change every one), or describe your own.
        </p>

        <div style={{ display: "grid", gap: 10, marginBottom: 24 }}>
          {scenarios.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => onPick(s)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "14px 18px",
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                cursor: "pointer",
                color: "inherit",
                font: "inherit",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = C.gold + "70"; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = C.border; }}
            >
              <p style={{
                color: C.textPrimary, fontWeight: 600, fontSize: "0.98rem",
                marginBottom: 4, fontFamily: "'Source Serif 4', Georgia, serif",
              }}>{s.title}</p>
              <p style={{ color: C.textMuted, fontSize: "0.82rem", lineHeight: 1.55 }}>{s.summary}</p>
            </button>
          ))}
        </div>

        <div style={{
          padding: "16px 18px",
          background: `${C.teal}08`,
          border: `1px solid ${C.teal}33`,
          borderRadius: 12,
        }}>
          <label htmlFor="rubric-custom" style={{
            display: "block",
            fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em",
            textTransform: "uppercase", color: C.teal, marginBottom: 8,
          }}>Or describe your own</label>
          <textarea
            id="rubric-custom"
            value={customSummary}
            onChange={(e) => onCustomChange(e.target.value)}
            placeholder="e.g. Teachers use Khanmigo with 7th-grade math classes during practice time."
            rows={3}
            style={{
              width: "100%",
              padding: "10px 12px",
              background: "rgba(11,22,34,0.6)",
              border: `1px solid ${C.teal}55`,
              borderRadius: 8,
              color: C.textPrimary,
              fontFamily: "inherit",
              fontSize: "0.9rem",
              lineHeight: 1.55,
              resize: "vertical",
            }}
          />
          <button
            type="button"
            onClick={onPickCustom}
            disabled={customSummary.trim().length < 8}
            style={{
              marginTop: 10,
              padding: "9px 16px",
              background: customSummary.trim().length >= 8
                ? `linear-gradient(135deg, ${C.teal}, ${C.ocean})`
                : C.surface,
              color: customSummary.trim().length >= 8 ? "#fff" : C.textMuted,
              border: "none",
              borderRadius: 8,
              fontWeight: 600,
              fontSize: "0.86rem",
              cursor: customSummary.trim().length >= 8 ? "pointer" : "not-allowed",
              fontFamily: "inherit",
            }}
          >Use this scenario →</button>
        </div>
      </div>
    </FadeIn>
  );
}

function DimensionQuestion({ scenario, dimension, answer, onAnswer, onBack, isFirst, isLast }) {
  return (
    <FadeIn delay={0.06}>
      <div style={{ marginTop: 6 }}>
        <p style={{
          fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em",
          textTransform: "uppercase", color: C.gold, marginBottom: 8,
        }}>
          {dimension.label} — <span style={{ color: C.textMuted }}>{dimension.short}</span>
        </p>
        <h2 style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          color: C.textPrimary, fontSize: "1.4rem", fontWeight: 700,
          lineHeight: 1.3, marginBottom: 6,
        }}>{dimension.question}</h2>
        {scenario?.summary && (
          <p style={{
            color: C.sand, fontStyle: "italic", fontSize: "0.88rem",
            lineHeight: 1.6, marginBottom: 18,
            padding: "10px 14px", background: `${C.gold}08`,
            borderLeft: `3px solid ${C.gold}66`, borderRadius: "0 8px 8px 0",
          }}>Scenario: {scenario.summary}</p>
        )}

        <div style={{ display: "grid", gap: 10, marginBottom: 18 }}>
          {dimension.answers.map((opt) => {
            const selected = answer === opt.weight;
            const accent = opt.weight === 0 ? C.teal : opt.weight === 1 ? C.gold : C.coral;
            return (
              <button
                key={opt.weight}
                type="button"
                onClick={() => onAnswer(opt.weight)}
                aria-pressed={selected}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "14px 18px",
                  background: selected ? `${accent}14` : C.surface,
                  border: `1px solid ${selected ? accent + "78" : C.border}`,
                  borderLeft: `3px solid ${selected ? accent : `${accent}55`}`,
                  borderRadius: 12,
                  cursor: "pointer",
                  color: "inherit",
                  font: "inherit",
                  transition: "all 0.2s",
                }}
              >
                <p style={{
                  color: C.textPrimary, fontWeight: 600, fontSize: "0.95rem",
                  marginBottom: 4, fontFamily: "'Source Serif 4', Georgia, serif",
                }}>{opt.label}</p>
                <p style={{ color: C.textMuted, fontSize: "0.82rem", lineHeight: 1.55 }}>{opt.desc}</p>
              </button>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {!isFirst && (
            <button type="button" onClick={onBack} style={{
              background: "none", border: "none", color: C.textMuted,
              cursor: "pointer", fontSize: "0.84rem", padding: "6px 0",
              textDecoration: "underline", fontFamily: "inherit",
            }}>← Back</button>
          )}
        </div>
      </div>
    </FadeIn>
  );
}

function Result({ scenario, answers, verdict, onReset, onBack, navigate }) {
  const verdictColor = verdict.color === "teal" ? C.teal
    : verdict.color === "gold" ? C.gold
    : C.coral;

  return (
    <div style={{ marginTop: 12 }}>
      <FadeIn>
        <p style={{
          fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em",
          textTransform: "uppercase", color: verdictColor, marginBottom: 8,
        }}>Recommendation</p>
        <h2 style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          color: C.textPrimary, fontSize: "1.7rem", fontWeight: 700,
          lineHeight: 1.2, marginBottom: 14,
          display: "flex", alignItems: "center", gap: 14,
        }}>
          <span aria-hidden="true" style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 40, height: 40, borderRadius: "50%",
            background: `${verdictColor}22`, color: verdictColor,
            fontSize: "1.4rem", fontWeight: 700,
          }}>{verdict.icon}</span>
          <span>{verdict.label}</span>
        </h2>
        <p style={{ color: C.textSecondary, fontSize: "0.96rem", lineHeight: 1.7, marginBottom: 8 }}>
          {verdict.description}
        </p>
        {scenario?.summary && (
          <p style={{
            color: C.textMuted, fontSize: "0.84rem", fontStyle: "italic",
            marginBottom: 22, marginTop: 6,
          }}>
            Scenario: {scenario.summary} <span style={{ color: C.textMuted }}>· Total weight: {verdict.total}/12</span>
          </p>
        )}
      </FadeIn>

      <FadeIn delay={0.06}>
        <h3 style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          color: C.textPrimary, fontSize: "1.2rem", fontWeight: 700,
          marginTop: 16, marginBottom: 12,
        }}>Where you scored each dimension</h3>
        <div style={{ display: "grid", gap: 10 }}>
          {DIMENSIONS.map((dim) => {
            const weight = answers[dim.id] ?? 0;
            const ans = dim.answers.find((a) => a.weight === weight) || dim.answers[0];
            const accent = weight === 0 ? C.teal : weight === 1 ? C.gold : C.coral;
            return (
              <div key={dim.id} style={{
                padding: "12px 14px",
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderLeft: `3px solid ${accent}`,
                borderRadius: 10,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline", flexWrap: "wrap" }}>
                  <p style={{
                    fontFamily: "'Source Serif 4', Georgia, serif",
                    color: C.textPrimary, fontWeight: 600, fontSize: "0.95rem",
                  }}>{dim.label}</p>
                  <p style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: accent, fontSize: "0.72rem", fontWeight: 700,
                    letterSpacing: "0.08em", textTransform: "uppercase",
                  }}>{weight === 0 ? "Healthy" : weight === 1 ? "Watch" : "Concern"}</p>
                </div>
                <p style={{ color: C.textSecondary, fontSize: "0.86rem", lineHeight: 1.6, marginTop: 4 }}>
                  {ans.label}
                </p>
                {dim.relatedExperiment && (
                  <p style={{ marginTop: 6, fontSize: "0.78rem" }}>
                    <a
                      href={dim.relatedExperiment.url}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate?.(dim.relatedExperiment.url.replace(/^\/+/, ""));
                      }}
                      style={{
                        color: accent,
                        textDecoration: "none",
                        borderBottom: `1px solid ${accent}55`,
                        fontWeight: 600,
                      }}
                    >Explore via {dim.relatedExperiment.title} →</a>
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </FadeIn>

      <FadeIn delay={0.12}>
        <div style={{ marginTop: 26, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={onReset}
            style={{
              padding: "10px 18px",
              background: "transparent",
              color: C.textPrimary,
              border: `1px solid ${C.borderHover}`,
              borderRadius: 8,
              fontSize: "0.88rem",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >Try another scenario</button>
          <button
            type="button"
            onClick={onBack}
            style={{
              padding: "10px 18px",
              background: "transparent",
              color: C.textMuted,
              border: "none",
              borderRadius: 8,
              fontSize: "0.88rem",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >← Revise last answer</button>
        </div>
      </FadeIn>
    </div>
  );
}
