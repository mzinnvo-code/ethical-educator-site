import { useState } from "react";
import { C } from "../theme.js";
import { EthicalLensTag, FurtherReadingList } from "../experiments/ExperimentShared.jsx";
import { TOPIC_BY_ID } from "../data/topics.js";
import { lensNameKid } from "../data/kidLensNames.js";
import useDecisionJournal from "../hooks/useDecisionJournal.js";
import ReadAloudButton from "./ReadAloudButton.jsx";
import {
  buildPathRecapParts,
  buildPathRecapSpeechText,
  buildStudentPositionSpeechText,
  buildStudentReferenceSpeechText,
  buildStudentStorySpeechText,
  choiceKeyFromChoices,
} from "../lib/k5SynthesisAudioText.js";

// Age-appropriate K-5 lab. Softer label and looser tone than the 9-12
// PhilosophyLab. Renders only the fields the scenario provides:
//   wonder    — one open question for class discussion (K and up)
//   bigIdea   — one-sentence philosophical handle (K and up)
//   tryThis   — a what-if variation (1-3 and up)
//   spotTheSlip — a plain-language fallacy in story form (4-5)
//   related   — names of related scenarios (4-5)
function StudentLab({ lab, accent, scenarioId = null }) {
  if (!lab) return null;
  const { wonder, bigIdea, tryThis, spotTheSlip, related } = lab;
  if (!wonder && !bigIdea && !tryThis && !spotTheSlip && !related?.length) return null;

  const audioFor = (slot) => scenarioId ? { scenarioId, slot } : null;

  const card = (label, text, slot) => (
    <div key={label} style={{
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderRadius: 10,
      padding: "11px 13px",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 4 }}>
        <p style={{
          color: accent, fontSize: "0.64rem", fontWeight: 800,
          letterSpacing: "0.12em", textTransform: "uppercase",
          margin: 0,
        }}>
          {label}
        </p>
        {scenarioId && (
          <ReadAloudButton text={text} audioKey={audioFor(slot)} variant="icon" label={`Read ${label} aloud`} />
        )}
      </div>
      <p style={{
        color: C.textSecondary, fontSize: "0.86rem", lineHeight: 1.6,
        fontFamily: "'Source Serif 4', Georgia, serif",
        margin: 0,
      }}>
        {text}
      </p>
    </div>
  );

  return (
    <div style={{
      background: `linear-gradient(135deg, ${accent}12, ${accent}05)`,
      border: `1px solid ${accent}30`,
      borderRadius: 12,
      padding: "16px 18px",
      marginBottom: 14,
    }}>
      <p style={{
        color: accent, fontSize: "0.7rem", fontWeight: 700,
        letterSpacing: "0.14em", textTransform: "uppercase",
        marginBottom: 10,
      }}>
        Wonder more
      </p>

      {wonder && (
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: bigIdea ? 8 : 12 }}>
          <p style={{
            color: C.textPrimary,
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: "1.04rem", lineHeight: 1.6,
            margin: 0, flex: 1,
          }}>
            {wonder}
          </p>
          {scenarioId && (
            <ReadAloudButton text={wonder} audioKey={audioFor("lab-wonder")} variant="icon" label="Read this question aloud" />
          )}
        </div>
      )}

      {bigIdea && (
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: (tryThis || spotTheSlip) ? 12 : 0 }}>
          <p style={{
            color: C.textMuted, fontSize: "0.84rem", lineHeight: 1.55,
            fontStyle: "italic", margin: 0, flex: 1,
          }}>
            {bigIdea}
          </p>
          {scenarioId && (
            <ReadAloudButton text={bigIdea} audioKey={audioFor("lab-bigidea")} variant="icon" label="Read the big idea aloud" />
          )}
        </div>
      )}

      {(tryThis || spotTheSlip) && (
        <div style={{ display: "grid", gap: 10 }}>
          {tryThis && card("Try this", tryThis, "lab-trythis")}
          {spotTheSlip && card("Spot the slip", spotTheSlip, "lab-spottheslip")}
        </div>
      )}

      {related?.length > 0 && (
        <p style={{ color: C.textMuted, fontSize: "0.78rem", lineHeight: 1.5, marginTop: 12 }}>
          Related stories: {related.join(", ")}
        </p>
      )}
    </div>
  );
}

