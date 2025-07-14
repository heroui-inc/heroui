# @heroui/number-input

## 2.0.13

### Patch Changes

- [`e489af8`](https://github.com/heroui-inc/heroui/commit/e489af83c189d0b42dca1b0afca1f5d003cd6033) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - ## Consolidated Changes

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

- Updated dependencies [[`e489af8`](https://github.com/heroui-inc/heroui/commit/e489af83c189d0b42dca1b0afca1f5d003cd6033)]:
  - @heroui/use-safe-layout-effect@2.1.8
  - @heroui/shared-icons@2.1.10
  - @heroui/shared-utils@2.1.10
  - @heroui/react-utils@2.1.12
  - @heroui/button@2.2.23
  - @heroui/form@2.1.22

## 2.0.13-beta.4

### Patch Changes

- [#5466](https://github.com/heroui-inc/heroui/pull/5466) [`87f8a12`](https://github.com/heroui-inc/heroui/commit/87f8a12c279e06cab23d0b60ae35c96ee6d29f32) Thanks [@wingkwong](https://github.com/wingkwong)! - add back RA deps (overlays & utils)

- Updated dependencies [[`87f8a12`](https://github.com/heroui-inc/heroui/commit/87f8a12c279e06cab23d0b60ae35c96ee6d29f32)]:
  - @heroui/use-safe-layout-effect@2.1.8-beta.7
  - @heroui/shared-icons@2.1.10-beta.6
  - @heroui/shared-utils@2.1.10-beta.7
  - @heroui/react-utils@2.1.12-beta.5
  - @heroui/button@2.2.23-beta.2
  - @heroui/form@2.1.22-beta.4

## 2.0.13-beta.3

### Patch Changes

- Updated dependencies []:
  - @heroui/button@2.2.23-beta.1
  - @heroui/form@2.1.22-beta.3

## 2.0.13-beta.2

### Patch Changes

- [`3275e8c`](https://github.com/heroui-inc/heroui/commit/3275e8ca01e65a207e6a431dd40b949a22c1f1f8) Thanks [@wingkwong](https://github.com/wingkwong)! - trigger beta release

- Updated dependencies [[`3275e8c`](https://github.com/heroui-inc/heroui/commit/3275e8ca01e65a207e6a431dd40b949a22c1f1f8)]:
  - @heroui/use-safe-layout-effect@2.1.8-beta.6
  - @heroui/shared-icons@2.1.10-beta.5
  - @heroui/shared-utils@2.1.10-beta.6
  - @heroui/react-utils@2.1.12-beta.4
  - @heroui/button@2.2.23-beta.1
  - @heroui/form@2.1.22-beta.2

## 2.0.13-beta.1

### Patch Changes

- Updated dependencies [[`a95feca`](https://github.com/heroui-inc/heroui/commit/a95feca4586ca0a61e13ad03c16fab112160a02b)]:
  - @heroui/shared-icons@2.1.10-beta.4
  - @heroui/button@2.2.23-beta.0
  - @heroui/form@2.1.22-beta.1

## 2.0.13-beta.0

### Patch Changes

- [`1bca3f9`](https://github.com/heroui-inc/heroui/commit/1bca3f994655081f04714843047185aacdd481c0) Thanks [@wingkwong](https://github.com/wingkwong)! - sync 2.7.11 release

- Updated dependencies [[`1bca3f9`](https://github.com/heroui-inc/heroui/commit/1bca3f994655081f04714843047185aacdd481c0)]:
  - @heroui/use-safe-layout-effect@2.1.8-beta.5
  - @heroui/shared-icons@2.1.10-beta.3
  - @heroui/shared-utils@2.1.10-beta.5
  - @heroui/react-utils@2.1.12-beta.3
  - @heroui/button@2.2.23-beta.0
  - @heroui/form@2.1.22-beta.0
  - @heroui/system@2.4.19-beta.0

## 2.0.12

### Patch Changes

- [#5382](https://github.com/heroui-inc/heroui/pull/5382) [`7dff993`](https://github.com/heroui-inc/heroui/commit/7dff993e1d11e8f915d1e9c1201396e9b5b53dbf) Thanks [@wingkwong](https://github.com/wingkwong)! - bump RA versions

- [#5374](https://github.com/heroui-inc/heroui/pull/5374) [`be6a1db`](https://github.com/heroui-inc/heroui/commit/be6a1dbf40507af164ebdbe085eda6cceb98aeed) Thanks [@wingkwong](https://github.com/wingkwong)! - bump system peer dependencies

- Updated dependencies [[`7dff993`](https://github.com/heroui-inc/heroui/commit/7dff993e1d11e8f915d1e9c1201396e9b5b53dbf), [`be6a1db`](https://github.com/heroui-inc/heroui/commit/be6a1dbf40507af164ebdbe085eda6cceb98aeed)]:
  - @heroui/button@2.2.22
  - @heroui/form@2.1.21

## 2.0.11

### Patch Changes

- [#5350](https://github.com/heroui-inc/heroui/pull/5350) [`ace931b`](https://github.com/heroui-inc/heroui/commit/ace931b44db98c227bd4a36bd26c4db8de7d5bf6) Thanks [@Vishvsalvi](https://github.com/Vishvsalvi)! - Consistent helperWrapper padding (#5338)

- [#5361](https://github.com/heroui-inc/heroui/pull/5361) [`1e23994`](https://github.com/heroui-inc/heroui/commit/1e2399434578827987aedc8ff3cc9cf6ccc99c5f) Thanks [@wingkwong](https://github.com/wingkwong)! - bump RA versions

- [#5362](https://github.com/heroui-inc/heroui/pull/5362) [`0d217e4`](https://github.com/heroui-inc/heroui/commit/0d217e466f3af30c85edc7d53638e031c8458c56) Thanks [@wingkwong](https://github.com/wingkwong)! - consistent type imports

- [#5362](https://github.com/heroui-inc/heroui/pull/5362) [`0d217e4`](https://github.com/heroui-inc/heroui/commit/0d217e466f3af30c85edc7d53638e031c8458c56) Thanks [@wingkwong](https://github.com/wingkwong)! - remove unused dependencies

- [#5368](https://github.com/heroui-inc/heroui/pull/5368) [`ad807be`](https://github.com/heroui-inc/heroui/commit/ad807bec7e87eb37583b2e9632a4680d4418eda6) Thanks [@wingkwong](https://github.com/wingkwong)! - avoid non number type passing to NumberInput

- Updated dependencies [[`1e23994`](https://github.com/heroui-inc/heroui/commit/1e2399434578827987aedc8ff3cc9cf6ccc99c5f), [`0d217e4`](https://github.com/heroui-inc/heroui/commit/0d217e466f3af30c85edc7d53638e031c8458c56), [`0d217e4`](https://github.com/heroui-inc/heroui/commit/0d217e466f3af30c85edc7d53638e031c8458c56)]:
  - @heroui/button@2.2.21
  - @heroui/form@2.1.20
  - @heroui/shared-icons@2.1.9
  - @heroui/react-utils@2.1.11

## 2.0.10

### Patch Changes

- [#5310](https://github.com/heroui-inc/heroui/pull/5310) [`1d62208`](https://github.com/heroui-inc/heroui/commit/1d62208642d06f7896724b2702ecb5a17931eb88) Thanks [@wingkwong](https://github.com/wingkwong)! - bump RA versions

- Updated dependencies [[`8df9716`](https://github.com/heroui-inc/heroui/commit/8df9716dfa29926237682b73df59e8018843e9c0), [`1d62208`](https://github.com/heroui-inc/heroui/commit/1d62208642d06f7896724b2702ecb5a17931eb88), [`06fe3a3`](https://github.com/heroui-inc/heroui/commit/06fe3a3c4e7f2fdfb5fcbb2255c907280c892de9)]:
  - @heroui/shared-icons@2.1.8
  - @heroui/button@2.2.20
  - @heroui/form@2.1.19

## 2.0.9

### Patch Changes

- [`b9e94a2`](https://github.com/heroui-inc/heroui/commit/b9e94a21518ba18447603680055c3a7dad8372bf) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - add default value for custom theme properties (#5194)

  v2.7.7

- Updated dependencies [[`b9e94a2`](https://github.com/heroui-inc/heroui/commit/b9e94a21518ba18447603680055c3a7dad8372bf)]:
  - @heroui/button@2.2.19
  - @heroui/form@2.1.18
  - @heroui/use-safe-layout-effect@2.1.7
  - @heroui/react-utils@2.1.10
  - @heroui/shared-icons@2.1.7
  - @heroui/shared-utils@2.1.9

## 2.0.8

### Patch Changes

- [#5186](https://github.com/heroui-inc/heroui/pull/5186) [`500ed77`](https://github.com/heroui-inc/heroui/commit/500ed771e25b08038fdc0d9401bfac31a2d68c3e) Thanks [@wingkwong](https://github.com/wingkwong)! - RA version bump (#5186)

- Updated dependencies [[`53295ca`](https://github.com/heroui-inc/heroui/commit/53295ca9dc7a1310485e1574fd28110b6cbf5ebd), [`500ed77`](https://github.com/heroui-inc/heroui/commit/500ed771e25b08038fdc0d9401bfac31a2d68c3e)]:
  - @heroui/button@2.2.18
  - @heroui/shared-utils@2.1.8
  - @heroui/form@2.1.17
  - @heroui/react-utils@2.1.9

## 2.0.7

### Patch Changes

- [#5097](https://github.com/heroui-inc/heroui/pull/5097) [`1a7f3da`](https://github.com/heroui-inc/heroui/commit/1a7f3da5fd028d8622ea8b12b95cb9df196ab2f4) Thanks [@wingkwong](https://github.com/wingkwong)! - add missing dependencies to getStepperIncreaseButtonProps and getStepperDecreaseButtonProps (#5095)

- [#5060](https://github.com/heroui-inc/heroui/pull/5060) [`3944e1a`](https://github.com/heroui-inc/heroui/commit/3944e1af4ad58e45e49c4f54c3562474092505b1) Thanks [@wingkwong](https://github.com/wingkwong)! - RA version bump

- Updated dependencies [[`3944e1a`](https://github.com/heroui-inc/heroui/commit/3944e1af4ad58e45e49c4f54c3562474092505b1), [`9247f74`](https://github.com/heroui-inc/heroui/commit/9247f7423334b8db4194f31488119efddc28961f)]:
  - @heroui/button@2.2.17
  - @heroui/form@2.1.16

## 2.0.6

### Patch Changes

- [#4998](https://github.com/heroui-inc/heroui/pull/4998) [`88f1641`](https://github.com/heroui-inc/heroui/commit/88f164116c2be75cd2de0a076f5ba0942a43e3de) Thanks [@wingkwong](https://github.com/wingkwong)! - bump RA versions

- Updated dependencies [[`88f1641`](https://github.com/heroui-inc/heroui/commit/88f164116c2be75cd2de0a076f5ba0942a43e3de)]:
  - @heroui/button@2.2.16
  - @heroui/form@2.1.15

## 2.0.5

### Patch Changes

- v2.7.4

- Updated dependencies []:
  - @heroui/button@2.2.15
  - @heroui/form@2.1.14
  - @heroui/use-safe-layout-effect@2.1.6
  - @heroui/react-utils@2.1.8
  - @heroui/shared-icons@2.1.6
  - @heroui/shared-utils@2.1.7

## 2.0.4

### Patch Changes

- [#4907](https://github.com/heroui-inc/heroui/pull/4907) [`f55cf8b`](https://github.com/heroui-inc/heroui/commit/f55cf8bc7f3f1b2ebcded14f5f008ccfe8c4892c) Thanks [@wingkwong](https://github.com/wingkwong)! - handle onChange event in number input (#4874)

- [#4901](https://github.com/heroui-inc/heroui/pull/4901) [`09a2b73`](https://github.com/heroui-inc/heroui/commit/09a2b7387056e176417404dbf7edb4cfb8c880a9) Thanks [@wingkwong](https://github.com/wingkwong)! - update peerDependencies (#4901)

- Updated dependencies []:
  - @heroui/button@2.2.14
  - @heroui/form@2.1.13

## 2.0.3

### Patch Changes

- Fix v2.7.0 release

- Updated dependencies []:
  - @heroui/use-safe-layout-effect@2.1.5
  - @heroui/shared-icons@2.1.5
  - @heroui/shared-utils@2.1.6
  - @heroui/react-utils@2.1.7
  - @heroui/button@2.2.13
  - @heroui/form@2.1.12

## 2.0.2

### Patch Changes

- Fix v2.7.0 release

- Updated dependencies []:
  - @heroui/button@2.2.12
  - @heroui/form@2.1.11
  - @heroui/use-safe-layout-effect@2.1.4
  - @heroui/react-utils@2.1.6
  - @heroui/shared-icons@2.1.4
  - @heroui/shared-utils@2.1.5

## 2.0.1

### Patch Changes

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
- Updated dependencies [[`4ff87ca`](https://github.com/heroui-inc/heroui/commit/4ff87ca7afccd2c3db0b145156a8357b2b51e7b5)]:
  - @heroui/button@2.2.11
  - @heroui/form@2.1.10
  - @heroui/use-safe-layout-effect@2.1.3
  - @heroui/react-utils@2.1.5
  - @heroui/shared-icons@2.1.3
  - @heroui/shared-utils@2.1.4
