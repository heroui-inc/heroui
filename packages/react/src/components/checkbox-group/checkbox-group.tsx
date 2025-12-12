"use client";

import type {CheckboxGroupVariants} from "./checkbox-group.styles";
import type {ComponentPropsWithRef} from "react";

import React from "react";
import {CheckboxGroup as CheckboxGroupPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";

import {checkboxGroupVariants} from "./checkbox-group.styles";

interface CheckboxGroupProps
  extends ComponentPropsWithRef<typeof CheckboxGroupPrimitive>, CheckboxGroupVariants {}

const CheckboxGroup = ({children, className, ...props}: CheckboxGroupProps) => {
  const styles = React.useMemo(() => checkboxGroupVariants(), []);

  return (
    <CheckboxGroupPrimitive
      data-slot="checkbox-group"
      {...props}
      className={composeTwRenderProps(className, styles)}
    >
      {(values) => <>{typeof children === "function" ? children(values) : children}</>}
    </CheckboxGroupPrimitive>
  );
};

export {CheckboxGroup};
export type {CheckboxGroupProps};
