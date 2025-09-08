"use client";

import type {TabsVariants} from "./tabs.styles";
import type {
  TabListProps as TabListPrimitiveProps,
  TabPanelProps as TabPanelPrimitiveProps,
  TabProps as TabPrimitiveProps,
  TabsProps as TabsPrimitiveProps,
} from "react-aria-components";

import React, {createContext, useContext, useEffect, useRef, useState} from "react";
import {
  TabList as TabListPrimitive,
  TabListStateContext,
  TabPanel as TabPanelPrimitive,
  Tab as TabPrimitive,
  Tabs as TabsPrimitive,
} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";
import {useMergeRef} from "../../utils/mergeRef";

import {tabsVariants} from "./tabs.styles";

const TabsContext = createContext<{
  slots?: ReturnType<typeof tabsVariants>;
  orientation?: "horizontal" | "vertical";
}>({});

const TabListWrapperContext = createContext<{
  tabsListRef?: React.RefObject<HTMLDivElement | null>;
}>({});

/* -------------------------------------------------------------------------------------------------
 * Tabs
 * -----------------------------------------------------------------------------------------------*/

interface TabsProps extends TabsPrimitiveProps, TabsVariants {
  children: React.ReactNode;
  className?: string;
}

const TabsRoot = React.forwardRef<React.ElementRef<typeof TabsPrimitive>, TabsProps>(
  ({children, className, orientation = "horizontal", ...props}, ref) => {
    const slots = React.useMemo(() => tabsVariants(), []);

    return (
      <TabsContext.Provider value={{slots, orientation}}>
        <TabsPrimitive
          {...props}
          ref={ref}
          data-tabs
          className={composeTwRenderProps(className, slots.base())}
          orientation={orientation}
        >
          {children}
        </TabsPrimitive>
      </TabsContext.Provider>
    );
  },
);

TabsRoot.displayName = "HeroUI.Tabs";
/* -----------------------------------------------------------------------------------------------*/

interface TabListWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const TabListWrapper = React.forwardRef<React.ElementRef<"div">, TabListWrapperProps>(
  ({children, className, ...props}, ref) => {
    const {slots} = useContext(TabsContext);

    const tabListRef = useRef<HTMLDivElement>(null);
    const mergedRef = useMergeRef(ref, tabListRef);

    return (
      <TabListWrapperContext.Provider value={{tabsListRef: tabListRef}}>
        <div
          data-tabs-list-wrapper
          className={slots?.tabListWrapper({className})}
          {...props}
          ref={mergedRef}
        >
          {children}
        </div>
      </TabListWrapperContext.Provider>
    );
  },
);

TabListWrapper.displayName = "HeroUI.TabListWrapper";

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
        data-tabs-list
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
      <TabPrimitive
        {...props}
        ref={ref}
        data-tabs-tab
        className={composeTwRenderProps(className, slots?.tab())}
      >
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
        data-tabs-panel
        className={composeTwRenderProps(className, slots?.tabPanel())}
      >
        {children}
      </TabPanelPrimitive>
    );
  },
);

TabPanel.displayName = "HeroUI.TabPanel";

/* -----------------------------------------------------------------------------------------------*/

interface TabIndicatorProps {
  className?: string;
  style?: React.CSSProperties;
}

const TabIndicator = React.forwardRef<HTMLSpanElement, TabIndicatorProps>(
  ({className, style, ...props}, ref) => {
    const {slots} = useContext(TabsContext);
    const {tabsListRef} = useContext(TabListWrapperContext);
    const state = useContext(TabListStateContext);
    const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});

    useEffect(() => {
      if (!state?.selectedKey || !tabsListRef?.current) return;

      const raf = requestAnimationFrame(() => {
        if (!tabsListRef?.current) return;

        // Find the selected tab element
        const selectedTab = tabsListRef.current.querySelector(
          `[data-key="${state.selectedKey}"]`,
        ) as HTMLElement | null;

        if (!selectedTab) return;

        const selectedTabRect = selectedTab.getBoundingClientRect();
        const tabsListRect = tabsListRef.current.getBoundingClientRect();

        setIndicatorStyle({
          "--selected-tab-left": `${selectedTabRect.left - tabsListRect.left}px`,
          "--selected-tab-top": `${selectedTabRect.top - tabsListRect.top}px`,
          "--selected-tab-width": `${selectedTabRect.width}px`,
          "--selected-tab-height": `${selectedTabRect.height}px`,
        } as React.CSSProperties);
      });

      return () => {
        cancelAnimationFrame(raf);
      };
    }, [state?.selectedKey, tabsListRef]);

    return (
      <span
        ref={ref}
        data-tabs-indicator
        className={slots?.tabsIndicator({className})}
        style={{...indicatorStyle, ...style}}
        {...props}
      />
    );
  },
);

TabIndicator.displayName = "HeroUI.TabIndicator";

/* -----------------------------------------------------------------------------------------------*/

const CompoundTabs = Object.assign(TabsRoot, {
  ListWrapper: TabListWrapper,
  List: TabList,
  Tab: Tab,
  Indicator: TabIndicator,
  Panel: TabPanel,
});

export default CompoundTabs;
export type {TabsProps, TabListProps, TabProps, TabPanelProps, TabIndicatorProps};
