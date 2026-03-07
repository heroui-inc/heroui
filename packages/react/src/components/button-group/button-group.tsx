"use client";

import type {ButtonProps} from "../button";
import type {ButtonGroupVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {buttonGroupVariants} from "@heroui/styles";
import React, {Children, createContext, isValidElement, useContext} from "react";
import {
  Group,
  ToggleButtonGroupContext as RACToggleButtonGroupContext,
  useSlottedContext,
} from "react-aria-components";

import {composeSlotClassName, composeTwRenderProps} from "../../utils";

/* -------------------------------------------------------------------------------------------------
 * ButtonGroup Context
 * -----------------------------------------------------------------------------------------------*/
type ButtonGroupContext = {
  slots?: ReturnType<typeof buttonGroupVariants>;
  size?: ButtonProps["size"];
  variant?: ButtonProps["variant"];
  isDisabled?: ButtonProps["isDisabled"];
  fullWidth?: ButtonProps["fullWidth"];
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

const ButtonGroupRoot = ({
  children,
  className,
  fullWidth,
  isDisabled,
  orientation: orientationProp,
  size,
  variant,
  ...rest
}: ButtonGroupRootProps) => {
  const racContext = useSlottedContext(RACToggleButtonGroupContext);
  const orientation = orientationProp ?? racContext?.orientation ?? "horizontal";

  const slots = React.useMemo(
    () => buttonGroupVariants({fullWidth, orientation}),
    [fullWidth, orientation],
  );

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
    <ButtonGroupContext value={{slots, size, variant, isDisabled, fullWidth}}>
      <Group
        className={composeTwRenderProps(className, slots.base())}
        data-slot="button-group"
        isDisabled={isDisabled}
        {...rest}
      >
        {wrappedChildren}
      </Group>
    </ButtonGroupContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * ButtonGroup Separator
 * -----------------------------------------------------------------------------------------------*/
interface ButtonGroupSeparatorProps extends ComponentPropsWithRef<"span"> {
  className?: string;
}

const ButtonGroupSeparator = ({className, ...props}: ButtonGroupSeparatorProps) => {
  const {slots} = useContext(ButtonGroupContext);

  return (
    <span
      aria-hidden="true"
      className={composeSlotClassName(slots?.separator, className)}
      data-slot="button-group-separator"
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ButtonGroupRoot, ButtonGroupSeparator, ButtonGroupContext};

export type {ButtonGroupRootProps, ButtonGroupSeparatorProps};
