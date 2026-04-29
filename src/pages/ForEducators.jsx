import { C } from "../theme.js";
import {
  FadeIn, TopicCard, SectionLabel, SectionTitle, Subtitle,
  Narrow, PageContainer, Divider
} from "../components/shared.jsx";

export default function ForEducators({ navigate }) {
  return (
    <div style={{ padding: "80px 0", background: C.bg }}>
      <PageContainer>
        <FadeIn>
          <SectionLabel>Professional Development</SectionLabel>
          <SectionTitle>For Educators</SectionTitle>
          <Subtitle>Practitioner-facing resources drawn from professional development workshops, evaluation frameworks, and instructional research. Built for teachers who want concrete strategies, not just theory — though the theory is here when you need it.</Subtitle>
        </FadeIn>

        <Divider label="Teaching & Feedback" />

        <div className="grid-3" style={{ marginTop: 16 }}>
          <TopicCard
            icon="💬"
            title="Effective Academic Feedback"
            desc="Personalized growth feedback, the 5 R's of action feedback, 1:1 conferencing strategies, and a research-based evaluation standard. How to write comments that students actually use."
            delay={0.06}
            accent={C.teal}
            onClick={() => navigate("teaching-feedback")}
          />
          <TopicCard
            icon="📊"
            title="Enhancing Academic Feedback"
            desc="Advanced strategies for effective, actionable, and personalized feedback. A deeper dive into assessment alignment and feedback quality frameworks."
            delay={0.1}
            accent={C.gold}
            onClick={() => navigate("enhancing-feedback")}
          />
        </div>

        <Divider label="Student Engagement" />

        <div className="grid-3" style={{ marginTop: 16 }}>
          <TopicCard
            icon="🧠"
            title="Enhancing Student Engagement"
            desc="Theoretical frameworks and practical models for understanding what engagement looks like, why it matters, and how to design learning experiences that sustain it."
            delay={0.06}
            accent={C.teal}
            onClick={() => navigate("enhancing-engagement")}
          />
          <TopicCard
            icon="🖥️"
            title="Asynchronous Learning Engagement"
            desc="Strategies specific to online and asynchronous contexts — where engagement requires different tools and approaches than in-person instruction."
            delay={0.1}
            accent={C.ocean}
            onClick={() => navigate("async-engagement")}
          />
          <TopicCard
            icon="🎬"
            title="AV Resources for Online Teaching"
            desc="Audio and video tools that make online instruction more engaging, accessible, and human. Practical tech recommendations for virtual classrooms."
            delay={0.14}
            accent={C.gold}
            onClick={() => navigate("av-resources")}
          />
        </div>

        <Divider label="School Leadership & Performance" />

        <div className="grid-3" style={{ marginTop: 16 }}>
          <TopicCard
            icon="🏫"
            title="Quality Leadership & Instruction"
            desc="Instructional leadership PD — what distinguishes high-performing school leaders and how leadership practices translate to classroom outcomes."
            delay={0.06}
            accent={C.gold}
            onClick={() => navigate("quality-leadership")}
          />
          <TopicCard
            icon="📈"
            title="High-Performing K-12 Schools"
            desc="Data-driven decisions, extended learning time, and the organizational practices that separate consistently excellent schools from the rest."
            delay={0.1}
            accent={C.teal}
            onClick={() => navigate("high-performing-schools")}
          />
          <TopicCard
            icon="🔄"
            title="Response to Intervention (RTI)"
            desc="The tiered intervention framework — identifying struggling students early, providing targeted support, and monitoring progress systematically."
            delay={0.14}
            accent={C.coral}
            onClick={() => navigate("rti")}
          />
        </div>

        <Narrow>
          <FadeIn delay={0.1}>
            <div style={{ marginTop: 48, padding: "24px 28px", background: C.glow, border: `1px solid ${C.border}`, borderRadius: 14, textAlign: "center" }}>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "1.05rem", fontWeight: 600, marginBottom: 8 }}>Built from the field</p>
              <p style={{ color: C.textMuted, fontSize: "0.88rem", lineHeight: 1.65 }}>
                Each page above draws on a professional development workshop or session originally delivered to K–12 educators and adapted here for self-paced reading. Use them in your own PD work, in coaching conversations, or as starting points for your own practice.
              </p>
            </div>
          </FadeIn>
        </Narrow>
      </PageContainer>
    </div>
  );
}
