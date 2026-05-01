import { useState, useEffect, useMemo } from "react";
import { C } from "../../theme.js";
import {
  FadeIn, SectionTitle, Subtitle, Narrow, PageContainer, Divider,
  BodyText, ContinueExploring, Expandable,
} from "../../components/shared.jsx";
import ProtocolCard from "../../components/ProtocolCard.jsx";
import BuildYourNorms from "../../components/BuildYourNorms.jsx";
import StemBrowser from "../../components/StemBrowser.jsx";
import DerailerDecisionTree from "../../components/DerailerDecisionTree.jsx";
import GlobalCanonSection from "../../components/GlobalCanonSection.jsx";
import { PROTOCOLS, filterProtocols } from "../../data/protocols.js";
import { SOCRATIC_MOVES } from "../../data/socraticMoves.js";

const TRACKS = [
  { id: "teacher", icon: "🍎", iconLabel: "Apple", label: "I'm a teacher" },
  { id: "family", icon: "🍽️", iconLabel: "Plate", label: "I'm at home" },
];

const SIBLING_LINKS = [
  { id: "thought-experiments", icon: "📚", title: "Hub & explainer", desc: "What thought experiments are", color: C.teal },
  { id: "thought-experiments/educators", icon: "🍎", title: "For Educators", desc: "Adult AI dilemmas", color: C.gold },
  { id: "thought-experiments/k-5", icon: "🧸", title: "K–5", desc: "Read-aloud, illustrated", color: C.coral },
  { id: "thought-experiments/6-8", icon: "🚋", title: "6–8", desc: "Story-based dilemmas", color: C.gold },
  { id: "thought-experiments/9-12", icon: "🕳️", title: "9–12", desc: "The canon", color: C.ocean },
];

