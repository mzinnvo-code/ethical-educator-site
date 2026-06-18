import { useEffect } from "react";

import { C } from "../../theme.js";
import { PageContainer, Narrow } from "../../components/shared.jsx";
import {
  GAMEFUL_BONUS_VIDEO,
  GAMEFUL_CHARTER,
  GAMEFUL_DO_TOMORROW,
  GAMEFUL_REFLECTION_PROMPTS,
  GAMEFUL_RULES,
  GAMEFUL_TAKEAWAYS,
  GAMIFICATION_GAME_ROOMS,
  GAMIFICATION_QUEST_SOURCES,
  source,
} from "../../data/gamificationQuest.js";
import { trackQuestEvent } from "./gamification/questAnalytics.js";

const aiRoom = GAMIFICATION_GAME_ROOMS.find((room) => room.id === "ai-lesson-forge");
const evidenceRoom = GAMIFICATION_GAME_ROOMS.find((room) => room.id === "evidence-lab");
const workshopRoom = GAMIFICATION_GAME_ROOMS.find((room) => room.id === "teacher-workshop");
const bonusSource = source(GAMEFUL_BONUS_VIDEO.sourceId);

const GRADE_BAND_LABELS = { "k-2": "K–2", "3-5": "3–5", "6-8": "6–8", "9-12": "9–12" };

function KitCard({ title, eyebrow, children, accent = C.gold }) {
  return (
    <section
      style={{
        border: `2px solid ${accent}66`,
        background: "rgba(15,32,52,0.55)",
        padding: "18px 20px",
        marginTop: 18,
      }}
    >
      {eyebrow && (
        <p style={{ margin: "0 0 4px", color: accent, fontSize: "0.68rem", fontWeight: 900, letterSpacing: "0.13em", textTransform: "uppercase" }}>
          {eyebrow}
        </p>
      )}
      <h2 style={{ margin: "0 0 10px", color: C.textPrimary, fontSize: "1.2rem", lineHeight: 1.3 }}>{title}</h2>
      {children}
    </section>
  );
}

const bodyStyle = { color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.7 };

