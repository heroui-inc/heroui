---
"@heroui/use-intersection-observer": patch
"@heroui/use-data-scroll-overflow": patch
"@heroui/use-aria-accordion-item": patch
"@heroui/use-aria-modal-overlay": patch
"@heroui/use-safe-layout-effect": patch
"@heroui/use-aria-multiselect": patch
"@heroui/use-infinite-scroll": patch
"@heroui/use-scroll-position": patch
"@heroui/react-rsc-utils": patch
"@heroui/scroll-shadow": patch
"@heroui/use-aria-accordion": patch
"@heroui/autocomplete": patch
"@heroui/number-input": patch
"@heroui/use-update-effect": patch
"@heroui/use-viewport-size": patch
"@heroui/dom-animation": patch
"@heroui/stories-utils": patch
"@heroui/breadcrumbs": patch
"@heroui/date-picker": patch
"@heroui/use-aria-overlay": patch
"@heroui/use-callback-ref": patch
"@heroui/framer-utils": patch
"@heroui/shared-icons": patch
"@heroui/shared-utils": patch
"@heroui/date-input": patch
"@heroui/pagination": patch
"@heroui/use-aria-button": patch
"@heroui/react-utils": patch
"@heroui/accordion": patch
"@heroui/input-otp": patch
"@heroui/use-disclosure": patch
"@heroui/use-form-reset": patch
"@heroui/use-is-mounted": patch
"@heroui/use-pagination": patch
"@heroui/use-real-shape": patch
"@heroui/aria-utils": patch
"@heroui/test-utils": patch
"@heroui/calendar": patch
"@heroui/checkbox": patch
"@heroui/dropdown": patch
"@heroui/progress": patch
"@heroui/skeleton": patch
"@heroui/use-aria-link": patch
"@heroui/use-clipboard": patch
"@heroui/use-draggable": patch
"@heroui/use-is-mobile": patch
"@heroui/use-ref-state": patch
"@heroui/divider": patch
"@heroui/listbox": patch
"@heroui/popover": patch
"@heroui/snippet": patch
"@heroui/spinner": patch
"@heroui/tooltip": patch
"@heroui/avatar": patch
"@heroui/button": patch
"@heroui/drawer": patch
"@heroui/navbar": patch
"@heroui/ripple": patch
"@heroui/select": patch
"@heroui/slider": patch
"@heroui/spacer": patch
"@heroui/switch": patch
"@heroui/use-measure": patch
"@heroui/alert": patch
"@heroui/badge": patch
"@heroui/image": patch
"@heroui/input": patch
"@heroui/modal": patch
"@heroui/radio": patch
"@heroui/table": patch
"@heroui/toast": patch
"@heroui/use-resize": patch
"@heroui/card": patch
"@heroui/chip": patch
"@heroui/code": patch
"@heroui/form": patch
"@heroui/link": patch
"@heroui/menu": patch
"@heroui/tabs": patch
"@heroui/user": patch
"@heroui/system-rsc": patch
"@heroui/use-image": patch
"@heroui/use-theme": patch
"@heroui/kbd": patch
"@heroui/use-ssr": patch
"@heroui/system": patch
"@heroui/react": minor
"@heroui/theme": patch
---

## Consolidated Changes

### Major Update
- TailwindCSS v4

### Bug Fixes & Improvements

#### Theme & Styling
- fix rotate transition (#5441)
- fix incorrect target theme (#5469)
- fixed missing radius styles in th and td in Table (#4988)
- fixed transition (#5409)
- fix text selection in table (#5413)
- Fix transition scale (#5271)
- fix outline styles (#5266)

#### Components

**Toast**
- Renaming loadingIcon to loadingComponent
- Fix toast items closing in reverse order. Toasts now close in proper FIFO instead of LIFO (#5096)
- Remove the bottom extension of the toast (#5231)
- Enable programmatically closing a toast with a specific key (#5084)

**Slider**
- introduce `getTooltipValue` prop for custom tooltip value (#4741)
- fixed slider component NaN values when min and max are the same value (#5014)

**Select**
- add `isClearable` and `onClear` prop to Select component (#2239)

**Calendar**
- Replace rectangle intersection detection with center-point distance calculation to make the calendar picker more resilient when browser zoom is changed. The new approach finds the closest picker item to the highlight element's center, preventing mismatches between displayed and selected year / month. (#5117)

**Input**
- fix `Input` accessibility label duplication (#5150)

**Date Input**
- add 'outside-top' prop to input (#3058)

**Table**
- support custom sort icon in Table (#5223)
- remove `removeWrapper` from virtualized table (#4995)

**Autocomplete**
- do not render selector button if selector icon is null (#5423)

**Image & Avatar**
- fixed image src double fetch issue (#3847)

#### System & Core
- add useInputLabelPlacement
- remove `@heroui/aria-utils` dependency

#### Hooks & Utilities
- fix use-theme logic
- Fix skeleton animate
- bump RA versions
- Draggable modal will be scrollable in mobile devices (#5280)
- refactor: overlay & interactOutside 