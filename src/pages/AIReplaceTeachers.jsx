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
  VideoEmbed,
  EducatorsFooter,
  ImagePageHeader,
} from "../components/shared.jsx";
import DoppelgangerExperiment from "../experiments/Doppelganger.jsx";
import { AI_ETHICS_ARTICLE_BY_ROUTE } from "../data/aiEthicsVisuals.js";

const articleVisual = AI_ETHICS_ARTICLE_BY_ROUTE["ai-replace-teachers"];

const links = {
  wpOrigin: "https://ethicalaiedu.wordpress.com/2024/02/14/response-to-why-ai-wont-replace-teachers/",
  sourceVideo: "https://www.youtube.com/watch?v=dH1OBxYjUm0",
  sparrowFlenady: "https://link.springer.com/article/10.1007/s00146-025-02195-z",
  biestaBook: "https://www.routledge.com/Beautiful-Risk-of-Education/Biesta/p/book/9781612050270",
  coelhoBerj: "https://bera-journals.onlinelibrary.wiley.com/doi/10.1002/berj.4124",
  unescoFuture: "https://unesdoc.unesco.org/ark:/48223/pf0000395373",
  vallor: "https://www.shannonvallor.net/books.html",
  microsoftResearch: "https://www.microsoft.com/en-us/research/publication/the-impact-of-generative-ai-on-critical-thinking-self-reported-reductions-in-cognitive-effort-and-confidence-effects-from-a-survey-of-knowledge-workers/",
  hepi2025: "https://www.hepi.ac.uk/2025/02/26/student-generative-ai-survey-2025/",
  euAiAct: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32024R1689",
  butlin: "https://arxiv.org/abs/2308.08708",
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

function CapabilityRetreatFigure() {
  const stages = [
    { y: 76, label: "1980s: \"computers can't write\"", overrun: "ChatGPT, 2022" },
    { y: 124, label: "2010s: \"computers can't be creative\"", overrun: "music, image, video, 2023-24" },
    { y: 172, label: "2020s: \"AI can't really understand\"", overrun: "extended dialogue + reasoning, 2024-25" },
    { y: 220, label: "Now: \"AI can't really empathize\"", overrun: "companion systems, ongoing" },
    { y: 268, label: "Next: \"AI can't really be present\"", overrun: "pending" },
  ];
  return (
    <FigureShell
      label="Visualization"
      title="The Capability Argument Has a Predictable Shape"
      caption="Each defended line is replaced when the technology catches up. The defenders keep losing because they keep agreeing to play the capability game. A different argument is needed."
    >
      <svg viewBox="0 0 720 320" role="img" aria-label="A timeline showing capability claims being overrun" style={{ width: "100%", height: "auto", display: "block" }}>
        <rect x="22" y="20" width="676" height="280" rx="18" fill={C.midnight} stroke={C.border} />
        <text x="360" y="46" textAnchor="middle" fill={C.gold} fontSize="13" fontWeight="700">Each defended capability has fallen, on average, faster than the previous one</text>
        {stages.map((s, i) => (
          <g key={s.label}>
            <rect x="60" y={s.y - 14} width="340" height="32" rx="6" fill={`${C.coral}12`} stroke={`${C.coral}40`} />
            <text x="76" y={s.y + 5} fill={C.textPrimary} fontSize="12" fontWeight="600">{s.label}</text>
            <path d={`M408 ${s.y + 2} L448 ${s.y + 2}`} stroke={`${C.gold}`} strokeWidth="2" />
            <path d={`M448 ${s.y + 2} L438 ${s.y - 4} M448 ${s.y + 2} L438 ${s.y + 8}`} stroke={C.gold} strokeWidth="2" fill="none" />
            <rect x="456" y={s.y - 14} width="200" height="32" rx="6" fill={`${C.teal}12`} stroke={`${C.teal}40`} />
            <text x="472" y={s.y + 5} fill={C.textSecondary} fontSize="12">{s.overrun}</text>
          </g>
        ))}
      </svg>
    </FigureShell>
  );
}

function IsOughtPivotFigure() {
  return (
    <FigureShell
      label="Visualization"
      title="The Argument That Survives the Next Iteration"
      caption="The defensible argument doesn't depend on what AI can or cannot do. It depends on what schools are for, and what a society is willing to defend in public."
    >
      <svg viewBox="0 0 720 280" role="img" aria-label="A pivot from capability claims to values claims" style={{ width: "100%", height: "auto", display: "block" }}>
        <rect x="22" y="20" width="676" height="240" rx="18" fill={C.midnight} stroke={C.border} />

        {/* Capability path - dies */}
        <g>
          <rect x="60" y="60" width="240" height="60" rx="10" fill={`${C.coral}14`} stroke={`${C.coral}66`} />
          <text x="180" y="82" textAnchor="middle" fill={C.coral} fontSize="13" fontWeight="700">Capability claim</text>
          <text x="180" y="102" textAnchor="middle" fill={C.textMuted} fontSize="11">"AI cannot do X."</text>
          <path d="M180 132 L180 168" stroke={C.coral} strokeWidth="2" strokeDasharray="4 4" />
          <rect x="60" y="172" width="240" height="60" rx="10" fill={`${C.coral}08`} stroke={`${C.coral}30`} />
          <text x="180" y="194" textAnchor="middle" fill={C.textMuted} fontSize="13" fontWeight="600">Overrun within 18 months</text>
          <text x="180" y="212" textAnchor="middle" fill={C.textMuted} fontSize="11">retreat to a new capability line</text>
        </g>

        {/* Values path - survives */}
        <g>
          <rect x="420" y="60" width="240" height="60" rx="10" fill={`${C.teal}14`} stroke={`${C.teal}66`} />
          <text x="540" y="82" textAnchor="middle" fill={C.teal} fontSize="13" fontWeight="700">Values claim</text>
          <text x="540" y="102" textAnchor="middle" fill={C.textMuted} fontSize="11">"Even if AI can do X, doing X this way is not the same act."</text>
          <path d="M540 132 L540 168" stroke={C.teal} strokeWidth="3" />
          <path d="M540 168 L530 158 M540 168 L550 158" stroke={C.teal} strokeWidth="3" fill="none" />
          <rect x="420" y="172" width="240" height="60" rx="10" fill={`${C.teal}08`} stroke={`${C.teal}40`} />
          <text x="540" y="194" textAnchor="middle" fill={C.teal} fontSize="13" fontWeight="600">Independent of the next model</text>
          <text x="540" y="212" textAnchor="middle" fill={C.textMuted} fontSize="11">survives technological change</text>
        </g>

        {/* divider */}
        <path d="M360 50 L360 240" stroke={`${C.gold}30`} strokeWidth="1" strokeDasharray="6 8" />
      </svg>
    </FigureShell>
  );
}

export default function AIReplaceTeachers({ navigate }) {
  return (
    <div style={{ padding: "80px 0", background: C.bgAlt }}>
      <PageContainer>
        <ImagePageHeader
          label="Response · Philosophy of Mind · Education"
          title="Why AI Won't Replace Teachers — A Response"
          subtitle="A friendly disagreement with a popular video. The conclusion (teachers shouldn't be replaced) is right. The argument (AI can't do what teachers do) is the wrong way to defend it — and is going to keep losing. Here's the argument that actually survives the next iteration of the technology."
          minutes={15}
          image={articleVisual.image}
          imageAlt={articleVisual.imageAlt}
          accent={articleVisual.accent}
        />

        <Narrow>
          <FadeIn delay={0.05}>
            <VideoEmbed id="dH1OBxYjUm0" title="Why AI Won't Replace Teachers (source video)" />
            <p style={{ fontSize: "0.82rem", color: C.textMuted, marginTop: 6 }}>
              The video this piece responds to. Worth watching first — it makes the standard case, which is also the case I think we should stop making.
            </p>
          </FadeIn>

          <FadeIn delay={0.08}>
            <BodyText>
              I want to start where every honest response should: on the part the source video gets right. AI should not replace teachers. The conclusion is correct. I would defend it. I would defend it harder than the video does, in fact, because the way the video defends it is going to keep losing.
            </BodyText>
            <BodyText>
              The argument in the video runs on capability claims. AI is only adaptive, not really personalized. AI cannot really collaborate, only simulate it. AI cannot really build relationships, only mimic them. AI cannot really care. Each of these claims has, even since the video was filmed, become less true. Some of them have become a lot less true. The capability gap that felt obvious in 2024 has narrowed in 2025, and there is no available reason to think the trend reverses in 2026.
            </BodyText>
            <BodyText>
              This matters not because the conclusion is wrong but because the argument for it is wearing out. If we keep grounding our defense of human teachers in claims about what AI cannot do, we will lose the defense one capability at a time. The defense that survives is a different shape. It does not say AI cannot teach. It says, with Hume, that even if it can, that does not yet tell us whether it should.
            </BodyText>
          </FadeIn>

          <Divider label="Where the Source Argument Goes Wrong" />

          <FadeIn delay={0.06}>
            <Expandable title="1. The 'adaptive vs personalized' distinction is shrinking" color={C.coral} tag="Pushback" defaultOpen>
              <p>The video draws a clean line between adaptive learning (the machine adjusts based on what the student does) and personalized learning (a human tailors instruction to who the student is). It places AI firmly on the adaptive side and reserves the personalized side for human teachers. In 2024, that line had real weight. In 2025, after a year of LLM-based tutoring systems doing long-form dialogue with students, taking conversational history into account, and modifying their approach across multiple sessions, the line is less stable than it looks.</p>
              <p style={{ marginTop: 12 }}>This is not the AI industry's marketing. It is what the systems do. Whether or not the personalization the AI delivers is the same kind of thing as the personalization a human teacher delivers is a real question. But declaring by definition that one is real and the other is not is a category move, not an empirical one — and the empirical one keeps eroding.</p>
              <Note color={C.coral}>
                Pre-emptively defining terms so that AI cannot possibly satisfy them is a rhetorical move, not an argument. It works until someone notices.
              </Note>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.06}>
            <CapabilityRetreatFigure />
          </FadeIn>

          <FadeIn delay={0.08}>
            <Expandable title="2. The 'AI can't be creative/empathic/collaborative' line is a retreat" color={C.gold} tag="Pattern">
              <p>The list of things AI was supposed to never do well is, at this point, embarrassing. Writing fluent prose. Generating coherent images. Composing music. Producing video. Sustaining a multi-turn conversation that adapts to the user's emotional state. Marvel's 2023 <em>Secret Invasion</em> opened with AI-generated title sequences. Spotify's discovery and recommendation engines have shaped a generation's listening. Voice clones are good enough that family members can be impersonated convincingly. The "AI can't be creative" line has fallen. The "AI can't simulate empathy" line is in active retreat.</p>
              <p style={{ marginTop: 12 }}>None of this is an argument that the simulation is the same as the thing simulated. The argument that the simulation is missing something important is real and defensible. But "AI cannot do this" is not the form of that argument. The form that survives is "AI doing this is a different kind of act with different consequences." Same conclusion. Different and durable defense.</p>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Expandable title="3. Predictions about AI's ceiling have aged badly" color={C.ocean} tag="Track record">
              <p>The track record of "AI will never X" predictions is worse than the track record of "AI will be doing X by year Y" predictions, and both are worse than chance. Three months before ChatGPT's public release in November 2022, the dominant industry consensus was that long-form text generation that didn't hallucinate basic facts was at least five years away. Two years later, ~92% of UK undergraduates were using it daily. By the Digital Education Council's 2024 global survey, the figure for students globally was 86%.</p>
              <p style={{ marginTop: 12 }}>This is not a sample size of one. Each major capability claim about AI has fallen on a faster timeline than the previous one. The base rate for "AI cannot do this educational thing" arguments aging well is, by now, embarrassingly low. The defenders of human teachers do not need to be on the wrong side of this base rate.</p>
              <SourceLink href={links.hepi2025}>HEPI, "Student Generative AI Survey 2025"</SourceLink>
            </Expandable>
          </FadeIn>

          <Divider label="The Argument That Actually Survives" />

          <FadeIn delay={0.06}>
            <IsOughtPivotFigure />
          </FadeIn>

          <FadeIn delay={0.06}>
            <Expandable title="4. The is/ought distinction, applied here" color={C.teal} tag="Foundation" defaultOpen>
              <p>Hume's old observation: facts about what something can do do not, on their own, tell us anything about what it should do. AI <em>is</em> capable of producing fluent personalized instruction; whether it <em>ought</em> to be used to replace teachers is a separate question, requiring different tools to answer, and grounded in different premises. The defenders of human teachers have been trying to settle the ought question by winning the is question. That strategy has been losing for two decades and it is going to keep losing.</p>
              <p style={{ marginTop: 12 }}>The argument that holds: we should not replace teachers with AI, even if AI can do what teachers do, because (1) the thing AI would be doing is not the same thing teachers are doing, (2) the substitution erodes capacities that the institution exists to build, and (3) we collectively value the original act for reasons that outlast the technology. None of those claims depends on AI being limited. All three survive the next capability jump.</p>
              <SourceLink href={links.sparrowFlenady}>Sparrow & Flenady, "Bullshit Universities" (AI & Society 40, 2025)</SourceLink>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Expandable title="5. What teachers actually do that the substitution misses" color={C.gold} tag="Substance">
              <p>Biesta's three purposes — qualification, socialization, subjectification — give a workable map of what teachers actually do beyond the instructional layer. AI is well-positioned for qualification (skills, knowledge, technical fluency). It is ambiguous for socialization (induction into communities of practice). It is missing the central capability for subjectification (the formation of an autonomous moral agent through sustained presence with someone whose own moral life is unfinished).</p>
              <p style={{ marginTop: 12 }}>Coelho et al. (2025, <em>British Educational Research Journal</em>) sharpened this for AI specifically: the appearance of subjectification can be produced without the underlying work, and the appearance can crowd out the work it pretends to be evidence of. They called this the placebo paired with a nocebo — the simulation feeling enough like the real thing that the student stops doing the real thing.</p>
              <p style={{ marginTop: 12 }}>This is the substantive claim that survives. The substitution would be a substitution of qualification (which the machine can do) for the bundle (which is what teachers were doing). The trade looks even on the surface metric and is uneven on the metrics the institution is actually trying to serve.</p>
              <ResearchCallout
                year="2025"
                title="Placebo and nocebo effects of AI on subjectification"
                finding="Coelho et al. argued that AI-mediated student work can produce the appearance of independent intellectual development without the underlying habit formation, and that students subsequently retreat from the slower work of becoming autonomous thinkers. The substitution is not visible on standard outcome measures."
                citation="Coelho et al., BERJ, 2025"
                color={C.gold}
              />
              <SourceLink href={links.coelhoBerj}>Coelho et al., BERJ (2025)</SourceLink>
              <SourceLink href={links.biestaBook}>Gert Biesta, The Beautiful Risk of Education (2014)</SourceLink>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Expandable title="6. Why hubris is the wrong charge to defend against" color={C.coral} tag="Honesty">
              <p>One thread in the source video worth taking seriously: when humans defend their own irreplaceability, the defense often carries an echo of species-level pride. We want to believe there is something about us that the machine cannot touch. The history of that belief is unimpressive. Each capability we have considered uniquely human has, eventually, been at least approximated. The list of human-exclusive capabilities now is shorter than it was a generation ago. There is no available evidence that this trend stops.</p>
              <p style={{ marginTop: 12 }}>I am willing to concede the hubris point in full. The defenders of human teachers should not be in the business of claiming the machine will never approach what we do. That bet has paid off badly for too long. The better stance is the one Anil Seth takes on consciousness and the one this piece tries to take here: agnosticism about future capability, paired with a commitment to the practical ethics that hold regardless of how the capability question resolves. We do not have to claim the machine cannot teach to argue that schools should not delegate the teaching to it.</p>
            </Expandable>
          </FadeIn>

          <Divider label="The Doppelgänger Question" />

          <FadeIn delay={0.06}>
            <Expandable title="7. The interactive scenario: The Digital Doppelgänger" color={C.ocean} tag="Thought experiment" defaultOpen>
              <p>The thought experiment below pushes the substitution argument to a sharper edge. What if a student deployed a sufficiently capable AI proxy to attend their classes, ask their questions, and pass their assessments? On every outcome measure the school cares about, the student has been educated. The thought experiment is not asking whether this is currently possible. It is asking what we would say if it were.</p>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.08}>
            <DoppelgangerExperiment />
          </FadeIn>

          <FadeIn delay={0.06}>
            <BodyText>
              The reason this scenario is uncomfortable is that the discomfort isn't reducible to a capability claim. The student in the scenario got the qualification. The AI passed the tests. The friction is somewhere else — in the substitution of what was supposed to happen to the student for a measurement of what was supposed to come out the other end. The same friction, in a slightly less concentrated form, is what the wider AI-replacing-teachers conversation is about.
            </BodyText>
          </FadeIn>

          <Divider label="The Pressure That Isn't Philosophical" />

          <FadeIn delay={0.06}>
            <Expandable title="8. The argument from money" color={C.coral} tag="Reality check">
              <p>Sparrow and Flenady (2025) make a point that the philosophical literature on AI in education usually understates. Even if the normative argument against teacher replacement is correct, the economic argument for it is likely to win in many schools anyway. AI is, per student, much cheaper than a teacher. The savings compound. The political pressure to realize them is real. "Money talks," they write — and it tends to talk last.</p>
              <p style={{ marginTop: 12 }}>This is the strongest reason to make the values argument explicit, in writing, before the budget conversation arrives. A school that has documented what it is preserving, why, and what it is willing to give up to preserve it has a place to stand when the substitution conversation gets serious. A school that has only made the capability argument has nothing to fall back on once the capability argument loses.</p>
              <SourceLink href={links.sparrowFlenady}>Sparrow & Flenady (2025)</SourceLink>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Expandable title="9. What a defensible position looks like in practice" color={C.gold} tag="Conclusion">
              <p>Here is the shape of the argument I would actually want a school to be able to make:</p>
              <StepList items={[
                { title: "Concede the capability arguments", text: "Stop investing rhetorical energy in 'AI can't really do X.' Those claims keep losing. The argument that holds doesn't depend on the machine being limited.", color: C.teal },
                { title: "Use AI where it serves qualification", text: "Personalization, practice problems, fast feedback on rule-bound work, scaffolding. The gains here are real. Capture them.", color: C.gold },
                { title: "Protect what AI cannot substitute for without changing the meaning of the act", text: "The presence of a human whose own moral life is unfinished, in a room with young people whose moral lives are even more so. The shared experience of being part of a particular community. The lateral connections among students that one-on-one tutoring quietly erases.", color: C.ocean },
                { title: "Name the values, not the limits", text: "A school's defensible argument is about what schools are for, not about what machines cannot do. Frame it that way and the argument outlives the technology that is currently prompting it.", color: C.coral },
              ]} />
              <p style={{ marginTop: 12 }}>I agree with the source video's conclusion. I think we should defend it differently. The argument I have laid out here is harder to make. It does not produce a triumphant moment where the audience can feel that AI has been put back in its place. It produces something quieter: a community that has decided what it is for, and has documented the decision well enough that the next budget cycle does not silently undo it.</p>
            </Expandable>
          </FadeIn>

          <Divider label="References" />

          <FadeIn delay={0.06}>
            <Expandable title="Verified sources used in this article" color={C.ocean} tag="Sources">
              <RefItem><LinkOut href={links.wpOrigin}>Matthew A. Zinn. "Response to Why AI Won't Replace Teachers." The Ethical Educator, February 14, 2024. (Original publication; this article is the expanded internal treatment.)</LinkOut></RefItem>
              <RefItem><LinkOut href={links.sourceVideo}>Source video being responded to. YouTube ID dH1OBxYjUm0.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.sparrowFlenady}>Robert Sparrow and Gavin Flenady. "Bullshit Universities: The Future of Automated Education." AI & Society 40, 2025, 5285–5296.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.biestaBook}>Gert Biesta. The Beautiful Risk of Education. Routledge, 2014.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.coelhoBerj}>Coelho et al. "Generative AI in schools: placebo and nocebo effects on subjectification." British Educational Research Journal, 2025.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.unescoFuture}>UNESCO. "AI and the Future of Education: Disruptions, Dilemmas and Directions." September 2025. UNESDOC: ark:/48223/pf0000395373.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.vallor}>Shannon Vallor. The AI Mirror. Oxford University Press, 2024.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.hepi2025}>Higher Education Policy Institute. "Student Generative AI Survey 2025."</LinkOut></RefItem>
              <RefItem><LinkOut href={links.microsoftResearch}>Microsoft Research. "The Impact of Generative AI on Critical Thinking" (2025).</LinkOut></RefItem>
              <RefItem><LinkOut href={links.butlin}>Patrick Butlin et al. "Consciousness in Artificial Intelligence: Insights from the Science of Consciousness." arXiv:2308.08708, 2023.</LinkOut></RefItem>
              <RefItem><LinkOut href={links.euAiAct}>European Union. Regulation (EU) 2024/1689 (the AI Act). In force August 1, 2024.</LinkOut></RefItem>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.08}>
            <EducatorsFooter
              navigate={navigate}
              takeaways={[
                "Stop arguing capability. The 'AI can't really X' line keeps falling, and each fall weakens the case for the conclusion (don't replace teachers) it was supposed to be defending.",
                "The argument that survives is values-based and is/ought-shaped: even if AI can do this, doing it this way is not the same act, and we collectively value the original.",
                "Biesta's three purposes give a workable map of what teachers actually do. AI handles qualification well, socialization unevenly, subjectification not at all. The substitution would be uneven across the three.",
                "Sparrow and Flenady's 'money talks' point matters. The values argument needs to be documented before the budget conversation, not improvised during it.",
                "Hubris is the wrong charge to defend against. Concede that the machine may keep gaining capability. Make the case that schools are for something that doesn't depend on machines lacking capability.",
              ]}
              classroomActivities={[
                {
                  title: "Watch and respond",
                  time: "75 min",
                  description: "Watch the source video as a department. Then read the argument here. As a group, write a single paragraph that states your school's actual position on AI and teachers, framed in values rather than capability terms. Stress-test it against a hostile parent and a hostile colleague.",
                  prompt: "If a board member asked what your school is for that AI is not, would the paragraph answer? If not, what's missing — the value, the framework, the test case, or the willingness to defend the tradeoff in public?",
                },
                {
                  title: "Run the Doppelgänger scenario with staff",
                  time: "60 min",
                  description: "Use the embedded thought experiment above as the PD trigger. Have staff work through it individually first, then compare answers. The disagreements between answers are the surface of disagreements about what the school is for.",
                  prompt: "If two teachers would handle the Doppelgänger case differently, what is the underlying value disagreement and which framework would help you surface it?",
                },
                {
                  title: "The 'concede the capability' exercise",
                  time: "30 min",
                  description: "Pull a recent presentation, parent letter, or policy memo in which the school defended human teachers on capability grounds ('AI can't really mentor,' 'AI can't really care,' etc.). Rewrite the relevant paragraph in values terms.",
                  prompt: "After the rewrite, is the defense stronger or weaker? If weaker, is it weaker because the original was overclaiming, or because the school hasn't done the values work yet?",
                },
              ]}
              whereToGoNext={{
                internal: [
                  { id: "ai-paradox", label: "The Paradox of AI in Education", blurb: "The deeper version of this argument: assume capability is settled and reason from there." },
                  { id: "ai-ambiguity-to-action", label: "From Ambiguity to Action", blurb: "The frameworks (utilitarianism, deontology, virtue ethics) that make the values conversation tractable." },
                  { id: "ai-authorship-quandary", label: "The AI Authorship Quandary", blurb: "The case-level companion: what the same argument looks like applied to one student's essay." },
                  { id: "ai-consciousness", label: "The Consciousness Line", blurb: "Caution under uncertainty applied to a different question. The same agnostic-but-committed stance." },
                ],
                external: [
                  { href: links.sparrowFlenady, label: "Sparrow & Flenady on automated education (AI & Society, 2025)", blurb: "The is/ought distinction at its sharpest, applied directly to teacher replacement. Read this." },
                  { href: links.vallor, label: "Shannon Vallor, The AI Mirror (2024)", blurb: "On AI as reflective surface rather than understanding partner. Important for the 'simulated empathy' question." },
                  { href: links.coelhoBerj, label: "Coelho et al., BERJ (2025)", blurb: "The placebo/nocebo argument made carefully. Worth assigning to any committee considering AI-tutor pilots." },
                ],
              }}
            />
          </FadeIn>

          <FadeIn delay={0.1}>
            <ContinueExploring navigate={navigate} links={[
              { id: "ai-paradox", icon: "PX", title: "The Paradox of AI", desc: "The deeper version of this argument", color: C.gold },
              { id: "ai-ambiguity-to-action", icon: "FA", title: "Ambiguity to Action", desc: "The frameworks underneath", color: C.teal },
              { id: "ai-authorship-quandary", icon: "AQ", title: "Authorship Quandary", desc: "The case-level companion piece", color: C.coral },
            ]} />
          </FadeIn>
        </Narrow>
      </PageContainer>
    </div>
  );
}
