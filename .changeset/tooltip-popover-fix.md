---
"@heroui/react": patch
---

Fixed tooltip staying visible when clicking buttons that open overlays (popovers, menus, dialogs). Tooltips now properly close and stay closed for 500ms to prevent race condition with React Aria's reopen behavior.
