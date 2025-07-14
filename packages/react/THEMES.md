# HeroUI Theme System

HeroUI's theme system, providing a clean and efficient way to manage themes in your application.

## How It Works

The theme system consists of:

1. **Theme CSS files** - Pure CSS variable definitions without selectors
2. **Theme Plugin** - Handles applying themes based on `data-theme` attributes
3. **Default Theme** - Light theme is applied by default to `:root`
4. **Dark Mode Support** - Automatic dark theme with `prefers-color-scheme`

## Available Themes

- `light` - Default theme (clean, minimal design)
- `dark` - Dark mode variant
- `light-glass` - Light theme with glassmorphism effects
- `dark-glass` - Dark theme with glassmorphism effects

## Usage

### Basic Setup

Simply import HeroUI's CSS:

```css
@import "@heroui/react/index.css";
```

This automatically includes:
- All theme definitions
- Theme plugin registration
- Glass effect utilities

### Applying Themes

#### Default Theme (Light)

No action needed - light theme is applied by default:

```html
<div class="bg-background text-foreground">
  This uses the light theme by default
</div>
```

#### Specific Theme

Use the `data-theme` attribute:

```html
<!-- Dark theme -->
<div data-theme="dark" class="bg-background text-foreground">
  Dark themed content
</div>

<!-- Glass themes -->
<div data-theme="light-glass" class="glass-panel">
  Light glass with blur effects
</div>

<div data-theme="dark-glass" class="glass-panel">
  Dark glass with blur effects
</div>
```

#### Automatic Dark Mode

The system respects user's OS preference:

```html
<!-- Will be light or dark based on system preference -->
<html>
  <body class="bg-background text-foreground">
    Content adapts to system theme
  </body>
</html>
```

### Theme Scoping

Themes can be applied at any level:

```html
<!-- Apply to entire app -->
<html data-theme="dark">
  <!-- Everything is dark themed -->
</html>

<!-- Apply to specific sections -->
<div class="bg-background">
  <section data-theme="light-glass" class="glass-panel">
    This section uses light glass theme
  </section>
</div>
```

## Available Utilities

All theme colors are available as Tailwind utilities:

### Base Colors
- `bg-background`, `text-foreground`
- `bg-panel`
- `bg-base`, `text-base-foreground`
- `bg-surface`, `text-surface-foreground`

### Interactive States
- `bg-accent`, `text-accent-foreground`
- `bg-accent-soft`, `text-accent-soft-foreground`
- `hover:bg-accent-hover`

### Status Colors
- `bg-success`, `text-success-foreground`
- `bg-warning`, `text-warning-foreground`
- `bg-danger`, `text-danger-foreground`

### Glass Effects
- `.glass` - Standard blur (10px)
- `.glass-soft` - Soft blur (5px)
- `.glass-strong` - Strong blur (20px)
- `.glass-panel` - Pre-styled glass panel
- `.glass-surface` - Pre-styled glass surface

## Plugin Configuration

You can configure the plugin when needed:

```js
// In a custom Tailwind config
import heroUIPlugin from '@heroui/react/src/plugin.js';

export default {
  plugins: [
    heroUIPlugin({
      themes: ['light', 'dark'], // Only include specific themes
      defaultTheme: 'light',     // Default theme (applied to :root)
      prefersDark: 'dark',       // Theme for prefers-color-scheme: dark
    }),
  ],
};
```

## Theme Structure

Themes are defined as pure CSS files with variables only:

```css
/* src/themes/light.css */
--background: oklch(100% 0 0);
--foreground: oklch(14.48% 0 0);
--panel: oklch(100% 0 0);
/* ... more variables */
```

The plugin automatically:
1. Applies the default theme to `:root`
2. Creates `[data-theme="..."]` selectors for other themes
3. Adds `@media (prefers-color-scheme: dark)` support

## Examples

### Simple Theme Toggle

```jsx
function ThemeToggle() {
  const toggleTheme = () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    
    if (next === 'light') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', next);
    }
  };

  return (
    <button onClick={toggleTheme} className="bg-accent text-accent-foreground px-4 py-2 rounded">
      Toggle Theme
    </button>
  );
}
```

### Glass Card Component

```jsx
function GlassCard({theme = 'light-glass', children}) {
  return (
    <div data-theme={theme} className="glass-panel rounded-xl p-6">
      {children}
    </div>
  );
}
```

## Benefits

1. **Clean Architecture** - Themes are pure CSS, no JavaScript overhead
2. **Automatic Application** - Default theme on `:root`, no setup needed
3. **System Integration** - Respects user's dark mode preference
4. **Flexible Scoping** - Apply themes at any DOM level
5. **Tailwind Integration** - All theme colors available as utilities
6. **Performance** - CSS-only solution, no runtime theme switching logic