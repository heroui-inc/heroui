import type {
  ColorPickerProps as AriaColorPickerProps,
  ColorSliderProps as AriaColorSliderProps,
  Color,
  ColorSpace,
} from "react-aria-components";

/* -------------------------------------------------------------------------------------------------
 * Color Format Types
 * -----------------------------------------------------------------------------------------------*/

export type ColorFormat = "hex" | "hsl" | "rgb" | "hsb" | "oklch";

/* -------------------------------------------------------------------------------------------------
 * Component Props
 * -----------------------------------------------------------------------------------------------*/

export interface ColorAreaProps {
  colorSpace?: ColorSpace;
  xChannel?: "hue" | "saturation" | "brightness" | "lightness" | "red" | "green" | "blue" | "alpha";
  yChannel?: "hue" | "saturation" | "brightness" | "lightness" | "red" | "green" | "blue" | "alpha";
  className?: string;
}

export interface ColorSliderProps extends Omit<AriaColorSliderProps, "children"> {
  trackBackground?: string;
  thumbBackground?: string;
}

export interface ColorSwatchesCarouselProps {
  /** Array of color swatches to display */
  swatches: string[];
  /** Initial color hex to determine starting page */
  initialColorHex?: string;
}

export interface ColorPickerProps extends Omit<AriaColorPickerProps, "children" | "onChange"> {
  /** Label for the trigger button */
  label?: string;
  /** Custom children for the popover content */
  children?: React.ReactNode;
  /** Show alpha slider */
  showAlpha?: boolean;
  /** Show hex/color field */
  showColorField?: boolean;
  /** Show color swatches */
  showSwatches?: boolean;
  /** Custom swatches array */
  swatches?: string[];
  /** Show shuffle/random button */
  showShuffle?: boolean;
  /** Custom trigger element */
  trigger?: React.ReactNode;
  /** Class name for popover content */
  popoverClassName?: string;
  /** Onchange callback */
  onChange?: (color: Color) => void;
}

/* -------------------------------------------------------------------------------------------------
 * Re-export Color type for convenience
 * -----------------------------------------------------------------------------------------------*/

export type {Color, ColorSpace};
