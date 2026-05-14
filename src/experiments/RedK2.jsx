import { useState, useEffect, useRef } from "react";
import { C } from "../theme.js";
import { useAudio } from "../components/shared.jsx";
import { audioBus } from "../lib/audioBus.js";
import { Shell, StageHeader, DiscussionGuide, RestartBtn, PathReveal } from "./ExperimentShared.jsx";
import { SceneSpeaker, SceneAction, SceneBeat, SceneChoices } from "./SceneShared.jsx";

// "Explaining Red" — K-2 version.
// A new student named Ada has joined the class. She was born without sight.
// Today the class is learning about colors. The user is a classmate. The scene
// is built from named-speaker beats and two choice points; the closing
// reflection echoes back what the user chose.

const FIRST_TRY_REPLIES = {
  "stop-sign": {
    ada: "I know stop signs! Grown-ups always say to look both ways. So red means stop. Is red... is red ever for something else?",
    noor: "Red is for stop, but red is also for love hearts on Valentine's Day. And for strawberries.",
  },
  "warm-fire": {
    ada: "Warm I know. Warm is like the sun on my hands at recess. Is red always warm?",
    noor: "Red isn't always warm. A popsicle is red and it's cold! But you're right, fire is red, and fire is warm.",
  },
  "loud-bell": {
    ada: "Loud like the bell? That's funny. I never thought a color could be loud. Is red a louder color than blue?",
    noor: "I think red is loud. Like when you shout. And blue feels quiet, like the inside of the library.",
  },
  "touch-sweater": {
    ada: "If I touch your sweater, will I feel red? Or will I feel soft?",
    noor: "You'll feel soft, I think. The red is what your eyes would see. But maybe we can find other ways red can come into the room.",
  },
};

const RESOLUTION_FRAGMENTS = {
  firstTry: {
    "stop-sign": "You started with something Ada already knew — stop signs. You gave her a place to put the word.",
    "warm-fire": "You started with warmth. Fire, summer sun. You gave Ada a feeling that lives in her hands and on her face.",
    "loud-bell": "You started with loudness. Red, you said, is loud. Ada laughed. She had never thought a color could be loud, and now she can.",
    "touch-sweater": "You started with touch. You offered her something she could hold. Red was not in the wool, but the trying was a kindness.",
  },
  together: {
    "words": "And the class decided: words can carry colors for people who do not see them. Red would have a hundred small descriptions in Ada's class — warm, loud, like-a-strawberry, like-a-stop-sign — and slowly, slowly, the word would become a place she could live in too.",
    "sounds": "And the class decided: we will use sounds and music. Red will be the rolling drum, blue will be the long flute note, yellow will be the chime. Ada said this was the best idea she had heard in a school in a long time.",
    "stories": "And the class decided: we will tell stories where red things show up — and Ada will write some too. Stories made room for everyone, because a story does not need eyes to be true.",
  },
};

