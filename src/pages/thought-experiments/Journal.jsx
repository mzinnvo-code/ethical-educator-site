import { useState } from "react";
import { C } from "../../theme.js";
import {
  FadeIn, SectionTitle, Subtitle, Narrow, PageContainer, Divider,
  BodyText, ContinueExploring,
} from "../../components/shared.jsx";
import useDecisionJournal, {
  entriesToMarkdown, downloadMarkdown,
} from "../../hooks/useDecisionJournal.js";

const SIBLING_LINKS = [
  { id: "thought-experiments", title: "Hub & explainer", desc: "Back to the library", color: C.teal },
  { id: "thought-experiments/k-5", title: "K–5", desc: "Elementary stories", color: C.coral },
  { id: "thought-experiments/6-8", title: "Grades 6–8", desc: "Story-based dilemmas", color: C.gold },
  { id: "thought-experiments/9-12", title: "Grades 9–12", desc: "The canon", color: C.ocean },
  { id: "thought-experiments/toolkit", title: "Dialogue Toolkit", desc: "Norms and protocols", color: C.teal },
];

function formatDate(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleString(undefined, {
      year: "numeric", month: "short", day: "numeric",
      hour: "numeric", minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function lensLabel(id) {
  if (!id) return null;
  return id.replace(/-/g, " ");
}

function gradeLabel(band) {
  if (!band) return "";
  if (band === "k-5") return "K–5";
  if (band === "6-8") return "Grades 6–8";
  if (band === "9-12") return "Grades 9–12";
  if (band === "educators") return "Educators";
  return band;
}

function EmptyState() {
  return (
    <div style={{
      background: C.surface, border: `1px solid ${C.border}`,
      borderRadius: 12, padding: "28px 24px", textAlign: "center",
    }}>
      <p style={{
        fontFamily: "'Source Serif 4', Georgia, serif",
        color: C.textPrimary, fontSize: "1.05rem", lineHeight: 1.6,
        marginBottom: 10,
      }}>
        Your journal is empty.
      </p>
      <p style={{ color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.7, marginBottom: 6 }}>
        At the end of any thought experiment, look for the <strong>Save to journal</strong> button on the
        synthesis panel. Saved reasoning lives only in this browser — nothing is sent anywhere.
      </p>
      <p style={{ color: C.textMuted, fontSize: "0.84rem", lineHeight: 1.6 }}>
        Use the journal to track how your thinking changes over time, prep for a class discussion,
        or export a record of your reasoning to share with a teacher or classmate.
      </p>
    </div>
  );
}

function Entry({ entry, journal }) {
  const [expanded, setExpanded] = useState(false);
  const [notesValue, setNotesValue] = useState(entry.notes || "");

  const handleNotesBlur = () => {
    if (notesValue !== entry.notes) {
      journal.updateNotes(entry.id, notesValue);
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Remove "${entry.experimentTitle}" from your journal? This can't be undone.`)) {
      journal.removeEntry(entry.id);
    }
  };

  return (
    <div style={{
      background: C.surface, border: `1px solid ${C.border}`,
      borderRadius: 12, padding: "16px 18px", marginBottom: 14,
    }}>
      <div style={{
        display: "flex", alignItems: "flex-start", justifyContent: "space-between",
        gap: 12, flexWrap: "wrap",
      }}>
        <div style={{ flex: "1 1 220px", minWidth: 220 }}>
          <p style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            color: C.textPrimary, fontSize: "1.04rem", fontWeight: 700,
            lineHeight: 1.4, marginBottom: 4,
          }}>
            {entry.experimentTitle}
          </p>
          <p style={{ color: C.textMuted, fontSize: "0.78rem", lineHeight: 1.5 }}>
            {formatDate(entry.savedAt)}
            {entry.gradeBand && <> · {gradeLabel(entry.gradeBand)}</>}
            {entry.dominantLens && (
              <> · leaned <strong style={{ color: C.gold }}>{lensLabel(entry.dominantLens)}</strong></>
            )}
          </p>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button
            onClick={() => setExpanded(v => !v)}
            style={{
              padding: "6px 12px", background: "transparent",
              border: `1px solid ${C.border}`, borderRadius: 6,
              color: C.textSecondary, cursor: "pointer", fontSize: "0.78rem",
            }}
          >
            {expanded ? "Hide" : "Open"}
          </button>
          <button
            onClick={handleDelete}
            aria-label="Remove this entry from your journal"
            style={{
              padding: "6px 12px", background: "transparent",
              border: `1px solid ${C.border}`, borderRadius: 6,
              color: C.textMuted, cursor: "pointer", fontSize: "0.78rem",
            }}
          >
            Remove
          </button>
        </div>
      </div>

      {expanded && (
        <div style={{ marginTop: 14 }}>
          {entry.path?.length > 0 && (
            <ol style={{ listStyle: "none", padding: 0, margin: "0 0 14px" }}>
              {entry.path.map((step, i) => (
                <li key={i} style={{
                  padding: "8px 0",
                  borderBottom: i < entry.path.length - 1 ? `1px solid ${C.border}` : "none",
                  display: "flex", gap: 10,
                }}>
                  <span style={{
                    flexShrink: 0, width: 22, height: 22, borderRadius: "50%",
                    background: C.gold, color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.72rem", fontWeight: 700,
                  }}>{i + 1}</span>
                  <div>
                    {step.stageTitle && (
                      <p style={{ color: C.textMuted, fontSize: "0.74rem", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 2 }}>
                        {step.stageTitle}
                      </p>
                    )}
                    <p style={{
                      color: C.textPrimary, fontSize: "0.9rem",
                      fontFamily: "'Source Serif 4', Georgia, serif", lineHeight: 1.55,
                    }}>
                      {step.optionText}
                    </p>
                    {step.lens && (
                      <p style={{ color: C.gold, fontSize: "0.7rem", marginTop: 2, letterSpacing: "0.06em" }}>
                        {lensLabel(step.lens)}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          )}

          <label style={{
            display: "block", color: C.textSecondary, fontSize: "0.78rem",
            fontWeight: 600, letterSpacing: "0.04em", marginBottom: 6,
          }}>
            My notes
          </label>
          <textarea
            value={notesValue}
            onChange={e => setNotesValue(e.target.value)}
            onBlur={handleNotesBlur}
            placeholder="What still bothers you about this answer? What would you push back on?"
            rows={4}
            style={{
              width: "100%", padding: "10px 12px",
              background: C.bg, border: `1px solid ${C.border}`,
              borderRadius: 8, color: C.textPrimary,
              fontSize: "0.88rem", lineHeight: 1.6,
              fontFamily: "'Source Serif 4', Georgia, serif",
              resize: "vertical",
            }}
          />
          <p style={{ color: C.textMuted, fontSize: "0.72rem", marginTop: 4 }}>
            Notes save when you click outside the box.
          </p>
        </div>
      )}
    </div>
  );
}

export default function Journal({ navigate }) {
  const journal = useDecisionJournal();
  const { entries } = journal;

  const handleExport = () => {
    const md = entriesToMarkdown(entries);
    const date = new Date().toISOString().slice(0, 10);
    downloadMarkdown(`decision-journal-${date}.md`, md);
  };

  const handleClearAll = () => {
    if (!entries.length) return;
    if (window.confirm(`Remove all ${entries.length} entries from your journal? This can't be undone.`)) {
      journal.clearEntries();
    }
  };

  const handleOptOut = () => {
    if (window.confirm("Opt out of the Decision Journal and remove all saved entries from this device?")) {
      journal.optOutAndClear();
    }
  };

  return (
    <div style={{ padding: "80px 0 100px", background: C.bg }}>
      <PageContainer>
        <FadeIn>
          <p style={{
            fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em",
            textTransform: "uppercase", color: C.gold, marginBottom: 10,
          }}>
            Thought Experiments · Decision Journal
          </p>
          <SectionTitle>Decision Journal</SectionTitle>
          <Subtitle>
            A private record of how you reasoned through each thought experiment.
            Saved on this device only — nothing is sent to any server.
          </Subtitle>
        </FadeIn>

        <Narrow>
          <Divider label={entries.length ? `${entries.length} ${entries.length === 1 ? "entry" : "entries"}` : "Empty"} />

          {entries.length > 0 && (
            <FadeIn>
              <div style={{
                display: "flex", gap: 10, flexWrap: "wrap",
                marginBottom: 20, alignItems: "center",
              }}>
                <button
                  onClick={handleExport}
                  style={{
                    padding: "9px 18px",
                    background: `linear-gradient(135deg, ${C.gold}, ${C.gold}cc)`,
                    border: "none", borderRadius: 8, color: "#fff",
                    cursor: "pointer", fontSize: "0.86rem", fontWeight: 600,
                    boxShadow: `0 4px 14px ${C.gold}30`,
                  }}
                >
                  Export as Markdown
                </button>
                <button
                  onClick={handleClearAll}
                  style={{
                    padding: "9px 16px", background: "transparent",
                    border: `1px solid ${C.border}`, borderRadius: 8,
                    color: C.textMuted, cursor: "pointer", fontSize: "0.84rem",
                  }}
                >
                  Clear all
                </button>
              </div>
            </FadeIn>
          )}

          {entries.length === 0 ? (
            <FadeIn><EmptyState /></FadeIn>
          ) : (
            <FadeIn>
              {entries.map(entry => (
                <Entry key={entry.id} entry={entry} journal={journal} />
              ))}
            </FadeIn>
          )}

          {journal.optedIn && entries.length === 0 && (
            <p style={{ color: C.textMuted, fontSize: "0.82rem", marginTop: 16 }}>
              You've opted in to the journal but haven't saved anything yet.{" "}
              <button
                onClick={handleOptOut}
                style={{
                  background: "none", border: "none", color: C.coral,
                  cursor: "pointer", fontSize: "0.82rem", padding: 0,
                  textDecoration: "underline",
                }}
              >
                Opt out
              </button>
            </p>
          )}

          <FadeIn>
            <BodyText style={{ marginTop: 24, color: C.textMuted, fontSize: "0.82rem", lineHeight: 1.7 }}>
              <strong>About this journal.</strong> Entries are stored only in this browser's local storage.
              They are never transmitted, never associated with an account, and never visible to anyone
              with access to a different browser or device. Clearing your browser data will erase the
              journal. Use <em>Export as Markdown</em> to keep a copy outside the browser.
            </BodyText>
          </FadeIn>

          <FadeIn>
            <ContinueExploring navigate={navigate} links={SIBLING_LINKS} />
          </FadeIn>
        </Narrow>
      </PageContainer>
    </div>
  );
}
