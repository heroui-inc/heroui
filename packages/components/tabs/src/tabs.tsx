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

  const variant = props?.variant;
  const previousVariant = useRef<typeof variant>(undefined);
  const isVertical = props?.isVertical;
  const previousIsVertical = useRef<typeof isVertical>(undefined);
  const placement = props?.placement;
  const previousPlacement = useRef<typeof placement>(undefined);

  const cursorRef = useRef<HTMLSpanElement | null>(null);
  const selectedItem = state.selectedItem;
  const selectedKey = selectedItem?.key;

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

  const withAnimationReset = useCallback(
    (callback: () => void) => {
      if (
        variant !== previousVariant.current ||
        isVertical !== previousIsVertical.current ||
        placement !== previousPlacement.current
      ) {
        cursorRef.current?.removeAttribute("data-animated");
      }
      callback();
      previousVariant.current = variant;
      previousIsVertical.current = isVertical;
      previousPlacement.current = placement;
      requestAnimationFrame(() => {
        cursorRef.current?.setAttribute("data-animated", "true");
        cursorRef.current?.setAttribute("data-initialized", "true");
      });
    },
    [isVertical, variant, placement],
  );

  const updateCursorPosition = useCallback(
    (selectedTab: HTMLElement) => {
      if (!cursorRef.current) return;

      const tabRect = {
        width: selectedTab.offsetWidth,
        height: selectedTab.offsetHeight,
        left: selectedTab.offsetLeft,
        top: selectedTab.offsetTop,
      } as DOMRect;

      const styles = getCursorStyles(tabRect);

      withAnimationReset(() => {
        cursorRef.current!.style.left = styles.left;
        cursorRef.current!.style.top = styles.top;
        cursorRef.current!.style.width = styles.width;
        cursorRef.current!.style.height = styles.height;
      });
    },
    [cursorRef.current, getCursorStyles, withAnimationReset],
  );

  const onResize = useCallback(
    (entries: ResizeObserverEntry[]) => {
      const contentRect = entries[0].contentRect;

      // check if rendered
      if (contentRect.width === 0 && contentRect.height === 0) return;

      updateCursorPosition(entries[0].target as HTMLElement);
    },
    [updateCursorPosition],
  );

  useEffect(() => {
    const selectedTab = domRef.current?.querySelector(`[data-key="${selectedKey}"]`);

    if (!selectedTab) return;

    const observer = new ResizeObserver(onResize);

    observer.observe(selectedTab);

    return () => observer.disconnect();
  }, [domRef.current, onResize, selectedKey]);

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
