# HeroUI Theme Tokens

Every theme variable in the open-source default theme, grouped by purpose. Defaults below are from `@heroui/styles` 3.2.x. **The installed version is the source of truth** — list it with:

```bash
node scripts/list_tokens.mjs            # shared + light + dark + Tailwind mapping
node scripts/list_tokens.mjs --mode dark
node scripts/list_tokens.mjs --names    # names only
```

Or read the files directly:

| File (published package)                                        | Contains                                   |
| --------------------------------------------------------------- | ------------------------------------------ |
| `node_modules/@heroui/styles/dist/themes/default/variables.css` | Token values: shared, light, dark          |
| `node_modules/@heroui/styles/dist/themes/shared/theme.css`      | Token → Tailwind mapping (`@theme inline`) |
| `node_modules/@heroui/styles/dist/utilities/index.css`          | `focus-ring`, `status-*`, `scrollbar*`     |

## How a token becomes a utility

`theme.css` maps each token into a Tailwind theme namespace with `@theme inline`:

```css
@theme inline {
  --color-accent: var(--accent); /* bg-accent, text-accent, border-accent, ring-accent, fill-accent… */
  --shadow-surface: var(--surface-shadow); /* shadow-surface */
  --radius-field: var(--field-radius, calc(var(--radius) * 1.5)); /* rounded-field */
}
```

So you override the **short name** (`--accent`), and every utility and component that uses `bg-accent` follows. Do not override `--color-*` names.

Naming rule: a color without a suffix is a **background**; the same name with `-foreground` is the **text/icon color placed on it**. Always change them as a pair.

## Which selectors hold the defaults

| Block  | Selector                                                                |
| ------ | ----------------------------------------------------------------------- |
| Shared | `:root, :host`                                                          |
| Light  | `:root, .light, .default, [data-theme="light"], [data-theme="default"]` |
| Dark   | `.dark, [data-theme="dark"]`                                            |

(Each also has a `:host(...)` twin for shadow DOM.) Light and dark blocks set `color-scheme`.

## Primitives

Not mapped to Tailwind utilities (there is no `bg-snow`); reference them with `var()`.

| Token       | Default                       | Used for                                                              |
| ----------- | ----------------------------- | --------------------------------------------------------------------- |
| `--white`   | `oklch(100% 0 0)`             | Light `--surface`, `--overlay`, `--field-background`                  |
| `--black`   | `oklch(0% 0 0)`               | Reserved primitive                                                    |
| `--snow`    | `oklch(0.9911 0 0)`           | Light text on dark fills (`--accent-foreground`, dark `--foreground`) |
| `--eclipse` | `oklch(0.2103 0.0059 285.89)` | Dark text (`--foreground` in light, `--success-foreground`…)          |

Tinting `--snow` / `--eclipse` tints every foreground that references them.

## Canvas and text

| Token          | Light                         | Dark                         | Utility           | Affects                                          |
| -------------- | ----------------------------- | ---------------------------- | ----------------- | ------------------------------------------------ |
| `--background` | `oklch(0.9702 0 0)`           | `oklch(12% 0.005 285.823)`   | `bg-background`   | Page canvas (put on `<body>`), focus ring offset |
| `--foreground` | `var(--eclipse)`              | `var(--snow)`                | `text-foreground` | Default text; input to most calculated tokens    |
| `--muted`      | `oklch(0.5517 0.0138 285.94)` | `oklch(70.5% 0.015 286.067)` | `text-muted`      | Descriptions, placeholders, secondary text       |
| `--link`       | `var(--foreground)`           | `var(--foreground)`          | `text-link`       | Link, breadcrumbs, prose links                   |

## Surfaces (non-floating containers)

