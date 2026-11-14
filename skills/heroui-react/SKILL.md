---
name: heroui-react
description: "HeroUI v3 React component library (Tailwind CSS v4 + React Aria). Use when building UIs with HeroUI — creating Buttons, Modals, Forms, Cards; installing @heroui/react; configuring dark/light themes with oklch variables; or fetching component docs. Keywords: HeroUI, Hero UI, heroui, @heroui/react, @heroui/styles."
metadata:
  author: heroui
  version: "3.0.1"
---

# HeroUI v3 React Development Guide

HeroUI v3 is a component library built on **Tailwind CSS v4** and **React Aria Components**, providing accessible, customizable UI components for React applications.

---

## Installation

```bash
curl -fsSL https://heroui.com/install | bash -s heroui-react
```

---

## CRITICAL: v3 Only - Ignore v2 Knowledge

**This guide is for HeroUI v3 ONLY.** Do NOT apply v2 patterns — the provider, styling, and component API all changed:

| Feature       | v2 (DO NOT USE)                   | v3 (USE THIS)                               |
| ------------- | --------------------------------- | ------------------------------------------- |
| Provider      | `<HeroUIProvider>` required       | **No Provider needed**                      |
| Animations    | `framer-motion` package           | CSS-based, no extra deps                    |
| Component API | Flat props: `<Card title="x">`    | Compound: `<Card><Card.Header>`             |
| Styling       | Tailwind v3 + `@heroui/theme`     | Tailwind v4 + `@heroui/styles`         	  |
| Packages      | `@heroui/system`, `@heroui/theme` | `@heroui/react`, `@heroui/styles` 		  |

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
import { Card } from "@heroui/react";

<Card>
	<Card.Header>
		<Card.Title>Product</Card.Title>
		<Card.Description>A great product</Card.Description>
	</Card.Header>
</Card>;
```

**Always fetch v3 docs before implementing.**

---

## Core Principles

- Semantic variants (`primary`, `secondary`, `tertiary`) over visual descriptions
- Composition over configuration (compound components)
- CSS variable-based theming with `oklch` color space
- BEM naming convention for predictable styling

---

## Accessing Documentation & Component Information

**For component details, examples, props, and implementation patterns, always fetch documentation:**

### Installed Docs First

`@heroui/react` ships its docs inside the package. When the project has it installed, they match the installed version, so read them before anything else:

- `node_modules/@heroui/react/docs/llms.txt` — index: which page to read for a task, plus every component and guide
- `node_modules/@heroui/react/docs/components/<name>.md` — one component (kebab-case, e.g. `date-picker.md`)
- `node_modules/@heroui/react/docs/guides/<name>.md` — guides (`theming.md`, `styling.md`, `agent-bridge.md`…)

The scripts below do this for you: `get_component_docs.mjs` and `get_docs.mjs` read the installed docs when they exist and fall back to the network (latest version) when they don't. Run them from inside the project.

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

Component docs: fetch `.mdx` with a concrete kebab-case slug. Run `node scripts/list_components.mjs` when the slug is unknown, and never fetch a URL that still contains a placeholder.

Examples:

- Button: `https://heroui.com/docs/react/components/button.mdx`
- Modal: `https://heroui.com/docs/react/components/modal.mdx`
- Form: `https://heroui.com/docs/react/components/form.mdx`

Getting started guides: use a concrete topic URL such as `https://heroui.com/docs/react/getting-started/quick-start.mdx`.

**Important:** Always fetch component docs before implementing. The MDX docs include complete examples, props, anatomy, and API references.

---

## Installation Essentials

### Quick Install

```bash
npm i @heroui/styles @heroui/react tailwind-variants
```

### Framework Setup (Next.js App Router - Recommended)

1. **Install dependencies:**

```bash
npm i @heroui/styles @heroui/react tailwind-variants tailwindcss @tailwindcss/postcss postcss
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
2. **Use Compound Components** - Components use compound structure (e.g., `Card.Header`, `Card.Content`)
3. **Use onPress, not onClick** - For better accessibility, use `onPress` event handlers
4. **Import Order Matters** - Always import Tailwind CSS before HeroUI styles

---

## Component Patterns

All components use the **compound pattern** shown above (dot-notation subcomponents like `Card.Header`, `Card.Content`). Don't flatten to props — always compose with subcomponents. Fetch component docs for complete anatomy and examples.

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

## Letting an AI Agent Operate the App

When the task is to let an in-app assistant or browser agent **use** the UI (fill forms, pick options, press buttons), do not script clicks or add `data-testid` hooks. Use the bridge in `@heroui/react/agent`: it reads HeroUI components from their accessible roles and labels, with no changes to the components.

```tsx
import {agentTools, callAgentTool, createAgent} from "@heroui/react/agent";

const agent = createAgent({allow: (action) => !action.confirm});

agent.snapshot(); // [{ref: "c1", component: "select", label: "Region", value: "us", items: [...], actions: ["setValue"]}, ...]
await agent.act({steps: [{ref: "Region", action: "setValue", args: ["Europe"]}]});

// With a model: pass `agentTools` as tool definitions, run each call with callAgentTool(agent, name, input)
```

- Mark risky controls with `data-agent-confirm="reason"`, private regions with `data-agent-hidden`, private values with `data-agent-secret`.
- Custom components join with `useAgentComponent(ref, {component, state, actions})`.
- Every field needs a `Label` (or `aria-label`): the label is how the agent finds it.

Full guide: `node_modules/@heroui/react/docs/guides/agent-bridge.md` or `https://heroui.com/docs/react/getting-started/agent-bridge.mdx`.

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

For detailed theming, fetch: `https://heroui.com/docs/react/getting-started/theming.mdx`

**Global customization and custom themes:** to restyle components app-wide (tokens, BEM class overrides, new variants) or author a complete named light/dark theme, use the `heroui-theming` skill. If it is not installed:

```bash
curl -fsSL https://heroui.com/install | bash -s heroui-theming
```
