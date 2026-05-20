// Stories from teachers, administrators, and parents using The Ethical
// Educator in classrooms and at home. Surfaces on /stories.
//
// ⚠ PLACEHOLDER CONTENT ⚠
// Every entry in this file is currently a sample, marked with `placeholder: true`.
// The /stories page renders a banner explaining that real stories are being
// gathered and invites readers to submit theirs. Replace each entry with a
// real story (and drop the `placeholder: true` flag) as they come in.
//
// To add a real story:
//   1. Get permission from the educator (email or written confirmation).
//   2. Append a new entry to TESTIMONIALS or STORIES below.
//   3. Set `placeholder: false` (or omit the flag entirely).
//   4. Optionally add to src/data/whatsNew.js if it's worth highlighting.
//
// Shape:
//   testimonial: { id, quote, name, role, school, location, resource, accent, placeholder }
//   story:       { id, title, name, role, school, location, grade, subject, resource, summary, story, placeholder }

import { C } from "../theme.js";

export const TESTIMONIALS = [
  {
    id: "sample-elementary-teacher",
    quote:
      "I used The Magic Toy with my second graders on a Monday morning. Twenty minutes, and they were talking about fairness with more clarity than I'd seen from them in a month of literature discussions.",
    name: "Sample Teacher A",
    role: "2nd grade teacher",
    school: "Sample Elementary",
    location: "Pacific Northwest, US",
    resource: { label: "The Magic Toy", url: "/thought-experiments/kindergarten" },
    accent: C.teal,
    placeholder: true,
  },
  {
    id: "sample-middle-school-teacher",
    quote:
      "The teacher kit for the AI Authorship Quandary saved me a full prep period. The discussion prompts were exactly what I would have wanted to write — but I didn't have to.",
    name: "Sample Teacher B",
    role: "8th grade ELA",
    school: "Sample Middle School",
    location: "New England, US",
    resource: { label: "The AI Authorship Quandary", url: "/ai-authorship-quandary" },
    accent: C.gold,
    placeholder: true,
  },
  {
    id: "sample-administrator",
    quote:
      "Our department chair shared the AI in Education hub at our last leadership retreat. By the end of the day, we had agreed on a draft policy. Without that scaffolding, we'd have spent the meeting arguing about definitions.",
    name: "Sample Administrator",
    role: "Assistant Principal, K–8",
    school: "Sample School District",
    location: "Mid-Atlantic, US",
    resource: { label: "AI in Education hub", url: "/ai-education" },
    accent: C.ocean,
    placeholder: true,
  },
  {
    id: "sample-parent",
    quote:
      "My daughter asked me at dinner whether her AI homework helper was 'really hers.' I had no idea how to answer. The Decision Journal helped us walk through it together — I learned as much as she did.",
    name: "Sample Parent",
    role: "Parent of a 5th grader",
    location: "Texas, US",
    resource: { label: "Decision Journal", url: "/thought-experiments/journal" },
    accent: C.coral,
    placeholder: true,
  },
];

export const STORIES = [
  {
    id: "sample-story-explaining-red",
    title: "What students taught me about Mary's Room — in second grade",
    name: "Sample Teacher A",
    role: "2nd grade teacher",
    school: "Sample Elementary",
    location: "Pacific Northwest, US",
    grade: "Grade 2",
    subject: "Cross-curricular (advisory)",
    resource: { label: "Explaining Red — K–2", url: "/thought-experiments/explaining-red-k-2" },
    summary: "A new student joins the class while everyone is learning about colors. The class has to decide how to explain red to someone who has never seen it.",
    story: [
      "I ran Explaining Red on a Wednesday morning, during what's usually our short advisory block. I expected ten minutes of polite confusion and then everyone moving on. Instead, the class spent twenty-five minutes working through whether a color can be described in words at all.",
      "The most interesting moment came from a student who almost never speaks in class. He said, 'You could give her a red crayon and tell her to feel it.' Another student said that doesn't work because crayons don't feel like color, they feel like wax. A third student said maybe red is just the word for what some people see, and Ada will have her own word.",
      "I didn't moderate much. The script in the teacher kit said to let them try. They tried. By the end, no one had agreed on an answer, but every student had said something they meant — which on a normal Wednesday is not how my advisory block usually goes.",
    ],
    accent: C.teal,
    placeholder: true,
  },
  {
    id: "sample-story-ai-policy",
    title: "How we drafted a school AI policy in one afternoon",
    name: "Sample Administrator",
    role: "Assistant Principal, K–8",
    school: "Sample School District",
    location: "Mid-Atlantic, US",
    grade: "PK–8",
    subject: "Administrative",
    resource: { label: "AI in Education hub", url: "/ai-education" },
    summary: "A leadership team uses the AI in Education hub to scaffold a policy-drafting session that would normally take weeks.",
    story: [
      "We had been meaning to draft a building AI policy for six months. Every time it came up in a leadership meeting, we got stuck arguing about what generative AI even meant before we could discuss what to do about it.",
      "I shared the AI in Education foundations page in advance of our August retreat and asked the team to read just two sections: 'What AI is and what generative AI changed' and 'Realized AI.' Reading the same words gave us a shared vocabulary. The next morning we used the Policy & Ethics page as a checklist and worked through each domain (academic integrity, privacy, equity) in order.",
      "By the end of the day we had a draft we were comfortable putting in front of the board. It's not finished — the board will edit it, and we'll revisit at the semester — but for the first time in six months we have something on paper.",
    ],
    accent: C.ocean,
    placeholder: true,
  },
];

// Helpers
export function hasAnyRealStories() {
  return STORIES.some((s) => !s.placeholder) || TESTIMONIALS.some((t) => !t.placeholder);
}

export function realTestimonials() {
  return TESTIMONIALS.filter((t) => !t.placeholder);
}

export function realStories() {
  return STORIES.filter((s) => !s.placeholder);
}
