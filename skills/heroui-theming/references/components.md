# HeroUI Component CSS: Finding What to Override

Every HeroUI component is styled by one plain CSS file of BEM classes. This file explains how to read those files and what the conventions are, so an override targets selectors that really exist.

## Source of truth

Never guess a class name. Read it from the installed package:

```bash
node scripts/list_component_classes.mjs                 # all component stylesheets
node scripts/list_component_classes.mjs button          # blocks, elements, modifiers, states, custom properties, tokens
node scripts/list_component_classes.mjs modal --css     # plus the raw CSS
```

| What                           | Where                                                                                    |
| ------------------------------ | ---------------------------------------------------------------------------------------- |
| Component CSS (installed)      | `node_modules/@heroui/styles/dist/components/<name>.css`                                 |
| Import order of all components | `node_modules/@heroui/styles/dist/components/index.css`                                  |
| Class ↔ prop mapping           | `node_modules/@heroui/styles/dist/components/<name>/<name>.styles.js` (variant function) |
| Human docs                     | `https://heroui.com/docs/react/components/<name>.mdx` → "CSS Classes" section            |
| Latest source                  | `https://github.com/heroui-inc/heroui/tree/v3/packages/styles/components`                |

`<name>` is kebab-case: `button`, `date-picker`, `list-box-item`, `alert-dialog`.

## Naming conventions

| Kind             | Pattern              | Example                                        | Comes from                                        |
| ---------------- | -------------------- | ---------------------------------------------- | ------------------------------------------------- |
| Block            | `.name`              | `.button`, `.card`, `.date-picker`             | The component root                                |
| Element          | `.name__part`        | `.card__header`, `.switch__thumb`              | A compound part (`<Card.Header>`)                 |
| Nested element   | `.name__part__part`  | `.tabs__list-container__scroll-next`           | A part inside a part                              |
| Modifier         | `.name--value`       | `.button--primary`, `.button--lg`              | A variant prop (`variant="primary"`, `size="lg"`) |
| Element modifier | `.name__part--value` | `.modal__dialog--lg`, `.modal__backdrop--blur` | A variant prop that styles one part               |
| Boolean modifier | `.name--flag`        | `.button--icon-only`, `.input--full-width`     | A boolean prop (`isIconOnly`, `fullWidth`)        |
| Compound         | `.name--a.name--b`   | `.chip--primary.chip--accent`                  | Two variant props combined (`variant` + `color`)  |

Design rules the base CSS follows (keep them when you override):

- **Default size lives in the block.** `.button` already has the medium dimensions; `.button--md` is empty. Size modifiers only override.
- **Color variants only assign custom properties.** `.button--primary` sets `--button-bg`, `--button-bg-hover`, `--button-bg-pressed`, `--button-fg`; `.button` paints them. Prefer re-assigning those properties over re-declaring `background-color`.
- **Component custom properties are declared on the component class**, so setting `--button-bg` on `:root` does nothing. Set them on the block/modifier selector.
- **Colors come from theme tokens**, through utilities (`bg-surface`) or `var(--accent)`. Hardcoded colors are rare and usually deliberate (white switch thumb).

## State selectors

HeroUI styles each state twice: the native pseudo-class **and** the `data-*`/ARIA attribute that `@heroui/react` (React Aria) sets. Override both, or your style will apply on one platform and not the other.

| State          | Pseudo-class     | Attribute                                                                   | Notes                                                                          |
| -------------- | ---------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Hover          | `:hover`         | `[data-hovered="true"]`                                                     | Wrapped in `@media (hover: hover)`                                             |
| Pressed        | `:active`        | `[data-pressed="true"]`                                                     |                                                                                |
| Keyboard focus | `:focus-visible` | `[data-focus-visible="true"]`                                               | Base form: `&:focus-visible:not([data-focused]), &[data-focus-visible="true"]` |
| Field focus    | `:focus`         | `[data-focused="true"]`                                                     | Inputs show focus for pointer too                                              |
| Focus within   | `:focus-within`  | `[data-focus-within="true"]`                                                | Field groups                                                                   |
| Disabled       | `:disabled`      | `[data-disabled="true"]`, `[aria-disabled="true"]`                          |                                                                                |
| Selected / on  | —                | `[data-selected="true"]`, `[aria-checked="true"]`, `[aria-selected="true"]` | Switch, Checkbox, Radio, Tabs, ListBox                                         |
| Invalid        | —                | `[data-invalid="true"]`, `[aria-invalid="true"]`                            |                                                                                |
| Pending        | —                | `[data-pending="true"]`                                                     | Loading buttons                                                                |
| Open           | —                | `[data-open="true"]`, `[data-expanded="true"]`                              | Triggers, disclosures                                                          |
| Enter / exit   | —                | `[data-entering="true"]`, `[data-exiting="true"]`                           | Overlay animations                                                             |
| Placement      | —                | `[data-placement="top"]` (`bottom`, `left`, `right`)                        | Popover, Tooltip                                                               |
| Orientation    | —                | `[data-orientation="horizontal"]` / `"vertical"`                            | Tabs, Slider, RadioGroup, ListBox                                              |

