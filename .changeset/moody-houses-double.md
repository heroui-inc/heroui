# Update: Handle disabled vs isDisabled in useButton

---

"@heroui/button": minor

---

### What

Improved the internal handling of `disabled` and `isDisabled` props in the `useButton` hook:

- Now both `disabled` (native) and `isDisabled` (custom) props are supported in a controlled and consistent way.
- When both are provided, **`isDisabled` takes precedence** over `disabled`.
- This update ensures predictable, accessible behavior for the button component, and prevents accidental bypass of the disabled state.

### Why

Previously, the `useButton` hook relied solely on the `isDisabled` prop for determining the button’s disabled state. While `disabled` (the native prop) was allowed via DOM spreading, it was **not** handled or normalized internally, leading to confusion:

- Users could pass `disabled`, expecting it to work, but it would silently be ignored unless `isDisabled` was also set.
- This caused accessibility inconsistencies and incorrect UI behavior, especially in uncontrolled usage or in integrations with native props (e.g. forms).
- It was unclear which prop had priority when both were present, leading to ambiguity.

To address this, we aligned behavior with the internal API and clarified the precedence rules.

### How

- The hook now explicitly checks both `disabled` and `isDisabled`, and **normalizes** them to a single internal `isActuallyDisabled` flag.
- If both are defined, `isDisabled` takes precedence — providing clearer control from within the design system and ensuring predictable behavior.
- The normalized disabled state is now consistently used throughout all logic: focus, hover, ripple, ARIA attributes, and event handling.

Also:
- Fixed import order in `use-button.ts` to match ESLint and style guide expectations.
- Added tests to cover edge cases where `disabled` and `isDisabled` conflict — including the case where `isDisabled={false}` and `disabled={true}`, confirming that the button is interactive.
- This is a non-breaking, additive update that improves clarity, robustness, and accessibility.
