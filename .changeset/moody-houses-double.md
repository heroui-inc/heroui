# Update: Handle disabled vs isDisabled in useButton

---

"@heroui/button": minor

---

### What

Improved the internal handling of `disabled` and `isDisabled` props in `useButton` hook:

- Now both `disabled` (native) and `isDisabled` (custom) props are supported in a controlled and consistent way.
- When both are provided, `disabled` takes precedence over `isDisabled`.
- This update ensures a predictable and accessible behavior for the button component, and prevents accidental bypass of the disabled state.

### Why

Previously, the `useButton` hook relied solely on the `isDisabled` prop for determining the button’s disabled state. While `disabled` was technically allowed via DOM props, it was **not** omitted or internally handled, leading to confusion:

- Users could pass `disabled`, expecting it to work, but it would silently be ignored unless `isDisabled` was also set.
- This behavior caused accessibility inconsistencies and incorrect UI state, especially when consuming the library in uncontrolled environments or when using native props.

The lack of prioritization between `disabled` and `isDisabled` introduced ambiguity and edge cases where the button appeared enabled but did not respond to user interactions correctly.

### How

- The hook now explicitly checks both `disabled` and `isDisabled`, and **normalizes** them to a single internal `isDisabled` flag.
- If both are present, `disabled` overrides `isDisabled`, ensuring compatibility with native expectations and avoiding unexpected UI behavior.
- The final disabled state (`isActuallyDisabled`) is then used consistently throughout focus, hover, ripple, ARIA, and event logic.
- The implementation maintains backward compatibility while improving robustness.

Also:
- Import order in `use-button.ts` has been reverted to avoid conflicts with the ongoing ESLint formatting PR.
- No runtime behavior has been removed — this is a safe, additive change that improves clarity and control.