A parent's state often styles a child: `.switch[data-selected="true"] .switch__thumb`. The script prints the exact list per component.

The base file is the authority on the exact selector. Some rules add guards (`.tabs__tab:not([data-selected="true"]):not([data-disabled="true"]):hover`), and a few deliberately use one form only (the accordion trigger hover keys off `:hover` alone). Copy the base selector, then change the declarations.

### State utilities

Shared state styles come from `@heroui/styles/utilities`, applied with `@apply`:

| Utility                | Does                                                  | Tokens                                           |
| ---------------------- | ----------------------------------------------------- | ------------------------------------------------ |
| `status-focused`       | 2px focus ring with an offset                         | `--focus`, `--ring-offset-width`, `--background` |
| `status-focused-field` | 2px focus ring with no offset                         | `--focus`                                        |
| `status-invalid-field` | 1px danger outline; 2px danger ring when focused      | `--danger`                                       |
| `status-disabled`      | Opacity, `not-allowed` cursor, `pointer-events: none` | `--disabled-opacity`, `--cursor-disabled`        |
| `status-pending`       | `pointer-events: none`                                |                                                  |

To restyle focus or disabled globally, change the tokens. Do not remove these rules.

### `data-slot` hooks

Parts that have no BEM class of their own are reached through `data-slot`: `[data-slot="overlay-arrow"]` inside `.tooltip`, `[data-slot="label"]` and `[data-slot="description"]` inside `.switch`, `[data-slot="spinner"]` inside `.button`.

## Writing an override that wins

All HeroUI component CSS is in `@layer components`. Put overrides in the same layer so they come later in source order and so utilities on an element (`className="rounded-none"`) still beat them:

```css
@layer components {
  .card {
    @apply rounded-lg;
  }
}
```

1. **Match the base selector's specificity.** Same layer + same specificity → the later rule (yours) wins. `.switch__thumb { … }` does not beat `.switch[data-selected="true"] .switch__thumb { … }`; repeat the stronger selector.
2. **Re-assert modifiers your block override clobbers.** A new `border` on `.card` also lands on `.card--transparent` (which the base sets to `border-none` earlier in the file). Add `.card--transparent { @apply border-none; }` after it.
3. **Keep the paired selectors.** Copy the selector list from the base file (`&:hover, &[data-hovered="true"]`), then change the declarations.
4. **Do not write raw `box-shadow` in a state rule of a focusable component.** The focus ring is a `box-shadow`. Use shadow utilities (`@apply shadow-[…]`), which set `--tw-shadow` and compose with the ring, or check that the ring still shows.
5. **Keep reduced motion.** If you add or replace a `transition`, follow it with `@apply motion-reduce:transition-none;` (after, not before).
6. **Do not put overrides outside a layer.** Unlayered CSS beats `utilities`, so per-instance `className` overrides would stop working.

## Representative components

Listed from `@heroui/styles` 3.2.x. Re-run the script for your version.

### Button — `button.css`

| Kind     | Selectors                                                                                                                                                                                                      |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Block    | `.button`                                                                                                                                                                                                      |
| Variants | `.button--primary`, `.button--secondary`, `.button--tertiary`, `.button--outline`, `.button--ghost`, `.button--danger`, `.button--danger-soft`                                                                 |
| Sizes    | `.button--sm`, `.button--md` (empty), `.button--lg`                                                                                                                                                            |
| Flags    | `.button--icon-only`, `.button--full-width`; compound `.button--icon-only.button--sm` / `.button--lg`                                                                                                          |
| States   | `:hover` / `[data-hovered="true"]`, `:active` / `[data-pressed="true"]`, `:focus-visible:not([data-focused])` / `[data-focus-visible="true"]`, `:disabled` / `[aria-disabled="true"]`, `[data-pending="true"]` |
| Slots    | `svg` (icons), `[data-slot="spinner"]`, `[data-slot="link-icon"]`                                                                                                                                              |

