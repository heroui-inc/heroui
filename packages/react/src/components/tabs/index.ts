import type {ComponentProps} from "react";

import {Tab, TabIndicator, TabList, TabListWrapper, TabPanel, TabsRoot} from "./tabs";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Tabs = Object.assign(TabsRoot, {
  Root: TabsRoot,
  ListWrapper: TabListWrapper,
  List: TabList,
  Tab,
  Indicator: TabIndicator,
  Panel: TabPanel,
});

export type Tabs = {
  Props: ComponentProps<typeof TabsRoot>;
  RootProps: ComponentProps<typeof TabsRoot>;
  ListWrapperProps: ComponentProps<typeof TabListWrapper>;
  ListProps: ComponentProps<typeof TabList>;
  TabProps: ComponentProps<typeof Tab>;
  IndicatorProps: ComponentProps<typeof TabIndicator>;
  PanelProps: ComponentProps<typeof TabPanel>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {TabsRoot, TabListWrapper, TabList, Tab, TabIndicator, TabPanel};

export type {
  TabsRootProps,
  TabsRootProps as TabsProps,
  TabListWrapperProps,
  TabListProps,
  TabProps,
  TabIndicatorProps,
  TabPanelProps,
} from "./tabs";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {tabsVariants} from "./tabs.styles";

export type {TabsVariants} from "./tabs.styles";
