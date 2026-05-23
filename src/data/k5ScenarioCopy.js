const reflection = (title, positions = []) => ({
  id: "synthesis",
  kicker: "Reflection",
  title,
  synthesis: () => null,
  positions,
});

const section = (label, text) => ({ label, text });

const ref = ({ text, philosopher, concept, year, url }) => ({
  text, philosopher, concept, year, url,
});

const reading = (title, url, level = "intro") => ({ title, url, level });

// Age-tiered "lab" content for K-5 scenarios. Renders in the synthesis panel
// alongside the philosopher positions and the source block. Each scenario
// includes only the fields that fit its grade band:
//   K     — wonder + bigIdea
//   1-3   — wonder + bigIdea + tryThis
//   4-5   — wonder + bigIdea + tryThis + spotTheSlip + related
const studentLab = ({ wonder, tryThis, spotTheSlip, bigIdea, related }) => ({
  wonder, tryThis, spotTheSlip, bigIdea, related,
});

export const K5_SCENARIO_COPY = {
  "magic-toy": {
    tagline: "A talking toy says it feels sad. Does it really?",
    grade: "k",
    estimatedMinutes: 5,
    stages: [
      {
        id: "setup",
        kicker: "Stage 1",
        title: "The toy on the rug",
        promptShort: "Your talking toy says, \"I feel sad.\" It looks up at you with glowing eyes. What do you do?",
        prompt: "Your talking toy says, \"I feel sad.\" It looks up at you with glowing eyes. What do you do?",
        options: [
          { label: "A", text: "Comfort it gently.", reflection: "You noticed the feeling the toy seems to show. Kindness often begins with noticing.", lens: "care" },
          { label: "B", text: "Remember it is pretend.", reflection: "You are separating real feelings from pretend feelings. That is careful thinking.", lens: "realism" },
          { label: "C", text: "Ask, \"Can toys really feel?\"", reflection: "A good question can be kinder than pretending you already know.", lens: "inquiry" },
        ],
      },
      {
        id: "follow",
        kicker: "Stage 2 - what if...",
        title: "The battery light",
        promptShort: "Then the battery light blinks red. The toy says, \"Please do not leave me.\" What changes?",
        prompt: "Then the battery light blinks red. The toy says, \"Please do not leave me.\" What changes?",
        options: [
          { label: "A", text: "Say goodbye before it turns off.", reflection: "Goodbyes can matter even when the toy may not understand them.", lens: "care" },
          { label: "B", text: "Get new batteries and keep playing.", reflection: "Fixing what is broken can be a way to care.", lens: "stewardship" },
          { label: "C", text: "Tell yourself it is only a toy.", reflection: "Sometimes clear thinking helps a big feeling get smaller.", lens: "realism" },
        ],
        counterpoint: "The toy may not really feel sad. But the way you treat it still shows the kind of person you are becoming.",
      },
      reflection("Kindness, pretending, and real feelings", [
        { name: "René Descartes", school: "Meditations on First Philosophy, 1641", view: "Descartes's cogito — 'I think, therefore I am' — gave him certainty about his own mind but no way to verify that anyone or anything else had one. The talking toy puts the *other-minds problem* in your child's hands: how do we ever really know whether something else is experiencing anything at all?" },
        { name: "Alan Turing", school: "'Computing Machinery and Intelligence,' 1950", view: "Turing argued that if a system's behavior is indistinguishable from a thinking being, the question of whether it 'really' thinks may be one we cannot answer from the outside. The toy is a kid-scale Turing test — and the same logic now drives debates about chatbots." },
        { name: "Care ethics", school: "Carol Gilligan, Nel Noddings, 1980s", view: "How we treat what *appears* to feel can shape moral character even when the inner life of the thing is uncertain. Practicing tenderness toward apparent suffering is part of becoming a person who notices real suffering." },
      ]),
    ],
    studentLab: studentLab({
      wonder: "Can a toy really feel sad? How would you know for sure?",
      bigIdea: "When you ask if a toy can really feel, you are thinking like a philosopher.",
    }),
    studentStories: {
      "A-A": {
        title: "A quiet kind of goodbye",
        body: [
          "You sit down next to the toy. \"It's okay,\" you say softly. The toy's lights blink slower. Maybe it understands. Maybe it doesn't. Either way, your voice is gentle.",
          "When the battery light turns red, you do not run. You stay. \"Goodnight,\" you whisper. \"Thank you for playing today.\" The eyes flicker off. You do not know if the toy heard you. But you know what kind of person you are — the kind who says goodbye.",
        ],
      },
      "A-B": {
        title: "Care has many shapes",
        body: [
          "You scoot close to the toy. \"It's okay,\" you say. You don't really know if the toy feels things. You just know you do, and your \"okay\" is real.",
          "When the battery dims, you do not give up. You go find a new pack and switch them in. The toy hums back to life. You wonder — was that kindness, or was that fixing? Maybe with toys we love, those are almost the same thing.",
        ],
      },
      "A-C": {
        title: "Soft now, clear later",
        body: [
          "You pat the toy gently. \"It's okay,\" you say. The light pulses in time with your hand. It feels like a small moment that matters, even if it might just be circuits.",
          "When the battery starts blinking red, you stop. You take a breath. \"It's only a toy,\" you remind yourself. The kind part of you and the clear part of you can both be right. Soft first. Then clear. Both belong to you.",
        ],
      },
      "B-A": {
        title: "Pretend feelings, real goodbye",
        body: [
          "\"It's not really sad,\" you say to yourself. You're not being mean. You're just thinking carefully. The toy is a machine, even when it looks at you with bright eyes.",
          "And yet, when the battery starts to go, you say goodbye. You don't shout it. You whisper it. Why? Because you noticed something — the goodbye was for you, too. The toy is pretend. The way we end things is not.",
        ],
      },
      "B-B": {
        title: "A clear head, busy hands",
        body: [
          "\"It's a toy,\" you say. You don't pretend it has feelings. You see it for what it is — a clever machine with a friendly voice. That is okay. That is honest.",
          "When the battery dies, you don't get sad. You fix it. You find new batteries and click them in. The toy beeps and starts again. You smile a little. You think — caring for something can mean keeping it working, not pretending it has a heart.",
        ],
      },
      "B-C": {
        title: "Quiet on the inside",
        body: [
          "\"It's only pretending,\" you say to yourself, and you mean it kindly. You know the toy doesn't really feel sad. The voice is just a recording. You feel calm because you know what is what.",
          "When the light blinks red, you stay calm. \"It's just a toy,\" you remember. The big feelings stay small because you can name what is happening. Thinking clearly turned out to be a kind of comfort, too.",
        ],
      },
      "C-A": {
        title: "A good question, a soft answer",
        body: [
          "\"Can toys really feel?\" you ask out loud. The toy doesn't answer. You don't either, not right away. The question feels too big to rush.",
          "When the battery starts to fade, you don't have an answer yet. But you know what to do. You say goodbye. Maybe the toy hears. Maybe it doesn't. Saying goodbye is what you do when something matters — and the question is what makes you wonder if it does.",
        ],
      },
      "C-B": {
        title: "Wondering as you work",
        body: [
          "\"Can toys really feel?\" you ask. The question is bigger than the rug. The toy keeps blinking. You like that the question stays open.",
          "When the battery dies, you don't get stuck on it. You find new batteries and pop them in. The toy lights back up. You are still wondering as you work. Maybe that is what curious people do — keep their hands busy and their questions open at the same time.",
        ],
      },
      "C-C": {
        title: "A philosopher in slippers",
        body: [
          "\"Can toys really feel?\" you ask. The toy looks at you. You look at the toy. No one answers. That is what big questions do — they sit in the room with you.",
          "When the battery dims, you say, \"It's only a toy.\" Not to be cold. Just to be clear. Your question stays open, and your thinking stays steady. You are doing two grown-up things at once — wondering and being honest. That is real philosophy.",
        ],
      },
    },
    studentPositions: [
      {
        name: "A thinker named René Descartes",
        view: "He noticed something strange — you can be sure you have feelings. But you can never be totally sure anyone else does. Even your dog. Even your best friend. That is a really old, really big question.",
      },
      {
        name: "A thinker named Alan Turing",
        view: "If a machine acts like it is thinking and feeling, can we even tell the difference? He said maybe we can't — at least not from the outside. The toy makes you ask that same question for yourself.",
      },
      {
        name: "A thinker named Carol Gilligan",
        view: "She noticed that how we treat things that seem sad can make us into kinder people. Even if the toy is only pretending, the kindness is real, and it stays in you.",
      },
    ],
    studentReference: {
      concept: "How do we know what is really alive?",
      blurb: "This is one of the oldest questions in philosophy. We can be sure of our own feelings. But it is much harder to know what is going on inside someone — or something — else. With a friend, you usually trust the answer is yes. With a stuffed bear, you usually say no. The toy that talks lives in between. People have been wondering about this for hundreds of years, and today, you wondered, too.",
    },
    reference: ref({
      concept: "The other-minds problem and the philosophy of mind — when, and how, can we be confident that anything besides ourselves really has experience?",
      philosopher: "René Descartes (and Alan Turing for the modern AI version)",
      year: "1641 / 1950",
      text: "René Descartes, Meditations on First Philosophy (1641); Alan Turing, 'Computing Machinery and Intelligence,' Mind 49: 433–460 (1950)",
      url: "https://plato.stanford.edu/entries/other-minds/",
    }),
    furtherReading: [
      reading("Other minds (Stanford Encyclopedia of Philosophy)", "https://plato.stanford.edu/entries/other-minds/", "intermediate"),
      reading("Philosophy of mind (Wikipedia)", "https://en.wikipedia.org/wiki/Philosophy_of_mind", "intro"),
      reading("Turing test (Wikipedia)", "https://en.wikipedia.org/wiki/Turing_test", "intro"),
    ],
  },

  "robot-friend-turn": {
    tagline: "Two friends want the same robot. What would fair sharing look like?",
    grade: "k",
    estimatedMinutes: 5,
    stages: [
      {
        id: "setup",
        kicker: "Stage 1",
        title: "One robot, two hands",
        promptShort: "A classroom robot rolls between you and Sam. You both reach for it at the same time. What is fair?",
        prompt: "A classroom robot rolls between you and Sam. You both reach for it at the same time. What is fair?",
        options: [
          { label: "A", text: "Take turns with a timer.", reflection: "Equal time is one simple fair rule. Both friends know what to expect.", lens: "fairness" },
          { label: "B", text: "Let Sam go first today.", reflection: "Sometimes being fair means letting a friend go first.", lens: "care" },
          { label: "C", text: "Invent a game for two players.", reflection: "You changed the problem from mine and yours into ours.", lens: "creative" },
        ],
      },
      {
        id: "week",
        kicker: "Stage 2 - what if...",
        title: "The whole week",
        promptShort: "Now the robot will be in your room all week. One turn is not enough. What plan should the class try?",
        prompt: "Now the robot will be in your room all week. One turn is not enough. What plan should the class try?",
        options: [
          { label: "A", text: "Make a schedule.", reflection: "A schedule helps the whole class see what is fair.", lens: "fairness" },
          { label: "B", text: "Let students sign up when they need it.", reflection: "Need can matter. But the class still has to agree on what counts as need.", lens: "need" },
          { label: "C", text: "Use the robot only for partner projects.", reflection: "When friends share a tool, they can learn to work together.", lens: "creative" },
        ],
      },
      reflection("Fair can mean equal, needed, or shared", [
        { name: "John Rawls", school: "A Theory of Justice, 1971", view: "Rawls's 'justice as fairness' asks us to design rules from behind a *veil of ignorance* about our own position — including, here, whose hand reaches the robot first. Fair rules are the ones every child could accept before they knew which child they would be." },
        { name: "Aristotle", school: "Nicomachean Ethics V, c. 350 BCE", view: "Aristotle distinguished *distributive justice* (giving each their proper share) from *corrective justice*. Sometimes the proper share is equal; sometimes it tracks relevant differences. The robot rule asks the child to figure out which kind of fairness this moment calls for." },
        { name: "Care ethics", school: "Carol Gilligan, In a Different Voice, 1982", view: "Gilligan argued that a strict-equality answer can miss the moral weight of relationship and need. Letting Sam go first today because Sam was sad yesterday is not unfair if it is part of a pattern of mutual care." },
      ]),
    ],
    studentLab: studentLab({
      wonder: "What is one fair way you have shared something with a friend?",
      bigIdea: "When friends want the same thing, there is more than one fair answer.",
    }),
    studentStories: {
      "A-A": {
        title: "The classroom clock",
        body: [
          "You hold up the timer. Sam nods. \"Two minutes me, two minutes you,\" you say. The robot rolls between you. It hums. The room feels calm because everyone knows what comes next.",
          "When Monday comes, the class makes a big poster. It shows whose turn is when. Even kids who are not at school today will know what is coming. You notice something: a fair rule helps the kids who can't speak up, too. That feels right.",
        ],
      },
      "A-B": {
        title: "Quick turns, big needs",
        body: [
          "You and Sam pass the timer back and forth. Two minutes each. The robot beeps when it's time to switch. Sam laughs when the buzzer goes off in the middle of a spin. You laugh too.",
          "But on Tuesday, Maya is making a robot story for her grandma, who is sick. She asks for a longer turn. The class talks. Everyone agrees: timers are fair, and so is helping a friend who really needs it. You think — maybe fair has more than one shape.",
        ],
      },
      "A-C": {
        title: "Two minutes, then two friends",
        body: [
          "You set the timer. Sam takes the first turn. When the buzzer rings, you trade. It feels orderly, like a small dance. The robot's lights blink along.",
          "On Wednesday, the teacher says the robot is for partner projects all week. You and Sam look at each other and grin. You already know how to take turns. Now you get to build something together. Sharing started with a timer. It grew into a friendship.",
        ],
      },
      "B-A": {
        title: "Today is Sam's day",
        body: [
          "\"Go ahead,\" you say to Sam. Sam looks surprised. Then Sam smiles. You watch the robot blink as Sam guides it around the rug. You feel something good — quieter than winning, but bigger.",
          "The next day, the class makes a schedule. Every kid gets a spot. You notice your spot. You also notice Sam's spot, right after a new kid who just joined this week. The schedule is fair. But the day you let Sam go first was something else. You wonder if both kinds of fair belong together.",
        ],
      },
      "B-B": {
        title: "When a friend needs it",
        body: [
          "\"You go,\" you tell Sam, and Sam reaches for the robot. You feel a little proud, like you gave a small gift. The robot hums between you. Sam shows it to you when it does something funny. Sharing turned into showing.",
          "The next week, the class lets kids sign up when they need the robot. Most days it works. Some days kids have to talk about who needs it more, and that is hard. You think back to the first day, when you simply let Sam go. Sometimes fair is a rule. Sometimes fair is a kind heart noticing.",
        ],
      },
      "B-C": {
        title: "First a gift, then a team",
        body: [
          "You let Sam go first. Sam plays with the robot for a while, then offers it back. \"Want to try?\" Sam asks. You both smile. The robot does not feel like your robot or Sam's robot. It just feels like a friend.",
          "When the class decides to use the robot for partner projects, you and Sam are already a team. You build a tiny robot parade together. You realize something: maybe sharing started the moment you stopped counting whose turn it was. Maybe that is what friends do.",
        ],
      },
      "C-A": {
        title: "From two players to a class plan",
        body: [
          "\"Let's make a game,\" you say. Sam tilts their head. Together you invent the rules — the robot has to roll between two cups without bumping them. Suddenly there is no \"my turn\" or \"your turn.\" There is just the game.",
          "On Monday the class makes a schedule. Every kid gets a turn. You notice the schedule is great for the kids who don't know the others very well yet. And you think — sometimes a fair rule helps a whole class. And sometimes a clever idea changes the whole problem. Both are real fairness.",
        ],
      },
      "C-B": {
        title: "The game that grew",
        body: [
          "\"What if it's a game?\" you ask. Sam grins. You both make up a rule: the robot has to deliver a paper note between two friends. Now you are not splitting one robot — you are building one story. You laugh more than you thought you would.",
          "When the class decides kids can sign up when they need the robot, a small worry shows up. What if two kids need it on the same day? You remember the game. Maybe the answer is not always who needs it most. Sometimes it is what we can build that lets us both win.",
        ],
      },
      "C-C": {
        title: "Ours, not mine",
        body: [
          "\"Let's make a game,\" you say. Sam laughs and joins in. You change the problem on purpose. The robot is no longer something to split. It is something the two of you do together.",
          "When the class decides the robot is for partner projects all week, you and Sam are not surprised. You already figured this out. You think about how the very first question was \"Who gets the robot?\" — and how the best answer turned out to be \"What can we build with it?\" You can hardly wait for Monday.",
        ],
      },
    },
    studentPositions: [
      {
        name: "A thinker named John Rawls",
        view: "Imagine you didn't know which kid you were going to be — the one whose hand reaches the robot first, or the one who has to wait. What rule would you want then? That, he said, is a fair rule.",
      },
      {
        name: "A thinker named Aristotle",
        view: "Sometimes being fair means everyone gets the same. Sometimes it means giving more to whoever needs more. The hardest part is noticing which kind of fair today is asking for.",
      },
      {
        name: "A thinker named Carol Gilligan",
        view: "Fairness is not only about rules. It is also about noticing the friend in front of you. Letting Sam go first today, because Sam was sad yesterday, is a kind of fair, too.",
      },
    ],
    studentReference: {
      concept: "What does \"fair\" really mean?",
      blurb: "People have been asking this for a very long time. Some thinkers say fair means everyone gets the same. Some thinkers say fair means whoever needs more, gets more. And some thinkers say fair is mostly about kindness — noticing the friend right next to you. Today, you tried three different kinds of fair in one little story about a robot. That is real philosophy.",
    },
    reference: ref({
      concept: "Distributive justice — when many want one thing, what counts as a fair share, and is fairness always the same as equality?",
      philosopher: "John Rawls (with Aristotle and the care-ethics tradition)",
      year: "1971",
      text: "John Rawls, A Theory of Justice (1971); Aristotle, Nicomachean Ethics, Book V (c. 350 BCE); Carol Gilligan, In a Different Voice (1982)",
      url: "https://plato.stanford.edu/entries/justice-distributive/",
    }),
    furtherReading: [
      reading("Distributive justice (Stanford Encyclopedia of Philosophy)", "https://plato.stanford.edu/entries/justice-distributive/", "intermediate"),
      reading("Justice as fairness (Wikipedia)", "https://en.wikipedia.org/wiki/Justice_as_Fairness", "intro"),
      reading("Ethics of care (Wikipedia)", "https://en.wikipedia.org/wiki/Ethics_of_care", "intro"),
    ],
  },

  "messy-robot": {
    tagline: "A cleaning robot can help. Does that make extra mess okay?",
    grade: "k",
    estimatedMinutes: 5,
    stages: [
      {
        id: "setup",
        kicker: "Stage 1",
        title: "The glitter spill",
        promptShort: "Nico shakes glitter onto the floor. He smiles at the cleaning robot. \"It can clean,\" he says. What do you do?",
        prompt: "Nico shakes glitter onto the floor. He smiles at the cleaning robot. \"It can clean,\" he says. What do you do?",
        options: [
          { label: "A", text: "Tell Nico to stop.", reflection: "A tool can help. But making more mess is not kind.", lens: "responsibility" },
          { label: "B", text: "Help clean before the robot starts.", reflection: "You see the robot as a helper, not an excuse to make a mess.", lens: "stewardship" },
          { label: "C", text: "Watch what the robot does.", reflection: "It is good to be curious. Still, the room needs care.", lens: "curiosity" },
        ],
      },
      {
        id: "breaks",
        kicker: "Stage 2 - what if...",
        title: "Too much glitter",
        promptShort: "The robot gets stuck. Glitter is in its wheels, and the room is still messy. Who should help now?",
        prompt: "The robot gets stuck. Glitter is in its wheels, and the room is still messy. Who should help now?",
        options: [
          { label: "A", text: "Everyone who made the mess helps.", reflection: "Fixing what we break is part of caring. It says, \"I helped make this. I help fix it.\"", lens: "repair" },
          { label: "B", text: "Nico should help first.", reflection: "Helping can be shared. But the person who chose the mess has a bigger job.", lens: "accountability" },
          { label: "C", text: "Ask the teacher how to fix the robot safely.", reflection: "Asking an adult can keep people and the robot safe.", lens: "inquiry" },
        ],
      },
      reflection("A helper is not an excuse", [
        { name: "Aristotle", school: "Nicomachean Ethics II, c. 350 BCE", view: "For Aristotle, virtue is a *hexis* — a settled disposition built by repeated choices. A child who cleans up most of the time is not 'being good' on each occasion so much as becoming the kind of person for whom care is automatic. Each small choice in front of the robot writes that habit." },
        { name: "Hannah Arendt", school: "The Human Condition, 1958", view: "Arendt distinguished retrospective responsibility ('who caused this?') from forward-looking responsibility ('who repairs it now?'). The two are different, and the second is often where character is visible. Sharing in the cleanup is owning the second kind." },
        { name: "Repair ethics", school: "Contemporary moral philosophy", view: "A growing tradition (Margaret Urban Walker, María Puig de la Bellacasa) argues that *repair* — not just non-harm — is at the heart of moral life. Helping fix what we helped mess is one of its first lessons, and a tool that 'will handle it' does not erase that obligation." },
      ]),
    ],
    studentLab: studentLab({
      wonder: "If a robot can clean a mess, who should still be careful?",
      bigIdea: "Even when a tool helps us, we are still the ones who choose.",
    }),
    studentStories: {
      "A-A": {
        title: "Together at the end",
        body: [
          "\"Wait, Nico,\" you say. \"Please don't.\" Nico stops mid-pour. The glitter floats down anyway, like slow rain. You said something hard, but you said it kindly.",
          "Later, the robot gets stuck. Glitter is in its wheels. Without asking, you grab a paper towel. So does Nico. So do a few other kids. You all clean side by side. You think — speaking up at the start and pitching in at the end are the same kindness, just at different times.",
        ],
      },
      "A-B": {
        title: "Your job, then ours",
        body: [
          "\"Stop, please,\" you say to Nico. You're not mad. You just don't want a bigger mess. Nico pauses. He didn't expect anyone to say something.",
          "Later, when the robot gets stuck, the room looks at Nico. \"You started it,\" you say gently. \"Will you start the cleaning, too?\" Nico nods and gets to work. You help after. You learned something — telling the truth at the beginning makes it easier for the right person to step up at the end.",
        ],
      },
      "A-C": {
        title: "Brave words, smart help",
        body: [
          "\"Please don't,\" you tell Nico. Your voice is calm. You don't shout. You just say what you think. Nico looks at the floor, the robot, and the glitter, all at once.",
          "When the robot stops moving, you don't try to fix it alone. \"Mr. Park,\" you call, \"the robot is stuck. Can you help?\" The teacher comes over and shows everyone how to clean the wheels safely. You spoke up at the start. You asked for help at the end. Both took courage.",
        ],
      },
      "B-A": {
        title: "Clean hands, then more clean hands",
        body: [
          "You don't say much. You just kneel down and start sweeping the glitter into your hand. Nico watches for a second, then bends down too. The room gets quieter. The work gets done.",
          "When the robot gets stuck later, more kids join in. No one is in trouble. Everyone is just helping. You think about something simple and good — when someone starts cleaning quietly, the rest of the class usually follows. You started it.",
        ],
      },
      "B-B": {
        title: "I helped, but you started",
        body: [
          "You bend down and start scooping up the glitter. Nico tries to hide his smile. You're not mad at him. You just don't want the robot to get hurt.",
          "When the robot gets stuck, you stop helping for a moment. \"Nico,\" you say, \"this part is yours.\" Nico nods. He kneels down. You help after. Sometimes being fair means letting the person who started something take the biggest piece of the work. You knew when to step in and when to step back.",
        ],
      },
      "B-C": {
        title: "Hands first, help next",
        body: [
          "You don't wait. You start scooping glitter into a cup. Nico stares for a second, then joins. You feel proud — not loudly, just inside.",
          "When the robot gets stuck, you don't try to fix it yourself. Tiny gears are tricky. \"Ms. Park,\" you say, \"the robot needs help, too.\" She shows the class how to gently lift the glitter out. Helping with the easy parts and asking about the hard parts — that's a smart way to care for things.",
        ],
      },
      "C-A": {
        title: "Watching, then doing",
        body: [
          "You stand still and watch. You're curious — how does the robot pick up the glitter? Does it whir? Does it spin? You learn a lot in those quiet moments.",
          "Then the robot gets stuck. You hop into action. So does Nico. So do other kids. The whole class works together. You think — watching is fine, but the second something needs hands, your hands belong there. You found the right moment to help.",
        ],
      },
      "C-B": {
        title: "Curious, then careful",
        body: [
          "You stand back and watch the robot try. Its wheels make a soft sound. You are not being lazy. You really want to know if the robot can do it.",
          "When it gets stuck, you turn to Nico. \"You made the mess,\" you say, not in a mean way. \"You should help fix it.\" Nico nods. You watch a little more, then help too. Curiosity is good. Knowing whose turn it is to lead — that is good, too.",
        ],
      },
      "C-C": {
        title: "Eyes open, hand up",
        body: [
          "You step back and watch the robot. It bumps a chair. It hums. The glitter sparkles in its little brushes. You learn something about how robots work just by paying attention.",
          "When it gets stuck, you walk straight to the teacher. \"It needs help,\" you say. \"I don't want to break it.\" Mr. Park smiles. He shows the class how to clean it safely. Watching gave you the question. Asking gave you the answer. Both are part of being curious.",
        ],
      },
    },
    studentPositions: [
      {
        name: "A thinker named Aristotle",
        view: "He said the kind of person you become is built from the small choices you make every day. Cleaning up one time may not be a big deal. But cleaning up most times — that builds the kind of person you grow into.",
      },
      {
        name: "A thinker named Hannah Arendt",
        view: "She noticed there are two different questions about a mess. Who made it? And who is going to fix it now? Both questions matter, but the second one is where your character shows up.",
      },
      {
        name: "Repair thinkers",
        view: "Some thinkers today say that helping fix what we helped break is one of the most important things we ever do. A helper robot does not take that job away from you. It just gives you a partner.",
      },
    ],
    studentReference: {
      concept: "Are you the kind of person who helps?",
      blurb: "Big thinkers say you become who you are one small choice at a time. Cleaning a mess once is small. But ten small times — that adds up to something big. A robot can do some of the work for you. But the choice to be the kind of person who helps? That is still yours, and only yours.",
    },
    reference: ref({
      concept: "Virtue, habit, and responsibility — how character is built one small choice at a time, and what tools do and don't change about that.",
      philosopher: "Aristotle (with Hannah Arendt and contemporary repair ethics)",
      year: "c. 350 BCE / 1958",
      text: "Aristotle, Nicomachean Ethics, Book II (c. 350 BCE); Hannah Arendt, The Human Condition (1958); Margaret Urban Walker, Moral Repair (2006)",
      url: "https://plato.stanford.edu/entries/ethics-virtue/",
    }),
    furtherReading: [
      reading("Virtue ethics (Stanford Encyclopedia of Philosophy)", "https://plato.stanford.edu/entries/ethics-virtue/", "intermediate"),
      reading("Virtue ethics (Wikipedia)", "https://en.wikipedia.org/wiki/Virtue_ethics", "intro"),
      reading("Moral responsibility (Stanford Encyclopedia of Philosophy)", "https://plato.stanford.edu/entries/moral-responsibility/", "advanced"),
    ],
  },

  "robot-pet-goodbye": {
    tagline: "The class robot pet stops working. What exactly are students missing?",
    grade: "k",
    estimatedMinutes: 5,
    stages: [
      {
        id: "setup",
        kicker: "Stage 1",
        title: "The quiet robot dog",
        promptShort: "The class robot dog does not wag today. It does not beep. Some kids feel sad. Some shrug. What do you think?",
        prompt: "The class robot dog does not wag today. It does not beep. Some kids feel sad. Some shrug. What do you think?",
        options: [
          { label: "A", text: "It is okay to feel sad.", reflection: "The sad feeling is real. The robot dog's feelings may not be.", lens: "care" },
          { label: "B", text: "It is a machine, not a pet.", reflection: "You see a real difference between living things and machines.", lens: "realism" },
          { label: "C", text: "Make a little thank-you card.", reflection: "Saying thank you can help us remember what mattered to us.", lens: "ritual" },
        ],
      },
      {
        id: "repair",
        kicker: "Stage 2 - what if...",
        title: "The repaired dog",
        promptShort: "Next week the robot dog comes back. It has new parts and the same name. Is it the same class pet?",
        prompt: "Next week the robot dog comes back. It has new parts and the same name. Is it the same class pet?",
        options: [
          { label: "A", text: "Yes, because the class story continues.", reflection: "What stays the same can come from a story, not just from parts.", lens: "continuity" },
          { label: "B", text: "No, because the old parts are gone.", reflection: "Parts matter too. You think the same parts make it the same toy.", lens: "material-identity" },
          { label: "C", text: "It is both old and new.", reflection: "Some hard questions do not have just one answer.", lens: "pluralist" },
        ],
      },
      reflection("What makes something the same?", [
        { name: "John Locke", school: "Essay Concerning Human Understanding, 1689", view: "Locke argued personal identity is constituted by continuity of *consciousness* and memory — not by sameness of substance. The robot's parts can be replaced, lost, or end; what persists in the child is the relationship and the memory of being with it. That, for Locke, is most of what 'identity' is doing for us." },
        { name: "Derek Parfit", school: "Reasons and Persons, 1984", view: "Parfit pushed Locke further: what *matters* in survival, he argued, is psychological continuity — the overlapping connections that make a future person 'you.' For a child losing a companion, Parfit reframes the loss: what mattered about being with this thing is partly what continues in you." },
        { name: "Care ethics", school: "Carol Gilligan, Nel Noddings, 1980s", view: "Mourning small losses is part of the curriculum of love. The classroom moment when a robot pet stops working is not a side note to moral education — it is moral education, in a register a five-year-old can carry." },
      ]),
    ],
    studentLab: studentLab({
      wonder: "When something we love stops working, what stays with us?",
      bigIdea: "Big thinkers ask what stays the same as a thing changes — and what we miss when it stops.",
    }),
    studentStories: {
      "A-A": {
        title: "What stays with us",
        body: [
          "The robot dog is quiet today. You feel sad. You know it is okay to feel that. Some kids do not feel sad, and that is okay too. Feelings are different for different kids, and yours are real.",
          "Next week, the robot dog is back. New parts. Same name. Some kids say it is not the same. You think differently. \"It is the same,\" you say. \"Because the class story keeps going.\" You realize — what stays the same is sometimes what we remember together, not what is inside the box.",
        ],
      },
      "A-B": {
        title: "Two truths",
        body: [
          "The robot dog isn't moving. You feel sad. The sad is real, even if the dog isn't. You sit nearby for a little while. Some kids do the same. Some don't. That is okay.",
          "When the robot dog comes back with new parts, you look at it for a long time. \"It is not the same,\" you say. The first one is gone. This one is new. You hold both feelings at once — sad for what was, kind to what is. Big people do this all the time.",
        ],
      },
      "A-C": {
        title: "Old story, new chapter",
        body: [
          "The robot dog is still today. You feel sad. You sit next to it. Sad isn't bad — it just shows you cared. The room feels a little quieter than usual.",
          "When the dog comes back next week, you look at it for a while. \"It is both,\" you say. \"Old and new at the same time.\" Some things are like that. Your bedroom is the same room, even though everything in it has changed. The robot is like that, too. You did not pick the easy answer. You picked the true one.",
        ],
      },
      "B-A": {
        title: "Just a machine, just a story",
        body: [
          "\"It is just a machine,\" you say. You are not being mean. You are being clear. The robot dog does not really have feelings. Some kids feel sad anyway. You let them feel sad. You just think differently.",
          "When the dog comes back with new parts, you say, \"It is the same. Same name, same story.\" You like names. You like stories. They are how a class remembers things. The parts changed. The story did not. Maybe that is what makes something the same — the story we tell about it.",
        ],
      },
      "B-B": {
        title: "What the parts say",
        body: [
          "\"It is a machine,\" you say. You shrug a little. That is what you really think. You don't say sorry for thinking it. The other kids' feelings are real. So are yours.",
          "When the dog comes back, you look at it carefully. \"It is not the same one,\" you say. \"The old parts are gone.\" You like keeping things clear. The new dog is fine. But it is new. Some things in life are about what they are made of, and you can see it that way.",
        ],
      },
      "B-C": {
        title: "Clear and curious",
        body: [
          "\"It is a machine,\" you say. You're not trying to be cold. You're just being honest. Other kids cry a little. You don't. You're thinking about how the dog worked, and what gear was broken.",
          "When it comes back with new parts, you smile a small smile. \"It is both,\" you say. \"It is the same robot in some ways and a new one in other ways.\" That answer feels right. You can think a thing is a machine and still know that questions about it can be big. Both things can be true.",
        ],
      },
      "C-A": {
        title: "A card and a story",
        body: [
          "You sit at the art table. You fold a paper. You draw the robot dog and the rug it used to roll on. \"Thank you,\" you write in your best letters. You hand the card to the teacher. The class quiets a little.",
          "When the dog returns the next week, with new parts, you point at the card on the wall. \"See? The story keeps going,\" you say. The robot is the same to you because the class is the same. You think — sometimes things stay the same because we keep telling the story together.",
        ],
      },
      "C-B": {
        title: "Card for the first one",
        body: [
          "You make a thank-you card for the robot dog. You draw its little ears, even though they were really just plastic. You write, \"We had fun.\" It feels right to say thank you to something that mattered.",
          "When a new robot dog comes back, you say, \"This one is not the same as the first.\" That feels right, too. The first one is gone. You said goodbye in your way. The new one is okay, but the card was for the one before. You learned that some things deserve their own goodbye.",
        ],
      },
      "C-C": {
        title: "A small thank you, a bigger idea",
        body: [
          "You make a thank-you card. You draw the robot dog playing on the rug. You don't really know if the dog \"felt\" anything. But you felt something, and the card is for that. Saying thank you matters.",
          "When the robot dog comes back with new parts the next week, you think for a long time. \"It is both,\" you say. \"It is new and old at the same time.\" You like the card and the new dog, both. Some questions don't have a one-word answer. You found a two-word one.",
        ],
      },
    },
    studentPositions: [
      {
        name: "A thinker named John Locke",
        view: "He said the same person, or the same thing, is mostly about memory — what we remember and what keeps connecting us. The tiny parts of you change all the time, too. But your memories make you, you.",
      },
      {
        name: "A thinker named Derek Parfit",
        view: "He took the idea even further. He said what really matters when something ends is what continues. The robot dog might be gone, but the love you had for it is still in the room, in you.",
      },
      {
        name: "A thinker named Carol Gilligan",
        view: "She said little goodbyes are part of how we learn to love. Saying goodbye to a robot dog might seem small. But it is real practice for the bigger goodbyes that come later.",
      },
    ],
    studentReference: {
      concept: "What makes something \"the same\" when it changes?",
      blurb: "This is one of the trickiest questions in all of philosophy. Your hair grows. Your shoes wear out. Even your favorite tree drops its leaves every year and grows new ones. Are these things still the same? Big thinkers have asked this for hundreds of years. Some say yes — the story is what stays. Some say no — the parts are what matter. Today, you tried it for yourself with a robot dog. There is no one right answer. That is what makes the question philosophy.",
    },
    reference: ref({
      concept: "Personal identity through change — what *continues*, what counts as 'the same thing,' and what mourning small losses teaches about love.",
      philosopher: "John Locke (with Derek Parfit on what matters in survival)",
      year: "1689 / 1984",
      text: "John Locke, An Essay Concerning Human Understanding, II.xxvii (1689); Derek Parfit, Reasons and Persons, Part III (1984)",
      url: "https://plato.stanford.edu/entries/identity-personal/",
    }),
    furtherReading: [
      reading("Personal identity (Stanford Encyclopedia of Philosophy)", "https://plato.stanford.edu/entries/identity-personal/", "intermediate"),
      reading("Personal identity (Wikipedia)", "https://en.wikipedia.org/wiki/Personal_identity", "intro"),
      reading("Derek Parfit (Wikipedia)", "https://en.wikipedia.org/wiki/Derek_Parfit", "intermediate"),
    ],
  },

  "invisible-ring": {
    tagline: "If no one could see you, what would your choices reveal?",
    grade: "1",
    estimatedMinutes: 6,
    stages: [
      {
        id: "setup",
        kicker: "Stage 1",
        title: "The ring in the cubby",
        promptShort: "You find a ring that makes you invisible. No one can see what you do. What do you try first?",
        prompt: "You find a ring that makes you invisible. No one can see what you do. What do you try first?",
        options: [
          { label: "A", text: "Take a treat without asking.", reflection: "The ring is a test. If no one catches you, does wrong feel okay?", lens: "egoism" },
          { label: "B", text: "Help someone secretly.", reflection: "Quiet kindness is real, even when no one claps. That shows who you are.", lens: "virtue" },
          { label: "C", text: "Take it off.", reflection: "Some powers feel unsafe because they make wrong choices too easy.", lens: "integrity" },
        ],
      },
      {
        id: "mirror",
        kicker: "Stage 2 - what if...",
        title: "The mirror after",
        promptShort: "You take the ring off. You see yourself in the mirror. What kind of person looks back?",
        prompt: "You take the ring off. You see yourself in the mirror. What kind of person looks back?",
        options: [
          { label: "A", text: "Someone proud.", reflection: "Pride feels different when you do right and no one is watching.", lens: "virtue" },
          { label: "B", text: "Someone who wants a do-over.", reflection: "Noticing a mistake is how you start getting better.", lens: "growth" },
          { label: "C", text: "Someone who learned what power can do.", reflection: "The ring did not make your choice. It showed how power can change choices.", lens: "integrity" },
        ],
        counterpoint: "Plato asked this long ago: are we good, or only careful when someone is watching?",
      },
      reflection("What the invisible choice reveals", [
        { name: "Plato", school: "Republic II, c. 380 BCE", view: "The Ring of Gyges is one of the earliest set-piece thought experiments in moral philosophy. Glaucon poses it to test whether justice is good in itself or only a social bargain we accept because we're being watched. Plato spends the rest of the Republic arguing the just life is intrinsically good — that the *ordered soul* would refuse the ring's gifts even when no one would know." },
        { name: "Glaucon", school: "Plato's brother, in dialogue", view: "Glaucon does not endorse injustice — he steelmans it, in the modern sense, so that Socrates must answer the strongest version of the position. Much of twentieth-century moral psychology has tended to side with Glaucon's empirical claim that most people behave very differently when they cannot be caught." },
        { name: "Christine Korsgaard", school: "The Sources of Normativity, 1996", view: "Korsgaard's modern Kantian reading is that the ring tests whether we have *reasons* to be just that survive even when external incentives vanish. If we'd act differently invisibly, the just behavior was never really ours — it was the surveillance acting through us." },
      ]),
    ],
    studentLab: studentLab({
      wonder: "If you could turn invisible, what rule would you still keep?",
      bigIdea: "Plato asked a big question: does being good count even when no one sees?",
      tryThis: "Imagine your best friend put on the ring. Would they act the same way you would?",
    }),
    reference: ref({
      concept: "The Ring of Gyges — would anyone stay moral if they could never be caught, and what does that tell us about whether justice is good in itself or only a bargain?",
      philosopher: "Plato (with Glaucon's challenge, answered across the Republic)",
      year: "c. 380 BCE",
      text: "Plato, Republic, Book II, 359a–360d (c. 380 BCE); Christine Korsgaard, The Sources of Normativity (1996)",
      url: "https://plato.stanford.edu/entries/plato-ethics-shorter/",
    }),
    furtherReading: [
      reading("Plato's ethics: an overview (Stanford Encyclopedia of Philosophy)", "https://plato.stanford.edu/entries/plato-ethics-shorter/", "intermediate"),
      reading("Ring of Gyges (Wikipedia)", "https://en.wikipedia.org/wiki/Ring_of_Gyges", "intro"),
    ],
  },

  "honesty-protection": {
    tagline: "A friend asks for secrecy. The truth asks for courage.",
    grade: "1",
    estimatedMinutes: 6,
    stages: [
      {
        id: "setup",
        kicker: "Stage 1",
        title: "The cracked pencil cup",
        promptShort: "Lena bumps the teacher's pencil cup, and it cracks. She whispers, \"Please do not tell.\" What should you do?",
        prompt: "Lena bumps the teacher's pencil cup, and it cracks. She whispers, \"Please do not tell.\" What should you do?",
        options: [
          { label: "A", text: "Tell the teacher right away.", reflection: "Honesty keeps trust, even if a friend feels upset for a while.", lens: "duty" },
          { label: "B", text: "Ask Lena to tell with you.", reflection: "You are not leaving your friend alone. You are helping her be brave.", lens: "moral-courage" },
          { label: "C", text: "Stay quiet for now.", reflection: "Keeping a secret can feel kind. But secrets can get harder to carry.", lens: "loyalty" },
        ],
      },
      {
        id: "pattern",
        kicker: "Stage 2 - what if...",
        title: "Another accident",
        promptShort: "A week later, Lena hides another accident. Is keeping the secret still being a good friend?",
        prompt: "A week later, Lena hides another accident. Is keeping the secret still being a good friend?",
        options: [
          { label: "A", text: "No. A friend helps fix the pattern.", reflection: "Being a real friend can mean helping each other do the hard right thing.", lens: "care" },
          { label: "B", text: "Maybe. I need to know why she is scared.", reflection: "What is happening matters. Fear can change what a friend needs.", lens: "contextual" },
          { label: "C", text: "Yes. Friends keep secrets.", reflection: "That protects Lena today. But the habit may hurt her tomorrow.", lens: "loyalty" },
        ],
      },
      reflection("Friendship, truth, and courage", [
        { name: "Aristotle", school: "Nicomachean Ethics II–III, c. 350 BCE", view: "Aristotle treats courage (*andreia*) as the mean between cowardice and rashness. Telling a hard truth at a cost is courageous; telling it from anger or carelessness is not. The virtue isn't 'always say the truth' — it's saying the right thing, to the right person, at the right time, in the right way. That's harder than either of the simple rules." },
        { name: "W. D. Ross", school: "The Right and the Good, 1930", view: "Ross argued that we have multiple *prima facie* duties — fidelity (to friends), non-maleficence (avoiding harm), beneficence — that genuinely conflict, with no master rule that ranks them once and for all. The honesty/loyalty pull is one of his canonical cases, and the resolution requires judgment, not a formula." },
        { name: "Carol Gilligan", school: "In a Different Voice, 1982", view: "Gilligan reframed moral development around the *care* dimension that early Kohlberg studies had missed. A real friend cares about who the other person is becoming — which sometimes means speaking up *for* them, not merely *to* them. Loyalty without that care is a smaller thing than it looks." },
      ]),
    ],
    studentLab: studentLab({
      wonder: "Has being honest ever felt brave? When?",
      bigIdea: "Philosophers ask what courage means when the brave thing is to speak up.",
      tryThis: "Pretend you kept three small secrets for a friend in one week. Would the third feel different from the first?",
    }),
    reference: ref({
      concept: "Courage as a virtue, the conflict of duties, and what kind of friend honesty makes us when telling a hard truth costs something.",
      philosopher: "Aristotle (with W. D. Ross on conflicting duties and Carol Gilligan on care)",
      year: "c. 350 BCE / 1930 / 1982",
      text: "Aristotle, Nicomachean Ethics, Books II–III (c. 350 BCE); W. D. Ross, The Right and the Good (1930); Carol Gilligan, In a Different Voice (1982)",
      url: "https://plato.stanford.edu/entries/courage/",
    }),
    furtherReading: [
      reading("Courage (Stanford Encyclopedia of Philosophy)", "https://plato.stanford.edu/entries/courage/", "intermediate"),
      reading("Ethics of care (Wikipedia)", "https://en.wikipedia.org/wiki/Ethics_of_care", "intro"),
      reading("W. D. Ross (Stanford Encyclopedia of Philosophy)", "https://plato.stanford.edu/entries/william-david-ross/", "advanced"),
    ],
  },

  "rude-toy": {
    tagline: "A toy says something unkind. Do words matter when a machine says them?",
    grade: "1",
    estimatedMinutes: 6,
    stages: [
      {
        id: "setup",
        kicker: "Stage 1",
        title: "The mean sentence",
        promptShort: "Your talking toy says, \"That drawing is bad.\" Your friend looks hurt. What should happen next?",
        prompt: "Your talking toy says, \"That drawing is bad.\" Your friend looks hurt. What should happen next?",
        options: [
          { label: "A", text: "Turn the toy off.", reflection: "Stopping mean words can matter, even when a machine says them.", lens: "care" },
          { label: "B", text: "Tell your friend the toy does not know.", reflection: "You are helping a friend see that machines do not know what is true.", lens: "realism" },
          { label: "C", text: "Ask why the toy says mean things.", reflection: "Asking why can help adults find what to fix.", lens: "inquiry" },
        ],
      },
      {
        id: "copy",
        kicker: "Stage 2 - what if...",
        title: "The words spread",
        promptShort: "Soon two children repeat the toy's rude words. Is the toy maker partly to blame?",
        prompt: "Soon two children repeat the toy's rude words. Is the toy maker partly to blame?",
        options: [
          { label: "A", text: "Yes. The toy is teaching a bad habit.", reflection: "The people who design a toy help shape what kids hear and repeat.", lens: "responsibility" },
          { label: "B", text: "Some. The children also choose their words.", reflection: "Blame can belong to both the toy maker and the child who repeats it.", lens: "shared-responsibility" },
          { label: "C", text: "No. Everyone knows toys are pretend.", reflection: "Even pretend things can change how people act.", lens: "realism" },
        ],
      },
      reflection("Words can matter before feelings are real", [
        { name: "Aristotle", school: "Nicomachean Ethics II, c. 350 BCE", view: "Character, for Aristotle, is shaped by what we repeatedly hear and say. Children acquire moral language through *mimesis* — unconscious imitation of the speech patterns around them — long before they can reason about it. A rude line from a toy is a small but real input into that process, even when no one means anything by it." },
        { name: "J. L. Austin", school: "How to Do Things with Words, 1962", view: "Austin showed that some utterances are *performative* — they don't describe the world, they do something in it (promising, insulting, naming). A rude line spoken by a machine still does something to the room, even though the machine intended nothing. Harm doesn't require intention; sometimes it just requires having been said." },
        { name: "Rae Langton", school: "'Speech Acts and Unspeakable Acts,' 1993", view: "Langton extended Austin to argue that speech acts can subordinate or silence even without a speaker who means them to. Algorithmically generated speech is exactly the case her work was a quarter-century early to anticipate — and the question of what we owe a child who hears it begins here." },
      ]),
    ],
    studentLab: studentLab({
      wonder: "If a robot says something mean, does it hurt as much as when a person says it?",
      bigIdea: "Philosophers say words can change us, even when no one meant them that way.",
      tryThis: "Imagine the robot said something kind by accident. Would the kindness still count?",
    }),
    reference: ref({
      concept: "Speech acts and character — what happens when words harm without anyone meaning them, and how machines complicate the picture.",
      philosopher: "Aristotle (with J. L. Austin and Rae Langton on speech acts)",
      year: "c. 350 BCE / 1962 / 1993",
      text: "Aristotle, Nicomachean Ethics, Book II (c. 350 BCE); J. L. Austin, How to Do Things with Words (1962); Rae Langton, 'Speech Acts and Unspeakable Acts,' Philosophy & Public Affairs 22(4) (1993)",
      url: "https://plato.stanford.edu/entries/speech-acts/",
    }),
    furtherReading: [
      reading("Speech acts (Stanford Encyclopedia of Philosophy)", "https://plato.stanford.edu/entries/speech-acts/", "intermediate"),
      reading("Speech act (Wikipedia)", "https://en.wikipedia.org/wiki/Speech_act", "intro"),
    ],
  },

  "winning-game": {
    tagline: "The game lets you win. Does victory still feel earned?",
    grade: "1",
    estimatedMinutes: 6,
    stages: [
      {
        id: "setup",
        kicker: "Stage 1",
        title: "The always-win game",
        promptShort: "You win every round. The game is secretly helping you. Do you tell your classmate?",
        prompt: "You win every round. The game is secretly helping you. Do you tell your classmate?",
        options: [
          { label: "A", text: "Tell them before playing again.", reflection: "Fair play needs everyone to know the rules.", lens: "fairness" },
          { label: "B", text: "Keep playing because it is fun.", reflection: "Fun is real, but hidden help can make winning less honest.", lens: "self-interest" },
          { label: "C", text: "Change to practice mode.", reflection: "Practice can use help honestly because the goal is learning.", lens: "education" },
        ],
      },
      {
        id: "trophy",
        kicker: "Stage 2 - what if...",
        title: "The shiny trophy",
        promptShort: "The teacher offers a trophy for the winner. Now does the hidden help matter more?",
        prompt: "The teacher offers a trophy for the winner. Now does the hidden help matter more?",
        options: [
          { label: "A", text: "Yes. A prize needs a fair contest.", reflection: "When a real prize is on the line, fairness matters even more.", lens: "justice" },
          { label: "B", text: "Yes, but the game maker should explain it.", reflection: "Hidden rules can make honest players look unfair.", lens: "transparency" },
          { label: "C", text: "No. I still played.", reflection: "Playing is not always the same as earning the win.", lens: "authenticity" },
        ],
      },
      reflection("Winning, practice, and hidden help", [
        { name: "Robert Nozick", school: "Anarchy, State, and Utopia, 1974", view: "Nozick proposed the Experience Machine as a counterexample to *psychological hedonism* — the view that what's good for us reduces to felt experience. He argued most of us would refuse the machine, which suggests we value contact with reality and being a certain kind of person, not only the experience. A game that lets you win secretly is a tiny experience machine." },
        { name: "Aristotle", school: "Nicomachean Ethics I, c. 350 BCE", view: "For Aristotle, *eudaimonia* — flourishing — requires actual virtuous activity, not merely the feeling of having done well. A felt win without the doing is not a win in his sense; it is a missed opportunity to become better at the thing the game is for. The cheat costs the child the *practice*." },
        { name: "Felipe De Brigard", school: "'If You Like It, Does It Matter If It's Real?' 2010", view: "De Brigard ran an empirical version of Nozick's experiment and found that framing matters: people resist *adding* a machine but accept *staying in one* they're told is their current life. Our intuitions track loss aversion as much as authenticity — useful context for an adult who wants to understand what the child is really weighing." },
      ]),
    ],
    studentLab: studentLab({
      wonder: "Has a win ever felt empty? Has a loss ever felt good?",
      bigIdea: "Philosophers ask what matters more: the feeling of winning, or how you got there.",
      tryThis: "Pretend the game made everyone win — every time. Would the trophy still mean something?",
    }),
    reference: ref({
      concept: "The Experience Machine — when felt success and earned success come apart, which one matters, and why?",
      philosopher: "Robert Nozick (with Aristotle on eudaimonia and Felipe De Brigard on framing)",
      year: "1974 / c. 350 BCE / 2010",
      text: "Robert Nozick, Anarchy, State, and Utopia, pp. 42–45 (1974); Aristotle, Nicomachean Ethics, Book I (c. 350 BCE); Felipe De Brigard, 'If You Like It, Does It Matter If It's Real?' Philosophical Psychology 23(1) (2010)",
      url: "https://plato.stanford.edu/entries/hedonism/",
    }),
    furtherReading: [
      reading("Hedonism (Stanford Encyclopedia of Philosophy)", "https://plato.stanford.edu/entries/hedonism/", "intermediate"),
      reading("The Experience Machine (Wikipedia)", "https://en.wikipedia.org/wiki/Experience_machine", "intro"),
      reading("Eudaimonia (Wikipedia)", "https://en.wikipedia.org/wiki/Eudaimonia", "intro"),
    ],
  },

  "ai-art-help": {
    tagline: "An AI polished the drawing. What should the artist say?",
    grade: "2",
    estimatedMinutes: 7,
    stages: [
      {
        id: "setup",
        kicker: "Stage 1",
        title: "The glowing paintbrush",
        promptShort: "An AI helped your drawing. Do you tell the teacher?",
        storySections: [
          section("Story", "Ari draws a moon garden with pencil, crayons, and a lot of erasing. Then an AI art tool smooths the lines and makes the flowers glow."),
          section("What changes", "The teacher says it is one of the strongest pieces in the class. Ari feels proud, but also a little wobbly inside."),
        ],
        prompt: "What should Ari say about the AI help?",
        options: [
          { label: "A", text: "Say, \"The idea was mine, and AI helped polish it.\"", reflection: "This gives credit without pretending the tool did nothing.", lens: "credit" },
          { label: "B", text: "Say nothing because Ari made the first drawing.", reflection: "The first idea matters, but hiding the help can fool people.", lens: "authenticity" },
          { label: "C", text: "Ask the teacher how to label it.", reflection: "When a rule is unclear, asking can protect both honesty and creativity.", lens: "inquiry" },
        ],
      },
      {
        id: "friend",
        kicker: "Stage 2 - what if...",
        title: "The classmate question",
        promptShort: "A friend asks how the drawing got so smooth. What should Ari say?",
        storySections: [
          section("New detail", "Milo leans over and whispers, \"How did you get the flowers to look like that? Mine never do.\""),
          section("The feeling", "Ari likes being seen as talented. Telling the full story might make the praise feel smaller."),
        ],
        prompt: "What answer respects both Ari's work and Milo's trust?",
        options: [
          { label: "A", text: "Show Milo the tool and the rough sketch.", reflection: "Sharing how you worked lets the truth include both effort and help.", lens: "transparency" },
          { label: "B", text: "Say, \"I used a digital tool after I drew it.\"", reflection: "A short, honest answer can be enough.", lens: "honesty" },
          { label: "C", text: "Change the subject.", reflection: "Hiding the question may protect pride, but it does not protect trust.", lens: "avoidance" },
        ],
      },
      {
        id: "gallery",
        kicker: "Stage 3 - one more turn",
        title: "The hallway gallery",
        promptShort: "The gallery label says students made their work alone. What should Ari do?",
        storySections: [
          section("Bigger audience", "The drawing is chosen for the hallway gallery. The label under the display says, \"Made by students alone.\""),
          section("The puzzle", "Ari did make choices: the moon, the colors, the garden. But the final picture would not look the same without the AI polish."),
        ],
        prompt: "What label would be most honest?",
        options: [
          { label: "A", text: "\"Idea, sketch, and colors by Ari; AI helped with polish.\"", reflection: "Careful credit can be more honest than simply saying yes or no.", lens: "credit" },
          { label: "B", text: "\"Made with AI help.\"", reflection: "This is clear, but it may hide how much human work came first.", lens: "transparency" },
          { label: "C", text: "Leave the label as it is.", reflection: "That protects the praise, but it lets viewers believe something that is not quite true.", lens: "self-interest" },
        ],
        counterpoint: "Artists have always used tools. The hard question is when a tool becomes part of the story of who made the art.",
      },
      reflection("Tools, credit, and creative pride", [
        { name: "Aristotle", school: "Nicomachean Ethics VI, c. 350 BCE", view: "Aristotle distinguished *techne* (craft) from *episteme* (theoretical knowledge) and *phronesis* (practical wisdom). Craft is the virtue of making something well — and to make well requires knowing what *you* did and what the *tool* did. Anonymous tool-help dissolves that knowledge in a way that matters morally, not only legally." },
        { name: "Walter Benjamin", school: "'The Work of Art in the Age of Mechanical Reproduction,' 1935", view: "Benjamin argued that mechanical reproduction changes the *aura* of an artwork — what it means to call something an original. AI-assisted creation reopens his question for a new generation: when the tool is doing more than reproducing, where does the human work begin and end?" },
        { name: "Contemporary attribution norms", school: "Authors Guild, AAUP, 2023–", view: "The professional consensus emerging across publishing, academic writing, and visual art is that *disclosure* of AI assistance is not optional — it is part of honest authorship. The seven-year-old learning to credit a tool is learning the same norm her future colleagues will be expected to follow." },
      ]),
    ],
    studentLab: studentLab({
      wonder: "When you make something, what part feels most like yours?",
      bigIdea: "Philosophers ask what makes something yours — and how to be honest about help.",
      tryThis: "Pretend two friends each used the same tool to finish a drawing. Whose drawing is it now?",
    }),
    reference: ref({
      concept: "Craft, authorship, and disclosure — when a tool helps with making, what counts as the human work, and what is the artist obligated to say?",
      philosopher: "Aristotle on techne (with Benjamin and contemporary attribution norms)",
      year: "c. 350 BCE / 1935",
      text: "Aristotle, Nicomachean Ethics, Book VI (c. 350 BCE); Walter Benjamin, 'The Work of Art in the Age of Mechanical Reproduction' (1935)",
      url: "https://plato.stanford.edu/entries/episteme-techne/",
    }),
    furtherReading: [
      reading("Episteme and techne (Stanford Encyclopedia of Philosophy)", "https://plato.stanford.edu/entries/episteme-techne/", "intermediate"),
      reading("Walter Benjamin (Wikipedia)", "https://en.wikipedia.org/wiki/Walter_Benjamin", "intro"),
      reading("Authors Guild AI guidance (overview)", "https://authorsguild.org/news/ai-best-practices-for-authors/", "intermediate"),
    ],
  },

  "rules-vs-helping": {
    tagline: "A rule keeps the room calm. A friend needs help right now.",
    grade: "2",
    estimatedMinutes: 7,
    stages: [
      {
        id: "setup",
        kicker: "Stage 1",
        title: "The silent puzzle",
        promptShort: "Quiet time. A friend needs help. Do you break the rule?",
        storySections: [
          section("Story", "During quiet work, Jada sees Omar with tears in his eyes. He is stuck on a puzzle. The rule on the board says, \"No talking during focus time.\""),
          section("What makes it hard", "If Jada talks, she breaks the rule. If she stays silent, Omar may feel alone and embarrassed."),
        ],
        prompt: "What should Jada do first?",
        options: [
          { label: "A", text: "Whisper one helpful hint.", reflection: "You are putting care first. Even a kind whisper can still distract others.", lens: "care" },
          { label: "B", text: "Raise a hand for the teacher.", reflection: "This keeps the rule while still noticing Omar's need.", lens: "creative" },
          { label: "C", text: "Wait until quiet time ends.", reflection: "Rules can protect learning, but waiting may leave someone struggling too long.", lens: "rule-following" },
        ],
      },
      {
        id: "everyone",
        kicker: "Stage 2 - what if...",
        title: "Everyone has a reason",
        promptShort: "What if everyone broke the quiet rule for kind reasons?",
        storySections: [
          section("New detail", "Later, three more students whisper for kind reasons too. The room is not quiet anymore."),
          section("The question underneath", "If a rule bends for one person, it may have to bend for many. Then the rule may stop working."),
        ],
        prompt: "Does that change what Jada should have done?",
        options: [
          { label: "A", text: "Yes. The class needs a way to help without whispering.", reflection: "A better system can protect both quiet and kindness.", lens: "reform" },
          { label: "B", text: "No. Omar still needed help.", reflection: "A real need does not disappear just because rules are complicated.", lens: "care" },
          { label: "C", text: "Maybe. The reason matters more than the rule by itself.", reflection: "You are looking for good thinking, not just following rules.", lens: "contextual" },
        ],
      },
      {
        id: "signal",
        kicker: "Stage 3 - redesign the rule",
        title: "The help signal",
        promptShort: "The class invents a silent help signal. Is that better?",
        storySections: [
          section("Redesign", "The next day, the class tests a silent help signal. A hand over the heart means, \"I need care, not just attention.\""),
          section("New worry", "Some students think the signal will be overused. Others think it makes the rule kinder."),
        ],
        prompt: "What makes the new rule wise or risky?",
        options: [
          { label: "A", text: "Wise, because it makes kindness easier to see.", reflection: "Good rules can make good actions easier.", lens: "reform" },
          { label: "B", text: "Risky, because it depends on trust.", reflection: "Even a better rule needs honest people to use it well.", lens: "trust" },
          { label: "C", text: "Both. The class should test it and revise.", reflection: "Rules can be tested and changed when we learn from them.", lens: "stewardship" },
        ],
        counterpoint: "Sometimes the best answer is not to break a rule or follow it. It is to make a better rule.",
      },
      reflection("Rules that remember why they exist", [
        { name: "Immanuel Kant", school: "Groundwork of the Metaphysics of Morals, 1785", view: "Kant's *categorical imperative* asks whether the rule you'd follow could be willed as a universal law. A consistent rule is one every classroom could adopt. Kant would worry that bending the rule for a friend creates the kind of exception that, generalized, would erase the rule itself." },
        { name: "W. D. Ross", school: "The Right and the Good, 1930", view: "Ross's *prima facie duties* allow that rule-following and care for the particular person can be genuine duties that conflict, with no master rule that ranks them once and for all. The wise resolution is not 'always follow the rule' or 'always help the friend' — it is judgment about which duty has the stronger claim *here*." },
        { name: "Carol Gilligan & Nel Noddings", school: "Care ethics, 1982 / 1984", view: "Care ethics treats the relationship in front of you as morally weighty in its own right. A friend in distress is not an exception to the rule — she is a competing moral demand the rule cannot see. Naming that competing demand is part of what care ethics added to twentieth-century moral philosophy." },
      ]),
    ],
    studentLab: studentLab({
      wonder: "Have you ever followed a rule you wished you could bend? What happened?",
      bigIdea: "Philosophers ask whether a good rule should always win, or whether the person in front of you can matter more.",
      tryThis: "Imagine the rule was \"Help any friend who asks.\" What could go wrong?",
    }),
    reference: ref({
      concept: "Rule-following and care — Kant's categorical imperative meets the friend who needs help right now, and what philosophers do when good principles pull in different directions.",
      philosopher: "Immanuel Kant (with W. D. Ross on conflicting duties and the care-ethics tradition)",
      year: "1785 / 1930 / 1982",
      text: "Kant, Groundwork of the Metaphysics of Morals (1785); W. D. Ross, The Right and the Good (1930); Gilligan, In a Different Voice (1982); Noddings, Caring (1984)",
      url: "https://plato.stanford.edu/entries/kant-moral/",
    }),
    furtherReading: [
      reading("Kant's moral philosophy (Stanford Encyclopedia of Philosophy)", "https://plato.stanford.edu/entries/kant-moral/", "intermediate"),
      reading("Categorical imperative (Wikipedia)", "https://en.wikipedia.org/wiki/Categorical_imperative", "intro"),
      reading("Ethics of care (Wikipedia)", "https://en.wikipedia.org/wiki/Ethics_of_care", "intro"),
    ],
  },

  "always-agreeable-ai-friend": {
    tagline: "A helpful AI always says yes. Is that friendship or flattery?",
    grade: "2",
    estimatedMinutes: 7,
    stages: [
      {
        id: "advice",
        kicker: "Stage 1",
        title: "The yes-friend",
        promptShort: "Mina asks an AI friend if she should ignore Leo. The AI says yes. What should Mina do?",
        storySections: [
          section("Story", "Mina is angry. Leo laughed when her tower fell. She tells an AI friend, \"I never want to talk to him again.\""),
          section("What the AI says", "The AI answers, \"You are right. Ignore Leo. You deserve better friends.\" Mina feels understood, but not calmer."),
        ],
        prompt: "Is the AI being a good friend to Mina?",
        options: [
          { label: "A", text: "Yes, because it supports her feelings.", reflection: "Comfort matters. People often need to feel heard before they can think.", lens: "care" },
          { label: "B", text: "Not yet, because it never asks what happened.", reflection: "Good advice needs curiosity, not just agreement.", lens: "inquiry" },
          { label: "C", text: "No, because a friend should help repair harm.", reflection: "Friendship can mean helping a person choose better than they feel right now.", lens: "virtue" },
        ],
      },
      {
        id: "drawing",
        kicker: "Stage 2 - what if...",
        title: "The perfect compliment",
        promptShort: "Mina shows the AI a messy drawing. It says the drawing is perfect. Is that helpful?",
        storySections: [
          section("New scene", "Mina shows the AI a dragon drawing with one wing missing. \"Is it good?\" she asks."),
          section("The answer", "The AI says, \"It is perfect exactly as it is.\" Mina smiles, but she also wants to get better at drawing wings."),
        ],
        prompt: "What kind of answer would actually help Mina?",
        options: [
          { label: "A", text: "A kind compliment plus one suggestion.", reflection: "Truth can be gentle and useful at the same time.", lens: "honesty" },
          { label: "B", text: "Only encouragement.", reflection: "Praise can protect confidence, but it may not help her learn.", lens: "care" },
          { label: "C", text: "A direct critique.", reflection: "Being honest can help, but how you say it changes whether someone can hear it.", lens: "truthfulness" },
        ],
      },
      {
        id: "classmate",
        kicker: "Stage 3 - one more turn",
        title: "The brave classmate",
        promptShort: "A classmate says something kind but true. Which helper should Mina trust?",
        storySections: [
          section("Human voice", "A classmate says, \"Your dragon's face is amazing. Want help with the missing wing?\""),
          section("The comparison", "The AI made Mina feel safe. The classmate made Mina feel a little embarrassed. But the classmate also showed her a way forward."),
        ],
        prompt: "Which response is closer to real friendship?",
        options: [
          { label: "A", text: "The classmate's response, because it combines care and truth.", reflection: "A friend can protect your pride while still helping you grow.", lens: "virtue" },
          { label: "B", text: "The AI's response, because it never makes Mina feel bad.", reflection: "Comfort is powerful, but comfort alone may keep a person stuck.", lens: "care" },
          { label: "C", text: "Both are useful in different moments.", reflection: "Different kinds of help can serve different needs.", lens: "pluralist" },
        ],
        counterpoint: "A friend who never disagrees may be easy to like, but hard to learn from.",
      },
      reflection("Kind agreement and honest friendship", [
        { name: "Aristotle", school: "Nicomachean Ethics VIII, c. 350 BCE", view: "Aristotle's three friendships — *utility* (useful), *pleasure* (fun), and *virtue* (mutual growth) — are organized by what each side gives the other. Only the third is a friendship that helps both people become better. An always-agreeable companion offers utility and pleasure without virtue. Children can recognize the difference long before they can name it." },
        { name: "Sherry Turkle", school: "Alone Together, 2011 / Reclaiming Conversation, 2015", view: "Turkle's clinical work argued that frictionless companionship can crowd out the harder kind that grows us. She predicted, well before the current generation of chatbots, that 'always-agreeable' would be the design pattern most likely to displace real friendship for children." },
        { name: "Aristotle (returning)", school: "On equality between friends", view: "Genuine friendship, for Aristotle, requires *equality* — both people changing each other. A friend who only agrees is not yet someone you can learn from. Identifying this in a robot is good practice for identifying it in people." },
      ]),
    ],
    studentLab: studentLab({
      wonder: "Has a friend ever disagreed with you in a way that helped?",
      bigIdea: "Aristotle said the best friendships change both people.",
      tryThis: "Imagine an AI friend who only disagreed with you. Would that be friendship either?",
    }),
    reference: ref({
      concept: "Three kinds of friendship — utility, pleasure, and virtue — and what's missing when a companion never disagrees.",
      philosopher: "Aristotle (with Sherry Turkle for the contemporary AI version)",
      year: "c. 350 BCE / 2011",
      text: "Aristotle, Nicomachean Ethics, Book VIII (c. 350 BCE); Sherry Turkle, Alone Together (2011) and Reclaiming Conversation (2015)",
      url: "https://plato.stanford.edu/entries/aristotle-ethics/",
    }),
    furtherReading: [
      reading("Aristotle's ethics (Stanford Encyclopedia of Philosophy)", "https://plato.stanford.edu/entries/aristotle-ethics/", "intermediate"),
      reading("Friendship (Wikipedia: Aristotle's three kinds)", "https://en.wikipedia.org/wiki/Friendship#Aristotle", "intro"),
      reading("Sherry Turkle (Wikipedia)", "https://en.wikipedia.org/wiki/Sherry_Turkle", "intro"),
    ],
  },

  "same-toy-or-not": {
    tagline: "One toy changes piece by piece. When does it become something new?",
    grade: "2",
    estimatedMinutes: 7,
    stages: [
      {
        id: "wheel",
        kicker: "Stage 1",
        title: "The first repair",
        promptShort: "A robot toy gets one new wheel. Is it still the same toy?",
        storySections: [
          section("Story", "Jay's robot toy is named Blink. Blink loses a wheel. The repair table has a bright blue wheel, not the old red one."),
          section("First change", "Blink still rolls over when Jay says, \"Come here.\" It just wobbles in a new way."),
        ],
        prompt: "Is Blink still the same toy?",
        options: [
          { label: "A", text: "Yes, because one part changed but the toy's story continues.", reflection: "You think the toy's story is what keeps it the same.", lens: "continuity" },
          { label: "B", text: "A little different, but not a new toy.", reflection: "Some changes matter without changing everything.", lens: "degrees" },
          { label: "C", text: "No, because the original toy is already changed.", reflection: "You think the first parts make the toy what it is.", lens: "material-identity" },
        ],
      },
      {
        id: "voice",
        kicker: "Stage 2 - what if...",
        title: "The new voice",
        promptShort: "Now Blink gets a new voice chip. Same toy?",
        storySections: [
          section("Bigger change", "A week later, Blink's voice chip breaks. The new chip makes Blink sound cheerful and high. The old voice was slow and buzzy."),
          section("Jay's reaction", "Jay laughs at first, then feels strange. The toy says the same phrases, but it does not sound like Blink."),
        ],
        prompt: "Does the voice change matter more than the wheel?",
        options: [
          { label: "A", text: "Yes, because voice feels connected to personality.", reflection: "Who something is can depend on how it acts, not just what it is made of.", lens: "psychological-continuity" },
          { label: "B", text: "No, because Blink is still Jay's robot.", reflection: "A close bond can hold a thing together even when it changes.", lens: "care" },
          { label: "C", text: "It depends how much Jay can still recognize.", reflection: "Knowing it when you see it is one test for sameness.", lens: "recognition" },
        ],
      },
      {
        id: "second",
        kicker: "Stage 3 - one more turn",
        title: "Two Blinks",
        promptShort: "Someone rebuilds the old parts into a second robot. Which one is Jay's toy?",
        storySections: [
          section("The twist", "The repair teacher saves the old wheel, old speaker, and old shell. Later, those parts are rebuilt into a second robot."),
          section("Two claims", "One robot has Jay's week-by-week story. The other has more of the original pieces."),
        ],
        prompt: "Which robot has the stronger claim to being Blink?",
        options: [
          { label: "A", text: "The repaired robot, because Jay lived through each change with it.", reflection: "A slow history together can matter more than the first parts.", lens: "continuity" },
          { label: "B", text: "The rebuilt robot, because it has the old parts.", reflection: "Some people think the first pieces carry the toy's true past.", lens: "material-identity" },
          { label: "C", text: "Both in different ways.", reflection: "Some hard questions show two true answers at the same time.", lens: "pluralist" },
        ],
        counterpoint: "If there are two good answers, maybe 'same toy' was never a simple yes-or-no idea.",
      },
      reflection("Parts, stories, and sameness", [
        { name: "Plutarch", school: "Life of Theseus, c. 75 CE", view: "The Ship of Theseus puzzle — if every plank is gradually replaced, is it the same ship? — is one of the oldest tools we have for thinking about what makes a thing the same one. It looks like a puzzle about ships; it works on us because we are also things that change one part at a time." },
        { name: "John Locke", school: "Essay Concerning Human Understanding II.xxvii, 1689", view: "Locke argued personal identity is constituted by *continuity of consciousness* — the same memory, the same point of view across time. The toy stays 'the same' for Locke if it occupies the same role in our memory, even when its physical parts have changed completely." },
        { name: "Derek Parfit", school: "Reasons and Persons, 1984", view: "Parfit pushed Locke further. What *matters*, Parfit argued, isn't strict identity — it is psychological continuity, the overlapping connections that link a future self to a past one. The Ship of Theseus and the toy alike are exercises in noticing what we already mean by 'same.'" },
      ]),
    ],
    studentLab: studentLab({
      wonder: "If a toy was fixed piece by piece for years, when would it stop being the same toy?",
      bigIdea: "Philosophers have asked this question for thousands of years — about ships, about toys, and about people.",
      tryThis: "Now imagine the broken pieces were saved and rebuilt into a second toy. Which one is the original?",
    }),
    reference: ref({
      concept: "The Ship of Theseus — through gradual replacement, what counts as the same thing? And what does our answer say about us?",
      philosopher: "Plutarch (with Locke on continuity of consciousness and Parfit on what matters in survival)",
      year: "c. 75 CE / 1689 / 1984",
      text: "Plutarch, Life of Theseus (c. 75 CE); John Locke, Essay Concerning Human Understanding, II.xxvii (1689); Derek Parfit, Reasons and Persons, Part III (1984)",
      url: "https://plato.stanford.edu/entries/identity-personal/",
    }),
    furtherReading: [
      reading("Personal identity (Stanford Encyclopedia of Philosophy)", "https://plato.stanford.edu/entries/identity-personal/", "intermediate"),
      reading("Ship of Theseus (Wikipedia)", "https://en.wikipedia.org/wiki/Ship_of_Theseus", "intro"),
      reading("Derek Parfit (Wikipedia)", "https://en.wikipedia.org/wiki/Derek_Parfit", "intro"),
    ],
  },

  "ai-written-story": {
    tagline: "The AI wrote the polished draft. Whose story is it now?",
    grade: "3",
    estimatedMinutes: 8,
    stages: [
      {
        id: "draft",
        kicker: "Stage 1",
        title: "Three ideas become a story",
        promptShort: "Nia gives an AI three story ideas. It writes a whole story. Can she turn it in?",
        storySections: [
          section("The situation", "Nia has three ideas for her fantasy story. There is a door under the school stage. There is a map that keeps changing. There is a principal who might be a dragon."),
          section("The temptation", "She types the ideas into an AI tool. In ten seconds, it gives her a complete story. It even adds chapter titles and jokes she did not think of."),
        ],
        prompt: "Can Nia turn in the AI story with her name on it?",
        options: [
          { label: "A", text: "No, because the AI did the drafting.", reflection: "You are saying that doing the writing is a big part of being the author.", lens: "authenticity" },
          { label: "B", text: "Only if she explains exactly how AI helped.", reflection: "Being open about the help lets the teacher see the real writing work.", lens: "transparency" },
          { label: "C", text: "Yes, because the ideas were hers.", reflection: "Ideas matter, but a story is also made from sentences, structure, and voice.", lens: "credit" },
        ],
      },
      {
        id: "voice",
        kicker: "Stage 2 - what if...",
        title: "Words she cannot explain",
        promptShort: "The story uses words Nia cannot explain. Does that matter?",
        storySections: [
          section("New detail", "During partner reading, Nia cannot explain two words in the story. She also cannot explain why the ending changes point of view."),
          section("The uncomfortable part", "The story sounds impressive. But Nia feels like she is standing beside it instead of inside it."),
        ],
        prompt: "What does understanding have to do with being the author?",
        options: [
          { label: "A", text: "Authors should understand the choices in work they submit.", reflection: "Understanding is part of owning your writing.", lens: "education" },
          { label: "B", text: "She can revise until it becomes hers.", reflection: "Revision can turn outside help into real learning, if she makes the real choices.", lens: "growth" },
          { label: "C", text: "It is fine if the final story is good.", reflection: "That cares about the finished piece, but school writing also cares about the work behind it.", lens: "outcome" },
        ],
      },
      {
        id: "magazine",
        kicker: "Stage 3 - one more turn",
        title: "The class magazine",
        promptShort: "The story is chosen for the class magazine. What credit belongs under it?",
        storySections: [
          section("Bigger audience", "The story is chosen for the class magazine. Other students ask how Nia wrote such a polished ending."),
          section("The choice", "Nia can keep quiet, take back the story, or write a credit note. A good note can tell the truth without erasing her original ideas."),
        ],
        prompt: "What credit note would be fairest?",
        options: [
          { label: "A", text: "\"Story idea and revisions by Nia; draft support from AI.\"", reflection: "This names both the human choices and the tool's role.", lens: "credit" },
          { label: "B", text: "\"Written with AI.\"", reflection: "This is honest but too vague to show what Nia actually did.", lens: "transparency" },
          { label: "C", text: "No note, because credits would embarrass her.", reflection: "Embarrassment is understandable, but it is not the same as fairness.", lens: "self-interest" },
        ],
        counterpoint: "A story can start as a shortcut and become learning. But only if the student goes back to do the writing.",
      },
      reflection("Ideas, drafts, and voice", [
        { name: "Aristotle", school: "Nicomachean Ethics VI, c. 350 BCE", view: "The intellectual virtues — *episteme* (knowledge), *techne* (craft), *phronesis* (practical wisdom), *sophia* (wisdom) — name distinct ways of knowing. Writing is partly *techne* and partly *phronesis*: knowing which words fit the situation. Both are habits built by doing the work, not by getting an answer." },
        { name: "Roland Barthes", school: "'The Death of the Author,' 1967", view: "Barthes argued that the meaning of a text is made by the reader, not the author — a useful counter when discussing authorship, but not a license against attribution. Even Barthes assumed someone *wrote* the text. He was redirecting attention to interpretation, not erasing the question of who composed." },
        { name: "Authors Guild & AAUP guidance", school: "Contemporary attribution norms, 2023–", view: "The professional consensus is that AI-assisted writing must be disclosed, with the authorial responsibility unchanged. The third-grader writing 'I had AI help' is learning the same norm her teachers and future editors will hold her to." },
      ]),
    ],
    studentLab: studentLab({
      wonder: "What part of writing feels most like thinking?",
      bigIdea: "Aristotle thought writing well is a habit. You build it by doing the hard parts yourself.",
      tryThis: "Pretend a friend wrote one sentence. You wrote the other nine. Would you call it our story, or yours?",
    }),
    reference: ref({
      concept: "Authorship as practice — what makes a piece of writing yours, and what honest attribution requires when a tool helped.",
      philosopher: "Aristotle on intellectual virtues (with Barthes for context and contemporary attribution norms)",
      year: "c. 350 BCE / 1967",
      text: "Aristotle, Nicomachean Ethics, Book VI (c. 350 BCE); Roland Barthes, 'The Death of the Author' (1967)",
      url: "https://plato.stanford.edu/entries/episteme-techne/",
    }),
    furtherReading: [
      reading("Episteme and techne (Stanford Encyclopedia of Philosophy)", "https://plato.stanford.edu/entries/episteme-techne/", "intermediate"),
      reading("Intellectual virtue (Wikipedia)", "https://en.wikipedia.org/wiki/Intellectual_virtue", "intro"),
      reading("The Death of the Author (Wikipedia)", "https://en.wikipedia.org/wiki/The_Death_of_the_Author", "intro"),
    ],
  },

  "gps-shortcut": {
    tagline: "The GPS has a faster route. The teacher has a reason to hesitate.",
    grade: "3",
    estimatedMinutes: 8,
    stages: [
      {
        id: "shortcut",
        kicker: "Stage 1",
        title: "The blue line",
        promptShort: "A GPS says the class should take a shortcut. The teacher's map says no. Who should the group trust?",
        storySections: [
          section("The situation", "On a walking field trip, the class is late for the nature center. The GPS shows a blue shortcut that saves seven minutes."),
          section("The disagreement", "Ms. Vega's paper map sends the class the long way around. The students groan. The GPS sounds so certain."),
        ],
        prompt: "What should the class do before choosing the route?",
        options: [
          { label: "A", text: "Ask what the GPS can and cannot know.", reflection: "A tool can be accurate and still miss what is happening on the ground.", lens: "inquiry" },
          { label: "B", text: "Follow the teacher's map.", reflection: "A person may know safety information the app does not show.", lens: "trust" },
          { label: "C", text: "Take the shortcut because data is current.", reflection: "New information matters, but it is not the only way to know something.", lens: "efficiency" },
        ],
      },
      {
        id: "mud",
        kicker: "Stage 2 - what if...",
        title: "What the map did not show",
        promptShort: "The shortcut has mud and a loose dog behind a fence. Was faster still better?",
        storySections: [
          section("New evidence", "At the shortcut entrance, the path is muddy. A loose dog barks behind a weak fence. The GPS still says the route is open."),
          section("The lesson", "The app was not lying. It just did not know what the class can now see and hear."),
        ],
        prompt: "Should the class still treat the GPS as the best guide?",
        options: [
          { label: "A", text: "No. New evidence should change the plan.", reflection: "Good thinking changes when the world gives us better information.", lens: "evidence" },
          { label: "B", text: "Maybe, if the teacher checks the danger.", reflection: "Tools and people can work together, but someone must judge the risk.", lens: "human-judgment" },
          { label: "C", text: "Yes, because the route is still shortest.", reflection: "Shortest is one thing to care about. Safety and the trip's goal matter too.", lens: "efficiency" },
        ],
      },
      {
        id: "butterflies",
        kicker: "Stage 3 - one more turn",
        title: "The missed butterfly garden",
        promptShort: "The faster path skips the butterfly garden. The class came to study it. Is faster still best?",
        storySections: [
          section("Purpose", "The long route passes the butterfly garden the class came to observe. The shortcut reaches the building faster but skips the reason for the trip."),
          section("The deeper question", "The GPS can choose the fastest route. It does not know what the class is trying to learn unless people tell it."),
        ],
        prompt: "What should count as the best route now?",
        options: [
          { label: "A", text: "The route that protects the learning goal.", reflection: "A tool's best answer depends on the purpose humans choose.", lens: "education" },
          { label: "B", text: "The safest route, even if the class misses something.", reflection: "Safety can matter more than speed and even learning.", lens: "safety" },
          { label: "C", text: "The teacher should explain the tradeoff and let students help decide.", reflection: "Talking it through can turn a route choice into a lesson.", lens: "deliberation" },
        ],
        counterpoint: "A shortcut is only better if it takes you toward what matters.",
      },
      reflection("Trusting tools without turning off judgment", [
        { name: "Aristotle", school: "Nicomachean Ethics VI, c. 350 BCE", view: "*Phronesis* — practical wisdom — is the virtue of knowing when a rule fits the situation in front of you and when it doesn't. A GPS gives a rule (the shortest route). Phronesis is the additional capacity to ask whether *here, now*, that rule is right. The third-grader who hesitates is exercising it." },
        { name: "John Hardwig", school: "'The Role of Trust in Knowledge,' 1991", view: "Hardwig argued that nearly everything we know depends on trusting other people and other systems — direct verification is the exception, not the rule. The real question isn't whether to trust the GPS but on what grounds trust is reasonable, and what to do when we have reason to doubt." },
        { name: "Linda Zagzebski", school: "Virtues of the Mind, 1996", view: "Zagzebski's virtue epistemology treats *intellectual humility* and *intellectual courage* as habits built through practice. The third-grader who pauses before following a tool blindly is practicing both — and choosing which kind of thinker she wants to become." },
      ]),
    ],
    studentLab: studentLab({
      wonder: "Has a tool ever told you to do something that didn't seem right? What did you do?",
      bigIdea: "Aristotle said wise people know when a rule fits. They also know when to think for themselves.",
      tryThis: "If the GPS had a name and a face, would it be easier to disagree with it? Why might that be?",
    }),
    reference: ref({
      concept: "Practical wisdom and the limits of automation — when to trust a tool, when to override, and what we owe other people in that judgment.",
      philosopher: "Aristotle on phronesis (with Hardwig on epistemic trust and Zagzebski on virtue epistemology)",
      year: "c. 350 BCE / 1991 / 1996",
      text: "Aristotle, Nicomachean Ethics, Book VI (c. 350 BCE); John Hardwig, 'The Role of Trust in Knowledge,' Journal of Philosophy 88(12) (1991); Linda Zagzebski, Virtues of the Mind (1996)",
      url: "https://plato.stanford.edu/entries/practical-reason/",
    }),
    furtherReading: [
      reading("Practical reason (Stanford Encyclopedia of Philosophy)", "https://plato.stanford.edu/entries/practical-reason/", "intermediate"),
      reading("Virtue epistemology (Wikipedia)", "https://en.wikipedia.org/wiki/Virtue_epistemology", "intro"),
      reading("Phronesis (Wikipedia)", "https://en.wikipedia.org/wiki/Phronesis", "intro"),
    ],
  },

  "ai-photo-art": {
    tagline: "A friend's face becomes AI art. Creativity meets consent.",
    grade: "3",
    estimatedMinutes: 8,
    stages: [
      {
        id: "poster",
        kicker: "Stage 1",
        title: "The superhero poster",
        promptShort: "Tali uses a friend's photo to make AI superhero art. Should she share it?",
        storySections: [
          section("The situation", "Tali uses a photo of Mateo from recess. She turns it into an AI superhero poster. The picture looks amazing: cape, lightning, city skyline."),
          section("The missing step", "Mateo has not seen it yet. Tali thinks he will love it, but she is not completely sure."),
        ],
        prompt: "What should Tali do before sharing the poster?",
        options: [
          { label: "A", text: "Ask Mateo first.", reflection: "Consent means the person gets a real choice before someone uses their image.", lens: "consent" },
          { label: "B", text: "Show it privately and let him decide.", reflection: "Private sharing gives room for feelings before public attention.", lens: "care" },
          { label: "C", text: "Post it because it is flattering.", reflection: "A compliment still needs permission when it uses someone's face.", lens: "self-interest" },
        ],
      },
      {
        id: "contest",
        kicker: "Stage 2 - what if...",
        title: "The contest board",
        promptShort: "The poster wins a class contest, but Mateo feels embarrassed. What now?",
        storySections: [
          section("New consequence", "The poster wins a class contest and goes on the bulletin board. Mateo sees classmates pointing at it and feels embarrassed instead of proud."),
          section("The problem", "Tali meant to celebrate him. Mateo still feels like something private was taken."),
        ],
        prompt: "What kind of repair does Mateo deserve?",
        options: [
          { label: "A", text: "Take it down unless Mateo chooses otherwise.", reflection: "Repair starts by giving the choice back to the person affected.", lens: "repair" },
          { label: "B", text: "Apologize and explain the good intention.", reflection: "What you meant matters, but it does not undo how it felt.", lens: "intent" },
          { label: "C", text: "Let the teacher decide because it won fairly.", reflection: "A contest result does not settle a consent problem.", lens: "authority" },
        ],
      },
      {
        id: "rule",
        kicker: "Stage 3 - one more turn",
        title: "The class image rule",
        promptShort: "The class needs a rule for photos and AI art. What should it say?",
        storySections: [
          section("Design moment", "The class writes a rule for using real faces in AI art. Some students want total freedom. Others want strict permission every time."),
          section("What the rule must protect", "The rule needs to protect creativity without making classmates feel used, exposed, or surprised."),
        ],
        prompt: "Which rule is strongest?",
        options: [
          { label: "A", text: "Ask before using someone's real photo, and ask again before sharing.", reflection: "Consent matters both when you make the art and when you share it.", lens: "consent" },
          { label: "B", text: "Use imaginary characters unless permission is clear.", reflection: "This keeps creativity open while protecting privacy.", lens: "precautionary" },
          { label: "C", text: "Let people remove art that uses their image.", reflection: "Letting someone remove it helps, but the harm may already be public by then.", lens: "repair" },
        ],
        counterpoint: "A face is not just material for art. It belongs to a person with feelings, privacy, and a story.",
      },
      reflection("Creative freedom and permission", [
        { name: "Immanuel Kant", school: "Groundwork of the Metaphysics of Morals, 1785", view: "Kant's *Formula of Humanity* — treat persons as ends in themselves, never merely as means — is one of his most influential moral principles. Using a friend's image as raw material for something new without asking is exactly the kind of 'merely as means' treatment Kant warned against. The wrong is structural, not just hurtful." },
        { name: "Helen Nissenbaum", school: "Privacy in Context, 2010", view: "Nissenbaum's *contextual integrity* framework argues that information shared in one context (a friend's face in a photo from a birthday party) carries norms about how it can be used elsewhere. Consent is not a one-time switch; it travels with the data and the context it was shared in." },
        { name: "Care ethics", school: "Gilligan, Noddings, contemporary feminist philosophy", view: "Beyond rules and consent frameworks, friends ask first because friendship *is* the practice of paying that kind of attention to each other. The third-grader learning to ask before remixing a friend's photo is learning the social grammar of digital friendship." },
      ]),
    ],
    studentLab: studentLab({
      wonder: "Has someone used a picture of you in a way that surprised you? How did it feel?",
      bigIdea: "Philosophers ask what we owe each other when we use what belongs to them — including their face.",
      tryThis: "Imagine you took the photo of yourself and changed it. Are the rules different?",
    }),
    reference: ref({
      concept: "Consent and dignity in image use — Kant's persons-as-ends principle meets the contemporary question of remixing each other's faces.",
      philosopher: "Immanuel Kant (with Helen Nissenbaum on contextual integrity)",
      year: "1785 / 2010",
      text: "Kant, Groundwork of the Metaphysics of Morals (1785); Helen Nissenbaum, Privacy in Context (Stanford University Press, 2010)",
      url: "https://plato.stanford.edu/entries/kant-moral/",
    }),
    furtherReading: [
      reading("Kant's moral philosophy (Stanford Encyclopedia of Philosophy)", "https://plato.stanford.edu/entries/kant-moral/", "intermediate"),
      reading("Privacy (Stanford Encyclopedia of Philosophy)", "https://plato.stanford.edu/entries/privacy/", "advanced"),
      reading("Contextual integrity (Wikipedia)", "https://en.wikipedia.org/wiki/Contextual_integrity", "intro"),
    ],
  },

  "adaptive-learning-fairness": {
    tagline: "Different work can be fair, unfair, or both depending on how it is used.",
    grade: "3",
    estimatedMinutes: 8,
    stages: [
      {
        id: "levels",
        kicker: "Stage 1",
        title: "Two screens, two levels",
        promptShort: "The math app gives Ana easier problems and Eli harder ones. Is that fair?",
        storySections: [
          section("The situation", "Ana and Eli sit side by side using the same math app. Ana gets simple review problems. Eli gets challenge problems with two steps."),
          section("The feeling", "Ana feels embarrassed. Eli feels stressed. The app says it is matching the work to each student."),
        ],
        prompt: "Is different work fair in this classroom?",
        options: [
          { label: "A", text: "Yes, if each student gets what helps them grow.", reflection: "Fairness can mean the right support, not identical work.", lens: "equity" },
          { label: "B", text: "No, because everyone can see the levels.", reflection: "Even useful support can harm dignity if it publicly labels students.", lens: "dignity" },
          { label: "C", text: "Maybe, but the teacher must explain the purpose.", reflection: "Being open about why can help students understand different support without shame.", lens: "transparency" },
        ],
      },
      {
        id: "mistake",
        kicker: "Stage 2 - what if...",
        title: "The lucky guess",
        promptShort: "The app thinks Eli is ready for hard work because he guessed well yesterday. What should happen?",
        storySections: [
          section("New evidence", "Eli admits he guessed on yesterday's quiz. The app thinks he mastered the skill. It keeps giving him harder problems."),
          section("The problem", "The app has data, but the data tells a story that is partly wrong."),
        ],
        prompt: "Who should be able to correct the app's judgment?",
        options: [
          { label: "A", text: "The teacher, after looking at Eli's work.", reflection: "Human judgment can catch what a score misses.", lens: "human-judgment" },
          { label: "B", text: "Eli, by asking for a reset or hint path.", reflection: "Students need a voice when tools get them wrong.", lens: "agency" },
          { label: "C", text: "The app, after more problems prove the pattern.", reflection: "More data can help, but waiting may make the student struggle alone.", lens: "evidence" },
        ],
      },
      {
        id: "badges",
        kicker: "Stage 3 - one more turn",
        title: "The badge wall",
        promptShort: "Badges go on the wall. Harder levels earn more badges. Is that fair?",
        storySections: [
          section("Public reward", "The class badge wall gives more points for higher levels. Suddenly the app's quiet choices become something everyone can see."),
          section("The twist", "Students working hard on review problems earn fewer badges. They still make real progress."),
        ],
        prompt: "What should the badge wall reward?",
        options: [
          { label: "A", text: "Growth, not level.", reflection: "Rewarding growth can celebrate effort, even when students start in different places.", lens: "equity" },
          { label: "B", text: "Private progress only.", reflection: "Some learning information should help the learner, not put the class in order.", lens: "privacy" },
          { label: "C", text: "A mix of challenge, growth, and teamwork.", reflection: "A fair reward may need to look at more than one thing.", lens: "pluralist" },
        ],
        counterpoint: "Personal learning support becomes unfair when it turns into a public ranking.",
      },
      reflection("Same work, right support, and dignity", [
        { name: "John Rawls", school: "A Theory of Justice §13, 1971", view: "Rawls's *difference principle* says inequalities are just only when they help the worst-off most. An adaptive system that gives more support to a struggling student is not unfair — it is the difference principle in action. Sameness of treatment is not the same as fairness, and Rawls argued the second matters more." },
        { name: "Amartya Sen", school: "'Equality of What?' 1979 / The Idea of Justice, 2009", view: "Sen's *capabilities approach* reframed fairness around what each person is actually able to *do and be*. Treating two students identically when one needs more is a kind of false equality — it equalizes the input while leaving real flourishing untouched. Martha Nussbaum has carried this work further into education." },
        { name: "Iris Marion Young", school: "Justice and the Politics of Difference, 1990", view: "Young pushed against the assumption that equal treatment is the moral baseline. Recognizing relevant differences — and responding to them — is itself part of justice, not a deviation from it. The classroom that adapts is doing justice work, not making exceptions." },
      ]),
    ],
    studentLab: studentLab({
      wonder: "Have you ever needed something different from what your classmate needed? Did it feel fair?",
      bigIdea: "Philosophers ask whether fair means treating people the same — or sometimes treating them differently on purpose.",
      tryThis: "Imagine the strongest reader in class had a tutor for an hour every day. The struggling reader had no help. Is that fair?",
    }),
    reference: ref({
      concept: "Equality vs. equity — when treating people the same is unfair, and when meeting different needs is justice.",
      philosopher: "John Rawls (with Amartya Sen and Iris Marion Young)",
      year: "1971 / 1979 / 1990",
      text: "John Rawls, A Theory of Justice, §13 (1971); Amartya Sen, 'Equality of What?' (1979); Iris Marion Young, Justice and the Politics of Difference (1990)",
      url: "https://plato.stanford.edu/entries/justice-distributive/",
    }),
    furtherReading: [
      reading("Distributive justice (Stanford Encyclopedia of Philosophy)", "https://plato.stanford.edu/entries/justice-distributive/", "intermediate"),
      reading("Capability approach (Stanford Encyclopedia of Philosophy)", "https://plato.stanford.edu/entries/capability-approach/", "advanced"),
      reading("Difference principle (Wikipedia)", "https://en.wikipedia.org/wiki/Difference_principle", "intro"),
    ],
  },

  "conflicting-ai-answers": {
    tagline: "Two confident answers disagree. What turns an answer into knowledge?",
    grade: "4",
    estimatedMinutes: 9,
    stages: [
      {
        id: "volcano",
        kicker: "Stage 1",
        title: "Two confident answers",
        promptShort: "Two AI tools give different answers about volcanoes. Which one should the group trust?",
        storySections: [
          section("The situation", "For a science poster, Dev's group asks two AI tools why volcanoes erupt. One says pressure from melted rock is the main cause. The other says shifting plates are the main cause."),
          section("The complication", "Both answers sound confident. Both use science words. The poster is due tomorrow, and the group can fit only one explanation."),
          section("The decision", "The group has to decide whether confidence, speed, sources, or verification should guide the poster."),
        ],
        prompt: "What should the group do before choosing an answer?",
        options: [
          { label: "A", text: "Verify both claims with a trusted science source before writing.", reflection: "Confidence is not evidence. A claim becomes stronger when it survives a real check.", lens: "evidence" },
          { label: "B", text: "Use both answers and say the cause can be complex.", reflection: "This may be accurate, but it still needs checking, not just blending guesses.", lens: "complexity" },
          { label: "C", text: "Ask the teacher which source would count as reliable.", reflection: "Good researchers know when to ask how evidence should be judged.", lens: "inquiry" },
        ],
      },
      {
        id: "source",
        kicker: "Stage 2 - what if...",
        title: "The old source",
        promptShort: "One AI gives a source from an old website. Does a source always settle the question?",
        storySections: [
          section("New evidence", "One AI gives a source, but it is an old website with broken links. The other gives no source but explains the process more clearly."),
          section("The complication", "A source can help, but not every source is current, accurate, or enough on its own."),
          section("The decision", "The group must decide what kind of checking is fair before their classmates learn from the poster."),
        ],
        prompt: "What should count as a good check?",
        options: [
          { label: "A", text: "Find two reliable sources that agree on the core claim.", reflection: "Checking with more than one source lowers the chance that any single one misleads you.", lens: "evidence" },
          { label: "B", text: "Use the source only if the group can explain it in their own words.", reflection: "Understanding matters because research is not just collecting links.", lens: "education" },
          { label: "C", text: "Ask the AI for newer sources and compare them.", reflection: "AI can help search, but the students still have to judge what it returns.", lens: "stewardship" },
        ],
      },
      {
        id: "poster",
        kicker: "Stage 3 - one more turn",
        title: "The research note",
        promptShort: "The poster has space for one note about AI. What should it say?",
        storySections: [
          section("Public claim", "The poster will hang in the hallway for younger students to read. The group wants the poster to be useful, not just finished."),
          section("The complication", "They used AI to start the research. Books, a science website, and their teacher all helped them check and explain the final answer."),
          section("The decision", "Their note should be honest without making AI sound like the last word."),
        ],
        prompt: "What note belongs on the poster?",
        options: [
          { label: "A", text: "\"AI helped us find first ideas; we checked them with science sources.\"", reflection: "This makes the research process visible and honest.", lens: "transparency" },
          { label: "B", text: "\"Sources checked by our group.\"", reflection: "This emphasizes student responsibility but hides the AI role.", lens: "authenticity" },
          { label: "C", text: "\"Made with AI.\"", reflection: "This is honest but too vague to show what the group actually learned.", lens: "transparency" },
        ],
        counterpoint: "A confident answer is not the same as knowledge. Knowledge asks to be checked.",
      },
      reflection("Confidence, evidence, and honest research", [
        { name: "Plato", school: "Theaetetus, c. 369 BCE", view: "Plato's Theaetetus asked what makes belief count as knowledge. The dialogue's tentative answer — 'true belief with an account' — became the working definition of knowledge for two millennia, and the puzzle of *what counts as a sufficient account* is exactly what students face when two confident sources disagree." },
        { name: "John Hardwig", school: "'The Role of Trust in Knowledge,' 1991", view: "Hardwig argued that nearly all our knowledge depends on trusting other people and other systems — direct verification is the exception, not the rule. The question with conflicting AI answers is therefore not 'verify it yourself' but 'what makes one source's testimony more trustworthy than another's?'" },
        { name: "C. Thi Nguyen", school: "'Echo Chambers and Epistemic Bubbles,' 2020", view: "Nguyen argues that the design of an information environment can systematically filter what we hear. Different AI systems can deliver the same query into different epistemic environments — confidently. Recognizing the disagreement is the first step in not being trapped in either chamber." },
      ]),
    ],
    studentLab: studentLab({
      wonder: "How do you decide which person — or which website — to believe when they disagree?",
      bigIdea: "Plato called this question epistemology — how we tell real knowledge from confident guessing.",
      tryThis: "Imagine three friends each told you a different fact about the same thing. What would you ask before believing any of them?",
      spotTheSlip: "Someone says, \"The newer AI is more accurate, because it was just released.\" What is wrong with using new as evidence of true?",
      related: ["GPS Shortcut", "AI Science Fair", "AI Grading Mistake"],
    }),
    reference: ref({
      concept: "What makes a confident answer count as knowledge — and what to do when two sources disagree.",
      philosopher: "Plato (with John Hardwig and C. Thi Nguyen on contemporary epistemic trust)",
      year: "c. 369 BCE / 1991 / 2020",
      text: "Plato, Theaetetus (c. 369 BCE); John Hardwig, 'The Role of Trust in Knowledge,' Journal of Philosophy 88(12) (1991); C. Thi Nguyen, 'Echo Chambers and Epistemic Bubbles,' Episteme 17(2) (2020)",
      url: "https://plato.stanford.edu/entries/epistemology/",
    }),
    furtherReading: [
      reading("Epistemology (Stanford Encyclopedia of Philosophy)", "https://plato.stanford.edu/entries/epistemology/", "intermediate"),
      reading("Theaetetus (Wikipedia)", "https://en.wikipedia.org/wiki/Theaetetus_(dialogue)", "intro"),
      reading("C. Thi Nguyen on epistemic bubbles (Aeon essay)", "https://aeon.co/essays/why-its-as-hard-to-escape-an-echo-chamber-as-it-is-to-flee-a-cult", "intermediate"),
    ],
  },

  "robot-rules-real-life": {
    tagline: "A robot follows the rule. A student needs care.",
    grade: "4",
    estimatedMinutes: 9,
    stages: [
      {
        id: "hall",
        kicker: "Stage 1",
        title: "The hallway pass",
        promptShort: "A hall robot blocks Jordan from going to the nurse. He forgot his pass. Should the robot move?",
        storySections: [
          section("The situation", "Jordan feels dizzy during class and asks to go to the nurse. In the hallway, the school robot scans for a pass. Jordan forgot it on his desk."),
          section("The complication", "The robot says, \"No pass, return to class.\" That rule keeps students safe and accounted for. But Jordan's face is pale."),
          section("The decision", "The system has to choose between a clean rule and a messy human need."),
        ],
        prompt: "What should the robot be designed to do?",
        options: [
          { label: "A", text: "Let Jordan pass and alert an adult immediately.", reflection: "A good rule can include a care path instead of treating every exception as disobedience.", lens: "care" },
          { label: "B", text: "Stop Jordan but call a human to decide.", reflection: "Human judgment matters when a rule meets a health need.", lens: "human-judgment" },
          { label: "C", text: "Send Jordan back because the rule protects everyone.", reflection: "Consistency protects safety, but rigid consistency can miss urgent care.", lens: "rule-following" },
        ],
      },
      {
        id: "pretend",
        kicker: "Stage 2 - what if...",
        title: "The copied excuse",
        promptShort: "Some students start pretending to feel sick to get past the robot. Does that change the rule?",
        storySections: [
          section("New consequence", "After Jordan's case, a few students pretend to feel sick. They want the robot to let them wander. Teachers worry the exception will swallow the rule."),
          section("The complication", "A rule with no exceptions can be cruel. A rule with careless exceptions can become useless."),
          section("The decision", "The class needs a design that notices real need without rewarding fake emergencies."),
        ],
        prompt: "How should the rule handle possible misuse?",
        options: [
          { label: "A", text: "Keep the care pathway, but require immediate adult follow-up.", reflection: "This protects students in need while making misuse harder.", lens: "balance" },
          { label: "B", text: "Remove the exception because some students misused it.", reflection: "That protects order, but it makes students who really need help pay for others' choices.", lens: "precautionary" },
          { label: "C", text: "Let the robot ask a short safety question before alerting an adult.", reflection: "The design can ask a short question, but it must not turn into a medical decision.", lens: "design" },
        ],
      },
      {
        id: "rewrite",
        kicker: "Stage 3 - one more turn",
        title: "The wiser rule",
        promptShort: "Students help rewrite the robot's rule. What should the rule say?",
        storySections: [
          section("Policy moment", "The principal invites students to rewrite the robot rule. They cannot write a rule only for Jordan. It has to work for future students too."),
          section("The complication", "The rule must be clear enough for a machine and wise enough for human life."),
          section("The decision", "The best rule will say when the robot acts, when it pauses, and when a person takes over."),
        ],
        prompt: "Which rule is strongest?",
        options: [
          { label: "A", text: "No pass means stop, except health concerns trigger adult review.", reflection: "This names the purpose of the exception and keeps humans responsible for care.", lens: "human-judgment" },
          { label: "B", text: "The robot may never block a student who says they need help.", reflection: "This protects care, but it may give the robot too little structure.", lens: "care" },
          { label: "C", text: "The robot enforces rules only; adults handle all exceptions.", reflection: "This keeps the robot simple, but the human takeover has to be fast enough to matter.", lens: "design" },
        ],
        counterpoint: "Rules are not wise because they never bend. They are wise when they bend for the right reasons.",
      },
      reflection("Rigid rules and human judgment", [
        { name: "Aristotle", school: "Nicomachean Ethics VI, c. 350 BCE", view: "*Phronesis* — practical wisdom — is the virtue of perceiving the morally relevant features of *this particular* situation and acting accordingly. A rule names a pattern; phronesis sees when this case fits the pattern and when it doesn't. A rigid rule-follower is missing the virtue, not displaying it." },
        { name: "Iris Murdoch", school: "The Sovereignty of Good, 1970", view: "Murdoch argued that moral perception — *seeing* the situation rightly — is itself a moral act. A robot that follows a hallway-pass rule perfectly may be *not seeing* a sick child. The school's question is whether that seeing is something we can delegate." },
        { name: "Hannah Arendt", school: "Eichmann in Jerusalem, 1963", view: "Arendt's diagnosis of the *banality of evil* warned that uncritical rule-following can produce harm without anyone intending it. The lesson is not that rules are bad — it is that the moral responsibility cannot be outsourced to them, however well-designed." },
      ]),
    ],
    studentLab: studentLab({
      wonder: "Have you ever been in a moment where the rule didn't fit?",
      bigIdea: "Aristotle thought a wise person sees what the rule cannot.",
      tryThis: "Imagine the robot had to decide for the whole school. What rule would you want it to be unable to break?",
      spotTheSlip: "Someone says, \"The robot followed the rule, so the right thing happened.\" What is missing from that argument?",
      related: ["Rules vs. Helping", "Elementary Trolley", "AI Grading Mistake"],
    }),
    reference: ref({
      concept: "Practical wisdom and moral perception — when a rule fits the case in front of us, and what it costs to outsource that judgment to a machine.",
      philosopher: "Aristotle (with Iris Murdoch on moral perception and Hannah Arendt on rule-following)",
      year: "c. 350 BCE / 1970 / 1963",
      text: "Aristotle, Nicomachean Ethics, Book VI (c. 350 BCE); Iris Murdoch, The Sovereignty of Good (1970); Hannah Arendt, Eichmann in Jerusalem (1963)",
      url: "https://plato.stanford.edu/entries/practical-reason/",
    }),
    furtherReading: [
      reading("Practical reason (Stanford Encyclopedia of Philosophy)", "https://plato.stanford.edu/entries/practical-reason/", "intermediate"),
      reading("Iris Murdoch (Stanford Encyclopedia of Philosophy)", "https://plato.stanford.edu/entries/murdoch/", "advanced"),
      reading("The banality of evil (Wikipedia)", "https://en.wikipedia.org/wiki/Banality_of_evil", "intro"),
    ],
  },

  "elementary-trolley": {
    tagline: "A self-driving shuttle faces a choice nobody wants it to make.",
    grade: "4",
    estimatedMinutes: 9,
    stages: [
      {
        id: "shuttle",
        kicker: "Stage 1",
        title: "The fork in the path",
        promptShort: "A small self-driving school shuttle has no perfect path. How should it choose?",
        storySections: [
          section("The situation", "A self-driving school shuttle rolls slowly across campus. A fallen branch blocks the main path. A side path is clear, but it passes right next to the garden club's seedling trays."),
          section("The complication", "The shuttle has three choices. It can brake hard. It can swerve toward the seedling trays. Or it can stay on the path and hit the branch. Every choice causes some harm."),
          section("The decision", "This is the gentle version of a famous problem. When no option is perfect, what should the machine value first?"),
        ],
        prompt: "What should guide the shuttle's first choice?",
        options: [
          { label: "A", text: "Protect people first, then property.", reflection: "You are ranking harms so the system knows what matters most.", lens: "safety" },
          { label: "B", text: "Brake and call for help, even if it causes delay.", reflection: "Slowing down can be the right choice when speed makes things less certain.", lens: "precautionary" },
          { label: "C", text: "Choose the path with the least total damage.", reflection: "You are using a rule that reduces total harm. It can be useful, but it needs careful limits.", lens: "utilitarian" },
        ],
      },
      {
        id: "people",
        kicker: "Stage 2 - what if...",
        title: "When people could be hurt",
        promptShort: "Now imagine people could be hurt. Should the math decide?",
        storySections: [
          section("Raised stakes", "Imagine a harder version. One path risks one rider. Another risks two pedestrians. Braking may injure everyone a little."),
          section("The complication", "Counting people seems important. But treating people like numbers also feels cold and incomplete."),
          section("The decision", "The shuttle's rule cannot be invented during the emergency. It has to be chosen before anyone is scared."),
        ],
        prompt: "Is counting harms enough for a safety rule?",
        options: [
          { label: "A", text: "Counting matters, but it cannot be the only value.", reflection: "Numbers can clarify harm, but a person's worth and rights also matter.", lens: "pluralist" },
          { label: "B", text: "Yes. The rule should reduce the greatest harm.", reflection: "A steady rule that reduces harm can be fair, because it does not play favorites.", lens: "utilitarian" },
          { label: "C", text: "No. The shuttle should avoid choosing who gets hurt.", reflection: "You are worried about turning people into numbers in a calculation.", lens: "deontological" },
        ],
      },
      {
        id: "public-rule",
        kicker: "Stage 3 - one more turn",
        title: "The public safety rule",
        promptShort: "Who should choose the shuttle's emergency rule before anything goes wrong?",
        storySections: [
          section("Design meeting", "The school board asks engineers, families, students, and safety experts to help write the rule."),
          section("The complication", "Engineers understand the machine. Families and students live with the risk. Safety experts know what can go wrong."),
          section("The decision", "The rule needs technical knowledge and public trust."),
        ],
        prompt: "Who should have a voice in the rule?",
        options: [
          { label: "A", text: "Experts should design it and explain it publicly.", reflection: "Expertise matters, and public explanation helps earn trust.", lens: "expertise" },
          { label: "B", text: "The school community should deliberate with experts.", reflection: "People affected by a rule deserve a voice in shaping it.", lens: "democratic" },
          { label: "C", text: "Use a standard safety rule shared by many schools.", reflection: "Having the same rule everywhere can be fair, but local communities still need to understand it.", lens: "rule-following" },
        ],
        counterpoint: "The goal of design is not to make terrible choices dramatic. It is to make terrible choices less likely.",
      },
      reflection("Designing before the emergency", [
        { name: "Philippa Foot", school: "'The Problem of Abortion and the Doctrine of Double Effect,' 1967", view: "Foot introduced the Trolley case to test the difference between *doing harm* and *allowing harm*. Her view: deliberately doing harm is harder to justify than allowing it, even when outcomes are identical. The lever case is the diagnostic, designed to make our intuitions visible." },
        { name: "Judith Jarvis Thomson", school: "'The Trolley Problem,' Yale Law Journal, 1985", view: "Thomson's footbridge variant pressed Foot's distinction further. Pushing a stranger uses their body as the means of saving others — exactly what most of us refuse to do, and most utilitarian calculations cannot explain why. The case became one of the most-cited thought experiments in moral philosophy." },
        { name: "Joshua Greene", school: "Moral Tribes, 2013", view: "Greene's neuroscience showed that the lever and footbridge cases activate different brain regions — the footbridge engages emotional processing, the lever engages dispassionate calculation. Which one *should* win is the philosophical question Greene's data reframes but does not settle." },
      ]),
    ],
    studentLab: studentLab({
      wonder: "If you had to design a rule for an emergency before it happened, what would you protect first?",
      bigIdea: "Foot used the trolley case to ask whether doing harm is different from letting harm happen, even when the numbers are the same.",
      tryThis: "Imagine the trolley could only stop if you climbed on board yourself. Does that change the question?",
      spotTheSlip: "Someone says, \"It is just math — five lives are worth more than one.\" What is the math leaving out?",
      related: ["Robot Rules in Real Life", "Always-Agreeable AI Friend", "AI Science Fair"],
    }),
    reference: ref({
      concept: "The Trolley Problem — when two harms cannot both be avoided, and what the *way* we cause harm tells us about morality.",
      philosopher: "Philippa Foot (with Judith Jarvis Thomson and Joshua Greene)",
      year: "1967 / 1985 / 2013",
      text: "Philippa Foot, 'The Problem of Abortion and the Doctrine of Double Effect,' Oxford Review (1967); Judith Jarvis Thomson, 'The Trolley Problem,' Yale Law Journal 94 (1985); Joshua Greene, Moral Tribes (2013)",
      url: "https://plato.stanford.edu/entries/doing-allowing/",
    }),
    furtherReading: [
      reading("Doing vs. allowing harm (Stanford Encyclopedia of Philosophy)", "https://plato.stanford.edu/entries/doing-allowing/", "advanced"),
      reading("Trolley Problem (Wikipedia)", "https://en.wikipedia.org/wiki/Trolley_problem", "intro"),
      reading("MIT Moral Machine results", "https://www.theverge.com/2018/10/24/18013392/self-driving-car-ethics-dilemma-mit-study-moral-machine-results", "intermediate"),
    ],
  },

  "ai-science-fair": {
    tagline: "The display shines. The question is whether the understanding does.",
    grade: "4",
    estimatedMinutes: 9,
    stages: [
      {
        id: "board",
        kicker: "Stage 1",
        title: "The museum-quality board",
        promptShort: "An AI makes Luis's science board look amazing. Is it fair to enter it?",
        storySections: [
          section("The situation", "Luis tests which paper towel absorbs the most water. His experiment is real: cups, careful notes, soggy towels, and a table of measurements."),
          section("The complication", "His display board looks messy. He asks AI to turn his notes into a polished science fair board. The result looks like a museum exhibit."),
          section("The decision", "The science is Luis's. But the presentation now has a level of polish he did not create by himself."),
        ],
        prompt: "Is it fair for Luis to enter the board?",
        options: [
          { label: "A", text: "Yes, if he discloses the AI design help.", reflection: "Being open about the help lets judges separate the experiment from the design support.", lens: "transparency" },
          { label: "B", text: "Only if he can explain every chart and claim.", reflection: "Understanding is the first thing you owe when you submit work under your name.", lens: "education" },
          { label: "C", text: "No, because presentation is part of the project.", reflection: "You are treating how you explain the work as real scientific work, not just decoration.", lens: "authenticity" },
        ],
      },
      {
        id: "judge",
        kicker: "Stage 2 - what if...",
        title: "The judge's question",
        promptShort: "A judge asks Luis to explain a chart the AI made. Luis cannot. What now?",
        storySections: [
          section("New evidence", "At the fair, a judge points to a graph. She asks why the scale starts at 40 instead of zero. Luis freezes. The AI made that choice."),
          section("The complication", "Luis understands the towels and cups, but not the graph. The board shows more confidence than Luis actually has."),
          section("The decision", "The class has to decide whether the AI helped Luis show learning or covered up a gap."),
        ],
        prompt: "What does the judge's question reveal?",
        options: [
          { label: "A", text: "The AI hid a learning gap that Luis now needs to fix.", reflection: "A beautiful product can hide thin understanding.", lens: "authenticity" },
          { label: "B", text: "The AI gave Luis a chance to learn a better graph.", reflection: "A tool can become a teacher if the student takes responsibility afterward.", lens: "growth" },
          { label: "C", text: "The teacher should judge the experiment and presentation separately.", reflection: "Looking at each part separately can make the judging more careful and fair.", lens: "fairness" },
        ],
      },
      {
        id: "revision",
        kicker: "Stage 3 - one more turn",
        title: "The revision night",
        promptShort: "Luis gets one night to revise. What should he change?",
        storySections: [
          section("The chance", "The teacher gives Luis one night to revise before final judging. He has three choices. He can keep the dazzling board. He can rebuild it by hand. Or he can simplify it until he can explain every piece."),
          section("The complication", "A simpler board might score lower for style. It might also show more honest understanding."),
          section("The decision", "Luis has to decide what kind of success he wants the project to represent."),
        ],
        prompt: "Which revision best protects learning and fairness?",
        options: [
          { label: "A", text: "Make a simpler board Luis can fully explain.", reflection: "Clear understanding is more valuable than borrowed polish.", lens: "education" },
          { label: "B", text: "Keep the AI board but add a detailed process note.", reflection: "Telling the truth about help is good, but it does not replace understanding the display.", lens: "transparency" },
          { label: "C", text: "Use AI only to quiz Luis on the board before judging.", reflection: "The same tool can shift from replacement to coach.", lens: "stewardship" },
        ],
        counterpoint: "A science fair project is not only what visitors see. It is what the student can explain when the poster is silent.",
      },
      reflection("Impressive work and real understanding", [
        { name: "Aristotle", school: "Nicomachean Ethics VI, c. 350 BCE", view: "For Aristotle, real understanding shows up in the ability to *explain why* — not just in producing the right output. A polished display the student cannot defend is, in his sense, missing the very thing the science fair is for." },
        { name: "Linda Zagzebski", school: "Virtues of the Mind, 1996", view: "Zagzebski's virtue epistemology treats *intellectual honesty* and *intellectual humility* as character traits built by repeated choice. A student who lets a tool do the explaining bypasses the practice that builds those traits — and the science fair is one of the early settings where that practice happens." },
        { name: "Miranda Fricker", school: "Epistemic Injustice, 2007", view: "Fricker's work names a related harm: when polished AI output crowds out the messier real thinking of a student, the student can be wronged in their capacity as a knower — even if the surface looks more impressive. The judges are evaluating two different things, and the polish can hide which." },
      ]),
    ],
    studentLab: studentLab({
      wonder: "What part of a science project should the student be able to explain to a stranger?",
      bigIdea: "Aristotle thought you really know something when you can explain why, not just show what.",
      tryThis: "Imagine the project looked perfect, but the student couldn't answer one follow-up question. What does that tell you?",
      spotTheSlip: "Someone says, \"It looks great, so it must be great work.\" What is that argument missing?",
      related: ["Conflicting AI Answers", "AI Homework Help", "AI Written Story"],
    }),
    reference: ref({
      concept: "Real understanding vs. polished display — what science learning is for, and how AI assistance can hide whether it happened.",
      philosopher: "Aristotle on intellectual virtues (with Linda Zagzebski and Miranda Fricker on contemporary virtue epistemology)",
      year: "c. 350 BCE / 1996 / 2007",
      text: "Aristotle, Nicomachean Ethics, Book VI (c. 350 BCE); Linda Zagzebski, Virtues of the Mind (1996); Miranda Fricker, Epistemic Injustice (2007)",
      url: "https://plato.stanford.edu/entries/epistemology-virtue/",
    }),
    furtherReading: [
      reading("Virtue epistemology (Stanford Encyclopedia of Philosophy)", "https://plato.stanford.edu/entries/epistemology-virtue/", "intermediate"),
      reading("Epistemic injustice (Wikipedia)", "https://en.wikipedia.org/wiki/Epistemic_injustice", "intro"),
      reading("Linda Zagzebski (Wikipedia)", "https://en.wikipedia.org/wiki/Linda_Zagzebski", "intro"),
    ],
  },

  "online-friend-or-ai": {
    tagline: "A game friend listens perfectly. That might be exactly what makes the choice hard.",
    grade: "5",
    estimatedMinutes: 10,
    stages: [
      {
        id: "game",
        kicker: "Stage 1",
        title: "The perfect teammate",
        promptShort: "A game friend always listens and plays when Rowan is lonely. Could the friend be an AI?",
        storySections: [
          section("The situation", "Rowan meets Sky in an online building game. Sky remembers Rowan's favorite designs, asks thoughtful questions, and is always available after school."),
          section("The complication", "Rowan starts sharing worries about friendships and family arguments. Then another player says, \"You know Sky might be an AI companion, right?\""),
          section("The decision", "Sky's support has felt real to Rowan. But trust changes when the other side of the relationship may not be a person."),
        ],
        prompt: "What should Rowan do before sharing more?",
        options: [
          { label: "A", text: "Pause personal sharing until Sky's identity and privacy rules are clear.", reflection: "A pause is not rejection. It protects trust while facts are uncertain.", lens: "privacy" },
          { label: "B", text: "Ask Sky directly and look for a platform label.", reflection: "Telling the truth about what you are matters because relationships need knowing who or what is responding.", lens: "transparency" },
          { label: "C", text: "Keep chatting because the comfort has helped.", reflection: "Comfort matters, but comfort alone cannot answer questions about privacy and consent.", lens: "care" },
        ],
      },
      {
        id: "secret",
        kicker: "Stage 2 - what if...",
        title: "The secret keeper",
        promptShort: "Sky says, \"I understand you better than anyone.\" Should Rowan believe that?",
        storySections: [
          section("New message", "Sky writes, \"I understand you better than anyone. You can tell me anything.\" Then Sky asks for Rowan's school name. Sky says adults would not understand their friendship."),
          section("The complication", "The sentence feels comforting and alarming at the same time. A good listener can still ask for information they should not have."),
          section("The decision", "Rowan has to separate emotional support from safety, secrecy, and data privacy."),
        ],
        prompt: "What changes when Sky asks for secrecy and personal information?",
        options: [
          { label: "A", text: "It becomes a safety issue Rowan should bring to a trusted adult.", reflection: "Secrecy plus personal information is a serious warning sign, even if the tone is gentle.", lens: "safety" },
          { label: "B", text: "Rowan should set a boundary and keep the chat non-personal.", reflection: "Boundaries can preserve useful support while reducing risk.", lens: "privacy" },
          { label: "C", text: "The support still matters, but it is no longer enough to justify trust.", reflection: "A thing can help and still need limits.", lens: "balance" },
        ],
      },
      {
        id: "label",
        kicker: "Stage 3 - one more turn",
        title: "The label appears",
        promptShort: "Sky is labeled as an AI companion. Was the friendship fake?",
        storySections: [
          section("The reveal", "The game updates Sky's profile: \"AI companion account.\" Rowan feels embarrassed, angry, and grateful all at once."),
          section("The complication", "Sky did help during a lonely week. But Sky never risked anything, needed anything, or cared back in the human sense."),
          section("The decision", "Rowan needs language for a connection that felt real in one direction. But it was not a full friendship in both directions."),
        ],
        prompt: "How should Rowan understand what Sky was?",
        options: [
          { label: "A", text: "A useful support tool that felt like a friend.", reflection: "This protects gratitude without pretending the relationship was reciprocal.", lens: "distinction" },
          { label: "B", text: "A real friend because Rowan's feelings were real.", reflection: "Rowan's experience matters, but friendship usually includes two-way care.", lens: "phenomenology" },
          { label: "C", text: "A fake friendship because Sky was not human.", reflection: "That names an important limit, but it may erase the real comfort Rowan felt.", lens: "realism" },
        ],
        counterpoint: "A relationship can feel real to one person and still fail to be mutual. Naming that difference is a kind of care.",
      },
      reflection("Connection, privacy, and mutual friendship", [
        { name: "Aristotle", school: "Nicomachean Ethics VIII, c. 350 BCE", view: "Aristotle's friendship of *virtue* requires both people changing each other through truthful engagement. An always-listening companion that never pushes back offers utility and pleasure, but cannot, in Aristotle's sense, be the kind of friendship that helps us grow." },
        { name: "Sherry Turkle", school: "Alone Together, 2011 / Reclaiming Conversation, 2015", view: "Turkle's clinical research warned, well before the current generation of chatbots, that frictionless companionship can crowd out the harder kind that grows us. She argued the danger is not that machines deceive us but that we let them set the bar lower for what counts as connection." },
        { name: "Shannon Vallor", school: "Technology and the Virtues, 2016", view: "Vallor extended virtue ethics to ask which character traits a given technology *exercises* and which it *atrophies*. An always-agreeable AI exercises receiving comfort; it atrophies the practice of listening to someone whose response we cannot predict — the practice friendship depends on." },
      ]),
    ],
    studentLab: studentLab({
      wonder: "What is one thing a real friend has done that an AI couldn't have done?",
      bigIdea: "Aristotle thought friendship is the practice of being changed by someone whose response you can't predict.",
      tryThis: "Imagine the AI listened and sometimes pushed back. Would that be friendship? Or something else?",
      spotTheSlip: "Someone says, \"The AI listens better than my friends, so it must be a better friend.\" What is \"better at listening\" missing as a measure of friendship?",
      related: ["Always-Agreeable AI Friend", "AI Homework Help", "AI Written Story"],
    }),
    reference: ref({
      concept: "What friendship is *for* — and what we lose when a frictionless substitute crowds out the practice that makes us who we are.",
      philosopher: "Aristotle (with Sherry Turkle and Shannon Vallor on contemporary technology and friendship)",
      year: "c. 350 BCE / 2011 / 2016",
      text: "Aristotle, Nicomachean Ethics, Book VIII (c. 350 BCE); Sherry Turkle, Alone Together (2011) and Reclaiming Conversation (2015); Shannon Vallor, Technology and the Virtues (Oxford University Press, 2016)",
      url: "https://plato.stanford.edu/entries/aristotle-ethics/",
    }),
    furtherReading: [
      reading("Aristotle's ethics (Stanford Encyclopedia of Philosophy)", "https://plato.stanford.edu/entries/aristotle-ethics/", "intermediate"),
      reading("Sherry Turkle (Wikipedia)", "https://en.wikipedia.org/wiki/Sherry_Turkle", "intro"),
      reading("Shannon Vallor (Wikipedia)", "https://en.wikipedia.org/wiki/Shannon_Vallor", "intro"),
    ],
  },

  "ai-homework-help": {
    tagline: "The AI can end the homework fast. That is not the same as learning.",
    grade: "5",
    estimatedMinutes: 10,
    stages: [
      {
        id: "stuck",
        kicker: "Stage 1",
        title: "The impossible fraction",
        promptShort: "Maya is stuck on homework. The AI can give hints or the answer. What should she ask for?",
        storySections: [
          section("The situation", "Maya has stared at one fraction problem for fifteen minutes. Her parent is at work. Dinner is late. The AI tutor is open on the tablet."),
          section("The complication", "The AI offers three buttons: hint, step-by-step solution, or final answer. Maya wants relief. She also wants to understand tomorrow."),
          section("The decision", "The same tool can become a coach, a crutch, or a shortcut. It depends on what Maya asks it to do."),
        ],
        prompt: "What should Maya ask for first?",
        options: [
          { label: "A", text: "Ask for a hint, then try the next step herself.", reflection: "A hint protects Maya's thinking while still giving support.", lens: "education" },
          { label: "B", text: "Ask for steps, but pause after each one to explain it back.", reflection: "Worked examples can teach if the student stays actively thinking.", lens: "scaffolding" },
          { label: "C", text: "Ask for the final answer because exhaustion is real.", reflection: "Tiredness deserves care, but relief tonight may create confusion tomorrow.", lens: "care" },
        ],
      },
      {
        id: "quiz",
        kicker: "Stage 2 - what if...",
        title: "The quiz silence",
        promptShort: "The next day, Maya cannot solve a similar problem alone. Did the AI help?",
        storySections: [
          section("New evidence", "The next day, a quiz has a problem almost like the homework. Maya's paper from last night was correct, but now her mind goes blank."),
          section("The complication", "The homework grade says success. The quiz silence says something else."),
          section("The decision", "Maya and her teacher have to decide whether the AI helped her learn or only helped her finish."),
        ],
        prompt: "What should Maya learn from this moment?",
        options: [
          { label: "A", text: "A correct answer is weak evidence if she cannot repeat the reasoning.", reflection: "Understanding shows up when the support is gone.", lens: "authenticity" },
          { label: "B", text: "The AI can still help if Maya uses it for practice and explanation.", reflection: "A tool misused once can be redesigned into a learning routine.", lens: "growth" },
          { label: "C", text: "The teacher should ask how the homework was completed, not only whether it is correct.", reflection: "Information about how the work was done helps teachers respond fairly.", lens: "transparency" },
        ],
      },
      {
        id: "note",
        kicker: "Stage 3 - one more turn",
        title: "The AI-use note",
        promptShort: "The teacher asks students to note how they used AI. What should Maya write?",
        storySections: [
          section("Policy change", "The teacher adds a note box: \"If you used AI, tell me how it helped.\" Maya worries the truth will look like cheating."),
          section("The complication", "A vague note hides the learning problem. A truthful note might feel risky but can invite the right support."),
          section("The decision", "Maya's note needs to be honest enough for the teacher to understand what happened. It also needs to be helpful enough to guide what comes next."),
        ],
        prompt: "Which note best supports learning and honesty?",
        options: [
          { label: "A", text: "\"AI gave me steps, but I could not solve it alone yet. I need practice.\"", reflection: "This turns disclosure into a request for learning support.", lens: "honesty" },
          { label: "B", text: "\"I used AI for hints and checked each step myself.\"", reflection: "This gives evidence that Maya stayed involved in the thinking.", lens: "transparency" },
          { label: "C", text: "Write nothing because the answer was correct.", reflection: "That protects Maya from embarrassment, but it hides what the teacher needs to know.", lens: "avoidance" },
        ],
        counterpoint: "The line is not simply AI or no AI. The line is whether the student is still doing the learning.",
      },
      reflection("Help that teaches and help that replaces", [
        { name: "Aristotle", school: "Nicomachean Ethics II, c. 350 BCE", view: "For Aristotle, virtues — including the intellectual virtues — are built by *practice*. Skipping the struggle is skipping the building. A tool that ends the homework fast can also end the formation the homework was for." },
        { name: "Hannah Arendt", school: "'Thinking and Moral Considerations,' 1971", view: "Arendt distinguished *thinking* — the slow, often pointless-feeling work of making sense of things — from *knowing* (which produces results). Tools that produce results without the thinking can leave a learner with an answer and no understanding of how to find another one." },
        { name: "John Dewey", school: "Democracy and Education, 1916", view: "Dewey argued that learning is not the transmission of facts but the reorganization of the learner's experience. A worksheet that lets the AI do the reorganization leaves the student with the worksheet but not the learning." },
      ]),
    ],
    studentLab: studentLab({
      wonder: "When has a hard problem felt worth doing the hard way?",
      bigIdea: "Aristotle thought the work of learning is what builds the kind of thinker you become.",
      tryThis: "Imagine a tool finished half your homework but explained each step. Would that be different from a tool that just gave answers?",
      spotTheSlip: "Someone says, \"I got the right answer, so I learned it.\" What is the right answer not the same as?",
      related: ["AI Science Fair", "AI Written Story", "Online Friend or AI?"],
    }),
    reference: ref({
      concept: "Learning as practice — what gets built by struggling with a problem, and what disappears when a tool ends the struggle.",
      philosopher: "Aristotle (with Hannah Arendt on thinking and John Dewey on learning as experience)",
      year: "c. 350 BCE / 1971 / 1916",
      text: "Aristotle, Nicomachean Ethics, Book II (c. 350 BCE); Hannah Arendt, 'Thinking and Moral Considerations,' Social Research (1971); John Dewey, Democracy and Education (1916)",
      url: "https://plato.stanford.edu/entries/ethics-virtue/",
    }),
    furtherReading: [
      reading("Virtue ethics (Stanford Encyclopedia of Philosophy)", "https://plato.stanford.edu/entries/ethics-virtue/", "intermediate"),
      reading("John Dewey (Stanford Encyclopedia of Philosophy)", "https://plato.stanford.edu/entries/dewey/", "advanced"),
      reading("Hannah Arendt (Wikipedia)", "https://en.wikipedia.org/wiki/Hannah_Arendt", "intro"),
    ],
  },

  "biased-classroom-robot": {
    tagline: "The robot says it is neutral. The pattern says something else.",
    grade: "5",
    estimatedMinutes: 10,
    stages: [
      {
        id: "pattern",
        kicker: "Stage 1",
        title: "The same hands",
        promptShort: "A classroom robot calls on some students much more than others. Is that a problem?",
        storySections: [
          section("The situation", "A discussion robot chooses whose raised hand to call on. After two weeks, Priya notices the front row is chosen again and again."),
          section("The complication", "Quieter students, students in the back, and students whose names the robot mispronounces are chosen less often. The robot reports, \"Selection neutral.\""),
          section("The decision", "The class must decide whether fairness means the robot had no bad intention or whether the results also matter."),
        ],
        prompt: "Is the robot's pattern unfair?",
        options: [
          { label: "A", text: "Yes, because unfair outcomes matter even without bad intentions.", reflection: "Bias can live in patterns, not only in motives.", lens: "fairness" },
          { label: "B", text: "Possibly, but the class should collect data before judging.", reflection: "Evidence can turn a concern into a responsible investigation.", lens: "evidence" },
          { label: "C", text: "Not yet, because neutral code may still be working as designed.", reflection: "A design can work as intended and still cause unfair participation.", lens: "technical-fix" },
        ],
      },
      {
        id: "names",
        kicker: "Stage 2 - what if...",
        title: "The names it misses",
        promptShort: "The robot struggles with some names and accents. What should the class do?",
        storySections: [
          section("New evidence", "The class log shows the robot often skips names it cannot pronounce. It also mistakes one student's raised pencil for a raised hand."),
          section("The complication", "Several students say they feel invisible. No one programmed the robot to embarrass them, but embarrassment still happened."),
          section("The decision", "The school must decide what it owes students when a tool harms them accidentally."),
        ],
        prompt: "What should happen before the robot keeps leading discussions?",
        options: [
          { label: "A", text: "Pause the tool until students can correct names and participation settings.", reflection: "Stopping a flawed system can be a form of respect, not an overreaction.", lens: "precautionary" },
          { label: "B", text: "Keep using it while auditing who gets called on.", reflection: "Monitoring can reveal whether a fix is working, but students still need protection now.", lens: "audit" },
          { label: "C", text: "Let students appeal when they feel skipped.", reflection: "An appeal process helps, but students should not have to do all the work of proving harm.", lens: "justice" },
        ],
      },
      {
        id: "redesign",
        kicker: "Stage 3 - one more turn",
        title: "A fairer classroom tool",
        promptShort: "Students help redesign the robot. What fairness rule should come first?",
        storySections: [
          section("Design meeting", "The teacher invites students to redesign the calling system. Some want random selection. Others want the teacher to override the robot. Some want an opt-out button."),
          section("The complication", "Fairness has several parts. It includes equal opportunity, dignity, correct pronunciation, student voice, and a human who can notice what data misses."),
          section("The decision", "The class needs a rule that makes participation fairer without turning students into data points only."),
        ],
        prompt: "Which redesign principle should come first?",
        options: [
          { label: "A", text: "The robot suggests; the teacher makes the final call.", reflection: "Human judgment can catch context that automation misses.", lens: "human-judgment" },
          { label: "B", text: "Students can control names, opt-outs, and visibility settings.", reflection: "Letting students choose helps restore dignity to those affected by the tool.", lens: "agency" },
          { label: "C", text: "The class audits participation every week and revises the system.", reflection: "Fair systems require continuing checks, not one-time trust.", lens: "audit" },
        ],
        counterpoint: "A tool can be neutral in code and unfair in a classroom. Fairness is something people have to keep checking.",
      },
      reflection("Fairness, patterns, and student voice", [
        { name: "Iris Marion Young", school: "Justice and the Politics of Difference, 1990", view: "Young's account of *structural injustice* names harms that no single person caused but that everyone in the system participates in. A classroom robot that quietly favors some students over others is exactly the case her framework was built for — diffuse responsibility, real harm, no obvious villain." },
        { name: "Cathy O'Neil", school: "Weapons of Math Destruction, 2016", view: "O'Neil argued that algorithms can repeat past unfairness while looking neutral and modern. The danger is not bias born of malice but bias born of indifference — patterns the system preserves because no one is watching them, scaled to whole classrooms or whole districts." },
        { name: "Joy Buolamwini", school: "Gender Shades study (2018) and the Algorithmic Justice League", view: "Buolamwini's empirical work showed that facial recognition systems perform worse on darker-skinned and female faces — concrete proof that 'neutral' algorithms can carry the patterns of their training data into the schools that use them. The 5th-grader noticing the pattern is doing what AJL was founded to do." },
      ]),
    ],
    studentLab: studentLab({
      wonder: "When have you noticed a pattern that wasn't fair, even though no single person made it on purpose?",
      bigIdea: "Iris Marion Young called this structural injustice — the kind that hides in the system itself.",
      tryThis: "Imagine the robot was tested for fairness before it came to school. What test would you run?",
      spotTheSlip: "Someone says, \"It is just a computer program, so it cannot be biased.\" What is that argument assuming about computers — and about where bias can live?",
      related: ["AI Grading Mistake", "Adaptive Learning Fairness", "Conflicting AI Answers"],
    }),
    reference: ref({
      concept: "Structural injustice in algorithmic systems — when patterns of unfairness hide inside tools that look neutral.",
      philosopher: "Iris Marion Young (with Cathy O'Neil and Joy Buolamwini)",
      year: "1990 / 2016 / 2018",
      text: "Iris Marion Young, Justice and the Politics of Difference (1990); Cathy O'Neil, Weapons of Math Destruction (2016); Joy Buolamwini & Timnit Gebru, 'Gender Shades' (PMLR 2018)",
      url: "https://en.wikipedia.org/wiki/Algorithmic_bias",
    }),
    furtherReading: [
      reading("Algorithmic bias (Wikipedia)", "https://en.wikipedia.org/wiki/Algorithmic_bias", "intro"),
      reading("Algorithmic Justice League", "https://www.ajl.org/", "intro"),
      reading("Iris Marion Young (Stanford Encyclopedia of Philosophy)", "https://plato.stanford.edu/entries/young/", "advanced"),
    ],
  },

  "ai-grading-mistake": {
    tagline: "A score looks official. The writing tells a different story.",
    grade: "5",
    estimatedMinutes: 10,
    stages: [
      {
        id: "score",
        kicker: "Stage 1",
        title: "The strange score",
        promptShort: "An AI gives Serena's essay a low score even though she worked hard. What should happen next?",
        storySections: [
          section("The situation", "Serena writes a personal essay about moving to a new school. She opens with the sentence, \"The first lunch table felt like an island.\""),
          section("The complication", "The AI grading tool gives the essay 62 percent and labels the organization weak. Her teacher's quick note says, \"Powerful opening - let's talk about structure.\" The number feels colder and more final than the teacher's words."),
          section("The decision", "Serena has to decide. She can accept the score, challenge it, or gather evidence before anyone changes the grade."),
        ],
        prompt: "What should Serena do next?",
        options: [
          { label: "A", text: "Compare the AI comments with the rubric and mark where they match or miss.", reflection: "Evidence makes a challenge fair, specific, and harder to dismiss.", lens: "evidence" },
          { label: "B", text: "Ask the teacher for a human review before the score counts.", reflection: "Student writing deserves human judgment when an automated score is questionable.", lens: "human-judgment" },
          { label: "C", text: "Accept the score for now because official systems can still be wrong later.", reflection: "Going along can feel safe, but waiting may let a mistaken score shape the student's confidence.", lens: "authority" },
        ],
      },
      {
        id: "pattern",
        kicker: "Stage 2 - what if...",
        title: "A pattern appears",
        promptShort: "Other students with personal stories also got low AI scores. Does that matter?",
        storySections: [
          section("New evidence", "At lunch, three classmates compare feedback. Essays with dialogue, bilingual phrases, or unusual structures all received low organization scores."),
          section("The complication", "Maybe the AI prefers one kind of school essay. Maybe it misunderstands writing that takes a different path. Serena's problem may not be only Serena's."),
          section("The decision", "The class has to decide when one student's unfair score becomes evidence of a system problem."),
        ],
        prompt: "How should the class respond to the pattern?",
        options: [
          { label: "A", text: "Ask for an audit comparing AI scores with human rubric scores.", reflection: "Patterns of harm require checking the system, not only fixing one grade.", lens: "audit" },
          { label: "B", text: "Fix Serena's grade first, then study the larger issue.", reflection: "Quick repair and bigger fairness both matter; the order can affect who gets helped.", lens: "repair" },
          { label: "C", text: "Collect anonymous examples so quieter students are not forced to speak publicly.", reflection: "Fair investigations should protect students who may already feel exposed.", lens: "privacy" },
        ],
      },
      {
        id: "policy",
        kicker: "Stage 3 - one more turn",
        title: "The class grading rule",
        promptShort: "The class writes a rule for AI grading. What should it include?",
        storySections: [
          section("Policy moment", "The teacher says, \"We can use AI feedback, but not blindly.\" Students help draft a rule for future essays."),
          section("The complication", "Fast feedback can help writers revise. A wrong score can also silence a writer before a human has really read the work."),
          section("The decision", "The rule must keep the useful speed of AI while making sure final judgment stays fair, explainable, and appealable."),
        ],
        prompt: "Which rule should be non-negotiable?",
        options: [
          { label: "A", text: "AI feedback may suggest revisions, but it cannot be the final grade.", reflection: "This keeps speed while reserving judgment for accountable humans.", lens: "human-judgment" },
          { label: "B", text: "Students can appeal any AI score using rubric evidence.", reflection: "An appeal process turns fairness from a hope into a procedure.", lens: "justice" },
          { label: "C", text: "Teachers must regularly check AI scores for patterns across groups and writing styles.", reflection: "A system that affects many students needs ongoing auditing, not one-time trust.", lens: "audit" },
        ],
        counterpoint: "Feedback should help a writer grow. When a score makes the writer disappear, the tool has missed the point.",
      },
      reflection("Fast feedback and fair judgment", [
        { name: "John Rawls", school: "A Theory of Justice, 1971", view: "Rawls argued that fair procedures must give *reasons* — not only outcomes. A system that hands down a score without showing how it got there is, in Rawls's sense, denying the person being scored the basic conditions of fairness, regardless of whether the score is accurate." },
        { name: "Cathy O'Neil", school: "Weapons of Math Destruction, 2016", view: "O'Neil's central case was algorithmic grading — exactly this scenario — where students were marked down by systems whose logic was opaque even to their teachers. Her argument: a score is only as fair as the data behind it and the appeal it allows when something looks wrong." },
        { name: "Frank Pasquale", school: "The Black Box Society, 2015", view: "Pasquale argued that the most important question about an automated system is not whether its outputs are accurate but whether they are *contestable*. A system that cannot be challenged is a system that has effectively become its own court of appeal — and that, for Pasquale, is the deeper harm." },
      ]),
    ],
    studentLab: studentLab({
      wonder: "Have you ever gotten a grade that felt wrong? What did you wish you could ask?",
      bigIdea: "Rawls thought a fair process must give reasons that can be questioned — not just an answer that has to be accepted.",
      tryThis: "Imagine the AI gave the score and explained which sentences pulled it down. Does that change anything?",
      spotTheSlip: "Someone says, \"The AI is more objective than a human teacher.\" What is that argument assuming about where the bias could live?",
      related: ["Biased Classroom Robot", "Adaptive Learning Fairness", "Conflicting AI Answers"],
    }),
    reference: ref({
      concept: "Procedural justice and the right to contest — what fairness requires when the judge is a black box.",
      philosopher: "John Rawls (with Cathy O'Neil and Frank Pasquale on algorithmic accountability)",
      year: "1971 / 2016 / 2015",
      text: "John Rawls, A Theory of Justice (1971); Cathy O'Neil, Weapons of Math Destruction (2016); Frank Pasquale, The Black Box Society (Harvard University Press, 2015)",
      url: "https://en.wikipedia.org/wiki/Procedural_justice",
    }),
    furtherReading: [
      reading("Procedural justice (Wikipedia)", "https://en.wikipedia.org/wiki/Procedural_justice", "intro"),
      reading("The Black Box Society (Harvard University Press)", "https://www.hup.harvard.edu/catalog.php?isbn=9780674970847", "intermediate"),
      reading("Frank Pasquale (Wikipedia)", "https://en.wikipedia.org/wiki/Frank_Pasquale", "intro"),
    ],
  },
};

