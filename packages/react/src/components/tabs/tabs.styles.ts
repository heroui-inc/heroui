import type {TabsRenderProps} from "react-aria-components";
import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

import {focusRingClasses} from "../../utils/compose";

export const tabsVariants = tv({
  defaultVariants: {
    variant: "default",
  },
  slots: {
    base: [
      "flex gap-4",
      "data-[orientation=horizontal]:flex-col",
      "data-[orientation=vertical]:flex-row",
    ],
    tab: [
      // Base styles
      "relative h-7 cursor-default outline-none",
      // Orientation styles
      "group-data-[orientation=horizontal]:px-3 group-data-[orientation=horizontal]:py-1",
      "group-data-[orientation=vertical]:px-4 group-data-[orientation=vertical]:py-2",
      // Disabled state
      "data-[disabled=true]:opacity-disabled",
      "data-[disabled=true]:cursor-not-allowed",
      // Focus state
      focusRingClasses,
    ],
    tabList: [
      "group inline-flex",
      // Horizontal styles
      "data-[orientation=horizontal]:w-full data-[orientation=horizontal]:flex-row",
      // Vertical styles
      "data-[orientation=vertical]:flex-col",
    ],
    tabPanel: [
      "outline-none",
      // Orientation styles
      "data-[orientation=horizontal]:mt-4",
      "data-[orientation=vertical]:ml-4",
      "bg-surface rounded-lg p-4",
      focusRingClasses,
      "data-[focus-visible]:rounded",
    ],
  },
  variants: {
    variant: {
      default: {
        tab: [
          // Base styles
          "w-full rounded-md text-center",
          "hover:opacity-70 data-[selected=true]:hover:opacity-100",
          // Selected state
          "data-[selected=true]:bg-background data-[selected=true]:text-foreground data-[selected=true]:shadow-border",
        ],
        tabList: "bg-surface text-surface-foreground/70 rounded-lg p-1",
      },
      line: {
        tab: "data-[selected=true]:bg-surface rounded-md bg-transparent",
        tabList: [
          "bg-surface2 rounded-lg p-1",
          "data-[orientation=horizontal]:border-b",
          "data-[orientation=vertical]:border-r",
        ],
        tabPanel: "bg-transparent p-0",
      },
    },
  },
});

export type TabsVariants = Omit<VariantProps<typeof tabsVariants>, keyof TabsRenderProps>;
