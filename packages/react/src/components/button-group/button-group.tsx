"use client";

import type {ButtonProps} from "../button";
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
};

const ButtonGroupContext = createContext<ButtonGroupContext>({});

/* -------------------------------------------------------------------------------------------------
 * ButtonGroup Root
 * -----------------------------------------------------------------------------------------------*/
interface ButtonGroupRootProps
  extends ComponentPropsWithRef<"div">, Pick<ButtonProps, "size" | "variant" | "isDisabled"> {}

const ButtonGroupRoot = ({className, isDisabled, size, variant, ...rest}: ButtonGroupRootProps) => {
  return (
    <ButtonGroupContext value={{size, variant, isDisabled}}>
      <div className={buttonGroupVariants({className})} data-slot="button-group" {...rest} />
    </ButtonGroupContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ButtonGroupRoot, ButtonGroupContext};

export type {ButtonGroupRootProps};
