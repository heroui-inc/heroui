---
"@heroui/input": patch
"@heroui/number-input": patch
"@heroui/select": patch
---

fix(components): prevent label shift when error message appears with outside placement

- Fixed label positioning issue in Select, Input, and NumberInput components
- Label now maintains stable position when error message appears/disappears
- Wrapped trigger/input element in relative positioned container
- Error messages are now outside the label's positioning context
- Fixes #5796

