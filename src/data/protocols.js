// Twelve discussion protocols — the structured formats that make a philosophy
// conversation productive and safe. Used by the Dialogue Toolkit page and
// linked from each scenario's TeacherKit.
//
// Each protocol entry includes:
//   id           url-safe slug used as anchor (#protocol-<id>)
//   name         display name
//   tagline      one-line hook
//   bestFor      array of scenario types (e.g. "stakes-low", "controversial")
//   gradeBands   ["k-5", "6-8", "9-12", "educators"]
//   timeMin      minimum minutes
//   timeIdeal    typical minutes
//   groupMin / groupMax  group sizes that work
//   materials    physical materials needed
//   when         when to use it (one paragraph)
//   how          step-by-step facilitator script (array of strings)
//   pitfalls     common pitfalls and remedies
//   recommendedScenarios  scenario ids in our bank that work especially well

export const PROTOCOLS = [
  {
    id: "talking-circle",
    name: "Talking Circle",
    tagline: "One voice at a time, with a physical anchor.",
    gradeBands: ["k-5", "6-8"],
    timeMin: 10, timeIdeal: 25,
    groupMin: 4, groupMax: 20,
    materials: "A soft object (stuffed animal, ball, talking stick) to hold",
    when: "Best for younger students, emotionally charged topics, or any group establishing trust. The physical object makes turn-taking concrete and slows the pace, which helps quieter voices participate.",
    how: [
      "Sit students in a circle, all visible to each other.",
      "Introduce the object: \"Whoever holds this is the one speaking.\"",
      "State the prompt clearly. Pause for at least 8 seconds before passing the object.",
      "Pass the object once around — every student speaks (or passes — passing is okay).",
      "After the first round, anyone can ask for the object.",
      "Close by passing the object once more for a one-word reflection.",
    ],
    pitfalls: [
      "Younger students may use the object as a toy. Pre-frame: \"It's a tool, not a toy. Hold it gently.\"",
      "Some students will pass every time. Honor that — but check in privately. They may have something to say in writing.",
      "Avoid having the teacher 'go last' to comment on every contribution. The point is the students' voices, not yours.",
    ],
    recommendedScenarios: ["magic-toy", "robot-pet-goodbye", "honesty-protection", "rude-toy"],
  },
  {
    id: "socratic-seminar",
    name: "Socratic Seminar",
    tagline: "Close-text dialogue with no leader's hand on the wheel.",
    gradeBands: ["6-8", "9-12", "educators"],
    timeMin: 30, timeIdeal: 60,
    groupMin: 8, groupMax: 22,
    materials: "Annotated text or scenario, optional notes",
    when: "Best for substantive philosophical or literary content. The teacher prepares opening questions but does NOT direct the discussion. Students cite specific moves, build on each other, allow silence. Best when students have read or experienced the material in advance.",
    how: [
      "Pre-work: students read/engage with the material and prepare 2-3 questions of their own.",
      "Arrange seating so all students see each other (a circle or oval).",
      "Open with one carefully chosen question — neither yes/no nor leading.",
      "Wait 8-12 full seconds before any clarification. Trust the silence.",
      "Track participation visually (a seating chart with tally marks) but don't intervene unless a norm is broken.",
      "After 30+ minutes, close with a written reflection: \"What changed in your thinking?\"",
    ],
    pitfalls: [
      "The biggest mistake: the teacher talks. If you find yourself making a substantive point, stop. Ask a question instead.",
      "Without preparation, seminars devolve into opinion-trading. Insist on the pre-work.",
      "If 2-3 students dominate, name it gently after a natural pause: \"I notice we've heard from the same voices. What does someone we haven't heard from think?\"",
    ],
    recommendedScenarios: ["platos-cave", "marys-room", "chinese-room", "experience-machine", "ring-of-gyges", "omelas", "drowning-child"],
  },
  {
    id: "fishbowl",
    name: "Fishbowl",
    tagline: "Inner circle discusses; outer circle observes and reflects.",
    gradeBands: ["6-8", "9-12", "educators"],
    timeMin: 25, timeIdeal: 45,
    groupMin: 12, groupMax: 30,
    materials: "Two concentric rings of seating; optional observation guides",
    when: "Use when discussion would otherwise be too crowded, or when you want students to learn FROM watching dialogue. The outer circle's silent attention is itself instructive.",
    how: [
      "Set up two concentric rings. Inner circle (4-6 students) discusses; outer circle observes.",
      "Give the outer circle a specific watching task: count interruptions, note sentence stems used, identify the strongest argument.",
      "Run 10-15 minutes of inner-circle discussion.",
      "Pause. Outer circle reports observations (not opinions on the topic — observations on the dialogue).",
      "Switch the rings. Repeat with new prompts.",
      "Close: each student writes one move they observed and want to try.",
    ],
    pitfalls: [
      "The outer circle starts whispering. Pre-frame: silence is their job — observation is harder than talking.",
      "Inner-circle members feel performative. Reassure: \"You'll switch in 15 minutes. Mistakes are how this works.\"",
      "Skip the observer-feedback step and you lose the protocol's main lesson.",
    ],
    recommendedScenarios: ["honesty-protection", "trolley-self-driving", "deepfake-election", "ai-friend-feelings"],
  },
  {
    id: "four-corners-debate",
    name: "Four Corners Debate",
    tagline: "Physically commit to a position before defending it.",
    gradeBands: ["k-5", "6-8", "9-12", "educators"],
    timeMin: 15, timeIdeal: 30,
    groupMin: 8, groupMax: 35,
    materials: "Four signs around the room (Strongly Agree / Agree / Disagree / Strongly Disagree)",
    when: "Movement-based; physical commitment makes thinking visible and gets quiet kids in. Best when there are multiple valid positions and you want students to own one before hearing others.",
    how: [
      "Post four signs around the room: Strongly Agree, Agree, Disagree, Strongly Disagree.",
      "State a claim from the scenario (not a question — a claim that can be agreed/disagreed with).",
      "Students walk to their corner. NO talking yet.",
      "In each corner: students discuss for 3 minutes, develop their group's strongest argument.",
      "Each corner sends a representative to share. Other corners respond.",
      "Anyone who has changed their mind moves. Do another round.",
      "Close: written reflection — \"What moved you, if anything?\"",
    ],
    pitfalls: [
      "Students go to their friends' corner instead of their honest one. Frame: \"Be honest — friendship can wait.\"",
      "The 'middle' corners can become a non-commitment refuge. Force a choice between Agree and Disagree only, sometimes.",
      "Don't reward changing your mind OR holding firm. Both are valid.",
    ],
    recommendedScenarios: ["winning-game", "rules-vs-helping", "deepfake-election", "autonomous-car-rider", "veil-of-ignorance"],
  },
  {
    id: "structured-academic-controversy",
    name: "Structured Academic Controversy (SAC)",
    tagline: "Argue a position, then argue the OPPOSITE.",
    gradeBands: ["9-12", "educators"],
    timeMin: 45, timeIdeal: 70,
    groupMin: 8, groupMax: 30,
    materials: "Position briefs (one per side); group worksheets",
    when: "The single most underused move in classroom dialogue. Forces students to steelman a view they don't initially hold. Best for genuinely controversial topics where strong positions exist on both sides.",
    how: [
      "Pair students. Within each pair, one argues Position A, the other Position B. Distribute briefs.",
      "Give 10 minutes for pairs to research and prepare their assigned position.",
      "Round 1: Position A presents to Position B (5 min). B listens silently.",
      "Round 2: B paraphrases A's position back. \"What I hear you saying is…\" (5 min).",
      "Round 3: B presents Position B; A paraphrases (10 min).",
      "Round 4: Pairs SWITCH positions. A now argues B, B now argues A. Each pair must steelman the side they didn't originally take (15 min).",
      "Final: pairs synthesize into a written summary. They are not required to AGREE — but must articulate where the genuine disagreement lies.",
    ],
    pitfalls: [
      "Skipping the paraphrase step. It's the magic move — without it, students don't actually hear the other side.",
      "Letting students stay on 'their' position throughout. The switch is non-negotiable.",
      "Treating this as a debate competition. It's a comprehension exercise, not a contest.",
    ],
    recommendedScenarios: ["trolley-self-driving", "biased-resume-ai", "school-surveillance", "ai-policy-design", "drowning-child"],
  },
  {
    id: "harkness",
    name: "Harkness Discussion",
    tagline: "Around one big table, students lead.",
    gradeBands: ["9-12", "educators"],
    timeMin: 40, timeIdeal: 70,
    groupMin: 10, groupMax: 16,
    materials: "Oval/round table; students prepared with annotations",
    when: "The Phillips Exeter method — designed for substantive academic discussion where students do almost all the talking. Requires preparation and a culture of trust. Best as an ongoing practice (weekly), not a one-off.",
    how: [
      "Pre-work: every student annotates the text/scenario and brings 2-3 questions.",
      "Sit at one large oval or round table. The teacher is one seat among many.",
      "Open with student questions, not teacher questions.",
      "Track participation on a Harkness map: a circular diagram where each student is a dot, and lines are drawn between speakers as they refer to one another.",
      "The teacher speaks rarely, and only to clarify a question or note a missed connection.",
      "Close: each student writes a self-assessment — what they contributed, what they noticed, what they want to do better.",
    ],
    pitfalls: [
      "Without preparation, Harkness collapses. Insist that 'unprepared = absent' for this protocol.",
      "Students who are used to being called on may freeze. Coach individually.",
      "If one student dominates, address it privately AFTER class — don't shame in the moment.",
      "If you intervene too much, students learn the game is to wait for the teacher. Practice silence.",
    ],
    recommendedScenarios: ["platos-cave", "experience-machine", "omelas", "ring-of-gyges", "marys-room"],
  },
  {
    id: "world-cafe",
    name: "World Café",
    tagline: "Multiple small tables, rotating conversations.",
    gradeBands: ["6-8", "9-12", "educators"],
    timeMin: 40, timeIdeal: 75,
    groupMin: 12, groupMax: 50,
    materials: "Several small tables, butcher paper or whiteboards at each, markers",
    when: "Best for large groups where everyone needs to engage. Each table tackles a different angle of the same big question; rotation cross-pollinates.",
    how: [
      "Set up 3-5 small tables. Each table has a sub-question of the central scenario, plus a 'host' who stays at the table all rounds.",
      "Round 1 (15 min): groups of 4-5 discuss at their table; host writes/draws key moves on the table paper.",
      "Round 2: everyone except the host moves to a new table. Host briefly summarizes what came before; new group adds.",
      "Round 3: rotate again.",
      "Final round: hosts present their tables' synthesis. Whole-group reflects.",
    ],
    pitfalls: [
      "Without distinct sub-questions, all tables sound the same. Differentiate prompts deliberately.",
      "Hosts get exhausted. Keep host duties to 3 rounds max.",
      "If groups don't write/draw, the cross-pollination is lost. Make recording mandatory.",
    ],
    recommendedScenarios: ["tragedy-commons", "veil-of-ignorance", "biased-admissions", "ai-policy-design"],
  },
  {
    id: "stakeholder-roundtable",
    name: "Stakeholder Roundtable",
    tagline: "Each student speaks from a specific perspective.",
    gradeBands: ["6-8", "9-12", "educators"],
    timeMin: 30, timeIdeal: 50,
    groupMin: 5, groupMax: 25,
    materials: "Role cards (one per student) with named stakeholder + key concerns",
    when: "Best for scenarios with many distinct stakeholder perspectives (AI policy, surveillance, admissions, deepfakes). Forces students to argue from a position that may not be their own.",
    how: [
      "Identify 5-8 stakeholders the scenario implicates (e.g., for surveillance: principal, teacher, counselor, student, parent, vendor, regulator, journalist).",
      "Distribute role cards. Each card includes the stakeholder's name, their primary concern, what they'd lose, what they'd gain.",
      "Give 5-10 minutes for students to inhabit the role and write 3 talking points.",
      "Round 1: each stakeholder gives a 60-second opening.",
      "Round 2: open dialogue — students MUST stay in role.",
      "Round 3: out of role. Reflect: \"Whose position was hardest to argue? What did you learn?\"",
    ],
    pitfalls: [
      "Students slip into 'what I really think' instead of role. Gently redirect: \"Stay in role — what does YOUR stakeholder care about?\"",
      "Some roles get short shrift. Pair them: two students per role for support.",
      "Skip the de-roling step and students leave with a position that wasn't theirs.",
    ],
    recommendedScenarios: ["school-surveillance", "biased-admissions", "ai-detector-false-positive", "ai-policy-design", "deepfake-election", "autonomous-car-rider"],
  },
  {
    id: "continuum-line",
    name: "Continuum Line",
    tagline: "Place yourself on the spectrum, then defend it.",
    gradeBands: ["k-5", "6-8", "9-12", "educators"],
    timeMin: 15, timeIdeal: 25,
    groupMin: 6, groupMax: 35,
    materials: "Floor space (actual line of tape) or a printed line on a worksheet",
    when: "Movement-based, surfaces the spread of opinion immediately. Great for warm-ups and quick polls of intuition.",
    how: [
      "Mark a long line on the floor: one end labeled \"Strongly disagree,\" the other \"Strongly agree.\"",
      "State a claim. Students walk to the spot that represents their position.",
      "Interview at random: tap a student and ask why they're standing where they are.",
      "After 3-4 interviews, ask: \"Anyone want to move based on what you've heard?\" Encourage motion.",
      "Repeat with a 2nd claim. The 2nd claim should be a TWIST on the 1st (the variant move from our scenarios works perfectly here).",
    ],
    pitfalls: [
      "Students cluster at the safe middle. Force interviews from the extreme ends.",
      "If a student is alone at one end, don't single them out — that's a recipe for shutting them down.",
      "Without the second-claim twist, the protocol surfaces opinion but doesn't move thinking.",
    ],
    recommendedScenarios: ["winning-game", "trolley-self-driving", "sorites-heap", "drowning-child"],
  },
  {
    id: "think-pair-share",
    name: "Think-Pair-Share",
    tagline: "Three minutes alone, three minutes with a partner, then share.",
    gradeBands: ["k-5", "6-8", "9-12", "educators"],
    timeMin: 8, timeIdeal: 15,
    groupMin: 4, groupMax: 50,
    materials: "None",
    when: "The bread-and-butter protocol. Good for any topic, any age. Works as a warm-up, a check-in, or a closer.",
    how: [
      "State the prompt clearly.",
      "Think (silent, 1-3 minutes): students write or sit with the question alone. NO talking.",
      "Pair (3-5 minutes): each student shares their thinking with a partner. Partner listens, then shares back.",
      "Share (5-10 minutes): pairs report out to the whole group — but report what their PARTNER said, not what they themselves said.",
    ],
    pitfalls: [
      "Skipping the silent Think phase. Students leap to talk and don't develop their own view. Hold the silence.",
      "Reporting only their own view in the Share phase. Insist on partner-paraphrase — it sharpens listening.",
      "Doing it too often. The protocol loses freshness if it's the only one you use.",
    ],
    recommendedScenarios: ["invisible-ring", "robot-friend-turn", "ai-art-help", "messy-robot", "rules-vs-helping"],
  },
  {
    id: "gallery-walk",
    name: "Gallery Walk",
    tagline: "Move through stations; respond on paper.",
    gradeBands: ["k-5", "6-8", "9-12"],
    timeMin: 25, timeIdeal: 40,
    groupMin: 10, groupMax: 35,
    materials: "Posters, butcher paper, or large sheets at stations around the room; markers and sticky notes",
    when: "Quiet, movement-based, supports introverts. Good for scenarios with multiple aspects worth examining (AI bias has multiple stakeholders; Trolley has multiple variants).",
    how: [
      "Set up 4-6 stations around the room. Each has a different prompt, image, or scenario variant.",
      "Students start in small groups at one station; they have 5-7 minutes per station.",
      "At each station: read, discuss quietly, leave a written/drawn response.",
      "After all stations: students return to their starting station and read what others left.",
      "Whole group: \"What did you notice?\"",
    ],
    pitfalls: [
      "Students rush through. Use a timer audibly.",
      "Without a clear task at each station, the walk becomes idle browsing. Frame each station's task.",
      "Don't skip the return-to-start step — that's where students see how others responded.",
    ],
    recommendedScenarios: ["trolley-self-driving", "biased-resume-ai", "veil-of-ignorance", "deepfake-election"],
  },
  {
    id: "silent-conversation",
    name: "Silent Conversation",
    tagline: "Dialogue on paper. No one speaks.",
    gradeBands: ["6-8", "9-12", "educators"],
    timeMin: 20, timeIdeal: 35,
    groupMin: 4, groupMax: 30,
    materials: "Large butcher paper or chart paper; markers (different colors per student)",
    when: "Best for sensitive topics where verbal discussion is hard, or for groups where one or two voices dominate. The silence equalizes participation.",
    how: [
      "Tape a large piece of paper to the table or wall. Write the prompt at the top.",
      "Hand each student a marker.",
      "NO talking. Students respond on the paper — to the prompt, to each other, drawing arrows between connected ideas.",
      "Run for 15-25 minutes.",
      "After: whole group looks at the paper. Each student names one thread they want to talk about now.",
      "Verbal discussion follows.",
    ],
    pitfalls: [
      "Students whisper. Frame: \"Silence is hard. The point is to let your writing do the work your mouth usually does.\"",
      "The paper fills up unevenly. That's okay — one corner of intense exchange is more valuable than uniform coverage.",
      "Don't skip the verbal follow-up. The silence is preparation; the conversation is the payoff.",
    ],
    recommendedScenarios: ["omelas", "school-surveillance", "ai-friend-feelings", "drowning-child", "honesty-protection"],
  },
];

export const PROTOCOL_BY_ID = Object.fromEntries(PROTOCOLS.map(p => [p.id, p]));

// Filter helpers ─────────────────────────────────────────────────────

export function filterProtocols(protocols, { gradeBand, maxTime, groupSize } = {}) {
  return protocols.filter(p => {
    if (gradeBand && !p.gradeBands.includes(gradeBand)) return false;
    if (maxTime != null && p.timeMin > maxTime) return false;
    if (groupSize != null) {
      if (groupSize < p.groupMin || groupSize > p.groupMax) return false;
    }
    return true;
  });
}
