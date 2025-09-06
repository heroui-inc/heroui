import type {TabsRenderProps} from "react-aria-components";
import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const tabsVariants = tv({
  slots: {
    base: "tabs",
    tab: "tabs__tab",
    tabListWrapper: "tabs__list-wrapper",
    tabList: "tabs__list",
    tabPanel: "tabs__panel",
    tabsIndicator: "tabs__indicator",
  },
});

export type TabsVariants = Omit<VariantProps<typeof tabsVariants>, keyof TabsRenderProps>;
