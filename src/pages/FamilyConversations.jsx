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
import {
  AGE_BANDS,
  TOPICS,
  generatePrompts,
  getAgeBand,
  getTopic,
} from "../data/familyConversations.js";

/**
 * /family-conversations — Family Conversation Generator
 *
 * Parent-facing companion to the teacher tools. Pick a child's age band and
 * a topic; get five conversation starters appropriate for a dinner-table or
 * car-ride conversation about AI. No lecture, no quiz, just questions a
 * parent can read straight through.
 */
export default function FamilyConversations({ navigate }) {
  const [ageId, setAgeId] = useState("");
  const [topicId, setTopicId] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const age = useMemo(() => getAgeBand(ageId), [ageId]);
  const topic = useMemo(() => getTopic(topicId), [topicId]);
  const prompts = useMemo(
    () => (submitted && ageId && topicId ? generatePrompts(ageId, topicId) : []),
    [submitted, ageId, topicId],
  );

  function onGenerate() {
    if (!ageId || !topicId) return;
    track("family_prompts_generated", {
      page: "family-conversations",
      placement: ageId,
      slug: topicId,
    });
    setSubmitted(true);
  }

  function reset() {
    setSubmitted(false);
  }

  return (
    <div style={{ background: C.bg, paddingTop: 60, paddingBottom: 80 }}>
      <PageContainer>
        <Narrow>
          <FadeIn>
            <SectionLabel>Family Conversations</SectionLabel>
            <SectionTitle>Five questions to start a family conversation about AI.</SectionTitle>
            <Subtitle>
              For parents, caregivers, and grown-ups who'd rather ask than lecture. Pick your child's age band and a topic; we'll hand you five prompts a kid can answer between bites of pasta. No correct answers — the goal is hearing what your child actually thinks before you share what you think.
            </Subtitle>
          </FadeIn>

          {!submitted && (
            <FadeIn delay={0.05}>
              <Form
                ageId={ageId}
                topicId={topicId}
                onAge={setAgeId}
                onTopic={setTopicId}
                onGenerate={onGenerate}
              />
            </FadeIn>
          )}

          {submitted && age && topic && (
            <Result
              age={age}
              topic={topic}
              prompts={prompts}
              onReset={reset}
              navigate={navigate}
            />
          )}

          {!submitted && (
            <FadeIn delay={0.16}>
              <HowToUse />
            </FadeIn>
          )}
        </Narrow>
      </PageContainer>
    </div>
  );
}

function Form({ ageId, topicId, onAge, onTopic, onGenerate }) {
  const canGenerate = !!ageId && !!topicId;
  return (
    <div style={{ marginTop: 22 }}>
      <FieldsetBlock label="1. Your child's age">
        <ChipRow>
          {AGE_BANDS.map((band) => (
            <Chip
              key={band.id}
              selected={ageId === band.id}
              onClick={() => onAge(band.id)}
              ariaLabel={`Age band: ${band.label}`}
            >
              <span style={{ fontWeight: 700, display: "block" }}>{band.label}</span>
              <span style={{
                display: "block", marginTop: 4,
                fontSize: "0.78rem", color: C.textMuted, fontWeight: 400,
              }}>{band.note}</span>
            </Chip>
          ))}
        </ChipRow>
      </FieldsetBlock>

      <FieldsetBlock label="2. What do you want to talk about?">
        <ChipRow>
          {TOPICS.map((t) => (
            <Chip
              key={t.id}
              selected={topicId === t.id}
              onClick={() => onTopic(t.id)}
              ariaLabel={`Topic: ${t.label}`}
            >
              <span style={{ fontWeight: 700, display: "block" }}>{t.label}</span>
              <span style={{
                display: "block", marginTop: 4,
                fontSize: "0.78rem", color: C.textMuted, fontWeight: 400, lineHeight: 1.5,
              }}>{t.summary}</span>
            </Chip>
          ))}
        </ChipRow>
      </FieldsetBlock>

      <div style={{ marginTop: 28 }}>
        <button
          type="button"
          onClick={onGenerate}
          disabled={!canGenerate}
          style={{
            padding: "12px 26px",
            background: canGenerate
              ? `linear-gradient(135deg, ${C.coral}, ${C.gold})`
              : C.surface,
            color: canGenerate ? "#fff" : C.textMuted,
            border: "none",
            borderRadius: 8,
            fontWeight: 700,
            fontSize: "0.95rem",
            cursor: canGenerate ? "pointer" : "not-allowed",
            fontFamily: "inherit",
            transition: "all 0.2s",
          }}
        >Give me five prompts →</button>
        {!canGenerate && (
          <p style={{
            marginTop: 10, fontSize: "0.82rem", color: C.textMuted,
            fontStyle: "italic",
          }}>Pick an age band and a topic to continue.</p>
        )}
      </div>
    </div>
  );
}

