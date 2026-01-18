---
name: heroui
description: Build accessible UIs using HeroUI v3 components (React + Tailwind CSS v4 + React Aria). Use when creating React interfaces, selecting UI components, implementing forms, navigation, overlays, or data display. Use when installing HeroUI v3, customizing themes, accessing component documentation, building with compound components, or working with component APIs. Keywords: HeroUI, Hero UI, heroui, React Aria, accessible components, Tailwind CSS v4, @heroui/react@beta, @heroui/styles@beta, v3 beta, component APIs, UI components.
license: MIT
metadata:
  author: nextui-inc
  version: "1.0"
---

# HeroUI v3 React Development Guide

HeroUI v3 is a component library built on **Tailwind CSS v4** and **React Aria Components**, providing accessible, customizable UI components for React applications.

---

## CRITICAL: v3 Only - Ignore v2 Knowledge

**This guide is for HeroUI v3 ONLY.** Do NOT use any prior knowledge of HeroUI v2.

### What Changed in v3

| Feature | v2 (DO NOT USE) | v3 (USE THIS) |
|---------|-----------------|---------------|
| Provider | `<HeroUIProvider>` required | **No Provider needed** |
| Animations | `framer-motion` package | CSS-based, no extra deps |
| Component API | Flat props: `<Card title="x">` | Compound: `<Card><Card.Header>` |
| Event handlers | `onClick` | `onPress` (React Aria) |
| Styling | Tailwind v3 + `@heroui/theme` | Tailwind v4 + `@heroui/styles@beta` |
| Packages | `@heroui/system`, `@heroui/theme` | `@heroui/react@beta`, `@heroui/styles@beta` |

### WRONG (v2 patterns)

```tsx
// DO NOT DO THIS - v2 pattern
import { HeroUIProvider } from '@heroui/react';
import { motion } from 'framer-motion';

<HeroUIProvider>
  <Card title="Product" description="A great product" />
</HeroUIProvider>
```

### CORRECT (v3 patterns)

```tsx
// DO THIS - v3 pattern (no provider, compound components)
import { Card } from '@heroui/react@beta';

<Card>
  <Card.Header>
    <Card.Title>Product</Card.Title>
    <Card.Description>A great product</Card.Description>
  </Card.Header>
</Card>
```

**Always fetch v3 docs before implementing.** Do not assume v2 patterns work.

---

## Core Principles

- Accessibility-first (WCAG 2.1 AA, keyboard navigation, screen readers)
- Semantic variants (`primary`, `secondary`, `tertiary`) over visual descriptions
- Composition over configuration (compound components)
- CSS variable-based theming with `oklch` color space
- BEM naming convention for predictable styling

---

## Accessing Documentation

Fetch component documentation via MDX routes:

```
https://v3.heroui.com/docs/react/components/{component-name}.mdx
```

**Examples:**
- Button: `https://v3.heroui.com/docs/react/components/button.mdx`
- Modal: `https://v3.heroui.com/docs/react/components/modal.mdx`
- Form: `https://v3.heroui.com/docs/react/components/form.mdx`
- Tabs: `https://v3.heroui.com/docs/react/components/tabs.mdx`

**Getting Started Guides:**
- Design Principles: `https://v3.heroui.com/docs/react/getting-started/design-principles.mdx`
- Styling: `https://v3.heroui.com/docs/react/getting-started/styling.mdx`
- Theming: `https://v3.heroui.com/docs/react/getting-started/theming.mdx`
- Colors: `https://v3.heroui.com/docs/react/getting-started/colors.mdx`

**LLMs.txt Documentation:**
- Quick index: `https://v3.heroui.com/react/llms.txt`
- Full docs: `https://v3.heroui.com/react/llms-full.txt`

---

## Available Scripts

Execute these scripts for reliable, up-to-date component information directly from the HeroUI API:

### List Components
```bash
node scripts/list_components.mjs
```
Returns all available HeroUI v3 components with version info in JSON format.

### Get Component Documentation
```bash
node scripts/get_component_docs.mjs Button
node scripts/get_component_docs.mjs Button Card TextField
```
Returns complete MDX documentation including imports, usage, variants, props, and examples.

