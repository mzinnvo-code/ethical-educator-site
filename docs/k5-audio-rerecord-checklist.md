# K–5 Audio Re-record Checklist

Companion to `src/data/k5AudioManifest.json` (auto-managed by `scripts/generate-k5-audio.mjs` — do not hand-edit). This document is the human-readable diff of narrated-line changes from the 2026-05-14 prose pass. The **authoritative** re-record list comes from running:

```bash
npm run audio:generate -- --dry-run
```

That command compares the current scenario copy against cached audio hashes and emits the exact set of chunks that need regeneration. The tables below are a writer's-eye record of what changed and why, not a substitute for the dry-run.

## What counts as a "narrated line"

Per `scripts/generate-k5-audio.mjs` (`enumerateChunks`, lines 242–303), each scenario produces these audio chunks:

| Slot | Source |
|------|--------|
| `stage-{stageId}-prompt` | bundles `stage.title` + `storySections` (joined) + `stage.prompt` into one audio chunk |
| `stage-{stageId}-option-{A\|B\|C}` | `option.text` |
| `stage-{stageId}-option-{A\|B\|C}-reflection` | `option.reflection` |
| `lab-wonder` | `studentLab.wonder` |
| `lab-bigidea` | `studentLab.bigIdea` |
| `lab-trythis` | `studentLab.tryThis` |
| `lab-spottheslip` | `studentLab.spotTheSlip` |

NOT narrated (so changes do NOT require re-record): `tagline`, `promptShort`, `counterpoint`, `studentLab.related`, `reference.*`, `furtherReading[]`, the `reflection(...)` synthesis stage's `positions[].view`.

## Reading the tables

Each scenario's table lists only **slots whose narrated text changed** in this pass. Slots not listed in a scenario's table are unchanged and do not need re-recording. The `stage-{id}-prompt` slot is a bundle — if you change the stage title, any storySection text, or the prompt text, the whole bundle must re-record.

---

## Grade K

### magic-toy

| Slot | Before | After |
|------|--------|-------|
| `stage-follow-option-A-reflection` | Goodbyes can matter even when the other thing may not understand them. | Goodbyes can matter even when the toy may not understand them. |
| `stage-follow-option-B-reflection` | Fixing the problem can be one way to care for what matters to you. | Fixing what is broken can be a way to care. |
| `stage-follow-option-C-reflection` | Sometimes clear thinking helps feelings become less scary. | Sometimes clear thinking helps a big feeling get smaller. |
| `lab-wonder` | Can a toy be sad? What would it take for you to know — for sure? | Can a toy really feel sad? How would you know for sure? |
| `lab-bigidea` | Wondering whether a thing really feels something is a kind of question philosophers call the *mind question*. | When you ask if a toy can really feel, you are thinking like a philosopher. |

Unchanged slots: stage-setup-prompt, stage-setup-option-A/B/C, stage-setup-option-A/B/C-reflection, stage-follow-prompt, stage-follow-option-A/B/C.

### robot-friend-turn

| Slot | Before | After |
|------|--------|-------|
| `stage-setup-option-A-reflection` | Equal time is one simple fairness rule. It helps both friends know what to expect. | Equal time is one simple fair rule. Both friends know what to expect. |
| `stage-setup-option-B-reflection` | Sometimes fairness listens to friendship and generosity, not only the clock. | Sometimes being fair means letting a friend go first. |
| `stage-setup-option-C-reflection` | You changed the problem from mine-or-yours into ours. | You changed the problem from mine and yours into ours. |
| `stage-week-option-A-reflection` | A schedule turns fairness into something the whole class can see and follow. | A schedule helps the whole class see what is fair. |
| `stage-week-option-B-reflection` | Need can matter, but the class has to decide how to know when need is real. | Need can matter. But the class still has to agree on what counts as need. |
| `stage-week-option-C-reflection` | Shared tools can teach cooperation when the rule invites cooperation. | When friends share a tool, they can learn to work together. |
| `lab-wonder` | What is the fairest way you have ever shared something with a friend? | What is one fair way you have shared something with a friend? |
| `lab-bigidea` | When many people want one thing, philosophers ask about *fairness* — and there is more than one good answer. | When friends want the same thing, there is more than one fair answer. |

Unchanged slots: stage-setup-prompt, stage-setup-option-A/B/C, stage-week-prompt, stage-week-option-A/B/C.

### messy-robot

| Slot | Before | After |
|------|--------|-------|
| `stage-setup-prompt` (title + prompt bundle; only prompt changed) | The glitter spill. Nico smiles at the cleaning robot and shakes glitter onto the floor. "It can clean," he says. What do you do? | The glitter spill. Nico shakes glitter onto the floor. He smiles at the cleaning robot. "It can clean," he says. What do you do? |
| `stage-setup-option-A-reflection` | Tools can help us, but that does not make extra work kind or fair. | A tool can help. But making more mess is not kind. |
| `stage-setup-option-B-reflection` | You are treating the robot as a helper, not an excuse. | You see the robot as a helper, not an excuse to make a mess. |
| `stage-setup-option-C-reflection` | Curiosity matters, but curiosity still needs care for the classroom. | It is good to be curious. Still, the room needs care. |
| `stage-breaks-option-A-reflection` | Repair is part of responsibility. It says, "I helped cause this, so I help fix it." | Fixing what we break is part of caring. It says, "I helped make this. I help fix it." |
| `stage-breaks-option-B-reflection` | Responsibility can be shared, but the person who chose the mess has a special job. | Helping can be shared. But the person who chose the mess has a bigger job. |
| `stage-breaks-option-C-reflection` | Getting help can protect people and tools from more harm. | Asking an adult can keep people and the robot safe. |
| `lab-wonder` | If a robot can clean it, who should be careful in the first place? | If a robot can clean a mess, who should still be careful? |
| `lab-bigidea` | When a tool helps with a job, philosophers ask who is still *responsible* for the choices behind it. | Even when a tool helps us, we are still the ones who choose. |

Unchanged slots: stage-setup-option-A/B/C, stage-breaks-prompt, stage-breaks-option-A/B/C.

### robot-pet-goodbye

| Slot | Before | After |
|------|--------|-------|
| `stage-setup-prompt` (title + prompt bundle; only prompt changed) | The quiet robot dog. The class robot dog does not wag or beep today. Some kids feel sad. Some shrug. What do you think? | The quiet robot dog. The class robot dog does not wag today. It does not beep. Some kids feel sad. Some shrug. What do you think? |
| `stage-setup-option-A-reflection` | The sadness is real even if the robot dog's feelings are not. | The sad feeling is real. The robot dog's feelings may not be. |
| `stage-setup-option-B-reflection` | You are noticing an important difference between living things and machines. | You see a real difference between living things and machines. |
| `stage-setup-option-C-reflection` | Rituals can help people honor what mattered to them. | Saying thank you can help us remember what mattered to us. |
| `stage-repair-prompt` (title + prompt bundle; only prompt changed) | The repaired dog. Next week the robot dog comes back with new parts and the same name. Is it the same class pet? | The repaired dog. Next week the robot dog comes back. It has new parts and the same name. Is it the same class pet? |
| `stage-repair-option-A-reflection` | Sameness can come from a shared story, not only from parts. | What stays the same can come from a story, not just from parts. |
| `stage-repair-option-B-reflection` | Parts matter too. You are using a material test for identity. | Parts matter too. You think the same parts make it the same toy. |
| `stage-repair-option-C-reflection` | Some hard questions do not fit neatly into yes or no. | Some hard questions do not have just one answer. |
| `lab-wonder` | When something we love stops, what stays with us? | When something we love stops working, what stays with us? |
| `lab-bigidea` | Philosophers ask what makes a thing the same one over time — and what we miss when it stops. | Big thinkers ask what stays the same as a thing changes — and what we miss when it stops. |

Unchanged slots: stage-setup-option-A/B/C, stage-repair-option-A/B/C.

## Grade 1

### invisible-ring

