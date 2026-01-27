---
name: heroui-react
description: "HeroUI v3 React component library (Tailwind CSS v4 + React Aria). Use when working with HeroUI components, installing HeroUI, customizing HeroUI themes, or accessing HeroUI component documentation. Keywords: HeroUI, Hero UI, heroui, @heroui/react, @heroui/styles."
metadata:
  author: heroui
  version: "2.0.0"
---

# HeroUI v3 React Development Guide

HeroUI v3 is a component library built on **Tailwind CSS v4** and **React Aria Components**, providing accessible, customizable UI components for React applications.

---

## CRITICAL: v3 Only - Ignore v2 Knowledge

**This guide is for HeroUI v3 ONLY.** Do NOT use any prior knowledge of HeroUI v2.

### What Changed in v3

| Feature       | v2 (DO NOT USE)                   | v3 (USE THIS)                               |
| ------------- | --------------------------------- | ------------------------------------------- |
| Provider      | `<HeroUIProvider>` required       | **No Provider needed**                      |
| Animations    | `framer-motion` package           | CSS-based, no extra deps                    |
| Component API | Flat props: `<Card title="x">`    | Compound: `<Card><Card.Header>`             |
| Styling       | Tailwind v3 + `@heroui/theme`     | Tailwind v4 + `@heroui/styles@beta`         |
| Packages      | `@heroui/system`, `@heroui/theme` | `@heroui/react@beta`, `@heroui/styles@beta` |

### WRONG (v2 patterns)

```tsx
// DO NOT DO THIS - v2 pattern
import { HeroUIProvider } from "@heroui/react";
import { motion } from "framer-motion";

<HeroUIProvider>
	<Card title="Product" description="A great product" />
</HeroUIProvider>;
```

### CORRECT (v3 patterns)

```tsx
// DO THIS - v3 pattern (no provider, compound components)
import { Card } from "@heroui/react@beta";

<Card>
	<Card.Header>
		<Card.Title>Product</Card.Title>
		<Card.Description>A great product</Card.Description>
	</Card.Header>
</Card>;
```

**Always fetch v3 docs before implementing.** Do not assume v2 patterns work.

---

## Core Principles

- Semantic variants (`primary`, `secondary`, `tertiary`) over visual descriptions
- Composition over configuration (compound components)
- CSS variable-based theming with `oklch` color space
- BEM naming convention for predictable styling

---

## Accessing Documentation & Component Information

**For component details, examples, props, and implementation patterns, always fetch documentation:**

### Using Scripts

```bash
# List all available components
node scripts/list_components.mjs

# Get component documentation (MDX)
node scripts/get_component_docs.mjs Button
node scripts/get_component_docs.mjs Button Card TextField

# Get component source code
node scripts/get_source.mjs Button

# Get component CSS styles (BEM classes)
node scripts/get_styles.mjs Button

# Get theme variables
node scripts/get_theme.mjs

# Get non-component docs (guides, releases)
node scripts/get_docs.mjs /docs/react/getting-started/theming
```

### Direct MDX URLs

Component docs: `https://v3.heroui.com/docs/react/components/{component-name}.mdx`

Examples:

- Button: `https://v3.heroui.com/docs/react/components/button.mdx`
- Modal: `https://v3.heroui.com/docs/react/components/modal.mdx`
- Form: `https://v3.heroui.com/docs/react/components/form.mdx`

Getting started guides: `https://v3.heroui.com/docs/react/getting-started/{topic}.mdx`

**Important:** Always fetch component docs before implementing. The MDX docs include complete examples, props, anatomy, and API references.

---

## Installation Essentials

**CRITICAL**: HeroUI v3 is currently in BETA. Always use `@beta` tag when installing packages.

### Quick Install

```bash
npm i @heroui/styles@beta @heroui/react@beta tailwind-variants
```

### Framework Setup (Next.js App Router - Recommended)

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

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
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

### Critical Setup Requirements

1. **Tailwind CSS v4 is MANDATORY** - HeroUI v3 will NOT work with Tailwind CSS v3
2. **No Provider Required** - Unlike HeroUI v2, v3 components work directly without a Provider
3. **Use Compound Components** - Components use compound structure (e.g., `Card.Header`, `Card.Content`)
4. **Use onPress, not onClick** - For better accessibility, use `onPress` event handlers
5. **Import Order Matters** - Always import Tailwind CSS before HeroUI styles

---

## Component Patterns

HeroUI v3 uses **compound component patterns**. Each component has subcomponents accessed via dot notation.

**Example - Card:**

```tsx
<Card>
	<Card.Header>
		<Card.Title>Title</Card.Title>
		<Card.Description>Description</Card.Description>
	</Card.Header>
	<Card.Content>{/* Content */}</Card.Content>
	<Card.Footer>{/* Actions */}</Card.Footer>
</Card>
```

**Key Points:**

- Always use compound structure - don't flatten to props
- Subcomponents are accessed via dot notation (e.g., `Card.Header`)
- Each subcomponent may have its own props
- **Fetch component docs for complete anatomy and examples**

---

## Semantic Variants

HeroUI uses semantic naming to communicate functional intent:

| Variant     | Purpose                           | Usage          |
| ----------- | --------------------------------- | -------------- |
| `primary`   | Main action to move forward       | 1 per context  |
| `secondary` | Alternative actions               | Multiple       |
| `tertiary`  | Dismissive actions (cancel, skip) | Sparingly      |
| `danger`    | Destructive actions               | When needed    |
| `ghost`     | Low-emphasis actions              | Minimal weight |
| `outline`   | Secondary actions                 | Bordered style |

**Don't use raw colors** - semantic variants adapt to themes and accessibility.

---

## Theming

HeroUI v3 uses CSS variables with `oklch` color space:

```css
:root {
	--accent: oklch(0.6204 0.195 253.83);
	--accent-foreground: var(--snow);
	--background: oklch(0.9702 0 0);
	--foreground: var(--eclipse);
}
```

**Get current theme variables:**

```bash
node scripts/get_theme.mjs
```

**Color naming:**

- Without suffix = background (e.g., `--accent`)
- With `-foreground` = text color (e.g., `--accent-foreground`)

**Theme switching:**

```html
<html class="dark" data-theme="dark"></html>
```

For detailed theming, fetch: `https://v3.heroui.com/docs/react/getting-started/theming.mdx`