### Get Source Code
```bash
node scripts/get_source.mjs Accordion
node scripts/get_source.mjs Button Card
```
Returns the React/TypeScript implementation source with GitHub links. Useful for understanding component internals.

### Get CSS Styles
```bash
node scripts/get_styles.mjs Button
node scripts/get_styles.mjs Button Card Chip
```
Returns BEM CSS classes for styling with GitHub links. Shows all variants and states.

### Get Theme Variables
```bash
node scripts/get_theme.mjs
```
Returns theme CSS variables and design tokens (oklch format) organized by common/light/dark modes.

### Get Documentation
```bash
node scripts/get_docs.mjs /docs/react/getting-started/theming
node scripts/get_docs.mjs /docs/react/releases/v3-0-0-beta-3
```
Returns non-component MDX documentation (guides, releases, principles).
**Note:** For component docs, use `get_component_docs.mjs` instead.

---

## Installation Guide

**CRITICAL**: HeroUI v3 is currently in BETA. Always use `@beta` tag when installing packages.

### Quick Install

```bash
npm i @heroui/styles@beta @heroui/react@beta tailwind-variants
```

Or with other package managers:
- `pnpm add @heroui/styles@beta @heroui/react@beta tailwind-variants`
- `yarn add @heroui/styles@beta @heroui/react@beta tailwind-variants`
- `bun add @heroui/styles@beta @heroui/react@beta tailwind-variants`

### Framework-Specific Setup

#### Next.js App Router (Recommended)

1. **Install dependencies:**
```bash
npm i @heroui/styles@beta @heroui/react@beta tailwind-variants tailwindcss @tailwindcss/postcss postcss
```

2. **Create/update `app/globals.css`:**
```css
/* Tailwind CSS v4 - Must be first */
@import "tailwindcss";

/* HeroUI v3 styles - Must be after Tailwind */
@import "@heroui/styles";
```

3. **Import in `app/layout.tsx`:**
```tsx
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* No Provider needed in HeroUI v3! */}
        {children}
      </body>
    </html>
  );
}
```

4. **Configure PostCSS (`postcss.config.mjs`):**
```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

**Important Notes:**
- Use `"use client"` directive for components with event handlers (`onPress`, `onClick`)
- Server components can use HeroUI components without event handlers
- Use Next.js `Link` component with `className="link"` for HeroUI styled links
- HeroUI v3 uses compound components (e.g., `Card.Header`, `Card.Content`)

#### Next.js Pages Router

1. **Install dependencies:**
```bash
npm i @heroui/styles@beta @heroui/react@beta tailwind-variants tailwindcss @tailwindcss/postcss postcss
```

2. **Create/update `styles/globals.css`:**
```css
/* Tailwind CSS v4 - Must be first */
@import "tailwindcss";

/* HeroUI v3 styles - Must be after Tailwind */
@import "@heroui/styles";
```

3. **Import in `pages/_app.tsx`:**
```tsx
import type { AppProps } from "next/app";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    // No Provider needed in HeroUI v3!
    <Component {...pageProps} />
  );
}
```

4. **Configure PostCSS (`postcss.config.mjs`):**
```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

#### Vite

1. **Install dependencies:**
```bash
npm i @heroui/styles@beta @heroui/react@beta tailwind-variants tailwindcss @tailwindcss/vite @vitejs/plugin-react
```

2. **Create/update `src/index.css`:**
```css
/* Tailwind CSS v4 - Must be first */
@import "tailwindcss";

/* HeroUI v3 styles - Must be after Tailwind */
@import "@heroui/styles";
```

3. **Import in `src/main.tsx`:**
```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* No Provider needed in HeroUI v3! */}
    <App />
  </React.StrictMode>
);
```

4. **Configure Vite (`vite.config.ts`):**
```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

#### Astro

1. **Install dependencies:**
```bash
npm i @heroui/styles@beta @heroui/react@beta tailwind-variants tailwindcss @tailwindcss/vite @astrojs/react
```

2. **Create/update `src/styles/global.css`:**
```css
/* Tailwind CSS v4 - Must be first */
@import "tailwindcss";

