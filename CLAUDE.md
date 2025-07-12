# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

HeroUI v3 is a modern React UI library built with Tailwind CSS v4, using a pnpm monorepo structure managed by Turborepo.

### Key Technical Stack

- **Node.js**: v22+ required
- **pnpm**: v10.9.0 (package manager)
- **React**: v19+
- **Tailwind CSS**: v4.1.4
- **TypeScript**: v5.8.3
- **Turborepo**: Build orchestration
- **Storybook**: Component development
- **Vitest**: Testing framework

## Development Commands

### Core Development Commands

```bash
# Install dependencies (use --hoist flag)
pnpm i --hoist

# Start Storybook for component development
pnpm dev

# Start documentation site
pnpm dev:docs

# Build all packages
pnpm build

# Build specific package
pnpm build --filter=@heroui/react

# Run linting
pnpm lint

# Run tests
pnpm test

# Test specific component
pnpm test button

# Run formatting
pnpm run format

# Run type checking
pnpm typecheck
```

### Package-Specific Commands

- Use `--filter` flag with package name: `pnpm build --filter=@heroui/react`
- Main packages: `@heroui/react`, `@heroui/docs`, `@heroui/storybook`

## Git Commit Convention

**IMPORTANT**: This repository uses conventional commits with strict validation. All commits must follow this format:

```
<type>(<scope>): <message>
```

### Allowed Types:

- `feat` / `feature`: New features
- `fix`: Bug fixes
- `refactor`: Code refactoring
- `docs`: Documentation changes
- `build`: Build system changes
- `test`: Test changes
- `ci`: CI configuration changes
- `chore`: Other changes

### Examples:

```bash
git commit -m "feat(components): add new prop to avatar component"
git commit -m "fix(button): resolve click handler issue"
git commit -m "docs: update installation guide"
git commit -m "ci: add Claude Code GitHub Action workflow"
```

**Note**: Commits without proper format will be rejected by git hooks.

## Repository Architecture

### Monorepo Structure

```
/
├── apps/
│   └── docs/          # Documentation site (Next.js + Fumadocs)
├── packages/
│   ├── react/         # Main UI component library
│   ├── standard/      # Shared ESLint, Prettier, TypeScript configs
│   ├── storybook/     # Storybook configuration
│   └── vitest/        # Shared Vitest configurations
├── turbo.json         # Turborepo configuration
└── pnpm-workspace.yaml # Workspace definition
```

### Component Architecture Pattern

Each component in `packages/react/src/components/` follows this structure:

```
component-name/
├── component-name.tsx      # Main component (uses React Aria)
├── component-name.styles.ts # Tailwind Variants styling
├── component-name.stories.tsx # Storybook stories
└── index.ts               # Barrel exports
```

### Key Patterns

1. **Styling with Tailwind Variants**:

   - Styles defined in `.styles.ts` files using `tv()` function
   - Support for variants (primary, secondary, etc.)
   - Compound variants for conditional styling
   - Slot system for complex components

2. **Component Implementation**:

   - Built on React Aria Components for accessibility
   - Use `forwardRef` for ref forwarding
   - Display names follow: `HeroUI.ComponentName`
   - Support `asChild` prop pattern when applicable

3. **Type Exports**:

   ```typescript
   export type ComponentProps = {...}
   export type ComponentVariants = VariantProps<typeof componentVariants>
   ```

4. **Utilities** (`packages/react/src/utils/`):
   - `composeTwRenderProps`: Merge Tailwind classes with render props
   - `focusRingClasses`: Consistent focus styling
   - `disabledClasses`: Disabled state styling

### Current Components

- `accordion`: Collapsible content sections
- `alert`: Alert messages with compound components
- `avatar`: User avatars with Radix UI
- `button`: Button with variants and sizes
- `chip`: Small informational badges
- `link`: Styled anchor links
- `menu`: Dropdown menu system
- `popover`: Popover overlays
- `spinner`: Loading indicators
- `tabs`: Tab navigation
- `tooltip`: Hover tooltips

## Development Workflow

1. **Creating/Modifying Components**:

   - Follow existing component patterns
   - Use React Aria Components for accessibility
   - Define styles in separate `.styles.ts` file
   - Create Storybook stories for testing
   - Add "use client" directive for Next.js compatibility

2. **Testing**:

   - Run `pnpm test` for all tests
   - Run `pnpm test <component>` for specific component
   - Ensure all new features have tests

3. **Documentation**:

   - Docs live in `apps/docs/content/`
   - Uses MDX format
   - HeroUI components are pre-imported

4. **Version Management**:
   - Uses Changesets for versioning
   - Run `pnpm changeset` to document changes
   - Follow semantic versioning

## Important Notes

- Always prefer editing existing files over creating new ones
- Follow the established component patterns and conventions
- Ensure accessibility with React Aria Components
- Maintain TypeScript type safety
- Use the commit convention to avoid git hook failures
- Run lint and type checks before committing: `pnpm lint && pnpm typecheck`
