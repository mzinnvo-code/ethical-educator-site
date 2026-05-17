import { C } from "../theme.js";
import {
  FadeIn,
  Expandable,
  SectionLabel,
  SectionTitle,
  Subtitle,
  Narrow,
  PageContainer,
  BodyText,
  ResearchCallout,
  QuoteBlock,
  ComparisonCard,
  Divider,
  ReadingTime,
  ContinueExploring,
  RefItem,
  EducatorsFooter,
} from "../components/shared.jsx";
import AuthorshipExperiment from "../experiments/Authorship.jsx";

const links = {
  wpOrigin: "https://ethicalaiedu.wordpress.com/2024/02/14/the-ai-authorship-quandary/",
  liangPatterns: "https://www.cell.com/patterns/fulltext/S2666-3899(23)00130-7",
  liangArxiv: "https://arxiv.org/abs/2304.02819",
  turnitinAccuracy: "https://www.turnitin.com/blog/the-launch-of-turnitins-ai-writing-detection-tool",
  vanderbiltOff: "https://www.vanderbilt.edu/brightspace/2023/08/16/guidance-on-ai-detection-and-why-were-disabling-turnitins-ai-detector/",
  nycPolicy: "https://www.schools.nyc.gov/about-us/vision-and-mission/guidance-on-artificial-intelligence",
  ohioHb96: "https://www.legislature.ohio.gov/legislation/136/hb96",
  tennesseeAi: "https://www.tn.gov/education/news/2024/3/13/department-of-education-announces-guidance-on-artificial-intelligence-use-in-tn-schools.html",
  hepi2025: "https://www.hepi.ac.uk/2025/02/26/student-generative-ai-survey-2025/",
  digitalEducationCouncil: "https://www.digitaleducationcouncil.com/post/digital-education-council-global-ai-student-survey-2024",
  coelhoBerj: "https://bera-journals.onlinelibrary.wiley.com/doi/10.1002/berj.4124",
  sparrowFlenady: "https://link.springer.com/article/10.1007/s00146-025-02195-z",
  biestaBook: "https://www.routledge.com/Beautiful-Risk-of-Education/Biesta/p/book/9781612050270",
  mlaAi: "https://style.mla.org/citing-generative-ai/",
  apaAi: "https://apastyle.apa.org/blog/how-to-cite-chatgpt",
  microsoftResearch: "https://www.microsoft.com/en-us/research/publication/the-impact-of-generative-ai-on-critical-thinking-self-reported-reductions-in-cognitive-effort-and-confidence-effects-from-a-survey-of-knowledge-workers/",
  euAiAct: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32024R1689",
};

