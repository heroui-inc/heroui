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

const TabsRoot = React.forwardRef<React.ElementRef<typeof TabsPrimitive>, TabsProps>(
  ({children, className, variant, ...props}, ref) => {
    const slots = React.useMemo(() => tabsVariants({variant}), [variant]);

    return (
      <TabsContext.Provider value={{slots}}>
        <TabsPrimitive
          {...props}
          ref={ref}
          className={composeTwRenderProps(className, slots.base())}
        >
          {children}
        </TabsPrimitive>
      </TabsContext.Provider>
    );
  },
);

TabsRoot.displayName = "HeroUI.TabsRoot";

/* -----------------------------------------------------------------------------------------------*/

interface TabListProps extends TabListPrimitiveProps<object> {
  children: React.ReactNode;
  className?: string;
}

const TabList = React.forwardRef<React.ElementRef<typeof TabListPrimitive>, TabListProps>(
  ({children, className, ...props}, ref) => {
    const {slots} = useContext(TabsContext);

    return (
      <TabListPrimitive
        {...props}
        ref={ref}
        className={composeTwRenderProps(className, slots?.tabList())}
      >
        {children}
      </TabListPrimitive>
    );
  },
);

TabList.displayName = "HeroUI.TabList";

/* -----------------------------------------------------------------------------------------------*/

interface TabProps extends Omit<TabPrimitiveProps, "children"> {
  children: React.ReactNode;
  className?: string;
}

const Tab = React.forwardRef<React.ElementRef<typeof TabPrimitive>, TabProps>(
  ({children, className, ...props}, ref) => {
    const {slots} = useContext(TabsContext);

    return (
      <TabPrimitive {...props} ref={ref} className={composeTwRenderProps(className, slots?.tab())}>
        {children}
      </TabPrimitive>
    );
  },
);

Tab.displayName = "HeroUI.Tab";

/* -----------------------------------------------------------------------------------------------*/

interface TabPanelProps extends Omit<TabPanelPrimitiveProps, "children"> {
  children: React.ReactNode;
  className?: string;
}

const TabPanel = React.forwardRef<React.ElementRef<typeof TabPanelPrimitive>, TabPanelProps>(
  ({children, className, ...props}, ref) => {
    const {slots} = useContext(TabsContext);

    return (
      <TabPanelPrimitive
        {...props}
        ref={ref}
        className={composeTwRenderProps(className, slots?.tabPanel())}
      >
        {children}
      </TabPanelPrimitive>
    );
  },
);

TabPanel.displayName = "HeroUI.TabPanel";

/* -----------------------------------------------------------------------------------------------*/

const Root = TabsRoot;

export {Root, TabList, Tab, TabPanel};
export type {TabsProps, TabListProps, TabProps, TabPanelProps};
