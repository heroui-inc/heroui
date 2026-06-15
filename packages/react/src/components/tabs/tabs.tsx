"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {TabsVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";

import {tabsVariants} from "@heroui/styles";
import React, {createContext, memo, useContext, useMemo} from "react";
import {SelectionIndicator as SelectionIndicatorPrimitive} from "react-aria-components/SelectionIndicator";
import {
  TabList as TabListPrimitive,
  TabPanel as TabPanelPrimitive,
  Tab as TabPrimitive,
  Tabs as TabsPrimitive,
} from "react-aria-components/Tabs";

import {composeTwRenderProps} from "../../utils/compose";
import {dom} from "../../utils/dom";

/* -------------------------------------------------------------------------------------------------
 * Tabs Context
 * -----------------------------------------------------------------------------------------------*/
type TabsContext = {
  orientation?: "horizontal" | "vertical";
  separatorClassName?: string;
  tabClassName?: string;
  tabIndicatorClassName?: string;
  tabListClassName?: string;
  tabListContainerClassName?: string;
  tabPanelClassName?: string;
};

const TabsContext = createContext<TabsContext>({});

/* -------------------------------------------------------------------------------------------------
 * Tabs Root
 * -----------------------------------------------------------------------------------------------*/
interface TabsRootProps extends ComponentPropsWithRef<typeof TabsPrimitive>, TabsVariants {
  children: React.ReactNode;
  className?: string;
}

const TabsRoot = memo(function TabsRoot({
  children,
  className,
  orientation = "horizontal",
  variant,
  ...props
}: TabsRootProps) {
  const slots = useMemo(() => tabsVariants({variant}), [variant]);
  const contextValue = useMemo<TabsContext>(
    () => ({
      orientation,
      separatorClassName: slots.separator(),
      tabClassName: slots.tab(),
      tabIndicatorClassName: slots.tabIndicator(),
      tabListClassName: slots.tabList(),
      tabListContainerClassName: slots.tabListContainer(),
      tabPanelClassName: slots.tabPanel(),
    }),
    [orientation, slots],
  );
  const baseClassName = useMemo(() => slots.base(), [slots]);

  return (
    <TabsContext value={contextValue}>
      <TabsPrimitive
        {...props}
        className={composeTwRenderProps(className, baseClassName)}
        data-slot="tabs"
        orientation={orientation}
      >
        {children}
      </TabsPrimitive>
    </TabsContext>
  );
});

/* -------------------------------------------------------------------------------------------------
 * Tabs List Container
 * -----------------------------------------------------------------------------------------------*/
interface TabListContainerProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function TabListContainerInner<E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...props
}: TabListContainerProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof TabListContainerProps<E>>) {
  const {tabListContainerClassName} = useContext(TabsContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, tabListContainerClassName) as string,
    [className, tabListContainerClassName],
  );

  return (
    <dom.div className={resolvedClassName} data-slot="tabs-list-container" {...(props as any)}>
      {children}
    </dom.div>
  );
}

const TabListContainer = memo(TabListContainerInner) as <
  E extends keyof React.JSX.IntrinsicElements = "div",
>(
  props: TabListContainerProps<E> &
    Omit<React.JSX.IntrinsicElements[E], keyof TabListContainerProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Tabs List
 * -----------------------------------------------------------------------------------------------*/
interface TabListProps extends ComponentPropsWithRef<typeof TabListPrimitive<object>> {
  children: React.ReactNode;
  className?: string;
}

const TabList = memo(function TabList({children, className, ...props}: TabListProps) {
  const {tabListClassName} = useContext(TabsContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, tabListClassName),
    [className, tabListClassName],
  );

  return (
    <TabListPrimitive {...props} className={resolvedClassName} data-slot="tabs-list">
      {children}
    </TabListPrimitive>
  );
});

/* -------------------------------------------------------------------------------------------------
 * Tab
 * -----------------------------------------------------------------------------------------------*/
interface TabProps extends ComponentPropsWithRef<typeof TabPrimitive> {
  className?: string;
}

const Tab = memo(function Tab({children, className, ...props}: TabProps) {
  const {tabClassName} = useContext(TabsContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, tabClassName),
    [className, tabClassName],
  );

  return (
    <TabPrimitive {...props} className={resolvedClassName} data-slot="tabs-tab">
      {children}
    </TabPrimitive>
  );
});

/* -------------------------------------------------------------------------------------------------
 * Tab Indicator
 * -----------------------------------------------------------------------------------------------*/
interface TabIndicatorProps extends ComponentPropsWithRef<typeof SelectionIndicatorPrimitive> {
  className?: string;
}

const TabIndicator = memo(function TabIndicator({className, ...props}: TabIndicatorProps) {
  const {tabIndicatorClassName} = useContext(TabsContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, tabIndicatorClassName) as string,
    [className, tabIndicatorClassName],
  );

  return (
    <SelectionIndicatorPrimitive
      className={resolvedClassName}
      data-slot="tabs-indicator"
      {...props}
    />
  );
});

/* -------------------------------------------------------------------------------------------------
 * Tab Panel
 * -----------------------------------------------------------------------------------------------*/
interface TabPanelProps extends Omit<ComponentPropsWithRef<typeof TabPanelPrimitive>, "children"> {
  children: React.ReactNode;
  className?: string;
}

const TabPanel = memo(function TabPanel({children, className, ...props}: TabPanelProps) {
  const {tabPanelClassName} = useContext(TabsContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, tabPanelClassName),
    [className, tabPanelClassName],
  );

  return (
    <TabPanelPrimitive {...props} className={resolvedClassName} data-slot="tabs-panel">
      {children}
    </TabPanelPrimitive>
  );
});

/* -------------------------------------------------------------------------------------------------
 * Tab Separator
 * -----------------------------------------------------------------------------------------------*/
interface TabSeparatorProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  className?: string;
}

function TabSeparatorInner<E extends keyof React.JSX.IntrinsicElements = "span">({
  className,
  ...props
}: TabSeparatorProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof TabSeparatorProps<E>>) {
  const {separatorClassName} = useContext(TabsContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, separatorClassName) as string,
    [className, separatorClassName],
  );

  return (
    <dom.span
      aria-hidden="true"
      className={resolvedClassName}
      data-slot="tabs-separator"
      {...(props as any)}
    />
  );
}

const TabSeparator = memo(TabSeparatorInner) as <
  E extends keyof React.JSX.IntrinsicElements = "span",
>(
  props: TabSeparatorProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof TabSeparatorProps<E>>,
) => React.JSX.Element;

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
