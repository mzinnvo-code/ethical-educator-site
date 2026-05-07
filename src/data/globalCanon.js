// Global Canon — a parallel section to the Western Philosophical Canon
// already on the Hub. Four traditions, each with a framing essay
// (acknowledging plurality), 4–6 named thinkers/works, and connections
// to specific scenarios in our bank.
//
// Authoring principles applied throughout:
//   - Plurality named, not flattened ("Buddhism" includes Theravada,
//     Mahayana, Zen — they disagree)
//   - Specific thinkers and primary works cited, not stereotypes
//   - Connections to scenarios in our bank — these traditions answer
//     the questions, sometimes differently
//   - Limits acknowledged — this is an introduction
//   - Modern translations and contemporary scholars where possible

export const TRADITIONS = [
  {
    id: "east-asian",
    name: "East Asian Philosophy",
    subtitle: "Confucian, Daoist, Zen — relational ethics, naturalness, practice",
    accent: "gold",
    framing: "East Asian philosophy is not one thing. The Confucian, Daoist, and Buddhist (especially Zen) traditions have argued with each other for two thousand years, and continue to. They share certain instincts: that self is constituted by relationship rather than discovered in isolation; that practice and knowledge are inseparable; that the right action often looks more like adjustment to circumstance than execution of a rule. They differ — sometimes sharply — on whether order is given (Confucian) or contrived (Daoist), whether ritual is essential (Confucian) or restrictive (Zhuangzi), whether the self exists at all (Buddhist). This section names some thinkers and texts whose views resonate with the scenarios in this bank — not to flatten the tradition into a slogan but to invite a richer engagement than Western philosophy alone provides.",
    thinkers: [
      {
        name: "Confucius (Kongzi)",
        dates: "551–479 BCE",
        work: "The Analects",
        contribution: "Argues morality is constituted in roles and relationships, not abstract principles. The good life is one that fulfills its place in family, community, and state. The 'Golden Rule' appears in the Analects 500 years before its Christian version: 'What you do not wish for yourself, do not do to others' (15.24).",
        connections: ["honesty-protection", "robot-friend-turn", "trolley-self-driving"],
      },
      {
        name: "Mencius (Mengzi)",
        dates: "c. 372–289 BCE",
        work: "The Mencius",
        contribution: "Argues human nature is inherently good — we have moral 'sprouts' that need cultivation, like a plant. Famously: anyone seeing a child about to fall into a well will feel the pull to help. (Compare to Singer's Drowning Child.)",
        connections: ["drowning-child", "magic-toy", "rules-vs-helping"],
      },
      {
        name: "Laozi (Daodejing)",
        dates: "Traditionally 6th century BCE; text c. 4th century BCE",
        work: "Daodejing (Tao Te Ching)",
        contribution: "Wu wei — 'non-action' or non-coerced action — is acting in alignment with what the situation actually requires, not imposing rules from outside. A radical critique of moral systems that try to specify the right action in advance.",
        connections: ["rules-vs-helping", "ai-policy-design", "trolley-self-driving"],
      },
      {
        name: "Zhuangzi",
        dates: "c. 369–286 BCE",
        work: "Zhuangzi",
        contribution: "The butterfly dream — Zhuangzi dreams he is a butterfly, then wakes; he can't tell if he is a man who dreamt of being a butterfly or a butterfly now dreaming of being a man. A 2,300-year-old version of Brain in a Vat and the Simulation Argument. Zhuangzi's response: the question may be the wrong question.",
        connections: ["brain-in-vat", "simulation-argument", "marys-room"],
      },
      {
        name: "Wang Yangming",
        dates: "1472–1529",
        work: "Instructions for Practical Living",
        contribution: "The unity of knowing and doing — to know something morally is to act on it; if you don't act, you don't really know. A direct challenge to anyone who treats philosophical understanding as a 'theoretical' matter divorced from practice. (Compare to the Chinese Room: Wang Yangming would say the rule-follower doesn't really know.)",
        connections: ["chinese-room", "marys-room", "experience-machine"],
      },
      {
        name: "Dōgen",
        dates: "1200–1253",
        work: "Shōbōgenzō",
        contribution: "Founder of Sōtō Zen. Argues practice itself IS enlightenment, not a means to it. To meditate is not to prepare for a future awakening — it is the awakening, in this moment. A radical re-framing of means and ends.",
        connections: ["experience-machine", "winning-game", "rules-vs-helping"],
      },
    ],
    furtherReading: [
      { title: "The Analects, trans. Edward Slingerland (Hackett, 2003)", level: "intro" },
      { title: "Bryan Van Norden, Introduction to Classical Chinese Philosophy (Hackett, 2011)", level: "intro" },
      { title: "Stephen Angle, Sagehood: The Contemporary Significance of Neo-Confucian Philosophy (Oxford, 2009)", level: "advanced" },
      { title: "Roger Ames & Henry Rosemont, The Analects of Confucius: A Philosophical Translation (Ballantine, 1999)", level: "intermediate" },
    ],
  },

  {
    id: "african",
    name: "African Philosophy",
    subtitle: "Ubuntu, Maat, contemporary critique — communal personhood, justice, decolonial thought",
    accent: "coral",
    framing: "African philosophy spans more than three thousand years and a continent. Ancient Egyptian thought articulated Ma'at — truth, justice, and cosmic balance — millennia before the Greeks. Sub-Saharan traditions developed Ubuntu, the idea that personhood is constituted by relationship: 'I am because we are.' Contemporary African philosophers have sharpened these traditions in dialogue with — and often in resistance to — Western philosophy and its colonial uses. This section is not 'African philosophy in three paragraphs.' It is an invitation. Where the Western philosophical canon makes the autonomous individual its starting point, these traditions often start with the relational self, the community, or the cosmic order. That difference shows up everywhere in the scenarios in this bank.",
    thinkers: [
      {
        name: "Ma'at (Ancient Egyptian)",
        dates: "c. 2700 BCE onward",
        work: "Pyramid Texts; Book of the Dead; Wisdom of Ptahhotep",
        contribution: "Ma'at is the principle of truth, justice, balance, and cosmic order, personified as a goddess. The good life is one in alignment with Ma'at; the wicked are weighed against the feather of Ma'at after death. A philosophical-religious tradition pre-dating Plato by 2,000 years that takes JUSTICE as the structure of reality, not as a human convention.",
        connections: ["veil-of-ignorance", "ring-of-gyges", "tragedy-commons"],
      },
      {
        name: "John Mbiti",
        dates: "1931–2019",
        work: "African Religions and Philosophy (1969)",
        contribution: "Articulated Ubuntu philosophy: 'I am because we are.' Personhood is not given by individual existence but achieved through relationship and community. The contrast with Cartesian 'I think, therefore I am' is direct and intentional.",
        connections: ["honesty-protection", "robot-pet-goodbye", "ai-friend-feelings", "veil-of-ignorance"],
      },
      {
        name: "Ifeanyi Menkiti",
        dates: "1940–2019",
        work: "\"Person and Community in African Traditional Thought\" (1984)",
        contribution: "Argues African personhood is not given at birth but earned through participation in community. A position that contrasts sharply with Western liberal individualism and challenges Lockean memory-based identity.",
        connections: ["ship-of-theseus-robot", "robot-pet-goodbye", "ai-friend-feelings"],
      },
      {
        name: "Kwame Gyekye",
        dates: "1939–2019",
        work: "Tradition and Modernity: Philosophical Reflections on the African Experience (1997)",
        contribution: "A 'moderate communitarianism' that holds individuals are constituted by their communities AND retain genuine moral autonomy. Pushes back against Menkiti — argues full personhood is innate, while community SHAPES rather than CONSTITUTES it.",
        connections: ["veil-of-ignorance", "ring-of-gyges", "honesty-protection"],
      },
      {
        name: "Achille Mbembe",
        dates: "born 1957",
        work: "Necropolitics (2003); Critique of Black Reason (2013)",
        contribution: "Develops 'necropolitics' — the political power to dictate how some people live and die. Profoundly relevant to AI surveillance, facial recognition, predictive policing, and algorithmic decisions about whose lives are weighed against whose.",
        connections: ["school-surveillance", "biased-resume-ai", "biased-admissions", "omelas"],
      },
      {
        name: "Sylvia Wynter",
        dates: "born 1928",
        work: "\"Unsettling the Coloniality of Being/Power/Truth/Freedom\" (2003)",
        contribution: "Argues the very category of 'the human' as constructed in Western philosophy is racialized. A challenge to the universalism of any philosophical thought experiment that assumes a generic 'we' or 'a person.'",
        connections: ["veil-of-ignorance", "marys-room", "chinese-room"],
      },
    ],
    furtherReading: [
      { title: "Kwasi Wiredu (ed.), A Companion to African Philosophy (Blackwell, 2004)", level: "intermediate" },
      { title: "Bryan Van Norden, Taking Back Philosophy: A Multicultural Manifesto (Columbia, 2017)", level: "intro" },
      { title: "Achille Mbembe, Necropolitics (Duke, 2019)", level: "advanced" },
      { title: "Souleymane Bachir Diagne, Bergson Postcolonial: L'élan vital dans la pensée de Léopold Sédar Senghor et de Mohamed Iqbal (2011)", level: "advanced" },
    ],
  },

  {
    id: "south-asian",
    name: "South Asian Philosophy",
    subtitle: "Buddhist, Hindu, Jain — non-self, dharma, non-violence, logic",
    accent: "teal",
    framing: "South Asian philosophy contains some of the oldest sustained philosophical argument in the world — and is one of the most internally pluralistic traditions on the planet. The orthodox Hindu schools (Nyāya, Vaiśeṣika, Sāṃkhya, Yoga, Mīmāṃsā, Vedānta) argue with the heterodox schools (Buddhism, Jainism, Cārvāka materialism). Within Buddhism, Theravāda, Mahāyāna, and Vajrayāna disagree fundamentally about emptiness, the bodhisattva path, and the nature of awakening. Within Jainism, the doctrine of anekāntavāda — multi-sidedness — is itself a philosophical position about how truth works. To engage these traditions seriously requires acknowledging that 'Eastern philosophy says X' is almost always wrong; some school says X, some other school disagrees, and a third school argues both have missed the point. This section names some of the schools and figures whose views speak directly to the scenarios in this bank.",
    thinkers: [
      {
        name: "Nāgārjuna",
        dates: "c. 150–250 CE",
        work: "Mūlamadhyamakakārikā (Fundamental Verses on the Middle Way)",
        contribution: "Founder of the Madhyamaka school of Mahāyāna Buddhism. Argues all phenomena are empty (śūnya) of inherent existence — they exist only in dependence on conditions. The 'two truths' doctrine distinguishes conventional from ultimate truth, with profound implications for what 'reality' even means. (Compare to the Simulation Argument and Brain in a Vat.)",
        connections: ["brain-in-vat", "simulation-argument", "marys-room", "ship-of-theseus-robot"],
      },
      {
        name: "The Bhagavad Gita",
        dates: "Composed c. 5th–2nd century BCE",
        work: "Book VI of the Mahābhārata",
        contribution: "Arjuna stands on a battlefield about to fight relatives. He can't bring himself to kill them. Krishna's response is one of the great dialogues on dharma — duty under impossible choice. The Gita is, among other things, a deeply considered Trolley Problem: when killing is forced upon you, what should you do, and how should you do it?",
        connections: ["trolley-self-driving", "autonomous-car-rider", "drowning-child", "rules-vs-helping"],
      },
      {
        name: "Buddhist anatta (non-self)",
        dates: "Doctrine taught from 5th century BCE onward",
        work: "The Pali Canon; especially the Anattalakkhana Sutta",
        contribution: "There is no permanent, unchanging self. What we call 'I' is a stream of momentary processes — sensation, perception, mental formation, consciousness — none of which constitutes an enduring identity. A radical alternative to Lockean memory-based identity and Cartesian subjects.",
        connections: ["ship-of-theseus-robot", "brain-in-vat", "ring-of-gyges", "experience-machine"],
      },
      {
        name: "Ahimsa (non-violence) across traditions",
        dates: "Articulated across Jain, Buddhist, and Hindu sources",
        work: "Tattvārtha Sūtra (Jain); various Buddhist sources; Yoga Sūtras of Patañjali",
        contribution: "Jainism in particular develops ahimsa as the most fundamental ethical principle — extending moral consideration to all sentient beings, including microscopic life. The Jain commitment is more demanding than most Western ethical traditions and has direct relevance to debates about animal ethics, AI moral status, and the Trolley Problem's underlying premise that some lives count.",
        connections: ["trolley-self-driving", "magic-toy", "robot-pet-goodbye", "drowning-child"],
      },
      {
        name: "Nyāya school",
        dates: "Foundational text c. 2nd century CE",
        work: "Nyāya Sūtras (Akṣapāda Gautama); commentaries by Vātsyāyana, Uddyotakara, others",
        contribution: "A sophisticated Indian school of logic and epistemology. Develops a fourfold theory of valid knowledge sources (pramāṇas): perception, inference, comparison, testimony. Detailed treatment of how doubt is resolved by evidence — relevant to skeptical scenarios like Brain in a Vat.",
        connections: ["brain-in-vat", "simulation-argument", "liar-paradox", "sorites-heap"],
      },
      {
        name: "Anekāntavāda (Jain multi-sidedness)",
        dates: "Articulated c. 6th century BCE onward",
        work: "Tattvārtha Sūtra and later Jain commentaries",
        contribution: "The doctrine that any object or claim has multiple aspects, and any single perspective captures only some of them. Truth is genuinely multi-faceted; humility about one's own viewpoint is a metaphysical, not just ethical, principle. A direct contribution to dialogue practice — anyone facilitating a Socratic seminar should know this view.",
        connections: ["liar-paradox", "veil-of-ignorance", "trolley-self-driving"],
      },
    ],
    furtherReading: [
      { title: "Jay Garfield, The Fundamental Wisdom of the Middle Way (Oxford, 1995)", level: "intermediate" },
      { title: "Stephen Phillips, Classical Indian Metaphysics (Open Court, 1995)", level: "advanced" },
      { title: "Bina Gupta, An Introduction to Indian Philosophy (Routledge, 2012)", level: "intro" },
      { title: "Ganeri Jonardon, Philosophy in Classical India (Routledge, 2001)", level: "intermediate" },
    ],
  },

  {
    id: "indigenous",
    name: "Indigenous Philosophies",
    subtitle: "Relationality, place, multiple knowledge systems, decolonization",
    accent: "ocean",
    framing: "There is no single 'Indigenous philosophy.' There are hundreds of distinct philosophical traditions among the Indigenous peoples of Turtle Island (North America), Abya Yala (South America), Aboriginal Australia, Aotearoa (New Zealand), the Pacific, the Arctic, and beyond. What many share: a starting point in relationship and place rather than the abstract individual; a treatment of knowledge as embodied, situational, and bound to community; a critical stance toward Western philosophy's claim to universality. This section names some contemporary Indigenous philosophers whose work speaks directly to scenarios in our bank — particularly the AI ethics scenarios, where questions of data sovereignty, surveillance, and whose knowledge counts are urgent. To engage these traditions seriously requires reading actual Indigenous thinkers — not Western reconstructions.",
    thinkers: [
      {
        name: "Vine Deloria Jr. (Standing Rock Sioux)",
        dates: "1933–2005",
        work: "God Is Red (1973); The Metaphysics of Modern Existence (1979)",
        contribution: "Argues that abstract universal claims (which Western philosophy specializes in) are a poor substitute for situated knowledge of relationship and place. Religion is bound to land, and ethics to relationship. A challenge to the entire 'view from nowhere' philosophical method.",
        connections: ["veil-of-ignorance", "platos-cave", "tragedy-commons"],
      },
      {
        name: "Linda Tuhiwai Smith (Ngāti Awa, Ngāti Porou — Māori)",
        dates: "born 1950",
        work: "Decolonizing Methodologies: Research and Indigenous Peoples (1999, 3rd ed. 2021)",
        contribution: "Argues that 'research,' as Western universities practice it, has been a tool of colonization — extracting knowledge from Indigenous communities, framing them as objects of study, then publishing for outside academic audiences. A foundational text for thinking about whose knowledge counts and on what terms.",
        connections: ["school-surveillance", "biased-admissions", "biased-resume-ai"],
      },
      {
        name: "Albert Marshall (Mi'kmaq) — Two-Eyed Seeing",
        dates: "born 1939",
        work: "\"Two-Eyed Seeing\" (Etuaptmumk) — articulated through ongoing collaborations",
        contribution: "Etuaptmumk — 'Two-Eyed Seeing' — is the practice of holding Indigenous knowledge systems and Western scientific knowledge systems together, drawing strength from each, and refusing to subordinate one to the other. Profoundly relevant to AI ethics: whose epistemology gets encoded in the algorithm?",
        connections: ["platos-cave", "marys-room", "chinese-room", "school-surveillance"],
      },
      {
        name: "Indigenous data sovereignty (CARE principles)",
        dates: "Articulated 2018 onward",
        work: "Global Indigenous Data Alliance (GIDA), CARE Principles for Indigenous Data Governance",
        contribution: "CARE: Collective benefit, Authority to control, Responsibility, Ethics. A framework for Indigenous governance of data about Indigenous peoples — and a critique of the 'open data' movement, which often flattens questions of consent and control. Directly relevant to AI training data, surveillance, and biased-algorithm scenarios.",
        connections: ["school-surveillance", "biased-resume-ai", "biased-admissions", "deepfake-election"],
      },
      {
        name: "Aboriginal Australian Songlines",
        dates: "Tens of thousands of years; documented from 19th century onward",
        work: "Bruce Pascoe, Dark Emu (2014); Bill Gammage, The Biggest Estate on Earth (2011)",
        contribution: "Songlines are simultaneously navigation, history, ethics, ecology, and law — knowledge that is embodied, sung, walked, danced, and bound to specific country. Knowledge cannot be extracted from place. A radical challenge to the modern notion of 'information' as portable, decontextualized data.",
        connections: ["chinese-room", "marys-room", "tragedy-commons"],
      },
      {
        name: "Robin Wall Kimmerer (Citizen Potawatomi Nation)",
        dates: "born 1953",
        work: "Braiding Sweetgrass: Indigenous Wisdom, Scientific Knowledge, and the Teachings of Plants (2013)",
        contribution: "Holds Indigenous and scientific botanical knowledge in productive tension. Argues that the 'grammar of animacy' — treating non-human life as kin rather than as resource — is itself an ethical and epistemic stance. Relevant to debates about AI moral status, the moral standing of robot pets, and the Tragedy of the Commons.",
        connections: ["robot-pet-goodbye", "magic-toy", "tragedy-commons", "ai-friend-feelings"],
      },
    ],
    furtherReading: [
      { title: "Vine Deloria Jr., Spirit and Reason (Fulcrum, 1999)", level: "intermediate" },
      { title: "Linda Tuhiwai Smith, Decolonizing Methodologies (3rd ed., Zed Books, 2021)", level: "intro" },
      { title: "Robin Wall Kimmerer, Braiding Sweetgrass (Milkweed, 2013)", level: "intro" },
      { title: "Bagele Chilisa, Indigenous Research Methodologies (SAGE, 2nd ed. 2019)", level: "advanced" },
    ],
  },
];

// Convenience helpers
export const TRADITION_BY_ID = Object.fromEntries(TRADITIONS.map(t => [t.id, t]));

export function getTraditionsByScenario(scenarioId) {
  // Returns traditions that name this scenario as relevant
  const result = [];
  TRADITIONS.forEach(t => {
    const matchingThinkers = t.thinkers.filter(th => th.connections?.includes(scenarioId));
    if (matchingThinkers.length > 0) {
      result.push({ tradition: t, thinkers: matchingThinkers });
    }
  });
  return result;
}
