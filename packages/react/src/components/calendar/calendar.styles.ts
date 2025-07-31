import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

import {disabledClasses, focusRingClasses} from "../../utils";

export const calendarVariants = tv({
  compoundSlots: [
    {
      class: [disabledClasses, "hover:bg-transparent"],
      isDisabled: true,
      slots: ["cellButton"],
    },
  ],
  defaultVariants: {
    isDisabled: false,
  },
  slots: {
    base: ["flex flex-col", "bg-panel rounded-xl", "shadow-lg", "p-4", "w-[280px]"],
    cell: ["relative", "p-0", "text-center", "focus-within:z-10"],
    cellButton: [
      "relative",
      "h-9 w-9",
      "rounded-lg",
      "text-sm",
      "font-medium",
      "transition-all duration-200",
      "outline-none",
      "cursor-interactive",
      "data-[hovered]:bg-default-hover",
      "data-[pressed]:scale-95",
      focusRingClasses,
    ],
    grid: ["w-full", "border-separate", "border-spacing-0"],
    gridHeader: [],
    header: ["flex items-center justify-between", "mb-4", "px-1"],
    headerCell: ["text-xs font-medium", "text-muted-foreground", "text-center", "pb-2", "h-8 w-9"],
    heading: ["text-lg font-semibold", "text-foreground", "tracking-[-0.36px]"],
    navButton: [
      "rounded-lg",
      "p-1.5",
      "transition-all duration-200",
      "hover:bg-default-hover",
      "text-foreground",
      "text-xl",
      "leading-none",
      "cursor-interactive",
      focusRingClasses,
    ],
  },
  variants: {
    isDisabled: {
      true: {
        base: disabledClasses,
        navButton: disabledClasses,
      },
    },
    isHovered: {
      true: {
        cellButton: ["bg-default-hover"],
      },
    },
    isOutsideMonth: {
      true: {
        cellButton: ["text-muted-foreground/30", "hover:bg-transparent"],
      },
    },
    isSelected: {
      true: {
        cellButton: [
          "bg-accent text-accent-foreground",
          "hover:bg-accent/90",
          "data-[hovered]:bg-accent/90",
        ],
      },
    },
    isUnavailable: {
      true: {
        cellButton: [
          "text-muted-foreground/50",
          "line-through",
          "cursor-not-allowed",
          "hover:bg-transparent",
        ],
      },
    },
    variant: {
      next: {},
      previous: {},
    },
  },
});

export type CalendarVariants = VariantProps<typeof calendarVariants>;
