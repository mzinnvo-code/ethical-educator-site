const section = (label, text) => ({ label, text });

const reflection = (title, positions = []) => ({
  id: "synthesis",
  kicker: "Reflection",
  title,
  synthesis: () => null,
  positions,
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
];

export const MIDDLE_SCHOOL_SCENARIO_COPY = {
  "deepfake-election": {
    title: "The Deepfake Dilemma",
    tagline: "A video looks real, the election is tomorrow, and sharing it could change everything.",
    estimatedMinutes: 10,
    stages: [
      {
        id: "viral-clip",
        kicker: "Act 1 - the clip",
        title: "The video in the group chat",
        storySections: [
          section("The situation", "At 8:47 p.m., your class group chat lights up. Someone posts a video of a mayoral candidate apparently stuffing cash into an envelope."),
          section("The pressure", "The election is tomorrow. People are already reposting it with flame emojis. One friend says, \"If this is real, everyone needs to know tonight.\""),
          section("The choice", "You notice the candidate's mouth moves a little strangely, but the clip is convincing enough to make people furious."),
        ],
        prompt: "What should you do before anyone in your circle shares it again?",
        options: [
          { label: "A", text: "Tell everyone not to share until there is verification from a reliable source.", reflection: "You are protecting truth by slowing the spread. The cost is that real evidence might also move more slowly.", lens: "precautionary" },
          { label: "B", text: "Share it with a warning label so people can decide for themselves.", reflection: "You value openness, but warnings can still spread the image and emotion faster than the correction.", lens: "free-speech" },
          { label: "C", text: "Report it to the platform and send it to a teacher or trusted adult who can help verify it.", reflection: "You are treating the problem as civic, not just personal. That moves responsibility toward people with more tools.", lens: "responsibility" },
        ],
      },
      {
        id: "almost-true",
        kicker: "Act 2 - the twist",
        title: "A true rumor inside a fake video",
        storySections: [
          section("The situation", "An hour later, a local reporter says the video is fake. But the reporter also says there may be a separate investigation into the campaign's money."),
          section("The pressure", "Now the chat splits. Some students say the fake video does not matter because the candidate might still be guilty. Others say a fake is a fake, no matter what."),
          section("The choice", "You are no longer deciding only whether the clip is real. You are deciding what kind of evidence people deserve before a public accusation spreads."),
        ],
        prompt: "How should your group talk about the story now?",
        options: [
          { label: "A", text: "Separate the claims: the video is fake, and the investigation is unconfirmed.", reflection: "This protects careful thinking. Different claims need different evidence.", lens: "epistemic-care" },
          { label: "B", text: "Keep warning people about the candidate because the larger concern may still be true.", reflection: "You are prioritizing public safety, but you risk letting suspicion do the work of proof.", lens: "precautionary" },
          { label: "C", text: "Stop discussing it until trustworthy reporting catches up.", reflection: "Silence can prevent harm, but it can also feel frustrating when the public decision is close.", lens: "restraint" },
        ],
        counterpoint: "False media can contain a real worry. That is what makes it powerful: it lets people defend a bad method by pointing to a possible truth.",
      },
      {
        id: "your-side",
        kicker: "Act 3 - the mirror",
        title: "When the fake helps your side",
        storySections: [
          section("The situation", "The next morning, you learn the fake video is hurting a candidate you already dislike. A friend jokes, \"Good. Maybe this helps us win.\""),
          section("The pressure", "Correcting the fake might help someone you disagree with. Ignoring it might help your side."),
          section("The choice", "The principle is no longer abstract. You have to decide whether truth matters only when it protects people you like."),
        ],
        prompt: "What principle should guide you when misinformation helps your side?",
        options: [
          { label: "A", text: "Correct it anyway because fair elections need true evidence, not convenient fakes.", reflection: "Consistency is doing the heavy lifting here. You are choosing a rule that can be used against your own side.", lens: "consistency" },
          { label: "B", text: "Focus on the larger political outcome because the stakes are bigger than one fake clip.", reflection: "You are weighing consequences, but the danger is making truth conditional on usefulness.", lens: "utilitarian" },
          { label: "C", text: "Correct the fake and then argue your real reasons for opposing the candidate.", reflection: "This separates truth from persuasion. You can still take a side without relying on false evidence.", lens: "civic-integrity" },
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
