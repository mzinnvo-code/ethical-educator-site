const imageFor = (comicId, panelIndex, alt) => ({
  src: `/experiment-scenes/intro-comics/${comicId}/panel-${String(panelIndex + 1).padStart(2, "0")}.webp`,
  alt,
});

const launcherFor = (comicId, alt) => ({
  src: `/experiment-scenes/intro-comics/${comicId}/launcher.webp`,
  alt,
});

const makeComic = ({ key, id, ageStage, accent, heading, dek, launcherAlt, panels }) => {
  const normalizedPanels = panels.map((panel, index) => ({
    ...panel,
    image: imageFor(id, index, panel.alt),
  }));

  return {
    key,
    id,
    ageStage,
    accent,
    heading,
    dek,
    launcherImage: launcherFor(id, launcherAlt),
    readAloudText: [
      heading,
      dek,
      ...normalizedPanels.flatMap((panel) => [panel.caption, `Ari says: ${panel.line}`]),
    ].join(" "),
    panels: normalizedPanels,
  };
};

export const INTRO_COMICS = [
  makeComic({
    key: "thought-experiments",
    id: "thought-experiments",
    ageStage: "timeline",
    accent: "teal",
    heading: "Meet Ari, your guide to what-if thinking",
    dek: "Ari grows with the library: younger students get playful imagination practice, older students get braver tools for harder questions.",
    launcherAlt: "Ari at several ages points out of the illustration toward the intro comic start button.",
    panels: [
      {
        caption: "The doorway",
        line: "Every thought experiment starts with two tiny words: what if?",
        alt: "Ari at several ages opens a glowing classroom doorway filled with question marks and branching paths.",
      },
      {
        caption: "No lab coat required",
        line: "Sometimes we test ideas with bottles and goggles. Sometimes the whole lab is your imagination.",
        alt: "Young Ari looks from a lab table to a bright thought bubble above a notebook.",
      },
      {
        caption: "Choose the path",
        line: "These stories are a little like choose-your-own-adventure problems for your brain.",
        alt: "Ari points toward three glowing paths that branch through a classroom floor.",
      },
      {
        caption: "Safe to wonder",
        line: "You may meet tricky questions here, but the goal is not to win. The goal is to think better.",
        alt: "Older Ari sits with students in a calm discussion circle under warm lights.",
      },
      {
        caption: "Start anywhere",
        line: "Welcome in: choose the path that fits you, start exploring, and let each what-if sharpen your thinking.",
        alt: "Ari gestures toward elementary, middle school, and high school paths on a glowing map.",
      },
    ],
  }),
  makeComic({
    key: "thought-experiments/k-5",
    id: "k-5-hub",
    ageStage: "young",
    accent: "coral",
    heading: "Ari loves experiments. Even the messy ones.",
    dek: "The elementary library begins by turning science-experiment curiosity into imagination experiments students can discuss together.",
    launcherAlt: "Young Ari in safety goggles points out of the illustration toward the intro comic start button.",
    panels: [
      {
        caption: "Question first",
        line: "Have you ever heard of an experiment?",
        alt: "Young Ari holds up a magnifying glass beside a tidy classroom science table.",
      },
      {
        caption: "Ari's favorite word",
        line: "I love experiments. You ask a question, try something, and see what happens.",
        alt: "Ari grins while lining up safe classroom science supplies on a table.",
      },
      {
        caption: "The volcano incident",
        line: "Sometimes what happens is foam on the ceiling. That is data. Sticky data.",
        alt: "A friendly classroom volcano bubbles over while Ari laughs in safety goggles.",
      },
      {
        caption: "The glitter incident",
        line: "And sometimes the class discovers that glitter can travel farther than anyone predicted.",
        alt: "Ari stands in a sparkle-filled classroom after a playful craft experiment goes everywhere.",
      },
      {
        caption: "A quieter kind",
        line: "But not all experiments make a mess or need equipment.",
        alt: "Ari closes the supply box while a soft glowing thought bubble appears overhead.",
      },
      {
        caption: "Mind laboratory",
        line: "Welcome to your mind laboratory. Start exploring a story, choose a path, and see what your reasons can do.",
        alt: "Ari steps into a glowing imagination path with story cards floating nearby.",
      },
    ],
  }),
  makeComic({
    key: "thought-experiments/kindergarten",
    id: "kindergarten",
    ageStage: "early",
    accent: "coral",
    heading: "Try a tiny what-if",
    dek: "Kindergarten comics keep the question concrete: pretend, notice feelings, and give one reason.",
    launcherAlt: "Kindergarten Ari points out of the illustration toward the intro comic start button.",
    panels: [
      {
        caption: "Pretend mode",
        line: "What if a toy could feel sad? We can pretend for a minute and see what we think.",
        alt: "Early Ari sits on a classroom rug with a gentle toy and a glowing pretend bubble.",
      },
      {
        caption: "One big feeling",
        line: "If the toy feels sad in our story, what kind thing could we try first?",
        alt: "Ari offers a small block to a toy while classmates watch with curious faces.",
      },
      {
        caption: "No rushing",
        line: "You do not have to know right away. Point, draw, whisper, or think quietly.",
        alt: "Ari pauses with crayons, a quiet hand signal, and a soft notebook on the rug.",
      },
      {
        caption: "One reason",
        line: "Then we add one because. Because it might help. Because it feels fair.",
        alt: "Ari holds up one finger while a simple choice path glows on the classroom floor.",
      },
      {
        caption: "Thought experiment",
        line: "Now you are ready to try one tiny thought experiment. Welcome in: pick a story and share your idea.",
        alt: "Ari smiles as a small thought bubble grows into a warm classroom lantern.",
      },
    ],
  }),
  makeComic({
    key: "thought-experiments/grade-1",
    id: "grade-1",
    ageStage: "early-elementary",
    accent: "gold",
    heading: "What kind of person am I becoming?",
    dek: "Grade 1 uses familiar classroom moments to practice honesty, fairness, and invisible choices.",
    launcherAlt: "Early elementary Ari points out of the illustration toward the intro comic start button.",
    panels: [
      {
        caption: "Nobody saw",
        line: "What if nobody sees what happened? Your brain still gets to ask, what should I do?",
        alt: "Ari notices a broken pencil on a desk while the classroom looks away.",
      },
      {
        caption: "Two pulls",
        line: "Sometimes one choice protects a friend, and another choice tells the truth.",
        alt: "Ari stands between a worried friend and a glowing truth path on the floor.",
      },
      {
        caption: "Pause button",
        line: "A thought experiment lets us press pause before we decide.",
        alt: "Ari holds a notebook as the classroom scene gently pauses around a branching path.",
      },
      {
        caption: "Try both reasons",
        line: "We can give the best reason for one side, then try the best reason for the other.",
        alt: "Ari weighs two warm glowing idea cards in both hands.",
      },
      {
        caption: "Becoming kinder",
        line: "Welcome to the stories. Start with one choice, give one kind reason, and notice who you are becoming.",
        alt: "Ari looks at a classroom mirror that reflects a slightly older, thoughtful version of Ari.",
      },
    ],
  }),
  makeComic({
    key: "thought-experiments/grade-2",
    id: "grade-2",
    ageStage: "elementary",
    accent: "teal",
    heading: "Helpful tools, honest choices",
    dek: "Grade 2 adds cause and effect: tools can help, but students still ask what happens next.",
    launcherAlt: "Elementary Ari points out of the illustration toward the intro comic start button.",
    panels: [
      {
        caption: "Helpful machine",
        line: "What if a tool gives you a shortcut? First we ask, what is it helping with?",
        alt: "Ari studies a friendly classroom device offering a glowing shortcut card.",
      },
      {
        caption: "Then what?",
        line: "Then we ask, what could happen next to me, my friend, or the class?",
        alt: "Ari follows a simple cause-and-effect trail across a classroom table.",
      },
      {
        caption: "Friendship check",
        line: "A choice can feel helpful and still need honesty.",
        alt: "Ari and a classmate look at two choice cards beside a small robot.",
      },
      {
        caption: "Rule check",
        line: "A rule can be useful and still need a human brain paying attention.",
        alt: "Ari looks from a posted classroom rule to a friend who needs help.",
      },
      {
        caption: "Mind experiment",
        line: "Welcome to the next stories. Try a choice, follow what happens, and see how helpful thinking can be.",
        alt: "Ari maps a glowing path of consequences in a notebook.",
      },
    ],
  }),
  makeComic({
    key: "thought-experiments/grade-3",
    id: "grade-3",
    ageStage: "older-elementary",
    accent: "ocean",
    heading: "Follow the choice past the first answer",
    dek: "Grade 3 students are ready for stories about authorship, privacy, trust, and consequences.",
    launcherAlt: "Older elementary Ari points out of the illustration toward the intro comic start button.",
    panels: [
      {
        caption: "First answer",
        line: "The first answer is a starting line, not the finish.",
        alt: "Ari writes a first idea in a notebook while a glowing path continues beyond it.",
      },
      {
        caption: "Whose work?",
        line: "If a tool helps write the story, what part still belongs to the student?",
        alt: "Ari compares handwritten story notes with a glowing screen, with no text visible.",
      },
      {
        caption: "Privacy question",
        line: "If a picture or a secret enters the story, who gets a say?",
        alt: "Ari gently shields a photo card while considering a sharing path.",
      },
      {
        caption: "Trust map",
        line: "We follow trust forward: who is helped, who is surprised, and who might be left out?",
        alt: "Ari traces a warm map connecting classmates, tools, and choice points.",
      },
      {
        caption: "Better thinking",
        line: "Welcome in. Start exploring, follow the consequences, and let your answer grow when the story changes.",
        alt: "Ari moves a glowing choice marker after noticing a new detail in the scene.",
      },
    ],
  }),
  makeComic({
    key: "thought-experiments/grade-4",
    id: "grade-4",
    ageStage: "older-elementary",
    accent: "sky",
    heading: "Change one detail and test your thinking",
    dek: "Grade 4 leans into evidence, rules, source-checking, and hard tradeoffs.",
    launcherAlt: "Older elementary Ari points out of the illustration toward the intro comic start button.",
    panels: [
      {
        caption: "Confident answer",
        line: "A confident answer is not always a true answer.",
        alt: "Ari studies two glowing answer cards that point in different directions.",
      },
      {
        caption: "Evidence hunt",
        line: "So we ask, what evidence would help us know?",
        alt: "Ari uses a magnifying glass over source cards and classroom science supplies.",
      },
      {
        caption: "Rule test",
        line: "A rule sounds simple until a real person needs something the rule forgot.",
        alt: "Ari stands near a hallway sign and a friend who needs help.",
      },
      {
        caption: "One detail changes",
        line: "Thought experiments let us change one detail and see if our reason still works.",
        alt: "Ari adjusts one glowing gear in a story machine while the rest stays steady.",
      },
      {
        caption: "Tradeoff muscles",
        line: "Welcome to the challenge. Try a story, test your evidence, and see whether your reason still works.",
        alt: "Ari lifts two balanced idea cards like small weights in a warm classroom.",
      },
    ],
  }),
  makeComic({
    key: "thought-experiments/grade-5",
    id: "grade-5",
    ageStage: "pre-middle",
    accent: "teal",
    heading: "Reasons matter more than perfect answers",
    dek: "Grade 5 prepares students for AI friendship, homework help, bias, grading mistakes, and human judgment.",
    launcherAlt: "Pre-middle-school Ari points out of the illustration toward the intro comic start button.",
    panels: [
      {
        caption: "Almost middle school",
        line: "Some questions are too big for a quick yes or no.",
        alt: "Older elementary Ari stands at a doorway between elementary and middle school symbols.",
      },
      {
        caption: "AI friend",
        line: "If an AI always agrees with you, is that kindness, friendship, or something else?",
        alt: "Ari sits beside a glowing chat companion while a real classmate waits nearby.",
      },
      {
        caption: "Homework help",
        line: "If help makes the answer easy, did it also help the learning?",
        alt: "Ari looks from a homework page to a glowing hint, with a thinking path between them.",
      },
      {
        caption: "Fairness alert",
        line: "If a system treats people unfairly, we ask who notices and who gets to fix it.",
        alt: "Ari and classmates inspect a classroom robot that spotlights some seats more than others.",
      },
      {
        caption: "Give reasons",
        line: "Welcome to the next level. Start exploring a case, bring reasons, listen hard, and keep thinking.",
        alt: "Ari joins a discussion circle with several glowing reason cards on the floor.",
      },
    ],
  }),
  makeComic({
    key: "thought-experiments/6-8",
    id: "grades-6-8",
    ageStage: "middle",
    accent: "gold",
    heading: "Harder questions can still be safe questions",
    dek: "Middle school comics prepare students for identity, fairness, reality, AI, and counterarguments.",
    launcherAlt: "Middle-school Ari points out of the illustration toward the intro comic start button.",
    panels: [
      {
        caption: "New level",
        line: "The questions get harder here, because your thinking is getting stronger.",
        alt: "Middle-school Ari steps onto a brighter level of a branching classroom path.",
      },
      {
        caption: "Identity puzzle",
        line: "You might ask what makes you you when memories, bodies, or digital copies change.",
        alt: "Ari looks at a mirror with layered reflections and a small robot silhouette.",
      },
      {
        caption: "Fairness test",
        line: "You might notice that a rule can look neutral and still land unfairly.",
        alt: "Ari studies a balanced scale with classmates standing on uneven floor tiles.",
      },
      {
        caption: "Reality check",
        line: "You might wonder how you know what is real when a screen can fool almost anyone.",
        alt: "Ari reaches toward a glowing classroom window that may be a simulation.",
      },
      {
        caption: "Counterargument",
        line: "The twist: the strongest answer can explain the strongest objection.",
        alt: "Ari trades idea cards with another student across a discussion table.",
      },
      {
        caption: "Adventure mode",
        line: "Welcome to the adventure. Choose a case, start exploring, and notice what your reasons are made of.",
        alt: "Ari and classmates follow branching gold paths through a thoughtful classroom scene.",
      },
    ],
  }),
  makeComic({
    key: "thought-experiments/9-12",
    id: "grades-9-12",
    ageStage: "high",
    accent: "ocean",
    heading: "Welcome to the canon, remixed for now",
    dek: "High school comics frame difficult philosophical ideas as safe, serious practice for better reasoning.",
    launcherAlt: "High-school Ari points out of the illustration toward the intro comic start button.",
    panels: [
      {
        caption: "Old questions",
        line: "Some of these puzzles are ancient. That is not a warning; it is an invitation.",
        alt: "High-school Ari walks between a cave doorway, a colorless room, and a modern classroom screen.",
      },
      {
        caption: "New pressure",
        line: "AI gives the old questions new pressure: minds, authorship, fairness, reality, and power.",
        alt: "Ari studies a modern AI policy board beside classic philosophy symbols.",
      },
      {
        caption: "Difficult ideas",
        line: "You may think about things you have not had to consider before.",
        alt: "Ari pauses in a calm library scene with deep question paths opening ahead.",
      },
      {
        caption: "Safe exploration",
        line: "That is why we treat the room carefully: challenge ideas, not people.",
        alt: "Ari facilitates a respectful discussion circle with warm light and open notebooks.",
      },
      {
        caption: "Not winning",
        line: "The goal is not to win the argument. The goal is to make your thinking more honest.",
        alt: "Ari sets a trophy aside and opens a notebook filled with glowing idea paths.",
      },
      {
        caption: "Your move",
        line: "Welcome in: choose a case, follow the consequences, and let a better question find you.",
        alt: "Ari points toward a branching path through Plato, AI, justice, and knowledge symbols.",
      },
    ],
  }),
];

export function getIntroComic(key) {
  return INTRO_COMICS.find((comic) => comic.key === key) || null;
}
