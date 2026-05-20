# Charts — data visualizations on research pages

Tier 2 #10 of the roadmap. Hand-rolled SVG, no library, no bundle hit beyond the components themselves. Accessible by default (every chart has a `<title>` and `<desc>` and is wrapped in `role="img"`).

Components live in `src/components/charts/`.

## What ships

### `<EffectSize value={...} label={...} citation={...} accent={...} />`

Drops a value onto the canonical Cohen's d / SMD scale (Negligible ≤0.2, Small ≤0.5, Medium ≤0.8, Large ≤1.2, Very large ≤2.0). Makes "SMD = 0.45" legible to a teacher who doesn't carry the scale in their head.

```jsx
<EffectSize
  value={0.45}
  label="Generative AI in education (meta-analysis, 68 studies)"
  citation="Educational Research Review (2025)"
  accent={C.teal}
/>
```

### `<Bars title={...} description={...} items={...} unit="%" />`

Horizontal bar chart. Pass an array of `{ label, value, accent? }`. Values default to a 0–100 scale (set `max` to use a different range). Per-bar accent colors fall back to the chart's `fillColor`.

```jsx
<Bars
  title="AI use in K–12 classrooms, 2024–25"
  description="Center for Democracy and Technology, October 2025."
  items={[
    { label: "Teachers using AI", value: 85, accent: C.gold },
    { label: "Students using AI", value: 86, accent: C.teal },
    { label: "Students worried about AI", value: 60, accent: C.coral },
  ]}
  unit="%"
/>
```

## How charts attach to AI Education section data

Sections in `src/data/aiEducationResources.js` accept an optional `charts: [...]` array that the SectionPage renderer turns into an "Evidence at a glance" panel above the existing card grid. Each entry is `{ type, ...props }`:

```js
{
  title: "Case studies and the evidence so far",
  // ...
  charts: [
    { type: "effect-size", value: 0.45, label: "...", citation: "...", accent: C.teal },
    { type: "bars", title: "...", items: [...], unit: "%" },
  ],
  evidenceCallouts: [ ... ],  // unchanged
}
```

The panel sits above the text callouts so a teacher can see the headline numbers before reading the prose.

## Accessibility

- `role="img"` on every SVG
- `<title>` (linked by `aria-labelledby`) carries the short version of the chart's meaning
- `<desc>` carries the full prose explanation including the citation
- Text inside SVG is real text (selectable, indexable by search), not raster
- Color is paired with shape and text — never the sole carrier of meaning
- Verified at the default site contrast tokens; all band colors meet WCAG AA

## When to use what

- **Effect size visualization** — any single SMD / Cohen's d value where readers might not have the scale memorized
- **Bars** — 2–5 percentages compared on a shared 0–100 axis (adoption rates, completion rates, agreement scores). Fewer than 6 bars; more becomes hard to scan
- **Text + ResearchCallout** — for findings that don't reduce to a single number (qualitative themes, multi-step causal arguments)

The point of these isn't to replace the prose callouts — those carry the citation and the caveats. The charts give the headline a 2-second read so a busy teacher can decide whether to dig in.

## Adding a chart for a new study or finding

1. Open `src/data/aiEducationResources.js`.
2. Find the right section.
3. Add an entry to its `charts: [...]` array (create the array if it doesn't exist).
4. Pick a type (`effect-size` or `bars`), fill in the props.
5. The new chart appears above that section's existing callouts on the next build.

For chart types we don't have yet (line charts, stacked bars, scatter plots): drop a new component in `src/components/charts/`, register it in the renderer's switch in `src/pages/ai-education/SectionPage.jsx`. Each new chart type is ~80 lines of SVG.
