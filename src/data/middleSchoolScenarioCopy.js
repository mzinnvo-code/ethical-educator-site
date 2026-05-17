const section = (label, text) => ({ label, text });

const reflection = (title, positions = []) => ({
  id: "synthesis",
  kicker: "Reflection",
  title,
  synthesis: () => null,
  positions,
});

const ref = ({ text, philosopher, concept, year, url }) => ({
  text, philosopher, concept, year, url,
});

const reading = (title, url, level = "intro") => ({ title, url, level });

// Lite philosophyLab for 6-8 — same shape as 9-12 (rendered by SynthesisPanel's
// PhilosophyLab block) but written in middle-school voice. Each scenario should
// supply: a 2-3 sentence discussion synthesizing the strongest arguments and the
// deeper question; one fallacySpotting prompt; one argumentRepair prompt; one
// variationPrompt that twists the case to test a boundary; and a related list.
const lab = ({ discussion, fallacySpotting, argumentRepair, variationPrompt, related }) => ({
  discussion, fallacySpotting, argumentRepair, variationPrompt, related,
});

export const MIDDLE_SCHOOL_ORDER = [
  "deepfake-election",
  "trolley-self-driving",
  "biased-resume-ai",
  "ship-of-theseus-robot",
  "autonomous-car-rider",
  "brain-in-vat",
  "veil-of-ignorance",
  "tragedy-commons",
  "liar-paradox",
  "sorites-heap",
  "explaining-red-middle",
];

