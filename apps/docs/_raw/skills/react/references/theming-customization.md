# HeroUI v3 Theming & Customization Guide

HeroUI v3 uses CSS variables with the `oklch` color space for theming, enabling flexible customization while maintaining consistency across your application.

---

## CSS Variable System

### Core Theme Variables

HeroUI provides semantic color variables using `oklch` for better color transitions:

```css
:root {
  /* Primitive Colors (constant across themes) */
  --white: oklch(100% 0 0);
  --black: oklch(0% 0 0);
  --snow: oklch(0.9911 0 0);
  --eclipse: oklch(0.2103 0.0059 285.89);

  /* Base Colors */
  --background: oklch(0.9702 0 0);
  --foreground: var(--eclipse);

  /* Surface (cards, accordions, disclosure groups) */
  --surface: var(--white);
  --surface-foreground: var(--foreground);

  /* Overlay (tooltips, popovers, modals, menus) */
  --overlay: var(--white);
  --overlay-foreground: var(--foreground);

  /* Primary/Accent */
  --accent: oklch(0.6204 0.195 253.83);
  --accent-foreground: var(--snow);

  /* Status Colors */
  --success: oklch(0.7329 0.1935 150.81);
  --success-foreground: var(--eclipse);

  --warning: oklch(0.7819 0.1585 72.33);
  --warning-foreground: var(--eclipse);

  --danger: oklch(0.6532 0.2328 25.74);
  --danger-foreground: var(--snow);

  /* UI Colors */
  --default: oklch(94% 0.001 286.375);
  --default-foreground: var(--eclipse);
  --muted: oklch(0.5517 0.0138 285.94);
  --border: oklch(90% 0.004 286.32);
  --separator: oklch(92% 0.004 286.32);
  --focus: var(--accent);

  /* Form Fields */
  --field-background: var(--white);
  --field-foreground: var(--foreground);
  --field-placeholder: var(--muted);
  --field-border: transparent;

  /* Common Variables */
  --spacing: 0.25rem;
  --radius: 0.5rem;
  --field-radius: calc(var(--radius) * 1.5);
  --border-width: 1px;
  --disabled-opacity: 0.5;
}
```

### Color Naming Convention

- **Without suffix** = background color (e.g., `--accent`, `--success`)
- **With `-foreground`** = text color for that background (e.g., `--accent-foreground`)

```tsx
// Usage in components
<div className="bg-accent text-accent-foreground">
  Accent colored element
</div>
```

---

## Light/Dark Mode

### Theme Switching

HeroUI supports dark mode via `class` or `data-theme` attribute:

```html
<!-- Using class -->
<html class="dark">

<!-- Using data attribute -->
<html data-theme="dark">
```

### Dark Mode Variables

```css
.dark,
[data-theme="dark"] {
  color-scheme: dark;

  /* Base Colors */
  --background: oklch(12% 0.005 285.823);
  --foreground: var(--snow);

  /* Surface */
  --surface: oklch(0.2103 0.0059 285.89);
  --surface-foreground: var(--foreground);

  /* Overlay */
  --overlay: oklch(0.2103 0.0059 285.89);
  --overlay-foreground: var(--foreground);

  /* Neutral */
  --muted: oklch(70.5% 0.015 286.067);
  --default: oklch(27.4% 0.006 286.033);
  --default-foreground: var(--snow);

  /* Form Fields */
  --field-background: var(--default);

  /* Borders */
  --border: oklch(28% 0.006 286.033);
  --separator: oklch(25% 0.006 286.033);
}
```

### System Preference Detection

```tsx
import { useEffect, useState } from 'react';

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setTheme(mediaQuery.matches ? 'dark' : 'light');

    const handler = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <div className={theme} data-theme={theme}>
      {children}
    </div>
  );
}
```

### Theme Toggle

```tsx
import { useState, useEffect } from 'react';
import { Switch } from '@heroui/react';

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <Switch
      isSelected={isDark}
      onChange={setIsDark}
      aria-label="Toggle dark mode"
    >
      {isDark ? 'Dark' : 'Light'} Mode
    </Switch>
  );
}
```

