import type {SelectionBehavior, MultipleSelection} from "@react-types/shared";
import type {AriaAccordionProps} from "@react-types/accordion";
import type {AccordionGroupVariantProps} from "@heroui/theme";
import type {HTMLHeroUIProps, PropGetter} from "@heroui/system";
import type {ReactRef} from "@heroui/react-utils";
import type {Key} from "react";
import type {TreeState} from "@react-stately/tree";
import type {DividerProps} from "@heroui/divider";
import type {AccordionItemProps} from "./accordion-item";

import {useProviderContext} from "@heroui/system";
import {filterDOMProps} from "@heroui/react-utils";
import React, {useCallback} from "react";
import {useTreeState} from "@react-stately/tree";
import {mergeProps} from "@heroui/shared-utils";
import {accordion} from "@heroui/theme";
import {useDOMRef} from "@heroui/react-utils";
import {useMemo, useState} from "react";
import {useReactAriaAccordion} from "@heroui/use-aria-accordion";

interface Props extends HTMLHeroUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLDivElement | null>;
  /**
   * Whether to display a divider at the bottom of the each accordion item.
   *
   * @default true
   */
  showDivider?: boolean;
  /**
   * The divider props.
   */
  dividerProps?: Partial<DividerProps>;
  /**
   * The accordion selection behavior.
   * @default "toggle"
   */
  selectionBehavior?: SelectionBehavior;
  /**
   * Whether to keep the accordion content mounted when collapsed.
   * @default false
   */
  keepContentMounted?: boolean;
  /**
   * The accordion items classNames.
   */
  itemClasses?: AccordionItemProps["classNames"];
}

export type UseAccordionProps<T extends object = {}> = Props &
  AccordionGroupVariantProps &
  Pick<
    AccordionItemProps,
    | "isCompact"
    | "isDisabled"
    | "hideIndicator"
    | "disableAnimation"
    | "disableIndicatorAnimation"
    | "motionProps"
  > &
  AriaAccordionProps<T> &
  MultipleSelection;

export type ValuesType<T extends object = {}> = {
  state: TreeState<T>;
  focusedKey?: Key | null;
  isCompact?: AccordionItemProps["isCompact"];
  isDisabled?: AccordionItemProps["isDisabled"];
  hideIndicator?: AccordionItemProps["hideIndicator"];
  disableAnimation?: AccordionItemProps["disableAnimation"];
  keepContentMounted?: Props["keepContentMounted"];
  disableIndicatorAnimation?: AccordionItemProps["disableAnimation"];
  motionProps?: AccordionItemProps["motionProps"];
};

export function useAccordion<T extends object>(props: UseAccordionProps<T>) {
  const globalContext = useProviderContext();

  const {
    ref,
    as,
    className,
    items,
    variant,
    motionProps,
    expandedKeys,
    disabledKeys,
    selectedKeys,
    children: childrenProp,
    defaultExpandedKeys,
    selectionMode = "single",
    selectionBehavior = "toggle",
    keepContentMounted = false,
    disallowEmptySelection,
    defaultSelectedKeys,
    onExpandedChange,
    onSelectionChange,
    dividerProps = {},
    isCompact = false,
    isDisabled = false,
    showDivider = true,
    hideIndicator = false,
    disableAnimation = globalContext?.disableAnimation ?? false,
    disableIndicatorAnimation = false,
    itemClasses,
    ...otherProps
  } = props;

  const [focusedKey, setFocusedKey] = useState<Key | null>(null);

  const Component = as || "div";
  const shouldFilterDOMProps = typeof Component === "string";

  const domRef = useDOMRef(ref);

  const classNames = useMemo(
    () =>
      accordion({
        variant,
        className,
      }),
    [variant, className],
  );

  // TODO: Remove this once the issue is fixed.
  const children = useMemo(() => {
    let treeChildren: any = [];

    /**
     * This is a workaround for rendering ReactNode children in the AccordionItem.
     * @see https://github.com/adobe/react-spectrum/issues/3882
     */
    React.Children.map(childrenProp, (child) => {
      if (React.isValidElement(child) && typeof child.props?.children !== "string") {
        const clonedChild = React.cloneElement(child, {
          // @ts-ignore
          hasChildItems: false,
        });

        treeChildren.push(clonedChild);
      } else {
        treeChildren.push(child);
      }
    });

    return treeChildren;
  }, [childrenProp]);

  const commonProps = {
    children,
    items,
  };

  const expandableProps = {
    expandedKeys,
    defaultExpandedKeys,
    onExpandedChange,
  };

  const treeProps = {
    disabledKeys,
    selectedKeys,
    selectionMode,
    selectionBehavior,
    disallowEmptySelection,
    defaultSelectedKeys: defaultSelectedKeys ?? defaultExpandedKeys,
    onSelectionChange,
    ...commonProps,
    ...expandableProps,
  };

  const state = useTreeState(treeProps);

  state.selectionManager.setFocusedKey = (key: Key | null) => {
    setFocusedKey(key);
  };

  const {accordionProps} = useReactAriaAccordion(
    {
      ...commonProps,
      ...expandableProps,
    },
    state,
    domRef,
  );

  const values: ValuesType<T> = useMemo(
    () => ({
      state,
      focusedKey,
      motionProps,
      isCompact,
      isDisabled,
      hideIndicator,
      disableAnimation,
      keepContentMounted,
      disableIndicatorAnimation,
    }),
    [
      focusedKey,
      isCompact,
      isDisabled,
      hideIndicator,
      selectedKeys,
      disableAnimation,
      keepContentMounted,
      state?.expandedKeys.values,
      disableIndicatorAnimation,
      state.expandedKeys.size,
      state.disabledKeys.size,
      motionProps,
    ],
  );

  const getBaseProps: PropGetter = useCallback((props = {}) => {
    return {
      ref: domRef,
      className: classNames,
      "data-orientation": "vertical",
      ...mergeProps(
        accordionProps,
        filterDOMProps(otherProps, {
          enabled: shouldFilterDOMProps,
        }),
        props,
      ),
    };
  }, []);

  const handleFocusChanged = useCallback((isFocused: boolean, key: Key | null) => {
    isFocused && setFocusedKey(key);
  }, []);

  return {
    Component,
    values,
    state,
    focusedKey,
    getBaseProps,
    isSplitted: variant === "splitted",
    classNames,
    showDivider,
    dividerProps,
    disableAnimation,
    handleFocusChanged,
    itemClasses,
  };
}

export type UseAccordionReturn = ReturnType<typeof useAccordion>;
