/**
 * This is the base classNames for all elements.
 * Is meant to be used with the `addBase` method from tailwindcss.
 */
export const baseStyles = (prefix: string) => ({
  color: `hsl(var(--${prefix}-foreground))`,
  backgroundColor: `hsl(var(--${prefix}-background))`,
});

/**
 * focus classNames when the element is focused by keyboard.
 */
export const focusVisibleClasses = [
  "vg-focus-visible:z-10",
  "vg-focus-visible:outline-2",
  "vg-focus-visible:outline-focus",
  "vg-focus-visible:outline-offset-2",
];

export const dataFocusVisibleClasses = [
  "vg-outline-none",
  "vg-data-[focus-visible=true]:z-10",
  "vg-data-[focus-visible=true]:outline-2",
  "vg-data-[focus-visible=true]:outline-focus",
  "vg-data-[focus-visible=true]:outline-offset-2",
];

export const groupDataFocusVisibleClasses = [
  "vg-outline-none",
  "vg-group-data-[focus-visible=true]:z-10",
  "vg-group-data-[focus-visible=true]:ring-2",
  "vg-group-data-[focus-visible=true]:ring-focus",
  "vg-group-data-[focus-visible=true]:ring-offset-2",
  "vg-group-data-[focus-visible=true]:ring-offset-background",
];

export const ringClasses = [
  "vg-outline-none",
  "vg-ring-2",
  "vg-ring-focus",
  "vg-ring-offset-2",
  "vg-ring-offset-background",
];

/**
 * This classes centers the element by using absolute positioning.
 */
export const translateCenterClasses = [
  "vg-absolute",
  "vg-top-1/2",
  "vg-left-1/2",
  "vg--translate-x-1/2",
  "vg--translate-y-1/2",
];

export const absoluteFullClasses = ["vg-absolute", "vg-inset-0"];

/**
 * This object defines CSS classes for collapsing adjacent variant borders.
 * It includes classes for different variants like default, primary, secondary, etc.
 */
export const collapseAdjacentVariantBorders = {
  default: ["vg-[&+.border-medium.border-default]:ms-[calc(theme(borderWidth.medium)*-1)]"],
  primary: ["vg-[&+.border-medium.border-primary]:ms-[calc(theme(borderWidth.medium)*-1)]"],
  secondary: ["vg-[&+.border-medium.border-secondary]:ms-[calc(theme(borderWidth.medium)*-1)]"],
  success: ["vg-[&+.border-medium.border-success]:ms-[calc(theme(borderWidth.medium)*-1)]"],
  warning: ["vg-[&+.border-medium.border-warning]:ms-[calc(theme(borderWidth.medium)*-1)]"],
  danger: ["vg-[&+.border-medium.border-danger]:ms-[calc(theme(borderWidth.medium)*-1)]"],
};
