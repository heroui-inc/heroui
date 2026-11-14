# Using HeroUI Styles Without React

`@heroui/styles` has no React dependency. It ships plain CSS (theme tokens + BEM component classes) and framework-agnostic variant functions. Any markup that carries the right classes and state attributes gets HeroUI's look: plain HTML, Vue, Svelte, Angular, Astro, server templates, web components.

**What you get:** the visual design, including hover, pressed, focus-visible, disabled, and selected styles.
**What you do not get:** behavior. Keyboard navigation, focus management, ARIA wiring, overlay positioning, and enter/exit state come from React Aria in `@heroui/react`. On other stacks you provide them (native elements first, then a headless library).

## Three ways to load the CSS

| Setup                 | How                                                                                                  | Tailwind utilities | `@apply` in your CSS |
| --------------------- | ---------------------------------------------------------------------------------------------------- | ------------------ | -------------------- |
| Tailwind CSS v4 build | `@import "tailwindcss"; @import "@heroui/styles";` in the main CSS file                              | Yes                | Yes                  |
| Prebuilt file         | Link `node_modules/@heroui/styles/dist/heroui.min.css` (copy it to your static assets)               | No                 | No                   |
| CDN                   | `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@heroui/styles@3/dist/heroui.min.css" />` | No                 | No                   |

Notes:

- Pin the CDN version in production (`@heroui/styles@3.2.7`), since component markup and CSS must match.
- `dist/heroui.min.css` is not in the package's `exports` map. Bundlers that enforce `exports` reject `import "@heroui/styles/dist/heroui.min.css"`; copy or link the file by path instead.
- The prebuilt file contains HeroUI's component classes, theme tokens, and Tailwind's base reset (preflight: margins, borders, and heading sizes are reset page-wide). It does **not** contain Tailwind utilities, so `class="flex gap-4 bg-background"` does nothing there. Write layout CSS yourself or use the Tailwind build.

### Selective imports (Tailwind build)

Import only what a page needs. Use explicit file paths; directory specifiers such as `@heroui/styles/components` are not exported.

```css
@layer theme, base, components, utilities;

@import "tailwindcss";
@import "@heroui/styles/base" layer(base);
@import "@heroui/styles/themes/default" layer(theme);
@import "@heroui/styles/utilities";
@import "@heroui/styles/variants";

@import "@heroui/styles/components/button.css" layer(components);
@import "@heroui/styles/components/card.css" layer(components);
```

`utilities` is required: component CSS applies `status-focused`, `status-disabled`, `no-highlight`, and others from it. `themes/default` brings both the token values and the Tailwind mapping. Shared primitives (`label.css`, `description.css`, `field-error.css`, `close-button.css`) go before the components that restyle them; `components/index.css` shows the full order.

## Minimal working example (no build step)

```html
<!doctype html>
<html lang="en" data-theme="light">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>HeroUI without React</title>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@heroui/styles@3/dist/heroui.min.css"
    />
    <style>
      /* The prebuilt file has no utilities: paint the canvas with tokens */
      body {
        background: var(--background);
        color: var(--foreground);
        font-family: var(--font-sans);
        padding: 2rem;
      }

      .stack {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.5rem;
      }

      /* Global customization works exactly as with React */
      @layer theme {
        :root {
          --accent: oklch(0.55 0.2 300);
          --radius: 0.375rem;
        }
      }

      @layer components {
        .button {
          font-weight: 600;
        }
      }
    </style>
  </head>
  <body>
    <div class="stack">
      <button class="button button--primary">Save</button>
      <button class="button button--secondary">Cancel</button>
      <button class="button button--outline button--sm">Small outline</button>
      <button class="button button--danger" disabled>Disabled</button>
      <span class="chip chip--accent chip--soft"><span class="chip__label">New</span></span>
    </div>

    <div class="stack">
      <div class="card card--default" style="width: 20rem">
        <div class="card__header">
          <h3 class="card__title">Notifications</h3>
          <p class="card__description">Choose what you want to hear about.</p>
        </div>
        <div class="card__content">
          <input class="input input--full-width" type="email" placeholder="you@example.com" />
        </div>
        <div class="card__footer">
          <button class="switch" role="switch" aria-checked="false" type="button">
            <span class="switch__content">
              <span class="switch__control"><span class="switch__thumb"></span></span>
              Email me updates
            </span>
          </button>
        </div>
      </div>
    </div>

    <button class="button button--tertiary" id="mode" type="button">Toggle dark mode</button>

    <script>
      // State is yours to manage: HeroUI styles the ARIA / data attributes you set.
      for (const el of document.querySelectorAll('[role="switch"]')) {
        el.addEventListener("click", () => {
          el.setAttribute("aria-checked", String(el.getAttribute("aria-checked") !== "true"));
        });
      }

      document.getElementById("mode").addEventListener("click", () => {
        const root = document.documentElement;

        root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
      });
    </script>
  </body>
</html>
```

