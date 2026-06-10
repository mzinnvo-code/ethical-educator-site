# Wonder Workshop — Art Generation Sheet

Generate each image below in the ChatGPT app, download it, rename it to the
exact filename shown, and drop it into the `art-drop/` folder at the repo
root. Then run `npm run art:ingest` — slicing, alignment, resizing, and
format conversion are all automatic, and you'll get a validation report.

Tips: ask ChatGPT for a **PNG with a fully transparent background** when the
prompt says so (if it returns a checkerboard or solid background anyway, the
ingest step can usually rescue it). If one cell of a grid comes out wrong,
just regenerate that whole sheet — ingestion is repeatable.

## Core set (13 images)

### `art-drop/room-tier-4.png`

- [ ] Image size to request: **1536 × 1024** (landscape)
- Generate this one FIRST.

```
16-bit pixel art, crisp clean pixels, warm-on-dark palette: deep navy background #0b1622, surface navy #12253d, gold #c89830, coral #c07040, teal #1a8a7a, ocean blue #1a5a8a, sky blue #2a88c0, cream #e0dcd0. No text, no watermarks, no signatures. Interior of a cozy young inventor's workshop. Fully awake and glowing: every lamp lit, golden string lights on, warm light pouring from a large round window showing a starry night, rich warm wood, cozy magical inventor's workshop for children. Composition (important): a single back-wall interior view, 16:9. TWO long empty wooden shelves on the UPPER LEFT wall spanning 7%-30% of the image width, hung at 9% and 20% of the image height, and TWO matching empty shelves mirrored on the UPPER RIGHT wall (70%-93% width, same two heights). Across the MIDDLE of the back wall, SEVEN small empty round wooden display mounts with subtle gold rims in a gentle zig-zag (alternating lower and higher) between 45% and 66% of the image height, at roughly 18%, 31%, 43%, 55%, 68%, and 79% of the width, plus one slightly larger mount centered at 50% width and 31% height, above the others. A low, empty wooden display ledge runs along the floor at 85% of the image height across the full width. Keep every shelf, mount, and the floor ledge completely EMPTY and uncluttered — they will hold game items. No characters.
```

### `art-drop/room-tier-3.png`

- [ ] Image size to request: **1536 × 1024** (landscape)
- Generate by EDITING the room-tier-4 result in the same chat: "Same exact room, same camera and layout, but change the lighting: Mostly awake: about half the lamps lit, warm but with soft shadowed corners, string lights glowing gently."

```
16-bit pixel art, crisp clean pixels, warm-on-dark palette: deep navy background #0b1622, surface navy #12253d, gold #c89830, coral #c07040, teal #1a8a7a, ocean blue #1a5a8a, sky blue #2a88c0, cream #e0dcd0. No text, no watermarks, no signatures. Interior of a cozy young inventor's workshop. Mostly awake: about half the lamps lit, warm but with soft shadowed corners, string lights glowing gently. Composition (important): a single back-wall interior view, 16:9. TWO long empty wooden shelves on the UPPER LEFT wall spanning 7%-30% of the image width, hung at 9% and 20% of the image height, and TWO matching empty shelves mirrored on the UPPER RIGHT wall (70%-93% width, same two heights). Across the MIDDLE of the back wall, SEVEN small empty round wooden display mounts with subtle gold rims in a gentle zig-zag (alternating lower and higher) between 45% and 66% of the image height, at roughly 18%, 31%, 43%, 55%, 68%, and 79% of the width, plus one slightly larger mount centered at 50% width and 31% height, above the others. A low, empty wooden display ledge runs along the floor at 85% of the image height across the full width. Keep every shelf, mount, and the floor ledge completely EMPTY and uncluttered — they will hold game items. No characters.
```

### `art-drop/room-tier-2.png`

- [ ] Image size to request: **1536 × 1024** (landscape)
- Generate by EDITING the room-tier-4 result in the same chat: "Same exact room, same camera and layout, but change the lighting: Waking up: only the workbench lamp and window glow are lit, the rest of the room in soft blue dusk."

```
16-bit pixel art, crisp clean pixels, warm-on-dark palette: deep navy background #0b1622, surface navy #12253d, gold #c89830, coral #c07040, teal #1a8a7a, ocean blue #1a5a8a, sky blue #2a88c0, cream #e0dcd0. No text, no watermarks, no signatures. Interior of a cozy young inventor's workshop. Waking up: only the workbench lamp and window glow are lit, the rest of the room in soft blue dusk. Composition (important): a single back-wall interior view, 16:9. TWO long empty wooden shelves on the UPPER LEFT wall spanning 7%-30% of the image width, hung at 9% and 20% of the image height, and TWO matching empty shelves mirrored on the UPPER RIGHT wall (70%-93% width, same two heights). Across the MIDDLE of the back wall, SEVEN small empty round wooden display mounts with subtle gold rims in a gentle zig-zag (alternating lower and higher) between 45% and 66% of the image height, at roughly 18%, 31%, 43%, 55%, 68%, and 79% of the width, plus one slightly larger mount centered at 50% width and 31% height, above the others. A low, empty wooden display ledge runs along the floor at 85% of the image height across the full width. Keep every shelf, mount, and the floor ledge completely EMPTY and uncluttered — they will hold game items. No characters.
```

