import { C } from "../theme.js";
import { FadeIn, Expandable, SectionLabel, SectionTitle, Narrow, PageContainer, RefItem } from "../components/shared.jsx";

export default function Resources() {
  return (
    <div style={{ padding: "80px 0", background: C.bgAlt }}>
      <PageContainer>
        <FadeIn><SectionLabel>Library</SectionLabel><SectionTitle>Essential Reading & Resources</SectionTitle></FadeIn>
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
                { title: "Should Robots Replace Teachers?", author: "Neil Selwyn (2019)", desc: "The template for distinguishing descriptive from normative claims about AI in education." },
                { title: "Experience and Education", author: "John Dewey (1938)", desc: "Foundational work arguing education is life itself, not preparation for it. Essential context for the Learning Pill." },
                { title: "Anarchy, State, and Utopia", author: "Robert Nozick (1974)", desc: "Contains the Experience Machine thought experiment — a key philosophical parallel to questions about AI and authentic experience." },
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

              <p style={{ color: C.gold, fontSize: "0.82rem", fontWeight: 600, marginTop: 20, marginBottom: 8 }}>AI Ethics & Education</p>
              <RefItem>UNESCO. "Recommendation on the Ethics of Artificial Intelligence." (2021).</RefItem>
              <RefItem>UNESCO. "Guidance for Generative AI in Education and Research." (2023).</RefItem>
              <RefItem>UNESCO. "AI Competency Framework for Teachers." (2024).</RefItem>
              <RefItem>UNESCO. "AI and Education: Protecting the Rights of Learners." (2025).</RefItem>
              <RefItem>UNESCO. "AI and the Future of Education: Disruptions, Dilemmas and Directions." (2025).</RefItem>
              <RefItem>EU AI Act, Regulation (EU) 2024/1689. Annex III: High-Risk AI Systems in Education.</RefItem>
              <RefItem>Liang, W. et al. "GPT Detectors Are Biased Against Non-Native English Writers." Patterns (2023).</RefItem>
              <RefItem>Sparrow, R. & Flenady, T. "Bullshit Universities: The Future of Automated Education." AI & Society 40 (2025).</RefItem>
              <RefItem>Hasan, N. "How AI Quietly Undermines the Joy and Effort of Learning." Annals of Medicine and Surgery 87.8 (2025).</RefItem>
              <RefItem>Walker, L. & Vorvoreanu, M. "GenAI and Learning Outcomes." Microsoft Research (Oct 2025).</RefItem>

              <p style={{ color: C.gold, fontSize: "0.82rem", fontWeight: 600, marginTop: 20, marginBottom: 8 }}>Philosophy of Education</p>
              <RefItem>Jackson, F. "Epiphenomenal Qualia." Philosophical Quarterly 32 (1982).</RefItem>
              <RefItem>Nozick, R. Anarchy, State, and Utopia, pp. 42–45 (1974).</RefItem>
              <RefItem>Searle, J. "Minds, Brains, and Programs." BBS 3.3 (1980).</RefItem>
              <RefItem>Biesta, G. "Risking Ourselves in Education: Qualification, Socialization, and Subjectification." Educational Theory (2020).</RefItem>
              <RefItem>Brock, R. & Hay, S. "Keeping Students Out of Mary's (Class)room." Science & Education 28 (2019).</RefItem>
              <RefItem>Waitzman, R. "Beyond Shadows: Plato's Cave, AI, and Critical Thinking in Schools." SSRN (2025).</RefItem>
              <RefItem>Slote, M. "Satisficing Consequentialism." Proceedings of the Aristotelian Society 58 (1984).</RefItem>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Expandable title="Organizations & Frameworks" color={C.ocean}>
              <div className="grid-2" style={{ gap: 10 }}>
                {[
                  { name: "UNESCO AI Ethics", url: "https://www.unesco.org/en/artificial-intelligence/recommendation-ethics" },
                  { name: "Center for AI Safety", url: "https://www.safe.ai" },
                  { name: "IEEE Ethics of AI", url: "https://standards.ieee.org" },
                  { name: "MIT AI + Ethics Curriculum", url: "https://www.media.mit.edu" },
                  { name: "Khan Academy / Khanmigo", url: "https://www.khanmigo.ai" },
                  { name: "MagicSchool AI", url: "https://app.magicschool.ai" },
                  { name: "AI for Education (State Guidance)", url: "https://www.aiforeducation.io/ai-resources/state-ai-guidance" },
                  { name: "OECD AI in Education", url: "https://www.ai.gov/initiatives/education" },
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
        </Narrow>
      </PageContainer>
    </div>
  );
}
