// Sentence stems — concrete entry phrases for students who need a way in.
// Categorized by the move the stem supports.

export const STEM_CATEGORIES = [
  { id: "entering", label: "Entering the conversation", color: "teal" },
  { id: "building", label: "Building on each other", color: "gold" },
  { id: "pushing-back", label: "Pushing back", color: "coral" },
  { id: "changing-mind", label: "Changing your mind", color: "ocean" },
  { id: "synthesizing", label: "Finding the shape of the question", color: "sand" },
  { id: "asking-help", label: "Asking for help", color: "sky" },
];

export const STEMS = [
  // Entering
  { id: "i-notice", category: "entering", text: "I notice that…", note: "Begins with observation, not judgment." },
  { id: "i-wonder", category: "entering", text: "I wonder if…", note: "Surfaces a half-formed thought without committing to it." },
  { id: "could-it-be", category: "entering", text: "Could it be that…", note: "Tentative; invites others to test the idea." },
  { id: "what-if-frame", category: "entering", text: "What if we asked it this way instead…", note: "Reframes the question without dismissing the previous version." },
  { id: "first-try", category: "entering", text: "Let me try this — I might be wrong…", note: "Permission for half-formed ideas. Models intellectual humility." },

  // Building on
  { id: "building-on", category: "building", text: "Building on what ___ said…", note: "Names the prior speaker. Threads the conversation." },
  { id: "want-to-add", category: "building", text: "I want to add to that…", note: "Aligns with a point and extends it." },
  { id: "another-way", category: "building", text: "Another way of seeing what ___ said is…", note: "Reframes a peer's idea. Tests whether you understood it." },
  { id: "connects-to", category: "building", text: "That connects to ___ because…", note: "Links across speakers or scenarios." },

  // Pushing back
  { id: "push-back", category: "pushing-back", text: "I'd like to push back on…", note: "Names disagreement directly. Always followed by a reason." },
  { id: "strongest-objection", category: "pushing-back", text: "The strongest objection to that is…", note: "Steelmans the opposing view. Useful even if you don't hold it." },
  { id: "what-about", category: "pushing-back", text: "But what about a case where…", note: "Counter-example. The classic Socratic move." },
  { id: "i-disagree-because", category: "pushing-back", text: "I disagree because…", note: "Direct, but pairs with a reason — never just \"I disagree.\"" },

  // Changing mind
  { id: "changing-mind", category: "changing-mind", text: "I'm changing my mind because…", note: "Names the move explicitly. Celebrates revision." },
  { id: "earlier-thought", category: "changing-mind", text: "Earlier I thought ___, but now I think ___", note: "Two-part stem that traces the change." },
  { id: "convinced-by", category: "changing-mind", text: "I'm convinced by what ___ said about…", note: "Credits the speaker who moved you." },
  { id: "still-unsure", category: "changing-mind", text: "I'm still unsure about…", note: "Names ongoing uncertainty without faking conclusion." },

  // Synthesizing
  { id: "really-asking", category: "synthesizing", text: "So what we're really asking is…", note: "Restates the underlying question. Useful when discussion drifts." },
  { id: "both-views-agree", category: "synthesizing", text: "Both views actually agree that…", note: "Surfaces hidden common ground." },
  { id: "real-disagreement", category: "synthesizing", text: "The real disagreement is about…", note: "Names where the views genuinely diverge." },
  { id: "shape-of-question", category: "synthesizing", text: "The shape of this question is…", note: "Steps back to look at the type of problem." },

  // Asking for help
  { id: "no-answer-but", category: "asking-help", text: "I don't have an answer, but…", note: "Permission for partial thinking. Models that you don't need a verdict to contribute." },
  { id: "help-think-through", category: "asking-help", text: "Could someone help me think through…", note: "Direct request. Names what you're stuck on." },
  { id: "what-am-i-missing", category: "asking-help", text: "What am I missing?", note: "Invites correction. Powerful from anyone, especially the teacher." },
  { id: "say-more", category: "asking-help", text: "Could you say more about…", note: "Asks for elaboration. Treats the speaker's idea as worth more time." },
];
