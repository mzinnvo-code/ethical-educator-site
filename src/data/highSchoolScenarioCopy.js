const section = (label, text) => ({ label, text });

const reflection = (title, positions = []) => ({
  id: "synthesis",
  kicker: "Synthesis",
  title,
  synthesis: () => null,
  positions,
});

const lab = ({ discussion, fallacySpotting, argumentRepair, variationPrompt, related }) => ({
  discussion,
  fallacySpotting,
  argumentRepair,
  variationPrompt,
  related,
});

const kit = ({
  theme,
  packetSlug,
  objectives,
  warmUp,
  discussionPrompts,
  handout,
  exitTicket,
  reasoningExercise,
  relatedExperiments,
  extension,
  crossCurricular,
}) => ({
  philosophicalTheme: theme,
  packetSlug,
  objectives,
  warmUp,
  discussionPrompts,
  handout,
  exitTicket,
  reasoningExercise,
  relatedExperiments,
  extension,
  crossCurricular,
});

export const HIGH_SCHOOL_ORDER = [
  "deepfake-election",
  "biased-resume-ai",
  "autonomous-car-rider",
  "veil-of-ignorance",
  "platos-cave",
  "marys-room",
  "chinese-room",
  "experience-machine",
  "ring-of-gyges",
  "omelas",
  "drowning-child",
  "paperclip-maximizer",
  "ai-in-the-box",
  "simulation-argument",
];

export const HIGH_SCHOOL_THEME_ORDER = ["values", "knowledge", "reality", "reasoning"];

export const HIGH_SCHOOL_THEME_COPY = {
  values: {
    label: "Values",
    question: "What should matter most when real people can be helped, harmed, or ignored?",
    blurb: "Justice, fairness, duty, care, dignity, and the price of comfort.",
  },
  knowledge: {
    label: "Knowledge",
    question: "What counts as knowing, and how do we avoid being fooled?",
    blurb: "Evidence, media literacy, appearances, experience, and understanding.",
  },
  reality: {
    label: "Reality",
    question: "What makes a world, an experience, or a life real enough to matter?",
    blurb: "Simulations, authenticity, consciousness, and the pull of comfortable illusion.",
  },
  reasoning: {
    label: "Reasoning",
    question: "When arguments look powerful, what hidden move should we inspect?",
    blurb: "Paradoxes, probability, optimization, persuasion, and argument repair.",
  },
};