export const MIDDLE_SCHOOL_SCENARIO_COPY = {
  "deepfake-election": {
    title: "The Deepfake Dilemma",
    tagline: "The video looks real. The election is tomorrow. Sharing takes one tap.",
    estimatedMinutes: 10,
    stages: [
      {
        id: "viral-clip",
        kicker: "Act 1 - the clip",
        title: "The video in the group chat",
        storySections: [
          section("The situation", "At 8:47 p.m. the class group chat explodes. Someone has posted a clip of the mayoral candidate stuffing cash into an envelope. The lighting looks real. The voice sounds right."),
          section("The pressure", "The election is tomorrow. The chat is already forty messages long, mostly flame emojis. One friend types, \"If this is real, everyone needs to know tonight.\" Another writes, \"Share it before the campaign takes it down.\""),
          section("The choice", "You watch the clip again. The candidate's mouth moves a half-second off the words. Almost no one will notice. You haven't shared it yet. Your thumb is hovering."),
        ],
        prompt: "What should you do before anyone in your circle shares it again?",
        options: [
          { label: "A", text: "Tell everyone not to share until there is verification from a reliable source.", reflection: "You picked slow over loud. If the clip turns out to be real, the people who needed to know lost time. But every fake you don't post is one fewer rumor with your name attached.", lens: "precautionary" },
          { label: "B", text: "Share it with a warning label so people can decide for themselves.", reflection: "Warnings don't outrun the image. People see the cash and the envelope first. They see your caveat second, if at all. The flame emojis don't care what you meant.", lens: "free-speech" },
          { label: "C", text: "Report it to the platform and send it to a teacher or trusted adult who can help verify it.", reflection: "Good move. You didn't try to be the hero. You handed it to people with real tools and a bigger reach. The catch: 'an adult will handle it' can become a way to never decide anything yourself.", lens: "responsibility" },
        ],
      },
      {
        id: "almost-true",
        kicker: "Act 2 - the twist",
        title: "A true rumor inside a fake video",
        storySections: [
          section("The situation", "An hour later, a local reporter posts: the clip is fake. Then she adds something else. There may be a real investigation into the campaign's money, separate from anything in the video."),
          section("The pressure", "The chat splits down the middle. Some friends say the fake doesn't matter because the candidate might still be guilty. Others say a fake is a fake, full stop."),
          section("The choice", "The question is no longer whether the clip is real. It's what kind of proof people deserve before you let a public accusation keep traveling."),
        ],
        prompt: "How should your group talk about the story now?",
        options: [
          { label: "A", text: "Separate the claims: the video is fake, and the investigation is unconfirmed.", reflection: "You're keeping two different things in two different boxes. Sounds obvious until you try to do it in a chat where everyone wants one clean answer.", lens: "epistemic-care" },
          { label: "B", text: "Keep warning people about the candidate because the larger concern may still be true.", reflection: "You're letting a maybe do the work of a definitely. That's how rumors keep their power even after the correction lands.", lens: "precautionary" },
          { label: "C", text: "Stop discussing it until trustworthy reporting catches up.", reflection: "You stopped the spread. You also stopped the conversation. Sometimes that's right. Sometimes it leaves a real question hanging while people are still deciding how to vote.", lens: "restraint" },
        ],
        counterpoint: "A fake can ride on a real worry. That's what makes it powerful. People use the possibility that the worry is true to defend the lie that delivered it.",
      },
      {
        id: "your-side",
        kicker: "Act 3 - the mirror",
        title: "When the fake helps your side",
        storySections: [
          section("The situation", "The next morning, you find out the fake is hurting the candidate you already disliked. A friend texts, \"Good. Maybe it costs them the election.\""),
          section("The pressure", "Correcting the fake means helping someone you think shouldn't win. Staying quiet means letting a lie do work for your side."),
          section("The choice", "The rule about truth was easy yesterday. Now it has teeth. You're about to find out whether you actually believe what you said before the fake started helping you."),
        ],
        prompt: "What principle should guide you when misinformation helps your side?",
        options: [
          { label: "A", text: "Correct it anyway because fair elections need true evidence, not convenient fakes.", reflection: "You picked a rule you'll have to keep when it costs you. That's harder than picking one that protects you. It's also the only kind that survives the next time someone uses a lie against your side.", lens: "consistency" },
          { label: "B", text: "Focus on the larger political outcome because the stakes are bigger than one fake clip.", reflection: "You traded the rule about truth for one win. The candidate you didn't want still walks home if the lie holds. The rule you broke is still gone tomorrow.", lens: "utilitarian" },
          { label: "C", text: "Correct the fake and then argue your real reasons for opposing the candidate.", reflection: "You separated the truth from your argument. You can still take your side. You just can't use the fake to do it for you. Most people skip this step because the argument gets harder.", lens: "civic-integrity" },
        ],
      },
      reflection("Truth when speed, emotion, and loyalty collide", [
        { name: "Media literacy", school: "Civic reasoning", view: "A healthy public depends on people checking source, evidence, context, and motive before sharing." },
        { name: "Free-speech tradition", school: "Democratic theory", view: "Open debate matters, but fabricated media tests whether more speech can keep up with faster deception." },
        { name: "Virtue ethics", school: "Character", view: "The question is not only what rule platforms should use, but what kind of sharer each person is becoming." },
      ]),
    ],
    teacherKit: {
      bigQuestion: "What do we owe the truth when fake media moves faster than verification?",
      objectives: [
        "Students will distinguish between a claim, evidence for a claim, and emotional pressure to share.",
        "Students will evaluate remove, label, pause, and verify responses to deepfake media.",
        "Students will test whether their misinformation principles stay consistent when the fake helps their preferred side.",
      ],
      warmUp: "Show a still image or short description of a suspicious viral clip. Ask students to list what they would check before sharing it.",
      discussionPrompts: [
        "What makes a video feel believable before we have evidence?",
        "When is labeling suspicious media enough, and when might it still spread harm?",
        "Why is it harder to correct misinformation when it helps your side?",
        "What should a student do when verification will take longer than the rumor needs to spread?",
      ],
      handout: "Three-column evidence check: Claim / Evidence we have / Evidence we still need. Bottom: write one sharing rule you would accept even when it hurts your side.",
      exitTicket: "Name one action you can take in the first five minutes after seeing a suspicious viral video, and explain what value that action protects.",
    },
    philosophyLab: lab({
      discussion: "Slowing a fake's spread protects voters from a fast lie. Once the clip reaches enough people, the correction never travels as far. The other side worries that emergency takedowns can become a tool for hiding inconvenient true claims later. You're really designing a response narrow enough to stop the worst fakes without giving anyone the power to silence every contested clip.",
      fallacySpotting: "Spot the false dilemma in this claim: 'Either we ban every political deepfake immediately, or democracy is over.' What third or fourth options does it erase?",
      argumentRepair: "Rewrite 'Only gullible people fall for deepfakes' as a real argument about speed, emotion, and verification. Do it without insulting the people who shared it.",
      variationPrompt: "Now imagine the clip is *satire*, not deception. The candidate's voice is exaggerated and obviously joking. What detail changes your answer?",
      related: ["The Self-Driving Trolley", "The Biased Algorithm", "Are You Sure You're Real?"],
    }),
    reference: ref({
      concept: "Truth in politics — what civic responsibility requires when emotion moves faster than verification.",
      philosopher: "Hannah Arendt",
      year: "1967",
      text: "Hannah Arendt, Truth and Politics (The New Yorker, 1967)",
      url: "https://en.wikipedia.org/wiki/Hannah_Arendt",
    }),
    furtherReading: [
      reading("Deepfake (Wikipedia)", "https://en.wikipedia.org/wiki/Deepfake", "intro"),
      reading("Truth and Politics (overview)", "https://en.wikipedia.org/wiki/Hannah_Arendt#Political_theory", "intermediate"),
    ],
  },

  "trolley-self-driving": {
    title: "The Self-Driving Trolley",
    tagline: "A classroom simulator forces one impossible choice, then asks why a second one feels different.",
    estimatedMinutes: 10,
    stages: [
      {
        id: "simulator",
        kicker: "Act 1 - the simulator",
        title: "Five dots on the track",
        storySections: [
          section("The situation", "Robotics club, last period. The screen shows a virtual tram speeding toward five workers on a track. The program gives you exactly one control: switch tracks."),
          section("The pressure", "On the side track, one worker is trapped. The countdown turns red. Your teammates look at you because your hand is closest to the keyboard."),
          section("The choice", "No option feels clean. Doing nothing is still a decision. Switching means you chose where the tram went."),
        ],
        prompt: "What should you do in the simulator?",
        options: [
          { label: "A", text: "Switch tracks because saving five lives creates the least total harm.", reflection: "You let the numbers decide for you. Five over one is the math, and it's hard to argue with. Wait until Act 2.", lens: "utilitarian" },
          { label: "B", text: "Do not switch because choosing to send the tram at one person is a different kind of wrong.", reflection: "You drew a line: switching makes you the one who chose the death. Even if the math says fewer total deaths, you won't let it be your fingerprint.", lens: "deontological" },
          { label: "C", text: "Hit the emergency brake and challenge the design of the simulation.", reflection: "You refused the question instead of answering it. That's sometimes the smartest move. It's also sometimes what people do when they don't want to own a hard choice.", lens: "anti-framing" },
        ],
      },
      {
        id: "embodied",
        kicker: "Act 2 - the body in the story",
        title: "The bridge version",
        weighty: true,
        storySections: [
          section("The situation", "The teacher resets the simulator. Same tram. Same five workers. This time you aren't at the keyboard. You're standing on a bridge over the track."),
          section("The pressure", "A stranger is next to you on the bridge. The screen says he's heavy enough to stop the tram if you push him. The math, the screen reminds you, is identical: one death to save five."),
          section("The choice", "Your stomach reacts before your argument does. What sounded logical a minute ago is suddenly very hard to say out loud."),
        ],
        prompt: ({ chose }) => `${chose[0]?.lens === "utilitarian" ? "If the math convinced you before, should it convince you here too?" : "Does the bridge case change your answer, or reveal what your first answer meant?"}`,
        options: [
          { label: "A", text: "Push, because the number of lives saved has not changed.", reflection: "You kept the rule even when the rule asked you to push a stranger off a bridge. That's consistency. It also tells you something honest about consequence-based reasoning: it doesn't care how the math gets done.", lens: "utilitarian" },
          { label: "B", text: "Do not push, because using a person as the tool that stops the tram crosses a line.", reflection: "You drew a line between using your hand on a switch and using your hand on a person. The numbers didn't change. Something else did. Naming exactly what is the work.", lens: "deontological" },
          { label: "C", text: "Admit that the cases feel different and investigate why before programming anything.", reflection: "The hesitation in your stomach might be the smartest thing in the room. Or it might be cowardice wearing the costume of caution. You won't know without a careful argument.", lens: "moral-intuition" },
        ],
        counterpoint: "If the math is the same and one person still dies to save five, any difference you feel needs an explanation. A feeling on its own isn't yet an argument. It might still be a clue.",
      },
      {
        id: "programming",
        kicker: "Act 3 - the code",
        title: "The rule no one sees",
        storySections: [
          section("The situation", "The teacher gives each group one more task. Write the rule the simulator will use, in plain language and in code. The rule runs automatically. There is no human in the loop."),
          section("The pressure", "A rule that sounds noble in class can behave brutally on a real street. A rule that ducks every hard case makes the machine useless. There isn't a clean choice in either direction."),
          section("The choice", "Programming morality means freezing a messy judgment into instructions. Those instructions will fire on someone's worst day, exactly as you wrote them."),
        ],
        prompt: "What kind of rule should a safety system use when every option causes harm?",
        options: [
          { label: "A", text: "Use a harm-minimizing rule, but require public review before deployment.", reflection: "You kept the math but added a step: the rule has to pass a review with people other than you. That slows things down. It also keeps any one engineer from picking the rule for everyone.", lens: "procedural" },
          { label: "B", text: "Forbid any rule that intentionally targets an innocent person as the solution.", reflection: "You drew a line the rule isn't allowed to cross, even if crossing it would lower the death count. That's a moral boundary doing real work. It might also cost lives the math says it could have saved.", lens: "deontological" },
          { label: "C", text: "Redesign systems to slow down, warn earlier, and avoid forced choices whenever possible.", reflection: "You changed the question. Instead of solving the trolley case, you asked why a tram is racing toward five workers in the first place. Sometimes the best ethics is engineering a world where you never have to choose.", lens: "design-out" },
        ],
      },
      reflection("What changed between cases?", [
        { name: "Philippa Foot", school: "Oxford, 1967", view: "The original trolley case asks whether doing harm differs from allowing harm." },
        { name: "Judith Jarvis Thomson", school: "MIT", view: "The bridge case presses whether using a person as a means changes the moral structure." },
        { name: "AI ethics", school: "Design", view: "Autonomous systems make old dilemmas urgent because someone must decide the rule before the crisis happens." },
      ]),
    ],
    teacherKit: {
      bigQuestion: "Can an impossible moral choice become a responsible design rule?",
      objectives: [
        "Students will compare consequence-based, duty-based, and design-based responses to forced-choice dilemmas.",
        "Students will explain why the lever and bridge cases create different intuitions.",
        "Students will connect trolley reasoning to the challenge of programming safety systems.",
      ],
      warmUp: "Ask students to vote silently on the lever case, then vote again on the bridge case before discussing. Chart where the class changes.",
      discussionPrompts: [
        "What changed between switching a track and pushing a person?",
        "Is refusing the simulation a serious answer or an escape from the hard question?",
        "What should designers do when a rare emergency still has to be anticipated?",
        "Who should approve the rule before it is built into a machine?",
      ],
      handout: "Two-case comparison chart: action, outcome, intention, person used as means, strongest objection. End with a draft safety rule.",
      exitTicket: "Write one rule for an autonomous system and one objection that would make you revise it.",
    },
    philosophyLab: lab({
      discussion: "The lever feels easier because the trolley is already moving. You're redirecting harm someone else started. The bridge feels harder because a stranger's body becomes the thing that stops the tram. Most people pull the lever and refuse to push, even when the math is identical. Whether that difference is a deep moral truth or just a quirk of how human brains process action versus allowing is what philosophers, and now AI designers, are still trying to settle.",
      fallacySpotting: "Spot the appeal to numbers in this argument: 'Pulling the lever saves four more lives, so it's obviously correct.' What is the word *obviously* assuming about whose lives count, and how?",
      argumentRepair: "Rewrite 'You can't put a number on a life' as a real philosophical position. Use Kant's idea that people are ends in themselves, not just an internet slogan.",
      variationPrompt: "Now imagine the one person on the side track is the only doctor for a hundred miles. Does that change the math? Should it?",
      related: ["Your Self-Driving Car", "The Veil of Ignorance", "The Shared Pasture"],
    }),
    reference: ref({
      concept: "Doing harm vs. allowing harm — and the moral weight of using a person's body to stop a worse outcome.",
      philosopher: "Philippa Foot and Judith Jarvis Thomson",
      year: "1967 / 1985",
      text: "Philippa Foot, The Problem of Abortion and the Doctrine of Double Effect (1967); Judith Jarvis Thomson, The Trolley Problem (1985)",
      url: "https://en.wikipedia.org/wiki/Trolley_problem",
    }),
    furtherReading: [
      reading("Trolley Problem (Wikipedia)", "https://en.wikipedia.org/wiki/Trolley_problem", "intro"),
      reading("MIT Moral Machine results", "https://www.theverge.com/2018/10/24/18013392/self-driving-car-ethics-dilemma-mit-study-moral-machine-results", "intermediate"),
    ],
  },

  "biased-resume-ai": {
    title: "The Biased Algorithm",
    tagline: "The robot says it is neutral, but its pattern tells another story.",
    estimatedMinutes: 10,
    stages: [
      {
        id: "club-tryouts",
        kicker: "Act 1 - the pattern",
        title: "The shortlist",
        storySections: [
          section("The situation", "Your school is piloting an AI tool to pick students for a citywide robotics showcase. It scores applications using past winners as examples of what a winner looks like."),
          section("The pressure", "The first shortlist looks impressive on paper. Almost every chosen student comes from the same two advanced classes. Several strong builders from the after-school lab didn't make the cut."),
          section("The choice", "The AI didn't insult anyone. It just learned what past success looked like and copied the pattern, very politely, with a confidence score next to each name."),
        ],
        prompt: "What should the student committee do with the shortlist?",
        options: [
          { label: "A", text: "Pause the selection until people understand why the tool ranked students this way.", reflection: "You hit pause on a pattern you don't yet understand. That isn't delay for its own sake. It's refusing to let a polished score lock in a result that might be wrong.", lens: "precautionary" },
          { label: "B", text: "Use the shortlist but add human review for students who may have been missed.", reflection: "You kept the speed but added a check. Fine, except the AI is still writing the first draft of who matters. Your reviewers are mostly deciding whether to overrule it.", lens: "procedural" },
          { label: "C", text: "Reject the tool because a biased shortcut should not decide opportunity.", reflection: "You yanked the tool. The work gets harder. The bias built into the old training data also leaves the room with it. The next question: are humans really going to be more fair this time?", lens: "abolition" },
        ],
      },
      {
        id: "training-data",
        kicker: "Act 2 - the source",
        title: "What the machine learned",
        storySections: [
          section("The situation", "The teacher pulls up the training data. Past winners had expensive kits, private coaching, and recommendation letters from teachers who already knew them well."),
          section("The pressure", "The AI treated those signals as proof of talent. Some students had far fewer chances to collect signals like those in the first place. The same kid looks different through the same rules."),
          section("The choice", "The committee has to decide where the real problem lives. Is it the algorithm? The old data? Or the school's definition of what counts as a winner?"),
        ],
        prompt: "Where should the repair begin?",
        options: [
          { label: "A", text: "Fix the training data so the AI learns from a wider range of successful students.", reflection: "You fixed the data, which is honest work. The algorithm will learn from a wider range of students now. But if opportunity is still uneven outside the school, the new data will eventually start looking like the old data.", lens: "technical-fix" },
          { label: "B", text: "Change the criteria so teamwork, persistence, and creativity count alongside polished applications.", reflection: "You aren't just fixing the math. You're rewriting what the math is supposed to find. Schools talk a lot about 'merit.' Almost no one examines what their version of it actually rewards.", lens: "structural" },
          { label: "C", text: "Build a review team that includes students and teachers from the groups most affected.", reflection: "You brought the people most affected into the room where the rule gets written. That's slower and more uncomfortable. It also tends to surface assumptions everyone in the original room never thought to question.", lens: "participatory" },
        ],
        counterpoint: "Human review isn't automatically fair either. People carry favorites, blind spots, and assumptions too. The real question is how to make every layer of the decision accountable, not just the one made of code.",
      },
      {
        id: "past-harm",
        kicker: "Act 3 - the rejected students",
        title: "The list from last semester",
        storySections: [
          section("The situation", "Then someone finds something worse. The same tool quietly screened applicants last semester. Students who never made the shortlist never knew a machine had filtered them out."),
          section("The pressure", "Reopening old applications would be embarrassing and time-consuming. Ignoring them would protect the school more than the students it filtered out."),
          section("The choice", "The fairness question changed shape. It isn't only about preventing the next mistake. It's about what the school owes the students this mistake already happened to."),
        ],
        prompt: "What does the school owe the students who may have been unfairly rejected?",
        options: [
          { label: "A", text: "Re-review every rejected application and offer a real second chance where possible.", reflection: "You aren't just apologizing. You're going back and giving people the chance the system stole from them the first time. That costs time. The harm cost something more expensive than time.", lens: "remedial" },
          { label: "B", text: "Publicly explain the failure, change the process, and invite appeals from affected students.", reflection: "You went public and built a path for affected students to push back. That's honest. It still leaves the work of finding the help with the people who were harmed, which isn't nothing.", lens: "transparency" },
          { label: "C", text: "Focus on fixing the next round because the past cannot be fully undone.", reflection: "You picked forward over back. It's the cheaper choice for the school. It's also the choice that asks the people who got hurt to absorb the cost of the lesson the system needed to learn.", lens: "pragmatic" },
        ],
      },
      reflection("When a system inherits a wrong", [
        { name: "Algorithmic fairness", school: "AI ethics", view: "A model can reproduce unfair history even when no one writes an openly unfair rule." },
        { name: "Structural justice", school: "Social ethics", view: "Fairness asks who had the chance to earn the signals a system rewards." },
        { name: "Repair", school: "Restorative reasoning", view: "Stopping future harm is not the same as addressing people already harmed." },
      ]),
    ],
    teacherKit: {
      bigQuestion: "When an algorithm repeats unfair history, what does fairness require?",
      objectives: [
        "Students will explain how training data can encode past inequities.",
        "Students will distinguish technical fixes from structural and participatory fixes.",
        "Students will evaluate what repair is owed after an automated system has already caused harm.",
      ],
      warmUp: "Show a fictional selection table where one group is chosen far more often. Ask students what information they need before deciding whether the process is fair.",
      discussionPrompts: [
        "Can a system be biased even if no one intended bias?",
        "What is the difference between fixing data and changing the definition of merit?",
        "Who should be involved in reviewing a tool that affects student opportunity?",
        "What counts as repair for people already screened out?",
      ],
      handout: "Bias audit map: Data used / Criteria rewarded / Who benefits / Who is missed / Repair plan.",
      exitTicket: "Name one question you would ask before trusting an AI ranking system, and explain why that question matters.",
    },
    philosophyLab: lab({
      discussion: "Defenders of the AI tool say it's consistent in a way human judges aren't. Same input, same output. Critics reply that consistency isn't fairness when the inputs themselves are carrying patterns of past unfair choices. The real question isn't whether to use AI. It's where the audit and the appeal go, and whose voice can actually push back when the score lands wrong.",
      fallacySpotting: "Spot the bait-and-switch in this claim: 'The algorithm doesn't see race, so it can't be racist.' What kind of unfairness can survive in a system that pretends not to see?",
      argumentRepair: "Rewrite 'Just hire humans, they're fairer' as a stronger argument that takes seriously the documented bias in human hiring decisions.",
      variationPrompt: "Now imagine the school adds a human reviewer, but only to confirm the AI's choice, never to overrule it. Has the system actually changed?",
      related: ["The Deepfake Dilemma", "The Veil of Ignorance", "The Self-Driving Trolley"],
    }),
    reference: ref({
      concept: "Algorithmic bias and structural injustice — when a system that looks neutral can repeat unfair history.",
      philosopher: "Cathy O'Neil and Iris Marion Young",
      year: "2016 / 1990",
      text: "Cathy O'Neil, Weapons of Math Destruction (2016); Iris Marion Young, Justice and the Politics of Difference (1990)",
      url: "https://en.wikipedia.org/wiki/Algorithmic_bias",
    }),
    furtherReading: [
      reading("Algorithmic bias (Wikipedia)", "https://en.wikipedia.org/wiki/Algorithmic_bias", "intro"),
      reading("Weapons of Math Destruction (overview)", "https://en.wikipedia.org/wiki/Weapons_of_Math_Destruction", "intermediate"),
    ],
  },

  "ship-of-theseus-robot": {
    title: "Robot Replacement Parts",
    tagline: "The robot keeps its name, memories, and habits. Every part still changes.",
    estimatedMinutes: 9,
    stages: [
      {
        id: "repair-log",
        kicker: "Act 1 - the repairs",
        title: "A robot with a history",
        storySections: [
          section("The situation", "In sixth grade, your team built a small robot named Orbit. It bumped into table legs, learned the maze in three tries, and flashed blue whenever someone said, \"Good job.\""),
          section("The pressure", "By eighth grade, Orbit has been repaired so many times that the wheels, shell, sensors, battery, and memory chip have all been replaced. Not one piece of the original is still there."),
          section("The choice", "The robot rolls into the same maze and flashes the same blue light. Your team wants to know whether Orbit came back, or whether a new robot just inherited the name."),
        ],
        prompt: "Is the repaired robot still Orbit?",
        options: [
          { label: "A", text: "Yes, because its story, name, behavior, and role in the team continued.", reflection: "You're saying the thread that matters is the story, not the parts. Orbit kept its name, its memory, and its team. That's enough to call it the same robot, even if zero atoms agree with you.", lens: "psychological-continuity" },
          { label: "B", text: "No, because none of the original parts remain.", reflection: "You're saying the stuff matters. Memory is impressive, but a robot made entirely of new physical pieces isn't the robot you built. It's a polite copy that learned to flash blue at the right time.", lens: "material-identity" },
          { label: "C", text: "It is Orbit for some purposes, but not for every question.", reflection: "You refused to give one answer because the question is doing too many jobs at once. Some kinds of sameness survived. Others didn't. That isn't a dodge. It's a more honest map of what 'same' means.", lens: "pluralist" },
        ],
      },
      {
        id: "old-parts",
        kicker: "Act 2 - the second Orbit",
        title: "The box in the closet",
        storySections: [
          section("The situation", "At the showcase, the custodian rolls in a dusty box. Inside are all of Orbit's old parts. Another team has reassembled them into a second working robot."),
          section("The pressure", "The reassembled robot has the original shell and the original wheels. The repaired robot has the memories, the habits, and the team's history with it. You could point to either one and say 'that's Orbit.'"),
          section("The choice", "A question that sounded silly an hour ago is now deciding who wins the award, who owns the robot, and what your team means when it says 'our robot.'"),
        ],
        prompt: "Which robot has the stronger claim to being the original Orbit?",
        options: [
          { label: "A", text: "The repaired robot, because continuous memory and use matter more than parts.", reflection: "You followed the memories. The repaired robot kept learning, kept losing matches, kept blinking blue when the team cheered. The other robot is wearing the right body but it never lived through any of that.", lens: "memory-criterion" },
          { label: "B", text: "The reassembled robot, because the original matter has been restored.", reflection: "You followed the matter. The original parts are sitting in front of you, reassembled. Memories can be backed up. Atoms are harder to forge. People have been making this argument since Plutarch wrote about Theseus's ship.", lens: "material-identity" },
          { label: "C", text: "Neither answer is complete because different kinds of sameness are being mixed together.", reflection: "You stopped trying to force one word to settle two different questions. Both robots have a real claim to something. The trick is naming what kind of sameness each one keeps.", lens: "pluralist" },
        ],
        counterpoint: "If both robots can claim something real, the question stops being 'which one is the real Orbit?' It becomes 'what kind of sameness matters for the choice you're actually trying to make?'",
      },
      {
        id: "student-mirror",
        kicker: "Act 3 - the mirror",
        title: "The version of you that changed",
        storySections: [
          section("The situation", "After the showcase, your teacher pulls up a folder of sixth-grade photos. The class howls. The faces are familiar and unfamiliar at the same time."),
          section("The pressure", "Your body changed. Your opinions changed. Some friendships didn't survive. When someone shows you the photo, they still say 'that's you' like it's the most obvious fact in the room."),
          section("The choice", "Orbit's puzzle just turned around and pointed at the class. What has to continue, exactly, for someone or something to still count as itself?"),
        ],
        prompt: "What should count most when we say something is the same over time?",
        options: [
          { label: "A", text: "Continuing memories and personality, because those connect one moment to the next.", reflection: "You're saying you're the same person because the memories and the personality kept going. That theory is John Locke's. It also means if you lost your memories completely, you'd be losing what you most are.", lens: "psychological-continuity" },
          { label: "B", text: "Continuing body or parts, because identity needs a physical anchor.", reflection: "You're saying the body is the anchor. Same physical thread, same person, even when the personality shifts. That makes identity easier to track. It also makes growing up feel a little less personal than it actually is.", lens: "material-identity" },
          { label: "C", text: "Continuing relationships and responsibilities, because others help hold identity in place.", reflection: "You're saying you're partly held together by the people who know you. Your friends, your family, your teammates. That has a catch: if those relationships end, something about who you are ends with them.", lens: "relational" },
        ],
      },
      reflection("The same thing through change", [
        { name: "Ship of Theseus", school: "Ancient puzzle", view: "If every plank of a ship is replaced, philosophers ask whether the ship remains the same." },
        { name: "John Locke", school: "Memory", view: "Personal identity is tied to continuity of consciousness and memory." },
        { name: "Derek Parfit", school: "Continuity", view: "What matters may not be perfect identity, but the connections that survive change." },
      ]),
    ],
    teacherKit: {
      bigQuestion: "What makes something the same through change?",
      objectives: [
        "Students will compare material, memory-based, relational, and pluralist accounts of identity.",
        "Students will apply identity reasoning to robots and to personal change over time.",
        "Students will explain why one object can have multiple kinds of continuity.",
      ],
      warmUp: "Show a repaired object or old photo. Ask: what changed, what stayed, and which list matters more?",
      discussionPrompts: [
        "What makes Orbit the same robot: parts, memories, name, or relationships?",
        "Can two things both have a legitimate claim to being the original?",
        "How does the robot case help us think about people changing over time?",
        "When does a change become a replacement?",
      ],
      handout: "Identity threads chart: parts, memory, behavior, name, relationships, responsibility. Students rank which thread matters most in each stage.",
      exitTicket: "Complete the sentence: something stays the same when ___, unless ___.",
    },
    philosophyLab: lab({
      discussion: "If gradual replacement preserves identity, the original parts stop mattering. If material continuity matters, the reassembled robot has the stronger claim. Locke and Parfit both argue that what matters is psychological continuity, the threads of memory and use, not physical sameness. The puzzle gets sharpest when both robots are in the room and you have to pick one.",
      fallacySpotting: "Spot the equivocation in this claim: 'It has all the same parts, so it's the same robot.' What two different meanings of *same* are sliding past each other?",
      argumentRepair: "Rewrite 'Identity is whatever the owner says it is' as a serious claim. Is that the same as saying identity is just a feeling? What does that second version cost you?",
      variationPrompt: "Now imagine the robot's memory chip alone is moved into a brand-new body, and the old body is left empty. Which one is Orbit?",
      related: ["Are You Sure You're Real?", "Are We in a Simulation?", "When Does a Heap Stop Being a Heap?"],
    }),
    reference: ref({
      concept: "Personal identity through change — Ship of Theseus, Locke's memory criterion, and Parfit's continuity.",
      philosopher: "Plutarch, John Locke, and Derek Parfit",
      year: "c. 75 CE / 1689 / 1984",
      text: "Plutarch, Life of Theseus (c. 75 CE); John Locke, An Essay Concerning Human Understanding (1689); Derek Parfit, Reasons and Persons (1984)",
      url: "https://en.wikipedia.org/wiki/Ship_of_Theseus",
    }),
    furtherReading: [
      reading("Ship of Theseus (Wikipedia)", "https://en.wikipedia.org/wiki/Ship_of_Theseus", "intro"),
      reading("Personal identity (Stanford Encyclopedia of Philosophy)", "https://plato.stanford.edu/entries/identity-personal/", "advanced"),
    ],
  },

  "autonomous-car-rider": {
    title: "Your Self-Driving Car",
    tagline: "The safest car in town still has to decide whose safety counts first.",
    estimatedMinutes: 10,
    stages: [
      {
        id: "purchase",
        kicker: "Act 1 - the setting",
        title: "The safety promise",
        storySections: [
          section("The situation", "Your family is test-driving a self-driving car. The dashboard claims it prevents most crashes by braking faster than any human ever could."),
          section("The pressure", "Then the demo instructor explains the emergency setting. If a crash can't be avoided, the car follows a priority rule programmed in advance."),
          section("The choice", "Your family has to pick the rule before the car leaves the lot. The rule stays invisible until the worst moment of someone's life."),
        ],
        prompt: "Which rule should a family car be allowed to follow?",
        options: [
          { label: "A", text: "Minimize total harm, even if that could sacrifice the passenger.", reflection: "You're saying the car should save more lives even when the 'more' is strangers and the 'one' is you. That's brave on paper. It sounds different when the passenger in the seat is your sister.", lens: "utilitarian" },
          { label: "B", text: "Protect passengers first because people bought the car to keep their family safe.", reflection: "You put the family in the seat first. That's an honest priority. It also means a pedestrian on the sidewalk is, by design, less protected the moment the math gets bad.", lens: "partialism" },
          { label: "C", text: "Require the same public safety rule for every car, not buyer-selected settings.", reflection: "You're saying nobody gets to buy a more selfish car than their neighbor drives. The road is a shared thing. The same rule applies to every car or it isn't really a rule.", lens: "procedural" },
        ],
      },
      {
        id: "intersection",
        kicker: "Act 2 - the street",
        title: "Rain at the crosswalk",
        storySections: [
          section("The situation", "Weeks later, heavy rain hides the lane markings. A cyclist swerves into the lane. A child steps near the curb. The car has three bad paths to pick from."),
          section("The pressure", "The car has less than a second. It can't ask what anyone deserves. It can only run whatever value someone encoded into it weeks or months ago."),
          section("The choice", "The abstract rule from the showroom has faces now: passenger, cyclist, child, the company that wrote the code, the engineer who hit save, the city that licensed the car."),
        ],
        prompt: "Who should be morally responsible for what the car does?",
        options: [
          { label: "A", text: "The company, because it designed and sold the priority rule.", reflection: "You're sending the blame to the people who wrote the rule. They shaped this decision long before the road got wet. Responsibility follows design power, and the company had a lot of it.", lens: "responsibility" },
          { label: "B", text: "The public regulators, because road rules should not be left to private companies.", reflection: "You're saying road rules shouldn't be left to whichever company ships first. That's how civic life is supposed to work. The catch: laws are usually three years behind whatever the engineers just built.", lens: "civic" },
          { label: "C", text: "The owner shares responsibility if they knowingly chose a rule that favors them.", reflection: "You're saying if the owner picked a setting that favored them over strangers, the owner wears some of the blame. Picking the rule was a choice. Choices come with names attached.", lens: "accountability" },
        ],
        counterpoint: "The car reacts in a second. The actual moral choice happened months earlier in design meetings, policy debates, and a checkbox on the purchase screen.",
      },
      {
        id: "public-rule",
        kicker: "Act 3 - the meeting",
        title: "The town vote",
        storySections: [
          section("The situation", "After a near miss at the school crosswalk, the town calls a public meeting. Parents, cyclists, drivers, engineers, and students all want a turn at the mic."),
          section("The pressure", "Protect passengers too much and the streets become unfair. Sacrifice passengers too easily and nobody buys the safer car. Neither option is clean."),
          section("The choice", "The town needs a rule people can live with before they know whether they'll be the ones inside the car or the ones walking next to it."),
        ],
        prompt: "What should the town require before self-driving cars are allowed on public roads?",
        options: [
          { label: "A", text: "A transparent safety rule reviewed by the public and applied to every manufacturer.", reflection: "You said the rule has to be public, and the same for every brand. Hidden values can't be argued with. Once everyone can read the rule, the conversation about it can actually start.", lens: "transparency" },
          { label: "B", text: "Proof that the cars reduce overall crashes enough to justify rare moral emergencies.", reflection: "You zoomed out. The rare dramatic crash matters. The thousands of crashes the autonomous car never has also matter. You're refusing to let one edge case do all the moral work.", lens: "utilitarian" },
          { label: "C", text: "A design standard that avoids high-speed forced choices as much as possible.", reflection: "You shifted the work to the engineers. Build cars and streets that don't put anyone in the trolley case to begin with. The best ethics is sometimes the dilemma that never happens.", lens: "design-out" },
        ],
      },
      reflection("The passenger seat and the public road", [
        { name: "Moral Machine", school: "MIT", view: "Large surveys found that people disagree globally about how vehicles should prioritize lives." },
        { name: "Public ethics", school: "Civics", view: "Road safety is shared; private preferences can create public risk." },
        { name: "Design ethics", school: "Engineering", view: "The best solution may be preventing emergency dilemmas rather than perfecting split-second sacrifice rules." },
      ]),
    ],
    teacherKit: {
      bigQuestion: "Whose values should be built into machines that move through public spaces?",
      objectives: [
        "Students will compare passenger-first, harm-minimizing, and public-rule approaches to autonomous vehicle ethics.",
        "Students will distinguish responsibility at the moment of crash from responsibility at design and policy stages.",
        "Students will explain why buyer preference and public safety can conflict.",
      ],
      warmUp: "Ask students whether they would ride in a car programmed to sacrifice them to save more strangers. Then ask whether pedestrians should accept cars that always protect passengers.",
      discussionPrompts: [
        "Should owners choose their car's emergency rule?",
        "Who is responsible for an automatic decision: programmer, company, owner, regulator, or all of them?",
        "What rule would you choose before knowing whether you are passenger or pedestrian?",
        "Can safer technology still be ethically unacceptable in some forms?",
      ],
      handout: "Stakeholder grid: passenger, pedestrian, company, city, programmer. For each, list what they value and what risk they carry.",
      exitTicket: "Write one public rule for self-driving cars and identify who might object to it.",
    },
    philosophyLab: lab({
      discussion: "The trolley case put the choice in your hands. The self-driving car puts the choice in code, written months ago, by people you'll never meet, for a situation they didn't predict. The question shifts. It isn't what *I* would do. It's what rule we're all willing to live under, written in advance, before any of us know whether we'll be inside the car or outside it.",
      fallacySpotting: "Spot the moving target in this argument: 'The car should always protect its rider, but also never harm pedestrians, and also follow the law, and also minimize damage.' What happens when those rules pull against each other?",
      argumentRepair: "Rewrite 'The car should just do what a good driver would do' as a real engineering specification. Whose definition of 'good driver' goes into the code?",
      variationPrompt: "Now imagine you aren't in the car. You're the pedestrian. Does your answer change? Should it?",
      related: ["The Self-Driving Trolley", "The Biased Algorithm", "The Veil of Ignorance"],
    }),
    reference: ref({
      concept: "Trolley reasoning meets public design — programming machines that share roads with people.",
      philosopher: "Philippa Foot and the MIT Moral Machine project",
      year: "1967 / 2018",
      text: "Philippa Foot, Trolley Problem (1967); Awad et al., 'The Moral Machine experiment' (Nature, 2018)",
      url: "https://www.theverge.com/2018/10/24/18013392/self-driving-car-ethics-dilemma-mit-study-moral-machine-results",
    }),
    furtherReading: [
      reading("Trolley Problem (Wikipedia)", "https://en.wikipedia.org/wiki/Trolley_problem", "intro"),
      reading("MIT Moral Machine results", "https://www.theverge.com/2018/10/24/18013392/self-driving-car-ethics-dilemma-mit-study-moral-machine-results", "intermediate"),
    ],
  },

  "brain-in-vat": {
    title: "Are You Sure You're Real?",
    tagline: "A perfect simulation would not feel fake from the inside.",
    estimatedMinutes: 10,
    stages: [
      {
        id: "glitch",
        kicker: "Act 1 - the glitch",
        title: "The window that repeats",
        storySections: [
          section("The situation", "During a virtual field trip, you notice the same bird crossing the same window every seventeen seconds. No one else looks bothered."),
          section("The pressure", "Then your headset freezes. The classroom flickers. For one second you see a white room full of cables and a cold metal floor. Then everything snaps back. Your notes are still on your desk."),
          section("The choice", "If a system could perfectly produce every experience you've ever had, the feeling of being sure might not prove what you thought it did."),
        ],
        prompt: "Could you prove that your world is not being simulated?",
        options: [
          { label: "A", text: "No, because every piece of evidence could be part of the simulation.", reflection: "You're saying the test itself could be rigged. Every clue you'd check to prove the world is real might be part of what's faking it. That's the trap of radical doubt: the door you'd use to escape is in the same room.", lens: "skepticism" },
          { label: "B", text: "Probably, because the ordinary explanation is simpler and more reasonable.", reflection: "You're keeping your feet on the ground. The simple explanation usually wins. That's reasonable. It also means you're not really answering the question. You're declining to play it.", lens: "parsimony" },
          { label: "C", text: "Maybe not, but my experiences and relationships still matter from inside them.", reflection: "You changed the question from 'is it real' to 'does it matter from inside.' Your friends still feel like friends. The history homework is still due. The question stays open. Your life doesn't wait for the answer.", lens: "pragmatist" },
        ],
      },
      {
        id: "button",
        kicker: "Act 2 - the offer",
        title: "The truth button",
        storySections: [
          section("The situation", "A message appears in the corner of your headset: PRESS ONCE TO KNOW WHETHER YOUR WORLD IS REAL. The message adds: the answer cannot be unseen."),
          section("The pressure", "If the world is real, you'll know for sure. If it's simulated, everything familiar might look different in five seconds. If the message itself is a trick, pressing could do nothing, or something worse."),
          section("The choice", "Curiosity is pulling one way. Fear is pulling another. The part of you that wants the truth is pulling a third. You have to pick one before the message disappears."),
        ],
        prompt: "Should you press the button?",
        options: [
          { label: "A", text: "Press because truth matters more than comfort.", reflection: "You picked truth even if truth costs you the world you've been living in. That's a kind of courage. It's also a bet that you can handle whatever the answer turns out to be.", lens: "realist" },
          { label: "B", text: "Do not press because living well may matter more than solving every doubt.", reflection: "You decided that living well matters more than settling every doubt. That isn't cowardice. Some answers cost more than they're worth, and not pressing is a real choice, not the absence of one.", lens: "pragmatist" },
          { label: "C", text: "Study the message first because not every invitation to know should be trusted.", reflection: "You paused to ask who put the message there and what they want from you. Curiosity with caution attached. Not every door labeled 'truth' leads to one.", lens: "inquiry" },
        ],
        counterpoint: "Refusing the button doesn't answer the question. It just decides what kind of uncertainty you're willing to live with.",
      },
      {
        id: "return",
        kicker: "Act 3 - the ordinary world",
        title: "Back at lunch",
        storySections: [
          section("The situation", "At lunch, your friend offers you half a cookie and asks why you look strange. The cafeteria is loud, sticky, and completely ordinary."),
          section("The pressure", "Part of you wants to keep doubting everything. Another part notices that the cookie tastes like a cookie and your friend is waiting for an answer."),
          section("The choice", "The thought experiment didn't erase ordinary life. It changed how you think about certainty inside it."),
        ],
        prompt: "How should a person live when absolute certainty is out of reach?",
        options: [
          { label: "A", text: "Keep questioning, but require reasons before treating doubt as serious.", reflection: "You're keeping the doubt but asking it to bring receipts. Possible doesn't mean serious. Before you act on a doubt, it has to give you something stronger than 'what if.'", lens: "critical-inquiry" },
          { label: "B", text: "Trust ordinary life unless a doubt gives you a concrete reason to act differently.", reflection: "You trust ordinary life until something concrete tells you not to. That's how most people get through their day. It also keeps you from spending your one cookie debating whether the cookie exists.", lens: "pragmatist" },
          { label: "C", text: "Use uncertainty to become humbler about what you claim to know.", reflection: "You let the doubt make you humbler about what you claim to know. That's a different shape than panic. The doubt is still there. You're just wearing it as a smaller hat.", lens: "humility" },
        ],
      },
      reflection("Doubt, evidence, and ordinary life", [
        { name: "René Descartes", school: "Skepticism", view: "Asked what could survive the strongest possible doubt." },
        { name: "Hilary Putnam", school: "Brain in a vat", view: "Argued that the thought experiment may undermine itself in how its words get meaning." },
        { name: "Pragmatism", school: "Action", view: "Even without perfect certainty, people still need standards good enough for living and learning." },
      ]),
    ],
    teacherKit: {
      bigQuestion: "How should we live when we cannot prove everything with certainty?",
      objectives: [
        "Students will explain radical skepticism and why sensory evidence may not settle it.",
        "Students will compare certainty, reasonableness, and practical trust.",
        "Students will practice turning unsettling doubt into philosophical inquiry rather than anxiety.",
      ],
      warmUp: "Ask students to prove the classroom is real without using any evidence that could be simulated. Then ask what standard they actually use in daily life.",
      discussionPrompts: [
        "What is the difference between possible doubt and reasonable doubt?",
        "Would you press a button that reveals whether your world is real?",
        "Can something matter even if it is simulated?",
        "How can skepticism be useful without taking over ordinary life?",
      ],
      handout: "Certainty ladder: impossible to doubt / reasonable to trust / possible but unsupported / not worth acting on. Students place claims from the scenario.",
      exitTicket: "Name one thing you cannot prove with certainty but still reasonably trust. Why is that trust reasonable?",
    },
    philosophyLab: lab({
      discussion: "Descartes used his evil demon to find what couldn't be doubted. Putnam used the brain in a vat to argue that some skeptical scenarios can't even be coherently stated in the first place. Either way the everyday question stays the same. Given that you can't prove you aren't in some such situation, what is reasonable to trust, and on what grounds? The skeptical move tightens our grip on what we mean by knowledge. It doesn't actually loosen our hold on the world.",
      fallacySpotting: "Spot the demand for the impossible in this claim: 'If you can't prove you're not a brain in a vat, you don't really know anything.' What standard of *proof* is that argument using?",
      argumentRepair: "Rewrite 'I just know I'm real' as a serious philosophical claim. What kind of evidence supports it, even if it's not a proof?",
      variationPrompt: "Now imagine the simulation hypothesis is true. The simulation gives every person inside it full conscious experience and a moral life. Has anything that matters actually changed?",
      related: ["Plato's Cave", "Mary's Room", "Are We in a Simulation?"],
    }),
    reference: ref({
      concept: "Skepticism and the limits of certainty — Descartes' demon and Putnam's brain in a vat.",
      philosopher: "René Descartes and Hilary Putnam",
      year: "1641 / 1981",
      text: "René Descartes, Meditations on First Philosophy (1641); Hilary Putnam, Reason, Truth and History (1981)",
      url: "https://en.wikipedia.org/wiki/Brain_in_a_vat",
    }),
    furtherReading: [
      reading("Brain in a vat (Wikipedia)", "https://en.wikipedia.org/wiki/Brain_in_a_vat", "intro"),
      reading("Cartesian doubt (Wikipedia)", "https://en.wikipedia.org/wiki/Cartesian_doubt", "intro"),
    ],
  },

  "veil-of-ignorance": {
    title: "The Veil of Ignorance",
    tagline: "Design the rules before you know whether the rules will protect you.",
    estimatedMinutes: 10,
    stages: [
      {
        id: "sealed-card",
        kicker: "Act 1 - behind the veil",
        title: "The unopened envelope",
        storySections: [
          section("The situation", "Your class is designing a new school for a simulation game. Each group has to choose rules for grading, lunch, support services, discipline, clubs, and tech access."),
          section("The pressure", "Each student has a sealed envelope on their desk. Inside is their role for the new school: wealthy, poor, disabled, new to the language, gifted, popular, isolated, healthy, sick. Nobody opens the envelope yet."),
          section("The choice", "You're making rules for a world where you might be anyone, not just the person you already are."),
        ],
        prompt: "What principle should guide the class while the envelopes stay closed?",
        options: [
          { label: "A", text: "Make the worst-off role as protected and supported as possible.", reflection: "You built the system around the person who'd have the worst time in it. That's Rawls. It's also a quiet bet about what kind of luck you might pull from the envelope.", lens: "rawlsian" },
          { label: "B", text: "Maximize total achievement, even if some roles struggle more.", reflection: "You're optimizing for the average. That can be honest math. It can also be a quiet way to forget that 'average' is built out of real people, and some of them are paying for the rest.", lens: "utilitarian" },
          { label: "C", text: "Give everyone the same resources and rules.", reflection: "You said treat everyone the same. That's clean and easy to defend. It also means a student who needs more help and a student who needs less help walk away with the same amount.", lens: "egalitarian" },
          { label: "D", text: "Maximize freedom of choice and let students build their own paths.", reflection: "You picked freedom. That's a real value. The trick: freedom feels different when your envelope says you have a private tutor and your friend's says they share a textbook with three other kids.", lens: "libertarian" },
        ],
      },
      {
        id: "budget",
        kicker: "Act 2 - scarcity",
        title: "Only three promises",
        storySections: [
          section("The situation", "The game adds a budget limit. Your class can guarantee only three major supports: tutoring, health services, open clubs, device access, smaller classes, or enrichment trips. Three out of six."),
          section("The pressure", "Every support helps someone. Picking one means another need walks home with less protection."),
          section("The choice", "Fairness has to survive scarcity now. It's much easier to sound just when nothing has to be sacrificed."),
        ],
        prompt: "How should the class choose which supports become guaranteed?",
        options: [
          { label: "A", text: "Prioritize supports that protect students who would otherwise have the fewest real options.", reflection: "You kept your eyes on the students with the least cushion. Three supports won't fix everything. They protect the people who'd fall hardest if nothing did.", lens: "rawlsian" },
          { label: "B", text: "Choose the supports that improve the largest number of students' outcomes.", reflection: "You went broad. More students benefit on paper. The quieter students, the ones who don't show up in averages, may still go without.", lens: "utilitarian" },
          { label: "C", text: "Let every group vote after hearing role stories from people who might be affected.", reflection: "You asked the people most likely to be affected what they actually need. The vote becomes more honest. It also takes longer. Students who hesitate to speak still get missed.", lens: "procedural" },
        ],
        counterpoint: "The veil can make people fairer. It can also hide details that real people need others to know about them. Both effects come from the same blindfold.",
      },
      {
        id: "veil-lifts",
        kicker: "Act 3 - the reveal",
        title: "The envelope opens",
        storySections: [
          section("The situation", "The envelopes open. One student who'd argued for fewer supports pulls a role with a chronic illness. Another who'd argued for equal rules pulls a role as a new English learner."),
          section("The pressure", "Some students want to change the rules now that they know who they are. Others say changing now would be selfish, exactly the move the veil was supposed to block."),
          section("The choice", "The veil was meant to keep self-interest out of the room. The reveal tests whether the class actually learned fairness, or just made a lucky bet."),
        ],
        prompt: "Should the class be allowed to revise the rules after seeing the roles?",
        options: [
          { label: "A", text: "No, because the fairest moment was before anyone knew how they personally benefited.", reflection: "You held the line. The fairest moment was before anyone knew who they were going to be. Changing the rules now is just self-interest with a new outfit.", lens: "rawlsian" },
          { label: "B", text: "Yes, because real experiences reveal needs the class may not have imagined.", reflection: "You let the reveal teach you something. Maybe the abstract version of fairness was missing a need that only shows up in a real life. Lived experience can correct a clean theory.", lens: "care" },
          { label: "C", text: "Allow revision only if students explain a public reason, not just a personal advantage.", reflection: "You're allowing revisions, but only the kind that come with a public reason that isn't 'I would benefit.' That keeps the room honest while still letting it learn from what the envelopes revealed.", lens: "procedural" },
        ],
      },
      reflection("Justice before you know your place", [
        { name: "John Rawls", school: "Justice", view: "The veil of ignorance asks what rules we would choose if we could not rig them for ourselves." },
        { name: "Robert Nozick", school: "Liberty", view: "Objected that patterned outcomes can violate individual freedom and entitlement." },
        { name: "Care ethics", school: "Relationships", view: "Abstract fairness may need correction from attention to particular people and needs." },
      ]),
    ],
    teacherKit: {
      bigQuestion: "What rules would we choose if we did not know who we would be under them?",
      objectives: [
        "Students will apply the veil of ignorance to school-rule design.",
        "Students will compare Rawlsian, utilitarian, egalitarian, libertarian, procedural, and care-based reasoning.",
        "Students will evaluate what abstract fairness reveals and what it can miss.",
      ],
      warmUp: "Give students sealed role cards and ask them to choose school supports before opening them.",
      discussionPrompts: [
        "Why do answers change when people learn their role?",
        "Does fairness mean equal treatment, equal opportunity, or protection for the worst-off?",
        "What does the veil help us see? What does it hide?",
        "When should lived experience revise an abstract rule?",
      ],
      handout: "Behind-the-veil rule sheet with limited budget choices. After roles open, students annotate which rules they would defend, revise, or reject.",
      exitTicket: "Write one rule you would choose before knowing your role and explain why it is fair from more than one position.",
    },
    philosophyLab: lab({
      discussion: "Rawls's idea is that we should design rules from a position where we don't know our own role. It's a thought experiment, not a literal procedure. Critics push back: the veil sounds neutral, but it rules out important information about real people's actual needs. Care ethics in particular argues that the veil hides exactly the relationships good rules should pay attention to. The exercise still teaches one thing nobody can fake: notice when you're designing for yourself.",
      fallacySpotting: "Spot the smuggled assumption in this argument: 'Behind the veil, everyone would obviously want maximum freedom.' What is the word *obviously* doing in that sentence?",
      argumentRepair: "Rewrite 'Rawls is just liberalism in disguise' as a real critique. Name what view of justice it accepts, and which view it leaves out.",
      variationPrompt: "Now imagine you have to design rules for one specific neighborhood you've lived in your whole life. Is that better, worse, or just different from the veil?",
      related: ["The Biased Algorithm", "The Shared Pasture", "Your Self-Driving Car"],
    }),
    reference: ref({
      concept: "Justice as fairness — design rules from behind a veil of ignorance about your own position.",
      philosopher: "John Rawls",
      year: "1971",
      text: "John Rawls, A Theory of Justice (1971) — the original position and the veil of ignorance",
      url: "https://en.wikipedia.org/wiki/Veil_of_ignorance",
    }),
    furtherReading: [
      reading("Veil of ignorance (Wikipedia)", "https://en.wikipedia.org/wiki/Veil_of_ignorance", "intro"),
      reading("A Theory of Justice (Wikipedia)", "https://en.wikipedia.org/wiki/A_Theory_of_Justice", "intermediate"),
    ],
  },

  "tragedy-commons": {
    title: "The Shared Pasture",
    tagline: "Every person takes a little extra until the shared thing can no longer recover.",
    estimatedMinutes: 9,
    stages: [
      {
        id: "charging-station",
        kicker: "Act 1 - the commons",
        title: "The dying battery cart",
        storySections: [
          section("The situation", "Your grade gets one shared cart of tablets for a research project. The rule is simple: return each tablet plugged in so the next class can use it."),
          section("The pressure", "At first, everyone follows the rule. Then a few students stop plugging in because they're rushing to lunch. No single student wrecks the cart. By Friday, half the batteries are dead."),
          section("The choice", "Each shortcut is small. Stacked together, the shared thing stops working for anyone."),
        ],
        prompt: "What should the grade do about the tablet cart?",
        options: [
          { label: "A", text: "Create a clear rule with consequences for returning tablets unplugged.", reflection: "You're betting that a clear rule with real consequences will keep the small selfishness in check. Enforcement isn't dramatic. It tends to outlast everyone's good intentions.", lens: "regulatory" },
          { label: "B", text: "Assign the cart to one class each week so someone is directly responsible.", reflection: "You handed the cart to one class per week. Now somebody specific is on the hook if a tablet comes back dead. That works. It also turns a shared resource into a series of small private ones.", lens: "property" },
          { label: "C", text: "Build a student-managed checkout team and public charging routine.", reflection: "You built a student-run system. No top-down enforcement, no rotating ownership, just visible responsibility and people watching each other. When it works, it's the strongest fix. When it fails, the cart dies fast.", lens: "communitarian" },
        ],
      },
      {
        id: "exception",
        kicker: "Act 2 - the need",
        title: "The student who needs more",
        storySections: [
          section("The situation", "One student quietly explains that they use the tablet after school because they don't have internet at home. Returning it plugged in by morning is much harder for them."),
          section("The pressure", "A strict rule protects the cart. An exception protects a student. Too many exceptions and the cart goes back to dead by Friday."),
          section("The choice", "Fairness just got more complicated than treating every use the same."),
        ],
        prompt: "How should the rule handle students with greater need?",
        options: [
          { label: "A", text: "Keep one rule for everyone because shared resources need predictable limits.", reflection: "You're holding the line on one rule for everyone. Predictable. Easy to enforce. It also asks every student to start from the same place, even when they don't.", lens: "fairness" },
          { label: "B", text: "Create a need-based checkout plan with extra charging support.", reflection: "You let the cart bend a little for the student who needs more. The commons survives. The student gets what they need. Equal isn't always equitable, and you noticed.", lens: "equity" },
          { label: "C", text: "Find more resources before punishing students for needing the shared one.", reflection: "You said the answer isn't fixing the student. It's fixing the situation. If one cart isn't enough, get more carts. Don't punish one kid for the math of the resource.", lens: "structural" },
        ],
        counterpoint: "A commons can be wrecked by selfishness. It can also fail when a community refuses to notice real need. Both ways, the cart ends up dead.",
      },
      {
        id: "larger-commons",
        kicker: "Act 3 - the wider world",
        title: "More than tablets",
        storySections: [
          section("The situation", "The teacher asks the class to name other commons. The list gets long: clean air, school wifi, cafeteria space, online attention, the internet itself."),
          section("The pressure", "Some commons are small enough for a class rule. Others cross schools, cities, countries, and companies that don't even know each other exist."),
          section("The choice", "The tablet cart was practice. The real question is how people protect what everyone uses and no one fully owns."),
        ],
        prompt: "What kind of solution works best when a commons is too large for one classroom to manage?",
        options: [
          { label: "A", text: "Public rules and enforcement, because trust alone may not scale.", reflection: "You picked rules and enforcement because trust doesn't always scale. A classroom can run on side-eye and reputation. The whole planet, less so.", lens: "regulatory" },
          { label: "B", text: "Local communities setting norms because people protect what they help govern.", reflection: "You bet on local communities, which is Elinor Ostrom's research in one sentence. Given the chance, real groups often run shared resources well, without privatization and without a top-down rule.", lens: "communitarian" },
          { label: "C", text: "A layered system: rules, community voice, and support for people with fewer resources.", reflection: "You layered the answer. Some rules. Some community voice. Some help for people with the fewest resources. Most real commons need more than one tool, because the problem isn't coming from just one direction.", lens: "pluralist" },
        ],
      },
      reflection("The commons we share", [
        { name: "Garrett Hardin", school: "Ecology and policy", view: "Warned that individual incentives can destroy shared resources." },
        { name: "Elinor Ostrom", school: "Community governance", view: "Showed that real communities often manage commons through local rules, trust, monitoring, and voice." },
        { name: "Equity", school: "Justice", view: "A shared rule may need to account for unequal need if the commons is meant to serve everyone." },
      ]),
    ],
    teacherKit: {
      bigQuestion: "How can a community protect what everyone uses and no one fully owns?",
      objectives: [
        "Students will explain how individual shortcuts can create collective harm.",
        "Students will compare regulation, ownership, community governance, and equity-based approaches.",
        "Students will apply commons reasoning to a school resource and a larger public resource.",
      ],
      warmUp: "Ask students to name shared classroom or school resources that fail when people take too much or care too little.",
      discussionPrompts: [
        "Why does a commons fail even when no one person causes all the damage?",
        "When do equal rules become unfair?",
        "What makes a community capable of governing a shared resource?",
        "Which commons in students' lives needs a better system right now?",
      ],
      handout: "Commons design worksheet: resource / users / temptations / harms / rule / support for high-need users / review plan.",
      exitTicket: "Name one commons and propose one rule that protects it without ignoring people who need it most.",
    },
    philosophyLab: lab({
      discussion: "Hardin's 1968 paper made 'the commons' a shorthand for collective failure. It also locked in a conclusion he reached too quickly. Elinor Ostrom's life work showed that real communities, given the chance, often do solve commons problems through local rules and shared monitoring. The choice between privatization and government control is a false binary. People governing themselves is the option Hardin missed.",
      fallacySpotting: "Spot the rush in this claim: 'If everyone uses a shared resource, it always collapses.' What does *always* require us to ignore?",
      argumentRepair: "Rewrite 'Just privatize it' as a real economic argument that takes seriously what gets lost when something stops being shared.",
      variationPrompt: "Now imagine the shared pasture is the school's wifi during finals. Design a community rule, not a top-down rule, that protects it.",
      related: ["The Veil of Ignorance", "The Biased Algorithm", "Your Self-Driving Car"],
    }),
    reference: ref({
      concept: "The tragedy of the commons — and the alternative: how communities can govern shared resources well.",
      philosopher: "Garrett Hardin and Elinor Ostrom",
      year: "1968 / 1990",
      text: "Garrett Hardin, 'The Tragedy of the Commons' (Science, 1968); Elinor Ostrom, Governing the Commons (1990)",
      url: "https://en.wikipedia.org/wiki/Tragedy_of_the_commons",
    }),
    furtherReading: [
      reading("Tragedy of the commons (Wikipedia)", "https://en.wikipedia.org/wiki/Tragedy_of_the_commons", "intro"),
      reading("Elinor Ostrom (Wikipedia)", "https://en.wikipedia.org/wiki/Elinor_Ostrom", "intermediate"),
    ],
  },

  "liar-paradox": {
    title: "This Sentence Is False",
    tagline: "A sentence points at itself and the truth starts looping.",
    estimatedMinutes: 8,
    stages: [
      {
        id: "message",
        kicker: "Act 1 - the loop",
        title: "The sentence on the board",
        storySections: [
          section("The situation", "Your teacher writes one sentence on the board: \"This sentence is false.\" Then she sets down the marker and waits."),
          section("The pressure", "If the sentence is true, then what it says must be right. Which means it's false. If it's false, then what it says is wrong. Which means it's true."),
          section("The choice", "The class wants the sentence to land in a normal true-or-false box. The sentence refuses to stay there."),
        ],
        prompt: "What should we say about the sentence?",
        options: [
          { label: "A", text: "It is neither true nor false because it breaks the normal rules.", reflection: "You built a third box. Some sentences don't behave like normal true-or-false ones, and forcing them in is the actual mistake. The cost: you now have to say which sentences qualify, and why.", lens: "category-error" },
          { label: "B", text: "It is both true and false, even if that makes logic uncomfortable.", reflection: "You let the sentence be both. That sounds like surrender. It's actually a real position called dialetheism. Most logicians refuse it because once you allow contradictions, they tend to break everything else.", lens: "dialetheism" },
          { label: "C", text: "The problem is self-reference, so sentences should not be allowed to judge their own truth.", reflection: "You said the trouble starts when a sentence talks about its own truth. Ban the move and the paradox dies. You also lose a lot of perfectly innocent sentences that happen to mention themselves.", lens: "stratified" },
        ],
      },
      {
        id: "bot",
        kicker: "Act 2 - the chatbot",
        title: "The chatbot gets stuck",
        storySections: [
          section("The situation", "A student types the sentence into a chatbot and asks, \"Is this true?\" The chatbot answers, corrects itself, apologizes, then circles back to its first answer. The class howls."),
          section("The pressure", "The laughter dies down. The loop still matters. A system that answers questions has to have a rule for when the question breaks the answer format."),
          section("The choice", "The paradox isn't just ancient anymore. It's a test of what machines should do when language turns back on itself."),
        ],
        prompt: "What should a reasoning system do with a self-referential paradox?",
        options: [
          { label: "A", text: "Refuse the true-or-false frame and explain why the question loops.", reflection: "You said the system should refuse the box and explain why. That's honest. It also means giving up the cleanest answer the user wanted, which makes the system look less impressive in a way that's actually more accurate.", lens: "abstention" },
          { label: "B", text: "Choose the best available answer even if it is imperfect.", reflection: "You picked a 'best available' answer. The user moves on. The structure of the paradox stays hidden, which means the next user will hit it just as hard and won't know they should be confused.", lens: "pragmatic" },
          { label: "C", text: "Use different levels of language so a sentence cannot define its own truth.", reflection: "You stacked language into levels. Sentences talk about the world. Other sentences talk about those sentences. The paradox dies because no sentence can talk about its own truth anymore. Logicians love this move. Programmers find it expensive.", lens: "stratified" },
        ],
        counterpoint: "Sometimes an answer that says 'the question is broken' isn't dodging the question. It's answering at a different level than the question expected.",
      },
      {
        id: "proof",
        kicker: "Act 3 - beyond word games",
        title: "When the puzzle grows up",
        storySections: [
          section("The situation", "The teacher explains that puzzles like this helped mathematicians find limits inside formal systems. Some systems can't prove every truth about themselves, from inside themselves."),
          section("The pressure", "What started as a sentence trick has become a warning. Even powerful rule systems have boundaries, and the boundaries are sometimes hidden inside the system."),
          section("The choice", "The class has to decide whether limits make logic weaker or more interesting."),
        ],
        prompt: "What is the most important lesson of the paradox?",
        options: [
          { label: "A", text: "Truth and proof are not always the same thing.", reflection: "You said truth and proof don't always match. That's Gödel's territory. Some things can be true and still escape every proof a system knows how to write. Heavy idea, mostly accepted.", lens: "realist" },
          { label: "B", text: "Language needs levels and limits to avoid confusion.", reflection: "You treated the paradox as something to design around. Build language carefully and most loops stop forming. Tidy. It works as long as you don't mind giving up the flexibility ordinary language has.", lens: "stratified" },
          { label: "C", text: "Contradictions can reveal where our thinking tools need repair.", reflection: "You let the contradiction tell you something. When a tool breaks reliably in one specific spot, the break is information. The paradox isn't the failure. The framework that couldn't handle it is.", lens: "inquiry" },
        ],
      },
      reflection("When language eats itself", [
        { name: "Eubulides", school: "Ancient Greece", view: "The liar paradox has been troubling thinkers for more than two thousand years." },
        { name: "Alfred Tarski", school: "Logic", view: "Suggested separating language into levels so truth claims do not collapse into loops." },
        { name: "Kurt Godel", school: "Mathematics", view: "Showed that formal systems can contain true statements they cannot prove from within the system." },
      ]),
    ],
    teacherKit: {
      bigQuestion: "What happens when language tries to judge itself?",
      objectives: [
        "Students will explain why the liar sentence creates a truth-value loop.",
        "Students will compare neither, both, abstention, and hierarchy responses to paradox.",
        "Students will connect self-reference to limits in reasoning systems and AI responses.",
      ],
      warmUp: "Write 'This sentence is false' on the board and ask students to vote true, false, both, neither, or stuck.",
      discussionPrompts: [
        "Why does the sentence resist ordinary true-or-false answers?",
        "Is saying 'neither' a solution or a refusal?",
        "When should a machine say a question is badly formed?",
        "Do limits make logic less trustworthy or more honest?",
      ],
      handout: "Truth loop diagram: If true, then ___. If false, then ___. My best response is ___ because ___.",
      exitTicket: "Write one sentence about itself and explain whether it creates a loop or avoids one.",
    },
    philosophyLab: lab({
      discussion: "The Liar resists every easy escape. If true, then false. If false, then true. Tarski's response was that no language can fully describe its own truth from inside itself. You need a hierarchy of meta-languages. Gödel's incompleteness theorems generalized the moment: any sufficiently powerful formal system contains true statements it cannot prove. The paradox is small. The lessons are large.",
      fallacySpotting: "Spot the dismissive move in this argument: 'It's just a sentence. Sentences can't really be paradoxes.' What is *just a sentence* leaving out about how language actually works?",
      argumentRepair: "Rewrite 'The Liar is meaningless, end of story' as a real philosophical position. Then say what that position costs you somewhere else.",
      variationPrompt: "Now imagine the Liar's twin: 'This sentence is true.' Is that one fine? Why or why not?",
      related: ["When Does a Heap Stop Being a Heap?", "Are You Sure You're Real?", "Robot Replacement Parts"],
    }),
    reference: ref({
      concept: "Self-reference and the limits of language — the Liar paradox, from ancient logic to formal systems.",
      philosopher: "Eubulides, Alfred Tarski, and Kurt Gödel",
      year: "c. 4th c. BCE / 1933 / 1931",
      text: "Eubulides of Miletus (c. 4th c. BCE); Alfred Tarski, The Concept of Truth in Formalized Languages (1933); Kurt Gödel, On Formally Undecidable Propositions (1931)",
      url: "https://en.wikipedia.org/wiki/Liar_paradox",
    }),
    furtherReading: [
      reading("Liar paradox (Wikipedia)", "https://en.wikipedia.org/wiki/Liar_paradox", "intro"),
      reading("Gödel's incompleteness theorems (Wikipedia)", "https://en.wikipedia.org/wiki/G%C3%B6del%27s_incompleteness_theorems", "advanced"),
    ],
  },

  "sorites-heap": {
    title: "When Does a Heap Stop Being a Heap?",
    tagline: "One grain changes almost nothing. Enough almost-nothings change everything.",
    estimatedMinutes: 8,
    stages: [
      {
        id: "sand",
        kicker: "Act 1 - one grain",
        title: "The pile on the tray",
        storySections: [
          section("The situation", "Your science table has a small mound of sand. The teacher asks the class to call it a heap. Everyone agrees."),
          section("The pressure", "She removes one grain. Still a heap. Another grain. Still a heap. The class keeps agreeing until somewhere around the hundredth grain, the word starts to wobble."),
          section("The choice", "No single grain seems powerful enough to change the answer. The heap somehow stops being a heap anyway."),
        ],
        prompt: "When did the heap stop being a heap?",
        options: [
          { label: "A", text: "There is an exact cutoff, even if we do not know it.", reflection: "You're saying there's an exact line. You just don't know where. The world is sharp; your knowledge is fuzzy. That's a real position, though most people find it strange that nature would draw such a precise line nobody can see.", lens: "epistemicism" },
          { label: "B", text: "There is no sharp cutoff because heap is a fuzzy word.", reflection: "You let 'heap' be a matter of degree. Some piles are very heapy. Some are barely heapy. Some are not really heapy at all. Truth becomes a slider, not a switch. That's fuzzy logic doing real work.", lens: "fuzzy-logic" },
          { label: "C", text: "Different reasonable cutoffs can work in different contexts.", reflection: "You said different cutoffs can be reasonable depending on context. A heap in your hand is different from a heap on a beach. Language doesn't need one hidden line. It needs cutoffs the people using it can agree to in advance.", lens: "supervaluationism" },
        ],
      },
      {
        id: "classifier",
        kicker: "Act 2 - the machine",
        title: "The sorting robot",
        storySections: [
          section("The situation", "Now a sorting robot has to label trays: HEAP or NOT HEAP. The robot can't shrug, laugh, or say \"it depends\" unless someone programs that option."),
          section("The pressure", "A sharp cutoff is easy to code but arbitrary. A confidence score is honest but harder to use. Refusing the edge cases slows the whole lab to a crawl."),
          section("The choice", "The vague word has just become a design decision."),
        ],
        prompt: "What should the robot output near the boundary?",
        options: [
          { label: "A", text: "Use a fixed cutoff so everyone knows the rule.", reflection: "You picked a fixed cutoff. Everyone knows the rule. Easy to enforce. Now you have to explain why exactly that number, because some trays just barely above the line and just barely below look identical to the human eye.", lens: "pragmatic" },
          { label: "B", text: "Give a confidence score instead of a simple label.", reflection: "You went with confidence scores. More honest about what the robot actually knows. The user wanted a yes or no. They got a number with two decimal places, which feels like an answer until they have to act on it.", lens: "fuzzy-logic" },
          { label: "C", text: "Flag borderline cases for human review.", reflection: "You told the robot to stop at the edge cases and ask a person. That preserves judgment exactly where the rule is weakest. It also slows things down, and humans bring their own bias when they take the handoff.", lens: "abstention" },
        ],
        counterpoint: "A machine's clean answer can make a fuzzy boundary look much more real than it actually is.",
      },
      {
        id: "people-labels",
        kicker: "Act 3 - labels for people",
        title: "When fuzzy words affect lives",
        storySections: [
          section("The situation", "The class starts listing other fuzzy labels: late, ready, popular, advanced, risky, gifted, poor, safe, suspicious."),
          section("The pressure", "Some labels are harmless. Some decide who gets help, discipline, opportunity, or trust. The vague ones don't sort themselves into the two categories."),
          section("The choice", "A sand pile puzzle just turned into a warning about classification. The things being classified now are people."),
        ],
        prompt: "How should schools and AI systems handle fuzzy labels that affect real people?",
        options: [
          { label: "A", text: "Use clear criteria and explain the cutoff openly.", reflection: "You said put the cutoff out in the open. People can argue with a rule they can see. They can't argue with one nobody will name. The boundary is still imperfect. At least now it's accountable.", lens: "transparency" },
          { label: "B", text: "Use ranges and human judgment near the boundary.", reflection: "You kept human judgment in the picture for the cases near the line. That respects the fuzziness of the category. It also means the human reviewer becomes the place where bias can quietly walk back in, unless you're careful.", lens: "procedural" },
          { label: "C", text: "Avoid high-stakes decisions based on vague labels whenever possible.", reflection: "You said don't make big decisions about people using fuzzy labels at all. That sounds defeatist. It's actually one of the most honest things you can do when the category was never precise enough to deserve the power it gets given.", lens: "anti-framing" },
        ],
      },
      reflection("Small changes and fuzzy borders", [
        { name: "Sorites paradox", school: "Ancient logic", view: "The heap puzzle asks how repeated tiny changes can create a big difference without a clear boundary." },
        { name: "Fuzzy logic", school: "Mathematics", view: "Some systems model degrees of truth rather than only true or false." },
        { name: "AI classification", school: "Machine learning", view: "Real classifiers often turn fuzzy categories into scores, thresholds, and decisions." },
      ]),
    ],
    teacherKit: {
      bigQuestion: "How should we reason when categories have fuzzy edges?",
      objectives: [
        "Students will explain the Sorites paradox using gradual change.",
        "Students will compare sharp cutoff, fuzzy score, and abstention approaches to classification.",
        "Students will apply vagueness reasoning to labels that affect people.",
      ],
      warmUp: "Use a small pile of objects and remove one at a time. Students mark the first moment they hesitate to call it a heap.",
      discussionPrompts: [
        "Why is it hard to name the exact grain that changes the heap?",
        "What are the benefits and dangers of fixed cutoffs?",
        "When is a confidence score better than a label?",
        "Which school labels are fuzzy but still powerful?",
      ],
      handout: "Boundary map: term / clear yes case / clear no case / fuzzy middle / who is affected by the label.",
      exitTicket: "Name one fuzzy word that matters in school and propose a fair way to use it.",
    },
    philosophyLab: lab({
      discussion: "The Sorites is small change with large consequences. Every grain looks innocent. The conclusion that no number ever makes a heap is still wrong. Williamson's epistemic answer is that there really is a sharp boundary, we just can't know where. Fuzzy-logic answers say the predicate itself comes in degrees. AI classifiers face this problem every day in production, with real consequences, and somebody has to pick the cutoff.",
      fallacySpotting: "Spot the slippery slope in this argument: 'If we let one student turn in homework late, then every student will, and grading collapses.' Where exactly does the slope slip?",
      argumentRepair: "Rewrite 'Vagueness just means the word is broken' as a serious philosophical claim. What words aren't vague, and what do those non-vague words have in common?",
      variationPrompt: "Now imagine you're the one training the AI. Where do you tell it to draw the line, and how do you defend that exact spot?",
      related: ["This Sentence Is False", "The Biased Algorithm", "Robot Replacement Parts"],
    }),
    reference: ref({
      concept: "Vagueness and the Sorites paradox — when categories have fuzzy edges and decisions still have to be made.",
      philosopher: "Eubulides and Timothy Williamson",
      year: "c. 4th c. BCE / 1994",
      text: "Eubulides of Miletus (c. 4th c. BCE); Timothy Williamson, Vagueness (1994)",
      url: "https://en.wikipedia.org/wiki/Sorites_paradox",
    }),
    furtherReading: [
      reading("Sorites paradox (Wikipedia)", "https://en.wikipedia.org/wiki/Sorites_paradox", "intro"),
      reading("Vagueness (Stanford Encyclopedia of Philosophy)", "https://plato.stanford.edu/entries/vagueness/", "advanced"),
    ],
  },

  "explaining-red-middle": {
    title: "Explaining Red",
    tagline: "A new classmate has never seen color. Does knowing the wavelength tell you what red looks like?",
    estimatedMinutes: 10,
    stages: [
      {
        id: "question",
        kicker: "Act 1 - the question",
        title: "Red is 700 nanometers. Is that enough?",
        storySections: [
          section("The situation", "A new student named Hassan joined your science class this morning. The class is in the middle of the light-spectrum unit. Ms. Park has written on the board: red = 700 nanometers. She explains that red is the wavelength human eyes pick up at the long end of the visible spectrum."),
          section("The pressure", "Hassan was born without sight. He's heard the word red his whole life. Stop signs. Fire engines. His grandmother's favorite sweater. He has never seen any of it. He raises his hand."),
          section("The question", "Hassan asks, very simply, 'If red is 700 nanometers, does that tell you what red looks like?' The whole class quiets. Everyone is suddenly uncertain about how to answer."),
        ],
        prompt: "What do you tell Hassan?",
        options: [
          { label: "A", text: "Yes — the wavelength IS what red is. The science gives you the answer.", reflection: "You sided with the physical description. The number names a real thing in the world, the same thing for everyone, whether they have seen red or not. The catch: Hassan can memorize the number too. Either there isn't anything more to red than that, or there is something else, and the number doesn't reach it.", lens: "wavelength-yes" },
          { label: "B", text: "No — knowing the number is not the same as seeing.", reflection: "You sided with experience. The wavelength is true. The wavelength isn't the thing itself. You just drew a line philosophers have been arguing over for centuries.", lens: "wavelength-no" },
          { label: "C", text: "Sort of — you'd know about red, but not what it looks like.", reflection: "You allowed two kinds of knowing: the propositional kind (700 nm) and the phenomenal kind (what red looks like). One of the oldest distinctions in philosophy, and you got there in a science class.", lens: "wavelength-sort" },
        ],
      },
      {
        id: "help",
        kicker: "Act 2 - how would you help?",
        title: "Hassan wants to understand red another way",
        storySections: [
          section("The situation", "Hassan thinks about your answer. Then he asks something harder. 'When you say red, your face changes a little. There's something else there. Could you help me get a sense of that?'"),
          section("The pressure", "The class is genuinely trying. Every approach has a trap. Borrow from other senses and you might just be inventing a new word. Tell stories and you describe what red does, not what red is. Stick to the science and you're back where you started."),
          section("The choice", "You have to pick something. Hassan is waiting."),
        ],
        prompt: "How do you try to help Hassan understand red?",
        options: [
          { label: "A", text: "Borrow from senses he DOES have — warmth, sound, touch.", reflection: "You reached for the world Hassan already knows. Useful. Calling red 'warm' is also a borrowed word. Are you helping him understand red, or making up a new word that happens to share a spelling?", lens: "associations" },
          { label: "B", text: "Tell stories — every place I've seen red.", reflection: "Red lives in a hundred ordinary moments. As you tell them aloud, Hassan starts to hear the shape of the word. The stories still describe what red does in the world. They don't describe what red is to look at.", lens: "stories" },
          { label: "C", text: "Stick with the science — that's the real answer.", reflection: "Hassan takes notes. He understands the system. Whether he understands the color, the science cannot say. Philosophers call this gap qualia.", lens: "facts" },
        ],
        counterpoint: "Notice what just happened. Every approach you can try is partial. That isn't a flaw in your answer. It's a clue about what kind of question this actually is.",
      },
      {
        id: "knowing",
        kicker: "Act 3 - the real question",
        title: "Two kinds of knowing — or just one?",
        storySections: [
          section("The situation", "Ms. Park steps in. She says this question has a long history. In 1982, philosopher Frank Jackson imagined a scientist named Mary who knew every physical fact about color from inside a black-and-white room. When Mary finally stepped out and saw red, did she learn something new?"),
          section("The pressure", "Most people say yes. Which means there might be a kind of knowledge that descriptions, no matter how complete, do not deliver. That's a strange thing to be true."),
          section("The question", "This isn't just about color. It's about pain, hunger, love, the taste of a strawberry. You can describe any of those in detail. Description and experience are not the same thing."),
        ],
        prompt: "So what is knowing, really?",
        options: [
          { label: "A", text: "Some kinds of knowing have to come through experience.", reflection: "Phenomenal realism. There's a kind of knowledge descriptions don't deliver. The Mary's Room answer most people give, with one cost: it means Hassan really doesn't fully know red. That's an uncomfortable thing to say to him.", lens: "experience" },
          { label: "B", text: "Knowing is knowing — descriptions count too.", reflection: "Strong physicalism. If Hassan has the facts, he has the knowledge. On this view, the Mary's Room thought experiment fails. Daniel Dennett argued exactly this. It also leaves you owing an explanation of what the face-change you make when you say 'red' is actually doing.", lens: "same" },
          { label: "C", text: "There are several kinds of knowing, and we need all of them.", reflection: "Epistemic pluralism. 'Knowing' isn't one thing. The word 'red' has many doors. That's more honest than any single answer. It also means you have to be careful about which door you mean each time you use the word.", lens: "plural" },
        ],
      },
      reflection("What you and Hassan worked out together", [
        { name: "Frank Jackson", school: "1982", view: "Imagined Mary in a black-and-white room — the original Mary's Room thought experiment. Asked whether descriptions can ever deliver experience." },
        { name: "Thomas Nagel", school: "1974", view: "Asked what it is like to be a bat. We know what bats DO. Whether we can know what they FEEL is a different question." },
        { name: "Brock & Hay", school: "2019, Science Education", view: "Applied Mary's Room directly to science classrooms — students without direct experience possess 'Mary's knowledge': complete in theory, incomplete in understanding." },
      ]),
    ],
    teacherKit: {
      bigQuestion: "Is description enough — or does some knowing have to come through experience?",
      objectives: [
        "Students will distinguish propositional knowledge (knowing that) from phenomenal knowledge (knowing what it is like).",
        "Students will evaluate whether language alone can deliver an experience to someone who has not had it.",
        "Students will connect the classroom case to Frank Jackson's Mary's Room and the broader question of how AI might (or might not) know color.",
      ],
      warmUp: "Ask each student to describe a taste or smell to someone who has never had it. Then ask: what does the listener now know, and what's still missing?",
      discussionPrompts: [
        "Can you think of something you know how to do but can't fully explain — like recognizing a friend's voice, or knowing when a joke is funny? Why is the experience easier than the explanation?",
        "If you had to teach an AI what red is, what would you give it: the wavelength, pictures of red things, stories?",
        "What's the difference between knowing about something and knowing what it is like?",
        "Are there things blind people can know about color that sighted people might miss?",
      ],
      handout: "Two-column chart — Things you can fully share with words / Things you can only share by experience. List five examples in each column. Bottom: write one sentence about where the line falls and why.",
      exitTicket: "Pick one option from Act 3 and defend it in two sentences. Include one objection someone might raise.",
    },
    philosophyLab: lab({
      discussion: "Physicalists say if you knew every physical fact about red, nothing new could surprise you. The other side replies that descriptions can prepare you for an experience, but they can't substitute for having it. The interesting question is whether 'knowing what red is like' is a fact you can be told, an ability you can develop, or something else entirely.",
      fallacySpotting: "Spot the equivocation in this sentence: 'Hassan knows everything about red, so he must know red.' How is the word *know* doing two different jobs?",
      argumentRepair: "Make the physicalist objection stronger without dismissing experience as fake, and without saying Hassan doesn't really know red.",
      variationPrompt: "Now imagine the new student has never tasted anything sweet. How would you teach them what sweetness is like, and does the teaching actually work?",
      related: ["The Biased Algorithm", "Are You Sure You're Real?", "Robot Replacement Parts"],
    }),
    reference: ref({
      concept: "Qualia — the felt quality of experience that seems to live on a different layer from physical facts. Mary's Room is the canonical thought experiment.",
      philosopher: "Frank Jackson",
      year: "1982",
      text: "Frank Jackson, 'Epiphenomenal Qualia' (1982); Brock & Hay, 'Mary's Room and Science Education' (2019)",
      url: "https://en.wikipedia.org/wiki/Knowledge_argument",
    }),
    furtherReading: [
      reading("Qualia (Stanford Encyclopedia of Philosophy)", "https://plato.stanford.edu/entries/qualia/", "intermediate"),
      reading("Knowledge Argument (Wikipedia)", "https://en.wikipedia.org/wiki/Knowledge_argument", "intro"),
      reading("Nagel, 'What Is It Like to Be a Bat?'", "https://en.wikipedia.org/wiki/What_Is_It_Like_to_Be_a_Bat%3F", "advanced"),
    ],
  },
};

export function getMiddleSchoolExperiments(experiments) {
  const byId = new Map(experiments.map(experiment => [experiment.id, experiment]));
  return MIDDLE_SCHOOL_ORDER
    .map(id => {
      const experiment = byId.get(id);
      const copy = MIDDLE_SCHOOL_SCENARIO_COPY[id];
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
