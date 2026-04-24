import { C } from "../theme.js";
import { FadeIn, Expandable, SectionLabel, SectionTitle, BodyText, PageContainer, Narrow, Divider, QuoteBlock, ReadingTime } from "../components/shared.jsx";

export default function About({ navigate }) {
  return (
    <div style={{ padding: "80px 0", background: C.bg }}>
      <PageContainer>
        <FadeIn><SectionLabel>About</SectionLabel><SectionTitle>Matthew A. Zinn</SectionTitle><ReadingTime minutes={8} /></FadeIn>
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
              <hr style={{ border: "none", borderTop: `1px solid ${C.border}`, margin: "18px 0" }} />
              <p style={{ color: C.textMuted, fontSize: "0.72rem", lineHeight: 1.6, textAlign: "left" }}>
                <strong style={{ color: C.textSecondary }}>Research Areas</strong><br />
                Moral Psychology · Dual-Process Theory · Normative Ethics · Is/Ought Distinction · AI Ethics in Education · Philosophy of Mind · AI Alignment · Educational Technology
              </p>
              <hr style={{ border: "none", borderTop: `1px solid ${C.border}`, margin: "18px 0" }} />
              <p style={{ color: C.textMuted, fontSize: "0.72rem", lineHeight: 1.6, textAlign: "left" }}>
                <strong style={{ color: C.textSecondary }}>Custom GPTs</strong><br />
                RigorGPT · BackwardDesignGPT · OutcomesGPT · Science of Reading GPT · ReviewSongGPT
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.12}>
            <BodyText><strong>I study how humans make moral judgments</strong> — and what that means for the way we build, teach, and govern artificial intelligence. My work sits at the intersection of moral psychology, normative ethics, philosophy of mind, and educational technology.</BodyText>
            <BodyText>My journey began with a thesis on <strong>Joshua Greene's dual-process theory of moral judgment</strong> and F.M. Kamm's objections to it — asking whether neuroscience can tell us anything about which moral theories are correct. That question about the relationship between descriptive facts and normative claims has only grown more urgent in the age of AI.</BodyText>
            <BodyText>As an educator, I've spent years in classrooms working with students from elementary through graduate school. I started my career working with students with special needs, which gave me a deep appreciation for individualized education — and for how much time teachers spend on tasks that could be automated so they can focus on what matters most: connecting with students.</BodyText>
            <BodyText>Today, I focus on helping educators navigate the ethical complexities of AI integration — moving beyond vague appeals to "uphold ethics" toward concrete, philosophically grounded frameworks for decision-making. I've developed specialized GPTs for professional development, created interactive AI-in-education presentations used in school training, and written extensively about the philosophical foundations that should guide AI policy.</BodyText>
            <BodyText>This site brings together my academic research, practical writing, and educational resources into one place. Whether you're a philosopher, teacher, administrator, or simply curious about the moral dimensions of our technological moment — I'm glad you're here.</BodyText>
          </FadeIn>
        </div>

        <Narrow>
          <Divider label="Background & Journey" />

          <FadeIn delay={0.06}>
            <Expandable title="What Drives This Work" color={C.teal} defaultOpen>
              <p>When I was teaching English Language Arts to 5th and 6th graders, students would ask: "Why does it matter where the preposition goes?" My favorite lesson was telling them: "It's that way because we made it all up and we've never been and likely never will be perfect." The blank stares always gave way to relief — and then to genuine critical thinking about <em>why</em> these imperfect rules still matter.</p>
              <p style={{ marginTop: 12 }}>I approach AI ethics the same way. Our ethical frameworks are human constructions — imperfect, evolving, never complete. But that doesn't make them unimportant. It makes the work of refining them, testing them against new challenges, and applying them to real situations all the more urgent. The emergence of AI in education is one of those challenges that demands we think carefully about what we value and why.</p>
              <p style={{ marginTop: 12 }}>What makes this work unusual is the combination of academic philosophy and classroom experience. Most AI ethics commentary comes from either pure technologists (who know the tools but not the theory) or pure philosophers (who know the theory but haven't worked with students). Having spent years doing both — wrestling with the is/ought problem in seminar rooms and then wrestling with student behavior in classrooms — I bring a perspective that takes both the philosophical precision and the messy reality seriously.</p>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Expandable title="The Thesis: Moral Psychology & Normative Ethics" color={C.ocean}>
              <p>My thesis at UNC Charlotte examined whether Joshua Greene's fMRI research on moral judgment could provide evidence for or against specific normative ethical theories. Greene's dual-process theory argues that deontological intuitions (like the wrongness of pushing someone off a bridge) are driven by automatic emotional responses, while utilitarian judgments (saving the most lives) come from controlled cognitive processing.</p>
              <p style={{ marginTop: 12 }}>I examined F.M. Kamm's objections — particularly her "trapdoor case" which challenges Greene's claim about what triggers emotional responses — and argued that while Kamm's critiques are important, they don't fatally undermine Greene's general argument. I also offered Kamm a <em>stronger</em> argument she could have made: if fMRI data showed the trapdoor case engaged cognitive rather than emotional brain regions, it would directly challenge Greene's foundation.</p>
              <p style={{ marginTop: 12 }}>The thesis concluded that moral psychology illuminates the is/ought gap without closing it — helping us see where our normative theories are rationalizations of unreliable intuitions and where they track something genuine. A decade later, this insight has proven remarkably prescient: Raphaël Millière's 2025 paper "Normative conflicts and shallow AI alignment" (<em>Philosophical Studies</em>) argues the same gap between emotional intuition and deliberative reasoning is precisely what's missing from AI alignment. The problem isn't that we don't know which moral theory is correct — it's that AI systems lack any capacity for genuine normative deliberation about conflicts.</p>
              <p style={{ marginTop: 12 }}><a href="#" onClick={(e) => { e.preventDefault(); navigate("moral-psych"); }} style={{ color: C.teal }}>Read the full thesis with 2023–2026 updates →</a></p>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Expandable title="From Special Education to AI Ethics" color={C.gold}>
              <p>I began my teaching career working with students with special needs — an experience that fundamentally shaped how I think about educational technology. Working with students who learn differently taught me three things that directly inform my approach to AI in education:</p>
              <p style={{ marginTop: 12 }}><strong>First: individualization matters enormously.</strong> A student with dyslexia needs different support than a student with ADHD. Blanket approaches fail. AI's promise of personalization resonates deeply with anyone who has written IEPs and watched the same lesson land completely differently depending on the student.</p>
              <p style={{ marginTop: 12 }}><strong>Second: the human relationship is the foundation.</strong> The most effective interventions I ever saw weren't techniques or tools — they were relationships. A teacher who knew a student well enough to recognize the difference between "can't" and "won't," who could sense frustration before it became meltdown, who celebrated incremental progress that no standardized test would capture. No AI replicates this. As Gert Biesta argues, the dimension of education that matters most — subjectification, becoming an autonomous person — requires encounter with another <em>thinking, caring being</em>.</p>
              <p style={{ marginTop: 12 }}><strong>Third: teachers spend enormous amounts of time on tasks that could be automated.</strong> Writing IEP goals, leveling text, generating accommodation suggestions, tracking progress data — these consume hours that teachers could spend actually connecting with students. AI can genuinely help here, and I've seen it happen. The key is ensuring AI handles the administrative work while teachers handle the human work, not the reverse.</p>
              <p style={{ marginTop: 12 }}>This is why my position on AI in education isn't binary. I'm not a techno-optimist or a Luddite. I'm a philosopher who has seen both the real promise and the real risks, and who believes the only responsible path forward is one grounded in explicit ethical reasoning about what we value and why.</p>
            </Expandable>
          </FadeIn>

          <Divider label="Writing & Publications" />

          <FadeIn delay={0.06}>
            <Expandable title="The Ethical Educator Blog" color={C.teal}>
              <p>My blog at <a href="https://ethicalaiedu.wordpress.com" target="_blank" rel="noopener noreferrer">ethicalaiedu.wordpress.com</a> applies normative ethical theory to real-world AI education scenarios. Key posts:</p>
              <p style={{ marginTop: 14 }}><strong><a href="https://ethicalaiedu.wordpress.com/2024/07/12/from-ambiguity-to-action-navigating-ethical-challenges-in-ai-enhanced-education/" target="_blank" rel="noopener noreferrer">"From Ambiguity to Action"</a> (July 2024)</strong> — The flagship piece. Argues that most school AI policies fail because they say "uphold ethics" without specifying which ethical framework, what values it implies, or how to resolve conflicts between competing values. Walks readers through building a policy grounded in normative theory, using thought experiments specific to their school context. The process: define values → test with thought experiments → accept imperfection → involve stakeholders → review continuously.</p>
              <p style={{ marginTop: 14 }}><strong><a href="https://ethicalaiedu.wordpress.com/2024/02/13/the-paradox-of-ai-in-education/" target="_blank" rel="noopener noreferrer">"The Paradox of AI in Education"</a> (February 2024)</strong> — Examines the is/ought distinction as it applies to AI capabilities. Even if AI CAN teach better by some metrics, it doesn't follow that it SHOULD replace human teachers. Explores what's lost when we optimize for measurable outcomes at the expense of the unmeasurable: community, character, shared struggle, moral formation.</p>
              <p style={{ marginTop: 14 }}><strong><a href="https://ethicalaiedu.wordpress.com/2024/02/14/the-ai-authorship-quandary/" target="_blank" rel="noopener noreferrer">"The AI Authorship Quandary"</a> (February 2024)</strong> — A thought experiment: a student submits AI-written work, the teacher demands revision, the parent defends the student. How does the administrator navigate competing values? This piece shows how thought experiments can be used as practical tools for policy development rather than abstract philosophical exercises.</p>
              <p style={{ marginTop: 14 }}><strong><a href="https://ethicalaiedu.wordpress.com/2024/02/14/response-to-why-ai-wont-replace-teachers/" target="_blank" rel="noopener noreferrer">"Response to Why AI Won't Replace Teachers"</a> (February 2024)</strong> — Argues the strongest case for keeping human teachers isn't that AI <em>can't</em> replace them (it increasingly can) but that it <em>shouldn't</em> — even when demonstrably capable. Engages with Sparrow & Flenady's warning that economic pressures may override normative arguments.</p>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Expandable title="InnovateEdAI Presentation" color={C.gold}>
              <p>My interactive AI-in-education presentation at <a href="https://innovateedai.com" target="_blank" rel="noopener noreferrer">innovateedai.com</a> is designed for school training and professional development. It covers:</p>
              <p style={{ marginTop: 12 }}>• <strong>What AI actually is</strong> — demystifying the technology for educators who may feel overwhelmed</p>
              <p>• <strong>How AI tools work in classrooms</strong> — from Khanmigo's personalized tutoring to MagicSchool's IEP generators</p>
              <p>• <strong>Ethical frameworks for decision-making</strong> — translating normative ethics into practical guidance</p>
              <p>• <strong>Hands-on demonstrations</strong> — live walkthroughs of tools educators can use immediately</p>
              <p>• <strong>Policy development workshops</strong> — using thought experiments to surface the values that should guide your school's AI policy</p>
              <p style={{ marginTop: 12 }}>The presentation has been used in school-level and district-level professional development sessions. The approach is always the same: start with values, test with scenarios, build toward policy that reflects genuine philosophical commitment rather than empty aspiration.</p>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Expandable title="Custom GPTs for Professional Development" color={C.ocean}>
              <p>I've developed five specialized GPTs designed to support specific areas of professional development. Each is built to be a knowledgeable co-pilot, not a replacement for professional judgment:</p>
              <p style={{ marginTop: 12 }}><strong>RigorGPT</strong> — Helps teachers understand and implement academic rigor. Evaluates lesson plans and transcripts, provides personalized feedback, and shares essential resources including cognitive rigor matrices and probing questions matrices.</p>
              <p style={{ marginTop: 12 }}><strong>BackwardDesignGPT</strong> — Guides backward planning based on Understanding by Design (Wiggins & McTighe). Helps define desired results, determine acceptable evidence, and plan learning experiences aligned with outcomes.</p>
              <p style={{ marginTop: 12 }}><strong>OutcomesGPT</strong> — Supports understanding and implementing overarching student outcomes. Evaluates alignment of instruction, assessments, and objectives against articulated goals.</p>
              <p style={{ marginTop: 12 }}><strong>Science of Reading GPT</strong> — Covers the five pillars of reading instruction: phonemic awareness, phonics, fluency, vocabulary, and comprehension. Evaluates lesson plans against Science of Reading principles and provides evidence-based feedback.</p>
              <p style={{ marginTop: 12 }}><strong>ReviewSongGPT</strong> — Transforms lesson content into songs. Teachers select their content type (transcript, lesson plan, or standard), choose a genre, and the GPT generates lyrics that can be turned into actual songs using music generation tools.</p>
              <p style={{ marginTop: 12, color: C.textMuted, fontSize: "0.85rem" }}><em>These are tools I built to demonstrate what responsible, educator-guided AI can look like. Always verify AI-generated content and follow your school's AI use policies.</em></p>
            </Expandable>
          </FadeIn>

          <Divider label="Philosophy in Practice" />

          <FadeIn delay={0.06}>
            <Expandable title="Why Philosophy Matters for AI Policy" color={C.gold}>
              <p>The most common response I get from educators when I mention "normative ethics" is a polite glaze-over. That's understandable — academic philosophy can feel remote from the daily reality of teaching. But here's why it matters urgently:</p>
              <p style={{ marginTop: 12 }}>Every AI policy makes philosophical commitments, whether or not the authors realize it. When a school says "students should use AI responsibly," it's implicitly adopting a virtue ethics framework (focusing on character). When it says "AI use is permitted if it doesn't harm learning outcomes," it's adopting consequentialism (focusing on outcomes). When it says "students must always disclose AI use," it's adopting a deontological rule (focusing on duties). These frameworks can conflict — and when they do, vague language provides no guidance.</p>
              <p style={{ marginTop: 12 }}>The value of philosophical training isn't abstract theorizing — it's the ability to <em>recognize</em> these hidden commitments, make them explicit, and reason carefully about which ones your community actually endorses. That's what I try to help educators do.</p>
              <QuoteBlock
                quote="We made it all up and we never have been and likely never will be perfect."
                attribution="Matthew A. Zinn"
                source="to his 5th grade class"
                color={C.gold}
              />
              <p>The students who heard that lesson learned something more important than grammar: they learned that human systems are constructed, imperfect, and revisable — and that understanding this doesn't make the work of improving them less important. It makes it more so.</p>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Expandable title="The Central Argument of This Site" color={C.teal}>
              <p>Across every page of this site — from moral psychology to thought experiments to practical AI tools — a single argument recurs:</p>
              <p style={{ marginTop: 12, padding: "14px 18px", background: `linear-gradient(135deg, rgba(200,152,48,0.08), rgba(26,138,122,0.06))`, borderRadius: 12, border: `1px solid rgba(200,152,48,0.12)`, fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "0.98rem", lineHeight: 1.7 }}>
                <strong>The process of learning is constitutive of its value, not merely instrumental to it.</strong> What matters is not only what students know at the end, but what they become through the process of knowing it.
              </p>
              <p style={{ marginTop: 14 }}>This isn't a Luddite position. It's a philosophical one, grounded in Aristotle's theory of habituation, Dewey's experiential education, Biesta's subjectification, Kapur's productive failure, and the converging evidence from moral psychology that genuine understanding requires engagement with difficulty, not just exposure to information.</p>
              <p style={{ marginTop: 12 }}>AI can be a powerful ally in education — when it supports the process of learning rather than replacing it. The question, always, is whether we're using AI to help students struggle productively or to help them avoid struggling entirely. As Robert Pondiscio put it: "Education is not a product to be delivered; it's a transformation that occurs through effort."</p>
              <p style={{ marginTop: 12 }}>That's the conversation this site is designed to advance.</p>
            </Expandable>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Divider label="Get in Touch" />
            <div style={{ padding: "24px 28px", background: `linear-gradient(135deg, rgba(26,138,122,0.07), rgba(200,152,48,0.04))`, border: `1px solid ${C.border}`, borderRadius: 14, marginBottom: 14 }}>
              <p style={{ color: C.textSecondary, lineHeight: 1.75, fontSize: "0.94rem" }}>
                Whether you're an educator developing AI policy, a researcher exploring moral psychology, or a philosopher interested in these intersections — I'd welcome the conversation.
              </p>
              <p style={{ marginTop: 14 }}>
                <a href="mailto:matthew@theethicaleducator.com" style={{ color: C.gold, fontWeight: 600, fontSize: "0.96rem" }}>matthew@theethicaleducator.com</a>
              </p>
            </div>
          </FadeIn>

        </Narrow>
      </PageContainer>
    </div>
  );
}
