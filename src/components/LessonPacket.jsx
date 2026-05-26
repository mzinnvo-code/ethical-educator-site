import { useState } from "react";
import { C } from "../theme.js";
import { track } from "../lib/analytics.js";

function PacketSection({ title, eyebrow, color = C.gold, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const sectionId = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  return (
    <section className="lesson-packet-section" style={{
      border: `1px solid ${open ? color + "42" : C.border}`,
      borderRadius: 10,
      marginBottom: 12,
      background: open ? `${color}07` : "rgba(255,255,255,0.012)",
      overflow: "hidden",
    }}>
      <button
        type="button"
        className="lesson-packet-section-toggle no-print"
        aria-expanded={open}
        aria-controls={`${sectionId}-body`}
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          padding: "14px 16px",
          border: "none",
          background: "transparent",
          color: C.textPrimary,
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 14,
          textAlign: "left",
          fontFamily: "inherit",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          {eyebrow && (
            <span style={{
              color,
              fontSize: "0.62rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "2px 7px",
              border: `1px solid ${color}32`,
              borderRadius: 4,
              background: `${color}10`,
            }}>{eyebrow}</span>
          )}
          <span style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: "1rem",
            fontWeight: 700,
          }}>{title}</span>
        </span>
        <span aria-hidden="true" style={{
          color,
          transform: open ? "rotate(180deg)" : "rotate(0)",
          transition: "transform 0.22s ease",
        }}>▾</span>
      </button>
      <div
        id={`${sectionId}-body`}
        className="lesson-packet-section-body"
        style={{
          display: open ? "block" : "none",
          padding: "0 16px 18px",
          color: C.textSecondary,
          fontSize: "0.9rem",
          lineHeight: 1.7,
        }}
      >
        <div className="print-section-heading" style={{ display: "none" }}>
          <h3>{title}</h3>
        </div>
        {children}
      </div>
    </section>
  );
}

function List({ items, color = C.gold, ordered = false }) {
  if (!items?.length) return null;
  const Tag = ordered ? "ol" : "ul";

  return (
    <Tag style={{
      listStyle: "none",
      padding: 0,
      margin: 0,
      counterReset: ordered ? "lesson-list" : undefined,
    }}>
      {items.map((item, index) => (
        <li key={index} style={{
          position: "relative",
          padding: "6px 0 6px 26px",
          counterIncrement: ordered ? "lesson-list" : undefined,
        }}>
          <span aria-hidden="true" style={{
            position: "absolute",
            left: 0,
            top: 7,
            width: 17,
            height: 17,
            borderRadius: 999,
            border: `1px solid ${color}50`,
            color,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.68rem",
            fontWeight: 700,
            fontFamily: "'JetBrains Mono', monospace",
          }}>{ordered ? index + 1 : ""}</span>
          {item}
        </li>
      ))}
    </Tag>
  );
}

function TinyHeading({ children, color = C.gold }) {
  return (
    <p style={{
      color,
      fontSize: "0.66rem",
      fontWeight: 700,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      margin: "16px 0 8px",
    }}>{children}</p>
  );
}

function DetailGrid({ items, color = C.gold }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: 10,
      margin: "16px 0",
    }}>
      {items.map((item) => (
        <div key={item.label} style={{
          border: `1px solid ${C.border}`,
          borderRadius: 8,
          background: `${color}06`,
          padding: "12px 14px",
        }}>
          <p style={{
            color,
            fontSize: "0.62rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 5,
          }}>{item.label}</p>
          <p style={{ color: C.textPrimary, fontSize: "0.9rem", lineHeight: 1.45 }}>{item.value}</p>
        </div>
      ))}
    </div>
  );
}

function StandardsList({ standards }) {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      {standards.map((standard) => (
        <div key={standard.code} style={{
          border: `1px solid ${C.border}`,
          borderRadius: 8,
          padding: "10px 12px",
          background: "rgba(255,255,255,0.012)",
        }}>
          <p style={{
            color: C.gold,
            fontSize: "0.74rem",
            fontFamily: "'JetBrains Mono', monospace",
            lineHeight: 1.45,
            overflowWrap: "anywhere",
          }}>{standard.code}</p>
          <p style={{ color: C.textMuted, fontSize: "0.76rem", margin: "2px 0 4px" }}>{standard.source}</p>
          <p style={{ color: C.textSecondary, fontSize: "0.85rem", lineHeight: 1.55 }}>{standard.text}</p>
        </div>
      ))}
    </div>
  );
}

