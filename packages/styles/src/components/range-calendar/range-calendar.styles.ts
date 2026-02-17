import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const rangeCalendarVariants = tv({
  defaultVariants: {},
  slots: {
    /** Root range calendar container */
    base: "range-calendar",
    /** Calendar cell (td) */
    cell: "range-calendar__cell",
    /** Cell indicator (small dot at bottom of cell) */
    cellIndicator: "range-calendar__cell-indicator",
    /** Calendar grid (table) */
    grid: "range-calendar__grid",
    /** Grid body (tbody) */
    gridBody: "range-calendar__grid-body",
    /** Grid header (thead) */
    gridHeader: "range-calendar__grid-header",
    /** Grid row (tr) */
    gridRow: "range-calendar__grid-row",
    /** Calendar header containing heading and navigation */
    header: "range-calendar__header",
    /** Header cell (th - day names) */
    headerCell: "range-calendar__header-cell",
    /** Month/year heading text */
    heading: "range-calendar__heading",
    /** Previous/Next navigation button */
    navButton: "range-calendar__nav-button",
    /** Navigation button icon */
    navButtonIcon: "range-calendar__nav-button-icon",
  },
  variants: {},
});

export type RangeCalendarVariants = VariantProps<typeof rangeCalendarVariants>;
