import { C } from "../theme.js";
import { FadeIn, Expandable, SectionLabel, SectionTitle, BodyText, PageContainer } from "../components/shared.jsx";

export default function About({ navigate }) {
  return (
    <div style={{ padding: "80px 0", background: C.bg }}>
      <PageContainer>
        <FadeIn><SectionLabel>About</SectionLabel><SectionTitle>Matthew A. Zinn</SectionTitle></FadeIn>
        <div className="grid-2" style={{ marginTop: 28, alignItems: "start" }}>
          <FadeIn delay={0.08}>
            <div style={{ background: `linear-gradient(135deg, rgba(26,138,122,0.06), rgba(200,152,48,0.04))`, border: `1px solid ${C.border}`, borderRadius: 16, padding: 28, textAlign: "center" }}>
              <div style={{ width: 85, height: 85, borderRadius: "50%", background: `linear-gradient(135deg, ${C.teal}, ${C.ocean})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.8rem", color: "#fff", fontWeight: 700, margin: "0 auto 14px" }}>MZ</div>
              <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "1.1rem" }}>Matthew A. Zinn</h3>
              <p style={{ color: C.teal, fontSize: "0.78rem", marginTop: 3 }}>Philosopher · Educator · Technologist</p>
              <hr style={{ border: "none", borderTop: `1px solid ${C.border}`, margin: "18px 0" }} />
              <p style={{ color: C.textMuted, fontSize: "0.78rem", lineHeight: 1.6 }}>MA Ethics & Applied Philosophy<br />University of North Carolina at Charlotte, 2013</p>
              <div style={{ marginTop: 14, display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                <a href="https://ethicalaiedu.wordpress.com" target="_blank" rel="noopener noreferrer" style={{ color: C.teal, fontSize: "0.76rem", border: `1px solid rgba(26,138,122,0.2)`, padding: "5px 12px", borderRadius: 6 }}>Blog</a>
                <a href="https://innovateedai.com" target="_blank" rel="noopener noreferrer" style={{ color: C.gold, fontSize: "0.76rem", border: `1px solid rgba(200,152,48,0.2)`, padding: "5px 12px", borderRadius: 6 }}>AI in Ed</a>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.12}>
            <BodyText><strong>I study how humans make moral judgments</strong> — and what that means for the way we build, teach, and govern artificial intelligence. My work sits at the intersection of moral psychology, normative ethics, philosophy of mind, and educational technology.</BodyText>
            <BodyText>My journey began with a thesis on <strong>Joshua Greene's dual-process theory of moral judgment</strong> and F.M. Kamm's objections to it — asking whether neuroscience can tell us anything about which moral theories are correct. That question about the relationship between descriptive facts and normative claims has only grown more urgent in the age of AI.</BodyText>
            <BodyText>As an educator, I've spent years in classrooms working with students from elementary through graduate school. I started my career working with students with special needs, which gave me a deep appreciation for individualized education — and for how much time teachers spend on tasks that could be automated so they can focus on what matters most: connecting with students.</BodyText>
            <BodyText>Today, I focus on helping educators navigate the ethical complexities of AI integration — moving beyond vague appeals to "uphold ethics" toward concrete, philosophically grounded frameworks for decision-making. I've developed specialized GPTs for professional development (RigorGPT, BackwardDesignGPT, OutcomesGPT, Science of Reading GPT), created interactive AI-in-education presentations used in school training, and written extensively about the philosophical foundations that should guide AI policy.</BodyText>
            <BodyText>This site brings together my academic research, practical writing, and educational resources into one place. Whether you're a philosopher, teacher, administrator, or simply curious about the moral dimensions of our technological moment — I'm glad you're here.</BodyText>
            <Expandable title="What Drives This Work" color={C.teal}>
              <p>When I was teaching English Language Arts to 5th and 6th graders, students would ask: "Why does it matter where the preposition goes?" My favorite lesson was telling them: "It's that way because we made it all up and we've never been and likely never will be perfect." The blank stares always gave way to relief — and then to genuine critical thinking about <em>why</em> these imperfect rules still matter.</p>
              <p style={{ marginTop: 12 }}>I approach AI ethics the same way. Our ethical frameworks are human constructions — imperfect, evolving, never complete. But that doesn't make them unimportant. It makes the work of refining them, testing them against new challenges, and applying them to real situations all the more urgent. The emergence of AI in education is one of those challenges that demands we think carefully about what we value and why.</p>
            </Expandable>
          </FadeIn>
        </div>
      </PageContainer>
    </div>
  );
}
