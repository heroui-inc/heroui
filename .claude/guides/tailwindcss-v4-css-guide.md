# Tailwind CSS v4 Component CSS Writing Guide

This guide explains how to write CSS files for components using Tailwind CSS v4 syntax, based on the patterns used in HeroUI v3 components.

## Table of Contents

1. [Basic CSS Syntax](#basic-css-syntax)
2. [@apply Directive](#apply-directive)
3. [CSS Nesting](#css-nesting)
4. [Custom Properties & CSS Variables](#custom-properties--css-variables)
5. [Pseudo-selectors and States](#pseudo-selectors-and-states)
6. [Group and Peer Modifiers](#group-and-peer-modifiers)
7. [Media Queries and Responsive Design](#media-queries-and-responsive-design)
8. [Component Patterns](#component-patterns)

## Basic CSS Syntax

In Tailwind CSS v4, you can write standard CSS files that utilize Tailwind's utility classes through the `@apply` directive (though its usage has changed in v4).

### Simple Component Example

```css
.button {
  @apply inline-flex items-center justify-center rounded px-4 py-2;
  /* Custom CSS properties can be mixed with @apply */
  transition-duration: 0.2s;
  transition-property: color, background-color, border-color;
}
```

## @apply Directive

The `@apply` directive allows you to compose Tailwind utility classes within your CSS. In v4, there are some changes to be aware of:

### Basic Usage

```css
.avatar {
  @apply relative flex size-10 shrink-0 overflow-hidden rounded-full;
}

.avatar-group {
  @apply flex overflow-hidden;
}
```

### When to Use @apply

Use `@apply` for properties that have direct Tailwind utility equivalents:

```css
.button {
  /* Use @apply for Tailwind utilities */
  @apply inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium transition-colors duration-150;

  /* Keep custom CSS for properties without utilities */
  cursor: var(--cursor-interactive);

  /* Complex CSS functions stay as regular CSS */
  text-decoration-color: color-mix(in oklch, var(--link) 50%, transparent);
}
```

### Animation with tw-animate-css

For animations, use tw-animate-css utilities with @apply:

```css
/* Entering animations */
.tooltip[data-entering] {
  @apply animate-in zoom-in-90 fade-in-0 duration-200 ease-in-out;
}

/* Placement-specific animations */
.tooltip[data-entering][data-placement="top"] {
  @apply slide-in-from-bottom-1;
}

/* Exiting animations */
.tooltip[data-exiting] {
  @apply animate-out zoom-out-95 fade-out duration-150 ease-out;
}
```

### Complex @apply Examples

```css
/* Combine multiple utilities in one @apply */
.accordion__trigger {
  @apply hover:bg-default flex flex-1 items-center justify-between px-4 py-4 text-left font-medium transition-[background-color] duration-[50ms];
}

/* Size modifiers with @apply */
.button--sm {
  @apply h-9 px-3 text-sm md:h-8;
}

/* Color variants */
.button--primary {
  @apply bg-accent text-accent-foreground hover:bg-accent-hover active:bg-accent-hover data-[pressed=true]:bg-accent-hover;
}
```

## CSS Nesting

Tailwind CSS v4 has built-in nesting support (no postcss-nested plugin needed). You can nest selectors using the `&` symbol:

### Basic Nesting

```css
.avatar {
  @apply relative inline-flex;

  & > div {
    @apply block aspect-square overflow-hidden;
  }

  img {
    @apply h-full w-full object-cover;
  }
}
```

### Nested Pseudo-classes

```css
.avatar-online {
  &:before {
    content: "";
    @apply bg-success z-1 absolute block rounded-full;
    outline: 2px solid var(--color-base-100);
    width: 15%;
    height: 15%;
  }
}
```

### Complex Nesting with :where()

```css
.menu {
  :where(li ul) {
    @apply relative ms-4 whitespace-nowrap ps-2;

    &:before {
      @apply bg-base-content absolute bottom-3 start-0 top-3 opacity-10;
      width: var(--border);
      content: "";
    }
  }
}
```

## Custom Properties & CSS Variables

Tailwind CSS v4 embraces CSS custom properties for theming and dynamic values:

### Using CSS Variables

```css
.button {
  --button-p: 1rem;
  --button-bg: var(--button-color, var(--color-base-200));
  --button-fg: var(--color-base-content);

  padding-inline: var(--button-p);
  color: var(--button-fg);
  background-color: var(--button-bg);
}
```

### Dynamic Calculations

```css
.checkbox {
  --size: calc(var(--size-selector, 0.25rem) * 6);
  width: var(--size);
  height: var(--size);
}
```

## Pseudo-selectors and States

### Hover States

```css
.button {
  @media (hover: hover) {
    &:hover {
      --button-bg: color-mix(in oklab, var(--button-color, var(--color-base-200)), #000 7%);
    }
  }
}
```

### Focus States

```css
.button {
  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
}
```

### Complex State Combinations

```css
.dropdown {
  &:not(details, .dropdown-open, .dropdown-hover:hover, :focus-within) {
    .dropdown-content {
      @apply hidden origin-top opacity-0;
      scale: 95%;
    }
  }
}
```

## Group and Peer Modifiers

### Group-based Styling

```css
.avatar-group {
  @apply flex overflow-hidden;

  :where(.avatar) {
    @apply overflow-hidden rounded-full;
    border: 4px solid var(--color-base-100);
  }
}
```

### Complex Group Selectors

```css
.swap {
  input:is(:checked, :indeterminate) {
    & ~ .swap-off {
      @apply opacity-0;
    }
  }

  input:checked ~ .swap-on {
    @apply opacity-100;
  }
}
```

## Media Queries and Responsive Design

### Forced Colors Mode

```css
.checkbox {
  &:checked {
    @media (forced-colors: active) {
      &:before {
        @apply rotate-0 bg-transparent [--tw-content:"✔︎"] [clip-path:none];
      }
    }
  }
}
```

### Print Styles

```css
.checkbox {
  @media print {
    &:before {
      @apply rotate-0 bg-transparent;
      --tw-content: "✔︎";
      clip-path: none;
    }
  }
}
```

## Component Patterns

### Size Variants

```css
.button-xs {
  --fontsize: 0.6875rem;
  --button-p: 0.5rem;
  --size: calc(var(--size-field, 0.25rem) * 6);
}

.button-sm {
  --fontsize: 0.75rem;
  --button-p: 0.75rem;
  --size: calc(var(--size-field, 0.25rem) * 8);
}
```

### Color Variants

```css
.button-primary {
  --button-color: var(--color-primary);
  --button-fg: var(--color-primary-content);
}

.checkbox-success {
  @apply text-success-content;
  --input-color: var(--color-success);
}
```

### State Modifiers

```css
.button {
  &:is(:disabled, [disabled], .button-disabled) {
    &:not(.button-link, .button-ghost) {
      @apply bg-base-content/10;
      box-shadow: none;
    }
    @apply pointer-events-none;
  }
}
```

### Advanced Selectors

```css
.tab {
  &:is(.tab-active, [aria-selected="true"]):not(.tab-disabled, [disabled]),
  &:is(input:checked),
  &:is(label:has(:checked)) {
    background-color: var(--tab-bg);
  }
}
```

## Best Practices

1. **Prioritize @apply for Tailwind Utilities**: Use @apply for properties that have Tailwind equivalents

   ```css
   .component {
     /* Good: Use @apply for Tailwind utilities */
     @apply bg-panel rounded-lg border p-4 shadow-md;

     /* Keep custom CSS for non-utility properties */
     cursor: var(--cursor-interactive);
   }
   ```

2. **Keep Focus States Consistent**: Use custom outline styles for focus states

   ```css
   .component {
     &:focus-visible {
       outline: 2px solid var(--focus);
       outline-offset: 2px;
     }
   }
   ```

3. **Use tw-animate-css for Animations**: Leverage the tw-animate-css package for enter/exit animations

   ```css
   .popover[data-entering] {
     @apply animate-in zoom-in-90 fade-in-0 duration-200 ease-out;
   }

   .popover[data-exiting] {
     @apply animate-out zoom-out-95 fade-out duration-150 ease-out;
   }
   ```

4. **Group Related Utilities**: Combine multiple utilities in a single @apply statement

   ```css
   /* Good: Single @apply with all utilities */
   .button {
     @apply relative inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium transition-colors duration-150;
   }

   /* Avoid: Multiple @apply statements */
   .button {
     @apply relative;
     @apply inline-flex items-center justify-center;
     @apply gap-2 px-4 py-2;
   }
   ```

5. **Preserve Complex CSS Functions**: Keep color-mix(), calc(), and other modern CSS functions as regular CSS

   ```css
   .link {
     @apply text-link underline-offset-4 hover:underline;

     /* Complex CSS stays as is */
     text-decoration-color: color-mix(in oklch, var(--link) 50%, transparent);
   }
   ```

6. **Use Arbitrary Values When Needed**: For specific values not in Tailwind's scale

   ```css
   .component {
     @apply duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)];
   }
   ```

## Important Notes for Tailwind CSS v4

1. **Native CSS Nesting**: v4 includes built-in CSS nesting support - no plugins needed
2. **Lightning CSS**: v4 uses Lightning CSS under the hood for vendor prefixing and modern syntax transforms
3. **@apply Changes**: The @apply directive behavior may vary in v4, especially in non-Vue projects
4. **CSS-First Configuration**: v4 emphasizes configuring design tokens directly in CSS using @theme
5. **Modern CSS Features**: v4 is built on cascade layers, @property, and color-mix()

## Migration Tips

When creating components for Tailwind CSS v4:

1. Start with the component's base styles using @apply
2. Add CSS custom properties for dynamic values
3. Use nesting for child elements and states
4. Implement size and color variants through CSS variables
5. Test thoroughly as @apply behavior may differ from v3

Remember that Tailwind CSS v4 is optimized for performance and modern CSS features, so embrace CSS custom properties and native CSS capabilities alongside Tailwind's utility classes.