| Custom property       | Default                  | Painted as         |
| --------------------- | ------------------------ | ------------------ |
| `--button-bg`         | `transparent`            | `background-color` |
| `--button-bg-hover`   | `var(--button-bg)`       | hover background   |
| `--button-bg-pressed` | `var(--button-bg-hover)` | pressed background |
| `--button-fg`         | `currentColor`           | `color`            |

Pressed also applies `transform: scale(0.97)` (`0.98` for `--sm`, `0.96` for `--lg`). Shape: `rounded-3xl`, height `h-10 md:h-9`.

### Card — `card.css`

| Kind     | Selectors                                                                                                                       |
| -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Block    | `.card` (padding, gap, `shadow-surface`, radius `min(32px, var(--radius-3xl))`)                                                 |
| Elements | `.card__header`, `.card__title`, `.card__description`, `.card__content`, `.card__footer`                                        |
| Variants | `.card--default` (`bg-surface`), `.card--secondary`, `.card--tertiary`, `.card--transparent` (no border, background, or shadow) |

No states and no custom properties: restyle through `--surface*`, `--surface-shadow`, `--radius`, or the block.

### Chip — `chip.css`

| Kind     | Selectors                                                                                     |
| -------- | --------------------------------------------------------------------------------------------- |
| Block    | `.chip`; element `.chip__label`                                                               |
| Colors   | `.chip--default`, `.chip--accent`, `.chip--success`, `.chip--warning`, `.chip--danger`        |
| Variants | `.chip--primary`, `.chip--secondary`, `.chip--soft`, `.chip--tertiary`                        |
| Sizes    | `.chip--sm`, `.chip--md` (empty), `.chip--lg`                                                 |
| Compound | `.chip--primary.chip--accent` (solid), `.chip--accent.chip--soft` (soft) — one pair per color |

Custom properties: `--chip-bg` (default `var(--default)`), `--chip-fg` (default `currentColor`).

### Switch — `switch.css`

| Kind     | Selectors                                                                                                                                                                                                                                                                                             |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Block    | `.switch` (the label wrapper; carries the state attributes)                                                                                                                                                                                                                                           |
| Elements | `.switch__content`, `.switch__control` (track), `.switch__thumb`                                                                                                                                                                                                                                      |
| Sizes    | `.switch--sm`, `.switch--md` (empty), `.switch--lg`                                                                                                                                                                                                                                                   |
| States   | On the block: `[data-selected="true"]` / `[aria-checked="true"]`, `[data-disabled="true"]`, `:hover` / `[data-hovered="true"]`, `:active` / `[data-pressed="true"]`, `:focus-visible` / `[data-focus-visible="true"]` — styled on the children, e.g. `.switch[data-selected="true"] .switch__control` |
| Slots    | `[data-slot="switch-content"]`, `[data-slot="label"]`, `[data-slot="description"]`, `[data-slot="field-error"]`                                                                                                                                                                                       |

| Custom property (on `.switch`)      | Default                                                          |
| ----------------------------------- | ---------------------------------------------------------------- |
| `--switch-control-bg`               | `var(--default)`                                                 |
| `--switch-control-bg-hover`         | `color-mix(in oklab, var(--switch-control-bg), transparent 20%)` |
| `--switch-control-bg-pressed`       | `var(--switch-control-bg-hover)`                                 |
| `--switch-control-bg-checked`       | `var(--accent)`                                                  |
| `--switch-control-bg-checked-hover` | `var(--accent-hover)`                                            |

The thumb is positioned with `--switch-thumb-offset`; the track has `overflow-hidden`, so borders on the track change the thumb's travel (draw outlines with shadows instead).

### Input — `input.css`

| Kind     | Selectors                                                                                                                                                                                                |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Block    | `.input`                                                                                                                                                                                                 |
| Variants | `.input--primary` (empty, default), `.input--secondary` (filled with `--default`, no shadow)                                                                                                             |
| Flags    | `.input--full-width`                                                                                                                                                                                     |
| States   | `:hover` / `[data-hovered="true"]` (only while not focused), `:focus` / `[data-focused="true"]`, `[data-invalid="true"]`, `:disabled` / `[data-disabled="true"]` / `[aria-disabled="true"]`, `:autofill` |

Custom properties: `--input-bg` (current fill, default `var(--color-field)`), `--input-bg-hover`, `--input-bg-focus`. Everything else is a field token (`--field-background`, `--field-border`, `--field-border-width`, `--field-radius`, `--field-shadow`, `--field-placeholder`), which also drive `.textarea`, `.input-group`, `.number-field__group`, `.search-field__group`, `.date-input-group`, `.select__trigger`, `.autocomplete__trigger`, `.input-otp__slot`. Prefer the tokens: one change covers every field.