### `art-drop/room-tier-1.png`

- [ ] Image size to request: **1536 × 1024** (landscape)
- Generate by EDITING the room-tier-4 result in the same chat: "Same exact room, same camera and layout, but change the lighting: Barely waking: a single candle on the workbench, deep blue dusk, faint moonlight through the window."

```
16-bit pixel art, crisp clean pixels, warm-on-dark palette: deep navy background #0b1622, surface navy #12253d, gold #c89830, coral #c07040, teal #1a8a7a, ocean blue #1a5a8a, sky blue #2a88c0, cream #e0dcd0. No text, no watermarks, no signatures. Interior of a cozy young inventor's workshop. Barely waking: a single candle on the workbench, deep blue dusk, faint moonlight through the window. Composition (important): a single back-wall interior view, 16:9. TWO long empty wooden shelves on the UPPER LEFT wall spanning 7%-30% of the image width, hung at 9% and 20% of the image height, and TWO matching empty shelves mirrored on the UPPER RIGHT wall (70%-93% width, same two heights). Across the MIDDLE of the back wall, SEVEN small empty round wooden display mounts with subtle gold rims in a gentle zig-zag (alternating lower and higher) between 45% and 66% of the image height, at roughly 18%, 31%, 43%, 55%, 68%, and 79% of the width, plus one slightly larger mount centered at 50% width and 31% height, above the others. A low, empty wooden display ledge runs along the floor at 85% of the image height across the full width. Keep every shelf, mount, and the floor ledge completely EMPTY and uncluttered — they will hold game items. No characters.
```

### `art-drop/room-tier-0.png`

- [ ] Image size to request: **1536 × 1024** (landscape)
- Generate by EDITING the room-tier-4 result in the same chat: "Same exact room, same camera and layout, but change the lighting: Asleep: no lamps lit at all, dark slate-blue room lit only by pale moonlight through the window, peaceful and quiet, details still readable in the gloom."

```
16-bit pixel art, crisp clean pixels, warm-on-dark palette: deep navy background #0b1622, surface navy #12253d, gold #c89830, coral #c07040, teal #1a8a7a, ocean blue #1a5a8a, sky blue #2a88c0, cream #e0dcd0. No text, no watermarks, no signatures. Interior of a cozy young inventor's workshop. Asleep: no lamps lit at all, dark slate-blue room lit only by pale moonlight through the window, peaceful and quiet, details still readable in the gloom. Composition (important): a single back-wall interior view, 16:9. TWO long empty wooden shelves on the UPPER LEFT wall spanning 7%-30% of the image width, hung at 9% and 20% of the image height, and TWO matching empty shelves mirrored on the UPPER RIGHT wall (70%-93% width, same two heights). Across the MIDDLE of the back wall, SEVEN small empty round wooden display mounts with subtle gold rims in a gentle zig-zag (alternating lower and higher) between 45% and 66% of the image height, at roughly 18%, 31%, 43%, 55%, 68%, and 79% of the width, plus one slightly larger mount centered at 50% width and 31% height, above the others. A low, empty wooden display ledge runs along the floor at 85% of the image height across the full width. Keep every shelf, mount, and the floor ledge completely EMPTY and uncluttered — they will hold game items. No characters.
```

### `art-drop/badges-sheet.png`

- [ ] Image size to request: **1024 × 1024** (landscape) — 3×3 grid

```
16-bit pixel art, crisp clean pixels, warm-on-dark palette: deep navy background #0b1622, surface navy #12253d, gold #c89830, coral #c07040, teal #1a8a7a, ocean blue #1a5a8a, sky blue #2a88c0, cream #e0dcd0. No text, no watermarks, no signatures. A 3x3 grid of game achievement badges on a FULLY TRANSPARENT background (alpha PNG), with clear empty gutters between cells and nothing touching cell edges. Every badge is an IDENTICAL round gold-rimmed medallion with a deep navy inner field, identical diameter (about 75% of its cell), perfectly centered in its cell. Only the small icon in the middle differs. Row 1: a tiny gold spark-star bursting to life; an open storybook with glowing pages; a warm pink heart with a small gold gear inside. Row 2: a bold teal question mark with a tiny magnifying glass; a balanced golden scale; a circular golden arrow looping around a small star. Row 3: a tiny trail map with a planted victory flag; then leave the last two cells completely empty.
```

