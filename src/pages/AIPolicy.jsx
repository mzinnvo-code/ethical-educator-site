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
import { QUESTIONS, buildPolicy } from "../data/aiPolicyTemplate.js";

/**
 * /ai-policy — AI Policy Builder
 *
 * Nine-question wizard for a school's AI stance. Outputs a markdown-formatted
 * draft policy with copy + download buttons.
 *
 * Companion to /ai-rubric. The rubric helps evaluate ONE use; the builder
 * helps articulate the SCHOOL's overall posture so individual decisions
 * have a consistent reference point.
 */
export default function AIPolicy({ navigate }) {
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0); // 0 = intro, 1..N = questions, N+1 = result
  const totalQuestions = QUESTIONS.length;

  const currentQuestion = step >= 1 && step <= totalQuestions ? QUESTIONS[step - 1] : null;
  const onResult = step === totalQuestions + 1;

  function setAnswer(id, value) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  function next() { setStep((s) => Math.min(s + 1, totalQuestions + 1)); }
  function back() { setStep((s) => Math.max(s - 1, 0)); }

  function generate() {
    track("policy_draft_generated", {
      page: "ai-policy",
      placement: answers.overallStance || "any",
      slug: (answers.gradeBands || []).join("+") || "any-grades",
    });
    setStep(totalQuestions + 1);
  }

  function reset() {
    setAnswers({});
    setStep(0);
  }

  const draftText = useMemo(() => (onResult ? buildPolicy(answers) : ""), [onResult, answers]);

  return (
    <div style={{ background: C.bg, paddingTop: 60, paddingBottom: 80 }}>
      <PageContainer>
        <Narrow>
          <FadeIn>
            <SectionLabel>AI Policy Builder</SectionLabel>
            <SectionTitle>Draft your school's AI policy in ten minutes.</SectionTitle>
            <Subtitle>
              Answer nine questions about your school's stance on AI; get a 1–2 page draft policy you can take into a leadership conversation or board meeting. Not a finished document — a structured starting point that names the decisions a real policy has to make.
            </Subtitle>
          </FadeIn>

          {!onResult && (
            <FadeIn delay={0.04}>
              <ProgressDots step={step} total={totalQuestions} />
            </FadeIn>
          )}

          {step === 0 && (
            <Intro onStart={() => setStep(1)} />
          )}

          {currentQuestion && (
            <Question
              question={currentQuestion}
              value={answers[currentQuestion.id]}
              onChange={(value) => setAnswer(currentQuestion.id, value)}
              onNext={() => {
                if (step === totalQuestions) generate();
                else next();
              }}
              onBack={step > 1 ? back : null}
              isLast={step === totalQuestions}
            />
          )}

          {onResult && (
            <Result
              answers={answers}
              draftText={draftText}
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
    <div style={{ display: "flex", gap: 6, margin: "26px 0 20px", alignItems: "center", flexWrap: "wrap" }}>
      {Array.from({ length: total }).map((_, i) => {
        const dotStep = i + 1;
        return (
          <span key={dotStep} aria-hidden="true" style={{
            width: dotStep === step ? 26 : 8,
            height: 6,
            borderRadius: 3,
            background: dotStep <= step ? C.ocean : C.border,
            transition: "all 0.25s",
          }} />
        );
      })}
      <span style={{ marginLeft: 10, color: C.textMuted, fontSize: "0.78rem" }}>
        {step === 0 ? "Ready when you are" : `Question ${step} of ${total}`}
      </span>
    </div>
  );
}

function Intro({ onStart }) {
  return (
    <FadeIn delay={0.06}>
      <div style={{
        marginTop: 8,
        padding: "22px 24px",
        background: `${C.ocean}0a`,
        border: `1px solid ${C.ocean}33`,
        borderRadius: 14,
      }}>
        <p style={{
          fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.14em",
          textTransform: "uppercase", color: C.ocean, marginBottom: 8,
        }}>What you'll get</p>
        <p style={{ color: C.textSecondary, fontSize: "0.95rem", lineHeight: 1.7, marginBottom: 8 }}>
          A markdown-formatted draft policy with eight sections: purpose, definitions, student use, staff use, privacy, attribution, equity, review cadence. The wording adapts to your answers so each section reflects the stance you picked.
        </p>
        <p style={{ color: C.textMuted, fontSize: "0.86rem", lineHeight: 1.65, marginBottom: 14, fontStyle: "italic" }}>
          This is a starting point, not a finished document. Final policies need legal review, community input, and board approval — the draft says so up front. The Examined Classroom does not provide legal advice.
        </p>
        <button
          type="button"
          onClick={onStart}
          style={{
            padding: "11px 22px",
            background: `linear-gradient(135deg, ${C.ocean}, ${C.teal})`,
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: 700,
            fontSize: "0.92rem",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >Start the builder →</button>
      </div>
    </FadeIn>
  );
}

function Question({ question, value, onChange, onNext, onBack, isLast }) {
  const canAdvance = canAnswerAdvance(question, value);
  return (
    <FadeIn delay={0.06}>
      <div style={{ marginTop: 6 }}>
        <h2 style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          color: C.textPrimary, fontSize: "1.5rem", fontWeight: 700,
          lineHeight: 1.25, marginBottom: 8,
        }}>{question.label}</h2>
        {question.hint && (
          <p style={{ color: C.textMuted, fontSize: "0.88rem", marginBottom: 18 }}>{question.hint}</p>
        )}

        {question.kind === "text" && (
          <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={question.placeholder}
            aria-label={question.label}
            style={{
              width: "100%",
              padding: "12px 14px",
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: 8,
              color: C.textPrimary,
              fontFamily: "inherit",
              fontSize: "0.96rem",
              marginBottom: 18,
            }}
          />
        )}

        {question.kind === "multi" && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22 }}>
            {question.options.map((opt) => {
              const arr = Array.isArray(value) ? value : [];
              const isOn = arr.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    const next = isOn ? arr.filter((x) => x !== opt.id) : [...arr, opt.id];
                    onChange(next);
                  }}
                  aria-pressed={isOn}
                  style={{
                    padding: "8px 14px",
                    borderRadius: 999,
                    background: isOn ? `${C.ocean}28` : "transparent",
                    border: `1px solid ${isOn ? C.ocean + "78" : C.border}`,
                    color: isOn ? C.ocean : C.textSecondary,
                    fontSize: "0.86rem", fontWeight: isOn ? 700 : 500,
                    cursor: "pointer", transition: "all 0.2s",
                    fontFamily: "inherit",
                  }}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        )}

        {question.kind === "single" && (
          <div style={{ display: "grid", gap: 10, marginBottom: 22 }}>
            {question.options.map((opt) => {
              const selected = value === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onChange(opt.id)}
                  aria-pressed={selected}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "14px 18px",
                    background: selected ? `${C.ocean}10` : C.surface,
                    border: `1px solid ${selected ? C.ocean + "70" : C.border}`,
                    borderRadius: 12,
                    cursor: "pointer",
                    color: "inherit",
                    font: "inherit",
                    transition: "all 0.2s",
                  }}
                >
                  <p style={{
                    color: C.textPrimary, fontWeight: 600, fontSize: "0.96rem",
                    fontFamily: "'Source Serif 4', Georgia, serif",
                  }}>{opt.label}</p>
                </button>
              );
            })}
          </div>
        )}

        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={onNext}
            disabled={!canAdvance}
            style={{
              padding: "11px 22px",
              background: canAdvance
                ? `linear-gradient(135deg, ${C.ocean}, ${C.teal})`
                : C.surface,
              color: canAdvance ? "#fff" : C.textMuted,
              border: "none",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: "0.9rem",
              cursor: canAdvance ? "pointer" : "not-allowed",
              fontFamily: "inherit",
            }}
          >{isLast ? "Generate the draft →" : "Continue →"}</button>
          {onBack && (
            <button type="button" onClick={onBack} style={{
              marginLeft: "auto", background: "none", border: "none", color: C.textMuted,
              cursor: "pointer", fontSize: "0.84rem", padding: "6px 0",
              textDecoration: "underline", fontFamily: "inherit",
            }}>← Back</button>
          )}
        </div>
      </div>
    </FadeIn>
  );
}