/* HeroUI v3 styles - Must be after Tailwind */
@import "@heroui/styles";
```

3. **Configure Astro (`astro.config.mjs`):**
```js
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

4. **Import in `src/layouts/Layout.astro`:**
```astro
---
import "../styles/global.css";
---
```

**Important Notes:**
- React components with HeroUI need client directives (`client:load`, `client:visible`, etc.)
- Import global CSS in your Layout.astro or individual pages

#### General React Setup

1. **Install dependencies:**
```bash
npm i @heroui/styles@beta @heroui/react@beta tailwind-variants tailwindcss @tailwindcss/postcss postcss
```

2. **Create/update CSS file:**
```css
/* Tailwind CSS v4 - Must be first */
@import "tailwindcss";

/* HeroUI v3 styles - Must be after Tailwind */
@import "@heroui/styles";
```

3. **Import CSS in your app entry point:**
```tsx
import "./styles/globals.css";
import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  // No Provider needed in HeroUI v3!
  <App />
);
```

4. **Configure PostCSS (`postcss.config.js`):**
```js
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

### Critical Reminders

1. **Tailwind CSS v4 is MANDATORY** - HeroUI v3 will NOT work with Tailwind CSS v3
2. **No Provider Required** - Unlike HeroUI v2, v3 components work directly without a Provider
3. **Use Compound Components** - Components like Card use `Card.Header`, `Card.Content` pattern
4. **Use onPress, not onClick** - For better accessibility, use `onPress` event handlers
5. **Import Order Matters** - Always import Tailwind CSS before HeroUI styles

---

## Component Discovery & Information

### Checking Available Components

Before using any component, verify it exists in HeroUI v3:

1. **Check component documentation:**
   - Visit: `https://v3.heroui.com/docs/react/components/{component-name}.mdx`
   - Example: `https://v3.heroui.com/docs/react/components/button.mdx`

2. **View component list:**
   - Check: `https://v3.heroui.com/react/llms.txt` for available components

3. **Component naming:**
   - Components use PascalCase (e.g., `Button`, `Card`, `TextField`)
   - Always verify exact component name before importing

### Understanding Component Anatomy

HeroUI v3 uses **compound component patterns**. Each component has subcomponents:

**Example - Card Component:**
```tsx
<Card>                    {/* Root component */}
  <Card.Header>          {/* Subcomponent */}
    <Card.Title>         {/* Subcomponent */}
    <Card.Description>    {/* Subcomponent */}
  </Card.Header>
  <Card.Content>         {/* Subcomponent */}
  <Card.Footer>          {/* Subcomponent */}
</Card>
```

**Key Points:**
- Always use compound structure - don't flatten to props
- Subcomponents are accessed via dot notation (e.g., `Card.Header`)
- Each subcomponent may have its own props
- Study component anatomy before implementation

### Accessing Component Information

**Component Documentation:**
- Full docs: `https://v3.heroui.com/docs/react/components/{name}.mdx`
- Includes: description, anatomy, props, examples, API reference

**Component Examples:**
- Examples are included in component docs
- Show real-world usage patterns
- Demonstrate compound component structure

**Component Props:**
- Check component docs for complete prop list
- Props are TypeScript-typed
- Use semantic variants (`primary`, `secondary`, `danger`) not raw colors

**Component Source Code:**
- React/TS source: `https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/packages/react/src/components/{component}/{component}.tsx`
- CSS styles: `https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/packages/styles/components/{component}.css`

---

## Component Selection Guide

### Buttons & Actions
- **Button** - Primary actions, form submissions (`primary`, `secondary`, `tertiary`, `danger`, `ghost`, `outline`)
- **ButtonGroup** - Group related buttons
- **CloseButton** - Dismiss actions for modals, alerts

### Form Inputs
- **Input / TextField** - Single-line text entry
- **TextArea** - Multi-line text entry
- **SearchField** - Search with clear button
- **Select** - Dropdown selection
- **ComboBox / Autocomplete** - Searchable dropdown
- **Checkbox / CheckboxGroup** - Multi-select options
- **RadioGroup** - Single-select options
- **Switch** - Binary toggles
- **Slider** - Numeric ranges
- **DateField / TimeField** - Date and time entry
- **NumberField** - Numeric entry with increment/decrement
- **InputOTP** - Verification codes

