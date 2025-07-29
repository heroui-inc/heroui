# @heroui/form

## 2.1.24

### Patch Changes

- [#5517](https://github.com/heroui-inc/heroui/pull/5517) [`36eb421`](https://github.com/heroui-inc/heroui/commit/36eb421c66846d4fe6fb102c662ff6bf6149249b) Thanks [@wingkwong](https://github.com/wingkwong)! - sync with RA release (July 22, 2025)

- Updated dependencies [[`2f414a8`](https://github.com/heroui-inc/heroui/commit/2f414a8926854d0c936584be2269fdb454a3c4ec), [`139fc94`](https://github.com/heroui-inc/heroui/commit/139fc94e2ac0a4a112fdb18bb340994dc3656f70), [`36eb421`](https://github.com/heroui-inc/heroui/commit/36eb421c66846d4fe6fb102c662ff6bf6149249b), [`a83e3fb`](https://github.com/heroui-inc/heroui/commit/a83e3fb5a01c3ba25c309ee1f67b836c2f299dfb)]:
  - @heroui/theme@2.4.20
  - @heroui/system@2.4.20

## 2.1.23

### Patch Changes

- Updated dependencies [[`8ddc6e7`](https://github.com/heroui-inc/heroui/commit/8ddc6e795e56b7ecaac94bb0bbf99a7147dc027b)]:
  - @heroui/theme@2.4.19

## 2.1.22

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
  - @heroui/shared-utils@2.1.10
  - @heroui/system@2.4.19
  - @heroui/theme@2.4.18

## 2.1.22-beta.4

### Patch Changes

- [#5466](https://github.com/heroui-inc/heroui/pull/5466) [`87f8a12`](https://github.com/heroui-inc/heroui/commit/87f8a12c279e06cab23d0b60ae35c96ee6d29f32) Thanks [@wingkwong](https://github.com/wingkwong)! - add back RA deps (overlays & utils)

- Updated dependencies [[`87f8a12`](https://github.com/heroui-inc/heroui/commit/87f8a12c279e06cab23d0b60ae35c96ee6d29f32)]:
  - @heroui/shared-utils@2.1.10-beta.7
  - @heroui/system@2.4.19-beta.2
  - @heroui/theme@2.4.18-beta.7

## 2.1.22-beta.3

### Patch Changes

- Updated dependencies [[`7d23120`](https://github.com/heroui-inc/heroui/commit/7d23120f91e8af81b6fa3804a239a7807f1b45bf), [`2d76d32`](https://github.com/heroui-inc/heroui/commit/2d76d32e0b14f86d08e4d53617d11af46e069c9c)]:
  - @heroui/theme@2.4.18-beta.6

## 2.1.22-beta.2

### Patch Changes

- [`3275e8c`](https://github.com/heroui-inc/heroui/commit/3275e8ca01e65a207e6a431dd40b949a22c1f1f8) Thanks [@wingkwong](https://github.com/wingkwong)! - trigger beta release

- Updated dependencies [[`3275e8c`](https://github.com/heroui-inc/heroui/commit/3275e8ca01e65a207e6a431dd40b949a22c1f1f8)]:
  - @heroui/shared-utils@2.1.10-beta.6
  - @heroui/system@2.4.19-beta.1
  - @heroui/theme@2.4.18-beta.5

## 2.1.22-beta.1

### Patch Changes

- Updated dependencies [[`be697f7`](https://github.com/heroui-inc/heroui/commit/be697f77f5f6f8be439c72bd0e2155fd94eefeea), [`e1a0d9d`](https://github.com/heroui-inc/heroui/commit/e1a0d9d53d34cdb59a1aaf3f553f7d54fbf6f60d), [`bd5ad76`](https://github.com/heroui-inc/heroui/commit/bd5ad766115d64307b08faef7ce8401afe24cb46)]:
  - @heroui/theme@2.4.18-beta.4

## 2.1.22-beta.0

### Patch Changes

- [`1bca3f9`](https://github.com/heroui-inc/heroui/commit/1bca3f994655081f04714843047185aacdd481c0) Thanks [@wingkwong](https://github.com/wingkwong)! - sync 2.7.11 release

- Updated dependencies [[`f62f49c`](https://github.com/heroui-inc/heroui/commit/f62f49c096727133ecf38719115aa4cdbed25a13), [`6086ab0`](https://github.com/heroui-inc/heroui/commit/6086ab084abc4b44533dc71025a327ee46ea8948), [`ecffb26`](https://github.com/heroui-inc/heroui/commit/ecffb26320da15824356dbccb33d8627326a4b7c), [`1bca3f9`](https://github.com/heroui-inc/heroui/commit/1bca3f994655081f04714843047185aacdd481c0)]:
  - @heroui/theme@2.4.18-beta.3
  - @heroui/shared-utils@2.1.10-beta.5
  - @heroui/system@2.4.19-beta.0

## 2.1.21

### Patch Changes

- [#5374](https://github.com/heroui-inc/heroui/pull/5374) [`be6a1db`](https://github.com/heroui-inc/heroui/commit/be6a1dbf40507af164ebdbe085eda6cceb98aeed) Thanks [@wingkwong](https://github.com/wingkwong)! - bump system peer dependencies

- Updated dependencies [[`be6a1db`](https://github.com/heroui-inc/heroui/commit/be6a1dbf40507af164ebdbe085eda6cceb98aeed), [`7dff993`](https://github.com/heroui-inc/heroui/commit/7dff993e1d11e8f915d1e9c1201396e9b5b53dbf)]:
  - @heroui/system@2.4.18

## 2.1.20

### Patch Changes

- [#5361](https://github.com/heroui-inc/heroui/pull/5361) [`1e23994`](https://github.com/heroui-inc/heroui/commit/1e2399434578827987aedc8ff3cc9cf6ccc99c5f) Thanks [@wingkwong](https://github.com/wingkwong)! - bump RA versions

- [#5362](https://github.com/heroui-inc/heroui/pull/5362) [`0d217e4`](https://github.com/heroui-inc/heroui/commit/0d217e466f3af30c85edc7d53638e031c8458c56) Thanks [@wingkwong](https://github.com/wingkwong)! - consistent type imports

- [#5362](https://github.com/heroui-inc/heroui/pull/5362) [`0d217e4`](https://github.com/heroui-inc/heroui/commit/0d217e466f3af30c85edc7d53638e031c8458c56) Thanks [@wingkwong](https://github.com/wingkwong)! - remove unused dependencies

- Updated dependencies [[`ace931b`](https://github.com/heroui-inc/heroui/commit/ace931b44db98c227bd4a36bd26c4db8de7d5bf6), [`1e23994`](https://github.com/heroui-inc/heroui/commit/1e2399434578827987aedc8ff3cc9cf6ccc99c5f), [`ff4b1b2`](https://github.com/heroui-inc/heroui/commit/ff4b1b23936412fdb1c762434d673f7b6935ac51), [`0d217e4`](https://github.com/heroui-inc/heroui/commit/0d217e466f3af30c85edc7d53638e031c8458c56), [`0d217e4`](https://github.com/heroui-inc/heroui/commit/0d217e466f3af30c85edc7d53638e031c8458c56), [`0d217e4`](https://github.com/heroui-inc/heroui/commit/0d217e466f3af30c85edc7d53638e031c8458c56)]:
  - @heroui/theme@2.4.17
  - @heroui/system@2.4.17

## 2.1.19

### Patch Changes

- [#5310](https://github.com/heroui-inc/heroui/pull/5310) [`1d62208`](https://github.com/heroui-inc/heroui/commit/1d62208642d06f7896724b2702ecb5a17931eb88) Thanks [@wingkwong](https://github.com/wingkwong)! - bump RA versions

- Updated dependencies [[`ee4d2eb`](https://github.com/heroui-inc/heroui/commit/ee4d2ebe257319ce1dd14dd96b545f27bd92d56c), [`1d62208`](https://github.com/heroui-inc/heroui/commit/1d62208642d06f7896724b2702ecb5a17931eb88), [`06fe3a3`](https://github.com/heroui-inc/heroui/commit/06fe3a3c4e7f2fdfb5fcbb2255c907280c892de9)]:
  - @heroui/theme@2.4.16
  - @heroui/system@2.4.16

## 2.1.18

### Patch Changes

- [`b9e94a2`](https://github.com/heroui-inc/heroui/commit/b9e94a21518ba18447603680055c3a7dad8372bf) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - add default value for custom theme properties (#5194)

  v2.7.7

- Updated dependencies [[`b9e94a2`](https://github.com/heroui-inc/heroui/commit/b9e94a21518ba18447603680055c3a7dad8372bf)]:
  - @heroui/system@2.4.15
  - @heroui/theme@2.4.15
  - @heroui/react-utils@2.1.10
  - @heroui/shared-utils@2.1.9

## 2.1.17

### Patch Changes

- [#5186](https://github.com/heroui-inc/heroui/pull/5186) [`500ed77`](https://github.com/heroui-inc/heroui/commit/500ed771e25b08038fdc0d9401bfac31a2d68c3e) Thanks [@wingkwong](https://github.com/wingkwong)! - RA version bump (#5186)

- Updated dependencies [[`500ed77`](https://github.com/heroui-inc/heroui/commit/500ed771e25b08038fdc0d9401bfac31a2d68c3e), [`f223e1f`](https://github.com/heroui-inc/heroui/commit/f223e1ff634ee5c97e6e88e2d74ab002132fa19e), [`99a5bc2`](https://github.com/heroui-inc/heroui/commit/99a5bc2f4caa7d5468c629c30286935b5e5fa833)]:
  - @heroui/shared-utils@2.1.8
  - @heroui/system@2.4.14
  - @heroui/theme@2.4.14
  - @heroui/react-utils@2.1.9

## 2.1.16

### Patch Changes

- [#5060](https://github.com/heroui-inc/heroui/pull/5060) [`3944e1a`](https://github.com/heroui-inc/heroui/commit/3944e1af4ad58e45e49c4f54c3562474092505b1) Thanks [@wingkwong](https://github.com/wingkwong)! - RA version bump

- Updated dependencies [[`2420acf`](https://github.com/heroui-inc/heroui/commit/2420acfe24f21aeee172307baad1420f69dc704a), [`14fc373`](https://github.com/heroui-inc/heroui/commit/14fc373bd3ebe411e2692b543c368538a7b65aef), [`de2e47c`](https://github.com/heroui-inc/heroui/commit/de2e47c11a69bbd8c42e95de92cce85788dce0c9), [`3944e1a`](https://github.com/heroui-inc/heroui/commit/3944e1af4ad58e45e49c4f54c3562474092505b1), [`afdd892`](https://github.com/heroui-inc/heroui/commit/afdd892690f8ab166f3c5f35a1c1a3f2446831b8)]:
  - @heroui/theme@2.4.13
  - @heroui/system@2.4.13

## 2.1.15

### Patch Changes

- [#4998](https://github.com/heroui-inc/heroui/pull/4998) [`88f1641`](https://github.com/heroui-inc/heroui/commit/88f164116c2be75cd2de0a076f5ba0942a43e3de) Thanks [@wingkwong](https://github.com/wingkwong)! - bump RA versions

- Updated dependencies [[`e9c67fa`](https://github.com/heroui-inc/heroui/commit/e9c67fa6caf62fa835474d009b86cf722b08b66d), [`6f94545`](https://github.com/heroui-inc/heroui/commit/6f945458c8372949e80a1f5acc6c3047450d6b9d), [`88f1641`](https://github.com/heroui-inc/heroui/commit/88f164116c2be75cd2de0a076f5ba0942a43e3de)]:
  - @heroui/theme@2.4.12
  - @heroui/system@2.4.12

## 2.1.14

### Patch Changes

- v2.7.4

- Updated dependencies []:
  - @heroui/system@2.4.11
  - @heroui/theme@2.4.11
  - @heroui/react-utils@2.1.8
  - @heroui/shared-utils@2.1.7

## 2.1.13

### Patch Changes

- Updated dependencies [[`2774a1b`](https://github.com/heroui-inc/heroui/commit/2774a1b3513e2a046c538a2982a438f56608bbf2)]:
  - @heroui/theme@2.4.10

## 2.1.12

### Patch Changes

- Fix v2.7.0 release

- Updated dependencies []:
  - @heroui/shared-utils@2.1.6
  - @heroui/react-utils@2.1.7
  - @heroui/system@2.4.10
  - @heroui/theme@2.4.9

## 2.1.11

### Patch Changes

- Fix v2.7.0 release

- Updated dependencies []:
  - @heroui/system@2.4.9
  - @heroui/theme@2.4.8
  - @heroui/react-utils@2.1.6
  - @heroui/shared-utils@2.1.5

## 2.1.10

### Patch Changes

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
- Updated dependencies [[`f51d645`](https://github.com/heroui-inc/heroui/commit/f51d645d3d98ca2cc9ebcc89627959766fecc234), [`09241fa`](https://github.com/heroui-inc/heroui/commit/09241faa4b63765b7721ba9b473e3465b6d5e503), [`ccdc076`](https://github.com/heroui-inc/heroui/commit/ccdc07629f07110975cfb80a47c91263a61c0c49), [`4ff87ca`](https://github.com/heroui-inc/heroui/commit/4ff87ca7afccd2c3db0b145156a8357b2b51e7b5)]:
  - @heroui/theme@2.4.7
  - @heroui/system@2.4.8
  - @heroui/react-utils@2.1.5
  - @heroui/shared-utils@2.1.4

## 2.1.9

### Patch Changes

- [#4594](https://github.com/heroui-inc/heroui/pull/4594) [`7ebe0e6`](https://github.com/heroui-inc/heroui/commit/7ebe0e664feb777fe0cad311312d0e02b899319e) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Org name changed

- Updated dependencies [[`7ebe0e6`](https://github.com/heroui-inc/heroui/commit/7ebe0e664feb777fe0cad311312d0e02b899319e), [`f7e5d20`](https://github.com/heroui-inc/heroui/commit/f7e5d205b156060d2d06aa17af31007dbb9fc13c)]:
  - @heroui/shared-utils@2.1.3
  - @heroui/react-utils@2.1.4
  - @heroui/system@2.4.7
  - @heroui/theme@2.4.6

## 2.1.8

### Patch Changes

- Updated dependencies [[`a83388a`](https://github.com/heroui-inc/heroui/commit/a83388aaf4521f0ed8dfed99a54998156df1868b), [`e7ff673`](https://github.com/heroui-inc/heroui/commit/e7ff6730d7e891f1e9e3ca232b1faaebc5aedef2)]:
  - @heroui/theme@2.4.5
  - @heroui/react-utils@2.1.3
  - @heroui/system@2.4.6

## 2.1.7

### Patch Changes

- Updated dependencies [[`77206bc`](https://github.com/heroui-inc/heroui/commit/77206bc62596894d038b9715e40b361fec286c10), [`5f388fc`](https://github.com/heroui-inc/heroui/commit/5f388fc68c7db7f852432e73386686d919d44d31), [`afe0b52`](https://github.com/heroui-inc/heroui/commit/afe0b527ce2dcd1f511b601fcba700fd2d12fcd6), [`e15ef62`](https://github.com/heroui-inc/heroui/commit/e15ef62b6ccabc5aef2790c6f97d7457f204be92), [`e546124`](https://github.com/heroui-inc/heroui/commit/e546124e1de49e8bd4d8f5e33cba87a0e83435ef)]:
  - @heroui/shared-utils@2.1.2
  - @heroui/theme@2.4.4
  - @heroui/react-utils@2.1.2
  - @heroui/system@2.4.5

## 2.1.6

### Patch Changes

- Updated dependencies [[`5598806`](https://github.com/heroui-inc/heroui/commit/5598806216166dc9fff36cafd9112412486b747f)]:
  - @heroui/theme@2.4.3

## 2.1.5

### Patch Changes

- Updated dependencies [[`03abf1d`](https://github.com/heroui-inc/heroui/commit/03abf1daf4fe5ee74f4766cd4fd78068ac25ed78)]:
  - @heroui/theme@2.4.2

## 2.1.4

### Patch Changes

- [#4279](https://github.com/heroui-inc/heroui/pull/4279) [`b16291b`](https://github.com/heroui-inc/heroui/commit/b16291b2200229f0d0a9ea910e38f3f100f7931f) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Add ref support to Form component

- [#4258](https://github.com/heroui-inc/heroui/pull/4258) [`1031e98`](https://github.com/heroui-inc/heroui/commit/1031e985b71e69b8a7189ea049b9616257f820b3) Thanks [@wingkwong](https://github.com/wingkwong)! - sync with upstream RA versions

- Updated dependencies [[`1031e98`](https://github.com/heroui-inc/heroui/commit/1031e985b71e69b8a7189ea049b9616257f820b3), [`455556e`](https://github.com/heroui-inc/heroui/commit/455556e14278dd933b4acd1a136ea29879b49545)]:
  - @heroui/system@2.4.4

## 2.1.3

### Patch Changes

- [#4255](https://github.com/heroui-inc/heroui/pull/4255) [`6a94a12`](https://github.com/heroui-inc/heroui/commit/6a94a125d4836b0a18d9cd2cb521c85a6bfa9050) Thanks [@wingkwong](https://github.com/wingkwong)! - fixed incorrect peerDependencies for theme and system package (#4254)

- Updated dependencies []:
  - @heroui/system@2.4.3

## 2.1.2

### Patch Changes

- [#4247](https://github.com/heroui-inc/heroui/pull/4247) [`551ab18`](https://github.com/heroui-inc/heroui/commit/551ab184060b24b2c3a89598f84d4c18599649d0) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix peerDeps & core package client on export \*

- Updated dependencies []:
  - @heroui/system@2.4.2

## 2.1.1

### Patch Changes

- [`d6eee4a`](https://github.com/heroui-inc/heroui/commit/d6eee4a8767556152f47f06dcf04940951abc5af) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - v2.6.2

- Updated dependencies [[`d6eee4a`](https://github.com/heroui-inc/heroui/commit/d6eee4a8767556152f47f06dcf04940951abc5af)]:
  - @heroui/system@2.4.1
  - @heroui/theme@2.4.1
  - @heroui/react-utils@2.1.1
  - @heroui/shared-utils@2.1.1

## 2.1.0

### Minor Changes

- [`5786897`](https://github.com/heroui-inc/heroui/commit/5786897b9950d95c12351dacd2fb41bb1e298201) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - This release includes several improvements and bug fixes:

  - Updated react-aria version across all components
  - Improved Drawer styles and transitions
  - Fixed missing peer dependencies for framer-motion
  - Fixed menu item classNames functionality
  - Added isClearable prop to Textarea component
  - Fixed label placement issues in Input and Select components
  - Improved table keyboard navigation with new isKeyboardNavigationDisabled prop
  - Fixed UI sliding issues with helper wrapper in Input and Select
  - Updated use-image hook to avoid Next.js hydration issues
  - Replaced RTL-specific styles with logical properties
  - Fixed textarea label squish issue
  - Bumped tailwind-merge version
  - Applied tw nested group fixes
  - Fixed fullWidth variant in input and select components
  - Moved circular-progress tv to progress
  - Changed ListboxItem key to optional
  - Fixed autocomplete clear button behavior
  - Updated Select label placement logic
  - Added missing framer-motion peer dependencies
  - Removed layoutNode prop from Table due to react-aria update
  - Virtualization added to Autocomplete

### Patch Changes

- [#4224](https://github.com/heroui-inc/heroui/pull/4224) [`26e478d`](https://github.com/heroui-inc/heroui/commit/26e478dd937dedcaf41110171d971a8a3cf2ff52) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Added form support to input-otp, change default validationBehavior to "native" to avoid breaking changes, and fix select with form

- [#4226](https://github.com/heroui-inc/heroui/pull/4226) [`6c0213d`](https://github.com/heroui-inc/heroui/commit/6c0213dfc805aa3c793763c0b25f53b2b80c24dc) Thanks [@wingkwong](https://github.com/wingkwong)! - bump `@react-aria/utils` version (#4212)

- Updated dependencies [[`26e478d`](https://github.com/heroui-inc/heroui/commit/26e478dd937dedcaf41110171d971a8a3cf2ff52), [`44958bf`](https://github.com/heroui-inc/heroui/commit/44958bf91a1677becd5e9f3c420b7956cf0244d8), [`6c0213d`](https://github.com/heroui-inc/heroui/commit/6c0213dfc805aa3c793763c0b25f53b2b80c24dc), [`5786897`](https://github.com/heroui-inc/heroui/commit/5786897b9950d95c12351dacd2fb41bb1e298201), [`44958bf`](https://github.com/heroui-inc/heroui/commit/44958bf91a1677becd5e9f3c420b7956cf0244d8)]:
  - @heroui/system@2.4.0
  - @heroui/theme@2.4.0
  - @heroui/react-utils@2.1.0
  - @heroui/shared-utils@2.1.0

## 2.0.1-beta.1

### Patch Changes

- [`9869f2b91`](https://github.com/heroui-inc/heroui/commit/9869f2b91d0829f9c7f0500ba05745707820bf27) Thanks [@wingkwong](https://github.com/wingkwong)! - bump version

- Updated dependencies [[`9869f2b91`](https://github.com/heroui-inc/heroui/commit/9869f2b91d0829f9c7f0500ba05745707820bf27)]:
  - @heroui/react-utils@2.0.18-beta.8
  - @heroui/shared-utils@2.0.9-beta.8

## 2.0.1-beta.0

### Patch Changes

- [#3036](https://github.com/heroui-inc/heroui/pull/3036) [`eafdb7d47`](https://github.com/heroui-inc/heroui/commit/eafdb7d475a7fcaa7671af77e86fcdf62f14ae00) Thanks [@ryo-manba](https://github.com/ryo-manba)! - add form component
