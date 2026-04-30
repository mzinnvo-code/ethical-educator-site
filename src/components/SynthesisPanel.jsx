import { C } from "../theme.js";
import { EthicalLensTag, FurtherReadingList } from "../experiments/ExperimentShared.jsx";
import { TOPIC_BY_ID } from "../data/topics.js";

// Displays at the end of a multi-stage scenario. Renders:
//   - the "path" of choices the user took (one card per stage)
//   - the contrasted lens(es)
//   - the source + further reading
//   - optional positions panel (3 named philosophers / schools — provided by stage author)
export default function SynthesisPanel({ chose = [], experiment, accent = C.gold, positions = [], extra = null }) {
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
