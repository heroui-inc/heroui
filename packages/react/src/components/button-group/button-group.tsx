"use client";

import type {ButtonProps} from "../button";
import type {ButtonGroupVariants} from "./button-group.styles";
import type {ComponentPropsWithRef} from "react";

import React, {createContext} from "react";

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
  className,
  fullWidth,
  hideSeparator = false,
  isDisabled,
  size,
  variant,
  ...rest
}: ButtonGroupRootProps) => {
  return (
    <ButtonGroupContext value={{size, variant, isDisabled, fullWidth, hideSeparator}}>
      <div
        className={buttonGroupVariants({className, fullWidth})}
        data-hide-separator={hideSeparator ? "true" : undefined}
        data-slot="button-group"
        {...rest}
      />
    </ButtonGroupContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ButtonGroupRoot, ButtonGroupContext};

export type {ButtonGroupRootProps};
