---
"@heroui/theme": patch
---

Fixed RTL time segment ordering in date pickers for Arabic and Hebrew locales.

In RTL locales (ar-AE, he-IL), time segments were displaying in incorrect visual order due to flex containers isolating individual segments from the Unicode bidirectional algorithm.

- **date-input**: Changed from `flex` to `block` container with `inline` segments
- **date-picker**: Removed `flex-wrap gap-x-6` from `timeInput` slot

This allows proper RTL text reordering while maintaining spacing and functionality in DatePicker, DateRangePicker, and TimeInput components.