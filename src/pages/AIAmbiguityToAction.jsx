import { C } from "../theme.js";
import {
  FadeIn,
  Expandable,
  Narrow,
  PageContainer,
  BodyText,
  ResearchCallout,
  ComparisonCard,
  Divider,
  ContinueExploring,
  RefItem,
  EducatorsFooter,
  ImagePageHeader,
} from "../components/shared.jsx";
import { AI_ETHICS_ARTICLE_BY_ROUTE } from "../data/aiEthicsVisuals.js";

const articleVisual = AI_ETHICS_ARTICLE_BY_ROUTE["ai-ambiguity-to-action"];

const links = {
  wpOrigin: "https://ethicalaiedu.wordpress.com/2024/07/12/from-ambiguity-to-action-navigating-ethical-challenges-in-ai-enhanced-education/",
  trolleyFoot: "https://plato.stanford.edu/entries/double-effect/",
  kantSep: "https://plato.stanford.edu/entries/kant-moral/",
  millUtilitarianism: "https://plato.stanford.edu/entries/mill/",
  aristotleVirtue: "https://plato.stanford.edu/entries/aristotle-ethics/",
  nicomachean: "https://classics.mit.edu/Aristotle/nicomachaen.html",
  sparrowFlenady: "https://link.springer.com/article/10.1007/s00146-025-02195-z",
  biestaBook: "https://www.routledge.com/Beautiful-Risk-of-Education/Biesta/p/book/9781612050270",
  coelhoBerj: "https://bera-journals.onlinelibrary.wiley.com/doi/10.1002/berj.4124",
  unescoTeachers: "https://www.unesco.org/en/digital-education/ai-future-learning/competency-frameworks",
  nycPolicy: "https://www.schools.nyc.gov/about-us/vision-and-mission/guidance-on-artificial-intelligence",
  euAiAct: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32024R1689",
  hepi2025: "https://www.hepi.ac.uk/2025/02/26/student-generative-ai-survey-2025/",
  microsoftResearch: "https://www.microsoft.com/en-us/research/publication/the-impact-of-generative-ai-on-critical-thinking-self-reported-reductions-in-cognitive-effort-and-confidence-effects-from-a-survey-of-knowledge-workers/",
  thomson: "https://philpapers.org/rec/THOTTP",
  foot: "https://www.pitt.edu/~mthompso/readings/foot.pdf",
};

function LinkOut({ href, children }) {
  return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
}

function Note({ children, color = C.gold }) {
  return (
    <div style={{
      borderLeft: `3px solid ${color}`,
      background: `${color}08`,
      padding: "14px 18px",
      borderRadius: "0 10px 10px 0",
      margin: "16px 0",
    }}>
      <p style={{ color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.7 }}>{children}</p>
    </div>
  );
}

function SourceLink({ href, children }) {
  return (
    <p style={{ marginTop: 8, color: C.textMuted, fontSize: "0.78rem", lineHeight: 1.55 }}>
      Source: <LinkOut href={href}>{children}</LinkOut>
    </p>
  );
}

