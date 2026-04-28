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
            desc="Personalized growth feedback, the 5 R's of action feedback, 1:1 conferencing strategies, and the Keystone evaluation standard. How to write comments that students actually use."
            delay={0.06}
            accent={C.teal}
            onClick={() => navigate("teaching-feedback")}
          />
          {/* Future: #30 "Enhancing Academic Feedback" — advanced complement */}
          <TopicCard
            icon="📊"
            title="Enhancing Academic Feedback"
            desc="Advanced strategies for effective, actionable, and personalized feedback. A deeper dive into assessment alignment and feedback quality frameworks."
            delay={0.1}
            accent={C.gold}
          />
          {/* Placeholder for future content */}
          <TopicCard
            icon="🎯"
            title="More Coming Soon"
            desc="Additional PD resources on student engagement, the Danielson Framework, school leadership, and instructional techniques are being prepared."
            delay={0.14}
            accent={C.ocean}
          />
        </div>

        <Divider label="The Danielson Framework" />

        <div className="grid-3" style={{ marginTop: 16 }}>
          {/* Future: #39, #34, #37, #38, #29 */}
          <TopicCard
            icon="🏗️"
            title="The Danielson Framework Overview"
            desc="History, structure, and purpose of the Framework for Teaching. The starting point for understanding how domains, components, and performance levels work together."
            delay={0.06}
            accent={C.teal}
          />
          <TopicCard
            icon="📐"
            title="Excelling in Domain 3"
            desc="Deep dive into instructional techniques — questioning, discussion, engagement, and assessment strategies that move from proficient to distinguished."
            delay={0.1}
            accent={C.gold}
          />
          <TopicCard
            icon="🌱"
            title="Mastering Domain 2"
            desc="Building a positive classroom environment — establishing a culture for learning, managing student behavior, and creating a climate of respect and rapport."
            delay={0.14}
            accent={C.coral}
          />
        </div>

        <Divider label="Student Engagement" />

        <div className="grid-3" style={{ marginTop: 16 }}>
          {/* Future: #27, #28, #22, #36, #33 */}
          <TopicCard
            icon="🧠"
            title="Enhancing Student Engagement"
            desc="Theoretical frameworks and practical models for understanding what engagement looks like, why it matters, and how to design learning experiences that sustain it."
            delay={0.06}
            accent={C.teal}
          />
          <TopicCard
            icon="🖥️"
            title="Asynchronous Learning Engagement"
            desc="Strategies specific to online and asynchronous contexts — where engagement requires different tools and approaches than in-person instruction."
            delay={0.1}
            accent={C.ocean}
          />
          <TopicCard
            icon="🎬"
            title="AV Resources for Online Teaching"
            desc="Audio and video tools that make online instruction more engaging, accessible, and human. Practical tech recommendations for virtual classrooms."
            delay={0.14}
            accent={C.gold}
          />
        </div>

        <Divider label="School Leadership & Performance" />

        <div className="grid-3" style={{ marginTop: 16 }}>
          {/* Future: #19, #40, #23, #25, #41, #18 */}
          <TopicCard
            icon="🏫"
            title="Quality Leadership & Instruction"
            desc="Instructional leadership PD — what distinguishes high-performing school leaders and how leadership practices translate to classroom outcomes."
            delay={0.06}
            accent={C.gold}
          />
          <TopicCard
            icon="📈"
            title="High-Performing K-12 Schools"
            desc="Data-driven decisions, extended learning time, and the organizational practices that separate consistently excellent schools from the rest."
            delay={0.1}
            accent={C.teal}
          />
          <TopicCard
            icon="🔄"
            title="Response to Intervention (RTI)"
            desc="The tiered intervention framework — identifying struggling students early, providing targeted support, and monitoring progress systematically."
            delay={0.14}
            accent={C.coral}
          />
        </div>

        <Narrow>
          <FadeIn delay={0.1}>
            <div style={{ marginTop: 48, padding: "24px 28px", background: C.glow, border: `1px solid ${C.border}`, borderRadius: 14, textAlign: "center" }}>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "1.05rem", fontWeight: 600, marginBottom: 8 }}>This section is growing</p>
              <p style={{ color: C.textMuted, fontSize: "0.88rem", lineHeight: 1.65 }}>
                The Teaching & Feedback page is live now. Additional pages covering the Danielson Framework, student engagement strategies, and school leadership are in development. Cards without links will become navigable as content is added.
              </p>
            </div>
          </FadeIn>
        </Narrow>
      </PageContainer>
    </div>
  );
}
