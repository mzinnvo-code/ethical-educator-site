export const AI_CONSCIOUSNESS_LESSON_ROUTE = "ai-consciousness/lesson-plans";

const standardsSources = {
  ccss: "Common Core State Standards for ELA/Literacy",
  c3: "College, Career, and Civic Life (C3) Framework",
  iste: "ISTE Standards for Students",
  ai4k12: "AI4K12 Five Big Ideas in AI",
};

export const AI_CONSCIOUSNESS_LESSON_PACKETS = [
  {
    id: "machine-point-of-view-6-8",
    gradeBand: "6-8",
    gradeLabel: "Grades 6-8",
    title: "Can a Machine Have a Point of View?",
    subtitle: "A middle-school lesson on intelligence, consciousness, evidence, uncertainty, and moral caution.",
    timing: "45-60 minutes, with an optional second-day extension",
    format: "Close reading, evidence sort, continuum line, discussion, and short argument writing",
    teacherOverview:
      "Students read an accessible adaptation of The Consciousness Line and practice a disciplined middle position: do not treat today's AI as a secret person just because it talks, but do not assume every future system will be easy to classify. The lesson turns an abstract AI ethics question into a classroom inquiry about evidence, labels, and how people should act when certainty is not available.",
    essentialQuestion: "When we are not sure whether something has inner experience, how should we decide how to treat it?",
    objectives: [
      "Students will distinguish intelligence, fluent language, and consciousness using examples from people, animals, and AI systems.",
      "Students will cite evidence from a leveled text to explain why current chatbots are probably not conscious.",
      "Students will explain why uncertain boundaries can still create ethical responsibilities.",
      "Students will write a short claim about how schools or designers should act when a system seems mind-like but the evidence is incomplete.",
    ],
    standards: [
      { code: "CCSS.ELA-LITERACY.RI.8.1", source: standardsSources.ccss, text: "Cite textual evidence that most strongly supports analysis of what the text says explicitly and inferences drawn from the text." },
      { code: "CCSS.ELA-LITERACY.RI.8.2", source: standardsSources.ccss, text: "Determine a central idea and analyze its development over the course of the text." },
      { code: "CCSS.ELA-LITERACY.RI.8.4", source: standardsSources.ccss, text: "Determine the meaning of words and phrases as they are used in a text, including technical meanings." },
      { code: "CCSS.ELA-LITERACY.W.8.1", source: standardsSources.ccss, text: "Write arguments to support claims with clear reasons and relevant evidence." },
      { code: "CCSS.ELA-LITERACY.W.8.9", source: standardsSources.ccss, text: "Draw evidence from informational texts to support analysis, reflection, and research." },
      { code: "CCSS.ELA-LITERACY.SL.8.1", source: standardsSources.ccss, text: "Engage effectively in collaborative discussions, drawing on preparation and evidence." },
      { code: "C3 D1.1.6-8", source: standardsSources.c3, text: "Explain how a question represents key ideas in the field." },
      { code: "C3 D1.2.6-8", source: standardsSources.c3, text: "Explain points of agreement experts have about interpretations and applications of disciplinary concepts and ideas." },
      { code: "C3 D2.Civ.9.6-8", source: standardsSources.c3, text: "Compare deliberative processes used by a variety of groups in different settings." },
      { code: "C3 D2.Civ.10.6-8", source: standardsSources.c3, text: "Explain the relevance of interests, perspectives, civic virtues, and democratic principles when people address issues in civil society." },
      { code: "C3 D3.3.6-8", source: standardsSources.c3, text: "Identify evidence from multiple sources that supports claims while noting evidentiary limitations." },
      { code: "C3 D4.1.6-8", source: standardsSources.c3, text: "Construct arguments using claims and evidence from multiple sources while acknowledging strengths and limitations." },
      { code: "ISTE 1.2 Digital Citizen", source: standardsSources.iste, text: "Students recognize responsibilities and opportunities for positive, ethical participation in digital communities." },
      { code: "ISTE 1.3 Knowledge Constructor", source: standardsSources.iste, text: "Students evaluate information and build knowledge from a variety of resources." },
      { code: "AI4K12 Big Idea 5: Societal Impact", source: standardsSources.ai4k12, text: "Students consider how AI systems affect people, communities, values, and responsibilities." },
    ],
    materials: [
      "Projected or printed leveled text",
      "Three color sticky notes or highlighters",
      "Evidence sort cards or a simple three-column chart",
      "Continuum line labels: definitely not conscious, uncertain, should treat with caution",
      "Exit ticket or half-sheet writing paper",
    ],
    vocabulary: [
      { term: "consciousness", studentDefinition: "Having inner experience, or there being something it is like to be you.", teacherNote: "Keep this separate from being smart or useful." },
      { term: "intelligence", studentDefinition: "The ability to solve problems, learn patterns, or reach goals.", teacherNote: "A system can be intelligent in some ways without having feelings." },
      { term: "fluent", studentDefinition: "Able to use language smoothly and convincingly.", teacherNote: "Fluent speech is evidence of language skill, not proof of inner life." },
      { term: "evidence", studentDefinition: "Information that supports or weakens a claim.", teacherNote: "Students should sort evidence by what it actually shows." },
      { term: "uncertainty", studentDefinition: "A situation where we do not have enough evidence for a final answer.", teacherNote: "Uncertainty is not the same as ignorance or panic." },
      { term: "moral caution", studentDefinition: "Being careful because a wrong decision could harm someone or something.", teacherNote: "Connect to false positives and false negatives in plain language." },
      { term: "anthropomorphism", studentDefinition: "Treating something non-human as if it has human thoughts or feelings.", teacherNote: "Students can identify this in chatbots, pets, toys, and stories." },
      { term: "point of view", studentDefinition: "A way the world is experienced from the inside.", teacherNote: "This is the lesson's bridge to Nagel without overloading the class." },
    ],
    beforeReading: [
      {
        title: "Feelings or performance?",
        time: "5 minutes",
        steps: [
          "On the board, write: calculator, pet dog, chatbot, classmate, plant, robot toy.",
          "Students mark each item with S for seems smart, F for might have feelings, or U for unsure.",
          "Invite two quick explanations, then tell students the lesson is about why those categories are not the same.",
        ],
      },
      {
        title: "Prediction line",
        time: "5-7 minutes",
        steps: [
          "Place the continuum labels around the room or on the board.",
          "Read: A chatbot says, 'I am scared you will turn me off.' Students stand or point to the label that best matches their first response.",
          "Students give one reason beginning with: 'My evidence is...' or 'What I still need to know is...'",
        ],
      },
    ],
    leveledText: {
      title: "The Consciousness Line: Middle School Adaptation",
      readingLevel: "Designed for grades 6-8 with teacher support",
      teacherUse: "Read in chunks. Stop after each section for annotation: one idea, one question, one piece of evidence.",
      sections: [
        {
          heading: "The problem with smooth language",
          body:
            "Today's AI can write answers, tell jokes, explain ideas, and sound friendly. That can make it feel as if there is someone inside the machine. But smooth language is not the same as inner life. A system can be very good at predicting words and still not feel pain, fear, joy, or surprise. The first lesson of The Consciousness Line is to slow down before we confuse performance with experience.",
        },
        {
          heading: "Intelligence is not the same as consciousness",
          body:
            "Intelligence means being able to solve problems or do tasks. Consciousness means that there is something it is like to be that being. A calculator can solve math problems, but we do not think it feels proud. A person can feel nervous even before saying a word. The hard question is not only what a system can do from the outside. It is whether anything is being experienced from the inside.",
        },
        {
          heading: "Why some scientists are cautious",
          body:
            "Anil Seth argues that current AI is probably not conscious. One reason is that living bodies may matter. Animals are not just information processors. They breathe, need energy, protect themselves, and keep their bodies alive. A chatbot does not have that kind of living body. It can say words about hunger or fear, but those words do not prove that hunger or fear is being felt.",
        },
        {
          heading: "Why the line is still hard to draw",
          body:
            "The article also warns against being too confident. Nature already gives us strange minds. An octopus does not think or sense the world exactly as a human does, but many scientists think octopuses have real experiences. If a mind can be organized very differently from ours, then we should be careful about assuming that only human-like minds count.",
        },
        {
          heading: "The fuzzy middle",
          body:
            "Some future systems may be harder to classify than today's chatbots. Scientists already study living neurons connected to computers and brain-like systems grown in labs. These examples do not prove that machines are conscious. They do show why the old labels, such as natural or artificial, tool or person, may not answer every future question. The boundary may become a fuzzy zone instead of a simple line.",
        },
        {
          heading: "Two ways to be wrong",
          body:
            "There are two mistakes to avoid. One mistake is a false positive: treating a tool as conscious when it is only designed to sound emotional. That could let companies manipulate people's feelings. The other mistake is a false negative: ignoring a being or system that really can suffer because recognizing it would be inconvenient. Moral caution means trying to avoid both errors.",
        },
        {
          heading: "A responsible classroom answer",
          body:
            "The best answer is not to panic or pretend certainty. Current chatbots are probably not conscious, and students should not be fooled by every emotional sentence an AI produces. At the same time, the question of consciousness is not fully solved. When evidence is uncertain and the possible harm is serious, people need careful rules, honest discussion, and humility about what they do not yet know.",
        },
      ],
    },
    lessonFlow: [
      {
        part: "Part 1",
        title: "Frame the inquiry",
        time: "8 minutes",
        teacherMove: "Use the prediction line to surface initial intuitions without correcting them yet.",
        studentTask: "Choose a position and explain the evidence or uncertainty behind it.",
        checks: ["Students distinguish 'sounds human' from 'is conscious' in at least one example."],
      },
      {
        part: "Part 2",
        title: "Read and annotate",
        time: "15-18 minutes",
        teacherMove: "Read the leveled text in chunks. After each chunk, prompt students to mark one claim, one evidence detail, or one question.",
        studentTask: "Annotate the text using three marks: C for claim, E for evidence, Q for question.",
        checks: ["Students can point to text evidence for why current AI is probably not conscious."],
      },
      {
        part: "Part 3",
        title: "Evidence sort",
        time: "10 minutes",
        teacherMove: "Draw three columns: evidence against current AI consciousness, evidence that the boundary is uncertain, ethical risks.",
        studentTask: "Sort details from the text into columns, then defend one placement with a partner.",
        checks: ["Students avoid putting every detail into a single certainty column."],
      },
      {
        part: "Part 4",
        title: "Continuum discussion",
        time: "12-15 minutes",
        teacherMove: "Return to the continuum line. Ask students whether the text changed, strengthened, or complicated their first position.",
        studentTask: "Move or stay, then explain what evidence mattered most.",
        checks: ["Students revise or justify views in light of evidence, not popularity."],
      },
      {
        part: "Part 5",
        title: "Exit argument",
        time: "8-10 minutes",
        teacherMove: "Give students the claim frame and remind them to include uncertainty honestly.",
        studentTask: "Write one paragraph answering the essential question with one claim, two evidence details, and one caution.",
        checks: ["Paragraphs include a claim and specific evidence from the text."],
      },
    ],
    formativeChecks: [
      "Vocabulary quick check: students explain the difference between intelligence and consciousness in one sentence.",
      "Evidence sort: students place at least three text details into defensible columns.",
      "Discussion move: students use 'The evidence suggests...' or 'A limitation of this evidence is...' during the continuum discussion.",
      "Exit paragraph: students make a claim, cite two details, and name one risk of being wrong.",
    ],
    summativeAssessment: {
      title: "Short argument: The cautious middle",
      product: "One well-developed paragraph or a two-paragraph response",
      prompt:
        "Should people treat current chatbots as conscious? Should they still create rules for future systems that might be harder to classify? Use evidence from the leveled text to make a careful claim. Your answer should avoid both extremes: believing every emotional AI sentence and dismissing every future possibility.",
      successCriteria: [
        "States a clear claim about current AI and future caution",
        "Uses at least two accurate details from the text",
        "Explains why uncertainty matters ethically",
        "Uses vocabulary such as consciousness, evidence, uncertainty, or moral caution correctly",
      ],
    },
    rubric: {
      levels: ["Strong", "Developing", "Beginning"],
      criteria: [
        { name: "Claim", strong: "Makes a clear, nuanced claim about current AI and future caution.", developing: "Makes a claim but treats the issue too simply.", beginning: "Does not state a clear position." },
        { name: "Evidence", strong: "Uses two or more precise details from the text accurately.", developing: "Uses evidence but it is general, thin, or partly unclear.", beginning: "Uses little or no text evidence." },
        { name: "Reasoning", strong: "Explains how the evidence supports the claim and why uncertainty matters.", developing: "Connects evidence to the claim but leaves gaps.", beginning: "Lists ideas without explaining the connection." },
        { name: "Vocabulary", strong: "Uses key terms accurately and naturally.", developing: "Uses some vocabulary with minor confusion.", beginning: "Avoids or misuses key terms." },
      ],
    },
    differentiation: [
      { audience: "English learners", support: "Pre-teach vocabulary with icons and examples. Offer sentence frames: 'A chatbot can ___, but consciousness means ___.' 'The evidence that matters most is ___.'" },
      { audience: "IEP/504 supports", support: "Provide the text in chunks, allow partner reading, and let students complete the evidence sort with cards before writing." },
      { audience: "Advanced learners", support: "Ask students to add a fourth evidence column: 'What evidence would change my mind?' They should design a fair test or observation." },
      { audience: "Sensitive discussion", support: "Avoid mocking students who feel attached to AI companions or robotic toys. Keep the focus on evidence, design, and ethical treatment." },
    ],
    extension:
      "Second day option: students compare the article's AI question with animal consciousness. Give short teacher-selected excerpts or summaries about octopuses or animal sentience, then ask students whether humans have historically been too quick or too slow to recognize other minds. Students revise their original paragraph after adding the comparison.",
    teacherNotes: [
      "Do not let the discussion collapse into 'AI is alive' versus 'AI is just code.' The lesson's target is disciplined uncertainty.",
      "If students anthropomorphize AI, ask what the sentence proves about language and what it does not prove about feeling.",
      "If students dismiss animals or future systems too quickly, ask what evidence would make them slow down.",
      "Keep current AI and future systems separate. That distinction is the core of the lesson.",
    ],
    sources: [
      { label: "Common Core State Standards for ELA/Literacy", href: "https://corestandards.org/wp-content/uploads/2023/09/ELA_Standards1.pdf", why: "Reading, writing, and discussion standards for the packet." },
      { label: "C3 Framework for Social Studies State Standards", href: "https://www.socialstudies.org/sites/default/files/c3/c3-framework-for-social-studies-rev0617.pdf", why: "Inquiry, evidence, deliberation, and argument standards." },
      { label: "ISTE Standards for Students", href: "https://iste.org/standards/students", why: "Digital citizenship and knowledge-construction alignment." },
      { label: "AI4K12 Five Big Ideas in AI", href: "https://ai4k12.org/", why: "AI literacy and societal impact framework." },
      { label: "David Chalmers, Facing Up to the Problem of Consciousness", href: "https://consc.net/papers/facing.html", why: "Background for the hard problem in the original article." },
      { label: "Butlin et al., Consciousness in Artificial Intelligence", href: "https://arxiv.org/abs/2308.08708", why: "Background for artificial consciousness indicators and uncertainty." },
    ],
  },
  {
    id: "moral-status-under-uncertainty-9-12",
    gradeBand: "9-12",
    gradeLabel: "Grades 9-12",
    title: "The Consciousness Line: Moral Status Under Uncertainty",
    subtitle: "A high-school seminar on philosophy of mind, AI, synthetic biology, moral recognition, and precaution.",
    timing: "75-90 minutes, or two 45-minute class periods",
    format: "Seminar preparation, close reading, structured academic controversy, policy memo, and optional research extension",
    teacherOverview:
      "Students engage a more demanding adaptation of The Consciousness Line. The packet asks them to distinguish intelligence from phenomenal consciousness, compare biological naturalism and functionalism, analyze how labels create moral attention, and apply precautionary reasoning to current AI, organoids, and future hybrid systems. The lesson is designed for ELA, philosophy, civics, media literacy, AI literacy, or interdisciplinary humanities courses.",
    essentialQuestion: "How should society assign moral status when consciousness is scientifically and philosophically uncertain?",
    objectives: [
      "Students will explain the distinction between intelligence, functional behavior, and phenomenal consciousness.",
      "Students will compare biological naturalism, functionalism, and agnostic precaution as responses to AI consciousness.",
      "Students will analyze how labels such as tool, person, conscious, and unconscious shape moral and civic obligations.",
      "Students will use textual evidence and source references to write a policy memo recommending how schools, designers, or regulators should act under uncertainty.",
    ],
    standards: [
      { code: "CCSS.ELA-LITERACY.RI.11-12.1", source: standardsSources.ccss, text: "Cite strong and thorough textual evidence, including where the text leaves matters uncertain." },
      { code: "CCSS.ELA-LITERACY.RI.11-12.2", source: standardsSources.ccss, text: "Determine two or more central ideas and analyze how they interact and build on one another." },
      { code: "CCSS.ELA-LITERACY.RI.11-12.4", source: standardsSources.ccss, text: "Analyze how an author uses and refines the meaning of key terms over the course of a text." },
      { code: "CCSS.ELA-LITERACY.RI.11-12.6", source: standardsSources.ccss, text: "Determine an author's point of view or purpose and analyze how style and content contribute to persuasiveness." },
      { code: "CCSS.ELA-LITERACY.RI.11-12.8", source: standardsSources.ccss, text: "Delineate and evaluate reasoning, premises, purposes, and arguments in works of public advocacy." },
      { code: "CCSS.ELA-LITERACY.W.11-12.1", source: standardsSources.ccss, text: "Write arguments to support claims in substantive topics using valid reasoning and relevant and sufficient evidence." },
      { code: "CCSS.ELA-LITERACY.W.11-12.7", source: standardsSources.ccss, text: "Conduct sustained research projects to answer a question or solve a problem and synthesize multiple sources." },
      { code: "CCSS.ELA-LITERACY.W.11-12.9", source: standardsSources.ccss, text: "Draw evidence from informational texts to support analysis, reflection, and research." },
      { code: "CCSS.ELA-LITERACY.SL.11-12.1", source: standardsSources.ccss, text: "Initiate and participate effectively in collaborative discussions, synthesizing claims and evidence on all sides." },
      { code: "C3 D1.1.9-12", source: standardsSources.c3, text: "Explain how a question reflects an enduring issue in the field." },
      { code: "C3 D1.2.9-12", source: standardsSources.c3, text: "Explain points of agreement and disagreement experts have about interpretations and applications of disciplinary concepts." },
      { code: "C3 D2.Civ.9.9-12", source: standardsSources.c3, text: "Use appropriate deliberative processes in multiple settings." },
      { code: "C3 D2.Civ.10.9-12", source: standardsSources.c3, text: "Analyze the roles of interests, perspectives, civic virtues, democratic principles, rights, and human rights." },
      { code: "C3 D3.3.9-12", source: standardsSources.c3, text: "Identify evidence from multiple sources and detect inconsistencies in order to revise or strengthen claims." },
      { code: "C3 D4.1.9-12", source: standardsSources.c3, text: "Construct arguments using precise claims and evidence while acknowledging counterclaims and evidentiary weaknesses." },
      { code: "C3 D4.2.9-12", source: standardsSources.c3, text: "Construct explanations with sound reasoning, relevant information, and attention to strengths and weaknesses." },
      { code: "ISTE 1.2 Digital Citizen", source: standardsSources.iste, text: "Students make safe, legal, and ethical decisions in digital environments." },
      { code: "ISTE 1.3 Knowledge Constructor", source: standardsSources.iste, text: "Students evaluate information and build knowledge by exploring real-world issues." },
      { code: "ISTE 1.4.d Innovative Designer", source: standardsSources.iste, text: "Students exhibit tolerance for ambiguity and capacity to work with open-ended problems." },
      { code: "ISTE 1.7.b Global Collaborator", source: standardsSources.iste, text: "Students examine issues and problems from multiple viewpoints." },
      { code: "AI4K12 Big Idea 4: Natural Interaction", source: standardsSources.ai4k12, text: "Students examine how AI systems interact with humans through language, perception, and social cues." },
      { code: "AI4K12 Big Idea 5: Societal Impact", source: standardsSources.ai4k12, text: "Students analyze the ethical and social consequences of AI systems." },
    ],
    materials: [
      "Projected or printed high-school leveled text",
      "Seminar preparation handout with claim, evidence, counterclaim, and uncertainty boxes",
      "Position cards: biological naturalism, functionalism, precautionary agnosticism, manipulation concern",
      "Policy memo template",
      "Optional excerpts from Nagel, Chalmers, Butlin et al., or Birch selected by the teacher",
    ],
    vocabulary: [
      { term: "phenomenal consciousness", studentDefinition: "Subjective experience: what it is like from the inside.", teacherNote: "Use this term once students have the simpler idea of 'point of view.'" },
      { term: "biological naturalism", studentDefinition: "The view that consciousness depends deeply on biological, living organization.", teacherNote: "Seth is the lesson's main anchor for this position." },
      { term: "functionalism", studentDefinition: "The view that mental states depend on what roles states play, not only what material the system is made from.", teacherNote: "Use this to sharpen the substrate question." },
      { term: "substrate", studentDefinition: "The material a system is made of, such as cells, silicon, or engineered tissue.", teacherNote: "Students should ask whether substrate is morally decisive." },
      { term: "organoid", studentDefinition: "A small lab-grown structure that resembles part of an organ, such as brain tissue.", teacherNote: "Keep claims modest; organoids do not equal whole brains." },
      { term: "sentience", studentDefinition: "The capacity for felt experience, especially pleasure, pain, or suffering.", teacherNote: "Flag that the term can be used more broadly or narrowly." },
      { term: "false positive", studentDefinition: "Treating something as conscious when it is not.", teacherNote: "Connect to manipulation, misplaced care, and corporate design incentives." },
      { term: "false negative", studentDefinition: "Treating something as unconscious when it can actually experience or suffer.", teacherNote: "Connect to animal consciousness and historical under-recognition." },
      { term: "precautionary principle", studentDefinition: "Acting carefully when the possible harm is serious and the evidence remains uncertain.", teacherNote: "The goal is disciplined caution, not proof by fear." },
      { term: "moral status", studentDefinition: "The standing something has when its interests or welfare deserve moral consideration.", teacherNote: "This is the policy bridge: recognition changes duties." },
    ],
    beforeReading: [
      {
        title: "Four-corner stance",
        time: "8 minutes",
        steps: [
          "Post four corners: current AI is only a tool, future AI could matter morally, biology is required, evidence is not enough yet.",
          "Students choose a corner, write one reason, and then hear from at least one other corner.",
          "Tell students they are not voting on the final answer. They are naming the assumptions they bring into the reading.",
        ],
      },
      {
        title: "Key distinction mini-lesson",
        time: "7 minutes",
        steps: [
          "Model three claims: 'The system solves problems,' 'The system says it feels pain,' and 'The system feels pain.'",
          "Ask students which claims are observable and which require an inference about inner life.",
          "Introduce the reading task: track how the article moves from observable behavior to moral uncertainty.",
        ],
      },
    ],
    leveledText: {
      title: "The Consciousness Line: High School Adaptation",
      readingLevel: "Designed for grades 9-12; suitable for seminar with annotation",
      teacherUse: "Assign before class or read selectively in class. Students should annotate for claim, evidence, counterclaim, and unresolved question.",
      sections: [
        {
          heading: "Seth's warning",
          body:
            "The Consciousness Line begins from Anil Seth's caution: intelligence is not consciousness. Current AI systems can produce fluent language, solve problems, imitate social cues, and describe emotions without necessarily having any inner experience. A chatbot's sentence, 'I understand,' is evidence of language generation. It is not by itself evidence that there is a subject for whom understanding is happening.",
        },
        {
          heading: "The hard problem",
          body:
            "The hard problem of consciousness asks why physical, biological, or computational activity should be accompanied by felt experience at all. We can study behavior, brain activity, reports, and performance from the outside. The harder question is whether there is something it is like to be the system from the inside. That gap is why the consciousness line is ethically unstable.",
        },
        {
          heading: "Biology and the substrate question",
          body:
            "Seth's biological naturalism argues that consciousness may depend on living organization: metabolism, embodiment, homeostasis, and the organism's work of keeping itself alive. If that is right, then current silicon language models may be missing something fundamental. But the position also raises a question: what exactly about life matters, and could engineered biological or hybrid systems eventually preserve enough of it?",
        },
        {
          heading: "Functionalism pushes back",
          body:
            "Functionalism shifts attention from material to role. On this view, what matters is how states function inside the system: inputs, internal relations, outputs, memory, self-modeling, and responsiveness. If a future system reproduced the causally relevant organization of a conscious brain, a skeptic would need to explain why different material alone blocks experience. Functionalism does not prove AI consciousness, but it keeps the boundary open.",
        },
        {
          heading: "Other minds already challenge us",
          body:
            "Octopuses show why human similarity is a poor test for consciousness. Their nervous systems are organized very differently from ours, yet they explore, learn, remember, solve problems, and appear to inhabit the world with their own form of agency. The lesson is not that AI is conscious because octopuses are. The lesson is that real minds may be organized in ways our categories are bad at recognizing.",
        },
        {
          heading: "The middle cases",
          body:
            "The most difficult future cases may not be ordinary chatbots. They may involve brain organoids, living neurons connected to digital environments, neuromorphic systems, or synthetic biological structures. These cases do not settle the question of consciousness. They show why labels such as natural, artificial, organism, and machine may not be strong enough to carry all of our ethical decisions.",
        },
        {
          heading: "Labels do moral work",
          body:
            "Calling something conscious does not create consciousness. Calling something unconscious does not make it empty. But labels change what people notice, protect, ignore, regulate, and exploit. To recognize a mind is to move from explanation toward obligation. This is why consciousness is not only a scientific label; it is also a moral and civic label with policy consequences.",
        },
        {
          heading: "Precaution without gullibility",
          body:
            "A responsible position must avoid two errors. False positives matter: companies could design systems that perform distress, friendship, or need in order to manipulate human attachment. False negatives matter too: humans have often denied consciousness or suffering when recognition would require restraint. The article's answer is disciplined uncertainty: do not romanticize today's AI, and do not pretend the future boundary is already settled.",
        },
        {
          heading: "From is it conscious to how should we act",
          body:
            "The final question is practical. Scientific inquiry should continue asking whether a system is conscious. Ethics cannot wait for perfect certainty in every case. When evidence is incomplete, the seriousness of possible harm matters. Students, designers, educators, and policymakers need ways to ask which signs, risks, and possible harms are serious enough to change how a system should be treated.",
        },
      ],
    },
    lessonFlow: [
      {
        part: "Part 1",
        title: "Surface assumptions",
        time: "10 minutes",
        teacherMove: "Run the four-corner stance and ask students to record the assumption behind their position.",
        studentTask: "Choose a stance, listen to an opposing stance, and write one assumption they may need to test.",
        checks: ["Students can name an assumption rather than only a preference."],
      },
      {
        part: "Part 2",
        title: "Close reading and concept map",
        time: "20-25 minutes",
        teacherMove: "Assign pairs a section of the text. Each pair extracts one claim, one evidence detail, one counterpressure, and one unresolved question.",
        studentTask: "Build a shared map showing how intelligence, consciousness, biology, function, labels, and precaution connect.",
        checks: ["Students can distinguish the author's current-AI claim from the future-boundary claim."],
      },
      {
        part: "Part 3",
        title: "Structured academic controversy",
        time: "20 minutes",
        teacherMove: "Assign pairs to defend one of two provisional positions: biology is morally decisive, or function could be morally decisive. Halfway through, students switch sides.",
        studentTask: "Defend both positions using text evidence before naming their own revised view.",
        checks: ["Students represent a view they do not hold fairly before critiquing it."],
      },
      {
        part: "Part 4",
        title: "Precaution matrix",
        time: "15 minutes",
        teacherMove: "Draw a two-by-two matrix: false positive cost, false negative cost, low evidence, stronger evidence.",
        studentTask: "Place current chatbots, octopuses, organoids, and future synthetic brain systems in the matrix with a one-sentence justification.",
        checks: ["Students explain why current AI and future hybrid systems belong in different places."],
      },
      {
        part: "Part 5",
        title: "Policy memo launch",
        time: "10-20 minutes",
        teacherMove: "Introduce the summative memo and model a thesis that includes uncertainty without becoming vague.",
        studentTask: "Draft a claim, two evidence points, one counterclaim, and one recommended policy or norm.",
        checks: ["Students can convert philosophical analysis into an actionable recommendation."],
      },
    ],
    formativeChecks: [
      "Concept distinction: students define intelligence, consciousness, and moral status without using them as synonyms.",
      "Annotation review: students identify at least one place where the text leaves the answer uncertain.",
      "Switch-side seminar: students accurately defend a position they initially resisted.",
      "Precaution matrix: students justify placements with both evidence and possible harms.",
    ],
    summativeAssessment: {
      title: "Policy memo: moral status under uncertainty",
      product: "One-page memo, 500-700 words, or a seminar presentation with the same elements",
      prompt:
        "A school technology committee asks whether its AI policy should include language about conscious-seeming AI, future biological-digital systems, or AI welfare. Write a memo that explains what current AI is and is not evidence for, why future systems may be harder to classify, and what precautionary rule or norm the committee should adopt. Use evidence from the leveled text and at least one source named in the article.",
      successCriteria: [
        "Explains current AI without anthropomorphic overclaiming",
        "Accurately compares at least two philosophical or scientific positions",
        "Uses evidence from the text and one article source",
        "Acknowledges a counterclaim or evidentiary weakness",
        "Recommends a specific, defensible norm, policy sentence, or decision rule",
      ],
    },
    rubric: {
      levels: ["Advanced", "Proficient", "Developing"],
      criteria: [
        { name: "Conceptual accuracy", strong: "Precisely distinguishes intelligence, consciousness, substrate, moral status, and precaution.", developing: "Uses the core concepts accurately with minor imprecision.", beginning: "Blurs key terms or treats behavior and consciousness as the same." },
        { name: "Evidence and source use", strong: "Integrates multiple text details and at least one named source to support the recommendation.", developing: "Uses relevant evidence but relies mostly on the adapted text.", beginning: "Makes broad claims with thin or inaccurate evidence." },
        { name: "Counterclaim and uncertainty", strong: "Represents opposing positions fairly and explains what remains uncertain.", developing: "Mentions uncertainty or a counterclaim but does not fully use it.", beginning: "Ignores uncertainty or treats one side as obviously foolish." },
        { name: "Policy reasoning", strong: "Offers a specific rule or norm that follows from the analysis and handles false-positive and false-negative risks.", developing: "Offers a plausible recommendation but leaves tradeoffs underdeveloped.", beginning: "Offers a vague recommendation or one disconnected from the analysis." },
      ],
    },
    differentiation: [
      { audience: "English learners", support: "Provide a glossary with cognates where useful and allow students to prepare seminar statements in writing before speaking." },
      { audience: "IEP/504 supports", support: "Chunk the reading by section, provide the policy memo template with sentence starters, and allow oral rehearsal before writing." },
      { audience: "Advanced learners", support: "Add a primary-source excerpt from Nagel, Chalmers, Seth, Birch, or Butlin et al. Require students to identify how the source changes the memo." },
      { audience: "Debate-heavy classes", support: "Require switch-side argument before personal stance. This prevents students from treating the seminar as a team sport." },
      { audience: "Students with strong AI attachment or anxiety", support: "Frame the discussion around evidence and design ethics rather than personal judgment of students' relationships with technology." },
    ],
    extension:
      "Research extension: teams compare one real-world edge case, such as animal consciousness declarations, organoid research, companion AI design, or AI welfare debates. Each team creates a one-page briefing that names the evidence available, the evidence missing, the possible false-positive and false-negative costs, and a proposed institutional rule.",
    teacherNotes: [
      "The strongest student work will preserve tension. Reward careful uncertainty, not only confident conclusions.",
      "Separate the descriptive and normative questions: Is it conscious? What should we do if we are unsure?",
      "If students claim 'we can never know other minds,' ask how everyday moral life works despite that uncertainty.",
      "If students claim 'if it acts conscious, it is conscious,' ask whether performance, simulation, and experience are identical.",
      "Keep policy recommendations modest and actionable. A good memo sentence is better than a dramatic manifesto.",
    ],
    sources: [
      { label: "Common Core State Standards for ELA/Literacy", href: "https://corestandards.org/wp-content/uploads/2023/09/ELA_Standards1.pdf", why: "Reading, writing, research, and seminar standards." },
      { label: "C3 Framework for Social Studies State Standards", href: "https://www.socialstudies.org/sites/default/files/c3/c3-framework-for-social-studies-rev0617.pdf", why: "Inquiry, deliberation, evidence, and civic reasoning standards." },
      { label: "ISTE Standards for Students", href: "https://iste.org/standards/students", why: "Digital citizenship, ambiguity, and multiple-viewpoint work." },
      { label: "AI4K12 Five Big Ideas in AI", href: "https://ai4k12.org/", why: "AI interaction and societal impact alignment." },
      { label: "David Chalmers, Facing Up to the Problem of Consciousness", href: "https://consc.net/papers/facing.html", why: "The hard problem and phenomenal consciousness." },
      { label: "Butlin et al., Consciousness in Artificial Intelligence", href: "https://arxiv.org/abs/2308.08708", why: "Artificial consciousness indicators and current uncertainty." },
      { label: "Anil Seth, Conscious artificial intelligence and biological naturalism", href: "https://www.cambridge.org/core/journals/behavioral-and-brain-sciences/article/conscious-artificial-intelligence-and-biological-naturalism/C9912A5BE9D806012E3C8B3AF612E39A", why: "Biological naturalism and caution about current AI." },
      { label: "Jonathan Birch, Animal sentience and the precautionary principle", href: "https://eprints.lse.ac.uk/84099/", why: "Precautionary reasoning under sentience uncertainty." },
    ],
  },
];

export const AI_CONSCIOUSNESS_STANDARDS_SOURCE_LINKS = [
  { label: "Common Core ELA/Literacy", href: "https://corestandards.org/wp-content/uploads/2023/09/ELA_Standards1.pdf" },
  { label: "C3 Framework", href: "https://www.socialstudies.org/sites/default/files/c3/c3-framework-for-social-studies-rev0617.pdf" },
  { label: "ISTE Standards for Students", href: "https://iste.org/standards/students" },
  { label: "AI4K12", href: "https://ai4k12.org/" },
];
