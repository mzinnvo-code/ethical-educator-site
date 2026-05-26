import { C } from "../theme.js";
import {
  ContinueExploring,
  Divider,
  FadeIn,
  ImagePageHeader,
  Narrow,
  PageContainer,
} from "../components/shared.jsx";
import LessonPacket from "../components/LessonPacket.jsx";
import {
  AI_CONSCIOUSNESS_LESSON_PACKETS,
  AI_CONSCIOUSNESS_STANDARDS_SOURCE_LINKS,
} from "../data/aiConsciousnessLessonPackets.js";
import { AI_ETHICS_ARTICLE_BY_ROUTE } from "../data/aiEthicsVisuals.js";

const articleVisual = AI_ETHICS_ARTICLE_BY_ROUTE["ai-consciousness"];

function LinkOut({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: C.gold }}>
      {children}
    </a>
  );
}

function AnchorButton({ href, children, color = C.gold }) {
  return (
    <a
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "9px 13px",
        border: `1px solid ${color}40`,
        borderRadius: 8,
        background: `${color}12`,
        color,
        textDecoration: "none",
        fontWeight: 700,
        fontSize: "0.82rem",
      }}
    >
      {children}
    </a>
  );
}

function TeacherUseCard({ title, body, color = C.gold }) {
  return (
    <div style={{
      border: `1px solid ${color}28`,
      borderRadius: 8,
      padding: "15px 16px",
      background: `${color}07`,
    }}>
      <h3 style={{
        color: C.textPrimary,
        fontFamily: "'Source Serif 4', Georgia, serif",
        fontSize: "1.02rem",
        fontWeight: 700,
        marginBottom: 6,
      }}>{title}</h3>
      <p style={{ color: C.textSecondary, fontSize: "0.88rem", lineHeight: 1.62 }}>{body}</p>
    </div>
  );
}

export default function AIConsciousnessLessonPlans({ navigate }) {
  return (
    <div style={{ padding: "80px 0", background: C.bgAlt }}>
      <PageContainer>
        <ImagePageHeader
          label="AI Ethics · Teacher Lesson Packets"
          title="The Consciousness Line Lesson Packets"
          subtitle="Two complete, print-friendly lesson packets that help students read The Consciousness Line with care: one for grades 6-8 and one for grades 9-12. Each packet includes a leveled article adaptation, vocabulary, standards, activities, discussion structure, assessment, rubric, differentiation, and teacher notes."
          image={articleVisual.image}
          imageAlt={articleVisual.imageAlt}
          accent={articleVisual.accent}
        />

        <Narrow>
          <FadeIn delay={0.04}>
            <section style={{
              border: `1px solid ${articleVisual.accent}28`,
              borderRadius: 12,
              padding: "18px clamp(16px, 3vw, 22px)",
              background: `linear-gradient(135deg, ${articleVisual.accent}08, ${C.midnight}55)`,
              marginBottom: 28,
            }}>
              <p style={{
                color: C.gold,
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: 10,
              }}>
                Ready To Teach
              </p>
              <p style={{ color: C.textSecondary, fontSize: "0.94rem", lineHeight: 1.7 }}>
                These packets are designed for teachers who want to bring the article into a live classroom without having to build the scaffolding from scratch. The middle-school lesson emphasizes concrete distinctions and evidence-based caution. The high-school lesson preserves the philosophical stakes while moving students toward seminar reasoning and a policy memo.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
                {AI_CONSCIOUSNESS_LESSON_PACKETS.map((packet) => (
                  <AnchorButton key={packet.id} href={`#${packet.id}`} color={packet.gradeBand === "6-8" ? C.teal : C.coral}>
                    {packet.gradeLabel}: {packet.title}
                  </AnchorButton>
                ))}
                <button
                  type="button"
                  className="no-print"
                  onClick={() => navigate("ai-consciousness")}
                  style={{
                    padding: "9px 13px",
                    border: `1px solid ${C.border}`,
                    borderRadius: 8,
                    background: "rgba(255,255,255,0.02)",
                    color: C.textMuted,
                    fontWeight: 700,
                    fontSize: "0.82rem",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  Back to the Article
                </button>
              </div>
            </section>
          </FadeIn>

          <FadeIn delay={0.06}>
            <div className="grid-3" style={{ marginBottom: 30 }}>
              <TeacherUseCard
                title="Use As A One-Day Lesson"
                body="Open one packet, teach the before-reading activity, read the adaptation in chunks, and use the exit argument or memo launch as the assessment."
                color={C.teal}
              />
              <TeacherUseCard
                title="Use As A Two-Part Seminar"
                body="Assign the leveled text before class, then spend class time on evidence sorting, structured discussion, and revision of student claims."
                color={C.gold}
              />
              <TeacherUseCard
                title="Print Or Save As PDF"
                body="Use the packet print button to open the browser print dialog. Hidden sections expand in print, and site navigation is removed."
                color={C.coral}
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <section style={{
              border: `1px solid ${C.border}`,
              borderRadius: 10,
              padding: "16px 18px",
              background: C.surface,
              marginBottom: 30,
            }}>
              <h2 style={{
                color: C.textPrimary,
                fontFamily: "'Source Serif 4', Georgia, serif",
                fontSize: "1.22rem",
                fontWeight: 700,
                marginBottom: 8,
              }}>Standards Source Set</h2>
              <p style={{ color: C.textSecondary, fontSize: "0.88rem", lineHeight: 1.65, marginBottom: 12 }}>
                Standards are portable national alignments drawn from Common Core ELA/Literacy, the C3 Framework, ISTE Standards for Students, and AI4K12. The C3 indicators use official inquiry and civics codes.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {AI_CONSCIOUSNESS_STANDARDS_SOURCE_LINKS.map((source) => (
                  <LinkOut key={source.href} href={source.href}>{source.label}</LinkOut>
                ))}
              </div>
            </section>
          </FadeIn>

          <Divider label="Lesson Packets" />

          {AI_CONSCIOUSNESS_LESSON_PACKETS.map((packet, index) => (
            <FadeIn key={packet.id} delay={0.06 + index * 0.04}>
              <LessonPacket packet={packet} accent={packet.gradeBand === "6-8" ? C.teal : C.coral} />
            </FadeIn>
          ))}

          <FadeIn delay={0.08}>
            <ContinueExploring navigate={navigate} links={[
              { id: "ai-consciousness", icon: "AI", title: "The Article", desc: "Read The Consciousness Line", color: C.ocean, image: articleVisual.image, imageAlt: articleVisual.imageAlt },
              { id: "ai-ethics", icon: "AI", title: "AI Ethics", desc: "Policy, philosophy, and education", color: C.gold },
              { id: "thought-experiments", icon: "TE", title: "Thought Experiments", desc: "Practice ethical reasoning", color: C.coral },
            ]} />
          </FadeIn>
        </Narrow>
      </PageContainer>
    </div>
  );
}
