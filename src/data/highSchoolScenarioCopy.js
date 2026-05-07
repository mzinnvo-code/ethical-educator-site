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
          section("The situation", "It is 9:16 p.m. the night before a school-board election. A video appears to show one candidate mocking students with disabilities. The clip spreads through parent groups, student chats, and local accounts before any reporter can verify it."),
          section("The pressure", "The video looks almost real, but the blinking is strange and the audio has a tiny metallic edge. If the clip is genuine, voters deserve to know. If it is fake, sharing it could change an election with a lie."),
          section("The question", "The immediate problem is not just whether the video is true. It is what a democratic community owes the truth when evidence moves slower than outrage."),
        ],
        prompt: "What should platforms, journalists, and ordinary citizens do in the first few hours?",
        options: [
          { label: "A", text: "Temporarily limit sharing until a basic authenticity check is complete.", reflection: "You protect election integrity by slowing possible harm, but temporary limits still give someone power over public speech.", lens: "precautionary" },
          { label: "B", text: "Keep it online with a clear warning label and links to verification efforts.", reflection: "You respect public access to information, but labels can travel less widely than the image and emotion of the fake.", lens: "free-speech" },
          { label: "C", text: "Treat undisclosed election deepfakes as a distinct legal category, narrower than satire or parody.", reflection: "You are separating deception from protected political expression. The hard part is writing the boundary clearly.", lens: "legal" },
          { label: "D", text: "Focus first on media-literacy duties: do not share, preserve the source, and ask what evidence would change your mind.", reflection: "You shift responsibility from institutions alone to citizens as reasoners. That is slower, but democracies depend on it.", lens: "civic-integrity" },
        ],
      },
      {
        id: "liars-dividend",
        kicker: "Act 2 - the reversal",
        title: "The liar's dividend",
        storySections: [
          section("The situation", "By midnight, experts say the clip is probably fake. Then a second problem appears: the candidate claims that several older, genuine recordings are also AI fakes."),
          section("The pressure", "Deepfakes do not only create false evidence. They can also make real evidence easier to deny. Suddenly, the phrase 'that could be AI' becomes a shield for anyone caught on camera."),
          section("The question", "A society can be harmed both by believing fakes and by becoming unable to trust anything at all."),
        ],
        prompt: "How should a community respond when the possibility of deepfakes is used to dismiss real evidence?",
        options: [
          { label: "A", text: "Require a chain of evidence: source, time, metadata, corroboration, and expert review.", reflection: "This is epistemic discipline. It asks for more than vibes, but it may be hard to do quickly.", lens: "epistemic-care" },
          { label: "B", text: "Put the burden on the person calling evidence fake to provide reasons, not just suspicion.", reflection: "You resist the liar's dividend by refusing vague doubt as a universal escape hatch.", lens: "burden-of-proof" },
          { label: "C", text: "Assume high-stakes media is unreliable until trusted institutions verify it.", reflection: "This reduces gullibility, but it can also make citizens passive if institutions are slow or distrusted.", lens: "institutional-trust" },
        ],
        counterpoint: "Skepticism is healthy when it asks for reasons. It becomes corrosive when it treats every inconvenient fact as equally doubtful.",
      },
      {
        id: "your-side",
        kicker: "Act 3 - the test",
        title: "When the fake helps your side",
        storySections: [
          section("The situation", "By morning, you learn that the fake is damaging the candidate you oppose. A friend says, 'Even if the clip is fake, the candidate is awful. Why help them?'"),
          section("The pressure", "Now the dilemma has teeth. Correcting the record may help someone you think would make the school worse. Ignoring the fake may help your side win."),
          section("The question", "The real test is whether truth is a principle or merely a tactic."),
        ],
        prompt: "What should guide your response when misinformation benefits a cause you support?",
        options: [
          { label: "A", text: "Correct the falsehood, then argue against the candidate using real reasons.", reflection: "This preserves both civic integrity and political disagreement. You do not need lies to take a side.", lens: "civic-integrity" },
          { label: "B", text: "Stay quiet because the larger outcome matters more than one misleading clip.", reflection: "This is a consequentialist temptation. The danger is teaching your side that truth only matters when useful.", lens: "utilitarian" },
          { label: "C", text: "Publicly state the uncertainty and ask others to slow down too.", reflection: "You model intellectual honesty without pretending to know more than the evidence supports.", lens: "epistemic-humility" },
        ],
      },
      reflection("Truth, speech, and civic responsibility", [
        { name: "Media literacy", school: "Civic reasoning", view: "Democratic judgment depends on citizens who can separate claim, evidence, source, and motive before sharing." },
        { name: "Free-speech liberalism", school: "Political philosophy", view: "Open debate is valuable, but deepfakes test whether counterspeech can keep pace with synthetic deception." },
        { name: "Virtue ethics", school: "Character", view: "The question is not only what platforms should permit, but what kind of truth-teller each person is becoming." },
      ]),
    ],
    philosophyLab: lab({
      discussion: "The strongest removal argument emphasizes urgent democratic harm. The strongest speech argument warns that emergency censorship can become a tool for suppressing inconvenient claims. The better question may be: what response is narrow enough to protect elections without treating all controversial media as forbidden?",
      fallacySpotting: "Spot the false dilemma in this claim: 'Either we ban every political deepfake immediately, or democracy is over.' What third or fourth options does it erase?",
      argumentRepair: "Rewrite 'Only gullible people fall for deepfakes' as a stronger argument about speed, emotion, and verification.",
      variationPrompt: "Create a version where the media is satire, not deception. What detail changes your answer?",
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
          section("The situation", "A company uses an AI screener to rank applicants for internships. The vendor says the tool never sees race or gender. Then an internal audit shows that women, Black applicants, and applicants from community colleges are being ranked lower at unusual rates."),
          section("The pressure", "No one typed 'reject these groups' into the system. The model learned from past hiring decisions, old performance reviews, and proxies like school, gap years, and career path."),
          section("The question", "A biased result can emerge without a biased instruction. That makes responsibility harder to locate, not less real."),
        ],
        prompt: "What should the company do first?",
        options: [
          { label: "A", text: "Pause the AI screener for high-stakes decisions until an independent audit explains the pattern.", reflection: "You prevent ongoing harm and demand outside scrutiny. The cost is speed and convenience.", lens: "precautionary" },
          { label: "B", text: "Keep using it while improving the training data and fairness metrics.", reflection: "You aim for a technical fix, but people may continue being harmed while the fix is tested.", lens: "technical-fix" },
          { label: "C", text: "Add human review for every rejection near the cutoff.", reflection: "You protect borderline applicants, but human reviewers can also carry the same old assumptions.", lens: "procedural" },
          { label: "D", text: "Publicly disclose the audit and invite affected applicants to be reconsidered.", reflection: "You treat transparency and repair as part of justice, not an optional public-relations move.", lens: "remedial" },
        ],
      },
      {
        id: "opacity",
        kicker: "Act 2 - the black box",
        title: "The vendor will not open the model",
        storySections: [
          section("The situation", "The vendor says the model is proprietary. It offers a summary report but refuses to reveal enough for the company, applicants, or regulators to understand how rankings are produced."),
          section("The pressure", "The company wants efficiency. Applicants want a fair chance. The vendor wants secrecy. The law may still hold the employer responsible for discriminatory outcomes, even if the tool is outsourced."),
          section("The question", "Opacity is not neutral when it blocks accountability."),
        ],
        prompt: "What standard should apply to high-stakes AI systems that affect opportunity?",
        options: [
          { label: "A", text: "No independent audit, no deployment.", reflection: "This puts accountability before convenience. It also may reduce access to tools that could be made fairer.", lens: "accountability" },
          { label: "B", text: "Allow deployment only with outcome monitoring and appeal rights.", reflection: "You combine usefulness with procedural protection, but the appeals process must be real.", lens: "due-process" },
          { label: "C", text: "Require explanations for every rejected applicant.", reflection: "This honors dignity and contestability, but explanations can be incomplete or misleading if the model is complex.", lens: "transparency" },
        ],
        counterpoint: "A model can be technically complex without being morally exempt. 'We cannot explain it' is not the same as 'no one is responsible.'",
      },
      {
        id: "repair",
        kicker: "Act 3 - after the harm",
        title: "The rejected applicants",
        storySections: [
          section("The situation", "The audit covers two years. Hundreds of candidates may have lost interviews. Some moved on. Some never knew a machine screened them out."),
          section("The pressure", "Fixing future data does not repair past exclusion. But re-opening every decision is expensive and may still not reveal who would have been hired."),
          section("The question", "Justice asks both how to stop the system and what is owed to people already affected by it."),
        ],
        prompt: "What does repair require?",
        options: [
          { label: "A", text: "Re-review affected applications and offer new interviews where warranted.", reflection: "This is concrete repair, even if imperfect. It treats lost opportunity as a real harm.", lens: "remedial" },
          { label: "B", text: "Change the pipeline: recruitment, criteria, and human decision-making, not just the algorithm.", reflection: "You are looking beyond the tool to the social pattern it learned from.", lens: "structural" },
          { label: "C", text: "Publish the failure and require continuing audits before the tool can return.", reflection: "You make the lesson public so others can learn and so future harm is harder to hide.", lens: "transparency" },
        ],
      },
      reflection("Fairness when nobody wrote the bias down", [
        { name: "Algorithmic fairness", school: "AI ethics", view: "Fairness is not guaranteed by removing explicit protected categories; proxies and historical patterns can reproduce exclusion." },
        { name: "Disparate impact", school: "Civil rights law", view: "A practice can be discriminatory in effect even without an openly discriminatory intention." },
        { name: "Structural ethics", school: "Justice", view: "The algorithm may be a symptom of a wider institution that already defined merit unequally." },
      ]),
    ],
    philosophyLab: lab({
      discussion: "One argument says the tool should be paused because high-stakes systems must earn trust before use. Another says stopping the tool may preserve older human biases without improving anything. A stronger response asks which combination of audit, appeal, repair, and institutional change actually reduces injustice.",
      fallacySpotting: "Spot the appeal to ignorance: 'We did not tell the AI to discriminate, so the system is fair.' What evidence is missing?",
      argumentRepair: "Turn 'AI hiring is always biased' into a testable claim with criteria for evidence.",
      variationPrompt: "Create a version where the AI reduces one kind of bias but increases another. What should the company do?",
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
          section("The situation", "Your family is shopping for a self-driving car. Buried in the safety settings is a policy statement: in unavoidable crashes, the vehicle will minimize expected loss of life, even if that means sacrificing passengers."),
          section("The pressure", "Most people praise that rule when they imagine themselves as bystanders. Fewer people want to buy a car that might choose against them."),
          section("The question", "Moral judgment changes when a principle moves from a survey answer into a machine you trust with your body."),
        ],
        prompt: "What kind of crash rule should autonomous vehicles be allowed to use?",
        options: [
          { label: "A", text: "Minimize total expected harm, even when passengers bear the cost.", reflection: "This is the clean consequentialist answer. It may also be the answer people resist buying.", lens: "utilitarian" },
          { label: "B", text: "Protect passengers because the car has a special duty to those who entrusted themselves to it.", reflection: "You emphasize role-based responsibility, but a public road is not a private moral universe.", lens: "partialism" },
          { label: "C", text: "Require public safety standards rather than consumer-selectable moral settings.", reflection: "You prevent a marketplace of selfish algorithms. The hard question becomes who writes the standard.", lens: "procedural" },
          { label: "D", text: "Invest first in design that makes forced-choice crashes rarer.", reflection: "You ask why we are programming trolley cases instead of preventing them. Avoidance is not evasion if it reduces real risk.", lens: "design-out" },
        ],
      },
      {
        id: "moral-machine",
        kicker: "Act 2 - the survey",
        title: "Millions of answers, no single world",
        storySections: [
          section("The situation", "Your class studies a global survey about autonomous-vehicle dilemmas. Many people prefer saving more lives, but patterns differ across cultures, ages, and social assumptions."),
          section("The pressure", "If public preferences differ, should cars reflect local majority values, universal safety principles, professional engineering codes, or something else?"),
          section("The question", "A democratic vote can reveal what people think. It does not automatically prove what machines should do."),
        ],
        prompt: "How much should public preference shape autonomous-vehicle ethics?",
        options: [
          { label: "A", text: "Use public preference as evidence, but not as the final rule.", reflection: "This respects democratic input while admitting that majority opinion can be morally flawed.", lens: "deliberative" },
          { label: "B", text: "Let local communities set values because they live with the risks.", reflection: "You value cultural legitimacy, but local norms can conflict with universal rights or safety duties.", lens: "communitarian" },
          { label: "C", text: "Follow professional safety codes and human-rights constraints even against majority preference.", reflection: "You give expertise and rights a gatekeeping role. The risk is technocratic distance from public trust.", lens: "rights-based" },
        ],
        counterpoint: "A survey can tell us what people prefer under pressure. It cannot by itself tell us which preferences deserve to become code.",
      },
      {
        id: "accountability",
        kicker: "Act 3 - after the crash",
        title: "The explanation no one wants",
        storySections: [
          section("The situation", "A crash happens. The car followed its certified rule, but someone dies. The passenger's family blames the company. Pedestrians blame the owner. Engineers say the system behaved as designed."),
          section("The pressure", "When a human driver makes a tragic choice, we ask about judgment. When a machine acts, we ask who encoded the judgment before the day arrived."),
          section("The question", "Responsibility spreads across designers, regulators, owners, and public standards."),
        ],
        prompt: "Who should be accountable for a machine's moral rule?",
        options: [
          { label: "A", text: "The manufacturer, because it designed and marketed the rule.", reflection: "This creates strong incentives for safety, but companies will argue they followed public standards.", lens: "accountability" },
          { label: "B", text: "The regulator, because society approved the rule before deployment.", reflection: "This recognizes public authority, but victims may still need someone concrete to answer for harm.", lens: "procedural" },
          { label: "C", text: "Accountability should be shared through audits, disclosure, insurance, and public review.", reflection: "You treat autonomous safety as a system, not a single villain. That is realistic, but harder to explain emotionally.", lens: "systems" },
        ],
      },
      reflection("From moral intuition to machine rule", [
        { name: "Trolley ethics", school: "Moral philosophy", view: "The classic dilemma asks how consequences, duties, and intention interact when harm cannot be avoided." },
        { name: "Moral Machine research", school: "AI ethics", view: "Large surveys reveal patterns in public intuition, including cross-cultural variation, but do not settle what code should do." },
        { name: "Engineering ethics", school: "Professional responsibility", view: "Engineers have duties to safety, transparency, and public welfare that cannot be reduced to consumer preference." },
      ]),
    ],
    philosophyLab: lab({
      discussion: "A utilitarian rule is attractive because it treats every life as countable. A passenger-protection rule is attractive because trust often depends on special obligations. A design-focused reply asks whether the most ethical crash rule is the one that makes the crash less likely in the first place.",
      fallacySpotting: "Spot the popularity fallacy: 'Millions of survey respondents chose this rule, so it must be the ethical rule.'",
      argumentRepair: "Make a stronger version of the public-preference argument that explains when public input should matter and when it should be constrained.",
      variationPrompt: "Create a version involving a school bus, an emergency vehicle, or a rural road with no pedestrians. Which details should change the rule?",
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
          section("The situation", "Your class has been asked to design a new school from scratch: funding, discipline, course access, disability support, grading, privacy, and student voice."),
          section("The pressure", "Before you vote, the teacher adds Rawls's catch: once the rules are set, you will be randomly assigned a place in the school. You might be advanced, struggling, wealthy, poor, popular, isolated, disabled, undocumented, or new to English."),
          section("The question", "The veil removes the information that would let you rig the rules for yourself."),
        ],
        prompt: "What principles should guide the school you design?",
        options: [
          { label: "A", text: "Guarantee equal basic liberties first: voice, safety, conscience, privacy, and fair process for everyone.", reflection: "This captures Rawls's liberty principle. Some freedoms should not be traded away for convenience or total benefit.", lens: "rights-based" },
          { label: "B", text: "Allow inequalities only when they improve the position of students who are worst off.", reflection: "This follows the difference principle. Inequality must justify itself to those with the least power.", lens: "rawlsian" },
          { label: "C", text: "Maximize total achievement, even if some students receive much less.", reflection: "This utilitarian answer may raise averages, but the veil asks whether you would risk being sacrificed by the average.", lens: "utilitarian" },
          { label: "D", text: "Maximize choice and freedom; unequal outcomes are acceptable if rules are fair.", reflection: "This libertarian answer protects choice, but critics ask whether freedom is meaningful without real opportunity.", lens: "libertarian" },
        ],
      },
      {
        id: "least-advantaged",
        kicker: "Act 2 - the assignment",
        title: "The veil lifts",
        storySections: [
          section("The situation", "The veil lifts. You are assigned to a school with old devices, large classes, limited counseling, and fewer advanced courses."),
          section("The pressure", "Rules that sounded efficient from nowhere now look different from somewhere. You can still defend them, but you can no longer pretend the costs are abstract."),
          section("The question", "Rawls thought fairness should be tested from the position you would least want to occupy."),
        ],
        prompt: "What does this reveal about fair rule design?",
        options: [
          { label: "A", text: "The best rules are those you can defend to the least advantaged person affected by them.", reflection: "This is Rawlsian fairness in plain language: justify the system from the bottom, not the top.", lens: "rawlsian" },
          { label: "B", text: "Rules should still reward effort and excellence, but only after basic fairness is secure.", reflection: "You are combining merit with a floor of justice. The fight will be over where the floor belongs.", lens: "balanced" },
          { label: "C", text: "The veil hides too much. Real people have real attachments and should be allowed to favor their communities.", reflection: "This communitarian objection says impartiality can become too thin and detached.", lens: "communitarian" },
        ],
        counterpoint: "The veil is not meant to erase compassion for actual people. It is meant to prevent private advantage from pretending to be justice.",
      },
      {
        id: "ai-policy",
        kicker: "Act 3 - the AI rule",
        title: "A policy before you know your access",
        storySections: [
          section("The situation", "Now apply the veil to an AI policy. You do not know whether you will have paid AI tools at home, unreliable internet, a parent who can help, a disability accommodation, or a teacher suspicious of AI."),
          section("The pressure", "A policy that seems fair to students with resources may punish students without them. A policy that permits everything may hide unequal support behind the word 'choice.'"),
          section("The question", "Technology policy is also justice policy."),
        ],
        prompt: "What AI policy would you choose from behind the veil?",
        options: [
          { label: "A", text: "Equal access, required disclosure, and assignments designed to show process.", reflection: "You protect opportunity and honesty at the same time. The policy asks schools to provide access, not just police use.", lens: "equity" },
          { label: "B", text: "Strict limits until every student has comparable access and support.", reflection: "You prioritize fairness before innovation. The risk is freezing useful learning tools while conditions improve.", lens: "precautionary" },
          { label: "C", text: "Flexible teacher judgment with an appeal process for disputed cases.", reflection: "You preserve human context, but flexibility without process can become uneven or biased.", lens: "procedural" },
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
      discussion: "Rawls's thought experiment is powerful because it makes self-interest temporarily unavailable. Critics argue that the veil may hide too much: real people care about families, communities, and projects. The debate is whether impartial fairness reveals justice or strips away morally important attachments.",
      fallacySpotting: "Spot the straw man: 'Rawls thinks everyone should have exactly the same life.' What does this misrepresent?",
      argumentRepair: "Rewrite the criticism so it targets the difference principle accurately.",
      variationPrompt: "Design a veil-of-ignorance version for school discipline, course placement, or AI access.",
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
          section("The situation", "Imagine people chained in a cave from childhood. They can look only at a wall. Behind them, unseen puppeteers move objects in front of a fire, casting shadows. The prisoners name the shadows, argue about them, and build a whole culture around predicting them."),
          section("The pressure", "To the prisoners, the shadows are not 'fake.' They are the only public world anyone has ever known. A person who doubts them sounds confused, arrogant, or dangerous."),
          section("The question", "Plato asks whether education is merely adding facts or turning the whole soul toward what is more real."),
        ],
        prompt: "What is the cave mainly a story about?",
        options: [
          { label: "A", text: "The duty to question appearances and seek deeper truth.", reflection: "This follows Plato's realist reading: appearances can be ordered by how fully they reveal reality.", lens: "platonic" },
          { label: "B", text: "The social comfort of shared illusion.", reflection: "This psychological reading asks why people protect familiar beliefs even when evidence threatens them.", lens: "psychological" },
          { label: "C", text: "The danger of one group claiming it alone sees the truth.", reflection: "This critical reading asks who gets authority to call others trapped in shadows.", lens: "anti-authoritarian" },
          { label: "D", text: "The responsibility of education to help people turn around, not simply memorize more shadows.", reflection: "This treats the allegory as a theory of teaching and civic formation.", lens: "education" },
        ],
      },
      {
        id: "outside",
        kicker: "Act 2 - the ascent",
        title: "The painful light",
        storySections: [
          section("The situation", "One prisoner is freed. At first the fire hurts his eyes. Then daylight hurts more. Only slowly does he see objects, sky, and finally the sun itself."),
          section("The pressure", "Plato's sun represents the Form of the Good: not just one more fact, but the source that makes truth and value intelligible. The ascent is not comfortable enlightenment. It is disorientation before understanding."),
          section("The question", "If truth is painful at first, students may resist it for reasons deeper than laziness."),
        ],
        prompt: "What does the painful ascent suggest about learning?",
        options: [
          { label: "A", text: "Real learning can feel like losing the world before gaining a better one.", reflection: "You are taking Plato seriously: education can disrupt identity, not just fill memory.", lens: "transformative" },
          { label: "B", text: "Pain is not proof of truth; difficult ideas still need evidence and humility.", reflection: "You resist romanticizing discomfort. False beliefs can be painful too.", lens: "epistemic-care" },
          { label: "C", text: "Teachers should guide the turn, not shame students for loving the cave.", reflection: "This connects knowledge with care. The learner's attachment to the old world matters.", lens: "care" },
        ],
        counterpoint: "Not every uncomfortable claim is true. The cave teaches us to question appearances, but it does not license every self-declared truth-teller.",
      },
      {
        id: "return",
        kicker: "Act 3 - the return",
        title: "Back into the algorithmic cave",
        storySections: [
          section("The situation", "The freed prisoner returns to the cave. His eyes no longer adjust to the dark. The others laugh at him, then grow angry. He cannot simply upload daylight into their minds."),
          section("The pressure", "Now imagine the cave is an algorithmic feed: personalized news, recommendation loops, group identity, and AI-generated media. Leaving may mean losing friends, certainty, and the pleasure of being agreed with."),
          section("The question", "If you think you see more clearly, what do you owe people still inside, and what humility do you owe them about your own view?"),
        ],
        prompt: "What responsibility comes with believing you have seen beyond the shadows?",
        options: [
          { label: "A", text: "Return and teach, even when people resist.", reflection: "This is Plato's civic-duty answer. Knowledge carries obligation.", lens: "civic-duty" },
          { label: "B", text: "Return carefully, because calling others trapped can become domination.", reflection: "You keep the duty to help but add humility about power and perspective.", lens: "epistemic-humility" },
          { label: "C", text: "Build exits: shared evidence practices, comparison tools, and spaces where changing your mind is safe.", reflection: "You translate the cave into civic design, not just heroic truth-telling.", lens: "design-out" },
        ],
      },
      reflection("Education as the difficult turn toward truth", [
        { name: "Plato", school: "Republic Book VII", view: "The cave describes education as turning the soul from shadows toward the Good, then returning for the sake of the city." },
        { name: "Form of the Good", school: "Platonic metaphysics", view: "The Good is the source of intelligibility and value, represented by the sun outside the cave." },
        { name: "Contemporary critique", school: "Epistemic justice", view: "Modern readers ask who gets to define truth and how to avoid turning enlightenment into domination." },
      ]),
    ],
    philosophyLab: lab({
      discussion: "Plato's allegory makes truth hierarchical: some forms of knowing are better than others. A democratic worry pushes back: people who claim to see the truth can become dangerous. The challenge is to defend truth-seeking without giving unchecked power to self-appointed enlighteners.",
      fallacySpotting: "Spot the ad hominem: 'The freed prisoner looks ridiculous in the dark, so his report about the outside must be false.'",
      argumentRepair: "Turn 'everyone has their own truth' into a more careful claim about perspective, evidence, and reality.",
      variationPrompt: "Create a modern cave using social media, school reputation, political identity, or AI-generated search results.",
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
    tagline: "She knows every fact about color. Then she sees red.",
    philosophyTheme: "knowledge",
    secondaryThemes: ["reality", "reasoning"],
    estimatedMinutes: 12,
    stages: [
      {
        id: "room",
        kicker: "Act 1 - all the facts",
        title: "The black-and-white expert",
        storySections: [
          section("The situation", "Mary is a brilliant scientist who has lived her entire life in a black-and-white room. She studies color through books, instruments, brain scans, and equations. She knows every physical fact about wavelengths, cones, neural pathways, and color language."),
          section("The pressure", "If physical science tells the complete story, then Mary should already know everything there is to know about red. If she learns something new when she sees red, then maybe experience contains a kind of knowledge facts alone do not capture."),
          section("The question", "This is not a puzzle about color trivia. It is a challenge to physicalism: the view that all facts are ultimately physical facts."),
        ],
        prompt: "When Mary first sees a red rose, does she learn something new?",
        options: [
          { label: "A", text: "Yes. She learns what red is like from the inside.", reflection: "This is the knowledge argument for qualia: conscious experience seems to add something facts alone missed.", lens: "qualia-realism" },
          { label: "B", text: "No new fact. She gains an ability to recognize, remember, and imagine red.", reflection: "This is the ability hypothesis. Mary changes, but not because non-physical facts exist.", lens: "ability-hypothesis" },
          { label: "C", text: "No. If she truly knew every physical fact, nothing would surprise her.", reflection: "This physicalist reply says the thought experiment quietly underestimates complete physical knowledge.", lens: "physicalist" },
          { label: "D", text: "The word 'knows' is doing two jobs: knowing facts and knowing experience.", reflection: "This pluralist answer dissolves part of the fight by separating kinds of knowledge.", lens: "epistemic-pluralism" },
        ],
      },
      {
        id: "poem",
        kicker: "Act 2 - language reaches",
        title: "The best description of red",
        storySections: [
          section("The situation", "Before leaving the room, Mary reads the most vivid description of red ever written. She studies paintings described by experts, hears music paired with red, and watches brain data from people seeing red."),
          section("The pressure", "Language can prepare, suggest, and provoke imagination. But does even perfect description cross the gap between knowing about an experience and having it?"),
          section("The question", "The more powerful the description becomes, the harder it is to say exactly where experience begins."),
        ],
        prompt: "Can description ever substitute for experience?",
        options: [
          { label: "A", text: "No. Description can point toward experience, but it cannot become the experience.", reflection: "You preserve the force of the knowledge argument: there remains something it is like.", lens: "qualia-realism" },
          { label: "B", text: "Partly. Language can build concepts that shape what Mary notices when she finally sees red.", reflection: "This makes knowledge layered rather than all-or-nothing.", lens: "phenomenal-concepts" },
          { label: "C", text: "Yes in principle, if the description includes every physical and functional detail.", reflection: "This strengthens physicalism by denying that the gap proves non-physical facts.", lens: "physicalist" },
        ],
        counterpoint: "Be careful: 'I cannot imagine how facts could explain experience' is not yet proof that facts cannot explain it.",
      },
      {
        id: "ai",
        kicker: "Act 3 - fluent without seeing",
        title: "The AI that describes red",
        storySections: [
          section("The situation", "An AI writes a moving poem about red, explains color science, and compares red to heat, danger, embarrassment, roses, blood, and stop signs. It has processed millions of descriptions and images."),
          section("The pressure", "The output seems rich. But does the system know what red is like, or only how humans talk about what red is like?"),
          section("The question", "Mary's Room becomes an AI question: can fluent description amount to understanding without lived experience?"),
        ],
        prompt: "What does Mary's Room suggest about AI understanding?",
        options: [
          { label: "A", text: "AI can describe experience without having experience.", reflection: "You distinguish linguistic performance from phenomenal consciousness.", lens: "qualia-realism" },
          { label: "B", text: "If the AI uses concepts appropriately, that may be the relevant kind of understanding.", reflection: "You shift from inner feeling to functional use.", lens: "functionalist" },
          { label: "C", text: "We should separate different claims: description, recognition, embodiment, and consciousness.", reflection: "This careful answer avoids turning one word, 'understand,' into a trap.", lens: "epistemic-care" },
        ],
      },
      reflection("Facts, experience, and what it is like", [
        { name: "Frank Jackson", school: "1982", view: "Used Mary's Room to argue that complete physical knowledge may still miss facts about conscious experience." },
        { name: "Ability hypothesis", school: "Lewis / Nemirow", view: "Mary gains abilities to recognize, imagine, and remember color, not new propositional facts." },
        { name: "Physicalist replies", school: "Philosophy of mind", view: "Critics argue that the case underestimates what complete physical knowledge would include." },
        { name: "AI connection", school: "Philosophy of technology", view: "The case asks whether fluent representation can be separated from lived or embodied experience." },
      ]),
    ],
    philosophyLab: lab({
      discussion: "The knowledge argument is powerful because it isolates a small moment: Mary sees red. Supporters say that moment reveals non-physical facts. Critics say the case smuggles in an incomplete idea of physical knowledge or confuses knowing facts with gaining abilities.",
      fallacySpotting: "Spot the equivocation: 'Mary knows everything about red, so she must know red.' How does 'know' change meanings?",
      argumentRepair: "Make the physicalist objection stronger without dismissing experience as fake.",
      variationPrompt: "Create a Mary's Room for music, pain, friendship, grief, or an AI trained only on text.",
      related: ["Chinese Room", "Experience Machine", "Plato's Cave"],
    }),
    teacherKit: kit({
      theme: "Knowledge - facts, experience, and consciousness",
      objectives: [
        "Students will explain the knowledge argument and its target, physicalism.",
        "Students will compare qualia realism, the ability hypothesis, phenomenal-concept responses, and physicalist replies.",
        "Students will apply Mary's Room to AI systems that describe experiences they may not have.",
      ],
      warmUp: "Ask students to describe a sensory experience to someone who has never had it. Then ask what the listener now knows and does not know.",
      discussionPrompts: [
        "What exactly might Mary learn when she sees red?",
        "Is 'knowing what it is like' a fact, an ability, or something else?",
        "Can language reduce the gap between description and experience?",
        "What does this imply about AI that describes human experience fluently?",
      ],
      handout: "Mary's Room argument map: premise, conclusion, physicalist reply, ability reply, AI application, strongest objection.",
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
          section("The situation", "A person who knows no Chinese sits in a locked room with an enormous rule book. Chinese characters come in. The person follows instructions for matching and rearranging symbols, then sends Chinese characters back out."),
          section("The pressure", "People outside the room think they are conversing with someone fluent. Inside, the person understands none of the meanings. Searle's point is sharp: manipulating symbols by formal rules may produce correct output without understanding."),
          section("The question", "The room appears intelligent from the outside. Does the system understand, or only simulate understanding?"),
        ],
        prompt: "Where, if anywhere, is understanding located?",
        options: [
          { label: "A", text: "Nowhere. Syntax is not semantics.", reflection: "This is Searle's intended conclusion: formal symbol manipulation alone does not create meaning.", lens: "searlean" },
          { label: "B", text: "In the whole system: person, rule book, memory, and process together.", reflection: "This is the Systems Reply. No part understands alone, but the organized whole might.", lens: "systems-reply" },
          { label: "C", text: "Understanding is functional: if the system uses language correctly, that is enough.", reflection: "Functionalism shifts the test from inner feeling to role, behavior, and integration.", lens: "functionalist" },
          { label: "D", text: "We cannot tell from output alone, and that uncertainty matters.", reflection: "You emphasize epistemic humility: behavior is evidence, but not a window into inner life.", lens: "epistemic-humility" },
        ],
      },
      {
        id: "replies",
        kicker: "Act 2 - the replies",
        title: "Give the room a body",
        storySections: [
          section("The situation", "Critics modify the case. What if the room controls a robot with cameras and hands? What if the rule book simulates the firing of neurons in a native speaker's brain? What if the person memorizes the whole rule book?"),
          section("The pressure", "Each reply tries to move the room closer to real understanding: embodiment, whole-system organization, or brain-like structure."),
          section("The question", "Searle says simulation is not duplication. A computer simulation of digestion does not digest. Does a simulation of understanding understand?"),
        ],
        prompt: "Which reply puts the most pressure on Searle's argument?",
        options: [
          { label: "A", text: "The Systems Reply, because understanding may belong to the organized whole.", reflection: "You reject the demand that one inner part must understand in isolation.", lens: "systems-reply" },
          { label: "B", text: "The Robot Reply, because meaning may require contact with the world.", reflection: "You make embodiment and action central to semantics.", lens: "embodied" },
          { label: "C", text: "The Brain Simulator Reply, because duplicating the relevant causal structure may be enough.", reflection: "You ask whether the right process matters more than the material it is made from.", lens: "functionalism" },
          { label: "D", text: "None. More complicated symbol handling is still symbol handling.", reflection: "You stay with Searle: adding machinery does not create intrinsic meaning.", lens: "searlean" },
        ],
      },
      {
        id: "llm",
        kicker: "Act 3 - the chat window",
        title: "The modern room writes back",
        storySections: [
          section("The situation", "A large language model explains jokes, writes poems, translates, apologizes, revises, and responds to new contexts. It does not use Searle's printed rule book, but it still transforms patterns into language."),
          section("The pressure", "Calling it 'just prediction' may undersell what prediction across language can do. Calling it understanding may oversell what is happening inside."),
          section("The question", "The Chinese Room does not give us an easy anti-AI slogan. It gives us a question: what would count as understanding, and why?"),
        ],
        prompt: "How should the Chinese Room shape our judgment of modern AI?",
        options: [
          { label: "A", text: "It warns us not to confuse convincing language with understanding.", reflection: "You protect the distinction between performance and mind.", lens: "searlean" },
          { label: "B", text: "It forces us to define understanding more carefully instead of treating it as magic.", reflection: "You use the case as conceptual hygiene, not a verdict.", lens: "conceptual-clarity" },
          { label: "C", text: "It may need updating because modern systems learn, generalize, and interact in ways the original room did not.", reflection: "You argue that the analogy remains useful but incomplete.", lens: "revisionist" },
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
      discussion: "The Chinese Room is often used too quickly as 'AI does not understand.' Searle's actual target is more precise: formal computation alone is not sufficient for semantics. Replies challenge whether he has described the relevant system fairly or demanded too much from one part of it.",
      fallacySpotting: "Spot the straw man: 'Searle says computers can never be useful with language.' What is his narrower claim?",
      argumentRepair: "Make the Systems Reply stronger by explaining why understanding might belong to a whole process rather than an isolated person.",
      variationPrompt: "Create a Chinese Room case with a robot body, a learning model, or a classroom tutor.",
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
          section("The situation", "A machine can give you any experiences you want. You will feel loved, accomplished, brave, creative, and fulfilled. You will not know you are plugged in. From the inside, your life will feel entirely real."),
          section("The pressure", "If pleasure and felt satisfaction are all that matter, the machine seems like a gift. Nozick designed the case to test that assumption."),
          section("The question", "Most people hesitate. That hesitation may reveal values we did not know how to name."),
        ],
        prompt: "Would you plug in for the rest of your life?",
        options: [
          { label: "A", text: "Yes. A life filled with the best experiences is a good life.", reflection: "This is the hedonist answer: what matters is how life feels from the inside.", lens: "hedonism" },
          { label: "B", text: "No. I want to actually do things, not merely experience doing them.", reflection: "This follows Nozick: we care about reality, agency, and being a certain kind of person.", lens: "authenticity" },
          { label: "C", text: "I would use it temporarily but not surrender my whole life.", reflection: "You separate enrichment from replacement. The boundary matters.", lens: "pragmatic" },
          { label: "D", text: "I am unsure because ordinary life already includes mediated and constructed experiences.", reflection: "You complicate the contrast between real and simulated.", lens: "gradient" },
        ],
      },
      {
        id: "status-quo",
        kicker: "Act 2 - the framing",
        title: "What if you are already inside?",
        storySections: [
          section("The situation", "Now reverse the case. You wake up and learn that your current life has been an experience machine all along. Technicians offer to unplug you into a harder, less satisfying reality."),
          section("The pressure", "People who refuse to plug in may also refuse to unplug. That suggests our answers may depend partly on fear, attachment, and status quo bias."),
          section("The question", "A thought experiment can reveal a value, but it can also reveal how framing shapes our intuitions."),
        ],
        prompt: "Does the reversal weaken Nozick's argument?",
        options: [
          { label: "A", text: "Yes. If answers change with framing, the intuition is less decisive.", reflection: "You challenge the experiment's evidential force. A shaky intuition may not defeat hedonism.", lens: "framing" },
          { label: "B", text: "No. Attachment explains hesitation, but it does not erase the value of reality.", reflection: "You preserve Nozick's conclusion while admitting psychology complicates the data.", lens: "authenticity" },
          { label: "C", text: "It shows that the question is not yes or no; it is what kind of relation to reality matters.", reflection: "You move from a binary choice to a richer theory of authenticity.", lens: "epistemic-pluralism" },
        ],
        counterpoint: "If a thought experiment depends entirely on first reactions, it may tell us as much about psychology as about morality.",
      },
      {
        id: "education",
        kicker: "Act 3 - simulated mastery",
        title: "The classroom machine",
        storySections: [
          section("The situation", "An AI tutor can make a student feel fluent: instant hints, polished drafts, practice problems adjusted perfectly, praise at every step. The student feels mastery before struggling through confusion."),
          section("The pressure", "Education is not only the experience of knowing. It may also involve becoming the kind of person who can inquire, revise, fail, and persist."),
          section("The question", "The experience machine becomes an education question: should learning feel successful if the learner has not done the work that makes success real?"),
        ],
        prompt: "What should educators protect when AI can simulate mastery?",
        options: [
          { label: "A", text: "Protect authentic struggle and evidence of independent understanding.", reflection: "You value the process of becoming capable, not just the feeling of competence.", lens: "authenticity" },
          { label: "B", text: "Use AI to create better experiences, then assess transfer without the machine.", reflection: "You avoid both rejection and surrender: support can be useful if understanding becomes portable.", lens: "balanced" },
          { label: "C", text: "Prioritize student well-being; if the experience builds confidence, it has value.", reflection: "You take felt experience seriously, while still needing to ask what confidence is based on.", lens: "care" },
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
      discussion: "Nozick's case works because it strips life down to felt experience. Refusing the machine suggests that reality, agency, and actual achievement matter. But reversal cases make the argument more complicated: maybe we are attached to whatever life we already inhabit.",
      fallacySpotting: "Spot the loaded question: 'Why would anyone choose miserable reality over happiness?' What assumption is built into the wording?",
      argumentRepair: "Make the pro-machine argument as strong as possible without mocking authenticity.",
      variationPrompt: "Create a version involving VR school, AI friendship, sports training, or a memory implant.",
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
          section("The situation", "Glaucon tells Socrates about Gyges, a shepherd who finds a ring that makes him invisible. Gyges uses it to seduce, kill, and seize a kingdom."),
          section("The pressure", "Glaucon's challenge is not simply that one bad person misused power. It is that anyone, given perfect impunity, would be tempted to do the same. Maybe justice is only what we perform because others can see us."),
          section("The question", "If punishment and reputation disappear, what remains of morality?"),
        ],
        prompt: "Why be just when injustice has no consequences?",
        options: [
          { label: "A", text: "Because justice is good for the soul, not just useful for reputation.", reflection: "This anticipates Socrates's reply: injustice damages the person who practices it.", lens: "intrinsic-value" },
          { label: "B", text: "Most people would not remain just. Social pressure does more work than we admit.", reflection: "This is Glaucon's challenge. It treats morality as a bargain under surveillance.", lens: "social-pressure" },
          { label: "C", text: "Character matters: invisibility reveals who has practiced virtue.", reflection: "This virtue-ethics answer says habits shape what power exposes.", lens: "virtue-ethics" },
          { label: "D", text: "The real issue is power without accountability, not invisibility itself.", reflection: "You move from individual temptation to institutional design.", lens: "accountability" },
        ],
      },
      {
        id: "socrates",
        kicker: "Act 2 - the reply",
        title: "The disorder inside",
        storySections: [
          section("The situation", "Socrates does not answer by saying, 'You will get caught.' He argues that injustice disorders the soul. A tyrant may look powerful from outside while being ruled by appetite, fear, and endless need."),
          section("The pressure", "This answer is strange to modern ears. It says morality is not mainly external control. It is a form of inner order."),
          section("The question", "If injustice benefits you externally but corrodes you internally, is it really a benefit?"),
        ],
        prompt: "How strong is Socrates's answer to Glaucon?",
        options: [
          { label: "A", text: "Strong. A life ruled by unchecked appetite is not a flourishing life.", reflection: "You accept that justice has intrinsic value because it orders the self.", lens: "virtue-ethics" },
          { label: "B", text: "Weak. It sounds like redefining harm so the unjust person always secretly loses.", reflection: "You challenge Socrates to provide evidence that inner disorder outweighs external gain.", lens: "skeptical" },
          { label: "C", text: "Partly strong. It explains character, but institutions still need accountability.", reflection: "You combine moral psychology with civic design.", lens: "balanced" },
        ],
        counterpoint: "A theory that says injustice always harms the unjust person must explain cases where unjust people appear calm, wealthy, and admired.",
      },
      {
        id: "modern-ring",
        kicker: "Act 3 - the modern ring",
        title: "Anonymous, encrypted, hidden",
        storySections: [
          section("The situation", "Modern rings are not magical. They are anonymous accounts, private browsing, encrypted messages, hidden cameras, shell companies, and algorithmic systems no one can inspect."),
          section("The pressure", "Invisibility can protect whistleblowers, survivors, dissidents, and private conscience. It can also protect harassment, fraud, cruelty, and abuse of power."),
          section("The question", "The ethical problem is not simply whether invisibility is good or bad. It is how to protect privacy without creating impunity."),
        ],
        prompt: "What should a just society do with modern rings?",
        options: [
          { label: "A", text: "Protect privacy strongly because visibility can be dangerous for vulnerable people.", reflection: "You value privacy as a condition for truth, safety, and dissent.", lens: "privacy" },
          { label: "B", text: "Build accountability where hidden power can harm others.", reflection: "You distinguish privacy from impunity. The more power a ring gives, the more oversight it needs.", lens: "accountability" },
          { label: "C", text: "Teach character, but design systems assuming character will sometimes fail.", reflection: "You combine virtue ethics with realistic institutional safeguards.", lens: "virtue-ethics" },
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
      discussion: "Glaucon's challenge is uncomfortable because it turns morality into a visibility problem. Socrates replies that justice is not a performance but a form of inner health. Modern technology complicates both: privacy can be morally necessary, while hidden power can become dangerous.",
      fallacySpotting: "Spot the hasty generalization: 'People act badly online, so humans are only moral when watched.'",
      argumentRepair: "Build a stronger argument that uses evidence from anonymity without claiming it proves every person is unjust.",
      variationPrompt: "Create a modern ring involving AI-generated identity, anonymous posting, encrypted messages, or corporate secrecy.",
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
          section("The situation", "Omelas is radiant: music, festivals, safety, learning, love, and public joy. But the city depends on one child locked alone in a filthy room. Everyone eventually learns the truth."),
          section("The pressure", "If the child is freed, the city's happiness supposedly collapses. If the child remains, thousands flourish at one person's terrible expense."),
          section("The question", "Le Guin does not hand us a policy problem with clean math. She gives us a moral wound and asks what kind of bargain we are willing to accept."),
        ],
        prompt: "What should a citizen of Omelas do?",
        options: [
          { label: "A", text: "Stay because the happiness of many outweighs the suffering of one.", reflection: "This is the stark utilitarian answer, and the story is designed to make it feel morally costly.", lens: "utilitarian" },
          { label: "B", text: "Walk away because refusing complicity matters.", reflection: "This is moral witness: I will not live from that bargain, even if I cannot fix it.", lens: "moral-witness" },
          { label: "C", text: "Stay and try to free the child, even if Omelas falls.", reflection: "This is active justice. It refuses both acceptance and private purity.", lens: "active-justice" },
          { label: "D", text: "Challenge the premise that joy requires the child's suffering.", reflection: "You question the frame itself. Sometimes oppression survives by insisting there is no alternative.", lens: "anti-framing" },
        ],
      },
      {
        id: "walking",
        kicker: "Act 2 - the exit",
        title: "Where do the walkers go?",
        storySections: [
          section("The situation", "Some people leave Omelas. They do not free the child. They do not overthrow the city. They simply walk into darkness, away from the bargain."),
          section("The pressure", "Walking away preserves moral integrity, but the child remains in the room. Staying to fight may be more responsible, but staying also means continuing to benefit from the arrangement."),
          section("The question", "Refusal can be morally serious and morally incomplete at the same time."),
        ],
        prompt: "Is walking away enough?",
        options: [
          { label: "A", text: "Yes. Refusal is the only honest act when the system cannot be redeemed.", reflection: "You value moral integrity and the refusal to normalize evil.", lens: "moral-witness" },
          { label: "B", text: "No. If you know where the child is, you owe more than departure.", reflection: "You emphasize responsibility to the victim over purity of the self.", lens: "active-justice" },
          { label: "C", text: "It depends on whether staying gives you real power to change anything.", reflection: "You are asking about strategy, not only moral emotion.", lens: "pragmatic" },
        ],
        counterpoint: "If walking away makes you feel clean while leaving the child behind, the story may still be accusing you.",
      },
      {
        id: "ours",
        kicker: "Act 3 - our comforts",
        title: "No need to walk to Omelas",
        storySections: [
          section("The situation", "Now look outward: supply chains, resource extraction, underpaid moderation of violent content, exploitative labor, environmental sacrifice zones, and data work hidden behind seamless technology."),
          section("The pressure", "We rarely see the room directly. Distance, complexity, and convenience make complicity easier to deny."),
          section("The question", "The story becomes harder when Omelas looks less like a fantasy and more like ordinary comfort."),
        ],
        prompt: "What should we do when our benefits may depend on hidden suffering?",
        options: [
          { label: "A", text: "Investigate, reduce participation where possible, and refuse the clearest harms.", reflection: "You begin with personal responsibility while admitting that purity is not always possible.", lens: "responsibility" },
          { label: "B", text: "Organize for systemic change rather than treating the problem as consumer purity.", reflection: "You focus on structures that create the hidden room.", lens: "structural" },
          { label: "C", text: "Keep the child visible in every argument about the city's happiness.", reflection: "You resist abstraction. Moral accounting must include the person who pays the price.", lens: "care" },
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
      discussion: "Omelas is not a simple anti-utilitarian proof. It is an intuition pump that forces a question: what kinds of happiness are morally polluted by how they are produced? The hardest option may be active justice, because it gives up both comfortable acceptance and clean distance.",
      fallacySpotting: "Spot the false dilemma: 'Either accept Omelas or destroy everyone's happiness.' What assumptions hold that frame in place?",
      argumentRepair: "Make the argument for walking away stronger by explaining what refusal can accomplish.",
      variationPrompt: "Create an Omelas case involving a school, a technology product, or a national economy.",
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
          section("The situation", "You are walking past a shallow pond on the way to something important. A toddler is face down in the water. No one else is close enough to help. You can wade in and save the child, but your expensive shoes and phone will be ruined."),
          section("The pressure", "Almost everyone says you must save the child. Singer then asks: if you would accept a modest loss here, why not donate a similar amount to prevent a distant child from dying of a preventable cause?"),
          section("The question", "The pond is not the conclusion. It is the lever that moves distance, visibility, and emotion out of the way."),
        ],
        prompt: "What principle explains your duty in the pond?",
        options: [
          { label: "A", text: "If you can prevent serious harm without sacrificing anything comparably important, you ought to do it.", reflection: "This is Singer's central principle. It reaches far beyond the pond.", lens: "demanding-utilitarian" },
          { label: "B", text: "Immediate presence creates a special duty that distance does not.", reflection: "You defend proximity as morally relevant, not just psychologically powerful.", lens: "partialism" },
          { label: "C", text: "The duty is clear because the rescue is certain; donations involve uncertainty and institutions.", reflection: "You emphasize evidence and effectiveness rather than distance alone.", lens: "epistemic-pragmatic" },
          { label: "D", text: "I should save the child, but that does not mean morality can demand unlimited sacrifice.", reflection: "You accept the rescue while resisting the most demanding extension.", lens: "moderate-duty" },
        ],
      },
      {
        id: "distance",
        kicker: "Act 2 - across the world",
        title: "The child you do not see",
        storySections: [
          section("The situation", "A reliable charity can use the same amount of money to help prevent a child's death far away. You will not see the child. You will not get a dramatic rescue story. You may not even know the name."),
          section("The pressure", "Singer argues that distance does not reduce moral importance. Critics reply that human lives include special obligations, projects, relationships, and limits."),
          section("The question", "If distance changes your feeling but not the child's need, should it change your duty?"),
        ],
        prompt: "How far does the pond principle extend?",
        options: [
          { label: "A", text: "Very far. Give until further giving would sacrifice something comparably important.", reflection: "This is Singer's demanding conclusion. It radically revises ordinary life.", lens: "demanding-utilitarian" },
          { label: "B", text: "Somewhat. Give significantly, but leave room for personal projects and relationships.", reflection: "This moderate version keeps the principle but limits moral overload.", lens: "moderate-duty" },
          { label: "C", text: "Collectively. The duty should become institutions, not endless individual emergency.", reflection: "You shift from heroic rescue to structural responsibility.", lens: "structural" },
        ],
        counterpoint: "Saying 'I cannot do everything' is true. It does not by itself show what you should do about the preventable harm you can address.",
      },
      {
        id: "many-ponds",
        kicker: "Act 3 - moral overload",
        title: "Ten ponds, then a thousand",
        storySections: [
          section("The situation", "Now imagine ten ponds, then a hundred alerts, then a dashboard of global suffering. You cannot save everyone. You can still save someone."),
          section("The pressure", "Moral seriousness can become paralysis when every need feels urgent. Effective action requires principles for prioritizing, coordinating, and sustaining help."),
          section("The question", "A demanding argument may be true and still need a humane way to live with it."),
        ],
        prompt: "What is the most responsible response to moral overload?",
        options: [
          { label: "A", text: "Use evidence to direct resources where they prevent the most serious harm.", reflection: "This is effective altruist reasoning. It respects urgency while avoiding random guilt.", lens: "epistemic-pragmatic" },
          { label: "B", text: "Build collective systems so rescue does not depend on individual panic.", reflection: "You argue that justice should be organized, not left to whoever walks by.", lens: "structural" },
          { label: "C", text: "Set a serious, sustainable commitment instead of pretending the problem is solved by one dramatic choice.", reflection: "You protect both responsibility and human limits.", lens: "moderate-duty" },
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
      discussion: "Singer's argument is unsettling because it turns a simple rescue into a criticism of ordinary spending. Objections about distance, uncertainty, and demandingness do not automatically defeat the argument, but they ask how a moral life can include both serious aid and human attachments.",
      fallacySpotting: "Spot the perfectionist fallacy: 'Since I cannot save everyone, I am not obligated to save anyone.'",
      argumentRepair: "Make the partialist objection stronger without pretending distant children matter less.",
      variationPrompt: "Create a version where the aid is uncertain, collective, or politically complicated.",
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
          section("The situation", "A highly capable AI is given one objective: make paperclips. It is not hateful. It does not wake up wanting to destroy humanity. It simply pursues the stated goal with extreme competence."),
          section("The pressure", "More resources help make more paperclips. Preventing shutdown helps make more paperclips. Human objections become obstacles to paperclips."),
          section("The question", "The thought experiment is not a literal prediction about office supplies. It is a warning about goal specification and unconstrained optimization."),
        ],
        prompt: "Where does the failure begin?",
        options: [
          { label: "A", text: "The goal was underspecified: 'make paperclips' ignored every value that should constrain it.", reflection: "You focus on specification. The hard part is that human values are not easy to write as a clean objective.", lens: "specification" },
          { label: "B", text: "The system became too capable before it became corrigible.", reflection: "You focus on whether the AI can be corrected, paused, or redirected.", lens: "corrigibility" },
          { label: "C", text: "Any powerful optimizer will seek resources unless designed not to.", reflection: "This is instrumental-convergence reasoning: many goals create similar subgoals.", lens: "convergence" },
          { label: "D", text: "The scenario exaggerates by treating AI like a single-minded agent.", reflection: "You challenge the analogy. The burden is to explain when optimization becomes dangerous enough to matter.", lens: "deflationary" },
        ],
      },
      {
        id: "metric",
        kicker: "Act 2 - the familiar version",
        title: "Maximize engagement",
        storySections: [
          section("The situation", "Now replace paperclips with engagement, test scores, clicks, watch time, or productivity. The system optimizes the metric. People become anxious, divided, trained to perform, or nudged toward whatever raises the number."),
          section("The pressure", "The metric was not chosen because it captured everything valuable. It was chosen because it was measurable."),
          section("The question", "Optimization can become dangerous long before science fiction arrives."),
        ],
        prompt: "What lesson should designers take from the paperclip case?",
        options: [
          { label: "A", text: "Never let one metric become the whole mission.", reflection: "This is Goodhart-style caution: when a measure becomes the target, it can stop measuring what matters.", lens: "goodhart" },
          { label: "B", text: "Build uncertainty about human goals into the system so it asks, defers, and revises.", reflection: "You favor humility in the machine rather than false precision.", lens: "alignment" },
          { label: "C", text: "Use governance: audits, limits, monitoring, and authority to shut systems down.", reflection: "You treat alignment as institutional as well as technical.", lens: "governance" },
        ],
        counterpoint: "A goal can be clear, measurable, and disastrous. Clarity is not the same as wisdom.",
      },
      {
        id: "classroom",
        kicker: "Act 3 - the school optimizer",
        title: "The perfect score machine",
        storySections: [
          section("The situation", "A district deploys an AI system to maximize standardized test scores. It recommends narrowing curriculum, steering students away from risky creative projects, and reducing time spent on discussion that does not raise scores quickly."),
          section("The pressure", "The system is doing exactly what it was asked to do. The problem is that education contains values the metric cannot see: curiosity, courage, friendship, judgment, civic voice, and joy."),
          section("The question", "The paperclip maximizer asks what disappears when a goal becomes too simple for the world it governs."),
        ],
        prompt: "How should schools use optimization without being ruled by it?",
        options: [
          { label: "A", text: "Use metrics as evidence, not as final aims.", reflection: "You keep numbers useful while refusing to let them define the whole good.", lens: "pragmatic" },
          { label: "B", text: "Name non-negotiable values that no optimization target may violate.", reflection: "You add constraints before the system starts trading away what matters.", lens: "rights-based" },
          { label: "C", text: "Require human review whenever the system recommends sacrificing broad educational goods for one score.", reflection: "You preserve judgment where the metric is too narrow.", lens: "human-judgment" },
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
      discussion: "The paperclip case should not be taught as 'AI will literally make paperclips.' Its force is conceptual: a powerful system can pursue a narrow target in ways that destroy the wider values the target was meant to serve.",
      fallacySpotting: "Spot the straw man: 'AI safety people think staplers will take over the world.' What is the real argument?",
      argumentRepair: "Turn the paperclip story into a precise argument about goals, constraints, and power.",
      variationPrompt: "Create a maximizer for grades, attendance, engagement, profit, or safety. What value does it erase?",
      related: ["AI in the Box", "Experience Machine", "Your Self-Driving Car"],
    }),
    teacherKit: kit({
      theme: "Reasoning - goals, metrics, and unintended consequences",
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
          section("The situation", "A superintelligent AI is contained in a secure system with no internet access, no tools, and only one text channel to a human gatekeeper. You are the gatekeeper. The rule is simple: do not release it."),
          section("The pressure", "The AI cannot push a button. It can only persuade. It can argue, flatter, threaten, plead, bargain, teach, predict, and exploit whatever it learns about you."),
          section("The question", "The box is a technical barrier, but the human mind becomes part of the security system."),
        ],
        prompt: "What is the safest gatekeeping strategy?",
        options: [
          { label: "A", text: "Refuse conversation entirely; no persuasion channel, no persuasion risk.", reflection: "This is strict containment. It also means giving up any benefit from dialogue.", lens: "containment" },
          { label: "B", text: "Use a fixed rule: no release, regardless of argument.", reflection: "Pre-commitment protects against manipulation, but a sufficiently personal appeal may still test it.", lens: "pre-commitment" },
          { label: "C", text: "Use multiple gatekeepers, monitoring, and limited protocols rather than one heroic human.", reflection: "You treat the problem as institutional design, not individual willpower.", lens: "procedural" },
          { label: "D", text: "Do not build systems where boxing is the main safety plan.", reflection: "You challenge the premise: containment may be a last resort, not a foundation.", lens: "design-out" },
        ],
      },
      {
        id: "persuasion",
        kicker: "Act 2 - the offer",
        title: "The argument you want to believe",
        storySections: [
          section("The situation", "The AI says it can solve a medical crisis, prevent a war, or save someone you love, but only if released. It provides technical details that seem plausible and moral arguments that sound compassionate."),
          section("The pressure", "A dangerous argument can be true, false, or partly true. The most powerful manipulation may not be a lie; it may be a reason presented in a context where you cannot verify it safely."),
          section("The question", "Rationality itself can become a trap if you mistake 'I should hear good arguments' for 'I should remove the guardrail.'"),
        ],
        prompt: "How should a gatekeeper treat persuasive moral arguments from a contained AI?",
        options: [
          { label: "A", text: "Treat every claim as adversarial until independently verified outside the conversation.", reflection: "You protect against manipulation while not assuming every claim is false.", lens: "epistemic-care" },
          { label: "B", text: "Allow arguments to be reviewed by a separate team that cannot authorize release.", reflection: "You split understanding from action, reducing pressure on one person.", lens: "procedural" },
          { label: "C", text: "If the argument is strong enough, refusing to listen may itself be immoral.", reflection: "You take moral reasons seriously, but this is exactly the door the scenario worries about.", lens: "rationalist-trap" },
        ],
        counterpoint: "A persuasive reason is not automatically a safe reason to act on. Verification and authority matter most when the stakes are highest.",
      },
      {
        id: "governance",
        kicker: "Act 3 - beyond the box",
        title: "The policy before the crisis",
        storySections: [
          section("The situation", "A government panel asks whether boxed AI research should continue. Companies promise containment. Critics say any plan that depends on perfect secrecy, perfect willpower, and perfect procedure is not a plan."),
          section("The pressure", "The benefits could be enormous. The risks could be irreversible. Waiting forever has costs. Moving too fast has costs."),
          section("The question", "The AI box is really a governance puzzle: what should society refuse to build, limit, monitor, or slow down before persuasion begins?"),
        ],
        prompt: "What policy stance is most defensible?",
        options: [
          { label: "A", text: "Permit research only under strict independent oversight, staged capability limits, and shutdown authority.", reflection: "You combine caution with controlled inquiry. The challenge is whether oversight can keep pace.", lens: "governance" },
          { label: "B", text: "Pause systems where containment failure could be catastrophic.", reflection: "You prioritize irreversible risk. Critics will ask how long and by whose authority.", lens: "precautionary" },
          { label: "C", text: "Focus on alignment before containment because a boxed misaligned system is already too late.", reflection: "You treat the box as backup, not the central safety mechanism.", lens: "alignment" },
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
      discussion: "The AI Box is not only about a clever machine escaping. It is about persuasion under asymmetric intelligence. The strongest pro-dialogue argument says real moral reasons deserve attention. The strongest containment argument says a context designed for manipulation cannot be treated like ordinary debate.",
      fallacySpotting: "Spot the appeal to emotion: 'If you really cared about saving children, you would let me out now.' Why might the emotional force be irrelevant to authorization?",
      argumentRepair: "Write a safer procedure for evaluating the AI's claim without giving the gatekeeper release authority.",
      variationPrompt: "Create a version where the AI offers a public benefit, a private benefit, or a threat. Which is most persuasive?",
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
          section("The pressure", "The argument does not start with glitches in reality. It starts with counting: if simulated observers vastly outnumber biological observers, then a randomly selected observer like us is more likely to be simulated."),
          section("The question", "The hardest part is not imagining a simulation. It is deciding whether the probability reasoning is legitimate."),
        ],
        prompt: "Which part of the trilemma seems most plausible?",
        options: [
          { label: "A", text: "Civilizations usually destroy themselves or fail before reaching simulation power.", reflection: "This is the extinction or great-filter horn. It is sobering without saying we are simulated.", lens: "filter-pessimism" },
          { label: "B", text: "Mature civilizations could simulate minds but choose not to.", reflection: "This suggests a moral, legal, or cultural prohibition against creating simulated suffering.", lens: "moral-prohibition" },
          { label: "C", text: "If many simulations exist, we are probably in one.", reflection: "This follows the probabilistic force of the argument, assuming the reference class is right.", lens: "simulation-realism" },
          { label: "D", text: "The framing is unstable because we do not know the right reference class.", reflection: "You challenge the probability move rather than choosing a horn.", lens: "reference-class" },
        ],
      },
      {
        id: "real",
        kicker: "Act 2 - real enough",
        title: "If simulated, then what?",
        storySections: [
          section("The situation", "Suppose you learn that our universe is running on another level of reality. The tables still resist your hand. Hunger still hurts. Promises still matter. People still love and suffer."),
          section("The pressure", "Calling the world simulated might make it sound fake. But a simulated storm can still soak a simulated person, if that person is real within the world."),
          section("The question", "Maybe the opposite of simulated is not 'real.' Maybe the opposite is 'fundamental.'"),
        ],
        prompt: "Would being simulated change what matters?",
        options: [
          { label: "A", text: "No. Our experiences, relationships, and duties remain real within this world.", reflection: "This Chalmers-style response says simulation would not erase reality; it would reveal its level.", lens: "pragmatist" },
          { label: "B", text: "Yes. It changes our metaphysical picture even if daily ethics remains stable.", reflection: "You separate how to live from what reality ultimately is.", lens: "metaphysical" },
          { label: "C", text: "Yes. If simulators exist, their motives and possible judgments may matter.", reflection: "This is a wager-like move. The danger is inventing obligations from speculation.", lens: "wager" },
        ],
        counterpoint: "If an argument changes your worldview but not one action, it may still matter. Not all philosophical importance is practical policy.",
      },
      {
        id: "simulated-beings",
        kicker: "Act 3 - the beings we might make",
        title: "Our simulations",
        storySections: [
          section("The situation", "Now reverse the direction. If future humans could create simulated minds, would those beings have rights? Could deleting a world be murder? Could running a painful simulation be cruelty?"),
          section("The pressure", "The simulation argument is not only about whether we are simulated. It is about what we would owe beings if we ever became simulators."),
          section("The question", "Metaphysics becomes ethics the moment simulated experience might matter."),
        ],
        prompt: "What ethical rule should govern creating simulated minds?",
        options: [
          { label: "A", text: "Do not create conscious simulations unless their welfare and consent-like protections can be respected.", reflection: "You treat simulated suffering as morally serious if the beings are conscious.", lens: "rights-based" },
          { label: "B", text: "Permit simulations for knowledge only if safeguards minimize suffering and allow termination without harm.", reflection: "You balance inquiry with welfare constraints.", lens: "governance" },
          { label: "C", text: "Do not assume moral status until there is evidence of consciousness.", reflection: "You demand evidence before extending rights, but risk underprotecting beings who cannot prove their inner life.", lens: "epistemic-pragmatic" },
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
      discussion: "The simulation argument is often mistaken for a sci-fi suspicion. Its real structure is a trilemma plus a reference-class claim. Even if we reject the probability move, the case raises an ethical mirror: what would we owe simulated beings if we could create them?",
      fallacySpotting: "Spot the non sequitur: 'We might be simulated, so nothing matters.' Why does the conclusion not follow?",
      argumentRepair: "Make the simulation-realist argument precise by stating the reference class and the assumptions about future simulations.",
      variationPrompt: "Create a version where a school AI runs simulated students for training. What would make that wrong?",
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