### Form Structure
- **Form** - Form container with validation
- **Label** - Field labels
- **Fieldset** - Group related fields
- **Description** - Helper text
- **FieldError / ErrorMessage** - Validation errors

### Layout & Display
- **Card** - Content containers
- **Surface** - Generic styled container
- **Separator** - Visual dividers
- **Avatar** - User/entity representation
- **Chip** - Tags, status indicators
- **Alert** - Status messages
- **Skeleton / Spinner** - Loading states
- **Kbd** - Keyboard shortcut display

### Navigation
- **Accordion / Disclosure / DisclosureGroup** - Collapsible sections
- **Tabs** - Tabbed content
- **Link** - Navigation links
- **Breadcrumbs** - Navigation path
- **ScrollShadow** - Scroll indicators

### Overlays
- **Modal** - Dialogs requiring attention
- **AlertDialog** - Confirmation dialogs
- **Popover** - Contextual floating content
- **Tooltip** - Hover/focus hints
- **Dropdown** - Menus and context actions

### Collections
- **ListBox** - Selectable lists
- **TagGroup** - Removable tags

---

## Semantic Variants

HeroUI uses semantic naming to communicate functional intent and hierarchy:

| Variant | Functional Purpose | Usage |
|---------|-------------------|-------|
| `primary` | Main action to move forward | 1 per context |
| `secondary` | Alternative actions | Multiple allowed |
| `tertiary` | Dismissive actions (cancel, skip) | Sparingly |
| `danger` | Destructive actions | When needed |
| `ghost` | Low-emphasis actions | When visual weight should be minimal |
| `outline` | Secondary actions | When bordered style is needed |

```tsx
<Button variant="primary">Save</Button>
<Button variant="secondary">Edit</Button>
<Button variant="tertiary">Cancel</Button>
<Button variant="danger">Delete</Button>
```

---

## Quick Implementation Patterns

### Basic Usage

```tsx
import { Button } from '@heroui/react@beta';

function MyComponent() {
  return (
    <Button variant="primary" onPress={() => console.log('Pressed!')}>
      Click me
    </Button>
  );
}
```

### Render Props for Dynamic Styling

```tsx
<Button>
  {({ isPressed, isHovered }) => (
    <span className={isPressed ? 'scale-95' : ''}>
      {isHovered ? 'Go!' : 'Click'}
    </span>
  )}
</Button>
```

### Data Attributes for CSS Styling

```css
.button[data-hovered="true"] { background: var(--accent-hover); }
.button[data-pressed="true"] { transform: scale(0.97); }
.button[data-focus-visible="true"] { outline: 2px solid var(--focus); }
.button[data-disabled="true"] { opacity: var(--disabled-opacity); }
```

### BEM Class Customization

```css
@layer components {
  .button {
    @apply font-semibold uppercase;
  }
  .button--primary {
    @apply bg-gradient-to-r from-purple-500 to-pink-500;
  }
}
```

### Form with Validation

```tsx
import { Form, TextField, Input, Label, FieldError, Button } from '@heroui/react@beta';

<Form onSubmit={handleSubmit}>
  <TextField name="email" type="email" isRequired>
    <Label>Email</Label>
    <Input />
    <FieldError />
  </TextField>
  <Button type="submit" variant="primary">Submit</Button>
</Form>
```

For detailed patterns, see [component-patterns.md](references/component-patterns.md).

---

## Theming Quick Reference

HeroUI uses CSS variables with `oklch` color space:

```css
:root {
  --accent: oklch(0.6204 0.195 253.83);
  --accent-foreground: var(--snow);
  --background: oklch(0.9702 0 0);
  --foreground: var(--eclipse);
  --success: oklch(0.7329 0.1935 150.81);
  --warning: oklch(0.7819 0.1585 72.33);
  --danger: oklch(0.6532 0.2328 25.74);
}
```

