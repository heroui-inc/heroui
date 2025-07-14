# HeroUI Theme System Usage

The HeroUI theme system is built as a Tailwind CSS v4 plugin 

## Basic Usage

### 1. Import in your CSS

```css
@import "tailwindcss";
@import "@heroui/react/index.css";
```

This automatically includes:
- All HeroUI themes
- The theme plugin
- Glass utilities

### 2. Use Theme Classes

The plugin provides all theme colors as Tailwind utilities:

```html
<!-- Background and text -->
<div class="bg-background text-foreground">
  Content adapts to current theme
</div>

<!-- Panel with border -->
<div class="bg-panel border border-border rounded-lg p-4">
  Panel content
</div>

<!-- Status colors -->
<button class="bg-success text-success-foreground">Success</button>
<button class="bg-warning text-warning-foreground">Warning</button>
<button class="bg-danger text-danger-foreground">Danger</button>

<!-- Glass effects (visible in glass themes) -->
<div class="glass-panel">
  Glass panel with blur
</div>
```

## Available Themes

### Default Themes

1. **light** (default)
   ```html
   <div data-theme="light">Light theme content</div>
   ```

2. **dark**
   ```html
   <div data-theme="dark">Dark theme content</div>
   ```

### Glass Themes

3. **light-glass**
   ```html
   <div data-theme="light-glass" class="glass-panel">
     Light glass with transparency and blur
   </div>
   ```

4. **dark-glass**
   ```html
   <div data-theme="dark-glass" class="glass-panel">
     Dark glass with transparency and blur
   </div>
   ```

## Theme Colors

All theme colors are available as Tailwind utilities:

### Base Colors
- `bg-background` / `text-foreground`
- `bg-panel` / `text-panel`
- `bg-base` / `text-base-foreground`
- `bg-surface` / `text-surface-foreground`
- `bg-muted` / `text-muted-foreground`

### Interactive Colors
- `bg-accent` / `text-accent-foreground`
- `bg-accent-soft` / `text-accent-soft-foreground`
- `hover:bg-accent-hover`
- `hover:bg-accent-soft-hover`

### Status Colors
- `bg-success` / `text-success-foreground`
- `bg-warning` / `text-warning-foreground`
- `bg-danger` / `text-danger-foreground`

### Surface Levels
- `bg-surface-1`
- `bg-surface-2`
- `bg-surface-3`

### Other Utilities
- `border-border` - Theme-aware border color
- `ring-focus` - Focus ring color
- `text-link` - Link color
- `shadow-border` - Theme shadow

## Glass Utilities

Special utilities for glassmorphism effects:

```html
<!-- Soft blur (5px) -->
<div class="glass-soft bg-panel/80">
  Subtle glass effect
</div>

<!-- Standard blur (10px) -->
<div class="glass bg-surface/60">
  Normal glass effect
</div>

<!-- Strong blur (20px) -->
<div class="glass-strong bg-panel/40">
  Maximum glass effect
</div>

<!-- Pre-styled glass components -->
<div class="glass-panel">
  Complete glass panel with blur, border, and shadow
</div>

<div class="glass-surface">
  Glass surface with subtle styling
</div>
```

## Theme Structure

Themes are defined in CSS files under `src/themes/`:

```
src/themes/
├── default.css    # Light and dark themes
├── glass.css      # Light-glass and dark-glass themes
└── index.css      # Imports all themes
```

## Plugin Configuration

The plugin can be configured when importing:

```js
// In a custom Tailwind config (if needed)
import heroUIPlugin from '@heroui/react/src/plugin.js';

export default {
  plugins: [
    heroUIPlugin({
      themes: ['light', 'dark', 'light-glass', 'dark-glass'],
      defaultTheme: 'light',
      prefersDark: 'dark',
    }),
  ],
};
```

## Automatic Dark Mode

The theme system respects `prefers-color-scheme`:

```css
/* Automatically uses dark theme when OS is in dark mode */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    /* Dark theme variables applied */
  }
}
```

## Custom Themes

To add custom themes, create a new CSS file:

```css
/* src/themes/custom.css */
[data-theme="my-theme"] {
  --background: oklch(98% 0.02 250);
  --foreground: oklch(20% 0.01 250);
  /* ... all other variables */
}
```

Then import it in `src/themes/index.css`:

```css
@import "./custom.css";
```

## Example Components

### Themed Card

```jsx
function ThemedCard() {
  return (
    <div className="bg-panel border border-border rounded-lg p-6 shadow-border">
      <h2 className="text-xl font-semibold text-foreground mb-2">
        Themed Card
      </h2>
      <p className="text-muted-foreground">
        This card adapts to the current theme
      </p>
      <button className="mt-4 bg-accent text-accent-foreground px-4 py-2 rounded-md hover:bg-accent-hover">
        Action
      </button>
    </div>
  );
}
```

### Glass Component

```jsx
function GlassCard() {
  return (
    <div data-theme="light-glass" className="p-8">
      <div className="glass-panel rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">Glass Effect</h2>
        <p className="text-muted-foreground mb-6">
          This component has a glass morphism effect with blur and transparency
        </p>
        <div className="flex gap-2">
          <button className="glass-soft bg-accent/90 text-accent-foreground px-4 py-2 rounded-lg">
            Soft Glass
          </button>
          <button className="glass bg-base/80 text-base-foreground px-4 py-2 rounded-lg">
            Normal Glass
          </button>
        </div>
      </div>
    </div>
  );
}
```