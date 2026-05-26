import { useState } from "react";
import { C } from "../theme.js";
import { track } from "../lib/analytics.js";

// Map a free-text protocol name in a TeacherKit to a protocol id in the
// Dialogue Toolkit library, so we can deep-link.
const KNOWN_PROTOCOLS = {
  "talking circle": "talking-circle",
  "socratic seminar": "socratic-seminar",
  "fishbowl": "fishbowl",
  "four corners": "four-corners-debate",
  "structured academic": "structured-academic-controversy",
  "harkness": "harkness",
  "world café": "world-cafe",
  "world cafe": "world-cafe",
  "stakeholder roundtable": "stakeholder-roundtable",
  "continuum line": "continuum-line",
  "think-pair-share": "think-pair-share",
  "think pair share": "think-pair-share",
  "gallery walk": "gallery-walk",
  "silent conversation": "silent-conversation",
};
function findProtocolId(name) {
  if (!name) return null;
  const lower = name.toLowerCase();
  for (const [key, id] of Object.entries(KNOWN_PROTOCOLS)) {
    if (lower.includes(key)) return id;
  }
  return null;
}

/**
 * @typedef {Object} TeacherKit
 * @property {string} bigQuestion - The single guiding question of the lesson
 * @property {string[]} objectives - 2-4 student learning objectives ("Students will…")
 * @property {string[]} standards - Standards alignment (CCSS, C3, NGSS)
 * @property {string} warmUp - 3-5 minute opener; what students see on the board
 * @property {{name:string, why:string}} protocol - Recommended discussion protocol
 * @property {string[]} discussionPrompts - 3-4 open prompts for live discussion
 * @property {{trigger:string, redirect:string}[]} derailers - Common derailers and redirects
 * @property {string[]} sensitivities - Trauma/religion/cultural notes
 * @property {{ell?:string, iep?:string, advanced?:string}} differentiation - Accommodation notes
 * @property {string} handout - What goes on the printable student handout
 * @property {string} exitTicket - Single assessment question
 * @property {{subject:string, connection:string}[]} crossCurricular - Tie-ins
 * @property {string} homeExtension - 1-2 sentence family conversation prompt
 * @property {string} extension - "If time" multi-day extension activity
 * @property {{quick:string, standard:string, deep:string}} times - Time variants
 */

function Section({ title, color, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="kit-section" style={{
      border: `1px solid ${open ? color + "40" : C.border}`,
      borderRadius: 10, marginBottom: 10,
      background: open ? `${color}06` : "transparent",
      transition: "all 0.25s",
    }}>
      <button className="kit-section-toggle" onClick={() => setOpen(!open)} style={{
        width: "100%", padding: "12px 16px",
        background: "transparent", border: "none",
        color: C.textPrimary, fontFamily: "'Source Serif 4', Georgia, serif",
        fontSize: "0.95rem", fontWeight: 600, textAlign: "left",
        cursor: "pointer", display: "flex", justifyContent: "space-between",
        alignItems: "center", gap: 12,
      }} aria-expanded={open}>
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            width: 6, height: 6, borderRadius: 999,
            background: color, display: "inline-block",
          }} />
          {title}
        </span>
        <span style={{ color, fontSize: "0.85rem", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.25s" }}>▾</span>
      </button>
      <div className="kit-section-body" style={{
          display: open ? "block" : "none",
          padding: "0 16px 16px",
          color: C.textSecondary,
          fontSize: "0.88rem", lineHeight: 1.7,
        }}>
          {children}
        </div>
    </div>
  );
}

function StringList({ items, marker = "•" }) {
  if (!items?.length) return null;
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {items.map((it, i) => (
        <li key={i} style={{
          padding: "5px 0", paddingLeft: 18, position: "relative",
        }}>
          <span style={{ position: "absolute", left: 0, color: C.gold }}>{marker}</span>
          {it}
        </li>
      ))}
    </ul>
  );
}

