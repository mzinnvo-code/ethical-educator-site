import { C } from "../../theme.js";
import {
  FadeIn, Expandable, SectionLabel, SectionTitle, Subtitle,
  Narrow, PageContainer, BodyText, ComparisonCard,
  Divider, ContinueExploring
} from "../../components/shared.jsx";

export default function AVResources({ navigate }) {
  return (
    <div style={{ padding: "80px 0", background: C.bg }}>
      <PageContainer>
        <FadeIn>
          <SectionLabel>For Educators · Student Engagement</SectionLabel>
          <SectionTitle>AV Resources for Online Teaching</SectionTitle>
          <Subtitle>Audio and video tools that make online instruction more engaging, accessible, and human. Practical recommendations for K–12 virtual classrooms — and the accessibility commitments that should accompany every multimedia choice.</Subtitle>
        </FadeIn>

        <Narrow>
          <div style={{ marginTop: 40 }}>

            <Divider label="Why AV Matters Online" />

            <FadeIn delay={0.06}>
              <Expandable title="Three Channels for Holding Student Attention" defaultOpen tag="Foundation">
                <BodyText>
                  Online learning competes with everything else on a student's screen. Audiovisual resources aren't a frill — they're how an online classroom earns the same attention an in-person classroom gets by default.
                </BodyText>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, margin: "16px 0" }}>
                  <ComparisonCard title="Visual Appeal" color={C.teal} items={[
                    "Captures student attention",
                    "Makes abstract content stimulating",
                    "Anchors memory in concrete imagery",
                  ]} />
                  <ComparisonCard title="Auditory Appeal" color={C.gold} items={[
                    "Creates immersion in the lesson",
                    "Carries tone, emphasis, warmth",
                    "Reaches students who learn by listening",
                  ]} />
                  <ComparisonCard title="Interactive Activities" color={C.ocean} items={[
                    "Quizzes, simulations, virtual field trips",
                    "Force active rather than passive viewing",
                    "Convert spectators into participants",
                  ]} />
                </div>
              </Expandable>
            </FadeIn>

            <Divider label="Comprehension" />

            <FadeIn delay={0.06}>
              <Expandable title="How AV Resources Build Understanding" color={C.teal} tag="Cognition">
                <BodyText>
                  Three mechanisms account for most of the comprehension gain when AV resources are used well — not because the media itself teaches, but because each channel handles a different cognitive load.
                </BodyText>
                <ul style={{ paddingLeft: 20, marginTop: 12, color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.85 }}>
                  <li style={{ marginBottom: 10 }}><strong>Visual representation.</strong> Diagrams, animations, and short videos make abstract concepts concrete. A 30-second animation of cell division communicates what a paragraph of text labors to convey.</li>
                  <li style={{ marginBottom: 10 }}><strong>Auditory reinforcement.</strong> Audio provides a different processing channel. Students who lose the thread reading a passage may catch it on a second listen — and vice versa.</li>
                  <li><strong>Interactive elements.</strong> Embedded checks ("drag the label to the right organelle") force engagement at the point of comprehension, not at the end. Active engagement strengthens encoding.</li>
                </ul>
                <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.7, marginTop: 12 }}>
                  Caveat: more channels isn't automatically better. Cognitive load research warns against piling visual + auditory + interactive on top of unrelated content. The channels should reinforce, not compete.
                </p>
              </Expandable>
            </FadeIn>

            <Divider label="Accessibility — Non-Negotiable" />

            <FadeIn delay={0.06}>
              <Expandable title="Captions, Transcripts, and Alternative Formats" color={C.coral} tag="Required">
                <BodyText>
                  Accessibility is not optional, and "we'll add captions if there's time" is the most common form of failure. The rule: if you produce audio or video, you produce a text equivalent.
                </BodyText>
                <ul style={{ paddingLeft: 20, marginTop: 12, color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.85 }}>
                  <li style={{ marginBottom: 10 }}><strong>Closed captioning and transcripts.</strong> Provide text versions of audio content for students who are deaf or hard of hearing — and for the larger group of students who watch in noisy environments, who skim text faster than audio plays, or whose first language is not English.</li>
                  <li><strong>Alternative formats.</strong> Where possible, present content in multiple formats — audio, digital text that can be read by screen readers, and (where applicable) braille-compatible files. Each student should have at least one format that works for how they read.</li>
                </ul>
                <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.7, marginTop: 14 }}>
                  Auto-generated captions are a starting point, not a finished product. Review them. Misheard captions on a key term turn a lesson into a quiet failure for students who depend on the captions.
                </p>
              </Expandable>
            </FadeIn>

            <Divider label="Personalization" />

            <FadeIn delay={0.06}>
              <Expandable title="Adaptive Platforms, Flexible Paths, Personalized Feedback" color={C.gold} tag="Practice">
                <BodyText>
                  AV resources unlock personalization at a scale a single teacher cannot deliver alone — but only if the personalization is built around real student differences, not just engagement metrics.
                </BodyText>
                <ol style={{ paddingLeft: 20, marginTop: 12, color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.85 }}>
                  <li style={{ marginBottom: 12 }}><strong>Adaptive platforms.</strong> Tools that adjust difficulty and content based on student performance. Best when the adaptation is transparent — students can see why the next problem changed — and worst when adaptation becomes a black box that students stop trusting.</li>
                  <li style={{ marginBottom: 12 }}><strong>Flexible paths.</strong> Allow students to learn at their own pace and explore interests. The student who finishes a unit in three days should have a clear "what's next" rather than waiting for the cohort.</li>
                  <li><strong>Personalized feedback.</strong> Tailored guidance — including audio comments and short screencasts — that addresses the specific student's specific work, not the average student's average errors.</li>
                </ol>
              </Expandable>
            </FadeIn>

            <Divider label="Collaboration" />

            <FadeIn delay={0.06}>
              <Expandable title="Video Conferencing, Shared Workspaces, and Forums" color={C.ocean} tag="Connection">
                <BodyText>
                  Online students lose more than content if collaboration disappears — they lose the social proof that they're learning alongside others. Three categories of tools rebuild that social fabric.
                </BodyText>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, margin: "16px 0" }}>
                  <ComparisonCard title="Video Conferencing" color={C.teal} items={[
                    "Real-time discussions and group projects",
                    "Restores nonverbal cues",
                    "Use sparingly to avoid Zoom fatigue",
                  ]} />
                  <ComparisonCard title="Shared Workspaces" color={C.gold} items={[
                    "Live collaborative documents",
                    "Co-editing presentations and slides",
                    "Persistent record of contribution",
                  ]} />
                  <ComparisonCard title="Online Forums" color={C.coral} items={[
                    "Asynchronous discussion threads",
                    "Time to think before contributing",
                    "Levels the playing field for quieter voices",
                  ]} />
                </div>
              </Expandable>
            </FadeIn>

            <Divider label="The AV Toolkit" />

            <FadeIn delay={0.06}>
              <Expandable title="Four Categories of AV Resource Worth Knowing" color={C.gold} tag="Toolkit">
                <BodyText>
                  Most online teaching tools fall into four categories. Each has a sweet spot for K–12 use.
                </BodyText>
                <div style={{ margin: "16px 0" }}>
                  {[
                    { type: "Educational Video", color: C.teal, desc: "Short-form video explainers, lesson recordings, and curated clips. Best when chunked into 3–6 minute segments with embedded check-ins. Long unbroken video lectures online consistently underperform short, structured video paired with activity." },
                    { type: "Interactive Whiteboard", color: C.gold, desc: "Live or recorded whiteboards (Jamboard, FigJam, Whiteboard.fi) where you and students can write, draw, and arrange ideas together. Recreates the spatial thinking that classroom whiteboards enable." },
                    { type: "Podcast", color: C.ocean, desc: "Audio-only content for students who learn well by listening — or who want to revisit a lesson while walking. Underused in K–12 because it requires less production polish than teachers expect; a clear voice and a quiet room is enough." },
                    { type: "Virtual Reality", color: C.coral, desc: "Immersive experiences for subjects where physical resources are scarce — historical reenactments, anatomy, virtual field trips. The equity question: VR headsets are expensive, and uneven availability becomes a new kind of digital divide." },
                  ].map((row, i) => (
                    <div key={i} style={{
                      padding: "12px 16px", margin: "10px 0",
                      background: C.surface, border: `1px solid ${C.border}`,
                      borderLeft: `3px solid ${row.color}`,
                      borderRadius: 8,
                    }}>
                      <strong style={{ color: row.color, fontSize: "0.95rem", fontFamily: "'Source Serif 4', Georgia, serif" }}>{row.type}</strong>
                      <p style={{ color: C.textSecondary, fontSize: "0.88rem", lineHeight: 1.65, marginTop: 6 }}>{row.desc}</p>
                    </div>
                  ))}
                </div>
              </Expandable>
            </FadeIn>

            <Divider label="The Bottom Line" />

            <FadeIn delay={0.06}>
              <Expandable title="Four Reasons AV Belongs in Every Online Classroom" color={C.teal} tag="Summary">
                <ul style={{ paddingLeft: 20, marginTop: 8, color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.85 }}>
                  <li style={{ marginBottom: 10 }}><strong>Engagement.</strong> AV resources captivate student attention and make online learning enjoyable rather than enduring.</li>
                  <li style={{ marginBottom: 10 }}><strong>Comprehension.</strong> Multiple formats help students grasp complex concepts more easily by routing the same idea through different cognitive channels.</li>
                  <li style={{ marginBottom: 10 }}><strong>Accessibility.</strong> Done well — with captions, transcripts, and alternative formats — AV tools make learning accessible to students with diverse needs.</li>
                  <li><strong>Collaboration.</strong> Interactive AV resources foster teamwork and communication skills that pure-text online learning struggles to develop.</li>
                </ul>
                <p style={{ color: C.textSecondary, fontSize: "0.92rem", lineHeight: 1.7, marginTop: 14 }}>
                  Done badly — captions skipped, video lectures unbroken, tools added because they're trendy — AV resources become noise. The discipline is to choose tools that serve a clear pedagogical purpose, then build the accessibility commitments around them from day one.
                </p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.1}>
              <ContinueExploring navigate={navigate} links={[
                { id: "async-engagement", icon: "🖥️", title: "Asynchronous Learning Engagement", desc: "Engagement strategies for online and async settings", color: C.ocean },
                { id: "enhancing-engagement", icon: "🧠", title: "Enhancing Student Engagement", desc: "Foundational engagement frameworks", color: C.teal },
                { id: "for-educators", icon: "📋", title: "For Educators", desc: "All professional development resources", color: C.gold },
              ]} />
            </FadeIn>
          </div>
        </Narrow>
      </PageContainer>
    </div>
  );
}
