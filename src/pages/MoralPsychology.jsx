import { useState } from "react";
import { C } from "../theme.js";
import { FadeIn, Expandable, VideoEmbed, useAudio, SectionLabel, SectionTitle, Subtitle, Narrow, PageContainer, BodyText, RefItem } from "../components/shared.jsx";

// ─── Interactive Trolley Experiment ───
function TrolleyExperiment() {
  const [choice, setChoice] = useState(null);
  const [scenario, setScenario] = useState(0);
  const audio = useAudio();
  const scenarios = [
    { title: "The Trolley Problem", desc: "A runaway trolley is heading toward five people. You can pull a lever to divert it to a side track, where it will kill one person instead. Do you pull the lever?", options: ["Pull the lever", "Do nothing"],
      analysis: ["You chose the utilitarian response — sacrificing one to save five. Most people agree (about 85% in studies by Hauser et al., 2007). But why does the next scenario feel different?", "You chose not to intervene. Some argue that actively causing harm is worse than allowing it, even if more die. This aligns with deontological intuitions about the moral significance of action versus omission. Philosophers call this the Doctrine of Double Effect."] },
    { title: "The Footbridge Dilemma", desc: "Same trolley, same five people. But now you're on a footbridge. The only way to stop the trolley is to push a large person off the bridge onto the tracks. Do you push?", options: ["Push the person", "Don't push"],
      analysis: ["The math is identical (one for five), yet most find this harder. Greene's fMRI studies (2001, 2004) showed this activates emotional brain regions — the amygdala, ventromedial prefrontal cortex, and posterior cingulate cortex — that the lever scenario doesn't. This asymmetry is the empirical foundation of the dual-process theory.", "Most people (about 85%) share your intuition. The philosophical puzzle: if the outcome is identical, why does this feel so different? Greene argues evolved emotional responses to 'personal force' — where your muscles generate the force that harms — explain the discrepancy. A 2024 meta-analysis across 44 studies and 14,003 participants tested this claim."] },
    { title: "The AI Classroom Dilemma", desc: "An AI tutor provides every student with perfectly personalized education, outperforming human teachers on every measurable outcome. Should schools replace human teachers with AI?", options: ["Replace with AI", "Keep human teachers"],
      analysis: ["You prioritized outcomes — a utilitarian calculation. But what about what Gert Biesta calls 'subjectification' — becoming an autonomous moral agent through the irreducibly human encounter of education? A 2025 meta-analysis found moderate positive effects from AI tools (SMD = 0.45), but Microsoft Research warned that productivity gains do not equal learning gains.", "You valued the human element — what Matthew calls the is/ought distinction at its most urgent. Even if AI CAN match every capability, should it? Neil Selwyn's Should Robots Replace Teachers? (2019) and Sparrow & Flenady's 'Bullshit Universities' (2025) argue that economic pressures will push replacement regardless of normative arguments — making the philosophical case urgently practical."] },
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
            <button key={i} onClick={() => { setChoice(i); audio.playClick(); }} style={{ padding: "10px 22px", background: "rgba(200,152,48,0.07)", border: `1px solid rgba(200,152,48,0.2)`, borderRadius: 8, color: C.textPrimary, cursor: "pointer", fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.9rem", transition: "all 0.2s" }}>{opt}</button>
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
              <p style={{ color: C.textMuted, fontSize: "0.84rem", marginTop: 8, lineHeight: 1.7 }}>These dilemmas illustrate the core tension Matthew explores in his thesis: our moral intuitions feel authoritative, but neuroscience reveals they're shaped by evolutionary pressures and emotional responses. Understanding this doesn't tell us what's right — but it helps us reason more carefully about moral questions, including questions about AI.</p>
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
          <SectionLabel>Thesis Research</SectionLabel>
          <SectionTitle>Moral Psychology & Normative Ethics</SectionTitle>
          <Subtitle>Can neuroscience tell us what's morally right? My thesis explores how brain imaging research on moral judgment challenges — and illuminates — traditional ethical theories.</Subtitle>
        </FadeIn>

        <div style={{ marginTop: 32 }}><FadeIn delay={0.08}><TrolleyExperiment /></FadeIn></div>

        <Narrow>
          {/* ─── SYNTHESIZED OVERVIEW ─── */}
          <div style={{ marginTop: 40 }}>
            <FadeIn delay={0.06}>
              <Expandable title="Overview: The Core Question" defaultOpen={true}>
                <p>Philosophers have debated the nature of morality for millennia. Utilitarians say the right action maximizes well-being. Deontologists say certain actions are inherently right or wrong regardless of consequences. Virtue ethicists focus on character. But what if the intuitions that ground these theories are themselves products of morally irrelevant evolutionary pressures?</p>
                <p style={{ marginTop: 12 }}>This is the question raised by Joshua Greene's research in moral psychology — and the central question of this thesis. Using fMRI brain imaging, Greene showed that different moral judgments activate different brain systems, suggesting that the philosophical tension between utilitarian and deontological ethics may actually reflect a tension between underlying brain processes. The implications are profound: if our most deeply held moral convictions are products of evolutionary contingency, what happens to the philosophical frameworks built upon them?</p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.08}>
              <Expandable title="Greene's Dual-Process Theory">
                <p>Joshua Greene's fMRI research at Harvard revealed something striking: when people face moral dilemmas, different brain regions activate depending on the type of dilemma. "Personal" dilemmas (like pushing someone off a footbridge) engage emotional brain areas — the amygdala, ventromedial prefrontal cortex, and posterior cingulate cortex. "Impersonal" dilemmas (like pulling a lever) engage cognitive regions including the dorsolateral prefrontal cortex and inferior parietal lobes.</p>
                <p style={{ marginTop: 12 }}>Greene describes this as a "dual-process" model: deontological intuitions ("don't push!") are driven by automatic emotional responses, while utilitarian judgments ("save the most lives") are driven by controlled cognitive processes. The evolutionary explanation: our aversion to "up close and personal" violence likely regulated behavior among ancestors whose survival depended on cooperation and restraint within small groups (de Waal, 1996; Haidt, 2001).</p>
                <p style={{ marginTop: 12 }}>Greene later revised his definition of the triggering factor from "up close and personal" to "personal force" — where the agent's muscles generate the force that directly impacts the victim (Greene et al., 2009). Crucially, his argument against deontology runs: if morally irrelevant features (evolved emotional reactions) produce deontological intuitions, those intuitions don't reflect rationally discoverable moral truths. Any attempt to justify them amounts to "moral confabulation" — a rationally appealing story told after the fact.</p>
                <p style={{ marginTop: 12 }}><strong>Key evidence:</strong> When presented the footbridge case, brain areas associated with emotion were significantly more active. Subjects who made the utilitarian choice ("push") showed higher activity in the anterior DLPFC and right inferior parietal lobe, and had significantly longer reaction times — suggesting cognitive override of emotional resistance (Greene et al., 2001, 2004). Koenigs et al. (2007) provided causal evidence: patients with vmPFC damage made dramatically more utilitarian judgments, demonstrating these brain regions play a causal role.</p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.1}>
              <Expandable title="Kamm's Objections & My Analysis">
                <p><strong>Objection 1 — Permissibility vs. Duty:</strong> F.M. Kamm argues that Greene frames his trolley problems in terms of "permissibility" rather than "duty." Saying it's <em>permissible</em> to turn the trolley doesn't mean there's a <em>duty</em> to do so — and only a judgment of duty would count as genuinely consequentialist. Kamm proposes experiments where subjects are asked whether they have a duty to turn the trolley or push the large man, predicting that if they deny a duty, this would be inconsistent with consequentialism.</p>
                <p style={{ marginTop: 12 }}>I argue this objection overlooks the diversity of consequentialist positions. Michael Slote's satisficing consequentialism (1984) explicitly denies a duty to maximize good. Consider Slote's example: a hotel manager discovers a stranded family and provides them a room — but not the best room available. It would be counterintuitive to say she acted wrongly. She acted in a morally acceptable way without maximizing utility. Therefore, judgments denying a duty to turn the trolley or push the man are <em>not</em> necessarily inconsistent with consequentialism.</p>
                <p style={{ marginTop: 12 }}><strong>Objection 2 — The Trapdoor Case:</strong> Kamm modifies the footbridge scenario: the large man stands on a trapdoor, and you press a remote button to drop him. Despite it not being "up close and personal," philosophers still judge it wrong. This successfully broadens the triggers for emotional response beyond "personal force." However, I argue it doesn't undermine Greene's core claim. Greene's primary point is that deontological responses are rooted in morally irrelevant emotional reactions, <em>regardless of what triggers them</em>. What produced these emotional reactions is "a matter of evolutionary speculation" (Greene, p. 63).</p>
                <p style={{ marginTop: 12 }}><strong>My proposed argument for Kamm:</strong> I suggest Kamm could construct a stronger argument using the trapdoor case. If fMRI data showed the deontological judgment in the trapdoor case was generated by <em>cognitive</em> (not emotional) brain centers, this would directly challenge Greene's foundation — demonstrating that deontological judgments need not be products of morally irrelevant emotional features. This would show that deontological judgments can be generated by the very cognitive processes Greene associates with "correct" moral reasoning.</p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.12}>
              <Expandable title="The Is–Ought Gap: Philosophy vs. Neuroscience">
                <p>The deepest challenge remains Hume's is–ought gap: can descriptive facts about how moral judgments are generated ever determine which moral judgments are correct? Two defenses are available to the normative theorist:</p>
                <p style={{ marginTop: 12 }}><strong>First:</strong> A defender of any normative theory can argue that their theory presupposes, asserts, or requires no particular concept of human psychology. The deontologist can argue they hold no requirement that all moral actions must result from cognitive brain processes, or that they must be completely absent of emotional input.</p>
                <p style={{ marginTop: 12 }}><strong>Second:</strong> A defender of normative ethics can argue that empirical claims have no effect on abstract moral theories. All the evidence shows is that we often <em>fail to follow</em> the requirements of their normative theory — which says nothing about the theory's validity. The theory remains correct; we are simply bad at living up to it.</p>
                <p style={{ marginTop: 12 }}>I suggest the value of moral psychology lies not in closing the is–ought gap, but in <strong>illuminating it</strong> — helping us see where our normative theories are rationalizations of unreliable intuitions, and where they genuinely track something worth caring about. This insight becomes critically important as AI forces us to confront entirely novel moral situations where our evolved intuitions may be especially unreliable guides. As Millière (2025) argues in <em>Philosophical Studies</em>, the same gap between emotional intuition and rational deliberation that characterizes human moral judgment manifests in AI alignment as "shallow alignment" — behavioral compliance without genuine normative understanding.</p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.14}>
              <Expandable title="Recent Developments (2023–2026)" color={C.teal}>
                <p><strong>Greene's Own Revision (2023):</strong> In <em>Behavioral and Brain Sciences</em> (46, e123), Greene responded to Wim De Neys's target article by acknowledging that sacrificial moral dilemmas may not simply elicit competing "fast and slow" processes. He asked: "Are there even two processes? Or just two intuitions?" — but defended the core claim using lesion studies (Koenigs et al., 2007). The BBS exchange generated 34+ commentaries. Keith Frankish proposed "dual-process theory 3.0." David Melnikoff and John Bargh argued more radically that "the systems do not exist."</p>
                <p style={{ marginTop: 12 }}><strong>Bammel's Modularity Critique (2024):</strong> In <em>Philosophical Psychology</em> (DOI: 10.1080/09515089.2024.2444503), Moritz Bammel argued Greene's theory implicitly relies on a modular account of cognition (à la Fodor, 1983). Dynamical systems approaches in cognitive neuroscience reject strict modularity, conceiving the brain as a nonlinear system with constant plasticity. If we adopt this perspective, only non-exclusive dual-process theories survive.</p>
                <p style={{ marginTop: 12 }}><strong>The Compromise Judgments Challenge (2022–2023):</strong> Cosmides, Barbato, Sznycer, and Guzmán published in <em>PNAS</em> (2022, 119(42), e2214005119) showing compromise moral judgments — intermediate choices rather than binary deontological/utilitarian — satisfy the Generalized Axiom of Revealed Preferences (GARP), demonstrating rational coherence incompatible with either pure process. Greene responded; Cosmides et al. replied (2023) that "no version of the dual process model can explain rational performance by people who made compromise moral judgments."</p>
                <p style={{ marginTop: 12 }}><strong>Meta-Analytic Verdict (2024):</strong> A meta-analysis in <em>Frontiers in Psychology</em> (15, 1388966) tested Greene's model across 44 studies, 68 effect sizes, and 14,003 participants. The overall pooled effect was in the predicted direction but did not reach statistical significance. Among peer-reviewed studies, a small significant effect emerged (g = 0.08), but gray literature effects ran in the opposite direction — suggesting publication bias.</p>
                <p style={{ marginTop: 12 }}><strong>New Neuroimaging (2025):</strong> Xu and Wu (<em>Imaging Neuroscience</em>, MIT Press) found the precuneus stably encodes moral choice conflict. Caspar et al. (<em>Cerebral Cortex</em>) showed military training modulates reliance on cognitive versus emotional moral subsystems. A <em>bioRxiv</em> preprint identified a four-dimensional neural space for moral inference (virtue, vice, hierarchy, rebellion). The field is moving well beyond trolley paradigms.</p>
                <p style={{ marginTop: 12 }}><strong>AI Alignment Connection (2025):</strong> Millière's "Normative conflicts and shallow AI alignment" (<em>Philosophical Studies</em>) bridges moral psychology directly to AI safety, arguing that current alignment methods reinforce shallow behavioral dispositions without endowing LLMs with genuine normative deliberation — the same kind of System 2 reasoning that makes humans resilient to moral manipulation.</p>
              </Expandable>
            </FadeIn>
          </div>

          {/* ─── FULL THESIS CHAPTERS ─── */}
          <div style={{ marginTop: 48 }}>
            <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "1.15rem", marginBottom: 16 }}>Full Thesis Chapters</h3>
            <p style={{ color: C.textMuted, fontSize: "0.88rem", marginBottom: 20, lineHeight: 1.6 }}>Expand each chapter to read the complete text of the thesis as originally submitted (UNC Charlotte, 2013).</p>

            <FadeIn delay={0.06}>
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

            <FadeIn delay={0.08}>
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

            <FadeIn delay={0.1}>
              <Expandable title="Chapter 3: Objections — Kamm's Counter-Arguments" color={C.ocean}>
                <p>F.M. Kamm disputes Greene's argument in her article "Neuroscience and Moral Reasoning: A Note on Recent Research." I address two of Kamm's concerns here.</p>
                <p style={{ marginTop: 12 }}>Greene's argument implies that for any judgment to be considered correct, it must be produced by cognitive centers of the brain. Consequentialist judgments — those deeming it permissible to turn the trolley and push the large man — are produced by cognitive centers. Thus, consequentialist judgments are correct.</p>
                <p style={{ marginTop: 12 }}>It should be pointed out that Greene phrases the trolley problems in terms of "appropriateness" or "inappropriateness" — a question of permissibility. But as Kamm notes, the question should ask if someone has a <em>duty</em> to perform the action. Although someone may say it is permissible to turn the trolley, "this does not imply that they think there is a duty to do so" (339). Only if respondents judge there is a duty would this count as genuinely consequentialist.</p>
                <p style={{ marginTop: 12 }}>Kamm also proposes experiments with amplified efforts — asking whether one would have a duty to turn the trolley upon oneself to save five. If respondents judge there is no duty (as Hauser has reported), and these judgments are still produced by cognitive centers, then correct judgments would be inconsistent with consequentialism. Kamm concludes that correct moral judgments are inconsistent with consequentialism.</p>
                <p style={{ marginTop: 12 }}>I argue Kamm's conclusion is not justified. She only considers act consequentialism. Other forms of consequentialism explicitly deny any claim that one must always perform the action producing the most good. Take Michael Slote's satisficing consequentialism (1984): we are not obligated to maximize the good, only to create <em>enough</em> utility. The hotel manager who provides a stranded family a room — but not the best room — has acted in a morally acceptable way. It follows: judgments that there is no duty to turn the trolley or push the large man are not essentially inconsistent with consequentialism.</p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.12}>
              <Expandable title="Chapter 4: Replies — Greene's Theory Survives (With Caveats)" color={C.ocean}>
                <p>Kamm modifies the footbridge case to create the <em>trapdoor</em> case: the heavy man stands on a trapdoor, and you press a remote button to open it. The heavy man falls onto the tracks and is killed by the trolley. Kamm points out that moral philosophers who opposed pushing the man will also oppose pressing the button — yet the harm is not "up close and personal." Since we still make a deontological judgment in this impersonal case, deontological judgments do not only track "up close and personal" features.</p>
                <p style={{ marginTop: 12 }}>I argue this is a minor issue to Greene's general argument. Kamm successfully refutes the claim that "up close and personal" features are the <em>only</em> features triggering emotional centers. Nevertheless, it is not what <em>triggers</em> the emotional responses that matters, but the emotional responses themselves. Greene's primary point — which the trapdoor case does not refute — is that deontological responses are rooted in morally irrelevant emotional reactions to situations, <em>no matter what causes the emotional reaction</em>.</p>
                <p style={{ marginTop: 12 }}>Here I offer Kamm a stronger argument. Since there is currently no fMRI data for the trapdoor case, Kamm is only hypothesizing that this judgment is generated by emotional centers. I believe Greene would have exceptional difficulty explaining hypothetical data showing the judgment in the trapdoor case is generated by <em>cognitive</em> centers. This would illustrate that deontological judgments could be generated by cognitive centers of the brain — showing they are not simply the product of morally irrelevant features, which is the entire foundation of Greene's argument against deontology.</p>
                <p style={{ marginTop: 12 }}>There are two ways this defense can proceed. First, argue that deontological theory holds no requirement that all moral actions must result from cognitive brain processes. Second, argue that empirical claims have no effect on abstract moral theories — the evidence only shows we often fail to follow the theory's requirements, which says nothing about the abstract theory itself. The problem lies in where empirical evidence connects with abstract normative theory. Greene believes it disproves a key premise; others may argue it simply demonstrates we are bad at following the theory.</p>
              </Expandable>
            </FadeIn>

            <FadeIn delay={0.14}>
              <Expandable title="Chapter 5: Conclusions" color={C.ocean}>
                <p>This thesis set out to explore the complex relationship between empirical moral psychology and normative ethical theory. The central question — whether findings from neuroscience and experimental philosophy can (or should) influence prescriptive theories — remains genuinely contested.</p>
                <p style={{ marginTop: 12 }}>Joshua Greene's dual-process theory offers a compelling descriptive account of why we respond differently to the trolley and footbridge dilemmas. The fMRI evidence showing differential activation of emotional versus cognitive brain regions provides a plausible explanation for our divergent intuitions. More provocatively, Greene argues this evidence has normative implications: if deontological intuitions are driven by evolutionarily contingent emotional responses, they may not reflect rationally discoverable moral truths.</p>
                <p style={{ marginTop: 12 }}>F.M. Kamm's objections offer important correctives. Her experimental proposals highlight that Greene's framing in terms of permissibility rather than duty may misidentify subjects as consequentialists. And her trapdoor case challenges the claim that only "up close and personal" features trigger emotional responses.</p>
                <p style={{ marginTop: 12 }}>Yet as this thesis argues, neither challenge fatally undermines Greene's general theory. Kamm's permissibility objection overlooks positions like satisficing consequentialism. And while the trapdoor case broadens emotional triggers, it does not address Greene's core claim: that deontological judgments, whatever their proximate trigger, are rooted in morally irrelevant features.</p>
                <p style={{ marginTop: 12 }}>The more fundamental challenge remains philosophical rather than empirical: can descriptive facts about how moral judgments are generated ever determine what moral judgments are correct? The is–ought gap that Hume identified cannot be closed by neuroscience alone. Yet perhaps the value of moral psychology lies not in collapsing that gap, but in illuminating it — helping us see where our normative theories are rationalizations of unreliable intuitions, and where they genuinely track something worth caring about.</p>
              </Expandable>
            </FadeIn>
          </div>

          {/* ─── VIDEOS ─── */}
          <FadeIn delay={0.16}>
            <div style={{ marginTop: 40 }}>
              <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: C.textPrimary, fontSize: "1.1rem", marginBottom: 14, textAlign: "center" }}>Key Videos</h3>
              <div className="grid-2">
                <div><VideoEmbed id="yg16u_bzjPE" title="Joshua Greene - Moral Tribes" /><p style={{ fontSize: "0.8rem", color: C.textMuted, marginTop: 6 }}>Joshua Greene on dual-process theory and "Moral Tribes"</p></div>
                <div><VideoEmbed id="XgCHZ1G93iA" title="Scott Aaronson - Human Specialness" /><p style={{ fontSize: "0.8rem", color: C.textMuted, marginTop: 6 }}>Scott Aaronson — "Human Specialness in the Age of AI"</p></div>
              </div>
            </div>
          </FadeIn>

          {/* ─── REFERENCES ─── */}
          <FadeIn delay={0.18}>
            <div style={{ marginTop: 40 }}>
              <Expandable title="References & Bibliography" color={C.gold}>
                <RefItem>Cosmides, L. et al. "A moral trade-off system produces intuitive judgments that are rational and coherent." PNAS 119.42 (2022).</RefItem>
                <RefItem>Cosmides, L. et al. "Reply to Greene: No version of the dual process model can explain compromise judgments." PNAS 120.24 (2023).</RefItem>
                <RefItem>Cushman, F. & Greene, J.D. "Finding Faults: How Moral Dilemmas Illuminate Cognitive Structure." Oxford Handbook of Social Neuroscience (2011).</RefItem>
                <RefItem>De Waal, F. Good Natured: Origins of Right and Wrong. Harvard UP, 1996.</RefItem>
                <RefItem>Foot, P. "The Problem of Abortion and the Doctrine of Double Effect." Oxford Review 5 (1967).</RefItem>
                <RefItem>Greene, J.D. "The Secret Joke of Kant's Soul." Moral Psychology, Vol. 3. MIT Press, 2008.</RefItem>
                <RefItem>Greene, J.D. "Dual-process moral judgment beyond fast and slow." BBS 46, e123 (2023).</RefItem>
                <RefItem>Greene, J.D. et al. "The Neural Bases of Cognitive Conflict and Control in Moral Judgment." Neuron 44.2 (2004).</RefItem>
                <RefItem>Greene, J.D. et al. "Pushing Moral Buttons: Personal Force and Intention." Cognition 111.3 (2009).</RefItem>
                <RefItem>Haidt, J. "The Emotional Dog and Its Rational Tail." Psychological Review 108.4 (2001).</RefItem>
                <RefItem>Kamm, F.M. "Neuroscience and Moral Reasoning: A Note on Recent Research." Philosophy & Public Affairs (2009).</RefItem>
                <RefItem>Koenigs, M. et al. "Damage to the Prefrontal Cortex Increases Utilitarian Moral Judgements." Nature 446 (2007).</RefItem>
                <RefItem>Bammel, M. "Greene's dual-process moral psychology and the modularity of mind." Philosophical Psychology (2024).</RefItem>
                <RefItem>Millière, R. "Normative conflicts and shallow AI alignment." Philosophical Studies (2025).</RefItem>
                <RefItem>Slote, M. "Satisficing Consequentialism." Proceedings of the Aristotelian Society 58 (1984).</RefItem>
                <RefItem>Thomson, J.J. "The Trolley Problem." Yale Law Journal 94 (1985).</RefItem>
                <RefItem>Young, L. & Dungan, J. "Where in the Brain Is Morality?" Social Neuroscience 7.1 (2012).</RefItem>
              </Expandable>
            </div>
          </FadeIn>
        </Narrow>
      </PageContainer>
    </div>
  );
}
