import { useEffect, useMemo, useState } from "react";
import { C } from "../theme.js";
import {
  PageContainer,
  Narrow,
  SectionLabel,
  SectionTitle,
  Subtitle,
  FadeIn,
} from "../components/shared.jsx";
import { TOPICS, TOPIC_BY_ID } from "../data/topics.js";
import { track } from "../lib/analytics.js";

/**
 * /picker — Thought Experiment Picker
 *
 * Three-question wizard:
 *   1. Grade band (single-select)
 *   2. Time available (single-select; surfaces a Kit if Standard/Deep)
 *   3. Topic interest (multi-select; "Any topic" allowed)
 *
 * Then we run a scoring function over EXPERIMENTS and return up to 3
 * recommendations. EXPERIMENTS is loaded lazily — the page itself is
 * already a lazy route so the load happens as part of route navigation.
 *
 * Tracked events:
 *   picker_quiz_completed     { grade, time, topicCount, resultCount }
 *   picker_recommendation_clicked { experimentId, grade, time }
 */

const GRADE_OPTIONS = [
  { id: "k-5", label: "K–5", description: "Storylike scenes for elementary classrooms" },
  { id: "6-8", label: "Grades 6–8", description: "Story-driven dilemmas about AI, identity, fairness" },
  { id: "9-12", label: "Grades 9–12", description: "The canon — Plato's Cave, Mary's Room, the Trolley Problem" },
  { id: "educators", label: "Educator PD", description: "Adult dilemmas for staff meetings + leadership retreats" },
];

const TIME_OPTIONS = [
  { id: "quick", label: "Quick (10 min)", description: "Warm-up or exit-ticket sized" },
  { id: "standard", label: "Standard (20–30 min)", description: "Full discussion block" },
  { id: "deep", label: "Deep (full class or multi-day)", description: "With teacher kit, extension, writing follow-up" },
];

const NEUTRAL_BADGE_BG = "rgba(255,255,255,0.04)";

export default function Picker({ navigate }) {
  const [step, setStep] = useState(1);
  const [grade, setGrade] = useState(null);
  const [time, setTime] = useState(null);
  const [topicIds, setTopicIds] = useState([]);
  const [experiments, setExperiments] = useState(null);
  const [loadError, setLoadError] = useState(false);
  const [results, setResults] = useState(null);

  // Lazy-load EXPERIMENTS once the page mounts. The lazy route boundary
  // already bundles this together, but doing it inside an effect keeps
  // the import out of any top-level evaluation path.
  useEffect(() => {
    let cancelled = false;
    import("../data/experiments.js")
      .then((mod) => { if (!cancelled) setExperiments(mod.EXPERIMENTS); })
      .catch(() => { if (!cancelled) setLoadError(true); });
    return () => { cancelled = true; };
  }, []);

  function reset() {
    setStep(1);
    setGrade(null);
    setTime(null);
    setTopicIds([]);
    setResults(null);
  }

  function toggleTopic(id) {
    setTopicIds((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]));
  }

  function submit() {
    if (!experiments) return;
    const filtered = experiments.filter((e) => {
      if (grade && !(e.gradeBands || []).includes(grade)) return false;
      if (topicIds.length && !topicIds.some((t) => e.topics?.includes(t))) return false;
      return true;
    });

    // If the user wanted "deep" + a teacher kit, push kit-bearing experiments first.
    const sorted = [...filtered].sort((a, b) => {
      if (time === "deep") {
        const aHasKit = !!a.teacherKit;
        const bHasKit = !!b.teacherKit;
        if (aHasKit !== bHasKit) return bHasKit - aHasKit;
      }
      // Otherwise: random per-session order via a stable string sort over ids.
      return a.id.localeCompare(b.id);
    });

    // Take up to 3 from a "random-ish" slice. We pick a stable session seed
    // so back-button doesn't reshuffle but a different visit gets different
    // recommendations. (Math.random is fine — picker is single-use.)
    const slice = sorted.slice(0, Math.min(sorted.length, 9));
    for (let i = slice.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [slice[i], slice[j]] = [slice[j], slice[i]];
    }
    const picks = slice.slice(0, 3);

    track("picker_quiz_completed", {
      page: "picker",
      grade: grade || "any",
      placement: time || "any",
      slug: topicIds.length ? topicIds.join("+") : "any-topic",
    });

    setResults(picks);
    setStep(4);
  }

  const availableTopics = useMemo(() => {
    if (!experiments) return TOPICS;
    const set = new Set();
    experiments
      .filter((e) => !grade || (e.gradeBands || []).includes(grade))
      .forEach((e) => (e.topics || []).forEach((t) => set.add(t)));
    return TOPICS.filter((t) => set.has(t.id));
  }, [experiments, grade]);

  return (
    <div style={{ background: C.bg, paddingTop: 60, paddingBottom: 80 }}>
      <PageContainer>
        <Narrow>
          <FadeIn>
            <SectionLabel>Thought experiment picker</SectionLabel>
            <SectionTitle>Find a dilemma for your next class.</SectionTitle>
            <Subtitle>
              Answer three quick questions and we'll surface three experiments from the bank that fit. No login, no algorithm — just the metadata you'd filter on anyway, in fewer clicks.
            </Subtitle>
          </FadeIn>

          {loadError && (
            <FadeIn>
              <div style={{
                marginTop: 24, padding: "16px 18px",
                background: `${C.coral}10`, border: `1px solid ${C.coral}40`,
                borderRadius: 10, color: C.textSecondary, fontSize: "0.9rem",
              }}>
                Couldn't load the experiments library. Refresh, or browse the bank directly at <a href="/thought-experiments" onClick={(e) => { e.preventDefault(); navigate?.("thought-experiments"); }} style={{ color: C.coral, fontWeight: 600 }}>/thought-experiments →</a>
              </div>
            </FadeIn>
          )}

          {!experiments && !loadError && (
            <FadeIn>
              <div style={{ marginTop: 28, padding: "16px 0", color: C.textMuted, fontSize: "0.86rem" }}>
                Loading the experiment bank…
              </div>
            </FadeIn>
          )}

          {experiments && step !== 4 && (
            <FadeIn delay={0.04}>
              <ProgressDots step={step} />
            </FadeIn>
          )}

          {experiments && step === 1 && (
            <Question
              title="Who are you teaching?"
              hint="Pick one. You can re-run the picker for a different group anytime."
              options={GRADE_OPTIONS}
              selected={grade}
              onSelect={(id) => { setGrade(id); setStep(2); }}
            />
          )}

          {experiments && step === 2 && (
            <Question
              title="How much time do you have?"
              hint="This shapes the picks; it doesn't lock you in. Standard + Deep favors experiments with a printable teacher kit."
              options={TIME_OPTIONS}
              selected={time}
              onSelect={(id) => { setTime(id); setStep(3); }}
              onBack={() => setStep(1)}
            />
          )}

          {experiments && step === 3 && (
            <MultiQuestion
              title="What kinds of topics are you in the mood for?"
              hint="Multi-select. Skip to see any topic that fits your grade."
              topics={availableTopics}
              selected={topicIds}
              onToggle={toggleTopic}
              onBack={() => setStep(2)}
              onSubmit={submit}
            />
          )}

          {experiments && step === 4 && results && (
            <Results
              picks={results}
              grade={grade}
              time={time}
              onReset={reset}
              navigate={navigate}
            />
          )}
        </Narrow>
      </PageContainer>
    </div>
  );
}

