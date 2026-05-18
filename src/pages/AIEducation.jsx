import { C } from "../theme.js";
import {
  FadeIn,
  TopicCard,
  EducatorHero,
  Narrow,
  PageContainer,
  BodyText,
  ReadingTime,
  ContinueExploring,
} from "../components/shared.jsx";
import {
  AI_EDUCATION_CONTINUE_LINKS,
  AI_EDUCATION_HUB,
  AI_EDUCATION_SNAPSHOT_STATS,
  AI_EDUCATION_TOPICS,
} from "../data/aiEducationResources.js";

function SnapshotStrip() {
  return (
    <FadeIn delay={0.08}>
      <section className="ai-hub-snapshot" aria-label="AI in Education snapshot">
        {AI_EDUCATION_SNAPSHOT_STATS.map((stat) => (
          <div key={stat.label} className="ai-hub-stat" style={{ borderColor: `${stat.color}28` }}>
            <strong style={{ color: stat.color }}>{stat.display}</strong>
            <span>{stat.label}</span>
            <em>{stat.subtitle}</em>
          </div>
        ))}
      </section>
    </FadeIn>
  );
}

export default function AIEducation({ navigate }) {
  return (
    <div style={{ padding: "0 0 80px", background: C.bgAlt }}>
      <style>{`
        .ai-hub-grid {
          margin-top: 32px;
        }
        .ai-hub-snapshot {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
          margin: 34px 0 42px;
          padding: clamp(18px, 3vw, 24px);
          background: linear-gradient(135deg, rgba(18,37,61,0.94), rgba(8,18,32,0.76));
          border: 1px solid ${C.border};
          border-radius: 14px;
          box-shadow: 0 18px 60px rgba(0,0,0,0.14);
        }
        .ai-hub-stat {
          min-height: 126px;
          padding: 18px 14px;
          background: rgba(18,37,61,0.72);
          border: 1px solid;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
        }
        .ai-hub-stat strong {
          display: block;
          font-family: 'Source Serif 4', Georgia, serif;
          font-size: clamp(1.75rem, 4vw, 2.35rem);
          line-height: 1;
          font-weight: 700;
        }
        .ai-hub-stat span {
          display: block;
          color: ${C.textSecondary};
          font-size: 0.82rem;
          line-height: 1.45;
          margin-top: 8px;
        }
        .ai-hub-stat em {
          display: block;
          color: ${C.textMuted};
          font-size: 0.72rem;
          line-height: 1.4;
          margin-top: 6px;
          font-style: normal;
        }
        @media (max-width: 860px) {
          .ai-hub-snapshot {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 620px) {
          .ai-hub-snapshot {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <EducatorHero
        label={AI_EDUCATION_HUB.sectionLabel}
        title={AI_EDUCATION_HUB.title}
        subtitle={AI_EDUCATION_HUB.desc}
        image={AI_EDUCATION_HUB.image}
        imageAlt={AI_EDUCATION_HUB.imageAlt}
        accent={AI_EDUCATION_HUB.accent}
        variant="background"
      />

      <PageContainer>
        <FadeIn delay={0.04}>
          <ReadingTime minutes={7} />
        </FadeIn>

        <div className="grid-3 ai-hub-grid">
          {AI_EDUCATION_TOPICS.map((topic, index) => (
            <TopicCard
              key={topic.id}
              image={topic.image}
              imageAlt={topic.imageAlt}
              title={topic.title}
              desc={topic.shortDesc}
              delay={0.06 + index * 0.04}
              accent={topic.accent}
              onClick={() => navigate(topic.id)}
            />
          ))}
        </div>

        <SnapshotStrip />

        <Narrow>
          <FadeIn delay={0.06}>
            <BodyText>
              The organizing question is simple: how can AI help educators plan, support, explain, adapt, and reflect while keeping human judgment, student privacy, and real learning at the center?
            </BodyText>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div style={{
              marginTop: 32,
              padding: "22px 24px",
              background: `linear-gradient(135deg, ${C.gold}0d, ${C.teal}08)`,
              border: `1px solid ${C.gold}28`,
              borderRadius: 14,
            }}>
              <p style={{ color: C.gold, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8 }}>
                Terms-aligned reminder
              </p>
              <p style={{ color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.7 }}>
                This section is educational and informational. It is not legal, psychological, medical, or special-education advice. Always follow your school or district policy, use approved tools, and consult qualified professionals for decisions involving student data, disability services, grading, placement, or compliance.
              </p>
            </div>
          </FadeIn>

          <ContinueExploring navigate={navigate} links={AI_EDUCATION_CONTINUE_LINKS} />
        </Narrow>
      </PageContainer>
    </div>
  );
}
