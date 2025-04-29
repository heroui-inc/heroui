---
"@heroui/calendar": patch
---

Replace rectangle intersection detection with center-point distance calculationto make the calendar picker more resilient when browser zoom is changed.The new approach finds the closest picker item to the highlight element'scenter, preventing mismatches between displayed and selected year/month.