function canAnswerAdvance(question, value) {
  if (question.optional) return true;
  if (question.kind === "text") return (value || "").trim().length > 0;
  if (question.kind === "multi") return Array.isArray(value) && value.length > 0;
  if (question.kind === "single") return !!value;
  return false;
}

function Result({ answers, draftText, onReset, onBack, navigate }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    navigator.clipboard.writeText(draftText).then(() => {
      track("policy_draft_copied", { page: "ai-policy" });
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  }

  function download() {
    if (typeof window === "undefined") return;
    const blob = new Blob([draftText], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const safeName = (answers.schoolName || "school").trim()
      .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "school";
    a.download = `ai-policy-${safeName}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    track("policy_draft_downloaded", { page: "ai-policy", slug: safeName });
  }

  return (
    <div style={{ marginTop: 12 }}>
      <FadeIn>
        <p style={{
          fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em",
          textTransform: "uppercase", color: C.ocean, marginBottom: 8,
        }}>Your draft policy</p>
        <h2 style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          color: C.textPrimary, fontSize: "1.6rem", fontWeight: 700,
          lineHeight: 1.2, marginBottom: 14,
        }}>
          {(answers.schoolName || "").trim() || "Your school's"} AI Use Policy — draft
        </h2>
        <p style={{ color: C.textMuted, fontSize: "0.86rem", lineHeight: 1.6, marginBottom: 18, fontStyle: "italic" }}>
          A markdown-formatted starting point. Copy it into your CMS, your school board template, or your favorite editor. Review with counsel and the community before adoption.
        </p>
      </FadeIn>

      <FadeIn delay={0.04}>
        <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={copy}
            style={{
              padding: "10px 18px",
              background: copied
                ? `linear-gradient(135deg, ${C.teal}, ${C.ocean})`
                : `linear-gradient(135deg, ${C.ocean}, ${C.teal})`,
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: "0.88rem",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.2s",
            }}
          >{copied ? "Copied ✓" : "Copy markdown"}</button>
          <button
            type="button"
            onClick={download}
            style={{
              padding: "10px 18px",
              background: "transparent",
              color: C.ocean,
              border: `1px solid ${C.ocean}88`,
              borderRadius: 8,
              fontWeight: 600,
              fontSize: "0.88rem",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >Download .md</button>
        </div>
      </FadeIn>

      <FadeIn delay={0.08}>
        <pre style={{
          padding: "22px 24px",
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 12,
          color: C.textSecondary,
          fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace",
          fontSize: "0.82rem",
          lineHeight: 1.7,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          margin: 0,
          maxHeight: "60vh",
          overflow: "auto",
        }}>{draftText}</pre>
      </FadeIn>

      <FadeIn delay={0.14}>
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
          >Start a new draft</button>
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
          <button
            type="button"
            onClick={() => navigate?.("ai-rubric")}
            style={{
              marginLeft: "auto",
              padding: "10px 18px",
              background: "transparent",
              color: C.teal,
              border: "none",
              borderRadius: 8,
              fontSize: "0.88rem",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >Pair with the AI Use Rubric →</button>
        </div>
      </FadeIn>
    </div>
  );
}