export default function ExplainingRedK2() {
  const [stage, setStage] = useState(0);
  const [choices, setChoices] = useState({});
  const [anim, setAnim] = useState(false);
  const audio = useAudio();
  const topRef = useRef(null);

  const scrollToTop = () => {
    requestAnimationFrame(() => {
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const choose = (key, value) => {
    audioBus.stop();
    audio.playChime();
    setAnim(true);
    setChoices((prev) => ({ ...prev, [key]: value }));
    setTimeout(() => {
      setStage((s) => s + 1);
      setAnim(false);
      scrollToTop();
    }, 400);
  };

  useEffect(() => () => { audio.stopAll(); audioBus.stop(); }, [audio]);

  const stages = [
    // ── INTRO ─────────────────────────────────────────────────────────
    () => (
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <h3 style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          color: C.textPrimary, fontSize: "1.55rem", marginBottom: 12,
        }}>Explaining Red</h3>
        <p style={{
          color: C.textSecondary,
          fontSize: "0.96rem",
          lineHeight: 1.75,
          maxWidth: 520, margin: "0 auto 22px",
        }}>
          A new student named Ada is starting school today. Ada was born without sight.
          Today your class is learning about colors. Your teacher needs your help.
        </p>
        <button onClick={() => { audioBus.stop(); audio.playDeep(); setStage(1); scrollToTop(); }} style={{
          padding: "14px 32px",
          background: `linear-gradient(135deg, ${C.coral}, ${C.gold})`,
          border: "none", borderRadius: 8, color: "#fff",
          cursor: "pointer", fontWeight: 600, fontSize: "0.94rem",
          boxShadow: `0 4px 20px rgba(192,112,64,0.25)`,
        }}>Begin the story</button>
      </div>
    ),

    // ── BEAT 1: WELCOME ───────────────────────────────────────────────
    () => (
      <div>
        <StageHeader num="1" title="A new student arrives" color={C.coral} />
        <SceneBeat color={C.teal}>
          <SceneSpeaker id="narrator" line="The bell rings. A new girl is standing by the door, holding a white cane. Ms. Park, your teacher, smiles." />
          <SceneSpeaker id="teacher" line="Class, this is Ada. Ada is joining our room this year. Today we are talking about colors. Ada was born without sight, so this might be a tricky day. I want us to help each other." />
          <SceneSpeaker id="ada" line="Hi everyone. I know lots about colors from stories. But I have never seen one. I'd love your help today." />
          <SceneSpeaker id="teacher" line="Let's try to share what red is like. Who wants to start?" />
        </SceneBeat>
        <p style={{
          color: C.gold,
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: "1.02rem",
          margin: "10px 0 12px",
          textAlign: "center",
        }}>What do you say first?</p>
        <SceneChoices>
          <SceneAction onClick={() => choose("firstTry", "stop-sign")} color={C.coral}>Red is the color of a stop sign.</SceneAction>
          <SceneAction onClick={() => choose("firstTry", "warm-fire")} color={C.coral}>Red is warm, like a fire or the summer sun.</SceneAction>
          <SceneAction onClick={() => choose("firstTry", "loud-bell")} color={C.coral}>Red is loud, like a shout or a bell.</SceneAction>
          <SceneAction onClick={() => choose("firstTry", "touch-sweater")} color={C.coral}>I have a red sweater — you can touch it tomorrow.</SceneAction>
        </SceneChoices>
      </div>
    ),

    // ── BEAT 2: ADA RESPONDS ──────────────────────────────────────────
    () => {
      const reply = FIRST_TRY_REPLIES[choices.firstTry] || FIRST_TRY_REPLIES["stop-sign"];
      return (
        <div>
          <StageHeader num="2" title="Ada thinks about it" color={C.gold} />
          <SceneBeat color={C.coral}>
            <SceneSpeaker id="ada" line={reply.ada} />
            <SceneSpeaker id="noor" line={reply.noor} />
            <SceneSpeaker id="teacher" line="Look at all of you. You are making a kind of map for Ada — a map made out of words and feelings. Let's keep going." />
          </SceneBeat>
          <p style={{
            color: C.gold,
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: "1.02rem",
            margin: "10px 0 12px",
            textAlign: "center",
          }}>How should the class keep helping Ada all year?</p>
          <SceneChoices>
            <SceneAction onClick={() => choose("together", "words")} color={C.gold}>We can use lots of words for what colors feel like to us.</SceneAction>
            <SceneAction onClick={() => choose("together", "sounds")} color={C.gold}>We can use sounds and music to show different colors.</SceneAction>
            <SceneAction onClick={() => choose("together", "stories")} color={C.gold}>We can tell stories where the colors show up — and Ada can write some too.</SceneAction>
          </SceneChoices>
        </div>
      );
    },

    // ── BEAT 3: REFLECTION ────────────────────────────────────────────
    () => (
      <div>
        <StageHeader num="✦" title="What the class learned today" color={C.teal} gradient />
        <PathReveal
          color={C.coral}
          eyebrow="The story you helped tell"
          paragraphs={[
            RESOLUTION_FRAGMENTS.firstTry[choices.firstTry],
            RESOLUTION_FRAGMENTS.together[choices.together],
            "At the end of the day, Ada packed her bag with a small smile. She said the word red felt different now — not finished, but bigger. A word with many doors.",
          ]}
        />
        <SceneBeat color={C.teal} title="The big idea">
          <SceneSpeaker id="narrator" line="Some things are easy to share. You can pass a pencil. You can pass a book. But some things — like what red looks like — live inside the body that sees them. To share those things, we use words, sounds, stories, and a lot of patience. We can get very close, even when we cannot get all the way there." />
        </SceneBeat>
        <DiscussionGuide color={C.gold} questions={[
          "What do we share with words, and what do we share with our bodies? Can you think of something you have only ever shared with someone by showing them?",
          "If a friend has never tasted chocolate, how would you tell them what it is like? What words would you use?",
          "What is something you know how to do, but find very hard to explain to someone else?",
        ]} />
        <RestartBtn onClick={() => { audioBus.stop(); setStage(0); setChoices({}); scrollToTop(); }} />
      </div>
    ),
  ];

  return (
    <div ref={topRef} style={{ scrollMarginTop: 80 }}>
      <Shell animating={anim} color={C.coral}>{stages[stage]()}</Shell>
    </div>
  );
}
