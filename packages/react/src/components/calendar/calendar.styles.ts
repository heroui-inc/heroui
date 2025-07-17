import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

import {disabledClasses, focusRingClasses} from "../../utils";

export const calendarVariants = tv({
  slots: {
    base: ["flex flex-col", "bg-panel rounded-xl", "shadow-lg", "p-4", "w-[280px]"],
    header: ["flex items-center justify-between", "mb-4", "px-1"],
    heading: ["text-lg font-semibold", "text-foreground", "tracking-[-0.36px]"],
    navButton: [
      "rounded-lg",
      "p-1.5",
      "transition-all duration-200",
      "hover:bg-base-hover",
      "text-foreground",
      "text-xl",
      "leading-none",
      "cursor-interactive",
      focusRingClasses,
    ],
    grid: ["w-full", "border-separate", "border-spacing-0"],
    gridHeader: [],
    headerCell: ["text-xs font-medium", "text-muted-foreground", "text-center", "pb-2", "h-8 w-9"],
    cell: ["relative", "p-0", "text-center", "focus-within:z-10"],
    cellButton: [
      "group",
      "relative",
      "h-9 w-9",
      "rounded-lg",
      "text-sm",
      "font-medium",
      "transition-all duration-200",
      "outline-none",
      "cursor-interactive",
      "data-[hovered]:bg-base-hover",
      "data-[pressed]:scale-95",
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
    variant: {
      previous: {},
      next: {},
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
    isHovered: {
      true: {
        cellButton: ["bg-base-hover"],
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
    isOutsideMonth: {
      true: {
        cellButton: ["text-muted-foreground/30", "hover:bg-transparent"],
      },
    },
  },
  compoundSlots: [
    {
      slots: ["cellButton"],
      isDisabled: true,
      class: [disabledClasses, "hover:bg-transparent"],
    },
  ],
  defaultVariants: {
    isDisabled: false,
  },
});

export type CalendarVariants = VariantProps<typeof calendarVariants>;