function VocabularyList({ words }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 10 }}>
      {words.map((word) => (
        <div key={word.term} style={{
          border: `1px solid ${C.border}`,
          borderRadius: 8,
          padding: "12px 14px",
          background: `${C.teal}06`,
        }}>
          <h4 style={{
            color: C.textPrimary,
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: "1rem",
            fontWeight: 700,
            marginBottom: 4,
          }}>{word.term}</h4>
          <p style={{ color: C.textSecondary, fontSize: "0.86rem", lineHeight: 1.58 }}>{word.studentDefinition}</p>
          {word.teacherNote && (
            <p style={{
              color: C.textMuted,
              fontSize: "0.78rem",
              lineHeight: 1.5,
              marginTop: 8,
              borderTop: `1px solid ${C.border}`,
              paddingTop: 8,
            }}>Teacher note: {word.teacherNote}</p>
          )}
        </div>
      ))}
    </div>
  );
}

function ActivityList({ activities }) {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {activities.map((activity) => (
        <div key={activity.title} style={{
          border: `1px solid ${C.border}`,
          borderLeft: `3px solid ${C.teal}`,
          borderRadius: "0 8px 8px 0",
          padding: "12px 14px",
          background: `${C.teal}05`,
        }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap", marginBottom: 8 }}>
            <h4 style={{
              color: C.textPrimary,
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: "1rem",
              fontWeight: 700,
            }}>{activity.title}</h4>
            <span style={{ color: C.teal, fontSize: "0.74rem", fontWeight: 700 }}>{activity.time}</span>
          </div>
          <List items={activity.steps} color={C.teal} ordered />
        </div>
      ))}
    </div>
  );
}

