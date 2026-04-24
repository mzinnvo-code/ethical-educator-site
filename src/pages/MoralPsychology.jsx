import { useState } from "react";
import { C } from "../theme.js";
import {
  FadeIn, Expandable, VideoEmbed, useAudio, SectionLabel, SectionTitle, Subtitle,
  Narrow, PageContainer, BodyText, RefItem, ResearchCallout, QuoteBlock, StatCounter,
  Timeline, ComparisonCard, FigureCard, Divider, SectionHeading, ContinueExploring, ReadingTime
} from "../components/shared.jsx";
import { DualProcessDiagram } from "../components/diagrams.jsx";

// ─── Interactive Trolley Experiment ───
function TrolleyExperiment() {
  const [choice, setChoice] = useState(null);
  const [scenario, setScenario] = useState(0);
  const audio = useAudio();
  const scenarios = [
    {
      title: "The Switch Case",
      desc: "A runaway trolley is heading toward five people tied to the track. You can pull a lever to divert it to a side track, where it will kill one person instead. Do you pull the lever?",
      options: ["Pull the lever", "Do nothing"],
      analysis: [
        "About 85% of people agree with this utilitarian choice (Hauser et al., 2007). But why does the next scenario feel so different?",
        "You aligned with a deontological intuition: actively causing harm feels worse than allowing it, even when more die. Philosophers call this the Doctrine of Double Effect.",
      ],
    },
    {
      title: "The Footbridge Case",
      desc: "Same trolley, same five people. But now you're on a footbridge. The only way to stop the trolley is to push a large person off the bridge onto the tracks. Do you push?",
      options: ["Push", "Don't push"],
      analysis: [
        "You overrode the emotional response. Greene's fMRI studies (2001, 2004) showed this activates emotional regions — amygdala, vmPFC, posterior cingulate — that the lever case doesn't. This asymmetry is the empirical foundation of dual-process theory.",
        "Most people (about 85%) share this intuition. The puzzle: if outcomes are identical, why so different? Greene argues evolved emotional responses to 'personal force' explain the discrepancy. A 2024 meta-analysis across 44 studies and 14,003 participants found the predicted effect was not statistically significant.",
      ],
    },
    {
      title: "The AI Classroom",
      desc: "An AI tutor provides every student with perfectly personalized education, outperforming human teachers on every measurable outcome. Should schools replace human teachers with AI?",
      options: ["Replace with AI", "Keep human teachers"],
      analysis: [
        "You prioritized outcomes — a utilitarian calculation. But Biesta's framework identifies three purposes of education: qualification, socialization, and subjectification. AI might deliver qualification. A 2025 meta-analysis found moderate positive effects (SMD = 0.45), but Microsoft Research (Oct 2025) warned productivity gains ≠ learning gains.",
        "You invoked the is/ought distinction. Sparrow & Flenady's 'Bullshit Universities' (2025, AI & Society) argues economic pressures will push replacement regardless of normative arguments — making the philosophical case urgently practical. 'Money talks.'",
      ],
    },
  ];
  const s = scenarios[scenario];
  return (
    <div style={{ background: `linear-gradient(135deg, ${C.glow}, rgba(26,90,138,0.05))`, border: `1px solid ${C.borderHover}`, borderRadius: 16, padding: 24, margin: "24px 0" }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        {scenarios.map((_, i) => (<div key={i} style={{ width: 28, height: 3, borderRadius: 2, background: i <= scenario ? C.gold : "rgba(255,255,255,0.08)", transition: "background 0.3s" }} />))}
      </div>
      <h4 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.gold, fontSize: "1.08rem", marginBottom: 6 }}>Thought Experiment {scenario + 1}: {s.title}</h4>
      <p style={{ color: C.textSecondary, lineHeight: 1.7, marginBottom: 16, fontSize: "0.92rem" }}>{s.desc}</p>
      {choice === null ? (
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {s.options.map((opt, i) => (
            <button key={i} onClick={() => { setChoice(i); audio.playClick(); }}
              style={{ padding: "10px 22px", background: "rgba(200,152,48,0.07)", border: `1px solid rgba(200,152,48,0.2)`, borderRadius: 8, color: C.textPrimary, cursor: "pointer", fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.9rem", transition: "all 0.2s" }}>{opt}</button>
          ))}
        </div>
      ) : (
        <div>
          <div style={{ background: "rgba(200,152,48,0.05)", border: `1px solid rgba(200,152,48,0.12)`, borderRadius: 10, padding: 16, marginBottom: 12 }}>
            <p style={{ color: C.sand, lineHeight: 1.7, fontSize: "0.9rem", fontStyle: "italic" }}>{s.analysis[choice]}</p>
          </div>
          {scenario < scenarios.length - 1 ? (
            <button onClick={() => { setScenario(scenario + 1); setChoice(null); audio.playChime(); }} style={{ padding: "8px 20px", background: C.gold, border: "none", borderRadius: 6, color: C.midnight, cursor: "pointer", fontWeight: 600, fontSize: "0.86rem" }}>Next Scenario →</button>
          ) : (
            <div>
              <p style={{ color: C.textMuted, fontSize: "0.84rem", marginTop: 8, lineHeight: 1.7 }}>These dilemmas illustrate the core tension this thesis explores: our moral intuitions feel authoritative, but neuroscience reveals they're shaped by evolutionary pressures. Understanding this doesn't tell us what's right — but it helps us reason more carefully about moral questions, including questions about AI.</p>
              <button onClick={() => { setScenario(0); setChoice(null); }} style={{ padding: "8px 20px", marginTop: 10, background: "rgba(200,152,48,0.1)", border: `1px solid rgba(200,152,48,0.2)`, borderRadius: 6, color: C.gold, cursor: "pointer", fontSize: "0.84rem" }}>↺ Start Over</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function MoralPsychology({ navigate }) {
  return (
    <div style={{ padding: "80px 0", background: C.bg }}>
      <PageContainer>
        <FadeIn>
          <SectionLabel>Thesis Research · Updated with 2023–2026 Developments</SectionLabel>
          <SectionTitle>Moral Psychology & Normative Ethics</SectionTitle>
          <Subtitle>Can neuroscience tell us what's morally right? My thesis on Joshua Greene's dual-process theory and F.M. Kamm's objections — now expanded with the BBS exchange, Bammel's modularity critique, the Cosmides compromise-judgments challenge, the 2024 meta-analysis, and the new frontier where moral psychology meets AI alignment.</Subtitle>
          <ReadingTime minutes={18} />
        </FadeIn>

        <div style={{ marginTop: 32 }}><FadeIn delay={0.08}><TrolleyExperiment /></FadeIn></div>

        <div style={{ marginTop: 8 }}><FadeIn delay={0.1}><DualProcessDiagram /></FadeIn></div>

        <Narrow>
          {/* ─── SYNTHESIZED OVERVIEW ─── */}
          <Divider label="Foundations" />

          <FadeIn delay={0.06}>
            <Expandable title="The Core Question" defaultOpen={true} tag="Start Here">
              <p>Philosophers have debated the nature of morality for millennia. Utilitarians say the right action maximizes well-being. Deontologists say certain actions are inherently right or wrong regardless of consequences. Virtue ethicists focus on character. But what if the intuitions that ground these theories are themselves products of morally irrelevant evolutionary pressures?</p>
              <p style={{ marginTop: 12 }}>This is the question raised by Joshua Greene's research in moral psychology — and the central question of this thesis. Using fMRI brain imaging, Greene showed that different moral judgments activate different brain systems, suggesting that the philosophical tension between utilitarian and deontological ethics may actually reflect a tension between underlying brain processes. If our most deeply held moral convictions are products of evolutionary contingency, what happens to the philosophical frameworks built upon them?</p>
              <QuoteBlock
                quote="The dual-process theory gets much right, but needs revision."
                attribution="Joshua Greene"
                source="Behavioral and Brain Sciences, 46, e123 (2023)"
                color={C.teal}
              />
              <p>The question has only grown more urgent. In 2025, Raphaël Millière's paper "Normative conflicts and shallow AI alignment" (<em>Philosophical Studies</em>) argued the same gap between emotional intuition and deliberative reasoning that shapes human moral judgment is precisely what's missing from AI alignment — making dual-process debates directly relevant to AI safety.</p>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Expandable title="Greene's Dual-Process Theory">
              <p>Joshua Greene's fMRI research at Harvard revealed something striking: when people face moral dilemmas, different brain regions activate depending on the type of dilemma. "Personal" dilemmas (like pushing someone off a footbridge) engage emotional brain areas — the amygdala, ventromedial prefrontal cortex, and posterior cingulate cortex. "Impersonal" dilemmas (like pulling a lever) engage cognitive regions including the dorsolateral prefrontal cortex and inferior parietal lobes.</p>
              <p style={{ marginTop: 12 }}>Greene describes this as a "dual-process" model: deontological intuitions are driven by automatic emotional responses, while utilitarian judgments are driven by controlled cognitive processes. The evolutionary explanation: our aversion to "up close and personal" violence likely regulated behavior among ancestors whose survival depended on cooperation within small groups (de Waal, 1996; Haidt, 2001).</p>
              <p style={{ marginTop: 12 }}>Greene later revised his definition of the triggering factor from "up close and personal" to "personal force" — where the agent's muscles generate the force that directly impacts the victim (Greene et al., 2009). Crucially, his argument against deontology runs: if morally irrelevant features (evolved emotional reactions) produce deontological intuitions, those intuitions don't reflect rationally discoverable moral truths. Any attempt to justify them amounts to "moral confabulation."</p>
              <ResearchCallout
                year="2007"
                title="Causal Evidence from Lesion Studies"
                finding="Koenigs et al. showed patients with vmPFC damage made dramatically more utilitarian judgments — providing causal evidence that these emotional brain regions play a role in generating deontological responses. Greene still cites this work in his 2023 BBS defense."
                citation="Koenigs, M. et al. (2007). Nature, 446."
                color={C.teal}
              />
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Expandable title="Kamm's Objections & My Analysis">
              <p><strong>Objection 1 — Permissibility vs. Duty:</strong> F.M. Kamm argues that Greene frames his trolley problems in terms of "permissibility" rather than "duty." Saying it's <em>permissible</em> to turn the trolley doesn't mean there's a <em>duty</em> to do so — and only a judgment of duty would count as genuinely consequentialist.</p>
              <p style={{ marginTop: 12 }}>I argue this objection overlooks the diversity of consequentialist positions. Michael Slote's satisficing consequentialism (1984) explicitly denies a duty to maximize good. Consider Slote's example: a hotel manager discovers a stranded family and provides them a room — but not the best room available. It would be counterintuitive to say she acted wrongly. Therefore, judgments denying a duty to turn the trolley or push the man are <em>not</em> necessarily inconsistent with consequentialism.</p>
              <p style={{ marginTop: 12 }}><strong>Objection 2 — The Trapdoor Case:</strong> Kamm modifies the footbridge scenario: the large man stands on a trapdoor, and you press a remote button to drop him. Despite it not being "up close and personal," philosophers still judge it wrong. This successfully broadens the triggers for emotional response beyond "personal force." However, I argue it doesn't undermine Greene's core claim. Greene's primary point is that deontological responses are rooted in morally irrelevant emotional reactions, <em>regardless of what triggers them</em>.</p>
              <p style={{ marginTop: 12 }}><strong>My proposed argument for Kamm:</strong> I suggest Kamm could construct a stronger argument using the trapdoor case. If fMRI data showed the deontological judgment in the trapdoor case was generated by <em>cognitive</em> (not emotional) brain centers, this would directly challenge Greene's foundation — demonstrating that deontological judgments can be generated by the very cognitive processes Greene associates with "correct" moral reasoning.</p>
            </Expandable>
          </FadeIn>

          {/* ─── NEW: 2023-2026 DEVELOPMENTS ─── */}
          <Divider label="What's Happened Since (2023–2026)" />

          <FadeIn delay={0.06}>
            <BodyText>When I wrote this thesis in 2013, the debate was philosophically rich but empirically narrow. In the years since, Greene's theory has faced substantial empirical and theoretical pressure — and the field has moved in directions the original debate didn't anticipate. Here's what's happened.</BodyText>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Expandable title="The 2023 BBS Exchange — Greene Under Fire" color={C.coral} tag="Landmark">
              <p>In 2023, Wim De Neys published a target article in <em>Behavioral and Brain Sciences</em> titled "Advancing theorizing about fast-and-slow thinking" (BBS 46, e111). Greene responded with "Dual-process moral judgment beyond fast and slow" (BBS 46, e123, DOI: 10.1017/S0140525X22003193).</p>
              <p style={{ marginTop: 12 }}>Greene conceded ground:</p>
              <QuoteBlock
                quote="De Neys makes a compelling case that the sacrificial moral dilemmas do not elicit competing 'fast and slow' processes. Are there even two processes? Or just two intuitions?"
                attribution="Joshua Greene"
                source="BBS 46, e123 (2023)"
                color={C.teal}
              />
              <p>But he defended the core claim using neuropsychological evidence from vmPFC lesion studies (Koenigs et al., 2007), concluding: <strong>"The dual-process theory gets much right, but needs revision."</strong></p>
              <p style={{ marginTop: 12 }}>The exchange generated <strong>34+ commentaries</strong> from leading theorists. A sampling:</p>
              <ul style={{ listStyle: "none", paddingLeft: 0, marginTop: 10 }}>
                <li style={{ padding: "8px 12px", background: C.surface, borderRadius: 8, marginBottom: 8, borderLeft: `3px solid ${C.gold}` }}>
                  <strong style={{ color: C.gold }}>Keith Frankish (e122)</strong> — proposed "Toward dual-process theory 3.0," a more flexible framework.
                </li>
                <li style={{ padding: "8px 12px", background: C.surface, borderRadius: 8, marginBottom: 8, borderLeft: `3px solid ${C.ocean}` }}>
                  <strong style={{ color: C.sky }}>Stanovich & Toplak (e142)</strong> — agreed "exclusivity is exclusively in the past"; the strict version of dual-process theory is dead.
                </li>
                <li style={{ padding: "8px 12px", background: C.surface, borderRadius: 8, marginBottom: 8, borderLeft: `3px solid ${C.coral}` }}>
                  <strong style={{ color: C.coral }}>Melnikoff & Bargh</strong> — more radically argued "the systems do not exist" — there are no discrete Type 1 and Type 2 processes.
                </li>
                <li style={{ padding: "8px 12px", background: C.surface, borderRadius: 8, borderLeft: `3px solid ${C.teal}` }}>
                  <strong style={{ color: C.teal }}>De Neys (e384)</strong> — synthesized the responses in "Further advancing fast-and-slow theorizing."
                </li>
              </ul>
              <p style={{ marginTop: 12 }}>The exchange marked a clear inflection point: nobody in the field now defends the strict version of dual-process theory Greene proposed in 2001. The open question is what replaces it.</p>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Expandable title="Bammel's Modularity Critique (2024)" color={C.ocean} tag="Theoretical">
              <p>Moritz Bammel (Leuphana University Lüneburg) published "Greene's dual-process moral psychology and the modularity of mind" in <em>Philosophical Psychology</em> (December 20, 2024, DOI: 10.1080/09515089.2024.2444503, Open Access).</p>
              <p style={{ marginTop: 12 }}>Bammel's argument is meta-theoretical and potentially devastating: Greene's theory <strong>implicitly relies on a modular account of cognition</strong> (à la Fodor, 1983), positing two anatomically and functionally dissociable cognitive modules. Dynamical systems approaches in cognitive neuroscience reject strict modularity, conceiving the brain as a nonlinear system with constant plasticity.</p>
              <p style={{ marginTop: 12 }}>If we adopt the dynamical-systems perspective, Greene's original theory — positing "two asymmetrically independent processes" — is no longer tenable. Only non-exclusive dual-process theories survive.</p>
              <p style={{ marginTop: 12 }}>A related paper by Gim (2025), "A Unified Bayesian Model of Moral Judgment: From Greene's Dual-Process to Predictive Coding" (<em>Philosophy, Thought, Culture</em> 48(2)), offers a Bayesian alternative that treats moral judgment as continuous predictive inference rather than competition between discrete systems.</p>
              <p style={{ marginTop: 12 }}><strong>Why this matters for the thesis:</strong> The trapdoor case I discussed becomes easier to accommodate under non-modular theories. If there's no clean module boundary, a single case can engage both emotional and cognitive processing simultaneously — which is probably closer to how moral judgment actually works.</p>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.12}>
            <Expandable title="The Cosmides Challenge — Compromise Judgments (2022–2023)" color={C.gold} tag="Empirical">
              <p>Guzmán, Barbato, Sznycer, and Cosmides (2022) published "A moral trade-off system produces intuitive judgments that are rational and coherent" in <em>PNAS</em> (119(42), e2214005119).</p>
              <p style={{ marginTop: 12 }}>Their innovation was simple but powerful: instead of forcing binary deontological/utilitarian choices, they used trolley-like dilemmas where participants could choose <strong>intermediate options</strong>. The result: compromise moral judgments satisfied the <strong>Generalized Axiom of Revealed Preferences (GARP)</strong> — a formal criterion demonstrating rational coherence.</p>
              <p style={{ marginTop: 12 }}>This matters because neither pure "emotional" nor pure "cognitive" processes should produce judgments that satisfy GARP across intermediate options. The authors proposed a "moral tradeoff system" (MTS) constructing "rightness functions" — effectively a third model incompatible with strict dual-process theory.</p>
              <p style={{ marginTop: 12 }}><strong>The exchange:</strong> Greene responded in <em>PNAS</em> (2023, 120(6), e2220396120), arguing his model had been mischaracterized and could accommodate compromise. Cosmides et al. replied in the same volume (120(24), e2220909120) with a direct title:</p>
              <QuoteBlock
                quote="No version of the dual process model can explain rational performance by people who made compromise moral judgments."
                attribution="Cosmides et al."
                source="PNAS 120(24), e2220909120 (2023)"
                color={C.coral}
              />
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.14}>
            <Expandable title="The Meta-Analytic Verdict (2024) — A Sobering Picture" color={C.coral} tag="Meta-Analysis">
              <p>A 2024 meta-analysis in <em>Frontiers in Psychology</em> (15, 1388966) tested Greene's model systematically using cognitive load, ego depletion, induction, and time restriction manipulations.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, margin: "16px 0" }}>
                <StatCounter value={44} label="Studies analyzed" color={C.gold} />
                <StatCounter value={68} label="Effect sizes extracted" color={C.teal} />
                <StatCounter value={14003} label="Participants total" color={C.ocean} />
              </div>
              <p>The overall pooled effect was in the predicted direction but <strong>did not reach statistical significance</strong>. Among peer-reviewed studies, a small significant effect emerged (g = 0.08, 95% CI [0.01, 0.14], p = 0.023). But gray literature effects ran in the <em>opposite</em> direction (g = −0.05, n.s.) — suggesting <strong>publication bias</strong>.</p>
              <p style={{ marginTop: 12 }}>Converging contradictory findings:</p>
              <ResearchCallout year="2020" title="Time Pressure Increases Utilitarianism" finding="Rosas and Aguilar-Pardo (Thinking and Reasoning, 26(4)) found extreme time pressure actually increased utilitarian responses — the opposite of what dual-process theory predicts. If utilitarian judgments require slow, deliberative cognition, time pressure should decrease them." citation="Rosas & Aguilar-Pardo (2020)" color={C.coral} />
              <ResearchCallout year="2025" title="Japanese Replication" finding="A 2025 replication in Japan similarly found utilitarian judgments decreased with deliberation — contradicting the predicted direction." color={C.coral} />
              <p style={{ marginTop: 12 }}><strong>Bottom line:</strong> The empirical foundation Greene's argument rested on in 2001 is much less secure in 2024 than it appeared. This doesn't mean deontological intuitions are rationally discoverable truths — but it means the specific empirical leverage Greene used against deontology is weaker than advertised.</p>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.16}>
            <Expandable title="New Neuroimaging — Beyond the Trolley (2024–2026)" color={C.teal} tag="Neuroscience">
              <p>Moral neuroscience has moved well beyond the footbridge case. Recent findings complicate any simple emotional/cognitive dichotomy:</p>
              <ResearchCallout year="2025" title="The Precuneus Encodes Choice Conflict" finding="Xu and Wu, 'Unraveling the neural basis of repeated moral decisions with mouse tracking and fMRI' (Imaging Neuroscience, MIT Press, DOI: 10.1162/IMAG.a.1047) found the precuneus stably encodes choice conflict across moral decisions, with PCC-IFG connectivity predicting individual differences in self-consistency versus reward weighting. Neither purely 'emotional' nor purely 'cognitive.'" color={C.teal} />
              <ResearchCallout year="2025" title="Military Training Modulates Moral Neural Systems" finding="Caspar, Rovai, Lo Bue, and Cleeremans, 'Neural correlates of the sense of agency in free and coerced moral decision-making among civilians and military personnel' (Cerebral Cortex 35(3), bhaf049), compared civilians and military cadets, finding training substantially modulates reliance on cognitive versus emotional moral subsystems. Moral cognition is not neurologically fixed." color={C.teal} />
              <ResearchCallout year="2024" title="Moral Values Encoded Subcortically" finding="Farmani, Sharifi, and Ghazizadeh, 'Robust memory of face moral values is encoded in the human caudate tail' (Scientific Reports 14, 63085) demonstrated that moral value memories for faces are encoded subcortically in the caudate tail — not the cortical areas dual-process theory privileged." color={C.teal} />
              <ResearchCallout year="2025" title="Four-Dimensional Neural Space for Moral Inference" finding="A bioRxiv preprint identified four dimensions of moral processing — virtue, vice, hierarchy, and rebellion — with the temporoparietal junction activated across all moral dimensions during naturalistic film viewing. Morality in the brain looks high-dimensional, not binary." color={C.teal} />
              <ResearchCallout year="2025" title="Dual Process 2.0 for Intentionality" finding="A Frontiers in Psychology study (16, 1451590) used cognitive load to test the Dual Process Model 2.0 for intentionality attribution, finding cognitive load reduced positive-side-effect intentionality attributions consistent with System 2 involvement — offering qualified support in a specific domain." color={C.teal} />
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.18}>
            <Expandable title="The Trolley Problem Evolves — and Exits the Tracks" color={C.ocean} tag="Applied Ethics">
              <p>Trolley problem research has shifted primarily toward autonomous vehicle ethics — and in doing so, has revealed the paradigm's limits:</p>
              <ResearchCallout year="2025" title="Moving Beyond the Trolley Paradigm" finding="Cecchini, Brantley, and Dubljević, 'Moral judgment in realistic traffic scenarios: moving beyond the trolley paradigm' (AI & Society 40, 1037–1048), argued the trolley dilemma excludes character-based considerations and cannot address low-stakes mundane scenarios. They propose the Agent-Deed-Consequences (ADC) model as a more complete framework." color={C.ocean} />
              <ResearchCallout year="2024" title="The Default Loss Assumption Fails" finding="A World Electric Vehicle Journal analysis (15(9), 404) demonstrated the 'default loss assumption' required for the trolley problem does not hold in autonomous driving design — AVs are engineered to avoid loss, not to distribute it." color={C.ocean} />
              <ResearchCallout year="2025" title="ERP Evidence from Moral Machine" finding="A Scientific Reports ERP study (15, 16048) expanded the Moral Machine experiment with EEG, finding increased P3 and late positive potential amplitudes when AI decisions were incongruent with participants' moral preferences. People have detectable neural responses to AI moral decisions they disagree with." color={C.ocean} />
              <ResearchCallout year="2024" title="Framing Effects Are Dominant" finding="An expanded Moral Machine survey (Ethics and Information Technology, PMC 11078731) showed people's moral preferences shift rapidly with minor framing changes — cautioning against using simplified dilemmas as policy input for AVs." color={C.ocean} />
              <p style={{ marginTop: 12 }}>Taken together, the field is recognizing that the trolley problem was a useful thought experiment for testing intuitions — but a bad foundation for real-world policy.</p>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Expandable title="Moral Psychology Meets AI Alignment" color={C.gold} tag="The Bridge">
              <p>This is where the thesis research becomes directly relevant to AI. The most significant bridge is <strong>Millière (2025)</strong>, "Normative conflicts and shallow AI alignment" in <em>Philosophical Studies</em> (DOI: 10.1007/s11098-025-02347-3).</p>
              <p style={{ marginTop: 12 }}>Drawing on dual-process theories, Millière argues:</p>
              <QuoteBlock
                quote="Current LLM alignment methods reinforce shallow behavioral dispositions rather than endowing LLMs with a genuine capacity for normative deliberation."
                attribution="Raphaël Millière"
                source="Philosophical Studies (2025)"
                color={C.gold}
              />
              <p>The argument: humans' Type 2 deliberative reasoning makes us resilient to adversarial manipulation of moral commitments. You can't easily jailbreak a human's ethics because we can reason about our reasons. <strong>LLMs lack this capacity</strong>, resulting in "shallow alignment" vulnerable to jailbreaking. Even reasoning-focused models (o1, DeepSeek R1) haven't solved this.</p>
              <p style={{ marginTop: 12 }}>A related Chinese paper (2025, <em>Journal of Psychological Science</em>, Beijing Normal University) proposes "dual-system moral architectures" explicitly emulating the interaction between intuitive and deliberative reasoning for AI alignment.</p>
              <p style={{ marginTop: 12 }}>A 2025 paper, "Moral disagreement and the limits of AI value alignment" (PMC 12628449), challenged the assumption that aggregating crowdsourced moral judgments can produce reliable AI alignment — arguing they fail both epistemic reliability and democratic legitimacy conditions.</p>
              <p style={{ marginTop: 12 }}><strong>The irony:</strong> My thesis argued that neuroscience illuminates but doesn't close the is–ought gap. A decade later, the same gap appears to be where AI alignment fails. The problem isn't that we don't know which moral theory is correct — it's that we lack any mechanism for AI systems to engage in genuine normative deliberation about conflicts.</p>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.22}>
            <Expandable title="Haidt's Pivot — From Moral Foundations to The Anxious Generation" color={C.coral} tag="Adjacent">
              <p>Jonathan Haidt — whose Moral Foundations Theory was an important contemporary of Greene's work — has pivoted. His 2024 book <em>The Anxious Generation</em> (Penguin Press) argues smartphones and social media have "rewired" childhood since the late 2000s, causing an epidemic of anxiety, depression, and self-harm among Gen Z.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, margin: "14px 0" }}>
                <StatCounter value={52} suffix="+ weeks" label="At #1 on NYT bestseller list" color={C.coral} />
                <StatCounter value={4} label="Proposed norms: no smartphones before 14, no social media before 16, phone-free schools, more real-world independence" color={C.gold} />
              </div>
              <p>The book catalyzed legislation including Australia's Online Safety Amendment (2025). Critics including Candice Odgers (<em>Nature</em>, 2024) argued the causal evidence is insufficient. Haidt's Moral Foundations Theory continues to develop through collaborators, but his public focus has shifted.</p>
              <p style={{ marginTop: 12 }}><strong>For this site's themes:</strong> Haidt's pivot matters because it connects moral psychology to education policy and technology in children's lives — exactly the junction where The Shortcut thought experiment lives. A follow-up book, <em>Life After Babel</em>, was due in early 2025.</p>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.24}>
            <Expandable title="The Is–Ought Gap: Philosophy vs. Neuroscience" color={C.gold}>
              <p>The deepest challenge remains Hume's is–ought gap: can descriptive facts about how moral judgments are generated ever determine which moral judgments are correct? Two defenses remain available to the normative theorist:</p>
              <p style={{ marginTop: 12 }}><strong>First:</strong> A defender of any normative theory can argue that their theory presupposes, asserts, or requires no particular concept of human psychology. The deontologist can argue they hold no requirement that all moral actions must result from cognitive brain processes, or that they must be completely absent of emotional input.</p>
              <p style={{ marginTop: 12 }}><strong>Second:</strong> A defender of normative ethics can argue that empirical claims have no effect on abstract moral theories. All the evidence shows is that we often <em>fail to follow</em> the requirements of their normative theory — which says nothing about the theory's validity.</p>
              <p style={{ marginTop: 12 }}>I suggest the value of moral psychology lies not in closing the is–ought gap, but in <strong>illuminating it</strong> — helping us see where our normative theories are rationalizations of unreliable intuitions, and where they genuinely track something worth caring about. This insight becomes critically important as AI forces us to confront entirely novel moral situations where our evolved intuitions may be especially unreliable guides.</p>
            </Expandable>
          </FadeIn>

          {/* ─── FULL THESIS CHAPTERS ─── */}
          <Divider label="The Full Thesis (Original 2013 Text)" />

          <FadeIn delay={0.06}>
            <BodyText>Click to expand any chapter. These are the original texts as submitted, preserved as-is. The 2023–2026 updates above should be read alongside them.</BodyText>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Expandable title="Chapter 1: Introduction — The Trolley Problem & Normative Ethics" color={C.ocean}>
              <p>Imagine that a trolley is moving swiftly down a track headed toward five unsuspecting people that are tied to the track and cannot escape. Now imagine you are standing next to a switch that can redirect the trolley to a different track. However, on this track there is one person standing on the rail. You now have a moral dilemma. Do you allow the trolley to continue down the track, resulting in the death of five, or do you pull the lever and redirect the trolley, saving the five but causing the death of the one person on the other track?</p>
              <p style={{ marginTop: 12 }}>Most people would say you should pull the lever, reasoning that it is better to save five lives at the cost of one. This answer is consistent with a well-known moral theory called utilitarianism. Utilitarianism states: the correct action is the one that produces the most good for the most people. Pulling the lever saves five at the cost of one, which produces the greatest good.</p>
              <p style={{ marginTop: 12 }}>But now consider this variation. The trolley is again moving down the track toward the five people, but this time you are standing on a footbridge above the tracks. You are unable to reach a lever, but there is a very heavy man standing next to you on the footbridge. The only way to stop the trolley from killing the five people is to push the large man off the footbridge. The large man will fall on the tracks in the path of the trolley. His weight is enough to bring the trolley to a stop and save the five, but the heavy man will be killed.</p>
              <p style={{ marginTop: 12 }}>Since the consequences are identical — if you pull the lever or push the man, five people will be saved and one will be killed — utilitarianism requires you to push the large man off the footbridge. The problem is that most people find it morally unacceptable to push the man. We have encountered a case where the utilitarian cannot account for our common moral intuition.</p>
              <p style={{ marginTop: 12 }}>Perhaps moral philosophy can provide us with a normative theory that accounts for the commonly held belief in the footbridge case. Deontological ethics may provide just such a theory. Broadly speaking, deontologists argue that our moral choices cannot be justified by their consequences; rather, an action is right if and only if it conforms with a correct moral rule or principle. Kant argues there is one principle that everyone must follow: the "categorical imperative." One formulation tells us that we can never treat someone else merely as "a means to an end."</p>
              <p style={{ marginTop: 12 }}>If we push the man, we intend for him to be hit by the train. His death is the means to our end of saving the five. But in the trolley case, we do not intend to kill the person on the other track — it is a foreseeable side effect. If that person gets off the track before the train arrives, all the better.</p>
              <p style={{ marginTop: 12 }}>Before we become moral nihilists, we should consider the possibility that philosophers have been looking at the problem the wrong way. All of these normative theories have assumed that our responses to moral dilemmas are correct and the theory needs to develop principles that can justify our responses. But what if this assumption is misguided — what if some of these moral intuitions that we believed to be reflecting rationally discoverable moral truths are in fact caused by morally irrelevant features? Recent research in moral psychology suggests we need to reexamine the role our initial moral responses play in our normative theories.</p>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Expandable title="Chapter 2: Moral Psychology — The Brain Behind the Dilemma" color={C.ocean}>
              <p>The normative explanations offered by moral philosophers attempting to solve the trolley problem have been insufficient. But moral psychologists are offering a different explanation, and the answer can be found in the brain. While philosophers had only been able to speculate on the origins of ethics, cognitive neuroscience is providing us a way to see the underlying influences of human morality, using behavioral experiments, functional neuroimaging (fMRI), transcranial magnetic stimulation (TMS), and other methods.</p>
              <p style={{ marginTop: 12 }}>Initially research was driven by the belief that moral cognition could be recognized as a distinct process in the brain. However, Young and Dungan (2010) point out that this focus quickly shifted "as research revealed morality to rely on multiple domain-general processes, housed in many parts of the brain." This shift resulted in research examining how our different moral judgments in the trolley problems may reflect two distinct brain processes.</p>
              <p style={{ marginTop: 12 }}>Joshua Greene supports what he calls a "dual-process" theory of moral judgment. According to this theory, "characteristically deontological judgments are driven by automatic emotional responses, while characteristically utilitarian judgments are driven by controlled cognitive processes" (Greene, 2009). Greene uses fMRI data to study what is happening in the brain while participants make their moral judgments.</p>
              <p style={{ marginTop: 12 }}>He proposes the reason people respond so differently to the two cases has to do with emotion. Deontological judgments — those emphasizing "rights" and "duties" — like those in the footbridge case are emotionally salient and driven by an emotionally high response. Consequentialist judgments tend to be driven by "cognitive" processes: representations that are inherently neutral, not automatically triggering particular behavioral responses.</p>
              <p style={{ marginTop: 12 }}>Initially Greene hypothesized the reason for the emotionally high response in the footbridge case is that it requires you to be "up close and personal" to the heavy man, whereas pulling a lever is impersonal. Greene et al. (2009) later revised their definition to "personal force": the agent applies personal force when the force that directly impacts the other is generated by the agent's muscles.</p>
              <p style={{ marginTop: 12 }}>From an evolutionary standpoint, the belief that our intuitive responses reflect emotional responses makes sense. The "up close and personal" violence during the time of our primitive ancestors would explain our innate aversion to certain forms of interpersonal violence, as this response may have regulated behavior "of creatures who are capable of intentionally harming one another, but whose survival depends on cooperation and individual restraint" (Greene, p. 11). De Waal (1996) and Haidt (2001) support this with evidence from great apes, whose actions within social communities seem regulated not through moral reasoning, but by emotions such as anger, empathy, appreciation, and fairness.</p>
              <p style={{ marginTop: 12 }}>Sure enough, what resulted in the experiments was exactly what the hypothesis predicted (Greene and Haidt, 2002; Greene et al., 2001). When presented the footbridge case, brain areas associated with emotion (the amygdala, ventromedial prefrontal cortex, and posterior cingulate) were more active. For hard dilemmas, subjects who made utilitarian choices had higher activity in the anterior DLPFC and right inferior parietal lobe than those making non-utilitarian choices.</p>
              <p style={{ marginTop: 12 }}>Greene's argument against deontology becomes clear: When making moral judgments, we often rely on intuitions. If morally irrelevant features produce these intuitions, then they are not reflecting a rationally discoverable moral truth. Empirical evidence suggests deontological intuitions are produced by emotional reactions to "up close and personal" features. These emotional responses are simply a byproduct of human evolution. Therefore, deontological intuitions do not reflect a rationally discoverable moral truth. Any attempt to justify them amounts to mere confabulation.</p>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.12}>
            <Expandable title="Chapter 3: Objections — Kamm's Counter-Arguments" color={C.ocean}>
              <p>F.M. Kamm disputes Greene's argument in her article "Neuroscience and Moral Reasoning: A Note on Recent Research." I address two of Kamm's concerns here.</p>
              <p style={{ marginTop: 12 }}>Greene's argument implies that for any judgment to be considered correct, it must be produced by cognitive centers of the brain. Consequentialist judgments — those deeming it permissible to turn the trolley and push the large man — are produced by cognitive centers. Thus, consequentialist judgments are correct.</p>
              <p style={{ marginTop: 12 }}>It should be pointed out that Greene phrases the trolley problems in terms of "appropriateness" or "inappropriateness" — a question of permissibility. But as Kamm notes, the question should ask if someone has a <em>duty</em> to perform the action. Although someone may say it is permissible to turn the trolley, "this does not imply that they think there is a duty to do so" (339). Only if respondents judge there is a duty would this count as genuinely consequentialist.</p>
              <p style={{ marginTop: 12 }}>Kamm also proposes experiments with amplified efforts — asking whether one would have a duty to turn the trolley upon oneself to save five. If respondents judge there is no duty (as Hauser has reported), and these judgments are still produced by cognitive centers, then correct judgments would be inconsistent with consequentialism. Kamm concludes that correct moral judgments are inconsistent with consequentialism.</p>
              <p style={{ marginTop: 12 }}>I argue Kamm's conclusion is not justified. She only considers act consequentialism. Other forms of consequentialism explicitly deny any claim that one must always perform the action producing the most good. Take Michael Slote's satisficing consequentialism (1984): we are not obligated to maximize the good, only to create <em>enough</em> utility. The hotel manager who provides a stranded family a room — but not the best room — has acted in a morally acceptable way. It follows: judgments that there is no duty to turn the trolley or push the large man are not essentially inconsistent with consequentialism.</p>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.14}>
            <Expandable title="Chapter 4: Replies — Greene's Theory Survives (With Caveats)" color={C.ocean}>
              <p>Kamm modifies the footbridge case to create the <em>trapdoor</em> case: the heavy man stands on a trapdoor, and you press a remote button to open it. The heavy man falls onto the tracks and is killed by the trolley. Kamm points out that moral philosophers who opposed pushing the man will also oppose pressing the button — yet the harm is not "up close and personal." Since we still make a deontological judgment in this impersonal case, deontological judgments do not only track "up close and personal" features.</p>
              <p style={{ marginTop: 12 }}>I argue this is a minor issue to Greene's general argument. Kamm successfully refutes the claim that "up close and personal" features are the <em>only</em> features triggering emotional centers. Nevertheless, it is not what <em>triggers</em> the emotional responses that matters, but the emotional responses themselves. Greene's primary point — which the trapdoor case does not refute — is that deontological responses are rooted in morally irrelevant emotional reactions to situations, <em>no matter what causes the emotional reaction</em>.</p>
              <p style={{ marginTop: 12 }}>Here I offer Kamm a stronger argument. Since there is currently no fMRI data for the trapdoor case, Kamm is only hypothesizing that this judgment is generated by emotional centers. I believe Greene would have exceptional difficulty explaining hypothetical data showing the judgment in the trapdoor case is generated by <em>cognitive</em> centers. This would illustrate that deontological judgments could be generated by cognitive centers of the brain — showing they are not simply the product of morally irrelevant features, which is the entire foundation of Greene's argument against deontology.</p>
              <p style={{ marginTop: 12 }}>There are two ways this defense can proceed. First, argue that deontological theory holds no requirement that all moral actions must result from cognitive brain processes. Second, argue that empirical claims have no effect on abstract moral theories — the evidence only shows we often fail to follow the theory's requirements, which says nothing about the abstract theory itself. The problem lies in where empirical evidence connects with abstract normative theory. Greene believes it disproves a key premise; others may argue it simply demonstrates we are bad at following the theory.</p>
            </Expandable>
          </FadeIn>

          <FadeIn delay={0.16}>
            <Expandable title="Chapter 5: Conclusions" color={C.ocean}>
              <p>This thesis set out to explore the complex relationship between empirical moral psychology and normative ethical theory. The central question — whether findings from neuroscience and experimental philosophy can (or should) influence prescriptive theories — remains genuinely contested.</p>
              <p style={{ marginTop: 12 }}>Joshua Greene's dual-process theory offers a compelling descriptive account of why we respond differently to the trolley and footbridge dilemmas. The fMRI evidence showing differential activation of emotional versus cognitive brain regions provides a plausible explanation for our divergent intuitions. More provocatively, Greene argues this evidence has normative implications: if deontological intuitions are driven by evolutionarily contingent emotional responses, they may not reflect rationally discoverable moral truths.</p>
              <p style={{ marginTop: 12 }}>F.M. Kamm's objections offer important correctives. Her experimental proposals highlight that Greene's framing in terms of permissibility rather than duty may misidentify subjects as consequentialists. And her trapdoor case challenges the claim that only "up close and personal" features trigger emotional responses.</p>
              <p style={{ marginTop: 12 }}>Yet as this thesis argues, neither challenge fatally undermines Greene's general theory. Kamm's permissibility objection overlooks positions like satisficing consequentialism. And while the trapdoor case broadens emotional triggers, it does not address Greene's core claim: that deontological judgments, whatever their proximate trigger, are rooted in morally irrelevant features.</p>
              <p style={{ marginTop: 12 }}>The more fundamental challenge remains philosophical rather than empirical: can descriptive facts about how moral judgments are generated ever determine what moral judgments are correct? The is–ought gap that Hume identified cannot be closed by neuroscience alone. Yet perhaps the value of moral psychology lies not in collapsing that gap, but in illuminating it — helping us see where our normative theories are rationalizations of unreliable intuitions, and where they genuinely track something worth caring about.</p>
            </Expandable>
          </FadeIn>

          {/* ─── VIDEOS ─── */}
          <Divider label="Key Videos" />
          <FadeIn delay={0.08}>
            <div className="grid-2">
              <div>
                <VideoEmbed id="yg16u_bzjPE" title="Joshua Greene - Moral Tribes" />
                <p style={{ fontSize: "0.8rem", color: C.textMuted, marginTop: 6 }}>Joshua Greene on dual-process theory and "Moral Tribes"</p>
              </div>
              <div>
                <VideoEmbed id="XgCHZ1G93iA" title="Scott Aaronson - Human Specialness" />
                <p style={{ fontSize: "0.8rem", color: C.textMuted, marginTop: 6 }}>Scott Aaronson — "Human Specialness in the Age of AI"</p>
              </div>
            </div>
          </FadeIn>

          {/* ─── REFERENCES ─── */}
          <Divider label="References" />
          <FadeIn delay={0.08}>
            <Expandable title="Complete Bibliography" color={C.gold}>
              <p style={{ color: C.gold, fontSize: "0.82rem", fontWeight: 600, marginTop: 8, marginBottom: 8 }}>Foundational Works</p>
              <RefItem>Cushman, F. & Greene, J.D. "Finding Faults: How Moral Dilemmas Illuminate Cognitive Structure." Oxford Handbook of Social Neuroscience (2011).</RefItem>
              <RefItem>De Waal, F. Good Natured: Origins of Right and Wrong. Harvard UP, 1996.</RefItem>
              <RefItem>Foot, P. "The Problem of Abortion and the Doctrine of Double Effect." Oxford Review 5 (1967).</RefItem>
              <RefItem>Greene, J.D. "The Secret Joke of Kant's Soul." Moral Psychology, Vol. 3. MIT Press, 2008.</RefItem>
              <RefItem>Greene, J.D. et al. "An fMRI Investigation of Emotional Engagement in Moral Judgment." Science 293 (2001).</RefItem>
              <RefItem>Greene, J.D. et al. "The Neural Bases of Cognitive Conflict and Control in Moral Judgment." Neuron 44.2 (2004).</RefItem>
              <RefItem>Greene, J.D. et al. "Pushing Moral Buttons: Personal Force and Intention." Cognition 111.3 (2009).</RefItem>
              <RefItem>Haidt, J. "The Emotional Dog and Its Rational Tail." Psychological Review 108.4 (2001).</RefItem>
              <RefItem>Kamm, F.M. "Neuroscience and Moral Reasoning: A Note on Recent Research." Philosophy & Public Affairs (2009).</RefItem>
              <RefItem>Kahane, G. "On the Wrong Track: Process and Content in Moral Psychology." Mind & Language (2012).</RefItem>
              <RefItem>Koenigs, M. et al. "Damage to the Prefrontal Cortex Increases Utilitarian Moral Judgements." Nature 446 (2007).</RefItem>
              <RefItem>Slote, M. "Satisficing Consequentialism." Proceedings of the Aristotelian Society 58 (1984).</RefItem>
              <RefItem>Thomson, J.J. "The Trolley Problem." Yale Law Journal 94 (1985).</RefItem>
              <RefItem>Young, L. & Dungan, J. "Where in the Brain Is Morality?" Social Neuroscience 7.1 (2012).</RefItem>

              <p style={{ color: C.gold, fontSize: "0.82rem", fontWeight: 600, marginTop: 20, marginBottom: 8 }}>2022–2026 Developments</p>
              <RefItem>Guzmán, R.A., Barbato, M.T., Sznycer, D., Cosmides, L. "A moral trade-off system produces intuitive judgments." PNAS 119.42 (2022).</RefItem>
              <RefItem>De Neys, W. "Advancing theorizing about fast-and-slow thinking." BBS 46, e111 (2023).</RefItem>
              <RefItem>Greene, J.D. "Dual-process moral judgment beyond fast and slow." BBS 46, e123 (2023).</RefItem>
              <RefItem>Frankish, K. "Toward dual-process theory 3.0." BBS 46, e122 (2023).</RefItem>
              <RefItem>Stanovich, K.E. & Toplak, M.E. "Exclusivity is exclusively in the past." BBS 46, e142 (2023).</RefItem>
              <RefItem>Greene, J.D. "The dual-process theory of moral judgment does not deny that people can make compromise judgments." PNAS 120.6, e2220396120 (2023).</RefItem>
              <RefItem>Cosmides, L. et al. "Reply to Greene: No version of the dual process model can explain rational performance." PNAS 120.24, e2220909120 (2023).</RefItem>
              <RefItem>Farmani, S., Sharifi, K., Ghazizadeh, A. "Robust memory of face moral values is encoded in the human caudate tail." Scientific Reports 14 (2024).</RefItem>
              <RefItem>Meta-analysis: "Effect of cognitive load, ego depletion, induction and time restriction on sacrificial dilemmas." Frontiers in Psychology 15, 1388966 (2024).</RefItem>
              <RefItem>Bammel, M. "Greene's dual-process moral psychology and the modularity of mind." Philosophical Psychology (2024).</RefItem>
              <RefItem>Haidt, J. The Anxious Generation. Penguin Press (2024).</RefItem>
              <RefItem>Xu & Wu. "Unraveling the neural basis of repeated moral decisions with mouse tracking and fMRI." Imaging Neuroscience, MIT Press (2025).</RefItem>
              <RefItem>Caspar, E.A. et al. "Neural correlates of the sense of agency in moral decision-making." Cerebral Cortex 35.3, bhaf049 (2025).</RefItem>
              <RefItem>Cecchini, D., Brantley, S., Dubljević, V. "Moving beyond the trolley paradigm for AV ethics." AI & Society 40 (2025).</RefItem>
              <RefItem>Millière, R. "Normative conflicts and shallow AI alignment." Philosophical Studies (2025).</RefItem>
              <RefItem>Gim, J. "A Unified Bayesian Model of Moral Judgment: From Greene's Dual-Process to Predictive Coding." Philosophy, Thought, Culture 48.2 (2025).</RefItem>
              <RefItem>Voelkel, J.G. et al. "Megastudy testing 25 treatments to reduce anti-democratic attitudes." Science 386, 290 (2024).</RefItem>
            </Expandable>
          </FadeIn>

          <ContinueExploring navigate={navigate} links={[
            { id: "ai-ethics", icon: "⚖️", title: "AI Ethics in Education", desc: "From is/ought to policy frameworks", color: C.gold },
            { id: "thought-experiments", icon: "💡", title: "Thought Experiments", desc: "Test your moral intuitions interactively", color: C.teal },
            { id: "phil-education", icon: "🏛️", title: "Philosophy in K–12", desc: "Research evidence for teaching philosophy", color: C.coral },
          ]} />
        </Narrow>
      </PageContainer>
    </div>
  );
}
