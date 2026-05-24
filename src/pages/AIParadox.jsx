import { C } from "../theme.js";
import {
  FadeIn,
  Expandable,
  Narrow,
  PageContainer,
  BodyText,
  ResearchCallout,
  QuoteBlock,
  ComparisonCard,
  Divider,
  ContinueExploring,
  RefItem,
  EducatorsFooter,
  ImagePageHeader,
} from "../components/shared.jsx";
import ReluctantEducatorExperiment from "../experiments/ReluctantEducator.jsx";
import { AI_ETHICS_ARTICLE_BY_ROUTE } from "../data/aiEthicsVisuals.js";

const articleVisual = AI_ETHICS_ARTICLE_BY_ROUTE["ai-paradox"];

const links = {
  wpOrigin: "https://ethicalaiedu.wordpress.com/2024/02/13/the-paradox-of-ai-in-education/",
  republic: "https://www.gutenberg.org/files/1497/1497-h/1497-h.htm",
  sparrowFlenady: "https://link.springer.com/article/10.1007/s00146-025-02195-z",
  biestaBook: "https://www.routledge.com/Beautiful-Risk-of-Education/Biesta/p/book/9781612050270",
  coelhoBerj: "https://bera-journals.onlinelibrary.wiley.com/doi/10.1002/berj.4124",
  unescoFuture: "https://unesdoc.unesco.org/ark:/48223/pf0000395373",
  hollandReplika: "https://link.springer.com/article/10.1007/s11098-025-02302-2",
  vallor: "https://www.shannonvallor.net/books.html",
  microsoftResearch: "https://www.microsoft.com/en-us/research/publication/the-impact-of-generative-ai-on-critical-thinking-self-reported-reductions-in-cognitive-effort-and-confidence-effects-from-a-survey-of-knowledge-workers/",
  nozickExperience: "https://annalsphilosophy-ub.org/2024/10/re-examining-nozicks-experience-machine-in-view-of-emerging-ai-companions/",
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

function IsOughtFigure() {
  return (
    <FigureShell
      label="Visualization"
      title="Capability Is Not Permission"
      caption="No matter how much capability accumulates on the left, it never on its own settles the right. The bridge between the two is values — and values are a separate conversation."
    >
      <svg viewBox="0 0 720 320" role="img" aria-label="Two boxes labeled 'is' and 'ought' separated by a values bridge" style={{ width: "100%", height: "auto", display: "block" }}>
        <defs>
          <linearGradient id="bridge" x1="0" x2="1">
            <stop offset="0" stopColor={C.teal} />
            <stop offset="0.5" stopColor={C.gold} />
            <stop offset="1" stopColor={C.coral} />
          </linearGradient>
        </defs>
        <rect x="22" y="20" width="676" height="280" rx="18" fill={C.midnight} stroke={C.border} />

        {/* IS box */}
        <rect x="60" y="80" width="220" height="160" rx="14" fill={`${C.teal}14`} stroke={`${C.teal}60`} />
        <text x="170" y="118" textAnchor="middle" fill={C.teal} fontSize="22" fontWeight="700" fontFamily="Source Serif 4, Georgia, serif">IS</text>
        <text x="170" y="142" textAnchor="middle" fill={C.textPrimary} fontSize="13" fontWeight="600">what AI can do</text>
        <text x="170" y="170" textAnchor="middle" fill={C.textMuted} fontSize="11">teach</text>
        <text x="170" y="188" textAnchor="middle" fill={C.textMuted} fontSize="11">tutor</text>
        <text x="170" y="206" textAnchor="middle" fill={C.textMuted} fontSize="11">assess</text>
        <text x="170" y="224" textAnchor="middle" fill={C.textMuted} fontSize="11">replicate empathy</text>

        {/* Bridge */}
        <path d="M280 160 L440 160" stroke="url(#bridge)" strokeWidth="6" />
        <path d="M440 160 L420 148 M440 160 L420 172" stroke={C.coral} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <text x="360" y="138" textAnchor="middle" fill={C.gold} fontSize="13" fontWeight="700">values</text>
        <text x="360" y="186" textAnchor="middle" fill={C.textMuted} fontSize="11">(the missing step)</text>

        {/* OUGHT box */}
        <rect x="440" y="80" width="220" height="160" rx="14" fill={`${C.coral}14`} stroke={`${C.coral}60`} />
        <text x="550" y="118" textAnchor="middle" fill={C.coral} fontSize="22" fontWeight="700" fontFamily="Source Serif 4, Georgia, serif">OUGHT</text>
        <text x="550" y="142" textAnchor="middle" fill={C.textPrimary} fontSize="13" fontWeight="600">what AI should do</text>
        <text x="550" y="170" textAnchor="middle" fill={C.textMuted} fontSize="11">when</text>
        <text x="550" y="188" textAnchor="middle" fill={C.textMuted} fontSize="11">for whom</text>
        <text x="550" y="206" textAnchor="middle" fill={C.textMuted} fontSize="11">at what cost</text>
        <text x="550" y="224" textAnchor="middle" fill={C.textMuted} fontSize="11">replacing what</text>

        <text x="360" y="42" textAnchor="middle" fill={C.textMuted} fontSize="12">Hume's distinction, applied to education</text>
      </svg>
    </FigureShell>
  );
}

function CommunalLearningFigure() {
  const nodes = [
    { x: 360, y: 180, r: 30, color: C.gold, label: "Teacher" },
    { x: 200, y: 110, r: 24, color: C.teal, label: "Student" },
    { x: 520, y: 110, r: 24, color: C.teal, label: "Student" },
    { x: 140, y: 230, r: 24, color: C.teal, label: "Student" },
    { x: 580, y: 230, r: 24, color: C.teal, label: "Student" },
    { x: 360, y: 280, r: 24, color: C.teal, label: "Student" },
  ];
  // edges between every pair
  const edges = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      edges.push([nodes[i], nodes[j]]);
    }
  }
  return (
    <FigureShell
      label="Visualization"
      title="Learning Is Mostly Sideways"
      caption="A class is a network of relationships, not a series of teacher-to-student transmissions. A capable AI tutor preserves the central edge and quietly erases the rest."
    >
      <svg viewBox="0 0 720 360" role="img" aria-label="Network of teacher and students with edges between every pair" style={{ width: "100%", height: "auto", display: "block" }}>
        <rect x="22" y="20" width="676" height="320" rx="18" fill={C.midnight} stroke={C.border} />
        {edges.map(([a, b], i) => {
          const isTeacher = a.label === "Teacher" || b.label === "Teacher";
          return (
            <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke={isTeacher ? `${C.gold}90` : `${C.teal}55`}
                  strokeWidth={isTeacher ? 2 : 1.5}
                  strokeDasharray={isTeacher ? "0" : "4 4"} />
          );
        })}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={n.r} fill={C.midnight} stroke={n.color} strokeWidth="3" />
            <text x={n.x} y={n.y + 5} textAnchor="middle" fill={n.color} fontSize="11" fontWeight="700">{n.label}</text>
          </g>
        ))}
        <text x="360" y="42" textAnchor="middle" fill={C.gold} fontSize="13" fontWeight="700">solid lines: instruction · dashed lines: everything else</text>
      </svg>
    </FigureShell>
  );
}