**Color naming:**
- Without suffix = background (e.g., `--accent`)
- With `-foreground` = text color (e.g., `--accent-foreground`)

**Theme switching:**
```html
<html class="dark" data-theme="dark">
```

### Accessing Theme Variables

HeroUI v3 uses CSS custom properties organized by category:

**Theme Variables Source:**
- Default theme: `https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/packages/styles/themes/default/variables.css`

**Theme Categories:**
- **Colors**: `--accent`, `--success`, `--danger`, `--background`, `--foreground`
- **Typography**: Font sizes, weights, line heights
- **Spacing**: Margin, padding, gap values
- **Borders**: Border radius, widths, colors
- **Shadows**: Box shadows and elevations
- **Animations**: Durations, timing functions

**Customizing Theme Variables:**
```css
:root {
  /* Override accent color */
  --accent: oklch(0.7 0.25 260);
  --accent-foreground: var(--snow);
  
  /* Override border radius */
  --radius: 0.75rem;
  
  /* Custom spacing */
  --spacing-4: 1rem;
}
```

**Dark Mode Variables:**
```css
[data-theme="dark"],
.dark {
  --background: oklch(0.1 0 0);
  --foreground: oklch(0.95 0 0);
  --accent: oklch(0.65 0.2 260);
}
```

**Theme Variable Naming:**
- Without suffix = background (e.g., `--accent`)
- With `-foreground` = text color (e.g., `--accent-foreground`)
- Use `oklch()` color space for better color manipulation

For detailed theming, see [theming-customization.md](references/theming-customization.md).

---

## Documentation Access Patterns

### Component Documentation

Fetch component documentation from v3.heroui.com:

**Pattern:**
```
https://v3.heroui.com/docs/react/components/{component-name}.mdx
```

**Examples:**
- Button: `https://v3.heroui.com/docs/react/components/button.mdx`
- Modal: `https://v3.heroui.com/docs/react/components/modal.mdx`
- Form: `https://v3.heroui.com/docs/react/components/form.mdx`
- Tabs: `https://v3.heroui.com/docs/react/components/tabs.mdx`

**What's Included:**
- Component description and use cases
- Complete anatomy (compound component structure)
- All available props with types and descriptions
- Working code examples
- API reference
- Accessibility features

### Getting Started Guides

**Pattern:**
```
https://v3.heroui.com/docs/react/getting-started/{topic}.mdx
```

**Available Guides:**
- Design Principles: `https://v3.heroui.com/docs/react/getting-started/design-principles.mdx`
- Styling: `https://v3.heroui.com/docs/react/getting-started/styling.mdx`
- Theming: `https://v3.heroui.com/docs/react/getting-started/theming.mdx`
- Colors: `https://v3.heroui.com/docs/react/getting-started/colors.mdx`
- Quick Start: `https://v3.heroui.com/docs/react/getting-started/quick-start.mdx`

### LLMs.txt Documentation

For programmatic access:
- Quick index: `https://v3.heroui.com/react/llms.txt`
- Full docs: `https://v3.heroui.com/react/llms-full.txt`

**Usage:**
- Parse these files to discover available components
- Extract component names and paths
- Build component discovery tools

---

## Source Code Access Patterns

### Component React/TypeScript Source

Access component implementation source code:

**Pattern:**
```
https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/packages/react/src/components/{component}/{component}.tsx
```

**Examples:**
- Button: `https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/packages/react/src/components/button/button.tsx`
- Card: `https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/packages/react/src/components/card/card.tsx`

**Use Cases:**
- Understanding component internals
- Learning React Aria patterns
- Debugging component behavior
- Customizing component logic

**Note:** Do NOT copy source code directly - use components via `@heroui/react@beta` imports.

### Component CSS Styles

Access component CSS styles and BEM classes:

**Pattern:**
```
https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/packages/styles/components/{component}.css
```

**Examples:**
- Button: `https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/packages/styles/components/button.css`
- Modal: `https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/packages/styles/components/modal.css`

**Use Cases:**
- Understanding BEM class structure
- Customizing component styles
- CSS-only styling (without React components)
- Learning styling patterns