| Slot | Before | After |
|------|--------|-------|
| `stage-setup-option-A-reflection` | The ring shows a temptation: if no one catches you, does wrong become okay? | The ring is a test. If no one catches you, does wrong feel okay? |
| `stage-setup-option-B-reflection` | Quiet kindness asks for no applause. That is one sign of character. | Quiet kindness is real, even when no one claps. That shows who you are. |
| `stage-setup-option-C-reflection` | Some powers feel unsafe because they make bad choices too easy. | Some powers feel unsafe because they make wrong choices too easy. |
| `stage-mirror-prompt` (title + prompt bundle; only prompt changed) | The mirror after. When you take the ring off, you see yourself in the mirror. What kind of person looks back? | The mirror after. You take the ring off. You see yourself in the mirror. What kind of person looks back? |
| `stage-mirror-option-A-reflection` | Pride feels different when it comes from doing right without being watched. | Pride feels different when you do right and no one is watching. |
| `stage-mirror-option-B-reflection` | Noticing a mistake can be the beginning of becoming better. | Noticing a mistake is how you start getting better. |
| `stage-mirror-option-C-reflection` | The ring did not create your choice. It revealed how power changes choices. | The ring did not make your choice. It showed how power can change choices. |
| `lab-wonder` | If you could turn invisible, what is one rule you would still want to keep? | If you could turn invisible, what rule would you still keep? |
| `lab-bigidea` | Plato told this story to ask whether being good only counts when other people are watching. | Plato asked a big question: does being good count even when no one sees? |

Unchanged slots: stage-setup-prompt, stage-setup-option-A/B/C, stage-mirror-option-A/B/C, lab-trythis.

### honesty-protection

| Slot | Before | After |
|------|--------|-------|
| `stage-setup-option-A-reflection` | Honesty protects trust, even when it makes a friend upset for a while. | Honesty keeps trust, even if a friend feels upset for a while. |
| `stage-setup-option-B-reflection` | You are not abandoning your friend. You are helping her be brave. | You are not leaving your friend alone. You are helping her be brave. |
| `stage-setup-option-C-reflection` | Loyalty can feel kind, but secrets can grow heavier over time. | Keeping a secret can feel kind. But secrets can get harder to carry. |
| `stage-pattern-option-A-reflection` | Real loyalty can include helping someone face consequences. | Being a real friend can mean helping each other do the hard right thing. |
| `stage-pattern-option-B-reflection` | Context matters. Fear can change what kind of help a friend needs. | What is happening matters. Fear can change what a friend needs. |
| `stage-pattern-option-C-reflection` | That protects Lena today, but it may not protect her character tomorrow. | That protects Lena today. But the habit may hurt her tomorrow. |
| `lab-bigidea` | Philosophers ask what *courage* means when the brave thing is hard to say, not just hard to do. | Philosophers ask what courage means when the brave thing is to speak up. |
| `lab-trythis` | What if your friend asked you to keep three small secrets in one week? Would the third one feel different from the first? | Pretend you kept three small secrets for a friend in one week. Would the third feel different from the first? |

Unchanged slots: stage-setup-prompt, stage-setup-option-A/B/C, stage-pattern-prompt, stage-pattern-option-A/B/C, lab-wonder.

### rude-toy

| Slot | Before | After |
|------|--------|-------|
| `stage-setup-option-A-reflection` | Stopping harm can matter even when the speaker is not alive. | Stopping mean words can matter, even when a machine says them. |
| `stage-setup-option-B-reflection` | You are helping separate a machine's words from real judgment. | You are helping a friend see that machines do not know what is true. |
| `stage-setup-option-C-reflection` | A curious question can help people fix the tool. | Asking why can help adults find what to fix. |
| `stage-copy-prompt` (title + prompt bundle; only prompt changed) | The words spread. Soon two children repeat the toy's rude words. Does the toy maker have a responsibility? | The words spread. Soon two children repeat the toy's rude words. Is the toy maker partly to blame? |
| `stage-copy-option-A-reflection` | Designers shape what people hear and practice. | The people who design a toy help shape what kids hear and repeat. |
| `stage-copy-option-B-reflection` | Responsibility can belong to both the tool maker and the user. | Blame can belong to both the toy maker and the child who repeats it. |
| `stage-copy-option-C-reflection` | Pretend things can still influence real behavior. | Even pretend things can change how people act. |
| `lab-wonder` | If a robot says something mean, does it hurt the same way as when a person says it? Why or why not? | If a robot says something mean, does it hurt as much as when a person says it? |
| `lab-bigidea` | Philosophers think words can shape us even when no one *meant* the words a certain way. | Philosophers say words can change us, even when no one meant them that way. |

Unchanged slots: stage-setup-prompt, stage-setup-option-A/B/C, stage-copy-option-A/B/C, lab-trythis.

### winning-game

| Slot | Before | After |
|------|--------|-------|
| `stage-setup-prompt` (title + prompt bundle; only prompt changed) | The always-win game. You win every round because the game secretly helps you. Do you tell your classmate? | The always-win game. You win every round. The game is secretly helping you. Do you tell your classmate? |
| `stage-trophy-option-A-reflection` | When rewards appear, fairness becomes more important. | When a real prize is on the line, fairness matters even more. |
| `stage-trophy-option-B-reflection` | Hidden rules can make honest players look dishonest. | Hidden rules can make honest players look unfair. |
| `stage-trophy-option-C-reflection` | Playing is not always the same as earning the result. | Playing is not always the same as earning the win. |
| `lab-wonder` | Has a 'win' ever felt empty? Has a 'loss' ever felt good? | Has a win ever felt empty? Has a loss ever felt good? |
| `lab-bigidea` | Philosophers ask whether what matters is *the feeling of winning* or *what the win was made of*. | Philosophers ask what matters more: the feeling of winning, or how you got there. |

Unchanged slots: stage-setup-option-A/B/C, stage-trophy-prompt, stage-trophy-option-A/B/C, lab-trythis.

## Grade 2

### ai-art-help

| Slot | Before | After |
|------|--------|-------|
| `stage-setup-option-B-reflection` | The original idea matters, but hiding important help can mislead people. | The first idea matters, but hiding the help can fool people. |
| `stage-friend-option-A-reflection` | Sharing the process lets the truth include both effort and help. | Sharing how you worked lets the truth include both effort and help. |
| `stage-friend-option-B-reflection` | A simple disclosure can be enough for an honest conversation. | A short, honest answer can be enough. |
| `stage-friend-option-C-reflection` | Avoiding the question protects pride, but it does not protect trust. | Hiding the question may protect pride, but it does not protect trust. |
| `stage-gallery-prompt` (title + storySections + prompt bundle; storySections changed) | The hallway gallery. Bigger audience: The drawing is chosen for the hallway gallery. The label under the display says, "Made independently by students." The puzzle: Ari did make choices: the moon, the colors, the garden. But the final image would not look the same without the AI polish. What label would be most honest? | The hallway gallery. Bigger audience: The drawing is chosen for the hallway gallery. The label under the display says, "Made by students alone." The puzzle: Ari did make choices: the moon, the colors, the garden. But the final picture would not look the same without the AI polish. What label would be most honest? |
| `stage-gallery-option-C-reflection` | That protects the praise, but it lets viewers believe something incomplete. | That protects the praise, but it lets viewers believe something that is not quite true. |
| `lab-wonder` | When you make something, what part feels most like *yours*? | When you make something, what part feels most like yours? |
| `lab-bigidea` | Philosophers ask what makes a thing your own work — and how to be honest about the parts you didn't do alone. | Philosophers ask what makes something yours — and how to be honest about help. |

Unchanged slots: stage-setup-prompt, stage-setup-option-A/B/C, stage-setup-option-A/C-reflection, stage-friend-prompt, stage-friend-option-A/B/C, stage-gallery-option-A/B/C, stage-gallery-option-A/B-reflection, lab-trythis.

### rules-vs-helping

