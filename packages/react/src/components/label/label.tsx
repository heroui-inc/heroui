"use client";

import type {LabelVariants} from "./label.styles";
import type {LabelProps as LabelPrimitiveProps} from "react-aria-components";

import {Label as LabelPrimitive} from "react-aria-components";

import {labelVariants} from "./label.styles";

/* -------------------------------------------------------------------------------------------------
 * Label Root
 * -----------------------------------------------------------------------------------------------*/
interface LabelRootProps extends LabelPrimitiveProps, LabelVariants {}

const LabelRoot = ({
  children,
  className,
  isDisabled,
  isInvalid,
  isRequired,
  ...rest
}: LabelRootProps) => {
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

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {LabelRoot};

export type {LabelRootProps};