| Token                            | Light                         | Dark                          | Utility                             | Affects                                       |
| -------------------------------- | ----------------------------- | ----------------------------- | ----------------------------------- | --------------------------------------------- |
| `--surface`                      | `var(--white)`                | `oklch(0.2103 0.0059 285.89)` | `bg-surface`                        | Card, Accordion, Alert, Table, Toast, Toolbar |
| `--surface-foreground`           | `var(--foreground)`           | `var(--foreground)`           | `text-surface-foreground`           | Text on surfaces                              |
| `--surface-secondary`            | `oklch(0.9524 0.0013 286.37)` | `oklch(0.257 0.0037 286.14)`  | `bg-surface-secondary`              | `card--secondary`, Surface, Table             |
| `--surface-secondary-foreground` | `var(--foreground)`           | `var(--foreground)`           | `text-surface-secondary-foreground` |                                               |
| `--surface-tertiary`             | `oklch(0.9373 0.0013 286.37)` | `oklch(0.2721 0.0024 247.91)` | `bg-surface-tertiary`               | `card--tertiary`, Skeleton                    |
| `--surface-tertiary-foreground`  | `var(--foreground)`           | `var(--foreground)`           | `text-surface-tertiary-foreground`  |                                               |

## Overlays (floating layers)

| Token                  | Light                | Dark                          | Utility                   | Affects                                                                    |
| ---------------------- | -------------------- | ----------------------------- | ------------------------- | -------------------------------------------------------------------------- |
| `--overlay`            | `var(--white)`       | `oklch(0.2103 0.0059 285.89)` | `bg-overlay`              | Popover, Tooltip, Dropdown, Select/ComboBox popovers, Modal, Drawer, Sheet |
| `--overlay-foreground` | `var(--foreground)`  | `var(--foreground)`           | `text-overlay-foreground` | Text on overlays                                                           |
| `--backdrop`           | `rgba(0, 0, 0, 0.5)` | `rgba(0, 0, 0, 0.6)`          | `bg-backdrop`             | Modal, AlertDialog, Drawer, Sheet backdrops                                |

## Neutral fill

| Token                  | Light                      | Dark                         | Utility                   | Affects                                                                      |
| ---------------------- | -------------------------- | ---------------------------- | ------------------------- | ---------------------------------------------------------------------------- |
| `--default`            | `oklch(94% 0.001 286.375)` | `oklch(27.4% 0.006 286.033)` | `bg-default`              | Secondary/tertiary buttons, chips, tabs list, switch track, kbd, hover fills |
| `--default-foreground` | `var(--eclipse)`           | `var(--snow)`                | `text-default-foreground` | Text on `--default`                                                          |
| `--segment`            | `var(--white)`             | `oklch(0.3964 0.01 285.93)`  | `bg-segment`              | Selected tab indicator                                                       |
| `--segment-foreground` | `var(--eclipse)`           | `var(--foreground)`          | `text-segment-foreground` | Text on the selected segment                                                 |

## Accent and status

`--accent` and `--success` are declared once in the shared block; `--warning` and `--danger` per mode.

| Token                  | Light                         | Dark                         | Utility                    | Affects                                                                                            |
| ---------------------- | ----------------------------- | ---------------------------- | -------------------------- | -------------------------------------------------------------------------------------------------- |
| `--accent`             | `oklch(0.6204 0.195 253.83)`  | same                         | `bg-accent`, `text-accent` | Primary button, checked Switch/Checkbox/Radio, Slider, Progress, selected dates, default `--focus` |
| `--accent-foreground`  | `var(--snow)`                 | same                         | `text-accent-foreground`   | Text/icons on accent                                                                               |
| `--success`            | `oklch(0.7329 0.1935 150.81)` | same                         | `bg-success`               | Success chips/badges/meters/progress                                                               |
| `--success-foreground` | `var(--eclipse)`              | same                         | `text-success-foreground`  |                                                                                                    |
| `--warning`            | `oklch(0.7819 0.1585 72.33)`  | `oklch(0.8203 0.1388 76.34)` | `bg-warning`               | Warning chips/badges/meters/progress                                                               |
| `--warning-foreground` | `var(--eclipse)`              | `var(--eclipse)`             | `text-warning-foreground`  |                                                                                                    |
| `--danger`             | `oklch(0.6532 0.2328 25.74)`  | `oklch(0.594 0.1967 24.63)`  | `bg-danger`, `text-danger` | Danger button, invalid field ring, error text                                                      |
| `--danger-foreground`  | `var(--snow)`                 | `var(--snow)`                | `text-danger-foreground`   |                                                                                                    |