export default function Toolkit({ navigate }) {
  const [track, setTrack] = useState("teacher");
  const [filterBand, setFilterBand] = useState("");
  const [maxTime, setMaxTime] = useState("");
  const [groupSize, setGroupSize] = useState("");

  // Read URL hash to deep-link to a specific protocol on first load
  useEffect(() => {
    const hash = window.location.hash;
    const m = hash.match(/protocol=([\w-]+)/);
    if (m) {
      // Wait for paint, then scroll
      setTimeout(() => {
        const el = document.getElementById(`protocol-${m[1]}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          // Auto-open the matching card by simulating click on its toggle button
          const btn = el.querySelector("button[aria-expanded]");
          if (btn && btn.getAttribute("aria-expanded") === "false") btn.click();
        }
      }, 300);
    }
  }, []);

  const filteredProtocols = useMemo(() => filterProtocols(PROTOCOLS, {
    gradeBand: filterBand || undefined,
    maxTime: maxTime ? parseInt(maxTime, 10) : undefined,
    groupSize: groupSize ? parseInt(groupSize, 10) : undefined,
  }), [filterBand, maxTime, groupSize]);

  return (
    <div style={{ padding: "80px 0 100px", background: C.bg }}>
      <PageContainer>
        <FadeIn>
          <p style={{
            fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em",
            textTransform: "uppercase", color: C.gold, marginBottom: 10,
          }}>
            Thought Experiments · Dialogue Toolkit
          </p>
          <SectionTitle>A Toolkit for Productive Conversation</SectionTitle>
          <Subtitle>
            Norms students help author. Sentence stems for the quiet kid. Twelve protocols you
            can run cold. Six Socratic moves that will hold up any seminar. A "what do I do
            when…" decision tree for the moments that go sideways. And a parallel canon —
            because Western philosophy isn't the only philosophy.
          </Subtitle>

          {/* Track selector */}
          <div style={{
            display: "flex", gap: 8, marginTop: 24, marginBottom: 4, flexWrap: "wrap",
          }}>
            {TRACKS.map(t => (
              <button
                key={t.id}
                onClick={() => setTrack(t.id)}
                aria-pressed={track === t.id}
                style={{
                  padding: "10px 18px",
                  background: track === t.id
                    ? `linear-gradient(135deg, ${C.gold}, ${C.coral})`
                    : C.surface,
                  color: track === t.id ? "#fff" : C.textSecondary,
                  border: track === t.id ? "none" : `1px solid ${C.border}`,
                  borderRadius: 999,
                  cursor: "pointer", fontWeight: 600,
                  fontSize: "0.88rem", display: "flex", alignItems: "center", gap: 8,
                  transition: "all 0.2s",
                }}
              >
                <span role="img" aria-label={t.iconLabel}>{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>
        </FadeIn>

        <Narrow>
          {/* QUICK START */}
          <Divider label="Start here" />
          <FadeIn>
            <div style={{
              background: `linear-gradient(135deg, ${C.teal}10, ${C.bgAlt})`,
              border: `1px solid ${C.teal}30`,
              borderRadius: 12, padding: "18px 22px", marginBottom: 20,
            }}>
              {track === "teacher" ? (
                <>
                  <h3 style={{
                    fontFamily: "'Source Serif 4', Georgia, serif",
                    color: C.teal, fontSize: "1.05rem", fontWeight: 700, marginBottom: 8,
                  }}>If you have 5 minutes before class</h3>
                  <ol style={{ paddingLeft: 20, color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.7 }}>
                    <li>Pick a scenario. Click "For teachers" to read its kit.</li>
                    <li>Pick a protocol. Most rooms can run <strong>Think-Pair-Share</strong> or <strong>Continuum Line</strong> cold.</li>
                    <li>Open with one of the discussion prompts (not the multiple choice).</li>
                    <li>Wait at least 8 seconds before clarifying. Trust the silence.</li>
                    <li>Close with the exit ticket. That's the whole lesson.</li>
                  </ol>
                </>
              ) : (
                <>
                  <h3 style={{
                    fontFamily: "'Source Serif 4', Georgia, serif",
                    color: C.teal, fontSize: "1.05rem", fontWeight: 700, marginBottom: 8,
                  }}>If you have 5 minutes before dinner</h3>
                  <ol style={{ paddingLeft: 20, color: C.textSecondary, fontSize: "0.9rem", lineHeight: 1.7 }}>
                    <li>Pick a scenario age-appropriate to your kid.</li>
                    <li>Read JUST the prompt at dinner. Not the multiple choice.</li>
                    <li>Ask: "What would you do?" Then resist explaining your own view.</li>
                    <li>Use the stem "I wonder if…" once yourself. Model the move.</li>
                    <li>End by asking what's still bothering them. Real philosophy lives there.</li>
                  </ol>
                </>
              )}
            </div>
          </FadeIn>

          {/* NORMS */}
          <Divider label="Norms — author together" />
          <FadeIn>
            <BodyText>
              {track === "teacher"
                ? "Norms work best when students help draft them. Use the starter set as a draft, then negotiate together. The conversation about WHICH norms to keep is itself the first philosophy lesson."
                : "Even at home, a short shared agreement makes the dinner table a space where philosophy can happen. Pick three you can stick to."}
            </BodyText>
            <BuildYourNorms track={track === "teacher" ? "classroom" : "family"} />
          </FadeIn>

          {/* STEMS */}
          <Divider label="Sentence stems — give your students (or kids) a way in" />
          <FadeIn>
            <BodyText>
              The hardest part of dialogue isn't having an opinion. It's finding a way to say it.
              These stems are the difference between a discussion and a debate. Categorized by
              the move they support.
            </BodyText>
            <StemBrowser />
          </FadeIn>

          {track === "teacher" && (
            <>
              {/* SOCRATIC MOVES */}
              <Divider label="Five Socratic moves" />
              <FadeIn>
                <BodyText>
                  Memorize these five and you can run a seminar cold. They are not personality
                  traits — they are tools.
                </BodyText>
                {SOCRATIC_MOVES.map(move => (
                  <Expandable key={move.id} title={move.name} color={C.gold} tag={move.purpose.split(" ").slice(0, 4).join(" ") + "…"}>
                    <p style={{ marginBottom: 10 }}><strong>Purpose:</strong> {move.purpose}</p>
                    <p style={{ marginBottom: 10 }}><strong>When:</strong> {move.when}</p>
                    <div style={{ marginBottom: 10 }}>
                      <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.gold, marginBottom: 6 }}>
                        Try saying
                      </p>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                        {move.examples.map((ex, i) => (
                          <li key={i} style={{
                            padding: "6px 12px", marginBottom: 4,
                            background: `${C.gold}08`, borderLeft: `2px solid ${C.gold}`,
                            borderRadius: "0 6px 6px 0",
                            fontFamily: "'Source Serif 4', Georgia, serif",
                            color: C.textPrimary, fontSize: "0.9rem",
                          }}>"{ex}"</li>
                        ))}
                      </ul>
                    </div>
                    <p style={{ color: C.coral, fontStyle: "italic", fontSize: "0.85rem" }}>
                      <strong style={{ color: C.coral }}>Pitfall:</strong> {move.pitfall}
                    </p>
                  </Expandable>
                ))}
              </FadeIn>

              {/* PROTOCOLS */}
              <Divider label="Twelve protocols" />
              <FadeIn>
                <BodyText>
                  Each protocol is a structured way to run a discussion. Filter by what fits
                  your room. Click to expand any protocol for the full step-by-step.
                </BodyText>

                {/* Filter bar */}
                <div style={{
                  display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
                  gap: 10, marginBottom: 18,
                  padding: "14px 16px", background: C.bgAlt,
                  border: `1px solid ${C.border}`, borderRadius: 10,
                }}>
                  <FilterSelect
                    label="Grade band"
                    value={filterBand}
                    onChange={setFilterBand}
                    options={[
                      { v: "", label: "Any" },
                      { v: "k-5", label: "K-5" },
                      { v: "6-8", label: "6-8" },
                      { v: "9-12", label: "9-12" },
                      { v: "educators", label: "Educators" },
                    ]}
                  />
                  <FilterSelect
                    label="Time available"
                    value={maxTime}
                    onChange={setMaxTime}
                    options={[
                      { v: "", label: "Any" },
                      { v: "15", label: "15 min" },
                      { v: "30", label: "30 min" },
                      { v: "60", label: "60 min" },
                      { v: "90", label: "90 min" },
                    ]}
                  />
                  <FilterInput
                    label="Group size"
                    value={groupSize}
                    onChange={setGroupSize}
                    placeholder="e.g., 22"
                  />
                </div>
                {(filterBand || maxTime || groupSize) && (
                  <p style={{ color: C.textMuted, fontSize: "0.78rem", marginBottom: 10 }}>
                    Showing {filteredProtocols.length} of {PROTOCOLS.length} protocols.
                    <button
                      onClick={() => { setFilterBand(""); setMaxTime(""); setGroupSize(""); }}
                      style={{
                        marginLeft: 10, background: "transparent",
                        border: "none", color: C.gold, cursor: "pointer",
                        textDecoration: "underline", fontSize: "0.78rem",
                      }}
                    >Clear filters</button>
                  </p>
                )}

                {filteredProtocols.length === 0 ? (
                  <p style={{ color: C.textMuted, padding: "20px", textAlign: "center", fontStyle: "italic" }}>
                    No protocols match your filters. Loosen them and try again.
                  </p>
                ) : (
                  filteredProtocols.map(p => (
                    <ProtocolCard key={p.id} protocol={p} navigate={navigate} />
                  ))
                )}
              </FadeIn>

              {/* SAFETY */}
              <Divider label="Safety, equity, and what to do when…" />
              <FadeIn>
                <BodyText>
                  Discussions go sideways. That's not failure — it's the work. This decision
                  tree walks you to specific guidance for the moments that matter most.
                </BodyText>
                <DerailerDecisionTree />

                <Expandable title="Universal precautions" color={C.coral}>
                  <p>Some practices apply to every discussion, regardless of topic:</p>
                  <ul style={{ paddingLeft: 20, marginTop: 10 }}>
                    <li><strong>Everyone has a story you don't know.</strong> A scenario about loss may hit a student dealing with a recent death; a scenario about surveillance may hit one whose family is undocumented. Watch faces.</li>
                    <li><strong>Opt-out is always available.</strong> Students can step back from any conversation without explaining why. Make this explicit.</li>
                    <li><strong>Confidentiality has limits.</strong> What happens in the room stays in the room — UNLESS a student discloses harm to self, abuse, or imminent danger. Then your reporting obligations kick in. Be clear about this in advance.</li>
                    <li><strong>Documentation matters.</strong> If something significant happens, write it down within the day. Memory fades.</li>
                  </ul>
                </Expandable>

                <Expandable title="Equity talk-moves" color={C.teal}>
                  <p style={{ marginBottom: 10 }}><strong>Wait time.</strong> Most teachers wait 1–2 seconds after a question. The research recommendation is 8–12. Try counting silently. The first time you hold the silence, the room shifts.</p>
                  <p style={{ marginBottom: 10 }}><strong>Tongue-bite practice.</strong> When a student gives a partial answer, your instinct is to fill the gap. Resist. Wait three more seconds. Often they'll continue.</p>
                  <p style={{ marginBottom: 10 }}><strong>Named random call (with warning).</strong> Cold-calling without warning can shut students down. Try: "I'm going to come to ___ next — I want to give them a moment to think first." This tells the student they will speak; they have time to compose.</p>
                  <p><strong>Participation tracking.</strong> Use a seating chart with tally marks. The chart makes invisible patterns visible. Most teachers are surprised to see how skewed participation is.</p>
                </Expandable>
              </FadeIn>

              {/* GLOBAL CANON */}
              <Divider label="Global Canon" />
              <FadeIn>
                <GlobalCanonSection navigate={navigate} />
              </FadeIn>
            </>
          )}

          {track === "family" && (
            <>
              {/* FAMILY-SPECIFIC */}
              <Divider label="Starting a conversation at home" />
              <FadeIn>
                <Expandable title="How to start without being weird" color={C.gold} defaultOpen>
                  <p style={{ marginBottom: 10 }}>You don't need to announce "We're going to do philosophy now." That's the fastest way to shut a kid down.</p>
                  <p style={{ marginBottom: 10 }}>Instead: pick a scenario. Read just the opening prompt. Then ask, casually: "What would you do?" Listen. Don't lead.</p>
                  <p style={{ marginBottom: 10 }}>The most powerful move you have as a parent is to ask follow-up questions instead of answering them. "Why?" is gold. "Tell me more" is gold. "I never thought about it that way" is gold.</p>
                  <p>Resist the urge to teach a lesson. The lesson is the conversation.</p>
                </Expandable>

                <Expandable title="What if my kid asks something I don't know?" color={C.teal}>
                  <p style={{ marginBottom: 10 }}>Say "I don't know."</p>
                  <p style={{ marginBottom: 10 }}>Then add: "Let me think about it." Or: "Let's figure it out together."</p>
                  <p style={{ marginBottom: 10 }}>Modeling intellectual humility — that even adults don't always know — is one of the best things you can do for a curious kid.</p>
                  <p>If you DO know, hold off on telling for a few minutes. Ask them what they think first.</p>
                </Expandable>

                <Expandable title="What if my kid says something that worries me?" color={C.coral}>
                  <p style={{ marginBottom: 10 }}>Don't react first. Ask follow-up questions: "What makes you say that?" "Where did you hear that?" "What do you think a person who disagreed would say?"</p>
                  <p style={{ marginBottom: 10 }}>Often a startling statement is a half-formed idea being tested. Your reaction tells your kid whether ideas can be tested at home.</p>
                  <p style={{ marginBottom: 10 }}>If a worry persists — about safety, mental health, or behavior — bring it to your pediatrician or a school counselor. Don't try to figure it out alone.</p>
                  <p style={{ fontStyle: "italic", color: C.coral }}>If your child discloses self-harm, abuse, or an immediate threat to safety — that's not a discussion question. Stop the conversation, hold them, and call a professional. Crisis resources are below.</p>
                </Expandable>

                <Expandable title="When to take this further" color={C.coral}>
                  <p style={{ marginBottom: 10 }}>Most philosophy conversations are fine. Sometimes a topic surfaces something more.</p>
                  <p style={{ marginBottom: 10 }}><strong>Talk to a pediatrician or counselor if your child:</strong> describes feelings of worthlessness or wanting to disappear; speaks repeatedly about death in a way that worries you; describes being hurt by someone; describes a pattern of thinking that scares them.</p>
                  <p style={{ marginBottom: 10 }}><strong>Crisis support:</strong> 988 Suicide & Crisis Lifeline (US, dial 988). Text HOME to 741741 for the Crisis Text Line. Both are free, 24/7, confidential.</p>
                </Expandable>
              </FadeIn>

              <Divider label="Discussion stems for the dinner table" />
              <FadeIn>
                <BodyText>
                  These work for any age. Pick a scenario together and use these to keep the
                  conversation moving without lecturing.
                </BodyText>
                <StemBrowser />
              </FadeIn>

              <Divider label="One protocol for the home" />
              <FadeIn>
                <BodyText>
                  Most home conversations don't need a protocol. But Think-Pair-Share works
                  beautifully at the dinner table — silent thinking for one minute, then
                  partner-share, then group share. Tries to keep the loud one (often the parent)
                  from dominating.
                </BodyText>
                <ProtocolCard
                  protocol={PROTOCOLS.find(p => p.id === "think-pair-share")}
                  defaultOpen
                  navigate={navigate}
                />
              </FadeIn>
            </>
          )}

          <Divider />
          <FadeIn>
            <ContinueExploring navigate={navigate} links={SIBLING_LINKS} />
          </FadeIn>
        </Narrow>
      </PageContainer>
    </div>
  );
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <div>
      <label style={{
        display: "block", fontSize: "0.66rem", fontWeight: 700,
        letterSpacing: "0.12em", textTransform: "uppercase",
        color: C.textMuted, marginBottom: 4,
      }}>{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%", padding: "6px 10px",
          background: C.surface, color: C.textPrimary,
          border: `1px solid ${C.border}`, borderRadius: 6,
          fontFamily: "inherit", fontSize: "0.86rem",
        }}
      >
        {options.map(o => <option key={o.v} value={o.v}>{o.label}</option>)}
      </select>
    </div>
  );
}

function FilterInput({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label style={{
        display: "block", fontSize: "0.66rem", fontWeight: 700,
        letterSpacing: "0.12em", textTransform: "uppercase",
        color: C.textMuted, marginBottom: 4,
      }}>{label}</label>
      <input
        type="number"
        min="1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%", padding: "6px 10px",
          background: C.surface, color: C.textPrimary,
          border: `1px solid ${C.border}`, borderRadius: 6,
          fontFamily: "inherit", fontSize: "0.86rem",
        }}
      />
    </div>
  );
}
