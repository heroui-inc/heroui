---
"@heroui/progress": patch
---

These changes ensure that the progress bar behaves correctly in both LTR and RTL layouts, which is crucial for supporting languages that read from right to left (like Arabic, Hebrew, etc.). The transform origin points are particularly important for animations and transitions of the progress indicator.

In the track class:
Added rtl:rotate-180 which rotates the track 180 degrees when in RTL mode, ensuring correct direction

In the indicator class added RTL-aware origin points:
rtl:origin-right sets the transform origin to the right side in RTL mode.
ltr:origin-left sets the transform origin to the left side in LTR (Left-to-Right) mode.