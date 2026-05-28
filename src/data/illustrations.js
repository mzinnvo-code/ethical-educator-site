const illustration = (slug, alt) => ({
  src: `/illustrations/${slug}.png`,
  alt,
});

export const EXPERIMENT_ILLUSTRATIONS = {
  "magic-toy": illustration("magic-toy", "A talking toy with a gentle electronic glow."),
  "invisible-ring": illustration("invisible-ring", "A glowing ring resting in mist on dark cloth."),
  "robot-friend-turn": illustration("robot-friend-turn", "A small classroom robot between two reaching hands."),
  "honesty-protection": illustration("honesty-protection", "A snapped pencil on a warmly lit desk."),
  "robot-pet-goodbye": illustration("robot-pet", "A small robot dog resting with its light dimmed."),
  "ai-art-help": illustration("ai-art", "A painting palette beside a softly glowing screen."),
  "messy-robot": illustration("messy-robot", "A cleaning robot beside a pile of classroom scraps."),
  "rules-vs-helping": illustration("rules-vs-helping", "A quiet classroom moment with a puzzle piece being offered."),
  "rude-toy": illustration("rude-toy", "A talking toy with a star inside a speech bubble."),
  "winning-game": illustration("winning-game", "A game controller with a restrained confetti burst."),
  "trolley-self-driving": illustration("trolley", "A stylized trolley at a track switch."),
  "ship-of-theseus-robot": illustration("ship-of-theseus", "A weathered ship beside replacement planks."),
  "brain-in-vat": illustration("brain-in-vat", "A glowing jar with abstract neural cables."),
  "sorites-heap": illustration("sorites", "A small heap of sand grains under warm light."),
  "tragedy-commons": illustration("commons", "A shared pasture with distant silhouettes under a moody sky."),
  "liar-paradox": illustration("liar", "A luminous looping strip suggesting self-reference."),
  "deepfake-election": illustration("deepfake", "Two similar masks, one dissolving into digital fragments."),
  "biased-resume-ai": illustration("biased-ai", "A stack of papers with one page selected by a glow."),
  "autonomous-car-rider": illustration("autonomous-car", "A rain-slicked road seen from inside a car."),
  "veil-of-ignorance": illustration("veil", "A translucent veil over an empty classroom chair."),
  "platos-cave": illustration("cave", "A cave mouth with warm light beyond."),
  "marys-room": illustration("marys-room", "A monochrome room opening into color."),
  "chinese-room": illustration("chinese-room", "A quiet room with symbols sliding under a door."),
  "experience-machine": illustration("experience-machine", "A reclining chair connected to glowing cables."),
  "ring-of-gyges": illustration("gyges", "A hand emerging from a stone cleft with a glowing ring."),
  "omelas": illustration("omelas", "A glowing city skyline with one dim cellar window."),
  "drowning-child": illustration("drowning-child", "A small shoe at the edge of a still pond."),
  "paperclip-maximizer": illustration("paperclip", "An expanse of paperclips stretching toward the horizon."),
  "ai-in-the-box": illustration("ai-in-box", "A simple wooden box glowing from within."),
  "simulation-argument": illustration("simulation", "Nested screens receding into one another."),
  "school-surveillance": illustration("surveillance", "A security camera beside empty classroom desks."),
  "ai-detector-false-positive": illustration("false-positive", "A warning symbol over a stack of student essays."),
  "ai-policy-design": illustration("ai-policy", "A traffic light beside a blank school policy document."),
  "ai-grading-companion": illustration("grading", "A red pen beside a softly glowing screen."),
  "biased-admissions": illustration("admissions", "A graduation cap beside an abstract sorting flowchart."),
  "ai-friend-feelings": illustration("ai-friend", "A glowing chat bubble beside an empty chair at a window."),
};

export const FEATURE_ILLUSTRATIONS = {
  "site-symbol": illustration("site-symbol", "The Examined Classroom visual symbol."),
  "home-hero": illustration("home-hero", "An ethical compass, open book, and AI nodes on a classroom board."),
  "classroom-crossroads": illustration("classroom-crossroads", "A classroom crossroads with discussion, practice, and research paths."),
  "reading-room": illustration("reading-room", "Books, policy papers, and a glowing compass on a reading table."),
  "dialogue-toolkit": illustration("dialogue-toolkit", "A dialogue circle arranged around a warm lantern."),
  "research-foundations": illustration("research-foundations", "Books, circuit motifs, and a compass of inquiry."),
  "educator-resources": illustration("educator-resources", "An educator planning table with books and notes."),
  "ai-in-education": illustration("ai-in-education", "A teacher desk with an AI node constellation emerging from a laptop."),
  "thought-experiments": illustration("classroom-crossroads", "A classroom crossroads for ethical inquiry."),
  "for-educators": illustration("educator-resources", "A practical educator planning table."),
  "ai-education": illustration("ai-in-education", "A classroom AI learning scene."),
  "ai-ethics-lesson-plans": illustration("dialogue-toolkit", "A dialogue circle arranged around a warm lantern for AI ethics lesson planning."),
  "phil-education": illustration("cave", "A cave mouth opening toward philosophical inquiry."),
  "ai-ethics": illustration("ai-policy", "A policy traffic light for AI decisions."),
  "ai-consciousness": illustration("marys-room", "A monochrome room opening into color for questions about consciousness."),
  "moral-psych": illustration("research-foundations", "Research foundations for moral psychology."),
  "resources": illustration("reading-room", "A reading table with books and research materials."),
  "the-shortcut": illustration("the-shortcut", "Glowing stepping stones leading toward mastery."),
  "ai-authorship": illustration("ai-authorship", "Four workspaces around one glowing essay page."),
  "reluctant-educator": illustration("reluctant-educator", "Classroom data dissolving into questions."),
  "digital-doppelganger": illustration("digital-doppelganger", "A glowing digital silhouette reflected in an empty desk screen."),
  "thought-experiments/educators": illustration("educator-dialogue", "Educator scenario cards arranged around a lantern for professional dialogue."),
  "thought-experiments/k-5": illustration("magic-toy", "A talking classroom toy with a gentle glow."),
  "thought-experiments/6-8": illustration("trolley", "A stylized trolley at a forked track."),
  "thought-experiments/9-12": illustration("cave", "A cave mouth with warm light beyond."),
  "thought-experiments/toolkit": illustration("dialogue-toolkit", "A dialogue circle arranged around a warm lantern."),
  "thought-experiments/journal": illustration("decision-journal", "A private decision journal open beside a lantern, pen, sealed note, and lock."),
};

export function getExperimentIllustration(experimentOrId) {
  const id = typeof experimentOrId === "string" ? experimentOrId : experimentOrId?.id;
  return EXPERIMENT_ILLUSTRATIONS[id] || null;
}

export function getFeatureIllustration(key) {
  return FEATURE_ILLUSTRATIONS[key] || null;
}
