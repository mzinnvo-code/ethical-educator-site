import { track } from "../lib/analytics.js";
import "../styles/classroomPacket.css";

function PillList({ items }) {
  return (
    <div className="packet-pill-list">
      {items.map(item => (
        <span key={`${item.label}-${item.value}`} className="packet-pill">
          <strong>{item.label}</strong>
          {item.value}
        </span>
      ))}
    </div>
  );
}

function NumberedList({ items }) {
  return (
    <ol className="packet-number-list">
      {items.map((item, index) => (
        <li key={`${item.slice(0, 28)}-${index}`}>{item}</li>
      ))}
    </ol>
  );
}

function PlainList({ items, className = "" }) {
  return (
    <ul className={`packet-list ${className}`.trim()}>
      {items.map((item, index) => (
        <li key={`${String(item).slice(0, 28)}-${index}`}>{item}</li>
      ))}
    </ul>
  );
}

function PageHeader({ eyebrow, title, note }) {
  return (
    <header className="packet-page-header">
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      {note && <span>{note}</span>}
    </header>
  );
}

function InfoCard({ label, children, tone = "teal" }) {
  return (
    <section className={`packet-info-card packet-info-card-${tone}`}>
      <h3>{label}</h3>
      {children}
    </section>
  );
}

function WorksheetLines({ count = 4 }) {
  return (
    <div className="packet-lines" aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <span key={index} />
      ))}
    </div>
  );
}

function Toolbar({ packet, navigate }) {
  const handlePrint = () => {
    track("pdf_download", {
      slug: packet.slug,
      type: "classroom_packet",
      placement: "classroom_packet_toolbar",
    });
    window.print();
  };

  return (
    <div className="packet-toolbar no-print">
      <button
        type="button"
        className="packet-toolbar-link"
        onClick={() => navigate?.(`thought-experiments/9-12?experiment=${packet.experimentId}`)}
      >
        Back to experiment
      </button>
      <button type="button" className="packet-print-button" onClick={handlePrint}>
        Print or save PDF
      </button>
    </div>
  );
}

