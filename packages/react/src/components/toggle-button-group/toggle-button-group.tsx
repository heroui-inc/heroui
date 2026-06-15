"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {ToggleButtonGroupVariants, ToggleButtonVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {toggleButtonGroupVariants} from "@heroui/styles";
import React, {createContext, memo, useContext, useMemo} from "react";
import {useSlottedContext} from "react-aria-components/slots";
import {
  ToggleButtonGroupContext as RACToggleButtonGroupContext,
  ToggleButtonGroup as ToggleButtonGroupPrimitive,
} from "react-aria-components/ToggleButtonGroup";

import {composeTwRenderProps} from "../../utils";
import {dom} from "../../utils/dom";

/* -------------------------------------------------------------------------------------------------
 * ToggleButtonGroup Context
 * -----------------------------------------------------------------------------------------------*/
type ToggleButtonGroupContext = {
  isDisabled?: boolean;
  separatorClassName?: string;
  size?: ToggleButtonVariants["size"];
};

const ToggleButtonGroupContext = createContext<ToggleButtonGroupContext>({});

// Property name to mark direct children of ToggleButtonGroup
export const TOGGLE_BUTTON_GROUP_CHILD = "__toggle_button_group_child";

/* -------------------------------------------------------------------------------------------------
 * ToggleButtonGroup Root
 * -----------------------------------------------------------------------------------------------*/
interface ToggleButtonGroupRootProps
  extends ComponentPropsWithRef<typeof ToggleButtonGroupPrimitive>, ToggleButtonGroupVariants {
  /** Size to propagate to all child ToggleButtons */
  size?: ToggleButtonVariants["size"];
  /** Whether the group buttons are visually separated (detached) instead of connected */
  isDetached?: boolean;
}

const ToggleButtonGroupRoot = memo(function ToggleButtonGroupRoot({
  children,
  className,
  fullWidth,
  isDetached = false,
  isDisabled,
  orientation: orientationProp,
  size,
  ...rest
}: ToggleButtonGroupRootProps) {
  const racContext = useSlottedContext(RACToggleButtonGroupContext);
  const orientation = orientationProp ?? racContext?.orientation ?? "horizontal";

  const slots = useMemo(
    () => toggleButtonGroupVariants({fullWidth, isDetached, orientation}),
    [fullWidth, isDetached, orientation],
  );
  const contextValue = useMemo<ToggleButtonGroupContext>(
    () => ({
      isDisabled,
      separatorClassName: slots.separator(),
      size,
    }),
    [slots, size, isDisabled],
  );
  const baseClassName = useMemo(() => slots.base(), [slots]);

  return (
    <ToggleButtonGroupContext value={contextValue}>
      <ToggleButtonGroupPrimitive
        className={composeTwRenderProps(className, baseClassName)}
        data-slot="toggle-button-group"
        isDisabled={isDisabled}
        orientation={orientation}
        {...rest}
      >
        {children}
      </ToggleButtonGroupPrimitive>
    </ToggleButtonGroupContext>
  );
});

/* -------------------------------------------------------------------------------------------------
 * ToggleButtonGroup Separator
 * -----------------------------------------------------------------------------------------------*/
interface ToggleButtonGroupSeparatorProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  className?: string;
}

function ToggleButtonGroupSeparatorInner<E extends keyof React.JSX.IntrinsicElements = "span">({
  className,
  ...props
}: ToggleButtonGroupSeparatorProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof ToggleButtonGroupSeparatorProps<E>>) {
  const {separatorClassName} = useContext(ToggleButtonGroupContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, separatorClassName) as string,
    [className, separatorClassName],
  );

  return (
    <dom.span
      aria-hidden="true"
      className={resolvedClassName}
      data-slot="toggle-button-group-separator"
      {...(props as any)}
    />
  );
}

const ToggleButtonGroupSeparator = memo(ToggleButtonGroupSeparatorInner) as <
  E extends keyof React.JSX.IntrinsicElements = "span",
>(
  props: ToggleButtonGroupSeparatorProps<E> &
    Omit<React.JSX.IntrinsicElements[E], keyof ToggleButtonGroupSeparatorProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ToggleButtonGroupRoot, ToggleButtonGroupSeparator, ToggleButtonGroupContext};

export type {ToggleButtonGroupRootProps, ToggleButtonGroupSeparatorProps};
