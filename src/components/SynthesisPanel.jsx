import { useState } from "react";
import { C } from "../theme.js";
import { EthicalLensTag, FurtherReadingList } from "../experiments/ExperimentShared.jsx";
import { TOPIC_BY_ID } from "../data/topics.js";
import useDecisionJournal from "../hooks/useDecisionJournal.js";

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

// Displays at the end of a multi-stage scenario. Renders:
//   - the "path" of choices the user took (one card per stage)
//   - the contrasted lens(es)
//   - the source + further reading
//   - optional positions panel (3 named philosophers / schools — provided by stage author)
export default function SynthesisPanel({ chose = [], experiment, accent = C.gold, positions = [], extra = null, stages = [], mode = "story" }) {
  const lensCounts = chose.reduce((acc, opt) => {
    if (opt?.lens) acc[opt.lens] = (acc[opt.lens] || 0) + 1;
    return acc;
  }, {});
  const dominant = Object.entries(lensCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
  const topicLabel = TOPIC_BY_ID[experiment?.topics?.[0]]?.label;

  return (
    <div style={{ marginTop: 12 }}>
      {/* Path traversed */}
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

      <SaveToJournalAction
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

      <PhilosophyLab lab={experiment?.philosophyLab} accent={accent} />

      {extra}

      {/* Source + further reading */}
      {(experiment?.reference || experiment?.furtherReading?.length) && (
        <div style={{
          background: C.surface, border: `1px solid ${C.border}`,
          borderRadius: 12, padding: "16px 18px",
        }}>
          {experiment?.reference && (
            <p style={{ color: C.textSecondary, fontSize: "0.86rem", lineHeight: 1.6, marginBottom: 8 }}>
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

function SaveToJournalAction({ chose, experiment, stages, accent, mode }) {
  const journal = useDecisionJournal();
  const [phase, setPhase] = useState("idle"); // idle | confirming | saved
  const [savedId, setSavedId] = useState(null);

  if (!experiment) return null;
  const recordedChoices = (chose || []).filter(Boolean);
  if (recordedChoices.length === 0) return null;

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
    };
  };

  const handleSave = () => {
    const id = journal.addEntry(buildEntry());
    setSavedId(id);
    setPhase("saved");
  };

  const handleClick = () => {
    if (journal.optedIn) {
      handleSave();
    } else {
      setPhase("confirming");
    }
  };

  const goToJournal = () => {
    if (typeof window !== "undefined") {
      window.location.hash = "thought-experiments/journal";
    }
  };

  if (phase === "saved") {
    return (
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
    );
  }

  if (phase === "confirming") {
    return (
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
    );
  }

  return (
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
        Keep a record of how you reasoned. Stays on your device.
      </span>
    </div>
  );
}
