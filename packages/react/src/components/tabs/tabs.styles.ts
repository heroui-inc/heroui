import type {TabsRenderProps} from "react-aria-components";
import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const tabsVariants = tv({
  slots: {
    base: "tabs",
    tab: "tabs__tab",
    tabIndicator: "tabs__indicator",
    tabListContainer: "tabs__list-container",
    tabList: "tabs__list",
    tabPanel: "tabs__panel",
  },
});

export type TabsVariants = Omit<VariantProps<typeof tabsVariants>, keyof TabsRenderProps>;
