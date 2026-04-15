import { C } from "../theme.js";
import { FadeIn, Expandable, TopicCard, VideoEmbed, SectionLabel, SectionTitle, Subtitle, Narrow, PageContainer, BodyText } from "../components/shared.jsx";

export default function AIEducation({ navigate }) {
  return (
    <div style={{ padding: "80px 0", background: C.bgAlt }}>
      <PageContainer>
        <FadeIn><SectionLabel>Practical Applications</SectionLabel><SectionTitle>AI in the Classroom</SectionTitle><Subtitle>From personalized learning and IEP support to custom GPTs and lesson review tools — how AI is transforming education right now, and how to use it responsibly. Grounded in evidence, connected to the ethical frameworks that should guide implementation.</Subtitle></FadeIn>

        <div className="grid-3" style={{ marginTop: 32 }}>
          <TopicCard icon="🎯" title="Personalized Learning" desc="AI tutors like Khanmigo remember interests and adapt in real time. A soccer fan learns polynomials through game statistics. Every student gets a path tailored to how they learn best." delay={0.06} />
          <TopicCard icon="♿" title="IEP & Special Education" desc="AI tools generate IEP drafts, suggest accommodations, and level text — saving teachers hours. But the teacher makes the final call. AI is the assistant, never the decision-maker." delay={0.1} />
          <TopicCard icon="🎵" title="Creative AI Tools" desc="ReviewSongGPT turns lessons into songs. Students' narratives become children's books. AI remixes work across genres, opening doors to creativity students didn't know existed." delay={0.14} />
          <TopicCard icon="📊" title="AI-Powered Grading" desc="Tools like AutoMark provide fast, consistent feedback. NYC's 2026 policy prohibits AI-driven grading decisions — but using AI as a co-pilot for feedback is encouraged." delay={0.18} />
          <TopicCard icon="🧠" title="Custom GPTs for PD" desc="RigorGPT, BackwardDesignGPT, OutcomesGPT, Science of Reading GPT — specialized AI assistants built by Matthew for professional development in key teaching domains." delay={0.22} />
          <TopicCard icon="🔮" title="The Future" desc="Predictive analytics with complete learner profiles, AI tutoring 24/7, virtual learning communities, and administrative automation. The OECD will assess AI literacy in 2029 PISA." delay={0.26} />
        </div>

        <Narrow>
          <div style={{ marginTop: 40 }}>
            <FadeIn delay={0.06}>
              <Expandable title="What the Evidence Actually Says (2024–2026)" color={C.teal} defaultOpen>
                <p>The evidence on AI in education is simultaneously encouraging and cautionary:</p>
                <p style={{ marginTop: 12 }}><strong>Positive:</strong> A 2025 meta-analysis in <em>Educational Research Review</em> (68 studies, 337 effect sizes) found a <strong>moderate positive overall effect</strong> (SMD = 0.45) for GenAI-supported interventions. Amira Learning's AI reading tutor has been shown to double reading growth rates for children ages 5–10. Khan Academy's Khanmigo, despite initial adoption challenges, has grown to 700,000 users.</p>
                <p style={{ marginTop: 12 }}><strong>Cautionary:</strong> A Microsoft Research report (Walker & Vorvoreanu, October 2025) warned that "productivity gains from GenAI ≠ learning gains." High school math students scored <strong>17% lower</strong> after using GenAI (Bastani et al., 2024). Students became overconfident about mastery, and GenAI impaired memory formation when used without scaffolding. A systematic review by Hon (2026, <em>Journal of Educational Technology Systems</em>) confirmed mixed evidence: increased engagement in some contexts but over-reliance in others.</p>
                <p style={{ marginTop: 12 }}><strong>Key insight:</strong> AI tools are effective when they support knowledge construction and provide scaffolding. They are harmful when they replace the cognitive work that produces genuine learning. This distinction maps directly onto the philosophical question raised by the Learning Pill thought experiment: <a href="#" onClick={(e) => { e.preventDefault(); navigate("thought-experiments"); }} style={{ color: C.teal }}>is the process of learning constitutive of its value?</a></p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.08}>
              <Expandable title="Personalized Learning: How Khanmigo Actually Works">
                <p>In <em>Brave New Words</em> (2024), Sal Khan explains how Khanmigo personalizes by remembering student interests across sessions. When a student says "I'd rather be talking about soccer," the AI responds:</p>
                <p style={{ marginTop: 12, padding: "12px 16px", background: "rgba(26,138,122,0.06)", borderRadius: 8, borderLeft: `3px solid ${C.teal}` }}>
                  "Let's say you are a soccer coach, and you want to model the number of goals your team scores based on the number of hours they practice each week. You come up with the following polynomial: 3X² – 5X + 2. Can you identify the degree of this polynomial and the leading coefficient?"
                </p>
                <p style={{ marginTop: 12 }}>Days later, when working on a history project, Khanmigo remembers the interest and explains federalism through soccer league governance. The system registers whether you prefer formal or colloquial language, short or long answers, and what motivates you most.</p>
                <p style={{ marginTop: 12 }}>However, Khan candidly acknowledged in a 2026 Chalkbeat interview: "For a lot of students, it was a non-event. They just didn't use it much." About 80–85% of students didn't know how to initiate questions with a standalone chatbot. Khan Academy overhauled its product to integrate Khanmigo directly into practice exercises — recognizing that the process of formulating questions is itself a learned skill that can't be bypassed.</p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.1}>
              <Expandable title="AI & Special Education: Power and Responsibility">
                <p>As an educator who began his career working with students with special needs, Matthew has a deep appreciation for how AI can transform IEP development. Tools like MagicSchool AI's IEP generator allow educators to input a student's grade level, disability category, and needs description, and receive a customized draft in seconds — work that used to take hours of late nights.</p>
                <p style={{ marginTop: 12 }}><strong>Critical caveat:</strong> Anything produced by an AI — especially legally binding documents like an IEP — must be thoroughly reviewed by teachers. Their expertise and deep understanding of their students are essential. AI might suggest priority seating — great, if you don't teach online. This is where AI becomes a supportive team member: you provide precise feedback, and it collaborates to modify suggestions until you're satisfied. The teacher makes the final call.</p>
                <p style={{ marginTop: 12 }}>NYC's 2026 AI policy places IEP decisions firmly in the "Red" zone: AI cannot make placement or accommodation decisions. This is the right call. But using AI to draft initial documents, suggest accommodations, and level text for accessibility? That's the kind of support that frees teachers to do what they do best.</p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.12}>
              <Expandable title="Custom GPTs for Professional Development">
                <p>Matthew has developed several specialized GPTs designed to support specific areas of professional development:</p>
                <p style={{ marginTop: 12 }}><strong>RigorGPT:</strong> Helps teachers understand and implement academic rigor. Evaluates lesson plans and transcripts, provides personalized feedback, and shares essential resources including cognitive rigor matrices and probing questions matrices. <a href="https://chatgpt.com/g/g-RigorGPT" target="_blank" rel="noopener noreferrer">Try it →</a></p>
                <p style={{ marginTop: 12 }}><strong>BackwardDesignGPT:</strong> Guides backward planning based on Understanding by Design principles. Helps define desired results, determine acceptable evidence, and plan learning experiences aligned with outcomes. <a href="https://chatgpt.com/g/g-BackwardDesignGPT" target="_blank" rel="noopener noreferrer">Try it →</a></p>
                <p style={{ marginTop: 12 }}><strong>OutcomesGPT:</strong> Supports understanding and implementing overarching student outcomes. Evaluates alignment of instruction, assessments, and objectives. <a href="https://chatgpt.com/g/g-OutcomesGPT" target="_blank" rel="noopener noreferrer">Try it →</a></p>
                <p style={{ marginTop: 12 }}><strong>Science of Reading GPT:</strong> Covers phonemic awareness, phonics, fluency, vocabulary, and comprehension. Evaluates lesson plans against SoR principles and provides evidence-based feedback. <a href="https://chatgpt.com/g/g-SoRGPT" target="_blank" rel="noopener noreferrer">Try it →</a></p>
                <p style={{ marginTop: 12 }}><strong>ReviewSongGPT:</strong> Transforms lesson content into songs. Teachers select their content type (transcript, lesson plan, or standard), choose a genre, and the GPT generates lyrics that can be turned into actual songs using Udio.</p>
                <p style={{ marginTop: 12 }}><em>Note: These GPTs were developed by Matthew Zinn. While powerful, always verify AI-generated content and follow your school's AI use policies.</em></p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.14}>
              <Expandable title="Essential Tools for Educators">
                <p><strong>ChatGPT / Copilot / Gemini</strong> — General-purpose AI assistants for lesson planning, content creation, and professional development. Users must be at least 13 with parental permission for ages 13–18.</p>
                <p style={{ marginTop: 8 }}><strong>Khan Academy's Khanmigo</strong> — AI tutor that personalizes learning, adapts to interests, and reports the collaborative process to teachers. When a student collaborates on a paper, Khanmigo can report: "Sal initially had trouble with a thesis. The outlining went smoothly. I'd recommend a B+ based on the rubric."</p>
                <p style={{ marginTop: 8 }}><strong>MagicSchool AI</strong> — 60+ tools for educators including IEP generators, choice board creators, rubric builders, and differentiation assistants.</p>
                <p style={{ marginTop: 8 }}><strong>Amira Learning</strong> — AI reading tutor that listens to children read aloud and provides real-time personalized assistance. Shown to double reading growth rates for ages 5–10.</p>
                <p style={{ marginTop: 8 }}><strong>Duolingo</strong> — Gamified AI-powered language learning with adaptive difficulty.</p>
                <p style={{ marginTop: 8 }}><strong>Learning Ally</strong> — Audiobook solution for struggling readers, focusing on dyslexia and brain-based literacy. Human-narrated stories build comprehension.</p>
                <p style={{ marginTop: 8 }}><strong>PeerTeach</strong> — AI-powered peer tutoring matching based on learning styles and academic needs.</p>
                <p style={{ marginTop: 8 }}><strong>AutoMark</strong> — AI-powered grading co-pilot for essays, quizzes, and exams.</p>
                <p style={{ marginTop: 12, color: C.textMuted, fontSize: "0.85rem" }}><em>Always follow your school, district, or corporate policy regarding AI use. Ensure compliance with FERPA and COPPA when using any AI tools with students.</em></p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.16}>
              <Expandable title="Key Voices Shaping the Discourse" color={C.gold}>
                <p><strong>Ethan Mollick</strong> (Wharton, UPenn) — Arguably the most influential voice on AI in education. His <em>New York Times</em> bestseller <em>Co-Intelligence</em> (2024) advocates treating AI as co-worker, co-teacher, and coach. Named to TIME's Most Influential People in AI list. His Substack "One Useful Thing" reaches 345K+ followers.</p>
                <p style={{ marginTop: 12 }}><strong>Rose Luckin</strong> (UCL) — Founder of Educate Ventures Research. Her February 2026 newsletter warned of a "Jevons Paradox for cognitive effort" — AI adoption risks eroding sustained attention and deep thinking. She identified that 88% use AI but only 6% get meaningful returns.</p>
                <p style={{ marginTop: 12 }}><strong>Priya Lakhani</strong> (CENTURY Tech) — TEDNext 2025: "As AI enters classrooms, we risk confusing quick and easy answers with true learning. Being challenged is essential for making knowledge stick."</p>
                <p style={{ marginTop: 12 }}><strong>Shannon Vallor</strong> (Edinburgh) — <em>The AI Mirror</em> (Oxford UP, 2024) argues AI is a "recursive epistemic mechanism" distorting self-understanding. AI lacks Aristotelian <em>phrónēsis</em> (practical wisdom) for adapting ethical principles to complex circumstances.</p>
                <p style={{ marginTop: 12 }}><strong>Neil Selwyn</strong> (Monash) — <em>Should Robots Replace Teachers?</em> (2019) established the template for distinguishing descriptive from normative claims about AI in education.</p>
              </Expandable>
            </FadeIn>
          </div>

          <FadeIn delay={0.18}>
            <div style={{ marginTop: 28 }}>
              <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "1.1rem", marginBottom: 14, textAlign: "center" }}>Featured Videos</h3>
              <div className="grid-2">
                <div><VideoEmbed id="hJP5GqnTrNo" title="Sal Khan on AI in Education" /><p style={{ fontSize: "0.8rem", color: C.textMuted, marginTop: 6 }}>Sal Khan — How AI Could Save Education (TED)</p></div>
                <div><VideoEmbed id="e5dQ5zEuE9Q" title="Tristan Harris - AI Dilemma" /><p style={{ fontSize: "0.8rem", color: C.textMuted, marginTop: 6 }}>Tristan Harris & Aza Raskin — The AI Dilemma</p></div>
              </div>
            </div>
          </FadeIn>
        </Narrow>
      </PageContainer>
    </div>
  );
}