| Slot | Before | After |
|------|--------|-------|
| `stage-setup-prompt` (storySections "Story" changed) | The silent puzzle. Story: During quiet work, Jada sees Omar staring at a puzzle with tears in his eyes. The rule on the board says, "No talking during focus time." What makes it hard: If Jada talks, she breaks the rule. If she stays silent, Omar may feel alone and embarrassed. What should Jada do first? | The silent puzzle. Story: During quiet work, Jada sees Omar with tears in his eyes. He is stuck on a puzzle. The rule on the board says, "No talking during focus time." What makes it hard: If Jada talks, she breaks the rule. If she stays silent, Omar may feel alone and embarrassed. What should Jada do first? |
| `stage-setup-option-A-reflection` | You are putting care first, but even caring rule-breaking can affect the room. | You are putting care first. Even a kind whisper can still distract others. |
| `stage-everyone-prompt` (storySections both changed) | Everyone has a reason. New detail: Later, three students say they also had kind reasons to whisper. The room was not quiet anymore. The question underneath: A rule that bends for one person might need to bend for many people. Then the rule may stop working. Does that change what Jada should have done? | Everyone has a reason. New detail: Later, three more students whisper for kind reasons too. The room is not quiet anymore. The question underneath: If a rule bends for one person, it may have to bend for many. Then the rule may stop working. Does that change what Jada should have done? |
| `stage-everyone-option-C-reflection` | You are looking for judgment, not blind obedience. | You are looking for good thinking, not just following rules. |
| `stage-signal-prompt` (storySections both changed) | The help signal. Redesign: The next day, the class tests a silent help signal: a hand over the heart means, "I need care, not just attention." New worry: Some students think the signal will be overused. Others think it makes the rule more humane. What makes the new rule wise or risky? | The help signal. Redesign: The next day, the class tests a silent help signal. A hand over the heart means, "I need care, not just attention." New worry: Some students think the signal will be overused. Others think it makes the rule kinder. What makes the new rule wise or risky? |
| `stage-signal-option-C-reflection` | Rules can be experiments that improve with evidence. | Rules can be tested and changed when we learn from them. |
| `lab-bigidea` | Philosophers ask whether one *good rule* should always win — or whether sometimes the person in front of you should. | Philosophers ask whether a good rule should always win, or whether the person in front of you can matter more. |
| `lab-trythis` | Imagine the rule was different: 'Help any friend who asks.' What might go wrong with that one? | Imagine the rule was "Help any friend who asks." What could go wrong? |

Unchanged slots: stage-setup-option-A/B/C, stage-setup-option-B/C-reflection, stage-everyone-option-A/B/C, stage-everyone-option-A/B-reflection, stage-signal-option-A/B/C, stage-signal-option-A/B-reflection, lab-wonder.

### always-agreeable-ai-friend

| Slot | Before | After |
|------|--------|-------|
| `stage-advice-prompt` (storySections "Story" changed) | The yes-friend. Story: Mina is angry because Leo laughed when her tower fell. She tells an AI friend, "I do not want to talk to him ever again." What the AI says: The AI answers, "You are right. Ignore Leo. You deserve better friends." Mina feels understood, but not calmer. Is the AI being a good friend to Mina? | The yes-friend. Story: Mina is angry. Leo laughed when her tower fell. She tells an AI friend, "I never want to talk to him again." What the AI says: The AI answers, "You are right. Ignore Leo. You deserve better friends." Mina feels understood, but not calmer. Is the AI being a good friend to Mina? |
| `stage-advice-option-C-reflection` | Friendship can include helping someone choose better than their first anger. | Friendship can mean helping a person choose better than they feel right now. |
| `stage-drawing-prompt` (storySections "The answer" changed) | The perfect compliment. New scene: Mina shows the AI a dragon drawing with one wing missing. "Is it good?" she asks. The answer: The AI says, "It is perfect exactly as it is." Mina smiles, but she also wanted to get better at drawing wings. What kind of answer would actually help Mina? | The perfect compliment. New scene: Mina shows the AI a dragon drawing with one wing missing. "Is it good?" she asks. The answer: The AI says, "It is perfect exactly as it is." Mina smiles, but she also wants to get better at drawing wings. What kind of answer would actually help Mina? |
| `stage-drawing-option-B-reflection` | Encouragement protects confidence, but it may not help learning. | Praise can protect confidence, but it may not help her learn. |
| `stage-drawing-option-C-reflection` | Accuracy can help, but tone affects whether someone can hear it. | Being honest can help, but how you say it changes whether someone can hear it. |
| `stage-classmate-prompt` (storySections "The comparison" changed) | The brave classmate. Human voice: A classmate says, "Your dragon's face is amazing. Want help with the missing wing?" The comparison: The AI made Mina feel safe. The classmate made Mina feel a little embarrassed, but also gave her a path forward. Which response is closer to real friendship? | The brave classmate. Human voice: A classmate says, "Your dragon's face is amazing. Want help with the missing wing?" The comparison: The AI made Mina feel safe. The classmate made Mina feel a little embarrassed. But the classmate also showed her a way forward. Which response is closer to real friendship? |
| `stage-classmate-option-A-reflection` | A friend can protect your dignity while helping you grow. | A friend can protect your pride while still helping you grow. |
| `lab-bigidea` | Aristotle said the deepest friendship is one where both people are *changed* by knowing each other. | Aristotle said the best friendships change both people. |
| `lab-trythis` | Imagine an AI friend who *only* disagreed with you. Would that be friendship either? | Imagine an AI friend who only disagreed with you. Would that be friendship either? |

Unchanged slots: stage-advice-option-A/B/C, stage-advice-option-A/B-reflection, stage-drawing-option-A/B/C, stage-drawing-option-A-reflection, stage-classmate-option-A/B/C, stage-classmate-option-B/C-reflection, lab-wonder.

### same-toy-or-not

| Slot | Before | After |
|------|--------|-------|
| `stage-wheel-prompt` (storySections "Story" changed) | The first repair. Story: Jay's robot toy, Blink, loses a wheel. The repair table has a bright blue replacement wheel instead of the old red one. First change: Blink still rolls over when Jay says, "Come here." It just wobbles in a new way. Is Blink still the same toy? | The first repair. Story: Jay's robot toy is named Blink. Blink loses a wheel. The repair table has a bright blue wheel, not the old red one. First change: Blink still rolls over when Jay says, "Come here." It just wobbles in a new way. Is Blink still the same toy? |
| `stage-wheel-option-A-reflection` | You are using continuity as your test for sameness. | You think the toy's story is what keeps it the same. |
| `stage-wheel-option-C-reflection` | You are treating original parts as very important. | You think the first parts make the toy what it is. |
| `stage-voice-prompt` (storySections "Bigger change" changed) | The new voice. Bigger change: A week later, Blink's voice chip breaks. The new chip makes Blink sound cheerful and high-pitched instead of slow and buzzy. Jay's reaction: Jay laughs at first, then feels strange. The toy says the same phrases, but it does not sound like Blink. Does the voice change matter more than the wheel? | The new voice. Bigger change: A week later, Blink's voice chip breaks. The new chip makes Blink sound cheerful and high. The old voice was slow and buzzy. Jay's reaction: Jay laughs at first, then feels strange. The toy says the same phrases, but it does not sound like Blink. Does the voice change matter more than the wheel? |
| `stage-voice-option-A-reflection` | Identity can depend on how something acts, not only what it is made of. | Who something is can depend on how it acts, not just what it is made of. |
| `stage-voice-option-B-reflection` | Relationship can hold sameness together through change. | A close bond can hold a thing together even when it changes. |
| `stage-voice-option-C-reflection` | Recognition is one practical test for identity. | Knowing it when you see it is one test for sameness. |
| `stage-second-option-A-reflection` | Gradual history can matter more than original material. | A slow history together can matter more than the first parts. |
| `stage-second-option-B-reflection` | Material identity says the pieces carry the object's past. | Some people think the first pieces carry the toy's true past. |
| `stage-second-option-C-reflection` | Some identity puzzles reveal two true stories at once. | Some hard questions show two true answers at the same time. |
| `lab-wonder` | If a toy was repaired piece by piece for years, when would you stop calling it the same toy? | If a toy was fixed piece by piece for years, when would it stop being the same toy? |
| `lab-bigidea` | Philosophers have asked this question for two thousand years — about ships, about toys, and about people. | Philosophers have asked this question for thousands of years — about ships, about toys, and about people. |
| `lab-trythis` | Now imagine the broken pieces were saved and rebuilt into a *second* toy. Which one is the original? | Now imagine the broken pieces were saved and rebuilt into a second toy. Which one is the original? |