function ProgressDots({ step }) {
  const dots = [1, 2, 3];
  return (
    <div style={{ display: "flex", gap: 8, margin: "26px 0 20px", alignItems: "center" }}>
      {dots.map((d) => (
        <span key={d} aria-hidden="true" style={{
          width: d === step ? 28 : 10,
          height: 6,
          borderRadius: 3,
          background: d <= step ? C.gold : C.border,
          transition: "all 0.25s",
        }} />
      ))}
      <span style={{ marginLeft: 10, color: C.textMuted, fontSize: "0.78rem" }}>
        Step {step} of 3
      </span>
    </div>
  );
}

function Question({ title, hint, options, selected, onSelect, onBack }) {
  return (
    <FadeIn delay={0.06}>
      <div style={{ marginTop: 6 }}>
        <h2 style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          color: C.textPrimary, fontSize: "1.5rem", fontWeight: 700,
          lineHeight: 1.25, marginBottom: 8,
        }}>{title}</h2>
        <p style={{ color: C.textMuted, fontSize: "0.88rem", marginBottom: 18 }}>{hint}</p>
        <div style={{ display: "grid", gap: 10 }}>
          {options.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelect(opt.id)}
              aria-pressed={selected === opt.id}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "14px 18px",
                background: selected === opt.id ? `${C.gold}10` : C.surface,
                border: `1px solid ${selected === opt.id ? C.gold + "70" : C.border}`,
                borderRadius: 12,
                cursor: "pointer",
                color: "inherit",
                font: "inherit",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = C.gold + "70"; }}
              onMouseOut={(e) => {
                if (selected !== opt.id) e.currentTarget.style.borderColor = C.border;
              }}
            >
              <p style={{
                color: C.textPrimary, fontWeight: 600, fontSize: "0.98rem",
                marginBottom: 4, fontFamily: "'Source Serif 4', Georgia, serif",
              }}>{opt.label}</p>
              <p style={{ color: C.textMuted, fontSize: "0.82rem" }}>{opt.description}</p>
            </button>
          ))}
        </div>
        {onBack && (
          <div style={{ marginTop: 18 }}>
            <button type="button" onClick={onBack} style={{
              background: "none", border: "none", color: C.textMuted,
              cursor: "pointer", fontSize: "0.84rem", padding: "6px 0",
              textDecoration: "underline",
            }}>← Back</button>
          </div>
        )}
      </div>
    </FadeIn>
  );
}

