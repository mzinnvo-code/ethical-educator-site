import { C } from "../theme.js";
import { EthicalLensTag, FurtherReadingList } from "../experiments/ExperimentShared.jsx";
import { TOPIC_BY_ID } from "../data/topics.js";

// Age-appropriate K-5 lab. Softer label and looser tone than the 9-12
// PhilosophyLab. Renders only the fields the scenario provides:
//   wonder    — one open question for class discussion (K and up)
//   bigIdea   — one-sentence philosophical handle (K and up)
//   tryThis   — a what-if variation (1-3 and up)
//   spotTheSlip — a plain-language fallacy in story form (4-5)
//   related   — names of related scenarios (4-5)
function StudentLab({ lab, accent }) {
  if (!lab) return null;
  const { wonder, bigIdea, tryThis, spotTheSlip, related } = lab;
  if (!wonder && !bigIdea && !tryThis && !spotTheSlip && !related?.length) return null;

  const card = (label, text) => (
    <div key={label} style={{
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderRadius: 10,
      padding: "11px 13px",
    }}>
      <p style={{
        color: accent, fontSize: "0.64rem", fontWeight: 800,
        letterSpacing: "0.12em", textTransform: "uppercase",
        marginBottom: 4,
      }}>
        {label}
      </p>
      <p style={{
        color: C.textSecondary, fontSize: "0.86rem", lineHeight: 1.6,
        fontFamily: "'Source Serif 4', Georgia, serif",
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
        <p style={{
          color: C.textPrimary,
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: "1.04rem", lineHeight: 1.6,
          marginBottom: bigIdea ? 8 : 12,
        }}>
          {wonder}
        </p>
      )}

      {bigIdea && (
        <p style={{
          color: C.textMuted, fontSize: "0.84rem", lineHeight: 1.55,
          fontStyle: "italic", marginBottom: (tryThis || spotTheSlip) ? 12 : 0,
        }}>
          {bigIdea}
        </p>
      )}

      {(tryThis || spotTheSlip) && (
        <div style={{ display: "grid", gap: 10 }}>
          {tryThis && card("Try this", tryThis)}
          {spotTheSlip && card("Spot the slip", spotTheSlip)}
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

export default function SynthesisPanel({ chose = [], experiment, accent = C.gold, positions = [], extra = null, mode = "story" }) {
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

      {/* Adult-corner cue: in K-5, label the deeper sections clearly. */}
      {mode === "kid" && (positions.length > 0 || experiment?.reference) && (
        <AdultCornerIntro accent={accent} />
      )}

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

      <StudentLab lab={experiment?.studentLab} accent={accent} />
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