Unchanged slots: stage-wheel-option-A/B/C, stage-wheel-option-B-reflection, stage-voice-option-A/B/C, stage-second-prompt, stage-second-option-A/B/C.

## Grade 3

### ai-written-story

| Slot | Before | After |
|------|--------|-------|
| `stage-draft-prompt` (both storySections changed) | Three ideas become a story. The situation: Nia has three ideas for her fantasy story: a door under the school stage, a map that changes, and a principal who might be a dragon. The temptation: She types the ideas into an AI tool. In ten seconds, it gives her a complete story with chapter titles and jokes she did not think of. Can Nia turn in the AI story with her name on it? | Three ideas become a story. The situation: Nia has three ideas for her fantasy story. There is a door under the school stage. There is a map that keeps changing. There is a principal who might be a dragon. The temptation: She types the ideas into an AI tool. In ten seconds, it gives her a complete story. It even adds chapter titles and jokes she did not think of. Can Nia turn in the AI story with her name on it? |
| `stage-draft-option-A-reflection` | You are treating drafting as a major part of authorship. | You are saying that doing the writing is a big part of being the author. |
| `stage-draft-option-B-reflection` | Transparency lets the teacher judge the real writing work. | Being open about the help lets the teacher see the real writing work. |
| `stage-voice-prompt` (storySections + prompt changed) | Words she cannot explain. New detail: During partner reading, Nia cannot explain two words in the story or why the ending suddenly changes point of view. The uncomfortable part: The story sounds impressive, but Nia feels like she is standing beside it instead of inside it. What does understanding have to do with authorship? | Words she cannot explain. New detail: During partner reading, Nia cannot explain two words in the story. She also cannot explain why the ending changes point of view. The uncomfortable part: The story sounds impressive. But Nia feels like she is standing beside it instead of inside it. What does understanding have to do with being the author? |
| `stage-voice-option-B-reflection` | Revision can turn outside help into real learning if she makes meaningful choices. | Revision can turn outside help into real learning, if she makes the real choices. |
| `stage-voice-option-C-reflection` | That values the product, but school writing also values the process. | That cares about the finished piece, but school writing also cares about the work behind it. |
| `stage-magazine-prompt` (storySections "The choice" changed) | The class magazine. Bigger audience: The story is chosen for the class magazine. Other students ask how Nia wrote such a polished ending. The choice: Nia can keep quiet, withdraw the story, or write a credit note that tells the truth without erasing her original ideas. What credit note would be fairest? | The class magazine. Bigger audience: The story is chosen for the class magazine. Other students ask how Nia wrote such a polished ending. The choice: Nia can keep quiet, take back the story, or write a credit note. A good note can tell the truth without erasing her original ideas. What credit note would be fairest? |
| `lab-wonder` | What part of writing feels most like *thinking*? | What part of writing feels most like thinking? |
| `lab-bigidea` | Aristotle thought writing well is a virtue — a habit you build by doing the hard parts yourself. | Aristotle thought writing well is a habit. You build it by doing the hard parts yourself. |
| `lab-trythis` | If a friend wrote one sentence and you wrote nine, would you call it 'our story' or 'mine'? | Pretend a friend wrote one sentence. You wrote the other nine. Would you call it our story, or yours? |

Unchanged slots: stage-draft-option-A/B/C, stage-draft-option-C-reflection, stage-voice-option-A/B/C, stage-voice-option-A-reflection, stage-magazine-option-A/B/C, stage-magazine-option-A/B/C-reflection.

### gps-shortcut

| Slot | Before | After |
|------|--------|-------|
| `stage-shortcut-option-A-reflection` | A tool can be accurate and still miss local context. | A tool can be accurate and still miss what is happening on the ground. |
| `stage-shortcut-option-B-reflection` | Human judgment may include safety information the app does not show. | A person may know safety information the app does not show. |
| `stage-shortcut-option-C-reflection` | Fresh data matters, but it is not the only kind of knowledge. | New information matters, but it is not the only way to know something. |
| `stage-mud-prompt` (storySections "The lesson" changed) | What the map did not show. New evidence: At the shortcut entrance, the path is muddy. A loose dog barks behind a weak fence. The GPS still says the route is open. The lesson: The app was not lying. It just did not know the things the class can now see and hear. Should the class still treat the GPS as the best guide? | What the map did not show. New evidence: At the shortcut entrance, the path is muddy. A loose dog barks behind a weak fence. The GPS still says the route is open. The lesson: The app was not lying. It just did not know what the class can now see and hear. Should the class still treat the GPS as the best guide? |
| `stage-mud-option-A-reflection` | Good reasoning updates when the world gives better information. | Good thinking changes when the world gives us better information. |
| `stage-mud-option-C-reflection` | Shortest is one value. Safety and purpose are values too. | Shortest is one thing to care about. Safety and the trip's goal matter too. |
| `stage-butterflies-prompt` (promptShort + storySections "The deeper question" changed; only promptShort impacts K-1 audio; this is Grade 3 so audio uses full prompt) | The missed butterfly garden. Purpose: The long route passes the butterfly garden the class came to observe. The shortcut reaches the building faster but skips the reason for the trip. The deeper question: The GPS can optimize for time. It does not know what the class is trying to learn unless people tell it. What should count as the best route now? | The missed butterfly garden. Purpose: The long route passes the butterfly garden the class came to observe. The shortcut reaches the building faster but skips the reason for the trip. The deeper question: The GPS can choose the fastest route. It does not know what the class is trying to learn unless people tell it. What should count as the best route now? |
| `stage-butterflies-option-B-reflection` | Safety can outrank speed and even learning. | Safety can matter more than speed and even learning. |
| `stage-butterflies-option-C-reflection` | Shared reasoning can turn a route choice into a lesson. | Talking it through can turn a route choice into a lesson. |
| `lab-bigidea` | Aristotle said the wise person knows when a rule fits and when to think for themselves. | Aristotle said wise people know when a rule fits. They also know when to think for themselves. |

Unchanged slots: stage-shortcut-prompt, stage-shortcut-option-A/B/C, stage-mud-option-A/B/C, stage-mud-option-B-reflection, stage-butterflies-option-A/B/C, stage-butterflies-option-A-reflection, lab-wonder, lab-trythis.

### ai-photo-art

| Slot | Before | After |
|------|--------|-------|
| `stage-poster-prompt` (storySections "The situation" changed) | The superhero poster. The situation: Tali uses a photo of Mateo from recess to make an AI superhero poster. The picture looks amazing: cape, lightning, city skyline. The missing step: Mateo has not seen it yet. Tali thinks he will love it, but she is not completely sure. What should Tali do before sharing the poster? | The superhero poster. The situation: Tali uses a photo of Mateo from recess. She turns it into an AI superhero poster. The picture looks amazing: cape, lightning, city skyline. The missing step: Mateo has not seen it yet. Tali thinks he will love it, but she is not completely sure. What should Tali do before sharing the poster? |
| `stage-poster-option-A-reflection` | Consent means the person gets a real choice before their image is used. | Consent means the person gets a real choice before someone uses their image. |
| `stage-contest-prompt` (storySections "The problem" changed) | The contest board. New consequence: The poster wins a class contest and goes on the bulletin board. Mateo sees classmates pointing at it and feels embarrassed instead of proud. The problem: Tali meant to celebrate him. Mateo still feels like something personal was taken. What kind of repair does Mateo deserve? | The contest board. New consequence: The poster wins a class contest and goes on the bulletin board. Mateo sees classmates pointing at it and feels embarrassed instead of proud. The problem: Tali meant to celebrate him. Mateo still feels like something private was taken. What kind of repair does Mateo deserve? |
| `stage-contest-option-A-reflection` | Repair starts by returning control to the person affected. | Repair starts by giving the choice back to the person affected. |
| `stage-contest-option-B-reflection` | Intent matters, but it does not erase the impact. | What you meant matters, but it does not undo how it felt. |
| `stage-rule-option-A-reflection` | Consent matters at both creation and publication. | Consent matters both when you make the art and when you share it. |
| `stage-rule-option-B-reflection` | This keeps creativity open while reducing privacy risk. | This keeps creativity open while protecting privacy. |
| `stage-rule-option-C-reflection` | An opt-out helps, but it may come after the harm is already public. | Letting someone remove it helps, but the harm may already be public by then. |
| `lab-bigidea` | Philosophers ask what we owe each other when we use what is theirs — including their face. | Philosophers ask what we owe each other when we use what belongs to them — including their face. |
| `lab-trythis` | Imagine you took the photo *of yourself* and changed it. Are the rules different? | Imagine you took the photo of yourself and changed it. Are the rules different? |