## Form fields

One group restyles every field: Input, TextArea, InputGroup, NumberField, SearchField, Select, ComboBox, Autocomplete, DateField, InputOTP, ColorField, and the Checkbox/Radio controls.

| Token                  | Light                         | Dark                          | Utility / variable                       | Affects                   |
| ---------------------- | ----------------------------- | ----------------------------- | ---------------------------------------- | ------------------------- |
| `--field-background`   | `var(--white)`                | `oklch(0.2103 0.0059 285.89)` | `bg-field`                               | Field fill                |
| `--field-foreground`   | `oklch(0.2103 0.0059 285.89)` | `var(--foreground)`           | `text-field-foreground`                  | Typed text, caret         |
| `--field-placeholder`  | `var(--muted)`                | `var(--muted)`                | `placeholder:text-field-placeholder`     | Placeholder               |
| `--field-border`       | `transparent` (shared)        | same                          | `border-field-border`                    | Field outline color       |
| `--field-border-width` | `0px` (shared)                | same                          | `var(--border-width-field)` (no utility) | Field outline width       |
| `--field-radius`       | `calc(var(--radius) * 1.5)`   | same                          | `rounded-field`                          | Field corners             |
| `--field-shadow`       | see Elevation                 | see Elevation                 | `shadow-field`                           | Field depth, switch thumb |

Fields are borderless by default (`0px`, `transparent`). For outlined fields set **both** `--field-border-width` and `--field-border`.

## Lines and focus

| Token         | Light                     | Dark                       | Utility                            | Affects                                               |
| ------------- | ------------------------- | -------------------------- | ---------------------------------- | ----------------------------------------------------- |
| `--border`    | `oklch(90% 0.004 286.32)` | `oklch(28% 0.006 286.033)` | `border-border`                    | Default border color of every element, outline button |
| `--separator` | `oklch(92% 0.004 286.32)` | `oklch(25% 0.006 286.033)` | `bg-separator`, `border-separator` | Separator, Accordion/Table/Drawer dividers            |
| `--focus`     | `var(--accent)`           | `var(--accent)`            | `ring-focus`                       | Focus ring of every interactive component             |

`base.css` sets `border-color: var(--border, currentColor)` on `*`, so any `border` you add picks up `--border` automatically.

## Shape

| Token            | Default                            | Utility                      | Affects                                                                         |
| ---------------- | ---------------------------------- | ---------------------------- | ------------------------------------------------------------------------------- |
| `--radius`       | `0.5rem`                           | `rounded-xs` … `rounded-4xl` | Base of the whole radius scale (below)                                          |
| `--font-sans`    | Tailwind default (system UI stack) | `font-sans`                  | Tailwind's token, not HeroUI's: set it in the theme block to change the UI font |
| `--field-radius` | `calc(var(--radius) * 1.5)`        | `rounded-field`              | Form fields                                                                     |

| Utility       | Value                        | At default |
| ------------- | ---------------------------- | ---------- |
| `rounded-xs`  | `calc(var(--radius) * 0.25)` | 2px        |
| `rounded-sm`  | `calc(var(--radius) * 0.5)`  | 4px        |
| `rounded-md`  | `calc(var(--radius) * 0.75)` | 6px        |
| `rounded-lg`  | `calc(var(--radius) * 1)`    | 8px        |
| `rounded-xl`  | `calc(var(--radius) * 1.5)`  | 12px       |
| `rounded-2xl` | `calc(var(--radius) * 2)`    | 16px       |
| `rounded-3xl` | `calc(var(--radius) * 3)`    | 24px       |
| `rounded-4xl` | `calc(var(--radius) * 4)`    | 32px       |

Buttons use `rounded-3xl`, chips `rounded-2xl`, cards/popovers `min(32px, var(--radius-3xl))`. `--radius: 0` squares everything that uses the scale. The few parts hard-coded to `rounded-full` (for example the sheet handle bar and the tab scroll buttons) or to fixed sizes need a component override.

## Elevation