### `art-drop/mementos-sheet-1.png`

- [ ] Image size to request: **1024 × 1024** (landscape) — 3×3 grid

```
16-bit pixel art, crisp clean pixels, warm-on-dark palette: deep navy background #0b1622, surface navy #12253d, gold #c89830, coral #c07040, teal #1a8a7a, ocean blue #1a5a8a, sky blue #2a88c0, cream #e0dcd0. No text, no watermarks, no signatures. A 3x3 grid of tiny game item icons on a FULLY TRANSPARENT background (alpha PNG), clear empty gutters, nothing touching cell edges. Each cell holds ONE small object at the SAME scale, centered, with a warm gold rim light. Cell 1: a small plush robot toy with a glowing heart light on its chest. Cell 2: a friendly round blue toy robot with big happy eyes. Cell 3: a tiny robot puppy with a wagging antenna tail. Cell 4: a toy broom leaning on a paint-splattered bucket. Cell 5: a silver ring with a faint magical shimmer. Cell 6: a golden pencil crossed with a small heart-shaped shield. Cell 7: a grumpy wind-up toy robot with crossed arms. Cell 8: a game controller with a gold star button. Leave the last cell completely empty.
```

### `art-drop/mementos-sheet-2.png`

- [ ] Image size to request: **1024 × 1024** (landscape) — 3×3 grid

```
16-bit pixel art, crisp clean pixels, warm-on-dark palette: deep navy background #0b1622, surface navy #12253d, gold #c89830, coral #c07040, teal #1a8a7a, ocean blue #1a5a8a, sky blue #2a88c0, cream #e0dcd0. No text, no watermarks, no signatures. A 3x3 grid of tiny game item icons on a FULLY TRANSPARENT background (alpha PNG), clear empty gutters, nothing touching cell edges. Each cell holds ONE small object at the SAME scale, centered, with a warm gold rim light. Cell 1: an artist's palette with a glowing magic paintbrush. Cell 2: a wooden signpost with a small red heart sign. Cell 3: a smiling round robot face inside a speech bubble. Cell 4: two identical small teddy bears sitting side by side. Cell 5: a feather quill writing on a softly glowing page. Cell 6: a brass compass with a glowing teal needle. Cell 7: a framed photograph with magic sparkles in one corner. Cell 8: a small balance scale weighing two books. Leave the last cell completely empty.
```

### `art-drop/mementos-sheet-3.png`

- [ ] Image size to request: **1024 × 1024** (landscape) — 3×3 grid

```
16-bit pixel art, crisp clean pixels, warm-on-dark palette: deep navy background #0b1622, surface navy #12253d, gold #c89830, coral #c07040, teal #1a8a7a, ocean blue #1a5a8a, sky blue #2a88c0, cream #e0dcd0. No text, no watermarks, no signatures. A 3x3 grid of tiny game item icons on a FULLY TRANSPARENT background (alpha PNG), clear empty gutters, nothing touching cell edges. Each cell holds ONE small object at the SAME scale, centered, with a warm gold rim light. Cell 1: a magnifying glass held over two different paper scrolls. Cell 2: a tiny toy traffic light glowing green and red at once. Cell 3: a small toy trolley tram on a curved wooden track. Cell 4: a glass test tube with a gold prize ribbon tied around it. Cell 5: a chat-bubble charm with a question mark inside. Cell 6: an open notebook with a glowing lightbulb floating above it. Cell 7: a toy robot teacher holding a slightly tilted balance scale. Cell 8: a graded paper with a shiny gold star sticker. Leave the last cell completely empty.
```

### `art-drop/brain-states-sheet.png`

- [ ] Image size to request: **1536 × 1024** (landscape) — 3×2 grid

```
16-bit pixel art, crisp clean pixels, warm-on-dark palette: deep navy background #0b1622, surface navy #12253d, gold #c89830, coral #c07040, teal #1a8a7a, ocean blue #1a5a8a, sky blue #2a88c0, cream #e0dcd0. No text, no watermarks, no signatures. A 3x2 grid on a FULLY TRANSPARENT background (alpha PNG), clear gutters, nothing touching cell edges. The SAME friendly cartoon pixel brain drawn six times, one per cell, in six progressive lighting stages reading left-to-right then top-to-bottom. Stage 1: a sleeping brain in soft slate blue #3a4a66 with a clearly visible pale cyan rim glow all around it (it must read clearly against a dark page) and one tiny dim lightbulb above. Stage 2: one bulb softly lit gold. Stage 3: two bulbs lit, hints of teal waking in the folds. Stage 4: four bulbs lit, brain warming with gold and teal. Stage 5: five bulbs bright, brain mostly glowing. Stage 6: fully radiant gold-and-teal brain with six brilliant bulbs and sparkles. Identical brain shape and position in every cell.
```

