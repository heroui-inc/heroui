import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const tabsVariants = tv({
  slots: {
    base: "tabs",
    tab: "tabs__tab",
    tabIndicator: "tabs__indicator",
    tabList: "tabs__list",
    tabListContainer: "tabs__list-container",
    tabPanel: "tabs__panel",
  },
});

// Render props that should be excluded from TabsVariants (framework-specific)
type TabsRenderPropsKeys = "selectedKey";

export type TabsVariants = Omit<VariantProps<typeof tabsVariants>, TabsRenderPropsKeys>;
