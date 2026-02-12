import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const calendarYearPickerVariants = tv({
  slots: {
    trigger: "calendar-year-picker__trigger",
    triggerHeading: "calendar-year-picker__trigger-heading",
    triggerIndicator: "calendar-year-picker__trigger-indicator",
    yearCell: "calendar-year-picker__year-cell",
    yearGrid: "calendar-year-picker__year-grid",
  },
});

export type CalendarYearPickerVariants = VariantProps<typeof calendarYearPickerVariants>;