// Print-styled companion to the Gameful Learning Lab quest. Single-sourced
// from gamificationQuest.js so the kit can never drift from the course;
// browser print-to-PDF is the download.
export default function GamificationTeacherKit({ navigate }) {
  useEffect(() => {
    trackQuestEvent("quest_kit_open", { placement: "route" });
  }, []);

  const handlePrint = () => {
    trackQuestEvent("quest_kit_print", { placement: "route", once: false });
    if (typeof window !== "undefined") window.print();
  };

  return (
    <div style={{ padding: "80px 0", background: C.bg }}>
      <PageContainer>
        <Narrow>
          <p style={{ margin: 0, color: C.gold, fontSize: "0.72rem", fontWeight: 900, letterSpacing: "0.16em", textTransform: "uppercase" }}>
            For educators · printable companion
          </p>
          <h1 style={{ color: C.textPrimary, fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.2rem)", lineHeight: 1.08, margin: "10px 0 14px" }}>
            Gameful Learning Teacher Kit
          </h1>
          <p style={{ ...bodyStyle, maxWidth: 640 }}>
            Everything the Gameful Learning Lab quest teaches, in a form you can print,
            keep by your desk, or hand to a colleague: the charter, the six design cards,
            the five-step lesson blueprint, the pilot scorecard, and the AI prompt recipe.
            Use your browser's print dialog and choose &ldquo;Save as PDF&rdquo; for a digital copy.
          </p>
          <div className="no-print" style={{ display: "flex", flexWrap: "wrap", gap: 10, margin: "16px 0 6px" }}>
            <button
              type="button"
              onClick={handlePrint}
              style={{
                padding: "10px 16px",
                border: `2px solid ${C.gold}`,
                background: `linear-gradient(180deg, ${C.gold}, #9a7424)`,
                color: "#0b1622",
                fontWeight: 900,
                fontSize: "0.86rem",
                cursor: "pointer",
              }}
            >
              Print the kit / save as PDF
            </button>
            <button
              type="button"
              onClick={() => navigate?.("gamification-in-education")}
              style={{
                padding: "10px 16px",
                border: `1px solid ${C.teal}88`,
                background: "rgba(15,32,52,0.7)",
                color: C.textPrimary,
                fontWeight: 850,
                fontSize: "0.86rem",
                cursor: "pointer",
              }}
            >
              Play the quest that earns this kit
            </button>
          </div>

          <KitCard eyebrow="The whole course on one card" title="Gameful Learning Charter">
            <ol style={{ ...bodyStyle, margin: 0, paddingLeft: 20, display: "grid", gap: 6 }}>
              {GAMEFUL_CHARTER.map((line) => <li key={line}>{line}</li>)}
            </ol>
          </KitCard>

          <KitCard eyebrow="The honest counterweight" title="Bonus: Watch &amp; Reflect" accent={C.teal}>
            <p style={{ ...bodyStyle, marginTop: 0 }}>{GAMEFUL_BONUS_VIDEO.framing}</p>
            <p style={bodyStyle}>
              <strong style={{ color: C.textPrimary }}>Watch:</strong>{" "}
              {bonusSource ? (
                <a href={bonusSource.href} target="_blank" rel="noreferrer" style={{ color: C.gold }}>
                  {GAMEFUL_BONUS_VIDEO.speaker}: {GAMEFUL_BONUS_VIDEO.title} ({GAMEFUL_BONUS_VIDEO.event})
                </a>
              ) : (
                `${GAMEFUL_BONUS_VIDEO.speaker}: ${GAMEFUL_BONUS_VIDEO.title}`
              )}
            </p>
            <p style={{ ...bodyStyle, color: C.textPrimary, fontWeight: 800, margin: "10px 0 4px" }}>Reflect</p>
            <ol style={{ ...bodyStyle, margin: 0, paddingLeft: 20, display: "grid", gap: 5, fontSize: "0.86rem" }}>
              {GAMEFUL_REFLECTION_PROMPTS.map((line) => <li key={line}>{line}</li>)}
            </ol>
            <p style={{ ...bodyStyle, color: C.textPrimary, fontWeight: 800, margin: "12px 0 4px" }}>What you learned</p>
            <ul style={{ ...bodyStyle, margin: 0, paddingLeft: 20, display: "grid", gap: 5, fontSize: "0.84rem" }}>
              {GAMEFUL_TAKEAWAYS.map((item) => (
                <li key={item.title}><strong style={{ color: C.textPrimary }}>{item.title}.</strong> {item.text}</li>
              ))}
            </ul>
            <p style={{ ...bodyStyle, color: C.textPrimary, fontWeight: 800, margin: "12px 0 4px" }}>Do this tomorrow</p>
            <ol style={{ ...bodyStyle, margin: 0, paddingLeft: 20, display: "grid", gap: 5, fontSize: "0.86rem" }}>
              {GAMEFUL_DO_TOMORROW.map((line) => <li key={line}>{line}</li>)}
            </ol>
          </KitCard>

          <KitCard eyebrow="Audit any mechanic against these" title="The Six Design Cards" accent={C.teal}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 10 }}>
              {GAMEFUL_RULES.map((rule) => (
                <article key={rule.id} style={{ border: `1px solid ${C.teal}55`, padding: "12px 14px" }}>
                  <strong style={{ display: "block", color: C.textPrimary, fontSize: "0.92rem", marginBottom: 4 }}>{rule.title}</strong>
                  <span style={{ ...bodyStyle, fontSize: "0.84rem" }}>{rule.text}</span>
                </article>
              ))}
            </div>
          </KitCard>

          {workshopRoom?.lessonBlueprint && (
            <KitCard eyebrow="Gamify one lesson this week" title={workshopRoom.lessonBlueprint.title}>
              <p style={{ ...bodyStyle, marginTop: 0 }}>{workshopRoom.lessonBlueprint.intro}</p>
              <ol style={{ margin: 0, paddingLeft: 20, display: "grid", gap: 12 }}>
                {workshopRoom.lessonBlueprint.steps.map((step) => (
                  <li key={step.id} style={bodyStyle}>
                    <strong style={{ color: C.textPrimary }}>{step.label}.</strong> {step.prompt}
                    <span style={{ display: "block", marginTop: 4, fontSize: "0.84rem" }}>
                      My answer: ____________________________________________
                    </span>
                    {step.examples.map((example) => (
                      <span key={`${step.id}-${example.gradeBand}`} style={{ display: "block", marginTop: 5, fontSize: "0.82rem", color: C.textMuted }}>
                        <em style={{ color: C.gold, fontStyle: "normal", fontWeight: 800 }}>{GRADE_BAND_LABELS[example.gradeBand]}:</em>{" "}
                        <s>{example.before}</s> → {example.after}
                      </span>
                    ))}
                  </li>
                ))}
              </ol>
            </KitCard>
          )}

          {evidenceRoom?.pilotScorecard && (
            <KitCard eyebrow="Did the pilot work?" title="Pilot Scorecard" accent={C.teal}>
              <div style={{ display: "grid", gap: 10 }}>
                {evidenceRoom.pilotScorecard.map((row) => (
                  <article key={row.id} style={{ border: `1px solid ${C.teal}44`, padding: "10px 12px" }}>
                    <strong style={{ display: "block", color: C.textPrimary, fontSize: "0.9rem" }}>{row.signal}</strong>
                    <span style={{ ...bodyStyle, display: "block", fontSize: "0.84rem", marginTop: 3 }}>
                      <strong style={{ color: C.tealText }}>Look for:</strong> {row.lookFor}
                    </span>
                    <span style={{ ...bodyStyle, display: "block", fontSize: "0.84rem", marginTop: 2 }}>
                      <strong style={{ color: C.coralText }}>Red flag:</strong> {row.redFlag}
                    </span>
                  </article>
                ))}
              </div>
            </KitCard>
          )}

          {aiRoom?.promptRecipe && (
            <KitCard eyebrow="Draft faster, audit always" title="AI Lesson-Loop Prompt Recipe" accent={C.sky}>
              <ol style={{ ...bodyStyle, margin: 0, paddingLeft: 20, display: "grid", gap: 6 }}>
                {aiRoom.promptRecipe.map((line) => <li key={line}>{line}</li>)}
              </ol>
            </KitCard>
          )}

          <KitCard eyebrow="One line per grade band" title="Quick Translations by Grade Band">
            <div style={{ display: "grid", gap: 10 }}>
              {GAMIFICATION_GAME_ROOMS.filter((room) => room.kind !== "home" && room.gradeBands).map((room) => (
                <article key={room.id} style={{ border: `1px solid ${C.gold}33`, padding: "10px 12px" }}>
                  <strong style={{ display: "block", color: C.textPrimary, fontSize: "0.9rem", marginBottom: 4 }}>{room.label}</strong>
                  {Object.entries(room.gradeBands).map(([band, text]) => (
                    <span key={band} style={{ ...bodyStyle, display: "block", fontSize: "0.82rem", marginTop: 2 }}>
                      <strong style={{ color: C.gold }}>{GRADE_BAND_LABELS[band]}:</strong> {text}
                    </span>
                  ))}
                </article>
              ))}
            </div>
          </KitCard>

          <KitCard eyebrow="Read the research yourself" title="Sources" accent={C.teal}>
            <ul style={{ ...bodyStyle, margin: 0, paddingLeft: 20, display: "grid", gap: 5, fontSize: "0.84rem" }}>
              {GAMIFICATION_QUEST_SOURCES.map((item) => (
                <li key={item.id}>
                  <a href={item.href} target="_blank" rel="noreferrer" style={{ color: C.gold }}>{item.label}</a>: {item.title}
                </li>
              ))}
            </ul>
          </KitCard>

          <p style={{ ...bodyStyle, marginTop: 18, fontSize: "0.84rem", color: C.textMuted }}>
            From The Examined Classroom's Gameful Learning Lab — a playable course on
            gamification in education. Progress, badges, and preferences stay in your
            browser; no sign-in exists.
          </p>
        </Narrow>
      </PageContainer>
    </div>
  );
}
