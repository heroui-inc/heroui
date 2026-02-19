"use client";

import type {TabsVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {tabsVariants} from "@heroui/styles";
import React, {createContext, useContext} from "react";
import {
  SelectionIndicator as SelectionIndicatorPrimitive,
  TabList as TabListPrimitive,
  TabPanel as TabPanelPrimitive,
  Tab as TabPrimitive,
  Tabs as TabsPrimitive,
} from "react-aria-components";

import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";

/* -------------------------------------------------------------------------------------------------
 * Tabs Context
 * -----------------------------------------------------------------------------------------------*/
type TabsContext = {
  orientation?: "horizontal" | "vertical";
  slots?: ReturnType<typeof tabsVariants>;
};

const TabsContext = createContext<TabsContext>({});

/* -------------------------------------------------------------------------------------------------
 * Tabs Root
 * -----------------------------------------------------------------------------------------------*/
interface TabsRootProps extends ComponentPropsWithRef<typeof TabsPrimitive>, TabsVariants {
  children: React.ReactNode;
  className?: string;
}

const TabsRoot = ({
  children,
  className,
  orientation = "horizontal",
  variant,
  ...props
}: TabsRootProps) => {
  const slots = React.useMemo(() => tabsVariants({variant}), [variant]);

  return (
    <TabsContext value={{orientation, slots}}>
      <TabsPrimitive
        {...props}
        className={composeTwRenderProps(className, slots.base())}
        data-slot="tabs"
        orientation={orientation}
      >
        {children}
      </TabsPrimitive>
    </TabsContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Tabs List Container
 * -----------------------------------------------------------------------------------------------*/
interface TabListContainerProps extends ComponentPropsWithRef<"div"> {
  className?: string;
}

const TabListContainer = ({children, className, ...props}: TabListContainerProps) => {
  const {slots} = useContext(TabsContext);

  return (
    <div
      className={composeSlotClassName(slots?.tabListContainer, className)}
      data-slot="tabs-list-container"
      {...props}
    >
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Tabs List
 * -----------------------------------------------------------------------------------------------*/
interface TabListProps extends ComponentPropsWithRef<typeof TabListPrimitive<object>> {
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

/* -------------------------------------------------------------------------------------------------
 * Tab
 * -----------------------------------------------------------------------------------------------*/
interface TabProps extends ComponentPropsWithRef<typeof TabPrimitive> {
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

/* -------------------------------------------------------------------------------------------------
 * Tab Indicator
 * -----------------------------------------------------------------------------------------------*/
interface TabIndicatorProps extends ComponentPropsWithRef<typeof SelectionIndicatorPrimitive> {
  className?: string;
}

const TabIndicator = ({className, ...props}: TabIndicatorProps) => {
  const {slots} = useContext(TabsContext);

  return (
    <SelectionIndicatorPrimitive
      className={composeSlotClassName(slots?.tabIndicator, className)}
      data-slot="tabs-indicator"
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Tab Panel
 * -----------------------------------------------------------------------------------------------*/
interface TabPanelProps extends Omit<ComponentPropsWithRef<typeof TabPanelPrimitive>, "children"> {
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

/* -------------------------------------------------------------------------------------------------
 * Tab Separator
 * -----------------------------------------------------------------------------------------------*/
interface TabSeparatorProps extends ComponentPropsWithRef<"span"> {
  className?: string;
}

const TabSeparator = ({className, ...props}: TabSeparatorProps) => {
  const {slots} = useContext(TabsContext);

  return (
    <span
      aria-hidden="true"
      className={composeSlotClassName(slots?.separator, className)}
      data-slot="tabs-separator"
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {TabsRoot, TabListContainer, TabList, Tab, TabIndicator, TabPanel, TabSeparator};

export type {
  TabsRootProps,
  TabListContainerProps,
  TabListProps,
  TabProps,
  TabIndicatorProps,
  TabPanelProps,
  TabSeparatorProps,
};
