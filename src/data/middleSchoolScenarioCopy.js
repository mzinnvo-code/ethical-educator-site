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
      discussion: "The strongest case for slowing the spread emphasizes urgent democratic harm — once a fake reaches voters, the correction never travels as far. The strongest case against quick suppression worries that emergency censorship can become a tool for hiding inconvenient real claims. The harder question may be: what response is narrow enough to protect an election without treating *every* contested claim as forbidden?",
      fallacySpotting: "Spot the false dilemma in this claim: 'Either we ban every political deepfake immediately, or democracy is over.' What third or fourth options does it erase?",
      argumentRepair: "Rewrite 'Only gullible people fall for deepfakes' as a stronger argument about speed, emotion, and verification — without insulting the people who shared it.",
      variationPrompt: "Create a version where the media is *satire*, not deception. What detail changes your answer?",
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
          section("The situation", "In robotics club, the screen shows a virtual tram racing toward five workers. The program gives you one control: switch tracks."),
          section("The pressure", "On the side track, one worker is trapped. The countdown turns red. Your teammates look at you because your hand is closest to the keyboard."),
          section("The choice", "No option feels clean. Doing nothing is still a decision, but acting means choosing a death directly."),
        ],
        prompt: "What should you do in the simulator?",
        options: [
          { label: "A", text: "Switch tracks because saving five lives creates the least total harm.", reflection: "This is utilitarian reasoning: count the consequences and reduce the worst outcome.", lens: "utilitarian" },
          { label: "B", text: "Do not switch because choosing to send the tram at one person is a different kind of wrong.", reflection: "This treats some actions as morally off-limits, even when the numbers are tempting.", lens: "deontological" },
          { label: "C", text: "Hit the emergency brake and challenge the design of the simulation.", reflection: "You are refusing the forced frame. That can be moral clarity, but the emergency brake may fail.", lens: "anti-framing" },
        ],
      },
      {
        id: "embodied",
        kicker: "Act 2 - the body in the story",
        title: "The bridge version",
        weighty: true,
        storySections: [
          section("The situation", "The teacher resets the simulator. Same tram. Same five workers. But this time you are standing on a bridge in the scene."),
          section("The pressure", "A stranger beside you is heavy enough to stop the tram if pushed. The screen says the math is identical: one death to save five."),
          section("The choice", "Your stomach reacts before your argument does. The answer that seemed logical a minute ago now feels much harder to say out loud."),
        ],
        prompt: ({ chose }) => `${chose[0]?.lens === "utilitarian" ? "If the math convinced you before, should it convince you here too?" : "Does the bridge case change your answer, or reveal what your first answer meant?"}`,
        options: [
          { label: "A", text: "Push, because the number of lives saved has not changed.", reflection: "This is strict consistency. It shows the strength and discomfort of consequence-based reasoning.", lens: "utilitarian" },
          { label: "B", text: "Do not push, because using a person as the tool that stops the tram crosses a line.", reflection: "You are naming the means, not just the outcome, as morally important.", lens: "deontological" },
          { label: "C", text: "Admit that the cases feel different and investigate why before programming anything.", reflection: "Moral hesitation can be evidence. It asks for better language, not instant certainty.", lens: "moral-intuition" },
        ],
        counterpoint: "If the result is still one life lost and five saved, any difference you feel needs an explanation. A feeling alone is not yet an argument.",
      },
      {
        id: "programming",
        kicker: "Act 3 - the code",
        title: "The rule no one sees",
        storySections: [
          section("The situation", "Now the teacher asks each group to write the simulator's decision rule. The rule will run automatically before any human can react."),
          section("The pressure", "A rule that sounds noble in class might behave brutally in a real street. A rule that avoids every hard case might make the machine useless."),
          section("The choice", "Programming morality means turning a messy judgment into instructions that may fire on the worst day."),
        ],
        prompt: "What kind of rule should a safety system use when every option causes harm?",
        options: [
          { label: "A", text: "Use a harm-minimizing rule, but require public review before deployment.", reflection: "This combines outcomes with democratic accountability. The numbers matter, but so does who approves them.", lens: "procedural" },
          { label: "B", text: "Forbid any rule that intentionally targets an innocent person as the solution.", reflection: "This protects a moral boundary, even if some outcomes become worse.", lens: "deontological" },
          { label: "C", text: "Redesign systems to slow down, warn earlier, and avoid forced choices whenever possible.", reflection: "Design ethics asks why the dilemma exists and whether better systems can prevent it.", lens: "design-out" },
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
      discussion: "The lever case feels easier because the trolley is already moving — we redirect harm rather than originate it. The footbridge case feels harder because the stranger's body becomes the *means* by which the trolley stops. Most people pull the lever and refuse to push, even when the math is identical. Whether the difference is a deep moral truth or a quirk of how human brains process action vs. allowing is what philosophers, and now AI designers, are still trying to settle.",
      fallacySpotting: "Spot the appeal-to-numbers in this argument: 'Pulling the lever saves four more lives, so it's obviously correct.' What is *obviously correct* assuming about whose lives count, and how?",
      argumentRepair: "Rewrite 'You can't put a number on a life' as a real philosophical position. Try Kant on persons as ends, not just an internet slogan.",
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
          section("The situation", "Your school pilots an AI tool to help choose students for a citywide robotics showcase. It ranks applications using past winners as examples."),
          section("The pressure", "The first shortlist looks impressive, but nearly every selected student comes from the same two advanced classes. Several strong builders from the after-school lab are missing."),
          section("The choice", "The AI did not insult anyone. It simply learned what past success looked like and repeated the pattern with a polished score."),
        ],
        prompt: "What should the student committee do with the shortlist?",
        options: [
          { label: "A", text: "Pause the selection until people understand why the tool ranked students this way.", reflection: "You are treating unexplained patterns as a reason to slow down before harm hardens into a decision.", lens: "precautionary" },
          { label: "B", text: "Use the shortlist but add human review for students who may have been missed.", reflection: "This balances efficiency with repair, though the AI still sets the first frame.", lens: "procedural" },
          { label: "C", text: "Reject the tool because a biased shortcut should not decide opportunity.", reflection: "You are protecting fairness by removing a harmful system, even if the manual process is slower.", lens: "abolition" },
        ],
      },
      {
        id: "training-data",
        kicker: "Act 2 - the source",
        title: "What the machine learned",
        storySections: [
          section("The situation", "The teacher shows the training data. Past winners had expensive kits, private coaching, and recommendation letters from teachers who already knew them well."),
          section("The pressure", "The AI treated those signals as proof of talent. But some students had fewer chances to collect those signals in the first place."),
          section("The choice", "Now the committee has to decide whether the problem is the algorithm, the old data, or the school's definition of merit."),
        ],
        prompt: "Where should the repair begin?",
        options: [
          { label: "A", text: "Fix the training data so the AI learns from a wider range of successful students.", reflection: "This is a technical repair, useful but incomplete if opportunity remains unequal.", lens: "technical-fix" },
          { label: "B", text: "Change the criteria so teamwork, persistence, and creativity count alongside polished applications.", reflection: "You are questioning what the system means by merit, not just how it calculates it.", lens: "structural" },
          { label: "C", text: "Build a review team that includes students and teachers from the groups most affected.", reflection: "This adds lived context to the design process, which can reveal blind spots data alone hides.", lens: "participatory" },
        ],
        counterpoint: "Human review is not automatically fair either. People also carry bias, favorites, and assumptions; the question is how to make every layer more accountable.",
      },
      {
        id: "past-harm",
        kicker: "Act 3 - the rejected students",
        title: "The list from last semester",
        storySections: [
          section("The situation", "Then someone discovers the same tool quietly screened applicants last semester. Students who never made the shortlist never knew a machine filtered them out."),
          section("The pressure", "Reopening old applications will be embarrassing and time-consuming. Ignoring them would protect the school more than the students."),
          section("The choice", "A fairness problem is no longer only about preventing future mistakes. It is about what is owed to people already affected."),
        ],
        prompt: "What does the school owe the students who may have been unfairly rejected?",
        options: [
          { label: "A", text: "Re-review every rejected application and offer a real second chance where possible.", reflection: "This treats repair as more than an apology. It costs time because the harm cost students opportunity.", lens: "remedial" },
          { label: "B", text: "Publicly explain the failure, change the process, and invite appeals from affected students.", reflection: "This emphasizes transparency and a practical path for correction, though some students may still be missed.", lens: "transparency" },
          { label: "C", text: "Focus on fixing the next round because the past cannot be fully undone.", reflection: "This is pragmatic, but it risks making the people harmed carry the cost of the system's learning.", lens: "pragmatic" },
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
      discussion: "The strongest defense of the AI tool is that it is more *consistent* than human judges — same input, same output. The strongest critique is that consistency is not the same as fairness when the inputs themselves carry the patterns of past unfair choices. The real question is not whether to use AI but where the *audit* and the *appeal* go — and whose voice can challenge the score.",
      fallacySpotting: "Spot the bait-and-switch in this claim: 'The algorithm doesn't see race, so it can't be racist.' What kind of unfairness does *not seeing* not actually fix?",
      argumentRepair: "Rewrite 'Just hire humans, they're fairer' as a stronger argument that takes seriously the documented bias in human hiring decisions.",
      variationPrompt: "Imagine the school adds a human reviewer, but only to confirm the AI's choice — never overrule it. Has the system actually changed?",
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
          section("The situation", "In sixth grade, your team built a small robot named Orbit. It bumped into table legs, learned the maze, and flashed blue whenever someone said, \"Good job.\""),
          section("The pressure", "By eighth grade, Orbit has been repaired so many times that the wheels, shell, sensors, battery, and memory chip have all been replaced."),
          section("The choice", "The robot rolls into the same maze and flashes the same blue light. Your team wants to know whether Orbit came back or whether a new robot inherited the name."),
        ],
        prompt: "Is the repaired robot still Orbit?",
        options: [
          { label: "A", text: "Yes, because its story, name, behavior, and role in the team continued.", reflection: "You are grounding identity in continuity of relationship and history.", lens: "psychological-continuity" },
          { label: "B", text: "No, because none of the original parts remain.", reflection: "You are grounding identity in material continuity: what something is made of matters.", lens: "material-identity" },
          { label: "C", text: "It is Orbit for some purposes, but not for every question.", reflection: "You are treating identity as layered rather than all-or-nothing.", lens: "pluralist" },
        ],
      },
      {
        id: "old-parts",
        kicker: "Act 2 - the second Orbit",
        title: "The box in the closet",
        storySections: [
          section("The situation", "At the showcase, the custodian brings out a box. Inside are all of Orbit's old parts. Another team has reassembled them into a second working robot."),
          section("The pressure", "The new-old robot has the original shell and wheels. The repaired robot has the memories, habits, and team history. Both can be pointed to as Orbit."),
          section("The choice", "A question that sounded silly now affects awards, ownership, and what your team means when it says \"our robot.\""),
        ],
        prompt: "Which robot has the stronger claim to being the original Orbit?",
        options: [
          { label: "A", text: "The repaired robot, because continuous memory and use matter more than parts.", reflection: "This follows the thread of experience through change.", lens: "memory-criterion" },
          { label: "B", text: "The reassembled robot, because the original matter has been restored.", reflection: "This treats physical history as the anchor of sameness.", lens: "material-identity" },
          { label: "C", text: "Neither answer is complete because different kinds of sameness are being mixed together.", reflection: "This resists forcing one word, identity, to do too many jobs.", lens: "pluralist" },
        ],
        counterpoint: "If both robots can claim something important, then maybe the question is not 'which one is real?' but 'what kind of sameness matters here?'",
      },
      {
        id: "student-mirror",
        kicker: "Act 3 - the mirror",
        title: "The version of you that changed",
        storySections: [
          section("The situation", "After the showcase, your teacher asks the class to look at old sixth-grade photos. Everyone laughs because the faces are familiar and unfamiliar at the same time."),
          section("The pressure", "Your body changed. Your opinions changed. Some friendships changed. Still, people talk as if the person in the photo is obviously you."),
          section("The choice", "Orbit's puzzle has turned back toward the class: what has to continue for someone or something to remain itself?"),
        ],
        prompt: "What should count most when we say something is the same over time?",
        options: [
          { label: "A", text: "Continuing memories and personality, because those connect one moment to the next.", reflection: "This makes identity personal and psychological.", lens: "psychological-continuity" },
          { label: "B", text: "Continuing body or parts, because identity needs a physical anchor.", reflection: "This keeps identity tied to material reality.", lens: "material-identity" },
          { label: "C", text: "Continuing relationships and responsibilities, because others help hold identity in place.", reflection: "This sees identity as social as well as internal.", lens: "relational" },
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
      discussion: "If gradual replacement preserves identity, the original parts no longer matter. If material continuity matters, the reassembled robot has a stronger claim. Locke and Parfit both argue that what *matters* is psychological continuity — the connections of memory and use — not physical sameness. The puzzle is sharpest when both robots are sitting in front of you.",
      fallacySpotting: "Spot the equivocation in this claim: 'It has all the same parts, so it's the same robot.' What two different meanings of *same* are sliding past each other?",
      argumentRepair: "Rewrite 'Identity is whatever the owner says it is' as a serious claim. Is that the same as saying identity is just a feeling — and what does that cost?",
      variationPrompt: "Now imagine the robot's *memory chip* alone is moved into a brand-new body — and the old body is left empty. Which one is Orbit?",
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
          section("The situation", "Your family is testing a self-driving car. The dashboard says it prevents most crashes by braking faster than any human."),
          section("The pressure", "Then the demo instructor explains the emergency setting: if a crash cannot be avoided, the car follows a programmed priority rule."),
          section("The choice", "Your family has to choose the rule before taking the car home. The rule is invisible until the worst moment."),
        ],
        prompt: "Which rule should a family car be allowed to follow?",
        options: [
          { label: "A", text: "Minimize total harm, even if that could sacrifice the passenger.", reflection: "This is public-minded and terrifying from the passenger seat.", lens: "utilitarian" },
          { label: "B", text: "Protect passengers first because people bought the car to keep their family safe.", reflection: "This honors loyalty, but it can make pedestrians less protected by design.", lens: "partialism" },
          { label: "C", text: "Require the same public safety rule for every car, not buyer-selected settings.", reflection: "This treats road safety as a shared civic system rather than a private preference.", lens: "procedural" },
        ],
      },
      {
        id: "intersection",
        kicker: "Act 2 - the street",
        title: "Rain at the crosswalk",
        storySections: [
          section("The situation", "Weeks later, heavy rain hides the lane markings. A cyclist swerves, a child steps near the curb, and the car calculates three bad paths."),
          section("The pressure", "The car has less than a second. It cannot ask what everyone deserves. It can only execute the value someone encoded."),
          section("The choice", "The abstract rule now has faces: passenger, cyclist, child, company, programmer, and city."),
        ],
        prompt: "Who should be morally responsible for what the car does?",
        options: [
          { label: "A", text: "The company, because it designed and sold the priority rule.", reflection: "Responsibility follows design power. The company shaped the decision before the road ever got wet.", lens: "responsibility" },
          { label: "B", text: "The public regulators, because road rules should not be left to private companies.", reflection: "This makes safety a democratic responsibility, but regulation can lag behind technology.", lens: "civic" },
          { label: "C", text: "The owner shares responsibility if they knowingly chose a rule that favors them.", reflection: "Choice creates accountability, especially when the chosen setting affects strangers.", lens: "accountability" },
        ],
        counterpoint: "The car reacts in a second, but the moral choice happened months earlier in design meetings, policy debates, and purchase screens.",
      },
      {
        id: "public-rule",
        kicker: "Act 3 - the meeting",
        title: "The town vote",
        storySections: [
          section("The situation", "After a near miss, the town holds a public meeting. Parents, cyclists, drivers, engineers, and students all want a voice."),
          section("The pressure", "If the rule protects passengers too much, streets become unfair. If it sacrifices passengers too easily, people may refuse safer cars entirely."),
          section("The choice", "The town needs a rule people can live with before they know whether they will be inside or outside the car."),
        ],
        prompt: "What should the town require before self-driving cars are allowed on public roads?",
        options: [
          { label: "A", text: "A transparent safety rule reviewed by the public and applied to every manufacturer.", reflection: "Transparency makes hidden values debatable before they become automatic.", lens: "transparency" },
          { label: "B", text: "Proof that the cars reduce overall crashes enough to justify rare moral emergencies.", reflection: "You are weighing the whole safety system, not only the dramatic edge case.", lens: "utilitarian" },
          { label: "C", text: "A design standard that avoids high-speed forced choices as much as possible.", reflection: "This asks technology to prevent dilemmas, not just win arguments inside them.", lens: "design-out" },
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
      discussion: "The trolley case put the choice in your hands. The self-driving car puts the choice in *code* — written months ago, by people you'll never meet, applied to a situation they didn't predict. The question shifts: not what *I* would do but what rule we are willing to live under, written in advance. Public ethics is harder than personal ethics, and the car company is now part of the public.",
      fallacySpotting: "Spot the moving target in this argument: 'The car should always protect its rider — but also never harm pedestrians, and also follow the law, and also minimize damage.' What happens when these pull apart?",
      argumentRepair: "Rewrite 'The car should just do what a good driver would do' as a real engineering specification. Whose definition of *good driver*?",
      variationPrompt: "Imagine you're not in the car — you're a pedestrian. Does your answer change? Should it?",
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
          section("The situation", "During a virtual field trip, you notice the same bird crossing the same window every seventeen seconds. No one else seems bothered."),
          section("The pressure", "Then your headset freezes, the classroom flickers, and for one second you see a white room full of cables. When everything returns, your notes are still on your desk."),
          section("The choice", "If all your experiences could be produced perfectly, the feeling of being certain might not prove as much as you thought."),
        ],
        prompt: "Could you prove that your world is not being simulated?",
        options: [
          { label: "A", text: "No, because every piece of evidence could be part of the simulation.", reflection: "This is radical skepticism: the system you are testing may control the test.", lens: "skepticism" },
          { label: "B", text: "Probably, because the ordinary explanation is simpler and more reasonable.", reflection: "This uses practical reasoning. Certainty may be too high a demand for everyday knowledge.", lens: "parsimony" },
          { label: "C", text: "Maybe not, but my experiences and relationships still matter from inside them.", reflection: "This shifts from certainty to meaning. It asks what reality is doing in the question.", lens: "pragmatist" },
        ],
      },
      {
        id: "button",
        kicker: "Act 2 - the offer",
        title: "The truth button",
        storySections: [
          section("The situation", "A message appears: PRESS ONCE TO KNOW WHETHER YOUR WORLD IS REAL. The message says the answer cannot be unseen."),
          section("The pressure", "If the world is real, you gain certainty. If it is simulated, everything familiar changes. If the message is a trick, pressing may do nothing or something worse."),
          section("The choice", "Curiosity, fear, and the desire for truth all pull in different directions."),
        ],
        prompt: "Should you press the button?",
        options: [
          { label: "A", text: "Press because truth matters more than comfort.", reflection: "You are treating knowledge as worth risk, even when it may disrupt your life.", lens: "realist" },
          { label: "B", text: "Do not press because living well may matter more than solving every doubt.", reflection: "You are choosing practical meaning over certainty.", lens: "pragmatist" },
          { label: "C", text: "Study the message first because not every invitation to know should be trusted.", reflection: "This values inquiry without rushing into a trap.", lens: "inquiry" },
        ],
        counterpoint: "Refusing the button does not answer the question. It only decides what kind of uncertainty you are willing to live with.",
      },
      {
        id: "return",
        kicker: "Act 3 - the ordinary world",
        title: "Back at lunch",
        storySections: [
          section("The situation", "At lunch, your friend offers half a cookie and asks why you look strange. The cafeteria is loud, sticky, and completely ordinary."),
          section("The pressure", "Part of you wants to keep doubting everything. Another part notices that friendship, hunger, jokes, and homework still make demands on you."),
          section("The choice", "The thought experiment has not removed ordinary life. It has changed how you think about certainty inside it."),
        ],
        prompt: "How should a person live when absolute certainty is out of reach?",
        options: [
          { label: "A", text: "Keep questioning, but require reasons before treating doubt as serious.", reflection: "This balances skepticism with standards for evidence.", lens: "critical-inquiry" },
          { label: "B", text: "Trust ordinary life unless a doubt gives you a concrete reason to act differently.", reflection: "This is common-sense pragmatism: life cannot wait for perfect proof.", lens: "pragmatist" },
          { label: "C", text: "Use uncertainty to become humbler about what you claim to know.", reflection: "This turns doubt into intellectual humility rather than panic.", lens: "humility" },
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
      discussion: "Descartes used the demon to find what could not be doubted; Putnam used the vat to argue that some skeptical scenarios cannot even be coherently stated. Either way, the everyday question stays the same: *given* that we cannot prove we aren't in some such situation, what is reasonable to trust, and on what grounds? The skeptical move tightens our grip on what we mean by knowledge — it does not actually loosen our hold on the world.",
      fallacySpotting: "Spot the demand for the impossible in this claim: 'If you can't prove you're not a brain in a vat, you don't really know anything.' What standard of *proof* is that argument using?",
      argumentRepair: "Rewrite 'I just *know* I'm real' as a serious epistemic claim. What kind of evidence supports it, even if it's not a proof?",
      variationPrompt: "Imagine the simulation hypothesis is *true* — but the simulation gives every person inside it full conscious experience and a moral life. Has anything that matters changed?",
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
          section("The situation", "Your class is designing a new school for a simulation game. Each group must choose rules for grading, lunch, support services, discipline, clubs, and technology access."),
          section("The pressure", "Each student has a sealed envelope with their role: wealthy, poor, disabled, new to the language, gifted, popular, isolated, healthy, sick. No one may open it yet."),
          section("The choice", "You are making rules for a world where you might be anyone, not just the person you already are."),
        ],
        prompt: "What principle should guide the class while the envelopes stay closed?",
        options: [
          { label: "A", text: "Make the worst-off role as protected and supported as possible.", reflection: "This follows Rawlsian reasoning: design as if you might need the strongest safety net.", lens: "rawlsian" },
          { label: "B", text: "Maximize total achievement, even if some roles struggle more.", reflection: "This focuses on overall outcomes, but it risks hiding who pays the cost.", lens: "utilitarian" },
          { label: "C", text: "Give everyone the same resources and rules.", reflection: "Equality is clear and predictable, but equal treatment may not meet unequal needs.", lens: "egalitarian" },
          { label: "D", text: "Maximize freedom of choice and let students build their own paths.", reflection: "Freedom matters, but its value changes when some students start with fewer options.", lens: "libertarian" },
        ],
      },
      {
        id: "budget",
        kicker: "Act 2 - scarcity",
        title: "Only three promises",
        storySections: [
          section("The situation", "The game adds a budget limit. Your class can guarantee only three major supports: tutoring, health services, open clubs, device access, smaller classes, or enrichment trips."),
          section("The pressure", "Every support helps someone. Choosing one means leaving another need less protected."),
          section("The choice", "Fairness now has to survive scarcity. It is easier to sound just when nothing has to be sacrificed."),
        ],
        prompt: "How should the class choose which supports become guaranteed?",
        options: [
          { label: "A", text: "Prioritize supports that protect students who would otherwise have the fewest real options.", reflection: "This keeps attention on the students most vulnerable to the rules.", lens: "rawlsian" },
          { label: "B", text: "Choose the supports that improve the largest number of students' outcomes.", reflection: "This seeks broad benefit, but the least visible students might remain least protected.", lens: "utilitarian" },
          { label: "C", text: "Let every group vote after hearing role stories from people who might be affected.", reflection: "This adds democratic voice and context before deciding.", lens: "procedural" },
        ],
        counterpoint: "The veil can make people fairer, but it can also hide details that real people need others to understand.",
      },
      {
        id: "veil-lifts",
        kicker: "Act 3 - the reveal",
        title: "The envelope opens",
        storySections: [
          section("The situation", "The envelopes open. One student who argued for fewer supports draws a role with a chronic illness. Another who argued for equal rules draws a role as a new English learner."),
          section("The pressure", "Some students want to change the rules now that they know who they are. Others say changing now would be selfish."),
          section("The choice", "The veil was meant to block self-interest. The reveal tests whether the class learned fairness or only made a lucky bet."),
        ],
        prompt: "Should the class be allowed to revise the rules after seeing the roles?",
        options: [
          { label: "A", text: "No, because the fairest moment was before anyone knew how they personally benefited.", reflection: "This protects impartiality and the discipline of the veil.", lens: "rawlsian" },
          { label: "B", text: "Yes, because real experiences reveal needs the class may not have imagined.", reflection: "This values lived knowledge as a correction to abstract fairness.", lens: "care" },
          { label: "C", text: "Allow revision only if students explain a public reason, not just a personal advantage.", reflection: "This keeps learning from experience while guarding against pure self-interest.", lens: "procedural" },
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
      discussion: "Rawls's idea is that we should design rules from a position where we don't know our own role — a thought experiment, not a literal procedure. The strongest critique is that the veil sounds neutral but in fact rules out important information about real people's needs. Care ethics, in particular, argues that the veil hides exactly the relationships that good rules should attend to. The exercise still teaches something: notice when you are designing for yourself.",
      fallacySpotting: "Spot the smuggled assumption in this argument: 'Behind the veil, everyone would obviously want maximum freedom.' What is *obviously* doing in that sentence?",
      argumentRepair: "Rewrite 'Rawls is just liberalism in disguise' as a real critique — what view of justice it accepts, and which it leaves out.",
      variationPrompt: "Imagine you have to design rules for *one specific neighborhood* you have lived in your whole life. Is that better, worse, or just different from the veil?",
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
          section("The pressure", "At first, everyone follows the rule. Then a few students keep tablets unplugged because they are rushing. No single student ruins the cart, but by Friday half the batteries are dead."),
          section("The choice", "Each shortcut is small. Together, the shared resource stops working for everyone."),
        ],
        prompt: "What should the grade do about the tablet cart?",
        options: [
          { label: "A", text: "Create a clear rule with consequences for returning tablets unplugged.", reflection: "This uses enforcement to protect the commons from repeated small harms.", lens: "regulatory" },
          { label: "B", text: "Assign the cart to one class each week so someone is directly responsible.", reflection: "This uses ownership-like responsibility, though it may reduce shared access.", lens: "property" },
          { label: "C", text: "Build a student-managed checkout team and public charging routine.", reflection: "This relies on community trust, visibility, and shared responsibility.", lens: "communitarian" },
        ],
      },
      {
        id: "exception",
        kicker: "Act 2 - the need",
        title: "The student who needs more",
        storySections: [
          section("The situation", "One student explains that they use the tablet after school because they do not have internet at home. Returning it immediately charged is harder for them."),
          section("The pressure", "A strict rule protects the cart. An exception protects a student. Too many exceptions could drain the cart again."),
          section("The choice", "Fairness has become more complicated than treating every use exactly the same."),
        ],
        prompt: "How should the rule handle students with greater need?",
        options: [
          { label: "A", text: "Keep one rule for everyone because shared resources need predictable limits.", reflection: "Equal rules are clear, but they may ignore unequal starting points.", lens: "fairness" },
          { label: "B", text: "Create a need-based checkout plan with extra charging support.", reflection: "This protects the commons while recognizing that equal use is not always equitable use.", lens: "equity" },
          { label: "C", text: "Find more resources before punishing students for needing the shared one.", reflection: "This shifts from individual blame to system design.", lens: "structural" },
        ],
        counterpoint: "A commons can be destroyed by selfishness, but it can also fail when a community refuses to notice real need.",
      },
      {
        id: "larger-commons",
        kicker: "Act 3 - the wider world",
        title: "More than tablets",
        storySections: [
          section("The situation", "The teacher asks the class to name other commons: clean air, school WiFi, cafeteria space, online attention, and the internet's shared information."),
          section("The pressure", "Some commons are small enough for a class rule. Others cross schools, cities, countries, and companies."),
          section("The choice", "The tablet cart was practice for a larger question: how do people protect what everyone uses but no one fully owns?"),
        ],
        prompt: "What kind of solution works best when a commons is too large for one classroom to manage?",
        options: [
          { label: "A", text: "Public rules and enforcement, because trust alone may not scale.", reflection: "This values regulation when the group becomes too large for informal pressure.", lens: "regulatory" },
          { label: "B", text: "Local communities setting norms because people protect what they help govern.", reflection: "This follows Ostrom's insight that communities can manage shared resources well.", lens: "communitarian" },
          { label: "C", text: "A layered system: rules, community voice, and support for people with fewer resources.", reflection: "This treats commons problems as needing more than one kind of solution.", lens: "pluralist" },
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
      discussion: "Hardin's 1968 paper made *the commons* a watchword for collective failure — but also for a conclusion he assumed too quickly. Elinor Ostrom's life work showed that real communities, given the chance, often *do* solve commons problems through local rules and shared monitoring. The choice between privatization and government control is a false binary; *people governing themselves* is the option Hardin missed.",
      fallacySpotting: "Spot the rush in this claim: 'If everyone uses a shared resource, it always collapses.' What does *always* require us to ignore?",
      argumentRepair: "Rewrite 'Just privatize it' as a real economic argument that takes seriously what gets lost when something stops being shared.",
      variationPrompt: "Imagine the shared pasture is the school's wifi during finals. Design a community rule — not a top-down rule — that protects it.",
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
          section("The situation", "Your teacher writes one sentence on the board: \"This sentence is false.\" Then she puts down the marker and waits."),
          section("The pressure", "If the sentence is true, then what it says must be right, which means it is false. If it is false, then what it says is wrong, which means it is true."),
          section("The choice", "The class wants the sentence to land in a normal true-or-false box. The sentence refuses to stay there."),
        ],
        prompt: "What should we say about the sentence?",
        options: [
          { label: "A", text: "It is neither true nor false because it breaks the normal rules.", reflection: "You are creating a third category for sentences that do not behave normally.", lens: "category-error" },
          { label: "B", text: "It is both true and false, even if that makes logic uncomfortable.", reflection: "This accepts contradiction instead of trying to escape it.", lens: "dialetheism" },
          { label: "C", text: "The problem is self-reference, so sentences should not be allowed to judge their own truth.", reflection: "This protects logic by restricting what language can do.", lens: "stratified" },
        ],
      },
      {
        id: "bot",
        kicker: "Act 2 - the chatbot",
        title: "The chatbot gets stuck",
        storySections: [
          section("The situation", "A student types the sentence into a chatbot and asks, \"Is this true?\" The chatbot gives one answer, then corrects itself, then apologizes, then gives the first answer again."),
          section("The pressure", "The class laughs, but the loop matters. A system that answers questions needs rules for when a question breaks the answer format."),
          section("The choice", "Now the paradox is not only ancient. It is a test of what machines should do when language turns back on itself."),
        ],
        prompt: "What should a reasoning system do with a self-referential paradox?",
        options: [
          { label: "A", text: "Refuse the true-or-false frame and explain why the question loops.", reflection: "This is honest about the limits of the format.", lens: "abstention" },
          { label: "B", text: "Choose the best available answer even if it is imperfect.", reflection: "This values usefulness, but it may hide the structure of the paradox.", lens: "pragmatic" },
          { label: "C", text: "Use different levels of language so a sentence cannot define its own truth.", reflection: "This is the hierarchy move: separate language from language-about-language.", lens: "stratified" },
        ],
        counterpoint: "Sometimes an answer that says 'the question is broken' is not dodging the question. It is answering at a different level.",
      },
      {
        id: "proof",
        kicker: "Act 3 - beyond word games",
        title: "When the puzzle grows up",
        storySections: [
          section("The situation", "The teacher explains that puzzles like this helped mathematicians discover limits in formal systems. Some systems cannot prove every truth about themselves from inside themselves."),
          section("The pressure", "What began as a sentence trick now feels like a warning: even powerful rule systems may have boundaries."),
          section("The choice", "The class has to decide whether limits make logic weaker or more interesting."),
        ],
        prompt: "What is the most important lesson of the paradox?",
        options: [
          { label: "A", text: "Truth and proof are not always the same thing.", reflection: "This points toward deep work in logic: some truths may outrun a system's proof rules.", lens: "realist" },
          { label: "B", text: "Language needs levels and limits to avoid confusion.", reflection: "This treats the paradox as a design problem for clear reasoning.", lens: "stratified" },
          { label: "C", text: "Contradictions can reveal where our thinking tools need repair.", reflection: "This treats discomfort as useful evidence about the limits of a framework.", lens: "inquiry" },
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
      discussion: "The Liar resists every easy escape: if true, then false; if false, then true. Tarski's response was that no language can fully describe its own truth from inside; we need a hierarchy of meta-languages. Gödel's incompleteness theorems generalized the moment: any sufficiently powerful formal system contains true statements it cannot prove. The paradox is small; the lessons are large.",
      fallacySpotting: "Spot the dismissive move in this argument: 'It's just a sentence — sentences can't really be paradoxes.' What is *just a sentence* leaving out about how language works?",
      argumentRepair: "Rewrite 'The Liar is meaningless, end of story' as a real philosophical position — and then say what it costs you elsewhere.",
      variationPrompt: "Now imagine the Liar's twin: 'This sentence is true.' Is *that* one fine? Why or why not?",
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
          section("The pressure", "She removes one grain. Still a heap. Another grain. Still a heap. The class keeps agreeing until the word starts to wobble."),
          section("The choice", "No single grain seems powerful enough to change the answer, but eventually the heap is gone."),
        ],
        prompt: "When did the heap stop being a heap?",
        options: [
          { label: "A", text: "There is an exact cutoff, even if we do not know it.", reflection: "This says vagueness is in our knowledge, not in the world.", lens: "epistemicism" },
          { label: "B", text: "There is no sharp cutoff because heap is a fuzzy word.", reflection: "This treats some truths as gradual rather than yes-or-no.", lens: "fuzzy-logic" },
          { label: "C", text: "Different reasonable cutoffs can work in different contexts.", reflection: "This says language can be precise enough for use without having one hidden boundary.", lens: "supervaluationism" },
        ],
      },
      {
        id: "classifier",
        kicker: "Act 2 - the machine",
        title: "The sorting robot",
        storySections: [
          section("The situation", "Now a sorting robot must label trays: HEAP or NOT HEAP. The robot cannot shrug, laugh, or say, \"It depends\" unless someone programs that option."),
          section("The pressure", "A sharp cutoff is easy to code but arbitrary. A confidence score is honest but harder to use. Refusing edge cases slows the whole lab."),
          section("The choice", "The vague word has become a design decision."),
        ],
        prompt: "What should the robot output near the boundary?",
        options: [
          { label: "A", text: "Use a fixed cutoff so everyone knows the rule.", reflection: "This is practical and transparent, but the chosen number still needs justification.", lens: "pragmatic" },
          { label: "B", text: "Give a confidence score instead of a simple label.", reflection: "This matches the fuzziness of the case, though users may want a cleaner answer.", lens: "fuzzy-logic" },
          { label: "C", text: "Flag borderline cases for human review.", reflection: "This recognizes that some classifications should pause near the edge.", lens: "abstention" },
        ],
        counterpoint: "A machine's clear answer can make a vague boundary look more real than it is.",
      },
      {
        id: "people-labels",
        kicker: "Act 3 - labels for people",
        title: "When fuzzy words affect lives",
        storySections: [
          section("The situation", "The class lists other fuzzy labels: late, ready, popular, advanced, risky, gifted, poor, safe, suspicious."),
          section("The pressure", "Some labels are harmless until they decide who gets help, discipline, opportunity, or trust."),
          section("The choice", "A sand pile puzzle has become a warning about classification when the label affects people."),
        ],
        prompt: "How should schools and AI systems handle fuzzy labels that affect real people?",
        options: [
          { label: "A", text: "Use clear criteria and explain the cutoff openly.", reflection: "Transparency helps people challenge the rule, even if the boundary remains imperfect.", lens: "transparency" },
          { label: "B", text: "Use ranges and human judgment near the boundary.", reflection: "This keeps the system from pretending borderline cases are simple.", lens: "procedural" },
          { label: "C", text: "Avoid high-stakes decisions based on vague labels whenever possible.", reflection: "This protects people from being trapped by categories that were never precise.", lens: "anti-framing" },
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
      discussion: "The Sorites is small change with large consequences: every grain looks innocent, but the conclusion that no number ever makes a heap is wrong. Williamson's *epistemic* answer is that there *is* a sharp boundary — we just can't know where. Fuzzy-logic answers say the predicate itself comes in degrees. AI classifiers face the same problem every day, in production, with real consequences — and somebody has to pick the cutoff.",
      fallacySpotting: "Spot the slippery slope in this argument: 'If we let one student turn in homework late, then *every* student will, and grading collapses.' Where exactly does the slope slip?",
      argumentRepair: "Rewrite 'Vagueness just means the word is broken' as a serious philosophical claim. What words *aren't* vague — and what do they have in common?",
      variationPrompt: "Imagine you're training the AI yourself. Where do you tell it to draw the line, and how do you defend that exact spot?",
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
          section("The situation", "A new student named Hassan joined your science class today. The class is in the middle of the light-spectrum unit. Ms. Park has written on the board: red = 700 nanometers. She explains that red is the wavelength human eyes pick up at the long end of the visible spectrum."),
          section("The pressure", "Hassan was born without sight. He has heard the word red his whole life — stop signs, fire engines, his grandmother's favorite sweater. But he has never seen it. He raises his hand."),
          section("The question", "Hassan asks, very simply, 'If red is 700 nanometers — does that tell you what red looks like?' The whole class quiets. Everyone is suddenly uncertain about how to answer."),
        ],
        prompt: "What do you tell Hassan?",
        options: [
          { label: "A", text: "Yes — the wavelength IS what red is. The science gives you the answer.", reflection: "You side with physical description. The number names a real thing in the world, and the thing it names is the same for everyone, whether they have seen red or not. But Hassan can memorize the number too. There's something else behind the word.", lens: "wavelength-yes" },
          { label: "B", text: "No — knowing the number is not the same as seeing.", reflection: "You side with experience. The wavelength is true. The wavelength is not the thing. You've drawn a line philosophers have argued about for a long time.", lens: "wavelength-no" },
          { label: "C", text: "Sort of — you'd know about red, but not what it looks like.", reflection: "You allowed two kinds of knowing: the propositional kind (700 nm) and the phenomenal kind (what red looks like). One of the oldest distinctions in philosophy.", lens: "wavelength-sort" },
        ],
      },
      {
        id: "help",
        kicker: "Act 2 - how would you help?",
        title: "Hassan wants to understand red another way",
        storySections: [
          section("The situation", "Hassan thinks about your answer. Then he asks something harder. 'When you say red, your face changes. There's something else there. Could you help me have a sense of that?'"),
          section("The pressure", "The class is genuinely trying. But every approach has a trap. Borrow from other senses, and you might just be making up a new word. Tell stories, and you describe what red DOES, not what red IS. Stick to the science, and you're back where you started."),
          section("The choice", "You have to pick something. The class is waiting."),
        ],
        prompt: "How do you try to help Hassan understand red?",
        options: [
          { label: "A", text: "Borrow from senses he DOES have — warmth, sound, touch.", reflection: "You reach for the world Hassan already knows. Useful — but calling red 'warm' is a borrowed word. Are you helping him understand red, or making up a new word that happens to share a spelling?", lens: "associations" },
          { label: "B", text: "Tell stories — every place I've seen red.", reflection: "Red lives in a hundred ordinary moments. As you tell them aloud, Hassan starts to hear the shape of the word. But stories describe what red DOES in the world, not what red IS to look at.", lens: "stories" },
          { label: "C", text: "Stick with the science — that's the real answer.", reflection: "Hassan takes notes. He understands the system. Whether he understands the color, the science cannot say. Philosophers call this gap qualia.", lens: "facts" },
        ],
        counterpoint: "Notice what just happened: every approach you can try is *partial*. That's not a flaw in your answer — it's a clue about what kind of question this is.",
      },
      {
        id: "knowing",
        kicker: "Act 3 - the real question",
        title: "Two kinds of knowing — or just one?",
        storySections: [
          section("The situation", "Ms. Park steps in. She says this question has a long history. In 1982, philosopher Frank Jackson imagined a scientist named Mary who knew every physical fact about color from inside a black-and-white room. When Mary finally stepped out and saw red — did she learn something new?"),
          section("The pressure", "Most people say yes. Which means there might be a kind of knowledge that descriptions — no matter how complete — do not deliver. That's a strange thing to be true."),
          section("The question", "And it isn't just about color. It's about pain, hunger, love, the taste of a strawberry. You can describe any of these in great detail. But description and experience are not the same thing."),
        ],
        prompt: "So what is knowing, really?",
        options: [
          { label: "A", text: "Some kinds of knowing have to come through experience.", reflection: "Phenomenal realism: there is a kind of knowledge descriptions don't deliver. The Mary's Room answer most people give.", lens: "experience" },
          { label: "B", text: "Knowing is knowing — descriptions count too.", reflection: "Strong physicalism: if Hassan has the facts, he has the knowledge. The Mary's Room thought experiment, on this view, fails. Daniel Dennett argued exactly this.", lens: "same" },
          { label: "C", text: "There are several kinds of knowing, and we need all of them.", reflection: "Epistemic pluralism: 'knowing' is not one thing. The word red has many doors — and that's more honest than any single answer.", lens: "plural" },
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
      discussion: "The strongest case for physicalism says: if you knew *every* physical fact about red, nothing new could surprise you. The strongest case against says: descriptions can prepare you for an experience, but they can't substitute for having it. The interesting question is whether 'knowing what red is like' is a *fact* you can be told, an *ability* you can develop, or something else entirely.",
      fallacySpotting: "Spot the equivocation in this sentence: 'Hassan knows everything about red, so he must know red.' How is the word *know* doing two different jobs?",
      argumentRepair: "Make the physicalist objection stronger without dismissing experience as fake — and without saying Hassan doesn't really know red.",
      variationPrompt: "Now imagine the new student has never tasted *anything* sweet. How would you teach them what sweetness is like — and does it work?",
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