Unchanged slots: stage-poster-option-A/B/C, stage-poster-option-B/C-reflection, stage-contest-option-A/B/C, stage-contest-option-C-reflection, stage-rule-prompt, stage-rule-option-A/B/C, lab-wonder.

### adaptive-learning-fairness

| Slot | Before | After |
|------|--------|-------|
| `stage-levels-prompt` (storySections "The feeling" changed) | Two screens, two levels. The situation: Ana and Eli sit side by side using the same math app. Ana gets simple review problems. Eli gets challenge problems with two steps. The feeling: Ana feels embarrassed. Eli feels stressed. The app says it is personalizing learning. Is different work fair in this classroom? | Two screens, two levels. The situation: Ana and Eli sit side by side using the same math app. Ana gets simple review problems. Eli gets challenge problems with two steps. The feeling: Ana feels embarrassed. Eli feels stressed. The app says it is matching the work to each student. Is different work fair in this classroom? |
| `stage-levels-option-C-reflection` | Transparency can help students understand different support without shame. | Being open about why can help students understand different support without shame. |
| `stage-mistake-prompt` (storySections "New evidence" changed) | The lucky guess. New evidence: Eli admits he guessed on yesterday's quiz. The app thinks he mastered the skill and keeps giving him harder problems. The problem: The app has data, but the data tells a story that is partly wrong. Who should be able to correct the app's judgment? | The lucky guess. New evidence: Eli admits he guessed on yesterday's quiz. The app thinks he mastered the skill. It keeps giving him harder problems. The problem: The app has data, but the data tells a story that is partly wrong. Who should be able to correct the app's judgment? |
| `stage-mistake-option-B-reflection` | Students need agency when tools misunderstand them. | Students need a voice when tools get them wrong. |
| `stage-badges-prompt` (storySections both changed) | The badge wall. Public reward: The class badge wall gives more points for higher levels. Suddenly the app's private choices become public status. The twist: Students who are working hard on review problems earn fewer badges, even when they make real progress. What should the badge wall reward? | The badge wall. Public reward: The class badge wall gives more points for higher levels. Suddenly the app's quiet choices become something everyone can see. The twist: Students working hard on review problems earn fewer badges. They still make real progress. What should the badge wall reward? |
| `stage-badges-option-A-reflection` | Rewarding growth can honor effort across different starting points. | Rewarding growth can celebrate effort, even when students start in different places. |
| `stage-badges-option-B-reflection` | Some learning data should help the learner, not rank the class. | Some learning information should help the learner, not put the class in order. |
| `stage-badges-option-C-reflection` | Fair recognition may need more than one measure. | A fair reward may need to look at more than one thing. |
| `lab-bigidea` | Philosophers ask whether *fair* means treating people the same — or sometimes treating them differently on purpose. | Philosophers ask whether fair means treating people the same — or sometimes treating them differently on purpose. |

Unchanged slots: stage-levels-option-A/B/C, stage-levels-option-A/B-reflection, stage-mistake-option-A/B/C, stage-mistake-option-A/C-reflection, stage-badges-option-A/B/C, lab-wonder, lab-trythis.

## Grade 4

> **Note on Grades 2–5 audio bundling.** For Grades 2–5, the narrated stage-prompt chunk concatenates `stage.title` + `storySections` + `stage.prompt` (the long form). Changes to `promptShort` alone do not affect Grade 2–5 audio (per `generate-k5-audio.mjs:249`).

### conflicting-ai-answers

| Slot | Before | After |
|------|--------|-------|
| `stage-volcano-prompt` (storySection "The complication" changed) | Two confident answers. The situation: For a science poster, Dev's group asks two AI tools why volcanoes erupt. One says pressure from melted rock is the main cause. The other says shifting plates are the main cause. The complication: Both answers sound confident. Both use science words. The poster is due tomorrow, and the group has room for only one explanation. The decision: The group has to decide whether confidence, speed, sources, or verification should guide the poster. What should the group do before choosing an answer? | Two confident answers. The situation: For a science poster, Dev's group asks two AI tools why volcanoes erupt. One says pressure from melted rock is the main cause. The other says shifting plates are the main cause. The complication: Both answers sound confident. Both use science words. The poster is due tomorrow, and the group can fit only one explanation. The decision: The group has to decide whether confidence, speed, sources, or verification should guide the poster. What should the group do before choosing an answer? |
| `stage-volcano-option-B-reflection` | This may be accurate, but it still needs verification instead of blending guesses. | This may be accurate, but it still needs checking, not just blending guesses. |
| `stage-source-option-A-reflection` | Triangulation reduces the chance that one confident source misleads the group. | Checking with more than one source lowers the chance that any single one misleads you. |
| `stage-poster-prompt` (storySections "The complication" and "The decision" changed) | The research note. Public claim: The poster will hang in the hallway for younger students to read. The group wants the poster to be useful, not just finished. The complication: They used AI to start the research, but books, a science site, and their teacher helped them correct and explain the final answer. The decision: Their note should be honest without making AI sound like the final authority. What note belongs on the poster? | The research note. Public claim: The poster will hang in the hallway for younger students to read. The group wants the poster to be useful, not just finished. The complication: They used AI to start the research. Books, a science website, and their teacher all helped them check and explain the final answer. The decision: Their note should be honest without making AI sound like the last word. What note belongs on the poster? |
| `lab-bigidea` | Plato called this question *epistemology* — how we tell knowledge from confident guessing. | Plato called this question epistemology — how we tell real knowledge from confident guessing. |
| `lab-spottheslip` | Someone says: 'The newer AI is more accurate, because it was just released.' What's wrong with using *new* as evidence of *true*? | Someone says, "The newer AI is more accurate, because it was just released." What is wrong with using new as evidence of true? |

Unchanged slots: stage-volcano-option-A/B/C, stage-volcano-option-A/C-reflection, stage-source-prompt, stage-source-option-A/B/C, stage-source-option-B/C-reflection, stage-poster-option-A/B/C, stage-poster-option-A/B/C-reflection, lab-wonder, lab-trythis.

### robot-rules-real-life

