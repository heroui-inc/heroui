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
├── component-name.stories.tsx # Storybook stories (title: "Components/ComponentName")
└── index.ts               # Barrel exports
```

**IMPORTANT**: All Storybook stories must use the "Components" group in their title. For example: `title: "Components/Card"`, `title: "Components/Button"`, etc.

### Core Component Design Principles

**IMPORTANT**: HeroUI v3 follows a compound component pattern similar to Radix UI, built on top of React Aria Components primitives. This enables maximum flexibility and customization for users.

### React Aria Components Integration

**CRITICAL**: Before implementing any component, you MUST:
1. Visit React Aria Components docs: https://react-spectrum.adobe.com/react-aria/
2. Study the specific component's API and examples
3. Understand its accessibility features and ARIA patterns
4. Plan the transformation from React Aria's prop-based API to Radix UI's composition-based API

React Aria provides the accessibility foundation, but we transform their API to match Radix UI's compound component pattern for better customization.

#### 1. **Compound Component Pattern**:
- Export all internal component pieces (Root, Item, Trigger, Content, etc.)
- Each piece can be styled and composed independently
- Users can customize render logic without accessing internal code
- Examples: Accordion (Root, Item, Heading, Trigger, Panel, Indicator, Body), Alert (Root, Icon, Title, Description, Action, Close)

#### 2. **Export Strategy**:
```typescript
// Named exports for compound components
export * as ComponentName from "./component-name";

// Direct exports for simple components
export {Component, type ComponentProps} from "./component";

// Always export variants
export {componentVariants, type ComponentVariants} from "./component.styles";
```

#### 3. **Component Structure for Compound Components**:
```typescript
// Context for sharing state/styles
const ComponentContext = createContext<{slots?: ReturnType<typeof componentVariants>}>({});

// Root component wraps with context
const ComponentRoot = React.forwardRef<...>(({children, className, ...props}, ref) => {
  const slots = React.useMemo(() => componentVariants({...}), [...]);
  
  return (
    <ComponentContext.Provider value={{slots}}>
      <ReactAriaComponent ref={ref} className={composeTwRenderProps(className, slots.base())}>
        {children}
      </ReactAriaComponent>
    </ComponentContext.Provider>
  );
});

// Child components consume context
const ComponentItem = React.forwardRef<...>(({className, ...props}, ref) => {
  const {slots} = useContext(ComponentContext);
  
  return (
    <ReactAriaComponent ref={ref} className={composeTwRenderProps(className, slots?.item())}>
      {props.children}
    </ReactAriaComponent>
  );
});