| Token              | Light                                                                                       | Dark                                   | Utility          | Affects                                      |
| ------------------ | ------------------------------------------------------------------------------------------- | -------------------------------------- | ---------------- | -------------------------------------------- |
| `--surface-shadow` | `0 2px 4px 0 rgba(0,0,0,.04), 0 1px 2px 0 rgba(0,0,0,.06), 0 0 1px 0 rgba(0,0,0,.06)`       | `0 0 0 0 transparent inset`            | `shadow-surface` | Card, Alert, selected tab                    |
| `--overlay-shadow` | `0 2px 8px 0 rgba(0,0,0,.06), 0 -6px 12px 0 rgba(0,0,0,.03), 0 14px 28px 0 rgba(0,0,0,.08)` | `0 0 1px 0 rgba(255,255,255,.3) inset` | `shadow-overlay` | Every popover, tooltip, dialog, toast        |
| `--field-shadow`   | same as light `--surface-shadow`                                                            | `0 0 0 0 transparent inset`            | `shadow-field`   | Fields, checkbox/radio control, switch thumb |

**Never set a shadow token to `none`.** Tailwind composes `box-shadow` as a comma list (`…, var(--tw-ring-shadow), var(--tw-shadow)`); `none` inside a list is invalid, so the whole declaration is dropped and **the focus ring disappears** with it. For "no shadow" use `0 0 0 0 transparent`, as the default dark theme does.

## Sizing and interaction

| Token                  | Default       | Affects                                                                                                              |
| ---------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------- |
| `--spacing`            | `0.25rem`     | Tailwind's spacing unit: every `p-*`, `gap-*`, `h-*`, `size-*` in every component. Changing it rescales the whole UI |
| `--border-width`       | `1px`         | Fallback for `--field-border-width`                                                                                  |
| `--disabled-opacity`   | `0.5`         | Opacity of every disabled component (`status-disabled`)                                                              |
| `--ring-offset-width`  | `2px`         | Gap between a component and its focus ring (`focus-ring`)                                                            |
| `--cursor-interactive` | `pointer`     | Cursor on buttons, switches, tabs, menu items…                                                                       |
| `--cursor-disabled`    | `not-allowed` | Cursor on disabled components                                                                                        |

## Scrollbars

| Token                | Default                                                   | Affects            |
| -------------------- | --------------------------------------------------------- | ------------------ |
| `--scrollbar-thumb`  | `color-mix(in oklch, var(--foreground) 15%, transparent)` | Thumb color        |
| `--scrollbar-track`  | `transparent`                                             | Track color        |
| `--scrollbar-width`  | `thin`                                                    | `scrollbar-width`  |
| `--scrollbar-gutter` | `auto`                                                    | `scrollbar-gutter` |
| `--scrollbar-color`  | `var(--scrollbar-thumb) var(--scrollbar-track)`           | `scrollbar-color`  |
| `--scrollbar`        | `var(--scrollbar-thumb)`                                  | Legacy alias       |

Applied by the `scrollbar` utilities inside component scroll areas. `data-scrollbar="thin | default | none"` on any ancestor switches mode.

## Behavior tokens (read by `@heroui/react`, not by CSS)

| Token                   | Default   | Values                     | Read by                    |
| ----------------------- | --------- | -------------------------- | -------------------------- |
| `--skeleton-animation`  | `shimmer` | `shimmer`, `pulse`, `none` | Skeleton default animation |
| `--tooltip-delay`       | `1500ms`  | any time                   | Tooltip open delay         |
| `--tooltip-close-delay` | `500ms`   | any time                   | Tooltip close delay        |

These have no effect on plain HTML.

## Calculated tokens

Derived with `color-mix()` from the tokens above, inside the light and dark blocks. You normally **do not set them** — change the inputs. Re-declare one only to tune a result (for example a soft foreground that lacks contrast on your background).

