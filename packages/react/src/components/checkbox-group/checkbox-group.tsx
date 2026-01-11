"use client";

import type {CheckboxGroupVariants} from "./checkbox-group.styles";
import type {CheckboxVariants} from "../checkbox";
import type {ComponentPropsWithRef} from "react";

import React, {createContext} from "react";
import {CheckboxGroup as CheckboxGroupPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";

import {checkboxGroupVariants} from "./checkbox-group.styles";

/* -------------------------------------------------------------------------------------------------
 * CheckboxGroup Context
 * -----------------------------------------------------------------------------------------------*/
interface CheckboxGroupContext {
  variant?: CheckboxVariants["variant"];
}

const CheckboxGroupContext = createContext<CheckboxGroupContext>({});

interface CheckboxGroupProps
  extends ComponentPropsWithRef<typeof CheckboxGroupPrimitive>, CheckboxGroupVariants {}

const CheckboxGroup = ({children, className, variant, ...props}: CheckboxGroupProps) => {
  const styles = React.useMemo(() => checkboxGroupVariants({variant}), [variant]);

  return (
    <CheckboxGroupContext.Provider value={{variant}}>
      <CheckboxGroupPrimitive
        className={composeTwRenderProps(className, styles)}
        data-slot="checkbox-group"
        {...props}
      >
        {(values) => <>{typeof children === "function" ? children(values) : children}</>}
      </CheckboxGroupPrimitive>
    </CheckboxGroupContext.Provider>
  );
};

export {CheckboxGroup, CheckboxGroupContext};
export type {CheckboxGroupProps};