**Important:** These are framework-agnostic styles from `@heroui/styles` package. Choose one approach:
- Use `@heroui/react` for full React components with accessibility
- Use `@heroui/styles` for CSS-only styling without JavaScript

### Theme Source Files

**Theme Variables:**
```
https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/packages/styles/themes/default/variables.css
```

**Use Cases:**
- Understanding theme variable structure
- Customizing theme variables
- Learning oklch color space usage
- Building custom themes

---

## Accessibility Quick Reference

Built on React Aria for WCAG 2.1 AA compliance:

- **Keyboard Navigation** - Full support out of the box
- **ARIA Attributes** - Automatic roles, labels, relationships
- **Focus Management** - Logical focus order and visible indicators
- **Screen Reader Support** - Meaningful announcements

**Key Practices:**
1. Always provide visible labels or `aria-label` for interactive elements
2. Use semantic HTML structure
3. Ensure sufficient color contrast
4. Test with keyboard-only navigation

For comprehensive guidance, see [accessibility-guide.md](references/accessibility-guide.md).

---

## Web Interface Guidelines Integration

### Accessibility (WCAG 2.1 AA)

HeroUI components are built on React Aria for accessibility, but ensure:

- ✅ **DO**: Use semantic HTML (`<button>`, `<a>`, `<label>`, `<table>`) before ARIA
- ✅ **DO**: Icon-only buttons need `aria-label`
- ✅ **DO**: Form controls need `<label>` or `aria-label`
- ✅ **DO**: Interactive elements need keyboard handlers
- ✅ **DO**: Images need `alt` (or `alt=""` if decorative)
- ✅ **DO**: Decorative icons need `aria-hidden="true"`
- ✅ **DO**: Async updates (toasts, validation) need `aria-live="polite"`
- ✅ **DO**: Headings hierarchical `<h1>`–`<h6>`
- ✅ **DO**: Include skip link for main content
- ✅ **DO**: Ensure sufficient color contrast

### Focus States

- ✅ **DO**: Interactive elements need visible focus: `focus-visible:ring-*` or equivalent
- ✅ **DO**: Use `:focus-visible` over `:focus` (avoid focus ring on click)
- ✅ **DO**: Group focus with `:focus-within` for compound controls
- ❌ **AVOID**: `outline-none` / `outline: none` without focus replacement

**Example:**
```css
.button:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
```

### Forms

- ✅ **DO**: Inputs need `autocomplete` and meaningful `name`
- ✅ **DO**: Use correct `type` (`email`, `tel`, `url`, `number`) and `inputmode`
- ✅ **DO**: Labels clickable (`htmlFor` or wrapping control)
- ✅ **DO**: Disable spellcheck on emails, codes, usernames (`spellCheck={false}`)
- ✅ **DO**: Checkboxes/radios: label + control share single hit target
- ✅ **DO**: Submit button stays enabled until request starts; spinner during request
- ✅ **DO**: Errors inline next to fields; focus first error on submit
- ✅ **DO**: Placeholders end with `…` and show example pattern
- ❌ **AVOID**: Never block paste (`onPaste` + `preventDefault`)
- ❌ **AVOID**: `autocomplete="off"` on non-auth fields (triggers password managers)

### Content Handling

- ✅ **DO**: Text containers handle long content: `truncate`, `line-clamp-*`, or `break-words`
- ✅ **DO**: Flex children need `min-w-0` to allow text truncation
- ✅ **DO**: Handle empty states—don't render broken UI for empty strings/arrays
- ✅ **DO**: Anticipate short, average, and very long user-generated content

**Example:**
```tsx
<div className="min-w-0">
  <p className="truncate">{longText}</p>
</div>

{items.length === 0 && (
  <EmptyState message="No items found" />
)}
```

### Images

- ✅ **DO**: `<img>` needs explicit `width` and `height` (prevents CLS)
- ✅ **DO**: Below-fold images: `loading="lazy"`
- ✅ **DO**: Above-fold critical images: `priority` or `fetchpriority="high"`

### Performance

