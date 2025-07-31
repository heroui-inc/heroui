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
│   └── default.css    # Default light/dark theme
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
@import "@heroui/styles/themes/default.css" layer(base);
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
  --border-width: 1px;
  --disabled-opacity: 0.5;

  /* Radius */
  --radius: 0.75rem;
  --radius-panel: 0.5rem;
  --radius-panel-inner: calc(var(--radius-panel) * 0.5);

  /* Typography */
  --font-size-base: 1rem;
  --font-size-scale-desktop: 0.875;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;

  /* Cursor */
  --cursor-interactive: pointer;
  --cursor-disabled: not-allowed;
}
```

#### Theme Colors

```css
:root {
  /* Base Colors */
  --background: oklch(100% 0 0);
  --foreground: oklch(14.48% 0 0);
  --panel: oklch(100% 0 0);

  /* Interactive Colors */
  --accent: oklch(0.14 0 0);
  --accent-foreground: oklch(0.99 0 0);
  --accent-hover: oklch(0.22 0 0);

  /* Status Colors */
  --success: oklch(0.55 0.1241 153.51);
  --warning: oklch(0.67 0.1428 72.73);
  --danger: oklch(0.59 0.2228 29.94);

  /* UI Colors */
  --border: oklch(0 0 0 / 15%);
  --focus: oklch(0% 0 0 / 20%);
  --scrollbar: var(--color-neutral-300);
}
```

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
