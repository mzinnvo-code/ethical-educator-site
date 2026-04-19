import { C } from "../theme.js";
import {
  FadeIn, Expandable, TopicCard, VideoEmbed, SectionLabel, SectionTitle, Subtitle,
  Narrow, PageContainer, BodyText, ResearchCallout, QuoteBlock, StatCounter,
  FigureCard, Divider, ComparisonCard
} from "../components/shared.jsx";

export default function AIEducation({ navigate }) {
  return (
    <div style={{ padding: "80px 0", background: C.bgAlt }}>
      <PageContainer>
        <FadeIn>
          <SectionLabel>Practical Applications · Evidence · Voices</SectionLabel>
          <SectionTitle>AI in the Classroom</SectionTitle>
          <Subtitle>From personalized learning and IEP support to custom GPTs and lesson review tools — how AI is actually being used right now, what the evidence says works, and the voices shaping the discourse. Grounded in philosophy, connected to real classrooms.</Subtitle>
        </FadeIn>

        <div className="grid-3" style={{ marginTop: 32 }}>
          <TopicCard icon="🎯" title="Personalized Learning" desc="AI tutors like Khanmigo remember interests and adapt in real time. A soccer fan learns polynomials through game statistics. Every student gets a path tailored to how they learn best." delay={0.06} accent={C.teal} />
          <TopicCard icon="♿" title="IEP & Special Education" desc="AI tools generate IEP drafts, suggest accommodations, and level text — saving teachers hours. But the teacher makes the final call. AI is the assistant, never the decision-maker." delay={0.1} accent={C.gold} />
          <TopicCard icon="🎵" title="Creative AI Tools" desc="ReviewSongGPT turns lessons into songs. Students' narratives become children's books. AI remixes work across genres, opening doors to creativity students didn't know existed." delay={0.14} accent={C.coral} />
          <TopicCard icon="📊" title="AI-Powered Grading" desc="Tools like AutoMark provide fast, consistent feedback. NYC's 2026 policy prohibits AI-driven grading decisions — but using AI as a co-pilot for feedback is encouraged." delay={0.18} accent={C.ocean} />
          <TopicCard icon="🧠" title="Custom GPTs for PD" desc="RigorGPT, BackwardDesignGPT, OutcomesGPT, Science of Reading GPT — specialized AI assistants built by Matthew for professional development in key teaching domains." delay={0.22} accent={C.gold} />
          <TopicCard icon="🔮" title="The Future" desc="Predictive analytics with complete learner profiles, AI tutoring 24/7, virtual learning communities, and administrative automation. The OECD will assess AI literacy in 2029 PISA." delay={0.26} accent={C.teal} />
        </div>

        <Narrow>
          <Divider label="The Evidence" />

          <FadeIn delay={0.06}>
            <Expandable title="What the Evidence Actually Says (2024–2026)" color={C.teal} tag="Evidence" defaultOpen>
              <p>The evidence on AI in education is simultaneously encouraging and cautionary:</p>
              <p style={{ marginTop: 12 }}><strong>Positive signals:</strong></p>
              <ResearchCallout year="2025" title="Moderate Positive Effect Overall" finding="A meta-analysis in Educational Research Review (68 studies, 337 effect sizes) found a moderate positive overall effect (SMD = 0.45) for GenAI-supported interventions." color={C.teal} />
              <ResearchCallout year="2024" title="AI Reading Tutor Doubles Growth" finding="Amira Learning's AI reading tutor has been shown to double reading growth rates for children ages 5–10." color={C.teal} />
              <ResearchCallout year="2025" title="Khanmigo Reaches 700K Users" finding="Khan Academy's Khanmigo grew from 40,000 pilot users to 700,000 in 2024–25. A major Ohio partnership (August 2025) unlocked all Khan Academy tools for free across the state." color={C.teal} />

              <p style={{ marginTop: 14 }}><strong>Cautionary findings:</strong></p>
              <ResearchCallout year="Oct 2025" title="Productivity Gains ≠ Learning Gains" finding="A Microsoft Research report (Walker & Vorvoreanu) warned of this gap explicitly. Students became overconfident about mastery, and GenAI impaired memory formation when used without scaffolding." color={C.coral} />
              <ResearchCallout year="2024" title="High School Math Scores Dropped 17%" finding="Bastani et al. found high school math students scored 17% lower after using GenAI without proper scaffolding. AI without pedagogical integration can actively harm learning." color={C.coral} />
              <ResearchCallout year="2026" title="Mixed Evidence Confirmed" finding="A systematic review by Hon (Journal of Educational Technology Systems, SAGE) confirmed mixed evidence: increased engagement in some contexts but over-reliance and variable effectiveness in others." color={C.gold} />
              <p style={{ marginTop: 12 }}><strong>Key insight:</strong> AI tools are effective when they support knowledge construction and provide scaffolding. They are harmful when they replace the cognitive work that produces genuine learning. This distinction maps directly onto the philosophical question raised by The Shortcut thought experiment: <a href="#" onClick={(e) => { e.preventDefault(); navigate("thought-experiments"); }} style={{ color: C.teal }}>is the process of learning constitutive of its value?</a></p>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Expandable title="The Neuroscience of AI and the Joy of Learning" color={C.coral} tag="Neuroscience">
              <p>Hasan (2025) in <em>Annals of Medicine and Surgery</em> (87(8), 4693–4694, "How AI Quietly Undermines the Joy and Effort of Learning") provides the neuroscientific grounding for why AI shortcuts are worrying:</p>
              <QuoteBlock
                quote="AI tools that offer immediate solutions bypass the brain's effort-reward cycle — the dopamine-mediated process where overcoming intellectual challenges reinforces motivation and engagement."
                attribution="Hasan, N."
                source="Annals of Medicine and Surgery 87(8), 4693–4694 (2025)"
                color={C.coral}
              />
              <p>Robert Pondiscio (American Enterprise Institute, 2025) frames this memorably:</p>
              <QuoteBlock
                quote="Education is not a product to be delivered; it's a transformation that occurs through effort. The problem with AI is that it can perform education's outputs — essays, analyses, answers — without any of its inputs."
                attribution="Robert Pondiscio"
                source="American Enterprise Institute (2025)"
                color={C.gold}
              />
              <p style={{ marginTop: 12 }}>The research on <strong>desirable difficulties</strong> (Bjork & Bjork, 2011, <em>Psychology and the Real World</em>) and <strong>productive failure</strong> (Kapur, 2024, <em>Productive Failure: Unlocking Deeper Learning Through the Science of Failing</em>, Wiley) demonstrates why friction matters. Learning conditions that reduce performance during practice enhance long-term retention and transfer.</p>
              <p style={{ marginTop: 12 }}>Kapur's "<strong>4 As</strong>" framework maps how carefully designed failure produces deeper conceptual understanding:</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 8, margin: "12px 0" }}>
                <div style={{ padding: "10px 14px", background: C.surface, borderRadius: 8, borderTop: `2px solid ${C.teal}` }}><strong style={{ color: C.teal, fontSize: "0.8rem" }}>ACTIVATION</strong><p style={{ fontSize: "0.78rem", marginTop: 4 }}>Surface prior knowledge</p></div>
                <div style={{ padding: "10px 14px", background: C.surface, borderRadius: 8, borderTop: `2px solid ${C.gold}` }}><strong style={{ color: C.gold, fontSize: "0.8rem" }}>AWARENESS</strong><p style={{ fontSize: "0.78rem", marginTop: 4 }}>See the gap</p></div>
                <div style={{ padding: "10px 14px", background: C.surface, borderRadius: 8, borderTop: `2px solid ${C.coral}` }}><strong style={{ color: C.coral, fontSize: "0.8rem" }}>AFFECT</strong><p style={{ fontSize: "0.78rem", marginTop: 4 }}>Engage with struggle</p></div>
                <div style={{ padding: "10px 14px", background: C.surface, borderRadius: 8, borderTop: `2px solid ${C.ocean}` }}><strong style={{ color: C.sky, fontSize: "0.8rem" }}>ASSEMBLY</strong><p style={{ fontSize: "0.78rem", marginTop: 4 }}>Build integrated understanding</p></div>
              </div>
              <p style={{ marginTop: 12 }}>Bellwether Education Partners (2025) synthesized this in "Productive Struggle: How AI Is Changing Learning, Effort, and Youth Development," noting that <strong>AI's default tendency is to eliminate struggle entirely</strong> — threatening the cognitive mechanisms that produce genuine learning.</p>
            </Expandable>
          </FadeIn>

          <Divider label="How It Actually Works in the Classroom" />

          <FadeIn delay={0.06}>
            <Expandable title="Personalized Learning: How Khanmigo Actually Works">
              <p>In <em>Brave New Words</em> (2024), Sal Khan explains how Khanmigo personalizes by remembering student interests across sessions. When a student says "I'd rather be talking about soccer," the AI responds:</p>
              <div style={{ padding: "14px 18px", background: "rgba(26,138,122,0.06)", borderRadius: 10, borderLeft: `3px solid ${C.teal}`, margin: "12px 0" }}>
                <p style={{ color: C.textPrimary, fontSize: "0.93rem", lineHeight: 1.65, fontStyle: "italic" }}>"Let's say you are a soccer coach, and you want to model the number of goals your team scores based on the number of hours they practice each week. You come up with the following polynomial: 3X² – 5X + 2. Can you identify the degree of this polynomial and the leading coefficient?"</p>
              </div>
              <p style={{ marginTop: 12 }}>Days later, when working on a history project, Khanmigo remembers the interest and explains federalism through soccer league governance. The system registers whether you prefer formal or colloquial language, short or long answers, and what motivates you most.</p>
              <p style={{ marginTop: 12 }}><strong>But Khan's 2026 candid admission:</strong> In a landmark Chalkbeat interview (April 9, 2026), Khan admitted:</p>
              <QuoteBlock
                quote="For a lot of students, it was a non-event. They just didn't use it much."
                attribution="Sal Khan"
                source="Chalkbeat interview, April 9, 2026"
                color={C.coral}
              />
              <p>Khan Academy found <strong>~80–85% of students didn't know how to initiate questions</strong> with a standalone chatbot. The process of formulating questions is itself a learned skill that can't be bypassed. Khan Academy overhauled its product to integrate Khanmigo directly into practice exercises. Khan now advocates AI as enhancing "HI — human intelligence, human potential and human purpose."</p>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Expandable title="AI & Special Education: Power and Responsibility">
              <p>As an educator who began his career working with students with special needs, I have a deep appreciation for how AI can transform IEP development. Tools like MagicSchool AI's IEP generator allow educators to input a student's grade level, disability category, and needs description, and receive a customized draft in seconds — work that used to take hours of late nights.</p>
              <p style={{ marginTop: 12 }}><strong>Critical caveat:</strong> Anything produced by an AI — especially legally binding documents like an IEP — must be thoroughly reviewed by teachers. AI might suggest priority seating — great, if you don't teach online. This is where AI becomes a supportive team member: you provide precise feedback, and it collaborates to modify suggestions until you're satisfied. The teacher makes the final call.</p>
              <p style={{ marginTop: 12 }}>NYC's 2026 AI policy places IEP decisions firmly in the "Red" zone: AI cannot make placement or accommodation decisions. This is the right call. But using AI to draft initial documents, suggest accommodations, and level text for accessibility? That's the kind of support that frees teachers to do what they do best.</p>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Expandable title="Custom GPTs for Professional Development" color={C.gold}>
              <p>I've developed several specialized GPTs designed to support specific areas of professional development:</p>
              <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
                <div style={{ padding: "12px 16px", background: C.surface, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.gold}`, borderRadius: 8 }}>
                  <strong style={{ color: C.gold }}>RigorGPT</strong> — Helps teachers understand and implement academic rigor. Evaluates lesson plans and transcripts, provides personalized feedback, shares cognitive rigor matrices. <a href="https://chatgpt.com/g/g-RigorGPT" target="_blank" rel="noopener noreferrer">Try it →</a>
                </div>
                <div style={{ padding: "12px 16px", background: C.surface, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.teal}`, borderRadius: 8 }}>
                  <strong style={{ color: C.teal }}>BackwardDesignGPT</strong> — Guides backward planning based on Understanding by Design. Helps define desired results, determine evidence, plan aligned learning. <a href="https://chatgpt.com/g/g-BackwardDesignGPT" target="_blank" rel="noopener noreferrer">Try it →</a>
                </div>
                <div style={{ padding: "12px 16px", background: C.surface, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.ocean}`, borderRadius: 8 }}>
                  <strong style={{ color: C.sky }}>OutcomesGPT</strong> — Supports understanding and implementing overarching student outcomes. Evaluates alignment of instruction, assessments, objectives. <a href="https://chatgpt.com/g/g-OutcomesGPT" target="_blank" rel="noopener noreferrer">Try it →</a>
                </div>
                <div style={{ padding: "12px 16px", background: C.surface, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.coral}`, borderRadius: 8 }}>
                  <strong style={{ color: C.coral }}>Science of Reading GPT</strong> — Covers phonemic awareness, phonics, fluency, vocabulary, comprehension. Evaluates lesson plans against SoR principles. <a href="https://chatgpt.com/g/g-SoRGPT" target="_blank" rel="noopener noreferrer">Try it →</a>
                </div>
                <div style={{ padding: "12px 16px", background: C.surface, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.gold}`, borderRadius: 8 }}>
                  <strong style={{ color: C.gold }}>ReviewSongGPT</strong> — Transforms lesson content into songs. Select content type, choose genre, get lyrics. Pair with Udio for actual audio.
                </div>
              </div>
              <p style={{ marginTop: 12, color: C.textMuted, fontSize: "0.85rem" }}><em>These GPTs are mine. While powerful, always verify AI-generated content and follow your school's AI policies.</em></p>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.12}>
            <Expandable title="Essential Tools for Educators">
              <p><strong>ChatGPT / Copilot / Gemini</strong> — General-purpose AI assistants for lesson planning, content creation, and professional development. Users must be at least 13 with parental permission for ages 13–18.</p>
              <p style={{ marginTop: 8 }}><strong>Khan Academy's Khanmigo</strong> — AI tutor that personalizes learning and reports the collaborative process. Example Khanmigo report: "Sal initially had trouble with a thesis. The outlining went smoothly. I'd recommend a B+ based on the rubric."</p>
              <p style={{ marginTop: 8 }}><strong>Microsoft Copilot "Learn Live"</strong> — Launched October 2025 under Suleyman's leadership. Voice-enabled Socratic tutor with interactive whiteboards.</p>
              <p style={{ marginTop: 8 }}><strong>MagicSchool AI</strong> — 60+ tools including IEP generators, choice board creators, rubric builders, differentiation assistants.</p>
              <p style={{ marginTop: 8 }}><strong>Amira Learning</strong> — AI reading tutor that listens to children read aloud. Shown to double reading growth rates for ages 5–10.</p>
              <p style={{ marginTop: 8 }}><strong>Duolingo</strong> — Gamified AI-powered language learning with adaptive difficulty.</p>
              <p style={{ marginTop: 8 }}><strong>Learning Ally</strong> — Audiobook solution for struggling readers, focusing on dyslexia and brain-based literacy.</p>
              <p style={{ marginTop: 8 }}><strong>PeerTeach</strong> — AI-powered peer tutoring matching based on learning styles.</p>
              <p style={{ marginTop: 8 }}><strong>AutoMark</strong> — AI-powered grading co-pilot for essays, quizzes, exams.</p>
              <p style={{ marginTop: 12, color: C.textMuted, fontSize: "0.85rem" }}><em>Always follow your school, district, or corporate policy regarding AI use. Ensure compliance with FERPA and COPPA when using any AI tools with students.</em></p>
            </Expandable>
          </FadeIn>

          <Divider label="Voices Shaping the Discourse" />

          <FadeIn delay={0.06}>
            <BodyText>The conversation about AI in education is being shaped by a distinct set of voices — from technologists turned cautious optimists to philosophers articulating what's at stake. Here are the most influential, with what they're actually saying now.</BodyText>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Expandable title="The Optimists (with caveats)" color={C.teal} tag="Tech Leaders">
              <FigureCard
                name="Sal Khan"
                role="Founder, Khan Academy"
                quote="For a lot of students, it was a non-event. They just didn't use it much."
                contribution="Author of Brave New Words (2024). His 2026 Chalkbeat interview candidly acknowledged Khanmigo's adoption challenges — about 80–85% of students didn't know how to initiate questions with a standalone chatbot. Now advocates AI as enhancing 'HI — human intelligence, human potential and human purpose.' Khanmigo grew to 700,000 users after being integrated directly into practice exercises."
                color={C.teal}
              />
              <FigureCard
                name="Ethan Mollick"
                role="Wharton / UPenn"
                quote="Treat AI as co-intelligence — co-worker, co-teacher, and coach."
                contribution="Author of the NYT bestseller Co-Intelligence: Living and Working with AI (April 2024, translated into 19 languages). Substack 'One Useful Thing' reaches 345K+ followers. Named to TIME's Most Influential People in AI list. Urges educators to actively engage with AI rather than ignore it. His 2025 paper 'AI Agents and Education: Simulated Practice at Scale' explores AI-enabled practice environments."
                color={C.teal}
              />
              <FigureCard
                name="Mustafa Suleyman"
                role="CEO, Microsoft AI"
                quote="'One size fits all' education will seem as bizarre to the next generation as rote learning Latin does to us."
                contribution="Appointed CEO of Microsoft AI in March 2024. His November 2025 paper 'Towards Humanist Superintelligence' (microsoft.ai) rejected 'narratives about a race to AGI' and proposed AI that remains 'controllable, aligned, and firmly in service to humanity.' Launched Copilot 'Learn Live' (Oct 2025) — voice-enabled Socratic tutor with interactive whiteboards."
                color={C.teal}
              />
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Expandable title="The Critical Voices" color={C.coral} tag="Critics">
              <FigureCard
                name="Rose Luckin"
                role="UCL, Educate Ventures Research"
                quote="We face a Jevons Paradox for cognitive effort."
                contribution="Professor Emerita at UCL, co-founder of the Institute for Ethical AI in Education. Her influential monthly newsletter 'The Skinny on AI for Education' reaches thousands of practitioners. In her February 2026 issue she warned AI adoption risks eroding sustained attention, critical judgment, and deep thinking — noting McKinsey's finding that 88% use AI but only 6% get meaningful returns. Identified five paradoxes: centralization vs. democratization, speed vs. safety, investment vs. returns, capability vs. evaluation, power vs. trust."
                color={C.coral}
              />
              <FigureCard
                name="Priya Lakhani OBE"
                role="CEO, CENTURY Tech"
                quote="As AI enters classrooms, we risk confusing quick and easy answers with true learning. Being challenged is essential for making knowledge stick."
                contribution="Co-founder of the Institute for Ethical AI in Education. Delivered 'This is how kids should be learning with AI' at TEDNext 2025 (November 10, Atlanta) — one of the defining educator talks of the year."
                color={C.coral}
              />
              <FigureCard
                name="Shannon Vallor"
                role="Edinburgh"
                quote="AI is a recursive epistemic mechanism distorting self-understanding."
                contribution="Author of The AI Mirror (Oxford UP, 2024; shortlisted for Royal Institute of Philosophy prize). Argues AI lacks Aristotelian phrónēsis — practical wisdom for adapting ethical principles to complex circumstances. Education cultivates phrónēsis; AI cannot replace it."
                color={C.coral}
              />
              <FigureCard
                name="Yoshua Bengio"
                role="Université de Montréal, Turing Award"
                quote="AI planning capabilities are doubling every seven months."
                contribution="Delivered a sobering AI safety warning at TED2025. His research focuses on AI risks that could compound rapidly as capability grows."
                color={C.coral}
              />
              <FigureCard
                name="Robert Sparrow & Gene Flenady"
                role="Monash University"
                quote="Money talks."
                contribution="Authors of 'Bullshit Universities: The Future of Automated Education' (AI & Society 40, 5285–5296, 2025). Argue economic pressures will push AI to replace teachers regardless of normative arguments — making the philosophical case urgently practical. Invoke Harry Frankfurt's concept of 'bullshit' (content produced without concern for truth) as it applies to generative AI."
                color={C.coral}
              />
              <FigureCard
                name="Neil Selwyn"
                role="Monash University"
                quote="[The] gold standard for distinguishing descriptive from normative claims."
                contribution="Author of Should Robots Replace Teachers? AI and the Future of Education (Polity, 2019). Established the template for the CAN/SHOULD distinction in AI education debates. Praised by Frank Pasquale."
                color={C.coral}
              />
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.12}>
            <Expandable title="Institutional Warnings" color={C.ocean} tag="Organizations">
              <ResearchCallout year="2026" title="Brookings: Risks Outweigh Benefits" finding="The Brookings Institution concluded in 2026 that risks of AI to students outweigh benefits — citing cognitive offloading, dependency, and 'banal deception' from anthropomorphic AI interfaces." color={C.coral} />
              <ResearchCallout year="Oct 2025" title="Center for Democracy and Technology" finding="Elizabeth Laird's report found 85% of teachers and 86% of students used AI in 2024–25 — but documented rising data breaches and tech-fueled harassment as major concerns." color={C.coral} />
              <ResearchCallout year="2026" title="RAND: Students Worry About Themselves" finding="A RAND Corporation study found 60% of AI-using students express concern about its impact on their own critical thinking. Students are more worried than their institutions." color={C.coral} />
              <ResearchCallout year="June 2025" title="APA Health Advisory on AI Companions" finding="The American Psychological Association issued a health advisory warning that AI companion software may 'displace or interfere with development of healthy real-world relationships.' Particularly relevant for younger users." color={C.coral} />
              <ResearchCallout year="2025" title="OECD Announces 2029 PISA AI Literacy Test" finding="The OECD announced AI literacy will be formally assessed in the 2029 PISA (MAIL test — Measurement of AI Literacy). AI Literacy Framework draft was released May 2025 — globalizing what AI competence will mean for students worldwide." color={C.teal} />
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.14}>
            <Expandable title="Conferences, Podcasts & Communities" color={C.gold}>
              <p><strong>Major conferences:</strong></p>
              <ul style={{ marginTop: 8, paddingLeft: 20, color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.8 }}>
                <li><strong>ASU+GSV Summit</strong> (April 2026) — merging with The AI Show. Largest education-technology gathering in North America.</li>
                <li><strong>Stanford AI + Education Summit 2026</strong> — co-hosted with Stanford HAI.</li>
                <li><strong>MIT AI & Education Summit 2025</strong> — focused on research-practice integration.</li>
              </ul>
              <p style={{ marginTop: 14 }}><strong>Essential podcasts & newsletters:</strong></p>
              <ul style={{ marginTop: 8, paddingLeft: 20, color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.8 }}>
                <li><strong>AI in Education Podcast</strong> (Dan Bowen & Ray Fleming) — weekly since 2019, the longest-running podcast on the topic.</li>
                <li><strong>One Useful Thing</strong> — Ethan Mollick's Substack, the most widely read newsletter on practical AI.</li>
                <li><strong>The Skinny on AI for Education</strong> — Rose Luckin / Educate Ventures, tracking research and policy.</li>
                <li><strong>Machine Ethics Podcast</strong> (Ben Byford) — 100+ episodes since 2015 on AI ethics broadly.</li>
                <li><strong>AI Ethics Now</strong> — University of Warwick.</li>
                <li><strong>Ethics in AI Podcast</strong> — Oxford's Institute for Ethics in AI, academic focus.</li>
                <li><strong>The Ethical Educator Blog</strong> (<a href="https://ethicalaiedu.wordpress.com" target="_blank" rel="noopener noreferrer">ethicalaiedu.wordpress.com</a>) — my blog on ethics, philosophy, and AI in education.</li>
              </ul>
            </Expandable>
          </FadeIn>

          <Divider label="Videos" />
          <FadeIn delay={0.08}>
            <div className="grid-2">
              <div>
                <VideoEmbed id="hJP5GqnTrNo" title="Sal Khan on AI in Education" />
                <p style={{ fontSize: "0.8rem", color: C.textMuted, marginTop: 6 }}>Sal Khan — How AI Could Save Education (TED)</p>
              </div>
              <div>
                <VideoEmbed id="e5dQ5zEuE9Q" title="Tristan Harris - AI Dilemma" />
                <p style={{ fontSize: "0.8rem", color: C.textMuted, marginTop: 6 }}>Tristan Harris & Aza Raskin — The AI Dilemma</p>
              </div>
            </div>
          </FadeIn>
        </Narrow>
      </PageContainer>
    </div>
  );
}
