# AGENTS.md

Instructions for AI agents working with the HeroUI v3 repository.

## Repository Overview

HeroUI v3 is a modern React UI library built with **Tailwind CSS v4**, organized as a **pnpm monorepo** managed by **Turborepo**. Components are built on top of [React Aria Components](https://react-spectrum.adobe.com/react-aria/) and follow a compound component pattern similar to Radix UI.

### Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Node.js | 22+ | Runtime |
| pnpm | 10.26.2 | Package manager (via corepack) |
| React | 19+ | UI framework |
| Tailwind CSS | 4.x | Styling |
| TypeScript | 5.x | Type safety |
| Turborepo | 2.x | Build orchestration |
| Storybook | Latest | Component development |
| Vitest | 4.x | Testing |
| React Aria Components | Latest | Accessibility primitives |
| tailwind-variants | Latest | Variant-based styling (includes twMerge) |

### Monorepo Structure

```
/
├── apps/
│   └── docs/              # Documentation site (Next.js + Fumadocs)
├── packages/
│   ├── react/             # Main UI library (@heroui/react)
│   │   ├── src/components/  # All components
│   │   ├── src/utils/       # Shared utilities
│   │   └── scripts/         # Build & codegen scripts
│   ├── styles/            # CSS styles & variants (@heroui/styles)
│   │   └── src/components/  # Per-component .css files
│   ├── standard/          # Shared ESLint, Prettier, TS configs
│   ├── storybook/         # Storybook configuration
│   └── testing/           # Shared test harness (@heroui/testing)
├── turbo.json
└── pnpm-workspace.yaml
```

## Commands

| Action | Command |
|---|---|
| Install dependencies | `pnpm i --hoist` |
| Build all packages | `pnpm build` |
| Build specific package | `pnpm build --filter=@heroui/react` |
| Dev (Storybook, port 6006) | `pnpm dev` |
| Dev (Docs site, port 3000) | `pnpm dev:docs` |
| Lint | `pnpm lint` |
| Typecheck | `pnpm typecheck` |
| Test all (jsdom + browser) | `pnpm test` |
| Test one file (filter) | `pnpm --filter @heroui/react exec vitest run button` |
| Test with coverage | `pnpm test:coverage` (jsdom floors only — not “done”) |
| Test changed files (local) | `pnpm --filter @heroui/react test:changed` (jsdom only; not a gate) |
| Format | `pnpm run format` |
| Bump version | `pnpm version:bump` |
| Scaffold a new component | `cd packages/react && pnpm add:component ComponentName` |

## Behavioral tests (`@heroui/react`)

- Suites live in `packages/react/tests/components/<name>/`:
  - `*.test.tsx` — jsdom (~90% of contracts)
  - `*.ssr.test.tsx` — Client SSR smoke via `ssrSmoke()` (not RSC)
  - `*.browser.test.tsx` — Playwright (overlays + high-risk portals; not every component)
  - optional `fixtures.tsx` — shared JSX across layers
- Import harness from `@heroui/testing/helpers` (`render`, `setupUser`, `runAllTimers`, `ssrSmoke`, `User`). Browser suites: `render` from `@heroui/testing/browser` (wraps `vitest-browser-react`; owned by `@heroui/testing`). Prefer `@/` for sources. Pattern testers: `const user = new User(...); user.createTester(...)` — not a top-level export.
- Query: `getByRole` / label / text first; `data-testid` when needed; avoid class-primary queries.
- Assert: roles/names, HeroUI `data-*` hooks, callbacks, focus, light BEM + documented `data-slot` on compound parts — not colors, full class lists, or RAC internals.
- Fake timers: per-suite only; wire `advanceTimers` into `setupUser` + `User`; use `runAllTimers()`.
- Pattern testers for groups / overlays / collections; skip for Button / Checkbox / Switch / TextField.
- Naming: `describe("Component")`; nested concern; `it` as `supports…` / `calls…` / `exposes…` / `renders…`. SSR: `"Component SSR"`; browser: `"Component (browser)"`.
- Intentional skips (no dedicated suite required): internals (`rac`, `icons`), non-exported helpers (`color-input-group`, `date-input-group`), in-progress `calendar-year-picker`, parent-covered parts (`list-box-item`, `menu-item`, `menu-section`, `list-box-section`), Toast SSR (client portal only — covered by jsdom + browser). Public `input-group` has its own suite. SSR and browser are risk-based, not universal.
- Browser setup (once locally): `pnpm --filter @heroui/testing exec playwright install chromium` before `pnpm test`. CI uses `playwright install --with-deps chromium`, then `test:browser` + `test:coverage` (not a single `pnpm test`).
- Commands: `pnpm test` (jsdom + browser, needs Chromium); filter with `pnpm --filter @heroui/react exec vitest run <name>`.
- Coverage (`pnpm test:coverage`): jsdom only; `src/components/**` minus barrels. Thresholds are **CI floors** (statements/lines can pass with thin smoke). Green coverage ≠ sufficient depth — still require role/callback/focus (and browser for high-risk portals).
- `test:changed`: local jsdom-only shortcut (`vitest related --changed`). Does **not** run browser suites; never use it as the merge gate — use `pnpm test` / CI.

## Git Commit Convention

All commits must follow [Conventional Commits](https://www.conventionalcommits.org/) and are validated by Husky + commitlint. Pre-commit also runs `lint-staged`.

```
<type>(<scope>): <message>
```

**Allowed types:** `feat`, `feature`, `fix`, `refactor`, `docs`, `build`, `test`, `ci`, `chore`

Examples:

```
feat(components): add select component
fix(button): resolve disabled state not applying
docs: update installation guide
```

## Component Architecture

### File Structure

Each component lives in `packages/react/src/components/<component-name>/`:

```
component-name/
├── component-name.tsx          # Component implementation (uses React Aria)
├── component-name.styles.ts    # Tailwind Variants styling
├── component-name.stories.tsx  # Storybook stories
└── index.ts                    # Barrel exports
```

CSS styles live in `packages/styles/src/components/<component-name>/`.

### Creating a New Component

Always use the scaffold script:

```bash
cd packages/react
pnpm add:component ComponentName
```

Then build to update package.json exports:

```bash
pnpm build
```

### Compound Component Pattern

HeroUI uses a compound component pattern. Each component exports its sub-parts so users can compose and style them independently.

```tsx
// Context shares state/styles across parts
const ComponentContext = createContext<{slots?: ReturnType<typeof componentVariants>}>({});

// Root wraps children with context
const ComponentRoot = forwardRef(({children, className, ...props}, ref) => {
  const slots = useMemo(() => componentVariants({...}), [...]);
  return (
    <ComponentContext value={{slots}}>
      <ReactAriaPrimitive ref={ref} className={composeTwRenderProps(className, slots.base())}>
        {children}
      </ReactAriaPrimitive>
    </ComponentContext>
  );
});

// Child parts consume context
const ComponentItem = forwardRef(({className, ...props}, ref) => {
  const {slots} = useContext(ComponentContext);
  return (
    <ReactAriaPrimitive ref={ref} className={composeTwRenderProps(className, slots?.item())}>
      {props.children}
    </ReactAriaPrimitive>
  );
});
```

Compound components are exported via `Object.assign` as the default export:

```tsx
const CompoundComponent = Object.assign(ComponentRoot, {
  Item: ComponentItem,
  Trigger: ComponentTrigger,
});
export default CompoundComponent;
```

### Export Strategy

```tsx
// Named exports for compound components
export * as ComponentName from "./component-name";

// Direct exports for simple components
export {Component, type ComponentProps} from "./component";

// Always export variants
export {componentVariants, type ComponentVariants} from "./component.styles";
```

### Styling Rules

1. **Styles go in `.styles.ts` files**, never in `.tsx` files. Use `tv()` from `tailwind-variants`.
2. **Import from `tailwind-variants`**, never from `@heroui/standard`.
3. **Never use `twMerge` manually** — `tailwind-variants` already includes it.
4. **Add `"use client"` directive** at the top of every component `.tsx` file.
5. **Display names** follow: `HeroUI.ComponentName` or `HeroUI.Component.SubPart`.

### CSS / BEM Naming

Components use BEM-style CSS class names:

- **Block**: `button`, `card`, `alert`
- **Element**: `card__header`, `alert__icon`
- **Modifier**: `button--primary`, `button--lg`, `button--icon-only`

### Default Size Pattern (Critical)

All components must include default sizes in base classes so they work without explicit size props:

```css
.avatar {
  @apply relative flex size-10 shrink-0 overflow-hidden rounded-full;
  /* size-10 is the default (equivalent to --md) */
}

.avatar--sm { @apply size-8; }
.avatar--md { /* empty — this IS the default */ }
.avatar--lg { @apply size-12; }
```

### Interactive State Pattern

All interactive components must support both pseudo-classes and data attributes:

```css
.component {
  &:hover,
  &[data-hovered="true"] { @apply ...; }

  &:active,
  &[data-pressed="true"] { @apply ...; }

  &:focus-visible,
  &[data-focus-visible="true"] {
    outline: 2px solid var(--focus);
    outline-offset: 2px;
  }
}
```

### React Aria className Patterns

React Aria components differ in how they accept `className`:

- **Render-prop components** (Button, Checkbox, Switch, Popover, Tooltip, Tabs, Link, Menu, etc.) — use `composeTwRenderProps(className, slots.foo())`.
- **String-only components** (Label, Text, Input, TextArea, Heading, Dialog) — pass `className` directly: `slots?.label({className})`.

### Composition Over Duplication

Do **not** create component-specific Label/Description/FieldError sub-components. Instead, compose with the existing shared primitives:

```tsx
import {Label} from "@/components/label";
import {Description} from "@/components/description";

<div className="flex items-center gap-3">
  <Checkbox id="terms"><Checkbox.Indicator /></Checkbox>
  <Label htmlFor="terms">Accept terms</Label>
</div>
```

### Tailwind Class Detection

Tailwind CSS scans files as plain text. **Never construct class names dynamically**:

```tsx
// BAD — Tailwind won't detect this
<div className={`text-${color}-600`} />
<span className={`button--${size}`} />

// GOOD — use complete class name mappings
const colorClasses = {
  blue: "text-blue-600",
  red: "text-red-600",
};
```

### Storybook

All stories must use the `"Components"` group in their title:

```tsx
export default { title: "Components/Button" };
```

Storybook is the primary dev workflow — run with `pnpm dev` (port 6006).

### Icon Library

HeroUI uses **Iconify** with **gravity-ui** as the default icon set.

## Current Components

### Completed

accordion, alert, alert-dialog, autocomplete, avatar, badge, breadcrumbs, button, button-group, calendar, card, checkbox, checkbox-group, chip, close-button, color-area, color-field, color-picker, color-slider, color-swatch, color-swatch-picker, combo-box, date-field, date-picker, date-range-picker, description, disclosure, disclosure-group, drawer, dropdown, empty-state, error-message, field-error, fieldset, form, header, input, input-group, input-otp, kbd, label, link, list-box, list-box-item, list-box-section, menu, menu-item, menu-section, meter, modal, number-field, pagination, popover, progress-bar, progress-circle, radio, radio-group, range-calendar, scroll-shadow, search-field, select, separator, skeleton, slider, spinner, surface, switch, switch-group, table, tabs, tag, tag-group, textarea, textfield, time-field, toast, toggle-button, toggle-button-group, toolbar, tooltip, typography

### In Progress

calendar-year-picker

## Non-obvious Gotchas

1. **`pnpm i` triggers builds** — The `postinstall` hook builds `@heroui/styles` and runs `typegen:docs` and `typegen:docs-cn`. If it fails, run `pnpm --filter @heroui/styles build` manually.

2. **Build order matters** — `@heroui/styles` must build before `@heroui/react`. Running `pnpm build` from root handles this via Turbo's `^build` dependency.

3. **Native addons allowlist** — `onlyBuiltDependencies` in root `pnpm-workspace.yaml` allows native compilation for `esbuild`, `@swc/core`, `@parcel/watcher`, etc. If this list is missing, you'll see "Ignored build scripts" warnings.

4. **Behavioral tests** — see [Behavioral tests](#behavioral-tests-herouireact) above. Harness lives in `@heroui/testing`; suites in `packages/react/tests/`.

5. **Commit hooks** — Husky runs `lint-staged` on pre-commit and `commitlint` on commit-msg. Non-conforming commits are rejected.

6. **Run checks before committing** — `pnpm lint && pnpm typecheck && pnpm test`

## Cursor Cloud Specific

- **Node.js v22+** is installed via binary tarball to `/usr/local/`.
- **pnpm** is activated via `corepack` — the `packageManager` field in root `package.json` declares `pnpm@10.26.2`.
- Full command reference and component architecture details are also in `CLAUDE.md`.
