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
  @apply relative inline-flex align-middle;
}

.avatar-group {
  @apply flex overflow-hidden;
}
```

### Complex @apply Examples

```css
.menu {
  @apply flex w-fit flex-col flex-wrap p-2;
  font-size: 0.875rem;
}

.checkbox {
  @apply text-base-content rounded-selector relative inline-block shrink-0 cursor-pointer appearance-none p-1 align-middle;
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

1. **Use CSS Variables for Theming**: Define component-specific CSS variables that can be overridden

   ```css
   .component {
     --component-bg: var(--color-base-100);
     background-color: var(--component-bg);
   }
   ```

2. **Leverage :where() for Specificity Control**: Use `:where()` to keep specificity low

   ```css
   :where(.button) {
     width: unset;
   }
   ```

3. **Combine @apply with Custom CSS**: Mix Tailwind utilities with standard CSS

   ```css
   .element {
     @apply flex items-center;
     gap: 0.75rem;
     transition: transform 0.2s;
   }
   ```

4. **Use Nested Selectors Wisely**: Keep nesting levels reasonable for maintainability

   ```css
   .parent {
     & > .child {
       @apply p-2;

       &:hover {
         @apply bg-gray-100;
       }
     }
   }
   ```

5. **Modern CSS Features**: Utilize color-mix(), calc(), and other modern CSS functions
   ```css
   .element {
     background: color-mix(in oklab, var(--color-primary) 20%, transparent);
     padding: calc(var(--spacing) * 2);
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
