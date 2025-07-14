# HeroUI v3 Theme Customization

HeroUI v3 makes theme customization incredibly simple. You can customize any aspect of the design system by overriding CSS variables without copying all theme values.

## Quick Start

1. **Install HeroUI**:
```bash
npm install @heroui/react
```

2. **Add the plugin to your CSS**:
```css
@import "tailwindcss";
@plugin "@heroui/react/plugin";
```

3. **Start using HeroUI components**:
```tsx
import {Button} from "@heroui/react";

export default function App() {
  return <Button variant="primary">Click me</Button>;
}
```

## Customizing Theme Variables

### Simple Override

To customize HeroUI, simply override the CSS variables you want to change:

```css
@import "tailwindcss";
@plugin "@heroui/react/plugin";

/* Customize specific colors */
:root {
  /* Brand colors */
  --accent: oklch(0.7 0.25 260);
  --accent-foreground: oklch(0.98 0 0);
  
  /* Success color */
  --success: oklch(0.7 0.2 150);
}
```

### Custom Theme

Create a complete custom theme by overriding more variables:

```css
[data-theme="my-brand"] {
  /* Base colors */
  --background: oklch(0.98 0.01 250);
  --foreground: oklch(0.15 0.01 250);
  
  /* Brand colors */
  --accent: oklch(0.7 0.25 260);
  --accent-foreground: oklch(0.98 0 0);
  --accent-soft: oklch(0.9 0.1 260);
  --accent-soft-foreground: oklch(0.3 0.05 260);
  
  /* Only override what you need! */
}
```

### Using Tailwind CSS Config

You can also customize using Tailwind's CSS variables:

```css
@import "tailwindcss";
@plugin "@heroui/react/plugin";

@theme {
  /* Your custom color scale */
  --color-brand-50: oklch(0.97 0.02 260);
  --color-brand-100: oklch(0.94 0.04 260);
  --color-brand-200: oklch(0.89 0.08 260);
  /* ... more colors ... */
  --color-brand-900: oklch(0.25 0.15 260);
}

:root {
  /* Use your custom colors */
  --accent: var(--color-brand-600);
  --accent-soft: var(--color-brand-100);
}
```

## Available CSS Variables

### Core Colors
- `--background` - Page background
- `--foreground` - Default text color
- `--panel` - Card/panel backgrounds
- `--muted` - Muted text
- `--muted-foreground` - Muted text color

### Interactive Colors
- `--accent` - Primary brand color
- `--accent-foreground` - Text on accent backgrounds
- `--accent-soft` - Soft accent variant
- `--accent-soft-foreground` - Text on soft accent

### Status Colors
- `--success` / `--success-foreground`
- `--warning` / `--warning-foreground`
- `--danger` / `--danger-foreground`

### UI Colors
- `--border` - Border color
- `--focus` - Focus ring color
- `--link` - Link color

### Layout
- `--radius` - Border radius
- `--radius-panel` - Panel border radius

## Advanced Customization

### Responsive Themes

```css
:root {
  --accent: oklch(0.7 0.25 260);
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    --accent: oklch(0.8 0.2 260);
  }
}
```

### Component-Specific Overrides

```css
/* Customize just buttons */
.heroui-button {
  --radius: 0.5rem;
}

/* Or use CSS nesting */
[data-theme="rounded"] {
  --radius: 9999px;
  --radius-panel: 1.5rem;
}
```

## Best Practices

1. **Start Small**: Only override the variables you need
2. **Use OKLCH**: Better color interpolation and consistency
3. **Test Dark Mode**: Ensure your custom colors work in both light and dark themes
4. **Maintain Contrast**: Keep WCAG compliance with proper foreground/background pairs

## Complete Example

```css
@import "tailwindcss";
@plugin "@heroui/react/plugin";

/* Your custom theme overrides */
:root {
  /* Brand colors from your design system */
  --accent: oklch(0.65 0.29 12);
  --accent-foreground: oklch(1 0 0);
  
  /* Softer borders */
  --border: oklch(0 0 0 / 8%);
  
  /* Custom radius */
  --radius: 0.75rem;
}

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --accent: oklch(0.75 0.25 12);
  }
}
```

That's it! No need to copy hundreds of theme values. Just override what you need, and HeroUI handles the rest.