"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {ButtonProps} from "../button";
import type {ButtonGroupVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";

import {buttonGroupVariants} from "@heroui/styles";
import React, {Children, createContext, isValidElement, memo, useContext, useMemo} from "react";
import {Group} from "react-aria-components/Group";
import {useSlottedContext} from "react-aria-components/slots";
import {ToggleButtonGroupContext as RACToggleButtonGroupContext} from "react-aria-components/ToggleButtonGroup";

import {composeTwRenderProps} from "../../utils";
import {dom} from "../../utils/dom";

/* -------------------------------------------------------------------------------------------------
 * ButtonGroup Context
 * -----------------------------------------------------------------------------------------------*/
type ButtonGroupContext = {
  fullWidth?: ButtonProps["fullWidth"];
  isDisabled?: ButtonProps["isDisabled"];
  separatorClassName?: string;
  size?: ButtonProps["size"];
  variant?: ButtonProps["variant"];
};

const ButtonGroupContext = createContext<ButtonGroupContext>({});

// Property name to mark direct children of ButtonGroup
export const BUTTON_GROUP_CHILD = "__button_group_child";

/* -------------------------------------------------------------------------------------------------
 * ButtonGroup Root
 * -----------------------------------------------------------------------------------------------*/
interface ButtonGroupRootProps
  extends
    ComponentPropsWithRef<typeof Group>,
    Pick<ButtonProps, "size" | "variant">,
    ButtonGroupVariants {
  /** The orientation of the button group */
  orientation?: "horizontal" | "vertical";
}

const ButtonGroupRoot = memo(function ButtonGroupRoot({
  children,
  className,
  fullWidth,
  isDisabled,
  orientation: orientationProp,
  size,
  variant,
  ...rest
}: ButtonGroupRootProps) {
  const racContext = useSlottedContext(RACToggleButtonGroupContext);
  const orientation = orientationProp ?? racContext?.orientation ?? "horizontal";

  const slots = useMemo(
    () => buttonGroupVariants({fullWidth, orientation}),
    [fullWidth, orientation],
  );
  const contextValue = useMemo<ButtonGroupContext>(
    () => ({
      fullWidth,
      isDisabled,
      separatorClassName: slots.separator(),
      size,
      variant,
    }),
    [slots, size, variant, isDisabled, fullWidth],
  );
  const baseClassName = useMemo(() => slots.base(), [slots]);

  // Wrap only direct children with context provider
  const wrappedChildren = Children.map(children as React.ReactNode, (child) => {
    if (!isValidElement(child)) {
      return child;
    }

    // Clone the child and add the special prop
    return React.cloneElement(child, {
      [BUTTON_GROUP_CHILD]: true,
    } as any);
  });

  return (
    <ButtonGroupContext value={contextValue}>
      <Group
        className={composeTwRenderProps(className, baseClassName)}
        data-slot="button-group"
        isDisabled={isDisabled}
        {...rest}
      >
        {wrappedChildren}
      </Group>
    </ButtonGroupContext>
  );
});

/* -------------------------------------------------------------------------------------------------
 * ButtonGroup Separator
 * -----------------------------------------------------------------------------------------------*/
interface ButtonGroupSeparatorProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function ButtonGroupSeparatorInner<E extends keyof React.JSX.IntrinsicElements = "span">({
  className,
  ...props
}: ButtonGroupSeparatorProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof ButtonGroupSeparatorProps<E>>) {
  const {separatorClassName} = useContext(ButtonGroupContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, separatorClassName) as string,
    [className, separatorClassName],
  );

  return (
    <dom.span
      aria-hidden="true"
      className={resolvedClassName}
      data-slot="button-group-separator"
      {...(props as any)}
    />
  );
}

const ButtonGroupSeparator = memo(ButtonGroupSeparatorInner) as <
  E extends keyof React.JSX.IntrinsicElements = "span",
>(
  props: ButtonGroupSeparatorProps<E> &
    Omit<React.JSX.IntrinsicElements[E], keyof ButtonGroupSeparatorProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ButtonGroupRoot, ButtonGroupSeparator, ButtonGroupContext};

export type {ButtonGroupRootProps, ButtonGroupSeparatorProps};