---

## Component-Level Customization

### BEM Class Structure

HeroUI components use BEM naming:

```css
/* Block */
.button { }

/* Modifiers */
.button--primary { }
.button--secondary { }
.button--tertiary { }
.button--sm { }
.button--md { }
.button--lg { }

/* State-based (via data attributes) */
.button[data-hovered="true"] { }
.button[data-pressed="true"] { }
.button[data-disabled="true"] { }
```

### Customization via @layer

```css
@layer components {
  /* Override button styles */
  .button {
    @apply font-semibold uppercase;
  }

  .button--primary {
    @apply bg-indigo-600 hover:bg-indigo-700;
  }

  /* Add custom variant */
  .button--gradient {
    @apply bg-gradient-to-r from-purple-500 to-pink-500;
  }
}
```

### Using className Prop

```tsx
<Button className="shadow-lg hover:shadow-xl transition-shadow">
  Elevated Button
</Button>

<Card className="backdrop-blur-sm bg-white/80 dark:bg-black/80">
  Glassmorphism Card
</Card>
```

---

## Creating Custom Themes

### Override Existing Colors

```css
:root {
  /* Override accent color */
  --accent: oklch(0.7 0.15 250);

  /* Override status colors */
  --success: oklch(0.65 0.15 155);
  --danger: oklch(0.6 0.2 30);
}

[data-theme="dark"] {
  --accent: oklch(0.8 0.12 250);
  --success: oklch(0.75 0.12 155);
}
```

### Add Custom Colors

```css
:root,
[data-theme="light"] {
  --info: oklch(0.6 0.15 210);
  --info-foreground: oklch(0.98 0 0);
}

.dark,
[data-theme="dark"] {
  --info: oklch(0.7 0.12 210);
  --info-foreground: oklch(0.15 0 0);
}

/* Make available to Tailwind */
@theme inline {
  --color-info: var(--info);
  --color-info-foreground: var(--info-foreground);
}
```

Now use in components:
```tsx
<div className="bg-info text-info-foreground">Info message</div>
```

### Corporate Theme Example

```css
/* themes/corporate.css */
:root {
  /* Brand colors */
  --accent: oklch(0.45 0.15 250);
  --accent-foreground: oklch(0.98 0 0);

  /* Status colors */
  --success: oklch(0.55 0.15 155);
  --warning: oklch(0.7 0.15 75);
  --danger: oklch(0.55 0.2 25);

  /* Conservative radius */
  --radius: 0.25rem;
}

[data-theme="dark"] {
  --accent: oklch(0.65 0.12 250);
}
```

---

## Tailwind CSS v4 Integration

### Using Theme Variables in Tailwind

```tsx
<div className="bg-accent text-accent-foreground">
  Using Tailwind color names
</div>
```

### Targeting Child Elements

```tsx
<TextField className="[&_input]:font-mono [&_label]:text-xs">
  <Label>Code</Label>
  <Input />
</TextField>
```

---

## Best Practices

1. **Use semantic variables** - Prefer `--accent` over hardcoded colors
2. **Respect the system** - Extend rather than replace HeroUI's defaults
3. **Test both modes** - Always verify changes in light and dark mode
4. **Maintain contrast** - Ensure customizations meet accessibility requirements
5. **Use oklch** - Convert colors at [oklch.com](https://oklch.com) for consistency

```css
/* Good: Document custom theme overrides */
:root {
  /* Primary: Acme Blue from brand guidelines */
  --accent: oklch(0.45 0.2 240);

  /* Adjusted for WCAG AA contrast */
  --accent-foreground: oklch(0.98 0 0);
}
```

---

## Source Code Reference

View the complete theme variables:
- Default theme: `https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/packages/styles/themes/default/variables.css`
- Theme definition: `https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/packages/styles/themes/shared/theme.css`