function MultiQuestion({ title, hint, topics, selected, onToggle, onBack, onSubmit }) {
  return (
    <FadeIn delay={0.06}>
      <div style={{ marginTop: 6 }}>
        <h2 style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          color: C.textPrimary, fontSize: "1.5rem", fontWeight: 700,
          lineHeight: 1.25, marginBottom: 8,
        }}>{title}</h2>
        <p style={{ color: C.textMuted, fontSize: "0.88rem", marginBottom: 18 }}>{hint}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22 }}>
          {topics.map((t) => {
            const isOn = selected.includes(t.id);
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onToggle(t.id)}
                aria-pressed={isOn}
                style={{
                  padding: "7px 13px", borderRadius: 999,
                  background: isOn ? `${t.color}28` : "transparent",
                  border: `1px solid ${isOn ? t.color + "78" : C.border}`,
                  color: isOn ? t.color : C.textSecondary,
                  fontSize: "0.82rem", fontWeight: isOn ? 700 : 500,
                  cursor: "pointer", transition: "all 0.2s",
                  fontFamily: "inherit",
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={onSubmit}
            style={{
              padding: "11px 22px",
              background: `linear-gradient(135deg, ${C.gold}, ${C.coral})`,
              color: C.midnight,
              border: "none",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: "0.92rem",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >Pick 3 for me →</button>
          {selected.length === 0 && (
            <span style={{ color: C.textMuted, fontSize: "0.82rem" }}>
              No topic selected — we'll match any topic.
            </span>
          )}
          {onBack && (
            <button type="button" onClick={onBack} style={{
              marginLeft: "auto", background: "none", border: "none", color: C.textMuted,
              cursor: "pointer", fontSize: "0.84rem", padding: "6px 0",
              textDecoration: "underline",
            }}>← Back</button>
          )}
        </div>
      </div>
    </FadeIn>
  );
}

const COUNT_HEADLINE = {
  0: "No matches — try widening the filters.",
  1: "One that fits.",
  2: "Two that fit.",
  3: "Three that fit.",
};

function Results({ picks, grade, time, onReset, navigate }) {
  const headline = COUNT_HEADLINE[picks.length] ?? `${picks.length} that fit.`;
  return (
    <div style={{ marginTop: 12 }}>
      <FadeIn>
        <p style={{
          fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em",
          textTransform: "uppercase", color: C.gold, marginBottom: 8,
        }}>Your picks</p>
        <h2 style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          color: C.textPrimary, fontSize: "1.6rem", fontWeight: 700,
          lineHeight: 1.2, marginBottom: 18,
        }}>{headline}</h2>
      </FadeIn>

      {picks.length === 0 && (
        <FadeIn delay={0.04}>
          <div style={{
            padding: "20px 22px",
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: 12,
            color: C.textSecondary,
            fontSize: "0.92rem",
            lineHeight: 1.6,
          }}>
            Try removing a topic or picking a different grade band. Or browse the full bank at <a href="/thought-experiments" onClick={(e) => { e.preventDefault(); navigate?.("thought-experiments"); }} style={{ color: C.gold, fontWeight: 600 }}>/thought-experiments →</a>
          </div>
        </FadeIn>
      )}

      <div style={{ display: "grid", gap: 14 }}>
        {picks.map((e, i) => (
          <FadeIn key={e.id} delay={0.04 * (i + 1)}>
            <RecommendationCard pick={e} grade={grade} time={time} navigate={navigate} />
          </FadeIn>
        ))}
      </div>

      {grade === "educators" && (
        <FadeIn delay={0.16}>
          <aside
            aria-label="Also worth a look for staff PD"
            style={{
              marginTop: 20,
              padding: "16px 18px",
              background: `${C.coral}0a`,
              border: `1px solid ${C.coral}33`,
              borderRadius: 12,
            }}
          >
            <p style={{
              fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.14em",
              textTransform: "uppercase", color: C.coral, marginBottom: 6,
            }}>Also worth a look for PD</p>
            <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.6 }}>
              The site's four flagship interactive experiments — The Shortcut, The AI Authorship Quandary, The Reluctant Educator, Digital Doppelganger — live on the{" "}
              <a
                href="/thought-experiments/educators"
                onClick={(e) => {
                  e.preventDefault();
                  track("picker_flagships_callout_clicked", { page: "picker", placement: grade || "any" });
                  navigate?.("thought-experiments/educators");
                }}
                style={{ color: C.coral, fontWeight: 600, borderBottom: `1px solid ${C.coral}66`, textDecoration: "none" }}
              >Thought Experiments for Educators hub →</a>. They're longer, fully-narrated PD-grade dilemmas — better suited to a staff meeting or leadership retreat than a quick discussion block.
            </p>
          </aside>
        </FadeIn>
      )}

      <FadeIn delay={0.2}>
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
          >Try another mix</button>
          <button
            type="button"
            onClick={() => navigate?.("thought-experiments")}
            style={{
              padding: "10px 18px",
              background: "transparent",
              color: C.gold,
              border: "none",
              borderRadius: 8,
              fontSize: "0.88rem",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >Browse the full bank →</button>
        </div>
      </FadeIn>
    </div>
  );
}

function RecommendationCard({ pick, grade, time, navigate }) {
  const accent =
    pick.topics?.length && TOPIC_BY_ID[pick.topics[0]]?.color
      ? TOPIC_BY_ID[pick.topics[0]].color
      : C.gold;

  function open() {
    track("picker_recommendation_clicked", {
      page: "picker",
      slug: pick.id,
      placement: grade || "any",
    });

    // Standalone experiments that have their own dedicated routes (NOT
    // mounted via ?experiment= on a grade page). Mirror in
    // src/lib/searchDocs.js's STANDALONE_PAGES if you add to this.
    const STANDALONE_PAGES = {
      "explaining-red-k-2": "thought-experiments/explaining-red-k-2",
    };
    if (STANDALONE_PAGES[pick.id]) {
      navigate?.(STANDALONE_PAGES[pick.id]);
      return;
    }

    // Route to the right grade page + open the experiment via ?experiment=.
    const k5 = pick.gradeBands?.includes("k-5");
    const k5Grade = k5 ? pick.gradeLevels?.[0] : null;
    const KGRADE = { k: "kindergarten", "1": "grade-1", "2": "grade-2", "3": "grade-3", "4": "grade-4", "5": "grade-5" };
    let pathSlug;
    if (k5Grade && KGRADE[k5Grade]) pathSlug = KGRADE[k5Grade];
    else if (k5) pathSlug = "k-5";
    else if (pick.gradeBands?.includes("6-8")) pathSlug = "6-8";
    else if (pick.gradeBands?.includes("9-12")) pathSlug = "9-12";
    else if (pick.gradeBands?.includes("educators")) pathSlug = "educators";
    navigate?.(`thought-experiments/${pathSlug || ""}?experiment=${encodeURIComponent(pick.id)}`);
  }

  return (
    <article
      style={{
        padding: "20px 22px",
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderLeft: `3px solid ${accent}`,
        borderRadius: 14,
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
        {(pick.gradeBands || []).map((g) => (
          <span key={g} style={{
            padding: "2px 7px",
            background: NEUTRAL_BADGE_BG,
            border: `1px solid ${C.border}`,
            borderRadius: 4,
            fontSize: "0.6rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: C.textSecondary,
            fontFamily: "'JetBrains Mono', monospace",
          }}>{g === "k-5" ? "K–5" : g === "6-8" ? "6–8" : g === "9-12" ? "9–12" : g === "educators" ? "Educator PD" : g}</span>
        ))}
        {pick.teacherKit && (
          <span style={{
            padding: "2px 7px",
            background: `${C.gold}14`,
            border: `1px solid ${C.gold}40`,
            borderRadius: 4,
            fontSize: "0.6rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: C.gold,
            fontFamily: "'JetBrains Mono', monospace",
          }}>📄 Kit</span>
        )}
      </div>

      <h3 style={{
        fontFamily: "'Source Serif 4', Georgia, serif",
        color: C.textPrimary, fontSize: "1.18rem", fontWeight: 700,
        lineHeight: 1.3, marginBottom: 6,
      }}>{pick.title}</h3>

      {pick.tagline && (
        <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.65, marginBottom: 12 }}>
          {pick.tagline}
        </p>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
        {(pick.topics || []).slice(0, 4).map((tid) => {
          const t = TOPIC_BY_ID[tid];
          if (!t) return null;
          return (
            <span key={tid} style={{
              padding: "2px 8px",
              background: `${t.color}18`,
              border: `1px solid ${t.color}30`,
              borderRadius: 10,
              fontSize: "0.62rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: t.color,
            }}>{t.label}</span>
          );
        })}
      </div>

      <button
        type="button"
        onClick={open}
        aria-label={`Open ${pick.title}`}
        style={{
          padding: "9px 16px",
          background: `linear-gradient(135deg, ${accent}, ${C.ocean})`,
          color: "#fff",
          border: "none",
          borderRadius: 8,
          fontWeight: 600,
          fontSize: "0.86rem",
          cursor: "pointer",
          fontFamily: "inherit",
        }}
      >Open this experiment →</button>
    </article>
  );
}
