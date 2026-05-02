# Thought Experiment Illustrations

Each scenario in `src/data/experiments.js` can display a generated illustration from this folder.
If a file is missing or fails to load, the card components fall back to the experiment's `emoji`
field so the site still works.

## Style guide

- **Aspect:** 1:1 (square) for card art; wide landscape for hero art.
- **Format:** PNG.
- **Palette:** Warm, painterly. Match the impressionist beach palette in `src/theme.js`:
  midnight blues (#0b1622, #1a5a8a), teal (#1a8a7a), gold (#c89830), coral (#c07040),
  sand (#d4b868). Avoid harsh whites — use the off-white #e0dcd0.
- **Tone:** Inviting, mildly whimsical for K–5; more painterly/serious for 9–12. Never cartoony or cheap.
- **Subjects:** Symbolic rather than literal where possible (a glowing ring on a velvet cloth, not a
  cartoon kid wearing a ring). Avoid faces/identifiable people. No text or labels in the image.

## Slots needed

### K–5
| Slug | Subject | Emoji fallback |
|---|---|---|
| `magic-toy.png` | A talking stuffed bear with a small electronic glow | 🧸 |
| `invisible-ring.png` | A ring on velvet, with a soft mist suggesting invisibility | 💍 |
| `robot-friend-turn.png` | A small friendly robot beside two reaching hands | 🤖 |
| `honesty-protection.png` | A snapped wooden pencil on a desk | ✏️ |
| `robot-pet.png` | A small robot dog at rest, light dimmed | 🐶 |
| `ai-art.png` | A painting palette beside a glowing screen | 🎨 |
| `messy-robot.png` | A cleaning robot beside an absurd pile of crumpled paper | 🧹 |
| `rules-vs-helping.png` | A finger-to-lips silhouette with a puzzle piece offered | 🤫 |
| `rude-toy.png` | A speech bubble with a star where a rude word would be | 🗣️ |
| `winning-game.png` | A controller with a confetti burst | 🎮 |

### 6–8
| Slug | Subject | Emoji fallback |
|---|---|---|
| `trolley.png` | A stylized trolley at a track switch, two paths forking | 🚋 |
| `ship-of-theseus.png` | A weathered wooden ship beside identical replacement planks | ⚙️ |
| `brain-in-vat.png` | A glowing translucent jar with cables, glass dome | 🧠 |
| `sorites.png` | A small heap of sand grains, light-and-shadow study | 🏖️ |
| `commons.png` | A wide pasture under sky, several dark cow silhouettes | 🐄 |
| `liar.png` | An infinite spiral or Mobius-strip motif | 🌀 |
| `deepfake.png` | Two identical faces, one slightly distorted | 🎭 |
| `biased-ai.png` | A clipboard of resumes, one highlighted, others greyed | 📋 |
| `autonomous-car.png` | A rain-slicked road from a car windshield POV | 🚗 |
| `veil.png` | A figure draped in a translucent veil, gesturing | 🎭 |

### 9–12 / Canon
| Slug | Subject | Emoji fallback |
|---|---|---|
| `cave.png` | A cave mouth with bright light beyond, prisoners in silhouette | 🕳️ |
| `marys-room.png` | A black-and-white room with a single open door bursting with color | 🌈 |
| `chinese-room.png` | A door with Chinese characters slipping under it, a rule book inside | 🀄 |
| `experience-machine.png` | A reclining chair connected to glowing cables, sunset window | 🎰 |
| `gyges.png` | A shepherd's hand emerging from a tomb cleft holding a ring | 💍 |
| `omelas.png` | An ornate city skyline with one dim cellar window | 🏛️ |
| `drowning-child.png` | A small shoe at the edge of a still pond | 💧 |
| `paperclip.png` | An expanse of paperclips stretching to the horizon | 📎 |
| `ai-in-box.png` | A simple wooden cube glowing from within | 📦 |
| `simulation.png` | A nested set of frames — screen within screen | 🌐 |

### For Educators
| Slug | Subject | Emoji fallback |
|---|---|---|
| `surveillance.png` | A security camera beside a row of empty desks | 🛰️ |
| `false-positive.png` | An exclamation mark over a stack of essays | 🚨 |
| `ai-policy.png` | A traffic light beside a syllabus document | 🚦 |
| `grading.png` | A red pen and a glowing screen side by side | 📝 |
| `admissions.png` | A graduation cap with a sorting algorithm flowchart | 🎓 |
| `ai-friend.png` | A chat bubble beside an empty chair at a window | 💬 |

## How to add an image

1. Generate or commission the PNG at the slug listed above.
2. Drop it in this directory.
3. Vite will pick it up automatically — no code changes needed. The fallback emoji
   stops appearing for that scenario as soon as the file exists.