function FieldsetBlock({ label, children }) {
  return (
    <div style={{ marginTop: 22 }}>
      <p style={{
        fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em",
        textTransform: "uppercase", color: C.coral, marginBottom: 12,
      }}>{label}</p>
      {children}
    </div>
  );
}

function ChipRow({ children }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
      gap: 10,
    }}>{children}</div>
  );
}

function Chip({ selected, onClick, ariaLabel, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      aria-label={ariaLabel}
      style={{
        display: "block",
        width: "100%",
        textAlign: "left",
        padding: "14px 16px",
        background: selected ? `${C.coral}14` : C.surface,
        border: `1px solid ${selected ? C.coral + "78" : C.border}`,
        borderRadius: 12,
        cursor: "pointer",
        color: selected ? C.coral : C.textSecondary,
        font: "inherit",
        fontSize: "0.92rem",
        transition: "all 0.2s",
      }}
    >{children}</button>
  );
}

function Result({ age, topic, prompts, onReset, navigate }) {
  const [copied, setCopied] = useState(false);

  const copyText = useMemo(() => {
    const header = `Five family-conversation prompts about ${topic.label} (${age.short})`;
    const body = prompts.map((p, i) => `${i + 1}. ${p}`).join("\n\n");
    const footer = `From The Examined Classroom — examinedclassroom.com/family-conversations`;
    return `${header}\n\n${body}\n\n— ${footer}`;
  }, [age, topic, prompts]);

  function copy() {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    navigator.clipboard.writeText(copyText).then(() => {
      track("family_prompts_copied", {
        page: "family-conversations",
        placement: age.id,
        slug: topic.id,
      });
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  }

  return (
    <div style={{ marginTop: 26 }}>
      <FadeIn>
        <p style={{
          fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em",
          textTransform: "uppercase", color: C.coral, marginBottom: 8,
        }}>Your prompts</p>
        <h2 style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          color: C.textPrimary, fontSize: "1.5rem", fontWeight: 700,
          lineHeight: 1.25, marginBottom: 8,
        }}>{topic.label} <span style={{ color: C.textMuted, fontWeight: 500 }}>· {age.short}</span></h2>
        <p style={{ color: C.textMuted, fontSize: "0.92rem", lineHeight: 1.6, marginBottom: 18, fontStyle: "italic" }}>
          {topic.summary} Ask one. Wait for the answer. Don't fill the silence.
        </p>
      </FadeIn>

      <FadeIn delay={0.05}>
        <ol style={{
          listStyle: "none", padding: 0, margin: "0 0 20px",
          counterReset: "prompt",
        }}>
          {prompts.map((p, i) => (
            <li key={i} style={{
              counterIncrement: "prompt",
              display: "flex",
              gap: 14,
              padding: "16px 18px",
              marginBottom: 10,
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              alignItems: "flex-start",
            }}>
              <span aria-hidden="true" style={{
                flexShrink: 0,
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: `${C.coral}1c`,
                color: C.coral,
                fontWeight: 700,
                fontSize: "0.9rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Source Serif 4', Georgia, serif",
              }}>{i + 1}</span>
              <p style={{
                color: C.textPrimary,
                fontSize: "1.02rem",
                lineHeight: 1.6,
                margin: 0,
                fontFamily: "'Source Serif 4', Georgia, serif",
              }}>{p}</p>
            </li>
          ))}
        </ol>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={copy}
            style={{
              padding: "10px 18px",
              background: copied
                ? `linear-gradient(135deg, ${C.gold}, ${C.coral})`
                : `linear-gradient(135deg, ${C.coral}, ${C.gold})`,
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: "0.88rem",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.2s",
            }}
          >{copied ? "Copied ✓" : "Copy all five prompts"}</button>
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
          >Pick a different age or topic</button>
        </div>
      </FadeIn>

      <FadeIn delay={0.16}>
        <div style={{
          padding: "20px 22px",
          background: `${C.coral}08`,
          border: `1px solid ${C.coral}30`,
          borderRadius: 12,
        }}>
          <p style={{
            fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em",
            textTransform: "uppercase", color: C.coral, marginBottom: 8,
          }}>How to use these</p>
          <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.65, marginBottom: 8 }}>
            One prompt is plenty for one conversation. Read it; wait; let your child be the first one to answer. Be ready for "I don't know" — that's a real answer too, and a fine place to start. Your goal isn't to land a teaching point; it's to find out what your kid is already thinking.
          </p>
          <p style={{ color: C.textMuted, fontSize: "0.86rem", lineHeight: 1.6, fontStyle: "italic", marginBottom: 0 }}>
            Want one of these in your inbox each week, paired with a thought experiment your kid might be encountering at school? <button type="button" onClick={() => navigate?.("newsletter")} style={{
              background: "none", border: "none", color: C.coral,
              textDecoration: "underline", cursor: "pointer", padding: 0,
              font: "inherit", fontStyle: "italic",
            }}>Subscribe to the Sunday Dilemma.</button>
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.22}>
        <div style={{ marginTop: 26, display: "flex", gap: 14, flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={() => navigate?.("audiences/parent")}
            style={{
              padding: "10px 18px",
              background: "transparent",
              color: C.coral,
              border: `1px solid ${C.coral}88`,
              borderRadius: 8,
              fontSize: "0.88rem",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >More for parents →</button>
          <button
            type="button"
            onClick={() => navigate?.("picker")}
            style={{
              padding: "10px 18px",
              background: "transparent",
              color: C.textSecondary,
              border: "none",
              borderRadius: 8,
              fontSize: "0.88rem",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              textDecoration: "underline",
            }}
          >Find a thought experiment instead →</button>
        </div>
      </FadeIn>
    </div>
  );
}

function HowToUse() {
  return (
    <div style={{
      marginTop: 40,
      padding: "22px 24px",
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderRadius: 14,
    }}>
      <p style={{
        fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em",
        textTransform: "uppercase", color: C.coral, marginBottom: 10,
      }}>The premise</p>
      <p style={{ color: C.textSecondary, fontSize: "0.95rem", lineHeight: 1.7, marginBottom: 10 }}>
        Kids are already encountering AI — in classrooms, in homework apps, on YouTube, in their friends' phones. They have opinions about it before grown-ups have started asking. The most useful thing a parent can do is be curious before being instructive.
      </p>
      <p style={{ color: C.textSecondary, fontSize: "0.95rem", lineHeight: 1.7, marginBottom: 10 }}>
        Each prompt here is one sentence designed to open a conversation without a "correct" answer. They work in the car. They work at dinner. They work on a walk. They do not work as quiz questions.
      </p>
      <p style={{ color: C.textMuted, fontSize: "0.88rem", lineHeight: 1.6, fontStyle: "italic", marginBottom: 0 }}>
        Companion to the teacher-facing tools: the <a href="/picker" style={{ color: C.coral }}>Thought Experiment Picker</a>, the <a href="/ai-rubric" style={{ color: C.coral }}>AI Use Rubric</a>, and the <a href="/ai-policy" style={{ color: C.coral }}>AI Policy Builder</a>. This one's for the dinner table, not the classroom.
      </p>
    </div>
  );
}
