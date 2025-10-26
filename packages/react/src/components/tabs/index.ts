import type {ComponentProps} from "react";

import {Tab, TabIndicator, TabList, TabListContainer, TabPanel, TabsRoot} from "./tabs";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Tabs = Object.assign(TabsRoot, {
  Root: TabsRoot,
  ListContainer: TabListContainer,
  List: TabList,
  Tab,
  Indicator: TabIndicator,
  Panel: TabPanel,
});

export type Tabs = {
  Props: ComponentProps<typeof TabsRoot>;
  RootProps: ComponentProps<typeof TabsRoot>;
  ListContainer: ComponentProps<typeof TabListContainer>;
  ListProps: ComponentProps<typeof TabList>;
  TabProps: ComponentProps<typeof Tab>;
  IndicatorProps: ComponentProps<typeof TabIndicator>;
  PanelProps: ComponentProps<typeof TabPanel>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {TabsRoot, TabListContainer, TabList, Tab, TabIndicator, TabPanel};

export type {
  TabsRootProps,
  TabsRootProps as TabsProps,
  TabListContainerProps,
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