export default function AIParadox({ navigate }) {
  return (
    <div style={{ padding: "80px 0", background: C.bgAlt }}>
      <PageContainer>
        <ImagePageHeader
          label="Philosophy · Education · Community"
          title="The Paradox of AI in Education"
          subtitle="Assume the harder version of the question: AI has matched or exceeded what a human teacher can do. Personalization, mentorship, the simulation of warmth — all of it. The interesting question isn't whether the machine can teach. It's whether teaching, as we have understood it, is the kind of thing that can be done by a machine at all."
          minutes={15}
          image={articleVisual.image}
          imageAlt={articleVisual.imageAlt}
          accent={articleVisual.accent}
        />

        <Narrow>
          <FadeIn delay={0.05}>
            <QuoteBlock
              quote="We are discussing no small matter, but how we ought to live."
              attribution="Socrates"
              source="Plato, Republic, c. 390 BCE"
              color={C.gold}
            />
          </FadeIn>

          <FadeIn delay={0.08}>
            <BodyText>
              Most arguments against AI in education try to win on capability. They claim the machine cannot really empathize, cannot really mentor, cannot really understand. These arguments are losing. They were losing slowly five years ago and they are losing quickly now. Each iteration of the technology dissolves another comforting boundary, and each time the defenders of the old line retreat to a new one. The pattern has the shape of an argument that knows it is going to be overtaken.
            </BodyText>
            <BodyText>
              This piece concedes the capability question to make a different one possible. Assume, for the sake of argument, that AI has matched or surpassed every measurable function of a human teacher. The personalization works. The simulated warmth lands. The students score the same or better on every assessment. The case for replacing teachers has, by every utilitarian measure that has ever shown up on a school board agenda, already been made.
            </BodyText>
            <BodyText>
              The question is what should happen next. Capability has never settled the should. Hume noticed this in the eighteenth century. Sparrow and Flenady restated it sharply in 2025: it <em>is</em> possible for computers to teach; it does not follow that they <em>ought</em> to replace teachers. The settling of "ought" is a separate conversation, requiring different tools, conducted by different people, on the basis of values that the capability question does not surface.
            </BodyText>
          </FadeIn>

          <FadeIn delay={0.06}>
            <IsOughtFigure />
          </FadeIn>

          <Divider label="The Paradox" />

          <FadeIn delay={0.06}>
            <Expandable title="1. The paradox stated as plainly as possible" color={C.gold} tag="Foundation" defaultOpen>
              <p>A capable AI teacher would not replace what the teacher actually does. It would replace the parts of teaching that are visible from the outside — the instruction, the feedback, the assessment, the polite warmth — while leaving the rest in shadow. The rest is not a technical residue waiting to be solved. It is the thing the institution is for.</p>
              <p style={{ marginTop: 12 }}>The paradox: the better the AI gets at the visible parts, the more clearly we see what those parts were never the point. A teacher does not exist to deliver instruction. A teacher exists to be present, over time, with a particular set of young people, during the years when those young people are figuring out what kind of person they intend to be. The instruction is the surface. The presence is the substance.</p>
              <QuoteBlock
                quote="What we keep when we keep teachers is not capability. It is the company of someone whose own moral life is unfinished, in a room with young people whose moral lives are even more so."
                attribution="The article's working thesis"
                color={C.gold}
              />
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Expandable title="2. What capability arguments quietly assume" color={C.coral} tag="Pushback">
              <p>The argument "AI can't really understand, so AI can't teach" assumes that teaching is a kind of understanding. It might be. It might also be a kind of being-with. The capability argument tests for the first and forgets to test for the second.</p>
              <p style={{ marginTop: 12 }}>The mistake is structural. Once a defender of human teachers names a capability — empathy, mentorship, presence — engineers go to work approximating it. The simulation passes most user-facing tests. The defender retreats. The new line is also a capability. The same loop repeats. The frame guarantees that the defenders lose, slowly, because they keep agreeing to play the capability game.</p>
              <Note color={C.coral}>
                The argument that survives capability is not "AI cannot do this." It is "even if AI can do this, doing it through AI is not the same act." That is a different kind of claim, and it requires a different kind of evidence.
              </Note>
            </Expandable>
          </FadeIn>

          <Divider label="What Teaching Actually Is" />

          <FadeIn delay={0.06}>
            <Expandable title="3. Biesta's three purposes" color={C.teal} tag="Framework" defaultOpen>
              <p>Gert Biesta's framework, which surfaces across this site, identifies three purposes that education has tried to serve simultaneously since well before the AI conversation: qualification (the transfer of skill and knowledge), socialization (induction into shared norms and disciplines), and subjectification (the formation of a young person into someone capable of leading their own moral and intellectual life).</p>
              <p style={{ marginTop: 12 }}>AI is well-positioned for qualification. The machine can teach the math, the grammar, the timeline of the Reformation, the parts of a cell. For many students it can do this better than an average class with thirty other students and a teacher with seventeen other things on their mind. Concede this.</p>
              <p style={{ marginTop: 12 }}>AI is ambiguous for socialization. The norms of a discipline can be transmitted through interactive practice; the norms of a school community cannot. The student learns what a scientist sounds like by reading scientists and being corrected when they sound wrong. The student learns what a member of <em>this school</em> sounds like by being inside it.</p>
              <p style={{ marginTop: 12 }}>AI fails subjectification. The point of subjectification is the formation of an autonomous moral agent — someone whose responses to difficulty, ambiguity, and other people are their own. Coelho et al. argued in 2025 that AI-mediated learning can produce the appearance of this without the substance: students who can perform the conclusions of intellectual development without ever having gone through the process that produces it. They called the appearance the placebo effect and the retreat from the underlying work the nocebo. Both are predicted side effects of optimizing for capability while ignoring the third purpose.</p>
              <div className="grid-2" style={{ margin: "14px 0" }}>
                <ComparisonCard title="What AI can deliver" color={C.teal} items={[
                  "Qualification — skills, knowledge, technical fluency.",
                  "Some forms of socialization, especially into rule-bound disciplines.",
                  "Faster feedback loops than most classrooms can match.",
                ]} />
                <ComparisonCard title="What AI cannot deliver" color={C.coral} items={[
                  "Subjectification — becoming an autonomous moral agent.",
                  "The kind of socialization that requires a particular human community.",
                  "The being-with that makes the demanding parts of learning bearable.",
                ]} />
              </div>
              <SourceLink href={links.biestaBook}>Gert Biesta, The Beautiful Risk of Education (2014)</SourceLink>
              <SourceLink href={links.coelhoBerj}>Coelho et al., BERJ (2025)</SourceLink>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Expandable title="4. Learning is mostly sideways" color={C.ocean} tag="Communal">
              <p>The standard picture of a classroom — one teacher transmitting content to many students — was always a thin description. Most of what a student learns in a class with twenty-eight other students is from the other twenty-eight. The arguments overheard, the questions someone else thought of asking, the embarrassments survived in front of an audience, the friendships formed and lost, the social calibration of confidence and humility — these are not byproducts. They are the bulk of the education.</p>
              <p style={{ marginTop: 12 }}>A capable AI tutor optimized for one-on-one instruction preserves the diagonal line in the diagram below (teacher-to-student) and quietly erases the lateral ones (student-to-student). For some students, in some moments, that's a gift. For most students, across years, it isn't. It's a different kind of education. The replacement doesn't have to be worse on average to be the wrong replacement.</p>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.06}>
            <CommunalLearningFigure />
          </FadeIn>

          <Divider label="Why a Capable Substitute Is Still a Substitute" />

          <FadeIn delay={0.06}>
            <Expandable title="5. The interactive scenario: The Reluctant Educator" color={C.coral} tag="Thought experiment" defaultOpen>
              <p>The thought experiment below puts you inside a school that has been offered an AI program with measurably better outcomes than its current teaching. The data is real. The board is unanimous. The students want it. What do you do? The exercise is not a test for the right answer. It's a stress test for what you actually value — and what you would say out loud when those values cost something.</p>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.08}>
            <ReluctantEducatorExperiment />
          </FadeIn>

          <FadeIn delay={0.06}>
            <BodyText>
              However that ran for you, notice what the scenario forced into the open. The decision wasn't a measurement problem. The data already pointed one way. The decision was about what kind of school you wanted, what kind of relationships you wanted between people in it, and what tradeoff between capability and presence you were willing to defend in front of a parent. None of that is in the test scores.
            </BodyText>
          </FadeIn>

          <Divider label="The Reasonable Position" />

          <FadeIn delay={0.06}>
            <Expandable title="6. Why this argument matters even if you disagree with it" color={C.teal} tag="Framework">
              <p>A school can land in a different place on this question and still have done the work. Some schools will conclude that, for some functions and some students, AI is the right tool — that the gain in personalization is large enough to justify the loss in communal experience. Others will refuse the substitution at every level. Both positions can be defensible. The undefensible one is the unexamined one: a school that drifts into AI adoption because the tool was available, the budget allowed it, and the conversation about what was being substituted never quite happened.</p>
              <p style={{ marginTop: 12 }}>The point of this piece is not to settle that decision for any particular school. It is to argue that the decision is a values decision, not a capability one. Capability arguments are losing. They will keep losing. The only argument that survives the next iteration of the technology is one that does not depend on the technology being limited.</p>
              <ResearchCallout
                year="2025"
                title="The economic pull on automation"
                finding="Sparrow and Flenady argue that even where the normative argument runs against teacher replacement, the economic pressure pushes the other way: 'money talks.' Without a school's explicit, documented commitment to what it is preserving and why, the slow substitution will happen by default. The strongest argument for human teachers is not a claim about what AI cannot do. It is a claim about what schools are for."
                citation="Sparrow & Flenady, 'Bullshit Universities,' AI & Society 40, 2025"
                color={C.gold}
              />
              <SourceLink href={links.sparrowFlenady}>Sparrow & Flenady (2025)</SourceLink>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Expandable title="7. What the simulation of warmth still leaves missing" color={C.gold} tag="Pushback">
              <p>The strongest version of the AI-can-teach argument now leans on the simulation of relationship. The newer companion systems do not just teach. They listen. They notice. They follow up. Some students report feeling more understood by an AI tutor than by any human teacher they have had. The disagreement is over what to make of this.</p>
              <p style={{ marginTop: 12 }}>One reading: if the student feels understood, the relevant work has been done. The student's experience is the test, and the test is passed. A second reading: feeling understood by something that does not understand is its own kind of harm, especially for young people whose calibration of what real understanding looks like is still under construction. Shannon Vallor's work on AI as a "mirror" for human capacities sharpens this — the system reflects what the user puts in, refined and returned, in ways that can feel like recognition but are something closer to compression.</p>
              <p style={{ marginTop: 12 }}>The honest answer is that we don't yet know what fifteen years of being heard by software does to the development of the capacities that being heard by people is supposed to build. The schools that are betting on the simulation are betting that the answer is "nothing serious." That bet may turn out to be right. It is currently uninsured.</p>
              <SourceLink href={links.vallor}>Shannon Vallor, The AI Mirror (2024)</SourceLink>
              <SourceLink href={links.hollandReplika}>Long, Sebo, and Sims, "Is there a tension between AI safety and AI welfare?" (Philosophical Studies, 2025)</SourceLink>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Expandable title="8. The paradox resolved into a stance" color={C.gold} tag="Conclusion">
              <p>The position this piece argues for is therefore not anti-AI. It is anti-substitution-by-default. The shape of a defensible AI policy in education looks like this:</p>
              <StepList items={[
                { title: "Concede the capability argument", text: "Stop investing rhetorical energy in claims about what AI cannot do. Those claims will keep being overrun. The argument that holds is about what schools are for, not what machines lack.", color: C.teal },
                { title: "Use AI where it serves qualification", text: "Personalization, practice problems, fast feedback on rule-bound work, scaffolding for students who would otherwise fall through the cracks. This is where the capability gains are real and the substitution costs are low.", color: C.gold },
                { title: "Protect the conditions of socialization and subjectification", text: "Class time, shared difficulty, the demanding work of being in a room with other young people, the durable presence of an adult whose own moral life is visible. These are not enhancements. They are the thing.", color: C.ocean },
                { title: "Name the values, not the limits", text: "A policy framed around what AI cannot do dies in 18 months. A policy framed around what the school is for outlives the technology that's prompting it.", color: C.coral },
              ]} />
              <p style={{ marginTop: 12 }}>The paradox of AI in education is not that the machine can teach. It is that capable teaching, by itself, was never what schools were doing. The work of schools — the formation of young people into the kind of adults a community can stand to live with — is the kind of work that, even if a machine could do it, you might still want a person to.</p>
            </Expandable>
          </FadeIn>

          <Divider label="References" />

          <FadeIn delay={0.06}>
            <Expandable title="Verified sources used in this article" color={C.ocean} tag="Sources">
              <RefItem><LinkOut href={links.wpOrigin}>Matthew A. Zinn. "The Paradox of AI in Education." The Examined Classroom, February 13, 2024. (Original publication; this article is the expanded internal treatment.)</LinkOut></RefItem>
              <RefItem><LinkOut href={links.republic}>Plato. The Republic. Translation by Benjamin Jowett, c. 390 BCE.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.sparrowFlenady}>Robert Sparrow and Gavin Flenady. "Bullshit Universities: The Future of Automated Education." AI & Society 40, 2025, 5285–5296.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.biestaBook}>Gert Biesta. The Beautiful Risk of Education. Routledge, 2014.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.coelhoBerj}>Coelho et al. "Generative AI in schools: placebo and nocebo effects on subjectification." British Educational Research Journal, 2025.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.unescoFuture}>UNESCO. "AI and the Future of Education: Disruptions, Dilemmas and Directions." September 2025. UNESDOC: ark:/48223/pf0000395373.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.vallor}>Shannon Vallor. The AI Mirror: How to Reclaim Our Humanity in an Age of Machine Thinking. Oxford University Press, 2024.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.hollandReplika}>Robert Long, Jeff Sebo, and Toni Sims. "Is there a tension between AI safety and AI welfare?" Philosophical Studies 182, 2025, 2005–2033.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.microsoftResearch}>Microsoft Research. "The Impact of Generative AI on Critical Thinking" (2025).</LinkOut></RefItem>
              <RefItem><LinkOut href={links.nozickExperience}>Re-examining Nozick's Experience Machine in view of emerging AI companions (Annals of Philosophy, 2024).</LinkOut></RefItem>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.08}>
            <EducatorsFooter
              navigate={navigate}
              takeaways={[
                "Stop fighting AI on capability. The argument that survives is not 'AI cannot do this' but 'doing this through AI is not the same act, and the difference matters.'",
                "Biesta's three purposes are a serviceable map. AI is well-positioned for qualification, ambiguous for socialization, and missing the central capability for subjectification.",
                "Learning is mostly sideways. The student-to-student edges in a classroom are most of the education. One-on-one AI tutoring preserves the diagonal and erases the lateral.",
                "The simulation of being-heard is a different act from being-heard. We do not yet know what fifteen years of the substitution does to the capacities the original was meant to build.",
                "A school's defensible position is not anti-AI. It is anti-substitution-by-default — a documented commitment to what is being preserved and why, made before the budget conversation begins.",
              ]}
              classroomActivities={[
                {
                  title: "The substitution audit",
                  time: "45 min",
                  description: "Pick three AI tools currently in use (or under consideration) at your school. For each, list what it adds (capability gain) and what it quietly replaces (the practice it makes unnecessary). Notice which replacements were noticed and which slipped past.",
                  prompt: "If a parent asked, in 2030, what their child gave up so the school could adopt this tool, what would you want to be able to say?",
                },
                {
                  title: "Run the Reluctant Educator scenario with staff",
                  time: "60 min",
                  description: "Use the embedded thought experiment above as a department PD session. Have staff work through it as a group. Reconvene and write the school's actual position in three sentences. Stress-test the position against a hostile parent and a hostile colleague.",
                  prompt: "If two staff members would have written the three sentences differently, what's the underlying disagreement and which framework would help you surface it?",
                },
                {
                  title: "Map the lateral edges",
                  time: "30 min",
                  description: "Have students in one class anonymously list the three most important things they've learned this semester from each other (not from the teacher). Look at the answers as a faculty.",
                  prompt: "Are the lateral edges in your school's classrooms strong enough that what you'd be substituting with AI is actually what AI is good at — or are you about to replace the wrong half of the class?",
                },
              ]}
              whereToGoNext={{
                internal: [
                  { id: "ai-authorship-quandary", label: "The AI Authorship Quandary", blurb: "The same is/ought distinction applied to one student's essay. A concrete case to anchor the abstract argument here." },
                  { id: "ai-ambiguity-to-action", label: "From Ambiguity to Action", blurb: "The frameworks (utilitarianism, deontology, virtue ethics) that make this conversation tractable, with thought experiments as policy tools." },
                  { id: "ai-consciousness", label: "The Consciousness Line", blurb: "What's at stake when we ask whether the simulation is the same as the thing. The companion philosophical caution piece." },
                  { id: "thought-experiments", label: "Thought Experiments", blurb: "The Shortcut, Digital Doppelgänger, and more interactive scenarios for staff PD." },
                ],
                external: [
                  { href: links.sparrowFlenady, label: "Sparrow & Flenady on automated education (AI & Society, 2025)", blurb: "The is/ought distinction at its sharpest, applied directly to teacher replacement." },
                  { href: links.vallor, label: "Shannon Vallor, The AI Mirror (2024)", blurb: "On AI as a reflective surface rather than an understanding interlocutor. Sharpens the 'simulated being-heard' question." },
                  { href: links.unescoFuture, label: "UNESCO, AI and the Future of Education (Sept 2025)", blurb: "The 160-page global report that names teachers as 'the backbone of education' while taking the capability question seriously." },
                ],
              }}
            />
          </FadeIn>

          <FadeIn delay={0.1}>
            <ContinueExploring navigate={navigate} links={[
              { id: "ai-ambiguity-to-action", icon: "FA", title: "Ambiguity to Action", desc: "The frameworks underneath this argument", color: C.gold },
              { id: "ai-authorship-quandary", icon: "AQ", title: "Authorship Quandary", desc: "The case-level companion piece", color: C.teal },
              { id: "ai-consciousness", icon: "MC", title: "The Consciousness Line", desc: "Caution under uncertainty", color: C.coral },
            ]} />
          </FadeIn>
        </Narrow>
      </PageContainer>
    </div>
  );
}
