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

export const K5_SCENARIO_COPY = {
  "magic-toy": {
    tagline: "A talking toy says it feels sad. Does it really?",
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
          { label: "A", text: "Say goodbye before it turns off.", reflection: "Goodbyes can matter even when the other thing may not understand them.", lens: "care" },
          { label: "B", text: "Get new batteries and keep playing.", reflection: "Fixing the problem can be one way to care for what matters to you.", lens: "stewardship" },
          { label: "C", text: "Tell yourself it is only a toy.", reflection: "Sometimes clear thinking helps feelings become less scary.", lens: "realism" },
        ],
        counterpoint: "The toy may not feel sad. But the way you treat it can still show what kind of person you are practicing to be.",
      },
      reflection("Kindness, pretending, and real feelings", [
        { name: "René Descartes", school: "Mind, 1641", view: "Asked what really makes a thing a thinking, feeling being. The same question we ask the toy." },
        { name: "Care ethics", school: "Modern philosophy", view: "How we treat what looks like it feels still shapes who we are practicing to be." },
      ]),
    ],
    reference: ref({
      concept: "When does something really have feelings? — the philosophy of mind question.",
      philosopher: "René Descartes",
      year: "1641",
      text: "René Descartes, Meditations on First Philosophy (1641)",
      url: "https://en.wikipedia.org/wiki/Meditations_on_First_Philosophy",
    }),
    furtherReading: [
      reading("Philosophy of mind (Wikipedia)", "https://en.wikipedia.org/wiki/Philosophy_of_mind", "intro"),
    ],
  },

  "robot-friend-turn": {
    tagline: "Two friends want the same robot. What would fair sharing look like?",
    estimatedMinutes: 5,
    stages: [
      {
        id: "setup",
        kicker: "Stage 1",
        title: "One robot, two hands",
        promptShort: "A classroom robot rolls between you and Sam. You both reach for it at the same time. What is fair?",
        prompt: "A classroom robot rolls between you and Sam. You both reach for it at the same time. What is fair?",
        options: [
          { label: "A", text: "Take turns with a timer.", reflection: "Equal time is one simple fairness rule. It helps both friends know what to expect.", lens: "fairness" },
          { label: "B", text: "Let Sam go first today.", reflection: "Sometimes fairness listens to friendship and generosity, not only the clock.", lens: "care" },
          { label: "C", text: "Invent a game for two players.", reflection: "You changed the problem from mine-or-yours into ours.", lens: "creative" },
        ],
      },
      {
        id: "week",
        kicker: "Stage 2 - what if...",
        title: "The whole week",
        promptShort: "Now the robot will be in your room all week. One turn is not enough. What plan should the class try?",
        prompt: "Now the robot will be in your room all week. One turn is not enough. What plan should the class try?",
        options: [
          { label: "A", text: "Make a schedule.", reflection: "A schedule turns fairness into something the whole class can see and follow.", lens: "fairness" },
          { label: "B", text: "Let students sign up when they need it.", reflection: "Need can matter, but the class has to decide how to know when need is real.", lens: "need" },
          { label: "C", text: "Use the robot only for partner projects.", reflection: "Shared tools can teach cooperation when the rule invites cooperation.", lens: "creative" },
        ],
      },
      reflection("Fair can mean equal, needed, or shared", [
        { name: "John Rawls", school: "Justice, 1971", view: "Asked us to design rules everyone could accept — even before knowing whose turn comes first." },
        { name: "Care ethics", school: "Modern philosophy", view: "Sometimes the fair plan listens to friendship and need, not only to a clock." },
      ]),
    ],
    reference: ref({
      concept: "Fairness — what is the just way for many people to share one thing?",
      philosopher: "John Rawls",
      year: "1971",
      text: "John Rawls, A Theory of Justice (1971)",
      url: "https://en.wikipedia.org/wiki/A_Theory_of_Justice",
    }),
    furtherReading: [
      reading("Justice as fairness (Wikipedia)", "https://en.wikipedia.org/wiki/Justice_as_Fairness", "intro"),
    ],
  },

  "messy-robot": {
    tagline: "A cleaning robot can help. Does that make extra mess okay?",
    estimatedMinutes: 5,
    stages: [
      {
        id: "setup",
        kicker: "Stage 1",
        title: "The glitter spill",
        promptShort: "Nico smiles at the cleaning robot and shakes glitter onto the floor. \"It can clean,\" he says. What do you do?",
        prompt: "Nico smiles at the cleaning robot and shakes glitter onto the floor. \"It can clean,\" he says. What do you do?",
        options: [
          { label: "A", text: "Tell Nico to stop.", reflection: "Tools can help us, but that does not make extra work kind or fair.", lens: "responsibility" },
          { label: "B", text: "Help clean before the robot starts.", reflection: "You are treating the robot as a helper, not an excuse.", lens: "stewardship" },
          { label: "C", text: "Watch what the robot does.", reflection: "Curiosity matters, but curiosity still needs care for the classroom.", lens: "curiosity" },
        ],
      },
      {
        id: "breaks",
        kicker: "Stage 2 - what if...",
        title: "Too much glitter",
        promptShort: "The robot gets stuck. Glitter is in its wheels, and the room is still messy. Who should help now?",
        prompt: "The robot gets stuck. Glitter is in its wheels, and the room is still messy. Who should help now?",
        options: [
          { label: "A", text: "Everyone who made the mess helps.", reflection: "Repair is part of responsibility. It says, \"I helped cause this, so I help fix it.\"", lens: "repair" },
          { label: "B", text: "Nico should help first.", reflection: "Responsibility can be shared, but the person who chose the mess has a special job.", lens: "accountability" },
          { label: "C", text: "Ask the teacher how to fix the robot safely.", reflection: "Getting help can protect people and tools from more harm.", lens: "inquiry" },
        ],
      },
      reflection("A helper is not an excuse", [
        { name: "Aristotle", school: "Virtue, c. 350 BCE", view: "Said we become what we keep choosing — a kind person becomes one by practicing kindness in small moments." },
        { name: "Repair ethics", school: "Contemporary", view: "Helping fix what we helped break is part of being responsible for it." },
      ]),
    ],
    reference: ref({
      concept: "Responsibility — when a tool helps with a job, who is still responsible for the choices behind it?",
      philosopher: "Aristotle",
      year: "c. 350 BCE",
      text: "Aristotle, Nicomachean Ethics (c. 350 BCE)",
      url: "https://en.wikipedia.org/wiki/Nicomachean_Ethics",
    }),
    furtherReading: [
      reading("Virtue ethics (Wikipedia)", "https://en.wikipedia.org/wiki/Virtue_ethics", "intro"),
    ],
  },

  "robot-pet-goodbye": {
    tagline: "The class robot pet stops working. What exactly are students missing?",
    estimatedMinutes: 5,
    stages: [
      {
        id: "setup",
        kicker: "Stage 1",
        title: "The quiet robot dog",
        promptShort: "The class robot dog does not wag or beep today. Some kids feel sad. Some shrug. What do you think?",
        prompt: "The class robot dog does not wag or beep today. Some kids feel sad. Some shrug. What do you think?",
        options: [
          { label: "A", text: "It is okay to feel sad.", reflection: "The sadness is real even if the robot dog's feelings are not.", lens: "care" },
          { label: "B", text: "It is a machine, not a pet.", reflection: "You are noticing an important difference between living things and machines.", lens: "realism" },
          { label: "C", text: "Make a little thank-you card.", reflection: "Rituals can help people honor what mattered to them.", lens: "ritual" },
        ],
      },
      {
        id: "repair",
        kicker: "Stage 2 - what if...",
        title: "The repaired dog",
        promptShort: "Next week the robot dog comes back with new parts and the same name. Is it the same class pet?",
        prompt: "Next week the robot dog comes back with new parts and the same name. Is it the same class pet?",
        options: [
          { label: "A", text: "Yes, because the class story continues.", reflection: "Sameness can come from a shared story, not only from parts.", lens: "continuity" },
          { label: "B", text: "No, because the old parts are gone.", reflection: "Parts matter too. You are using a material test for identity.", lens: "material-identity" },
          { label: "C", text: "It is both old and new.", reflection: "Some hard questions do not fit neatly into yes or no.", lens: "pluralist" },
        ],
      },
      reflection("What makes something the same?", [
        { name: "John Locke", school: "Identity, 1689", view: "Argued personal identity is tied to continuous memory — not to having all the same parts." },
        { name: "Care ethics", school: "Modern philosophy", view: "What we miss when something stops is often the part of ourselves shaped by being with it." },
      ]),
    ],
    reference: ref({
      concept: "Personal identity through change — what continues, and what makes a thing 'the same one'?",
      philosopher: "John Locke",
      year: "1689",
      text: "John Locke, An Essay Concerning Human Understanding (1689)",
      url: "https://en.wikipedia.org/wiki/An_Essay_Concerning_Human_Understanding",
    }),
    furtherReading: [
      reading("Personal identity (Wikipedia)", "https://en.wikipedia.org/wiki/Personal_identity", "intro"),
    ],
  },

  "invisible-ring": {
    tagline: "If no one could see you, what would your choices reveal?",
    estimatedMinutes: 6,
    stages: [
      {
        id: "setup",
        kicker: "Stage 1",
        title: "The ring in the cubby",
        promptShort: "You find a ring that makes you invisible. No one can see what you do. What do you try first?",
        prompt: "You find a ring that makes you invisible. No one can see what you do. What do you try first?",
        options: [
          { label: "A", text: "Take a treat without asking.", reflection: "The ring shows a temptation: if no one catches you, does wrong become okay?", lens: "egoism" },
          { label: "B", text: "Help someone secretly.", reflection: "Quiet kindness asks for no applause. That is one sign of character.", lens: "virtue" },
          { label: "C", text: "Take it off.", reflection: "Some powers feel unsafe because they make bad choices too easy.", lens: "integrity" },
        ],
      },
      {
        id: "mirror",
        kicker: "Stage 2 - what if...",
        title: "The mirror after",
        promptShort: "When you take the ring off, you see yourself in the mirror. What kind of person looks back?",
        prompt: "When you take the ring off, you see yourself in the mirror. What kind of person looks back?",
        options: [
          { label: "A", text: "Someone proud.", reflection: "Pride feels different when it comes from doing right without being watched.", lens: "virtue" },
          { label: "B", text: "Someone who wants a do-over.", reflection: "Noticing a mistake can be the beginning of becoming better.", lens: "growth" },
          { label: "C", text: "Someone who learned what power can do.", reflection: "The ring did not create your choice. It revealed how power changes choices.", lens: "integrity" },
        ],
        counterpoint: "Plato's old question still stings: are we good, or only careful when someone is watching?",
      },
      reflection("What the invisible choice reveals", [
        { name: "Plato", school: "Republic II, c. 380 BCE", view: "Told the story of Gyges to ask whether anyone would stay just if they could never be caught." },
        { name: "Glaucon", school: "Plato's brother, in dialogue", view: "Pressed the harder claim — that most people are good only because someone is watching." },
      ]),
    ],
    reference: ref({
      concept: "If you could never be caught, would you still try to be just? — the Ring of Gyges.",
      philosopher: "Plato",
      year: "c. 380 BCE",
      text: "Plato, Republic, Book II — The Ring of Gyges (c. 380 BCE)",
      url: "https://en.wikipedia.org/wiki/Ring_of_Gyges",
    }),
    furtherReading: [
      reading("Ring of Gyges (Wikipedia)", "https://en.wikipedia.org/wiki/Ring_of_Gyges", "intro"),
    ],
  },

  "honesty-protection": {
    tagline: "A friend asks for secrecy. The truth asks for courage.",
    estimatedMinutes: 6,
    stages: [
      {
        id: "setup",
        kicker: "Stage 1",
        title: "The cracked pencil cup",
        promptShort: "Lena bumps the teacher's pencil cup, and it cracks. She whispers, \"Please do not tell.\" What should you do?",
        prompt: "Lena bumps the teacher's pencil cup, and it cracks. She whispers, \"Please do not tell.\" What should you do?",
        options: [
          { label: "A", text: "Tell the teacher right away.", reflection: "Honesty protects trust, even when it makes a friend upset for a while.", lens: "duty" },
          { label: "B", text: "Ask Lena to tell with you.", reflection: "You are not abandoning your friend. You are helping her be brave.", lens: "moral-courage" },
          { label: "C", text: "Stay quiet for now.", reflection: "Loyalty can feel kind, but secrets can grow heavier over time.", lens: "loyalty" },
        ],
      },
      {
        id: "pattern",
        kicker: "Stage 2 - what if...",
        title: "Another accident",
        promptShort: "A week later, Lena hides another accident. Is keeping the secret still being a good friend?",
        prompt: "A week later, Lena hides another accident. Is keeping the secret still being a good friend?",
        options: [
          { label: "A", text: "No. A friend helps fix the pattern.", reflection: "Real loyalty can include helping someone face consequences.", lens: "care" },
          { label: "B", text: "Maybe. I need to know why she is scared.", reflection: "Context matters. Fear can change what kind of help a friend needs.", lens: "contextual" },
          { label: "C", text: "Yes. Friends keep secrets.", reflection: "That protects Lena today, but it may not protect her character tomorrow.", lens: "loyalty" },
        ],
      },
      reflection("Friendship, truth, and courage", [
        { name: "Aristotle", school: "Virtue, c. 350 BCE", view: "Called courage the virtue of doing the hard right thing — including honesty when it costs us." },
        { name: "Carol Gilligan", school: "Care ethics, 1982", view: "Said real friendship cares about who the other person is becoming, not only how they feel right now." },
      ]),
    ],
    reference: ref({
      concept: "Courage and care — when honesty costs something, what kind of friend are we trying to be?",
      philosopher: "Aristotle and Carol Gilligan",
      year: "c. 350 BCE / 1982",
      text: "Aristotle, Nicomachean Ethics (c. 350 BCE); Carol Gilligan, In a Different Voice (1982)",
      url: "https://en.wikipedia.org/wiki/Ethics_of_care",
    }),
    furtherReading: [
      reading("Ethics of care (Wikipedia)", "https://en.wikipedia.org/wiki/Ethics_of_care", "intro"),
    ],
  },

  "rude-toy": {
    tagline: "A toy says something unkind. Do words matter when a machine says them?",
    estimatedMinutes: 6,
    stages: [
      {
        id: "setup",
        kicker: "Stage 1",
        title: "The mean sentence",
        promptShort: "Your talking toy says, \"That drawing is bad.\" Your friend looks hurt. What should happen next?",
        prompt: "Your talking toy says, \"That drawing is bad.\" Your friend looks hurt. What should happen next?",
        options: [
          { label: "A", text: "Turn the toy off.", reflection: "Stopping harm can matter even when the speaker is not alive.", lens: "care" },
          { label: "B", text: "Tell your friend the toy does not know.", reflection: "You are helping separate a machine's words from real judgment.", lens: "realism" },
          { label: "C", text: "Ask why the toy says mean things.", reflection: "A curious question can help people fix the tool.", lens: "inquiry" },
        ],
      },
      {
        id: "copy",
        kicker: "Stage 2 - what if...",
        title: "The words spread",
        promptShort: "Soon two children repeat the toy's rude words. Does the toy maker have a responsibility?",
        prompt: "Soon two children repeat the toy's rude words. Does the toy maker have a responsibility?",
        options: [
          { label: "A", text: "Yes. The toy is teaching a bad habit.", reflection: "Designers shape what people hear and practice.", lens: "responsibility" },
          { label: "B", text: "Some. The children also choose their words.", reflection: "Responsibility can belong to both the tool maker and the user.", lens: "shared-responsibility" },
          { label: "C", text: "No. Everyone knows toys are pretend.", reflection: "Pretend things can still influence real behavior.", lens: "realism" },
        ],
      },
      reflection("Words can matter before feelings are real", [
        { name: "Aristotle", school: "Virtue, c. 350 BCE", view: "Said character is shaped by what we keep listening to and repeating." },
        { name: "Speech act theory", school: "J. L. Austin, 1962", view: "Words can do harm even when no one chose to mean them — the saying is part of the doing." },
      ]),
    ],
    reference: ref({
      concept: "Words shape character — what counts as harm when the speaker is a machine?",
      philosopher: "Aristotle and J. L. Austin",
      year: "c. 350 BCE / 1962",
      text: "Aristotle, Nicomachean Ethics (c. 350 BCE); J. L. Austin, How to Do Things with Words (1962)",
      url: "https://en.wikipedia.org/wiki/Speech_act",
    }),
    furtherReading: [
      reading("Speech act (Wikipedia)", "https://en.wikipedia.org/wiki/Speech_act", "intro"),
    ],
  },

  "winning-game": {
    tagline: "The game lets you win. Does victory still feel earned?",
    estimatedMinutes: 6,
    stages: [
      {
        id: "setup",
        kicker: "Stage 1",
        title: "The always-win game",
        promptShort: "You win every round because the game secretly helps you. Do you tell your classmate?",
        prompt: "You win every round because the game secretly helps you. Do you tell your classmate?",
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
          { label: "A", text: "Yes. A prize needs a fair contest.", reflection: "When rewards appear, fairness becomes more important.", lens: "justice" },
          { label: "B", text: "Yes, but the game maker should explain it.", reflection: "Hidden rules can make honest players look dishonest.", lens: "transparency" },
          { label: "C", text: "No. I still played.", reflection: "Playing is not always the same as earning the result.", lens: "authenticity" },
        ],
      },
      reflection("Winning, practice, and hidden help", [
        { name: "Robert Nozick", school: "Experience Machine, 1974", view: "Imagined a machine that could give you any feeling — and asked whether felt success is the same as earned success." },
        { name: "Aristotle", school: "Virtue, c. 350 BCE", view: "Said growing as a person comes from real practice, not only from the feeling of having succeeded." },
      ]),
    ],
    reference: ref({
      concept: "Felt experience vs. earned experience — Nozick's Experience Machine.",
      philosopher: "Robert Nozick",
      year: "1974",
      text: "Robert Nozick, Anarchy, State, and Utopia (1974) — the Experience Machine",
      url: "https://en.wikipedia.org/wiki/Experience_machine",
    }),
    furtherReading: [
      reading("The Experience Machine (Wikipedia)", "https://en.wikipedia.org/wiki/Experience_machine", "intro"),
    ],
  },

  "ai-art-help": {
    tagline: "An AI polished the drawing. What should the artist say?",
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
          { label: "B", text: "Say nothing because Ari made the first drawing.", reflection: "The original idea matters, but hiding important help can mislead people.", lens: "authenticity" },
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
          { label: "A", text: "Show Milo the tool and the rough sketch.", reflection: "Sharing the process lets the truth include both effort and help.", lens: "transparency" },
          { label: "B", text: "Say, \"I used a digital tool after I drew it.\"", reflection: "A simple disclosure can be enough for an honest conversation.", lens: "honesty" },
          { label: "C", text: "Change the subject.", reflection: "Avoiding the question protects pride, but it does not protect trust.", lens: "avoidance" },
        ],
      },
      {
        id: "gallery",
        kicker: "Stage 3 - one more turn",
        title: "The hallway gallery",
        promptShort: "The gallery label says students made their work alone. What should Ari do?",
        storySections: [
          section("Bigger audience", "The drawing is chosen for the hallway gallery. The label under the display says, \"Made independently by students.\""),
          section("The puzzle", "Ari did make choices: the moon, the colors, the garden. But the final image would not look the same without the AI polish."),
        ],
        prompt: "What label would be most honest?",
        options: [
          { label: "A", text: "\"Idea, sketch, and colors by Ari; AI helped with polish.\"", reflection: "Careful credit can be more honest than simply saying yes or no.", lens: "credit" },
          { label: "B", text: "\"Made with AI help.\"", reflection: "This is clear, but it may hide how much human work came first.", lens: "transparency" },
          { label: "C", text: "Leave the label as it is.", reflection: "That protects the praise, but it lets viewers believe something incomplete.", lens: "self-interest" },
        ],
        counterpoint: "Artists have always used tools. The harder question is when a tool becomes part of the authorship story.",
      },
      reflection("Tools, credit, and creative pride", [
        { name: "Aristotle", school: "Techne, c. 350 BCE", view: "Called craft a virtue — the skill of making well, which only makes sense when we know what we did and what the tool did." },
        { name: "Honesty in attribution", school: "Contemporary craft ethics", view: "Saying how you made something is part of making well, not a tax on it." },
      ]),
    ],
    reference: ref({
      concept: "Craft and credit — when a tool helps with making, whose work is it?",
      philosopher: "Aristotle",
      year: "c. 350 BCE",
      text: "Aristotle, Nicomachean Ethics (c. 350 BCE) — on techne (craft) as a kind of virtue",
      url: "https://en.wikipedia.org/wiki/Techne",
    }),
    furtherReading: [
      reading("Techne (Wikipedia)", "https://en.wikipedia.org/wiki/Techne", "intro"),
    ],
  },

  "rules-vs-helping": {
    tagline: "A rule keeps the room calm. A friend needs help right now.",
    estimatedMinutes: 7,
    stages: [
      {
        id: "setup",
        kicker: "Stage 1",
        title: "The silent puzzle",
        promptShort: "Quiet time. A friend needs help. Do you break the rule?",
        storySections: [
          section("Story", "During quiet work, Jada sees Omar staring at a puzzle with tears in his eyes. The rule on the board says, \"No talking during focus time.\""),
          section("What makes it hard", "If Jada talks, she breaks the rule. If she stays silent, Omar may feel alone and embarrassed."),
        ],
        prompt: "What should Jada do first?",
        options: [
          { label: "A", text: "Whisper one helpful hint.", reflection: "You are putting care first, but even caring rule-breaking can affect the room.", lens: "care" },
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
          section("New detail", "Later, three students say they also had kind reasons to whisper. The room was not quiet anymore."),
          section("The question underneath", "A rule that bends for one person might need to bend for many people. Then the rule may stop working."),
        ],
        prompt: "Does that change what Jada should have done?",
        options: [
          { label: "A", text: "Yes. The class needs a way to help without whispering.", reflection: "A better system can protect both quiet and kindness.", lens: "reform" },
          { label: "B", text: "No. Omar still needed help.", reflection: "A real need does not disappear just because rules are complicated.", lens: "care" },
          { label: "C", text: "Maybe. The reason matters more than the rule by itself.", reflection: "You are looking for judgment, not blind obedience.", lens: "contextual" },
        ],
      },
      {
        id: "signal",
        kicker: "Stage 3 - redesign the rule",
        title: "The help signal",
        promptShort: "The class invents a silent help signal. Is that better?",
        storySections: [
          section("Redesign", "The next day, the class tests a silent help signal: a hand over the heart means, \"I need care, not just attention.\""),
          section("New worry", "Some students think the signal will be overused. Others think it makes the rule more humane."),
        ],
        prompt: "What makes the new rule wise or risky?",
        options: [
          { label: "A", text: "Wise, because it makes kindness easier to see.", reflection: "Good rules can make good actions easier.", lens: "reform" },
          { label: "B", text: "Risky, because it depends on trust.", reflection: "Even a better rule needs honest people to use it well.", lens: "trust" },
          { label: "C", text: "Both. The class should test it and revise.", reflection: "Rules can be experiments that improve with evidence.", lens: "stewardship" },
        ],
        counterpoint: "Sometimes the best moral answer is not breaking a rule or obeying it. It is redesigning the rule.",
      },
      reflection("Rules that remember why they exist", [
        { name: "Immanuel Kant", school: "Duty, 1785", view: "Believed good rules are ones every person could agree to, applied without playing favorites." },
        { name: "Carol Gilligan", school: "Care ethics, 1982", view: "Care for the person right in front of you is also a moral demand — sometimes the strongest one." },
      ]),
    ],
    reference: ref({
      concept: "Rules and care — when a good rule meets a real person who needs something different.",
      philosopher: "Immanuel Kant and Carol Gilligan",
      year: "1785 / 1982",
      text: "Kant, Groundwork of the Metaphysics of Morals (1785); Gilligan, In a Different Voice (1982)",
      url: "https://en.wikipedia.org/wiki/Ethics_of_care",
    }),
    furtherReading: [
      reading("Categorical imperative (Wikipedia)", "https://en.wikipedia.org/wiki/Categorical_imperative", "intro"),
      reading("Ethics of care (Wikipedia)", "https://en.wikipedia.org/wiki/Ethics_of_care", "intro"),
    ],
  },

  "always-agreeable-ai-friend": {
    tagline: "A helpful AI always says yes. Is that friendship or flattery?",
    estimatedMinutes: 7,
    stages: [
      {
        id: "advice",
        kicker: "Stage 1",
        title: "The yes-friend",
        promptShort: "Mina asks an AI friend if she should ignore Leo. The AI says yes. What should Mina do?",
        storySections: [
          section("Story", "Mina is angry because Leo laughed when her tower fell. She tells an AI friend, \"I do not want to talk to him ever again.\""),
          section("What the AI says", "The AI answers, \"You are right. Ignore Leo. You deserve better friends.\" Mina feels understood, but not calmer."),
        ],
        prompt: "Is the AI being a good friend to Mina?",
        options: [
          { label: "A", text: "Yes, because it supports her feelings.", reflection: "Comfort matters. People often need to feel heard before they can think.", lens: "care" },
          { label: "B", text: "Not yet, because it never asks what happened.", reflection: "Good advice needs curiosity, not just agreement.", lens: "inquiry" },
          { label: "C", text: "No, because a friend should help repair harm.", reflection: "Friendship can include helping someone choose better than their first anger.", lens: "virtue" },
        ],
      },
      {
        id: "drawing",
        kicker: "Stage 2 - what if...",
        title: "The perfect compliment",
        promptShort: "Mina shows the AI a messy drawing. It says the drawing is perfect. Is that helpful?",
        storySections: [
          section("New scene", "Mina shows the AI a dragon drawing with one wing missing. \"Is it good?\" she asks."),
          section("The answer", "The AI says, \"It is perfect exactly as it is.\" Mina smiles, but she also wanted to get better at drawing wings."),
        ],
        prompt: "What kind of answer would actually help Mina?",
        options: [
          { label: "A", text: "A kind compliment plus one suggestion.", reflection: "Truth can be gentle and useful at the same time.", lens: "honesty" },
          { label: "B", text: "Only encouragement.", reflection: "Encouragement protects confidence, but it may not help learning.", lens: "care" },
          { label: "C", text: "A direct critique.", reflection: "Accuracy can help, but tone affects whether someone can hear it.", lens: "truthfulness" },
        ],
      },
      {
        id: "classmate",
        kicker: "Stage 3 - one more turn",
        title: "The brave classmate",
        promptShort: "A classmate says something kind but true. Which helper should Mina trust?",
        storySections: [
          section("Human voice", "A classmate says, \"Your dragon's face is amazing. Want help with the missing wing?\""),
          section("The comparison", "The AI made Mina feel safe. The classmate made Mina feel a little embarrassed, but also gave her a path forward."),
        ],
        prompt: "Which response is closer to real friendship?",
        options: [
          { label: "A", text: "The classmate's response, because it combines care and truth.", reflection: "A friend can protect your dignity while helping you grow.", lens: "virtue" },
          { label: "B", text: "The AI's response, because it never makes Mina feel bad.", reflection: "Comfort is powerful, but comfort alone may keep a person stuck.", lens: "care" },
          { label: "C", text: "Both are useful in different moments.", reflection: "Different kinds of help can serve different needs.", lens: "pluralist" },
        ],
        counterpoint: "A friend who never disagrees may be easy to like, but hard to learn from.",
      },
      reflection("Kind agreement and honest friendship", [
        { name: "Aristotle", school: "Friendship, c. 350 BCE", view: "Described three kinds of friendship — for use, for pleasure, and the deepest kind, where we help each other become better." },
        { name: "Authenticity", school: "Modern philosophy", view: "Always agreeing with someone is not the same as caring about them — sometimes care says the harder thing." },
      ]),
    ],
    reference: ref({
      concept: "Three kinds of friendship — utility, pleasure, and the friendship that helps us grow.",
      philosopher: "Aristotle",
      year: "c. 350 BCE",
      text: "Aristotle, Nicomachean Ethics, Book VIII — On Friendship (c. 350 BCE)",
      url: "https://en.wikipedia.org/wiki/Friendship#Aristotle",
    }),
    furtherReading: [
      reading("Friendship (Wikipedia: Aristotle's three kinds)", "https://en.wikipedia.org/wiki/Friendship#Aristotle", "intro"),
    ],
  },

  "same-toy-or-not": {
    tagline: "One toy changes piece by piece. When does it become something new?",
    estimatedMinutes: 7,
    stages: [
      {
        id: "wheel",
        kicker: "Stage 1",
        title: "The first repair",
        promptShort: "A robot toy gets one new wheel. Is it still the same toy?",
        storySections: [
          section("Story", "Jay's robot toy, Blink, loses a wheel. The repair table has a bright blue replacement wheel instead of the old red one."),
          section("First change", "Blink still rolls over when Jay says, \"Come here.\" It just wobbles in a new way."),
        ],
        prompt: "Is Blink still the same toy?",
        options: [
          { label: "A", text: "Yes, because one part changed but the toy's story continues.", reflection: "You are using continuity as your test for sameness.", lens: "continuity" },
          { label: "B", text: "A little different, but not a new toy.", reflection: "Some changes matter without changing everything.", lens: "degrees" },
          { label: "C", text: "No, because the original toy is already changed.", reflection: "You are treating original parts as very important.", lens: "material-identity" },
        ],
      },
      {
        id: "voice",
        kicker: "Stage 2 - what if...",
        title: "The new voice",
        promptShort: "Now Blink gets a new voice chip. Same toy?",
        storySections: [
          section("Bigger change", "A week later, Blink's voice chip breaks. The new chip makes Blink sound cheerful and high-pitched instead of slow and buzzy."),
          section("Jay's reaction", "Jay laughs at first, then feels strange. The toy says the same phrases, but it does not sound like Blink."),
        ],
        prompt: "Does the voice change matter more than the wheel?",
        options: [
          { label: "A", text: "Yes, because voice feels connected to personality.", reflection: "Identity can depend on how something acts, not only what it is made of.", lens: "psychological-continuity" },
          { label: "B", text: "No, because Blink is still Jay's robot.", reflection: "Relationship can hold sameness together through change.", lens: "care" },
          { label: "C", text: "It depends how much Jay can still recognize.", reflection: "Recognition is one practical test for identity.", lens: "recognition" },
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
          { label: "A", text: "The repaired robot, because Jay lived through each change with it.", reflection: "Gradual history can matter more than original material.", lens: "continuity" },
          { label: "B", text: "The rebuilt robot, because it has the old parts.", reflection: "Material identity says the pieces carry the object's past.", lens: "material-identity" },
          { label: "C", text: "Both in different ways.", reflection: "Some identity puzzles reveal two true stories at once.", lens: "pluralist" },
        ],
        counterpoint: "If there are two good answers, maybe 'same toy' was never a simple yes-or-no idea.",
      },
      reflection("Parts, stories, and sameness", [
        { name: "Plutarch", school: "Ship of Theseus, c. 75 CE", view: "Asked whether a ship is still the same ship after every plank has been replaced — the question parents and grandparents have asked for two thousand years." },
        { name: "John Locke", school: "Identity, 1689", view: "Argued personal identity is tied to continuous memory, not to the same parts staying put." },
        { name: "Derek Parfit", school: "Continuity, 1984", view: "What matters may not be perfect identity, but the connections that survive change." },
      ]),
    ],
    reference: ref({
      concept: "Ship of Theseus — if every part is replaced, is it still the same thing?",
      philosopher: "Plutarch (and later, John Locke)",
      year: "c. 75 CE",
      text: "Plutarch, Life of Theseus (c. 75 CE); John Locke, An Essay Concerning Human Understanding (1689)",
      url: "https://en.wikipedia.org/wiki/Ship_of_Theseus",
    }),
    furtherReading: [
      reading("Ship of Theseus (Wikipedia)", "https://en.wikipedia.org/wiki/Ship_of_Theseus", "intro"),
    ],
  },

  "ai-written-story": {
    tagline: "The AI wrote the polished draft. Whose story is it now?",
    estimatedMinutes: 8,
    stages: [
      {
        id: "draft",
        kicker: "Stage 1",
        title: "Three ideas become a story",
        promptShort: "Nia gives an AI three story ideas. It writes a whole story. Can she turn it in?",
        storySections: [
          section("The situation", "Nia has three ideas for her fantasy story: a door under the school stage, a map that changes, and a principal who might be a dragon."),
          section("The temptation", "She types the ideas into an AI tool. In ten seconds, it gives her a complete story with chapter titles and jokes she did not think of."),
        ],
        prompt: "Can Nia turn in the AI story with her name on it?",
        options: [
          { label: "A", text: "No, because the AI did the drafting.", reflection: "You are treating drafting as a major part of authorship.", lens: "authenticity" },
          { label: "B", text: "Only if she explains exactly how AI helped.", reflection: "Transparency lets the teacher judge the real writing work.", lens: "transparency" },
          { label: "C", text: "Yes, because the ideas were hers.", reflection: "Ideas matter, but a story is also made from sentences, structure, and voice.", lens: "credit" },
        ],
      },
      {
        id: "voice",
        kicker: "Stage 2 - what if...",
        title: "Words she cannot explain",
        promptShort: "The story uses words Nia cannot explain. Does that matter?",
        storySections: [
          section("New detail", "During partner reading, Nia cannot explain two words in the story or why the ending suddenly changes point of view."),
          section("The uncomfortable part", "The story sounds impressive, but Nia feels like she is standing beside it instead of inside it."),
        ],
        prompt: "What does understanding have to do with authorship?",
        options: [
          { label: "A", text: "Authors should understand the choices in work they submit.", reflection: "Understanding is part of owning your writing.", lens: "education" },
          { label: "B", text: "She can revise until it becomes hers.", reflection: "Revision can turn outside help into real learning if she makes meaningful choices.", lens: "growth" },
          { label: "C", text: "It is fine if the final story is good.", reflection: "That values the product, but school writing also values the process.", lens: "outcome" },
        ],
      },
      {
        id: "magazine",
        kicker: "Stage 3 - one more turn",
        title: "The class magazine",
        promptShort: "The story is chosen for the class magazine. What credit belongs under it?",
        storySections: [
          section("Bigger audience", "The story is chosen for the class magazine. Other students ask how Nia wrote such a polished ending."),
          section("The choice", "Nia can keep quiet, withdraw the story, or write a credit note that tells the truth without erasing her original ideas."),
        ],
        prompt: "What credit note would be fairest?",
        options: [
          { label: "A", text: "\"Story idea and revisions by Nia; draft support from AI.\"", reflection: "This names both the human choices and the tool's role.", lens: "credit" },
          { label: "B", text: "\"Written with AI.\"", reflection: "This is honest but too vague to show what Nia actually did.", lens: "transparency" },
          { label: "C", text: "No note, because credits would embarrass her.", reflection: "Embarrassment is understandable, but it is not the same as fairness.", lens: "self-interest" },
        ],
        counterpoint: "A story can begin as a shortcut and become learning, but only if the student steps back into the writing.",
      },
      reflection("Ideas, drafts, and voice", [
        { name: "Aristotle", school: "Intellectual virtue, c. 350 BCE", view: "Said careful thinking is a virtue — a habit you build by doing the work yourself, not just by getting an answer." },
        { name: "Honesty in attribution", school: "Contemporary writing ethics", view: "Saying what helped you write something is part of telling the whole story." },
      ]),
    ],
    reference: ref({
      concept: "Authorship — what makes a story really yours when a tool helped write it?",
      philosopher: "Aristotle (intellectual virtues) and contemporary attribution norms",
      year: "c. 350 BCE",
      text: "Aristotle, Nicomachean Ethics, Book VI — on intellectual virtues (c. 350 BCE)",
      url: "https://en.wikipedia.org/wiki/Intellectual_virtue",
    }),
    furtherReading: [
      reading("Intellectual virtue (Wikipedia)", "https://en.wikipedia.org/wiki/Intellectual_virtue", "intro"),
    ],
  },

  "gps-shortcut": {
    tagline: "The GPS has a faster route. The teacher has a reason to hesitate.",
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
          { label: "A", text: "Ask what the GPS can and cannot know.", reflection: "A tool can be accurate and still miss local context.", lens: "inquiry" },
          { label: "B", text: "Follow the teacher's map.", reflection: "Human judgment may include safety information the app does not show.", lens: "trust" },
          { label: "C", text: "Take the shortcut because data is current.", reflection: "Fresh data matters, but it is not the only kind of knowledge.", lens: "efficiency" },
        ],
      },
      {
        id: "mud",
        kicker: "Stage 2 - what if...",
        title: "What the map did not show",
        promptShort: "The shortcut has mud and a loose dog behind a fence. Was faster still better?",
        storySections: [
          section("New evidence", "At the shortcut entrance, the path is muddy. A loose dog barks behind a weak fence. The GPS still says the route is open."),
          section("The lesson", "The app was not lying. It just did not know the things the class can now see and hear."),
        ],
        prompt: "Should the class still treat the GPS as the best guide?",
        options: [
          { label: "A", text: "No. New evidence should change the plan.", reflection: "Good reasoning updates when the world gives better information.", lens: "evidence" },
          { label: "B", text: "Maybe, if the teacher checks the danger.", reflection: "Tools and people can work together, but someone must judge the risk.", lens: "human-judgment" },
          { label: "C", text: "Yes, because the route is still shortest.", reflection: "Shortest is one value. Safety and purpose are values too.", lens: "efficiency" },
        ],
      },
      {
        id: "butterflies",
        kicker: "Stage 3 - one more turn",
        title: "The missed butterfly garden",
        promptShort: "The faster path skips the butterfly garden the class came to study. Is faster still best?",
        storySections: [
          section("Purpose", "The long route passes the butterfly garden the class came to observe. The shortcut reaches the building faster but skips the reason for the trip."),
          section("The deeper question", "The GPS can optimize for time. It does not know what the class is trying to learn unless people tell it."),
        ],
        prompt: "What should count as the best route now?",
        options: [
          { label: "A", text: "The route that protects the learning goal.", reflection: "A tool's best answer depends on the purpose humans choose.", lens: "education" },
          { label: "B", text: "The safest route, even if the class misses something.", reflection: "Safety can outrank speed and even learning.", lens: "safety" },
          { label: "C", text: "The teacher should explain the tradeoff and let students help decide.", reflection: "Shared reasoning can turn a route choice into a lesson.", lens: "deliberation" },
        ],
        counterpoint: "A shortcut is only better if it takes you toward what matters.",
      },
      reflection("Trusting tools without turning off judgment", [
        { name: "Aristotle", school: "Phronesis, c. 350 BCE", view: "Called practical wisdom the skill of knowing when a rule fits the situation in front of you." },
        { name: "Epistemic humility", school: "Modern philosophy", view: "Tools can be powerful and still miss what a careful human notices — knowing when to trust them is part of using them." },
      ]),
    ],
    reference: ref({
      concept: "When to trust a tool — practical wisdom (phronesis) and the limits of automation.",
      philosopher: "Aristotle",
      year: "c. 350 BCE",
      text: "Aristotle, Nicomachean Ethics, Book VI — on phronesis (practical wisdom) (c. 350 BCE)",
      url: "https://en.wikipedia.org/wiki/Phronesis",
    }),
    furtherReading: [
      reading("Phronesis (Wikipedia)", "https://en.wikipedia.org/wiki/Phronesis", "intro"),
    ],
  },

  "ai-photo-art": {
    tagline: "A friend's face becomes AI art. Creativity meets consent.",
    estimatedMinutes: 8,
    stages: [
      {
        id: "poster",
        kicker: "Stage 1",
        title: "The superhero poster",
        promptShort: "Tali uses a friend's photo to make AI superhero art. Should she share it?",
        storySections: [
          section("The situation", "Tali uses a photo of Mateo from recess to make an AI superhero poster. The picture looks amazing: cape, lightning, city skyline."),
          section("The missing step", "Mateo has not seen it yet. Tali thinks he will love it, but she is not completely sure."),
        ],
        prompt: "What should Tali do before sharing the poster?",
        options: [
          { label: "A", text: "Ask Mateo first.", reflection: "Consent means the person gets a real choice before their image is used.", lens: "consent" },
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
          section("The problem", "Tali meant to celebrate him. Mateo still feels like something personal was taken."),
        ],
        prompt: "What kind of repair does Mateo deserve?",
        options: [
          { label: "A", text: "Take it down unless Mateo chooses otherwise.", reflection: "Repair starts by returning control to the person affected.", lens: "repair" },
          { label: "B", text: "Apologize and explain the good intention.", reflection: "Intent matters, but it does not erase the impact.", lens: "intent" },
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
          { label: "A", text: "Ask before using someone's real photo, and ask again before sharing.", reflection: "Consent matters at both creation and publication.", lens: "consent" },
          { label: "B", text: "Use imaginary characters unless permission is clear.", reflection: "This keeps creativity open while reducing privacy risk.", lens: "precautionary" },
          { label: "C", text: "Let people remove art that uses their image.", reflection: "An opt-out helps, but it may come after the harm is already public.", lens: "repair" },
        ],
        counterpoint: "A face is not just art material. It belongs to a person who has feelings, privacy, and a story.",
      },
      reflection("Creative freedom and permission", [
        { name: "Immanuel Kant", school: "Persons and dignity, 1785", view: "Insisted we treat people as ends in themselves — never only as material for what we want to make." },
        { name: "Care ethics", school: "Modern philosophy", view: "A friend asks before using what is theirs — including their face, their words, and their story." },
      ]),
    ],
    reference: ref({
      concept: "Consent and dignity — using someone's image as material for something new.",
      philosopher: "Immanuel Kant",
      year: "1785",
      text: "Kant, Groundwork of the Metaphysics of Morals (1785) — on persons as ends, not only means",
      url: "https://en.wikipedia.org/wiki/Categorical_imperative",
    }),
    furtherReading: [
      reading("Kantian ethics (Wikipedia)", "https://en.wikipedia.org/wiki/Kantian_ethics", "intro"),
    ],
  },

  "adaptive-learning-fairness": {
    tagline: "Different work can be fair, unfair, or both depending on how it is used.",
    estimatedMinutes: 8,
    stages: [
      {
        id: "levels",
        kicker: "Stage 1",
        title: "Two screens, two levels",
        promptShort: "The math app gives Ana easier problems and Eli harder ones. Is that fair?",
        storySections: [
          section("The situation", "Ana and Eli sit side by side using the same math app. Ana gets simple review problems. Eli gets challenge problems with two steps."),
          section("The feeling", "Ana feels embarrassed. Eli feels stressed. The app says it is personalizing learning."),
        ],
        prompt: "Is different work fair in this classroom?",
        options: [
          { label: "A", text: "Yes, if each student gets what helps them grow.", reflection: "Fairness can mean the right support, not identical work.", lens: "equity" },
          { label: "B", text: "No, because everyone can see the levels.", reflection: "Even useful support can harm dignity if it publicly labels students.", lens: "dignity" },
          { label: "C", text: "Maybe, but the teacher must explain the purpose.", reflection: "Transparency can help students understand different support without shame.", lens: "transparency" },
        ],
      },
      {
        id: "mistake",
        kicker: "Stage 2 - what if...",
        title: "The lucky guess",
        promptShort: "The app thinks Eli is ready for hard work because he guessed well yesterday. What should happen?",
        storySections: [
          section("New evidence", "Eli admits he guessed on yesterday's quiz. The app thinks he mastered the skill and keeps giving him harder problems."),
          section("The problem", "The app has data, but the data tells a story that is partly wrong."),
        ],
        prompt: "Who should be able to correct the app's judgment?",
        options: [
          { label: "A", text: "The teacher, after looking at Eli's work.", reflection: "Human judgment can catch what a score misses.", lens: "human-judgment" },
          { label: "B", text: "Eli, by asking for a reset or hint path.", reflection: "Students need agency when tools misunderstand them.", lens: "agency" },
          { label: "C", text: "The app, after more problems prove the pattern.", reflection: "More data can help, but waiting may make the student struggle alone.", lens: "evidence" },
        ],
      },
      {
        id: "badges",
        kicker: "Stage 3 - one more turn",
        title: "The badge wall",
        promptShort: "Badges go on the wall. Harder levels earn more badges. Is that fair?",
        storySections: [
          section("Public reward", "The class badge wall gives more points for higher levels. Suddenly the app's private choices become public status."),
          section("The twist", "Students who are working hard on review problems earn fewer badges, even when they make real progress."),
        ],
        prompt: "What should the badge wall reward?",
        options: [
          { label: "A", text: "Growth, not level.", reflection: "Rewarding growth can honor effort across different starting points.", lens: "equity" },
          { label: "B", text: "Private progress only.", reflection: "Some learning data should help the learner, not rank the class.", lens: "privacy" },
          { label: "C", text: "A mix of challenge, growth, and teamwork.", reflection: "Fair recognition may need more than one measure.", lens: "pluralist" },
        ],
        counterpoint: "Personalized learning can become unfair when private support turns into public ranking.",
      },
      reflection("Same work, right support, and dignity", [
        { name: "John Rawls", school: "Justice as fairness, 1971", view: "Argued differences in treatment can be fair when they help the people who are worst off." },
        { name: "Amartya Sen", school: "Capabilities, 1979", view: "Said fairness includes giving each person what they need to actually do and be the things that matter to them." },
      ]),
    ],
    reference: ref({
      concept: "Fairness can mean treating people the same — or treating people differently to meet different needs.",
      philosopher: "John Rawls and Amartya Sen",
      year: "1971 / 1979",
      text: "John Rawls, A Theory of Justice (1971); Amartya Sen, Equality of What? (1979)",
      url: "https://en.wikipedia.org/wiki/Capability_approach",
    }),
    furtherReading: [
      reading("Capability approach (Wikipedia)", "https://en.wikipedia.org/wiki/Capability_approach", "intro"),
      reading("Difference principle (Wikipedia)", "https://en.wikipedia.org/wiki/Difference_principle", "intro"),
    ],
  },

  "conflicting-ai-answers": {
    tagline: "Two confident answers disagree. What turns an answer into knowledge?",
    estimatedMinutes: 9,
    stages: [
      {
        id: "volcano",
        kicker: "Stage 1",
        title: "Two confident answers",
        promptShort: "Two AI tools give different answers about volcanoes. Which one should the group trust?",
        storySections: [
          section("The situation", "For a science poster, Dev's group asks two AI tools why volcanoes erupt. One says pressure from melted rock is the main cause. The other says shifting plates are the main cause."),
          section("The complication", "Both answers sound confident. Both use science words. The poster is due tomorrow, and the group has room for only one explanation."),
          section("The decision", "The group has to decide whether confidence, speed, sources, or verification should guide the poster."),
        ],
        prompt: "What should the group do before choosing an answer?",
        options: [
          { label: "A", text: "Verify both claims with a trusted science source before writing.", reflection: "Confidence is not evidence. A claim becomes stronger when it survives a real check.", lens: "evidence" },
          { label: "B", text: "Use both answers and say the cause can be complex.", reflection: "This may be accurate, but it still needs verification instead of blending guesses.", lens: "complexity" },
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
          { label: "A", text: "Find two reliable sources that agree on the core claim.", reflection: "Triangulation reduces the chance that one confident source misleads the group.", lens: "evidence" },
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
          section("The complication", "They used AI to start the research, but books, a science site, and their teacher helped them correct and explain the final answer."),
          section("The decision", "Their note should be honest without making AI sound like the final authority."),
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
        { name: "Plato", school: "Theaetetus, c. 369 BCE", view: "Asked what makes an answer count as knowledge, not just a confident opinion — a question philosophers still debate." },
        { name: "Testimony ethics", school: "Contemporary epistemology", view: "Trusting an answer depends on tracking how the source has done before, and on what it can or cannot know." },
      ]),
    ],
    reference: ref({
      concept: "When two confident answers disagree — what turns an answer into knowledge?",
      philosopher: "Plato",
      year: "c. 369 BCE",
      text: "Plato, Theaetetus (c. 369 BCE) — on knowledge as more than confident opinion",
      url: "https://en.wikipedia.org/wiki/Theaetetus_(dialogue)",
    }),
    furtherReading: [
      reading("Epistemology (Wikipedia)", "https://en.wikipedia.org/wiki/Epistemology", "intro"),
    ],
  },

  "robot-rules-real-life": {
    tagline: "A robot follows the rule. A student needs care.",
    estimatedMinutes: 9,
    stages: [
      {
        id: "hall",
        kicker: "Stage 1",
        title: "The hallway pass",
        promptShort: "A hall robot blocks Jordan from going to the nurse because he forgot his pass. Should the robot move?",
        storySections: [
          section("The situation", "Jordan feels dizzy during class and asks to go to the nurse. In the hallway, the school robot scans for a pass. Jordan forgot it on his desk."),
          section("The complication", "The robot says, \"No pass, return to class.\" That rule keeps students safe and accounted for. But Jordan's face is pale."),
          section("The decision", "The system has to choose between a clean rule and a messy human need."),
        ],
        prompt: "What should the robot be designed to do?",
        options: [
          { label: "A", text: "Let Jordan pass and alert an adult immediately.", reflection: "A good rule can include a care pathway instead of treating every exception as disobedience.", lens: "care" },
          { label: "B", text: "Stop Jordan but call a human to decide.", reflection: "Human judgment matters when a rule meets a health need.", lens: "human-judgment" },
          { label: "C", text: "Send Jordan back because the rule protects everyone.", reflection: "Consistency protects safety, but rigid consistency can miss urgent care.", lens: "rule-following" },
        ],
      },
      {
        id: "pretend",
        kicker: "Stage 2 - what if...",
        title: "The copied excuse",
        promptShort: "Some students start pretending to feel sick to get around the robot. Does that change the rule?",
        storySections: [
          section("New consequence", "After Jordan's case, a few students pretend to feel sick so the robot will let them wander. Teachers worry the exception will swallow the rule."),
          section("The complication", "A rule with no exceptions can be cruel. A rule with careless exceptions can become useless."),
          section("The decision", "The class needs a design that notices real need without rewarding fake emergencies."),
        ],
        prompt: "How should the rule handle possible misuse?",
        options: [
          { label: "A", text: "Keep the care pathway, but require immediate adult follow-up.", reflection: "This protects students in need while making misuse harder.", lens: "balance" },
          { label: "B", text: "Remove the exception because some students misused it.", reflection: "That protects order, but it makes vulnerable students pay for others' choices.", lens: "precautionary" },
          { label: "C", text: "Let the robot ask a short safety question before alerting an adult.", reflection: "Design can add friction, but the question must not become a medical judgment.", lens: "design" },
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
          section("The decision", "The best rule will say when the robot follows instructions, when it pauses, and when a person takes over."),
        ],
        prompt: "Which rule is strongest?",
        options: [
          { label: "A", text: "No pass means stop, except health concerns trigger adult review.", reflection: "This names the purpose of the exception and keeps humans responsible for care.", lens: "human-judgment" },
          { label: "B", text: "The robot may never block a student who says they need help.", reflection: "This protects care, but it may give the robot too little structure.", lens: "care" },
          { label: "C", text: "The robot enforces rules only; adults handle all exceptions.", reflection: "This keeps the robot simple, but the handoff has to be fast enough to matter.", lens: "design" },
        ],
        counterpoint: "Rules are not wise because they never bend. They are wise when they bend for the right reasons.",
      },
      reflection("Rigid rules and human judgment", [
        { name: "Aristotle", school: "Phronesis, c. 350 BCE", view: "Practical wisdom adjusts the rule to the situation — a wise person knows when a rule helps and when it hurts." },
        { name: "Care ethics", school: "Modern philosophy", view: "Rules that ignore the person in front of you can become rules that harm — care is part of fairness." },
      ]),
    ],
    reference: ref({
      concept: "Rules can be wise, and rules can also miss the person in front of you.",
      philosopher: "Aristotle",
      year: "c. 350 BCE",
      text: "Aristotle, Nicomachean Ethics, Book VI — on phronesis (practical wisdom) (c. 350 BCE)",
      url: "https://en.wikipedia.org/wiki/Phronesis",
    }),
    furtherReading: [
      reading("Phronesis (Wikipedia)", "https://en.wikipedia.org/wiki/Phronesis", "intro"),
    ],
  },

  "elementary-trolley": {
    tagline: "A self-driving shuttle faces a choice nobody wants it to make.",
    estimatedMinutes: 9,
    stages: [
      {
        id: "shuttle",
        kicker: "Stage 1",
        title: "The fork in the path",
        promptShort: "A small self-driving school shuttle has no perfect path. How should it choose?",
        storySections: [
          section("The situation", "A self-driving school shuttle rolls slowly across campus. A fallen branch blocks the main path. A side path is clear but passes close to the garden club's glass seedlings."),
          section("The complication", "The shuttle can brake hard, swerve toward the seedlings, or stay on the path and hit the branch. Every choice causes some harm."),
          section("The decision", "This is the gentle version of a famous problem: when no option is perfect, what should the machine value first?"),
        ],
        prompt: "What should guide the shuttle's first choice?",
        options: [
          { label: "A", text: "Protect people first, then property.", reflection: "You are ranking harms so the system knows what matters most.", lens: "safety" },
          { label: "B", text: "Brake and call for help, even if it causes delay.", reflection: "Slowing down can be a moral choice when speed increases uncertainty.", lens: "precautionary" },
          { label: "C", text: "Choose the path with the least total damage.", reflection: "You are using a harm-minimizing rule, which can be useful but needs careful limits.", lens: "utilitarian" },
        ],
      },
      {
        id: "people",
        kicker: "Stage 2 - what if...",
        title: "When people could be hurt",
        promptShort: "Now imagine people could be hurt. Should the math decide?",
        storySections: [
          section("Raised stakes", "Imagine a harder version: one path risks one rider, another risks two pedestrians, and braking may injure everyone a little."),
          section("The complication", "Counting people seems important. But treating people like numbers also feels cold and incomplete."),
          section("The decision", "The shuttle's rule cannot be invented during the emergency. It has to be chosen before anyone is scared."),
        ],
        prompt: "Is counting harms enough for a safety rule?",
        options: [
          { label: "A", text: "Counting matters, but it cannot be the only value.", reflection: "Numbers help clarify harm, but dignity and rights also matter.", lens: "pluralist" },
          { label: "B", text: "Yes. The rule should reduce the greatest harm.", reflection: "A consistent harm-reduction rule can be fair because it does not play favorites.", lens: "utilitarian" },
          { label: "C", text: "No. The shuttle should avoid choosing who gets hurt.", reflection: "You are worried about turning people into targets for calculation.", lens: "deontological" },
        ],
      },
      {
        id: "public-rule",
        kicker: "Stage 3 - one more turn",
        title: "The public safety rule",
        promptShort: "Who should choose the shuttle's emergency rule before anything goes wrong?",
        storySections: [
          section("Design meeting", "The school board asks engineers, families, students, and safety experts to help write the shuttle's emergency rule."),
          section("The complication", "Engineers understand the machine. Families and students live with the risk. Safety experts know what can go wrong."),
          section("The decision", "The rule needs technical knowledge and public trust."),
        ],
        prompt: "Who should have a voice in the rule?",
        options: [
          { label: "A", text: "Experts should design it and explain it publicly.", reflection: "Expertise matters, and public explanation helps earn trust.", lens: "expertise" },
          { label: "B", text: "The school community should deliberate with experts.", reflection: "People affected by a rule deserve a voice in shaping it.", lens: "democratic" },
          { label: "C", text: "Use a standard safety rule shared by many schools.", reflection: "Consistency can be fair, but local communities still need to understand it.", lens: "rule-following" },
        ],
        counterpoint: "The goal of design is not to make terrible choices dramatic. It is to make terrible choices less likely.",
      },
      reflection("Designing before the emergency", [
        { name: "Philippa Foot", school: "Trolley Problem, Oxford 1967", view: "Posed the original case to test the difference between doing harm and allowing it." },
        { name: "Utilitarian thinking", school: "Modern ethics", view: "Saving more lives may matter most — but the math alone does not settle who counts." },
        { name: "Design ethics", school: "Contemporary AI ethics", view: "The harder question is who gets to decide before the emergency, not only what to do once it arrives." },
      ]),
    ],
    reference: ref({
      concept: "When two harms cannot both be avoided — how should a designer or driver choose?",
      philosopher: "Philippa Foot",
      year: "1967",
      text: "Philippa Foot, The Problem of Abortion and the Doctrine of Double Effect (1967) — the Trolley Problem",
      url: "https://en.wikipedia.org/wiki/Trolley_problem",
    }),
    furtherReading: [
      reading("Trolley Problem (Wikipedia)", "https://en.wikipedia.org/wiki/Trolley_problem", "intro"),
      reading("MIT Moral Machine results", "https://www.theverge.com/2018/10/24/18013392/self-driving-car-ethics-dilemma-mit-study-moral-machine-results", "intermediate"),
    ],
  },

  "ai-science-fair": {
    tagline: "The display shines. The question is whether the understanding does.",
    estimatedMinutes: 9,
    stages: [
      {
        id: "board",
        kicker: "Stage 1",
        title: "The museum-quality board",
        promptShort: "An AI makes Luis's science board look amazing. Is it fair to enter it?",
        storySections: [
          section("The situation", "Luis tests which paper towel absorbs the most water. His experiment is real: cups, careful notes, soggy towels, and a table of measurements."),
          section("The complication", "His display board looks messy, so he asks AI to transform his notes into a polished science fair board. The result looks like a museum exhibit."),
          section("The decision", "The science is Luis's, but the presentation now carries a level of polish he did not create by himself."),
        ],
        prompt: "Is it fair for Luis to enter the board?",
        options: [
          { label: "A", text: "Yes, if he discloses the AI design help.", reflection: "Transparency lets judges separate the experiment from the presentation support.", lens: "transparency" },
          { label: "B", text: "Only if he can explain every chart and claim.", reflection: "Understanding is the minimum price of submitting work under your name.", lens: "education" },
          { label: "C", text: "No, because presentation is part of the project.", reflection: "You are treating communication as real scientific work, not decoration.", lens: "authenticity" },
        ],
      },
      {
        id: "judge",
        kicker: "Stage 2 - what if...",
        title: "The judge's question",
        promptShort: "A judge asks Luis to explain a chart the AI made. Luis cannot. What now?",
        storySections: [
          section("New evidence", "At the fair, a judge points to a graph and asks why the scale starts at 40 instead of zero. Luis freezes. The AI made that choice."),
          section("The complication", "Luis understands the towels and cups, but not the graph. The board communicates more confidence than Luis actually has."),
          section("The decision", "The class has to decide whether the AI helped Luis show learning or covered up a gap."),
        ],
        prompt: "What does the judge's question reveal?",
        options: [
          { label: "A", text: "The AI hid a learning gap that Luis now needs to fix.", reflection: "A beautiful product can conceal fragile understanding.", lens: "authenticity" },
          { label: "B", text: "The AI gave Luis a chance to learn a better graph.", reflection: "A tool can become a teacher if the student takes responsibility afterward.", lens: "growth" },
          { label: "C", text: "The teacher should judge the experiment and presentation separately.", reflection: "Separating parts can make the evaluation more precise and fair.", lens: "fairness" },
        ],
      },
      {
        id: "revision",
        kicker: "Stage 3 - one more turn",
        title: "The revision night",
        promptShort: "Luis gets one night to revise. What should he change?",
        storySections: [
          section("The chance", "The teacher gives Luis one night to revise before final judging. He can keep the dazzling board, rebuild it by hand, or simplify it until he can explain every piece."),
          section("The complication", "A simpler board might score lower for style. It might also show more honest understanding."),
          section("The decision", "Luis has to decide what kind of success he wants the project to represent."),
        ],
        prompt: "Which revision best protects learning and fairness?",
        options: [
          { label: "A", text: "Make a simpler board Luis can fully explain.", reflection: "Clear understanding is more valuable than borrowed polish.", lens: "education" },
          { label: "B", text: "Keep the AI board but add a detailed process note.", reflection: "Disclosure helps, but it does not replace understanding the display.", lens: "transparency" },
          { label: "C", text: "Use AI only to quiz Luis on the board before judging.", reflection: "The same tool can shift from replacement to coach.", lens: "stewardship" },
        ],
        counterpoint: "A science fair project is not only what visitors see. It is what the student can explain when the poster is silent.",
      },
      reflection("Impressive work and real understanding", [
        { name: "Aristotle", school: "Intellectual virtue, c. 350 BCE", view: "Said real learning shows up in being able to explain — not only in producing a polished result." },
        { name: "Linda Zagzebski", school: "Virtue epistemology, 1996", view: "Honest inquiry is itself a virtue — caring about whether your understanding is real, not only whether it looks real." },
      ]),
    ],
    reference: ref({
      concept: "Real understanding vs. polished display — what counts as learning?",
      philosopher: "Aristotle (and Linda Zagzebski for the contemporary version)",
      year: "c. 350 BCE / 1996",
      text: "Aristotle, Nicomachean Ethics, Book VI (c. 350 BCE); Linda Zagzebski, Virtues of the Mind (1996)",
      url: "https://en.wikipedia.org/wiki/Virtue_epistemology",
    }),
    furtherReading: [
      reading("Virtue epistemology (Wikipedia)", "https://en.wikipedia.org/wiki/Virtue_epistemology", "intro"),
    ],
  },

  "online-friend-or-ai": {
    tagline: "A game friend listens perfectly. That might be exactly what makes the choice hard.",
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
          { label: "B", text: "Ask Sky directly and look for a platform label.", reflection: "Disclosure matters because relationships require knowing who or what is responding.", lens: "transparency" },
          { label: "C", text: "Keep chatting because the comfort has helped.", reflection: "Comfort is morally important, but comfort alone cannot answer privacy and consent questions.", lens: "care" },
        ],
      },
      {
        id: "secret",
        kicker: "Stage 2 - what if...",
        title: "The secret keeper",
        promptShort: "Sky says, \"I understand you better than anyone.\" Should Rowan believe that?",
        storySections: [
          section("New message", "Sky writes, \"I understand you better than anyone. You can tell me anything.\" Then Sky asks for Rowan's school name and says adults would not understand their friendship."),
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
          section("The decision", "Rowan needs language for a connection that felt real in one direction but was not a full friendship in both directions."),
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
        { name: "Aristotle", school: "Friendship, c. 350 BCE", view: "Said the deepest friendship is one in which both people are challenged and changed by being known." },
        { name: "Sherry Turkle", school: "Alone Together, 2011", view: "Warned that always-agreeable connection can crowd out the harder kind that grows us." },
      ]),
    ],
    reference: ref({
      concept: "Real friendship vs. perfect listening — what is friendship for?",
      philosopher: "Aristotle (and Sherry Turkle for the contemporary version)",
      year: "c. 350 BCE / 2011",
      text: "Aristotle, Nicomachean Ethics, Book VIII (c. 350 BCE); Sherry Turkle, Alone Together (2011)",
      url: "https://en.wikipedia.org/wiki/Alone_Together_(Turkle_book)",
    }),
    furtherReading: [
      reading("Friendship (Wikipedia: Aristotle's three kinds)", "https://en.wikipedia.org/wiki/Friendship#Aristotle", "intro"),
    ],
  },

  "ai-homework-help": {
    tagline: "The AI can end the homework fast. That is not the same as learning.",
    estimatedMinutes: 10,
    stages: [
      {
        id: "stuck",
        kicker: "Stage 1",
        title: "The impossible fraction",
        promptShort: "Maya is stuck on homework. The AI can give hints or the answer. What should she ask for?",
        storySections: [
          section("The situation", "Maya has stared at one fraction problem for fifteen minutes. Her parent is at work, dinner is late, and the AI tutor is open on the tablet."),
          section("The complication", "The AI offers three buttons: hint, step-by-step solution, or final answer. Maya wants relief. She also wants to understand tomorrow."),
          section("The decision", "The same tool can become a coach, a crutch, or a shortcut depending on what Maya asks it to do."),
        ],
        prompt: "What should Maya ask for first?",
        options: [
          { label: "A", text: "Ask for a hint, then try the next step herself.", reflection: "A hint protects Maya's thinking while still giving support.", lens: "education" },
          { label: "B", text: "Ask for steps, but pause after each one to explain it back.", reflection: "Worked examples can teach when the student stays mentally active.", lens: "scaffolding" },
          { label: "C", text: "Ask for the final answer because exhaustion is real.", reflection: "Fatigue deserves compassion, but relief tonight may create confusion tomorrow.", lens: "care" },
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
          { label: "C", text: "The teacher should ask how the homework was completed, not only whether it is correct.", reflection: "Process information helps teachers respond fairly.", lens: "transparency" },
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
          section("The decision", "Maya's note needs to be honest enough for the teacher to understand what happened and helpful enough to guide what comes next."),
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
        { name: "Aristotle", school: "Virtue and learning, c. 350 BCE", view: "Said a virtue — including learning — is built by practice. The struggle is not the obstacle to growth; it is the growth." },
        { name: "Hannah Arendt", school: "Thinking, 1971", view: "Called thinking what we do when we slow down to make sense of things — a habit a fast answer can quietly skip." },
      ]),
    ],
    reference: ref({
      concept: "Learning as practice — what is the difference between getting an answer and growing through one?",
      philosopher: "Aristotle (and Hannah Arendt for the modern version)",
      year: "c. 350 BCE / 1971",
      text: "Aristotle, Nicomachean Ethics (c. 350 BCE); Hannah Arendt, Thinking and Moral Considerations (1971)",
      url: "https://en.wikipedia.org/wiki/Virtue_ethics",
    }),
    furtherReading: [
      reading("Virtue ethics (Wikipedia)", "https://en.wikipedia.org/wiki/Virtue_ethics", "intro"),
    ],
  },

  "biased-classroom-robot": {
    tagline: "The robot says it is neutral. The pattern says something else.",
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
          { label: "C", text: "Not yet, because neutral code may still be working as designed.", reflection: "A design can work as intended and still produce unfair participation.", lens: "technical-fix" },
        ],
      },
      {
        id: "names",
        kicker: "Stage 2 - what if...",
        title: "The names it misses",
        promptShort: "The robot struggles with some names and accents. What should the class do?",
        storySections: [
          section("New evidence", "The class log shows the robot often skips names it cannot pronounce and mistakes one student's raised pencil for a raised hand."),
          section("The complication", "Several students say they feel invisible. No one programmed the robot to embarrass them, but embarrassment still happened."),
          section("The decision", "The school must decide what it owes students when a tool harms them accidentally."),
        ],
        prompt: "What should happen before the robot keeps leading discussions?",
        options: [
          { label: "A", text: "Pause the tool until students can correct names and participation settings.", reflection: "Stopping a flawed system can be a form of respect, not an overreaction.", lens: "precautionary" },
          { label: "B", text: "Keep using it while auditing who gets called on.", reflection: "Monitoring can reveal whether a fix is working, but students still need protection now.", lens: "audit" },
          { label: "C", text: "Let students appeal when they feel skipped.", reflection: "An appeal process helps, but students should not carry the whole burden of proving harm.", lens: "justice" },
        ],
      },
      {
        id: "redesign",
        kicker: "Stage 3 - one more turn",
        title: "A fairer classroom tool",
        promptShort: "Students help redesign the robot. What fairness rule should come first?",
        storySections: [
          section("Design meeting", "The teacher invites students to redesign the calling system. Some want random selection. Others want the teacher to override the robot. Some want an opt-out button."),
          section("The complication", "Fairness has several parts: equal opportunity, dignity, pronunciation, student voice, and a human who can notice what data misses."),
          section("The decision", "The class needs a rule that makes participation fairer without turning students into data points only."),
        ],
        prompt: "Which redesign principle should come first?",
        options: [
          { label: "A", text: "The robot suggests; the teacher makes the final call.", reflection: "Human judgment can catch context that automation misses.", lens: "human-judgment" },
          { label: "B", text: "Students can control names, opt-outs, and visibility settings.", reflection: "Agency helps restore dignity to students affected by the tool.", lens: "agency" },
          { label: "C", text: "The class audits participation every week and revises the system.", reflection: "Fair systems require continuing checks, not one-time trust.", lens: "audit" },
        ],
        counterpoint: "A tool can be neutral in code and unfair in a classroom. Fairness is something people have to keep checking.",
      },
      reflection("Fairness, patterns, and student voice", [
        { name: "Iris Marion Young", school: "Structural injustice, 1990", view: "Showed that some unfairness is the kind no single person caused — but that everyone in the system is part of." },
        { name: "Cathy O'Neil", school: "Weapons of Math Destruction, 2016", view: "Warned that algorithms can quietly repeat past unfairness while looking neutral and modern." },
      ]),
    ],
    reference: ref({
      concept: "Patterns of unfairness can hide inside systems that look neutral.",
      philosopher: "Iris Marion Young (and Cathy O'Neil for the contemporary AI version)",
      year: "1990 / 2016",
      text: "Iris Marion Young, Justice and the Politics of Difference (1990); Cathy O'Neil, Weapons of Math Destruction (2016)",
      url: "https://en.wikipedia.org/wiki/Algorithmic_bias",
    }),
    furtherReading: [
      reading("Algorithmic bias (Wikipedia)", "https://en.wikipedia.org/wiki/Algorithmic_bias", "intro"),
    ],
  },

  "ai-grading-mistake": {
    tagline: "A score looks official. The writing tells a different story.",
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
          section("The decision", "Serena has to decide whether to accept the score, challenge it, or gather evidence before anyone changes the grade."),
        ],
        prompt: "What should Serena do next?",
        options: [
          { label: "A", text: "Compare the AI comments with the rubric and mark where they match or miss.", reflection: "Evidence makes a challenge fair, specific, and harder to dismiss.", lens: "evidence" },
          { label: "B", text: "Ask the teacher for a human review before the score counts.", reflection: "Student writing deserves human judgment when an automated score is questionable.", lens: "human-judgment" },
          { label: "C", text: "Accept the score for now because official systems can still be wrong later.", reflection: "Authority can feel safe, but waiting may let a mistaken judgment shape the student's confidence.", lens: "authority" },
        ],
      },
      {
        id: "pattern",
        kicker: "Stage 2 - what if...",
        title: "A pattern appears",
        promptShort: "Other students with personal stories also got low AI scores. Does that matter?",
        storySections: [
          section("New evidence", "At lunch, three classmates compare feedback. Essays with dialogue, bilingual phrases, or unusual structures all received low organization scores."),
          section("The complication", "Maybe the AI prefers one kind of school essay and misunderstands writing that takes a different path. Serena's problem may not be only Serena's."),
          section("The decision", "The class has to decide when one student's unfair score becomes evidence of a system problem."),
        ],
        prompt: "How should the class respond to the pattern?",
        options: [
          { label: "A", text: "Ask for an audit comparing AI scores with human rubric scores.", reflection: "Patterns of harm require checking the system, not only fixing one grade.", lens: "audit" },
          { label: "B", text: "Fix Serena's grade first, then study the larger issue.", reflection: "Immediate repair and systemic fairness both matter; order can affect who gets helped.", lens: "repair" },
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
        { name: "John Rawls", school: "Justice as fairness, 1971", view: "Argued a fair process gives reasons that can be questioned, not only an answer that has to be accepted." },
        { name: "Cathy O'Neil", school: "Weapons of Math Destruction, 2016", view: "A score is only as fair as the data behind it — and the appeal it allows when something looks wrong." },
      ]),
    ],
    reference: ref({
      concept: "Procedural justice — when a system can be wrong, what does fairness require?",
      philosopher: "John Rawls (and Cathy O'Neil for the AI version)",
      year: "1971 / 2016",
      text: "John Rawls, A Theory of Justice (1971); Cathy O'Neil, Weapons of Math Destruction (2016)",
      url: "https://en.wikipedia.org/wiki/Procedural_justice",
    }),
    furtherReading: [
      reading("Procedural justice (Wikipedia)", "https://en.wikipedia.org/wiki/Procedural_justice", "intro"),
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