function StepList({ items }) {
  return (
    <div style={{ margin: "16px 0" }}>
      {items.map((item, i) => (
        <div key={i} style={{
          display: "flex",
          gap: 14,
          alignItems: "flex-start",
          padding: "12px 0",
          borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : "none",
        }}>
          <span style={{
            flexShrink: 0,
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: `${item.color}18`,
            border: `1px solid ${item.color}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: item.color,
            fontWeight: 700,
            fontSize: "0.8rem",
          }}>{i + 1}</span>
          <div>
            <h4 style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              color: item.color,
              fontSize: "0.98rem",
              fontWeight: 600,
              marginBottom: 4,
            }}>{item.title}</h4>
            <p style={{ color: C.textSecondary, fontSize: "0.88rem", lineHeight: 1.65 }}>{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function FigureShell({ label, title, caption, children }) {
  return (
    <figure style={{
      margin: "24px auto",
      background: `linear-gradient(135deg, ${C.surface}, ${C.midnight})`,
      border: `1px solid ${C.border}`,
      borderRadius: 8,
      overflow: "hidden",
      boxShadow: "0 12px 36px rgba(0,0,0,0.22)",
      maxWidth: "100%",
    }}>
      <div style={{ padding: "16px clamp(14px, 3vw, 20px) 0" }}>
        <p style={{
          color: C.gold,
          fontSize: "0.64rem",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          marginBottom: 4,
        }}>{label}</p>
        <h4 style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          color: C.textPrimary,
          fontSize: "clamp(0.94rem, 2.4vw, 1.02rem)",
          fontWeight: 700,
          lineHeight: 1.35,
        }}>{title}</h4>
      </div>
      <div style={{ padding: "8px clamp(6px, 2vw, 12px) 0", maxWidth: "100%", overflow: "hidden" }}>{children}</div>
      {caption && (
        <figcaption style={{
          padding: "0 clamp(14px, 3vw, 20px) 16px",
          color: C.textMuted,
          fontSize: "0.78rem",
          lineHeight: 1.55,
        }}>{caption}</figcaption>
      )}
    </figure>
  );
}

function FrameworkTriangleFigure() {
  return (
    <FigureShell
      label="Visualization"
      title="Three Lenses on the Same Decision"
      caption="The frameworks don't compete for which is correct — they ask different questions about the same action. Most workable AI policies braid all three."
    >
      <svg viewBox="0 0 720 360" role="img" aria-label="Triangle of utilitarianism, deontology, and virtue ethics with shared center" style={{ width: "100%", height: "auto", display: "block" }}>
        <defs>
          <radialGradient id="triCenter">
            <stop offset="0" stopColor={C.gold} stopOpacity="0.24" />
            <stop offset="1" stopColor={C.gold} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect x="22" y="20" width="676" height="320" rx="18" fill={C.midnight} stroke={C.border} />
        <ellipse cx="360" cy="180" rx="170" ry="110" fill="url(#triCenter)" />

        {/* Triangle edges */}
        <path d="M360 70 L600 280 L120 280 Z" fill="none" stroke={`${C.gold}38`} strokeWidth="2" strokeDasharray="6 6" />

        {/* Top: Utilitarianism */}
        <circle cx="360" cy="70" r="38" fill={C.midnight} stroke={C.teal} strokeWidth="3" />
        <text x="360" y="66" textAnchor="middle" fill={C.teal} fontSize="13" fontWeight="700">Utility</text>
        <text x="360" y="82" textAnchor="middle" fill={C.textMuted} fontSize="10">consequences</text>
        <text x="360" y="38" textAnchor="middle" fill={C.textPrimary} fontSize="13" fontWeight="700" fontFamily="Source Serif 4, Georgia, serif">Utilitarianism</text>
        <text x="360" y="118" textAnchor="middle" fill={C.textMuted} fontSize="11">"did learning improve?"</text>

        {/* Bottom-right: Deontology */}
        <circle cx="600" cy="280" r="38" fill={C.midnight} stroke={C.gold} strokeWidth="3" />
        <text x="600" y="276" textAnchor="middle" fill={C.gold} fontSize="13" fontWeight="700">Duty</text>
        <text x="600" y="292" textAnchor="middle" fill={C.textMuted} fontSize="10">principles</text>
        <text x="600" y="332" textAnchor="middle" fill={C.textPrimary} fontSize="13" fontWeight="700" fontFamily="Source Serif 4, Georgia, serif">Deontology</text>
        <text x="600" y="232" textAnchor="middle" fill={C.textMuted} fontSize="11">"is it honest?"</text>

        {/* Bottom-left: Virtue */}
        <circle cx="120" cy="280" r="38" fill={C.midnight} stroke={C.coral} strokeWidth="3" />
        <text x="120" y="276" textAnchor="middle" fill={C.coral} fontSize="13" fontWeight="700">Virtue</text>
        <text x="120" y="292" textAnchor="middle" fill={C.textMuted} fontSize="10">character</text>
        <text x="120" y="332" textAnchor="middle" fill={C.textPrimary} fontSize="13" fontWeight="700" fontFamily="Source Serif 4, Georgia, serif">Virtue Ethics</text>
        <text x="120" y="232" textAnchor="middle" fill={C.textMuted} fontSize="11">"who am I becoming?"</text>

        {/* Center: the action */}
        <circle cx="360" cy="195" r="44" fill={C.midnight} stroke={C.gold} strokeWidth="3" />
        <text x="360" y="190" textAnchor="middle" fill={C.gold} fontSize="13" fontWeight="700">the action</text>
        <text x="360" y="208" textAnchor="middle" fill={C.textMuted} fontSize="11">in front of you</text>
      </svg>
    </FigureShell>
  );
}

function PolicyLayerFigure() {
  const layers = [
    { y: 60,  label: "Value",          sub: "what we say we care about",        color: C.coral, w: 660 },
    { y: 115, label: "Framework",      sub: "the ethical lens we apply",        color: C.gold,  w: 540 },
    { y: 170, label: "Thought experiment", sub: "the test that surfaces what the value really demands", color: C.teal, w: 420 },
    { y: 225, label: "Guideline",      sub: "the rule it produces",             color: C.ocean, w: 300 },
    { y: 280, label: "Practice",       sub: "what actually happens in the classroom", color: C.gold, w: 180 },
  ];
  return (
    <FigureShell
      label="Visualization"
      title="From Aspiration to Practice"
      caption="Each layer narrows the previous one. Skip a layer and you get policy that reads well but breaks on contact with a real student."
    >
      <svg viewBox="0 0 720 360" role="img" aria-label="Five-layer funnel from value to practice" style={{ width: "100%", height: "auto", display: "block" }}>
        <rect x="22" y="20" width="676" height="320" rx="18" fill={C.midnight} stroke={C.border} />
        {layers.map((l, i) => (
          <g key={l.label}>
            <rect x={360 - l.w / 2} y={l.y} width={l.w} height="40" rx="8" fill={`${l.color}18`} stroke={`${l.color}60`} />
            <text x="360" y={l.y + 18} textAnchor="middle" fill={l.color} fontSize="13" fontWeight="700">{l.label}</text>
            <text x="360" y={l.y + 32} textAnchor="middle" fill={C.textMuted} fontSize="11">{l.sub}</text>
            {i < layers.length - 1 && (
              <path d={`M360 ${l.y + 42} L360 ${layers[i + 1].y - 2}`} stroke={`${C.gold}55`} strokeWidth="2" />
            )}
          </g>
        ))}
      </svg>
    </FigureShell>
  );
}

export default function AIAmbiguityToAction({ navigate }) {
  return (
    <div style={{ padding: "80px 0", background: C.bgAlt }}>
      <PageContainer>
        <ImagePageHeader
          label="Ethics · Frameworks · Policy"
          title="From Ambiguity to Action"
          subtitle="&quot;Uphold ethics&quot; is not a policy. It's a placeholder where a policy should be. This piece walks through the normative frameworks educators actually need — utilitarianism, deontology, virtue ethics — and the thought experiments that translate them into rules a sixteen-year-old can quote back at you."
          minutes={18}
          image={articleVisual.image}
          imageAlt={articleVisual.imageAlt}
          accent={articleVisual.accent}
        />

        <Narrow>
          <FadeIn delay={0.06}>
            <BodyText>
              In school leadership documents, "ethics" tends to show up in the same paragraph as "rigor," "excellence," and "the highest standards." The words feel weighty. They are also, almost always, doing no work. A staff that has agreed to "uphold the highest ethical standards" has not yet agreed on a single concrete behavior. The agreement is the easy part. The disagreement starts the moment two reasonable teachers reach different conclusions about whether AI-generated feedback is acceptable in a fifth-grade writing class.
            </BodyText>
            <BodyText>
              The point of this piece is not to deliver a finished ethical theory. Philosophers have been at that project for 2,400 years without consensus, and a school leadership team is not going to settle the matter on a Tuesday afternoon. The point is to give educators a workable habit: name the value, choose the framework that tests it, build the thought experiment that exposes its edge cases, write the guideline that follows, and then watch what happens in the classroom — because the classroom is where the policy either holds or fails.
            </BodyText>
            <BodyText>
              The reason this matters now is that AI in education has stopped being a future problem. By early 2025, 92% of UK undergraduates reported using AI tools in their studies (HEPI 2025), up from 66% in 2024. The Digital Education Council's global survey found 86% of students worldwide doing the same. By late 2025, 33+ U.S. states had issued formal AI guidance. The EU AI Act came into force August 2024 with education classified as a "high-risk" domain. Schools that haven't done the slow work of getting from value to practice are no longer ahead of the wave. They are inside it.
            </BodyText>
          </FadeIn>

          <Divider label="Why 'Uphold Ethics' Fails" />

          <FadeIn delay={0.06}>
            <Expandable title="1. The slogan does no work" color={C.gold} tag="Foundation" defaultOpen>
              <p>Two teachers in the same building can hold opposite positions, sincerely, under the heading of "uphold ethics." One refuses to give AI-generated feedback because she believes it strips the human relationship out of evaluation. Another routinely uses AI to draft initial comments because she believes withholding faster, more consistent feedback fails her students. Both are appealing to ethics. The slogan settles nothing.</p>
              <p style={{ marginTop: 12 }}>That's not a flaw in either teacher. It's a flaw in the policy that handed them both the same one-line standard and expected the disagreement to resolve itself. The real disagreement isn't about whether to be ethical. It's about which values to prioritize when honest values point in different directions — and how to test those priorities against the cases that will actually walk through the classroom door.</p>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Expandable title="2. The questions the slogan can't answer" color={C.coral} tag="Concrete cases">
              <p>Until a policy can address specific cases by name, it is not yet a policy. Below are the kinds of questions a real AI policy in a real school has to answer in language that a parent, a sub teacher, and a high school junior can all interpret the same way.</p>
              <ul style={{ marginTop: 12, paddingLeft: 20, color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.85 }}>
                <li>If a teacher uses an AI-generated voice clone to send personalized weekly check-ins to every student, is that an act of care or an act of deception? Does the answer change if the students are told? Does it change if the parents are told and the students aren't?</li>
                <li>If an AI tutor measurably outperforms human one-on-one tutoring for math fluency, and the school can afford only one of the two, what does "putting students first" actually require?</li>
                <li>If a student uses an AI avatar that looks and sounds like them to attend a class they would otherwise miss, asks questions they would ask, and learns the material — what's been compromised, and by whom?</li>
                <li>If the school's behavior-monitoring AI flags a student for a pattern of disengagement that no human noticed, who owns the next conversation: the AI, the counselor, or the teacher whose intuition was overridden?</li>
                <li>If AI-generated feedback is more accurate, more consistent, and more timely than human feedback, is a teacher who insists on writing every comment herself acting on principle or on pride?</li>
              </ul>
              <Note color={C.coral}>
                A school that can answer five of these in writing has a policy. A school that gestures at "ethics" and "professional judgment" does not — it has an aspiration that will quietly hand the answers to whichever individual teacher happens to be in the room.
              </Note>
            </Expandable>
          </FadeIn>

          <Divider label="The Three Frameworks Educators Actually Need" />

          <FadeIn delay={0.06}>
            <FrameworkTriangleFigure />
          </FadeIn>

          <FadeIn delay={0.06}>
            <Expandable title="3. Utilitarianism: did this produce more good than harm?" color={C.teal} tag="Framework" defaultOpen>
              <p>Utilitarianism, in its classical form (Bentham, then refined by Mill), holds that the right action is the one that produces the greatest overall good — usually measured as wellbeing, happiness, or welfare. Applied to AI in education, the utilitarian question is empirical: did students learn more? Did teachers have more time for the work only they can do? Did the intervention raise outcomes for the students who needed it most?</p>
              <p style={{ marginTop: 12 }}>The strength of this framework is that it forces accountability to outcomes. "We adopted this tool because we believed in it" is not enough. The utilitarian asks: did it actually work, for whom, and at what cost? A school that takes this seriously runs the data. A school that doesn't is using the framework as decoration.</p>
              <p style={{ marginTop: 12 }}>The limits show up the moment outcomes start trading against each other. If an AI tutor raises average test scores by 12 points but disengages the lowest-performing third of students, the utilitarian math has to pick a population. If a behavior-monitoring system catches more incidents but corrodes student trust, the framework needs a way to weigh the two effects against each other. Outcomes are not all in the same currency.</p>
              <SourceLink href={links.millUtilitarianism}>Stanford Encyclopedia of Philosophy, "John Stuart Mill"</SourceLink>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Expandable title="4. Deontology: what duties are non-negotiable?" color={C.gold} tag="Framework">
              <p>Deontology (Kant being the classical source) holds that some duties hold regardless of consequences. The categorical imperative — act only on principles you could will to be universal law, and treat every person as an end and never merely as a means — gives a fundamentally different test. The question is not "did it work?" but "is the action itself defensible if everyone did it?"</p>
              <p style={{ marginTop: 12 }}>For AI in education, deontology surfaces duties the utilitarian frame can paper over: the duty to be honest with students about what they are interacting with; the duty to respect a student's autonomy in deciding how to do their own intellectual work; the duty not to treat a child as a data point in a system optimization problem. A teacher who uses an AI deepfake to send personalized check-ins without disclosure is producing a good outcome (better student-teacher connection) by means most deontologists would consider impermissible.</p>
              <Note color={C.gold}>
                Kant's famous case of the murderer at the door — should you lie to save your friend? — is the standard objection. Pure deontology can produce conclusions most reasonable people would reject. The framework is a corrective, not a sole guide.
              </Note>
              <SourceLink href={links.kantSep}>Stanford Encyclopedia of Philosophy, "Kant's Moral Philosophy"</SourceLink>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Expandable title="5. Virtue ethics: what kind of person does this make me?" color={C.coral} tag="Framework">
              <p>Aristotle's virtue ethics shifts the focus from the action to the person performing it. The question is not "did the act produce good?" or "did it follow the rule?" but "what does it cultivate in the agent over time?" Virtues — practical wisdom, courage, justice, temperance, honesty — are developed by habituation. We become what we repeatedly do.</p>
              <p style={{ marginTop: 12 }}>For students, the virtue lens asks: does this use of AI cultivate intellectual independence, or quietly erode it? Does it teach the patience required to sit with difficulty, or does it remove the difficulty before the patience can form? Coelho and colleagues, writing in the British Educational Research Journal in 2025, argued that AI-assisted student work can produce the appearance of intellectual development without the actual cultivation of it — what they called a "placebo effect" paired with a "nocebo effect" in which students retreat from the harder work of becoming autonomous thinkers.</p>
              <p style={{ marginTop: 12 }}>For teachers, the lens asks: does the way I'm using this tool cultivate the kind of educator I want to be? A teacher who uses AI to generate feedback faster and reinvests the saved time in conferencing one-on-one with students is exercising a different virtue than one who uses the same tool to disengage from grading altogether. The action is identical. The character formation is not.</p>
              <ResearchCallout
                year="2025"
                title="The placebo and nocebo effects of generative AI on subjectification"
                finding="Coelho et al. argued that AI-assisted student work produces an appearance of independent intellectual development without the underlying habit formation, and that students who experience this loop subsequently retreat from the slower work of becoming autonomous thinkers. Uniform AI rules will not address this — only assignment design and assessment practice will."
                citation="Coelho et al., British Educational Research Journal, 2025"
                color={C.coral}
              />
              <SourceLink href={links.aristotleVirtue}>Stanford Encyclopedia of Philosophy, "Aristotle's Ethics"</SourceLink>
              <SourceLink href={links.coelhoBerj}>Coelho et al., BERJ (2025)</SourceLink>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.12}>
            <Expandable title="6. Why most workable policies braid all three" color={C.ocean} tag="Synthesis">
              <p>The frameworks aren't competing for which is correct. They are asking different questions about the same action, and the same action will look different through each. The most workable AI policies in actual schools — NYC's traffic-light framework being the most detailed U.S. example as of March 2026 — implicitly use all three. The "red" prohibitions read as deontological. The "yellow" categories with active educator judgment read as virtue ethics. The "green" approvals based on demonstrated benefit read as utilitarian.</p>
              <div className="grid-2" style={{ margin: "14px 0" }}>
                <ComparisonCard title="What each framework catches" color={C.gold} items={[
                  "Utility: outcomes most likely to be missed by intuition.",
                  "Duty: dignity violations most likely to be rationalized away.",
                  "Virtue: long-run character costs invisible in short-run scoring.",
                ]} />
                <ComparisonCard title="What each framework misses" color={C.coral} items={[
                  "Utility: aggregation that hides the worst-off student.",
                  "Duty: edge cases where the rule produces obvious harm.",
                  "Virtue: a way to settle disagreement between two virtuous people.",
                ]} />
              </div>
              <p>A policy that uses only one of these will reliably mishandle a third of the cases it touches. The discipline isn't picking a framework. It's keeping all three in the room and noticing when they pull in different directions.</p>
              <SourceLink href={links.nycPolicy}>NYC Public Schools, "Guidance on Artificial Intelligence" (March 2026)</SourceLink>
            </Expandable>
          </FadeIn>

          <Divider label="Thought Experiments as Policy Tools" />

          <FadeIn delay={0.06}>
            <Expandable title="7. The Trolley Problem: what a sacrifice does to a rule" color={C.teal} tag="Classical" defaultOpen>
              <p>Philippa Foot introduced the Trolley Problem in 1967 and Judith Jarvis Thomson sharpened it through the 1970s and 1980s. The setup: a runaway trolley is about to kill five people on the track ahead. You can pull a lever that diverts it to a side track, where it will kill one person instead. Most people, asked, pull the lever — sacrificing one to save five looks like the right call.</p>
              <p style={{ marginTop: 12 }}>The Footbridge variant changes the means. You're now on a bridge over the tracks. The only way to stop the trolley is to push a large man off the bridge in front of it. He dies, the five live. Same math. Most people refuse. The intuition is that the means matter — that there is a moral difference between redirecting harm and using a person as the instrument of stopping it.</p>
              <p style={{ marginTop: 12 }}>For school leaders, this is not abstract. It is the test for any AI tool that improves average outcomes by accepting harm to a specific student. A behavior-monitoring system that improves overall safety by occasionally flagging an innocent child as "at risk" is, in moral structure, the Footbridge case. A teacher who agrees with the utilitarian math but balks at deploying the system is doing what the Footbridge intuition predicts: the means matter, even when the outcome math runs the other way.</p>
              <SourceLink href={links.foot}>Philippa Foot, "The Problem of Abortion and the Doctrine of the Double Effect" (1967)</SourceLink>
              <SourceLink href={links.thomson}>Judith Jarvis Thomson, "The Trolley Problem" (1985)</SourceLink>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Expandable title="8. Building your own thought experiments" color={C.gold} tag="Practice">
              <p>You do not need a moral philosophy degree to design a thought experiment that serves a real policy decision. The structure is simple: take the value you say you hold, push it into a case where it would cost you something, and see if you still hold it. The cases that produce the most useful disagreement are the ones nobody wants to answer.</p>
              <StepList items={[
                { title: "Name the value", text: "Pick one. \"We value honesty.\" \"We value student autonomy.\" \"We value teacher judgment.\" One sentence.", color: C.teal },
                { title: "Build a case where the value costs something", text: "What does honesty about AI use cost when the student would have gotten a higher grade without disclosure? What does student autonomy cost when the autonomous choice is to disengage entirely?", color: C.gold },
                { title: "Force the answer in writing", text: "Ambiguity dies in the writing. A team that can say \"in this case, we would do X and accept the cost Y\" is doing real work. A team that says \"it depends on the situation\" is still upstream of the work.", color: C.ocean },
                { title: "Test against the cases you've actually seen", text: "Pull real cases from the last semester. Does your answer still hold? If not, the value statement was hiding the real principle. Find the real one.", color: C.coral },
              ]} />
              <p>The schools that handle AI well are not the ones with the longest policy documents. They are the ones whose leadership team has done this exercise enough times that the next case doesn't ambush them.</p>
            </Expandable>
          </FadeIn>

          <Divider label="From Value to Practice" />

          <FadeIn delay={0.06}>
            <PolicyLayerFigure />
          </FadeIn>

          <FadeIn delay={0.06}>
            <Expandable title="9. The funnel from value to practice" color={C.teal} tag="Framework" defaultOpen>
              <p>Every working AI policy in education narrows through the same five layers. The slogan-only policies stop at layer one. The legalistic policies skip to layer four. Both versions fail in their own ways. The ones that hold do the slow work in the middle.</p>
              <StepList items={[
                { title: "Value", text: "What does the school actually care about? Not what looks good on the website. What survives the case where it costs something?", color: C.coral },
                { title: "Framework", text: "Which ethical lens makes this value testable? Utility for outcome-driven values, deontology for dignity-driven ones, virtue for character-driven ones.", color: C.gold },
                { title: "Thought experiment", text: "What's the case that reveals what the value really demands? The one nobody wants to answer is the one worth designing.", color: C.teal },
                { title: "Guideline", text: "The specific, sixteen-year-old-readable rule the experiment produces. \"AI use is permitted with disclosure on take-home essays\" is a guideline. \"Uphold ethics\" is not.", color: C.ocean },
                { title: "Practice", text: "What actually happens when a teacher gets the case. The classroom is where the policy either holds or fails. No amount of writing fixes a practice the staff can't execute.", color: C.gold },
              ]} />
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Expandable title="10. Your AI policy will fail (and that's the point)" color={C.coral} tag="Reality check">
              <p>Every AI policy in every school is going to age badly. The tool that's central to today's policy will be obsolete in eighteen months. The new tool that wasn't on the radar at the time of writing will create cases the policy doesn't address. Teachers will find loopholes. Students will find better ones. The policy will need to be rewritten — not because it was bad, but because the world it was written for has moved.</p>
              <p style={{ marginTop: 12 }}>This is fine. The policy's job is not to be permanent. Its job is to make the next round of decisions visible, contested, and improvable. A school that has done the value → framework → experiment → guideline → practice work once knows how to do it again. A school that hasn't is starting from zero every time the technology changes.</p>
              <Note color={C.coral}>
                Stop trying to write the policy that catches every case. Start building the institutional habit that handles the next case. The first move is rewriting the policy in 12-18 months — name that explicitly in the policy itself.
              </Note>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Expandable title="11. The is/ought distinction at the heart of all this" color={C.gold} tag="Conclusion">
              <p>Hume's old observation, sharpened by Sparrow and Flenady's 2025 paper in <em>AI & Society</em>: you cannot derive an "ought" from an "is." That AI <em>can</em> do a thing — write the essay, grade the paper, tutor the student, replace the teacher — does not settle whether it <em>should</em>. The settling is a different conversation, requiring different tools, and it does not happen on its own. It happens because someone in the building decided to host it, with the frameworks ready, the thought experiments drafted, and enough time blocked on the calendar to argue the cases through.</p>
              <p style={{ marginTop: 12 }}>The point of the move from ambiguity to action is not to arrive at a finished ethics. It is to put the conversation on stable enough footing that the next case — and there will be a next case — gets handled by a school that has practiced thinking about cases. The slogan-only schools won't do this. The legalistic schools will overdo the document and underdo the practice. The schools that do the slow work in between are the ones whose teachers, in five years, will still be able to look a parent in the eye and explain what their school stands for and why.</p>
              <SourceLink href={links.sparrowFlenady}>Sparrow & Flenady, "Bullshit Universities: The Future of Automated Education" (AI & Society 40, 2025)</SourceLink>
            </Expandable>
          </FadeIn>

          <Divider label="References" />

          <FadeIn delay={0.06}>
            <Expandable title="Verified sources used in this article" color={C.ocean} tag="Sources">
              <RefItem><LinkOut href={links.wpOrigin}>Matthew A. Zinn. "From Ambiguity to Action: Navigating Ethical Challenges in AI-Enhanced Education." The Examined Classroom, July 12, 2024. (Original publication; this article is the expanded internal treatment.)</LinkOut></RefItem>
              <RefItem><LinkOut href={links.foot}>Philippa Foot. "The Problem of Abortion and the Doctrine of the Double Effect." Oxford Review 5, 1967.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.thomson}>Judith Jarvis Thomson. "The Trolley Problem." Yale Law Journal 94(6), 1985, 1395–1415.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.millUtilitarianism}>Stanford Encyclopedia of Philosophy. "John Stuart Mill." Substantive revision 2022.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.kantSep}>Stanford Encyclopedia of Philosophy. "Kant's Moral Philosophy." Substantive revision 2022.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.aristotleVirtue}>Stanford Encyclopedia of Philosophy. "Aristotle's Ethics." Substantive revision 2022.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.nicomachean}>Aristotle. Nicomachean Ethics. Translation by W. D. Ross.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.coelhoBerj}>Coelho et al. "Generative AI in schools: placebo and nocebo effects on subjectification." British Educational Research Journal, 2025.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.sparrowFlenady}>Robert Sparrow and Gavin Flenady. "Bullshit Universities: The Future of Automated Education." AI & Society 40, 2025, 5285–5296.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.biestaBook}>Gert Biesta. The Beautiful Risk of Education. Routledge, 2014.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.nycPolicy}>NYC Public Schools. "Guidance on Artificial Intelligence." Released March 24, 2026.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.euAiAct}>European Union. Regulation (EU) 2024/1689 (the AI Act). In force August 1, 2024.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.hepi2025}>Higher Education Policy Institute. "Student Generative AI Survey 2025."</LinkOut></RefItem>
              <RefItem><LinkOut href={links.unescoTeachers}>UNESCO. "AI Competency Framework for Teachers" (2024). UNESDOC: ark:/48223/pf0000391104.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.microsoftResearch}>Microsoft Research. "The Impact of Generative AI on Critical Thinking" (2025).</LinkOut></RefItem>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.08}>
            <EducatorsFooter
              navigate={navigate}
              takeaways={[
                "\"Uphold ethics\" is not a policy. Two reasonable teachers can hold opposite positions under that heading. A policy starts at the point where you can say what you would do in a specific case and what cost you would accept.",
                "The three classical frameworks aren't competing for which is correct. They ask different questions about the same action. Most workable AI policies use utilitarianism for outcome questions, deontology for dignity questions, and virtue ethics for character questions — often in the same paragraph.",
                "Thought experiments are policy tools, not philosophy-class decorations. A case nobody on the leadership team wants to answer is the most useful design for the policy you need next.",
                "Every AI policy will age badly. Plan the rewrite cadence (12–18 months) into the policy itself. The point is the institutional habit, not the document.",
                "The is/ought distinction is the question every AI-in-education conversation eventually lands on. That AI can do something does not yet tell you whether it should. The settling work is values work, and it doesn't happen on its own.",
              ]}
              classroomActivities={[
                {
                  title: "Run the Trolley → Footbridge → AI sequence with staff",
                  time: "60 min",
                  description: "Walk through the Trolley Problem, then the Footbridge variant, then a current AI case from your school (a flagged essay, a monitoring alert, an AI-tutor-vs-teacher-time tradeoff). Notice where intuitions hold across all three and where they break.",
                  prompt: "If your intuition flipped between Trolley and Footbridge but not between Footbridge and the AI case, what is your intuition tracking that the math isn't?",
                },
                {
                  title: "The 'name the value' exercise",
                  time: "45 min",
                  description: "Each department writes one sentence: \"We value ___.\" Then each writes a case where that value would cost something. Then the team picks the one case nobody wants to answer and answers it in writing.",
                  prompt: "If you can't answer the case in writing, the value statement was hiding something. What is the real value underneath?",
                },
                {
                  title: "Audit the gap between policy and practice",
                  time: "30 min",
                  description: "Pull your current AI guidance and three real cases from the last semester. For each case, mark whether the policy actually told the teacher what to do, or whether the teacher had to decide alone. Count.",
                  prompt: "Where the count is high, where would the next thought experiment have to land to close the gap?",
                },
              ]}
              whereToGoNext={{
                internal: [
                  { id: "ai-authorship-quandary", label: "The AI Authorship Quandary", blurb: "Companion piece: a single case study walking through the same frameworks in classroom-level detail." },
                  { id: "ai-ethics", label: "AI Ethics in Education", blurb: "The broader policy and regulation context: UNESCO, EU AI Act, NYC's traffic-light framework, the is/ought problem." },
                  { id: "ai-consciousness", label: "The Consciousness Line", blurb: "What's at stake when we recognize a mind. The same caution-under-uncertainty stance, applied to a different question." },
                  { id: "thought-experiments", label: "Thought Experiments", blurb: "The Shortcut, Digital Doppelgänger, Reluctant Educator — interactive scenarios for staff PD." },
                ],
                external: [
                  { href: links.nycPolicy, label: "NYC Schools AI Guidance (March 2026)", blurb: "The most detailed U.S. district framework. Read it as a model of frameworks made operational." },
                  { href: links.sparrowFlenady, label: "Sparrow & Flenady on automated education (AI & Society, 2025)", blurb: "The is/ought distinction made very sharp, applied to teacher replacement." },
                  { href: links.unescoTeachers, label: "UNESCO AI Competency Framework for Teachers (2024)", blurb: "The first global framework. 15 competencies across 5 dimensions; a useful scaffold for staff development." },
                ],
              }}
            />
          </FadeIn>

          <FadeIn delay={0.1}>
            <ContinueExploring navigate={navigate} links={[
              { id: "ai-ethics", icon: "AI", title: "AI Ethics", desc: "Policy, philosophy, and frameworks", color: C.gold },
              { id: "ai-authorship-quandary", icon: "QC", title: "Authorship Quandary", desc: "The frameworks applied to one case", color: C.teal },
              { id: "thought-experiments", icon: "TE", title: "Thought Experiments", desc: "Practice ethical reasoning", color: C.coral },
            ]} />
          </FadeIn>
        </Narrow>
      </PageContainer>
    </div>
  );
}
