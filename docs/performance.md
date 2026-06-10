# Performance — code-splitting + image optimization

## Code-splitting (live)

Every page on the site lazy-loads via `React.lazy()` + `<Suspense>`. The main bundle a visitor downloads on first paint contains:

- React, React DOM
- `App.jsx` (the router + chrome)
- `theme.js`, `shared.jsx`, hooks, `analytics.js`
- `Home.jsx` (the entry-point page — eager so the LCP isn't blocked on a chunk fetch)
- `pages/landing/` shell (`HomeLanding.jsx`, scenes markup + styles — the landing cinematic's static layer; +~6KB gz)
- `NewsletterSignup.jsx` (footer signup form, used on every page)

Everything else — 50+ page components, the experiment scenes, the scenario copy files (`k5ScenarioCopy.js` ~131KB, `highSchoolScenarioCopy.js` ~169KB, `teacherKits.js` ~132KB), `ScenarioCard.jsx` and its dependencies — lives in per-route chunks fetched only when the user navigates there.

### Bundle anatomy (after the perf PR)

| Chunk | Size | Gzipped | When loaded |
|---|---|---|---|
| `index.*.js` (main) | 241KB | 73KB | Always (every page) |
| `experiments.*.js` | 657KB | 207KB | First visit to any thought experiment page |
| `sceneIllustrations.*.js` | 103KB | 25KB | First visit to a scene-illustrated experiment |
| `IllustratedScene.*.js` | 102KB | 22KB | First visit to a scene-illustrated experiment |
| `Toolkit.*.js` | 88KB | 30KB | `/thought-experiments/toolkit` |
| `AIEthics.*.js` | 63KB | 21KB | `/ai-ethics` |
| `MoralPsychology.*.js` | 52KB | 17KB | `/moral-psych` |
| `AIConsciousness.*.js` | 53KB | 16KB | `/ai-consciousness` |
| `aiEducationResources.*.js` | 56KB | 19KB | First visit to an AI-Education sub-page |
| `vendor-gsap.*.js` | 112KB | 45KB | Landing cinematic only — on idle/first input at "/" (never under reduced motion) |
| `vendor-three.*.js` | 483KB | 124KB | Landing cinematic only — "gl" tier devices with WebGL (skipped on low-power/save-data) |
| `initLandingEngine.*.js` + `particleScene.*.js` | ~18KB | ~6KB | With the chunks above |
| Each other page | 10–35KB | 4–13KB | When navigated to |

The landing engine chunks are dynamic-imported from `HomeLanding.jsx` after first paint (requestIdleCallback raced against first scroll/input), so "/"'s LCP — now the scene-1 headline text — never waits on them. `vite.config.js` pins gsap/three into named `vendor-*` chunks via `manualChunks`.

Vite emits a warning that `experiments.*.js` is over 500KB — that's intentional. It's the consolidated scenes + scenario-copy bundle, only loaded when someone actually navigates to a thought experiment page. Splitting it further would require carving up `src/data/experiments.js`, which is the source-of-truth file for the whole experiment library. Not worth doing for marginal gains.

### Trade-offs

- **Navigation has a tiny latency cost.** When the user clicks a nav link to a page they haven't visited yet, the chunk has to fetch + parse. On a fast connection that's 50–150ms; on slow 3G it can be 300–500ms. The `<Suspense fallback={null}>` means the previous page stays visible during that fetch — no spinner flash. For most pages this is imperceptible.
- **Multi-tab pre-warming doesn't help.** Each tab is its own bundle cache.
- **Prefetch hints could help, but aren't wired up yet.** A future enhancement: on hover of a nav link, prefetch the corresponding chunk so the click is instant. ~10 lines of code in `App.jsx`'s nav.

## Image optimization (opt-in)

Every illustration on the site is a PNG or JPG. WebP is typically 30–60% smaller at the same visual quality. The `<Image>` component serves WebP automatically when a sibling `.webp` exists, and falls back to the original raster file when it doesn't.

### One-time setup (then occasional re-run)

After adding new images to `public/illustrations/`, `public/article-art/`, or `public/experiment-scenes/`:

```bash
npm run optimize-images
```

This walks the three image directories, generates a `.webp` for every `.png`/`.jpg` that doesn't already have an up-to-date sibling, and prints per-file savings. Re-runs are idempotent (it skips files whose `.webp` is newer than the source).

### Why not chain into `npm run build`?

The script depends on `sharp`, a ~200MB native binding. We don't want CI installing it on every push when only the human-facing build step actually needs it. So:

- `npm install` installs sharp once locally (your machine has it).
- You commit the generated `.webp` files alongside their sources.
- CI builds with the WebPs already present.
- Visitors get WebP transparently via `<picture>`.

### Using `<Image>`

```jsx
import Image from "../components/Image.jsx";

<Image
  src="/illustrations/home-hero.png"
  alt="A meaningful description"
  loading="lazy"
  width={1280}
  height={720}
/>
```

Renders:

```html
<picture>
  <source srcset="/illustrations/home-hero.webp" type="image/webp" />
  <img src="/illustrations/home-hero.png" alt="..." loading="lazy" width="1280" height="720" />
</picture>
```

The image tag accepts all standard HTML attributes. Pass `disableWebp` to opt out (useful for SVGs, which are already optimal).

### Migration

`<Image>` is opt-in — existing `<img>` tags in the codebase continue to work. As pages and components are touched in the future, swap their `<img>` for `<Image>` to pick up WebP delivery. The highest-impact places to start:

1. `src/components/shared.jsx` — `TopicCard`, `EducatorHero`, `FigureCard` (used on most hub pages)
2. `src/components/ScenarioCard.jsx` — illustrations inside thought experiments
3. `src/pages/Home.jsx` — `CardVisual` component (already uses `<img>`, would swap one-for-one)
4. The CSS `background-image` on `.home-hero` is harder — CSS doesn't have built-in `<picture>` fallback. Either keep the PNG, use `image-set()` with WebP fallback (good browser support now), or move the hero to an actual `<Image>` element.

Each migration is mechanical; the constraint is just touching the file with intent.

## How to verify any of this

```bash
npm run build                  # See the chunk breakdown in the output
npx vite preview               # Serve dist/ locally; DevTools Network panel
                               #   shows chunks loaded per page
npm run optimize-images        # See the WebP savings printed inline
```

Lighthouse on the deployed site should now report a much lower "Total Blocking Time" and "Time to Interactive" on the homepage compared to before this PR — and a smaller "Reduce unused JavaScript" opportunity score.
