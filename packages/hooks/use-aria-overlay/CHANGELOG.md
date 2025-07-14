# @heroui/use-aria-overlay

## 0.0.0-canary-20250714211511

### Patch Changes

- ## Consolidated Changes

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

## 2.0.1-beta.7

### Patch Changes

- [#5466](https://github.com/heroui-inc/heroui/pull/5466) [`87f8a12`](https://github.com/heroui-inc/heroui/commit/87f8a12c279e06cab23d0b60ae35c96ee6d29f32) Thanks [@wingkwong](https://github.com/wingkwong)! - add back RA deps (overlays & utils)

## 2.0.1-beta.6

### Patch Changes

- [`3275e8c`](https://github.com/heroui-inc/heroui/commit/3275e8ca01e65a207e6a431dd40b949a22c1f1f8) Thanks [@wingkwong](https://github.com/wingkwong)! - trigger beta release

## 2.0.1-beta.5

### Patch Changes

- [`1bca3f9`](https://github.com/heroui-inc/heroui/commit/1bca3f994655081f04714843047185aacdd481c0) Thanks [@wingkwong](https://github.com/wingkwong)! - sync 2.7.11 release

## 2.0.1-beta.4

### Patch Changes

- [#5401](https://github.com/heroui-inc/heroui/pull/5401) [`a2c4745`](https://github.com/heroui-inc/heroui/commit/a2c4745f078b2fe30890149d336b1a19a09d394d) Thanks [@wingkwong](https://github.com/wingkwong)! - remove `@heroui/aria-utils` dependency

## 2.0.1-beta.3

### Patch Changes

- [#5398](https://github.com/heroui-inc/heroui/pull/5398) [`9c3e4d9`](https://github.com/heroui-inc/heroui/commit/9c3e4d97377706162a5e3145a1429fdb2e5db3be) Thanks [@wingkwong](https://github.com/wingkwong)! - remove RA dependencies (overlays & utils)

## 2.0.1-beta.2

### Patch Changes

- [#5392](https://github.com/heroui-inc/heroui/pull/5392) [`0001ab7`](https://github.com/heroui-inc/heroui/commit/0001ab794bd83f141d82d91d205f8391f5d98d9b) Thanks [@wingkwong](https://github.com/wingkwong)! - bump RA versions

- [#5100](https://github.com/heroui-inc/heroui/pull/5100) [`5600730`](https://github.com/heroui-inc/heroui/commit/56007303b9885162dcc8a35e808bc19dbfec70f6) Thanks [@wingkwong](https://github.com/wingkwong)! - refactor: overlay & interactOutside

## 2.0.1-beta.1

### Patch Changes

- [#5348](https://github.com/heroui-inc/heroui/pull/5348) [`706e7ec`](https://github.com/heroui-inc/heroui/commit/706e7ecf59b0b8906ac88e05ef8a15a4efc59251) Thanks [@github-actions](https://github.com/apps/github-actions)! - sync with 2.7.9 changes

- [#5100](https://github.com/heroui-inc/heroui/pull/5100) [`5600730`](https://github.com/heroui-inc/heroui/commit/56007303b9885162dcc8a35e808bc19dbfec70f6) Thanks [@wingkwong](https://github.com/wingkwong)! - refactor: overlay & interactOutside

## 2.0.1-beta.0

### Patch Changes

- [#5100](https://github.com/heroui-inc/heroui/pull/5100) [`5600730`](https://github.com/heroui-inc/heroui/commit/56007303b9885162dcc8a35e808bc19dbfec70f6) Thanks [@wingkwong](https://github.com/wingkwong)! - refactor: overlay & interactOutside
