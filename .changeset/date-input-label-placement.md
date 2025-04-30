---
"@heroui/theme": patch
"@heroui/date-input": patch
---

Modified date input components to improve label placement handling:
- Updated `shouldLabelBeOutside` in `use-date-input.ts` to return specific values ("outside" | "outside-left" | false)
- Updated `DateInputGroupProps` interface to use more specific type for `shouldLabelBeOutside`
- Improved wrapper div structure and helper wrapper positioning for outside-left label placement
- Enhanced theme styles for consistent helper wrapper positioning 