function PhilosophyLab({ lab, accent }) {
  if (!lab) return null;
  const tasks = [
    lab.fallacySpotting && { label: "Fallacy spot", text: lab.fallacySpotting },
    lab.argumentRepair && { label: "Repair the argument", text: lab.argumentRepair },
    lab.variationPrompt && { label: "Make a variation", text: lab.variationPrompt },
  ].filter(Boolean);

  return (
    <div style={{
      background: `linear-gradient(135deg, ${accent}12, ${accent}05)`,
      border: `1px solid ${accent}30`,
      borderRadius: 12,
      padding: "16px 18px",
      marginBottom: 14,
    }}>
      <p style={{
        color: accent,
        fontSize: "0.7rem",
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        marginBottom: 10,
      }}>
        Philosophy Lab
      </p>
      {lab.discussion && (
        <p style={{
          color: C.textPrimary,
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: "0.94rem",
          lineHeight: 1.65,
          marginBottom: 12,
        }}>
          {lab.discussion}
        </p>
      )}
      {tasks.length > 0 && (
        <div style={{ display: "grid", gap: 10 }}>
          {tasks.map(task => (
            <div key={task.label} style={{
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: 10,
              padding: "11px 13px",
            }}>
              <p style={{
                color: accent,
                fontSize: "0.64rem",
                fontWeight: 800,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 4,
              }}>
                {task.label}
              </p>
              <p style={{ color: C.textSecondary, fontSize: "0.86rem", lineHeight: 1.6 }}>
                {task.text}
              </p>
            </div>
          ))}
        </div>
      )}
      {lab.related?.length > 0 && (
        <p style={{ color: C.textMuted, fontSize: "0.78rem", lineHeight: 1.5, marginTop: 12 }}>
          Related experiments: {lab.related.join(", ")}
        </p>
      )}
    </div>
  );
}

// Looks up the personalized story matching the kid's path of choices and
// renders it as a warm payoff card. The key is the choice labels joined by a
// hyphen (e.g. "A-B", "C-C"). Hides silently if no story is found for the
// path or no stories are authored for this scenario.
function PersonalizedStory({ stories, chose, accent, scenarioId }) {
  if (!stories) return null;
  const key = choiceKeyFromChoices(chose);
  const story = key ? stories[key] : null;
  if (!story) return null;
  const paragraphs = Array.isArray(story.body) ? story.body : [story.body].filter(Boolean);
  if (!paragraphs.length) return null;
  const speechText = buildStudentStorySpeechText(story);
  return (
    <div style={{
      background: `linear-gradient(135deg, ${accent}18, ${accent}06)`,
      border: `1px solid ${accent}40`,
      borderRadius: 12,
      padding: "18px 20px",
      marginBottom: 14,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 8 }}>
        <p style={{
          color: accent, fontSize: "0.7rem", fontWeight: 800,
          letterSpacing: "0.14em", textTransform: "uppercase",
          margin: 0,
        }}>
          Your story
        </p>
        <ReadAloudButton
          text={speechText}
          audioKey={{ scenarioId, slot: `student-story-${key}` }}
          variant="icon"
          label="Read your story aloud"
        />
      </div>
      {story.title && (
        <h4 style={{
          color: C.textPrimary,
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: "1.18rem", fontWeight: 700, lineHeight: 1.3,
          margin: "0 0 10px 0",
        }}>
          {story.title}
        </h4>
      )}
      {paragraphs.map((p, i) => (
        <p key={i} style={{
          color: C.textPrimary,
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: "1rem", lineHeight: 1.7,
          margin: i < paragraphs.length - 1 ? "0 0 10px 0" : 0,
        }}>
          {p}
        </p>
      ))}
    </div>
  );
}

// Prominent try-again CTA. Asks the child if they wonder what a different set
// of choices would have written, and routes them back to Stage 1 via the
// existing restart handler.
function TryAgainPanel({ onRestart, accent }) {
  if (!onRestart) return null;
  return (
    <div style={{
      background: `linear-gradient(135deg, ${accent}10, ${accent}04)`,
      border: `1px dashed ${accent}55`,
      borderRadius: 12,
      padding: "16px 18px",
      marginBottom: 14,
      textAlign: "center",
    }}>
      <p style={{
        color: C.textPrimary,
        fontFamily: "'Source Serif 4', Georgia, serif",
        fontSize: "1rem", lineHeight: 1.6,
        margin: "0 0 12px 0",
      }}>
        Wonder what this story would have been like if you made different choices?<br/>
        Try the thought experiment again to find out!
      </p>
      <button
        className="no-print"
        onClick={onRestart}
        style={{
          padding: "11px 22px",
          background: `linear-gradient(135deg, ${accent}, ${accent}dd)`,
          color: "#fff", border: "none", borderRadius: 8,
          cursor: "pointer", fontSize: "0.92rem", fontWeight: 700,
          boxShadow: `0 4px 14px ${accent}40`,
        }}
      >
        ↺ Try it again
      </button>
    </div>
  );
}

