# HeroUI Theme System

HeroUI v3 includes a built-in theme system, providing `light`, `dark`, `light-glass`, and `dark-glass` themes.

## Usage

### Import the CSS

The theme system is automatically included when you import HeroUI styles:

```css
/* Your main CSS file */
@import "@heroui/react/index.css";
```

Or if you want to import just the theme styles:

```css
@import "@heroui/react/theme.css";
```

### Using Themes

Apply themes using the `data-theme` attribute:

```tsx
// Default light theme
<div className="bg-background text-foreground">
  Light theme content
</div>

// Dark theme
<div data-theme="dark" className="bg-background text-foreground">
  Dark theme content
</div>

// Glass themes with blur effects
<div data-theme="light-glass" className="glass-panel">
  Light glass with blur
</div>

<div data-theme="dark-glass" className="glass-panel">
  Dark glass with blur
</div>
```

### Theme Switcher Component

HeroUI includes a built-in theme switcher component:

```tsx
import {ThemeSwitcher} from "@heroui/react";

export function App() {
  return (
    <div>
      <ThemeSwitcher />
      {/* Your app content */}
    </div>
  );
}
```

### Programmatic Theme Control

Use the theme utilities for programmatic control:

```tsx
import {applyTheme, getTheme, registerTheme} from "@heroui/react";

// Apply a theme
applyTheme(document.documentElement, "dark");

// Get current theme
const currentTheme = getTheme(document.documentElement);

// Register a custom theme
registerTheme("my-theme", {
  "--background": "oklch(98% 0.02 250)",
  "--foreground": "oklch(20% 0.01 250)",
  // ... other variables
});
```

## Available Themes

### 1. Light (Default)
- Clean, minimal design
- High contrast for readability
- No blur effects

### 2. Dark
- Inverted color scheme
- Reduced eye strain in low light
- Automatic via `prefers-color-scheme`

### 3. Light Glass
- Translucent backgrounds
- Soft blur effects (5-20px)
- Modern glassmorphism aesthetic

### 4. Dark Glass
- Dark translucent backgrounds
- Enhanced depth perception
- Subtle glow effects

## Glass Effect Utilities

Glass themes include special blur utilities:

```tsx
// Standard glass (10px blur)
<div className="glass">Content</div>

// Soft glass (5px blur)
<div className="glass-soft">Subtle effect</div>

// Strong glass (20px blur)
<div className="glass-strong">Maximum blur</div>

// Pre-styled glass components
<div className="glass-panel">Panel with border and shadow</div>
<div className="glass-surface">Surface with subtle border</div>
```

## Theme Variables

Each theme provides these CSS variables:

### Colors
- `--background` / `--foreground` - Main colors
- `--panel` - Panel/card backgrounds
- `--surface` / `--surface-foreground` - Nested elements
- `--accent` / `--accent-foreground` - Primary actions
- `--muted` / `--muted-foreground` - Disabled states
- `--base` / `--base-foreground` - Base UI elements

### Status
- `--success` / `--success-foreground`
- `--warning` / `--warning-foreground`
- `--danger` / `--danger-foreground`

### UI Properties
- `--border` - Border color
- `--focus` - Focus ring color
- `--radius` - Border radius base (0.75rem)
- `--shadow-border` - Box shadows

### Glass Effects
- `--blur` - Standard blur (10px in glass themes)
- `--blur-soft` - Soft blur (5px)
- `--blur-strong` - Strong blur (20px)

## Examples

### Card with Theme

```tsx
import {Card} from "@heroui/react";

function ThemedCard() {
  return (
    <div data-theme="light-glass" className="p-8">
      <Card className="glass-panel">
        <Card.Header>
          <Card.Title>Glass Card</Card.Title>
        </Card.Header>
        <Card.Body>
          This card has a glass effect with blur
        </Card.Body>
      </Card>
    </div>
  );
}
```

### Nested Themes

```tsx
function NestedThemes() {
  return (
    <div data-theme="dark" className="bg-background p-8">
      <h1 className="text-foreground">Dark Container</h1>
      
      <div data-theme="light-glass" className="glass-panel p-4 mt-4">
        <h2 className="text-foreground">Light Glass Nested</h2>
        <p className="text-muted-foreground">
          Different theme in nested element
        </p>
      </div>
    </div>
  );
}
```

### Custom Theme

```tsx
import {registerTheme} from "@heroui/react";

// Register at app initialization
registerTheme("brand", {
  "--background": "oklch(98% 0.02 250)",
  "--foreground": "oklch(20% 0.01 250)",
  "--panel": "oklch(95% 0.02 250)",
  "--accent": "oklch(0.7 0.2 250)",
  "--accent-foreground": "oklch(99% 0 0)",
  // ... all other required variables
});

// Use it
<div data-theme="brand">
  <YourComponent />
</div>
```

## Browser Support

- Modern browsers with CSS custom properties
- Backdrop filter for glass effects (degrades gracefully)
- `prefers-color-scheme` for automatic dark mode

## Best Practices

1. **Root Level Theme**: Set on `<html>` for global theme
2. **Component Themes**: Override locally with `data-theme`
3. **Glass Performance**: Use glass effects sparingly on mobile
4. **Accessibility**: Ensure sufficient contrast in glass themes
5. **Storage**: Save user preference in localStorage

## Integration with Tailwind

The theme system integrates seamlessly with Tailwind:

```tsx
// Use theme colors with Tailwind utilities
<div className="bg-background text-foreground border-border">
  <button className="bg-accent text-accent-foreground hover:bg-accent-hover">
    Action
  </button>
</div>

// Combine with Tailwind modifiers
<div className="bg-surface dark:bg-surface-1">
  Responds to theme changes
</div>
```