---
name: heroui-theming
description: "Globally customize HeroUI v3 and author complete custom themes with CSS only. Use when restyling HeroUI components app-wide, changing design tokens (colors, radius, shadows, fields), overriding BEM component classes, adding variants, creating a named light/dark theme, or using @heroui/styles on plain HTML and non-React frameworks. Keywords: HeroUI theme, theming, custom theme, design tokens, CSS variables, oklch, BEM, data-theme, dark mode, @heroui/styles, global styles."
metadata:
  author: heroui
  version: "1.0.0"
---

# HeroUI v3 Theming Guide

HeroUI's look lives entirely in `@heroui/styles`: plain CSS made of **theme tokens** and **BEM component classes** in cascade layers. `@heroui/react` only adds behavior and puts those class names on the DOM. So everything visual can be changed globally with CSS — no component wrappers, no forks, no JavaScript — and the same CSS works on any framework or plain HTML.

Use this skill to customize HeroUI globally or to build a full theme. For building UIs with the components, use the `heroui-react` skill.

## Installation

```bash
curl -fsSL https://heroui.com/install | bash -s heroui-theming
```

## Mental Model

```
@layer theme, base, components, utilities;      ← declared by @heroui/styles

theme        tokens          --accent, --radius, --surface-shadow, --field-border…
base         resets          border color, overlay keyframes
components   BEM classes     .button, .button--primary, .card__header, .switch__thumb…
utilities    Tailwind        bg-accent, rounded-xl, shadow-surface, status-focused…
```

- **Later layers win** over earlier ones regardless of selector specificity. **Unlayered CSS beats every layer.**
- One chain connects everything: token `--accent` → Tailwind mapping `--color-accent: var(--accent)` → utility `bg-accent` → component `.button--primary { --button-bg: var(--accent) }`. Change the token and the whole chain follows.
- Colors without a suffix are backgrounds; `-foreground` is the text placed on them. They change as a pair.
- Default light tokens apply on `:root`, `.light`, `[data-theme="light"]`; dark on `.dark`, `[data-theme="dark"]`.

## Always Inspect the Installed Version First

Never invent a token, class, or selector. Read them from the project's own `node_modules` (no network needed):

```bash
node scripts/list_tokens.mjs                           # tokens: shared, light, dark, Tailwind mapping
node scripts/list_component_classes.mjs                # every component stylesheet
node scripts/list_component_classes.mjs button switch  # blocks, elements, modifiers, states, custom properties, tokens read
node scripts/list_component_classes.mjs modal --css    # plus the raw CSS
```

`scripts/` is this skill's folder. Run the scripts with the **project root as the working directory** — they resolve `@heroui/styles` from there — or pass `--dir <path-to>/node_modules/@heroui/styles`. The files they read:

| What             | Path in the installed package                                   |
| ---------------- | --------------------------------------------------------------- |
| Token values     | `node_modules/@heroui/styles/dist/themes/default/variables.css` |
| Tailwind mapping | `node_modules/@heroui/styles/dist/themes/shared/theme.css`      |
| Component CSS    | `node_modules/@heroui/styles/dist/components/<name>.css`        |

Read only. **Never edit `node_modules`.**

## Decision Ladder

Use the lowest rung that solves the request. Each rung up costs more to maintain.

