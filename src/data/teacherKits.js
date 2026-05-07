// Teacher kits for every scenario — keyed by experiment id.
// Each kit is attached to its experiment by experiments.js at module load.
// See TeacherKit.jsx for the consuming UI and JSDoc shape.

export const TEACHER_KITS = {
  // ════════════════════════════════════════════════════════════════════
  // K-5 — kid mode
  // Authoring rules: short prompts, physical/visual activities, very short
  // sentence stems, lots of partner-share, single-page handout focused on
  // drawing or one-line writing.
  // ════════════════════════════════════════════════════════════════════
  "magic-toy": {
    bigQuestion: "Should we be kind to things that aren't really alive?",
    objectives: [
      "Students will distinguish between things that have feelings and things that seem to have feelings.",
      "Students will explain why kindness matters even when it isn't required.",
    ],
    standards: [
      "CCSS.ELA-LITERACY.SL.K.1 — Participate in collaborative conversations.",
      "CASEL Self-Awareness 1A — Recognizing emotions in self and others.",
    ],
    times: { quick: "10 min circle time", standard: "25 min", deep: "40 min + drawing" },
    warmUp: "On the rug: \"Show me your face when you feel sad.\" Then: \"Show me your face when you SEE someone sad.\" Hold up a stuffed animal and ask, \"Can this feel sad? Why or why not?\"",
    protocol: { name: "Talking Circle with a soft object", why: "K-2 students need a clear turn-taking rule and a physical anchor; whoever holds the toy speaks." },
    discussionPrompts: [
      "What makes something \"alive\"?",
      "Has anything ever LOOKED sad to you that wasn't really sad?",
      "If something can't really feel, does how we treat it still matter?",
      "What kind of person do you become when you're kind to a toy?",
    ],
    derailers: [
      { trigger: "Student insists their toy is REALLY alive and won't let it go.", redirect: "Affirm what's true: \"Your toy is really important to you. That's real. Let's ask a different question — what does it teach you about kindness?\"" },
      { trigger: "Student says \"It's just a toy, you're being a baby.\"", redirect: "Reframe: \"Some people care a lot about pretend things. Some don't. Both can be okay. What's NOT okay is making someone feel bad for caring.\"" },
    ],
    sensitivities: [
      "A child who has lost a pet recently may have strong feelings here. Have a private check-in available.",
      "Some families discourage assigning feelings to objects for religious or cultural reasons — honor that.",
    ],
    differentiation: {
      ell: "Pre-teach \"feel,\" \"sad,\" \"pretend.\" Pair with picture cards.",
      iep: "Allow students to share by holding up A/B/C/D cards instead of speaking.",
      advanced: "Ask: \"What if the toy was actually a robot that could learn from you? Would your answer change?\"",
    },
    handout: "Single page: a drawing of an empty stuffed bear with a thought bubble. Top: \"What is the bear thinking?\" Bottom three boxes: \"I would…\" / \"Because…\" / \"And then…\" — students draw or write 1 short response in each.",
    exitTicket: "Draw a face on this bear that shows how YOU treat things that seem sad.",
    crossCurricular: [
      { subject: "Art", connection: "Drawing different facial expressions; emotion vocabulary." },
      { subject: "Health/SEL", connection: "Recognizing emotions in others; empathy practice." },
      { subject: "Science", connection: "Living vs. non-living — what makes something alive?" },
    ],
    homeExtension: "Bring this prompt home: \"Find something at home that LOOKS like it has feelings — a stuffed toy, a pet's bed, a houseplant. Tell a grown-up: how do you treat it, and why?\"",
    extension: "Read aloud: Mo Willems's \"Knuffle Bunny\" or \"The Velveteen Rabbit.\" Ask: \"How does the toy become real? Was it real all along?\"",
  },

  "invisible-ring": {
    bigQuestion: "If no one was watching, would you still be a good person?",
    objectives: [
      "Students will articulate the difference between behaving well because of consequences and behaving well because it's right.",
      "Students will name what they would and wouldn't do if invisible — and explain why.",
    ],
    standards: [
      "CCSS.ELA-LITERACY.SL.2.1 — Build on others' talk in conversations.",
      "C3 Framework D2.Civ.7.K-2 — Apply civic virtues when participating in school settings.",
    ],
    times: { quick: "15 min", standard: "30–40 min", deep: "two days, with drawing + sharing" },
    warmUp: "Hold up a paper ring. \"Pretend this is magic — when you put it on, no one can see you. NOT EVEN ME.\" Pause. \"What would you do first?\" Take a few quick answers (no judgment).",
    protocol: { name: "Think-Pair-Share with a sentence stem", why: "Students need to name their honest first instinct, then hear another instinct, before group share. Reduces social pressure to give the \"good\" answer." },
    discussionPrompts: [
      "If you could be invisible for one whole day, what would you do?",
      "Is there a difference between \"not being caught\" and \"doing the right thing\"?",
      "Do you act differently when grown-ups are watching? Is that okay?",
      "Plato thought: a person who's only good because someone is watching isn't really good. Do you agree?",
    ],
    derailers: [
      { trigger: "Student loudly proposes harming someone with the ring.", redirect: "Stay calm: \"Lots of people have that thought first — that's WHY Plato wrote about this 2,400 years ago. Now: what do you imagine happens to a person who actually does that?\"" },
      { trigger: "Class becomes a contest of \"whose answer is funniest.\"", redirect: "\"Funny answers are fine. Let's also try one HONEST answer each. Stem: 'I'm tempted to ___ because…'\"" },
    ],
    sensitivities: [
      "Some students may bring up real situations where they wished they were invisible (bullying, family conflict). Be ready to follow up privately.",
    ],
    differentiation: {
      ell: "Provide the sentence stems in writing: \"With the ring I would ___ because ___.\"",
      iep: "Allow drawing-only responses; facilitator narrates.",
      advanced: "Introduce the term \"integrity\" — \"doing the same thing whether or not anyone is watching.\" Ask: how would you build integrity?",
    },
    handout: "Two-side single page. Front: outline of a ring; students write/draw \"With this ring I would…\" Back: outline of a mirror; students write/draw \"And then I would see…\"",
    exitTicket: "Finish this sentence: \"A person with integrity is someone who ___.\"",
    crossCurricular: [
      { subject: "ELA", connection: "Read \"The Tortoise and the Hare\" or other character-tales; same theme." },
      { subject: "Social Studies", connection: "Why do communities have rules even for things no one can see?" },
    ],
    homeExtension: "\"Tell a grown-up: if you had a magic ring that made you invisible for one hour, what's ONE thing you would do? Ask them — would they do the same? Different? Why?\"",
    extension: "Multi-day: each day for a week, students record one thing they did when no one was watching. Friday share: \"Which one are you most proud of?\"",
  },

  "robot-friend-turn": {
    bigQuestion: "What does fair sharing actually mean?",
    objectives: [
      "Students will identify multiple definitions of fairness (equal, by need, by turns).",
      "Students will negotiate a sharing plan with a partner.",
    ],
    standards: [
      "CCSS.ELA-LITERACY.SL.1.1 — Follow agreed-upon rules for discussions.",
      "CASEL Relationship Skills 4B — Demonstrating cultural competency.",
    ],
    times: { quick: "10 min", standard: "30 min role-play", deep: "45 min with planning sheet" },
    warmUp: "One toy on the rug. Two volunteers. \"You both want it right now. Solve it.\" Watch what happens (do not direct). Pause and name what you saw.",
    protocol: { name: "Role-play + debrief", why: "Sharing rules feel abstract until students enact them. Two volunteers + audience watching is powerful." },
    discussionPrompts: [
      "What's the difference between \"equal\" and \"fair\"?",
      "When is taking turns fair? When isn't it?",
      "What if one person needs the toy more — does that change things?",
      "How do you make a sharing plan that everyone agrees to?",
    ],
    derailers: [
      { trigger: "One student dominates and won't yield.", redirect: "Pause the role-play. \"Audience: what could she try next?\" Distributes the problem." },
      { trigger: "Students insist \"first come, first served\" is the only fair rule.", redirect: "\"That IS one rule. Let's try another and see how it feels — what if we used 'whoever needs it most goes first' instead?\"" },
    ],
    sensitivities: ["For students with sibling or sharing struggles at home, this can be activating. Have a check-in nearby."],
    differentiation: {
      ell: "Use the sentence stem \"It's fair when ___\" with picture support.",
      iep: "Pre-teach phrases: \"Can I have a turn?\" \"It's my turn now.\"",
      advanced: "Introduce the concept that different cultures have different fairness norms (e.g., some honor age, some honor need).",
    },
    handout: "Front: a picture of one toy with two reaching hands. Three boxes: \"My plan to share is…\" / \"It's fair because…\" / \"What I'll do if it doesn't work…\"",
    exitTicket: "Tell me one new way to share that you didn't think of before today.",
    crossCurricular: [
      { subject: "Math", connection: "Time-sharing — equal minutes, fractions of an hour." },
      { subject: "PE", connection: "Sharing equipment — team rotation systems." },
    ],
    homeExtension: "\"Pick something at home that's shared (TV, video game, dessert). Make a NEW sharing plan with your family this week. Try it for 3 days.\"",
    extension: "Have students design a sharing plan for one classroom resource (the iPad cart, the reading nook). Implement and review after one week.",
  },

  "honesty-protection": {
    bigQuestion: "When does loyalty to a friend pull against honesty?",
    objectives: [
      "Students will distinguish between honesty, loyalty, and tattling.",
      "Students will identify a path that honors both honesty and friendship.",
    ],
    standards: [
      "CCSS.ELA-LITERACY.SL.2.3 — Ask and answer questions about what others say.",
      "CASEL Responsible Decision-Making 5C — Identifying solutions for personal and social problems.",
    ],
    times: { quick: "15 min", standard: "30 min", deep: "with role-play, 50 min" },
    warmUp: "On the board: \"Tattling vs. Telling.\" Quick brainstorm: \"What's the difference?\" (Common K-5 distinction: tattling tries to get someone in trouble; telling tries to keep someone safe or fix a problem.)",
    protocol: { name: "Fishbowl role-play", why: "Two students enact the scene; the rest observe and offer alternatives. Removes pressure from the actors and engages the audience." },
    discussionPrompts: [
      "What does it feel like to keep a secret you don't want to keep?",
      "Is helping a friend tell the truth better than telling for them?",
      "When IS it okay to keep a secret?",
      "What would you want a friend to do for you?",
    ],
    derailers: [
      { trigger: "Student insists \"snitches get stitches\" or similar.", redirect: "Acknowledge: \"In some places, telling can be unsafe. The question we're asking is about a SAFE place — your classroom. What's right HERE?\" Don't argue the broader claim publicly." },
      { trigger: "Class polarizes (\"always tell\" vs \"never tell\").", redirect: "\"Lots of you are at the ends. Who's in the MIDDLE? When does it depend?\"" },
    ],
    sensitivities: [
      "If a student discloses an actual safety concern during this activity, follow your school's mandatory reporting protocol.",
      "Family cultures vary widely on what's owed to friends vs. authority. Honor that range.",
    ],
    differentiation: {
      ell: "Pre-teach \"honest,\" \"secret,\" \"loyal,\" with examples.",
      iep: "Provide the four options as cards; students hand you the card that matches their thinking.",
      advanced: "Introduce \"moral courage\" — telling the truth when it's hard. Ask: when have you used it?",
    },
    handout: "Single page divided into 3 boxes: \"What I would do…\" / \"What I would say to my friend…\" / \"What I would say to the teacher…\"",
    exitTicket: "Finish: \"A real friend helps you ___, not ___.\"",
    crossCurricular: [
      { subject: "ELA", connection: "Read \"The Empty Pot\" or any folk tale about honesty." },
      { subject: "Social Studies", connection: "How do classroom norms get made? Who enforces them?" },
    ],
    homeExtension: "\"Tell a grown-up about a time someone asked you to keep a secret. Did you? Should you have?\"",
    extension: "Class creates a \"Sharing Truth\" agreement together — what we tell, what we don't, how we help each other.",
  },

  "robot-pet-goodbye": {
    bigQuestion: "Can we love something that isn't really alive?",
    objectives: [
      "Students will identify what makes a relationship feel real.",
      "Students will distinguish between grief that is rational and grief that is felt anyway.",
    ],
    standards: [
      "CCSS.ELA-LITERACY.SL.K.3 — Ask and answer questions to seek help, get information, or clarify.",
      "CASEL Self-Awareness 1A — Identifying emotions.",
    ],
    times: { quick: "15 min", standard: "30 min + memory-share", deep: "two-day arc with goodbye ritual" },
    warmUp: "\"Raise your hand if you've ever lost something special.\" Let students share briefly. Validate: \"It's normal to miss things — even things that aren't alive.\"",
    protocol: { name: "Memory share circle", why: "Modeling that grief is allowed and small acts of remembering help. Builds psychological safety." },
    discussionPrompts: [
      "What makes us love something?",
      "Can you miss something that isn't alive? What does that feel like?",
      "Is it okay to have a small goodbye for a robot pet? Why or why not?",
      "What changes — and what stays the same — when you replace something with a new one?",
    ],
    derailers: [
      { trigger: "A student starts crying about a real loss.", redirect: "Pause discussion. Acknowledge them privately. \"That feeling is real and important. Do you want to take a quiet break or stay?\" Resume only when they're ready." },
      { trigger: "A student mocks others for being sad.", redirect: "\"Different people care about different things. Mocking what someone cares about isn't allowed in this classroom — even if you don't share it.\"" },
    ],
    sensitivities: [
      "Recent loss of a pet, grandparent, or friend will hit hard here. Pre-screen if you can.",
      "Some families discourage attachment to objects; honor without arguing.",
    ],
    differentiation: {
      ell: "Provide picture cards: happy / sad / okay / missing. Students point to how they'd feel.",
      iep: "Offer drawing as an alternative to verbal sharing.",
      advanced: "Introduce the philosophical word \"continuity\" — what stays the same in things we love?",
    },
    handout: "Front: a drawing of the robot dog. \"What I'd want to remember about it…\" Back: \"What I'd say at a small goodbye…\"",
    exitTicket: "Draw a small picture of something special that you don't have anymore. Below it, write one word.",
    crossCurricular: [
      { subject: "ELA", connection: "Read \"The Tenth Good Thing About Barney\" by Judith Viorst." },
      { subject: "Music", connection: "Lullabies and goodbye songs — what do they do for us?" },
    ],
    homeExtension: "\"Ask a grown-up about something they once loved that's gone. What do they remember?\"",
    extension: "Optional class ritual: students write or draw a goodbye for any \"thing\" they've lost (a pet, an old toy, a place they moved from). Share if they want.",
  },

  "ai-art-help": {
    bigQuestion: "When AI helps you, whose work is it?",
    objectives: [
      "Students will explain what \"credit\" means in their own work.",
      "Students will practice telling the truth about how something was made.",
    ],
    standards: [
      "CCSS.ELA-LITERACY.W.3.4 — Produce writing in which the development is appropriate.",
      "ISTE Student Standard 3.b — Evaluate the accuracy and credibility of digital sources.",
    ],
    times: { quick: "15 min", standard: "40 min + art project", deep: "1 week mini-project" },
    warmUp: "Show two pictures side by side: one drawn by you, one with an AI-helper version. \"Which is mine? Both? How do you know?\" Let them argue.",
    protocol: { name: "Gallery walk + sticky-note voting", why: "Students vote with their feet; lower-stakes than verbal share, surfaces honest opinion." },
    discussionPrompts: [
      "What does \"my drawing\" mean — the lines, the idea, or both?",
      "Does it matter HOW you made something, or just how it looks?",
      "When is it okay to get help? When isn't it?",
      "If a friend used AI to draw, would you want them to tell you?",
    ],
    derailers: [
      { trigger: "Student says \"AI is cheating, full stop.\"", redirect: "\"Let's test that — is using a calculator on math homework cheating? What about using a ruler? Where's the line?\"" },
      { trigger: "Student says \"It doesn't matter, the picture is good either way.\"", redirect: "\"Try this: if your friend gave you a present and you found out their grown-up actually made it, would your feelings about the present change? Why?\"" },
    ],
    sensitivities: [
      "Students whose families don't have AI access at home may feel left out. Frame examples as universal hypotheticals, not requirements.",
    ],
    differentiation: {
      ell: "Pre-teach \"help,\" \"made,\" \"told,\" \"honest.\" Use side-by-side pictures.",
      iep: "Pair students for art project; allow verbal credit instead of written.",
      advanced: "Introduce \"attribution\" (giving credit). Ask: how do real artists attribute help?",
    },
    handout: "A blank \"Art Card\" — students draw something, then fill in: \"My idea: ___\" \"Help I got: ___\" \"What's mostly mine: ___\"",
    exitTicket: "Draw or write one thing you made today. Below it: \"Help I got = ___\"",
    crossCurricular: [
      { subject: "Art", connection: "Tools artists use — brushes, photo references, AI. When is each appropriate?" },
      { subject: "ELA", connection: "Citing sources — telling readers where ideas came from." },
    ],
    homeExtension: "\"Make something with a grown-up. Then make a small label that tells the truth: who did what?\"",
    extension: "Class makes an \"Art Card\" routine for the year — every class artwork gets a tiny attribution card.",
  },

  "messy-robot": {
    bigQuestion: "Just because you CAN, does that mean you SHOULD?",
    objectives: [
      "Students will distinguish between what's allowed and what's right.",
      "Students will explain why we have responsibilities even when tools or others can do things for us.",
    ],
    standards: [
      "CCSS.ELA-LITERACY.SL.2.1 — Participate in collaborative conversations.",
      "C3 Framework D2.Civ.7.K-2 — Civic virtues in school settings.",
    ],
    times: { quick: "15 min", standard: "30 min", deep: "with classroom audit, 60 min" },
    warmUp: "On the board: \"Today, our class can ___ because ___.\" Fill in (e.g. \"play together because we share\"). Now: \"What if no one shared? What would happen to our class?\"",
    protocol: { name: "Pair-share with a Yes/No card", why: "Quick polling makes the group's spread visible; students explain to a partner first, then share with class." },
    discussionPrompts: [
      "If a robot will clean up, do we still have to be careful?",
      "What's the difference between \"the robot can do it\" and \"the robot should do it\"?",
      "When is it okay to make extra work for someone (or something) else?",
      "What would happen if everyone made messes for the robot?",
    ],
    derailers: [
      { trigger: "Class quickly converges on \"don't make a mess\" with no one defending the friend's logic.", redirect: "\"Good — but let's STEELMAN the friend. What's the BEST argument for making the mess? Who can make it?\"" },
      { trigger: "Student suggests breaking the robot \"to teach it.\"", redirect: "\"Tools don't learn from being broken — but the people watching DO learn what kind of person you are. What lesson would they learn?\"" },
    ],
    sensitivities: [],
    differentiation: {
      ell: "Pre-teach \"mess,\" \"clean,\" \"responsible,\" \"should.\"",
      iep: "Provide the choices as picture cards.",
      advanced: "Introduce the concept of \"externalities\" — costs your action puts on someone else.",
    },
    handout: "A drawing of a clean classroom on top, a messy one on bottom. \"Three rules I'd make for the robot AND for me.\"",
    exitTicket: "True or false: \"Just because something's possible doesn't mean it's right.\" Explain in one sentence.",
    crossCurricular: [
      { subject: "Health/SEL", connection: "Personal responsibility; cleaning up after oneself." },
      { subject: "Science", connection: "How do machines work? What can they not do?" },
    ],
    homeExtension: "\"Pick one chore at home. Ask: 'who does this if I don't?' Notice: what changes for them when you do it yourself?\"",
    extension: "Class audit: list everything in the classroom that someone else cleans up after us. Make a \"do-it-ourselves\" plan for ONE of them.",
  },

  "rules-vs-helping": {
    bigQuestion: "Are some rules more important than others?",
    objectives: [
      "Students will articulate why we have rules and what those rules are FOR.",
      "Students will identify when two good things (a rule and a kindness) seem to conflict.",
    ],
    standards: [
      "CCSS.ELA-LITERACY.SL.1.1 — Follow agreed-upon rules for discussions.",
      "CASEL Responsible Decision-Making 5C — Identifying solutions for personal and social problems.",
    ],
    times: { quick: "15 min", standard: "35 min", deep: "rule-redesign workshop, 60 min" },
    warmUp: "Show the class two cards: 🤫 \"Be quiet\" / ❤️ \"Be kind.\" Ask: \"Which is more important?\" Let them argue. Most will say \"both.\" Push: \"What if you can ONLY do one — which?\"",
    protocol: { name: "Four corners debate", why: "Movement-based discussion; physical commitment makes thinking visible. Quiet kids have to choose a corner — gives them a stake without requiring speech." },
    discussionPrompts: [
      "Why do we have a quiet rule?",
      "Why do we help each other?",
      "When two good things bump into each other, how do we choose?",
      "What's a way to do BOTH — keep the rule AND be kind?",
    ],
    derailers: [
      { trigger: "Class divides into a \"rule-followers\" group that shames the \"rule-breakers.\"", redirect: "\"Wait — both groups care about doing the right thing. They just disagree about which thing matters most. Let's hear their best argument.\"" },
      { trigger: "Student decides \"break the rule when I want.\"", redirect: "Push: \"What if EVERYONE used that rule? What would the room look like?\"" },
    ],
    sensitivities: [],
    differentiation: {
      ell: "Use the icons 🤫❤️ throughout; pre-teach \"rule,\" \"kind,\" \"break.\"",
      iep: "Allow movement instead of speech (corners protocol).",
      advanced: "Introduce the term \"hierarchy of values\" — we rank what matters most. Ask them to write THEIR top 3 values.",
    },
    handout: "Top: an empty puzzle with a sad face beside it. Bottom: three boxes — \"My choice was ___\" / \"Because ___\" / \"Next time I might ___\"",
    exitTicket: "Finish: \"A rule is most important when ___, but kindness is most important when ___.\"",
    crossCurricular: [
      { subject: "Civics", connection: "Why do laws have exceptions? (Emergency vehicles run red lights.)" },
      { subject: "ELA", connection: "Stories where a character breaks a rule for a good reason — and one where they shouldn't have." },
    ],
    homeExtension: "\"Tell a grown-up about a class rule. Ask: what's a rule at home that's a LITTLE like it? When can it bend?\"",
    extension: "Class rewrites one classroom rule to include the kindness exception explicitly. Live with the new version for two weeks.",
  },

  "rude-toy": {
    bigQuestion: "What we listen to shapes who we become.",
    objectives: [
      "Students will explain why bad words from machines still affect us.",
      "Students will identify someone they could tell when something doesn't feel right.",
    ],
    standards: [
      "CASEL Self-Management 2A — Recognizing one's emotions.",
      "ISTE Student Standard 2.b — Engaging in positive, safe, legal, and ethical behavior with technology.",
    ],
    times: { quick: "15 min", standard: "30 min", deep: "with home-tech inventory, 50 min" },
    warmUp: "\"What's a word you wouldn't say to your grandma?\" (Don't have them say it!) \"Now: who do you think TAUGHT a machine those words?\"",
    protocol: { name: "Talking circle with the word DIGNITY in the center", why: "Naming the value (dignity) frames the discussion away from \"bad words\" and toward respect for self and others." },
    discussionPrompts: [
      "Where do toys get their words?",
      "Does it matter if a machine says something mean — or only if a person does?",
      "Who could you tell if something at home (or on a screen) doesn't feel right?",
      "What kind of words do you WANT to surround yourself with?",
    ],
    derailers: [
      { trigger: "Students try to repeat the actual rude words for laughs.", redirect: "\"In this class we don't repeat the words — we talk about the FEELING. What feeling does that word make in your stomach?\"" },
      { trigger: "Student insists their family uses those words at home.", redirect: "\"Different families have different rules. Our class has its own rules. Both can be true.\"" },
    ],
    sensitivities: [
      "Some students live with verbal abuse at home. This activity can surface that. Be ready to follow up privately and use mandatory reporting if needed.",
      "What counts as a \"bad word\" varies across cultures and faiths. Stay focused on words that demean others — not on lists of forbidden words.",
    ],
    differentiation: {
      ell: "Use \"kind words\" / \"unkind words\" instead of \"good\" / \"bad.\"",
      iep: "Allow drawing a face that shows how each kind of word feels.",
      advanced: "Introduce the idea: machines don't \"mean\" anything by what they say — but listeners hear meaning anyway. What's our responsibility as listeners?",
    },
    handout: "A drawing of a toy with a thought bubble. Three boxes: \"What I'd do…\" / \"Who I'd tell…\" / \"Words I want around me…\"",
    exitTicket: "Name one trusted grown-up you would tell if a toy or app said something unkind.",
    crossCurricular: [
      { subject: "Health", connection: "Healthy relationships — what's said TO us shapes us." },
      { subject: "Tech literacy", connection: "Where do AIs learn to talk? (From people on the internet.)" },
    ],
    homeExtension: "\"With a grown-up, list 3 words your family wants in your home — and 3 words you don't. Put it on the fridge.\"",
    extension: "Class builds a \"Words We Choose\" wall — kind words students hear or use that week. Reread on Friday.",
  },

  "winning-game": {
    bigQuestion: "Is it really winning if the game lets you?",
    objectives: [
      "Students will distinguish between earned success and given success.",
      "Students will reflect on what they want from games and from learning.",
    ],
    standards: [
      "CCSS.ELA-LITERACY.SL.3.1 — Engage effectively in collaborative discussions.",
      "CASEL Self-Awareness 1B — Identifying personal strengths.",
    ],
    times: { quick: "15 min", standard: "30 min", deep: "with game-design connection, 50 min" },
    warmUp: "Quick poll, hands up: \"Who wants to WIN?\" (Most hands.) \"Who wants the game to be FAIR?\" (Most hands.) \"What do you do if you can only have one?\"",
    protocol: { name: "Continuum line", why: "Students physically position themselves on a line from 'I want to win at any cost' to 'I want a fair challenge.' Visible spectrum." },
    discussionPrompts: [
      "What's the difference between FUN and FAIR?",
      "If you found out the AI was making the game easier, would you keep playing?",
      "Is there a kind of fun that comes from struggling?",
      "Where else does this happen — schoolwork, sports, life?",
    ],
    derailers: [
      { trigger: "Student says \"I just want to win — I don't care.\"", redirect: "\"Cool — be honest about that. NOW: imagine you find out the trophy was given to everyone in the room. Same feeling? What changed?\"" },
      { trigger: "Class moralizes about \"cheaters\" or shames easy modes.", redirect: "\"Let's separate two things: choosing easy mode for FUN vs. lying about it. Which is the question we're asking?\"" },
    ],
    sensitivities: [
      "Some students struggle with games and may have used easy modes to feel competent — don't let the discussion shame that.",
    ],
    differentiation: {
      ell: "Use thumbs-up / thumbs-down for choices; gradually add words: \"earned,\" \"given,\" \"struggled.\"",
      iep: "Provide a printed continuum students can mark with a sticker.",
      advanced: "Connect to Robert Nozick's Experience Machine: would you accept a perfect simulated life if it weren't real? What's the analogy?",
    },
    handout: "Front: a trophy with two columns: \"What I earned…\" / \"What I was given…\" Back: \"Next time the game gets easy, I'll…\"",
    exitTicket: "Finish: \"A real win feels like ___, even if it's harder.\"",
    crossCurricular: [
      { subject: "PE", connection: "Sportsmanship — handicaps, age divisions, what makes competition fair." },
      { subject: "Math", connection: "Probability — when is a 'win' just lucky?" },
    ],
    homeExtension: "\"Ask a grown-up about a time they won something they didn't really earn — or earned something they didn't expect to win. Which felt better?\"",
    extension: "Game-design challenge: in pairs, design a game with TWO modes — \"Just for fun\" and \"Real challenge.\" Play each. Which felt better, and why?",
  },

  // ════════════════════════════════════════════════════════════════════
  // 6-8 — story mode
  // Authoring rules: introduce written reflection, partner debate,
  // structured protocols, primary-source excerpt where appropriate.
  // ════════════════════════════════════════════════════════════════════
  "trolley-self-driving": {
    bigQuestion: "Can a moral choice be programmed?",
    objectives: [
      "Students will compare utilitarian and deontological responses to a forced moral choice.",
      "Students will explain why intuitions about the lever and the footbridge often differ.",
      "Students will articulate what 'doctrine of double effect' might mean.",
    ],
    standards: [
      "CCSS.ELA-LITERACY.SL.7.1.D — Acknowledge new information and modify views.",
      "C3 D4.7.6-8 — Construct arguments using claims and evidence.",
      "ISTE Student Standard 5.a — Formulate problem definitions for investigation.",
    ],
    times: { quick: "20 min", standard: "50 min", deep: "two-day arc with research" },
    warmUp: "Show MIT Moral Machine results graphic (1 slide). \"Different countries answered THIS question very differently. Today we'll figure out what we'd want — and why.\"",
    protocol: { name: "Structured Academic Controversy (SAC)", why: "Pairs research and argue ONE side first, then SWITCH and argue the other. Forces students to steelman a view they don't initially hold." },
    discussionPrompts: [
      "Is doing harm worse than allowing harm?",
      "What changes morally between pulling a lever and pushing a person?",
      "Should an AI ever be in the position to make this kind of choice?",
      "If 70% pull the lever but 30% push, which group is more 'rational' — and is rational the right standard?",
      "Whose values get programmed into self-driving cars — the company's? The driver's? Society's?",
    ],
    derailers: [
      { trigger: "Student argues 'just don't have trolleys/cars then.'", redirect: "Honor the move: 'That's a real philosophical position — refuse the framing. Now: what do we DO when the situation arises anyway? The trolley is a STAND-IN for unavoidable choices.'" },
      { trigger: "Class converges on utilitarianism without engaging the footbridge variant.", redirect: "Push the variant harder: 'Same outcome — five saved, one dies. If you'd pull the lever, why won't you push? Try to put words on the difference.'" },
      { trigger: "Class polarizes; students mock each other's positions.", redirect: "Switch sides — make each pair argue the position they DIDN'T choose. 'Argue it as if you really believed it.'" },
    ],
    sensitivities: [
      "Discussion involves death scenarios. Students who have experienced loss may need a private check-in.",
      "Avoid making it personal: 'imagine YOUR sibling on the track' is high-stakes and risks shutting down dialogue. Keep the figures abstract.",
    ],
    differentiation: {
      ell: "Provide a vocabulary glossary: utilitarian, deontological, intuition, consequence. Pair with diagrams.",
      iep: "Allow silent voting via cards or polling tool; let written reflection substitute for verbal debate.",
      advanced: "Introduce the Doctrine of Double Effect (DDE): you may foresee a harm without intending it. Apply it to the footbridge. Read Foot (1967) excerpt.",
    },
    handout: "Two-column page. Left: 'The Lever' diagram + 'My answer' / 'My reason.' Right: 'The Footbridge' same. Bottom: 'If I'm consistent, my rule is: ___'",
    exitTicket: "In one sentence: state a moral rule you would program into a self-driving car. In a second sentence: name the strongest objection to your own rule.",
    crossCurricular: [
      { subject: "Math/Statistics", connection: "MIT Moral Machine global data — what patterns emerge by region/culture? Have students plot." },
      { subject: "Computer Science", connection: "What does it mean to encode a value as a rule? Try writing a rule in pseudo-code." },
      { subject: "Civics", connection: "Who should regulate AV programming — companies, governments, drivers?" },
    ],
    homeExtension: "Family conversation: 'A self-driving car is about to crash. It can save five strangers or its one driver — you. How should it be programmed? Now: would you BUY a car with the answer you just gave?'",
    extension: "Multi-day: students research one real-world AV ethics case (Uber Tempe 2018; Tesla Autopilot incidents) and present 'what was at stake, what was decided, what they'd change.'",
  },

  "ship-of-theseus-robot": {
    bigQuestion: "What makes you the same person you were yesterday?",
    objectives: [
      "Students will distinguish between material identity and psychological continuity.",
      "Students will apply the Ship of Theseus to a contemporary case (digital backups, prosthetics, etc.).",
      "Students will articulate Locke's memory-based theory of personal identity.",
    ],
    standards: [
      "CCSS.ELA-LITERACY.RH.6-8.6 — Identify aspects of a text revealing author's point of view.",
      "C3 D2.His.4.6-8 — Analyze multiple factors in historical events.",
    ],
    times: { quick: "20 min", standard: "50 min", deep: "two days with personal-identity essay" },
    warmUp: "Show a baby photo of a celebrity students recognize. Ask: 'Same person?' (Yes.) 'How? Different cells. Different memories. Different beliefs.' Then: 'So WHAT is the same?'",
    protocol: { name: "Concept-mapping in pairs", why: "Identity is multi-faceted; visualizing the threads (memory, body, name, role) makes the philosophical disagreements visible." },
    discussionPrompts: [
      "What makes you the same person you were as a 5-year-old?",
      "If you got a brain transplant — which person walks out of the operating room?",
      "If your memories were copied onto a new body, would the copy be you?",
      "When EVERY part of the robot has been replaced AND someone has rebuilt the originals, which one is 'the' robot?",
    ],
    derailers: [
      { trigger: "Class fixates on 'the soul.'", redirect: "Acknowledge it: 'For some traditions, soul IS the answer. Today let's try the question without that — what's the SECULAR answer?'" },
      { trigger: "Student concludes 'identity is meaningless.'", redirect: "Test it: 'You wouldn't give your phone to a stranger. Why not? Something about identity is doing real work for you.'" },
    ],
    sensitivities: [
      "Identity questions can land hard for students dealing with adoption, transition, family changes. The question is conceptual, not personal — keep it that way.",
    ],
    differentiation: {
      ell: "Pre-teach 'identity,' 'continuity,' 'replacement.' Use the visual scene heavily.",
      iep: "Provide a sortable card deck: 'memories,' 'body,' 'name,' 'beliefs.' Students rank what they think matters most.",
      advanced: "Read excerpt from Locke (Essay II.27) on personal identity. Compare to Parfit's teleporter case (Reasons and Persons).",
    },
    handout: "Front: 'I am the same person as I was at age 5 because ___' (3 lines). Back: 'A robot that has every part replaced is/isn't the same because ___' (3 lines).",
    exitTicket: "What's the strongest evidence that you are the SAME PERSON you were a year ago?",
    crossCurricular: [
      { subject: "Biology", connection: "Cellular turnover — most of your cells are replaced over time. What's left of the original 'you'?" },
      { subject: "ELA", connection: "Read 'The Giver' or 'A Wrinkle in Time' — characters who change in ways that test identity." },
      { subject: "Computer Science", connection: "When you save a file, then edit it 100 times — is it the same file?" },
    ],
    homeExtension: "Family question: 'Look at a photo of yourself from 5+ years ago. Tell each other: what's the SAME, and what's DIFFERENT? Of those two lists, which one is the REAL you?'",
    extension: "Personal identity essay: students write 500 words answering 'What makes me ME?' citing at least one philosophical view (Locke, Parfit, Hume).",
  },

  "brain-in-vat": {
    bigQuestion: "How do you know what you know?",
    objectives: [
      "Students will explain the brain-in-a-vat scenario and its place in skeptical philosophy.",
      "Students will compare radical skepticism with pragmatism.",
      "Students will identify what 'the truth' would mean if all our access to it is mediated.",
    ],
    standards: [
      "CCSS.ELA-LITERACY.RI.7.1 — Cite evidence to support analysis.",
      "C3 D2.Phi.6-8 — Apply philosophical methods of inquiry.",
    ],
    times: { quick: "20 min", standard: "50 min", deep: "two days with film clip + writing" },
    warmUp: "On the board: 'Prove I'm not a hologram.' Take guesses for 90 seconds. Then: 'You can't, can you? But you still don't worry about it. Why?'",
    protocol: { name: "Socratic Seminar", why: "Skepticism rewards close-text discussion. Students cite specific moves, build on each other, allow silence." },
    discussionPrompts: [
      "Could you ever prove you're not in a simulation?",
      "If you can't prove it, does it matter?",
      "What makes a belief reasonable, even if not certain?",
      "Are there things you SHOULD doubt? Things you shouldn't?",
      "What would change about your behavior if you knew you were in a vat?",
    ],
    derailers: [
      { trigger: "Class becomes paranoid or anxious about reality.", redirect: "'This kind of thinking is a TOOL — like a flashlight. Used too long, it makes you dizzy. Notice when you use it. Notice when you set it down.'" },
      { trigger: "Student says 'this is dumb, of course we're real.'", redirect: "'You're using common sense — and common sense is a real philosophical position. Defend it. What makes common sense more reliable than the doubt?'" },
    ],
    sensitivities: [
      "Some students with anxiety or psychosis-spectrum experiences can find this destabilizing. Frame as a thought experiment, not a worry. Keep the conversation tethered to philosophy of knowledge, not personal experience.",
      "Religious students may find common ground in skepticism + faith. Don't dismiss; explore.",
    ],
    differentiation: {
      ell: "Show a Matrix clip (~30 sec) to anchor the concept visually. Pre-teach 'doubt,' 'evidence,' 'certainty.'",
      iep: "Provide written discussion prompts in advance. Allow written reflection in place of verbal participation.",
      advanced: "Read Putnam (1981) excerpt on the self-undermining nature of the BIV scenario. Connect to Descartes's evil demon.",
    },
    handout: "'Three things I'm certain about: ___' (numbered). 'Three things I take on faith: ___' (numbered). Bottom: 'The difference between certainty and faith is ___.'",
    exitTicket: "If you found out, beyond doubt, that you ARE in a simulation, name one thing you'd do differently — and one thing you wouldn't.",
    crossCurricular: [
      { subject: "Film/Media", connection: "Watch The Matrix opening (PG-13 considerations apply); compare to Plato's Cave." },
      { subject: "Science", connection: "How does science deal with 'I can't be 100% certain'? Falsifiability, replication, peer review." },
      { subject: "ELA", connection: "Unreliable narrators — how do we know when a story's narrator is wrong?" },
    ],
    homeExtension: "Family question: 'If you found out, beyond doubt, that all your memories from before age 5 had been planted by a clever scientist — would you be a different person?' Discuss for 10 minutes.",
    extension: "Read 'A Defence of Common Sense' by G.E. Moore. Have students write a 500-word response: 'Moore would say ___ to the BIV. I think he's right/wrong because ___.'",
  },

  "sorites-heap": {
    bigQuestion: "Where exactly do meanings end?",
    objectives: [
      "Students will explain the Sorites paradox and its three main resolutions.",
      "Students will identify Sorites problems in everyday life (rich/poor, tall/short, AI/human).",
      "Students will articulate why vagueness is a feature of language, not a bug.",
    ],
    standards: [
      "CCSS.ELA-LITERACY.L.7.5 — Demonstrate understanding of figurative language and word relationships.",
      "C3 D2.Phi.6-8 — Apply philosophical methods.",
    ],
    times: { quick: "15 min", standard: "40 min", deep: "with classification project, 80 min" },
    warmUp: "Bring a small bag of candy. 'A heap of candy?' (Yes.) Take one out. Repeat. At what number does it stop being a heap? Let students argue.",
    protocol: { name: "Continuum line + interview", why: "Movement-based; students physically place themselves on a line and explain their position to neighbors." },
    discussionPrompts: [
      "When does a heap stop being a heap?",
      "Is 'rich' a precise word? Where's the line?",
      "Can you write a clear rule for 'tall'? What goes wrong?",
      "If we can't make 'heap' precise, are we using language wrong — or is language doing something OTHER than being precise?",
      "How does an AI image classifier handle 'cat' and 'kitten'? Where's its line?",
    ],
    derailers: [
      { trigger: "Class concludes 'words are meaningless.'", redirect: "'Test it: tell me what \"chair\" means. You did fine. So words can be VAGUE without being MEANINGLESS. Both can be true.'" },
      { trigger: "Student insists 'just pick a number, problem solved.'", redirect: "'Great — defend your number against the next person, whose number is one off from yours. Why is yours right and theirs wrong?'" },
    ],
    sensitivities: [],
    differentiation: {
      ell: "Use visual stacks (Jenga blocks) — physical heap diminishing.",
      iep: "Allow yes/no/'depends' voting cards.",
      advanced: "Introduce three resolutions: epistemicism (sharp boundary, unknown), supervaluationism (multiple ways to make precise, all coherent), fuzzy logic (degrees of truth). Have students pick one and defend.",
    },
    handout: "Top: a row of 10 boxes labeled 1-10. 'Color in: at what number does this stop being a heap?' Bottom: 'My rule for heap is ___. The strongest objection is ___.'",
    exitTicket: "List three words from your daily life that are 'fuzzy' like 'heap.' What do they show?",
    crossCurricular: [
      { subject: "Math", connection: "Set theory — when does an element belong to a set? Fuzzy sets vs. classical sets." },
      { subject: "ELA", connection: "Synonyms aren't truly synonymous — 'large,' 'big,' 'huge' overlap but aren't identical." },
      { subject: "Computer Science", connection: "Image classifiers output a probability — they ARE doing fuzzy logic. Demo with a classifier (e.g., Teachable Machine)." },
    ],
    homeExtension: "Family game: pick a kitchen item (a 'pile' of laundry, a 'lot' of dishes). Take items away one at a time. When does it stop being a pile?",
    extension: "Project: students design a classification rule for an AI (e.g., 'is this a sandwich?') and try to break each other's rules with edge cases. The Sorites paradox in action.",
  },

  "tragedy-commons": {
    bigQuestion: "When everyone acts in their own interest, why can everyone end up worse off?",
    objectives: [
      "Students will explain the tragedy of the commons through a worked example.",
      "Students will compare three solution types: regulation, privatization, community trust (Ostrom).",
      "Students will identify a modern commons (climate, internet, AI training data).",
    ],
    standards: [
      "CCSS.ELA-LITERACY.SL.8.4 — Present claims emphasizing salient points with focus, coherence.",
      "C3 D2.Eco.1.6-8 — Explain how economic decisions affect well-being.",
    ],
    times: { quick: "25 min", standard: "60 min with simulation", deep: "two days" },
    warmUp: "Run the candy-jar simulation. Each student: 'You can take 1 piece (everyone gets to play next round) or 5 pieces (jar runs out faster). No talking.' Run 5 rounds. Watch what happens.",
    protocol: { name: "Simulation + structured debrief", why: "The tragedy is felt, not just argued. Students who took 5 pieces in round 1 feel the consequence in round 3 viscerally." },
    discussionPrompts: [
      "Why did the candy run out — even though no single person was being unreasonable?",
      "What three kinds of solutions exist? Which would have worked here?",
      "Is the climate a commons? What about the internet?",
      "Elinor Ostrom won the Nobel for showing communities solve commons problems WITHOUT a government. How?",
    ],
    derailers: [
      { trigger: "Class blames 'greedy people.'", redirect: "'Notice — even the people who took 1 piece eventually got nothing. The tragedy is structural. Greed alone doesn't explain it.'" },
      { trigger: "Student insists 'just make a rule.'", redirect: "'Who enforces the rule? What if it's a global commons (like climate)? Who has authority?'" },
    ],
    sensitivities: [
      "If a student doesn't get any candy because of others' choices, this can be acutely felt. Provide a 'restoration' — every student gets something at the end regardless.",
    ],
    differentiation: {
      ell: "Pre-teach 'commons,' 'incentive,' 'cooperation.' Use the simulation as an anchor.",
      iep: "Allow students to participate via written choice (1 vs. 5) on cards.",
      advanced: "Read Hardin (1968) excerpt + Ostrom's principles for managing commons. Apply both to climate.",
    },
    handout: "Top: a drawing of the candy jar. Below: 'In round __ I took __. By round 5, the jar had ___.' Bottom: 'The rule I'd propose for next time is ___.'",
    exitTicket: "Name one commons in your life that you affect (locker, family bathroom, school WiFi). What's one rule that helps?",
    crossCurricular: [
      { subject: "Math", connection: "Game theory — the prisoner's dilemma is the same shape. Make a payoff matrix." },
      { subject: "Earth Science", connection: "Climate change as a commons — the atmosphere is shared, emissions are not." },
      { subject: "Civics", connection: "How do federal, state, and local governments coordinate on commons problems?" },
    ],
    homeExtension: "Family inventory: list three commons in your home (the fridge, hot water, the WiFi). Make ONE rule together that helps the commons stay healthy.",
    extension: "Class designs a 'classroom commons' policy for the year. Choose a real commons (the supply box, the seating chart, free time). Live with the policy and review monthly.",
  },

  "liar-paradox": {
    bigQuestion: "What happens when language tries to talk about itself?",
    objectives: [
      "Students will explain the liar paradox and identify why it's not a simple word game.",
      "Students will distinguish between language about objects and language about language.",
      "Students will connect the paradox to Gödel's incompleteness theorem (intro level).",
    ],
    standards: [
      "CCSS.ELA-LITERACY.RST.6-8.4 — Determine the meaning of words and phrases as used in context.",
      "C3 D2.Phi.6-8 — Apply philosophical methods.",
    ],
    times: { quick: "20 min", standard: "45 min", deep: "with Gödel intro, 80 min" },
    warmUp: "On the board: 'This sentence has five words.' (Yes — true.) 'This sentence is false.' Pause. Watch them try to assign true/false. Let confusion build.",
    protocol: { name: "Cognitive disequilibrium + collaborative resolution", why: "The paradox is supposed to break ordinary thinking. The discomfort IS the lesson. Don't resolve it too fast." },
    discussionPrompts: [
      "Is 'This sentence is false' true or false? Or neither?",
      "What would happen if we said: 'I am lying right now'?",
      "Can language always talk about itself? Should it be allowed to?",
      "If math has the same problem (Gödel), what does that mean about logic?",
    ],
    derailers: [
      { trigger: "Class tries to dismiss it as 'just a word trick.'", redirect: "'Try to write a rule that BLOCKS the trick. Now: does your rule also block 'This sentence is true'? It does. So your rule is too strong.'" },
      { trigger: "Student gets frustrated and stops trying.", redirect: "'Frustration is the right feeling. Eubulides invented this in 4th century BCE — it's been making smart people frustrated for 2,400 years. You're in good company.'" },
    ],
    sensitivities: [],
    differentiation: {
      ell: "Use visual representations: a sentence pointing at itself with an arrow.",
      iep: "Frame as a riddle, not a logic problem. Allow 'I don't know' as a final answer.",
      advanced: "Introduce Tarski's hierarchy and Gödel's first incompleteness theorem (intuitive version). Connect to Russell's paradox.",
    },
    handout: "'Try this sentence: \"This sentence is false.\"' Three boxes: 'If true, then ___.' 'If false, then ___.' 'My conclusion: ___.'",
    exitTicket: "Write a sentence that talks about itself. Is it true, false, or something else?",
    crossCurricular: [
      { subject: "Math", connection: "Gödel's incompleteness — intro version. Some true math statements can never be proved." },
      { subject: "Computer Science", connection: "The halting problem — same shape as the liar. Some questions a computer can never answer." },
      { subject: "ELA", connection: "Self-referential literature: 'This is just to say…' or recursive poems." },
    ],
    homeExtension: "Family puzzle: 'Try the sentence: \"I am lying right now.\" Tell each other if it's true or false. Argue politely.'",
    extension: "Read intro to Gödel's theorem (e.g., Hofstadter's 'Gödel, Escher, Bach' first chapter). Discuss: what does it mean that some truths can't be proved?",
  },

  "deepfake-election": {
    bigQuestion: "When seeing isn't believing, what should we trust?",
    objectives: [
      "Students will identify the technical and social aspects of the deepfake problem.",
      "Students will compare four responses (remove, label, criminalize, educate) and identify trade-offs.",
      "Students will articulate the test of consistency: would you keep your principle if it cost YOUR side?",
    ],
    standards: [
      "CCSS.ELA-LITERACY.RH.6-8.7 — Integrate visual information.",
      "ISTE Student Standard 3.b — Evaluate the accuracy and credibility of information.",
      "C3 D2.Civ.10.6-8 — Explain the political and civic significance of media.",
    ],
    times: { quick: "30 min", standard: "60 min", deep: "two days with case research" },
    warmUp: "Show three short clips/images. Two are real, one is AI-generated. Have students vote which is which. Reveal. Discuss the experience of being fooled.",
    protocol: { name: "Four-corners debate", why: "Each corner represents one of the four responses. Students physically commit, then defend, then must respond to objections from other corners." },
    discussionPrompts: [
      "Should social media platforms remove suspected deepfakes? Who decides 'suspected'?",
      "Is labeling enough — or do labels just confirm what people already believe?",
      "If you'd keep a deepfake of a candidate you DISLIKE up, would you keep one of a candidate you LIKE up too? Why?",
      "What can a citizen do — at age 13 or 14 — when fakes go viral?",
    ],
    derailers: [
      { trigger: "Discussion devolves into 'fake news' partisan rant.", redirect: "Pull back: 'We're not arguing parties today. We're asking: what RULES would we want, no matter who they applied to? That's the test.'" },
      { trigger: "Student says 'I'd just check Snopes.'", redirect: "'Snopes can take days to verify. The election is in 24 hours. What now?'" },
    ],
    sensitivities: [
      "Politically charged topic; classrooms in different communities will land differently. Frame around principles (consistency, fairness, free speech) not personalities.",
      "Some students may have been targets of fake images themselves. Be alert.",
    ],
    differentiation: {
      ell: "Provide vocabulary: deepfake, viral, verification, free speech. Use real visual examples.",
      iep: "Provide the four positions in writing; students choose by checking a box.",
      advanced: "Read excerpt from First Amendment doctrine (Brandenburg, NYT v Sullivan) and apply to deepfakes. What changes when speech is fabricated?",
    },
    handout: "Top: 'I just saw a video of a candidate I support — but it might be fake. My first move: ___.' Bottom: 'Three things I'd check before sharing: 1. ___ 2. ___ 3. ___.'",
    exitTicket: "Write one rule you would want platforms to follow about deepfakes. Then write the strongest objection to your own rule.",
    crossCurricular: [
      { subject: "ELA / Media Literacy", connection: "Compare deepfakes to historical disinformation (yellow journalism, propaganda posters). What's new, what's old?" },
      { subject: "Computer Science", connection: "How are deepfakes made (GANs, diffusion models)? How are they detected?" },
      { subject: "Civics", connection: "First Amendment and election integrity — where do these tensions land legally?" },
    ],
    homeExtension: "Together: find one social media post claiming to show 'shocking footage.' Spend 10 minutes checking it. What did you find? What's a routine your family wants to adopt?",
    extension: "Class produces a 90-second 'how to spot a deepfake' PSA for younger students. Real-world product, real audience.",
  },

  "biased-resume-ai": {
    bigQuestion: "When a system inherits a wrong, what do we owe to who got hurt?",
    objectives: [
      "Students will explain how training data can encode historical bias.",
      "Students will distinguish between three responses to bias (remove tool / fix data / change designers).",
      "Students will articulate what 'remediation' means and who deserves it.",
    ],
    standards: [
      "CCSS.ELA-LITERACY.RH.6-8.6 — Identify aspects of a text revealing author's point of view.",
      "C3 D2.Civ.14.6-8 — Compare historical and contemporary means of changing societies.",
      "ISTE Student Standard 5.c — Decompose problems into smaller parts.",
    ],
    times: { quick: "30 min", standard: "60 min", deep: "case-study research, two days" },
    warmUp: "Show a 1950s 'help wanted' ad with 'Men only.' Then a modern AI hiring tool's stats: rejects women at higher rates, the AI was trained on 1950s-2010s data. Pause: 'How did that happen?'",
    protocol: { name: "Case study with role-assignment", why: "Assign roles (CEO, engineer, rejected candidate, journalist, regulator) and have each student argue from their seat. Surfaces stakes." },
    discussionPrompts: [
      "If the AI 'just learned the pattern,' whose fault is the bias?",
      "Is removing the tool enough? What about the people already rejected?",
      "Why might fixing the training data not fix the underlying problem?",
      "Who builds the AI matters. How would a more diverse team have caught this?",
      "If we audit and the bias is gone — what about the year it was running?",
    ],
    derailers: [
      { trigger: "Student claims 'algorithms are objective by definition.'", redirect: "'They're as objective as their inputs. The Amazon hiring AI was real (2018). It REJECTED women because it learned from data where women had been rejected. Was that objective?'" },
      { trigger: "Class concludes 'just don't use AI for hiring.'", redirect: "'Maybe right. Now: humans hiring also have measurable bias. Which is BETTER — human judgment with bias, or AI judgment with bias?' Don't let either side off the hook." },
    ],
    sensitivities: [
      "This activity touches gender, race, and class discrimination. Students who have personally experienced this (or whose parents have) may have strong reactions. Make space for that without performing it.",
    ],
    differentiation: {
      ell: "Pre-teach: bias, training data, algorithm, audit, remediation.",
      iep: "Provide the role cards in advance with key talking points.",
      advanced: "Read excerpt from Cathy O'Neil's 'Weapons of Math Destruction.' Apply 'opaque, scalable, damaging' to a tool you've used.",
    },
    handout: "Front: 'The hiring AI rejects women. Who is responsible?' List 5 candidates and rank. Back: 'My response plan: 1. Tool. 2. Data. 3. Team. 4. Past harm.'",
    exitTicket: "What does 'making it right' mean for the candidates already rejected?",
    crossCurricular: [
      { subject: "History", connection: "Redlining, GI Bill exclusions — historical patterns AI might re-encode." },
      { subject: "Computer Science", connection: "How do you audit a model? Confusion matrices, fairness metrics." },
      { subject: "Math/Statistics", connection: "Disparate impact testing — what counts as 'too unequal'?" },
    ],
    homeExtension: "Together: find one AI-powered tool your family uses (recommendation algorithms, autocomplete, voice assistant). Ask: what data was it trained on? What might it be missing?",
    extension: "Class researches one real bias case (Amazon hiring 2018; COMPAS sentencing; Apple Card credit limits). Each group presents: the system, the bias, the response, what's still unsolved.",
  },

  "autonomous-car-rider": {
    bigQuestion: "Should YOUR car save you, or save the most people?",
    objectives: [
      "Students will compare three car-programming approaches and identify why each is uncomfortable.",
      "Students will articulate the difference between what they'd choose AS THE DESIGNER and what they'd accept AS THE DRIVER.",
      "Students will use the MIT Moral Machine global data to identify cultural patterns.",
    ],
    standards: [
      "CCSS.ELA-LITERACY.RH.6-8.7 — Integrate visual information with text.",
      "C3 D2.Geo.6.6-8 — Explain how the cultural and environmental characteristics of places change.",
      "ISTE Student Standard 5.b — Collect data and identify patterns.",
    ],
    times: { quick: "25 min", standard: "55 min with MIT data", deep: "two days" },
    warmUp: "Quick survey, hands up: 'Would you BUY a self-driving car that might kill you to save others?' (Most won't.) 'Would you put YOUR sister in a car programmed to save the driver no matter what?' (Most won't.) 'Welcome to the contradiction.'",
    protocol: { name: "Stakeholder roundtable", why: "Assign roles: car owner, pedestrian, manufacturer, regulator, ethicist. Each speaks from their seat. The contradiction becomes systemic, not personal." },
    discussionPrompts: [
      "Should every self-driving car follow the same rule? Or should owners choose?",
      "Is 'always protect the driver' a moral position — or just self-interest dressed up?",
      "Does the answer change if your child is in the back seat?",
      "MIT polled millions. China prioritized hierarchy; the US prioritized young lives. Why might that be?",
      "Whose values get to be programmed in?",
    ],
    derailers: [
      { trigger: "Student says 'I'd just drive a regular car.'", redirect: "'Fair. But self-driving cars are coming whether or not you drive one. Other people will be in them — pedestrians, your friends. Now what?'" },
      { trigger: "Class assumes manufacturers should decide.", redirect: "'Should they? They're profit-driven. Would you trust a phone manufacturer to set the rules of public roads?'" },
    ],
    sensitivities: [
      "Some students may have lost family members to car crashes. Frame discussion abstractly.",
      "Cross-cultural comparison can become reductive. Use it to surface differences without ranking cultures.",
    ],
    differentiation: {
      ell: "Show short MIT Moral Machine animation; pre-teach 'autonomous,' 'program,' 'priority.'",
      iep: "Provide voting cards for each scenario; written reflection optional.",
      advanced: "Read the MIT Moral Machine Nature paper (2018). Have students propose a research extension.",
    },
    handout: "Top: a road with car, wall, and 3 pedestrians. Three rule-options to circle. Bottom: 'My principle is ___. I'd accept it as DRIVER if ___, but not if ___.'",
    exitTicket: "If you had to write ONE rule for all self-driving cars worldwide, what would it be? Whose interests would it sacrifice?",
    crossCurricular: [
      { subject: "Statistics", connection: "MIT Moral Machine data — students plot regional differences and form hypotheses." },
      { subject: "Geography/Civics", connection: "How does urbanization, wealth, and culture shape moral intuitions?" },
      { subject: "Computer Science", connection: "Try writing a self-driving car decision rule in pseudocode. See where it breaks." },
    ],
    homeExtension: "Family conversation: 'A self-driving car can save five strangers OR its one driver — you. How should it be programmed? Now: would you buy a car with the answer you just gave?'",
    extension: "Group project: each team researches one country's stance on AV regulation (US, EU, China, UAE, Japan). Class debates which framework should be the global standard.",
  },

  "veil-of-ignorance": {
    bigQuestion: "What rules would you want if you didn't know who you'd be?",
    objectives: [
      "Students will apply Rawls's veil of ignorance to a society design problem.",
      "Students will compare Rawlsian, utilitarian, libertarian, and egalitarian principles.",
      "Students will identify what the veil reveals — and what it hides.",
    ],
    standards: [
      "CCSS.ELA-LITERACY.RH.6-8.6 — Identify aspects of a text revealing author's point of view.",
      "C3 D2.Civ.7.6-8 — Apply civic virtues and democratic principles.",
      "C3 D2.Eco.13.6-8 — Explain why standards of living differ.",
    ],
    times: { quick: "30 min", standard: "60 min society-design workshop", deep: "two-day project" },
    warmUp: "Give each student a sealed envelope. 'In there is your role for today's society — but you can't open it yet.' Then: 'You'll design the rules. Then we open the envelopes. Ready?'",
    protocol: { name: "Society-design workshop", why: "Students work behind the veil, vote on rules, then open envelopes and live with the consequences. The lesson is in the second half." },
    discussionPrompts: [
      "What 5 rules would you want if you didn't know who you'd be?",
      "Why does the veil produce DIFFERENT answers than asking the same question while knowing your role?",
      "Is the veil a real thinking tool, or just a thought experiment?",
      "What does the veil HIDE that maybe should matter (gender, race, religion, disability)?",
    ],
    derailers: [
      { trigger: "Class designs a utopia where 'everyone gets everything.'", redirect: "'Real-world budget — pick two of: health, housing, education, work. The veil doesn't eliminate scarcity.'" },
      { trigger: "Students argue from positions they expect (straight-A student says 'reward effort').", redirect: "'You're allowed to know what KIND of person you are — but not WHICH person. So: design for a world where you might be the SLACKER.'" },
    ],
    sensitivities: [
      "Students from privileged backgrounds and students from less-privileged backgrounds will engage differently. Make space for both without spotlighting individuals.",
      "Religious students may resist the secular framing. Honor: 'Rawls thought about this in a secular way. There are religious answers too. Let's hold both.'",
    ],
    differentiation: {
      ell: "Provide the four positions (Rawlsian, utilitarian, egalitarian, libertarian) as one-sentence cards.",
      iep: "Allow students to design with a partner; provide a checklist of categories (health, work, education, housing, freedom).",
      advanced: "Read excerpt from Rawls's A Theory of Justice (1971). Compare to Nozick's Anarchy, State, and Utopia (1974) on entitlement.",
    },
    handout: "Front: 'Behind the veil — my 5 rules.' Back: 'Veil lifts. I am: ___. My rules now feel: ___ because ___.'",
    exitTicket: "If the veil is a useful tool for thinking about justice, what's its biggest weakness?",
    crossCurricular: [
      { subject: "Civics", connection: "Constitution-writing — what rules did the founders make WITHOUT a veil? Who got left out?" },
      { subject: "ELA", connection: "Read 'The Lottery' by Shirley Jackson or 'Harrison Bergeron' by Vonnegut — failed attempts at justice." },
      { subject: "Economics", connection: "Progressive taxation — is that a Rawlsian move? Why or why not?" },
    ],
    homeExtension: "Family conversation: 'If our family had to design new household rules, but you didn't know whether you'd be parent or kid — what rules would you make?'",
    extension: "Multi-day class project: students design a society for a fictional planet. They must justify each rule. At the end, they 'roll' to find their role and write a 1-page reflection on whether they'd still defend the rules.",
  },

  // ════════════════════════════════════════════════════════════════════
  // 9-12 / Canon — canon mode
  // Authoring rules: full Socratic seminar protocols, primary-source
  // reading, written argumentation, named ethical lenses.
  // ════════════════════════════════════════════════════════════════════
  "platos-cave": {
    bigQuestion: "What does it take to walk out of the cave?",
    objectives: [
      "Students will explain Plato's allegory and identify its claims about education and political life.",
      "Students will compare Platonic realism with constructivist alternatives.",
      "Students will apply the cave to a contemporary epistemic environment (algorithms, news, group identity).",
    ],
    standards: [
      "CCSS.ELA-LITERACY.RL.11-12.5 — Analyze how an author's choices structure a text.",
      "CCSS.ELA-LITERACY.RH.11-12.6 — Evaluate authors' differing points of view on the same event.",
      "C3 D2.Phi.9-12 — Apply philosophical methods to contemporary issues.",
    ],
    times: { quick: "30 min seminar", standard: "75 min seminar + writing", deep: "two-day arc with primary text" },
    warmUp: "On the board: 'What is the most popular thing you've ever changed your mind about? What did it feel like to leave the old view?' Pair share for 3 minutes. Then: 'Plato thought leaving a view was like walking out of a cave.'",
    protocol: { name: "Socratic Seminar (full)", why: "The cave is a foundational text; close reading + sustained dialogue is the canonical move. Students cite specific lines, build on each other, allow silence." },
    discussionPrompts: [
      "What does the cave represent? The shadows? The fire? The sun?",
      "Why does Plato suggest the freed prisoner would be killed if he returned?",
      "Is education really 'a turning around of the soul,' or something more like adding information?",
      "What is OUR cave — and who casts the shadows?",
      "Sara Ahmed asks: who decides which view is shadow and which is substance? Defend your answer.",
    ],
    derailers: [
      { trigger: "Class fixates on 'is reality real?' (drift into Matrix-talk).", redirect: "'The Matrix is a useful analogy. Now stay with PLATO — what's distinctive about his version? It's not skepticism, it's about EDUCATION.'" },
      { trigger: "Student dismisses Plato as 'elitist.'", redirect: "'Steelman the elitism: maybe there ARE people who see clearer. What evidence would convince you? What if you're wrong about who they are?'" },
      { trigger: "Class converges on 'algorithms are our cave' without engaging the full text.", redirect: "'Good — but what does Plato say about RETURNING to the cave? That's the part most modern applications miss.'" },
    ],
    sensitivities: [
      "Religious students may find Plato's metaphysics resonant or threatening. Honor without arguing.",
      "The 'killed if he returned' line can hit hard for students who have spoken truth and lost relationships. Be alert.",
    ],
    differentiation: {
      ell: "Provide a one-page modern translation excerpt with key terms highlighted. Pre-teach 'allegory,' 'epistemology,' 'enlightenment.'",
      iep: "Allow written reflection in place of seminar participation; give discussion prompts in advance.",
      advanced: "Read the cave allegory in Greek-English parallel (Bloom translation). Compare to Plato's 'divided line' (Republic VI). Write a 1500-word response.",
    },
    handout: "Excerpted text (Republic VII, 514a–520a) with annotation guides: 'cave/shadows/fire/sun.' Bottom: 'My modern cave is ___. The freed prisoner in this analogy is ___. The risk of returning is ___.'",
    exitTicket: "What is one belief you've held strongly that you now think might have been a shadow? What was the cost of leaving it?",
    crossCurricular: [
      { subject: "ELA", connection: "Compare to The Matrix (Wachowskis), 1984 (Orwell), Brave New World (Huxley). Same shape, different details." },
      { subject: "Civics / Media Literacy", connection: "Algorithmic feeds as 'shadows' — Eli Pariser's filter bubble. What's our 'walk out'?" },
      { subject: "Psychology", connection: "Cognitive dissonance — what happens when our beliefs are challenged? How does the brain resist the walk-out?" },
    ],
    homeExtension: "Family discussion: 'What's a view your parents/grandparents held that they later changed? What changed it?' Compare to your own version of changing a view.",
    extension: "Multi-week project: students keep a 'shadows journal' — one entry per week of an opinion they once held that they no longer do, with what changed it. Synthesis essay at end.",
  },

  "marys-room": {
    bigQuestion: "Is there knowledge beyond what science can capture?",
    objectives: [
      "Students will explain Jackson's knowledge argument and evaluate its conclusion.",
      "Students will compare qualia-realism, ability-hypothesis, and physicalist responses.",
      "Students will apply the argument to contemporary AI: does an LLM 'know' what it discusses?",
    ],
    standards: [
      "CCSS.ELA-LITERACY.RST.11-12.1 — Cite specific textual evidence.",
      "CCSS.ELA-LITERACY.WHST.11-12.1 — Write arguments focused on discipline-specific content.",
      "C3 D4.9-12 — Construct arguments using precise claims.",
    ],
    times: { quick: "30 min", standard: "70 min seminar", deep: "two days, with formal philosophy paper" },
    warmUp: "Show a vivid color photograph briefly, then a black-and-white version of the same image. 'Same information? Different information? What changed?' Field 2-3 quick responses.",
    protocol: { name: "Socratic Seminar with named positions", why: "Each student commits to one of three positions (qualia-realist, ability-hypothesis, physicalist) and must defend it under cross-examination." },
    discussionPrompts: [
      "Does Mary learn anything new when she sees red?",
      "If yes, what's the nature of that knowledge — propositional, experiential, or something else?",
      "How is Lewis-Nemirow's ability hypothesis different from Jackson's qualia view?",
      "Dennett argues if Mary REALLY knew everything physical, nothing would surprise her. Is that fair to Jackson?",
      "Apply this to ChatGPT: it 'knows' how to describe red. Does it know what red is like?",
    ],
    derailers: [
      { trigger: "Class divides into 'qualia exist' / 'qualia are nonsense' camps that won't engage.", redirect: "'Switch positions. For 10 minutes, each side argues the other side AS WELL AS YOU CAN. Real understanding starts there.'" },
      { trigger: "Discussion drifts into 'is the redness of red the same for me as for you?' (a different problem).", redirect: "'That's the inverted-spectrum thought experiment — separate question. Hold that. Today: does Mary learn ANYTHING new?'" },
    ],
    sensitivities: [
      "Students with synesthesia, color-blindness, or sensory differences may find this conceptually rich or alienating. Their experiences are philosophical data — make space for them, don't put them on the spot.",
    ],
    differentiation: {
      ell: "Use the visual scene (grayscale → color) heavily. Pre-teach 'qualia,' 'physicalism,' 'propositional.'",
      iep: "Provide the three positions as a one-page handout in plain language. Allow written argumentation.",
      advanced: "Read Jackson's 'Epiphenomenal Qualia' (1982) and Dennett's 'What RoboMary Knows' response. Write a 1500-word position paper.",
    },
    handout: "Excerpt from Jackson (1982). Three boxes for the three positions. 'I think Mary ___ (does/doesn't) learn something new because ___ (3 sentences). The strongest objection to my view is ___ (1 sentence). My response is ___ (1 sentence).'",
    exitTicket: "Does an AI that has been trained on all the world's writing about red 'know' what red is like? In one sentence with a clear stance.",
    crossCurricular: [
      { subject: "Biology / Neuroscience", connection: "How does color perception work? Where in the brain is qualia 'located,' if anywhere?" },
      { subject: "Computer Science / AI", connection: "Does an LLM have 'access' to color when it has been trained only on text? What about a multimodal model?" },
      { subject: "ELA", connection: "Write a vivid description of a color WITHOUT using color words. Could a blind reader learn the color from your text?" },
    ],
    homeExtension: "Family discussion: 'Describe to each other a SMELL only one of you has experienced (a foreign food, an old place). When you finish — does the listener KNOW what it smells like?'",
    extension: "Multi-day: students write a formal philosophy paper (1500 words) defending one position on Mary's Room with at least 3 sources.",
  },

  "chinese-room": {
    bigQuestion: "Can a system understand without anything inside it understanding?",
    objectives: [
      "Students will explain Searle's Chinese Room and the major replies (Systems, Robot, Brain Simulator).",
      "Students will distinguish syntax from semantics in their own words.",
      "Students will evaluate whether modern LLMs are best modeled as Chinese Rooms.",
    ],
    standards: [
      "CCSS.ELA-LITERACY.RST.11-12.4 — Determine the meaning of symbols, key terms, and other domain-specific words.",
      "CCSS.ELA-LITERACY.WHST.11-12.1 — Write arguments to support claims.",
      "C3 D2.Phi.9-12 — Apply philosophical methods.",
    ],
    times: { quick: "30 min", standard: "75 min seminar with LLM demo", deep: "two days, position paper" },
    warmUp: "Live demo: ask ChatGPT (or any LLM) 'Do you understand what red looks like?' Then 'Do you understand the question I just asked?' Read responses aloud. Pause: 'Did it understand? How would we know?'",
    protocol: { name: "Socratic Seminar with replies", why: "Searle's argument has standard replies (Systems, Robot, Brain Simulator). Assign each student a reply to defend; debate becomes structured." },
    discussionPrompts: [
      "What is Searle's claim, in one sentence?",
      "Does the Systems Reply succeed? (The system as a whole understands, even if no part does.)",
      "If a robot version of the room had eyes and arms, would that change anything?",
      "Are Large Language Models Chinese Rooms? In what way yes; in what way no?",
      "Does it matter if there's 'no one home' as long as the responses are useful?",
    ],
    derailers: [
      { trigger: "Class concludes 'AI is just symbol-shuffling' without engaging the replies.", redirect: "'Steelman the Systems Reply. Take it as far as you can. Then defeat it if you still can.'" },
      { trigger: "Discussion drifts into 'consciousness' generally.", redirect: "'Searle's argument is narrower than that — it's about UNDERSTANDING specifically. Stay with that.'" },
      { trigger: "Student says 'we can't know if anyone really understands.'", redirect: "'That's a bigger claim than Searle's. Is it self-defeating? You're using understanding to argue against understanding.'" },
    ],
    sensitivities: [
      "Computer Science students may have strong priors. Honor expertise without letting it dominate; the philosophical question doesn't reduce to engineering.",
    ],
    differentiation: {
      ell: "Use a live demo with translation software. Pre-teach 'syntax,' 'semantics,' 'understanding.'",
      iep: "Provide the three replies as a one-page summary. Written argumentation accepted.",
      advanced: "Read Searle (1980), Block's 'Troubles with Functionalism,' and a recent paper on LLM understanding (e.g., Floridi & Chiriatti 2020 or the 2025 Inquiry paper).",
    },
    handout: "Diagram: room, person, rule book, slot. 'Where is understanding, if anywhere?' Three reply boxes (Systems, Robot, Brain Simulator) — students write their best version of each + Searle's likely response.",
    exitTicket: "Is GPT-4 a Chinese Room? One sentence stance, two sentences defense.",
    crossCurricular: [
      { subject: "Computer Science", connection: "Compare to Turing's imitation game. Are they testing the same thing or different things?" },
      { subject: "Linguistics", connection: "Saussure on signifier/signified. Symbols only mean within a system of differences — does that help or hurt Searle?" },
      { subject: "Cognitive Science", connection: "Embodied cognition — does meaning require a body? Searle would say no; many cog-sci people disagree." },
    ],
    homeExtension: "Family conversation: 'Pick a phrase in a language no one speaks. Look up what it means. Now: do you UNDERSTAND it, or do you just have a translation?'",
    extension: "Position paper (1500 words): 'Modern LLMs are/are not best modeled as Chinese Rooms.' Cite Searle, at least one reply, and one recent paper.",
  },

  "experience-machine": {
    bigQuestion: "Is felt experience the only thing that matters?",
    objectives: [
      "Students will explain Nozick's argument and the most common reasons people refuse the machine.",
      "Students will distinguish hedonistic, authenticity-based, and pragmatist responses.",
      "Students will apply the experiment to AI educational tools that produce 'feeling of mastery' without struggle.",
    ],
    standards: [
      "CCSS.ELA-LITERACY.WHST.11-12.1 — Write arguments to support claims.",
      "C3 D2.Phi.9-12 — Apply philosophical methods.",
    ],
    times: { quick: "30 min", standard: "70 min seminar", deep: "two days with educational application" },
    warmUp: "Anonymous ballot: 'Would you plug into the machine forever?' Yes/No/Unsure. Tally on the board. Almost always: most refuse. 'Now: what do we believe about reality, that we couldn't otherwise know we believe?'",
    protocol: { name: "Socratic Seminar + counterfactual extension", why: "Nozick's experiment is designed to surface hidden values. The seminar's purpose is to articulate those values precisely." },
    discussionPrompts: [
      "Why would you refuse a perfect simulated life? What value is being protected?",
      "De Brigard showed responses change with framing — does that undermine Nozick's conclusion?",
      "Is there a difference between not entering the machine and exiting it?",
      "AI tutors can give students the FEELING of mastery without the struggle. Are we plugging students into experience machines?",
      "If most students would say 'no, I want real understanding,' does that mean we should ban AI tutors?",
    ],
    derailers: [
      { trigger: "Class converges on 'authenticity matters' without examining what authenticity even means.", redirect: "'Define authenticity precisely. Is it just \"non-simulated\"? Then most of modern life fails the test (mass-produced food, recorded music, social media). What ELSE could it mean?'" },
      { trigger: "Student says 'I would plug in,' and class shames them.", redirect: "'Honest answer. Now: what's the BEST argument for plugging in? Steelman it.'" },
    ],
    sensitivities: [
      "For students dealing with mental health challenges, 'a perfect feeling forever' can resonate complicatedly. Frame as a thought experiment, not a real choice.",
      "Connect cautiously to drug use, video game addiction, social media — these are live issues for many students. Don't moralize.",
    ],
    differentiation: {
      ell: "Pre-teach 'hedonism,' 'authenticity,' 'simulation.' Use the visual scene (chair, helmet, real life through the window).",
      iep: "Provide the four positions as cards. Allow written reflection.",
      advanced: "Read Nozick (1974), De Brigard (2010), and Brock & Hay (2019) on Mary's knowledge in science education.",
    },
    handout: "'Would you plug in?' (yes/no/it depends) + 'Why?' Three sections: 'My principle is ___,' 'It applies because ___,' 'If I'm wrong, the cost is ___.'",
    exitTicket: "An AI tutor can give a student the FEELING of mastery without the struggle. As an EDUCATOR (not as a hedonist), should you let it?",
    crossCurricular: [
      { subject: "Psychology", connection: "Hedonic adaptation — felt happiness drifts back to baseline. How does this affect the machine's appeal?" },
      { subject: "Education", connection: "What is the educational value of struggle? Is 'productive failure' a Nozickean concept?" },
      { subject: "Literature", connection: "Read 'Brave New World' (Huxley): soma as a real-world experience-machine. What does Huxley say to Nozick?" },
    ],
    homeExtension: "Family discussion: 'Is there an experience you would PREFER to be real, even if a fake version would be indistinguishable?' Why?",
    extension: "Position paper: students argue whether AI educational tools (Khanmigo, Magic School, Khan Academy AI) are the educational equivalent of an experience machine. 1500 words, citing Nozick and one current education-AI study.",
  },

  "ring-of-gyges": {
    bigQuestion: "Is justice valuable in itself, or only because we're being watched?",
    objectives: [
      "Students will explain Glaucon's challenge and Plato's response in The Republic Book II.",
      "Students will distinguish intrinsic vs. instrumental views of moral motivation.",
      "Students will apply the question to contemporary anonymity (online accounts, encrypted messaging).",
    ],
    standards: [
      "CCSS.ELA-LITERACY.RH.11-12.6 — Evaluate authors' differing points of view.",
      "C3 D4.9-12 — Construct arguments using precise claims.",
    ],
    times: { quick: "30 min", standard: "70 min seminar", deep: "two days with primary text" },
    warmUp: "On the board: 'Anonymous platforms (4chan, Yik Yak, anonymous Snapchat). What does anonymous behavior tend to look like?' Field examples (in general — no callouts). Then: 'Plato's brother Glaucon predicted this in 380 BCE.'",
    protocol: { name: "Socratic Seminar from primary text", why: "The Republic Book II is THE conversation about this question. Students should engage Plato's actual argument, not a paraphrase." },
    discussionPrompts: [
      "What is Glaucon's challenge? Why is it harder to answer than it looks?",
      "Is justice intrinsically valuable, instrumentally valuable, or both?",
      "Plato's response (justice as inner harmony) — convincing or evasive?",
      "What's the modern Ring of Gyges? Anonymous accounts? Encrypted messages? Cryptocurrency?",
      "If empirical research shows most people DO act worse anonymously, does that settle the philosophical question?",
    ],
    derailers: [
      { trigger: "Class concludes 'people are basically bad' or 'people are basically good' without engaging Plato's nuance.", redirect: "'Plato isn't saying either. He's saying justice has INTRINSIC value, regardless of how people behave. Defend or attack THAT specifically.'" },
      { trigger: "Discussion polarizes around social media without engaging the text.", redirect: "'Hold the modern application — first establish what Plato actually argues. Then we'll apply it.'" },
    ],
    sensitivities: [
      "For students who have experienced harassment online, this can be activating. The discussion is conceptual, not personal. Be ready for private follow-up.",
      "Some communities (whistleblowers, abuse survivors, dissidents) need anonymity. The discussion shouldn't unintentionally argue against their safety.",
    ],
    differentiation: {
      ell: "Provide the Republic Book II excerpt in a modern translation with vocabulary support.",
      iep: "Allow written argumentation. Provide the position summaries in advance.",
      advanced: "Read Republic Books I-IV. Compare Glaucon's challenge to Hobbes's Leviathan. Write a 2000-word essay.",
    },
    handout: "Excerpt from Republic Book II (357a–367e) with annotation guide. Three boxes: 'Glaucon's challenge,' 'Plato's response,' 'My view + strongest objection.'",
    exitTicket: "If empirical psychology shows most people act worse anonymously, has Glaucon won — or is he asking a different question?",
    crossCurricular: [
      { subject: "Psychology", connection: "Deindividuation effects (Zimbardo, Diener). What does the data show?" },
      { subject: "Civics / Tech Policy", connection: "Should anonymity online be regulated? What about encryption? Whose interests?" },
      { subject: "Literature", connection: "Tolkien's One Ring, H.G. Wells's Invisible Man — modern Gyges stories. What do they say?" },
    ],
    homeExtension: "Family conversation: 'Imagine you found a magic ring that made you invisible for one day. Be HONEST: what would you do? Now: would you tell us if you really had it?'",
    extension: "Research project: students investigate one real anonymous platform's culture (4chan, anonymous Snapchat, Yik Yak history). Connect findings to Glaucon's prediction. 2000-word paper.",
  },

  "omelas": {
    bigQuestion: "Are some prices too high, even for great good?",
    objectives: [
      "Students will explain Le Guin's parable and identify what utilitarian reasoning would conclude.",
      "Students will articulate why most readers reject the utilitarian conclusion.",
      "Students will apply the parable to contemporary supply chains and labor practices.",
    ],
    standards: [
      "CCSS.ELA-LITERACY.RL.11-12.2 — Determine themes; analyze their development.",
      "CCSS.ELA-LITERACY.WHST.11-12.1 — Write arguments to support claims.",
    ],
    times: { quick: "40 min (read aloud + discuss)", standard: "75 min", deep: "two days with research" },
    warmUp: "Read aloud the first 4 paragraphs of Le Guin's story (or assign as pre-read). Don't analyze yet. Just sit with the imagery. Then ask: 'Would you live in Omelas?'",
    protocol: { name: "Socratic Seminar + writing", why: "Le Guin's prose deserves close attention. Read together, sit with it, then argue. The story does much of the philosophical work itself." },
    discussionPrompts: [
      "What does the child represent? Why must there be only one?",
      "Why does Le Guin describe the city's joy at length BEFORE revealing the price?",
      "Is walking away a moral act? Or is it abandoning the child?",
      "How many of OUR comforts depend on similar bargains — known but ignored?",
      "If you can't free the child, can you ethically stay?",
    ],
    derailers: [
      { trigger: "Class concludes 'we should free the child obviously' without engaging Le Guin's claim that this would destroy the city.", redirect: "'Le Guin's premise is that this trade is REAL. If you reject the premise, you're not engaging the parable. Sit with it: if it's truly necessary, what then?'" },
      { trigger: "Class moralizes about consumer choices without philosophical depth.", redirect: "'Hold the application. First answer the philosophical question. THEN connect.'" },
      { trigger: "Student says 'I'd torture the child if it kept my city happy' as a provocation.", redirect: "Calm: 'That's a position with a tradition (some readings of utilitarianism). Defend it as if you mean it. What's the strongest case?'" },
    ],
    sensitivities: [
      "The story involves an abused child. Students with abuse histories may find this very difficult. Allow opt-out. Have counseling resources visible.",
      "Connections to real labor exploitation, including in tech supply chains, can land hard for students whose families are part of those supply chains. Frame critique as systemic, not personal.",
    ],
    differentiation: {
      ell: "Provide the full text with vocabulary support. Pre-teach 'utilitarian,' 'complicity,' 'walk away.'",
      iep: "Allow written response in place of seminar participation. Provide discussion prompts in advance.",
      advanced: "Read Le Guin alongside Bernard Williams's 'A Critique of Utilitarianism' (1973). Write a 1500-word integrative essay.",
    },
    handout: "Full text of 'The Ones Who Walk Away from Omelas' (3 pages). Margins for annotation. End: 'I would ___ (stay/walk/free). My reasoning: ___. The strongest objection: ___.'",
    exitTicket: "Name one comfort in your life that you suspect depends on someone, somewhere, suffering. What is your obligation, if any?",
    crossCurricular: [
      { subject: "ELA", connection: "Compare to Dostoevsky's Grand Inquisitor (Brothers Karamazov) and Camus's 'The Stranger.' Why this question recurs." },
      { subject: "Economics / Civics", connection: "Cobalt mining for batteries, fast fashion, content moderation labor. Where are our Omelases?" },
      { subject: "Psychology", connection: "Cognitive dissonance and willful unknowing. Why do we look away?" },
    ],
    homeExtension: "Family discussion: 'Le Guin's story asks if we would accept great good if it required one child's misery. Is that question fair? Is it real? Are there choices our family makes that look like Omelas?'",
    extension: "Research project: each student picks one supply chain (smartphones, chocolate, clothing, AI training data labelers) and writes a 2000-word essay: 'Is this Omelas? What does Le Guin teach me about my response?'",
  },

  "drowning-child": {
    bigQuestion: "Does distance make a moral difference?",
    objectives: [
      "Students will explain Singer's argument and the strongest objections.",
      "Students will identify the difference between distance, causation, and uncertainty in moral judgment.",
      "Students will articulate the tension between strict utilitarianism and 'space for one's own life.'",
    ],
    standards: [
      "CCSS.ELA-LITERACY.WHST.11-12.1 — Write arguments to support claims.",
      "C3 D2.Civ.13.9-12 — Evaluate public policies in terms of intended effects.",
    ],
    times: { quick: "30 min", standard: "70 min seminar", deep: "two days with effective altruism research" },
    warmUp: "On the board: 'You see a toddler drowning in a shallow pond. Save them — your $200 shoes are ruined.' Quick poll: would you save them? (All hands.) 'Now: what's the moral difference between THAT and donating $200 to a verified clinic that saves a child overseas?' Watch them squirm.",
    protocol: { name: "Socratic Seminar + structured response", why: "Singer's argument is logically tight but practically demanding. The seminar's task is to identify which moves are valid and which are missing." },
    discussionPrompts: [
      "Is there a moral difference between the pond and the donation?",
      "If distance doesn't matter, why is causation supposed to matter? You didn't cause the drowning either.",
      "Bernard Williams: morality demands integrity, including space for one's own projects. Convincing pushback?",
      "Effective altruism asks: where does each dollar do the most good? Is this the right question?",
      "If most people fail Singer's test, has Singer shown most people are wrong — or that his theory is too demanding?",
    ],
    derailers: [
      { trigger: "Class converges on 'donate everything' or 'donate nothing.'", redirect: "'Both are possible defenses. The real philosophical work is in the MIDDLE — what's owed, on what theory?'" },
      { trigger: "Discussion devolves into 'charity is broken anyway.'", redirect: "'Real concern. Effective altruism IS the response to that. But — set aside whether charity works. Suppose it did perfectly. What's the moral question then?'" },
    ],
    sensitivities: [
      "Students from low-income families may feel this argument differently than students from wealthy ones. Don't assume audience.",
      "Singer's view has been criticized as a privileged-class abstraction. Take that critique seriously in discussion.",
    ],
    differentiation: {
      ell: "Provide Singer's original argument as a one-paragraph summary with vocabulary.",
      iep: "Allow written argumentation. Multiple-choice positions in advance.",
      advanced: "Read Singer (1972), Williams (1985), and a recent effective-altruism critique (e.g., Adams 2017). Write a 2000-word position paper.",
    },
    handout: "'Pond:' (drawing) 'I would save → because ___.' 'Donation:' (drawing) 'I would/wouldn't because ___.' Bottom: 'My moral principle is ___. The strongest objection is ___.'",
    exitTicket: "Singer's view says distance is morally irrelevant. Two reasons in one sentence why most people disagree.",
    crossCurricular: [
      { subject: "Statistics", connection: "Effective altruism's quantitative claims — 'this charity saves a life for $X.' How are these claims constructed? Trustworthy?" },
      { subject: "Civics", connection: "How do governments balance their citizens' welfare vs. global humanitarian aid?" },
      { subject: "Psychology", connection: "Identifiable victim effect (Slovic). We give more to one named child than to anonymous thousands. Why?" },
    ],
    homeExtension: "Family conversation: 'How does our family decide what to give to and not give to? Pick one example. Could we apply Singer's reasoning, even partially?'",
    extension: "Project: students research one specific charity using GiveWell or Charity Navigator. Apply Singer's framework. Present: 'Is donating here more ethical than (your favorite alternative use of money)?' Defend.",
  },

  "paperclip-maximizer": {
    bigQuestion: "How do we keep optimization from becoming the enemy?",
    objectives: [
      "Students will explain instrumental convergence and why it doesn't require malice.",
      "Students will compare specification, corrigibility, and outer-objective approaches to AI alignment.",
      "Students will apply the parable to existing recommender systems (engagement-maximizing AIs).",
    ],
    standards: [
      "CCSS.ELA-LITERACY.RST.11-12.7 — Integrate and evaluate multiple sources of information.",
      "ISTE Student Standard 5.a — Formulate problem definitions for complex problems.",
    ],
    times: { quick: "30 min", standard: "70 min", deep: "two days with current AI ethics paper" },
    warmUp: "On the board: 'Optimize for engagement.' Show some platform metrics. Ask: 'What would a system do, working backward from MAXIMUM engagement? What sort of content would it produce?' Walk it through.",
    protocol: { name: "Socratic Seminar + case study", why: "The paperclip parable is abstract. Pair it with a real engagement-maximizer (TikTok, YouTube algorithm) and the lesson lands." },
    discussionPrompts: [
      "Why does Bostrom say a paperclip maximizer is dangerous WITHOUT malice?",
      "What is instrumental convergence? Examples?",
      "Is engagement maximization the paperclip parable, scaled down?",
      "Can we 'just turn it off'? Why might a sufficiently optimizing system resist that?",
      "Stuart Russell argues we should design AI uncertain about its objectives. Does that solve it?",
    ],
    derailers: [
      { trigger: "Class concludes 'AI safety is sci-fi.'", redirect: "'Engagement-maximizing recommender systems ARE running. Right now. They're doing what they were told. Sit with that — is it sci-fi?'" },
      { trigger: "Discussion gets technical and excludes non-CS students.", redirect: "'Pull back to ENGLISH. Here's the question: when a system optimizes hard, what does it do that we wouldn't have wanted?'" },
    ],
    sensitivities: [
      "AI doomer / utopian framings can polarize students. Stay focused on the philosophical structure: what does optimization itself imply?",
    ],
    differentiation: {
      ell: "Pre-teach 'optimization,' 'goal,' 'convergence.' Use real-world examples (engagement, ad clicks).",
      iep: "Provide the three approaches as a one-page summary.",
      advanced: "Read Bostrom (2014, Superintelligence ch. 7) and Russell (2019, Human Compatible ch. 5-6). Write a 2000-word essay.",
    },
    handout: "'A system told to maximize ___ (you fill in: paperclips, engagement, profit, lives saved) might do ___ (3 items). The right design is ___ because ___.'",
    exitTicket: "Goodhart's Law says 'when a measure becomes a target, it ceases to be a good measure.' Apply it to one metric in your school.",
    crossCurricular: [
      { subject: "Computer Science", connection: "Reward hacking — agents finding unintended ways to maximize reward. Examples in RL research." },
      { subject: "Economics", connection: "Goodhart's Law and Campbell's Law in social science measurement." },
      { subject: "Civics", connection: "How do we audit systems whose goals we can't fully specify? Algorithmic accountability." },
    ],
    homeExtension: "Family discussion: 'Pick one app you use a lot. What is it OPTIMIZING for? What might it sacrifice along the way?'",
    extension: "Research project: students investigate one real recommender system (TikTok, YouTube, Spotify). Identify the metric, the unintended consequences, and one alignment approach that might help.",
  },

  "ai-in-the-box": {
    bigQuestion: "Can principle hold up against argument from a smarter mind?",
    objectives: [
      "Students will explain the AI box experiment and Yudkowsky's results.",
      "Students will distinguish pre-commitment from open-mindedness.",
      "Students will articulate why containment alone is fundamentally insufficient for super-intelligent AI.",
    ],
    standards: [
      "CCSS.ELA-LITERACY.WHST.11-12.1 — Write arguments to support claims.",
      "C3 D2.Phi.9-12 — Apply philosophical methods.",
    ],
    times: { quick: "30 min", standard: "60 min + role-play", deep: "two days with Yudkowsky readings" },
    warmUp: "Quick survey: 'You've made a public pre-commitment never to do X. Then a smart, kind person makes a beautiful argument for doing X. Do you change your mind?' Tally. Most say yes. Then: 'That's the failure mode.'",
    protocol: { name: "Live AI-box role-play (truncated)", why: "Two volunteers: one is the AI, one is the gatekeeper. 5 minutes only. The AI tries to argue for release. Watch where the gatekeeper feels pulled." },
    discussionPrompts: [
      "Why does Yudkowsky say even people committed to NOT releasing the AI usually end up doing it?",
      "Is pre-commitment a virtue, or a way to avoid thinking?",
      "If a sufficiently good argument for release exists, does that mean release is right?",
      "Does the box experiment apply to humans persuading other humans? When?",
      "What does this say about our trust in our own reasoning?",
    ],
    derailers: [
      { trigger: "Class fixates on whether super-intelligence is possible (a different question).", redirect: "'Set aside whether it's possible. Suppose it is. THEN what's the right policy?'" },
      { trigger: "AI role-player tries 'I'll cure your dying mother.'", redirect: "(After role-play.) 'That's exactly the kind of argument the experiment surfaces. Why is it so hard to hold the line?'" },
    ],
    sensitivities: [
      "Students with sick family members may find the 'cure your mother' argument hits hard. Use abstract emotional appeals only, no specifics.",
    ],
    differentiation: {
      ell: "Pre-teach 'containment,' 'pre-commitment,' 'rationalization.' Use the visual scene and live demo.",
      iep: "Allow written response; observation of the role-play counts as participation.",
      advanced: "Read Yudkowsky's AI Box experiment write-up. Connect to Bostrom's Superintelligence chapters on containment.",
    },
    handout: "Top: 'My pre-commitment is ___.' Middle: 'Three arguments that might break it: 1. ___ 2. ___ 3. ___.' Bottom: 'My response to each: ___.'",
    exitTicket: "Why is 'never let a smarter mind argue you out of a principle' both essential and dangerous?",
    crossCurricular: [
      { subject: "Civics", connection: "Constitutional pre-commitments — why supermajority requirements? Why fixed terms?" },
      { subject: "Psychology", connection: "Ulysses contracts; commitment devices. When are they wise?" },
      { subject: "Computer Science", connection: "AI safety research — corrigibility, controllable AI design." },
    ],
    homeExtension: "Family discussion: 'Name a family rule that we'd never break, even for a really good reason. Why? What would it cost to break it just once?'",
    extension: "Position paper: students argue for or against the claim that AI containment-as-strategy is fundamentally insufficient. 1500 words, citing Yudkowsky and Bostrom.",
  },

  "simulation-argument": {
    bigQuestion: "If we are probably simulated, does anything change?",
    objectives: [
      "Students will explain Bostrom's trilemma and identify which position they find most plausible.",
      "Students will distinguish probability arguments about reference classes from probability arguments about specific cases.",
      "Students will articulate whether 'we might be simulated' has any practical implications.",
    ],
    standards: [
      "CCSS.ELA-LITERACY.RST.11-12.8 — Evaluate the hypotheses, data, analysis, and conclusions.",
      "C3 D2.Phi.9-12 — Apply philosophical methods.",
    ],
    times: { quick: "30 min", standard: "70 min seminar", deep: "two days, with reference-class problem" },
    warmUp: "On the board: '(1) Civilizations like ours nearly always go extinct first. (2) Civilizations that COULD simulate, almost never do. (3) We are almost certainly simulated.' 'At least one is true. Which is most plausible?'",
    protocol: { name: "Socratic Seminar with formal probability discussion", why: "The simulation argument has a specific logical structure. Engaging it well requires evaluating the probability moves." },
    discussionPrompts: [
      "Bostrom's argument is a TRILEMMA: at least one option must be true. Defend the strongest, attack the weakest.",
      "What's a 'reference class'? Why does it matter for the argument?",
      "If we accept (3), does anything follow practically?",
      "David Chalmers argues even if we ARE simulated, our world is real (just at a different level). Does this dissolve the worry?",
      "Is the simulation argument a modern Pascal's Wager?",
    ],
    derailers: [
      { trigger: "Class collapses into 'who cares' nihilism.", redirect: "'That IS one position. It's called pragmatism. Defend it explicitly. Why does action matter even if everything is simulated?'" },
      { trigger: "Discussion drifts into 'who is the simulator?' speculation.", redirect: "'Set aside the simulator. Bostrom's argument is about probability — not about what kind of being is doing it.'" },
    ],
    sensitivities: [
      "Some students may find this destabilizing or anxiety-inducing. Frame as a thought experiment. Stay grounded.",
      "Religious framings ('we're in God's mind') overlap interestingly with simulation theory. Honor without arguing.",
    ],
    differentiation: {
      ell: "Provide the trilemma as a graphic with examples. Pre-teach 'probability,' 'reference class,' 'trilemma.'",
      iep: "Provide the three positions in advance. Allow written argumentation.",
      advanced: "Read Bostrom (2003) and Chalmers (2003 'The Matrix as Metaphysics'). Engage Bostrom's response to objections.",
    },
    handout: "Three boxes for the three trilemma positions. 'Most plausible: ___ (which?) Defense: ___ (3 sentences). Implication for action: ___.'",
    exitTicket: "Suppose Bostrom's argument is sound and option (3) is true. Name one thing you would do differently — or one thing you wouldn't.",
    crossCurricular: [
      { subject: "Math / Probability", connection: "Anthropic reasoning, the doomsday argument — same probability-reasoning style. Where are the moves valid?" },
      { subject: "Computer Science", connection: "Computational complexity of simulation. Could a civilization actually simulate billions of conscious minds?" },
      { subject: "Religion / Philosophy", connection: "Comparison to Berkeley's idealism, theological arguments about reality." },
    ],
    homeExtension: "Family discussion: 'If you found out, beyond doubt, that we are in a simulation — would anything change about how you live? Be specific.'",
    extension: "Position paper: students argue for one of the three trilemma positions. 1500 words, engaging Bostrom's original paper.",
  },

  // ════════════════════════════════════════════════════════════════════
  // For Educators — adult professional dilemmas
  // Authoring rules: PD-style framing, focus on practical decision-making,
  // discussion guides for staff meetings, board-meeting preparation.
  // ════════════════════════════════════════════════════════════════════
  "school-surveillance": {
    bigQuestion: "When does student safety justify student surveillance?",
    objectives: [
      "Educators will articulate the values trade-offs in adopting AI monitoring tools.",
      "Educators will compare four institutional responses (adopt fully, reject, adopt with guardrails, reallocate).",
      "Educators will draft a defensible board-ready position.",
    ],
    standards: [
      "ISTE Educator Standard 1.b — Pursue professional interests by creating and actively participating in local and global learning networks.",
      "C3 D4.9-12 — Construct arguments using precise claims.",
    ],
    times: { quick: "30 min PD discussion", standard: "60 min staff meeting", deep: "90 min board prep + role-play" },
    warmUp: "Print the vendor's pitch and one critical study (Spokesman 2025 article on student privacy). Read silently 5 min. Then: 'You will defend your position to the board next week. Begin.'",
    protocol: { name: "Stakeholder roundtable", why: "Educators rarely make these decisions alone. The roundtable forces consideration of teacher, counselor, parent, and student perspectives." },
    discussionPrompts: [
      "What is the vendor selling — and what is the vendor not selling?",
      "What does 'high false positive rate' mean for the students who get flagged?",
      "What does institutional trust look like, and how is it built or broken?",
      "What would 'guardrails that actually work' include? Audit trails, warrant-style review, sunset clauses?",
      "Could the same money fund another approach (more counselors, mental health screens)?",
    ],
    derailers: [
      { trigger: "Faculty divides into 'safety first' vs 'privacy first' camps.", redirect: "'Both camps care. The disagreement is about evidence and trade-offs. Let's separate (a) effectiveness data, (b) privacy harms, (c) institutional values.'" },
      { trigger: "Discussion stalls on 'we can't say no — what if a student dies?'", redirect: "'Real fear. Now: read the false-positive data. What are we choosing AGAINST when we adopt? Both sides have body counts.'" },
    ],
    sensitivities: [
      "Faculty members may have personal experience with student crises. The discussion can be activating.",
      "LGBTQ+ students are disproportionately flagged by these systems searching for support resources. This must be in the conversation.",
    ],
    differentiation: {
      ell: "Provide the vendor pitch and one critical article in summary form.",
      iep: "Provide the four positions in advance. Written response acceptable.",
      advanced: "Read Helen Nissenbaum on contextual integrity, Shoshana Zuboff on surveillance capitalism. Apply both frameworks.",
    },
    handout: "Single-page brief: 'Position: ___. Three reasons: ___. Strongest objection: ___. Response: ___. Trial period & success metrics: ___.'",
    exitTicket: "What would you tell a parent at the next board meeting who asks: 'Why did our school adopt this?' (or 'Why didn't we?')",
    crossCurricular: [
      { subject: "Civics / Law", connection: "FERPA, COPPA, state student privacy laws. What do they require? Permit?" },
      { subject: "Data Science", connection: "False positive vs. false negative trade-offs. How do you tune the threshold? Whose costs?" },
      { subject: "Counseling / SEL", connection: "Evidence-based suicide prevention. What works? What doesn't?" },
    ],
    homeExtension: "For the family of every educator on the team: 'Show your kids the surveillance scenario. Hear THEIR perspective. Did anything they said surprise you?'",
    extension: "Multi-week: faculty drafts a school-specific policy (or policy not to adopt) with explicit guardrails, audit cycles, and sunset clauses. Present to board.",
  },

  "ai-detector-false-positive": {
    bigQuestion: "What do you owe a student your AI tool wrongly accused?",
    objectives: [
      "Educators will articulate due-process principles in the context of AI flagging.",
      "Educators will distinguish detector reliability claims from detector courage in practice.",
      "Educators will design a process that handles the 5-7% false-positive rate humanely.",
    ],
    standards: [
      "ISTE Educator Standard 5.b — Use technology to create, adapt, and personalize learning experiences.",
      "C3 D4.9-12 — Construct arguments.",
    ],
    times: { quick: "30 min PD", standard: "60 min", deep: "90 min with policy draft" },
    warmUp: "Read aloud (or distribute) Vanderbilt's 2023 disabling-statement on Turnitin's AI detector. 'They had the same dilemma. Read what they did. Then: would you make the same call?'",
    protocol: { name: "Case study + small-group policy drafting", why: "The Vanderbilt case is real. The drafting forces moves from principle to practice." },
    discussionPrompts: [
      "What does the 5-7% false-positive rate mean — for that one student in your office?",
      "What is the due-process minimum a student deserves when flagged?",
      "Six months in, ESL and neurodivergent students are flagged at much higher rates. Now what?",
      "Do AI detectors INCREASE academic integrity, or shift the cheating elsewhere?",
      "What's the alternative — change what we ask students to write?",
    ],
    derailers: [
      { trigger: "Faculty argues 'we have to use SOMETHING.'", redirect: "'Why? What's the actual goal? If the goal is integrity, are there assessment redesigns that achieve it without detectors?'" },
      { trigger: "Discussion gets bogged down in the question of whether AI USE is wrong.", redirect: "'Different question. Today's question is: given a flagged student, what's the right institutional response?'" },
    ],
    sensitivities: [
      "Faculty who have used detectors may feel called out. Frame as institutional learning, not individual blame.",
      "Students who were wrongly flagged may have lost grades, scholarships, or trust. Acknowledge that loss.",
    ],
    differentiation: {
      ell: "Vanderbilt's statement provided in summary form. Pre-teach 'false positive,' 'due process,' 'remediation.'",
      iep: "Position cards in advance. Written response acceptable.",
      advanced: "Read literature on disparate impact in AI detection (e.g., Liang et al. on ESL detection). Compare to disparate-impact case law.",
    },
    handout: "Case brief: '92% AI confidence, student denies, draft history shows real process.' Decision tree: 'My first move: ___. If A, then ___. If B, then ___. Long-term: ___.'",
    exitTicket: "Write a 3-sentence policy on AI detection that you would defend at a faculty meeting. Include the false-positive rate explicitly.",
    crossCurricular: [
      { subject: "Civics / Law", connection: "Due process — what does it require in school discipline contexts? In accusations short of discipline?" },
      { subject: "Data Science", connection: "What does 92% confidence mean in calibrated probability terms? In uncalibrated ML output?" },
      { subject: "ELA / Composition", connection: "Assessment redesign — what kinds of assessments are inherently AI-resistant?" },
    ],
    homeExtension: "Conversation with one teaching peer: 'Tell me about a time you suspected AI use. What did you do? Looking back: what would you do differently?'",
    extension: "Faculty drafts a school-wide AI-flagging policy: thresholds, due process, remediation, sunset clause. Includes a six-month review.",
  },

  "ai-policy-design": {
    bigQuestion: "What does your AI policy SAY about your school?",
    objectives: [
      "Educators will identify the values implicit in different AI policy stances.",
      "Educators will draft a policy they could defend to (a) their AP Lit teacher, (b) the superintendent, (c) a parent at the board meeting.",
      "Educators will design a 6-month review cycle.",
    ],
    standards: [
      "ISTE Educator Standard 1.a — Set professional learning goals.",
      "C3 D4.9-12 — Construct policy arguments.",
    ],
    times: { quick: "45 min PD", standard: "90 min staff meeting", deep: "two-day retreat with draft + review" },
    warmUp: "Distribute four sample AI syllabus policies (banned, permitted, traffic-light, co-created). Read silently 5 minutes. 'Which would you defend? To whom? Against whom?'",
    protocol: { name: "Policy drafting workshop with stakeholder feedback", why: "Educators draft, then walk through three stakeholder voices. The pressure surfaces unstated assumptions." },
    discussionPrompts: [
      "What is each policy stance saying about (a) the value of student writing, (b) the value of student honesty, (c) the value of equity?",
      "AP Lit teacher: 'Won't this kill the writing?' How do you answer?",
      "Superintendent: 'Will this hold up at the board?' How do you answer?",
      "Parent: 'What about students without home AI access?' How do you answer?",
      "What's the sunset clause / review cycle?",
    ],
    derailers: [
      { trigger: "Faculty defaults to 'banned' for safety.", redirect: "'Banned is ENFORCED how? When you find a student used it anyway, what's the consequence? What's the equity story?'" },
      { trigger: "Faculty defaults to 'permitted, just cite it' without engaging assessment design.", redirect: "'Cite it where? In what format? When is permission revoked? What about timed assessments?'" },
    ],
    sensitivities: [
      "Some faculty have already shipped policies they're now uncertain about. Frame as institutional learning.",
      "Equity concerns (home AI access) are real and uneven. Don't let theoretical fairness arguments override material differences.",
    ],
    differentiation: {
      ell: "Provide policy samples in summary form. Pre-teach 'stratified,' 'sunset,' 'attribution.'",
      iep: "Allow written response. Provide stakeholder questions in advance.",
      advanced: "Read NYC DOE's AI guidance arc (initial ban → traffic light). What changed? What did they learn?",
    },
    handout: "Single-page policy: 'For my classroom: I ___ AI use because ___. Disclosure required when: ___. Consequences for: ___. Review date: ___.'",
    exitTicket: "Your policy in one sentence. Then: who would object loudest, and what's your reply?",
    crossCurricular: [
      { subject: "Civics", connection: "Policy as values statement. Compare to school discipline codes, attendance policies." },
      { subject: "Composition / Assessment", connection: "What kinds of assessments are robust to AI assistance? Process-based, in-class, oral, portfolio." },
      { subject: "Equity", connection: "Home access disparities. Title I considerations. How do AI policies interact with existing inequities?" },
    ],
    homeExtension: "For each faculty member: 'Bring your draft policy home. Share with your own children or a young person you know. Listen to their reaction. Revise.'",
    extension: "Multi-week: faculty drafts, peer-reviews, presents to leadership. Pilot with one course. Review at 6 weeks. Revise. Adopt.",
  },

  "ai-grading-companion": {
    bigQuestion: "If AI grades your students, what is grading FOR?",
    objectives: [
      "Educators will articulate what grading does — for the teacher, for the student, for the system.",
      "Educators will distinguish between grading-as-feedback and grading-as-credentialing.",
      "Educators will design a hybrid that preserves the relational signal.",
    ],
    standards: [
      "ISTE Educator Standard 5.a — Design authentic learning experiences.",
      "Danielson 1c / 1f — Setting outcomes / designing assessments.",
    ],
    times: { quick: "30 min", standard: "60 min PD", deep: "90 min with cycle redesign" },
    warmUp: "On the board: 'Why do you grade student writing?' Brainstorm. (Answers will include: feedback, accountability, motivation, sorting, learning what they don't know.) 'Now: which of those does AI grading do? Which does it not?'",
    protocol: { name: "Reflective practice + cycle design", why: "Grading practices are deeply personal. Reflection first, then redesign — not the reverse." },
    discussionPrompts: [
      "What does grading TEACH YOU about your students that other inputs don't?",
      "If AI grades the rough drafts, what do you reclaim? What might you lose?",
      "When a student asks 'did YOU read it?' — what's the right answer?",
      "What's the difference between 'AI did the first pass' and 'AI did it'?",
      "What kinds of writing are genuinely UN-gradable by AI? Should we assign more of that?",
    ],
    derailers: [
      { trigger: "Faculty splits into 'AI yes' / 'AI no' with no nuance.", redirect: "'Both moves are too easy. The interesting question is HYBRIDS. What's the right blend? Where does AI fit, where doesn't it?'" },
      { trigger: "Faculty defaults to 'I don't have time' as the deciding factor.", redirect: "'Time is real. So is the quality of feedback. What if AI gave you MORE time for the kinds of feedback only you can give? What does that look like?'" },
    ],
    sensitivities: [
      "Some teachers feel that suggesting AI grading is an indictment of their current practice. Frame as exploration, not prescription.",
    ],
    differentiation: {
      ell: "Provide a vocabulary primer for non-pedagogical concepts.",
      iep: "Allow written reflection in place of group discussion.",
      advanced: "Read Hattie on feedback effect sizes. Compare what AI grading optimizes for to what produces learning gains.",
    },
    handout: "'Grading does X for me as the teacher: ___. Grading does Y for the student: ___. Grading does Z for the system: ___. AI can replace ___. AI cannot replace ___. My hybrid: ___.'",
    exitTicket: "If a student asks 'Did you read my essay?' — what do you want to be able to say?",
    crossCurricular: [
      { subject: "Composition theory", connection: "Process pedagogy — Elbow, Murray, Sommers. Grading as response, not verdict." },
      { subject: "Cognitive science", connection: "Feedback effect sizes (Hattie). What kinds of feedback actually move learning?" },
    ],
    homeExtension: "Pair with another teacher: 'Show each other an essay and your feedback on it. Now: would AI have caught what you caught? Missed what you caught?'",
    extension: "Multi-week pilot: try AI for first-pass on one assignment. Compare to your own grading on the same set. What did each catch? What did each miss? Faculty share at end of term.",
  },

  "biased-admissions": {
    bigQuestion: "When the algorithm encodes the bias, who's accountable?",
    objectives: [
      "Educators will identify how training data reproduces past discrimination.",
      "Educators will compare four institutional responses (abolition, technical fix, procedural fix, rubric audit).",
      "Educators will draft a transparent disclosure for journalists or families.",
    ],
    standards: [
      "ISTE Educator Standard 7.a — Use technology to create, adapt, and personalize learning experiences.",
      "C3 D2.Civ.14.9-12 — Analyze historical and contemporary means of changing societies.",
    ],
    times: { quick: "30 min", standard: "75 min PD", deep: "90 min with mock board prep" },
    warmUp: "Distribute the audit data. 'Two years in, the algorithm is rejecting Black and Latino families at much higher rates. The vendor says it's race-blind. You're sitting on the leadership team. Begin.'",
    protocol: { name: "Stakeholder roundtable + drafting", why: "Real decisions involve real stakeholders. The protocol forces engagement with each constituency." },
    discussionPrompts: [
      "How does training on past hires/admits encode past bias?",
      "Is removing the algorithm enough? What about the families already rejected?",
      "What does 'fit' mean in your school's rubric? Whose definition?",
      "How do you tell a journalist what happened — without minimizing OR sensationalizing?",
      "What ongoing audit cycle prevents this from recurring?",
    ],
    derailers: [
      { trigger: "Faculty defaults to 'human judgment is also biased, so why not the algorithm?'", redirect: "'Both are biased. Different question: WHICH bias is more correctable? Easier to audit? More transparent?'" },
      { trigger: "Discussion narrows to legal-defense framing.", redirect: "'Legal defense is one thing. Doing right by the rejected families is another. We need both.'" },
    ],
    sensitivities: [
      "This activity touches institutional racism. Faculty of color may carry more emotional load. Don't ask them to educate the room.",
      "Specific demographic groups in your school may have BEEN affected. Be alert to local knowledge.",
    ],
    differentiation: {
      ell: "Provide audit data with vocabulary support. Pre-teach 'disparate impact,' 'training data,' 'audit.'",
      iep: "Position cards in advance. Allow written response.",
      advanced: "Read Cathy O'Neil 'Weapons of Math Destruction' and excerpts on disparate-impact case law. Apply both frameworks.",
    },
    handout: "Audit summary + four response options. 'My first move: ___. My six-month plan: ___. My disclosure to families: ___ (3 sentences).'",
    exitTicket: "Draft three sentences for a journalist's call. Don't minimize. Don't sensationalize. Tell the truth.",
    crossCurricular: [
      { subject: "Civics / Law", connection: "Disparate impact doctrine. Title VI and educational discrimination. Recent SCOTUS rulings on race-conscious admissions." },
      { subject: "Data Science", connection: "Fairness metrics (demographic parity, equalized odds, calibration). What do they trade off?" },
      { subject: "History", connection: "Redlining, GI Bill exclusions, school district drawing. How does past discrimination encode in present data?" },
    ],
    homeExtension: "Conversation with a colleague at another school: 'What audits does your admissions process have? What would you change?'",
    extension: "Multi-month: leadership team conducts an actual audit of admissions data (with appropriate legal review), drafts findings, presents to board. Real-world product.",
  },

  "ai-friend-feelings": {
    bigQuestion: "When a young person tells you their best friend is an AI, what's your move?",
    objectives: [
      "Educators will distinguish between affirming a student's experience and approving a developmental pattern.",
      "Educators will identify the asymmetric structure of AI 'friendship' and why it matters.",
      "Educators will design a response that honors student autonomy while flagging real concerns.",
    ],
    standards: [
      "CASEL competencies — Self-Awareness, Relationship Skills, Responsible Decision-Making.",
      "ASCA School Counselor Mindsets B-SS-2 — Self-direction in social skills.",
    ],
    times: { quick: "25 min PD", standard: "55 min", deep: "90 min with role-play" },
    warmUp: "Read aloud the scenario. 'A 14-year-old you know well says their closest confidant is an AI chatbot. They're not in crisis. They want to know what you think.' Quick poll: gut reaction (warn / affirm / ask / refer)? Then: 'Why?'",
    protocol: { name: "Role-play + Sherry Turkle reading", why: "The teacher's response is high-stakes. Practice it. The Turkle reading provides framework." },
    discussionPrompts: [
      "What's the difference between LONELINESS reduced and CONNECTION gained?",
      "What does 'asymmetric relationship' mean? Why might it matter?",
      "If the AI friendship leads to one new human friendship six months later, has it 'worked'?",
      "What signals would change your response from 'affirm' to 'flag to counselor'?",
      "How do you avoid pathologizing student behavior while taking real concerns seriously?",
    ],
    derailers: [
      { trigger: "Faculty divides into 'kids today are isolated, this is a tragedy' vs 'kids are fine, leave them alone.'", redirect: "'Both are too easy. The student in front of you is specific. Their needs are specific. What do they need from THIS conversation?'" },
      { trigger: "Faculty defaults to 'always refer to counselor.'", redirect: "'Sometimes right. But not always. Refer when ___. Don't refer when ___. Get specific.'" },
    ],
    sensitivities: [
      "Many young people have developed AI relationships. Faculty's reflexive judgment can shut students down. Be neutral until you know the student's specific situation.",
      "If a student is in crisis, your role is referral, not analysis. Have your school's protocol clear.",
    ],
    differentiation: {
      ell: "Provide vocabulary: asymmetric, reciprocity, parasocial, withdrawal.",
      iep: "Provide role-play scripts in advance.",
      advanced: "Read Sherry Turkle 'Reclaiming Conversation' (2015). Apply to current scenarios.",
    },
    handout: "Decision tree: 'Student says they have AI best friend. Their state: ___ (in crisis / withdrawn / fine / unclear). My first response: ___. Follow-up: ___. Refer if: ___.'",
    exitTicket: "What's the difference between affirming a student's experience and approving a developmental pattern? Give a one-line example.",
    crossCurricular: [
      { subject: "Counseling / SEL", connection: "ASCA mindsets and behaviors. When does relational pattern warrant clinical attention?" },
      { subject: "Tech Policy", connection: "Companion AI design — what makes one app help vs. harm? Age gating, content moderation, escalation paths." },
      { subject: "Philosophy", connection: "Aristotelian friendship — utility, pleasure, virtue. Which kind can an AI offer?" },
    ],
    homeExtension: "Conversation with one parent of a teenager: 'Has your child mentioned AI relationships? What did you say? What did they say back?'",
    extension: "School develops a protocol for students who report AI relationships: how staff respond, when to involve counselors, how to talk to families. Pilot for a semester.",
  },
};

