import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const calendarVariants = tv({
  defaultVariants: {},
  slots: {
    /** Root calendar container */
    base: "calendar",
    /** Calendar cell (td) */
    cell: "calendar__cell",
    /** Cell indicator (small dot at bottom of cell) */
    cellIndicator: "calendar__cell-indicator",
    /** Calendar grid (table) */
    grid: "calendar__grid",
    /** Grid body (tbody) */
    gridBody: "calendar__grid-body",
    /** Grid header (thead) */
    gridHeader: "calendar__grid-header",
    /** Grid row (tr) */
    gridRow: "calendar__grid-row",
    /** Calendar header containing heading and navigation */
    header: "calendar__header",
    /** Header cell (th - day names) */
    headerCell: "calendar__header-cell",
    /** Month/year heading text */
    heading: "calendar__heading",
    /** Previous/Next navigation button */
    navButton: "calendar__nav-button",
    /** Navigation button icon */
    navButtonIcon: "calendar__nav-button-icon",
  },
  variants: {},
});

// Render props that should be excluded from CalendarVariants (framework-specific)
type CalendarRenderPropsKeys =
  | "isDisabled"
  | "isFocused"
  | "isFocusVisible"
  | "isHovered"
  | "isInvalid"
  | "isOutsideMonth"
  | "isPressed"
  | "isSelected"
  | "isUnavailable";

export type CalendarVariants = Omit<VariantProps<typeof calendarVariants>, CalendarRenderPropsKeys>;