function LinkOut({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
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

function StakeholderPressureFigure() {
  const actors = [
    { x: 130, y: 70,  color: C.teal,  label: "Student", sub: "did the learning" },
    { x: 600, y: 70,  color: C.gold,  label: "Teacher", sub: "owns the standard" },
    { x: 130, y: 280, color: C.ocean, label: "Parent",  sub: "watches the precedent" },
    { x: 600, y: 280, color: C.coral, label: "Other students", sub: "absorb the signal" },
  ];
  return (
    <FigureShell
      label="Visualization"
      title="The Same Essay, Four Conflicting Truths"
      caption="An administrator sitting at the center has to honor all four pressures. Each arrow is a reasonable demand. No two can be fully satisfied at once."
    >
      <svg viewBox="0 0 720 360" role="img" aria-label="Four stakeholders surrounding a central administrator with arrows of pressure" style={{ width: "100%", height: "auto", display: "block" }}>
        <defs>
          <marker id="pressureArrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill={C.gold} />
          </marker>
          <radialGradient id="centerGlow">
            <stop offset="0" stopColor={C.gold} stopOpacity="0.22" />
            <stop offset="1" stopColor={C.gold} stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect x="22" y="20" width="676" height="320" rx="18" fill={C.midnight} stroke={C.border} />
        <ellipse cx="360" cy="180" rx="170" ry="110" fill="url(#centerGlow)" />

        {/* Center: admin */}
        <circle cx="360" cy="180" r="44" fill={C.midnight} stroke={C.gold} strokeWidth="3" />
        <text x="360" y="176" textAnchor="middle" fill={C.textPrimary} fontSize="14" fontWeight="700" fontFamily="Source Serif 4, Georgia, serif">Admin</text>
        <text x="360" y="194" textAnchor="middle" fill={C.textMuted} fontSize="11">no policy yet</text>

        {actors.map(a => (
          <g key={a.label}>
            <circle cx={a.x} cy={a.y} r="32" fill={C.midnight} stroke={a.color} strokeWidth="3" />
            <text x={a.x} y={a.y - 50} textAnchor="middle" fill={a.color} fontSize="13" fontWeight="700">{a.label}</text>
            <text x={a.x} y={a.y + 56} textAnchor="middle" fill={C.textMuted} fontSize="11">{a.sub}</text>
            <line
              x1={a.x + (a.x < 360 ? 30 : -30)}
              y1={a.y + (a.y < 180 ? 24 : -24)}
              x2={360 + (a.x < 360 ? -46 : 46)}
              y2={180 + (a.y < 180 ? -32 : 32)}
              stroke={a.color}
              strokeWidth="3"
              strokeDasharray="6 6"
              markerEnd="url(#pressureArrow)"
              opacity="0.9"
            />
          </g>
        ))}

        <text x="246" y="156" fill={C.teal} fontSize="11" textAnchor="end">"I learned"</text>
        <text x="474" y="156" fill={C.gold} fontSize="11">"standard slipped"</text>
        <text x="246" y="216" fill={C.ocean} fontSize="11" textAnchor="end">"unfair to penalize"</text>
        <text x="474" y="216" fill={C.coral} fontSize="11">"is this allowed now?"</text>
      </svg>
    </FigureShell>
  );
}

function PolicySpectrumFigure() {
  const points = [
    { x: 92,  y: 138, label: "Prohibit", sub: "all AI is academic dishonesty", color: C.coral },
    { x: 282, y: 138, label: "Permit, undisclosed", sub: "don't ask, don't tell", color: C.gold },
    { x: 472, y: 138, label: "Permit, disclosed", sub: "use it, document it", color: C.teal },
    { x: 642, y: 138, label: "Integrate", sub: "AI is part of the assignment", color: C.ocean },
  ];
  return (
    <FigureShell
      label="Visualization"
      title="Four Postures Schools Are Actually Taking"
      caption="The case lives between 'Permit, undisclosed' (what the syllabus passively created) and 'Permit, disclosed' (what the resolution should move toward). Skipping straight to 'Integrate' without a disclosure norm collapses the difference between assisted and unassisted work."
    >
      <svg viewBox="0 0 720 240" role="img" aria-label="Four positions on a horizontal AI policy spectrum from prohibit to integrate" style={{ width: "100%", height: "auto", display: "block" }}>
        <defs>
          <linearGradient id="spectrumLine" x1="0" x2="1">
            <stop offset="0" stopColor={C.coral} />
            <stop offset="0.34" stopColor={C.gold} />
            <stop offset="0.66" stopColor={C.teal} />
            <stop offset="1" stopColor={C.ocean} />
          </linearGradient>
        </defs>
        <rect x="22" y="20" width="676" height="200" rx="18" fill={C.midnight} stroke={C.border} />
        <path d="M70 138 L670 138" stroke="url(#spectrumLine)" strokeWidth="5" strokeLinecap="round" />
        {points.map((p, i) => (
          <g key={p.label}>
            <circle cx={p.x} cy={p.y} r="14" fill={C.midnight} stroke={p.color} strokeWidth="3" />
            <circle cx={p.x} cy={p.y} r="5" fill={p.color} />
            <text x={p.x} y={p.y - 28} textAnchor="middle" fill={p.color} fontSize="13" fontWeight="700">{p.label}</text>
            <text x={p.x} y={p.y + 36} textAnchor="middle" fill={C.textMuted} fontSize="11">{p.sub}</text>
            {i === 1 && (
              <text x={p.x + 95} y={p.y + 70} textAnchor="middle" fill={C.gold} fontSize="12" fontStyle="italic">where this case lives</text>
            )}
            {i === 1 && (
              <path d={`M${p.x + 30} ${p.y + 50} Q${p.x + 60} ${p.y + 70} ${p.x + 90} ${p.y + 60}`} fill="none" stroke={C.gold} strokeWidth="1.5" strokeDasharray="4 4" />
            )}
          </g>
        ))}
        <text x="70" y="200" fill={C.textMuted} fontSize="11">strictest</text>
        <text x="670" y="200" fill={C.textMuted} fontSize="11" textAnchor="end">most permissive</text>
      </svg>
    </FigureShell>
  );
}

export default function AIAuthorship({ navigate }) {
  return (
    <div style={{ padding: "80px 0", background: C.bgAlt }}>
      <PageContainer>
        <FadeIn>
          <SectionLabel>Academic Integrity · Policy · Practice</SectionLabel>
          <SectionTitle>The AI Authorship Quandary</SectionTitle>
          <Subtitle>
            A student turns in an AI-assisted essay that demonstrates real understanding. The teacher flags it. The parent defends it. The syllabus is silent. Every person in the room is right about something, and no two of them are right about the same thing. This is what good policy is supposed to prevent — and what the absence of policy keeps producing.
          </Subtitle>
          <ReadingTime minutes={16} />
        </FadeIn>

        <Narrow>
          <FadeIn delay={0.06}>
            <BodyText>
              Imagine a school where a teacher flags an essay submitted by a student named Alex — a steady B-/C+ writer whose new piece reads like a graduate seminar paper. She has taught Alex for a semester. She knows the prose isn't his. She asks him to redo it. Then Alex's parent intervenes, arguing that the syllabus said nothing about AI, that AI assistance is standard in every adult workplace they touch, and that penalizing their child for using a tool the school never prohibited is unfair on its face.
            </BodyText>
            <BodyText>
              The administrator inherits the case. There is no policy to cite, no precedent to lean on, and a hallway full of people watching to see how it resolves. The conventional move is to call this a discipline problem. It isn't. It is a failure of institutional preparation that has happened in some form in thousands of schools since ChatGPT's public release in November 2022. The teacher is protecting something real. The parent is protecting something real. Alex is caught in between. The administrator has to do three things at once: resolve this case fairly, send a signal that doesn't accidentally become the school's de facto policy, and start the slow work of building the policy that should have existed already.
            </BodyText>
            <BodyText>
              The interesting question isn't who is right. The interesting question is what makes a piece of work <em>yours</em> — and whether the answer can survive a tool that will write a passable essay on any topic in twelve seconds.
            </BodyText>
          </FadeIn>

          <Divider label="The Scenario, From Every Angle" />

          <FadeIn delay={0.06}>
            <BodyText>
              The cleanest way to feel why this case is hard is to sit inside each person's chair. The interactive below puts you in one of the four roles — student, teacher, parent, or administrator — and walks you through the decision they actually have to make. Pick a role you don't usually occupy. The friction is the point.
            </BodyText>
          </FadeIn>

          <FadeIn delay={0.08}>
            <AuthorshipExperiment />
          </FadeIn>

          <FadeIn delay={0.06}>
            <BodyText>
              However the scenario shook out for you, notice what it did not produce: a clean answer. That isn't a flaw in the exercise. It's the structure of the problem. Three reasonable claims are colliding, the evidence available to the teacher is unreliable, and the institution that should have shaped the encounter never showed up. The rest of this piece works through each of those layers in turn.
            </BodyText>
          </FadeIn>

          <Divider label="The Tensions That Made This Hard" />

          <FadeIn delay={0.06}>
            <Expandable title="1. Three reasonable claims, all in conflict" color={C.gold} tag="Foundation" defaultOpen>
              <p>The teacher's claim is about a standard: a B-/C+ writer didn't produce graduate-level rhetoric over a weekend, and accepting the essay implicitly tells the rest of the class that the standard moved. The parent's claim is about fairness: the school never prohibited the tool, and punishing a student under a rule that didn't exist on Monday is exactly the kind of arbitrary authority parents are right to push back on. Alex's claim is about learning: the essay reflects work he genuinely did, even if the work looked like a two-hour back-and-forth with a model rather than four hours alone with a notebook.</p>
              <p style={{ marginTop: 12 }}>None of these is a bad-faith move. The teacher is enforcing a developmental promise — that the grade tracks what the student can do. The parent is enforcing a rule-of-law promise — that consequences require advance notice. The student is enforcing a learning promise — that engagement matters more than the route by which engagement happened. They are all correct, and the system gave them no way to all be correct at the same time.</p>
              <QuoteBlock
                quote="The dilemma isn't whether AI was used. It's that the school built no infrastructure for the conversation that follows."
                attribution="The article's working thesis"
                color={C.gold}
              />
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Expandable title="2. Why detection is not the answer the teacher hoped for" color={C.coral} tag="Evidence">
              <p>The teacher's instinct is to reach for the AI detector. That instinct is going to keep producing the wrong outcomes for as long as it stays the first move. The detectors do not work well enough to carry the weight people want them to carry.</p>
              <ResearchCallout
                year="2023"
                title="AI detectors are biased against non-native English writers"
                finding="Liang and colleagues tested seven widely used GPT detectors on writing samples from native and non-native English speakers. The detectors classified more than half of the non-native TOEFL essays as AI-generated while correctly identifying native-English samples almost all of the time. Simple prompt engineering reduced the bias but also reduced overall detection accuracy."
                citation="Liang, Yuksekgonul, Mao, Wu, Zou. 'GPT detectors are biased against non-native English writers.' Patterns 4(7), 2023."
                color={C.coral}
              />
              <p style={{ marginTop: 12 }}>The Stanford finding is the most important fact a teacher can know before flagging a single essay. Even in cases where AI involvement is real, a detector score is a probability, not a verdict, and the probability is calibrated against a population that doesn't match many real classrooms. Vanderbilt's Brightspace team disabled Turnitin's AI-detection feature in August 2023 for exactly this reason, citing both the false-positive rate and the absence of meaningful transparency about how scores are produced.</p>
              <Note color={C.coral}>
                A 47 percent detector score is not 47 percent certainty that a student cheated. It is closer to a thermometer that occasionally reads body temperature off a warm cup of coffee — useful as a hint, dangerous as a conclusion. Discipline built on detector scores will eventually punish a student who didn't do what the score says they did, and the school will deserve the lawsuit that follows.
              </Note>
              <p>This doesn't mean detection has no role. It means the role is "this essay deserves a closer human read," not "this essay is AI-generated and the student lied about it." The downstream conversation should be a conversation about the work, not a tribunal built on a number.</p>
              <SourceLink href={links.liangPatterns}>Liang et al., "GPT detectors are biased against non-native English writers" (Patterns, 2023)</SourceLink>
              <SourceLink href={links.vanderbiltOff}>Vanderbilt Brightspace, "Guidance on AI detection and why we're disabling Turnitin's AI detector" (August 2023)</SourceLink>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Expandable title="3. What 'authorship' has actually meant" color={C.ocean} tag="Concept">
              <p>Schools talk about authorship as if it were a binary: you wrote it or you didn't. The history of writing has never worked that way. Politicians publish books they didn't write a sentence of. Academics publish papers heavily revised by reviewers, copy editors, and labmates. Pop songs list a dozen writers in the credits. The convention in each of these domains is not "the named author did every word" but "the named author is accountable for every word."</p>
              <p style={{ marginTop: 12 }}>That distinction — production versus accountability — is the lever student-facing policy is missing. A student who runs a draft past a peer tutor, takes the tutor's structural suggestions, rewrites the introduction four times, and submits the result is the author of that essay in every meaningful sense, even though dozens of judgments were made by someone else. The tutor's contributions become part of the student's work the moment the student understands and endorses them. The same logic can apply to AI assistance, but only if there is a clear practice for endorsement.</p>
              <p style={{ marginTop: 12 }}>The MLA and APA both updated their style guides in 2023 to treat generative AI output as a citable source — not as authorship, but as a contribution that has to be named. That move treats the problem the right way around: not "did the AI write part of this?" but "is the AI's contribution disclosed so a reader can evaluate the work honestly?"</p>
              <div className="grid-2" style={{ margin: "14px 0" }}>
                <ComparisonCard title="Production" color={C.coral} items={[
                  "Who physically typed which words.",
                  "Easy to measure, hard to enforce in any rich learning environment.",
                  "Schools that treat this as the standard are policing the wrong variable.",
                ]} />
                <ComparisonCard title="Accountability" color={C.teal} items={[
                  "Who can defend the choices the work makes.",
                  "Harder to measure, easier to assess through conversation.",
                  "Closer to what professional writing has always actually meant.",
                ]} />
              </div>
              <p>If the school's bar is production, AI-assisted work is automatically suspect. If the bar is accountability, the test is whether Alex can sit across from his teacher and defend his thesis, anticipate counter-arguments, and explain why he chose this evidence rather than that. That test scales to any tool. It does not require a detector.</p>
              <SourceLink href={links.mlaAi}>MLA Style Center, "How do I cite generative AI in MLA style?" (2023)</SourceLink>
              <SourceLink href={links.apaAi}>APA Style Blog, "How to cite ChatGPT" (2023)</SourceLink>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.12}>
            <Expandable title="4. The syllabus-is-silent problem" color={C.gold} tag="Policy gap">
              <p>The parent's strongest argument is procedural: no rule, no violation. They're not wrong. A school cannot enforce a standard it never published and never trained its staff to apply consistently. The teacher's discomfort is real, but a teacher's private standard is not a policy. Treating it as one — punishing a student for failing to anticipate the teacher's unwritten line — is the kind of move that erodes trust faster than any AI controversy does.</p>
              <p style={{ marginTop: 12 }}>The harder version of this argument: the syllabus didn't say "no calculators in math class" either, but no one would defend a student who hid a graphing calculator on a no-calculator AP exam. The difference is that the calculator rule was clear at the test level, supported by long-standing professional norms, and uniformly applied. The AI situation has none of those scaffolds yet. A school that wants to defend a standard has to build the scaffold first.</p>
              <p style={{ marginTop: 12 }}>State and district policy is finally catching up, but the catch-up is uneven. Tennessee became the first state in March 2024 to require all districts to publicly post their AI use policies. Ohio's House Bill 96, signed in August 2025, mandates formal AI policies for every public district by July 1, 2026. NYC Public Schools released the most detailed U.S. district framework in March 2026 after twenty-five rounds of feedback with more than a thousand stakeholders. None of that helps the administrator sitting in this meeting today, but it changes what counts as a reasonable excuse a year from now. The window for "we haven't gotten to it" is closing.</p>
              <SourceLink href={links.tennesseeAi}>Tennessee Department of Education, AI Guidance (2024)</SourceLink>
              <SourceLink href={links.ohioHb96}>Ohio Legislature, House Bill 96 (August 2025)</SourceLink>
              <SourceLink href={links.nycPolicy}>NYC Public Schools, Guidance on Artificial Intelligence (March 2026)</SourceLink>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.06}>
            <StakeholderPressureFigure />
          </FadeIn>

          <Divider label="Frameworks That Help" />

          <FadeIn delay={0.06}>
            <Expandable title="5. Process integrity vs. product integrity" color={C.teal} tag="Framework" defaultOpen>
              <p>Most academic-integrity language was written when product was the only available evidence of process. If the essay was good, the assumption was that the work behind it was good. AI severs that assumption. A student can now produce a strong product after a thin or thick process, and the product itself doesn't tell you which one happened.</p>
              <p style={{ marginTop: 12 }}>Honest assessment after that severing has to do something the old assessment never had to do: ask about the process directly. A short oral defense, a process journal, a "show your prompts" requirement, a brief in-class follow-up question — any of these recovers the signal that the essay alone no longer carries. None of them require an AI detector. All of them produce a record the school can defend if challenged.</p>
              <Note color={C.teal}>
                The shift is not from "AI is allowed" to "AI is banned." It is from grading the product to grading the process visible behind the product. Once you make that shift, most of the Alex case dissolves: a real conversation with Alex about how he built the argument either reveals understanding or reveals the absence of it, and the grade follows what's actually there.
              </Note>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Expandable title="6. Disclosure as the minimum viable norm" color={C.gold} tag="Framework">
              <p>The simplest and most defensible rule a school can hold is this: AI use is allowed unless an assignment explicitly forbids it, and any AI use must be disclosed. The disclosure can be a short paragraph at the end of the work — what tool, for what purpose, with which prompts. It doesn't require new technology, doesn't require detection, and doesn't require the teacher to play forensic investigator. It does require a culture in which disclosure is the unremarkable default, not the confession that gets you in trouble.</p>
              <p style={{ marginTop: 12 }}>The schools getting this right are pairing the disclosure norm with two commitments. The first: students who disclose AI use honestly are evaluated on their work; they are not punished for the disclosure itself. The second: assignments where AI use would defeat the assignment's purpose are clearly marked as AI-restricted, with the reason explained ("this is a timed in-class essay because I am assessing your ability to think under pressure," not "no AI because cheating is bad"). That pairing changes the incentive structure. Concealment becomes the only path to trouble.</p>
              <QuoteBlock
                quote="Disclosure isn't the punishment for using the tool. Concealment is."
                attribution="The article's working principle"
                color={C.gold}
              />
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Expandable title="7. Biesta's three purposes applied to AI assistance" color={C.ocean} tag="Framework">
              <p>Gert Biesta's framework, which surfaces across this site (see <a href="/ai-ethics">AI Ethics</a> for the broader treatment), identifies three purposes of education: qualification (knowledge and skills), socialization (induction into shared norms), and subjectification (becoming an autonomous moral agent). AI assistance affects each purpose differently, and a single AI policy that doesn't notice the difference will mishandle most of the cases it touches.</p>
              <p style={{ marginTop: 12 }}>For qualification — discrete competencies, factual recall, technical skill — AI assistance is often genuinely useful and often genuinely indistinguishable from older forms of help. A student using AI to understand a math concept is doing what a good tutor would otherwise do. Restricting AI here trades a small integrity gain for a real learning loss.</p>
              <p style={{ marginTop: 12 }}>For socialization — learning how to participate in a discipline, how a historian argues, how a scientist defends a claim — AI assistance is more ambiguous. The student who only ever reads AI summaries of original sources is not being inducted into the discipline; they are being inducted into a derivative of it. The remedy is not to ban the AI but to design assignments where the underlying engagement is visible.</p>
              <p style={{ marginTop: 12 }}>For subjectification — becoming the kind of person who can think independently, hold a position under pressure, and revise it honestly — AI assistance is the most fraught. Coelho and colleagues, writing in the British Educational Research Journal in 2025, named the danger as a "placebo effect" (the appearance of independent thought without the actual development of it) paired with a "nocebo effect" (the student's retreat from the demanding work of becoming a thinker because the offload feels safe). The Authorship case sits closest to subjectification — what's at stake is Alex's development as an autonomous reasoner, not just whether the essay is good.</p>
              <ResearchCallout
                year="2025"
                title="Generative AI in schools: placebo and nocebo effects"
                finding="Coelho and coauthors argue that AI-assisted student work can produce the appearance of subjectification without the actual development of it, while simultaneously discouraging students from the slower work of becoming autonomous thinkers. The implication for policy is that uniform AI rules will mishandle the purposes of education unevenly."
                citation="Coelho et al., British Educational Research Journal, 2025"
                color={C.ocean}
              />
              <SourceLink href={links.coelhoBerj}>Coelho et al., British Educational Research Journal (2025)</SourceLink>
              <SourceLink href={links.biestaBook}>Gert Biesta, The Beautiful Risk of Education (Routledge, 2014)</SourceLink>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.12}>
            <Expandable title="8. The traffic-light approach: where this case lands" color={C.coral} tag="Policy">
              <p>NYC's framework (covered in more depth on <a href="/ai-ethics">AI Ethics</a>) sorts uses into three buckets: red (prohibited), yellow (conditional, requires active educator judgment and training), and green (approved, with normal data-privacy review). The framework is built around the idea that an AI rule has to be a rule about specific use cases, not a slogan about AI in general.</p>
              <p style={{ marginTop: 12 }}>Alex's essay sits squarely in yellow. The assignment isn't AI-restricted on its face — it's a take-home literary analysis, which is a category where AI assistance is plausible and not automatically corrosive. The teacher's role under a yellow regime is exactly what the teacher in this case wants to do: read the work, talk to the student, and use her professional judgment about whether the engagement was real. The mistake the case reveals is not the teacher's instinct. It's that the school sent the teacher into the meeting without the policy that would have made her judgment defensible.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10, margin: "16px 0" }}>
                <ComparisonCard title="🔴 Red" color={C.coral} items={[
                  "Timed, proctored writing assessments",
                  "Work where the explicit purpose is testing independent recall or reasoning",
                  "Anything where AI use would make the assessment meaningless",
                ]} />
                <ComparisonCard title="🟡 Yellow" color={C.gold} items={[
                  "Take-home analytical essays",
                  "Multi-week projects",
                  "Most homework where AI use is plausible and disclosure is the safeguard",
                ]} />
                <ComparisonCard title="🟢 Green" color={C.teal} items={[
                  "Brainstorming, outlining, idea generation",
                  "Translation and accessibility support",
                  "Practice problems, study guides, formative feedback",
                ]} />
              </div>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.06}>
            <PolicySpectrumFigure />
          </FadeIn>

          <Divider label="What Good Policy Looks Like" />

          <FadeIn delay={0.06}>
            <Expandable title="9. The five questions a school AI policy has to answer" color={C.gold} tag="Practice" defaultOpen>
              <p>A workable AI policy doesn't need to be long. It needs to answer five questions in language a sixteen-year-old can read and a parent can quote back at you. Most of the trouble in cases like Alex's traces to a policy that punts on one of these.</p>
              <StepList items={[
                { title: "What counts as 'AI use' here?", text: "Distinguish brainstorming and feedback from drafting and rewriting. A student needs to know what they're disclosing.", color: C.teal },
                { title: "Where is AI use permitted by default, and where is it explicitly restricted?", text: "Name categories of assignment, not categories of student. The default position has to be in the policy itself, not in a teacher's head.", color: C.gold },
                { title: "How does a student disclose AI use?", text: "One standard format the whole school uses. A short footnote, a brief note in the submission portal, a process journal — pick one and stick with it.", color: C.ocean },
                { title: "What happens when AI use is disclosed?", text: "The honest answer must be 'the work is evaluated normally.' If disclosure carries an academic penalty, no one will disclose.", color: C.coral },
                { title: "What happens when AI use is concealed?", text: "The honest answer must include how the school will determine concealment, what the consequences are, and who can appeal. This is where AI detectors belong: as one input among several, never as the verdict.", color: C.textPrimary },
              ]} />
              <p>A policy that answers these five questions in clear language defuses ninety percent of the Alex cases before they happen. Teachers know what to flag and how to handle it. Students know what they're being held to. Parents have something to read instead of something to argue about.</p>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Expandable title="10. Why retroactive enforcement fails" color={C.coral} tag="Practice">
              <p>The single move most likely to make the Alex situation worse is also the one administrators are most tempted to make: apply a new rule to the case in front of them. The temptation is understandable. The case is the reason the rule is needed. Punishing this case under the rule that this case inspired feels like justice. It isn't.</p>
              <p style={{ marginTop: 12 }}>Retroactive enforcement tells every other student in the building that the rules of the game are whatever the school decides they are after the fact. It guarantees a legal challenge and, more importantly, a culture in which families stop trusting the institution to behave predictably. The right move on the case is the move that the existing (absent) rule allows: resolve it through conversation, document the resolution, and use the case explicitly as the trigger for policy work whose results will apply to the next student, not this one.</p>
              <Note color={C.coral}>
                Treating a case as a precedent and treating it as a punishment are different things. The first builds the institution. The second damages it.
              </Note>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Expandable title="11. Teaching disclosure, not policing concealment" color={C.teal} tag="Practice">
              <p>The schools handling AI well are quietly making a pedagogical shift that the policy conversation hasn't quite caught up to. They are teaching disclosure as a writing skill — part of how a student learns to be honest about how their work came to be — rather than as a confession mechanism. The disclosure paragraph at the end of an essay becomes a place to think about process. Students start naming where they got stuck, what they asked the AI, what the AI suggested, what they kept, what they rejected.</p>
              <p style={{ marginTop: 12 }}>This is closer to how professional knowledge work actually operates. A scientist writes a methods section. A journalist names their sources. A historian footnotes the archive. The disclosure paragraph is the student-writing analog of all those moves, adapted to the tool that's now in the room. Treating it as a skill rather than a punishment is the bet that the long-run interest is in honest writers, not catchable cheaters.</p>
              <ResearchCallout
                year="2025"
                title="Productivity gains from generative AI are not learning gains"
                finding="A Microsoft Research survey of knowledge workers using generative AI found self-reported reductions in cognitive effort and confidence in independent task performance. The finding's educational analog: producing better work with AI is not the same as becoming a better thinker through the use of AI, and policy that conflates the two will reliably undershoot on subjectification."
                citation="Microsoft Research (2025), Survey of knowledge workers"
                color={C.teal}
              />
              <p style={{ marginTop: 12 }}>The policy point isn't that AI is bad for thinking. It's that schools have to design for the version of AI use that builds independent capability and against the version that quietly replaces it. Disclosure is the cheapest, most repeatable mechanism we have for telling those two versions apart.</p>
              <SourceLink href={links.microsoftResearch}>Microsoft Research, "The Impact of Generative AI on Critical Thinking" (2025)</SourceLink>
            </Expandable>
          </FadeIn>

          <Divider label="The Position" />

          <FadeIn delay={0.06}>
            <Expandable title="12. Where this leaves the administrator" color={C.gold} tag="Conclusion" defaultOpen>
              <p>My position on the Alex case, after walking through it from every chair:</p>
              <StepList items={[
                { title: "Resolve the immediate case through conversation, not punishment.", text: "A short oral defense or a brief in-class follow-up surfaces whether Alex can hold the argument. If he can, the grade reflects that. If he can't, the grade reflects that too. Either way, no detector score does the work.", color: C.teal },
                { title: "Acknowledge the policy gap publicly.", text: "The teacher was right to flag. The parent was right that no rule existed. The administrator owns the gap and says so. Authority survives the admission. It does not survive the pretense that the gap wasn't there.", color: C.gold },
                { title: "Begin the policy work immediately, with the case as the brief.", text: "The five questions above are the agenda. Involve teachers, students, and families. Publish a draft in weeks, not months. Cases keep happening while you draft.", color: C.ocean },
                { title: "Treat disclosure as the default norm during the interim.", text: "Communicate it widely. Pair it with the commitment that disclosure is not the punishment. Build the culture you'll need to make the eventual policy work.", color: C.coral },
              ]} />
              <p>None of this dissolves the underlying tension. Some students will use AI in ways that the school, on reflection, decides it doesn't want to permit. Some assignments will need to be redesigned because AI assistance does corrode them. Some parents will keep arguing that the school is overreaching. The work doesn't end. But the work changes character — from a series of one-off discipline cases handled inconsistently by exhausted teachers, to an institution that has decided what it stands for and built the scaffolding to hold the line.</p>
              <p style={{ marginTop: 12 }}>The Authorship Quandary is not really about Alex. It is about whether the school is willing to do the slow institutional work that makes Alex's case rare instead of typical. The answer, in most schools, is currently no. The cost of that no is being paid in classrooms every day.</p>
            </Expandable>
          </FadeIn>

          <Divider label="References" />

          <FadeIn delay={0.06}>
            <Expandable title="Verified sources used in this article" color={C.ocean} tag="Sources">
              <RefItem><LinkOut href={links.wpOrigin}>Matthew A. Zinn. "The AI Authorship Quandary." The Ethical Educator, February 14, 2024. (Original publication; this article is the expanded internal treatment.)</LinkOut></RefItem>
              <RefItem><LinkOut href={links.liangPatterns}>Weixin Liang, Mert Yuksekgonul, Yining Mao, Eric Wu, James Zou. "GPT detectors are biased against non-native English writers." Patterns 4(7), July 2023. DOI: 10.1016/j.patter.2023.100779.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.vanderbiltOff}>Vanderbilt University Brightspace. "Guidance on AI Detection and Why We're Disabling Turnitin's AI Detector." August 16, 2023.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.nycPolicy}>New York City Public Schools. "Guidance on Artificial Intelligence." Released March 24, 2026.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.tennesseeAi}>Tennessee Department of Education. "Department of Education Announces Guidance on Artificial Intelligence Use in TN Schools." March 13, 2024.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.ohioHb96}>Ohio General Assembly. House Bill 96, signed August 2025. Mandates formal AI policies for every public district by July 1, 2026.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.hepi2025}>Higher Education Policy Institute. "Student Generative AI Survey 2025." Reports 92% of UK undergraduates using AI tools, up from 66% in 2024.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.digitalEducationCouncil}>Digital Education Council. "Global AI Student Survey 2024." Reports 86% of students globally using AI in their studies.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.coelhoBerj}>Coelho et al. "Generative AI in schools: placebo and nocebo effects on subjectification." British Educational Research Journal, 2025.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.sparrowFlenady}>Robert Sparrow and Gavin Flenady. "Bullshit Universities: The Future of Automated Education." AI & Society 40, 2025, 5285–5296.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.biestaBook}>Gert Biesta. The Beautiful Risk of Education. Routledge, 2014. Source of the qualification–socialization–subjectification framework.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.mlaAi}>MLA Style Center. "How do I cite generative AI in MLA style?" Modern Language Association, 2023.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.apaAi}>APA Style Blog. "How to cite ChatGPT." American Psychological Association, 2023.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.microsoftResearch}>Microsoft Research. "The Impact of Generative AI on Critical Thinking: Self-Reported Reductions in Cognitive Effort and Confidence." Knowledge worker survey, 2025.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.euAiAct}>European Union. Regulation (EU) 2024/1689 (the AI Act). In force August 1, 2024. Classifies education as a high-risk domain under Annex III.</LinkOut></RefItem>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.08}>
            <EducatorsFooter
              navigate={navigate}
              takeaways={[
                "An AI detection score is a hint, not a verdict. Liang et al. (2023) found detectors misclassify more than half of non-native English writing as AI-generated. Discipline built on detector output will eventually punish a student who didn't do what the score says.",
                "The question that scales is not 'did the student use AI?' but 'can the student defend the work?' A short oral follow-up recovers the signal the essay alone can't carry.",
                "Disclosure is the cheapest, most enforceable norm a school can adopt. Make it the default, protect students who disclose honestly, and concealment becomes the only path to trouble.",
                "Don't punish the case that inspired the rule. Resolve through conversation, document the gap publicly, and let the new policy apply forward.",
                "A workable AI policy answers five questions in plain language: what counts as AI use, where it's allowed, how to disclose it, what happens when it's disclosed, and what happens when it's concealed.",
              ]}
              classroomActivities={[
                {
                  title: "Run the four-role exercise with your staff",
                  time: "45 min",
                  description: "Have colleagues work the embedded scenario above from a role they don't normally occupy. The teacher takes the parent's chair. The administrator takes the student's. Reconvene and compare which option felt obvious in each role, and which felt impossible.",
                  prompt: "Where did your sense of 'the right answer' move when you switched roles, and what does that movement tell you about your school's blind spots?",
                },
                {
                  title: "Draft your school's disclosure paragraph",
                  time: "60 min",
                  description: "With teachers across two or three departments, write the actual paragraph you would ask every student to attach to AI-assisted work. Keep it under 100 words. Test it on a current assignment. Notice what it surfaces that the assignment alone didn't.",
                  prompt: "If a student were to fill this paragraph out honestly, what would you actually do with the information? If the answer is 'nothing,' the paragraph isn't doing the work.",
                },
                {
                  title: "Audit five recent assignments for the red/yellow/green bucket",
                  time: "30 min",
                  description: "Pull five graded assignments from the last unit. For each one, decide whether the assignment is red (AI use would defeat the purpose), yellow (use plausible, disclosure required), or green (use encouraged). Notice which assignments resist the sorting and why.",
                  prompt: "If you can't say which bucket the assignment lives in, what does the assignment actually measure?",
                },
              ]}
              whereToGoNext={{
                internal: [
                  { id: "ai-ethics", label: "AI Ethics in Education", blurb: "The broader policy and frameworks context — Biesta, NYC, EU AI Act, the is/ought problem." },
                  { id: "ai-consciousness", label: "The Consciousness Line", blurb: "What's at stake when we recognize a mind. Companion piece on philosophical caution under uncertainty." },
                  { id: "thought-experiments", label: "More Thought Experiments", blurb: "The Shortcut, Digital Doppelgänger, Reluctant Educator — adjacent scenarios for staff PD." },
                  { id: "phil-education", label: "Philosophy in K–12 Education", blurb: "Why teaching reasoning explicitly matters more, not less, in the AI era." },
                ],
                external: [
                  { href: links.liangPatterns, label: "Liang et al. on detector bias (Patterns, 2023)", blurb: "The Stanford paper every teacher should read before flagging another essay." },
                  { href: links.nycPolicy, label: "NYC Schools AI Guidance (March 2026)", blurb: "The most detailed U.S. district framework. Worth reading even if you're not in NYC." },
                  { href: links.coelhoBerj, label: "Coelho et al. on placebo and nocebo effects (BERJ, 2025)", blurb: "The strongest current argument for why uniform AI rules will fail unevenly." },
                ],
              }}
            />
          </FadeIn>

          <FadeIn delay={0.1}>
            <ContinueExploring navigate={navigate} links={[
              { id: "ai-ethics", icon: "AI", title: "AI Ethics", desc: "Policy, philosophy, and frameworks", color: C.gold },
              { id: "ai-consciousness", icon: "MC", title: "The Consciousness Line", desc: "Moral caution under uncertainty", color: C.teal },
              { id: "thought-experiments", icon: "TE", title: "Thought Experiments", desc: "Practice ethical reasoning", color: C.coral },
            ]} />
          </FadeIn>
        </Narrow>
      </PageContainer>
    </div>
  );
}
