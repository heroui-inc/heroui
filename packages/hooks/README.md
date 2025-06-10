# Hooks

This package contains custom React hooks that can be used across the HeroUI ecosystem and in your applications.

## Features

- Custom React hooks for common use cases
- Fully typed with TypeScript
- Well-documented with examples
- Tested for reliability

## Usage

```tsx
import { useTheme } from '@heroui/hooks';

function MyComponent() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme('dark')}>
      Current theme: {theme}
    </button>
  );
}
```

## Available Hooks

- `useTheme` - Theme management
- `useMediaQuery` - Media query detection
- `useBreakpoint` - Responsive breakpoint detection
- More hooks coming soon...

## Development

When adding new hooks:
1. Create a new file for your hook
2. Add TypeScript types
3. Write comprehensive tests
4. Add documentation and examples
5. Export the hook in the index file

## Contributing

Please refer to the main project's CONTRIBUTING.md for guidelines on how to contribute to this package. 