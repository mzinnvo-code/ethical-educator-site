# Wonder Workshop — Asset Wishlist

Everything in the current build runs on the existing 49 sprites plus
code-drawn pixel UI, so nothing here is blocking. These are the bespoke
raster assets that would push the experience further, with ready-to-use
generation prompts. Keep every image consistent with the existing art:
16-bit pixel art, crisp pixels (no anti-aliased smoothing), warm-on-dark
palette from `src/theme.js`:

- background `#0b1622` / surface `#12253d`
- gold `#c89830`, coral `#c07040`, teal `#1a8a7a`, ocean `#1a5a8a`, sky `#2a88c0`
- cream text `#e0dcd0`

Reference look: `public/experiment-scenes/progress-room-k5/workshop-room-4.webp`
(the bright tier) and `ari-invite-08.webp` (Ari's proportions).

## 1. Adventure map zone terrain tiles (6)

Replace each zone band's flat gradient with a parallax terrain strip.
Target: `public/experiment-scenes/adventure-map-k5/zone-<id>.webp`, 1664×476
(2× of the 832×238 band), per grade:

| Zone | Accent | Prompt seed |
|---|---|---|
| K | coral `#c07040` | "16-bit pixel art side-scrolling terrain strip, cozy toy-block meadow at dusk, soft hills of wooden blocks and plush toys, tiny lanterns, palette #0b1622 background #c07040 accents #c89830 highlights, crisp 8px pixel grid, no characters, no text" |
| 1 | gold `#c89830` | same base, "honey-lantern orchard with paper kites" |
| 2 | teal `#1a8a7a` | same base, "tide-pool boardwalk with glowing jars" |
| 3 | ocean `#1a5a8a` | same base, "library canyon with floating books and ladders" |
| 4 | sky `#2a88c0` | same base, "observatory ridge with telescopes and weather vanes" |
| 5 | teal `#1a8a7a` | same base, "bridge town over a calm river, warm windows" |

Integration: `AdventureMap.jsx` zone band `background` (cover, `image-rendering: pixelated`).

## 2. Memento sprites (24)

Today mementos are the story emoji on a code-drawn plinth. Bespoke 64×64
sprites (target `public/experiment-scenes/progress-room-k5/mementos/<experiment-id>.webp`,
transparent background) would make shelves feel hand-placed. Prompt template:

> "16-bit pixel art game item icon, 64x64, {OBJECT}, warm gold rim light,
> palette #c89830 #c07040 #1a8a7a on transparent background, crisp pixels,
> single object, no text"

{OBJECT} per story — e.g. magic-toy: "small plush robot toy with a heart
light"; gps-shortcut: "tiny brass compass with a glowing needle";
ai-grading-mistake: "graded paper with a gold star sticker", etc.
Integration: swap the emoji `<span>` in `MementoSlot` for an `<img>` keyed by
experiment id (keep emoji as fallback).

## 3. Ari celebration pose sheet (6–8 frames)

A jump-and-cheer loop for the CelebrationOverlay (Ari currently doesn't
appear there). Target
`public/experiment-scenes/progress-room-k5/ari-cheer-00..07.webp`, 360×360,
transparent, same proportions/baseline as `ari-invite-*` (tests enforce a
fixed baseline — reuse "anchored portrait, feet on a fixed ground line").

> "16-bit pixel art sprite frame, young inventor girl with dark curly hair,
> goggles on forehead, teal jacket, jumping with both arms raised in
> celebration, frame {N} of 8 of a cheer loop, 360x360, transparent
> background, feet anchored to a consistent baseline, crisp pixels"

## 4. Map decorations (sprite set)

Small scatter sprites for the trail: wooden signpost (per-grade flag), pixel
bush, lantern post, footprint pair, tiny flag for completed zones. 32×32 or
48×48, transparent. Sprinkle along `wonder-map-rail` at fixed offsets.

## 5. Workshop shelf close-up backdrops (2)

A zoomed "shelf detail" pane for a future memento-inspection view: warm
wooden shelf with empty slots, 1280×400, one dim + one lit variant.

## 6. Door-knock idle animation (3 frames)

The door button currently sits still until hovered. A 3-frame "key glints,
door breathes" micro-loop (240×240, matching `progress-door-closed.webp`)
would make the call-to-action feel alive without motion overload.

---

### Audio (generated, not drawn)

`npm run audio:workshop` (needs `ELEVENLABS_API_KEY` in `.env.local`)
generates all 12 SFX + the ambience loop listed in
`scripts/generate-workshop-audio.mjs` — prompts are tuned and cached by
hash, so re-running only fills gaps. Until then the WebAudio synth cues
play everywhere automatically.