function LeveledText({ leveledText }) {
  return (
    <article style={{
      border: `1px solid ${C.border}`,
      borderRadius: 10,
      padding: "16px clamp(14px, 3vw, 20px)",
      background: `${C.midnight}55`,
    }}>
      <div style={{ borderBottom: `1px solid ${C.border}`, paddingBottom: 12, marginBottom: 14 }}>
        <p style={{ color: C.gold, fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
          Student Reading
        </p>
        <h4 style={{
          color: C.textPrimary,
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: "1.18rem",
          fontWeight: 700,
          marginTop: 4,
        }}>{leveledText.title}</h4>
        <p style={{ color: C.textMuted, fontSize: "0.82rem", lineHeight: 1.55, marginTop: 6 }}>{leveledText.readingLevel}</p>
        <p style={{ color: C.textMuted, fontSize: "0.82rem", lineHeight: 1.55, marginTop: 4 }}>{leveledText.teacherUse}</p>
      </div>
      {leveledText.sections.map((section) => (
        <section key={section.heading} style={{ marginTop: 16 }}>
          <h5 style={{
            color: C.textPrimary,
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: "1rem",
            fontWeight: 700,
            marginBottom: 5,
          }}>{section.heading}</h5>
          <p style={{ color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.76 }}>{section.body}</p>
        </section>
      ))}
    </article>
  );
}

function LessonFlow({ flow }) {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {flow.map((step) => (
        <div key={`${step.part}-${step.title}`} style={{
          border: `1px solid ${C.border}`,
          borderRadius: 8,
          padding: "12px 14px",
          background: `${C.gold}05`,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap", marginBottom: 8 }}>
            <div>
              <p style={{ color: C.gold, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>{step.part}</p>
              <h4 style={{
                color: C.textPrimary,
                fontFamily: "'Source Serif 4', Georgia, serif",
                fontSize: "1rem",
                fontWeight: 700,
              }}>{step.title}</h4>
            </div>
            <span style={{ color: C.textMuted, fontSize: "0.78rem", fontWeight: 700 }}>{step.time}</span>
          </div>
          <p style={{ marginBottom: 6 }}><strong style={{ color: C.textPrimary }}>Teacher move:</strong> {step.teacherMove}</p>
          <p style={{ marginBottom: 6 }}><strong style={{ color: C.textPrimary }}>Student task:</strong> {step.studentTask}</p>
          <TinyHeading color={C.teal}>Checks</TinyHeading>
          <List items={step.checks} color={C.teal} />
        </div>
      ))}
    </div>
  );
}

function RubricTable({ rubric }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{
        width: "100%",
        minWidth: 680,
        borderCollapse: "collapse",
        color: C.textSecondary,
        fontSize: "0.84rem",
      }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Criterion</th>
            {rubric.levels.map((level) => (
              <th key={level} style={tableHeaderStyle}>{level}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rubric.criteria.map((criterion) => (
            <tr key={criterion.name}>
              <td style={tableCellStyle}><strong style={{ color: C.textPrimary }}>{criterion.name}</strong></td>
              <td style={tableCellStyle}>{criterion.strong}</td>
              <td style={tableCellStyle}>{criterion.developing}</td>
              <td style={tableCellStyle}>{criterion.beginning}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const tableHeaderStyle = {
  textAlign: "left",
  color: C.gold,
  border: `1px solid ${C.border}`,
  padding: "9px 10px",
  fontSize: "0.72rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
};

const tableCellStyle = {
  border: `1px solid ${C.border}`,
  padding: "10px",
  verticalAlign: "top",
  lineHeight: 1.55,
};

function SourceList({ sources }) {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      {sources.map((source) => (
        <a
          key={source.href}
          href={source.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block",
            border: `1px solid ${C.border}`,
            borderRadius: 8,
            padding: "10px 12px",
            color: C.textSecondary,
            textDecoration: "none",
            background: "rgba(255,255,255,0.012)",
          }}
        >
          <strong style={{ color: C.textPrimary }}>{source.label}</strong>
          <span style={{ color: C.gold }}> ↗</span>
          <p style={{ color: C.textMuted, fontSize: "0.8rem", lineHeight: 1.5, marginTop: 4 }}>{source.why}</p>
        </a>
      ))}
    </div>
  );
}

export default function LessonPacket({ packet, accent = C.gold }) {
  if (!packet) return null;

  const handlePrint = () => {
    track("pdf_download", {
      slug: packet.id,
      type: "lesson_packet",
      placement: "ai_consciousness_lesson_packet",
    });
    window.print();
  };

  return (
    <article
      id={packet.id}
      className="lesson-packet-print"
      data-print-slug={packet.id}
      style={{
        margin: "34px 0",
        padding: "clamp(18px, 3vw, 26px)",
        border: `1px solid ${accent}34`,
        borderRadius: 14,
        background: `linear-gradient(135deg, ${accent}08, ${C.bgAlt})`,
      }}
    >
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 16,
        flexWrap: "wrap",
        marginBottom: 18,
      }}>
        <div style={{ flex: "1 1 420px", minWidth: 0 }}>
          <p style={{
            color: accent,
            fontSize: "0.68rem",
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            marginBottom: 6,
          }}>{packet.gradeLabel} · {packet.timing}</p>
          <h2 style={{
            color: C.textPrimary,
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: "clamp(1.55rem, 4vw, 2.2rem)",
            lineHeight: 1.12,
            fontWeight: 700,
            marginBottom: 8,
            overflowWrap: "break-word",
          }}>{packet.title}</h2>
          <p style={{ color: C.textSecondary, fontSize: "0.95rem", lineHeight: 1.65, maxWidth: 760 }}>{packet.subtitle}</p>
        </div>
        <button
          type="button"
          className="no-print"
          onClick={handlePrint}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "9px 14px",
            border: `1px solid ${accent}44`,
            borderRadius: 8,
            background: `${accent}14`,
            color: accent,
            cursor: "pointer",
            fontWeight: 700,
            fontSize: "0.82rem",
            fontFamily: "inherit",
          }}
          aria-label={`Print ${packet.gradeLabel} lesson packet`}
        >
          <span aria-hidden="true">Print</span>
        </button>
      </header>

      <DetailGrid color={accent} items={[
        { label: "Format", value: packet.format },
        { label: "Essential Question", value: packet.essentialQuestion },
        { label: "Assessment", value: packet.summativeAssessment.title },
      ]} />

      <PacketSection title="Teacher Overview" eyebrow="Start Here" color={accent} defaultOpen>
        <p>{packet.teacherOverview}</p>
      </PacketSection>

      <PacketSection title="Objectives And Materials" eyebrow="Prep" color={C.teal} defaultOpen>
        <TinyHeading color={C.teal}>Objectives</TinyHeading>
        <List items={packet.objectives} color={C.teal} />
        <TinyHeading color={C.gold}>Materials</TinyHeading>
        <List items={packet.materials} color={C.gold} />
      </PacketSection>

      <PacketSection title="Standards Alignment" eyebrow="National" color={C.gold}>
        <StandardsList standards={packet.standards} />
      </PacketSection>

      <PacketSection title="Vocabulary To Pre-Teach" eyebrow="Language" color={C.teal}>
        <VocabularyList words={packet.vocabulary} />
      </PacketSection>

      <PacketSection title="Before-Reading Activities" eyebrow="Launch" color={C.coral}>
        <ActivityList activities={packet.beforeReading} />
      </PacketSection>

      <PacketSection title="Leveled Article Text" eyebrow="Student Text" color={accent} defaultOpen>
        <LeveledText leveledText={packet.leveledText} />
      </PacketSection>

      <PacketSection title="Lesson Parts And Discussion Protocol" eyebrow="Run It" color={C.gold} defaultOpen>
        <LessonFlow flow={packet.lessonFlow} />
      </PacketSection>

      <PacketSection title="Checks For Understanding" eyebrow="Formative" color={C.teal}>
        <List items={packet.formativeChecks} color={C.teal} />
      </PacketSection>

      <PacketSection title="Summative Assessment" eyebrow="Assess" color={C.coral} defaultOpen>
        <div style={{
          border: `1px solid ${C.border}`,
          borderRadius: 8,
          padding: "14px 16px",
          background: `${C.coral}06`,
          marginBottom: 14,
        }}>
          <h4 style={{
            color: C.textPrimary,
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: "1.08rem",
            fontWeight: 700,
            marginBottom: 4,
          }}>{packet.summativeAssessment.title}</h4>
          <p style={{ color: C.textMuted, fontSize: "0.82rem", marginBottom: 10 }}>{packet.summativeAssessment.product}</p>
          <p style={{ color: C.textSecondary, lineHeight: 1.7 }}>{packet.summativeAssessment.prompt}</p>
        </div>
        <TinyHeading color={C.coral}>Success Criteria</TinyHeading>
        <List items={packet.summativeAssessment.successCriteria} color={C.coral} />
      </PacketSection>

      <PacketSection title="Rubric" eyebrow="Scoring" color={C.gold}>
        <RubricTable rubric={packet.rubric} />
      </PacketSection>

      <PacketSection title="Differentiation" eyebrow="Access" color={C.teal}>
        <div style={{ display: "grid", gap: 10 }}>
          {packet.differentiation.map((entry) => (
            <div key={entry.audience} style={{
              border: `1px solid ${C.border}`,
              borderRadius: 8,
              padding: "11px 13px",
              background: `${C.teal}05`,
            }}>
              <h4 style={{ color: C.textPrimary, fontSize: "0.92rem", fontWeight: 700, marginBottom: 4 }}>{entry.audience}</h4>
              <p style={{ color: C.textSecondary, fontSize: "0.86rem", lineHeight: 1.6 }}>{entry.support}</p>
            </div>
          ))}
        </div>
      </PacketSection>

      <PacketSection title="Extension And Teacher Notes" eyebrow="Extend" color={C.coral}>
        <p style={{ marginBottom: 14 }}>{packet.extension}</p>
        <TinyHeading color={C.coral}>Teacher Notes</TinyHeading>
        <List items={packet.teacherNotes} color={C.coral} />
      </PacketSection>

      <PacketSection title="Sources" eyebrow="Citations" color={accent}>
        <SourceList sources={packet.sources} />
      </PacketSection>
    </article>
  );
}
