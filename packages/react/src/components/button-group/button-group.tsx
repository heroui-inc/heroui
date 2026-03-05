"use client";

import type {ButtonProps} from "../button";
import type {ButtonGroupVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {buttonGroupVariants} from "@heroui/styles";
import React, {Children, createContext, isValidElement, useContext} from "react";

import {composeSlotClassName} from "../../utils";

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
    ComponentPropsWithRef<"div">,
    Pick<ButtonProps, "size" | "variant" | "isDisabled">,
    ButtonGroupVariants {}

const ButtonGroupRoot = ({
  children,
  className,
  fullWidth,
  isDisabled,
  size,
  variant,
  ...rest
}: ButtonGroupRootProps) => {
  const slots = React.useMemo(() => buttonGroupVariants({fullWidth}), [fullWidth]);

  // Wrap only direct children with context provider
  const wrappedChildren = Children.map(children, (child) => {
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
      <div className={slots.base({className})} data-slot="button-group" {...rest}>
        {wrappedChildren}
      </div>
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