export default function TeacherKit({ kit, experiment, accent = C.gold }) {
  if (!kit) return null;

  const handlePrint = () => {
    const slug = experiment?.id || experiment?.title || "unknown-kit";
    track("pdf_download", { slug, type: "kit", placement: "teacher_kit" });
    window.print();
  };
  const packetHref = kit.packetSlug ? `/thought-experiments/packet/${kit.packetSlug}` : null;
  const handlePacketOpen = () => {
    const slug = kit.packetSlug || experiment?.id || "unknown-packet";
    track("packet_open", { slug, type: "classroom_packet", placement: "teacher_kit" });
  };

  return (
    <>
      <div className="teacher-kit-print" data-print-slug={experiment?.id || ""} style={{
        marginTop: 22,
        background: `linear-gradient(135deg, ${accent}06, ${C.bgAlt})`,
        border: `1px solid ${accent}30`,
        borderRadius: 14, padding: "20px 22px",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, gap: 12, flexWrap: "wrap" }}>
          <div>
            <p style={{ color: accent, fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>
              For Teachers · Lesson Plan
            </p>
            <h3 style={{ color: C.textPrimary, fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.15rem", fontWeight: 700, marginTop: 4 }}>
              {experiment.title}
            </h3>
          </div>
          <div className="no-print" style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
            {packetHref && (
              <a
                href={packetHref}
                onClick={handlePacketOpen}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "8px 15px",
                  background: `linear-gradient(135deg, ${C.gold}, ${C.coral})`,
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  boxShadow: `0 8px 22px ${C.gold}24`,
                }}
                aria-label="Open classroom packet"
              >
                Open classroom packet
              </a>
            )}
            <button onClick={handlePrint} style={{
              padding: "7px 14px",
              background: `${accent}15`, color: accent,
              border: `1px solid ${accent}40`, borderRadius: 8,
              cursor: "pointer", fontSize: "0.78rem", fontWeight: 600,
            }} aria-label="Print this lesson plan">
              🖨 Print this kit
            </button>
          </div>
        </div>

        {/* Top-line: big question + times */}
        <div style={{
          background: C.surface, border: `1px solid ${C.border}`,
          borderRadius: 10, padding: "12px 16px", marginBottom: 14,
        }}>
          {kit.philosophicalTheme && (
            <p style={{
              color: accent,
              fontSize: "0.66rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: 8,
            }}>
              Theme: {kit.philosophicalTheme}
            </p>
          )}
          <p style={{ fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.gold, marginBottom: 6 }}>
            The big question
          </p>
          <p style={{ color: C.textPrimary, fontSize: "1.02rem", fontFamily: "'Source Serif 4', Georgia, serif", lineHeight: 1.5, marginBottom: 10 }}>
            {kit.bigQuestion}
          </p>
          {kit.times && (
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: "0.78rem", color: C.textSecondary }}>
              <span>⏱ <strong style={{ color: C.textPrimary }}>Quick:</strong> {kit.times.quick}</span>
              <span><strong style={{ color: C.textPrimary }}>Standard:</strong> {kit.times.standard}</span>
              <span><strong style={{ color: C.textPrimary }}>Deep:</strong> {kit.times.deep}</span>
            </div>
          )}
        </div>

        {/* Objectives + Standards */}
        <Section title="Learning objectives" color={C.teal} defaultOpen>
          <StringList items={kit.objectives} marker="→" />
          {kit.standards?.length > 0 && (
            <>
              <p style={{ marginTop: 12, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.textMuted }}>
                Standards alignment
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "6px 0 0" }}>
                {kit.standards.map((s, i) => (
                  <li key={i} style={{ padding: "3px 0", color: C.textMuted, fontSize: "0.8rem", fontFamily: "'JetBrains Mono', monospace" }}>{s}</li>
                ))}
              </ul>
            </>
          )}
        </Section>

        {/* Run of show */}
        <Section title="Run of show" color={C.gold} defaultOpen>
          <p style={{ color: C.textPrimary, marginBottom: 8 }}>
            <strong style={{ color: C.gold }}>Warm-up (3–5 min):</strong> {kit.warmUp}
          </p>
          {kit.protocol && (() => {
            const pid = findProtocolId(kit.protocol.name);
            const NameEl = pid ? (
              <a
                href={`/thought-experiments/toolkit?protocol=${pid}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: C.gold,
                  borderBottom: `1px solid ${C.gold}60`,
                  textDecoration: "none",
                }}
                title="Open this protocol in the Dialogue Toolkit (new tab)"
              >{kit.protocol.name} ↗</a>
            ) : kit.protocol.name;
            return (
              <p style={{ marginBottom: 8 }}>
                <strong style={{ color: C.gold }}>Protocol:</strong> {NameEl}
                <span style={{ color: C.textMuted, fontStyle: "italic" }}> — {kit.protocol.why}</span>
              </p>
            );
          })()}
          {kit.extension && (
            <p style={{ marginTop: 10, padding: "8px 12px", background: `${C.gold}08`, borderLeft: `2px solid ${C.gold}`, borderRadius: "0 6px 6px 0" }}>
              <strong style={{ color: C.gold }}>If time:</strong> {kit.extension}
            </p>
          )}
        </Section>

        {/* Discussion prompts */}
        <Section title="Open discussion prompts" color={C.coral} defaultOpen>
          <p style={{ fontSize: "0.78rem", color: C.textMuted, marginBottom: 8, fontStyle: "italic" }}>
            Use these instead of (or after) the multiple-choice — they open the space for live dialogue.
          </p>
          <StringList items={kit.discussionPrompts} marker="?" />
        </Section>

        {(kit.reasoningExercise || kit.relatedExperiments?.length > 0) && (
          <Section title="Reasoning exercise" color={C.teal}>
            {kit.reasoningExercise?.fallacy && (
              <p style={{ marginBottom: 8 }}>
                <strong style={{ color: C.teal }}>Fallacy to spot:</strong> {kit.reasoningExercise.fallacy}
              </p>
            )}
            {kit.reasoningExercise?.repair && (
              <p style={{ marginBottom: 8 }}>
                <strong style={{ color: C.teal }}>Argument repair:</strong> {kit.reasoningExercise.repair}
              </p>
            )}
            {kit.reasoningExercise?.variation && (
              <p style={{ marginBottom: 8 }}>
                <strong style={{ color: C.teal }}>Student variation:</strong> {kit.reasoningExercise.variation}
              </p>
            )}
            {kit.relatedExperiments?.length > 0 && (
              <p style={{ color: C.textMuted, fontSize: "0.82rem", marginTop: 10 }}>
                Related experiments: {kit.relatedExperiments.join(", ")}
              </p>
            )}
          </Section>
        )}

        {/* Safety & derailers */}
        <Section title="Common derailers & how to redirect" color={C.coral}>
          {kit.derailers?.length > 0 ? (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {kit.derailers.map((d, i) => (
                <li key={i} style={{ padding: "8px 0", borderBottom: i < kit.derailers.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <p style={{ color: C.textPrimary, fontSize: "0.85rem", marginBottom: 4 }}>
                    <strong style={{ color: C.coral }}>If:</strong> {d.trigger}
                  </p>
                  <p style={{ color: C.textSecondary, fontSize: "0.84rem", paddingLeft: 12, borderLeft: `2px solid ${C.coral}40` }}>
                    <strong style={{ color: C.coral }}>Try:</strong> {d.redirect}
                  </p>
                </li>
              ))}
            </ul>
          ) : <p style={{ color: C.textMuted, fontStyle: "italic" }}>No specific derailers expected — see general dialogue norms in the Hub.</p>}

          {kit.sensitivities?.length > 0 && (
            <>
              <p style={{ marginTop: 14, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.coral }}>
                Sensitivities to watch for
              </p>
              <StringList items={kit.sensitivities} marker="◆" />
            </>
          )}
        </Section>

        {/* Differentiation */}
        {(kit.differentiation?.ell || kit.differentiation?.iep || kit.differentiation?.advanced) && (
          <Section title="Differentiation" color={C.ocean}>
            {kit.differentiation.ell && (
              <p style={{ marginBottom: 8 }}>
                <strong style={{ color: C.ocean }}>For ELL students:</strong> {kit.differentiation.ell}
              </p>
            )}
            {kit.differentiation.iep && (
              <p style={{ marginBottom: 8 }}>
                <strong style={{ color: C.ocean }}>For IEP/504:</strong> {kit.differentiation.iep}
              </p>
            )}
            {kit.differentiation.advanced && (
              <p style={{ marginBottom: 0 }}>
                <strong style={{ color: C.ocean }}>For advanced:</strong> {kit.differentiation.advanced}
              </p>
            )}
          </Section>
        )}

        {/* Handout + exit ticket */}
        <Section title="Student handout & exit ticket" color={C.teal}>
          {kit.handout && (
            <div style={{ marginBottom: 12 }}>
              <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.teal, marginBottom: 6 }}>
                Handout (single page, no AI)
              </p>
              <p style={{ padding: 12, background: C.surface, border: `1px dashed ${C.border}`, borderRadius: 8, fontSize: "0.86rem", color: C.textPrimary }}>
                {kit.handout}
              </p>
            </div>
          )}
          {kit.exitTicket && (
            <div>
              <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.teal, marginBottom: 6 }}>
                Exit ticket
              </p>
              <p style={{ padding: 12, background: C.surface, border: `1px dashed ${C.border}`, borderRadius: 8, fontSize: "0.86rem", color: C.textPrimary, fontFamily: "'Source Serif 4', Georgia, serif" }}>
                {kit.exitTicket}
              </p>
            </div>
          )}
        </Section>

        {/* Cross-curricular */}
        {kit.crossCurricular?.length > 0 && (
          <Section title="Cross-curricular tie-ins" color={C.gold}>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {kit.crossCurricular.map((cc, i) => (
                <li key={i} style={{ padding: "5px 0" }}>
                  <strong style={{ color: C.gold }}>{cc.subject}:</strong> {cc.connection}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Home extension */}
        {kit.homeExtension && (
          <Section title="At-home extension" color={C.coral}>
            <p style={{ color: C.textPrimary, fontSize: "0.92rem", fontStyle: "italic", lineHeight: 1.7 }}>
              {kit.homeExtension}
            </p>
            <p style={{ color: C.textMuted, fontSize: "0.78rem", marginTop: 8 }}>
              Send home with students for a family dinner conversation. No internet or AI required.
            </p>
          </Section>
        )}
      </div>
    </>
  );
}