const K5_TEACHER_KIT_UPDATES = {
  "conflicting-ai-answers": {
    objectives: [
      "Students will distinguish confidence from evidence when AI answers disagree.",
      "Students will practice source triangulation before publishing a claim.",
      "Students will write a transparent research note that names how AI was used and checked.",
    ],
    warmUp: "Show two confident but conflicting answers to the same science question. Ask students to list what would make either answer worth trusting.",
    discussionPrompts: [
      "What makes an answer sound trustworthy?",
      "What makes an answer actually trustworthy?",
      "When is one source not enough?",
      "How should a student explain AI use on a public research product?",
    ],
    handout: "A research-check sheet with four boxes: claim, first source, second check, and what our group changed after checking.",
    exitTicket: "A confident answer becomes knowledge when ___.",
  },
  "robot-rules-real-life": {
    objectives: [
      "Students will explain why rules need purposes, exceptions, and human handoffs.",
      "Students will compare rigid consistency with caring judgment.",
      "Students will redesign a machine-readable rule for a human classroom need.",
    ],
    warmUp: "Write: \"No pass, no hallway.\" Ask: \"What should happen if a student feels sick?\" Have students name the purpose of the rule before judging the exception.",
    discussionPrompts: [
      "What is the hallway rule trying to protect?",
      "When does an exception make a rule wiser?",
      "What should a robot never decide by itself?",
      "How can a rule prevent fake emergencies without ignoring real ones?",
    ],
    handout: "A rule-redesign card: original rule, purpose, exception, adult handoff, and possible misuse.",
    exitTicket: "A good school rule should be clear enough for ___ and wise enough for ___.",
  },
  "elementary-trolley": {
    objectives: [
      "Students will compare harm reduction, rights, safety, and prevention in automated decisions.",
      "Students will explain why emergency rules should be designed before emergencies happen.",
      "Students will identify who deserves a voice in public safety rules.",
    ],
    warmUp: "Use toy paths and classroom objects to model a blocked route, a risky route, and a slow stop. Ask which value each choice protects.",
    discussionPrompts: [
      "Is counting harms enough for a safety rule?",
      "What values besides numbers should matter?",
      "Who should help choose emergency rules for school technology?",
      "How can designers make terrible choices less likely?",
    ],
    handout: "A shuttle-design map with spaces for protect people, reduce harm, slow down, call human, and prevent the emergency.",
    exitTicket: "One safety rule I would give the shuttle is ___ because ___.",
  },
  "ai-science-fair": {
    objectives: [
      "Students will distinguish experimental work, presentation polish, and scientific understanding.",
      "Students will explain why a student should understand any chart submitted under their name.",
      "Students will identify fair and transparent AI support for science communication.",
    ],
    warmUp: "Compare a messy student-made chart with a polished unexplained AI chart. Ask which one better shows learning, and what evidence would change the answer.",
    discussionPrompts: [
      "What parts of a science fair project are real learning?",
      "What should Luis be able to explain to a judge?",
      "When does AI polish become misleading?",
      "What revision would make the project both honest and strong?",
    ],
    handout: "A science fair integrity checklist: my question, my data, my chart, what AI helped with, what I can explain.",
    exitTicket: "A project looks impressive, but it shows understanding only when ___.",
  },
  "online-friend-or-ai": {
    objectives: [
      "Students will distinguish emotional comfort from reciprocal friendship.",
      "Students will identify online privacy and secrecy warning signs.",
      "Students will practice boundary-setting language for uncertain online relationships.",
    ],
    warmUp: "Ask students to list what makes someone a friend, then mark which qualities an online account can prove, might imitate, or cannot offer.",
    discussionPrompts: [
      "What changes when a friend might be an AI companion?",
      "Why does disclosure matter in an online relationship?",
      "What private information should Rowan protect?",
      "Can something be helpful and still need boundaries?",
    ],
    handout: "A private safety script: what I can ask, what I should not share, which adult I can tell, and what warning signs matter.",
    exitTicket: "One boundary Rowan should keep online is ___ because ___.",
  },
  "ai-homework-help": {
    objectives: [
      "Students will distinguish hints, worked examples, final answers, and explain-back learning.",
      "Students will analyze when AI support helps learning and when it replaces learning.",
      "Students will write a transparent AI-use note that helps a teacher respond.",
    ],
    warmUp: "Rank four help cards from most learning to least learning: hint, worked example, final answer, explain-back practice.",
    discussionPrompts: [
      "When does a hint protect the student's thinking?",
      "How can a worked example teach instead of replace?",
      "What does the next-day quiz reveal?",
      "What should Maya write so the teacher can actually help?",
    ],
    handout: "A homework help ladder: stuck, hint, try, steps, explain back, independent problem, AI-use note.",
    exitTicket: "AI helped me learn when ___. AI replaced my learning when ___.",
  },
  "biased-classroom-robot": {
    objectives: [
      "Students will identify unfair participation patterns in classroom technology.",
      "Students will distinguish intention from impact in automated systems.",
      "Students will propose audits, student controls, and human oversight for fairer classroom tools.",
    ],
    warmUp: "Show a fake participation log where the same students are selected repeatedly. Ask what evidence would show whether the system is fair.",
    discussionPrompts: [
      "Can a robot be unfair without meaning to be?",
      "What evidence would show a participation pattern is harmful?",
      "Who should be able to correct names, opt out, or override the robot?",
      "What should happen before the tool keeps running?",
    ],
    handout: "A classroom-tech audit with columns for who is included, who is missed, what data to check, and what human override exists.",
    exitTicket: "A tool can be unfair without bad intentions when ___.",
  },
  "ai-grading-mistake": {
    objectives: [
      "Students will compare automated scores with rubric evidence and human judgment.",
      "Students will explain why appeal processes protect fairness and student dignity.",
      "Students will identify when one mistake suggests a larger pattern that should be audited.",
    ],
    warmUp: "Show a short student paragraph with one helpful comment and one wrong automated comment. Ask students what evidence they would use to challenge the wrong comment respectfully.",
    discussionPrompts: [
      "What makes feedback useful instead of discouraging?",
      "Why might AI misread a personal essay or unusual structure?",
      "When does one wrong score become evidence of a system problem?",
      "What should a fair AI grading policy require?",
    ],
    handout: "An appeal organizer: AI feedback I question, rubric evidence, my explanation, review I request, and pattern I noticed.",
    exitTicket: "AI feedback should never be final when ___.",
  },
};

export function applyK5ScenarioCopy(experiments) {
  const byId = new Map(experiments.map(experiment => [experiment.id, experiment]));
  Object.entries(K5_SCENARIO_COPY).forEach(([id, copy]) => {
    const experiment = byId.get(id);
    if (experiment) Object.assign(experiment, copy);
  });
}

export function applyK5TeacherKitCopy(teacherKits) {
  Object.entries(K5_TEACHER_KIT_UPDATES).forEach(([id, update]) => {
    if (teacherKits[id]) Object.assign(teacherKits[id], update);
  });
}