| Token                                                                    | Formula (`in oklab`)                                                             | Utility                        |
| ------------------------------------------------------------------------ | -------------------------------------------------------------------------------- | ------------------------------ |
| `--accent-hover`, `--success-hover`, `--warning-hover`, `--danger-hover` | 90% color + 10% its `-foreground`                                                | `bg-accent-hover`…             |
| `--default-hover`                                                        | 96% `--default` + 4% `--default-foreground`                                      | `bg-default-hover`             |
| `--surface-hover`                                                        | 92% `--surface` + 8% `--surface-foreground`                                      | `bg-surface-hover`             |
| `--background-secondary` / `-tertiary`                                   | `--background` + 4% / 8% `--foreground`                                          | `bg-background-secondary`…     |
| `--background-inverse`                                                   | `var(--foreground)`                                                              | `bg-background-inverse`        |
| `--accent-soft`, `--success-soft`, `--warning-soft`                      | color at 15% (light) / 12% (dark) over transparent                               | `bg-accent-soft`…              |
| `--danger-soft`                                                          | `--danger` at 15% over transparent                                               | `bg-danger-soft`               |
| `--default-soft`                                                         | `--default` at 50% over transparent                                              | `bg-default-soft`              |
| `--*-soft-hover`                                                         | same color, a step more opaque (20% light / 16% dark; default 60%)               | `bg-accent-soft-hover`…        |
| `--*-soft-foreground`                                                    | color mixed toward `--foreground` for contrast (default: `--default-foreground`) | `text-accent-soft-foreground`… |
| `--field-hover`                                                          | 90% `--field-background` + 2% `--field-foreground`                               | `bg-field-hover`               |
| `--field-focus`                                                          | `var(--field-background, var(--default))`                                        | `bg-field-focus`               |
| `--field-border-hover` / `--field-border-focus`                          | `--field-border` + 10% / 22% `--field-foreground`                                | `border-field-border-hover`…   |
| `--separator-secondary` / `-tertiary`                                    | `--surface` + 15% / 19% `--surface-foreground`                                   | `bg-separator-secondary`…      |
| `--border-secondary` / `-tertiary`                                       | `--surface` + 22% / 34% `--surface-foreground`                                   | `border-border-secondary`…     |

`data-vibrant-palette="true"` on the root swaps the accent, success, warning and danger `*-soft-foreground` tokens for a more saturated mix (92% color + 8% foreground).

### Calculated tokens resolve where they are declared

`--accent-hover` is declared on the root element, so it mixes the **root's** `--accent`. The same is true for Tailwind theme variables that component CSS reads through `var()` (`--radius-3xl`, `--color-field`, `--border-width-field`).

- Theme applied on `<html>`: everything recomputes. This is the supported setup.
- Theme applied on a nested element: base tokens change, calculated tokens keep the root's values (a button inside gets the new `--accent` but the old `--accent-hover`). If you must scope a theme to a subtree, re-declare the calculated tokens in that block too.

## Tailwind theme variables without a HeroUI token

Defined directly in `theme.css`. Override with your own `@theme` block if needed.

| Variables                                                                                                         | Utilities                                                                                |
| ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `--ease-smooth`, `--ease-out-fluid`, `--ease-{in,out,in-out}-{quad,cubic,quart,quint,expo,circ}`, `--ease-linear` | `ease-smooth`, `ease-out-fluid`, `ease-out-quart`… (also usable as `var(--ease-smooth)`) |
| `--animate-spin-fast`, `--animate-skeleton`, `--animate-caret-blink`                                              | `animate-spin-fast`, `animate-skeleton`, `animate-caret-blink`                           |

## Adding your own tokens

Theme-specific tokens use a `--<theme>-*` prefix and live in the theme's variable blocks (one value per mode). To get utilities for them, map them once in a file that is imported **without** `layer()`:

```css
@theme inline {
  --color-info: var(--info);
  --color-info-foreground: var(--info-foreground);
}
```

Now `bg-info` and `text-info-foreground` exist.

## Override precedence (who wins)

1. Utilities on the element (`className="rounded-none"`) beat everything in `components`.
2. **Unlayered CSS beats every layer.** A stray `:root { --accent: … }` outside a layer overrides a named theme's `--accent` even though the theme selector is more specific. When adopting a named theme, move or delete old unlayered token overrides.
3. Inside the `theme` layer, your `layer(theme)` import wins over the default theme (the defaults sit in a nested sub-layer).
