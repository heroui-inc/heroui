# Core

This package contains the core functionality and base components that form the foundation of the HeroUI library.

## Features

- Base component classes and utilities
- Core styling system
- Theme configuration
- Type definitions
- Common utilities

## Usage

```tsx
import { ThemeProvider } from '@heroui/core';

function App() {
  return (
    <ThemeProvider>
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

## Development

The core package should be used as a foundation for other packages in the HeroUI ecosystem. When adding new features:

1. Consider if they belong in core or a more specific package
2. Ensure proper TypeScript types are included
3. Add comprehensive tests
4. Update documentation

## Contributing

Please refer to the main project's CONTRIBUTING.md for guidelines on how to contribute to this package. 