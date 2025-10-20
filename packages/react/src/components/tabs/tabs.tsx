"use client";

import type {TabsVariants} from "./tabs.styles";
import type {
  TabListProps as TabListPrimitiveProps,
  TabPanelProps as TabPanelPrimitiveProps,
  TabProps as TabPrimitiveProps,
  TabsProps as TabsPrimitiveProps,
} from "react-aria-components";

import React, {createContext, useContext} from "react";
import {
  SelectionIndicator as SelectionIndicatorPrimitive,
  TabList as TabListPrimitive,
  TabPanel as TabPanelPrimitive,
  Tab as TabPrimitive,
  Tabs as TabsPrimitive,
} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";

import {tabsVariants} from "./tabs.styles";

const TabsContext = createContext<{
  slots?: ReturnType<typeof tabsVariants>;
  orientation?: "horizontal" | "vertical";
}>({});

/* -------------------------------------------------------------------------------------------------
 * Tabs
 * -----------------------------------------------------------------------------------------------*/

interface TabsProps extends TabsPrimitiveProps, TabsVariants {
  children: React.ReactNode;
  className?: string;
}

const Tabs = ({children, className, orientation = "horizontal", ...props}: TabsProps) => {
  const slots = React.useMemo(() => tabsVariants(), []);

  return (
    <TabsContext.Provider value={{slots, orientation}}>
      <TabsPrimitive
        {...props}
        className={composeTwRenderProps(className, slots.base())}
        data-slot="tabs"
        orientation={orientation}
      >
        {children}
      </TabsPrimitive>
    </TabsContext.Provider>
  );
};

/* -----------------------------------------------------------------------------------------------*/

interface TabListWrapperProps extends React.ComponentProps<"div"> {
  className?: string;
}

const TabListWrapper = ({children, className, ...props}: TabListWrapperProps) => {
  const {slots} = useContext(TabsContext);

  return (
    <div className={slots?.tabListWrapper({className})} data-slot="tabs-list-wrapper" {...props}>
      {children}
    </div>
  );
};

/* -----------------------------------------------------------------------------------------------*/

interface TabListProps extends TabListPrimitiveProps<object> {
  children: React.ReactNode;
  className?: string;
}

const TabList = ({children, className, ...props}: TabListProps) => {
  const {slots} = useContext(TabsContext);

  return (
    <TabListPrimitive
      {...props}
      className={composeTwRenderProps(className, slots?.tabList())}
      data-slot="tabs-list"
    >
      {children}
    </TabListPrimitive>
  );
};

/* -----------------------------------------------------------------------------------------------*/

interface TabProps extends TabPrimitiveProps {
  className?: string;
}

const Tab = ({children, className, ...props}: TabProps) => {
  const {slots} = useContext(TabsContext);

  return (
    <TabPrimitive
      {...props}
      className={composeTwRenderProps(className, slots?.tab())}
      data-slot="tabs-tab"
    >
      {children}
    </TabPrimitive>
  );
};

/* -----------------------------------------------------------------------------------------------*/

interface TabIndicatorProps extends React.ComponentProps<typeof SelectionIndicatorPrimitive> {
  className?: string;
}

const TabIndicator = ({className, ...props}: TabIndicatorProps) => {
  const {slots} = useContext(TabsContext);

  return (
    <SelectionIndicatorPrimitive
      className={slots?.tabIndicator({className})}
      data-slot="tabs-indicator"
      {...props}
    />
  );
};

/* -----------------------------------------------------------------------------------------------*/

interface TabPanelProps extends Omit<TabPanelPrimitiveProps, "children"> {
  children: React.ReactNode;
  className?: string;
}

const TabPanel = ({children, className, ...props}: TabPanelProps) => {
  const {slots} = useContext(TabsContext);

  return (
    <TabPanelPrimitive
      {...props}
      className={composeTwRenderProps(className, slots?.tabPanel())}
      data-slot="tabs-panel"
    >
      {children}
    </TabPanelPrimitive>
  );
};

/* -----------------------------------------------------------------------------------------------*/

export {Tabs, TabListWrapper, TabList, Tab, TabIndicator, TabPanel};

export type {
  TabsProps,
  TabListWrapperProps,
  TabListProps,
  TabProps,
  TabIndicatorProps,
  TabPanelProps,
};
