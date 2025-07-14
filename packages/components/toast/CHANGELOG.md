# @heroui/toast

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

- Updated dependencies []:
  - @heroui/shared-icons@0.0.0-canary-20250714211511
  - @heroui/shared-utils@0.0.0-canary-20250714211511
  - @heroui/react-utils@0.0.0-canary-20250714211511
  - @heroui/use-is-mobile@0.0.0-canary-20250714211511
  - @heroui/spinner@0.0.0-canary-20250714211511
  - @heroui/system@0.0.0-canary-20250714211511
  - @heroui/theme@0.0.0-canary-20250714211511

## 2.0.13-beta.3

### Patch Changes

- [#5466](https://github.com/heroui-inc/heroui/pull/5466) [`87f8a12`](https://github.com/heroui-inc/heroui/commit/87f8a12c279e06cab23d0b60ae35c96ee6d29f32) Thanks [@wingkwong](https://github.com/wingkwong)! - add back RA deps (overlays & utils)

- Updated dependencies [[`87f8a12`](https://github.com/heroui-inc/heroui/commit/87f8a12c279e06cab23d0b60ae35c96ee6d29f32)]:
  - @heroui/shared-icons@2.1.10-beta.6
  - @heroui/shared-utils@2.1.10-beta.7
  - @heroui/react-utils@2.1.12-beta.5
  - @heroui/use-is-mobile@2.2.11-beta.5
  - @heroui/spinner@2.2.20-beta.2

## 2.0.13-beta.2

### Patch Changes

- [`3275e8c`](https://github.com/heroui-inc/heroui/commit/3275e8ca01e65a207e6a431dd40b949a22c1f1f8) Thanks [@wingkwong](https://github.com/wingkwong)! - trigger beta release

- Updated dependencies [[`3275e8c`](https://github.com/heroui-inc/heroui/commit/3275e8ca01e65a207e6a431dd40b949a22c1f1f8)]:
  - @heroui/shared-icons@2.1.10-beta.5
  - @heroui/shared-utils@2.1.10-beta.6
  - @heroui/react-utils@2.1.12-beta.4
  - @heroui/use-is-mobile@2.2.11-beta.4
  - @heroui/spinner@2.2.20-beta.1

## 2.0.13-beta.1

### Patch Changes

- [#5405](https://github.com/heroui-inc/heroui/pull/5405) [`9ed4c29`](https://github.com/heroui-inc/heroui/commit/9ed4c292323388934b5e63aad30c04a00c1526de) Thanks [@adi-ray](https://github.com/adi-ray)! - Fix toast items closing in reverse order. Toasts now close in proper FIFO instead of LIFO (#5096)

- [#5245](https://github.com/heroui-inc/heroui/pull/5245) [`e1a0d9d`](https://github.com/heroui-inc/heroui/commit/e1a0d9d53d34cdb59a1aaf3f553f7d54fbf6f60d) Thanks [@Vishvsalvi](https://github.com/Vishvsalvi)! - Remove the bottom extenstion of the toast (#5231)

- Updated dependencies [[`a95feca`](https://github.com/heroui-inc/heroui/commit/a95feca4586ca0a61e13ad03c16fab112160a02b)]:
  - @heroui/shared-icons@2.1.10-beta.4
  - @heroui/spinner@2.2.20-beta.0

## 2.0.13-beta.0

### Patch Changes

- [#4919](https://github.com/heroui-inc/heroui/pull/4919) [`ecffb26`](https://github.com/heroui-inc/heroui/commit/ecffb26320da15824356dbccb33d8627326a4b7c) Thanks [@macci001](https://github.com/macci001)! - Renaming loadingIcon to loadingComponent.

- [`1bca3f9`](https://github.com/heroui-inc/heroui/commit/1bca3f994655081f04714843047185aacdd481c0) Thanks [@wingkwong](https://github.com/wingkwong)! - sync 2.7.11 release

- Updated dependencies [[`1bca3f9`](https://github.com/heroui-inc/heroui/commit/1bca3f994655081f04714843047185aacdd481c0)]:
  - @heroui/shared-icons@2.1.10-beta.3
  - @heroui/shared-utils@2.1.10-beta.5
  - @heroui/react-utils@2.1.12-beta.3
  - @heroui/use-is-mobile@2.2.11-beta.3
  - @heroui/spinner@2.2.20-beta.0
  - @heroui/system@2.4.19-beta.0

## 2.0.12

### Patch Changes

- [#5382](https://github.com/heroui-inc/heroui/pull/5382) [`7dff993`](https://github.com/heroui-inc/heroui/commit/7dff993e1d11e8f915d1e9c1201396e9b5b53dbf) Thanks [@wingkwong](https://github.com/wingkwong)! - bump RA versions

- [#5374](https://github.com/heroui-inc/heroui/pull/5374) [`be6a1db`](https://github.com/heroui-inc/heroui/commit/be6a1dbf40507af164ebdbe085eda6cceb98aeed) Thanks [@wingkwong](https://github.com/wingkwong)! - bump system peer dependencies

- Updated dependencies []:
  - @heroui/spinner@2.2.19

## 2.0.11

### Patch Changes

- [#5361](https://github.com/heroui-inc/heroui/pull/5361) [`1e23994`](https://github.com/heroui-inc/heroui/commit/1e2399434578827987aedc8ff3cc9cf6ccc99c5f) Thanks [@wingkwong](https://github.com/wingkwong)! - bump RA versions

- [#5362](https://github.com/heroui-inc/heroui/pull/5362) [`0d217e4`](https://github.com/heroui-inc/heroui/commit/0d217e466f3af30c85edc7d53638e031c8458c56) Thanks [@wingkwong](https://github.com/wingkwong)! - consistent type imports

- [#5362](https://github.com/heroui-inc/heroui/pull/5362) [`0d217e4`](https://github.com/heroui-inc/heroui/commit/0d217e466f3af30c85edc7d53638e031c8458c56) Thanks [@wingkwong](https://github.com/wingkwong)! - remove unused dependencies

- Updated dependencies [[`1e23994`](https://github.com/heroui-inc/heroui/commit/1e2399434578827987aedc8ff3cc9cf6ccc99c5f), [`0d217e4`](https://github.com/heroui-inc/heroui/commit/0d217e466f3af30c85edc7d53638e031c8458c56), [`0d217e4`](https://github.com/heroui-inc/heroui/commit/0d217e466f3af30c85edc7d53638e031c8458c56)]:
  - @heroui/use-is-mobile@2.2.10
  - @heroui/shared-icons@2.1.9
  - @heroui/react-utils@2.1.11
  - @heroui/spinner@2.2.18

## 2.0.10

### Patch Changes

- [#5246](https://github.com/heroui-inc/heroui/pull/5246) [`8df9716`](https://github.com/heroui-inc/heroui/commit/8df9716dfa29926237682b73df59e8018843e9c0) Thanks [@wingkwong](https://github.com/wingkwong)! - support render icons by function in Toast

- [#5310](https://github.com/heroui-inc/heroui/pull/5310) [`1d62208`](https://github.com/heroui-inc/heroui/commit/1d62208642d06f7896724b2702ecb5a17931eb88) Thanks [@wingkwong](https://github.com/wingkwong)! - bump RA versions

- Updated dependencies [[`8df9716`](https://github.com/heroui-inc/heroui/commit/8df9716dfa29926237682b73df59e8018843e9c0)]:
  - @heroui/shared-icons@2.1.8
  - @heroui/spinner@2.2.17

## 2.0.9

### Patch Changes

- [`b9e94a2`](https://github.com/heroui-inc/heroui/commit/b9e94a21518ba18447603680055c3a7dad8372bf) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - add default value for custom theme properties (#5194)

  v2.7.7

- Updated dependencies [[`b9e94a2`](https://github.com/heroui-inc/heroui/commit/b9e94a21518ba18447603680055c3a7dad8372bf)]:
  - @heroui/spinner@2.2.16
  - @heroui/use-is-mobile@2.2.9
  - @heroui/react-utils@2.1.10
  - @heroui/shared-icons@2.1.7
  - @heroui/shared-utils@2.1.9

## 2.0.8

### Patch Changes

- [#5186](https://github.com/heroui-inc/heroui/pull/5186) [`500ed77`](https://github.com/heroui-inc/heroui/commit/500ed771e25b08038fdc0d9401bfac31a2d68c3e) Thanks [@wingkwong](https://github.com/wingkwong)! - RA version bump (#5186)

- Updated dependencies [[`500ed77`](https://github.com/heroui-inc/heroui/commit/500ed771e25b08038fdc0d9401bfac31a2d68c3e)]:
  - @heroui/shared-utils@2.1.8
  - @heroui/use-is-mobile@2.2.8
  - @heroui/spinner@2.2.15
  - @heroui/react-utils@2.1.9

## 2.0.7

### Patch Changes

- [#5121](https://github.com/heroui-inc/heroui/pull/5121) [`ca5babc`](https://github.com/heroui-inc/heroui/commit/ca5babcbb95b82ff40d9640034206b9018e1105c) Thanks [@alex-gavr](https://github.com/alex-gavr)! - - Use LazyMotion and AnimatePresence in ToastProvider to support exit animations.

- [#5060](https://github.com/heroui-inc/heroui/pull/5060) [`3944e1a`](https://github.com/heroui-inc/heroui/commit/3944e1af4ad58e45e49c4f54c3562474092505b1) Thanks [@wingkwong](https://github.com/wingkwong)! - RA version bump

- [#5034](https://github.com/heroui-inc/heroui/pull/5034) [`afdd892`](https://github.com/heroui-inc/heroui/commit/afdd892690f8ab166f3c5f35a1c1a3f2446831b8) Thanks [@macci001](https://github.com/macci001)! - Making toast compatible with RA upgrade.
  Changing the type of description prop to ReactNode(#5033).
- Updated dependencies []:
  - @heroui/spinner@2.2.14

## 2.0.6

### Patch Changes

- [#5003](https://github.com/heroui-inc/heroui/pull/5003) [`1f95899`](https://github.com/heroui-inc/heroui/commit/1f9589943af2e6910fc6a4b4bce53e47b91f4a61) Thanks [@wingkwong](https://github.com/wingkwong)! - tmp fix for unexpected toast animation

- [#5001](https://github.com/heroui-inc/heroui/pull/5001) [`6f94545`](https://github.com/heroui-inc/heroui/commit/6f945458c8372949e80a1f5acc6c3047450d6b9d) Thanks [@macci001](https://github.com/macci001)! - Toast should be above the modal(#4898).

- [#4998](https://github.com/heroui-inc/heroui/pull/4998) [`88f1641`](https://github.com/heroui-inc/heroui/commit/88f164116c2be75cd2de0a076f5ba0942a43e3de) Thanks [@wingkwong](https://github.com/wingkwong)! - bump RA versions

- Updated dependencies []:
  - @heroui/spinner@2.2.13

## 2.0.5

### Patch Changes

- v2.7.4

- Updated dependencies []:
  - @heroui/spinner@2.2.12
  - @heroui/use-is-mobile@2.2.7
  - @heroui/react-utils@2.1.8
  - @heroui/shared-icons@2.1.6
  - @heroui/shared-utils@2.1.7

## 2.0.4

### Patch Changes

- [#4901](https://github.com/heroui-inc/heroui/pull/4901) [`09a2b73`](https://github.com/heroui-inc/heroui/commit/09a2b7387056e176417404dbf7edb4cfb8c880a9) Thanks [@wingkwong](https://github.com/wingkwong)! - update peerDependencies (#4901)

- [#4881](https://github.com/heroui-inc/heroui/pull/4881) [`29df4f5`](https://github.com/heroui-inc/heroui/commit/29df4f531756daf84d2334926d193715fefeb428) Thanks [@macci001](https://github.com/macci001)! - fixing maxVisibleToast functionality in toast (#4870)
  For promises, starting the timer only after the promise is resolved

- [#4858](https://github.com/heroui-inc/heroui/pull/4858) [`fd446da`](https://github.com/heroui-inc/heroui/commit/fd446dac2ac2af56f287a6b23c5baaea79ec3979) Thanks [@wingkwong](https://github.com/wingkwong)! - fix shouldShowTimeoutProgess typo (#4856)

- Updated dependencies [[`2186f6d`](https://github.com/heroui-inc/heroui/commit/2186f6da23679c5cf63ea03c9c6df9ca6df92ad9)]:
  - @heroui/spinner@2.2.11

## 2.0.3

### Patch Changes

- Fix v2.7.0 release

- Updated dependencies []:
  - @heroui/shared-icons@2.1.5
  - @heroui/shared-utils@2.1.6
  - @heroui/react-utils@2.1.7
  - @heroui/use-is-mobile@2.2.6
  - @heroui/spinner@2.2.10

## 2.0.2

### Patch Changes

- Fix v2.7.0 release

- Updated dependencies []:
  - @heroui/spinner@2.2.9
  - @heroui/use-is-mobile@2.2.5
  - @heroui/react-utils@2.1.6
  - @heroui/shared-icons@2.1.4
  - @heroui/shared-utils@2.1.5

## 2.0.1

### Patch Changes

- [`09241fa`](https://github.com/heroui-inc/heroui/commit/09241faa4b63765b7721ba9b473e3465b6d5e503) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Toasts styles improved

- [`88b9cbe`](https://github.com/heroui-inc/heroui/commit/88b9cbeddde4fee3f84c5422d55cd9b64e9025e0) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix peer depts

- [`4ff87ca`](https://github.com/heroui-inc/heroui/commit/4ff87ca7afccd2c3db0b145156a8357b2b51e7b5) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - v2.7.0
  - Tailwind variants upgraded to the latest version, classnames adjusted, tests fixed
  - Bump RA versions
  - Various package updates and improvements across the HeroUI component library
  - Fixed reversed navigation behavior of nextButton and prevButton in the RTL calendar (#4541)
  - Adding support for global labelPlacement prop (ENG-1694)
  - Avoid showing onClick deprecation warning for internal onClick (#4549, #4546)
  - Fixed unexpected scrollShadow on virtualized listbox (#4553)
  - Fix SelectItem, ListboxItem, and AutocompleteItem not to accept value props (#2283)
  - New Components and Features:
    - Introduce NumberInput component
    - Introduce Toast component (#2560)
  - Various improvements and bug fixes across components:
    - Enhanced accessibility features and ARIA support
    - Updated component styling and theme configurations
    - Performance optimizations and code cleanup
    - RTL support improvements
    - Better type safety and prop validation
- Updated dependencies [[`f51d645`](https://github.com/heroui-inc/heroui/commit/f51d645d3d98ca2cc9ebcc89627959766fecc234), [`4ff87ca`](https://github.com/heroui-inc/heroui/commit/4ff87ca7afccd2c3db0b145156a8357b2b51e7b5)]:
  - @heroui/spinner@2.2.8
  - @heroui/use-is-mobile@2.2.4
  - @heroui/react-utils@2.1.5
  - @heroui/shared-icons@2.1.3
  - @heroui/shared-utils@2.1.4
