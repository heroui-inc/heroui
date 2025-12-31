---
"@heroui/modal": patch
---

Fixed modal animation by removing scale transforms to prevent input rendering issues in certain browsers. Ensured the modal portal uses document.body for consistent rendering across environments.