## The markup contract

1. **Classes.** Root gets the block plus modifiers (`button button--primary button--lg`); parts get element classes (`card__header`). Look them up with `node scripts/list_component_classes.mjs <component>` or in [components.md](components.md).
2. **Native state is free.** `:hover`, `:active`, `:focus-visible`, `:disabled`, `:focus` on inputs all work on real `<button>`, `<a>`, `<input>` elements with no attributes.
3. **Non-native state is an attribute you set.** HeroUI's CSS reads the same attributes React Aria writes:

| State                       | Set on the block                                                              |
| --------------------------- | ----------------------------------------------------------------------------- |
| Selected / on               | `aria-checked="true"` or `data-selected="true"`                               |
| Disabled (non-form element) | `aria-disabled="true"` or `data-disabled="true"`                              |
| Invalid                     | `data-invalid="true"` (fields also accept `aria-invalid="true"` where listed) |
| Loading                     | `data-pending="true"`                                                         |
| Overlay animation           | `data-entering="true"` / `data-exiting="true"`, `data-placement="top          | bottom | left | right"` |

4. **Structure matters for compound parts.** Selectors such as `.switch[aria-checked="true"] .switch__control` expect the documented nesting. Mirror the anatomy from the component docs (`https://heroui.com/docs/react/components/<name>.mdx`).
5. **Use real elements.** A `<button>` gets focus, keyboard activation, and `:disabled` for free; a `<div class="button">` gets none of it.

## Variant functions (any JS framework)

The JS entry exports the same `tailwind-variants` functions the React components use. They return class strings, so they work anywhere.

```ts
import {buttonVariants, cardVariants} from "@heroui/styles";

buttonVariants({variant: "primary"}); // "button button--md button--primary"
buttonVariants({variant: "secondary", size: "lg", isIconOnly: true});

// Compound components return one function per part
const card = cardVariants({variant: "secondary"});

card.base(); // "card card--secondary"
card.header(); // "card__header"
```

```vue
<script setup lang="ts">
import {buttonVariants} from "@heroui/styles";
</script>

<template>
  <button :class="buttonVariants({variant: 'primary'})">Save</button>
</template>
```

```svelte
<script lang="ts">
  import {buttonVariants} from "@heroui/styles";
</script>

<button class={buttonVariants({variant: "primary"})}>Save</button>
```

## Theming in this mode

Everything in the skill applies unchanged — tokens, component custom properties, BEM overrides, named themes — because none of it depends on React.

- **Tailwind build:** follow [theme-recipe.md](theme-recipe.md) as written.
- **Prebuilt / CDN:** same files, plain CSS only. Replace `@apply` with declarations, and put the rules in the layers by hand:

```css
@layer theme {
  [data-theme="brand-light"] {
    color-scheme: light;
    --accent: oklch(0.55 0.2 300);
    --accent-foreground: var(--snow);
    --radius: 0.25rem;
  }

  [data-theme="brand-dark"] {
    color-scheme: dark;
    /* full dark palette: see theme-recipe.md, step 2 */
  }
}

@layer components {
  .button {
    font-weight: 600;
    letter-spacing: 0.02em;
  }
}
```

Load this after `heroui.min.css`. The layer names already exist in the prebuilt file, so your rules join them in the right order.

Tokens that only `@heroui/react` reads (`--skeleton-animation`, `--tooltip-delay`, `--tooltip-close-delay`) have no effect without React.
