"use client";

import type {ButtonGroupVariants} from "./button-group.styles";
import type {ButtonProps} from "../button";
import type {ComponentPropsWithRef} from "react";

import React, {Children, createContext, isValidElement} from "react";

import {buttonGroupVariants} from "./button-group.styles";

/* -------------------------------------------------------------------------------------------------
 * ButtonGroup Context
 * -----------------------------------------------------------------------------------------------*/
type ButtonGroupContext = {
  size?: ButtonProps["size"];
  variant?: ButtonProps["variant"];
  isDisabled?: ButtonProps["isDisabled"];
  fullWidth?: ButtonProps["fullWidth"];
  hideSeparator?: boolean;
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
    ButtonGroupVariants {
  hideSeparator?: boolean;
}

const ButtonGroupRoot = ({
  children,
  className,
  fullWidth,
  hideSeparator = false,
  isDisabled,
  size,
  variant,
  ...rest
}: ButtonGroupRootProps) => {
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
    <ButtonGroupContext value={{size, variant, isDisabled, fullWidth, hideSeparator}}>
      <div
        className={buttonGroupVariants({className, fullWidth})}
        data-hide-separator={hideSeparator ? "true" : undefined}
        data-slot="button-group"
        {...rest}
      >
        {wrappedChildren}
      </div>
    </ButtonGroupContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ButtonGroupRoot, ButtonGroupContext};

export type {ButtonGroupRootProps};