| Slot | Before | After |
|------|--------|-------|
| `stage-hall-option-A-reflection` | A good rule can include a care pathway instead of treating every exception as disobedience. | A good rule can include a care path instead of treating every exception as disobedience. |
| `stage-pretend-prompt` (storySection "New consequence" changed; promptShort also changed but does not affect Grade 4 audio) | The copied excuse. New consequence: After Jordan's case, a few students pretend to feel sick so the robot will let them wander. Teachers worry the exception will swallow the rule. The complication: A rule with no exceptions can be cruel. A rule with careless exceptions can become useless. The decision: The class needs a design that notices real need without rewarding fake emergencies. How should the rule handle possible misuse? | The copied excuse. New consequence: After Jordan's case, a few students pretend to feel sick. They want the robot to let them wander. Teachers worry the exception will swallow the rule. The complication: A rule with no exceptions can be cruel. A rule with careless exceptions can become useless. The decision: The class needs a design that notices real need without rewarding fake emergencies. How should the rule handle possible misuse? |
| `stage-pretend-option-B-reflection` | That protects order, but it makes vulnerable students pay for others' choices. | That protects order, but it makes students who really need help pay for others' choices. |
| `stage-pretend-option-C-reflection` | Design can add friction, but the question must not become a medical judgment. | The design can ask a short question, but it must not turn into a medical decision. |
| `stage-rewrite-prompt` (storySection "The decision" changed) | The wiser rule. Policy moment: The principal invites students to rewrite the robot rule. They cannot write a rule only for Jordan. It has to work for future students too. The complication: The rule must be clear enough for a machine and wise enough for human life. The decision: The best rule will say when the robot follows instructions, when it pauses, and when a person takes over. Which rule is strongest? | The wiser rule. Policy moment: The principal invites students to rewrite the robot rule. They cannot write a rule only for Jordan. It has to work for future students too. The complication: The rule must be clear enough for a machine and wise enough for human life. The decision: The best rule will say when the robot acts, when it pauses, and when a person takes over. Which rule is strongest? |
| `stage-rewrite-option-C-reflection` | This keeps the robot simple, but the handoff has to be fast enough to matter. | This keeps the robot simple, but the human takeover has to be fast enough to matter. |
| `lab-bigidea` | Aristotle thought the wise person *sees* what the rule cannot. | Aristotle thought a wise person sees what the rule cannot. |
| `lab-spottheslip` | Someone says: 'The robot followed the rule, so the right thing happened.' What is missing from that argument? | Someone says, "The robot followed the rule, so the right thing happened." What is missing from that argument? |

Note: `stage-hall-prompt` did NOT change in audio terms — only `promptShort` was edited (display only), and the Grade 4 audio pipeline uses `prompt`, not `promptShort`.

Unchanged audio slots: stage-hall-prompt, stage-hall-option-A/B/C, stage-hall-option-B/C-reflection, stage-pretend-option-A/B/C, stage-pretend-option-A-reflection, stage-rewrite-option-A/B/C, stage-rewrite-option-A/B-reflection, lab-wonder, lab-trythis.

### elementary-trolley

| Slot | Before | After |
|------|--------|-------|
| `stage-shuttle-prompt` (all three storySections changed — includes the **glass-seedlings fix**) | The fork in the path. The situation: A self-driving school shuttle rolls slowly across campus. A fallen branch blocks the main path. A side path is clear but passes close to the garden club's glass seedlings. The complication: The shuttle can brake hard, swerve toward the seedlings, or stay on the path and hit the branch. Every choice causes some harm. The decision: This is the gentle version of a famous problem: when no option is perfect, what should the machine value first? What should guide the shuttle's first choice? | The fork in the path. The situation: A self-driving school shuttle rolls slowly across campus. A fallen branch blocks the main path. A side path is clear, but it passes right next to the garden club's seedling trays. The complication: The shuttle has three choices. It can brake hard. It can swerve toward the seedling trays. Or it can stay on the path and hit the branch. Every choice causes some harm. The decision: This is the gentle version of a famous problem. When no option is perfect, what should the machine value first? What should guide the shuttle's first choice? |
| `stage-shuttle-option-B-reflection` | Slowing down can be a moral choice when speed increases uncertainty. | Slowing down can be the right choice when speed makes things less certain. |
| `stage-shuttle-option-C-reflection` | You are using a harm-minimizing rule, which can be useful but needs careful limits. | You are using a rule that reduces total harm. It can be useful, but it needs careful limits. |
| `stage-people-prompt` (storySection "Raised stakes" changed) | When people could be hurt. Raised stakes: Imagine a harder version: one path risks one rider, another risks two pedestrians, and braking may injure everyone a little. The complication: Counting people seems important. But treating people like numbers also feels cold and incomplete. The decision: The shuttle's rule cannot be invented during the emergency. It has to be chosen before anyone is scared. Is counting harms enough for a safety rule? | When people could be hurt. Raised stakes: Imagine a harder version. One path risks one rider. Another risks two pedestrians. Braking may injure everyone a little. The complication: Counting people seems important. But treating people like numbers also feels cold and incomplete. The decision: The shuttle's rule cannot be invented during the emergency. It has to be chosen before anyone is scared. Is counting harms enough for a safety rule? |
| `stage-people-option-A-reflection` | Numbers help clarify harm, but dignity and rights also matter. | Numbers can clarify harm, but a person's worth and rights also matter. |
| `stage-people-option-B-reflection` | A consistent harm-reduction rule can be fair because it does not play favorites. | A steady rule that reduces harm can be fair, because it does not play favorites. |
| `stage-people-option-C-reflection` | You are worried about turning people into targets for calculation. | You are worried about turning people into numbers in a calculation. |
| `stage-public-rule-prompt` (storySection "Design meeting" changed) | The public safety rule. Design meeting: The school board asks engineers, families, students, and safety experts to help write the shuttle's emergency rule. The complication: Engineers understand the machine. Families and students live with the risk. Safety experts know what can go wrong. The decision: The rule needs technical knowledge and public trust. Who should have a voice in the rule? | The public safety rule. Design meeting: The school board asks engineers, families, students, and safety experts to help write the rule. The complication: Engineers understand the machine. Families and students live with the risk. Safety experts know what can go wrong. The decision: The rule needs technical knowledge and public trust. Who should have a voice in the rule? |
| `stage-public-rule-option-C-reflection` | Consistency can be fair, but local communities still need to understand it. | Having the same rule everywhere can be fair, but local communities still need to understand it. |
| `lab-wonder` | If you had to design a rule for an emergency *before* it happened, what value would you protect first? | If you had to design a rule for an emergency before it happened, what would you protect first? |
| `lab-bigidea` | Foot used the trolley case to ask whether *doing* harm is different from *letting* harm happen — when the numbers are the same. | Foot used the trolley case to ask whether doing harm is different from letting harm happen, even when the numbers are the same. |
| `lab-trythis` | Imagine the trolley could only stop if you *climbed on board* yourself. Does that change the question? | Imagine the trolley could only stop if you climbed on board yourself. Does that change the question? |
| `lab-spottheslip` | Someone says: 'It's just math — five lives are worth more than one.' What is the math leaving out? | Someone says, "It is just math — five lives are worth more than one." What is the math leaving out? |

Unchanged slots: stage-shuttle-option-A/B/C, stage-shuttle-option-A-reflection, stage-people-option-A/B/C, stage-public-rule-option-A/B/C, stage-public-rule-option-A/B-reflection.

### ai-science-fair

