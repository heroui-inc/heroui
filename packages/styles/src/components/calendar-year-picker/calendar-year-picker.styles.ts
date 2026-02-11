import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const calendarYearPickerVariants = tv({
  slots: {
    trigger: "calendar-year-picker__trigger",
    triggerIcon: "calendar-year-picker__trigger-icon",
    triggerText: "calendar-year-picker__trigger-text",
    yearCell: "calendar-year-picker__year-cell",
    yearGrid: "calendar-year-picker__year-grid",
  },
});

export type CalendarYearPickerVariants = VariantProps<typeof calendarYearPickerVariants>;
