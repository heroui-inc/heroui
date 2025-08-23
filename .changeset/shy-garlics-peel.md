---
"@heroui/use-aria-overlay": patch
---

fix: prevent premature closing of modal/drawer on press start

Removes `onHide()` from `onInteractOutsideStart` to fix an issue where modals and drawers closed as soon as the user pressed outside them, instead of after a full press and release.
