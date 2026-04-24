import { C } from "../theme.js";
import { FadeIn, Expandable, SectionLabel, SectionTitle, Narrow, PageContainer, RefItem, ContinueExploring, ReadingTime } from "../components/shared.jsx";

export default function Resources({ navigate }) {
  return (
    <div style={{ padding: "80px 0", background: C.bgAlt }}>
      <PageContainer>
        <FadeIn><SectionLabel>Library</SectionLabel><SectionTitle>Essential Reading & Resources</SectionTitle><ReadingTime minutes={6} label="6 min browsable" /></FadeIn>
        <Narrow>
          <FadeIn delay={0.06}>
            <Expandable title="Books" color={C.gold} defaultOpen>
              {[
                { title: "Moral Tribes", author: "Joshua D. Greene (2013)", desc: "The definitive book on dual-process moral psychology and its implications for resolving moral disagreements between communities." },
                { title: "Brave New Words", author: "Salman Khan (2024)", desc: "How AI will revolutionize education — from the founder of Khan Academy. Introduces Khanmigo and argues for AI as enhancing human potential." },
                { title: "Co-Intelligence", author: "Ethan Mollick (2024)", desc: "NYT bestseller on living and working with AI. Treats AI as co-worker, co-teacher, and coach rather than tool or threat." },
                { title: "The Coming Wave", author: "Mustafa Suleyman (2023)", desc: "Technology, power, and the greatest dilemma of the 21st century. Essential on AI containment and governance." },
                { title: "The Singularity is Nearer", author: "Ray Kurzweil (2024)", desc: "Updated predictions on the convergence of human and artificial intelligence. Argues we are entering exponential change." },
                { title: "The AI Mirror", author: "Shannon Vallor (2024)", desc: "How to reclaim our humanity in an age of machine thinking. Argues AI lacks practical wisdom (phrónēsis)." },
                { title: "The Anxious Generation", author: "Jonathan Haidt (2024)", desc: "#1 NYT bestseller arguing smartphones and social media have 'rewired' childhood. Catalyzed legislation across multiple countries." },
                { title: "AI for Educators", author: "Matt Miller (2023)", desc: "Practical guide to using AI in the classroom, including remixing student work and building engagement." },
                { title: "Productive Failure", author: "Manu Kapur (2024)", desc: "The science of learning from struggle. Demonstrates why carefully designed failure produces deeper understanding." },
                { title: "Should Robots Replace Teachers?", author: "Neil Selwyn (2019)", desc: "The template for distinguishing descriptive from normative claims about AI in education. Praised by Frank Pasquale." },
                { title: "The Ethics of Artificial Intelligence", author: "Luciano Floridi (2023)", desc: "Frames AI as a new form of agency, not intelligence. Education cultivates human agency — AI cannot replace it." },
                { title: "AI Ethics", author: "Mark Coeckelbergh (2020)", desc: "Accessible introduction to AI ethics covering bias, responsibility, and governance. MIT Press Essential Knowledge series." },
                { title: "Why AI Undermines Democracy", author: "Mark Coeckelbergh (2024)", desc: "Addresses power and governance dimensions of AI in democratic societies. Relevant to educational governance debates." },
                { title: "Experience and Education", author: "John Dewey (1938)", desc: "Foundational work arguing education is life itself, not preparation for it. Essential context for The Shortcut thought experiment." },
                { title: "Democracy and Education", author: "John Dewey (1916)", desc: "The comprehensive vision: education as a social process, growth as the aim, learning through active engagement." },
                { title: "Anarchy, State, and Utopia", author: "Robert Nozick (1974)", desc: "Contains the Experience Machine thought experiment — would you plug into a machine simulating a perfect life?" },
                { title: "Nicomachean Ethics", author: "Aristotle (c. 340 BCE)", desc: "Book II on habituation and virtue. 'We learn by doing them — men become builders by building and lyre players by playing the lyre.'" },
                { title: "Moral Tribes", author: "Joshua D. Greene (2013)", desc: "The definitive book on dual-process moral psychology. Greene's vision of utilitarianism as 'deep pragmatism' for a diverse world." },
                { title: "Technology and the Virtues", author: "Shannon Vallor (2016)", desc: "Applies Aristotelian, Confucian, and Buddhist virtue traditions to technology ethics. Predecessor to The AI Mirror." },
                { title: "The Life You Can Save", author: "Peter Singer (2009)", desc: "Effective altruism and utilitarian ethics — the philosophical framework Greene draws on for his normative conclusions." },
              ].map((b, i) => (
                <div key={i} style={{ padding: "12px 0", borderBottom: `1px solid ${C.border}` }}>
                  <h4 style={{ color: C.textPrimary, fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.95rem" }}>{b.title}</h4>
                  <p style={{ color: C.teal, fontSize: "0.77rem", marginTop: 2 }}>{b.author}</p>
                  <p style={{ color: C.textMuted, fontSize: "0.82rem", marginTop: 3, lineHeight: 1.5 }}>{b.desc}</p>
                </div>
              ))}
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Expandable title="Academic Papers & Key References" color={C.teal} defaultOpen>
              <p style={{ color: C.textMuted, fontSize: "0.82rem", marginBottom: 12 }}>Organized chronologically within categories. Papers marked with ★ are particularly relevant to the thesis research.</p>
              <p style={{ color: C.gold, fontSize: "0.82rem", fontWeight: 600, marginTop: 16, marginBottom: 8 }}>Moral Psychology & Dual-Process Theory</p>
              <RefItem>★ Greene, J.D. et al. "An fMRI Investigation of Emotional Engagement in Moral Judgment." Science 293 (2001).</RefItem>
              <RefItem>★ Greene, J.D. et al. "The Neural Bases of Cognitive Conflict and Control in Moral Judgment." Neuron 44.2 (2004).</RefItem>
              <RefItem>★ Greene, J.D. "The Secret Joke of Kant's Soul." Moral Psychology, Vol. 3. MIT Press, 2008.</RefItem>
              <RefItem>★ Greene, J.D. et al. "Pushing Moral Buttons: Personal Force and Intention." Cognition 111.3 (2009).</RefItem>
              <RefItem>★ Kamm, F.M. "Neuroscience and Moral Reasoning: A Note on Recent Research." Philosophy & Public Affairs (2009).</RefItem>
              <RefItem>Haidt, J. "The Emotional Dog and Its Rational Tail." Psychological Review 108.4 (2001).</RefItem>
              <RefItem>Koenigs, M. et al. "Damage to the Prefrontal Cortex Increases Utilitarian Moral Judgements." Nature 446 (2007).</RefItem>
              <RefItem>Kahane, G. "On the Wrong Track: Process and Content in Moral Psychology." Mind & Language (2012).</RefItem>
              <RefItem>Young, L. & Dungan, J. "Where in the Brain Is Morality?" Social Neuroscience 7.1 (2012).</RefItem>
              <RefItem>Cosmides, L. et al. "A moral trade-off system produces intuitive judgments that are rational and coherent." PNAS 119.42 (2022).</RefItem>
              <RefItem>★ Greene, J.D. "Dual-process moral judgment beyond fast and slow." BBS 46, e123 (2023).</RefItem>
              <RefItem>Cosmides, L. et al. "Reply to Greene: No version of the dual process model can explain compromise judgments." PNAS 120.24 (2023).</RefItem>
              <RefItem>Bammel, M. "Greene's dual-process moral psychology and the modularity of mind." Philosophical Psychology (2024).</RefItem>
              <RefItem>Meta-analysis: "Effect of cognitive load, ego depletion, induction and time restriction on sacrificial dilemmas." Frontiers in Psychology 15 (2024).</RefItem>
              <RefItem>Xu & Wu. "Unraveling the neural basis of repeated moral decisions." Imaging Neuroscience, MIT Press (2025).</RefItem>
              <RefItem>Millière, R. "Normative conflicts and shallow AI alignment." Philosophical Studies (2025).</RefItem>
              <RefItem>Fair, F. & Fasko, D. "Intelligence and Moral Development." Journal of Intelligence 13.7 (2025).</RefItem>

              <p style={{ color: C.gold, fontSize: "0.82rem", fontWeight: 600, marginTop: 20, marginBottom: 8 }}>AI Ethics & Education Policy</p>
              <RefItem>UNESCO. "Recommendation on the Ethics of Artificial Intelligence." Adopted by 193 member states (2021).</RefItem>
              <RefItem>UNESCO. "Guidance for Generative AI in Education and Research." (2023).</RefItem>
              <RefItem>UNESCO. "AI Competency Framework for Teachers." Miao, F. & Cukurova, M. (UCL). UNESDOC: ark:/48223/pf0000391104 (Sept 2024).</RefItem>
              <RefItem>UNESCO. "AI Competency Framework for Students." UNESDOC: ark:/48223/pf0000391105 (Sept 2024).</RefItem>
              <RefItem>UNESCO. "AI and Education: Protecting the Rights of Learners." UNESDOC: ark:/48223/pf0000395373 (Sept 2025).</RefItem>
              <RefItem>UNESCO. "AI and the Future of Education: Disruptions, Dilemmas and Directions." 160+ pages (Sept 2025).</RefItem>
              <RefItem>EU AI Act, Regulation (EU) 2024/1689. Annex III: High-Risk AI Systems in Education. In force Aug 1, 2024.</RefItem>
              <RefItem>Saarela, M., Gunaserka, R. & Karimov, F. "The EU AI Act: Implications for Ethical AI in Education." DESRIST 2025, Springer LNCS, pp. 36–50.</RefItem>
              <RefItem>NYC Public Schools. "Guidance on Artificial Intelligence (AI)." Traffic light framework (March 2026).</RefItem>
              <RefItem>Ohio House Bill 96. Mandating formal AI policies for every public district by July 1, 2026 (Aug 2025).</RefItem>
              <RefItem>U.S. Executive Order. "Advancing Artificial Intelligence Education for American Youth." (April 2025).</RefItem>
              <RefItem>Liang, W. et al. "GPT Detectors Are Biased Against Non-Native English Writers." Patterns 4.7 (2023).</RefItem>
              <RefItem>Sparrow, R. & Flenady, T. "Bullshit Universities: The Future of Automated Education." AI & Society 40, 5285–5296, Open Access (2025).</RefItem>
              <RefItem>Hasan, N. "How AI Quietly Undermines the Joy and Effort of Learning." Annals of Medicine and Surgery 87.8, 4693–4694 (2025).</RefItem>
              <RefItem>Walker, L. & Vorvoreanu, M. "GenAI and Learning Outcomes." Microsoft Research Report (Oct 2025).</RefItem>
              <RefItem>Bastani, H. et al. "Generative AI Can Harm Learning." High school math students scored 17% lower. Working paper (2024).</RefItem>
              <RefItem>Hon, K.K.L. "Generative AI in Higher Education: A Systematic Review." Journal of Educational Technology Systems, SAGE (2026).</RefItem>
              <RefItem>Meta-analysis: "The impact of GenAI on learning outcomes." Educational Research Review 68 studies, 337 effect sizes. SMD = 0.45 (2025).</RefItem>
              <RefItem>Coelho, M.P. et al. "Operationalizing Biesta's educational purposes for GenAI." British Educational Research Journal (2025).</RefItem>
              <RefItem>HEPI. "Student Generative AI Survey 2025." 92% of UK undergraduates use AI tools.</RefItem>
              <RefItem>Digital Education Council. "Global Student AI Survey." 86% globally use AI in studies (2024).</RefItem>
              <RefItem>RAND Corporation. "More Students Use AI for Homework." 62% homework use, 60% concerned about critical thinking (Dec 2025).</RefItem>
              <RefItem>Inside Higher Ed / Generation Lab. "College Students' Views on AI." 1,047 students, 166 institutions (July 2025).</RefItem>
              <RefItem>Center for Democracy & Technology. Laird, E. Teacher and student AI use survey (Oct 2025).</RefItem>
              <RefItem>American Psychological Association. "Health Advisory on AI Companion Software." (June 2025).</RefItem>
              <RefItem>Brookings Institution. "AI's future for students is in our hands." Risks outweigh benefits (2026).</RefItem>
              <RefItem>Bellwether Education Partners. "Productive Struggle: How AI Is Changing Learning, Effort, and Youth Development." (2025).</RefItem>
              <RefItem>Pondiscio, R. "The Illusion of Learning: The Danger of AI to Education." American Enterprise Institute (2025).</RefItem>
              <RefItem>Suleyman, M. "Towards Humanist Superintelligence." microsoft.ai (Nov 6, 2025).</RefItem>
              <RefItem>Mollick, E. "AI Agents and Education: Simulated Practice at Scale." Working paper, Wharton (2025).</RefItem>
              <RefItem>OECD. "AI Literacy Framework." Draft released May 2025. AI literacy assessment in 2029 PISA (MAIL test).</RefItem>

              <p style={{ color: C.gold, fontSize: "0.82rem", fontWeight: 600, marginTop: 20, marginBottom: 8 }}>Philosophy of Education & Thought Experiments</p>
              <RefItem>Plato. Republic, Book VII (514a–520a). The Allegory of the Cave. (c. 380 BCE).</RefItem>
              <RefItem>Aristotle. Nicomachean Ethics, Book II (1103a–1105b). Habituation and virtue. (c. 340 BCE).</RefItem>
              <RefItem>Dewey, J. Democracy and Education. Macmillan (1916).</RefItem>
              <RefItem>Dewey, J. Experience and Education. Kappa Delta Pi (1938).</RefItem>
              <RefItem>Nozick, R. Anarchy, State, and Utopia, pp. 42–45. Basic Books (1974). The Experience Machine.</RefItem>
              <RefItem>Searle, J. "Minds, Brains, and Programs." BBS 3.3, 417–424 (1980). The Chinese Room.</RefItem>
              <RefItem>Jackson, F. "Epiphenomenal Qualia." Philosophical Quarterly 32 (1982). Mary's Room / The Knowledge Argument.</RefItem>
              <RefItem>Jackson, F. "What Mary Didn't Know." Journal of Philosophy 83.5 (1986).</RefItem>
              <RefItem>Slote, M. "Satisficing Consequentialism." Proceedings of the Aristotelian Society 58 (1984).</RefItem>
              <RefItem>Bjork, R.A. & Bjork, E.L. "Making Things Hard on Yourself, But in a Good Way." Psychology and the Real World (2011). Desirable difficulties.</RefItem>
              <RefItem>Lemire, D. "The learning pill." lemire.me/blog (Nov 16, 2012).</RefItem>
              <RefItem>Biesta, G. "Risking Ourselves in Education: Qualification, Socialization, and Subjectification." Educational Theory (2020).</RefItem>
              <RefItem>Hindriks, F. & Douven, I. "The Experience Machine Revisited." Philosophical Psychology 32.2 (2019).</RefItem>
              <RefItem>De Brigard, F. "If You Like It, Does It Matter If It's Real?" Philosophical Psychology 23.1 (2010). Status quo bias and Nozick.</RefItem>
              <RefItem>Brock, R. & Hay, S. "Keeping Students Out of Mary's (Class)room." Science & Education 28, 985–1000, Open Access (2019).</RefItem>
              <RefItem>"Re-Examining Nozick's Experience Machine in View of Emerging AI Companions." Annals of the University of Bucharest (2024).</RefItem>
              <RefItem>Kapur, M. Productive Failure: Unlocking Deeper Learning Through the Science of Failing. Wiley (2024). The 4 As framework.</RefItem>
              <RefItem>"LLMs, Turing Tests and Chinese Rooms: The Prospects for Meaning in LLMs." Inquiry (Jan 2025).</RefItem>
              <RefItem>Stanford Encyclopedia of Philosophy. "The Chinese Room Argument." Substantially revised Oct 2024.</RefItem>
              <RefItem>Waitzman, R. "Beyond Shadows: Plato's Cave, AI, and Critical Thinking in Schools." SSRN (2025). 4-stage framework.</RefItem>
              <RefItem>Lemire, D. "We see something that works, and then we understand it." lemire.me/blog (2025). Against "thinkism."</RefItem>
              <RefItem>Vallor, S. The AI Mirror: How to Reclaim Our Humanity in an Age of Machine Thinking. Oxford UP (2024). Phrónēsis and AI.</RefItem>
              <RefItem>Floridi, L. The Ethics of Artificial Intelligence. Oxford UP (2023). AI as agency, not intelligence.</RefItem>
              <RefItem>Coeckelbergh, M. AI Ethics. MIT Press (2020).</RefItem>
              <RefItem>Coeckelbergh, M. Why AI Undermines Democracy. Polity (2024). Power and governance dimensions.</RefItem>
              <RefItem>Selwyn, N. Should Robots Replace Teachers? AI and the Future of Education. Polity (2019).</RefItem>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Expandable title="Organizations & Frameworks" color={C.ocean}>
              <div className="grid-2" style={{ gap: 10 }}>
                {[
                  { name: "UNESCO AI Ethics", url: "https://www.unesco.org/en/artificial-intelligence/recommendation-ethics" },
                  { name: "EU AI Act Portal", url: "https://artificialintelligenceact.eu" },
                  { name: "Center for AI Safety", url: "https://www.safe.ai" },
                  { name: "IEEE Ethics of AI", url: "https://standards.ieee.org" },
                  { name: "MIT AI + Ethics Curriculum", url: "https://www.media.mit.edu" },
                  { name: "Khan Academy / Khanmigo", url: "https://www.khanmigo.ai" },
                  { name: "MagicSchool AI", url: "https://app.magicschool.ai" },
                  { name: "AI for Education (State Guidance)", url: "https://www.aiforeducation.io/ai-resources/state-ai-guidance" },
                  { name: "OECD AI in Education", url: "https://www.ai.gov/initiatives/education" },
                  { name: "Center for Democracy & Technology", url: "https://cdt.org" },
                  { name: "Educate Ventures (Rose Luckin)", url: "https://www.educateventures.com" },
                  { name: "Stanford HAI", url: "https://hai.stanford.edu" },
                  { name: "Institute for Ethical AI in Education", url: "https://www.buckingham.ac.uk/research/research-in-education/ieaied" },
                  { name: "Ethan Mollick — One Useful Thing", url: "https://www.oneusefulthing.org" },
                  { name: "NYC Schools AI Guidance", url: "https://www.schools.nyc.gov/about-us/vision-and-mission/guidance-on-artificial-intelligence" },
                  { name: "Bellwether Education Partners", url: "https://bellwether.org" },
                ].map((org, i) => (
                  <a key={i} href={org.url} target="_blank" rel="noopener noreferrer" style={{ display: "block", padding: "10px 14px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, color: C.textSecondary, fontSize: "0.84rem", transition: "all 0.2s" }}
                    onMouseOver={e => { e.currentTarget.style.borderColor = C.teal; e.currentTarget.style.color = C.textPrimary; }}
                    onMouseOut={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textSecondary; }}>{org.name} ↗</a>
                ))}
              </div>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.12}>
            <Expandable title="Podcasts & YouTube Channels" color={C.coral}>
              <p><strong>AI in Education Podcast</strong> (Dan Bowen & Ray Fleming) — Weekly since 2019. The longest-running podcast on AI in education.</p>
              <p style={{ marginTop: 8 }}><strong>One Useful Thing</strong> (Ethan Mollick's Substack) — The most widely read newsletter on practical AI applications.</p>
              <p style={{ marginTop: 8 }}><strong>The Skinny on AI for Education</strong> (Rose Luckin / Educate Ventures) — Monthly newsletter tracking the latest research and policy developments.</p>
              <p style={{ marginTop: 8 }}><strong>Machine Ethics Podcast</strong> (Ben Byford) — 100+ episodes since 2015 on AI ethics broadly.</p>
              <p style={{ marginTop: 8 }}><strong>Ethics in AI Podcast</strong> (Oxford's Institute for Ethics in AI) — Academic focus on the philosophical foundations.</p>
              <p style={{ marginTop: 8 }}><strong>The Ethical Educator Blog</strong> (<a href="https://ethicalaiedu.wordpress.com" target="_blank" rel="noopener noreferrer">ethicalaiedu.wordpress.com</a>) — Matthew's blog exploring ethics, philosophy, and AI in education.</p>
            </Expandable>
          </FadeIn>

          <ContinueExploring navigate={navigate} links={[
            { id: "moral-psych", icon: "🧠", title: "Moral Psychology", desc: "The thesis research with 2023–2026 updates", color: C.teal },
            { id: "thought-experiments", icon: "💡", title: "Thought Experiments", desc: "Interactive scenarios for AI ethics", color: C.gold },
            { id: "phil-education", icon: "🏛️", title: "Philosophy in K–12", desc: "Curriculum proposal with research evidence", color: C.coral },
          ]} />
        </Narrow>
      </PageContainer>
    </div>
  );
}
