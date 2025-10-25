import type {ForwardedRef, ReactElement} from "react";
import type {UseTabsProps} from "./use-tabs";

import {useEffect, useCallback, useRef, useMemo} from "react";
import {forwardRef} from "@heroui/system";

import {useTabs} from "./use-tabs";
import Tab from "./tab";
import TabPanel from "./tab-panel";

interface Props<T> extends UseTabsProps<T> {}

export type TabsProps<T extends object = object> = Props<T>;

const Tabs = forwardRef(function Tabs<T extends object>(
  props: TabsProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const {
    Component,
    values,
    state,
    domRef,
    destroyInactiveTabPanel,
    getBaseProps,
    getTabListProps,
    getWrapperProps,
    getTabCursorProps,
  } = useTabs<T>({
    ...props,
    ref,
  });

  const tabsProps = {
    state,
    listRef: values.listRef,
    slots: values.slots,
    classNames: values.classNames,
    isDisabled: values.isDisabled,
    shouldSelectOnPressUp: values.shouldSelectOnPressUp,
  };

  const tabs = [...state.collection].map((item) => (
    <Tab key={item.key} item={item} {...tabsProps} {...item.props} />
  ));

  const cursorRef = useRef<HTMLSpanElement | null>(null);
  const selectedItem = state.selectedItem;
  const selectedKey = selectedItem?.key;
  const variant = props?.variant;
  const isVertical = props?.isVertical;

  const getCursorStyles = useCallback(
    (tabRect: DOMRect) => {
      if (variant === "underlined") {
        return {
          left: `${tabRect.left + tabRect.width * 0.1}px`,
          top: `${tabRect.top + tabRect.height - 2}px`,
          width: `${tabRect.width * 0.8}px`,
          height: "",
        };
      }

      return {
        left: `${tabRect.left}px`,
        top: `${tabRect.top}px`,
        width: `${tabRect.width}px`,
        height: `${tabRect.height}px`,
      };
    },
    [variant],
  );

  const updateCursorPosition = useCallback(
    (entries: ResizeObserverEntry[]) => {
      if (!cursorRef.current) return;

      const contentRect = entries[0].contentRect;

      // check if rendered
      if (contentRect.width === 0 && contentRect.height === 0) return;

      const selectedTab = entries[0].target as HTMLElement;
      const tabRect = {
        width: selectedTab.offsetWidth,
        height: selectedTab.offsetHeight,
        left: selectedTab.offsetLeft,
        top: selectedTab.offsetTop,
      } as DOMRect;

      const styles = getCursorStyles(tabRect);

      cursorRef.current.style.left = styles.left;
      cursorRef.current.style.top = styles.top;
      cursorRef.current.style.width = styles.width;
      cursorRef.current.style.height = styles.height;

      requestAnimationFrame(() => cursorRef.current?.setAttribute("data-initialized", "true"));
    },
    [getCursorStyles],
  );

  useEffect(() => {
    const selectedTab = domRef.current?.querySelector(`[data-key="${selectedKey}"]`);

    if (!selectedTab) return;

    const observer = new ResizeObserver(updateCursorPosition);

    observer.observe(selectedTab);

    return () => observer.disconnect();
  }, [domRef, selectedKey, updateCursorPosition]);

  const renderTabs = useMemo(
    () => (
      <>
        <div {...getBaseProps()}>
          <Component {...getTabListProps()}>
            {!values.disableAnimation && !values.disableCursorAnimation && selectedKey != null && (
              <span {...getTabCursorProps()} ref={cursorRef} />
            )}
            {tabs}
          </Component>
        </div>
        {[...state.collection].map((item) => {
          return (
            <TabPanel
              key={item.key}
              classNames={values.classNames}
              destroyInactiveTabPanel={destroyInactiveTabPanel}
              slots={values.slots}
              state={values.state}
              tabKey={item.key}
            />
          );
        })}
      </>
    ),
    [
      Component,
      getBaseProps,
      getTabListProps,
      getTabCursorProps,
      tabs,
      selectedKey,
      state.collection,
      values.disableAnimation,
      values.disableCursorAnimation,
      values.classNames,
      values.slots,
      values.state,
      destroyInactiveTabPanel,
      domRef,
      cursorRef,
      variant,
      isVertical,
    ],
  );

  if ("placement" in props || "isVertical" in props) {
    return <div {...getWrapperProps()}>{renderTabs}</div>;
  }

  return renderTabs;
}) as <T extends object>(props: TabsProps<T>) => ReactElement;

export default Tabs;
