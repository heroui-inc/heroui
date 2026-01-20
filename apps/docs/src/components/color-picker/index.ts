// Main component
export {default as ColorPicker, default} from "./color-picker";

// Sub-components
export {ColorArea, ColorSlider} from "./components";

// Types
export type {
  Color,
  ColorAreaProps,
  ColorFormat,
  ColorPickerProps,
  ColorSliderProps,
  ColorSpace,
} from "./types";

// Utils (for external use if needed)
export {
  detectColorFormat,
  formatColor,
  normalizeColorSyntax,
  parseSafeDefaultValue,
  safeParseColor,
  validateColorInput,
} from "./utils";

// Constants (for external use if needed)
export {DEFAULT_COLOR, SWATCHES_PER_PAGE, defaultSwatches} from "./constants";

// Re-export parseColor from react-aria for convenience
export {parseColor} from "react-aria-components";
