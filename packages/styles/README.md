# @heroui/styles

The core HeroUI styles package containing CSS files for components, themes, and utilities. This package provides the foundation for HeroUI's design system using Tailwind CSS v4 and is framework-agnostic.

## Installation

```bash
npm install @heroui/styles
# or
pnpm add @heroui/styles
# or
yarn add @heroui/styles
```

## Usage

### Basic Setup

Import the HeroUI styles in your main CSS file:

```css
@import "@heroui/styles";
```

This will import:

- Tailwind CSS base styles
- HeroUI component styles
- HeroUI utilities
- Default theme variables
- Animation utilities from tw-animate-css

### Package Structure

The package exports CSS files organized into:

```
@heroui/styles/
├── index.css          # Main entry point
├── base/              # Base styles and CSS variables
│   └── base.css       # Layout tokens, typography, scrollbar
├── components/        # Component-specific styles
│   ├── accordion.css
│   ├── avatar.css
│   ├── button.css
│   ├── chip.css
│   ├── link.css
│   ├── popover.css
│   └── tooltip.css
├── themes/            # Theme definitions
│   ├── default/       # Default theme
│   │   ├── index.css  # Theme entry point
│   │   └── variables.css  # Theme variables (light/dark)
│   └── shared/        # Shared theme utilities
│       └── theme.css  # Calculated variables and utilities
└── utilities/         # Utility classes
    ├── backdrop.css
    └── index.css
```

### Importing Specific Components

Instead of importing everything, you can import only what you need:

```css
/* Import Tailwind CSS base */
@import "tailwindcss";

/* Import only specific components */
@import "@heroui/styles/components/button.css" layer(components);
@import "@heroui/styles/components/chip.css" layer(components);

/* Import theme */
@import "@heroui/styles/themes/default" layer(base);
```

### Component Classes

Components use a BEM-like naming convention:

- Base: `.button`
- Variants: `.button--primary`, `.button--danger`
- Sizes: `.button--sm`, `.button--lg`
- Modifiers: `.button--icon-only`

#### Button Example

```html
<!-- Basic button -->
<button class="button">Click me</button>

<!-- Primary variant -->
<button class="button button--primary">Save</button>

<!-- Small size -->
<button class="button button--sm">Small</button>

<!-- Icon-only button -->
<button class="button button--icon-only">
  <svg>...</svg>
</button>

<!-- Combining classes -->
<button class="button button--primary button--sm">Small Primary</button>
```

### Themes

The default theme provides automatic light/dark mode support:

- **Light mode**: Applied by default to `:root`
- **Dark mode**: Applied with `.dark` class or `[data-theme="dark"]` attribute

```html
<!-- Dark mode with class -->
<html class="dark">
  <!-- Dark mode with data attribute -->
  <html data-theme="dark"></html>
</html>
```

### CSS Variables

The package provides a comprehensive set of CSS variables for customization:

#### Layout Tokens

```css
:root {
  /* Spacing */
  --spacing: 0.25rem;

  /* Border */
  --border-width: 0px; /* no border by default */
  --field-border-width: var(--border-width);
  --disabled-opacity: 0.5;

  /* Radius */
  --radius: 0.5rem;
  --field-radius: calc(var(--radius) * 1.5);

  /* Ring offset - Used for focus ring */
  --ring-offset-width: 2px;

  /* Cursor */
  --cursor-interactive: pointer;
  --cursor-disabled: not-allowed;
}
```

#### Theme Colors

```css
:root {
  /* Primitive Colors (Do not change between light and dark) */
  --white: oklch(100% 0 0);
  --black: oklch(0% 0 0);
  --snow: oklch(0.9911 0 0);
  --eclipse: oklch(0.2103 0.0059 285.89);

  /* Base Colors */
  --background: oklch(0.9702 0 0);
  --foreground: var(--eclipse);

  /* Surface: Used for non-overlay components (cards, accordions, disclosure groups) */
  --surface: var(--white);
  --surface-foreground: var(--foreground);

  /* Overlay: Used for floating/overlay components (tooltips, popovers, modals, menus) */
  --overlay: var(--white);
  --overlay-foreground: var(--foreground);

  --muted: oklch(0.5517 0.0138 285.94);
  --scrollbar: oklch(87.1% 0.006 286.286);

  --default: oklch(94% 0.001 286.375);
  --default-foreground: var(--eclipse);

  /* Interactive Colors */
  --accent: oklch(0.6204 0.195 253.83);
  --accent-foreground: var(--snow);

  /* Status Colors */
  --success: oklch(0.7329 0.1935 150.81);
  --success-foreground: var(--eclipse);

  --warning: oklch(0.7819 0.1585 72.33);
  --warning-foreground: var(--eclipse);

  --danger: oklch(0.6532 0.2328 25.74);
  --danger-foreground: var(--snow);

  /* Component Colors */
  --segment: var(--white);
  --segment-foreground: var(--eclipse);

  /* UI Colors */
  --border: oklch(0 0 0 / 0%);
  --divider: oklch(92% 0.004 286.32);
  --focus: var(--accent);
  --link: var(--foreground);

  /* Shadows */
  --surface-shadow:
    0 2px 4px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.06), 0 0 1px 0 rgba(0, 0, 0, 0.06);
  --overlay-shadow: 0 4px 16px 0 rgba(24, 24, 27, 0.08), 0 8px 24px 0 rgba(24, 24, 27, 0.09);
  --field-shadow:
    0 2px 4px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.06), 0 0 1px 0 rgba(0, 0, 0, 0.06);
}
```

**Note**: Dark mode overrides specific variables (like `--background`, `--surface`, `--overlay`, `--muted`, `--scrollbar`, `--default`, `--warning`, `--danger`, `--segment`, `--divider`, and shadow values) when `.dark` class or `[data-theme="dark"]` attribute is applied.

#### Field Tokens

```css
:root {
  /* Form field defaults */
  --field-background: var(--white);
  --field-foreground: oklch(0.2103 0.0059 285.89);
  --field-placeholder: var(--muted);
  --field-border: transparent; /* no border by default on form fields */
  --field-border-width: var(--border-width);
  --field-radius: calc(var(--radius) * 1.5);
}
```

Providing any of these knobs automatically updates the generated utilities (`bg-field`, `placeholder:text-field-placeholder`, `rounded-field`, etc.) along with the calculated hover/focus variants.

#### Calculated Variables

The theme also provides calculated variables for hover states, soft colors, and surface levels (defined in `themes/shared/theme.css`):

- **Hover states**: `--color-accent-hover`, `--color-success-hover`, `--color-warning-hover`, `--color-danger-hover`, `--color-default-hover`
- **Soft colors**: `--color-accent-soft`, `--color-danger-soft`, `--color-warning-soft`, `--color-success-soft` (with their foreground and hover variants)
- **Surface levels**: `--color-surface-secondary`, `--color-surface-tertiary`, `--color-surface-quaternary`
- **Radius scale**: `--radius-xs` through `--radius-4xl` (calculated from `--radius`)
- **Transition timing functions**: Various easing curves like `--ease-smooth`, `--ease-fluid-out`, etc.

## Dependencies

- **Tailwind CSS v4+**: Required peer dependency
- **tw-animate-css**: Provides animation utilities

## Build Output

The package provides:

- `index.css`: Main unminified CSS file
- `heroui.min.css`: Minified production-ready CSS (generated during build)

## Framework Integration

This package is designed to work with any framework. For React-specific components, use `@heroui/react` which builds on top of these core styles.

## License

MIT