## Which class is the overlay surface

Overlays have wrappers for positioning and animation; the visible panel is one specific class.

| Component                        | Panel (background, radius, `--overlay-shadow`)                      | Other parts                                                                                 |
| -------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Popover                          | `.popover`                                                          | `.popover__dialog`, `.popover__heading`                                                     |
| Tooltip                          | `.tooltip`                                                          | arrow: `[data-slot="overlay-arrow"]`                                                        |
| Dropdown                         | `.dropdown__popover`                                                | `.dropdown__menu`, items: `.menu-item`                                                      |
| Select / ComboBox / Autocomplete | `.select__popover`, `.combo-box__popover`, `.autocomplete__popover` | items: `.list-box-item`                                                                     |
| DatePicker / DateRangePicker     | `.date-picker__popover`, `.date-range-picker__popover`              | `.calendar`, `.range-calendar`                                                              |
| ColorPicker                      | `.color-picker__popover`                                            |                                                                                             |
| Modal                            | `.modal__dialog`                                                    | `.modal__backdrop`, `.modal__container`, `.modal__header`, `.modal__body`, `.modal__footer` |
| AlertDialog                      | `.alert-dialog__dialog`                                             | `.alert-dialog__backdrop`, `.alert-dialog__container`                                       |
| Drawer / Sheet                   | `.drawer__dialog`, `.sheet__dialog`                                 | `.drawer__backdrop`, `.sheet__backdrop`                                                     |
| Toast                            | `.toast`                                                            | `.toast__title`, `.toast__description`                                                      |

To restyle all of them at once, change `--overlay`, `--overlay-shadow`, `--backdrop`, and `--radius`. Overlays render in a portal on `<body>`, so they only inherit a theme applied on `<html>`.

## Components with color custom properties

Re-assign these on the block or modifier instead of re-declaring colors.

| Component          | Custom properties                                                                                                                                                                                                             |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Button             | `--button-bg`, `--button-bg-hover`, `--button-bg-pressed`, `--button-fg`                                                                                                                                                      |
| ToggleButton       | `--toggle-button-bg` (+ `-hover`, `-pressed`), `--toggle-button-fg`, `--toggle-button-bg-selected` (+ `-hover`, `-pressed`), `--toggle-button-fg-selected`                                                                    |
| Chip               | `--chip-bg`, `--chip-fg`                                                                                                                                                                                                      |
| Badge              | `--badge-bg`, `--badge-fg`, `--badge-border`                                                                                                                                                                                  |
| Switch             | `--switch-control-bg` (+ `-hover`, `-pressed`, `-checked`, `-checked-hover`)                                                                                                                                                  |
| Pagination         | `--pagination-link-bg` (+ `-hover`, `-pressed`), `--pagination-link-fg`                                                                                                                                                       |
| Input, TextArea    | `--input-bg`, `--textarea-bg` (+ `-hover`, `-focus`)                                                                                                                                                                          |
| Field groups       | `--input-group-bg`, `--number-field-group-bg`, `--search-field-group-bg`, `--date-input-group-bg`, `--color-input-group-bg`, `--select-trigger-bg`, `--autocomplete-trigger-bg`, `--input-otp-slot-bg` (+ `-hover`, `-focus`) |
| Meter, ProgressBar | `--meter-fill`, `--progress-bar-fill`                                                                                                                                                                                         |
| ProgressCircle     | `--progress-circle-stroke`, `--progress-circle-track-stroke`                                                                                                                                                                  |
| Avatar             | `--avatar-size`, `--avatar-radius`                                                                                                                                                                                            |

Components not listed read theme tokens directly.

## Adding a variant

A new modifier is just another class in `@layer components`. Reuse the component's custom properties so hover, pressed, focus, and disabled keep working. Assign all of them: the component's default variant modifier (`.button--primary`) is still on the element.

```css
@layer components {
  .button--brand {
    --button-bg: var(--success);
    --button-bg-hover: var(--success-hover);
    --button-bg-pressed: var(--success-hover);
    --button-fg: var(--success-foreground);
  }
}
```

Use it with `className` (the block class is added by the component): `<Button className="button--brand">` or, on plain HTML, `<button class="button button--brand">`. For a typed prop, extend the variant function: `tv({extend: buttonVariants, variants: {variant: {brand: "button--brand"}}})` (see the Styling guide: `https://heroui.com/docs/react/getting-started/styling.mdx`).