- ✅ **DO**: Large lists (>50 items): virtualize (`virtua`, `content-visibility: auto`)
- ✅ **DO**: Batch DOM reads/writes; avoid interleaving
- ✅ **DO**: Prefer uncontrolled inputs; controlled inputs must be cheap per keystroke
- ✅ **DO**: Add `<link rel="preconnect">` for CDN/asset domains
- ✅ **DO**: Critical fonts: `<link rel="preload" as="font">` with `font-display: swap`
- ❌ **AVOID**: Layout reads in render (`getBoundingClientRect`, `offsetHeight`, `scrollTop`)

### Navigation & State

- ✅ **DO**: URL reflects state—filters, tabs, pagination, expanded panels in query params
- ✅ **DO**: Links use `<a>`/`<Link>` (Cmd/Ctrl+click, middle-click support)
- ✅ **DO**: Deep-link all stateful UI (consider URL sync via `nuqs` or similar)
- ✅ **DO**: Destructive actions need confirmation modal or undo window—never immediate
- ✅ **DO**: Warn before navigation with unsaved changes (`beforeunload` or router guard)

### Touch & Interaction

- ✅ **DO**: `touch-action: manipulation` (prevents double-tap zoom delay)
- ✅ **DO**: `-webkit-tap-highlight-color` set intentionally
- ✅ **DO**: `overscroll-behavior: contain` in modals/drawers/sheets
- ✅ **DO**: During drag: disable text selection, `inert` on dragged elements
- ✅ **DO**: `autoFocus` sparingly—desktop only, single primary input; avoid on mobile

### Safe Areas & Layout

- ✅ **DO**: Full-bleed layouts need `env(safe-area-inset-*)` for notches
- ✅ **DO**: Avoid unwanted scrollbars: `overflow-x-hidden` on containers
- ✅ **DO**: Flex/grid over JS measurement for layout

### Locale & i18n

- ✅ **DO**: Dates/times: use `Intl.DateTimeFormat` not hardcoded formats
- ✅ **DO**: Numbers/currency: use `Intl.NumberFormat` not hardcoded formats
- ✅ **DO**: Detect language via `Accept-Language` / `navigator.languages`, not IP

---

## Anti-Patterns to Avoid

**Technical anti-patterns to avoid:**

- ❌ `user-scalable=no` or `maximum-scale=1` disabling zoom
- ❌ `transition: all` (list properties explicitly)
- ❌ `outline-none` without focus-visible replacement
- ❌ Inline `onClick` navigation without `<a>`
- ❌ `<div>` or `<span>` with click handlers (should be `<button>`)
- ❌ Images without dimensions
- ❌ Large arrays `.map()` without virtualization
- ❌ Form inputs without labels
- ❌ Icon buttons without `aria-label`
- ❌ Hardcoded date/number formats (use `Intl.*`)

---

## HeroUI Component Patterns

### Using Semantic Variants

Use semantic variants to communicate functional intent:

- `primary` - Main action (1 per context)
- `secondary` - Alternative actions (multiple allowed)
- `tertiary` - Dismissive actions (cancel, skip)
- `danger` - Destructive actions
- `ghost` - Low-emphasis actions (when visual weight should be minimal)
- `outline` - Secondary actions (when bordered style is needed)

**Don't use raw colors** - semantic variants adapt to themes and accessibility.

### Compound Component Structure

HeroUI's compound components enable flexible layouts:

```tsx
// Card component structure
<Card>
  <Card.Header>
    <Card.Title>Title</Card.Title>
    <Card.Description>Description</Card.Description>
  </Card.Header>
  <Card.Content>
    {/* Main content */}
  </Card.Content>
  <Card.Footer>
    <Button variant="primary">Action</Button>
  </Card.Footer>
</Card>
```

### Technical Customization

When customizing HeroUI components:

- Override theme variables for global changes
- Use `className` for component-specific styling
- Leverage BEM classes for CSS-only customization
- Use render props for dynamic styling based on state

### Theme Customization Best Practices

- Override CSS variables in `:root` for light mode
- Override in `[data-theme="dark"]` or `.dark` for dark mode
- Use `oklch()` color space for better color manipulation
- Maintain contrast ratios for accessibility
- Test with both light and dark themes
