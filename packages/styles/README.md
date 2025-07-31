# @heroui/core

The core HeroUI package containing the Tailwind CSS plugin, themes, and component styles. This package is framework-agnostic and can be used with any JavaScript framework.

## Installation

```bash
npm install @heroui/core
# or
pnpm add @heroui/core
# or
yarn add @heroui/core
```

## Usage

### Basic Setup

In your `tailwind.config.js`:

```js
import heroui from "@heroui/core/plugin";

export default {
  plugins: [
    heroui({
      // Options
    }),
  ],
};
```

Or with Tailwind CSS v4 `@plugin` directive in your CSS:

```css
@plugin "@heroui/core/plugin";
```

### Plugin Options

| Option    | Type                 | Default       | Description                                              |
| --------- | -------------------- | ------------- | -------------------------------------------------------- |
| `theme`   | `string \| false`    | `"default"`   | Theme to use (default, light, dark, or false to disable) |
| `logs`    | `boolean`            | `true` in dev | Enable/disable console logs                              |
| `prefix`  | `string`             | `""`          | Prefix for all HeroUI classes                            |
| `include` | `string \| string[]` | `[]`          | Components to include (empty = all)                      |
| `exclude` | `string \| string[]` | `[]`          | Components to exclude                                    |

### Examples

#### Using a Different Theme

```js
heroui({
  theme: "glass", // or "glass-light", "glass-dark"
});
```

#### Adding a Prefix

```js
heroui({
  prefix: "hui-", // Results in classes like .hui-button
});
```

#### Including Only Specific Components

```js
heroui({
  include: ["button", "input", "select"],
});
```

#### Excluding Components

```js
heroui({
  exclude: ["table", "chart"],
});
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

### Available Themes

- `default` / `light` - Light theme (default)
- `dark` - Dark theme with dark mode support
- `glass` / `glass-light` - Glass morphism light theme
- `glass-dark` - Glass morphism dark theme

### CSS Variables

The plugin provides a comprehensive set of CSS variables for customization:

```css
:root {
  /* Colors */
  --background: oklch(100% 0 0);
  --foreground: oklch(14.48% 0 0);
  --accent: oklch(0.14 0 0);
  --accent-foreground: oklch(0.99 0 0);

  /* Spacing */
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  /* ... etc */

  /* Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;

  /* And many more... */
}
```

## Framework Integration

This package is designed to work with any framework. For React-specific components, use `@heroui/react` which builds on top of this core package.

## License

MIT