| #   | The request sounds like                                                    | Use                                 | Reference                                     |
| --- | -------------------------------------------------------------------------- | ----------------------------------- | --------------------------------------------- |
| 1   | "Change the brand color / make everything rounder / flatter"               | Theme tokens                        | [tokens.md](references/tokens.md)             |
| 2   | "Primary buttons should be black" (one component's colors)                 | That component's custom properties  | [components.md](references/components.md)     |
| 3   | "All buttons uppercase / cards get a border" (shape, type, layout, states) | BEM override in `@layer components` | [components.md](references/components.md)     |
| 4   | "Add a gradient button next to the existing ones"                          | New modifier class                  | [components.md](references/components.md)     |
| 5   | "Create a theme called X" / a full visual identity with light + dark       | Named theme folder                  | [theme-recipe.md](references/theme-recipe.md) |

A one-off tweak on a single element is not theming: use `className` utilities there.

All snippets below go in the app's main CSS file, **after** the HeroUI import:

```css
@import "tailwindcss";
@import "@heroui/styles";
/* customizations here */
```

### 1. Theme tokens

```css
@layer theme {
  /* Same in both modes */
  :root {
    --accent: oklch(0.55 0.2 300);
    --accent-foreground: var(--snow);
    --radius: 0.375rem;
  }

  /* Mode-specific tokens need BOTH blocks, light first */
  :root,
  .light,
  [data-theme="light"] {
    --background: oklch(0.98 0.01 300);
  }

  .dark,
  [data-theme="dark"] {
    --background: oklch(0.16 0.02 300);
  }
}
```

A token set only on `:root` also applies in dark mode, because your rule outranks the default dark block. That is right for `--accent` or `--radius`, and wrong for `--background`, `--surface`, `--foreground`, shadows: give those a dark value too.

Hover, soft, and border-level colors (`--accent-hover`, `--accent-soft`, `--field-hover`…) are calculated from the base tokens. Do not set them unless the result needs tuning.

### 2. Component custom properties

Many components paint from their own properties (`--button-bg`, `--chip-bg`, `--switch-control-bg-checked`…). They are declared **on the component class**, so set them there, not on `:root`:

```css
@layer components {
  .button--primary {
    --button-bg: var(--foreground);
    --button-bg-hover: color-mix(in oklab, var(--foreground) 88%, var(--background));
    --button-bg-pressed: color-mix(in oklab, var(--foreground) 80%, var(--background));
    --button-fg: var(--background);
  }
}
```

Hover, pressed, focus, and disabled keep working because the base rules still do the painting.

### 3. BEM overrides

```css
@layer components {
  .button {
    @apply font-semibold tracking-wide uppercase;
  }

  .card {
    @apply border border-border;
  }

  /* `.card` now sets a border: re-assert the modifier it would clobber */
  .card--transparent {
    @apply border-none;
  }

  /* States: the pseudo-class AND the data attribute, as in the base file */
  .button:active,
  .button[data-pressed="true"] {
    transform: scale(0.95);
  }
}
```

### 4. New modifiers

Add a class in `@layer components` that assigns the component's custom properties (all of them), e.g. `.button--brand { --button-bg: var(--success); --button-bg-hover: var(--success-hover); --button-bg-pressed: var(--success-hover); --button-fg: var(--success-foreground); }`. Use it with `<Button className="button--brand">` or `<button class="button button--brand">`.

### 5. A named theme

A theme is a folder with one fixed structure, imported after HeroUI and activated on `<html>`:

```
src/themes/<name>/
├── index.css
├── variables.css
└── components/
    ├── index.css
    └── <component>.css    # one file per overridden component
```

```css
/* ── themes/<name>/index.css ── */
@import "./variables.css" layer(theme);
@import "./components/index.css" layer(components);

/* ── themes/<name>/variables.css: the full palette in BOTH blocks ── */
.<name>-light,
[data-theme="<name>-light"] {
  color-scheme: light;
  /* --background, --foreground, --surface*, --overlay, --default, --accent, status colors,
     --field-*, --border, --separator, --focus, --radius, shadows, your own --<name>-* tokens */
}

.<name>-dark,
[data-theme="<name>-dark"] {
  color-scheme: dark;
  /* the same tokens, dark values */
}

/* ── themes/<name>/components/index.css ── */
@import "./button.css";
@import "./card.css";

/* ── app/globals.css ── */
@import "tailwindcss";
@import "@heroui/styles";
@import "../themes/<name>/index.css";
```

```html
<html data-theme="<name>-light">
  <body class="bg-background text-foreground"></body>
</html>
```

Switch to dark with `data-theme="<name>-dark"` (a class of the same name also works). **Read [theme-recipe.md](references/theme-recipe.md) before writing a theme**: it has the step-by-step process and a complete worked example with light + dark variables and five component files.

## Without React

`@heroui/styles` works on plain HTML and any framework: load the CSS, put the BEM classes on real elements, set state attributes yourself.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@heroui/styles@3/dist/heroui.min.css" />

<button class="button button--primary">Save</button>
<button class="switch" role="switch" aria-checked="true">
  <span class="switch__content">
    <span class="switch__control"><span class="switch__thumb"></span></span>
    Notifications
  </span>
</button>
```

With a Tailwind v4 build, use `@import "tailwindcss"; @import "@heroui/styles";` instead. The prebuilt file has no Tailwind utilities and no `@apply`. Details, a runnable page, selective imports, and variant functions for Vue/Svelte: [any-framework.md](references/any-framework.md).

## Rules

1. **Tokens before overrides.** If a token can express it, do not write component CSS.
2. **`oklch()` for colors.** Keep hue steady across a ramp and move lightness.
3. **Semantic tokens, not hardcoded colors**, in every component override — a literal color is wrong in the other mode.
4. **Keep `-foreground` pairs readable** (WCAG AA, 4.5:1 for text). Check soft variants (`--accent-soft` + `--accent-soft-foreground`) too.
5. **Both modes, always.** Any mode-specific token gets a light and a dark value.
6. **Style states twice:** pseudo-class + data attribute (`:hover` + `[data-hovered="true"]`, `:active` + `[data-pressed="true"]`, `:focus-visible` + `[data-focus-visible="true"]`, `:disabled` + `[data-disabled="true"]`/`[aria-disabled="true"]`). Copy the selector list from the base file; where it deliberately uses only one form, do the same.
7. **Overrides go in `@layer components`**, never unlayered (unlayered CSS would also beat `className` utilities) and never with `!important`.
8. **Match the base rule's specificity**, and re-assert modifiers that a block-level override clobbers.
9. **Do not break focus rings.** The ring is a `box-shadow`: on focusable components use shadow utilities (`@apply shadow-[…]`) rather than raw `box-shadow`, and never set a shadow token to `none` (use `0 0 0 0 transparent`).
10. **Do not remove disabled or reduced-motion handling.** After a custom `transition`, add `@apply motion-reduce:transition-none;`.
11. **Apply themes on `<html>`.** Overlays portal to `<body>`, and calculated tokens only recompute on the root element.
12. **Complete class names only.** In `@apply`, `className`, and variant maps, write full names (`button--brand`); never build them from strings.
13. **Never edit `node_modules`** or copy HeroUI's CSS wholesale; override the smallest part.
14. **Remove conflicting leftovers.** An old unlayered `:root { --accent: … }` silently beats a named theme.

## Verification Checklist

Build the CSS first (an unknown utility in `@apply` fails the build). Then, in **light and dark**:

- [ ] Canvas and text (`bg-background text-foreground` on `<body>`)
- [ ] Button: every variant, hover, pressed, keyboard focus ring, disabled
- [ ] Fields: Input, Select, Checkbox, Radio, Switch — rest, hover, focus, invalid, disabled, placeholder
- [ ] Surfaces: Card variants, Accordion, Table, Tabs
- [ ] Overlays: Popover/Dropdown/Select list, Tooltip + arrow, Modal + backdrop, Toast — background, shadow, radius
- [ ] Soft colors: Chip/Badge/Alert in accent, success, warning, danger
- [ ] Reduced motion still disables new transitions
- [ ] If the project has a `DESIGN.md`, update it to the new tokens

## References

Load on demand: [tokens.md](references/tokens.md) (every token, default, utility, effect), [components.md](references/components.md) (BEM conventions, states, per-component properties), [theme-recipe.md](references/theme-recipe.md) (full theme process + worked example), [any-framework.md](references/any-framework.md) (plain HTML, Vue, Svelte, CDN, selective imports).

Human docs: [Theming](https://heroui.com/docs/react/getting-started/theming.mdx), [Colors](https://heroui.com/docs/react/getting-started/colors.mdx), [Styling](https://heroui.com/docs/react/getting-started/styling.mdx), [Dark Mode](https://heroui.com/docs/react/getting-started/dark-mode.mdx).