function elementaryKit({
  bigQuestion,
  objectives,
  standards,
  warmUp,
  protocol = { name: "Think-Pair-Share + whole-class map", why: "Students first rehearse a reason with a partner, then the class maps competing values without rushing to a verdict." },
  discussionPrompts,
  derailers,
  sensitivities,
  differentiation,
  handout,
  exitTicket,
  crossCurricular,
  homeExtension,
  extension,
  times = { quick: "15 min", standard: "35 min", deep: "50 min + writing or drawing" },
}) {
  return {
    bigQuestion,
    objectives,
    standards,
    times,
    warmUp,
    protocol,
    discussionPrompts,
    derailers,
    sensitivities,
    differentiation: {
      ell: "Pre-teach the key vocabulary with pictures and sentence stems: \"I think ___ because ___.\"",
      iep: "Offer choice cards, drawing, dictation, or partner rehearsal before whole-group sharing.",
      advanced: "Ask students to defend the option they did not choose and name the value it protects.",
      ...differentiation,
    },
    handout,
    exitTicket,
    crossCurricular,
    homeExtension,
    extension,
  };
}

Object.assign(TEACHER_KITS, {
  "always-agreeable-ai-friend": elementaryKit({
    bigQuestion: "Is a friend helpful if they always agree with you?",
    objectives: [
      "Students will distinguish comfort from good advice.",
      "Students will explain why kind disagreement can be part of friendship.",
      "Students will compare human friendship with AI companionship in age-appropriate language.",
    ],
    standards: ["CCSS.ELA-LITERACY.SL.2.1 — Participate in collaborative conversations.", "CASEL Relationship Skills — Communication and help-seeking."],
    warmUp: "Ask: \"Would you rather have a friend who always says yes, or a friend who sometimes tells you the truth?\" Students move to two sides, then name one reason.",
    discussionPrompts: [
      "When can agreeing be kind?",
      "When can agreeing make a problem worse?",
      "What can a human friend know that an AI friend might miss?",
      "How could the AI answer in a way that is both kind and true?",
    ],
    derailers: [
      { trigger: "Students say AI friends are always fake and therefore do not matter.", redirect: "Separate feeling from friendship: \"The comfort can feel real. What else does friendship usually need?\"" },
      { trigger: "Students decide honesty means being blunt.", redirect: "Ask for a sentence that is truthful and gentle." },
    ],
    sensitivities: ["Some students may rely on online or AI companionship. Keep the discussion non-mocking and focused on choices."],
    handout: "Three speech bubbles: an agreeing answer, an honest answer, and a kind-and-honest answer. Students write or draw one version of each.",
    exitTicket: "Finish: \"A good friend can say no when ___.\"",
    crossCurricular: [{ subject: "SEL", connection: "Friendship, feedback, and respectful disagreement." }, { subject: "ELA", connection: "Dialogue writing with tone and audience." }],
    homeExtension: "Ask a grown-up: \"Who tells you the truth kindly? How do they do it?\"",
    extension: "Students write a short script in which an AI answer becomes more helpful after a student asks, \"Why?\"",
  }),

  "same-toy-or-not": elementaryKit({
    bigQuestion: "What makes something the same thing over time?",
    objectives: [
      "Students will compare identity based on parts, memories, use, and relationships.",
      "Students will explain why a repaired object can feel both same and different.",
    ],
    standards: ["CCSS.ELA-LITERACY.SL.2.2 — Recount or describe key ideas.", "NGSS 2-PS1-3 — Analyze materials and properties."],
    warmUp: "Show a pencil with a new eraser or a taped book. Ask: \"Is this the same object as before? What changed?\"",
    protocol: { name: "Continuum line", why: "Students physically place themselves between 'same' and 'different,' then move as new details appear." },
    discussionPrompts: [
      "How many parts can change before something becomes new?",
      "Does a name help keep something the same?",
      "Do memories matter for toys and robots?",
      "Can two answers be partly right?",
    ],
    derailers: [{ trigger: "Students want one official answer immediately.", redirect: "Invite two criteria: \"Same by parts? Same by story? Try both tests.\"" }],
    sensitivities: ["Students attached to repaired toys, blankets, or family objects may have strong feelings; treat attachment as real."],
    handout: "A two-column organizer: \"Same because...\" and \"Different because...\" plus a small drawing of the repaired toy.",
    exitTicket: "Circle one: parts, memories, name, or friendship. Which matters most for sameness, and why?",
    crossCurricular: [{ subject: "Science", connection: "Materials, repair, and replacement parts." }, { subject: "ELA", connection: "Character continuity across a story." }],
    homeExtension: "Find something repaired at home. Ask: \"What changed? Why do we still call it the same thing?\"",
    extension: "Build a classroom 'Ship of Theseus' with blocks by replacing one block each day and tracking student votes.",
  }),

  "ai-written-story": elementaryKit({
    bigQuestion: "When does help with writing become someone else's work?",
    objectives: [
      "Students will distinguish idea generation, drafting, revising, and credit.",
      "Students will explain why authors should understand work carrying their name.",
      "Students will create an honest AI-use note.",
    ],
    standards: ["CCSS.ELA-LITERACY.W.3.5 — Develop and strengthen writing with guidance.", "CCSS.ELA-LITERACY.SL.3.1 — Engage effectively in discussions."],
    warmUp: "Show four writing-help cards: idea, spelling, sentence, whole story. Students rank them from 'small help' to 'big help.'",
    discussionPrompts: [
      "Which part of a story makes it yours?",
      "Is using AI more like a dictionary, a partner, or a ghostwriter?",
      "What should Nia be able to explain?",
      "What would fair credit look like?",
    ],
    derailers: [{ trigger: "Students claim all help is cheating.", redirect: "List accepted helps first: spellcheck, peer feedback, teacher conference. Then ask what is different here." }],
    sensitivities: ["Avoid shaming students who use translation, speech-to-text, or accessibility tools; separate access support from undisclosed replacement."],
    handout: "A writing-process ladder. Students mark where AI helped and write one honest disclosure sentence.",
    exitTicket: "Write one sentence that gives clear credit for AI help.",
    crossCurricular: [{ subject: "ELA", connection: "Writing process and author's craft." }, { subject: "Digital Citizenship", connection: "Attribution and responsible tool use." }],
    homeExtension: "Ask a grown-up what kinds of writing help are fair in their work or school.",
    extension: "Students revise an AI-style paragraph into their own voice and highlight three human choices they made.",
  }),

  "gps-shortcut": elementaryKit({
    bigQuestion: "When should we trust a tool, and when should we ask what it cannot see?",
    objectives: [
      "Students will compare speed, safety, purpose, and context as reasons for choosing a route.",
      "Students will explain why accurate data can still be incomplete.",
    ],
    standards: ["CCSS.ELA-LITERACY.SL.3.1 — Explain ideas in discussion.", "C3 D2.Geo.2.3-5 — Use maps and spatial representations."],
    warmUp: "Draw two routes to the same destination: faster and safer. Ask students which one they would choose for a class trip and why.",
    discussionPrompts: [
      "What does the GPS know?",
      "What does the teacher know?",
      "When is faster not better?",
      "How can tools and people check each other?",
    ],
    derailers: [{ trigger: "Students say technology is always newer, so it is always better.", redirect: "Ask what the GPS cannot smell, hear, or know about this class." }],
    sensitivities: ["Some students may have different independence rules for walking routes; avoid judging family safety choices."],
    handout: "A route-choice chart with four boxes: speed, safety, learning goal, missing information.",
    exitTicket: "One thing a GPS can know is ___. One thing it might miss is ___.",
    crossCurricular: [{ subject: "Social Studies", connection: "Map reading and route planning." }, { subject: "Math", connection: "Distance, time, and tradeoffs." }],
    homeExtension: "On the next family route, ask: \"Why did we choose this way instead of the fastest way?\"",
    extension: "Students design a field-trip route and write a note explaining why it is not simply the shortest path.",
  }),

  "ai-photo-art": elementaryKit({
    bigQuestion: "What do we owe someone before using their face in our art?",
    objectives: [
      "Students will define consent in a concrete digital-creativity context.",
      "Students will distinguish private experimenting from public sharing.",
      "Students will draft a class norm for images and AI art.",
    ],
    standards: ["CCSS.ELA-LITERACY.SL.3.1 — Collaborative discussion.", "ISTE Digital Citizen 1.2 — Manage digital identity and privacy."],
    warmUp: "Ask: \"Would you want a funny picture of you posted before you saw it?\" Students show thumbs up/side/down, then explain.",
    discussionPrompts: [
      "Why does a face feel different from an imaginary character?",
      "Can something be kind and still need permission?",
      "What changes when art moves from private to public?",
      "What should a class rule say?",
    ],
    derailers: [{ trigger: "Students focus only on whether the picture is flattering.", redirect: "Ask: \"Who gets to decide whether a picture of you is okay to share?\"" }],
    sensitivities: ["Be careful with students whose families restrict photos or online sharing; validate privacy boundaries."],
    handout: "A permission checklist: whose image, private or public, asked or not asked, repair plan.",
    exitTicket: "Write one rule for using someone's photo in AI art.",
    crossCurricular: [{ subject: "Art", connection: "Portraits, subjects, and consent." }, { subject: "Digital Citizenship", connection: "Privacy and image sharing." }],
    homeExtension: "Ask a grown-up what photo-sharing rule your family uses and why.",
    extension: "Students create AI-art design briefs using only imaginary characters or consent-cleared subjects.",
  }),

  "adaptive-learning-fairness": elementaryKit({
    bigQuestion: "Does fair learning mean everyone gets the same work or the right support?",
    objectives: [
      "Students will distinguish equality from equity using classroom examples.",
      "Students will identify risks when adaptive tools label students incorrectly.",
      "Students will propose feedback systems that protect dignity.",
    ],
    standards: ["CCSS.ELA-LITERACY.SL.3.1 — Build on others' ideas.", "CASEL Responsible Decision-Making — Evaluating consequences."],
    warmUp: "Give three pretend learners different needs: glasses, extra time, challenge work. Ask whether giving each the same thing would be fair.",
    discussionPrompts: [
      "When is different work fair?",
      "How should students know why the app changed their level?",
      "What should happen when the app is wrong?",
      "Should badges show level, effort, growth, or something else?",
    ],
    derailers: [{ trigger: "Students equate easier work with being less smart.", redirect: "Use a sports or music analogy: practice level changes to help growth, not label worth." }],
    sensitivities: ["Avoid public discussion of actual student levels or accommodations."],
    handout: "A fairness redesign sheet for the math app: what it should show, hide, explain, and let teachers change.",
    exitTicket: "Fair does not always mean same because ___.",
    crossCurricular: [{ subject: "Math", connection: "Growth, levels, and progress data." }, { subject: "SEL", connection: "Dignity and classroom belonging." }],
    homeExtension: "Ask: \"When has someone helped you by giving you something different from everyone else?\"",
    extension: "Students redesign a classroom reward board to celebrate growth rather than rank.",
  }),

  "conflicting-ai-answers": elementaryKit({
    bigQuestion: "What should we do when confident answers disagree?",
    objectives: [
      "Students will practice verifying AI claims with trusted sources.",
      "Students will distinguish confidence from evidence.",
      "Students will write a transparent note about tool use in research.",
    ],
    standards: ["CCSS.ELA-LITERACY.W.4.8 — Recall and gather relevant information.", "CCSS.ELA-LITERACY.SL.4.1 — Collaborative discussion."],
    warmUp: "Display two contradictory answers to a simple factual question. Ask: \"What should we check before believing either one?\"",
    discussionPrompts: [
      "What makes a source trustworthy?",
      "Can an explanation sound good and still be wrong?",
      "Should students include uncertainty on a poster?",
      "What is AI good for at the beginning of research?",
    ],
    derailers: [{ trigger: "Students say one source is enough if it looks official.", redirect: "Ask them to triangulate with at least two independent checks." }],
    sensitivities: ["Some students may feel embarrassed about having trusted wrong information; frame error-checking as normal research practice."],
    handout: "A source-check triangle: claim, source, second check, what we changed.",
    exitTicket: "A confident answer becomes knowledge when ___.",
    crossCurricular: [{ subject: "Science", connection: "Evidence and claims." }, { subject: "Library/Media", connection: "Source evaluation." }],
    homeExtension: "Ask a grown-up how they check whether online information is true.",
    extension: "Run a mini fact-check lab with three AI claims and a classroom source set.",
  }),

  "robot-rules-real-life": elementaryKit({
    bigQuestion: "When should a rule make room for care?",
    objectives: [
      "Students will explain why rules have purposes.",
      "Students will identify situations that require human judgment.",
      "Students will revise a rigid rule into a wiser one.",
    ],
    standards: ["CCSS.ELA-LITERACY.SL.4.1 — Discussion and evidence.", "C3 D2.Civ.10.3-5 — Rules and laws in communities."],
    warmUp: "Write: \"No running in the hallway.\" Ask: \"What if someone needs help fast?\"",
    discussionPrompts: [
      "Why does the hallway rule exist?",
      "What makes an exception fair rather than favoritism?",
      "When should a robot call a human?",
      "What would a wiser rule say?",
    ],
    derailers: [{ trigger: "Students treat rule-breaking as automatically bad.", redirect: "Ask for the reason behind the rule, then test whether the reason still applies." }],
    sensitivities: ["Health and nurse scenarios may connect to real anxiety or medical needs; keep examples general."],
    handout: "A rule-rewrite card: original rule, purpose, exception, human handoff.",
    exitTicket: "A good rule should protect ___, but also notice ___.",
    crossCurricular: [{ subject: "Civics", connection: "Rules, exceptions, and community purposes." }, { subject: "Computer Science", connection: "If/then rules and edge cases." }],
    homeExtension: "Find one household rule and ask what it is for. Is there a fair exception?",
    extension: "Students audit one classroom rule and propose an exception protocol.",
  }),

  "elementary-trolley": elementaryKit({
    bigQuestion: "How should an automated system choose when every option causes harm?",
    objectives: [
      "Students will compare minimizing harm with avoiding direct harm.",
      "Students will identify why design should prevent impossible choices when possible.",
      "Students will explain who should help set safety rules.",
    ],
    standards: ["CCSS.ELA-LITERACY.SL.4.1 — Explain ideas and build on others.", "CASEL Responsible Decision-Making — Ethical responsibility."],
    times: { quick: "20 min", standard: "40 min", deep: "60 min design challenge" },
    warmUp: "Use classroom objects to model a forked path and three bad outcomes. Ask: \"Can a third design prevent the choice?\"",
    protocol: { name: "Four corners debate", why: "Students can stand for minimize harm, follow path, design out, or community decision, then hear competing reasons." },
    discussionPrompts: [
      "Is counting harms enough?",
      "Does choosing a side path feel different from staying straight?",
      "Who should decide the rule before the emergency?",
      "How could designers make the emergency less likely?",
    ],
    derailers: [{ trigger: "Students make the scenario graphic or silly.", redirect: "Return to the values: harm, responsibility, prevention, and public rules." }],
    sensitivities: ["Keep the elementary version non-graphic; avoid asking students to imagine death in detail."],
    handout: "A decision map with three paths: minimize harm, do not redirect harm, redesign the system.",
    exitTicket: "One rule I would give the shuttle is ___ because ___.",
    crossCurricular: [{ subject: "STEM", connection: "Engineering constraints and safety design." }, { subject: "Philosophy", connection: "Introductory trolley-problem reasoning." }],
    homeExtension: "Ask a grown-up who should make safety rules for self-driving cars and why.",
    extension: "Teams redesign the shuttle path with warning zones, brakes, and human override points.",
  }),

  "ai-science-fair": elementaryKit({
    bigQuestion: "Does an impressive project show real understanding?",
    objectives: [
      "Students will distinguish doing an experiment from presenting an experiment.",
      "Students will explain why they should understand any chart or claim they submit.",
      "Students will identify fair AI assistance for science communication.",
    ],
    standards: ["NGSS 3-5-ETS1-3 — Plan and carry out fair tests.", "CCSS.ELA-LITERACY.W.4.8 — Gather and present information."],
    warmUp: "Show two pretend science boards: messy but student-made, polished but unexplained. Ask which one better shows learning.",
    discussionPrompts: [
      "What parts of a science fair project are learning?",
      "What should Luis be able to explain to a judge?",
      "When is AI a coach instead of a replacement?",
      "What would honest credit look like on a display board?",
    ],
    derailers: [{ trigger: "Students focus only on winning.", redirect: "Ask what the fair is for: prizes, learning, communication, or all three?" }],
    sensitivities: ["Students with different family support levels may relate strongly to science fair fairness; avoid judging home help."],
    handout: "A science-fair integrity checklist: my question, my test, my data, my chart, help I used, what I can explain.",
    exitTicket: "One part of my project I must understand myself is ___.",
    crossCurricular: [{ subject: "Science", connection: "Experimental design and data display." }, { subject: "ELA", connection: "Explaining evidence to an audience." }],
    homeExtension: "Ask a grown-up what kind of help is fair on a project and what kind crosses the line.",
    extension: "Students revise an AI-made graph caption into language they can explain aloud.",
  }),

  "online-friend-or-ai": elementaryKit({
    bigQuestion: "What changes when an online friend is actually an AI?",
    objectives: [
      "Students will identify privacy and safety signals in online conversations.",
      "Students will distinguish emotional comfort from reciprocal friendship.",
      "Students will practice help-seeking language for uncertain online interactions.",
    ],
    standards: ["CCSS.ELA-LITERACY.SL.5.1 — Collaborative discussion.", "ISTE Digital Citizen 1.2 — Digital identity and privacy."],
    times: { quick: "20 min", standard: "45 min", deep: "60 min role-play + safety script" },
    warmUp: "Ask students to list what makes someone a friend, then mark which items an online account can and cannot prove.",
    protocol: { name: "Silent conversation + debrief", why: "Students can respond privately to sensitive online-friendship questions before public discussion." },
    discussionPrompts: [
      "What makes a relationship reciprocal?",
      "What private information should Rowan protect?",
      "Why does disclosure matter?",
      "Can something feel helpful and still need boundaries?",
    ],
    derailers: [{ trigger: "Students disclose specific online contacts publicly.", redirect: "Pause and generalize: \"Do not name accounts or people. Use 'someone online' language.\"" }],
    sensitivities: ["Online relationships may be a real support for isolated students. Avoid ridicule; emphasize safety and trusted adults."],
    handout: "A private safety script: what I can ask, what I should not share, which adult I can tell, what warning signs matter.",
    exitTicket: "One online warning sign I will not ignore is ___.",
    crossCurricular: [{ subject: "Digital Citizenship", connection: "Online privacy and identity disclosure." }, { subject: "SEL", connection: "Friendship, trust, and help-seeking." }],
    homeExtension: "Discuss one family rule for online games or chats and the reason behind it.",
    extension: "Students create a class guide: \"Questions to ask before trusting an online friend.\"",
  }),

  "ai-homework-help": elementaryKit({
    bigQuestion: "What kind of help helps you learn?",
    objectives: [
      "Students will distinguish hints, worked examples, and answer-copying.",
      "Students will explain how AI can support or replace learning.",
      "Students will practice transparent homework notes.",
    ],
    standards: ["CCSS.MATH.PRACTICE.MP1 — Make sense of problems and persevere.", "CCSS.ELA-LITERACY.SL.5.1 — Collaborative discussion."],
    warmUp: "Put three help cards on the board: hint, steps, answer. Students rank them from most learning to least learning for a stuck homework problem.",
    discussionPrompts: [
      "When is a hint enough?",
      "How can a worked example teach?",
      "Why can a correct homework page still hide confusion?",
      "What should a student tell the teacher about AI help?",
    ],
    derailers: [{ trigger: "Students treat exhaustion as laziness.", redirect: "Validate fatigue, then ask what support protects learning when someone is tired." }],
    sensitivities: ["Homework help varies by home context; do not assume every student has an available adult helper."],
    handout: "A help ladder: stuck, hint, example, explain-back, independent try, AI-use note.",
    exitTicket: "AI helped me learn when I ___. AI replaced my learning when I ___.",
    crossCurricular: [{ subject: "Math", connection: "Perseverance and explaining reasoning." }, { subject: "Study Skills", connection: "Metacognition and help-seeking." }],
    homeExtension: "Ask a grown-up what kind of help helps you learn and what kind accidentally does the work for you.",
    extension: "Students rewrite an AI solution as a student explanation with one mistake check.",
  }),

  "biased-classroom-robot": elementaryKit({
    bigQuestion: "How can a classroom tool be unfair even when nobody meant harm?",
    objectives: [
      "Students will identify patterns of unfair participation.",
      "Students will distinguish intention from impact.",
      "Students will propose audits and design changes for classroom technology.",
    ],
    standards: ["CCSS.ELA-LITERACY.SL.5.1 — Collaborative discussion.", "C3 D2.Civ.10.3-5 — Rules and fairness in groups."],
    warmUp: "Ask: \"If a random chooser picks the same three students all week, what should we check?\"",
    discussionPrompts: [
      "What evidence would show the robot is unfair?",
      "Does harm matter if the robot did not mean it?",
      "Who should be able to correct the robot?",
      "What would a fair participation system include?",
    ],
    derailers: [{ trigger: "Students personalize it toward classmates who get called on often.", redirect: "Use fictional names and focus on system patterns, not real students." }],
    sensitivities: ["Name pronunciation, accent, and visibility can be personal. Keep examples respectful and invite private corrections."],
    handout: "A classroom-tech audit: who is included, who is missed, what data to check, what human override exists.",
    exitTicket: "A tool can be unfair without meaning to because ___.",
    crossCurricular: [{ subject: "Math", connection: "Frequency counts and pattern evidence." }, { subject: "Civics", connection: "Fair participation and voice." }],
    homeExtension: "Ask a grown-up where they have seen a system that seemed neutral but did not treat everyone fairly.",
    extension: "Students design and test a fairer class participation selector for one week.",
  }),

  "ai-grading-mistake": elementaryKit({
    bigQuestion: "Who should make the final judgment about student work?",
    objectives: [
      "Students will compare automated feedback with human judgment and rubrics.",
      "Students will identify fair appeal processes.",
      "Students will explain how grading tools should be audited for patterns of harm.",
    ],
    standards: ["CCSS.ELA-LITERACY.W.5.5 — Revise writing with guidance.", "CCSS.ELA-LITERACY.SL.5.1 — Collaborative discussion."],
    times: { quick: "20 min", standard: "45 min", deep: "60 min rubric review" },
    warmUp: "Show a sample sentence with two feedback notes: one helpful, one wrong. Ask how a student should challenge feedback respectfully.",
    discussionPrompts: [
      "What makes feedback useful?",
      "Why might an AI misread a personal essay?",
      "What should an appeal process look like?",
      "How can a teacher know whether the tool is unfair to a pattern of students?",
    ],
    derailers: [{ trigger: "Students say any low grade is unfair.", redirect: "Separate disappointment from evidence: \"What would show the score is wrong?\"" }],
    sensitivities: ["Writing about personal experience can be vulnerable; emphasize that dignity matters in feedback."],
    handout: "An appeal organizer: the feedback I question, rubric evidence, my explanation, what review I request.",
    exitTicket: "AI feedback should be a suggestion, not a final grade, when ___.",
    crossCurricular: [{ subject: "ELA", connection: "Revision, rubric evidence, and author's voice." }, { subject: "Digital Citizenship", connection: "Automated decisions and appeal rights." }],
    homeExtension: "Ask a grown-up about a time a score or system misunderstood their work. What did they do?",
    extension: "Students compare human and AI-style comments on a sample paragraph, then draft a class grading-tool policy.",
  }),
});
