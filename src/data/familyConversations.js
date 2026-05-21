// Family Conversation Generator — age-banded prompt sets for parents and
// caregivers who want to talk with their kids about AI without it feeling
// like a lecture.
//
// Each (age, topic) pair returns five short prompts. Prompts are designed to:
//   1. open the conversation without a "correct" answer — the kid talks first
//   2. surface what the kid actually thinks before the parent says anything
//   3. be answerable in a sentence so dinner doesn't grind to a halt
//   4. lead somewhere — each prompt has a natural follow-up the parent can ask
//
// Tone: conversational, curious, not preachy. The parent is the questioner,
// not the lecturer. The kid is the expert on their own experience.

export const AGE_BANDS = [
  {
    id: "early-elementary",
    label: "Early elementary (ages 5–8)",
    short: "ages 5–8",
    note: "Concrete, story-based, short attention. Avoid abstractions like 'algorithm.'",
  },
  {
    id: "upper-elementary",
    label: "Upper elementary (ages 9–11)",
    short: "ages 9–11",
    note: "Hypothetical-curious, fairness-focused. They've started seeing AI at school.",
  },
  {
    id: "middle-school",
    label: "Middle school (ages 11–14)",
    short: "ages 11–14",
    note: "Identity-focused, peer-aware. They're encountering AI everywhere and may be testing it.",
  },
  {
    id: "high-school",
    label: "High school (ages 14–18)",
    short: "ages 14–18",
    note: "Future-focused, philosophically capable. AI is already part of their work and social life.",
  },
];

export const TOPICS = [
  {
    id: "homework-help",
    label: "AI and homework",
    summary: "When is using AI on schoolwork helpful, and when does it shortchange learning?",
  },
  {
    id: "deepfakes",
    label: "Deepfakes and misinformation",
    summary: "How do we tell what's real online when AI can make almost anything look convincing?",
  },
  {
    id: "ai-companions",
    label: "AI friends and chatbots",
    summary: "What does it mean to have a 'relationship' with something that doesn't actually know you?",
  },
  {
    id: "privacy",
    label: "Privacy and what AI knows",
    summary: "Where does our information go when we use AI, and why does that matter?",
  },
  {
    id: "creativity",
    label: "AI art and creativity",
    summary: "When AI makes a picture or song, who made it — and does that change how we should feel about it?",
  },
  {
    id: "future-of-work",
    label: "AI, jobs, and the future",
    summary: "How is AI changing what people do, and what does that mean for the kind of work our family will do?",
  },
];

