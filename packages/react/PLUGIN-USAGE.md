# HeroUI Plugin Usage

HeroUI works as both a Tailwind CSS plugin and a React component library.

## Installation

```bash
npm install @heroui/react
```

## Usage

### 1. As a Tailwind CSS Plugin

Add HeroUI to your CSS file:

```css
@import "tailwindcss";
@plugin "@heroui/react/plugin";
```

This gives you:
- All HeroUI themes (light, dark, light-glass, dark-glass)
- CSS utility classes (bg-accent, text-foreground, etc.)
- Glass effects and utilities

Use the CSS utilities in your HTML:

```html
<div class="bg-panel p-4 rounded-lg">
  <h1 class="text-foreground">Hello World</h1>
  <button class="bg-accent text-accent-foreground px-4 py-2 rounded">
    Click me
  </button>
</div>
```

### 2. Theme Customization

Customize theme variables:

```css
@import "tailwindcss";
@plugin "@heroui/react/plugin";
@plugin "@heroui/react/theme" {
  name: "my-theme";
  default: true;
  --color-primary: blue;
  --accent: oklch(76.76% 0.184 183.61);
  --accent-foreground: oklch(15.352% 0.036 183.61);
}
```

### 3. React Components

Import and use React components:

```jsx
import { Button, Chip, Accordion } from "@heroui/react";

function App() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <Chip>New</Chip>
      <Accordion>
        <Accordion.Item>
          <Accordion.Trigger>Item 1</Accordion.Trigger>
          <Accordion.Content>Content 1</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
```

## Export Structure

```
@heroui/react           # React components
@heroui/react/plugin    # Main CSS plugin
@heroui/react/theme     # Theme customization plugin
```

## CSS Variables

All theme colors are available as CSS variables:

- `--background`, `--foreground`
- `--panel`, `--base`, `--surface`
- `--accent`, `--accent-foreground`
- `--success`, `--warning`, `--danger`
- And many more...

Use them directly:

```css
.my-element {
  background-color: var(--accent);
  color: var(--accent-foreground);
}
```