# HeroUI Theme Addon for Storybook

This addon provides theme switching capabilities for HeroUI components in Storybook.

## Features

- Theme selector in Storybook toolbar
- Support for all HeroUI themes:
  - System (follows OS preference)
  - Light
  - Dark
  - Light Glass
  - Dark Glass
- Automatic background patterns for glass themes
- Persistent theme selection across stories

## How it works

1. **Theme Selector**: A dropdown in the toolbar allows switching between themes
2. **Decorator**: Applies the selected theme to the document root
3. **Glass Backgrounds**: Automatically adds gradient backgrounds for glass themes
4. **System Theme**: Respects the user's OS color scheme preference

## Usage

The theme addon is automatically included in the Storybook configuration. Simply use the paintbrush icon in the toolbar to switch themes.

### In Stories

Components will automatically adapt to the selected theme:

```tsx
export const MyStory: Story = {
  render: () => (
    <div className="bg-background text-foreground p-4">
      <Button>Themed Button</Button>
    </div>
  ),
};
```

### Glass Effects

Glass effects are visible when glass themes are selected:

```tsx
export const GlassStory: Story = {
  render: () => (
    <div className="glass-panel p-6">
      <h2>Glass Panel</h2>
      <p>This will have blur effects in glass themes</p>
    </div>
  ),
};
```

## Configuration

The theme addon configuration is in:
- `constants.ts` - Theme options and defaults
- `decorator.tsx` - Theme application logic
- `preview.ts` - Storybook toolbar configuration