// Export pattern
export {ComponentRoot as Root, ComponentItem as Item, ...};
```

#### 4. **Key Implementation Details**:

1. **Styling with Tailwind Variants**:
   - Styles defined in `.styles.ts` files using `tv()` function from `tailwind-variants`
   - **IMPORTANT**: Always import from `tailwind-variants`, never from `@heroui/standard` (which doesn't exist)
   - **CRITICAL**: tailwind-variants already includes `twMerge` functionality, so NEVER manually use `twMerge`
   - **RULE**: All component styles MUST be defined in separate `.styles.ts` files, NOT in the component implementation files
   - Component implementation files (`.tsx`) should only contain logic and React Aria primitives
   - Example imports:
     ```typescript
     import type {VariantProps} from "tailwind-variants";
     import {tv} from "tailwind-variants";
     ```
   - Support for variants (primary, secondary, etc.)
   - Compound variants for conditional styling
   - Slot system for complex components

2. **Component Features**:
   - Built on React Aria Components for accessibility
   - Use `forwardRef` for all components
   - Display names follow: `HeroUI.ComponentName` or `HeroUI.Component.SubPart`
   - Support `asChild` prop pattern when applicable (using Radix UI's Slot)
   - Support render props from React Aria when available

3. **Type Exports**:
   ```typescript
   // Export props for each component part
   export type ComponentRootProps = {...}
   export type ComponentItemProps = {...}
   export type ComponentVariants = VariantProps<typeof componentVariants>
   ```

4. **Utilities** (`packages/react/src/utils/`):
   - `composeTwRenderProps`: Merge Tailwind classes with render props
   - `focusRingClasses`: Consistent focus styling
   - `disabledClasses`: Disabled state styling
   - `mapPropsVariants`: Separate variant props from component props
   - `objectToDeps`: Convert objects to dependency arrays for memoization

5. **React Aria Components className Patterns**:

   **CRITICAL**: React Aria components have different className prop behaviors:
   
   **Components that support render props** (use `composeTwRenderProps`):
   - Button, TextField, FieldError, Checkbox, CheckboxGroup
   - Switch, RadioGroup, Radio, Slider (and Track, Thumb, Output)
   - Popover, Tooltip, Tabs (and Tab, TabList, TabPanel)
   - Link, Menu, MenuItem, Accordion (DisclosureGroup)
   
   **Components that ONLY accept string className** (pass className directly):
   - Label, Text, Input, TextArea
   - Heading, Dialog, OverlayArrow
   
   **Usage examples**:
   ```typescript
   // For render prop components - use composeTwRenderProps
   <ButtonPrimitive 
     className={composeTwRenderProps(className, slots?.button())} 
   />
   
   // For string-only components - pass className directly
   <LabelPrimitive 
     className={slots?.label({className})} 
   />
   // OR
   <LabelPrimitive 
     className={labelVariants({size, variant, className})} 
   />
   ```
   
   **How to check**: If unsure, check the React Aria docs or try both approaches - TypeScript will error if a component doesn't support render props

6. **Composition Pattern with Existing Components**:

   **CRITICAL**: HeroUI follows a composition-based approach. Components should reuse existing primitives rather than creating component-specific versions.

   **Key Principles**:
   - **DO NOT** create component-specific Label, Description, or FieldError components
   - **DO** reuse the existing `Label`, `Description`, and `FieldError` components
   - **DO** use standard HTML composition patterns with `htmlFor`/`id` attributes

   **Example Pattern**:
   ```typescript
   // ❌ WRONG - Component-specific label
   export const Checkbox = {
     Root: CheckboxRoot,
     Label: CheckboxLabel, // Don't create this!
   };

   // ✅ CORRECT - Compose with existing components
   import { Label } from "@/components/label";
   import { Description } from "@/components/description";

   // Usage:
   <div className="flex items-center gap-3">
     <Checkbox.Root id="terms">
       <Checkbox.Indicator />
     </Checkbox.Root>
     <Label htmlFor="terms">Accept terms</Label>
   </div>

   // With description:
   <div className="flex gap-3">
     <Checkbox.Root className="mt-0.5" id="notifications">
       <Checkbox.Indicator />
     </Checkbox.Root>
     <div className="flex flex-col gap-1">
       <Label htmlFor="notifications">Email notifications</Label>
       <Description>Get notified when someone mentions you</Description>
     </div>
   </div>
   ```

   **Components that follow this pattern**:
   - Checkbox - uses external Label/Description
   - Radio - uses external Label/Description
   - Switch - uses external Label/Description
   - TextField - provides slots for Label/Description/FieldError

### Current Components

- `accordion`: Collapsible content sections
- `alert`: Alert messages with compound components
- `avatar`: User avatars with Radix UI
- `button`: Button with variants and sizes
- `checkbox`: Checkbox with compound components (uses external Label/Description)
- `chip`: Small informational badges
- `description`: Description text for form fields
- `field-error`: Error messages for form fields
- `fieldset`: Form field grouping components (Fieldset, Legend, FieldGroup, Field, CheckboxField)
- `label`: Label text for form fields
- `link`: Styled anchor links
- `menu`: Dropdown menu system
- `popover`: Popover overlays
- `spinner`: Loading indicators
- `tabs`: Tab navigation
- `text`: Text component for paragraphs and general text
- `text-field`: Text input field with compound components
- `tooltip`: Hover tooltips

## Development Workflow

1. **Creating New Components**:

   **CRITICAL: Research & Design Phase**:
   - **FIRST**: Check the Figma design for the component breakdown (e.g., Menu Container, Menu Item, etc.)
   - **SECOND**: Research the React Aria Components documentation at https://react-spectrum.adobe.com/react-aria/
   - Find the appropriate React Aria primitive (e.g., CheckboxGroup, Dialog, Select, etc.)
   - Understand the React Aria API, props, and accessibility features
   - Map Figma component pieces to React Aria components and plan the compound structure
   - Plan how to adapt it to follow Radix UI's compound component pattern

   **Implementation Steps**:
   - Study existing HeroUI components (accordion, alert) to understand the compound pattern
   - Use React Aria Components as the foundation for accessibility
   - Transform React Aria's API to match Radix UI patterns:
     - Single component → Multiple exported parts (Root, Item, Trigger, Content, etc.)
     - Props-based API → Composition-based API
     - Internal state → Context-based state sharing
   - Create Context for sharing styles across component parts
   - Export ALL component parts for maximum customization
   - Define styles in separate `.styles.ts` file with slot system
   - Support `asChild` prop where it makes sense (using Radix UI's Slot)
   - Add "use client" directive at the top of component file
   - Create comprehensive Storybook stories showing all variants and compositions
   - Follow the export pattern: `export * as ComponentName from "./component-name"`

   **Example Transformation**:
   ```typescript
   // React Aria: Single component with props
   <CheckboxGroup label="Options" value={selected} onChange={setSelected}>
     <Checkbox value="1">Option 1</Checkbox>
   </CheckboxGroup>

   // HeroUI: Compound pattern
   <CheckboxGroup.Root value={selected} onValueChange={setSelected}>
     <CheckboxGroup.Label>Options</CheckboxGroup.Label>
     <CheckboxGroup.Item value="1">
       <CheckboxGroup.Indicator />
       <CheckboxGroup.Label>Option 1</CheckboxGroup.Label>
     </CheckboxGroup.Item>
   </CheckboxGroup.Root>
   ```

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

## Icon Library

**IMPORTANT**: HeroUI uses Iconify with gravity-ui as the default icon set.

## Important Notes

- Always prefer editing existing files over creating new ones
- Follow the established component patterns and conventions
- Ensure accessibility with React Aria Components
- Maintain TypeScript type safety
- Use the commit convention to avoid git hook failures
- Run lint and type checks before committing: `pnpm lint && pnpm typecheck`

## Figma Integration & MCP Server Rules

### Figma Dev Mode MCP Server

**IMPORTANT**: When creating components with Figma designs:

1. **Component Breakdown**: Figma designs are already broken down into component pieces (e.g., Menu Container, Menu Item, etc.). Use these as reference for:
   - Component structure and naming (adapt to code conventions)
   - Visual styling and spacing
   - Component composition patterns

2. **MCP Server Rules**:
   - The Figma Dev Mode MCP Server provides an assets endpoint for images and SVG assets
   - **CRITICAL**: If the Figma MCP Server returns a localhost source for an image or SVG, use that source directly
   - **DO NOT** import or add new icon packages - all assets should come from the Figma payload
   - **DO NOT** use or create placeholders if a localhost source is provided
   - Always use the actual assets from Figma MCP Server

3. **Workflow**:
   - Check Figma for component visual design and breakdown
   - Map Figma component names to appropriate React Aria primitives
   - Use Figma assets (icons, images) directly from the MCP Server
   - Implement styles based on Figma design tokens and specifications

## Library Documentation with Context7 MCP

**IMPORTANT**: We have the Context7 MCP server available (https://github.com/upstash/context7) for accessing up-to-date library documentation.

### When to Use Context7

Use Context7 MCP when working with external libraries, especially:
- **Tailwind CSS v4**: When working with Tailwind CSS v4 features, use Context7 to get the latest documentation at https://context7.com/context7/tailwindcss
- **Fumadocs**: When working on the documentation site in `apps/docs/`, use Context7 to get the latest Fumadocs framework documentation
- **Next.js**: For Next.js specific features and APIs used in the docs app
- Any other third-party libraries where up-to-date documentation is needed

### How to Use Context7

1. First, resolve the library ID using `mcp__context7__resolve-library-id`
2. Then fetch documentation using `mcp__context7__get-library-docs` with the resolved ID
3. This ensures you're always working with the latest documentation rather than outdated information

### Example Usage Areas

- Implementing new documentation features in `apps/docs/`
- Configuring Fumadocs settings in `source.config.ts`
- Working with MDX components and layouts
- Setting up search functionality
- Implementing documentation navigation and structure
