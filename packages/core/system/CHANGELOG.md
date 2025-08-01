# @heroui/system

## 2.4.20

### Patch Changes

- [#5517](https://github.com/heroui-inc/heroui/pull/5517) [`36eb421`](https://github.com/heroui-inc/heroui/commit/36eb421c66846d4fe6fb102c662ff6bf6149249b) Thanks [@wingkwong](https://github.com/wingkwong)! - sync with RA release (July 22, 2025)

- Updated dependencies [[`2f414a8`](https://github.com/heroui-inc/heroui/commit/2f414a8926854d0c936584be2269fdb454a3c4ec), [`139fc94`](https://github.com/heroui-inc/heroui/commit/139fc94e2ac0a4a112fdb18bb340994dc3656f70), [`36eb421`](https://github.com/heroui-inc/heroui/commit/36eb421c66846d4fe6fb102c662ff6bf6149249b)]:
  - @heroui/system-rsc@2.3.17

## 2.4.19

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
  - @heroui/react-utils@2.1.12
  - @heroui/system-rsc@2.3.16

## 2.4.19-beta.2

### Patch Changes

- [#5466](https://github.com/heroui-inc/heroui/pull/5466) [`87f8a12`](https://github.com/heroui-inc/heroui/commit/87f8a12c279e06cab23d0b60ae35c96ee6d29f32) Thanks [@wingkwong](https://github.com/wingkwong)! - add back RA deps (overlays & utils)

- Updated dependencies [[`87f8a12`](https://github.com/heroui-inc/heroui/commit/87f8a12c279e06cab23d0b60ae35c96ee6d29f32)]:
  - @heroui/react-utils@2.1.12-beta.5
  - @heroui/system-rsc@2.3.16-beta.5

## 2.4.19-beta.1

### Patch Changes

- [`3275e8c`](https://github.com/heroui-inc/heroui/commit/3275e8ca01e65a207e6a431dd40b949a22c1f1f8) Thanks [@wingkwong](https://github.com/wingkwong)! - trigger beta release

- Updated dependencies [[`3275e8c`](https://github.com/heroui-inc/heroui/commit/3275e8ca01e65a207e6a431dd40b949a22c1f1f8)]:
  - @heroui/react-utils@2.1.12-beta.4
  - @heroui/system-rsc@2.3.16-beta.4

## 2.4.19-beta.0

### Patch Changes

- [`1bca3f9`](https://github.com/heroui-inc/heroui/commit/1bca3f994655081f04714843047185aacdd481c0) Thanks [@wingkwong](https://github.com/wingkwong)! - sync 2.7.11 release

- Updated dependencies [[`1bca3f9`](https://github.com/heroui-inc/heroui/commit/1bca3f994655081f04714843047185aacdd481c0)]:
  - @heroui/react-utils@2.1.12-beta.3
  - @heroui/system-rsc@2.3.16-beta.3

## 2.4.18

### Patch Changes

- [#5374](https://github.com/heroui-inc/heroui/pull/5374) [`be6a1db`](https://github.com/heroui-inc/heroui/commit/be6a1dbf40507af164ebdbe085eda6cceb98aeed) Thanks [@wingkwong](https://github.com/wingkwong)! - remove `@interationalized/date` from system

- [#5382](https://github.com/heroui-inc/heroui/pull/5382) [`7dff993`](https://github.com/heroui-inc/heroui/commit/7dff993e1d11e8f915d1e9c1201396e9b5b53dbf) Thanks [@wingkwong](https://github.com/wingkwong)! - bump RA versions

## 2.4.17

### Patch Changes

- [#5361](https://github.com/heroui-inc/heroui/pull/5361) [`1e23994`](https://github.com/heroui-inc/heroui/commit/1e2399434578827987aedc8ff3cc9cf6ccc99c5f) Thanks [@wingkwong](https://github.com/wingkwong)! - bump RA versions

- [#5362](https://github.com/heroui-inc/heroui/pull/5362) [`0d217e4`](https://github.com/heroui-inc/heroui/commit/0d217e466f3af30c85edc7d53638e031c8458c56) Thanks [@wingkwong](https://github.com/wingkwong)! - consistent type imports

- [#5362](https://github.com/heroui-inc/heroui/pull/5362) [`0d217e4`](https://github.com/heroui-inc/heroui/commit/0d217e466f3af30c85edc7d53638e031c8458c56) Thanks [@wingkwong](https://github.com/wingkwong)! - remove unncessary dependencies

- [#5362](https://github.com/heroui-inc/heroui/pull/5362) [`0d217e4`](https://github.com/heroui-inc/heroui/commit/0d217e466f3af30c85edc7d53638e031c8458c56) Thanks [@wingkwong](https://github.com/wingkwong)! - remove unused dependencies

- Updated dependencies [[`1e23994`](https://github.com/heroui-inc/heroui/commit/1e2399434578827987aedc8ff3cc9cf6ccc99c5f), [`0d217e4`](https://github.com/heroui-inc/heroui/commit/0d217e466f3af30c85edc7d53638e031c8458c56)]:
  - @heroui/system-rsc@2.3.15
  - @heroui/react-utils@2.1.11

## 2.4.16

### Patch Changes

- [#5310](https://github.com/heroui-inc/heroui/pull/5310) [`1d62208`](https://github.com/heroui-inc/heroui/commit/1d62208642d06f7896724b2702ecb5a17931eb88) Thanks [@wingkwong](https://github.com/wingkwong)! - bump RA versions

- [#5287](https://github.com/heroui-inc/heroui/pull/5287) [`06fe3a3`](https://github.com/heroui-inc/heroui/commit/06fe3a3c4e7f2fdfb5fcbb2255c907280c892de9) Thanks [@wingkwong](https://github.com/wingkwong)! - bump framer-motion version

- Updated dependencies [[`1d62208`](https://github.com/heroui-inc/heroui/commit/1d62208642d06f7896724b2702ecb5a17931eb88)]:
  - @heroui/system-rsc@2.3.14

## 2.4.15

### Patch Changes

- [`b9e94a2`](https://github.com/heroui-inc/heroui/commit/b9e94a21518ba18447603680055c3a7dad8372bf) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - add default value for custom theme properties (#5194)

  v2.7.7

- Updated dependencies [[`b9e94a2`](https://github.com/heroui-inc/heroui/commit/b9e94a21518ba18447603680055c3a7dad8372bf)]:
  - @heroui/system-rsc@2.3.13
  - @heroui/react-utils@2.1.10

## 2.4.14

### Patch Changes

- [#5186](https://github.com/heroui-inc/heroui/pull/5186) [`500ed77`](https://github.com/heroui-inc/heroui/commit/500ed771e25b08038fdc0d9401bfac31a2d68c3e) Thanks [@wingkwong](https://github.com/wingkwong)! - RA version bump (#5186)

- Updated dependencies [[`500ed77`](https://github.com/heroui-inc/heroui/commit/500ed771e25b08038fdc0d9401bfac31a2d68c3e)]:
  - @heroui/system-rsc@2.3.12
  - @heroui/react-utils@2.1.9

## 2.4.13

### Patch Changes

- [#5060](https://github.com/heroui-inc/heroui/pull/5060) [`3944e1a`](https://github.com/heroui-inc/heroui/commit/3944e1af4ad58e45e49c4f54c3562474092505b1) Thanks [@wingkwong](https://github.com/wingkwong)! - RA version bump

- Updated dependencies []:
  - @heroui/system-rsc@2.3.11

## 2.4.12

### Patch Changes

- [#4998](https://github.com/heroui-inc/heroui/pull/4998) [`88f1641`](https://github.com/heroui-inc/heroui/commit/88f164116c2be75cd2de0a076f5ba0942a43e3de) Thanks [@wingkwong](https://github.com/wingkwong)! - bump RA versions

- Updated dependencies [[`88f1641`](https://github.com/heroui-inc/heroui/commit/88f164116c2be75cd2de0a076f5ba0942a43e3de)]:
  - @heroui/system-rsc@2.3.11

## 2.4.11

### Patch Changes

- v2.7.4

- Updated dependencies []:
  - @heroui/system-rsc@2.3.10
  - @heroui/react-utils@2.1.8

## 2.4.10

### Patch Changes

- Fix v2.7.0 release

- Updated dependencies []:
  - @heroui/react-utils@2.1.7
  - @heroui/system-rsc@2.3.9

## 2.4.9

### Patch Changes

- Fix v2.7.0 release

- Updated dependencies []:
  - @heroui/system-rsc@2.3.8
  - @heroui/react-utils@2.1.6

## 2.4.8

### Patch Changes

- [`ccdc076`](https://github.com/heroui-inc/heroui/commit/ccdc07629f07110975cfb80a47c91263a61c0c49) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Update spinner variants

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
  - @heroui/system-rsc@2.3.7
  - @heroui/react-utils@2.1.5

## 2.4.7

### Patch Changes

- [#4594](https://github.com/heroui-inc/heroui/pull/4594) [`7ebe0e6`](https://github.com/heroui-inc/heroui/commit/7ebe0e664feb777fe0cad311312d0e02b899319e) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Org name changed

- Updated dependencies [[`7ebe0e6`](https://github.com/heroui-inc/heroui/commit/7ebe0e664feb777fe0cad311312d0e02b899319e)]:
  - @heroui/react-utils@2.1.4
  - @heroui/system-rsc@2.3.6

## 2.4.6

### Patch Changes

- Updated dependencies [[`e7ff673`](https://github.com/heroui-inc/heroui/commit/e7ff6730d7e891f1e9e3ca232b1faaebc5aedef2)]:
  - @heroui/react-utils@2.1.3
  - @heroui/system-rsc@2.3.5

## 2.4.5

### Patch Changes

- Updated dependencies [[`76a72a9`](https://github.com/heroui-inc/heroui/commit/76a72a9d1c8400d23b3f948670cb6844d9728b2a)]:
  - @heroui/system-rsc@2.3.5
  - @heroui/react-utils@2.1.2

## 2.4.4

### Patch Changes

- [#4258](https://github.com/heroui-inc/heroui/pull/4258) [`1031e98`](https://github.com/heroui-inc/heroui/commit/1031e985b71e69b8a7189ea049b9616257f820b3) Thanks [@wingkwong](https://github.com/wingkwong)! - sync with upstream RA versions

- [#4264](https://github.com/heroui-inc/heroui/pull/4264) [`455556e`](https://github.com/heroui-inc/heroui/commit/455556e14278dd933b4acd1a136ea29879b49545) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix, mising react-types package added to the system package

- Updated dependencies [[`1031e98`](https://github.com/heroui-inc/heroui/commit/1031e985b71e69b8a7189ea049b9616257f820b3)]:
  - @heroui/system-rsc@2.3.4

## 2.4.3

### Patch Changes

- Updated dependencies [[`6a94a12`](https://github.com/heroui-inc/heroui/commit/6a94a125d4836b0a18d9cd2cb521c85a6bfa9050)]:
  - @heroui/system-rsc@2.3.3

## 2.4.2

### Patch Changes

- Updated dependencies [[`551ab18`](https://github.com/heroui-inc/heroui/commit/551ab184060b24b2c3a89598f84d4c18599649d0)]:
  - @heroui/system-rsc@2.3.2

## 2.4.1

### Patch Changes

- [`d6eee4a`](https://github.com/heroui-inc/heroui/commit/d6eee4a8767556152f47f06dcf04940951abc5af) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - v2.6.2

- Updated dependencies [[`d6eee4a`](https://github.com/heroui-inc/heroui/commit/d6eee4a8767556152f47f06dcf04940951abc5af)]:
  - @heroui/system-rsc@2.3.1
  - @heroui/react-utils@2.1.1

## 2.4.0

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

- Updated dependencies [[`5786897`](https://github.com/heroui-inc/heroui/commit/5786897b9950d95c12351dacd2fb41bb1e298201)]:
  - @heroui/system-rsc@2.3.0
  - @heroui/react-utils@2.1.0

## 2.3.0-beta.11

### Patch Changes

- [#4163](https://github.com/heroui-inc/heroui/pull/4163) [`c8f2ec887`](https://github.com/heroui-inc/heroui/commit/c8f2ec88752289913968331032b9e7f772c12ec4) Thanks [@wingkwong](https://github.com/wingkwong)! - align `navigate` function parameters with `@react-aria`

- Updated dependencies []:
  - @heroui/system-rsc@2.2.0-beta.8

## 2.3.0-beta.10

### Patch Changes

- [`9869f2b91`](https://github.com/heroui-inc/heroui/commit/9869f2b91d0829f9c7f0500ba05745707820bf27) Thanks [@wingkwong](https://github.com/wingkwong)! - bump version

- Updated dependencies [[`9869f2b91`](https://github.com/heroui-inc/heroui/commit/9869f2b91d0829f9c7f0500ba05745707820bf27)]:
  - @heroui/system-rsc@2.2.0-beta.8
  - @heroui/react-utils@2.0.18-beta.8

## 2.3.0-beta.9

### Patch Changes

- [#3036](https://github.com/heroui-inc/heroui/pull/3036) [`eafdb7d47`](https://github.com/heroui-inc/heroui/commit/eafdb7d475a7fcaa7671af77e86fcdf62f14ae00) Thanks [@ryo-manba](https://github.com/ryo-manba)! - update react-aria version

- Updated dependencies [[`eafdb7d47`](https://github.com/heroui-inc/heroui/commit/eafdb7d475a7fcaa7671af77e86fcdf62f14ae00)]:
  - @heroui/system-rsc@2.2.0-beta.7

## 2.3.0-beta.8

### Patch Changes

- [#3470](https://github.com/heroui-inc/heroui/pull/3470) [`4607fe2ff`](https://github.com/heroui-inc/heroui/commit/4607fe2ff448a536496c2b59ccdfcb217379b6ed) Thanks [@ryo-manba](https://github.com/ryo-manba)! - Add reducedMotion setting to Provider (#3395)

## 2.3.0-beta.7

### Patch Changes

- [#4092](https://github.com/heroui-inc/heroui/pull/4092) [`528668db8`](https://github.com/heroui-inc/heroui/commit/528668db85b98b46473cb1e214780b7468cdadba) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Test new runner

- Updated dependencies [[`528668db8`](https://github.com/heroui-inc/heroui/commit/528668db85b98b46473cb1e214780b7468cdadba)]:
  - @heroui/system-rsc@2.2.0-beta.6
  - @heroui/react-utils@2.0.18-beta.7

## 2.3.0-beta.6

### Patch Changes

- [#4086](https://github.com/heroui-inc/heroui/pull/4086) [`f69fe47b5`](https://github.com/heroui-inc/heroui/commit/f69fe47b5b8f6f3a77a7a8c20d8715263fa32acb) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Pnpm clean

- Updated dependencies [[`f69fe47b5`](https://github.com/heroui-inc/heroui/commit/f69fe47b5b8f6f3a77a7a8c20d8715263fa32acb)]:
  - @heroui/system-rsc@2.2.0-beta.5
  - @heroui/react-utils@2.0.18-beta.6

## 2.3.0-beta.5

### Patch Changes

- [#4083](https://github.com/heroui-inc/heroui/pull/4083) [`35058262c`](https://github.com/heroui-inc/heroui/commit/35058262c61628fb42907f529c4417886aa12bb2) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix build

- Updated dependencies [[`35058262c`](https://github.com/heroui-inc/heroui/commit/35058262c61628fb42907f529c4417886aa12bb2)]:
  - @heroui/system-rsc@2.2.0-beta.4
  - @heroui/react-utils@2.0.18-beta.5

## 2.3.0-beta.4

### Patch Changes

- Updated dependencies []:
  - @heroui/system-rsc@2.2.0-beta.3
  - @heroui/react-utils@2.0.18-beta.4

## 2.3.0-beta.3

### Patch Changes

- [#4010](https://github.com/heroui-inc/heroui/pull/4010) [`ef432eb53`](https://github.com/heroui-inc/heroui/commit/ef432eb539714fded6cab86a2185956fb103e0df) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - framer-motion alpha version added

- Updated dependencies [[`ef432eb53`](https://github.com/heroui-inc/heroui/commit/ef432eb539714fded6cab86a2185956fb103e0df)]:
  - @heroui/system-rsc@2.2.0-beta.3
  - @heroui/react-utils@2.0.18-beta.3

## 2.3.0-beta.2

### Patch Changes

- [#4008](https://github.com/heroui-inc/heroui/pull/4008) [`7c1c0dd8f`](https://github.com/heroui-inc/heroui/commit/7c1c0dd8fef3ea72996c1095b919574c4b7f9b89) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - React 19 added to peerDeps

- Updated dependencies [[`7c1c0dd8f`](https://github.com/heroui-inc/heroui/commit/7c1c0dd8fef3ea72996c1095b919574c4b7f9b89)]:
  - @heroui/system-rsc@2.2.0-beta.2
  - @heroui/react-utils@2.0.18-beta.2

## 2.3.0-beta.1

### Patch Changes

- [#3990](https://github.com/heroui-inc/heroui/pull/3990) [`cb5bc4c74`](https://github.com/heroui-inc/heroui/commit/cb5bc4c74f00caaee80dca89c1f02038db315b85) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Beta 1

- Updated dependencies [[`cb5bc4c74`](https://github.com/heroui-inc/heroui/commit/cb5bc4c74f00caaee80dca89c1f02038db315b85)]:
  - @heroui/system-rsc@2.2.0-beta.1
  - @heroui/react-utils@2.0.18-beta.1

## 2.3.0-beta.0

### Minor Changes

- [#3732](https://github.com/heroui-inc/heroui/pull/3732) [`67ea2f65e`](https://github.com/heroui-inc/heroui/commit/67ea2f65e17f913bdffae4690586a6ae202c8f7d) Thanks [@ryo-manba](https://github.com/ryo-manba)! - update react-aria version

### Patch Changes

- [#3523](https://github.com/heroui-inc/heroui/pull/3523) [`3f0d81b56`](https://github.com/heroui-inc/heroui/commit/3f0d81b560e7ef3eb315bd98407249c0eb4ed5eb) Thanks [@wingkwong](https://github.com/wingkwong)! - update `framer-motion` versions

- Updated dependencies [[`67ea2f65e`](https://github.com/heroui-inc/heroui/commit/67ea2f65e17f913bdffae4690586a6ae202c8f7d)]:
  - @heroui/system-rsc@2.2.0-beta.0
  - @heroui/react-utils@2.0.18-beta.0

## 2.2.6

### Patch Changes

- [#2943](https://github.com/heroui-inc/heroui/pull/2943) [`4ac7674d1`](https://github.com/heroui-inc/heroui/commit/4ac7674d1ec8ed60925412fe1bd1f01ee9f1555a) Thanks [@wingkwong](https://github.com/wingkwong)! - Fix missing `useHref` logic (#2934)

- Updated dependencies [[`44e89a077`](https://github.com/heroui-inc/heroui/commit/44e89a0779c1c98fe275c864fe12834d19302b9c)]:
  - @heroui/system-rsc@2.1.6
  - @heroui/react-utils@2.0.17

## 2.2.5

### Patch Changes

- [#3512](https://github.com/heroui-inc/heroui/pull/3512) [`2d2d300a1`](https://github.com/heroui-inc/heroui/commit/2d2d300a12dbe20ca7ebd125daf3dce74efcbf34) Thanks [@wingkwong](https://github.com/wingkwong)! - fix conflicting versions in npm

- Updated dependencies [[`2d2d300a1`](https://github.com/heroui-inc/heroui/commit/2d2d300a12dbe20ca7ebd125daf3dce74efcbf34)]:
  - @heroui/system-rsc@2.1.5
  - @heroui/react-utils@2.0.16

## 2.2.4

### Patch Changes

- Updated dependencies [[`5591138bf`](https://github.com/heroui-inc/heroui/commit/5591138bff4a393f614c4cb0d505901560c4ceea)]:
  - @heroui/system-rsc@2.1.4

## 2.2.3

### Patch Changes

- [#3331](https://github.com/heroui-inc/heroui/pull/3331) [`f5d94f96e`](https://github.com/heroui-inc/heroui/commit/f5d94f96e4cffed1d4aeef971c89f8d283effd49) Thanks [@wingkwong](https://github.com/wingkwong)! - Fixed incorrect year in `showMonthAndYearPickers` with different locales

- Updated dependencies [[`0cdfdb48b`](https://github.com/heroui-inc/heroui/commit/0cdfdb48bcb7eecb752fc6a3033d3bdd2335872b), [`f785d1fb0`](https://github.com/heroui-inc/heroui/commit/f785d1fb0460df73912bcd6614bc78d46db14e6b)]:
  - @heroui/system-rsc@2.1.3
  - @heroui/react-utils@2.0.15

## 2.2.2

### Patch Changes

- [#3240](https://github.com/heroui-inc/heroui/pull/3240) [`47c2472fb`](https://github.com/heroui-inc/heroui/commit/47c2472fb22bfe1c0c357b5ba12e5606eba0d65b) Thanks [@wingkwong](https://github.com/wingkwong)! - bump react-aria dependencies

- Updated dependencies [[`b9bb06ff3`](https://github.com/heroui-inc/heroui/commit/b9bb06ff37f99bfc438e848706ec79b4c7b7c5d3)]:
  - @heroui/react-utils@2.0.14
  - @heroui/system-rsc@2.1.2

## 2.2.1

### Patch Changes

- [#3119](https://github.com/heroui-inc/heroui/pull/3119) [`685995a12`](https://github.com/heroui-inc/heroui/commit/685995a125cc3db26c6adb67ed9f7245b87e792a) Thanks [@wingkwong](https://github.com/wingkwong)! - bump `@react-aria/utils` version to `3.24.1` and bump `@react-types/shared` to `3.23.1`

- [#3119](https://github.com/heroui-inc/heroui/pull/3119) [`685995a12`](https://github.com/heroui-inc/heroui/commit/685995a125cc3db26c6adb67ed9f7245b87e792a) Thanks [@wingkwong](https://github.com/wingkwong)! - Fixed listbox href issue (#3105)

- Updated dependencies []:
  - @heroui/system-rsc@2.1.2

## 2.2.0

### Minor Changes

- [#2987](https://github.com/heroui-inc/heroui/pull/2987) [`540aa2124`](https://github.com/heroui-inc/heroui/commit/540aa2124b45b65a40e73f5aea2b90405fe1fe9a) Thanks [@ryo-manba](https://github.com/ryo-manba)! - Change validationBehavior from native to aria by default, with the option to change via props.

### Patch Changes

- [#2915](https://github.com/heroui-inc/heroui/pull/2915) [`e3afa4789`](https://github.com/heroui-inc/heroui/commit/e3afa4789a1ac0fa929b2acaca5bd9c520567ab8) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - The `cn` utility was moved the `theme` package and updated to support NextUI custom classes.

- [#2929](https://github.com/heroui-inc/heroui/pull/2929) [`422770cc6`](https://github.com/heroui-inc/heroui/commit/422770cc6bcdd1d4c51257654ab718f3c19d6cb2) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Add support for disabling the animations globally.

- Updated dependencies [[`e3afa4789`](https://github.com/heroui-inc/heroui/commit/e3afa4789a1ac0fa929b2acaca5bd9c520567ab8), [`1109baea6`](https://github.com/heroui-inc/heroui/commit/1109baea6ac6aa3feb2be90ef065f61b2c2a06a9)]:
  - @heroui/system-rsc@2.1.2

## 2.1.2

### Patch Changes

- [#2789](https://github.com/heroui-inc/heroui/pull/2789) [`eccc2f2f3`](https://github.com/heroui-inc/heroui/commit/eccc2f2f3d856eefb2cc7c07b94e1c4cefd4d7d0) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix #2749 Introduced named exports for several UI-related packages to enhance modularity and usability in Next.js projects.

- Updated dependencies [[`eccc2f2f3`](https://github.com/heroui-inc/heroui/commit/eccc2f2f3d856eefb2cc7c07b94e1c4cefd4d7d0)]:
  - @heroui/react-utils@2.0.13
  - @heroui/system-rsc@2.1.1

## 2.1.1

### Patch Changes

- [#2758](https://github.com/heroui-inc/heroui/pull/2758) [`74eda3128`](https://github.com/heroui-inc/heroui/commit/74eda312883b2e17df26f71442aba9fb3cd240be) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Named exports for rsc packages, "use client;" directive added to "@heroui/react" package

- Updated dependencies [[`74eda3128`](https://github.com/heroui-inc/heroui/commit/74eda312883b2e17df26f71442aba9fb3cd240be)]:
  - @heroui/system-rsc@2.1.1
  - @heroui/react-utils@2.0.12

## 2.1.0

### Minor Changes

- [#2618](https://github.com/heroui-inc/heroui/pull/2618) [`dc0bcf13a`](https://github.com/heroui-inc/heroui/commit/dc0bcf13a5e9aa0450938bcca47cd4c696066f14) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - v2.3.0

### Patch Changes

- [#2618](https://github.com/heroui-inc/heroui/pull/2618) [`dc0bcf13a`](https://github.com/heroui-inc/heroui/commit/dc0bcf13a5e9aa0450938bcca47cd4c696066f14) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - - Calendar component added
  - objectToDeps function applied all across components
  - `useMeasure` hook added
  - `useIntersectionObserver` hook added
  - `framer-transitions` renamed to `framer-utils`
  - `ResizablePanel` component added to `framer-utils`
  - `test-utils` updated
- Updated dependencies [[`dc0bcf13a`](https://github.com/heroui-inc/heroui/commit/dc0bcf13a5e9aa0450938bcca47cd4c696066f14), [`dc0bcf13a`](https://github.com/heroui-inc/heroui/commit/dc0bcf13a5e9aa0450938bcca47cd4c696066f14), [`c5049edfd`](https://github.com/heroui-inc/heroui/commit/c5049edfde7edaee2081d70e581739be9dcae2f9)]:
  - @heroui/system-rsc@2.1.0
  - @heroui/react-utils@2.0.11

## 2.0.15

### Patch Changes

- Updated dependencies [[`a978687b0`](https://github.com/heroui-inc/heroui/commit/a978687b0736d1e15943ef46628fc4fa0723ddc7)]:
  - @heroui/system-rsc@2.0.11

## 2.0.14

### Patch Changes

- Updated dependencies [[`6ecdc278a`](https://github.com/heroui-inc/heroui/commit/6ecdc278aba927ee38a799679b8eb99cba99cab9)]:
  - @heroui/system-rsc@2.0.10

## 2.0.13

### Patch Changes

- Updated dependencies [[`44ed1056e`](https://github.com/heroui-inc/heroui/commit/44ed1056e717c56633f60cf289f78e9c7b83b648)]:
  - @heroui/system-rsc@2.0.9

## 2.0.12

### Patch Changes

- Updated dependencies [[`38af48faf`](https://github.com/heroui-inc/heroui/commit/38af48faf5b62d2f81f2402f3d83d78991eb46e0)]:
  - @heroui/system-rsc@2.0.8

## 2.0.11

### Patch Changes

- [`25e86fb41`](https://github.com/heroui-inc/heroui/commit/25e86fb41770d3cdae6dfdb79306b78fa02d8187) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - New version v2.2.0

- Updated dependencies [[`25e86fb41`](https://github.com/heroui-inc/heroui/commit/25e86fb41770d3cdae6dfdb79306b78fa02d8187)]:
  - @heroui/system-rsc@2.0.7

## 2.0.10

### Patch Changes

- Updated dependencies [[`f6531c5f6`](https://github.com/heroui-inc/heroui/commit/f6531c5f603d7f6308a597962ec6fab62c92fa93)]:
  - @heroui/system-rsc@2.0.6

## 2.0.9

### Patch Changes

- [#1600](https://github.com/heroui-inc/heroui/pull/1600) [`b1b30b797`](https://github.com/heroui-inc/heroui/commit/b1b30b7976f1d6652808fbf12ffde044f0861572) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix npm deploy

- Updated dependencies [[`b1b30b797`](https://github.com/heroui-inc/heroui/commit/b1b30b7976f1d6652808fbf12ffde044f0861572)]:
  - @heroui/system-rsc@2.0.5

## 2.0.8

### Patch Changes

- [#1589](https://github.com/heroui-inc/heroui/pull/1589) [`1612532ee`](https://github.com/heroui-inc/heroui/commit/1612532eeeabbc49165546b1a2e7aebf89e7a1c2) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - React aria packages upgraded

- Updated dependencies []:
  - @heroui/system-rsc@2.0.4

## 2.0.7

### Patch Changes

- Updated dependencies [[`d61428d9e`](https://github.com/heroui-inc/heroui/commit/d61428d9e6c1c0590593fb1f0136e226051b7e23)]:
  - @heroui/system-rsc@2.0.4

## 2.0.6

### Patch Changes

- [#1513](https://github.com/heroui-inc/heroui/pull/1513) [`641bf0885`](https://github.com/heroui-inc/heroui/commit/641bf0885b6af2d7f36f27d83716a441975a5ca5) Thanks [@tianenpang](https://github.com/tianenpang)! - Extend props for NextUIProvider and update default locale from en to en-US.

- Updated dependencies []:
  - @heroui/system-rsc@2.0.3

## 2.0.5

### Patch Changes

- [#1359](https://github.com/heroui-inc/heroui/pull/1359) [`a30cec48`](https://github.com/heroui-inc/heroui/commit/a30cec4810988fb1962f3a61e0fc0362de08b171) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - \n

  - react-aria packages upgraded to the latest version
  - image storybooks fixed
  - other bug fixes..

## 2.0.4

### Patch Changes

- [#1350](https://github.com/heroui-inc/heroui/pull/1350) [`710395f3`](https://github.com/heroui-inc/heroui/commit/710395f3a2ca44238332237a49e948c933abe63d) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Needless exports removed from system pkg

## 2.0.3

### Patch Changes

- [#1289](https://github.com/heroui-inc/heroui/pull/1289) [`eefda8d6`](https://github.com/heroui-inc/heroui/commit/eefda8d6e2088526e0dbb2026d807b53d2a97782) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - - "use client" directive removed from components that didn't need it

  - packages adapted to support RSC imports
  - filterDomProps function was modified to enable/disabled it

- [`e3e13a09`](https://github.com/heroui-inc/heroui/commit/e3e13a095f2347ff279c85e6a5d3798f36c6533f) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - New package created to exports system RSC-compatible functions
  Component exports changed to named exports
- Updated dependencies [[`e3e13a09`](https://github.com/heroui-inc/heroui/commit/e3e13a095f2347ff279c85e6a5d3798f36c6533f)]:
  - @heroui/system-rsc@2.0.3

## 2.0.2

### Patch Changes

- Updated dependencies [[`459ac5ed`](https://github.com/heroui-inc/heroui/commit/459ac5ed4537942517803ba14129226a791d6feb)]:
  - @heroui/theme@2.0.2

## 2.0.1

### Patch Changes

- [`e940ec06`](https://github.com/heroui-inc/heroui/commit/e940ec06ac5e46340d5956fb7c455a6ab3de3140) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Introducing NextUI v2.0

- [`e940ec06`](https://github.com/heroui-inc/heroui/commit/e940ec06ac5e46340d5956fb7c455a6ab3de3140) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Introducing v2 - Readmes updated

- Updated dependencies [[`e940ec06`](https://github.com/heroui-inc/heroui/commit/e940ec06ac5e46340d5956fb7c455a6ab3de3140), [`e940ec06`](https://github.com/heroui-inc/heroui/commit/e940ec06ac5e46340d5956fb7c455a6ab3de3140)]:
  - @heroui/theme@2.0.1
