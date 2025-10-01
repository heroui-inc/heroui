import type {ForwardedRef, ReactElement} from "react";
import type {UseTabsProps} from "./use-tabs";

import {useRef, useMemo} from "react";
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

  const selectedItem = state.selectedItem;
  const selectedKey = selectedItem?.key;
  const isInitialMount = useRef(true);
  const variant = props?.variant;
  const isVertical = props?.isVertical;

  const renderTabs = useMemo(
    () => (
      <>
        <div {...getBaseProps()}>
          <Component {...getTabListProps()}>
            {!values.disableAnimation && !values.disableCursorAnimation && selectedKey != null && (
              <span
                {...getTabCursorProps()}
                ref={(node) => {
                  if (node) {
                    const selectedTab = domRef.current?.querySelector(
                      `[data-key="${selectedKey}"]`,
                    ) as HTMLElement;

                    if (selectedTab && domRef.current) {
                      const tabRect = selectedTab.getBoundingClientRect();
                      const parentRect = domRef.current.getBoundingClientRect();

                      if (isInitialMount.current) {
                        node.style.transition = "none";
                        isInitialMount.current = false;
                      } else {
                        node.style.transition = "";
                      }

                      if (variant === "underlined") {
                        const widthPercent = 0.8;
                        const tabWidth = tabRect.width;
                        const cursorWidth = tabWidth * widthPercent;
                        const leftOffset = (tabWidth - cursorWidth) / 2;

                        if (isVertical) {
                          const tabHeight = tabRect.height;
                          const cursorHeight = tabHeight * widthPercent;

                          node.style.left = `${tabRect.left - parentRect.left + leftOffset}px`;
                          node.style.top = `${tabRect.top - parentRect.top + cursorHeight + 4}px`;
                          node.style.width = `${cursorWidth}px`;
                          node.style.height = "";
                        } else {
                          node.style.left = `${tabRect.left - parentRect.left + leftOffset}px`;
                          node.style.width = `${cursorWidth}px`;
                          node.style.top = "";
                          node.style.height = "";
                        }
                      } else if (variant === "bordered") {
                        node.style.left = `${tabRect.left - parentRect.left}px`;
                        node.style.top = `${tabRect.top - parentRect.top - 2}px`;
                        node.style.width = `${tabRect.width}px`;
                        node.style.height = `${tabRect.height}px`;
                      } else {
                        node.style.left = `${tabRect.left - parentRect.left}px`;
                        node.style.top = `${tabRect.top - parentRect.top}px`;
                        node.style.width = `${tabRect.width}px`;
                        node.style.height = `${tabRect.height}px`;
                      }
                    }
                  }
                }}
              />
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