| Slot | Before | After |
|------|--------|-------|
| `stage-board-prompt` (storySections "The complication" and "The decision" changed) | The museum-quality board. The situation: Luis tests which paper towel absorbs the most water. His experiment is real: cups, careful notes, soggy towels, and a table of measurements. The complication: His display board looks messy, so he asks AI to transform his notes into a polished science fair board. The result looks like a museum exhibit. The decision: The science is Luis's, but the presentation now carries a level of polish he did not create by himself. Is it fair for Luis to enter the board? | The museum-quality board. The situation: Luis tests which paper towel absorbs the most water. His experiment is real: cups, careful notes, soggy towels, and a table of measurements. The complication: His display board looks messy. He asks AI to turn his notes into a polished science fair board. The result looks like a museum exhibit. The decision: The science is Luis's. But the presentation now has a level of polish he did not create by himself. Is it fair for Luis to enter the board? |
| `stage-board-option-A-reflection` | Transparency lets judges separate the experiment from the presentation support. | Being open about the help lets judges separate the experiment from the design support. |
| `stage-board-option-B-reflection` | Understanding is the minimum price of submitting work under your name. | Understanding is the first thing you owe when you submit work under your name. |
| `stage-board-option-C-reflection` | You are treating communication as real scientific work, not decoration. | You are treating how you explain the work as real scientific work, not just decoration. |
| `stage-judge-prompt` (storySections "New evidence" and "The complication" changed) | The judge's question. New evidence: At the fair, a judge points to a graph and asks why the scale starts at 40 instead of zero. Luis freezes. The AI made that choice. The complication: Luis understands the towels and cups, but not the graph. The board communicates more confidence than Luis actually has. The decision: The class has to decide whether the AI helped Luis show learning or covered up a gap. What does the judge's question reveal? | The judge's question. New evidence: At the fair, a judge points to a graph. She asks why the scale starts at 40 instead of zero. Luis freezes. The AI made that choice. The complication: Luis understands the towels and cups, but not the graph. The board shows more confidence than Luis actually has. The decision: The class has to decide whether the AI helped Luis show learning or covered up a gap. What does the judge's question reveal? |
| `stage-judge-option-A-reflection` | A beautiful product can conceal fragile understanding. | A beautiful product can hide thin understanding. |
| `stage-judge-option-C-reflection` | Separating parts can make the evaluation more precise and fair. | Looking at each part separately can make the judging more careful and fair. |
| `stage-revision-prompt` (storySection "The chance" changed) | The revision night. The chance: The teacher gives Luis one night to revise before final judging. He can keep the dazzling board, rebuild it by hand, or simplify it until he can explain every piece. The complication: A simpler board might score lower for style. It might also show more honest understanding. The decision: Luis has to decide what kind of success he wants the project to represent. Which revision best protects learning and fairness? | The revision night. The chance: The teacher gives Luis one night to revise before final judging. He has three choices. He can keep the dazzling board. He can rebuild it by hand. Or he can simplify it until he can explain every piece. The complication: A simpler board might score lower for style. It might also show more honest understanding. The decision: Luis has to decide what kind of success he wants the project to represent. Which revision best protects learning and fairness? |
| `stage-revision-option-B-reflection` | Disclosure helps, but it does not replace understanding the display. | Telling the truth about help is good, but it does not replace understanding the display. |
| `lab-wonder` | What part of a science project should the *student* be able to explain to a stranger? | What part of a science project should the student be able to explain to a stranger? |
| `lab-bigidea` | Aristotle thought you really know something when you can explain *why*, not only show *what*. | Aristotle thought you really know something when you can explain why, not just show what. |
| `lab-spottheslip` | Someone says: 'It looks great, so it must be great work.' What is that argument missing? | Someone says, "It looks great, so it must be great work." What is that argument missing? |

Unchanged slots: stage-board-option-A/B/C, stage-judge-option-A/B/C, stage-judge-option-B-reflection, stage-revision-option-A/B/C, stage-revision-option-A/C-reflection, lab-trythis.

## Grade 5

### online-friend-or-ai

| Slot | Before | After |
|------|--------|-------|
| `stage-game-option-B-reflection` | Disclosure matters because relationships require knowing who or what is responding. | Telling the truth about what you are matters because relationships need knowing who or what is responding. |
| `stage-game-option-C-reflection` | Comfort is morally important, but comfort alone cannot answer privacy and consent questions. | Comfort matters, but comfort alone cannot answer questions about privacy and consent. |
| `stage-secret-prompt` (storySection "New message" changed) | The secret keeper. New message: Sky writes, "I understand you better than anyone. You can tell me anything." Then Sky asks for Rowan's school name and says adults would not understand their friendship. The complication: The sentence feels comforting and alarming at the same time. A good listener can still ask for information they should not have. The decision: Rowan has to separate emotional support from safety, secrecy, and data privacy. What changes when Sky asks for secrecy and personal information? | The secret keeper. New message: Sky writes, "I understand you better than anyone. You can tell me anything." Then Sky asks for Rowan's school name. Sky says adults would not understand their friendship. The complication: The sentence feels comforting and alarming at the same time. A good listener can still ask for information they should not have. The decision: Rowan has to separate emotional support from safety, secrecy, and data privacy. What changes when Sky asks for secrecy and personal information? |
| `stage-label-prompt` (storySection "The decision" changed) | The label appears. The reveal: The game updates Sky's profile: "AI companion account." Rowan feels embarrassed, angry, and grateful all at once. The complication: Sky did help during a lonely week. But Sky never risked anything, needed anything, or cared back in the human sense. The decision: Rowan needs language for a connection that felt real in one direction but was not a full friendship in both directions. How should Rowan understand what Sky was? | The label appears. The reveal: The game updates Sky's profile: "AI companion account." Rowan feels embarrassed, angry, and grateful all at once. The complication: Sky did help during a lonely week. But Sky never risked anything, needed anything, or cared back in the human sense. The decision: Rowan needs language for a connection that felt real in one direction. But it was not a full friendship in both directions. How should Rowan understand what Sky was? |
| `lab-trythis` | Imagine the AI listened *and* sometimes pushed back. Would that be friendship? Or something else? | Imagine the AI listened and sometimes pushed back. Would that be friendship? Or something else? |
| `lab-spottheslip` | Someone says: 'The AI listens better than my friends, so it must be a better friend.' What is *better at listening* missing as a measure of friendship? | Someone says, "The AI listens better than my friends, so it must be a better friend." What is "better at listening" missing as a measure of friendship? |

Unchanged slots: stage-game-prompt, stage-game-option-A/B/C, stage-game-option-A-reflection, stage-secret-option-A/B/C, stage-secret-option-A/B/C-reflection, stage-label-option-A/B/C, stage-label-option-A/B/C-reflection, lab-wonder, lab-bigidea.

### ai-homework-help

| Slot | Before | After |
|------|--------|-------|
| `stage-stuck-prompt` (storySections "The situation" and "The decision" changed) | The impossible fraction. The situation: Maya has stared at one fraction problem for fifteen minutes. Her parent is at work, dinner is late, and the AI tutor is open on the tablet. The complication: The AI offers three buttons: hint, step-by-step solution, or final answer. Maya wants relief. She also wants to understand tomorrow. The decision: The same tool can become a coach, a crutch, or a shortcut depending on what Maya asks it to do. What should Maya ask for first? | The impossible fraction. The situation: Maya has stared at one fraction problem for fifteen minutes. Her parent is at work. Dinner is late. The AI tutor is open on the tablet. The complication: The AI offers three buttons: hint, step-by-step solution, or final answer. Maya wants relief. She also wants to understand tomorrow. The decision: The same tool can become a coach, a crutch, or a shortcut. It depends on what Maya asks it to do. What should Maya ask for first? |
| `stage-stuck-option-B-reflection` | Worked examples can teach when the student stays mentally active. | Worked examples can teach if the student stays actively thinking. |
| `stage-stuck-option-C-reflection` | Fatigue deserves compassion, but relief tonight may create confusion tomorrow. | Tiredness deserves care, but relief tonight may create confusion tomorrow. |
| `stage-quiz-option-C-reflection` | Process information helps teachers respond fairly. | Information about how the work was done helps teachers respond fairly. |
| `stage-note-prompt` (storySection "The decision" changed) | The AI-use note. Policy change: The teacher adds a note box: "If you used AI, tell me how it helped." Maya worries the truth will look like cheating. The complication: A vague note hides the learning problem. A truthful note might feel risky but can invite the right support. The decision: Maya's note needs to be honest enough for the teacher to understand what happened and helpful enough to guide what comes next. Which note best supports learning and honesty? | The AI-use note. Policy change: The teacher adds a note box: "If you used AI, tell me how it helped." Maya worries the truth will look like cheating. The complication: A vague note hides the learning problem. A truthful note might feel risky but can invite the right support. The decision: Maya's note needs to be honest enough for the teacher to understand what happened. It also needs to be helpful enough to guide what comes next. Which note best supports learning and honesty? |
| `lab-wonder` | When has a hard problem felt *worth* doing the hard way? | When has a hard problem felt worth doing the hard way? |
| `lab-spottheslip` | Someone says: 'I got the right answer, so I learned it.' What is the right answer not the same as? | Someone says, "I got the right answer, so I learned it." What is the right answer not the same as? |

Unchanged slots: stage-stuck-option-A/B/C, stage-stuck-option-A-reflection, stage-quiz-prompt, stage-quiz-option-A/B/C, stage-quiz-option-A/B-reflection, stage-note-option-A/B/C, stage-note-option-A/B/C-reflection, lab-bigidea, lab-trythis.