export default function ClassroomPacket({ packet, navigate }) {
  if (!packet) return null;

  const { teacherGuide, studentMaterials, extensions } = packet;

  return (
    <div className="classroom-packet-route packet-print-mode">
      <Toolbar packet={packet} navigate={navigate} />

      <article className="packet-stack" aria-label={`${packet.title} classroom packet`}>
        <section className="packet-page packet-page-cover packet-editorial-page">
          <div className="packet-cover-grid">
            <div className="packet-cover-copy">
              <p className="packet-kicker">The Examined Classroom</p>
              <h1>{packet.title}</h1>
              <p className="packet-subtitle">{packet.subtitle}</p>
              <div className="packet-essential">
                <span>Essential Question</span>
                <strong>{packet.essentialQuestion}</strong>
              </div>
              <PillList items={[
                { label: "Grade", value: packet.gradeBand },
                { label: "Format", value: "Full classroom packet" },
                { label: "Subject", value: packet.subject },
              ]} />
            </div>
            <figure className="packet-cover-art">
              <img src={packet.heroImage} alt="" />
            </figure>
          </div>
          <div className="packet-cover-footer">
            <span>AI ethics and philosophical reasoning</span>
            <span>Teacher guide + student materials</span>
          </div>
        </section>

        <section className="packet-page packet-premium-page">
          <PageHeader eyebrow="Teacher Guide" title="At a Glance" note="Use this page to prep the lesson." />
          <div className="packet-two-column">
            <InfoCard label="Big Question" tone="gold">
              <p className="packet-large-text">{teacherGuide.bigQuestion}</p>
            </InfoCard>
            <InfoCard label="Time Options" tone="teal">
              <PillList items={packet.timing} />
            </InfoCard>
          </div>
          <div className="packet-two-column packet-roomy-grid">
            <InfoCard label="Learning Objectives" tone="teal">
              <NumberedList items={teacherGuide.objectives} />
            </InfoCard>
            <InfoCard label="Materials and Prep" tone="coral">
              <PlainList items={teacherGuide.materials} />
            </InfoCard>
          </div>
          <InfoCard label="Standards Alignment" tone="ocean">
            <PlainList items={teacherGuide.standards} className="packet-compact-list" />
          </InfoCard>
          <section className="packet-vocabulary">
            <h3>Vocabulary</h3>
            <div className="packet-vocab-grid">
              {teacherGuide.vocabulary.map(item => (
                <div key={item.term} className="packet-vocab-card">
                  <strong>{item.term}</strong>
                  <span>{item.definition}</span>
                </div>
              ))}
            </div>
          </section>
        </section>

        <section className="packet-page packet-premium-page">
          <PageHeader eyebrow="Teacher Guide" title="Run of Show" note="Flexible timing. Use what fits your class period." />
          <InfoCard label="Warm-Up" tone="gold">
            <p>{teacherGuide.warmUp}</p>
          </InfoCard>
          <InfoCard label="Recommended Protocol" tone="teal">
            <p><strong>{teacherGuide.protocol.name}:</strong> {teacherGuide.protocol.why}</p>
          </InfoCard>
          <div className="packet-timeline">
            {teacherGuide.runOfShow.map(item => (
              <div key={`${item.time}-${item.label}`} className="packet-timeline-row">
                <span>{item.time}</span>
                <div>
                  <strong>{item.label}</strong>
                  <p>{item.teacherMove}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="packet-two-column">
            <InfoCard label="Discussion Prompts" tone="coral">
              <PlainList items={teacherGuide.discussionPrompts} />
            </InfoCard>
            <InfoCard label="Facilitation Moves" tone="ocean">
              <ul className="packet-list">
                {teacherGuide.teacherMoves.map(item => (
                  <li key={item.label}><strong>{item.label}:</strong> {item.move}</li>
                ))}
              </ul>
            </InfoCard>
          </div>
        </section>

        <section className="packet-page packet-editorial-page packet-section-opener">
          <p className="packet-kicker">Student Materials</p>
          <h2>From Paperclips to the Systems Around Us</h2>
          <p>
            Students move from the classic thought experiment into an optimizer audit:
            What goal is being maximized, what values disappear, and what guardrails
            would keep the system answerable to human judgment?
          </p>
          <div className="packet-opener-callout">
            <strong>Teacher note:</strong>
            Photocopy the next two pages for students. They are intentionally lighter,
            cleaner, and lower-ink than the cover and guide pages.
          </div>
        </section>

        <section className="packet-page packet-student-page">
          <PageHeader eyebrow="Student Handout" title={studentMaterials.auditTitle} note="Name: ____________________" />
          <p className="packet-student-prompt">{studentMaterials.auditPrompt}</p>
          <div className="packet-worksheet-grid">
            {studentMaterials.auditFields.map((field, index) => (
              <label key={field} className={index >= 4 ? "packet-wide-field" : ""}>
                <span>{field}</span>
                <WorksheetLines count={index >= 4 ? 4 : 3} />
              </label>
            ))}
          </div>
        </section>

        <section className="packet-page packet-student-page">
          <PageHeader eyebrow="Student Handout" title="Discussion Tracker and Exit Ticket" note="Use during seminar." />
          <div className="packet-discussion-prompts">
            {studentMaterials.discussionTracker.map((prompt, index) => (
              <label key={prompt}>
                <span>{index + 1}. {prompt}</span>
                <WorksheetLines count={3} />
              </label>
            ))}
          </div>
          <div className="packet-exit-ticket">
            <h3>Exit Ticket</h3>
            <p>{studentMaterials.exitTicket}</p>
            <WorksheetLines count={5} />
          </div>
        </section>

        <section className="packet-page packet-premium-page">
          <PageHeader eyebrow="Teacher Support" title="Redirects, Differentiation, and Assessment" note="Keep the discussion usable and humane." />
          <div className="packet-two-column">
            <InfoCard label="Common Derailers" tone="coral">
              <ul className="packet-list">
                {teacherGuide.derailers.map(item => (
                  <li key={item.trigger}>
                    <strong>If:</strong> {item.trigger}<br />
                    <strong>Try:</strong> {item.redirect}
                  </li>
                ))}
              </ul>
            </InfoCard>
            <InfoCard label="Sensitivities" tone="gold">
              <PlainList items={teacherGuide.sensitivities} />
            </InfoCard>
          </div>
          <InfoCard label="Differentiation" tone="ocean">
            <div className="packet-differentiation">
              <p><strong>ELL:</strong> {teacherGuide.differentiation.ell}</p>
              <p><strong>IEP/504:</strong> {teacherGuide.differentiation.iep}</p>
              <p><strong>Advanced:</strong> {teacherGuide.differentiation.advanced}</p>
            </div>
          </InfoCard>
          <InfoCard label="Assessment Notes" tone="teal">
            <PlainList items={teacherGuide.assessmentNotes} />
          </InfoCard>
        </section>

        <section className="packet-page packet-premium-page">
          <PageHeader eyebrow="Extend the Lesson" title="Connections, Home Extension, and Project Option" note="Use these when the discussion needs more room." />
          <section className="packet-cross-curricular">
            <h3>Cross-Curricular Connections</h3>
            {extensions.crossCurricular.map(item => (
              <div key={item.subject} className="packet-connection-card">
                <strong>{item.subject}</strong>
                <p>{item.connection}</p>
              </div>
            ))}
          </section>
          <div className="packet-two-column">
            <InfoCard label="Home Extension" tone="coral">
              <p>{extensions.homeExtension}</p>
            </InfoCard>
            <InfoCard label="Project Option" tone="teal">
              <p>{extensions.project}</p>
            </InfoCard>
          </div>
          <div className="packet-footer-note">
            The Examined Classroom - classroom-ready thought experiments for careful AI ethics conversations.
          </div>
        </section>
      </article>
    </div>
  );
}