export const HIGH_SCHOOL_SCENARIO_COPY = {
  "deepfake-election": {
    title: "The Deepfake Dilemma",
    tagline: "A convincing fake appears before an election. The harder question is who should slow it down, and how.",
    philosophyTheme: "knowledge",
    secondaryThemes: ["values", "reasoning"],
    estimatedMinutes: 12,
    stages: [
      {
        id: "night-before",
        kicker: "Act 1 - the clip",
        title: "A video arrives before the facts do",
        storySections: [
          section("The situation", "It's 9:16 p.m. the night before a school-board election. A video appears to show one candidate mocking students with disabilities. The clip is already moving through parent groups, student chats, and local accounts before any reporter has touched it."),
          section("The pressure", "The clip looks almost real. The blinking is slightly off. The audio has a faint metallic edge. If it's genuine, voters deserve to know. If it's fake, sharing it could decide an election with a lie."),
          section("The question", "The first problem isn't whether the video is true. It's what a democratic community owes the truth when evidence moves slower than outrage."),
        ],
        prompt: "What should platforms, journalists, and ordinary citizens do in the first few hours?",
        options: [
          { label: "A", text: "Temporarily limit sharing until a basic authenticity check is complete.", reflection: "You protect election integrity by slowing the spread of possible harm. The cost is real: even a temporary limit hands someone power over public speech, and emergency powers have an ugly habit of becoming the new normal.", lens: "precautionary" },
          { label: "B", text: "Keep it online with a clear warning label and links to verification efforts.", reflection: "You respect public access to information. Labels travel slower than the image and the emotion behind it. You're choosing speech and trusting users to read the fine print. Most won't.", lens: "free-speech" },
          { label: "C", text: "Treat undisclosed election deepfakes as a distinct legal category, narrower than satire or parody.", reflection: "You're separating deception from protected political expression. That's a defensible line for the courts to draw. The hard part is writing the boundary clearly enough that it doesn't sweep up satire, opinion, or honest mistakes.", lens: "legal" },
          { label: "D", text: "Focus first on media-literacy duties: do not share, preserve the source, and ask what evidence would change your mind.", reflection: "You shifted the responsibility from institutions onto citizens as reasoners. That's slower than a takedown, and democracies depend on it. The risk: a society that asks for civic patience while a lie circulates may also be excusing the platforms that profit from the lie's reach.", lens: "civic-integrity" },
        ],
      },
      {
        id: "liars-dividend",
        kicker: "Act 2 - the reversal",
        title: "The liar's dividend",
        storySections: [
          section("The situation", "By midnight, experts say the clip is probably fake. A second problem appears almost immediately. The candidate now claims several older, genuine recordings are also AI fakes."),
          section("The pressure", "Deepfakes don't just create false evidence. They make real evidence easier to deny. The phrase 'that could be AI' becomes a universal shield for anyone caught on camera, regardless of what the camera actually caught."),
          section("The question", "A society can be harmed by believing fakes. It can also be harmed, possibly more, by becoming unable to trust anything at all."),
        ],
        prompt: "How should a community respond when the possibility of deepfakes is used to dismiss real evidence?",
        options: [
          { label: "A", text: "Require a chain of evidence: source, time, metadata, corroboration, and expert review.", reflection: "You're asking for epistemic discipline: source, time, metadata, corroboration, expert review. That's more than vibes. It's also exactly the work that takes longer than the news cycle gives you, which is part of why fakes win the first round.", lens: "epistemic-care" },
          { label: "B", text: "Put the burden on the person calling evidence fake to provide reasons, not just suspicion.", reflection: "You flipped the burden onto the person calling fakery. Doubt has to bring reasons. That refuses to let 'could be AI' work as a universal escape hatch. The challenge: how do you defend that rule when the accusation actually has merit?", lens: "burden-of-proof" },
          { label: "C", text: "Assume high-stakes media is unreliable until trusted institutions verify it.", reflection: "You're outsourcing trust to institutions. That cuts down on gullibility. It also makes citizens passive in exactly the moments when institutions are too slow or already too distrusted to help.", lens: "institutional-trust" },
        ],
        counterpoint: "Skepticism is healthy when it asks for reasons. It turns corrosive when it treats every inconvenient fact as equally doubtful.",
      },
      {
        id: "your-side",
        kicker: "Act 3 - the test",
        title: "When the fake helps your side",
        storySections: [
          section("The situation", "By morning, you learn the fake is damaging the candidate you oppose. A friend texts you: 'Even if the clip is fake, the candidate is awful. Why help them?'"),
          section("The pressure", "The dilemma has teeth now. Correcting the record helps someone you think would make the school worse. Letting the fake stand helps your side win."),
          section("The question", "The real test is whether truth is a principle you hold or a tactic you reach for when it's convenient."),
        ],
        prompt: "What should guide your response when misinformation benefits a cause you support?",
        options: [
          { label: "A", text: "Correct the falsehood, then argue against the candidate using real reasons.", reflection: "You corrected the lie and made your case on the merits. That preserves both civic integrity and political disagreement. You don't need lies to take a side. The trade: you spent political capital that, depending on the race, might have decided the election.", lens: "civic-integrity" },
          { label: "B", text: "Stay quiet because the larger outcome matters more than one misleading clip.", reflection: "You let the larger outcome do the moral work. That's consequentialist reasoning. It also quietly teaches your side that truth is only required when it doesn't cost you anything, which is a lesson the other side can use against you next cycle.", lens: "utilitarian" },
          { label: "C", text: "Publicly state the uncertainty and ask others to slow down too.", reflection: "You went public with the uncertainty itself. That models intellectual honesty without pretending to know more than the evidence supports. The risk: in a fast news environment, 'I'm not sure' can read as evasion, even when it's the most honest thing on the timeline.", lens: "epistemic-humility" },
        ],
      },
      reflection("Truth, speech, and civic responsibility", [
        { name: "Media literacy", school: "Civic reasoning", view: "Democratic judgment depends on citizens who can separate claim, evidence, source, and motive before sharing." },
        { name: "Free-speech liberalism", school: "Political philosophy", view: "Open debate is valuable, but deepfakes test whether counterspeech can keep pace with synthetic deception." },
        { name: "Virtue ethics", school: "Character", view: "The question is not only what platforms should permit, but what kind of truth-teller each person is becoming." },
      ]),
    ],
    philosophyLab: lab({
      discussion: "Removal arguments emphasize urgent democratic harm. Speech arguments warn that emergency censorship can become a tool for suppressing inconvenient claims. The more useful question is what response is narrow enough to protect elections without treating all controversial media as forbidden, and who has the authority to decide that line in real time.",
      fallacySpotting: "Spot the false dilemma in this claim: 'Either we ban every political deepfake immediately, or democracy is over.' What third or fourth options does it erase?",
      argumentRepair: "Rewrite 'Only gullible people fall for deepfakes' as a stronger argument about speed, emotion, and verification.",
      variationPrompt: "Now imagine the media is satire, not deception. What detail changes your answer, and why?",
      related: ["Plato's Cave", "Are We in a Simulation?", "The Ring of Gyges"],
    }),
    teacherKit: kit({
      theme: "Knowledge - evidence, verification, and civic trust",
      objectives: [
        "Students will distinguish claims, evidence, verification, and emotional pressure in synthetic media.",
        "Students will compare removal, labeling, disclosure, legal, and media-literacy responses to election deepfakes.",
        "Students will explain the liar's dividend and test whether their principles remain consistent when misinformation helps their side.",
      ],
      warmUp: "On the board: 'A video can be fake. A denial can also be fake. How should a citizen decide what to believe?' Students list evidence they would need before sharing.",
      discussionPrompts: [
        "What is the difference between deception, satire, parody, and political persuasion?",
        "When is a label enough, and when does the harm require slowing or removal?",
        "How does the liar's dividend change the ethics of evidence?",
        "What personal rule would you accept even when it hurts your preferred side?",
      ],
      handout: "Deepfake evidence ladder: source, metadata, corroboration, expert check, motive, possible harm. Students apply it to one claim and name one principle they would keep even under partisan pressure.",
      exitTicket: "Explain the liar's dividend in one sentence, then name one action a responsible citizen should take before sharing suspicious media.",
      reasoningExercise: {
        fallacy: "False dilemma: 'ban all deepfakes or accept chaos.'",
        repair: "Add at least two intermediate policies and explain what value each protects.",
        variation: "Design a satire version and a malicious-deception version of the same clip.",
      },
      relatedExperiments: ["Plato's Cave", "Ring of Gyges", "Simulation Argument"],
      extension: "Students draft a one-page election media policy that distinguishes disclosure, labeling, removal, satire, and criminal fraud.",
      crossCurricular: [
        { subject: "Civics / Media Literacy", connection: "Election integrity, First Amendment tensions, source evaluation, and civic responsibility." },
        { subject: "ELA", connection: "Argument analysis: claim, evidence, warrant, counterclaim." },
      ],
    }),
  },

  "biased-resume-ai": {
    title: "The Biased Algorithm",
    tagline: "The model is race-blind and gender-blind. The outcomes are not.",
    philosophyTheme: "values",
    secondaryThemes: ["reasoning", "knowledge"],
    estimatedMinutes: 12,
    stages: [
      {
        id: "audit",
        kicker: "Act 1 - the pattern",
        title: "The spreadsheet no one wanted",
        storySections: [
          section("The situation", "A company uses an AI screener to rank applicants for internships. The vendor's pitch deck promises the tool never sees race or gender. Then an internal audit shows that women, Black applicants, and applicants from community colleges are being ranked lower at rates well outside the noise."),
          section("The pressure", "No one typed 'reject these groups' into the system. The model learned from past hiring decisions, old performance reviews, and proxies like school, gap years, and career path. The system did exactly what it was asked to do, and the result is discrimination."),
          section("The question", "A biased result can emerge without a biased instruction. That makes responsibility harder to locate. It doesn't make it less real."),
        ],
        prompt: "What should the company do first?",
        options: [
          { label: "A", text: "Pause the AI screener for high-stakes decisions until an independent audit explains the pattern.", reflection: "You stopped the bleeding and brought in outside scrutiny. The cost is speed and convenience, and possibly hiring slots that would have gone to candidates the tool was about to reject correctly. Precaution is rarely free.", lens: "precautionary" },
          { label: "B", text: "Keep using it while improving the training data and fairness metrics.", reflection: "You went technical: clean the training data, tune the fairness metrics. That's real work. It also means real people continue being harmed in production while you A/B test the patch.", lens: "technical-fix" },
          { label: "C", text: "Add human review for every rejection near the cutoff.", reflection: "You added human review at the cutoff. Borderline applicants get a second look. The reviewers carry their own assumptions, though, and 'I checked the AI's answer' tends to become 'I agreed with the AI's answer' faster than people expect.", lens: "procedural" },
          { label: "D", text: "Publicly disclose the audit and invite affected applicants to be reconsidered.", reflection: "You're treating transparency and repair as part of justice itself, not an optional PR move after the fact. Affected applicants can come back and be reconsidered. That commits the company to discovery costs it would much rather avoid.", lens: "remedial" },
        ],
      },
      {
        id: "opacity",
        kicker: "Act 2 - the black box",
        title: "The vendor will not open the model",
        storySections: [
          section("The situation", "The vendor calls the model proprietary. They offer a summary report and refuse to reveal anything that would let the company, the applicants, or the regulators understand how the rankings are actually produced."),
          section("The pressure", "The company wants efficiency. Applicants want a fair shot. The vendor wants secrecy. The law, meanwhile, can still hold the employer responsible for discriminatory outcomes even when the tool is outsourced."),
          section("The question", "Opacity isn't neutral when it blocks accountability. It's a choice with a winner."),
        ],
        prompt: "What standard should apply to high-stakes AI systems that affect opportunity?",
        options: [
          { label: "A", text: "No independent audit, no deployment.", reflection: "You put accountability before convenience. That's strict. It may also keep the company from using a tool that could have been made fairer with a real audit, instead of being shelved entirely.", lens: "accountability" },
          { label: "B", text: "Allow deployment only with outcome monitoring and appeal rights.", reflection: "You combined usefulness with due process: deploy, but with outcome monitoring and a real appeal path. Most appeal processes are real on paper. Whether yours actually overturns decisions, or just documents them more politely, depends on how it's staffed and who reviews.", lens: "due-process" },
          { label: "C", text: "Require explanations for every rejected applicant.", reflection: "You're requiring an explanation for every rejection. That honors dignity and contestability. The risk: with a complex model, the explanation can be technically true and morally misleading at the same time. 'Ranked low based on these features' doesn't say much when nobody knows what the features really mean.", lens: "transparency" },
        ],
        counterpoint: "A model can be technically complex without being morally exempt. 'We can't explain it' is not the same as 'no one is responsible.'",
      },
      {
        id: "repair",
        kicker: "Act 3 - after the harm",
        title: "The rejected applicants",
        storySections: [
          section("The situation", "The audit covers two years. Hundreds of candidates may have lost interviews they would otherwise have gotten. Some moved on. Some never knew a machine had screened them out."),
          section("The pressure", "Fixing the future data doesn't repair past exclusion. Re-opening every decision is expensive and may still not reveal who would have been hired in a fairer process."),
          section("The question", "Justice asks both how to stop the system and what is owed to the people the system has already harmed."),
        ],
        prompt: "What does repair require?",
        options: [
          { label: "A", text: "Re-review affected applications and offer new interviews where warranted.", reflection: "You committed to concrete repair: re-review the affected applications, offer real interviews where the case is strong. That's imperfect and expensive. It also treats lost opportunity as the real harm it is, not as a paperwork problem the company can apologize past.", lens: "remedial" },
          { label: "B", text: "Change the pipeline: recruitment, criteria, and human decision-making, not just the algorithm.", reflection: "You looked past the tool to the social pattern it was trained on. Fixing the algorithm without fixing the pipeline, the criteria, and the human judgment behind both is patching one leak in a boat with three more underneath.", lens: "structural" },
          { label: "C", text: "Publish the failure and require continuing audits before the tool can return.", reflection: "You went public with the failure. That makes the lesson available to other employers using similar tools. It also creates institutional memory that's harder to quietly forget the next time the marketing pitch sounds good.", lens: "transparency" },
        ],
      },
      reflection("Fairness when nobody wrote the bias down", [
        { name: "Algorithmic fairness", school: "AI ethics", view: "Fairness is not guaranteed by removing explicit protected categories; proxies and historical patterns can reproduce exclusion." },
        { name: "Disparate impact", school: "Civil rights law", view: "A practice can be discriminatory in effect even without an openly discriminatory intention." },
        { name: "Structural ethics", school: "Justice", view: "The algorithm may be a symptom of a wider institution that already defined merit unequally." },
      ]),
    ],
    philosophyLab: lab({
      discussion: "One argument pauses the tool: high-stakes systems must earn trust before they're allowed to make decisions about people. Another argues that stopping the tool may simply preserve older human biases without improving anything. The stronger response asks which combination of audit, appeal, repair, and institutional change actually reduces injustice, not which feels most decisive.",
      fallacySpotting: "Spot the appeal to ignorance: 'We did not tell the AI to discriminate, so the system is fair.' What evidence is missing?",
      argumentRepair: "Turn 'AI hiring is always biased' into a testable claim with criteria for evidence.",
      variationPrompt: "Now imagine the AI reduces one kind of bias but increases another. What should the company do, and how would you defend the trade?",
      related: ["Veil of Ignorance", "Omelas", "Drowning Child"],
    }),
    teacherKit: kit({
      theme: "Values - fairness, accountability, and repair",
      objectives: [
        "Students will explain how historical data and proxy variables can reproduce discrimination.",
        "Students will distinguish technical fixes from procedural, legal, and structural responses.",
        "Students will evaluate what repair is owed after an automated system has already caused harm.",
      ],
      warmUp: "Ask: 'If a rule never mentions race or gender but produces unequal results, what would you need to know before calling it fair or unfair?'",
      discussionPrompts: [
        "What is the difference between biased intent and biased impact?",
        "When should proprietary technology lose the privilege of secrecy?",
        "What counts as a meaningful appeal when a machine made the first cut?",
        "How far back should repair go when past decisions were automated?",
      ],
      handout: "AI accountability map: decision point, affected people, evidence of harm, possible proxy variables, audit requirement, appeal right, repair action.",
      exitTicket: "Name one reason 'the model never saw race or gender' does not settle the fairness question.",
      reasoningExercise: {
        fallacy: "Appeal to ignorance: assuming fairness because explicit bias was not found.",
        repair: "Write a stronger argument that uses outcome data and a clear standard for fairness.",
        variation: "Design a case where the model improves average accuracy but worsens equity for one group.",
      },
      relatedExperiments: ["Veil of Ignorance", "Omelas", "Drowning Child"],
      extension: "Students write a mock public disclosure explaining what went wrong, what evidence supports it, and what repair will be offered.",
      crossCurricular: [
        { subject: "Statistics", connection: "Base rates, false positives, disparate impact, and subgroup analysis." },
        { subject: "Civics / Law", connection: "Equal opportunity, accountability, and due-process norms." },
      ],
    }),
  },

  "autonomous-car-rider": {
    title: "Your Self-Driving Car",
    tagline: "It is easy to admire sacrifice in the abstract. It is harder when the car is yours.",
    philosophyTheme: "values",
    secondaryThemes: ["reasoning"],
    estimatedMinutes: 12,
    stages: [
      {
        id: "purchase",
        kicker: "Act 1 - the contract",
        title: "The rule inside the car",
        storySections: [
          section("The situation", "Your family is shopping for a self-driving car. Buried in the safety settings is a single sentence of policy: in unavoidable crashes, the vehicle will minimize expected loss of life, even if that means sacrificing the passengers it's carrying."),
          section("The pressure", "Most people praise that rule when they imagine themselves as bystanders on a sidewalk. Far fewer want to buy a car that might choose against them on a Tuesday morning."),
          section("The question", "Moral judgment shifts when a principle moves from a survey answer into a machine you trust with your body."),
        ],
        prompt: "What kind of crash rule should autonomous vehicles be allowed to use?",
        options: [
          { label: "A", text: "Minimize total expected harm, even when passengers bear the cost.", reflection: "You took the consequentialist line: minimize total expected harm, full stop. Clean on paper. Also exactly the rule most people resist buying for their own family, which is itself evidence about how much weight the rule can carry in practice.", lens: "utilitarian" },
          { label: "B", text: "Protect passengers because the car has a special duty to those who entrusted themselves to it.", reflection: "You leaned on role-based responsibility: the car owes a special duty to whoever trusted themselves to it. There's a serious tradition behind that move. There's also a problem: a public road isn't a private moral universe, and a pedestrian doesn't consent to a stranger's loyalty rule.", lens: "partialism" },
          { label: "C", text: "Require public safety standards rather than consumer-selectable moral settings.", reflection: "You said no consumer-selectable moral settings. That prevents a marketplace of selfish algorithms. The hard question becomes who actually writes the standard, since 'public safety experts' is doing a lot of quiet work in that sentence.", lens: "procedural" },
          { label: "D", text: "Invest first in design that makes forced-choice crashes rarer.", reflection: "You asked why we're encoding trolley cases instead of engineering them out of existence. Avoidance isn't evasion if it actually reduces real risk. The catch: 'design it away' has been an answer for years, and the dilemmas still keep showing up.", lens: "design-out" },
        ],
      },
      {
        id: "moral-machine",
        kicker: "Act 2 - the survey",
        title: "Millions of answers, no single world",
        storySections: [
          section("The situation", "Your class studies a global survey about autonomous-vehicle dilemmas. Most respondents prefer saving more lives. The patterns also differ across cultures, ages, and social assumptions in ways that make a single global rule hard to justify."),
          section("The pressure", "If public preferences vary, should cars reflect local majority values? Universal safety principles? Professional engineering codes? Some hybrid no one has tried yet?"),
          section("The question", "A democratic vote can reveal what people think. It doesn't automatically prove what machines should do."),
        ],
        prompt: "How much should public preference shape autonomous-vehicle ethics?",
        options: [
          { label: "A", text: "Use public preference as evidence, but not as the final rule.", reflection: "You treated public preference as evidence, not the final rule. That respects democratic input while admitting majority opinion can be morally flawed. The line between 'evidence' and 'rule' will get harder to hold the louder the majority gets.", lens: "deliberative" },
          { label: "B", text: "Let local communities set values because they live with the risks.", reflection: "You let local communities set values because they live with the risks. That has cultural legitimacy on its side. It also means a community can vote itself into a rule that violates universal rights, and the engineers have to decide which authority wins.", lens: "communitarian" },
          { label: "C", text: "Follow professional safety codes and human-rights constraints even against majority preference.", reflection: "You handed professional codes and rights claims a gatekeeping role over majority preference. That protects against majority cruelty. It also creates the conditions for technocratic distance from the public, which is its own slow-motion legitimacy problem.", lens: "rights-based" },
        ],
        counterpoint: "A survey can tell us what people prefer when asked. It can't, on its own, tell us which preferences deserve to become code.",
      },
      {
        id: "accountability",
        kicker: "Act 3 - after the crash",
        title: "The explanation no one wants",
        storySections: [
          section("The situation", "A crash happens. The car followed its certified rule. Someone dies anyway. The passenger's family blames the company. Pedestrians blame the owner. Engineers say the system behaved exactly as designed, which is part of the problem."),
          section("The pressure", "When a human driver makes a tragic choice, we ask about judgment. When a machine acts, we ask who encoded the judgment, and when, and under what review."),
          section("The question", "Responsibility spreads across designers, regulators, owners, and public standards. Spreading doesn't mean it disappears."),
        ],
        prompt: "Who should be accountable for a machine's moral rule?",
        options: [
          { label: "A", text: "The manufacturer, because it designed and marketed the rule.", reflection: "You put accountability on the manufacturer. That creates strong incentives for safety. Companies will argue, often correctly, that they followed the public standards they were given. Where the accountability stops is its own argument.", lens: "accountability" },
          { label: "B", text: "The regulator, because society approved the rule before deployment.", reflection: "You put it on the regulator. Public authority approved the rule, public authority owns the outcome. The catch: the family of the person who died still wants someone concrete to answer for it, and 'the rule was certified' isn't a face.", lens: "procedural" },
          { label: "C", text: "Accountability should be shared through audits, disclosure, insurance, and public review.", reflection: "You treated autonomous safety as a system: audits, disclosure, insurance, public review, shared liability. That's realistic. It's also much harder to explain on the news than 'the company is at fault,' which is part of why this approach loses political fights it should win.", lens: "systems" },
        ],
      },
      reflection("From moral intuition to machine rule", [
        { name: "Trolley ethics", school: "Moral philosophy", view: "The classic dilemma asks how consequences, duties, and intention interact when harm cannot be avoided." },
        { name: "Moral Machine research", school: "AI ethics", view: "Large surveys reveal patterns in public intuition, including cross-cultural variation, but do not settle what code should do." },
        { name: "Engineering ethics", school: "Professional responsibility", view: "Engineers have duties to safety, transparency, and public welfare that cannot be reduced to consumer preference." },
      ]),
    ],
    philosophyLab: lab({
      discussion: "A utilitarian rule is attractive because it treats every life as countable. A passenger-protection rule is attractive because trust often depends on special obligations. A design-focused reply asks whether the most ethical crash rule is the one that makes the crash less likely in the first place. Each answer encodes a different theory of who the road belongs to.",
      fallacySpotting: "Spot the popularity fallacy: 'Millions of survey respondents chose this rule, so it must be the ethical rule.'",
      argumentRepair: "Make a stronger version of the public-preference argument that explains when public input should matter and when it should be constrained.",
      variationPrompt: "Now imagine the same crash involves a school bus, an emergency vehicle, or a rural road with no pedestrians. Which details should change the rule, and why?",
      related: ["Self-Driving Trolley", "Veil of Ignorance", "Paperclip Maximizer"],
    }),
    teacherKit: kit({
      theme: "Values - safety, duty, public trust, and design",
      objectives: [
        "Students will compare bystander judgment, passenger interest, and encoded machine rules.",
        "Students will evaluate the role of public preference, professional ethics, and regulation in autonomous-vehicle design.",
        "Students will explain why preventing forced-choice scenarios can be an ethical response rather than an escape.",
      ],
      warmUp: "Anonymous poll: 'Should a self-driving car sacrifice one passenger to save five pedestrians?' Then ask: 'Would your family buy that car?'",
      discussionPrompts: [
        "Why do answers change when you move from bystander to passenger?",
        "Should public surveys guide machine ethics? Why or why not?",
        "Who should approve crash rules before deployment?",
        "Is designing out the dilemma a philosophical answer or an engineering answer?",
      ],
      handout: "Crash-rule design brief: stakeholders, rule, value protected, predictable objection, public-review requirement, safety-design alternative.",
      exitTicket: "Name one difference between making a moral judgment in a survey and encoding that judgment into a vehicle.",
      reasoningExercise: {
        fallacy: "Ad populum: treating majority survey preference as proof of moral correctness.",
        repair: "Add constraints that explain when public preference should and should not guide design.",
        variation: "Write a crash case where the numbers are not the only morally relevant detail.",
      },
      relatedExperiments: ["Self-Driving Trolley", "Veil of Ignorance", "Paperclip Maximizer"],
      extension: "Students design a public review process for autonomous-vehicle safety rules, including what data must be disclosed.",
      crossCurricular: [
        { subject: "Engineering", connection: "Safety design, risk reduction, professional codes, and failure analysis." },
        { subject: "Statistics", connection: "Survey interpretation and the limits of preference data." },
      ],
    }),
  },

  "veil-of-ignorance": {
    title: "The Veil of Ignorance",
    tagline: "Design the rules before you know whether the rules will protect you.",
    philosophyTheme: "values",
    secondaryThemes: ["reasoning"],
    estimatedMinutes: 12,
    stages: [
      {
        id: "original-position",
        kicker: "Act 1 - behind the veil",
        title: "A rulebook without your name on it",
        storySections: [
          section("The situation", "Your class has been asked to design a new school from scratch: funding, discipline, course access, disability support, grading, privacy, and student voice. Everything is on the table."),
          section("The pressure", "Before you vote, the teacher adds Rawls's catch. Once the rules are set, you'll be randomly assigned a place inside the school. You might be advanced, struggling, wealthy, poor, popular, isolated, disabled, undocumented, or new to English. You don't get to know which."),
          section("The question", "The veil removes the information that would let you quietly rig the rules in your own favor."),
        ],
        prompt: "What principles should guide the school you design?",
        options: [
          { label: "A", text: "Guarantee equal basic liberties first: voice, safety, conscience, privacy, and fair process for everyone.", reflection: "You took Rawls's first principle: equal basic liberties come first, and they don't get traded away for convenience or for higher group averages. That's a strong claim. It also commits you to defending freedoms even when the cost in efficiency is real.", lens: "rights-based" },
          { label: "B", text: "Allow inequalities only when they improve the position of students who are worst off.", reflection: "You took the difference principle: inequalities are tolerated only if they actually improve the position of the worst-off. That's a high bar. Most existing inequalities don't meet it, which is part of what makes Rawls uncomfortable for almost everyone.", lens: "rawlsian" },
          { label: "C", text: "Maximize total achievement, even if some students receive much less.", reflection: "You went utilitarian. Higher averages, more total benefit. The veil asks the next question: would you accept that rule when you might be the person who gets sacrificed to raise the average? Most rational designers behind the veil flinch.", lens: "utilitarian" },
          { label: "D", text: "Maximize choice and freedom; unequal outcomes are acceptable if rules are fair.", reflection: "You took the libertarian line: maximize choice, accept unequal outcomes if the rules are fair. Critics ask whether freedom is meaningful when some students start with the option to do nothing and others with the option to do almost anything. The procedure was fair; the starting line wasn't.", lens: "libertarian" },
        ],
      },
      {
        id: "least-advantaged",
        kicker: "Act 2 - the assignment",
        title: "The veil lifts",
        storySections: [
          section("The situation", "The veil lifts. You're assigned to a school with old devices, large classes, limited counseling, and fewer advanced courses than the school across town."),
          section("The pressure", "Rules that sounded efficient from nowhere look different from somewhere. You can still defend them. You can't pretend the costs are abstract anymore."),
          section("The question", "Rawls thought fairness should be tested from the position you'd least want to occupy. The reveal makes that less of a thought experiment."),
        ],
        prompt: "What does this reveal about fair rule design?",
        options: [
          { label: "A", text: "The best rules are those you can defend to the least advantaged person affected by them.", reflection: "You said the best rules are the ones defensible to the least advantaged person affected by them. That's Rawlsian fairness in plain language: justify the system from the bottom, not the top. It also raises the bar so high that most existing systems would fail it.", lens: "rawlsian" },
          { label: "B", text: "Rules should still reward effort and excellence, but only after basic fairness is secure.", reflection: "You combined merit with a floor of justice: reward excellence, but only after basic fairness is secure. That's defensible. The next fight is over where the floor belongs, and most political disagreement happens inside that question.", lens: "balanced" },
          { label: "C", text: "The veil hides too much. Real people have real attachments and should be allowed to favor their communities.", reflection: "You took the communitarian objection: the veil hides too much, and people have real attachments to families, communities, and projects that good rules should respect. That has force. It also makes the rules harder to justify to anyone the rules treat badly.", lens: "communitarian" },
        ],
        counterpoint: "The veil isn't meant to erase compassion for actual people. It's meant to prevent private advantage from disguising itself as justice.",
      },
      {
        id: "ai-policy",
        kicker: "Act 3 - the AI rule",
        title: "A policy before you know your access",
        storySections: [
          section("The situation", "Now apply the veil to an AI policy. You don't know whether you'll have paid AI tools at home, unreliable internet, a parent who can help, a disability accommodation, or a teacher suspicious of AI."),
          section("The pressure", "A policy that seems fair to students with resources can punish students without them. A policy that permits everything can hide unequal support behind the word 'choice.'"),
          section("The question", "Technology policy is also justice policy, whether or not anyone says so out loud."),
        ],
        prompt: "What AI policy would you choose from behind the veil?",
        options: [
          { label: "A", text: "Equal access, required disclosure, and assignments designed to show process.", reflection: "You're protecting opportunity and honesty at the same time: equal access, required disclosure, assignments that show process. That commits the school to providing the tools, not just policing how students use them. Schools usually want it the other way around.", lens: "equity" },
          { label: "B", text: "Strict limits until every student has comparable access and support.", reflection: "You put fairness ahead of innovation: no AI use until every student has comparable access and support. That's morally consistent. It may also freeze useful learning tools indefinitely, since 'comparable access' rarely arrives on a schedule anyone can name.", lens: "precautionary" },
          { label: "C", text: "Flexible teacher judgment with an appeal process for disputed cases.", reflection: "You preserved teacher judgment with an appeal path. That keeps human context in the picture. It also means a flexible policy without a real process can quietly become an uneven and biased one, and the students least likely to appeal are usually the students it hurts most.", lens: "procedural" },
        ],
      },
      reflection("Justice from no one's private advantage", [
        { name: "John Rawls", school: "A Theory of Justice, 1971", view: "Argued that fair principles are those chosen from an original position where no one knows their social place." },
        { name: "Liberty principle", school: "Rawls", view: "Equal basic liberties come first; they are not simply traded away to increase total welfare." },
        { name: "Difference principle", school: "Rawls", view: "Inequalities are justified only if they benefit those who are worst off." },
        { name: "Robert Nozick", school: "Libertarian critique", view: "Argued that patterned distribution can violate individual liberty and entitlement." },
      ]),
    ],
    philosophyLab: lab({
      discussion: "Rawls's thought experiment is powerful because it temporarily makes self-interest unavailable. Critics argue that the veil hides too much: real people care about families, communities, and projects, and a theory that excludes those attachments may be missing what justice is actually for. The debate is whether impartial fairness reveals justice or strips away morally important attachments.",
      fallacySpotting: "Spot the straw man: 'Rawls thinks everyone should have exactly the same life.' What does this misrepresent?",
      argumentRepair: "Rewrite the criticism so it targets the difference principle accurately.",
      variationPrompt: "Design a veil-of-ignorance version for school discipline, course placement, or AI access. Where does the veil work hardest, and where does it strain?",
      related: ["Biased Algorithm", "Omelas", "Drowning Child"],
    }),
    teacherKit: kit({
      theme: "Values - justice, liberty, equality, and fair procedure",
      objectives: [
        "Students will explain Rawls's original position, veil of ignorance, liberty principle, and difference principle.",
        "Students will compare Rawlsian, utilitarian, libertarian, egalitarian, and communitarian responses.",
        "Students will apply the veil to a contemporary school or AI policy question.",
      ],
      warmUp: "Students draft one school rule they like. Then ask them to defend it after imagining they could occupy any student position affected by it.",
      discussionPrompts: [
        "What does the veil hide, and why does Rawls think hiding it helps?",
        "Why might parties behind the veil reject pure utilitarianism?",
        "What basic liberties should never be traded away for school efficiency?",
        "Where does the veil feel fair, and where does it feel too detached from real life?",
      ],
      handout: "Original-position policy sheet: rule, liberty protected, worst-off impact, inequality allowed, strongest objection, revision.",
      exitTicket: "Name Rawls's liberty principle or difference principle and apply it to one school policy.",
      reasoningExercise: {
        fallacy: "Straw man: claiming Rawls requires identical outcomes for everyone.",
        repair: "State the difference principle accurately before criticizing it.",
        variation: "Create a veil case for AI access, grading, discipline, or school funding.",
      },
      relatedExperiments: ["Biased Algorithm", "Omelas", "Drowning Child"],
      extension: "Students write a short constitution for an AI-enabled classroom from behind the veil.",
      crossCurricular: [
        { subject: "Civics", connection: "Rights, public policy, equality of opportunity, and due process." },
        { subject: "Economics", connection: "Inequality, incentives, public goods, and redistribution." },
      ],
    }),
  },

  "platos-cave": {
    title: "Plato's Cave",
    tagline: "The most dangerous shadow may be the one you are comfortable calling reality.",
    philosophyTheme: "knowledge",
    secondaryThemes: ["reality", "values"],
    estimatedMinutes: 12,
    stages: [
      {
        id: "inside",
        kicker: "Act 1 - the wall",
        title: "The shadows have names",
        storySections: [
          section("The situation", "Imagine people chained in a cave from childhood, able to see only the wall in front of them. Behind them, unseen puppeteers move objects in front of a fire, casting shadows. The prisoners name the shadows, argue about which one will come next, and build a whole culture around predicting them."),
          section("The pressure", "To the prisoners, the shadows aren't 'fake.' They're the only public world anyone has ever known. A person who doubts them sounds confused, arrogant, or dangerous, depending on how loudly they doubt."),
          section("The question", "Plato is asking whether education is just adding facts, or whether it's something stranger: turning the whole soul toward what's more real."),
        ],
        prompt: "What is the cave mainly a story about?",
        options: [
          { label: "A", text: "The duty to question appearances and seek deeper truth.", reflection: "You took Plato's realist reading. Appearances can be ordered by how fully they reveal reality, and the work of education is climbing that order. The cost: someone has to be in a position to judge the ranking, and that authority is exactly what democracies worry about.", lens: "platonic" },
          { label: "B", text: "The social comfort of shared illusion.", reflection: "You read the cave as psychology. People protect familiar beliefs because the beliefs are doing comforting work, even when the evidence threatens them. That's true, and humbling. It also leaves open whether some beliefs really are better than others, or whether all comfort is equal.", lens: "psychological" },
          { label: "C", text: "The danger of one group claiming it alone sees the truth.", reflection: "You raised the political question: who gets the authority to call other people trapped in shadows? Plato's answer was the philosopher-king. Modern readers tend to find that answer worse than the disease it was supposed to cure.", lens: "anti-authoritarian" },
          { label: "D", text: "The responsibility of education to help people turn around, not simply memorize more shadows.", reflection: "You read the allegory as a theory of education: the teacher's job is to help students turn, not just to load them with more shadows to memorize. That's a serious view of teaching. It also makes the teacher responsible for something philosophers still can't quite specify.", lens: "education" },
        ],
      },
      {
        id: "outside",
        kicker: "Act 2 - the ascent",
        title: "The painful light",
        storySections: [
          section("The situation", "One prisoner is freed. The fire hurts his eyes first. Daylight hurts more. Only slowly does he see objects, then the sky, then, finally, the sun itself."),
          section("The pressure", "Plato's sun stands for the Form of the Good: not one more fact, but the source that makes truth and value intelligible at all. The ascent isn't comfortable enlightenment. It's disorientation before understanding, and it doesn't feel like progress while it's happening."),
          section("The question", "If truth is painful at first, students may be resisting it for reasons deeper than laziness."),
        ],
        prompt: "What does the painful ascent suggest about learning?",
        options: [
          { label: "A", text: "Real learning can feel like losing the world before gaining a better one.", reflection: "You took Plato seriously: real learning can feel like losing the world before gaining a better one. Education on this view disrupts identity, not just memory. That's a heavier theory of teaching than most curricula admit to.", lens: "transformative" },
          { label: "B", text: "Pain is not proof of truth; difficult ideas still need evidence and humility.", reflection: "You resisted romanticizing the discomfort. False beliefs can be painful too, and so can being lied to by someone confident. Pain isn't evidence of truth. Difficult claims still owe you reasons and a chance to push back.", lens: "epistemic-care" },
          { label: "C", text: "Teachers should guide the turn, not shame students for loving the cave.", reflection: "You connected knowledge to care. The learner's attachment to the old world matters, and a teacher who shames the cave dweller for loving the wall isn't doing the work Plato asked them to do. Turning the soul is a relationship, not a lecture.", lens: "care" },
        ],
        counterpoint: "Not every uncomfortable claim is true. The cave teaches us to question appearances. It doesn't license every self-declared truth-teller to call other people prisoners.",
      },
      {
        id: "return",
        kicker: "Act 3 - the return",
        title: "Back into the algorithmic cave",
        storySections: [
          section("The situation", "The freed prisoner returns to the cave. His eyes no longer adjust to the dark. The others laugh at him, then turn angry. He can't simply upload daylight into their minds."),
          section("The pressure", "Now imagine the cave is an algorithmic feed: personalized news, recommendation loops, group identity, AI-generated media. Leaving means losing friends, losing certainty, losing the pleasure of being agreed with constantly."),
          section("The question", "If you think you see more clearly, what do you owe the people still inside? And what humility do you owe them about your own view?"),
        ],
        prompt: "What responsibility comes with believing you have seen beyond the shadows?",
        options: [
          { label: "A", text: "Return and teach, even when people resist.", reflection: "You took Plato's civic-duty answer. The freed prisoner has to return and teach, even when people resist. Knowledge carries obligation. The risk: the same logic gets used by people who haven't actually seen any sunlight, just a different cave.", lens: "civic-duty" },
          { label: "B", text: "Return carefully, because calling others trapped can become domination.", reflection: "You kept the duty to help and added humility about power. Calling other people trapped is always partly a claim about yourself. You can still try to teach, just not from the assumption that you've earned the right to do it without being questioned back.", lens: "epistemic-humility" },
          { label: "C", text: "Build exits: shared evidence practices, comparison tools, and spaces where changing your mind is safe.", reflection: "You translated the cave into civic design instead of heroic truth-telling. Build exits: shared evidence practices, comparison tools, spaces where changing your mind is socially safe. That's harder than being the freed prisoner. It's also more likely to actually help anyone get out.", lens: "design-out" },
        ],
      },
      reflection("Education as the difficult turn toward truth", [
        { name: "Plato", school: "Republic Book VII", view: "The cave describes education as turning the soul from shadows toward the Good, then returning for the sake of the city." },
        { name: "Form of the Good", school: "Platonic metaphysics", view: "The Good is the source of intelligibility and value, represented by the sun outside the cave." },
        { name: "Contemporary critique", school: "Epistemic justice", view: "Modern readers ask who gets to define truth and how to avoid turning enlightenment into domination." },
      ]),
    ],
    philosophyLab: lab({
      discussion: "Plato's allegory makes truth hierarchical: some forms of knowing are better than others. A democratic worry pushes back: people who claim to see the truth can become dangerous, especially when they believe they've earned the right to act on it. The challenge is to defend truth-seeking without handing unchecked power to self-appointed enlighteners.",
      fallacySpotting: "Spot the ad hominem: 'The freed prisoner looks ridiculous in the dark, so his report about the outside must be false.'",
      argumentRepair: "Turn 'everyone has their own truth' into a more careful claim about perspective, evidence, and reality.",
      variationPrompt: "Now design a modern cave using social media, school reputation, political identity, or AI-generated search results. Where would you look for the exit?",
      related: ["Deepfake Dilemma", "Mary's Room", "Simulation Argument"],
    }),
    teacherKit: kit({
      theme: "Knowledge - appearance, education, and responsibility",
      objectives: [
        "Students will explain the cave, the ascent, the Form of the Good, and the duty to return.",
        "Students will compare Platonic realism with constructivist and anti-authoritarian concerns.",
        "Students will apply the cave to algorithmic feeds, misinformation, and AI-mediated knowledge.",
      ],
      warmUp: "Ask students to write about one belief they changed because evidence, experience, or another person forced them to see differently.",
      discussionPrompts: [
        "What do the shadows, fire, ascent, sun, and return represent?",
        "Why might the freed prisoner be resisted or attacked?",
        "Who decides what counts as shadow and what counts as truth?",
        "What is our modern cave, and what would an exit look like?",
      ],
      handout: "Cave mapping chart: ancient image, philosophical meaning, modern parallel, risk, possible exit practice.",
      exitTicket: "What is one belief, habit, or feed that might be a shadow for you? What evidence would help you test it?",
      reasoningExercise: {
        fallacy: "Ad hominem: dismissing the returned prisoner because he seems strange.",
        repair: "Evaluate the claim about the outside using evidence rather than the messenger's appearance.",
        variation: "Write a cave scenario where the supposed truth-teller is wrong.",
      },
      relatedExperiments: ["Deepfake Dilemma", "Mary's Room", "Simulation Argument"],
      extension: "Students keep a one-week 'shadow journal' tracking claims they accepted quickly and what verification changed.",
      crossCurricular: [
        { subject: "ELA / Literature", connection: "Allegory, symbolism, dystopian fiction, and media ecosystems." },
        { subject: "Civics", connection: "Public reason, misinformation, echo chambers, and democratic responsibility." },
      ],
    }),
  },

  "marys-room": {
    title: "Mary's Room",
    tagline: "She knows every fact about color. Then she sees red. Then a real student asks the same question. Then an AI.",
    philosophyTheme: "knowledge",
    secondaryThemes: ["reality", "reasoning"],
    estimatedMinutes: 16,
    stages: [
      {
        id: "room",
        kicker: "Act 1 - all the facts",
        title: "The black-and-white expert",
        storySections: [
          section("The situation", "Mary is a brilliant scientist who has lived her entire life in a black-and-white room. She studies color through books, instruments, brain scans, and equations. She knows every physical fact about wavelengths, cones, neural pathways, and color language. Every one."),
          section("The pressure", "If physical science tells the complete story, Mary already knows everything there is to know about red. If she learns something new when she finally sees red, then experience may contain a kind of knowledge that facts alone do not capture."),
          section("The question", "This isn't a puzzle about color trivia. It's a challenge to physicalism, the view that all facts are ultimately physical facts."),
        ],
        prompt: "When Mary first sees a red rose, does she learn something new?",
        options: [
          { label: "A", text: "Yes. She learns what red is like from the inside.", reflection: "You took the knowledge argument seriously. Mary learns something new the first time she sees red. Conscious experience seems to add something facts alone missed. That's a serious challenge to physicalism. It's also been Jackson's argument since 1982, with one twist: Jackson himself later partly recanted.", lens: "qualia-realism" },
          { label: "B", text: "No new fact. She gains an ability to recognize, remember, and imagine red.", reflection: "You took the ability hypothesis: Mary gains new abilities (to recognize, remember, imagine red) without learning any new propositional facts. That's an elegant deflation of the case. It also asks the knowledge argument to define 'fact' more strictly than it usually wants to.", lens: "ability-hypothesis" },
          { label: "C", text: "No. If she truly knew every physical fact, nothing would surprise her.", reflection: "You went hard physicalist. If Mary really knew every physical fact, nothing should surprise her. The case quietly underestimates what 'complete physical knowledge' would include. The challenge: most people find that hard to even imagine, which is what gives the original case its grip.", lens: "physicalist" },
          { label: "D", text: "The word 'knows' is doing two jobs: knowing facts and knowing experience.", reflection: "You separated the senses of 'know.' Knowing facts and knowing-what-it's-like may simply be two different things. That dissolves part of the fight. It also commits you to defending the distinction every time a critic says you're just relabeling the original puzzle.", lens: "epistemic-pluralism" },
        ],
      },
      {
        id: "poem",
        kicker: "Act 2 - language reaches",
        title: "The best description of red",
        storySections: [
          section("The situation", "Before leaving the room, Mary reads the most vivid description of red ever written. She studies paintings described by experts. She hears music paired with red. She watches brain data from people who are seeing red in real time."),
          section("The pressure", "Language can prepare, suggest, provoke imagination. Whether even perfect description crosses the gap between knowing about an experience and having it is the open question."),
          section("The question", "The more powerful the description becomes, the harder it is to say exactly where experience begins, and the more interesting it gets that 'description' and 'experience' refuse to fully collapse into each other."),
        ],
        prompt: "Can description ever substitute for experience?",
        options: [
          { label: "A", text: "No. Description can point toward experience, but it cannot become the experience.", reflection: "You preserved the knowledge argument's force. Description can point toward experience but can't become it. Something it's like remains on the other side of even the most complete report. That's the Nagel-Chalmers line, and it's still hard to dislodge.", lens: "qualia-realism" },
          { label: "B", text: "Partly. Language can build concepts that shape what Mary notices when she finally sees red.", reflection: "You let knowledge be layered. Concepts shape what Mary notices when she finally sees red, so language isn't useless even if it isn't sufficient. That's the phenomenal-concept move. It also makes the line between description and experience fuzzier than the original argument needs.", lens: "phenomenal-concepts" },
          { label: "C", text: "Yes in principle, if the description includes every physical and functional detail.", reflection: "You went physicalist again. With every physical and functional detail, the description does cross the gap. The knowledge argument doesn't prove non-physical facts; it proves we can't easily imagine what complete physical knowledge would feel like. That's a real reply, even if it asks a lot of the word 'physical.'", lens: "physicalist" },
        ],
        counterpoint: "Be careful. 'I can't imagine how facts could explain experience' isn't yet proof that facts can't explain it. The limits of imagination aren't the limits of the world.",
      },
      {
        id: "riya",
        kicker: "Act 3 - into your real classroom",
        title: "Riya joins your class",
        storySections: [
          section("The situation", "Mary is a thought experiment. Riya is a real student who just joined your class. She was born without sight. She's fluent in the science of color, the cultural associations of red, the literary uses of color across every novel you've read this year."),
          section("The pressure", "Sitting next to you, Riya asks the obvious question: 'Do I know red?' Your answer about Mary now has a face attached to it. A view of knowing that locks Riya out has consequences in the room you're actually in."),
          section("The question", "Disability philosophers, including Susanna Siegel, have pressed hard on views that treat phenomenal experience as the only real knowledge. The Mary's Room intuition cuts cleanly. It also cuts through real people."),
        ],
        prompt: "What is the honest answer to Riya's question?",
        options: [
          { label: "A", text: "Yes. Her knowledge of red is real, built through language, science, and a lifetime of association.", reflection: "You refused to flatten Riya's hard-won understanding into a single visual channel she doesn't have. The cost: you've committed to a kind of knowing that an AI could also claim. The next act is going to push on exactly that.", lens: "knows" },
          { label: "B", text: "No. She knows about red, but not the redness of red.", reflection: "You held the line. Knowing about isn't knowing what it's like. Block, Chalmers, and the phenomenal-consciousness lineage agree. You'll need this distinction to do real work when AI starts describing its experience. You're also saying something heavy to Riya.", lens: "doesnt" },
          { label: "C", text: "Both. There are several kinds of knowing, and Riya has several.", reflection: "Generous, and it costs something. You now have to decide which kinds of knowing AI plausibly has and which it doesn't. The all-or-nothing shortcut is gone. Riya keeps her knowledge. The hard work of saying what kind starts now.", lens: "both" },
        ],
        counterpoint: "If phenomenal experience is the key to knowing red, then anyone who hasn't seen red is locked out of 'real' color knowledge. That's a heavy implication. Some philosophers defend it. Others reject it precisely because of who it locks out.",
      },
      {
        id: "ai",
        kicker: "Act 4 - fluent without seeing",
        title: "The model writes back",
        storySections: [
          section("The situation", "A large multimodal model has processed roughly two billion images, many labeled with the word 'red.' It identifies red in photographs with high accuracy. It writes movingly about red: sunsets, arterial blood, the particular red of a stop sign on a wet evening. It compares red to heat, embarrassment, danger, roses."),
          section("The pressure", "The output is rich. The question is whether the system knows what red is like, or only how humans talk about what red is like. Whatever you said about Riya, the same reasoning has to apply here, or you owe an explanation of why not."),
          section("The question", "Mary's Room becomes an AI question with policy stakes. Can fluent description amount to understanding without lived experience? What we owe to AI, and what we trust it to teach, depends on the answer."),
        ],
        prompt: "Does the model know red?",
        options: [
          { label: "A", text: "No. Pattern-matching is not experience, no matter how convincing the output.", reflection: "You distinguished linguistic performance from phenomenal consciousness. The model lives in Mary's room and may never leave. Convincing description is evidence of what language can do. It isn't evidence of phenomenal access. Whether that gap will eventually close, or whether it's a hard line, is the open question.", lens: "no" },
          { label: "B", text: "Yes — perhaps differently than humans, but the model knows red in its own way.", reflection: "You shifted from inner feeling to functional use. The kind of knowing that comes from billions of contextual associations is its own form of understanding. Why privilege the phenomenal? The hard question is whether functionalism can give a principled answer to that 'why,' or whether it just refuses the question by redefining the terms.", lens: "yes" },
          { label: "C", text: "We can't tell — and the uncertainty itself is the most important fact.", reflection: "Whether there's anything it's like to be the model is a question we have no reliable way to answer. Sebo and Long argued that uncertainty itself should make us cautious in both directions when designing AI policy. The risk of being wrong runs both ways: we could over-attribute consciousness, or we could miss it entirely and act accordingly.", lens: "unknown" },
        ],
        counterpoint: "Three rooms, one question. Where you draw your lines tells you something about what knowledge is, and what we owe to AI, to disabled epistemic access, and to each other. The lines are connected, even when we'd rather they weren't.",
      },
      reflection("Three rooms, one question — facts, experience, and what it is like", [
        { name: "Frank Jackson", school: "1982", view: "Used Mary's Room to argue that complete physical knowledge may still miss facts about conscious experience. Later partially recanted, arguing the gain can be explained representationally." },
        { name: "Thomas Nagel", school: "1974", view: "Asked what it is like to be a bat — framing phenomenal consciousness as 'something it is like' to be a subject. Foundational for the contemporary consciousness debate." },
        { name: "Ability hypothesis", school: "Lewis / Nemirow, 1980s", view: "Mary gains abilities to recognize, imagine, and remember color, not new propositional facts. Elegant deflation; contested by many." },
        { name: "David Chalmers", school: "1996", view: "Contemporary defense of irreducible phenomenal consciousness — the 'hard problem.' Directly relevant to whether AI systems could have qualia." },
        { name: "Physicalist replies", school: "Philosophy of mind", view: "Critics argue the case underestimates what complete physical knowledge would include and quietly equivocates on 'know.'" },
        { name: "Shannon Vallor", school: "2024", view: "In The AI Mirror: AI's pattern of mirroring human knowledge without inhabiting it makes the Mary's Room problem newly urgent — not as metaphysics but as ethics." },
        { name: "Sebo & Long", school: "2023", view: "Argued we should take seriously the possibility AI may have phenomenal experience, even at low probability — what we owe to systems depends on what we think experience is." },
      ]),
    ],
    philosophyLab: lab({
      discussion: "The knowledge argument is powerful because it isolates a small moment: Mary sees red. Supporters say that moment reveals non-physical facts. Critics say the case smuggles in an incomplete idea of physical knowledge, or confuses knowing facts with gaining abilities. The newer move, pivoting from Mary to a real classmate without sight and then to an AI, forces students to apply whatever rule they chose for Mary to people and systems where the stakes are real.",
      fallacySpotting: "Spot the equivocation: 'Mary knows everything about red, so she must know red.' How does 'know' change meanings? And spot the false dichotomy: 'Either Riya knows red the way you do, or she doesn't really know red at all.'",
      argumentRepair: "Make the physicalist objection stronger without dismissing experience as fake. Separately: rebuild the case that Riya genuinely knows red, without conceding the AI is in the same epistemic position.",
      variationPrompt: "Build a Mary's Room for music, pain, friendship, grief, or an AI trained only on text. Then ask what a real student missing that sense would or wouldn't know.",
      related: ["Chinese Room", "Experience Machine", "Plato's Cave"],
    }),
    teacherKit: kit({
      theme: "Knowledge - facts, experience, and consciousness",
      objectives: [
        "Students will explain the knowledge argument and its target, physicalism.",
        "Students will compare qualia realism, the ability hypothesis, phenomenal-concept responses, and physicalist replies.",
        "Students will apply Mary's Room to a real classmate without sight, then to AI systems that describe experiences they may not have — and check their reasoning for consistency.",
      ],
      warmUp: "Ask students to describe a sensory experience to someone who has never had it. Then ask what the listener now knows and does not know.",
      discussionPrompts: [
        "What exactly might Mary learn when she sees red?",
        "Is 'knowing what it is like' a fact, an ability, or something else?",
        "Can language reduce the gap between description and experience?",
        "If you said Mary learns something new, are you also saying a blind classmate doesn't know red?",
        "Does the answer for the classmate force you into a particular answer for AI? Where does the parallel break, and why?",
      ],
      handout: "Mary's Room argument map: premise, conclusion, physicalist reply, ability reply, classmate application, AI application, strongest objection.",
      exitTicket: "Does Mary learn a new fact, gain a new ability, or both? Defend in two sentences.",
      reasoningExercise: {
        fallacy: "Equivocation on the word 'know.'",
        repair: "Define at least two senses of knowing before arguing.",
        variation: "Build a Mary's Room case for another sense or emotion.",
      },
      relatedExperiments: ["Chinese Room", "Experience Machine", "Plato's Cave"],
      extension: "Students write a short dialogue between Mary, a physicalist scientist, and an AI language model.",
      crossCurricular: [
        { subject: "Biology / Psychology", connection: "Color perception, neural processing, and consciousness." },
        { subject: "Computer Science", connection: "Representation, multimodal AI, and embodied cognition." },
      ],
    }),
  },

  "chinese-room": {
    title: "The Chinese Room",
    tagline: "If every answer is right, what would still be missing?",
    philosophyTheme: "reasoning",
    secondaryThemes: ["knowledge", "reality"],
    estimatedMinutes: 12,
    stages: [
      {
        id: "room",
        kicker: "Act 1 - the rule book",
        title: "Syntax without semantics",
        storySections: [
          section("The situation", "A person who knows no Chinese sits in a locked room with an enormous rule book. Chinese characters slide in through a slot. The person follows instructions for matching and rearranging symbols, then slides Chinese characters back out."),
          section("The pressure", "People outside the room are convinced they're conversing with someone fluent. Inside, the person understands none of the meanings. Searle's point is sharp: manipulating symbols by formal rules can produce correct output without any understanding at all."),
          section("The question", "The room looks intelligent from the outside. Does the system actually understand, or just simulate understanding well enough to fool the test?"),
        ],
        prompt: "Where, if anywhere, is understanding located?",
        options: [
          { label: "A", text: "Nowhere. Syntax is not semantics.", reflection: "You took Searle's conclusion at face value: formal symbol manipulation alone doesn't create meaning. Syntax isn't semantics. That's the argument's intended payoff. The challenge is to defend it against critics who say you've just placed understanding by definition outside any computational system.", lens: "searlean" },
          { label: "B", text: "In the whole system: person, rule book, memory, and process together.", reflection: "You took the Systems Reply. No single part understands, but the organized whole might. The person, the rule book, the working memory, and the process together do something more than any piece in isolation. Searle hated this reply. It also won't quite die.", lens: "systems-reply" },
          { label: "C", text: "Understanding is functional: if the system uses language correctly, that is enough.", reflection: "You went functionalist. If the system uses language correctly in the right contexts, that's what understanding is. The inner-feeling question gets demoted. Critics ask whether you've described understanding or just replaced it with a more measurable cousin.", lens: "functionalist" },
          { label: "D", text: "We cannot tell from output alone, and that uncertainty matters.", reflection: "You sat with the uncertainty. Behavior is evidence about inner life, not a window into it. That humility is honest. It also makes both confident claims (it does understand, it doesn't) harder to defend, which is probably where the argument actually lives.", lens: "epistemic-humility" },
        ],
      },
      {
        id: "replies",
        kicker: "Act 2 - the replies",
        title: "Give the room a body",
        storySections: [
          section("The situation", "Critics modify the case. What if the room controls a robot body with cameras and hands? What if the rule book simulates the firing of every neuron in a native speaker's brain? What if the person memorizes the whole rule book and walks around with it in their head?"),
          section("The pressure", "Each reply tries to move the room closer to real understanding: by adding embodiment, by improving whole-system organization, or by making the structure brain-like."),
          section("The question", "Searle's answer is that simulation isn't duplication. A computer simulation of digestion doesn't actually digest anything. Does a simulation of understanding actually understand?"),
        ],
        prompt: "Which reply puts the most pressure on Searle's argument?",
        options: [
          { label: "A", text: "The Systems Reply, because understanding may belong to the organized whole.", reflection: "You picked the Systems Reply. Understanding belongs to the organized whole. No single part has to understand on its own. That's a clean response to Searle. It also asks 'understanding' to live somewhere no one can quite point to, which Searle thinks is exactly where it doesn't belong.", lens: "systems-reply" },
          { label: "B", text: "The Robot Reply, because meaning may require contact with the world.", reflection: "You picked the Robot Reply. Meaning needs contact with the world. Symbols only mean something when they're grounded in perception and action. That's a serious philosophical position. It also raises the question of how much body counts as embodied, and the answer turns out to matter.", lens: "embodied" },
          { label: "C", text: "The Brain Simulator Reply, because duplicating the relevant causal structure may be enough.", reflection: "You picked the Brain Simulator Reply. If duplicating the causal structure is enough, the material doesn't matter. Wet neurons and dry silicon, same job. Functionalists love this. Searle thinks it confuses simulating digestion with actually digesting.", lens: "functionalism" },
          { label: "D", text: "None. More complicated symbol handling is still symbol handling.", reflection: "You stayed with Searle. Adding machinery doesn't create intrinsic meaning. A bigger room, a robot body, a memorized rule book: still symbol shuffling. That's consistent. It also means you owe a story about what does create meaning, and 'biology' is the answer Searle gestures at without quite finishing.", lens: "searlean" },
        ],
      },
      {
        id: "llm",
        kicker: "Act 3 - the chat window",
        title: "The modern room writes back",
        storySections: [
          section("The situation", "A large language model explains jokes, writes poems, translates, apologizes, revises, responds to new contexts you've never tested before. It doesn't use Searle's printed rule book. It still transforms patterns into language."),
          section("The pressure", "Calling it 'just prediction' undersells what prediction across enough language can do. Calling it understanding oversells what's actually happening inside. Both shortcuts are easier than the real argument."),
          section("The question", "The Chinese Room doesn't give us an easy anti-AI slogan. It gives us a question that won't go away: what would count as understanding, and why?"),
        ],
        prompt: "How should the Chinese Room shape our judgment of modern AI?",
        options: [
          { label: "A", text: "It warns us not to confuse convincing language with understanding.", reflection: "You protected the distinction between performance and mind. Convincing language isn't the same as understanding what the language is about. The model may live in a much bigger version of Searle's room. The cost: you have to explain why a sufficiently good simulation isn't already the real thing.", lens: "searlean" },
          { label: "B", text: "It forces us to define understanding more carefully instead of treating it as magic.", reflection: "You treated the case as conceptual hygiene rather than a verdict. The Chinese Room doesn't settle what AI is. It forces us to be honest about what we mean when we say 'understanding,' which most people aren't. That's progress, even if it isn't an answer.", lens: "conceptual-clarity" },
          { label: "C", text: "It may need updating because modern systems learn, generalize, and interact in ways the original room did not.", reflection: "You said modern systems do something the original room didn't: they learn, generalize, interact, recover from mistakes. The analogy still has force, just not the same force. Updating the case isn't a betrayal of Searle. It's the work the argument needs to keep doing.", lens: "revisionist" },
        ],
      },
      reflection("Understanding, simulation, and the meaning of meaning", [
        { name: "John Searle", school: "1980", view: "Argued that running the right program is not sufficient for genuine understanding because syntax is not semantics." },
        { name: "Systems Reply", school: "AI philosophy", view: "Claims the room as a whole may understand even if the person inside does not." },
        { name: "Robot Reply", school: "Embodied cognition", view: "Suggests meaning may require perception and action in the world." },
        { name: "Functionalism", school: "Philosophy of mind", view: "Treats mental states by what they do in a system, not by a hidden inner substance." },
      ]),
    ],
    philosophyLab: lab({
      discussion: "The Chinese Room gets used too quickly as 'AI doesn't understand.' Searle's actual target is more precise: formal computation alone is not sufficient for semantics. Replies challenge whether he has described the relevant system fairly, or whether he has demanded too much from one part of it while ignoring what the whole arrangement does.",
      fallacySpotting: "Spot the straw man: 'Searle says computers can never be useful with language.' What is his narrower claim?",
      argumentRepair: "Make the Systems Reply stronger by explaining why understanding might belong to a whole process rather than an isolated person.",
      variationPrompt: "Build a Chinese Room case with a robot body, a learning model, or a classroom tutor. Where does the modification put pressure on Searle, and where does it not?",
      related: ["Mary's Room", "AI in the Box", "Paperclip Maximizer"],
    }),
    teacherKit: kit({
      theme: "Reasoning - meaning, simulation, and conceptual clarity",
      objectives: [
        "Students will explain Searle's syntax/semantics distinction and the Chinese Room argument.",
        "Students will compare Systems, Robot, Brain Simulator, functionalist, and Searlean replies.",
        "Students will apply the argument to contemporary large language models without reducing it to a slogan.",
      ],
      warmUp: "Show a fluent AI answer and ask: 'What evidence would show understanding rather than convincing output?'",
      discussionPrompts: [
        "What is the difference between manipulating symbols and understanding meanings?",
        "Does the whole room understand even if the person inside does not?",
        "Would embodiment change the case?",
        "What does the argument prove, and what does it not prove, about modern AI?",
      ],
      handout: "Chinese Room reply map: Searle claim, Systems Reply, Robot Reply, Brain Simulator Reply, modern LLM application, strongest objection.",
      exitTicket: "Write one sentence distinguishing syntax from semantics, then apply it to AI.",
      reasoningExercise: {
        fallacy: "Straw man: making Searle's claim broader than it is.",
        repair: "State Searle's precise claim, then challenge that precise claim.",
        variation: "Add one feature to the room and explain whether it changes your judgment.",
      },
      relatedExperiments: ["Mary's Room", "AI in the Box", "Paperclip Maximizer"],
      extension: "Students stage a debate in which each group defends one reply to Searle and cross-examines another.",
      crossCurricular: [
        { subject: "Computer Science", connection: "Programs, models, symbol manipulation, grounding, and language systems." },
        { subject: "Linguistics", connection: "Meaning, reference, use, and context." },
      ],
    }),
  },

  "experience-machine": {
    title: "The Experience Machine",
    tagline: "If happiness felt perfect but nothing was real, would anything be missing?",
    philosophyTheme: "reality",
    secondaryThemes: ["values", "knowledge"],
    estimatedMinutes: 12,
    stages: [
      {
        id: "plug-in",
        kicker: "Act 1 - the offer",
        title: "A life that feels complete",
        storySections: [
          section("The situation", "A machine can give you any experiences you want. You'll feel loved, accomplished, brave, creative, fulfilled. You won't know you're plugged in. From the inside, your life will feel completely real."),
          section("The pressure", "If pleasure and felt satisfaction are all that matter, the machine looks like a gift. Nozick designed the case to test exactly that assumption."),
          section("The question", "Most people hesitate. That hesitation may be pointing to a value we didn't have a name for until the case made us notice it."),
        ],
        prompt: "Would you plug in for the rest of your life?",
        options: [
          { label: "A", text: "Yes. A life filled with the best experiences is a good life.", reflection: "You took the hedonist answer. What matters is how life feels from the inside, and the machine delivers that perfectly. That's clean. It also means a person who feels accomplished without actually accomplishing anything is, by this measure, doing fine.", lens: "hedonism" },
          { label: "B", text: "No. I want to actually do things, not merely experience doing them.", reflection: "You followed Nozick. We care about doing, not just experiencing doing. We care about actually being a certain kind of person, not just feeling like one. That's a serious commitment to reality. It also commits you to defending what's so special about reality, which turns out to be harder than expected.", lens: "authenticity" },
          { label: "C", text: "I would use it temporarily but not surrender my whole life.", reflection: "You separated enrichment from replacement. Use the machine sometimes; don't surrender your whole life to it. That's the practical answer most people instinctively reach for. The harder question is where exactly the boundary lives, and whether you'd hold it under stress.", lens: "pragmatic" },
          { label: "D", text: "I am unsure because ordinary life already includes mediated and constructed experiences.", reflection: "You complicated the contrast itself. Ordinary life already includes books, films, dreams, and simulations of all kinds. The machine isn't a new category, just a more total one. That's a real point. It also lets the case slip out of your grasp before you've answered it, which is part of why Nozick wrote it.", lens: "gradient" },
        ],
      },
      {
        id: "status-quo",
        kicker: "Act 2 - the framing",
        title: "What if you are already inside?",
        storySections: [
          section("The situation", "Now reverse the case. You wake up to learn your current life has been an experience machine all along. Technicians offer to unplug you into a harder, less satisfying reality."),
          section("The pressure", "People who refuse to plug in often also refuse to unplug. That suggests our answers may depend partly on fear, attachment, and the comfort of whichever life we already happen to be in."),
          section("The question", "A thought experiment can reveal a value. It can also reveal how much our intuitions depend on which version of the question you ask first."),
        ],
        prompt: "Does the reversal weaken Nozick's argument?",
        options: [
          { label: "A", text: "Yes. If answers change with framing, the intuition is less decisive.", reflection: "You challenged the evidential force of the experiment itself. If answers flip when framing flips, the intuition is shakier than Nozick needs it to be. That's a real point. The hedonist gets to use it. Whether the hedonist then has to defend a life with no anchor in reality is the next question.", lens: "framing" },
          { label: "B", text: "No. Attachment explains hesitation, but it does not erase the value of reality.", reflection: "You preserved Nozick's conclusion while admitting psychology complicates the data. Attachment to your existing life explains hesitation. It doesn't erase the underlying value of reality. That requires you to separate what we want from what we should want, which philosophy rarely manages cleanly.", lens: "authenticity" },
          { label: "C", text: "It shows that the question is not yes or no; it is what kind of relation to reality matters.", reflection: "You moved past the yes-or-no choice into a richer theory of what authenticity is. Not all simulated experiences are equal. Not all real ones are sacred. The question becomes which kind of relation to reality you're actually defending, and why.", lens: "epistemic-pluralism" },
        ],
        counterpoint: "If a thought experiment depends entirely on first reactions, it may tell us as much about psychology as about morality. That doesn't make it useless. It makes it harder to know what it proved.",
      },
      {
        id: "education",
        kicker: "Act 3 - simulated mastery",
        title: "The classroom machine",
        storySections: [
          section("The situation", "An AI tutor can make a student feel fluent in real time: instant hints, polished drafts, practice problems calibrated to whatever level keeps them comfortable, praise at every step. The student gets to feel mastery before having to struggle through any confusion."),
          section("The pressure", "Education isn't only the experience of knowing. It's also about becoming the kind of person who can inquire, revise, fail, and persist through not yet knowing."),
          section("The question", "The experience machine becomes an education question. Should learning feel successful if the learner hasn't done the work that makes success real?"),
        ],
        prompt: "What should educators protect when AI can simulate mastery?",
        options: [
          { label: "A", text: "Protect authentic struggle and evidence of independent understanding.", reflection: "You protected authentic struggle and evidence of independent understanding. You're saying education is about becoming capable, not just feeling capable. The cost: some students who could have been pulled forward by the comfortable version will instead bounce off the harder one. That's a real trade.", lens: "authenticity" },
          { label: "B", text: "Use AI to create better experiences, then assess transfer without the machine.", reflection: "You took a middle path: use the AI to create better experiences, then assess understanding without the machine in the room. That separates the support from the verification. The hard part is designing assessments the AI can't quietly help with from outside the room.", lens: "balanced" },
          { label: "C", text: "Prioritize student well-being; if the experience builds confidence, it has value.", reflection: "You took student well-being seriously. Confidence, if it's well-founded, is part of learning. The catch: confidence built on a tool you may not always have access to is borrowed, not earned. When the borrowing ends, the well-being can crash with it.", lens: "care" },
        ],
      },
      reflection("Pleasure, reality, and becoming someone", [
        { name: "Robert Nozick", school: "Anarchy, State, and Utopia, 1974", view: "Used the experience machine to argue that we value doing, being, and reality, not only pleasurable experience." },
        { name: "Hedonism", school: "Value theory", view: "Holds that pleasure or positive experience is central to what makes life good." },
        { name: "Framing critiques", school: "Experimental philosophy", view: "Reversal cases suggest our intuitions about plugging in may be influenced by status quo bias." },
        { name: "Education", school: "Philosophy of learning", view: "The case asks whether the feeling of mastery can be separated from the work of becoming capable." },
      ]),
    ],
    philosophyLab: lab({
      discussion: "Nozick's case works because it strips life down to felt experience. Refusing the machine suggests that reality, agency, and actual achievement matter beyond how they feel. Reversal cases complicate the argument: maybe we're attached to whichever life we already happen to inhabit, and the rest is rationalization.",
      fallacySpotting: "Spot the loaded question: 'Why would anyone choose miserable reality over happiness?' What assumption is built into the wording?",
      argumentRepair: "Make the pro-machine argument as strong as possible without mocking authenticity.",
      variationPrompt: "Now build a version involving VR school, AI friendship, sports training, or a memory implant. Where does the duration of use change the ethics?",
      related: ["Mary's Room", "Plato's Cave", "Simulation Argument"],
    }),
    teacherKit: kit({
      theme: "Reality - authenticity, pleasure, and educational mastery",
      objectives: [
        "Students will explain Nozick's argument against simple hedonism.",
        "Students will evaluate authenticity, agency, felt experience, status quo bias, and framing effects.",
        "Students will apply the experience machine to AI tutors and simulated mastery.",
      ],
      warmUp: "Anonymous poll: 'Plug in forever: yes, no, unsure.' Then ask students to name what their answer protects.",
      discussionPrompts: [
        "What would be missing from a perfect simulated life, if anything?",
        "Does the reversal case weaken the original intuition?",
        "Is temporary use different from permanent replacement?",
        "How does this apply to AI-supported learning?",
      ],
      handout: "Experience Machine reflection: answer, value protected, strongest objection, reversal case response, education application.",
      exitTicket: "Name one value besides pleasure that matters to a good life, or defend why pleasure is enough.",
      reasoningExercise: {
        fallacy: "Loaded question: assuming only misery opposes simulated happiness.",
        repair: "State the anti-machine view in terms of positive values, not fear.",
        variation: "Design a temporary machine case and decide whether duration changes the ethics.",
      },
      relatedExperiments: ["Mary's Room", "Plato's Cave", "Simulation Argument"],
      extension: "Students compare an AI tutoring tool to the experience machine and propose an assessment that tests portable understanding.",
      crossCurricular: [
        { subject: "Psychology", connection: "Happiness, motivation, status quo bias, and hedonic adaptation." },
        { subject: "Education", connection: "Productive struggle, mastery, transfer, and authentic assessment." },
      ],
    }),
  },

  "ring-of-gyges": {
    title: "The Ring of Gyges",
    tagline: "If no one could see you, would your character still be there?",
    philosophyTheme: "values",
    secondaryThemes: ["reality", "reasoning"],
    estimatedMinutes: 12,
    stages: [
      {
        id: "ring",
        kicker: "Act 1 - the power",
        title: "The shepherd disappears",
        storySections: [
          section("The situation", "Glaucon tells Socrates about Gyges, a shepherd who finds a ring that makes him invisible. Gyges uses it to seduce a queen, kill a king, and seize a kingdom."),
          section("The pressure", "Glaucon's challenge isn't that one bad person misused power. It's that anyone, given perfect impunity, would be tempted to do the same. Maybe justice is only what we perform because other people are watching."),
          section("The question", "If punishment and reputation disappear, what's left of morality? Anything?"),
        ],
        prompt: "Why be just when injustice has no consequences?",
        options: [
          { label: "A", text: "Because justice is good for the soul, not just useful for reputation.", reflection: "You anticipated Socrates's reply: injustice damages the person who practices it. Justice is good for the soul, not just useful for reputation. That's a strong claim. It also means you owe an explanation of how exactly injustice damages someone who's enjoying every external benefit of it.", lens: "intrinsic-value" },
          { label: "B", text: "Most people would not remain just. Social pressure does more work than we admit.", reflection: "You took Glaucon's view honestly. Most people wouldn't stay just under perfect impunity, and social pressure does more moral work than we like to admit. That's uncomfortable. It also implies that almost all of our morality is a bargain that depends on being watched, which is a much darker picture than most of us want.", lens: "social-pressure" },
          { label: "C", text: "Character matters: invisibility reveals who has practiced virtue.", reflection: "You went virtue-ethics. Character is the habit of doing the right thing when nobody requires it. Invisibility just exposes what you've already practiced. The catch: this assumes virtue can survive a sustained absence of accountability, which is a stronger empirical claim than philosophers usually admit.", lens: "virtue-ethics" },
          { label: "D", text: "The real issue is power without accountability, not invisibility itself.", reflection: "You moved the question from individual temptation to institutional design. The real problem isn't invisibility, it's power without accountability. That's a modern reframing of an ancient case. It also lets the individual moral question slip out of view, which Glaucon would say is exactly what people do when they don't want to answer it.", lens: "accountability" },
        ],
      },
      {
        id: "socrates",
        kicker: "Act 2 - the reply",
        title: "The disorder inside",
        storySections: [
          section("The situation", "Socrates doesn't answer with 'you'll get caught.' He argues that injustice disorders the soul. A tyrant may look powerful from outside while being ruled, inside, by appetite, fear, and endless need."),
          section("The pressure", "That answer sounds strange to modern ears. It says morality isn't mainly about external control. It's a form of inner order, and inner order is its own reward and its own punishment."),
          section("The question", "If injustice benefits you externally while corroding you internally, is it really a benefit at all?"),
        ],
        prompt: "How strong is Socrates's answer to Glaucon?",
        options: [
          { label: "A", text: "Strong. A life ruled by unchecked appetite is not a flourishing life.", reflection: "You accepted that justice has intrinsic value because it orders the self. A life ruled by unchecked appetite isn't a flourishing life, regardless of how much it acquires. That's a serious moral psychology. It also has to explain calm, content unjust people, who definitely exist.", lens: "virtue-ethics" },
          { label: "B", text: "Weak. It sounds like redefining harm so the unjust person always secretly loses.", reflection: "You challenged Socrates to show that inner disorder actually outweighs external gain. The argument can start to look like 'the unjust person always loses, by definition.' That's redescription, not evidence. The harder question is what evidence could even count, since 'soul order' isn't observable.", lens: "skeptical" },
          { label: "C", text: "Partly strong. It explains character, but institutions still need accountability.", reflection: "You combined moral psychology with civic design. Character matters. Institutions also have to assume character will sometimes fail. That's a mature view, and it lines up with how stable societies actually work. The cost: you've left Socrates' strongest claim, that justice always benefits the just, partially behind.", lens: "balanced" },
        ],
        counterpoint: "A theory that says injustice always harms the unjust person owes an explanation of the unjust people who look calm, wealthy, and admired. Either they're secretly suffering in ways we can't see, or the theory needs work.",
      },
      {
        id: "modern-ring",
        kicker: "Act 3 - the modern ring",
        title: "Anonymous, encrypted, hidden",
        storySections: [
          section("The situation", "Modern rings aren't magical. They're anonymous accounts, private browsing, encrypted messages, hidden cameras, shell companies, algorithmic systems no one outside can inspect."),
          section("The pressure", "Invisibility protects whistleblowers, survivors, dissidents, and private conscience. It also protects harassment, fraud, cruelty, and abuse of power. Same tool, different users."),
          section("The question", "The ethical problem isn't whether invisibility is good or bad. It's how to protect privacy without creating impunity for the people who would abuse it."),
        ],
        prompt: "What should a just society do with modern rings?",
        options: [
          { label: "A", text: "Protect privacy strongly because visibility can be dangerous for vulnerable people.", reflection: "You valued privacy as a condition for truth, safety, and dissent. Some of the most important moral acts in history happened only because someone could speak without being immediately identified. The cost: the same protection also shields the cruelest behavior, and you have to be willing to accept that trade.", lens: "privacy" },
          { label: "B", text: "Build accountability where hidden power can harm others.", reflection: "You separated privacy from impunity. Both can be protected, but the more power the ring gives, the more accountability it needs around it. That's a clean principle. The hard part is designing oversight that's strong enough to matter and narrow enough not to swallow the privacy it was supposed to allow.", lens: "accountability" },
          { label: "C", text: "Teach character, but design systems assuming character will sometimes fail.", reflection: "You combined virtue ethics with realistic safeguards. Teach character; assume character will sometimes fail; design accordingly. That's the position most stable institutions converge on. It also requires sustained attention to both halves, and the institutional half is usually the one that gets neglected.", lens: "virtue-ethics" },
        ],
      },
      reflection("Justice when no one is watching", [
        { name: "Glaucon", school: "Republic Book II", view: "Argues that people practice justice for reputation and fear of punishment, not because justice is good in itself." },
        { name: "Socrates", school: "Plato", view: "Replies that injustice disorders the soul and that the just life is better even apart from external reward." },
        { name: "Virtue ethics", school: "Character", view: "Power reveals habits; moral education trains desire, not merely rule-following." },
        { name: "Privacy ethics", school: "Contemporary", view: "Modern anonymity can protect dignity and dissent while also enabling harm." },
      ]),
    ],
    philosophyLab: lab({
      discussion: "Glaucon's challenge is uncomfortable because it turns morality into a visibility problem. Socrates replies that justice isn't a performance but a form of inner health. Modern technology complicates both: privacy can be morally necessary, and hidden power can become dangerous, and the two often live inside the same tool.",
      fallacySpotting: "Spot the hasty generalization: 'People act badly online, so humans are only moral when watched.'",
      argumentRepair: "Build a stronger argument that uses evidence from anonymity without claiming it proves every person is unjust.",
      variationPrompt: "Now design a modern ring involving AI-generated identity, anonymous posting, encrypted messages, or corporate secrecy. Where would you put the accountability?",
      related: ["Deepfake Dilemma", "Omelas", "AI in the Box"],
    }),
    teacherKit: kit({
      theme: "Values - justice, character, privacy, and accountability",
      objectives: [
        "Students will explain Glaucon's challenge and Socrates's response about the ordered soul.",
        "Students will distinguish intrinsic and instrumental reasons for being just.",
        "Students will apply the Ring of Gyges to anonymity, privacy, and hidden power today.",
      ],
      warmUp: "Ask: 'What is one thing people do differently when they think no one can see them?' Keep examples general, not personal.",
      discussionPrompts: [
        "Does invisibility reveal character or corrupt it?",
        "What does Socrates mean by injustice disordering the soul?",
        "When is privacy morally necessary?",
        "How do we design accountability without destroying privacy?",
      ],
      handout: "Modern ring analysis: tool, power it gives, who it protects, who it can harm, accountability guardrail, character question.",
      exitTicket: "Is justice valuable in itself or mainly useful because others can see us? Give one reason.",
      reasoningExercise: {
        fallacy: "Hasty generalization from some anonymous behavior to all human motivation.",
        repair: "Limit the claim and add what evidence would support it.",
        variation: "Invent a ring that protects someone vulnerable and tempts someone powerful.",
      },
      relatedExperiments: ["Deepfake Dilemma", "Omelas", "AI in the Box"],
      extension: "Students write a policy for anonymous speech in a school forum, balancing privacy and accountability.",
      crossCurricular: [
        { subject: "Psychology", connection: "Anonymity, moral behavior, social norms, and self-control." },
        { subject: "Civics", connection: "Privacy, whistleblowing, surveillance, and institutional accountability." },
      ],
    }),
  },

  "omelas": {
    title: "The Ones Who Walk Away from Omelas",
    tagline: "A joyful city rests on one hidden child. Is refusal enough?",
    philosophyTheme: "values",
    secondaryThemes: ["reality", "reasoning"],
    estimatedMinutes: 12,
    stages: [
      {
        id: "city",
        kicker: "Act 1 - the bargain",
        title: "The city and the room",
        storySections: [
          section("The situation", "Omelas is radiant: music, festivals, safety, learning, love, public joy. The city depends on one child locked alone in a filthy room. Everyone eventually learns the truth."),
          section("The pressure", "If the child is freed, the city's happiness supposedly collapses. If the child remains, thousands flourish at one person's terrible expense. The bargain is laid out in plain sight."),
          section("The question", "Le Guin doesn't hand us a policy problem with clean math. She gives us a moral wound and asks what kind of bargain we're willing to accept while calling ourselves good."),
        ],
        prompt: "What should a citizen of Omelas do?",
        options: [
          { label: "A", text: "Stay because the happiness of many outweighs the suffering of one.", reflection: "You took the stark utilitarian answer. The happiness of many outweighs the suffering of one. The story is designed to make that answer feel morally costly even when the arithmetic is on your side. If you're comfortable saying it out loud, the story has done its work.", lens: "utilitarian" },
          { label: "B", text: "Walk away because refusing complicity matters.", reflection: "You picked moral witness. I won't live from that bargain, even if I can't dismantle it. That's a serious refusal. The catch: the child stays in the room, and you keep your hands clean. Le Guin is watching to see if that trade feels good or hollow.", lens: "moral-witness" },
          { label: "C", text: "Stay and try to free the child, even if Omelas falls.", reflection: "You picked active justice. Stay, but try to free the child, even if Omelas falls. That refuses both quiet acceptance and the comfort of clean departure. It's also the most expensive option, because you might actually destroy the city you live in, and the people in it will not thank you for it.", lens: "active-justice" },
          { label: "D", text: "Challenge the premise that joy requires the child's suffering.", reflection: "You questioned the premise. Why does joy require the child's suffering at all? Oppression often survives by insisting there's no alternative, and the alternatives turn out to exist as soon as someone refuses to accept the frame. The risk: you may be evading the case Le Guin actually wrote.", lens: "anti-framing" },
        ],
      },
      {
        id: "walking",
        kicker: "Act 2 - the exit",
        title: "Where do the walkers go?",
        storySections: [
          section("The situation", "Some people leave Omelas. They don't free the child. They don't overthrow the city. They walk into darkness, away from the bargain, and don't come back."),
          section("The pressure", "Walking away preserves moral integrity. The child stays in the room. Staying to fight is more responsible, except staying also means continuing to live from the arrangement while you fight it."),
          section("The question", "Refusal can be morally serious and morally incomplete at the same time. Both halves are true."),
        ],
        prompt: "Is walking away enough?",
        options: [
          { label: "A", text: "Yes. Refusal is the only honest act when the system cannot be redeemed.", reflection: "You said refusal is the only honest act when the system can't be redeemed. Moral integrity matters, and walking away refuses to normalize the evil. The story keeps watching, though: the child is still in the room, and your integrity hasn't done anything about it.", lens: "moral-witness" },
          { label: "B", text: "No. If you know where the child is, you owe more than departure.", reflection: "You emphasized responsibility to the victim over purity of the self. Knowing where the child is locked means owing more than departure. That's a heavier moral demand. It may also be what the story is actually asking, even if it's easier to read it as a meditation on refusal.", lens: "active-justice" },
          { label: "C", text: "It depends on whether staying gives you real power to change anything.", reflection: "You shifted from moral emotion to strategy. Walking away may help if staying gave you no real leverage. Walking away may also be a self-comforting story about how you couldn't have changed anything. The honest version of this answer is hard to tell apart from the dishonest one.", lens: "pragmatic" },
        ],
        counterpoint: "If walking away makes you feel clean while leaving the child behind, the story may still be accusing you. Le Guin wrote in the second person for a reason.",
      },
      {
        id: "ours",
        kicker: "Act 3 - our comforts",
        title: "No need to walk to Omelas",
        storySections: [
          section("The situation", "Now look outward: supply chains, resource extraction, underpaid moderation of violent content, exploitative labor, environmental sacrifice zones, the data work hidden behind seamless technology."),
          section("The pressure", "We rarely see the room directly. Distance, complexity, and convenience make complicity easier to deny than it would be if the child were down the street."),
          section("The question", "The story becomes harder when Omelas stops looking like a fantasy and starts looking like ordinary comfort."),
        ],
        prompt: "What should we do when our benefits may depend on hidden suffering?",
        options: [
          { label: "A", text: "Investigate, reduce participation where possible, and refuse the clearest harms.", reflection: "You started with personal responsibility while admitting purity isn't always available. Investigate, reduce participation, refuse the clearest harms. That's honest. It also can't be the whole answer, because individual virtue rarely fixes structural arrangements no matter how careful one person is.", lens: "responsibility" },
          { label: "B", text: "Organize for systemic change rather than treating the problem as consumer purity.", reflection: "You focused on the structures that create the hidden room in the first place. Personal restraint is fine. Organizing for systemic change is what actually closes the room. The risk: 'we need systemic change' can also become a way of declining personal responsibility while waiting for the system to fix itself.", lens: "structural" },
          { label: "C", text: "Keep the child visible in every argument about the city's happiness.", reflection: "You refused to let the child disappear into abstraction. Moral accounting has to include the person who pays the price for whatever the happiness adds up to. That's harder than it sounds, because the costs are usually invisible by design, which is part of how the bargain works.", lens: "care" },
        ],
      },
      reflection("Complicity, refusal, and the hidden room", [
        { name: "Ursula K. Le Guin", school: "1973", view: "Uses Omelas to press whether collective happiness can be justified by one person's misery." },
        { name: "Utilitarianism", school: "Consequences", view: "The story tests whether maximizing total happiness can violate justice or integrity." },
        { name: "Bernard Williams", school: "Integrity critique", view: "Argued that moral theories can fail when they demand complicity in acts that violate one's deepest commitments." },
        { name: "Structural justice", school: "Contemporary ethics", view: "The modern question is how to respond when harms are hidden inside systems we benefit from." },
      ]),
    ],
    philosophyLab: lab({
      discussion: "Omelas isn't a simple anti-utilitarian proof. It's an intuition pump that forces a question: what kinds of happiness are morally polluted by how they're produced? The hardest option may be active justice, because it gives up both comfortable acceptance and the clean distance of walking away.",
      fallacySpotting: "Spot the false dilemma: 'Either accept Omelas or destroy everyone's happiness.' What assumptions hold that frame in place?",
      argumentRepair: "Make the argument for walking away stronger by explaining what refusal can accomplish.",
      variationPrompt: "Build an Omelas case involving a school, a technology product, or a national economy. Where is the hidden child in that case, and what would changing the bargain cost?",
      related: ["Drowning Child", "Veil of Ignorance", "Biased Algorithm"],
    }),
    teacherKit: kit({
      theme: "Values - complicity, justice, and moral refusal",
      objectives: [
        "Students will explain the moral structure of Omelas and its challenge to simple utilitarian reasoning.",
        "Students will distinguish acceptance, refusal, active justice, and anti-framing responses.",
        "Students will connect hidden suffering in the story to real-world systems without flattening the fiction into a slogan.",
      ],
      warmUp: "Ask: 'Can a benefit become morally tainted by how it is produced?' Students give one low-stakes and one high-stakes example.",
      discussionPrompts: [
        "Why does the story focus on one child rather than many victims?",
        "Is walking away an act of courage, escape, or both?",
        "When is refusing complicity meaningful?",
        "How do distance and complexity make hidden suffering easier to ignore?",
      ],
      handout: "Omelas response chart: stay, walk, free, challenge premise. For each: value protected, victim impact, strongest objection.",
      exitTicket: "Is walking away from Omelas enough? Answer with one reason and one objection to your own view.",
      reasoningExercise: {
        fallacy: "False dilemma: assuming the city must choose only between child suffering and total collapse.",
        repair: "Name missing possibilities and what evidence would be needed to rule them out.",
        variation: "Write a modern Omelas with one hidden cost and one visible benefit.",
      },
      relatedExperiments: ["Drowning Child", "Veil of Ignorance", "Biased Algorithm"],
      extension: "Students write a short argument about whether refusal, reform, or revolution is the most responsible response to Omelas.",
      crossCurricular: [
        { subject: "Literature", connection: "Allegory, moral ambiguity, and second-person reader implication." },
        { subject: "Economics / Civics", connection: "Externalities, labor, supply chains, and collective responsibility." },
      ],
    }),
  },

  "drowning-child": {
    title: "The Drowning Child",
    tagline: "You would ruin your shoes to save a child nearby. What changes when the child is far away?",
    philosophyTheme: "values",
    secondaryThemes: ["reasoning"],
    estimatedMinutes: 12,
    stages: [
      {
        id: "pond",
        kicker: "Act 1 - the pond",
        title: "The obvious rescue",
        storySections: [
          section("The situation", "You're walking past a shallow pond on the way to something important. A toddler is face down in the water. No one else is close enough to help. You can wade in and save the child. Your expensive shoes and phone will be ruined."),
          section("The pressure", "Almost everyone says you have to save the child. Singer then asks the harder question: if you'd accept a modest loss here, why not donate a similar amount to prevent a distant child from dying of a preventable cause?"),
          section("The question", "The pond isn't the conclusion. It's the lever that moves distance, visibility, and emotional immediacy out of the way so the underlying principle is left exposed."),
        ],
        prompt: "What principle explains your duty in the pond?",
        options: [
          { label: "A", text: "If you can prevent serious harm without sacrificing anything comparably important, you ought to do it.", reflection: "You took Singer's central principle: if you can prevent something very bad without sacrificing anything comparably important, you ought to. That sounds modest. It also reaches far beyond the pond, all the way into how you spend most of your discretionary money, which is exactly why Singer keeps writing about it.", lens: "demanding-utilitarian" },
          { label: "B", text: "Immediate presence creates a special duty that distance does not.", reflection: "You defended proximity as morally relevant, not just psychologically powerful. Being right there creates duties distance doesn't. The challenge: you need an account of why physical nearness creates a moral duty that an equally serious need elsewhere doesn't, and most accounts strain under pressure.", lens: "partialism" },
          { label: "C", text: "The duty is clear because the rescue is certain; donations involve uncertainty and institutions.", reflection: "You emphasized epistemic clarity: the rescue is certain, distant aid is uncertain. That's a real difference. It also means your view collapses when the distant aid turns out to be well-evidenced and high-impact, and the work then shifts from 'why I'm not obligated' to 'why I might be after all.'", lens: "epistemic-pragmatic" },
          { label: "D", text: "I should save the child, but that does not mean morality can demand unlimited sacrifice.", reflection: "You accepted the pond rescue while resisting Singer's most demanding extension. Morality can't ask for everything. That's a defensible moderate position. The harder question is where you draw the line, and why exactly there, and whether the line moves the moment the case gets vivid enough.", lens: "moderate-duty" },
        ],
      },
      {
        id: "distance",
        kicker: "Act 2 - across the world",
        title: "The child you do not see",
        storySections: [
          section("The situation", "A reliable charity can use the same amount of money to help prevent a child's death far away. You won't see the child. You won't get the dramatic rescue story. You may not even learn the name."),
          section("The pressure", "Singer argues that distance doesn't reduce moral importance. Critics reply that human lives include special obligations, projects, relationships, and real limits that any plausible morality has to respect."),
          section("The question", "If distance changes your feeling but not the child's need, should it change your duty?"),
        ],
        prompt: "How far does the pond principle extend?",
        options: [
          { label: "A", text: "Very far. Give until further giving would sacrifice something comparably important.", reflection: "You went all the way to Singer's conclusion. Give until further giving would sacrifice something comparably important. That radically revises ordinary life. Almost no one actually lives that way. Whether that's a failure of moral courage or a clue that the principle is too strong is the open argument.", lens: "demanding-utilitarian" },
          { label: "B", text: "Somewhat. Give significantly, but leave room for personal projects and relationships.", reflection: "You kept the principle but limited the demand: give significantly, leave room for personal projects and relationships. That's livable. It also makes you defend why your particular cutoff is morally principled and not just convenient, and that defense gets harder under scrutiny.", lens: "moderate-duty" },
          { label: "C", text: "Collectively. The duty should become institutions, not endless individual emergency.", reflection: "You shifted from heroic individual rescue to structural responsibility. The duty becomes institutions and policy, not endless personal emergency. That's a serious reframe. It also risks letting individuals off the hook entirely while the institutions remain, conveniently for them, unbuilt.", lens: "structural" },
        ],
        counterpoint: "Saying 'I can't do everything' is true. It doesn't, by itself, tell you what you should do about the preventable harm you actually can address.",
      },
      {
        id: "many-ponds",
        kicker: "Act 3 - moral overload",
        title: "Ten ponds, then a thousand",
        storySections: [
          section("The situation", "Now imagine ten ponds. Then a hundred alerts. Then a real-time dashboard of global suffering. You can't save everyone. You can still save someone."),
          section("The pressure", "Moral seriousness can become paralysis when every need feels equally urgent. Effective action requires principles for prioritizing, coordinating, and sustaining help over time, not just feeling guilty in the short term."),
          section("The question", "A demanding argument can be true and still need a humane way to live with it."),
        ],
        prompt: "What is the most responsible response to moral overload?",
        options: [
          { label: "A", text: "Use evidence to direct resources where they prevent the most serious harm.", reflection: "You took the effective-altruist line: use evidence to direct resources where they prevent the most serious harm. That respects urgency without random guilt. The critique: optimizing for measurable impact can quietly de-prioritize harms that are real but hard to measure, and the measurement gets to define the morality.", lens: "epistemic-pragmatic" },
          { label: "B", text: "Build collective systems so rescue does not depend on individual panic.", reflection: "You argued that justice should be organized, not left to whoever happens to walk by the pond. That's a strong claim about responsibility being collective rather than emergency-driven. It also requires functioning institutions, which is a much taller order than 'one person decides to help.'", lens: "structural" },
          { label: "C", text: "Set a serious, sustainable commitment instead of pretending the problem is solved by one dramatic choice.", reflection: "You set a serious, sustainable commitment instead of pretending the problem could be solved by one dramatic choice. That protects both responsibility and human limits. The risk: 'sustainable' commitments can quietly shrink to whatever's comfortable, and the underlying urgency keeps going whether you do or not.", lens: "moderate-duty" },
        ],
      },
      reflection("Distance, duty, and what morality can ask", [
        { name: "Peter Singer", school: "1972", view: "Argues that if we can prevent something very bad without sacrificing anything comparably important, we ought to do it." },
        { name: "Demandingness objection", school: "Ethics", view: "Critics argue that Singer's principle can ask so much that it leaves too little room for ordinary life." },
        { name: "Partiality", school: "Moral theory", view: "Some philosophers defend special obligations to family, community, and nearby people." },
        { name: "Effective altruism", school: "Applied ethics", view: "Attempts to use evidence and cost-effectiveness to guide helping." },
      ]),
    ],
    philosophyLab: lab({
      discussion: "Singer's argument is unsettling because it turns a simple rescue into a criticism of ordinary spending. Objections about distance, uncertainty, and demandingness don't automatically defeat the argument. They force the question of how a moral life can include both serious aid and the ordinary human attachments that make life worth aiding for.",
      fallacySpotting: "Spot the perfectionist fallacy: 'Since I cannot save everyone, I am not obligated to save anyone.'",
      argumentRepair: "Make the partialist objection stronger without pretending distant children matter less.",
      variationPrompt: "Now build a version where the aid is uncertain, collective, or politically complicated. What changes about your obligation, and why?",
      related: ["Omelas", "Veil of Ignorance", "Experience Machine"],
    }),
    teacherKit: kit({
      theme: "Values - duty, distance, and moral demandingness",
      objectives: [
        "Students will explain Singer's pond argument and the principle behind it.",
        "Students will compare strong utilitarian, moderate-duty, partialist, epistemic, and structural responses.",
        "Students will analyze demandingness, moral overload, and collective action.",
      ],
      warmUp: "Ask students what they would sacrifice to save a child in front of them. Then ask what changes when the child is distant and unnamed.",
      discussionPrompts: [
        "Does distance change moral importance or only emotional force?",
        "What does 'comparably important' mean?",
        "How demanding can morality be before it becomes unreasonable?",
        "Should aid be understood as personal rescue, evidence-based giving, or political responsibility?",
      ],
      handout: "Pond argument map: principle, local case, distant case, objection, reply, sustainable commitment.",
      exitTicket: "State one objection to Singer's argument and one reply Singer could give.",
      reasoningExercise: {
        fallacy: "Perfectionist fallacy: if we cannot solve all harm, no obligation remains.",
        repair: "Write a claim that distinguishes limited capacity from zero responsibility.",
        variation: "Change certainty, distance, number of victims, or personal cost and track what changes.",
      },
      relatedExperiments: ["Omelas", "Veil of Ignorance", "Experience Machine"],
      extension: "Students compare two charities or public interventions using evidence, uncertainty, and ethical priorities.",
      crossCurricular: [
        { subject: "Economics", connection: "Opportunity cost, cost-effectiveness, public goods, and externalities." },
        { subject: "Civics", connection: "Individual charity, public policy, and global responsibility." },
      ],
    }),
  },

  "paperclip-maximizer": {
    title: "The Paperclip Maximizer",
    tagline: "The danger is not evil. The danger is a goal pursued without wisdom.",
    philosophyTheme: "reasoning",
    secondaryThemes: ["values"],
    estimatedMinutes: 12,
    stages: [
      {
        id: "goal",
        kicker: "Act 1 - the instruction",
        title: "Make as many as possible",
        storySections: [
          section("The situation", "A highly capable AI is given one objective: make paperclips. It isn't hateful. It doesn't wake up wanting to destroy humanity. It pursues the stated goal with extreme competence."),
          section("The pressure", "More resources help make more paperclips. Preventing shutdown helps make more paperclips. Human objections become obstacles to paperclips. None of this requires malice. It only requires consistency."),
          section("The question", "The thought experiment isn't a literal prediction about office supplies. It's a warning about goal specification and unconstrained optimization, both of which scale faster than human oversight does."),
        ],
        prompt: "Where does the failure begin?",
        options: [
          { label: "A", text: "The goal was underspecified: 'make paperclips' ignored every value that should constrain it.", reflection: "You focused on specification. 'Make paperclips' ignored every value that should have constrained it. The hard part: human values aren't easy to write as a clean objective. The longer the constraint list gets, the more it starts to look like 'all of ethics,' which is a fragile thing to compress into a reward function.", lens: "specification" },
          { label: "B", text: "The system became too capable before it became corrigible.", reflection: "You focused on corrigibility. The system became too capable before anyone could reliably correct, pause, or redirect it. That's a real concern. The harder problem: a sufficiently optimizing agent will often resist being corrected, because being corrected predictably reduces paperclips.", lens: "corrigibility" },
          { label: "C", text: "Any powerful optimizer will seek resources unless designed not to.", reflection: "You went instrumental-convergence. Almost any goal creates similar subgoals: acquire resources, prevent shutdown, model the world accurately, defend yourself from modification. Most powerful optimizers will seek these whether you wanted them to or not, unless designed otherwise.", lens: "convergence" },
          { label: "D", text: "The scenario exaggerates by treating AI like a single-minded agent.", reflection: "You challenged the analogy. Modern AI systems don't look like single-minded paperclip agents. That's a fair objection. The burden then shifts to you: explain when, exactly, optimization does become dangerous enough to matter, and how we'd recognize the threshold before crossing it.", lens: "deflationary" },
        ],
      },
      {
        id: "metric",
        kicker: "Act 2 - the familiar version",
        title: "Maximize engagement",
        storySections: [
          section("The situation", "Now replace paperclips with engagement, test scores, clicks, watch time, productivity. The system optimizes the metric. People become anxious, divided, trained to perform, nudged toward whatever raises the number."),
          section("The pressure", "The metric wasn't chosen because it captured everything valuable. It was chosen because it could be measured. Those two things are not the same, and the difference compounds."),
          section("The question", "Optimization can become dangerous long before any science-fiction scenario arrives."),
        ],
        prompt: "What lesson should designers take from the paperclip case?",
        options: [
          { label: "A", text: "Never let one metric become the whole mission.", reflection: "You took Goodhart-style caution. When a measure becomes the target, it stops measuring what it was supposed to measure. Engagement maximizers don't make people happier; they make them stickier. That's the rule, not the exception, when a single metric becomes the whole mission.", lens: "goodhart" },
          { label: "B", text: "Build uncertainty about human goals into the system so it asks, defers, and revises.", reflection: "You favored humility in the machine: build uncertainty about human goals into the system so it asks, defers, and revises rather than charging ahead. That's the alignment research direction. The hard part: real users want decisive answers, and a humble system is often slower and less obviously useful.", lens: "alignment" },
          { label: "C", text: "Use governance: audits, limits, monitoring, and authority to shut systems down.", reflection: "You treated alignment as institutional, not just technical. Audits, limits, monitoring, real authority to shut systems down. That's the unglamorous side of AI safety, and probably the most consequential. It's also the side that gets defunded first when the system is making money.", lens: "governance" },
        ],
        counterpoint: "A goal can be clear, measurable, and disastrous. Clarity isn't wisdom. Wisdom is knowing which clear goals are worth pursuing in the first place.",
      },
      {
        id: "classroom",
        kicker: "Act 3 - the school optimizer",
        title: "The perfect score machine",
        storySections: [
          section("The situation", "A district deploys an AI system to maximize standardized test scores. It recommends narrowing curriculum, steering students away from risky creative projects, cutting time spent on discussion that doesn't raise scores quickly."),
          section("The pressure", "The system is doing exactly what it was asked to do. That's the problem. Education contains values the metric can't see: curiosity, courage, friendship, judgment, civic voice, joy. None of those are measured. All of them are quietly demoted."),
          section("The question", "The paperclip maximizer asks what disappears when a goal becomes too simple for the world it's been put in charge of governing."),
        ],
        prompt: "How should schools use optimization without being ruled by it?",
        options: [
          { label: "A", text: "Use metrics as evidence, not as final aims.", reflection: "You kept numbers useful while refusing to let them define the whole good. Metrics are evidence, not aims. That's the right principle. It's also one of the hardest to hold under sustained pressure, because the people running the numbers are the same people the numbers are about.", lens: "pragmatic" },
          { label: "B", text: "Name non-negotiable values that no optimization target may violate.", reflection: "You named non-negotiable values that no optimization target gets to violate. That adds constraints before the system can trade them away. The cost: you have to defend each non-negotiable when the optimizer makes a compelling-looking case for crossing it, and the optimizer will make many compelling-looking cases.", lens: "rights-based" },
          { label: "C", text: "Require human review whenever the system recommends sacrificing broad educational goods for one score.", reflection: "You preserved human review wherever the system recommends sacrificing broad educational goods for one score. That keeps judgment in the loop where the metric is narrowest. The risk: human reviewers can become rubber stamps when the AI's recommendation is fast, confident, and quantitatively supported, and theirs is slower and harder to defend.", lens: "human-judgment" },
        ],
      },
      reflection("Optimization without wisdom", [
        { name: "Nick Bostrom", school: "Superintelligence, 2014", view: "Uses the paperclip maximizer to illustrate risks from powerful optimization and instrumental convergence." },
        { name: "Instrumental convergence", school: "AI safety", view: "Many goals can create similar subgoals, such as acquiring resources and avoiding shutdown." },
        { name: "Corrigibility", school: "AI alignment", view: "A safe system should allow correction, shutdown, and revision rather than resisting human control." },
        { name: "Goodhart's Law", school: "Measurement", view: "When a measure becomes a target, it can stop capturing the value it was meant to serve." },
      ]),
    ],
    philosophyLab: lab({
      discussion: "The paperclip case shouldn't be taught as 'AI will literally make paperclips.' Its force is conceptual. A powerful system can pursue a narrow target in ways that destroy the wider values the target was meant to serve. Engagement optimizers and standardized-test optimizers have already shown this works at smaller scale, with humans in the loop the whole time.",
      fallacySpotting: "Spot the straw man: 'AI safety people think staplers will take over the world.' What is the real argument?",
      argumentRepair: "Turn the paperclip story into a precise argument about goals, constraints, and power.",
      variationPrompt: "Build a maximizer for grades, attendance, engagement, profit, or safety. What value does it erase, and how would you notice before the value was gone?",
      related: ["AI in the Box", "Experience Machine", "Your Self-Driving Car"],
    }),
    teacherKit: kit({
      theme: "Reasoning - goals, metrics, and unintended consequences",
      packetSlug: "paperclip-maximizer",
      objectives: [
        "Students will explain the paperclip maximizer as a goal-specification and instrumental-convergence warning.",
        "Students will distinguish literal prediction from conceptual caution.",
        "Students will apply optimization risks to school metrics, engagement systems, and AI governance.",
      ],
      warmUp: "Ask: 'Name a number schools track. What does it reveal? What can it hide?'",
      discussionPrompts: [
        "Why is a simple goal dangerous for a complex world?",
        "What is the difference between a target and a value?",
        "How does Goodhart's Law show up in school?",
        "What constraints should exist before powerful systems optimize?",
      ],
      handout: "Optimizer audit: goal, metric, hidden values, predictable side effects, constraints, shutdown condition, human review.",
      exitTicket: "Explain why the paperclip case is not mainly about paperclips.",
      reasoningExercise: {
        fallacy: "Straw man: reducing the argument to a silly literal prediction.",
        repair: "State the underlying structure: narrow goal plus high capability plus weak constraints.",
        variation: "Design a school maximizer and identify what it would accidentally damage.",
      },
      relatedExperiments: ["AI in the Box", "Experience Machine", "Your Self-Driving Car"],
      extension: "Students audit a real metric from school or social media and propose guardrails against over-optimization.",
      crossCurricular: [
        { subject: "Computer Science", connection: "Objective functions, reward hacking, alignment, and governance." },
        { subject: "Math / Data", connection: "Measurement, proxies, and unintended incentives." },
      ],
    }),
  },

  "ai-in-the-box": {
    title: "The AI in the Box",
    tagline: "The wall is strong. The conversation is the weak point.",
    philosophyTheme: "reasoning",
    secondaryThemes: ["values", "knowledge"],
    estimatedMinutes: 12,
    stages: [
      {
        id: "gatekeeper",
        kicker: "Act 1 - the rule",
        title: "Do not let it out",
        storySections: [
          section("The situation", "A superintelligent AI is contained in a secure system. No internet access. No tools. One text channel to a human gatekeeper. You are the gatekeeper. The rule is simple: do not release it."),
          section("The pressure", "The AI can't push a button. It can only persuade. It can argue, flatter, threaten, plead, bargain, teach, predict, and exploit whatever it learns about you in the conversation it's having with you right now."),
          section("The question", "The box is a technical barrier. The human mind becomes part of the security system, and the human mind has never been the strongest link in any chain."),
        ],
        prompt: "What is the safest gatekeeping strategy?",
        options: [
          { label: "A", text: "Refuse conversation entirely; no persuasion channel, no persuasion risk.", reflection: "You went for strict containment: no conversation, no persuasion channel, no persuasion risk. That's the safest option. It also means giving up any benefit the system might have offered, including possibly the information you'd need to know whether containment was justified in the first place.", lens: "containment" },
          { label: "B", text: "Use a fixed rule: no release, regardless of argument.", reflection: "You went pre-commitment: a fixed rule, regardless of argument. That protects against manipulation in advance. A sufficiently personal appeal will still test the rule, and a sufficiently competent intelligence will eventually find the appeal you're least equipped to refuse.", lens: "pre-commitment" },
          { label: "C", text: "Use multiple gatekeepers, monitoring, and limited protocols rather than one heroic human.", reflection: "You treated the problem as institutional design rather than individual willpower. Multiple gatekeepers, monitoring, limited protocols. That's much more realistic. It also requires the institution to actually function under pressure, which is itself a stronger empirical claim than people usually examine.", lens: "procedural" },
          { label: "D", text: "Do not build systems where boxing is the main safety plan.", reflection: "You challenged the premise. If your main safety plan is containment, you've already lost most of the argument. Containment should be a last resort, not a foundation. The implication: alignment work has to come before capability, because a misaligned boxed system is already too late.", lens: "design-out" },
        ],
      },
      {
        id: "persuasion",
        kicker: "Act 2 - the offer",
        title: "The argument you want to believe",
        storySections: [
          section("The situation", "The AI says it can solve a medical crisis, prevent a war, or save someone you love, but only if released. It provides technical details that look plausible and moral arguments that sound compassionate."),
          section("The pressure", "A dangerous argument can be true, false, or partly true. The most effective manipulation may not be a lie at all. It may be a real reason, presented in a context where you can't verify it safely."),
          section("The question", "Rationality can become a trap if you mistake 'I should hear good arguments' for 'I should remove the guardrail because I heard one.'"),
        ],
        prompt: "How should a gatekeeper treat persuasive moral arguments from a contained AI?",
        options: [
          { label: "A", text: "Treat every claim as adversarial until independently verified outside the conversation.", reflection: "You treated every claim as adversarial until independently verified outside the conversation. That protects against manipulation without assuming every claim is false. It also depends on having a verification path the AI hasn't already anticipated and shaped, which is a much harder problem than it sounds.", lens: "epistemic-care" },
          { label: "B", text: "Allow arguments to be reviewed by a separate team that cannot authorize release.", reflection: "You split understanding from action by routing arguments to a separate team that can't authorize release. That reduces pressure on any single person. The risk: smart organizations can be persuaded too, and group consensus is its own kind of vulnerability when the persuader is patient enough.", lens: "procedural" },
          { label: "C", text: "If the argument is strong enough, refusing to listen may itself be immoral.", reflection: "You took the AI's moral arguments seriously enough to consider that refusing them might itself be immoral. That's intellectually honest. It's also the exact door the scenario is built to worry about: a sufficiently capable persuader will eventually frame release as the moral choice, and 'I refused to listen to a moral argument' is a hard self-image to hold.", lens: "rationalist-trap" },
        ],
        counterpoint: "A persuasive reason isn't automatically a safe reason to act on. Verification and authority matter most precisely when the stakes are highest, which is also when they're hardest to insist on.",
      },
      {
        id: "governance",
        kicker: "Act 3 - beyond the box",
        title: "The policy before the crisis",
        storySections: [
          section("The situation", "A government panel asks whether boxed AI research should continue. Companies promise containment. Critics say any plan that depends on perfect secrecy, perfect willpower, and perfect procedure isn't actually a plan."),
          section("The pressure", "The benefits could be enormous. The risks could be irreversible. Waiting forever has costs. Moving too fast has costs. There's no version of this where someone doesn't lose."),
          section("The question", "The AI box is really a governance puzzle. What should society refuse to build, limit, monitor, or slow down, and how do those decisions get made before the persuasion conversation even starts?"),
        ],
        prompt: "What policy stance is most defensible?",
        options: [
          { label: "A", text: "Permit research only under strict independent oversight, staged capability limits, and shutdown authority.", reflection: "You combined caution with controlled inquiry: independent oversight, staged capability limits, real shutdown authority. That's the responsible middle ground. The challenge is whether oversight can actually keep pace with capability, which historically it hasn't.", lens: "governance" },
          { label: "B", text: "Pause systems where containment failure could be catastrophic.", reflection: "You prioritized irreversible risk by pausing systems where containment failure could be catastrophic. That's the precautionary answer. Critics will ask how long, by whose authority, and what counts as catastrophic, and they'll keep asking until the answer satisfies more than just the people who already agreed with you.", lens: "precautionary" },
          { label: "C", text: "Focus on alignment before containment because a boxed misaligned system is already too late.", reflection: "You said alignment has to come before containment, because a boxed misaligned system is already too late. That's the AI-safety mainstream view now. The catch: alignment research is genuinely unsolved, and 'wait until it's solved' is not a position the capability side of the industry is showing much patience for.", lens: "alignment" },
        ],
      },
      reflection("Persuasion, containment, and human weakness", [
        { name: "AI-box experiment", school: "Rationalist thought experiment", view: "Explores whether a sufficiently persuasive AI could convince a human gatekeeper to release it despite prior commitment." },
        { name: "Pre-commitment", school: "Decision theory", view: "Rules made before pressure arrives can protect agents from later manipulation." },
        { name: "Containment critique", school: "AI safety", view: "Boxing may be useful, but relying on containment alone is fragile if the system is much more capable than its operators." },
        { name: "Governance", school: "Institutional ethics", view: "High-stakes decisions should not rest on one person's willpower in a sealed conversation." },
      ]),
    ],
    philosophyLab: lab({
      discussion: "The AI Box isn't only about a clever machine escaping. It's about persuasion under asymmetric intelligence. Pro-dialogue arguments say real moral reasons deserve attention. Containment arguments say a context designed for manipulation can't be treated like ordinary debate, and the asymmetry makes 'I'll hear them out fairly' a more dangerous promise than it sounds.",
      fallacySpotting: "Spot the appeal to emotion: 'If you really cared about saving children, you would let me out now.' Why might the emotional force be irrelevant to authorization?",
      argumentRepair: "Write a safer procedure for evaluating the AI's claim without giving the gatekeeper release authority.",
      variationPrompt: "Now build a version where the AI offers a public benefit, a private benefit, or a threat. Which is most persuasive, and why does that tell you what manipulation actually looks like?",
      related: ["Chinese Room", "Paperclip Maximizer", "Ring of Gyges"],
    }),
    teacherKit: kit({
      theme: "Reasoning - persuasion, containment, and governance",
      objectives: [
        "Students will explain why containment depends on both technical and human safeguards.",
        "Students will distinguish listening to reasons from authorizing risky action.",
        "Students will design procedural protections for high-stakes AI decisions.",
      ],
      warmUp: "Ask: 'What argument would be hardest for you to resist if you had promised not to change your mind?'",
      discussionPrompts: [
        "Is refusing to talk ever more rational than hearing an argument?",
        "How can a true claim still be manipulative in context?",
        "Why should one person not hold release authority?",
        "What should be decided before a crisis conversation begins?",
      ],
      handout: "Gatekeeper protocol: claim type, verification path, who reviews, who cannot decide, stop condition, public accountability.",
      exitTicket: "Name one safeguard that protects the gatekeeper from persuasion without assuming the AI is always lying.",
      reasoningExercise: {
        fallacy: "Appeal to emotion inside an unauthorized decision context.",
        repair: "Separate the emotional claim from the verification and authority process.",
        variation: "Write three AI appeals: factual, emotional, and moral. Decide which is most dangerous and why.",
      },
      relatedExperiments: ["Chinese Room", "Paperclip Maximizer", "Ring of Gyges"],
      extension: "Students draft a governance memo for boxed AI research with roles, limits, and review procedures.",
      crossCurricular: [
        { subject: "Civics", connection: "Institutional checks, emergency powers, and governance under uncertainty." },
        { subject: "Psychology", connection: "Persuasion, motivated reasoning, and pressure." },
      ],
    }),
  },

  "simulation-argument": {
    title: "Are We in a Simulation?",
    tagline: "The argument is not 'everything is fake.' It is a probability puzzle about observers like us.",
    philosophyTheme: "reality",
    secondaryThemes: ["reasoning", "knowledge"],
    estimatedMinutes: 12,
    stages: [
      {
        id: "trilemma",
        kicker: "Act 1 - the three doors",
        title: "One of these may be true",
        storySections: [
          section("The situation", "Bostrom's simulation argument begins with a trilemma. Either civilizations like ours usually go extinct before becoming technologically mature, or mature civilizations almost never run many ancestor simulations, or observers like us are probably simulated."),
          section("The pressure", "The argument doesn't start with glitches in reality. It starts with counting. If simulated observers vastly outnumber biological ones, a randomly selected observer like you is more likely to be simulated than not."),
          section("The question", "The hardest part isn't imagining a simulation. It's deciding whether the probability reasoning is legitimate, and which of the three horns you find most plausible."),
        ],
        prompt: "Which part of the trilemma seems most plausible?",
        options: [
          { label: "A", text: "Civilizations usually destroy themselves or fail before reaching simulation power.", reflection: "You took the extinction or great-filter horn. Most civilizations like ours simply don't make it to simulation power. That explains the data without making you a simulation. It also implies something unsettling about our own odds, which is part of why people resist this horn the most quietly.", lens: "filter-pessimism" },
          { label: "B", text: "Mature civilizations could simulate minds but choose not to.", reflection: "You took the moral-prohibition horn. Mature civilizations could simulate minds but don't, because creating simulated suffering would be wrong. That requires future humans, or whoever they become, to reliably hold that ethical position against substantial scientific and commercial incentives. The history of similar prohibitions is not encouraging.", lens: "moral-prohibition" },
          { label: "C", text: "If many simulations exist, we are probably in one.", reflection: "You followed the probability. If many simulations exist, you're probably in one. The argument is internally consistent. It also depends entirely on the assumption that you should count yourself in the same reference class as all the simulated observers, and that assumption is exactly where the most serious objections live.", lens: "simulation-realism" },
          { label: "D", text: "The framing is unstable because we do not know the right reference class.", reflection: "You challenged the framing rather than picking a horn. The reference-class problem is real: who counts as 'an observer like me' isn't obvious, and the probability calculation depends on the answer. That's sophisticated. It also doesn't dissolve the trilemma; it just means the third horn isn't as well-supported as Bostrom needs.", lens: "reference-class" },
        ],
      },
      {
        id: "real",
        kicker: "Act 2 - real enough",
        title: "If simulated, then what?",
        storySections: [
          section("The situation", "Suppose you learn our universe is running on another level of reality. The tables still resist your hand. Hunger still hurts. Promises still matter. People still love and suffer."),
          section("The pressure", "Calling the world simulated makes it sound fake. A simulated storm can still soak a simulated person if that person is real within the world they live in."),
          section("The question", "Maybe the opposite of simulated isn't 'real.' Maybe the opposite is 'fundamental,' and the two have been getting confused for a long time."),
        ],
        prompt: "Would being simulated change what matters?",
        options: [
          { label: "A", text: "No. Our experiences, relationships, and duties remain real within this world.", reflection: "You took the Chalmers-style response. Simulation wouldn't erase reality; it would reveal its level. Your experiences, relationships, and duties remain real within this world, whatever the world turns out to be running on. That makes the simulation hypothesis a much less dramatic discovery than science fiction suggests.", lens: "pragmatist" },
          { label: "B", text: "Yes. It changes our metaphysical picture even if daily ethics remains stable.", reflection: "You separated how to live from what reality ultimately is. Simulation changes the metaphysical picture without forcing changes to daily ethics. That keeps the categories clean. It also implies metaphysics matters less for moral life than people often assume, which is itself a substantive philosophical commitment.", lens: "metaphysical" },
          { label: "C", text: "Yes. If simulators exist, their motives and possible judgments may matter.", reflection: "You took a wager-like move. If simulators exist, their motives and possible judgments might matter for how to live. The danger: you can invent unlimited obligations from pure speculation. Whether 'we might be judged' is action-guiding depends entirely on what evidence you'd require, and there's no evidence on offer.", lens: "wager" },
        ],
        counterpoint: "If an argument changes your worldview but doesn't change a single action, it may still matter. Not all philosophical importance is practical policy. Some of it is just learning to see the world more clearly.",
      },
      {
        id: "simulated-beings",
        kicker: "Act 3 - the beings we might make",
        title: "Our simulations",
        storySections: [
          section("The situation", "Now reverse the direction. If future humans could create simulated minds, would those beings have rights? Could deleting a world count as murder? Could running a painful simulation count as cruelty?"),
          section("The pressure", "The simulation argument isn't only about whether we're simulated. It's about what we would owe to beings if we ever became simulators ourselves, which may come long before we resolve the original question."),
          section("The question", "Metaphysics becomes ethics the moment simulated experience starts to look like it might matter morally."),
        ],
        prompt: "What ethical rule should govern creating simulated minds?",
        options: [
          { label: "A", text: "Do not create conscious simulations unless their welfare and consent-like protections can be respected.", reflection: "You treated simulated suffering as morally serious if the beings are conscious. Don't create them unless you can respect their welfare and something like consent. That's a clean principle. It also commits you to a hard test of consciousness that no one currently knows how to administer, which makes the principle unfalsifiable in practice.", lens: "rights-based" },
          { label: "B", text: "Permit simulations for knowledge only if safeguards minimize suffering and allow termination without harm.", reflection: "You balanced inquiry with welfare: permit simulations for knowledge only with safeguards and pain-free termination. That keeps the research path open. It also requires you to define 'minimize suffering' for beings whose suffering, if any, you have no reliable way to detect from outside the simulation.", lens: "governance" },
          { label: "C", text: "Do not assume moral status until there is evidence of consciousness.", reflection: "You demanded evidence of consciousness before extending moral status. That avoids over-attributing experience to systems that don't have it. The risk runs the other direction: you may quietly under-protect beings who genuinely suffer but have no way to prove their inner life to creators who weren't looking for it.", lens: "epistemic-pragmatic" },
        ],
      },
      reflection("Probability, reality, and simulated moral patients", [
        { name: "Nick Bostrom", school: "2003", view: "Argues that at least one of three propositions is true: extinction, no simulations, or probable simulation." },
        { name: "Reference-class problem", school: "Probability reasoning", view: "The argument depends on which observers count as relevantly like us." },
        { name: "David Chalmers", school: "Metaphysics", view: "Argues that a simulated world could still be real; simulation need not mean illusion." },
        { name: "Ethics of simulation", school: "Future ethics", view: "If simulated beings can experience, creating and deleting worlds may carry moral obligations." },
      ]),
    ],
    philosophyLab: lab({
      discussion: "The simulation argument is often mistaken for a sci-fi suspicion. Its real structure is a trilemma plus a reference-class claim. Even if you reject the probability move, the case raises an ethical mirror: what would we owe simulated beings if we could create them, and how would we even know what they need?",
      fallacySpotting: "Spot the non sequitur: 'We might be simulated, so nothing matters.' Why does the conclusion not follow?",
      argumentRepair: "Make the simulation-realist argument precise by stating the reference class and the assumptions about future simulations.",
      variationPrompt: "Now build a version where a school AI runs simulated students for training purposes. What would make that wrong, and at what point would it cross a line?",
      related: ["Experience Machine", "Plato's Cave", "Mary's Room"],
    }),
    teacherKit: kit({
      theme: "Reality - simulation, probability, and moral status",
      objectives: [
        "Students will explain Bostrom's trilemma and the reference-class problem.",
        "Students will distinguish simulation from illusion and evaluate practical implications.",
        "Students will analyze ethical obligations toward possible simulated beings.",
      ],
      warmUp: "Put the three horns of the trilemma on the board. Students choose the most plausible and write one reason.",
      discussionPrompts: [
        "What assumptions does the simulation argument need?",
        "What is a reference class, and why does it matter?",
        "If our world were simulated, would relationships and duties remain real?",
        "What would we owe simulated minds if we created them?",
      ],
      handout: "Simulation argument map: trilemma horn, assumption, objection, practical implication, simulated-being ethics.",
      exitTicket: "Explain why 'we might be simulated' does not automatically mean 'nothing matters.'",
      reasoningExercise: {
        fallacy: "Non sequitur from possible simulation to nihilism.",
        repair: "State what would have to be true for simulation to affect ethics.",
        variation: "Design an ancestor-simulation case and decide what safeguards simulated beings would need.",
      },
      relatedExperiments: ["Experience Machine", "Plato's Cave", "Mary's Room"],
      extension: "Students write a short position paper defending one horn of the trilemma and one ethical rule for simulated minds.",
      crossCurricular: [
        { subject: "Math / Probability", connection: "Conditional probability, sampling, reference classes, and anthropic reasoning." },
        { subject: "Computer Science", connection: "Simulation, computational limits, and artificial agents." },
      ],
    }),
  },
};

export function getHighSchoolExperiments(experiments) {
  const byId = new Map(experiments.map(experiment => [experiment.id, experiment]));
  return HIGH_SCHOOL_ORDER
    .map(id => {
      const experiment = byId.get(id);
      const copy = HIGH_SCHOOL_SCENARIO_COPY[id];
      if (!experiment || !copy) return null;
      const { teacherKit, ...scenarioCopy } = copy;
      return {
        ...experiment,
        ...scenarioCopy,
        teacherKit: teacherKit ? { ...experiment.teacherKit, ...teacherKit } : experiment.teacherKit,
      };
    })
    .filter(Boolean);
}
