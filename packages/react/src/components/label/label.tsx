"use client";

import type {LabelVariants} from "./label.styles";
import type {LabelProps as LabelPrimitiveProps} from "react-aria-components";

import {Label as LabelPrimitive} from "react-aria-components";

import {labelVariants} from "./label.styles";

interface LabelProps extends LabelPrimitiveProps, LabelVariants {
  ref?: React.Ref<HTMLLabelElement>;
}
const Label = ({children, className, isDisabled, isInvalid, isRequired, ...rest}: LabelProps) => {
  return (
    <LabelPrimitive
      className={labelVariants({isRequired, isDisabled, isInvalid, className})}
      data-slot="label"
      {...rest}
    >
      {children}
    </LabelPrimitive>
  );
};

export type {LabelProps};
export {Label};