// Kid-voice paraphrases of the philosopher positions. Mirrors the adult
// "What philosophers say" block but without dates, citations, or schools, and
// with the gold accent and rounded type the kid mode uses elsewhere.
function StudentPositions({ positions, accent, scenarioId }) {
  if (!positions?.length) return null;
  return (
    <div style={{
      background: `linear-gradient(135deg, ${accent}10, ${accent}04)`,
      border: `1px solid ${accent}30`,
      borderRadius: 12,
      padding: "16px 18px",
      marginBottom: 14,
    }}>
      <p style={{
        color: accent, fontSize: "0.7rem", fontWeight: 700,
        letterSpacing: "0.14em", textTransform: "uppercase",
        marginBottom: 10,
      }}>
        What thinkers wondered
      </p>
      {positions.map((p, i) => {
        const speechText = buildStudentPositionSpeechText(p);
        return (
          <div key={i} style={{
            padding: "10px 0",
            borderBottom: i < positions.length - 1 ? `1px solid ${accent}20` : "none",
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
              <div style={{ flex: 1 }}>
                {p.name && (
                  <p style={{
                    color: C.textPrimary, fontSize: "0.94rem", fontWeight: 700,
                    fontFamily: "'Source Serif 4', Georgia, serif",
                    marginBottom: 4,
                  }}>
                    {p.name}
                  </p>
                )}
                <p style={{
                  color: C.textSecondary, fontSize: "0.94rem", lineHeight: 1.65,
                  fontFamily: "'Source Serif 4', Georgia, serif",
                  margin: 0,
                }}>
                  {p.view}
                </p>
              </div>
              <ReadAloudButton
                text={speechText}
                audioKey={{ scenarioId, slot: `student-position-${i + 1}` }}
                variant="icon"
                label={`Read ${p.name || "this thinker"} aloud`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Kid-voice origin block. Mirrors the adult "Where this idea comes from" but
// without years or citations — one short paragraph the child can carry.
function StudentReference({ reference, accent, scenarioId }) {
  if (!reference) return null;
  const { concept, blurb } = reference;
  if (!concept && !blurb) return null;
  const speechText = buildStudentReferenceSpeechText(reference);
  return (
    <div style={{
      background: `linear-gradient(135deg, ${accent}10, ${accent}04)`,
      border: `1px solid ${accent}30`,
      borderRadius: 12,
      padding: "16px 18px",
      marginBottom: 14,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 8 }}>
        <p style={{
          color: accent, fontSize: "0.7rem", fontWeight: 700,
          letterSpacing: "0.14em", textTransform: "uppercase",
          margin: 0,
        }}>
          Where this idea comes from
        </p>
        <ReadAloudButton
          text={speechText}
          audioKey={{ scenarioId, slot: "student-reference" }}
          variant="icon"
          label="Read where this idea comes from aloud"
        />
      </div>
      {concept && (
        <p style={{
          color: C.textPrimary,
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: "1.04rem", fontWeight: 700, lineHeight: 1.4,
          margin: "0 0 8px 0",
        }}>
          {concept}
        </p>
      )}
      {blurb && (
        <p style={{
          color: C.textSecondary,
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: "0.94rem", lineHeight: 1.65,
          margin: 0,
        }}>
          {blurb}
        </p>
      )}
    </div>
  );
}

// Displays at the end of a multi-stage scenario. Renders:
//   - the "path" of choices the user took (one card per stage)
//   - the contrasted lens(es)
//   - the source + further reading
//   - optional positions panel (3 named philosophers / schools — provided by stage author)
// Visual marker for the deeper sections in K-5 scenarios. The "Wonder more"
// block is for the child; the philosopher positions and the source/concept
// block are pitched at an adult — parent, guardian, or teacher — who can use
// them to extend the conversation. We render an explicit cue so neither
// audience misreads which section is for them.
function AdultCornerIntro({ accent }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${C.gold}10, ${C.teal}08)`,
      border: `1px dashed ${C.gold}50`,
      borderRadius: 12,
      padding: "14px 16px",
      marginBottom: 14,
    }}>
      <p style={{
        color: C.gold, fontSize: "0.7rem", fontWeight: 800,
        letterSpacing: "0.14em", textTransform: "uppercase",
        marginBottom: 6,
      }}>
        For a trusted adult
      </p>
      <p style={{
        color: C.textPrimary, fontSize: "0.9rem", lineHeight: 1.6,
        fontFamily: "'Source Serif 4', Georgia, serif",
        marginBottom: 4,
      }}>
        The next two sections are written for the parent, teacher, or guardian exploring this scenario with the child.
      </p>
      <p style={{ color: C.textMuted, fontSize: "0.82rem", lineHeight: 1.6 }}>
        Use them to keep the conversation going at home or in class — name the philosopher who first asked this question, follow a thread further, or invite the child to ask a follow-up of their own.
      </p>
    </div>
  );
}

// The original "Path you took" block — numbered choices with lens tag chips
// and the analytical "your reasoning leaned X" summary. Pitched at an adult
// (researcher, teacher, parent, or older student). In K-5 kid mode this
// renders below the "For a trusted adult" divider; in every other mode it
// renders at the top of the synthesis, exactly as before.
function PathTraversedBlock({ chose = [], experiment, accent }) {
  const lensCounts = chose.reduce((acc, opt) => {
    if (opt?.lens) acc[opt.lens] = (acc[opt.lens] || 0) + 1;
    return acc;
  }, {});
  const dominant = Object.entries(lensCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
  const topicLabel = TOPIC_BY_ID[experiment?.topics?.[0]]?.label;
  return (
    <div style={{
      background: `linear-gradient(135deg, ${accent}10, ${accent}04)`,
      border: `1px solid ${accent}30`,
      borderRadius: 12, padding: "16px 18px", marginBottom: 14,
    }}>
      <p style={{
        color: accent, fontSize: "0.7rem", fontWeight: 700,
        letterSpacing: "0.14em", textTransform: "uppercase",
        marginBottom: 10,
      }}>
        The path you took
      </p>
      <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {chose.map((opt, i) => (
          <li key={i} style={{
            display: "flex", alignItems: "flex-start", gap: 10,
            padding: "8px 0", borderBottom: i < chose.length - 1 ? `1px solid ${accent}15` : "none",
          }}>
            <span style={{
              flexShrink: 0, width: 22, height: 22, borderRadius: "50%",
              background: accent, color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.74rem", fontWeight: 700,
            }}>{i + 1}</span>
            <div style={{ flex: 1 }}>
              <p style={{
                color: C.textPrimary, fontSize: "0.92rem",
                fontFamily: "'Source Serif 4', Georgia, serif", lineHeight: 1.5,
                marginBottom: 4,
              }}>
                {opt?.text || <em style={{ color: C.textMuted }}>(no choice recorded)</em>}
              </p>
              {opt?.lens && <EthicalLensTag lens={opt.lens} color={accent} />}
            </div>
          </li>
        ))}
      </ol>

      {dominant && (
        <p style={{
          color: C.textSecondary, fontSize: "0.84rem", lineHeight: 1.6,
          marginTop: 12, paddingTop: 12, borderTop: `1px dashed ${accent}30`,
          fontStyle: "italic",
        }}>
          Across this experiment your reasoning leaned <strong style={{ color: accent }}>{lensName(dominant)}</strong>
          {topicLabel ? ` on a question about ${topicLabel.toLowerCase()}.` : "."}
        </p>
      )}
    </div>
  );
}

// Warm, kid-pitched recap of the choices the child made — no lens chips and
// no analytical summary, just the choice texts and one warm sentence derived
// from the dominant lens(es). Renders only in K-5 kid mode, between the
// personalized story and the try-again CTA.
function WarmPathRecap({ chose = [], accent, scenarioId }) {
  const { recorded, topLens, secondLens, isTied, choicePhrase } = buildPathRecapParts(chose);
  if (!recorded.length) return null;

  let summary = null;
  if (topLens) {
    if (isTied && secondLens) {
      summary = (
        <>
          Today, you blended <strong style={{ color: accent }}>{lensNameKid(topLens)}</strong> and{" "}
          <strong style={{ color: accent }}>{lensNameKid(secondLens)}</strong> together.
        </>
      );
    } else {
      summary = (
        <>
          Today, you leaned into <strong style={{ color: accent }}>{lensNameKid(topLens)}</strong>{" "}
          and you carried it through {choicePhrase}.
        </>
      );
    }
  }

  const key = choiceKeyFromChoices(recorded);
  const speechText = buildPathRecapSpeechText(recorded);

  return (
    <div style={{
      background: `linear-gradient(135deg, ${accent}10, ${accent}04)`,
      border: `1px solid ${accent}30`,
      borderRadius: 12, padding: "16px 18px", marginBottom: 14,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 10 }}>
        <p style={{
          color: accent, fontSize: "0.7rem", fontWeight: 700,
          letterSpacing: "0.14em", textTransform: "uppercase",
          margin: 0,
        }}>
          Your choices today
        </p>
        <ReadAloudButton
          text={speechText}
          audioKey={{ scenarioId, slot: `path-recap-${key}` }}
          variant="icon"
          label="Read your choices aloud"
        />
      </div>
      <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {recorded.map((opt, i) => (
          <li key={i} style={{
            display: "flex", alignItems: "flex-start", gap: 10,
            padding: "8px 0", borderBottom: i < recorded.length - 1 ? `1px solid ${accent}15` : "none",
          }}>
            <span style={{
              flexShrink: 0, width: 22, height: 22, borderRadius: "50%",
              background: accent, color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.74rem", fontWeight: 700,
            }}>{i + 1}</span>
            <div style={{ flex: 1 }}>
              <p style={{
                color: C.textPrimary, fontSize: "0.96rem",
                fontFamily: "'Source Serif 4', Georgia, serif", lineHeight: 1.55,
                margin: 0,
              }}>
                {opt?.text || <em style={{ color: C.textMuted }}>(no choice recorded)</em>}
              </p>
            </div>
          </li>
        ))}
      </ol>
      {summary && (
        <p style={{
          color: C.textSecondary,
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: "0.94rem", lineHeight: 1.6,
          marginTop: 12, paddingTop: 12,
          borderTop: `1px dashed ${accent}30`,
          marginBottom: 0,
        }}>
          {summary}
        </p>
      )}
    </div>
  );
}

export default function SynthesisPanel({ chose = [], experiment, accent = C.gold, positions = [], extra = null, stages = [], mode = "story", onRestart = null }) {
  return (
    <div style={{ marginTop: 12 }}>
      {/* Path traversed — at the top for non-kid modes (6-8, 9-12, educator).
        * In kid mode it relocates below the adult divider; see below. */}
      {mode !== "kid" && (
        <PathTraversedBlock chose={chose} experiment={experiment} accent={accent} />
      )}

      {/* Kid-mode resolution stack: a payoff story for the path the child took,
        * a "try again" CTA, then the child-pitched Wonder More + philosopher +
        * origin sections — all before the "For a trusted adult" divider so the
        * child gets a complete arc that's clearly for them. */}
      {mode === "kid" && (
        <>
          <PersonalizedStory
            stories={experiment?.studentStories}
            chose={chose}
            accent={accent}
            scenarioId={experiment?.id}
          />
          <WarmPathRecap chose={chose} accent={accent} scenarioId={experiment?.id} />
          {experiment?.studentStories && (
            <TryAgainPanel onRestart={onRestart} accent={accent} />
          )}
          <StudentLab
            lab={experiment?.studentLab}
            accent={accent}
            scenarioId={experiment?.id}
          />
          <StudentPositions
            positions={experiment?.studentPositions}
            accent={accent}
            scenarioId={experiment?.id}
          />
          <StudentReference
            reference={experiment?.studentReference}
            accent={accent}
            scenarioId={experiment?.id}
          />
          {(positions.length > 0 || experiment?.reference) && (
            <AdultCornerIntro accent={accent} />
          )}
          {/* Adult-pitched path block: lens chips + analytical summary line.
            * In non-kid modes this sits at the top; in kid mode it relocates
            * here, alongside the other adult-facing sections. */}
          <PathTraversedBlock chose={chose} experiment={experiment} accent={accent} />
        </>
      )}

      {/* Compare-paths block: only for non-kid modes (6-8 + 9-12). */}
      {mode !== "kid" && (
        <ComparePaths chose={chose} stages={stages} accent={accent} />
      )}

      <WriteAndSaveBlock
        chose={chose}
        experiment={experiment}
        stages={stages}
        accent={accent}
        mode={mode}
      />

      {/* Three named positions (if provided by the experiment) */}
      {positions.length > 0 && (
        <div style={{
          background: C.surface, border: `1px solid ${C.border}`,
          borderRadius: 12, padding: "16px 18px", marginBottom: 14,
        }}>
          <p style={{
            color: C.gold, fontSize: "0.7rem", fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase",
            marginBottom: 10,
          }}>
            What philosophers say
          </p>
          {positions.map((p, i) => (
            <div key={i} style={{
              padding: "10px 0",
              borderBottom: i < positions.length - 1 ? `1px solid ${C.border}` : "none",
            }}>
              <p style={{ color: C.textPrimary, fontSize: "0.9rem", fontWeight: 600, marginBottom: 3 }}>
                {p.name}
                {p.school && <span style={{ color: C.textMuted, fontWeight: 400 }}> · {p.school}</span>}
              </p>
              <p style={{ color: C.textSecondary, fontSize: "0.86rem", lineHeight: 1.6 }}>{p.view}</p>
            </div>
          ))}
        </div>
      )}

      {mode !== "kid" && (
        <StudentLab
          lab={experiment?.studentLab}
          accent={accent}
          scenarioId={null}
        />
      )}
      <PhilosophyLab lab={experiment?.philosophyLab} accent={accent} />

      {extra}

      {/* Source + further reading */}
      {(experiment?.reference || experiment?.furtherReading?.length) && (
        <div style={{
          background: C.surface, border: `1px solid ${C.border}`,
          borderRadius: 12, padding: "16px 18px",
        }}>
          {experiment?.reference && (
            <div style={{ marginBottom: 8 }}>
              <p style={{
                color: C.gold, fontSize: "0.7rem", fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6,
              }}>
                Where this idea comes from
              </p>
              {experiment.reference.concept && (
                <p style={{
                  color: C.textPrimary, fontSize: "0.96rem", lineHeight: 1.55,
                  fontFamily: "'Source Serif 4', Georgia, serif",
                  marginBottom: 6,
                }}>
                  {experiment.reference.concept}
                </p>
              )}
              {experiment.reference.philosopher && (
                <p style={{
                  color: C.textSecondary, fontSize: "0.84rem", lineHeight: 1.55,
                  marginBottom: 4,
                }}>
                  <strong style={{ color: C.textPrimary }}>{experiment.reference.philosopher}</strong>
                  {experiment.reference.year ? ` · ${experiment.reference.year}` : ""}
                </p>
              )}
              {experiment.reference.text && (
                <p style={{ color: C.textMuted, fontSize: "0.78rem", lineHeight: 1.55 }}>
                  {experiment.reference.url ? (
                    <a href={experiment.reference.url} target="_blank" rel="noopener noreferrer" style={{ color: C.textSecondary, borderBottom: `1px solid ${C.gold}40` }}>
                      {experiment.reference.text}
                    </a>
                  ) : experiment.reference.text}
                </p>
              )}
            </div>
          )}
          <FurtherReadingList items={experiment?.furtherReading} color={accent} />
        </div>
      )}
    </div>
  );
}

const LENS_NAMES = {
  utilitarian: "utilitarian (maximize good outcomes)",
  deontological: "deontological (some acts are right or wrong in themselves)",
  virtue: "virtue ethics (what would a person of good character do?)",
  care: "an ethic of care (relationships and responsibility come first)",
  egoism: "self-interest",
  fairness: "fairness (everyone gets the same)",
  authenticity: "toward what is real and earned",
  hedonism: "toward pleasure and felt experience",
  rawlsian: "Rawlsian (protect the worst-off)",
  libertarian: "libertarian (freedom first)",
  egalitarian: "egalitarian (equal shares)",
  communitarian: "communitarian (the community matters)",
  rationalist: "rationalist (let reason decide)",
};
function lensName(id) { return LENS_NAMES[id] || id?.replace(/-/g, " "); }

// Pulls the option text the student chose at a given stage; falls back gracefully.
function chosenLabelFor(opt) {
  if (!opt) return null;
  return opt.text || opt.label || null;
}

function SteelmanTextarea({ value, onChange, onCommit, accent }) {
  return (
    <div style={{
      marginBottom: 14,
      background: `${accent}06`,
      border: `1px solid ${accent}25`,
      borderRadius: 12, padding: "14px 16px",
    }}>
      <p style={{
        color: accent, fontSize: "0.7rem", fontWeight: 700,
        letterSpacing: "0.14em", textTransform: "uppercase",
        marginBottom: 6,
      }}>
        Steelman the position you didn't pick
      </p>
      <p style={{ color: C.textSecondary, fontSize: "0.84rem", lineHeight: 1.6, marginBottom: 10 }}>
        Write the strongest possible version of the option you most disagreed with.
        No grading. The point is to argue against yourself well.
      </p>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        onBlur={onCommit}
        placeholder="A serious version of the position I rejected goes like this…"
        rows={4}
        style={{
          width: "100%", padding: "10px 12px",
          background: C.bg, border: `1px solid ${C.border}`,
          borderRadius: 8, color: C.textPrimary,
          fontSize: "0.9rem", lineHeight: 1.6,
          fontFamily: "'Source Serif 4', Georgia, serif",
          resize: "vertical",
        }}
      />
    </div>
  );
}

function ComparePaths({ chose, stages, accent }) {
  const [open, setOpen] = useState(false);

  if (!stages?.length) return null;
  const interesting = stages
    .map((stage, i) => ({ stage, i, picked: chose?.[i] }))
    .filter(({ stage, picked }) => stage?.options?.length > 1 && picked);

  if (!interesting.length) return null;

  return (
    <div style={{
      marginBottom: 14,
      background: C.surface, border: `1px solid ${C.border}`,
      borderRadius: 12, padding: "14px 16px",
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        style={{
          width: "100%", display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: 10,
          background: "none", border: "none", padding: 0,
          color: accent, fontSize: "0.78rem", fontWeight: 700,
          letterSpacing: "0.12em", textTransform: "uppercase",
          cursor: "pointer",
        }}
      >
        <span>Compare your path with the ones you didn't take</span>
        <span style={{ color: C.textMuted, fontWeight: 600, fontSize: "0.86rem" }}>
          {open ? "Hide" : "Open"}
        </span>
      </button>

      {open && (
        <div style={{ marginTop: 12, display: "grid", gap: 14 }}>
          {interesting.map(({ stage, i, picked }) => {
            const alternates = (stage.options || []).filter(opt => opt && opt.label !== picked.label);
            return (
              <div key={stage.id || i}>
                <p style={{
                  color: C.textMuted, fontSize: "0.7rem", fontWeight: 700,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  marginBottom: 6,
                }}>
                  Stage {i + 1}{stage.title ? ` · ${stage.title}` : ""}
                </p>
                <p style={{
                  color: C.textPrimary, fontSize: "0.88rem",
                  fontFamily: "'Source Serif 4', Georgia, serif",
                  lineHeight: 1.55, marginBottom: 10,
                  paddingLeft: 12, borderLeft: `2px solid ${accent}`,
                }}>
                  <strong style={{ color: accent }}>You picked:</strong> {chosenLabelFor(picked)}
                </p>
                <div style={{ display: "grid", gap: 8 }}>
                  {alternates.map(alt => (
                    <div key={alt.label} style={{
                      background: C.bg, border: `1px solid ${C.border}`,
                      borderRadius: 8, padding: "10px 12px",
                    }}>
                      <p style={{
                        color: C.textSecondary, fontSize: "0.84rem", lineHeight: 1.55,
                        fontFamily: "'Source Serif 4', Georgia, serif",
                        marginBottom: alt.reflection ? 6 : 0,
                      }}>
                        <strong style={{ color: C.textPrimary }}>{alt.label}.</strong> {alt.text}
                      </p>
                      {alt.reflection && (
                        <p style={{
                          color: C.textMuted, fontSize: "0.8rem", lineHeight: 1.55,
                          fontStyle: "italic",
                        }}>
                          {alt.reflection}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          <p style={{ color: C.textMuted, fontSize: "0.78rem", lineHeight: 1.55, fontStyle: "italic" }}>
            Reading the path you didn't take is half of philosophical work.
            Which alternate do you find yourself wanting to push back on hardest?
          </p>
        </div>
      )}
    </div>
  );
}

function WriteAndSaveBlock({ chose, experiment, stages, accent, mode }) {
  const journal = useDecisionJournal();
  const [phase, setPhase] = useState("idle"); // idle | confirming | saved
  const [savedId, setSavedId] = useState(null);
  const [steelmanDraft, setSteelmanDraft] = useState("");

  if (!experiment) return null;
  const recordedChoices = (chose || []).filter(Boolean);
  if (recordedChoices.length === 0) return null;

  const showSteelman = mode !== "kid";

  const buildEntry = () => {
    const path = (chose || []).map((opt, i) => {
      const stage = stages?.[i];
      return {
        stageId: stage?.id || `stage-${i}`,
        stageTitle: stage?.title || null,
        optionLabel: opt?.label || null,
        optionText: opt?.text || null,
        lens: opt?.lens || null,
      };
    }).filter(step => step.optionText);
    return {
      experimentId: experiment.id,
      experimentTitle: experiment.title,
      gradeBand: experiment.gradeBands?.[0] || null,
      mode,
      path,
      steelman: steelmanDraft.trim() || "",
    };
  };

  const handleSave = () => {
    const id = journal.addEntry(buildEntry());
    setSavedId(id);
    setPhase("saved");
  };

  const handleClick = () => {
    if (journal.optedIn) handleSave();
    else setPhase("confirming");
  };

  const commitSteelmanIfSaved = () => {
    if (savedId) journal.updateSteelman(savedId, steelmanDraft);
  };

  const goToJournal = () => {
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", "/thought-experiments/journal");
      window.dispatchEvent(new Event("examined-classroom:route"));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {showSteelman && (
        <SteelmanTextarea
          value={steelmanDraft}
          onChange={setSteelmanDraft}
          onCommit={commitSteelmanIfSaved}
          accent={accent}
        />
      )}

      {phase === "saved" && (
        <div style={{
          background: `${accent}10`,
          border: `1px solid ${accent}40`,
          borderRadius: 12, padding: "12px 16px", marginBottom: 14,
          display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap",
        }}>
          <span style={{ color: accent, fontSize: "0.86rem", fontWeight: 600 }}>
            Saved to your journal.
          </span>
          <button
            onClick={goToJournal}
            style={{
              padding: "6px 14px", background: "transparent",
              border: `1px solid ${accent}60`, borderRadius: 6,
              color: accent, cursor: "pointer", fontSize: "0.78rem", fontWeight: 600,
            }}
          >
            View journal →
          </button>
        </div>
      )}

      {phase === "confirming" && (
        <div style={{
          background: `${accent}08`,
          border: `1px solid ${accent}30`,
          borderRadius: 12, padding: "14px 16px", marginBottom: 14,
        }}>
          <p style={{ color: C.textPrimary, fontSize: "0.88rem", lineHeight: 1.6, marginBottom: 10 }}>
            The Decision Journal saves your reasoning to <strong>this browser only</strong>.
            Nothing leaves your device — no servers, no accounts. You can export or clear it any time.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button
              onClick={handleSave}
              style={{
                padding: "8px 16px",
                background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
                border: "none", borderRadius: 6, color: "#fff",
                cursor: "pointer", fontSize: "0.82rem", fontWeight: 600,
              }}
            >
              Save & continue
            </button>
            <button
              onClick={() => setPhase("idle")}
              style={{
                padding: "8px 16px", background: "transparent",
                border: `1px solid ${C.border}`, borderRadius: 6,
                color: C.textMuted, cursor: "pointer", fontSize: "0.82rem",
              }}
            >
              Not now
            </button>
          </div>
        </div>
      )}

      {phase === "idle" && (
        <div style={{ marginBottom: 14, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <button
            onClick={handleClick}
            style={{
              padding: "8px 16px", background: "transparent",
              border: `1px solid ${accent}60`, borderRadius: 6,
              color: accent, cursor: "pointer", fontSize: "0.82rem", fontWeight: 600,
            }}
          >
            📓 Save to journal
          </button>
          <span style={{ color: C.textMuted, fontSize: "0.76rem", lineHeight: 1.5 }}>
            Keep a record of how you reasoned{showSteelman ? ", including the steelman above" : ""}. Stays on your device.
          </span>
        </div>
      )}
    </>
  );
}