### `art-drop/map-zones-sheet-1.png`

- [ ] Image size to request: **1536 × 1024** (landscape) — 1×2 grid

```
16-bit pixel art, crisp clean pixels, warm-on-dark palette: deep navy background #0b1622, surface navy #12253d, gold #c89830, coral #c07040, teal #1a8a7a, ocean blue #1a5a8a, sky blue #2a88c0, cream #e0dcd0. No text, no watermarks, no signatures. TWO wide side-scrolling game terrain strips stacked vertically with a clean horizontal gap between them, each strip a calm horizontal landscape with a clear walking path through the middle, gentle and uncluttered (game UI will sit on top). TOP strip, coral #c07040 accents: a cozy toy-block meadow at dusk, soft hills made of wooden blocks and plush toys, tiny lanterns. BOTTOM strip, gold #c89830 accents: a honey-lantern orchard with paper kites drifting. No characters.
```

### `art-drop/map-zones-sheet-2.png`

- [ ] Image size to request: **1536 × 1024** (landscape) — 1×2 grid

```
16-bit pixel art, crisp clean pixels, warm-on-dark palette: deep navy background #0b1622, surface navy #12253d, gold #c89830, coral #c07040, teal #1a8a7a, ocean blue #1a5a8a, sky blue #2a88c0, cream #e0dcd0. No text, no watermarks, no signatures. TWO wide side-scrolling game terrain strips stacked vertically with a clean horizontal gap between them, each strip a calm horizontal landscape with a clear walking path through the middle, gentle and uncluttered (game UI will sit on top). TOP strip, teal #1a8a7a accents: a tide-pool boardwalk with glowing glass jars. BOTTOM strip, ocean #1a5a8a accents: a library canyon with floating books and wooden ladders. No characters.
```

### `art-drop/map-zones-sheet-3.png`

- [ ] Image size to request: **1536 × 1024** (landscape) — 1×2 grid

```
16-bit pixel art, crisp clean pixels, warm-on-dark palette: deep navy background #0b1622, surface navy #12253d, gold #c89830, coral #c07040, teal #1a8a7a, ocean blue #1a5a8a, sky blue #2a88c0, cream #e0dcd0. No text, no watermarks, no signatures. TWO wide side-scrolling game terrain strips stacked vertically with a clean horizontal gap between them, each strip a calm horizontal landscape with a clear walking path through the middle, gentle and uncluttered (game UI will sit on top). TOP strip, sky #2a88c0 accents: an observatory ridge with small telescopes and weather vanes. BOTTOM strip, teal #1a8a7a accents: a bridge town over a calm river with warm windows. No characters.
```

## Optional extras

### `art-drop/ari-cheer-sheet.png`

- [ ] Image size to request: **1024 × 1024** (landscape) — 2×2 grid

```
16-bit pixel art, crisp clean pixels, warm-on-dark palette: deep navy background #0b1622, surface navy #12253d, gold #c89830, coral #c07040, teal #1a8a7a, ocean blue #1a5a8a, sky blue #2a88c0, cream #e0dcd0. No text, no watermarks, no signatures. A 2x2 grid on a FULLY TRANSPARENT background (alpha PNG), clear gutters. The SAME young inventor girl (dark curly hair, goggles on her forehead, teal jacket) in four frames of a happy cheer animation, feet planted on the SAME invisible ground line in every cell, identical size and position: frame 1 arms starting to rise, frame 2 arms up mid-jump, frame 3 arms fully raised celebrating with sparkles, frame 4 settling back with a big smile.
```

### `art-drop/stat-icons-sheet.png`

- [ ] Image size to request: **1024 × 1024** (landscape) — 2×2 grid

```
16-bit pixel art, crisp clean pixels, warm-on-dark palette: deep navy background #0b1622, surface navy #12253d, gold #c89830, coral #c07040, teal #1a8a7a, ocean blue #1a5a8a, sky blue #2a88c0, cream #e0dcd0. No text, no watermarks, no signatures. A 2x2 grid of small game stat icons on a FULLY TRANSPARENT background (alpha PNG), clear gutters, identical scale, centered. Cell 1: an open storybook with a gold checkmark. Cell 2: a small gold trophy cup. Cell 3: a glowing lightbulb with tiny gears. Cell 4: a friendly glowing brain with one lit bulb.
```

