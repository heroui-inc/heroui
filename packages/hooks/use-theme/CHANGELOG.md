# @heroui/use-theme

## 2.1.10

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

## 2.1.10-beta.7

### Patch Changes

- [`f527ad6`](https://github.com/heroui-inc/heroui/commit/f527ad685c31f7bbe1ac97cb41c8b07e45bbe95a) Thanks [@wingkwong](https://github.com/wingkwong)! - fix use-theme logic

## 2.1.10-beta.6

### Patch Changes

- [`4ea4d48`](https://github.com/heroui-inc/heroui/commit/4ea4d48e03d821d7f3e004e0180b8e6fc260e3f3) Thanks [@wingkwong](https://github.com/wingkwong)! - fix incorrect target theme (#5469)

## 2.1.10-beta.5

### Patch Changes

- [#5466](https://github.com/heroui-inc/heroui/pull/5466) [`87f8a12`](https://github.com/heroui-inc/heroui/commit/87f8a12c279e06cab23d0b60ae35c96ee6d29f32) Thanks [@wingkwong](https://github.com/wingkwong)! - add back RA deps (overlays & utils)

## 2.1.10-beta.4

### Patch Changes

- [`3275e8c`](https://github.com/heroui-inc/heroui/commit/3275e8ca01e65a207e6a431dd40b949a22c1f1f8) Thanks [@wingkwong](https://github.com/wingkwong)! - trigger beta release

## 2.1.10-beta.3

### Patch Changes

- [`1bca3f9`](https://github.com/heroui-inc/heroui/commit/1bca3f994655081f04714843047185aacdd481c0) Thanks [@wingkwong](https://github.com/wingkwong)! - sync 2.7.11 release

## 2.1.10-beta.2

### Patch Changes

- [#5401](https://github.com/heroui-inc/heroui/pull/5401) [`a2c4745`](https://github.com/heroui-inc/heroui/commit/a2c4745f078b2fe30890149d336b1a19a09d394d) Thanks [@wingkwong](https://github.com/wingkwong)! - remove `@heroui/aria-utils` dependency

## 2.1.10-beta.1

### Patch Changes

- [#5398](https://github.com/heroui-inc/heroui/pull/5398) [`9c3e4d9`](https://github.com/heroui-inc/heroui/commit/9c3e4d97377706162a5e3145a1429fdb2e5db3be) Thanks [@wingkwong](https://github.com/wingkwong)! - remove RA dependencies (overlays & utils)

## 2.1.10-beta.0

### Patch Changes

- [#5274](https://github.com/heroui-inc/heroui/pull/5274) [`a8ef824`](https://github.com/heroui-inc/heroui/commit/a8ef8241faf896ce980998e563d805fcf7132a7a) Thanks [@winchesHe](https://github.com/winchesHe)! - TailwindCSS v4

- [#5274](https://github.com/heroui-inc/heroui/pull/5274) [`a8ef824`](https://github.com/heroui-inc/heroui/commit/a8ef8241faf896ce980998e563d805fcf7132a7a) Thanks [@winchesHe](https://github.com/winchesHe)! - Fix skeleton animate

## 2.1.9

### Patch Changes

- [#5362](https://github.com/heroui-inc/heroui/pull/5362) [`0d217e4`](https://github.com/heroui-inc/heroui/commit/0d217e466f3af30c85edc7d53638e031c8458c56) Thanks [@wingkwong](https://github.com/wingkwong)! - consistent type imports

## 2.1.8

### Patch Changes

- [`b9e94a2`](https://github.com/heroui-inc/heroui/commit/b9e94a21518ba18447603680055c3a7dad8372bf) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - add default value for custom theme properties (#5194)

  v2.7.7

## 2.1.7

### Patch Changes

- [#5186](https://github.com/heroui-inc/heroui/pull/5186) [`500ed77`](https://github.com/heroui-inc/heroui/commit/500ed771e25b08038fdc0d9401bfac31a2d68c3e) Thanks [@wingkwong](https://github.com/wingkwong)! - RA version bump (#5186)

## 2.1.6

### Patch Changes

- v2.7.4

## 2.1.5

### Patch Changes

- Fix v2.7.0 release

## 2.1.4

### Patch Changes

- Fix v2.7.0 release

## 2.1.3

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

## 2.1.2

### Patch Changes

- [#4594](https://github.com/heroui-inc/heroui/pull/4594) [`7ebe0e6`](https://github.com/heroui-inc/heroui/commit/7ebe0e664feb777fe0cad311312d0e02b899319e) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Org name changed

## 2.1.1

### Patch Changes

- [`d6eee4a`](https://github.com/heroui-inc/heroui/commit/d6eee4a8767556152f47f06dcf04940951abc5af) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - v2.6.2

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

## 2.0.1-beta.7

### Patch Changes

- [`9869f2b91`](https://github.com/heroui-inc/heroui/commit/9869f2b91d0829f9c7f0500ba05745707820bf27) Thanks [@wingkwong](https://github.com/wingkwong)! - bump version

## 2.0.1-beta.6

### Patch Changes

- [#4092](https://github.com/heroui-inc/heroui/pull/4092) [`528668db8`](https://github.com/heroui-inc/heroui/commit/528668db85b98b46473cb1e214780b7468cdadba) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Test new runner

## 2.0.1-beta.5

### Patch Changes

- [#4086](https://github.com/heroui-inc/heroui/pull/4086) [`f69fe47b5`](https://github.com/heroui-inc/heroui/commit/f69fe47b5b8f6f3a77a7a8c20d8715263fa32acb) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Pnpm clean

## 2.0.1-beta.4

### Patch Changes

- [#4083](https://github.com/heroui-inc/heroui/pull/4083) [`35058262c`](https://github.com/heroui-inc/heroui/commit/35058262c61628fb42907f529c4417886aa12bb2) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix build

## 2.0.1-beta.3

### Patch Changes

- [#4010](https://github.com/heroui-inc/heroui/pull/4010) [`ef432eb53`](https://github.com/heroui-inc/heroui/commit/ef432eb539714fded6cab86a2185956fb103e0df) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - framer-motion alpha version added

## 2.0.1-beta.2

### Patch Changes

- [#4008](https://github.com/heroui-inc/heroui/pull/4008) [`7c1c0dd8f`](https://github.com/heroui-inc/heroui/commit/7c1c0dd8fef3ea72996c1095b919574c4b7f9b89) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - React 19 added to peerDeps

## 2.0.1-beta.1

### Patch Changes

- [#3990](https://github.com/heroui-inc/heroui/pull/3990) [`cb5bc4c74`](https://github.com/heroui-inc/heroui/commit/cb5bc4c74f00caaee80dca89c1f02038db315b85) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Beta 1

## 2.0.1-beta.0

### Patch Changes

- [#3169](https://github.com/heroui-inc/heroui/pull/3169) [`ad7e2615d`](https://github.com/heroui-inc/heroui/commit/ad7e2615d3cbc8044a8acc3a6adb35a653bdfbeb) Thanks [@wingkwong](https://github.com/wingkwong)! - introduce `use-theme` hook
