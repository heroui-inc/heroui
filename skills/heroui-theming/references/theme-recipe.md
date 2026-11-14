# Theme Recipe: Authoring a Complete HeroUI Theme

A HeroUI theme is a small folder of CSS: token values for a light and a dark mode, plus per-component BEM overrides for whatever tokens cannot express. No JavaScript, no changes to `@heroui/react`, nothing in `node_modules`.

## Anatomy

```
src/themes/<name>/
├── index.css               # entry: imports the two files below into the right layers
├── variables.css           # token values for <name>-light and <name>-dark
└── components/
    ├── index.css           # imports each component override
    ├── button.css          # one file per component, named like the HeroUI stylesheet
    └── …
```

Optional: `utilities.css` (theme `@utility` / `@theme` definitions) and font loading, both imported **before** the layered imports and **without** `layer()`.

## Step 0 — Turn the brief into decisions

Write these down before touching CSS. Every answer maps to tokens.

| Decision  | Question                                         | Tokens                                                                                                              |
| --------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| Neutrals  | Tinted or pure gray? What hue?                   | `--background`, `--surface*`, `--overlay`, `--default`, `--muted`, `--border`, `--separator`, `--snow`, `--eclipse` |
| Brand     | Accent color; is text on it light or dark?       | `--accent`, `--accent-foreground`, `--focus`, `--link`                                                              |
| Status    | Keep defaults or re-tune to the palette?         | `--success`, `--warning`, `--danger` (+ `-foreground`)                                                              |
| Shape     | Sharp, soft, or pill?                            | `--radius`, `--field-radius`                                                                                        |
| Elevation | Soft shadows, hard shadows, borders, or flat?    | `--surface-shadow`, `--overlay-shadow`, `--field-shadow`                                                            |
| Fields    | Filled or outlined?                              | `--field-background`, `--field-border`, `--field-border-width`                                                      |
| Type      | Custom font?                                     | `--font-sans` (Tailwind's token)                                                                                    |
| Signature | The one or two details that make it recognizable | theme tokens `--<name>-*` + component overrides                                                                     |

Work **tokens first**. Most of a theme is `variables.css`; add a component file only when a token cannot do it.

## Step 1 — Scaffold

`index.css`:

```css
/* <Name> theme for HeroUI */

/* Theme variables (palette, radius, shadows, theme tokens) */
@import "./variables.css" layer(theme);

/* Component overrides (BEM classes) */
@import "./components/index.css" layer(components);
```

`variables.css`:

```css
.<name>-light,
[data-theme="<name>-light"] {
  color-scheme: light;
  /* tokens */
}

.<name>-dark,
[data-theme="<name>-dark"] {
  color-scheme: dark;
  /* tokens */
}
```

`components/index.css`:

```css
/* <Name> Theme - Component Overrides */
@import "./button.css";
@import "./card.css";
```

Why this shape:

- `layer(theme)` puts your tokens in HeroUI's `theme` layer, above the default theme, so they win without `!important` or extra specificity.
- `layer(components)` appends your overrides after HeroUI's component CSS in the same layer, and keeps them below `utilities`, so `className` overrides on a single element still work.
- The class + attribute selector pair lets the app activate the theme with either `class` or `data-theme` (theme switchers differ).

## Step 2 — Fill `variables.css`

1. List the tokens of the installed version: `node scripts/list_tokens.mjs` (reference: [tokens.md](tokens.md)).
2. In **each** mode, set the whole base palette — do not rely on the default theme for the dark mode: `<name>-dark` does not match HeroUI's `.dark` / `[data-theme="dark"]` selector, so anything you leave out falls back to the **light** defaults.
3. Set `color-scheme` in each block (native controls, scrollbars, and `light-dark()` follow it).
4. Use `oklch()` for every color. Keep hue constant across a neutral ramp; move lightness.
5. Change colors in pairs: `--x` and `--x-foreground` must stay readable together (aim for WCAG AA: 4.5:1 for text).
6. Leave calculated tokens (`--accent-hover`, `--accent-soft`, `--field-hover`, `--border-secondary`…) alone; they recompute from your base tokens. Re-declare one only when the result is wrong for your palette.
7. Put theme-specific values in `--<name>-*` tokens (one value per mode) and read them from component overrides.
8. Shadow tokens must always be a shadow: use `0 0 0 0 transparent`, never `none` (a `none` breaks focus rings).

## Step 3 — Component overrides

For each override:

1. `node scripts/list_component_classes.mjs <component> --css` — read the real selectors, states, and custom properties ([components.md](components.md)).
2. Create `components/<component>.css`, add it to `components/index.css`.
3. Write the smallest rule that works. In order of preference: re-assign the component's custom properties → `@apply` utilities → raw declarations.
4. For state styles, copy the base selector list (pseudo-class **and** data attribute).
5. Match the specificity of the rule you are replacing, and re-assert modifiers that your block rule would clobber.
6. Read colors from tokens. A hardcoded color in a component file will be wrong in the other mode.

Overrides are **not** scoped to the theme selector: once the file is imported, they apply to the whole app. That is the intended model — one theme stylesheet per app, with the light/dark split handled by tokens. If several themes must be switchable at runtime, see "Several themes in one app" below.

## Step 4 — Import it

```css
/* app/globals.css */
@import "tailwindcss";
@import "@heroui/styles";
@import "../themes/<name>/index.css";
```

Order matters: Tailwind, then HeroUI, then the theme. The theme import itself has no `layer()` (its children already do).

## Step 5 — Activate it

Importing is not enough; one mode must be active on `<html>`:

```html
<html data-theme="<name>-light">
  <body class="bg-background text-foreground">
    …
  </body>
</html>
```

- Switch modes by changing the attribute to `<name>-dark`. A class works too: `<html class="<name>-dark">`.
- Always on `<html>`: overlays render in a portal under `<body>`, and calculated tokens only recompute on the root.
- With `next-themes`: `<ThemeProvider attribute="data-theme" value={{light: "<name>-light", dark: "<name>-dark"}} enableSystem>`.
- If app code uses Tailwind's `dark:` variant: HeroUI's `dark:` matches `.dark` / `[data-theme="dark"]` only. Either keep `class="dark"` on `<html>` next to `data-theme="<name>-dark"`, or redefine the variant after the HeroUI import:

```css
@custom-variant dark (&:where(.dark, .dark *, [data-theme$="-dark"], [data-theme$="-dark"] *));
```

To make the theme the app's only look (no attribute needed), add the root to the selectors: `:root, .<name>-light, [data-theme="<name>-light"]` for light and `.dark, .<name>-dark, [data-theme="<name>-dark"]` for dark.

## Step 6 — Verify

Build the app's CSS (a wrong utility name in `@apply` fails the build), then check both modes. Minimum pass:

- [ ] Page canvas and text: `bg-background` / `text-foreground` on `<body>`
- [ ] Buttons: every variant, hover, pressed, **keyboard focus ring**, disabled
- [ ] Fields: Input, Select, Checkbox, Radio, Switch — rest, hover, focus, invalid, disabled; placeholder contrast
- [ ] Surfaces: Card (all variants), Accordion, Table, Tabs (selected indicator)
- [ ] Overlays: Popover/Dropdown/Select list, Tooltip (and its arrow), Modal + backdrop, Toast — background, shadow/outline, radius
- [ ] Soft colors: Chip/Badge/Alert in accent, success, warning, danger — text contrast on the soft fill
- [ ] Reduced motion: new transitions stop with `prefers-reduced-motion`
- [ ] No leftover unlayered `:root { --token }` overrides fighting the theme

## Optional pieces

### Fonts

Set Tailwind's `--font-sans` in both theme blocks: `--font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;`. Load the font the way the framework prefers (`next/font`, a `<link>`, or `@font-face`). If you use `@import url(…)`, it must be the first import in `index.css`.

### Theme utilities and Tailwind tokens

`@utility` cannot be nested in a layer, so keep these in a file imported without `layer()`:

```css
/* themes/<name>/utilities.css */
@theme inline {
  --color-<name>-edge: var(--<name>-edge); /* enables border-<name>-edge, bg-<name>-edge… */
}

@utility <name>-keycap {
  @apply shadow-[0_var(--<name>-depth)_0_0_var(--<name>-edge)];
}
```

```css
/* themes/<name>/index.css */
@import "./utilities.css";
@import "./variables.css" layer(theme);
@import "./components/index.css" layer(components);
```

### Several themes in one app

Tokens are already scoped by selector. Component overrides are not, so wrap each file's rules in the theme selector (CSS nesting):

```css
:is(.arcade-light, .arcade-dark, [data-theme="arcade-light"], [data-theme="arcade-dark"]) {
  .button {
    @apply font-semibold;
  }
}
```

This also raises specificity, so scoped overrides reliably beat the base rule.

### Without Tailwind (prebuilt CSS)

When the page loads `heroui.min.css` instead of compiling with Tailwind, `@apply`, `@utility`, and `@import … layer()` through a bundler are unavailable. Write plain CSS inside the same layers: `@layer theme { [data-theme="x-light"] { … } }` and `@layer components { .button { … } }`. See [any-framework.md](any-framework.md).

---

## Worked example: "Arcade"

Brief: _chunky and tactile — ink outlines, generous radius, warm paper neutrals, and a hard "key cap" shadow that buttons press into._

Decisions:

| Decision  | Choice                                                                                        |
| --------- | --------------------------------------------------------------------------------------------- |
| Neutrals  | Warm paper (hue 95) in light, deep ink (hue 285) in dark; primitives tinted to match          |
| Brand     | Tangerine accent with **ink** text on it; violet focus ring so focus never blends with accent |
| Shape     | `--radius: 0.75rem` (pill buttons, soft cards)                                                |
| Elevation | No blur anywhere: hard offset shadows; overlays get their outline from the shadow token       |
| Fields    | Outlined (2px ink), flat                                                                      |
| Signature | `--arcade-outline`, `--arcade-depth`, `--arcade-edge` + key-cap buttons                       |

```
src/themes/arcade/
├── index.css
├── variables.css
└── components/
    ├── index.css
    ├── button.css
    ├── card.css
    ├── chip.css
    ├── switch.css
    └── tooltip.css
```

**`themes/arcade/index.css`**

```css
/* Arcade theme for HeroUI
   Chunky and tactile: ink outlines, generous radius, and a hard "key cap"
   shadow that buttons press into. */

/* Theme variables (palette, radius, shadows, arcade tokens) */
@import "./variables.css" layer(theme);

/* Component overrides (BEM classes) */
@import "./components/index.css" layer(components);
```

**`themes/arcade/variables.css`**

```css
/* Arcade Theme Variables */

.arcade-light,
[data-theme="arcade-light"] {
  color-scheme: light;

  /* Primitives: tinted ink and paper instead of neutral black and white */
  --snow: oklch(0.985 0.012 95);
  --eclipse: oklch(0.24 0.03 285);

  /* Arcade tokens (theme-specific, read by the component overrides) */
  --arcade-outline: 2px;
  --arcade-depth: 3px;
  --arcade-edge: var(--eclipse);

  /* Base */
  --background: oklch(0.972 0.02 95);
  --foreground: var(--eclipse);

  /* Surfaces */
  --surface: oklch(0.995 0.008 95);
  --surface-foreground: var(--foreground);
  --surface-secondary: oklch(0.955 0.022 95);
  --surface-secondary-foreground: var(--foreground);
  --surface-tertiary: oklch(0.935 0.026 95);
  --surface-tertiary-foreground: var(--foreground);

  /* Overlays */
  --overlay: oklch(0.995 0.008 95);
  --overlay-foreground: var(--foreground);
  --backdrop: oklch(0.24 0.03 285 / 0.45);

  /* Neutrals */
  --muted: oklch(0.5 0.03 285);
  --default: oklch(0.925 0.028 95);
  --default-foreground: var(--eclipse);
  --segment: var(--surface);
  --segment-foreground: var(--foreground);

  /* Accent and status */
  --accent: oklch(0.74 0.17 55);
  --accent-foreground: var(--eclipse);
  --success: oklch(0.78 0.17 150);
  --success-foreground: var(--eclipse);
  --warning: oklch(0.85 0.16 90);
  --warning-foreground: var(--eclipse);
  --danger: oklch(0.65 0.22 25);
  --danger-foreground: var(--snow);

  /* Calculated token, re-declared: the default mix is too pale on cream */
  --accent-soft-foreground: color-mix(in oklab, var(--accent) 45%, var(--foreground) 55%);

  /* Fields: flat wells with an ink outline */
  --field-background: var(--surface);
  --field-foreground: var(--foreground);
  --field-placeholder: var(--muted);
  --field-border: var(--arcade-edge);
  --field-border-width: var(--arcade-outline);
  --field-border-hover: var(--arcade-edge);
  --field-border-focus: var(--focus);

  /* Lines and focus */
  --border: var(--arcade-edge);
  --separator: oklch(0.24 0.03 285 / 0.16);
  --focus: oklch(0.55 0.22 285);
  --link: var(--foreground);

  /* Shape */
  --radius: 0.75rem;
  --field-radius: 0.875rem;

  /* Elevation: hard offsets, never blurred. Every shadow token stays a real
     shadow value (never `none`) so focus rings can still compose with it. */
  --surface-shadow: 0 var(--arcade-depth) 0 0 var(--arcade-edge);
  --overlay-shadow:
    0 0 0 var(--arcade-outline) var(--arcade-edge),
    0 calc(var(--arcade-depth) * 2) 0 var(--arcade-outline) var(--arcade-edge);
  --field-shadow: 0 0 0 0 transparent;
}

.arcade-dark,
[data-theme="arcade-dark"] {
  color-scheme: dark;

  --snow: oklch(0.985 0.012 95);
  --eclipse: oklch(0.24 0.03 285);

  --arcade-outline: 2px;
  --arcade-depth: 3px;
  --arcade-edge: oklch(0.11 0.02 285);

  --background: oklch(0.2 0.03 285);
  --foreground: var(--snow);

  --surface: oklch(0.26 0.035 285);
  --surface-foreground: var(--foreground);
  --surface-secondary: oklch(0.3 0.035 285);
  --surface-secondary-foreground: var(--foreground);
  --surface-tertiary: oklch(0.34 0.035 285);
  --surface-tertiary-foreground: var(--foreground);

  --overlay: oklch(0.28 0.035 285);
  --overlay-foreground: var(--foreground);
  --backdrop: oklch(0.11 0.02 285 / 0.6);

  --muted: oklch(0.74 0.03 285);
  --default: oklch(0.33 0.04 285);
  --default-foreground: var(--snow);
  --segment: oklch(0.4 0.04 285);
  --segment-foreground: var(--foreground);

  --accent: oklch(0.8 0.16 60);
  --accent-foreground: var(--eclipse);
  --success: oklch(0.8 0.17 150);
  --success-foreground: var(--eclipse);
  --warning: oklch(0.86 0.15 90);
  --warning-foreground: var(--eclipse);
  --danger: oklch(0.66 0.21 25);
  --danger-foreground: var(--snow);

  --field-background: oklch(0.24 0.03 285);
  --field-foreground: var(--foreground);
  --field-placeholder: var(--muted);
  --field-border: var(--arcade-edge);
  --field-border-width: var(--arcade-outline);
  --field-border-hover: var(--arcade-edge);
  --field-border-focus: var(--focus);

  --border: var(--arcade-edge);
  --separator: oklch(0.985 0.012 95 / 0.14);
  --focus: oklch(0.82 0.13 285);
  --link: var(--foreground);

  --radius: 0.75rem;
  --field-radius: 0.875rem;

  --surface-shadow: 0 var(--arcade-depth) 0 0 var(--arcade-edge);
  --overlay-shadow:
    0 0 0 var(--arcade-outline) var(--arcade-edge),
    0 calc(var(--arcade-depth) * 2) 0 var(--arcade-outline) var(--arcade-edge);
  --field-shadow: 0 0 0 0 transparent;
}
```

What the tokens alone already did: every field is outlined, every overlay (popover, dropdown, select list, modal) has an ink outline and a hard drop, cards sit on a key-cap shadow, focus rings are violet, the whole radius scale is rounder. The component files below only add what tokens cannot.

**`themes/arcade/components/index.css`**

```css
/* Arcade Theme - Component Overrides */

/* Buttons */
@import "./button.css";

/* Controls */
@import "./switch.css";

/* Data display */
@import "./chip.css";

/* Layout */
@import "./card.css";

/* Overlays */
@import "./tooltip.css";
```

**`themes/arcade/components/button.css`**

```css
/* Arcade Theme - Button */
/* Every button is an outlined key cap: a hard bottom shadow that the button
   travels into while it is pressed. */

.button {
  /* A shadow utility (not raw box-shadow) so the focus ring still composes with it */
  @apply font-semibold shadow-[0_var(--arcade-depth)_0_0_var(--arcade-edge)];
  border: var(--arcade-outline) solid var(--border);

  transition:
    translate 80ms var(--ease-out),
    box-shadow 80ms var(--ease-out),
    background-color 100ms var(--ease-out);
  @apply motion-reduce:transition-none;

  /* Replace the default scale with key travel. Both selectors, always. */
  &:active,
  &[data-pressed="true"] {
    @apply shadow-[0_0_0_0_var(--arcade-edge)];
    transform: none;
    translate: 0 var(--arcade-depth);
  }
}

/* Ghost stays flat: no outline, no key cap, no travel */
.button--ghost {
  @apply border-transparent shadow-none;

  &:active,
  &[data-pressed="true"] {
    @apply shadow-none;
    translate: none;
  }
}
```

**`themes/arcade/components/card.css`**

```css
/* Arcade Theme - Card */
/* The key-cap shadow comes from --surface-shadow; the card only adds the outline. */

.card {
  border: var(--arcade-outline) solid var(--border);
}

/* `.card` now sets a border, so re-assert the modifier it would otherwise clobber */
.card--transparent {
  @apply border-none;
}
```

**`themes/arcade/components/chip.css`**

```css
/* Arcade Theme - Chip */

.chip {
  @apply font-semibold;
  border: var(--arcade-outline) solid var(--border);
}

/* Tertiary chips have no fill, so drop the outline to keep them quiet */
.chip--tertiary {
  @apply border-transparent;
}
```

**`themes/arcade/components/switch.css`**

```css
/* Arcade Theme - Switch */
/* Outlines are drawn with shadows, not borders: no layout shift, and the track's
   shadow utility still composes with the focus ring. */

.switch__control {
  @apply shadow-[inset_0_0_0_var(--arcade-outline)_var(--border)];
}

.switch__thumb {
  background-color: var(--snow);
  box-shadow: 0 0 0 var(--arcade-outline) var(--border);

  /* @heroui/styles restyles the thumb when selected, with a more specific selector.
     Repeat that selector (both the ARIA and the data attribute) to win. */
  .switch[aria-checked="true"] &,
  .switch[data-selected="true"] & {
    background-color: var(--snow);
    box-shadow: 0 0 0 var(--arcade-outline) var(--border);
  }
}
```

**`themes/arcade/components/tooltip.css`**

```css
/* Arcade Theme - Tooltip */
/* Inverted label: ink background, paper text, no key cap */

.tooltip {
  @apply font-medium;
  background-color: var(--foreground);
  color: var(--background);
  box-shadow: none;

  /* Parts without a BEM class are reached through their data-slot */
  & [data-slot="overlay-arrow"] {
    fill: var(--foreground);
    stroke: none;
  }
}
```

**`app/globals.css`**

```css
@import "tailwindcss";
@import "@heroui/styles";
@import "../themes/arcade/index.css";
```

**Activate**

```html
<html data-theme="arcade-light">
  <body class="bg-background text-foreground">
    …
  </body>
</html>
```

### Patterns this example demonstrates

| Pattern                                           | Where                                                                               |
| ------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Tokens do most of the work                        | Fields, overlays, focus, radius: no component file needed                           |
| Theme tokens with a `--<name>-*` prefix           | `--arcade-outline`, `--arcade-depth`, `--arcade-edge`                               |
| Mode differences live in tokens, not in overrides | `--arcade-edge` is ink in light and near-black in dark; overrides are mode-agnostic |
| Re-declaring one calculated token                 | `--accent-soft-foreground`                                                          |
| Pseudo-class + data attribute for every state     | `&:active, &[data-pressed="true"]`                                                  |
| Shadow utilities that compose with the focus ring | `button.css`, `switch.css` (`@apply shadow-[…]`)                                    |
| Re-asserting a clobbered modifier                 | `.card--transparent`                                                                |
| Matching the base rule's specificity              | `.switch[data-selected="true"] .switch__thumb`                                      |
| Styling an unclassed part through `data-slot`     | Tooltip arrow                                                                       |
| Reduced motion after a custom `transition`        | `button.css`                                                                        |

Raw `box-shadow: none` on `.tooltip` is safe because the tooltip panel is never focused. On a focusable element, use `@apply shadow-none` instead.
