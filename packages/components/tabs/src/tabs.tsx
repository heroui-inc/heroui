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
  const prevSelectedKey = useRef<typeof selectedKey>(undefined);
  const prevVariant = useRef(props?.variant);
  const variant = props?.variant;
  const isVertical = props?.isVertical;

  const getCursorStyles = (tabRect: DOMRect, relativeLeft: number, relativeTop: number) => {
    const baseStyles = {
      left: `${relativeLeft}px`,
      width: `${tabRect.width}px`,
    };

    if (variant === "underlined") {
      return {
        left: `${relativeLeft + tabRect.width * 0.1}px`,
        top: `${relativeTop + tabRect.height - 2}px`,
        width: `${tabRect.width * 0.8}px`,
        height: "",
      };
    }

    if (variant === "bordered") {
      const borderWidth = 2;

      return {
        ...baseStyles,
        top: `${relativeTop - borderWidth}px`,
        width: `${tabRect.width - borderWidth}px`,
        height: `${tabRect.height}px`,
      };
    }

    return {
      ...baseStyles,
      top: `${relativeTop}px`,
      height: `${tabRect.height}px`,
    };
  };

  const updateCursorPosition = (
    node: HTMLSpanElement,
    selectedTab: HTMLElement,
    parentRect: DOMRect,
  ) => {
    const tabRect = selectedTab.getBoundingClientRect();
    const relativeLeft = tabRect.left - parentRect.left;
    const relativeTop = tabRect.top - parentRect.top;

    const styles = getCursorStyles(tabRect, relativeLeft, relativeTop);

    node.style.left = styles.left;
    node.style.top = styles.top;
    node.style.width = styles.width;
    node.style.height = styles.height;
  };

  const handleCursorRef = (node: HTMLSpanElement | null) => {
    if (!node) return;

    const selectedTab = domRef.current?.querySelector(`[data-key="${selectedKey}"]`) as HTMLElement;

    if (!selectedTab || !domRef.current) return;

    const shouldDisableTransition =
      prevSelectedKey.current === undefined || prevVariant.current !== variant;

    node.style.transition = shouldDisableTransition ? "none" : "";

    prevSelectedKey.current = selectedKey;
    prevVariant.current = variant;

    const parentRect = domRef.current.getBoundingClientRect();

    updateCursorPosition(node, selectedTab, parentRect);
  };

  const renderTabs = useMemo(
    () => (
      <>
        <div {...getBaseProps()}>
          <Component {...getTabListProps()}>
            {!values.disableAnimation && !values.disableCursorAnimation && selectedKey != null && (
              <span {...getTabCursorProps()} ref={handleCursorRef} />
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
