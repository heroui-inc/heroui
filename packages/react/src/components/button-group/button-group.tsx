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
};

const ButtonGroupContext = createContext<ButtonGroupContext>({});

/* -------------------------------------------------------------------------------------------------
 * ButtonGroup Root
 * -----------------------------------------------------------------------------------------------*/
interface ButtonGroupRootProps
  extends
    ComponentPropsWithRef<"div">,
    Pick<ButtonProps, "size" | "variant" | "isDisabled">,
    ButtonGroupVariants {}

const ButtonGroupRoot = ({
  className,
  fullWidth,
  isDisabled,
  size,
  variant,
  ...rest
}: ButtonGroupRootProps) => {
  return (
    <ButtonGroupContext value={{size, variant, isDisabled, fullWidth}}>
      <div
        className={buttonGroupVariants({className, fullWidth})}
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