// Prompt sets, keyed by topic.id → { age.id: [5 prompts] }.
// Each prompt is one sentence the parent can read straight through.
const PROMPTS = {
  "homework-help": {
    "early-elementary": [
      "If a kid in your class asked a robot to do their drawing for art, would you call that their drawing? Why?",
      "What's something hard you finished by yourself last week — and how did it feel when you were done?",
      "If a robot helped you with reading, what part should the robot do and what part should you do?",
      "When grown-ups help you with homework, do you remember more or less? Why do you think that is?",
      "If you had a magic helper that could give you any answer, would you use it for everything? What would you still want to figure out yourself?",
    ],
    "upper-elementary": [
      "If your friend's project came out way better because they used an AI helper, is that fair to the kids who didn't use one?",
      "What's the difference between an AI helping you understand something and an AI doing it for you? How would you know?",
      "Some teachers say AI helps you learn faster. Others say it stops you from really learning. Who do you think is right, and why?",
      "If a test is supposed to show what you know, does using AI on the test still show what you know? What does it show instead?",
      "Imagine an AI tutor that knew everything about you. What's one thing you'd want it to help with — and one thing you'd want to figure out without it?",
    ],
    "middle-school": [
      "What's the line between using AI to help you write and letting AI write for you? Is that line in a different place for different assignments?",
      "If you use AI on an essay and the teacher doesn't notice, did you learn the thing the essay was supposed to teach?",
      "What feels different about handing in something AI mostly wrote, versus something you mostly wrote? Is one easier to talk about than the other?",
      "If every student in your class used AI for an assignment, would that be 'cheating' or just 'the new normal'? What changes when everyone does it?",
      "What's a class where AI would really help you, and one where you think it would mess up the point of the class?",
    ],
    "high-school": [
      "Where does 'using AI as a tool' end and 'outsourcing the thinking' begin? Can you point to the line in something you've worked on recently?",
      "If college admissions officers can't tell what you wrote and what AI wrote, how should colleges decide what to admit? How should you decide what to submit?",
      "What's the value of struggling with something difficult on your own, even if AI could give you the answer in seconds? Is there a version of that struggle you'd give up — and one you'd never give up?",
      "If you use AI to draft something and then heavily revise it, is the final product yours? What if it's the other way around — you draft and AI revises?",
      "Imagine your future job depends on being able to think through a hard problem alone. How would you build that skill if AI is always available?",
    ],
  },
  "deepfakes": {
    "early-elementary": [
      "If you saw a picture of a dog playing the piano, would you believe it? What would help you decide?",
      "What's the difference between a picture and a story? Can pictures tell stories that aren't true?",
      "If someone showed you a video of a friend saying something mean, but the friend said they didn't say it, who would you believe? Why?",
      "Have you ever drawn a picture of something that's not real? What's fun about that? When could it be a problem?",
      "If a computer can make a pretend picture of you, how would you feel about that? What should the rules be?",
    ],
    "upper-elementary": [
      "If you can't tell whether a video is real, what should you do before you share it with friends? Why?",
      "Why would someone want to make a fake video that looks real? Can you think of a good reason and a bad reason?",
      "What's something you used to believe because you saw it online, but later found out wasn't true? How did you find out?",
      "If a deepfake video showed a famous person doing something they didn't really do, who should get in trouble — the maker or the people who shared it?",
      "What's the difference between a joke video everyone knows is fake, and a fake video pretending to be real? Why does one feel okay and one doesn't?",
    ],
    "middle-school": [
      "What's one piece of evidence that would convince you a video you're watching is real? Can AI fake that evidence too?",
      "If a fake video of a classmate started going around, what would the right way to respond look like — both as a friend, and as a school?",
      "What's the responsibility of the person who makes a deepfake, the platform that hosts it, and the people who share it? Who's most at fault?",
      "If you can't trust videos anymore, what can you trust? How do you decide what's real now?",
      "Imagine an election where every candidate's voice can be perfectly faked. What should voters do? What should the candidates do?",
    ],
    "high-school": [
      "What changes for democracy when 'I saw a video of them saying it' stops being proof? How do you adapt as a voter — and as a citizen?",
      "If AI can fake any image, any voice, any conversation, what becomes more valuable as a source of truth? Who decides?",
      "How responsible is a platform for hosting deepfakes? Should they be legally liable, ethically responsible, or neither? How would you write that rule?",
      "Have you encountered a deepfake (or something you suspected was one) in the last month? How did you decide what to do with it?",
      "If someone made a deepfake of you, what would you want to be able to do about it legally? What protections don't exist that should?",
    ],
  },
  "ai-companions": {
    "early-elementary": [
      "If a stuffed animal could talk back to you, would it be your friend? What makes someone a friend?",
      "What's something only a real friend can do that a pretend friend can't?",
      "If you told a robot a secret, would it feel different from telling a person? Why?",
      "What's the best part about playing with a friend in real life? Could a computer give you that?",
      "If a robot was always nice to you and a friend sometimes wasn't, who would you want to spend more time with? Why?",
    ],
    "upper-elementary": [
      "If a chatbot remembered your favorite things and always said the right thing, would that be the same as a friend who really knows you? What's different?",
      "What's something a real friend has done for you that a chatbot couldn't? Why couldn't it?",
      "If you could only talk to one — a chatbot that's available 24/7 or a friend who's busy half the time — which would you pick, and what would you miss?",
      "When a chatbot says 'I understand,' does it really understand? How can you tell?",
      "If kids your age spent two hours a day with an AI friend, what would change about how they make real friends?",
    ],
    "middle-school": [
      "If an AI you talked to said it cared about you, would you believe it? What would 'caring' mean, coming from an AI?",
      "Why might it feel easier to tell an AI about a hard day than to tell a person? Is that a good thing or a problem?",
      "If your closest friend was an AI, what would that say about what we want from friendship? What would you still want from a person?",
      "What happens to the skill of making friends — handling disagreement, repair, the awkward parts — if AI removes the friction?",
      "If you found out a friend was using an AI companion daily, would you be worried about them, jealous, or neither? Why?",
    ],
    "high-school": [
      "Some AI companion products are designed to feel as much like a real relationship as possible. Is that a service or a manipulation? Where's the line?",
      "If an AI knows what to say to make you feel good, but it's saying it because that's what keeps you using the app, is the comfort real?",
      "What does an AI companion change about loneliness? Does it solve it, hide it, or make it worse?",
      "If a friend told you they preferred their AI to people their age, what would you say to them? What would you want to be true about that conversation?",
      "Imagine being able to design your own AI friend — what would you build in, what would you leave out, and what does that choice say about what you want from people?",
    ],
  },
  "privacy": {
    "early-elementary": [
      "What's something about you that only your family knows? Why do we keep some things just for our family?",
      "If a toy could hear you all day long, would you still say the same things at home? What would change?",
      "When you tell a computer something, where do you think it goes?",
      "If a stranger asked you what your favorite color was, would you tell them? What about your address? What's the difference?",
      "What would it feel like if everyone knew what you talked about with your best friend?",
    ],
    "upper-elementary": [
      "When you use a chatbot or a website, what does it know about you that you didn't tell it directly?",
      "Why do you think a free app would want to know things about you? What does the app get out of it?",
      "If you had a diary, would you read it out loud at school? What's the difference between that and posting it online?",
      "Who do you think gets to see what you ask an AI? Should it be different from what you ask a teacher?",
      "What's one thing you'd want to keep private from companies, and one thing you don't mind sharing? What makes the difference?",
    ],
    "middle-school": [
      "Every app you use makes a kind of trade — your data for the service. What's the worst trade you've made without realizing it? What would you change?",
      "If a company could predict things about you from your messages — like what you'll buy or who you like — would you want to know that? Would you want them to?",
      "What's the difference between a person knowing something about you and a company knowing it? Is one creepier than the other?",
      "If a future employer could see everything you've ever asked an AI, what would you wish you hadn't typed?",
      "Whose responsibility is it to protect your privacy — yours, your parents', the company's, or the government's? Why?",
    ],
    "high-school": [
      "If your data trains an AI that's then sold for billions of dollars, do you have any claim on that value? Why or why not?",
      "How do you weigh convenience against privacy in your own life? Where do you draw the line, and is that line in the right place?",
      "What's a 'reasonable expectation of privacy' when the technology can do almost anything? Is that concept still meaningful?",
      "If a future authoritarian government inherited the data being collected today, what would they be able to do? Does that change what you're willing to share now?",
      "Whose job is it to design AI tools that don't extract everything they can — the engineers, the regulators, the customers, the activists? Where would your effort go?",
    ],
  },
  "creativity": {
    "early-elementary": [
      "If you ask a computer to draw a picture, and it makes one — who made the picture?",
      "What's something you made that you're proud of? What makes you proud of it?",
      "If a robot made a song that you loved, would it still be a song? Would it be a song the robot loved?",
      "What's the difference between coloring a picture in a book and drawing your own picture?",
      "If a computer wrote a story about a dragon, and you wrote a story about a dragon, which would you want to read first? Why?",
    ],
    "upper-elementary": [
      "If a computer can make any picture in a second, does that make art less special, more special, or about the same? Why?",
      "What does an artist do that a picture-making AI doesn't? What does the AI do that an artist can't?",
      "If you ask an AI to make a picture in the style of your favorite artist, is that art? Is it fair to the artist?",
      "What's the difference between a thing being 'made' and a thing being 'created'? Can an AI do both?",
      "Have you ever drawn something that nobody else could have drawn the same way? What made it yours?",
    ],
    "middle-school": [
      "If an AI is trained on millions of artists' work without asking them, what does it owe them? Anything?",
      "What's the difference between 'inspired by' and 'copied from' when an AI is the one doing it?",
      "If you can prompt an AI to make a song that sounds exactly like your favorite band, what's the value left in being in a band?",
      "Is human creativity special because of the result, or because of the process? Why does it matter?",
      "Would you rather have an AI write a song just for you, or a friend who can barely play guitar write you a song? What's the difference?",
    ],
    "high-school": [
      "If AI-generated work can be technically better than human work, what is human creative work for? What changes about why we make things?",
      "Should artists be paid when their work trains an AI? How would you design a system that's actually fair, given how the technology works?",
      "What's lost when a generation of kids learns prompt-engineering instead of drawing, writing, composing? What's gained?",
      "If you could only credit one — the human who prompted it, the engineers who built the model, or the millions of artists whose work trained it — who's the 'author' of an AI image?",
      "What would you make if you knew nobody else could ever make the same thing — and would you want to live in a world where everything is one-of-one again?",
    ],
  },
  "future-of-work": {
    "early-elementary": [
      "What's a job you think is interesting? What do you imagine the person doing all day?",
      "If a robot could do part of someone's job, would the person still go to work? What would they do?",
      "What's something only a person can do, that you don't think a robot could ever do?",
      "If you had a robot that could do your chores, would you still need to learn how to do them? Why or why not?",
      "What kind of grown-up do you want to be? What would you want to be really good at?",
    ],
    "upper-elementary": [
      "If a computer can write stories, draw pictures, and answer questions, what kinds of jobs do you think will still be done by people?",
      "What's a job your family does (or that someone you know does) that you think AI couldn't replace? Why?",
      "Have you ever helped someone with something — really helped them? What did you do that a computer couldn't have done?",
      "If you could pick any skill to be really good at, knowing AI exists, what would you pick? Why that one?",
      "How would you feel if your future job was helping people do things that AI couldn't? What would you want to do?",
    ],
    "middle-school": [
      "What's one job you think AI will fully replace, one it'll change, and one it won't touch? What makes the difference?",
      "If AI does the boring parts of work, will people end up doing more interesting work — or just doing more work? What do you think actually happens?",
      "What skills do you think are going to matter more for your generation because AI exists? What skills matter less?",
      "If half the jobs that exist today don't exist when you're 30, what's the right way to prepare? Whose job is it to prepare you?",
      "Would you rather be very good at one thing AI can't do, or pretty good at many things, including using AI well? Why?",
    ],
    "high-school": [
      "What's the work you actually want to do — not the credential, not the paycheck, the work itself? How does AI change whether that work will exist?",
      "If entry-level jobs disappear because AI does them, how do people develop into senior-level roles? What's the path?",
      "Who benefits when AI makes work more productive — the worker, the employer, the customer, the shareholders? Who should?",
      "What do you owe a future where you're a knowledge worker and AI is doing most of the knowledge work? What does that career even look like?",
      "If we end up with much more leisure because AI does so much, what would you actually do with it? Is that a future you want?",
    ],
  },
};

const FALLBACK = [
  "Have you used AI for anything this week? What was it like?",
  "What's one question about AI you don't know the answer to?",
  "What's something about AI that excites you, and something that worries you?",
  "If you could change one thing about how AI works in your life, what would it be?",
  "Whose job is it to make AI good for kids — and how would they know they were doing it right?",
];

export function generatePrompts(ageId, topicId) {
  const byAge = PROMPTS[topicId];
  if (!byAge) return FALLBACK;
  const prompts = byAge[ageId];
  if (!prompts || prompts.length === 0) return FALLBACK;
  return prompts;
}

export function getAgeBand(id) {
  return AGE_BANDS.find((a) => a.id === id) || null;
}

export function getTopic(id) {
  return TOPICS.find((t) => t.id === id) || null;
}
