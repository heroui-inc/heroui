---
"@heroui/theme": minor
---

Add an opt-in `shadowDOM` flag to the `heroui()` plugin. When enabled, theme variables are also scoped to `:host(...)` selectors and the derived `--color-*` vars are re-declared under every theme selector (`.dark`, `[data-theme='dark']`, `:host(.dark)`, `:host([data-theme='dark'])`), so dark mode works when the generated CSS is adopted into a ShadowRoot. Off by default — no change to existing output.