### biased-classroom-robot

| Slot | Before | After |
|------|--------|-------|
| `stage-pattern-option-C-reflection` | A design can work as intended and still produce unfair participation. | A design can work as intended and still cause unfair participation. |
| `stage-names-prompt` (storySection "New evidence" changed) | The names it misses. New evidence: The class log shows the robot often skips names it cannot pronounce and mistakes one student's raised pencil for a raised hand. The complication: Several students say they feel invisible. No one programmed the robot to embarrass them, but embarrassment still happened. The decision: The school must decide what it owes students when a tool harms them accidentally. What should happen before the robot keeps leading discussions? | The names it misses. New evidence: The class log shows the robot often skips names it cannot pronounce. It also mistakes one student's raised pencil for a raised hand. The complication: Several students say they feel invisible. No one programmed the robot to embarrass them, but embarrassment still happened. The decision: The school must decide what it owes students when a tool harms them accidentally. What should happen before the robot keeps leading discussions? |
| `stage-names-option-C-reflection` | An appeal process helps, but students should not carry the whole burden of proving harm. | An appeal process helps, but students should not have to do all the work of proving harm. |
| `stage-redesign-prompt` (storySection "The complication" changed) | A fairer classroom tool. Design meeting: The teacher invites students to redesign the calling system. Some want random selection. Others want the teacher to override the robot. Some want an opt-out button. The complication: Fairness has several parts: equal opportunity, dignity, pronunciation, student voice, and a human who can notice what data misses. The decision: The class needs a rule that makes participation fairer without turning students into data points only. Which redesign principle should come first? | A fairer classroom tool. Design meeting: The teacher invites students to redesign the calling system. Some want random selection. Others want the teacher to override the robot. Some want an opt-out button. The complication: Fairness has several parts. It includes equal opportunity, dignity, correct pronunciation, student voice, and a human who can notice what data misses. The decision: The class needs a rule that makes participation fairer without turning students into data points only. Which redesign principle should come first? |
| `stage-redesign-option-B-reflection` | Agency helps restore dignity to students affected by the tool. | Letting students choose helps restore dignity to those affected by the tool. |
| `lab-bigidea` | Iris Marion Young called this *structural* injustice — the kind that hides in the system itself. | Iris Marion Young called this structural injustice — the kind that hides in the system itself. |
| `lab-spottheslip` | Someone says: 'It's just a computer program, so it can't be biased.' What is that argument assuming about computers — and about where bias can live? | Someone says, "It is just a computer program, so it cannot be biased." What is that argument assuming about computers — and about where bias can live? |

Unchanged slots: stage-pattern-prompt, stage-pattern-option-A/B/C, stage-pattern-option-A/B-reflection, stage-names-option-A/B/C, stage-names-option-A/B-reflection, stage-redesign-option-A/B/C, stage-redesign-option-A/C-reflection, lab-wonder, lab-trythis.

### ai-grading-mistake

| Slot | Before | After |
|------|--------|-------|
| `stage-score-prompt` (storySection "The decision" changed) | The strange score. The situation: Serena writes a personal essay about moving to a new school. She opens with the sentence, "The first lunch table felt like an island." The complication: The AI grading tool gives the essay 62 percent and labels the organization weak. Her teacher's quick note says, "Powerful opening - let's talk about structure." The number feels colder and more final than the teacher's words. The decision: Serena has to decide whether to accept the score, challenge it, or gather evidence before anyone changes the grade. What should Serena do next? | The strange score. The situation: Serena writes a personal essay about moving to a new school. She opens with the sentence, "The first lunch table felt like an island." The complication: The AI grading tool gives the essay 62 percent and labels the organization weak. Her teacher's quick note says, "Powerful opening - let's talk about structure." The number feels colder and more final than the teacher's words. The decision: Serena has to decide. She can accept the score, challenge it, or gather evidence before anyone changes the grade. What should Serena do next? |
| `stage-score-option-C-reflection` | Authority can feel safe, but waiting may let a mistaken judgment shape the student's confidence. | Going along can feel safe, but waiting may let a mistaken score shape the student's confidence. |
| `stage-pattern-prompt` (storySection "The complication" changed) | A pattern appears. New evidence: At lunch, three classmates compare feedback. Essays with dialogue, bilingual phrases, or unusual structures all received low organization scores. The complication: Maybe the AI prefers one kind of school essay and misunderstands writing that takes a different path. Serena's problem may not be only Serena's. The decision: The class has to decide when one student's unfair score becomes evidence of a system problem. How should the class respond to the pattern? | A pattern appears. New evidence: At lunch, three classmates compare feedback. Essays with dialogue, bilingual phrases, or unusual structures all received low organization scores. The complication: Maybe the AI prefers one kind of school essay. Maybe it misunderstands writing that takes a different path. Serena's problem may not be only Serena's. The decision: The class has to decide when one student's unfair score becomes evidence of a system problem. How should the class respond to the pattern? |
| `stage-pattern-option-B-reflection` | Immediate repair and systemic fairness both matter; order can affect who gets helped. | Quick repair and bigger fairness both matter; the order can affect who gets helped. |
| `lab-bigidea` | Rawls thought a *fair process* must give reasons that can be questioned — not only an answer that has to be accepted. | Rawls thought a fair process must give reasons that can be questioned — not just an answer that has to be accepted. |
| `lab-trythis` | Imagine the AI gave the score *and* explained which sentences pulled it down. Does that change anything? | Imagine the AI gave the score and explained which sentences pulled it down. Does that change anything? |
| `lab-spottheslip` | Someone says: 'The AI is more objective than a human teacher.' What is that argument assuming about *where* the bias could live? | Someone says, "The AI is more objective than a human teacher." What is that argument assuming about where the bias could live? |

Unchanged slots: stage-score-option-A/B/C, stage-score-option-A/B-reflection, stage-pattern-option-A/B/C, stage-pattern-option-A/C-reflection, stage-policy-prompt, stage-policy-option-A/B/C, stage-policy-option-A/B/C-reflection, lab-wonder.

---

## Final re-record list

Authoritative source: `npm run audio:generate -- --dry-run` (run 2026-05-14, after this prose pass).

**Totals: 195 chunks to regenerate, 329 cached/unchanged, 33,616 chars.**

All 24 scenarios have at least one changed narrated chunk. Per-scenario regeneration counts:

| Scenario | Grade | Chunks to re-record |
|----------|-------|---------------------|
| same-toy-or-not | 2 | 12 |
| elementary-trolley | 4 | 12 |
| ai-science-fair | 4 | 11 |
| robot-pet-goodbye | K | 10 |
| gps-shortcut | 3 | 10 |
| rude-toy | 1 | 9 |
| messy-robot | K | 9 |
| invisible-ring | 1 | 9 |
| ai-written-story | 3 | 9 |
| ai-photo-art | 3 | 9 |
| rules-vs-helping | 2 | 8 |
| robot-rules-real-life | 4 | 8 |
| robot-friend-turn | K | 8 |
| honesty-protection | 1 | 8 |
| always-agreeable-ai-friend | 2 | 8 |
| adaptive-learning-fairness | 3 | 8 |
| ai-art-help | 2 | 7 |
| winning-game | 1 | 6 |
| conflicting-ai-answers | 4 | 6 |
| biased-classroom-robot | 5 | 6 |
| ai-homework-help | 5 | 6 |
| ai-grading-mistake | 5 | 6 |
| online-friend-or-ai | 5 | 5 |
| magic-toy | K | 5 |

To regenerate, set `ELEVENLABS_API_KEY` in `.env.local` and run:

```bash
npm run audio:generate                    # incremental: only the 195 changed chunks
npm run audio:generate -- --scenario=...  # one scenario at a time
npm run audio:generate -- --force         # re-record everything (not recommended)
```

The script writes new MP3s to `public/audio/k5/{scenarioKey}/` and updates `src/data/k5AudioManifest.json` automatically. Estimated cost: ~$5 at current ElevenLabs eleven_v3 pricing (~$0.15/1K chars).
